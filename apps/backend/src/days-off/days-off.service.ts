import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { AppException } from '../common/exceptions/app.exception';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

const STAFF_ROLES = ['HOST', 'DRIVER'];
const MANAGER_ROLES = ['SUPERADMIN', 'MANAGER'];

@Injectable()
export class DaysOffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
  ) {}

  async findAll(from?: string, to?: string, cityId?: string) {
    return this.prisma.dayOff.findMany({
      where: {
        ...(from || to
          ? {
              date: {
                ...(from ? { gte: new Date(from) } : {}),
                ...(to ? { lte: new Date(to) } : {}),
              },
            }
          : {}),
        ...(cityId ? { user: { cityId } } : {}),
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
      orderBy: { date: 'asc' },
    });
  }

  async create(dto: { date: string; userId?: string }, currentUser: JwtUser) {
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

    // Перевіряємо, чи вже існує вихідний, щоб не слати спам, якщо він просто оновлюється
    const existing = await this.prisma.dayOff.findUnique({
      where: {
        userId_date: { userId: targetUserId, date: new Date(dto.date) },
      },
    });

    const dayOff = await this.prisma.dayOff.upsert({
      where: {
        userId_date: { userId: targetUserId, date: new Date(dto.date) },
      },
      update: {},
      create: {
        userId: targetUserId,
        date: new Date(dto.date),
        createdBy: currentUser.sub,
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    // Сповіщаємо менеджера, якщо вихідний створено вперше
    if (!existing) {
      await this.notifyManager(
        dayOff.user.cityId,
        dayOff.user.name,
        dto.date,
        'created',
      );
    }

    return dayOff;
  }

  async remove(id: string, currentUser: JwtUser) {
    const dayOff = await this.prisma.dayOff.findUnique({
      where: { id },
      include: { user: { select: { name: true, cityId: true } } },
    });

    if (!dayOff)
      throw new AppException('DAY_OFF_NOT_FOUND', HttpStatus.NOT_FOUND);

    const isOwner = dayOff.userId === currentUser.sub;
    const isManagerOrAdmin = MANAGER_ROLES.includes(currentUser.role);

    if (!isOwner && !isManagerOrAdmin) {
      throw new AppException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    if (currentUser.role === 'MANAGER' && !isOwner) {
      if (dayOff.user.cityId !== currentUser.cityId) {
        throw new AppException('CROSS_CITY_DAY_OFF', HttpStatus.FORBIDDEN);
      }
    }

    await this.prisma.dayOff.delete({ where: { id } });

    // Сповіщаємо менеджера про скасування
    await this.notifyManager(
      dayOff.user.cityId,
      dayOff.user.name,
      dayOff.date.toISOString(),
      'removed',
    );

    return { success: true };
  }

  private async notifyManager(
    cityId: string | null,
    staffName: string,
    date: string,
    action: 'created' | 'removed',
  ) {
    if (!cityId) return;

    // Шукаємо менеджера безпосередньо серед користувачів міста
    const manager = await this.prisma.user.findFirst({
      where: {
        cityId: cityId,
        role: 'MANAGER',
      },
    });

    if (!manager) return;

    const chatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    if (!chatId) return;

    const dateStr = new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const msg =
      action === 'created'
        ? `🌴 <b>Призначено вихідний</b>\n\n👤 <b>Співробітник:</b> ${staffName}\n📅 <b>Дата:</b> ${dateStr}`
        : `❌ <b>Скасовано вихідний</b>\n\n👤 <b>Співробітник:</b> ${staffName}\n📅 <b>Дата:</b> ${dateStr}`;

    await this.telegramService.sendMessage(chatId, msg);
  }
}
