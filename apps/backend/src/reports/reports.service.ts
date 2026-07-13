import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CityAccessService } from '../auth/services/city-access.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TelegramService } from '../telegram/telegram.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RevisionDto } from './dto/revision.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { ReportStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CacheVersionService } from '../common/cache/cache-version.service';

const ALLOWED_TRANSITIONS: Record<ReportStatus, ReportStatus[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['APPROVED', 'NEEDS_REVISION', 'REJECTED'],
  NEEDS_REVISION: ['SUBMITTED'],
  APPROVED: [],
  REJECTED: ['CLOSED'],
  CLOSED: [],
};

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly telegramService: TelegramService,
    private readonly cacheVersion: CacheVersionService,
    private readonly cityAccess: CityAccessService,
  ) {}

  private async sendCrewTelegram(userId: string, schoolName: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { telegramChatId: true, name: true },
      });
      if (!user?.telegramChatId) return;
      await this.telegramService.sendMessage(
        user.telegramChatId,
        `✅ <b>Звіт затверджено</b>\n\nШкола: ${schoolName}\nОчікуйте виплату.`,
      );
    } catch {
      /* non-critical */
    }
  }

  private async assertCrewMember(
    eventId: string,
    userId: string,
  ): Promise<void> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { crew: true },
    });
    if (!event) throw new NotFoundException('events.notFound');
    if (!event.crew) throw new ForbiddenException('report.noCrew');
    if (event.crew.hostId !== userId && event.crew.driverId !== userId) {
      throw new ForbiddenException('report.notCrewMember');
    }
  }

  private async assertReportOwner(
    reportId: string,
    userId: string,
    eventId: string,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { crew: true },
    });
    if (!event?.crew) throw new ForbiddenException('report.notAuthor');
    if (event.crew.hostId !== userId && event.crew.driverId !== userId) {
      throw new ForbiddenException('report.notAuthor');
    }
  }

  private assertTransition(from: ReportStatus, to: ReportStatus) {
    const allowed = ALLOWED_TRANSITIONS[from];
    if (!allowed?.includes(to)) {
      throw new BadRequestException('report.invalidTransition');
    }
  }

  async create(dto: CreateReportDto, user: JwtUser) {
    await this.assertCrewMember(dto.eventId, user.sub);

    const data: Prisma.EventReportCreateInput = {
      event: { connect: { id: dto.eventId } },
      status: 'DRAFT',
    };

    if (dto.announcementDone !== undefined)
      data.announcementDone = dto.announcementDone;
    if (dto.materialShown !== undefined) data.materialShown = dto.materialShown;
    if (dto.childrenCount !== undefined) data.childrenCount = dto.childrenCount;
    if (dto.classesCount !== undefined) data.classesCount = dto.classesCount;
    if (dto.privilegedCount !== undefined)
      data.privilegedCount = dto.privilegedCount;
    if (dto.showingsCount !== undefined) data.showingsCount = dto.showingsCount;
    if (dto.totalSum !== undefined)
      data.totalSum = new Prisma.Decimal(dto.totalSum);
    if (dto.schoolSum !== undefined)
      data.schoolSum = new Prisma.Decimal(dto.schoolSum);
    if (dto.remainderSum !== undefined)
      data.remainderSum = new Prisma.Decimal(dto.remainderSum);
    if (dto.rating !== undefined) data.rating = dto.rating;
    if (dto.directorSatisfied !== undefined)
      data.directorSatisfied = dto.directorSatisfied;
    if (dto.teachersSatisfied !== undefined)
      data.teachersSatisfied = dto.teachersSatisfied;
    if (dto.hadIssues !== undefined) data.hadIssues = dto.hadIssues;
    if (dto.comment !== undefined) data.comment = dto.comment;

    return this.prisma.eventReport.create({ data });
  }

  async update(id: string, dto: UpdateReportDto, user: JwtUser) {
    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    if (report.status !== 'DRAFT' && report.status !== 'NEEDS_REVISION') {
      throw new BadRequestException('report.notEditable');
    }
    await this.assertReportOwner(id, user.sub, report.eventId);

    const data: Prisma.EventReportUpdateInput = {};

    if (dto.announcementDone !== undefined)
      data.announcementDone = dto.announcementDone;
    if (dto.materialShown !== undefined) data.materialShown = dto.materialShown;
    if (dto.childrenCount !== undefined) data.childrenCount = dto.childrenCount;
    if (dto.classesCount !== undefined) data.classesCount = dto.classesCount;
    if (dto.privilegedCount !== undefined)
      data.privilegedCount = dto.privilegedCount;
    if (dto.showingsCount !== undefined) data.showingsCount = dto.showingsCount;
    if (dto.totalSum !== undefined)
      data.totalSum = new Prisma.Decimal(dto.totalSum);
    if (dto.schoolSum !== undefined)
      data.schoolSum = new Prisma.Decimal(dto.schoolSum);
    if (dto.remainderSum !== undefined)
      data.remainderSum = new Prisma.Decimal(dto.remainderSum);
    if (dto.rating !== undefined) data.rating = dto.rating;
    if (dto.directorSatisfied !== undefined)
      data.directorSatisfied = dto.directorSatisfied;
    if (dto.teachersSatisfied !== undefined)
      data.teachersSatisfied = dto.teachersSatisfied;
    if (dto.hadIssues !== undefined) data.hadIssues = dto.hadIssues;
    if (dto.comment !== undefined) data.comment = dto.comment;

    return this.prisma.eventReport.update({ where: { id }, data });
  }

  async submit(id: string, user: JwtUser) {
    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: {
        event: {
          include: {
            crew: true,
            school: { select: { name: true } },
            city: {
              include: {
                manager: { select: { telegramChatId: true, telegramId: true } },
              },
            },
          },
        },
      },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'SUBMITTED');
    await this.assertReportOwner(id, user.sub, report.eventId);

    const updated = await this.prisma.eventReport.update({
      where: { id },
      data: { status: 'SUBMITTED', submittedAt: new Date() },
    });

    const manager = report.event.city.manager;
    const schoolName = report.event.school?.name || 'Невідома школа';
    const chatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);
    if (chatId) {
      this.telegramService
        .sendMessage(
          chatId,
          `🚨 Новий звіт потребує затвердження: ${schoolName}`,
        )
        .catch(() => {});
    }

    // Telegram OWNER + SUPERADMIN
    this.notificationsService
      .getAdminIds()
      .then((adminIds) => {
        this.notificationsService.sendTelegramToUsers(
          adminIds,
          'REPORT_SUBMITTED',
          {
            schoolName,
            eventDate: report.event.date,
            project: report.event.project,
          },
        );
      })
      .catch(() => {});

    const notifyUserId =
      report.event.responsibleId || report.event.city.managerId;
    if (notifyUserId) {
      this.notificationsService
        .create(notifyUserId, 'REPORT_SUBMITTED', {
          eventId: report.eventId,
          schoolName: report.event.school?.name,
          title: 'Звіт надіслано на затвердження',
        })
        .catch(() => {});
    }

    return updated;
  }

  async approve(id: string, dto: ApproveReportDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: {
        expenseItems: true,
        event: { include: { crew: true, school: true, city: true } },
      },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'APPROVED');

    if (user.role === 'MANAGER') {
      this.logger.warn(
        `approve cityCheck user=${user.sub} role=${user.role} cityId=${report.event.cityId} reportId=${id} schoolId=${report.event.schoolId}`,
      );
      await this.cityAccess.assertCityManager(user, report.event.cityId);
    }

    const pendingRecords = await this.prisma.salaryRecord.findMany({
      where: { reportId: id, status: 'PENDING' },
      select: { id: true },
    });
    const pendingIds = pendingRecords.map((r) => r.id).sort();
    const submittedIds = (dto.salaries ?? []).map((s) => s.id).sort();
    const mismatch =
      pendingIds.length !== submittedIds.length ||
      pendingIds.some((pid, i) => pid !== submittedIds[i]);
    if (mismatch) {
      throw new BadRequestException('report.salariesMismatch');
    }

    // Validate total salaries do not exceed available remainder
    const totalExpenses = report.expenseItems.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0,
    );
    const totalSalaries = (dto.salaries ?? []).reduce(
      (sum, s) => sum + Number(s.amount || 0),
      0,
    );
    const availableRemainder =
      Number(report.totalSum) - Number(report.schoolSum) - totalExpenses;
    if (totalSalaries > availableRemainder) {
      throw new BadRequestException('report.salariesExceedRemainder');
    }

    // Final remainderSum after salary deductions
    const newRemainderSum = availableRemainder - totalSalaries;

    const approved = await this.prisma.$transaction(async (tx) => {
      const current = await tx.eventReport.findUnique({
        where: { id },
        select: { status: true },
      });
      this.assertTransition(current!.status, 'APPROVED');

      for (const item of dto.salaries ?? []) {
        await tx.salaryRecord.update({
          where: { id: item.id },
          data: { amount: new Prisma.Decimal(item.amount) },
        });
      }

      const updated = await tx.eventReport.update({
        where: { id },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
          approvedBy: user.sub,
          remainderSum: new Prisma.Decimal(newRemainderSum),
        },
      });
      await tx.event.update({
        where: { id: report.eventId },
        data: { status: 'RE_SALE' },
      });
      return updated;
    });

    this.cacheVersion.bumpVersion('finance').catch(() => {});
    this.cacheVersion.bumpVersion('dashboard').catch(() => {});

    const notifyUserId =
      report.event.responsibleId || report.event.city.managerId;
    if (notifyUserId) {
      this.notificationsService
        .create(notifyUserId, 'REPORT_APPROVED', {
          eventId: report.eventId,
          schoolName: report.event.school?.name,
          title: 'Звіт підтверджено',
        })
        .catch(() => {});
    }

    const crewIds = [
      report.event.crew?.hostId,
      report.event.crew?.driverId,
    ].filter(Boolean) as string[];
    for (const crewId of crewIds) {
      this.notificationsService
        .create(crewId, 'REPORT_APPROVED', {
          eventId: report.eventId,
          schoolName: report.event.school?.name,
          title: 'Звіт затверджено — очікуйте виплату',
        })
        .catch(() => {});
      this.sendCrewTelegram(crewId, report.event.school?.name ?? 'Подія');
    }

    // Telegram міському менеджеру
    const cityManagerId = report.event.city.managerId;
    if (cityManagerId) {
      this.notificationsService
        .sendTelegramNotification(cityManagerId, 'REPORT_APPROVED', {
          schoolName: report.event.school?.name,
          eventDate: report.event.date,
        })
        .catch(() => {});
    }

    return approved;
  }

  async requestRevision(id: string, dto: RevisionDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: {
        event: {
          include: {
            crew: true,
            school: { select: { name: true } },
            city: { select: { managerId: true } },
          },
        },
      },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'NEEDS_REVISION');

    const result = await this.prisma.$transaction([
      this.prisma.eventReport.update({
        where: { id },
        data: { status: 'NEEDS_REVISION', revisionComment: dto.comment },
      }),
      this.prisma.salaryRecord.updateMany({
        where: { reportId: id, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      }),
    ]);

    // Telegram crew + менеджеру
    this.notifyRevisionOrReject(report, dto.comment, 'REPORT_REVISION');

    return result;
  }

  async reject(id: string, dto: RevisionDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: {
        event: {
          include: {
            crew: true,
            school: { select: { name: true } },
            city: { select: { managerId: true } },
          },
        },
      },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'REJECTED');

    const result = await this.prisma.$transaction([
      this.prisma.eventReport.update({
        where: { id },
        data: { status: 'REJECTED', revisionComment: dto.comment },
      }),
      this.prisma.salaryRecord.updateMany({
        where: { reportId: id, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      }),
    ]);

    // Telegram crew + менеджеру
    this.notifyRevisionOrReject(report, dto.comment, 'REPORT_REVISION');

    return result;
  }

  private notifyRevisionOrReject(
    report: {
      event: {
        crew: { hostId: string | null; driverId: string | null } | null;
        school: { name: string } | null;
        city: { managerId: string | null };
      };
    },
    reason: string | null,
    type: 'REPORT_REVISION',
  ) {
    const schoolName = report.event.school?.name || 'Невідома школа';
    const payload = { schoolName, reason };

    const crewIds = [
      report.event.crew?.hostId,
      report.event.crew?.driverId,
    ].filter(Boolean) as string[];
    if (crewIds.length > 0) {
      this.notificationsService.sendTelegramToUsers(crewIds, type, payload);
    }

    const managerId = report.event.city.managerId;
    if (managerId) {
      this.notificationsService.sendTelegramNotification(
        managerId,
        type,
        payload,
      );
    }
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventReport.findUnique({
      where: { eventId },
      include: {
        expenseItems: true,
        salaryRecords: {
          include: { employee: { select: { id: true, name: true } } },
        },
        inventoryUsages: true,
        photos: true,
      },
    });
  }

  async findSubmitted(page = 1, take = 20) {
    const skip = (page - 1) * take;
      const [items, total] = await Promise.all([
      this.prisma.eventReport.findMany({
        where: { status: 'SUBMITTED' },
        include: {
          expenseItems: true,
          salaryRecords: {
            include: { employee: { select: { id: true, name: true } } },
          },
          inventoryUsages: true,
          event: {
            include: {
              school: {
                select: { name: true, type: true, phone: true, director: true },
              },
              city: { select: { id: true, name: true } },
              crew: {
                include: {
                  host: { select: { id: true, name: true } },
                  driver: { select: { id: true, name: true } },
                },
              },
            },
          },
        },
        orderBy: { submittedAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.eventReport.count({ where: { status: 'SUBMITTED' } }),
    ]);
    return { items, total, page, pageCount: Math.ceil(total / take) };
  }
}
