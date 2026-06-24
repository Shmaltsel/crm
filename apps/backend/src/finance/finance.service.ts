export class FinanceModule {}</file>
<file path="apps/backend/src/finance/finance.service.ts">import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async getMyBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, name: true },
    });
    return { balance: user?.balance ?? 0, name: user?.name ?? '' };
  }

  async getDashboard({
    period,
    cityId,
    project,
  }: {
    period?: string;
    cityId?: string;
    project?: string;
  }) {
    const now = new Date();
    let dateFrom: Date | undefined;

    if (period === 'month')
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    else if (period === 'quarter')
      dateFrom = new Date(
        now.getFullYear(),
        Math.floor(now.getMonth() / 3) * 3,
        1,
      );
    else if (period === 'year') dateFrom = new Date(now.getFullYear(), 0, 1);

    const where: any = { status: 'RE_SALE' };
    if (dateFrom) where.date = { gte: dateFrom };
    if (cityId) where.cityId = cityId;
    if (project) where.project = project;

    const events = await this.prisma.event.findMany({
      where,
      include: {
        report: true,
        school: { select: { id: true, name: true } },
        city: { select: { id: true, name: true } },
        crew: {
          include: {
            host: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { date: 'asc' },
    });

    // KPI
    const totalRevenue = events.reduce(
      (s, e) => s + (e.report?.totalSum || 0),
      0,
    );
    const totalExpenses = events.reduce((s, e) => {
      const exp: any[] = Array.isArray(e.report?.expenses)
        ? (e.report.expenses as any[])
        : [];
      return s + exp.reduce((es: number, ex: any) => es + (ex.amount || 0), 0);
    }, 0);
    const totalProfit = events.reduce(
      (s, e) => s + (e.report?.remainderSum || 0),
      0,
    );

    // Графік по місяцях
    const monthlyMap: Record<
      string,
      { month: string; revenue: number; profit: number }
    > = {};
    events.forEach((e) => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('uk-UA', {
        month: 'short',
        year: '2-digit',
      });
      if (!monthlyMap[key])
        monthlyMap[key] = { month: label, revenue: 0, profit: 0 };
      monthlyMap[key].revenue += e.report?.totalSum || 0;
      monthlyMap[key].profit += e.report?.remainderSum || 0;
    });
    const monthly = Object.values(monthlyMap);

    // Структура доходів по проєктах
    const projectMap: Record<string, number> = {};
    events.forEach((e) => {
      const p = e.project || 'Інше';
      projectMap[p] = (projectMap[p] || 0) + (e.report?.totalSum || 0);
    });
    const byProject = Object.entries(projectMap).map(([name, value]) => ({
      name,
      value,
    }));

    // Топ міст
    const cityMap: Record<
      string,
      { name: string; revenue: number; profit: number }
    > = {};
    events.forEach((e) => {
      const cid = e.cityId;
      if (!cityMap[cid])
        cityMap[cid] = { name: e.city?.name || '—', revenue: 0, profit: 0 };
      cityMap[cid].revenue += e.report?.totalSum || 0;
      cityMap[cid].profit += e.report?.remainderSum || 0;
    });
    const topCities = Object.values(cityMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Топ шкіл
    const schoolMap: Record<
      string,
      { name: string; count: number; revenue: number }
    > = {};
    events.forEach((e) => {
      const sid = e.schoolId;
      if (!schoolMap[sid])
        schoolMap[sid] = { name: e.school?.name || '—', count: 0, revenue: 0 };
      schoolMap[sid].count++;
      schoolMap[sid].revenue += e.report?.totalSum || 0;
    });
    const topSchools = Object.values(schoolMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Витрати по категоріях
    const expCatMap: Record<string, number> = {};
    events.forEach((e) => {
      const exp: any[] = Array.isArray(e.report?.expenses)
        ? (e.report.expenses as any[])
        : [];
      exp.forEach((ex: any) => {
        const cat = ex.category || ex.name || 'Інше';
        expCatMap[cat] = (expCatMap[cat] || 0) + (ex.amount || 0);
      });
    });
    const byExpenseCategory = Object.entries(expCatMap).map(
      ([name, value]) => ({ name, value }),
    );

    // Найприбутковіші та найзбитковіші події
    const sortedByProfit = [...events].sort(
      (a, b) => (b.report?.remainderSum || 0) - (a.report?.remainderSum || 0),
    );
    const topEvents = sortedByProfit.slice(0, 5).map((e) => ({
      id: e.id,
      date: e.date,
      school: e.school?.name,
      profit: e.report?.remainderSum || 0,
      revenue: e.report?.totalSum || 0,
    }));
    const worstEvents = sortedByProfit
      .slice(-5)
      .reverse()
      .map((e) => ({
        id: e.id,
        date: e.date,
        school: e.school?.name,
        profit: e.report?.remainderSum || 0,
        revenue: e.report?.totalSum || 0,
      }));

    // Очікувана виручка (незавершені події)
    const planned = await this.prisma.event.findMany({
      where: {
        status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
        ...(cityId ? { cityId } : {}),
      },
      select: { price: true },
    });
    const expectedRevenue = planned.reduce((s, e) => s + (e.price || 0), 0);

    // Список унікальних проєктів для фільтру
    const projects = await this.prisma.event.findMany({
      select: { project: true },
      distinct: ['project'],
    });

    // Список міст для фільтру
    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });

    return {
      kpi: {
        totalRevenue,
        totalExpenses,
        totalProfit,
        totalEvents: events.length,
      },
      monthly,
      byProject,
      byExpenseCategory,
      topCities,
      topSchools,
      topEvents,
      worstEvents,
      expectedRevenue,
      filters: {
        projects: projects.map((p) => p.project).filter(Boolean),
        cities,
      },
    };
  }

  async getStaffRevenue({ period, cityId }: { period?: string; cityId?: string }) {
    const now = new Date();
    let dateFrom: Date | undefined;

    if (period === 'month')
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    else if (period === 'quarter')
      dateFrom = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    else if (period === 'year')
      dateFrom = new Date(now.getFullYear(), 0, 1);

    const where: any = { status: 'RE_SALE' };
    if (dateFrom) where.date = { gte: dateFrom };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      include: {
        report: { select: { totalSum: true } },
        crew: {
          include: {
            host: { select: { id: true, name: true, role: true } },
            driver: { select: { id: true, name: true, role: true } },
          },
        },
        city: { select: { id: true, name: true } },
      },
    });

    // Агрегуємо виручку по кожному ведучому і водію
    const staffMap: Record<string, { id: string; name: string; role: string; revenue: number; eventsCount: number }> = {};

    for (const ev of events) {
      const revenue = ev.report?.totalSum ?? 0;
      if (!ev.crew) continue;

      for (const [member, memberRole] of [
        [ev.crew.host, 'HOST'],
        [ev.crew.driver, 'DRIVER'],
      ] as [{ id: string; name: string } | null, string][]) {
        if (!member) continue;
        if (!staffMap[member.id]) {
          staffMap[member.id] = { id: member.id, name: member.name, role: memberRole, revenue: 0, eventsCount: 0 };
        }
        staffMap[member.id].revenue += revenue;
        staffMap[member.id].eventsCount += 1;
      }
    }

    const staff = Object.values(staffMap).sort((a, b) => b.revenue - a.revenue);
    const totalRevenue = events.reduce((s, e) => s + (e.report?.totalSum ?? 0), 0);

    return { staff, totalRevenue, eventsCount: events.length };
  }
}