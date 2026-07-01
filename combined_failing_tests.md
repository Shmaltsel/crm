# Файли для виправлення тестів

### `apps/backend/src/finance/finance.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  private cache = new Map<string, { data: any; expiresAt: number }>();

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiresAt) return null;
    return entry.data as T;
  }

  private setCached(key: string, data: any, ttlMs = 5 * 60 * 1000) {
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
    return { balance: user?.balance ?? 0, name: user?.name ?? '' };
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
  }) {
    const cacheKey = `finance:${cityId}:${period}:${project}:${minimal}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    const dateFrom = this.resolveDateFrom(period);
    const filters = this.buildSqlFilters({ dateFrom, cityId, project });

    const baseEventWhere: Prisma.EventWhereInput = {
      status: 'RE_SALE',
      ...(dateFrom ? { date: { gte: dateFrom } } : {}),
      ...(cityId ? { cityId } : {}),
      ...(project ? { project } : {}),
    };

    const kpiAgg = await this.prisma.eventReport.aggregate({
      where: { event: baseEventWhere },
      _sum: { totalSum: true, remainderSum: true },
      _count: { eventId: true },
    });

    const totalRevenue = kpiAgg._sum.totalSum ?? 0;
    const totalProfit = kpiAgg._sum.remainderSum ?? 0;
    const totalEvents = kpiAgg._count.eventId ?? 0;

    const expensesRaw = await this.prisma.expenseItem.findMany({
      where: {
        report: {
          event: baseEventWhere,
        },
      },
      select: {
        category: true,
        name: true,
        amount: true,
      },
    });

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
    const monthlyRaw = await this.prisma.$queryRaw<MonthlyRow[]>`
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
    `;

    const monthly = monthlyRaw.map((row) => ({
      month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
        month: 'short',
        year: '2-digit',
      }),
      revenue: row.revenue,
      profit: row.profit,
    }));

    const plannedAgg = await this.prisma.event.aggregate({
      where: {
        status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
        ...(cityId ? { cityId } : {}),
      },
      _sum: { price: true },
    });
    const expectedRevenue = plannedAgg._sum.price ?? 0;
    const [projectsRaw, cities] = await Promise.all([
      this.prisma.event.findMany({
        select: { project: true },
        distinct: ['project'],
      }),
      this.prisma.city.findMany({ select: { id: true, name: true } }),
    ]);
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
    const byProjectRows = await this.prisma.$queryRaw<ProjectRow[]>`
      SELECT
        COALESCE(e.project, 'Інше')              AS project,
        COALESCE(SUM(r."totalSum"), 0)::float    AS value
      FROM "Event" e
      JOIN "EventReport" r ON r."eventId" = e.id
      WHERE e.status = 'RE_SALE'
      ${filters}
      GROUP BY e.project
      ORDER BY value DESC
    `;
    const byProject = byProjectRows.map((r) => ({
      name: r.project,
      value: r.value,
    }));
    type CityRow = {
      cityId: string;
      name: string;
      revenue: number;
      profit: number;
    };
    const topCitiesRows = await this.prisma.$queryRaw<CityRow[]>`
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
    `;
    const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
      name,
      revenue,
      profit,
    }));

    type SchoolRow = {
      schoolId: string;
      name: string;
      count: number;
      revenue: number;
    };
    const topSchoolsRows = await this.prisma.$queryRaw<SchoolRow[]>`
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
    `;
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

```

---

### `apps/backend/src/finance/finance.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  eventReport: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
  },

  event: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },

  expenseItem: {
    findMany: jest.fn(),
  },

  salaryItem: {
    findMany: jest.fn(),
  },

  city: {
    findMany: jest.fn(),
  },

  user: {
    findUnique: jest.fn(),
  },

  $queryRaw: jest.fn(),
};

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<FinanceService>(FinanceService);
    (service as any).cache.clear();
  });

  const defaultMocks = () => {
    mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
      _sum: { totalSum: 50000, remainderSum: 20000 },
      _count: { eventId: 10 },
    });
    mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    mockPrisma.event.aggregate.mockResolvedValueOnce({
      _sum: { price: 30000 },
    });
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.city.findMany.mockResolvedValueOnce([]);
    mockPrisma.eventReport.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);

    mockPrisma.salaryItem.findMany.mockResolvedValueOnce([]);

    mockPrisma.expenseItem.aggregate.mockResolvedValueOnce({
      _sum: {
        amount: 0,
      },
    });

    mockPrisma.salaryItem.aggregate.mockResolvedValueOnce({
      _sum: {
        amount: 0,
      },
    });
  };

  describe('getDashboard — KPI', () => {
    it('коректно повертає KPI з aggregate', async () => {
      defaultMocks();
      const result = await service.getDashboard({});
      expect(result.kpi.totalRevenue).toBe(50000);
      expect(result.kpi.totalProfit).toBe(20000);
      expect(result.kpi.totalEvents).toBe(10);
    });

    it('повертає нулі якщо звітів немає', async () => {
      mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
        _sum: { totalSum: null, remainderSum: null },
        _count: { eventId: 0 },
      });
      mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.event.aggregate.mockResolvedValueOnce({
        _sum: { price: null },
      });
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      mockPrisma.city.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventReport.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      const result = await service.getDashboard({});
      expect(result.kpi.totalRevenue).toBe(0);
      expect(result.kpi.totalProfit).toBe(0);
      expect(result.kpi.totalEvents).toBe(0);
    });
  });

  describe('getDashboard — фільтри', () => {
    it('передає cityId у where для Prisma', async () => {
      defaultMocks();
      await service.getDashboard({ cityId: 'city-1' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      expect(aggregateCall.where.event.cityId).toBe('city-1');
    });

    it('передає project у where для Prisma', async () => {
      defaultMocks();
      await service.getDashboard({ project: 'Голограма' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      expect(aggregateCall.where.event.project).toBe('Голограма');
    });

    it('period=month генерує dateFrom з початку місяця', async () => {
      defaultMocks();
      await service.getDashboard({ period: 'month' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      const dateFrom = aggregateCall.where.event.date?.gte;
      expect(dateFrom).toBeDefined();
      const now = new Date();
      expect(dateFrom.getMonth()).toBe(now.getMonth());
      expect(dateFrom.getDate()).toBe(1);
    });

    it('period=year генерує dateFrom з 1 січня', async () => {
      defaultMocks();
      await service.getDashboard({ period: 'year' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      const dateFrom = aggregateCall.where.event.date?.gte;
      expect(dateFrom.getMonth()).toBe(0);
      expect(dateFrom.getDate()).toBe(1);
    });

    it('без period — dateFrom undefined', async () => {
      defaultMocks();
      await service.getDashboard({});
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      expect(aggregateCall.where.event.date).toBeUndefined();
    });
  });

  describe('getDashboard — minimal режим', () => {
    it('minimal=true не запитує topSchools/topCities/byProject', async () => {
      mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
        _sum: { totalSum: 10000, remainderSum: 4000 },
        _count: { eventId: 2 },
      });
      mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.event.aggregate.mockResolvedValueOnce({
        _sum: { price: 5000 },
      });
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      mockPrisma.city.findMany.mockResolvedValueOnce([]);

      const result = await service.getDashboard({ minimal: true });

      expect(result).toHaveProperty('kpi');
      expect(result).toHaveProperty('monthly');
      expect(result).not.toHaveProperty('topSchools');
      expect(result).not.toHaveProperty('topCities');
      expect(result).not.toHaveProperty('byProject');

      expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDashboard — витрати по категоріях', () => {
    it('агрегує витрати по категоріях', async () => {
      mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
        _sum: { totalSum: 10000, remainderSum: 4000 },
        _count: { eventId: 2 },
      });
      mockPrisma.eventReport.findMany.mockResolvedValueOnce([
        {
          expenses: [
            { category: 'Паливо', amount: 500 },
            { category: 'Паливо', amount: 300 },
          ],
        },
        { expenses: [{ category: 'Реклама', amount: 200 }] },
      ]);
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.event.aggregate.mockResolvedValueOnce({ _sum: { price: 0 } });
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      mockPrisma.city.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventReport.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      const result = await service.getDashboard({});
      const fuel = result.byExpenseCategory.find(
        (c: any) => c.name === 'Паливо',
      );
      const ads = result.byExpenseCategory.find(
        (c: any) => c.name === 'Реклама',
      );
      expect(fuel?.value).toBe(800);
      expect(ads?.value).toBe(200);
      expect(result.kpi.totalExpenses).toBe(1000);
    });
  });

  describe('getDashboard — кеш', () => {
    it('повторний виклик з тими ж параметрами не робить нових запитів', async () => {
      defaultMocks();
      await service.getDashboard({ cityId: 'city-1' });
      await service.getDashboard({ cityId: 'city-1' });
      expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(1);
    });

    it('різні параметри — різні записи в кеші', async () => {
      defaultMocks();
      defaultMocks();
      await service.getDashboard({ cityId: 'city-1' });
      await service.getDashboard({ cityId: 'city-2' });
      expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(2);
    });
  });

  describe('getMyBalance', () => {
    it('повертає баланс користувача', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        balance: 5000,
        name: 'Іван',
      });
      const result = await service.getMyBalance('user-1');
      expect(result.balance).toBe(5000);
      expect(result.name).toBe('Іван');
    });

    it('повертає 0 якщо користувач не знайдений', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      const result = await service.getMyBalance('unknown');
      expect(result.balance).toBe(0);
    });
  });

  describe('resolveDateFrom', () => {
    it('month → перший день поточного місяця', () => {
      const result = (service as any).resolveDateFrom('month');
      const now = new Date();
      expect(result.getFullYear()).toBe(now.getFullYear());
      expect(result.getMonth()).toBe(now.getMonth());
      expect(result.getDate()).toBe(1);
    });

    it('quarter → перший день поточного кварталу', () => {
      const result = (service as any).resolveDateFrom('quarter');
      const now = new Date();
      const expectedMonth = Math.floor(now.getMonth() / 3) * 3;
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDate()).toBe(1);
    });

    it('year → 1 січня', () => {
      const result = (service as any).resolveDateFrom('year');
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });

    it('undefined → повертає undefined', () => {
      const result = (service as any).resolveDateFrom(undefined);
      expect(result).toBeUndefined();
    });
  });
});

```

---

### `apps/backend/src/cities/cities.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('CitiesController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        { provide: CitiesService, useValue: {} },
        { provide: AuthGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();
    expect(module.get(CitiesController)).toBeDefined();
  });
});

```

---

### `apps/backend/src/events/dto/submit-report.dto.spec.ts`

```typescript
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SubmitReportDto } from './submit-report.dto';

const validPayload = {
  announcementDone: true,
  materialShown: true,
  childrenCount: 100,
  classesCount: 4,
  privilegedCount: 5,
  showingsCount: 2,
  totalSum: 10000,
  schoolSum: 2000,
  remainderSum: 8000,
  rating: 9,
  expenses: [],
  salaries: [],
};

describe('SubmitReportDto', () => {
  it('проходить валідацію з коректними даними', async () => {
    const dto = plainToInstance(SubmitReportDto, validPayload);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it.each([
    'totalSum',
    'schoolSum',
    'childrenCount',
    'classesCount',
    'privilegedCount',
    'showingsCount',
  ])("відхиляє від'ємне значення поля %s", async (field) => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      [field]: -1,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === field)).toBe(true);
  });

  it("дозволяє remainderSum бути від'ємним (немає @Min обмеження в DTO)", async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      remainderSum: -500,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'remainderSum')).toBe(false);
  });

  it('відхиляє rating більше 5', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      rating: 6,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'rating')).toBe(true);
  });

  it('rating є опціональним', async () => {
    const { rating, ...rest } = validPayload;
    const dto = plainToInstance(SubmitReportDto, rest);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('трансформує рядкові числа в number через @Type(() => Number)', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      totalSum: '10000' as unknown as number,
    });
    expect(typeof dto.totalSum).toBe('number');
    expect(dto.totalSum).toBe(10000);
  });

  it('відхиляє expense item без amount', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      expenses: [{ category: 'Транспорт', name: 'Пальне' }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'expenses')).toBe(true);
  });

  it("відхиляє від'ємну суму витрати (вкладена валідація ExpenseItemDto)", async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      expenses: [{ category: 'Транспорт', name: 'Пальне', amount: -100 }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'expenses')).toBe(true);
  });

  it('відхиляє salary item без userId', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      salaries: [{ name: 'Іван', amount: 500 }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'salaries')).toBe(true);
  });
});

```

---

### `apps/backend/package.json`

```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.2",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.1",
    "@prisma/client": "6.19.0",
    "axios": "^1.18.0",
    "bcrypt": "^6.0.0",
    "cheerio": "^1.2.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.15.1",
    "dotenv": "^17.4.2",
    "node-telegram-bot-api": "0.64.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.18.0",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@types/bcrypt": "^6.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^24.0.0",
    "@types/node-telegram-bot-api": "^0.64.15",
    "@types/passport-jwt": "^4.0.1",
    "@types/supertest": "^7.0.0",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^17.0.0",
    "jest": "^29.0.0",
    "jest-mock-extended": "^3.0.0",
    "prettier": "^3.4.2",
    "prisma": "6.19.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.20.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^src/(.*)$": "<rootDir>/$1"
    }
  },
  "prisma": {
    "schema": "prisma/schema.prisma"
  }
}

```

---

### `apps/frontend/src/components/school-profile/EventsTable.tsx`

```typescript


import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import type { Event } from '../../types';

interface EventsTableProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onDeleteSuccess: () => void;
}

export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess }: EventsTableProps) {
  
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Видалити цю подію?')) return;
    
    try {
      await axios.delete(`https://crm-57qd.onrender.com/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-2 w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Всі події ({events.length})</h3>
      </div>

      {/* Картки — мобільний вигляд */}
      <div className="md:hidden divide-y divide-slate-50">
        <AnimatePresence initial={false}>
        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            onClick={() => onEventSelect(ev.id)}
            className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'active:bg-slate-50'}`}
          >
            <div className="min-w-0">
              <p className="font-medium text-slate-800">{ev.project}</p>
              <p className="text-xs text-slate-500 mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-medium text-sm text-slate-700">{ev.price} грн</span>
              <button
                onClick={(e) => handleDelete(e, ev.id)}
                className="text-red-500 active:text-red-700 p-2"
              >
                🗑
              </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      {/* Таблиця — десктоп */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-slate-500">
              <th className="p-4">Дата</th>
              <th className="p-4">Проєкт</th>
              <th className="p-4">Вартість</th>
              <th className="p-4 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
            {events.map((ev, i) => (
              <motion.tr
                key={ev.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, delay: i * 0.03 }}
                onClick={() => onEventSelect(ev.id)}
                className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
              >
                <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="p-4">{ev.project}</td>
                <td className="p-4">{ev.price} грн</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={(e) => handleDelete(e, ev.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    🗑
                  </button>
                </td>
              </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}



```

---

### `apps/frontend/src/tests/component/EventsTable.test.tsx`

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("axios", () => ({
  default: { delete: vi.fn().mockResolvedValue({}) },
}));

import EventsTable from "../../components/school-profile/EventsTable";

const mockEvents = [
  {
    id: "ev-1",
    project: "Голограма",
    date: "2026-07-01T10:00:00Z",
    price: 5000,
    status: "BASE",
  },
  {
    id: "ev-2",
    project: "Малювайко",
    date: "2026-08-01T10:00:00Z",
    price: 3000,
    status: "FIRST_CONTACT",
  },
];

describe("EventsTable", () => {
  const onEventSelect = vi.fn();
  const onDeleteSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });

  it("відображає всі події", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
   
    expect(screen.getAllByText("Голограма")).toHaveLength(2);
    expect(screen.getAllByText("Малювайко")).toHaveLength(2);
  });

  it("показує кількість подій у заголовку", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Всі події (2)")).toBeInTheDocument();
  });

  it("не рендериться якщо events порожній", () => {
    const { container } = render(
      <MemoryRouter>
        <EventsTable
          events={[]}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("викликає onEventSelect при кліку на подію", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getAllByText("Голограма")[0]);
    expect(onEventSelect).toHaveBeenCalledWith("ev-1");
  });

  it("показує підтвердження перед видаленням", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    const deleteButtons = screen.getAllByText("🗑");
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith("Видалити цю подію?");
  });

  it("не видаляє якщо confirm повернув false", async () => {
    window.confirm = vi.fn(() => false);
    const axios = await import("axios");
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    const deleteButtons = screen.getAllByText("🗑");
    fireEvent.click(deleteButtons[0]);
    expect(axios.default.delete).not.toHaveBeenCalled();
  });

  it("виділяє вибрану подію", () => {
    const { container } = render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId="ev-1"
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    const selected = container.querySelector(".bg-blue-50\\/50");
    expect(selected).toBeInTheDocument();
  });
});

```

---

### `apps/frontend/src/hooks/useSchools.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useSchoolsList() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: () =>
      api.get("/schools?minimal=true", { headers: h() }).then(r => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: any) =>
      api.post("/schools", { ...form, type: "Школа" }, { headers: h() }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/schools/${id}`, { headers: h() }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useBulkImport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ cityId, type }: { cityId: string; type: string }) =>
      api.post("/schools/bulk-import", { cityId, type }, {
        headers: h(),
        timeout: 120000,
      }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}
```

---

### `apps/frontend/src/tests/unit/hooks/useSchools.test.ts`

```typescript
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";

vi.mock("../../../hooks/useSchools", () => ({
  useSchoolsList: vi.fn(() => ({
    data: [
      {
        id: "school-1",
        name: "Школа №1",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 300,
        events: [],
      },
      {
        id: "school-2",
        name: "Школа №5",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 100,
        events: [],
      },
    ],
    isLoading: false,
    isSuccess: true,
  })),
}));

import { useSchoolsList } from "../../../hooks/useSchools";

const makeWrapper = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: qc, children });
};

describe("useSchoolsList", () => {
  it("повертає список шкіл", async () => {
    const { result } = renderHook(() => useSchoolsList(), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe("Школа №1");
  });

  it("isLoading на початку", () => {
    const { result } = renderHook(() => useSchoolsList(), {
      wrapper: makeWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });
});

```

---

