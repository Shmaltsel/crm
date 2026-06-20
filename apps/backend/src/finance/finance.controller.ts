import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('finance')
@UseGuards(AuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('dashboard')
  getDashboard(
    @Query('period') period: string,
    @Query('cityId') cityId: string,
    @Query('project') project: string,
  ) {
    return this.financeService.getDashboard({ period, cityId, project });
  }
}
