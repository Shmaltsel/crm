import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CitiesService {
  async create(name: string) {
    return prisma.city.create({
      data: { name },
    });
  }

  async findAll() {
    const cities = await prisma.city.findMany({
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

    return cities.map(city => ({
      ...city,
      manager: city.users[0] || null,
      plannedEvents: city.events.filter(e => e.status !== 'RE_SALE').length,
      completedEvents: city.events.filter(e => e.status === 'RE_SALE').length,
    }));
  }

  async findOne(id: string) {
    const city = await prisma.city.findUnique({
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
