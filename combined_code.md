# Зібраний код проєкту

### `apps/backend/src/auth/auth.controller.ts`

```typescript
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
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

@Controller('cities')
@UseGuards(AuthGuard, RolesGuard)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: { name: string }) {
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
  createCrew(
    @Param('id') id: string,
    @Body() body: { name: string; hostId: string; driverId: string },
  ) {
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

### `apps/backend/src/dashboard/dashboard.controller.ts`

```typescript
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    const effectiveCityId = user.role === 'SUPERADMIN' ? undefined : cityId;
    return this.dashboardService.getSummary(effectiveCityId, user.role);
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

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Список подій для поточного користувача.
  // Для водіїв/ведучих повертаються лише ті події, де вони у складі екіпажу.
  // Для менеджерів/адмінів — усі події.
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
  assignCrew(
    @Param('id') id: string,
    @Body() body: { crewId: string }, // ЗМІНЕНО
  ) {
    return this.eventsService.assignCrewToEvent(id, body.crewId);
  }

  @Post(':id/history')
  addHistoryComment(
    @Param('id') id: string,
    @Body() body: { comment: string },
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.addHistoryComment(id, body.comment, user);
  }

  // Маршрут для оновлення коментаря
  @Patch('history/:historyId')
  updateHistoryComment(
    @Param('historyId') historyId: string,
    @Body() body: { comment: string },
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

### `apps\backend\src\events\dto\create-event.dto.ts`

```typescript
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenPlanned?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  equipment?: string;

  @IsOptional()
  @IsString()
  nextProject?: string;

  @IsOptional()
  @IsString()
  responsibleId?: string;
}

```

---

### `apps\backend\src\events\dto\reschedule-event.dto.ts`

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class RescheduleEventDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}

```

---

### `apps\backend\src\events\dto\submit-report.dto.ts`

```typescript
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExpenseItemDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}

export class SalaryItemDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsString()
  role?: string;
}

export class SubmitReportDto {
  @IsBoolean()
  announcementDone: boolean;

  @IsBoolean()
  materialShown: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  classesCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  privilegedCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  showingsCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSum: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  schoolSum: number;

  @IsNumber()
  @Type(() => Number)
  remainderSum: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseItemDto)
  expenses: ExpenseItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryItemDto)
  salaries: SalaryItemDto[];
}

```

---

### `apps\backend\src\events\dto\update-preparation.dto.ts`

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePreparationDto {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

```

---

### `apps\backend\src\events\dto\update-status.dto.ts`

```typescript
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  actionName: string;

  @IsOptional()
  @IsString()
  comment?: string;
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
  @IsPositive() // Гарантує, що сума витрат буде > 0
  amount: number;

  @IsString()
  @IsNotEmpty()
  reportId: string;
}

```

---

### `apps/backend/src/issues/issues.controller.ts`

```typescript
import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('issues')
@UseGuards(AuthGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() body: {
    eventId: string;
    schoolName: string;
    eventName: string;
    message: string;
    cityId: string;
  }) {
    return this.issuesService.create(body);
  }

  @Get()
  findByCityId(@Query('cityId') cityId: string) {
    return this.issuesService.findByCityId(cityId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.issuesService.updateStatus(id, body.status);
  }
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
  create(@Body() body: { name: string; color: string }) {
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
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @Post('bulk-import')
  @Roles('SUPERADMIN', 'MANAGER')
  bulkImport(@Body() body: { cityId: string; type?: string }) {
    return this.schoolsService.bulkImport(
      body.cityId,
      (body.type as 'Школа' | 'Садочок') || 'Школа',
    );
  }

  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      type: string;
      cityId: string;
      sourceUrl?: string;
    },
  ) {
    return this.schoolsService.create(body);
  }

  @Get() findAll(@Query('minimal') minimal?: string) {
    return this.schoolsService.findAll(minimal === 'true');
  }

  // ⚠️ ВАЖЛИВО: цей маршрут МАЄ стояти ДО @Get(':id')
  @Get('search')
  search(@Query('q') q: string, @Query('type') type: string) {
    return this.parserService.searchSchools(q, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
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
  create(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('seed')
  seedAdmin() {
    return this.usersService.seedAdmin();
  }

  @Get('seed-vasya')
  seedVasya() {
    return this.usersService.seedVasya();
  }
}

```

---

### `apps/backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String       @id @default(uuid())
  name           String
  email          String       @unique
  phone          String?
  password       String
  role           String       @default("MANAGER")
  cityId         String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  telegramId     String?
  telegramChatId String?
  car            String?
  balance        Float        @default(0)
  managedCities  City[]       @relation("CityManager")
  crewAsDriver   Crew[]       @relation("DriverCrew")
  crewAsHost     Crew[]       @relation("HostCrew")
  city           City?        @relation(fields: [cityId], references: [id])
  salaryItems    SalaryItem[]
}

model City {
  id        String        @id @default(uuid())
  name      String
  managerId String?
  createdAt DateTime      @default(now())
  manager   User?         @relation("CityManager", fields: [managerId], references: [id])
  crews     Crew[]
  events    Event[]
  issues    IssueReport[]
  schools   School[]
  users     User[]
}

model School {
  id            String   @id @default(uuid())
  name          String
  type          String
  cityId        String
  address       String?
  director      String?
  phone         String?
  email         String?
  notes         String?
  childrenCount Int?
  isHotClient   Boolean  @default(false)
  rating        Float?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  events        Event[]
  city          City     @relation(fields: [cityId], references: [id])

  @@index([cityId])
}

model Crew {
  id        String   @id @default(uuid())
  name      String
  cityId    String
  hostId    String?
  driverId  String?
  car       String?
  carPlate  String?
  phone     String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  city      City     @relation(fields: [cityId], references: [id])
  driver    User?    @relation("DriverCrew", fields: [driverId], references: [id])
  host      User?    @relation("HostCrew", fields: [hostId], references: [id])
  events    Event[]
}

model Event {
  id              String            @id @default(uuid())
  cityId          String
  schoolId        String
  crewId          String?
  project         String
  date            DateTime
  time            String?
  status          EventStatus       @default(BASE)
  childrenPlanned Int?
  childrenActual  Int?
  price           Float?
  received        Float?
  paymentMethod   String?
  address         String?
  contactPerson   String?
  contactPhone    String?
  equipment       String?
  nextContact     DateTime?
  nextProject     String?
  responsibleId   String?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  city            City              @relation(fields: [cityId], references: [id])
  crew            Crew?             @relation(fields: [crewId], references: [id])
  school          School            @relation(fields: [schoolId], references: [id])
  history         EventHistory[]
  preparation     EventPreparation?
  report          EventReport?
  files           File[]
  issues          IssueReport[]

  @@index([cityId])
  @@index([status])
  @@index([schoolId])
}

model EventReport {
  id                String        @id @default(uuid())
  eventId           String        @unique
  directorSatisfied Boolean?
  teachersSatisfied Boolean?
  hadIssues         Boolean       @default(false)
  comment           String?
  rating            Float?
  createdAt         DateTime      @default(now())
  announcementDone  Boolean       @default(false)
  materialShown     Boolean       @default(false)
  childrenCount     Int           @default(0)
  classesCount      Int           @default(0)
  privilegedCount   Int           @default(0)
  showingsCount     Int           @default(0)
  totalSum          Float         @default(0)
  schoolSum         Float         @default(0)
  remainderSum      Float         @default(0)
  event             Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)
  photos            File[]
  expenseItems      ExpenseItem[]
  salaryItems       SalaryItem[]
}

model File {
  id        String       @id @default(uuid())
  name      String
  url       String
  size      Int
  eventId   String?
  reportId  String?
  createdAt DateTime     @default(now())
  event     Event?       @relation(fields: [eventId], references: [id])
  report    EventReport? @relation(fields: [reportId], references: [id])
}

model EventHistory {
  id        String   @id @default(uuid())
  eventId   String
  action    String
  comment   String?
  userId    String
  userName  String
  role      String
  createdAt DateTime @default(now())
  event     Event    @relation(fields: [eventId], references: [id])
}

model EventPreparation {
  id               String @id @default(uuid())
  eventId          String @unique
  assignCrew       String @default("Заплановано")
  bookEquipment    String @default("Заплановано")
  prepareDocs      String @default("Заплановано")
  prepareMaterials String @default("Заплановано")
  remindSchool     String @default("Заплановано")
  event            Event  @relation(fields: [eventId], references: [id])
}

model IssueReport {
  id               String    @id @default(uuid())
  eventId          String
  schoolName       String
  eventName        String
  message          String
  cityId           String
  status           String    @default("Планується")
  createdAt        DateTime  @default(now())
  deadline         DateTime?
  assignedUserId   String?
  assignedUserName String?
  city             City      @relation(fields: [cityId], references: [id])
  event            Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@index([cityId])
}

model SchoolContact {
  id           String   @id @default(uuid())
  city         String   @default("Львів")
  schoolNumber String
  contactName  String
  phone        String
  role         String?
  createdAt    DateTime @default(now())
}

model Project {
  id        String   @id @default(uuid())
  name      String   @unique
  color     String   @default("blue")
  createdAt DateTime @default(now())
}

model ExpenseItem {
  id        String   @id @default(uuid())
  reportId  String
  category  String // "Транспорт", "Матеріали", "Реклама" тощо
  name      String?
  amount    Decimal  @db.Decimal(12, 2)
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)

  @@index([reportId])
}

model SalaryItem {
  id        String   @id @default(uuid())
  reportId  String
  userId    String?
  userName  String
  amount    Decimal  @db.Decimal(12, 2)
  role      String? // "ведучий", "водій"
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
  user   User?       @relation(fields: [userId], references: [id])

  @@index([reportId])
  @@index([userId])
}

enum EventStatus {
  BASE
  FIRST_CONTACT
  INTERESTED
  PRE_APPROVAL
  DATE_CONFIRMED
  PREPARATION
  IN_PROGRESS
  DONE
  REPORT
  RE_SALE
}

```

---

