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

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(cityId?: string) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const upcomingEnd = new Date(todayStart);
    upcomingEnd.setDate(upcomingEnd.getDate() + 6); // сьогодні + 5 днів

    const cityFilter = cityId ? { cityId } : {};

    // 1. Сьогоднішні події
    const todayEvents = await this.prisma.event.findMany({
      where: {
        ...cityFilter,
        date: { gte: todayStart, lt: todayEnd },
      },
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
    });

    // 2. Найближчі події (завтра + 4 дні, без сьогоднішніх)
    const upcomingEvents = await this.prisma.event.findMany({
      where: {
        ...cityFilter,
        date: { gte: todayEnd, lt: upcomingEnd },
      },
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
    });

    // 3. Воронка — кількість шкіл по кожному етапу
    // Беремо всі школи з їхньою останньою подією
    const schools = await this.prisma.school.findMany({
      where: cityFilter,
      include: {
        events: {
          orderBy: { date: 'desc' },
          take: 1,
          select: { status: true },
        },
      },
    });

    const funnel: Record<string, number> = {};
    for (const stage of PIPELINE_STAGES) {
      funnel[stage] = 0;
    }
    // Школи без жодної події — це "База"
    for (const school of schools) {
      const lastStatus = school.events[0]?.status ?? 'BASE';
      if (funnel[lastStatus] !== undefined) {
        funnel[lastStatus]++;
      }
    }

    return {
      todayEvents,
      upcomingEvents,
      funnel,
      totalSchools: schools.length,
    };
  }
}
