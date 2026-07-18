import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { FinanceService } from './finance.service';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

const mockPrisma = {
  eventReport: { aggregate: jest.fn(), findMany: jest.fn() },
  event: { aggregate: jest.fn(), findMany: jest.fn(), count: jest.fn() },
  expenseItem: { findMany: jest.fn(), aggregate: jest.fn() },
  manualExpense: { findMany: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn(), count: jest.fn() },
  salaryRecord: { findMany: jest.fn(), aggregate: jest.fn() },
  city: { findMany: jest.fn() },
  user: { findUnique: jest.fn() },
  $queryRaw: jest.fn(),
};

const mockCacheManager = {
  get: jest.fn().mockResolvedValue(undefined),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

const mockCacheVersion = {
  getVersion: jest.fn().mockResolvedValue(0),
  bumpVersion: jest.fn().mockResolvedValue(undefined),
};

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
  mockPrisma.event.aggregate.mockResolvedValueOnce({ _sum: { price: 30000 } });
  mockPrisma.event.findMany.mockResolvedValueOnce([]);
  mockPrisma.city.findMany.mockResolvedValueOnce([]);
  mockPrisma.eventReport.findMany
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([]);
  mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
  mockPrisma.manualExpense.findMany.mockResolvedValueOnce([]);
  mockPrisma.salaryRecord.findMany.mockResolvedValueOnce([]);
  mockPrisma.expenseItem.aggregate.mockResolvedValueOnce({
    _sum: { amount: 0 },
  });
  mockPrisma.salaryRecord.aggregate.mockResolvedValueOnce({
    _sum: { amount: 0 },
  });
};

describe('Smoke: FinanceService', () => {
  let service: FinanceService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: CacheVersionService, useValue: mockCacheVersion },
      ],
    }).compile();
    service = module.get(FinanceService);
  });

  it('getDashboard повертає KPI з aggregate', async () => {
    defaultMocks();
    const result = await service.getDashboard({});
    expect(mockPrisma.eventReport.aggregate).toHaveBeenCalled();
    expect(result.kpi.totalRevenue).toBe(50000);
    expect(result.kpi.totalProfit).toBe(20000);
    expect(result.kpi.totalEvents).toBe(10);
  });
});
