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
    director?: string;
    phone?: string;
    address?: string;
    childrenCount?: number;
  }) {
    const { sourceUrl, ...schoolData } = data;

    // Використовуємо this.prisma замість prisma
    const newSchool = await this.prisma.school.create({
      data: schoolData,
    });

    // Запускаємо парсинг у фоні
    this.parserService
      // ДОДАЛИ data.type третім аргументом
      .parseSchoolData(data.name, sourceUrl, data.type)
      .then(async (parsed) => {
        if (!parsed) {
          console.log(`Не вдалося знайти дані для закладу: ${data.name}`);
          return;
        }

        // ВАЖЛИВО: оновлюємо лише ті поля, які користувач НЕ заповнив сам
        // (наприклад, директора, обраного через автодоповнення з бази контактів).
        // Раніше парсер безумовно перезаписував director/address/childrenCount,
        // навіть якщо вони вже були коректно вказані вручну.
        const updateData: Record<string, unknown> = {};

        if (!schoolData.address && parsed.address) {
          updateData.address = parsed.address;
        }
        if (!schoolData.director && parsed.director) {
          updateData.director = parsed.director;
        }
        if (!schoolData.childrenCount && parsed.childrenCount) {
          updateData.childrenCount = parsed.childrenCount;
        }

        if (Object.keys(updateData).length === 0) {
          console.log(
            `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
          );
          return;
        }

        // Використовуємо this.prisma замість prisma
        await this.prisma.school.update({
          where: {
            id: newSchool.id,
          },
          data: updateData,
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

    // Дістаємо всі контакти цього міста одним запитом
    const allContacts = await this.prisma.schoolContact.findMany({
      where: { city: cityName },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
    });

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

    // Збираємо окремі слова-токени (дозволяємо довжину від 1 символу, щоб ловити школи №1, №2)
    const tokens = normalizedQuery
      .replace(/№/g, ' ')
      .split(/\s+/)
      .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
      .filter((t) => t.length > 0 && !STOP_WORDS.has(t));

    const matches = allContacts.filter((c) => {
      const num = c.schoolNumber.toLowerCase();

      // 1. Точний збіг всієї фрази
      if (num === normalizedQuery) return true;

      const isNumeric = /^\d+$/.test(num);

      if (isNumeric) {
        // 2. Якщо номер школи в базі — це просто число (напр. "15")
        // Шукаємо точний збіг серед введених слів, щоб пошук "1" не знаходив "15" чи "21"
        if (tokens.includes(num)) return true;
      } else {
        // 3. Якщо це текстова назва (напр. "Арніка", "Сихівський ліцей", "156/162")
        if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
          return true;
        // Для довгих назв перевіряємо, чи введено хоча б одне слово з назви (мінімум 3 літери)
        if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
      }

      // 4. Пошук за ім'ям контактної особи
      if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;

      return false;
    });

    return matches.slice(0, 10);
  }
}
