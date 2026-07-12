import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { FinanceDashboardQueryDto } from './dto/finance-dashboard-query.dto';
import { StaffRevenueQueryDto } from './dto/staff-revenue-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Finance')
@ApiCookieAuth('access_token')
@Controller('finance')
@UseGuards(AuthGuard, RolesGuard)
export class FinanceController {
  constructor(
    private readonly financeService: FinanceService,
    private readonly prisma: PrismaService,
  ) {}

  private async resolveCityId(
    user: JwtUser,
    requestedCityId?: string,
  ): Promise<string | undefined> {
    if (user.role === 'SUPERADMIN' || user.role === 'OWNER')
      return requestedCityId;
    const me = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    return me?.cityId ?? undefined;
  }

  @ApiOperation({ summary: 'Фінансовий дашборд (KPI, динаміка, топ)' })
  @Get('dashboard')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getDashboard(
    @Query() query: FinanceDashboardQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    const cityId = await this.resolveCityId(user, query.cityId);
    return this.financeService.getDashboard({
      period: query.period,
      cityId,
      project: query.project,
      minimal: query.minimal === 'true',
    });
  }

  @ApiOperation({ summary: 'Баланс поточного користувача' })
  @Get('my-balance')
  getMyBalance(@CurrentUser() user: JwtUser) {
    return this.financeService.getMyBalance(user.sub);
  }

  @ApiOperation({ summary: 'Звірка балансу: user.balance vs SUM(PAID salary)' })
  @Get('balance-reconciliation')
  reconcileBalance(@CurrentUser() user: JwtUser) {
    return this.financeService.reconcileBalance(user.sub);
  }

  @ApiOperation({ summary: 'Виручка по співробітниках' })
  @Get('staff-revenue')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getStaffRevenue(
    @Query() query: StaffRevenueQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    const cityId = await this.resolveCityId(user, query.cityId);
    return this.financeService.getStaffRevenue({ ...query, cityId });
  }
}
