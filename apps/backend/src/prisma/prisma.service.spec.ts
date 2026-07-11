import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService, convertDecimalsDeep } from './prisma.service';
import { Prisma } from '@prisma/client';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('convertDecimalsDeep', () => {
  it('перетворює Prisma.Decimal у number', () => {
    const input = new Prisma.Decimal('123.45');
    expect(convertDecimalsDeep(input)).toBe(123.45);
  });

  it('перетворює Decimal у вкладених обʼєктах і масивах', () => {
    const input = {
      totalSum: new Prisma.Decimal('1000'),
      report: {
        schoolSum: new Prisma.Decimal('200'),
        expenseItems: [{ amount: new Prisma.Decimal('50.5') }],
        salaryRecords: [
          { amount: new Prisma.Decimal('300') },
          { amount: new Prisma.Decimal('0') },
        ],
      },
    };
    const result = convertDecimalsDeep(input) as typeof input;
    expect(result.totalSum).toBe(1000);
    expect(result.report.schoolSum).toBe(200);
    expect(result.report.expenseItems[0].amount).toBe(50.5);
    expect(result.report.salaryRecords[0].amount).toBe(300);
    expect(result.report.salaryRecords[1].amount).toBe(0);
  });

  it('не чіпає Date та null/undefined', () => {
    const date = new Date('2026-07-01T10:00:00Z');
    expect(convertDecimalsDeep(date)).toBe(date);
    expect(convertDecimalsDeep(null)).toBeNull();
    expect(convertDecimalsDeep(undefined)).toBeUndefined();
  });

  it('не змінює звичайні числа й рядки', () => {
    expect(convertDecimalsDeep(42)).toBe(42);
    expect(convertDecimalsDeep('текст')).toBe('текст');
    expect(convertDecimalsDeep([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('повертає масив записів із number-полями amount', () => {
    const input = [
      { id: '1', amount: new Prisma.Decimal('1500') },
      { id: '2', amount: new Prisma.Decimal('2500.75') },
    ];
    const result = convertDecimalsDeep(input) as typeof input;
    expect(result[0].amount).toBe(1500);
    expect(result[1].amount).toBe(2500.75);
  });
});
