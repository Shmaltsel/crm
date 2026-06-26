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
│       │   │   ├── useApi.ts
│       │   │   ├── useAuth.ts
│       │   │   ├── useCalendar.ts
│       │   │   ├── useCities.ts
│       │   │   ├── useEmployees.ts
│       │   │   ├── useSchoolProfile.ts
│       │   │   └── useSchools.ts
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
  8 |   Query,
  9 |   UseGuards,
 10 |   Request,
 11 | } from '@nestjs/common';
 12 | import { EventsService } from './events.service';
 13 | import { AuthGuard } from '../auth/auth.guard';
 14 | import { CurrentUser } from '../auth/decorators/current-user.decorator';
 15 | import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
 16 | import { CreateEventDto } from './dto/create-event.dto';
 17 | import { SubmitReportDto } from './dto/submit-report.dto';
 18 | 
 19 | @Controller('events')
 20 | @UseGuards(AuthGuard)
 21 | export class EventsController {
 22 |   constructor(private readonly eventsService: EventsService) {}
 23 | 
 24 |   // Список подій для поточного користувача.
 25 |   // Для водіїв/ведучих повертаються лише ті події, де вони у складі екіпажу.
 26 |   // Для менеджерів/адмінів — усі події.
 27 |   @Get()
 28 |   findAll(@CurrentUser() user: JwtUser) {
 29 |     return this.eventsService.findAllForUser(user);
 30 |   }
 31 | 
 32 |   @Post()
 33 |   create(@Body() body: CreateEventDto, @CurrentUser() user: JwtUser) {
 34 |     return this.eventsService.create(body, user);
 35 |   }
 36 | 
 37 |   @Get('school/:schoolId')
 38 |   findBySchool(
 39 |     @Param('schoolId') schoolId: string,
 40 |     @Query('minimal') minimal?: string,
 41 |   ) {
 42 |     return this.eventsService.findBySchool(schoolId, minimal === 'true');
 43 |   }
 44 | 
 45 |   @Patch(':id/status')
 46 |   updateStatus(
 47 |     @Param('id') id: string,
 48 |     @Body() body: { status: string; actionName: string; comment?: string },
 49 |     @CurrentUser() user: JwtUser,
 50 |   ) {
 51 |     return this.eventsService.updateStatus(
 52 |       id,
 53 |       body.status,
 54 |       body.actionName,
 55 |       body.comment,
 56 |       user,
 57 |     );
 58 |   }
 59 | 
 60 |   @Patch(':id/preparation')
 61 |   updatePreparation(
 62 |     @Param('id') id: string,
 63 |     @Body() body: { field: string; status: string },
 64 |   ) {
 65 |     return this.eventsService.updatePreparationStatus(
 66 |       id,
 67 |       body.field,
 68 |       body.status,
 69 |     );
 70 |   }
 71 | 
 72 |   @Post(':id/assign-crew')
 73 |   assignCrew(
 74 |     @Param('id') id: string,
 75 |     @Body() body: { crewId: string }, // ЗМІНЕНО
 76 |   ) {
 77 |     return this.eventsService.assignCrewToEvent(id, body.crewId);
 78 |   }
 79 | 
 80 |   @Post(':id/history')
 81 |   addHistoryComment(
 82 |     @Param('id') id: string,
 83 |     @Body() body: { comment: string },
 84 |     @CurrentUser() user: JwtUser,
 85 |   ) {
 86 |     return this.eventsService.addHistoryComment(id, body.comment, user);
 87 |   }
 88 | 
 89 |   // Маршрут для оновлення коментаря
 90 |   @Patch('history/:historyId')
 91 |   updateHistoryComment(
 92 |     @Param('historyId') historyId: string,
 93 |     @Body() body: { comment: string },
 94 |   ) {
 95 |     return this.eventsService.updateHistoryComment(historyId, body.comment);
 96 |   }
 97 | 
 98 |   @Delete(':id')
 99 |   remove(@Param('id') id: string) {
100 |     return this.eventsService.remove(id);
101 |   }
102 | 
103 |   @Post(':id/report')
104 |   submitReport(
105 |     @Param('id') id: string,
106 |     @Body() body: SubmitReportDto,
107 |     @CurrentUser() user: JwtUser,
108 |   ) {
109 |     return this.eventsService.submitReport(id, body, user);
110 |   }
111 | 
112 |   @Get(':id')
113 |   findOne(@Param('id') id: string) {
114 |     return this.eventsService.findOne(id);
115 |   }
116 | 
117 |   @Patch(':id/reschedule')
118 |   reschedule(
119 |     @Param('id') id: string,
120 |     @Body() body: { date: string; time: string },
121 |     @CurrentUser() user: JwtUser,
122 |   ) {
123 |     return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
124 |   }
125 | }
126 | 
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
285 |   async findBySchool(schoolId: string, minimal = false) {
286 |     if (minimal) {
287 |       return this.prisma.event.findMany({
288 |         where: { schoolId },
289 |         select: {
290 |           id: true,
291 |           project: true,
292 |           date: true,
293 |           time: true,
294 |           status: true,
295 |           price: true,
296 |           childrenPlanned: true,
297 |           address: true,
298 |           contactPerson: true,
299 |           contactPhone: true,
300 |           crewId: true,
301 |           crew: { select: { id: true, name: true, hostId: true, driverId: true } },
302 |         },
303 |         orderBy: { date: 'desc' },
304 |       });
305 |     }
306 |     return this.prisma.event.findMany({
307 |       where: { schoolId },
308 |       include: {
309 |         crew: { include: { host: true, driver: true } },
310 |         history: { orderBy: { createdAt: 'desc' } },
311 |         preparation: true,
312 |       },
313 |       orderBy: { date: 'desc' },
314 |     });
315 |   }
316 | 
317 |   async updateHistoryComment(historyId: string, comment: string) {
318 |     return this.prisma.eventHistory.update({
319 |       where: { id: historyId },
320 |       data: { comment: comment || null },
321 |     });
322 |   }
323 | 
324 |   async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
325 |     await this.prisma.eventHistory.create({
326 |       data: {
327 |         eventId,
328 |         action: 'Коментар',
329 |         comment,
330 |         userId: user.sub,
331 |         userName: user.name,
332 |         role: user.role,
333 |       },
334 |     });
335 | 
336 |     return this.prisma.event.findUnique({
337 |       where: { id: eventId },
338 |       include: {
339 |         history: { orderBy: { createdAt: 'desc' } },
340 |       },
341 |     });
342 |   }
343 | 
344 |   // ОНОВЛЕНО: Тепер метод видалення безпечно видаляє зв'язані дані
345 |   async remove(id: string) {
346 |     // 1. Видаляємо історію події
347 |     await this.prisma.eventHistory.deleteMany({
348 |       where: { eventId: id },
349 |     });
350 | 
351 |     // 2. Видаляємо підготовку події (якщо вона існує)
352 |     await this.prisma.eventPreparation.deleteMany({
353 |       where: { eventId: id },
354 |     });
355 | 
356 |     // 3. Тепер спокійно видаляємо саму подію
357 |     return this.prisma.event.delete({
358 |       where: { id },
359 |     });
360 |   }
361 | 
362 |   async submitReport(
363 |     eventId: string,
364 |     reportData: SubmitReportDto,
365 |     user: JwtUser,
366 |   ) {
367 |     // 1. Зберігаємо звіт у базу
368 |     await this.prisma.eventReport.upsert({
369 |       where: { eventId },
370 |       update: {
371 |         announcementDone: reportData.announcementDone,
372 |         materialShown: reportData.materialShown,
373 |         childrenCount: reportData.childrenCount,
374 |         classesCount: reportData.classesCount,
375 |         privilegedCount: reportData.privilegedCount,
376 |         showingsCount: reportData.showingsCount,
377 |         totalSum: reportData.totalSum,
378 |         schoolSum: reportData.schoolSum,
379 |         expenses: reportData.expenses || [],
380 |         remainderSum: reportData.remainderSum,
381 |         rating: reportData.rating,
382 |         salaries: reportData.salaries || [],
383 |       },
384 |       create: {
385 |         eventId,
386 |         announcementDone: reportData.announcementDone,
387 |         materialShown: reportData.materialShown,
388 |         childrenCount: reportData.childrenCount,
389 |         classesCount: reportData.classesCount,
390 |         privilegedCount: reportData.privilegedCount,
391 |         showingsCount: reportData.showingsCount,
392 |         totalSum: reportData.totalSum,
393 |         schoolSum: reportData.schoolSum,
394 |         expenses: reportData.expenses || [],
395 |         remainderSum: reportData.remainderSum,
396 |         rating: reportData.rating,
397 |         salaries: reportData.salaries || [],
398 |       },
399 |     });
400 | 
401 |     if (reportData.salaries?.length) {
402 |       await Promise.all(
403 |         reportData.salaries
404 |           .filter((s) => s.amount > 0)
405 |           .map((s) =>
406 |             this.prisma.user.update({
407 |               where: { id: s.userId },
408 |               data: { balance: { increment: s.amount } },
409 |             }),
410 |           ),
411 |       );
412 |     }
413 |     // 2. Оновлюємо статус події на 'REPORT' (щоб вона не зникала і давала можливість перейти до RE_SALE)
414 |     return this.prisma.event.update({
415 |       where: { id: eventId },
416 |       data: {
417 |         status: 'REPORT' as never,
418 |         history: {
419 |           create: {
420 |             action: 'Сформовано звіт. Етап: Звіт',
421 |             userId: user.sub,
422 |             userName: user.name,
423 |             role: user.role,
424 |           },
425 |         },
426 |       },
427 |       include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
428 |     });
429 |   }
430 | 
431 |   async findOne(id: string) {
432 |     return this.prisma.event.findUnique({
433 |       where: { id },
434 |       include: {
435 |         school: true,
436 |         city: true,
437 |         crew: {
438 |           include: {
439 |             host: { select: { id: true, name: true } },
440 |             driver: { select: { id: true, name: true } },
441 |           },
442 |         },
443 |         report: true,
444 |       },
445 |     });
446 |   }
447 | }
448 | 
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
  1 | import { Prisma } from '@prisma/client';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | 
  4 | @Injectable()
  5 | export class FinanceService {
  6 |   private cache = new Map<string, { data: any; expiresAt: number }>();
  7 | 
  8 |   private getCached<T>(key: string): T | null {
  9 |     const entry = this.cache.get(key);
 10 |     if (!entry || Date.now() > entry.expiresAt) return null;
 11 |     return entry.data as T;
 12 |   }
 13 | 
 14 |   private setCached(key: string, data: any, ttlMs = 5 * 60 * 1000) {
 15 |     this.cache.set(key, { data, expiresAt: Date.now() + ttlMs });
 16 |   }
 17 | 
 18 |   constructor(private prisma: PrismaService) {}
 19 | 
 20 |   // ---------------------------------------------------------------------------
 21 |   // Допоміжний метод: перетворює period у dateFrom
 22 |   // ---------------------------------------------------------------------------
 23 |   private resolveDateFrom(period?: string): Date | undefined {
 24 |     const now = new Date();
 25 |     if (period === 'month')
 26 |       return new Date(now.getFullYear(), now.getMonth(), 1);
 27 |     if (period === 'quarter')
 28 |       return new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
 29 |     if (period === 'year') return new Date(now.getFullYear(), 0, 1);
 30 |     return undefined;
 31 |   }
 32 | 
 33 |   // ---------------------------------------------------------------------------
 34 |   // Допоміжний метод: будує SQL-фрагменти фільтрів для $queryRaw
 35 |   // ---------------------------------------------------------------------------
 36 |   private buildSqlFilters({
 37 |     dateFrom,
 38 |     cityId,
 39 |     project,
 40 |   }: {
 41 |     dateFrom?: Date;
 42 |     cityId?: string;
 43 |     project?: string;
 44 |   }): Prisma.Sql {
 45 |     const parts: Prisma.Sql[] = [];
 46 |     if (dateFrom) parts.push(Prisma.sql`AND e.date >= ${dateFrom}`);
 47 |     if (cityId) parts.push(Prisma.sql`AND e."cityId" = ${cityId}`);
 48 |     if (project) parts.push(Prisma.sql`AND e.project  = ${project}`);
 49 |     return parts.length ? Prisma.join(parts, ' ') : Prisma.empty;
 50 |   }
 51 | 
 52 |   // ---------------------------------------------------------------------------
 53 |   async getMyBalance(userId: string) {
 54 |     const user = await this.prisma.user.findUnique({
 55 |       where: { id: userId },
 56 |       select: { balance: true, name: true },
 57 |     });
 58 |     return { balance: user?.balance ?? 0, name: user?.name ?? '' };
 59 |   }
 60 | 
 61 |   // ---------------------------------------------------------------------------
 62 |   async getDashboard({
 63 |     period,
 64 |     cityId,
 65 |     project,
 66 |     minimal = false,
 67 |   }: {
 68 |     period?: string;
 69 |     cityId?: string;
 70 |     project?: string;
 71 |     minimal?: boolean;
 72 |   }) {
 73 |     const cacheKey = `finance:${cityId}:${period}:${project}:${minimal}`;
 74 |     const cached = this.getCached(cacheKey);
 75 |     if (cached) return cached;
 76 | 
 77 |     const dateFrom = this.resolveDateFrom(period);
 78 |     const filters = this.buildSqlFilters({ dateFrom, cityId, project });
 79 | 
 80 |     // Фільтр для Prisma ORM (де підтримується)
 81 |     const baseEventWhere: Prisma.EventWhereInput = {
 82 |       status: 'RE_SALE',
 83 |       ...(dateFrom ? { date: { gte: dateFrom } } : {}),
 84 |       ...(cityId ? { cityId } : {}),
 85 |       ...(project ? { project } : {}),
 86 |     };
 87 | 
 88 |     // -------------------------------------------------------------------------
 89 |     // 1. KPI — один агрегатний запит замість findMany + reduce
 90 |     // -------------------------------------------------------------------------
 91 |     const kpiAgg = await this.prisma.eventReport.aggregate({
 92 |       where: { event: baseEventWhere },
 93 |       _sum: { totalSum: true, remainderSum: true },
 94 |       _count: { eventId: true },
 95 |     });
 96 | 
 97 |     const totalRevenue = kpiAgg._sum.totalSum ?? 0;
 98 |     const totalProfit = kpiAgg._sum.remainderSum ?? 0;
 99 |     const totalEvents = kpiAgg._count.eventId ?? 0;
100 | 
101 |     // -------------------------------------------------------------------------
102 |     // 2. Витрати по категоріях — expenses зберігається як JSON,
103 |     //    тому вибираємо лише одне поле без жодних include
104 |     // -------------------------------------------------------------------------
105 |     const expensesRaw = await this.prisma.eventReport.findMany({
106 |       where: { event: baseEventWhere },
107 |       select: { expenses: true },
108 |     });
109 | 
110 |     const expCatMap: Record<string, number> = {};
111 |     let totalExpenses = 0;
112 |     for (const { expenses } of expensesRaw) {
113 |       const exp = Array.isArray(expenses) ? (expenses as any[]) : [];
114 |       for (const ex of exp) {
115 |         const cat: string = ex.category || ex.name || 'Інше';
116 |         const amt: number = Number(ex.amount) || 0;
117 |         expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
118 |         totalExpenses += amt;
119 |       }
120 |     }
121 |     const byExpenseCategory = Object.entries(expCatMap).map(
122 |       ([name, value]) => ({
123 |         name,
124 |         value,
125 |       }),
126 |     );
127 | 
128 |     // -------------------------------------------------------------------------
129 |     // 3. Графік по місяцях — агрегація в БД
130 |     // -------------------------------------------------------------------------
131 |     type MonthlyRow = {
132 |       year: number;
133 |       month: number;
134 |       revenue: number;
135 |       profit: number;
136 |     };
137 |     const monthlyRaw = await this.prisma.$queryRaw<MonthlyRow[]>`
138 |       SELECT
139 |         EXTRACT(YEAR  FROM e.date)::int                   AS year,
140 |         EXTRACT(MONTH FROM e.date)::int                   AS month,
141 |         COALESCE(SUM(r."totalSum"),      0)::float        AS revenue,
142 |         COALESCE(SUM(r."remainderSum"),  0)::float        AS profit
143 |       FROM "Event" e
144 |       JOIN "EventReport" r ON r."eventId" = e.id
145 |       WHERE e.status = 'RE_SALE'
146 |       ${filters}
147 |       GROUP BY year, month
148 |       ORDER BY year, month
149 |     `;
150 | 
151 |     const monthly = monthlyRaw.map((row) => ({
152 |       month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
153 |         month: 'short',
154 |         year: '2-digit',
155 |       }),
156 |       revenue: row.revenue,
157 |       profit: row.profit,
158 |     }));
159 | 
160 |     // -------------------------------------------------------------------------
161 |     // 4. Очікувана виручка — aggregate замість findMany + reduce
162 |     // -------------------------------------------------------------------------
163 |     const plannedAgg = await this.prisma.event.aggregate({
164 |       where: {
165 |         status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
166 |         ...(cityId ? { cityId } : {}),
167 |       },
168 |       _sum: { price: true },
169 |     });
170 |     const expectedRevenue = plannedAgg._sum.price ?? 0;
171 | 
172 |     // -------------------------------------------------------------------------
173 |     // 5. Фільтри (проєкти + міста) — паралельно, без join
174 |     // -------------------------------------------------------------------------
175 |     const [projectsRaw, cities] = await Promise.all([
176 |       this.prisma.event.findMany({
177 |         select: { project: true },
178 |         distinct: ['project'],
179 |       }),
180 |       this.prisma.city.findMany({ select: { id: true, name: true } }),
181 |     ]);
182 |     const filterOptions = {
183 |       projects: projectsRaw.map((p) => p.project).filter(Boolean),
184 |       cities,
185 |     };
186 | 
187 |     // -------------------------------------------------------------------------
188 |     // minimal — повертаємо лише KPI + monthly + фільтри
189 |     // -------------------------------------------------------------------------
190 |     if (minimal) {
191 |       const result = {
192 |         kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
193 |         monthly,
194 |         expectedRevenue,
195 |         filters: filterOptions,
196 |       };
197 |       this.setCached(cacheKey, result);
198 |       return result;
199 |     }
200 | 
201 |     // -------------------------------------------------------------------------
202 |     // 6. Структура доходів по проєктах
203 |     // -------------------------------------------------------------------------
204 |     type ProjectRow = { project: string; value: number };
205 |     const byProjectRows = await this.prisma.$queryRaw<ProjectRow[]>`
206 |       SELECT
207 |         COALESCE(e.project, 'Інше')              AS project,
208 |         COALESCE(SUM(r."totalSum"), 0)::float    AS value
209 |       FROM "Event" e
210 |       JOIN "EventReport" r ON r."eventId" = e.id
211 |       WHERE e.status = 'RE_SALE'
212 |       ${filters}
213 |       GROUP BY e.project
214 |       ORDER BY value DESC
215 |     `;
216 |     const byProject = byProjectRows.map((r) => ({
217 |       name: r.project,
218 |       value: r.value,
219 |     }));
220 | 
221 |     // -------------------------------------------------------------------------
222 |     // 7. Топ міст
223 |     // -------------------------------------------------------------------------
224 |     type CityRow = {
225 |       cityId: string;
226 |       name: string;
227 |       revenue: number;
228 |       profit: number;
229 |     };
230 |     const topCitiesRows = await this.prisma.$queryRaw<CityRow[]>`
231 |       SELECT
232 |         e."cityId",
233 |         COALESCE(c.name, '—')                    AS name,
234 |         COALESCE(SUM(r."totalSum"),     0)::float AS revenue,
235 |         COALESCE(SUM(r."remainderSum"), 0)::float AS profit
236 |       FROM "Event" e
237 |       JOIN "EventReport" r ON r."eventId" = e.id
238 |       LEFT JOIN "City" c   ON c.id = e."cityId"
239 |       WHERE e.status = 'RE_SALE'
240 |       ${filters}
241 |       GROUP BY e."cityId", c.name
242 |       ORDER BY revenue DESC
243 |       LIMIT 5
244 |     `;
245 |     const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
246 |       name,
247 |       revenue,
248 |       profit,
249 |     }));
250 | 
251 |     // -------------------------------------------------------------------------
252 |     // 8. Топ шкіл
253 |     // -------------------------------------------------------------------------
254 |     type SchoolRow = {
255 |       schoolId: string;
256 |       name: string;
257 |       count: number;
258 |       revenue: number;
259 |     };
260 |     const topSchoolsRows = await this.prisma.$queryRaw<SchoolRow[]>`
261 |       SELECT
262 |         e."schoolId",
263 |         COALESCE(s.name, '—')                    AS name,
264 |         COUNT(e.id)::int                         AS count,
265 |         COALESCE(SUM(r."totalSum"), 0)::float    AS revenue
266 |       FROM "Event" e
267 |       JOIN "EventReport" r ON r."eventId" = e.id
268 |       LEFT JOIN "School" s ON s.id = e."schoolId"
269 |       WHERE e.status = 'RE_SALE'
270 |       ${filters}
271 |       GROUP BY e."schoolId", s.name
272 |       ORDER BY revenue DESC
273 |       LIMIT 5
274 |     `;
275 |     const topSchools = topSchoolsRows.map(({ name, count, revenue }) => ({
276 |       name,
277 |       count,
278 |       revenue,
279 |     }));
280 | 
281 |     // -------------------------------------------------------------------------
282 |     // 9. Топ/антитоп подій — лише потрібні поля, без масивних include
283 |     // -------------------------------------------------------------------------
284 |     const eventSelect = {
285 |       totalSum: true,
286 |       remainderSum: true,
287 |       event: {
288 |         select: {
289 |           id: true,
290 |           date: true,
291 |           school: { select: { name: true } },
292 |         },
293 |       },
294 |     } satisfies Prisma.EventReportSelect;
295 | 
296 |     const [topEventsRaw, worstEventsRaw] = await Promise.all([
297 |       this.prisma.eventReport.findMany({
298 |         where: { event: baseEventWhere },
299 |         select: eventSelect,
300 |         orderBy: { remainderSum: 'desc' },
301 |         take: 5,
302 |       }),
303 |       this.prisma.eventReport.findMany({
304 |         where: { event: baseEventWhere },
305 |         select: eventSelect,
306 |         orderBy: { remainderSum: 'asc' },
307 |         take: 5,
308 |       }),
309 |     ]);
310 | 
311 |     const mapEvent = (r: (typeof topEventsRaw)[number]) => ({
312 |       id: r.event.id,
313 |       date: r.event.date,
314 |       school: r.event.school?.name ?? '—',
315 |       profit: r.remainderSum ?? 0,
316 |       revenue: r.totalSum ?? 0,
317 |     });
318 | 
319 |     const topEvents = topEventsRaw.map(mapEvent);
320 |     const worstEvents = worstEventsRaw.map(mapEvent);
321 | 
322 |     // -------------------------------------------------------------------------
323 |     const result = {
324 |       kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
325 |       monthly,
326 |       byProject,
327 |       byExpenseCategory,
328 |       topCities,
329 |       topSchools,
330 |       topEvents,
331 |       worstEvents,
332 |       expectedRevenue,
333 |       filters: filterOptions,
334 |     };
335 |     this.setCached(cacheKey, result);
336 |     return result;
337 |   }
338 | 
339 |   // ---------------------------------------------------------------------------
340 |   async getStaffRevenue({
341 |     period,
342 |     cityId,
343 |   }: {
344 |     period?: string;
345 |     cityId?: string;
346 |   }) {
347 |     const dateFrom = this.resolveDateFrom(period);
348 |     const staffFilters = this.buildSqlFilters({ dateFrom, cityId });
349 | 
350 |     type StaffRow = {
351 |       id: string;
352 |       name: string;
353 |       role: 'HOST' | 'DRIVER';
354 |       revenue: number;
355 |       eventsCount: number;
356 |     };
357 | 
358 |     // Всі три запити йдуть паралельно
359 |     const [hostRows, driverRows, totalAgg, eventsCount] = await Promise.all([
360 |       // Ведучі
361 |       this.prisma.$queryRaw<StaffRow[]>`
362 |         SELECT
363 |           u.id,
364 |           u.name,
365 |           'HOST'::text                              AS role,
366 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
367 |           COUNT(e.id)::int                          AS "eventsCount"
368 |         FROM "Event" e
369 |         JOIN "EventCrew"    c ON c."eventId" = e.id
370 |         JOIN "User"         u ON u.id = c."hostId"
371 |         JOIN "EventReport"  r ON r."eventId" = e.id
372 |         WHERE e.status = 'RE_SALE'
373 |         ${staffFilters}
374 |         GROUP BY u.id, u.name
375 |       `,
376 |       // Водії
377 |       this.prisma.$queryRaw<StaffRow[]>`
378 |         SELECT
379 |           u.id,
380 |           u.name,
381 |           'DRIVER'::text                            AS role,
382 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
383 |           COUNT(e.id)::int                          AS "eventsCount"
384 |         FROM "Event" e
385 |         JOIN "EventCrew"   c ON c."eventId" = e.id
386 |         JOIN "User"        u ON u.id = c."driverId"
387 |         JOIN "EventReport" r ON r."eventId" = e.id
388 |         WHERE e.status = 'RE_SALE'
389 |         ${staffFilters}
390 |         GROUP BY u.id, u.name
391 |       `,
392 |       // Загальна виручка
393 |       this.prisma.$queryRaw<[{ revenue: number }]>`
394 |         SELECT COALESCE(SUM(r."totalSum"), 0)::float AS revenue
395 |         FROM "Event" e
396 |         JOIN "EventReport" r ON r."eventId" = e.id
397 |         WHERE e.status = 'RE_SALE'
398 |         ${staffFilters}
399 |       `,
400 |       // Кількість унікальних подій
401 |       this.prisma.event.count({
402 |         where: {
403 |           status: 'RE_SALE',
404 |           ...(dateFrom ? { date: { gte: dateFrom } } : {}),
405 |           ...(cityId ? { cityId } : {}),
406 |         },
407 |       }),
408 |     ]);
409 | 
410 |     const staff = [...hostRows, ...driverRows].sort(
411 |       (a, b) => b.revenue - a.revenue,
412 |     );
413 |     const totalRevenue = totalAgg[0]?.revenue ?? 0;
414 | 
415 |     return { staff, totalRevenue, eventsCount };
416 |   }
417 | }
418 | 
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
 14 | const CityProfile = lazy(() => import("./pages/CityProfile"));
 15 | const EventReport = lazy(() => import("./pages/EventReport"));
 16 | 
 17 | // --- ДИНАМІЧНІ ІМПОРТИ (Ледаче завантаження / Code Splitting) ---
 18 | // Ці файли будуть завантажуватись окремими шматками (chunks) ТІЛЬКИ коли користувач перейде на відповідну сторінку
 19 | const Cities = lazy(() => import("./pages/Cities"));
 20 | const Schools = lazy(() => import("./pages/Schools"));
 21 | const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
 22 | const Employees = lazy(() => import("./pages/Employees"));
 23 | const Finance = lazy(() => import("./pages/Finance"));
 24 | const CalendarView = lazy(() => import("./pages/CalendarView"));
 25 | const Dashboard = lazy(() => import("./pages/Dashboard"));
 26 | const Kindergartens = lazy(() => import("./pages/Kindergartens"));
 27 | 
 28 | // Компонент-заглушка, який показується долі секунди, поки вантажиться JS код сторінки
 29 | const PageLoader = () => (
 30 |   <div className="flex items-center justify-center h-full min-h-[50vh]">
 31 |     <div className="text-slate-400 font-medium animate-pulse">
 32 |       Завантаження сторінки...
 33 |     </div>
 34 |   </div>
 35 | );
 36 | 
 37 | export default function App() {
 38 |   // Базова логіка авторизації
 39 |   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
 40 |     !!localStorage.getItem("token"),
 41 |   );
 42 | 
 43 |   const handleLogin = (token: string) => {
 44 |     localStorage.setItem("token", token);
 45 |     setIsAuthenticated(true);
 46 |   };
 47 | 
 48 |   const handleLogout = () => {
 49 |     localStorage.removeItem("token");
 50 |     setIsAuthenticated(false);
 51 |   };
 52 | 
 53 |   return (
 54 |     <Router>
 55 |       <CityProvider>
 56 |         <Routes>
 57 |           {/* Публічний маршрут: Логін */}
 58 |           <Route
 59 |             path="/login"
 60 |             element={
 61 |               !isAuthenticated ? (
 62 |                 <Login onLogin={handleLogin} />
 63 |               ) : (
 64 |                 <Navigate to="/cities" replace />
 65 |               )
 66 |             }
 67 |           />
 68 | 
 69 |           {/* Захищені маршрути (Layout відображає бокове меню) */}
 70 |           <Route
 71 |             path="/"
 72 |             element={
 73 |               isAuthenticated ? (
 74 |                 <Layout onLogout={handleLogout} />
 75 |               ) : (
 76 |                 <Navigate to="/login" replace />
 77 |               )
 78 |             }
 79 |           >
 80 |             {/* Редірект з кореня на сторінку міст за замовчуванням */}
 81 |             <Route index element={<Navigate to="/cities" replace />} />
 82 | 
 83 |             {/* Обгортаємо всі вкладені маршрути в Suspense. 
 84 |               Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
 85 |               поки завантажується файл з сервера.
 86 |             */}
 87 |             <Route
 88 |               path="cities"
 89 |               element={
 90 |                 <Suspense fallback={<PageLoader />}>
 91 |                   <Cities />
 92 |                 </Suspense>
 93 |               }
 94 |             />
 95 | 
 96 |             <Route
 97 |               path="schools"
 98 |               element={
 99 |                 <Suspense fallback={<PageLoader />}>
100 |                   <Schools />
101 |                 </Suspense>
102 |               }
103 |             />
104 | 
105 |             <Route
106 |               path="schools/:id"
107 |               element={
108 |                 <Suspense fallback={<PageLoader />}>
109 |                   <SchoolProfile />
110 |                 </Suspense>
111 |               }
112 |             />
113 | 
114 |             <Route
115 |               path="employees"
116 |               element={
117 |                 <Suspense fallback={<PageLoader />}>
118 |                   <Employees />
119 |                 </Suspense>
120 |               }
121 |             />
122 | 
123 |             <Route
124 |               path="finance"
125 |               element={
126 |                 <Suspense fallback={<PageLoader />}>
127 |                   <Finance />
128 |                 </Suspense>
129 |               }
130 |             />
131 | 
132 |             <Route
133 |               path="calendar"
134 |               element={
135 |                 <Suspense fallback={<PageLoader />}>
136 |                   <CalendarView />
137 |                 </Suspense>
138 |               }
139 |             />
140 |             <Route
141 |               path="dashboard"
142 |               element={
143 |                 <Suspense fallback={<PageLoader />}>
144 |                   <Dashboard />
145 |                 </Suspense>
146 |               }
147 |             />
148 | 
149 |             <Route
150 |               path="kindergartens"
151 |               element={
152 |                 <Suspense fallback={<PageLoader />}>
153 |                   <Kindergartens />
154 |                 </Suspense>
155 |               }
156 |             />
157 | 
158 |             <Route
159 |               path="cities/:id"
160 |               element={
161 |                 <Suspense fallback={<PageLoader />}>
162 |                   <CityProfile />
163 |                 </Suspense>
164 |               }
165 |             />
166 | 
167 |             <Route
168 |               path="events/:id/report"
169 |               element={
170 |                 <Suspense fallback={<PageLoader />}>
171 |                   <EventReport />
172 |                 </Suspense>
173 |               }
174 |             />
175 |           </Route>
176 |         </Routes>
177 |       </CityProvider>
178 |     </Router>
179 |   );
180 | }
181 | 
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
  0 | import { useState } from "react";
  1 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  2 | import { api } from "../config/api";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | 
  5 | const STATUSES = ["Планується", "Виконується", "Виконано"];
  6 | 
  7 | const STATUS_STYLES: Record<string, string> = {
  8 |   Планується: "bg-amber-50 text-amber-700 border-amber-200",
  9 |   Виконується: "bg-blue-50 text-blue-700 border-blue-200",
 10 |   Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
 11 | };
 12 | 
 13 | function getNextStatus(current: string) {
 14 |   const idx = STATUSES.indexOf(current);
 15 |   return STATUSES[(idx + 1) % STATUSES.length];
 16 | }
 17 | 
 18 | export default function IssueCarousel() {
 19 |   const { selectedCity } = useSelectedCity();
 20 |   const qc = useQueryClient();
 21 |   const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
 22 | 
 23 |   const { data: issues = [] } = useQuery({
 24 |     queryKey: ["issues", selectedCity?.id],
 25 |     queryFn: async () => {
 26 |       if (!selectedCity?.id) return [];
 27 |       const res = await api.get(`/issues?cityId=${selectedCity.id}`);
 28 |       return res.data.filter((i: any) => i.status !== "Виконано");
 29 |     },
 30 |     enabled: !!selectedCity?.id,
 31 |   });
 32 | 
 33 |   const updateStatusMutation = useMutation({
 34 |     mutationFn: (data: { id: string; status: string }) =>
 35 |       api.patch(`/issues/${data.id}/status`, { status: data.status }),
 36 |     onSuccess: () => {
 37 |       qc.invalidateQueries({ queryKey: ["issues", selectedCity?.id] });
 38 |     },
 39 |   });
 40 | 
 41 |   const handleStatusToggle = (issue: any) => {
 42 |     const nextStatus = getNextStatus(issue.status);
 43 | 
 44 |     if (nextStatus === "Виконано") {
 45 |       setExitingIssueId(issue.id);
 46 |       setTimeout(() => {
 47 |         updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
 48 |         setExitingIssueId(null);
 49 |       }, 500);
 50 |     } else {
 51 |       updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
 52 |     }
 53 |   };
 54 | 
 55 |   if (issues.length === 0) return null;
 56 | 
 57 |   return (
 58 |     <div className="mb-6 animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
 59 |       <style>{`
 60 |         @keyframes slideDown {
 61 |           from { opacity: 0; transform: translateY(-15px); }
 62 |           to { opacity: 1; transform: translateY(0); }
 63 |         }
 64 |         @keyframes slideUp {
 65 |           from { opacity: 1; transform: translateY(0); }
 66 |           to { opacity: 0; transform: translateY(-10px); }
 67 |         }
 68 |       `}</style>
 69 | 
 70 |       <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
 71 |         🚨 <span>Активні проблеми</span>
 72 |         <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
 73 |           {issues.length}
 74 |         </span>
 75 |       </h2>
 76 | 
 77 |       {/* Зверни увагу: я прибрав gap-4 і додав відступи самим елементам, щоб анімація звуження працювала ідеально */}
 78 |       <div className="flex overflow-x-auto pb-4 -mx-1 px-1">
 79 |         {issues.map((issue) => {
 80 |           const isExiting = exitingIssueId === issue.id;
 81 | 
 82 |           return (
 83 |             // Зовнішній контейнер керує шириною, прозорістю і відступом
 84 |             <div
 85 |               key={issue.id}
 86 |               className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
 87 |                 isExiting
 88 |                   ? "w-0 min-w-0 mr-0 opacity-0 scale-x-75 pointer-events-none"
 89 |                   : "w-[300px] min-w-[300px] mr-4 opacity-100 scale-x-100 shrink-0"
 90 |               }`}
 91 |             >
 92 |               {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
 93 |               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
 94 |                 <div>
 95 |                   <p className="text-xs text-slate-400 mb-1">
 96 |                     {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
 97 |                       day: "2-digit",
 98 |                       month: "2-digit",
 99 |                       year: "numeric",
100 |                       hour: "2-digit",
101 |                       minute: "2-digit",
102 |                     })}
103 |                   </p>
104 |                   <p className="font-bold text-slate-800 text-sm">
105 |                     {issue.schoolName}
106 |                   </p>
107 |                   <p className="text-xs text-slate-500">{issue.eventName}</p>
108 |                 </div>
109 | 
110 |                 <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
111 |                   "{issue.message}"
112 |                 </p>
113 | 
114 |                 <button
115 |                   onClick={() => handleStatusToggle(issue)}
116 |                   className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
117 |                 >
118 |                   ● {issue.status} → натисни щоб змінити
119 |                 </button>
120 |               </div>
121 |             </div>
122 |           );
123 |         })}
124 |       </div>
125 |     </div>
126 |   );
127 | }
128 | 
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
131 |             to="/finance"
132 |             onClick={handleLinkClick}
133 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/finance") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
134 |           >
135 |             <span className="mr-3">💰</span> Фінанси
136 |           </Link>
137 |           <Link
138 |             to="/calendar"
139 |             onClick={handleLinkClick}
140 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/calendar") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
141 |           >
142 |             <span className="mr-3">📆</span> Календар
143 |           </Link>
144 |           {isSuperAdmin && (
145 |             <Link
146 |               to="/employees"
147 |               onClick={handleLinkClick}
148 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/employees") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
149 |             >
150 |               <span className="mr-3">👥</span> Працівники
151 |             </Link>
152 |           )}
153 |         </nav>
154 | 
155 |         <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
156 |           <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
157 |             <div className="flex items-center">
158 |               <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
159 |                 {user?.name?.charAt(0) ?? "?"}
160 |               </div>
161 |               <div className="text-sm truncate max-w-[120px]">
162 |                 <p className="font-medium text-white truncate">
163 |                   {user?.name ?? "Користувач"}
164 |                 </p>
165 |                 <p className="text-xs text-slate-400 truncate">
166 |                   {user?.role ?? ""}
167 |                 </p>
168 |               </div>
169 |             </div>
170 |             <button
171 |               onClick={handleLogout}
172 |               className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-2 shrink-0 p-2"
173 |               title="Вийти"
174 |             >
175 |               ⬅️
176 |             </button>
177 |           </div>
178 |         </div>
179 |       </aside>
180 | 
181 |       {/* Головна область */}
182 |       <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full">
183 |         <Outlet />
184 |       </main>
185 |     </div>
186 |   );
187 | }
188 | 
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
  5 |   renderItem: (school: any, index: number) => JSX.Element;
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
 40 |             {renderItem(schools[virtualRow.index], virtualRow.index)}
 41 |           </div>
 42 |         ))}
 43 |       </div>
 44 |     </div>
 45 |   );
 46 | }
```

### File: apps/frontend/src/components/cities/CityDesktopGrid.tsx
```tsx
  0 | import { useRef, useCallback } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import OptimizedImage from "../ui/OptimizedImage";
  3 | 
  4 | const CITY_PHOTOS: Record<string, string> = {
  5 |   Львів:
  6 |     "https://gohotels.com.ua/images/stories/f08072159a443e07501f3df97987f8a3.jpg",
  7 |   Київ: "https://images.unsplash.com/photo-1630651814316-fe71f3c30279?w=600&q=80&auto=format",
  8 |   Харків:
  9 |     "https://images.unsplash.com/photo-1584646098378-0f87b72cffe1?w=600&q=80&auto=format",
 10 |   Одеса:
 11 |     "https://images.unsplash.com/photo-1585168050053-a4ba02e3f0d2?w=600&q=80&auto=format",
 12 |   Дніпро:
 13 |     "https://images.unsplash.com/photo-1570587953042-a65fd17e2f73?w=600&q=80&auto=format",
 14 | };
 15 | const DEFAULT_PHOTO =
 16 |   "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";
 17 | 
 18 | // ─── Одна картка міста ────────────────────────────────────────────────────────
 19 | 
 20 | function CityCard({
 21 |   city,
 22 |   index,
 23 |   isSelected,
 24 |   onSelect,
 25 | }: {
 26 |   city: any;
 27 |   index: number;
 28 |   isSelected: boolean;
 29 |   onSelect: () => void;
 30 | }) {
 31 |   const navigate = useNavigate();
 32 |   const imgRef = useRef<HTMLImageElement>(null);
 33 | 
 34 |   // Паралакс: фото зміщується на 4px при русі миші над карткою
 35 |   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
 36 |     const img = imgRef.current;
 37 |     if (!img) return;
 38 |     const rect = e.currentTarget.getBoundingClientRect();
 39 |     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
 40 |     const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
 41 |     img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
 42 |   }, []);
 43 | 
 44 |   const handleMouseLeave = useCallback(() => {
 45 |     const img = imgRef.current;
 46 |     if (!img) return;
 47 |     img.style.transform = "scale(1) translate(0, 0)";
 48 |   }, []);
 49 | 
 50 |   return (
 51 |     <div
 52 |       // Stagger animation: кожна картка з'являється з затримкою index * 60ms
 53 |       style={{
 54 |         animationDelay: `${index * 60}ms`,
 55 |         animationFillMode: "both",
 56 |       }}
 57 |       className={`
 58 |         city-card-enter
 59 |         bg-white rounded-2xl shadow-sm border overflow-hidden group
 60 |         transition-[transform,box-shadow] duration-300 ease-out
 61 |         hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl
 62 |         ${
 63 |           isSelected
 64 |             ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md"
 65 |             : "border-slate-100 hover:border-blue-200"
 66 |         }
 67 |       `}
 68 |     >
 69 |       {/* Фото з паралаксом і градієнтом Netflix-стилю */}
 70 |       <div
 71 |         className="h-44 overflow-hidden relative"
 72 |         onMouseMove={handleMouseMove}
 73 |         onMouseLeave={handleMouseLeave}
 74 |       >
 75 |         <img
 76 |           ref={imgRef}
 77 |           src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
 78 |           alt={city.name}
 79 |           loading="lazy"
 80 |           decoding="async"
 81 |           className="w-full h-full object-cover transition-transform duration-300 ease-out"
 82 |           onError={(e) => {
 83 |             (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
 84 |           }}
 85 |         />
 86 | 
 87 |         {/* Темний градієнт знизу — назва міста чітко читається */}
 88 |         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
 89 | 
 90 |         {/* Назва міста поверх градієнта */}
 91 |         <div className="absolute bottom-0 left-0 right-0 p-4">
 92 |           <h2 className="text-white text-xl font-bold drop-shadow-sm leading-tight">
 93 |             {city.name}
 94 |           </h2>
 95 |         </div>
 96 | 
 97 |         {/* Чекмарк якщо місто обрано */}
 98 |         {isSelected && (
 99 |           <div className="check-enter absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
100 |             <svg
101 |               className="w-5 h-5"
102 |               fill="none"
103 |               stroke="currentColor"
104 |               viewBox="0 0 24 24"
105 |             >
106 |               <path
107 |                 strokeLinecap="round"
108 |                 strokeLinejoin="round"
109 |                 strokeWidth={3}
110 |                 d="M5 13l4 4L19 7"
111 |               />
112 |             </svg>
113 |           </div>
114 |         )}
115 |       </div>
116 | 
117 |       {/* Контент картки */}
118 |       <div className="p-5">
119 |         <div className="flex items-center justify-between mb-3">
120 |           <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
121 |             Активне
122 |           </span>
123 |         </div>
124 | 
125 |         <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
126 |           <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
127 |             {city.manager?.name?.charAt(0) ?? "?"}
128 |           </div>
129 |           <span>
130 |             Менеджер:{" "}
131 |             <span className="font-medium">{city.manager?.name ?? "—"}</span>
132 |           </span>
133 |         </div>
134 | 
135 |         <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
136 |           <div className="flex justify-between text-slate-500">
137 |             <span>Заплановано подій:</span>
138 |             <span className="font-semibold text-slate-800">
139 |               {city.plannedEvents ?? 0}
140 |             </span>
141 |           </div>
142 |         </div>
143 | 
144 |         <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
145 |           <button
146 |             onClick={onSelect}
147 |             className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-200 ${
148 |               isSelected
149 |                 ? "bg-blue-50 text-blue-700 border border-blue-200 scale-[0.98]"
150 |                 : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
151 |             }`}
152 |           >
153 |             <span className="inline-flex items-center gap-1.5 transition-all duration-200">
154 |               {isSelected ? "✓ Обрано" : "Вибрати"}
155 |             </span>
156 |           </button>
157 |           <button
158 |             onClick={() => navigate(`/cities/${city.id}`)}
159 |             className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
160 |           >
161 |             →
162 |           </button>
163 |         </div>
164 |       </div>
165 |     </div>
166 |   );
167 | }
168 | 
169 | // ─── Грід ────────────────────────────────────────────────────────────────────
170 | 
171 | export default function CityDesktopGrid({
172 |   cities,
173 |   selectedCity,
174 |   onSelectCity,
175 | }: any) {
176 |   return (
177 |     <>
178 |       {/*
179 |         Стиль анімації — вставляємо один раз через <style>.
180 |         opacity: 0 → 1  +  translateY(16px) → 0
181 |         Це stagger: кожна картка отримує animationDelay через inline style вище.
182 |       */}
183 |      <style>{`
184 |         @keyframes cityCardIn {
185 |           from { opacity: 0; transform: translateY(20px) scale(0.97); }
186 |           to   { opacity: 1; transform: translateY(0) scale(1); }
187 |         }
188 |         .city-card-enter {
189 |           animation: cityCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
190 |         }
191 |         @keyframes checkIn {
192 |           from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
193 |           to   { opacity: 1; transform: scale(1) rotate(0deg); }
194 |         }
195 |         .check-enter {
196 |           animation: checkIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
197 |         }
198 |       `}</style>
199 | 
200 |       <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
201 |         {cities.map((city: any, index: number) => (
202 |           <CityCard
203 |             key={city.id}
204 |             city={city}
205 |             index={index}
206 |             isSelected={selectedCity?.id === city.id}
207 |             onSelect={() => onSelectCity({ id: city.id, name: city.name })}
208 |           />
209 |         ))}
210 |       </div>
211 |     </>
212 |   );
213 | }
214 | 
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
  9 | const STATUSES = ["Планується", "Виконується", "Виконано"];
 10 | 
 11 | const STATUS_STYLES: Record<string, string> = {
 12 |   Планується: "bg-amber-50 text-amber-700 border-amber-200",
 13 |   Виконується: "bg-blue-50 text-blue-700 border-blue-200",
 14 |   Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
 15 | };
 16 | 
 17 | function getNextStatus(current: string) {
 18 |   const idx = STATUSES.indexOf(current);
 19 |   return STATUSES[(idx + 1) % STATUSES.length];
 20 | }
 21 | 
 22 | const CITY_ICONS: Record<string, string> = {
 23 |   Львів: "🦁",
 24 |   Київ: "🏰",
 25 |   Харків: "⚙️",
 26 |   Одеса: "⚓",
 27 |   Дніпро: "🌊",
 28 |   Запоріжжя: "🔱",
 29 |   Вінниця: "🌸",
 30 |   Полтава: "🌻",
 31 |   Черкаси: "🍒",
 32 |   Чернівці: "🎭",
 33 | };
 34 | const DEFAULT_CITY_ICON = "🏙️";
 35 | 
 36 | export default function CityMobileHeader({ selectedCity, cities }: Props) {
 37 |   const navigate = useNavigate();
 38 |   const [issues, setIssues] = useState<any[]>([]);
 39 |   const [isExpanded, setIsExpanded] = useState(false);
 40 |   const [isListExiting, setIsListExiting] = useState(false);
 41 |   const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
 42 |   const [issuesVisible, setIssuesVisible] = useState(false);
 43 |   const [issuesExiting, setIssuesExiting] = useState(false);
 44 | 
 45 |   useEffect(() => {
 46 |     if (!selectedCity?.id) {
 47 |       setIssues([]);
 48 |       return;
 49 |     }
 50 |     api
 51 |       .get(`/issues?cityId=${selectedCity.id}`)
 52 |       .then((res) => {
 53 |         const filtered = res.data.filter((i: any) => i.status !== "Виконано");
 54 |         setIssues(filtered);
 55 |         if (filtered.length > 0) {
 56 |           setIssuesExiting(false);
 57 |           setIssuesVisible(true);
 58 |         } else {
 59 |           setIssuesExiting(true);
 60 |           setTimeout(() => {
 61 |             setIssuesVisible(false);
 62 |             setIssuesExiting(false);
 63 |           }, 300);
 64 |         }
 65 |       })
 66 |       .catch(console.error);
 67 |   }, [selectedCity?.id]);
 68 | 
 69 |   const handleStatusToggle = async (issue: any) => {
 70 |     const nextStatus = getNextStatus(issue.status);
 71 | 
 72 |     // Оптимістичне оновлення — UI реагує миттєво
 73 |     if (nextStatus === "Виконано") {
 74 |       setExitingIssueId(issue.id);
 75 |       setTimeout(() => {
 76 |         setIssues((prev) => {
 77 |           const next = prev.filter((i) => i.id !== issue.id);
 78 |           if (next.length === 0) {
 79 |             setIsExpanded(false);
 80 |             setIssuesExiting(true);
 81 |             setTimeout(() => {
 82 |               setIssuesVisible(false);
 83 |               setIssuesExiting(false);
 84 |             }, 300);
 85 |           }
 86 |           return next;
 87 |         });
 88 |         setExitingIssueId(null);
 89 |       }, 400);
 90 |     } else {
 91 |       setIssues((prev) =>
 92 |         prev.map((i) => (i.id === issue.id ? { ...i, status: nextStatus } : i)),
 93 |       );
 94 |     }
 95 | 
 96 |     // Запит у фоні
 97 |     api
 98 |       .patch(`/issues/${issue.id}/status`, { status: nextStatus })
 99 |       .catch((e) => {
100 |         console.error(e);
101 |         // Відкат при помилці
102 |         setIssues((prev) =>
103 |           prev.map((i) =>
104 |             i.id === issue.id ? { ...i, status: issue.status } : i,
105 |           ),
106 |         );
107 |       });
108 |   };
109 | 
110 |   const currentCityData = cities?.find((c: any) => c.id === selectedCity?.id);
111 |   const totalEvents =
112 |     (currentCityData?.plannedEvents || 0) +
113 |     (currentCityData?.completedEvents || 0);
114 |   const schoolsCount = currentCityData?.schoolsCount || 0;
115 | 
116 |   return (
117 |     <div className="md:hidden flex flex-col gap-4 mb-4">
118 |       <style>{`
119 |         @keyframes slideDown {
120 |           from { opacity: 0; transform: translateY(-10px); }
121 |           to { opacity: 1; transform: translateY(0); }
122 |         }
123 |         @keyframes slideUp {
124 |           from { opacity: 1; transform: translateY(0); max-height: 200px; }
125 |           to { opacity: 0; transform: translateY(-8px); max-height: 0; }
126 |         }
127 |         @keyframes expandDown {
128 |           from { opacity: 0; transform: translateY(-6px); }
129 |           to { opacity: 1; transform: translateY(0); }
130 |         }
131 |         @keyframes cityNameChange {
132 |           0% { opacity: 1; transform: translateY(0); }
133 |           40% { opacity: 0; transform: translateY(-6px); }
134 |           60% { opacity: 0; transform: translateY(6px); }
135 |           100% { opacity: 1; transform: translateY(0); }
136 |         }
137 |         .city-name-change {
138 |           animation: cityNameChange 0.35s cubic-bezier(0.16, 1, 0.3, 1);
139 |         }
140 |         .issues-enter {
141 |           animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
142 |           opacity: 0;
143 |         }
144 |         .issues-exit {
145 |           animation: slideUp 0.3s ease-in forwards;
146 |           overflow: hidden;
147 |         }
148 |         .expand-enter {
149 |           animation: expandDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
150 |           opacity: 0;
151 |         }
152 |         @keyframes collapseUp {
153 |           from { opacity: 1; transform: translateY(0); }
154 |           to { opacity: 0; transform: translateY(-8px); }
155 |         }
156 |         .expand-exit {
157 |           animation: collapseUp 0.22s ease-in forwards;
158 |         }
159 |         @keyframes statusFlash {
160 |           0% { transform: scale(1); }
161 |           40% { transform: scale(0.95); opacity: 0.7; }
162 |           100% { transform: scale(1); opacity: 1; }
163 |         }
164 |         .status-flash {
165 |           animation: statusFlash 0.2s ease-out;
166 |         }
167 |       `}</style>
168 | 
169 |       {/* Сповіщення про проблему з розгортанням */}
170 |       {issuesVisible && (
171 |         <div
172 |           className={`bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm ${issuesExiting ? "issues-exit" : "issues-enter"}`}
173 |         >
174 |           <div
175 |             className="flex items-center gap-4 cursor-pointer"
176 |             onClick={() => {
177 |               if (isExpanded) {
178 |                 setIsListExiting(true);
179 |                 setTimeout(() => {
180 |                   setIsExpanded(false);
181 |                   setIsListExiting(false);
182 |                 }, 250);
183 |               } else {
184 |                 setIsExpanded(true);
185 |               }
186 |             }}
187 |           >
188 |             <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
189 |               🔔
190 |             </div>
191 |             <div className="flex-1 min-w-0">
192 |               <p className="font-bold text-slate-800 text-sm">
193 |                 {issues.length} активн
194 |                 {issues.length === 1
195 |                   ? "а проблема"
196 |                   : issues.length < 5
197 |                     ? "і проблеми"
198 |                     : "их проблем"}
199 |               </p>
200 |               {!isExpanded && (
201 |                 <p className="text-xs text-slate-600 truncate mt-0.5">
202 |                   {issues[0]?.schoolName}
203 |                 </p>
204 |               )}
205 |             </div>
206 |             <button
207 |               className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
208 |               style={{
209 |                 transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
210 |               }}
211 |             >
212 |               ›
213 |             </button>
214 |           </div>
215 | 
216 |           {/* Розгорнутий список проблем */}
217 |           {isExpanded && (
218 |             <div
219 |               className={`flex flex-col gap-3 mt-2 pt-3 border-t border-red-100/50 ${isListExiting ? "expand-exit" : "expand-enter"}`}
220 |             >
221 |               {issues.map((issue) => {
222 |                 const isExiting = exitingIssueId === issue.id;
223 |                 return (
224 |                   <div
225 |                     key={issue.id}
226 |                     className={`bg-white rounded-2xl p-4 border border-red-100 shadow-sm relative transition-all duration-400 ease-in-out transform origin-top ${
227 |                       isExiting
228 |                         ? "opacity-0 scale-95 h-0 overflow-hidden !p-0 border-0"
229 |                         : "opacity-100 scale-100"
230 |                     }`}
231 |                   >
232 |                     <p className="text-[11px] text-slate-400 mb-1">
233 |                       {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
234 |                         day: "2-digit",
235 |                         month: "2-digit",
236 |                         year: "numeric",
237 |                         hour: "2-digit",
238 |                         minute: "2-digit",
239 |                       })}
240 |                     </p>
241 |                     <p className="font-bold text-slate-800 text-sm">
242 |                       {issue.schoolName}
243 |                     </p>
244 |                     <p className="text-[11px] text-slate-500 mb-3">
245 |                       {issue.eventName}
246 |                     </p>
247 | 
248 |                     <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed border border-slate-100 mb-3">
249 |                       "{issue.message}"
250 |                     </p>
251 | 
252 |                     <button
253 |                       onClick={() => handleStatusToggle(issue)}
254 |                       key={issue.status}
255 |                       className={`status-flash w-full text-xs font-bold px-3 py-2.5 rounded-lg border transition-colors text-left flex items-center gap-1.5 ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
256 |                     >
257 |                       <span className="text-[10px]">●</span> {issue.status}{" "}
258 |                       <span className="font-normal opacity-70">
259 |                         → натисни щоб змінити
260 |                       </span>
261 |                     </button>
262 |                   </div>
263 |                 );
264 |               })}
265 |             </div>
266 |           )}
267 |         </div>
268 |       )}
269 | 
270 |       {/* Поточне місто */}
271 |       {selectedCity?.id && (
272 |         <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
273 |           <div className="flex justify-between items-center mb-4">
274 |             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
275 |               Поточне місто
276 |             </span>
277 |             <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
278 |               ✓ Активне місто
279 |             </span>
280 |           </div>
281 | 
282 |           <div className="flex items-center gap-3 mb-4">
283 |             <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg city-name-change">
284 |               {CITY_ICONS[selectedCity.name] || DEFAULT_CITY_ICON}
285 |             </div>
286 |             <h2
287 |               key={selectedCity.id}
288 |               className="text-2xl font-bold text-slate-800 city-name-change"
289 |             >
290 |               {selectedCity.name}
291 |             </h2>
292 |           </div>
293 | 
294 |           <div className="flex items-center justify-between text-xs font-medium gap-2">
295 |             <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
296 |               <span className="text-blue-500 text-sm">📅</span> {totalEvents}{" "}
297 |               подій
298 |             </div>
299 |             <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
300 |               <span className="text-blue-500 text-sm">🏫</span> {schoolsCount}{" "}
301 |               шкіл
302 |             </div>
303 |             <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
304 |               <span className="text-sm">⚠️</span> {issues.length} проблем
305 |             </div>
306 |             {/* <button 
307 |               onClick={() => navigate(`/cities/${selectedCity.id}`)} 
308 |               className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
309 |             >
310 |               →
311 |             </button> */}
312 |           </div>
313 |         </div>
314 |       )}
315 |     </div>
316 |   );
317 | }
318 | 
```

### File: apps/frontend/src/components/cities/CityMobileList.tsx
```tsx
  0 | import { useState, useMemo } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | 
  3 | const CITY_ICONS: Record<string, string> = {
  4 |   Львів: "🦁",
  5 |   Київ: "🏰",
  6 |   Харків: "⚙️",
  7 |   Одеса: "⚓",
  8 |   Дніпро: "🌊",
  9 |   Запоріжжя: "🔱",
 10 |   Вінниця: "🌸",
 11 |   Полтава: "🌻",
 12 |   Черкаси: "🍒",
 13 |   Чернівці: "🎭",
 14 | };
 15 | const DEFAULT_CITY_ICON = "🏙️";
 16 | 
 17 | const ICON_COLORS = [
 18 |   "bg-purple-50",
 19 |   "bg-amber-50",
 20 |   "bg-teal-50",
 21 |   "bg-rose-50",
 22 |   "bg-sky-50",
 23 | ];
 24 | 
 25 | export default function CityMobileList({
 26 |   cities,
 27 |   selectedCity,
 28 |   onSelectCity,
 29 | }: any) {
 30 |   const navigate = useNavigate();
 31 |   const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">(
 32 |     "ACTIVE",
 33 |   );
 34 | 
 35 |   const [tabKey, setTabKey] = useState(0);
 36 | 
 37 |   const filteredCities = useMemo(() => {
 38 |     return cities.filter((c: any) => {
 39 |       const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
 40 |       if (activeTab === "ACTIVE") return hasEvents;
 41 |       if (activeTab === "ARCHIVED") return !hasEvents;
 42 |       return true;
 43 |     });
 44 |   }, [cities, activeTab]);
 45 | 
 46 |   return (
 47 |     <>
 48 |       {/* Stagger анімація для мобільних рядків */}
 49 |       <style>{`
 50 |         @keyframes cityRowIn {
 51 |           from { opacity: 0; transform: translateX(-14px); }
 52 |           to   { opacity: 1; transform: translateX(0); }
 53 |         }
 54 |         .city-row-enter {
 55 |           animation: cityRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 56 |           animation-fill-mode: both;
 57 |         }
 58 |         @keyframes tabSlideIn {
 59 |           from { opacity: 0; transform: translateY(4px); }
 60 |           to   { opacity: 1; transform: translateY(0); }
 61 |         }
 62 |         @keyframes dotPop {
 63 |           from { transform: scale(0); }
 64 |           to   { transform: scale(1); }
 65 |         }
 66 |         .dot-pop {
 67 |           animation: dotPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
 68 |         }
 69 |       `}</style>
 70 | 
 71 |       <div className="md:hidden flex flex-col gap-4 mb-24">
 72 |         {/* Вкладки */}
 73 |         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-1">
 74 |           {["Активні", "Усі", "Архівні"].map((tab) => {
 75 |             const tabKey =
 76 |               tab === "Активні" ? "ACTIVE" : tab === "Усі" ? "ALL" : "ARCHIVED";
 77 |             const isActive = activeTab === tabKey;
 78 |             return (
 79 |               <button
 80 |                 key={tab}
 81 |                 onClick={() => { setActiveTab(tabKey as typeof activeTab); setTabKey(k => k + 1); }}
 82 |                 className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
 83 |                   isActive
 84 |                     ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm"
 85 |                     : "bg-slate-100 text-slate-500 hover:bg-slate-200"
 86 |                 }`}
 87 |               >
 88 |                 {isActive && (
 89 |                   <span className="dot-pop w-1.5 h-1.5 rounded-full bg-blue-600" />
 90 |                 )}
 91 |                 {tab}
 92 |               </button>
 93 |             );
 94 |           })}
 95 |         </div>
 96 | 
 97 |         {/* Список */}
 98 |         <div key={tabKey} className="flex flex-col bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
 99 |           {filteredCities.map((city: any, index: number) => {
100 |             const iconStyle = ICON_COLORS[index % ICON_COLORS.length];
101 |             const totalEvents =
102 |               (city.plannedEvents || 0) + (city.completedEvents || 0);
103 |             const isSelected = selectedCity?.id === city.id;
104 | 
105 |             return (
106 |               <div
107 |                 key={city.id}
108 |                 // Stagger: кожен рядок з'являється з зміщенням index * 50ms
109 |                 style={{ animationDelay: `${index * 50}ms` }}
110 |                 className={`
111 |                   city-row-enter
112 |                   flex items-center p-4 border-b border-slate-50
113 |                   transition-[background-color,transform] duration-150
114 |                   active:scale-[0.99] active:bg-slate-50
115 |                   ${isSelected ? "bg-blue-50/30" : ""}
116 |                 `}
117 |                 onClick={() => onSelectCity({ id: city.id, name: city.name })}
118 |               >
119 |                 {/* Іконка */}
120 |                 <div
121 |                   className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${ICON_COLORS[index % ICON_COLORS.length]}`}
122 |                 >
123 |                   {CITY_ICONS[city.name] || DEFAULT_CITY_ICON}
124 |                 </div>
125 | 
126 |                 {/* Текст */}
127 |                 <div className="flex-1 min-w-0">
128 |                   <p className="font-bold text-slate-800 text-base">
129 |                     {city.name}
130 |                   </p>
131 |                   <p className="text-xs font-medium text-slate-400 mt-0.5">
132 |                     {totalEvents} подій • {city.schoolsCount || 0} шкіл
133 |                   </p>
134 |                 </div>
135 | 
136 |                 {/* Стрілка переходу */}
137 |                 <button
138 |                   onClick={(e) => {
139 |                     e.stopPropagation();
140 |                     navigate(`/cities/${city.id}`);
141 |                   }}
142 |                   className="p-3 text-slate-400 hover:text-blue-600 text-2xl font-light leading-none transition-colors"
143 |                 >
144 |                   ›
145 |                 </button>
146 |               </div>
147 |             );
148 |           })}
149 | 
150 |           {filteredCities.length === 0 && (
151 |             <div className="p-8 text-center text-slate-400 font-medium">
152 |               Міст не знайдено
153 |             </div>
154 |           )}
155 |         </div>
156 |       </div>
157 |     </>
158 |   );
159 | }
160 | 
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
  0 | import React, { useMemo, memo } from "react";
  1 | import {
  2 |   ResponsiveContainer,
  3 |   AreaChart,
  4 |   Area,
  5 |   XAxis,
  6 |   YAxis,
  7 |   CartesianGrid,
  8 |   Tooltip,
  9 |   PieChart,
 10 |   Pie,
 11 |   Cell,
 12 |   BarChart,
 13 |   Bar,
 14 | } from "recharts";
 15 | 
 16 | const PALETTE = [
 17 |   "#3b82f6",
 18 |   "#10b981",
 19 |   "#f59e0b",
 20 |   "#8b5cf6",
 21 |   "#ec4899",
 22 |   "#06b6d4",
 23 | ];
 24 | const PIE_COLORS = [
 25 |   "#3b82f6",
 26 |   "#8b5cf6",
 27 |   "#ec4899",
 28 |   "#f43f5e",
 29 |   "#f59e0b",
 30 |   "#10b981",
 31 |   "#0ea5e9",
 32 | ];
 33 | 
 34 | // Виносимо fmt поза компонент — це чиста функція, не потребує useMemo
 35 | const fmt = (n: number) =>
 36 |   new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
 37 | 
 38 | // ─── Допоміжні компоненти — всі в memo ──────────────────────────────────────
 39 | 
 40 | const KpiCard = memo(function KpiCard({
 41 |   title,
 42 |   value,
 43 |   color,
 44 |   bg,
 45 |   icon,
 46 |   subtitle,
 47 | }: any) {
 48 |   return (
 49 |     <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
 50 |       <div className="flex justify-between items-start mb-4">
 51 |         <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight pr-2">
 52 |           {title}
 53 |         </p>
 54 |         <div
 55 |           className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-sm ${bg}`}
 56 |         >
 57 |           {icon}
 58 |         </div>
 59 |       </div>
 60 |       <div>
 61 |         <p
 62 |           className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${color}`}
 63 |         >
 64 |           {fmt(value)}{" "}
 65 |           <span className="text-sm font-bold text-slate-400 opacity-60">
 66 |             грн
 67 |           </span>
 68 |         </p>
 69 |         {subtitle && (
 70 |           <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 font-medium">
 71 |             {subtitle}
 72 |           </p>
 73 |         )}
 74 |       </div>
 75 |     </div>
 76 |   );
 77 | });
 78 | 
 79 | const EmptyState = memo(function EmptyState() {
 80 |   return (
 81 |     <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-slate-400">
 82 |       <span className="text-3xl mb-3 opacity-50">📂</span>
 83 |       <span className="text-sm font-medium">Немає даних за цей період</span>
 84 |     </div>
 85 |   );
 86 | });
 87 | 
 88 | const EventTable = memo(function EventTable({
 89 |   events,
 90 |   positive,
 91 | }: {
 92 |   events: any[];
 93 |   positive: boolean;
 94 | }) {
 95 |   if (!events || !events.length) return <EmptyState />;
 96 |   return (
 97 |     <table className="w-full text-sm min-w-[300px]">
 98 |       <thead>
 99 |         <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
100 |           <th className="text-left pb-3 font-semibold tracking-wider">Дата</th>
101 |           <th className="text-left pb-3 font-semibold tracking-wider">
102 |             Заклад
103 |           </th>
104 |           <th className="text-right pb-3 font-semibold tracking-wider">
105 |             Прибуток
106 |           </th>
107 |         </tr>
108 |       </thead>
109 |       <tbody>
110 |         {events.map((e: any, i: number) => (
111 |           <tr
112 |             key={i}
113 |             className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
114 |           >
115 |             <td className="py-3 text-slate-500 whitespace-nowrap">
116 |               {new Date(e.date).toLocaleDateString("uk-UA", {
117 |                 day: "2-digit",
118 |                 month: "2-digit",
119 |               })}
120 |             </td>
121 |             <td className="py-3 font-medium text-slate-700 truncate max-w-[120px] sm:max-w-[200px] pr-2">
122 |               {e.school}
123 |             </td>
124 |             <td
125 |               className={`py-3 text-right font-bold whitespace-nowrap ${
126 |                 positive ? "text-emerald-600" : "text-rose-500"
127 |               }`}
128 |             >
129 |               {fmt(e.profit)} грн
130 |             </td>
131 |           </tr>
132 |         ))}
133 |       </tbody>
134 |     </table>
135 |   );
136 | });
137 | 
138 | const CustomTooltip = memo(function CustomTooltip({
139 |   active,
140 |   payload,
141 |   label,
142 | }: any) {
143 |   if (!active || !payload?.length) return null;
144 |   return (
145 |     <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
146 |       <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
147 |         {label}
148 |       </p>
149 |       {payload.map((entry: any, index: number) => (
150 |         <div
151 |           key={index}
152 |           className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
153 |         >
154 |           <div className="flex items-center gap-2">
155 |             <div
156 |               className="w-2.5 h-2.5 rounded-full shadow-sm"
157 |               style={{ backgroundColor: entry.color }}
158 |             />
159 |             <span className="text-slate-500">{entry.name}:</span>
160 |           </div>
161 |           <span className="font-bold text-slate-800">
162 |             {fmt(entry.value)} грн
163 |           </span>
164 |         </div>
165 |       ))}
166 |     </div>
167 |   );
168 | });
169 | 
170 | // ─── Підкомпоненти графіків — кожен в memo ───────────────────────────────────
171 | 
172 | const RevenueChart = memo(function RevenueChart({
173 |   monthly,
174 | }: {
175 |   monthly: any[];
176 | }) {
177 |   if (!monthly?.length) return <EmptyState />;
178 |   // Обмежуємо до останніх 12 місяців — менше точок = швидший рендер SVG
179 |   const data = monthly.slice(-12);
180 |   return (
181 |     <ResponsiveContainer width="100%" height="100%">
182 |       <AreaChart
183 |         data={data}
184 |         margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
185 |       >
186 |         <defs>
187 |           <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
188 |             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
189 |             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
190 |           </linearGradient>
191 |           <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
192 |             <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
193 |             <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
194 |           </linearGradient>
195 |         </defs>
196 |         <CartesianGrid
197 |           strokeDasharray="3 3"
198 |           vertical={false}
199 |           stroke="#f1f5f9"
200 |         />
201 |         <XAxis
202 |           dataKey="month"
203 |           tick={{ fontSize: 12, fill: "#64748b" }}
204 |           axisLine={false}
205 |           tickLine={false}
206 |           dy={10}
207 |           minTickGap={20}
208 |         />
209 |         <YAxis
210 |           tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
211 |           tick={{ fontSize: 12, fill: "#64748b" }}
212 |           axisLine={false}
213 |           tickLine={false}
214 |         />
215 |         <Tooltip
216 |           content={<CustomTooltip />}
217 |           cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
218 |         />
219 |         <Area
220 |           type="monotone"
221 |           name="Виручка"
222 |           dataKey="revenue"
223 |           stroke="#3b82f6"
224 |           strokeWidth={3}
225 |           fill="url(#colorRevenue)"
226 |           activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
227 |           isAnimationActive={false}
228 |         />
229 |         <Area
230 |           type="monotone"
231 |           name="Прибуток"
232 |           dataKey="profit"
233 |           stroke="#10b981"
234 |           strokeWidth={3}
235 |           fill="url(#colorProfit)"
236 |           activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
237 |           isAnimationActive={false}
238 |         />
239 |       </AreaChart>
240 |     </ResponsiveContainer>
241 |   );
242 | });
243 | 
244 | const ProjectPieChart = memo(function ProjectPieChart({
245 |   byProject,
246 |   projectTotals,
247 | }: {
248 |   byProject: any[];
249 |   projectTotals: { total: number; percents: number[] };
250 | }) {
251 |   if (!byProject?.length) return <EmptyState />;
252 |   return (
253 |     <>
254 |       <div className="h-[200px] md:h-[220px] w-full relative mb-6 shrink-0">
255 |         <ResponsiveContainer width="100%" height="100%">
256 |           <PieChart>
257 |             <Pie
258 |               data={byProject}
259 |               dataKey="value"
260 |               nameKey="name"
261 |               innerRadius={60}
262 |               outerRadius={85}
263 |               paddingAngle={3}
264 |               stroke="none"
265 |               isAnimationActive={false}
266 |             >
267 |               {byProject.map((_: any, index: number) => (
268 |                 <Cell
269 |                   key={`cell-${index}`}
270 |                   fill={PIE_COLORS[index % PIE_COLORS.length]}
271 |                 />
272 |               ))}
273 |             </Pie>
274 |             <Tooltip content={<CustomTooltip />} />
275 |           </PieChart>
276 |         </ResponsiveContainer>
277 |       </div>
278 |       <div className="flex-1 overflow-y-auto space-y-3 pr-2">
279 |         {byProject.map((item: any, idx: number) => (
280 |           <div key={idx} className="flex items-center justify-between text-sm">
281 |             <div className="flex items-center gap-3 min-w-0 pr-2">
282 |               <div
283 |                 className="w-3 h-3 rounded-full shrink-0"
284 |                 style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
285 |               />
286 |               <span className="text-slate-600 truncate font-medium">
287 |                 {item.name}
288 |               </span>
289 |             </div>
290 |             <div className="flex items-center gap-3 shrink-0">
291 |               <span className="text-xs text-slate-400 font-medium w-8 text-right">
292 |                 {projectTotals.percents[idx]}%
293 |               </span>
294 |               <span className="font-bold text-slate-800 w-20 text-right">
295 |                 {fmt(item.value)}
296 |               </span>
297 |             </div>
298 |           </div>
299 |         ))}
300 |       </div>
301 |     </>
302 |   );
303 | });
304 | 
305 | const ExpenseChart = memo(function ExpenseChart({
306 |   byExpenseCategory,
307 | }: {
308 |   byExpenseCategory: any[];
309 | }) {
310 |   if (!byExpenseCategory?.length) return <EmptyState />;
311 |   return (
312 |     <div className="h-[280px] w-full min-w-[300px] -ml-4">
313 |       <ResponsiveContainer width="100%" height="100%">
314 |         <BarChart
315 |           data={byExpenseCategory}
316 |           layout="vertical"
317 |           margin={{ top: 0, right: 20, left: 30, bottom: 0 }}
318 |         >
319 |           <CartesianGrid
320 |             strokeDasharray="3 3"
321 |             horizontal={true}
322 |             vertical={false}
323 |             stroke="#f1f5f9"
324 |           />
325 |           <XAxis type="number" hide />
326 |           <YAxis
327 |             dataKey="name"
328 |             type="category"
329 |             axisLine={false}
330 |             tickLine={false}
331 |             tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
332 |             width={120}
333 |           />
334 |           <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
335 |           <Bar
336 |             dataKey="value"
337 |             name="Сума"
338 |             fill="#f43f5e"
339 |             radius={[0, 8, 8, 0]}
340 |             barSize={20}
341 |             isAnimationActive={false}
342 |           >
343 |             {byExpenseCategory.map((_: any, idx: number) => (
344 |               <Cell key={`cell-${idx}`} fill={PALETTE[idx % PALETTE.length]} />
345 |             ))}
346 |           </Bar>
347 |         </BarChart>
348 |       </ResponsiveContainer>
349 |     </div>
350 |   );
351 | });
352 | 
353 | const TopSchools = memo(function TopSchools({
354 |   topSchools,
355 | }: {
356 |   topSchools: any[];
357 | }) {
358 |   if (!topSchools?.length) return <EmptyState />;
359 |   const maxRev = topSchools[0].revenue;
360 |   return (
361 |     <div className="space-y-5">
362 |       {topSchools.map((school: any, idx: number) => {
363 |         const percent = Math.max((school.revenue / maxRev) * 100, 2);
364 |         return (
365 |           <div key={idx} className="relative">
366 |             <div className="flex justify-between items-end mb-2 text-sm">
367 |               <div className="flex items-center gap-2 min-w-0 pr-4">
368 |                 <span className="font-bold text-slate-400 w-4">{idx + 1}.</span>
369 |                 <span className="font-bold text-slate-700 truncate">
370 |                   {school.name}
371 |                 </span>
372 |               </div>
373 |               <span className="font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
374 |                 {fmt(school.revenue)} грн
375 |               </span>
376 |             </div>
377 |             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
378 |               <div
379 |                 className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
380 |                 style={{ width: `${percent}%` }}
381 |               />
382 |             </div>
383 |           </div>
384 |         );
385 |       })}
386 |     </div>
387 |   );
388 | });
389 | 
390 | // ─── Пропси FinanceCharts ────────────────────────────────────────────────────
391 | 
392 | interface Props {
393 |   data: any;
394 |   period: string;
395 |   setPeriod: (v: string) => void;
396 |   projectFilter: string;
397 |   setProjectFilter: (v: string) => void;
398 |   selectedCity: any;
399 | }
400 | 
401 | // ─── Головний компонент ──────────────────────────────────────────────────────
402 | 
403 | export default memo(function FinanceCharts({
404 |   data,
405 |   period,
406 |   setPeriod,
407 |   projectFilter,
408 |   setProjectFilter,
409 |   selectedCity,
410 | }: Props) {
411 |   const {
412 |     kpi,
413 |     monthly,
414 |     byProject,
415 |     byExpenseCategory,
416 |     topSchools,
417 |     topEvents,
418 |     worstEvents,
419 |     expectedRevenue,
420 |     filters,
421 |   } = data;
422 | 
423 |   // useMemo — відсотки для pie chart, щоб не рахувати total в кожній ітерації рендеру
424 |   const projectTotals = useMemo(() => {
425 |     const total =
426 |       byProject?.reduce((sum: number, p: any) => sum + p.value, 0) ?? 0;
427 |     const percents = (byProject ?? []).map((item: any) =>
428 |       total > 0 ? Math.round((item.value / total) * 100) : 0,
429 |     );
430 |     return { total, percents };
431 |   }, [byProject]);
432 | 
433 |   return (
434 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans overflow-x-hidden">
435 |       {/* Шапка та фільтри */}
436 |       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
437 |         <div>
438 |           <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
439 |             Фінанси
440 |           </h1>
441 |           <p className="text-slate-500 text-sm mt-1">
442 |             Аналітика доходів та витрат{" "}
443 |             {selectedCity.id ? (
444 |               <span className="font-medium text-blue-600">
445 |                 {selectedCity.name}
446 |               </span>
447 |             ) : (
448 |               "по всіх містах"
449 |             )}
450 |           </p>
451 |         </div>
452 |         <div className="flex flex-wrap items-center gap-3">
453 |           <select
454 |             value={period}
455 |             onChange={(e) => setPeriod(e.target.value)}
456 |             className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
457 |           >
458 |             <option value="all">За весь час</option>
459 |             <option value="year">Цей рік</option>
460 |             <option value="quarter">Цей квартал</option>
461 |             <option value="month">Цей місяць</option>
462 |           </select>
463 | 
464 |           <select
465 |             value={projectFilter}
466 |             onChange={(e) => setProjectFilter(e.target.value)}
467 |             className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
468 |           >
469 |             <option value="">Всі проєкти</option>
470 |             {filters?.projects?.map((p: string) => (
471 |               <option key={p} value={p}>
472 |                 {p}
473 |               </option>
474 |             ))}
475 |           </select>
476 |         </div>
477 |       </div>
478 | 
479 |       {/* KPI Картки */}
480 |       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
481 |         <KpiCard
482 |           title="Загальна виручка"
483 |           value={kpi.totalRevenue}
484 |           color="text-blue-600"
485 |           bg="bg-blue-50"
486 |           icon="💰"
487 |         />
488 |         <KpiCard
489 |           title="Чистий прибуток"
490 |           value={kpi.totalProfit}
491 |           color="text-emerald-600"
492 |           bg="bg-emerald-50"
493 |           icon="📈"
494 |         />
495 |         <KpiCard
496 |           title="Витрати"
497 |           value={kpi.totalExpenses}
498 |           color="text-rose-600"
499 |           bg="bg-rose-50"
500 |           icon="📉"
501 |         />
502 |         <KpiCard
503 |           title="Очікувана виручка"
504 |           value={expectedRevenue}
505 |           color="text-amber-500"
506 |           bg="bg-amber-50"
507 |           icon="⏳"
508 |           subtitle="Із запланованих подій"
509 |         />
510 |       </div>
511 | 
512 |       {/* Верхній ряд графіків */}
513 |       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
514 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 xl:col-span-2">
515 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
516 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
517 |               📊
518 |             </span>
519 |             Динаміка виручки та прибутку
520 |           </h3>
521 |           <div className="h-[280px] md:h-[320px] w-full -ml-4 sm:ml-0">
522 |             <RevenueChart monthly={monthly} />
523 |           </div>
524 |         </div>
525 | 
526 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 flex flex-col">
527 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
528 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
529 |               🎯
530 |             </span>
531 |             Доходи за проєктами
532 |           </h3>
533 |           <ProjectPieChart
534 |             byProject={byProject}
535 |             projectTotals={projectTotals}
536 |           />
537 |         </div>
538 |       </div>
539 | 
540 |       {/* Нижній ряд */}
541 |       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
542 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
543 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
544 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
545 |               💳
546 |             </span>
547 |             Статті витрат
548 |           </h3>
549 |           <ExpenseChart byExpenseCategory={byExpenseCategory} />
550 |         </div>
551 | 
552 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7">
553 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
554 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
555 |               🏫
556 |             </span>
557 |             Топ-5 найприбутковіших закладів
558 |           </h3>
559 |           <TopSchools topSchools={topSchools} />
560 |         </div>
561 |       </div>
562 | 
563 |       {/* Найкращі і найгірші події */}
564 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
565 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
566 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
567 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
568 |               🏆
569 |             </span>
570 |             Найприбутковіші події
571 |           </h3>
572 |           <EventTable events={topEvents} positive={true} />
573 |         </div>
574 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
575 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
576 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
577 |               ⚠️
578 |             </span>
579 |             Найменш прибуткові події
580 |           </h3>
581 |           <EventTable events={worstEvents} positive={false} />
582 |         </div>
583 |       </div>
584 |     </div>
585 |   );
586 | });
587 | 
```

### File: apps/frontend/src/components/finance/StaffFinanceView.tsx
```tsx
  0 | import { useState, useEffect, useMemo, memo } from "react";
  1 | import { api } from "../../config/api";
  2 | 
  3 | // Поза компонентом — не потребує useMemo
  4 | const fmt = (n: number) =>
  5 |   new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
  6 | 
  7 | const PERIOD_LABELS: Record<string, string> = {
  8 |   year: "Цей рік",
  9 |   quarter: "Цей квартал",
 10 |   month: "Цей місяць",
 11 |   all: "За весь час",
 12 | };
 13 | 
 14 | interface Props {
 15 |   myBalance: number | null;
 16 |   selectedCity: any;
 17 | }
 18 | 
 19 | // ─── Підкомпоненти ────────────────────────────────────────────────────────────
 20 | 
 21 | const BalanceCard = memo(function BalanceCard({
 22 |   myBalance,
 23 | }: {
 24 |   myBalance: number | null;
 25 | }) {
 26 |   return (
 27 |     <div className="flex items-center justify-center py-10">
 28 |       <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-10 text-center max-w-sm w-full">
 29 |         <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-4">
 30 |           💰
 31 |         </div>
 32 |         <p className="text-sm text-slate-400 mb-2">Ваш баланс</p>
 33 |         <p className="text-4xl font-black text-blue-600 tracking-tight">
 34 |           {myBalance !== null ? fmt(myBalance) : "—"}
 35 |           <span className="text-lg font-bold text-slate-400 ml-1">грн</span>
 36 |         </p>
 37 |         <p className="text-xs text-slate-400 mt-4">
 38 |           Сума нарахованих зарплат за всі події
 39 |         </p>
 40 |       </div>
 41 |     </div>
 42 |   );
 43 | });
 44 | 
 45 | interface StaffMemberProps {
 46 |   member: any;
 47 |   index: number;
 48 |   maxRevenue: number;
 49 | }
 50 | 
 51 | const StaffMemberRow = memo(function StaffMemberRow({
 52 |   member,
 53 |   index,
 54 |   maxRevenue,
 55 | }: StaffMemberProps) {
 56 |   const pct = Math.round((member.revenue / maxRevenue) * 100);
 57 |   const isTop = index === 0;
 58 |   return (
 59 |     <div>
 60 |       <div className="flex items-center justify-between mb-1.5">
 61 |         <div className="flex items-center gap-2">
 62 |           <span
 63 |             className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
 64 |               isTop
 65 |                 ? "bg-amber-100 text-amber-700"
 66 |                 : "bg-slate-100 text-slate-500"
 67 |             }`}
 68 |           >
 69 |             {index + 1}
 70 |           </span>
 71 |           <span className="text-sm font-semibold text-slate-800">
 72 |             {member.name}
 73 |           </span>
 74 |           {isTop && (
 75 |             <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
 76 |               🏆 Топ
 77 |             </span>
 78 |           )}
 79 |         </div>
 80 |         <div className="text-right">
 81 |           <p className="text-sm font-bold text-slate-800">
 82 |             {fmt(member.revenue)} грн
 83 |           </p>
 84 |           <p className="text-xs text-slate-400">{member.eventsCount} подій</p>
 85 |         </div>
 86 |       </div>
 87 |       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
 88 |         <div
 89 |           className={`h-full rounded-full transition-all duration-500 ${
 90 |             isTop ? "bg-amber-400" : "bg-blue-400"
 91 |           }`}
 92 |           style={{ width: `${pct}%` }}
 93 |         />
 94 |       </div>
 95 |     </div>
 96 |   );
 97 | });
 98 | 
 99 | // ─── Головний компонент ───────────────────────────────────────────────────────
100 | 
101 | export default memo(function StaffFinanceView({
102 |   myBalance,
103 |   selectedCity,
104 | }: Props) {
105 |   const [tab, setTab] = useState<"balance" | "revenue">("balance");
106 |   const [period, setPeriod] = useState("year");
107 |   const [staffData, setStaffData] = useState<any>(null);
108 |   const [loadingStaff, setLoadingStaff] = useState(false);
109 | 
110 |   useEffect(() => {
111 |     if (tab !== "revenue") return;
112 |     setLoadingStaff(true);
113 |     const params = new URLSearchParams();
114 |     if (period) params.set("period", period);
115 |     if (selectedCity?.id) params.set("cityId", selectedCity.id);
116 |     api
117 |       .get(`/finance/staff-revenue?${params}`)
118 |       .then((r) => setStaffData(r.data))
119 |       .catch(() => {})
120 |       .finally(() => setLoadingStaff(false));
121 |   }, [tab, period, selectedCity?.id]);
122 | 
123 |   const maxRevenue = staffData?.staff?.[0]?.revenue ?? 1;
124 | 
125 |   // useMemo — розбивка по ролях, щоб не фільтрувати в рендері
126 |   const staffByRole = useMemo(() => {
127 |     if (!staffData?.staff) return { hosts: [], drivers: [] };
128 |     return {
129 |       hosts: staffData.staff.filter((s: any) => s.role === "HOST"),
130 |       drivers: staffData.staff.filter((s: any) => s.role === "DRIVER"),
131 |     };
132 |   }, [staffData]);
133 | 
134 |   return (
135 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
136 |       <h1 className="text-2xl font-bold text-slate-800 mb-6">Фінанси</h1>
137 | 
138 |       {/* Вкладки */}
139 |       <div className="flex gap-2 mb-6">
140 |         <button
141 |           onClick={() => setTab("balance")}
142 |           className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
143 |             tab === "balance"
144 |               ? "bg-blue-600 text-white shadow-sm"
145 |               : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
146 |           }`}
147 |         >
148 |           💰 Мій баланс
149 |         </button>
150 |         <button
151 |           onClick={() => setTab("revenue")}
152 |           className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
153 |             tab === "revenue"
154 |               ? "bg-blue-600 text-white shadow-sm"
155 |               : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
156 |           }`}
157 |         >
158 |           📊 Виручка команди
159 |         </button>
160 |       </div>
161 | 
162 |       {tab === "balance" && <BalanceCard myBalance={myBalance} />}
163 | 
164 |       {tab === "revenue" && (
165 |         <div className="flex flex-col gap-5">
166 |           <div className="flex items-center gap-3">
167 |             <select
168 |               value={period}
169 |               onChange={(e) => setPeriod(e.target.value)}
170 |               className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none shadow-sm"
171 |             >
172 |               <option value="year">Цей рік</option>
173 |               <option value="quarter">Цей квартал</option>
174 |               <option value="month">Цей місяць</option>
175 |               <option value="all">За весь час</option>
176 |             </select>
177 |             {selectedCity?.name && (
178 |               <span className="text-sm text-slate-500">
179 |                 📍 {selectedCity.name}
180 |               </span>
181 |             )}
182 |           </div>
183 | 
184 |           {loadingStaff ? (
185 |             <div className="flex items-center justify-center py-16">
186 |               <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
187 |             </div>
188 |           ) : !staffData || staffData.staff.length === 0 ? (
189 |             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
190 |               <p className="text-3xl mb-3">📊</p>
191 |               <p>Немає даних за обраний період</p>
192 |             </div>
193 |           ) : (
194 |             <>
195 |               <div className="grid grid-cols-2 gap-4">
196 |                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
197 |                   <p className="text-xs text-slate-400 mb-1">
198 |                     Загальна виручка
199 |                   </p>
200 |                   <p className="text-2xl font-black text-blue-600">
201 |                     {fmt(staffData.totalRevenue)}{" "}
202 |                     <span className="text-sm font-medium text-slate-400">
203 |                       грн
204 |                     </span>
205 |                   </p>
206 |                   <p className="text-xs text-slate-400 mt-1">
207 |                     {PERIOD_LABELS[period]}
208 |                   </p>
209 |                 </div>
210 |                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
211 |                   <p className="text-xs text-slate-400 mb-1">Подій проведено</p>
212 |                   <p className="text-2xl font-black text-slate-800">
213 |                     {staffData.eventsCount}
214 |                   </p>
215 |                   <p className="text-xs text-slate-400 mt-1">
216 |                     {PERIOD_LABELS[period]}
217 |                   </p>
218 |                 </div>
219 |               </div>
220 | 
221 |               {(
222 |                 [
223 |                   {
224 |                     key: "HOST",
225 |                     label: "🎙️ Ведучі",
226 |                     members: staffByRole.hosts,
227 |                   },
228 |                   {
229 |                     key: "DRIVER",
230 |                     label: "🚗 Водії",
231 |                     members: staffByRole.drivers,
232 |                   },
233 |                 ] as const
234 |               ).map(({ key, label, members }) => {
235 |                 if (members.length === 0) return null;
236 |                 return (
237 |                   <div
238 |                     key={key}
239 |                     className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
240 |                   >
241 |                     <h3 className="font-bold text-slate-800 mb-4">{label}</h3>
242 |                     <div className="flex flex-col gap-4">
243 |                       {members.map((member: any, i: number) => (
244 |                         <StaffMemberRow
245 |                           key={member.id}
246 |                           member={member}
247 |                           index={i}
248 |                           maxRevenue={maxRevenue}
249 |                         />
250 |                       ))}
251 |                     </div>
252 |                   </div>
253 |                 );
254 |               })}
255 |             </>
256 |           )}
257 |         </div>
258 |       )}
259 |     </div>
260 |   );
261 | });
262 | 
```

### File: apps/frontend/src/components/school-profile/AssignedCrew.tsx
```tsx
  0 | import { memo } from 'react';
  1 | import PhoneLink from '../PhoneLink';
  2 | import { motion } from "framer-motion";
  3 | 
  4 | interface AssignedCrewProps {
  5 |   currentEvent: any;
  6 |   employees: any[];
  7 | }
  8 | 
  9 | export default memo(function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
 10 |   const crew = currentEvent?.crew;
 11 | 
 12 |   if (!crew) {
 13 |     return (
 14 | <motion.div
 15 |       whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
 16 |       transition={{ duration: 0.2 }}
 17 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full text-slate-400 min-h-[250px]"
 18 |     >        <span className="text-4xl mb-3 opacity-50">🚐</span>
 19 |         <p className="font-medium">Екіпаж ще не призначено</p>
 20 |         <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
 21 |       </motion.div>
 22 |     );
 23 |   }
 24 | 
 25 |   // Знаходимо працівників по їхніх ID, збережених у екіпажі
 26 |   const host = (employees ?? []).find(e => e.id === crew.hostId);
 27 |   const driver = (employees ?? []).find(e => e.id === crew.driverId);
 28 | 
 29 |   return (
 30 |     <motion.div
 31 |       whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
 32 |       transition={{ duration: 0.2 }}
 33 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col"
 34 |     >
 35 |       <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Призначений екіпаж</h3>
 36 |       <div className="space-y-4 text-sm flex-1">
 37 |         <div className="flex justify-between items-center">
 38 |           <span className="text-slate-500">Назва:</span>
 39 |           <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{crew.name || 'Екіпаж'}</span>
 40 |         </div>
 41 |         <div className="flex justify-between items-center">
 42 |           <span className="text-slate-500">Ведучий:</span>
 43 |           <span className="font-medium text-blue-600 flex items-center gap-2">
 44 |             <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🎙️</span>
 45 |             {host?.name || '—'} 
 46 |           </span>
 47 |         </div>
 48 |         <div className="flex justify-between items-center">
 49 |           <span className="text-slate-500">Водій:</span>
 50 |           <span className="font-medium text-emerald-600 flex items-center gap-2">
 51 |             <span className="bg-emerald-100 text-emerald-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🚗</span>
 52 |             {driver?.name || '—'}
 53 |           </span>
 54 |         </div>
 55 |         <div className="flex justify-between items-center">
 56 |           <span className="text-slate-500">Авто:</span>
 57 |           <span className="font-medium">{crew.car || '—'}</span>
 58 |         </div>
 59 |         <div className="flex justify-between items-center">
 60 |           <span className="text-slate-500">Телефон:</span>
 61 |           <span className="font-medium"><PhoneLink phone={crew.phone} /></span>
 62 |         </div>
 63 |       </div>
 64 |     </motion.div>
 65 |   );
 66 | });
 67 | 
```

### File: apps/frontend/src/components/school-profile/EventDetails.tsx
```tsx
  0 | import { useState } from 'react';
  1 | import { motion } from 'framer-motion';
  2 | import AddressLink from "../AddressLink";
  3 | import PhoneLink from "../PhoneLink";
  4 | import IssueModal from "./modals/IssueModal";
  5 | import RescheduleModal from "./modals/RescheduleModal";
  6 | 
  7 | interface EventDetailsProps {
  8 |   currentEvent: any;
  9 |   schoolName?: string;
 10 |   cityId?: string;
 11 |   onEventUpdated?: () => void;
 12 |   employees?: any[];
 13 | }
 14 | 
 15 | export default function EventDetails({ currentEvent, schoolName, cityId, onEventUpdated, employees }: EventDetailsProps) {
 16 |   const [issueOpen, setIssueOpen] = useState(false);
 17 |   const [rescheduleOpen, setRescheduleOpen] = useState(false);
 18 | 
 19 |   if (!currentEvent) {
 20 |     return (
 21 |       <motion.div
 22 |         initial={{ opacity: 0 }}
 23 |         animate={{ opacity: 1 }}
 24 |         className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400"
 25 |       >
 26 |         У цього закладу ще немає запланованих подій.
 27 |       </motion.div>
 28 |     );
 29 |   }
 30 | 
 31 |   const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');
 32 | 
 33 |   return (
 34 |     <>
 35 |       <motion.div
 36 |         whileHover={{ y: -3, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.09)" }}
 37 |         transition={{ duration: 0.2 }}
 38 |         className="bg-white rounded-2xl shadow-sm border border-slate-100 md:border-l-4 md:border-l-blue-600 relative"
 39 |       >
 40 |         <div className="p-5 sm:p-6 pl-6 sm:pl-6">
 41 |           
 42 |           {/* Заголовок */}
 43 |           <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-slate-100 md:pb-4">
 44 |             <h3 className="font-bold text-slate-800 text-lg">Деталі події</h3>
 45 |             {/* Дата для мобільних (щоб була під заголовком) */}
 46 |             <span className="md:hidden text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
 47 |               {formattedDate}
 48 |             </span>
 49 |           </div>
 50 | 
 51 |           {/* ВЕЛИКІ МОБІЛЬНІ КНОПКИ (Відображаються тільки на телефоні) */}
 52 |           <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-slate-100 pb-5 mt-3">
 53 |             <button 
 54 |               onClick={() => setRescheduleOpen(true)} 
 55 |               className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 text-amber-600 rounded-2xl font-bold border border-amber-100/50 active:bg-amber-100 transition-colors shadow-sm"
 56 |             >
 57 |               <span className="text-2xl">📅</span>
 58 |               <span className="text-[11px] uppercase tracking-wider">Перенести</span>
 59 |             </button>
 60 |             <button 
 61 |               onClick={() => setIssueOpen(true)} 
 62 |               className="flex flex-col items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100/50 active:bg-red-100 transition-colors shadow-sm"
 63 |             >
 64 |               <span className="text-2xl">🚨</span>
 65 |               <span className="text-[11px] uppercase tracking-wider">Проблема</span>
 66 |             </button>
 67 |           </div>
 68 | 
 69 |           {/* ДЕСКТОПНІ КНОПКИ (Відображаються тільки на ПК) */}
 70 |           <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
 71 |             <span className="text-sm font-medium text-blue-600 mr-2">{formattedDate}</span>
 72 |             <button
 73 |               onClick={() => setRescheduleOpen(true)}
 74 |               className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
 75 |             >
 76 |               📅 Перенести
 77 |             </button>
 78 |             <button
 79 |               onClick={() => setIssueOpen(true)}
 80 |               className="px-3 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
 81 |             >
 82 |               🚨 Проблема
 83 |             </button>
 84 |           </div>
 85 | 
 86 |           {/* Інформація */}
 87 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
 88 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 89 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Проєкт:</span>
 90 |               <span className="font-bold text-slate-800">{currentEvent.project}</span>
 91 |             </div>
 92 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 93 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Час початку:</span>
 94 |               <span className="font-bold text-slate-800">{currentEvent.time}</span>
 95 |             </div>
 96 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 97 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Кількість дітей:</span>
 98 |               <span className="font-bold text-slate-800">{currentEvent.childrenPlanned}</span>
 99 |             </div>
100 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
101 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Вартість:</span>
102 |               <span className="font-bold text-slate-800">{currentEvent.price} грн</span>
103 |             </div>
104 |             <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
105 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Адреса:</span>
106 |               <span className="font-bold text-slate-800 flex items-start gap-1.5 leading-snug">
107 |                  <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
108 |                  <AddressLink address={currentEvent.address} />
109 |               </span>
110 |             </div>
111 |             <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
112 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Контакт:</span>
113 |               <span className="font-bold text-slate-800 flex flex-col gap-1 leading-snug">
114 |                 <span>{currentEvent.contactPerson}</span>
115 |                 <span className="w-6 border-b-2 border-slate-200 my-0.5"></span>
116 |                 <PhoneLink phone={currentEvent.contactPhone} />
117 |               </span>
118 |             </div>
119 |           </div>
120 |         </div>
121 |       </motion.div>
122 | 
123 |       <IssueModal
124 |         isOpen={issueOpen}
125 |         onClose={() => setIssueOpen(false)}
126 |         schoolName={schoolName || currentEvent.school?.name || ''}
127 |         eventName={`${currentEvent.project} — ${formattedDate}`}
128 |         eventId={currentEvent.id}
129 |         cityId={cityId || currentEvent.cityId || ''}
130 |         employees={employees}
131 |       />
132 |       <RescheduleModal
133 |         isOpen={rescheduleOpen}
134 |         onClose={() => setRescheduleOpen(false)}
135 |         eventId={currentEvent.id}
136 |         currentDate={currentEvent.date}
137 |         currentTime={currentEvent.time || ''}
138 |         onSuccess={() => onEventUpdated?.()}
139 |       />
140 |     </>
141 |   );
142 | }
```

### File: apps/frontend/src/components/school-profile/EventPreparation.tsx
```tsx
  0 | 
  1 | import { memo, useState } from 'react';
  2 | import { motion, AnimatePresence } from 'framer-motion';
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
 17 | export default memo(function EventPreparation({ data, onUpdate, onOpenCrewModal }: PreparationProps) {
 18 |   const [optimistic, setOptimistic] = useState<Record<string, string>>({});
 19 | 
 20 |   const tasks = [
 21 |     { key: 'assignCrew', label: 'Призначити екіпаж' },
 22 |     { key: 'bookEquipment', label: 'Забронювати обладнання' },
 23 |     { key: 'prepareDocs', label: 'Підготувати документи' },
 24 |     { key: 'prepareMaterials', label: 'Підготувати матеріали' },
 25 |     { key: 'remindSchool', label: 'Нагадати школі про подію' },
 26 |   ];
 27 | 
 28 |   const getStatusColor = (status: string) => {
 29 |     switch (status) {
 30 |       case 'Виконано': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
 31 |       case 'В процесі': return 'bg-orange-50 text-orange-600 border border-orange-200';
 32 |       default: return 'bg-blue-50 text-blue-600 border border-blue-200';
 33 |     }
 34 |   };
 35 | 
 36 |   const handleTaskClick = (key: string) => {
 37 |     if (key === 'assignCrew') {
 38 |       onOpenCrewModal();
 39 |     } else {
 40 |       const next = getNextStatus(optimistic[key] ?? data[key]);
 41 |       setOptimistic(prev => ({ ...prev, [key]: next }));
 42 |       onUpdate(key, next).catch(() => {
 43 |         setOptimistic(prev => ({ ...prev, [key]: data[key] }));
 44 |       });
 45 |     }
 46 |   };
 47 | 
 48 |   return (
 49 |     <motion.div
 50 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 51 |       transition={{ duration: 0.2 }}
 52 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
 53 |     >
 54 |       <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Підготовка до події</h3>
 55 |       <div className="space-y-3 text-sm">
 56 |         {tasks.map((task) => {
 57 |           const currentStatus = optimistic[task.key] ?? data[task.key] ?? 'Заплановано';
 58 |           return (
 59 |             <motion.div
 60 |               key={task.key}
 61 |               whileTap={{ scale: 0.98 }}
 62 |               className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
 63 |               onClick={() => handleTaskClick(task.key)}
 64 |             >
 65 |               <span className="text-slate-700 font-medium select-none">{task.label}</span>
 66 |               <AnimatePresence mode="wait">
 67 |                 <motion.span
 68 |                   key={currentStatus}
 69 |                   initial={{ opacity: 0, scale: 0.85 }}
 70 |                   animate={{ opacity: 1, scale: 1 }}
 71 |                   exit={{ opacity: 0, scale: 0.85 }}
 72 |                   transition={{ duration: 0.15 }}
 73 |                   className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
 74 |                 >
 75 |                   {currentStatus}
 76 |                 </motion.span>
 77 |               </AnimatePresence>
 78 |             </motion.div>
 79 |           );
 80 |         })}
 81 |       </div>
 82 |     </motion.div>
 83 |   );
 84 | });
 85 | 
 86 | 
```

### File: apps/frontend/src/components/school-profile/EventsTable.tsx
```tsx
  0 | 
  1 | 
  2 | import axios from 'axios';
  3 | import { motion, AnimatePresence } from 'framer-motion';
  4 | 
  5 | interface EventsTableProps {
  6 |   events: any[];
  7 |   selectedEventId: string | null;
  8 |   onEventSelect: (id: string) => void;
  9 |   onDeleteSuccess: () => void; // Додаємо колбек для оновлення списку
 10 | }
 11 | 
 12 | export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess }: EventsTableProps) {
 13 |   
 14 |   const handleDelete = async (e: React.MouseEvent, id: string) => {
 15 |     e.stopPropagation(); // Щоб не вибирати подію при кліку на кнопку видалення
 16 |     if (!window.confirm('Видалити цю подію?')) return;
 17 |     
 18 |     try {
 19 |       await axios.delete(`https://crm-57qd.onrender.com/events/${id}`, {
 20 |         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 21 |       });
 22 |       onDeleteSuccess();
 23 |     } catch (error) {
 24 |       console.error('Помилка видалення:', error);
 25 |     }
 26 |   };
 27 | 
 28 |   if (events.length === 0) return null;
 29 | 
 30 |   return (
 31 |     <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-2 w-full">
 32 |       <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
 33 |         <h3 className="font-bold text-slate-800">Всі події ({events.length})</h3>
 34 |       </div>
 35 | 
 36 |       {/* Картки — мобільний вигляд */}
 37 |       <div className="md:hidden divide-y divide-slate-50">
 38 |         <AnimatePresence initial={false}>
 39 |         {events.map((ev, i) => (
 40 |           <motion.div
 41 |             key={ev.id}
 42 |             initial={{ opacity: 0, y: 6 }}
 43 |             animate={{ opacity: 1, y: 0 }}
 44 |             exit={{ opacity: 0, x: -20 }}
 45 |             transition={{ duration: 0.2, delay: i * 0.04 }}
 46 |             onClick={() => onEventSelect(ev.id)}
 47 |             className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'active:bg-slate-50'}`}
 48 |           >
 49 |             <div className="min-w-0">
 50 |               <p className="font-medium text-slate-800">{ev.project}</p>
 51 |               <p className="text-xs text-slate-500 mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
 52 |             </div>
 53 |             <div className="flex items-center gap-2 shrink-0">
 54 |               <span className="font-medium text-sm text-slate-700">{ev.price} грн</span>
 55 |               <button
 56 |                 onClick={(e) => handleDelete(e, ev.id)}
 57 |                 className="text-red-500 active:text-red-700 p-2"
 58 |               >
 59 |                 🗑
 60 |               </button>
 61 |             </div>
 62 |           </motion.div>
 63 |         ))}
 64 |         </AnimatePresence>
 65 |       </div>
 66 | 
 67 |       {/* Таблиця — десктоп */}
 68 |       <div className="hidden md:block overflow-x-auto">
 69 |         <table className="w-full text-left text-sm">
 70 |           <thead>
 71 |             <tr className="bg-white border-b border-slate-100 text-slate-500">
 72 |               <th className="p-4">Дата</th>
 73 |               <th className="p-4">Проєкт</th>
 74 |               <th className="p-4">Вартість</th>
 75 |               <th className="p-4 text-center">Дія</th>
 76 |             </tr>
 77 |           </thead>
 78 |           <tbody>
 79 |             <AnimatePresence initial={false}>
 80 |             {events.map((ev, i) => (
 81 |               <motion.tr
 82 |                 key={ev.id}
 83 |                 initial={{ opacity: 0 }}
 84 |                 animate={{ opacity: 1 }}
 85 |                 exit={{ opacity: 0 }}
 86 |                 transition={{ duration: 0.18, delay: i * 0.03 }}
 87 |                 onClick={() => onEventSelect(ev.id)}
 88 |                 className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
 89 |               >
 90 |                 <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
 91 |                 <td className="p-4">{ev.project}</td>
 92 |                 <td className="p-4">{ev.price} грн</td>
 93 |                 <td className="p-4 text-center">
 94 |                   <button 
 95 |                     onClick={(e) => handleDelete(e, ev.id)}
 96 |                     className="text-red-500 hover:text-red-700 p-2"
 97 |                   >
 98 |                     🗑
 99 |                   </button>
100 |                 </td>
101 |               </motion.tr>
102 |             ))}
103 |             </AnimatePresence>
104 |           </tbody>
105 |         </table>
106 |       </div>
107 |     </div>
108 |   );
109 | }
110 | 
111 | 
112 | 
```

### File: apps/frontend/src/components/school-profile/HistoryTimeline.tsx
```tsx
  0 | import { memo } from "react";
  1 | import { motion, AnimatePresence } from "framer-motion";
  2 | interface HistoryTimelineProps {
  3 |   currentEvent: any;
  4 |   onHistoryClick: (item: any) => void;
  5 |   onAddCommentClick: () => void;
  6 | }
  7 | 
  8 | export default memo(function HistoryTimeline({ currentEvent, onHistoryClick, onAddCommentClick }: HistoryTimelineProps) {
  9 |   return (
 10 |     <motion.div
 11 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 12 |       transition={{ duration: 0.2 }}
 13 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
 14 |     >
 15 |       <div className="flex justify-between items-center mb-5">
 16 |         <h3 className="font-bold text-slate-800">Історія взаємодії</h3>
 17 |         <button 
 18 |           onClick={onAddCommentClick}
 19 |           className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
 20 |         >
 21 |           <span>+</span> Коментар
 22 |         </button>
 23 |       </div>
 24 |       
 25 |       {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
 26 |         <p className="text-sm text-slate-400">Історія порожня.</p>
 27 |       ) : (
 28 |         <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
 29 |           <AnimatePresence initial={false}>
 30 |           {currentEvent.history.map((item: any, i: number) => (
 31 |             <motion.div
 32 |               key={item.id}
 33 |               initial={{ opacity: 0, x: -8 }}
 34 |               animate={{ opacity: 1, x: 0 }}
 35 |               exit={{ opacity: 0, x: -8 }}
 36 |               transition={{ duration: 0.22, delay: i * 0.04 }}
 37 |               onClick={() => onHistoryClick(item)}
 38 |               className="relative pl-8 pr-3 py-2 text-sm hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
 39 |             >
 40 |               <div className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
 41 |               <p className="font-semibold text-slate-800">{item.action}</p>
 42 |               {item.comment && (
 43 |                 <p className="text-slate-600 mt-1.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-sm italic">
 44 |                   "{item.comment}"
 45 |                 </p>
 46 |               )}
 47 |               <p className="text-[11px] text-slate-400 mt-2 flex justify-between items-center font-medium">
 48 |                 <span>
 49 |                   👤 {item.userName} <span className="mx-1">•</span> 
 50 |                   {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
 51 |                 </span>
 52 |                 <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">✏️ Редагувати</span>
 53 |               </p>
 54 |             </motion.div>
 55 |           ))}
 56 |           </AnimatePresence>
 57 |         </div>
 58 |       )}
 59 |     </motion.div>
 60 |   );
 61 | });
 62 | 
```

### File: apps/frontend/src/components/school-profile/Pipeline.tsx
```tsx
  0 | import { memo } from "react";
  1 | import { motion } from "framer-motion";
  2 | interface PipelineProps {
  3 |   currentStageIndex: number;
  4 |   currentEvent: any;
  5 |   onPipelineClick: (stepId: number) => void;
  6 |   stages: Array<{ id: number; key: string; name: string }>;
  7 | }
  8 | 
  9 | export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
 10 |   return (
 11 |     <motion.div
 12 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 13 |       transition={{ duration: 0.2 }}
 14 |       className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 w-full"
 15 |     >
 16 |       <h3 className="font-bold text-slate-800 mb-4 md:hidden">Етап події</h3>
 17 |       <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
 18 |         <div className="flex items-start min-w-[600px] justify-between relative">
 19 |           <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
 20 |           {stages.map((step, index) => {
 21 |             const isCompleted = index < currentStageIndex;
 22 |             const isActive = index === currentStageIndex;
 23 |             const isNext = index === currentStageIndex + 1;
 24 |             const isClickable = !!currentEvent && isNext;
 25 | 
 26 |             return (
 27 |               <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
 28 |                 <motion.button
 29 |                   onClick={() => isClickable && onPipelineClick(step.id)}
 30 |                   whileHover={isClickable ? { scale: 1.15 } : {}}
 31 |                   whileTap={isClickable ? { scale: 0.95 } : {}}
 32 |                   transition={{ duration: 0.15 }}
 33 |                   className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-colors
 34 |                     ${isCompleted
 35 |                       ? 'border-blue-600 text-blue-600 bg-white'
 36 |                       : isActive
 37 |                       ? 'border-blue-600 bg-blue-600 text-white shadow-md'
 38 |                       : isNext
 39 |                       ? 'border-blue-400 bg-white text-blue-400 cursor-pointer'
 40 |                       : 'border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-50'
 41 |                     }`}
 42 |                 >
 43 |                   {isCompleted ? '✓' : step.id}
 44 |                 </motion.button>
 45 |                 <span className={`text-[10px] md:text-[11px] leading-tight font-medium text-center break-words max-w-[70px]
 46 |                   ${isActive ? 'text-blue-600 font-bold' : isNext ? 'text-blue-400' : 'text-slate-400'}`}>
 47 |                   {step.name}
 48 |                 </span>
 49 |               </div>
 50 |             );
 51 |           })}
 52 |         </div>
 53 |       </div>
 54 |     </motion.div>
 55 |   );
 56 | });
 57 | 
```

### File: apps/frontend/src/components/school-profile/SchoolInfoCard.tsx
```tsx
  0 | import { memo } from "react";
  1 | import AddressLink from "../AddressLink";
  2 | import PhoneLink from "../PhoneLink";
  3 | import { motion } from "framer-motion";
  4 | 
  5 | export default memo(function SchoolInfoCard({
  6 |   schoolData,
  7 | }: {
  8 |   schoolData: any;
  9 | }) {
 10 |   return (
 11 |     <motion.div
 12 |       whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
 13 |       transition={{ duration: 0.2 }}
 14 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
 15 |     >
 16 |       <ul className="space-y-4 text-sm">
 17 |         {[
 18 |           { icon: "🏛", label: "Тип", value: schoolData.type || "—" },
 19 |           { icon: "📍", label: "Місто", value: schoolData.city || "—" },
 20 |           {
 21 |             icon: "🗺",
 22 |             label: "Адреса",
 23 |             value: <AddressLink address={schoolData.address} />,
 24 |           },
 25 |           { icon: "👤", label: "Контакт", value: schoolData.director || "—" },
 26 |           {
 27 |             icon: "📞",
 28 |             label: "Телефон",
 29 |             value: <PhoneLink phone={schoolData.phone} />,
 30 |           },
 31 |           { icon: "👥", label: "Дітей", value: schoolData.childrenCount || 0 },
 32 |         ].map(({ icon, label, value }, i) => (
 33 |           <motion.li
 34 |             key={label}
 35 |             initial={{ opacity: 0, x: -6 }}
 36 |             animate={{ opacity: 1, x: 0 }}
 37 |             transition={{ duration: 0.25, delay: i * 0.05 }}
 38 |             className="flex gap-3"
 39 |           >
 40 |             <span className="text-slate-400">{icon}</span>
 41 |             <div>
 42 |               <span className="text-slate-500">{label}:</span>{" "}
 43 |               <span className="font-medium">{value}</span>
 44 |             </div>
 45 |           </motion.li>
 46 |         ))}
 47 |       </ul>
 48 |     </motion.div>
 49 |   );
 50 | });
 51 | 
```

### File: apps/frontend/src/components/school-profile/SchoolProfileHeader.tsx
```tsx
  0 | import { memo } from "react";
  1 | import { Link } from "react-router-dom";
  2 | import { motion } from "framer-motion";
  3 | import PhoneLink from "../PhoneLink";
  4 | 
  5 | interface Props {
  6 |   schoolData: any;
  7 |   onEdit: () => void;
  8 |   onAddEvent: () => void;
  9 | }
 10 | 
 11 | const fadeUp = (delay: number) => ({
 12 |   initial: { opacity: 0, y: 8 },
 13 |   animate: { opacity: 1, y: 0 },
 14 |   transition: { duration: 0.35, delay, ease: "easeOut" },
 15 | });
 16 | 
 17 | export default memo(function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
 18 |   return (
 19 |     <div className="mb-6">
 20 |       {/* Хлібні крихти */}
 21 |       <motion.div {...fadeUp(0)} className="text-xs md:text-sm text-slate-500 mb-5 truncate">
 22 |         <Link to="/schools" className="hover:text-blue-600 transition-colors">
 23 |           Школи / Садочки
 24 |         </Link>
 25 |         <span className="mx-2">›</span>
 26 |         <span className="text-slate-800 font-medium">
 27 |           {schoolData.type} "{schoolData.name}"
 28 |         </span>
 29 |       </motion.div>
 30 | 
 31 |       {/* Hero Card */}
 32 |       <motion.div
 33 |         {...fadeUp(0.05)}
 34 |         className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-2"
 35 |       >
 36 |         {/* Градієнтна смужка зверху */}
 37 |         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
 38 | 
 39 |         <div className="p-5 md:p-7">
 40 |           <div className="flex flex-col md:flex-row md:items-center gap-5">
 41 | 
 42 |             {/* Іконка */}
 43 |             <motion.div
 44 |               initial={{ scale: 0.8, opacity: 0 }}
 45 |               animate={{ scale: 1, opacity: 1 }}
 46 |               transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
 47 |               className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl shrink-0"
 48 |             >
 49 |               🏫
 50 |             </motion.div>
 51 | 
 52 |             {/* Назва + місто */}
 53 |             <div className="flex-1 min-w-0">
 54 |               <motion.h1
 55 |                 {...fadeUp(0.12)}
 56 |                 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight"
 57 |               >
 58 |                 {schoolData.type} «{schoolData.name}»
 59 |               </motion.h1>
 60 |               <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
 61 |                 {schoolData.city && (
 62 |                   <span className="text-sm text-slate-500 flex items-center gap-1">
 63 |                     📍 {schoolData.city}
 64 |                   </span>
 65 |                 )}
 66 |                 {schoolData.director && (
 67 |                   <span className="text-sm text-slate-500 flex items-center gap-1">
 68 |                     👤 {schoolData.director}
 69 |                   </span>
 70 |                 )}
 71 |                 {schoolData.phone && (
 72 |                   <span className="text-sm text-slate-500">
 73 |                     <PhoneLink phone={schoolData.phone} />
 74 |                   </span>
 75 |                 )}
 76 |               </motion.div>
 77 |             </div>
 78 | 
 79 |             {/* Quick Actions — десктоп */}
 80 |             <motion.div {...fadeUp(0.2)} className="hidden md:flex gap-2 shrink-0">
 81 |               <button
 82 |                 onClick={onAddEvent}
 83 |                 className="flex flex-col items-center gap-1 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm text-xs font-semibold"
 84 |               >
 85 |                 <span className="text-lg leading-none">＋</span>
 86 |                 Подія
 87 |               </button>
 88 |               <button
 89 |                 onClick={onEdit}
 90 |                 className="flex flex-col items-center gap-1 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all text-xs font-semibold"
 91 |               >
 92 |                 <span className="text-lg leading-none">✏️</span>
 93 |                 Редагувати
 94 |               </button>
 95 |             </motion.div>
 96 | 
 97 |             {/* Quick Actions — мобіл */}
 98 |             <motion.div {...fadeUp(0.2)} className="md:hidden flex gap-2">
 99 |               <button
100 |                 onClick={onEdit}
101 |                 className="w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-50 active:scale-95 transition-all"
102 |               >
103 |                 ✏️
104 |               </button>
105 |             </motion.div>
106 |           </div>
107 |         </div>
108 |       </motion.div>
109 |     </div>
110 |   );
111 | });
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
  1 | import { createPortal } from 'react-dom';
  2 | import { api } from '../../../config/api';
  3 | 
  4 | interface Employee {
  5 |   id: string;
  6 |   name: string;
  7 |   role: string;
  8 | }
  9 | 
 10 | interface IssueModalProps {
 11 |   isOpen: boolean;
 12 |   onClose: () => void;
 13 |   schoolName: string;
 14 |   eventName: string;
 15 |   eventId: string;
 16 |   cityId: string;
 17 |   employees?: Employee[];
 18 | }
 19 | 
 20 | export default function IssueModal({
 21 |   isOpen, onClose, schoolName, eventName, eventId, cityId, employees = []
 22 | }: IssueModalProps) {
 23 |   const [message, setMessage] = useState('');
 24 |   const [deadline, setDeadline] = useState('');
 25 |   const [assignedUserId, setAssignedUserId] = useState('');
 26 |   const [sent, setSent] = useState(false);
 27 | 
 28 |   if (!isOpen) return null;
 29 | 
 30 |   const assignedUser = employees.find(e => e.id === assignedUserId);
 31 | 
 32 |   const handleSend = () => {
 33 |     if (!message.trim()) return;
 34 |     setSent(true);
 35 |     // закриваємо через 600мс щоб користувач побачив ✓
 36 |     setTimeout(() => {
 37 |       setSent(false);
 38 |       setMessage('');
 39 |       setDeadline('');
 40 |       setAssignedUserId('');
 41 |       onClose();
 42 |     }, 600);
 43 |     // запит у фоні
 44 |     api.post('/issues', {
 45 |       eventId,
 46 |       schoolName,
 47 |       eventName,
 48 |       message,
 49 |       cityId,
 50 |       deadline: deadline || undefined,
 51 |       assignedUserId: assignedUserId || undefined,
 52 |       assignedUserName: assignedUser?.name || undefined,
 53 |     }).catch((e) => console.error(e));
 54 |   };
 55 | 
 56 |   return createPortal(
 57 |     <div
 58 |       className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
 59 |       style={{ animation: "fadeIn 0.2s ease-out forwards" }}
 60 |     >
 61 |       <style>{`
 62 |         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 63 |         @keyframes modalScale {
 64 |           from { opacity: 0; transform: scale(0.95) translateY(15px); }
 65 |           to { opacity: 1; transform: scale(1) translateY(0); }
 66 |         }
 67 |       `}</style>
 68 |       <div
 69 |         className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col opacity-0"
 70 |         style={{ animation: "modalScale 0.3s ease-out forwards" }}
 71 |       >
 72 |         <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
 73 |           <div>
 74 |             <h3 className="text-xl font-bold text-slate-800">🚨 Запит</h3>
 75 |             <p className="text-sm text-red-500 mt-0.5 font-medium">{schoolName}</p>
 76 |             <p className="text-xs text-slate-400 mt-0.5">{eventName}</p>
 77 |           </div>
 78 |           <button
 79 |             onClick={onClose}
 80 |             className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
 81 |           >
 82 |             ✕
 83 |           </button>
 84 |         </div>
 85 | 
 86 |         <div className="p-6 flex flex-col gap-4 overflow-y-auto">
 87 |           <textarea
 88 |             value={message}
 89 |             onChange={(e) => setMessage(e.target.value)}
 90 |             placeholder="Опишіть проблему або запит..."
 91 |             className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32 text-sm"
 92 |             autoFocus
 93 |           />
 94 | 
 95 |           <div>
 96 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
 97 |               ⏰ Дедлайн <span className="text-slate-400 font-normal">(необов'язково)</span>
 98 |             </label>
 99 |             <input
100 |               type="date"
101 |               value={deadline}
102 |               onChange={(e) => setDeadline(e.target.value)}
103 |               min={new Date().toISOString().slice(0, 10)}
104 |               className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
105 |             />
106 |           </div>
107 | 
108 |           {employees.length > 0 && (
109 |             <div>
110 |               <label className="block text-sm font-medium text-slate-600 mb-1.5">
111 |                 👤 Відповідальний <span className="text-slate-400 font-normal">(необов'язково)</span>
112 |               </label>
113 |               <select
114 |                 value={assignedUserId}
115 |                 onChange={(e) => setAssignedUserId(e.target.value)}
116 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm bg-white"
117 |               >
118 |                 <option value="">— Оберіть працівника —</option>
119 |                 {employees.map(emp => (
120 |                   <option key={emp.id} value={emp.id}>
121 |                     {emp.name} ({emp.role})
122 |                   </option>
123 |                 ))}
124 |               </select>
125 |             </div>
126 |           )}
127 | 
128 |           <div className="flex gap-3 mt-2">
129 |             <button
130 |               type="button"
131 |               onClick={onClose}
132 |               className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
133 |             >
134 |               Скасувати
135 |             </button>
136 |             <button
137 |               type="button"
138 |               onClick={handleSend}
139 |               disabled={sent || !message.trim()}
140 |               className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
141 |             >
142 |               {sent ? '✓ Надіслано!' : isSending ? 'Відправка...' : 'Відправити'}
143 |             </button>
144 |           </div>
145 |         </div>
146 |       </div>
147 |     </div>,
148 |     document.body
149 |   );
150 | }
151 | 
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
  0 | import { useState, useEffect } from "react";
  1 | import { createPortal } from "react-dom";
  2 | import { api } from "../../../config/api";
  3 | 
  4 | interface RescheduleModalProps {
  5 |   isOpen: boolean;
  6 |   onClose: () => void;
  7 |   eventId: string;
  8 |   currentDate: string;
  9 |   currentTime: string;
 10 |   onSuccess: () => void;
 11 | }
 12 | 
 13 | export default function RescheduleModal({
 14 |   isOpen,
 15 |   onClose,
 16 |   eventId,
 17 |   currentDate,
 18 |   currentTime,
 19 |   onSuccess,
 20 | }: RescheduleModalProps) {
 21 |   const [date, setDate] = useState("");
 22 |   const [time, setTime] = useState("");
 23 |   const [loading, setLoading] = useState(false);
 24 | 
 25 |   useEffect(() => {
 26 |     if (isOpen && currentDate) {
 27 |       setDate(currentDate.slice(0, 10));
 28 |       setTime(currentTime || "");
 29 |     }
 30 |   }, [isOpen, currentDate, currentTime]);
 31 | 
 32 |   if (!isOpen) return null;
 33 | 
 34 |   const handleSave = () => {
 35 |     onClose(); // закриваємо одразу
 36 |     onSuccess();
 37 |     // запит у фоні
 38 |     api.patch(`/events/${eventId}/reschedule`, { date, time }).catch((e) => {
 39 |       console.error('Помилка перенесення:', e);
 40 |     });
 41 |   };
 42 | 
 43 |   return createPortal(
 44 |     <div
 45 |       className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
 46 |       style={{ animation: "fadeIn 0.2s ease-out forwards" }}
 47 |     >
 48 |       <style>{`
 49 |         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 50 |         @keyframes modalScale {
 51 |           from { opacity: 0; transform: scale(0.95) translateY(15px); }
 52 |           to { opacity: 1; transform: scale(1) translateY(0); }
 53 |         }
 54 |       `}</style>
 55 |       <div
 56 |         className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
 57 |         style={{ animation: "modalScale 0.3s ease-out forwards" }}
 58 |       >
 59 |         <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
 60 |           <h3 className="text-xl font-bold text-slate-800">
 61 |             📅 Перенести подію
 62 |           </h3>
 63 |           <button
 64 |             onClick={onClose}
 65 |             className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
 66 |           >
 67 |             ✕
 68 |           </button>
 69 |         </div>
 70 |         <div className="p-6 flex flex-col gap-4">
 71 |           <div>
 72 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
 73 |               Нова дата
 74 |             </label>
 75 |             <input
 76 |               type="date"
 77 |               value={date}
 78 |               onChange={(e) => setDate(e.target.value)}
 79 |               className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
 80 |             />
 81 |           </div>
 82 |           <div>
 83 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
 84 |               Новий час
 85 |             </label>
 86 |             <input
 87 |               type="time"
 88 |               value={time}
 89 |               onChange={(e) => setTime(e.target.value)}
 90 |               className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
 91 |             />
 92 |           </div>
 93 |           <div className="flex gap-3 mt-2">
 94 |             <button
 95 |               onClick={onClose}
 96 |               className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
 97 |             >
 98 |               Скасувати
 99 |             </button>
100 |             <button
101 |               onClick={handleSave}
102 |               disabled={loading}
103 |               className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
104 |             >
105 |               {loading ? "Збереження..." : "Зберегти"}
106 |             </button>
107 |           </div>
108 |         </div>
109 |       </div>
110 |     </div>,
111 |     document.body,
112 |   );
113 | }
114 | 
```

### File: apps/frontend/src/components/schools/SchoolDesktopTable.tsx
```tsx
  0 | import React from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { motion, AnimatePresence } from "framer-motion";
  3 | 
  4 | interface Props {
  5 |   schools: any[];
  6 |   searchQuery: string;
  7 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  8 |   stages: any[];
  9 | }
 10 | 
 11 | // Мемоізований рядок з анімаціями
 12 | export const SchoolRow = React.memo(
 13 |   ({ school, onDelete, stages, navigate }: any) => {
 14 |     const latestEvent = school.events?.[0];
 15 |     const stage = latestEvent
 16 |       ? stages.find((s: any) => s.key === latestEvent.status)
 17 |       : null;
 18 | 
 19 |     return (
 20 |       <motion.tr
 21 |         initial={{ opacity: 0 }}
 22 |         animate={{ opacity: 1 }}
 23 |         exit={{ opacity: 0 }}
 24 |         onClick={() => navigate(`/schools/${school.id}`)}
 25 |         className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
 26 |       >
 27 |         <td className="p-4 font-bold text-slate-800">{school.name}</td>
 28 |         <td className="p-4 font-medium text-slate-600">{school.city?.name}</td>
 29 |         <td className="p-4">
 30 |           <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
 31 |             Активна
 32 |           </span>
 33 |         </td>
 34 |         <td className="p-4">
 35 |           {stage ? (
 36 |             <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
 37 |               {stage.name}
 38 |             </span>
 39 |           ) : (
 40 |             <span className="text-slate-400 text-xs italic">—</span>
 41 |           )}
 42 |         </td>
 43 |         <td className="p-4 text-center">
 44 |           <button
 45 |             onClick={(e) => {
 46 |               e.stopPropagation();
 47 |               onDelete(e, school.id, school.name);
 48 |             }}
 49 |             className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-lg"
 50 |           >
 51 |             🗑
 52 |           </button>
 53 |         </td>
 54 |       </motion.tr>
 55 |     );
 56 |   },
 57 | );
 58 | 
 59 | SchoolRow.displayName = "SchoolRow";
 60 | 
 61 | export default function SchoolDesktopTable({
 62 |   schools,
 63 |   searchQuery,
 64 |   onDelete,
 65 |   stages,
 66 | }: Props) {
 67 |   const navigate = useNavigate();
 68 | 
 69 |   return (
 70 |     <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 custom-scrollbar">
 71 |       <div className="overflow-y-auto flex-1">
 72 |         <table className="w-full text-left border-collapse">
 73 |           <thead className="sticky top-0 z-10 bg-slate-50">
 74 |             <tr className="border-b border-slate-100">
 75 |               <th className="p-4 font-medium text-slate-600">Назва школи</th>
 76 |               <th className="p-4 font-medium text-slate-600">Місто</th>
 77 |               <th className="p-4 font-medium text-slate-600">Статус</th>
 78 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
 79 |               <th className="p-4 font-medium text-slate-600 text-center">
 80 |                 Дія
 81 |               </th>
 82 |             </tr>
 83 |           </thead>
 84 |           <tbody className="divide-y divide-slate-50">
 85 |             <AnimatePresence>
 86 |               {schools.map((school) => (
 87 |                 <SchoolRow
 88 |                   key={school.id}
 89 |                   school={school}
 90 |                   onDelete={onDelete}
 91 |                   stages={stages}
 92 |                   navigate={navigate}
 93 |                 />
 94 |               ))}
 95 |             </AnimatePresence>
 96 |           </tbody>
 97 |         </table>
 98 |         {schools.length === 0 && (
 99 |           <motion.div
100 |             initial={{ opacity: 0 }}
101 |             animate={{ opacity: 1 }}
102 |             className="text-center py-16 text-slate-400 text-sm font-medium"
103 |           >
104 |             {searchQuery
105 |               ? `Нічого не знайдено за «${searchQuery}»`
106 |               : "Шкіл ще немає"}
107 |           </motion.div>
108 |         )}
109 |       </div>
110 |     </div>
111 |   );
112 | }
113 | 
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
 10 | // 1. Експортуємо SchoolCard, щоб уникнути помилок при імпорті в інших файлах
 11 | export const SchoolCard = React.memo(({ school, onDelete, stages, index = 0 }: any) => {
 12 |   const navigate = useNavigate();
 13 |   const latestEvent = school.events?.[0];
 14 |   const stage = latestEvent
 15 |     ? stages.find((s: any) => s.key === latestEvent.status)
 16 |     : null;
 17 | 
 18 |   return (
 19 |     <div
 20 |       className="school-row-enter bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer active:scale-[0.99]"
 21 |       style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: "both" }}
 22 |       onClick={() => navigate(`/schools/${school.id}`)}
 23 |     >
 24 |       <div className="flex items-start justify-between gap-2">
 25 |         <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
 26 |           {school.name}
 27 |         </p>
 28 |         <button
 29 |           onClick={(e) => {
 30 |             e.stopPropagation();
 31 |             onDelete(e, school.id, school.name);
 32 |           }}
 33 |           className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-lg"
 34 |         >
 35 |           🗑
 36 |         </button>
 37 |       </div>
 38 |       <div className="flex items-center justify-between gap-2 mt-2">
 39 |         {school.phone ? (
 40 |           <a
 41 |             href={`tel:${school.phone}`}
 42 |             onClick={(e) => e.stopPropagation()}
 43 |             className="text-xs text-blue-600 font-medium truncate"
 44 |           >
 45 |             📞 {school.director || school.phone}
 46 |           </a>
 47 |         ) : (
 48 |           <span className="text-xs text-slate-500 truncate">
 49 |             👤 {school.director || "Контакт не вказано"}
 50 |           </span>
 51 |         )}
 52 |         {stage && (
 53 |           <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
 54 |             {stage.name}
 55 |           </span>
 56 |         )}
 57 |       </div>
 58 |     </div>
 59 |   );
 60 | });
 61 | 
 62 | SchoolCard.displayName = "SchoolCard";
 63 | 
 64 | // 2. Головний компонент залишається default export
 65 | export default function SchoolMobileList({
 66 |   schools,
 67 |   searchQuery,
 68 |   onDelete,
 69 |   stages,
 70 | }: Props) {
 71 |   return (
 72 |     <>
 73 |       <style>{`
 74 |         @keyframes schoolRowIn {
 75 |           from { opacity: 0; transform: translateX(-14px); }
 76 |           to   { opacity: 1; transform: translateX(0); }
 77 |         }
 78 |         .school-row-enter {
 79 |           animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 80 |           opacity: 0;
 81 |         }
 82 |       `}</style>
 83 |       <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar">
 84 |         {schools.map((school, index) => (
 85 |           <SchoolCard key={school.id} school={school} index={index} onDelete={onDelete} stages={stages} />
 86 |         ))}
 87 | 
 88 |         {schools.length === 0 && (
 89 |           <div className="text-center py-10 text-slate-400">
 90 |             <p>
 91 |               {searchQuery
 92 |                 ? `Нічого не знайдено за «${searchQuery}»`
 93 |                 : "Шкіл ще немає"}
 94 |             </p>
 95 |           </div>
 96 |         )}
 97 |       </div>
 98 |     </>
 99 |   );
100 | }
101 | 
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
114 |   const schoolsForSize = activeFilter
115 |     ? schools.filter((s) => classifySchool(s) === activeFilter)
116 |     : schools;
117 | 
118 |   const sizeStats = schoolsForSize.reduce(
119 |     (acc, s) => {
120 |       acc[classifySize(s, schoolType)]++;
121 |       return acc;
122 |     },
123 |     { small: 0, medium: 0, large: 0 } as Record<string, number>,
124 |   );
125 | 
126 |   const sizeItems =
127 |     schoolType === "Садочок" ? SIZE_ITEMS_KINDER : SIZE_ITEMS_SCHOOL;
128 |   const hasAnyFilter = activeFilter || sizeFilter;
129 | 
130 |   return (
131 |     <div className="flex flex-col gap-2 mb-4">
132 |       {/* Рядок 1: статус */}
133 |       <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
134 |         {STATUS_ITEMS.map((item, i) => {
135 |           const isActive = activeFilter === item.key;
136 |           return (
137 |             <React.Fragment key={item.key}>
138 |               {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
139 |               <button
140 |                 onClick={() => onFilterChange(isActive ? null : item.key)}
141 |                 className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
142 |                   isActive
143 |                     ? item.active
144 |                     : `bg-white ${item.inactive} hover:bg-slate-50`
145 |                 }`}
146 |               >
147 |                 <span className="text-base font-bold tabular-nums leading-none">
148 |                   {statusStats[item.key] ?? 0}
149 |                 </span>
150 |                 <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
151 |                   {item.label}
152 |                 </span>
153 |               </button>
154 |             </React.Fragment>
155 |           );
156 |         })}
157 |         {activeFilter && (
158 |           <button
159 |             onClick={() => onFilterChange(null)}
160 |             className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
161 |           >
162 |             ✕
163 |           </button>
164 |         )}
165 |       </div>
166 | 
167 |       {/* Рядок 2: розмір */}
168 |       <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
169 |         {sizeItems.map((item, i) => {
170 |           const isActive = sizeFilter === item.key;
171 |           return (
172 |             <React.Fragment key={item.key}>
173 |               {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
174 |               <button
175 |                 onClick={() => onSizeFilterChange(isActive ? null : item.key)}
176 |                 className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
177 |                   isActive
178 |                     ? item.active
179 |                     : `bg-white ${item.inactive} hover:bg-slate-50`
180 |                 }`}
181 |               >
182 |                 <span className="text-base font-bold tabular-nums leading-none">
183 |                   {sizeStats[item.key] ?? 0}
184 |                 </span>
185 |                 <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
186 |                   {item.label}
187 |                   <span className="opacity-60 ml-0.5">{item.sublabel}</span>
188 |                 </span>
189 |               </button>
190 |             </React.Fragment>
191 |           );
192 |         })}
193 |         {sizeFilter && (
194 |           <button
195 |             onClick={() => onSizeFilterChange(null)}
196 |             className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
197 |           >
198 |             ✕
199 |           </button>
200 |         )}
201 |       </div>
202 |     </div>
203 |   );
204 | }
205 | 
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
 35 |         <tbody>
 36 |           {rowVirtualizer.getVirtualItems().map((virtualRow) => (
 37 |             <tr
 38 |               key={virtualRow.key}
 39 |               style={{ height: `${virtualRow.size}px` }}
 40 |             >
 41 |               <SchoolRow
 42 |                 school={schools[virtualRow.index]}
 43 |                 onDelete={onDelete}
 44 |                 stages={stages}
 45 |                 navigate={navigate}
 46 |               />
 47 |             </tr>
 48 |           ))}
 49 |           <tr style={{ height: `${rowVirtualizer.getTotalSize() - rowVirtualizer.getVirtualItems().reduce((s, r) => s + r.size, 0)}px` }}>
 50 |             <td colSpan={5} />
 51 |           </tr>
 52 |         </tbody>
 53 |       </table>
 54 | 
 55 |       {schools.length === 0 && (
 56 |         <div className="text-center py-16 text-slate-400 text-sm font-medium">
 57 |           {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
 58 |         </div>
 59 |       )}
 60 |     </div>
 61 |   );
 62 | }
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

### File: apps/frontend/src/hooks/useApi.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | 
  3 | const auth = () => ({
  4 |   Authorization: `Bearer ${localStorage.getItem("token")}`,
  5 | });
  6 | 
  7 | // ─── Cities ──────────────────────────────────────────────────────────────────
  8 | 
  9 | export function useCities() {
 10 |   return useQuery({
 11 |     queryKey: ["cities"],
 12 |     queryFn: () => api.get("/cities", { headers: auth() }).then(r => r.data),
 13 |     staleTime: 5 * 60 * 1000,
 14 |   });
 15 | }
 16 | 
 17 | export function useAddCity() {
 18 |   const qc = useQueryClient();
 19 |   return useMutation({
 20 |     mutationFn: (name: string) =>
 21 |       api.post("/cities", { name }, { headers: auth() }).then(r => r.data),
 22 |     onSuccess: (newCity) => {
 23 |       qc.setQueryData(["cities"], (old: any[] = []) => [newCity, ...old]);
 24 |     },
 25 |   });
 26 | }
 27 | 
 28 | // ─── Schools ─────────────────────────────────────────────────────────────────
 29 | 
 30 | export function useSchools() {
 31 |   return useQuery({
 32 |     queryKey: ["schools"],
 33 |     queryFn: () =>
 34 |       api.get("/schools?minimal=true", { headers: auth() }).then(r => r.data),
 35 |     staleTime: 5 * 60 * 1000,
 36 |   });
 37 | }
 38 | 
 39 | export function useAddSchool() {
 40 |   const qc = useQueryClient();
 41 |   return useMutation({
 42 |     mutationFn: (data: any) =>
 43 |       api.post("/schools", data, { headers: auth() }).then(r => r.data),
 44 |     onSuccess: () => {
 45 |       qc.invalidateQueries({ queryKey: ["schools"] });
 46 |     },
 47 |   });
 48 | }
 49 | 
 50 | export function useDeleteSchool() {
 51 |   const qc = useQueryClient();
 52 |   return useMutation({
 53 |     mutationFn: (schoolId: string) =>
 54 |       api.delete(`/schools/${schoolId}`, { headers: auth() }),
 55 |     onSuccess: (_data, schoolId) => {
 56 |       qc.setQueryData(["schools"], (old: any[] = []) =>
 57 |         old.filter(s => s.id !== schoolId),
 58 |       );
 59 |     },
 60 |   });
 61 | }
 62 | 
 63 | // ─── Events ──────────────────────────────────────────────────────────────────
 64 | 
 65 | export function useEvents() {
 66 |   return useQuery({
 67 |     queryKey: ["events"],
 68 |     queryFn: () => api.get("/events", { headers: auth() }).then(r => r.data),
 69 |     staleTime: 2 * 60 * 1000,
 70 |   });
 71 | }
 72 | 
 73 | // ─── Prefetch школи при hover ─────────────────────────────────────────────────
 74 | 
 75 | export function usePrefetchSchool() {
 76 |   const qc = useQueryClient();
 77 |   return (schoolId: string) => {
 78 |     qc.prefetchQuery({
 79 |       queryKey: ["school", schoolId],
 80 |       queryFn: () =>
 81 |         api.get(`/schools/${schoolId}`, { headers: auth() }).then(r => r.data),
 82 |       staleTime: 2 * 60 * 1000,
 83 |     });
 84 |   };
 85 | }
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

### File: apps/frontend/src/hooks/useCalendar.ts
```ts
  0 | import { useQuery } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | 
  3 | const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  4 | 
  5 | export function useCalendarEvents() {
  6 |   return useQuery({
  7 |     queryKey: ["calendarEvents"],
  8 |     queryFn: () => api.get("/events", { headers: h() }).then((r) => r.data),
  9 |     staleTime: 60 * 1000,
 10 |   });
 11 | }
 12 | 
 13 | export function useCalendarProjects() {
 14 |   return useQuery({
 15 |     queryKey: ["projects"],
 16 |     queryFn: () => api.get("/projects", { headers: h() }).then((r) => r.data),
 17 |     staleTime: 5 * 60 * 1000,
 18 |   });
 19 | }
 20 | 
```

### File: apps/frontend/src/hooks/useCities.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | 
  3 | const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  4 | 
  5 | export function useCities() {
  6 |   return useQuery({
  7 |     queryKey: ["cities"],
  8 |     queryFn: () => api.get("/cities", { headers: h() }).then((r) => r.data),
  9 |     staleTime: 5 * 60 * 1000,
 10 |   });
 11 | }
 12 | 
 13 | export function useCity(id: string | undefined) {
 14 |   return useQuery({
 15 |     queryKey: ["city", id],
 16 |     queryFn: () => api.get(`/cities/${id}`).then((r) => r.data),
 17 |     enabled: !!id,
 18 |     staleTime: 2 * 60 * 1000,
 19 |   });
 20 | }
 21 | 
 22 | export function useCreateCity() {
 23 |   const qc = useQueryClient();
 24 |   return useMutation({
 25 |     mutationFn: (name: string) =>
 26 |       api.post("/cities", { name }).then((r) => r.data),
 27 |     onSuccess: (data) => {
 28 |       qc.setQueryData(["cities"], (old: any) =>
 29 |         Array.isArray(old) ? [data, ...old] : [data],
 30 |       );
 31 |     },
 32 |   });
 33 | }
 34 | 
 35 | export function useCreateCrew(cityId: string | undefined) {
 36 |   const qc = useQueryClient();
 37 |   return useMutation({
 38 |     mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
 39 |       api.post(`/cities/${cityId}/crews`, form).then((r) => r.data),
 40 |     onMutate: async (form) => {
 41 |       await qc.cancelQueries({ queryKey: ["city", cityId] });
 42 |       const prev = qc.getQueryData(["city", cityId]);
 43 |       const optimistic = { id: `temp-${Date.now()}`, ...form, name: form.name };
 44 |       qc.setQueryData(["city", cityId], (old: any) =>
 45 |         old ? { ...old, crews: [...(old.crews || []), optimistic] } : old,
 46 |       );
 47 |       return { prev };
 48 |     },
 49 |     onSuccess: (data) => {
 50 |       // Замінюємо тимчасовий запис реальним
 51 |       qc.setQueryData(["city", cityId], (old: any) =>
 52 |         old
 53 |           ? {
 54 |               ...old,
 55 |               crews: old.crews?.map((c: any) =>
 56 |                 c.id?.startsWith("temp-") ? data : c,
 57 |               ),
 58 |             }
 59 |           : old,
 60 |       );
 61 |     },
 62 |     onError: (_err, _vars, ctx) => {
 63 |       if (ctx?.prev) qc.setQueryData(["city", cityId], ctx.prev);
 64 |     },
 65 |   });
 66 | }
 67 | 
 68 | export function useDeleteCrew(cityId: string | undefined) {
 69 |   const qc = useQueryClient();
 70 |   return useMutation({
 71 |     mutationFn: (crewId: string) =>
 72 |       api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
 73 |     onMutate: async (crewId) => {
 74 |       await qc.cancelQueries({ queryKey: ["city", cityId] });
 75 |       const prev = qc.getQueryData(["city", cityId]);
 76 |       qc.setQueryData(["city", cityId], (old: any) =>
 77 |         old
 78 |           ? { ...old, crews: old.crews?.filter((c: any) => c.id !== crewId) }
 79 |           : old,
 80 |       );
 81 |       return { prev };
 82 |     },
 83 |     onError: (_err, _vars, ctx) => {
 84 |       if (ctx?.prev) qc.setQueryData(["city", cityId], ctx.prev);
 85 |     },
 86 |   });
 87 | }
 88 | 
```

### File: apps/frontend/src/hooks/useEmployees.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | 
  3 | const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  4 | 
  5 | export function useUsers() {
  6 |   return useQuery({
  7 |     queryKey: ["users"],
  8 |     queryFn: () => api.get("/users", { headers: h() }).then((r) => r.data),
  9 |     staleTime: 2 * 60 * 1000,
 10 |   });
 11 | }
 12 | 
 13 | export function useProjects() {
 14 |   return useQuery({
 15 |     queryKey: ["projects"],
 16 |     queryFn: () => api.get("/projects", { headers: h() }).then((r) => r.data),
 17 |     staleTime: 5 * 60 * 1000,
 18 |   });
 19 | }
 20 | 
 21 | export function useCreateUser() {
 22 |   const qc = useQueryClient();
 23 |   return useMutation({
 24 |     mutationFn: (form: any) =>
 25 |       api.post("/users", form, { headers: h() }).then((r) => r.data),
 26 |     onMutate: async (form) => {
 27 |       await qc.cancelQueries({ queryKey: ["users"] });
 28 |       const prev = qc.getQueryData(["users"]);
 29 |       const optimistic = {
 30 |         id: `temp-${Date.now()}`,
 31 |         name: form.fullName,
 32 |         ...form,
 33 |       };
 34 |       qc.setQueryData(["users"], (old: any) =>
 35 |         Array.isArray(old) ? [...old, optimistic] : [optimistic],
 36 |       );
 37 |       return { prev };
 38 |     },
 39 |     onSuccess: (data) => {
 40 |       qc.setQueryData(["users"], (old: any) =>
 41 |         Array.isArray(old)
 42 |           ? old.map((u: any) => (u.id?.startsWith("temp-") ? data : u))
 43 |           : [data],
 44 |       );
 45 |     },
 46 |     onError: (_err, _vars, ctx) => {
 47 |       if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
 48 |     },
 49 |   });
 50 | }
 51 | 
 52 | export function useUpdateUser() {
 53 |   const qc = useQueryClient();
 54 |   return useMutation({
 55 |     mutationFn: ({ id, form }: { id: string; form: any }) =>
 56 |       api.patch(`/users/${id}`, form, { headers: h() }).then((r) => r.data),
 57 |     onMutate: async ({ id, form }) => {
 58 |       await qc.cancelQueries({ queryKey: ["users"] });
 59 |       const prev = qc.getQueryData(["users"]);
 60 |       qc.setQueryData(["users"], (old: any) =>
 61 |         Array.isArray(old)
 62 |           ? old.map((u: any) =>
 63 |               u.id === id ? { ...u, name: form.fullName, ...form } : u,
 64 |             )
 65 |           : old,
 66 |       );
 67 |       return { prev };
 68 |     },
 69 |     onSuccess: (data, vars) => {
 70 |       qc.setQueryData(["users"], (old: any) =>
 71 |         Array.isArray(old)
 72 |           ? old.map((u: any) => (u.id === vars.id ? { ...u, ...data } : u))
 73 |           : old,
 74 |       );
 75 |     },
 76 |     onError: (_err, _vars, ctx) => {
 77 |       if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
 78 |     },
 79 |   });
 80 | }
 81 | 
 82 | export function useDeleteUser() {
 83 |   const qc = useQueryClient();
 84 |   return useMutation({
 85 |     mutationFn: (id: string) =>
 86 |       api.delete(`/users/${id}`, { headers: h() }).then((r) => r.data),
 87 |     onMutate: async (id) => {
 88 |       await qc.cancelQueries({ queryKey: ["users"] });
 89 |       const prev = qc.getQueryData(["users"]);
 90 |       qc.setQueryData(["users"], (old: any) =>
 91 |         Array.isArray(old) ? old.filter((u: any) => u.id !== id) : old,
 92 |       );
 93 |       return { prev };
 94 |     },
 95 |     onError: (_err, _vars, ctx) => {
 96 |       if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
 97 |     },
 98 |   });
 99 | }
100 | 
101 | export function useCreateProject() {
102 |   const qc = useQueryClient();
103 |   return useMutation({
104 |     mutationFn: (form: { name: string; color: string }) =>
105 |       api.post("/projects", form, { headers: h() }).then((r) => r.data),
106 |     onSuccess: (data) => {
107 |       qc.setQueryData(["projects"], (old: any) =>
108 |         Array.isArray(old) ? [...old, data] : [data],
109 |       );
110 |     },
111 |   });
112 | }
113 | 
114 | export function useDeleteProject() {
115 |   const qc = useQueryClient();
116 |   return useMutation({
117 |     mutationFn: (id: string) =>
118 |       api.delete(`/projects/${id}`, { headers: h() }).then((r) => r.data),
119 |     onSuccess: (_data, id) => {
120 |       qc.setQueryData(["projects"], (old: any) =>
121 |         Array.isArray(old) ? old.filter((p: any) => p.id !== id) : old,
122 |       );
123 |     },
124 |   });
125 | }
126 | 
```

### File: apps/frontend/src/hooks/useSchoolProfile.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  1 | import { api } from '../config/api';
  2 | 
  3 | const authHeader = () => ({
  4 |   Authorization: `Bearer ${localStorage.getItem('token')}`,
  5 | });
  6 | 
  7 | // ─── Мінімальні дані школи (назва, адреса, місто) ───────────────────────────
  8 | export function useSchool(id: string | undefined) {
  9 |   return useQuery({
 10 |     queryKey: ['school', id],
 11 |     queryFn: async () => {
 12 |       const res = await api.get(`/schools/${id}`, { headers: authHeader() });
 13 |       return res.data;
 14 |     },
 15 |     enabled: !!id,
 16 |     staleTime: 2 * 60 * 1000,
 17 |   });
 18 | }
 19 | 
 20 | // ─── Мінімальний список подій (без history/preparation) ──────────────────────
 21 | export function useSchoolEvents(schoolId: string | undefined, full = false) {
 22 |   return useQuery({
 23 |     queryKey: ['schoolEvents', schoolId, full],
 24 |     queryFn: async () => {
 25 |       const url = full
 26 |         ? `/events/school/${schoolId}`
 27 |         : `/events/school/${schoolId}?minimal=true`;
 28 |       const res = await api.get(url, { headers: authHeader() });
 29 |       return res.data.filter((ev: any) => ev.status !== 'RE_SALE');
 30 |     },
 31 |     enabled: !!schoolId,
 32 |     staleTime: 60 * 1000,
 33 |   });
 34 | }
 35 | 
 36 | // ─── Повні дані однієї події (lazy, при кліку) ────────────────────────────────
 37 | export function useEventFull(eventId: string | undefined) {
 38 |   return useQuery({
 39 |     queryKey: ['eventFull', eventId],
 40 |     queryFn: async () => {
 41 |       const res = await api.get(`/events/${eventId}`, { headers: authHeader() });
 42 |       return res.data;
 43 |     },
 44 |     enabled: !!eventId,
 45 |     staleTime: 30 * 1000,
 46 |   });
 47 | }
 48 | 
 49 | // ─── Список користувачів ────────────────────────────────────────────────────
 50 | export function useUsers() {
 51 |   return useQuery({
 52 |     queryKey: ['users'],
 53 |     queryFn: async () => {
 54 |       const res = await api.get('/users', { headers: authHeader() });
 55 |       return res.data;
 56 |     },
 57 |     staleTime: 5 * 60 * 1000,
 58 |   });
 59 | }
 60 | 
 61 | // ─── Мутації ────────────────────────────────────────────────────────────────
 62 | export function useUpdateEventStatus() {
 63 |   const qc = useQueryClient();
 64 |   return useMutation({
 65 |     mutationFn: ({ eventId, status, actionName, comment }: {
 66 |       eventId: string; status: string; actionName: string; comment?: string;
 67 |     }) =>
 68 |       api.patch(`/events/${eventId}/status`, { status, actionName, comment }, { headers: authHeader() })
 69 |         .then(r => r.data),
 70 |     onSuccess: (data, vars) => {
 71 |       // Оновлюємо повну подію
 72 |       qc.setQueryData(['eventFull', vars.eventId], data);
 73 |       // Оновлюємо статус в мінімальному списку без рефетчу
 74 |       qc.setQueriesData({ queryKey: ['schoolEvents'] }, (old: any) =>
 75 |         Array.isArray(old)
 76 |           ? old
 77 |               .map((ev: any) => ev.id === vars.eventId ? { ...ev, status: vars.status, ...data } : ev)
 78 |               .filter((ev: any) => ev.status !== 'RE_SALE')
 79 |           : old
 80 |       );
 81 |     },
 82 |   });
 83 | }
 84 | 
 85 | export function useUpdatePreparation() {
 86 |   const qc = useQueryClient();
 87 |   return useMutation({
 88 |     mutationFn: ({ eventId, field, status }: { eventId: string; field: string; status: string }) =>
 89 |       api.patch(`/events/${eventId}/preparation`, { field, status }, { headers: authHeader() })
 90 |         .then(r => r.data),
 91 |     onSuccess: (data, vars) => {
 92 |       qc.setQueryData(['eventFull', vars.eventId], (old: any) =>
 93 |         old ? { ...old, preparation: { ...(old.preparation || {}), [vars.field]: vars.status } } : old
 94 |       );
 95 |     },
 96 |   });
 97 | }
 98 | 
 99 | export function useAssignCrew() {
100 |   const qc = useQueryClient();
101 |   return useMutation({
102 |     mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
103 |       api.post(`/events/${eventId}/assign-crew`, { crewId }, { headers: authHeader() })
104 |         .then(r => r.data),
105 |     onSuccess: (data, vars) => {
106 |       qc.setQueryData(['eventFull', vars.eventId], data);
107 |       // Оновлюємо crewId в мінімальному списку
108 |       qc.setQueriesData({ queryKey: ['schoolEvents'] }, (old: any) =>
109 |         Array.isArray(old)
110 |           ? old.map((ev: any) => ev.id === vars.eventId ? { ...ev, crewId: vars.crewId, crew: data.crew } : ev)
111 |           : old
112 |       );
113 |     },
114 |   });
115 | }
116 | 
117 | export function useSubmitReport() {
118 |   const qc = useQueryClient();
119 |   return useMutation({
120 |     mutationFn: ({ eventId, reportData }: { eventId: string; reportData: any }) =>
121 |       api.post(`/events/${eventId}/report`, reportData, { headers: authHeader() })
122 |         .then(r => r.data),
123 |     onSuccess: (_data, vars) => {
124 |       // Видаляємо подію зі списку (вона стане RE_SALE після статус-мутації)
125 |       qc.setQueriesData({ queryKey: ['schoolEvents'] }, (old: any) =>
126 |         Array.isArray(old) ? old.filter((ev: any) => ev.id !== vars.eventId) : old
127 |       );
128 |       qc.removeQueries({ queryKey: ['eventFull', vars.eventId] });
129 |     },
130 |   });
131 | }
132 | 
133 | export function useAddComment() {
134 |   const qc = useQueryClient();
135 |   return useMutation({
136 |     mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
137 |       api.post(`/events/${eventId}/history`, { comment }, { headers: authHeader() })
138 |         .then(r => r.data),
139 |     onSuccess: (data, vars) => {
140 |       qc.setQueryData(['eventFull', vars.eventId], (old: any) =>
141 |         old ? { ...old, history: data.history } : old
142 |       );
143 |     },
144 |   });
145 | }
146 | 
147 | export function useUpdateHistoryComment() {
148 |   const qc = useQueryClient();
149 |   return useMutation({
150 |     mutationFn: ({ historyId, comment, eventId }: { historyId: string; comment: string; eventId: string }) =>
151 |       api.patch(`/events/history/${historyId}`, { comment }, { headers: authHeader() })
152 |         .then(r => r.data),
153 |     onSuccess: (_data, vars) => {
154 |       qc.setQueryData(['eventFull', vars.eventId], (old: any) =>
155 |         old ? {
156 |           ...old,
157 |           history: old.history?.map((h: any) =>
158 |             h.id === vars.historyId ? { ...h, comment: vars.comment } : h
159 |           ),
160 |         } : old
161 |       );
162 |     },
163 |   });
164 | }
```

### File: apps/frontend/src/hooks/useSchools.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | 
  3 | const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  4 | 
  5 | export function useSchoolsList() {
  6 |   return useQuery({
  7 |     queryKey: ["schools"],
  8 |     queryFn: () =>
  9 |       api.get("/schools?minimal=true", { headers: h() }).then(r => r.data),
 10 |     staleTime: 2 * 60 * 1000,
 11 |   });
 12 | }
 13 | 
 14 | export function useCreateSchool() {
 15 |   const qc = useQueryClient();
 16 |   return useMutation({
 17 |     mutationFn: (form: any) =>
 18 |       api.post("/schools", { ...form, type: "Школа" }, { headers: h() }).then(r => r.data),
 19 |     onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
 20 |   });
 21 | }
 22 | 
 23 | export function useDeleteSchool() {
 24 |   const qc = useQueryClient();
 25 |   return useMutation({
 26 |     mutationFn: (id: string) =>
 27 |       api.delete(`/schools/${id}`, { headers: h() }).then(r => r.data),
 28 |     onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
 29 |   });
 30 | }
 31 | 
 32 | export function useBulkImport() {
 33 |   const qc = useQueryClient();
 34 |   return useMutation({
 35 |     mutationFn: ({ cityId, type }: { cityId: string; type: string }) =>
 36 |       api.post("/schools/bulk-import", { cityId, type }, {
 37 |         headers: h(),
 38 |         timeout: 120000,
 39 |       }).then(r => r.data),
 40 |     onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
 41 |   });
 42 | }
```

### File: apps/frontend/src/index.css
```css
  0 | 
  1 | 
  2 | @tailwind base;
  3 | @tailwind components;
  4 | @tailwind utilities;
  5 | 
  6 | .custom-scrollbar {
  7 |   scrollbar-width: thin;
  8 |   scrollbar-color: #cbd5e1 transparent;
  9 | }
 10 | 
 11 | .custom-scrollbar::-webkit-scrollbar {
 12 |   width: 6px;
 13 | }
 14 | 
 15 | .custom-scrollbar::-webkit-scrollbar-thumb {
 16 |   background-color: #cbd5e1;
 17 |   border-radius: 20px;
 18 | }
 19 | 
 20 | /* Плавність для всіх інтерактивних елементів */
 21 | button, div {
 22 |   transition-property: color, background-color, border-color, transform, box-shadow;
 23 |   transition-duration: 200ms;
 24 | }
```

### File: apps/frontend/src/main.tsx
```tsx
  0 | import { StrictMode } from "react";
  1 | import { createRoot } from "react-dom/client";
  2 | import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  3 | import "./index.css";
  4 | import App from "./App";
  5 | 
  6 | const queryClient = new QueryClient({
  7 |   defaultOptions: {
  8 |     queries: {
  9 |       staleTime: 5 * 60 * 1000,
 10 |       gcTime: 10 * 60 * 1000,
 11 |       retry: 1,
 12 |     },
 13 |   },
 14 | });
 15 | 
 16 | createRoot(document.getElementById("root")!).render(
 17 |   <StrictMode>
 18 |     <QueryClientProvider client={queryClient}>
 19 |       <App />
 20 |     </QueryClientProvider>
 21 |   </StrictMode>,
 22 | );
 23 | 
```

### File: apps/frontend/src/pages/CalendarView.tsx
```tsx
  0 | import { useState } from "react";
  1 | import { useSelectedCity } from "../context/CityContext";
  2 | import { useNavigate } from "react-router-dom";
  3 | import { useCalendarEvents, useCalendarProjects } from "../hooks/useCalendar";
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
 17 |   const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
 18 |   const { data: projects = [] } = useCalendarProjects();
 19 |   const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
 20 |   const [currentDate, setCurrentDate] = useState(new Date());
 21 |   const isLoading = eventsLoading;
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
 50 |   const nextMonth = () =>
 51 |     setCurrentDate(
 52 |       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
 53 |     );
 54 |   const prevMonth = () =>
 55 |     setCurrentDate(
 56 |       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
 57 |     );
 58 |   const today = () => {
 59 |     setCurrentDate(new Date());
 60 |     setSelectedMobileDate(new Date());
 61 |   };
 62 | 
 63 |   const getDaysInMonth = (year: number, month: number) =>
 64 |     new Date(year, month + 1, 0).getDate();
 65 |   const getFirstDayOfMonth = (year: number, month: number) => {
 66 |     let day = new Date(year, month, 1).getDay();
 67 |     return day === 0 ? 6 : day - 1;
 68 |   };
 69 | 
 70 |   const year = currentDate.getFullYear();
 71 |   const month = currentDate.getMonth();
 72 |   const daysInMonth = getDaysInMonth(year, month);
 73 |   const firstDay = getFirstDayOfMonth(year, month);
 74 | 
 75 |   const days = [];
 76 |   for (let i = 0; i < firstDay; i++) days.push(null);
 77 |   for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
 78 | 
 79 |   const filteredEvents = events.filter((ev) => {
 80 |     if (ev.status === "RE_SALE") return false;
 81 |     if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
 82 |     return true;
 83 |   });
 84 | 
 85 |   const getEventsForDay = (date: Date) => {
 86 |     return filteredEvents.filter((ev) => {
 87 |       const evDate = new Date(ev.date);
 88 |       return (
 89 |         evDate.getFullYear() === date.getFullYear() &&
 90 |         evDate.getMonth() === date.getMonth() &&
 91 |         evDate.getDate() === date.getDate()
 92 |       );
 93 |     });
 94 |   };
 95 | 
 96 |   const monthNames = [
 97 |     "Січень",
 98 |     "Лютий",
 99 |     "Березень",
100 |     "Квітень",
101 |     "Травень",
102 |     "Червень",
103 |     "Липень",
104 |     "Серпень",
105 |     "Вересень",
106 |     "Жовтень",
107 |     "Листопад",
108 |     "Грудень",
109 |   ];
110 | 
111 |   // Логіка кольорів для проєктів
112 |   const getProjectColor = (projectName: string) => {
113 |     const proj = projects.find((p) => p.name === projectName);
114 |     const color = proj ? proj.color : "blue";
115 | 
116 |     switch (color) {
117 |       case "emerald":
118 |         return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300";
119 |       case "rose":
120 |         return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300";
121 |       case "red":
122 |         return "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400";
123 |       case "amber":
124 |         return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300";
125 |       case "purple":
126 |         return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300";
127 |       default:
128 |         return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300";
129 |     }
130 |   };
131 | 
132 |   if (isLoading)
133 |     return (
134 |       <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
135 |         {/* Шапка */}
136 |         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
137 |           <div>
138 |             <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
139 |             <div className="h-4 w-72 bg-slate-200 rounded-lg mb-4" />
140 |             <div className="flex gap-3 mt-4">
141 |               {[80, 100, 90].map((w, i) => (
142 |                 <div
143 |                   key={i}
144 |                   className="h-4 bg-slate-200 rounded-full"
145 |                   style={{ width: w }}
146 |                 />
147 |               ))}
148 |             </div>
149 |           </div>
150 |           <div className="h-10 w-48 bg-slate-200 rounded-xl" />
151 |         </div>
152 | 
153 |         {/* Календар */}
154 |         <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
155 |           {/* Керування місяцем */}
156 |           <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
157 |             <div className="h-8 w-36 bg-slate-200 rounded-xl" />
158 |             <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
159 |           </div>
160 | 
161 |           {/* Дні тижня */}
162 |           <div className="grid grid-cols-7 bg-slate-50/50">
163 |             {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
164 |               <div key={d} className="py-3 flex justify-center">
165 |                 <div className="h-3 w-6 bg-slate-200 rounded" />
166 |               </div>
167 |             ))}
168 | 
169 |             {/* Клітинки */}
170 |             {Array.from({ length: 35 }).map((_, i) => (
171 |               <div
172 |                 key={i}
173 |                 className="min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-2"
174 |               >
175 |                 <div className="flex justify-end mb-2">
176 |                   <div className="w-7 h-7 rounded-full bg-slate-200" />
177 |                 </div>
178 |                 {i % 4 === 0 && (
179 |                   <div className="h-5 bg-slate-100 rounded-md mb-1.5 mx-0.5" />
180 |                 )}
181 |                 {i % 7 === 2 && (
182 |                   <div className="h-5 bg-slate-100 rounded-md mx-0.5" />
183 |                 )}
184 |               </div>
185 |             ))}
186 |           </div>
187 |         </div>
188 | 
189 |         {/* Мобільний блок подій */}
190 |         <div className="mt-6 md:hidden">
191 |           <div className="h-6 w-40 bg-slate-200 rounded-lg mb-3" />
192 |           <div className="space-y-3">
193 |             {[1, 2].map((i) => (
194 |               <div
195 |                 key={i}
196 |                 className="bg-white p-4 rounded-2xl border-l-4 border-l-slate-200 shadow-sm"
197 |               >
198 |                 <div className="flex justify-between mb-2">
199 |                   <div className="h-5 w-20 bg-slate-200 rounded" />
200 |                   <div className="h-5 w-28 bg-slate-200 rounded" />
201 |                 </div>
202 |                 <div className="h-5 w-48 bg-slate-200 rounded mb-1" />
203 |                 <div className="h-4 w-36 bg-slate-200 rounded" />
204 |               </div>
205 |             ))}
206 |           </div>
207 |         </div>
208 |       </div>
209 |     );
210 | 
211 |   const selectedDayEvents = getEventsForDay(selectedMobileDate);
212 | 
213 |   return (
214 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
215 |       {/* Шапка календаря */}
216 |       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
217 |         <div>
218 |           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
219 |             Календар подій
220 |           </h1>
221 |           <p className="text-slate-500 mt-1 text-sm">
222 |             Графік запланованих та активних заходів
223 |           </p>
224 | 
225 |           {/* Легенда */}
226 |           <div className="flex flex-wrap items-center gap-3 mt-4">
227 |             {projects.map((p) => {
228 |               const badgeColor =
229 |                 {
230 |                   blue: "bg-blue-400",
231 |                   emerald: "bg-emerald-400",
232 |                   rose: "bg-rose-400",
233 |                   red: "bg-red-500",
234 |                   amber: "bg-amber-400",
235 |                   purple: "bg-purple-400",
236 |                 }[p.color] || "bg-blue-400";
237 | 
238 |               return (
239 |                 <span
240 |                   key={p.id}
241 |                   className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
242 |                 >
243 |                   <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
244 |                   {p.name}
245 |                 </span>
246 |               );
247 |             })}
248 |           </div>
249 |         </div>
250 | 
251 |         {userRole === "SUPERADMIN" && (
252 |           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 shrink-0">
253 |             <span className="text-sm text-slate-500 font-medium">Місто:</span>
254 |             <select
255 |               value={filterCityId}
256 |               onChange={(e) => setFilterCityId(e.target.value)}
257 |               className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
258 |             >
259 |               <option value="ALL">🌍 Всі міста</option>
260 |               {cities.map((c) => (
261 |                 <option key={c.id} value={c.id}>
262 |                   {c.name}
263 |                 </option>
264 |               ))}
265 |             </select>
266 |           </div>
267 |         )}
268 |       </div>
269 | 
270 |       <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
271 |         {/* Керування місяцями */}
272 |         <div className="flex flex-col sm:flex-row items-center justify-between p-5 md:p-6 border-b border-slate-100 gap-4 bg-white">
273 |           <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
274 |             {monthNames[month]}{" "}
275 |             <span className="text-slate-400 font-medium">{year}</span>
276 |           </h2>
277 |           <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
278 |             <button
279 |               onClick={prevMonth}
280 |               className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
281 |             >
282 |               ◀
283 |             </button>
284 |             <button
285 |               onClick={today}
286 |               className="px-4 md:px-6 py-2 bg-white rounded-xl shadow-sm text-slate-800 font-bold transition-all hover:bg-slate-50"
287 |             >
288 |               Сьогодні
289 |             </button>
290 |             <button
291 |               onClick={nextMonth}
292 |               className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
293 |             >
294 |               ▶
295 |             </button>
296 |           </div>
297 |         </div>
298 | 
299 |         {/* Сітка календаря */}
300 |         <div className="grid grid-cols-7 bg-slate-50/50">
301 |           {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
302 |             <div
303 |               key={dayName}
304 |               className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
305 |             >
306 |               {dayName}
307 |             </div>
308 |           ))}
309 | 
310 |           {days.map((day, idx) => {
311 |             const isToday =
312 |               day && day.toDateString() === new Date().toDateString();
313 |             const isSelected =
314 |               day && day.toDateString() === selectedMobileDate.toDateString();
315 |             const dayEvents = day ? getEventsForDay(day) : [];
316 | 
317 |             return (
318 |               <div
319 |                 key={idx}
320 |                 onClick={() => day && setSelectedMobileDate(day)}
321 |                 className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
322 |                   ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
323 |                   ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
324 |                 `}
325 |               >
326 |                 {day && (
327 |                   <>
328 |                     <div className="flex justify-center md:justify-end mb-1.5">
329 |                       <span
330 |                         className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
331 |                         ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
332 |                       `}
333 |                       >
334 |                         {day.getDate()}
335 |                       </span>
336 |                     </div>
337 | 
338 |                     <div className="space-y-1.5 max-h-[80px] md:max-h-[100px] overflow-y-auto custom-scrollbar pr-0.5">
339 |                       {dayEvents.map((ev) => (
340 |                         <div
341 |                           key={ev.id}
342 |                           className="relative group/event z-0 hover:z-50"
343 |                         >
344 |                           <button
345 |                             onClick={(e) => {
346 |                               e.stopPropagation(); // Щоб не спрацьовував клік по всій клітинці
347 |                               if (ev.school)
348 |                                 navigate(`/schools/${ev.school.id}`);
349 |                             }}
350 |                             className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${getProjectColor(ev.project)}`}
351 |                           >
352 |                             {ev.time || "—"}
353 |                           </button>
354 | 
355 |                           {/* Тултип (тільки для Десктопу) */}
356 |                           <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
357 |                             <p className="font-bold text-sm mb-1 truncate">
358 |                               {ev.school?.name || "Невідомий заклад"}
359 |                             </p>
360 |                             <div className="space-y-1 text-xs text-slate-300">
361 |                               <p>
362 |                                 <span className="text-slate-400">Проєкт:</span>{" "}
363 |                                 {ev.project}
364 |                               </p>
365 |                               <p>
366 |                                 <span className="text-slate-400">Екіпаж:</span>{" "}
367 |                                 {ev.crew?.name || "Не призначено"}
368 |                               </p>
369 |                               <p>
370 |                                 <span className="text-slate-400">Час:</span>{" "}
371 |                                 <span className="font-bold text-white">
372 |                                   {ev.time || "—"}
373 |                                 </span>
374 |                               </p>
375 |                             </div>
376 |                             {/* Трикутник тултипа */}
377 |                             <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
378 |                           </div>
379 |                         </div>
380 |                       ))}
381 |                     </div>
382 |                   </>
383 |                 )}
384 |               </div>
385 |             );
386 |           })}
387 |         </div>
388 |       </div>
389 | 
390 |       {/* Блок подій для мобільних пристроїв (з'являється під календарем) */}
391 |       <div className="mt-6 md:hidden">
392 |         <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
393 |           📅 Події на{" "}
394 |           {selectedMobileDate.toLocaleDateString("uk-UA", {
395 |             day: "2-digit",
396 |             month: "long",
397 |           })}
398 |         </h3>
399 | 
400 |         {selectedDayEvents.length === 0 ? (
401 |           <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">
402 |             На цей день подій не заплановано
403 |           </div>
404 |         ) : (
405 |           <div className="space-y-3">
406 |             {selectedDayEvents.map((ev) => (
407 |               <div
408 |                 key={ev.id}
409 |                 onClick={() =>
410 |                   ev.school && navigate(`/schools/${ev.school.id}`)
411 |                 }
412 |                 className={`bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer
413 |                   ${
414 |                     ev.project.toLowerCase().includes("голограм")
415 |                       ? "border-l-emerald-500"
416 |                       : ev.project.toLowerCase().includes("малювайк")
417 |                         ? "border-l-rose-500"
418 |                         : ev.project.toLowerCase().includes("360")
419 |                           ? "border-l-red-500"
420 |                           : "border-l-blue-500"
421 |                   }
422 |                 `}
423 |               >
424 |                 <div className="flex justify-between items-start mb-2">
425 |                   <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
426 |                     🕒 {ev.time || "Не вказано"}
427 |                   </span>
428 |                   <span className="text-xs font-medium text-slate-500">
429 |                     {ev.project}
430 |                   </span>
431 |                 </div>
432 |                 <p className="font-bold text-slate-800">{ev.school?.name}</p>
433 |                 <p className="text-sm text-slate-500 mt-1">
434 |                   🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
435 |                 </p>
436 |               </div>
437 |             ))}
438 |           </div>
439 |         )}
440 |       </div>
441 |     </div>
442 |   );
443 | }
444 | 
```

### File: apps/frontend/src/pages/Cities.tsx
```tsx
  0 | import React, { useState, useCallback, lazy, Suspense } from "react";
  1 | import { createPortal } from "react-dom";
  2 | import { useSelectedCity } from "../context/CityContext";
  3 | import { useCities, useAddCity } from "../hooks/useApi";
  4 | 
  5 | // --- ДИНАМІЧНІ ІМПОРТИ (Code Splitting) ---
  6 | const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
  7 | const CityMobileHeader = lazy(
  8 |   () => import("../components/cities/CityMobileHeader"),
  9 | );
 10 | const CityMobileList = lazy(
 11 |   () => import("../components/cities/CityMobileList"),
 12 | );
 13 | const CityDesktopGrid = lazy(
 14 |   () => import("../components/cities/CityDesktopGrid"),
 15 | );
 16 | 
 17 | // Оптимізація 1: Скелетне завантаження (Skeleton Screen).
 18 | // Це повністю прибирає проблему CLS (зсув макета) і покращує LCP,
 19 | // оскільки користувач одразу бачить структуру сторінки, а не пустий екран.
 20 | const CitiesSkeleton = () => (
 21 |   <div className="w-full animate-pulse">
 22 |     {/* Мобільний скелетон */}
 23 |     <div className="md:hidden flex flex-col gap-4 mt-4">
 24 |       <div className="h-28 bg-slate-200 rounded-2xl w-full"></div>
 25 |       <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
 26 |       <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
 27 |     </div>
 28 |     {/* Десктопний скелетон */}
 29 |     <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 30 |       {[...Array(3)].map((_, i) => (
 31 |         <div
 32 |           key={i}
 33 |           className="bg-white rounded-2xl shadow-sm border border-slate-100 h-72 overflow-hidden"
 34 |         >
 35 |           <div className="h-44 bg-slate-200 w-full"></div>
 36 |           <div className="p-5 flex flex-col gap-3">
 37 |             <div className="h-6 bg-slate-200 rounded w-1/2"></div>
 38 |             <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
 39 |             <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
 40 |           </div>
 41 |         </div>
 42 |       ))}
 43 |     </div>
 44 |   </div>
 45 | );
 46 | 
 47 | export default function Cities() {
 48 |   const [isModalOpen, setIsModalOpen] = useState(false);
 49 |   const [newCityName, setNewCityName] = useState("");
 50 | 
 51 |   const { selectedCity, setSelectedCity } = useSelectedCity();
 52 |   const { data: cities = [], isLoading: isFetching } = useCities();
 53 |   const addCity = useAddCity();
 54 | 
 55 |   const handleSelectCity = useCallback(
 56 |     (city: any) => {
 57 |       setSelectedCity(city);
 58 |     },
 59 |     [setSelectedCity],
 60 |   );
 61 | 
 62 |   const handleAddCity = async (e: React.FormEvent) => {
 63 |     e.preventDefault();
 64 |     if (!newCityName.trim()) return;
 65 |     try {
 66 |       await addCity.mutateAsync(newCityName.trim());
 67 |       setNewCityName("");
 68 |       setIsModalOpen(false);
 69 |     } catch {
 70 |       alert("Не вдалося створити місто. Можливо воно вже існує.");
 71 |     }
 72 |   };
 73 | 
 74 |   return (
 75 |     // Оптимізація 5: content-visibility
 76 |     <div
 77 |       className="p-4 md:p-8 bg-slate-50 min-h-screen"
 78 |       style={{ contentVisibility: "auto" }}
 79 |     >
 80 |       {/* Шапка для ПК */}
 81 |       <style>{`
 82 |         @keyframes headerFadeIn {
 83 |           from { opacity: 0; transform: translateY(-10px); }
 84 |           to   { opacity: 1; transform: translateY(0); }
 85 |         }
 86 |         .header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
 87 |         .header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
 88 |       `}</style>
 89 |       <div className="hidden md:flex justify-between items-center mb-8">
 90 |         <h1 className="header-enter text-3xl font-bold text-slate-800">
 91 |           Міста
 92 |         </h1>
 93 |         <button
 94 |           onClick={() => setIsModalOpen(true)}
 95 |           className="header-btn-enter bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-all duration-150"
 96 |         >
 97 |           <span className="mr-2">+</span> Додати місто
 98 |         </button>
 99 |       </div>
100 | 
101 |       {isFetching ? (
102 |         <CitiesSkeleton />
103 |       ) : (
104 |         /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
105 |         <Suspense fallback={<CitiesSkeleton />}>
106 |           {/* 1. Блок для Мобільних (Шапка + Список) */}
107 |           <div className="md:hidden">
108 |             <CityMobileHeader selectedCity={selectedCity} cities={cities} />
109 |             <CityMobileList
110 |               cities={cities}
111 |               selectedCity={selectedCity}
112 |               onSelectCity={handleSelectCity}
113 |             />
114 |           </div>
115 | 
116 |           {/* 2. Блок для Десктопів (Карусель + Сітка) */}
117 |           <div className="hidden md:block">
118 |             <IssueCarousel />
119 |             <CityDesktopGrid
120 |               cities={cities}
121 |               selectedCity={selectedCity}
122 |               onSelectCity={handleSelectCity}
123 |             />
124 |           </div>
125 |         </Suspense>
126 |       )}
127 | 
128 |       {/* Мобільна плаваюча кнопка FAB */}
129 |       <button
130 |         onClick={() => setIsModalOpen(true)}
131 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform opacity-0"
132 |         style={{
133 |           animation:
134 |             "fabPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s forwards",
135 |         }}
136 |         aria-label="Додати місто"
137 |       >
138 |         <style>{`
139 |           @keyframes fabPop {
140 |             from { opacity: 0; transform: scale(0.5) translateY(20px); }
141 |             to { opacity: 1; transform: scale(1) translateY(0); }
142 |           }
143 |         `}</style>
144 |         +
145 |       </button>
146 | 
147 |       {/* Модалка додавання */}
148 |       {isModalOpen &&
149 |         createPortal(
150 |           <div
151 |             className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
152 |             style={{ animation: "fadeIn 0.2s ease-out forwards" }}
153 |           >
154 |             <style>{`
155 |             @keyframes fadeIn {
156 |               from { opacity: 0; }
157 |               to { opacity: 1; }
158 |             }
159 |             @keyframes modalScale {
160 |               from { opacity: 0; transform: scale(0.95) translateY(15px); }
161 |               to { opacity: 1; transform: scale(1) translateY(0); }
162 |             }
163 |           `}</style>
164 | 
165 |             {/* ТУТ БУЛА ПРОБЛЕМА: додано opacity-0 та style з анімацією modalScale */}
166 |             <div
167 |               className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
168 |               style={{ animation: "modalScale 0.3s ease-out forwards" }}
169 |             >
170 |               <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
171 |                 <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
172 |                 <button
173 |                   onClick={() => setIsModalOpen(false)}
174 |                   className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
175 |                 >
176 |                   ✕
177 |                 </button>
178 |               </div>
179 |               <form onSubmit={handleAddCity} className="p-6">
180 |                 <input
181 |                   type="text"
182 |                   value={newCityName}
183 |                   onChange={(e) => setNewCityName(e.target.value)}
184 |                   placeholder="Наприклад: Львів"
185 |                   className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
186 |                   autoFocus
187 |                   required
188 |                 />
189 |                 <div className="flex gap-3">
190 |                   <button
191 |                     type="button"
192 |                     onClick={() => setIsModalOpen(false)}
193 |                     className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
194 |                   >
195 |                     Скасувати
196 |                   </button>
197 |                   <button
198 |                     type="submit"
199 |                     disabled={addCity.isPending}
200 |                     className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
201 |                   >
202 |                     {addCity.isPending ? "Збереження..." : "Зберегти"}
203 |                   </button>
204 |                 </div>
205 |               </form>
206 |             </div>
207 |           </div>,
208 |           document.body,
209 |         )}
210 |     </div>
211 |   );
212 | }
213 | 
```

### File: apps/frontend/src/pages/CityProfile.tsx
```tsx
  0 | import { useState } from "react";
  1 | import { Link, useParams } from "react-router-dom";
  2 | import { lazy, Suspense } from "react";
  3 | const CityAnalytics = lazy(() => import("../components/city-profile/CityAnalytics"));
  4 | import PhoneLink from "../components/PhoneLink";
  5 | import type { Event, Crew, CityProfile as CityProfileType } from "../types";
  6 | import OptimizedImage from "../components/ui/OptimizedImage";
  7 | import { useCity, useCreateCrew, useDeleteCrew } from "../hooks/useCities";
  8 | import { useUsers } from "../hooks/useEmployees";
  9 | 
 10 | type Tab = "events" | "crews" | "analytics";
 11 | 
 12 | export default function CityProfile() {
 13 |   const { id } = useParams();
 14 |   const { data: city, isLoading } = useCity(id);
 15 |   const { data: users = [] } = useUsers();
 16 |   const createCrew = useCreateCrew(id);
 17 |   const deleteCrew = useDeleteCrew(id);
 18 | 
 19 |   const [activeTab, setActiveTab] = useState<Tab>("crews");
 20 |   const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
 21 |   const [isCreateCrewModalOpen, setIsCreateCrewModalOpen] = useState(false);
 22 |   const [crewForm, setCrewForm] = useState({
 23 |     name: "",
 24 |     hostId: "",
 25 |     driverId: "",
 26 |   });
 27 | 
 28 |   const handleCreateCrew = (e: React.FormEvent) => {
 29 |     e.preventDefault();
 30 |     if (!crewForm.hostId || !crewForm.driverId) return alert("Оберіть ведучого та водія!");
 31 |     setIsCreateCrewModalOpen(false); // закриваємо одразу
 32 |     createCrew.mutate(crewForm);
 33 |   };
 34 | 
 35 |   const handleDeleteCrew = (crewId: string) => {
 36 |     if (!window.confirm("Видалити екіпаж?")) return;
 37 |     deleteCrew.mutate(crewId); // UI оновлюється миттєво через onMutate
 38 |   };
 39 | 
 40 |   if (isLoading)
 41 |     return <div className="p-8 text-slate-500">Завантаження...</div>;
 42 |   if (!city) return <div className="p-8 text-slate-500">Місто не знайдено</div>;
 43 | 
 44 |   const completedEvents: Event[] = city.events || [];
 45 |   const crews: Crew[] = city.crews || [];
 46 |   const manager = city.manager;
 47 | 
 48 |   // Знаходимо вільних людей (які не закріплені за іншим екіпажем)
 49 |   const busyUserIds = crews.flatMap((c: any) => [c.hostId, c.driverId]);
 50 |   const availableHosts = users.filter(
 51 |     (u) =>
 52 |       u.role === "HOST" &&
 53 |       u.city?.id === city.id &&
 54 |       !busyUserIds.includes(u.id),
 55 |   );
 56 |   const availableDrivers = users.filter(
 57 |     (u) =>
 58 |       u.role === "DRIVER" &&
 59 |       u.city?.id === city.id &&
 60 |       !busyUserIds.includes(u.id),
 61 |   );
 62 | 
 63 |   const totalChildren = completedEvents.reduce(
 64 |     (sum, ev) => sum + (ev.report?.childrenCount || ev.childrenPlanned || 0),
 65 |     0,
 66 |   );
 67 |   const totalRevenue = completedEvents.reduce(
 68 |     (sum, ev) => sum + (ev.report?.totalSum || ev.price || 0),
 69 |     0,
 70 |   );
 71 |   const totalProfit = completedEvents.reduce(
 72 |     (sum, ev) => sum + (ev.report?.remainderSum || 0),
 73 |     0,
 74 |   );
 75 |   const fmt = (n: number) =>
 76 |     new Intl.NumberFormat("uk-UA").format(Math.round(n));
 77 | 
 78 |   const TABS: { key: Tab; label: string; icon: string }[] = [
 79 |     { key: "events", label: "Події", icon: "📅" },
 80 |     { key: "crews", label: "Екіпажі", icon: "🚐" },
 81 |     { key: "analytics", label: "Аналітика", icon: "📊" },
 82 |   ];
 83 | 
 84 |   return (
 85 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
 86 |       <div className="text-sm text-slate-500 mb-6">
 87 |         <Link to="/cities" className="hover:text-blue-600 transition-colors">
 88 |           Міста
 89 |         </Link>
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
101 |               <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
102 |                 Менеджер
103 |               </p>
104 |               <p className="font-bold text-slate-800">{manager?.name ?? "—"}</p>
105 |               <p className="text-sm text-slate-500">
106 |                 <PhoneLink phone={manager?.phone} />
107 |               </p>
108 |             </div>
109 |           </div>
110 |           <div className="hidden md:block w-px h-16 bg-slate-100" />
111 |           <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 sm:gap-8 flex-1">
112 |             <Stat label="Закладів" value={city.schools?.length ?? 0} />
113 |             <Stat label="Проведено подій" value={completedEvents.length} />
114 |             <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
115 |             <Stat label="Виручка" value={`${fmt(totalRevenue)} грн`} />
116 |             <Stat label="Прибуток" value={`${fmt(totalProfit)} грн`} />
117 |           </div>
118 |         </div>
119 |       </div>
120 | 
121 |       <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-6">
122 |         {TABS.map((tab) => (
123 |           <button
124 |             key={tab.key}
125 |             onClick={() => setActiveTab(tab.key)}
126 |             className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
127 |               activeTab === tab.key
128 |                 ? "bg-blue-600 text-white shadow-sm"
129 |                 : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
130 |             }`}
131 |           >
132 |             <span>{tab.icon}</span>{" "}
133 |             <span className="truncate">{tab.label}</span>
134 |           </button>
135 |         ))}
136 |       </div>
137 | 
138 |       {activeTab === "events" && (
139 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
140 |           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
141 |             <h3 className="font-bold text-slate-800">
142 |               Завершені події ({completedEvents.length})
143 |             </h3>
144 |           </div>
145 |           {completedEvents.length === 0 ? (
146 |             <div className="p-12 text-center text-slate-400">
147 |               <p className="text-4xl mb-3">📭</p>
148 |               <p className="font-medium">Завершених подій ще немає</p>
149 |             </div>
150 |           ) : (
151 |             <>
152 |               <div className="md:hidden divide-y divide-slate-50">
153 |                 {completedEvents.map((ev) => (
154 |                   <div
155 |                     key={ev.id}
156 |                     onClick={() => setSelectedReportEvent(ev)}
157 |                     className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
158 |                   >
159 |                     <div className="min-w-0">
160 |                       <p className="font-medium text-blue-600 truncate">
161 |                         {ev.school?.name}
162 |                       </p>
163 |                       <p className="text-xs text-slate-400 mt-0.5">
164 |                         {ev.project} ·{" "}
165 |                         {new Date(ev.date).toLocaleDateString("uk-UA")}
166 |                       </p>
167 |                       <p className="text-xs text-slate-500 mt-1">
168 |                         👶{" "}
169 |                         {ev.report?.childrenCount || ev.childrenPlanned || "—"}{" "}
170 |                         дітей
171 |                       </p>
172 |                     </div>
173 |                     <div className="text-right shrink-0">
174 |                       <p className="font-semibold text-slate-800 text-sm">
175 |                         {fmt(ev.report?.totalSum || ev.price || 0)} грн
176 |                       </p>
177 |                       <p className="text-xs font-medium text-emerald-600 mt-0.5">
178 |                         +{fmt(ev.report?.remainderSum || 0)} грн
179 |                       </p>
180 |                     </div>
181 |                   </div>
182 |                 ))}
183 |               </div>
184 |               <div className="hidden md:block overflow-x-auto">
185 |                 <table className="w-full text-left text-sm">
186 |                   <thead>
187 |                     <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
188 |                       <th className="p-4">Заклад</th>
189 |                       <th className="p-4">Проєкт</th>
190 |                       <th className="p-4">Дата</th>
191 |                       <th className="p-4">Дітей</th>
192 |                       <th className="p-4">Виручка</th>
193 |                       <th className="p-4">Прибуток</th>
194 |                     </tr>
195 |                   </thead>
196 |                   <tbody>
197 |                     {completedEvents.map((ev) => (
198 |                       <tr
199 |                         key={ev.id}
200 |                         onClick={() => setSelectedReportEvent(ev)}
201 |                         className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
202 |                       >
203 |                         <td className="p-4">
204 |                           <span className="font-medium text-blue-600">
205 |                             {ev.school?.name}
206 |                           </span>
207 |                           <p className="text-xs text-slate-400">
208 |                             {ev.school?.type}
209 |                           </p>
210 |                         </td>
211 |                         <td className="p-4 text-slate-700">{ev.project}</td>
212 |                         <td className="p-4 text-slate-600">
213 |                           {new Date(ev.date).toLocaleDateString("uk-UA")}
214 |                         </td>
215 |                         <td className="p-4 font-medium">
216 |                           {ev.report?.childrenCount ||
217 |                             ev.childrenPlanned ||
218 |                             "—"}
219 |                         </td>
220 |                         <td className="p-4 font-medium text-slate-800">
221 |                           {fmt(ev.report?.totalSum || ev.price || 0)} грн
222 |                         </td>
223 |                         <td className="p-4 font-medium text-emerald-600">
224 |                           {fmt(ev.report?.remainderSum || 0)} грн
225 |                         </td>
226 |                       </tr>
227 |                     ))}
228 |                   </tbody>
229 |                 </table>
230 |               </div>
231 |             </>
232 |           )}
233 |         </div>
234 |       )}
235 | 
236 |       {/* Вкладка ЕКІПАЖІ з новим дизайном */}
237 |       {activeTab === "crews" && (
238 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
239 |           <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
240 |             <h3 className="text-xl font-bold text-slate-800">
241 |               Екіпажі - {city.name}
242 |             </h3>
243 |             <button
244 |               onClick={() => {
245 |                 setCrewForm({
246 |                   name: `Екіпаж №${crews.length + 1}`,
247 |                   hostId: "",
248 |                   driverId: "",
249 |                 });
250 |                 setIsCreateCrewModalOpen(true);
251 |               }}
252 |               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
253 |             >
254 |               + Додати екіпаж
255 |             </button>
256 |           </div>
257 | 
258 |           {crews.length === 0 ? (
259 |             <div className="p-12 text-center text-slate-400">
260 |               <p className="text-4xl mb-3">🚐</p>
261 |               <p className="font-medium">Екіпажів ще немає</p>
262 |             </div>
263 |           ) : (
264 |             <>
265 |               {/* Мобільний вигляд */}
266 |               <div className="md:hidden divide-y divide-slate-50">
267 |                 {crews.map((crew: any) => {
268 |                   const hostObj = users.find((u) => u.id === crew.hostId);
269 |                   const driverObj = users.find((u) => u.id === crew.driverId);
270 |                   const carName = crew.car
271 |                     ? crew.car.split("(")[0].trim()
272 |                     : "—";
273 |                   const carPlate = crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
274 |                   const eventsCount =
275 |                     city.events?.filter((e: any) => e.crewId === crew.id)
276 |                       .length || 0;
277 | 
278 |                   return (
279 |                     <div key={crew.id} className="p-4">
280 |                       <div className="flex justify-between items-start mb-3">
281 |                         <div className="flex items-center gap-3">
282 |                           <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-200">
283 |                             <OptimizedImage
284 |                               src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
285 |                               alt="van"
286 |                               className="w-full h-full object-cover"
287 |                             />
288 |                           </div>
289 |                           <p className="font-bold text-slate-800">
290 |                             {crew.name}
291 |                           </p>
292 |                         </div>
293 |                         <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded text-xs font-medium">
294 |                           Активний
295 |                         </span>
296 |                       </div>
297 | 
298 |                       <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
299 |                         <div>
300 |                           <p className="font-medium text-slate-800">
301 |                             {hostObj?.name || crew.host?.name || "—"}
302 |                           </p>
303 |                           <p className="text-slate-500 mt-0.5">
304 |                             {hostObj?.phone || "—"}
305 |                           </p>
306 |                         </div>
307 |                         <div>
308 |                           <p className="font-medium text-slate-800">
309 |                             {driverObj?.name || crew.driver?.name || "—"}
310 |                           </p>
311 |                           <p className="text-slate-500 mt-0.5">
312 |                             {driverObj?.phone || "—"}
313 |                           </p>
314 |                         </div>
315 |                         <div>
316 |                           <p className="font-medium text-slate-800">
317 |                             {carName}
318 |                           </p>
319 |                           {carPlate && (
320 |                             <p className="text-slate-500 mt-0.5">{carPlate}</p>
321 |                           )}
322 |                         </div>
323 |                         <div>
324 |                           <p className="text-slate-500">
325 |                             Подій:{" "}
326 |                             <span className="font-bold text-slate-800">
327 |                               {eventsCount}
328 |                             </span>
329 |                           </p>
330 |                         </div>
331 |                       </div>
332 |                       <button
333 |                         onClick={() => handleDeleteCrew(crew.id)}
334 |                         className="w-full mt-4 py-2 border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium transition-colors"
335 |                       >
336 |                         Видалити екіпаж
337 |                       </button>
338 |                     </div>
339 |                   );
340 |                 })}
341 |               </div>
342 | 
343 |               {/* Десктоп таблиця як на дизайні */}
344 |               <div className="hidden md:block overflow-x-auto">
345 |                 <table className="w-full text-left text-sm">
346 |                   <thead>
347 |                     <tr className="bg-white border-b border-slate-100 text-slate-800 font-bold">
348 |                       <th className="p-5">Екіпаж</th>
349 |                       <th className="p-5">Ведучий</th>
350 |                       <th className="p-5">Водій</th>
351 |                       <th className="p-5">Авто</th>
352 |                       <th className="p-5">Статус</th>
353 |                       <th className="p-5 text-center">Подій (міс.)</th>
354 |                       <th className="p-5 text-center">Дія</th>
355 |                     </tr>
356 |                   </thead>
357 |                   <tbody>
358 |                     {crews.map((crew: any) => {
359 |                       // Знаходимо реальні об'єкти юзерів, щоб витягнути телефони
360 |                       const hostObj = users.find((u) => u.id === crew.hostId);
361 |                       const driverObj = users.find(
362 |                         (u) => u.id === crew.driverId,
363 |                       );
364 | 
365 |                       // Парсимо авто (Назва та Номер)
366 |                       const carName = crew.car
367 |                         ? crew.car.split("(")[0].trim()
368 |                         : "—";
369 |                       const carPlate =
370 |                         crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
371 | 
372 |                       // Рахуємо події
373 |                       const eventsCount =
374 |                         city.events?.filter((e: any) => e.crewId === crew.id)
375 |                           .length || 0;
376 | 
377 |                       return (
378 |                         <tr
379 |                           key={crew.id}
380 |                           className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
381 |                         >
382 |                           <td className="p-5">
383 |                             <div className="flex items-center gap-3">
384 |                               {/* Універсальна фотографія буса */}
385 |                               <div className="w-[60px] h-[40px] rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-sm">
386 |                                 <OptimizedImage
387 |                                   src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
388 |                                   alt="van"
389 |                                   className="w-full h-full object-cover"
390 |                                 />
391 |                               </div>
392 |                               <span className="font-bold text-slate-800">
393 |                                 {crew.name}
394 |                               </span>
395 |                             </div>
396 |                           </td>
397 |                           <td className="p-5">
398 |                             <div className="font-medium text-slate-800">
399 |                               {hostObj?.name || crew.host?.name || "—"}
400 |                             </div>
401 |                             <div className="text-xs text-slate-500 mt-1 tracking-wide">
402 |                               {hostObj?.phone || "—"}
403 |                             </div>
404 |                           </td>
405 |                           <td className="p-5">
406 |                             <div className="font-medium text-slate-800">
407 |                               {driverObj?.name || crew.driver?.name || "—"}
408 |                             </div>
409 |                             <div className="text-xs text-slate-500 mt-1 tracking-wide">
410 |                               {driverObj?.phone || "—"}
411 |                             </div>
412 |                           </td>
413 |                           <td className="p-5">
414 |                             <div className="font-medium text-slate-600">
415 |                               {carName}
416 |                             </div>
417 |                             {carPlate ? (
418 |                               <div className="text-xs text-slate-500 mt-1 tracking-wider">
419 |                                 {carPlate}
420 |                               </div>
421 |                             ) : (
422 |                               <div className="text-xs text-slate-400 mt-1">
423 |                                 —
424 |                               </div>
425 |                             )}
426 |                           </td>
427 |                           <td className="p-5">
428 |                             <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
429 |                               Активний
430 |                             </span>
431 |                           </td>
432 |                           <td className="p-5 text-center font-bold text-slate-800 text-base">
433 |                             {eventsCount}
434 |                           </td>
435 |                           <td className="p-5 text-center">
436 |                             <button
437 |                               onClick={() => handleDeleteCrew(crew.id)}
438 |                               className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50"
439 |                               title="Видалити екіпаж"
440 |                             >
441 |                               🗑
442 |                             </button>
443 |                           </td>
444 |                         </tr>
445 |                       );
446 |                     })}
447 |                   </tbody>
448 |                 </table>
449 |               </div>
450 |             </>
451 |           )}
452 |         </div>
453 |       )}
454 | 
455 |       {activeTab === "analytics" && (
456 |         <Suspense fallback={<div className="bg-white rounded-2xl h-64 animate-pulse border border-slate-100" />}>
457 |           <CityAnalytics events={completedEvents} />
458 |         </Suspense>
459 |       )}
460 | 
461 |       {/* Модалка створення екіпажу */}
462 |       {isCreateCrewModalOpen && (
463 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
464 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
465 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50">
466 |               <h3 className="text-xl font-bold text-slate-800">Новий екіпаж</h3>
467 |               <button
468 |                 onClick={() => setIsCreateCrewModalOpen(false)}
469 |                 className="text-slate-400 hover:text-slate-600 text-lg leading-none"
470 |               >
471 |                 ✕
472 |               </button>
473 |             </div>
474 |             <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
475 |               <div>
476 |                 <label className="block text-sm font-medium text-slate-700 mb-1">
477 |                   Назва екіпажу
478 |                 </label>
479 |                 <input
480 |                   type="text"
481 |                   value={crewForm.name}
482 |                   onChange={(e) =>
483 |                     setCrewForm({ ...crewForm, name: e.target.value })
484 |                   }
485 |                   className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
486 |                   required
487 |                 />
488 |               </div>
489 |               <div>
490 |                 <label className="block text-sm font-medium text-slate-700 mb-1">
491 |                   Ведучий
492 |                 </label>
493 |                 <select
494 |                   value={crewForm.hostId}
495 |                   onChange={(e) =>
496 |                     setCrewForm({ ...crewForm, hostId: e.target.value })
497 |                   }
498 |                   required
499 |                   className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
500 |                 >
501 |                   <option value="" disabled>
502 |                     Оберіть ведучого
503 |                   </option>
504 |                   {availableHosts.map((h) => (
505 |                     <option key={h.id} value={h.id}>
506 |                       {h.name}
507 |                     </option>
508 |                   ))}
509 |                 </select>
510 |                 <p className="text-xs text-emerald-600 mt-1">
511 |                   ✓ Доступно: {availableHosts.length} вільних
512 |                 </p>
513 |               </div>
514 |               <div>
515 |                 <label className="block text-sm font-medium text-slate-700 mb-1">
516 |                   Водій
517 |                 </label>
518 |                 <select
519 |                   value={crewForm.driverId}
520 |                   onChange={(e) =>
521 |                     setCrewForm({ ...crewForm, driverId: e.target.value })
522 |                   }
523 |                   required
524 |                   className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
525 |                 >
526 |                   <option value="" disabled>
527 |                     Оберіть водія
528 |                   </option>
529 |                   {availableDrivers.map((d) => (
530 |                     <option key={d.id} value={d.id}>
531 |                       {d.name} {d.car ? `(🚗 ${d.car})` : ""}
532 |                     </option>
533 |                   ))}
534 |                 </select>
535 |                 <p className="text-xs text-emerald-600 mt-1">
536 |                   ✓ Доступно: {availableDrivers.length} вільних
537 |                 </p>
538 |               </div>
539 |               <div className="flex gap-3 pt-2 mt-4">
540 |                 <button
541 |                   type="button"
542 |                   onClick={() => setIsCreateCrewModalOpen(false)}
543 |                   className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors"
544 |                 >
545 |                   Скасувати
546 |                 </button>
547 |                 <button
548 |                   type="submit"
549 |                   className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
550 |                 >
551 |                   Створити
552 |                 </button>
553 |               </div>
554 |             </form>
555 |           </div>
556 |         </div>
557 |       )}
558 | 
559 |       {/* Модальне вікно Звіту */}
560 |       <CompletedEventModal
561 |         isOpen={!!selectedReportEvent}
562 |         onClose={() => setSelectedReportEvent(null)}
563 |         event={selectedReportEvent}
564 |       />
565 |     </div>
566 |   );
567 | }
568 | 
569 | function Stat({ label, value }: { label: string; value: string | number }) {
570 |   return (
571 |     <div>
572 |       <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
573 |       <p className="text-2xl font-bold text-slate-800">{value}</p>
574 |     </div>
575 |   );
576 | }
577 | 
578 | function CompletedEventModal({
579 |   isOpen,
580 |   onClose,
581 |   event,
582 | }: {
583 |   isOpen: boolean;
584 |   onClose: () => void;
585 |   event: any;
586 | }) {
587 |   if (!isOpen || !event) return null;
588 |   const fmt = (n: number) =>
589 |     new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
590 |   const report = event.report;
591 | 
592 |   return (
593 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
594 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
595 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
596 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
597 |           <div>
598 |             <h3 className="text-xl font-bold text-slate-800">
599 |               Звіт: {event.project}
600 |             </h3>
601 |             <p className="text-sm text-slate-500 mt-1">
602 |               {event.school?.name} ·{" "}
603 |               {new Date(event.date).toLocaleDateString("uk-UA")}
604 |             </p>
605 |           </div>
606 |           <button
607 |             onClick={onClose}
608 |             className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
609 |           >
610 |             ✕
611 |           </button>
612 |         </div>
613 |         <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
614 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
615 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
616 |               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
617 |                 <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
618 |                   📊
619 |                 </span>
620 |                 Результати
621 |               </h4>
622 |               <div className="space-y-3 text-sm">
623 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
624 |                   <span className="text-slate-500">Дітей (факт):</span>
625 |                   <span className="font-bold">
626 |                     {report?.childrenCount || 0}
627 |                   </span>
628 |                 </div>
629 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
630 |                   <span className="text-slate-500">Класів:</span>
631 |                   <span className="font-medium">
632 |                     {report?.classesCount || 0}
633 |                   </span>
634 |                 </div>
635 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
636 |                   <span className="text-slate-500">Пільговиків:</span>
637 |                   <span className="font-medium">
638 |                     {report?.privilegedCount || 0}
639 |                   </span>
640 |                 </div>
641 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
642 |                   <span className="text-slate-500">Сеансів:</span>
643 |                   <span className="font-medium">
644 |                     {report?.showingsCount || 0}
645 |                   </span>
646 |                 </div>
647 |                 <div className="flex justify-between pb-1">
648 |                   <span className="text-slate-500">Оцінка:</span>
649 |                   <span className="font-bold text-amber-500">
650 |                     ⭐ {report?.rating || 0}/10
651 |                   </span>
652 |                 </div>
653 |               </div>
654 |             </div>
655 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
656 |               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
657 |                 <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
658 |                   💰
659 |                 </span>
660 |                 Фінанси
661 |               </h4>
662 |               <div className="space-y-3 text-sm">
663 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
664 |                   <span className="text-slate-500">Загальна виручка:</span>
665 |                   <span className="font-bold">{fmt(report?.totalSum)} грн</span>
666 |                 </div>
667 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
668 |                   <span className="text-slate-500">На заклад (20%):</span>
669 |                   <span className="font-medium text-rose-500">
670 |                     − {fmt(report?.schoolSum)} грн
671 |                   </span>
672 |                 </div>
673 |                 {Array.isArray(report?.expenses) &&
674 |                   report.expenses.length > 0 && (
675 |                     <div className="py-2 border-b border-slate-50">
676 |                       <span className="text-slate-500 block mb-2">
677 |                         Додаткові витрати:
678 |                       </span>
679 |                       {report.expenses.map((exp: any, i: number) => (
680 |                         <div
681 |                           key={i}
682 |                           className="flex justify-between text-xs mb-1 pl-2"
683 |                         >
684 |                           <span className="text-slate-400">
685 |                             — {exp.name || exp.category}
686 |                           </span>
687 |                           <span className="text-rose-500 font-medium">
688 |                             − {fmt(exp.amount)} грн
689 |                           </span>
690 |                         </div>
691 |                       ))}
692 |                     </div>
693 |                   )}
694 |                 <div className="flex justify-between pt-1">
695 |                   <span className="font-bold text-slate-800">
696 |                     Чистий прибуток:
697 |                   </span>
698 |                   <span className="font-bold text-emerald-600 text-base">
699 |                     {fmt(report?.remainderSum)} грн
700 |                   </span>
701 |                 </div>
702 |               </div>
703 |             </div>
704 |           </div>
705 |           <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
706 |             <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
707 |               <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
708 |                 ⏳
709 |               </span>
710 |               Історія пайплайну
711 |             </h4>
712 |             {!event.history || event.history.length === 0 ? (
713 |               <p className="text-sm text-slate-400 text-center py-4">
714 |                 Історія порожня.
715 |               </p>
716 |             ) : (
717 |               <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
718 |                 {[...event.history]
719 |                   .sort(
720 |                     (a, b) =>
721 |                       new Date(a.createdAt).getTime() -
722 |                       new Date(b.createdAt).getTime(),
723 |                   )
724 |                   .map((item: any) => (
725 |                     <div key={item.id} className="relative pl-8 text-sm">
726 |                       <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
727 |                       <p className="font-semibold text-slate-800">
728 |                         {item.action}
729 |                       </p>
730 |                       <p className="text-[11px] text-slate-400 mt-0.5">
731 |                         {new Date(item.createdAt).toLocaleString("uk-UA", {
732 |                           day: "2-digit",
733 |                           month: "2-digit",
734 |                           hour: "2-digit",
735 |                           minute: "2-digit",
736 |                         })}{" "}
737 |                         · 👤 {item.userName}
738 |                       </p>
739 |                       {item.comment && (
740 |                         <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">
741 |                           {item.comment}
742 |                         </div>
743 |                       )}
744 |                     </div>
745 |                   ))}
746 |               </div>
747 |             )}
748 |           </div>
749 |         </div>
750 |       </div>
751 |     </div>
752 |   );
753 | }
754 | 
```

### File: apps/frontend/src/pages/Dashboard.tsx
```tsx
  0 | import { Suspense, lazy } from "react";
  1 | import { Link } from "react-router-dom";
  2 | import { useQuery } from "@tanstack/react-query";
  3 | import { api } from "../config/api";
  4 | import { useSelectedCity } from "../context/CityContext";
  5 | import { useAuth } from "../hooks/useAuth";
  6 | const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
  7 | const FunnelBar = lazy(() => import("../components/dashboard/FunnelBar"));
  8 | const TodayEvents = lazy(() => import("../components/dashboard/TodayEvents"));
  9 | const UpcomingEvents = lazy(() => import("../components/dashboard/UpcomingEvents"));
 10 | const StaleSchools = lazy(() => import("../components/dashboard/StaleSchools"));
 11 | const MonthlyKpi = lazy(() => import("../components/dashboard/MonthlyKpi"));
 12 | const ActivityFeed = lazy(() => import("../components/dashboard/ActivityFeed"));
 13 | const CitiesTable = lazy(() => import("../components/dashboard/CitiesTable"));
 14 | 
 15 | interface DashboardSummary {
 16 |   todayEvents: any[];
 17 |   upcomingEvents: any[];
 18 |   funnel: Record<string, number>;
 19 |   totalSchools: number;
 20 |   monthlyKpi: {
 21 |     revenue: number;
 22 |     profit: number;
 23 |     children: number;
 24 |     count: number;
 25 |   };
 26 |   staleSchools: {
 27 |     id: string;
 28 |     name: string;
 29 |     status: string | null;
 30 |     lastActivity: string | null;
 31 |     daysStale: number | null;
 32 |   }[];
 33 |   activityFeed: {
 34 |     id: string;
 35 |     userName: string;
 36 |     role: string;
 37 |     action: string;
 38 |     comment: string | null;
 39 |     createdAt: string;
 40 |     schoolId: string | null;
 41 |     schoolName: string | null;
 42 |     eventId: string | null;
 43 |   }[];
 44 |   citiesStats: {
 45 |     cityId: string;
 46 |     cityName: string;
 47 |     schoolsCount: number;
 48 |     activeEvents: number;
 49 |     monthRevenue: number;
 50 |   }[];
 51 | }
 52 | 
 53 | // ── Skeleton компоненти ──────────────────────────────────────────────────────
 54 | 
 55 | function SkeletonCard({ className = "" }: { className?: string }) {
 56 |   return (
 57 |     <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse ${className}`}>
 58 |       <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
 59 |       <div className="space-y-2">
 60 |         <div className="h-3 bg-slate-100 rounded-full w-full" />
 61 |         <div className="h-3 bg-slate-100 rounded-full w-4/5" />
 62 |         <div className="h-3 bg-slate-100 rounded-full w-3/5" />
 63 |       </div>
 64 |     </div>
 65 |   );
 66 | }
 67 | 
 68 | function SkeletonEventCard() {
 69 |   return (
 70 |     <div className="bg-white rounded-xl border border-slate-100 p-3 animate-pulse">
 71 |       <div className="flex justify-between mb-2">
 72 |         <div className="h-5 bg-slate-100 rounded w-16" />
 73 |         <div className="h-4 bg-slate-100 rounded w-24" />
 74 |       </div>
 75 |       <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
 76 |       <div className="flex justify-between items-center">
 77 |         <div className="h-5 bg-slate-100 rounded-full w-28" />
 78 |         <div className="h-7 bg-slate-100 rounded-lg w-20" />
 79 |       </div>
 80 |     </div>
 81 |   );
 82 | }
 83 | 
 84 | function DashboardSkeleton({ isSuperAdmin }: { isSuperAdmin: boolean }) {
 85 |   return (
 86 |     <div className="flex flex-col gap-6">
 87 |       {/* IssueCarousel placeholder */}
 88 |       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse h-24" />
 89 | 
 90 |       {/* Сьогодні + Потребують уваги */}
 91 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 92 |         {/* TodayEvents */}
 93 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
 94 |           <div className="flex justify-between mb-3">
 95 |             <div>
 96 |               <div className="h-4 bg-slate-100 rounded w-36 mb-1" />
 97 |               <div className="h-3 bg-slate-100 rounded w-28" />
 98 |             </div>
 99 |             <div className="h-4 bg-slate-100 rounded w-16" />
100 |           </div>
101 |           <div className="flex flex-col gap-2">
102 |             <SkeletonEventCard />
103 |             <SkeletonEventCard />
104 |           </div>
105 |         </div>
106 | 
107 |         {/* StaleSchools */}
108 |         <SkeletonCard />
109 |         {/* UpcomingEvents */}
110 |         <SkeletonCard />
111 |       </div>
112 | 
113 |       <hr className="border-slate-200" />
114 | 
115 |       {/* KPI + Воронка */}
116 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
117 |         <SkeletonCard />
118 |         <SkeletonCard />
119 |       </div>
120 | 
121 |       {/* Activity + Cities */}
122 |       <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
123 |         <SkeletonCard className="min-h-[200px]" />
124 |         {isSuperAdmin && <SkeletonCard className="min-h-[200px]" />}
125 |       </div>
126 |     </div>
127 |   );
128 | }
129 | 
130 | // ── Dashboard ────────────────────────────────────────────────────────────────
131 | 
132 | export default function Dashboard() {
133 |   const { selectedCity } = useSelectedCity();
134 |   const { user } = useAuth();
135 | 
136 |   const isSuperAdmin = user?.role === "SUPERADMIN";
137 | 
138 |   const { data: summary, isLoading } = useQuery<DashboardSummary>({
139 |     queryKey: ["dashboardSummary", selectedCity.id],
140 |     queryFn: async () => {
141 |       const params = selectedCity.id ? `?cityId=${selectedCity.id}` : "";
142 |       const res = await api.get(`/dashboard/summary${params}`);
143 |       return res.data;
144 |     },
145 |     enabled: Boolean(selectedCity.id || isSuperAdmin),
146 |   });
147 | 
148 |   if (!selectedCity.id && !isSuperAdmin) {
149 |     return (
150 |       <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
151 |         <div className="mb-6">
152 |           <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
153 |           <p className="text-sm text-slate-500 mt-1">📍 Оберіть місто</p>
154 |         </div>
155 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
156 |           <p className="text-4xl mb-3">📍</p>
157 |           <p className="font-semibold text-slate-700 mb-2">Місто не обрано</p>
158 |           <p className="text-sm text-slate-500 mb-4">
159 |             Оберіть місто у розділі «Міста», щоб бачити активність
160 |           </p>
161 |           <Link
162 |             to="/cities"
163 |             className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
164 |           >
165 |             Перейти до міст
166 |           </Link>
167 |         </div>
168 |       </div>
169 |     );
170 |   }
171 | 
172 |   return (
173 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
174 |       {/* Шапка */}
175 |       <div className="mb-6">
176 |         <h1 className="text-2xl font-bold text-slate-800">
177 |           Дашборд
178 |           {selectedCity.name && (
179 |             <span className="ml-2 text-base font-normal text-blue-500">
180 |               · {selectedCity.name}
181 |             </span>
182 |           )}
183 |           {isSuperAdmin && !selectedCity.name && (
184 |             <span className="ml-2 text-base font-normal text-purple-500">
185 |               · Усі міста
186 |             </span>
187 |           )}
188 |         </h1>
189 |         <p className="text-xs text-slate-400 mt-1">
190 |           {new Date().toLocaleDateString("uk-UA", {
191 |             weekday: "long",
192 |             day: "numeric",
193 |             month: "long",
194 |             year: "numeric",
195 |           })}
196 |         </p>
197 |       </div>
198 | 
199 |       {isLoading ? (
200 |         <DashboardSkeleton isSuperAdmin={isSuperAdmin} />
201 |       ) : summary ? (
202 |         <div className="flex flex-col gap-6">
203 |           {/* ── ЗОНА ДІЇ ── */}
204 |           <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse border border-slate-100" />}>
205 |             <IssueCarousel />
206 |           </Suspense>
207 | 
208 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
209 |             <Suspense fallback={<SkeletonCard />}>
210 |               <TodayEvents events={summary.todayEvents} />
211 |             </Suspense>
212 |             <Suspense fallback={<SkeletonCard />}>
213 |               <StaleSchools schools={summary.staleSchools} />
214 |             </Suspense>
215 |             <Suspense fallback={<SkeletonCard />}>
216 |               <UpcomingEvents events={summary.upcomingEvents} />
217 |             </Suspense>
218 |           </div>
219 | 
220 |           <hr className="border-slate-200" />
221 | 
222 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
223 |             <Suspense fallback={<SkeletonCard />}>
224 |               <MonthlyKpi kpi={summary.monthlyKpi} />
225 |             </Suspense>
226 |             <Suspense fallback={<SkeletonCard />}>
227 |               <FunnelBar funnel={summary.funnel} />
228 |             </Suspense>
229 |           </div>
230 | 
231 |           <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
232 |             <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
233 |               <ActivityFeed items={summary.activityFeed} />
234 |             </Suspense>
235 |             {isSuperAdmin && summary.citiesStats.length > 0 && (
236 |               <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
237 |                 <CitiesTable rows={summary.citiesStats} />
238 |               </Suspense>
239 |             )}
240 |           </div>
241 |         </div>
242 |       ) : (
243 |         <div className="text-center py-20 text-slate-400 text-sm">
244 |           Не вдалося завантажити дані
245 |         </div>
246 |       )}
247 |     </div>
248 |   );
249 | }
```

### File: apps/frontend/src/pages/Employees.tsx
```tsx
  0 | import { useState } from "react";
  1 | import { motion, AnimatePresence } from "framer-motion";
  2 | import {
  3 |   useUsers,
  4 |   useProjects,
  5 |   useCreateUser,
  6 |   useUpdateUser,
  7 |   useDeleteUser,
  8 |   useCreateProject,
  9 |   useDeleteProject,
 10 | } from "../hooks/useEmployees";
 11 | import { useCities } from "../hooks/useCities";
 12 | import PhoneLink from "../components/PhoneLink";
 13 | import { useSelectedCity } from "../context/CityContext";
 14 | 
 15 | type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
 16 | 
 17 | interface City {
 18 |   id: string;
 19 |   name: string;
 20 | }
 21 | interface User {
 22 |   id: string;
 23 |   name: string;
 24 |   phone: string | null;
 25 |   email: string;
 26 |   cityId: string | null;
 27 |   city?: City;
 28 |   role: Role;
 29 |   telegramId?: string | null;
 30 |   car?: string | null;
 31 | }
 32 | interface Project {
 33 |   id: string;
 34 |   name: string;
 35 |   color: string;
 36 | }
 37 | 
 38 | const ROLE_LABELS: Record<string, string> = {
 39 |   MANAGER: "Менеджер",
 40 |   DRIVER: "Водій",
 41 |   HOST: "Ведучий",
 42 |   SUPERADMIN: "Суперадмін",
 43 |   GUEST: "Гість",
 44 | };
 45 | const ROLE_COLORS: Record<string, string> = {
 46 |   MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
 47 |   DRIVER: "bg-emerald-50 text-emerald-700 border-emerald-200",
 48 |   HOST: "bg-violet-50 text-violet-700 border-violet-200",
 49 | };
 50 | const ROLE_HEADER_COLORS: Record<string, string> = {
 51 |   MANAGER: "bg-blue-600",
 52 |   DRIVER: "bg-emerald-600",
 53 |   HOST: "bg-violet-600",
 54 | };
 55 | const EMPTY_FORM = {
 56 |   fullName: "",
 57 |   phone: "",
 58 |   email: "",
 59 |   cityId: "",
 60 |   role: "MANAGER" as Role,
 61 |   password: "",
 62 |   telegramId: "",
 63 |   car: "",
 64 | };
 65 | 
 66 | const PROJECT_COLORS: Record<string, string> = {
 67 |   blue: "bg-blue-500",
 68 |   emerald: "bg-emerald-500",
 69 |   rose: "bg-rose-500",
 70 |   red: "bg-red-500",
 71 |   amber: "bg-amber-500",
 72 |   purple: "bg-purple-500",
 73 | };
 74 | 
 75 | function EmployeesSkeleton() {
 76 |   return (
 77 |     <div className="p-4 md:p-8 animate-pulse">
 78 |       <div className="flex justify-between items-center mb-8">
 79 |         <div>
 80 |           <div className="h-7 w-56 bg-slate-200 rounded-lg mb-2" />
 81 |           <div className="h-4 w-72 bg-slate-100 rounded" />
 82 |         </div>
 83 |         <div className="h-10 w-44 bg-slate-200 rounded-lg" />
 84 |       </div>
 85 |       {["Менеджери", "Водії", "Ведучі"].map((label) => (
 86 |         <div key={label} className="mb-8">
 87 |           <div className="flex items-center gap-3 mb-4">
 88 |             <div className="w-1 h-6 bg-slate-200 rounded-full" />
 89 |             <div className="h-5 w-24 bg-slate-200 rounded" />
 90 |             <div className="h-5 w-8 bg-slate-100 rounded-full" />
 91 |           </div>
 92 |           <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
 93 |             <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex gap-8">
 94 |               {["w-24", "w-20", "w-28", "w-16", "w-12"].map((w, i) => (
 95 |                 <div key={i} className={`h-3 ${w} bg-slate-200 rounded`} />
 96 |               ))}
 97 |             </div>
 98 |             {[1, 2].map((i) => (
 99 |               <div
100 |                 key={i}
101 |                 className="flex items-center gap-8 px-5 py-4 border-b border-slate-50"
102 |               >
103 |                 <div className="flex items-center gap-3">
104 |                   <div className="w-8 h-8 rounded-full bg-slate-200" />
105 |                   <div className="h-4 w-28 bg-slate-200 rounded" />
106 |                 </div>
107 |                 <div className="h-4 w-20 bg-slate-100 rounded" />
108 |                 <div className="h-4 w-36 bg-slate-100 rounded" />
109 |                 <div className="h-6 w-20 bg-slate-100 rounded-full" />
110 |               </div>
111 |             ))}
112 |           </div>
113 |         </div>
114 |       ))}
115 |     </div>
116 |   );
117 | }
118 | 
119 | export default function Employees() {
120 |   const { data: users = [], isLoading: usersLoading } = useUsers();
121 |   const { data: cities = [] } = useCities();
122 |   const { data: projects = [], isLoading: projectsLoading } = useProjects();
123 |   const createUser = useCreateUser();
124 |   const updateUser = useUpdateUser();
125 |   const deleteUser = useDeleteUser();
126 |   const createProject = useCreateProject();
127 |   const deleteProject = useDeleteProject();
128 | 
129 |   const isLoading = usersLoading;
130 |   const [isModalOpen, setIsModalOpen] = useState(false);
131 |   const [editingUser, setEditingUser] = useState<User | null>(null);
132 |   const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
133 |   const [isSubmitting, setIsSubmitting] = useState(false);
134 | 
135 |   const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
136 |   const [projectForm, setProjectForm] = useState({ name: "", color: "blue" });
137 | 
138 |   const { selectedCity } = useSelectedCity();
139 | 
140 |   const cityFilteredUsers = selectedCity.id
141 |     ? users.filter((u) => u.cityId === selectedCity.id)
142 |     : users;
143 |   const grouped = (["MAfNAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
144 |     role,
145 |     label: ROLE_LABELS[role],
146 |     items: cityFilteredUsers.filter((u) => u.role === role),
147 |   }));
148 | 
149 |   const handleOpenModal = (user: User | null = null) => {
150 |     setEditingUser(user);
151 |     if (user) {
152 |       setForm({
153 |         fullName: user.name,
154 |         phone: user.phone || "",
155 |         email: user.email,
156 |         cityId: user.cityId || "",
157 |         role: user.role,
158 |         password: "",
159 |         telegramId: user.telegramId || "",
160 |         car: user.car || "",
161 |       });
162 |     } else {
163 |       setForm({ ...EMPTY_FORM });
164 |     }
165 |     setIsModalOpen(true);
166 |   };
167 | 
168 |   const handleSubmit = (e: React.FormEvent) => {
169 |     e.preventDefault();
170 |     if (!form.fullName.trim()) return;
171 |     setIsModalOpen(false); // закриваємо одразу
172 |     if (editingUser) updateUser.mutate({ id: editingUser.id, form });
173 |     else createUser.mutate(form);
174 |   };
175 | 
176 |   const handleDelete = async (id: string, name: string) => {
177 |     if (!window.confirm(`Видалити користувача "${name}"?`)) return;
178 |     try {
179 |       await deleteUser.mutateAsync(id);
180 |     } catch (e) {
181 |       alert("Помилка видалення");
182 |     }
183 |   };
184 | 
185 |   const handleCreateProject = (e: React.FormEvent) => {
186 |     e.preventDefault();
187 |     if (!projectForm.name.trim()) return;
188 |     setIsProjectModalOpen(false);
189 |     setProjectForm({ name: "", color: "blue" });
190 |     createProject.mutate(projectForm);
191 |   };
192 |   
193 |   const handleDeleteProject = async (id: string, name: string) => {
194 |     if (
195 |       !window.confirm(
196 |         `Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`,
197 |       )
198 |     )
199 |       return;
200 |     try {
201 |       await deleteProject.mutateAsync(id);
202 |     } catch (e) {
203 |       alert("Помилка видалення");
204 |     }
205 |   };
206 | 
207 |   if (isLoading) return <EmployeesSkeleton />;
208 | 
209 |   return (
210 |     <motion.div
211 |       initial={{ opacity: 0, y: 8 }}
212 |       animate={{ opacity: 1, y: 0 }}
213 |       transition={{ duration: 0.35, ease: "easeOut" }}
214 |       className="p-4 md:p-8 h-full"
215 |     >
216 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
217 |         <motion.div
218 |           initial={{ opacity: 0, y: -10 }}
219 |           animate={{ opacity: 1, y: 0 }}
220 |           transition={{ duration: 0.4, ease: "easeOut" }}
221 |         >
222 |           <h1 className="text-2xl font-bold text-slate-800">
223 |             Акаунти та Проєкти{" "}
224 |             {selectedCity.id && (
225 |               <span className="ml-2 text-base font-normal text-blue-500">
226 |                 · {selectedCity.name}
227 |               </span>
228 |             )}
229 |           </h1>
230 |           <p className="text-sm text-slate-400 mt-1">
231 |             Керування доступами, працівниками та видами подій
232 |           </p>
233 |         </motion.div>
234 |         <motion.button
235 |           initial={{ opacity: 0, y: -10 }}
236 |           animate={{ opacity: 1, y: 0 }}
237 |           transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
238 |           whileTap={{ scale: 0.97 }}
239 |           onClick={() => handleOpenModal()}
240 |           className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 w-full sm:w-auto"
241 |         >
242 |           + Створити користувача
243 |         </motion.button>
244 |       </div>
245 | 
246 |       <div className="space-y-8">
247 |         {grouped.map(({ role, label, items }, gi) => (
248 |           <motion.div
249 |             key={role}
250 |             initial={{ opacity: 0, y: 15 }}
251 |             animate={{ opacity: 1, y: 0 }}
252 |             transition={{ duration: 0.3, delay: gi * 0.06 }}
253 |           >
254 |             <div className={`flex items-center gap-3 mb-4`}>
255 |               <div
256 |                 className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}
257 |               ></div>
258 |               <h2 className="text-lg font-bold text-slate-700">{label}</h2>
259 |               <motion.span
260 |                 key={items.length}
261 |                 initial={{ scale: 0.7, opacity: 0 }}
262 |                 animate={{ scale: 1, opacity: 1 }}
263 |                 transition={{ duration: 0.2 }}
264 |                 className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
265 |               >
266 |                 {items.length}
267 |               </motion.span>
268 |             </div>
269 |             {items.length === 0 ? (
270 |               <motion.div
271 |                 initial={{ opacity: 0, scale: 0.97 }}
272 |                 animate={{ opacity: 1, scale: 1 }}
273 |                 transition={{ duration: 0.25 }}
274 |                 className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm"
275 |               >
276 |                 Немає {label.toLowerCase()}ів
277 |               </motion.div>
278 |             ) : (
279 |               <motion.div
280 |                 whileHover={{
281 |                   y: -2,
282 |                   boxShadow: "0 8px 24px -4px rgba(0,0,0,0.08)",
283 |                 }}
284 |                 transition={{ duration: 0.2 }}
285 |                 className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
286 |               >
287 |                 <table className="w-full text-left">
288 |                   <thead>
289 |                     <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
290 |                       <th className="px-5 py-3">ПІБ</th>
291 |                       <th className="px-5 py-3">Телефон</th>
292 |                       <th className="px-5 py-3">Пошта / Логін</th>
293 |                       <th className="px-5 py-3">Місто</th>
294 |                       <th className="px-5 py-3 text-center">Дії</th>
295 |                     </tr>
296 |                   </thead>
297 |                   <tbody>
298 |                     <AnimatePresence initial={false}>
299 |                       {items.map((u, ri) => (
300 |                         <motion.tr
301 |                           key={u.id}
302 |                           initial={{ opacity: 0 }}
303 |                           animate={{ opacity: 1 }}
304 |                           exit={{ opacity: 0, height: 0 }}
305 |                           transition={{ duration: 0.2, delay: ri * 0.04 }}
306 |                           className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
307 |                         >
308 |                           <td className="px-5 py-4">
309 |                             <div className="flex items-center gap-3">
310 |                               <motion.div
311 |                                 initial={{ scale: 0.8, opacity: 0 }}
312 |                                 animate={{ scale: 1, opacity: 1 }}
313 |                                 transition={{ duration: 0.2, delay: 0.05 }}
314 |                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
315 |                               >
316 |                                 {u.name.charAt(0)}
317 |                               </motion.div>
318 |                               <span className="font-medium text-slate-800">
319 |                                 {u.name}
320 |                               </span>
321 |                             </div>
322 |                           </td>
323 |                           <td className="px-5 py-4 text-slate-600 text-sm">
324 |                             <PhoneLink phone={u.phone} />
325 |                             {u.car && (
326 |                               <p className="text-xs text-emerald-600 font-medium mt-1">
327 |                                 🚗 {u.car}
328 |                               </p>
329 |                             )}
330 |                           </td>
331 |                           <td className="px-5 py-4 text-slate-600 text-sm font-medium">
332 |                             {u.email}
333 |                           </td>
334 |                           <td className="px-5 py-4">
335 |                             <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
336 |                               📍 {u.city?.name || "Всі міста"}
337 |                             </span>
338 |                           </td>
339 |                           <td className="px-5 py-4 text-center">
340 |                             <motion.button
341 |                               whileTap={{ scale: 0.93 }}
342 |                               onClick={() => handleOpenModal(u)}
343 |                               className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg mr-2 transition-colors"
344 |                             >
345 |                               ✏️
346 |                             </motion.button>
347 |                             <motion.button
348 |                               whileTap={{ scale: 0.93 }}
349 |                               onClick={() => handleDelete(u.id, u.name)}
350 |                               className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
351 |                             >
352 |                               🗑
353 |                             </motion.button>
354 |                           </td>
355 |                         </motion.tr>
356 |                       ))}
357 |                     </AnimatePresence>
358 |                   </tbody>
359 |                 </table>
360 |               </motion.div>
361 |             )}
362 |           </motion.div>
363 |         ))}
364 |       </div>
365 | 
366 |       {/* --- СЕКЦІЯ ПРОЄКТІВ (ВИДІВ ПОДІЙ) --- */}
367 |       <div className="mt-16 border-t border-slate-200 pt-10">
368 |         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
369 |           <div>
370 |             <h2 className="text-2xl font-bold text-slate-800">
371 |               Види подій (Проєкти)
372 |             </h2>
373 |             <p className="text-sm text-slate-400 mt-1">
374 |               Ці проєкти відображатимуться у випадаючому списку при створенні
375 |               події
376 |             </p>
377 |           </div>
378 |           <button
379 |             onClick={() => setIsProjectModalOpen(true)}
380 |             className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto"
381 |           >
382 |             + Створити вид події
383 |           </button>
384 |         </div>
385 | 
386 |         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
387 |           {projects.map((p, pi) => (
388 |             <motion.div
389 |               key={p.id}
390 |               initial={{ opacity: 0, y: 8 }}
391 |               animate={{ opacity: 1, y: 0 }}
392 |               transition={{ duration: 0.25, delay: pi * 0.05 }}
393 |               whileHover={{
394 |                 y: -3,
395 |                 boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
396 |               }}
397 |               className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default"
398 |             >
399 |               <div className="flex items-center gap-3">
400 |                 <motion.div
401 |                   whileHover={{ scale: 1.3 }}
402 |                   transition={{ duration: 0.15 }}
403 |                   className={`w-4 h-4 rounded-full ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm`}
404 |                 />
405 |                 <span className="font-bold text-slate-800">{p.name}</span>
406 |               </div>
407 |               <button
408 |                 onClick={() => handleDeleteProject(p.id, p.name)}
409 |                 className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2"
410 |                 title="Видалити"
411 |               >
412 |                 🗑
413 |               </button>
414 |             </motion.div>
415 |           ))}
416 |           {projects.length === 0 && (
417 |             <div className="col-span-full text-center py-10 text-slate-400">
418 |               Ви ще не додали жодного виду події
419 |             </div>
420 |           )}
421 |         </div>
422 |       </div>
423 | 
424 |       {/* Модалки Користувача і Проєктів */}
425 |       {isProjectModalOpen && (
426 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
427 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
428 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
429 |               <h3 className="text-xl font-bold text-slate-800">
430 |                 Новий вид події
431 |               </h3>
432 |               <button
433 |                 onClick={() => setIsProjectModalOpen(false)}
434 |                 className="text-slate-400 text-xl leading-none p-2 -mr-2"
435 |               >
436 |                 ✕
437 |               </button>
438 |             </div>
439 |             <form onSubmit={handleCreateProject} className="p-6">
440 |               <label className="block text-sm font-medium text-slate-700 mb-1.5">
441 |                 Назва
442 |               </label>
443 |               <input
444 |                 type="text"
445 |                 value={projectForm.name}
446 |                 onChange={(e) =>
447 |                   setProjectForm({ ...projectForm, name: e.target.value })
448 |                 }
449 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
450 |                 required
451 |                 placeholder="Наприклад: Шоу мильних бульбашок"
452 |               />
453 |               <label className="block text-sm font-medium text-slate-700 mb-3">
454 |                 Колір для календаря
455 |               </label>
456 |               <div className="flex gap-4 mb-8">
457 |                 {Object.keys(PROJECT_COLORS).map((c) => (
458 |                   <button
459 |                     type="button"
460 |                     key={c}
461 |                     onClick={() => setProjectForm({ ...projectForm, color: c })}
462 |                     className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${projectForm.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
463 |                   />
464 |                 ))}
465 |               </div>
466 |               <div className="flex gap-3">
467 |                 <button
468 |                   type="button"
469 |                   onClick={() => setIsProjectModalOpen(false)}
470 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
471 |                 >
472 |                   Скасувати
473 |                 </button>
474 |                 <button
475 |                   type="submit"
476 |                   className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
477 |                 >
478 |                   Зберегти
479 |                 </button>
480 |               </div>
481 |             </form>
482 |           </div>
483 |         </div>
484 |       )}
485 | 
486 |       {/* Ваша стара модалка Користувача */}
487 |       {isModalOpen && (
488 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
489 |           {/* Ваш існуючий код модалки працівника... Для стислості я зберіг базові поля */}
490 |           <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col">
491 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
492 |               <h3 className="text-xl font-bold">
493 |                 {editingUser ? "Редагувати" : "Новий користувач"}
494 |               </h3>
495 |               <button
496 |                 onClick={() => setIsModalOpen(false)}
497 |                 className="text-slate-400 text-xl p-2 -mr-2"
498 |               >
499 |                 ✕
500 |               </button>
501 |             </div>
502 |             <form
503 |               onSubmit={handleSubmit}
504 |               className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
505 |             >
506 |               <input
507 |                 type="text"
508 |                 value={form.fullName}
509 |                 onChange={(e) => setForm({ ...form, fullName: e.target.value })}
510 |                 required
511 |                 placeholder="ПІБ"
512 |                 className="w-full p-2.5 border rounded-lg"
513 |               />
514 |               <div className="grid grid-cols-2 gap-4">
515 |                 <input
516 |                   type="email"
517 |                   value={form.email}
518 |                   onChange={(e) => setForm({ ...form, email: e.target.value })}
519 |                   required
520 |                   placeholder="Пошта"
521 |                   className="w-full p-2.5 border rounded-lg"
522 |                 />
523 |                 <input
524 |                   type="password"
525 |                   value={form.password}
526 |                   onChange={(e) =>
527 |                     setForm({ ...form, password: e.target.value })
528 |                   }
529 |                   required={!editingUser}
530 |                   placeholder="Пароль"
531 |                   className="w-full p-2.5 border rounded-lg"
532 |                 />
533 |               </div>
534 |               <div className="grid grid-cols-2 gap-4">
535 |                 <input
536 |                   type="tel"
537 |                   value={form.phone}
538 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
539 |                   placeholder="Телефон"
540 |                   className="w-full p-2.5 border rounded-lg"
541 |                 />
542 |                 <input
543 |                   type="text"
544 |                   value={form.telegramId}
545 |                   onChange={(e) =>
546 |                     setForm({ ...form, telegramId: e.target.value })
547 |                   }
548 |                   placeholder="Telegram ID або @username"
549 |                   className="w-full p-2.5 border rounded-lg"
550 |                 />
551 |               </div>
552 |               <div className="grid grid-cols-2 gap-4">
553 |                 <select
554 |                   value={form.role}
555 |                   onChange={(e) =>
556 |                     setForm({ ...form, role: e.target.value as Role })
557 |                   }
558 |                   className="w-full p-2.5 border rounded-lg"
559 |                 >
560 |                   <option value="MANAGER">Менеджер</option>
561 |                   <option value="DRIVER">Водій</option>
562 |                   <option value="HOST">Ведучий</option>
563 |                   <option value="SUPERADMIN">Суперадмін</option>
564 |                 </select>
565 |                 <select
566 |                   value={form.cityId}
567 |                   onChange={(e) => setForm({ ...form, cityId: e.target.value })}
568 |                   className="w-full p-2.5 border rounded-lg"
569 |                 >
570 |                   <option value="">Всі міста</option>
571 |                   {cities.map((c) => (
572 |                     <option key={c.id} value={c.id}>
573 |                       {c.name}
574 |                     </option>
575 |                   ))}
576 |                 </select>
577 |               </div>
578 |               {form.role === "DRIVER" && (
579 |                 <input
580 |                   type="text"
581 |                   value={form.car || ""}
582 |                   onChange={(e) => setForm({ ...form, car: e.target.value })}
583 |                   placeholder="Автомобіль (напр. Renault Trafic)"
584 |                   className="w-full p-2.5 border rounded-lg"
585 |                 />
586 |               )}
587 |               <div className="flex gap-3 mt-2">
588 |                 <button
589 |                   type="button"
590 |                   onClick={() => setIsModalOpen(false)}
591 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
592 |                 >
593 |                   Скасувати
594 |                 </button>
595 |                 <button
596 |                   type="submit"
597 |                   disabled={isSubmitting}
598 |                   className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
599 |                 >
600 |                   Зберегти
601 |                 </button>
602 |               </div>
603 |             </form>
604 |           </div>
605 |         </div>
606 |       )}
607 |     </motion.div>
608 |   );
609 | }
610 | 
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
  0 | import { useState } from "react";
  1 | import { useEvents } from "../hooks/useApi";
  2 | import { useNavigate } from "react-router-dom";
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
 74 |   const [user] = useState<AuthUser | null>(() => {
 75 |     try {
 76 |       const raw = localStorage.getItem("user");
 77 |       return raw ? JSON.parse(raw) : null;
 78 |     } catch {
 79 |       return null;
 80 |     }
 81 |   });
 82 |   const { selectedCity } = useSelectedCity();
 83 |   const { data: events = [], isLoading, isError } = useEvents();
 84 |   const error = isError ? "Не вдалося завантажити список подій" : "";
 85 | 
 86 |   const isFieldStaff = !!user && FIELD_ROLES.includes(user.role);
 87 |   const filteredEvents = selectedCity.id
 88 |     ? events.filter((ev) => ev.city?.id === selectedCity.id)
 89 |     : events;
 90 |   const title = isFieldStaff ? "Мої події" : "Розклад подій";
 91 |   const subtitle = isFieldStaff
 92 |     ? "Події, на які вас призначив менеджер"
 93 |     : "Всі заплановані та проведені події";
 94 | 
 95 |   const goToEvent = (ev: EventListItem) => {
 96 |     if (ev.school?.id) navigate(`/schools/${ev.school.id}`);
 97 |   };
 98 | 
 99 |   return (
100 |     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
101 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
102 |         <div>
103 |           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
104 |             {title}
105 |             {selectedCity.id && !isFieldStaff && (
106 |               <span className="ml-2 text-base font-normal text-blue-500">
107 |                 · {selectedCity.name}
108 |               </span>
109 |             )}
110 |           </h1>{" "}
111 |           <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
112 |         </div>
113 |         {!isFieldStaff && (
114 |           <button
115 |             onClick={() => navigate("/schools")}
116 |             className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
117 |           >
118 |             + Додати подію
119 |           </button>
120 |         )}
121 |       </div>
122 | 
123 |       {isLoading && (
124 |         <div className="text-center text-slate-400 py-16">Завантаження...</div>
125 |       )}
126 | 
127 |       {!isLoading && error && (
128 |         <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
129 |           {error}
130 |         </div>
131 |       )}
132 | 
133 |       {!isLoading && !error && filteredEvents.length === 0 && (
134 |         <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
135 |           {isFieldStaff
136 |             ? "Поки що немає подій, на які вас призначено."
137 |             : "Подій ще немає."}
138 |         </div>
139 |       )}
140 | 
141 |       {!isLoading && !error && filteredEvents.length > 0 && (
142 |         <>
143 |           {/* Картки — мобільний вигляд */}
144 |           <div className="md:hidden flex flex-col gap-3">
145 |             {filteredEvents.map((ev) => (
146 |               <div
147 |                 key={ev.id}
148 |                 onClick={() => goToEvent(ev)}
149 |                 className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer active:bg-slate-50"
150 |               >
151 |                 <div className="flex justify-between items-start gap-2">
152 |                   <p className="font-semibold text-gray-800">{ev.project}</p>
153 |                   <span
154 |                     className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${
155 |                       STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
156 |                     }`}
157 |                   >
158 |                     {STATUS_LABELS[ev.status] ?? ev.status}
159 |                   </span>
160 |                 </div>
161 |                 <p className="text-xs text-gray-500 mt-1">
162 |                   {formatDate(ev.date)}
163 |                   {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
164 |                 </p>
165 |                 <p className="text-xs text-gray-500 mt-0.5">
166 |                   🏫 {ev.school?.name ?? "—"}
167 |                 </p>
168 |                 {ev.address && (
169 |                   <p className="text-xs text-gray-500 mt-0.5">
170 |                     📍 <AddressLink address={ev.address} />
171 |                   </p>
172 |                 )}
173 |                 {(ev.crew?.host || ev.crew?.driver) && (
174 |                   <p className="text-xs text-gray-500 mt-1">
175 |                     👤 {ev.crew?.host?.name ?? "—"} · 🚐{" "}
176 |                     {ev.crew?.driver?.name ?? "—"}
177 |                   </p>
178 |                 )}
179 |                 {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
180 |                   <p className="text-xs text-gray-500 mt-0.5">
181 |                     {ev.contactPerson ?? "—"}
182 |                     {ev.contactPhone ? (
183 |                       <>
184 |                         {" "}
185 |                         · <PhoneLink phone={ev.contactPhone} />
186 |                       </>
187 |                     ) : null}
188 |                   </p>
189 |                 )}
190 |               </div>
191 |             ))}
192 |           </div>
193 | 
194 |           {/* Таблиця — десктоп */}
195 |           <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
196 |             <table className="w-full text-left border-collapse">
197 |               <thead>
198 |                 <tr className="bg-gray-50 border-b border-gray-100">
199 |                   <th className="p-4 font-medium text-gray-600">Подія</th>
200 |                   <th className="p-4 font-medium text-gray-600">Дата</th>
201 |                   <th className="p-4 font-medium text-gray-600">Локація</th>
202 |                   <th className="p-4 font-medium text-gray-600">Екіпаж</th>
203 |                   <th className="p-4 font-medium text-gray-600">Статус</th>
204 |                 </tr>
205 |               </thead>
206 |               <tbody>
207 |                 {filteredEvents.map((ev) => (
208 |                   <tr
209 |                     key={ev.id}
210 |                     onClick={() => goToEvent(ev)}
211 |                     className="border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer"
212 |                   >
213 |                     <td className="p-4 text-gray-800 font-medium">
214 |                       {ev.project}
215 |                       <div className="text-xs text-gray-400 font-normal mt-0.5">
216 |                         {ev.school?.name ?? "—"}
217 |                       </div>
218 |                     </td>
219 |                     <td className="p-4 text-gray-600">
220 |                       {formatDate(ev.date)}
221 |                       {ev.time && (
222 |                         <div className="text-xs text-gray-400">{ev.time}</div>
223 |                       )}
224 |                     </td>
225 |                     <td className="p-4 text-gray-600">
226 |                       {ev.city?.name ?? "—"}
227 |                       {ev.address && (
228 |                         <div className="text-xs text-gray-400">
229 |                           <AddressLink address={ev.address} />
230 |                         </div>
231 |                       )}
232 |                     </td>
233 |                     <td className="p-4 text-gray-600 text-sm">
234 |                       <div>👤 {ev.crew?.host?.name ?? "—"}</div>
235 |                       <div>🚐 {ev.crew?.driver?.name ?? "—"}</div>
236 |                     </td>
237 |                     <td className="p-4">
238 |                       <span
239 |                         className={`px-3 py-1 rounded-full text-sm ${
240 |                           STATUS_COLORS[ev.status] ??
241 |                           "bg-slate-100 text-slate-600"
242 |                         }`}
243 |                       >
244 |                         {STATUS_LABELS[ev.status] ?? ev.status}
245 |                       </span>
246 |                     </td>
247 |                   </tr>
248 |                 ))}
249 |               </tbody>
250 |             </table>
251 |           </div>
252 |         </>
253 |       )}
254 |     </div>
255 |   );
256 | }
257 | 
```

### File: apps/frontend/src/pages/Finance.tsx
```tsx
  0 | import { useState, useEffect, lazy, Suspense } from "react";
  1 | import { useQuery } from "@tanstack/react-query";
  2 | import { api } from "../config/api";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | 
  5 | const FinanceCharts = lazy(() => import("../components/finance/FinanceCharts"));
  6 | const StaffFinanceView = lazy(
  7 |   () => import("../components/finance/StaffFinanceView"),
  8 | );
  9 | 
 10 | function FinanceSkeleton() {
 11 |   return (
 12 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
 13 |       <div className="h-8 bg-slate-200 rounded-xl w-48" />
 14 |       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 15 |         {Array.from({ length: 4 }).map((_, i) => (
 16 |           <div
 17 |             key={i}
 18 |             className="h-24 bg-white rounded-2xl border border-slate-100"
 19 |           />
 20 |         ))}
 21 |       </div>
 22 |       <div className="h-64 bg-white rounded-2xl border border-slate-100" />
 23 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 24 |         <div className="h-48 bg-white rounded-2xl border border-slate-100" />
 25 |         <div className="h-48 bg-white rounded-2xl border border-slate-100" />
 26 |       </div>
 27 |     </div>
 28 |   );
 29 | }
 30 | 
 31 | export default function Finance() {
 32 |   const { selectedCity } = useSelectedCity();
 33 |   const [period, setPeriod] = useState("year");
 34 |   const [projectFilter, setProjectFilter] = useState("");
 35 |   const [currentUser, setCurrentUser] = useState<{
 36 |     role: string;
 37 |     balance?: number;
 38 |   } | null>(null);
 39 |   const [myBalance, setMyBalance] = useState<number | null>(null);
 40 | 
 41 |   useEffect(() => {
 42 |     try {
 43 |       const raw = localStorage.getItem("user");
 44 |       if (raw) setCurrentUser(JSON.parse(raw));
 45 |     } catch {}
 46 |   }, []);
 47 | 
 48 |   const isManagerOrAdmin =
 49 |     currentUser?.role === "MANAGER" || currentUser?.role === "SUPERADMIN";
 50 | 
 51 |   useEffect(() => {
 52 |     if (isManagerOrAdmin === false) {
 53 |       api
 54 |         .get("/finance/my-balance", {
 55 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 56 |         })
 57 |         .then((r) => setMyBalance(r.data.balance))
 58 |         .catch(() => {});
 59 |     }
 60 |   }, [isManagerOrAdmin]);
 61 | 
 62 |   const { data, isLoading } = useQuery({
 63 |     queryKey: ["finance", selectedCity.id, period, projectFilter],
 64 |     queryFn: async () => {
 65 |       const params = new URLSearchParams();
 66 |       if (period) params.set("period", period);
 67 |       if (selectedCity?.id) params.set("cityId", selectedCity.id);
 68 |       if (projectFilter) params.set("project", projectFilter);
 69 |       const res = await api.get(`/finance/dashboard?${params}`);
 70 |       return res.data;
 71 |     },
 72 |     enabled: !!isManagerOrAdmin,
 73 |     staleTime: 5 * 60 * 1000,
 74 |   });
 75 |   
 76 |   if (!isManagerOrAdmin) {
 77 |     return (
 78 |       <Suspense fallback={<FinanceSkeleton />}>
 79 |         <StaffFinanceView myBalance={myBalance} selectedCity={selectedCity} />
 80 |       </Suspense>
 81 |     );
 82 |   }
 83 | 
 84 |   if (isLoading || !data) return <FinanceSkeleton />;
 85 | 
 86 |   return (
 87 |     <Suspense fallback={<FinanceSkeleton />}>
 88 |       <FinanceCharts
 89 |         data={data}
 90 |         period={period}
 91 |         setPeriod={setPeriod}
 92 |         projectFilter={projectFilter}
 93 |         setProjectFilter={setProjectFilter}
 94 |         selectedCity={selectedCity}
 95 |       />
 96 |     </Suspense>
 97 |   );
 98 | }
 99 | 
```

### File: apps/frontend/src/pages/Kindergartens.tsx
```tsx
  0 | import { useState, useRef } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { api } from "../config/api";
  3 | import { useSelectedCity } from "../context/CityContext";
  4 | import StatsBar, { classifySchool } from "../components/schools/StatsBar";
  5 | import { useSchools, useDeleteSchool, useCities } from "../hooks/useApi";
  6 | import { useQueryClient } from "@tanstack/react-query";
  7 | 
  8 | const PIPELINE_STAGES = [
  9 |   { key: "BASE", name: "Новий заклад" },
 10 |   { key: "FIRST_CONTACT", name: "Знайомство" },
 11 |   { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 12 |   { key: "PREPARATION", name: "Оголошення" },
 13 |   { key: "IN_PROGRESS", name: "Підготовка" },
 14 |   { key: "DONE", name: "Проведення заходу" },
 15 |   { key: "REPORT", name: "Звіт" },
 16 | ];
 17 | 
 18 | interface City {
 19 |   id: string;
 20 |   name: string;
 21 | }
 22 | 
 23 | export default function Kindergartens() {
 24 |   const { data: schools = [] } = useSchools();
 25 |   const { data: cities = [] } = useCities();
 26 |   const deleteSchool = useDeleteSchool();
 27 |   const qc = useQueryClient();
 28 | 
 29 |   const navigate = useNavigate();
 30 |   const { selectedCity } = useSelectedCity();
 31 |   const [isModalOpen, setIsModalOpen] = useState(false);
 32 |   const [isSubmitting, setIsSubmitting] = useState(false);
 33 |   const [form, setForm] = useState({
 34 |     name: "",
 35 |     cityId: "",
 36 |     sourceUrl: "",
 37 |     director: "",
 38 |     phone: "",
 39 |   });
 40 |   const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
 41 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 42 |   const [suggestions, setSuggestions] = useState<
 43 |     { name: string; url: string }[]
 44 |   >([]);
 45 |   const [showSuggestions, setShowSuggestions] = useState(false);
 46 |   const [isSearching, setIsSearching] = useState(false);
 47 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 48 | 
 49 |   const handleOpenModal = () => {
 50 |     setForm({
 51 |       name: "",
 52 |       cityId: selectedCity.id || cities[0]?.id || "",
 53 |       sourceUrl: "",
 54 |       director: "",
 55 |       phone: "",
 56 |     });
 57 |     setMatchedContacts([]);
 58 |     setIsModalOpen(true);
 59 |   };
 60 | 
 61 |   const fetchContacts = async (schoolName: string) => {
 62 |     if (!schoolName || schoolName.trim().length < 1) {
 63 |       setMatchedContacts([]);
 64 |       return;
 65 |     }
 66 |     const currentCityName =
 67 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
 68 |     if (currentCityName.toLowerCase() !== "львів") {
 69 |       setMatchedContacts([]);
 70 |       return;
 71 |     }
 72 |     try {
 73 |       const token = localStorage.getItem("token");
 74 |       const res = await api.get(
 75 |         `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=${encodeURIComponent("Садочок")}`,
 76 |         { headers: { Authorization: `Bearer ${token}` } },
 77 |       );
 78 |       setMatchedContacts(res.data);
 79 |       if (res.data.length > 0) {
 80 |         const director =
 81 |           res.data.find(
 82 |             (c: any) =>
 83 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
 84 |           ) || res.data[0];
 85 |         setForm((f) => ({
 86 |           ...f,
 87 |           director: director.contactName,
 88 |           phone: director.phone,
 89 |         }));
 90 |       }
 91 |     } catch (e) {
 92 |       console.error(e);
 93 |     }
 94 |   };
 95 | 
 96 |   const handleNameChange = (value: string) => {
 97 |     setForm({ ...form, name: value });
 98 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
 99 |     if (value.length < 2) {
100 |       setShowSuggestions(false);
101 |       setIsSearching(false);
102 |       setMatchedContacts([]);
103 |       return;
104 |     }
105 |     setIsSearching(true);
106 |     setShowSuggestions(true);
107 |     debounceTimer.current = setTimeout(async () => {
108 |       const token = localStorage.getItem("token");
109 |       try {
110 |         const [externalRes] = await Promise.all([
111 |           api.get(
112 |             `/schools/search?q=${value}&type=${encodeURIComponent("Садочок")}`,
113 |             {
114 |               headers: { Authorization: `Bearer ${token}` },
115 |             },
116 |           ),
117 |           fetchContacts(value),
118 |         ]);
119 |         setSuggestions(externalRes.data);
120 |       } catch (e) {
121 |         console.error(e);
122 |       } finally {
123 |         setIsSearching(false);
124 |       }
125 |     }, 400);
126 |   };
127 | 
128 |   const handleSelectSuggestion = (name: string, url: string) => {
129 |     setForm({ ...form, name, sourceUrl: url });
130 |     setShowSuggestions(false);
131 |     fetchContacts(name);
132 |   };
133 | 
134 |   const handleAddSchool = async (e: React.FormEvent) => {
135 |     e.preventDefault();
136 |     if (!form.name.trim() || !form.cityId) return;
137 |     setIsSubmitting(true);
138 |     try {
139 |       const token = localStorage.getItem("token");
140 |       await api.post(
141 |         "/schools",
142 |         { ...form, type: "Садочок" },
143 |         {
144 |           headers: { Authorization: `Bearer ${token}` },
145 |         },
146 |       );
147 |       setIsModalOpen(false);
148 |       qc.invalidateQueries({ queryKey: ["schools"] });
149 |     } catch (e) {
150 |       console.error(e);
151 |       alert("Не вдалося створити садочок");
152 |     } finally {
153 |       setIsSubmitting(false);
154 |     }
155 |   };
156 | 
157 |   const handleDeleteSchool = async (
158 |     e: React.MouseEvent,
159 |     schoolId: string,
160 |     schoolName: string,
161 |   ) => {
162 |     e.stopPropagation();
163 |     if (!window.confirm(`Видалити садочок "${schoolName}"?...`)) return;
164 |     await deleteSchool.mutateAsync(schoolId);
165 |   };
166 | 
167 |   const filteredKindergartens = schools.filter((s) => {
168 |     const isCityMatch = selectedCity.id ? s.cityId === selectedCity.id : true;
169 |     const isFilterMatch = activeFilter
170 |       ? classifySchool(s) === activeFilter
171 |       : true;
172 |     return isCityMatch && s.type === "Садочок" && isFilterMatch;
173 |   });
174 | 
175 |   return (
176 |     <div className="p-4 md:p-8 h-full max-w-[100vw]">
177 |       <div className="flex items-center justify-between gap-2 mb-3">
178 |         <h1 className="text-xl font-bold text-slate-800">
179 |           Садочки
180 |           {selectedCity.id && (
181 |             <span className="ml-2 text-sm font-normal text-blue-500">
182 |               · {selectedCity.name}
183 |             </span>
184 |           )}
185 |         </h1>
186 |         <div className="flex gap-2 shrink-0">
187 |           <button
188 |             onClick={async () => {
189 |               if (!selectedCity.id) return alert("Спочатку оберіть місто");
190 |               if (
191 |                 !window.confirm(
192 |                   `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
193 |                 )
194 |               )
195 |                 return;
196 |               try {
197 |                 const token = localStorage.getItem("token");
198 |                 const res = await api.post(
199 |                   "/schools/bulk-import",
200 |                   { cityId: selectedCity.id, type: "Садочок" },
201 |                   {
202 |                     headers: { Authorization: `Bearer ${token}` },
203 |                     timeout: 120000,
204 |                   },
205 |                 );
206 |                 alert(
207 |                   `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
208 |                 );
209 |                 qc.invalidateQueries({ queryKey: ["schools"] });
210 |               } catch (e) {
211 |                 alert("Помилка імпорту.");
212 |               }
213 |             }}
214 |             className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
215 |           >
216 |             📥 Імпорт з isuo
217 |           </button>
218 |           <button
219 |             onClick={handleOpenModal}
220 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
221 |           >
222 |             + Додати
223 |           </button>
224 |         </div>
225 |       </div>
226 | 
227 |       <StatsBar
228 |         schools={schools.filter(
229 |           (s) =>
230 |             (selectedCity.id ? s.cityId === selectedCity.id : true) &&
231 |             s.type === "Садочок",
232 |         )}
233 |         activeFilter={activeFilter}
234 |         onFilterChange={setActiveFilter}
235 |       />
236 | 
237 |       {/* Мобільний вигляд */}
238 |       <div className="md:hidden flex flex-col gap-2.5">
239 |         {filteredKindergartens.map((school) => {
240 |           const latestEvent = school.events?.[0];
241 |           const stage = latestEvent
242 |             ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
243 |             : null;
244 | 
245 |           // Остання активність
246 |           const lastActivityDate =
247 |             school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
248 |           const daysStale = lastActivityDate
249 |             ? Math.floor(
250 |                 (Date.now() - new Date(lastActivityDate).getTime()) / 86400000,
251 |               )
252 |             : null;
253 | 
254 |           const stalenessColor =
255 |             daysStale === null
256 |               ? "text-slate-400"
257 |               : daysStale >= 21
258 |                 ? "text-red-500"
259 |                 : daysStale >= 14
260 |                   ? "text-orange-500"
261 |                   : daysStale >= 7
262 |                     ? "text-amber-500"
263 |                     : "text-emerald-500";
264 | 
265 |           return (
266 |             <div
267 |               key={school.id}
268 |               onClick={() => navigate(`/schools/${school.id}`)}
269 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform"
270 |             >
271 |               {/* Рядок 1: назва + видалити */}
272 |               <div className="flex items-start justify-between gap-2">
273 |                 <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
274 |                   {school.name}
275 |                 </p>
276 |                 <button
277 |                   onClick={(e) => handleDeleteSchool(e, school.id, school.name)}
278 |                   className="text-slate-300 active:text-red-500 p-1 -mt-0.5 -mr-1 shrink-0"
279 |                 >
280 |                   🗑
281 |                 </button>
282 |               </div>
283 | 
284 |               {/* Рядок 2: директор (клікабельний телефон) + етап */}
285 |               <div className="flex items-center justify-between gap-2 mt-2">
286 |                 <div className="flex items-center gap-1.5 min-w-0">
287 |                   {school.phone ? (
288 |                     <a
289 |                       href={`tel:${school.phone}`}
290 |                       onClick={(e) => e.stopPropagation()}
291 |                       className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
292 |                     >
293 |                       📞 {school.director || school.phone}
294 |                     </a>
295 |                   ) : school.director ? (
296 |                     <span className="text-xs text-slate-500 truncate">
297 |                       👤 {school.director}
298 |                     </span>
299 |                   ) : (
300 |                     <span className="text-xs text-slate-300 italic">
301 |                       Контакт не вказано
302 |                     </span>
303 |                   )}
304 |                 </div>
305 | 
306 |                 {stage ? (
307 |                   <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
308 |                     {stage.name}
309 |                   </span>
310 |                 ) : (
311 |                   <span className="text-[10px] text-slate-300 shrink-0">
312 |                     Етап —
313 |                   </span>
314 |                 )}
315 |               </div>
316 | 
317 |               {/* Рядок 3: остання активність */}
318 |               {daysStale !== null && (
319 |                 <p className={`text-[11px] mt-1.5 ${stalenessColor}`}>
320 |                   ⏱{" "}
321 |                   {daysStale === 0
322 |                     ? "Активність сьогодні"
323 |                     : `Остання активність ${daysStale} дн тому`}
324 |                 </p>
325 |               )}
326 |             </div>
327 |           );
328 |         })}
329 | 
330 |         {filteredKindergartens.length === 0 && (
331 |           <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
332 |             Садочків ще немає
333 |           </div>
334 |         )}
335 | 
336 |         {/* FAB */}
337 |         <button
338 |           onClick={handleOpenModal}
339 |           className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
340 |         >
341 |           +
342 |         </button>
343 |       </div>
344 | 
345 |       {/* Десктоп таблиця */}
346 |       <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto w-full">
347 |         <table className="w-full text-left border-collapse">
348 |           <thead>
349 |             <tr className="bg-slate-50 border-b border-slate-100">
350 |               <th className="p-4 font-medium text-slate-600">Назва садочку</th>
351 |               <th className="p-4 font-medium text-slate-600">Місто</th>
352 |               <th className="p-4 font-medium text-slate-600">Статус</th>
353 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
354 |               <th className="p-4 font-medium text-slate-600 text-center">
355 |                 Дія
356 |               </th>
357 |             </tr>
358 |           </thead>
359 |           <tbody>
360 |             {filteredKindergartens.map((school) => {
361 |               const latestEvent = school.events?.[0];
362 |               const stage = latestEvent
363 |                 ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
364 |                 : null;
365 |               return (
366 |                 <tr
367 |                   key={school.id}
368 |                   onClick={() => navigate(`/schools/${school.id}`)}
369 |                   className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/50 transition"
370 |                 >
371 |                   <td className="p-4 text-slate-800 font-medium">
372 |                     {school.name}
373 |                   </td>
374 |                   <td className="p-4 text-slate-600">{school.city?.name}</td>
375 |                   <td className="p-4">
376 |                     <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
377 |                       Активний
378 |                     </span>
379 |                   </td>
380 |                   <td className="p-4">
381 |                     {stage ? (
382 |                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
383 |                         {stage.name}
384 |                       </span>
385 |                     ) : (
386 |                       <span className="text-slate-400 text-xs italic">—</span>
387 |                     )}
388 |                   </td>
389 |                   <td className="p-4 text-center">
390 |                     <button
391 |                       onClick={(e) =>
392 |                         handleDeleteSchool(e, school.id, school.name)
393 |                       }
394 |                       className="text-slate-400 hover:text-red-500 transition-colors p-2"
395 |                     >
396 |                       🗑
397 |                     </button>
398 |                   </td>
399 |                 </tr>
400 |               );
401 |             })}
402 |           </tbody>
403 |         </table>
404 |       </div>
405 | 
406 |       {/* Модалка */}
407 |       {isModalOpen && (
408 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
409 |           <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col">
410 |             <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
411 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
412 |               <h3 className="text-xl font-bold text-slate-800">
413 |                 Новий садочок
414 |               </h3>
415 |               <button
416 |                 onClick={() => setIsModalOpen(false)}
417 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2"
418 |               >
419 |                 ✕
420 |               </button>
421 |             </div>
422 |             <form
423 |               onSubmit={handleAddSchool}
424 |               className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto"
425 |             >
426 |               <div className="relative">
427 |                 <label className="block text-sm text-slate-600 mb-1">
428 |                   Назва садочку
429 |                 </label>
430 |                 <input
431 |                   type="text"
432 |                   value={form.name}
433 |                   onChange={(e) => handleNameChange(e.target.value)}
434 |                   onBlur={() =>
435 |                     setTimeout(() => setShowSuggestions(false), 150)
436 |                   }
437 |                   required
438 |                   placeholder="Наприклад: Садочок №1"
439 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
440 |                 />
441 |                 {showSuggestions && (
442 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
443 |                     {isSearching ? (
444 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
445 |                         Пошук за збігами...
446 |                       </li>
447 |                     ) : suggestions.length > 0 ? (
448 |                       suggestions.map((s, i) => (
449 |                         <li
450 |                           key={i}
451 |                           onMouseDown={() =>
452 |                             handleSelectSuggestion(s.name, s.url)
453 |                           }
454 |                           className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
455 |                         >
456 |                           {s.name}
457 |                         </li>
458 |                       ))
459 |                     ) : (
460 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
461 |                         Нічого не знайдено
462 |                       </li>
463 |                     )}
464 |                   </ul>
465 |                 )}
466 |               </div>
467 | 
468 |               {!selectedCity.id && (
469 |                 <div>
470 |                   <label className="block text-sm text-slate-600 mb-1">
471 |                     Місто
472 |                   </label>
473 |                   <select
474 |                     value={form.cityId}
475 |                     onChange={(e) =>
476 |                       setForm({ ...form, cityId: e.target.value })
477 |                     }
478 |                     required
479 |                     className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
480 |                   >
481 |                     <option value="">— Оберіть місто —</option>
482 |                     {cities.map((c) => (
483 |                       <option key={c.id} value={c.id}>
484 |                         {c.name}
485 |                       </option>
486 |                     ))}
487 |                   </select>
488 |                 </div>
489 |               )}
490 | 
491 |               <div>
492 |                 <label className="block text-sm text-slate-600 mb-1">
493 |                   Контакт{" "}
494 |                   <span className="ml-1 text-xs text-slate-400">
495 |                     (автозаповнення)
496 |                   </span>
497 |                 </label>
498 |                 {matchedContacts.length > 0 && (
499 |                   <div className="flex flex-wrap gap-1 mb-2">
500 |                     {matchedContacts.map((c, i) => (
501 |                       <button
502 |                         key={i}
503 |                         type="button"
504 |                         onClick={() =>
505 |                           setForm((f) => ({
506 |                             ...f,
507 |                             director: c.contactName,
508 |                             phone: c.phone,
509 |                           }))
510 |                         }
511 |                         className={`text-xs px-2 py-1 rounded-full border transition-colors ${
512 |                           form.director === c.contactName
513 |                             ? "bg-blue-600 text-white border-blue-600"
514 |                             : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
515 |                         }`}
516 |                       >
517 |                         {c.role ? `${c.role}: ` : ""}
518 |                         {c.contactName}
519 |                       </button>
520 |                     ))}
521 |                   </div>
522 |                 )}
523 |                 <input
524 |                   type="text"
525 |                   value={form.director}
526 |                   onChange={(e) =>
527 |                     setForm({ ...form, director: e.target.value })
528 |                   }
529 |                   placeholder="Микола Петренко"
530 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
531 |                 />
532 |               </div>
533 | 
534 |               <div>
535 |                 <label className="block text-sm text-slate-600 mb-1">
536 |                   Телефон{" "}
537 |                   <span className="ml-1 text-xs text-slate-400">
538 |                     (автозаповнення)
539 |                   </span>
540 |                 </label>
541 |                 <input
542 |                   type="text"
543 |                   value={form.phone}
544 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
545 |                   placeholder="0671234567"
546 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
547 |                 />
548 |               </div>
549 | 
550 |               <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2 pb-1 sm:pb-0">
551 |                 <button
552 |                   type="button"
553 |                   onClick={() => setIsModalOpen(false)}
554 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 rounded-xl sm:rounded-lg text-sm font-medium hover:bg-slate-200"
555 |                 >
556 |                   Скасувати
557 |                 </button>
558 |                 <button
559 |                   type="submit"
560 |                   disabled={isSubmitting}
561 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl sm:rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
562 |                 >
563 |                   {isSubmitting ? "Збереження..." : "Створити"}
564 |                 </button>
565 |               </div>
566 |             </form>
567 |           </div>
568 |         </div>
569 |       )}
570 |     </div>
571 |   );
572 | }
573 | 
```

### File: apps/frontend/src/pages/Login.tsx
```tsx
  0 | import { useState } from "react";
  1 | import axios from "axios";
  2 | import { useNavigate } from "react-router-dom";
  3 | 
  4 | import { API_BASE_URL } from "../config/api";
  5 | 
  6 | interface LoginProps {
  7 |   onLogin?: (token: string) => void;
  8 | }
  9 | 
 10 | export default function Login({ onLogin }: LoginProps) {
 11 |   const [email, setEmail] = useState("admin@crm.com");
 12 |   const [password, setPassword] = useState("admin123");
 13 |   const [error, setError] = useState("");
 14 |   const navigate = useNavigate();
 15 | 
 16 |   const handleLogin = async (e: React.FormEvent) => {
 17 |     e.preventDefault();
 18 |     setError("");
 19 | 
 20 |     try {
 21 |       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
 22 |         email,
 23 |         password,
 24 |       });
 25 | 
 26 |       localStorage.setItem("token", response.data.access_token);
 27 |       localStorage.setItem("user", JSON.stringify(response.data.user));
 28 |       if (onLogin) {
 29 |         onLogin(response.data.access_token); // оновлює isAuthenticated в App
 30 |       } else {
 31 |         navigate("/cities");
 32 |       }
 33 |     } catch {
 34 |       setError("Невірний email або пароль");
 35 |     }
 36 |   };
 37 | 
 38 |   return (
 39 |     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
 40 |       <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
 41 |         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
 42 |           Вхід у CRM
 43 |         </h1>
 44 | 
 45 |         {error && (
 46 |           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
 47 |             {error}
 48 |           </div>
 49 |         )}
 50 | 
 51 |         <form onSubmit={handleLogin} className="flex flex-col gap-4">
 52 |           <div>
 53 |             <label className="block text-sm font-medium text-gray-700 mb-1">
 54 |               Email
 55 |             </label>
 56 |             <input
 57 |               type="email"
 58 |               value={email}
 59 |               onChange={(e) => setEmail(e.target.value)}
 60 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
 61 |               required
 62 |             />
 63 |           </div>
 64 |           <div>
 65 |             <label className="block text-sm font-medium text-gray-700 mb-1">
 66 |               Пароль
 67 |             </label>
 68 |             <input
 69 |               type="password"
 70 |               value={password}
 71 |               onChange={(e) => setPassword(e.target.value)}
 72 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
 73 |               required
 74 |             />
 75 |           </div>
 76 |           <button
 77 |             type="submit"
 78 |             className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition"
 79 |           >
 80 |             Увійти
 81 |           </button>
 82 |         </form>
 83 |       </div>
 84 |     </div>
 85 |   );
 86 | }
 87 | 
```

### File: apps/frontend/src/pages/SchoolProfile.tsx
```tsx
  0 | import { useState, useMemo, useCallback, lazy, Suspense } from "react";
  1 | import { useParams } from "react-router-dom";
  2 | import { motion, AnimatePresence } from "framer-motion";
  3 | import {
  4 |   useSchool,
  5 |   useSchoolEvents,
  6 |   useUsers,
  7 |   useUpdateEventStatus,
  8 |   useUpdatePreparation,
  9 |   useAssignCrew,
 10 |   useSubmitReport,
 11 |   useAddComment,
 12 |   useUpdateHistoryComment,
 13 |   useEventFull,
 14 | } from "../hooks/useSchoolProfile";
 15 | import { useQueryClient } from "@tanstack/react-query";
 16 | import { api } from "../config/api";
 17 | 
 18 | const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
 19 | const HistoryTimeline = lazy(
 20 |   () => import("../components/school-profile/HistoryTimeline"),
 21 | );
 22 | const EventDetails = lazy(
 23 |   () => import("../components/school-profile/EventDetails"),
 24 | );
 25 | 
 26 | // Імпортуємо UI компоненти
 27 | import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
 28 | const SchoolInfoCard = lazy(
 29 |   () => import("../components/school-profile/SchoolInfoCard"),
 30 | );
 31 | const EventsTable = lazy(
 32 |   () => import("../components/school-profile/EventsTable"),
 33 | );
 34 | const EventPreparation = lazy(
 35 |   () => import("../components/school-profile/EventPreparation"),
 36 | );
 37 | const AssignedCrew = lazy(
 38 |   () => import("../components/school-profile/AssignedCrew"),
 39 | );
 40 | // Імпортуємо модальні вікна
 41 | import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
 42 | import EventModal from "../components/school-profile/modals/EventModal";
 43 | import CommentModal from "../components/school-profile/modals/CommentModal";
 44 | import CrewModal from "../components/school-profile/modals/CrewModal";
 45 | import ReportModal from "../components/school-profile/modals/ReportModal";
 46 | 
 47 | const PIPELINE_STAGES = [
 48 |   { id: 1, key: "BASE", name: "Новий заклад" },
 49 |   { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
 50 |   { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 51 |   { id: 4, key: "PREPARATION", name: "Оголошення" },
 52 |   { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
 53 |   { id: 6, key: "DONE", name: "Проведення заходу" },
 54 |   { id: 7, key: "REPORT", name: "Звіт" },
 55 | ];
 56 | 
 57 | export default function SchoolProfile() {
 58 |   const { id } = useParams();
 59 |   const qc = useQueryClient();
 60 | 
 61 |   // 1. Спочатку завантажуємо базові дані
 62 |   const { data: schoolRaw, isLoading: schoolLoading } = useSchool(id);
 63 |   const { data: eventsRaw = [], isLoading: eventsLoading } = useSchoolEvents(
 64 |     id,
 65 |     false,
 66 |   );
 67 | 
 68 |   // 2. Оголошуємо стейти, які потрібні для наступних запитів
 69 |   const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
 70 |   const [exitingEventId, setExitingEventId] = useState<string | null>(null);
 71 | 
 72 |   // 3. ТЕПЕР безпечно викликаємо useEventFull, оскільки selectedEventId вже існує
 73 |   const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
 74 |     selectedEventId ?? eventsRaw[0]?.id,
 75 |   );
 76 | 
 77 |   const { data: users = [] } = useUsers();
 78 | 
 79 |   const updateStatus = useUpdateEventStatus();
 80 |   const updatePreparation = useUpdatePreparation();
 81 |   const assignCrewMutation = useAssignCrew();
 82 |   const submitReportMutation = useSubmitReport();
 83 |   const addCommentMutation = useAddComment();
 84 |   const updateHistoryMutation = useUpdateHistoryComment();
 85 | 
 86 |   // 4. Формуємо schoolData
 87 |   const schoolData = schoolRaw
 88 |     ? {
 89 |         id: schoolRaw.id,
 90 |         cityId: schoolRaw.cityId,
 91 |         name: schoolRaw.name || "",
 92 |         type: schoolRaw.type || "Школа",
 93 |         city: schoolRaw.city?.name || "",
 94 |         address: schoolRaw.address || "",
 95 |         director: schoolRaw.director || "",
 96 |         phone: schoolRaw.phone || "",
 97 |         email: schoolRaw.email || "",
 98 |         childrenCount: schoolRaw.childrenCount || 0,
 99 |         notes: schoolRaw.notes || "",
100 |       }
101 |     : {
102 |         id: "",
103 |         cityId: "",
104 |         name: "",
105 |         type: "Школа",
106 |         city: "",
107 |         address: "",
108 |         director: "",
109 |         phone: "",
110 |         email: "",
111 |         childrenCount: 0,
112 |         notes: "",
113 |       };
114 | 
115 |   const events = eventsRaw;
116 | 
117 |   // 5. Оголошуємо решту стейтів (editForm залежить від schoolData, тому він тут)
118 |   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
119 |   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
120 |   const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
121 |   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
122 |   const [commentModal, setCommentModal] = useState({
123 |     isOpen: false,
124 |     mode: "pipeline",
125 |     stepId: null as number | null,
126 |     historyId: null as string | null,
127 |     text: "",
128 |   });
129 | 
130 |   const [editForm, setEditForm] = useState(schoolData);
131 |   const [eventForm, setEventForm] = useState({
132 |     project: "Голограма для школи",
133 |     date: "",
134 |     time: "11:00",
135 |     childrenPlanned: "",
136 |     price: "",
137 |     address: "",
138 |     contactPerson: "",
139 |     contactPhone: "",
140 |   });
141 | 
142 |   const currentEventBase = useMemo(
143 |     () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
144 |     [eventsRaw, selectedEventId],
145 |   );
146 |   const currentEvent = useMemo(
147 |     () =>
148 |       eventFull?.id === currentEventBase?.id
149 |         ? { ...currentEventBase, ...eventFull }
150 |         : currentEventBase,
151 |     [currentEventBase, eventFull],
152 |   );
153 |   const currentStageIndex = useMemo(() => {
154 |     const idx = PIPELINE_STAGES.findIndex(
155 |       (s) => s.key === currentEvent?.status,
156 |     );
157 |     return idx !== -1 ? idx : 0;
158 |   }, [currentEvent?.status]);
159 |   const creatorName = useMemo(
160 |     () =>
161 |       currentEvent?.history?.length > 0
162 |         ? currentEvent.history[currentEvent.history.length - 1].userName
163 |         : "Немає даних",
164 |     [currentEvent?.history],
165 |   );
166 | 
167 |   const handlePipelineClick = useCallback(
168 |     (stepId: number) => {
169 |       if (!currentEvent) return;
170 |       const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
171 |       if (nextStage?.id !== stepId) return;
172 |       if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
173 |       setCommentModal({
174 |         isOpen: true,
175 |         mode: "pipeline",
176 |         stepId: nextStage.id,
177 |         historyId: null,
178 |         text: "",
179 |       });
180 |     },
181 |     [currentEvent, currentStageIndex],
182 |   );
183 | 
184 |   const handleHistoryClick = useCallback((historyItem: any) => {
185 |     setCommentModal({
186 |       isOpen: true,
187 |       mode: "history",
188 |       stepId: null,
189 |       historyId: historyItem.id,
190 |       text: historyItem.comment || "",
191 |     });
192 |   }, []);
193 | 
194 |   const handleAddCommentClick = useCallback(() => {
195 |     setCommentModal({
196 |       isOpen: true,
197 |       mode: "add_comment",
198 |       stepId: null,
199 |       historyId: null,
200 |       text: "",
201 |     });
202 |   }, []);
203 | 
204 |   const handleSaveComment = useCallback(
205 |     async (e: React.FormEvent) => {
206 |       e.preventDefault();
207 |       if (commentModal.mode === "pipeline") {
208 |         const activeStage = PIPELINE_STAGES[currentStageIndex];
209 |         const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
210 |         if (!nextStage) return;
211 |         await updateStatus.mutateAsync({
212 |           eventId: currentEvent.id,
213 |           status: nextStage.key,
214 |           actionName: `Етап пройдено: ${activeStage.name}`,
215 |           comment: commentModal.text,
216 |         });
217 |         if (nextStage.key === "RE_SALE") {
218 |           setExitingEventId(currentEvent.id);
219 |           setTimeout(() => {
220 |             setSelectedEventId(null);
221 |             setExitingEventId(null);
222 |           }, 500);
223 |         }
224 |       } else if (commentModal.mode === "add_comment") {
225 |         await addCommentMutation.mutateAsync({
226 |           eventId: currentEvent.id,
227 |           comment: commentModal.text,
228 |         });
229 |       } else if (commentModal.mode === "history" && commentModal.historyId) {
230 |         await updateHistoryMutation.mutateAsync({
231 |           historyId: commentModal.historyId,
232 |           comment: commentModal.text,
233 |           eventId: currentEvent.id,
234 |         });
235 |       }
236 |       setCommentModal({
237 |         isOpen: false,
238 |         mode: "pipeline",
239 |         stepId: null,
240 |         historyId: null,
241 |         text: "",
242 |       });
243 |     },
244 |     [
245 |       commentModal,
246 |       currentEvent,
247 |       currentStageIndex,
248 |       updateStatus,
249 |       addCommentMutation,
250 |       updateHistoryMutation,
251 |     ],
252 |   );
253 | 
254 |   const handleSaveEvent = useCallback(
255 |     async (e: React.FormEvent) => {
256 |       e.preventDefault();
257 |       try {
258 |         const payload = {
259 |           ...eventForm,
260 |           schoolId: schoolData.id,
261 |           cityId: schoolData.cityId,
262 |           childrenPlanned: Number(eventForm.childrenPlanned),
263 |           price: Number(eventForm.price),
264 |         };
265 |         const res = await api.post("/events", payload, {
266 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
267 |         });
268 |         setIsEventModalOpen(false);
269 |         qc.invalidateQueries({ queryKey: ["schoolEvents", id] });
270 |         setSelectedEventId(res.data.id);
271 |       } catch (e) {
272 |         console.error(e);
273 |       }
274 |     },
275 |     [eventForm, schoolData, id, qc],
276 |   );
277 | 
278 |   const handleSaveSchoolInfo = useCallback(
279 |     async (e: React.FormEvent) => {
280 |       e.preventDefault();
281 |       try {
282 |         await api.patch(`/schools/${id}`, editForm, {
283 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
284 |         });
285 |         qc.invalidateQueries({ queryKey: ["school", id] });
286 |         setIsEditModalOpen(false);
287 |       } catch (e) {
288 |         console.error(e);
289 |       }
290 |     },
291 |     [editForm, id, qc],
292 |   );
293 | 
294 |   const handleUpdatePreparation = useCallback(
295 |     async (field: string, status: string) => {
296 |       if (!currentEvent) return;
297 |       await updatePreparation.mutateAsync({
298 |         eventId: currentEvent.id,
299 |         field,
300 |         status,
301 |       });
302 |     },
303 |     [currentEvent, updatePreparation],
304 |   );
305 | 
306 |   const handleSubmitReport = useCallback(
307 |     async (reportData: any) => {
308 |       if (!currentEvent) return;
309 |       await submitReportMutation.mutateAsync({
310 |         eventId: currentEvent.id,
311 |         reportData,
312 |       });
313 |       await updateStatus.mutateAsync({
314 |         eventId: currentEvent.id,
315 |         status: "RE_SALE",
316 |         actionName: "Звіт сформовано. Захід завершено.",
317 |       });
318 |       setExitingEventId(currentEvent.id);
319 |       setTimeout(() => {
320 |         setSelectedEventId(null);
321 |         setExitingEventId(null);
322 |       }, 500);
323 |       setIsReportModalOpen(false);
324 |     },
325 |     [currentEvent, submitReportMutation, updateStatus],
326 |   );
327 | 
328 |   const handleAssignCrew = useCallback(
329 |     async (crewId: string) => {
330 |       await assignCrewMutation.mutateAsync({
331 |         eventId: currentEvent.id,
332 |         crewId,
333 |       });
334 |       return updatePreparation.mutateAsync({
335 |         eventId: currentEvent.id,
336 |         field: "assignCrew",
337 |         status: "Виконано",
338 |       });
339 |       setIsCrewModalOpen(false);
340 |     },
341 |     [currentEvent, assignCrewMutation, updatePreparation],
342 |   );
343 | 
344 |   const openAddEventModal = useCallback(() => {
345 |     setEventForm((prev) => ({
346 |       ...prev,
347 |       address: schoolData.address,
348 |       contactPerson: schoolData.director,
349 |       contactPhone: schoolData.phone,
350 |       childrenPlanned: String(schoolData.childrenCount),
351 |     }));
352 |     setIsEventModalOpen(true);
353 |   }, [schoolData]);
354 |   const stagger = (i: number) => ({
355 |     initial: { opacity: 0, y: 10 },
356 |     animate: { opacity: 1, y: 0 },
357 |     transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
358 |   });
359 | 
360 |   return (
361 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8">
362 |       <SchoolProfileHeader
363 |         schoolData={schoolData}
364 |         onEdit={() => {
365 |           setEditForm(schoolData);
366 |           setIsEditModalOpen(true);
367 |         }}
368 |         onAddEvent={openAddEventModal}
369 |       />
370 | 
371 |       <div className="flex flex-col xl:flex-row gap-6">
372 |         {/* Ліва колонка */}
373 |         <div className="w-full xl:w-80 flex flex-col gap-6">
374 |           <motion.div {...stagger(0)}>
375 |             <Suspense
376 |               fallback={
377 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
378 |               }
379 |             >
380 |               <SchoolInfoCard schoolData={schoolData} />
381 |             </Suspense>
382 |           </motion.div>
383 | 
384 |           <AnimatePresence>
385 |             {currentEvent && currentStageIndex >= 1 && (
386 |               <motion.div
387 |                 key="responsible"
388 |                 initial={{ opacity: 0, y: 8 }}
389 |                 animate={{ opacity: 1, y: 0 }}
390 |                 exit={{ opacity: 0, y: -8 }}
391 |                 transition={{ duration: 0.25 }}
392 |                 className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
393 |               >
394 |                 <h3 className="font-bold text-slate-800 mb-4">
395 |                   Відповідальна особа
396 |                 </h3>
397 |                 <ul className="space-y-2 text-sm">
398 |                   <li className="flex justify-between">
399 |                     <span className="text-slate-500">Остання дія:</span>
400 |                     <span className="font-medium text-blue-600">
401 |                       {creatorName}
402 |                     </span>
403 |                   </li>
404 |                 </ul>
405 |               </motion.div>
406 |             )}
407 |           </AnimatePresence>
408 | 
409 |           <motion.div {...stagger(1)}>
410 |             <Suspense
411 |               fallback={
412 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
413 |               }
414 |             >
415 |               <HistoryTimeline
416 |                 currentEvent={
417 |                   eventFullLoading ? currentEventBase : currentEvent
418 |                 }
419 |                 onHistoryClick={handleHistoryClick}
420 |                 onAddCommentClick={handleAddCommentClick}
421 |               />
422 |             </Suspense>
423 |           </motion.div>
424 |         </div>
425 | 
426 |         {/* Права колонка */}
427 |         <motion.div
428 |           className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
429 |             exitingEventId === currentEvent?.id
430 |               ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
431 |               : ""
432 |           }`}
433 |           initial={{ opacity: 0, y: 10 }}
434 |           animate={{ opacity: 1, y: 0 }}
435 |           transition={{ duration: 0.3, delay: 0.15 }}
436 |         >
437 |           {currentEvent && (
438 |             <Suspense
439 |               fallback={
440 |                 <div className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />
441 |               }
442 |             >
443 |               <Pipeline
444 |                 currentStageIndex={currentStageIndex}
445 |                 currentEvent={currentEvent}
446 |                 onPipelineClick={handlePipelineClick}
447 |                 stages={PIPELINE_STAGES}
448 |               />
449 |             </Suspense>
450 |           )}
451 | 
452 |           <AnimatePresence>
453 |             {currentEvent && currentStageIndex >= 4 && (
454 |               <motion.div
455 |                 key="preparation"
456 |                 initial={{ opacity: 0, y: 8 }}
457 |                 animate={{ opacity: 1, y: 0 }}
458 |                 exit={{ opacity: 0, y: -8 }}
459 |                 transition={{ duration: 0.25 }}
460 |                 className="grid grid-cols-1 xl:grid-cols-2 gap-6"
461 |               >
462 |                 {eventFullLoading ? (
463 |                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
464 |                 ) : (
465 |                   <Suspense
466 |                     fallback={
467 |                       <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
468 |                     }
469 |                   >
470 |                     <EventPreparation
471 |                       data={currentEvent.preparation || {}}
472 |                       onUpdate={handleUpdatePreparation}
473 |                       onOpenCrewModal={() => setIsCrewModalOpen(true)}
474 |                     />
475 |                   </Suspense>
476 |                 )}
477 |                 <Suspense
478 |                   fallback={
479 |                     <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
480 |                   }
481 |                 >
482 |                   <AssignedCrew currentEvent={currentEvent} employees={users} />
483 |                 </Suspense>
484 |               </motion.div>
485 |             )}
486 |           </AnimatePresence>
487 | 
488 |           <motion.div {...stagger(2)}>
489 |             <Suspense
490 |               fallback={
491 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
492 |               }
493 |             >
494 |               <EventDetails
495 |                 currentEvent={currentEvent}
496 |                 schoolName={schoolData.name}
497 |                 cityId={schoolData.cityId}
498 |                 onEventUpdated={() =>
499 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
500 |                 }
501 |               />
502 |             </Suspense>
503 |           </motion.div>
504 | 
505 |           <motion.div {...stagger(3)}>
506 |             <Suspense
507 |               fallback={
508 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
509 |               }
510 |             >
511 |               <EventsTable
512 |                 events={events}
513 |                 selectedEventId={selectedEventId}
514 |                 onEventSelect={setSelectedEventId}
515 |                 onDeleteSuccess={() =>
516 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
517 |                 }
518 |               />
519 |             </Suspense>
520 |           </motion.div>
521 |         </motion.div>
522 |       </div>
523 | 
524 |       {/* Мобільна FAB */}
525 |       <button
526 |         onClick={openAddEventModal}
527 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
528 |       >
529 |         +
530 |       </button>
531 | 
532 |       {/* Модальні вікна */}
533 |       <EditSchoolModal
534 |         isOpen={isEditModalOpen}
535 |         onClose={() => setIsEditModalOpen(false)}
536 |         editForm={editForm}
537 |         setEditForm={setEditForm}
538 |         onSave={handleSaveSchoolInfo}
539 |       />
540 |       <EventModal
541 |         isOpen={isEventModalOpen}
542 |         onClose={() => setIsEventModalOpen(false)}
543 |         eventForm={eventForm}
544 |         setEventForm={setEventForm}
545 |         onSave={handleSaveEvent}
546 |       />
547 |       <CommentModal
548 |         isOpen={commentModal.isOpen}
549 |         onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
550 |         mode={commentModal.mode}
551 |         text={commentModal.text}
552 |         setText={(t) => setCommentModal({ ...commentModal, text: t })}
553 |         onSave={handleSaveComment}
554 |       />
555 |       <CrewModal
556 |         isOpen={isCrewModalOpen}
557 |         onClose={() => setIsCrewModalOpen(false)}
558 |         city={schoolData.city}
559 |         employees={users}
560 |         onSave={handleAssignCrew}
561 |       />
562 |       <ReportModal
563 |         isOpen={isReportModalOpen}
564 |         onClose={() => setIsReportModalOpen(false)}
565 |         onSave={handleSubmitReport}
566 |         schoolName={schoolData.name}
567 |         eventType={currentEvent?.project}
568 |         eventDate={currentEvent?.date}
569 |         eventIndex={
570 |           events
571 |             .filter((e) => e.schoolId === schoolData.id)
572 |             .indexOf(currentEvent!) + 1
573 |         }
574 |         crew={
575 |           currentEvent?.crew
576 |             ? {
577 |                 host: currentEvent.crew.hostId
578 |                   ? (users.find(
579 |                       (u: any) => u.id === currentEvent.crew.hostId,
580 |                     ) ?? null)
581 |                   : (currentEvent.crew.host ?? null),
582 |                 driver: currentEvent.crew.driverId
583 |                   ? (users.find(
584 |                       (u: any) => u.id === currentEvent.crew.driverId,
585 |                     ) ?? null)
586 |                   : (currentEvent.crew.driver ?? null),
587 |               }
588 |             : undefined
589 |         }
590 |       />
591 |     </div>
592 |   );
593 | }
594 | 
```

### File: apps/frontend/src/pages/Schools.tsx
```tsx
  0 | import { useState, useRef, useMemo, useCallback, lazy, Suspense } from "react";
  1 | import { api } from "../config/api";
  2 | import { useSelectedCity } from "../context/CityContext";
  3 | import {
  4 |   useSchools,
  5 |   useDeleteSchool,
  6 |   usePrefetchSchool,
  7 |   useCities,
  8 | } from "../hooks/useApi";
  9 | import { useQueryClient, useMutation } from "@tanstack/react-query";
 10 | import VirtualSchoolList from "../components/VirtualSchoolList";
 11 | import { SchoolCard } from "../components/schools/SchoolMobileList";
 12 | 
 13 | import {
 14 |   classifySchool,
 15 |   classifySize,
 16 | } from "../components/schools/schoolUtils";
 17 | 
 18 | const StatsBar = lazy(() => import("../components/schools/StatsBar"));
 19 | const VirtualDesktopTable = lazy(
 20 |   () => import("../components/schools/VirtualDesktopTable"),
 21 | );
 22 | // SchoolCard імпортується напряму — він легкий і потрібен одразу
 23 | export const PIPELINE_STAGES = [
 24 |   { key: "BASE", name: "Новий заклад" },
 25 |   { key: "FIRST_CONTACT", name: "Знайомство" },
 26 |   { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 27 |   { key: "PREPARATION", name: "Оголошення" },
 28 |   { key: "IN_PROGRESS", name: "Підготовка" },
 29 |   { key: "DONE", name: "Проведення заходу" },
 30 |   { key: "REPORT", name: "Звіт" },
 31 | ];
 32 | 
 33 | interface City {
 34 |   id: string;
 35 |   name: string;
 36 | }
 37 | 
 38 | export default function Schools() {
 39 |   const { selectedCity } = useSelectedCity();
 40 |   const [isModalOpen, setIsModalOpen] = useState(false);
 41 |   const [isSubmitting, setIsSubmitting] = useState(false);
 42 |   const [searchQuery, setSearchQuery] = useState("");
 43 |   const qc = useQueryClient();
 44 |   const [form, setForm] = useState({
 45 |     name: "",
 46 |     cityId: "",
 47 |     sourceUrl: "",
 48 |     director: "",
 49 |     phone: "",
 50 |   });
 51 |   const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
 52 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 53 |   const [sizeFilter, setSizeFilter] = useState<string | null>(null);
 54 |   const [suggestions, setSuggestions] = useState<
 55 |     { name: string; url: string }[]
 56 |   >([]);
 57 |   const [showSuggestions, setShowSuggestions] = useState(false);
 58 |   const [isSearching, setIsSearching] = useState(false);
 59 |   const [dotCount, setDotCount] = useState(3);
 60 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 61 | 
 62 |   const addSchoolMutation = useMutation({
 63 |     mutationFn: (newSchool: any) =>
 64 |       api.post("/schools", newSchool, {
 65 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 66 |       }),
 67 |     onSuccess: () => {
 68 |       qc.invalidateQueries({ queryKey: ["schools"] });
 69 |       setIsModalOpen(false);
 70 |     },
 71 |     onError: () => alert("Не вдалося створити заклад"),
 72 |   });
 73 | 
 74 |   const bulkImportMutation = useMutation({
 75 |     mutationFn: (cityId: string) =>
 76 |       api.post(
 77 |         "/schools/bulk-import",
 78 |         { cityId, type: "Школа" },
 79 |         {
 80 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 81 |           timeout: 120000,
 82 |         },
 83 |       ),
 84 |     onSuccess: (res) => {
 85 |       alert(
 86 |         `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
 87 |       );
 88 |       qc.invalidateQueries({ queryKey: ["schools"] });
 89 |     },
 90 |     onError: () => alert("Помилка імпорту."),
 91 |   });
 92 | 
 93 |   const { data: schools = [], isLoading } = useSchools();
 94 |   const { data: cities = [] } = useCities();
 95 |   const deleteSchool = useDeleteSchool();
 96 |   const prefetchSchool = usePrefetchSchool();
 97 | 
 98 |   const handleOpenModal = useCallback(() => {
 99 |     setForm({
100 |       name: "",
101 |       cityId: selectedCity.id || cities[0]?.id || "",
102 |       sourceUrl: "",
103 |       director: "",
104 |       phone: "",
105 |     });
106 |     setMatchedContacts([]);
107 |     setIsModalOpen(true);
108 |   }, [selectedCity.id, cities]);
109 | 
110 |   const fetchContacts = async (schoolName: string) => {
111 |     if (!schoolName || schoolName.trim().length < 1)
112 |       return setMatchedContacts([]);
113 |     const currentCityName =
114 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
115 |     if (currentCityName.toLowerCase() !== "львів")
116 |       return setMatchedContacts([]);
117 |     try {
118 |       const data = await qc.fetchQuery({
119 |         queryKey: ["schoolContacts", schoolName, currentCityName],
120 |         queryFn: async () => {
121 |           const res = await api.get(
122 |             `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
123 |             { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
124 |           );
125 |           return res.data;
126 |         },
127 |         staleTime: 1000 * 60 * 5, // Кешуємо на 5 хвилин
128 |       });
129 |       
130 |       setMatchedContacts(data);
131 |       if (data.length > 0) {
132 |         const director = data.find((c: any) =>
133 |             c.role?.includes("Директор") || c.role?.includes("Завідувач")
134 |           ) || data[0];
135 |         setForm((f) => ({
136 |           ...f,
137 |           director: director.contactName,
138 |           phone: director.phone,
139 |         }));
140 |       }
141 |     } catch (e) {
142 |       console.error(e);
143 |     }
144 |   };
145 | 
146 |   const handleNameChange = (value: string) => {
147 |     setForm({ ...form, name: value });
148 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
149 |     if (value.length < 2) {
150 |       setShowSuggestions(false);
151 |       setIsSearching(false);
152 |       setMatchedContacts([]);
153 |       return;
154 |     }
155 |     setIsSearching(true);
156 |     setShowSuggestions(true);
157 |     debounceTimer.current = setTimeout(async () => {
158 |       try {
159 |         const [externalData] = await Promise.all([
160 |           qc.fetchQuery({
161 |             queryKey: ["schoolSearchExternal", value],
162 |             queryFn: async () => {
163 |               const res = await api.get(`/schools/search?q=${encodeURIComponent(value)}&type=Школа`, {
164 |                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
165 |               });
166 |               return res.data;
167 |             },
168 |             staleTime: 1000 * 60 * 5,
169 |           }),
170 |           fetchContacts(value),
171 |         ]);
172 |         setSuggestions(externalData);
173 |       } catch (e) {
174 |         console.error(e);
175 |       } finally {
176 |         setIsSearching(false);
177 |       }
178 |     }, 400);
179 |   };
180 | 
181 |   const handleSelectSuggestion = (name: string, url: string) => {
182 |     setForm({ ...form, name, sourceUrl: url });
183 |     setShowSuggestions(false);
184 |     fetchContacts(name);
185 |   };
186 | 
187 |   const handleAddSchool = (e: React.FormEvent) => {
188 |     e.preventDefault();
189 |     if (!form.name.trim() || !form.cityId) return;
190 |     addSchoolMutation.mutate({ ...form, type: "Школа" });
191 |   };
192 | 
193 |   const handleDeleteSchool = useCallback(
194 |     async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
195 |       e.stopPropagation();
196 |       if (
197 |         !window.confirm(
198 |           `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
199 |         )
200 |       )
201 |         return;
202 |       await deleteSchool.mutateAsync(schoolId);
203 |     },
204 |     [deleteSchool],
205 |   );
206 | 
207 |   const debouncedSearch = useMemo(() => searchQuery, [searchQuery]);
208 | 
209 |   const baseFiltered = useMemo(
210 |     () =>
211 |       schools.filter((s) => {
212 |         const isCityMatch = selectedCity.id
213 |           ? s.cityId === selectedCity.id
214 |           : true;
215 |         const isFilterMatch = activeFilter
216 |           ? classifySchool(s) === activeFilter
217 |           : true;
218 |         const isSizeMatch = sizeFilter
219 |           ? classifySize(s, "Школа") === sizeFilter
220 |           : true;
221 |         return (
222 |           isCityMatch && s.type === "Школа" && isFilterMatch && isSizeMatch
223 |         );
224 |       }),
225 |     [schools, selectedCity.id, activeFilter, sizeFilter],
226 |   );
227 | 
228 |   const filteredSchools = useMemo(() => {
229 |     if (!debouncedSearch.trim()) return baseFiltered;
230 |     const q = debouncedSearch.toLowerCase().trim();
231 |     return baseFiltered.filter(
232 |       (s) =>
233 |         s.name?.toLowerCase().includes(q) ||
234 |         s.city?.name?.toLowerCase().includes(q) ||
235 |         s.director?.toLowerCase().includes(q) ||
236 |         s.address?.toLowerCase().includes(q),
237 |     );
238 |   }, [baseFiltered, debouncedSearch]);
239 | 
240 |   return (
241 |     <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
242 |       {/* Шапка */}
243 |       <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
244 |         <div className="min-w-0">
245 |           <h1 className="text-xl font-bold text-slate-800 leading-tight">
246 |             Школи
247 |             {selectedCity.id && (
248 |               <span className="ml-2 text-sm font-normal text-blue-500">
249 |                 · {selectedCity.name}
250 |               </span>
251 |             )}
252 |           </h1>
253 |         </div>
254 |         <div className="flex gap-2 shrink-0">
255 |           <button
256 |             onClick={() => {
257 |               if (!selectedCity.id) return alert("Спочатку оберіть місто");
258 |               if (!window.confirm(`Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`)) return;
259 |               
260 |               setDotCount(3);
261 |               const dotInterval = setInterval(() => {
262 |                 setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
263 |               }, 500);
264 |               
265 |               bulkImportMutation.mutate(selectedCity.id, {
266 |                 onSettled: () => clearInterval(dotInterval)
267 |               });
268 |             }}
269 |             disabled={bulkImportMutation.isPending}
270 |             className="md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
271 |           >
272 |             {bulkImportMutation.isPending ? (
273 |               <span className="font-medium">
274 |                 Імпортую{"·".repeat(dotCount)}
275 |               </span>
276 |             ) : (
277 |               <>📥 Імпорт з isuo</>
278 |             )}
279 |           </button>
280 |           <button
281 |             onClick={handleOpenModal}
282 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
283 |           >
284 |             + Додати
285 |           </button>
286 |         </div>
287 |       </div>
288 | 
289 |       {/* StatsBar */}
290 |       <div className="shrink-0">
291 |         <Suspense
292 |           fallback={
293 |             <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
294 |           }
295 |         >
296 |           <StatsBar
297 |             schools={schools.filter(
298 |               (s) =>
299 |                 (selectedCity.id ? s.cityId === selectedCity.id : true) &&
300 |                 s.type === "Школа",
301 |             )}
302 |             activeFilter={activeFilter}
303 |             onFilterChange={setActiveFilter}
304 |             sizeFilter={sizeFilter}
305 |             onSizeFilterChange={setSizeFilter}
306 |             schoolType="Школа"
307 |           />
308 |         </Suspense>
309 |       </div>
310 | 
311 |       {/* Пошук */}
312 |       <div className="relative shrink-0 mb-4 mt-2">
313 |         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
314 |           <svg
315 |             className="w-5 h-5 text-slate-400"
316 |             fill="none"
317 |             stroke="currentColor"
318 |             viewBox="0 0 24 24"
319 |           >
320 |             <path
321 |               strokeLinecap="round"
322 |               strokeLinejoin="round"
323 |               strokeWidth={2}
324 |               d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
325 |             />
326 |           </svg>
327 |         </div>
328 |         <input
329 |           type="text"
330 |           value={searchQuery}
331 |           onChange={(e) => setSearchQuery(e.target.value)}
332 |           placeholder="Пошук за назвою, директором, адресою..."
333 |           className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
334 |         />
335 |         {searchQuery && (
336 |           <button
337 |             onClick={() => setSearchQuery("")}
338 |             className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
339 |           >
340 |             <svg
341 |               className="w-5 h-5"
342 |               fill="none"
343 |               stroke="currentColor"
344 |               viewBox="0 0 24 24"
345 |             >
346 |               <path
347 |                 strokeLinecap="round"
348 |                 strokeLinejoin="round"
349 |                 strokeWidth={2}
350 |                 d="M6 18L18 6M6 6l12 12"
351 |               />
352 |             </svg>
353 |           </button>
354 |         )}
355 |       </div>
356 | 
357 |       {/* Лічильник */}
358 |       <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
359 |         {filteredSchools.length === baseFiltered.length
360 |           ? `${baseFiltered.length} шкіл`
361 |           : `${filteredSchools.length} з ${baseFiltered.length} шкіл`}
362 |         {(activeFilter || sizeFilter) && (
363 |           <button
364 |             onClick={() => {
365 |               setActiveFilter(null);
366 |               setSizeFilter(null);
367 |             }}
368 |             className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
369 |           >
370 |             скинути фільтри
371 |           </button>
372 |         )}
373 |       </p>
374 | 
375 |       {/* Компоненти списків */}
376 |       {isLoading ? (
377 |         <div className="flex flex-col gap-2.5 flex-1">
378 |           {Array.from({ length: 8 }).map((_, i) => (
379 |             <div
380 |               key={i}
381 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
382 |               style={{ opacity: 1 - i * 0.1 }}
383 |             >
384 |               <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
385 |               <div className="flex justify-between">
386 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
387 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
388 |               </div>
389 |             </div>
390 |           ))}
391 |         </div>
392 |       ) : (
393 |         <>
394 |           {/* Мобільний: віртуалізований список карток */}
395 |           <div className="md:hidden flex-1 w-full overflow-hidden">
396 |             <VirtualSchoolList
397 |               schools={filteredSchools}
398 |               itemHeight={110}
399 |               renderItem={(school, index) => (
400 |                 <div
401 |                   className="pb-2.5"
402 |                   onMouseEnter={() => prefetchSchool(school.id)}
403 |                 >
404 |                   <SchoolCard
405 |                     school={school}
406 |                     index={index}
407 |                     onDelete={handleDeleteSchool}
408 |                     stages={PIPELINE_STAGES}
409 |                   />
410 |                 </div>
411 |               )}
412 |             />
413 |           </div>
414 | 
415 |           {/* Десктоп: таблиця з віртуалізованим tbody */}
416 |           <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
417 |             <Suspense
418 |               fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
419 |             >
420 |               <VirtualDesktopTable
421 |                 schools={filteredSchools}
422 |                 searchQuery={searchQuery}
423 |                 onDelete={handleDeleteSchool}
424 |                 stages={PIPELINE_STAGES}
425 |               />
426 |             </Suspense>
427 |           </div>
428 |         </>
429 |       )}
430 | 
431 |       {/* Мобільна плаваюча кнопка FAB */}
432 |       <button
433 |         onClick={handleOpenModal}
434 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
435 |       >
436 |         +
437 |       </button>
438 | 
439 |       {/* Модальне вікно */}
440 |       {isModalOpen && (
441 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
442 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
443 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
444 |               <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
445 |               <button
446 |                 onClick={() => setIsModalOpen(false)}
447 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
448 |               >
449 |                 ✕
450 |               </button>
451 |             </div>
452 | 
453 |             <form
454 |               onSubmit={handleAddSchool}
455 |               className="p-6 flex flex-col gap-4 overflow-y-auto"
456 |             >
457 |               <div className="relative">
458 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
459 |                   Назва школи
460 |                 </label>
461 |                 <input
462 |                   type="text"
463 |                   value={form.name}
464 |                   onChange={(e) => handleNameChange(e.target.value)}
465 |                   onBlur={() =>
466 |                     setTimeout(() => setShowSuggestions(false), 150)
467 |                   }
468 |                   placeholder="Наприклад: Школа №1"
469 |                   required
470 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
471 |                 />
472 |                 {showSuggestions && (
473 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
474 |                     {isSearching ? (
475 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
476 |                         Пошук...
477 |                       </li>
478 |                     ) : suggestions.length > 0 ? (
479 |                       suggestions.map((s, i) => (
480 |                         <li
481 |                           key={i}
482 |                           onMouseDown={() =>
483 |                             handleSelectSuggestion(s.name, s.url)
484 |                           }
485 |                           className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
486 |                         >
487 |                           {s.name}
488 |                         </li>
489 |                       ))
490 |                     ) : (
491 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
492 |                         Нічого не знайдено
493 |                       </li>
494 |                     )}
495 |                   </ul>
496 |                 )}
497 |               </div>
498 | 
499 |               {!selectedCity.id && (
500 |                 <div>
501 |                   <label className="block text-sm font-medium text-slate-600 mb-1.5">
502 |                     Місто
503 |                   </label>
504 |                   <select
505 |                     value={form.cityId}
506 |                     onChange={(e) =>
507 |                       setForm({ ...form, cityId: e.target.value })
508 |                     }
509 |                     required
510 |                     className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
511 |                   >
512 |                     <option value="">— Оберіть місто —</option>
513 |                     {cities.map((c) => (
514 |                       <option key={c.id} value={c.id}>
515 |                         {c.name}
516 |                       </option>
517 |                     ))}
518 |                   </select>
519 |                 </div>
520 |               )}
521 | 
522 |               <div>
523 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
524 |                   Контакт{" "}
525 |                   <span className="ml-1 text-xs font-normal text-slate-400">
526 |                     (автозаповнення)
527 |                   </span>
528 |                 </label>
529 |                 {matchedContacts.length > 0 && (
530 |                   <div className="flex flex-wrap gap-1.5 mb-3">
531 |                     {matchedContacts.map((c, i) => (
532 |                       <button
533 |                         key={i}
534 |                         type="button"
535 |                         onClick={() =>
536 |                           setForm((f) => ({
537 |                             ...f,
538 |                             director: c.contactName,
539 |                             phone: c.phone,
540 |                           }))
541 |                         }
542 |                         className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
543 |                       >
544 |                         {c.role ? `${c.role}: ` : ""}
545 |                         {c.contactName}
546 |                       </button>
547 |                     ))}
548 |                   </div>
549 |                 )}
550 |                 <input
551 |                   type="text"
552 |                   value={form.director}
553 |                   onChange={(e) =>
554 |                     setForm({ ...form, director: e.target.value })
555 |                   }
556 |                   placeholder="Микола Петренко"
557 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
558 |                 />
559 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
560 |                   Телефон
561 |                 </label>
562 |                 <input
563 |                   type="text"
564 |                   value={form.phone}
565 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
566 |                   placeholder="0671234567"
567 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
568 |                 />
569 |               </div>
570 | 
571 |               <div className="flex gap-3 mt-4">
572 |                 <button
573 |                   type="button"
574 |                   onClick={() => setIsModalOpen(false)}
575 |                   className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
576 |                 >
577 |                   Скасувати
578 |                 </button>
579 |                 <button
580 |                   type="submit"
581 |                   disabled={addSchoolMutation.isPending}
582 |                   className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
583 |                 >
584 |                   {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
585 |                 </button>
586 |               </div>
587 |             </form>
588 |           </div>
589 |         </div>
590 |       )}
591 |     </div>
592 |   );
593 | }
594 | 
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
  2 | 
  3 | export default defineConfig({
  4 |   plugins: [react()],
  5 |   build: {
  6 |     rollupOptions: {
  7 |       output: {
  8 |         manualChunks(id) {
  9 |           if (id.includes("recharts")) return "recharts";
 10 |           if (id.includes("@tanstack/react-virtual")) return "tanstack";
 11 |         },
 12 |       },
 13 |     },
 14 |   },
 15 | });
 16 | 
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
