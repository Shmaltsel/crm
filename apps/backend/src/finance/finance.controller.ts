import { Controller, Get, Post, Patch, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { FinanceDashboardQueryDto } from './dto/finance-dashboard-query.dto';
import { StaffRevenueQueryDto } from './dto/staff-revenue-query.dto';
import { CreateManualExpenseDto } from './dto/create-manual-expense.dto';
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

  @ApiOperation({ summary: 'Загальний баланс компанії' })
  @Get('company-balance')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getCompanyBalance(
    @Query() query: FinanceDashboardQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    const cityId = await this.resolveCityId(user, query.cityId);
    return this.financeService.getCompanyBalance({
      period: query.period,
      cityId,
      project: query.project,
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

  @ApiOperation({ summary: 'Список ручних витрат' })
  @Get('manual-expenses')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getManualExpenses(
    @Query() query: { period?: string; cityId?: string; page?: string; take?: string },
    @CurrentUser() user: JwtUser,
  ) {
    const cityId = await this.resolveCityId(user, query.cityId);
    return this.financeService.getManualExpenses({
      period: query.period,
      cityId,
      page: query.page ? parseInt(query.page, 10) : 1,
      take: query.take ? parseInt(query.take, 10) : 20,
    });
  }

  @ApiOperation({ summary: 'Створити ручну витрату' })
  @Post('manual-expenses')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async createManualExpense(
    @Body() dto: CreateManualExpenseDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.financeService.createManualExpense(dto, user.sub);
  }

  @ApiOperation({ summary: 'Оновити ручну витрату' })
  @Patch('manual-expenses/:id')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async updateManualExpense(
    @Param('id') id: string,
    @Body() dto: Partial<CreateManualExpenseDto>,
    @CurrentUser() user: JwtUser,
  ) {
    return this.financeService.updateManualExpense(id, dto, user.sub, user.role);
  }

  @ApiOperation({ summary: 'Видалити ручну витрату' })
  @Delete('manual-expenses/:id')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async deleteManualExpense(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.financeService.deleteManualExpense(id, user.sub, user.role);
  }
}
