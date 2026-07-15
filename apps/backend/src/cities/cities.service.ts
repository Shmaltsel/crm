import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async remove(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        _count: { select: { users: true } },
      },
    });
    if (!city) throw new BadRequestException('Місто не знайдено');
    if (city._count.users > 0) {
      throw new BadRequestException(
        "У місті є прив'язані співробітники — спочатку перепризначте або видаліть їх",
      );
    }

    const eventIds = (
      await this.prisma.event.findMany({
        where: { cityId: id },
        select: { id: true },
      })
    ).map((e) => e.id);

    const reportIds = (
      await this.prisma.eventReport.findMany({
        where: { eventId: { in: eventIds } },
        select: { id: true },
      })
    ).map((r) => r.id);

    await this.prisma.$transaction([
      this.prisma.salaryRecord.deleteMany({
        where: { eventId: { in: eventIds } },
      }),
      this.prisma.eventHistory.deleteMany({
        where: { eventId: { in: eventIds } },
      }),
      this.prisma.eventPreparation.deleteMany({
        where: { eventId: { in: eventIds } },
      }),
      this.prisma.inventoryUsage.deleteMany({
        where: { reportId: { in: reportIds } },
      }),
      this.prisma.file.deleteMany({ where: { eventId: { in: eventIds } } }),
      this.prisma.event.deleteMany({ where: { cityId: id } }),
      this.prisma.inventoryItem.deleteMany({ where: { cityId: id } }),
      this.prisma.school.deleteMany({ where: { cityId: id } }),
      this.prisma.crew.deleteMany({ where: { cityId: id } }),
      this.prisma.issueReport.deleteMany({ where: { cityId: id } }),
      this.prisma.city.delete({ where: { id } }),
    ]);

    return { success: true };
  }

  async create(name: string) {
    return this.prisma.city.create({
      data: { name },
    });
  }

  async findAll() {
    const [cities, eventsStats] = await Promise.all([
      this.prisma.city.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          users: {
            where: { role: 'MANAGER' },
            select: { id: true, name: true, phone: true },
            take: 1,
          },
          _count: { select: { schools: true } },
        },
      }),
      this.prisma.event.groupBy({
        by: ['cityId', 'status'],
        _count: { _all: true },
      }),
    ]);

    return cities.map((city) => {
      const cityStats = eventsStats.filter((stat) => stat.cityId === city.id);

      const completedEvents = cityStats
        .filter((s) => s.status === 'RE_SALE')
        .reduce((sum, s) => sum + s._count._all, 0);

      const plannedEvents = cityStats
        .filter((s) => s.status !== 'RE_SALE')
        .reduce((sum, s) => sum + s._count._all, 0);

      return {
        ...city,
        manager: city.users[0] || null,
        plannedEvents,
        completedEvents,
        schoolsCount: city._count.schools,
      };
    });
  }
  async createCrew(
    cityId: string,
    data: { name: string; hostId?: string; driverId?: string },
  ) {
    const driver = data.driverId
      ? await this.prisma.user.findUnique({ where: { id: data.driverId } })
      : null;
    return this.prisma.crew.create({
      data: {
        cityId,
        name: data.name,
        hostId: data.hostId ?? null,
        driverId: data.driverId ?? null,
        car: driver?.car || null,
        phone: driver?.phone || null,
      },
      include: { host: true, driver: true },
    });
  }

  async deleteCrew(id: string) {
    await this.prisma.event.updateMany({
      where: { crewId: id },
      data: { crewId: null },
    });
    return this.prisma.crew.delete({ where: { id } });
  }

  async findCrews(cityId: string) {
    return this.prisma.crew.findMany({
      where: { cityId },
      include: {
        host: { select: { id: true, name: true } },
        driver: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        users: {
          where: { role: 'MANAGER' },
          select: { id: true, name: true, phone: true },
          take: 1,
        },
        events: {
          where: { status: 'RE_SALE' },
          include: {
            school: { select: { id: true, name: true, type: true } },
            report: true,
            history: { orderBy: { createdAt: 'asc' } },
          },
          orderBy: { date: 'desc' },
        },
        crews: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
        schools: {
          select: { id: true, name: true, type: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!city) return null;

    return {
      ...city,
      manager: city.users[0] || null,
    };
  }
}
