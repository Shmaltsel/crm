import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AppException } from '../common/exceptions/app.exception';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { DayOffRequestStatus } from '@prisma/client';

const STAFF_ROLES = ['HOST', 'DRIVER'];
const MANAGER_ROLES = ['SUPERADMIN', 'MANAGER'];

@Injectable()
export class DayOffRequestsService {
  private readonly logger = new Logger(DayOffRequestsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(
    dto: { date: string; userId?: string; reason?: string },
    currentUser: JwtUser,
  ) {
    const isStaff = STAFF_ROLES.includes(currentUser.role);
    const isManagerOrAdmin = MANAGER_ROLES.includes(currentUser.role);

    let targetUserId: string;

    if (isStaff) {
      targetUserId = currentUser.sub;
    } else if (isManagerOrAdmin) {
      if (!dto.userId)
        throw new AppException('USER_ID_REQUIRED', HttpStatus.BAD_REQUEST);

      const target = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!target || !STAFF_ROLES.includes(target.role)) {
        throw new AppException('INVALID_STAFF_USER', HttpStatus.BAD_REQUEST);
      }
      if (
        currentUser.role === 'MANAGER' &&
        target.cityId !== currentUser.cityId
      ) {
        throw new AppException('CROSS_CITY_DAY_OFF', HttpStatus.FORBIDDEN);
      }
      targetUserId = target.id;
    } else {
      throw new AppException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const date = new Date(dto.date);

    const existingRequest = await this.prisma.dayOffRequest.findUnique({
      where: { userId_date: { userId: targetUserId, date } },
    });

    if (existingRequest) {
      throw new AppException(
        'DAY_OFF_REQUEST_ALREADY_REVIEWED',
        HttpStatus.CONFLICT,
      );
    }

    const existingDayOff = await this.prisma.dayOff.findUnique({
      where: { userId_date: { userId: targetUserId, date } },
    });
    if (existingDayOff) {
      throw new AppException('DAY_OFF_ALREADY_APPROVED', HttpStatus.CONFLICT);
    }

    const request = await this.prisma.dayOffRequest.create({
      data: {
        userId: targetUserId,
        date,
        reason: dto.reason,
        createdBy: currentUser.sub,
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    await this.notifyManager(request);

    return request;
  }

  async findAll(from?: string, to?: string, cityId?: string, user?: JwtUser) {
    const effectiveCityId = user?.role === 'MANAGER' ? user.cityId : cityId;

    return this.prisma.dayOffRequest.findMany({
      where: {
        ...(from || to
          ? {
              date: {
                ...(from ? { gte: new Date(from) } : {}),
                ...(to ? { lte: new Date(to) } : {}),
              },
            }
          : {}),
        ...(effectiveCityId ? { user: { cityId: effectiveCityId } } : {}),
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
      orderBy: { date: 'asc' },
    });
  }

  async approve(requestId: string, managerId: string, managerNote?: string) {
    const request = await this.prisma.dayOffRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: { id: true, name: true, role: true, cityId: true },
        },
      },
    });

    if (!request)
      throw new AppException('DAY_OFF_REQUEST_NOT_FOUND', HttpStatus.NOT_FOUND);
    if (request.status !== DayOffRequestStatus.PENDING) {
      throw new AppException(
        'DAY_OFF_REQUEST_ALREADY_REVIEWED',
        HttpStatus.CONFLICT,
      );
    }

    const dayOff = await this.prisma.dayOff.upsert({
      where: {
        userId_date: { userId: request.userId, date: request.date },
      },
      update: {},
      create: {
        userId: request.userId,
        date: request.date,
        createdBy: managerId,
      },
    });

    const updated = await this.prisma.dayOffRequest.update({
      where: { id: requestId },
      data: {
        status: DayOffRequestStatus.APPROVED,
        managerNote,
        reviewedBy: managerId,
        reviewedAt: new Date(),
        dayOffId: dayOff.id,
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    await this.notifyStaff(updated, 'APPROVED');

    return updated;
  }

  async reject(requestId: string, managerId: string, managerNote?: string) {
    const request = await this.prisma.dayOffRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: { id: true, name: true, role: true, cityId: true },
        },
      },
    });

    if (!request)
      throw new AppException('DAY_OFF_REQUEST_NOT_FOUND', HttpStatus.NOT_FOUND);
    if (request.status !== DayOffRequestStatus.PENDING) {
      throw new AppException(
        'DAY_OFF_REQUEST_ALREADY_REVIEWED',
        HttpStatus.CONFLICT,
      );
    }

    const updated = await this.prisma.dayOffRequest.update({
      where: { id: requestId },
      data: {
        status: DayOffRequestStatus.REJECTED,
        managerNote,
        reviewedBy: managerId,
        reviewedAt: new Date(),
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    await this.notifyStaff(updated, 'REJECTED');

    return updated;
  }

  private async notifyManager(request: {
    id: string;
    user: { id: string; name: string; role: string; cityId: string | null };
    date: Date;
    reason: string | null;
  }) {
    if (!request.user.cityId) return;

    const manager = await this.prisma.user.findFirst({
      where: { cityId: request.user.cityId, role: 'MANAGER' },
    });
    if (!manager) return;

    const dateStr = request.date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const managerChatId =
      manager.telegramChatId ||
      (manager.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    if (managerChatId) {
      const reasonLine = request.reason
        ? `\n📝 <b>Причина:</b> ${request.reason}`
        : '';
      const text =
        `🏖️ <b>Запит на вихідний</b>\n\n` +
        `👤 <b>Співробітник:</b> ${request.user.name}\n` +
        `📅 <b>Дата:</b> ${dateStr}` +
        reasonLine;

      this.telegramService.sendMessage(managerChatId, text).catch(() => {});
    }

    this.notificationsService
      .create(manager.id, 'DAY_OFF_REQUEST_CREATED', {
        staffName: request.user.name,
        date: dateStr,
        requestId: request.id,
      })
      .catch(() => {});

    // Telegram OWNER + SUPERADMIN
    this.notificationsService.getAdminIds().then((adminIds) => {
      this.notificationsService.sendTelegramToUsers(
        adminIds,
        'DAY_OFF_REQUEST_CREATED',
        { staffName: request.user.name, date: dateStr },
      );
    }).catch(() => {});
  }

  private async notifyStaff(
    request: {
      id: string;
      userId: string;
      user: { name: string };
      date: Date;
      managerNote: string | null;
    },
    status: 'APPROVED' | 'REJECTED',
  ) {
    const staffUser = await this.prisma.user.findUnique({
      where: { id: request.userId },
      select: { telegramChatId: true, telegramId: true, name: true },
    });

    const dateStr = request.date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    if (staffUser) {
      const chatId =
        staffUser.telegramChatId ||
        (staffUser.telegramId && /^\d+$/.test(staffUser.telegramId)
          ? staffUser.telegramId
          : null);

      if (chatId) {
        const emoji = status === 'APPROVED' ? '✅' : '❌';
        const statusText =
          status === 'APPROVED' ? 'Запит затверджено' : 'Запит відхилено';
        const noteLine = request.managerNote
          ? `\n💬 <b>Коментар:</b> ${request.managerNote}`
          : '';
        const text =
          `${emoji} <b>${statusText}</b>\n\n` +
          `📅 <b>Дата:</b> ${dateStr}` +
          noteLine;

        await this.telegramService.sendMessage(chatId, text);
      }
    }
  }
}
