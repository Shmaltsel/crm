import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SalaryPayoutService } from './salary-payout.service';
import { CityAccessService } from '../auth/services/city-access.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TelegramService } from '../telegram/telegram.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Prisma } from '@prisma/client';

const LARGE_SALARY_THRESHOLD = 50_000;

@Injectable()
export class SalaryService {
  private readonly logger = new Logger(SalaryService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly salaryPayout: SalaryPayoutService,
    private readonly cityAccess: CityAccessService,
    private readonly notificationsService: NotificationsService,
    private readonly telegramService: TelegramService,
  ) {}

  async create(dto: CreateSalaryDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('salary.notManager');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id: dto.reportId },
      include: { event: { select: { id: true, cityId: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    if (report.status !== 'SUBMITTED' && report.status !== 'APPROVED')
      throw new BadRequestException('salary.reportNotApproved');

    if (user.role === 'MANAGER') {
      await this.cityAccess.assertCityManager(user, report.event.cityId);
      this.logger.warn(
        `create cityCheck user=${user.sub} role=${user.role} cityId=${report.event.cityId} reportId=${dto.reportId}`,
      );
    }

    const hasLargeAmounts = dto.items.some(
      (item) => item.amount >= LARGE_SALARY_THRESHOLD,
    );
    if (hasLargeAmounts && user.role !== 'SUPERADMIN') {
      throw new BadRequestException('salary.amountTooLarge');
    }

    return this.prisma.$transaction(async (tx) => {
      const records = await tx.salaryRecord.createManyAndReturn({
        data: dto.items.map((item) => ({
          employeeId: item.employeeId,
          eventId: report.eventId,
          reportId: dto.reportId,
          amount: new Prisma.Decimal(item.amount),
          comment: item.comment,
          status: 'PENDING' as const,
          createdBy: user.sub,
        })),
      });
      return records;
    });
  }

  async findMine(user: JwtUser, cityId?: string) {
    const where: Record<string, unknown> = { employeeId: user.sub };
    if (cityId) {
      where.event = { cityId };
    }
    return this.prisma.salaryRecord.findMany({
      where,
      include: {
        event: { select: { date: true, project: true, cityId: true } },
        report: { select: { status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSummary(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });
    const balance = Number(user?.balance ?? 0);

    const [totalRow, paidRow, pendingRow] = await Promise.all([
      this.prisma.salaryRecord.aggregate({
        where: { employeeId: userId },
        _sum: { amount: true },
      }),
      this.prisma.salaryRecord.aggregate({
        where: { employeeId: userId, status: 'PAID' },
        _sum: { amount: true },
      }),
      this.prisma.salaryRecord.aggregate({
        where: { employeeId: userId, status: 'PENDING' },
        _sum: { amount: true },
      }),
    ]);

    return {
      balance,
      totalAllocated: Number(totalRow._sum.amount ?? 0),
      totalPaid: Number(paidRow._sum.amount ?? 0),
      pending: Number(pendingRow._sum.amount ?? 0),
    };
  }

  async findAll(user: JwtUser, cityId?: string) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('salary.notAllowed');
    }

    const where: Record<string, unknown> = {};
    if (cityId) {
      where.event = { cityId };
    } else if (user.role === 'MANAGER') {
      const managedIds = await this.cityAccess.getManagedCityIds(user.sub);
      where.event = { cityId: { in: managedIds } };
    }

    return this.prisma.salaryRecord.findMany({
      where,
      include: {
        employee: { select: { id: true, name: true, role: true } },
        event: {
          select: { id: true, date: true, project: true, cityId: true },
        },
        report: { select: { status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markPaid(id: string, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('salary.notAllowed');
    }

    const record = await this.prisma.salaryRecord.findUnique({
      where: { id },
      select: {
        id: true,
        employeeId: true,
        eventId: true,
        amount: true,
        status: true,
      },
    });
    if (!record) throw new NotFoundException('salary.notFound');
    if (record.status !== 'PENDING')
      throw new BadRequestException('salary.notPending');

    if (record.employeeId === user.sub) {
      throw new ForbiddenException('salary.cannotApproveOwn');
    }

    if (user.role === 'MANAGER') {
      const ev = await this.prisma.event.findUnique({
        where: { id: record.eventId! },
        select: { cityId: true },
      });
      const cityId = ev?.cityId ?? '';
      this.logger.warn(
        `markPaid cityCheck user=${user.sub} role=${user.role} cityId=${cityId} recordId=${id} eventId=${record.eventId} eventLoaded=${!!ev}`,
      );
      await this.cityAccess.assertCityManager(user, cityId);
    }

    await this.prisma.$transaction(async (tx) => {
      return this.salaryPayout.payout(tx, id, Number(record.amount), user.sub);
    });

    const amount = Number(record.amount);

    this.notificationsService
      .create(record.employeeId, 'SALARY_PAID', {
        salaryRecordId: id,
        amount,
        title: `Зарплату нараховано: ${amount} ₴`,
      })
      .catch(() => {});

    const employee = await this.prisma.user.findUnique({
      where: { id: record.employeeId },
      select: { telegramChatId: true, name: true },
    });
    if (employee?.telegramChatId) {
      this.telegramService
        .sendMessage(
          employee.telegramChatId,
          `💰 <b>Нараховано зарплату</b>\n\nСума: ${amount} ₴`,
        )
        .catch(() => {});
    }

    if (amount >= LARGE_SALARY_THRESHOLD) {
      const alertChatId = process.env.ALERT_CHAT_ID;
      if (alertChatId) {
        this.telegramService
          .sendMessage(
            alertChatId,
            `⚠️ <b>Велика виплата: ${amount} ₴</b>\n\nПрацівник: ${employee?.name ?? 'Невідомий'}\nМенеджер: ${user.name}`,
          )
          .catch(() => {});
      }
    }
  }
}
