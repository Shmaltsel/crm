import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async revenueByMonth(cityId?: string, projectId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const where: Record<string, unknown> = {
      date: {
        gte: new Date(`${yearFilter}-01-01`),
        lt: new Date(`${yearFilter + 1}-01-01`),
      },
      status: { in: ['REPORT', 'DONE'] },
    };
    if (cityId) where.cityId = cityId;
    if (projectId) where.project = projectId;

    const events = await this.prisma.event.findMany({
      where,
      select: {
        date: true,
        report: {
          select: { totalSum: true, remainderSum: true, schoolSum: true },
        },
      },
    });

    const months = Array.from({ length: 12 }, (_, i) => {
      const monthEvents = events.filter(
        (e) => new Date(e.date).getMonth() === i,
      );
      return {
        month: (i + 1).toString().padStart(2, '0'),
        revenue: monthEvents.reduce(
          (s, e) => s + Number(e.report?.totalSum ?? 0),
          0,
        ),
        profit: monthEvents.reduce(
          (s, e) => s + Number(e.report?.remainderSum ?? 0),
          0,
        ),
        events: monthEvents.length,
      };
    });

    return months;
  }

  async eventsByCity(year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
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

    return events.map((e) => ({
      cityId: e.cityId,
      cityName: cityMap.get(e.cityId) ?? '—',
      events: e._count.id,
    }));
  }

  async profitByCity(cityId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const where: Record<string, unknown> = {
      date: {
        gte: new Date(`${yearFilter}-01-01`),
        lt: new Date(`${yearFilter + 1}-01-01`),
      },
      status: { in: ['REPORT', 'DONE'] },
    };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      select: {
        cityId: true,
        report: {
          select: { totalSum: true, schoolSum: true, remainderSum: true },
        },
      },
    });

    const byCity = new Map<
      string,
      { revenue: number; profit: number; expenses: number; count: number }
    >();
    for (const e of events) {
      const curr = byCity.get(e.cityId) ?? {
        revenue: 0,
        profit: 0,
        expenses: 0,
        count: 0,
      };
      curr.revenue += Number(e.report?.totalSum ?? 0);
      curr.profit += Number(e.report?.remainderSum ?? 0);
      curr.expenses += Number(e.report?.schoolSum ?? 0);
      curr.count++;
      byCity.set(e.cityId, curr);
    }

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    return Array.from(byCity.entries()).map(([cityId, data]) => ({
      cityId,
      cityName: cityMap.get(cityId) ?? '—',
      ...data,
    }));
  }

  async salaryFund(month?: number, year?: number, cityId?: string) {
    const now = new Date();
    const m = month ?? now.getMonth() + 1;
    const y = year ?? now.getFullYear();
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);

    const where: Record<string, unknown> = {
      createdAt: { gte: start, lt: end },
      status: 'PAID',
    };

    const records = await this.prisma.salaryRecord.findMany({
      where,
      select: { amount: true, event: { select: { cityId: true } } },
    });

    let total = records.reduce((s, r) => s + Number(r.amount), 0);
    const byCity: Record<string, number> = {};

    if (cityId) {
      const filtered = records.filter((r) => r.event?.cityId === cityId);
      total = filtered.reduce((s, r) => s + Number(r.amount), 0);
    } else {
      for (const r of records) {
        const cid = r.event?.cityId ?? 'unknown';
        byCity[cid] = (byCity[cid] ?? 0) + Number(r.amount);
      }
    }

    return {
      total,
      month: m,
      year: y,
      byCity: Object.keys(byCity).length ? byCity : undefined,
    };
  }

  async cityLeaderboard(metric?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const where: Record<string, unknown> = {
      date: {
        gte: new Date(`${yearFilter}-01-01`),
        lt: new Date(`${yearFilter + 1}-01-01`),
      },
      status: { in: ['REPORT', 'DONE'] },
    };

    const events = await this.prisma.event.findMany({
      where,
      select: {
        cityId: true,
        schoolId: true,
        childrenActual: true,
        report: {
          select: { totalSum: true, remainderSum: true, childrenCount: true },
        },
      },
    });

    const byCity = new Map<
      string,
      {
        events: number;
        revenue: number;
        profit: number;
        children: number;
        schools: Set<string>;
      }
    >();
    for (const e of events) {
      const cityId = e.cityId;
      if (!byCity.has(cityId))
        byCity.set(cityId, {
          events: 0,
          revenue: 0,
          profit: 0,
          children: 0,
          schools: new Set(),
        });
      const d = byCity.get(cityId)!;
      d.events++;
      d.revenue += Number(e.report?.totalSum ?? 0);
      d.profit += Number(e.report?.remainderSum ?? 0);
      d.children += Number(e.report?.childrenCount ?? e.childrenActual ?? 0);
      d.schools.add(e.schoolId);
    }

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    const metricMap = {
      events: 'events',
      revenue: 'revenue',
      profit: 'profit',
      children: 'children',
      schools: 'schools',
    };
    const sortKey = metricMap[metric as keyof typeof metricMap] || 'events';

    const result = Array.from(byCity.entries())
      .map(([cityId, data]) => ({
        cityId,
        cityName: cityMap.get(cityId) ?? '—',
        events: data.events,
        revenue: data.revenue,
        profit: data.profit,
        children: data.children,
        schools: data.schools.size,
      }))
      .sort(
        (a, b) =>
          (b[sortKey as keyof typeof a] as number) -
          (a[sortKey as keyof typeof a] as number),
      );

    return result;
  }

  async kpiManagers() {
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

    return managers.map((m) => ({
      userId: m.approvedBy,
      name: userMap.get(m.approvedBy!) ?? '—',
      approvedReports: m._count.id,
    }));
  }

  async kpiHosts() {
    const events = await this.prisma.event.findMany({
      where: {
        status: { in: ['REPORT', 'DONE'] },
        crew: { hostId: { not: null } },
        report: { rating: { not: null } },
      },
      select: {
        crew: { select: { hostId: true } },
        report: { select: { rating: true } },
      },
    });

    const byHost = new Map<string, { totalRating: number; count: number }>();
    for (const e of events) {
      const hostId = e.crew!.hostId!;
      if (!byHost.has(hostId)) byHost.set(hostId, { totalRating: 0, count: 0 });
      const d = byHost.get(hostId)!;
      d.totalRating += Number(e.report!.rating);
      d.count++;
    }

    const userIds = Array.from(byHost.keys());
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u.name]));

    return Array.from(byHost.entries())
      .map(([userId, data]) => ({
        userId,
        name: userMap.get(userId) ?? '—',
        avgRating: Math.round((data.totalRating / data.count) * 100) / 100,
        reportsCount: data.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10);
  }

  async kpiProjects() {
    const year = new Date().getFullYear();
    const projects = await this.prisma.event.groupBy({
      by: ['project'],
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
        status: { in: ['REPORT', 'DONE'] },
      },
      _count: { id: true },
      _sum: { childrenActual: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const projectNames = projects.map((p) => p.project);
    const revenueByProject = new Map<string, number>();
    if (projectNames.length) {
      const events = await this.prisma.event.findMany({
        where: {
          project: { in: projectNames },
          status: { in: ['REPORT', 'DONE'] },
        },
        select: {
          project: true,
          report: { select: { totalSum: true, remainderSum: true } },
        },
      });
      for (const e of events) {
        const curr = revenueByProject.get(e.project) ?? 0;
        revenueByProject.set(
          e.project,
          curr + Number(e.report?.remainderSum ?? 0),
        );
      }
    }

    return projects.map((p) => ({
      project: p.project,
      eventsCount: p._count.id,
      childrenTotal: p._sum.childrenActual ?? 0,
      profit: revenueByProject.get(p.project) ?? 0,
    }));
  }

  async roi(cityId?: string, year?: number) {
    const y = year ?? new Date().getFullYear();
    const start = new Date(y, 0, 1);
    const end = new Date(y + 1, 0, 1);

    const where: Record<string, unknown> = {
      date: { gte: start, lt: end },
      status: { in: ['REPORT', 'DONE'] },
    };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      select: {
        report: {
          select: { totalSum: true, schoolSum: true, remainderSum: true },
        },
      },
    });

    const totalRevenue = events.reduce(
      (s, e) => s + Number(e.report?.totalSum ?? 0),
      0,
    );
    const totalSchoolSum = events.reduce(
      (s, e) => s + Number(e.report?.schoolSum ?? 0),
      0,
    );

    const salaryRecords = await this.prisma.salaryRecord.findMany({
      where: { createdAt: { gte: start, lt: end }, status: 'PAID' },
      select: { amount: true },
    });
    const salaryExpenses = salaryRecords.reduce(
      (s, r) => s + Number(r.amount),
      0,
    );

    const totalExpenses = totalSchoolSum + salaryExpenses;
    const profit = totalRevenue - totalExpenses;
    const roiValue = totalExpenses > 0 ? (profit / totalExpenses) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      salaryExpenses,
      profit,
      roi: Math.round(roiValue * 100) / 100,
    };
  }
}
