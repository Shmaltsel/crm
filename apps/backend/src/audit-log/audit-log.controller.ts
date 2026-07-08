import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('audit-log')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Roles('SUPERADMIN', 'OWNER')
@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @ApiOperation({ summary: 'Отримати журнал дій' })
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('entity') entity?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    return this.auditLogService.findAll({
      userId,
      entity,
      dateFrom,
      dateTo,
      page,
      take,
    });
  }

  @ApiOperation({ summary: 'Список типів сутностей' })
  @Get('entities')
  findEntityTypes() {
    return this.auditLogService.findEntityTypes();
  }
}
