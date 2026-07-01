import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { FinanceDashboardQueryDto } from './dto/finance-dashboard-query.dto';
import { StaffRevenueQueryDto } from './dto/staff-revenue-query.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('finance')
@UseGuards(AuthGuard, RolesGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('dashboard')
  @Roles('SUPERADMIN', 'MANAGER')
  getDashboard(@Query() query: FinanceDashboardQueryDto) {
    return this.financeService.getDashboard({
      period: query.period,
      cityId: query.cityId,
      project: query.project,
      minimal: query.minimal === 'true',
    });
  }

  @Get('my-balance')
  getMyBalance(@CurrentUser() user: JwtUser) {
    return this.financeService.getMyBalance(user.sub);
  }

  @Get('staff-revenue')
  @Roles('SUPERADMIN', 'MANAGER')
  getStaffRevenue(@Query() query: StaffRevenueQueryDto) {
    return this.financeService.getStaffRevenue(query);
  }
}
