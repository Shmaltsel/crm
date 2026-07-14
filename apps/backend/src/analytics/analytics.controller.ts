import { Controller, Get, Put, Query, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
  ApiProperty,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString, IsInt, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class RevenueByMonthDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class YearQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class ProfitByCityDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class SalaryFundDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  month?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;
}

class CityLeaderboardDto {
  @ApiPropertyOptional({ default: 'events' })
  @IsOptional()
  @IsString()
  metric?: string = 'events';

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class RoiDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;
}

class SetTargetDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  year!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  month!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  target!: number;
}

@ApiTags('Analytics')
@ApiCookieAuth('access_token')
@Controller('analytics')
@UseGuards(AuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Дохід по місяцях' })
  @Get('revenue-by-month')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async revenueByMonth(
    @CurrentUser() user: JwtUser,
    @Query() query: RevenueByMonthDto,
  ) {
    const effectiveCityId = await this.resolveCityId(user, query.cityId);
    return this.analyticsService.revenueByMonth(
      effectiveCityId,
      query.projectId,
      query.year,
    );
  }

  @ApiOperation({ summary: 'Дохід по місяцях з розбивкою по містах' })
  @Get('revenue-by-city-month')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async revenueByCityMonth(@Query() query: RevenueByMonthDto) {
    return this.analyticsService.revenueByCityMonth(query.projectId, query.year);
  }

  @ApiOperation({ summary: 'Події по містах' })
  @Get('events-by-city')
  @Roles('SUPERADMIN', 'OWNER')
  async eventsByCity(@Query() query: YearQueryDto) {
    return this.analyticsService.eventsByCity(query.year);
  }

  @ApiOperation({ summary: 'Прибуток по містах' })
  @Get('profit-by-city')
  @Roles('SUPERADMIN', 'OWNER')
  async profitByCity(@Query() query: ProfitByCityDto) {
    return this.analyticsService.profitByCity(query.cityId, query.year);
  }

  @ApiOperation({ summary: 'Фонд зарплати' })
  @Get('salary-fund')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async salaryFund(
    @CurrentUser() user: JwtUser,
    @Query() query: SalaryFundDto,
  ) {
    const effectiveCityId = await this.resolveCityId(user, query.cityId);
    return this.analyticsService.salaryFund(
      query.month,
      query.year,
      effectiveCityId,
    );
  }

  @ApiOperation({ summary: 'Рейтинг міст за метрикою' })
  @Get('city-leaderboard')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async cityLeaderboard(@Query() query: CityLeaderboardDto) {
    return this.analyticsService.cityLeaderboard(query.metric, query.year);
  }

  @ApiOperation({ summary: 'ROI' })
  @Get('roi')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async roi(@CurrentUser() user: JwtUser, @Query() query: RoiDto) {
    const effectiveCityId = await this.resolveCityId(user, query.cityId);
    return this.analyticsService.roi(effectiveCityId, query.year);
  }

  @ApiOperation({ summary: 'Топ менеджерів за кількістю затверджених звітів' })
  @Get('kpi/managers')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async kpiManagers() {
    return this.analyticsService.kpiManagers();
  }

  @ApiOperation({ summary: 'Топ ведучих за рейтингом' })
  @Get('kpi/hosts')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async kpiHosts() {
    return this.analyticsService.kpiHosts();
  }

  @ApiOperation({ summary: 'Топ проєктів за подіями' })
  @Get('kpi/projects')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async kpiProjects() {
    return this.analyticsService.kpiProjects();
  }

  @ApiOperation({ summary: 'Цілі аналітики' })
  @Get('targets')
  @Roles('SUPERADMIN', 'OWNER')
  async getTargets(@Query() query: YearQueryDto) {
    return this.analyticsService.getTargets(query.year);
  }

  @ApiOperation({ summary: 'Встановити ціль аналітики' })
  @Put('targets')
  @Roles('SUPERADMIN', 'OWNER')
  async setTarget(@Body() dto: SetTargetDto) {
    return this.analyticsService.setTarget(dto.year, dto.month, dto.target);
  }

  private async resolveCityId(
    user: JwtUser,
    requestedCityId?: string,
  ): Promise<string | undefined> {
    if (user.role === 'SUPERADMIN' || user.role === 'OWNER') {
      return requestedCityId;
    }
    const me = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    return me?.cityId ?? undefined;
  }
}
