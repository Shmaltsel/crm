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
    return prisma.city.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return prisma.city.findUnique({
      where: { id },
      include: {
        manager: {
          select: { id: true, name: true, phone: true, email: true },
        },
        users: {
          select: { id: true, name: true, role: true, phone: true },
        },
        events: {
          where: { status: 'RE_SALE' }, // тільки завершені події
          include: {
            school: { select: { id: true, name: true, type: true } },
            crew: true,
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
  }
}
