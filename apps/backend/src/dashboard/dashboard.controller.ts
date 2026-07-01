import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { IsOptional, IsString } from 'class-validator';

class DashboardSummaryQueryDto {
  @IsOptional()
  @IsString()
  cityId?: string;
}

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: DashboardSummaryQueryDto,
  ) {
    const effectiveCityId =
      user.role === 'SUPERADMIN' ? undefined : query.cityId;
    return this.dashboardService.getSummary(effectiveCityId, user.role);
  }
}
