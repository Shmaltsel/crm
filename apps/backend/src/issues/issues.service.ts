import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  async create(data: {
    eventId: string;
    schoolName: string;
    eventName: string;
    message: string;
    cityId: string;
  }) {
    // 1. Зберігаємо проблему
    const issue = await this.prisma.issueReport.create({ data });

    // 2. Підтягуємо подію з екіпажем і учасниками
    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
      include: {
        crew: {
          include: {
            host: { select: { name: true, telegramId: true } },
            driver: { select: { name: true, telegramId: true } },
          },
        },
      },
    });

    // 3. Будуємо рядок з тегами екіпажу
    const formatMember = (user: {
      name: string;
      telegramId: string | null;
    }) => {
      if (!user.telegramId) return user.name;
      const clean = user.telegramId.replace(/^@/, '');
      const isNumeric = /^\d+$/.test(clean);
      if (isNumeric) return user.name;
      return `@${clean} (${user.name})`;
    };

    const crewMembers: string[] = [];
    if (event?.crew?.host) {
      crewMembers.push(`🎙️ Ведучий: ${formatMember(event.crew.host)}`);
    }
    if (event?.crew?.driver) {
      crewMembers.push(`🚗 Водій: ${formatMember(event.crew.driver)}`);
    }

    // 4. Знаходимо менеджера міста
    const city = await this.prisma.city.findUnique({
      where: { id: data.cityId },
      include: {
        users: {
          where: { role: 'MANAGER' },
          take: 1,
        },
      },
    });

    const manager = city?.users?.[0];
    const chatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    // 5. Надсилаємо Telegram з екіпажем
    if (chatId) {
      const text =
        `🚨 <b>Нова проблема!</b>\n\n` +
        `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
        `📅 <b>Подія:</b> ${data.eventName}\n\n` +
        `💬 <b>Повідомлення:</b>\n${data.message}` +
        (crewMembers.length > 0 ? `\n\n👥 <b>Екіпаж:</b>\n${crewMembers.join('\n')}` : '') +
        `\n\n<i>Деталі у CRM: <a href="https://crm-tau-nine.vercel.app">crm-tau-nine.vercel.app</a></i>`;

      await this.telegramService.sendMessage(chatId, text);
    }

    return issue;
  }

  async findByCityId(cityId: string) {
    return this.prisma.issueReport.findMany({
      where: { cityId },
      include: {
        event: {
          include: { school: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.issueReport.update({
      where: { id },
      data: { status },
    });
  }
}
