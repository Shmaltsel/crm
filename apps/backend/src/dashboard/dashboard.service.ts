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

interface DashboardSummary {
  todayEvents: unknown[];
  upcomingEvents: unknown[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: unknown[];
  activityFeed: unknown[];
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
