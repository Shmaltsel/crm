# Файли Dashboard, Schools, Events та Prisma Schema

### `apps/backend/src/dashboard/dashboard.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
const PIPELINE_STAGES = [
  'BASE',
  'FIRST_CONTACT',
  'INTERESTED',
  'PRE_APPROVAL',
  'DATE_CONFIRMED',
  'PREPARATION',
  'IN_PROGRESS',
  'DONE',
  'REPORT',
  'RE_SALE',
];

const STALE_DAYS = 7;

type EventWithRelations = Prisma.EventGetPayload<{
  include: {
    school: { select: { id: true; name: true } };
    city: { select: { id: true; name: true } };
    crew: {
      include: {
        host: { select: { id: true; name: true } };
        driver: { select: { id: true; name: true } };
      };
    };
  };
}>;

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  lastActivity: Date | null;
  daysStale: number | null;
}

interface ActivityFeedItem {
  id: string;
  userName: string;
  role: string;
  action: string;
  comment: string | null;
  createdAt: Date;
  schoolId: string | null;
  schoolName: string | null;
  eventId: string | null;
}

export interface DashboardSummary {
  todayEvents: EventWithRelations[];
  upcomingEvents: EventWithRelations[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: StaleSchool[];
  activityFeed: ActivityFeedItem[];
  citiesStats: {
    cityId: string;
    cityName: string;
    schoolsCount: number;
    activeEvents: number;
    monthRevenue: number;
  }[];
}
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private prisma: PrismaService) {}

  private cache = new Map<string, { data: DashboardSummary; ts: number }>();
  private CACHE_TTL = 60_000;

  async getSummary(cityId?: string, role?: string) {
    const key = `${cityId ?? 'all'}-${role ?? 'anon'}`;
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.ts < this.CACHE_TTL) {
      this.logger.debug(`cache hit — ${key}`);
      return cached.data;
    }

    const t0 = Date.now();
    this.logger.debug(`start — cityId=${cityId ?? 'all'} role=${role}`);

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const upcomingEnd = new Date(todayStart);
    upcomingEnd.setDate(upcomingEnd.getDate() + 6);

    const staleThreshold = new Date(now);
    staleThreshold.setDate(staleThreshold.getDate() - STALE_DAYS);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const cityFilter = cityId ? { cityId } : {};
    const isSuperAdmin = role === 'SUPERADMIN';

    const t1 = Date.now();
    const [
      todayEvents,
      upcomingEvents,
      funnelRows,
      monthEvents,
      staleSchoolsRaw,
      recentActivity,
    ] = await Promise.all([
      this.prisma.event.findMany({
        where: { ...cityFilter, date: { gte: todayStart, lt: todayEnd } },
        include: {
          school: { select: { id: true, name: true } },
          city: { select: { id: true, name: true } },
          crew: {
            include: {
              host: { select: { id: true, name: true } },
              driver: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { time: 'asc' },
      }),

      this.prisma.event.findMany({
        where: { ...cityFilter, date: { gte: todayEnd, lt: upcomingEnd } },
        include: {
          school: { select: { id: true, name: true } },
          city: { select: { id: true, name: true } },
          crew: {
            include: {
              host: { select: { id: true, name: true } },
              driver: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: [{ date: 'asc' }, { time: 'asc' }],
        take: 8,
      }),

      cityId
        ? this.prisma.$queryRaw<{ status: string; count: bigint }[]>(Prisma.sql`
            SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
            FROM "School" s
            LEFT JOIN LATERAL (
              SELECT status FROM "Event"
              WHERE "schoolId" = s.id
              ORDER BY date DESC
              LIMIT 1
            ) e ON true
            WHERE s."cityId" = ${cityId}
            GROUP BY e.status
          `)
        : this.prisma.$queryRaw<{ status: string; count: bigint }[]>(Prisma.sql`
            SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
            FROM "School" s
            LEFT JOIN LATERAL (
              SELECT status FROM "Event"
              WHERE "schoolId" = s.id
              ORDER BY date DESC
              LIMIT 1
            ) e ON true
            GROUP BY e.status
          `),

      this.prisma.event.findMany({
        where: {
          ...cityFilter,
          status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
          date: { gte: monthStart, lte: monthEnd },
        },
        select: {
          id: true,
          report: {
            select: { totalSum: true, remainderSum: true, childrenCount: true },
          },
        },
      }),

      this.prisma.school.findMany({
        where: {
          ...cityFilter,
          events: {
            some: {
              status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] },
              history: { every: { createdAt: { lt: staleThreshold } } },
            },
          },
        },
        include: {
          events: {
            where: { status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] } },
            orderBy: { date: 'desc' },
            take: 1,
            include: {
              history: {
                orderBy: { createdAt: 'desc' },
                take: 1,
                select: { createdAt: true },
              },
            },
          },
        },
        take: 10,
      }),

      this.prisma.eventHistory.findMany({
        where: {
          createdAt: { gte: todayStart },
          ...(cityId ? { event: { cityId } } : {}),
        },
        include: {
          event: {
            select: {
              id: true,
              school: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
    ]);
    this.logger.debug(`main Promise.all: ${Date.now() - t1}ms`);

    let citiesStats: {
      cityId: string;
      cityName: string;
      schoolsCount: number;
      activeEvents: number;
      monthRevenue: number;
    }[] = [];

    if (isSuperAdmin) {
      const t2 = Date.now();
      const [allCities, allSchools, allActiveEvents, allMonthEvents] =
        await Promise.all([
          this.prisma.city.findMany({ select: { id: true, name: true } }),
          this.prisma.school.groupBy({ by: ['cityId'], _count: { id: true } }),
          this.prisma.event.groupBy({
            by: ['cityId'],
            where: {
              status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
            },
            _count: { id: true },
          }),
          this.prisma.event.findMany({
            where: {
              status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
              date: { gte: monthStart, lte: monthEnd },
            },
            select: {
              cityId: true,
              report: { select: { totalSum: true } },
            },
          }),
        ]);
      this.logger.debug(`superadmin queries: ${Date.now() - t2}ms`);

      const schoolsIdx = Object.fromEntries(
        allSchools.map((r) => [r.cityId, r._count.id]),
      );
      const activeIdx = Object.fromEntries(
        allActiveEvents.map((r) => [r.cityId, r._count.id]),
      );
      const revenueIdx: Record<string, number> = {};
      for (const ev of allMonthEvents) {
        revenueIdx[ev.cityId] =
          (revenueIdx[ev.cityId] ?? 0) + (ev.report?.totalSum ?? 0);
      }

      citiesStats = allCities
        .map((city) => ({
          cityId: city.id,
          cityName: city.name,
          schoolsCount: schoolsIdx[city.id] ?? 0,
          activeEvents: activeIdx[city.id] ?? 0,
          monthRevenue: revenueIdx[city.id] ?? 0,
        }))
        .sort((a, b) => b.monthRevenue - a.monthRevenue);
    }

    const funnel: Record<string, number> = {};
    for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
    let totalSchools = 0;
    for (const row of funnelRows) {
      const status = row.status ?? 'BASE';
      const count = Number(row.count);
      if (funnel[status] !== undefined) funnel[status] += count;
      totalSchools += count;
    }

    const monthlyKpi = monthEvents.reduce(
      (acc, ev) => {
        acc.revenue += ev.report?.totalSum ?? 0;
        acc.profit += ev.report?.remainderSum ?? 0;
        acc.children += ev.report?.childrenCount ?? 0;
        acc.count += 1;
        return acc;
      },
      { revenue: 0, profit: 0, children: 0, count: 0 },
    );

    const staleSchools = staleSchoolsRaw
      .map((school) => {
        const lastHistory = school.events[0]?.history[0];
        const lastActivity = lastHistory?.createdAt ?? null;
        const daysStale = lastActivity
          ? Math.floor(
              (now.getTime() - new Date(lastActivity).getTime()) / 86_400_000,
            )
          : null;
        return {
          id: school.id,
          name: school.name,
          status: school.events[0]?.status ?? null,
          lastActivity,
          daysStale,
        };
      })
      .sort((a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0));

    const activityFeed = recentActivity.map((h) => ({
      id: h.id,
      userName: h.userName,
      role: h.role,
      action: h.action,
      comment: h.comment,
      createdAt: h.createdAt,
      schoolId: h.event?.school?.id ?? null,
      schoolName: h.event?.school?.name ?? null,
      eventId: h.event?.id ?? null,
    }));

    this.logger.debug(`total: ${Date.now() - t0}ms`);

    const result = {
      todayEvents,
      upcomingEvents,
      funnel,
      totalSchools,
      monthlyKpi,
      staleSchools,
      activityFeed,
      citiesStats,
    };

    this.cache.set(key, { data: result, ts: Date.now() });
    return result;
  }
}

```

---

### `apps/backend/src/dashboard/dashboard.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

```

---

### `apps/backend/src/dashboard/dashboard.controller.ts`

```typescript
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

class DashboardSummaryQueryDto {
  @IsOptional()
  @IsString()
  cityId?: string;
}

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('summary')
  async getSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: DashboardSummaryQueryDto,
  ): Promise<DashboardSummary> {
    let effectiveCityId: string | undefined;
    if (user.role === 'SUPERADMIN') {
      effectiveCityId = query.cityId;
    } else {
      const me = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { cityId: true },
      });
      effectiveCityId = me?.cityId ?? undefined;
    }
    return this.dashboardService.getSummary(effectiveCityId, user.role);
  }
}

```

---

### `apps/backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String       @id @default(uuid())
  name           String
  email          String       @unique
  phone          String?
  password       String
  role           UserRole     @default(MANAGER)
  cityId         String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  telegramId     String?
  telegramChatId String?
  car            String?
  balance        Decimal      @default(0) @db.Decimal(12, 2)
  managedCities  City[]       @relation("CityManager")
  crewAsDriver   Crew[]       @relation("DriverCrew")
  crewAsHost     Crew[]       @relation("HostCrew")
  city           City?        @relation(fields: [cityId], references: [id])
  salaryItems    SalaryItem[]

  @@index([role])
  @@index([cityId])
}

model City {
  id        String        @id @default(uuid())
  name      String
  managerId String?
  createdAt DateTime      @default(now())
  manager   User?         @relation("CityManager", fields: [managerId], references: [id])
  crews     Crew[]
  events    Event[]
  issues    IssueReport[]
  schools   School[]
  users     User[]
}

model School {
  id            String   @id @default(uuid())
  name          String
  type          String
  cityId        String
  address       String?
  director      String?
  phone         String?
  email         String?
  notes         String?
  childrenCount Int?
  isHotClient   Boolean  @default(false)
  rating        Float?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  events        Event[]
  city          City     @relation(fields: [cityId], references: [id])

  @@index([cityId])
}

model Crew {
  id        String   @id @default(uuid())
  name      String
  cityId    String
  hostId    String?
  driverId  String?
  car       String?
  carPlate  String?
  phone     String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  city      City     @relation(fields: [cityId], references: [id])
  driver    User?    @relation("DriverCrew", fields: [driverId], references: [id])
  host      User?    @relation("HostCrew", fields: [hostId], references: [id])
  events    Event[]
}

model Event {
  id              String            @id @default(uuid())
  cityId          String
  schoolId        String
  crewId          String?
  project         String
  date            DateTime
  time            String?
  status          EventStatus       @default(BASE)
  childrenPlanned Int?
  childrenActual  Int?
  price           Float?
  received        Float?
  paymentMethod   String?
  address         String?
  contactPerson   String?
  contactPhone    String?
  equipment       String?
  nextContact     DateTime?
  nextProject     String?
  responsibleId   String?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  city            City              @relation(fields: [cityId], references: [id])
  crew            Crew?             @relation(fields: [crewId], references: [id])
  school          School            @relation(fields: [schoolId], references: [id])
  history         EventHistory[]
  preparation     EventPreparation?
  report          EventReport?
  files           File[]
  issues          IssueReport[]

  @@index([cityId])
  @@index([status])
  @@index([schoolId])
}

model EventReport {
  id                String        @id @default(uuid())
  eventId           String        @unique
  directorSatisfied Boolean?
  teachersSatisfied Boolean?
  hadIssues         Boolean       @default(false)
  comment           String?
  rating            Float?
  createdAt         DateTime      @default(now())
  announcementDone  Boolean       @default(false)
  materialShown     Boolean       @default(false)
  childrenCount     Int           @default(0)
  classesCount      Int           @default(0)
  privilegedCount   Int           @default(0)
  showingsCount     Int           @default(0)
  totalSum          Float         @default(0)
  schoolSum         Float         @default(0)
  remainderSum      Float         @default(0)
  event             Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)
  photos            File[]
  expenseItems      ExpenseItem[]
  salaryItems       SalaryItem[]
}

model File {
  id        String       @id @default(uuid())
  name      String
  url       String
  size      Int
  eventId   String?
  reportId  String?
  createdAt DateTime     @default(now())
  event     Event?       @relation(fields: [eventId], references: [id])
  report    EventReport? @relation(fields: [reportId], references: [id])
}

model EventHistory {
  id        String   @id @default(uuid())
  eventId   String
  action    String
  comment   String?
  userId    String
  userName  String
  role      String
  createdAt DateTime @default(now())
  event     Event    @relation(fields: [eventId], references: [id])
}

model EventPreparation {
  id               String            @id @default(uuid())
  eventId          String            @unique
  assignCrew       PreparationStatus @default(PLANNED)
  bookEquipment    PreparationStatus @default(PLANNED)
  prepareDocs      PreparationStatus @default(PLANNED)
  prepareMaterials PreparationStatus @default(PLANNED)
  remindSchool     PreparationStatus @default(PLANNED)
  event            Event             @relation(fields: [eventId], references: [id])
}

model IssueReport {
  id               String    @id @default(uuid())
  eventId          String
  schoolName       String
  eventName        String
  message          String
  cityId           String
  status           String    @default("Планується")
  createdAt        DateTime  @default(now())
  deadline         DateTime?
  assignedUserId   String?
  assignedUserName String?
  city             City      @relation(fields: [cityId], references: [id])
  event            Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@index([cityId])
  @@index([eventId])
}

model SchoolContact {
  id           String   @id @default(uuid())
  city         String   @default("Львів")
  schoolNumber String
  contactName  String
  phone        String
  role         String?
  createdAt    DateTime @default(now())
}

model Project {
  id        String   @id @default(uuid())
  name      String   @unique
  color     String   @default("blue")
  createdAt DateTime @default(now())
}

model ExpenseItem {
  id        String   @id @default(uuid())
  reportId  String
  category  String 
  name      String?
  amount    Decimal  @db.Decimal(12, 2)
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)

  @@index([reportId])
}

model SalaryItem {
  id        String   @id @default(uuid())
  reportId  String
  userId    String?
  userName  String
  amount    Decimal  @db.Decimal(12, 2)
  role      String? 
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
  user   User?       @relation(fields: [userId], references: [id])

  @@index([reportId])
  @@index([userId])
}

enum UserRole {
  SUPERADMIN
  MANAGER
  HOST
  DRIVER
}

enum PreparationStatus {
  PLANNED
  IN_PROGRESS
  DONE
}

enum EventStatus {
  BASE
  FIRST_CONTACT
  INTERESTED
  PRE_APPROVAL
  DATE_CONFIRMED
  PREPARATION
  IN_PROGRESS
  DONE
  REPORT
  RE_SALE
}

```

---

### `apps/backend/src/schools/schools.service.ts`

```typescript
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { SchoolQueryDto } from './dto/school-query.dto';

const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

@Injectable()
export class SchoolsService {
  constructor(
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
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
          console.log(`Не вдалося знайти дані для закладу: ${data.name}`);
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
          console.log(
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

        console.log(`Дані школи "${data.name}" успішно оновлені`);
      })
      .catch((error) => {
        console.error('Помилка оновлення даних школи:', error);
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
      const like = `%${search}%`;
      conditions.push(
        Prisma.sql`(s.name ILIKE ${like} OR s.director ILIKE ${like} OR s.address ILIKE ${like})`,
      );
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

  private mapRow(row: any) {
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
      LEFT JOIN LATERAL (
        SELECT e.status FROM "Event" e
        WHERE e."schoolId" = s.id
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
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
      LEFT JOIN LATERAL (
        SELECT e.status FROM "Event" e
        WHERE e."schoolId" = s.id
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
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
    const school = await this.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
    if (!school) {
      throw new NotFoundException(`Школу з ID ${id} не знайдено`);
    }

    return school;
  }

  async update(id: string, data: any) {
    const { city, id: _id, createdAt, updatedAt, ...updateData } = data;

    return this.prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    for (const event of events) {
      await this.eventsService.remove(event.id);
    }

    return this.prisma.school.delete({
      where: {
        id,
      },
    });
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
    if (!city) throw new Error(`Місто з id=${cityId} не знайдено`);

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
        console.error(`Помилка створення ${school.name}:`, e);
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

### `apps/backend/src/common/dto/page-meta.dto.ts`

```typescript
export class PageMetaDto {
  totalItems: number;
  page: number;
  take: number;
  pageCount: number;
  hasNextPage: boolean;

  constructor(totalItems: number, page: number, take: number) {
    this.totalItems = totalItems;
    this.page = page;
    this.take = take;
    this.pageCount = Math.ceil(totalItems / take);
    this.hasNextPage = page < this.pageCount;
  }
}

```

---

### `apps/backend/src/common/dto/page-options.dto.ts`

```typescript
import { Type } from 'class-transformer';
import { IsInt, Max, Min, IsOptional } from 'class-validator';

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

```

---

### `apps/backend/src/events/events.service.ts`

```typescript
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, PreparationStatus } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
import {
  SubmitReportDto,
  ExpenseItemDto,
  SalaryItemDto,
} from './dto/submit-report.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const FIELD_ROLES = ['DRIVER', 'HOST'];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  async findAllForUser(user: JwtUser) {
    const isFieldStaff = FIELD_ROLES.includes(user.role);

    return this.prisma.event.findMany({
      where: isFieldStaff
        ? {
            crew: {
              OR: [{ hostId: user.sub }, { driverId: user.sub }],
            },
          }
        : {},
      include: {
        school: { select: { id: true, name: true, type: true } },
        city: { select: { id: true, name: true } },
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async create(data: CreateEventDto, user: JwtUser) {
    return this.prisma.event.create({
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
  }

  async updateStatus(
    eventId: string,
    newStatus: string,
    actionName: string,
    comment: string | undefined,
    user: JwtUser,
  ) {
    return this.prisma.event.update({
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
  }

  async updatePreparationStatus(
    eventId: string,
    field: keyof Omit<
      Prisma.EventPreparationUncheckedCreateInput,
      'id' | 'eventId'
    >,
    status: PreparationStatus,
  ) {
    const existing = await this.prisma.eventPreparation.findUnique({
      where: { eventId },
    });

    if (existing) {
      return this.prisma.eventPreparation.update({
        where: { eventId },
        data: { [field]: status },
      });
    } else {
      return this.prisma.eventPreparation.create({
        data: { eventId, [field]: status },
      });
    }
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
        await this.telegramService.sendMessage(
          hostChatId,
          buildMessage('ведучий'),
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
        await this.telegramService.sendMessage(
          driverChatId,
          buildMessage('водій'),
        );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
        );
      }
    }

    if (driverId) {
      const driver = await this.prisma.user.findUnique({
        where: { id: driverId },
      });
      this.logger.log(
        `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
      );
      const driverChatId =
        driver?.telegramChatId ||
        (driver?.telegramId && /^\d+$/.test(driver.telegramId)
          ? driver.telegramId
          : null);
      this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
      if (driverChatId) {
        await this.telegramService.sendMessage(
          driverChatId,
          buildMessage('водій'),
        );
      }
    }

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
    if (minimal) {
      return this.prisma.event.findMany({
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
    }
    return this.prisma.event.findMany({
      where: { schoolId },
      include: {
        crew: { include: { host: true, driver: true } },
        history: { orderBy: { createdAt: 'desc' } },
        preparation: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async updateHistoryComment(historyId: string, comment: string) {
    return this.prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null },
    });
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

    return this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        history: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.event.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Подію не знайдено');

    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    return this.prisma.event.delete({
      where: { id },
    });
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    await this.prisma.eventReport.upsert({
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

    await this.prisma.expenseItem.deleteMany({ where: { reportId: eventId } });
    await this.prisma.salaryItem.deleteMany({ where: { reportId: eventId } });

    if (reportData.expenses?.length) {
      await this.prisma.expenseItem.createMany({
        data: reportData.expenses.map((exp: ExpenseItemDto) => ({
          reportId: eventId,
          category: exp.category || 'Інше',
          name: exp.name,
          amount: new Prisma.Decimal(exp.amount || 0),
        })),
      });
    }

    if (reportData.salaries?.length) {
      await this.prisma.salaryItem.createMany({
        data: reportData.salaries.map((s: SalaryItemDto) => ({
          reportId: eventId,
          userId: s.userId,
          userName: s.name,
          amount: new Prisma.Decimal(s.amount || 0),
          role: s.role,
        })),
      });

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

    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'REPORT' as never,
        history: {
          create: {
            action: 'Сформовано звіт. Етап: Звіт',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
    });
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
    if (!event) throw new NotFoundException('Подію не знайдено');
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

