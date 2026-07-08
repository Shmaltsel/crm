import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

class DashboardSummaryQueryDto {
  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  cityId?: string;
}

@ApiTags('Dashboard')
@ApiCookieAuth('access_token')
@Controller('dashboard')
@UseGuards(AuthGuard, RolesGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Загальна аналітика для дашборда' })
  @Get('summary')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: DashboardSummaryQueryDto,
  ): Promise<DashboardSummary> {
    let effectiveCityId: string | undefined;
    if (user.role === 'SUPERADMIN' || user.role === 'OWNER') {
      effectiveCityId = query.cityId;
    } else {
      const me = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { cityId: true },
      });
      effectiveCityId = me?.cityId ?? undefined;
    }
    return this.dashboardService.getSummary(effectiveCityId, user.role);
  }
}
