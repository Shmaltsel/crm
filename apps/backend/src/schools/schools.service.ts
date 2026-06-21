import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from 'src/prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class SchoolsService {
  
  constructor(
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: {
    name: string;
    type: string;
    cityId: string;
    sourceUrl?: string;
  }) {
    const { sourceUrl, ...schoolData } = data; // ← виокремлюємо sourceUrl

    const newSchool = await prisma.school.create({
      data: schoolData, // ← передаємо тільки те що є в схемі
    });

    // Запускаємо парсинг у фоні
    this.parserService
      .parseSchoolData(data.name, sourceUrl)
      .then(async (parsed) => {
        if (!parsed) {
          console.log(`Не вдалося знайти дані для школи: ${data.name}`);
          return;
        }

        await prisma.school.update({
          where: {
            id: newSchool.id,
          },
          data: {
            address: parsed.address,
            director: parsed.director,
            childrenCount: parsed.childrenCount,
          },
        });

        console.log(`Дані школи "${data.name}" успішно оновлені`);
      })
      .catch((error) => {
        console.error('Помилка оновлення даних школи:', error);
      });

    return newSchool;
  }

  async findAll() {
    return prisma.school.findMany({
      include: {
        city: true,
        events: {
          orderBy: {
            date: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
  }

  async update(id: string, data: any) {
    const { city, id: _id, createdAt, updatedAt, ...updateData } = data;

    return prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: string) {
    const events = await prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    for (const event of events) {
      await this.eventsService.remove(event.id);
    }

    return prisma.school.delete({
      where: {
        id,
      },
    });
  }
  async searchContacts(q: string, city?: string) {
    if (!q || q.length < 1) return [];

    const normalized = q.toLowerCase().trim();

    return this.prisma.schoolContact.findMany({
      where: {
        city: city || 'Львів',
        OR: [
          { schoolNumber: { contains: normalized, mode: 'insensitive' } },
          { contactName: { contains: normalized, mode: 'insensitive' } },
        ],
      },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
      take: 10,
    });
  }
}
