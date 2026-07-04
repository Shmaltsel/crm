# Аудит: Сервіси та Тести

### `apps/backend/src/dashboard/dashboard.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

const mockCacheManager = {
  get: jest.fn().mockResolvedValue(undefined),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

const today = new Date();
const todayStr = today.toISOString();

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    groupBy: jest.fn(),
    $queryRaw: jest.fn(),
  },
  school: {
    findMany: jest.fn(),
    groupBy: jest.fn(),
  },
  city: { findMany: jest.fn() },
  eventHistory: { findMany: jest.fn() },
  $queryRaw: jest.fn(),
};

const makeService = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DashboardService,
      { provide: PrismaService, useValue: mockPrisma },
      { provide: CACHE_MANAGER, useValue: mockCacheManager },
    ],
  }).compile();
  return module.get<DashboardService>(DashboardService);
};

const defaultMocks = () => {
  mockPrisma.event.findMany
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([]);
  mockPrisma.$queryRaw.mockResolvedValueOnce([
    { status: 'BASE', count: BigInt(10) },
    { status: 'FIRST_CONTACT', count: BigInt(5) },
    { status: 'IN_PROGRESS', count: BigInt(3) },
  ]);
  mockPrisma.school.findMany.mockResolvedValueOnce([]);
  mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
};

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    jest.clearAllMocks();
    service = await makeService();
    (service as any).cache.clear();
  });

  describe('getSummary — funnel', () => {
    it('коректно рахує воронку по стадіях', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.funnel['BASE']).toBe(10);
      expect(result.funnel['FIRST_CONTACT']).toBe(5);
      expect(result.funnel['IN_PROGRESS']).toBe(3);
    });

    it('totalSchools = сума всіх записів воронки', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.totalSchools).toBe(18);
    });

    it('всі етапи пайплайну присутні у funnel', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      const expectedStages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of expectedStages) {
        expect(result.funnel).toHaveProperty(stage);
      }
    });
  });

  describe('getSummary — todayEvents', () => {
    it('повертає сьогоднішні події', async () => {
      const todayEvent = {
        id: 'ev-1',
        project: 'Голограма',
        date: todayStr,
        school: { id: 's-1', name: 'Школа №1' },
        city: { id: 'c-1', name: 'Львів' },
        crew: null,
      };
      mockPrisma.event.findMany
        .mockResolvedValueOnce([todayEvent])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.todayEvents).toHaveLength(1);
      expect(result.todayEvents[0].id).toBe('ev-1');
    });

    it('повертає порожній масив якщо сьогодні подій немає', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.todayEvents).toHaveLength(0);
    });
  });

  describe('getSummary — upcomingEvents', () => {
    it('повертає майбутні події', async () => {
      const upcoming = {
        id: 'ev-2',
        project: 'Малювайко',
        date: todayStr,
        school: null,
        city: null,
        crew: null,
      };
      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([upcoming])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.upcomingEvents).toHaveLength(1);
      expect(result.upcomingEvents[0].id).toBe('ev-2');
    });
  });

  describe('getSummary — staleSchools', () => {
    it('повертає школи без активності більше 7 днів', async () => {
      const staleDate = new Date();
      staleDate.setDate(staleDate.getDate() - 10);

      const staleSchool = {
        id: 's-stale',
        name: 'Стала школа',
        events: [
          {
            status: 'FIRST_CONTACT',
            history: [{ createdAt: staleDate }],
          },
        ],
      };

      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([staleSchool]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.staleSchools).toHaveLength(1);
      expect(result.staleSchools[0].id).toBe('s-stale');
      expect(result.staleSchools[0].daysStale).toBeGreaterThanOrEqual(9);
    });

    it('сортує staleSchools від найстарішої активності', async () => {
      const date10 = new Date();
      date10.setDate(date10.getDate() - 10);
      const date20 = new Date();
      date20.setDate(date20.getDate() - 20);

      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([
        {
          id: 's-1',
          name: 'Школа 1',
          events: [{ status: 'BASE', history: [{ createdAt: date10 }] }],
        },
        {
          id: 's-2',
          name: 'Школа 2',
          events: [{ status: 'BASE', history: [{ createdAt: date20 }] }],
        },
      ]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.staleSchools[0].daysStale).toBeGreaterThan(
        result.staleSchools[1].daysStale!,
      );
    });
  });

  describe('getSummary — monthlyKpi', () => {
    it('коректно рахує KPI за місяць', async () => {
      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          {
            id: 'ev-1',
            report: { totalSum: 10000, remainderSum: 4000, childrenCount: 100 },
          },
          {
            id: 'ev-2',
            report: { totalSum: 5000, remainderSum: 2000, childrenCount: 50 },
          },
        ]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.monthlyKpi.revenue).toBe(15000);
      expect(result.monthlyKpi.profit).toBe(6000);
      expect(result.monthlyKpi.children).toBe(150);
      expect(result.monthlyKpi.count).toBe(2);
    });

    it('повертає нулі якщо звітів немає', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.monthlyKpi).toEqual({
        revenue: 0,
        profit: 0,
        children: 0,
        count: 0,
      });
    });
  });

  describe('getSummary — citiesStats (SUPERADMIN)', () => {
    it('повертає citiesStats для SUPERADMIN', async () => {
      defaultMocks();
      mockPrisma.city.findMany.mockResolvedValueOnce([
        { id: 'c-1', name: 'Львів' },
        { id: 'c-2', name: 'Київ' },
      ]);
      mockPrisma.school.groupBy.mockResolvedValueOnce([
        { cityId: 'c-1', _count: { id: 50 } },
      ]);
      mockPrisma.event.groupBy.mockResolvedValueOnce([
        { cityId: 'c-1', _count: { id: 5 } },
      ]);
      mockPrisma.event.findMany.mockResolvedValueOnce([
        { cityId: 'c-1', report: { totalSum: 20000 } },
      ]);

      const result = await service.getSummary(undefined, 'SUPERADMIN');
      expect(result.citiesStats).toHaveLength(2);
      const lviv = result.citiesStats.find((c) => c.cityId === 'c-1');
      expect(lviv?.schoolsCount).toBe(50);
      expect(lviv?.activeEvents).toBe(5);
      expect(lviv?.monthRevenue).toBe(20000);
    });

    it('повертає порожній citiesStats для не-SUPERADMIN', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1', 'MANAGER');
      expect(result.citiesStats).toHaveLength(0);
    });
  });

  describe('getSummary — кеш', () => {
    it('повертає кешований результат при повторному виклику', async () => {
      defaultMocks();
      await service.getSummary('city-1');
      await service.getSummary('city-1');
      expect(mockPrisma.event.findMany).toHaveBeenCalledTimes(3);
    });
  });
});

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
    aggregate: jest.fn(),
  },

  salaryItem: {
    findMany: jest.fn(),
    aggregate: jest.fn(),
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
      mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
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
      mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
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
      mockPrisma.expenseItem.findMany.mockResolvedValueOnce([
        { category: 'Паливо', amount: 500 },
        { category: 'Паливо', amount: 300 },
        { category: 'Реклама', amount: 200 },
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

### `apps/backend/src/schools/schools.service.ts`

```typescript
import {
  Injectable,
  Logger,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { Prisma } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

@Injectable()
export class SchoolsService {
  private readonly logger = new Logger(SchoolsService.name);

  constructor(
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: {
    name: string;
    type: string;
    cityId: string;
    sourceUrl?: string;
    director?: string;
    phone?: string;
    address?: string;
    childrenCount?: number;
  }) {
    const { sourceUrl, ...schoolData } = data;

    const newSchool = await this.prisma.school.create({
      data: schoolData,
    });

    this.parserService
      .parseSchoolData(data.name, sourceUrl, data.type)
      .then(async (parsed) => {
        if (!parsed) {
          this.logger.warn(`Не вдалося знайти дані для закладу: ${data.name}`);
          return;
        }

        const updateData: Record<string, unknown> = {};

        if (!schoolData.address && parsed.address) {
          updateData.address = parsed.address;
        }
        if (!schoolData.director && parsed.director) {
          updateData.director = parsed.director;
        }
        if (!schoolData.childrenCount && parsed.childrenCount) {
          updateData.childrenCount = parsed.childrenCount;
        }

        if (Object.keys(updateData).length === 0) {
          this.logger.log(
            `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
          );
          return;
        }

        await this.prisma.school.update({
          where: {
            id: newSchool.id,
          },
          data: updateData,
        });

        this.logger.log(`Дані школи "${data.name}" успішно оновлені`);
      })
      .catch((error: Error) => {
        this.logger.error(`Помилка оновлення даних школи: ${error.message}`);
      });

    return newSchool;
  }

  private buildFilters(
    query: Pick<
      SchoolQueryDto,
      'search' | 'cityId' | 'type' | 'stage' | 'size'
    >,
  ): Prisma.Sql[] {
    const { search, cityId, type, stage, size } = query;
    const conditions: Prisma.Sql[] = [];

    if (search) {
      const trimmed = search.trim();
      const isNumeric = /^\d+$/.test(trimmed);

      if (isNumeric) {
        const numberBoundary = `%№${trimmed}%`;
        const numberWord = `% ${trimmed}%`;
        conditions.push(
          Prisma.sql`(s.name ILIKE ${numberBoundary} OR s.name ILIKE ${numberWord} OR s.name ILIKE ${trimmed + '%'})`,
        );
      } else {
        conditions.push(Prisma.sql`s.name ILIKE ${`%${trimmed}%`}`);
      }
    }
    if (cityId) {
      conditions.push(Prisma.sql`s."cityId" = ${cityId}`);
    }
    if (type) {
      conditions.push(Prisma.sql`s.type = ${type}`);
    }
    if (stage) {
      conditions.push(this.stageCondition(stage));
    }
    if (size) {
      conditions.push(this.sizeCondition(size));
    }

    return conditions;
  }

  private sizeCaseSql(): Prisma.Sql {
    return Prisma.sql`
      CASE
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 50 THEN 'small'
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 100 THEN 'medium'
        WHEN s.type = 'Садочок' THEN 'large'
        WHEN COALESCE(s."childrenCount", 0) < 500 THEN 'small'
        WHEN COALESCE(s."childrenCount", 0) < 900 THEN 'medium'
        ELSE 'large'
      END
    `;
  }

  private stageCondition(stage: string): Prisma.Sql {
    switch (stage) {
      case 'planned':
        return Prisma.sql`latest.status::text IN (${Prisma.join(PLANNED_STAGES)})`;
      case 'inProgress':
        return Prisma.sql`latest.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})`;
      case 'done':
        return Prisma.sql`latest.status::text = 'RE_SALE'`;
      default:
        return Prisma.sql`(latest.status IS NULL OR latest.status::text IN ('INTERESTED','PRE_APPROVAL'))`;
    }
  }

  private sizeCondition(size: string): Prisma.Sql {
    return Prisma.sql`(${this.sizeCaseSql()}) = ${size}`;
  }

  private latestEventJoin(): Prisma.Sql {
    return Prisma.sql`
      LEFT JOIN LATERAL (
        SELECT e.status FROM "Event" e
        WHERE e."schoolId" = s.id
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
    `;
  }

  private mapRow(row: {
    city_id: string | null;
    city_name: string | null;
    latestStatus: string | null;
    [key: string]: unknown;
  }) {
    const { city_id, city_name, latestStatus, ...school } = row;
    return {
      ...school,
      city: city_id ? { id: city_id, name: city_name } : null,
      events: latestStatus ? [{ status: latestStatus }] : [],
    };
  }

  async findAll(query: SchoolQueryDto) {
    const { skip, take, page } = query;
    const conditions = this.buildFilters(query);
    const whereClause = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      LEFT JOIN "City" c ON c.id = s."cityId"
      ${this.latestEventJoin()}
    `;

    const rows = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT s.*, c.id as city_id, c.name as city_name, latest.status as "latestStatus"
      ${baseFrom}
      ${whereClause}
      ORDER BY s."createdAt" DESC
      OFFSET ${skip} LIMIT ${take}
    `);

    const countRows = await this.prisma.$queryRaw<
      { count: bigint }[]
    >(Prisma.sql`
      SELECT COUNT(*)::bigint as count
      ${baseFrom}
      ${whereClause}
    `);

    const totalItems = Number(countRows[0].count);

    return {
      data: rows.map((r) => this.mapRow(r)),
      meta: new PageMetaDto(totalItems, page, take),
    };
  }

  async getStats(query: Pick<SchoolQueryDto, 'cityId' | 'type' | 'stage'>) {
    const baseConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
    });
    const baseWhere = baseConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(baseConditions, ' AND ')}`
      : Prisma.empty;

    const sizeConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
      stage: query.stage,
    });
    const sizeWhere = sizeConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(sizeConditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      ${this.latestEventJoin()}
    `;

    const [statusRows, sizeRows] = await Promise.all([
      this.prisma.$queryRaw<{ stage: string; count: bigint }[]>(Prisma.sql`
        SELECT
          CASE
            WHEN latest.status::text IN (${Prisma.join(PLANNED_STAGES)}) THEN 'planned'
            WHEN latest.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)}) THEN 'inProgress'
            WHEN latest.status::text = 'RE_SALE' THEN 'done'
            ELSE 'new'
          END as stage,
          COUNT(*)::bigint as count
        ${baseFrom}
        ${baseWhere}
        GROUP BY stage
      `),
      this.prisma.$queryRaw<{ size: string; count: bigint }[]>(Prisma.sql`
        SELECT
          ${this.sizeCaseSql()} as size,
          COUNT(*)::bigint as count
        ${baseFrom}
        ${sizeWhere}
        GROUP BY size
      `),
    ]);

    const statusStats = { new: 0, planned: 0, inProgress: 0, done: 0 };
    for (const row of statusRows) statusStats[row.stage] = Number(row.count);

    const sizeStats = { small: 0, medium: 0, large: 0 };
    for (const row of sizeRows) sizeStats[row.size] = Number(row.count);

    return { statusStats, sizeStats };
  }

  async findOne(id: string) {
    const key = `school:${id}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const school = await this.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
    if (!school) {
      throw new AppException('SCHOOL_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.set(key, school, 15_000);
    return school;
  }

  async update(id: string, data: UpdateSchoolDto) {
    const {
      city,
      id: _id,
      createdAt,
      updatedAt,
      ...updateData
    } = data as UpdateSchoolDto & Record<string, unknown>;

    const updated = await this.prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
    await this.cacheManager.del(`school:${id}`);
    return updated;
  }

  async remove(id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    await Promise.all(
      events.map((event) => this.eventsService.remove(event.id)),
    );

    const deleted = await this.prisma.school.delete({
      where: {
        id,
      },
    });
    await this.cacheManager.del(`school:${id}`);
    return deleted;
  }

  async searchContacts(q: string, city?: string) {
    if (!q || q.trim().length < 1) return [];

    const cityName = city || 'Львів';
    const normalizedQuery = q.toLowerCase().trim();

    const allContacts = await this.prisma.schoolContact.findMany({
      where: { city: cityName },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
    });

    const STOP_WORDS = new Set([
      'школа',
      'школи',
      'садочок',
      'садок',
      'дитсадок',
      'днз',
      'ліцей',
      'гімназія',
      'зош',
      'центр',
      'розвитку',
      'комунальний',
      'заклад',
      'освіти',
      'імені',
      'ім',
    ]);

    const tokens = normalizedQuery
      .replace(/№/g, ' ')
      .split(/\s+/)
      .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
      .filter((t) => t.length > 0 && !STOP_WORDS.has(t));

    const matches = allContacts.filter((c) => {
      const num = c.schoolNumber.toLowerCase();

      if (num === normalizedQuery) return true;

      const isNumeric = /^\d+$/.test(num);

      if (isNumeric) {
        if (tokens.includes(num)) return true;
      } else {
        if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
          return true;
        if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
      }

      if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;

      return false;
    });

    return matches.slice(0, 10);
  }
  async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new AppException('CITY_NOT_FOUND', HttpStatus.NOT_FOUND);

    const allFromParser = await this.parserService.getAllSchoolsForCity(
      city.name,
      type,
    );

    const existingSchools = await this.prisma.school.findMany({
      where: { cityId, type },
      select: { name: true },
    });

    const normalize = (name: string) =>
      name
        .toLowerCase()
        .replace(/№/g, '')
        .replace(/["'«»]/g, '')
        .replace(/\s+/g, '')
        .trim();

    const existingNames = new Set(
      existingSchools.map((s) => normalize(s.name)),
    );

    const toCreate = allFromParser.filter(
      (s) => !existingNames.has(normalize(s.name)),
    );

    if (toCreate.length === 0) {
      return {
        total: allFromParser.length,
        created: 0,
        skipped: allFromParser.length,
      };
    }

    const contacts = await this.prisma.schoolContact.findMany({
      where: { city: city.name },
    });

    let created = 0;
    for (const school of toCreate) {
      if (existingNames.has(normalize(school.name))) continue;

      existingNames.add(normalize(school.name));

      const numMatch = school.name.match(/№?\s*(\d+)/);
      const num = numMatch?.[1];
      const matchedContacts = num
        ? contacts.filter((c) => c.schoolNumber === num)
        : contacts.filter((c) => {
            const normSchool = normalize(school.name);
            const normContact = normalize(c.schoolNumber);
            return (
              normSchool.includes(normContact) ||
              normContact.includes(normSchool)
            );
          });

      const director =
        matchedContacts.find(
          (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
        ) || matchedContacts[0];

      try {
        await this.create({
          name: school.name,
          type,
          cityId,
          sourceUrl: school.url,
          director: director?.contactName || '',
          phone: director?.phone || '',
        });
        created++;
      } catch (e) {
        this.logger.error(
          `Помилка створення ${school.name}: ${(e as Error).message}`,
        );
      }
    }

    return {
      city: city.name,
      total: allFromParser.length,
      created,
      skipped: allFromParser.length - created,
    };
  }
}

```

---

### `apps/backend/src/events/events.service.ts`

```typescript
import { Injectable, Logger, HttpStatus, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, PreparationStatus } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
import {
  SubmitReportDto,
  ExpenseItemDto,
  SalaryItemDto,
} from './dto/submit-report.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

const FIELD_ROLES = ['DRIVER', 'HOST'];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private readonly pendingSchoolEvents = new Map<string, Promise<unknown>>();

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAllForUser(user: JwtUser, query?: EventQueryDto) {
    const isFieldStaff = FIELD_ROLES.includes(user.role);
    const where = isFieldStaff
      ? { crew: { OR: [{ hostId: user.sub }, { driverId: user.sub }] } }
      : {};
    const include = {
      school: { select: { id: true, name: true, type: true } },
      city: { select: { id: true, name: true } },
      crew: {
        include: {
          host: { select: { id: true, name: true } },
          driver: { select: { id: true, name: true } },
        },
      },
    };

    if (!query?.page) {
      return this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
      });
    }

    const take = query.take ?? 20;
    const skip = (query.page - 1) * take;

    const [data, totalItems] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
        skip,
        take,
      }),
      this.prisma.event.count({ where }),
    ]);

    return { data, meta: new PageMetaDto(totalItems, query.page, take) };
  }

  async create(data: CreateEventDto, user: JwtUser) {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        status: 'BASE' as never,
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { history: true },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async updateStatus(
    eventId: string,
    newStatus: string,
    actionName: string,
    comment: string | undefined,
    user: JwtUser,
  ) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus as never,
        history: {
          create: {
            action: actionName,
            comment: comment || null,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async updatePreparationStatus(
    eventId: string,
    field: keyof Omit<
      Prisma.EventPreparationUncheckedCreateInput,
      'id' | 'eventId'
    >,
    status: PreparationStatus,
  ) {
    const result = await this.prisma.eventPreparation.upsert({
      where: { eventId },
      update: { [field]: status },
      create: { eventId, [field]: status },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { schoolId: true },
    });
    if (event) await this.invalidateSchoolEventsCache(event.schoolId);
    return result;
  }

  async assignCrewToEvent(eventId: string, crewId: string) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: { crewId: crewId },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const hostId = event.crew?.hostId;
    const driverId = event.crew?.driverId;

    const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = event.time ? `, ${event.time}` : '';

    const buildMessage = (role: 'ведучий' | 'водій') =>
      `🎯 <b>Вас призначено на подію!</b>\n\n` +
      `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
      `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      (event.contactPerson
        ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
        : '') +
      (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    if (hostId) {
      const hostChatId = await this.getChatIdForUser(hostId);
      this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);

      if (hostChatId) {
        this.telegramService
          .sendMessage(hostChatId, buildMessage('ведучий'))
          .catch((e) =>
            this.logger.warn(`[assignCrew] Telegram send failed: ${e}`),
          );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
        );
      }
    }

    if (driverId) {
      const driverChatId = await this.getChatIdForUser(driverId);
      this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);

      if (driverChatId) {
        this.telegramService
          .sendMessage(driverChatId, buildMessage('водій'))
          .catch((e) =>
            this.logger.warn(`[assignCrew] Telegram send failed: ${e}`),
          );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
        );
      }
    }

    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async rescheduleEvent(
    eventId: string,
    newDate: string,
    newTime: string,
    user: JwtUser,
  ) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        date: new Date(newDate),
        time: newTime,
        history: {
          create: {
            action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const msg =
      `📅 <b>Подію перенесено!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    const sendTo = async (userId: string | null | undefined) => {
      if (!userId) return;
      const u = await this.prisma.user.findUnique({ where: { id: userId } });
      const chatId =
        u?.telegramChatId ||
        (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
      if (chatId) await this.telegramService.sendMessage(chatId, msg);
    };

    await sendTo(event.crew?.hostId);
    await sendTo(event.crew?.driverId);

    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async getChatIdForUser(userId: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    if (user.telegramChatId) return user.telegramChatId;

    if (user.telegramId && /^\d+$/.test(user.telegramId))
      return user.telegramId;

    return null;
  }

  async findBySchool(schoolId: string, minimal = false) {
    const key = `events:school:${schoolId}:${minimal ? 'minimal' : 'full'}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const existing = this.pendingSchoolEvents.get(key);
    if (existing) return existing;

    const compute = this.computeBySchool(key, schoolId, minimal);
    this.pendingSchoolEvents.set(key, compute);
    try {
      return await compute;
    } finally {
      this.pendingSchoolEvents.delete(key);
    }
  }

  private async computeBySchool(
    key: string,
    schoolId: string,
    minimal: boolean,
  ) {
    let result;
    if (minimal) {
      result = await this.prisma.event.findMany({
        where: { schoolId },
        select: {
          id: true,
          project: true,
          date: true,
          time: true,
          status: true,
          price: true,
          childrenPlanned: true,
          address: true,
          contactPerson: true,
          contactPhone: true,
          crewId: true,
          crew: {
            select: { id: true, name: true, hostId: true, driverId: true },
          },
        },
        orderBy: { date: 'desc' },
      });
    } else {
      result = await this.prisma.event.findMany({
        where: { schoolId },
        include: {
          crew: { include: { host: true, driver: true } },
          history: { orderBy: { createdAt: 'desc' } },
          preparation: true,
        },
        orderBy: { date: 'desc' },
      });
    }

    await this.cacheManager.set(key, result, 15_000);
    return result;
  }

  async updateHistoryComment(historyId: string, comment: string) {
    const history = await this.prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null },
      include: { event: { select: { schoolId: true } } },
    });
    await this.invalidateSchoolEventsCache(history.event.schoolId);
    return history;
  }

  async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
    await this.prisma.eventHistory.create({
      data: {
        eventId,
        action: 'Коментар',
        comment,
        userId: user.sub,
        userName: user.name,
        role: user.role,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        history: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (event) await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async remove(id: string) {
    const exists = await this.prisma.event.findUnique({ where: { id } });
    if (!exists)
      throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    const deleted = await this.prisma.event.delete({
      where: { id },
    });
    await this.invalidateSchoolEventsCache(exists.schoolId);
    return deleted;
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    const report = await this.prisma.eventReport.upsert({
      where: { eventId },
      update: {
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
      create: {
        eventId,
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
    });

    await this.prisma.expenseItem.deleteMany({
      where: { reportId: report.id },
    });
    await this.prisma.salaryItem.deleteMany({ where: { reportId: report.id } });

    if (reportData.expenses?.length) {
      await this.prisma.expenseItem.createMany({
        data: reportData.expenses.map((exp: ExpenseItemDto) => ({
          reportId: report.id,
          category: exp.category || 'Інше',
          name: exp.name,
          amount: new Prisma.Decimal(exp.amount || 0),
        })),
      });
    }

    if (reportData.salaries?.length) {
      await Promise.all(
        reportData.salaries
          .filter((s) => s.userId && s.amount > 0)
          .map((s) =>
            this.prisma.user.update({
              where: { id: s.userId },
              data: { balance: { increment: s.amount } },
            }),
          ),
      );
    }

    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'RE_SALE' as never,
        history: {
          create: {
            action: 'Сформовано звіт. Захід завершено.',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        school: true,
        city: true,
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
        report: true,
      },
    });
    if (!event) throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    return event;
  }

  async findCompletedBySchool(schoolId: string) {
    return this.prisma.event.findMany({
      where: { schoolId, status: 'RE_SALE' },
      select: {
        id: true,
        project: true,
        date: true,
        status: true,
        price: true,
        childrenPlanned: true,
        report: {
          select: {
            childrenCount: true,
            classesCount: true,
            privilegedCount: true,
            showingsCount: true,
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
            expenseItems: {
              select: { category: true, name: true, amount: true },
            },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { date: 'desc' },
    });
  }
}

```

---

### `apps/backend/src/cities/cities.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
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
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
        { provide: AuthGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();
    expect(module.get(CitiesController)).toBeDefined();
  });
});

```

---

### `apps/backend/src/events/events.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { JwtService } from '@nestjs/jwt';
import { OwnershipGuard } from '../common/guards/ownership.guard';

describe('EventsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: {} },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(OwnershipGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();
    expect(module.get(EventsController)).toBeDefined();
  });
});

```

---

