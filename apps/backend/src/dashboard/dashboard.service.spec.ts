import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

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
