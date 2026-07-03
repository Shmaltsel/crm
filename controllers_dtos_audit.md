# Аудит: Контролери та DTO

### `apps/backend/src/schools/dto/bulk-import.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class BulkImportDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

---

### `apps/backend/src/schools/dto/create-school.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;
}

```

---

### `apps/backend/src/schools/dto/find-contacts-query.dto.ts`

```typescript
import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindContactsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  q?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

```

---

### `apps/backend/src/schools/dto/find-schools-query.dto.ts`

```typescript
import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class FindSchoolsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  q?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

---

### `apps/backend/src/schools/dto/school-query.dto.ts`

```typescript
import { IsOptional, IsIn, IsString } from 'class-validator';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class SchoolQueryDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';

  @IsOptional()
  @IsIn(['new', 'planned', 'inProgress', 'done'])
  stage?: 'new' | 'planned' | 'inProgress' | 'done';

  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  size?: 'small' | 'medium' | 'large';
}

```

---

### `apps/backend/src/schools/dto/update-school.dto.ts`

```typescript
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEmail,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSchoolDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  childrenCount?: number;

  @IsOptional()
  @IsBoolean()
  isHotClient?: boolean;
}

```

---

### `apps/backend/src/schools/schools.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { Throttle } from '@nestjs/throttler';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BulkImportDto } from './dto/bulk-import.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { FindSchoolsQueryDto } from './dto/find-schools-query.dto';
import { FindContactsQueryDto } from './dto/find-contacts-query.dto';
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @Post('bulk-import')
  @Throttle({ default: { ttl: 300000, limit: 2 } })
  @Roles('SUPERADMIN', 'MANAGER')
  bulkImport(@Body() body: BulkImportDto) {
    return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
  }

  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @Post()
  @Roles('SUPERADMIN', 'MANAGER')
  create(@Body() body: CreateSchoolDto) {
    return this.schoolsService.create(body);
  }

  @Get()
  findAll(@Query() query: SchoolQueryDto) {
    return this.schoolsService.findAll(query);
  }

  @Get('stats')
  getStats(
    @Query('cityId') cityId?: string,
    @Query('type') type?: 'Школа' | 'Садочок',
    @Query('stage') stage?: 'new' | 'planned' | 'inProgress' | 'done',
  ) {
    return this.schoolsService.getStats({ cityId, type, stage });
  }

  @Get('search')
  search(@Query() query: FindSchoolsQueryDto) {
    return this.parserService.searchSchools(query.q ?? '', query.type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.update(id, body);
  }

  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @Get('contacts/search')
  searchContacts(@Query() query: FindContactsQueryDto) {
    return this.schoolsService.searchContacts(query.q ?? '', query.city);
  }
}

```

---

### `apps/backend/src/cities/cities.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateCrewDto } from './dto/create-crew.dto';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';

@Controller('cities')
@UseGuards(AuthGuard, RolesGuard)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body.name);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @Get(':id/crews')
  findCrews(@Param('id') id: string) {
    return this.citiesService.findCrews(id);
  }
  @Post(':id/crews')
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('city')
  createCrew(@Param('id') id: string, @Body() body: CreateCrewDto) {
    return this.citiesService.createCrew(id, body);
  }

  @Delete('crews/:crewId')
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('crew')
  deleteCrew(@Param('crewId') crewId: string) {
    return this.citiesService.deleteCrew(crewId);
  }
}

```

---

### `apps/backend/src/cities/dto/create-city.dto.ts`

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

```

---

### `apps/backend/src/cities/dto/create-crew.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCrewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  hostId?: string;

  @IsOptional()
  @IsString()
  driverId?: string;
}

```

---

### `apps/backend/src/finance/create-expense-item.dto.ts`

```typescript
import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExpenseItemDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  reportId: string;
}

```

---

### `apps/backend/src/finance/dto/finance-dashboard-query.dto.ts`

```typescript
import { IsOptional, IsString } from 'class-validator';

export class FinanceDashboardQueryDto {
  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  minimal?: string;
}

```

---

### `apps/backend/src/finance/dto/staff-revenue-query.dto.ts`

```typescript
import { IsOptional, IsString } from 'class-validator';

export class StaffRevenueQueryDto {
  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  cityId?: string;
}

```

---

### `apps/backend/src/finance/finance.controller.ts`

```typescript
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { FinanceDashboardQueryDto } from './dto/finance-dashboard-query.dto';
import { StaffRevenueQueryDto } from './dto/staff-revenue-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

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
    if (user.role === 'SUPERADMIN') return requestedCityId;
    const me = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    return me?.cityId ?? undefined;
  }

  @Get('dashboard')
  @Roles('SUPERADMIN', 'MANAGER')
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

  @Get('my-balance')
  getMyBalance(@CurrentUser() user: JwtUser) {
    return this.financeService.getMyBalance(user.sub);
  }

  @Get('staff-revenue')
  @Roles('SUPERADMIN', 'MANAGER')
  async getStaffRevenue(
    @Query() query: StaffRevenueQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    const cityId = await this.resolveCityId(user, query.cityId);
    return this.financeService.getStaffRevenue({ ...query, cityId });
  }
}

```

---

### `apps/backend/src/users/dto/create-user.dto.ts`

```typescript
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  @IsString()
  car?: string;
}

```

---

### `apps/backend/src/users/dto/update-user.dto.ts`

```typescript
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  @IsString()
  car?: string;
}

```

---

### `apps/backend/src/users/users.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

```

---

### `apps/backend/src/auth/auth.controller.ts`

```typescript
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

const isProd = process.env.NODE_ENV === 'production';

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  csrfToken: string,
) {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/auth',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.cookie('csrf_token', csrfToken, {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, user } = await this.authService.login(
      signInDto.email,
      signInDto.password,
      { ip: req.ip, userAgent: req.headers['user-agent'] },
    );
    const csrfToken = randomBytes(32).toString('hex');

    setAuthCookies(res, access_token, refresh_token, csrfToken);

    return { user };
  }

  @Throttle({ default: { ttl: 60000, limit: 20 } })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const oldToken = req.cookies?.refresh_token;
    if (!oldToken) throw new UnauthorizedException('Refresh token відсутній');

    const { access_token, refresh_token, user } =
      await this.authService.refresh(oldToken, {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      });
    const csrfToken = randomBytes(32).toString('hex');

    setAuthCookies(res, access_token, refresh_token, csrfToken);

    return { user };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    const payload = req['user'] as {
      sub: string;
      email: string;
      role: string;
      name: string;
    };
    return {
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) await this.authService.revokeRefreshToken(refreshToken);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/auth' });
    res.clearCookie('csrf_token');
    return { message: 'ok' };
  }
}

```

---

### `apps/backend/src/auth/dto/login.dto.ts`

```typescript
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

```

---

### `apps/backend/src/issues/dto/create-issue.dto.ts`

```typescript
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateIssueDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsString()
  assignedUserId?: string;

  @IsOptional()
  @IsString()
  assignedUserName?: string;
}

```

---

### `apps/backend/src/issues/dto/update-issue-status.dto.ts`

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateIssueStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}

```

---

### `apps/backend/src/issues/issues.controller.ts`

```typescript
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueStatusDto } from './dto/update-issue-status.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('issues')
@UseGuards(AuthGuard, RolesGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() body: CreateIssueDto) {
    return this.issuesService.create(body);
  }

  @Get()
  findByCityId(@Query('cityId') cityId: string) {
    return this.issuesService.findByCityId(cityId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateIssueStatusDto) {
    return this.issuesService.updateStatus(id, body.status);
  }
}

```

---

### `apps/backend/src/dashboard/dashboard.controller.ts`

```typescript
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

class DashboardSummaryQueryDto {
  @IsOptional()
  @IsString()
  cityId?: string;
}

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('summary')
  async getSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: DashboardSummaryQueryDto,
  ): Promise<DashboardSummary> {
    let effectiveCityId: string | undefined;
    if (user.role === 'SUPERADMIN') {
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

```

---

### `apps/backend/src/projects/dto/create-project.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;
}

```

---

### `apps/backend/src/projects/projects.controller.ts`

```typescript
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

```

---

