import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';
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

const TERMINAL_STATUSES = ['DONE', 'REPORT', 'RE_SALE'] as const;

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
  private hits = 0;
  private misses = 0;
  private pending = new Map<string, Promise<DashboardSummary>>();

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  async getSummary(cityId?: string, role?: string): Promise<DashboardSummary> {
    const version = await this.cacheVersion.getVersion('dashboard');
    const key = `dashboard:v${version}:${cityId ?? 'all'}-${role ?? 'anon'}`;
    const cached = await this.cacheManager.get<DashboardSummary>(key);
    if (cached) {
      this.hits++;
      this.logger.debug(
        `cache hit — ${key} (rate=${this.hitRate().toFixed(1)}%)`,
      );
      return cached;
    }
    this.misses++;

    const existing = this.pending.get(key);
    if (existing) return existing;

    const compute = this.computeSummary(key, cityId, role);
    this.pending.set(key, compute);
    try {
      return await compute;
    } finally {
      this.pending.delete(key);
    }
  }

  private async computeSummary(
    key: string,
    cityId?: string,
    role?: string,
  ): Promise<DashboardSummary> {
    const t0 = Date.now();
    const now = new Date();
    const windows = this.buildTimeWindows(now);
    const cityFilter = cityId ? { cityId } : {};
    const canSeeAllCities = role === 'SUPERADMIN' || role === 'OWNER';

    const [eventsWindow, funnelStats, monthlyKpi, staleSchools, activityFeed] =
      await Promise.all([
        this.getEventsWindow(cityFilter, windows),
        this.getFunnelStats(cityId),
        this.getMonthlyKpi(cityFilter, windows),
        this.getStaleSchools(cityFilter, windows.staleThreshold, now),
        this.getActivityFeed(cityId, windows.todayStart),
      ]);

    const citiesStats = canSeeAllCities
      ? await this.getCitiesStats(windows)
      : [];

    const result: DashboardSummary = {
      ...eventsWindow,
      ...funnelStats,
      monthlyKpi,
      staleSchools,
      activityFeed,
      citiesStats,
    };

    this.logger.debug(`total: ${Date.now() - t0}ms`);
    await this.cacheManager.set(key, result, 60_000);
    return result;
  }

  private hitRate(): number {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : (this.hits / total) * 100;
  }

  private buildTimeWindows(now: Date) {
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
    return {
      todayStart,
      todayEnd,
      upcomingEnd,
      staleThreshold,
      monthStart,
      monthEnd,
    };
  }

  private eventInclude() {
    return {
      school: { select: { id: true, name: true } },
      city: { select: { id: true, name: true } },
      crew: {
        include: {
          host: { select: { id: true, name: true } },
          driver: { select: { id: true, name: true } },
        },
      },
    };
  }

  private async getEventsWindow(
    cityFilter: Record<string, unknown>,
    windows: ReturnType<DashboardService['buildTimeWindows']>,
  ) {
    const [todayEvents, upcomingEvents] = await Promise.all([
      this.prisma.event.findMany({
        where: {
          ...cityFilter,
          date: { gte: windows.todayStart, lt: windows.todayEnd },
        },
        include: this.eventInclude(),
        orderBy: { time: 'asc' },
      }),
      this.prisma.event.findMany({
        where: {
          ...cityFilter,
          date: { gte: windows.todayStart, lt: windows.upcomingEnd },
          status: { notIn: [...TERMINAL_STATUSES] },
          report: { is: null },
        },
        include: this.eventInclude(),
        orderBy: [{ date: 'asc' }, { time: 'asc' }],
        take: 8,
      }),
    ]);
    return { todayEvents, upcomingEvents };
  }

  private async getFunnelStats(cityId?: string) {
    const funnelRows = cityId
      ? await this.prisma.$queryRaw<
          { status: string; count: bigint }[]
        >(Prisma.sql`
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
      : await this.prisma.$queryRaw<
          { status: string; count: bigint }[]
        >(Prisma.sql`
          SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
          FROM "School" s
          LEFT JOIN LATERAL (
            SELECT status FROM "Event"
            WHERE "schoolId" = s.id
            ORDER BY date DESC
            LIMIT 1
          ) e ON true
          GROUP BY e.status
        `);

    const funnel: Record<string, number> = {};
    for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
    let totalSchools = 0;
    for (const row of funnelRows) {
      const status = row.status ?? 'BASE';
      const count = Number(row.count);
      if (funnel[status] !== undefined) funnel[status] += count;
      totalSchools += count;
    }
    return { funnel, totalSchools };
  }

  private async getMonthlyKpi(
    cityFilter: Record<string, unknown>,
    windows: ReturnType<DashboardService['buildTimeWindows']>,
  ) {
    const monthEvents = await this.prisma.event.findMany({
      where: {
        ...cityFilter,
        status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
        date: { gte: windows.monthStart, lte: windows.monthEnd },
      },
      select: {
        id: true,
        report: {
          select: { totalSum: true, remainderSum: true, childrenCount: true },
        },
      },
    });

    return monthEvents.reduce(
      (acc, ev) => {
        acc.revenue += Number(ev.report?.totalSum ?? 0);
        acc.profit += Number(ev.report?.remainderSum ?? 0);
        acc.children += ev.report?.childrenCount ?? 0;
        acc.count += 1;
        return acc;
      },
      { revenue: 0, profit: 0, children: 0, count: 0 },
    );
  }

  private async getStaleSchools(
    cityFilter: Record<string, unknown>,
    staleThreshold: Date,
    now: Date,
  ): Promise<StaleSchool[]> {
    const cityId = (cityFilter as { cityId?: string }).cityId;
    const cityCondition = cityId
      ? Prisma.sql`AND s."cityId" = ${cityId}`
      : Prisma.empty;

    const rows = await this.prisma.$queryRaw<
      {
        id: string;
        name: string;
        status: string | null;
        lastActivity: Date | null;
      }[]
    >(Prisma.sql`
      SELECT s.id, s.name, latest.status, "lastHist"."createdAt" as "lastActivity"
      FROM "School" s
      JOIN LATERAL (
        SELECT id, status FROM "Event" e
        WHERE e."schoolId" = s.id AND e.status NOT IN ('DONE', 'REPORT', 'RE_SALE')
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
      LEFT JOIN LATERAL (
        SELECT h."createdAt" FROM "EventHistory" h
        WHERE h."eventId" = latest.id
        ORDER BY h."createdAt" DESC
        LIMIT 1
      ) "lastHist" ON true
      WHERE ("lastHist"."createdAt" IS NULL OR "lastHist"."createdAt" < ${staleThreshold})
      ${cityCondition}
      ORDER BY "lastHist"."createdAt" ASC NULLS FIRST
      LIMIT 10
    `);

    return rows.map((school) => {
      const daysStale = school.lastActivity
        ? Math.floor(
            (now.getTime() - new Date(school.lastActivity).getTime()) /
              86_400_000,
          )
        : null;
      return {
        id: school.id,
        name: school.name,
        status: school.status ?? null,
        lastActivity: school.lastActivity,
        daysStale,
      };
    });
  }

  private async getActivityFeed(cityId: string | undefined, todayStart: Date) {
    const recentActivity = await this.prisma.eventHistory.findMany({
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
    });

    return recentActivity.map((h) => ({
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
  }

  private async getCitiesStats(
    windows: ReturnType<DashboardService['buildTimeWindows']>,
  ) {
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
            date: { gte: windows.monthStart, lte: windows.monthEnd },
          },
          select: {
            cityId: true,
            report: { select: { totalSum: true } },
          },
        }),
      ]);

    const schoolsIdx = Object.fromEntries(
      allSchools.map((r) => [r.cityId, r._count.id]),
    );
    const activeIdx = Object.fromEntries(
      allActiveEvents.map((r) => [r.cityId, r._count.id]),
    );
    const revenueIdx: Record<string, number> = {};
    for (const ev of allMonthEvents) {
      revenueIdx[ev.cityId] =
        (revenueIdx[ev.cityId] ?? 0) + Number(ev.report?.totalSum ?? 0);
    }

    return allCities
      .map((city) => ({
        cityId: city.id,
        cityName: city.name,
        schoolsCount: schoolsIdx[city.id] ?? 0,
        activeEvents: activeIdx[city.id] ?? 0,
        monthRevenue: revenueIdx[city.id] ?? 0,
      }))
      .sort((a, b) => b.monthRevenue - a.monthRevenue);
  }
}
