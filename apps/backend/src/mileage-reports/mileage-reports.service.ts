import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SalaryPayoutService } from '../salary/salary-payout.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AppException } from '../common/exceptions/app.exception';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateMileageReportDto } from './dto/create-mileage-report.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MileageReportsService {
  private readonly logger = new Logger(MileageReportsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly salaryPayout: SalaryPayoutService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(dto: CreateMileageReportDto, user: JwtUser) {
    const report = await this.prisma.mileageReport.create({
      data: {
        userId: user.sub,
        date: new Date(dto.date),
        km: new Prisma.Decimal(dto.km),
        fuel: new Prisma.Decimal(dto.fuel),
        depreciation: new Prisma.Decimal(dto.depreciation),
        totalAmount: new Prisma.Decimal(dto.totalAmount),
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    await this.notifyManager(report);

    return report;
  }

  async findMine(user: JwtUser) {
    return this.prisma.mileageReport.findMany({
      where: { userId: user.sub },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(user: JwtUser) {
    const where: Record<string, unknown> = {};
    if (user.role === 'MANAGER') {
      where.user = { cityId: user.cityId };
    }
    return this.prisma.mileageReport.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(reportId: string, managerId: string, managerNote?: string) {
    const report = await this.prisma.mileageReport.findUnique({
      where: { id: reportId },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    if (!report) {
      throw new AppException('MILEAGE_REPORT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    if (report.status !== 'PENDING') {
      throw new AppException('MILEAGE_REPORT_ALREADY_REVIEWED', HttpStatus.CONFLICT);
    }

    return this.prisma.$transaction(async (tx) => {
      const salaryRecord = await tx.salaryRecord.create({
        data: {
          employeeId: report.userId,
          mileageReportId: report.id,
          amount: report.totalAmount,
          comment: `Кілометраж: ${report.km} км (${new Date(report.date).toLocaleDateString('uk-UA')})`,
          status: 'PAID',
          paidAt: new Date(),
          paidBy: managerId,
          createdBy: managerId,
        },
      });

      await tx.user.update({
        where: { id: report.userId },
        data: { balance: { increment: report.totalAmount } },
      });

      const updated = await tx.mileageReport.update({
        where: { id: reportId },
        data: {
          status: 'APPROVED',
          managerNote,
          reviewedBy: managerId,
          reviewedAt: new Date(),
        },
        include: {
          user: { select: { id: true, name: true, role: true, cityId: true } },
        },
      });

      this.notificationsService
        .sendTelegramNotification(report.userId, 'MILEAGE_APPROVED', {
          driverName: report.user.name,
          km: String(report.km),
          amount: String(report.totalAmount),
        })
        .catch(() => {});

      return { ...updated, salaryRecordId: salaryRecord.id };
    });
  }

  async reject(reportId: string, managerId: string, managerNote?: string) {
    const report = await this.prisma.mileageReport.findUnique({
      where: { id: reportId },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    if (!report) {
      throw new AppException('MILEAGE_REPORT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    if (report.status !== 'PENDING') {
      throw new AppException('MILEAGE_REPORT_ALREADY_REVIEWED', HttpStatus.CONFLICT);
    }

    const updated = await this.prisma.mileageReport.update({
      where: { id: reportId },
      data: {
        status: 'REJECTED',
        managerNote,
        reviewedBy: managerId,
        reviewedAt: new Date(),
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    this.notificationsService
      .sendTelegramNotification(report.userId, 'MILEAGE_REJECTED', {
        driverName: report.user.name,
        km: String(report.km),
        reason: managerNote,
      })
      .catch(() => {});

    return updated;
  }

  private async notifyManager(report: {
    id: string;
    user: { id: string; name: string; role: string; cityId: string | null };
    date: Date;
    km: Prisma.Decimal;
    totalAmount: Prisma.Decimal;
  }) {
    if (!report.user.cityId) return;

    const manager = await this.prisma.user.findFirst({
      where: { cityId: report.user.cityId, role: 'MANAGER' },
    });
    if (!manager) return;

    const dateStr = new Date(report.date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    this.notificationsService
      .sendTelegramNotification(manager.id, 'MILEAGE_REPORT_CREATED', {
        driverName: report.user.name,
        date: dateStr,
        km: String(report.km),
        amount: String(report.totalAmount),
      })
      .catch(() => {});

    this.notificationsService
      .create(manager.id, 'MILEAGE_REPORT_CREATED', {
        driverName: report.user.name,
        date: dateStr,
        requestId: report.id,
      })
      .catch(() => {});
  }
}
