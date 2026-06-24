# Project Source Code

## Structure
```
├── .gitignore
├── README.md
├── apps
│   ├── backend
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── .prettierrc
│   │   ├── README.md
│   │   ├── eslint.config.mjs
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── prisma
│   │   │   ├── dev.db
│   │   │   ├── migrations
│   │   │   │   ├── 0_init
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260621171208_add_telegram_id
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260621174227_add_telegram_chat_id
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260621185332_add_school_contacts
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260623140450_add_car_field
│   │   │   │   │   └── migration.sql
│   │   │   │   └── migration_lock.toml
│   │   │   ├── schema.prisma
│   │   │   └── seed-admin.js
│   │   ├── src
│   │   │   ├── app.controller.spec.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.spec.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.spec.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── decorators
│   │   │   │   │   └── current-user.decorator.ts
│   │   │   │   └── interfaces
│   │   │   │       └── jwt-user.interface.ts
│   │   │   ├── cities
│   │   │   │   ├── cities.controller.spec.ts
│   │   │   │   ├── cities.controller.ts
│   │   │   │   ├── cities.module.ts
│   │   │   │   ├── cities.service.spec.ts
│   │   │   │   └── cities.service.ts
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.controller.ts
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   └── dashboard.service.ts
│   │   │   ├── events
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-event.dto.ts
│   │   │   │   │   └── submit-report.dto.ts
│   │   │   │   ├── events-scheduler.service.ts
│   │   │   │   ├── events.controller.spec.ts
│   │   │   │   ├── events.controller.ts
│   │   │   │   ├── events.module.ts
│   │   │   │   ├── events.service.spec.ts
│   │   │   │   └── events.service.ts
│   │   │   ├── finance
│   │   │   │   ├── finance.controller.ts
│   │   │   │   ├── finance.module.ts
│   │   │   │   └── finance.service.ts
│   │   │   ├── issues
│   │   │   │   ├── issues.controller.ts
│   │   │   │   ├── issues.module.ts
│   │   │   │   └── issues.service.ts
│   │   │   ├── main.ts
│   │   │   ├── prisma
│   │   │   │   ├── prisma.module.ts
│   │   │   │   ├── prisma.service.spec.ts
│   │   │   │   └── prisma.service.ts
│   │   │   ├── projects
│   │   │   │   ├── projects.controller.ts
│   │   │   │   ├── projects.module.ts
│   │   │   │   └── projects.service.ts
│   │   │   ├── schools
│   │   │   │   ├── parser.service.ts
│   │   │   │   ├── school-contacts.seed.ts
│   │   │   │   ├── schools.controller.spec.ts
│   │   │   │   ├── schools.controller.ts
│   │   │   │   ├── schools.module.ts
│   │   │   │   ├── schools.service.spec.ts
│   │   │   │   └── schools.service.ts
│   │   │   ├── telegram
│   │   │   │   ├── telegram.module.ts
│   │   │   │   └── telegram.service.ts
│   │   │   └── users
│   │   │       ├── users.controller.spec.ts
│   │   │       ├── users.controller.ts
│   │   │       ├── users.module.ts
│   │   │       ├── users.service.spec.ts
│   │   │       └── users.service.ts
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── .gitignore
│       ├── .lighthouseci
│       │   ├── assertion-results.json
│       │   └── links.json
│       ├── README.md
│       ├── eslint.config.js
│       ├── index.html
│       ├── lighthouserc.cjs
│       ├── package.json
│       ├── postcss.config.js
│       ├── public
│       │   ├── favicon.svg
│       │   ├── icons.svg
│       │   └── robots.txt
│       ├── src
│       │   ├── App.css
│       │   ├── App.tsx
│       │   ├── assets
│       │   │   ├── hero.png
│       │   │   ├── react.svg
│       │   │   └── vite.svg
│       │   ├── components
│       │   │   ├── AddressLink.tsx
│       │   │   ├── IssueCarousel.tsx
│       │   │   ├── Layout.tsx
│       │   │   ├── PhoneLink.tsx
│       │   │   ├── VirtualSchoolList.tsx
│       │   │   ├── cities
│       │   │   │   ├── CityDesktopGrid.tsx
│       │   │   │   ├── CityMobileHeader.tsx
│       │   │   │   └── CityMobileList.tsx
│       │   │   ├── city-profile
│       │   │   │   └── CityAnalytics.tsx
│       │   │   ├── dashboard
│       │   │   │   ├── ActivityFeed.tsx
│       │   │   │   ├── CitiesTable.tsx
│       │   │   │   ├── FunnelBar.tsx
│       │   │   │   ├── MonthlyKpi.tsx
│       │   │   │   ├── StaleSchools.tsx
│       │   │   │   ├── TodayEvents.tsx
│       │   │   │   └── UpcomingEvents.tsx
│       │   │   ├── finance
│       │   │   │   ├── FinanceCharts.tsx
│       │   │   │   └── StaffFinanceView.tsx
│       │   │   ├── school-profile
│       │   │   │   ├── AssignedCrew.tsx
│       │   │   │   ├── EventDetails.tsx
│       │   │   │   ├── EventPreparation.tsx
│       │   │   │   ├── EventsTable.tsx
│       │   │   │   ├── HistoryTimeline.tsx
│       │   │   │   ├── Pipeline.tsx
│       │   │   │   ├── SchoolInfoCard.tsx
│       │   │   │   ├── SchoolProfileHeader.tsx
│       │   │   │   └── modals
│       │   │   │       ├── CommentModal.tsx
│       │   │   │       ├── CrewModal.tsx
│       │   │   │       ├── EditSchoolModal.tsx
│       │   │   │       ├── EventModal.tsx
│       │   │   │       ├── IssueModal.tsx
│       │   │   │       ├── ReportModal.tsx
│       │   │   │       └── RescheduleModal.tsx
│       │   │   ├── schools
│       │   │   │   ├── SchoolDesktopTable.tsx
│       │   │   │   ├── SchoolMobileList.tsx
│       │   │   │   ├── StatsBar.tsx
│       │   │   │   ├── VirtualDesktopTable.tsx
│       │   │   │   └── schoolUtils.ts
│       │   │   └── ui
│       │   │       ├── OptimizedImage.tsx
│       │   │       └── Skeleton.tsx
│       │   ├── config
│       │   │   └── api.ts
│       │   ├── context
│       │   │   └── CityContext.tsx
│       │   ├── hooks
│       │   │   └── useAuth.ts
│       │   ├── index.css
│       │   ├── main.tsx
│       │   ├── pages
│       │   │   ├── CalendarView.tsx
│       │   │   ├── Cities.tsx
│       │   │   ├── CityProfile.tsx
│       │   │   ├── Dashboard.tsx
│       │   │   ├── Employees.tsx
│       │   │   ├── EventReport.tsx
│       │   │   ├── Events.tsx
│       │   │   ├── Finance.tsx
│       │   │   ├── Kindergartens.tsx
│       │   │   ├── Login.tsx
│       │   │   ├── SchoolProfile.tsx
│       │   │   └── Schools.tsx
│       │   └── types
│       │       └── index.ts
│       ├── tailwind.config.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vercel.json
│       └── vite.config.ts
├── bundle.js
├── package.json
├── packages
│   └── shared
├── pnpm-workspace.yaml
├── project_code.txt
└── project_code.xml
```

### File: apps/backend/prisma/schema.prisma
```prisma
  0 | generator client {
  1 |   provider = "prisma-client-js"
  2 | }
  3 | 
  4 | datasource db {
  5 |   provider = "postgresql"
  6 |   url      = env("DATABASE_URL")
  7 | }
  8 | 
  9 | model User {
 10 |   id             String   @id @default(uuid())
 11 |   name           String
 12 |   email          String   @unique
 13 |   phone          String?
 14 |   password       String
 15 |   role           String   @default("MANAGER")
 16 |   cityId         String?
 17 |   createdAt      DateTime @default(now())
 18 |   updatedAt      DateTime @updatedAt
 19 |   telegramId     String?
 20 |   telegramChatId String?
 21 |   car            String?
 22 |   balance        Float    @default(0)
 23 |   managedCities  City[]   @relation("CityManager")
 24 |   crewAsDriver   Crew[]   @relation("DriverCrew")
 25 |   crewAsHost     Crew[]   @relation("HostCrew")
 26 |   city           City?    @relation(fields: [cityId], references: [id])
 27 | }
 28 | 
 29 | model City {
 30 |   id        String        @id @default(uuid())
 31 |   name      String
 32 |   managerId String?
 33 |   createdAt DateTime      @default(now())
 34 |   manager   User?         @relation("CityManager", fields: [managerId], references: [id])
 35 |   crews     Crew[]
 36 |   events    Event[]
 37 |   issues    IssueReport[]
 38 |   schools   School[]
 39 |   users     User[]
 40 | }
 41 | 
 42 | model School {
 43 |   id            String   @id @default(uuid())
 44 |   name          String
 45 |   type          String
 46 |   cityId        String
 47 |   address       String?
 48 |   director      String?
 49 |   phone         String?
 50 |   email         String?
 51 |   notes         String?
 52 |   childrenCount Int?
 53 |   isHotClient   Boolean  @default(false)
 54 |   rating        Float?
 55 |   createdAt     DateTime @default(now())
 56 |   updatedAt     DateTime @updatedAt
 57 |   events        Event[]
 58 |   city          City     @relation(fields: [cityId], references: [id])
 59 | 
 60 |   @@index([cityId])
 61 | }
 62 | 
 63 | model Crew {
 64 |   id        String   @id @default(uuid())
 65 |   name      String
 66 |   cityId    String
 67 |   hostId    String?
 68 |   driverId  String?
 69 |   car       String?
 70 |   carPlate  String?
 71 |   phone     String?
 72 |   isActive  Boolean  @default(true)
 73 |   createdAt DateTime @default(now())
 74 |   city      City     @relation(fields: [cityId], references: [id])
 75 |   driver    User?    @relation("DriverCrew", fields: [driverId], references: [id])
 76 |   host      User?    @relation("HostCrew", fields: [hostId], references: [id])
 77 |   events    Event[]
 78 | }
 79 | 
 80 | model Event {
 81 |   id              String            @id @default(uuid())
 82 |   cityId          String
 83 |   schoolId        String
 84 |   crewId          String?
 85 |   project         String
 86 |   date            DateTime
 87 |   time            String?
 88 |   status          EventStatus       @default(BASE)
 89 |   childrenPlanned Int?
 90 |   childrenActual  Int?
 91 |   price           Float?
 92 |   received        Float?
 93 |   paymentMethod   String?
 94 |   address         String?
 95 |   contactPerson   String?
 96 |   contactPhone    String?
 97 |   equipment       String?
 98 |   nextContact     DateTime?
 99 |   nextProject     String?
100 |   responsibleId   String?
101 |   createdAt       DateTime          @default(now())
102 |   updatedAt       DateTime          @updatedAt
103 |   city            City              @relation(fields: [cityId], references: [id])
104 |   crew            Crew?             @relation(fields: [crewId], references: [id])
105 |   school          School            @relation(fields: [schoolId], references: [id])
106 |   history         EventHistory[]
107 |   preparation     EventPreparation?
108 |   report          EventReport?
109 |   files           File[]
110 |   issues          IssueReport[]
111 | 
112 |   @@index([cityId])
113 |   @@index([status])
114 |   @@index([schoolId])
115 | }
116 | 
117 | model EventReport {
118 |   id                String   @id @default(uuid())
119 |   eventId           String   @unique
120 |   directorSatisfied Boolean?
121 |   teachersSatisfied Boolean?
122 |   hadIssues         Boolean  @default(false)
123 |   comment           String?
124 |   rating            Float?
125 |   createdAt         DateTime @default(now())
126 |   announcementDone  Boolean  @default(false)
127 |   materialShown     Boolean  @default(false)
128 |   childrenCount     Int      @default(0)
129 |   classesCount      Int      @default(0)
130 |   privilegedCount   Int      @default(0)
131 |   showingsCount     Int      @default(0)
132 |   totalSum          Float    @default(0)
133 |   schoolSum         Float    @default(0)
134 |   expenses          Json     @default("[]")
135 |   remainderSum      Float    @default(0)
136 |   salaries          Json     @default("[]")
137 |   event             Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)
138 |   photos            File[]
139 | }
140 | 
141 | model File {
142 |   id        String       @id @default(uuid())
143 |   name      String
144 |   url       String
145 |   size      Int
146 |   eventId   String?
147 |   reportId  String?
148 |   createdAt DateTime     @default(now())
149 |   event     Event?       @relation(fields: [eventId], references: [id])
150 |   report    EventReport? @relation(fields: [reportId], references: [id])
151 | }
152 | 
153 | model EventHistory {
154 |   id        String   @id @default(uuid())
155 |   eventId   String
156 |   action    String
157 |   comment   String?
158 |   userId    String
159 |   userName  String
160 |   role      String
161 |   createdAt DateTime @default(now())
162 |   event     Event    @relation(fields: [eventId], references: [id])
163 | }
164 | 
165 | model EventPreparation {
166 |   id               String @id @default(uuid())
167 |   eventId          String @unique
168 |   assignCrew       String @default("Заплановано")
169 |   bookEquipment    String @default("Заплановано")
170 |   prepareDocs      String @default("Заплановано")
171 |   prepareMaterials String @default("Заплановано")
172 |   remindSchool     String @default("Заплановано")
173 |   event            Event  @relation(fields: [eventId], references: [id])
174 | }
175 | 
176 | model IssueReport {
177 |   id               String    @id @default(uuid())
178 |   eventId          String
179 |   schoolName       String
180 |   eventName        String
181 |   message          String
182 |   cityId           String
183 |   status           String    @default("Планується")
184 |   createdAt        DateTime  @default(now())
185 |   deadline         DateTime?
186 |   assignedUserId   String?
187 |   assignedUserName String?
188 |   city             City      @relation(fields: [cityId], references: [id])
189 |   event            Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)
190 | 
191 |   @@index([cityId])
192 | }
193 | 
194 | model SchoolContact {
195 |   id           String   @id @default(uuid())
196 |   city         String   @default("Львів")
197 |   schoolNumber String
198 |   contactName  String
199 |   phone        String
200 |   role         String?
201 |   createdAt    DateTime @default(now())
202 | }
203 | 
204 | model Project {
205 |   id        String   @id @default(uuid())
206 |   name      String   @unique
207 |   color     String   @default("blue")
208 |   createdAt DateTime @default(now())
209 | }
210 | 
211 | enum EventStatus {
212 |   BASE
213 |   FIRST_CONTACT
214 |   INTERESTED
215 |   PRE_APPROVAL
216 |   DATE_CONFIRMED
217 |   PREPARATION
218 |   IN_PROGRESS
219 |   DONE
220 |   REPORT
221 |   RE_SALE
222 | }
223 | 
```

### File: apps/backend/prisma/seed-admin.js
```js
  0 | const { PrismaClient } = require('@prisma/client');
  1 | const bcrypt = require('bcrypt');
  2 | 
  3 | const prisma = new PrismaClient();
  4 | 
  5 | async function main() {
  6 |   const email = 'admin@crm.com';
  7 |   const password = 'admin123';
  8 |   const hashedPassword = await bcrypt.hash(password, 10);
  9 | 
 10 |   console.log('Починаю створення адміна...');
 11 | 
 12 |   const admin = await prisma.user.upsert({
 13 |     where: { email: email },
 14 |     update: { password: hashedPassword },
 15 |     create: {
 16 |       name: 'Адміністратор',
 17 |       email: email,
 18 |       password: hashedPassword,
 19 |       role: 'SUPERADMIN',
 20 |     },
 21 |   });
 22 | 
 23 |   console.log('Адмін успішно створений або оновлений:', admin.email);
 24 | }
 25 | 
 26 | main()
 27 |   .catch((e) => {
 28 |     console.error('Помилка під час сідування:', e);
 29 |     process.exit(1);
 30 |   })
 31 |   .finally(async () => {
 32 |     await prisma.$disconnect();
 33 |   });
```

### File: apps/backend/src/app.controller.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { AppController } from './app.controller';
  2 | import { AppService } from './app.service';
  3 | 
  4 | describe('AppController', () => {
  5 |   let appController: AppController;
  6 | 
  7 |   beforeEach(async () => {
  8 |     const app: TestingModule = await Test.createTestingModule({
  9 |       controllers: [AppController],
 10 |       providers: [AppService],
 11 |     }).compile();
 12 | 
 13 |     appController = app.get<AppController>(AppController);
 14 |   });
 15 | 
 16 |   describe('root', () => {
 17 |     it('should return "Hello World!"', () => {
 18 |       expect(appController.getHello()).toBe('Hello World!');
 19 |     });
 20 |   });
 21 | });
 22 | 
```

### File: apps/backend/src/app.controller.ts
```ts
  0 | import { Controller, Get } from '@nestjs/common';
  1 | import { AppService } from './app.service';
  2 | 
  3 | @Controller()
  4 | export class AppController {
  5 |   constructor(private readonly appService: AppService) {}
  6 | 
  7 |   @Get()
  8 |   getHello(): string {
  9 |     return this.appService.getHello();
 10 |   }
 11 | }
 12 | 
```

### File: apps/backend/src/app.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { AppController } from './app.controller';
  2 | import { AppService } from './app.service';
  3 | import { PrismaModule } from './prisma/prisma.module';
  4 | import { UsersModule } from './users/users.module';
  5 | import { AuthModule } from './auth/auth.module';
  6 | import { EventsModule } from './events/events.module';
  7 | import { CitiesModule } from './cities/cities.module';
  8 | import { SchoolsModule } from './schools/schools.module';
  9 | import { FinanceModule } from './finance/finance.module';
 10 | import { TelegramModule } from './telegram/telegram.module';
 11 | import { IssuesModule } from './issues/issues.module';
 12 | import { DashboardModule } from './dashboard/dashboard.module';
 13 | import { ProjectsModule } from './projects/projects.module';
 14 | @Module({
 15 |   imports: [
 16 |     PrismaModule,
 17 |     UsersModule,
 18 |     AuthModule,
 19 |     EventsModule,
 20 |     CitiesModule,
 21 |     SchoolsModule,
 22 |     FinanceModule,
 23 |     FinanceModule,
 24 |     TelegramModule,
 25 |     IssuesModule,
 26 |     DashboardModule,
 27 |     ProjectsModule,
 28 |   ],
 29 |   controllers: [AppController],
 30 |   providers: [AppService],
 31 | })
 32 | export class AppModule {}
 33 | 
```

### File: apps/backend/src/app.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | 
  2 | @Injectable()
  3 | export class AppService {
  4 |   getHello(): string {
  5 |     return 'Hello World!';
  6 |   }
  7 | }
  8 | 
```

### File: apps/backend/src/auth/auth.controller.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { AuthController } from './auth.controller';
  2 | 
  3 | describe('AuthController', () => {
  4 |   let controller: AuthController;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       controllers: [AuthController],
  9 |     }).compile();
 10 | 
 11 |     controller = module.get<AuthController>(AuthController);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(controller).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/auth/auth.controller.ts
```ts
  0 | import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
  1 | import { AuthService } from './auth.service';
  2 | 
  3 | @Controller('auth')
  4 | export class AuthController {
  5 |   constructor(private authService: AuthService) {}
  6 | 
  7 |   @HttpCode(HttpStatus.OK)
  8 |   @Post('login')
  9 |   login(@Body() signInDto: Record<string, any>) {
 10 |     return this.authService.login(signInDto.email, signInDto.password);
 11 |   }
 12 | }
 13 | 
```

### File: apps/backend/src/auth/auth.guard.ts
```ts
  0 | import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
  1 | import { JwtService } from '@nestjs/jwt';
  2 | import { Request } from 'express';
  3 | 
  4 | @Injectable()
  5 | export class AuthGuard implements CanActivate {
  6 |   constructor(private jwtService: JwtService) {}
  7 | 
  8 |   async canActivate(context: ExecutionContext): Promise<boolean> {
  9 |     const request = context.switchToHttp().getRequest();
 10 |     const token = this.extractTokenFromHeader(request);
 11 |     
 12 |     if (!token) throw new UnauthorizedException('Токен не знайдено');
 13 | 
 14 |     try {
 15 |       // Розшифровуємо токен
 16 |       const payload = await this.jwtService.verifyAsync(token, {
 17 |         secret: process.env.JWT_SECRET || 'super-secret-key-for-dev',
 18 |       });
 19 |       // Чіпляємо розшифровані дані до запиту
 20 |       request['user'] = payload;
 21 |     } catch {
 22 |       throw new UnauthorizedException('Недійсний токен');
 23 |     }
 24 |     return true;
 25 |   }
 26 | 
 27 |   private extractTokenFromHeader(request: Request): string | undefined {
 28 |     const [type, token] = request.headers.authorization?.split(' ') ?? [];
 29 |     return type === 'Bearer' ? token : undefined;
 30 |   }
 31 | }
```

### File: apps/backend/src/auth/auth.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { AuthService } from './auth.service';
  2 | import { AuthController } from './auth.controller';
  3 | import { UsersModule } from '../users/users.module';
  4 | import { JwtModule } from '@nestjs/jwt';
  5 | 
  6 | @Module({
  7 |   imports: [
  8 |     UsersModule,
  9 |     JwtModule.register({
 10 |       global: true,
 11 |       secret: process.env.JWT_SECRET || 'super-secret-key-for-dev',
 12 |       signOptions: { expiresIn: '7d' }, // Токен діятиме 7 днів
 13 |     }),
 14 |   ],
 15 |   providers: [AuthService],
 16 |   controllers: [AuthController],
 17 | })
 18 | export class AuthModule {}
 19 | 
```

### File: apps/backend/src/auth/auth.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { AuthService } from './auth.service';
  2 | 
  3 | describe('AuthService', () => {
  4 |   let service: AuthService;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       providers: [AuthService],
  9 |     }).compile();
 10 | 
 11 |     service = module.get<AuthService>(AuthService);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(service).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/auth/auth.service.ts
```ts
  0 | import { Injectable, UnauthorizedException } from '@nestjs/common';
  1 | import { UsersService } from '../users/users.service';
  2 | import { JwtService } from '@nestjs/jwt';
  3 | import * as bcrypt from 'bcrypt';
  4 | 
  5 | @Injectable()
  6 | export class AuthService {
  7 |   constructor(
  8 |     private usersService: UsersService,
  9 |     private jwtService: JwtService,
 10 |   ) {}
 11 | 
 12 |   async login(email: string, pass: string) {
 13 |     // Шукаємо користувача через Prisma (в usersService цього методу ще немає, тому звернемось до Prisma напряму)
 14 |     const user = await this.usersService['prisma'].user.findUnique({
 15 |       where: { email },
 16 |     });
 17 | 
 18 |     if (!user) {
 19 |       throw new UnauthorizedException('Невірний email або пароль');
 20 |     }
 21 | 
 22 |     const isPasswordValid = await bcrypt.compare(pass, user.password);
 23 | 
 24 |     if (!isPasswordValid) {
 25 |       throw new UnauthorizedException('Невірний email або пароль');
 26 |     }
 27 | 
 28 |     // Генеруємо "корисне навантаження" для токена
 29 |     // Було:
 30 | // const payload = { sub: user.id, email: user.email, role: user.role };
 31 | 
 32 | // Стало:
 33 |     const payload = { sub: user.id, email: user.email, role: user.role, name: user.name };
 34 | 
 35 |     return {
 36 |       access_token: await this.jwtService.signAsync(payload),
 37 |       user: {
 38 |         id: user.id,
 39 |         name: user.name,
 40 |         email: user.email,
 41 |         role: user.role,
 42 |       },
 43 |     };
 44 |   }
 45 | }
 46 | 
```

### File: apps/backend/src/auth/decorators/current-user.decorator.ts
```ts
  0 | import { createParamDecorator, ExecutionContext } from '@nestjs/common';
  1 | import { JwtUser } from '../interfaces/jwt-user.interface';
  2 | 
  3 | export const CurrentUser = createParamDecorator(
  4 |   (data: unknown, ctx: ExecutionContext): JwtUser => {
  5 |     const request = ctx.switchToHttp().getRequest();
  6 |     return request.user; // Тут ми вже гарантуємо, що повернеться JwtUser
  7 |   },
  8 | );
  9 | 
```

### File: apps/backend/src/auth/interfaces/jwt-user.interface.ts
```ts
  0 | export interface JwtUser {
  1 |   sub: string;
  2 |   name: string;
  3 |   role: string;
  4 | }
  5 | 
```

### File: apps/backend/src/cities/cities.controller.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { CitiesController } from './cities.controller';
  2 | 
  3 | describe('CitiesController', () => {
  4 |   let controller: CitiesController;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       controllers: [CitiesController],
  9 |     }).compile();
 10 | 
 11 |     controller = module.get<CitiesController>(CitiesController);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(controller).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/cities/cities.controller.ts
```ts
  0 | import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
  1 | import { CitiesService } from './cities.service';
  2 | 
  3 | @Controller('cities')
  4 | export class CitiesController {
  5 |   constructor(private readonly citiesService: CitiesService) {}
  6 | 
  7 |   @Post()
  8 |   create(@Body() body: { name: string }) {
  9 |     return this.citiesService.create(body.name);
 10 |   }
 11 | 
 12 |   @Get()
 13 |   findAll() {
 14 |     return this.citiesService.findAll();
 15 |   }
 16 | 
 17 |   @Get(':id')
 18 |   findOne(@Param('id') id: string) {
 19 |     return this.citiesService.findOne(id);
 20 |   }
 21 |   @Post(':id/crews')
 22 |   createCrew(@Param('id') id: string, @Body() body: { name: string; hostId: string; driverId: string }) {
 23 |     return this.citiesService.createCrew(id, body);
 24 |   }
 25 | 
 26 |   @Delete('crews/:crewId')
 27 |   deleteCrew(@Param('crewId') crewId: string) {
 28 |     return this.citiesService.deleteCrew(crewId);
 29 |   }
 30 | }
 31 | 
```

### File: apps/backend/src/cities/cities.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { CitiesService } from './cities.service';
  2 | import { CitiesController } from './cities.controller';
  3 | 
  4 | @Module({
  5 |   providers: [CitiesService],
  6 |   controllers: [CitiesController],
  7 | })
  8 | export class CitiesModule {}
  9 | 
```

### File: apps/backend/src/cities/cities.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { CitiesService } from './cities.service';
  2 | 
  3 | describe('CitiesService', () => {
  4 |   let service: CitiesService;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       providers: [CitiesService],
  9 |     }).compile();
 10 | 
 11 |     service = module.get<CitiesService>(CitiesService);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(service).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/cities/cities.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from 'src/prisma/prisma.service';
  2 | 
  3 | @Injectable()
  4 | export class CitiesService {
  5 |   constructor(private prisma: PrismaService) {}
  6 | 
  7 |   async create(name: string) {
  8 |     return this.prisma.city.create({
  9 |       data: { name },
 10 |     });
 11 |   }
 12 | 
 13 |   async findAll() {
 14 |     // 1. Отримуємо міста та їхніх менеджерів + кількість шкіл
 15 |     const cities = await this.prisma.city.findMany({
 16 |       orderBy: { createdAt: 'desc' },
 17 |       include: {
 18 |         users: {
 19 |           where: { role: 'MANAGER' },
 20 |           select: { id: true, name: true, phone: true },
 21 |           take: 1,
 22 |         },
 23 |         _count: { select: { schools: true } }, // <-- Додано цей рядок для підрахунку
 24 |       },
 25 |     });
 26 | 
 27 |     // 2. Рахуємо події через швидке агрегування (SQL GROUP BY) за мілісекунди
 28 |     const eventsStats = await this.prisma.event.groupBy({
 29 |       by: ['cityId', 'status'],
 30 |       _count: { _all: true },
 31 |     });
 32 | 
 33 |     // 3. Формуємо результат для клієнта
 34 |     return cities.map((city) => {
 35 |       // Вибираємо статистику лише для поточного міста
 36 |       const cityStats = eventsStats.filter((stat) => stat.cityId === city.id);
 37 | 
 38 |       const completedEvents = cityStats
 39 |         .filter((s) => s.status === 'RE_SALE')
 40 |         .reduce((sum, s) => sum + s._count._all, 0);
 41 | 
 42 |       const plannedEvents = cityStats
 43 |         .filter((s) => s.status !== 'RE_SALE')
 44 |         .reduce((sum, s) => sum + s._count._all, 0);
 45 | 
 46 |       return {
 47 |         ...city,
 48 |         manager: city.users[0] || null,
 49 |         plannedEvents,
 50 |         completedEvents,
 51 |         schoolsCount: city._count.schools, // <-- Віддаємо на фронтенд
 52 |       };
 53 |     });
 54 |   }
 55 |   async createCrew(
 56 |     cityId: string,
 57 |     data: { name: string; hostId: string; driverId: string },
 58 |   ) {
 59 |     const driver = await this.prisma.user.findUnique({
 60 |       where: { id: data.driverId },
 61 |     });
 62 |     return this.prisma.crew.create({
 63 |       data: {
 64 |         cityId,
 65 |         name: data.name,
 66 |         hostId: data.hostId,
 67 |         driverId: data.driverId,
 68 |         car: driver?.car || null,
 69 |         phone: driver?.phone || null,
 70 |       },
 71 |       include: { host: true, driver: true },
 72 |     });
 73 |   }
 74 | 
 75 |   async deleteCrew(id: string) {
 76 |     // Відв'язуємо екіпаж від подій перед видаленням, щоб не було помилок бази
 77 |     await this.prisma.event.updateMany({
 78 |       where: { crewId: id },
 79 |       data: { crewId: null },
 80 |     });
 81 |     return this.prisma.crew.delete({ where: { id } });
 82 |   }
 83 | 
 84 |   async findOne(id: string) {
 85 |     const city = await this.prisma.city.findUnique({
 86 |       where: { id },
 87 |       include: {
 88 |         users: {
 89 |           where: { role: 'MANAGER' },
 90 |           select: { id: true, name: true, phone: true },
 91 |           take: 1,
 92 |         },
 93 |         events: {
 94 |           where: { status: 'RE_SALE' },
 95 |           include: {
 96 |             school: { select: { id: true, name: true, type: true } },
 97 |             report: true,
 98 |             history: { orderBy: { createdAt: 'asc' } }, // ДОДАНО: підтягуємо історію пайплайну
 99 |           },
100 |           orderBy: { date: 'desc' },
101 |         },
102 |         crews: {
103 |           include: {
104 |             host: { select: { id: true, name: true } },
105 |             driver: { select: { id: true, name: true } },
106 |           },
107 |         },
108 |       },
109 |     });
110 | 
111 |     if (!city) return null;
112 | 
113 |     return {
114 |       ...city,
115 |       manager: city.users[0] || null,
116 |     };
117 |   }
118 | }
119 | 
```

### File: apps/backend/src/dashboard/dashboard.controller.ts
```ts
  0 | import { Controller, Get, Query, UseGuards } from '@nestjs/common';
  1 | import { DashboardService } from './dashboard.service';
  2 | import { AuthGuard } from '../auth/auth.guard';
  3 | import { CurrentUser } from '../auth/decorators/current-user.decorator';
  4 | import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
  5 | 
  6 | @Controller('dashboard')
  7 | @UseGuards(AuthGuard)
  8 | export class DashboardController {
  9 |   constructor(private readonly dashboardService: DashboardService) {}
 10 | 
 11 |   @Get('summary')
 12 |   getSummary(
 13 |     @CurrentUser() user: JwtUser,
 14 |     @Query('cityId') cityId?: string,
 15 |   ) {
 16 |     // SUPERADMIN отримує citiesStats; cityId ігнорується для суперадміна
 17 |     const effectiveCityId = user.role === 'SUPERADMIN' ? undefined : cityId;
 18 |     return this.dashboardService.getSummary(effectiveCityId, user.role);
 19 |   }
 20 | }
 21 | 
```

### File: apps/backend/src/dashboard/dashboard.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { DashboardController } from './dashboard.controller';
  2 | import { DashboardService } from './dashboard.service';
  3 | import { PrismaModule } from '../prisma/prisma.module';
  4 | import { AuthModule } from '../auth/auth.module';
  5 | 
  6 | @Module({
  7 |   imports: [PrismaModule, AuthModule],
  8 |   controllers: [DashboardController],
  9 |   providers: [DashboardService],
 10 | })
 11 | export class DashboardModule {}
 12 | 
```

### File: apps/backend/src/dashboard/dashboard.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { Prisma } from '@prisma/client';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | 
  4 | const PIPELINE_STAGES = [
  5 |   'BASE', 'FIRST_CONTACT', 'INTERESTED', 'PRE_APPROVAL',
  6 |   'DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT', 'RE_SALE',
  7 | ];
  8 | 
  9 | const STALE_DAYS = 7;
 10 | 
 11 | @Injectable()
 12 | export class DashboardService {
 13 |   constructor(private prisma: PrismaService) {}
 14 | 
 15 |   private cache = new Map<string, { data: any; ts: number }>();
 16 |   private CACHE_TTL = 60_000; // 60 секунд
 17 | 
 18 |   async getSummary(cityId?: string, role?: string) {
 19 |     const key = `${cityId ?? 'all'}-${role ?? 'anon'}`;
 20 |     const cached = this.cache.get(key);
 21 |     if (cached && Date.now() - cached.ts < this.CACHE_TTL) {
 22 |       console.log(`[Dashboard] cache hit — ${key}`);
 23 |       return cached.data;
 24 |     }
 25 | 
 26 |     const t0 = Date.now();
 27 |     console.log(`[Dashboard] start — cityId=${cityId ?? 'all'} role=${role}`);
 28 | 
 29 |     const now        = new Date();
 30 |     const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
 31 |     const todayEnd   = new Date(todayStart);
 32 |     todayEnd.setDate(todayEnd.getDate() + 1);
 33 |     const upcomingEnd = new Date(todayStart);
 34 |     upcomingEnd.setDate(upcomingEnd.getDate() + 6);
 35 | 
 36 |     const staleThreshold = new Date(now);
 37 |     staleThreshold.setDate(staleThreshold.getDate() - STALE_DAYS);
 38 | 
 39 |     const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
 40 |     const monthEnd   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
 41 | 
 42 |     const cityFilter   = cityId ? { cityId } : {};
 43 |     const isSuperAdmin = role === 'SUPERADMIN';
 44 | 
 45 |     const t1 = Date.now();
 46 |     const [
 47 |       todayEvents,
 48 |       upcomingEvents,
 49 |       funnelRows,
 50 |       monthEvents,
 51 |       staleSchoolsRaw,
 52 |       recentActivity,
 53 |     ] = await Promise.all([
 54 | 
 55 |       this.prisma.event.findMany({
 56 |         where: { ...cityFilter, date: { gte: todayStart, lt: todayEnd } },
 57 |         include: {
 58 |           school: { select: { id: true, name: true } },
 59 |           city:   { select: { id: true, name: true } },
 60 |           crew: {
 61 |             include: {
 62 |               host:   { select: { id: true, name: true } },
 63 |               driver: { select: { id: true, name: true } },
 64 |             },
 65 |           },
 66 |         },
 67 |         orderBy: { time: 'asc' },
 68 |       }),
 69 | 
 70 |       this.prisma.event.findMany({
 71 |         where: { ...cityFilter, date: { gte: todayEnd, lt: upcomingEnd } },
 72 |         include: {
 73 |           school: { select: { id: true, name: true } },
 74 |           city:   { select: { id: true, name: true } },
 75 |           crew: {
 76 |             include: {
 77 |               host:   { select: { id: true, name: true } },
 78 |               driver: { select: { id: true, name: true } },
 79 |             },
 80 |           },
 81 |         },
 82 |         orderBy: [{ date: 'asc' }, { time: 'asc' }],
 83 |         take: 8,
 84 |       }),
 85 | 
 86 |       cityId
 87 |         ? this.prisma.$queryRaw<{ status: string; count: bigint }[]>(Prisma.sql`
 88 |             SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
 89 |             FROM "School" s
 90 |             LEFT JOIN LATERAL (
 91 |               SELECT status FROM "Event"
 92 |               WHERE "schoolId" = s.id
 93 |               ORDER BY date DESC
 94 |               LIMIT 1
 95 |             ) e ON true
 96 |             WHERE s."cityId" = ${cityId}
 97 |             GROUP BY e.status
 98 |           `)
 99 |         : this.prisma.$queryRaw<{ status: string; count: bigint }[]>(Prisma.sql`
100 |             SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
101 |             FROM "School" s
102 |             LEFT JOIN LATERAL (
103 |               SELECT status FROM "Event"
104 |               WHERE "schoolId" = s.id
105 |               ORDER BY date DESC
106 |               LIMIT 1
107 |             ) e ON true
108 |             GROUP BY e.status
109 |           `),
110 | 
111 |       this.prisma.event.findMany({
112 |         where: {
113 |           ...cityFilter,
114 |           status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
115 |           date:   { gte: monthStart, lte: monthEnd },
116 |         },
117 |         select: {
118 |           id: true,
119 |           report: {
120 |             select: { totalSum: true, remainderSum: true, childrenCount: true },
121 |           },
122 |         },
123 |       }),
124 | 
125 |       this.prisma.school.findMany({
126 |         where: {
127 |           ...cityFilter,
128 |           events: {
129 |             some: {
130 |               status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] },
131 |               history: { every: { createdAt: { lt: staleThreshold } } },
132 |             },
133 |           },
134 |         },
135 |         include: {
136 |           events: {
137 |             where: { status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] } },
138 |             orderBy: { date: 'desc' },
139 |             take: 1,
140 |             include: {
141 |               history: {
142 |                 orderBy: { createdAt: 'desc' },
143 |                 take: 1,
144 |                 select: { createdAt: true },
145 |               },
146 |             },
147 |           },
148 |         },
149 |         take: 10,
150 |       }),
151 | 
152 |       this.prisma.eventHistory.findMany({
153 |         where: {
154 |           createdAt: { gte: todayStart },
155 |           ...(cityId ? { event: { cityId } } : {}),
156 |         },
157 |         include: {
158 |           event: {
159 |             select: {
160 |               id:     true,
161 |               school: { select: { id: true, name: true } },
162 |             },
163 |           },
164 |         },
165 |         orderBy: { createdAt: 'desc' },
166 |         take: 20,
167 |       }),
168 |     ]);
169 |     console.log(`[Dashboard] main Promise.all: ${Date.now() - t1}ms`);
170 | 
171 |     let citiesStats: {
172 |       cityId:       string;
173 |       cityName:     string;
174 |       schoolsCount: number;
175 |       activeEvents: number;
176 |       monthRevenue: number;
177 |     }[] = [];
178 | 
179 |     if (isSuperAdmin) {
180 |       const t2 = Date.now();
181 |       const [allCities, allSchools, allActiveEvents, allMonthEvents] =
182 |         await Promise.all([
183 |           this.prisma.city.findMany({ select: { id: true, name: true } }),
184 |           this.prisma.school.groupBy({ by: ['cityId'], _count: { id: true } }),
185 |           this.prisma.event.groupBy({
186 |             by: ['cityId'],
187 |             where: { status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] } },
188 |             _count: { id: true },
189 |           }),
190 |           this.prisma.event.findMany({
191 |             where: {
192 |               status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
193 |               date:   { gte: monthStart, lte: monthEnd },
194 |             },
195 |             select: {
196 |               cityId: true,
197 |               report: { select: { totalSum: true } },
198 |             },
199 |           }),
200 |         ]);
201 |       console.log(`[Dashboard] superadmin queries: ${Date.now() - t2}ms`);
202 | 
203 |       const schoolsIdx = Object.fromEntries(allSchools.map(r => [r.cityId, r._count.id]));
204 |       const activeIdx  = Object.fromEntries(allActiveEvents.map(r => [r.cityId, r._count.id]));
205 |       const revenueIdx: Record<string, number> = {};
206 |       for (const ev of allMonthEvents) {
207 |         revenueIdx[ev.cityId] = (revenueIdx[ev.cityId] ?? 0) + (ev.report?.totalSum ?? 0);
208 |       }
209 | 
210 |       citiesStats = allCities
211 |         .map(city => ({
212 |           cityId:       city.id,
213 |           cityName:     city.name,
214 |           schoolsCount: schoolsIdx[city.id] ?? 0,
215 |           activeEvents: activeIdx[city.id]  ?? 0,
216 |           monthRevenue: revenueIdx[city.id] ?? 0,
217 |         }))
218 |         .sort((a, b) => b.monthRevenue - a.monthRevenue);
219 |     }
220 | 
221 |     const funnel: Record<string, number> = {};
222 |     for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
223 |     let totalSchools = 0;
224 |     for (const row of funnelRows) {
225 |       const status = row.status ?? 'BASE';
226 |       const count  = Number(row.count);
227 |       if (funnel[status] !== undefined) funnel[status] += count;
228 |       totalSchools += count;
229 |     }
230 | 
231 |     const monthlyKpi = monthEvents.reduce(
232 |       (acc, ev) => {
233 |         acc.revenue  += ev.report?.totalSum      ?? 0;
234 |         acc.profit   += ev.report?.remainderSum  ?? 0;
235 |         acc.children += ev.report?.childrenCount ?? 0;
236 |         acc.count    += 1;
237 |         return acc;
238 |       },
239 |       { revenue: 0, profit: 0, children: 0, count: 0 },
240 |     );
241 | 
242 |     const staleSchools = staleSchoolsRaw
243 |       .map(school => {
244 |         const lastHistory  = school.events[0]?.history[0];
245 |         const lastActivity = lastHistory?.createdAt ?? null;
246 |         const daysStale    = lastActivity
247 |           ? Math.floor((now.getTime() - new Date(lastActivity).getTime()) / 86_400_000)
248 |           : null;
249 |         return {
250 |           id:          school.id,
251 |           name:        school.name,
252 |           status:      school.events[0]?.status ?? null,
253 |           lastActivity,
254 |           daysStale,
255 |         };
256 |       })
257 |       .sort((a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0));
258 | 
259 |     const activityFeed = recentActivity.map(h => ({
260 |       id:         h.id,
261 |       userName:   h.userName,
262 |       role:       h.role,
263 |       action:     h.action,
264 |       comment:    h.comment,
265 |       createdAt:  h.createdAt,
266 |       schoolId:   h.event?.school?.id   ?? null,
267 |       schoolName: h.event?.school?.name ?? null,
268 |       eventId:    h.event?.id           ?? null,
269 |     }));
270 | 
271 |     console.log(`[Dashboard] total: ${Date.now() - t0}ms`);
272 | 
273 |     const result = {
274 |       todayEvents,
275 |       upcomingEvents,
276 |       funnel,
277 |       totalSchools,
278 |       monthlyKpi,
279 |       staleSchools,
280 |       activityFeed,
281 |       citiesStats,
282 |     };
283 | 
284 |     this.cache.set(key, { data: result, ts: Date.now() });
285 |     return result;
286 |   }
287 | }
```

### File: apps/backend/src/events/dto/create-event.dto.ts
```ts
  0 | export class CreateEventDto {
  1 |   cityId: string;
  2 |   schoolId: string;
  3 | 
  4 |   project: string;
  5 | 
  6 |   date: string;
  7 |   time?: string;
  8 | 
  9 |   childrenPlanned?: number;
 10 | 
 11 |   price?: number;
 12 | 
 13 |   paymentMethod?: string;
 14 | 
 15 |   address?: string;
 16 | 
 17 |   contactPerson?: string;
 18 | 
 19 |   contactPhone?: string;
 20 | 
 21 |   equipment?: string;
 22 | 
 23 |   nextProject?: string;
 24 | 
 25 |   responsibleId?: string;
 26 | }
 27 | 
```

### File: apps/backend/src/events/dto/submit-report.dto.ts
```ts
  0 | export class SubmitReportDto {
  1 |   announcementDone: boolean;
  2 |   materialShown: boolean;
  3 | 
  4 |   childrenCount: number;
  5 |   classesCount: number;
  6 |   privilegedCount: number;
  7 |   showingsCount: number;
  8 | 
  9 |   totalSum: number;
 10 |   schoolSum: number;
 11 | 
 12 |   expenses: any[];
 13 | 
 14 |   remainderSum: number;
 15 | 
 16 |   rating?: number;
 17 | 
 18 |   salaries: { userId: string; name: string; amount: number }[];
 19 | }
 20 | 
```

### File: apps/backend/src/events/events-scheduler.service.ts
```ts
  0 | import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import { TelegramService } from '../telegram/telegram.service';
  3 | 
  4 | @Injectable()
  5 | export class EventsSchedulerService implements OnModuleInit {
  6 |   private readonly logger = new Logger(EventsSchedulerService.name);
  7 | 
  8 |   constructor(
  9 |     private prisma: PrismaService,
 10 |     private telegramService: TelegramService,
 11 |   ) {}
 12 | 
 13 |   onModuleInit() {
 14 |     // Запускаємо перевірку один раз при старті, а потім кожні 24 години
 15 |     this.scheduleDailyCheck();
 16 |   }
 17 | 
 18 |   private scheduleDailyCheck() {
 19 |     const check = async () => {
 20 |       this.logger.log('Автоматична перевірка подій на завтра...');
 21 |       await this.checkEventsForTomorrow();
 22 |     };
 23 | 
 24 |     // Перевіряємо відразу при запуску
 25 |     check();
 26 | 
 27 |     // Запускаємо інтервал: 24 години = 24 * 60 * 60 * 1000 мс
 28 |     setInterval(check, 24 * 60 * 60 * 1000);
 29 |   }
 30 | 
 31 |   async checkEventsForTomorrow() {
 32 |     const tomorrow = new Date();
 33 |     tomorrow.setDate(tomorrow.getDate() + 1);
 34 |     
 35 |     const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
 36 |     const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));
 37 | 
 38 |     const events = await this.prisma.event.findMany({
 39 |       where: {
 40 |         date: { gte: startOfTomorrow, lte: endOfTomorrow },
 41 |         status: { not: 'RE_SALE' }
 42 |       },
 43 |       include: {
 44 |         crew: { include: { host: true, driver: true } },
 45 |         school: true,
 46 |         city: true
 47 |       }
 48 |     });
 49 | 
 50 |     for (const event of events) {
 51 |       if (event.crew) {
 52 |         await this.sendReminder(event, event.crew.host, 'ведучий');
 53 |         await this.sendReminder(event, event.crew.driver, 'водій');
 54 |       }
 55 |     }
 56 |   }
 57 | 
 58 |   private async sendReminder(event: any, user: any, roleLabel: string) {
 59 |     if (!user || (!user.telegramChatId && !user.telegramId)) return;
 60 | 
 61 |     const chatId = user.telegramChatId || user.telegramId;
 62 |     const message = `🔔 <b>Нагадування про подію!</b>\n\n` +
 63 |       `👤 <b>Роль:</b> ${roleLabel}\n` +
 64 |       `📅 <b>Дата:</b> завтра\n` +
 65 |       `🏫 <b>Заклад:</b> ${event.school?.name || '—'}\n` +
 66 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
 67 |       `📞 <b>Контакт:</b> ${event.contactPhone || '—'}`;
 68 | 
 69 |     try {
 70 |       await this.telegramService.sendMessage(chatId, message);
 71 |     } catch (e) {
 72 |       this.logger.error(`Помилка відправки: ${e}`);
 73 |     }
 74 |   }
 75 | }
 76 | 
```

### File: apps/backend/src/events/events.controller.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { EventsController } from './events.controller';
  2 | 
  3 | describe('EventsController', () => {
  4 |   let controller: EventsController;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       controllers: [EventsController],
  9 |     }).compile();
 10 | 
 11 |     controller = module.get<EventsController>(EventsController);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(controller).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/events/events.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Get,
  3 |   Post,
  4 |   Body,
  5 |   Param,
  6 |   Patch,
  7 |   Delete,
  8 |   UseGuards,
  9 |   Request,
 10 | } from '@nestjs/common';
 11 | import { EventsService } from './events.service';
 12 | import { AuthGuard } from '../auth/auth.guard';
 13 | import { CurrentUser } from '../auth/decorators/current-user.decorator';
 14 | import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
 15 | import { CreateEventDto } from './dto/create-event.dto';
 16 | import { SubmitReportDto } from './dto/submit-report.dto';
 17 | 
 18 | @Controller('events')
 19 | @UseGuards(AuthGuard)
 20 | export class EventsController {
 21 |   constructor(private readonly eventsService: EventsService) {}
 22 | 
 23 |   // Список подій для поточного користувача.
 24 |   // Для водіїв/ведучих повертаються лише ті події, де вони у складі екіпажу.
 25 |   // Для менеджерів/адмінів — усі події.
 26 |   @Get()
 27 |   findAll(@CurrentUser() user: JwtUser) {
 28 |     return this.eventsService.findAllForUser(user);
 29 |   }
 30 | 
 31 |   @Post()
 32 |   create(@Body() body: CreateEventDto, @CurrentUser() user: JwtUser) {
 33 |     return this.eventsService.create(body, user);
 34 |   }
 35 | 
 36 |   @Get('school/:schoolId')
 37 |   findBySchool(@Param('schoolId') schoolId: string) {
 38 |     return this.eventsService.findBySchool(schoolId);
 39 |   }
 40 | 
 41 |   @Patch(':id/status')
 42 |   updateStatus(
 43 |     @Param('id') id: string,
 44 |     @Body() body: { status: string; actionName: string; comment?: string },
 45 |     @CurrentUser() user: JwtUser,
 46 |   ) {
 47 |     return this.eventsService.updateStatus(
 48 |       id,
 49 |       body.status,
 50 |       body.actionName,
 51 |       body.comment,
 52 |       user,
 53 |     );
 54 |   }
 55 | 
 56 |   @Patch(':id/preparation')
 57 |   updatePreparation(
 58 |     @Param('id') id: string,
 59 |     @Body() body: { field: string; status: string },
 60 |   ) {
 61 |     return this.eventsService.updatePreparationStatus(
 62 |       id,
 63 |       body.field,
 64 |       body.status,
 65 |     );
 66 |   }
 67 | 
 68 |   @Post(':id/assign-crew')
 69 |   assignCrew(
 70 |     @Param('id') id: string,
 71 |     @Body() body: { crewId: string }, // ЗМІНЕНО
 72 |   ) {
 73 |     return this.eventsService.assignCrewToEvent(id, body.crewId);
 74 |   }
 75 | 
 76 |   @Post(':id/history')
 77 |   addHistoryComment(
 78 |     @Param('id') id: string,
 79 |     @Body() body: { comment: string },
 80 |     @CurrentUser() user: JwtUser,
 81 |   ) {
 82 |     return this.eventsService.addHistoryComment(id, body.comment, user);
 83 |   }
 84 | 
 85 |   // Маршрут для оновлення коментаря
 86 |   @Patch('history/:historyId')
 87 |   updateHistoryComment(
 88 |     @Param('historyId') historyId: string,
 89 |     @Body() body: { comment: string },
 90 |   ) {
 91 |     return this.eventsService.updateHistoryComment(historyId, body.comment);
 92 |   }
 93 | 
 94 |   @Delete(':id')
 95 |   remove(@Param('id') id: string) {
 96 |     return this.eventsService.remove(id);
 97 |   }
 98 | 
 99 |   @Post(':id/report')
100 |   submitReport(
101 |     @Param('id') id: string,
102 |     @Body() body: SubmitReportDto,
103 |     @CurrentUser() user: JwtUser,
104 |   ) {
105 |     return this.eventsService.submitReport(id, body, user);
106 |   }
107 | 
108 |   @Get(':id')
109 |   findOne(@Param('id') id: string) {
110 |     return this.eventsService.findOne(id);
111 |   }
112 | 
113 |   @Patch(':id/reschedule')
114 |   reschedule(
115 |     @Param('id') id: string,
116 |     @Body() body: { date: string; time: string },
117 |     @CurrentUser() user: JwtUser,
118 |   ) {
119 |     return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
120 |   }
121 | }
122 | 
```

### File: apps/backend/src/events/events.module.ts
```ts
  0 | import { Module, forwardRef } from '@nestjs/common';
  1 | import { EventsService } from './events.service';
  2 | import { EventsController } from './events.controller';
  3 | import { SchoolsModule } from '../schools/schools.module';
  4 | import { TelegramModule } from '../telegram/telegram.module';
  5 | import { EventsSchedulerService } from './events-scheduler.service';
  6 | 
  7 | @Module({
  8 |   imports: [forwardRef(() => SchoolsModule), TelegramModule],
  9 |   controllers: [EventsController],
 10 |   providers: [EventsService, EventsSchedulerService],
 11 |   exports: [EventsService],
 12 | })
 13 | export class EventsModule {}
 14 | 
```

### File: apps/backend/src/events/events.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { EventsService } from './events.service';
  2 | 
  3 | describe('EventsService', () => {
  4 |   let service: EventsService;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       providers: [EventsService],
  9 |     }).compile();
 10 | 
 11 |     service = module.get<EventsService>(EventsService);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(service).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/events/events.service.ts
```ts
  0 | import { Injectable, Logger } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import { TelegramService } from '../telegram/telegram.service';
  3 | 
  4 | import { CreateEventDto } from './dto/create-event.dto';
  5 | import { SubmitReportDto } from './dto/submit-report.dto';
  6 | import { JwtUser } from '../auth/interfaces/jwt-user.interface';
  7 | 
  8 | /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  9 | 
 10 | const FIELD_ROLES = ['DRIVER', 'HOST'];
 11 | 
 12 | @Injectable()
 13 | export class EventsService {
 14 |   private readonly logger = new Logger(EventsService.name);
 15 | 
 16 |   constructor(
 17 |     private prisma: PrismaService,
 18 |     private telegramService: TelegramService,
 19 |   ) {}
 20 | 
 21 |   // Список подій для сторінки "Події".
 22 |   // Водій/ведучий бачить тільки події, де він призначений в екіпаж.
 23 |   // Решта ролей (менеджер, адмін тощо) бачать усі події.
 24 |   async findAllForUser(user: JwtUser) {
 25 |     const isFieldStaff = FIELD_ROLES.includes(user.role);
 26 | 
 27 |     return this.prisma.event.findMany({
 28 |       where: isFieldStaff
 29 |         ? {
 30 |             crew: {
 31 |               OR: [{ hostId: user.sub }, { driverId: user.sub }],
 32 |             },
 33 |           }
 34 |         : {},
 35 |       include: {
 36 |         school: { select: { id: true, name: true, type: true } },
 37 |         city: { select: { id: true, name: true } },
 38 |         crew: {
 39 |           include: {
 40 |             host: { select: { id: true, name: true } },
 41 |             driver: { select: { id: true, name: true } },
 42 |           },
 43 |         },
 44 |       },
 45 |       orderBy: { date: 'asc' },
 46 |     });
 47 |   }
 48 | 
 49 |   // Оновлюємо метод create
 50 |   async create(data: CreateEventDto, user: JwtUser) {
 51 |     return this.prisma.event.create({
 52 |       data: {
 53 |         ...data,
 54 |         status: 'BASE' as never,
 55 |         date: new Date(data.date),
 56 |         history: {
 57 |           create: {
 58 |             action: 'Створено подію. Етап: База',
 59 |             userId: user.sub, // Беремо ID з токена
 60 |             userName: user.name, // Беремо ім'я з токена
 61 |             role: user.role, // Беремо роль з токена
 62 |           },
 63 |         },
 64 |       },
 65 |       include: { history: true },
 66 |     });
 67 |   }
 68 | 
 69 |   // Оновлюємо метод updateStatus
 70 |   async updateStatus(
 71 |     eventId: string,
 72 |     newStatus: string,
 73 |     actionName: string,
 74 |     comment: string | undefined,
 75 |     user: JwtUser,
 76 |   ) {
 77 |     return this.prisma.event.update({
 78 |       where: { id: eventId },
 79 |       data: {
 80 |         status: newStatus as never,
 81 |         history: {
 82 |           create: {
 83 |             action: actionName,
 84 |             comment: comment || null,
 85 |             userId: user.sub, // Більше ніяких 'superadmin-123'!
 86 |             userName: user.name,
 87 |             role: user.role,
 88 |           },
 89 |         },
 90 |       },
 91 |       include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
 92 |     });
 93 |   }
 94 | 
 95 |   // Оновлюємо статус підготовки
 96 |   async updatePreparationStatus(
 97 |     eventId: string,
 98 |     field: string,
 99 |     status: string,
100 |   ) {
101 |     const existing = await this.prisma.eventPreparation.findUnique({
102 |       where: { eventId },
103 |     });
104 | 
105 |     if (existing) {
106 |       return this.prisma.eventPreparation.update({
107 |         where: { eventId },
108 |         data: { [field]: status },
109 |       });
110 |     } else {
111 |       return this.prisma.eventPreparation.create({
112 |         data: { eventId, [field]: status },
113 |       });
114 |     }
115 |   }
116 | 
117 |   // --- ВСТАВЛЯЙ ОНОВЛЕНИЙ МЕТОД ТУТ ---
118 |   async assignCrewToEvent(
119 |     eventId: string,
120 |     crewId: string, // ЗМІНЕНО: Тепер приймаємо тільки ID існуючого екіпажу
121 |   ) {
122 |     const event = await this.prisma.event.update({
123 |       where: { id: eventId },
124 |       data: { crewId: crewId },
125 |       include: {
126 |         crew: { include: { host: true, driver: true } },
127 |         school: true,
128 |         city: true,
129 |         preparation: true,
130 |         history: { orderBy: { createdAt: 'desc' } },
131 |       },
132 |     });
133 | 
134 |     const hostId = event.crew?.hostId;
135 |     const driverId = event.crew?.driverId;
136 | 
137 |     const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
138 |       day: '2-digit',
139 |       month: 'long',
140 |       year: 'numeric',
141 |     });
142 |     const timeStr = event.time ? `, ${event.time}` : '';
143 | 
144 |     const buildMessage = (role: 'ведучий' | 'водій') =>
145 |       `🎯 <b>Вас призначено на подію!</b>\n\n` +
146 |       `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
147 |       `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
148 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
149 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
150 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
151 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
152 |       (event.contactPerson
153 |         ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
154 |         : '') +
155 |       (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
156 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
157 | 
158 |     if (hostId) {
159 |       const hostChatId = await this.getChatIdForUser(hostId);
160 |       this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);
161 | 
162 |       if (hostChatId) {
163 |         await this.telegramService.sendMessage(
164 |           hostChatId,
165 |           buildMessage('ведучий'),
166 |         );
167 |       } else {
168 |         this.logger.warn(
169 |           `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
170 |         );
171 |       }
172 |     }
173 | 
174 |     if (driverId) {
175 |       const driverChatId = await this.getChatIdForUser(driverId);
176 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
177 | 
178 |       if (driverChatId) {
179 |         await this.telegramService.sendMessage(
180 |           driverChatId,
181 |           buildMessage('водій'),
182 |         );
183 |       } else {
184 |         this.logger.warn(
185 |           `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
186 |         );
187 |       }
188 |     }
189 | 
190 |     if (driverId) {
191 |       const driver = await this.prisma.user.findUnique({
192 |         where: { id: driverId },
193 |       });
194 |       this.logger.log(
195 |         `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
196 |       );
197 |       const driverChatId =
198 |         driver?.telegramChatId ||
199 |         (driver?.telegramId && /^\d+$/.test(driver.telegramId)
200 |           ? driver.telegramId
201 |           : null);
202 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
203 |       if (driverChatId) {
204 |         await this.telegramService.sendMessage(
205 |           driverChatId,
206 |           buildMessage('водій'),
207 |         );
208 |       }
209 |     }
210 | 
211 |     return event;
212 |   }
213 | 
214 |   async rescheduleEvent(
215 |     eventId: string,
216 |     newDate: string,
217 |     newTime: string,
218 |     user: JwtUser,
219 |   ) {
220 |     const event = await this.prisma.event.update({
221 |       where: { id: eventId },
222 |       data: {
223 |         date: new Date(newDate),
224 |         time: newTime,
225 |         history: {
226 |           create: {
227 |             action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
228 |             userId: user.sub,
229 |             userName: user.name,
230 |             role: user.role,
231 |           },
232 |         },
233 |       },
234 |       include: {
235 |         crew: { include: { host: true, driver: true } },
236 |         school: true,
237 |         city: true,
238 |         history: { orderBy: { createdAt: 'desc' } },
239 |       },
240 |     });
241 | 
242 |     const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
243 |       day: '2-digit',
244 |       month: 'long',
245 |       year: 'numeric',
246 |     });
247 |     const msg =
248 |       `📅 <b>Подію перенесено!</b>\n\n` +
249 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
250 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
251 |       `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
252 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
253 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
254 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
255 | 
256 |     const sendTo = async (userId: string | null | undefined) => {
257 |       if (!userId) return;
258 |       const u = await this.prisma.user.findUnique({ where: { id: userId } });
259 |       const chatId =
260 |         u?.telegramChatId ||
261 |         (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
262 |       if (chatId) await this.telegramService.sendMessage(chatId, msg);
263 |     };
264 | 
265 |     await sendTo(event.crew?.hostId);
266 |     await sendTo(event.crew?.driverId);
267 | 
268 |     return event;
269 |   }
270 | 
271 |   async getChatIdForUser(userId: string): Promise<string | null> {
272 |     const user = await this.prisma.user.findUnique({ where: { id: userId } });
273 |     if (!user) return null;
274 | 
275 |     // Якщо користувач натиснув /start, telegramChatId буде заповнено
276 |     if (user.telegramChatId) return user.telegramChatId;
277 | 
278 |     // Якщо в telegramId вбито числовий ID вручну, можна спробувати його
279 |     if (user.telegramId && /^\d+$/.test(user.telegramId))
280 |       return user.telegramId;
281 | 
282 |     return null;
283 |   }
284 | 
285 |   async findBySchool(schoolId: string) {
286 |     return this.prisma.event.findMany({
287 |       where: { schoolId },
288 |       include: {
289 |         crew: true,
290 |         history: { orderBy: { createdAt: 'desc' } },
291 |         preparation: true, // Включаємо підготовку, якщо вона є
292 |       },
293 |       orderBy: { date: 'desc' },
294 |     });
295 |   }
296 | 
297 |   async updateHistoryComment(historyId: string, comment: string) {
298 |     return this.prisma.eventHistory.update({
299 |       where: { id: historyId },
300 |       data: { comment: comment || null },
301 |     });
302 |   }
303 | 
304 |   async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
305 |     await this.prisma.eventHistory.create({
306 |       data: {
307 |         eventId,
308 |         action: 'Коментар',
309 |         comment,
310 |         userId: user.sub,
311 |         userName: user.name,
312 |         role: user.role,
313 |       },
314 |     });
315 | 
316 |     return this.prisma.event.findUnique({
317 |       where: { id: eventId },
318 |       include: {
319 |         history: { orderBy: { createdAt: 'desc' } },
320 |       },
321 |     });
322 |   }
323 | 
324 |   // ОНОВЛЕНО: Тепер метод видалення безпечно видаляє зв'язані дані
325 |   async remove(id: string) {
326 |     // 1. Видаляємо історію події
327 |     await this.prisma.eventHistory.deleteMany({
328 |       where: { eventId: id },
329 |     });
330 | 
331 |     // 2. Видаляємо підготовку події (якщо вона існує)
332 |     await this.prisma.eventPreparation.deleteMany({
333 |       where: { eventId: id },
334 |     });
335 | 
336 |     // 3. Тепер спокійно видаляємо саму подію
337 |     return this.prisma.event.delete({
338 |       where: { id },
339 |     });
340 |   }
341 | 
342 |   async submitReport(
343 |     eventId: string,
344 |     reportData: SubmitReportDto,
345 |     user: JwtUser,
346 |   ) {
347 |     // 1. Зберігаємо звіт у базу
348 |     await this.prisma.eventReport.upsert({
349 |       where: { eventId },
350 |       update: {
351 |         announcementDone: reportData.announcementDone,
352 |         materialShown: reportData.materialShown,
353 |         childrenCount: reportData.childrenCount,
354 |         classesCount: reportData.classesCount,
355 |         privilegedCount: reportData.privilegedCount,
356 |         showingsCount: reportData.showingsCount,
357 |         totalSum: reportData.totalSum,
358 |         schoolSum: reportData.schoolSum,
359 |         expenses: reportData.expenses || [],
360 |         remainderSum: reportData.remainderSum,
361 |         rating: reportData.rating,
362 |         salaries: reportData.salaries || [],
363 |       },
364 |       create: {
365 |         eventId,
366 |         announcementDone: reportData.announcementDone,
367 |         materialShown: reportData.materialShown,
368 |         childrenCount: reportData.childrenCount,
369 |         classesCount: reportData.classesCount,
370 |         privilegedCount: reportData.privilegedCount,
371 |         showingsCount: reportData.showingsCount,
372 |         totalSum: reportData.totalSum,
373 |         schoolSum: reportData.schoolSum,
374 |         expenses: reportData.expenses || [],
375 |         remainderSum: reportData.remainderSum,
376 |         rating: reportData.rating,
377 |         salaries: reportData.salaries || [],
378 |       },
379 |     });
380 | 
381 |     if (reportData.salaries?.length) {
382 |       await Promise.all(
383 |         reportData.salaries
384 |           .filter((s) => s.amount > 0)
385 |           .map((s) =>
386 |             this.prisma.user.update({
387 |               where: { id: s.userId },
388 |               data: { balance: { increment: s.amount } },
389 |             }),
390 |           ),
391 |       );
392 |     }
393 |     // 2. Оновлюємо статус події на 'REPORT' (щоб вона не зникала і давала можливість перейти до RE_SALE)
394 |     return this.prisma.event.update({
395 |       where: { id: eventId },
396 |       data: {
397 |         status: 'REPORT' as never,
398 |         history: {
399 |           create: {
400 |             action: 'Сформовано звіт. Етап: Звіт',
401 |             userId: user.sub,
402 |             userName: user.name,
403 |             role: user.role,
404 |           },
405 |         },
406 |       },
407 |       include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
408 |     });
409 |   }
410 | 
411 |   async findOne(id: string) {
412 |     return this.prisma.event.findUnique({
413 |       where: { id },
414 |       include: {
415 |         school: true,
416 |         city: true,
417 |         crew: {
418 |           include: {
419 |             host: { select: { id: true, name: true } },
420 |             driver: { select: { id: true, name: true } },
421 |           },
422 |         },
423 |         report: true,
424 |       },
425 |     });
426 |   }
427 | }
428 | 
```

### File: apps/backend/src/finance/finance.controller.ts
```ts
  0 | import { Controller, Get, Query, UseGuards } from '@nestjs/common';
  1 | import { FinanceService } from './finance.service';
  2 | import { AuthGuard } from '../auth/auth.guard';
  3 | import { CurrentUser } from '../auth/decorators/current-user.decorator';
  4 | import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
  5 | 
  6 | @Controller('finance')
  7 | @UseGuards(AuthGuard)
  8 | export class FinanceController {
  9 |   constructor(private readonly financeService: FinanceService) {}
 10 | 
 11 |   @Get('dashboard')
 12 |   getDashboard(
 13 |     @Query('period') period: string,
 14 |     @Query('cityId') cityId: string,
 15 |     @Query('project') project: string,
 16 |     @Query('minimal') minimal: string,
 17 |   ) {
 18 |     return this.financeService.getDashboard({
 19 |       period,
 20 |       cityId,
 21 |       project,
 22 |       minimal: minimal === 'true',
 23 |     });
 24 |   }
 25 | 
 26 |   @Get('my-balance')
 27 |   getMyBalance(@CurrentUser() user: JwtUser) {
 28 |     return this.financeService.getMyBalance(user.sub);
 29 |   }
 30 | 
 31 |   @Get('staff-revenue')
 32 |   getStaffRevenue(
 33 |     @Query('period') period: string,
 34 |     @Query('cityId') cityId: string,
 35 |   ) {
 36 |     return this.financeService.getStaffRevenue({ period, cityId });
 37 |   }
 38 | }
 39 | 
```

### File: apps/backend/src/finance/finance.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { FinanceController } from './finance.controller';
  2 | import { FinanceService } from './finance.service';
  3 | 
  4 | @Module({
  5 |   controllers: [FinanceController],
  6 |   providers: [FinanceService],
  7 | })
  8 | export class FinanceModule {}
  9 | 
```

### File: apps/backend/src/finance/finance.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | 
  3 | @Injectable()
  4 | export class FinanceService {
  5 |   constructor(private prisma: PrismaService) {}
  6 | 
  7 |   async getMyBalance(userId: string) {
  8 |     const user = await this.prisma.user.findUnique({
  9 |       where: { id: userId },
 10 |       select: { balance: true, name: true },
 11 |     });
 12 |     return { balance: user?.balance ?? 0, name: user?.name ?? '' };
 13 |   }
 14 | 
 15 |   async getDashboard({
 16 |     period,
 17 |     cityId,
 18 |     project,
 19 |     minimal = false,
 20 |   }: {
 21 |     period?: string;
 22 |     cityId?: string;
 23 |     project?: string;
 24 |     minimal?: boolean;
 25 |   }) {
 26 |     const now = new Date();
 27 |     let dateFrom: Date | undefined;
 28 | 
 29 |     if (period === 'month')
 30 |       dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
 31 |     else if (period === 'quarter')
 32 |       dateFrom = new Date(
 33 |         now.getFullYear(),
 34 |         Math.floor(now.getMonth() / 3) * 3,
 35 |         1,
 36 |       );
 37 |     else if (period === 'year') dateFrom = new Date(now.getFullYear(), 0, 1);
 38 | 
 39 |     const where: any = { status: 'RE_SALE' };
 40 |     if (dateFrom) where.date = { gte: dateFrom };
 41 |     if (cityId) where.cityId = cityId;
 42 |     if (project) where.project = project;
 43 | 
 44 |     const events = await this.prisma.event.findMany({
 45 |       where,
 46 |       include: {
 47 |         report: true,
 48 |         school: { select: { id: true, name: true } },
 49 |         city: { select: { id: true, name: true } },
 50 |         crew: {
 51 |           include: {
 52 |             host: { select: { id: true, name: true } },
 53 |           },
 54 |         },
 55 |       },
 56 |       orderBy: { date: 'asc' },
 57 |     });
 58 | 
 59 |     // KPI
 60 |     const totalRevenue = events.reduce(
 61 |       (s, e) => s + (e.report?.totalSum || 0),
 62 |       0,
 63 |     );
 64 |     const totalExpenses = events.reduce((s, e) => {
 65 |       const exp: any[] = Array.isArray(e.report?.expenses)
 66 |         ? (e.report.expenses as any[])
 67 |         : [];
 68 |       return s + exp.reduce((es: number, ex: any) => es + (ex.amount || 0), 0);
 69 |     }, 0);
 70 |     const totalProfit = events.reduce(
 71 |       (s, e) => s + (e.report?.remainderSum || 0),
 72 |       0,
 73 |     );
 74 | 
 75 |     // Графік по місяцях
 76 |     const monthlyMap: Record<
 77 |       string,
 78 |       { month: string; revenue: number; profit: number }
 79 |     > = {};
 80 |     events.forEach((e) => {
 81 |       const d = new Date(e.date);
 82 |       const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
 83 |       const label = d.toLocaleString('uk-UA', {
 84 |         month: 'short',
 85 |         year: '2-digit',
 86 |       });
 87 |       if (!monthlyMap[key])
 88 |         monthlyMap[key] = { month: label, revenue: 0, profit: 0 };
 89 |       monthlyMap[key].revenue += e.report?.totalSum || 0;
 90 |       monthlyMap[key].profit += e.report?.remainderSum || 0;
 91 |     });
 92 |     const monthly = Object.values(monthlyMap);
 93 | 
 94 |     // Структура доходів по проєктах
 95 |     const projectMap: Record<string, number> = {};
 96 |     events.forEach((e) => {
 97 |       const p = e.project || 'Інше';
 98 |       projectMap[p] = (projectMap[p] || 0) + (e.report?.totalSum || 0);
 99 |     });
100 |     const byProject = Object.entries(projectMap).map(([name, value]) => ({
101 |       name,
102 |       value,
103 |     }));
104 | 
105 |     // Топ міст
106 |     const cityMap: Record<
107 |       string,
108 |       { name: string; revenue: number; profit: number }
109 |     > = {};
110 |     events.forEach((e) => {
111 |       const cid = e.cityId;
112 |       if (!cityMap[cid])
113 |         cityMap[cid] = { name: e.city?.name || '—', revenue: 0, profit: 0 };
114 |       cityMap[cid].revenue += e.report?.totalSum || 0;
115 |       cityMap[cid].profit += e.report?.remainderSum || 0;
116 |     });
117 |     const topCities = Object.values(cityMap)
118 |       .sort((a, b) => b.revenue - a.revenue)
119 |       .slice(0, 5);
120 | 
121 |     // Топ шкіл
122 |     const schoolMap: Record<
123 |       string,
124 |       { name: string; count: number; revenue: number }
125 |     > = {};
126 |     events.forEach((e) => {
127 |       const sid = e.schoolId;
128 |       if (!schoolMap[sid])
129 |         schoolMap[sid] = { name: e.school?.name || '—', count: 0, revenue: 0 };
130 |       schoolMap[sid].count++;
131 |       schoolMap[sid].revenue += e.report?.totalSum || 0;
132 |     });
133 |     const topSchools = Object.values(schoolMap)
134 |       .sort((a, b) => b.revenue - a.revenue)
135 |       .slice(0, 5);
136 | 
137 |     // Витрати по категоріях
138 |     const expCatMap: Record<string, number> = {};
139 |     events.forEach((e) => {
140 |       const exp: any[] = Array.isArray(e.report?.expenses)
141 |         ? (e.report.expenses as any[])
142 |         : [];
143 |       exp.forEach((ex: any) => {
144 |         const cat = ex.category || ex.name || 'Інше';
145 |         expCatMap[cat] = (expCatMap[cat] || 0) + (ex.amount || 0);
146 |       });
147 |     });
148 |     const byExpenseCategory = Object.entries(expCatMap).map(
149 |       ([name, value]) => ({ name, value }),
150 |     );
151 | 
152 |     // Найприбутковіші та найзбитковіші події
153 |     const sortedByProfit = [...events].sort(
154 |       (a, b) => (b.report?.remainderSum || 0) - (a.report?.remainderSum || 0),
155 |     );
156 |     const topEvents = sortedByProfit.slice(0, 5).map((e) => ({
157 |       id: e.id,
158 |       date: e.date,
159 |       school: e.school?.name,
160 |       profit: e.report?.remainderSum || 0,
161 |       revenue: e.report?.totalSum || 0,
162 |     }));
163 |     const worstEvents = sortedByProfit
164 |       .slice(-5)
165 |       .reverse()
166 |       .map((e) => ({
167 |         id: e.id,
168 |         date: e.date,
169 |         school: e.school?.name,
170 |         profit: e.report?.remainderSum || 0,
171 |         revenue: e.report?.totalSum || 0,
172 |       }));
173 | 
174 |     // Очікувана виручка (незавершені події)
175 |     const planned = await this.prisma.event.findMany({
176 |       where: {
177 |         status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
178 |         ...(cityId ? { cityId } : {}),
179 |       },
180 |       select: { price: true },
181 |     });
182 |     const expectedRevenue = await this.prisma.event
183 |       .findMany({
184 |         where: {
185 |           status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
186 |           ...(cityId ? { cityId } : {}),
187 |         },
188 |         select: { price: true },
189 |       })
190 |       .then((planned) => planned.reduce((s, e) => s + (e.price || 0), 0));
191 |     // Список унікальних проєктів для фільтру
192 |     const projects = await this.prisma.event.findMany({
193 |       select: { project: true },
194 |       distinct: ['project'],
195 |     });
196 | 
197 |     const cities = await this.prisma.city.findMany({
198 |       select: { id: true, name: true },
199 |     });
200 | 
201 |     // --- minimal: повертаємо тільки KPI + monthly + фільтри ---
202 |     if (minimal) {
203 |       return {
204 |         kpi: {
205 |           totalRevenue,
206 |           totalExpenses,
207 |           totalProfit,
208 |           totalEvents: events.length,
209 |         },
210 |         monthly,
211 |         expectedRevenue,
212 |         filters: {
213 |           projects: projects.map((p) => p.project).filter(Boolean),
214 |           cities,
215 |         },
216 |       };
217 |     }
218 | 
219 |     return {
220 |       kpi: {
221 |         totalRevenue,
222 |         totalExpenses,
223 |         totalProfit,
224 |         totalEvents: events.length,
225 |       },
226 |       monthly,
227 |       byProject,
228 |       byExpenseCategory,
229 |       topSchools,
230 |       topEvents,
231 |       worstEvents,
232 |       expectedRevenue,
233 |       filters: {
234 |         projects: projects.map((p) => p.project).filter(Boolean),
235 |         cities,
236 |       },
237 |     };
238 |   }
239 | 
240 |   async getStaffRevenue({
241 |     period,
242 |     cityId,
243 |   }: {
244 |     period?: string;
245 |     cityId?: string;
246 |   }) {
247 |     const now = new Date();
248 |     let dateFrom: Date | undefined;
249 | 
250 |     if (period === 'month')
251 |       dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
252 |     else if (period === 'quarter')
253 |       dateFrom = new Date(
254 |         now.getFullYear(),
255 |         Math.floor(now.getMonth() / 3) * 3,
256 |         1,
257 |       );
258 |     else if (period === 'year') dateFrom = new Date(now.getFullYear(), 0, 1);
259 | 
260 |     const where: any = { status: 'RE_SALE' };
261 |     if (dateFrom) where.date = { gte: dateFrom };
262 |     if (cityId) where.cityId = cityId;
263 | 
264 |     const events = await this.prisma.event.findMany({
265 |       where,
266 |       include: {
267 |         report: { select: { totalSum: true } },
268 |         crew: {
269 |           include: {
270 |             host: { select: { id: true, name: true, role: true } },
271 |             driver: { select: { id: true, name: true, role: true } },
272 |           },
273 |         },
274 |         city: { select: { id: true, name: true } },
275 |       },
276 |     });
277 | 
278 |     // Агрегуємо виручку по кожному ведучому і водію
279 |     const staffMap: Record<
280 |       string,
281 |       {
282 |         id: string;
283 |         name: string;
284 |         role: string;
285 |         revenue: number;
286 |         eventsCount: number;
287 |       }
288 |     > = {};
289 | 
290 |     for (const ev of events) {
291 |       const revenue = ev.report?.totalSum ?? 0;
292 |       if (!ev.crew) continue;
293 | 
294 |       for (const [member, memberRole] of [
295 |         [ev.crew.host, 'HOST'],
296 |         [ev.crew.driver, 'DRIVER'],
297 |       ] as [{ id: string; name: string } | null, string][]) {
298 |         if (!member) continue;
299 |         if (!staffMap[member.id]) {
300 |           staffMap[member.id] = {
301 |             id: member.id,
302 |             name: member.name,
303 |             role: memberRole,
304 |             revenue: 0,
305 |             eventsCount: 0,
306 |           };
307 |         }
308 |         staffMap[member.id].revenue += revenue;
309 |         staffMap[member.id].eventsCount += 1;
310 |       }
311 |     }
312 | 
313 |     const staff = Object.values(staffMap).sort((a, b) => b.revenue - a.revenue);
314 |     const totalRevenue = events.reduce(
315 |       (s, e) => s + (e.report?.totalSum ?? 0),
316 |       0,
317 |     );
318 | 
319 |     return { staff, totalRevenue, eventsCount: events.length };
320 |   }
321 | }
322 | 
```

### File: apps/backend/src/issues/issues.controller.ts
```ts
  0 | import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
  1 | import { IssuesService } from './issues.service';
  2 | import { AuthGuard } from '../auth/auth.guard';
  3 | 
  4 | @Controller('issues')
  5 | @UseGuards(AuthGuard)
  6 | export class IssuesController {
  7 |   constructor(private readonly issuesService: IssuesService) {}
  8 | 
  9 |   @Post()
 10 |   create(@Body() body: {
 11 |     eventId: string;
 12 |     schoolName: string;
 13 |     eventName: string;
 14 |     message: string;
 15 |     cityId: string;
 16 |   }) {
 17 |     return this.issuesService.create(body);
 18 |   }
 19 | 
 20 |   @Get()
 21 |   findByCityId(@Query('cityId') cityId: string) {
 22 |     return this.issuesService.findByCityId(cityId);
 23 |   }
 24 | 
 25 |   @Patch(':id/status')
 26 |   updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
 27 |     return this.issuesService.updateStatus(id, body.status);
 28 |   }
 29 | }
 30 | 
```

### File: apps/backend/src/issues/issues.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { IssuesController } from './issues.controller';
  2 | import { IssuesService } from './issues.service';
  3 | import { TelegramModule } from '../telegram/telegram.module';
  4 | 
  5 | @Module({
  6 |   imports: [TelegramModule],
  7 |   controllers: [IssuesController],
  8 |   providers: [IssuesService],
  9 | })
 10 | export class IssuesModule {}
 11 | 
```

### File: apps/backend/src/issues/issues.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import { TelegramService } from '../telegram/telegram.service';
  3 | 
  4 | @Injectable()
  5 | export class IssuesService {
  6 |   constructor(
  7 |     private prisma: PrismaService,
  8 |     private telegramService: TelegramService,
  9 |   ) {}
 10 | 
 11 |   async create(data: {
 12 |     eventId: string;
 13 |     schoolName: string;
 14 |     eventName: string;
 15 |     message: string;
 16 |     cityId: string;
 17 |     deadline?: string;
 18 |     assignedUserId?: string;
 19 |     assignedUserName?: string;
 20 |   }) {
 21 |     const issue = await this.prisma.issueReport.create({
 22 |       data: {
 23 |         eventId: data.eventId,
 24 |         schoolName: data.schoolName,
 25 |         eventName: data.eventName,
 26 |         message: data.message,
 27 |         cityId: data.cityId,
 28 |         deadline: data.deadline ? new Date(data.deadline) : null,
 29 |         assignedUserId: data.assignedUserId || null,
 30 |         assignedUserName: data.assignedUserName || null,
 31 |       },
 32 |     });
 33 | 
 34 |     const event = await this.prisma.event.findUnique({
 35 |       where: { id: data.eventId },
 36 |       include: {
 37 |         crew: {
 38 |           include: {
 39 |             host: { select: { name: true, telegramId: true } },
 40 |             driver: { select: { name: true, telegramId: true } },
 41 |           },
 42 |         },
 43 |       },
 44 |     });
 45 | 
 46 |     const formatMember = (user: {
 47 |       name: string;
 48 |       telegramId: string | null;
 49 |     }) => {
 50 |       if (!user.telegramId) return user.name;
 51 |       const clean = user.telegramId.replace(/^@/, '');
 52 |       return /^\d+$/.test(clean) ? user.name : `@${clean} (${user.name})`;
 53 |     };
 54 | 
 55 |     const crewMembers: string[] = [];
 56 |     if (event?.crew?.host)
 57 |       crewMembers.push(`🎙️ Ведучий: ${formatMember(event.crew.host)}`);
 58 |     if (event?.crew?.driver)
 59 |       crewMembers.push(`🚗 Водій: ${formatMember(event.crew.driver)}`);
 60 | 
 61 |     const city = await this.prisma.city.findUnique({
 62 |       where: { id: data.cityId },
 63 |       include: { users: { where: { role: 'MANAGER' }, take: 1 } },
 64 |     });
 65 | 
 66 |     // Отримуємо chatId відповідального працівника
 67 |     let assigneeChatId: string | null = null;
 68 |     if (data.assignedUserId) {
 69 |       const assignee = await this.prisma.user.findUnique({
 70 |         where: { id: data.assignedUserId },
 71 |         select: { telegramChatId: true, telegramId: true },
 72 |       });
 73 |       assigneeChatId =
 74 |         assignee?.telegramChatId ||
 75 |         (assignee?.telegramId && /^\d+$/.test(assignee.telegramId)
 76 |           ? assignee.telegramId
 77 |           : null);
 78 |     }
 79 | 
 80 |     const deadlineStr = data.deadline
 81 |       ? `\n⏰ <b>Дедлайн:</b> ${new Date(data.deadline).toLocaleDateString('uk-UA')}`
 82 |       : '';
 83 | 
 84 |     const assigneeStr = data.assignedUserName
 85 |       ? `\n👤 <b>Відповідальний:</b> ${data.assignedUserName}`
 86 |       : '';
 87 | 
 88 |     const manager = city?.users?.[0];
 89 |     const managerChatId =
 90 |       manager?.telegramChatId ||
 91 |       (manager?.telegramId && /^\d+$/.test(manager.telegramId)
 92 |         ? manager.telegramId
 93 |         : null);
 94 | 
 95 |     const text =
 96 |       `🚨 <b>Нова проблема!</b>\n\n` +
 97 |       `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
 98 |       `📅 <b>Подія:</b> ${data.eventName}\n\n` +
 99 |       `💬 <b>Повідомлення:</b>\n${data.message}` +
100 |       deadlineStr +
101 |       assigneeStr +
102 |       (crewMembers.length > 0
103 |         ? `\n\n👥 <b>Екіпаж:</b>\n${crewMembers.join('\n')}`
104 |         : '') +
105 |       `\n\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
106 | 
107 |     // Надсилаємо менеджеру міста
108 |     if (managerChatId)
109 |       await this.telegramService.sendMessage(managerChatId, text);
110 | 
111 |     // Надсилаємо відповідальному (якщо це не той самий менеджер)
112 |     if (assigneeChatId && assigneeChatId !== managerChatId) {
113 |       await this.telegramService.sendMessage(assigneeChatId, text);
114 |     }
115 | 
116 |     return issue;
117 |   }
118 | 
119 |   async findByCityId(cityId: string) {
120 |     return this.prisma.issueReport.findMany({
121 |       where: {
122 |         cityId,
123 |         // Одразу відсікаємо вирішені проблеми на рівні БД, щоб не вантажити мережу
124 |         status: { not: 'Виконано' },
125 |       },
126 |       // МИ ПРИБРАЛИ include: { event: ... }, бо schoolName та eventName
127 |       // вже збережені безпосередньо в моделі IssueReport
128 |       orderBy: { createdAt: 'desc' },
129 |     });
130 |   }
131 | 
132 |   async updateStatus(id: string, status: string) {
133 |     return this.prisma.issueReport.update({
134 |       where: { id },
135 |       data: { status },
136 |     });
137 |   }
138 | }
139 | 
```

### File: apps/backend/src/main.ts
```ts
  0 | import { NestFactory } from '@nestjs/core';
  1 | import { AppModule } from './app.module';
  2 | 
  3 | async function bootstrap() {
  4 |   const app = await NestFactory.create(AppModule);
  5 |   app.enableCors();
  6 |   await app.listen(process.env.PORT ?? 3000);
  7 | }
  8 | bootstrap();
  9 | 
```

### File: apps/backend/src/prisma/prisma.module.ts
```ts
  0 | import { Global, Module } from '@nestjs/common';
  1 | import { PrismaService } from './prisma.service';
  2 | 
  3 | @Global()
  4 | @Module({
  5 |   providers: [PrismaService],
  6 |   exports: [PrismaService],
  7 | })
  8 | export class PrismaModule {}
  9 | 
```

### File: apps/backend/src/prisma/prisma.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { PrismaService } from './prisma.service';
  2 | 
  3 | describe('PrismaService', () => {
  4 |   let service: PrismaService;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       providers: [PrismaService],
  9 |     }).compile();
 10 | 
 11 |     service = module.get<PrismaService>(PrismaService);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(service).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/prisma/prisma.service.ts
```ts
  0 | import { Injectable, OnModuleInit } from '@nestjs/common';
  1 | import { PrismaClient } from '@prisma/client';
  2 | 
  3 | @Injectable()
  4 | export class PrismaService extends PrismaClient implements OnModuleInit {
  5 |   async onModuleInit() {
  6 |     await this.$connect();
  7 |   }
  8 | }
  9 | 
```

### File: apps/backend/src/projects/projects.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Get,
  3 |   Post,
  4 |   Delete,
  5 |   Param,
  6 |   Body,
  7 |   UseGuards,
  8 | } from '@nestjs/common';
  9 | import { ProjectsService } from './projects.service';
 10 | import { AuthGuard } from '../auth/auth.guard';
 11 | 
 12 | @Controller('projects')
 13 | @UseGuards(AuthGuard)
 14 | export class ProjectsController {
 15 |   constructor(private readonly projectsService: ProjectsService) {}
 16 | 
 17 |   @Get()
 18 |   findAll() {
 19 |     return this.projectsService.findAll();
 20 |   }
 21 | 
 22 |   @Post()
 23 |   create(@Body() body: { name: string; color: string }) {
 24 |     return this.projectsService.create(body);
 25 |   }
 26 | 
 27 |   @Delete(':id')
 28 |   remove(@Param('id') id: string) {
 29 |     return this.projectsService.remove(id);
 30 |   }
 31 | }
 32 | 
```

### File: apps/backend/src/projects/projects.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { ProjectsService } from './projects.service';
  2 | import { ProjectsController } from './projects.controller';
  3 | 
  4 | @Module({
  5 |   providers: [ProjectsService],
  6 |   controllers: [ProjectsController],
  7 | })
  8 | export class ProjectsModule {}
  9 | 
```

### File: apps/backend/src/projects/projects.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | 
  3 | @Injectable()
  4 | export class ProjectsService {
  5 |   constructor(private prisma: PrismaService) {}
  6 | 
  7 |   findAll() {
  8 |     return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  9 |   }
 10 | 
 11 |   create(data: { name: string; color: string }) {
 12 |     return this.prisma.project.create({ data });
 13 |   }
 14 | 
 15 |   remove(id: string) {
 16 |     return this.prisma.project.delete({ where: { id } });
 17 |   }
 18 | }
 19 | 
```

### File: apps/backend/src/schools/parser.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import axios from 'axios';
  2 | import * as cheerio from 'cheerio';
  3 | 
  4 | const CITY_CONFIG: Record<
  5 |   string,
  6 |   { schools: string; kindergartens: string; domain: string }
  7 | > = {
  8 |   Львів: {
  9 |     domain: 'https://lv.isuo.org',
 10 |     schools: 'https://lv.isuo.org/authorities/schools-list/id/681',
 11 |     kindergartens: 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
 12 |   },
 13 |   'Івано-Франківськ': {
 14 |     domain: 'https://if.isuo.org',
 15 |     schools: 'https://if.isuo.org/koatuu/schools-list/id/2610100000',
 16 |     kindergartens: 'https://if.isuo.org/koatuu/preschools-list/id/2610100000',
 17 |   },
 18 |   Чернівці: {
 19 |     domain: 'https://cv.isuo.org',
 20 |     schools: 'https://cv.isuo.org/koatuu/schools-list/id/7310100000',
 21 |     kindergartens: 'https://cv.isuo.org/koatuu/preschools-list/id/7310100000',
 22 |   },
 23 |   Тернопіль: {
 24 |     domain: 'https://te.isuo.org',
 25 |     schools: 'https://te.isuo.org/koatuu/schools-list/id/6110100000',
 26 |     kindergartens: 'https://te.isuo.org/koatuu/preschools-list/id/6110100000',
 27 |   },
 28 |   Ужгород: {
 29 |     domain: 'https://zk.isuo.org',
 30 |     schools: 'https://zk.isuo.org/koatuu/schools-list/id/2110100000',
 31 |     kindergartens: 'https://zk.isuo.org/koatuu/preschools-list/id/2110100000',
 32 |   },
 33 | };
 34 | 
 35 | @Injectable()
 36 | export class ParserService {
 37 |   async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
 38 |     try {
 39 |       let url = schoolUrl;
 40 |       if (!url) {
 41 |         const urls =
 42 |           type === 'Садочок'
 43 |             ? [
 44 |                 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
 45 |                 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
 46 |               ]
 47 |             : [
 48 |                 'https://lv.isuo.org/authorities/schools-list/id/681',
 49 |                 'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
 50 |               ];
 51 |         const normalizedSearch = schoolName
 52 |           .toLowerCase()
 53 |           .replace(/\s+/g, ' ')
 54 |           .trim();
 55 |         for (const searchUrl of urls) {
 56 |           const listResponse = await axios.get(searchUrl);
 57 |           const $list = cheerio.load(listResponse.data);
 58 |           $list('table.zebra-stripe.list tr').each((_, row) => {
 59 |             const name = $list(row)
 60 |               .find('td:nth-child(2) a')
 61 |               .text()
 62 |               .replace(/\s+/g, ' ')
 63 |               .trim()
 64 |               .toLowerCase();
 65 |             if (name.includes(normalizedSearch)) {
 66 |               const href = $list(row).find('td:nth-child(2) a').attr('href');
 67 |               if (href) {
 68 |                 url = `https://lv.isuo.org${href}`;
 69 |                 return false;
 70 |               }
 71 |             }
 72 |           });
 73 |           if (url) break;
 74 |         }
 75 |       }
 76 |       if (!url) {
 77 |         console.log(`Заклад не знайдено: ${schoolName}`);
 78 |         return null;
 79 |       }
 80 |       const response = await axios.get(url);
 81 |       const $ = cheerio.load(response.data);
 82 |       const getField = (labels: string[]): string => {
 83 |         let result = '';
 84 |         for (const label of labels) {
 85 |           const th = $('th')
 86 |             .filter((_, el) => $(el).text().trim().includes(label))
 87 |             .first();
 88 |           if (th.length) {
 89 |             result = th.next('td').text().trim();
 90 |             break;
 91 |           }
 92 |         }
 93 |         return result;
 94 |       };
 95 |       const address = getField(['Поштова адреса', 'Адреса']);
 96 |       const director = getField(['Директор', 'Завідувач', 'Керівник']);
 97 |       const studentsRaw = getField([
 98 |         'Кількість учнів',
 99 |         'Кількість дітей',
100 |         'Кількість вихованців',
101 |       ]);
102 |       const childrenCount =
103 |         parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;
104 |       return { address, director, childrenCount };
105 |     } catch (error) {
106 |       console.error('Помилка парсингу закладу:', error);
107 |       return null;
108 |     }
109 |   }
110 | 
111 |   async searchSchools(
112 |     query: string,
113 |     type?: string,
114 |   ): Promise<{ name: string; url: string }[]> {
115 |     try {
116 |       const urls =
117 |         type === 'Садочок'
118 |           ? [
119 |               'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
120 |               'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
121 |             ]
122 |           : [
123 |               'https://lv.isuo.org/authorities/schools-list/id/681',
124 |               'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
125 |             ];
126 |       const results: { name: string; url: string }[] = [];
127 |       const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
128 |       const isNumericQuery = /^\d+$/.test(normalizedQuery);
129 |       const numericRegex = isNumericQuery
130 |         ? new RegExp(`(?<!\d)${normalizedQuery}(?!\d)`)
131 |         : null;
132 |       for (const url of urls) {
133 |         const response = await axios.get(url);
134 |         const $ = cheerio.load(response.data);
135 |         $('table.zebra-stripe.list tr').each((_, row) => {
136 |           const rawName = $(row).find('td:nth-child(2) a').text();
137 |           const name = rawName.replace(/\s+/g, ' ').trim();
138 |           const href = $(row).find('td:nth-child(2) a').attr('href');
139 |           if (name && href) {
140 |             const lowerName = name.toLowerCase();
141 |             let matches = false;
142 |             if (isNumericQuery && numericRegex) {
143 |               matches = numericRegex.test(lowerName);
144 |             } else {
145 |               matches = lowerName.includes(normalizedQuery);
146 |             }
147 |             if (matches)
148 |               results.push({ name, url: `https://lv.isuo.org${href}` });
149 |           }
150 |         });
151 |       }
152 |       return results.slice(0, 10);
153 |     } catch (error) {
154 |       console.error('Помилка пошуку закладів:', error);
155 |       return [];
156 |     }
157 |   }
158 | 
159 |   // Отримати всі школи/садочки конкретного міста з isuo.org
160 |   async getAllSchoolsForCity(
161 |     cityName: string,
162 |     type: 'Школа' | 'Садочок' = 'Школа',
163 |   ): Promise<{ name: string; url: string }[]> {
164 |     const config = CITY_CONFIG[cityName];
165 |     if (!config) {
166 |       console.log(`Місто "${cityName}" не підтримується для імпорту`);
167 |       return [];
168 |     }
169 | 
170 |     const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
171 |     const domain = config.domain;
172 | 
173 |     // Використовуємо Map для зберігання об'єктів { name, url }
174 |     const resultsMap = new Map<string, { name: string; url: string }>();
175 | 
176 |     for (let page = 1; page <= 20; page++) {
177 |       const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
178 |       try {
179 |         const response = await axios.get(url, { timeout: 15000 });
180 |         const $ = cheerio.load(response.data);
181 |         let foundOnPage = 0;
182 | 
183 |         $('table.zebra-stripe.list tr').each((_, row) => {
184 |           const name = $(row)
185 |             .find('td:nth-child(2) a')
186 |             .text()
187 |             .replace(/\s+/g, ' ')
188 |             .trim();
189 |           const href = $(row).find('td:nth-child(2) a').attr('href');
190 | 
191 |           if (name && href && name !== 'Fullname') {
192 |             // Нормалізація для перевірки дублів
193 |             const normalizedKey = name.toLowerCase().replace(/\s+/g, '');
194 | 
195 |             if (!resultsMap.has(normalizedKey)) {
196 |               resultsMap.set(normalizedKey, { name, url: `${domain}${href}` });
197 |               foundOnPage++;
198 |             }
199 |           }
200 |         });
201 | 
202 |         if (foundOnPage === 0) break;
203 |       } catch {
204 |         break;
205 |       }
206 |     }
207 | 
208 |     return Array.from(resultsMap.values());
209 |   }
210 |   getSupportedCities(): string[] {
211 |     return Object.keys(CITY_CONFIG);
212 |   }
213 | }
214 | 
```

### File: apps/backend/src/schools/school-contacts.seed.ts
```ts
  0 | import { PrismaClient } from '@prisma/client';
  1 | 
  2 | const prisma = new PrismaClient();
  3 | 
  4 | const contacts = [
  5 |   // ================= ШКОЛИ =================
  6 |   // ── числові номери ──
  7 |   { schoolNumber: '1',   contactName: 'Надія Михайлівна',          phone: '0975695519', role: 'Завуч' },
  8 |   { schoolNumber: '2',   contactName: 'Наталя',                     phone: '0974064095', role: 'Завуч' },
  9 |   { schoolNumber: '5',   contactName: 'Лариса',                     phone: '0673622534', role: 'Директор' },
 10 |   { schoolNumber: '9',   contactName: 'Віра Ярославівна',           phone: '0674935124', role: 'Директор' },
 11 |   { schoolNumber: '9',   contactName: 'Леся',                       phone: '0673380894', role: 'Завуч' },
 12 |   { schoolNumber: '13',  contactName: 'Марта Романівна',            phone: '0675839806', role: 'Директор' },
 13 |   { schoolNumber: '15',  contactName: 'Ірина Андріївна',            phone: '0679062500', role: 'Завуч' },
 14 |   { schoolNumber: '17',  contactName: 'Ельвіра',                    phone: '0678578514', role: 'Педорг' },
 15 |   { schoolNumber: '18',  contactName: 'Роман',                      phone: '0972587179', role: 'Завуч' },
 16 |   { schoolNumber: '20',  contactName: 'Наталя Іванівна',            phone: '0506747111', role: 'Завуч' },
 17 |   { schoolNumber: '23',  contactName: 'Микола Шостак',              phone: '0632232178', role: 'Педорг' },
 18 |   { schoolNumber: '27',  contactName: 'Романа Михайлівна',          phone: '0973113778', role: 'Завуч' },
 19 |   { schoolNumber: '27',  contactName: 'Наталя Куліш',               phone: '0677552743', role: 'Завуч' },
 20 |   { schoolNumber: '28',  contactName: 'Олена Олегівна',             phone: '0679243130', role: 'Завуч' },
 21 |   { schoolNumber: '30',  contactName: 'Світлана Михальвіна',        phone: '0974436542', role: 'Завуч' },
 22 |   { schoolNumber: '30',  contactName: 'Ольга Володимирівна',        phone: '0679596199', role: 'Завуч' },
 23 |   { schoolNumber: '31',  contactName: 'Христина Ярославівна',       phone: '0983804403', role: 'Директор' },
 24 |   { schoolNumber: '31',  contactName: 'Леся Оресівна',              phone: '0673567679', role: 'Завуч' },
 25 |   { schoolNumber: '34',  contactName: 'Мирон',                      phone: '0938668520', role: 'Педорг' },
 26 |   { schoolNumber: '36',  contactName: 'Тетяна',                     phone: '0990407941', role: 'Завуч' },
 27 |   { schoolNumber: '40',  contactName: 'Юлія',                       phone: '0976015839', role: 'Педорг' },
 28 |   { schoolNumber: '40',  contactName: 'Ірина',                      phone: '0673021531', role: 'Педорг' },
 29 |   { schoolNumber: '44',  contactName: 'Стефанович Людмила Олександрівна', phone: '0677838274', role: 'Директор' },
 30 |   { schoolNumber: '45',  contactName: 'Наталія Аркадіївна',         phone: '0677123961', role: 'Завуч' },
 31 |   { schoolNumber: '46',  contactName: 'Ірина Іларіонівна',          phone: '0676969337', role: 'Завуч' },
 32 |   { schoolNumber: '46',  contactName: 'Юля',                        phone: '0961791595', role: 'Педорг' },
 33 |   { schoolNumber: '48',  contactName: 'Роман Васильович',           phone: '0982310957', role: 'Директор' },
 34 |   { schoolNumber: '49',  contactName: 'Уляна',                      phone: '0681371457', role: 'Педорг' },
 35 |   { schoolNumber: '50',  contactName: "Мар'яна Іванівна",           phone: '0674901746', role: 'Завуч' },
 36 |   { schoolNumber: '51',  contactName: 'Ірина Миколаївна',           phone: '0972595956', role: 'Завуч' },
 37 |   { schoolNumber: '52',  contactName: 'Світлана',                   phone: '0677070497', role: 'Директор' },
 38 |   { schoolNumber: '54',  contactName: 'Любов Іванівна',             phone: '0677715647', role: 'Завуч' },
 39 |   { schoolNumber: '60',  contactName: 'Людмила',                    phone: '0973888255', role: 'Директор' },
 40 |   { schoolNumber: '63',  contactName: 'Іванець Ольга Євгенівна',    phone: '0977345920', role: 'Завуч' },
 41 |   { schoolNumber: '65',  contactName: 'Марія',                      phone: '0975391164', role: 'Педорг' },
 42 |   { schoolNumber: '66',  contactName: 'Мирослава',                  phone: '0977711381', role: 'Завуч' },
 43 |   { schoolNumber: '66',  contactName: 'Назар Оксана',               phone: '0679686514', role: 'Завуч' },
 44 |   { schoolNumber: '67',  contactName: 'Оксана Володимирівна',       phone: '0673705262', role: 'Завуч' },
 45 |   { schoolNumber: '68',  contactName: 'Уляна',                      phone: '0973004954', role: 'Педорг' },
 46 |   { schoolNumber: '69',  contactName: 'Тетяна Володимирівна',       phone: '0673041659', role: 'Завуч' },
 47 |   { schoolNumber: '70',  contactName: 'Марта',                      phone: '0676726984', role: 'Директор' },
 48 |   { schoolNumber: '70',  contactName: 'Марія',                      phone: '0966063264', role: 'Завуч' },
 49 |   { schoolNumber: '71',  contactName: 'Марія',                      phone: '0676644983', role: 'Педорг' },
 50 |   { schoolNumber: '71',  contactName: 'Роман',                      phone: '0677514127', role: 'Директор' },
 51 |   { schoolNumber: '72',  contactName: 'Олена Михайлівна',           phone: '0677948577', role: 'Завуч' },
 52 |   { schoolNumber: '73',  contactName: 'Світлана Богданівна',        phone: '0971844043', role: 'Директор' },
 53 |   { schoolNumber: '73',  contactName: 'Інна Євгенівна',             phone: '0678829581', role: 'Завуч' },
 54 |   { schoolNumber: '80',  contactName: 'Наталя',                     phone: '0967331419', role: 'Завуч' },
 55 |   { schoolNumber: '81',  contactName: 'Галина Антонівна',           phone: '0673662853', role: 'Завуч' },
 56 |   { schoolNumber: '81',  contactName: 'Андріана',                   phone: '0502867516', role: 'Завуч' },
 57 |   { schoolNumber: '84',  contactName: 'Тетяна Іванівна',            phone: '0974437171', role: 'Завуч' },
 58 |   { schoolNumber: '86',  contactName: 'Руслана Василівна',          phone: '0964066413', role: 'Директор' },
 59 |   { schoolNumber: '86',  contactName: 'Анна',                       phone: '0638694484', role: 'Педорг' },
 60 |   { schoolNumber: '90',  contactName: 'Ірина Іванівна',             phone: '0974392839', role: 'Завуч' },
 61 |   { schoolNumber: '90',  contactName: 'Людмила',                    phone: '0676092693', role: 'Завуч' },
 62 |   { schoolNumber: '93',  contactName: 'Ірина Петрівна',             phone: '0966591509', role: 'Директор' },
 63 |   { schoolNumber: '95',  contactName: 'Марія Орестівна',            phone: '0979515318', role: 'Завуч' },
 64 |   { schoolNumber: '95',  contactName: 'Ірина',                      phone: '0972392191', role: 'Педорг' },
 65 |   { schoolNumber: '96',  contactName: 'Любов',                      phone: '0689529174', role: 'Педорг' },
 66 |   { schoolNumber: '97',  contactName: 'Наталя Любомирівна',         phone: '0961390913', role: 'Завуч' },
 67 |   { schoolNumber: '123', contactName: 'Марія Андріївна',            phone: '0679334856', role: 'Директор' },
 68 | 
 69 |   // ── назви без номера ──
 70 |   { schoolNumber: 'Арніка',             contactName: 'Світлана Михайлівна',  phone: '0979325399', role: 'Педорг' },
 71 |   { schoolNumber: 'Гроно',              contactName: 'Оксана Теодорівна',    phone: '0971147211', role: 'Завуч' },
 72 |   { schoolNumber: 'Джерельце',          contactName: 'Світлана Петрівна',    phone: '0673140267', role: 'Завуч' },
 73 |   { schoolNumber: 'Дивосвіт',           contactName: 'Наталя Миколаївна',    phone: '0932196651', role: 'Педорг' },
 74 |   { schoolNumber: 'Європейський ліцей', contactName: 'Галина Богданівна',    phone: '0974829920', role: 'Завуч' },
 75 |   { schoolNumber: 'Лідер',              contactName: 'Вадим',                phone: '0687584626', role: 'Педорг' },
 76 |   { schoolNumber: 'Лідер',              contactName: 'Іванка',               phone: '0965150436', role: 'Завуч' },
 77 |   { schoolNumber: 'Ліцей Львів',        contactName: 'Мирослава Іванівна',   phone: '0673536774', role: 'Завуч' },
 78 |   { schoolNumber: 'Ліцей Пулюя',        contactName: 'Наталя',               phone: '0671794604', role: 'Завуч' },
 79 |   { schoolNumber: 'Ліцей Стуса',        contactName: 'Тетяна',               phone: '0984989494', role: 'Завуч' },
 80 |   { schoolNumber: 'Оріяна',             contactName: 'Ірина Богданівна',     phone: '0673702402', role: 'Директор' },
 81 |   { schoolNumber: 'Оріяна',             contactName: 'Юрій',                 phone: '0974751935', role: 'Педорг' },
 82 |   { schoolNumber: 'Первоцвіт',          contactName: 'Христина Іванівна',    phone: '0677573109', role: 'Директор' },
 83 |   { schoolNumber: 'Провесінь',          contactName: 'Сергій',               phone: '0506020447', role: 'Педорг' },
 84 |   { schoolNumber: 'Провесінь',          contactName: 'Анджела',              phone: '0676606897', role: 'Педорг' },
 85 |   { schoolNumber: 'Світанок',           contactName: 'Лідія Миколаївна',     phone: '0679269319', role: 'Директор' },
 86 |   { schoolNumber: 'Світанок',           contactName: 'Ореста Шот',           phone: '0677018705', role: 'Завуч' },
 87 |   { schoolNumber: 'Світанок',           contactName: 'Ірина',                phone: '0674398980', role: 'Завуч' },
 88 |   { schoolNumber: 'Симоненка',          contactName: 'Уляна',                phone: '0969135903', role: 'Завуч' },
 89 |   { schoolNumber: 'Сихівський ліцей',   contactName: 'Надія',                phone: '0964667179', role: 'Завуч' },
 90 |   { schoolNumber: 'Початкова Школа Радості', contactName: 'Тетяна',          phone: '0967320197', role: 'Завуч' },
 91 |   { schoolNumber: 'Початкова Школа Радості', contactName: 'Наталя',          phone: '0674244920', role: 'Педорг' },
 92 |   { schoolNumber: 'Альфа',              contactName: 'Ірина',                phone: '0935122623', role: 'Завуч' },
 93 | 
 94 |   // ================= САДОЧКИ =================
 95 |   { schoolNumber: '52', contactName: 'Олена Віталіївна Добранюк', phone: '0964692943', role: 'Завідувачка' },
 96 |   { schoolNumber: 'Веселка', contactName: 'Андриц Людмила Федорівна', phone: '0632836453', role: 'Завідувачка' },
 97 |   { schoolNumber: '149', contactName: 'Василина Тарасівна', phone: '0987615106', role: 'Завідувачка' },
 98 |   { schoolNumber: '132', contactName: 'Наталя', phone: '0971620805', role: 'Методист' },
 99 |   { schoolNumber: 'Перші кроки', contactName: 'Мирослава Ярославівна', phone: '0963493423', role: 'Завідувач' },
100 |   { schoolNumber: '130', contactName: 'Ольга', phone: '0638694484', role: 'Методистка' },
101 |   { schoolNumber: '40', contactName: 'Світлана', phone: '0983365931', role: 'Заступник' },
102 |   { schoolNumber: '144', contactName: 'Наталя', phone: '0677670485', role: 'Методист' },
103 |   { schoolNumber: 'Барвінок', contactName: 'Наталя Витрикуш', phone: '0676809966', role: 'Завідувачка' },
104 |   { schoolNumber: '45', contactName: 'Наталя Шергіна', phone: '0675814381', role: 'Директор' },
105 |   { schoolNumber: '67', contactName: 'Тетяна Юріївна', phone: '0966063398', role: 'Директор' },
106 |   { schoolNumber: '118', contactName: 'Наталя Дмитрівна', phone: '0969847495', role: 'Директор' },
107 |   { schoolNumber: '118', contactName: 'Оксана Ярославівна', phone: '0677881629', role: 'Методист' },
108 |   { schoolNumber: '169', contactName: 'Галина Василівна', phone: '0962817175', role: null },
109 |   { schoolNumber: '175', contactName: 'Богдана', phone: '0687096641', role: 'Директор' },
110 |   { schoolNumber: '170', contactName: 'Ірина', phone: '0986373627', role: null },
111 |   { schoolNumber: '167', contactName: 'Юлія', phone: '0687096641', role: 'Директор' },
112 |   { schoolNumber: '42', contactName: 'Наталя Йосипівна', phone: '0677453052', role: null },
113 |   { schoolNumber: '33', contactName: 'Олександра Мирославівна', phone: '0505049049', role: null },
114 |   { schoolNumber: '134', contactName: 'Леся', phone: '0969740462', role: null },
115 |   { schoolNumber: '165', contactName: 'Марта Андріївна', phone: '0639377896', role: null },
116 |   { schoolNumber: '159', contactName: 'Ірина Олександрівна', phone: '0972430286', role: null },
117 |   { schoolNumber: '163', contactName: 'Оксана Ярославівна Сновидович', phone: '0963943974', role: null },
118 |   { schoolNumber: '153', contactName: 'Юля', phone: '0939907888', role: 'Методист' },
119 |   { schoolNumber: '39', contactName: 'Оксана Антонівна', phone: '0676820705', role: null },
120 |   { schoolNumber: '73', contactName: 'Ярослава', phone: '0679767575', role: null },
121 |   { schoolNumber: '134', contactName: 'Ольга', phone: '0679495251', role: 'Заступник' },
122 |   { schoolNumber: '69', contactName: 'Уляна', phone: '0673392742', role: 'Директор' },
123 |   { schoolNumber: '130', contactName: 'Зоряна', phone: '0677014722', role: null },
124 |   { schoolNumber: '52', contactName: 'Софія', phone: '0935428770', role: 'Діловод' },
125 |   { schoolNumber: '181', contactName: 'Марія Корпан', phone: '0673142095', role: 'Директор' },
126 |   { schoolNumber: '17', contactName: 'Світлана', phone: '0973047285', role: 'Директор' },
127 |   { schoolNumber: '44', contactName: 'Надія', phone: '0932342106', role: 'Методист' },
128 |   { schoolNumber: '170', contactName: 'Ірина', phone: '0986373627', role: 'Методист' },
129 |   { schoolNumber: '3', contactName: 'Наталя Ігорівна', phone: '0973436380', role: null },
130 |   { schoolNumber: '176', contactName: 'Юлія Андріївна', phone: '0665244245', role: 'Директор' },
131 |   { schoolNumber: '179', contactName: 'Віра Володимирівна', phone: '0672590052', role: 'Директор' },
132 |   { schoolNumber: 'Вільні', contactName: 'Іванна Михайлівна', phone: '0974788019', role: 'Директор' },
133 |   { schoolNumber: '105', contactName: 'Лідія Василівна', phone: '0679592370', role: 'Директор' },
134 |   { schoolNumber: '7', contactName: 'Уляна Богданівна', phone: '0674256644', role: 'Директор' },
135 |   { schoolNumber: '168', contactName: 'Ядельська Оксана Богданівна', phone: '0969105724', role: 'Директор' },
136 |   { schoolNumber: '139', contactName: 'Ірина', phone: '0970488672', role: 'Директор' },
137 |   { schoolNumber: '167', contactName: 'Зоряна Ярославівна', phone: '0672684699', role: 'Директор' },
138 |   { schoolNumber: '38', contactName: 'Ірина Олегівна', phone: '0679475122', role: null },
139 |   { schoolNumber: '132', contactName: 'Надія Леонівна', phone: '0974429599', role: 'Директор' },
140 |   { schoolNumber: '92', contactName: 'Ольга', phone: '0679492252', role: 'Директор' },
141 |   { schoolNumber: '33', contactName: 'Леся Породько', phone: '0505049049', role: 'Директор' },
142 |   { schoolNumber: '155', contactName: 'Ірина Михайлівна', phone: '0677301582', role: 'Директор' },
143 |   { schoolNumber: '183', contactName: 'Володимир Михайлович', phone: '0970256488', role: 'Директор' },
144 |   { schoolNumber: '70', contactName: 'Ольга Петрівна', phone: '0936992997', role: 'Директор' },
145 |   { schoolNumber: '18', contactName: 'Наталя Бондаренко', phone: '0505938826', role: 'Директор' },
146 |   { schoolNumber: '131', contactName: 'Любомира', phone: '0673657490', role: 'Директор' },
147 |   { schoolNumber: '9', contactName: 'Зоряна Семенівна', phone: '0677628687', role: 'Директор' },
148 |   { schoolNumber: '26', contactName: 'Ольга Іванівна', phone: '0977476237', role: 'Директор' },
149 |   { schoolNumber: '23', contactName: 'Соломія Ігорівна', phone: '0975616807', role: 'Директор' },
150 |   { schoolNumber: '1', contactName: 'Оксана', phone: '0675937156', role: 'Директор' },
151 |   { schoolNumber: '109', contactName: 'Катерина Петрівна', phone: '0975173313', role: 'Директор' },
152 |   { schoolNumber: '30', contactName: 'Олена Йосифівна', phone: '0974649258', role: 'Директор' },
153 |   { schoolNumber: '51', contactName: 'Вікторія Романівна', phone: '0974207708', role: 'Директор' },
154 |   { schoolNumber: '21', contactName: 'Анастасія Віталіївна', phone: '0671727948', role: 'Директор' },
155 |   { schoolNumber: '75', contactName: 'Наталія Володимирівна', phone: '0972431888', role: 'Директор' },
156 |   { schoolNumber: '166', contactName: 'Мар\'яна Михайлівна', phone: '0975300502', role: 'Директор' },
157 |   { schoolNumber: '127', contactName: 'Галина Йосифівна', phone: '0963460339', role: 'Директор' },
158 |   { schoolNumber: '86', contactName: 'Стефанія Миколаївна', phone: '0674936394', role: 'Директор' },
159 |   { schoolNumber: '114', contactName: 'Ольга Володимирівна', phone: '0983673279', role: 'Директор' },
160 |   { schoolNumber: '128', contactName: 'Лідія Михайлівна', phone: '0979790881', role: 'Директор' },
161 |   { schoolNumber: 'Золотий ключик', contactName: 'Галина', phone: '0663914517', role: 'Методист' },
162 |   { schoolNumber: 'Казка', contactName: 'Ірина Михайлівна', phone: '0677322435', role: 'Директор' },
163 |   { schoolNumber: 'Львівський 2 сад', contactName: 'Олена Юріївна', phone: '0677270402', role: 'Директор' },
164 |   { schoolNumber: '160', contactName: 'Віра Каролівна', phone: '0968009925', role: 'Директор' },
165 |   { schoolNumber: '129', contactName: 'Оксана Зенонівна', phone: '0678112120', role: 'Директор' },
166 |   { schoolNumber: '93', contactName: 'Марія Ярославівна', phone: '0676950870', role: 'Директор' },
167 |   { schoolNumber: '48', contactName: 'Наталія Остапівна', phone: '0974428307', role: 'Директор' },
168 |   { schoolNumber: '135', contactName: 'Галина Ярославівна', phone: '0673994741', role: 'Директор' },
169 |   { schoolNumber: '188', contactName: 'Ірина Вікторівна', phone: '0933054378', role: 'Директор' },
170 |   { schoolNumber: '25', contactName: 'Лілія Богданівна', phone: '0680215346', role: 'Директор' },
171 |   { schoolNumber: '32', contactName: 'Наталія Василівна', phone: '0678119933', role: 'Директор' },
172 |   { schoolNumber: '171', contactName: 'Ірина Корніївна', phone: '0972576026', role: 'Директор' },
173 |   { schoolNumber: '96', contactName: 'Світлана Петрівна', phone: '0676739477', role: 'Директор' },
174 |   { schoolNumber: '94', contactName: 'Оксана Ярославівна', phone: '0671447681', role: 'Директор' },
175 |   { schoolNumber: '156/162', contactName: 'Оксана Ісламівна', phone: '0985835819', role: 'Директор' },
176 |   { schoolNumber: '71', contactName: 'Валентина Гермогенівна', phone: '0976781981', role: 'Директор' },
177 |   { schoolNumber: '187', contactName: 'Ольга Олексіївна', phone: '0674599119', role: 'Директор' },
178 |   { schoolNumber: '14', contactName: 'Оксана Любомирівна', phone: '0677247619', role: 'Директор' },
179 |   { schoolNumber: 'Любисток', contactName: 'Марія', phone: '0685227373', role: 'Методист' },
180 |   { schoolNumber: '106', contactName: 'Галина Володимирівна', phone: '0675839839', role: 'Директор' },
181 |   { schoolNumber: '104', contactName: 'Тетяна Ярославівна', phone: '0678034951', role: 'Директор' },
182 |   { schoolNumber: '116', contactName: 'Ірина Іванівна', phone: '0968145853', role: 'Директор' },
183 |   { schoolNumber: '57', contactName: 'Руслана Володимирівна', phone: '0966507883', role: 'Директор' },
184 |   { schoolNumber: '184', contactName: 'Марія Іванівна', phone: '2546872', role: 'Директор' },
185 |   { schoolNumber: '43', contactName: 'Віра', phone: '0984284448', role: 'Методист' },
186 |   { schoolNumber: '29', contactName: 'Вікторія Олександрівна', phone: '0673041528', role: 'Директор' }
187 | ];
188 | 
189 | async function main() {
190 |   console.log('Seeding school contacts...');
191 |   
192 |   // Видаляємо старі контакти
193 |   await prisma.schoolContact.deleteMany({});
194 | 
195 |   for (const c of contacts) {
196 |     await prisma.schoolContact.create({
197 |       data: { city: 'Львів', ...c },
198 |     });
199 |   }
200 |   
201 |   console.log(`Done: ${contacts.length} contacts inserted`);
202 | }
203 | 
204 | main()
205 |   .catch(console.error)
206 |   .finally(() => prisma.$disconnect());
207 |   
```

### File: apps/backend/src/schools/schools.controller.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { SchoolsController } from './schools.controller';
  2 | 
  3 | describe('SchoolsController', () => {
  4 |   let controller: SchoolsController;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       controllers: [SchoolsController],
  9 |     }).compile();
 10 | 
 11 |     controller = module.get<SchoolsController>(SchoolsController);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(controller).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/schools/schools.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Get,
  3 |   Post,
  4 |   Body,
  5 |   Param,
  6 |   Patch,
  7 |   Delete,
  8 |   Query,
  9 | } from '@nestjs/common';
 10 | import { SchoolsService } from './schools.service';
 11 | import { ParserService } from './parser.service';
 12 | 
 13 | @Controller('schools')
 14 | export class SchoolsController {
 15 |   constructor(
 16 |     private readonly schoolsService: SchoolsService,
 17 |     private readonly parserService: ParserService,
 18 |   ) {}
 19 | 
 20 |   @Post('bulk-import')
 21 |   bulkImport(@Body() body: { cityId: string; type?: string }) {
 22 |     return this.schoolsService.bulkImport(
 23 |       body.cityId,
 24 |       (body.type as 'Школа' | 'Садочок') || 'Школа',
 25 |     );
 26 |   }
 27 | 
 28 |   @Get('supported-cities')
 29 |   getSupportedCities() {
 30 |     return this.parserService.getSupportedCities();
 31 |   }
 32 | 
 33 |   @Post()
 34 |   create(
 35 |     @Body()
 36 |     body: {
 37 |       name: string;
 38 |       type: string;
 39 |       cityId: string;
 40 |       sourceUrl?: string;
 41 |     },
 42 |   ) {
 43 |     return this.schoolsService.create(body);
 44 |   }
 45 | 
 46 |   @Get() findAll(@Query('minimal') minimal?: string) {
 47 |     return this.schoolsService.findAll(minimal === 'true');
 48 |   }
 49 | 
 50 |   // ⚠️ ВАЖЛИВО: цей маршрут МАЄ стояти ДО @Get(':id')
 51 |   @Get('search')
 52 |   search(@Query('q') q: string, @Query('type') type: string) {
 53 |     return this.parserService.searchSchools(q, type);
 54 |   }
 55 | 
 56 |   @Get(':id')
 57 |   findOne(@Param('id') id: string) {
 58 |     return this.schoolsService.findOne(id);
 59 |   }
 60 | 
 61 |   @Patch(':id')
 62 |   update(@Param('id') id: string, @Body() body: any) {
 63 |     return this.schoolsService.update(id, body);
 64 |   }
 65 | 
 66 |   @Delete(':id')
 67 |   remove(@Param('id') id: string) {
 68 |     return this.schoolsService.remove(id);
 69 |   }
 70 | 
 71 |   @Get('contacts/search')
 72 |   searchContacts(@Query('q') q: string, @Query('city') city: string) {
 73 |     return this.schoolsService.searchContacts(q, city);
 74 |   }
 75 | }
 76 | 
```

### File: apps/backend/src/schools/schools.module.ts
```ts
  0 | import { Module, forwardRef } from '@nestjs/common';
  1 | import { SchoolsService } from './schools.service';
  2 | import { SchoolsController } from './schools.controller';
  3 | import { EventsModule } from '../events/events.module';
  4 | import { ParserService } from './parser.service'; // Переконайся, що цей шлях правильний
  5 | 
  6 | @Module({
  7 |   imports: [forwardRef(() => EventsModule)],
  8 |   controllers: [SchoolsController],
  9 |   providers: [SchoolsService, ParserService], // ParserService має бути ТУТ
 10 |   exports: [SchoolsService, ParserService],   // І ТУТ
 11 | })
 12 | export class SchoolsModule {}
```

### File: apps/backend/src/schools/schools.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { SchoolsService } from './schools.service';
  2 | 
  3 | describe('SchoolsService', () => {
  4 |   let service: SchoolsService;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       providers: [SchoolsService],
  9 |     }).compile();
 10 | 
 11 |     service = module.get<SchoolsService>(SchoolsService);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(service).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/schools/schools.service.ts
```ts
  0 | import { Injectable, forwardRef, Inject } from '@nestjs/common';
  1 | import { EventsService } from '../events/events.service';
  2 | import { ParserService } from './parser.service';
  3 | import { PrismaService } from '../prisma/prisma.service'; // Використовуємо відносний шлях для надійності
  4 | 
  5 | @Injectable()
  6 | export class SchoolsService {
  7 |   constructor(
  8 |     @Inject(forwardRef(() => EventsService))
  9 |     private readonly eventsService: EventsService,
 10 |     private readonly parserService: ParserService,
 11 |     private readonly prisma: PrismaService,
 12 |   ) {}
 13 | 
 14 |   async create(data: {
 15 |     name: string;
 16 |     type: string;
 17 |     cityId: string;
 18 |     sourceUrl?: string;
 19 |     director?: string;
 20 |     phone?: string;
 21 |     address?: string;
 22 |     childrenCount?: number;
 23 |   }) {
 24 |     const { sourceUrl, ...schoolData } = data;
 25 | 
 26 |     // Використовуємо this.prisma замість prisma
 27 |     const newSchool = await this.prisma.school.create({
 28 |       data: schoolData,
 29 |     });
 30 | 
 31 |     // Запускаємо парсинг у фоні
 32 |     this.parserService
 33 |       // ДОДАЛИ data.type третім аргументом
 34 |       .parseSchoolData(data.name, sourceUrl, data.type)
 35 |       .then(async (parsed) => {
 36 |         if (!parsed) {
 37 |           console.log(`Не вдалося знайти дані для закладу: ${data.name}`);
 38 |           return;
 39 |         }
 40 | 
 41 |         // ВАЖЛИВО: оновлюємо лише ті поля, які користувач НЕ заповнив сам
 42 |         // (наприклад, директора, обраного через автодоповнення з бази контактів).
 43 |         // Раніше парсер безумовно перезаписував director/address/childrenCount,
 44 |         // навіть якщо вони вже були коректно вказані вручну.
 45 |         const updateData: Record<string, unknown> = {};
 46 | 
 47 |         if (!schoolData.address && parsed.address) {
 48 |           updateData.address = parsed.address;
 49 |         }
 50 |         if (!schoolData.director && parsed.director) {
 51 |           updateData.director = parsed.director;
 52 |         }
 53 |         if (!schoolData.childrenCount && parsed.childrenCount) {
 54 |           updateData.childrenCount = parsed.childrenCount;
 55 |         }
 56 | 
 57 |         if (Object.keys(updateData).length === 0) {
 58 |           console.log(
 59 |             `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
 60 |           );
 61 |           return;
 62 |         }
 63 | 
 64 |         // Використовуємо this.prisma замість prisma
 65 |         await this.prisma.school.update({
 66 |           where: {
 67 |             id: newSchool.id,
 68 |           },
 69 |           data: updateData,
 70 |         });
 71 | 
 72 |         console.log(`Дані школи "${data.name}" успішно оновлені`);
 73 |       })
 74 |       .catch((error) => {
 75 |         console.error('Помилка оновлення даних школи:', error);
 76 |       });
 77 | 
 78 |     return newSchool;
 79 |   }
 80 | 
 81 |   async findAll(minimal = false) {
 82 |     if (minimal) {
 83 |       return this.prisma.school.findMany({
 84 |         select: {
 85 |           id: true,
 86 |           name: true,
 87 |           type: true,
 88 |           cityId: true,
 89 |           director: true,
 90 |           phone: true,
 91 |           address: true,
 92 |           childrenCount: true,
 93 |           updatedAt: true,
 94 |           isHotClient: true,
 95 |           city: { select: { id: true, name: true } },
 96 |           // Тільки останній евент для відображення етапу в списку
 97 |           events: {
 98 |             select: { status: true, updatedAt: true },
 99 |             orderBy: { date: 'desc' },
100 |             take: 1,
101 |           },
102 |         },
103 |         orderBy: { createdAt: 'desc' },
104 |       });
105 |     }
106 | 
107 |     return this.prisma.school.findMany({
108 |       include: {
109 |         city: true,
110 |         events: { orderBy: { date: 'desc' }, take: 1 },
111 |       },
112 |       orderBy: { createdAt: 'desc' },
113 |     });
114 |   }
115 | 
116 |   async findOne(id: string) {
117 |     // Використовуємо this.prisma
118 |     return this.prisma.school.findUnique({
119 |       where: {
120 |         id,
121 |       },
122 |       include: {
123 |         city: true,
124 |       },
125 |     });
126 |   }
127 | 
128 |   async update(id: string, data: any) {
129 |     const { city, id: _id, createdAt, updatedAt, ...updateData } = data;
130 | 
131 |     // Використовуємо this.prisma
132 |     return this.prisma.school.update({
133 |       where: {
134 |         id,
135 |       },
136 |       data: updateData,
137 |     });
138 |   }
139 | 
140 |   async remove(id: string) {
141 |     // Використовуємо this.prisma
142 |     const events = await this.prisma.event.findMany({
143 |       where: {
144 |         schoolId: id,
145 |       },
146 |     });
147 | 
148 |     for (const event of events) {
149 |       await this.eventsService.remove(event.id);
150 |     }
151 | 
152 |     // Використовуємо this.prisma
153 |     return this.prisma.school.delete({
154 |       where: {
155 |         id,
156 |       },
157 |     });
158 |   }
159 | 
160 |   async searchContacts(q: string, city?: string) {
161 |     if (!q || q.trim().length < 1) return [];
162 | 
163 |     const cityName = city || 'Львів';
164 |     const normalizedQuery = q.toLowerCase().trim();
165 | 
166 |     // Дістаємо всі контакти цього міста одним запитом
167 |     const allContacts = await this.prisma.schoolContact.findMany({
168 |       where: { city: cityName },
169 |       orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
170 |     });
171 | 
172 |     const STOP_WORDS = new Set([
173 |       'школа',
174 |       'школи',
175 |       'садочок',
176 |       'садок',
177 |       'дитсадок',
178 |       'днз',
179 |       'ліцей',
180 |       'гімназія',
181 |       'зош',
182 |       'центр',
183 |       'розвитку',
184 |       'комунальний',
185 |       'заклад',
186 |       'освіти',
187 |       'імені',
188 |       'ім',
189 |     ]);
190 | 
191 |     // Збираємо окремі слова-токени (дозволяємо довжину від 1 символу, щоб ловити школи №1, №2)
192 |     const tokens = normalizedQuery
193 |       .replace(/№/g, ' ')
194 |       .split(/\s+/)
195 |       .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
196 |       .filter((t) => t.length > 0 && !STOP_WORDS.has(t));
197 | 
198 |     const matches = allContacts.filter((c) => {
199 |       const num = c.schoolNumber.toLowerCase();
200 | 
201 |       // 1. Точний збіг всієї фрази
202 |       if (num === normalizedQuery) return true;
203 | 
204 |       const isNumeric = /^\d+$/.test(num);
205 | 
206 |       if (isNumeric) {
207 |         // 2. Якщо номер школи в базі — це просто число (напр. "15")
208 |         // Шукаємо точний збіг серед введених слів, щоб пошук "1" не знаходив "15" чи "21"
209 |         if (tokens.includes(num)) return true;
210 |       } else {
211 |         // 3. Якщо це текстова назва (напр. "Арніка", "Сихівський ліцей", "156/162")
212 |         if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
213 |           return true;
214 |         // Для довгих назв перевіряємо, чи введено хоча б одне слово з назви (мінімум 3 літери)
215 |         if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
216 |       }
217 | 
218 |       // 4. Пошук за ім'ям контактної особи
219 |       if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;
220 | 
221 |       return false;
222 |     });
223 | 
224 |     return matches.slice(0, 10);
225 |   }
226 |   async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
227 |     const city = await this.prisma.city.findUnique({ where: { id: cityId } });
228 |     if (!city) throw new Error(`Місто з id=${cityId} не знайдено`);
229 | 
230 |     // 1. Отримуємо всі заклади з парсера
231 |     const allFromParser = await this.parserService.getAllSchoolsForCity(
232 |       city.name,
233 |       type,
234 |     );
235 | 
236 |     // 2. Отримуємо ВСІ існуючі школи цього типу в цьому місті
237 |     const existingSchools = await this.prisma.school.findMany({
238 |       where: { cityId, type },
239 |       select: { name: true },
240 |     });
241 | 
242 |     // 3. Покращена функція нормалізації
243 |     // Видаляє всі пробіли, символи №, лапки та переводить у нижній регістр
244 |     const normalize = (name: string) =>
245 |       name
246 |         .toLowerCase()
247 |         .replace(/№/g, '')
248 |         .replace(/["'«»]/g, '')
249 |         .replace(/\s+/g, '')
250 |         .trim();
251 | 
252 |     const existingNames = new Set(
253 |       existingSchools.map((s) => normalize(s.name)),
254 |     );
255 | 
256 |     // 4. Фільтруємо ті, яких ще немає
257 |     const toCreate = allFromParser.filter(
258 |       (s) => !existingNames.has(normalize(s.name)),
259 |     );
260 | 
261 |     if (toCreate.length === 0) {
262 |       return {
263 |         total: allFromParser.length,
264 |         created: 0,
265 |         skipped: allFromParser.length,
266 |       };
267 |     }
268 | 
269 |     // 5. Отримуємо контакти для автозаповнення
270 |     const contacts = await this.prisma.schoolContact.findMany({
271 |       where: { city: city.name },
272 |     });
273 | 
274 |     let created = 0;
275 |     for (const school of toCreate) {
276 |       // Перевірка ще раз на випадок дублів всередині самого парсингу
277 |       if (existingNames.has(normalize(school.name))) continue;
278 | 
279 |       // Додаємо в Set, щоб уникнути дублів у межах одного циклу імпорту
280 |       existingNames.add(normalize(school.name));
281 | 
282 |       const numMatch = school.name.match(/№?\s*(\d+)/);
283 |       const num = numMatch?.[1];
284 |       const matchedContacts = num
285 |         ? contacts.filter((c) => c.schoolNumber === num)
286 |         : contacts.filter((c) => {
287 |             const normSchool = normalize(school.name);
288 |             const normContact = normalize(c.schoolNumber);
289 |             return (
290 |               normSchool.includes(normContact) ||
291 |               normContact.includes(normSchool)
292 |             );
293 |           });
294 | 
295 |       const director =
296 |         matchedContacts.find(
297 |           (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
298 |         ) || matchedContacts[0];
299 | 
300 |       try {
301 |         await this.create({
302 |           name: school.name,
303 |           type,
304 |           cityId,
305 |           sourceUrl: school.url,
306 |           director: director?.contactName || '',
307 |           phone: director?.phone || '',
308 |         });
309 |         created++;
310 |       } catch (e) {
311 |         console.error(`Помилка створення ${school.name}:`, e);
312 |       }
313 |     }
314 | 
315 |     return {
316 |       city: city.name,
317 |       total: allFromParser.length,
318 |       created,
319 |       skipped: allFromParser.length - created,
320 |     };
321 |   }
322 | }
323 | 
```

### File: apps/backend/src/telegram/telegram.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { TelegramService } from './telegram.service';
  2 | import { PrismaModule } from '../prisma/prisma.module';
  3 | 
  4 | @Module({
  5 |   imports: [PrismaModule],
  6 |   providers: [TelegramService],
  7 |   exports: [TelegramService],
  8 | })
  9 | export class TelegramModule {}
 10 | 
```

### File: apps/backend/src/telegram/telegram.service.ts
```ts
  0 | import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
  1 | import TelegramBot from 'node-telegram-bot-api';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | 
  4 | @Injectable()
  5 | export class TelegramService implements OnModuleInit {
  6 |   private bot: TelegramBot;
  7 |   private readonly logger = new Logger(TelegramService.name);
  8 | 
  9 |   constructor(private prisma: PrismaService) {}
 10 | 
 11 |   onModuleInit() {
 12 |     const token = process.env.TELEGRAM_BOT_TOKEN;
 13 |     if (!token) {
 14 |       this.logger.warn('TELEGRAM_BOT_TOKEN не задано — бот вимкнено');
 15 |       return;
 16 |     }
 17 |     this.bot = new TelegramBot(token, { polling: true });
 18 |     this.logger.log('Telegram бот ініціалізовано');
 19 | 
 20 |     this.bot.onText(/\/start/, async (msg) => {
 21 |       const chatId = String(msg.chat.id);
 22 |       const username = msg.from?.username; // це те, що користувач має в налаштуваннях Telegram (без @)
 23 | 
 24 |       if (!username) {
 25 |         await this.bot.sendMessage(
 26 |           chatId,
 27 |           "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
 28 |         );
 29 |         return;
 30 |       }
 31 | 
 32 |       // Нормалізуємо username: видаляємо всі "@" на випадок, якщо хтось ввів їх у CRM
 33 |       const normalizedUsername = username.toLowerCase();
 34 | 
 35 |       // Шукаємо користувача, де telegramId співпадає з username
 36 |       // Ми використовуємо updateMany, щоб покрити всі можливі записи
 37 |       const result = await this.prisma.user.updateMany({
 38 |         where: {
 39 |           telegramId: {
 40 |             equals: normalizedUsername,
 41 |             mode: 'insensitive', // пошук без урахування регістру (Svitlo != svitlo)
 42 |           },
 43 |         },
 44 |         data: { telegramChatId: chatId },
 45 |       });
 46 | 
 47 |       if (result.count > 0) {
 48 |         this.logger.log(
 49 |           `[/start] chatId=${chatId} username=${normalizedUsername} — успішно підв'язано`,
 50 |         );
 51 |         await this.bot.sendMessage(
 52 |           chatId,
 53 |           `✅ Вітаємо! Ваш акаунт успішно підключено до <b>Світло Знань CRM</b>.`,
 54 |           { parse_mode: 'HTML' },
 55 |         );
 56 |       } else {
 57 |         this.logger.warn(
 58 |           `[/start] Користувача з username "${normalizedUsername}" не знайдено в CRM.`,
 59 |         );
 60 |         await this.bot.sendMessage(
 61 |           chatId,
 62 |           `❌ Акаунт не знайдено. Переконайтеся, що в CRM у вашому профілі вказано нікнейм <b>${normalizedUsername}</b> без помилок.`,
 63 |           { parse_mode: 'HTML' },
 64 |         );
 65 |       }
 66 |     });
 67 |   }
 68 | 
 69 |   async sendMessage(chatId: string, text: string): Promise<void> {
 70 |     if (!this.bot) return;
 71 |     try {
 72 |       await this.bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
 73 |     } catch (e: any) {
 74 |       this.logger.error(
 75 |         `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
 76 |       );
 77 |     }
 78 |   }
 79 | 
 80 |   async sendWelcome(
 81 |     chatId: string,
 82 |     name: string,
 83 |     email: string,
 84 |     password: string,
 85 |   ): Promise<void> {
 86 |     const text =
 87 |       `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
 88 |       `Ваш акаунт створено.\n\n` +
 89 |       `📧 <b>Логін:</b> <code>${email}</code>\n` +
 90 |       `🔑 <b>Пароль:</b> <code>${password}</code>\n\n` +
 91 |       `Увійдіть за посиланням: <a href="https://crm-tau-nine.vercel.app">crm-tau-nine.vercel.app</a>\n\n` +
 92 |       `<i>Змініть пароль після першого входу.</i>`;
 93 | 
 94 |     await this.sendMessage(chatId, text);
 95 |   }
 96 | }
 97 | 
```

### File: apps/backend/src/users/users.controller.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { UsersController } from './users.controller';
  2 | 
  3 | describe('UsersController', () => {
  4 |   let controller: UsersController;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       controllers: [UsersController],
  9 |     }).compile();
 10 | 
 11 |     controller = module.get<UsersController>(UsersController);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(controller).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/users/users.controller.ts
```ts
  0 | import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
  1 | import { UsersService } from './users.service';
  2 | 
  3 | @Controller('users')
  4 | export class UsersController {
  5 |   constructor(private readonly usersService: UsersService) {}
  6 | 
  7 |   @Get()
  8 |   getAll() {
  9 |     return this.usersService.getAllUsers();
 10 |   }
 11 | 
 12 |   @Post()
 13 |   create(@Body() body: any) {
 14 |     return this.usersService.createUser(body);
 15 |   }
 16 | 
 17 |   @Patch(':id')
 18 |   update(@Param('id') id: string, @Body() body: any) {
 19 |     return this.usersService.updateUser(id, body);
 20 |   }
 21 | 
 22 |   @Delete(':id')
 23 |   remove(@Param('id') id: string) {
 24 |     return this.usersService.deleteUser(id);
 25 |   }
 26 | 
 27 |   @Get('seed')
 28 |   seedAdmin() {
 29 |     return this.usersService.seedAdmin();
 30 |   }
 31 | 
 32 |   @Get('seed-vasya')
 33 |   seedVasya() {
 34 |     return this.usersService.seedVasya();
 35 |   }
 36 | }
 37 | 
```

### File: apps/backend/src/users/users.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { UsersService } from './users.service';
  2 | import { UsersController } from './users.controller';
  3 | import { TelegramModule } from '../telegram/telegram.module';
  4 | 
  5 | @Module({
  6 |   imports: [TelegramModule],
  7 |   providers: [UsersService],
  8 |   controllers: [UsersController],
  9 |   exports: [UsersService],
 10 | })
 11 | export class UsersModule {}
 12 | 
```

### File: apps/backend/src/users/users.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { UsersService } from './users.service';
  2 | 
  3 | describe('UsersService', () => {
  4 |   let service: UsersService;
  5 | 
  6 |   beforeEach(async () => {
  7 |     const module: TestingModule = await Test.createTestingModule({
  8 |       providers: [UsersService],
  9 |     }).compile();
 10 | 
 11 |     service = module.get<UsersService>(UsersService);
 12 |   });
 13 | 
 14 |   it('should be defined', () => {
 15 |     expect(service).toBeDefined();
 16 |   });
 17 | });
 18 | 
```

### File: apps/backend/src/users/users.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import * as bcrypt from 'bcrypt';
  3 | import { TelegramService } from '../telegram/telegram.service';
  4 | 
  5 | @Injectable()
  6 | export class UsersService {
  7 |   constructor(
  8 |     private prisma: PrismaService,
  9 |     private telegramService: TelegramService,
 10 |   ) {}
 11 | 
 12 |   async getAllUsers() {
 13 |     return this.prisma.user.findMany({
 14 |       include: {
 15 |         city: true, // <--- Ось цей магічний рядок підтягне назву міста!
 16 |       },
 17 |     });
 18 |   }
 19 | 
 20 |   async createUser(data: any) {
 21 |     const hashedPassword = await bcrypt.hash(data.password, 10);
 22 |     const user = await this.prisma.user.create({
 23 |       data: {
 24 |         name: data.fullName,
 25 |         email: data.email,
 26 |         phone: data.phone,
 27 |         password: hashedPassword,
 28 |         role: data.role,
 29 |         cityId: data.cityId || null,
 30 |         telegramId: data.telegramId || null,
 31 |         car: data.car || null,
 32 |       },
 33 |     });
 34 | 
 35 |     // Надсилаємо вітальне повідомлення якщо вказано telegramId
 36 |     if (data.password) {
 37 |       // Шукаємо chat_id: якщо є збережений після /start — використовуємо його
 38 |       // інакше пробуємо telegramId напряму (якщо вже числовий)
 39 |       const chatId = user.telegramChatId || null;
 40 | 
 41 |       if (chatId) {
 42 |         await this.telegramService.sendWelcome(
 43 |           chatId,
 44 |           data.fullName,
 45 |           data.email,
 46 |           data.password,
 47 |         );
 48 |       }
 49 |     }
 50 | 
 51 |     return user;
 52 |   }
 53 | 
 54 |   async updateUser(id: string, data: any) {
 55 |     const updateData: any = {
 56 |       name: data.fullName,
 57 |       email: data.email,
 58 |       phone: data.phone,
 59 |       role: data.role,
 60 |       cityId: data.cityId || null,
 61 |       telegramId: data.telegramId || null,
 62 |       car: data.car || null,
 63 |     };
 64 | 
 65 |     // Якщо передано новий пароль, хешуємо його
 66 |     if (data.password) {
 67 |       updateData.password = await bcrypt.hash(data.password, 10);
 68 |     }
 69 | 
 70 |     return this.prisma.user.update({ where: { id }, data: updateData });
 71 |   }
 72 | 
 73 |   async deleteUser(id: string) {
 74 |     return this.prisma.user.delete({ where: { id } });
 75 |   }
 76 | 
 77 |   // Створення адміністратора
 78 |   async seedAdmin() {
 79 |     const existingAdmin = await this.prisma.user.findUnique({
 80 |       where: { email: 'admin@crm.com' },
 81 |     });
 82 | 
 83 |     if (existingAdmin) {
 84 |       return { message: 'Адміністратор вже існує!' };
 85 |     }
 86 | 
 87 |     const hashedPassword = await bcrypt.hash('admin123', 10);
 88 |     const admin = await this.prisma.user.create({
 89 |       data: {
 90 |         name: 'Артур Шмальцель',
 91 |         email: 'admin@crm.com',
 92 |         password: hashedPassword,
 93 |         role: 'SUPERADMIN',
 94 |       },
 95 |     });
 96 | 
 97 |     return { message: 'Суперадмін успішно створений!', user: admin };
 98 |   }
 99 | 
100 |   // Новий метод для додавання Васі
101 |   async seedVasya() {
102 |     const existingVasya = await this.prisma.user.findUnique({
103 |       where: { email: 'vasya@charisma.com' },
104 |     });
105 | 
106 |     if (existingVasya) {
107 |       return { message: 'Вася вже в базі!' };
108 |     }
109 | 
110 |     const hashedPassword = await bcrypt.hash('vasya123', 10);
111 | 
112 |     const vasya = await this.prisma.user.create({
113 |       data: {
114 |         name: 'Вася Харізма',
115 |         email: 'vasya@charisma.com',
116 |         password: hashedPassword,
117 |         role: 'MANAGER',
118 |       },
119 |     });
120 | 
121 |     return { message: 'Вася Харізма успішно доданий!', user: vasya };
122 |   }
123 | }
124 | 
```

### File: apps/backend/tsconfig.json
```json
  0 | {
  1 |   "compilerOptions": {
  2 |     "module": "nodenext",
  3 |     "moduleResolution": "nodenext",
  4 |     "types": ["jest", "node"],
  5 |     "resolvePackageJsonExports": true,
  6 |     "esModuleInterop": true,
  7 |     "isolatedModules": true,
  8 |     "declaration": true,
  9 |     "removeComments": true,
 10 |     "emitDecoratorMetadata": true,
 11 |     "experimentalDecorators": true,
 12 |     "allowSyntheticDefaultImports": true,
 13 |     "target": "ES2023",
 14 |     "sourceMap": true,
 15 |     "outDir": "./dist",
 16 |     "baseUrl": "./",
 17 |     "incremental": true,
 18 |     "skipLibCheck": true,
 19 |     "strictNullChecks": true,
 20 |     "forceConsistentCasingInFileNames": true,
 21 |     "noImplicitAny": false,
 22 |     "strictBindCallApply": false,
 23 |     "noFallthroughCasesInSwitch": false
 24 |   }
 25 | }
 26 | 
```

### File: apps/frontend/eslint.config.js
```js
  0 | 
  1 | 
  2 | import js from '@eslint/js'
  3 | import globals from 'globals'
  4 | import reactHooks from 'eslint-plugin-react-hooks'
  5 | import reactRefresh from 'eslint-plugin-react-refresh'
  6 | import tseslint from 'typescript-eslint'
  7 | import { defineConfig, globalIgnores } from 'eslint/config'
  8 | 
  9 | export default defineConfig([
 10 |   globalIgnores(['dist']),
 11 |   {
 12 |     files: ['**/*.{ts,tsx}'],
 13 |     extends: [
 14 |       js.configs.recommended,
 15 |       tseslint.configs.recommended,
 16 |       reactHooks.configs.flat.recommended,
 17 |       reactRefresh.configs.vite,
 18 |     ],
 19 |     languageOptions: {
 20 |       globals: globals.browser,
 21 |     },
 22 |   },
 23 | ])
 24 | 
 25 | 
 26 | 
```

### File: apps/frontend/postcss.config.js
```js
  0 | 
  1 | 
  2 | export default {
  3 |   plugins: {
  4 |     tailwindcss: {},
  5 |     autoprefixer: {},
  6 |   },
  7 | }
  8 | 
  9 | 
 10 | 
```

### File: apps/frontend/src/App.css
```css
  0 | 
  1 | 
  2 | .counter {
  3 |   font-size: 16px;
  4 |   padding: 5px 10px;
  5 |   border-radius: 5px;
  6 |   color: var(--accent);
  7 |   background: var(--accent-bg);
  8 |   border: 2px solid transparent;
  9 |   transition: border-color 0.3s;
 10 |   margin-bottom: 24px;
 11 | 
 12 |   &:hover {
 13 |     border-color: var(--accent-border);
 14 |   }
 15 |   &:focus-visible {
 16 |     outline: 2px solid var(--accent);
 17 |     outline-offset: 2px;
 18 |   }
 19 | }
 20 | 
 21 | .hero {
 22 |   position: relative;
 23 | 
 24 |   .base,
 25 |   .framework,
 26 |   .vite {
 27 |     inset-inline: 0;
 28 |     margin: 0 auto;
 29 |   }
 30 | 
 31 |   .base {
 32 |     width: 170px;
 33 |     position: relative;
 34 |     z-index: 0;
 35 |   }
 36 | 
 37 |   .framework,
 38 |   .vite {
 39 |     position: absolute;
 40 |   }
 41 | 
 42 |   .framework {
 43 |     z-index: 1;
 44 |     top: 34px;
 45 |     height: 28px;
 46 |     transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
 47 |       scale(1.4);
 48 |   }
 49 | 
 50 |   .vite {
 51 |     z-index: 0;
 52 |     top: 107px;
 53 |     height: 26px;
 54 |     width: auto;
 55 |     transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
 56 |       scale(0.8);
 57 |   }
 58 | }
 59 | 
 60 | #center {
 61 |   display: flex;
 62 |   flex-direction: column;
 63 |   gap: 25px;
 64 |   place-content: center;
 65 |   place-items: center;
 66 |   flex-grow: 1;
 67 | 
 68 |   @media (max-width: 1024px) {
 69 |     padding: 32px 20px 24px;
 70 |     gap: 18px;
 71 |   }
 72 | }
 73 | 
 74 | #next-steps {
 75 |   display: flex;
 76 |   border-top: 1px solid var(--border);
 77 |   text-align: left;
 78 | 
 79 |   & > div {
 80 |     flex: 1 1 0;
 81 |     padding: 32px;
 82 |     @media (max-width: 1024px) {
 83 |       padding: 24px 20px;
 84 |     }
 85 |   }
 86 | 
 87 |   .icon {
 88 |     margin-bottom: 16px;
 89 |     width: 22px;
 90 |     height: 22px;
 91 |   }
 92 | 
 93 |   @media (max-width: 1024px) {
 94 |     flex-direction: column;
 95 |     text-align: center;
 96 |   }
 97 | }
 98 | 
 99 | #docs {
100 |   border-right: 1px solid var(--border);
101 | 
102 |   @media (max-width: 1024px) {
103 |     border-right: none;
104 |     border-bottom: 1px solid var(--border);
105 |   }
106 | }
107 | 
108 | #next-steps ul {
109 |   list-style: none;
110 |   padding: 0;
111 |   display: flex;
112 |   gap: 8px;
113 |   margin: 32px 0 0;
114 | 
115 |   .logo {
116 |     height: 18px;
117 |   }
118 | 
119 |   a {
120 |     color: var(--text-h);
121 |     font-size: 16px;
122 |     border-radius: 6px;
123 |     background: var(--social-bg);
124 |     display: flex;
125 |     padding: 6px 12px;
126 |     align-items: center;
127 |     gap: 8px;
128 |     text-decoration: none;
129 |     transition: box-shadow 0.3s;
130 | 
131 |     &:hover {
132 |       box-shadow: var(--shadow);
133 |     }
134 |     .button-icon {
135 |       height: 18px;
136 |       width: 18px;
137 |     }
138 |   }
139 | 
140 |   @media (max-width: 1024px) {
141 |     margin-top: 20px;
142 |     flex-wrap: wrap;
143 |     justify-content: center;
144 | 
145 |     li {
146 |       flex: 1 1 calc(50% - 8px);
147 |     }
148 | 
149 |     a {
150 |       width: 100%;
151 |       justify-content: center;
152 |       box-sizing: border-box;
153 |     }
154 |   }
155 | }
156 | 
157 | #spacer {
158 |   height: 88px;
159 |   border-top: 1px solid var(--border);
160 |   @media (max-width: 1024px) {
161 |     height: 48px;
162 |   }
163 | }
164 | 
165 | .ticks {
166 |   position: relative;
167 |   width: 100%;
168 | 
169 |   &::before,
170 |   &::after {
171 |     content: '';
172 |     position: absolute;
173 |     top: -4.5px;
174 |     border: 5px solid transparent;
175 |   }
176 | 
177 |   &::before {
178 |     left: 0;
179 |     border-left-color: var(--border);
180 |   }
181 |   &::after {
182 |     right: 0;
183 |     border-right-color: var(--border);
184 |   }
185 | }
186 | 
187 | 
188 | 
```

### File: apps/frontend/src/App.tsx
```tsx
  0 | import React, { useState, Suspense, lazy } from "react";
  1 | import {
  2 |   BrowserRouter as Router,
  3 |   Routes,
  4 |   Route,
  5 |   Navigate,
  6 | } from "react-router-dom";
  7 | 
  8 | // --- СТАТИЧНІ ІМПОРТИ ---
  9 | // Ці компоненти завантажуються одразу, оскільки вони формують "скелет" додатку (меню, перевірка токена)
 10 | import Layout from "./components/Layout";
 11 | import Login from "./pages/Login";
 12 | import { CityProvider } from "./context/CityContext";
 13 | 
 14 | // --- ДИНАМІЧНІ ІМПОРТИ (Ледаче завантаження / Code Splitting) ---
 15 | // Ці файли будуть завантажуватись окремими шматками (chunks) ТІЛЬКИ коли користувач перейде на відповідну сторінку
 16 | const Cities = lazy(() => import("./pages/Cities"));
 17 | const Schools = lazy(() => import("./pages/Schools"));
 18 | const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
 19 | const Employees = lazy(() => import("./pages/Employees"));
 20 | const Finance = lazy(() => import("./pages/Finance"));
 21 | const CalendarView = lazy(() => import("./pages/CalendarView"));
 22 | const Dashboard = lazy(() => import("./pages/Dashboard"));
 23 | const Kindergartens = lazy(() => import("./pages/Kindergartens"));
 24 | 
 25 | // Компонент-заглушка, який показується долі секунди, поки вантажиться JS код сторінки
 26 | const PageLoader = () => (
 27 |   <div className="flex items-center justify-center h-full min-h-[50vh]">
 28 |     <div className="text-slate-400 font-medium animate-pulse">
 29 |       Завантаження сторінки...
 30 |     </div>
 31 |   </div>
 32 | );
 33 | 
 34 | export default function App() {
 35 |   // Базова логіка авторизації
 36 |   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
 37 |     !!localStorage.getItem("token"),
 38 |   );
 39 | 
 40 |   const handleLogin = (token: string) => {
 41 |     localStorage.setItem("token", token);
 42 |     setIsAuthenticated(true);
 43 |   };
 44 | 
 45 |   const handleLogout = () => {
 46 |     localStorage.removeItem("token");
 47 |     setIsAuthenticated(false);
 48 |   };
 49 | 
 50 |   return (
 51 |     <Router>
 52 |       <CityProvider>
 53 |         <Routes>
 54 |           {/* Публічний маршрут: Логін */}
 55 |           <Route
 56 |             path="/login"
 57 |             element={
 58 |               !isAuthenticated ? (
 59 |                 <Login onLogin={handleLogin} />
 60 |               ) : (
 61 |                 <Navigate to="/cities" replace />
 62 |               )
 63 |             }
 64 |           />
 65 | 
 66 |           {/* Захищені маршрути (Layout відображає бокове меню) */}
 67 |           <Route
 68 |             path="/"
 69 |             element={
 70 |               isAuthenticated ? (
 71 |                 <Layout onLogout={handleLogout} />
 72 |               ) : (
 73 |                 <Navigate to="/login" replace />
 74 |               )
 75 |             }
 76 |           >
 77 |             {/* Редірект з кореня на сторінку міст за замовчуванням */}
 78 |             <Route index element={<Navigate to="/cities" replace />} />
 79 | 
 80 |             {/* Обгортаємо всі вкладені маршрути в Suspense. 
 81 |               Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
 82 |               поки завантажується файл з сервера.
 83 |             */}
 84 |             <Route
 85 |               path="cities"
 86 |               element={
 87 |                 <Suspense fallback={<PageLoader />}>
 88 |                   <Cities />
 89 |                 </Suspense>
 90 |               }
 91 |             />
 92 | 
 93 |             <Route
 94 |               path="schools"
 95 |               element={
 96 |                 <Suspense fallback={<PageLoader />}>
 97 |                   <Schools />
 98 |                 </Suspense>
 99 |               }
100 |             />
101 | 
102 |             <Route
103 |               path="schools/:id"
104 |               element={
105 |                 <Suspense fallback={<PageLoader />}>
106 |                   <SchoolProfile />
107 |                 </Suspense>
108 |               }
109 |             />
110 | 
111 |             <Route
112 |               path="employees"
113 |               element={
114 |                 <Suspense fallback={<PageLoader />}>
115 |                   <Employees />
116 |                 </Suspense>
117 |               }
118 |             />
119 | 
120 |             <Route
121 |               path="finance"
122 |               element={
123 |                 <Suspense fallback={<PageLoader />}>
124 |                   <Finance />
125 |                 </Suspense>
126 |               }
127 |             />
128 | 
129 |             <Route
130 |               path="calendar"
131 |               element={
132 |                 <Suspense fallback={<PageLoader />}>
133 |                   <CalendarView />
134 |                 </Suspense>
135 |               }
136 |             />
137 |             <Route
138 |               path="dashboard"
139 |               element={
140 |                 <Suspense fallback={<PageLoader />}>
141 |                   <Dashboard />
142 |                 </Suspense>
143 |               }
144 |             />
145 | 
146 |             <Route
147 |               path="kindergartens"
148 |               element={
149 |                 <Suspense fallback={<PageLoader />}>
150 |                   <Kindergartens />
151 |                 </Suspense>
152 |               }
153 |             />
154 |           </Route>
155 |         </Routes>
156 |       </CityProvider>
157 |     </Router>
158 |   );
159 | }
160 | 
```

### File: apps/frontend/src/components/AddressLink.tsx
```tsx
  0 | // Невеликий перевикористовуваний компонент:
  1 | // будь-яку адресу робить клікабельною — відкриває її в Google Maps у новій вкладці.
  2 | // Використання: <AddressLink address={event.address} />
  3 | 
  4 | interface AddressLinkProps {
  5 |   address?: string | null;
  6 |   className?: string;
  7 | }
  8 | 
  9 | export default function AddressLink({ address, className }: AddressLinkProps) {
 10 |   if (!address) return <span className="text-slate-400">—</span>;
 11 | 
 12 |   const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
 13 |     address,
 14 |   )}`;
 15 | 
 16 |   return (
 17 |     <a
 18 |       href={mapsUrl}
 19 |       target="_blank"
 20 |       rel="noopener noreferrer"
 21 |       // щоб клік по адресі не тригерив onClick батьківського рядка/картки (наприклад, навігацію)
 22 |       onClick={(e) => e.stopPropagation()}
 23 |       title="Відкрити в Google Maps"
 24 |       className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
 25 |         className ?? ""
 26 |       }`}
 27 |     >
 28 |       <svg
 29 |         viewBox="0 0 24 24"
 30 |         fill="none"
 31 |         stroke="currentColor"
 32 |         strokeWidth={1.8}
 33 |         className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
 34 |       >
 35 |         <path
 36 |           strokeLinecap="round"
 37 |           strokeLinejoin="round"
 38 |           d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
 39 |         />
 40 |         <path
 41 |           strokeLinecap="round"
 42 |           strokeLinejoin="round"
 43 |           d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
 44 |         />
 45 |       </svg>
 46 |       <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
 47 |         {address}
 48 |       </span>
 49 |     </a>
 50 |   );
 51 | }
```

### File: apps/frontend/src/components/IssueCarousel.tsx
```tsx
  0 | import { useState, useEffect } from 'react';
  1 | import { api } from '../config/api';
  2 | import { useSelectedCity } from '../context/CityContext';
  3 | 
  4 | const STATUSES = ['Планується', 'Виконується', 'Виконано'];
  5 | 
  6 | const STATUS_STYLES: Record<string, string> = {
  7 |   'Планується': 'bg-amber-50 text-amber-700 border-amber-200',
  8 |   'Виконується': 'bg-blue-50 text-blue-700 border-blue-200',
  9 |   'Виконано': 'bg-emerald-50 text-emerald-700 border-emerald-200',
 10 | };
 11 | 
 12 | function getNextStatus(current: string) {
 13 |   const idx = STATUSES.indexOf(current);
 14 |   return STATUSES[(idx + 1) % STATUSES.length];
 15 | }
 16 | 
 17 | export default function IssueCarousel() {
 18 |   const { selectedCity } = useSelectedCity();
 19 |   const [issues, setIssues] = useState<any[]>([]);
 20 |   // Стан для анімації зникнення картки
 21 |   const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
 22 | 
 23 |   const fetchIssues = async () => {
 24 |     if (!selectedCity?.id) return;
 25 |     try {
 26 |       const res = await api.get(`/issues?cityId=${selectedCity.id}`);
 27 |       setIssues(res.data.filter((i: any) => i.status !== 'Виконано'));
 28 |     } catch (e) {
 29 |       console.error(e);
 30 |     }
 31 |   };
 32 | 
 33 |   useEffect(() => {
 34 |     fetchIssues();
 35 |   }, [selectedCity?.id]);
 36 | 
 37 |   const handleStatusToggle = async (issue: any) => {
 38 |     const nextStatus = getNextStatus(issue.status);
 39 | 
 40 |     try {
 41 |       await api.patch(`/issues/${issue.id}/status`, { status: nextStatus });
 42 |       
 43 |       if (nextStatus === 'Виконано') {
 44 |         // Запускаємо анімацію горизонтального згортання
 45 |         setExitingIssueId(issue.id);
 46 |         
 47 |         // Чекаємо 500мс і видаляємо з масиву
 48 |         setTimeout(() => {
 49 |           setIssues(prev => prev.filter(i => i.id !== issue.id));
 50 |           setExitingIssueId(null);
 51 |         }, 500);
 52 |       } else {
 53 |         setIssues(prev => prev.map(i => i.id === issue.id ? { ...i, status: nextStatus } : i));
 54 |       }
 55 |     } catch (e) {
 56 |       console.error(e);
 57 |     }
 58 |   };
 59 | 
 60 |   if (issues.length === 0) return null;
 61 | 
 62 |   return (
 63 |     <div className="mb-6">
 64 |       <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
 65 |         🚨 <span>Активні проблеми</span>
 66 |         <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">{issues.length}</span>
 67 |       </h2>
 68 | 
 69 |       {/* Зверни увагу: я прибрав gap-4 і додав відступи самим елементам, щоб анімація звуження працювала ідеально */}
 70 |       <div className="flex overflow-x-auto pb-4 -mx-1 px-1">
 71 |         {issues.map(issue => {
 72 |           const isExiting = exitingIssueId === issue.id;
 73 |           
 74 |           return (
 75 |             // Зовнішній контейнер керує шириною, прозорістю і відступом
 76 |             <div
 77 |               key={issue.id}
 78 |               className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
 79 |                 isExiting 
 80 |                   ? 'w-0 min-w-0 mr-0 opacity-0 scale-x-75 pointer-events-none' 
 81 |                   : 'w-[300px] min-w-[300px] mr-4 opacity-100 scale-x-100 shrink-0'
 82 |               }`}
 83 |             >
 84 |               {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
 85 |               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
 86 |                 <div>
 87 |                   <p className="text-xs text-slate-400 mb-1">{new Date(issue.createdAt).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
 88 |                   <p className="font-bold text-slate-800 text-sm">{issue.schoolName}</p>
 89 |                   <p className="text-xs text-slate-500">{issue.eventName}</p>
 90 |                 </div>
 91 | 
 92 |                 <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
 93 |                   "{issue.message}"
 94 |                 </p>
 95 | 
 96 |                 <button
 97 |                   onClick={() => handleStatusToggle(issue)}
 98 |                   className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES['Планується']}`}
 99 |                 >
100 |                   ● {issue.status} → натисни щоб змінити
101 |                 </button>
102 |               </div>
103 |             </div>
104 |           );
105 |         })}
106 |       </div>
107 |     </div>
108 |   );
109 | }
```

### File: apps/frontend/src/components/Layout.tsx
```tsx
  0 | import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
  1 | import { useEffect, useState } from "react";
  2 | import { jwtDecode } from "jwt-decode";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | 
  5 | interface UserInfo {
  6 |   name: string;
  7 |   role: string;
  8 | }
  9 | 
 10 | export default function Layout() {
 11 |   const location = useLocation();
 12 |   const navigate = useNavigate();
 13 |   const [user, setUser] = useState<UserInfo | null>(null);
 14 |   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Додано стан для мобільного меню
 15 |   const { selectedCity } = useSelectedCity();
 16 | 
 17 |   useEffect(() => {
 18 |     try {
 19 |       const raw = localStorage.getItem("user");
 20 |       if (raw) setUser(JSON.parse(raw));
 21 |     } catch {
 22 |       // ignore
 23 |     }
 24 |   }, []);
 25 | 
 26 |   const token = localStorage.getItem("token");
 27 |   let isSuperAdmin = false;
 28 | 
 29 |   if (token) {
 30 |     try {
 31 |       const decoded: any = jwtDecode(token);
 32 |       isSuperAdmin = decoded.role === "SUPERADMIN";
 33 |     } catch (error) {
 34 |       console.error("Не вдалося розкодувати токен:", error);
 35 |     }
 36 |   }
 37 | 
 38 |   const isActive = (path: string) => location.pathname.startsWith(path);
 39 | 
 40 |   const handleLogout = () => {
 41 |     localStorage.removeItem("token");
 42 |     localStorage.removeItem("user");
 43 |     navigate("/login");
 44 |   };
 45 | 
 46 |   // Функція для закриття меню при кліку на лінк (на мобільних)
 47 |   const handleLinkClick = () => {
 48 |     setIsMobileMenuOpen(false);
 49 |   };
 50 | 
 51 |   return (
 52 |     <div className="flex h-screen bg-slate-50 font-sans">
 53 |       {/* Мобільний хедер (видно тільки на малих екранах) */}
 54 |       <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
 55 |         <div className="flex items-center gap-2">
 56 |           <span className="text-xl">🎓</span>
 57 |           <span className="font-semibold tracking-wider text-sm">
 58 |             СВІТЛО ЗНАНЬ
 59 |           </span>
 60 |           <span className="text-xs text-blue-300 ml-1">
 61 |             · {selectedCity.name}
 62 |           </span>
 63 |         </div>
 64 |         <button
 65 |           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 66 |           className="p-2 focus:outline-none"
 67 |         >
 68 |           {/* Проста іконка гамбургера / хрестика */}
 69 |           <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
 70 |         </button>
 71 |       </div>
 72 | 
 73 |       {/* Оверлей для мобільного меню (затемнення фону) */}
 74 |       {isMobileMenuOpen && (
 75 |         <div
 76 |           className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
 77 |           onClick={() => setIsMobileMenuOpen(false)}
 78 |         />
 79 |       )}
 80 | 
 81 |       {/* Сайдбар */}
 82 |       <aside
 83 |         className={`
 84 |         fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
 85 |         md:relative md:translate-x-0
 86 |         ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
 87 |       `}
 88 |       >
 89 |         <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
 90 |           <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-2xl">
 91 |             🎓
 92 |           </div>
 93 |           <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
 94 |           <p className="text-xs text-blue-300 mt-1 tracking-wide">
 95 |             📍 {selectedCity.name}
 96 |           </p>
 97 |         </div>
 98 | 
 99 |         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
100 |           <Link
101 |             to="/dashboard"
102 |             onClick={handleLinkClick}
103 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/dashboard") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
104 |           >
105 |             <span className="mr-3">🏠</span> Дашборд
106 |           </Link>
107 |           <Link
108 |             to="/cities"
109 |             onClick={handleLinkClick}
110 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/cities") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
111 |           >
112 |             <span className="mr-3">📍</span> Міста
113 |           </Link>
114 |           <Link
115 |             to="/schools"
116 |             onClick={handleLinkClick}
117 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/schools") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
118 |           >
119 |             <span className="mr-3">🏫</span> Школи
120 |           </Link>
121 | 
122 |           {/* ДОДАЛИ НОВИЙ ПУНКТ "САДОЧКИ" */}
123 |           <Link
124 |             to="/kindergartens"
125 |             onClick={handleLinkClick}
126 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/kindergartens") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
127 |           >
128 |             <span className="mr-3">🧸</span> Садочки
129 |           </Link>
130 |           <Link
131 |             to="/events"
132 |             onClick={handleLinkClick}
133 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/events") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
134 |           >
135 |             <span className="mr-3">📅</span> Події
136 |           </Link>
137 |           <Link
138 |             to="/finance"
139 |             onClick={handleLinkClick}
140 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/finance") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
141 |           >
142 |             <span className="mr-3">💰</span> Фінанси
143 |           </Link>
144 |           <Link
145 |             to="/calendar"
146 |             onClick={handleLinkClick}
147 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/calendar") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
148 |           >
149 |             <span className="mr-3">📆</span> Календар
150 |           </Link>
151 |           {isSuperAdmin && (
152 |             <Link
153 |               to="/employees"
154 |               onClick={handleLinkClick}
155 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/employees") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
156 |             >
157 |               <span className="mr-3">👥</span> Працівники
158 |             </Link>
159 |           )}
160 |         </nav>
161 | 
162 |         <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
163 |           <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
164 |             <div className="flex items-center">
165 |               <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
166 |                 {user?.name?.charAt(0) ?? "?"}
167 |               </div>
168 |               <div className="text-sm truncate max-w-[120px]">
169 |                 <p className="font-medium text-white truncate">
170 |                   {user?.name ?? "Користувач"}
171 |                 </p>
172 |                 <p className="text-xs text-slate-400 truncate">
173 |                   {user?.role ?? ""}
174 |                 </p>
175 |               </div>
176 |             </div>
177 |             <button
178 |               onClick={handleLogout}
179 |               className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-2 shrink-0 p-2"
180 |               title="Вийти"
181 |             >
182 |               ⬅️
183 |             </button>
184 |           </div>
185 |         </div>
186 |       </aside>
187 | 
188 |       {/* Головна область */}
189 |       <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full">
190 |         <Outlet />
191 |       </main>
192 |     </div>
193 |   );
194 | }
195 | 
```

### File: apps/frontend/src/components/PhoneLink.tsx
```tsx
  0 | // Невеликий перевикористовуваний компонент:
  1 | // будь-який номер телефону робить клікабельним — на телефоні відкриває діалер з номером,
  2 | // на десктопі — пропонує подзвонити через застосунок, який обробляє tel: (Skype, FaceTime тощо).
  3 | // Використання: <PhoneLink phone={crew.phone} />
  4 | 
  5 | interface PhoneLinkProps {
  6 |   phone?: string | null;
  7 |   className?: string;
  8 | }
  9 | 
 10 | export default function PhoneLink({ phone, className }: PhoneLinkProps) {
 11 |   if (!phone) return <span className="text-slate-400">—</span>;
 12 | 
 13 |   // tel: посилання працює надійніше, якщо лишити тільки цифри та "+"
 14 |   const cleaned = phone.replace(/[^\d+]/g, "");
 15 | 
 16 |   return (
 17 |     <a
 18 |       href={`tel:${cleaned}`}
 19 |       // щоб клік по номеру не тригерив onClick батьківського рядка/картки (наприклад, навігацію)
 20 |       onClick={(e) => e.stopPropagation()}
 21 |       title="Зателефонувати"
 22 |       className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
 23 |         className ?? ""
 24 |       }`}
 25 |     >
 26 |       <svg
 27 |         viewBox="0 0 24 24"
 28 |         fill="none"
 29 |         stroke="currentColor"
 30 |         strokeWidth={1.8}
 31 |         className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
 32 |       >
 33 |         <path
 34 |           strokeLinecap="round"
 35 |           strokeLinejoin="round"
 36 |           d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.439l-3.808-1.142a1.5 1.5 0 00-1.55.43l-1.05 1.05a11.25 11.25 0 01-5.516-5.516l1.05-1.05a1.5 1.5 0 00.43-1.55L8.36 3.327A1.5 1.5 0 006.92 2.25H5.55A2.25 2.25 0 003.3 4.5v.75"
 37 |         />
 38 |       </svg>
 39 |       <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
 40 |         {phone}
 41 |       </span>
 42 |     </a>
 43 |   );
 44 | }
```

### File: apps/frontend/src/components/VirtualSchoolList.tsx
```tsx
  0 | import { useRef } from 'react';
  1 | import { useVirtualizer } from '@tanstack/react-virtual';
  2 | 
  3 | interface VirtualSchoolListProps {
  4 |   schools: any[];
  5 |   renderItem: (school: any) => JSX.Element;
  6 |   itemHeight?: number;
  7 | }
  8 | 
  9 | export default function VirtualSchoolList({ schools, renderItem, itemHeight = 120 }: VirtualSchoolListProps) {
 10 |   const parentRef = useRef<HTMLDivElement>(null);
 11 | 
 12 |   const rowVirtualizer = useVirtualizer({
 13 |     count: schools.length,
 14 |     getScrollElement: () => parentRef.current,
 15 |     estimateSize: () => itemHeight,
 16 |     overscan: 5,
 17 |   });
 18 | 
 19 |   return (
 20 |     <div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto w-full">
 21 |       <div
 22 |         style={{
 23 |           height: `${rowVirtualizer.getTotalSize()}px`,
 24 |           width: '100%',
 25 |           position: 'relative',
 26 |         }}
 27 |       >
 28 |         {rowVirtualizer.getVirtualItems().map((virtualRow) => (
 29 |           <div
 30 |             key={virtualRow.key}
 31 |             style={{
 32 |               position: 'absolute',
 33 |               top: 0,
 34 |               left: 0,
 35 |               width: '100%',
 36 |               height: `${virtualRow.size}px`,
 37 |               transform: `translateY(${virtualRow.start}px)`,
 38 |             }}
 39 |           >
 40 |             {renderItem(schools[virtualRow.index])}
 41 |           </div>
 42 |         ))}
 43 |       </div>
 44 |     </div>
 45 |   );
 46 | }
```

### File: apps/frontend/src/components/cities/CityDesktopGrid.tsx
```tsx
  0 | import { useNavigate } from "react-router-dom";
  1 | import OptimizedImage from "../ui/OptimizedImage";
  2 | 
  3 | const CITY_PHOTOS: Record<string, string> = {
  4 |   Львів: "https://gohotels.com.ua/images/stories/f08072159a443e07501f3df97987f8a3.jpg",
  5 |   Київ: "https://images.unsplash.com/photo-1630651814316-fe71f3c30279?w=600&q=80&auto=format",
  6 |   Харків: "https://images.unsplash.com/photo-1584646098378-0f87b72cffe1?w=600&q=80&auto=format",
  7 |   Одеса: "https://images.unsplash.com/photo-1585168050053-a4ba02e3f0d2?w=600&q=80&auto=format",
  8 |   Дніпро: "https://images.unsplash.com/photo-1570587953042-a65fd17e2f73?w=600&q=80&auto=format",
  9 | };
 10 | const DEFAULT_PHOTO = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";
 11 | 
 12 | export default function CityDesktopGrid({ cities, selectedCity, onSelectCity }: any) {
 13 |   const navigate = useNavigate();
 14 | 
 15 |   return (
 16 |     <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 17 |       {cities.map((city: any) => {
 18 |         const isSelected = selectedCity?.id === city.id;
 19 |         return (
 20 |           <div
 21 |             key={city.id}
 22 |             className={`bg-white rounded-2xl shadow-sm border transition-all overflow-hidden group ${
 23 |               isSelected ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md" : "border-slate-100 hover:shadow-lg hover:border-blue-200"
 24 |             }`}
 25 |           >
 26 |             <div className="h-44 overflow-hidden relative">
 27 |               <OptimizedImage
 28 |                 src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
 29 |                 alt={city.name}
 30 |                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
 31 |                 onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_PHOTO; }}
 32 |               />
 33 |               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
 34 |               {isSelected && (
 35 |                 <div className="absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
 36 |                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 37 |                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
 38 |                   </svg>
 39 |                 </div>
 40 |               )}
 41 |             </div>
 42 | 
 43 |             <div className="p-5">
 44 |               <div className="flex items-center justify-between mb-3">
 45 |                 <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{city.name}</h2>
 46 |                 <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">Активне</span>
 47 |               </div>
 48 |               <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
 49 |                 <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
 50 |                   {city.manager?.name?.charAt(0) ?? "?"}
 51 |                 </div>
 52 |                 <span>Менеджер: <span className="font-medium">{city.manager?.name ?? "—"}</span></span>
 53 |               </div>
 54 |               <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
 55 |                 <div className="flex justify-between text-slate-500">
 56 |                   <span>Заплановано подій:</span>
 57 |                   <span className="font-semibold text-slate-800">{city.plannedEvents ?? 0}</span>
 58 |                 </div>
 59 |               </div>
 60 |               <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
 61 |                 <button
 62 |                   onClick={() => onSelectCity({ id: city.id, name: city.name })}
 63 |                   className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
 64 |                     isSelected ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-blue-600 hover:bg-blue-700 text-white"
 65 |                   }`}
 66 |                 >
 67 |                   {isSelected ? "Обрано" : "✓ Вибрати"}
 68 |                 </button>
 69 |                 <button
 70 |                   onClick={() => navigate(`/cities/${city.id}`)}
 71 |                   className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
 72 |                 >
 73 |                   →
 74 |                 </button>
 75 |               </div>
 76 |             </div>
 77 |           </div>
 78 |         );
 79 |       })}
 80 |     </div>
 81 |   );
 82 | }
 83 | 
```

### File: apps/frontend/src/components/cities/CityMobileHeader.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { api } from "../../config/api";
  3 | 
  4 | interface Props {
  5 |   selectedCity: any;
  6 |   cities: any[]; // Передаємо всі міста для статистики
  7 | }
  8 | 
  9 | const STATUSES = ['Планується', 'Виконується', 'Виконано'];
 10 | 
 11 | const STATUS_STYLES: Record<string, string> = {
 12 |   'Планується': 'bg-amber-50 text-amber-700 border-amber-200',
 13 |   'Виконується': 'bg-blue-50 text-blue-700 border-blue-200',
 14 |   'Виконано': 'bg-emerald-50 text-emerald-700 border-emerald-200',
 15 | };
 16 | 
 17 | function getNextStatus(current: string) {
 18 |   const idx = STATUSES.indexOf(current);
 19 |   return STATUSES[(idx + 1) % STATUSES.length];
 20 | }
 21 | 
 22 | export default function CityMobileHeader({ selectedCity, cities }: Props) {
 23 |   const navigate = useNavigate();
 24 |   const [issues, setIssues] = useState<any[]>([]);
 25 |   const [isExpanded, setIsExpanded] = useState(false);
 26 |   const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
 27 | 
 28 |   useEffect(() => {
 29 |     if (!selectedCity?.id) {
 30 |       setIssues([]);
 31 |       return;
 32 |     }
 33 |     api.get(`/issues?cityId=${selectedCity.id}`).then((res) => {
 34 |       setIssues(res.data.filter((i: any) => i.status !== "Виконано"));
 35 |     }).catch(console.error);
 36 |   }, [selectedCity?.id]);
 37 | 
 38 |   const handleStatusToggle = async (issue: any) => {
 39 |     const nextStatus = getNextStatus(issue.status);
 40 |     try {
 41 |       await api.patch(`/issues/${issue.id}/status`, { status: nextStatus });
 42 |       if (nextStatus === 'Виконано') {
 43 |         setExitingIssueId(issue.id);
 44 |         setTimeout(() => {
 45 |           setIssues(prev => prev.filter(i => i.id !== issue.id));
 46 |           setExitingIssueId(null);
 47 |           // Якщо це була остання проблема, згортаємо блок
 48 |           if (issues.length === 1) setIsExpanded(false);
 49 |         }, 400);
 50 |       } else {
 51 |         setIssues(prev => prev.map(i => i.id === issue.id ? { ...i, status: nextStatus } : i));
 52 |       }
 53 |     } catch (e) {
 54 |       console.error(e);
 55 |     }
 56 |   };
 57 | 
 58 |   const currentCityData = cities?.find((c: any) => c.id === selectedCity?.id);
 59 |   const totalEvents = (currentCityData?.plannedEvents || 0) + (currentCityData?.completedEvents || 0);
 60 |   const schoolsCount = currentCityData?.schoolsCount || 0;
 61 | 
 62 |   return (
 63 |     <div className="md:hidden flex flex-col gap-4 mb-4">
 64 |       {/* Сповіщення про проблему з розгортанням */}
 65 |       {issues.length > 0 && (
 66 |         <div className="bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm transition-all">
 67 |           <div 
 68 |             className="flex items-center gap-4 cursor-pointer"
 69 |             onClick={() => setIsExpanded(!isExpanded)}
 70 |           >
 71 |             <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
 72 |               🔔
 73 |             </div>
 74 |             <div className="flex-1 min-w-0">
 75 |               <p className="font-bold text-slate-800 text-sm">
 76 |                 {issues.length} активн{issues.length === 1 ? 'а проблема' : issues.length < 5 ? 'і проблеми' : 'их проблем'}
 77 |               </p>
 78 |               {!isExpanded && (
 79 |                 <p className="text-xs text-slate-600 truncate mt-0.5">{issues[0]?.schoolName}</p>
 80 |               )}
 81 |             </div>
 82 |             <button 
 83 |               className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
 84 |               style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
 85 |             >
 86 |               ›
 87 |             </button>
 88 |           </div>
 89 | 
 90 |           {/* Розгорнутий список проблем */}
 91 |           {isExpanded && (
 92 |             <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-red-100/50">
 93 |               {issues.map(issue => {
 94 |                 const isExiting = exitingIssueId === issue.id;
 95 |                 return (
 96 |                   <div 
 97 |                     key={issue.id} 
 98 |                     className={`bg-white rounded-2xl p-4 border border-red-100 shadow-sm relative transition-all duration-400 ease-in-out transform origin-top ${
 99 |                       isExiting ? 'opacity-0 scale-95 h-0 overflow-hidden !p-0 border-0' : 'opacity-100 scale-100'
100 |                     }`}
101 |                   >
102 |                     <p className="text-[11px] text-slate-400 mb-1">
103 |                       {new Date(issue.createdAt).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
104 |                     </p>
105 |                     <p className="font-bold text-slate-800 text-sm">{issue.schoolName}</p>
106 |                     <p className="text-[11px] text-slate-500 mb-3">{issue.eventName}</p>
107 |                     
108 |                     <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed border border-slate-100 mb-3">
109 |                       "{issue.message}"
110 |                     </p>
111 |                     
112 |                     <button
113 |                       onClick={() => handleStatusToggle(issue)}
114 |                       className={`w-full text-xs font-bold px-3 py-2.5 rounded-lg border transition-colors text-left flex items-center gap-1.5 ${STATUS_STYLES[issue.status] || STATUS_STYLES['Планується']}`}
115 |                     >
116 |                       <span className="text-[10px]">●</span> {issue.status} <span className="font-normal opacity-70">→ натисни щоб змінити</span>
117 |                     </button>
118 |                   </div>
119 |                 );
120 |               })}
121 |             </div>
122 |           )}
123 |         </div>
124 |       )}
125 | 
126 |       {/* Поточне місто */}
127 |       {selectedCity?.id && (
128 |         <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
129 |           <div className="flex justify-between items-center mb-4">
130 |             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Поточне місто</span>
131 |             <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
132 |               ✓ Активне місто
133 |             </span>
134 |           </div>
135 | 
136 |           <div className="flex items-center gap-3 mb-4">
137 |             <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg">📍</div>
138 |             <h2 className="text-2xl font-bold text-slate-800">{selectedCity.name}</h2>
139 |           </div>
140 | 
141 |           <div className="flex items-center justify-between text-xs font-medium gap-2">
142 |             <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
143 |               <span className="text-blue-500 text-sm">📅</span> {totalEvents} подій
144 |             </div>
145 |             <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
146 |               <span className="text-blue-500 text-sm">🏫</span> {schoolsCount} шкіл
147 |             </div>
148 |             <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
149 |               <span className="text-sm">⚠️</span> {issues.length} проблем
150 |             </div>
151 |             {/* <button 
152 |               onClick={() => navigate(`/cities/${selectedCity.id}`)} 
153 |               className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
154 |             >
155 |               →
156 |             </button> */}
157 |           </div>
158 |         </div>
159 |       )}
160 |     </div>
161 |   );
162 | }
```

### File: apps/frontend/src/components/cities/CityMobileList.tsx
```tsx
  0 | import { useState, useMemo } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | 
  3 | const ICON_COLORS = [
  4 |   "bg-purple-50 text-purple-600",
  5 |   "bg-amber-50 text-amber-600",
  6 |   "bg-teal-50 text-teal-600",
  7 |   "bg-rose-50 text-rose-600",
  8 |   "bg-sky-50 text-sky-600",
  9 | ];
 10 | 
 11 | export default function CityMobileList({ cities, selectedCity, onSelectCity }: any) {
 12 |   const navigate = useNavigate();
 13 |   const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">("ACTIVE");
 14 | 
 15 |   const filteredCities = useMemo(() => {
 16 |     return cities.filter((c: any) => {
 17 |       const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
 18 |       
 19 |       if (activeTab === "ACTIVE") return hasEvents;
 20 |       if (activeTab === "ARCHIVED") return !hasEvents; // Ті, де НЕМАЄ подій
 21 |       return true; // Усі
 22 |     });
 23 |   }, [cities, activeTab]);
 24 | 
 25 |   return (
 26 |     <div className="md:hidden flex flex-col gap-4 mb-24">
 27 |       {/* Вкладки (Без пошуку) */}
 28 |       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-1">
 29 |         {['Активні', 'Усі', 'Архівні'].map(tab => {
 30 |           const tabKey = tab === 'Активні' ? 'ACTIVE' : tab === 'Усі' ? 'ALL' : 'ARCHIVED';
 31 |           const isActive = activeTab === tabKey;
 32 |           return (
 33 |             <button 
 34 |               key={tab} 
 35 |               onClick={() => setActiveTab(tabKey)}
 36 |               className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
 37 |             >
 38 |               {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
 39 |               {tab}
 40 |             </button>
 41 |           )
 42 |         })}
 43 |       </div>
 44 | 
 45 |       {/* Список */}
 46 |       <div className="flex flex-col bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
 47 |         {filteredCities.map((city: any, index: number) => {
 48 |           const iconStyle = ICON_COLORS[index % ICON_COLORS.length];
 49 |           const totalEvents = (city.plannedEvents || 0) + (city.completedEvents || 0);
 50 | 
 51 |           return (
 52 |             <div 
 53 |               key={city.id} 
 54 |               onClick={() => onSelectCity({ id: city.id, name: city.name })}
 55 |               className={`flex items-center p-4 border-b border-slate-50 active:bg-slate-50 transition-colors ${selectedCity?.id === city.id ? 'bg-blue-50/30' : ''}`}
 56 |             >
 57 |               <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${iconStyle}`}>
 58 |                 🏛️
 59 |               </div>
 60 |               <div className="flex-1 min-w-0">
 61 |                 <p className="font-bold text-slate-800 text-base">{city.name}</p>
 62 |                 <p className="text-xs font-medium text-slate-400 mt-0.5">
 63 |                   {totalEvents} подій • {city.schoolsCount || 0} шкіл
 64 |                 </p>
 65 |               </div>
 66 |               <button 
 67 |                 onClick={(e) => { e.stopPropagation(); navigate(`/cities/${city.id}`); }} 
 68 |                 className="p-3 text-slate-400 hover:text-blue-600 text-2xl font-light leading-none"
 69 |               >
 70 |                 ›
 71 |               </button>
 72 |             </div>
 73 |           )
 74 |         })}
 75 |         {filteredCities.length === 0 && <div className="p-8 text-center text-slate-400 font-medium">Міст не знайдено</div>}
 76 |       </div>
 77 |     </div>
 78 |   );
 79 | }
 80 | 
```

### File: apps/frontend/src/components/city-profile/CityAnalytics.tsx
```tsx
  0 | import { useMemo, useState } from 'react';
  1 | import {
  2 |   ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  3 |   PieChart, Pie, Cell,
  4 | } from 'recharts';
  5 | 
  6 | interface CityAnalyticsProps {
  7 |   events: any[];
  8 | }
  9 | 
 10 | const PALETTE = ['#2563eb', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#f43f5e', '#84cc16', '#6366f1', '#0ea5e9', '#ec4899', '#14b8a6', '#a855f7'];
 11 | 
 12 | const UA_MONTHS = ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'];
 13 | const DATE_FMT = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
 14 | 
 15 | function toMonthKey(d: Date) {
 16 |   return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
 17 | }
 18 | 
 19 | function monthLabel(key: string) {
 20 |   const [y, m] = key.split('-').map(Number);
 21 |   return `${UA_MONTHS[m - 1]} ${String(y).slice(-2)}`;
 22 | }
 23 | 
 24 | function fmt(n: number) {
 25 |   return new Intl.NumberFormat('uk-UA').format(Math.round(n || 0));
 26 | }
 27 | 
 28 | function toInputDate(d: Date) {
 29 |   return d.toISOString().slice(0, 10);
 30 | }
 31 | 
 32 | export default function CityAnalytics({ events }: CityAnalyticsProps) {
 33 |   const today = useMemo(() => new Date(), []);
 34 | 
 35 |   const [from, setFrom] = useState(() => toInputDate(new Date(today.getFullYear(), today.getMonth() - 5, 1)));
 36 |   const [to, setTo] = useState(() => toInputDate(today));
 37 |   const [isOpen, setIsOpen] = useState(false);
 38 |   const [draftFrom, setDraftFrom] = useState(from);
 39 |   const [draftTo, setDraftTo] = useState(to);
 40 | 
 41 |   const applyPreset = (months: number | null, mode?: 'year' | 'all') => {
 42 |     const t = new Date();
 43 |     let f: Date;
 44 |     if (mode === 'year') f = new Date(t.getFullYear(), 0, 1);
 45 |     else if (mode === 'all') f = new Date(2000, 0, 1);
 46 |     else f = new Date(t.getFullYear(), t.getMonth() - (months! - 1), 1);
 47 |     setDraftFrom(toInputDate(f));
 48 |     setDraftTo(toInputDate(t));
 49 |   };
 50 | 
 51 |   const applyRange = () => {
 52 |     setFrom(draftFrom);
 53 |     setTo(draftTo);
 54 |     setIsOpen(false);
 55 |   };
 56 | 
 57 |   const filtered = useMemo(() => {
 58 |     const fromD = new Date(from);
 59 |     const toD = new Date(to);
 60 |     toD.setHours(23, 59, 59, 999);
 61 |     return (events || []).filter(ev => {
 62 |       const d = new Date(ev.date);
 63 |       return d >= fromD && d <= toD;
 64 |     });
 65 |   }, [events, from, to]);
 66 | 
 67 |   const monthly = useMemo(() => {
 68 |     const map = new Map<string, { revenue: number; profit: number; children: number; count: number }>();
 69 |     const fromD = new Date(from);
 70 |     const toD = new Date(to);
 71 |     const cursor = new Date(fromD.getFullYear(), fromD.getMonth(), 1);
 72 |     const last = new Date(toD.getFullYear(), toD.getMonth(), 1);
 73 |     let guard = 0;
 74 |     while (cursor <= last && guard < 240) {
 75 |       map.set(toMonthKey(cursor), { revenue: 0, profit: 0, children: 0, count: 0 });
 76 |       cursor.setMonth(cursor.getMonth() + 1);
 77 |       guard += 1;
 78 |     }
 79 |     filtered.forEach(ev => {
 80 |       const key = toMonthKey(new Date(ev.date));
 81 |       const bucket = map.get(key) || { revenue: 0, profit: 0, children: 0, count: 0 };
 82 |       bucket.revenue += ev.report?.totalSum || ev.price || 0;
 83 |       bucket.profit += ev.report?.remainderSum || 0;
 84 |       bucket.children += ev.report?.childrenCount || ev.childrenPlanned || 0;
 85 |       bucket.count += 1;
 86 |       map.set(key, bucket);
 87 |     });
 88 |     return Array.from(map.entries())
 89 |       .sort(([a], [b]) => a.localeCompare(b))
 90 |       .map(([key, v]) => ({ key, label: monthLabel(key), ...v }));
 91 |   }, [filtered, from, to]);
 92 | 
 93 |   const totalRevenue = filtered.reduce((s, ev) => s + (ev.report?.totalSum || ev.price || 0), 0);
 94 |   const totalProfit = filtered.reduce((s, ev) => s + (ev.report?.remainderSum || 0), 0);
 95 |   const totalChildren = filtered.reduce((s, ev) => s + (ev.report?.childrenCount || ev.childrenPlanned || 0), 0);
 96 |   const totalCount = filtered.length;
 97 | 
 98 |   const pieData = monthly.filter(m => m.count > 0);
 99 |   const pieTotal = pieData.reduce((s, m) => s + m.count, 0);
100 |   const hasRevenue = monthly.some(m => m.revenue > 0);
101 | 
102 |   const exportCsv = () => {
103 |     const header = 'Місяць;Виручка;Прибуток;Подій;Дітей\n';
104 |     const rows = monthly.map(m => `${m.label};${m.revenue};${m.profit};${m.count};${m.children}`).join('\n');
105 |     const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
106 |     const url = URL.createObjectURL(blob);
107 |     const a = document.createElement('a');
108 |     a.href = url;
109 |     a.download = `analytics_${from}_${to}.csv`;
110 |     a.click();
111 |     URL.revokeObjectURL(url);
112 |   };
113 | 
114 |   const rangeLabel = `${DATE_FMT.format(new Date(from))} – ${DATE_FMT.format(new Date(to))}`;
115 | 
116 |   return (
117 |     <div className="flex flex-col gap-6">
118 |       {/* Контроли */}
119 |       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
120 |         <div>
121 |           <h3 className="font-bold text-slate-800 text-lg">Аналітика по місяцях</h3>
122 |           <p className="text-sm text-slate-400 mt-0.5">На основі завершених подій закладу</p>
123 |         </div>
124 | 
125 |         <div className="flex items-center gap-2">
126 |           <div className="relative flex-1 sm:flex-none">
127 |             <button
128 |               onClick={() => { setDraftFrom(from); setDraftTo(to); setIsOpen(v => !v); }}
129 |               className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
130 |             >
131 |               📅 <span className="truncate">{rangeLabel}</span> <span className="text-slate-400">⌄</span>
132 |             </button>
133 | 
134 |             {isOpen && (
135 |               <>
136 |                 <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
137 |                 <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded-xl shadow-lg border border-slate-100 p-4 w-72">
138 |                   <div className="flex flex-wrap gap-2 mb-4">
139 |                     <button onClick={() => applyPreset(3)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">3 міс.</button>
140 |                     <button onClick={() => applyPreset(6)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">6 міс.</button>
141 |                     <button onClick={() => applyPreset(12)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">12 міс.</button>
142 |                     <button onClick={() => applyPreset(null, 'year')} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">Цей рік</button>
143 |                     <button onClick={() => applyPreset(null, 'all')} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">Весь час</button>
144 |                   </div>
145 |                   <div className="grid grid-cols-2 gap-3 mb-4">
146 |                     <div>
147 |                       <label className="block text-xs text-slate-500 mb-1">Від</label>
148 |                       <input type="date" value={draftFrom} onChange={e => setDraftFrom(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
149 |                     </div>
150 |                     <div>
151 |                       <label className="block text-xs text-slate-500 mb-1">До</label>
152 |                       <input type="date" value={draftTo} onChange={e => setDraftTo(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
153 |                     </div>
154 |                   </div>
155 |                   <button onClick={applyRange} className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
156 |                     Застосувати
157 |                   </button>
158 |                 </div>
159 |               </>
160 |             )}
161 |           </div>
162 | 
163 |           <button
164 |             onClick={exportCsv}
165 |             className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors"
166 |           >
167 |             ⬇ <span className="hidden sm:inline">Експорт</span>
168 |           </button>
169 |         </div>
170 |       </div>
171 | 
172 |       {/* Загальна інформація */}
173 |       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
174 |         <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
175 |           <Stat label="Загальна виручка" value={`${fmt(totalRevenue)} грн`} />
176 |           <Stat label="Загальний прибуток" value={`${fmt(totalProfit)} грн`} />
177 |           <Stat label="Проведено подій" value={totalCount} />
178 |           <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
179 |         </div>
180 |       </div>
181 | 
182 |       {/* Графіки */}
183 |       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
184 |         {/* Виручка по місяцях */}
185 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
186 |           <h4 className="font-bold text-slate-800 mb-4">Виручка по місяцях</h4>
187 |           {!hasRevenue ? (
188 |             <EmptyChart />
189 |           ) : (
190 |             <ResponsiveContainer width="100%" height={280}>
191 |               <BarChart data={monthly} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
192 |                 <CartesianGrid vertical={false} stroke="#f1f5f9" />
193 |                 <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={monthly.length > 8 ? 1 : 0} />
194 |                 <YAxis
195 |                   tick={{ fontSize: 11, fill: '#64748b' }}
196 |                   axisLine={false}
197 |                   tickLine={false}
198 |                   width={46}
199 |                   tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
200 |                 />
201 |                 <Tooltip
202 |                   cursor={{ fill: '#f8fafc' }}
203 |                   formatter={(v: number) => [`${fmt(v)} грн`, 'Виручка']}
204 |                   contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
205 |                 />
206 |                 <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
207 |               </BarChart>
208 |             </ResponsiveContainer>
209 |           )}
210 |         </div>
211 | 
212 |         {/* Проведено подій по місяцях */}
213 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
214 |           <h4 className="font-bold text-slate-800 mb-4">Проведено подій по місяцях</h4>
215 |           {pieData.length === 0 ? (
216 |             <EmptyChart />
217 |           ) : (
218 |             <div className="flex flex-col sm:flex-row items-center gap-6">
219 |               <div className="relative w-44 h-44 shrink-0">
220 |                 <ResponsiveContainer width="100%" height="100%">
221 |                   <PieChart>
222 |                     <Pie data={pieData} dataKey="count" nameKey="label" innerRadius={52} outerRadius={78} paddingAngle={2} strokeWidth={0}>
223 |                       {pieData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
224 |                     </Pie>
225 |                     <Tooltip formatter={(v: number, n: string) => [`${v} подій`, n]} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
226 |                   </PieChart>
227 |                 </ResponsiveContainer>
228 |                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
229 |                   <span className="text-xs text-slate-400">Всього</span>
230 |                   <span className="text-xl font-bold text-slate-800">{pieTotal}</span>
231 |                 </div>
232 |               </div>
233 |               <ul className="flex-1 flex flex-col gap-2 text-sm w-full min-w-0">
234 |                 {pieData.map((m, i) => (
235 |                   <li key={m.key} className="flex items-center gap-2 min-w-0">
236 |                     <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
237 |                     <span className="text-slate-600 truncate flex-1">{m.label}</span>
238 |                     <span className="font-medium text-slate-800 shrink-0">{m.count} ({Math.round((m.count / pieTotal) * 100)}%)</span>
239 |                   </li>
240 |                 ))}
241 |               </ul>
242 |             </div>
243 |           )}
244 |         </div>
245 |       </div>
246 |     </div>
247 |   );
248 | }
249 | 
250 | function Stat({ label, value }: { label: string; value: string | number }) {
251 |   return (
252 |     <div className="min-w-0">
253 |       <p className="text-xs text-slate-400 font-medium mb-1.5 truncate">{label}</p>
254 |       <p className="text-lg sm:text-2xl font-bold text-slate-800 truncate">{value}</p>
255 |     </div>
256 |   );
257 | }
258 | 
259 | function EmptyChart() {
260 |   return (
261 |     <div className="h-[280px] flex flex-col items-center justify-center text-slate-300">
262 |       <span className="text-3xl mb-2">📊</span>
263 |       <span className="text-sm text-slate-400">Немає даних за цей період</span>
264 |     </div>
265 |   );
266 | }
```

### File: apps/frontend/src/components/dashboard/ActivityFeed.tsx
```tsx
  0 | import { useState } from 'react';
  1 | import { useNavigate } from 'react-router-dom';
  2 | 
  3 | const ROLE_INITIALS: Record<string, string> = {
  4 |   MANAGER:    'М',
  5 |   SUPERADMIN: 'А',
  6 |   DRIVER:     'В',
  7 |   HOST:       'В',
  8 | };
  9 | 
 10 | const ROLE_COLORS: Record<string, string> = {
 11 |   MANAGER:    'bg-blue-50 text-blue-700',
 12 |   SUPERADMIN: 'bg-purple-50 text-purple-700',
 13 |   DRIVER:     'bg-emerald-50 text-emerald-700',
 14 |   HOST:       'bg-violet-50 text-violet-700',
 15 | };
 16 | 
 17 | function getInitials(name: string): string {
 18 |   const parts = name.trim().split(' ');
 19 |   if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
 20 |   return name.slice(0, 2).toUpperCase();
 21 | }
 22 | 
 23 | function formatTime(iso: string): string {
 24 |   return new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
 25 | }
 26 | 
 27 | function formatDate(iso: string): string {
 28 |   const d = new Date(iso);
 29 |   const today = new Date();
 30 |   const yesterday = new Date(today);
 31 |   yesterday.setDate(today.getDate() - 1);
 32 | 
 33 |   if (d.toDateString() === today.toDateString()) return 'сьогодні';
 34 |   if (d.toDateString() === yesterday.toDateString()) return 'вчора';
 35 |   return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
 36 | }
 37 | 
 38 | interface ActivityItem {
 39 |   id:         string;
 40 |   userName:   string;
 41 |   role:       string;
 42 |   action:     string;
 43 |   comment:    string | null;
 44 |   createdAt:  string;
 45 |   schoolId:   string | null;
 46 |   schoolName: string | null;
 47 |   eventId:    string | null;
 48 | }
 49 | 
 50 | // Група: один користувач + одна школа підряд
 51 | interface Group {
 52 |   key:       string;
 53 |   userName:  string;
 54 |   role:      string;
 55 |   schoolId:  string | null;
 56 |   schoolName: string | null;
 57 |   actions:   { id: string; action: string; comment: string | null; createdAt: string }[];
 58 | }
 59 | 
 60 | function groupItems(items: ActivityItem[]): Group[] {
 61 |   const groups: Group[] = [];
 62 | 
 63 |   for (const item of items) {
 64 |     const last = groups[groups.length - 1];
 65 |     const sameUser   = last?.userName  === item.userName;
 66 |     const sameSchool = last?.schoolId  === item.schoolId;  // null === null теж OK
 67 | 
 68 |     if (last && sameUser && sameSchool) {
 69 |       last.actions.push({ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt });
 70 |     } else {
 71 |       groups.push({
 72 |         key:        item.id,
 73 |         userName:   item.userName,
 74 |         role:       item.role,
 75 |         schoolId:   item.schoolId,
 76 |         schoolName: item.schoolName,
 77 |         actions:    [{ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt }],
 78 |       });
 79 |     }
 80 |   }
 81 | 
 82 |   return groups;
 83 | }
 84 | 
 85 | const COLLAPSED_COUNT = 2;
 86 | 
 87 | interface Props {
 88 |   items: ActivityItem[];
 89 | }
 90 | 
 91 | export default function ActivityFeed({ items }: Props) {
 92 |   const navigate  = useNavigate();
 93 |   const [expanded, setExpanded] = useState(false);
 94 | 
 95 |   const groups   = groupItems(items);
 96 |   const visible  = expanded ? groups : groups.slice(0, COLLAPSED_COUNT);
 97 |   const hasMore  = groups.length > COLLAPSED_COUNT;
 98 | 
 99 |   return (
100 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
101 | 
102 |       {/* Хедер */}
103 |       <div className="flex justify-between items-center mb-3">
104 |         <p className="text-sm font-semibold text-slate-800">Активність команди</p>
105 |         <span className="text-xs text-slate-400">{formatDate(items[0]?.createdAt ?? new Date().toISOString())}</span>
106 |       </div>
107 | 
108 |       {items.length === 0 ? (
109 |         <div className="py-6 text-center text-slate-400 text-sm">
110 |           Сьогодні активності ще немає
111 |         </div>
112 |       ) : (
113 |         <>
114 |           <div className="flex flex-col gap-1">
115 |             {visible.map((group) => {
116 |               const avatarColor = ROLE_COLORS[group.role] ?? 'bg-slate-100 text-slate-600';
117 |               // Показуємо до 3 останніх дій у групі
118 |               const shownActions = group.actions.slice(-3);
119 |               const hiddenCount  = group.actions.length - shownActions.length;
120 |               const lastTime     = formatTime(group.actions[group.actions.length - 1].createdAt);
121 | 
122 |               return (
123 |                 <div key={group.key} className="flex items-start gap-3 py-2 px-2 -mx-1 rounded-xl hover:bg-slate-50/60 transition-colors">
124 | 
125 |                   {/* Аватар */}
126 |                   <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${avatarColor}`}>
127 |                     {getInitials(group.userName)}
128 |                   </div>
129 | 
130 |                   {/* Контент */}
131 |                   <div className="min-w-0 flex-1">
132 | 
133 |                     {/* Ім'я + школа */}
134 |                     <p className="text-xs font-semibold text-slate-800 leading-tight">
135 |                       {group.userName}
136 |                       {group.schoolName && (
137 |                         <>
138 |                           {' · '}
139 |                           <button
140 |                             onClick={() => group.schoolId && navigate(`/schools/${group.schoolId}`)}
141 |                             className="text-blue-600 hover:underline font-medium"
142 |                           >
143 |                             {group.schoolName}
144 |                           </button>
145 |                         </>
146 |                       )}
147 |                     </p>
148 | 
149 |                     {/* Дії */}
150 |                     <div className="mt-1 flex flex-col gap-0.5">
151 |                       {hiddenCount > 0 && (
152 |                         <p className="text-xs text-slate-400 italic">+{hiddenCount} раніше</p>
153 |                       )}
154 |                       {shownActions.map((a) => (
155 |                         <p key={a.id} className="text-xs text-slate-500 leading-snug">
156 |                           — {a.action.replace(/\.$/, '')}
157 |                           {a.comment && (
158 |                             <span className="text-slate-400 italic"> «{a.comment}»</span>
159 |                           )}
160 |                         </p>
161 |                       ))}
162 |                     </div>
163 |                   </div>
164 | 
165 |                   {/* Час останньої дії */}
166 |                   <span className="text-xs text-slate-400 shrink-0 pt-0.5">{lastTime}</span>
167 | 
168 |                 </div>
169 |               );
170 |             })}
171 |           </div>
172 | 
173 |           {/* Кнопка згорнути/розгорнути */}
174 |           {hasMore && (
175 |             <button
176 |               onClick={() => setExpanded(v => !v)}
177 |               className="mt-3 pt-3 border-t border-slate-50 text-xs text-blue-600 hover:underline text-center w-full"
178 |             >
179 |               {expanded
180 |                 ? '↑ Згорнути'
181 |                 : `↓ Показати ще ${groups.length - COLLAPSED_COUNT}`}
182 |             </button>
183 |           )}
184 |         </>
185 |       )}
186 | 
187 |     </div>
188 |   );
189 | }
```

### File: apps/frontend/src/components/dashboard/CitiesTable.tsx
```tsx
  0 | import { useNavigate } from 'react-router-dom';
  1 | 
  2 | function fmt(n: number): string {
  3 |   return new Intl.NumberFormat('uk-UA').format(Math.round(n));
  4 | }
  5 | 
  6 | function plural(n: number, one: string, few: string, many: string): string {
  7 |   const mod10  = n % 10;
  8 |   const mod100 = n % 100;
  9 |   if (mod10 === 1 && mod100 !== 11) return one;
 10 |   if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
 11 |   return many;
 12 | }
 13 | 
 14 | interface CityRow {
 15 |   cityId:       string;
 16 |   cityName:     string;
 17 |   schoolsCount: number;
 18 |   activeEvents: number;
 19 |   monthRevenue: number;
 20 | }
 21 | 
 22 | interface Props {
 23 |   rows: CityRow[];
 24 | }
 25 | 
 26 | export default function CitiesTable({ rows }: Props) {
 27 |   const navigate = useNavigate();
 28 | 
 29 |   const totals = rows.reduce(
 30 |     (acc, r) => {
 31 |       acc.schools  += r.schoolsCount;
 32 |       acc.events   += r.activeEvents;
 33 |       acc.revenue  += r.monthRevenue;
 34 |       return acc;
 35 |     },
 36 |     { schools: 0, events: 0, revenue: 0 },
 37 |   );
 38 | 
 39 |   return (
 40 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
 41 |       <div className="flex justify-between items-center mb-3">
 42 |         <div className="flex items-center gap-2">
 43 |           <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center">
 44 |             <span className="text-xs">🗺️</span>
 45 |           </div>
 46 |           <p className="text-sm font-semibold text-slate-800">Стан по містах</p>
 47 |         </div>
 48 |         <button
 49 |           onClick={() => navigate('/cities')}
 50 |           className="text-xs text-blue-600 hover:underline"
 51 |         >
 52 |           Переглянути всі
 53 |         </button>
 54 |       </div>
 55 | 
 56 |       <div className="overflow-x-auto -mx-4 px-4">
 57 |         <table className="w-full text-left border-collapse min-w-[380px]">
 58 |           <thead>
 59 |             <tr className="border-b border-slate-100">
 60 |               <th className="pb-2 text-xs font-medium text-slate-400 pr-3">Місто</th>
 61 |               <th className="pb-2 text-xs font-medium text-slate-400 text-right pr-3">Шкіл</th>
 62 |               <th className="pb-2 text-xs font-medium text-slate-400 text-right pr-3">Активних подій</th>
 63 |               <th className="pb-2 text-xs font-medium text-slate-400 text-right">Виручка місяця</th>
 64 |             </tr>
 65 |           </thead>
 66 |           <tbody>
 67 |             {rows.map((row) => (
 68 |               <tr
 69 |                 key={row.cityId}
 70 |                 onClick={() => navigate(`/cities/${row.cityId}`)}
 71 |                 className="border-b border-slate-50 cursor-pointer hover:bg-slate-50/60 transition-colors"
 72 |               >
 73 |                 <td className="py-2.5 pr-3">
 74 |                   <span className="text-sm font-medium text-slate-800">
 75 |                     {row.cityName}
 76 |                   </span>
 77 |                 </td>
 78 |                 <td className="py-2.5 pr-3 text-right">
 79 |                   <span className="text-sm text-slate-600">{row.schoolsCount}</span>
 80 |                 </td>
 81 |                 <td className="py-2.5 pr-3 text-right">
 82 |                   {row.activeEvents > 0 ? (
 83 |                     <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
 84 |                       {row.activeEvents}
 85 |                     </span>
 86 |                   ) : (
 87 |                     <span className="text-sm text-slate-300">—</span>
 88 |                   )}
 89 |                 </td>
 90 |                 <td className="py-2.5 text-right">
 91 |                   {row.monthRevenue > 0 ? (
 92 |                     <span className="text-sm font-semibold text-slate-800">
 93 |                       {fmt(row.monthRevenue)} грн
 94 |                     </span>
 95 |                   ) : (
 96 |                     <span className="text-sm text-slate-300">—</span>
 97 |                   )}
 98 |                 </td>
 99 |               </tr>
100 |             ))}
101 |           </tbody>
102 |           {/* Підсумок */}
103 |           <tfoot>
104 |             <tr className="border-t border-slate-200">
105 |               <td className="pt-2.5 text-xs font-semibold text-slate-500">
106 |                 Усього
107 |               </td>
108 |               <td className="pt-2.5 text-right text-xs font-semibold text-slate-600">
109 |                 {totals.schools}
110 |               </td>
111 |               <td className="pt-2.5 text-right text-xs font-semibold text-slate-600">
112 |                 {totals.events}
113 |               </td>
114 |               <td className="pt-2.5 text-right text-xs font-semibold text-blue-700">
115 |                 {fmt(totals.revenue)} грн
116 |               </td>
117 |             </tr>
118 |           </tfoot>
119 |         </table>
120 |       </div>
121 | 
122 |       <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
123 |         {rows.length} {plural(rows.length, 'місто', 'міста', 'міст')} · виручка за поточний місяць
124 |       </p>
125 |     </div>
126 |   );
127 | }
128 | 
```

### File: apps/frontend/src/components/dashboard/FunnelBar.tsx
```tsx
  0 | import { useNavigate } from 'react-router-dom';
  1 | 
  2 | const PIPELINE_STAGES = [
  3 |   { key: 'BASE',           name: 'База',             icon: '🏫', color: 'text-slate-600',   bg: 'bg-slate-100',   bar: 'bg-slate-400'   },
  4 |   { key: 'FIRST_CONTACT',  name: 'Перший контакт',   icon: '📞', color: 'text-blue-700',    bg: 'bg-blue-50',     bar: 'bg-blue-500'    },
  5 |   { key: 'INTERESTED',     name: 'Зацікавлені',      icon: '⭐', color: 'text-amber-700',   bg: 'bg-amber-50',    bar: 'bg-amber-400'   },
  6 |   { key: 'DATE_CONFIRMED', name: 'Підтверджено дату',icon: '📅', color: 'text-purple-700',  bg: 'bg-purple-50',   bar: 'bg-purple-500'  },
  7 |   { key: 'PREPARATION',    name: 'Підготовка',       icon: '⚙️', color: 'text-orange-700',  bg: 'bg-orange-50',   bar: 'bg-orange-400'  },
  8 |   { key: 'DONE',           name: 'Проведено',        icon: '✅', color: 'text-emerald-700', bg: 'bg-emerald-50',  bar: 'bg-emerald-500' },
  9 | ];
 10 | 
 11 | interface Props {
 12 |   funnel: Record<string, number>;
 13 | }
 14 | 
 15 | export default function FunnelBar({ funnel }: Props) {
 16 |   const navigate = useNavigate();
 17 | 
 18 |   const base  = funnel['BASE'] ?? 0;
 19 |   const done  = funnel['DONE'] ?? 0;
 20 |   // Прогрес = скільки шкіл дійшло до DONE відносно бази
 21 |   const progress = base > 0 ? Math.round((done / base) * 100) : 0;
 22 | 
 23 |   // Для mini-bar: максимум серед усіх видимих стадій
 24 |   const counts = PIPELINE_STAGES.map(s => funnel[s.key] ?? 0);
 25 |   const maxCount = Math.max(...counts, 1);
 26 | 
 27 |   return (
 28 |     <div>
 29 |       <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
 30 |         Воронка роботи зі школами
 31 |       </p>
 32 | 
 33 |       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
 34 | 
 35 |         {/* Прогрес по місту */}
 36 |         <div className="mb-4">
 37 |           <div className="flex justify-between items-baseline mb-1.5">
 38 |             <span className="text-xs text-slate-500">Прогрес по місту</span>
 39 |             <span className="text-sm font-bold text-slate-800">{progress}%</span>
 40 |           </div>
 41 |           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
 42 |             <div
 43 |               className="h-full bg-emerald-500 rounded-full transition-all duration-500"
 44 |               style={{ width: `${progress}%` }}
 45 |             />
 46 |           </div>
 47 |           <p className="text-[11px] text-slate-400 mt-1">
 48 |             {done} з {base} шкіл дійшли до проведення події
 49 |           </p>
 50 |         </div>
 51 | 
 52 |         {/* Стадії */}
 53 |         <div className="flex flex-col gap-2">
 54 |           {PIPELINE_STAGES.map((stage) => {
 55 |             const count    = funnel[stage.key] ?? 0;
 56 |             const barWidth = Math.round((count / maxCount) * 100);
 57 | 
 58 |             return (
 59 |               <button
 60 |                 key={stage.key}
 61 |                 onClick={() => navigate('/schools')}
 62 |                 className="flex items-center gap-3 group w-full text-left"
 63 |               >
 64 |                 {/* Іконка */}
 65 |                 <div className={`w-6 h-6 rounded-md ${stage.bg} flex items-center justify-center text-xs shrink-0`}>
 66 |                   {stage.icon}
 67 |                 </div>
 68 | 
 69 |                 {/* Назва */}
 70 |                 <span className="text-xs text-slate-600 w-36 shrink-0 truncate group-hover:text-slate-900 transition-colors">
 71 |                   {stage.name}
 72 |                 </span>
 73 | 
 74 |                 {/* Бар */}
 75 |                 <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
 76 |                   <div
 77 |                     className={`h-full rounded-full transition-all duration-300 ${stage.bar}`}
 78 |                     style={{ width: `${barWidth}%` }}
 79 |                   />
 80 |                 </div>
 81 | 
 82 |                 {/* Кількість */}
 83 |                 <span className={`text-xs font-bold w-6 text-right shrink-0 ${stage.color}`}>
 84 |                   {count}
 85 |                 </span>
 86 |               </button>
 87 |             );
 88 |           })}
 89 |         </div>
 90 | 
 91 |       </div>
 92 |     </div>
 93 |   );
 94 | }
```

### File: apps/frontend/src/components/dashboard/MonthlyKpi.tsx
```tsx
  0 | import { useNavigate } from 'react-router-dom';
  1 | 
  2 | function fmt(n: number): string {
  3 |   return new Intl.NumberFormat('uk-UA').format(Math.round(n));
  4 | }
  5 | 
  6 | interface MonthlyKpi {
  7 |   revenue:  number;
  8 |   profit:   number;
  9 |   children: number;
 10 |   count:    number;
 11 | }
 12 | 
 13 | interface Props {
 14 |   kpi: MonthlyKpi;
 15 | }
 16 | 
 17 | const UA_MONTHS = [
 18 |   'січень','лютий','березень','квітень','травень','червень',
 19 |   'липень','серпень','вересень','жовтень','листопад','грудень',
 20 | ];
 21 | 
 22 | export default function MonthlyKpi({ kpi }: Props) {
 23 |   const navigate = useNavigate();
 24 |   const now = new Date();
 25 |   const monthLabel = UA_MONTHS[now.getMonth()];
 26 |   const yearLabel  = now.getFullYear();
 27 | 
 28 |   const margin = kpi.revenue > 0
 29 |     ? Math.round((kpi.profit / kpi.revenue) * 100)
 30 |     : 0;
 31 | 
 32 |   const tiles = [
 33 |     {
 34 |       label: 'Виручка',
 35 |       value: `${fmt(kpi.revenue)} грн`,
 36 |       sub:   kpi.count > 0 ? `${kpi.count} ${kpi.count === 1 ? 'подія' : kpi.count < 5 ? 'події' : 'подій'}` : 'Подій ще немає',
 37 |       icon:  '💰',
 38 |       color: 'text-blue-700',
 39 |       bg:    'bg-blue-50',
 40 |     },
 41 |     {
 42 |       label: 'Прибуток',
 43 |       value: `${fmt(kpi.profit)} грн`,
 44 |       sub:   `Маржа ${margin}%`,
 45 |       icon:  '📈',
 46 |       color: 'text-emerald-700',
 47 |       bg:    'bg-emerald-50',
 48 |     },
 49 |     {
 50 |       label: 'Дітей охоплено',
 51 |       value: fmt(kpi.children),
 52 |       sub:   kpi.count > 0 && kpi.children > 0
 53 |         ? `~${Math.round(kpi.children / kpi.count)} на подію`
 54 |         : '—',
 55 |       icon:  '👦',
 56 |       color: 'text-purple-700',
 57 |       bg:    'bg-purple-50',
 58 |     },
 59 |   ];
 60 | 
 61 |   return (
 62 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
 63 |       <div className="flex justify-between items-center mb-3">
 64 |         <p className="text-sm font-semibold text-slate-800">
 65 |           Фінанси —{' '}
 66 |           <span className="font-normal text-slate-500 capitalize">
 67 |             {monthLabel} {yearLabel}
 68 |           </span>
 69 |         </p>
 70 |         <button
 71 |           onClick={() => navigate('/finance')}
 72 |           className="text-xs text-blue-600 hover:underline shrink-0"
 73 |         >
 74 |           Детальніше
 75 |         </button>
 76 |       </div>
 77 | 
 78 |       <div className="grid grid-cols-3 gap-3">
 79 |         {tiles.map((tile) => (
 80 |           <div
 81 |             key={tile.label}
 82 |             className={`rounded-xl p-3 ${tile.bg}`}
 83 |           >
 84 |             <div className="flex items-center gap-1.5 mb-2">
 85 |               <span className="text-base">{tile.icon}</span>
 86 |               <span className={`text-xs font-medium ${tile.color}`}>
 87 |                 {tile.label}
 88 |               </span>
 89 |             </div>
 90 |             <p className={`text-lg font-bold leading-none ${tile.color}`}>
 91 |               {tile.value}
 92 |             </p>
 93 |             <p className="text-xs text-slate-400 mt-1">{tile.sub}</p>
 94 |           </div>
 95 |         ))}
 96 |       </div>
 97 |     </div>
 98 |   );
 99 | }
100 | 
```

### File: apps/frontend/src/components/dashboard/StaleSchools.tsx
```tsx
  0 | import { useNavigate } from 'react-router-dom';
  1 | 
  2 | const STAGE_LABELS: Record<string, string> = {
  3 |   BASE:           'База',
  4 |   FIRST_CONTACT:  'Перший контакт',
  5 |   INTERESTED:     'Зацікавлені',
  6 |   PRE_APPROVAL:   'Попереднє погодження',
  7 |   DATE_CONFIRMED: 'Підтвердження дати',
  8 |   PREPARATION:    'Підготовка',
  9 |   IN_PROGRESS:    'Подія в роботі',
 10 | };
 11 | 
 12 | interface Tier {
 13 |   label:    string;
 14 |   emoji:    string;
 15 |   min:      number;
 16 |   max:      number;
 17 |   dot:      string;   // колір крапки
 18 |   badge:    string;   // badge bg+text
 19 |   bar:      string;   // колір прогрес-бару
 20 |   row:      string;   // hover bg рядка
 21 | }
 22 | 
 23 | const TIERS: Tier[] = [
 24 |   {
 25 |     label: 'Критично',   emoji: '🔴',
 26 |     min: 21, max: Infinity,
 27 |     dot:   'bg-red-500',
 28 |     badge: 'bg-red-100 text-red-700 border border-red-200',
 29 |     bar:   'bg-red-500',
 30 |     row:   'hover:bg-red-50/40',
 31 |   },
 32 |   {
 33 |     label: 'Небезпечно', emoji: '🟠',
 34 |     min: 14, max: 20,
 35 |     dot:   'bg-orange-400',
 36 |     badge: 'bg-orange-100 text-orange-700 border border-orange-200',
 37 |     bar:   'bg-orange-400',
 38 |     row:   'hover:bg-orange-50/40',
 39 |   },
 40 |   {
 41 |     label: 'Увага',      emoji: '🟡',
 42 |     min: 7, max: 13,
 43 |     dot:   'bg-amber-400',
 44 |     badge: 'bg-amber-100 text-amber-700 border border-amber-200',
 45 |     bar:   'bg-amber-400',
 46 |     row:   'hover:bg-amber-50/30',
 47 |   },
 48 | ];
 49 | 
 50 | function getTier(days: number): Tier {
 51 |   return TIERS.find(t => days >= t.min && days <= t.max) ?? TIERS[2];
 52 | }
 53 | 
 54 | // Нормалізуємо дні у відсотки для прогрес-бару (макс = 30 днів)
 55 | function barWidth(days: number): number {
 56 |   return Math.min(100, Math.round((days / 30) * 100));
 57 | }
 58 | 
 59 | interface StaleSchool {
 60 |   id:        string;
 61 |   name:      string;
 62 |   status:    string | null;
 63 |   daysStale: number | null;
 64 | }
 65 | 
 66 | interface Props {
 67 |   schools: StaleSchool[];
 68 | }
 69 | 
 70 | export default function StaleSchools({ schools }: Props) {
 71 |   const navigate = useNavigate();
 72 | 
 73 |   // Сортуємо по спаданню днів — найкритичніші зверху
 74 |   const sorted = [...schools].sort((a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0));
 75 | 
 76 |   // Групуємо по тирах для лічильника в хедері
 77 |   const criticalCount = schools.filter(s => (s.daysStale ?? 0) >= 21).length;
 78 | 
 79 |   return (
 80 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
 81 | 
 82 |       {/* Хедер */}
 83 |       <div className="flex justify-between items-center mb-4">
 84 |         <div className="flex items-center gap-2">
 85 |           <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
 86 |             <span className="text-xs">⚠️</span>
 87 |           </div>
 88 |           <p className="text-sm font-semibold text-slate-800">Потребують уваги</p>
 89 |           {criticalCount > 0 && (
 90 |             <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
 91 |               {criticalCount}
 92 |             </span>
 93 |           )}
 94 |         </div>
 95 |         <button
 96 |           onClick={() => navigate('/schools')}
 97 |           className="text-xs text-blue-600 hover:underline shrink-0"
 98 |         >
 99 |           Переглянути всі
100 |         </button>
101 |       </div>
102 | 
103 |       {schools.length === 0 ? (
104 |         <div className="py-6 text-center">
105 |           <p className="text-2xl mb-1">✅</p>
106 |           <p className="text-sm text-slate-400">Усі школи активні</p>
107 |         </div>
108 |       ) : (
109 |         <div className="flex flex-col gap-1">
110 |           {sorted.map((school) => {
111 |             const days      = school.daysStale ?? 0;
112 |             const tier      = getTier(days);
113 |             const stageLabel = school.status ? STAGE_LABELS[school.status] ?? school.status : '—';
114 |             const width     = barWidth(days);
115 | 
116 |             return (
117 |               <div
118 |                 key={school.id}
119 |                 onClick={() => navigate(`/schools/${school.id}`)}
120 |                 className={`group relative flex items-center gap-3 py-2.5 px-2 -mx-1 rounded-xl cursor-pointer transition-colors ${tier.row}`}
121 |               >
122 |                 {/* Кольорова крапка-індикатор */}
123 |                 <div className={`w-2 h-2 rounded-full shrink-0 ${tier.dot}`} />
124 | 
125 |                 {/* Назва + стадія + прогрес-бар */}
126 |                 <div className="min-w-0 flex-1">
127 |                   <p className="text-sm font-medium text-slate-800 truncate leading-tight">
128 |                     {school.name}
129 |                   </p>
130 |                   <p className="text-xs text-slate-400 mt-0.5 mb-1.5">{stageLabel}</p>
131 | 
132 |                   {/* Heat bar */}
133 |                   <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
134 |                     <div
135 |                       className={`h-full rounded-full transition-all ${tier.bar}`}
136 |                       style={{ width: `${width}%` }}
137 |                     />
138 |                   </div>
139 |                 </div>
140 | 
141 |                 {/* Badge з днями */}
142 |                 <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tier.badge}`}>
143 |                   {days} дн
144 |                 </span>
145 |               </div>
146 |             );
147 |           })}
148 |         </div>
149 |       )}
150 | 
151 |       {/* Футер — легенда тирів */}
152 |       {schools.length > 0 && (
153 |         <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-50">
154 |           {TIERS.map(t => {
155 |             const count = schools.filter(s => (s.daysStale ?? 0) >= t.min && (s.daysStale ?? 0) <= t.max).length;
156 |             if (count === 0) return null;
157 |             return (
158 |               <span key={t.label} className="flex items-center gap-1 text-xs text-slate-400">
159 |                 {t.emoji} <span className="font-medium text-slate-600">{count}</span> {t.label.toLowerCase()}
160 |               </span>
161 |             );
162 |           })}
163 |         </div>
164 |       )}
165 | 
166 |     </div>
167 |   );
168 | }
```

### File: apps/frontend/src/components/dashboard/TodayEvents.tsx
```tsx
  0 | import { useNavigate } from "react-router-dom";
  1 | 
  2 | interface CrewMember {
  3 |   id: string;
  4 |   name: string;
  5 | }
  6 | 
  7 | interface Crew {
  8 |   id: string;
  9 |   name?: string;
 10 |   host?: CrewMember | null;
 11 |   driver?: CrewMember | null;
 12 | }
 13 | 
 14 | interface School {
 15 |   id: string;
 16 |   name: string;
 17 | }
 18 | 
 19 | interface TodayEvent {
 20 |   id: string;
 21 |   time?: string | null;
 22 |   project: string;
 23 |   school?: School | null;
 24 |   crew?: Crew | null;
 25 | }
 26 | 
 27 | interface Props {
 28 |   events: TodayEvent[];
 29 | }
 30 | 
 31 | function plural(n: number): string {
 32 |   if (n % 10 === 1 && n % 100 !== 11) return "подія";
 33 |   if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
 34 |     return "події";
 35 |   return "подій";
 36 | }
 37 | 
 38 | export default function TodayEvents({ events }: Props) {
 39 |   const navigate = useNavigate();
 40 | 
 41 |   const dateLabel = new Date().toLocaleDateString("uk-UA", {
 42 |     day: "numeric",
 43 |     month: "long",
 44 |     weekday: "long",
 45 |   });
 46 | 
 47 |   return (
 48 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
 49 |       {/* Хедер */}
 50 |       <div className="flex justify-between items-start mb-3">
 51 |         <div>
 52 |           <p className="text-sm font-semibold text-slate-800">
 53 |             Сьогоднішні події
 54 |           </p>
 55 |           <p className="text-xs text-slate-400 mt-0.5 capitalize">
 56 |             {dateLabel}
 57 |           </p>
 58 |         </div>
 59 |         <button
 60 |           onClick={() => navigate("/calendar")}
 61 |           className="text-xs text-blue-600 hover:underline shrink-0"
 62 |         >
 63 |           Календар
 64 |         </button>
 65 |       </div>
 66 | 
 67 |       {events.length === 0 ? (
 68 |         <div className="py-6 text-center text-slate-400 text-sm">
 69 |           Сьогодні подій немає
 70 |         </div>
 71 |       ) : (
 72 |         <div className="flex flex-col gap-2">
 73 |           {events.map((ev) => {
 74 |             const hasCrew = !!ev.crew;
 75 |             const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;
 76 | 
 77 |             return (
 78 |               <div
 79 |                 key={ev.id}
 80 |                 className={`rounded-xl border p-3 flex flex-col gap-2.5 ${
 81 |                   hasCrew
 82 |                     ? "border-slate-100 bg-white"
 83 |                     : "border-amber-200 bg-amber-50/40"
 84 |                 }`}
 85 |               >
 86 |                 {/* Час + проєкт в один рядок */}
 87 |                 <div className="flex items-center gap-2">
 88 |                   <span className="text-lg font-bold text-slate-800 tabular-nums shrink-0">
 89 |                     {ev.time ?? "—:——"}
 90 |                   </span>
 91 |                   <span className="text-xs text-slate-400 truncate">
 92 |                     {ev.project}
 93 |                   </span>
 94 |                 </div>
 95 | 
 96 |                 {/* Назва школи — дозволяємо переноситись, не обрізаємо */}
 97 |                 <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
 98 |                   {ev.school?.name ?? "—"}
 99 |                 </p>
100 | 
101 |                 {/* Статус екіпажу + кнопка в один рядок */}
102 |                 <div className="flex items-center justify-between gap-2">
103 |                   {hasCrew ? (
104 |                     <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium shrink-0">
105 |                       ✅ {crewLabel ?? "Екіпаж призначено"}
106 |                     </span>
107 |                   ) : (
108 |                     <span className="text-[11px] text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full font-medium shrink-0">
109 |                       ⚠️ Немає екіпажу
110 |                     </span>
111 |                   )}
112 | 
113 |                   <button
114 |                     onClick={() =>
115 |                       ev.school && navigate(`/schools/${ev.school.id}`)
116 |                     }
117 |                     className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
118 |                       hasCrew
119 |                         ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
120 |                         : "bg-white border border-amber-400 text-amber-700 hover:bg-amber-50"
121 |                     }`}
122 |                   >
123 |                     {hasCrew ? "Відкрити →" : "Призначити →"}
124 |                   </button>
125 |                 </div>
126 |               </div>
127 |             );
128 |           })}
129 |         </div>
130 |       )}
131 | 
132 |       <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
133 |         Усього на сьогодні: {events.length} {plural(events.length)}
134 |       </p>
135 |     </div>
136 |   );
137 | }
138 | 
```

### File: apps/frontend/src/components/dashboard/UpcomingEvents.tsx
```tsx
  0 | import { useNavigate } from 'react-router-dom';
  1 | 
  2 | const UA_WEEKDAYS = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  3 | const UA_MONTHS_SHORT = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];
  4 | 
  5 | function formatDate(dateStr: string) {
  6 |   const d = new Date(dateStr);
  7 |   const day = d.getDate();
  8 |   const month = UA_MONTHS_SHORT[d.getMonth()];
  9 |   const weekday = UA_WEEKDAYS[d.getDay()];
 10 |   return `${day} ${month}, ${weekday}`;
 11 | }
 12 | 
 13 | interface Crew {
 14 |   id: string;
 15 |   name?: string;
 16 |   host?: { id: string; name: string } | null;
 17 | }
 18 | 
 19 | interface UpcomingEvent {
 20 |   id: string;
 21 |   date: string;
 22 |   time?: string | null;
 23 |   project: string;
 24 |   school?: { id: string; name: string } | null;
 25 |   city?: { id: string; name: string } | null;
 26 |   crew?: Crew | null;
 27 | }
 28 | 
 29 | interface Props {
 30 |   events: UpcomingEvent[];
 31 | }
 32 | 
 33 | export default function UpcomingEvents({ events }: Props) {
 34 |   const navigate = useNavigate();
 35 | 
 36 |   return (
 37 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
 38 |       <div className="flex justify-between items-center mb-3">
 39 |         <p className="text-sm font-semibold text-slate-800">Найближчі події (5 днів)</p>
 40 |         <button
 41 |           onClick={() => navigate('/calendar')}
 42 |           className="text-xs text-blue-600 hover:underline shrink-0"
 43 |         >
 44 |           Перейти до календаря
 45 |         </button>
 46 |       </div>
 47 | 
 48 |       {events.length === 0 ? (
 49 |         <div className="py-6 text-center text-slate-400 text-sm">
 50 |           Найближчими днями подій немає
 51 |         </div>
 52 |       ) : (
 53 |         <div className="flex flex-col divide-y divide-slate-50">
 54 |           {events.map((ev) => {
 55 |             const crewName = ev.crew?.name ?? (ev.crew?.host?.name ?? null);
 56 | 
 57 |             return (
 58 |               <div
 59 |                 key={ev.id}
 60 |                 onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
 61 |                 className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-slate-50/60 rounded-lg px-1 -mx-1 transition-colors"
 62 |               >
 63 |                 <div className="shrink-0 text-right w-24">
 64 |                   <p className="text-xs font-medium text-slate-600">
 65 |                     {formatDate(ev.date)}
 66 |                   </p>
 67 |                   <p className="text-xs text-slate-400">{ev.time ?? '—:——'}</p>
 68 |                 </div>
 69 | 
 70 |                 <div className="min-w-0 flex-1">
 71 |                   <p className="text-sm font-medium text-slate-800 truncate">
 72 |                     {ev.school?.name ?? '—'}
 73 |                   </p>
 74 |                   <p className="text-xs text-slate-400 truncate">{ev.project}</p>
 75 |                 </div>
 76 | 
 77 |                 {crewName && (
 78 |                   <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
 79 |                     {crewName}
 80 |                   </span>
 81 |                 )}
 82 |               </div>
 83 |             );
 84 |           })}
 85 |         </div>
 86 |       )}
 87 |     </div>
 88 |   );
 89 | }
 90 | 
```

### File: apps/frontend/src/components/finance/FinanceCharts.tsx
```tsx
  0 | import {
  1 |   ResponsiveContainer,
  2 |   AreaChart,
  3 |   Area,
  4 |   XAxis,
  5 |   YAxis,
  6 |   CartesianGrid,
  7 |   Tooltip,
  8 |   PieChart,
  9 |   Pie,
 10 |   Cell,
 11 |   BarChart,
 12 |   Bar,
 13 | } from "recharts";
 14 | 
 15 | const PALETTE = [
 16 |   "#3b82f6",
 17 |   "#10b981",
 18 |   "#f59e0b",
 19 |   "#8b5cf6",
 20 |   "#ec4899",
 21 |   "#06b6d4",
 22 | ];
 23 | const PIE_COLORS = [
 24 |   "#3b82f6",
 25 |   "#8b5cf6",
 26 |   "#ec4899",
 27 |   "#f43f5e",
 28 |   "#f59e0b",
 29 |   "#10b981",
 30 |   "#0ea5e9",
 31 | ];
 32 | 
 33 | const fmt = (n: number) =>
 34 |   new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
 35 | 
 36 | // ─── Допоміжні компоненти ───────────────────────────────────────────────────
 37 | 
 38 | function KpiCard({ title, value, color, bg, icon, subtitle }: any) {
 39 |   return (
 40 |     <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
 41 |       <div className="flex justify-between items-start mb-4">
 42 |         <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight pr-2">
 43 |           {title}
 44 |         </p>
 45 |         <div
 46 |           className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-sm ${bg}`}
 47 |         >
 48 |           {icon}
 49 |         </div>
 50 |       </div>
 51 |       <div>
 52 |         <p
 53 |           className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${color}`}
 54 |         >
 55 |           {fmt(value)}{" "}
 56 |           <span className="text-sm font-bold text-slate-400 opacity-60">
 57 |             грн
 58 |           </span>
 59 |         </p>
 60 |         {subtitle && (
 61 |           <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 font-medium">
 62 |             {subtitle}
 63 |           </p>
 64 |         )}
 65 |       </div>
 66 |     </div>
 67 |   );
 68 | }
 69 | 
 70 | function EventTable({
 71 |   events,
 72 |   positive,
 73 | }: {
 74 |   events: any[];
 75 |   positive: boolean;
 76 | }) {
 77 |   if (!events || !events.length) return <EmptyState />;
 78 |   return (
 79 |     <table className="w-full text-sm min-w-[300px]">
 80 |       <thead>
 81 |         <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
 82 |           <th className="text-left pb-3 font-semibold tracking-wider">Дата</th>
 83 |           <th className="text-left pb-3 font-semibold tracking-wider">
 84 |             Заклад
 85 |           </th>
 86 |           <th className="text-right pb-3 font-semibold tracking-wider">
 87 |             Прибуток
 88 |           </th>
 89 |         </tr>
 90 |       </thead>
 91 |       <tbody>
 92 |         {events.map((e: any, i: number) => (
 93 |           <tr
 94 |             key={i}
 95 |             className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
 96 |           >
 97 |             <td className="py-3 text-slate-500 whitespace-nowrap">
 98 |               {new Date(e.date).toLocaleDateString("uk-UA", {
 99 |                 day: "2-digit",
100 |                 month: "2-digit",
101 |               })}
102 |             </td>
103 |             <td className="py-3 font-medium text-slate-700 truncate max-w-[120px] sm:max-w-[200px] pr-2">
104 |               {e.school}
105 |             </td>
106 |             <td
107 |               className={`py-3 text-right font-bold whitespace-nowrap ${positive ? "text-emerald-600" : "text-rose-500"}`}
108 |             >
109 |               {new Intl.NumberFormat("uk-UA").format(Math.round(e.profit))} грн
110 |             </td>
111 |           </tr>
112 |         ))}
113 |       </tbody>
114 |     </table>
115 |   );
116 | }
117 | 
118 | function EmptyState() {
119 |   return (
120 |     <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-slate-400">
121 |       <span className="text-3xl mb-3 opacity-50">📂</span>
122 |       <span className="text-sm font-medium">Немає даних за цей період</span>
123 |     </div>
124 |   );
125 | }
126 | 
127 | function CustomTooltip({ active, payload, label }: any) {
128 |   if (active && payload && payload.length) {
129 |     return (
130 |       <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
131 |         <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
132 |           {label}
133 |         </p>
134 |         {payload.map((entry: any, index: number) => (
135 |           <div
136 |             key={index}
137 |             className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
138 |           >
139 |             <div className="flex items-center gap-2">
140 |               <div
141 |                 className="w-2.5 h-2.5 rounded-full shadow-sm"
142 |                 style={{ backgroundColor: entry.color }}
143 |               />
144 |               <span className="text-slate-500">{entry.name}:</span>
145 |             </div>
146 |             <span className="font-bold text-slate-800">
147 |               {fmt(entry.value)} грн
148 |             </span>
149 |           </div>
150 |         ))}
151 |       </div>
152 |     );
153 |   }
154 |   return null;
155 | }
156 | 
157 | // ─── Пропси FinanceCharts ────────────────────────────────────────────────────
158 | 
159 | interface Props {
160 |   data: any;
161 |   period: string;
162 |   setPeriod: (v: string) => void;
163 |   projectFilter: string;
164 |   setProjectFilter: (v: string) => void;
165 |   selectedCity: any;
166 | }
167 | 
168 | // ─── Головний компонент ──────────────────────────────────────────────────────
169 | 
170 | export default function FinanceCharts({
171 |   data,
172 |   period,
173 |   setPeriod,
174 |   projectFilter,
175 |   setProjectFilter,
176 |   selectedCity,
177 | }: Props) {
178 |   const {
179 |     kpi,
180 |     monthly,
181 |     byProject,
182 |     byExpenseCategory,
183 |     topSchools,
184 |     topEvents,
185 |     worstEvents,
186 |     expectedRevenue,
187 |     filters,
188 |   } = data;
189 | 
190 |   return (
191 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans overflow-x-hidden">
192 |       {/* Шапка та фільтри */}
193 |       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
194 |         <div>
195 |           <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
196 |             Фінанси
197 |           </h1>
198 |           <p className="text-slate-500 text-sm mt-1">
199 |             Аналітика доходів та витрат{" "}
200 |             {selectedCity.id ? (
201 |               <span className="font-medium text-blue-600">
202 |                 {selectedCity.name}
203 |               </span>
204 |             ) : (
205 |               "по всіх містах"
206 |             )}
207 |           </p>
208 |         </div>
209 |         <div className="flex flex-wrap items-center gap-3">
210 |           <select
211 |             value={period}
212 |             onChange={(e) => setPeriod(e.target.value)}
213 |             className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
214 |           >
215 |             <option value="all">За весь час</option>
216 |             <option value="year">Цей рік</option>
217 |             <option value="quarter">Цей квартал</option>
218 |             <option value="month">Цей місяць</option>
219 |           </select>
220 | 
221 |           <select
222 |             value={projectFilter}
223 |             onChange={(e) => setProjectFilter(e.target.value)}
224 |             className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
225 |           >
226 |             <option value="">Всі проєкти</option>
227 |             {filters?.projects?.map((p: string) => (
228 |               <option key={p} value={p}>
229 |                 {p}
230 |               </option>
231 |             ))}
232 |           </select>
233 |         </div>
234 |       </div>
235 | 
236 |       {/* KPI Картки */}
237 |       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
238 |         <KpiCard
239 |           title="Загальна виручка"
240 |           value={kpi.totalRevenue}
241 |           color="text-blue-600"
242 |           bg="bg-blue-50"
243 |           icon="💰"
244 |         />
245 |         <KpiCard
246 |           title="Чистий прибуток"
247 |           value={kpi.totalProfit}
248 |           color="text-emerald-600"
249 |           bg="bg-emerald-50"
250 |           icon="📈"
251 |         />
252 |         <KpiCard
253 |           title="Витрати"
254 |           value={kpi.totalExpenses}
255 |           color="text-rose-600"
256 |           bg="bg-rose-50"
257 |           icon="📉"
258 |         />
259 |         <KpiCard
260 |           title="Очікувана виручка"
261 |           value={expectedRevenue}
262 |           color="text-amber-500"
263 |           bg="bg-amber-50"
264 |           icon="⏳"
265 |           subtitle="Із запланованих подій"
266 |         />
267 |       </div>
268 | 
269 |       {/* Верхній ряд графіків */}
270 |       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
271 |         {/* Головний графік: Динаміка */}
272 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 xl:col-span-2">
273 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
274 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
275 |               📊
276 |             </span>
277 |             Динаміка виручки та прибутку
278 |           </h3>
279 |           <div className="h-[280px] md:h-[320px] w-full -ml-4 sm:ml-0">
280 |             {monthly?.length > 0 ? (
281 |               <ResponsiveContainer width="100%" height="100%">
282 |                 <AreaChart
283 |                   data={monthly}
284 |                   margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
285 |                 >
286 |                   <defs>
287 |                     <linearGradient
288 |                       id="colorRevenue"
289 |                       x1="0"
290 |                       y1="0"
291 |                       x2="0"
292 |                       y2="1"
293 |                     >
294 |                       <stop
295 |                         offset="5%"
296 |                         stopColor="#3b82f6"
297 |                         stopOpacity={0.25}
298 |                       />
299 |                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
300 |                     </linearGradient>
301 |                     <linearGradient
302 |                       id="colorProfit"
303 |                       x1="0"
304 |                       y1="0"
305 |                       x2="0"
306 |                       y2="1"
307 |                     >
308 |                       <stop
309 |                         offset="5%"
310 |                         stopColor="#10b981"
311 |                         stopOpacity={0.25}
312 |                       />
313 |                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
314 |                     </linearGradient>
315 |                   </defs>
316 |                   <CartesianGrid
317 |                     strokeDasharray="3 3"
318 |                     vertical={false}
319 |                     stroke="#f1f5f9"
320 |                   />
321 |                   <XAxis
322 |                     dataKey="month"
323 |                     tick={{ fontSize: 12, fill: "#64748b" }}
324 |                     axisLine={false}
325 |                     tickLine={false}
326 |                     dy={10}
327 |                     minTickGap={20}
328 |                   />
329 |                   <YAxis
330 |                     tickFormatter={(v) =>
331 |                       v >= 1000 ? `${Math.round(v / 1000)}k` : v
332 |                     }
333 |                     tick={{ fontSize: 12, fill: "#64748b" }}
334 |                     axisLine={false}
335 |                     tickLine={false}
336 |                   />
337 |                   <Tooltip
338 |                     content={<CustomTooltip />}
339 |                     cursor={{
340 |                       stroke: "#cbd5e1",
341 |                       strokeWidth: 1,
342 |                       strokeDasharray: "4 4",
343 |                     }}
344 |                   />
345 |                   <Area
346 |                     type="monotone"
347 |                     name="Виручка"
348 |                     dataKey="revenue"
349 |                     stroke="#3b82f6"
350 |                     strokeWidth={3}
351 |                     fill="url(#colorRevenue)"
352 |                     activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
353 |                   />
354 |                   <Area
355 |                     type="monotone"
356 |                     name="Прибуток"
357 |                     dataKey="profit"
358 |                     stroke="#10b981"
359 |                     strokeWidth={3}
360 |                     fill="url(#colorProfit)"
361 |                     activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
362 |                   />
363 |                 </AreaChart>
364 |               </ResponsiveContainer>
365 |             ) : (
366 |               <EmptyState />
367 |             )}
368 |           </div>
369 |         </div>
370 | 
371 |         {/* Кругова діаграма: Проєкти */}
372 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 flex flex-col">
373 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
374 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
375 |               🎯
376 |             </span>
377 |             Доходи за проєктами
378 |           </h3>
379 |           <div className="h-[200px] md:h-[220px] w-full relative mb-6 shrink-0">
380 |             {byProject?.length > 0 ? (
381 |               <ResponsiveContainer width="100%" height="100%">
382 |                 <PieChart>
383 |                   <Pie
384 |                     data={byProject}
385 |                     dataKey="value"
386 |                     nameKey="name"
387 |                     innerRadius={60}
388 |                     outerRadius={85}
389 |                     paddingAngle={3}
390 |                     stroke="none"
391 |                   >
392 |                     {byProject.map((_: any, index: number) => (
393 |                       <Cell
394 |                         key={`cell-${index}`}
395 |                         fill={PIE_COLORS[index % PIE_COLORS.length]}
396 |                       />
397 |                     ))}
398 |                   </Pie>
399 |                   <Tooltip content={<CustomTooltip />} />
400 |                 </PieChart>
401 |               </ResponsiveContainer>
402 |             ) : (
403 |               <EmptyState />
404 |             )}
405 |           </div>
406 |           <div className="flex-1 overflow-y-auto space-y-3 pr-2">
407 |             {byProject?.map((item: any, idx: number) => {
408 |               const total = byProject.reduce(
409 |                 (sum: number, p: any) => sum + p.value,
410 |                 0,
411 |               );
412 |               const percent =
413 |                 total > 0 ? Math.round((item.value / total) * 100) : 0;
414 |               return (
415 |                 <div
416 |                   key={idx}
417 |                   className="flex items-center justify-between text-sm"
418 |                 >
419 |                   <div className="flex items-center gap-3 min-w-0 pr-2">
420 |                     <div
421 |                       className="w-3 h-3 rounded-full shrink-0"
422 |                       style={{
423 |                         backgroundColor: PIE_COLORS[idx % PIE_COLORS.length],
424 |                       }}
425 |                     />
426 |                     <span className="text-slate-600 truncate font-medium">
427 |                       {item.name}
428 |                     </span>
429 |                   </div>
430 |                   <div className="flex items-center gap-3 shrink-0">
431 |                     <span className="text-xs text-slate-400 font-medium w-8 text-right">
432 |                       {percent}%
433 |                     </span>
434 |                     <span className="font-bold text-slate-800 w-20 text-right">
435 |                       {fmt(item.value)}
436 |                     </span>
437 |                   </div>
438 |                 </div>
439 |               );
440 |             })}
441 |           </div>
442 |         </div>
443 |       </div>
444 | 
445 |       {/* Нижній ряд */}
446 |       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
447 |         {/* Горизонтальний графік: Витрати */}
448 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
449 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
450 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
451 |               💳
452 |             </span>
453 |             Статті витрат
454 |           </h3>
455 |           {byExpenseCategory?.length > 0 ? (
456 |             <div className="h-[280px] w-full min-w-[300px] -ml-4">
457 |               <ResponsiveContainer width="100%" height="100%">
458 |                 <BarChart
459 |                   data={byExpenseCategory}
460 |                   layout="vertical"
461 |                   margin={{ top: 0, right: 20, left: 30, bottom: 0 }}
462 |                 >
463 |                   <CartesianGrid
464 |                     strokeDasharray="3 3"
465 |                     horizontal={true}
466 |                     vertical={false}
467 |                     stroke="#f1f5f9"
468 |                   />
469 |                   <XAxis type="number" hide />
470 |                   <YAxis
471 |                     dataKey="name"
472 |                     type="category"
473 |                     axisLine={false}
474 |                     tickLine={false}
475 |                     tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
476 |                     width={120}
477 |                   />
478 |                   <Tooltip
479 |                     content={<CustomTooltip />}
480 |                     cursor={{ fill: "#f8fafc" }}
481 |                   />
482 |                   <Bar
483 |                     dataKey="value"
484 |                     name="Сума"
485 |                     fill="#f43f5e"
486 |                     radius={[0, 8, 8, 0]}
487 |                     barSize={20}
488 |                   >
489 |                     {byExpenseCategory.map((_: any, idx: number) => (
490 |                       <Cell
491 |                         key={`cell-${idx}`}
492 |                         fill={PALETTE[idx % PALETTE.length]}
493 |                       />
494 |                     ))}
495 |                   </Bar>
496 |                 </BarChart>
497 |               </ResponsiveContainer>
498 |             </div>
499 |           ) : (
500 |             <EmptyState />
501 |           )}
502 |         </div>
503 | 
504 |         {/* Прогрес-бари: Топ шкіл */}
505 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7">
506 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
507 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
508 |               🏫
509 |             </span>
510 |             Топ-5 найприбутковіших закладів
511 |           </h3>
512 |           {topSchools?.length > 0 ? (
513 |             <div className="space-y-5">
514 |               {topSchools.map((school: any, idx: number) => {
515 |                 const maxRev = topSchools[0].revenue;
516 |                 const percent = Math.max((school.revenue / maxRev) * 100, 2);
517 |                 return (
518 |                   <div key={idx} className="relative">
519 |                     <div className="flex justify-between items-end mb-2 text-sm">
520 |                       <div className="flex items-center gap-2 min-w-0 pr-4">
521 |                         <span className="font-bold text-slate-400 w-4">
522 |                           {idx + 1}.
523 |                         </span>
524 |                         <span className="font-bold text-slate-700 truncate">
525 |                           {school.name}
526 |                         </span>
527 |                       </div>
528 |                       <span className="font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
529 |                         {fmt(school.revenue)} грн
530 |                       </span>
531 |                     </div>
532 |                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
533 |                       <div
534 |                         className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
535 |                         style={{ width: `${percent}%` }}
536 |                       />
537 |                     </div>
538 |                   </div>
539 |                 );
540 |               })}
541 |             </div>
542 |           ) : (
543 |             <EmptyState />
544 |           )}
545 |         </div>
546 |       </div>
547 | 
548 |       {/* Найкращі і найгірші події */}
549 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
550 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
551 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
552 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
553 |               🏆
554 |             </span>
555 |             Найприбутковіші події
556 |           </h3>
557 |           <EventTable events={topEvents} positive={true} />
558 |         </div>
559 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
560 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
561 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
562 |               ⚠️
563 |             </span>
564 |             Найменш прибуткові події
565 |           </h3>
566 |           <EventTable events={worstEvents} positive={false} />
567 |         </div>
568 |       </div>
569 |     </div>
570 |   );
571 | }
572 | 
```

### File: apps/frontend/src/components/finance/StaffFinanceView.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { api } from "../../config/api";
  2 | 
  3 | const fmt = (n: number) =>
  4 |   new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
  5 | 
  6 | const PERIOD_LABELS: Record<string, string> = {
  7 |   year: "Цей рік",
  8 |   quarter: "Цей квартал",
  9 |   month: "Цей місяць",
 10 |   all: "За весь час",
 11 | };
 12 | 
 13 | interface Props {
 14 |   myBalance: number | null;
 15 |   selectedCity: any;
 16 | }
 17 | 
 18 | export default function StaffFinanceView({ myBalance, selectedCity }: Props) {
 19 |   const [tab, setTab] = useState<"balance" | "revenue">("balance");
 20 |   const [period, setPeriod] = useState("year");
 21 |   const [staffData, setStaffData] = useState<any>(null);
 22 |   const [loadingStaff, setLoadingStaff] = useState(false);
 23 | 
 24 |   useEffect(() => {
 25 |     if (tab !== "revenue") return;
 26 |     setLoadingStaff(true);
 27 |     const params = new URLSearchParams();
 28 |     if (period) params.set("period", period);
 29 |     if (selectedCity?.id) params.set("cityId", selectedCity.id);
 30 |     api
 31 |       .get(`/finance/staff-revenue?${params}`)
 32 |       .then((r) => setStaffData(r.data))
 33 |       .catch(() => {})
 34 |       .finally(() => setLoadingStaff(false));
 35 |   }, [tab, period, selectedCity?.id]);
 36 | 
 37 |   const maxRevenue = staffData?.staff?.[0]?.revenue ?? 1;
 38 | 
 39 |   return (
 40 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
 41 |       <h1 className="text-2xl font-bold text-slate-800 mb-6">Фінанси</h1>
 42 | 
 43 |       {/* Вкладки */}
 44 |       <div className="flex gap-2 mb-6">
 45 |         <button
 46 |           onClick={() => setTab("balance")}
 47 |           className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
 48 |             tab === "balance"
 49 |               ? "bg-blue-600 text-white shadow-sm"
 50 |               : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
 51 |           }`}
 52 |         >
 53 |           💰 Мій баланс
 54 |         </button>
 55 |         <button
 56 |           onClick={() => setTab("revenue")}
 57 |           className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
 58 |             tab === "revenue"
 59 |               ? "bg-blue-600 text-white shadow-sm"
 60 |               : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
 61 |           }`}
 62 |         >
 63 |           📊 Виручка команди
 64 |         </button>
 65 |       </div>
 66 | 
 67 |       {/* Вкладка: баланс */}
 68 |       {tab === "balance" && (
 69 |         <div className="flex items-center justify-center py-10">
 70 |           <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-10 text-center max-w-sm w-full">
 71 |             <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-4">
 72 |               💰
 73 |             </div>
 74 |             <p className="text-sm text-slate-400 mb-2">Ваш баланс</p>
 75 |             <p className="text-4xl font-black text-blue-600 tracking-tight">
 76 |               {myBalance !== null ? fmt(myBalance) : "—"}
 77 |               <span className="text-lg font-bold text-slate-400 ml-1">грн</span>
 78 |             </p>
 79 |             <p className="text-xs text-slate-400 mt-4">
 80 |               Сума нарахованих зарплат за всі події
 81 |             </p>
 82 |           </div>
 83 |         </div>
 84 |       )}
 85 | 
 86 |       {/* Вкладка: виручка команди */}
 87 |       {tab === "revenue" && (
 88 |         <div className="flex flex-col gap-5">
 89 |           <div className="flex items-center gap-3">
 90 |             <select
 91 |               value={period}
 92 |               onChange={(e) => setPeriod(e.target.value)}
 93 |               className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none shadow-sm"
 94 |             >
 95 |               <option value="year">Цей рік</option>
 96 |               <option value="quarter">Цей квартал</option>
 97 |               <option value="month">Цей місяць</option>
 98 |               <option value="all">За весь час</option>
 99 |             </select>
100 |             {selectedCity?.name && (
101 |               <span className="text-sm text-slate-500">
102 |                 📍 {selectedCity.name}
103 |               </span>
104 |             )}
105 |           </div>
106 | 
107 |           {loadingStaff ? (
108 |             <div className="flex items-center justify-center py-16">
109 |               <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
110 |             </div>
111 |           ) : !staffData || staffData.staff.length === 0 ? (
112 |             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
113 |               <p className="text-3xl mb-3">📊</p>
114 |               <p>Немає даних за обраний період</p>
115 |             </div>
116 |           ) : (
117 |             <>
118 |               <div className="grid grid-cols-2 gap-4">
119 |                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
120 |                   <p className="text-xs text-slate-400 mb-1">
121 |                     Загальна виручка
122 |                   </p>
123 |                   <p className="text-2xl font-black text-blue-600">
124 |                     {fmt(staffData.totalRevenue)}{" "}
125 |                     <span className="text-sm font-medium text-slate-400">
126 |                       грн
127 |                     </span>
128 |                   </p>
129 |                   <p className="text-xs text-slate-400 mt-1">
130 |                     {PERIOD_LABELS[period]}
131 |                   </p>
132 |                 </div>
133 |                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
134 |                   <p className="text-xs text-slate-400 mb-1">Подій проведено</p>
135 |                   <p className="text-2xl font-black text-slate-800">
136 |                     {staffData.eventsCount}
137 |                   </p>
138 |                   <p className="text-xs text-slate-400 mt-1">
139 |                     {PERIOD_LABELS[period]}
140 |                   </p>
141 |                 </div>
142 |               </div>
143 | 
144 |               {["HOST", "DRIVER"].map((roleKey) => {
145 |                 const roleLabel = roleKey === "HOST" ? "🎙️ Ведучі" : "🚗 Водії";
146 |                 const members = staffData.staff.filter(
147 |                   (s: any) => s.role === roleKey,
148 |                 );
149 |                 if (members.length === 0) return null;
150 |                 return (
151 |                   <div
152 |                     key={roleKey}
153 |                     className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
154 |                   >
155 |                     <h3 className="font-bold text-slate-800 mb-4">
156 |                       {roleLabel}
157 |                     </h3>
158 |                     <div className="flex flex-col gap-4">
159 |                       {members.map((member: any, i: number) => {
160 |                         const pct = Math.round(
161 |                           (member.revenue / maxRevenue) * 100,
162 |                         );
163 |                         const isTop = i === 0;
164 |                         return (
165 |                           <div key={member.id}>
166 |                             <div className="flex items-center justify-between mb-1.5">
167 |                               <div className="flex items-center gap-2">
168 |                                 <span
169 |                                   className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isTop ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}
170 |                                 >
171 |                                   {i + 1}
172 |                                 </span>
173 |                                 <span className="text-sm font-semibold text-slate-800">
174 |                                   {member.name}
175 |                                 </span>
176 |                                 {isTop && (
177 |                                   <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
178 |                                     🏆 Топ
179 |                                   </span>
180 |                                 )}
181 |                               </div>
182 |                               <div className="text-right">
183 |                                 <p className="text-sm font-bold text-slate-800">
184 |                                   {fmt(member.revenue)} грн
185 |                                 </p>
186 |                                 <p className="text-xs text-slate-400">
187 |                                   {member.eventsCount} подій
188 |                                 </p>
189 |                               </div>
190 |                             </div>
191 |                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
192 |                               <div
193 |                                 className={`h-full rounded-full transition-all duration-500 ${isTop ? "bg-amber-400" : "bg-blue-400"}`}
194 |                                 style={{ width: `${pct}%` }}
195 |                               />
196 |                             </div>
197 |                           </div>
198 |                         );
199 |                       })}
200 |                     </div>
201 |                   </div>
202 |                 );
203 |               })}
204 |             </>
205 |           )}
206 |         </div>
207 |       )}
208 |     </div>
209 |   );
210 | }
211 | 
```

### File: apps/frontend/src/components/school-profile/AssignedCrew.tsx
```tsx
  0 | import React from 'react';
  1 | import PhoneLink from '../PhoneLink';
  2 | 
  3 | interface AssignedCrewProps {
  4 |   currentEvent: any;
  5 |   employees: any[];
  6 | }
  7 | 
  8 | export default function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
  9 |   const crew = currentEvent?.crew;
 10 | 
 11 |   if (!crew) {
 12 |     return (
 13 |       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full text-slate-400 min-h-[250px]">
 14 |         <span className="text-4xl mb-3 opacity-50">🚐</span>
 15 |         <p className="font-medium">Екіпаж ще не призначено</p>
 16 |         <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
 17 |       </div>
 18 |     );
 19 |   }
 20 | 
 21 |   // Знаходимо працівників по їхніх ID, збережених у екіпажі
 22 |   const host = (employees ?? []).find(e => e.id === crew.hostId);
 23 |   const driver = (employees ?? []).find(e => e.id === crew.driverId);
 24 | 
 25 |   return (
 26 |     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
 27 |       <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Призначений екіпаж</h3>
 28 |       <div className="space-y-4 text-sm flex-1">
 29 |         <div className="flex justify-between items-center">
 30 |           <span className="text-slate-500">Назва:</span>
 31 |           <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{crew.name || 'Екіпаж'}</span>
 32 |         </div>
 33 |         <div className="flex justify-between items-center">
 34 |           <span className="text-slate-500">Ведучий:</span>
 35 |           <span className="font-medium text-blue-600 flex items-center gap-2">
 36 |             <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🎙️</span>
 37 |             {host?.name || '—'} 
 38 |           </span>
 39 |         </div>
 40 |         <div className="flex justify-between items-center">
 41 |           <span className="text-slate-500">Водій:</span>
 42 |           <span className="font-medium text-emerald-600 flex items-center gap-2">
 43 |             <span className="bg-emerald-100 text-emerald-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🚗</span>
 44 |             {driver?.name || '—'}
 45 |           </span>
 46 |         </div>
 47 |         <div className="flex justify-between items-center">
 48 |           <span className="text-slate-500">Авто:</span>
 49 |           <span className="font-medium">{crew.car || '—'}</span>
 50 |         </div>
 51 |         <div className="flex justify-between items-center">
 52 |           <span className="text-slate-500">Телефон:</span>
 53 |           <span className="font-medium"><PhoneLink phone={crew.phone} /></span>
 54 |         </div>
 55 |       </div>
 56 |     </div>
 57 |   );
 58 | }
 59 | 
```

### File: apps/frontend/src/components/school-profile/EventDetails.tsx
```tsx
  0 | import { useState } from 'react';
  1 | import AddressLink from "../AddressLink";
  2 | import PhoneLink from "../PhoneLink";
  3 | import IssueModal from "./modals/IssueModal";
  4 | import RescheduleModal from "./modals/RescheduleModal";
  5 | 
  6 | interface EventDetailsProps {
  7 |   currentEvent: any;
  8 |   schoolName?: string;
  9 |   cityId?: string;
 10 |   onEventUpdated?: () => void;
 11 |   employees?: any[];
 12 | }
 13 | 
 14 | export default function EventDetails({ currentEvent, schoolName, cityId, onEventUpdated, employees }: EventDetailsProps) {
 15 |   const [issueOpen, setIssueOpen] = useState(false);
 16 |   const [rescheduleOpen, setRescheduleOpen] = useState(false);
 17 | 
 18 |   if (!currentEvent) {
 19 |     return (
 20 |       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400">
 21 |         У цього закладу ще немає запланованих подій.
 22 |       </div>
 23 |     );
 24 |   }
 25 | 
 26 |   const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');
 27 | 
 28 |   return (
 29 |     <>
 30 |       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 md:border-l-4 md:border-l-blue-600 relative">
 31 |         <div className="p-5 sm:p-6 pl-6 sm:pl-6">
 32 |           
 33 |           {/* Заголовок */}
 34 |           <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-slate-100 md:pb-4">
 35 |             <h3 className="font-bold text-slate-800 text-lg">Деталі події</h3>
 36 |             {/* Дата для мобільних (щоб була під заголовком) */}
 37 |             <span className="md:hidden text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
 38 |               {formattedDate}
 39 |             </span>
 40 |           </div>
 41 | 
 42 |           {/* ВЕЛИКІ МОБІЛЬНІ КНОПКИ (Відображаються тільки на телефоні) */}
 43 |           <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-slate-100 pb-5 mt-3">
 44 |             <button 
 45 |               onClick={() => setRescheduleOpen(true)} 
 46 |               className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 text-amber-600 rounded-2xl font-bold border border-amber-100/50 active:bg-amber-100 transition-colors shadow-sm"
 47 |             >
 48 |               <span className="text-2xl">📅</span>
 49 |               <span className="text-[11px] uppercase tracking-wider">Перенести</span>
 50 |             </button>
 51 |             <button 
 52 |               onClick={() => setIssueOpen(true)} 
 53 |               className="flex flex-col items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100/50 active:bg-red-100 transition-colors shadow-sm"
 54 |             >
 55 |               <span className="text-2xl">🚨</span>
 56 |               <span className="text-[11px] uppercase tracking-wider">Проблема</span>
 57 |             </button>
 58 |           </div>
 59 | 
 60 |           {/* ДЕСКТОПНІ КНОПКИ (Відображаються тільки на ПК) */}
 61 |           <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
 62 |             <span className="text-sm font-medium text-blue-600 mr-2">{formattedDate}</span>
 63 |             <button
 64 |               onClick={() => setRescheduleOpen(true)}
 65 |               className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
 66 |             >
 67 |               📅 Перенести
 68 |             </button>
 69 |             <button
 70 |               onClick={() => setIssueOpen(true)}
 71 |               className="px-3 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
 72 |             >
 73 |               🚨 Проблема
 74 |             </button>
 75 |           </div>
 76 | 
 77 |           {/* Інформація */}
 78 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
 79 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 80 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Проєкт:</span>
 81 |               <span className="font-bold text-slate-800">{currentEvent.project}</span>
 82 |             </div>
 83 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 84 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Час початку:</span>
 85 |               <span className="font-bold text-slate-800">{currentEvent.time}</span>
 86 |             </div>
 87 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 88 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Кількість дітей:</span>
 89 |               <span className="font-bold text-slate-800">{currentEvent.childrenPlanned}</span>
 90 |             </div>
 91 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 92 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Вартість:</span>
 93 |               <span className="font-bold text-slate-800">{currentEvent.price} грн</span>
 94 |             </div>
 95 |             <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
 96 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Адреса:</span>
 97 |               <span className="font-bold text-slate-800 flex items-start gap-1.5 leading-snug">
 98 |                  <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
 99 |                  <AddressLink address={currentEvent.address} />
100 |               </span>
101 |             </div>
102 |             <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
103 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Контакт:</span>
104 |               <span className="font-bold text-slate-800 flex flex-col gap-1 leading-snug">
105 |                 <span>{currentEvent.contactPerson}</span>
106 |                 <span className="w-6 border-b-2 border-slate-200 my-0.5"></span>
107 |                 <PhoneLink phone={currentEvent.contactPhone} />
108 |               </span>
109 |             </div>
110 |           </div>
111 |         </div>
112 |       </div>
113 | 
114 |       <IssueModal
115 |         isOpen={issueOpen}
116 |         onClose={() => setIssueOpen(false)}
117 |         schoolName={schoolName || currentEvent.school?.name || ''}
118 |         eventName={`${currentEvent.project} — ${formattedDate}`}
119 |         eventId={currentEvent.id}
120 |         cityId={cityId || currentEvent.cityId || ''}
121 |         employees={employees}
122 |       />
123 |       <RescheduleModal
124 |         isOpen={rescheduleOpen}
125 |         onClose={() => setRescheduleOpen(false)}
126 |         eventId={currentEvent.id}
127 |         currentDate={currentEvent.date}
128 |         currentTime={currentEvent.time || ''}
129 |         onSuccess={() => onEventUpdated?.()}
130 |       />
131 |     </>
132 |   );
133 | }
```

### File: apps/frontend/src/components/school-profile/EventPreparation.tsx
```tsx
  0 | 
  1 | 
  2 | import React from 'react';
  3 | 
  4 | interface PreparationProps {
  5 |   data: any; 
  6 |   onUpdate: (field: string, status: string) => void;
  7 |   onOpenCrewModal: () => void;
  8 | }
  9 | 
 10 | const STATUSES = ['Заплановано', 'В процесі', 'Виконано'];
 11 | 
 12 | const getNextStatus = (current: string) => {
 13 |   const idx = STATUSES.indexOf(current || 'Заплановано');
 14 |   return STATUSES[(idx + 1) % STATUSES.length];
 15 | };
 16 | 
 17 | export default function EventPreparation({ data, onUpdate, onOpenCrewModal }: PreparationProps) {
 18 |   const tasks = [
 19 |     { key: 'assignCrew', label: 'Призначити екіпаж' },
 20 |     { key: 'bookEquipment', label: 'Забронювати обладнання' },
 21 |     { key: 'prepareDocs', label: 'Підготувати документи' },
 22 |     { key: 'prepareMaterials', label: 'Підготувати матеріали' },
 23 |     { key: 'remindSchool', label: 'Нагадати школі про подію' },
 24 |   ];
 25 | 
 26 |   const getStatusColor = (status: string) => {
 27 |     switch (status) {
 28 |       case 'Виконано': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
 29 |       case 'В процесі': return 'bg-orange-50 text-orange-600 border border-orange-200';
 30 |       default: return 'bg-blue-50 text-blue-600 border border-blue-200';
 31 |     }
 32 |   };
 33 | 
 34 |   const handleTaskClick = (key: string) => {
 35 |     if (key === 'assignCrew') {
 36 |       onOpenCrewModal(); // Відкриваємо модалку замість простої зміни статусу
 37 |     } else {
 38 |       onUpdate(key, getNextStatus(data[key])); // Перемикаємо статус
 39 |     }
 40 |   };
 41 | 
 42 |   return (
 43 |     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
 44 |       <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Підготовка до події</h3>
 45 |       <div className="space-y-3 text-sm">
 46 |         {tasks.map((task) => (
 47 |           <div 
 48 |             key={task.key} 
 49 |             className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
 50 |             onClick={() => handleTaskClick(task.key)}
 51 |           >
 52 |             <span className="text-slate-700 font-medium select-none">{task.label}</span>
 53 |             <span className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all select-none ${getStatusColor(data[task.key] || 'Заплановано')}`}>
 54 |               {data[task.key] || 'Заплановано'}
 55 |             </span>
 56 |           </div>
 57 |         ))}
 58 |       </div>
 59 |     </div>
 60 |   );
 61 | }
 62 | 
 63 | 
```

### File: apps/frontend/src/components/school-profile/EventsTable.tsx
```tsx
  0 | 
  1 | 
  2 | import axios from 'axios';
  3 | 
  4 | interface EventsTableProps {
  5 |   events: any[];
  6 |   selectedEventId: string | null;
  7 |   onEventSelect: (id: string) => void;
  8 |   onDeleteSuccess: () => void; // Додаємо колбек для оновлення списку
  9 | }
 10 | 
 11 | export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess }: EventsTableProps) {
 12 |   
 13 |   const handleDelete = async (e: React.MouseEvent, id: string) => {
 14 |     e.stopPropagation(); // Щоб не вибирати подію при кліку на кнопку видалення
 15 |     if (!window.confirm('Видалити цю подію?')) return;
 16 |     
 17 |     try {
 18 |       await axios.delete(`https://crm-57qd.onrender.com/events/${id}`, {
 19 |         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 20 |       });
 21 |       onDeleteSuccess();
 22 |     } catch (error) {
 23 |       console.error('Помилка видалення:', error);
 24 |     }
 25 |   };
 26 | 
 27 |   if (events.length === 0) return null;
 28 | 
 29 |   return (
 30 |     <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-2 w-full">
 31 |       <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
 32 |         <h3 className="font-bold text-slate-800">Всі події ({events.length})</h3>
 33 |       </div>
 34 | 
 35 |       {/* Картки — мобільний вигляд */}
 36 |       <div className="md:hidden divide-y divide-slate-50">
 37 |         {events.map(ev => (
 38 |           <div
 39 |             key={ev.id}
 40 |             onClick={() => onEventSelect(ev.id)}
 41 |             className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'active:bg-slate-50'}`}
 42 |           >
 43 |             <div className="min-w-0">
 44 |               <p className="font-medium text-slate-800">{ev.project}</p>
 45 |               <p className="text-xs text-slate-500 mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
 46 |             </div>
 47 |             <div className="flex items-center gap-2 shrink-0">
 48 |               <span className="font-medium text-sm text-slate-700">{ev.price} грн</span>
 49 |               <button
 50 |                 onClick={(e) => handleDelete(e, ev.id)}
 51 |                 className="text-red-500 active:text-red-700 p-2"
 52 |               >
 53 |                 🗑
 54 |               </button>
 55 |             </div>
 56 |           </div>
 57 |         ))}
 58 |       </div>
 59 | 
 60 |       {/* Таблиця — десктоп */}
 61 |       <div className="hidden md:block overflow-x-auto">
 62 |         <table className="w-full text-left text-sm">
 63 |           <thead>
 64 |             <tr className="bg-white border-b border-slate-100 text-slate-500">
 65 |               <th className="p-4">Дата</th>
 66 |               <th className="p-4">Проєкт</th>
 67 |               <th className="p-4">Вартість</th>
 68 |               <th className="p-4 text-center">Дія</th>
 69 |             </tr>
 70 |           </thead>
 71 |           <tbody>
 72 |             {events.map(ev => (
 73 |               <tr 
 74 |                 key={ev.id} onClick={() => onEventSelect(ev.id)}
 75 |                 className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
 76 |               >
 77 |                 <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
 78 |                 <td className="p-4">{ev.project}</td>
 79 |                 <td className="p-4">{ev.price} грн</td>
 80 |                 <td className="p-4 text-center">
 81 |                   <button 
 82 |                     onClick={(e) => handleDelete(e, ev.id)}
 83 |                     className="text-red-500 hover:text-red-700 p-2"
 84 |                   >
 85 |                     🗑
 86 |                   </button>
 87 |                 </td>
 88 |               </tr>
 89 |             ))}
 90 |           </tbody>
 91 |         </table>
 92 |       </div>
 93 |     </div>
 94 |   );
 95 | }
 96 | 
 97 | 
 98 | 
```

### File: apps/frontend/src/components/school-profile/HistoryTimeline.tsx
```tsx
  0 | interface HistoryTimelineProps {
  1 |   currentEvent: any;
  2 |   onHistoryClick: (item: any) => void;
  3 |   onAddCommentClick: () => void;
  4 | }
  5 | 
  6 | export default function HistoryTimeline({ currentEvent, onHistoryClick, onAddCommentClick }: HistoryTimelineProps) {
  7 |   return (
  8 |     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
  9 |       <div className="flex justify-between items-center mb-5">
 10 |         <h3 className="font-bold text-slate-800">Історія взаємодії</h3>
 11 |         <button 
 12 |           onClick={onAddCommentClick}
 13 |           className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
 14 |         >
 15 |           <span>+</span> Коментар
 16 |         </button>
 17 |       </div>
 18 |       
 19 |       {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
 20 |         <p className="text-sm text-slate-400">Історія порожня.</p>
 21 |       ) : (
 22 |         <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
 23 |           {currentEvent.history.map((item: any, i: number) => (
 24 |             <div 
 25 |               key={item.id} 
 26 |               onClick={() => onHistoryClick(item)}
 27 |               className="relative pl-8 pr-3 py-2 text-sm hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
 28 |             >
 29 |               <div className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
 30 |               <p className="font-semibold text-slate-800">{item.action}</p>
 31 |               {item.comment && (
 32 |                 <p className="text-slate-600 mt-1.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-sm italic">
 33 |                   "{item.comment}"
 34 |                 </p>
 35 |               )}
 36 |               <p className="text-[11px] text-slate-400 mt-2 flex justify-between items-center font-medium">
 37 |                 <span>
 38 |                   👤 {item.userName} <span className="mx-1">•</span> 
 39 |                   {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
 40 |                 </span>
 41 |                 <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">✏️ Редагувати</span>
 42 |               </p>
 43 |             </div>
 44 |           ))}
 45 |         </div>
 46 |       )}
 47 |     </div>
 48 |   );
 49 | }
 50 | 
```

### File: apps/frontend/src/components/school-profile/Pipeline.tsx
```tsx
  0 | interface PipelineProps {
  1 |   currentStageIndex: number;
  2 |   currentEvent: any;
  3 |   onPipelineClick: (stepId: number) => void;
  4 |   stages: Array<{ id: number; key: string; name: string }>;
  5 | }
  6 | 
  7 | export default function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  8 |   return (
  9 |     <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
 10 |       <h3 className="font-bold text-slate-800 mb-4 md:hidden">Етап події</h3>
 11 |       <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
 12 |         <div className="flex items-start min-w-[600px] justify-between relative">
 13 |           <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
 14 |           {stages.map((step, index) => {
 15 |             const isCompleted = index < currentStageIndex;
 16 |             const isActive = index === currentStageIndex;
 17 |             const isNext = index === currentStageIndex + 1;
 18 |             const isClickable = !!currentEvent && isNext;
 19 | 
 20 |             return (
 21 |               <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
 22 |                 <button
 23 |                   onClick={() => isClickable && onPipelineClick(step.id)}
 24 |                   className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-all
 25 |                     ${isCompleted
 26 |                       ? 'border-blue-600 text-blue-600 bg-white'
 27 |                       : isActive
 28 |                       ? 'border-blue-600 bg-blue-600 text-white shadow-md'
 29 |                       : isNext
 30 |                       ? 'border-blue-400 bg-white text-blue-400 cursor-pointer hover:scale-110 hover:border-blue-600 hover:text-blue-600'
 31 |                       : 'border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-50'
 32 |                     }`}
 33 |                 >
 34 |                   {isCompleted ? '✓' : step.id}
 35 |                 </button>
 36 |                 <span className={`text-[10px] md:text-[11px] leading-tight font-medium text-center break-words max-w-[70px]
 37 |                   ${isActive ? 'text-blue-600 font-bold' : isNext ? 'text-blue-400' : 'text-slate-400'}`}>
 38 |                   {step.name}
 39 |                 </span>
 40 |               </div>
 41 |             );
 42 |           })}
 43 |         </div>
 44 |       </div>
 45 |     </div>
 46 |   );
 47 | }
 48 | 
```

### File: apps/frontend/src/components/school-profile/SchoolInfoCard.tsx
```tsx
  0 | import AddressLink from "../AddressLink";
  1 | import PhoneLink from "../PhoneLink";
  2 | 
  3 | export default function SchoolInfoCard({ schoolData }: { schoolData: any }) {
  4 |   return (
  5 |     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
  6 |       <ul className="space-y-4 text-sm">
  7 |         <li className="flex gap-3"><span className="text-slate-400">🏛</span> <div><span className="text-slate-500">Тип:</span> <span className="font-medium">{schoolData.type || '—'}</span></div></li>
  8 |         <li className="flex gap-3"><span className="text-slate-400">📍</span> <div><span className="text-slate-500">Місто:</span> <span className="font-medium">{schoolData.city || '—'}</span></div></li>
  9 |         <li className="flex gap-3"><span className="text-slate-400">🗺</span> <div><span className="text-slate-500">Адреса:</span> <span className="font-medium"><AddressLink address={schoolData.address} /></span></div></li>
 10 |         <li className="flex gap-3"><span className="text-slate-400">👤</span> <div><span className="text-slate-500">Контакт:</span> <span className="font-medium">{schoolData.director || '—'}</span></div></li>
 11 |         <li className="flex gap-3"><span className="text-slate-400">📞</span> <div><span className="text-slate-500">Телефон:</span> <span className="font-medium"><PhoneLink phone={schoolData.phone} /></span></div></li>
 12 |         <li className="flex gap-3"><span className="text-slate-400">👥</span> <div><span className="text-slate-500">Дітей:</span> <span className="font-medium">{schoolData.childrenCount || 0}</span></div></li>
 13 |       </ul>
 14 |     </div>
 15 |   );
 16 | }
 17 | 
```

### File: apps/frontend/src/components/school-profile/SchoolProfileHeader.tsx
```tsx
  0 | import { Link } from "react-router-dom";
  1 | 
  2 | interface Props {
  3 |   schoolData: any;
  4 |   onEdit: () => void;
  5 |   onAddEvent: () => void;
  6 | }
  7 | 
  8 | export default function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
  9 |   return (
 10 |     <div className="mb-6">
 11 |       {/* Хлібні крихти */}
 12 |       <div className="text-xs md:text-sm text-slate-500 mb-4 truncate">
 13 |         <Link to="/schools" className="hover:text-blue-600 transition-colors">
 14 |           Школи / Садочки
 15 |         </Link>
 16 |         <span className="mx-2">›</span>
 17 |         <span className="text-slate-800 font-medium">
 18 |           {schoolData.type} "{schoolData.name}"
 19 |         </span>
 20 |       </div>
 21 | 
 22 |       {/* Заголовок та кнопки */}
 23 |       <div className="flex justify-between items-start md:items-center gap-4">
 24 |         <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight flex-1">
 25 |           {schoolData.type} "{schoolData.name}"
 26 |         </h1>
 27 | 
 28 |         {/* Десктопні кнопки */}
 29 |         <div className="hidden md:flex gap-3 shrink-0">
 30 |           <button
 31 |             onClick={onEdit}
 32 |             className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors shadow-sm"
 33 |           >
 34 |             ✏️ Редагувати
 35 |           </button>
 36 |           <button
 37 |             onClick={onAddEvent}
 38 |             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm"
 39 |           >
 40 |             ⏱ Додати подію
 41 |           </button>
 42 |         </div>
 43 | 
 44 |         {/* Мобільна кнопка Редагування (Іконка) */}
 45 |         <button 
 46 |           onClick={onEdit}
 47 |           className="md:hidden w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm active:bg-slate-50 transition-colors"
 48 |         >
 49 |           ✏️
 50 |         </button>
 51 |       </div>
 52 |     </div>
 53 |   );
 54 | }
```

### File: apps/frontend/src/components/school-profile/modals/CommentModal.tsx
```tsx
  0 | import React from 'react';
  1 | 
  2 | interface CommentModalProps {
  3 |   isOpen: boolean;
  4 |   onClose: () => void;
  5 |   mode: string;
  6 |   text: string;
  7 |   setText: (text: string) => void;
  8 |   onSave: (e: React.FormEvent) => void;
  9 | }
 10 | 
 11 | export default function CommentModal({ isOpen, onClose, mode, text, setText, onSave }: CommentModalProps) {
 12 |   if (!isOpen) return null;
 13 | 
 14 |   return (
 15 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
 16 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
 17 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
 18 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
 19 |           <h3 className="text-xl font-bold text-slate-800">
 20 |             {mode === 'pipeline' ? 'Завершення етапу' : mode === 'add_comment' ? 'Новий коментар' : 'Редагувати'}
 21 |           </h3>
 22 |           <button onClick={onClose} className="text-slate-400 p-2 -mr-2">✕</button>
 23 |         </div>
 24 |         <form onSubmit={onSave} className="p-5 sm:p-6 flex-1 flex flex-col">
 25 |           <label className="block text-sm font-medium text-slate-700 mb-2">
 26 |             {mode === 'add_comment' ? 'Коментар' : 'Коментар (необов\'язково)'}
 27 |           </label>
 28 |           <textarea
 29 |             value={text}
 30 |             onChange={(e) => setText(e.target.value)}
 31 |             placeholder="Результати дзвінка, домовленості, примітки..."
 32 |             className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none h-32 flex-1 min-h-[120px]"
 33 |             autoFocus
 34 |             required={mode === 'add_comment'}
 35 |           />
 36 |           <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pb-1 sm:pb-0">
 37 |             <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors">
 38 |               Скасувати
 39 |             </button>
 40 |             <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
 41 |               {mode === 'pipeline' ? 'Завершити' : 'Зберегти'}
 42 |             </button>
 43 |           </div>
 44 |         </form>
 45 |       </div>
 46 |     </div>
 47 |   );
 48 | }
 49 | 
```

### File: apps/frontend/src/components/school-profile/modals/CrewModal.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { api } from "../../../config/api";
  2 | 
  3 | export default function CrewModal({ isOpen, onClose, city, onSave }: any) {
  4 |   const [crews, setCrews] = useState<any[]>([]);
  5 |   const [selectedCrewId, setSelectedCrewId] = useState("");
  6 |   const [isLoading, setIsLoading] = useState(true);
  7 | 
  8 |   useEffect(() => {
  9 |     if (isOpen && city) {
 10 |       // city передається як назва, нам потрібен cityId, тому беремо його через бекенд
 11 |       api.get("/cities").then(res => {
 12 |         const currentCity = res.data.find((c: any) => c.name === city);
 13 |         if (currentCity) {
 14 |           api.get(`/cities/${currentCity.id}`).then(cityRes => {
 15 |             setCrews(cityRes.data.crews || []);
 16 |             setIsLoading(false);
 17 |           });
 18 |         }
 19 |       });
 20 |     }
 21 |   }, [isOpen, city]);
 22 | 
 23 |   if (!isOpen) return null;
 24 | 
 25 |   return (
 26 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 27 |       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
 28 |         <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
 29 |           <h3 className="text-xl font-bold text-slate-800">Призначити екіпаж</h3>
 30 |           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
 31 |         </div>
 32 |         
 33 |         <div className="p-6">
 34 |           {isLoading ? (
 35 |             <p className="text-slate-500 text-center py-4">Завантаження...</p>
 36 |           ) : crews.length === 0 ? (
 37 |             <div className="text-center py-4">
 38 |               <p className="text-slate-500">У цьому місті ще немає сформованих екіпажів.</p>
 39 |               <p className="text-sm mt-2 text-blue-600">Створіть екіпаж у вкладці міста!</p>
 40 |             </div>
 41 |           ) : (
 42 |             <div className="space-y-4">
 43 |               <label className="block text-sm font-medium text-slate-700">Оберіть готовий екіпаж</label>
 44 |               <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
 45 |                 {crews.map(crew => (
 46 |                   <label key={crew.id} className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${selectedCrewId === crew.id ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-blue-300'}`}>
 47 |                     <input 
 48 |                       type="radio" 
 49 |                       name="crew" 
 50 |                       value={crew.id} 
 51 |                       checked={selectedCrewId === crew.id} 
 52 |                       onChange={() => setSelectedCrewId(crew.id)} 
 53 |                       className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
 54 |                     />
 55 |                     <div>
 56 |                       <p className="font-bold text-slate-800">{crew.name}</p>
 57 |                       <p className="text-xs text-slate-500 mt-1">🎙️ {crew.host?.name || "—"} | 🚗 {crew.driver?.name || "—"}</p>
 58 |                       {crew.car && <p className="text-xs text-emerald-600 mt-0.5">Авто: {crew.car}</p>}
 59 |                     </div>
 60 |                   </label>
 61 |                 ))}
 62 |               </div>
 63 |             </div>
 64 |           )}
 65 | 
 66 |           <div className="flex gap-3 mt-6">
 67 |             <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200">Скасувати</button>
 68 |             <button 
 69 |               onClick={() => onSave(selectedCrewId)} 
 70 |               disabled={!selectedCrewId}
 71 |               className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
 72 |             >
 73 |               Призначити
 74 |             </button>
 75 |           </div>
 76 |         </div>
 77 |       </div>
 78 |     </div>
 79 |   );
 80 | }
 81 | 
```

### File: apps/frontend/src/components/school-profile/modals/EditSchoolModal.tsx
```tsx
  0 | import React from 'react';
  1 | 
  2 | interface EditSchoolModalProps {
  3 |   isOpen: boolean;
  4 |   onClose: () => void;
  5 |   editForm: any;
  6 |   setEditForm: (data: any) => void;
  7 |   onSave: (e: React.FormEvent) => void;
  8 | }
  9 | 
 10 | export default function EditSchoolModal({ isOpen, onClose, editForm, setEditForm, onSave }: EditSchoolModalProps) {
 11 |   if (!isOpen) return null;
 12 | 
 13 |   return (
 14 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
 15 |       {/* Bottom-sheet на мобільному, центрований діалог на десктопі */}
 16 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
 17 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
 18 | 
 19 |         {/* Шапка не зжимається (shrink-0) */}
 20 |         <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
 21 |           <h3 className="text-xl font-bold">Редагування</h3>
 22 |           <button onClick={onClose} className="text-slate-400 p-2 -mr-2">✕</button>
 23 |         </div>
 24 | 
 25 |         {/* Форма скролиться (overflow-y-auto) */}
 26 |         <form onSubmit={onSave} className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4">
 27 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 28 |             <div>
 29 |               <label className="block text-sm mb-1">Тип</label>
 30 |               <select value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500">
 31 |                 <option>Школа</option>
 32 |                 <option>Садочок</option>
 33 |               </select>
 34 |             </div>
 35 |             <div className="sm:col-span-2">
 36 |               <label className="block text-sm mb-1">Адреса</label>
 37 |               <input type="text" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 38 |             </div>
 39 |             <div>
 40 |               <label className="block text-sm mb-1">Контакт</label>
 41 |               <input type="text" value={editForm.director} onChange={e => setEditForm({...editForm, director: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 42 |             </div>
 43 |             <div>
 44 |               <label className="block text-sm mb-1">Телефон</label>
 45 |               <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 46 |             </div>
 47 |             <div>
 48 |               <label className="block text-sm mb-1">Email</label>
 49 |               <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 50 |             </div>
 51 |             <div>
 52 |               <label className="block text-sm mb-1">Дітей</label>
 53 |               <input type="number" value={editForm.childrenCount || ''} onChange={e => setEditForm({...editForm, childrenCount: Number(e.target.value)})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 54 |             </div>
 55 |           </div>
 56 |           
 57 |           <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-slate-100 pb-1 sm:pb-0">
 58 |             <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors">Скасувати</button>
 59 |             <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors">Зберегти</button>
 60 |           </div>
 61 |         </form>
 62 |       </div>
 63 |     </div>
 64 |   );
 65 | }
 66 | 
```

### File: apps/frontend/src/components/school-profile/modals/EventModal.tsx
```tsx
  0 | import React, { useState, useEffect } from "react";
  1 | import { api } from "../../../config/api";
  2 | 
  3 | interface EventModalProps {
  4 |   isOpen: boolean;
  5 |   onClose: () => void;
  6 |   eventForm: any;
  7 |   setEventForm: (data: any) => void;
  8 |   onSave: (e: React.FormEvent) => void;
  9 | }
 10 | 
 11 | export default function EventModal({
 12 |   isOpen,
 13 |   onClose,
 14 |   eventForm,
 15 |   setEventForm,
 16 |   onSave,
 17 | }: EventModalProps) {
 18 |   const [projects, setProjects] = useState<any[]>([]);
 19 | 
 20 |   useEffect(() => {
 21 |     if (isOpen) {
 22 |       api
 23 |         .get("/projects", {
 24 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 25 |         })
 26 |         .then((res) => {
 27 |           setProjects(res.data);
 28 |           // Якщо поточний проєкт не вибраний, автовибираємо перший доступний
 29 |           if (!eventForm.project && res.data.length > 0) {
 30 |             setEventForm((prev: any) => ({
 31 |               ...prev,
 32 |               project: res.data[0].name,
 33 |             }));
 34 |           }
 35 |         })
 36 |         .catch(console.error);
 37 |     }
 38 |   }, [isOpen]);
 39 | 
 40 |   if (!isOpen) return null;
 41 | 
 42 |   return (
 43 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 44 |       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
 45 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
 46 |           <h3 className="text-xl font-bold text-slate-800">Нова подія</h3>
 47 |           <button
 48 |             onClick={onClose}
 49 |             className="text-slate-400 hover:text-slate-600 p-2 -mr-2 text-xl leading-none"
 50 |           >
 51 |             ✕
 52 |           </button>
 53 |         </div>
 54 |         <form
 55 |           onSubmit={onSave}
 56 |           className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
 57 |         >
 58 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 59 |             <div className="sm:col-span-2">
 60 |               <label className="block text-sm mb-1 text-slate-600">
 61 |                 Проєкт (Вид події)
 62 |               </label>
 63 |               <select
 64 |                 value={eventForm.project}
 65 |                 onChange={(e) =>
 66 |                   setEventForm({ ...eventForm, project: e.target.value })
 67 |                 }
 68 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
 69 |                 required
 70 |               >
 71 |                 <option value="" disabled>
 72 |                   Оберіть вид події
 73 |                 </option>
 74 |                 {projects.length > 0 ? (
 75 |                   projects.map((p) => (
 76 |                     <option key={p.id} value={p.name}>
 77 |                       {p.name}
 78 |                     </option>
 79 |                   ))
 80 |                 ) : (
 81 |                   <>
 82 |                     <option>Голограма для школи</option>
 83 |                     <option>360° шоу</option>
 84 |                   </>
 85 |                 )}
 86 |               </select>
 87 |             </div>
 88 |             <div>
 89 |               <label className="block text-sm mb-1 text-slate-600">Дата</label>
 90 |               <input
 91 |                 type="date"
 92 |                 value={eventForm.date}
 93 |                 onChange={(e) =>
 94 |                   setEventForm({ ...eventForm, date: e.target.value })
 95 |                 }
 96 |                 required
 97 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 98 |               />
 99 |             </div>
100 |             <div>
101 |               <label className="block text-sm mb-1 text-slate-600">Час</label>
102 |               <input
103 |                 type="time"
104 |                 value={eventForm.time}
105 |                 onChange={(e) =>
106 |                   setEventForm({ ...eventForm, time: e.target.value })
107 |                 }
108 |                 required
109 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
110 |               />
111 |             </div>
112 |             <div>
113 |               <label className="block text-sm mb-1 text-slate-600">
114 |                 Дітей (план)
115 |               </label>
116 |               <input
117 |                 type="number"
118 |                 value={eventForm.childrenPlanned}
119 |                 onChange={(e) =>
120 |                   setEventForm({
121 |                     ...eventForm,
122 |                     childrenPlanned: e.target.value,
123 |                   })
124 |                 }
125 |                 required
126 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
127 |               />
128 |             </div>
129 |             <div>
130 |               <label className="block text-sm mb-1 text-slate-600">
131 |                 Вартість
132 |               </label>
133 |               <input
134 |                 type="number"
135 |                 value={eventForm.price}
136 |                 onChange={(e) =>
137 |                   setEventForm({ ...eventForm, price: e.target.value })
138 |                 }
139 |                 required
140 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
141 |               />
142 |             </div>
143 |             <div className="sm:col-span-2">
144 |               <label className="block text-sm mb-1 text-slate-600">
145 |                 Адреса
146 |               </label>
147 |               <input
148 |                 type="text"
149 |                 value={eventForm.address}
150 |                 onChange={(e) =>
151 |                   setEventForm({ ...eventForm, address: e.target.value })
152 |                 }
153 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
154 |               />
155 |             </div>
156 |             <div>
157 |               <label className="block text-sm mb-1 text-slate-600">
158 |                 Контактна особа
159 |               </label>
160 |               <input
161 |                 type="text"
162 |                 value={eventForm.contactPerson}
163 |                 onChange={(e) =>
164 |                   setEventForm({ ...eventForm, contactPerson: e.target.value })
165 |                 }
166 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
167 |               />
168 |             </div>
169 |             <div>
170 |               <label className="block text-sm mb-1 text-slate-600">
171 |                 Телефон
172 |               </label>
173 |               <input
174 |                 type="text"
175 |                 value={eventForm.contactPhone}
176 |                 onChange={(e) =>
177 |                   setEventForm({ ...eventForm, contactPhone: e.target.value })
178 |                 }
179 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
180 |               />
181 |             </div>
182 |           </div>
183 |           <div className="flex gap-3 mt-4 shrink-0 pt-4 border-t border-slate-100 pb-1">
184 |             <button
185 |               type="button"
186 |               onClick={onClose}
187 |               className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium rounded-xl transition-colors"
188 |             >
189 |               Скасувати
190 |             </button>
191 |             <button
192 |               type="submit"
193 |               className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
194 |             >
195 |               Створити
196 |             </button>
197 |           </div>
198 |         </form>
199 |       </div>
200 |     </div>
201 |   );
202 | }
203 | 
```

### File: apps/frontend/src/components/school-profile/modals/IssueModal.tsx
```tsx
  0 | import { useState } from 'react';
  1 | import { api } from '../../../config/api';
  2 | 
  3 | interface Employee {
  4 |   id: string;
  5 |   name: string;
  6 |   role: string;
  7 | }
  8 | 
  9 | interface IssueModalProps {
 10 |   isOpen: boolean;
 11 |   onClose: () => void;
 12 |   schoolName: string;
 13 |   eventName: string;
 14 |   eventId: string;
 15 |   cityId: string;
 16 |   employees?: Employee[];
 17 | }
 18 | 
 19 | export default function IssueModal({
 20 |   isOpen, onClose, schoolName, eventName, eventId, cityId, employees = []
 21 | }: IssueModalProps) {
 22 |   const [message, setMessage] = useState('');
 23 |   const [deadline, setDeadline] = useState('');
 24 |   const [assignedUserId, setAssignedUserId] = useState('');
 25 |   const [isSending, setIsSending] = useState(false);
 26 |   const [sent, setSent] = useState(false);
 27 | 
 28 |   if (!isOpen) return null;
 29 | 
 30 |   const assignedUser = employees.find(e => e.id === assignedUserId);
 31 | 
 32 |   const handleSend = async () => {
 33 |     if (!message.trim()) return;
 34 |     setIsSending(true);
 35 |     try {
 36 |       await api.post('/issues', {
 37 |         eventId,
 38 |         schoolName,
 39 |         eventName,
 40 |         message,
 41 |         cityId,
 42 |         deadline: deadline || undefined,
 43 |         assignedUserId: assignedUserId || undefined,
 44 |         assignedUserName: assignedUser?.name || undefined,
 45 |       });
 46 |       setSent(true);
 47 |       setTimeout(() => {
 48 |         setSent(false);
 49 |         setMessage('');
 50 |         setDeadline('');
 51 |         setAssignedUserId('');
 52 |         onClose();
 53 |       }, 1500);
 54 |     } catch (e) {
 55 |       console.error(e);
 56 |     } finally {
 57 |       setIsSending(false);
 58 |     }
 59 |   };
 60 | 
 61 |   return (
 62 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 63 |       <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
 64 | 
 65 |         <div className="p-5 border-b border-slate-100 flex justify-between bg-red-50 shrink-0">
 66 |           <div>
 67 |             <h3 className="text-xl font-bold text-red-700">🚨 Запит</h3>
 68 |             <p className="text-sm text-red-500 mt-0.5 font-medium">{schoolName}</p>
 69 |             <p className="text-xs text-slate-500">{eventName}</p>
 70 |           </div>
 71 |           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 h-fit text-lg">✕</button>
 72 |         </div>
 73 | 
 74 |         <div className="p-5 flex flex-col gap-4 overflow-y-auto">
 75 |           {/* Опис проблеми */}
 76 |           <textarea
 77 |             value={message}
 78 |             onChange={(e) => setMessage(e.target.value)}
 79 |             placeholder="Опишіть проблему або запит..."
 80 |             className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32"
 81 |             autoFocus
 82 |           />
 83 | 
 84 |           {/* Дедлайн */}
 85 |           <div>
 86 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
 87 |               ⏰ Дедлайн <span className="text-slate-400 font-normal">(необов'язково)</span>
 88 |             </label>
 89 |             <input
 90 |               type="date"
 91 |               value={deadline}
 92 |               onChange={(e) => setDeadline(e.target.value)}
 93 |               min={new Date().toISOString().slice(0, 10)}
 94 |               className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
 95 |             />
 96 |           </div>
 97 | 
 98 |           {/* Відповідальний */}
 99 |           {employees.length > 0 && (
100 |             <div>
101 |               <label className="block text-sm font-medium text-slate-600 mb-1.5">
102 |                 👤 Відповідальний <span className="text-slate-400 font-normal">(необов'язково)</span>
103 |               </label>
104 |               <select
105 |                 value={assignedUserId}
106 |                 onChange={(e) => setAssignedUserId(e.target.value)}
107 |                 className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm bg-white"
108 |               >
109 |                 <option value="">— Оберіть працівника —</option>
110 |                 {employees.map(emp => (
111 |                   <option key={emp.id} value={emp.id}>
112 |                     {emp.name} ({emp.role})
113 |                   </option>
114 |                 ))}
115 |               </select>
116 |             </div>
117 |           )}
118 | 
119 |           <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
120 |             <button
121 |               type="button"
122 |               onClick={onClose}
123 |               className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium text-sm transition-colors"
124 |             >
125 |               Скасувати
126 |             </button>
127 |             <button
128 |               type="button"
129 |               onClick={handleSend}
130 |               disabled={isSending || !message.trim()}
131 |               className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
132 |             >
133 |               {sent ? '✓ Надіслано!' : isSending ? 'Відправка...' : 'Відправити'}
134 |             </button>
135 |           </div>
136 |         </div>
137 |       </div>
138 |     </div>
139 |   );
140 | }
141 | 
```

### File: apps/frontend/src/components/school-profile/modals/ReportModal.tsx
```tsx
  0 | import React, { useState } from "react";
  1 | 
  2 | interface Expense {
  3 |   name: string;
  4 |   amount: number;
  5 | }
  6 | interface CrewMember {
  7 |   id: string;
  8 |   name: string;
  9 |   role: "host" | "driver";
 10 | }
 11 | interface ReportModalProps {
 12 |   isOpen: boolean;
 13 |   onClose: () => void;
 14 |   onSave: (data: any) => void;
 15 |   schoolName: string;
 16 |   eventType?: string;
 17 |   eventDate?: string;
 18 |   eventIndex?: number;
 19 |   crew?: {
 20 |     host?: { id: string; name: string } | null;
 21 |     driver?: { id: string; name: string } | null;
 22 |   };
 23 | }
 24 | 
 25 | const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
 26 | const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
 27 |   day: "2-digit",
 28 |   month: "2-digit",
 29 |   year: "2-digit",
 30 | });
 31 | 
 32 | function formatDate(dateStr?: string) {
 33 |   if (!dateStr) return "—";
 34 |   const d = new Date(dateStr);
 35 |   if (Number.isNaN(d.getTime())) return "—";
 36 |   return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
 37 | }
 38 | 
 39 | function formatMoney(value: number) {
 40 |   return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
 41 | }
 42 | 
 43 | const Icon = {
 44 |   Check: () => (
 45 |     <svg
 46 |       viewBox="0 0 24 24"
 47 |       fill="none"
 48 |       stroke="currentColor"
 49 |       strokeWidth="2"
 50 |       strokeLinecap="round"
 51 |       strokeLinejoin="round"
 52 |       className="w-4 h-4"
 53 |     >
 54 |       <path d="M9 11l3 3L22 4" />
 55 |       <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
 56 |     </svg>
 57 |   ),
 58 |   Users: () => (
 59 |     <svg
 60 |       viewBox="0 0 24 24"
 61 |       fill="none"
 62 |       stroke="currentColor"
 63 |       strokeWidth="2"
 64 |       strokeLinecap="round"
 65 |       strokeLinejoin="round"
 66 |       className="w-4 h-4"
 67 |     >
 68 |       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
 69 |       <circle cx="9" cy="7" r="4" />
 70 |       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
 71 |       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
 72 |     </svg>
 73 |   ),
 74 |   Wallet: () => (
 75 |     <svg
 76 |       viewBox="0 0 24 24"
 77 |       fill="none"
 78 |       stroke="currentColor"
 79 |       strokeWidth="2"
 80 |       strokeLinecap="round"
 81 |       strokeLinejoin="round"
 82 |       className="w-4 h-4"
 83 |     >
 84 |       <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
 85 |       <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
 86 |     </svg>
 87 |   ),
 88 |   Star: () => (
 89 |     <svg
 90 |       viewBox="0 0 24 24"
 91 |       fill="none"
 92 |       stroke="currentColor"
 93 |       strokeWidth="2"
 94 |       strokeLinecap="round"
 95 |       strokeLinejoin="round"
 96 |       className="w-4 h-4"
 97 |     >
 98 |       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
 99 |     </svg>
100 |   ),
101 | };
102 | 
103 | function IconBadge({
104 |   color,
105 |   children,
106 | }: {
107 |   color: string;
108 |   children: React.ReactNode;
109 | }) {
110 |   return (
111 |     <span
112 |       className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}
113 |     >
114 |       {children}
115 |     </span>
116 |   );
117 | }
118 | 
119 | function CardHeader({
120 |   icon,
121 |   color,
122 |   title,
123 | }: {
124 |   icon: React.ReactNode;
125 |   color: string;
126 |   title: string;
127 | }) {
128 |   return (
129 |     <div className="flex items-center gap-2.5 mb-4">
130 |       <IconBadge color={color}>{icon}</IconBadge>
131 |       <h4 className="text-sm font-bold text-slate-800">{title}</h4>
132 |     </div>
133 |   );
134 | }
135 | 
136 | function Row({
137 |   label,
138 |   children,
139 | }: {
140 |   label: string;
141 |   children: React.ReactNode;
142 | }) {
143 |   return (
144 |     <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
145 |       <span className="text-sm text-slate-500">{label}</span>
146 |       <div className="text-sm font-medium text-slate-800">{children}</div>
147 |     </div>
148 |   );
149 | }
150 | 
151 | function TogglePill({
152 |   value,
153 |   onChange,
154 | }: {
155 |   value: boolean;
156 |   onChange: (v: boolean) => void;
157 | }) {
158 |   return (
159 |     <div className="flex gap-1.5">
160 |       <button
161 |         type="button"
162 |         onClick={() => onChange(true)}
163 |         className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
164 |       >
165 |         Так
166 |       </button>
167 |       <button
168 |         type="button"
169 |         onClick={() => onChange(false)}
170 |         className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
171 |       >
172 |         Ні
173 |       </button>
174 |     </div>
175 |   );
176 | }
177 | 
178 | function NumberField({
179 |   value,
180 |   onChange,
181 |   suffix,
182 | }: {
183 |   value: number;
184 |   onChange: (v: number) => void;
185 |   suffix?: string;
186 | }) {
187 |   return (
188 |     <span className="inline-flex items-center gap-1">
189 |       <input
190 |         type="number"
191 |         min={0}
192 |         value={value || ""}
193 |         onChange={(e) => onChange(+e.target.value)}
194 |         className="w-16 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1"
195 |         placeholder="0"
196 |       />
197 |       {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
198 |     </span>
199 |   );
200 | }
201 | 
202 | export default function ReportModal({
203 |   isOpen,
204 |   onClose,
205 |   onSave,
206 |   schoolName,
207 |   eventType,
208 |   eventDate,
209 |   eventIndex,
210 |   crew,
211 | }: ReportModalProps) {
212 |   const [form, setForm] = useState({
213 |     announcementDone: true,
214 |     materialShown: true,
215 |     childrenCount: 0,
216 |     classesCount: 0,
217 |     privilegedCount: 0,
218 |     showingsCount: 0,
219 |     totalSum: 0,
220 |     schoolPercentage: 20, // <-- НОВЕ: Дефолтний % закладу
221 |     rating: 8,
222 |   });
223 | 
224 |   const [expenses, setExpenses] = useState<Expense[]>([]);
225 |   const [newExp, setNewExp] = useState({ name: "", amount: "" });
226 |   const [salaries, setSalaries] = useState<Record<string, number>>({});
227 |   if (!isOpen) return null;
228 | 
229 |   // Динамічний розрахунок закладу на основі відсотка
230 |   const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
231 |   const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
232 |   const remainder = form.totalSum - schoolSum - totalExpenses;
233 | 
234 |   const addExpense = () => {
235 |     const amount = Number(newExp.amount);
236 |     if (!newExp.name.trim() || !amount) return;
237 |     setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
238 |     setNewExp({ name: "", amount: "" });
239 |   };
240 | 
241 |   const removeExpense = (index: number) => {
242 |     setExpenses((prev) => prev.filter((_, i) => i !== index));
243 |   };
244 | 
245 |   // Хелпер:
246 |   const crewMembers = [
247 |     ...(crew?.host
248 |       ? [
249 |           {
250 |             id: crew.host.id,
251 |             name: crew.host.name,
252 |             role: "Ведучий",
253 |           },
254 |         ]
255 |       : []),
256 |     ...(crew?.driver
257 |       ? [
258 |           {
259 |             id: crew.driver.id,
260 |             name: crew.driver.name,
261 |             role: "Водій",
262 |           },
263 |         ]
264 |       : []),
265 |   ];
266 | 
267 |   const handleSave = () => {
268 |     const salariesArr = crewMembers
269 |       .map((m) => ({ userId: m.id, name: m.name, amount: salaries[m.id] || 0 }))
270 |       .filter((s) => s.amount > 0);
271 |     onSave({
272 |       ...form,
273 |       expenses,
274 |       schoolSum,
275 |       remainderSum: remainder,
276 |       salaries: salariesArr,
277 |     });
278 |   };
279 | 
280 |   return (
281 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
282 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden">
283 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
284 | 
285 |         {/* Header */}
286 |         <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
287 |           <div className="min-w-0">
288 |             <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
289 |               Звіт по події
290 |             </h3>
291 |             <p className="text-sm text-slate-500 mt-0.5 truncate">
292 |               {schoolName}
293 |             </p>
294 |           </div>
295 |           <button
296 |             onClick={onClose}
297 |             className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 shrink-0"
298 |           >
299 |             ✕
300 |           </button>
301 |         </div>
302 | 
303 |         {/* Body */}
304 |         <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
305 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
306 |             {/* Охоплення */}
307 |             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
308 |               <CardHeader
309 |                 icon={<Icon.Users />}
310 |                 color="bg-violet-50 text-violet-600"
311 |                 title="Охоплення та Проведення"
312 |               />
313 |               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
314 |                 <Row label="Кількість дітей">
315 |                   <NumberField
316 |                     value={form.childrenCount}
317 |                     onChange={(v) => setForm({ ...form, childrenCount: v })}
318 |                     suffix="дітей"
319 |                   />
320 |                 </Row>
321 |                 <Row label="Класів">
322 |                   <NumberField
323 |                     value={form.classesCount}
324 |                     onChange={(v) => setForm({ ...form, classesCount: v })}
325 |                     suffix="кл."
326 |                   />
327 |                 </Row>
328 |                 <Row label="Пільгових дітей">
329 |                   <NumberField
330 |                     value={form.privilegedCount}
331 |                     onChange={(v) => setForm({ ...form, privilegedCount: v })}
332 |                   />
333 |                 </Row>
334 |                 <Row label="Кількість показів">
335 |                   <NumberField
336 |                     value={form.showingsCount}
337 |                     onChange={(v) => setForm({ ...form, showingsCount: v })}
338 |                   />
339 |                 </Row>
340 |               </div>
341 |             </div>
342 | 
343 |             {/* Фінансовий результат */}
344 |             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
345 |               <CardHeader
346 |                 icon={<Icon.Wallet />}
347 |                 color="bg-amber-50 text-amber-600"
348 |                 title="Фінансовий результат"
349 |               />
350 |               <div className="flex items-center justify-between py-2 border-b border-slate-50">
351 |                 <span className="text-sm text-slate-500 font-medium">
352 |                   Загальна виручка
353 |                 </span>
354 |                 <span className="inline-flex items-center gap-1">
355 |                   <input
356 |                     type="number"
357 |                     min={0}
358 |                     value={form.totalSum || ""}
359 |                     onChange={(e) =>
360 |                       setForm({ ...form, totalSum: +e.target.value })
361 |                     }
362 |                     className="w-28 text-right bg-transparent outline-none font-bold text-lg text-slate-800 focus:bg-blue-50 rounded px-1"
363 |                     placeholder="0"
364 |                   />
365 |                   <span className="text-slate-400 text-sm">грн</span>
366 |                 </span>
367 |               </div>
368 | 
369 |               {/* НОВЕ: Змінний відсоток для закладу */}
370 |               <div className="flex items-center justify-between py-2 border-b border-slate-50">
371 |                 <span className="text-sm text-slate-500">Відсоток закладу</span>
372 |                 <NumberField
373 |                   value={form.schoolPercentage}
374 |                   onChange={(v) => setForm({ ...form, schoolPercentage: v })}
375 |                   suffix="%"
376 |                 />
377 |               </div>
378 | 
379 |               <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
380 |                 <span>{formatMoney(schoolSum)} грн</span>
381 |               </Row>
382 | 
383 |               <div className="py-3 border-b border-slate-50">
384 |                 <div className="flex items-center justify-between mb-2">
385 |                   <span className="text-sm text-slate-500">
386 |                     Додаткові витрати
387 |                   </span>
388 |                   <span className="text-sm font-medium text-rose-500">
389 |                     −{formatMoney(totalExpenses)} грн
390 |                   </span>
391 |                 </div>
392 |                 {expenses.length > 0 && (
393 |                   <div className="flex flex-wrap gap-1.5 mb-2">
394 |                     {expenses.map((exp, i) => (
395 |                       <span
396 |                         key={i}
397 |                         className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs"
398 |                       >
399 |                         <span className="text-slate-600">{exp.name}</span>
400 |                         <span className="font-semibold text-slate-700">
401 |                           {formatMoney(exp.amount)} грн
402 |                         </span>
403 |                         <button
404 |                           onClick={() => removeExpense(i)}
405 |                           className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white"
406 |                         >
407 |                           ✕
408 |                         </button>
409 |                       </span>
410 |                     ))}
411 |                   </div>
412 |                 )}
413 |                 <div className="flex gap-2 mt-2">
414 |                   <input
415 |                     placeholder="Назва витрати"
416 |                     value={newExp.name}
417 |                     onChange={(e) =>
418 |                       setNewExp({ ...newExp, name: e.target.value })
419 |                     }
420 |                     className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
421 |                   />
422 |                   <input
423 |                     type="number"
424 |                     min={0}
425 |                     placeholder="грн"
426 |                     value={newExp.amount}
427 |                     onChange={(e) =>
428 |                       setNewExp({ ...newExp, amount: e.target.value })
429 |                     }
430 |                     className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
431 |                   />
432 |                   <button
433 |                     onClick={addExpense}
434 |                     type="button"
435 |                     className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
436 |                   >
437 |                     +
438 |                   </button>
439 |                 </div>
440 |               </div>
441 |               <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
442 |                 <span className="text-sm font-semibold text-emerald-700">
443 |                   Залишок ({100 - form.schoolPercentage}%)
444 |                 </span>
445 |                 <span className="text-lg font-bold text-emerald-700">
446 |                   {formatMoney(remainder)} грн
447 |                 </span>
448 |               </div>
449 |             </div>
450 |             {crewMembers.length > 0 && (
451 |               <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
452 |                 <CardHeader
453 |                   icon={
454 |                     <svg
455 |                       viewBox="0 0 24 24"
456 |                       fill="none"
457 |                       stroke="currentColor"
458 |                       strokeWidth="2"
459 |                       strokeLinecap="round"
460 |                       strokeLinejoin="round"
461 |                       className="w-4 h-4"
462 |                     >
463 |                       <circle cx="12" cy="8" r="6" />
464 |                       <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
465 |                     </svg>
466 |                   }
467 |                   color="bg-blue-50 text-blue-600"
468 |                   title="Заробітня плата"
469 |                 />
470 |                 <div className="space-y-1">
471 |                   {crewMembers.map((m) => (
472 |                     <Row key={m.id} label={`${m.name} (${m.role})`}>
473 |                       <span className="inline-flex items-center gap-1">
474 |                         <input
475 |                           type="number"
476 |                           min={0}
477 |                           value={salaries[m.id] || ""}
478 |                           onChange={(e) =>
479 |                             setSalaries((prev) => ({
480 |                               ...prev,
481 |                               [m.id]: +e.target.value,
482 |                             }))
483 |                           }
484 |                           className="w-24 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1"
485 |                           placeholder="0"
486 |                         />
487 |                         <span className="text-slate-400 text-xs">грн</span>
488 |                       </span>
489 |                     </Row>
490 |                   ))}
491 |                 </div>
492 |                 {crewMembers.some((m) => salaries[m.id] > 0) && (
493 |                   <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
494 |                     <span className="text-sm font-semibold text-slate-500">
495 |                       Разом ЗП
496 |                     </span>
497 |                     <span className="font-bold text-blue-600">
498 |                       {formatMoney(
499 |                         crewMembers.reduce(
500 |                           (s, m) => s + (salaries[m.id] || 0),
501 |                           0,
502 |                         ),
503 |                       )}{" "}
504 |                       грн
505 |                     </span>
506 |                   </div>
507 |                 )}
508 |               </div>
509 |             )}
510 |           </div>
511 |         </div>
512 | 
513 |         {/* Footer */}
514 |         <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-slate-100 bg-white shrink-0">
515 |           <button
516 |             onClick={onClose}
517 |             className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3"
518 |           >
519 |             Скасувати
520 |           </button>
521 |           <button
522 |             onClick={handleSave}
523 |             className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3"
524 |           >
525 |             Зберегти звіт
526 |           </button>
527 |         </div>
528 |       </div>
529 |     </div>
530 |   );
531 | }
532 | 
```

### File: apps/frontend/src/components/school-profile/modals/RescheduleModal.tsx
```tsx
  0 | import { useState } from 'react';
  1 | import { api } from '../../../config/api';
  2 | 
  3 | interface RescheduleModalProps {
  4 |   isOpen: boolean;
  5 |   onClose: () => void;
  6 |   eventId: string;
  7 |   currentDate: string;
  8 |   currentTime: string;
  9 |   onSuccess: () => void;
 10 | }
 11 | 
 12 | export default function RescheduleModal({
 13 |   isOpen,
 14 |   onClose,
 15 |   eventId,
 16 |   currentDate,
 17 |   currentTime,
 18 |   onSuccess,
 19 | }: RescheduleModalProps) {
 20 |   const [date, setDate] = useState(currentDate.slice(0, 10));
 21 |   const [time, setTime] = useState(currentTime || '');
 22 |   const [loading, setLoading] = useState(false);
 23 | 
 24 |   if (!isOpen) return null;
 25 | 
 26 |   const handleSave = async () => {
 27 |     setLoading(true);
 28 |     try {
 29 |       await api.patch(`/events/${eventId}/reschedule`, { date, time });
 30 |       onSuccess();
 31 |       onClose();
 32 |     } catch (e) {
 33 |       console.error('Помилка перенесення:', e);
 34 |     } finally {
 35 |       setLoading(false);
 36 |     }
 37 |   };
 38 | 
 39 |   return (
 40 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 41 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
 42 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
 43 |         <div className="p-5 border-b border-slate-100 flex justify-between bg-slate-50">
 44 |           <h3 className="text-lg font-bold text-slate-800">📅 Перенести подію</h3>
 45 |           <button onClick={onClose} className="text-slate-400 p-1">✕</button>
 46 |         </div>
 47 |         <div className="p-5 flex flex-col gap-4 overflow-y-auto">
 48 |           <div>
 49 |             <label className="block text-sm mb-1 text-slate-600">Нова дата</label>
 50 |             <input
 51 |               type="date"
 52 |               value={date}
 53 |               onChange={e => setDate(e.target.value)}
 54 |               className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 55 |             />
 56 |           </div>
 57 |           <div>
 58 |             <label className="block text-sm mb-1 text-slate-600">Новий час</label>
 59 |             <input
 60 |               type="time"
 61 |               value={time}
 62 |               onChange={e => setTime(e.target.value)}
 63 |               className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 64 |             />
 65 |           </div>
 66 |           <div className="flex gap-3 pt-2">
 67 |             <button
 68 |               onClick={onClose}
 69 |               className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors"
 70 |             >
 71 |               Скасувати
 72 |             </button>
 73 |             <button
 74 |               onClick={handleSave}
 75 |               disabled={loading}
 76 |               className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
 77 |             >
 78 |               {loading ? 'Збереження...' : 'Зберегти'}
 79 |             </button>
 80 |           </div>
 81 |         </div>
 82 |       </div>
 83 |     </div>
 84 |   );
 85 | }
 86 | 
```

### File: apps/frontend/src/components/schools/SchoolDesktopTable.tsx
```tsx
  0 | import React from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | 
  3 | interface Props {
  4 |   schools: any[];
  5 |   searchQuery: string;
  6 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  7 |   stages: any[];
  8 | }
  9 | 
 10 | // Мемоізований компонент рядка таблиці
 11 | export const SchoolRow = React.memo(({ school, onDelete, stages, navigate }: any) => {
 12 |   const latestEvent = school.events?.[0];
 13 |   const stage = latestEvent
 14 |     ? stages.find((s: any) => s.key === latestEvent.status)
 15 |     : null;
 16 | 
 17 |   return (
 18 |     <tr
 19 |       onClick={() => navigate(`/schools/${school.id}`)}
 20 |       className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/80 transition-colors"
 21 |     >
 22 |       <td className="p-4 text-slate-800 font-bold">{school.name}</td>
 23 |       <td className="p-4 text-slate-600 font-medium">{school.city?.name}</td>
 24 |       <td className="p-4">
 25 |         <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
 26 |           Активна
 27 |         </span>
 28 |       </td>
 29 |       <td className="p-4">
 30 |         {stage ? (
 31 |           <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
 32 |             {stage.name}
 33 |           </span>
 34 |         ) : (
 35 |           <span className="text-slate-400 text-xs italic">—</span>
 36 |         )}
 37 |       </td>
 38 |       <td className="p-4 text-center">
 39 |         <button
 40 |           onClick={(e) => onDelete(e, school.id, school.name)}
 41 |           className="text-slate-300 hover:text-red-500 transition-colors p-2 text-lg"
 42 |         >
 43 |           🗑
 44 |         </button>
 45 |       </td>
 46 |     </tr>
 47 |   );
 48 | });
 49 | 
 50 | SchoolRow.displayName = "SchoolRow";
 51 | 
 52 | export default function SchoolDesktopTable({
 53 |   schools,
 54 |   searchQuery,
 55 |   onDelete,
 56 |   stages,
 57 | }: Props) {
 58 |   const navigate = useNavigate();
 59 | 
 60 |   return (
 61 |     <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
 62 |       <div className="overflow-y-auto flex-1">
 63 |         <table className="w-full text-left border-collapse">
 64 |           <thead className="sticky top-0 z-10 bg-slate-50">
 65 |             <tr className="border-b border-slate-100">
 66 |               <th className="p-4 font-medium text-slate-600">Назва школи</th>
 67 |               <th className="p-4 font-medium text-slate-600">Місто</th>
 68 |               <th className="p-4 font-medium text-slate-600">Статус</th>
 69 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
 70 |               <th className="p-4 font-medium text-slate-600 text-center">
 71 |                 Дія
 72 |               </th>
 73 |             </tr>
 74 |           </thead>
 75 |           <tbody>
 76 |             {schools.map((school) => (
 77 |               <SchoolRow
 78 |                 key={school.id}
 79 |                 school={school}
 80 |                 onDelete={onDelete}
 81 |                 stages={stages}
 82 |                 navigate={navigate}
 83 |               />
 84 |             ))}
 85 |           </tbody>
 86 |         </table>
 87 |         {schools.length === 0 && (
 88 |           <div className="text-center py-16 text-slate-400 text-sm font-medium">
 89 |             {searchQuery
 90 |               ? `Нічого не знайдено за «${searchQuery}»`
 91 |               : "Шкіл ще немає"}
 92 |           </div>
 93 |         )}
 94 |       </div>
 95 |     </div>
 96 |   );
 97 | }
 98 | 
```

### File: apps/frontend/src/components/schools/SchoolMobileList.tsx
```tsx
  0 | import React from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | 
  3 | interface Props {
  4 |   schools: any[];
  5 |   searchQuery: string;
  6 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  7 |   stages: any[];
  8 | }
  9 | 
 10 | function stalenessColor(days: number | null): string {
 11 |   if (days === null) return "text-slate-400";
 12 |   if (days >= 21) return "text-red-500";
 13 |   if (days >= 14) return "text-orange-500";
 14 |   if (days >= 7) return "text-amber-500";
 15 |   return "text-emerald-500";
 16 | }
 17 | 
 18 | // Мемоізований компонент картки
 19 | export const SchoolCard = React.memo(({ school, onDelete, stages }: any) => {
 20 |   const navigate = useNavigate();
 21 | 
 22 |   const latestEvent = school.events?.[0];
 23 |   const stage = latestEvent
 24 |     ? stages.find((s: any) => s.key === latestEvent.status)
 25 |     : null;
 26 |   const lastActivityDate =
 27 |     school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
 28 |   const daysStale = lastActivityDate
 29 |     ? Math.floor((Date.now() - new Date(lastActivityDate).getTime()) / 86400000)
 30 |     : null;
 31 | 
 32 |   return (
 33 |     <div
 34 |       onClick={() => navigate(`/schools/${school.id}`)}
 35 |       className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform cursor-pointer"
 36 |     >
 37 |       <div className="flex items-start justify-between gap-2">
 38 |         <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
 39 |           {school.name}
 40 |         </p>
 41 |         <button
 42 |           onClick={(e) => onDelete(e, school.id, school.name)}
 43 |           className="text-slate-300 active:text-red-500 transition-colors p-1 -mt-0.5 -mr-1 shrink-0"
 44 |         >
 45 |           🗑
 46 |         </button>
 47 |       </div>
 48 | 
 49 |       <div className="flex items-center justify-between gap-2 mt-2">
 50 |         <div className="flex items-center gap-1.5 min-w-0">
 51 |           {school.phone ? (
 52 |             <a
 53 |               href={`tel:${school.phone}`}
 54 |               onClick={(e) => e.stopPropagation()}
 55 |               className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
 56 |             >
 57 |               📞 {school.director || school.phone}
 58 |             </a>
 59 |           ) : school.director ? (
 60 |             <span className="text-xs text-slate-500 truncate">
 61 |               👤 {school.director}
 62 |             </span>
 63 |           ) : (
 64 |             <span className="text-xs text-slate-300 italic">
 65 |               Контакт не вказано
 66 |             </span>
 67 |           )}
 68 |         </div>
 69 | 
 70 |         {stage ? (
 71 |           <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
 72 |             {stage.name}
 73 |           </span>
 74 |         ) : (
 75 |           <span className="text-[10px] text-slate-300 shrink-0">Етап —</span>
 76 |         )}
 77 |       </div>
 78 | 
 79 |       {daysStale !== null && (
 80 |         <p className={`text-[11px] mt-1.5 ${stalenessColor(daysStale)}`}>
 81 |           ⏱{" "}
 82 |           {daysStale === 0
 83 |             ? "Активність сьогодні"
 84 |             : `Остання активність ${daysStale} дн тому`}
 85 |         </p>
 86 |       )}
 87 |     </div>
 88 |   );
 89 | });
 90 | 
 91 | SchoolCard.displayName = "SchoolCard";
 92 | 
 93 | export default function SchoolMobileList({
 94 |   schools,
 95 |   searchQuery,
 96 |   onDelete,
 97 |   stages,
 98 | }: Props) {
 99 |   return (
100 |     <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-2.5 pb-24">
101 |       {schools.map((school) => (
102 |         <SchoolCard
103 |           key={school.id}
104 |           school={school}
105 |           onDelete={onDelete}
106 |           stages={stages}
107 |         />
108 |       ))}
109 | 
110 |       {schools.length === 0 && (
111 |         <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
112 |           {searchQuery
113 |             ? `Нічого не знайдено за «${searchQuery}»`
114 |             : "Шкіл ще немає"}
115 |         </div>
116 |       )}
117 |     </div>
118 |   );
119 | }
120 | 
```

### File: apps/frontend/src/components/schools/StatsBar.tsx
```tsx
  0 | import React from "react";
  1 | export { classifySchool, classifySize } from "./schoolUtils";
  2 | import { classifySchool, classifySize } from "./schoolUtils";
  3 | interface School {
  4 |   id: string;
  5 |   childrenCount?: number;
  6 |   events?: any[];
  7 | }
  8 | 
  9 | interface StatsBarProps {
 10 |   schools: School[];
 11 |   activeFilter: string | null;
 12 |   onFilterChange: (filter: string | null) => void;
 13 |   sizeFilter: string | null;
 14 |   onSizeFilterChange: (filter: string | null) => void;
 15 |   schoolType?: "Школа" | "Садочок";
 16 | }
 17 | 
 18 | 
 19 | const STATUS_ITEMS = [
 20 |   {
 21 |     key: "new",
 22 |     label: "Нові",
 23 |     dot: "bg-slate-400",
 24 |     active: "bg-slate-800 text-white",
 25 |     inactive: "text-slate-600",
 26 |   },
 27 |   {
 28 |     key: "planned",
 29 |     label: "Заплановані",
 30 |     dot: "bg-amber-400",
 31 |     active: "bg-amber-500 text-white",
 32 |     inactive: "text-amber-600",
 33 |   },
 34 |   {
 35 |     key: "inProgress",
 36 |     label: "В роботі",
 37 |     dot: "bg-blue-500",
 38 |     active: "bg-blue-600 text-white",
 39 |     inactive: "text-blue-600",
 40 |   },
 41 |   {
 42 |     key: "done",
 43 |     label: "Проведені",
 44 |     dot: "bg-emerald-500",
 45 |     active: "bg-emerald-600 text-white",
 46 |     inactive: "text-emerald-600",
 47 |   },
 48 | ];
 49 | 
 50 | const SIZE_ITEMS_SCHOOL = [
 51 |   {
 52 |     key: "small",
 53 |     label: "Малі",
 54 |     sublabel: "< 150",
 55 |     active: "bg-violet-600 text-white",
 56 |     inactive: "text-violet-600",
 57 |   },
 58 |   {
 59 |     key: "medium",
 60 |     label: "Середні",
 61 |     sublabel: "150–500",
 62 |     active: "bg-violet-600 text-white",
 63 |     inactive: "text-violet-600",
 64 |   },
 65 |   {
 66 |     key: "large",
 67 |     label: "Великі",
 68 |     sublabel: "500+",
 69 |     active: "bg-violet-600 text-white",
 70 |     inactive: "text-violet-600",
 71 |   },
 72 | ];
 73 | 
 74 | const SIZE_ITEMS_KINDER = [
 75 |   {
 76 |     key: "small",
 77 |     label: "Малі",
 78 |     sublabel: "< 50",
 79 |     active: "bg-violet-600 text-white",
 80 |     inactive: "text-violet-600",
 81 |   },
 82 |   {
 83 |     key: "medium",
 84 |     label: "Середні",
 85 |     sublabel: "50–100",
 86 |     active: "bg-violet-600 text-white",
 87 |     inactive: "text-violet-600",
 88 |   },
 89 |   {
 90 |     key: "large",
 91 |     label: "Великі",
 92 |     sublabel: "100+",
 93 |     active: "bg-violet-600 text-white",
 94 |     inactive: "text-violet-600",
 95 |   },
 96 | ];
 97 | 
 98 | export default function StatsBar({
 99 |   schools,
100 |   activeFilter,
101 |   onFilterChange,
102 |   sizeFilter,
103 |   onSizeFilterChange,
104 |   schoolType = "Школа",
105 | }: StatsBarProps) {
106 |   const statusStats = schools.reduce(
107 |     (acc, s) => {
108 |       acc[classifySchool(s)]++;
109 |       return acc;
110 |     },
111 |     { new: 0, planned: 0, inProgress: 0, done: 0 } as Record<string, number>,
112 |   );
113 | 
114 |   const sizeStats = schools.reduce(
115 |     (acc, s) => {
116 |       acc[classifySize(s, schoolType)]++;
117 |       return acc;
118 |     },
119 |     { small: 0, medium: 0, large: 0 } as Record<string, number>,
120 |   );
121 | 
122 |   const sizeItems =
123 |     schoolType === "Садочок" ? SIZE_ITEMS_KINDER : SIZE_ITEMS_SCHOOL;
124 |   const hasAnyFilter = activeFilter || sizeFilter;
125 | 
126 |   return (
127 |     <div className="flex flex-col gap-2 mb-4">
128 |       {/* Рядок 1: статус */}
129 |       <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
130 |         {STATUS_ITEMS.map((item, i) => {
131 |           const isActive = activeFilter === item.key;
132 |           return (
133 |             <React.Fragment key={item.key}>
134 |               {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
135 |               <button
136 |                 onClick={() => onFilterChange(isActive ? null : item.key)}
137 |                 className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
138 |                   isActive
139 |                     ? item.active
140 |                     : `bg-white ${item.inactive} hover:bg-slate-50`
141 |                 }`}
142 |               >
143 |                 <span className="text-base font-bold tabular-nums leading-none">
144 |                   {statusStats[item.key] ?? 0}
145 |                 </span>
146 |                 <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
147 |                   {item.label}
148 |                 </span>
149 |               </button>
150 |             </React.Fragment>
151 |           );
152 |         })}
153 |         {activeFilter && (
154 |           <button
155 |             onClick={() => onFilterChange(null)}
156 |             className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
157 |           >
158 |             ✕
159 |           </button>
160 |         )}
161 |       </div>
162 | 
163 |       {/* Рядок 2: розмір */}
164 |       <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
165 |         {sizeItems.map((item, i) => {
166 |           const isActive = sizeFilter === item.key;
167 |           return (
168 |             <React.Fragment key={item.key}>
169 |               {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
170 |               <button
171 |                 onClick={() => onSizeFilterChange(isActive ? null : item.key)}
172 |                 className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
173 |                   isActive
174 |                     ? item.active
175 |                     : `bg-white ${item.inactive} hover:bg-slate-50`
176 |                 }`}
177 |               >
178 |                 <span className="text-base font-bold tabular-nums leading-none">
179 |                   {sizeStats[item.key] ?? 0}
180 |                 </span>
181 |                 <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
182 |                   {item.label}
183 |                   <span className="opacity-60 ml-0.5">{item.sublabel}</span>
184 |                 </span>
185 |               </button>
186 |             </React.Fragment>
187 |           );
188 |         })}
189 |         {sizeFilter && (
190 |           <button
191 |             onClick={() => onSizeFilterChange(null)}
192 |             className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
193 |           >
194 |             ✕
195 |           </button>
196 |         )}
197 |       </div>
198 |     </div>
199 |   );
200 | }
201 | 
```

### File: apps/frontend/src/components/schools/VirtualDesktopTable.tsx
```tsx
  0 | import { useRef } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { useVirtualizer } from "@tanstack/react-virtual";
  3 | import { SchoolRow } from "./SchoolDesktopTable";
  4 | 
  5 | interface Props {
  6 |   schools: any[];
  7 |   searchQuery: string;
  8 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  9 |   stages: any[];
 10 | }
 11 | 
 12 | export default function VirtualDesktopTable({ schools, searchQuery, onDelete, stages }: Props) {
 13 |   const navigate = useNavigate();
 14 |   const parentRef = useRef<HTMLDivElement>(null);
 15 | 
 16 |   const rowVirtualizer = useVirtualizer({
 17 |     count: schools.length,
 18 |     getScrollElement: () => parentRef.current,
 19 |     estimateSize: () => 57, // висота tr з padding p-4
 20 |     overscan: 8,
 21 |   });
 22 | 
 23 |   return (
 24 |     <div ref={parentRef} className="overflow-y-auto flex-1 h-full">
 25 |       <table className="w-full text-left border-collapse">
 26 |         <thead className="sticky top-0 z-10 bg-slate-50">
 27 |           <tr className="border-b border-slate-100">
 28 |             <th className="p-4 font-medium text-slate-600">Назва школи</th>
 29 |             <th className="p-4 font-medium text-slate-600">Місто</th>
 30 |             <th className="p-4 font-medium text-slate-600">Статус</th>
 31 |             <th className="p-4 font-medium text-slate-600">Поточний етап</th>
 32 |             <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
 33 |           </tr>
 34 |         </thead>
 35 |         <tbody
 36 |           style={{
 37 |             height: `${rowVirtualizer.getTotalSize()}px`,
 38 |             width: "100%",
 39 |             position: "relative",
 40 |             display: "block",
 41 |           }}
 42 |         >
 43 |           {rowVirtualizer.getVirtualItems().map((virtualRow) => (
 44 |             <tr
 45 |               key={virtualRow.key}
 46 |               style={{
 47 |                 position: "absolute",
 48 |                 top: 0,
 49 |                 left: 0,
 50 |                 width: "100%",
 51 |                 height: `${virtualRow.size}px`,
 52 |                 transform: `translateY(${virtualRow.start}px)`,
 53 |                 display: "table",
 54 |                 tableLayout: "fixed",
 55 |               }}
 56 |             >
 57 |               <SchoolRow
 58 |                 school={schools[virtualRow.index]}
 59 |                 onDelete={onDelete}
 60 |                 stages={stages}
 61 |                 navigate={navigate}
 62 |               />
 63 |             </tr>
 64 |           ))}
 65 |         </tbody>
 66 |       </table>
 67 | 
 68 |       {schools.length === 0 && (
 69 |         <div className="text-center py-16 text-slate-400 text-sm font-medium">
 70 |           {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
 71 |         </div>
 72 |       )}
 73 |     </div>
 74 |   );
 75 | }
```

### File: apps/frontend/src/components/schools/schoolUtils.ts
```ts
  0 | // apps/frontend/src/components/schools/schoolUtils.ts
  1 | 
  2 | const PLANNED_STAGES = ["BASE", "FIRST_CONTACT", "DATE_CONFIRMED"];
  3 | const IN_PROGRESS_STAGES = ["PREPARATION", "IN_PROGRESS", "DONE", "REPORT"];
  4 | 
  5 | interface School {
  6 |   childrenCount?: number;
  7 |   events?: any[];
  8 |   isHotClient?: boolean;
  9 | }
 10 | 
 11 | export function classifySchool(
 12 |   school: School,
 13 | ): "new" | "planned" | "inProgress" | "done" {
 14 |   const events = (school.events || []).filter(
 15 |     (e: any) => e.status !== "RE_SALE",
 16 |   );
 17 |   if (events.length === 0) {
 18 |     return (school.events || []).some((e: any) => e.status === "RE_SALE")
 19 |       ? "done"
 20 |       : "new";
 21 |   }
 22 |   const latest = events[events.length - 1];
 23 |   if (PLANNED_STAGES.includes(latest.status)) return "planned";
 24 |   if (IN_PROGRESS_STAGES.includes(latest.status)) return "inProgress";
 25 |   if (latest.status === "RE_SALE") return "done";
 26 |   return "new";
 27 | }
 28 | 
 29 | export function classifySize(
 30 |   school: School,
 31 |   schoolType: "Школа" | "Садочок" = "Школа",
 32 | ): "small" | "medium" | "large" {
 33 |   const count = school.childrenCount ?? 0;
 34 |   if (schoolType === "Садочок") {
 35 |     if (count < 50) return "small";
 36 |     if (count < 100) return "medium";
 37 |     return "large";
 38 |   }
 39 |   if (count < 500) return "small";
 40 |   if (count < 900) return "medium";
 41 |   return "large";
 42 | }
 43 | 
```

### File: apps/frontend/src/components/ui/OptimizedImage.tsx
```tsx
  0 | import { ImgHTMLAttributes } from 'react';
  1 | 
  2 | interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  3 |   width?: number | string;
  4 |   height?: number | string;
  5 | }
  6 | 
  7 | export default function OptimizedImage({
  8 |   src,
  9 |   alt,
 10 |   width,
 11 |   height,
 12 |   className = "",
 13 |   ...props
 14 | }: OptimizedImageProps) {
 15 |   return (
 16 |     <img
 17 |       src={src}
 18 |       alt={alt || "Image"}
 19 |       width={width}
 20 |       height={height}
 21 |       loading="lazy"
 22 |       decoding="async"
 23 |       className={`object-cover ${className}`}
 24 |       {...props}
 25 |     />
 26 |   );
 27 | }
 28 | 
```

### File: apps/frontend/src/components/ui/Skeleton.tsx
```tsx
  0 | export const SkeletonCard = () => (
  1 |   <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
  2 |     <div className="h-44 bg-slate-200 w-full"></div>
  3 |     <div className="p-5 flex flex-col gap-3">
  4 |       <div className="h-6 bg-slate-200 rounded w-1/2"></div>
  5 |       <div className="h-4 bg-slate-200 rounded w-3/4"></div>
  6 |       <div className="h-4 bg-slate-200 rounded w-1/2"></div>
  7 |     </div>
  8 |   </div>
  9 | );
```

### File: apps/frontend/src/config/api.ts
```ts
  0 | // apps/frontend/src/config/api.ts
  1 | import axios from 'axios';
  2 | 
  3 | export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crm-57qd.onrender.com';
  4 | 
  5 | export const api = axios.create({ baseURL: API_BASE_URL });
  6 | 
  7 | api.interceptors.request.use(config => {
  8 |   const token = localStorage.getItem('token');
  9 |   if (token) config.headers.Authorization = `Bearer ${token}`;
 10 |   return config;
 11 | });
 12 | 
```

### File: apps/frontend/src/context/CityContext.tsx
```tsx
  0 | import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
  1 | 
  2 | interface SelectedCity {
  3 |   id: string;
  4 |   name: string;
  5 | }
  6 | 
  7 | interface CityContextType {
  8 |   selectedCity: SelectedCity;
  9 |   setSelectedCity: (city: SelectedCity) => void;
 10 | }
 11 | 
 12 | const DEFAULT_CITY: SelectedCity = { id: '', name: 'Львів' };
 13 | 
 14 | const CityContext = createContext<CityContextType>({
 15 |   selectedCity: DEFAULT_CITY,
 16 |   setSelectedCity: () => {},
 17 | });
 18 | 
 19 | export function CityProvider({ children }: { children: ReactNode }) {
 20 |   const [selectedCity, setSelectedCityState] = useState<SelectedCity>(() => {
 21 |     try {
 22 |       const raw = localStorage.getItem('selectedCity');
 23 |       return raw ? JSON.parse(raw) : DEFAULT_CITY;
 24 |     } catch {
 25 |       return DEFAULT_CITY;
 26 |     }
 27 |   });
 28 | 
 29 |   const setSelectedCity = (city: SelectedCity) => {
 30 |     setSelectedCityState(city);
 31 |     localStorage.setItem('selectedCity', JSON.stringify(city));
 32 |   };
 33 | 
 34 |   return (
 35 |     <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
 36 |       {children}
 37 |     </CityContext.Provider>
 38 |   );
 39 | }
 40 | 
 41 | export function useSelectedCity() {
 42 |   return useContext(CityContext);
 43 | }
 44 | 
```

### File: apps/frontend/src/hooks/useAuth.ts
```ts
  0 | import { useEffect, useState } from 'react';
  1 | import { useNavigate } from 'react-router-dom';
  2 | 
  3 | export function useAuth() {
  4 |   const navigate = useNavigate();
  5 |   const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);
  6 | 
  7 |   useEffect(() => {
  8 |     const raw = localStorage.getItem('user');
  9 |     if (!raw) { navigate('/login'); return; }
 10 |     try { setUser(JSON.parse(raw)); } catch { navigate('/login'); }
 11 |   }, [navigate]);
 12 | 
 13 |   const logout = () => {
 14 |     localStorage.removeItem('token');
 15 |     localStorage.removeItem('user');
 16 |     navigate('/login');
 17 |   };
 18 | 
 19 |   return { user, logout };
 20 | }
```

### File: apps/frontend/src/index.css
```css
  0 | 
  1 | 
  2 | @tailwind base;
  3 | @tailwind components;
  4 | @tailwind utilities;
  5 | 
  6 | 
```

### File: apps/frontend/src/main.tsx
```tsx
  0 | 
  1 | 
  2 | import { StrictMode } from 'react';
  3 | import { createRoot } from 'react-dom/client';
  4 | import './index.css';
  5 | import App from './App';
  6 | 
  7 | createRoot(document.getElementById('root')!).render(
  8 |   <StrictMode>
  9 |     <App />
 10 |   </StrictMode>,
 11 | );
 12 | 
 13 | 
```

### File: apps/frontend/src/pages/CalendarView.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { api } from "../config/api";
  2 | import { useSelectedCity } from "../context/CityContext";
  3 | import { useNavigate } from "react-router-dom";
  4 | 
  5 | interface CalendarEvent {
  6 |   id: string;
  7 |   project: string;
  8 |   date: string;
  9 |   time?: string;
 10 |   status: string;
 11 |   school?: { id: string; name: string };
 12 |   city?: { id: string; name: string };
 13 |   crew?: { id: string; name: string };
 14 | }
 15 | 
 16 | export default function CalendarView() {
 17 |   const [events, setEvents] = useState<CalendarEvent[]>([]);
 18 |   const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
 19 |   const [projects, setProjects] = useState<any[]>([])
 20 |   const [currentDate, setCurrentDate] = useState(new Date());
 21 |   const [isLoading, setIsLoading] = useState(true);
 22 |   const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
 23 |     new Date(),
 24 |   );
 25 | 
 26 |   const { selectedCity } = useSelectedCity();
 27 |   const navigate = useNavigate();
 28 | 
 29 |   const [userRole, setUserRole] = useState<string>("GUEST");
 30 |   const [filterCityId, setFilterCityId] = useState<string>("ALL");
 31 | 
 32 |   // Не забудьте додати стейт для проєктів на початку компонента (якщо ще не додали):
 33 |   // const [projects, setProjects] = useState<any[]>([]);
 34 | 
 35 |   useEffect(() => {
 36 |     try {
 37 |       const token = localStorage.getItem("token");
 38 |       if (token) {
 39 |         const payload = JSON.parse(atob(token.split(".")[1]));
 40 |         setUserRole(payload.role);
 41 |         if (payload.role === "MANAGER" && selectedCity?.id) {
 42 |           setFilterCityId(selectedCity.id);
 43 |         }
 44 |       }
 45 |     } catch (e) {
 46 |       console.error("Помилка парсингу токена", e);
 47 |     }
 48 |   }, [selectedCity]);
 49 | 
 50 |   useEffect(() => {
 51 |     const fetchData = async () => {
 52 |       try {
 53 |         const headers = {
 54 |           Authorization: `Bearer ${localStorage.getItem("token")}`,
 55 |         };
 56 |         // ДОДАНО: api.get("/projects") та projRes
 57 |         const [eventsRes, citiesRes, projRes] = await Promise.all([
 58 |           api.get("/events", { headers }),
 59 |           api.get("/cities", { headers }),
 60 |           api.get("/projects", { headers }),
 61 |         ]);
 62 |         setEvents(eventsRes.data);
 63 |         setCities(citiesRes.data);
 64 |         setProjects(projRes.data); // ДОДАНО
 65 |       } catch (error) {
 66 |         console.error("Помилка завантаження календаря", error);
 67 |       } finally {
 68 |         setIsLoading(false);
 69 |       }
 70 |     };
 71 |     fetchData();
 72 |   }, []);
 73 | 
 74 |   const nextMonth = () =>
 75 |     setCurrentDate(
 76 |       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
 77 |     );
 78 |   const prevMonth = () =>
 79 |     setCurrentDate(
 80 |       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
 81 |     );
 82 |   const today = () => {
 83 |     setCurrentDate(new Date());
 84 |     setSelectedMobileDate(new Date());
 85 |   };
 86 | 
 87 |   const getDaysInMonth = (year: number, month: number) =>
 88 |     new Date(year, month + 1, 0).getDate();
 89 |   const getFirstDayOfMonth = (year: number, month: number) => {
 90 |     let day = new Date(year, month, 1).getDay();
 91 |     return day === 0 ? 6 : day - 1;
 92 |   };
 93 | 
 94 |   const year = currentDate.getFullYear();
 95 |   const month = currentDate.getMonth();
 96 |   const daysInMonth = getDaysInMonth(year, month);
 97 |   const firstDay = getFirstDayOfMonth(year, month);
 98 | 
 99 |   const days = [];
100 |   for (let i = 0; i < firstDay; i++) days.push(null);
101 |   for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
102 | 
103 |   const filteredEvents = events.filter((ev) => {
104 |     if (ev.status === "RE_SALE") return false;
105 |     if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
106 |     return true;
107 |   });
108 | 
109 |   const getEventsForDay = (date: Date) => {
110 |     return filteredEvents.filter((ev) => {
111 |       const evDate = new Date(ev.date);
112 |       return (
113 |         evDate.getFullYear() === date.getFullYear() &&
114 |         evDate.getMonth() === date.getMonth() &&
115 |         evDate.getDate() === date.getDate()
116 |       );
117 |     });
118 |   };
119 | 
120 |   const monthNames = [
121 |     "Січень",
122 |     "Лютий",
123 |     "Березень",
124 |     "Квітень",
125 |     "Травень",
126 |     "Червень",
127 |     "Липень",
128 |     "Серпень",
129 |     "Вересень",
130 |     "Жовтень",
131 |     "Листопад",
132 |     "Грудень",
133 |   ];
134 | 
135 |   // Логіка кольорів для проєктів
136 |   const getProjectColor = (projectName: string) => {
137 |     const proj = projects.find((p) => p.name === projectName);
138 |     const color = proj ? proj.color : "blue";
139 | 
140 |     switch (color) {
141 |       case "emerald":
142 |         return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300";
143 |       case "rose":
144 |         return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300";
145 |       case "red":
146 |         return "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400";
147 |       case "amber":
148 |         return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300";
149 |       case "purple":
150 |         return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300";
151 |       default:
152 |         return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300";
153 |     }
154 |   };
155 | 
156 |   if (isLoading)
157 |     return (
158 |       <div className="p-8 h-screen flex flex-col items-center justify-center text-slate-500">
159 |         <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
160 |         <p>Завантаження календаря...</p>
161 |       </div>
162 |     );
163 | 
164 |   const selectedDayEvents = getEventsForDay(selectedMobileDate);
165 | 
166 |   return (
167 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
168 |       {/* Шапка календаря */}
169 |       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
170 |         <div>
171 |           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
172 |             Календар подій
173 |           </h1>
174 |           <p className="text-slate-500 mt-1 text-sm">
175 |             Графік запланованих та активних заходів
176 |           </p>
177 | 
178 |           {/* Легенда */}
179 |           <div className="flex flex-wrap items-center gap-3 mt-4">
180 |             {projects.map((p) => {
181 |               const badgeColor =
182 |                 {
183 |                   blue: "bg-blue-400",
184 |                   emerald: "bg-emerald-400",
185 |                   rose: "bg-rose-400",
186 |                   red: "bg-red-500",
187 |                   amber: "bg-amber-400",
188 |                   purple: "bg-purple-400",
189 |                 }[p.color] || "bg-blue-400";
190 | 
191 |               return (
192 |                 <span
193 |                   key={p.id}
194 |                   className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
195 |                 >
196 |                   <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
197 |                   {p.name}
198 |                 </span>
199 |               );
200 |             })}
201 |           </div>
202 |         </div>
203 | 
204 |         {userRole === "SUPERADMIN" && (
205 |           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 shrink-0">
206 |             <span className="text-sm text-slate-500 font-medium">Місто:</span>
207 |             <select
208 |               value={filterCityId}
209 |               onChange={(e) => setFilterCityId(e.target.value)}
210 |               className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
211 |             >
212 |               <option value="ALL">🌍 Всі міста</option>
213 |               {cities.map((c) => (
214 |                 <option key={c.id} value={c.id}>
215 |                   {c.name}
216 |                 </option>
217 |               ))}
218 |             </select>
219 |           </div>
220 |         )}
221 |       </div>
222 | 
223 |       <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
224 |         {/* Керування місяцями */}
225 |         <div className="flex flex-col sm:flex-row items-center justify-between p-5 md:p-6 border-b border-slate-100 gap-4 bg-white">
226 |           <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
227 |             {monthNames[month]}{" "}
228 |             <span className="text-slate-400 font-medium">{year}</span>
229 |           </h2>
230 |           <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
231 |             <button
232 |               onClick={prevMonth}
233 |               className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
234 |             >
235 |               ◀
236 |             </button>
237 |             <button
238 |               onClick={today}
239 |               className="px-4 md:px-6 py-2 bg-white rounded-xl shadow-sm text-slate-800 font-bold transition-all hover:bg-slate-50"
240 |             >
241 |               Сьогодні
242 |             </button>
243 |             <button
244 |               onClick={nextMonth}
245 |               className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
246 |             >
247 |               ▶
248 |             </button>
249 |           </div>
250 |         </div>
251 | 
252 |         {/* Сітка календаря */}
253 |         <div className="grid grid-cols-7 bg-slate-50/50">
254 |           {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
255 |             <div
256 |               key={dayName}
257 |               className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
258 |             >
259 |               {dayName}
260 |             </div>
261 |           ))}
262 | 
263 |           {days.map((day, idx) => {
264 |             const isToday =
265 |               day && day.toDateString() === new Date().toDateString();
266 |             const isSelected =
267 |               day && day.toDateString() === selectedMobileDate.toDateString();
268 |             const dayEvents = day ? getEventsForDay(day) : [];
269 | 
270 |             return (
271 |               <div
272 |                 key={idx}
273 |                 onClick={() => day && setSelectedMobileDate(day)}
274 |                 className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
275 |                   ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
276 |                   ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
277 |                 `}
278 |               >
279 |                 {day && (
280 |                   <>
281 |                     <div className="flex justify-center md:justify-end mb-1.5">
282 |                       <span
283 |                         className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
284 |                         ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
285 |                       `}
286 |                       >
287 |                         {day.getDate()}
288 |                       </span>
289 |                     </div>
290 | 
291 |                     <div className="space-y-1.5 max-h-[80px] md:max-h-[100px] overflow-y-auto custom-scrollbar pr-0.5">
292 |                       {dayEvents.map((ev) => (
293 |                         <div
294 |                           key={ev.id}
295 |                           className="relative group/event z-0 hover:z-50"
296 |                         >
297 |                           <button
298 |                             onClick={(e) => {
299 |                               e.stopPropagation(); // Щоб не спрацьовував клік по всій клітинці
300 |                               if (ev.school)
301 |                                 navigate(`/schools/${ev.school.id}`);
302 |                             }}
303 |                             className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${getProjectColor(ev.project)}`}
304 |                           >
305 |                             {ev.time || "—"}
306 |                           </button>
307 | 
308 |                           {/* Тултип (тільки для Десктопу) */}
309 |                           <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
310 |                             <p className="font-bold text-sm mb-1 truncate">
311 |                               {ev.school?.name || "Невідомий заклад"}
312 |                             </p>
313 |                             <div className="space-y-1 text-xs text-slate-300">
314 |                               <p>
315 |                                 <span className="text-slate-400">Проєкт:</span>{" "}
316 |                                 {ev.project}
317 |                               </p>
318 |                               <p>
319 |                                 <span className="text-slate-400">Екіпаж:</span>{" "}
320 |                                 {ev.crew?.name || "Не призначено"}
321 |                               </p>
322 |                               <p>
323 |                                 <span className="text-slate-400">Час:</span>{" "}
324 |                                 <span className="font-bold text-white">
325 |                                   {ev.time || "—"}
326 |                                 </span>
327 |                               </p>
328 |                             </div>
329 |                             {/* Трикутник тултипа */}
330 |                             <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
331 |                           </div>
332 |                         </div>
333 |                       ))}
334 |                     </div>
335 |                   </>
336 |                 )}
337 |               </div>
338 |             );
339 |           })}
340 |         </div>
341 |       </div>
342 | 
343 |       {/* Блок подій для мобільних пристроїв (з'являється під календарем) */}
344 |       <div className="mt-6 md:hidden">
345 |         <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
346 |           📅 Події на{" "}
347 |           {selectedMobileDate.toLocaleDateString("uk-UA", {
348 |             day: "2-digit",
349 |             month: "long",
350 |           })}
351 |         </h3>
352 | 
353 |         {selectedDayEvents.length === 0 ? (
354 |           <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">
355 |             На цей день подій не заплановано
356 |           </div>
357 |         ) : (
358 |           <div className="space-y-3">
359 |             {selectedDayEvents.map((ev) => (
360 |               <div
361 |                 key={ev.id}
362 |                 onClick={() =>
363 |                   ev.school && navigate(`/schools/${ev.school.id}`)
364 |                 }
365 |                 className={`bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer
366 |                   ${
367 |                     ev.project.toLowerCase().includes("голограм")
368 |                       ? "border-l-emerald-500"
369 |                       : ev.project.toLowerCase().includes("малювайк")
370 |                         ? "border-l-rose-500"
371 |                         : ev.project.toLowerCase().includes("360")
372 |                           ? "border-l-red-500"
373 |                           : "border-l-blue-500"
374 |                   }
375 |                 `}
376 |               >
377 |                 <div className="flex justify-between items-start mb-2">
378 |                   <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
379 |                     🕒 {ev.time || "Не вказано"}
380 |                   </span>
381 |                   <span className="text-xs font-medium text-slate-500">
382 |                     {ev.project}
383 |                   </span>
384 |                 </div>
385 |                 <p className="font-bold text-slate-800">{ev.school?.name}</p>
386 |                 <p className="text-sm text-slate-500 mt-1">
387 |                   🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
388 |                 </p>
389 |               </div>
390 |             ))}
391 |           </div>
392 |         )}
393 |       </div>
394 |     </div>
395 |   );
396 | }
397 | 
```

### File: apps/frontend/src/pages/Cities.tsx
```tsx
  0 | import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
  1 | import { useSelectedCity } from "../context/CityContext";
  2 | import { api } from "../config/api";
  3 | 
  4 | // --- ДИНАМІЧНІ ІМПОРТИ (Code Splitting) ---
  5 | const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
  6 | const CityMobileHeader = lazy(
  7 |   () => import("../components/cities/CityMobileHeader"),
  8 | );
  9 | const CityMobileList = lazy(
 10 |   () => import("../components/cities/CityMobileList"),
 11 | );
 12 | const CityDesktopGrid = lazy(
 13 |   () => import("../components/cities/CityDesktopGrid"),
 14 | );
 15 | 
 16 | // Оптимізація 1: Скелетне завантаження (Skeleton Screen).
 17 | // Це повністю прибирає проблему CLS (зсув макета) і покращує LCP,
 18 | // оскільки користувач одразу бачить структуру сторінки, а не пустий екран.
 19 | const CitiesSkeleton = () => (
 20 |   <div className="w-full animate-pulse">
 21 |     {/* Мобільний скелетон */}
 22 |     <div className="md:hidden flex flex-col gap-4 mt-4">
 23 |       <div className="h-28 bg-slate-200 rounded-2xl w-full"></div>
 24 |       <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
 25 |       <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
 26 |     </div>
 27 |     {/* Десктопний скелетон */}
 28 |     <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 29 |       {[...Array(3)].map((_, i) => (
 30 |         <div
 31 |           key={i}
 32 |           className="bg-white rounded-2xl shadow-sm border border-slate-100 h-72 overflow-hidden"
 33 |         >
 34 |           <div className="h-44 bg-slate-200 w-full"></div>
 35 |           <div className="p-5 flex flex-col gap-3">
 36 |             <div className="h-6 bg-slate-200 rounded w-1/2"></div>
 37 |             <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
 38 |             <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
 39 |           </div>
 40 |         </div>
 41 |       ))}
 42 |     </div>
 43 |   </div>
 44 | );
 45 | 
 46 | export default function Cities() {
 47 |   const [cities, setCities] = useState([]);
 48 |   const [isModalOpen, setIsModalOpen] = useState(false);
 49 |   const [newCityName, setNewCityName] = useState("");
 50 |   const [isLoading, setIsLoading] = useState(false);
 51 |   const [isFetching, setIsFetching] = useState(true);
 52 | 
 53 |   const { selectedCity, setSelectedCity } = useSelectedCity();
 54 | 
 55 |   // Оптимізація 2: AbortController для запобігання витоку пам'яті (Memory Leaks)
 56 |   useEffect(() => {
 57 |     const abortController = new AbortController();
 58 | 
 59 |     const fetchCities = async () => {
 60 |       setIsFetching(true);
 61 |       try {
 62 |         const response = await api.get("/cities", {
 63 |           signal: abortController.signal,
 64 |         });
 65 |         setCities(response.data);
 66 |       } catch (error: any) {
 67 |         if (error.name !== "CanceledError") {
 68 |           console.error("Помилка при завантаженні міст:", error);
 69 |         }
 70 |       } finally {
 71 |         setIsFetching(false);
 72 |       }
 73 |     };
 74 | 
 75 |     fetchCities();
 76 | 
 77 |     return () => {
 78 |       abortController.abort(); // Скасовуємо запит при розмонтуванні компонента
 79 |     };
 80 |   }, []);
 81 | 
 82 |   // Оптимізація 3: useCallback
 83 |   const handleSelectCity = useCallback(
 84 |     (city: any) => {
 85 |       setSelectedCity(city);
 86 |     },
 87 |     [setSelectedCity],
 88 |   );
 89 | 
 90 |   // Оптимізація 4: Оптимістичне оновлення UI (Optimistic UI Update)
 91 |   const handleAddCity = async (e: React.FormEvent) => {
 92 |     e.preventDefault();
 93 |     if (!newCityName.trim()) return;
 94 |     setIsLoading(true);
 95 | 
 96 |     try {
 97 |       const response = await api.post("/cities", { name: newCityName.trim() });
 98 |       setCities((prev) => [response.data, ...prev] as any);
 99 |       setNewCityName("");
100 |       setIsModalOpen(false);
101 |     } catch (error) {
102 |       alert("Не вдалося створити місто. Можливо воно вже існує.");
103 |     } finally {
104 |       setIsLoading(false);
105 |     }
106 |   };
107 | 
108 |   return (
109 |     // Оптимізація 5: content-visibility
110 |     <div
111 |       className="p-4 md:p-8 bg-slate-50 min-h-screen"
112 |       style={{ contentVisibility: "auto" }}
113 |     >
114 |       {/* Шапка для ПК */}
115 |       <div className="hidden md:flex justify-between items-center mb-8">
116 |         <h1 className="text-3xl font-bold text-slate-800">Міста</h1>
117 |         <button
118 |           onClick={() => setIsModalOpen(true)}
119 |           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-colors"
120 |         >
121 |           <span className="mr-2">+</span> Додати місто
122 |         </button>
123 |       </div>
124 | 
125 |       {isFetching ? (
126 |         <CitiesSkeleton />
127 |       ) : (
128 |         /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
129 |         <Suspense fallback={<CitiesSkeleton />}>
130 |           {/* 1. Блок для Мобільних (Шапка + Список) */}
131 |           <div className="md:hidden">
132 |             <CityMobileHeader selectedCity={selectedCity} cities={cities} />
133 |             <CityMobileList
134 |               cities={cities}
135 |               selectedCity={selectedCity}
136 |               onSelectCity={handleSelectCity}
137 |             />
138 |           </div>
139 | 
140 |           {/* 2. Блок для Десктопів (Карусель + Сітка) */}
141 |           <div className="hidden md:block">
142 |             <IssueCarousel />
143 |             <CityDesktopGrid
144 |               cities={cities}
145 |               selectedCity={selectedCity}
146 |               onSelectCity={handleSelectCity}
147 |             />
148 |           </div>
149 |         </Suspense>
150 |       )}
151 | 
152 |       {/* Мобільна плаваюча кнопка FAB */}
153 |       <button
154 |         onClick={() => setIsModalOpen(true)}
155 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform"
156 |         aria-label="Додати місто"
157 |       >
158 |         +
159 |       </button>
160 | 
161 |       {/* Модалка додавання */}
162 |       {isModalOpen && (
163 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
164 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
165 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
166 |               <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
167 |               <button
168 |                 onClick={() => setIsModalOpen(false)}
169 |                 className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
170 |               >
171 |                 ✕
172 |               </button>
173 |             </div>
174 |             <form onSubmit={handleAddCity} className="p-6">
175 |               <input
176 |                 type="text"
177 |                 value={newCityName}
178 |                 onChange={(e) => setNewCityName(e.target.value)}
179 |                 placeholder="Наприклад: Львів"
180 |                 className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
181 |                 autoFocus
182 |                 required
183 |               />
184 |               <div className="flex gap-3">
185 |                 <button
186 |                   type="button"
187 |                   onClick={() => setIsModalOpen(false)}
188 |                   className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
189 |                 >
190 |                   Скасувати
191 |                 </button>
192 |                 <button
193 |                   type="submit"
194 |                   disabled={isLoading}
195 |                   className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
196 |                 >
197 |                   {isLoading ? "Збереження..." : "Зберегти"}
198 |                 </button>
199 |               </div>
200 |             </form>
201 |           </div>
202 |         </div>
203 |       )}
204 |     </div>
205 |   );
206 | }
207 | 
```

### File: apps/frontend/src/pages/CityProfile.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { Link, useParams } from "react-router-dom";
  2 | import CityAnalytics from "../components/city-profile/CityAnalytics";
  3 | import PhoneLink from "../components/PhoneLink";
  4 | import type { Event, Crew, CityProfile as CityProfileType } from "../types";
  5 | import { api } from "../config/api";
  6 | import OptimizedImage from "../components/ui/OptimizedImage";
  7 | 
  8 | type Tab = "events" | "crews" | "analytics";
  9 | 
 10 | export default function CityProfile() {
 11 |   const { id } = useParams();
 12 |   const [city, setCity] = useState<CityProfileType | null>(null);
 13 |   const [isLoading, setIsLoading] = useState(true);
 14 |   const [activeTab, setActiveTab] = useState<Tab>("crews"); // Одразу відкриємо вкладку екіпажів для перевірки
 15 |   const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
 16 | 
 17 |   // Стан для екіпажів
 18 |   const [users, setUsers] = useState<any[]>([]);
 19 |   const [isCreateCrewModalOpen, setIsCreateCrewModalOpen] = useState(false);
 20 |   const [crewForm, setCrewForm] = useState({ name: "", hostId: "", driverId: "" });
 21 | 
 22 |   const fetchCityAndUsers = async () => {
 23 |     try {
 24 |       const [cityRes, usersRes] = await Promise.all([
 25 |         api.get(`/cities/${id}`),
 26 |         api.get("/users")
 27 |       ]);
 28 |       setCity(cityRes.data);
 29 |       setUsers(usersRes.data);
 30 |     } catch (e) {
 31 |       console.error(e);
 32 |     } finally {
 33 |       setIsLoading(false);
 34 |     }
 35 |   };
 36 | 
 37 |   useEffect(() => {
 38 |     void fetchCityAndUsers();
 39 |   }, [id]);
 40 | 
 41 |   const handleCreateCrew = async (e: React.FormEvent) => {
 42 |     e.preventDefault();
 43 |     if (!crewForm.hostId || !crewForm.driverId) return alert("Оберіть ведучого та водія!");
 44 |     try {
 45 |       await api.post(`/cities/${city?.id}/crews`, crewForm);
 46 |       setIsCreateCrewModalOpen(false);
 47 |       fetchCityAndUsers(); // Оновлюємо дані
 48 |     } catch (err) {
 49 |       console.error(err);
 50 |     }
 51 |   };
 52 | 
 53 |   const handleDeleteCrew = async (crewId: string) => {
 54 |     if (!window.confirm("Видалити екіпаж?")) return;
 55 |     try {
 56 |       await api.delete(`/cities/crews/${crewId}`);
 57 |       fetchCityAndUsers();
 58 |     } catch (err) {
 59 |       console.error(err);
 60 |     }
 61 |   };
 62 | 
 63 |   if (isLoading) return <div className="p-8 text-slate-500">Завантаження...</div>;
 64 |   if (!city) return <div className="p-8 text-slate-500">Місто не знайдено</div>;
 65 | 
 66 |   const completedEvents: Event[] = city.events || [];
 67 |   const crews: Crew[] = city.crews || [];
 68 |   const manager = city.manager;
 69 | 
 70 |   // Знаходимо вільних людей (які не закріплені за іншим екіпажем)
 71 |   const busyUserIds = crews.flatMap((c: any) => [c.hostId, c.driverId]);
 72 |   const availableHosts = users.filter(u => u.role === "HOST" && u.city?.id === city.id && !busyUserIds.includes(u.id));
 73 |   const availableDrivers = users.filter(u => u.role === "DRIVER" && u.city?.id === city.id && !busyUserIds.includes(u.id));
 74 | 
 75 |   const totalChildren = completedEvents.reduce((sum, ev) => sum + (ev.report?.childrenCount || ev.childrenPlanned || 0), 0);
 76 |   const totalRevenue = completedEvents.reduce((sum, ev) => sum + (ev.report?.totalSum || ev.price || 0), 0);
 77 |   const totalProfit = completedEvents.reduce((sum, ev) => sum + (ev.report?.remainderSum || 0), 0);
 78 |   const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(Math.round(n));
 79 | 
 80 |   const TABS: { key: Tab; label: string; icon: string }[] = [
 81 |     { key: "events", label: "Події", icon: "📅" },
 82 |     { key: "crews", label: "Екіпажі", icon: "🚐" },
 83 |     { key: "analytics", label: "Аналітика", icon: "📊" },
 84 |   ];
 85 | 
 86 |   return (
 87 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
 88 |       <div className="text-sm text-slate-500 mb-6">
 89 |         <Link to="/cities" className="hover:text-blue-600 transition-colors">Міста</Link>
 90 |         <span className="mx-2">›</span>
 91 |         <span className="text-slate-800 font-medium">{city.name}</span>
 92 |       </div>
 93 | 
 94 |       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
 95 |         <div className="flex flex-col md:flex-row md:items-center gap-6">
 96 |           <div className="flex items-center gap-4 min-w-[220px]">
 97 |             <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
 98 |               {manager?.name?.charAt(0) ?? "?"}
 99 |             </div>
100 |             <div>
101 |               <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Менеджер</p>
102 |               <p className="font-bold text-slate-800">{manager?.name ?? "—"}</p>
103 |               <p className="text-sm text-slate-500"><PhoneLink phone={manager?.phone} /></p>
104 |             </div>
105 |           </div>
106 |           <div className="hidden md:block w-px h-16 bg-slate-100" />
107 |           <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 sm:gap-8 flex-1">
108 |             <Stat label="Закладів" value={city.schools?.length ?? 0} />
109 |             <Stat label="Проведено подій" value={completedEvents.length} />
110 |             <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
111 |             <Stat label="Виручка" value={`${fmt(totalRevenue)} грн`} />
112 |             <Stat label="Прибуток" value={`${fmt(totalProfit)} грн`} />
113 |           </div>
114 |         </div>
115 |       </div>
116 | 
117 |       <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-6">
118 |         {TABS.map((tab) => (
119 |           <button
120 |             key={tab.key}
121 |             onClick={() => setActiveTab(tab.key)}
122 |             className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
123 |               activeTab === tab.key ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
124 |             }`}
125 |           >
126 |             <span>{tab.icon}</span> <span className="truncate">{tab.label}</span>
127 |           </button>
128 |         ))}
129 |       </div>
130 | 
131 |       {activeTab === "events" && (
132 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
133 |           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
134 |             <h3 className="font-bold text-slate-800">Завершені події ({completedEvents.length})</h3>
135 |           </div>
136 |           {completedEvents.length === 0 ? (
137 |             <div className="p-12 text-center text-slate-400">
138 |               <p className="text-4xl mb-3">📭</p>
139 |               <p className="font-medium">Завершених подій ще немає</p>
140 |             </div>
141 |           ) : (
142 |             <>
143 |               <div className="md:hidden divide-y divide-slate-50">
144 |                 {completedEvents.map((ev) => (
145 |                   <div key={ev.id} onClick={() => setSelectedReportEvent(ev)}
146 |                     className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer">
147 |                     <div className="min-w-0">
148 |                       <p className="font-medium text-blue-600 truncate">{ev.school?.name}</p>
149 |                       <p className="text-xs text-slate-400 mt-0.5">{ev.project} · {new Date(ev.date).toLocaleDateString("uk-UA")}</p>
150 |                       <p className="text-xs text-slate-500 mt-1">👶 {ev.report?.childrenCount || ev.childrenPlanned || "—"} дітей</p>
151 |                     </div>
152 |                     <div className="text-right shrink-0">
153 |                       <p className="font-semibold text-slate-800 text-sm">{fmt(ev.report?.totalSum || ev.price || 0)} грн</p>
154 |                       <p className="text-xs font-medium text-emerald-600 mt-0.5">+{fmt(ev.report?.remainderSum || 0)} грн</p>
155 |                     </div>
156 |                   </div>
157 |                 ))}
158 |               </div>
159 |               <div className="hidden md:block overflow-x-auto">
160 |                 <table className="w-full text-left text-sm">
161 |                   <thead>
162 |                     <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
163 |                       <th className="p-4">Заклад</th>
164 |                       <th className="p-4">Проєкт</th>
165 |                       <th className="p-4">Дата</th>
166 |                       <th className="p-4">Дітей</th>
167 |                       <th className="p-4">Виручка</th>
168 |                       <th className="p-4">Прибуток</th>
169 |                     </tr>
170 |                   </thead>
171 |                   <tbody>
172 |                     {completedEvents.map((ev) => (
173 |                       <tr key={ev.id} onClick={() => setSelectedReportEvent(ev)}
174 |                         className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
175 |                         <td className="p-4">
176 |                           <span className="font-medium text-blue-600">{ev.school?.name}</span>
177 |                           <p className="text-xs text-slate-400">{ev.school?.type}</p>
178 |                         </td>
179 |                         <td className="p-4 text-slate-700">{ev.project}</td>
180 |                         <td className="p-4 text-slate-600">{new Date(ev.date).toLocaleDateString("uk-UA")}</td>
181 |                         <td className="p-4 font-medium">{ev.report?.childrenCount || ev.childrenPlanned || "—"}</td>
182 |                         <td className="p-4 font-medium text-slate-800">{fmt(ev.report?.totalSum || ev.price || 0)} грн</td>
183 |                         <td className="p-4 font-medium text-emerald-600">{fmt(ev.report?.remainderSum || 0)} грн</td>
184 |                       </tr>
185 |                     ))}
186 |                   </tbody>
187 |                 </table>
188 |               </div>
189 |             </>
190 |           )}
191 |         </div>
192 |       )}
193 | 
194 |       {/* Вкладка ЕКІПАЖІ з новим дизайном */}
195 |       {activeTab === "crews" && (
196 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
197 |           <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
198 |             <h3 className="text-xl font-bold text-slate-800">Екіпажі - {city.name}</h3>
199 |             <button 
200 |               onClick={() => {
201 |                 setCrewForm({ name: `Екіпаж №${crews.length + 1}`, hostId: "", driverId: "" });
202 |                 setIsCreateCrewModalOpen(true);
203 |               }}
204 |               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
205 |             >
206 |               + Додати екіпаж
207 |             </button>
208 |           </div>
209 | 
210 |           {crews.length === 0 ? (
211 |             <div className="p-12 text-center text-slate-400">
212 |               <p className="text-4xl mb-3">🚐</p>
213 |               <p className="font-medium">Екіпажів ще немає</p>
214 |             </div>
215 |           ) : (
216 |             <>
217 |               {/* Мобільний вигляд */}
218 |               <div className="md:hidden divide-y divide-slate-50">
219 |                 {crews.map((crew: any) => {
220 |                   const hostObj = users.find(u => u.id === crew.hostId);
221 |                   const driverObj = users.find(u => u.id === crew.driverId);
222 |                   const carName = crew.car ? crew.car.split('(')[0].trim() : "—";
223 |                   const carPlate = crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
224 |                   const eventsCount = city.events?.filter((e: any) => e.crewId === crew.id).length || 0;
225 | 
226 |                   return (
227 |                     <div key={crew.id} className="p-4">
228 |                       <div className="flex justify-between items-start mb-3">
229 |                         <div className="flex items-center gap-3">
230 |                           <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-200">
231 |                             <OptimizedImage src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80" alt="van" className="w-full h-full object-cover" />
232 |                           </div>
233 |                           <p className="font-bold text-slate-800">{crew.name}</p>
234 |                         </div>
235 |                         <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded text-xs font-medium">Активний</span>
236 |                       </div>
237 |                       
238 |                       <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
239 |                         <div>
240 |                           <p className="font-medium text-slate-800">{hostObj?.name || crew.host?.name || "—"}</p>
241 |                           <p className="text-slate-500 mt-0.5">{hostObj?.phone || "—"}</p>
242 |                         </div>
243 |                         <div>
244 |                           <p className="font-medium text-slate-800">{driverObj?.name || crew.driver?.name || "—"}</p>
245 |                           <p className="text-slate-500 mt-0.5">{driverObj?.phone || "—"}</p>
246 |                         </div>
247 |                         <div>
248 |                           <p className="font-medium text-slate-800">{carName}</p>
249 |                           {carPlate && <p className="text-slate-500 mt-0.5">{carPlate}</p>}
250 |                         </div>
251 |                         <div>
252 |                           <p className="text-slate-500">Подій: <span className="font-bold text-slate-800">{eventsCount}</span></p>
253 |                         </div>
254 |                       </div>
255 |                       <button onClick={() => handleDeleteCrew(crew.id)} className="w-full mt-4 py-2 border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium transition-colors">
256 |                         Видалити екіпаж
257 |                       </button>
258 |                     </div>
259 |                   );
260 |                 })}
261 |               </div>
262 | 
263 |               {/* Десктоп таблиця як на дизайні */}
264 |               <div className="hidden md:block overflow-x-auto">
265 |                 <table className="w-full text-left text-sm">
266 |                   <thead>
267 |                     <tr className="bg-white border-b border-slate-100 text-slate-800 font-bold">
268 |                       <th className="p-5">Екіпаж</th>
269 |                       <th className="p-5">Ведучий</th>
270 |                       <th className="p-5">Водій</th>
271 |                       <th className="p-5">Авто</th>
272 |                       <th className="p-5">Статус</th>
273 |                       <th className="p-5 text-center">Подій (міс.)</th>
274 |                       <th className="p-5 text-center">Дія</th>
275 |                     </tr>
276 |                   </thead>
277 |                   <tbody>
278 |                     {crews.map((crew: any) => {
279 |                       // Знаходимо реальні об'єкти юзерів, щоб витягнути телефони
280 |                       const hostObj = users.find(u => u.id === crew.hostId);
281 |                       const driverObj = users.find(u => u.id === crew.driverId);
282 |                       
283 |                       // Парсимо авто (Назва та Номер)
284 |                       const carName = crew.car ? crew.car.split('(')[0].trim() : "—";
285 |                       const carPlate = crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
286 |                       
287 |                       // Рахуємо події
288 |                       const eventsCount = city.events?.filter((e: any) => e.crewId === crew.id).length || 0;
289 | 
290 |                       return (
291 |                         <tr key={crew.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
292 |                           <td className="p-5">
293 |                             <div className="flex items-center gap-3">
294 |                               {/* Універсальна фотографія буса */}
295 |                               <div className="w-[60px] h-[40px] rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-sm">
296 |                                 <OptimizedImage src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80" alt="van" className="w-full h-full object-cover" />
297 |                               </div>
298 |                               <span className="font-bold text-slate-800">{crew.name}</span>
299 |                             </div>
300 |                           </td>
301 |                           <td className="p-5">
302 |                             <div className="font-medium text-slate-800">{hostObj?.name || crew.host?.name || "—"}</div>
303 |                             <div className="text-xs text-slate-500 mt-1 tracking-wide">{hostObj?.phone || "—"}</div>
304 |                           </td>
305 |                           <td className="p-5">
306 |                             <div className="font-medium text-slate-800">{driverObj?.name || crew.driver?.name || "—"}</div>
307 |                             <div className="text-xs text-slate-500 mt-1 tracking-wide">{driverObj?.phone || "—"}</div>
308 |                           </td>
309 |                           <td className="p-5">
310 |                             <div className="font-medium text-slate-600">{carName}</div>
311 |                             {carPlate ? (
312 |                                <div className="text-xs text-slate-500 mt-1 tracking-wider">{carPlate}</div>
313 |                             ) : (
314 |                                <div className="text-xs text-slate-400 mt-1">—</div>
315 |                             )}
316 |                           </td>
317 |                           <td className="p-5">
318 |                             <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
319 |                               Активний
320 |                             </span>
321 |                           </td>
322 |                           <td className="p-5 text-center font-bold text-slate-800 text-base">
323 |                             {eventsCount}
324 |                           </td>
325 |                           <td className="p-5 text-center">
326 |                             <button onClick={() => handleDeleteCrew(crew.id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50" title="Видалити екіпаж">
327 |                               🗑
328 |                             </button>
329 |                           </td>
330 |                         </tr>
331 |                       );
332 |                     })}
333 |                   </tbody>
334 |                 </table>
335 |               </div>
336 |             </>
337 |           )}
338 |         </div>
339 |       )}
340 | 
341 |       {activeTab === "analytics" && <CityAnalytics events={completedEvents} />}
342 | 
343 |       {/* Модалка створення екіпажу */}
344 |       {isCreateCrewModalOpen && (
345 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
346 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
347 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50">
348 |               <h3 className="text-xl font-bold text-slate-800">Новий екіпаж</h3>
349 |               <button onClick={() => setIsCreateCrewModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
350 |             </div>
351 |             <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
352 |               <div>
353 |                 <label className="block text-sm font-medium text-slate-700 mb-1">Назва екіпажу</label>
354 |                 <input 
355 |                   type="text" value={crewForm.name} onChange={e => setCrewForm({...crewForm, name: e.target.value})} 
356 |                   className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
357 |                 />
358 |               </div>
359 |               <div>
360 |                 <label className="block text-sm font-medium text-slate-700 mb-1">Ведучий</label>
361 |                 <select value={crewForm.hostId} onChange={e => setCrewForm({...crewForm, hostId: e.target.value})} required className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none">
362 |                   <option value="" disabled>Оберіть ведучого</option>
363 |                   {availableHosts.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
364 |                 </select>
365 |                 <p className="text-xs text-emerald-600 mt-1">✓ Доступно: {availableHosts.length} вільних</p>
366 |               </div>
367 |               <div>
368 |                 <label className="block text-sm font-medium text-slate-700 mb-1">Водій</label>
369 |                 <select value={crewForm.driverId} onChange={e => setCrewForm({...crewForm, driverId: e.target.value})} required className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none">
370 |                   <option value="" disabled>Оберіть водія</option>
371 |                   {availableDrivers.map(d => <option key={d.id} value={d.id}>{d.name} {d.car ? `(🚗 ${d.car})` : ""}</option>)}
372 |                 </select>
373 |                 <p className="text-xs text-emerald-600 mt-1">✓ Доступно: {availableDrivers.length} вільних</p>
374 |               </div>
375 |               <div className="flex gap-3 pt-2 mt-4">
376 |                 <button type="button" onClick={() => setIsCreateCrewModalOpen(false)} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors">Скасувати</button>
377 |                 <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Створити</button>
378 |               </div>
379 |             </form>
380 |           </div>
381 |         </div>
382 |       )}
383 | 
384 |       {/* Модальне вікно Звіту */}
385 |       <CompletedEventModal
386 |         isOpen={!!selectedReportEvent}
387 |         onClose={() => setSelectedReportEvent(null)}
388 |         event={selectedReportEvent}
389 |       />
390 |     </div>
391 |   );
392 | }
393 | 
394 | function Stat({ label, value }: { label: string; value: string | number }) {
395 |   return (
396 |     <div>
397 |       <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
398 |       <p className="text-2xl font-bold text-slate-800">{value}</p>
399 |     </div>
400 |   );
401 | }
402 | 
403 | function CompletedEventModal({ isOpen, onClose, event }: { isOpen: boolean; onClose: () => void; event: any }) {
404 |   if (!isOpen || !event) return null;
405 |   const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
406 |   const report = event.report;
407 | 
408 |   return (
409 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
410 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
411 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
412 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
413 |           <div>
414 |             <h3 className="text-xl font-bold text-slate-800">Звіт: {event.project}</h3>
415 |             <p className="text-sm text-slate-500 mt-1">{event.school?.name} · {new Date(event.date).toLocaleDateString("uk-UA")}</p>
416 |           </div>
417 |           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg">✕</button>
418 |         </div>
419 |         <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
420 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
421 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
422 |               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
423 |                 <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">📊</span>
424 |                 Результати
425 |               </h4>
426 |               <div className="space-y-3 text-sm">
427 |                 <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Дітей (факт):</span><span className="font-bold">{report?.childrenCount || 0}</span></div>
428 |                 <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Класів:</span><span className="font-medium">{report?.classesCount || 0}</span></div>
429 |                 <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Пільговиків:</span><span className="font-medium">{report?.privilegedCount || 0}</span></div>
430 |                 <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Сеансів:</span><span className="font-medium">{report?.showingsCount || 0}</span></div>
431 |                 <div className="flex justify-between pb-1"><span className="text-slate-500">Оцінка:</span><span className="font-bold text-amber-500">⭐ {report?.rating || 0}/10</span></div>
432 |               </div>
433 |             </div>
434 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
435 |               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
436 |                 <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">💰</span>
437 |                 Фінанси
438 |               </h4>
439 |               <div className="space-y-3 text-sm">
440 |                 <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">Загальна виручка:</span><span className="font-bold">{fmt(report?.totalSum)} грн</span></div>
441 |                 <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-500">На заклад (20%):</span><span className="font-medium text-rose-500">− {fmt(report?.schoolSum)} грн</span></div>
442 |                 {Array.isArray(report?.expenses) && report.expenses.length > 0 && (
443 |                   <div className="py-2 border-b border-slate-50">
444 |                     <span className="text-slate-500 block mb-2">Додаткові витрати:</span>
445 |                     {report.expenses.map((exp: any, i: number) => (
446 |                       <div key={i} className="flex justify-between text-xs mb-1 pl-2">
447 |                         <span className="text-slate-400">— {exp.name || exp.category}</span>
448 |                         <span className="text-rose-500 font-medium">− {fmt(exp.amount)} грн</span>
449 |                       </div>
450 |                     ))}
451 |                   </div>
452 |                 )}
453 |                 <div className="flex justify-between pt-1"><span className="font-bold text-slate-800">Чистий прибуток:</span><span className="font-bold text-emerald-600 text-base">{fmt(report?.remainderSum)} грн</span></div>
454 |               </div>
455 |             </div>
456 |           </div>
457 |           <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
458 |             <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
459 |               <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">⏳</span>
460 |               Історія пайплайну
461 |             </h4>
462 |             {!event.history || event.history.length === 0 ? (
463 |               <p className="text-sm text-slate-400 text-center py-4">Історія порожня.</p>
464 |             ) : (
465 |               <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
466 |                 {[...event.history].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((item: any) => (
467 |                   <div key={item.id} className="relative pl-8 text-sm">
468 |                     <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
469 |                     <p className="font-semibold text-slate-800">{item.action}</p>
470 |                     <p className="text-[11px] text-slate-400 mt-0.5">
471 |                       {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })} · 👤 {item.userName}
472 |                     </p>
473 |                     {item.comment && (
474 |                       <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">{item.comment}</div>
475 |                     )}
476 |                   </div>
477 |                 ))}
478 |               </div>
479 |             )}
480 |           </div>
481 |         </div>
482 |       </div>
483 |     </div>
484 |   );
485 | }
```

### File: apps/frontend/src/pages/Dashboard.tsx
```tsx
  0 | import { useEffect, useState } from "react";
  1 | import { Link } from "react-router-dom";
  2 | import { api } from "../config/api";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | import { useAuth } from "../hooks/useAuth";
  5 | import IssueCarousel from "../components/IssueCarousel";
  6 | import FunnelBar from "../components/dashboard/FunnelBar";
  7 | import TodayEvents from "../components/dashboard/TodayEvents";
  8 | import UpcomingEvents from "../components/dashboard/UpcomingEvents";
  9 | import StaleSchools from "../components/dashboard/StaleSchools";
 10 | import MonthlyKpi from "../components/dashboard/MonthlyKpi";
 11 | import ActivityFeed from "../components/dashboard/ActivityFeed";
 12 | import CitiesTable from "../components/dashboard/CitiesTable";
 13 | 
 14 | interface DashboardSummary {
 15 |   todayEvents: any[];
 16 |   upcomingEvents: any[];
 17 |   funnel: Record<string, number>;
 18 |   totalSchools: number;
 19 |   monthlyKpi: {
 20 |     revenue: number;
 21 |     profit: number;
 22 |     children: number;
 23 |     count: number;
 24 |   };
 25 |   staleSchools: {
 26 |     id: string;
 27 |     name: string;
 28 |     status: string | null;
 29 |     lastActivity: string | null;
 30 |     daysStale: number | null;
 31 |   }[];
 32 |   activityFeed: {
 33 |     id: string;
 34 |     userName: string;
 35 |     role: string;
 36 |     action: string;
 37 |     comment: string | null;
 38 |     createdAt: string;
 39 |     schoolId: string | null;
 40 |     schoolName: string | null;
 41 |     eventId: string | null;
 42 |   }[];
 43 |   citiesStats: {
 44 |     cityId: string;
 45 |     cityName: string;
 46 |     schoolsCount: number;
 47 |     activeEvents: number;
 48 |     monthRevenue: number;
 49 |   }[];
 50 | }
 51 | 
 52 | // ── Skeleton компоненти ──────────────────────────────────────────────────────
 53 | 
 54 | function SkeletonCard({ className = "" }: { className?: string }) {
 55 |   return (
 56 |     <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse ${className}`}>
 57 |       <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
 58 |       <div className="space-y-2">
 59 |         <div className="h-3 bg-slate-100 rounded-full w-full" />
 60 |         <div className="h-3 bg-slate-100 rounded-full w-4/5" />
 61 |         <div className="h-3 bg-slate-100 rounded-full w-3/5" />
 62 |       </div>
 63 |     </div>
 64 |   );
 65 | }
 66 | 
 67 | function SkeletonEventCard() {
 68 |   return (
 69 |     <div className="bg-white rounded-xl border border-slate-100 p-3 animate-pulse">
 70 |       <div className="flex justify-between mb-2">
 71 |         <div className="h-5 bg-slate-100 rounded w-16" />
 72 |         <div className="h-4 bg-slate-100 rounded w-24" />
 73 |       </div>
 74 |       <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
 75 |       <div className="flex justify-between items-center">
 76 |         <div className="h-5 bg-slate-100 rounded-full w-28" />
 77 |         <div className="h-7 bg-slate-100 rounded-lg w-20" />
 78 |       </div>
 79 |     </div>
 80 |   );
 81 | }
 82 | 
 83 | function DashboardSkeleton({ isSuperAdmin }: { isSuperAdmin: boolean }) {
 84 |   return (
 85 |     <div className="flex flex-col gap-6">
 86 |       {/* IssueCarousel placeholder */}
 87 |       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse h-24" />
 88 | 
 89 |       {/* Сьогодні + Потребують уваги */}
 90 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 91 |         {/* TodayEvents */}
 92 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
 93 |           <div className="flex justify-between mb-3">
 94 |             <div>
 95 |               <div className="h-4 bg-slate-100 rounded w-36 mb-1" />
 96 |               <div className="h-3 bg-slate-100 rounded w-28" />
 97 |             </div>
 98 |             <div className="h-4 bg-slate-100 rounded w-16" />
 99 |           </div>
100 |           <div className="flex flex-col gap-2">
101 |             <SkeletonEventCard />
102 |             <SkeletonEventCard />
103 |           </div>
104 |         </div>
105 | 
106 |         {/* StaleSchools */}
107 |         <SkeletonCard />
108 |         {/* UpcomingEvents */}
109 |         <SkeletonCard />
110 |       </div>
111 | 
112 |       <hr className="border-slate-200" />
113 | 
114 |       {/* KPI + Воронка */}
115 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
116 |         <SkeletonCard />
117 |         <SkeletonCard />
118 |       </div>
119 | 
120 |       {/* Activity + Cities */}
121 |       <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
122 |         <SkeletonCard className="min-h-[200px]" />
123 |         {isSuperAdmin && <SkeletonCard className="min-h-[200px]" />}
124 |       </div>
125 |     </div>
126 |   );
127 | }
128 | 
129 | // ── Dashboard ────────────────────────────────────────────────────────────────
130 | 
131 | export default function Dashboard() {
132 |   const { selectedCity } = useSelectedCity();
133 |   const { user } = useAuth();
134 |   const [summary, setSummary] = useState<DashboardSummary | null>(null);
135 |   const [isLoading, setIsLoading] = useState(false);
136 | 
137 |   const isSuperAdmin = user?.role === "SUPERADMIN";
138 | 
139 |   useEffect(() => {
140 |     if (!selectedCity.id && !isSuperAdmin) return;
141 | 
142 |     const fetchSummary = async () => {
143 |       setIsLoading(true);
144 |       try {
145 |         const params = selectedCity.id ? `?cityId=${selectedCity.id}` : "";
146 |         const res = await api.get(`/dashboard/summary${params}`);
147 |         setSummary(res.data);
148 |       } catch (e) {
149 |         console.error("Помилка завантаження дашборду:", e);
150 |       } finally {
151 |         setIsLoading(false);
152 |       }
153 |     };
154 | 
155 |     fetchSummary();
156 |   }, [selectedCity.id, isSuperAdmin]);
157 | 
158 |   if (!selectedCity.id && !isSuperAdmin) {
159 |     return (
160 |       <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
161 |         <div className="mb-6">
162 |           <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
163 |           <p className="text-sm text-slate-500 mt-1">📍 Оберіть місто</p>
164 |         </div>
165 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
166 |           <p className="text-4xl mb-3">📍</p>
167 |           <p className="font-semibold text-slate-700 mb-2">Місто не обрано</p>
168 |           <p className="text-sm text-slate-500 mb-4">
169 |             Оберіть місто у розділі «Міста», щоб бачити активність
170 |           </p>
171 |           <Link
172 |             to="/cities"
173 |             className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
174 |           >
175 |             Перейти до міст
176 |           </Link>
177 |         </div>
178 |       </div>
179 |     );
180 |   }
181 | 
182 |   return (
183 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
184 |       {/* Шапка */}
185 |       <div className="mb-6">
186 |         <h1 className="text-2xl font-bold text-slate-800">
187 |           Дашборд
188 |           {selectedCity.name && (
189 |             <span className="ml-2 text-base font-normal text-blue-500">
190 |               · {selectedCity.name}
191 |             </span>
192 |           )}
193 |           {isSuperAdmin && !selectedCity.name && (
194 |             <span className="ml-2 text-base font-normal text-purple-500">
195 |               · Усі міста
196 |             </span>
197 |           )}
198 |         </h1>
199 |         <p className="text-xs text-slate-400 mt-1">
200 |           {new Date().toLocaleDateString("uk-UA", {
201 |             weekday: "long",
202 |             day: "numeric",
203 |             month: "long",
204 |             year: "numeric",
205 |           })}
206 |         </p>
207 |       </div>
208 | 
209 |       {isLoading ? (
210 |         <DashboardSkeleton isSuperAdmin={isSuperAdmin} />
211 |       ) : summary ? (
212 |         <div className="flex flex-col gap-6">
213 |           {/* ── ЗОНА ДІЇ ── */}
214 |           <div>
215 |             <IssueCarousel />
216 |           </div>
217 | 
218 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
219 |             <TodayEvents events={summary.todayEvents} />
220 |             <StaleSchools schools={summary.staleSchools} />
221 |             <UpcomingEvents events={summary.upcomingEvents} />
222 |           </div>
223 | 
224 |           <hr className="border-slate-200" />
225 | 
226 |           {/* ── АНАЛІТИКА ── */}
227 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
228 |             <MonthlyKpi kpi={summary.monthlyKpi} />
229 |             <FunnelBar funnel={summary.funnel} />
230 |           </div>
231 | 
232 |           <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
233 |             <ActivityFeed items={summary.activityFeed} />
234 |             {isSuperAdmin && summary.citiesStats.length > 0 && (
235 |               <CitiesTable rows={summary.citiesStats} />
236 |             )}
237 |           </div>
238 |         </div>
239 |       ) : (
240 |         <div className="text-center py-20 text-slate-400 text-sm">
241 |           Не вдалося завантажити дані
242 |         </div>
243 |       )}
244 |     </div>
245 |   );
246 | }
```

### File: apps/frontend/src/pages/Employees.tsx
```tsx
  0 | import { useEffect, useState } from "react";
  1 | import { api } from "../config/api";
  2 | import PhoneLink from "../components/PhoneLink";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | 
  5 | type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
  6 | 
  7 | interface City {
  8 |   id: string;
  9 |   name: string;
 10 | }
 11 | interface User {
 12 |   id: string;
 13 |   name: string;
 14 |   phone: string | null;
 15 |   email: string;
 16 |   cityId: string | null;
 17 |   city?: City;
 18 |   role: Role;
 19 |   telegramId?: string | null;
 20 |   car?: string | null;
 21 | }
 22 | interface Project {
 23 |   id: string;
 24 |   name: string;
 25 |   color: string;
 26 | }
 27 | 
 28 | const ROLE_LABELS: Record<string, string> = {
 29 |   MANAGER: "Менеджер",
 30 |   DRIVER: "Водій",
 31 |   HOST: "Ведучий",
 32 |   SUPERADMIN: "Суперадмін",
 33 |   GUEST: "Гість",
 34 | };
 35 | const ROLE_COLORS: Record<string, string> = {
 36 |   MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
 37 |   DRIVER: "bg-emerald-50 text-emerald-700 border-emerald-200",
 38 |   HOST: "bg-violet-50 text-violet-700 border-violet-200",
 39 | };
 40 | const ROLE_HEADER_COLORS: Record<string, string> = {
 41 |   MANAGER: "bg-blue-600",
 42 |   DRIVER: "bg-emerald-600",
 43 |   HOST: "bg-violet-600",
 44 | };
 45 | const EMPTY_FORM = {
 46 |   fullName: "",
 47 |   phone: "",
 48 |   email: "",
 49 |   cityId: "",
 50 |   role: "MANAGER" as Role,
 51 |   password: "",
 52 |   telegramId: "",
 53 |   car: "",
 54 | };
 55 | 
 56 | const PROJECT_COLORS: Record<string, string> = {
 57 |   blue: "bg-blue-500",
 58 |   emerald: "bg-emerald-500",
 59 |   rose: "bg-rose-500",
 60 |   red: "bg-red-500",
 61 |   amber: "bg-amber-500",
 62 |   purple: "bg-purple-500",
 63 | };
 64 | 
 65 | export default function Employees() {
 66 |   const [users, setUsers] = useState<User[]>([]);
 67 |   const [cities, setCities] = useState<City[]>([]);
 68 |   const [projects, setProjects] = useState<Project[]>([]);
 69 |   const [isModalOpen, setIsModalOpen] = useState(false);
 70 |   const [editingUser, setEditingUser] = useState<User | null>(null);
 71 |   const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
 72 |   const [isSubmitting, setIsSubmitting] = useState(false);
 73 | 
 74 |   const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
 75 |   const [projectForm, setProjectForm] = useState({ name: "", color: "blue" });
 76 | 
 77 |   const { selectedCity } = useSelectedCity();
 78 |   const token = localStorage.getItem("token");
 79 |   const headers = { Authorization: `Bearer ${token}` };
 80 | 
 81 |   const fetchData = async () => {
 82 |     // 1. Завантажуємо критичні дані (Працівники та Міста)
 83 |     try {
 84 |       const [usersRes, citiesRes] = await Promise.all([
 85 |         api.get("/users", { headers }),
 86 |         api.get("/cities", { headers }),
 87 |       ]);
 88 |       setUsers(usersRes.data);
 89 |       setCities(citiesRes.data);
 90 |     } catch (e) {
 91 |       console.error("Помилка завантаження працівників:", e);
 92 |     }
 93 | 
 94 |     // 2. Окремо завантажуємо проєкти (не критично для списку працівників)
 95 |     try {
 96 |       const projRes = await api.get("/projects", { headers });
 97 |       setProjects(projRes.data);
 98 |     } catch (e) {
 99 |       console.warn("Проєктів ще немає або помилка їх завантаження:", e);
100 |     }
101 |   };
102 | 
103 |   useEffect(() => {
104 |     fetchData();
105 |   }, []);
106 | 
107 |   const cityFilteredUsers = selectedCity.id
108 |     ? users.filter((u) => u.cityId === selectedCity.id)
109 |     : users;
110 |   const grouped = (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
111 |     role,
112 |     label: ROLE_LABELS[role],
113 |     items: cityFilteredUsers.filter((u) => u.role === role),
114 |   }));
115 | 
116 |   const handleOpenModal = (user: User | null = null) => {
117 |     setEditingUser(user);
118 |     if (user) {
119 |       setForm({
120 |         fullName: user.name,
121 |         phone: user.phone || "",
122 |         email: user.email,
123 |         cityId: user.cityId || "",
124 |         role: user.role,
125 |         password: "",
126 |         telegramId: user.telegramId || "",
127 |         car: user.car || "",
128 |       });
129 |     } else {
130 |       setForm({ ...EMPTY_FORM });
131 |     }
132 |     setIsModalOpen(true);
133 |   };
134 | 
135 |   const handleSubmit = async (e: React.FormEvent) => {
136 |     e.preventDefault();
137 |     if (!form.fullName.trim()) return;
138 |     setIsSubmitting(true);
139 |     try {
140 |       if (editingUser)
141 |         await api.patch(`/users/${editingUser.id}`, form, { headers });
142 |       else await api.post("/users", form, { headers });
143 |       setIsModalOpen(false);
144 |       fetchData();
145 |     } catch (e) {
146 |       alert("Помилка збереження. Перевірте, чи не дублюється email.");
147 |     } finally {
148 |       setIsSubmitting(false);
149 |     }
150 |   };
151 | 
152 |   const handleDelete = async (id: string, name: string) => {
153 |     if (!window.confirm(`Видалити користувача "${name}"?`)) return;
154 |     try {
155 |       await api.delete(`/users/${id}`, { headers });
156 |       setUsers(users.filter((u) => u.id !== id));
157 |     } catch (e) {
158 |       alert("Помилка видалення");
159 |     }
160 |   };
161 | 
162 |   const handleCreateProject = async (e: React.FormEvent) => {
163 |     e.preventDefault();
164 |     if (!projectForm.name.trim()) return;
165 |     try {
166 |       await api.post("/projects", projectForm, { headers });
167 |       setIsProjectModalOpen(false);
168 |       setProjectForm({ name: "", color: "blue" });
169 |       fetchData();
170 |     } catch (e) {
171 |       alert("Помилка. Можливо такий вид події вже існує.");
172 |     }
173 |   };
174 | 
175 |   const handleDeleteProject = async (id: string, name: string) => {
176 |     if (
177 |       !window.confirm(
178 |         `Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`,
179 |       )
180 |     )
181 |       return;
182 |     try {
183 |       await api.delete(`/projects/${id}`, { headers });
184 |       fetchData();
185 |     } catch (e) {
186 |       alert("Помилка видалення");
187 |     }
188 |   };
189 | 
190 |   return (
191 |     <div className="p-4 md:p-8 h-full">
192 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
193 |         <div>
194 |           <h1 className="text-2xl font-bold text-slate-800">
195 |             Акаунти та Проєкти{" "}
196 |             {selectedCity.id && (
197 |               <span className="ml-2 text-base font-normal text-blue-500">
198 |                 · {selectedCity.name}
199 |               </span>
200 |             )}
201 |           </h1>
202 |           <p className="text-sm text-slate-400 mt-1">
203 |             Керування доступами, працівниками та видами подій
204 |           </p>
205 |         </div>
206 |         <button
207 |           onClick={() => handleOpenModal()}
208 |           className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 w-full sm:w-auto"
209 |         >
210 |           + Створити користувача
211 |         </button>
212 |       </div>
213 | 
214 |       <div className="space-y-8">
215 |         {grouped.map(({ role, label, items }) => (
216 |           <div key={role}>
217 |             <div className={`flex items-center gap-3 mb-4`}>
218 |               <div
219 |                 className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}
220 |               ></div>
221 |               <h2 className="text-lg font-bold text-slate-700">{label}</h2>
222 |               <span
223 |                 className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
224 |               >
225 |                 {items.length}
226 |               </span>
227 |             </div>
228 |             {items.length === 0 ? (
229 |               <div className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm">
230 |                 Немає {label.toLowerCase()}ів
231 |               </div>
232 |             ) : (
233 |               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
234 |                 <table className="w-full text-left">
235 |                   <thead>
236 |                     <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
237 |                       <th className="px-5 py-3">ПІБ</th>
238 |                       <th className="px-5 py-3">Телефон</th>
239 |                       <th className="px-5 py-3">Пошта / Логін</th>
240 |                       <th className="px-5 py-3">Місто</th>
241 |                       <th className="px-5 py-3 text-center">Дії</th>
242 |                     </tr>
243 |                   </thead>
244 |                   <tbody>
245 |                     {items.map((u) => (
246 |                       <tr
247 |                         key={u.id}
248 |                         className="border-b border-slate-50 hover:bg-slate-50/50"
249 |                       >
250 |                         <td className="px-5 py-4">
251 |                           <div className="flex items-center gap-3">
252 |                             <div
253 |                               className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
254 |                             >
255 |                               {u.name.charAt(0)}
256 |                             </div>
257 |                             <span className="font-medium text-slate-800">
258 |                               {u.name}
259 |                             </span>
260 |                           </div>
261 |                         </td>
262 |                         <td className="px-5 py-4 text-slate-600 text-sm">
263 |                           <PhoneLink phone={u.phone} />
264 |                           {u.car && (
265 |                             <p className="text-xs text-emerald-600 font-medium mt-1">
266 |                               🚗 {u.car}
267 |                             </p>
268 |                           )}
269 |                         </td>
270 |                         <td className="px-5 py-4 text-slate-600 text-sm font-medium">
271 |                           {u.email}
272 |                         </td>
273 |                         <td className="px-5 py-4">
274 |                           <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
275 |                             📍 {u.city?.name || "Всі міста"}
276 |                           </span>
277 |                         </td>
278 |                         <td className="px-5 py-4 text-center">
279 |                           <button
280 |                             onClick={() => handleOpenModal(u)}
281 |                             className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 mr-2"
282 |                           >
283 |                             ✏️
284 |                           </button>
285 |                           <button
286 |                             onClick={() => handleDelete(u.id, u.name)}
287 |                             className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50"
288 |                           >
289 |                             🗑
290 |                           </button>
291 |                         </td>
292 |                       </tr>
293 |                     ))}
294 |                   </tbody>
295 |                 </table>
296 |               </div>
297 |             )}
298 |           </div>
299 |         ))}
300 |       </div>
301 | 
302 |       {/* --- СЕКЦІЯ ПРОЄКТІВ (ВИДІВ ПОДІЙ) --- */}
303 |       <div className="mt-16 border-t border-slate-200 pt-10">
304 |         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
305 |           <div>
306 |             <h2 className="text-2xl font-bold text-slate-800">
307 |               Види подій (Проєкти)
308 |             </h2>
309 |             <p className="text-sm text-slate-400 mt-1">
310 |               Ці проєкти відображатимуться у випадаючому списку при створенні
311 |               події
312 |             </p>
313 |           </div>
314 |           <button
315 |             onClick={() => setIsProjectModalOpen(true)}
316 |             className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto"
317 |           >
318 |             + Створити вид події
319 |           </button>
320 |         </div>
321 | 
322 |         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
323 |           {projects.map((p) => (
324 |             <div
325 |               key={p.id}
326 |               className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group"
327 |             >
328 |               <div className="flex items-center gap-3">
329 |                 <div
330 |                   className={`w-4 h-4 rounded-full ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm`}
331 |                 />
332 |                 <span className="font-bold text-slate-800">{p.name}</span>
333 |               </div>
334 |               <button
335 |                 onClick={() => handleDeleteProject(p.id, p.name)}
336 |                 className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2"
337 |                 title="Видалити"
338 |               >
339 |                 🗑
340 |               </button>
341 |             </div>
342 |           ))}
343 |           {projects.length === 0 && (
344 |             <div className="col-span-full text-center py-10 text-slate-400">
345 |               Ви ще не додали жодного виду події
346 |             </div>
347 |           )}
348 |         </div>
349 |       </div>
350 | 
351 |       {/* Модалки Користувача і Проєктів */}
352 |       {isProjectModalOpen && (
353 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
354 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
355 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
356 |               <h3 className="text-xl font-bold text-slate-800">
357 |                 Новий вид події
358 |               </h3>
359 |               <button
360 |                 onClick={() => setIsProjectModalOpen(false)}
361 |                 className="text-slate-400 text-xl leading-none p-2 -mr-2"
362 |               >
363 |                 ✕
364 |               </button>
365 |             </div>
366 |             <form onSubmit={handleCreateProject} className="p-6">
367 |               <label className="block text-sm font-medium text-slate-700 mb-1.5">
368 |                 Назва
369 |               </label>
370 |               <input
371 |                 type="text"
372 |                 value={projectForm.name}
373 |                 onChange={(e) =>
374 |                   setProjectForm({ ...projectForm, name: e.target.value })
375 |                 }
376 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
377 |                 required
378 |                 placeholder="Наприклад: Шоу мильних бульбашок"
379 |               />
380 |               <label className="block text-sm font-medium text-slate-700 mb-3">
381 |                 Колір для календаря
382 |               </label>
383 |               <div className="flex gap-4 mb-8">
384 |                 {Object.keys(PROJECT_COLORS).map((c) => (
385 |                   <button
386 |                     type="button"
387 |                     key={c}
388 |                     onClick={() => setProjectForm({ ...projectForm, color: c })}
389 |                     className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${projectForm.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
390 |                   />
391 |                 ))}
392 |               </div>
393 |               <div className="flex gap-3">
394 |                 <button
395 |                   type="button"
396 |                   onClick={() => setIsProjectModalOpen(false)}
397 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
398 |                 >
399 |                   Скасувати
400 |                 </button>
401 |                 <button
402 |                   type="submit"
403 |                   className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
404 |                 >
405 |                   Зберегти
406 |                 </button>
407 |               </div>
408 |             </form>
409 |           </div>
410 |         </div>
411 |       )}
412 | 
413 |       {/* Ваша стара модалка Користувача */}
414 |       {isModalOpen && (
415 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
416 |           {/* Ваш існуючий код модалки працівника... Для стислості я зберіг базові поля */}
417 |           <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col">
418 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
419 |               <h3 className="text-xl font-bold">
420 |                 {editingUser ? "Редагувати" : "Новий користувач"}
421 |               </h3>
422 |               <button
423 |                 onClick={() => setIsModalOpen(false)}
424 |                 className="text-slate-400 text-xl p-2 -mr-2"
425 |               >
426 |                 ✕
427 |               </button>
428 |             </div>
429 |             <form
430 |               onSubmit={handleSubmit}
431 |               className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
432 |             >
433 |               <input
434 |                 type="text"
435 |                 value={form.fullName}
436 |                 onChange={(e) => setForm({ ...form, fullName: e.target.value })}
437 |                 required
438 |                 placeholder="ПІБ"
439 |                 className="w-full p-2.5 border rounded-lg"
440 |               />
441 |               <div className="grid grid-cols-2 gap-4">
442 |                 <input
443 |                   type="email"
444 |                   value={form.email}
445 |                   onChange={(e) => setForm({ ...form, email: e.target.value })}
446 |                   required
447 |                   placeholder="Пошта"
448 |                   className="w-full p-2.5 border rounded-lg"
449 |                 />
450 |                 <input
451 |                   type="password"
452 |                   value={form.password}
453 |                   onChange={(e) =>
454 |                     setForm({ ...form, password: e.target.value })
455 |                   }
456 |                   required={!editingUser}
457 |                   placeholder="Пароль"
458 |                   className="w-full p-2.5 border rounded-lg"
459 |                 />
460 |               </div>
461 |               <div className="grid grid-cols-2 gap-4">
462 |                 <input
463 |                   type="tel"
464 |                   value={form.phone}
465 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
466 |                   placeholder="Телефон"
467 |                   className="w-full p-2.5 border rounded-lg"
468 |                 />
469 |                 <input
470 |                   type="text"
471 |                   value={form.telegramId}
472 |                   onChange={(e) =>
473 |                     setForm({ ...form, telegramId: e.target.value })
474 |                   }
475 |                   placeholder="Telegram ID або @username"
476 |                   className="w-full p-2.5 border rounded-lg"
477 |                 />
478 |               </div>
479 |               <div className="grid grid-cols-2 gap-4">
480 |                 <select
481 |                   value={form.role}
482 |                   onChange={(e) =>
483 |                     setForm({ ...form, role: e.target.value as Role })
484 |                   }
485 |                   className="w-full p-2.5 border rounded-lg"
486 |                 >
487 |                   <option value="MANAGER">Менеджер</option>
488 |                   <option value="DRIVER">Водій</option>
489 |                   <option value="HOST">Ведучий</option>
490 |                   <option value="SUPERADMIN">Суперадмін</option>
491 |                 </select>
492 |                 <select
493 |                   value={form.cityId}
494 |                   onChange={(e) => setForm({ ...form, cityId: e.target.value })}
495 |                   className="w-full p-2.5 border rounded-lg"
496 |                 >
497 |                   <option value="">Всі міста</option>
498 |                   {cities.map((c) => (
499 |                     <option key={c.id} value={c.id}>
500 |                       {c.name}
501 |                     </option>
502 |                   ))}
503 |                 </select>
504 |               </div>
505 |               {form.role === "DRIVER" && (
506 |                 <input
507 |                   type="text"
508 |                   value={form.car || ""}
509 |                   onChange={(e) => setForm({ ...form, car: e.target.value })}
510 |                   placeholder="Автомобіль (напр. Renault Trafic)"
511 |                   className="w-full p-2.5 border rounded-lg"
512 |                 />
513 |               )}
514 |               <div className="flex gap-3 mt-2">
515 |                 <button
516 |                   type="button"
517 |                   onClick={() => setIsModalOpen(false)}
518 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
519 |                 >
520 |                   Скасувати
521 |                 </button>
522 |                 <button
523 |                   type="submit"
524 |                   disabled={isSubmitting}
525 |                   className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
526 |                 >
527 |                   Зберегти
528 |                 </button>
529 |               </div>
530 |             </form>
531 |           </div>
532 |         </div>
533 |       )}
534 |     </div>
535 |   );
536 | }
537 | 
```

### File: apps/frontend/src/pages/EventReport.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { Link, useParams } from "react-router-dom";
  2 | 
  3 | import { api } from "../config/api";
  4 | import AddressLink from "../components/AddressLink";
  5 | 
  6 | export default function EventReport() {
  7 |   const { eventId } = useParams();
  8 |   const [event, setEvent] = useState<any>(null);
  9 |   const [isLoading, setIsLoading] = useState(true);
 10 | 
 11 |   useEffect(() => {
 12 |     const fetch = async () => {
 13 |       try {
 14 |         const res = await api.get(`/events/${eventId}`, {
 15 |           headers: { Authorization: `Bearer ${token}` },
 16 |         });
 17 |         setEvent(res.data);
 18 |       } catch (e) {
 19 |         console.error(e);
 20 |       } finally {
 21 |         setIsLoading(false);
 22 |       }
 23 |     };
 24 |     fetch();
 25 |   }, [eventId]);
 26 | 
 27 |   if (isLoading)
 28 |     return <div className="p-8 text-slate-500">Завантаження...</div>;
 29 |   if (!event)
 30 |     return <div className="p-8 text-slate-500">Подію не знайдено</div>;
 31 | 
 32 |   const report = event.report;
 33 |   const crew = event.crew;
 34 |   const fmt = (n: number) =>
 35 |     new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
 36 | 
 37 |   return (
 38 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
 39 |       {/* Breadcrumb */}
 40 |       <div className="text-xs sm:text-sm text-slate-500 mb-4 flex items-center gap-1 flex-wrap">
 41 |         <Link to="/cities" className="hover:text-blue-600">
 42 |           Міста
 43 |         </Link>
 44 |         <span>›</span>
 45 |         <Link to={`/cities/${event.cityId}`} className="hover:text-blue-600">
 46 |           {event.city?.name}
 47 |         </Link>
 48 |         <span>›</span>
 49 |         <span>Події</span>
 50 |         <span>›</span>
 51 |         <span className="text-slate-800 font-medium">Звіт по події</span>
 52 |       </div>
 53 | 
 54 |       <button
 55 |         onClick={() => history.back()}
 56 |         className="mb-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
 57 |       >
 58 |         ← Назад
 59 |       </button>
 60 | 
 61 |       <div className="flex items-center gap-3 mb-6 flex-wrap">
 62 |         <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
 63 |           Звіт по події
 64 |         </h1>
 65 |         <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
 66 |           Проведено
 67 |         </span>
 68 |       </div>
 69 | 
 70 |       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 71 |         {/* Інформація */}
 72 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
 73 |           <h3 className="font-bold text-slate-800 mb-4">Інформація</h3>
 74 |           <div className="space-y-2 text-sm">
 75 |             <Row label="Заклад" value={event.school?.name} />
 76 |             <Row
 77 |               label="Адреса"
 78 |               value={<AddressLink address={event.address} />}
 79 |             />
 80 |             <Row
 81 |               label="Дата"
 82 |               value={new Date(event.date).toLocaleDateString("uk-UA")}
 83 |             />
 84 |             <Row label="Час" value={event.time} />
 85 |             <Row label="Проєкт" value={event.project} />
 86 |             <Row label="Екіпаж" value={crew?.name} />
 87 |             <Row label="Ведучий" value={crew?.host?.name} />
 88 |             <Row label="Водій" value={crew?.driver?.name} />
 89 |           </div>
 90 |         </div>
 91 | 
 92 |         {/* Результат */}
 93 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
 94 |           <h3 className="font-bold text-slate-800 mb-4">Результат</h3>
 95 |           <div className="space-y-2 text-sm">
 96 |             <Row label="Заплановано дітей" value={event.childrenPlanned} />
 97 |             <Row label="Фактично дітей" value={report?.childrenCount} />
 98 |             <Row label="Вартість" value={`${fmt(event.price)} грн`} />
 99 |             <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
100 |             <Row label="Спосіб оплати" value={event.paymentMethod} />
101 |           </div>
102 |         </div>
103 | 
104 |         {/* Оцінка */}
105 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
106 |           <h3 className="font-bold text-slate-800 mb-4">Оцінка</h3>
107 |           <div className="space-y-2 text-sm">
108 |             <Row
109 |               label="Директор задоволений"
110 |               value={report?.directorSatisfied ? "Так" : "Ні"}
111 |             />
112 |             <Row
113 |               label="Вчителі задоволені"
114 |               value={report?.teachersSatisfied ? "Так" : "Ні"}
115 |             />
116 |             <Row label="Проблеми" value={report?.hadIssues ? "Так" : "Ні"} />
117 |             {report?.comment && (
118 |               <div className="pt-2">
119 |                 <p className="text-slate-400 mb-1">Коментар:</p>
120 |                 <p className="text-slate-700 italic">"{report.comment}"</p>
121 |               </div>
122 |             )}
123 |           </div>
124 |         </div>
125 |       </div>
126 |     </div>
127 |   );
128 | }
129 | 
130 | function Row({ label, value }: { label: string; value: any }) {
131 |   return (
132 |     <div className="flex justify-between">
133 |       <span className="text-slate-400">{label}:</span>
134 |       <span className="font-medium text-slate-800">{value || "—"}</span>
135 |     </div>
136 |   );
137 | }
138 | 
```

### File: apps/frontend/src/pages/Events.tsx
```tsx
  0 | import { useEffect, useState } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { api } from "../config/api";
  3 | import AddressLink from "../components/AddressLink";
  4 | import PhoneLink from "../components/PhoneLink";
  5 | import { useSelectedCity } from "../context/CityContext";
  6 | 
  7 | interface AuthUser {
  8 |   id: string;
  9 |   name: string;
 10 |   role: string;
 11 | }
 12 | 
 13 | interface CrewMember {
 14 |   id: string;
 15 |   name: string;
 16 | }
 17 | 
 18 | interface EventListItem {
 19 |   id: string;
 20 |   project: string;
 21 |   date: string;
 22 |   time?: string | null;
 23 |   status: string;
 24 |   address?: string | null;
 25 |   contactPerson?: string | null;
 26 |   contactPhone?: string | null;
 27 |   school?: { id: string; name: string; type: string } | null;
 28 |   city?: { id: string; name: string } | null;
 29 |   crew?: {
 30 |     host?: CrewMember | null;
 31 |     driver?: CrewMember | null;
 32 |   } | null;
 33 | }
 34 | 
 35 | const STATUS_LABELS: Record<string, string> = {
 36 |   BASE: "База",
 37 |   FIRST_CONTACT: "Перший контакт",
 38 |   INTERESTED: "Зацікавлений",
 39 |   PRE_APPROVAL: "Попереднє погодження",
 40 |   DATE_CONFIRMED: "Дата підтверджена",
 41 |   PREPARATION: "Підготовка",
 42 |   IN_PROGRESS: "В роботі",
 43 |   DONE: "Проведено",
 44 |   REPORT: "Звіт",
 45 |   RE_SALE: "Повторний продаж",
 46 | };
 47 | 
 48 | const STATUS_COLORS: Record<string, string> = {
 49 |   BASE: "bg-slate-100 text-slate-600",
 50 |   FIRST_CONTACT: "bg-sky-50 text-sky-700",
 51 |   INTERESTED: "bg-indigo-50 text-indigo-700",
 52 |   PRE_APPROVAL: "bg-amber-50 text-amber-700",
 53 |   DATE_CONFIRMED: "bg-emerald-50 text-emerald-700",
 54 |   PREPARATION: "bg-violet-50 text-violet-700",
 55 |   IN_PROGRESS: "bg-blue-50 text-blue-700",
 56 |   DONE: "bg-green-50 text-green-700",
 57 |   REPORT: "bg-teal-50 text-teal-700",
 58 |   RE_SALE: "bg-pink-50 text-pink-700",
 59 | };
 60 | 
 61 | // Ролі, для яких сторінка показує лише "власні" події (де вони в екіпажі)
 62 | const FIELD_ROLES = ["DRIVER", "HOST"];
 63 | 
 64 | function formatDate(dateStr: string) {
 65 |   return new Date(dateStr).toLocaleDateString("uk-UA", {
 66 |     day: "2-digit",
 67 |     month: "long",
 68 |     year: "numeric",
 69 |   });
 70 | }
 71 | 
 72 | export default function Events() {
 73 |   const navigate = useNavigate();
 74 |   const [user, setUser] = useState<AuthUser | null>(null);
 75 |   const [events, setEvents] = useState<EventListItem[]>([]);
 76 |   const [isLoading, setIsLoading] = useState(true);
 77 |   const [error, setError] = useState("");
 78 |   const { selectedCity } = useSelectedCity();
 79 | 
 80 |   useEffect(() => {
 81 |     try {
 82 |       const raw = localStorage.getItem("user");
 83 |       if (raw) setUser(JSON.parse(raw));
 84 |     } catch {
 85 |       // ignore
 86 |     }
 87 |   }, []);
 88 | 
 89 |   useEffect(() => {
 90 |     const load = async () => {
 91 |       setIsLoading(true);
 92 |       setError("");
 93 |       try {
 94 |         const res = await api.get("/events");
 95 |         setEvents(res.data);
 96 |       } catch (e) {
 97 |         console.error("Помилка завантаження подій:", e);
 98 |         setError("Не вдалося завантажити список подій");
 99 |       } finally {
100 |         setIsLoading(false);
101 |       }
102 |     };
103 |     void load();
104 |   }, []);
105 | 
106 |   const isFieldStaff = !!user && FIELD_ROLES.includes(user.role);
107 |   const filteredEvents = selectedCity.id
108 |     ? events.filter((ev) => ev.city?.id === selectedCity.id)
109 |     : events;
110 |   const title = isFieldStaff ? "Мої події" : "Розклад подій";
111 |   const subtitle = isFieldStaff
112 |     ? "Події, на які вас призначив менеджер"
113 |     : "Всі заплановані та проведені події";
114 | 
115 |   const goToEvent = (ev: EventListItem) => {
116 |     if (ev.school?.id) navigate(`/schools/${ev.school.id}`);
117 |   };
118 | 
119 |   return (
120 |     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
121 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
122 |         <div>
123 |           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
124 |             {title}
125 |             {selectedCity.id && !isFieldStaff && (
126 |               <span className="ml-2 text-base font-normal text-blue-500">
127 |                 · {selectedCity.name}
128 |               </span>
129 |             )}
130 |           </h1>{" "}
131 |           <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
132 |         </div>
133 |         {!isFieldStaff && (
134 |           <button
135 |             onClick={() => navigate("/schools")}
136 |             className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
137 |           >
138 |             + Додати подію
139 |           </button>
140 |         )}
141 |       </div>
142 | 
143 |       {isLoading && (
144 |         <div className="text-center text-slate-400 py-16">Завантаження...</div>
145 |       )}
146 | 
147 |       {!isLoading && error && (
148 |         <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
149 |           {error}
150 |         </div>
151 |       )}
152 | 
153 |       {!isLoading && !error && filteredEvents.length === 0 && (
154 |         <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
155 |           {isFieldStaff
156 |             ? "Поки що немає подій, на які вас призначено."
157 |             : "Подій ще немає."}
158 |         </div>
159 |       )}
160 | 
161 |       {!isLoading && !error && filteredEvents.length > 0 && (
162 |         <>
163 |           {/* Картки — мобільний вигляд */}
164 |           <div className="md:hidden flex flex-col gap-3">
165 |             {filteredEvents.map((ev) => (
166 |               <div
167 |                 key={ev.id}
168 |                 onClick={() => goToEvent(ev)}
169 |                 className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer active:bg-slate-50"
170 |               >
171 |                 <div className="flex justify-between items-start gap-2">
172 |                   <p className="font-semibold text-gray-800">{ev.project}</p>
173 |                   <span
174 |                     className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${
175 |                       STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
176 |                     }`}
177 |                   >
178 |                     {STATUS_LABELS[ev.status] ?? ev.status}
179 |                   </span>
180 |                 </div>
181 |                 <p className="text-xs text-gray-500 mt-1">
182 |                   {formatDate(ev.date)}
183 |                   {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
184 |                 </p>
185 |                 <p className="text-xs text-gray-500 mt-0.5">
186 |                   🏫 {ev.school?.name ?? "—"}
187 |                 </p>
188 |                 {ev.address && (
189 |                   <p className="text-xs text-gray-500 mt-0.5">
190 |                     📍 <AddressLink address={ev.address} />
191 |                   </p>
192 |                 )}
193 |                 {(ev.crew?.host || ev.crew?.driver) && (
194 |                   <p className="text-xs text-gray-500 mt-1">
195 |                     👤 {ev.crew?.host?.name ?? "—"} · 🚐{" "}
196 |                     {ev.crew?.driver?.name ?? "—"}
197 |                   </p>
198 |                 )}
199 |                 {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
200 |                   <p className="text-xs text-gray-500 mt-0.5">
201 |                     {ev.contactPerson ?? "—"}
202 |                     {ev.contactPhone ? (
203 |                       <>
204 |                         {" "}
205 |                         · <PhoneLink phone={ev.contactPhone} />
206 |                       </>
207 |                     ) : null}
208 |                   </p>
209 |                 )}
210 |               </div>
211 |             ))}
212 |           </div>
213 | 
214 |           {/* Таблиця — десктоп */}
215 |           <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
216 |             <table className="w-full text-left border-collapse">
217 |               <thead>
218 |                 <tr className="bg-gray-50 border-b border-gray-100">
219 |                   <th className="p-4 font-medium text-gray-600">Подія</th>
220 |                   <th className="p-4 font-medium text-gray-600">Дата</th>
221 |                   <th className="p-4 font-medium text-gray-600">Локація</th>
222 |                   <th className="p-4 font-medium text-gray-600">Екіпаж</th>
223 |                   <th className="p-4 font-medium text-gray-600">Статус</th>
224 |                 </tr>
225 |               </thead>
226 |               <tbody>
227 |                 {filteredEvents.map((ev) => (
228 |                   <tr
229 |                     key={ev.id}
230 |                     onClick={() => goToEvent(ev)}
231 |                     className="border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer"
232 |                   >
233 |                     <td className="p-4 text-gray-800 font-medium">
234 |                       {ev.project}
235 |                       <div className="text-xs text-gray-400 font-normal mt-0.5">
236 |                         {ev.school?.name ?? "—"}
237 |                       </div>
238 |                     </td>
239 |                     <td className="p-4 text-gray-600">
240 |                       {formatDate(ev.date)}
241 |                       {ev.time && (
242 |                         <div className="text-xs text-gray-400">{ev.time}</div>
243 |                       )}
244 |                     </td>
245 |                     <td className="p-4 text-gray-600">
246 |                       {ev.city?.name ?? "—"}
247 |                       {ev.address && (
248 |                         <div className="text-xs text-gray-400">
249 |                           <AddressLink address={ev.address} />
250 |                         </div>
251 |                       )}
252 |                     </td>
253 |                     <td className="p-4 text-gray-600 text-sm">
254 |                       <div>👤 {ev.crew?.host?.name ?? "—"}</div>
255 |                       <div>🚐 {ev.crew?.driver?.name ?? "—"}</div>
256 |                     </td>
257 |                     <td className="p-4">
258 |                       <span
259 |                         className={`px-3 py-1 rounded-full text-sm ${
260 |                           STATUS_COLORS[ev.status] ??
261 |                           "bg-slate-100 text-slate-600"
262 |                         }`}
263 |                       >
264 |                         {STATUS_LABELS[ev.status] ?? ev.status}
265 |                       </span>
266 |                     </td>
267 |                   </tr>
268 |                 ))}
269 |               </tbody>
270 |             </table>
271 |           </div>
272 |         </>
273 |       )}
274 |     </div>
275 |   );
276 | }
277 | 
```

### File: apps/frontend/src/pages/Finance.tsx
```tsx
  0 | import { useState, useEffect, lazy, Suspense } from "react";
  1 | import { api } from "../config/api";
  2 | import { useSelectedCity } from "../context/CityContext";
  3 | 
  4 | const FinanceCharts = lazy(() => import("../components/finance/FinanceCharts"));
  5 | const StaffFinanceView = lazy(
  6 |   () => import("../components/finance/StaffFinanceView"),
  7 | );
  8 | 
  9 | function FinanceSkeleton() {
 10 |   return (
 11 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
 12 |       <div className="h-8 bg-slate-200 rounded-xl w-48" />
 13 |       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 14 |         {Array.from({ length: 4 }).map((_, i) => (
 15 |           <div
 16 |             key={i}
 17 |             className="h-24 bg-white rounded-2xl border border-slate-100"
 18 |           />
 19 |         ))}
 20 |       </div>
 21 |       <div className="h-64 bg-white rounded-2xl border border-slate-100" />
 22 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 23 |         <div className="h-48 bg-white rounded-2xl border border-slate-100" />
 24 |         <div className="h-48 bg-white rounded-2xl border border-slate-100" />
 25 |       </div>
 26 |     </div>
 27 |   );
 28 | }
 29 | 
 30 | export default function Finance() {
 31 |   const { selectedCity } = useSelectedCity();
 32 |   const [data, setData] = useState<any>(null);
 33 |   const [isLoading, setIsLoading] = useState(true);
 34 |   const [period, setPeriod] = useState("year");
 35 |   const [projectFilter, setProjectFilter] = useState("");
 36 |   const [currentUser, setCurrentUser] = useState<{
 37 |     role: string;
 38 |     balance?: number;
 39 |   } | null>(null);
 40 |   const [myBalance, setMyBalance] = useState<number | null>(null);
 41 | 
 42 |   useEffect(() => {
 43 |     try {
 44 |       const raw = localStorage.getItem("user");
 45 |       if (raw) setCurrentUser(JSON.parse(raw));
 46 |     } catch {}
 47 |   }, []);
 48 | 
 49 |   const isManagerOrAdmin =
 50 |     currentUser?.role === "MANAGER" || currentUser?.role === "SUPERADMIN";
 51 | 
 52 |   useEffect(() => {
 53 |     if (isManagerOrAdmin === false) {
 54 |       api
 55 |         .get("/finance/my-balance", {
 56 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 57 |         })
 58 |         .then((r) => setMyBalance(r.data.balance))
 59 |         .catch(() => {});
 60 |     }
 61 |   }, [isManagerOrAdmin]);
 62 | 
 63 |   useEffect(() => {
 64 |     if (!isManagerOrAdmin) return;
 65 | 
 66 |     const fetchData = async () => {
 67 |       setIsLoading(true);
 68 |       try {
 69 |         const token = localStorage.getItem("token");
 70 |         const params = new URLSearchParams();
 71 |         if (period) params.set("period", period);
 72 |         if (selectedCity?.id) params.set("cityId", selectedCity.id);
 73 |         if (projectFilter) params.set("project", projectFilter);
 74 | 
 75 |         // Спочатку minimal — швидко показуємо KPI + графік
 76 |         params.set("minimal", "true");
 77 |         const res = await api.get(`/finance/dashboard?${params}`, {
 78 |           headers: { Authorization: `Bearer ${token}` },
 79 |         });
 80 |         setData(res.data);
 81 |         setIsLoading(false);
 82 | 
 83 |         // Потім повні дані (топи, таблиці) у фоні
 84 |         params.set("minimal", "false");
 85 |         api
 86 |           .get(`/finance/dashboard?${params}`, {
 87 |             headers: { Authorization: `Bearer ${token}` },
 88 |           })
 89 |           .then((r) => setData(r.data))
 90 |           .catch(() => {});
 91 |       } catch (error) {
 92 |         console.error("Помилка завантаження фінансів:", error);
 93 |         setIsLoading(false);
 94 |       }
 95 |     };
 96 | 
 97 |     fetchData();
 98 |   }, [selectedCity.id, period, projectFilter, isManagerOrAdmin]);
 99 | 
100 |   if (!isManagerOrAdmin) {
101 |     return (
102 |       <Suspense fallback={<FinanceSkeleton />}>
103 |         <StaffFinanceView myBalance={myBalance} selectedCity={selectedCity} />
104 |       </Suspense>
105 |     );
106 |   }
107 | 
108 |   if (isLoading || !data) return <FinanceSkeleton />;
109 | 
110 |   return (
111 |     <Suspense fallback={<FinanceSkeleton />}>
112 |       <FinanceCharts
113 |         data={data}
114 |         period={period}
115 |         setPeriod={setPeriod}
116 |         projectFilter={projectFilter}
117 |         setProjectFilter={setProjectFilter}
118 |         selectedCity={selectedCity}
119 |       />
120 |     </Suspense>
121 |   );
122 | }
123 | 
```

### File: apps/frontend/src/pages/Kindergartens.tsx
```tsx
  0 | import { useState, useEffect, useRef } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { api } from "../config/api";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | import StatsBar, { classifySchool } from "../components/schools/StatsBar";
  5 | 
  6 | const PIPELINE_STAGES = [
  7 |   { key: "BASE", name: "Новий заклад" },
  8 |   { key: "FIRST_CONTACT", name: "Знайомство" },
  9 |   { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 10 |   { key: "PREPARATION", name: "Оголошення" },
 11 |   { key: "IN_PROGRESS", name: "Підготовка" },
 12 |   { key: "DONE", name: "Проведення заходу" },
 13 |   { key: "REPORT", name: "Звіт" },
 14 | ];
 15 | 
 16 | interface City {
 17 |   id: string;
 18 |   name: string;
 19 | }
 20 | 
 21 | export default function Kindergartens() {
 22 |   const navigate = useNavigate();
 23 |   const { selectedCity } = useSelectedCity();
 24 |   const [schools, setSchools] = useState<any[]>([]);
 25 |   const [cities, setCities] = useState<City[]>([]);
 26 |   const [isModalOpen, setIsModalOpen] = useState(false);
 27 |   const [isSubmitting, setIsSubmitting] = useState(false);
 28 |   const [form, setForm] = useState({
 29 |     name: "",
 30 |     cityId: "",
 31 |     sourceUrl: "",
 32 |     director: "",
 33 |     phone: "",
 34 |   });
 35 |   const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
 36 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 37 |   const [suggestions, setSuggestions] = useState<
 38 |     { name: string; url: string }[]
 39 |   >([]);
 40 |   const [showSuggestions, setShowSuggestions] = useState(false);
 41 |   const [isSearching, setIsSearching] = useState(false);
 42 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 43 | 
 44 |   const fetchSchools = async () => {
 45 |     try {
 46 |       const token = localStorage.getItem("token");
 47 |       const res = await api.get("/schools", {
 48 |         headers: { Authorization: `Bearer ${token}` },
 49 |       });
 50 |       setSchools(res.data);
 51 |     } catch (e) {
 52 |       console.error(e);
 53 |     }
 54 |   };
 55 | 
 56 |   const fetchCities = async () => {
 57 |     try {
 58 |       const token = localStorage.getItem("token");
 59 |       const res = await api.get("/cities", {
 60 |         headers: { Authorization: `Bearer ${token}` },
 61 |       });
 62 |       setCities(res.data);
 63 |     } catch (e) {
 64 |       console.error(e);
 65 |     }
 66 |   };
 67 | 
 68 |   useEffect(() => {
 69 |     fetchSchools();
 70 |     fetchCities();
 71 |   }, []);
 72 | 
 73 |   const handleOpenModal = () => {
 74 |     setForm({
 75 |       name: "",
 76 |       cityId: selectedCity.id || cities[0]?.id || "",
 77 |       sourceUrl: "",
 78 |       director: "",
 79 |       phone: "",
 80 |     });
 81 |     setMatchedContacts([]);
 82 |     setIsModalOpen(true);
 83 |   };
 84 | 
 85 |   const fetchContacts = async (schoolName: string) => {
 86 |     if (!schoolName || schoolName.trim().length < 1) {
 87 |       setMatchedContacts([]);
 88 |       return;
 89 |     }
 90 |     const currentCityName =
 91 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
 92 |     if (currentCityName.toLowerCase() !== "львів") {
 93 |       setMatchedContacts([]);
 94 |       return;
 95 |     }
 96 |     try {
 97 |       const token = localStorage.getItem("token");
 98 |       const res = await api.get(
 99 |         `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=${encodeURIComponent("Садочок")}`,
100 |         { headers: { Authorization: `Bearer ${token}` } },
101 |       );
102 |       setMatchedContacts(res.data);
103 |       if (res.data.length > 0) {
104 |         const director =
105 |           res.data.find(
106 |             (c: any) =>
107 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
108 |           ) || res.data[0];
109 |         setForm((f) => ({
110 |           ...f,
111 |           director: director.contactName,
112 |           phone: director.phone,
113 |         }));
114 |       }
115 |     } catch (e) {
116 |       console.error(e);
117 |     }
118 |   };
119 | 
120 |   const handleNameChange = (value: string) => {
121 |     setForm({ ...form, name: value });
122 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
123 |     if (value.length < 2) {
124 |       setShowSuggestions(false);
125 |       setIsSearching(false);
126 |       setMatchedContacts([]);
127 |       return;
128 |     }
129 |     setIsSearching(true);
130 |     setShowSuggestions(true);
131 |     debounceTimer.current = setTimeout(async () => {
132 |       const token = localStorage.getItem("token");
133 |       try {
134 |         const [externalRes] = await Promise.all([
135 |           api.get(
136 |             `/schools/search?q=${value}&type=${encodeURIComponent("Садочок")}`,
137 |             {
138 |               headers: { Authorization: `Bearer ${token}` },
139 |             },
140 |           ),
141 |           fetchContacts(value),
142 |         ]);
143 |         setSuggestions(externalRes.data);
144 |       } catch (e) {
145 |         console.error(e);
146 |       } finally {
147 |         setIsSearching(false);
148 |       }
149 |     }, 400);
150 |   };
151 | 
152 |   const handleSelectSuggestion = (name: string, url: string) => {
153 |     setForm({ ...form, name, sourceUrl: url });
154 |     setShowSuggestions(false);
155 |     fetchContacts(name);
156 |   };
157 | 
158 |   const handleAddSchool = async (e: React.FormEvent) => {
159 |     e.preventDefault();
160 |     if (!form.name.trim() || !form.cityId) return;
161 |     setIsSubmitting(true);
162 |     try {
163 |       const token = localStorage.getItem("token");
164 |       await api.post(
165 |         "/schools",
166 |         { ...form, type: "Садочок" },
167 |         {
168 |           headers: { Authorization: `Bearer ${token}` },
169 |         },
170 |       );
171 |       setIsModalOpen(false);
172 |       fetchSchools();
173 |     } catch (e) {
174 |       console.error(e);
175 |       alert("Не вдалося створити садочок");
176 |     } finally {
177 |       setIsSubmitting(false);
178 |     }
179 |   };
180 | 
181 |   const handleDeleteSchool = async (
182 |     e: React.MouseEvent,
183 |     schoolId: string,
184 |     schoolName: string,
185 |   ) => {
186 |     e.stopPropagation();
187 |     if (
188 |       !window.confirm(
189 |         `Видалити садочок "${schoolName}"? Це видалить також усі його події.`,
190 |       )
191 |     )
192 |       return;
193 |     try {
194 |       await api.delete(`/schools/${schoolId}`, {
195 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
196 |       });
197 |       setSchools(schools.filter((s) => s.id !== schoolId));
198 |     } catch (e) {
199 |       console.error(e);
200 |     }
201 |   };
202 | 
203 |   const filteredKindergartens = schools.filter((s) => {
204 |     const isCityMatch = selectedCity.id ? s.cityId === selectedCity.id : true;
205 |     const isFilterMatch = activeFilter
206 |       ? classifySchool(s) === activeFilter
207 |       : true;
208 |     return isCityMatch && s.type === "Садочок" && isFilterMatch;
209 |   });
210 | 
211 |   return (
212 |     <div className="p-4 md:p-8 h-full max-w-[100vw]">
213 |       <div className="flex items-center justify-between gap-2 mb-3">
214 |         <h1 className="text-xl font-bold text-slate-800">
215 |           Садочки
216 |           {selectedCity.id && (
217 |             <span className="ml-2 text-sm font-normal text-blue-500">
218 |               · {selectedCity.name}
219 |             </span>
220 |           )}
221 |         </h1>
222 |         <div className="flex gap-2 shrink-0">
223 |           <button
224 |             onClick={async () => {
225 |               if (!selectedCity.id) return alert("Спочатку оберіть місто");
226 |               if (
227 |                 !window.confirm(
228 |                   `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
229 |                 )
230 |               )
231 |                 return;
232 |               try {
233 |                 const token = localStorage.getItem("token");
234 |                 const res = await api.post(
235 |                   "/schools/bulk-import",
236 |                   { cityId: selectedCity.id, type: "Садочок" },
237 |                   {
238 |                     headers: { Authorization: `Bearer ${token}` },
239 |                     timeout: 120000,
240 |                   },
241 |                 );
242 |                 alert(
243 |                   `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
244 |                 );
245 |                 fetchSchools();
246 |               } catch (e) {
247 |                 alert("Помилка імпорту.");
248 |               }
249 |             }}
250 |             className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
251 |           >
252 |             📥 Імпорт з isuo
253 |           </button>
254 |           <button
255 |             onClick={handleOpenModal}
256 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
257 |           >
258 |             + Додати
259 |           </button>
260 |         </div>
261 |       </div>
262 | 
263 |       <StatsBar
264 |         schools={schools.filter(
265 |           (s) =>
266 |             (selectedCity.id ? s.cityId === selectedCity.id : true) &&
267 |             s.type === "Садочок",
268 |         )}
269 |         activeFilter={activeFilter}
270 |         onFilterChange={setActiveFilter}
271 |       />
272 | 
273 |       {/* Мобільний вигляд */}
274 |       <div className="md:hidden flex flex-col gap-2.5">
275 |         {filteredKindergartens.map((school) => {
276 |           const latestEvent = school.events?.[0];
277 |           const stage = latestEvent
278 |             ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
279 |             : null;
280 | 
281 |           // Остання активність
282 |           const lastActivityDate =
283 |             school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
284 |           const daysStale = lastActivityDate
285 |             ? Math.floor(
286 |                 (Date.now() - new Date(lastActivityDate).getTime()) / 86400000,
287 |               )
288 |             : null;
289 | 
290 |           const stalenessColor =
291 |             daysStale === null
292 |               ? "text-slate-400"
293 |               : daysStale >= 21
294 |                 ? "text-red-500"
295 |                 : daysStale >= 14
296 |                   ? "text-orange-500"
297 |                   : daysStale >= 7
298 |                     ? "text-amber-500"
299 |                     : "text-emerald-500";
300 | 
301 |           return (
302 |             <div
303 |               key={school.id}
304 |               onClick={() => navigate(`/schools/${school.id}`)}
305 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform"
306 |             >
307 |               {/* Рядок 1: назва + видалити */}
308 |               <div className="flex items-start justify-between gap-2">
309 |                 <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
310 |                   {school.name}
311 |                 </p>
312 |                 <button
313 |                   onClick={(e) => handleDeleteSchool(e, school.id, school.name)}
314 |                   className="text-slate-300 active:text-red-500 p-1 -mt-0.5 -mr-1 shrink-0"
315 |                 >
316 |                   🗑
317 |                 </button>
318 |               </div>
319 | 
320 |               {/* Рядок 2: директор (клікабельний телефон) + етап */}
321 |               <div className="flex items-center justify-between gap-2 mt-2">
322 |                 <div className="flex items-center gap-1.5 min-w-0">
323 |                   {school.phone ? (
324 |                     <a
325 |                       href={`tel:${school.phone}`}
326 |                       onClick={(e) => e.stopPropagation()}
327 |                       className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
328 |                     >
329 |                       📞 {school.director || school.phone}
330 |                     </a>
331 |                   ) : school.director ? (
332 |                     <span className="text-xs text-slate-500 truncate">
333 |                       👤 {school.director}
334 |                     </span>
335 |                   ) : (
336 |                     <span className="text-xs text-slate-300 italic">
337 |                       Контакт не вказано
338 |                     </span>
339 |                   )}
340 |                 </div>
341 | 
342 |                 {stage ? (
343 |                   <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
344 |                     {stage.name}
345 |                   </span>
346 |                 ) : (
347 |                   <span className="text-[10px] text-slate-300 shrink-0">
348 |                     Етап —
349 |                   </span>
350 |                 )}
351 |               </div>
352 | 
353 |               {/* Рядок 3: остання активність */}
354 |               {daysStale !== null && (
355 |                 <p className={`text-[11px] mt-1.5 ${stalenessColor}`}>
356 |                   ⏱{" "}
357 |                   {daysStale === 0
358 |                     ? "Активність сьогодні"
359 |                     : `Остання активність ${daysStale} дн тому`}
360 |                 </p>
361 |               )}
362 |             </div>
363 |           );
364 |         })}
365 | 
366 |         {filteredKindergartens.length === 0 && (
367 |           <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
368 |             Садочків ще немає
369 |           </div>
370 |         )}
371 | 
372 |         {/* FAB */}
373 |         <button
374 |           onClick={handleOpenModal}
375 |           className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
376 |         >
377 |           +
378 |         </button>
379 |       </div>
380 | 
381 |       {/* Десктоп таблиця */}
382 |       <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto w-full">
383 |         <table className="w-full text-left border-collapse">
384 |           <thead>
385 |             <tr className="bg-slate-50 border-b border-slate-100">
386 |               <th className="p-4 font-medium text-slate-600">Назва садочку</th>
387 |               <th className="p-4 font-medium text-slate-600">Місто</th>
388 |               <th className="p-4 font-medium text-slate-600">Статус</th>
389 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
390 |               <th className="p-4 font-medium text-slate-600 text-center">
391 |                 Дія
392 |               </th>
393 |             </tr>
394 |           </thead>
395 |           <tbody>
396 |             {filteredKindergartens.map((school) => {
397 |               const latestEvent = school.events?.[0];
398 |               const stage = latestEvent
399 |                 ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
400 |                 : null;
401 |               return (
402 |                 <tr
403 |                   key={school.id}
404 |                   onClick={() => navigate(`/schools/${school.id}`)}
405 |                   className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/50 transition"
406 |                 >
407 |                   <td className="p-4 text-slate-800 font-medium">
408 |                     {school.name}
409 |                   </td>
410 |                   <td className="p-4 text-slate-600">{school.city?.name}</td>
411 |                   <td className="p-4">
412 |                     <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
413 |                       Активний
414 |                     </span>
415 |                   </td>
416 |                   <td className="p-4">
417 |                     {stage ? (
418 |                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
419 |                         {stage.name}
420 |                       </span>
421 |                     ) : (
422 |                       <span className="text-slate-400 text-xs italic">—</span>
423 |                     )}
424 |                   </td>
425 |                   <td className="p-4 text-center">
426 |                     <button
427 |                       onClick={(e) =>
428 |                         handleDeleteSchool(e, school.id, school.name)
429 |                       }
430 |                       className="text-slate-400 hover:text-red-500 transition-colors p-2"
431 |                     >
432 |                       🗑
433 |                     </button>
434 |                   </td>
435 |                 </tr>
436 |               );
437 |             })}
438 |           </tbody>
439 |         </table>
440 |       </div>
441 | 
442 |       {/* Модалка */}
443 |       {isModalOpen && (
444 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
445 |           <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col">
446 |             <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
447 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
448 |               <h3 className="text-xl font-bold text-slate-800">
449 |                 Новий садочок
450 |               </h3>
451 |               <button
452 |                 onClick={() => setIsModalOpen(false)}
453 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2"
454 |               >
455 |                 ✕
456 |               </button>
457 |             </div>
458 |             <form
459 |               onSubmit={handleAddSchool}
460 |               className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto"
461 |             >
462 |               <div className="relative">
463 |                 <label className="block text-sm text-slate-600 mb-1">
464 |                   Назва садочку
465 |                 </label>
466 |                 <input
467 |                   type="text"
468 |                   value={form.name}
469 |                   onChange={(e) => handleNameChange(e.target.value)}
470 |                   onBlur={() =>
471 |                     setTimeout(() => setShowSuggestions(false), 150)
472 |                   }
473 |                   required
474 |                   placeholder="Наприклад: Садочок №1"
475 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
476 |                 />
477 |                 {showSuggestions && (
478 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
479 |                     {isSearching ? (
480 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
481 |                         Пошук за збігами...
482 |                       </li>
483 |                     ) : suggestions.length > 0 ? (
484 |                       suggestions.map((s, i) => (
485 |                         <li
486 |                           key={i}
487 |                           onMouseDown={() =>
488 |                             handleSelectSuggestion(s.name, s.url)
489 |                           }
490 |                           className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
491 |                         >
492 |                           {s.name}
493 |                         </li>
494 |                       ))
495 |                     ) : (
496 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
497 |                         Нічого не знайдено
498 |                       </li>
499 |                     )}
500 |                   </ul>
501 |                 )}
502 |               </div>
503 | 
504 |               {!selectedCity.id && (
505 |                 <div>
506 |                   <label className="block text-sm text-slate-600 mb-1">
507 |                     Місто
508 |                   </label>
509 |                   <select
510 |                     value={form.cityId}
511 |                     onChange={(e) =>
512 |                       setForm({ ...form, cityId: e.target.value })
513 |                     }
514 |                     required
515 |                     className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
516 |                   >
517 |                     <option value="">— Оберіть місто —</option>
518 |                     {cities.map((c) => (
519 |                       <option key={c.id} value={c.id}>
520 |                         {c.name}
521 |                       </option>
522 |                     ))}
523 |                   </select>
524 |                 </div>
525 |               )}
526 | 
527 |               <div>
528 |                 <label className="block text-sm text-slate-600 mb-1">
529 |                   Контакт{" "}
530 |                   <span className="ml-1 text-xs text-slate-400">
531 |                     (автозаповнення)
532 |                   </span>
533 |                 </label>
534 |                 {matchedContacts.length > 0 && (
535 |                   <div className="flex flex-wrap gap-1 mb-2">
536 |                     {matchedContacts.map((c, i) => (
537 |                       <button
538 |                         key={i}
539 |                         type="button"
540 |                         onClick={() =>
541 |                           setForm((f) => ({
542 |                             ...f,
543 |                             director: c.contactName,
544 |                             phone: c.phone,
545 |                           }))
546 |                         }
547 |                         className={`text-xs px-2 py-1 rounded-full border transition-colors ${
548 |                           form.director === c.contactName
549 |                             ? "bg-blue-600 text-white border-blue-600"
550 |                             : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
551 |                         }`}
552 |                       >
553 |                         {c.role ? `${c.role}: ` : ""}
554 |                         {c.contactName}
555 |                       </button>
556 |                     ))}
557 |                   </div>
558 |                 )}
559 |                 <input
560 |                   type="text"
561 |                   value={form.director}
562 |                   onChange={(e) =>
563 |                     setForm({ ...form, director: e.target.value })
564 |                   }
565 |                   placeholder="Микола Петренко"
566 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
567 |                 />
568 |               </div>
569 | 
570 |               <div>
571 |                 <label className="block text-sm text-slate-600 mb-1">
572 |                   Телефон{" "}
573 |                   <span className="ml-1 text-xs text-slate-400">
574 |                     (автозаповнення)
575 |                   </span>
576 |                 </label>
577 |                 <input
578 |                   type="text"
579 |                   value={form.phone}
580 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
581 |                   placeholder="0671234567"
582 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
583 |                 />
584 |               </div>
585 | 
586 |               <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2 pb-1 sm:pb-0">
587 |                 <button
588 |                   type="button"
589 |                   onClick={() => setIsModalOpen(false)}
590 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 rounded-xl sm:rounded-lg text-sm font-medium hover:bg-slate-200"
591 |                 >
592 |                   Скасувати
593 |                 </button>
594 |                 <button
595 |                   type="submit"
596 |                   disabled={isSubmitting}
597 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl sm:rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
598 |                 >
599 |                   {isSubmitting ? "Збереження..." : "Створити"}
600 |                 </button>
601 |               </div>
602 |             </form>
603 |           </div>
604 |         </div>
605 |       )}
606 |     </div>
607 |   );
608 | }
609 | 
```

### File: apps/frontend/src/pages/Login.tsx
```tsx
  0 | 
  1 | 
  2 | import { useState } from 'react';
  3 | import axios from 'axios';
  4 | import { useNavigate } from 'react-router-dom';
  5 | 
  6 | import { API_BASE_URL } from '../config/api';
  7 | 
  8 | export default function Login() {
  9 |   const [email, setEmail] = useState('admin@crm.com');
 10 |   const [password, setPassword] = useState('admin123');
 11 |   const [error, setError] = useState('');
 12 |   const navigate = useNavigate();
 13 | 
 14 |   const handleLogin = async (e: React.FormEvent) => {
 15 |     e.preventDefault();
 16 |     setError('');
 17 | 
 18 |     try {
 19 |       const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
 20 | 
 21 |       localStorage.setItem('token', response.data.access_token);
 22 |       // Зберігаємо інфо про користувача для відображення в сайдбарі
 23 |       localStorage.setItem('user', JSON.stringify(response.data.user));
 24 |       navigate('/cities');
 25 |     } catch {
 26 |       setError('Невірний email або пароль');
 27 |     }
 28 |   };
 29 | 
 30 |   return (
 31 |     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
 32 |       <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
 33 |         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Вхід у CRM</h1>
 34 | 
 35 |         {error && (
 36 |           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">{error}</div>
 37 |         )}
 38 | 
 39 |         <form onSubmit={handleLogin} className="flex flex-col gap-4">
 40 |           <div>
 41 |             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
 42 |             <input
 43 |               type="email"
 44 |               value={email}
 45 |               onChange={(e) => setEmail(e.target.value)}
 46 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
 47 |               required
 48 |             />
 49 |           </div>
 50 |           <div>
 51 |             <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
 52 |             <input
 53 |               type="password"
 54 |               value={password}
 55 |               onChange={(e) => setPassword(e.target.value)}
 56 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
 57 |               required
 58 |             />
 59 |           </div>
 60 |           <button type="submit" className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition">
 61 |             Увійти
 62 |           </button>
 63 |         </form>
 64 |       </div>
 65 |     </div>
 66 |   );
 67 | }
 68 | 
 69 | 
 70 | 
```

### File: apps/frontend/src/pages/SchoolProfile.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { useParams } from "react-router-dom";
  2 | import { api } from "../config/api";
  3 | 
  4 | // Імпортуємо UI компоненти
  5 | import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
  6 | import SchoolInfoCard from "../components/school-profile/SchoolInfoCard";
  7 | import HistoryTimeline from "../components/school-profile/HistoryTimeline";
  8 | import Pipeline from "../components/school-profile/Pipeline";
  9 | import EventDetails from "../components/school-profile/EventDetails";
 10 | import EventsTable from "../components/school-profile/EventsTable";
 11 | import EventPreparation from "../components/school-profile/EventPreparation";
 12 | import AssignedCrew from "../components/school-profile/AssignedCrew";
 13 | 
 14 | // Імпортуємо модальні вікна
 15 | import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
 16 | import EventModal from "../components/school-profile/modals/EventModal";
 17 | import CommentModal from "../components/school-profile/modals/CommentModal";
 18 | import CrewModal from "../components/school-profile/modals/CrewModal";
 19 | import ReportModal from "../components/school-profile/modals/ReportModal";
 20 | 
 21 | const PIPELINE_STAGES = [
 22 |   { id: 1, key: "BASE", name: "Новий заклад" },
 23 |   { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
 24 |   { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 25 |   { id: 4, key: "PREPARATION", name: "Оголошення" },
 26 |   { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
 27 |   { id: 6, key: "DONE", name: "Проведення заходу" },
 28 |   { id: 7, key: "REPORT", name: "Звіт" },
 29 | ];
 30 | 
 31 | export default function SchoolProfile() {
 32 |   const { id } = useParams();
 33 |   const [isLoading, setIsLoading] = useState(true);
 34 | 
 35 |   const [users, setUsers] = useState<any[]>([]);
 36 |   const [schoolData, setSchoolData] = useState<any>({
 37 |     id: "",
 38 |     cityId: "",
 39 |     name: "",
 40 |     type: "Школа",
 41 |     city: "",
 42 |     address: "",
 43 |     director: "",
 44 |     phone: "",
 45 |     email: "",
 46 |     childrenCount: 0,
 47 |     notes: "",
 48 |   });
 49 |   const [events, setEvents] = useState<any[]>([]);
 50 |   const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
 51 |   const [exitingEventId, setExitingEventId] = useState<string | null>(null);
 52 | 
 53 |   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 54 |   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
 55 |   const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
 56 |   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
 57 |   const [commentModal, setCommentModal] = useState({
 58 |     isOpen: false,
 59 |     mode: "pipeline",
 60 |     stepId: null as number | null,
 61 |     historyId: null as string | null,
 62 |     text: "",
 63 |   });
 64 | 
 65 |   const [editForm, setEditForm] = useState(schoolData);
 66 |   const [eventForm, setEventForm] = useState({
 67 |     project: "Голограма для школи",
 68 |     date: "",
 69 |     time: "11:00",
 70 |     childrenPlanned: "",
 71 |     price: "",
 72 |     address: "",
 73 |     contactPerson: "",
 74 |     contactPhone: "",
 75 |   });
 76 | 
 77 |   const fetchData = async () => {
 78 |     try {
 79 |       const headers = {
 80 |         Authorization: `Bearer ${localStorage.getItem("token")}`,
 81 |       };
 82 |       const schoolRes = await api.get(`/schools/${id}`, { headers });
 83 |       if (schoolRes.data) {
 84 |         setSchoolData({
 85 |           id: schoolRes.data.id,
 86 |           cityId: schoolRes.data.cityId,
 87 |           name: schoolRes.data.name || "",
 88 |           type: schoolRes.data.type || "Школа",
 89 |           city: schoolRes.data.city?.name || "",
 90 |           address: schoolRes.data.address || "",
 91 |           director: schoolRes.data.director || "",
 92 |           phone: schoolRes.data.phone || "",
 93 |           email: schoolRes.data.email || "",
 94 |           childrenCount: schoolRes.data.childrenCount || 0,
 95 |           notes: schoolRes.data.notes || "",
 96 |         });
 97 |         setEditForm({
 98 |           ...schoolRes.data,
 99 |           city: schoolRes.data.city?.name || "",
100 |         });
101 |       }
102 | 
103 |       const eventsRes = await api.get(`/events/school/${id}`, { headers });
104 |       setEvents(eventsRes.data.filter((ev: any) => ev.status !== "RE_SALE"));
105 |       if (eventsRes.data.length > 0 && !selectedEventId) {
106 |         setSelectedEventId(eventsRes.data[0].id);
107 |       }
108 |       const usersRes = await api.get("/users", { headers });
109 |       setUsers(usersRes.data);
110 |     } catch (error) {
111 |       console.error(error);
112 |     } finally {
113 |       setIsLoading(false);
114 |     }
115 |   };
116 | 
117 |   useEffect(() => {
118 |     fetchData();
119 |   }, [id]);
120 | 
121 |   const currentEvent =
122 |     events.find((ev) => ev.id === selectedEventId) || events[0];
123 |   const currentStageIndex =
124 |     PIPELINE_STAGES.findIndex((s) => s.key === currentEvent?.status) !== -1
125 |       ? PIPELINE_STAGES.findIndex((s) => s.key === currentEvent?.status)
126 |       : 0;
127 |   const creatorName =
128 |     currentEvent?.history?.length > 0
129 |       ? currentEvent.history[currentEvent.history.length - 1].userName
130 |       : "Немає даних";
131 | 
132 |   const handlePipelineClick = (stepId: number) => {
133 |     if (!currentEvent) return;
134 |     const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
135 |     if (nextStage?.id !== stepId) return;
136 |     if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
137 |     setCommentModal({
138 |       isOpen: true,
139 |       mode: "pipeline",
140 |       stepId: nextStage.id,
141 |       historyId: null,
142 |       text: "",
143 |     });
144 |   };
145 | 
146 |   const handleHistoryClick = (historyItem: any) => {
147 |     setCommentModal({
148 |       isOpen: true,
149 |       mode: "history",
150 |       stepId: null,
151 |       historyId: historyItem.id,
152 |       text: historyItem.comment || "",
153 |     });
154 |   };
155 | 
156 |   const handleAddCommentClick = () => {
157 |     setCommentModal({
158 |       isOpen: true,
159 |       mode: "add_comment",
160 |       stepId: null,
161 |       historyId: null,
162 |       text: "",
163 |     });
164 |   };
165 | 
166 |   const handleSaveComment = async (e: React.FormEvent) => {
167 |     e.preventDefault();
168 |     try {
169 |       const headers = {
170 |         Authorization: `Bearer ${localStorage.getItem("token")}`,
171 |       };
172 | 
173 |       if (commentModal.mode === "pipeline") {
174 |         const activeStage = PIPELINE_STAGES[currentStageIndex];
175 |         const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
176 |         if (!nextStage) return;
177 | 
178 |         const res = await api.patch(
179 |           `/events/${currentEvent.id}/status`,
180 |           {
181 |             status: nextStage.key,
182 |             actionName: `Етап пройдено: ${activeStage.name}`,
183 |             comment: commentModal.text,
184 |           },
185 |           { headers },
186 |         );
187 |         if (nextStage.key === "RE_SALE") {
188 |           setExitingEventId(currentEvent.id);
189 |           setTimeout(() => {
190 |             setEvents((prev) => prev.filter((ev) => ev.id !== currentEvent.id));
191 |             setSelectedEventId(null);
192 |             setExitingEventId(null);
193 |           }, 500);
194 |         } else {
195 |           setEvents((prev) =>
196 |             prev.map((ev) =>
197 |               ev.id === currentEvent.id ? { ...ev, ...res.data } : ev,
198 |             ),
199 |           );
200 |         }
201 |       } else if (commentModal.mode === "add_comment") {
202 |         const res = await api.post(
203 |           `/events/${currentEvent.id}/history`,
204 |           { comment: commentModal.text },
205 |           { headers },
206 |         );
207 |         setEvents((prev) =>
208 |           prev.map((ev) =>
209 |             ev.id === currentEvent.id
210 |               ? { ...ev, history: res.data.history }
211 |               : ev,
212 |           ),
213 |         );
214 |       } else if (commentModal.mode === "history" && commentModal.historyId) {
215 |         await api.patch(
216 |           `/events/history/${commentModal.historyId}`,
217 |           { comment: commentModal.text },
218 |           { headers },
219 |         );
220 |         setEvents((prev) =>
221 |           prev.map((ev) =>
222 |             ev.id === currentEvent.id
223 |               ? {
224 |                   ...ev,
225 |                   history: ev.history.map((h: any) =>
226 |                     h.id === commentModal.historyId
227 |                       ? { ...h, comment: commentModal.text }
228 |                       : h,
229 |                   ),
230 |                 }
231 |               : ev,
232 |           ),
233 |         );
234 |       }
235 |       setCommentModal({
236 |         isOpen: false,
237 |         mode: "pipeline",
238 |         stepId: null,
239 |         historyId: null,
240 |         text: "",
241 |       });
242 |     } catch (e) {
243 |       console.error(e);
244 |     }
245 |   };
246 | 
247 |   const handleSaveEvent = async (e: React.FormEvent) => {
248 |     e.preventDefault();
249 |     try {
250 |       const payload = {
251 |         ...eventForm,
252 |         schoolId: schoolData.id,
253 |         cityId: schoolData.cityId,
254 |         childrenPlanned: Number(eventForm.childrenPlanned),
255 |         price: Number(eventForm.price),
256 |       };
257 |       const res = await api.post("/events", payload, {
258 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
259 |       });
260 |       setIsEventModalOpen(false);
261 |       setEvents((prev) => [res.data, ...prev]);
262 |       setSelectedEventId(res.data.id);
263 |     } catch (e) {
264 |       console.error(e);
265 |     }
266 |   };
267 | 
268 |   const handleSaveSchoolInfo = async (e: React.FormEvent) => {
269 |     e.preventDefault();
270 |     try {
271 |       await api.patch(`/schools/${id}`, editForm, {
272 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
273 |       });
274 |       setSchoolData(editForm);
275 |       setIsEditModalOpen(false);
276 |     } catch (e) {
277 |       console.error(e);
278 |     }
279 |   };
280 | 
281 |   const handleUpdatePreparation = async (field: string, status: string) => {
282 |     if (!currentEvent) return;
283 |     try {
284 |       await api.patch(
285 |         `/events/${currentEvent.id}/preparation`,
286 |         { field, status },
287 |         {
288 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
289 |         },
290 |       );
291 |       setEvents((prev) =>
292 |         prev.map((ev) =>
293 |           ev.id === currentEvent.id
294 |             ? {
295 |                 ...ev,
296 |                 preparation: { ...(ev.preparation || {}), [field]: status },
297 |               }
298 |             : ev,
299 |         ),
300 |       );
301 |     } catch (e) {
302 |       console.error("Помилка оновлення підготовки", e);
303 |     }
304 |   };
305 | 
306 |   const handleSubmitReport = async (reportData: any) => {
307 |     if (!currentEvent) return;
308 |     try {
309 |       const headers = {
310 |         Authorization: `Bearer ${localStorage.getItem("token")}`,
311 |       };
312 |       await api.post(`/events/${currentEvent.id}/report`, reportData, {
313 |         headers,
314 |       });
315 |       await api.patch(
316 |         `/events/${currentEvent.id}/status`,
317 |         { status: "RE_SALE", actionName: "Звіт сформовано. Захід завершено." },
318 |         { headers },
319 |       );
320 |       setExitingEventId(currentEvent.id);
321 |       setTimeout(() => {
322 |         setEvents((prev) => prev.filter((ev) => ev.id !== currentEvent.id));
323 |         setSelectedEventId(null);
324 |         setExitingEventId(null);
325 |       }, 500);
326 |       setIsReportModalOpen(false);
327 |     } catch (e) {
328 |       console.error(e);
329 |     }
330 |   };
331 | 
332 |   const handleAssignCrew = async (crewId: string) => {
333 |     try {
334 |       const res = await api.post(
335 |         `/events/${currentEvent.id}/assign-crew`,
336 |         { crewId },
337 |         {
338 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
339 |         },
340 |       );
341 |       await handleUpdatePreparation("assignCrew", "Виконано");
342 |       setEvents((prev) =>
343 |         prev.map((ev) =>
344 |           ev.id === currentEvent.id ? { ...ev, ...res.data } : ev,
345 |         ),
346 |       );
347 |       setIsCrewModalOpen(false);
348 |     } catch (e) {
349 |       console.error(e);
350 |     }
351 |   };
352 | 
353 |   const openAddEventModal = () => {
354 |     setEventForm((prev) => ({
355 |       ...prev,
356 |       address: schoolData.address,
357 |       contactPerson: schoolData.director,
358 |       contactPhone: schoolData.phone,
359 |       childrenPlanned: String(schoolData.childrenCount),
360 |     }));
361 |     setIsEventModalOpen(true);
362 |   };
363 | 
364 |   if (isLoading)
365 |     return <div className="p-8 text-slate-500">Завантаження...</div>;
366 | 
367 |   return (
368 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8">
369 |       <SchoolProfileHeader
370 |         schoolData={schoolData}
371 |         onEdit={() => {
372 |           setEditForm(schoolData);
373 |           setIsEditModalOpen(true);
374 |         }}
375 |         onAddEvent={openAddEventModal}
376 |       />
377 | 
378 |       <div className="flex flex-col xl:flex-row gap-6">
379 |         <div className="w-full xl:w-80 flex flex-col gap-6">
380 |           <SchoolInfoCard schoolData={schoolData} />
381 |           {currentEvent && currentStageIndex >= 1 && (
382 |             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-500">
383 |               <h3 className="font-bold text-slate-800 mb-4">
384 |                 Відповідальна особа
385 |               </h3>
386 |               <ul className="space-y-2 text-sm">
387 |                 <li className="flex justify-between">
388 |                   <span className="text-slate-500">Остання дія:</span>{" "}
389 |                   <span className="font-medium text-blue-600">
390 |                     {creatorName}
391 |                   </span>
392 |                 </li>
393 |               </ul>
394 |             </div>
395 |           )}
396 |           <HistoryTimeline
397 |             currentEvent={currentEvent}
398 |             onHistoryClick={handleHistoryClick}
399 |             onAddCommentClick={handleAddCommentClick}
400 |           />
401 |         </div>
402 | 
403 |         <div
404 |           className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${exitingEventId === currentEvent?.id ? "opacity-0 scale-95 -translate-y-4 pointer-events-none" : "opacity-100 scale-100 translate-y-0"}`}
405 |         >
406 |           {currentEvent && (
407 |             <Pipeline
408 |               currentStageIndex={currentStageIndex}
409 |               currentEvent={currentEvent}
410 |               onPipelineClick={handlePipelineClick}
411 |               stages={PIPELINE_STAGES}
412 |             />
413 |           )}
414 | 
415 |           {currentEvent && currentStageIndex >= 4 && (
416 |             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
417 |               <EventPreparation
418 |                 data={currentEvent.preparation || {}}
419 |                 onUpdate={handleUpdatePreparation}
420 |                 onOpenCrewModal={() => setIsCrewModalOpen(true)}
421 |               />
422 |               <AssignedCrew currentEvent={currentEvent} employees={users} />
423 |             </div>
424 |           )}
425 | 
426 |           <EventDetails
427 |             currentEvent={currentEvent}
428 |             schoolName={schoolData.name}
429 |             cityId={schoolData.cityId}
430 |             onEventUpdated={fetchData}
431 |           />
432 |           <EventsTable
433 |             events={events}
434 |             selectedEventId={selectedEventId}
435 |             onEventSelect={setSelectedEventId}
436 |             onDeleteSuccess={fetchData}
437 |           />
438 |         </div>
439 |       </div>
440 | 
441 |       {/* Мобільна FAB для додавання події */}
442 |       <button
443 |         onClick={openAddEventModal}
444 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
445 |       >
446 |         +
447 |       </button>
448 | 
449 |       {/* Модальні вікна */}
450 |       <EditSchoolModal
451 |         isOpen={isEditModalOpen}
452 |         onClose={() => setIsEditModalOpen(false)}
453 |         editForm={editForm}
454 |         setEditForm={setEditForm}
455 |         onSave={handleSaveSchoolInfo}
456 |       />
457 |       <EventModal
458 |         isOpen={isEventModalOpen}
459 |         onClose={() => setIsEventModalOpen(false)}
460 |         eventForm={eventForm}
461 |         setEventForm={setEventForm}
462 |         onSave={handleSaveEvent}
463 |       />
464 |       <CommentModal
465 |         isOpen={commentModal.isOpen}
466 |         onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
467 |         mode={commentModal.mode}
468 |         text={commentModal.text}
469 |         setText={(t) => setCommentModal({ ...commentModal, text: t })}
470 |         onSave={handleSaveComment}
471 |       />
472 |       <CrewModal
473 |         isOpen={isCrewModalOpen}
474 |         onClose={() => setIsCrewModalOpen(false)}
475 |         city={schoolData.city}
476 |         employees={users}
477 |         onSave={handleAssignCrew}
478 |       />
479 |       <ReportModal
480 |         isOpen={isReportModalOpen}
481 |         onClose={() => setIsReportModalOpen(false)}
482 |         onSave={handleSubmitReport}
483 |         schoolName={schoolData.name}
484 |         eventType={currentEvent?.project}
485 |         eventDate={currentEvent?.date}
486 |         eventIndex={
487 |           events
488 |             .filter((e) => e.schoolId === schoolData.id)
489 |             .indexOf(currentEvent!) + 1
490 |         }
491 |         crew={currentEvent?.crew ? {
492 |           host: currentEvent.crew.hostId
493 |             ? users.find((u: any) => u.id === currentEvent.crew.hostId) ?? null
494 |             : (currentEvent.crew.host ?? null),
495 |           driver: currentEvent.crew.driverId
496 |             ? users.find((u: any) => u.id === currentEvent.crew.driverId) ?? null
497 |             : (currentEvent.crew.driver ?? null),
498 |         } : undefined}
499 |       />
500 |     </div>
501 |   );
502 | }
503 | 
```

### File: apps/frontend/src/pages/Schools.tsx
```tsx
  0 | import {
  1 |   useState,
  2 |   useEffect,
  3 |   useRef,
  4 |   useMemo,
  5 |   useCallback,
  6 |   lazy,
  7 |   Suspense,
  8 | } from "react";
  9 | import { api } from "../config/api";
 10 | import { useSelectedCity } from "../context/CityContext";
 11 | 
 12 | import VirtualSchoolList from "../components/VirtualSchoolList";
 13 | import { SchoolCard } from "../components/schools/SchoolMobileList";
 14 | 
 15 | import {
 16 |   classifySchool,
 17 |   classifySize,
 18 | } from "../components/schools/schoolUtils";
 19 | 
 20 | const StatsBar = lazy(() => import("../components/schools/StatsBar"));
 21 | const VirtualDesktopTable = lazy(
 22 |   () => import("../components/schools/VirtualDesktopTable"),
 23 | );
 24 | // SchoolCard імпортується напряму — він легкий і потрібен одразу
 25 | 
 26 | export const PIPELINE_STAGES = [
 27 |   { key: "BASE", name: "Новий заклад" },
 28 |   { key: "FIRST_CONTACT", name: "Знайомство" },
 29 |   { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 30 |   { key: "PREPARATION", name: "Оголошення" },
 31 |   { key: "IN_PROGRESS", name: "Підготовка" },
 32 |   { key: "DONE", name: "Проведення заходу" },
 33 |   { key: "REPORT", name: "Звіт" },
 34 | ];
 35 | 
 36 | interface City {
 37 |   id: string;
 38 |   name: string;
 39 | }
 40 | 
 41 | export default function Schools() {
 42 |   const { selectedCity } = useSelectedCity();
 43 |   const [schools, setSchools] = useState<any[]>([]);
 44 |   const [cities, setCities] = useState<City[]>([]);
 45 |   const [isModalOpen, setIsModalOpen] = useState(false);
 46 |   const [isSubmitting, setIsSubmitting] = useState(false);
 47 |   const [searchQuery, setSearchQuery] = useState("");
 48 |   const [form, setForm] = useState({
 49 |     name: "",
 50 |     cityId: "",
 51 |     sourceUrl: "",
 52 |     director: "",
 53 |     phone: "",
 54 |   });
 55 |   const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
 56 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 57 |   const [sizeFilter, setSizeFilter] = useState<string | null>(null);
 58 |   const [suggestions, setSuggestions] = useState<
 59 |     { name: string; url: string }[]
 60 |   >([]);
 61 |   const [showSuggestions, setShowSuggestions] = useState(false);
 62 |   const [isSearching, setIsSearching] = useState(false);
 63 |   const [isLoading, setIsLoading] = useState(true);
 64 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 65 | 
 66 |   const fetchSchools = async () => {
 67 |     setIsLoading(true);
 68 |     try {
 69 |       const res = await api.get("/schools?minimal=true", {
 70 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 71 |       });
 72 |       setSchools(res.data);
 73 |     } catch (e) {
 74 |       console.error(e);
 75 |     } finally {
 76 |       setIsLoading(false);
 77 |     }
 78 |   };
 79 | 
 80 |   const fetchCities = async () => {
 81 |     try {
 82 |       const res = await api.get("/cities", {
 83 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 84 |       });
 85 |       setCities(res.data);
 86 |     } catch (e) {
 87 |       console.error(e);
 88 |     }
 89 |   };
 90 | 
 91 |   useEffect(() => {
 92 |     fetchSchools();
 93 |     fetchCities();
 94 |   }, []);
 95 | 
 96 |   const handleOpenModal = useCallback(() => {
 97 |     setForm({
 98 |       name: "",
 99 |       cityId: selectedCity.id || cities[0]?.id || "",
100 |       sourceUrl: "",
101 |       director: "",
102 |       phone: "",
103 |     });
104 |     setMatchedContacts([]);
105 |     setIsModalOpen(true);
106 |   }, [selectedCity.id, cities]);
107 | 
108 |   const fetchContacts = async (schoolName: string) => {
109 |     if (!schoolName || schoolName.trim().length < 1)
110 |       return setMatchedContacts([]);
111 |     const currentCityName =
112 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
113 |     if (currentCityName.toLowerCase() !== "львів")
114 |       return setMatchedContacts([]);
115 |     try {
116 |       const res = await api.get(
117 |         `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
118 |         {
119 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
120 |         },
121 |       );
122 |       setMatchedContacts(res.data);
123 |       if (res.data.length > 0) {
124 |         const director =
125 |           res.data.find(
126 |             (c: any) =>
127 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
128 |           ) || res.data[0];
129 |         setForm((f) => ({
130 |           ...f,
131 |           director: director.contactName,
132 |           phone: director.phone,
133 |         }));
134 |       }
135 |     } catch (e) {
136 |       console.error(e);
137 |     }
138 |   };
139 | 
140 |   const handleNameChange = (value: string) => {
141 |     setForm({ ...form, name: value });
142 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
143 |     if (value.length < 2) {
144 |       setShowSuggestions(false);
145 |       setIsSearching(false);
146 |       setMatchedContacts([]);
147 |       return;
148 |     }
149 |     setIsSearching(true);
150 |     setShowSuggestions(true);
151 |     debounceTimer.current = setTimeout(async () => {
152 |       try {
153 |         const [externalRes] = await Promise.all([
154 |           api.get(`/schools/search?q=${value}&type=Школа`, {
155 |             headers: {
156 |               Authorization: `Bearer ${localStorage.getItem("token")}`,
157 |             },
158 |           }),
159 |           fetchContacts(value),
160 |         ]);
161 |         setSuggestions(externalRes.data);
162 |       } catch (e) {
163 |         console.error(e);
164 |       } finally {
165 |         setIsSearching(false);
166 |       }
167 |     }, 400);
168 |   };
169 | 
170 |   const handleSelectSuggestion = (name: string, url: string) => {
171 |     setForm({ ...form, name, sourceUrl: url });
172 |     setShowSuggestions(false);
173 |     fetchContacts(name);
174 |   };
175 | 
176 |   const handleAddSchool = async (e: React.FormEvent) => {
177 |     e.preventDefault();
178 |     if (!form.name.trim() || !form.cityId) return;
179 |     setIsSubmitting(true);
180 |     try {
181 |       await api.post(
182 |         "/schools",
183 |         { ...form, type: "Школа" },
184 |         {
185 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
186 |         },
187 |       );
188 |       setIsModalOpen(false);
189 |       fetchSchools();
190 |     } catch (e) {
191 |       alert("Не вдалося створити заклад");
192 |     } finally {
193 |       setIsSubmitting(false);
194 |     }
195 |   };
196 | 
197 |   const handleDeleteSchool = useCallback(
198 |     async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
199 |       e.stopPropagation();
200 |       if (
201 |         !window.confirm(
202 |           `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
203 |         )
204 |       )
205 |         return;
206 |       try {
207 |         await api.delete(`/schools/${schoolId}`, {
208 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
209 |         });
210 |         setSchools((prev) => prev.filter((s) => s.id !== schoolId));
211 |       } catch (e) {
212 |         console.error(e);
213 |       }
214 |     },
215 |     [],
216 |   );
217 | 
218 |   const [debouncedSearch, setDebouncedSearch] = useState("");
219 | 
220 |   useEffect(() => {
221 |     const timer = setTimeout(() => setDebouncedSearch(searchQuery), 200);
222 |     return () => clearTimeout(timer);
223 |   }, [searchQuery]);
224 | 
225 |   const baseFiltered = useMemo(
226 |     () =>
227 |       schools.filter((s) => {
228 |         const isCityMatch = selectedCity.id
229 |           ? s.cityId === selectedCity.id
230 |           : true;
231 |         const isFilterMatch = activeFilter
232 |           ? classifySchool(s) === activeFilter
233 |           : true;
234 |         const isSizeMatch = sizeFilter
235 |           ? classifySize(s, "Школа") === sizeFilter
236 |           : true;
237 |         return (
238 |           isCityMatch && s.type === "Школа" && isFilterMatch && isSizeMatch
239 |         );
240 |       }),
241 |     [schools, selectedCity.id, activeFilter, sizeFilter],
242 |   );
243 | 
244 |   const filteredSchools = useMemo(() => {
245 |     if (!debouncedSearch.trim()) return baseFiltered;
246 |     const q = debouncedSearch.toLowerCase().trim();
247 |     return baseFiltered.filter(
248 |       (s) =>
249 |         s.name?.toLowerCase().includes(q) ||
250 |         s.city?.name?.toLowerCase().includes(q) ||
251 |         s.director?.toLowerCase().includes(q) ||
252 |         s.address?.toLowerCase().includes(q),
253 |     );
254 |   }, [baseFiltered, debouncedSearch]);
255 | 
256 |   return (
257 |     <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
258 |       {/* Шапка */}
259 |       <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
260 |         <div className="min-w-0">
261 |           <h1 className="text-xl font-bold text-slate-800 leading-tight">
262 |             Школи
263 |             {selectedCity.id && (
264 |               <span className="ml-2 text-sm font-normal text-blue-500">
265 |                 · {selectedCity.name}
266 |               </span>
267 |             )}
268 |           </h1>
269 |         </div>
270 |         <div className="flex gap-2 shrink-0">
271 |           <button
272 |             onClick={async () => {
273 |               if (!selectedCity.id) return alert("Спочатку оберіть місто");
274 |               if (
275 |                 !window.confirm(
276 |                   `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
277 |                 )
278 |               )
279 |                 return;
280 |               try {
281 |                 const res = await api.post(
282 |                   "/schools/bulk-import",
283 |                   { cityId: selectedCity.id, type: "Школа" },
284 |                   {
285 |                     headers: {
286 |                       Authorization: `Bearer ${localStorage.getItem("token")}`,
287 |                     },
288 |                     timeout: 120000,
289 |                   },
290 |                 );
291 |                 alert(
292 |                   `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
293 |                 );
294 |                 fetchSchools();
295 |               } catch (e) {
296 |                 alert("Помилка імпорту.");
297 |               }
298 |             }}
299 |             className="md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
300 |           >
301 |             📥 Імпорт з isuo
302 |           </button>
303 |           <button
304 |             onClick={handleOpenModal}
305 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
306 |           >
307 |             + Додати
308 |           </button>
309 |         </div>
310 |       </div>
311 | 
312 |       {/* StatsBar */}
313 |       <div className="shrink-0">
314 |         <Suspense
315 |           fallback={
316 |             <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
317 |           }
318 |         >
319 |           <StatsBar
320 |             schools={schools.filter(
321 |               (s) =>
322 |                 (selectedCity.id ? s.cityId === selectedCity.id : true) &&
323 |                 s.type === "Школа",
324 |             )}
325 |             activeFilter={activeFilter}
326 |             onFilterChange={setActiveFilter}
327 |             sizeFilter={sizeFilter}
328 |             onSizeFilterChange={setSizeFilter}
329 |             schoolType="Школа"
330 |           />
331 |         </Suspense>
332 |       </div>
333 | 
334 |       {/* Пошук */}
335 |       <div className="relative shrink-0 mb-4 mt-2">
336 |         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
337 |           <svg
338 |             className="w-5 h-5 text-slate-400"
339 |             fill="none"
340 |             stroke="currentColor"
341 |             viewBox="0 0 24 24"
342 |           >
343 |             <path
344 |               strokeLinecap="round"
345 |               strokeLinejoin="round"
346 |               strokeWidth={2}
347 |               d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
348 |             />
349 |           </svg>
350 |         </div>
351 |         <input
352 |           type="text"
353 |           value={searchQuery}
354 |           onChange={(e) => setSearchQuery(e.target.value)}
355 |           placeholder="Пошук за назвою, директором, адресою..."
356 |           className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
357 |         />
358 |         {searchQuery && (
359 |           <button
360 |             onClick={() => setSearchQuery("")}
361 |             className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
362 |           >
363 |             <svg
364 |               className="w-5 h-5"
365 |               fill="none"
366 |               stroke="currentColor"
367 |               viewBox="0 0 24 24"
368 |             >
369 |               <path
370 |                 strokeLinecap="round"
371 |                 strokeLinejoin="round"
372 |                 strokeWidth={2}
373 |                 d="M6 18L18 6M6 6l12 12"
374 |               />
375 |             </svg>
376 |           </button>
377 |         )}
378 |       </div>
379 | 
380 |       {/* Лічильник */}
381 |       <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
382 |         {filteredSchools.length === baseFiltered.length
383 |           ? `${baseFiltered.length} шкіл`
384 |           : `${filteredSchools.length} з ${baseFiltered.length} шкіл`}
385 |         {(activeFilter || sizeFilter) && (
386 |           <button
387 |             onClick={() => {
388 |               setActiveFilter(null);
389 |               setSizeFilter(null);
390 |             }}
391 |             className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
392 |           >
393 |             скинути фільтри
394 |           </button>
395 |         )}
396 |       </p>
397 | 
398 |       {/* Компоненти списків */}
399 |       {isLoading ? (
400 |         <div className="flex flex-col gap-2.5 flex-1">
401 |           {Array.from({ length: 8 }).map((_, i) => (
402 |             <div
403 |               key={i}
404 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
405 |               style={{ opacity: 1 - i * 0.1 }}
406 |             >
407 |               <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
408 |               <div className="flex justify-between">
409 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
410 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
411 |               </div>
412 |             </div>
413 |           ))}
414 |         </div>
415 |       ) : (
416 |         <>
417 |           {/* Мобільний: віртуалізований список карток */}
418 |           <div className="md:hidden flex-1 w-full overflow-hidden">
419 |             <VirtualSchoolList
420 |               schools={filteredSchools}
421 |               itemHeight={110}
422 |               renderItem={(school) => (
423 |                 <div className="pb-2.5">
424 |                   <SchoolCard
425 |                     school={school}
426 |                     onDelete={handleDeleteSchool}
427 |                     stages={PIPELINE_STAGES}
428 |                   />
429 |                 </div>
430 |               )}
431 |             />
432 |           </div>
433 | 
434 |           {/* Десктоп: таблиця з віртуалізованим tbody */}
435 |           <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
436 |             <Suspense
437 |               fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
438 |             >
439 |               <VirtualDesktopTable
440 |                 schools={filteredSchools}
441 |                 searchQuery={searchQuery}
442 |                 onDelete={handleDeleteSchool}
443 |                 stages={PIPELINE_STAGES}
444 |               />
445 |             </Suspense>
446 |           </div>
447 |         </>
448 |       )}
449 | 
450 |       {/* Мобільна плаваюча кнопка FAB */}
451 |       <button
452 |         onClick={handleOpenModal}
453 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
454 |       >
455 |         +
456 |       </button>
457 | 
458 |       {/* Модальне вікно */}
459 |       {isModalOpen && (
460 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
461 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
462 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
463 |               <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
464 |               <button
465 |                 onClick={() => setIsModalOpen(false)}
466 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
467 |               >
468 |                 ✕
469 |               </button>
470 |             </div>
471 | 
472 |             <form
473 |               onSubmit={handleAddSchool}
474 |               className="p-6 flex flex-col gap-4 overflow-y-auto"
475 |             >
476 |               <div className="relative">
477 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
478 |                   Назва школи
479 |                 </label>
480 |                 <input
481 |                   type="text"
482 |                   value={form.name}
483 |                   onChange={(e) => handleNameChange(e.target.value)}
484 |                   onBlur={() =>
485 |                     setTimeout(() => setShowSuggestions(false), 150)
486 |                   }
487 |                   placeholder="Наприклад: Школа №1"
488 |                   required
489 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
490 |                 />
491 |                 {showSuggestions && (
492 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
493 |                     {isSearching ? (
494 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
495 |                         Пошук...
496 |                       </li>
497 |                     ) : suggestions.length > 0 ? (
498 |                       suggestions.map((s, i) => (
499 |                         <li
500 |                           key={i}
501 |                           onMouseDown={() =>
502 |                             handleSelectSuggestion(s.name, s.url)
503 |                           }
504 |                           className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
505 |                         >
506 |                           {s.name}
507 |                         </li>
508 |                       ))
509 |                     ) : (
510 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
511 |                         Нічого не знайдено
512 |                       </li>
513 |                     )}
514 |                   </ul>
515 |                 )}
516 |               </div>
517 | 
518 |               {!selectedCity.id && (
519 |                 <div>
520 |                   <label className="block text-sm font-medium text-slate-600 mb-1.5">
521 |                     Місто
522 |                   </label>
523 |                   <select
524 |                     value={form.cityId}
525 |                     onChange={(e) =>
526 |                       setForm({ ...form, cityId: e.target.value })
527 |                     }
528 |                     required
529 |                     className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
530 |                   >
531 |                     <option value="">— Оберіть місто —</option>
532 |                     {cities.map((c) => (
533 |                       <option key={c.id} value={c.id}>
534 |                         {c.name}
535 |                       </option>
536 |                     ))}
537 |                   </select>
538 |                 </div>
539 |               )}
540 | 
541 |               <div>
542 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
543 |                   Контакт{" "}
544 |                   <span className="ml-1 text-xs font-normal text-slate-400">
545 |                     (автозаповнення)
546 |                   </span>
547 |                 </label>
548 |                 {matchedContacts.length > 0 && (
549 |                   <div className="flex flex-wrap gap-1.5 mb-3">
550 |                     {matchedContacts.map((c, i) => (
551 |                       <button
552 |                         key={i}
553 |                         type="button"
554 |                         onClick={() =>
555 |                           setForm((f) => ({
556 |                             ...f,
557 |                             director: c.contactName,
558 |                             phone: c.phone,
559 |                           }))
560 |                         }
561 |                         className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
562 |                       >
563 |                         {c.role ? `${c.role}: ` : ""}
564 |                         {c.contactName}
565 |                       </button>
566 |                     ))}
567 |                   </div>
568 |                 )}
569 |                 <input
570 |                   type="text"
571 |                   value={form.director}
572 |                   onChange={(e) =>
573 |                     setForm({ ...form, director: e.target.value })
574 |                   }
575 |                   placeholder="Микола Петренко"
576 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
577 |                 />
578 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
579 |                   Телефон
580 |                 </label>
581 |                 <input
582 |                   type="text"
583 |                   value={form.phone}
584 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
585 |                   placeholder="0671234567"
586 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
587 |                 />
588 |               </div>
589 | 
590 |               <div className="flex gap-3 mt-4">
591 |                 <button
592 |                   type="button"
593 |                   onClick={() => setIsModalOpen(false)}
594 |                   className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
595 |                 >
596 |                   Скасувати
597 |                 </button>
598 |                 <button
599 |                   type="submit"
600 |                   disabled={isSubmitting}
601 |                   className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
602 |                 >
603 |                   {isSubmitting ? "Збереження..." : "Створити"}
604 |                 </button>
605 |               </div>
606 |             </form>
607 |           </div>
608 |         </div>
609 |       )}
610 |     </div>
611 |   );
612 | }
613 | 
```

### File: apps/frontend/src/types/index.ts
```ts
  0 | export interface City {
  1 |   id: string;
  2 |   name: string;
  3 |   manager?: { id: string; name: string; phone: string } | null;
  4 |   plannedEvents?: number;
  5 |   completedEvents?: number;
  6 | }
  7 | 
  8 | export interface School {
  9 |   id: string;
 10 |   name: string;
 11 |   type: string;
 12 |   cityId: string;
 13 |   address?: string;
 14 |   director?: string;
 15 |   phone?: string;
 16 |   email?: string;
 17 |   childrenCount?: number;
 18 |   notes?: string;
 19 |   isHotClient?: boolean;
 20 | }
 21 | 
 22 | export interface User {
 23 |   id: string;
 24 |   name: string;
 25 |   email: string;
 26 |   phone?: string;
 27 |   role: string;
 28 |   cityId?: string;
 29 |   city?: { id: string; name: string };
 30 | }
 31 | 
 32 | export interface EventHistory {
 33 |   id: string;
 34 |   action: string;
 35 |   comment?: string;
 36 |   userName: string;
 37 |   role: string;
 38 |   createdAt: string;
 39 | }
 40 | 
 41 | export interface EventReport {
 42 |   childrenCount: number;
 43 |   totalSum: number;
 44 |   remainderSum: number;
 45 |   directorSatisfied?: boolean;
 46 |   teachersSatisfied?: boolean;
 47 |   hadIssues?: boolean;
 48 |   comment?: string;
 49 | }
 50 | 
 51 | export interface Event {
 52 |   id: string;
 53 |   schoolId: string;
 54 |   cityId: string;
 55 |   project: string;
 56 |   date: string;
 57 |   time?: string;
 58 |   status: string;
 59 |   childrenPlanned?: number;
 60 |   price?: number;
 61 |   address?: string;
 62 |   contactPerson?: string;
 63 |   contactPhone?: string;
 64 |   crew?: Crew;
 65 |   report?: EventReport;
 66 |   history?: EventHistory[];
 67 |   preparation?: EventPreparation;
 68 |   school?: { id: string; name: string; type: string }; // ← додай це
 69 | }
 70 | 
 71 | export interface Crew {
 72 |   id: string;
 73 |   name: string;
 74 |   cityId: string;
 75 |   hostId?: string;
 76 |   driverId?: string;
 77 |   host?: { id: string; name: string };
 78 |   driver?: { id: string; name: string };
 79 |   car?: string;
 80 |   phone?: string;
 81 | }
 82 | 
 83 | export interface EventPreparation {
 84 |   assignCrew: string;
 85 |   bookEquipment: string;
 86 |   prepareDocs: string;
 87 |   prepareMaterials: string;
 88 |   remindSchool: string;
 89 | }
 90 | 
 91 | export interface CityProfile extends City {
 92 |   events: Event[];
 93 |   crews: Crew[];
 94 |   schools?: School[]; // ← додай це
 95 | }
 96 | 
 97 | export interface IssueReport {
 98 |   id: string;
 99 |   eventId: string;
100 |   schoolName: string;
101 |   eventName: string;
102 |   message: string;
103 |   cityId: string;
104 |   status: string;
105 |   createdAt: string;
106 | }
107 | 
```

### File: apps/frontend/tailwind.config.js
```js
  0 | 
  1 | 
  2 | /** @type {import('tailwindcss').Config} */
  3 | export default {
  4 |   content: [
  5 |     "./index.html",
  6 |     "./src/**/*.{js,ts,jsx,tsx}",
  7 |   ],
  8 |   theme: {
  9 |     extend: {},
 10 |   },
 11 |   plugins: [],
 12 | }
 13 | 
 14 | 
```

### File: apps/frontend/tsconfig.json
```json
  0 | 
  1 | 
  2 | {
  3 |   "files": [],
  4 |   "references": [
  5 |     { "path": "./tsconfig.app.json" },
  6 |     { "path": "./tsconfig.node.json" }
  7 |   ]
  8 | }
  9 | 
 10 | 
 11 | 
```

### File: apps/frontend/vite.config.ts
```ts
  0 | import { defineConfig } from "vite";
  1 | import react from "@vitejs/plugin-react";
  2 | import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
  3 | 
  4 | export default defineConfig({
  5 |   plugins: [
  6 |     react(),
  7 |     ViteImageOptimizer({
  8 |       png: { quality: 80 },
  9 |       jpeg: { quality: 80 },
 10 |       webp: { quality: 80 },
 11 |       avif: { quality: 70 },
 12 |     }),
 13 |   ],
 14 |   build: {
 15 |     rollupOptions: {
 16 |       output: {
 17 |         manualChunks: {
 18 |           recharts: ["recharts"],
 19 |           tanstack: ["@tanstack/react-virtual"],
 20 |         },
 21 |       },
 22 |     },
 23 |   },
 24 | });
 25 | 
```

### File: bundle.js
```js
  0 | const fs = require('fs');
  1 | const path = require('path');
  2 | 
  3 | const outputFile = 'project_bundle.md';
  4 | const ROOT = process.cwd();
  5 | 
  6 | const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.prisma', 'test', 'coverage', '.turbo', '.vercel'];
  7 | const ignoreFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile];
  8 | const allowedExts = ['.ts', '.tsx', '.js', '.css', '.prisma'];
  9 | const allowedNames = ['tsconfig.json', '.env.example'];
 10 | 
 11 | // Функція для побудови дерева папок
 12 | function getTree(dir, prefix = '') {
 13 |   let tree = '';
 14 |   const files = fs.readdirSync(dir).sort();
 15 |   files.forEach((file, index) => {
 16 |     const isLast = index === files.length - 1;
 17 |     const fullPath = path.join(dir, file);
 18 |     const stat = fs.statSync(fullPath);
 19 | 
 20 |     if (ignoreDirs.includes(file) || ignoreFiles.includes(file)) return;
 21 | 
 22 |     tree += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;
 23 |     if (stat.isDirectory()) {
 24 |       tree += getTree(fullPath, prefix + (isLast ? '    ' : '│   '));
 25 |     }
 26 |   });
 27 |   return tree;
 28 | }
 29 | 
 30 | // Функція для додавання номерів рядків (починаючи з 0)
 31 | function addLineNumbers(content) {
 32 |   return content
 33 |     .split('\n')
 34 |     .map((line, i) => `${i.toString().padStart(3, ' ')} | ${line}`)
 35 |     .join('\n');
 36 | }
 37 | 
 38 | function bundle(dir) {
 39 |   let content = '';
 40 |   const files = fs.readdirSync(dir).sort();
 41 | 
 42 |   for (const file of files) {
 43 |     const fullPath = path.join(dir, file);
 44 |     const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');
 45 |     const stat = fs.statSync(fullPath);
 46 | 
 47 |     if (stat.isDirectory()) {
 48 |       if (!ignoreDirs.includes(file)) content += bundle(fullPath);
 49 |     } else {
 50 |       const ext = path.extname(file);
 51 |       const allowed = allowedExts.includes(ext) || allowedNames.includes(file);
 52 |       if (allowed && !ignoreFiles.includes(file)) {
 53 |         const raw = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
 54 |         const lang = ext.slice(1);
 55 |         content += `\n### File: ${relPath}\n\`\`\`${lang}\n${addLineNumbers(raw)}\n\`\`\`\n`;
 56 |       }
 57 |     }
 58 |   }
 59 |   return content;
 60 | }
 61 | 
 62 | const header = `# Project Source Code\n\n## Structure\n\`\`\`\n${getTree('.')}\`\`\`\n`;
 63 | fs.writeFileSync(outputFile, header + bundle('.'));
 64 | console.log(`✅ Зібрано у Markdown з номерами рядків: ${outputFile}`);
```
