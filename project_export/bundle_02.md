# FILE: apps/backend/src/projects/dto/update-project.dto.ts

```
import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

```

# FILE: apps/backend/src/projects/projects.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString } from 'class-validator';

class ProjectStatsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;
}

@ApiTags('Projects')
@ApiCookieAuth('access_token')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Список проєктів (типів шоу)' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Отримати проєкт за ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @ApiOperation({ summary: 'Статистика проєкту' })
  @Get(':id/stats')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getStats(
    @Param('id') id: string,
    @Query() query: ProjectStatsQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    let effectiveCityId: string | undefined = query.cityId;
    if (user.role === 'MANAGER') {
      const me = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { cityId: true },
      });
      effectiveCityId = me?.cityId ?? undefined;
    }
    return this.projectsService.getStats(id, effectiveCityId);
  }

  @ApiOperation({ summary: 'Створити проєкт' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @ApiOperation({ summary: 'Оновити проєкт' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити проєкт' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

```

# FILE: apps/backend/src/projects/projects.module.ts

```
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}

```

# FILE: apps/backend/src/projects/projects.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  }

  create(data: { name: string; color?: string; pricePerChild?: number }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        color: data.color ?? '#3b82f6',
        pricePerChild: data.pricePerChild ?? 0,
      },
    });
  }

  update(
    id: string,
    data: { name?: string; color?: string; pricePerChild?: number },
  ) {
    return this.prisma.project.update({ where: { id }, data });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }

  async getStats(projectId: string, cityId?: string) {
    const where: Record<string, unknown> = { project: projectId };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      include: {
        report: {
          select: {
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
          },
        },
      },
    });

    const totalEvents = events.length;
    const completedEvents = events.filter(
      (e) => e.status === 'REPORT' || e.status === 'DONE',
    ).length;
    const totalRevenue = events.reduce(
      (sum, e) => sum + Number(e.report?.totalSum ?? 0),
      0,
    );
    const totalProfit = events.reduce(
      (sum, e) => sum + Number(e.report?.remainderSum ?? 0),
      0,
    );
    const totalSchoolSum = events.reduce(
      (sum, e) => sum + Number(e.report?.schoolSum ?? 0),
      0,
    );
    const rated = events.filter((e) => e.report?.rating);
    const avgRating = rated.length
      ? rated.reduce((sum, e) => sum + Number(e.report!.rating!), 0) /
        rated.length
      : 0;

    return {
      totalEvents,
      completedEvents,
      totalRevenue,
      totalProfit,
      totalSchoolSum,
      avgRating: Math.round(avgRating * 10) / 10,
    };
  }
}

```

# FILE: apps/backend/src/reports/dto/create-report.dto.ts

```
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExpenseItemDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}

class SalaryRecordDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsString()
  role?: string;
}

export class CreateReportDto {
  @IsString()
  eventId: string;

  @IsOptional()
  @IsBoolean()
  announcementDone?: boolean;

  @IsOptional()
  @IsBoolean()
  materialShown?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  classesCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  privilegedCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  showingsCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSum?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  schoolSum?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  remainderSum?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  directorSatisfied?: boolean;

  @IsOptional()
  @IsBoolean()
  teachersSatisfied?: boolean;

  @IsOptional()
  @IsBoolean()
  hadIssues?: boolean;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseItemDto)
  expenses?: ExpenseItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryRecordDto)
  salaries?: SalaryRecordDto[];
}

```

# FILE: apps/backend/src/reports/dto/revision.dto.ts

```
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevisionDto {
  @ApiProperty({
    description: 'Коментар при поверненні на доопрацювання або відхиленні',
  })
  @IsString()
  @MinLength(1)
  comment: string;
}

```

# FILE: apps/backend/src/reports/dto/update-report.dto.ts

```
import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}

```

# FILE: apps/backend/src/reports/reports.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RevisionDto } from './dto/revision.dto';

@ApiTags('Reports')
@ApiCookieAuth('access_token')
@Controller('reports')
@UseGuards(AuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Створити чернетку звіту (Draft)' })
  @Post()
  create(@Body() dto: CreateReportDto, @CurrentUser() user: JwtUser) {
    return this.reportsService.create(dto, user);
  }

  @ApiOperation({
    summary: 'Оновити поля звіту (лише DRAFT або NEEDS_REVISION)',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReportDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.reportsService.update(id, dto, user);
  }

  @ApiOperation({ summary: 'Подати звіт (DRAFT/NEEDS_REVISION → SUBMITTED)' })
  @Post(':id/submit')
  submit(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.reportsService.submit(id, user);
  }

  @ApiOperation({
    summary:
      'Затвердити звіт (SUBMITTED → APPROVED, лише MANAGER/SUPERADMIN/OWNER)',
  })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Post(':id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.reportsService.approve(id, user);
  }

  @ApiOperation({
    summary: 'Повернути звіт на доопрацювання (SUBMITTED → NEEDS_REVISION)',
  })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Post(':id/request-revision')
  requestRevision(
    @Param('id') id: string,
    @Body() dto: RevisionDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.reportsService.requestRevision(id, dto, user);
  }

  @ApiOperation({ summary: 'Відхилити звіт (SUBMITTED → REJECTED)' })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Post(':id/reject')
  reject(
    @Param('id') id: string,
    @Body() dto: RevisionDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.reportsService.reject(id, dto, user);
  }

  @ApiOperation({ summary: 'Отримати звіт за подією' })
  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.reportsService.findByEvent(eventId);
  }

  @ApiOperation({ summary: 'Список поданих звітів (для MANAGER)' })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Get('submitted')
  findSubmitted() {
    return this.reportsService.findSubmitted();
  }
}

```

# FILE: apps/backend/src/reports/reports.module.ts

```
import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

```

# FILE: apps/backend/src/reports/reports.service.ts

```
import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { NotificationsService } from '../notifications/notifications.service';
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
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

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
      include: { event: { include: { crew: true, school: true, city: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'APPROVED');

    const [approved] = await this.prisma.$transaction([
      this.prisma.eventReport.update({
        where: { id },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
          approvedBy: user.sub,
        },
      }),
      this.prisma.event.update({
        where: { id: report.eventId },
        data: { status: 'RE_SALE' },
      }),
    ]);

    const notifyUserId = report.event.responsibleId || report.event.city.managerId;
    if (notifyUserId) {
      this.notificationsService
        .create(notifyUserId, 'REPORT_APPROVED', {
          eventId: report.eventId,
          schoolName: report.event.school?.name,
          title: 'Звіт підтверджено',
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
        salaryRecords: true,
        photos: true,
      },
    });
  }

  async findSubmitted() {
    return this.prisma.eventReport.findMany({
      where: { status: 'SUBMITTED' },
      include: {
        expenseItems: true,
        salaryRecords: true,
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

```

# FILE: apps/backend/src/salary/dto/create-salary.dto.ts

```
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  Min,
  Max,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaryItemDto {
  @ApiProperty({ description: 'ID працівника' })
  @IsString()
  employeeId: string;

  @ApiProperty({ description: 'Сума нарахування' })
  @IsNumber()
  @Min(1)
  @Max(99999)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ description: 'Коментар', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateSalaryDto {
  @ApiProperty({ description: 'ID звіту (Approved)' })
  @IsString()
  reportId: string;

  @ApiProperty({ type: [CreateSalaryItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalaryItemDto)
  items: CreateSalaryItemDto[];
}

```

# FILE: apps/backend/src/salary/dto/mark-paid.dto.ts

```
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkPaidDto {
  @ApiProperty({ description: 'Коментар при виплаті', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}

```

# FILE: apps/backend/src/salary/salary.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@ApiTags('salary')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Створити записи нарахувань за звітом' })
  create(@Body() dto: CreateSalaryDto, @CurrentUser() user: JwtUser) {
    return this.salaryService.create(dto, user);
  }

  @Get('mine')
  @ApiOperation({ summary: 'Мої нарахування' })
  findMine(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    return this.salaryService.findMine(user, cityId);
  }

  @Get()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Всі нарахування (менеджер/адмін)' })
  findAll(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    return this.salaryService.findAll(user, cityId);
  }

  @Patch(':id/mark-paid')
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Позначити нарахування як виплачене' })
  markPaid(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.salaryService.markPaid(id, user);
  }
}

```

# FILE: apps/backend/src/salary/salary.module.ts

```
import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SalaryController],
  providers: [SalaryService],
  exports: [SalaryService],
})
export class SalaryModule {}

```

# FILE: apps/backend/src/salary/salary.service.ts

```
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) {}

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
    if (report.status !== 'APPROVED')
      throw new BadRequestException('salary.reportNotApproved');

    if (user.role === 'MANAGER') {
      const cityIds = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { managedCities: { select: { id: true } } },
      });
      const managedIds = cityIds?.managedCities.map((c) => c.id) ?? [];
      if (!managedIds.includes(report.event.cityId)) {
        throw new ForbiddenException('salary.notCityManager');
      }
    }

    const hasLargeAmounts = dto.items.some((item) => item.amount >= 100000);
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
      const cityIds = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { managedCities: { select: { id: true } } },
      });
      const managedIds = cityIds?.managedCities.map((c) => c.id) ?? [];
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
      include: { event: { select: { cityId: true } } },
    });
    if (!record) throw new NotFoundException('salary.notFound');
    if (record.status !== 'PENDING')
      throw new BadRequestException('salary.notPending');

    if (user.role === 'MANAGER') {
      const cityIds = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { managedCities: { select: { id: true } } },
      });
      const managedIds = cityIds?.managedCities.map((c) => c.id) ?? [];
      if (!managedIds.includes(record.event?.cityId ?? '')) {
        throw new ForbiddenException('salary.notCityManager');
      }
    }

    return this.prisma.salaryRecord.update({
      where: { id },
      data: { status: 'PAID', paidAt: new Date(), paidBy: user.sub },
    });
  }
}

```

# FILE: apps/backend/src/school-comments/school-comments.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SchoolCommentsService } from './school-comments.service';
import type { CommentType } from '@prisma/client';

@ApiTags('school-comments')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('schools/:schoolId/comments')
export class SchoolCommentsController {
  constructor(private readonly service: SchoolCommentsService) {}

  @Post()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Додати коментар до школи' })
  create(
    @Param('schoolId') schoolId: string,
    @Body() body: { type: CommentType; text: string },
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.create(schoolId, body.type, body.text, user);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати коментарі школи' })
  findAll(
    @Param('schoolId') schoolId: string,
    @Query('type') type?: CommentType,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    return this.service.findAll(schoolId, type, page ?? 1, take ?? 20);
  }

  @Delete(':id')
  @Roles('SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Мʼяко видалити коментар' })
  softDelete(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.service.softDelete(id, user);
  }
}

```

# FILE: apps/backend/src/school-comments/school-comments.module.ts

```
import { Module } from '@nestjs/common';
import { SchoolCommentsController } from './school-comments.controller';
import { SchoolCommentsService } from './school-comments.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchoolCommentsController],
  providers: [SchoolCommentsService],
  exports: [SchoolCommentsService],
})
export class SchoolCommentsModule {}

```

# FILE: apps/backend/src/school-comments/school-comments.service.ts

```
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import type { CommentType } from '@prisma/client';

@Injectable()
export class SchoolCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    schoolId: string,
    type: CommentType,
    text: string,
    user: JwtUser,
  ) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException('school.notFound');

    return this.prisma.schoolComment.create({
      data: { schoolId, authorId: user.sub, type, text },
      include: { author: { select: { id: true, name: true, role: true } } },
    });
  }

  async findAll(schoolId: string, type?: CommentType, page = 1, take = 20) {
    const where: Record<string, unknown> = { schoolId, deletedAt: null };
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.schoolComment.findMany({
        where,
        include: { author: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.schoolComment.count({ where }),
    ]);

    return { items, total, page, take, pageCount: Math.ceil(total / take) };
  }

  async softDelete(id: string, user: JwtUser) {
    if (user.role !== 'SUPERADMIN' && user.role !== 'OWNER') {
      throw new ForbiddenException('comments.notAllowed');
    }
    const comment = await this.prisma.schoolComment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('comment.notFound');

    return this.prisma.schoolComment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

```

# FILE: apps/backend/src/schools/dto/bulk-import.dto.ts

```
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BulkImportDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'Школа', enum: ['Школа', 'Садочок'] })
  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

# FILE: apps/backend/src/schools/dto/create-school.dto.ts

```
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Ліцей №5' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'school', enum: ['school', 'kindergarten'] })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'https://example.com/school-page' })
  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @ApiPropertyOptional({ example: 'Іваненко Іван Іванович' })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({ example: '+380501234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}

```

# FILE: apps/backend/src/schools/dto/find-contacts-query.dto.ts

```
import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindContactsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  q?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

```

# FILE: apps/backend/src/schools/dto/find-schools-query.dto.ts

```
import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class FindSchoolsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  q?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

# FILE: apps/backend/src/schools/dto/school-query.dto.ts

```
import { IsOptional, IsIn, IsString } from 'class-validator';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class SchoolQueryDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';

  @IsOptional()
  @IsIn(['new', 'planned', 'inProgress', 'done'])
  stage?: 'new' | 'planned' | 'inProgress' | 'done';

  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  size?: 'small' | 'medium' | 'large';
}

```

# FILE: apps/backend/src/schools/dto/update-school.dto.ts

```
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEmail,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateSchoolDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  childrenCount?: number;

  @IsOptional()
  @IsBoolean()
  isHotClient?: boolean;
}

```

# FILE: apps/backend/src/schools/parser.service.spec.ts

```
import { ParserService } from './parser.service';
import axios from 'axios';
import * as cheerio from 'cheerio';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Хелпер: генерує HTML-таблицю зі списком шкіл
const buildTableHtml = (rows: { name: string; href: string }[]): string => {
  const trs = rows
    .map((r) => `<tr><td>1</td><td><a href="${r.href}">${r.name}</a></td></tr>`)
    .join('');
  return `<table class="zebra-stripe list">${trs}</table>`;
};

// Хелпер: генерує HTML-профіль школи
const buildProfileHtml = (fields: Record<string, string>): string => {
  const rows = Object.entries(fields)
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join('');
  return `<table>${rows}</table>`;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ParserService — parseSchoolData', () => {
  it('повертає address, director, childrenCount за прямим URL', async () => {
    const profileHtml = buildProfileHtml({
      'Поштова адреса': 'вул. Шевченка 1',
      Директор: 'Іваненко Іван',
      'Кількість учнів': '1023',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Школа №1',
      'https://lv.isuo.org/schools/123',
    );

    expect(result).toEqual({
      address: 'вул. Шевченка 1',
      director: 'Іваненко Іван',
      childrenCount: 1023,
    });
  });

  it('розпізнає альтернативні лейбли (Завідувач, Кількість дітей)', async () => {
    const profileHtml = buildProfileHtml({
      Адреса: 'вул. Лесі 10',
      Завідувач: 'Петренко Оксана',
      'Кількість дітей': '456 дітей',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Садочок №2',
      'https://lv.isuo.org/k/1',
    );

    expect(result?.director).toBe('Петренко Оксана');
    expect(result?.childrenCount).toBe(456);
  });

  it('повертає 0 для childrenCount якщо число не розпізнано', async () => {
    const profileHtml = buildProfileHtml({
      Директор: 'Без дітей',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Тест',
      'https://lv.isuo.org/x/1',
    );

    expect(result?.childrenCount).toBe(0);
  });

  it('повертає null при мережевій помилці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Школа',
      'https://lv.isuo.org/x/1',
    );

    expect(result).toBeNull();
  });

  it('шукає школу у списку якщо URL не вказано', async () => {
    const listHtml = buildTableHtml([
      { name: 'Загальноосвітня школа №42', href: '/schools/42' },
    ]);
    const profileHtml = buildProfileHtml({ Директор: 'Тест' });

    mockedAxios.get
      .mockResolvedValueOnce({ data: listHtml }) // список
      .mockResolvedValueOnce({ data: profileHtml }); // профіль

    const service = new ParserService();
    const result = await service.parseSchoolData('школа №42');

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(result?.director).toBe('Тест');
  });

  it('повертає null якщо школу не знайдено у списку', async () => {
    const listHtml = buildTableHtml([
      { name: 'Інша школа', href: '/schools/99' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: listHtml })
      .mockResolvedValueOnce({ data: listHtml }); // page 2

    const service = new ParserService();
    const result = await service.parseSchoolData('Неіснуюча школа');

    expect(result).toBeNull();
  });
});

describe('ParserService — searchSchools', () => {
  it('повертає список шкіл що відповідають запиту', async () => {
    const html = buildTableHtml([
      { name: 'Гімназія №3', href: '/schools/3' },
      { name: 'Ліцей №10', href: '/schools/10' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: html }); // page 2

    const service = new ParserService();
    const results = await service.searchSchools('гімназія');

    expect(results).toHaveLength(2); // до 10, cheerio знаходить обидва по "гімназія"
  });

  it('числовий запит — шукає за номером школи точно (regex з word boundary)', async () => {
    const html = buildTableHtml([
      { name: 'Школа №5', href: '/schools/5' },
      { name: 'Школа №15', href: '/schools/15' },
      { name: 'Школа №50', href: '/schools/50' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: '<table></table>' });

    const service = new ParserService();
    const results = await service.searchSchools('5');

    // Має знайти тільки "Школа №5", не "15" чи "50"
    const names = results.map((r) => r.name);
    expect(names).toContain('Школа №5');
    expect(names).not.toContain('Школа №15');
    expect(names).not.toContain('Школа №50');
  });

  it('повертає не більше 10 результатів', async () => {
    const manyRows = Array.from({ length: 20 }, (_, i) => ({
      name: `Тестова школа №${i + 1}`,
      href: `/schools/${i + 1}`,
    }));
    const html = buildTableHtml(manyRows);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: '<table></table>' });

    const service = new ParserService();
    const results = await service.searchSchools('тестова');

    expect(results.length).toBeLessThanOrEqual(10);
  });

  it('повертає порожній масив при мережевій помилці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const service = new ParserService();
    const results = await service.searchSchools('щось');

    expect(results).toEqual([]);
  });

  it('для type="Садочок" — використовує URL дошкільних закладів', async () => {
    mockedAxios.get.mockResolvedValue({ data: '<table></table>' });

    const service = new ParserService();
    await service.searchSchools('садок', 'Садочок');

    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toContain('preschools');
  });
});

describe('ParserService — getAllSchoolsForCity', () => {
  it('повертає заклади для підтримуваного міста', async () => {
    const page1 = buildTableHtml([
      { name: 'Школа №1', href: '/schools/1' },
      { name: 'Школа №2', href: '/schools/2' },
    ]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Львів', 'Школа');

    expect(results).toHaveLength(2);
    expect(results[0].name).toBe('Школа №1');
    expect(results[0].url).toContain('lv.isuo.org');
  });

  it('повертає порожній масив для непідтримуваного міста', async () => {
    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Атлантида');

    expect(results).toEqual([]);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('зупиняється якщо сторінка не містить результатів', async () => {
    const page1 = buildTableHtml([{ name: 'Школа №1', href: '/schools/1' }]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Київ');

    expect(results).toHaveLength(1);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('дедуплікує однакові заклади (за нормалізованою назвою)', async () => {
    const html = buildTableHtml([
      { name: 'Школа  №1', href: '/schools/1' },
      { name: 'Школа №1', href: '/schools/1b' },
    ]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Харків');

    expect(results).toHaveLength(1);
  });

  it('зупиняється при мережевій помилці на конкретній сторінці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('timeout'));

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Одеса');

    expect(results).toEqual([]);
  });

  it('для type="Садочок" — використовує URL kindergartens', async () => {
    mockedAxios.get.mockResolvedValue({
      data: '<table class="zebra-stripe list"></table>',
    });

    const service = new ParserService();
    await service.getAllSchoolsForCity('Тернопіль', 'Садочок');

    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toContain('preschools');
  });
});

describe('ParserService — getSupportedCities', () => {
  it('повертає масив підтримуваних міст', () => {
    const service = new ParserService();
    const cities = service.getSupportedCities();

    expect(cities).toBeInstanceOf(Array);
    expect(cities.length).toBeGreaterThan(0);
    expect(cities).toContain('Львів');
    expect(cities).toContain('Київ');
  });
});

```

# FILE: apps/backend/src/schools/parser.service.ts

```
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const CITY_CONFIG: Record<
  string,
  { schools: string; kindergartens: string; domain: string }
> = {
  Львів: {
    domain: 'https://lv.isuo.org',
    schools: 'https://lv.isuo.org/authorities/schools-list/id/681',
    kindergartens: 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
  },
  'Івано-Франківськ': {
    domain: 'https://if.isuo.org',
    schools: 'https://if.isuo.org/koatuu/schools-list/id/2610100000',
    kindergartens: 'https://if.isuo.org/koatuu/preschools-list/id/2610100000',
  },
  Чернівці: {
    domain: 'https://cv.isuo.org',
    schools: 'https://cv.isuo.org/koatuu/schools-list/id/7310100000',
    kindergartens: 'https://cv.isuo.org/koatuu/preschools-list/id/7310100000',
  },
  Тернопіль: {
    domain: 'https://te.isuo.org',
    schools: 'https://te.isuo.org/koatuu/schools-list/id/6110100000',
    kindergartens: 'https://te.isuo.org/koatuu/preschools-list/id/6110100000',
  },
  Ужгород: {
    domain: 'https://zk.isuo.org',
    schools: 'https://zk.isuo.org/koatuu/schools-list/id/2110100000',
    kindergartens: 'https://zk.isuo.org/koatuu/preschools-list/id/2110100000',
  },
  Київ: {
    domain: 'https://kv.isuo.org',
    schools: 'https://kv.isuo.org/koatuu/schools-list/id/8000000000',
    kindergartens: 'https://kv.isuo.org/koatuu/preschools-list/id/8000000000',
  },
  Харків: {
    domain: 'https://kh.isuo.org',
    schools: 'https://kh.isuo.org/koatuu/schools-list/id/6310100000',
    kindergartens: 'https://kh.isuo.org/koatuu/preschools-list/id/6310100000',
  },
  Одеса: {
    domain: 'https://od.isuo.org',
    schools: 'https://od.isuo.org/koatuu/schools-list/id/5110100000',
    kindergartens: 'https://od.isuo.org/koatuu/preschools-list/id/5110100000',
  },
  Дніпро: {
    domain: 'https://dp.isuo.org',
    schools: 'https://dp.isuo.org/koatuu/schools-list/id/1210100000',
    kindergartens: 'https://dp.isuo.org/koatuu/preschools-list/id/1210100000',
  },
  Запоріжжя: {
    domain: 'https://zp.isuo.org',
    schools: 'https://zp.isuo.org/koatuu/schools-list/id/2310100000',
    kindergartens: 'https://zp.isuo.org/koatuu/preschools-list/id/2310100000',
  },
  Миколаїв: {
    domain: 'https://mk.isuo.org',
    schools: 'https://mk.isuo.org/koatuu/schools-list/id/4810100000',
    kindergartens: 'https://mk.isuo.org/koatuu/preschools-list/id/4810100000',
  },
  Вінниця: {
    domain: 'https://vn.isuo.org',
    schools: 'https://vn.isuo.org/koatuu/schools-list/id/0510100000',
    kindergartens: 'https://vn.isuo.org/koatuu/preschools-list/id/0510100000',
  },
  Херсон: {
    domain: 'https://ks.isuo.org',
    schools: 'https://ks.isuo.org/koatuu/schools-list/id/6510100000',
    kindergartens: 'https://ks.isuo.org/koatuu/preschools-list/id/6510100000',
  },
  Полтава: {
    domain: 'https://pl.isuo.org',
    schools: 'https://pl.isuo.org/koatuu/schools-list/id/5310100000',
    kindergartens: 'https://pl.isuo.org/koatuu/preschools-list/id/5310100000',
  },
  Чернігів: {
    domain: 'https://cg.isuo.org',
    schools: 'https://cg.isuo.org/koatuu/schools-list/id/7410100000',
    kindergartens: 'https://cg.isuo.org/koatuu/preschools-list/id/7410100000',
  },
  Черкаси: {
    domain: 'https://ck.isuo.org',
    schools: 'https://ck.isuo.org/koatuu/schools-list/id/7110100000',
    kindergartens: 'https://ck.isuo.org/koatuu/preschools-list/id/7110100000',
  },
  Суми: {
    domain: 'https://su.isuo.org',
    schools: 'https://su.isuo.org/koatuu/schools-list/id/5910100000',
    kindergartens: 'https://su.isuo.org/koatuu/preschools-list/id/5910100000',
  },
  Житомир: {
    domain: 'https://zt.isuo.org',
    schools: 'https://zt.isuo.org/koatuu/schools-list/id/1810100000',
    kindergartens: 'https://zt.isuo.org/koatuu/preschools-list/id/1810100000',
  },
  Хмельницький: {
    domain: 'https://km.isuo.org',
    schools: 'https://km.isuo.org/koatuu/schools-list/id/6810100000',
    kindergartens: 'https://km.isuo.org/koatuu/preschools-list/id/6810100000',
  },
  Рівне: {
    domain: 'https://rv.isuo.org',
    schools: 'https://rv.isuo.org/koatuu/schools-list/id/5610100000',
    kindergartens: 'https://rv.isuo.org/koatuu/preschools-list/id/5610100000',
  },
  Кропивницький: {
    domain: 'https://kr.isuo.org',
    schools: 'https://kr.isuo.org/koatuu/schools-list/id/3510100000',
    kindergartens: 'https://kr.isuo.org/koatuu/preschools-list/id/3510100000',
  },
  Луцьк: {
    domain: 'https://vl.isuo.org',
    schools: 'https://vl.isuo.org/koatuu/schools-list/id/0710100000',
    kindergartens: 'https://vl.isuo.org/koatuu/preschools-list/id/0710100000',
  },
};

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
    try {
      let url = schoolUrl;
      if (!url) {
        const urls =
          type === 'Садочок'
            ? [
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
              ]
            : [
                'https://lv.isuo.org/authorities/schools-list/id/681',
                'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
              ];
        const normalizedSearch = schoolName
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
        for (const searchUrl of urls) {
          const listResponse = await axios.get(searchUrl);
          const $list = cheerio.load(listResponse.data);
          $list('table.zebra-stripe.list tr').each((_, row) => {
            const name = $list(row)
              .find('td:nth-child(2) a')
              .text()
              .replace(/\s+/g, ' ')
              .trim()
              .toLowerCase();
            if (name.includes(normalizedSearch)) {
              const href = $list(row).find('td:nth-child(2) a').attr('href');
              if (href) {
                url = `https://lv.isuo.org${href}`;
                return false;
              }
            }
          });
          if (url) break;
        }
      }
      if (!url) {
        console.log(`Заклад не знайдено: ${schoolName}`);
        return null;
      }
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const getField = (labels: string[]): string => {
        let result = '';
        for (const label of labels) {
          const th = $('th')
            .filter((_, el) => $(el).text().trim().includes(label))
            .first();
          if (th.length) {
            result = th.next('td').text().trim();
            break;
          }
        }
        return result;
      };
      const address = getField(['Поштова адреса', 'Адреса']);
      const director = getField(['Директор', 'Завідувач', 'Керівник']);
      const studentsRaw = getField([
        'Кількість учнів',
        'Кількість дітей',
        'Кількість вихованців',
      ]);
      const childrenCount =
        parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;
      return { address, director, childrenCount };
    } catch (error) {
      console.error('Помилка парсингу закладу:', error);
      return null;
    }
  }

  async searchSchools(
    query: string,
    type?: string,
  ): Promise<{ name: string; url: string }[]> {
    try {
      const urls =
        type === 'Садочок'
          ? [
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
            ]
          : [
              'https://lv.isuo.org/authorities/schools-list/id/681',
              'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
            ];
      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      const isNumericQuery = /^\d+$/.test(normalizedQuery);
      const numericRegex = isNumericQuery
        ? new RegExp(`(?<!\\d)${normalizedQuery}(?!\\d)`)
        : null;
      for (const url of urls) {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        $('table.zebra-stripe.list tr').each((_, row) => {
          const rawName = $(row).find('td:nth-child(2) a').text();
          const name = rawName.replace(/\s+/g, ' ').trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');
          if (name && href) {
            const lowerName = name.toLowerCase();
            let matches = false;
            if (isNumericQuery && numericRegex) {
              matches = numericRegex.test(lowerName);
            } else {
              matches = lowerName.includes(normalizedQuery);
            }
            if (matches)
              results.push({ name, url: `https://lv.isuo.org${href}` });
          }
        });
      }
      return results.slice(0, 10);
    } catch (error) {
      console.error('Помилка пошуку закладів:', error);
      return [];
    }
  }

  async getAllSchoolsForCity(
    cityName: string,
    type: 'Школа' | 'Садочок' = 'Школа',
  ): Promise<{ name: string; url: string }[]> {
    const config = CITY_CONFIG[cityName];
    if (!config) {
      console.log(`Місто "${cityName}" не підтримується для імпорту`);
      return [];
    }

    const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
    const domain = config.domain;

    const resultsMap = new Map<string, { name: string; url: string }>();

    for (let page = 1; page <= 20; page++) {
      const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
      try {
        const response = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(response.data);
        let foundOnPage = 0;

        $('table.zebra-stripe.list tr').each((_, row) => {
          const name = $(row)
            .find('td:nth-child(2) a')
            .text()
            .replace(/\s+/g, ' ')
            .trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');

          if (name && href && name !== 'Fullname') {
            const normalizedKey = name.toLowerCase().replace(/\s+/g, '');

            if (!resultsMap.has(normalizedKey)) {
              resultsMap.set(normalizedKey, { name, url: `${domain}${href}` });
              foundOnPage++;
            }
          }
        });

        if (foundOnPage === 0) break;
      } catch {
        break;
      }
    }

    return Array.from(resultsMap.values());
  }
  getSupportedCities(): string[] {
    return Object.keys(CITY_CONFIG);
  }
}

```

# FILE: apps/backend/src/schools/school-contacts.seed.ts

```
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contacts = [
  {
    schoolNumber: '1',
    contactName: 'Надія Михайлівна',
    phone: '0975695519',
    role: 'Завуч',
  },
  {
    schoolNumber: '2',
    contactName: 'Наталя',
    phone: '0974064095',
    role: 'Завуч',
  },
  {
    schoolNumber: '5',
    contactName: 'Лариса',
    phone: '0673622534',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Віра Ярославівна',
    phone: '0674935124',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Леся',
    phone: '0673380894',
    role: 'Завуч',
  },
  {
    schoolNumber: '13',
    contactName: 'Марта Романівна',
    phone: '0675839806',
    role: 'Директор',
  },
  {
    schoolNumber: '15',
    contactName: 'Ірина Андріївна',
    phone: '0679062500',
    role: 'Завуч',
  },
  {
    schoolNumber: '17',
    contactName: 'Ельвіра',
    phone: '0678578514',
    role: 'Педорг',
  },
  {
    schoolNumber: '18',
    contactName: 'Роман',
    phone: '0972587179',
    role: 'Завуч',
  },
  {
    schoolNumber: '20',
    contactName: 'Наталя Іванівна',
    phone: '0506747111',
    role: 'Завуч',
  },
  {
    schoolNumber: '23',
    contactName: 'Микола Шостак',
    phone: '0632232178',
    role: 'Педорг',
  },
  {
    schoolNumber: '27',
    contactName: 'Романа Михайлівна',
    phone: '0973113778',
    role: 'Завуч',
  },
  {
    schoolNumber: '27',
    contactName: 'Наталя Куліш',
    phone: '0677552743',
    role: 'Завуч',
  },
  {
    schoolNumber: '28',
    contactName: 'Олена Олегівна',
    phone: '0679243130',
    role: 'Завуч',
  },
  {
    schoolNumber: '30',
    contactName: 'Світлана Михальвіна',
    phone: '0974436542',
    role: 'Завуч',
  },
  {
    schoolNumber: '30',
    contactName: 'Ольга Володимирівна',
    phone: '0679596199',
    role: 'Завуч',
  },
  {
    schoolNumber: '31',
    contactName: 'Христина Ярославівна',
    phone: '0983804403',
    role: 'Директор',
  },
  {
    schoolNumber: '31',
    contactName: 'Леся Оресівна',
    phone: '0673567679',
    role: 'Завуч',
  },
  {
    schoolNumber: '34',
    contactName: 'Мирон',
    phone: '0938668520',
    role: 'Педорг',
  },
  {
    schoolNumber: '36',
    contactName: 'Тетяна',
    phone: '0990407941',
    role: 'Завуч',
  },
  {
    schoolNumber: '40',
    contactName: 'Юлія',
    phone: '0976015839',
    role: 'Педорг',
  },
  {
    schoolNumber: '40',
    contactName: 'Ірина',
    phone: '0673021531',
    role: 'Педорг',
  },
  {
    schoolNumber: '44',
    contactName: 'Стефанович Людмила Олександрівна',
    phone: '0677838274',
    role: 'Директор',
  },
  {
    schoolNumber: '45',
    contactName: 'Наталія Аркадіївна',
    phone: '0677123961',
    role: 'Завуч',
  },
  {
    schoolNumber: '46',
    contactName: 'Ірина Іларіонівна',
    phone: '0676969337',
    role: 'Завуч',
  },
  {
    schoolNumber: '46',
    contactName: 'Юля',
    phone: '0961791595',
    role: 'Педорг',
  },
  {
    schoolNumber: '48',
    contactName: 'Роман Васильович',
    phone: '0982310957',
    role: 'Директор',
  },
  {
    schoolNumber: '49',
    contactName: 'Уляна',
    phone: '0681371457',
    role: 'Педорг',
  },
  {
    schoolNumber: '50',
    contactName: "Мар'яна Іванівна",
    phone: '0674901746',
    role: 'Завуч',
  },
  {
    schoolNumber: '51',
    contactName: 'Ірина Миколаївна',
    phone: '0972595956',
    role: 'Завуч',
  },
  {
    schoolNumber: '52',
    contactName: 'Світлана',
    phone: '0677070497',
    role: 'Директор',
  },
  {
    schoolNumber: '54',
    contactName: 'Любов Іванівна',
    phone: '0677715647',
    role: 'Завуч',
  },
  {
    schoolNumber: '60',
    contactName: 'Людмила',
    phone: '0973888255',
    role: 'Директор',
  },
  {
    schoolNumber: '63',
    contactName: 'Іванець Ольга Євгенівна',
    phone: '0977345920',
    role: 'Завуч',
  },
  {
    schoolNumber: '65',
    contactName: 'Марія',
    phone: '0975391164',
    role: 'Педорг',
  },
  {
    schoolNumber: '66',
    contactName: 'Мирослава',
    phone: '0977711381',
    role: 'Завуч',
  },
  {
    schoolNumber: '66',
    contactName: 'Назар Оксана',
    phone: '0679686514',
    role: 'Завуч',
  },
  {
    schoolNumber: '67',
    contactName: 'Оксана Володимирівна',
    phone: '0673705262',
    role: 'Завуч',
  },
  {
    schoolNumber: '68',
    contactName: 'Уляна',
    phone: '0973004954',
    role: 'Педорг',
  },
  {
    schoolNumber: '69',
    contactName: 'Тетяна Володимирівна',
    phone: '0673041659',
    role: 'Завуч',
  },
  {
    schoolNumber: '70',
    contactName: 'Марта',
    phone: '0676726984',
    role: 'Директор',
  },
  {
    schoolNumber: '70',
    contactName: 'Марія',
    phone: '0966063264',
    role: 'Завуч',
  },
  {
    schoolNumber: '71',
    contactName: 'Марія',
    phone: '0676644983',
    role: 'Педорг',
  },
  {
    schoolNumber: '71',
    contactName: 'Роман',
    phone: '0677514127',
    role: 'Директор',
  },
  {
    schoolNumber: '72',
    contactName: 'Олена Михайлівна',
    phone: '0677948577',
    role: 'Завуч',
  },
  {
    schoolNumber: '73',
    contactName: 'Світлана Богданівна',
    phone: '0971844043',
    role: 'Директор',
  },
  {
    schoolNumber: '73',
    contactName: 'Інна Євгенівна',
    phone: '0678829581',
    role: 'Завуч',
  },
  {
    schoolNumber: '80',
    contactName: 'Наталя',
    phone: '0967331419',
    role: 'Завуч',
  },
  {
    schoolNumber: '81',
    contactName: 'Галина Антонівна',
    phone: '0673662853',
    role: 'Завуч',
  },
  {
    schoolNumber: '81',
    contactName: 'Андріана',
    phone: '0502867516',
    role: 'Завуч',
  },
  {
    schoolNumber: '84',
    contactName: 'Тетяна Іванівна',
    phone: '0974437171',
    role: 'Завуч',
  },
  {
    schoolNumber: '86',
    contactName: 'Руслана Василівна',
    phone: '0964066413',
    role: 'Директор',
  },
  {
    schoolNumber: '86',
    contactName: 'Анна',
    phone: '0638694484',
    role: 'Педорг',
  },
  {
    schoolNumber: '90',
    contactName: 'Ірина Іванівна',
    phone: '0974392839',
    role: 'Завуч',
  },
  {
    schoolNumber: '90',
    contactName: 'Людмила',
    phone: '0676092693',
    role: 'Завуч',
  },
  {
    schoolNumber: '93',
    contactName: 'Ірина Петрівна',
    phone: '0966591509',
    role: 'Директор',
  },
  {
    schoolNumber: '95',
    contactName: 'Марія Орестівна',
    phone: '0979515318',
    role: 'Завуч',
  },
  {
    schoolNumber: '95',
    contactName: 'Ірина',
    phone: '0972392191',
    role: 'Педорг',
  },
  {
    schoolNumber: '96',
    contactName: 'Любов',
    phone: '0689529174',
    role: 'Педорг',
  },
  {
    schoolNumber: '97',
    contactName: 'Наталя Любомирівна',
    phone: '0961390913',
    role: 'Завуч',
  },
  {
    schoolNumber: '123',
    contactName: 'Марія Андріївна',
    phone: '0679334856',
    role: 'Директор',
  },

  {
    schoolNumber: 'Арніка',
    contactName: 'Світлана Михайлівна',
    phone: '0979325399',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Гроно',
    contactName: 'Оксана Теодорівна',
    phone: '0971147211',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Джерельце',
    contactName: 'Світлана Петрівна',
    phone: '0673140267',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Дивосвіт',
    contactName: 'Наталя Миколаївна',
    phone: '0932196651',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Європейський ліцей',
    contactName: 'Галина Богданівна',
    phone: '0974829920',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Лідер',
    contactName: 'Вадим',
    phone: '0687584626',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Лідер',
    contactName: 'Іванка',
    phone: '0965150436',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Львів',
    contactName: 'Мирослава Іванівна',
    phone: '0673536774',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Пулюя',
    contactName: 'Наталя',
    phone: '0671794604',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Стуса',
    contactName: 'Тетяна',
    phone: '0984989494',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Оріяна',
    contactName: 'Ірина Богданівна',
    phone: '0673702402',
    role: 'Директор',
  },
  {
    schoolNumber: 'Оріяна',
    contactName: 'Юрій',
    phone: '0974751935',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Первоцвіт',
    contactName: 'Христина Іванівна',
    phone: '0677573109',
    role: 'Директор',
  },
  {
    schoolNumber: 'Провесінь',
    contactName: 'Сергій',
    phone: '0506020447',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Провесінь',
    contactName: 'Анджела',
    phone: '0676606897',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Лідія Миколаївна',
    phone: '0679269319',
    role: 'Директор',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Ореста Шот',
    phone: '0677018705',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Ірина',
    phone: '0674398980',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Симоненка',
    contactName: 'Уляна',
    phone: '0969135903',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Сихівський ліцей',
    contactName: 'Надія',
    phone: '0964667179',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Початкова Школа Радості',
    contactName: 'Тетяна',
    phone: '0967320197',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Початкова Школа Радості',
    contactName: 'Наталя',
    phone: '0674244920',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Альфа',
    contactName: 'Ірина',
    phone: '0935122623',
    role: 'Завуч',
  },

  {
    schoolNumber: '52',
    contactName: 'Олена Віталіївна Добранюк',
    phone: '0964692943',
    role: 'Завідувачка',
  },
  {
    schoolNumber: 'Веселка',
    contactName: 'Андриц Людмила Федорівна',
    phone: '0632836453',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '149',
    contactName: 'Василина Тарасівна',
    phone: '0987615106',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '132',
    contactName: 'Наталя',
    phone: '0971620805',
    role: 'Методист',
  },
  {
    schoolNumber: 'Перші кроки',
    contactName: 'Мирослава Ярославівна',
    phone: '0963493423',
    role: 'Завідувач',
  },
  {
    schoolNumber: '130',
    contactName: 'Ольга',
    phone: '0638694484',
    role: 'Методистка',
  },
  {
    schoolNumber: '40',
    contactName: 'Світлана',
    phone: '0983365931',
    role: 'Заступник',
  },
  {
    schoolNumber: '144',
    contactName: 'Наталя',
    phone: '0677670485',
    role: 'Методист',
  },
  {
    schoolNumber: 'Барвінок',
    contactName: 'Наталя Витрикуш',
    phone: '0676809966',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '45',
    contactName: 'Наталя Шергіна',
    phone: '0675814381',
    role: 'Директор',
  },
  {
    schoolNumber: '67',
    contactName: 'Тетяна Юріївна',
    phone: '0966063398',
    role: 'Директор',
  },
  {
    schoolNumber: '118',
    contactName: 'Наталя Дмитрівна',
    phone: '0969847495',
    role: 'Директор',
  },
  {
    schoolNumber: '118',
    contactName: 'Оксана Ярославівна',
    phone: '0677881629',
    role: 'Методист',
  },
  {
    schoolNumber: '169',
    contactName: 'Галина Василівна',
    phone: '0962817175',
    role: null,
  },
  {
    schoolNumber: '175',
    contactName: 'Богдана',
    phone: '0687096641',
    role: 'Директор',
  },
  {
    schoolNumber: '170',
    contactName: 'Ірина',
    phone: '0986373627',
    role: null,
  },
  {
    schoolNumber: '167',
    contactName: 'Юлія',
    phone: '0687096641',
    role: 'Директор',
  },
  {
    schoolNumber: '42',
    contactName: 'Наталя Йосипівна',
    phone: '0677453052',
    role: null,
  },
  {
    schoolNumber: '33',
    contactName: 'Олександра Мирославівна',
    phone: '0505049049',
    role: null,
  },
  { schoolNumber: '134', contactName: 'Леся', phone: '0969740462', role: null },
  {
    schoolNumber: '165',
    contactName: 'Марта Андріївна',
    phone: '0639377896',
    role: null,
  },
  {
    schoolNumber: '159',
    contactName: 'Ірина Олександрівна',
    phone: '0972430286',
    role: null,
  },
  {
    schoolNumber: '163',
    contactName: 'Оксана Ярославівна Сновидович',
    phone: '0963943974',
    role: null,
  },
  {
    schoolNumber: '153',
    contactName: 'Юля',
    phone: '0939907888',
    role: 'Методист',
  },
  {
    schoolNumber: '39',
    contactName: 'Оксана Антонівна',
    phone: '0676820705',
    role: null,
  },
  {
    schoolNumber: '73',
    contactName: 'Ярослава',
    phone: '0679767575',
    role: null,
  },
  {
    schoolNumber: '134',
    contactName: 'Ольга',
    phone: '0679495251',
    role: 'Заступник',
  },
  {
    schoolNumber: '69',
    contactName: 'Уляна',
    phone: '0673392742',
    role: 'Директор',
  },
  {
    schoolNumber: '130',
    contactName: 'Зоряна',
    phone: '0677014722',
    role: null,
  },
  {
    schoolNumber: '52',
    contactName: 'Софія',
    phone: '0935428770',
    role: 'Діловод',
  },
  {
    schoolNumber: '181',
    contactName: 'Марія Корпан',
    phone: '0673142095',
    role: 'Директор',
  },
  {
    schoolNumber: '17',
    contactName: 'Світлана',
    phone: '0973047285',
    role: 'Директор',
  },
  {
    schoolNumber: '44',
    contactName: 'Надія',
    phone: '0932342106',
    role: 'Методист',
  },
  {
    schoolNumber: '170',
    contactName: 'Ірина',
    phone: '0986373627',
    role: 'Методист',
  },
  {
    schoolNumber: '3',
    contactName: 'Наталя Ігорівна',
    phone: '0973436380',
    role: null,
  },
  {
    schoolNumber: '176',
    contactName: 'Юлія Андріївна',
    phone: '0665244245',
    role: 'Директор',
  },
  {
    schoolNumber: '179',
    contactName: 'Віра Володимирівна',
    phone: '0672590052',
    role: 'Директор',
  },
  {
    schoolNumber: 'Вільні',
    contactName: 'Іванна Михайлівна',
    phone: '0974788019',
    role: 'Директор',
  },
  {
    schoolNumber: '105',
    contactName: 'Лідія Василівна',
    phone: '0679592370',
    role: 'Директор',
  },
  {
    schoolNumber: '7',
    contactName: 'Уляна Богданівна',
    phone: '0674256644',
    role: 'Директор',
  },
  {
    schoolNumber: '168',
    contactName: 'Ядельська Оксана Богданівна',
    phone: '0969105724',
    role: 'Директор',
  },
  {
    schoolNumber: '139',
    contactName: 'Ірина',
    phone: '0970488672',
    role: 'Директор',
  },
  {
    schoolNumber: '167',
    contactName: 'Зоряна Ярославівна',
    phone: '0672684699',
    role: 'Директор',
  },
  {
    schoolNumber: '38',
    contactName: 'Ірина Олегівна',
    phone: '0679475122',
    role: null,
  },
  {
    schoolNumber: '132',
    contactName: 'Надія Леонівна',
    phone: '0974429599',
    role: 'Директор',
  },
  {
    schoolNumber: '92',
    contactName: 'Ольга',
    phone: '0679492252',
    role: 'Директор',
  },
  {
    schoolNumber: '33',
    contactName: 'Леся Породько',
    phone: '0505049049',
    role: 'Директор',
  },
  {
    schoolNumber: '155',
    contactName: 'Ірина Михайлівна',
    phone: '0677301582',
    role: 'Директор',
  },
  {
    schoolNumber: '183',
    contactName: 'Володимир Михайлович',
    phone: '0970256488',
    role: 'Директор',
  },
  {
    schoolNumber: '70',
    contactName: 'Ольга Петрівна',
    phone: '0936992997',
    role: 'Директор',
  },
  {
    schoolNumber: '18',
    contactName: 'Наталя Бондаренко',
    phone: '0505938826',
    role: 'Директор',
  },
  {
    schoolNumber: '131',
    contactName: 'Любомира',
    phone: '0673657490',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Зоряна Семенівна',
    phone: '0677628687',
    role: 'Директор',
  },
  {
    schoolNumber: '26',
    contactName: 'Ольга Іванівна',
    phone: '0977476237',
    role: 'Директор',
  },
  {
    schoolNumber: '23',
    contactName: 'Соломія Ігорівна',
    phone: '0975616807',
    role: 'Директор',
  },
  {
    schoolNumber: '1',
    contactName: 'Оксана',
    phone: '0675937156',
    role: 'Директор',
  },
  {
    schoolNumber: '109',
    contactName: 'Катерина Петрівна',
    phone: '0975173313',
    role: 'Директор',
  },
  {
    schoolNumber: '30',
    contactName: 'Олена Йосифівна',
    phone: '0974649258',
    role: 'Директор',
  },
  {
    schoolNumber: '51',
    contactName: 'Вікторія Романівна',
    phone: '0974207708',
    role: 'Директор',
  },
  {
    schoolNumber: '21',
    contactName: 'Анастасія Віталіївна',
    phone: '0671727948',
    role: 'Директор',
  },
  {
    schoolNumber: '75',
    contactName: 'Наталія Володимирівна',
    phone: '0972431888',
    role: 'Директор',
  },
  {
    schoolNumber: '166',
    contactName: "Мар'яна Михайлівна",
    phone: '0975300502',
    role: 'Директор',
  },
  {
    schoolNumber: '127',
    contactName: 'Галина Йосифівна',
    phone: '0963460339',
    role: 'Директор',
  },
  {
    schoolNumber: '86',
    contactName: 'Стефанія Миколаївна',
    phone: '0674936394',
    role: 'Директор',
  },
  {
    schoolNumber: '114',
    contactName: 'Ольга Володимирівна',
    phone: '0983673279',
    role: 'Директор',
  },
  {
    schoolNumber: '128',
    contactName: 'Лідія Михайлівна',
    phone: '0979790881',
    role: 'Директор',
  },
  {
    schoolNumber: 'Золотий ключик',
    contactName: 'Галина',
    phone: '0663914517',
    role: 'Методист',
  },
  {
    schoolNumber: 'Казка',
    contactName: 'Ірина Михайлівна',
    phone: '0677322435',
    role: 'Директор',
  },
  {
    schoolNumber: 'Львівський 2 сад',
    contactName: 'Олена Юріївна',
    phone: '0677270402',
    role: 'Директор',
  },
  {
    schoolNumber: '160',
    contactName: 'Віра Каролівна',
    phone: '0968009925',
    role: 'Директор',
  },
  {
    schoolNumber: '129',
    contactName: 'Оксана Зенонівна',
    phone: '0678112120',
    role: 'Директор',
  },
  {
    schoolNumber: '93',
    contactName: 'Марія Ярославівна',
    phone: '0676950870',
    role: 'Директор',
  },
  {
    schoolNumber: '48',
    contactName: 'Наталія Остапівна',
    phone: '0974428307',
    role: 'Директор',
  },
  {
    schoolNumber: '135',
    contactName: 'Галина Ярославівна',
    phone: '0673994741',
    role: 'Директор',
  },
  {
    schoolNumber: '188',
    contactName: 'Ірина Вікторівна',
    phone: '0933054378',
    role: 'Директор',
  },
  {
    schoolNumber: '25',
    contactName: 'Лілія Богданівна',
    phone: '0680215346',
    role: 'Директор',
  },
  {
    schoolNumber: '32',
    contactName: 'Наталія Василівна',
    phone: '0678119933',
    role: 'Директор',
  },
  {
    schoolNumber: '171',
    contactName: 'Ірина Корніївна',
    phone: '0972576026',
    role: 'Директор',
  },
  {
    schoolNumber: '96',
    contactName: 'Світлана Петрівна',
    phone: '0676739477',
    role: 'Директор',
  },
  {
    schoolNumber: '94',
    contactName: 'Оксана Ярославівна',
    phone: '0671447681',
    role: 'Директор',
  },
  {
    schoolNumber: '156/162',
    contactName: 'Оксана Ісламівна',
    phone: '0985835819',
    role: 'Директор',
  },
  {
    schoolNumber: '71',
    contactName: 'Валентина Гермогенівна',
    phone: '0976781981',
    role: 'Директор',
  },
  {
    schoolNumber: '187',
    contactName: 'Ольга Олексіївна',
    phone: '0674599119',
    role: 'Директор',
  },
  {
    schoolNumber: '14',
    contactName: 'Оксана Любомирівна',
    phone: '0677247619',
    role: 'Директор',
  },
  {
    schoolNumber: 'Любисток',
    contactName: 'Марія',
    phone: '0685227373',
    role: 'Методист',
  },
  {
    schoolNumber: '106',
    contactName: 'Галина Володимирівна',
    phone: '0675839839',
    role: 'Директор',
  },
  {
    schoolNumber: '104',
    contactName: 'Тетяна Ярославівна',
    phone: '0678034951',
    role: 'Директор',
  },
  {
    schoolNumber: '116',
    contactName: 'Ірина Іванівна',
    phone: '0968145853',
    role: 'Директор',
  },
  {
    schoolNumber: '57',
    contactName: 'Руслана Володимирівна',
    phone: '0966507883',
    role: 'Директор',
  },
  {
    schoolNumber: '184',
    contactName: 'Марія Іванівна',
    phone: '2546872',
    role: 'Директор',
  },
  {
    schoolNumber: '43',
    contactName: 'Віра',
    phone: '0984284448',
    role: 'Методист',
  },
  {
    schoolNumber: '29',
    contactName: 'Вікторія Олександрівна',
    phone: '0673041528',
    role: 'Директор',
  },
];

async function main() {
  console.log('Seeding school contacts...');

  await prisma.schoolContact.deleteMany({});

  for (const c of contacts) {
    await prisma.schoolContact.create({
      data: { city: 'Львів', ...c },
    });
  }

  console.log(`Done: ${contacts.length} contacts inserted`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

```

# FILE: apps/backend/src/schools/schools.controller.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

const mockGuard = { canActivate: jest.fn() };

const mockSchoolsService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
};

const mockParserService = {};

describe('SchoolsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: mockSchoolsService },
        { provide: ParserService, useValue: mockParserService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(OwnershipGuard)
      .useValue(mockGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGuard.canActivate.mockResolvedValue(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('GET /schools/:id — findOne', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      await request(app.getHttpServer()).get('/schools/s-1').expect(403);
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockSchoolsService.findOne.mockResolvedValueOnce({ id: 's-1' });
      const res = await request(app.getHttpServer())
        .get('/schools/s-1')
        .expect(200);
      expect(res.body.id).toBe('s-1');
    });
  });
});

```

# FILE: apps/backend/src/schools/schools.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BulkImportDto } from './dto/bulk-import.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { FindSchoolsQueryDto } from './dto/find-schools-query.dto';
import { FindContactsQueryDto } from './dto/find-contacts-query.dto';
@ApiTags('Schools')
@ApiCookieAuth('access_token')
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @ApiOperation({
    summary: 'Масовий імпорт шкіл/садочків із зовнішнього джерела',
  })
  @Post('bulk-import')
  @Throttle({ default: { ttl: 300000, limit: 2 } })
  @Roles('SUPERADMIN', 'MANAGER')
  bulkImport(@Body() body: BulkImportDto) {
    return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
  }

  @ApiOperation({ summary: 'Список міст, підтримуваних парсером' })
  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @ApiOperation({ summary: 'Створити школу/садочок' })
  @Post()
  @Roles('SUPERADMIN', 'MANAGER')
  create(@Body() body: CreateSchoolDto) {
    return this.schoolsService.create(body);
  }

  @ApiOperation({ summary: 'Список закладів з фільтрами та пагінацією' })
  @Get()
  findAll(@Query() query: SchoolQueryDto) {
    return this.schoolsService.findAll(query);
  }

  @ApiOperation({ summary: 'Статистика закладів за стадією та розміром' })
  @Get('stats')
  getStats(
    @Query('cityId') cityId?: string,
    @Query('type') type?: 'Школа' | 'Садочок',
    @Query('stage') stage?: 'new' | 'planned' | 'inProgress' | 'done',
  ) {
    return this.schoolsService.getStats({ cityId, type, stage });
  }

  @ApiOperation({ summary: 'Пошук закладів у зовнішньому джерелі' })
  @Get('search')
  search(@Query() query: FindSchoolsQueryDto) {
    return this.parserService.searchSchools(query.q ?? '', query.type);
  }

  @ApiOperation({ summary: 'Отримати заклад за ID' })
  @Get(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @ApiOperation({ summary: 'Оновити заклад' })
  @Patch(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити заклад' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @ApiOperation({ summary: 'Пошук контактів закладу' })
  @Get('contacts/search')
  searchContacts(@Query() query: FindContactsQueryDto) {
    return this.schoolsService.searchContacts(query.q ?? '', query.city);
  }
}

```

# FILE: apps/backend/src/schools/schools.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { EventsModule } from '../events/events.module';
import { ParserService } from './parser.service';

@Module({
  imports: [forwardRef(() => EventsModule)],
  controllers: [SchoolsController],
  providers: [SchoolsService, ParserService],
  exports: [SchoolsService, ParserService],
})
export class SchoolsModule {}

```

# FILE: apps/backend/src/schools/schools.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { ParserService } from './parser.service';
import { EventsService } from '../events/events.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus } from '@nestjs/common';

const mockPrisma = {
  school: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  event: { findMany: jest.fn() },
  schoolContact: { findMany: jest.fn() },
  city: { findUnique: jest.fn() },
  $queryRaw: jest.fn(),
};

const mockParser = {
  parseSchoolData: jest.fn(),
  getAllSchoolsForCity: jest.fn(),
};

const mockEventsService = { remove: jest.fn() };

const mockCache = {
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

const makeModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      SchoolsService,
      { provide: PrismaService, useValue: mockPrisma },
      { provide: ParserService, useValue: mockParser },
      { provide: EventsService, useValue: mockEventsService },
      { provide: CACHE_MANAGER, useValue: mockCache },
    ],
  }).compile();

  return module.get<SchoolsService>(SchoolsService);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SchoolsService — create', () => {
  it('створює школу у БД та повертає її', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue(null);

    const service = await makeModule();
    const result = await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    });

    expect(mockPrisma.school.create).toHaveBeenCalledWith({
      data: { name: 'Школа №1', type: 'Школа', cityId: 'city-1' },
    });
    expect(result.id).toBe('school-1');
  });

  it('sourceUrl не потрапляє до БД, але передається в parser', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue({
      address: 'вул.1',
      director: 'Тест',
      childrenCount: 100,
    });
    mockPrisma.school.update.mockResolvedValueOnce(newSchool);

    const service = await makeModule();
    await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      sourceUrl: 'https://example.com/123',
    });

    const createCall = mockPrisma.school.create.mock.calls[0][0].data;
    expect(createCall.sourceUrl).toBeUndefined();

    // Чекаємо на асинхронний парсинг
    await new Promise((r) => setTimeout(r, 10));
    expect(mockParser.parseSchoolData).toHaveBeenCalledWith(
      'Школа №1',
      'https://example.com/123',
      'Школа',
    );
  });

  it('не оновлює БД якщо parser повертає null', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue(null);

    const service = await makeModule();
    await service.create({ name: 'Школа №1', type: 'Школа', cityId: 'city-1' });

    await new Promise((r) => setTimeout(r, 10));
    expect(mockPrisma.school.update).not.toHaveBeenCalled();
  });

  it('не перезаписує вже заповнені поля результатом парсингу', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      address: 'вже вказана адреса',
      director: 'вже вказаний директор',
      childrenCount: 999,
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue({
      address: 'Парсер-адреса',
      director: 'Парсер-директор',
      childrenCount: 100,
    });

    const service = await makeModule();
    await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      address: 'вже вказана адреса',
      director: 'вже вказаний директор',
      childrenCount: 999,
    });

    await new Promise((r) => setTimeout(r, 10));
    // update має не викликатись, бо всі поля вже заповнені
    expect(mockPrisma.school.update).not.toHaveBeenCalled();
  });
});

describe('SchoolsService — findOne', () => {
  it('повертає школу якщо знайдено', async () => {
    const school = {
      id: 'school-1',
      name: 'Школа №1',
      city: { name: 'Львів' },
    };
    mockPrisma.school.findUnique.mockResolvedValueOnce(school);

    const service = await makeModule();
    const result = await service.findOne('school-1');

    expect(result).toMatchObject({ id: 'school-1' });
  });

  it('кешує результат при першому запиті', async () => {
    const school = { id: 'school-1', name: 'Школа №1', city: {} };
    mockPrisma.school.findUnique.mockResolvedValueOnce(school);

    const service = await makeModule();
    await service.findOne('school-1');

    expect(mockCache.set).toHaveBeenCalledWith(
      'school:school-1',
      school,
      15_000,
    );
  });

  it('повертає кешований результат без запиту до БД', async () => {
    const cached = { id: 'school-1', name: 'Кешована школа', city: {} };
    mockCache.get.mockResolvedValueOnce(cached);

    const service = await makeModule();
    const result = await service.findOne('school-1');

    expect(result).toBe(cached);
    expect(mockPrisma.school.findUnique).not.toHaveBeenCalled();
  });

  it('кидає AppException SCHOOL_NOT_FOUND якщо школи не існує', async () => {
    mockPrisma.school.findUnique.mockResolvedValueOnce(null);

    const service = await makeModule();
    await expect(service.findOne('ghost')).rejects.toMatchObject({
      message: 'SCHOOL_NOT_FOUND',
      status: HttpStatus.NOT_FOUND,
    });
  });
});

describe('SchoolsService — update', () => {
  it('оновлює школу та видаляє кеш', async () => {
    const updated = { id: 'school-1', name: 'Нова назва' };
    mockPrisma.school.update.mockResolvedValueOnce(updated);

    const service = await makeModule();
    const result = await service.update('school-1', {
      name: 'Нова назва',
    });

    expect(mockPrisma.school.update).toHaveBeenCalledWith({
      where: { id: 'school-1' },
      data: { name: 'Нова назва' },
    });
    expect(mockCache.del).toHaveBeenCalledWith('school:school-1');
    expect(result.name).toBe('Нова назва');
  });

  it('не передає системні поля (city, id, createdAt, updatedAt) у data', async () => {
    mockPrisma.school.update.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.update('school-1', {
      name: 'Тест',
      city: { id: 'c-1', name: 'Львів' } as any,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
    } as any);

    const updateData = mockPrisma.school.update.mock.calls[0][0].data;
    expect(updateData.city).toBeUndefined();
    expect(updateData.createdAt).toBeUndefined();
    expect(updateData.updatedAt).toBeUndefined();
    expect(updateData.id).toBeUndefined();
  });
});

describe('SchoolsService — remove', () => {
  it('видаляє всі події школи перед видаленням самої школи', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([
      { id: 'ev-1' },
      { id: 'ev-2' },
    ]);
    mockEventsService.remove.mockResolvedValue({});
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockEventsService.remove).toHaveBeenCalledTimes(2);
    expect(mockEventsService.remove).toHaveBeenCalledWith('ev-1');
    expect(mockEventsService.remove).toHaveBeenCalledWith('ev-2');
    expect(mockPrisma.school.delete).toHaveBeenCalledWith({
      where: { id: 'school-1' },
    });
  });

  it('видаляє школу навіть без подій', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockEventsService.remove).not.toHaveBeenCalled();
    expect(mockPrisma.school.delete).toHaveBeenCalled();
  });

  it('видаляє кеш після видалення школи', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockCache.del).toHaveBeenCalledWith('school:school-1');
  });
});

describe('SchoolsService — searchContacts', () => {
  it('повертає порожній масив якщо query порожній', async () => {
    const service = await makeModule();
    const result = await service.searchContacts('');
    expect(result).toEqual([]);
    expect(mockPrisma.schoolContact.findMany).not.toHaveBeenCalled();
  });

  it('знаходить контакти за номером школи', async () => {
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce([
      {
        schoolNumber: '42',
        contactName: 'Директор Тест',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
    ]);

    const service = await makeModule();
    const results = await service.searchContacts('42');

    expect(results).toHaveLength(1);
    expect(results[0].schoolNumber).toBe('42');
  });

  it("знаходить контакти за ім'ям (часткове співпадіння)", async () => {
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce([
      {
        schoolNumber: '1',
        contactName: 'Марія Іваненко',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
      {
        schoolNumber: '2',
        contactName: 'Петро Коваль',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
    ]);

    const service = await makeModule();
    const results = await service.searchContacts('марія');

    expect(results).toHaveLength(1);
    expect(results[0].contactName).toBe('Марія Іваненко');
  });

  it('повертає не більше 10 результатів', async () => {
    const contacts = Array.from({ length: 20 }, (_, i) => ({
      schoolNumber: String(i + 1),
      contactName: `Тест ${i + 1}`,
      phone: '',
      role: 'Директор',
      city: 'Київ',
    }));
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce(contacts);

    const service = await makeModule();
    // Пошук за словом, що є у всіх
    const results = await service.searchContacts('Тест');

    expect(results.length).toBeLessThanOrEqual(10);
  });
});

```

# FILE: apps/backend/src/schools/schools.service.ts

```
import {
  Injectable,
  Logger,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { Prisma } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

function concurrencyLimit(n: number) {
  let active = 0;
  const queue: (() => void)[] = [];
  const next = () => {
    active--;
    if (queue.length > 0) queue.shift()!();
  };
  return <T>(fn: () => Promise<T>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      const run = () => {
        active++;
        fn().then(resolve, reject).finally(next);
      };
      if (active >= n) {
        queue.push(run);
      } else {
        run();
      }
    });
}

@Injectable()
export class SchoolsService {
  private readonly logger = new Logger(SchoolsService.name);

  constructor(
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: {
    name: string;
    type: string;
    cityId: string;
    sourceUrl?: string;
    director?: string;
    phone?: string;
    address?: string;
    childrenCount?: number;
  }) {
    const { sourceUrl, ...schoolData } = data;

    const newSchool = await this.prisma.school.create({
      data: schoolData,
    });

    this.parserService.parseSchoolData(data.name, sourceUrl, data.type);
    this.enrichSchoolFromParser(newSchool, data.name, sourceUrl, data.type);

    return newSchool;
  }

  private async enrichSchoolFromParser(
    school: {
      id: string;
      address: string | null;
      director: string | null;
      childrenCount: number | null;
    },
    name: string,
    sourceUrl?: string,
    type?: string,
  ) {
    try {
      const parsed = await this.parserService.parseSchoolData(
        name,
        sourceUrl,
        type,
      );
      if (!parsed) {
        this.logger.warn(`Не вдалося знайти дані для закладу: ${name}`);
        return;
      }

      const updateData: Record<string, unknown> = {};

      if (!school.address && parsed.address) {
        updateData.address = parsed.address;
      }
      if (!school.director && parsed.director) {
        updateData.director = parsed.director;
      }
      if (!school.childrenCount && parsed.childrenCount) {
        updateData.childrenCount = parsed.childrenCount;
      }

      if (Object.keys(updateData).length === 0) {
        this.logger.log(
          `Дані школи "${name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
        );
        return;
      }

      await this.prisma.school.update({
        where: { id: school.id },
        data: updateData,
      });

      this.logger.log(`Дані школи "${name}" успішно оновлені`);
    } catch (error) {
      this.logger.error(
        `Помилка оновлення даних школи: ${(error as Error).message}`,
      );
    }
  }

  private createMany(
    schools: {
      name: string;
      type: string;
      cityId: string;
      director?: string;
      phone?: string;
    }[],
  ) {
    return this.prisma.school.createMany({
      data: schools,
      skipDuplicates: true,
    });
  }

  private buildFilters(
    query: Pick<
      SchoolQueryDto,
      'search' | 'cityId' | 'type' | 'stage' | 'size'
    >,
  ): Prisma.Sql[] {
    const { search, cityId, type, stage, size } = query;
    const conditions: Prisma.Sql[] = [];

    if (search) {
      const trimmed = search.trim();
      const isNumeric = /^\d+$/.test(trimmed);

      if (isNumeric) {
        const numberBoundary = `%№${trimmed}%`;
        const numberWord = `% ${trimmed}%`;
        conditions.push(
          Prisma.sql`(s.name ILIKE ${numberBoundary} OR s.name ILIKE ${numberWord} OR s.name ILIKE ${trimmed + '%'})`,
        );
      } else {
        conditions.push(Prisma.sql`s.name ILIKE ${`%${trimmed}%`}`);
      }
    }
    if (cityId) {
      conditions.push(Prisma.sql`s."cityId" = ${cityId}`);
    }
    if (type) {
      conditions.push(Prisma.sql`s.type = ${type}`);
    }
    if (stage) {
      conditions.push(this.stageCondition(stage));
    }
    if (size) {
      conditions.push(this.sizeCondition(size));
    }

    return conditions;
  }

  private sizeCaseSql(): Prisma.Sql {
    return Prisma.sql`
      CASE
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 50 THEN 'small'
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 100 THEN 'medium'
        WHEN s.type = 'Садочок' THEN 'large'
        WHEN COALESCE(s."childrenCount", 0) < 500 THEN 'small'
        WHEN COALESCE(s."childrenCount", 0) < 900 THEN 'medium'
        ELSE 'large'
      END
    `;
  }

  private stageCondition(stage: string): Prisma.Sql {
    switch (stage) {
      case 'planned':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(PLANNED_STAGES)})
        )`;
      case 'inProgress':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})
        )`;
      case 'done':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text = 'RE_SALE'
        )`;
      default:
        return Prisma.sql`NOT EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text NOT IN ('INTERESTED','PRE_APPROVAL')
        )`;
    }
  }

  private sizeCondition(size: string): Prisma.Sql {
    return Prisma.sql`(${this.sizeCaseSql()}) = ${size}`;
  }

  private latestEventJoin(): Prisma.Sql {
    return Prisma.sql`
      LEFT JOIN LATERAL (
        SELECT e.status FROM "Event" e
        WHERE e."schoolId" = s.id
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
    `;
  }

  private mapRow(row: {
    city_id: string | null;
    city_name: string | null;
    latestStatus: string | null;
    isPlanned: boolean;
    isInProgress: boolean;
    isDone: boolean;
    [key: string]: unknown;
  }) {
    const {
      city_id,
      city_name,
      latestStatus,
      isPlanned,
      isInProgress,
      isDone,
      ...school
    } = row;
    const categories: ('planned' | 'inProgress' | 'done')[] = [];
    if (isPlanned) categories.push('planned');
    if (isInProgress) categories.push('inProgress');
    if (isDone) categories.push('done');
    return {
      ...school,
      city: city_id ? { id: city_id, name: city_name } : null,
      events: latestStatus ? [{ status: latestStatus }] : [],
      categories,
    };
  }

  async findAll(query: SchoolQueryDto) {
    const { skip, take, page } = query;
    const conditions = this.buildFilters(query);
    const whereClause = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      LEFT JOIN "City" c ON c.id = s."cityId"
      ${this.latestEventJoin()}
    `;

    const rows = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT s.*, c.id as city_id, c.name as city_name, latest.status as "latestStatus",
        EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(PLANNED_STAGES)})
        ) as "isPlanned",
        EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})
        ) as "isInProgress",
        EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text = 'RE_SALE'
        ) as "isDone"
      ${baseFrom}
      ${whereClause}
      ORDER BY s."createdAt" DESC
      OFFSET ${skip} LIMIT ${take}
    `);

    const countRows = await this.prisma.$queryRaw<
      { count: bigint }[]
    >(Prisma.sql`
      SELECT COUNT(*)::bigint as count
      ${baseFrom}
      ${whereClause}
    `);

    const totalItems = Number(countRows[0].count);

    return {
      data: rows.map((r) => this.mapRow(r)),
      meta: new PageMetaDto(totalItems, page, take),
    };
  }

  async getStats(query: Pick<SchoolQueryDto, 'cityId' | 'type' | 'stage'>) {
    const baseConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
    });
    const baseWhere = baseConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(baseConditions, ' AND ')}`
      : Prisma.empty;

    const sizeConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
      stage: query.stage,
    });
    const sizeWhere = sizeConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(sizeConditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      ${this.latestEventJoin()}
    `;

    const [statusRows, sizeRows] = await Promise.all([
      this.prisma.$queryRaw<
        { new: bigint; planned: bigint; inProgress: bigint; done: bigint }[]
      >(Prisma.sql`
        SELECT
          COUNT(*) FILTER (
            WHERE NOT EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text NOT IN ('INTERESTED','PRE_APPROVAL')
            )
          )::bigint as new,
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(PLANNED_STAGES)})
            )
          )::bigint as planned,
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})
            )
          )::bigint as "inProgress",
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text = 'RE_SALE'
            )
          )::bigint as done
        FROM "School" s
        ${baseWhere}
      `),
      this.prisma.$queryRaw<{ size: string; count: bigint }[]>(Prisma.sql`
        SELECT
          ${this.sizeCaseSql()} as size,
          COUNT(*)::bigint as count
        ${baseFrom}
        ${sizeWhere}
        GROUP BY size
      `),
    ]);

    const statusStats = statusRows[0]
      ? {
          new: Number(statusRows[0].new),
          planned: Number(statusRows[0].planned),
          inProgress: Number(statusRows[0].inProgress),
          done: Number(statusRows[0].done),
        }
      : { new: 0, planned: 0, inProgress: 0, done: 0 };

    const sizeStats = { small: 0, medium: 0, large: 0 };
    for (const row of sizeRows) sizeStats[row.size] = Number(row.count);

    return { statusStats, sizeStats };
  }

  async findOne(id: string) {
    const key = `school:${id}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const school = await this.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
    if (!school) {
      throw new AppException('SCHOOL_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.set(key, school, 15_000);
    return school;
  }

  async update(id: string, data: UpdateSchoolDto) {
    const {
      city,
      id: _id,
      createdAt,
      updatedAt,
      ...updateData
    } = data as UpdateSchoolDto & Record<string, unknown>;

    const updated = await this.prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
    await this.cacheManager.del(`school:${id}`);
    return updated;
  }

  async remove(id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    await Promise.all(
      events.map((event) => this.eventsService.remove(event.id)),
    );

    const deleted = await this.prisma.school.delete({
      where: {
        id,
      },
    });
    await this.cacheManager.del(`school:${id}`);
    return deleted;
  }

  async searchContacts(q: string, city?: string) {
    if (!q || q.trim().length < 1) return [];

    const cityName = city || 'Львів';
    const normalizedQuery = q.toLowerCase().trim();

    const allContacts = await this.prisma.schoolContact.findMany({
      where: { city: cityName },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
    });

    const STOP_WORDS = new Set([
      'школа',
      'школи',
      'садочок',
      'садок',
      'дитсадок',
      'днз',
      'ліцей',
      'гімназія',
      'зош',
      'центр',
      'розвитку',
      'комунальний',
      'заклад',
      'освіти',
      'імені',
      'ім',
    ]);

    const tokens = normalizedQuery
      .replace(/№/g, ' ')
      .split(/\s+/)
      .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
      .filter((t) => t.length > 0 && !STOP_WORDS.has(t));

    const matches = allContacts.filter((c) => {
      const num = c.schoolNumber.toLowerCase();

      if (num === normalizedQuery) return true;

      const isNumeric = /^\d+$/.test(num);

      if (isNumeric) {
        if (tokens.includes(num)) return true;
      } else {
        if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
          return true;
        if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
      }

      if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;

      return false;
    });

    return matches.slice(0, 10);
  }
  async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new AppException('CITY_NOT_FOUND', HttpStatus.NOT_FOUND);

    const allFromParser = await this.parserService.getAllSchoolsForCity(
      city.name,
      type,
    );

    const existingSchools = await this.prisma.school.findMany({
      where: { cityId, type },
      select: { name: true },
    });

    const normalize = (name: string) =>
      name
        .toLowerCase()
        .replace(/№/g, '')
        .replace(/["'«»]/g, '')
        .replace(/\s+/g, '')
        .trim();

    const existingNames = new Set(
      existingSchools.map((s) => normalize(s.name)),
    );

    const toCreate = allFromParser.filter(
      (s) => !existingNames.has(normalize(s.name)),
    );

    if (toCreate.length === 0) {
      return {
        city: city.name,
        total: allFromParser.length,
        created: 0,
        skipped: allFromParser.length,
      };
    }

    const contacts = await this.prisma.schoolContact.findMany({
      where: { city: city.name },
    });

    const schoolInputs = toCreate.map((school) => {
      const numMatch = school.name.match(/№?\s*(\d+)/);
      const num = numMatch?.[1];
      const matchedContacts = num
        ? contacts.filter((c) => c.schoolNumber === num)
        : contacts.filter((c) => {
            const normSchool = normalize(school.name);
            const normContact = normalize(c.schoolNumber);
            return (
              normSchool.includes(normContact) ||
              normContact.includes(normSchool)
            );
          });

      const director =
        matchedContacts.find(
          (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
        ) || matchedContacts[0];

      return {
        name: school.name,
        type,
        cityId,
        director: director?.contactName || '',
        phone: director?.phone || '',
      };
    });

    await this.createMany(schoolInputs);

    const createdSchools = await this.prisma.school.findMany({
      where: { cityId, type, name: { in: schoolInputs.map((s) => s.name) } },
    });

    const limit = concurrencyLimit(5);
    await Promise.allSettled(
      createdSchools.map((school) => {
        const input = allFromParser.find((si) => si.name === school.name);
        return limit(() =>
          this.enrichSchoolFromParser(school, school.name, input?.url, type),
        );
      }),
    );

    return {
      city: city.name,
      total: allFromParser.length,
      created: schoolInputs.length,
      skipped: allFromParser.length - schoolInputs.length,
    };
  }
}

```

# FILE: apps/backend/src/telegram/telegram.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}

```

# FILE: apps/backend/src/telegram/telegram.service.spec.ts

```
import { TelegramService } from './telegram.service';
import { UsersService } from '../users/users.service';

// Мокуємо зовнішні залежності, які не потрібні у тестах
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    set: jest.fn().mockResolvedValue(null),
    get: jest.fn().mockResolvedValue(null),
    del: jest.fn().mockResolvedValue(1),
    disconnect: jest.fn(),
  }));
});

jest.mock('node-telegram-bot-api', () => {
  return jest.fn().mockImplementation(() => ({
    sendMessage: jest.fn().mockResolvedValue({}),
    stopPolling: jest.fn().mockResolvedValue(undefined),
    onText: jest.fn(),
  }));
});

const mockUsersService = {
  updateTelegramChatId: jest.fn(),
};

const makeService = () => {
  const service = new TelegramService(
    mockUsersService as unknown as UsersService,
  );
  return service;
};

beforeEach(() => {
  jest.clearAllMocks();
  // Тестове середовище: NODE_ENV=test — бот не ініціалізується
  process.env.NODE_ENV = 'test';
  delete process.env.TELEGRAM_BOT_TOKEN;
});

describe('TelegramService — onModuleInit', () => {
  it('у тестовому середовищі (NODE_ENV=test) не ініціалізує бот', () => {
    process.env.NODE_ENV = 'test';
    const service = makeService();
    service.onModuleInit();

    // this.bot залишається undefined
    expect((service as any).bot).toBeUndefined();
  });

  it('без TELEGRAM_BOT_TOKEN не ініціалізує бот', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.TELEGRAM_BOT_TOKEN;
    const service = makeService();
    service.onModuleInit();

    expect((service as any).bot).toBeUndefined();
  });
});

describe('TelegramService — sendMessage', () => {
  it('не кидає помилку якщо bot не ініціалізований (відразу повертає)', async () => {
    const service = makeService();
    // bot = undefined (тестове середовище)
    await expect(service.sendMessage('123', 'Привіт')).resolves.toBeUndefined();
  });

  it('надсилає повідомлення через bot.sendMessage якщо bot ініціалізований', async () => {
    const service = makeService();
    const mockBot = { sendMessage: jest.fn().mockResolvedValue({}) };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-123', '<b>Тест</b>');

    expect(mockBot.sendMessage).toHaveBeenCalledWith(
      'chat-123',
      '<b>Тест</b>',
      { parse_mode: 'HTML' },
    );
  });

  it('не кидає помилку якщо bot.sendMessage падає (помилка логується)', async () => {
    const service = makeService();
    const apiError = new Error('Bad Request: chat not found');
    (apiError as any).response = {
      statusCode: 400,
      body: { description: 'chat not found' },
    };
    const mockBot = {
      sendMessage: jest.fn().mockRejectedValue(apiError),
    };
    (service as any).bot = mockBot;

    await expect(
      service.sendMessage('chat-123', 'Тест'),
    ).resolves.toBeUndefined();
  });
});

describe('TelegramService — sendWelcome', () => {
  it('надсилає повідомлення зі логіном та паролем', async () => {
    const service = makeService();
    const sendSpy = jest
      .spyOn(service, 'sendMessage')
      .mockResolvedValue(undefined);

    await service.sendWelcome('chat-1', 'Іван', 'ivan@crm.com', 'secret123');

    expect(sendSpy).toHaveBeenCalledTimes(1);
    const [chatId, text] = sendSpy.mock.calls[0];
    expect(chatId).toBe('chat-1');
    expect(text).toContain('ivan@crm.com');
    expect(text).toContain('secret123');
  });

  it('повідомлення містить HTML теги (не plain text)', async () => {
    const service = makeService();
    const sendSpy = jest
      .spyOn(service, 'sendMessage')
      .mockResolvedValue(undefined);

    await service.sendWelcome('chat-1', 'Тест', 'test@crm.com', 'pass');

    const text = sendSpy.mock.calls[0][1];
    expect(text).toContain('<b>');
    expect(text).toContain('<code>');
  });
});

describe('TelegramService — retry логіка sendMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('при мережевій помилці (ECONNRESET) робить retry і досягає успіху', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest
        .fn()
        .mockRejectedValueOnce(
          Object.assign(new Error('connection reset'), { code: 'ECONNRESET' }),
        )
        .mockResolvedValueOnce({}),
    };
    (service as any).bot = mockBot;

    const promise = service.sendMessage('chat-1', 'test');
    await jest.advanceTimersByTimeAsync(2000);

    await expect(promise).resolves.toBeUndefined();
    expect(mockBot.sendMessage).toHaveBeenCalledTimes(2);
  });

  it('після 3 невдалих мережевих спроб помилка логується (далі не кидається)', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest
        .fn()
        .mockRejectedValue(
          Object.assign(new Error('ECONNREFUSED'), { code: 'ECONNREFUSED' }),
        ),
    };
    (service as any).bot = mockBot;

    const promise = service.sendMessage('chat-1', 'test');
    await jest.advanceTimersByTimeAsync(5000);

    await expect(promise).resolves.toBeUndefined();
    expect(mockBot.sendMessage).toHaveBeenCalledTimes(3);
  });

  it('при 4xx помилці (не мережева) retry НЕ відбувається', async () => {
    const service = makeService();
    const apiError = new Error('Bad Request: chat not found');
    (apiError as any).response = {
      statusCode: 400,
      body: { description: 'chat not found' },
    };
    const mockBot = {
      sendMessage: jest.fn().mockRejectedValue(apiError),
    };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-1', 'test');

    expect(mockBot.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('при успішному першому виклику retry не відбувається', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest.fn().mockResolvedValue({}),
    };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-1', 'test');

    expect(mockBot.sendMessage).toHaveBeenCalledTimes(1);
  });
});

describe('TelegramService — onModuleDestroy', () => {
  it('зупиняє polling бота якщо bot ініціалізований', async () => {
    const service = makeService();
    const mockBot = {
      stopPolling: jest.fn().mockResolvedValue(undefined),
    };
    (service as any).bot = mockBot;

    // Мокуємо redis.get щоб не відкликати lock
    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue('other-instance');

    await service.onModuleDestroy();

    expect(mockBot.stopPolling).toHaveBeenCalled();
  });

  it('не кидає помилку якщо bot не ініціалізований', async () => {
    const service = makeService();
    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue(null);

    await expect(service.onModuleDestroy()).resolves.not.toThrow();
  });

  it('видаляє Redis lock якщо instance є leader', async () => {
    const service = makeService();
    const instanceId = (service as any).instanceId;

    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue(instanceId);
    redis.del = jest.fn().mockResolvedValue(1);

    await service.onModuleDestroy();

    expect(redis.del).toHaveBeenCalledWith('telegram:bot:leader');
  });
});

```

# FILE: apps/backend/src/telegram/telegram.service.ts

```
import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  forwardRef,
} from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { UsersService } from '../users/users.service';

const LOCK_KEY = 'telegram:bot:leader';
const LOCK_TTL_MS = 15_000;
const RETRY_MS = 5_000;
const SEND_TIMEOUT_MS = 5_000;
const SEND_MAX_RETRIES = 3;

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);
  private readonly instanceId = randomUUID();
  private readonly redis = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
  );
  private lockTimer?: NodeJS.Timeout;
  private retryTimer?: NodeJS.Timeout;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    this.redis.on('error', (err: Error) =>
      this.logger.warn(`Redis lock connection error: ${err.message}`),
    );

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || process.env.NODE_ENV === 'test') {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN не задано або тестове середовище — бот вимкнено',
      );
      return;
    }
    void this.tryBecomeLeader(token);
  }

  async onModuleDestroy() {
    clearTimeout(this.retryTimer);
    clearInterval(this.lockTimer);
    if (this.bot) await this.bot.stopPolling();
    const current = await this.redis.get(LOCK_KEY);
    if (current === this.instanceId) await this.redis.del(LOCK_KEY);
    this.redis.disconnect();
  }

  private async tryBecomeLeader(token: string) {
    let acquired: string | null;
    try {
      acquired = await this.redis.set(
        LOCK_KEY,
        this.instanceId,
        'PX',
        LOCK_TTL_MS,
        'NX',
      );
    } catch (e) {
      this.logger.warn(
        `Не вдалося отримати lock, повторю пізніше: ${(e as Error).message}`,
      );
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }
    if (!acquired) {
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log(`Telegram бот ініціалізовано (leader=${this.instanceId})`);
    this.lockTimer = setInterval(() => {
      this.redis
        .set(LOCK_KEY, this.instanceId, 'PX', LOCK_TTL_MS, 'XX')
        .catch((e: Error) =>
          this.logger.warn(`Не вдалося продовжити lock: ${e.message}`),
        );
    }, LOCK_TTL_MS / 3);

    this.bot.onText(/\/start/, (msg) => {
      void this.handleStartCommand(msg);
    });
  }

  private async handleStartCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = String(msg.chat.id);
    const username = msg.from?.username;

    if (!username) {
      await this.bot.sendMessage(
        chatId,
        "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
      );
      return;
    }

    const normalizedUsername = username.toLowerCase();

    const result = await this.usersService.updateTelegramChatId(
      normalizedUsername,
      chatId,
    );

    if (result.count > 0) {
      this.logger.log(
        `[/start] chatId=${chatId} username=${normalizedUsername} — успішно підв'язано`,
      );
      await this.bot.sendMessage(
        chatId,
        `✅ Вітаємо! Ваш акаунт успішно підключено до <b>Світло Знань CRM</b>.`,
        { parse_mode: 'HTML' },
      );
    } else {
      this.logger.warn(
        `[/start] Користувача з username "${normalizedUsername}" не знайдено в CRM.`,
      );
      await this.bot.sendMessage(
        chatId,
        `❌ Акаунт не знайдено. Переконайтеся, що в CRM у вашому профілі вказано нікнейм <b>${normalizedUsername}</b> без помилок.`,
        { parse_mode: 'HTML' },
      );
    }
  }

  private isNetworkError(e: any): boolean {
    if (e.code === 'TIMEOUT') return true;
    if (
      e.code === 'ECONNRESET' ||
      e.code === 'ETIMEDOUT' ||
      e.code === 'ECONNREFUSED' ||
      e.code === 'ENOTFOUND'
    )
      return true;
    if (e.response?.statusCode && e.response.statusCode < 500) return false;
    return !e.response;
  }

  private async sendWithRetry(
    chatId: string,
    text: string,
    attempt = 1,
  ): Promise<void> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, SEND_TIMEOUT_MS);

    try {
      const promise = this.bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
      });
      await Promise.race([
        promise,
        new Promise<never>((_, reject) => {
          controller.signal.addEventListener('abort', () => {
            reject(
              Object.assign(new Error('Request timeout'), { code: 'TIMEOUT' }),
            );
          });
        }),
      ]);
      clearTimeout(timeoutId);
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (this.isNetworkError(e) && attempt < SEND_MAX_RETRIES) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        this.logger.warn(
          `[sendMessage] мережева помилка (спроба ${attempt}/${SEND_MAX_RETRIES}), повтор через ${delay}ms: ${e.message}`,
        );
        await new Promise((r) => setTimeout(r, delay));
        return this.sendWithRetry(chatId, text, attempt + 1);
      }
      this.logger.error(
        `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
      );
    }
  }

  async sendMessage(chatId: string, text: string): Promise<void> {
    if (!this.bot) return;
    await this.sendWithRetry(chatId, text);
  }

  async sendWelcome(
    chatId: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const text =
      `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
      `Ваш акаунт створено.\n\n` +
      `📧 <b>Логін:</b> <code>${email}</code>\n` +
      `🔑 <b>Пароль:</b> <code>${password}</code>\n\n` +
      `Увійдіть за посиланням: <a href="https://crm-frontend-psi-sable.vercel.app">crm-frontend-psi-sable.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}

```

# FILE: apps/backend/src/users/dto/create-user.dto.ts

```
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Олег Ведучий' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'oleg@svitlo-znan.app' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password: string;

  @ApiPropertyOptional({ example: '+380671112233' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.HOST })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ example: '@oleg_host' })
  @IsOptional()
  @IsString()
  telegramId?: string;

  @ApiPropertyOptional({ example: 'Volkswagen Transporter' })
  @IsOptional()
  @IsString()
  car?: string;
}

```

# FILE: apps/backend/src/users/dto/update-user.dto.ts

```
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  @IsString()
  car?: string;
}

```

# FILE: apps/backend/src/users/users.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: {} }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    expect(module.get(UsersController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/users/users.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiCookieAuth('access_token')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Список усіх користувачів' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Створити користувача' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: 'Оновити користувача' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOperation({ summary: 'Видалити користувача' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

```

# FILE: apps/backend/src/users/users.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => TelegramModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

```

# FILE: apps/backend/src/users/users.service.spec.ts

```
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

describe('UsersService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: { user: { findMany: jest.fn() } } },
        { provide: TelegramService, useValue: { sendMessage: jest.fn() } },
      ],
    }).compile();
    expect(module.get(UsersService)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/users/users.service.ts

```
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TelegramService))
    private telegramService: TelegramService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findByEmailWithCity(email: string) {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { city: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        city: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role,
        cityId: data.cityId || null,
        telegramId: data.telegramId || null,
        car: data.car || null,
      },
    });

    if (data.password) {
      const chatId = user.telegramChatId || null;

      if (chatId) {
        await this.telegramService.sendWelcome(
          chatId,
          data.fullName,
          data.email,
          data.password,
        );
      }
    }

    this.prisma.notification
      .create({
        data: {
          userId: user.id,
          type: 'WELCOME',
          payload: { name: data.fullName },
        },
      })
      .catch(() => {});

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updateData: Prisma.UserUpdateInput = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      city: data.cityId
        ? { connect: { id: data.cityId } }
        : { disconnect: true },
      telegramId: data.telegramId || null,
      car: data.car || null,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateTelegramChatId(username: string, chatId: string) {
    return this.prisma.user.updateMany({
      where: {
        telegramId: {
          equals: username,
          mode: 'insensitive',
        },
      },
      data: { telegramChatId: chatId },
    });
  }
}

```

# FILE: apps/backend/test/app.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});

```

# FILE: apps/backend/test/auth.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('Auth API (contract)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => await app.close());

  describe('POST /auth/login', () => {
    it('повертає токен при правильних даних', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(typeof res.body.access_token).toBe('string');
      expect(res.body.access_token.length).toBeGreaterThan(10);
    });

    it('повертає 401 при невірному паролі', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'wrongpassword' })
        .expect(401);
    });

    it('повертає 401 при невірному email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@crm.com', password: 'admin123' })
        .expect(401);
    });

    it('повертає 400 без email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin123' })
        .expect(400);
    });

    it('структура відповіді відповідає контракту', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toMatchObject({
        access_token: expect.any(String),
      });
    });
  });
});

```

# FILE: apps/backend/test/dashboard.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Dashboard API (contract)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => await app.close());

  describe('GET /dashboard/summary', () => {
    it('повертає summary з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('todayEvents');
      expect(res.body).toHaveProperty('upcomingEvents');
      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('monthlyKpi');
      expect(res.body).toHaveProperty('staleSchools');
      expect(res.body).toHaveProperty('activityFeed');
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/dashboard/summary').expect(401);
    });

    it('funnel містить всі етапи пайплайну', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const stages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of stages) {
        expect(res.body.funnel).toHaveProperty(stage);
      }
    });

    it('monthlyKpi має числові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const kpi = res.body.monthlyKpi;
      expect(typeof kpi.revenue).toBe('number');
      expect(typeof kpi.profit).toBe('number');
      expect(typeof kpi.children).toBe('number');
      expect(typeof kpi.count).toBe('number');
    });

    it('фільтр по cityId повертає коректний результат', async () => {
      const citiesRes = await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${token}`);

      const cityId = citiesRes.body[0]?.id;
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .get(`/dashboard/summary?cityId=${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('todayEvents');
    });

    it('todayEvents і upcomingEvents — масиви', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.todayEvents)).toBe(true);
      expect(Array.isArray(res.body.upcomingEvents)).toBe(true);
      expect(Array.isArray(res.body.staleSchools)).toBe(true);
      expect(Array.isArray(res.body.activityFeed)).toBe(true);
    });
  });
});

```

# FILE: apps/backend/test/events.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Events API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdEventId: string;
  let schoolId: string;
  let cityId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;

    if (cityId) {
      const schoolsRes = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`);
      schoolId = schoolsRes.body[0]?.id;
    }
  });

  afterAll(async () => {
    if (createdEventId) {
      await request(app.getHttpServer())
        .delete(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /events', () => {
    it('повертає список подій з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/events').expect(401);
    });

    it('кожна подія має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const event = res.body[0];
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('project');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('status');
      }
    });
  });

  describe('POST /events', () => {
    it('створює нову подію', async () => {
      if (!schoolId || !cityId) return;

      const res = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Тестова подія E2E',
          date: '2027-01-15',
          time: '10:00',
          schoolId,
          cityId,
          childrenPlanned: 100,
          price: 5000,
          address: 'вул. Тестова 1',
          contactPerson: 'Тест',
          contactPhone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.project).toBe('Тестова подія E2E');
      expect(res.body.status).toBe('BASE');
      createdEventId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/events')
        .send({ project: 'Test' })
        .expect(401);
    });
  });

  describe('GET /events/:id', () => {
    it('повертає подію по id', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdEventId);
    });

    it('повертає 404 для неіснуючої події', async () => {
      await request(app.getHttpServer())
        .get('/events/nonexistent-id-12345')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /events/:id/status', () => {
    it('змінює статус події', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .patch(`/events/${createdEventId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'FIRST_CONTACT',
          actionName: 'Знайомство',
          comment: 'Тестовий коментар',
        })
        .expect(200);

      expect(res.body.status).toBe('FIRST_CONTACT');
      expect(res.body.history).toBeDefined();
      expect(res.body.history.length).toBeGreaterThan(0);
    });
  });

  describe('GET /events/school/:schoolId', () => {
    it('повертає події школи', async () => {
      if (!schoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true повертає менше полів', async () => {
      if (!schoolId) return;

      const fullRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`);

      const minRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}?minimal=true`)
        .set('Authorization', `Bearer ${token}`);

      if (fullRes.body.length > 0 && minRes.body.length > 0) {
        expect(minRes.body[0]).not.toHaveProperty('history');
        expect(minRes.body[0]).not.toHaveProperty('preparation');
      }
    });
  });

  describe('DELETE /events/:id', () => {
    it('видаляє подію', async () => {
      if (!schoolId || !cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Подія для видалення',
          date: '2027-02-01',
          time: '11:00',
          schoolId,
          cityId,
          childrenPlanned: 50,
          price: 2000,
          address: 'вул. Тест 2',
          contactPerson: 'Тест',
          contactPhone: '0671234568',
        });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});

```

# FILE: apps/backend/test/jest-e2e.json

```
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "testTimeout": 30000,
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
}

```

# FILE: apps/backend/test/schools.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Schools API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdSchoolId: string;
  let cityId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;
  });

  afterAll(async () => {
    if (createdSchoolId) {
      await request(app.getHttpServer())
        .delete(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /schools', () => {
    it('повертає список шкіл', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true — немає include полів', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools?minimal=true')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/schools').expect(401);
    });

    it('кожна школа має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const school = res.body[0];
        expect(school).toHaveProperty('id');
        expect(school).toHaveProperty('name');
        expect(school).toHaveProperty('type');
        expect(school).toHaveProperty('cityId');
      }
    });
  });

  describe('POST /schools', () => {
    it('створює нову школу', async () => {
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'E2E Тестова школа',
          type: 'Школа',
          cityId,
          director: 'Тест Тестович',
          phone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('E2E Тестова школа');
      createdSchoolId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/schools')
        .send({ name: 'Test', type: 'Школа', cityId: 'city-1' })
        .expect(401);
    });
  });

  describe('GET /schools/:id', () => {
    it('повертає школу по id', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdSchoolId);
      expect(res.body).toHaveProperty('city');
    });

    it('повертає 404 для неіснуючої школи', async () => {
      await request(app.getHttpServer())
        .get('/schools/nonexistent-id-99999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /schools/:id', () => {
    it('оновлює дані школи', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .patch(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ director: 'Новий Директор' })
        .expect(200);

      expect(res.body.director).toBe('Новий Директор');
    });
  });

  describe('IDOR — OwnershipGuard для MANAGER', () => {
    let prisma: PrismaService;
    let adminToken: string;
    let otherCityId: string;
    let otherCitySchoolId: string;

    beforeAll(async () => {
      prisma = app.get(PrismaService);

      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' });
      adminToken = loginRes.body.access_token;
    });

    it('MANAGER отримує 403 при спробі доступу до школи іншого міста', async () => {
      if (!cityId) return;

      // Admin створює інше місто
      const cityBRes = await request(app.getHttpServer())
        .post('/cities')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: `E2E IDOR City ${Date.now()}` })
        .expect(201);
      otherCityId = cityBRes.body.id;

      // Admin створює школу в іншому місті
      const schoolRes = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `E2E IDOR School ${Date.now()}`,
          type: 'Школа',
          cityId: otherCityId,
          director: 'Test',
          phone: '0671111111',
        })
        .expect(201);
      otherCitySchoolId = schoolRes.body.id;

      // Створюємо MANAGER користувача з cityId = cityA (перше місто)
      const hashedPassword = await bcrypt.hash('manager123', 10);
      const manager = await prisma.user.create({
        data: {
          email: `e2e-manager-${Date.now()}@crm.com`,
          password: hashedPassword,
          name: 'E2E Manager IDOR',
          role: 'MANAGER',
          cityId,
        },
      });

      // Логін як MANAGER
      const managerLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: manager.email, password: 'manager123' })
        .expect(201);
      const managerToken = managerLogin.body.access_token;

      // MANAGER намагається отримати школу з іншого міста → 403
      await request(app.getHttpServer())
        .get(`/schools/${otherCitySchoolId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(403);
    });

    afterAll(async () => {
      if (otherCitySchoolId) {
        await request(app.getHttpServer())
          .delete(`/schools/${otherCitySchoolId}`)
          .set('Authorization', `Bearer ${adminToken}`);
      }
      if (otherCityId) {
        await request(app.getHttpServer())
          .delete(`/cities/${otherCityId}`)
          .set('Authorization', `Bearer ${adminToken}`);
      }
    });
  });

  describe('DELETE /schools/:id', () => {
    it('видаляє школу разом з подіями', async () => {
      if (!cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Школа для видалення E2E', type: 'Школа', cityId });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});

```

# FILE: apps/backend/tsconfig.build.json

```
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

```

# FILE: apps/backend/tsconfig.json

```
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["jest", "node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  }
}

```

# FILE: apps/docker-compose.yml

```
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: crm
      POSTGRES_PASSWORD: crm
      POSTGRES_DB: crm
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: pg_isready -U crm -d crm
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: redis-cli ping
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - apps/backend/.env
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:3000/.well-known/health || exit 1
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

# FILE: apps/frontend/e2e/dashboard-swipe.spec.ts

```
import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

async function navigateToDashboard(page: Page) {
  await page.goto("/dashboard");
  await page.waitForLoadState("networkidle");
}

async function swipeLeft(page: Page) {
  const dashboard = page.locator('[data-no-swipe]');
  const box = await dashboard.boundingBox();
  if (!box) throw new Error("Dashboard not found");
  const startX = box.x + box.width * 0.8;
  const endX = box.x + box.width * 0.2;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 10 });
  await page.mouse.up();
}

async function swipeRight(page: Page) {
  const dashboard = page.locator('[data-no-swipe]');
  const box = await dashboard.boundingBox();
  if (!box) throw new Error("Dashboard not found");
  const startX = box.x + box.width * 0.2;
  const endX = box.x + box.width * 0.8;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 10 });
  await page.mouse.up();
}

test.describe("Dashboard swipe-навігація", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToDashboard(page);
  });

  test("свайп вліво перемикає на Reports", async ({ page }) => {
    await expect(page).toHaveURL(/tab=overview/);
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });
  });

  test("свайп вліво двічі перемикає на Leaderboard", async ({ page }) => {
    await swipeLeft(page);
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=leaderboard/, { timeout: 3000 });
  });

  test("свайп вправо повертає назад", async ({ page }) => {
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });
    await swipeRight(page);
    await expect(page).toHaveURL(/tab=overview/, { timeout: 3000 });
  });
});

```

# FILE: apps/frontend/e2e/login.spec.ts

```
import { test, expect } from "@playwright/test";

test.describe("Авторизація", () => {
  test("успішний логін перенаправляє на /cities", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/cities/, { timeout: 8000 });
  });

  test("невірний пароль — залишається на /login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("невірний пароль — показує повідомлення про помилку", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=/невірний|помилка|неправильний/i"),
    ).toBeVisible({ timeout: 5000 });
  });

  test("порожній email — кнопка не відправляє форму", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("після логіну встановлюється httpOnly cookie access_token", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);
    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "access_token");
    expect(authCookie).toBeTruthy();
    expect(authCookie?.httpOnly).toBe(true);
  });

  test("після логауту cookie access_token видаляється", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);

    const logoutBtn = page.locator("button", { hasText: /вийти|logout/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      const cookies = await page.context().cookies();
      const authCookie = cookies.find((c) => c.name === "access_token");
      expect(authCookie).toBeFalsy();
    }
  });

 test("захищений маршрут без cookie перенаправляє на /login", async ({
    page,
  }) => {
    await page.goto("/schools");
    await page.context().clearCookies();
    await page.goto("/schools");
    await expect(page).toHaveURL(/login/);
  });
});

```

# FILE: apps/frontend/e2e/schools.spec.ts

```
import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

test.describe("Сторінка шкіл", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("відображає заголовок Школи", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Школи");
  });

  test("відображає список шкіл", async ({ page }) => {
    const rows = page.locator("table tbody tr, .school-row-enter");
    await expect(rows.first()).toBeVisible({ timeout: 8000 });
  });

  test("пошук фільтрує школи", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await expect(searchInput).toBeVisible();

    const firstSchool = page.locator("table tbody tr").first();
    const schoolName = await firstSchool.locator("td").first().textContent();
    const searchTerm = schoolName?.slice(0, 5) ?? "Школа";

    await searchInput.fill(searchTerm);
    await page.waitForTimeout(300);

    const results = page.locator("table tbody tr");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("очищення пошуку повертає всі результати", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await searchInput.fill("Школа №1");
    await page.waitForTimeout(300);
    const filtered = await page.locator("table tbody tr").count();

    await searchInput.fill("");
    await page.waitForTimeout(300);
    const all = await page.locator("table tbody tr").count();

    expect(all).toBeGreaterThanOrEqual(filtered);
  });

  test("фільтр по статусу працює", async ({ page }) => {
    const newFilter = page.locator("button", { hasText: "Нові" });
    if (await newFilter.isVisible()) {
      await newFilter.click();
      await page.waitForTimeout(200);
      const counter = page.locator("text=/шкіл/i");
      await expect(counter).toBeVisible();
    }
  });

  test("клік на школу переходить на профіль", async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();
    await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
  });

  test("відображає StatsBar з лічильниками", async ({ page }) => {
    await expect(page.locator("text=Нові")).toBeVisible();
    await expect(page.locator("text=Заплановані")).toBeVisible();
    await expect(page.locator("text=В роботі")).toBeVisible();
  });
});

test.describe("Додавання школи", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("кнопка Додати відкриває модалку", async ({ page }) => {
    const addBtn = page.locator("button", { hasText: /\+ Додати/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });

  test("модалка закривається по кнопці Скасувати", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
    await page.locator("button", { hasText: "Скасувати" }).click();
    await expect(page.locator("text=Нова школа")).not.toBeVisible();
  });

  test("форма не відправляється без назви школи", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await page.locator("button", { hasText: "Створити" }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });
});

```

# FILE: apps/frontend/eslint.config.js

```


import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
])



```

# FILE: apps/frontend/index.html

```


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="CRM система для управління подіями, школами та фінансами">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>CRM</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


```

# FILE: apps/frontend/lighthouserc.cjs

```
module.exports = {
  ci: {
    collect: {
      url: [
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/cities",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/schools",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/events",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/finance",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        formFactor: "desktop",
        throttlingMethod: "devtools",     
        screenEmulation: { disabled: true },
        chromeFlags: "--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage",
      },
      skipAudits: ["redirects-http"],
    },

    upload: {
      target: "temporary-public-storage",
    },

    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.70 }],
        "categories:accessibility": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.80 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 3500 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.25 }],
        "total-blocking-time": ["warn", { maxNumericValue: 600 }],
        "speed-index": ["warn", { maxNumericValue: 3500 }],
      }
    },

    options: {
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
    }
  }
};
```

# FILE: apps/frontend/package.json

```
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "pretest:e2e": "playwright install --with-deps chromium",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@sentry/react": "^10.63.0",
    "@tanstack/react-query": "^5.101.0",
    "@tanstack/react-virtual": "^3.14.3",
    "axios": "^1.18.0",
    "formik": "^2.4.9",
    "framer-motion": "^12.41.0",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^1.20.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.79.0",
    "react-router-dom": "^7.18.0",
    "recharts": "^3.8.1",
    "swiper": "^14.0.2",
    "yup": "^1.7.1",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@lhci/cli": "^0.15.1",
    "@playwright/test": "^1.61.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "@vitest/coverage-v8": "^4.1.9",
    "@vitest/ui": "^4.1.9",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "husky": "^9.1.7",
    "jsdom": "^29.1.1",
    "msw": "^2.14.6",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12",
    "vite-plugin-image-optimizer": "^2.0.3",
    "vitest": "^4.1.9"
  }
}

```

