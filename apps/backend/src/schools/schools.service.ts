import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from '../prisma/prisma.service'; // Використовуємо відносний шлях для надійності

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
    const { sourceUrl, ...schoolData } = data;

    // Використовуємо this.prisma замість prisma
    const newSchool = await this.prisma.school.create({
      data: schoolData,
    });

    // Запускаємо парсинг у фоні
    this.parserService
      .parseSchoolData(data.name, sourceUrl)
      .then(async (parsed) => {
        if (!parsed) {
          console.log(`Не вдалося знайти дані для школи: ${data.name}`);
          return;
        }

        // Використовуємо this.prisma замість prisma
        await this.prisma.school.update({
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
    // Використовуємо this.prisma
    return this.prisma.school.findMany({
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
    // Використовуємо this.prisma
    return this.prisma.school.findUnique({
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

    // Використовуємо this.prisma
    return this.prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: string) {
    // Використовуємо this.prisma
    const events = await this.prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    for (const event of events) {
      await this.eventsService.remove(event.id);
    }

    // Використовуємо this.prisma
    return this.prisma.school.delete({
      where: {
        id,
      },
    });
  }

  async searchContacts(q: string, city?: string) {
    if (!q || q.trim().length < 1) return [];

    const cityName = city || 'Львів';
    const normalizedQuery = q.toLowerCase().trim();

    // Дістаємо всі контакти цього міста одним запитом — їх мало, це дешево
    const allContacts = await this.prisma.schoolContact.findMany({
      where: { city: cityName },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
    });

    // Слова, які не несуть ідентифікаційного сенсу — відкидаємо їх із токенів
    const STOP_WORDS = new Set([
      'школа',
      'школи',
      'садочок',
      'садок',
      'дитсадок',
      'днз',
      'ліцей',
      'гімназія',
      'зош',
      'центр',
      'розвитку',
      'комунальний',
      'заклад',
      'освіти',
      'імені',
      'ім',
    ]);

    const tokens = normalizedQuery
      .replace(/№/g, ' ')
      .split(/\s+/)
      .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
      .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

    const matches = allContacts.filter((c) => {
      const num = c.schoolNumber.toLowerCase();

      // 1. Введений текст містить ідентифікатор школи цілком
      //    ("ліцей львів" includes "ліцей львів")
      if (normalizedQuery.includes(num)) return true;

      // 2. Ідентифікатор школи містить введений текст
      //    (ввели коротко — "13", а в базі "13")
      if (num.includes(normalizedQuery)) return true;

      // 3. Будь-який токен з введеного тексту збігається з ідентифікатором
      //    ("школа №13 шевченка" -> токен "13" -> matches schoolNumber "13")
      if (tokens.some((t) => num === t || num.includes(t) || t.includes(num)))
        return true;

      // 4. Пошук за ім'ям контактної особи
      if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;

      return false;
    });

    return matches.slice(0, 10);
  }
}
