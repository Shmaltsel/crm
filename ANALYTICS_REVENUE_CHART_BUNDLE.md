# Revenue Chart — Analytics Page — Full Source Bundle

> Generated for external analysis. Contains all files relevant to the revenue/profit chart on the `/analytics` page.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Files Included](#files-included)
3. [Prisma Schema — AnalyticsTarget & AnalyticsAnnotation](#prisma-schema)
4. [Backend — analytics.module.ts](#backend-analytics-module)
5. [Backend — analytics.controller.ts](#backend-analytics-controller)
6. [Backend — analytics.service.ts](#backend-analytics-service)
7. [Frontend — config/api.ts](#frontend-api-config)
8. [Frontend — hooks/useAnalytics.ts](#frontend-hooks-useanalytics)
9. [Frontend — components/chart/types.ts](#chart-types)
10. [Frontend — components/chart/helpers.ts](#chart-helpers)
11. [Frontend — components/chart/index.ts](#chart-index)
12. [Frontend — components/chart/EChartsRevenueChart.tsx](#echarts-revenue-chart)
13. [Frontend — lib/motion.ts](#motion-lib)
14. [Frontend — pages/Analytics.tsx](#analytics-page)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                                                                 │
│  pages/Analytics.tsx                                            │
│    ├── useRevenueByCityMonth() ──┐                              │
│    ├── useRevenueByDay() ────────┤  hooks/useAnalytics.ts       │
│    ├── useEventsByCity() ────────┤  (React Query + axios)       │
│    ├── useAnalyticsTargets() ────┤                              │
│    ├── useAnalyticsAnnotations()─┘                              │
│    └── <EChartsRevenueChart />                                  │
│         └── components/chart/                                   │
│              ├── types.ts                                       │
│              ├── helpers.ts                                     │
│              └── EChartsRevenueChart.tsx                        │
│                   (echarts: LineChart + DataZoom + Tooltip)     │
└────────────────────────┬────────────────────────────────────────┘
                         │ GET /analytics/revenue-by-city-month
                         │ GET /analytics/revenue-by-day
                         │ GET /analytics/events-by-city
                         │ GET /analytics/targets
                         │ GET /analytics/annotations
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (NestJS)                           │
│                                                                 │
│  analytics/analytics.controller.ts                              │
│    └── analytics/analytics.service.ts                           │
│         ├── Prisma → raw SQL (Event + EventReport JOIN)         │
│         ├── Redis cache (cacheVersion + cacheManager)           │
│         └── Prisma ORM (AnalyticsTarget, AnalyticsAnnotation)   │
│                                                                 │
│  Prisma schema:                                                 │
│    ├── Event (status='RE_SALE', date, cityId, project)          │
│    ├── EventReport (totalSum=revenue, remainderSum=profit)      │
│    ├── AnalyticsTarget (year, month, target)                    │
│    └── AnalyticsAnnotation (year, month, text, color)           │
└─────────────────────────────────────────────────────────────────┘
```

**Key data flow:**
- Backend queries `Event` + `EventReport` with `status = 'RE_SALE'`
- `totalSum` = revenue, `remainderSum` = profit
- Data grouped by year/month/city/project
- Frontend aggregates into chart entries, supports month/day granularity
- ECharts renders with zoom, presets (7D/30D/3M/6M/YTD/1Y/ALL), tooltip with delta %

---

## Files Included

| # | File | Lines | Purpose |
|---|------|-------|---------|
| 1 | `apps/backend/prisma/schema.prisma` (L543-564) | 22 | Prisma models |
| 2 | `apps/backend/src/analytics/analytics.module.ts` | 12 | NestJS module |
| 3 | `apps/backend/src/analytics/analytics.controller.ts` | 318 | REST endpoints + DTOs |
| 4 | `apps/backend/src/analytics/analytics.service.ts` | 570 | Business logic + raw SQL |
| 5 | `apps/frontend/src/config/api.ts` | 73 | Axios instance + CSRF |
| 6 | `apps/frontend/src/hooks/useAnalytics.ts` | 154 | React Query hooks + TS types |
| 7 | `apps/frontend/src/components/chart/types.ts` | 21 | Chart prop types |
| 8 | `apps/frontend/src/components/chart/helpers.ts` | 86 | Formatting + range utils |
| 9 | `apps/frontend/src/components/chart/index.ts` | 2 | Barrel export |
| 10 | `apps/frontend/src/components/chart/EChartsRevenueChart.tsx` | 473 | ECharts line chart |
| 11 | `apps/frontend/src/lib/motion.ts` | 326 | Framer Motion helpers |
| 12 | `apps/frontend/src/pages/Analytics.tsx` | 2068 | Main analytics page |

---

## Prisma Schema

```prisma
// apps/backend/prisma/schema.prisma (lines 543-564)

model AnalyticsTarget {
  id        String   @id @default(uuid())
  year      Int
  month     Int
  target    Decimal  @db.Decimal(12, 2)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([year, month])
}

model AnalyticsAnnotation {
  id        String   @id @default(uuid())
  year      Int
  month     Int
  text      String
  color     String   @default("#3b82f6")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([year, month])
}
```

---

## Backend — analytics.module.ts

```typescript
// apps/backend/src/analytics/analytics.module.ts

import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisCacheModule } from '../common/cache/redis-cache.module';

@Module({
  imports: [PrismaModule, RedisCacheModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
```

---

## Backend — analytics.controller.ts

```typescript
// apps/backend/src/analytics/analytics.controller.ts

import { Controller, Get, Put, Query, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
  ApiProperty,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString, IsInt, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class RevenueByMonthDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class YearQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class ProfitByCityDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class SalaryFundDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  month?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ description: 'YYYY-MM-DD — фільтр по конкретній даті' })
  @IsOptional()
  @IsString()
  date?: string;
}

class RevenueByDayDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsInt()
  month?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  project?: string;
}
 class CityLeaderboardDto {
  @ApiPropertyOptional({ default: 'events' })
  @IsOptional()
  @IsString()
  metric?: string = 'events';

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  schoolType?: string;
}

class SetTargetDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  year!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  month!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  target!: number;
}

class SetAnnotationDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  year!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  month!: number;

  @ApiProperty()
  @IsString()
  text!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;
}

@ApiTags('Analytics')
@ApiCookieAuth('access_token')
@Controller('analytics')
@UseGuards(AuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Дохід по місяцях' })
  @Get('revenue-by-month')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async revenueByMonth(
    @CurrentUser() user: JwtUser,
    @Query() query: RevenueByMonthDto,
  ) {
    const effectiveCityId = await this.resolveCityId(user, query.cityId);
    return this.analyticsService.revenueByMonth(
      effectiveCityId,
      query.projectId,
      query.year,
    );
  }

  @ApiOperation({ summary: 'Дохід по місяцях з розбивкою по містах' })
  @Get('revenue-by-city-month')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async revenueByCityMonth(@Query() query: RevenueByMonthDto) {
    return this.analyticsService.revenueByCityMonth(
      query.projectId,
      query.year,
    );
  }


  @ApiOperation({ summary: 'Дохід по днях' })
  @Get('revenue-by-day')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async revenueByDay(@CurrentUser() user: JwtUser, @Query() query: RevenueByDayDto) {
    const effectiveCityId = await this.resolveCityId(user, query.cityId);
    return this.analyticsService.revenueByDay({
      year: query.year,
      month: query.month,
      cityId: effectiveCityId,
      project: query.project,
    });
  }
  @ApiOperation({ summary: 'Події по містах' })
  @Get('events-by-city')
  @Roles('SUPERADMIN', 'OWNER')
  async eventsByCity(@Query() query: YearQueryDto) {
    return this.analyticsService.eventsByCity(query.year);
  }

  @ApiOperation({ summary: 'Прибуток по містах' })
  @Get('profit-by-city')
  @Roles('SUPERADMIN', 'OWNER')
  async profitByCity(@Query() query: ProfitByCityDto) {
    return this.analyticsService.profitByCity(query.cityId, query.year);
  }

  @ApiOperation({ summary: 'Фонд зарплати' })
  @Get('salary-fund')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async salaryFund(
    @CurrentUser() user: JwtUser,
    @Query() query: SalaryFundDto,
  ) {
    const effectiveCityId = await this.resolveCityId(user, query.cityId);
    return this.analyticsService.salaryFund(
      query.month,
      query.year,
      effectiveCityId,
    );
  }

  @ApiOperation({ summary: 'Рейтинг міст за метрикою' })
  @Get('city-leaderboard')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async cityLeaderboard(@Query() query: CityLeaderboardDto) {
    return this.analyticsService.cityLeaderboard(query.metric, query.year, query.schoolType);
  }



  @ApiOperation({ summary: 'Топ менеджерів за кількістю затверджених звітів' })
  @Get('kpi/managers')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async kpiManagers() {
    return this.analyticsService.kpiManagers();
  }

  @ApiOperation({ summary: 'Топ ведучих за рейтингом' })
  @Get('kpi/hosts')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async kpiHosts() {
    return this.analyticsService.kpiHosts();
  }

  @ApiOperation({ summary: 'Топ проєктів за подіями' })
  @Get('kpi/projects')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async kpiProjects() {
    return this.analyticsService.kpiProjects();
  }

  @ApiOperation({ summary: 'Цілі аналітики' })
  @Get('targets')
  @Roles('SUPERADMIN', 'OWNER')
  async getTargets(@Query() query: YearQueryDto) {
    return this.analyticsService.getTargets(query.year);
  }

  @ApiOperation({ summary: 'Встановити ціль аналітики' })
  @Put('targets')
  @Roles('SUPERADMIN', 'OWNER')
  async setTarget(@Body() dto: SetTargetDto) {
    return this.analyticsService.setTarget(dto.year, dto.month, dto.target);
  }

  @ApiOperation({ summary: 'Анотації аналітики' })
  @Get('annotations')
  @Roles('SUPERADMIN', 'OWNER')
  async getAnnotations(@Query() query: YearQueryDto) {
    return this.analyticsService.getAnnotations(query.year);
  }

  @ApiOperation({ summary: 'Встановити анотацію аналітики' })
  @Put('annotations')
  @Roles('SUPERADMIN', 'OWNER')
  async setAnnotation(@Body() dto: SetAnnotationDto) {
    return this.analyticsService.setAnnotation(
      dto.year,
      dto.month,
      dto.text,
      dto.color ?? '#3b82f6',
    );
  }

  private async resolveCityId(
    user: JwtUser,
    requestedCityId?: string,
  ): Promise<string | undefined> {
    if (user.role === 'SUPERADMIN' || user.role === 'OWNER') {
      return requestedCityId;
    }
    const me = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    return me?.cityId ?? undefined;
  }
}
```

---

## Backend — analytics.service.ts

```typescript
// apps/backend/src/analytics/analytics.service.ts

import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

const CACHE_TTL = 300_000;

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  private async vkey(ns: string): Promise<string> {
    const v = await this.cacheVersion.getVersion(ns);
    return `${ns}:v${v}`;
  }

  async invalidateAnalyticsCache() {
    await this.cacheVersion.bumpVersion('analytics');
  }

  async revenueByMonth(cityId?: string, projectId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:revenueByMonth:${cityId ?? ''}:${projectId ?? ''}:${yearFilter}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.revenueByMonth>>(
        cacheKey,
      );
    if (cached) return cached;

    const conditions = Prisma.sql`
      AND e.date >= ${new Date(`${yearFilter}-01-01`)}::date
      AND e.date < ${new Date(`${yearFilter + 1}-01-01`)}::date
      AND e.status IN ('RE_SALE')
    `;
    const cityCond = cityId
      ? Prisma.sql`AND e."cityId" = ${cityId}`
      : Prisma.empty;
    const projectCond = projectId
      ? Prisma.sql`AND e.project = ${projectId}`
      : Prisma.empty;

    type Row = {
      month: number;
      revenue: number;
      profit: number;
      events: bigint;
    };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        EXTRACT(MONTH FROM e.date)::int AS month,
        COALESCE(SUM(r."totalSum"), 0)::float AS revenue,
        COALESCE(SUM(r."remainderSum"), 0)::float AS profit,
        COUNT(*)::bigint AS events
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      WHERE 1=1 ${conditions} ${cityCond} ${projectCond}
      GROUP BY month
      ORDER BY month
    `;

    const monthMap = new Map(rows.map((r) => [r.month, r]));
    const result = Array.from({ length: 12 }, (_, i) => {
      const m = monthMap.get(i + 1);
      return {
        month: (i + 1).toString().padStart(2, '0'),
        revenue: m?.revenue ?? 0,
        profit: m?.profit ?? 0,
        events: Number(m?.events ?? 0),
      };
    });

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async revenueByCityMonth(projectId?: string, year?: number) {
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:revenueByCityMonth:${projectId ?? ''}:${year ?? 'all'}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.revenueByCityMonth>>(
        cacheKey,
      );
    if (cached) return cached;

    const conditions: Prisma.Sql[] = [Prisma.sql`AND e.status IN ('RE_SALE')`];
    if (year) {
      conditions.push(
        Prisma.sql`AND e.date >= ${new Date(`${year}-01-01`)}::date`,
      );
      conditions.push(
        Prisma.sql`AND e.date < ${new Date(`${year + 1}-01-01`)}::date`,
      );
    }
    const projectCond = projectId
      ? Prisma.sql`AND e.project = ${projectId}`
      : Prisma.empty;

    type Row = {
      year: number;
      month: number;
      cityName: string;
      project: string;
      revenue: number;
      profit: number;
    };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        EXTRACT(YEAR  FROM e.date)::int          AS year,
        EXTRACT(MONTH FROM e.date)::int          AS month,
        COALESCE(c.name, '—')                    AS "cityName",
        COALESCE(e.project, 'Інше')              AS project,
        COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
        COALESCE(SUM(r."remainderSum"), 0)::float AS profit
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      LEFT JOIN "City" c ON c.id = e."cityId"
      WHERE 1=1 ${Prisma.join(conditions, ' ')} ${projectCond}
      GROUP BY EXTRACT(YEAR FROM e.date), EXTRACT(MONTH FROM e.date), e."cityId", c.name, e.project
      ORDER BY year, month
    `;

    await this.cacheManager.set(cacheKey, rows, CACHE_TTL);
    return rows;
  }

  async revenueByDay(params: { year?: number; month?: number; cityId?: string; project?: string }) {
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:revenueByEvent:${params.year ?? ''}:${params.month ?? ''}:${params.cityId ?? ''}:${params.project ?? ''}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const conditions: Prisma.Sql[] = [Prisma.sql`AND e.status IN ('RE_SALE')`];
    if (params.year) {
      conditions.push(Prisma.sql`AND e.date >= ${new Date(`${params.year}-01-01`)}::date`);
      conditions.push(Prisma.sql`AND e.date < ${new Date(`${params.year + 1}-01-01`)}::date`);
    }
    if (params.month && params.year) {
      const start = new Date(params.year, params.month - 1, 1);
      const end = new Date(params.year, params.month, 1);
      conditions.push(Prisma.sql`AND e.date >= ${start}::date`);
      conditions.push(Prisma.sql`AND e.date < ${end}::date`);
    }
    if (params.cityId) {
      conditions.push(Prisma.sql`AND e."cityId" = ${params.cityId}`);
    }
    if (params.project) {
      conditions.push(Prisma.sql`AND e.project = ${params.project}`);
    }

    type EventRow = {
      eventId: string;
      date: string;
      time: string | null;
      cityName: string;
      project: string;
      revenue: number;
      profit: number;
    };
    const rows = await this.prisma.$queryRaw<EventRow[]>`
      SELECT
        e.id                                     AS "eventId",
        TO_CHAR(e.date, 'YYYY-MM-DD')            AS date,
        e.time                                   AS time,
        COALESCE(c.name, '—')                    AS "cityName",
        COALESCE(e.project, 'Інше')              AS project,
        COALESCE(r."totalSum", 0)::float         AS revenue,
        COALESCE(r."remainderSum", 0)::float     AS profit
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      LEFT JOIN "City" c ON c.id = e."cityId"
      WHERE 1=1 ${Prisma.join(conditions, ' ')}
      ORDER BY e.date ASC, e.time ASC NULLS LAST, e.id ASC
    `;

    await this.cacheManager.set(cacheKey, rows, CACHE_TTL);
    return rows;
  }


  async eventsByCity(year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:eventsByCity:${yearFilter}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.eventsByCity>>(
        cacheKey,
      );
    if (cached) return cached;

    const events = await this.prisma.event.groupBy({
      by: ['cityId'],
      where: {
        date: {
          gte: new Date(`${yearFilter}-01-01`),
          lt: new Date(`${yearFilter + 1}-01-01`),
        },
      },
      _count: { id: true },
    });

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    const result = events.map((e) => ({
      cityId: e.cityId,
      cityName: cityMap.get(e.cityId) ?? '—',
      events: e._count.id,
    }));

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async profitByCity(cityId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:profitByCity:${cityId ?? ''}:${yearFilter}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.profitByCity>>(
        cacheKey,
      );
    if (cached) return cached;

    const conditions = Prisma.sql`
      AND e.date >= ${new Date(`${yearFilter}-01-01`)}::date
      AND e.date < ${new Date(`${yearFilter + 1}-01-01`)}::date
      AND e.status IN ('RE_SALE')
    `;
    const cityCond = cityId
      ? Prisma.sql`AND e."cityId" = ${cityId}`
      : Prisma.empty;

    type Row = {
      cityId: string;
      revenue: number;
      profit: number;
      expenses: number;
      count: bigint;
    };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        e."cityId",
        COALESCE(SUM(r."totalSum"), 0)::float AS revenue,
        COALESCE(SUM(r."remainderSum"), 0)::float AS profit,
        COALESCE(SUM(r."schoolSum"), 0)::float AS expenses,
        COUNT(*)::bigint AS count
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      WHERE 1=1 ${conditions} ${cityCond}
      GROUP BY e."cityId"
    `;

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    const result = rows.map((r) => ({
      cityId: r.cityId,
      cityName: cityMap.get(r.cityId) ?? '—',
      revenue: r.revenue,
      profit: r.profit,
      expenses: r.expenses,
      count: Number(r.count),
    }));

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async salaryFund(month?: number, year?: number, cityId?: string) {
    const now = new Date();
    const m = month ?? now.getMonth() + 1;
    const y = year ?? now.getFullYear();
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);

    const cacheKey = `${await this.vkey('analytics')}:salaryFund:${m}:${y}:${cityId ?? ''}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.salaryFund>>(cacheKey);
    if (cached) return cached;

    if (cityId) {
      const agg = await this.prisma.salaryRecord.aggregate({
        where: {
          createdAt: { gte: start, lt: end },
          status: 'PAID',
          event: { cityId },
        },
        _sum: { amount: true },
      });
      const result = {
        total: Number(agg._sum.amount ?? 0),
        month: m,
        year: y,
        byCity: undefined,
      };
      await this.cacheManager.set(cacheKey, result, CACHE_TTL);
      return result;
    }

    type Row = { cityId: string; total: number };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        COALESCE(e."cityId", 'unknown') AS "cityId",
        COALESCE(SUM(s."amount"), 0)::float AS total
      FROM "SalaryRecord" s
      LEFT JOIN "Event" e ON e.id = s."eventId"
      WHERE s."createdAt" >= ${start} AND s."createdAt" < ${end} AND s.status = 'PAID'
      GROUP BY e."cityId"
    `;

    const totalSum = rows.reduce((s, r) => s + r.total, 0);
    const byCity: Record<string, number> = {};
    for (const r of rows) byCity[r.cityId] = r.total;

    const result = { total: totalSum, month: m, year: y, byCity };
    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

async cityLeaderboard(metric?: string, year?: number, schoolType?: string) {
    const yearFilter = year ?? new Date().getFullYear();
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:cityLeaderboard:${metric ?? ''}:${yearFilter}:${schoolType ?? 'all'}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.cityLeaderboard>>(
        cacheKey,
      );
    if (cached) return cached;

    const metricKey = metric ?? 'events';
    const typeCond = schoolType ? Prisma.sql`AND s.type = ${schoolType}` : Prisma.empty;

    type Row = {
      cityId: string;
      events: bigint;
      revenue: number;
      profit: number;
      children: bigint;
      schools: bigint;
    };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        e."cityId",
        COUNT(*)::bigint AS events,
        COALESCE(SUM(r."totalSum"), 0)::float AS revenue,
        COALESCE(SUM(r."remainderSum"), 0)::float AS profit,
        COALESCE(SUM(COALESCE(r."childrenCount", e."childrenActual", 0)), 0)::bigint AS children,
        COUNT(DISTINCT e."schoolId")::bigint AS schools
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      LEFT JOIN "School" s ON s.id = e."schoolId"
      WHERE e.date >= ${new Date(`${yearFilter}-01-01`)}::date
        AND e.date < ${new Date(`${yearFilter + 1}-01-01`)}::date
        AND e.status IN ('RE_SALE')
        ${typeCond}
      GROUP BY e."cityId"
    `;

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    const result = rows
      .map((r) => ({
        cityId: r.cityId,
        cityName: cityMap.get(r.cityId) ?? '—',
        events: Number(r.events),
        revenue: r.revenue,
        profit: r.profit,
        children: Number(r.children),
        schools: Number(r.schools),
      }))
      .sort((a, b) => {
        const key = metricKey as keyof typeof a;
        return Number(b[key]) - Number(a[key]);
      });

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async kpiManagers() {
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:kpiManagers`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.kpiManagers>>(
        cacheKey,
      );
    if (cached) return cached;

    const managers = await this.prisma.eventReport.groupBy({
      by: ['approvedBy'],
      where: { status: 'APPROVED', approvedBy: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const userIds = managers
      .map((m) => m.approvedBy)
      .filter(Boolean) as string[];
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u.name]));

    const result = managers.map((m) => ({
      userId: m.approvedBy,
      name: userMap.get(m.approvedBy!) ?? '—',
      approvedReports: m._count.id,
    }));

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async kpiHosts() {
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:kpiHosts`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.kpiHosts>>(cacheKey);
    if (cached) return cached;

    type Row = { hostId: string; avgRating: number; reportsCount: bigint };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        e."crewId" as "hostId",
        AVG(r.rating)::float AS "avgRating",
        COUNT(*)::bigint AS "reportsCount"
      FROM "Event" e
      JOIN "EventReport" r ON r."eventId" = e.id
      WHERE e.status IN ('RE_SALE')
        AND r.rating IS NOT NULL
      GROUP BY e."crewId"
      ORDER BY "avgRating" DESC
      LIMIT 10
    `;

    const crewIds = rows.map((r) => r.hostId).filter(Boolean);
    const crews = crewIds.length
      ? await this.prisma.crew.findMany({
          where: { id: { in: crewIds } },
          select: { id: true, hostId: true },
        })
      : [];
    const crewMap = new Map(crews.map((c) => [c.id, c.hostId]));

    const userIds = [
      ...new Set(crews.map((c) => c.hostId).filter(Boolean) as string[]),
    ];
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u.name]));

    const result = rows.map((r) => ({
      userId: crewMap.get(r.hostId) ?? r.hostId,
      name: userMap.get(crewMap.get(r.hostId) ?? '') ?? '—',
      avgRating: Math.round(r.avgRating * 100) / 100,
      reportsCount: Number(r.reportsCount),
    }));

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async kpiProjects() {
    const prefix = await this.vkey('analytics');
    const cacheKey = `${prefix}:kpiProjects`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.kpiProjects>>(
        cacheKey,
      );
    if (cached) return cached;

    const year = new Date().getFullYear();

    type Row = {
      project: string;
      eventsCount: bigint;
      childrenTotal: bigint;
      profit: number;
    };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        e.project,
        COUNT(*)::bigint AS "eventsCount",
        COALESCE(SUM(e."childrenActual"), 0)::bigint AS "childrenTotal",
        COALESCE(SUM(r."remainderSum"), 0)::float AS profit
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      WHERE e.date >= ${new Date(`${year}-01-01`)}::date
        AND e.date < ${new Date(`${year + 1}-01-01`)}::date
        AND e.status IN ('RE_SALE')
      GROUP BY e.project
      ORDER BY "eventsCount" DESC
      LIMIT 10
    `;

    const result = rows.map((r) => ({
      project: r.project,
      eventsCount: Number(r.eventsCount),
      childrenTotal: Number(r.childrenTotal),
      profit: r.profit,
    }));

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async getTargets(year?: number) {
    const y = year ?? new Date().getFullYear();
    return this.prisma.analyticsTarget.findMany({
      where: { year: y },
      orderBy: { month: 'asc' },
    });
  }

  async setTarget(year: number, month: number, target: number) {
    return this.prisma.analyticsTarget.upsert({
      where: { year_month: { year, month } },
      create: { year, month, target },
      update: { target },
    });
  }

  async getAnnotations(year?: number) {
    const y = year ?? new Date().getFullYear();
    return this.prisma.analyticsAnnotation.findMany({
      where: { year: y },
      orderBy: { month: 'asc' },
    });
  }

  async setAnnotation(
    year: number,
    month: number,
    text: string,
    color: string,
  ) {
    if (!text) {
      return this.prisma.analyticsAnnotation.deleteMany({
        where: { year, month },
      });
    }
    return this.prisma.analyticsAnnotation.upsert({
      where: { year_month: { year, month } },
      create: { year, month, text, color },
      update: { text, color },
    });
  }
}
```

---

## Frontend — config/api.ts

```typescript
// apps/frontend/src/config/api.ts

import axios, { AxiosError } from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

api.interceptors.request.use((config) => {
  if (config.method && config.method !== "get") {
    const csrfToken = getCookie("csrf_token");
    if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

    const isAuthEndpoint = original?.url?.includes("/auth/login") || original?.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        await refreshSession();
        return api(original);
      } catch {
        window.dispatchEvent(new Event("auth:expired"));
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export async function exportUsersCsv(): Promise<void> {
  const response = await api.get("/users/export", {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "users.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```

---

## Frontend — hooks/useAnalytics.ts

```typescript
// apps/frontend/src/hooks/useAnalytics.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  profit: number;
  events: number;
}

export interface CityEvents {
  cityId: string;
  cityName: string;
  events: number;
}

export interface CityProfit {
  cityId: string;
  cityName: string;
  revenue: number;
  profit: number;
  expenses: number;
  count: number;
}

export interface SalaryFund {
  total: number;
  month: number;
  year: number;
  byCity?: Record<string, number>;
}

export function useRevenueByMonth(params?: { cityId?: string; projectId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-month", params],
    queryFn: () => api.get<MonthlyRevenue[]>("/analytics/revenue-by-month", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export interface RevenueByCityMonthRow {
  year: number;
  month: number;
  cityName: string;
  project: string;
  revenue: number;
  profit: number;
}

export function useRevenueByCityMonth(params?: { projectId?: string; year?: number; enabled?: boolean }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-city-month", { projectId: params?.projectId, year: params?.year }],
    queryFn: () => api.get<RevenueByCityMonthRow[]>("/analytics/revenue-by-city-month", { params: { projectId: params?.projectId, year: params?.year } }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    enabled: params?.enabled !== false,
  });
}

export function useEventsByCity(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "events-by-city", params],
    queryFn: () => api.get<CityEvents[]>("/analytics/events-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfitByCity(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "profit-by-city", params],
    queryFn: () => api.get<CityProfit[]>("/analytics/profit-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSalaryFund(params?: { month?: number; year?: number; cityId?: string }) {
  return useQuery({
    queryKey: ["analytics", "salary-fund", params],
    queryFn: () => api.get<SalaryFund>("/analytics/salary-fund", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export interface AnalyticsTarget {
  id: string;
  year: number;
  month: number;
  target: number;
}

export function useAnalyticsTargets(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "targets", params],
    queryFn: () => api.get<AnalyticsTarget[]>("/analytics/targets", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSetAnalyticsTarget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { year: number; month: number; target: number }) =>
      api.put("/analytics/targets", data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["analytics", "targets"] });
    },
  });
}

export interface AnalyticsAnnotation {
  id: string;
  year: number;
  month: number;
  text: string;
  color: string;
}

export function useAnalyticsAnnotations(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "annotations", params],
    queryFn: () => api.get<AnalyticsAnnotation[]>("/analytics/annotations", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSetAnalyticsAnnotation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { year: number; month: number; text: string; color?: string }) =>
      api.put("/analytics/annotations", data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["analytics", "annotations"] });
    },
  });


}
export interface RevenueByDayRow {
  eventId: string;
  date: string;
  time: string | null;
  cityName: string;
  project: string;
  revenue: number;
  profit: number;
}

export function useRevenueByDay(params?: { year?: number; month?: number; cityId?: string; project?: string; enabled?: boolean }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-day", params],
    queryFn: () => api.get<RevenueByDayRow[]>("/analytics/revenue-by-day", { params: { year: params?.year, month: params?.month, cityId: params?.cityId, project: params?.project } }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    enabled: params?.enabled !== false,
  });
}
```

---

## Frontend — components/chart/types.ts

```typescript
// apps/frontend/src/components/chart/types.ts

export interface DailyRevenuePoint {
  date: string;
  revenue: number;
  profit: number;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  profit: number;
  expenses: number;
}

export type YAxisMode = 'adaptive' | 'stable';

export interface EChartsRevenueChartProps {
  data: DailyRevenuePoint[];
  chartId?: string;
  yAxisMode?: YAxisMode;
  className?: string;
}
```

---

## Frontend — components/chart/helpers.ts

```typescript
// apps/frontend/src/components/chart/helpers.ts

import type { DailyRevenuePoint, ChartDataPoint } from './types';

const UA_MONTHS = ['Січ','Лют','Бер','Кві','Трав','Чер','Лип','Сер','Вер','Жов','Лис','Гру'];
const UA_MONTHS_FULL = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
const UA_WEEKDAYS = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'];

export function toChartData(points: DailyRevenuePoint[]): ChartDataPoint[] {
  return points.map(p => ({
    date: p.date,
    revenue: p.revenue,
    profit: p.profit,
    expenses: Math.max(0, p.revenue - p.profit),
  }));
}

export function formatDateAxis(dateStr: string, visibleCount: number): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  if (visibleCount > 365 * 4) return String(year);
  if (visibleCount > 365) return UA_MONTHS[month] + ' ' + String(year).slice(2);
  if (visibleCount > 60) return UA_MONTHS[month];
  if (visibleCount > 14) return day + ' ' + UA_MONTHS[month];
  return day + ' ' + UA_MONTHS[month] + ' (' + UA_WEEKDAYS[d.getDay()] + ')';
}

export function formatTooltipDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.getDate() + ' ' + UA_MONTHS_FULL[d.getMonth()] + ' ' + d.getFullYear();
}

export function fmtMoney(n: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency', currency: 'UAH',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);
}

export function getViewportDateRange(
  data: ChartDataPoint[],
  startPercent: number,
  endPercent: number,
): { startIdx: number; endIdx: number; visibleCount: number } {
  const len = data.length;
  if (len === 0) return { startIdx: 0, endIdx: 0, visibleCount: 0 };
  const startIdx = Math.floor((startPercent / 100) * (len - 1));
  const endIdx = Math.ceil((endPercent / 100) * (len - 1));
  return { startIdx, endIdx, visibleCount: endIdx - startIdx + 1 };
}

export const RANGE_PRESETS = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '3M', days: 91 },
  { label: '6M', days: 182 },
  { label: 'YTD', days: -1 },
  { label: '1Y', days: 365 },
  { label: 'ALL', days: 0 },
] as const;

export function calcPresetRange(
  data: ChartDataPoint[],
  days: number,
): { startValue: string; endValue: string } | null {
  if (data.length === 0) return null;
  const last = data[data.length - 1].date;
  const endDate = new Date(last);
  if (days === 0) {
    return { startValue: data[0].date, endValue: last };
  }
  if (days === -1) {
    const jan1 = new Date(endDate.getFullYear(), 0, 1);
    const s = data.find(d => new Date(d.date) >= jan1);
    return { startValue: s ? s.date : data[0].date, endValue: last };
  }
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);
  const s = data.find(d => new Date(d.date) >= startDate);
  return { startValue: s ? s.date : data[0].date, endValue: last };
}

export function getLineColor(visibleCount: number): number {
  if (visibleCount > 365) return 2;
  return 3;
}
```

---

## Frontend — components/chart/index.ts

```typescript
// apps/frontend/src/components/chart/index.ts

export { EChartsRevenueChart } from './EChartsRevenueChart';
export type { DailyRevenuePoint, ChartDataPoint, YAxisMode, EChartsRevenueChartProps } from './types';
```

---

## Frontend — components/chart/EChartsRevenueChart.tsx

```tsx
// apps/frontend/src/components/chart/EChartsRevenueChart.tsx

import { useRef, useEffect, useCallback, useState, useMemo, memo } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsType } from 'echarts/core';
import type { EChartsRevenueChartProps, ChartDataPoint } from './types';
import {
  toChartData,
  formatDateAxis,
  formatTooltipDate,
  fmtMoney,
  getViewportDateRange,
  RANGE_PRESETS,
  calcPresetRange,
  getLineColor,
} from './helpers';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

const STORAGE_PREFIX = 'chart:viewport:';

function EChartsRevenueChartInner({
  data,
  chartId = 'revenue-chart',
  yAxisMode = 'adaptive',
  className,
}: EChartsRevenueChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);
  const dataHolder = useRef<ChartDataPoint[]>([]);
  const lastDragRef = useRef<{ t: number; x: number } | null>(null);
  const inertiaRafRef = useRef<number>(0);
  const [activeRange, setActiveRange] = useState<string | null>(null);

  const chartData = useMemo(() => toChartData(data), [data]);
  dataHolder.current = chartData;

  const saveViewportFn = useCallback(
    (startValue: string, endValue: string) => {
      try {
        localStorage.setItem(
          STORAGE_PREFIX + chartId,
          JSON.stringify({ startValue, endValue }),
        );
      } catch { /* noop */ }
    },
    [chartId],
  );
  const saveViewportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveViewport = useCallback(
    (sv: string, ev: string) => {
      if (saveViewportTimerRef.current) clearTimeout(saveViewportTimerRef.current);
      saveViewportTimerRef.current = setTimeout(() => saveViewportFn(sv, ev), 300);
    },
    [saveViewportFn],
  );

  const getAxisLabelFormatter = useCallback(
    (visibleCount: number) => {
      return (value: string) => formatDateAxis(value, visibleCount);
    },
    [],
  );

  const buildOption = useCallback(
    (chartData: ChartDataPoint[], savedState: { startValue: string; endValue: string } | null) => {
      const dates = chartData.map(d => d.date);
      const profitData = chartData.map(d => d.profit);
      const revenueData = chartData.map(d => d.revenue);
      const expensesData = chartData.map(d => d.expenses);

      let dataZoomStart = 0;
      let dataZoomEnd = 100;

      if (savedState) {
        const sIdx = dates.indexOf(savedState.startValue);
        const eIdx = dates.indexOf(savedState.endValue);
        if (sIdx !== -1 && eIdx !== -1 && dates.length > 1) {
          dataZoomStart = (sIdx / (dates.length - 1)) * 100;
          dataZoomEnd = (eIdx / (dates.length - 1)) * 100;
        }
      } else if (chartData.length > 90) {
        dataZoomStart = Math.max(0, ((chartData.length - 90) / (chartData.length - 1)) * 100);
      }

      const { visibleCount } = getViewportDateRange(chartData, dataZoomStart, dataZoomEnd);
      const lineWidth = getLineColor(visibleCount);

      return {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut' as const,
        grid: {
          left: 55,
          right: 20,
          top: 20,
          bottom: 110,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            snap: false,
            lineStyle: { color: '#94a3b8', width: 1, type: 'dashed' },
          },
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 12,
          padding: [12, 16],
          textStyle: { fontSize: 12, color: '#1e293b' },
          extraCssText: 'box-shadow: 0 8px 32px -8px rgba(0,0,0,0.12); backdrop-filter: blur(12px);',
          appendToBody: true,
          formatter: (params: unknown) => {
            const items = params as Array<{ axisValue: string; seriesName: string; value: number; color: string }>;
            if (!items || items.length === 0) return '';
            const dateStr = formatTooltipDate(items[0].axisValue);
            const revenue = items.find(i => i.seriesName === 'Дохід')?.value ?? 0;
            const profit = items.find(i => i.seriesName === 'Прибуток')?.value ?? 0;
            const expenses = items.find(i => i.seriesName === 'Витрати')?.value ?? 0;

            const prevIdx = dataHolder.current.findIndex(d => d.date === items[0].axisValue) - 1;
            let deltaHtml = '';
            if (prevIdx >= 0 && prevIdx < dataHolder.current.length) {
              const prevProfit = dataHolder.current[prevIdx].profit;
              if (prevProfit !== 0) {
                const pct = ((profit - prevProfit) / Math.abs(prevProfit) * 100).toFixed(0);
                const sign = profit >= prevProfit ? '+' : '';
                const color = profit >= prevProfit ? '#16a34a' : '#dc2626';
                deltaHtml = '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #f1f5f9;font-size:11px;color:' + color + '">' + sign + pct + '% до попереднього дня</div>';
              }
            }

            return '<div style="font-weight:600;margin-bottom:8px;font-size:13px">' + dateStr + '</div>'
              + '<div style="display:flex;justify-content:space-between;gap:24px;margin:3px 0"><span style="color:#64748b">Дохід</span><span style="font-weight:600;font-variant-numeric:tabular-nums">' + fmtMoney(revenue) + '</span></div>'
              + '<div style="display:flex;justify-content:space-between;gap:24px;margin:3px 0"><span style="color:#64748b">Витрати</span><span style="font-weight:600;font-variant-numeric:tabular-nums;color:#dc2626">' + fmtMoney(expenses) + '</span></div>'
              + '<div style="display:flex;justify-content:space-between;gap:24px;margin:3px 0"><span style="color:#64748b">Прибуток</span><span style="font-weight:600;font-variant-numeric:tabular-nums;color:#16a34a">' + fmtMoney(profit) + '</span></div>'
              + deltaHtml;
          },
          position: (point: number[], _params: unknown, _dim: unknown, size: { viewSize: [number, number] }) => {
            const tooltipW = size.viewSize[0] > 600 ? 260 : 200;
            const margin = 16;
            if (point[0] + tooltipW + margin > size.viewSize[0]) {
              return [point[0] - tooltipW - margin, 10];
            }
            return [point[0] + margin, 10];
          },
        },
        xAxis: {
          type: 'category',
          data: dates,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#e2e8f0' } },
          axisTick: { show: false },
          axisLabel: {
            fontSize: 11,
            color: '#64748b',
            formatter: getAxisLabelFormatter(visibleCount),
          },
          animation: true,
          animationDuration: 300,
        },
        yAxis: {
          type: 'value',
          scale: yAxisMode === 'adaptive',
          splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            fontSize: 11,
            color: '#64748b',
            formatter: (v: number) => v >= 1000 ? Math.round(v / 1000) + 'k' : String(v),
          },
        },
        series: [
          {
            name: 'Прибуток',
            type: 'line',
            data: profitData,
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: (val: number) => (val === 0 ? 0 : 6),
            lineStyle: { width: lineWidth, color: '#22c55e' },
            itemStyle: { color: '#22c55e', borderWidth: 2, borderColor: '#fff' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(34,197,94,0.25)' },
                { offset: 1, color: 'rgba(34,197,94,0)' },
              ]),
            },
            emphasis: {
              itemStyle: { shadowBlur: 8, shadowColor: 'rgba(34,197,94,0.4)' },
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
          {
            name: 'Дохід',
            type: 'line',
            data: revenueData,
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: (val: number) => (val === 0 ? 0 : 4),
            lineStyle: { width: lineWidth, color: '#3b82f6' },
            itemStyle: { color: '#3b82f6', borderWidth: 2, borderColor: '#fff' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(59,130,246,0.15)' },
                { offset: 1, color: 'rgba(59,130,246,0)' },
              ]),
            },
            emphasis: {
              itemStyle: { shadowBlur: 8, shadowColor: 'rgba(59,130,246,0.4)' },
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
          {
            name: 'Витрати',
            type: 'line',
            data: expensesData,
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: (val: number) => (val === 0 ? 0 : 4),
            lineStyle: { width: lineWidth * 0.8, color: '#ef4444', type: 'dashed' as const },
            itemStyle: { color: '#ef4444', borderWidth: 1, borderColor: '#fff' },
            emphasis: {
              itemStyle: { shadowBlur: 6, shadowColor: 'rgba(239,68,68,0.4)' },
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            zoomOnMouseWheel: true,
            moveOnMouseWheel: false,
            moveOnMouseMove: false,
            zoomLock: false,
            throttle: 50,
            preventDefaultMouseMove: false,
          },
          {
            type: 'slider',
            show: true,
            height: 32,
            bottom: 12,
            borderColor: '#e2e8f0',
            fillerColor: 'rgba(59,130,246,0.08)',
            handleStyle: {
              color: '#3b82f6',
              borderColor: '#3b82f6',
              borderWidth: 1,
            },
            moveHandleStyle: { color: '#cbd5e1' },
            dataBackground: {
              lineStyle: { color: '#cbd5e1', width: 1 },
              areaStyle: { color: 'rgba(203,213,225,0.15)' },
            },
            selectedDataBackground: {
              lineStyle: { color: '#3b82f6', width: 1 },
              areaStyle: { color: 'rgba(59,130,246,0.08)' },
            },
            textStyle: { fontSize: 10, color: '#94a3b8' },
            start: dataZoomStart,
            end: dataZoomEnd,
            animationDuration: 300,
            animationEasing: 'cubicOut' as const,
          },
        ],
      };
    },
    [yAxisMode, getAxisLabelFormatter],
  );

  const updateAxisFormat = useCallback((chart: EChartsType) => {
    const opt = chart.getOption();
    const dz = (opt.dataZoom as Array<{ start?: number; end?: number }>)?.[0];
    const start = dz?.start ?? 0;
    const end = dz?.end ?? 100;
    const d = dataHolder.current;
    const { visibleCount } = getViewportDateRange(d, start, end);
    const lw = getLineColor(visibleCount);

    chart.setOption({
      xAxis: { axisLabel: { formatter: getAxisLabelFormatter(visibleCount) } },
      series: [
        { lineStyle: { width: lw } },
        { lineStyle: { width: lw } },
        { lineStyle: { width: lw * 0.8 } },
      ],
    }, { notMerge: false, lazyUpdate: true });
  }, [getAxisLabelFormatter]);

  const handleDataZoom = useCallback(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const opt = chart.getOption();
    const dzArr = opt.dataZoom as Array<{ startValue?: string; endValue?: string; start?: number; end?: number }>;
    const sliderDz = dzArr?.[1];
    if (sliderDz?.startValue && sliderDz?.endValue) {
      saveViewport(sliderDz.startValue, sliderDz.endValue);
    }
    updateAxisFormat(chart);
  }, [saveViewport, updateAxisFormat]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = echarts.init(containerRef.current, undefined, {
      renderer: 'canvas',
    });
    chartRef.current = chart;

    let savedState: { startValue: string; endValue: string } | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + chartId);
      if (raw) savedState = JSON.parse(raw);
    } catch { /* noop */ }

    chart.setOption(buildOption(dataHolder.current, savedState));

    chart.on('dataZoom', handleDataZoom);

    const resizeObs = new ResizeObserver(() => {
      chart.resize({ animation: { duration: 200 } });
    });
    resizeObs.observe(containerRef.current);

    const handleDblClick = () => {
      chart.dispatchAction({
        type: 'dataZoom',
        startValue: dataHolder.current[0]?.date,
        endValue: dataHolder.current[dataHolder.current.length - 1]?.date,
      });
    };
    containerRef.current.addEventListener('dblclick', handleDblClick);

    const el = containerRef.current;
    const handleWheelShift = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      const opt = chart.getOption();
      const dz = (opt.dataZoom as Array<{ start?: number; end?: number }>)[0];
      const curStart = dz?.start ?? 0;
      const curEnd = dz?.end ?? 100;
      const span = curEnd - curStart;
      const step = span * 0.1;
      const dir = e.deltaY > 0 ? 1 : -1;
      let newStart = curStart + dir * step;
      let newEnd = curEnd + dir * step;
      if (newStart < 0) { newStart = 0; newEnd = span; }
      if (newEnd > 100) { newEnd = 100; newStart = 100 - span; }
      chart.dispatchAction({ type: 'dataZoom', start: newStart, end: newEnd });
    };
    el.addEventListener('wheel', handleWheelShift, { passive: false });

    const handleWheelCtrl = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const opt = chart.getOption();
      const dz = (opt.dataZoom as Array<{ start?: number; end?: number }>)[0];
      const curStart = dz?.start ?? 0;
      const curEnd = dz?.end ?? 100;
      const span = curEnd - curStart;
      const shrink = e.deltaY < 0;
      const step = shrink ? span * 0.02 : span * 0.08;
      const newSpan = shrink ? Math.max(1, span - step) : Math.min(100, span + step);
      const center = (curStart + curEnd) / 2;
      let ns = center - newSpan / 2;
      let ne = center + newSpan / 2;
      if (ns < 0) { ns = 0; ne = newSpan; }
      if (ne > 100) { ne = 100; ns = 100 - newSpan; }
      chart.dispatchAction({ type: 'dataZoom', start: ns, end: ne });
    };
    el.addEventListener('wheel', handleWheelCtrl, { passive: false });

    let lastMouseDown = 0;
    const handleMouseDown = () => { lastMouseDown = Date.now(); lastDragRef.current = { t: Date.now(), x: 0 }; };
    const handleMouseMove = (e: MouseEvent) => {
      if (lastDragRef.current) lastDragRef.current = { t: Date.now(), x: e.clientX };
    };
    const handleMouseUp = () => {
      const drag = lastDragRef.current;
      if (!drag) return;
      const elapsed = Date.now() - drag.t;
      if (elapsed < 50 || Date.now() - lastMouseDown < 100) { lastDragRef.current = null; return; }
      lastDragRef.current = null;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);

    return () => {
      resizeObs.disconnect();
      el.removeEventListener('dblclick', handleDblClick);
      el.removeEventListener('wheel', handleWheelShift);
      el.removeEventListener('wheel', handleWheelCtrl);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(inertiaRafRef.current);
      chart.dispose();
      chartRef.current = null;
    };
  }, [chartId, buildOption, handleDataZoom]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || dataHolder.current.length === 0) return;
    chart.setOption(buildOption(dataHolder.current, null), { notMerge: false, lazyUpdate: true });
  }, [yAxisMode, buildOption]);

  const handleRangeClick = useCallback((label: string, days: number) => {
    const chart = chartRef.current;
    if (!chart) return;
    const range = calcPresetRange(dataHolder.current, days);
    if (!range) return;
    setActiveRange(label);
    chart.dispatchAction({
      type: 'dataZoom',
      startValue: range.startValue,
      endValue: range.endValue,
    });
  }, []);

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {RANGE_PRESETS.map(({ label, days }) => (
          <button
            key={label}
            onClick={() => handleRangeClick(label, days)}
            className={
              'px-2.5 py-1 rounded-full text-[10px] border transition-all duration-200 ' +
              (activeRange === label
                ? 'border-brand bg-brand/10 text-brand font-medium'
                : 'border-border-strong bg-surface text-content-secondary hover:bg-surface-hover')
            }
          >
            {label}
          </button>
        ))}
        <span className="text-[9px] text-content-muted ml-2 hidden md:inline">Shift+колесо=панорама · Ctrl+колесо=точний зум · Подвійний клік=скидання</span>
      </div>
      <div
        ref={containerRef}
        style={{ width: '100%', height: 360, cursor: 'grab' }}
        className="active:cursor-grabbing"
      />
    </div>
  );
}

export const EChartsRevenueChart = memo(EChartsRevenueChartInner);
```

---

## Frontend — lib/motion.ts

> **Note:** This file is 326 lines and provides Framer Motion variant presets used by the Analytics page (`staggerContainer`, `staggerItem`, `useCountUp`, `TRANSITION`). The full content is in `apps/frontend/src/lib/motion.ts`.

Key exports used by Analytics.tsx:
- `staggerContainer` / `staggerItem` — staggered entrance animations
- `useCountUp(target, opts)` — animates numbers from 0 → target
- `TRANSITION` — preconfigured transition objects

---

## Frontend — pages/Analytics.tsx

> **Note:** This file is 2068 lines — the full content is included above in the read outputs. Key sections:

| Line Range | Section |
|-----------|---------|
| 1-37 | Imports, month constants, city colors |
| 38-106 | Utility functions: `fmtMoney`, `calculateSMA`, `heatColor`, `detectAnomalies` |
| 107-165 | `linearRegressionForecast`, `ChartEntry` type, `buildChartEntry`, `formatAxisLabel` |
| 166-290 | Legacy recharts helpers (unused), `SkeletonCard`, `ChartSkeleton`, `ChartEmptyState`, tooltip types |
| 292-332 | Component state, hooks (`useRevenueByCityMonth`, `useEventsByCity`, `useRevenueByDay`, targets, annotations) |
| 334-510 | Data processing: `filteredData`, `chartData`, `dayChartData`, `activeLines` |
| 512-606 | YoY, SMA trend, forecast calculations |
| 608-850 | Zoom state management, wheel handlers, granularity toggle |
| 852-1100 | Touch handlers, composite chart data, `axisConfig`, legacy recharts stats |
| 1100-1270 | Anomaly detection, heatmap data, KPI calculations |
| 1270-1430 | Tooltip rendering (composite, aggregateByCity, default modes) |
| 1430-1876 | JSX: KPI cards, chart controls, EChartsRevenueChart, sidebar filters, mobile filters |
| 1878-1953 | Heatmap, events-by-city bar chart |
| 1954-2068 | KPI tables (managers, hosts, projects), `KPICard` component |

---

*End of bundle.*
