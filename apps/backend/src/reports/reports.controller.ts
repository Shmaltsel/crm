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
