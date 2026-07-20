import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CacheVersionService } from '../common/cache/cache-version.service';
import { CreateManualExpenseDto } from './dto/create-manual-expense.dto';
export interface FinanceKpi {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalEvents: number;
}

export interface FinanceFilterOptions {
  projects: string[];
  cities: { id: string; name: string }[];
}

export interface FinanceDashboardResult {
  kpi: FinanceKpi;
  monthly: { month: string; revenue: number; profit: number }[];
  expectedRevenue: number;
  filters: FinanceFilterOptions;
  byProject?: { name: string; value: number }[];
  byExpenseCategory?: { name: string; value: number }[];
  expenseByMonth?: Array<{ month: string; [k: string]: number | string }>;
  expenseCategories?: string[];
  topCities?: { name: string; revenue: number; profit: number }[];
  topSchools?: { name: string; count: number; revenue: number }[];
  topEvents?: {
    id: string;
    date: Date;
    school: string;
    schoolId: string;
    profit: number;
    revenue: number;
  }[];
  worstEvents?: {
    id: string;
    date: Date;
    school: string;
    schoolId: string;
    profit: number;
    revenue: number;
  }[];
}

@Injectable()
export class FinanceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  private resolveDateFrom(period?: string): Date | undefined {
    const now = new Date();
    if (period === 'month')
      return new Date(now.getFullYear(), now.getMonth(), 1);
    if (period === 'quarter')
      return new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    if (period === 'year') return new Date(now.getFullYear(), 0, 1);
    return undefined;
  }
  private buildSqlFilters({
    dateFrom,
    cityId,
    project,
  }: {
    dateFrom?: Date;
    cityId?: string;
    project?: string;
  }): Prisma.Sql {
    const parts: Prisma.Sql[] = [];
    if (dateFrom) parts.push(Prisma.sql`AND e.date >= ${dateFrom}`);
    if (cityId) parts.push(Prisma.sql`AND e."cityId" = ${cityId}`);
    if (project) parts.push(Prisma.sql`AND e.project  = ${project}`);
    return parts.length ? Prisma.join(parts, ' ') : Prisma.empty;
  }

  async getMyBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, name: true },
    });
    return {
      balance: user?.balance ? Number(user.balance) : 0,
      name: user?.name ?? '',
    };
  }

  async reconcileBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, name: true },
    });
    const storedBalance = user?.balance ? Number(user.balance) : 0;

    const result = await this.prisma.salaryRecord.aggregate({
      where: { employeeId: userId, status: 'PAID' },
      _sum: { amount: true },
    });
    const calculatedBalance = result._sum.amount
      ? Number(result._sum.amount)
      : 0;

    return {
      userId,
      name: user?.name ?? '',
      storedBalance,
      calculatedBalance,
      discrepancy: storedBalance - calculatedBalance,
    };
  }
  async getDashboard({
    period,
    cityId,
    project,
    minimal = false,
    granularity,
    bucketCount,
    dateFrom,
    dateTo,
  }: {
    period?: string;
    cityId?: string;
    project?: string;
    minimal?: boolean;
    granularity?: string;
    bucketCount?: number;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<FinanceDashboardResult> {
    const version = await this.cacheVersion.getVersion('finance');
    const cacheKey = `finance:v${version}:${cityId ?? ''}:${period ?? ''}:${project ?? ''}:${minimal}:${granularity ?? ''}:${bucketCount ?? ''}:${dateFrom ?? ''}:${dateTo ?? ''}`;
    const cached =
      await this.cacheManager.get<FinanceDashboardResult>(cacheKey);
    if (cached) return cached;

    const dateFromResolved = this.resolveDateFrom(period) ?? (dateFrom ? new Date(dateFrom) : undefined);
    const filters = this.buildSqlFilters({ dateFrom: dateFromResolved, cityId, project });

    const baseEventWhere: Prisma.EventWhereInput = {
      status: 'RE_SALE',
      ...(dateFromResolved ? { date: { gte: dateFromResolved } } : {}),
      ...(cityId ? { cityId } : {}),
      ...(project ? { project } : {}),
    };

    const [kpiAgg, expensesRaw, manualExpensesRaw] = await Promise.all([
      this.prisma.eventReport.aggregate({
        where: { event: baseEventWhere },
        _sum: { totalSum: true, remainderSum: true },
        _count: { eventId: true },
      }),
      this.prisma.expenseItem.findMany({
        where: { report: { event: baseEventWhere } },
        select: {
          category: true,
          name: true,
          amount: true,
          report: { select: { event: { select: { date: true } } } },
        },
      }),
      this.prisma.manualExpense.findMany({
        where: {
          ...(dateFromResolved ? { date: { gte: dateFromResolved } } : {}),
          ...(cityId ? { cityId } : {}),
        },
        select: { category: true, name: true, amount: true, date: true },
      }),
    ]);

    const totalRevenue = Number(kpiAgg._sum.totalSum ?? 0);
    const totalProfit = Number(kpiAgg._sum.remainderSum ?? 0);
    const totalEvents = kpiAgg._count.eventId ?? 0;

    const expCatMap: Record<string, number> = {};
    let totalExpenses = 0;

    for (const exp of expensesRaw) {
      const cat: string = exp.category || exp.name || 'Інше';
      const amt: number = Number(exp.amount) || 0;
      expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
      totalExpenses += amt;
    }
    for (const exp of manualExpensesRaw) {
      const cat: string = exp.category || exp.name || 'Інше';
      const amt: number = Number(exp.amount) || 0;
      expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
      totalExpenses += amt;
    }

    const byExpenseCategory = Object.entries(expCatMap).map(
      ([name, value]) => ({
        name,
        value,
      }),
    );

    // Агрегація витрат по місяцях і категоріях
    type MonthCatRow = { year: number; month: number; category: string; value: number };
    const monthCatMap: Record<string, number> = {};

    for (const exp of expensesRaw) {
      const cat: string = exp.category || exp.name || 'Інше';
      const amt: number = Number(exp.amount) || 0;
      const d = exp.report?.event?.date;
      if (!d) continue;
      const dt = new Date(d);
      const y = dt.getFullYear();
      const m = dt.getMonth() + 1;
      const key = `${y}-${String(m).padStart(2, '0')}-${cat}`;
      monthCatMap[key] = (monthCatMap[key] ?? 0) + amt;
    }
    for (const exp of manualExpensesRaw) {
      const cat: string = exp.category || exp.name || 'Інше';
      const amt: number = Number(exp.amount) || 0;
      if (!exp.date) continue;
      const dt = new Date(exp.date);
      const y = dt.getFullYear();
      const m = dt.getMonth() + 1;
      const key = `${y}-${String(m).padStart(2, '0')}-${cat}`;
      monthCatMap[key] = (monthCatMap[key] ?? 0) + amt;
    }

    const monthCatRows: MonthCatRow[] = Object.entries(monthCatMap).map(([key, value]) => {
      const dashIdx = key.indexOf('-', key.indexOf('-') + 1);
      const ym = key.slice(0, dashIdx);
      const cat = key.slice(dashIdx + 1);
      const y = Number(ym.slice(0, 4));
      const m = Number(ym.slice(5, 7));
      return { year: y, month: m, category: cat, value };
    });

    type ExpenseMonthRow = { month: string; [k: string]: number | string };
    const expenseByMonthMap = new Map<string, ExpenseMonthRow>();
    for (const row of monthCatRows) {
      const monthLabel = new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
        month: 'short',
        year: '2-digit',
      });
      if (!expenseByMonthMap.has(monthLabel)) {
        expenseByMonthMap.set(monthLabel, { month: monthLabel });
      }
      const entry = expenseByMonthMap.get(monthLabel)!;
      entry[row.category] = (Number(entry[row.category] ?? 0)) + row.value;
    }
    const expenseByMonth: ExpenseMonthRow[] = Array.from(expenseByMonthMap.values()).sort((a, b) => {
      return String(a.month).localeCompare(String(b.month));
    });

    const catTotals: Record<string, number> = {};
    for (const row of monthCatRows) {
      catTotals[row.category] = (catTotals[row.category] ?? 0) + row.value;
    }
    const expenseCategories = Object.entries(catTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([name]) => name);
    type MonthlyRow = {
      year: number;
      month: number;
      revenue: number;
      profit: number;
    };
    const [monthlyRaw, plannedAgg, projectsRaw, cities] = await Promise.all([
      this.prisma.$queryRaw<MonthlyRow[]>`
        SELECT
          EXTRACT(YEAR  FROM e.date)::int                   AS year,
          EXTRACT(MONTH FROM e.date)::int                   AS month,
          COALESCE(SUM(r."totalSum"),      0)::float        AS revenue,
          COALESCE(SUM(r."remainderSum"),  0)::float        AS profit
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY year, month
        ORDER BY year, month
      `,
      this.prisma.event.aggregate({
        where: {
          status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
          ...(cityId ? { cityId } : {}),
        },
        _sum: { price: true },
      }),
      this.prisma.event.findMany({
        select: { project: true },
        distinct: ['project'],
      }),
      this.prisma.city.findMany({ select: { id: true, name: true } }),
    ]);

    let monthly = monthlyRaw.map((row) => ({
      month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
        month: 'short',
        year: '2-digit',
      }),
      revenue: row.revenue,
      profit: row.profit,
    }));

    if (bucketCount && bucketCount > 0 && monthly.length > bucketCount) {
      const bucketSize = monthly.length / bucketCount;
      monthly = Array.from({ length: bucketCount }, (_, i) => {
        const from = Math.floor(i * bucketSize);
        const to = Math.floor((i + 1) * bucketSize);
        const slice = monthly.slice(from, to === from ? from + 1 : to);
        return {
          month: slice[0]?.month ?? '',
          revenue: slice.reduce((s, m) => s + m.revenue, 0),
          profit: slice.reduce((s, m) => s + m.profit, 0),
        };
      });
    }
    const expectedRevenue = Number(plannedAgg._sum.price ?? 0);
    const filterOptions = {
      projects: projectsRaw.map((p) => p.project).filter(Boolean),
      cities,
    };

    if (minimal) {
      const result = {
        kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
        monthly,
        expectedRevenue,
        filters: filterOptions,
      };
      await this.cacheManager.set(cacheKey, result, 300_000);
      return result;
    }

    type ProjectRow = { project: string; value: number };
    type CityRow = {
      cityId: string;
      name: string;
      revenue: number;
      profit: number;
    };
    type SchoolRow = {
      schoolId: string;
      name: string;
      count: number;
      revenue: number;
    };

    const [byProjectRows, topCitiesRows, topSchoolsRows] = await Promise.all([
      this.prisma.$queryRaw<ProjectRow[]>`
        SELECT
          COALESCE(e.project, 'Інше')              AS project,
          COALESCE(SUM(r."totalSum"), 0)::float    AS value
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY e.project
        ORDER BY value DESC
      `,
      this.prisma.$queryRaw<CityRow[]>`
        SELECT
          e."cityId",
          COALESCE(c.name, '—')                    AS name,
          COALESCE(SUM(r."totalSum"),     0)::float AS revenue,
          COALESCE(SUM(r."remainderSum"), 0)::float AS profit
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        LEFT JOIN "City" c   ON c.id = e."cityId"
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY e."cityId", c.name
        ORDER BY revenue DESC
        LIMIT 5
      `,
      this.prisma.$queryRaw<SchoolRow[]>`
        SELECT
          e."schoolId",
          COALESCE(s.name, '—')                    AS name,
          COUNT(e.id)::int                         AS count,
          COALESCE(SUM(r."totalSum"), 0)::float    AS revenue
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        LEFT JOIN "School" s ON s.id = e."schoolId"
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY e."schoolId", s.name
        ORDER BY revenue DESC
        LIMIT 5
      `,
    ]);

    const byProject = byProjectRows.map((r) => ({
      name: r.project,
      value: r.value,
    }));
    const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
      name,
      revenue,
      profit,
    }));
    const topSchools = topSchoolsRows.map(({ name, count, revenue }) => ({
      name,
      count,
      revenue,
    }));

    const eventSelect = {
      totalSum: true,
      remainderSum: true,
      event: {
        select: {
          id: true,
          date: true,
          schoolId: true,
          school: { select: { name: true } },
        },
      },
    } satisfies Prisma.EventReportSelect;

    const [topEventsRaw, worstEventsRaw] = await Promise.all([
      this.prisma.eventReport.findMany({
        where: { event: baseEventWhere },
        select: eventSelect,
        orderBy: { remainderSum: 'desc' },
        take: 5,
      }),
      this.prisma.eventReport.findMany({
        where: { event: baseEventWhere },
        select: eventSelect,
        orderBy: { remainderSum: 'asc' },
        take: 5,
      }),
    ]);

    const mapEvent = (r: (typeof topEventsRaw)[number]) => ({
      id: r.event.id,
      date: r.event.date,
      school: r.event.school?.name ?? '—',
      schoolId: r.event.schoolId,
      profit: Number(r.remainderSum ?? 0),
      revenue: Number(r.totalSum ?? 0),
    });

    const topEvents = topEventsRaw.map(mapEvent);
    const worstEvents = worstEventsRaw.map(mapEvent);

    const result = {
      kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
      monthly,
      byProject,
      byExpenseCategory,
      expenseByMonth,
      expenseCategories,
      topCities,
      topSchools,
      topEvents,
      worstEvents,
      expectedRevenue,
      filters: filterOptions,
    };
    await this.cacheManager.set(cacheKey, result, 300_000);
    return result;
  }

  async getCompanyBalance({
    period,
    cityId,
    project,
  }: {
    period?: string;
    cityId?: string;
    project?: string;
  }) {
    const version = await this.cacheVersion.getVersion('finance');
    const cacheKey = `company-balance:v${version}:${cityId ?? ''}:${period ?? ''}:${project ?? ''}`;
    const cached = await this.cacheManager.get<{
      totalRevenue: number;
      totalExpenses: number;
      totalPaidSalaries: number;
      totalPendingSalaries: number;
      companyBalance: number;
    }>(cacheKey);
    if (cached) return cached;

    const dateFrom = this.resolveDateFrom(period);
    const baseEventWhere: Prisma.EventWhereInput = {
      status: 'RE_SALE',
      ...(dateFrom ? { date: { gte: dateFrom } } : {}),
      ...(cityId ? { cityId } : {}),
      ...(project ? { project } : {}),
    };

    const [revenueAgg, expensesRaw, paidAgg, pendingAgg, manualExpensesRaw] = await Promise.all([
      this.prisma.eventReport.aggregate({
        where: { event: baseEventWhere },
        _sum: { totalSum: true },
      }),
      this.prisma.expenseItem.findMany({
        where: { report: { event: baseEventWhere } },
        select: { amount: true },
      }),
      this.prisma.salaryRecord.aggregate({
        where: { status: 'PAID', event: baseEventWhere },
        _sum: { amount: true },
      }),
      this.prisma.salaryRecord.aggregate({
        where: { status: 'PENDING', event: baseEventWhere },
        _sum: { amount: true },
      }),
      this.prisma.manualExpense.findMany({
        where: {
          ...(dateFrom ? { date: { gte: dateFrom } } : {}),
          ...(cityId ? { cityId } : {}),
        },
        select: { amount: true },
      }),
    ]);

    const totalRevenue = Number(revenueAgg._sum.totalSum ?? 0);
    const totalExpenses =
      expensesRaw.reduce((s, e) => s + (Number(e.amount) || 0), 0) +
      manualExpensesRaw.reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const totalPaidSalaries = Number(paidAgg._sum.amount ?? 0);
    const totalPendingSalaries = Number(pendingAgg._sum.amount ?? 0);
    const companyBalance = totalRevenue - totalExpenses - totalPaidSalaries;

    const result = {
      totalRevenue,
      totalExpenses,
      totalPaidSalaries,
      totalPendingSalaries,
      companyBalance,
    };

    await this.cacheManager.set(cacheKey, result, 300_000);
    return result;
  }

  async getStaffRevenue({
    period,
    cityId,
  }: {
    period?: string;
    cityId?: string;
  }) {
    const dateFrom = this.resolveDateFrom(period);
    const staffFilters = this.buildSqlFilters({ dateFrom, cityId });

    type StaffRow = {
      id: string;
      name: string;
      role: 'HOST' | 'DRIVER';
      revenue: number;
      eventsCount: number;
    };

    const [hostRows, driverRows, totalAgg, eventsCount] = await Promise.all([
      this.prisma.$queryRaw<StaffRow[]>`
        SELECT
          u.id,
          u.name,
          'HOST'::text                              AS role,
          COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
          COUNT(e.id)::int                          AS "eventsCount"
        FROM "Event" e
        JOIN "Crew"         c ON c.id = e."crewId"
        JOIN "User"         u ON u.id = c."hostId"
        JOIN "EventReport"  r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${staffFilters}
        GROUP BY u.id, u.name
      `,
      this.prisma.$queryRaw<StaffRow[]>`
        SELECT
          u.id,
          u.name,
          'DRIVER'::text                            AS role,
          COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
          COUNT(e.id)::int                          AS "eventsCount"
        FROM "Event" e
        JOIN "Crew"        c ON c.id = e."crewId"
        JOIN "User"        u ON u.id = c."driverId"
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${staffFilters}
        GROUP BY u.id, u.name
      `,
      this.prisma.$queryRaw<[{ revenue: number }]>`
        SELECT COALESCE(SUM(r."totalSum"), 0)::float AS revenue
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${staffFilters}
      `,
      this.prisma.event.count({
        where: {
          status: 'RE_SALE',
          ...(dateFrom ? { date: { gte: dateFrom } } : {}),
          ...(cityId ? { cityId } : {}),
        },
      }),
    ]);

    const staff = [...hostRows, ...driverRows].sort(
      (a, b) => b.revenue - a.revenue,
    );
    const totalRevenue = totalAgg[0]?.revenue ?? 0;

    return { staff, totalRevenue, eventsCount };
  }

  async getManualExpenses({
    period,
    cityId,
    page = 1,
    take = 20,
  }: {
    period?: string;
    cityId?: string;
    page?: number;
    take?: number;
  }) {
    const dateFrom = this.resolveDateFrom(period);
    const where: Prisma.ManualExpenseWhereInput = {
      ...(dateFrom ? { date: { gte: dateFrom } } : {}),
      ...(cityId ? { cityId } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.manualExpense.findMany({
        where,
        include: { createdBy: { select: { id: true, name: true } }, city: { select: { id: true, name: true } } },
        orderBy: { date: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.manualExpense.count({ where }),
    ]);

    return {
      items: items.map((i) => ({
        ...i,
        amount: Number(i.amount),
      })),
      total,
      page,
      take,
      totalPages: Math.ceil(total / take),
    };
  }

  async createManualExpense(dto: CreateManualExpenseDto, userId: string) {
    const expense = await this.prisma.manualExpense.create({
      data: {
        category: dto.category,
        name: dto.name,
        description: dto.description,
        amount: dto.amount,
        date: new Date(dto.date),
        cityId: dto.cityId ?? null,
        photoUrl: dto.photoUrl ?? null,
        createdById: userId,
      },
      include: { createdBy: { select: { id: true, name: true } }, city: { select: { id: true, name: true } } },
    });

    await this.cacheVersion.bumpVersion('finance');
    return { ...expense, amount: Number(expense.amount) };
  }

  async updateManualExpense(
    id: string,
    dto: Partial<CreateManualExpenseDto>,
    userId: string,
    userRole: string,
  ) {
    const existing = await this.prisma.manualExpense.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Витрату не знайдено');
    if (userRole === 'MANAGER' && existing.createdById !== userId) {
      throw new ForbiddenException('Немає доступу до цієї витрати');
    }

    const expense = await this.prisma.manualExpense.update({
      where: { id },
      data: {
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.date !== undefined && { date: new Date(dto.date) }),
        ...(dto.cityId !== undefined && { cityId: dto.cityId ?? null }),
        ...(dto.photoUrl !== undefined && { photoUrl: dto.photoUrl ?? null }),
      },
      include: { createdBy: { select: { id: true, name: true } }, city: { select: { id: true, name: true } } },
    });

    await this.cacheVersion.bumpVersion('finance');
    return { ...expense, amount: Number(expense.amount) };
  }

  async deleteManualExpense(id: string, userId: string, userRole: string) {
    const existing = await this.prisma.manualExpense.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Витрату не знайдено');
    if (userRole === 'MANAGER' && existing.createdById !== userId) {
      throw new ForbiddenException('Немає доступу до цієї витрати');
    }

    await this.prisma.manualExpense.delete({ where: { id } });
    await this.cacheVersion.bumpVersion('finance');
    return { deleted: true };
  }
}
