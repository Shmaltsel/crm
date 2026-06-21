import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateEventDto } from './dto/create-event.dto';
import { SubmitReportDto } from './dto/submit-report.dto';

import { JwtUser } from '../auth/interfaces/jwt-user.interface';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
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
    // Створюємо екіпаж під цю подію
    const crew = await this.prisma.crew.create({
      data: {
        name: 'Екіпаж події',
        cityId: cityId,
        hostId: hostId,
        driverId: driverId,
      },
    });

    // Оновлюємо подію, додаючи ID створеного екіпажу
    return this.prisma.event.update({
      where: { id: eventId },
      data: { crewId: crew.id },
      include: {
        crew: true,
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });
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
    // Використовуємо this.prisma
    // const report = await this.prisma.eventReport.upsert({
    //   where: { eventId },
    //   update: {
    //     announcementDone: reportData.announcementDone,
    //     materialShown: reportData.materialShown,
    //     childrenCount: reportData.childrenCount,
    //     classesCount: reportData.classesCount,
    //     privilegedCount: reportData.privilegedCount,
    //     showingsCount: reportData.showingsCount,
    //     totalSum: reportData.totalSum,
    //     schoolSum: reportData.schoolSum,
    //     expenses: reportData.expenses,
    //     remainderSum: reportData.remainderSum,
    //     rating: reportData.rating,
    //   },
    //   create: {
    //     eventId,
    //     ...reportData,
    //   },
    // });
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
