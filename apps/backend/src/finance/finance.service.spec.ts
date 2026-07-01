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
