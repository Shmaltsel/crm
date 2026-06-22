import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    return this.prisma.city.create({
      data: { name },
    });
  }

  async findAll() {
    const cities = await this.prisma.city.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        users: {
          where: { role: 'MANAGER' },
          select: { id: true, name: true, phone: true },
          take: 1,
        },
        events: {
          select: { id: true, status: true },
        },
      },
    });

    return cities.map((city) => ({
      ...city,
      manager: city.users[0] || null,
      plannedEvents: city.events.filter((e) => e.status !== 'RE_SALE').length,
      completedEvents: city.events.filter((e) => e.status === 'RE_SALE').length,
    }));
  }
  async createCrew(cityId: string, data: { name: string; hostId: string; driverId: string }) {
    const driver = await this.prisma.user.findUnique({ where: { id: data.driverId } });
    return this.prisma.crew.create({
      data: {
        cityId,
        name: data.name,
        hostId: data.hostId,
        driverId: data.driverId,
        car: driver?.car || null,
        phone: driver?.phone || null,
      },
      include: { host: true, driver: true },
    });
  }

  async deleteCrew(id: string) {
    // Відв'язуємо екіпаж від подій перед видаленням, щоб не було помилок бази
    await this.prisma.event.updateMany({
      where: { crewId: id },
      data: { crewId: null },
    });
    return this.prisma.crew.delete({ where: { id } });
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
            history: { orderBy: { createdAt: 'asc' } }, // ДОДАНО: підтягуємо історію пайплайну
          },
          orderBy: { date: 'desc' },
        },
        crews: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
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
