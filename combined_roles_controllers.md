# Файли Roles Guard та Контролерів

### `apps/backend/src/auth/guards/roles.guard.ts`

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!requiredRoles.includes(user?.role)) {
      throw new ForbiddenException('Недостатньо прав');
    }
    return true;
  }
}

```

---

### `apps/backend/src/auth/decorators/roles.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

```

---

### `apps/backend/src/auth/interfaces/jwt-user.interface.ts`

```typescript
export interface JwtUser {
  sub: string;
  name: string;
  role: string;
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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BulkImportDto } from './dto/bulk-import.dto';
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @Post('bulk-import')
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

  @Get() findAll(@Query('minimal') minimal?: string) {
    return this.schoolsService.findAll(minimal === 'true');
  }

  @Get('search')
  search(@Query('q') q: string, @Query('type') type: string) {
    return this.parserService.searchSchools(q, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.update(id, body);
  }

  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @Get('contacts/search')
  searchContacts(@Query('q') q: string, @Query('city') city: string) {
    return this.schoolsService.searchContacts(q, city);
  }
}

```

---

### `apps/backend/src/events/events.controller.ts`

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
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { SubmitReportDto } from './dto/submit-report.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdatePreparationDto } from './dto/update-preparation.dto';
import { RescheduleEventDto } from './dto/reschedule-event.dto';
import { AssignCrewDto } from './dto/assign-crew.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('events')
@UseGuards(AuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.eventsService.findAllForUser(user);
  }

  @Post()
  create(@Body() body: CreateEventDto, @CurrentUser() user: JwtUser) {
    return this.eventsService.create(body, user);
  }

  @Get('school/:schoolId')
  findBySchool(
    @Param('schoolId') schoolId: string,
    @Query('minimal') minimal?: string,
  ) {
    return this.eventsService.findBySchool(schoolId, minimal === 'true');
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.updateStatus(
      id,
      body.status,
      body.actionName,
      body.comment,
      user,
    );
  }

  @Patch(':id/preparation')
  updatePreparation(
    @Param('id') id: string,
    @Body() body: UpdatePreparationDto,
  ) {
    return this.eventsService.updatePreparationStatus(
      id,
      body.field,
      body.status,
    );
  }

  @Post(':id/assign-crew')
  assignCrew(@Param('id') id: string, @Body() body: AssignCrewDto) {
    return this.eventsService.assignCrewToEvent(id, body.crewId);
  }

  @Post(':id/history')
  addHistoryComment(
    @Param('id') id: string,
    @Body() body: AddCommentDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.addHistoryComment(id, body.comment, user);
  }

  @Patch('history/:historyId')
  updateHistoryComment(
    @Param('historyId') historyId: string,
    @Body() body: AddCommentDto,
  ) {
    return this.eventsService.updateHistoryComment(historyId, body.comment);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/report')
  submitReport(
    @Param('id') id: string,
    @Body() body: SubmitReportDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.submitReport(id, body, user);
  }

  @Get('school/:schoolId/completed')
  findCompletedBySchool(@Param('schoolId') schoolId: string) {
    return this.eventsService.findCompletedBySchool(schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id/reschedule')
  reschedule(
    @Param('id') id: string,
    @Body() body: RescheduleEventDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
  }
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

```

---

### `apps/backend/src/cities/cities.controller.ts`

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
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateCrewDto } from './dto/create-crew.dto';

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
  @Post(':id/crews')
  @Roles('SUPERADMIN', 'MANAGER')
  createCrew(@Param('id') id: string, @Body() body: CreateCrewDto) {
    return this.citiesService.createCrew(id, body);
  }

  @Delete('crews/:crewId')
  @Roles('SUPERADMIN', 'MANAGER')
  deleteCrew(@Param('crewId') crewId: string) {
    return this.citiesService.deleteCrew(crewId);
  }
}

```

---

