import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

import { CreateEventDto } from './dto/create-event.dto';
import { SubmitReportDto } from './dto/submit-report.dto';

import { JwtUser } from '../auth/interfaces/jwt-user.interface';


/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const FIELD_ROLES = ['DRIVER', 'HOST'];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  // Список подій для сторінки "Події".
  // Водій/ведучий бачить тільки події, де він призначений в екіпаж.
  // Решта ролей (менеджер, адмін тощо) бачать усі події.
  async findAllForUser(user: JwtUser) {
    const isFieldStaff = FIELD_ROLES.includes(user.role);

    return this.prisma.event.findMany({
      where: isFieldStaff
        ? {
            crew: {
              OR: [{ hostId: user.sub }, { driverId: user.sub }],
            },
          }
        : {},
      include: {
        school: { select: { id: true, name: true, type: true } },
        city: { select: { id: true, name: true } },
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  // Оновлюємо метод create
  async create(data: CreateEventDto, user: JwtUser) {
    return this.prisma.event.create({
      data: {
        ...data,
        status: 'BASE' as never,
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: user.sub, // Беремо ID з токена
            userName: user.name, // Беремо ім'я з токена
            role: user.role, // Беремо роль з токена
          },
        },
      },
      include: { history: true },
    });
  }

  // Оновлюємо метод updateStatus
  async updateStatus(
    eventId: string,
    newStatus: string,
    actionName: string,
    comment: string | undefined,
    user: JwtUser,
  ) {
    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus as never,
        history: {
          create: {
            action: actionName,
            comment: comment || null,
            userId: user.sub, // Більше ніяких 'superadmin-123'!
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
    });
  }

  // Додайте цей метод до існуючих в EventsService
  async updatePreparationStatus(
    eventId: string,
    field: string,
    status: string,
  ) {
    const existing = await this.prisma.eventPreparation.findUnique({
      where: { eventId },
    });

    if (existing) {
      return this.prisma.eventPreparation.update({
        where: { eventId },
        data: { [field]: status },
      });
    } else {
      return this.prisma.eventPreparation.create({
        data: { eventId, [field]: status },
      });
    }
  }
  async assignCrewToEvent(
    eventId: string,
    cityId: string,
    hostId: string,
    driverId: string,
  ) {
    const crew = await this.prisma.crew.create({
      data: {
        name: 'Екіпаж події',
        cityId: cityId,
        hostId: hostId,
        driverId: driverId,
      },
    });

    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: { crewId: crew.id },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = event.time ? `, ${event.time}` : '';

    const buildMessage = (role: 'ведучий' | 'водій') =>
      `🎯 <b>Вас призначено на подію!</b>\n\n` +
      `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
      `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      (event.contactPerson
        ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
        : '') +
      (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-nwexs60ek-shmaltsels-projects.vercel.app">crm-tau-nine.vercel.app</a></i>`;

    if (hostId) {
      const host = await this.prisma.user.findUnique({ where: { id: hostId } });
      this.logger.log(
        `[assignCrew] host=${JSON.stringify({ name: host?.name, telegramId: host?.telegramId, telegramChatId: host?.telegramChatId })}`,
      );
      const hostChatId =
        host?.telegramChatId ||
        (host?.telegramId && /^\d+$/.test(host.telegramId)
          ? host.telegramId
          : null);
      this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);
      if (hostChatId) {
        await this.telegramService.sendMessage(
          hostChatId,
          buildMessage('ведучий'),
        );
      }
    }

    if (driverId) {
      const driver = await this.prisma.user.findUnique({
        where: { id: driverId },
      });
      this.logger.log(
        `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
      );
      const driverChatId =
        driver?.telegramChatId ||
        (driver?.telegramId && /^\d+$/.test(driver.telegramId)
          ? driver.telegramId
          : null);
      this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
      if (driverChatId) {
        await this.telegramService.sendMessage(
          driverChatId,
          buildMessage('водій'),
        );
      }
    }

    return event;
  }

  async findBySchool(schoolId: string) {
    return this.prisma.event.findMany({
      where: { schoolId },
      include: {
        crew: true,
        history: { orderBy: { createdAt: 'desc' } },
        preparation: true, // Включаємо підготовку, якщо вона є
      },
      orderBy: { date: 'desc' },
    });
  }

  async updateHistoryComment(historyId: string, comment: string) {
    return this.prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null },
    });
  }

  // ОНОВЛЕНО: Тепер метод видалення безпечно видаляє зв'язані дані
  async remove(id: string) {
    // 1. Видаляємо історію події
    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    // 2. Видаляємо підготовку події (якщо вона існує)
    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    // 3. Тепер спокійно видаляємо саму подію
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    // 1. Розкоментовуємо та зберігаємо звіт у базу
    await this.prisma.eventReport.upsert({
      where: { eventId },
      update: {
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        expenses: reportData.expenses || [],
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
      create: {
        eventId,
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        expenses: reportData.expenses || [],
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
    });

    // 2. Оновлюємо статус події на 'REPORT' (а не 'RE_SALE', щоб вона не зникала)
    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'REPORT' as never,
        history: {
          create: {
            action: 'Сформовано звіт. Етап: Звіт',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
    });
  }
    // Оновлюємо статус події через this.prisma
    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'RE_SALE' as never,
        history: {
          create: {
            action: 'Сформовано звіт. Етап пройдено: Проведено',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        school: true,
        city: true,
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
        report: true,
      },
    });
  }
}
