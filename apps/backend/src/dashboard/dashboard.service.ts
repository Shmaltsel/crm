import { Injectable } from '@nestjs/common';
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

// Фінальні статуси — не показуємо в "потребують уваги"
const FINAL_STAGES = new Set(['DONE', 'REPORT', 'RE_SALE']);

const STALE_DAYS = 7;

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(cityId?: string) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const upcomingEnd = new Date(todayStart);
    upcomingEnd.setDate(upcomingEnd.getDate() + 6);

    const staleThreshold = new Date(now);
    staleThreshold.setDate(staleThreshold.getDate() - STALE_DAYS);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const cityFilter = cityId ? { cityId } : {};

    // Усі 5 запитів паралельно — один round-trip до БД
    const [todayEvents, upcomingEvents, schools, monthEvents, staleSchoolsRaw] =
      await Promise.all([

        // 1. Сьогоднішні події
        this.prisma.event.findMany({
          where: { ...cityFilter, date: { gte: todayStart, lt: todayEnd } },
          include: {
            school: { select: { id: true, name: true } },
            city:   { select: { id: true, name: true } },
            crew: {
              include: {
                host:   { select: { id: true, name: true } },
                driver: { select: { id: true, name: true } },
              },
            },
          },
          orderBy: { time: 'asc' },
        }),

        // 2. Найближчі події (завтра + 4 дні)
        this.prisma.event.findMany({
          where: { ...cityFilter, date: { gte: todayEnd, lt: upcomingEnd } },
          include: {
            school: { select: { id: true, name: true } },
            city:   { select: { id: true, name: true } },
            crew: {
              include: {
                host:   { select: { id: true, name: true } },
                driver: { select: { id: true, name: true } },
              },
            },
          },
          orderBy: [{ date: 'asc' }, { time: 'asc' }],
          take: 8,
        }),

        // 3. Воронка — школи з останньою подією
        this.prisma.school.findMany({
          where: cityFilter,
          include: {
            events: {
              orderBy: { date: 'desc' },
              take: 1,
              select: { status: true },
            },
          },
        }),

        // 4. Фінанси цього місяця — події зі звітами
        this.prisma.event.findMany({
          where: {
            ...cityFilter,
            status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
            date:   { gte: monthStart, lte: monthEnd },
          },
          select: {
            id: true,
            report: {
              select: {
                totalSum:      true,
                remainderSum:  true,
                childrenCount: true,
              },
            },
          },
        }),

        // 5. "Зависли" — школи де остання активність в history > 7 днів тому
        //    і статус НЕ фінальний
        this.prisma.school.findMany({
          where: {
            ...cityFilter,
            events: {
              some: {
                status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] },
                history: {
                  every: {
                    createdAt: { lt: staleThreshold },
                  },
                },
              },
            },
          },
          include: {
            events: {
              where: {
                status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] },
              },
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
      ]);

    // --- Воронка ---
    const funnel: Record<string, number> = {};
    for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
    for (const school of schools) {
      const status = school.events[0]?.status ?? 'BASE';
      if (funnel[status] !== undefined) funnel[status]++;
    }

    // --- Фінанси місяця ---
    const monthlyKpi = monthEvents.reduce(
      (acc, ev) => {
        acc.revenue  += ev.report?.totalSum      ?? 0;
        acc.profit   += ev.report?.remainderSum  ?? 0;
        acc.children += ev.report?.childrenCount ?? 0;
        acc.count    += 1;
        return acc;
      },
      { revenue: 0, profit: 0, children: 0, count: 0 },
    );

    // --- "Потребують уваги" — рахуємо дні без активності ---
    const staleSchools = staleSchoolsRaw
      .map((school) => {
        const lastEvent   = school.events[0];
        const lastHistory = lastEvent?.history[0];
        const lastActivity = lastHistory?.createdAt ?? null;
        const daysStale = lastActivity
          ? Math.floor((now.getTime() - new Date(lastActivity).getTime()) / 86_400_000)
          : null;

        return {
          id:           school.id,
          name:         school.name,
          status:       lastEvent?.status ?? null,
          lastActivity,
          daysStale,
        };
      })
      // Сортуємо: найдовше без уваги — першими
      .sort((a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0));

    return {
      todayEvents,
      upcomingEvents,
      funnel,
      totalSchools: schools.length,
      monthlyKpi,
      staleSchools,
    };
  }
}
