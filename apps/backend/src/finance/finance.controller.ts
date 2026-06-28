import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Controller('finance')
@UseGuards(AuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('dashboard')
  getDashboard(
    @Query('period') period: string,
    @Query('cityId') cityId: string,
    @Query('project') project: string,
    @Query('minimal') minimal: string,
  ) {
    return this.financeService.getDashboard({
      period,
      cityId,
      project,
      minimal: minimal === 'true',
    });
  }

  @Get('my-balance')
  getMyBalance(@CurrentUser() user: JwtUser) {
    return this.financeService.getMyBalance(user.sub);
  }

  @Get('staff-revenue')
  getStaffRevenue(
    @Query('period') period: string,
    @Query('cityId') cityId: string,
  ) {
    return this.financeService.getStaffRevenue({ period, cityId });
  }
}
