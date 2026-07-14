import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const CACHE_TTL = 300_000;

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async revenueByMonth(cityId?: string, projectId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const cacheKey = `analytics:revenueByMonth:${cityId ?? ''}:${projectId ?? ''}:${yearFilter}`;
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
    const yearFilter = year ?? new Date().getFullYear();
    const cacheKey = `analytics:revenueByCityMonth:${projectId ?? ''}:${yearFilter}`;
    const cached = await this.cacheManager.get<ReturnType<typeof this.revenueByCityMonth>>(cacheKey);
    if (cached) return cached;

    const conditions = Prisma.sql`
      AND e.date >= ${new Date(`${yearFilter}-01-01`)}::date
      AND e.date < ${new Date(`${yearFilter + 1}-01-01`)}::date
      AND e.status IN ('RE_SALE')
    `;
    const projectCond = projectId
      ? Prisma.sql`AND e.project = ${projectId}`
      : Prisma.empty;

    type Row = {
      month: number;
      cityId: string;
      cityName: string;
      revenue: number;
      profit: number;
    };
    const rows = await this.prisma.$queryRaw<Row[]>`
      SELECT
        EXTRACT(MONTH FROM e.date)::int AS month,
        e."cityId",
        COALESCE(c.name, '—')           AS "cityName",
        COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
        COALESCE(SUM(r."remainderSum"), 0)::float AS profit
      FROM "Event" e
      LEFT JOIN "EventReport" r ON r."eventId" = e.id
      LEFT JOIN "City" c ON c.id = e."cityId"
      WHERE 1=1 ${conditions} ${projectCond}
      GROUP BY month, e."cityId", c.name
      ORDER BY month
    `;

    const cities = [...new Set(rows.map(r => r.cityName))];
    const result = Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      const monthRows = rows.filter(r => r.month === m);
      const entry: Record<string, string | number> = {
        month: m.toString().padStart(2, '0'),
      };
      for (const city of cities) {
        const cr = monthRows.find(r => r.cityName === city);
        entry[`revenue_${city}`] = cr?.revenue ?? 0;
        entry[`profit_${city}`] = cr?.profit ?? 0;
      }
      return entry;
    });

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async eventsByCity(year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const cacheKey = `analytics:eventsByCity:${yearFilter}`;
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
    const cacheKey = `analytics:profitByCity:${cityId ?? ''}:${yearFilter}`;
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

    const cacheKey = `analytics:salaryFund:${m}:${y}:${cityId ?? ''}`;
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

  async cityLeaderboard(metric?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const cacheKey = `analytics:cityLeaderboard:${metric ?? ''}:${yearFilter}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.cityLeaderboard>>(
        cacheKey,
      );
    if (cached) return cached;

    const metricKey = metric ?? 'events';

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
      WHERE e.date >= ${new Date(`${yearFilter}-01-01`)}::date
        AND e.date < ${new Date(`${yearFilter + 1}-01-01`)}::date
        AND e.status IN ('RE_SALE')
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
    const cacheKey = 'analytics:kpiManagers';
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
    const cacheKey = 'analytics:kpiHosts';
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
    const cacheKey = 'analytics:kpiProjects';
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

  async roi(cityId?: string, year?: number) {
    const y = year ?? new Date().getFullYear();
    const cacheKey = `analytics:roi:${cityId ?? ''}:${y}`;
    const cached =
      await this.cacheManager.get<ReturnType<typeof this.roi>>(cacheKey);
    if (cached) return cached;

    const start = new Date(y, 0, 1);
    const end = new Date(y + 1, 0, 1);

    const cityCond = cityId
      ? Prisma.sql`AND e."cityId" = ${cityId}`
      : Prisma.empty;

    type EventAgg = {
      totalRevenue: number;
      schoolSum: number;
      remainderSum: number;
    };
    const [eventAgg] = await this.prisma.$queryRaw<EventAgg[]>`
      SELECT
        COALESCE(SUM(r."totalSum"), 0)::float AS "totalRevenue",
        COALESCE(SUM(r."schoolSum"), 0)::float AS "schoolSum",
        COALESCE(SUM(r."remainderSum"), 0)::float AS "remainderSum"
      FROM "Event" e
      JOIN "EventReport" r ON r."eventId" = e.id
      WHERE e.date >= ${start}::date AND e.date < ${end}::date AND e.status IN ('RE_SALE')
      ${cityCond}
    `;

    const salaryAgg = await this.prisma.salaryRecord.aggregate({
      where: { createdAt: { gte: start, lt: end }, status: 'PAID' },
      _sum: { amount: true },
    });

    const totalRevenue = eventAgg.totalRevenue;
    const schoolSum = eventAgg.schoolSum;
    const salaryExpenses = Number(salaryAgg._sum.amount ?? 0);
    const totalExpenses = schoolSum + salaryExpenses;
    const profit = totalRevenue - totalExpenses;
    const roiValue = totalExpenses > 0 ? (profit / totalExpenses) * 100 : 0;

    const result = {
      totalRevenue,
      totalExpenses,
      salaryExpenses,
      profit,
      roi: Math.round(roiValue * 100) / 100,
    };

    await this.cacheManager.set(cacheKey, result, CACHE_TTL);
    return result;
  }
}
