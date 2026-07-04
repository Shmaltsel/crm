import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
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
  topCities?: { name: string; revenue: number; profit: number }[];
  topSchools?: { name: string; count: number; revenue: number }[];
  topEvents?: {
    id: string;
    date: Date;
    school: string;
    profit: number;
    revenue: number;
  }[];
  worstEvents?: {
    id: string;
    date: Date;
    school: string;
    profit: number;
    revenue: number;
  }[];
}

@Injectable()
export class FinanceService {
  private cache = new Map<string, { data: unknown; expiresAt: number }>();

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiresAt) return null;
    return entry.data as T;
  }

  private setCached(key: string, data: unknown, ttlMs = 5 * 60 * 1000) {
    this.cache.set(key, { data, expiresAt: Date.now() + ttlMs });
  }

  constructor(private readonly prisma: PrismaService) {}

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
    return { balance: user?.balance?.toNumber() ?? 0, name: user?.name ?? '' };
  }

  async getDashboard({
    period,
    cityId,
    project,
    minimal = false,
  }: {
    period?: string;
    cityId?: string;
    project?: string;
    minimal?: boolean;
  }): Promise<FinanceDashboardResult> {
    const cacheKey = `finance:${cityId}:${period}:${project}:${minimal}`;
    const cached = this.getCached<FinanceDashboardResult>(cacheKey);
    if (cached) return cached;

    const dateFrom = this.resolveDateFrom(period);
    const filters = this.buildSqlFilters({ dateFrom, cityId, project });

    const baseEventWhere: Prisma.EventWhereInput = {
      status: 'RE_SALE',
      ...(dateFrom ? { date: { gte: dateFrom } } : {}),
      ...(cityId ? { cityId } : {}),
      ...(project ? { project } : {}),
    };

    const [kpiAgg, expensesRaw] = await Promise.all([
      this.prisma.eventReport.aggregate({
        where: { event: baseEventWhere },
        _sum: { totalSum: true, remainderSum: true },
        _count: { eventId: true },
      }),
      this.prisma.expenseItem.findMany({
        where: { report: { event: baseEventWhere } },
        select: { category: true, name: true, amount: true },
      }),
    ]);

    const totalRevenue = kpiAgg._sum.totalSum ?? 0;
    const totalProfit = kpiAgg._sum.remainderSum ?? 0;
    const totalEvents = kpiAgg._count.eventId ?? 0;

    const expCatMap: Record<string, number> = {};
    let totalExpenses = 0;

    for (const exp of expensesRaw) {
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

    const monthly = monthlyRaw.map((row) => ({
      month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
        month: 'short',
        year: '2-digit',
      }),
      revenue: row.revenue,
      profit: row.profit,
    }));
    const expectedRevenue = plannedAgg._sum.price ?? 0;
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
      this.setCached(cacheKey, result);
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
      profit: r.remainderSum ?? 0,
      revenue: r.totalSum ?? 0,
    });

    const topEvents = topEventsRaw.map(mapEvent);
    const worstEvents = worstEventsRaw.map(mapEvent);

    const result = {
      kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
      monthly,
      byProject,
      byExpenseCategory,
      topCities,
      topSchools,
      topEvents,
      worstEvents,
      expectedRevenue,
      filters: filterOptions,
    };
    this.setCached(cacheKey, result);
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
}
