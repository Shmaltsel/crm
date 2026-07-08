import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RevisionDto } from './dto/revision.dto';
import { ReportStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';

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
  constructor(private readonly prisma: PrismaService) {}

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
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'SUBMITTED');
    await this.assertReportOwner(id, user.sub, report.eventId);

    return this.prisma.eventReport.update({
      where: { id },
      data: { status: 'SUBMITTED', submittedAt: new Date() },
    });
  }

  async approve(id: string, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'APPROVED');

    return this.prisma.eventReport.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
        approvedBy: user.sub,
      },
    });
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
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'NEEDS_REVISION');

    return this.prisma.eventReport.update({
      where: { id },
      data: { status: 'NEEDS_REVISION', revisionComment: dto.comment },
    });
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
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'REJECTED');

    return this.prisma.eventReport.update({
      where: { id },
      data: { status: 'REJECTED', revisionComment: dto.comment },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventReport.findUnique({
      where: { eventId },
      include: {
        expenseItems: true,
        salaryItems: true,
        photos: true,
      },
    });
  }

  async findSubmitted() {
    return this.prisma.eventReport.findMany({
      where: { status: 'SUBMITTED' },
      include: {
        expenseItems: true,
        salaryItems: true,
        event: {
          include: {
            school: { select: { name: true, type: true } },
            city: { select: { name: true } },
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
    });
  }
}
