import {
  Injectable,
  Logger,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Prisma } from '@prisma/client';
import {
  SubmitReportDto,
  ExpenseItemDto,
  InventoryUsageDto,
} from './dto/submit-report.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Injectable()
export class EventsReportService {
  private readonly logger = new Logger(EventsReportService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
    private readonly telegramService: TelegramService,
    private readonly notificationsService: NotificationsService,
  ) {}

  private toOptionalNumber(value: unknown): number | null {
    return value != null ? Number(value) : null;
  }

  private toNumber(value: unknown): number {
    return Number(value ?? 0);
  }

  private serializeEvent<T extends Record<string, unknown>>(ev: T): T {
    return {
      ...ev,
      price: this.toOptionalNumber(ev.price),
      received: this.toOptionalNumber(ev.received),
      report: ev.report
        ? {
            ...(ev.report as Record<string, unknown>),
            totalSum: this.toNumber(
              (ev.report as Record<string, unknown>).totalSum,
            ),
            schoolSum: this.toNumber(
              (ev.report as Record<string, unknown>).schoolSum,
            ),
            remainderSum: this.toNumber(
              (ev.report as Record<string, unknown>).remainderSum,
            ),
          }
        : ev.report,
    };
  }

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    const event = await this.prisma.$transaction(
      async (tx) => {
        const report = await tx.eventReport.upsert({
          where: { eventId },
          update: {
            status: 'SUBMITTED' as never,
            submittedAt: new Date(),
            announcementDone: reportData.announcementDone,
            materialShown: reportData.materialShown,
            childrenCount: reportData.childrenCount,
            classesCount: reportData.classesCount,
            privilegedCount: reportData.privilegedCount,
            showingsCount: reportData.showingsCount,
            totalSum: new Prisma.Decimal(reportData.totalSum),
            schoolSum: new Prisma.Decimal(reportData.schoolSum),
            remainderSum: new Prisma.Decimal(reportData.remainderSum),
            rating: reportData.rating,
          },
          create: {
            eventId,
            status: 'SUBMITTED' as never,
            submittedAt: new Date(),
            announcementDone: reportData.announcementDone,
            materialShown: reportData.materialShown,
            childrenCount: reportData.childrenCount,
            classesCount: reportData.classesCount,
            privilegedCount: reportData.privilegedCount,
            showingsCount: reportData.showingsCount,
            totalSum: new Prisma.Decimal(reportData.totalSum),
            schoolSum: new Prisma.Decimal(reportData.schoolSum),
            remainderSum: new Prisma.Decimal(reportData.remainderSum),
            rating: reportData.rating,
          },
        });

        await tx.expenseItem.deleteMany({
          where: { reportId: report.id },
        });
        await tx.salaryRecord.deleteMany({
          where: { reportId: report.id },
        });

        if (reportData.expenses?.length) {
          await tx.expenseItem.createMany({
            data: reportData.expenses.map((exp: ExpenseItemDto) => ({
              reportId: report.id,
              category: exp.category || 'Інше',
              name: exp.name,
              amount: new Prisma.Decimal(exp.amount || 0),
            })),
          });
        }

        if (reportData.salaries?.length) {
          const salariesWithUser = reportData.salaries.filter((s) => s.userId);
          if (salariesWithUser.length) {
            await tx.salaryRecord.createMany({
              data: salariesWithUser.map((s) => ({
                reportId: report.id,
                employeeId: s.userId,
                amount: new Prisma.Decimal(s.amount),
                status: 'PAID',
                createdBy: user.sub,
                eventId,
              })),
            });

            const positiveSalaries = salariesWithUser.filter(
              (s) => s.amount > 0,
            );
            for (const s of positiveSalaries) {
              await tx.user.update({
                where: { id: s.userId },
                data: { balance: { increment: s.amount } },
              });
            }
          }
        }

        if (reportData.inventoryUsages?.length) {
          for (const usage of reportData.inventoryUsages) {
            const item = await tx.inventoryItem.findUnique({
              where: { id: usage.itemId },
            });
            if (!item) {
              throw new BadRequestException(
                `Товар з id ${usage.itemId} не знайдено`,
              );
            }
            if (item.currentStock < usage.quantity) {
              throw new BadRequestException('inventory.insufficientStock');
            }
            await tx.inventoryItem.update({
              where: { id: usage.itemId },
              data: { currentStock: { decrement: usage.quantity } },
            });
            await tx.inventoryUsage.create({
              data: {
                itemId: usage.itemId,
                reportId: report.id,
                quantity: usage.quantity,
              },
            });
            const updated = await tx.inventoryItem.findUnique({
              where: { id: usage.itemId },
            });
            if (updated && updated.currentStock < updated.minStock) {
              this.logger.warn(
                `Inventory item "${item.name}" (${item.id}) below min stock: ${updated.currentStock}/${updated.minStock}`,
              );
            }
          }
        }

        return tx.event.update({
          where: { id: eventId },
          data: {
            status: 'REPORT' as never,
            history: {
              create: {
                action: 'Сформовано звіт. Захід завершено.',
                userId: user.sub,
                userName: user.name,
                role: user.role,
              },
            },
          },
          include: {
            report: true,
            history: { orderBy: { createdAt: 'desc' } },
          },
        });
      },
      { timeout: 15000 },
    );

    await this.invalidateSchoolEventsCache(event.schoolId);
    await Promise.all([
      this.cacheVersion.bumpVersion('finance'),
      this.cacheVersion.bumpVersion('dashboard'),
    ]);

    const eventWithCity = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        school: { select: { name: true } },
        city: {
          include: {
            manager: { select: { telegramChatId: true, telegramId: true } },
          },
        },
      },
    });

    if (eventWithCity) {
      const manager = eventWithCity.city?.manager;
      const chatId =
        manager?.telegramChatId ||
        (manager?.telegramId && /^\d+$/.test(manager.telegramId)
          ? manager.telegramId
          : null);
      if (chatId) {
        const schoolName = eventWithCity.school?.name || 'Невідома школа';
        this.telegramService
          .sendMessage(
            chatId,
            `🚨 Новий звіт потребує затвердження: ${schoolName}`,
          )
          .catch(() => {});
      }

      const notifyUserId =
        event.responsibleId || eventWithCity.city?.managerId;
      if (notifyUserId) {
        this.notificationsService
          .create(notifyUserId, 'REPORT_SUBMITTED', {
            eventId,
            schoolName: eventWithCity.school?.name,
            title: 'Звіт надіслано на затвердження',
          })
          .catch(() => {});
      }
    }

    return this.serializeEvent(event);
  }
}
