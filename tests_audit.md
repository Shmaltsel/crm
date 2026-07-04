# Аудит: Тести та DTO

### `apps/backend/src/dashboard/dashboard.service.spec.ts`

```typescript
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

```

---

### `apps/backend/src/schools/schools.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('SchoolsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: {} },
        { provide: ParserService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    expect(module.get(SchoolsController)).toBeDefined();
  });
});

```

---

### `apps/backend/src/auth/auth.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: { login: jest.fn() } }],
    }).compile();
    expect(module.get(AuthController)).toBeDefined();
  });
});

```

---

### `apps/backend/src/events/dto/submit-report.dto.ts`

```typescript
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExpenseItemDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}

export class SalaryItemDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsString()
  role?: string;
}

export class SubmitReportDto {
  @IsBoolean()
  announcementDone: boolean;

  @IsBoolean()
  materialShown: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  classesCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  privilegedCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  showingsCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSum: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  schoolSum: number;

  @IsNumber()
  @Type(() => Number)
  remainderSum: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  @Type(() => Number)
  rating?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseItemDto)
  expenses: ExpenseItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryItemDto)
  salaries: SalaryItemDto[];
}

```

---

### `apps/backend/src/events/dto/submit-report.dto.spec.ts`

```typescript
import 'reflect-metadata';
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
  rating: 5,
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

