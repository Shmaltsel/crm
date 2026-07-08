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
