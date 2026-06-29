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
│   │   │   │   ├── 20260628223725_add_expense_salary_items
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
│   │   │   │   │   ├── current-user.decorator.ts
│   │   │   │   │   └── roles.decorator.ts
│   │   │   │   ├── guards
│   │   │   │   │   └── roles.guard.ts
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
│   │   │   │   ├── dashboard.service.spec.ts
│   │   │   │   └── dashboard.service.ts
│   │   │   ├── events
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-event.dto.ts
│   │   │   │   │   ├── reschedule-event.dto.ts
│   │   │   │   │   ├── submit-report.dto.ts
│   │   │   │   │   ├── update-preparation.dto.ts
│   │   │   │   │   └── update-status.dto.ts
│   │   │   │   ├── events-scheduler.service.ts
│   │   │   │   ├── events.controller.spec.ts
│   │   │   │   ├── events.controller.ts
│   │   │   │   ├── events.module.ts
│   │   │   │   ├── events.service.spec.ts
│   │   │   │   └── events.service.ts
│   │   │   ├── finance
│   │   │   │   ├── create-expense-item.dto.ts
│   │   │   │   ├── finance.controller.ts
│   │   │   │   ├── finance.module.ts
│   │   │   │   ├── finance.service.spec.ts
│   │   │   │   └── finance.service.ts
│   │   │   ├── issues
│   │   │   │   ├── issues.controller.ts
│   │   │   │   ├── issues.module.ts
│   │   │   │   └── issues.service.ts
│   │   │   ├── main.ts
│   │   │   ├── prisma
│   │   │   │   ├── prisma.mock.ts
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
│   │   │   ├── tests
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
│       ├── e2e
│       │   ├── login.spec.ts
│       │   └── schools.spec.ts
│       ├── eslint.config.js
│       ├── index.html
│       ├── lighthouserc.cjs
│       ├── package.json
│       ├── playwright.config.ts
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
│       │   │   ├── ProtectedRoute.tsx
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
│       │   │   │   ├── CompletedEventModal.tsx
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
│       │   ├── tests
│       │   │   ├── component
│       │   │   │   ├── EventsTable.test.tsx
│       │   │   │   ├── Pipeline.test.tsx
│       │   │   │   └── SchoolCard.test.tsx
│       │   │   ├── mocks
│       │   │   │   ├── handlers.ts
│       │   │   │   └── server.ts
│       │   │   ├── setup.ts
│       │   │   └── unit
│       │   │       ├── hooks
│       │   │       │   ├── useSchools.test.ts
│       │   │       │   └── useSchoolsFilter.test.ts
│       │   │       └── schoolUtils.test.ts
│       │   └── types
│       │       └── index.ts
│       ├── tailwind.config.js
│       ├── test-results
│       │   ├── .last-run.json
│       │   ├── login-Авторизація-невірний-пароль-—-показує-помилку
│       │   │   └── error-context.md
│       │   ├── login-Авторизація-невірний-пароль-—-показує-помилку-retry1
│       │   │   ├── error-context.md
│       │   │   └── trace.zip
│       │   ├── login-Авторизація-успішний-логін
│       │   │   └── error-context.md
│       │   ├── login-Авторизація-успішний-логін-retry1
│       │   │   ├── error-context.md
│       │   │   └── trace.zip
│       │   ├── schools-Сторінка-шкіл-відображає-список-шкіл
│       │   │   └── error-context.md
│       │   ├── schools-Сторінка-шкіл-відображає-список-шкіл-retry1
│       │   │   ├── error-context.md
│       │   │   └── trace.zip
│       │   ├── schools-Сторінка-шкіл-пошук-фільтрує-школи
│       │   │   └── error-context.md
│       │   └── schools-Сторінка-шкіл-пошук-фільтрує-школи-retry1
│       │       ├── error-context.md
│       │       └── trace.zip
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
 10 |   id             String       @id @default(uuid())
 11 |   name           String
 12 |   email          String       @unique
 13 |   phone          String?
 14 |   password       String
 15 |   role           String       @default("MANAGER")
 16 |   cityId         String?
 17 |   createdAt      DateTime     @default(now())
 18 |   updatedAt      DateTime     @updatedAt
 19 |   telegramId     String?
 20 |   telegramChatId String?
 21 |   car            String?
 22 |   balance        Float        @default(0)
 23 |   managedCities  City[]       @relation("CityManager")
 24 |   crewAsDriver   Crew[]       @relation("DriverCrew")
 25 |   crewAsHost     Crew[]       @relation("HostCrew")
 26 |   city           City?        @relation(fields: [cityId], references: [id])
 27 |   salaryItems    SalaryItem[]
 28 | }
 29 | 
 30 | model City {
 31 |   id        String        @id @default(uuid())
 32 |   name      String
 33 |   managerId String?
 34 |   createdAt DateTime      @default(now())
 35 |   manager   User?         @relation("CityManager", fields: [managerId], references: [id])
 36 |   crews     Crew[]
 37 |   events    Event[]
 38 |   issues    IssueReport[]
 39 |   schools   School[]
 40 |   users     User[]
 41 | }
 42 | 
 43 | model School {
 44 |   id            String   @id @default(uuid())
 45 |   name          String
 46 |   type          String
 47 |   cityId        String
 48 |   address       String?
 49 |   director      String?
 50 |   phone         String?
 51 |   email         String?
 52 |   notes         String?
 53 |   childrenCount Int?
 54 |   isHotClient   Boolean  @default(false)
 55 |   rating        Float?
 56 |   createdAt     DateTime @default(now())
 57 |   updatedAt     DateTime @updatedAt
 58 |   events        Event[]
 59 |   city          City     @relation(fields: [cityId], references: [id])
 60 | 
 61 |   @@index([cityId])
 62 | }
 63 | 
 64 | model Crew {
 65 |   id        String   @id @default(uuid())
 66 |   name      String
 67 |   cityId    String
 68 |   hostId    String?
 69 |   driverId  String?
 70 |   car       String?
 71 |   carPlate  String?
 72 |   phone     String?
 73 |   isActive  Boolean  @default(true)
 74 |   createdAt DateTime @default(now())
 75 |   city      City     @relation(fields: [cityId], references: [id])
 76 |   driver    User?    @relation("DriverCrew", fields: [driverId], references: [id])
 77 |   host      User?    @relation("HostCrew", fields: [hostId], references: [id])
 78 |   events    Event[]
 79 | }
 80 | 
 81 | model Event {
 82 |   id              String            @id @default(uuid())
 83 |   cityId          String
 84 |   schoolId        String
 85 |   crewId          String?
 86 |   project         String
 87 |   date            DateTime
 88 |   time            String?
 89 |   status          EventStatus       @default(BASE)
 90 |   childrenPlanned Int?
 91 |   childrenActual  Int?
 92 |   price           Float?
 93 |   received        Float?
 94 |   paymentMethod   String?
 95 |   address         String?
 96 |   contactPerson   String?
 97 |   contactPhone    String?
 98 |   equipment       String?
 99 |   nextContact     DateTime?
100 |   nextProject     String?
101 |   responsibleId   String?
102 |   createdAt       DateTime          @default(now())
103 |   updatedAt       DateTime          @updatedAt
104 |   city            City              @relation(fields: [cityId], references: [id])
105 |   crew            Crew?             @relation(fields: [crewId], references: [id])
106 |   school          School            @relation(fields: [schoolId], references: [id])
107 |   history         EventHistory[]
108 |   preparation     EventPreparation?
109 |   report          EventReport?
110 |   files           File[]
111 |   issues          IssueReport[]
112 | 
113 |   @@index([cityId])
114 |   @@index([status])
115 |   @@index([schoolId])
116 | }
117 | 
118 | model EventReport {
119 |   id                String        @id @default(uuid())
120 |   eventId           String        @unique
121 |   directorSatisfied Boolean?
122 |   teachersSatisfied Boolean?
123 |   hadIssues         Boolean       @default(false)
124 |   comment           String?
125 |   rating            Float?
126 |   createdAt         DateTime      @default(now())
127 |   announcementDone  Boolean       @default(false)
128 |   materialShown     Boolean       @default(false)
129 |   childrenCount     Int           @default(0)
130 |   classesCount      Int           @default(0)
131 |   privilegedCount   Int           @default(0)
132 |   showingsCount     Int           @default(0)
133 |   totalSum          Float         @default(0)
134 |   schoolSum         Float         @default(0)
135 |   remainderSum      Float         @default(0)
136 |   event             Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)
137 |   photos            File[]
138 |   expenseItems      ExpenseItem[]
139 |   salaryItems       SalaryItem[]
140 | }
141 | 
142 | model File {
143 |   id        String       @id @default(uuid())
144 |   name      String
145 |   url       String
146 |   size      Int
147 |   eventId   String?
148 |   reportId  String?
149 |   createdAt DateTime     @default(now())
150 |   event     Event?       @relation(fields: [eventId], references: [id])
151 |   report    EventReport? @relation(fields: [reportId], references: [id])
152 | }
153 | 
154 | model EventHistory {
155 |   id        String   @id @default(uuid())
156 |   eventId   String
157 |   action    String
158 |   comment   String?
159 |   userId    String
160 |   userName  String
161 |   role      String
162 |   createdAt DateTime @default(now())
163 |   event     Event    @relation(fields: [eventId], references: [id])
164 | }
165 | 
166 | model EventPreparation {
167 |   id               String @id @default(uuid())
168 |   eventId          String @unique
169 |   assignCrew       String @default("Заплановано")
170 |   bookEquipment    String @default("Заплановано")
171 |   prepareDocs      String @default("Заплановано")
172 |   prepareMaterials String @default("Заплановано")
173 |   remindSchool     String @default("Заплановано")
174 |   event            Event  @relation(fields: [eventId], references: [id])
175 | }
176 | 
177 | model IssueReport {
178 |   id               String    @id @default(uuid())
179 |   eventId          String
180 |   schoolName       String
181 |   eventName        String
182 |   message          String
183 |   cityId           String
184 |   status           String    @default("Планується")
185 |   createdAt        DateTime  @default(now())
186 |   deadline         DateTime?
187 |   assignedUserId   String?
188 |   assignedUserName String?
189 |   city             City      @relation(fields: [cityId], references: [id])
190 |   event            Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)
191 | 
192 |   @@index([cityId])
193 | }
194 | 
195 | model SchoolContact {
196 |   id           String   @id @default(uuid())
197 |   city         String   @default("Львів")
198 |   schoolNumber String
199 |   contactName  String
200 |   phone        String
201 |   role         String?
202 |   createdAt    DateTime @default(now())
203 | }
204 | 
205 | model Project {
206 |   id        String   @id @default(uuid())
207 |   name      String   @unique
208 |   color     String   @default("blue")
209 |   createdAt DateTime @default(now())
210 | }
211 | 
212 | model ExpenseItem {
213 |   id        String   @id @default(uuid())
214 |   reportId  String
215 |   category  String // "Транспорт", "Матеріали", "Реклама" тощо
216 |   name      String?
217 |   amount    Decimal  @db.Decimal(12, 2)
218 |   createdAt DateTime @default(now())
219 | 
220 |   report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
221 | 
222 |   @@index([reportId])
223 | }
224 | 
225 | model SalaryItem {
226 |   id        String   @id @default(uuid())
227 |   reportId  String
228 |   userId    String?
229 |   userName  String
230 |   amount    Decimal  @db.Decimal(12, 2)
231 |   role      String? // "ведучий", "водій"
232 |   createdAt DateTime @default(now())
233 | 
234 |   report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
235 |   user   User?       @relation(fields: [userId], references: [id])
236 | 
237 |   @@index([reportId])
238 |   @@index([userId])
239 | }
240 | 
241 | enum EventStatus {
242 |   BASE
243 |   FIRST_CONTACT
244 |   INTERESTED
245 |   PRE_APPROVAL
246 |   DATE_CONFIRMED
247 |   PREPARATION
248 |   IN_PROGRESS
249 |   DONE
250 |   REPORT
251 |   RE_SALE
252 | }
253 | 
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
 31 |   // Reflector реєструється автоматично через NestJS core, додаткова реєстрація не потрібна
 32 | })
 33 | export class AppModule {}
 34 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { AuthController } from './auth.controller';
  2 | import { AuthService } from './auth.service';
  3 | 
  4 | describe('AuthController', () => {
  5 |   it('should be defined', async () => {
  6 |     const module = await Test.createTestingModule({
  7 |       controllers: [AuthController],
  8 |       providers: [{ provide: AuthService, useValue: { login: jest.fn() } }],
  9 |     }).compile();
 10 |     expect(module.get(AuthController)).toBeDefined();
 11 |   });
 12 | });
 13 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { AuthService } from './auth.service';
  2 | import { UsersService } from '../users/users.service';
  3 | import { JwtService } from '@nestjs/jwt';
  4 | 
  5 | describe('AuthService', () => {
  6 |   it('should be defined', async () => {
  7 |     const module = await Test.createTestingModule({
  8 |       providers: [
  9 |         AuthService,
 10 |         { provide: UsersService, useValue: { findByEmail: jest.fn() } },
 11 |         { provide: JwtService, useValue: { sign: jest.fn() } },
 12 |       ],
 13 |     }).compile();
 14 |     expect(module.get(AuthService)).toBeDefined();
 15 |   });
 16 | });
 17 | 
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
 13 |     // Тепер безпечно викликаємо публічний метод з UsersService, ізолюючи БД
 14 |     const user = await this.usersService.findByEmail(email);
 15 | 
 16 |     if (!user) {
 17 |       throw new UnauthorizedException('Невірний email або пароль');
 18 |     }
 19 | 
 20 |     const isPasswordValid = await bcrypt.compare(pass, user.password);
 21 | 
 22 |     if (!isPasswordValid) {
 23 |       throw new UnauthorizedException('Невірний email або пароль');
 24 |     }
 25 | 
 26 |     // Генеруємо "корисне навантаження" для токена
 27 |     // Було:
 28 |     // const payload = { sub: user.id, email: user.email, role: user.role };
 29 | 
 30 |     // Стало:
 31 |     const payload = {
 32 |       sub: user.id,
 33 |       email: user.email,
 34 |       role: user.role,
 35 |       name: user.name,
 36 |     };
 37 | 
 38 |     return {
 39 |       access_token: await this.jwtService.signAsync(payload),
 40 |       user: {
 41 |         id: user.id,
 42 |         name: user.name,
 43 |         email: user.email,
 44 |         role: user.role,
 45 |       },
 46 |     };
 47 |   }
 48 | }
 49 | 
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

### File: apps/backend/src/auth/decorators/roles.decorator.ts
```ts
  0 | import { SetMetadata } from '@nestjs/common';
  1 | 
  2 | export const ROLES_KEY = 'roles';
  3 | export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
  4 | 
```

### File: apps/backend/src/auth/guards/roles.guard.ts
```ts
  0 | import {
  1 |   Injectable,
  2 |   CanActivate,
  3 |   ExecutionContext,
  4 |   ForbiddenException,
  5 | } from '@nestjs/common';
  6 | import { Reflector } from '@nestjs/core';
  7 | import { ROLES_KEY } from '../decorators/roles.decorator';
  8 | 
  9 | @Injectable()
 10 | export class RolesGuard implements CanActivate {
 11 |   constructor(private reflector: Reflector) {}
 12 | 
 13 |   canActivate(context: ExecutionContext): boolean {
 14 |     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
 15 |       ROLES_KEY,
 16 |       [context.getHandler(), context.getClass()],
 17 |     );
 18 |     if (!requiredRoles) return true;
 19 | 
 20 |     const { user } = context.switchToHttp().getRequest();
 21 |     if (!requiredRoles.includes(user?.role)) {
 22 |       throw new ForbiddenException('Недостатньо прав');
 23 |     }
 24 |     return true;
 25 |   }
 26 | }
 27 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { CitiesController } from './cities.controller';
  2 | import { CitiesService } from './cities.service';
  3 | import { AuthGuard } from '../auth/auth.guard';
  4 | import { RolesGuard } from '../auth/guards/roles.guard';
  5 | 
  6 | describe('CitiesController', () => {
  7 |   it('should be defined', async () => {
  8 |     const module = await Test.createTestingModule({
  9 |       controllers: [CitiesController],
 10 |       providers: [
 11 |         { provide: CitiesService, useValue: {} },
 12 |         { provide: AuthGuard, useValue: { canActivate: () => true } },
 13 |         { provide: RolesGuard, useValue: { canActivate: () => true } },
 14 |       ],
 15 |     }).compile();
 16 |     expect(module.get(CitiesController)).toBeDefined();
 17 |   });
 18 | });
 19 | 
```

### File: apps/backend/src/cities/cities.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Get,
  3 |   Post,
  4 |   Body,
  5 |   Patch,
  6 |   Param,
  7 |   Delete,
  8 |   UseGuards,
  9 | } from '@nestjs/common';
 10 | import { CitiesService } from './cities.service';
 11 | import { AuthGuard } from '../auth/auth.guard';
 12 | import { RolesGuard } from '../auth/guards/roles.guard';
 13 | import { Roles } from '../auth/decorators/roles.decorator';
 14 | 
 15 | @Controller('cities')
 16 | @UseGuards(AuthGuard, RolesGuard)
 17 | export class CitiesController {
 18 |   constructor(private readonly citiesService: CitiesService) {}
 19 | 
 20 |   @Post()
 21 |   @Roles('SUPERADMIN')
 22 |   create(@Body() body: { name: string }) {
 23 |     return this.citiesService.create(body.name);
 24 |   }
 25 | 
 26 |   @Get()
 27 |   findAll() {
 28 |     return this.citiesService.findAll();
 29 |   }
 30 | 
 31 |   @Get(':id')
 32 |   findOne(@Param('id') id: string) {
 33 |     return this.citiesService.findOne(id);
 34 |   }
 35 |   @Post(':id/crews')
 36 |   createCrew(
 37 |     @Param('id') id: string,
 38 |     @Body() body: { name: string; hostId: string; driverId: string },
 39 |   ) {
 40 |     return this.citiesService.createCrew(id, body);
 41 |   }
 42 | 
 43 |   @Delete('crews/:crewId')
 44 |   @Roles('SUPERADMIN', 'MANAGER')
 45 |   deleteCrew(@Param('crewId') crewId: string) {
 46 |     return this.citiesService.deleteCrew(crewId);
 47 |   }
 48 | }
 49 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { CitiesService } from './cities.service';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | 
  4 | describe('CitiesService', () => {
  5 |   it('should be defined', async () => {
  6 |     const module = await Test.createTestingModule({
  7 |       providers: [
  8 |         CitiesService,
  9 |         { provide: PrismaService, useValue: { city: { findMany: jest.fn() } } },
 10 |       ],
 11 |     }).compile();
 12 |     expect(module.get(CitiesService)).toBeDefined();
 13 |   });
 14 | });
 15 | 
```

### File: apps/backend/src/cities/cities.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from 'src/prisma/prisma.service';
  2 | 
  3 | @Injectable()
  4 | export class CitiesService {
  5 |   constructor(private readonly prisma: PrismaService) {}
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

### File: apps/backend/src/dashboard/dashboard.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { DashboardService } from './dashboard.service';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | 
  4 | const today = new Date();
  5 | const todayStr = today.toISOString();
  6 | 
  7 | const mockPrisma = {
  8 |   event: {
  9 |     findMany: jest.fn(),
 10 |     groupBy: jest.fn(),
 11 |     $queryRaw: jest.fn(),
 12 |   },
 13 |   school: {
 14 |     findMany: jest.fn(),
 15 |     groupBy: jest.fn(),
 16 |   },
 17 |   city: { findMany: jest.fn() },
 18 |   eventHistory: { findMany: jest.fn() },
 19 |   $queryRaw: jest.fn(),
 20 | };
 21 | 
 22 | const makeService = async () => {
 23 |   const module: TestingModule = await Test.createTestingModule({
 24 |     providers: [
 25 |       DashboardService,
 26 |       { provide: PrismaService, useValue: mockPrisma },
 27 |     ],
 28 |   }).compile();
 29 |   return module.get<DashboardService>(DashboardService);
 30 | };
 31 | 
 32 | const defaultMocks = () => {
 33 |   mockPrisma.event.findMany
 34 |     .mockResolvedValueOnce([]) // todayEvents
 35 |     .mockResolvedValueOnce([]) // upcomingEvents
 36 |     .mockResolvedValueOnce([]); // monthEvents
 37 |   mockPrisma.$queryRaw.mockResolvedValueOnce([
 38 |     { status: 'BASE', count: BigInt(10) },
 39 |     { status: 'FIRST_CONTACT', count: BigInt(5) },
 40 |     { status: 'IN_PROGRESS', count: BigInt(3) },
 41 |   ]);
 42 |   mockPrisma.school.findMany.mockResolvedValueOnce([]);
 43 |   mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
 44 | };
 45 | 
 46 | describe('DashboardService', () => {
 47 |   let service: DashboardService;
 48 | 
 49 |   beforeEach(async () => {
 50 |     jest.clearAllMocks();
 51 |     service = await makeService();
 52 |     // Очищаємо кеш між тестами
 53 |     (service as any).cache.clear();
 54 |   });
 55 | 
 56 |   describe('getSummary — funnel', () => {
 57 |     it('коректно рахує воронку по стадіях', async () => {
 58 |       defaultMocks();
 59 |       const result = await service.getSummary('city-1');
 60 |       expect(result.funnel['BASE']).toBe(10);
 61 |       expect(result.funnel['FIRST_CONTACT']).toBe(5);
 62 |       expect(result.funnel['IN_PROGRESS']).toBe(3);
 63 |     });
 64 | 
 65 |     it('totalSchools = сума всіх записів воронки', async () => {
 66 |       defaultMocks();
 67 |       const result = await service.getSummary('city-1');
 68 |       expect(result.totalSchools).toBe(18); // 10 + 5 + 3
 69 |     });
 70 | 
 71 |     it('всі етапи пайплайну присутні у funnel', async () => {
 72 |       defaultMocks();
 73 |       const result = await service.getSummary('city-1');
 74 |       const expectedStages = [
 75 |         'BASE',
 76 |         'FIRST_CONTACT',
 77 |         'DATE_CONFIRMED',
 78 |         'PREPARATION',
 79 |         'IN_PROGRESS',
 80 |         'DONE',
 81 |         'REPORT',
 82 |         'RE_SALE',
 83 |       ];
 84 |       for (const stage of expectedStages) {
 85 |         expect(result.funnel).toHaveProperty(stage);
 86 |       }
 87 |     });
 88 |   });
 89 | 
 90 |   describe('getSummary — todayEvents', () => {
 91 |     it('повертає сьогоднішні події', async () => {
 92 |       const todayEvent = {
 93 |         id: 'ev-1',
 94 |         project: 'Голограма',
 95 |         date: todayStr,
 96 |         school: { id: 's-1', name: 'Школа №1' },
 97 |         city: { id: 'c-1', name: 'Львів' },
 98 |         crew: null,
 99 |       };
100 |       mockPrisma.event.findMany
101 |         .mockResolvedValueOnce([todayEvent])
102 |         .mockResolvedValueOnce([])
103 |         .mockResolvedValueOnce([]);
104 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
105 |       mockPrisma.school.findMany.mockResolvedValueOnce([]);
106 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
107 | 
108 |       const result = await service.getSummary('city-1');
109 |       expect(result.todayEvents).toHaveLength(1);
110 |       expect(result.todayEvents[0].id).toBe('ev-1');
111 |     });
112 | 
113 |     it('повертає порожній масив якщо сьогодні подій немає', async () => {
114 |       defaultMocks();
115 |       const result = await service.getSummary('city-1');
116 |       expect(result.todayEvents).toHaveLength(0);
117 |     });
118 |   });
119 | 
120 |   describe('getSummary — upcomingEvents', () => {
121 |     it('повертає майбутні події', async () => {
122 |       const upcoming = {
123 |         id: 'ev-2',
124 |         project: 'Малювайко',
125 |         date: todayStr,
126 |         school: null,
127 |         city: null,
128 |         crew: null,
129 |       };
130 |       mockPrisma.event.findMany
131 |         .mockResolvedValueOnce([])
132 |         .mockResolvedValueOnce([upcoming])
133 |         .mockResolvedValueOnce([]);
134 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
135 |       mockPrisma.school.findMany.mockResolvedValueOnce([]);
136 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
137 | 
138 |       const result = await service.getSummary('city-1');
139 |       expect(result.upcomingEvents).toHaveLength(1);
140 |       expect(result.upcomingEvents[0].id).toBe('ev-2');
141 |     });
142 |   });
143 | 
144 |   describe('getSummary — staleSchools', () => {
145 |     it('повертає школи без активності більше 7 днів', async () => {
146 |       const staleDate = new Date();
147 |       staleDate.setDate(staleDate.getDate() - 10);
148 | 
149 |       const staleSchool = {
150 |         id: 's-stale',
151 |         name: 'Стала школа',
152 |         events: [
153 |           {
154 |             status: 'FIRST_CONTACT',
155 |             history: [{ createdAt: staleDate }],
156 |           },
157 |         ],
158 |       };
159 | 
160 |       mockPrisma.event.findMany
161 |         .mockResolvedValueOnce([])
162 |         .mockResolvedValueOnce([])
163 |         .mockResolvedValueOnce([]);
164 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
165 |       mockPrisma.school.findMany.mockResolvedValueOnce([staleSchool]);
166 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
167 | 
168 |       const result = await service.getSummary('city-1');
169 |       expect(result.staleSchools).toHaveLength(1);
170 |       expect(result.staleSchools[0].id).toBe('s-stale');
171 |       expect(result.staleSchools[0].daysStale).toBeGreaterThanOrEqual(9);
172 |     });
173 | 
174 |     it('сортує staleSchools від найстарішої активності', async () => {
175 |       const date10 = new Date();
176 |       date10.setDate(date10.getDate() - 10);
177 |       const date20 = new Date();
178 |       date20.setDate(date20.getDate() - 20);
179 | 
180 |       mockPrisma.event.findMany
181 |         .mockResolvedValueOnce([])
182 |         .mockResolvedValueOnce([])
183 |         .mockResolvedValueOnce([]);
184 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
185 |       mockPrisma.school.findMany.mockResolvedValueOnce([
186 |         {
187 |           id: 's-1',
188 |           name: 'Школа 1',
189 |           events: [{ status: 'BASE', history: [{ createdAt: date10 }] }],
190 |         },
191 |         {
192 |           id: 's-2',
193 |           name: 'Школа 2',
194 |           events: [{ status: 'BASE', history: [{ createdAt: date20 }] }],
195 |         },
196 |       ]);
197 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
198 | 
199 |       const result = await service.getSummary('city-1');
200 |       expect(result.staleSchools[0].daysStale).toBeGreaterThan(
201 |         result.staleSchools[1].daysStale!,
202 |       );
203 |     });
204 |   });
205 | 
206 |   describe('getSummary — monthlyKpi', () => {
207 |     it('коректно рахує KPI за місяць', async () => {
208 |       mockPrisma.event.findMany
209 |         .mockResolvedValueOnce([])
210 |         .mockResolvedValueOnce([])
211 |         .mockResolvedValueOnce([
212 |           {
213 |             id: 'ev-1',
214 |             report: { totalSum: 10000, remainderSum: 4000, childrenCount: 100 },
215 |           },
216 |           {
217 |             id: 'ev-2',
218 |             report: { totalSum: 5000, remainderSum: 2000, childrenCount: 50 },
219 |           },
220 |         ]);
221 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
222 |       mockPrisma.school.findMany.mockResolvedValueOnce([]);
223 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
224 | 
225 |       const result = await service.getSummary('city-1');
226 |       expect(result.monthlyKpi.revenue).toBe(15000);
227 |       expect(result.monthlyKpi.profit).toBe(6000);
228 |       expect(result.monthlyKpi.children).toBe(150);
229 |       expect(result.monthlyKpi.count).toBe(2);
230 |     });
231 | 
232 |     it('повертає нулі якщо звітів немає', async () => {
233 |       defaultMocks();
234 |       const result = await service.getSummary('city-1');
235 |       expect(result.monthlyKpi).toEqual({
236 |         revenue: 0,
237 |         profit: 0,
238 |         children: 0,
239 |         count: 0,
240 |       });
241 |     });
242 |   });
243 | 
244 |   describe('getSummary — citiesStats (SUPERADMIN)', () => {
245 |     it('повертає citiesStats для SUPERADMIN', async () => {
246 |       defaultMocks();
247 |       mockPrisma.city.findMany.mockResolvedValueOnce([
248 |         { id: 'c-1', name: 'Львів' },
249 |         { id: 'c-2', name: 'Київ' },
250 |       ]);
251 |       mockPrisma.school.groupBy.mockResolvedValueOnce([
252 |         { cityId: 'c-1', _count: { id: 50 } },
253 |       ]);
254 |       mockPrisma.event.groupBy.mockResolvedValueOnce([
255 |         { cityId: 'c-1', _count: { id: 5 } },
256 |       ]);
257 |       mockPrisma.event.findMany.mockResolvedValueOnce([
258 |         { cityId: 'c-1', report: { totalSum: 20000 } },
259 |       ]);
260 | 
261 |       const result = await service.getSummary(undefined, 'SUPERADMIN');
262 |       expect(result.citiesStats).toHaveLength(2);
263 |       const lviv = result.citiesStats.find((c) => c.cityId === 'c-1');
264 |       expect(lviv?.schoolsCount).toBe(50);
265 |       expect(lviv?.activeEvents).toBe(5);
266 |       expect(lviv?.monthRevenue).toBe(20000);
267 |     });
268 | 
269 |     it('повертає порожній citiesStats для не-SUPERADMIN', async () => {
270 |       defaultMocks();
271 |       const result = await service.getSummary('city-1', 'MANAGER');
272 |       expect(result.citiesStats).toHaveLength(0);
273 |     });
274 |   });
275 | 
276 |   describe('getSummary — кеш', () => {
277 |     it('повертає кешований результат при повторному виклику', async () => {
278 |       defaultMocks();
279 |       await service.getSummary('city-1');
280 |       await service.getSummary('city-1');
281 |       // event.findMany має бути викликаний тільки один раз (для першого запиту)
282 |       expect(mockPrisma.event.findMany).toHaveBeenCalledTimes(3); // 3 = todayEvents + upcomingEvents + monthEvents
283 |     });
284 |   });
285 | });
286 | 
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
  0 | import {
  1 |   IsString,
  2 |   IsNotEmpty,
  3 |   IsOptional,
  4 |   IsNumber,
  5 |   Min,
  6 | } from 'class-validator';
  7 | import { Type } from 'class-transformer';
  8 | 
  9 | export class CreateEventDto {
 10 |   @IsString()
 11 |   @IsNotEmpty()
 12 |   cityId: string;
 13 | 
 14 |   @IsString()
 15 |   @IsNotEmpty()
 16 |   schoolId: string;
 17 | 
 18 |   @IsString()
 19 |   @IsNotEmpty()
 20 |   project: string;
 21 | 
 22 |   @IsString()
 23 |   @IsNotEmpty()
 24 |   date: string;
 25 | 
 26 |   @IsOptional()
 27 |   @IsString()
 28 |   time?: string;
 29 | 
 30 |   @IsOptional()
 31 |   @IsNumber()
 32 |   @Min(0)
 33 |   @Type(() => Number)
 34 |   childrenPlanned?: number;
 35 | 
 36 |   @IsOptional()
 37 |   @IsNumber()
 38 |   @Min(0)
 39 |   @Type(() => Number)
 40 |   price?: number;
 41 | 
 42 |   @IsOptional()
 43 |   @IsString()
 44 |   paymentMethod?: string;
 45 | 
 46 |   @IsOptional()
 47 |   @IsString()
 48 |   address?: string;
 49 | 
 50 |   @IsOptional()
 51 |   @IsString()
 52 |   contactPerson?: string;
 53 | 
 54 |   @IsOptional()
 55 |   @IsString()
 56 |   contactPhone?: string;
 57 | 
 58 |   @IsOptional()
 59 |   @IsString()
 60 |   equipment?: string;
 61 | 
 62 |   @IsOptional()
 63 |   @IsString()
 64 |   nextProject?: string;
 65 | 
 66 |   @IsOptional()
 67 |   @IsString()
 68 |   responsibleId?: string;
 69 | }
 70 | 
```

### File: apps/backend/src/events/dto/reschedule-event.dto.ts
```ts
  0 | import { IsString, IsNotEmpty } from 'class-validator';
  1 | 
  2 | export class RescheduleEventDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   date: string;
  6 | 
  7 |   @IsString()
  8 |   @IsNotEmpty()
  9 |   time: string;
 10 | }
 11 | 
```

### File: apps/backend/src/events/dto/submit-report.dto.ts
```ts
  0 | import {
  1 |   IsBoolean,
  2 |   IsNumber,
  3 |   IsOptional,
  4 |   IsString,
  5 |   IsArray,
  6 |   ValidateNested,
  7 |   Min,
  8 |   Max,
  9 | } from 'class-validator';
 10 | import { Type } from 'class-transformer';
 11 | 
 12 | export class ExpenseItemDto {
 13 |   @IsOptional()
 14 |   @IsString()
 15 |   category?: string;
 16 | 
 17 |   @IsOptional()
 18 |   @IsString()
 19 |   name?: string;
 20 | 
 21 |   @IsNumber()
 22 |   @Min(0)
 23 |   @Type(() => Number)
 24 |   amount: number;
 25 | }
 26 | 
 27 | export class SalaryItemDto {
 28 |   @IsString()
 29 |   userId: string;
 30 | 
 31 |   @IsString()
 32 |   name: string;
 33 | 
 34 |   @IsNumber()
 35 |   @Min(0)
 36 |   @Type(() => Number)
 37 |   amount: number;
 38 | 
 39 |   @IsOptional()
 40 |   @IsString()
 41 |   role?: string;
 42 | }
 43 | 
 44 | export class SubmitReportDto {
 45 |   @IsBoolean()
 46 |   announcementDone: boolean;
 47 | 
 48 |   @IsBoolean()
 49 |   materialShown: boolean;
 50 | 
 51 |   @IsNumber()
 52 |   @Min(0)
 53 |   @Type(() => Number)
 54 |   childrenCount: number;
 55 | 
 56 |   @IsNumber()
 57 |   @Min(0)
 58 |   @Type(() => Number)
 59 |   classesCount: number;
 60 | 
 61 |   @IsNumber()
 62 |   @Min(0)
 63 |   @Type(() => Number)
 64 |   privilegedCount: number;
 65 | 
 66 |   @IsNumber()
 67 |   @Min(0)
 68 |   @Type(() => Number)
 69 |   showingsCount: number;
 70 | 
 71 |   @IsNumber()
 72 |   @Min(0)
 73 |   @Type(() => Number)
 74 |   totalSum: number;
 75 | 
 76 |   @IsNumber()
 77 |   @Min(0)
 78 |   @Type(() => Number)
 79 |   schoolSum: number;
 80 | 
 81 |   @IsNumber()
 82 |   @Type(() => Number)
 83 |   remainderSum: number;
 84 | 
 85 |   @IsOptional()
 86 |   @IsNumber()
 87 |   @Min(0)
 88 |   @Max(5)
 89 |   @Type(() => Number)
 90 |   rating?: number;
 91 | 
 92 |   @IsArray()
 93 |   @ValidateNested({ each: true })
 94 |   @Type(() => ExpenseItemDto)
 95 |   expenses: ExpenseItemDto[];
 96 | 
 97 |   @IsArray()
 98 |   @ValidateNested({ each: true })
 99 |   @Type(() => SalaryItemDto)
100 |   salaries: SalaryItemDto[];
101 | }
102 | 
```

### File: apps/backend/src/events/dto/update-preparation.dto.ts
```ts
  0 | import { IsString, IsNotEmpty } from 'class-validator';
  1 | 
  2 | export class UpdatePreparationDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   field: string;
  6 | 
  7 |   @IsString()
  8 |   @IsNotEmpty()
  9 |   status: string;
 10 | }
 11 | 
```

### File: apps/backend/src/events/dto/update-status.dto.ts
```ts
  0 | import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
  1 | 
  2 | export class UpdateStatusDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   status: string;
  6 | 
  7 |   @IsString()
  8 |   @IsNotEmpty()
  9 |   actionName: string;
 10 | 
 11 |   @IsOptional()
 12 |   @IsString()
 13 |   comment?: string;
 14 | }
 15 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { EventsController } from './events.controller';
  2 | import { EventsService } from './events.service';
  3 | import { JwtService } from '@nestjs/jwt';
  4 | 
  5 | describe('EventsController', () => {
  6 |   it('should be defined', async () => {
  7 |     const module = await Test.createTestingModule({
  8 |       controllers: [EventsController],
  9 |       providers: [
 10 |         { provide: EventsService, useValue: {} },
 11 |         { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
 12 |       ],
 13 |     }).compile();
 14 |     expect(module.get(EventsController)).toBeDefined();
 15 |   });
 16 | });
 17 | 
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
 18 | import { UpdateStatusDto } from './dto/update-status.dto';
 19 | import { UpdatePreparationDto } from './dto/update-preparation.dto';
 20 | import { RescheduleEventDto } from './dto/reschedule-event.dto';
 21 | 
 22 | @Controller('events')
 23 | @UseGuards(AuthGuard)
 24 | export class EventsController {
 25 |   constructor(private readonly eventsService: EventsService) {}
 26 | 
 27 |   // Список подій для поточного користувача.
 28 |   // Для водіїв/ведучих повертаються лише ті події, де вони у складі екіпажу.
 29 |   // Для менеджерів/адмінів — усі події.
 30 |   @Get()
 31 |   findAll(@CurrentUser() user: JwtUser) {
 32 |     return this.eventsService.findAllForUser(user);
 33 |   }
 34 | 
 35 |   @Post()
 36 |   create(@Body() body: CreateEventDto, @CurrentUser() user: JwtUser) {
 37 |     return this.eventsService.create(body, user);
 38 |   }
 39 | 
 40 |   @Get('school/:schoolId')
 41 |   findBySchool(
 42 |     @Param('schoolId') schoolId: string,
 43 |     @Query('minimal') minimal?: string,
 44 |   ) {
 45 |     return this.eventsService.findBySchool(schoolId, minimal === 'true');
 46 |   }
 47 | 
 48 |   @Patch(':id/status')
 49 |   updateStatus(
 50 |     @Param('id') id: string,
 51 |     @Body() body: UpdateStatusDto,
 52 |     @CurrentUser() user: JwtUser,
 53 |   ) {
 54 |     return this.eventsService.updateStatus(
 55 |       id,
 56 |       body.status,
 57 |       body.actionName,
 58 |       body.comment,
 59 |       user,
 60 |     );
 61 |   }
 62 | 
 63 |   @Patch(':id/preparation')
 64 |   updatePreparation(
 65 |     @Param('id') id: string,
 66 |     @Body() body: UpdatePreparationDto,
 67 |   ) {
 68 |     return this.eventsService.updatePreparationStatus(
 69 |       id,
 70 |       body.field,
 71 |       body.status,
 72 |     );
 73 |   }
 74 | 
 75 |   @Post(':id/assign-crew')
 76 |   assignCrew(
 77 |     @Param('id') id: string,
 78 |     @Body() body: { crewId: string }, // ЗМІНЕНО
 79 |   ) {
 80 |     return this.eventsService.assignCrewToEvent(id, body.crewId);
 81 |   }
 82 | 
 83 |   @Post(':id/history')
 84 |   addHistoryComment(
 85 |     @Param('id') id: string,
 86 |     @Body() body: { comment: string },
 87 |     @CurrentUser() user: JwtUser,
 88 |   ) {
 89 |     return this.eventsService.addHistoryComment(id, body.comment, user);
 90 |   }
 91 | 
 92 |   // Маршрут для оновлення коментаря
 93 |   @Patch('history/:historyId')
 94 |   updateHistoryComment(
 95 |     @Param('historyId') historyId: string,
 96 |     @Body() body: { comment: string },
 97 |   ) {
 98 |     return this.eventsService.updateHistoryComment(historyId, body.comment);
 99 |   }
100 | 
101 |   @Delete(':id')
102 |   remove(@Param('id') id: string) {
103 |     return this.eventsService.remove(id);
104 |   }
105 | 
106 |   @Post(':id/report')
107 |   submitReport(
108 |     @Param('id') id: string,
109 |     @Body() body: SubmitReportDto,
110 |     @CurrentUser() user: JwtUser,
111 |   ) {
112 |     return this.eventsService.submitReport(id, body, user);
113 |   }
114 | 
115 |   @Get('school/:schoolId/completed')
116 |   findCompletedBySchool(@Param('schoolId') schoolId: string) {
117 |     return this.eventsService.findCompletedBySchool(schoolId);
118 |   }
119 | 
120 |   @Get(':id')
121 |   findOne(@Param('id') id: string) {
122 |     return this.eventsService.findOne(id);
123 |   }
124 | 
125 |   @Patch(':id/reschedule')
126 |   reschedule(
127 |     @Param('id') id: string,
128 |     @Body() body: RescheduleEventDto,
129 |     @CurrentUser() user: JwtUser,
130 |   ) {
131 |     return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
132 |   }
133 | }
134 | 
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
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | import { TelegramService } from '../telegram/telegram.service';
  4 | 
  5 | const mockPrisma = {
  6 |   event: {
  7 |     findMany: jest.fn(),
  8 |     findUnique: jest.fn(),
  9 |     create: jest.fn(),
 10 |     update: jest.fn(),
 11 |     delete: jest.fn(),
 12 |   },
 13 |   eventHistory: {
 14 |     create: jest.fn(),
 15 |     findMany: jest.fn(),
 16 |     update: jest.fn(),
 17 |     deleteMany: jest.fn(),
 18 |   },
 19 |   eventPreparation: {
 20 |     findUnique: jest.fn(),
 21 |     create: jest.fn(),
 22 |     update: jest.fn(),
 23 |     deleteMany: jest.fn(),
 24 |   },
 25 |   eventReport: { upsert: jest.fn() },
 26 |   user: {
 27 |     findUnique: jest.fn(),
 28 |     update: jest.fn(),
 29 |   },
 30 | };
 31 | 
 32 | const mockTelegram = { sendMessage: jest.fn() };
 33 | 
 34 | const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' };
 35 | 
 36 | describe('EventsService', () => {
 37 |   let service: EventsService;
 38 | 
 39 |   beforeEach(async () => {
 40 |     jest.clearAllMocks();
 41 |     const module: TestingModule = await Test.createTestingModule({
 42 |       providers: [
 43 |         EventsService,
 44 |         { provide: PrismaService, useValue: mockPrisma },
 45 |         { provide: TelegramService, useValue: mockTelegram },
 46 |       ],
 47 |     }).compile();
 48 |     service = module.get<EventsService>(EventsService);
 49 |   });
 50 | 
 51 |   describe('updateStatus', () => {
 52 |     it('змінює статус і створює запис в історії', async () => {
 53 |       const updatedEvent = {
 54 |         id: 'ev-1',
 55 |         status: 'FIRST_CONTACT',
 56 |         crew: null,
 57 |         history: [{ id: 'h-1', action: 'Знайомство', userId: 'user-1' }],
 58 |       };
 59 |       mockPrisma.event.update.mockResolvedValueOnce(updatedEvent);
 60 | 
 61 |       const result = await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Знайомство', 'коментар', mockUser);
 62 | 
 63 |       expect(mockPrisma.event.update).toHaveBeenCalledWith({
 64 |         where: { id: 'ev-1' },
 65 |         data: {
 66 |           status: 'FIRST_CONTACT',
 67 |           history: {
 68 |             create: {
 69 |               action: 'Знайомство',
 70 |               comment: 'коментар',
 71 |               userId: 'user-1',
 72 |               userName: 'Менеджер',
 73 |               role: 'MANAGER',
 74 |             },
 75 |           },
 76 |         },
 77 |         include: expect.any(Object),
 78 |       });
 79 |       expect(result.status).toBe('FIRST_CONTACT');
 80 |     });
 81 | 
 82 |     it('зберігає null comment якщо коментар порожній', async () => {
 83 |       mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'FIRST_CONTACT', crew: null, history: [] });
 84 | 
 85 |       await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Дія', undefined, mockUser);
 86 | 
 87 |       const callData = mockPrisma.event.update.mock.calls[0][0];
 88 |       expect(callData.data.history.create.comment).toBeNull();
 89 |     });
 90 | 
 91 |     it('записує правильного userId з токена', async () => {
 92 |       mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'BASE', crew: null, history: [] });
 93 | 
 94 |       await service.updateStatus('ev-1', 'BASE', 'Дія', undefined, { sub: 'driver-99', name: 'Водій', role: 'DRIVER' });
 95 | 
 96 |       const callData = mockPrisma.event.update.mock.calls[0][0];
 97 |       expect(callData.data.history.create.userId).toBe('driver-99');
 98 |       expect(callData.data.history.create.role).toBe('DRIVER');
 99 |     });
100 |   });
101 | 
102 |   describe('addHistoryComment', () => {
103 |     it('створює коментар і повертає подію з оновленою історією', async () => {
104 |       mockPrisma.eventHistory.create.mockResolvedValueOnce({ id: 'h-new' });
105 |       mockPrisma.event.findUnique.mockResolvedValueOnce({
106 |         id: 'ev-1',
107 |         history: [{ id: 'h-new', action: 'Коментар', comment: 'тест' }],
108 |       });
109 | 
110 |       const result = await service.addHistoryComment('ev-1', 'тест', mockUser);
111 | 
112 |       expect(mockPrisma.eventHistory.create).toHaveBeenCalledWith({
113 |         data: {
114 |           eventId: 'ev-1',
115 |           action: 'Коментар',
116 |           comment: 'тест',
117 |           userId: 'user-1',
118 |           userName: 'Менеджер',
119 |           role: 'MANAGER',
120 |         },
121 |       });
122 |       expect(result?.history).toHaveLength(1);
123 |     });
124 |   });
125 | 
126 |   describe('submitReport', () => {
127 |     const reportData = {
128 |       announcementDone: true,
129 |       materialShown: true,
130 |       childrenCount: 100,
131 |       classesCount: 4,
132 |       privilegedCount: 5,
133 |       showingsCount: 2,
134 |       totalSum: 10000,
135 |       schoolSum: 2000,
136 |       remainderSum: 8000,
137 |       rating: 9,
138 |       expenses: [],
139 |       salaries: [
140 |         { userId: 'host-1', amount: 1500 },
141 |         { userId: 'driver-1', amount: 1000 },
142 |       ],
143 |     };
144 | 
145 |     it('зберігає звіт через upsert', async () => {
146 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
147 |       mockPrisma.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
148 |       mockPrisma.event.update.mockResolvedValueOnce({
149 |         id: 'ev-1', status: 'REPORT', report: {}, history: [],
150 |       });
151 | 
152 |       await service.submitReport('ev-1', reportData, mockUser);
153 | 
154 |       expect(mockPrisma.eventReport.upsert).toHaveBeenCalledWith(
155 |         expect.objectContaining({
156 |           where: { eventId: 'ev-1' },
157 |           update: expect.objectContaining({ totalSum: 10000, remainderSum: 8000 }),
158 |           create: expect.objectContaining({ totalSum: 10000, remainderSum: 8000 }),
159 |         })
160 |       );
161 |     });
162 | 
163 |     it('нараховує зарплату користувачам', async () => {
164 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
165 |       mockPrisma.user.update.mockResolvedValue({});
166 |       mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });
167 | 
168 |       await service.submitReport('ev-1', reportData, mockUser);
169 | 
170 |       expect(mockPrisma.user.update).toHaveBeenCalledTimes(2);
171 |       expect(mockPrisma.user.update).toHaveBeenCalledWith({
172 |         where: { id: 'host-1' },
173 |         data: { balance: { increment: 1500 } },
174 |       });
175 |       expect(mockPrisma.user.update).toHaveBeenCalledWith({
176 |         where: { id: 'driver-1' },
177 |         data: { balance: { increment: 1000 } },
178 |       });
179 |     });
180 | 
181 |     it('не нараховує зарплату якщо amount = 0', async () => {
182 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
183 |       mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });
184 | 
185 |       await service.submitReport('ev-1', {
186 |         ...reportData,
187 |         salaries: [{ userId: 'host-1', amount: 0 }],
188 |       }, mockUser);
189 | 
190 |       expect(mockPrisma.user.update).not.toHaveBeenCalled();
191 |     });
192 | 
193 |     it('змінює статус на REPORT після збереження звіту', async () => {
194 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
195 |       mockPrisma.user.update.mockResolvedValue({});
196 |       mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });
197 | 
198 |       const result = await service.submitReport('ev-1', reportData, mockUser);
199 | 
200 |       expect(mockPrisma.event.update).toHaveBeenCalledWith(
201 |         expect.objectContaining({
202 |           where: { id: 'ev-1' },
203 |           data: expect.objectContaining({ status: 'REPORT' }),
204 |         })
205 |       );
206 |       expect(result.status).toBe('REPORT');
207 |     });
208 | 
209 |     it('не нараховує зарплату якщо salaries порожній', async () => {
210 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
211 |       mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });
212 | 
213 |       await service.submitReport('ev-1', { ...reportData, salaries: [] }, mockUser);
214 | 
215 |       expect(mockPrisma.user.update).not.toHaveBeenCalled();
216 |     });
217 |   });
218 | 
219 |   describe('findBySchool', () => {
220 |     it('minimal=true — використовує select без history/preparation', async () => {
221 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
222 |       await service.findBySchool('school-1', true);
223 |       const call = mockPrisma.event.findMany.mock.calls[0][0];
224 |       expect(call.select).toBeDefined();
225 |       expect(call.include).toBeUndefined();
226 |     });
227 | 
228 |     it('minimal=false — використовує include з history та preparation', async () => {
229 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
230 |       await service.findBySchool('school-1', false);
231 |       const call = mockPrisma.event.findMany.mock.calls[0][0];
232 |       expect(call.include).toBeDefined();
233 |       expect(call.select).toBeUndefined();
234 |     });
235 |   });
236 | });
```

### File: apps/backend/src/events/events.service.ts
```ts
  0 | import { Injectable, Logger } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import { TelegramService } from '../telegram/telegram.service';
  3 | import { Prisma } from '@prisma/client';
  4 | 
  5 | import { CreateEventDto } from './dto/create-event.dto';
  6 | import {
  7 |   SubmitReportDto,
  8 |   ExpenseItemDto,
  9 |   SalaryItemDto,
 10 | } from './dto/submit-report.dto';
 11 | import { JwtUser } from '../auth/interfaces/jwt-user.interface';
 12 | 
 13 | /* eslint-disable @typescript-eslint/no-unsafe-assignment */
 14 | 
 15 | const FIELD_ROLES = ['DRIVER', 'HOST'];
 16 | 
 17 | @Injectable()
 18 | export class EventsService {
 19 |   private readonly logger = new Logger(EventsService.name);
 20 | 
 21 |   constructor(
 22 |     private readonly prisma: PrismaService,
 23 |     private telegramService: TelegramService,
 24 |   ) {}
 25 | 
 26 |   // Список подій для сторінки "Події".
 27 |   // Водій/ведучий бачить тільки події, де він призначений в екіпаж.
 28 |   // Решта ролей (менеджер, адмін тощо) бачать усі події.
 29 |   async findAllForUser(user: JwtUser) {
 30 |     const isFieldStaff = FIELD_ROLES.includes(user.role);
 31 | 
 32 |     return this.prisma.event.findMany({
 33 |       where: isFieldStaff
 34 |         ? {
 35 |             crew: {
 36 |               OR: [{ hostId: user.sub }, { driverId: user.sub }],
 37 |             },
 38 |           }
 39 |         : {},
 40 |       include: {
 41 |         school: { select: { id: true, name: true, type: true } },
 42 |         city: { select: { id: true, name: true } },
 43 |         crew: {
 44 |           include: {
 45 |             host: { select: { id: true, name: true } },
 46 |             driver: { select: { id: true, name: true } },
 47 |           },
 48 |         },
 49 |       },
 50 |       orderBy: { date: 'asc' },
 51 |     });
 52 |   }
 53 | 
 54 |   // Оновлюємо метод create
 55 |   async create(data: CreateEventDto, user: JwtUser) {
 56 |     return this.prisma.event.create({
 57 |       data: {
 58 |         ...data,
 59 |         status: 'BASE' as never,
 60 |         date: new Date(data.date),
 61 |         history: {
 62 |           create: {
 63 |             action: 'Створено подію. Етап: База',
 64 |             userId: user.sub, // Беремо ID з токена
 65 |             userName: user.name, // Беремо ім'я з токена
 66 |             role: user.role, // Беремо роль з токена
 67 |           },
 68 |         },
 69 |       },
 70 |       include: { history: true },
 71 |     });
 72 |   }
 73 | 
 74 |   // Оновлюємо метод updateStatus
 75 |   async updateStatus(
 76 |     eventId: string,
 77 |     newStatus: string,
 78 |     actionName: string,
 79 |     comment: string | undefined,
 80 |     user: JwtUser,
 81 |   ) {
 82 |     return this.prisma.event.update({
 83 |       where: { id: eventId },
 84 |       data: {
 85 |         status: newStatus as never,
 86 |         history: {
 87 |           create: {
 88 |             action: actionName,
 89 |             comment: comment || null,
 90 |             userId: user.sub, // Більше ніяких 'superadmin-123'!
 91 |             userName: user.name,
 92 |             role: user.role,
 93 |           },
 94 |         },
 95 |       },
 96 |       include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
 97 |     });
 98 |   }
 99 | 
100 |   // Оновлюємо статус підготовки
101 |   async updatePreparationStatus(
102 |     eventId: string,
103 |     field: string,
104 |     status: string,
105 |   ) {
106 |     const existing = await this.prisma.eventPreparation.findUnique({
107 |       where: { eventId },
108 |     });
109 | 
110 |     if (existing) {
111 |       return this.prisma.eventPreparation.update({
112 |         where: { eventId },
113 |         data: { [field]: status },
114 |       });
115 |     } else {
116 |       return this.prisma.eventPreparation.create({
117 |         data: { eventId, [field]: status },
118 |       });
119 |     }
120 |   }
121 | 
122 |   // --- ВСТАВЛЯЙ ОНОВЛЕНИЙ МЕТОД ТУТ ---
123 |   async assignCrewToEvent(
124 |     eventId: string,
125 |     crewId: string, // ЗМІНЕНО: Тепер приймаємо тільки ID існуючого екіпажу
126 |   ) {
127 |     const event = await this.prisma.event.update({
128 |       where: { id: eventId },
129 |       data: { crewId: crewId },
130 |       include: {
131 |         crew: { include: { host: true, driver: true } },
132 |         school: true,
133 |         city: true,
134 |         preparation: true,
135 |         history: { orderBy: { createdAt: 'desc' } },
136 |       },
137 |     });
138 | 
139 |     const hostId = event.crew?.hostId;
140 |     const driverId = event.crew?.driverId;
141 | 
142 |     const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
143 |       day: '2-digit',
144 |       month: 'long',
145 |       year: 'numeric',
146 |     });
147 |     const timeStr = event.time ? `, ${event.time}` : '';
148 | 
149 |     const buildMessage = (role: 'ведучий' | 'водій') =>
150 |       `🎯 <b>Вас призначено на подію!</b>\n\n` +
151 |       `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
152 |       `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
153 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
154 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
155 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
156 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
157 |       (event.contactPerson
158 |         ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
159 |         : '') +
160 |       (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
161 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
162 | 
163 |     if (hostId) {
164 |       const hostChatId = await this.getChatIdForUser(hostId);
165 |       this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);
166 | 
167 |       if (hostChatId) {
168 |         await this.telegramService.sendMessage(
169 |           hostChatId,
170 |           buildMessage('ведучий'),
171 |         );
172 |       } else {
173 |         this.logger.warn(
174 |           `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
175 |         );
176 |       }
177 |     }
178 | 
179 |     if (driverId) {
180 |       const driverChatId = await this.getChatIdForUser(driverId);
181 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
182 | 
183 |       if (driverChatId) {
184 |         await this.telegramService.sendMessage(
185 |           driverChatId,
186 |           buildMessage('водій'),
187 |         );
188 |       } else {
189 |         this.logger.warn(
190 |           `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
191 |         );
192 |       }
193 |     }
194 | 
195 |     if (driverId) {
196 |       const driver = await this.prisma.user.findUnique({
197 |         where: { id: driverId },
198 |       });
199 |       this.logger.log(
200 |         `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
201 |       );
202 |       const driverChatId =
203 |         driver?.telegramChatId ||
204 |         (driver?.telegramId && /^\d+$/.test(driver.telegramId)
205 |           ? driver.telegramId
206 |           : null);
207 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
208 |       if (driverChatId) {
209 |         await this.telegramService.sendMessage(
210 |           driverChatId,
211 |           buildMessage('водій'),
212 |         );
213 |       }
214 |     }
215 | 
216 |     return event;
217 |   }
218 | 
219 |   async rescheduleEvent(
220 |     eventId: string,
221 |     newDate: string,
222 |     newTime: string,
223 |     user: JwtUser,
224 |   ) {
225 |     const event = await this.prisma.event.update({
226 |       where: { id: eventId },
227 |       data: {
228 |         date: new Date(newDate),
229 |         time: newTime,
230 |         history: {
231 |           create: {
232 |             action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
233 |             userId: user.sub,
234 |             userName: user.name,
235 |             role: user.role,
236 |           },
237 |         },
238 |       },
239 |       include: {
240 |         crew: { include: { host: true, driver: true } },
241 |         school: true,
242 |         city: true,
243 |         history: { orderBy: { createdAt: 'desc' } },
244 |       },
245 |     });
246 | 
247 |     const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
248 |       day: '2-digit',
249 |       month: 'long',
250 |       year: 'numeric',
251 |     });
252 |     const msg =
253 |       `📅 <b>Подію перенесено!</b>\n\n` +
254 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
255 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
256 |       `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
257 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
258 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
259 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
260 | 
261 |     const sendTo = async (userId: string | null | undefined) => {
262 |       if (!userId) return;
263 |       const u = await this.prisma.user.findUnique({ where: { id: userId } });
264 |       const chatId =
265 |         u?.telegramChatId ||
266 |         (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
267 |       if (chatId) await this.telegramService.sendMessage(chatId, msg);
268 |     };
269 | 
270 |     await sendTo(event.crew?.hostId);
271 |     await sendTo(event.crew?.driverId);
272 | 
273 |     return event;
274 |   }
275 | 
276 |   async getChatIdForUser(userId: string): Promise<string | null> {
277 |     const user = await this.prisma.user.findUnique({ where: { id: userId } });
278 |     if (!user) return null;
279 | 
280 |     // Якщо користувач натиснув /start, telegramChatId буде заповнено
281 |     if (user.telegramChatId) return user.telegramChatId;
282 | 
283 |     // Якщо в telegramId вбито числовий ID вручну, можна спробувати його
284 |     if (user.telegramId && /^\d+$/.test(user.telegramId))
285 |       return user.telegramId;
286 | 
287 |     return null;
288 |   }
289 | 
290 |   async findBySchool(schoolId: string, minimal = false) {
291 |     if (minimal) {
292 |       return this.prisma.event.findMany({
293 |         where: { schoolId },
294 |         select: {
295 |           id: true,
296 |           project: true,
297 |           date: true,
298 |           time: true,
299 |           status: true,
300 |           price: true,
301 |           childrenPlanned: true,
302 |           address: true,
303 |           contactPerson: true,
304 |           contactPhone: true,
305 |           crewId: true,
306 |           crew: {
307 |             select: { id: true, name: true, hostId: true, driverId: true },
308 |           },
309 |         },
310 |         orderBy: { date: 'desc' },
311 |       });
312 |     }
313 |     return this.prisma.event.findMany({
314 |       where: { schoolId },
315 |       include: {
316 |         crew: { include: { host: true, driver: true } },
317 |         history: { orderBy: { createdAt: 'desc' } },
318 |         preparation: true,
319 |       },
320 |       orderBy: { date: 'desc' },
321 |     });
322 |   }
323 | 
324 |   async updateHistoryComment(historyId: string, comment: string) {
325 |     return this.prisma.eventHistory.update({
326 |       where: { id: historyId },
327 |       data: { comment: comment || null },
328 |     });
329 |   }
330 | 
331 |   async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
332 |     await this.prisma.eventHistory.create({
333 |       data: {
334 |         eventId,
335 |         action: 'Коментар',
336 |         comment,
337 |         userId: user.sub,
338 |         userName: user.name,
339 |         role: user.role,
340 |       },
341 |     });
342 | 
343 |     return this.prisma.event.findUnique({
344 |       where: { id: eventId },
345 |       include: {
346 |         history: { orderBy: { createdAt: 'desc' } },
347 |       },
348 |     });
349 |   }
350 | 
351 |   // ОНОВЛЕНО: Тепер метод видалення безпечно видаляє зв'язані дані
352 |   async remove(id: string) {
353 |     // 1. Видаляємо історію події
354 |     await this.prisma.eventHistory.deleteMany({
355 |       where: { eventId: id },
356 |     });
357 | 
358 |     // 2. Видаляємо підготовку події (якщо вона існує)
359 |     await this.prisma.eventPreparation.deleteMany({
360 |       where: { eventId: id },
361 |     });
362 | 
363 |     // 3. Тепер спокійно видаляємо саму подію
364 |     return this.prisma.event.delete({
365 |       where: { id },
366 |     });
367 |   }
368 | 
369 |   async submitReport(
370 |     eventId: string,
371 |     reportData: SubmitReportDto,
372 |     user: JwtUser,
373 |   ) {
374 |     // 1. Зберігаємо звіт у базу (без JSON полів)
375 |     await this.prisma.eventReport.upsert({
376 |       where: { eventId },
377 |       update: {
378 |         announcementDone: reportData.announcementDone,
379 |         materialShown: reportData.materialShown,
380 |         childrenCount: reportData.childrenCount,
381 |         classesCount: reportData.classesCount,
382 |         privilegedCount: reportData.privilegedCount,
383 |         showingsCount: reportData.showingsCount,
384 |         totalSum: reportData.totalSum,
385 |         schoolSum: reportData.schoolSum,
386 |         remainderSum: reportData.remainderSum,
387 |         rating: reportData.rating,
388 |       },
389 |       create: {
390 |         eventId,
391 |         announcementDone: reportData.announcementDone,
392 |         materialShown: reportData.materialShown,
393 |         childrenCount: reportData.childrenCount,
394 |         classesCount: reportData.classesCount,
395 |         privilegedCount: reportData.privilegedCount,
396 |         showingsCount: reportData.showingsCount,
397 |         totalSum: reportData.totalSum,
398 |         schoolSum: reportData.schoolSum,
399 |         remainderSum: reportData.remainderSum,
400 |         rating: reportData.rating,
401 |       },
402 |     });
403 | 
404 |     // Видаляємо старі записи витрат і зарплат
405 |     await this.prisma.expenseItem.deleteMany({ where: { reportId: eventId } });
406 |     await this.prisma.salaryItem.deleteMany({ where: { reportId: eventId } });
407 | 
408 |     // Створюємо нові записи витрат
409 |     if (reportData.expenses?.length) {
410 |       await this.prisma.expenseItem.createMany({
411 |         data: reportData.expenses.map((exp: ExpenseItemDto) => ({
412 |           reportId: eventId,
413 |           category: exp.category || 'Інше',
414 |           name: exp.name,
415 |           amount: new Prisma.Decimal(exp.amount || 0),
416 |         })),
417 |       });
418 |     }
419 | 
420 |     // Створюємо нові записи зарплат + нарахування балансу
421 |     if (reportData.salaries?.length) {
422 |       await this.prisma.salaryItem.createMany({
423 |         data: reportData.salaries.map((s: SalaryItemDto) => ({
424 |           reportId: eventId,
425 |           userId: s.userId,
426 |           userName: s.name,
427 |           amount: new Prisma.Decimal(s.amount || 0),
428 |           role: s.role,
429 |         })),
430 |       });
431 | 
432 |       await Promise.all(
433 |         reportData.salaries
434 |           .filter((s) => s.userId && s.amount > 0)
435 |           .map((s) =>
436 |             this.prisma.user.update({
437 |               where: { id: s.userId },
438 |               data: { balance: { increment: s.amount } },
439 |             }),
440 |           ),
441 |       );
442 |     }
443 | 
444 |     // 2. Оновлюємо статус події
445 |     return this.prisma.event.update({
446 |       where: { id: eventId },
447 |       data: {
448 |         status: 'REPORT' as never,
449 |         history: {
450 |           create: {
451 |             action: 'Сформовано звіт. Етап: Звіт',
452 |             userId: user.sub,
453 |             userName: user.name,
454 |             role: user.role,
455 |           },
456 |         },
457 |       },
458 |       include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
459 |     });
460 |   }
461 | 
462 |   async findOne(id: string) {
463 |     return this.prisma.event.findUnique({
464 |       where: { id },
465 |       include: {
466 |         school: true,
467 |         city: true,
468 |         crew: {
469 |           include: {
470 |             host: { select: { id: true, name: true } },
471 |             driver: { select: { id: true, name: true } },
472 |           },
473 |         },
474 |         report: true,
475 |       },
476 |     });
477 |   }
478 | 
479 |   async findCompletedBySchool(schoolId: string) {
480 |     return this.prisma.event.findMany({
481 |       where: { schoolId, status: 'RE_SALE' },
482 |       select: {
483 |         id: true,
484 |         project: true,
485 |         date: true,
486 |         status: true,
487 |         price: true,
488 |         childrenPlanned: true,
489 |         report: {
490 |           select: {
491 |             childrenCount: true,
492 |             classesCount: true,
493 |             privilegedCount: true,
494 |             showingsCount: true,
495 |             totalSum: true,
496 |             schoolSum: true,
497 |             remainderSum: true,
498 |             rating: true,
499 |             expenseItems: {
500 |               select: { category: true, name: true, amount: true },
501 |             },
502 |           },
503 |         },
504 |         history: { orderBy: { createdAt: 'asc' } },
505 |       },
506 |       orderBy: { date: 'desc' },
507 |     });
508 |   }
509 | }
510 | 
```

### File: apps/backend/src/finance/create-expense-item.dto.ts
```ts
  0 | import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
  1 | 
  2 | export class CreateExpenseItemDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   category: string;
  6 | 
  7 |   @IsNumber()
  8 |   @IsPositive() // Гарантує, що сума витрат буде > 0
  9 |   amount: number;
 10 | 
 11 |   @IsString()
 12 |   @IsNotEmpty()
 13 |   reportId: string;
 14 | }
 15 | 
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

### File: apps/backend/src/finance/finance.service.spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { FinanceService } from './finance.service';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | 
  4 | const mockPrisma = {
  5 |   eventReport: {
  6 |     aggregate: jest.fn(),
  7 |     findMany: jest.fn(),
  8 |   },
  9 |   event: {
 10 |     aggregate: jest.fn(),
 11 |     findMany: jest.fn(),
 12 |     count: jest.fn(),
 13 |   },
 14 |   city: { findMany: jest.fn() },
 15 |   user: { findUnique: jest.fn() },
 16 |   $queryRaw: jest.fn(),
 17 | };
 18 | 
 19 | describe('FinanceService', () => {
 20 |   let service: FinanceService;
 21 | 
 22 |   beforeEach(async () => {
 23 |     jest.clearAllMocks();
 24 |     const module: TestingModule = await Test.createTestingModule({
 25 |       providers: [
 26 |         FinanceService,
 27 |         { provide: PrismaService, useValue: mockPrisma },
 28 |       ],
 29 |     }).compile();
 30 |     service = module.get<FinanceService>(FinanceService);
 31 |     (service as any).cache.clear();
 32 |   });
 33 | 
 34 |   const defaultMocks = () => {
 35 |     mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
 36 |       _sum: { totalSum: 50000, remainderSum: 20000 },
 37 |       _count: { eventId: 10 },
 38 |     });
 39 |     mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
 40 |     mockPrisma.$queryRaw
 41 |       .mockResolvedValueOnce([]) // monthly
 42 |       .mockResolvedValueOnce([]) // byProject
 43 |       .mockResolvedValueOnce([]) // topCities
 44 |       .mockResolvedValueOnce([]); // topSchools
 45 |     mockPrisma.event.aggregate.mockResolvedValueOnce({
 46 |       _sum: { price: 30000 },
 47 |     });
 48 |     mockPrisma.event.findMany.mockResolvedValueOnce([]);
 49 |     mockPrisma.city.findMany.mockResolvedValueOnce([]);
 50 |     mockPrisma.eventReport.findMany
 51 |       .mockResolvedValueOnce([]) // topEvents
 52 |       .mockResolvedValueOnce([]); // worstEvents
 53 |   };
 54 | 
 55 |   describe('getDashboard — KPI', () => {
 56 |     it('коректно повертає KPI з aggregate', async () => {
 57 |       defaultMocks();
 58 |       const result = await service.getDashboard({});
 59 |       expect(result.kpi.totalRevenue).toBe(50000);
 60 |       expect(result.kpi.totalProfit).toBe(20000);
 61 |       expect(result.kpi.totalEvents).toBe(10);
 62 |     });
 63 | 
 64 |     it('повертає нулі якщо звітів немає', async () => {
 65 |       mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
 66 |         _sum: { totalSum: null, remainderSum: null },
 67 |         _count: { eventId: 0 },
 68 |       });
 69 |       mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
 70 |       mockPrisma.$queryRaw
 71 |         .mockResolvedValueOnce([])
 72 |         .mockResolvedValueOnce([])
 73 |         .mockResolvedValueOnce([])
 74 |         .mockResolvedValueOnce([]);
 75 |       mockPrisma.event.aggregate.mockResolvedValueOnce({
 76 |         _sum: { price: null },
 77 |       });
 78 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
 79 |       mockPrisma.city.findMany.mockResolvedValueOnce([]);
 80 |       mockPrisma.eventReport.findMany
 81 |         .mockResolvedValueOnce([])
 82 |         .mockResolvedValueOnce([]);
 83 | 
 84 |       const result = await service.getDashboard({});
 85 |       expect(result.kpi.totalRevenue).toBe(0);
 86 |       expect(result.kpi.totalProfit).toBe(0);
 87 |       expect(result.kpi.totalEvents).toBe(0);
 88 |     });
 89 |   });
 90 | 
 91 |   describe('getDashboard — фільтри', () => {
 92 |     it('передає cityId у where для Prisma', async () => {
 93 |       defaultMocks();
 94 |       await service.getDashboard({ cityId: 'city-1' });
 95 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
 96 |       expect(aggregateCall.where.event.cityId).toBe('city-1');
 97 |     });
 98 | 
 99 |     it('передає project у where для Prisma', async () => {
100 |       defaultMocks();
101 |       await service.getDashboard({ project: 'Голограма' });
102 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
103 |       expect(aggregateCall.where.event.project).toBe('Голограма');
104 |     });
105 | 
106 |     it('period=month генерує dateFrom з початку місяця', async () => {
107 |       defaultMocks();
108 |       await service.getDashboard({ period: 'month' });
109 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
110 |       const dateFrom = aggregateCall.where.event.date?.gte;
111 |       expect(dateFrom).toBeDefined();
112 |       const now = new Date();
113 |       expect(dateFrom.getMonth()).toBe(now.getMonth());
114 |       expect(dateFrom.getDate()).toBe(1);
115 |     });
116 | 
117 |     it('period=year генерує dateFrom з 1 січня', async () => {
118 |       defaultMocks();
119 |       await service.getDashboard({ period: 'year' });
120 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
121 |       const dateFrom = aggregateCall.where.event.date?.gte;
122 |       expect(dateFrom.getMonth()).toBe(0);
123 |       expect(dateFrom.getDate()).toBe(1);
124 |     });
125 | 
126 |     it('без period — dateFrom undefined', async () => {
127 |       defaultMocks();
128 |       await service.getDashboard({});
129 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
130 |       expect(aggregateCall.where.event.date).toBeUndefined();
131 |     });
132 |   });
133 | 
134 |   describe('getDashboard — minimal режим', () => {
135 |     it('minimal=true не запитує topSchools/topCities/byProject', async () => {
136 |       mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
137 |         _sum: { totalSum: 10000, remainderSum: 4000 },
138 |         _count: { eventId: 2 },
139 |       });
140 |       mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
141 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]); // monthly
142 |       mockPrisma.event.aggregate.mockResolvedValueOnce({
143 |         _sum: { price: 5000 },
144 |       });
145 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
146 |       mockPrisma.city.findMany.mockResolvedValueOnce([]);
147 | 
148 |       const result = await service.getDashboard({ minimal: true });
149 | 
150 |       expect(result).toHaveProperty('kpi');
151 |       expect(result).toHaveProperty('monthly');
152 |       expect(result).not.toHaveProperty('topSchools');
153 |       expect(result).not.toHaveProperty('topCities');
154 |       expect(result).not.toHaveProperty('byProject');
155 |       // $queryRaw має бути викликаний лише 1 раз (monthly), не 4
156 |       expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);
157 |     });
158 |   });
159 | 
160 |   describe('getDashboard — витрати по категоріях', () => {
161 |     it('агрегує витрати по категоріях', async () => {
162 |       mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
163 |         _sum: { totalSum: 10000, remainderSum: 4000 },
164 |         _count: { eventId: 2 },
165 |       });
166 |       mockPrisma.eventReport.findMany.mockResolvedValueOnce([
167 |         {
168 |           expenses: [
169 |             { category: 'Паливо', amount: 500 },
170 |             { category: 'Паливо', amount: 300 },
171 |           ],
172 |         },
173 |         { expenses: [{ category: 'Реклама', amount: 200 }] },
174 |       ]);
175 |       mockPrisma.$queryRaw
176 |         .mockResolvedValueOnce([])
177 |         .mockResolvedValueOnce([])
178 |         .mockResolvedValueOnce([])
179 |         .mockResolvedValueOnce([]);
180 |       mockPrisma.event.aggregate.mockResolvedValueOnce({ _sum: { price: 0 } });
181 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
182 |       mockPrisma.city.findMany.mockResolvedValueOnce([]);
183 |       mockPrisma.eventReport.findMany
184 |         .mockResolvedValueOnce([])
185 |         .mockResolvedValueOnce([]);
186 | 
187 |       const result = await service.getDashboard({});
188 |       const fuel = result.byExpenseCategory.find(
189 |         (c: any) => c.name === 'Паливо',
190 |       );
191 |       const ads = result.byExpenseCategory.find(
192 |         (c: any) => c.name === 'Реклама',
193 |       );
194 |       expect(fuel?.value).toBe(800);
195 |       expect(ads?.value).toBe(200);
196 |       expect(result.kpi.totalExpenses).toBe(1000);
197 |     });
198 |   });
199 | 
200 |   describe('getDashboard — кеш', () => {
201 |     it('повторний виклик з тими ж параметрами не робить нових запитів', async () => {
202 |       defaultMocks();
203 |       await service.getDashboard({ cityId: 'city-1' });
204 |       await service.getDashboard({ cityId: 'city-1' });
205 |       expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(1);
206 |     });
207 | 
208 |     it('різні параметри — різні записи в кеші', async () => {
209 |       defaultMocks();
210 |       defaultMocks();
211 |       await service.getDashboard({ cityId: 'city-1' });
212 |       await service.getDashboard({ cityId: 'city-2' });
213 |       expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(2);
214 |     });
215 |   });
216 | 
217 |   describe('getMyBalance', () => {
218 |     it('повертає баланс користувача', async () => {
219 |       mockPrisma.user.findUnique.mockResolvedValueOnce({
220 |         balance: 5000,
221 |         name: 'Іван',
222 |       });
223 |       const result = await service.getMyBalance('user-1');
224 |       expect(result.balance).toBe(5000);
225 |       expect(result.name).toBe('Іван');
226 |     });
227 | 
228 |     it('повертає 0 якщо користувач не знайдений', async () => {
229 |       mockPrisma.user.findUnique.mockResolvedValueOnce(null);
230 |       const result = await service.getMyBalance('unknown');
231 |       expect(result.balance).toBe(0);
232 |     });
233 |   });
234 | 
235 |   describe('resolveDateFrom', () => {
236 |     it('month → перший день поточного місяця', () => {
237 |       const result = (service as any).resolveDateFrom('month');
238 |       const now = new Date();
239 |       expect(result.getFullYear()).toBe(now.getFullYear());
240 |       expect(result.getMonth()).toBe(now.getMonth());
241 |       expect(result.getDate()).toBe(1);
242 |     });
243 | 
244 |     it('quarter → перший день поточного кварталу', () => {
245 |       const result = (service as any).resolveDateFrom('quarter');
246 |       const now = new Date();
247 |       const expectedMonth = Math.floor(now.getMonth() / 3) * 3;
248 |       expect(result.getMonth()).toBe(expectedMonth);
249 |       expect(result.getDate()).toBe(1);
250 |     });
251 | 
252 |     it('year → 1 січня', () => {
253 |       const result = (service as any).resolveDateFrom('year');
254 |       expect(result.getMonth()).toBe(0);
255 |       expect(result.getDate()).toBe(1);
256 |     });
257 | 
258 |     it('undefined → повертає undefined', () => {
259 |       const result = (service as any).resolveDateFrom(undefined);
260 |       expect(result).toBeUndefined();
261 |     });
262 |   });
263 | });
264 | 
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
 18 |   constructor(private readonly prisma: PrismaService) {}
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
105 |     // -------------------------------------------------------------------------
106 |     // 2. Витрати по категоріях (тепер через реляційну таблицю ExpenseItem)
107 |     // -------------------------------------------------------------------------
108 |     // -------------------------------------------------------------------------
109 |     // 2. Витрати по категоріях (через нову таблицю ExpenseItem)
110 |     // -------------------------------------------------------------------------
111 |     const expensesRaw = await this.prisma.expenseItem.findMany({
112 |       where: {
113 |         report: {
114 |           event: baseEventWhere,
115 |         },
116 |       },
117 |       select: {
118 |         category: true,
119 |         name: true,
120 |         amount: true,
121 |       },
122 |     });
123 | 
124 |     const expCatMap: Record<string, number> = {};
125 |     let totalExpenses = 0;
126 | 
127 |     for (const exp of expensesRaw) {
128 |       const cat: string = exp.category || exp.name || 'Інше';
129 |       const amt: number = Number(exp.amount) || 0;
130 |       expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
131 |       totalExpenses += amt;
132 |     }
133 | 
134 |     const byExpenseCategory = Object.entries(expCatMap).map(
135 |       ([name, value]) => ({
136 |         name,
137 |         value,
138 |       }),
139 |     );
140 | 
141 |     // -------------------------------------------------------------------------
142 |     // 3. Графік по місяцях — агрегація в БД
143 |     // -------------------------------------------------------------------------
144 |     type MonthlyRow = {
145 |       year: number;
146 |       month: number;
147 |       revenue: number;
148 |       profit: number;
149 |     };
150 |     const monthlyRaw = await this.prisma.$queryRaw<MonthlyRow[]>`
151 |       SELECT
152 |         EXTRACT(YEAR  FROM e.date)::int                   AS year,
153 |         EXTRACT(MONTH FROM e.date)::int                   AS month,
154 |         COALESCE(SUM(r."totalSum"),      0)::float        AS revenue,
155 |         COALESCE(SUM(r."remainderSum"),  0)::float        AS profit
156 |       FROM "Event" e
157 |       JOIN "EventReport" r ON r."eventId" = e.id
158 |       WHERE e.status = 'RE_SALE'
159 |       ${filters}
160 |       GROUP BY year, month
161 |       ORDER BY year, month
162 |     `;
163 | 
164 |     const monthly = monthlyRaw.map((row) => ({
165 |       month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
166 |         month: 'short',
167 |         year: '2-digit',
168 |       }),
169 |       revenue: row.revenue,
170 |       profit: row.profit,
171 |     }));
172 | 
173 |     // -------------------------------------------------------------------------
174 |     // 4. Очікувана виручка — aggregate замість findMany + reduce
175 |     // -------------------------------------------------------------------------
176 |     const plannedAgg = await this.prisma.event.aggregate({
177 |       where: {
178 |         status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
179 |         ...(cityId ? { cityId } : {}),
180 |       },
181 |       _sum: { price: true },
182 |     });
183 |     const expectedRevenue = plannedAgg._sum.price ?? 0;
184 | 
185 |     // -------------------------------------------------------------------------
186 |     // 5. Фільтри (проєкти + міста) — паралельно, без join
187 |     // -------------------------------------------------------------------------
188 |     const [projectsRaw, cities] = await Promise.all([
189 |       this.prisma.event.findMany({
190 |         select: { project: true },
191 |         distinct: ['project'],
192 |       }),
193 |       this.prisma.city.findMany({ select: { id: true, name: true } }),
194 |     ]);
195 |     const filterOptions = {
196 |       projects: projectsRaw.map((p) => p.project).filter(Boolean),
197 |       cities,
198 |     };
199 | 
200 |     // -------------------------------------------------------------------------
201 |     // minimal — повертаємо лише KPI + monthly + фільтри
202 |     // -------------------------------------------------------------------------
203 |     if (minimal) {
204 |       const result = {
205 |         kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
206 |         monthly,
207 |         expectedRevenue,
208 |         filters: filterOptions,
209 |       };
210 |       this.setCached(cacheKey, result);
211 |       return result;
212 |     }
213 | 
214 |     // -------------------------------------------------------------------------
215 |     // 6. Структура доходів по проєктах
216 |     // -------------------------------------------------------------------------
217 |     type ProjectRow = { project: string; value: number };
218 |     const byProjectRows = await this.prisma.$queryRaw<ProjectRow[]>`
219 |       SELECT
220 |         COALESCE(e.project, 'Інше')              AS project,
221 |         COALESCE(SUM(r."totalSum"), 0)::float    AS value
222 |       FROM "Event" e
223 |       JOIN "EventReport" r ON r."eventId" = e.id
224 |       WHERE e.status = 'RE_SALE'
225 |       ${filters}
226 |       GROUP BY e.project
227 |       ORDER BY value DESC
228 |     `;
229 |     const byProject = byProjectRows.map((r) => ({
230 |       name: r.project,
231 |       value: r.value,
232 |     }));
233 | 
234 |     // -------------------------------------------------------------------------
235 |     // 7. Топ міст
236 |     // -------------------------------------------------------------------------
237 |     type CityRow = {
238 |       cityId: string;
239 |       name: string;
240 |       revenue: number;
241 |       profit: number;
242 |     };
243 |     const topCitiesRows = await this.prisma.$queryRaw<CityRow[]>`
244 |       SELECT
245 |         e."cityId",
246 |         COALESCE(c.name, '—')                    AS name,
247 |         COALESCE(SUM(r."totalSum"),     0)::float AS revenue,
248 |         COALESCE(SUM(r."remainderSum"), 0)::float AS profit
249 |       FROM "Event" e
250 |       JOIN "EventReport" r ON r."eventId" = e.id
251 |       LEFT JOIN "City" c   ON c.id = e."cityId"
252 |       WHERE e.status = 'RE_SALE'
253 |       ${filters}
254 |       GROUP BY e."cityId", c.name
255 |       ORDER BY revenue DESC
256 |       LIMIT 5
257 |     `;
258 |     const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
259 |       name,
260 |       revenue,
261 |       profit,
262 |     }));
263 | 
264 |     // -------------------------------------------------------------------------
265 |     // 8. Топ шкіл
266 |     // -------------------------------------------------------------------------
267 |     type SchoolRow = {
268 |       schoolId: string;
269 |       name: string;
270 |       count: number;
271 |       revenue: number;
272 |     };
273 |     const topSchoolsRows = await this.prisma.$queryRaw<SchoolRow[]>`
274 |       SELECT
275 |         e."schoolId",
276 |         COALESCE(s.name, '—')                    AS name,
277 |         COUNT(e.id)::int                         AS count,
278 |         COALESCE(SUM(r."totalSum"), 0)::float    AS revenue
279 |       FROM "Event" e
280 |       JOIN "EventReport" r ON r."eventId" = e.id
281 |       LEFT JOIN "School" s ON s.id = e."schoolId"
282 |       WHERE e.status = 'RE_SALE'
283 |       ${filters}
284 |       GROUP BY e."schoolId", s.name
285 |       ORDER BY revenue DESC
286 |       LIMIT 5
287 |     `;
288 |     const topSchools = topSchoolsRows.map(({ name, count, revenue }) => ({
289 |       name,
290 |       count,
291 |       revenue,
292 |     }));
293 | 
294 |     // -------------------------------------------------------------------------
295 |     // 9. Топ/антитоп подій — лише потрібні поля, без масивних include
296 |     // -------------------------------------------------------------------------
297 |     const eventSelect = {
298 |       totalSum: true,
299 |       remainderSum: true,
300 |       event: {
301 |         select: {
302 |           id: true,
303 |           date: true,
304 |           school: { select: { name: true } },
305 |         },
306 |       },
307 |     } satisfies Prisma.EventReportSelect;
308 | 
309 |     const [topEventsRaw, worstEventsRaw] = await Promise.all([
310 |       this.prisma.eventReport.findMany({
311 |         where: { event: baseEventWhere },
312 |         select: eventSelect,
313 |         orderBy: { remainderSum: 'desc' },
314 |         take: 5,
315 |       }),
316 |       this.prisma.eventReport.findMany({
317 |         where: { event: baseEventWhere },
318 |         select: eventSelect,
319 |         orderBy: { remainderSum: 'asc' },
320 |         take: 5,
321 |       }),
322 |     ]);
323 | 
324 |     const mapEvent = (r: (typeof topEventsRaw)[number]) => ({
325 |       id: r.event.id,
326 |       date: r.event.date,
327 |       school: r.event.school?.name ?? '—',
328 |       profit: r.remainderSum ?? 0,
329 |       revenue: r.totalSum ?? 0,
330 |     });
331 | 
332 |     const topEvents = topEventsRaw.map(mapEvent);
333 |     const worstEvents = worstEventsRaw.map(mapEvent);
334 | 
335 |     // -------------------------------------------------------------------------
336 |     const result = {
337 |       kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
338 |       monthly,
339 |       byProject,
340 |       byExpenseCategory,
341 |       topCities,
342 |       topSchools,
343 |       topEvents,
344 |       worstEvents,
345 |       expectedRevenue,
346 |       filters: filterOptions,
347 |     };
348 |     this.setCached(cacheKey, result);
349 |     return result;
350 |   }
351 | 
352 |   // ---------------------------------------------------------------------------
353 |   async getStaffRevenue({
354 |     period,
355 |     cityId,
356 |   }: {
357 |     period?: string;
358 |     cityId?: string;
359 |   }) {
360 |     const dateFrom = this.resolveDateFrom(period);
361 |     const staffFilters = this.buildSqlFilters({ dateFrom, cityId });
362 | 
363 |     type StaffRow = {
364 |       id: string;
365 |       name: string;
366 |       role: 'HOST' | 'DRIVER';
367 |       revenue: number;
368 |       eventsCount: number;
369 |     };
370 | 
371 |     // Всі три запити йдуть паралельно
372 |     const [hostRows, driverRows, totalAgg, eventsCount] = await Promise.all([
373 |       // Ведучі
374 |       this.prisma.$queryRaw<StaffRow[]>`
375 |         SELECT
376 |           u.id,
377 |           u.name,
378 |           'HOST'::text                              AS role,
379 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
380 |           COUNT(e.id)::int                          AS "eventsCount"
381 |         FROM "Event" e
382 |         JOIN "EventCrew"    c ON c."eventId" = e.id
383 |         JOIN "User"         u ON u.id = c."hostId"
384 |         JOIN "EventReport"  r ON r."eventId" = e.id
385 |         WHERE e.status = 'RE_SALE'
386 |         ${staffFilters}
387 |         GROUP BY u.id, u.name
388 |       `,
389 |       // Водії
390 |       this.prisma.$queryRaw<StaffRow[]>`
391 |         SELECT
392 |           u.id,
393 |           u.name,
394 |           'DRIVER'::text                            AS role,
395 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
396 |           COUNT(e.id)::int                          AS "eventsCount"
397 |         FROM "Event" e
398 |         JOIN "EventCrew"   c ON c."eventId" = e.id
399 |         JOIN "User"        u ON u.id = c."driverId"
400 |         JOIN "EventReport" r ON r."eventId" = e.id
401 |         WHERE e.status = 'RE_SALE'
402 |         ${staffFilters}
403 |         GROUP BY u.id, u.name
404 |       `,
405 |       // Загальна виручка
406 |       this.prisma.$queryRaw<[{ revenue: number }]>`
407 |         SELECT COALESCE(SUM(r."totalSum"), 0)::float AS revenue
408 |         FROM "Event" e
409 |         JOIN "EventReport" r ON r."eventId" = e.id
410 |         WHERE e.status = 'RE_SALE'
411 |         ${staffFilters}
412 |       `,
413 |       // Кількість унікальних подій
414 |       this.prisma.event.count({
415 |         where: {
416 |           status: 'RE_SALE',
417 |           ...(dateFrom ? { date: { gte: dateFrom } } : {}),
418 |           ...(cityId ? { cityId } : {}),
419 |         },
420 |       }),
421 |     ]);
422 | 
423 |     const staff = [...hostRows, ...driverRows].sort(
424 |       (a, b) => b.revenue - a.revenue,
425 |     );
426 |     const totalRevenue = totalAgg[0]?.revenue ?? 0;
427 | 
428 |     return { staff, totalRevenue, eventsCount };
429 |   }
430 | }
431 | 
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
  2 | import { ValidationPipe } from '@nestjs/common';
  3 | 
  4 | async function bootstrap() {
  5 |   const app = await NestFactory.create(AppModule);
  6 |   app.enableCors();
  7 |   app.useGlobalPipes(
  8 |     new ValidationPipe({
  9 |       transform: true,
 10 |       whitelist: true,
 11 |       forbidNonWhitelisted: true,
 12 |     }),
 13 |   );
 14 |   await app.listen(process.env.PORT ?? 3000);
 15 | }
 16 | bootstrap();
 17 | 
```

### File: apps/backend/src/prisma/prisma.mock.ts
```ts
  0 | import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
  1 | import { PrismaService } from './prisma.service';
  2 | // Типізація для нашого моку, щоб автодоповнення працювало в тестах
  3 | export type MockPrismaService = DeepMockProxy<PrismaService>;
  4 | 
  5 | // Функція, яка створює глибокий мок PrismaClient
  6 | export const createPrismaMock = (): MockPrismaService => {
  7 |   return mockDeep<PrismaService>();
  8 | };
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
 11 | import { RolesGuard } from '../auth/guards/roles.guard';
 12 | import { Roles } from '../auth/decorators/roles.decorator';
 13 | 
 14 | @Controller('projects')
 15 | @UseGuards(AuthGuard, RolesGuard)
 16 | export class ProjectsController {
 17 |   constructor(private readonly projectsService: ProjectsService) {}
 18 | 
 19 |   @Get()
 20 |   findAll() {
 21 |     return this.projectsService.findAll();
 22 |   }
 23 | 
 24 |   @Post()
 25 |   @Roles('SUPERADMIN')
 26 |   create(@Body() body: { name: string; color: string }) {
 27 |     return this.projectsService.create(body);
 28 |   }
 29 | 
 30 |   @Delete(':id')
 31 |   @Roles('SUPERADMIN')
 32 |   remove(@Param('id') id: string) {
 33 |     return this.projectsService.remove(id);
 34 |   }
 35 | }
 36 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { SchoolsController } from './schools.controller';
  2 | import { SchoolsService } from './schools.service';
  3 | import { ParserService } from './parser.service';
  4 | import { AuthGuard } from '../auth/auth.guard';
  5 | import { RolesGuard } from '../auth/guards/roles.guard';
  6 | 
  7 | describe('SchoolsController', () => {
  8 |   it('should be defined', async () => {
  9 |     const module = await Test.createTestingModule({
 10 |       controllers: [SchoolsController],
 11 |       providers: [
 12 |         { provide: SchoolsService, useValue: {} },
 13 |         { provide: ParserService, useValue: {} },
 14 |         { provide: AuthGuard, useValue: { canActivate: () => true } },
 15 |         { provide: RolesGuard, useValue: { canActivate: () => true } },
 16 |       ],
 17 |     }).compile();
 18 |     expect(module.get(SchoolsController)).toBeDefined();
 19 |   });
 20 | });
 21 | 
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
  9 |   UseGuards,
 10 | } from '@nestjs/common';
 11 | import { SchoolsService } from './schools.service';
 12 | import { ParserService } from './parser.service';
 13 | import { RolesGuard } from '../auth/guards/roles.guard';
 14 | import { Roles } from '../auth/decorators/roles.decorator';
 15 | import { AuthGuard } from '../auth/auth.guard';
 16 | @Controller('schools')
 17 | @UseGuards(AuthGuard, RolesGuard)
 18 | export class SchoolsController {
 19 |   constructor(
 20 |     private readonly schoolsService: SchoolsService,
 21 |     private readonly parserService: ParserService,
 22 |   ) {}
 23 | 
 24 |   @Post('bulk-import')
 25 |   @Roles('SUPERADMIN', 'MANAGER')
 26 |   bulkImport(@Body() body: { cityId: string; type?: string }) {
 27 |     return this.schoolsService.bulkImport(
 28 |       body.cityId,
 29 |       (body.type as 'Школа' | 'Садочок') || 'Школа',
 30 |     );
 31 |   }
 32 | 
 33 |   @Get('supported-cities')
 34 |   getSupportedCities() {
 35 |     return this.parserService.getSupportedCities();
 36 |   }
 37 | 
 38 |   @Post()
 39 |   create(
 40 |     @Body()
 41 |     body: {
 42 |       name: string;
 43 |       type: string;
 44 |       cityId: string;
 45 |       sourceUrl?: string;
 46 |     },
 47 |   ) {
 48 |     return this.schoolsService.create(body);
 49 |   }
 50 | 
 51 |   @Get() findAll(@Query('minimal') minimal?: string) {
 52 |     return this.schoolsService.findAll(minimal === 'true');
 53 |   }
 54 | 
 55 |   // ⚠️ ВАЖЛИВО: цей маршрут МАЄ стояти ДО @Get(':id')
 56 |   @Get('search')
 57 |   search(@Query('q') q: string, @Query('type') type: string) {
 58 |     return this.parserService.searchSchools(q, type);
 59 |   }
 60 | 
 61 |   @Get(':id')
 62 |   findOne(@Param('id') id: string) {
 63 |     return this.schoolsService.findOne(id);
 64 |   }
 65 | 
 66 |   @Patch(':id')
 67 |   update(@Param('id') id: string, @Body() body: any) {
 68 |     return this.schoolsService.update(id, body);
 69 |   }
 70 | 
 71 |   @Delete(':id')
 72 |   @Roles('SUPERADMIN')
 73 |   remove(@Param('id') id: string) {
 74 |     return this.schoolsService.remove(id);
 75 |   }
 76 | 
 77 |   @Get('contacts/search')
 78 |   searchContacts(@Query('q') q: string, @Query('city') city: string) {
 79 |     return this.schoolsService.searchContacts(q, city);
 80 |   }
 81 | }
 82 | 
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
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | import { EventsService } from '../events/events.service';
  4 | import { ParserService } from './parser.service';
  5 | 
  6 | const mockPrisma = {
  7 |   school: {
  8 |     findMany: jest.fn(),
  9 |     findUnique: jest.fn(),
 10 |     create: jest.fn(),
 11 |     update: jest.fn(),
 12 |     delete: jest.fn(),
 13 |   },
 14 |   event: { findMany: jest.fn() },
 15 |   schoolContact: { findMany: jest.fn() },
 16 | };
 17 | 
 18 | describe('SchoolsService', () => {
 19 |   let service: SchoolsService;
 20 | 
 21 |   beforeEach(async () => {
 22 |     const module: TestingModule = await Test.createTestingModule({
 23 |       providers: [
 24 |         SchoolsService,
 25 |         { provide: PrismaService, useValue: mockPrisma },
 26 |         { provide: EventsService, useValue: { remove: jest.fn() } },
 27 |         {
 28 |           provide: ParserService,
 29 |           useValue: {
 30 |             parseSchoolData: jest.fn(),
 31 |             getAllSchoolsForCity: jest.fn(),
 32 |           },
 33 |         },
 34 |       ],
 35 |     }).compile();
 36 | 
 37 |     service = module.get<SchoolsService>(SchoolsService);
 38 |   });
 39 | 
 40 |   afterEach(() => jest.clearAllMocks());
 41 | 
 42 |   describe('findAll', () => {
 43 |     it('повертає всі школи', async () => {
 44 |       mockPrisma.school.findMany.mockResolvedValue([
 45 |         { id: '1', name: 'Школа №1' },
 46 |       ]);
 47 |       const result = await service.findAll();
 48 |       expect(result).toHaveLength(1);
 49 |       expect(mockPrisma.school.findMany).toHaveBeenCalledTimes(1);
 50 |     });
 51 | 
 52 |     it('minimal=true — select без include', async () => {
 53 |       mockPrisma.school.findMany.mockResolvedValue([]);
 54 |       await service.findAll(true);
 55 |       const call = mockPrisma.school.findMany.mock.calls[0][0];
 56 |       expect(call.select).toBeDefined();
 57 |       expect(call.include).toBeUndefined();
 58 |     });
 59 |   });
 60 | 
 61 |   describe('findOne', () => {
 62 |     it('повертає школу по id', async () => {
 63 |       mockPrisma.school.findUnique.mockResolvedValue({
 64 |         id: '1',
 65 |         name: 'Школа №1',
 66 |       });
 67 |       const result = await service.findOne('1');
 68 |       expect(result?.name).toBe('Школа №1');
 69 |     });
 70 |   });
 71 | 
 72 |   describe('update', () => {
 73 |     it('оновлює школу без системних полів', async () => {
 74 |       mockPrisma.school.update.mockResolvedValue({
 75 |         id: '1',
 76 |         name: 'Нова назва',
 77 |       });
 78 |       await service.update('1', {
 79 |         id: '1',
 80 |         name: 'Нова назва',
 81 |         city: 'Львів',
 82 |         createdAt: new Date(),
 83 |         updatedAt: new Date(),
 84 |       });
 85 |       const call = mockPrisma.school.update.mock.calls[0][0];
 86 |       expect(call.data.id).toBeUndefined();
 87 |       expect(call.data.city).toBeUndefined();
 88 |       expect(call.data.name).toBe('Нова назва');
 89 |     });
 90 |   });
 91 | });
 92 | 
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
  0 | import { Test } from '@nestjs/testing';
  1 | import { UsersController } from './users.controller';
  2 | import { UsersService } from './users.service';
  3 | import { AuthGuard } from '../auth/auth.guard';
  4 | import { RolesGuard } from '../auth/guards/roles.guard';
  5 | 
  6 | describe('UsersController', () => {
  7 |   it('should be defined', async () => {
  8 |     const module = await Test.createTestingModule({
  9 |       controllers: [UsersController],
 10 |       providers: [
 11 |         { provide: UsersService, useValue: {} },
 12 |         { provide: AuthGuard, useValue: { canActivate: () => true } },
 13 |         { provide: RolesGuard, useValue: { canActivate: () => true } },
 14 |       ],
 15 |     }).compile();
 16 |     expect(module.get(UsersController)).toBeDefined();
 17 |   });
 18 | });
 19 | 
```

### File: apps/backend/src/users/users.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Get,
  3 |   Post,
  4 |   Body,
  5 |   Patch,
  6 |   Param,
  7 |   Delete,
  8 |   UseGuards,
  9 | } from '@nestjs/common';
 10 | import { UsersService } from './users.service';
 11 | import { AuthGuard } from '../auth/auth.guard';
 12 | import { RolesGuard } from '../auth/guards/roles.guard';
 13 | import { Roles } from '../auth/decorators/roles.decorator';
 14 | 
 15 | @Controller('users')
 16 | @UseGuards(AuthGuard, RolesGuard)
 17 | export class UsersController {
 18 |   constructor(private readonly usersService: UsersService) {}
 19 | 
 20 |   @Get()
 21 |   getAll() {
 22 |     return this.usersService.getAllUsers();
 23 |   }
 24 | 
 25 |   @Post()
 26 |   @Roles('SUPERADMIN')
 27 |   create(@Body() body: any) {
 28 |     return this.usersService.createUser(body);
 29 |   }
 30 | 
 31 |   @Patch(':id')
 32 |   @Roles('SUPERADMIN')
 33 |   update(@Param('id') id: string, @Body() body: any) {
 34 |     return this.usersService.updateUser(id, body);
 35 |   }
 36 | 
 37 |   @Delete(':id')
 38 |   @Roles('SUPERADMIN')
 39 |   remove(@Param('id') id: string) {
 40 |     return this.usersService.deleteUser(id);
 41 |   }
 42 | 
 43 |   @Get('seed')
 44 |   seedAdmin() {
 45 |     return this.usersService.seedAdmin();
 46 |   }
 47 | 
 48 |   @Get('seed-vasya')
 49 |   seedVasya() {
 50 |     return this.usersService.seedVasya();
 51 |   }
 52 | }
 53 | 
```

### File: apps/backend/src/users/users.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { UsersService } from './users.service';
  2 | import { UsersController } from './users.controller';
  3 | import { TelegramModule } from '../telegram/telegram.module';
  4 | import { PrismaModule } from '../prisma/prisma.module';
  5 | 
  6 | @Module({
  7 |   imports: [TelegramModule],
  8 |   providers: [UsersService],
  9 |   controllers: [UsersController],
 10 |   exports: [UsersService],
 11 | })
 12 | export class UsersModule {}
 13 | 
```

### File: apps/backend/src/users/users.service.spec.ts
```ts
  0 | import { Test } from '@nestjs/testing';
  1 | import { UsersService } from './users.service';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | import { TelegramService } from '../telegram/telegram.service';
  4 | 
  5 | describe('UsersService', () => {
  6 |   it('should be defined', async () => {
  7 |     const module = await Test.createTestingModule({
  8 |       providers: [
  9 |         UsersService,
 10 |         { provide: PrismaService, useValue: { user: { findMany: jest.fn() } } },
 11 |         { provide: TelegramService, useValue: { sendMessage: jest.fn() } },
 12 |       ],
 13 |     }).compile();
 14 |     expect(module.get(UsersService)).toBeDefined();
 15 |   });
 16 | });
 17 | 
```

### File: apps/backend/src/users/users.service.ts
```ts
  0 | import { Injectable } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import * as bcrypt from 'bcrypt';
  3 | import { TelegramService } from '../telegram/telegram.service';
  4 | import { Prisma, User } from '@prisma/client';
  5 | @Injectable()
  6 | export class UsersService {
  7 |   constructor(
  8 |     private readonly prisma: PrismaService,
  9 |     private telegramService: TelegramService,
 10 |   ) {}
 11 | 
 12 |   async findByEmail(email: string): Promise<User | null> {
 13 |     return this.prisma.user.findUnique({
 14 |       where: { email },
 15 |     });
 16 |   }
 17 | 
 18 |   async findById(id: string): Promise<User | null> {
 19 |     return this.prisma.user.findUnique({
 20 |       where: { id },
 21 |     });
 22 |   }
 23 | 
 24 |   async getAllUsers() {
 25 |     return this.prisma.user.findMany({
 26 |       include: {
 27 |         city: true, // <--- Ось цей магічний рядок підтягне назву міста!
 28 |       },
 29 |     });
 30 |   }
 31 | 
 32 |   async create(data: Prisma.UserCreateInput): Promise<User> {
 33 |     return this.prisma.user.create({
 34 |       data,
 35 |     });
 36 |   }
 37 | 
 38 |   async createUser(data: any) {
 39 |     const hashedPassword = await bcrypt.hash(data.password, 10);
 40 |     const user = await this.prisma.user.create({
 41 |       data: {
 42 |         name: data.fullName,
 43 |         email: data.email,
 44 |         phone: data.phone,
 45 |         password: hashedPassword,
 46 |         role: data.role,
 47 |         cityId: data.cityId || null,
 48 |         telegramId: data.telegramId || null,
 49 |         car: data.car || null,
 50 |       },
 51 |     });
 52 | 
 53 |     // Надсилаємо вітальне повідомлення якщо вказано telegramId
 54 |     if (data.password) {
 55 |       // Шукаємо chat_id: якщо є збережений після /start — використовуємо його
 56 |       // інакше пробуємо telegramId напряму (якщо вже числовий)
 57 |       const chatId = user.telegramChatId || null;
 58 | 
 59 |       if (chatId) {
 60 |         await this.telegramService.sendWelcome(
 61 |           chatId,
 62 |           data.fullName,
 63 |           data.email,
 64 |           data.password,
 65 |         );
 66 |       }
 67 |     }
 68 | 
 69 |     return user;
 70 |   }
 71 | 
 72 |   async updateUser(id: string, data: any) {
 73 |     const updateData: any = {
 74 |       name: data.fullName,
 75 |       email: data.email,
 76 |       phone: data.phone,
 77 |       role: data.role,
 78 |       cityId: data.cityId || null,
 79 |       telegramId: data.telegramId || null,
 80 |       car: data.car || null,
 81 |     };
 82 | 
 83 |     // Якщо передано новий пароль, хешуємо його
 84 |     if (data.password) {
 85 |       updateData.password = await bcrypt.hash(data.password, 10);
 86 |     }
 87 | 
 88 |     return this.prisma.user.update({ where: { id }, data: updateData });
 89 |   }
 90 | 
 91 |   async deleteUser(id: string) {
 92 |     return this.prisma.user.delete({ where: { id } });
 93 |   }
 94 | 
 95 |   // Створення адміністратора
 96 |   async seedAdmin() {
 97 |     const existingAdmin = await this.prisma.user.findUnique({
 98 |       where: { email: 'admin@crm.com' },
 99 |     });
100 | 
101 |     if (existingAdmin) {
102 |       return { message: 'Адміністратор вже існує!' };
103 |     }
104 | 
105 |     const hashedPassword = await bcrypt.hash('admin123', 10);
106 |     const admin = await this.prisma.user.create({
107 |       data: {
108 |         name: 'Артур Шмальцель',
109 |         email: 'admin@crm.com',
110 |         password: hashedPassword,
111 |         role: 'SUPERADMIN',
112 |       },
113 |     });
114 | 
115 |     return { message: 'Суперадмін успішно створений!', user: admin };
116 |   }
117 | 
118 |   // Новий метод для додавання Васі
119 |   async seedVasya() {
120 |     const existingVasya = await this.prisma.user.findUnique({
121 |       where: { email: 'vasya@charisma.com' },
122 |     });
123 | 
124 |     if (existingVasya) {
125 |       return { message: 'Вася вже в базі!' };
126 |     }
127 | 
128 |     const hashedPassword = await bcrypt.hash('vasya123', 10);
129 | 
130 |     const vasya = await this.prisma.user.create({
131 |       data: {
132 |         name: 'Вася Харізма',
133 |         email: 'vasya@charisma.com',
134 |         password: hashedPassword,
135 |         role: 'MANAGER',
136 |       },
137 |     });
138 | 
139 |     return { message: 'Вася Харізма успішно доданий!', user: vasya };
140 |   }
141 | 
142 |   async findAll() {
143 |     return this.prisma.user.findMany();
144 |   }
145 | }
146 | 
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

### File: apps/frontend/e2e/login.spec.ts
```ts
  0 | import { test, expect } from "@playwright/test";
  1 | 
  2 | test.describe("Авторизація", () => {
  3 |   test("успішний логін перенаправляє на /cities", async ({ page }) => {
  4 |     await page.goto("/login");
  5 |     await page.fill('input[type="email"]', "admin@crm.com");
  6 |     await page.fill('input[type="password"]', "admin123");
  7 |     await page.click('button[type="submit"]');
  8 |     await expect(page).toHaveURL(/cities/, { timeout: 8000 });
  9 |   });
 10 | 
 11 |   test("невірний пароль — залишається на /login", async ({ page }) => {
 12 |     await page.goto("/login");
 13 |     await page.fill('input[type="email"]', "admin@crm.com");
 14 |     await page.fill('input[type="password"]', "wrongpassword");
 15 |     await page.click('button[type="submit"]');
 16 |     await expect(page).toHaveURL(/login/);
 17 |   });
 18 | 
 19 |   test("невірний пароль — показує повідомлення про помилку", async ({
 20 |     page,
 21 |   }) => {
 22 |     await page.goto("/login");
 23 |     await page.fill('input[type="email"]', "admin@crm.com");
 24 |     await page.fill('input[type="password"]', "wrongpassword");
 25 |     await page.click('button[type="submit"]');
 26 |     await expect(
 27 |       page.locator("text=/невірний|помилка|неправильний/i"),
 28 |     ).toBeVisible({ timeout: 5000 });
 29 |   });
 30 | 
 31 |   test("порожній email — кнопка не відправляє форму", async ({ page }) => {
 32 |     await page.goto("/login");
 33 |     await page.fill('input[type="password"]', "admin123");
 34 |     await page.click('button[type="submit"]');
 35 |     await expect(page).toHaveURL(/login/);
 36 |   });
 37 | 
 38 |   test("після логіну токен зберігається в localStorage", async ({ page }) => {
 39 |     await page.goto("/login");
 40 |     await page.fill('input[type="email"]', "admin@crm.com");
 41 |     await page.fill('input[type="password"]', "admin123");
 42 |     await page.click('button[type="submit"]');
 43 |     await page.waitForURL(/cities/);
 44 |     const token = await page.evaluate(() => localStorage.getItem("token"));
 45 |     expect(token).toBeTruthy();
 46 |   });
 47 | 
 48 |   test("після логауту токен видаляється", async ({ page }) => {
 49 |     // Логін
 50 |     await page.goto("/login");
 51 |     await page.fill('input[type="email"]', "admin@crm.com");
 52 |     await page.fill('input[type="password"]', "admin123");
 53 |     await page.click('button[type="submit"]');
 54 |     await page.waitForURL(/cities/);
 55 | 
 56 |     // Логаут через кнопку в Layout
 57 |     const logoutBtn = page.locator("button", { hasText: /вийти|logout/i });
 58 |     if (await logoutBtn.isVisible()) {
 59 |       await logoutBtn.click();
 60 |       const token = await page.evaluate(() => localStorage.getItem("token"));
 61 |       expect(token).toBeNull();
 62 |     }
 63 |   });
 64 | 
 65 |   test("захищений маршрут без токена перенаправляє на /login", async ({
 66 |     page,
 67 |   }) => {
 68 |     await page.evaluate(() => localStorage.removeItem("token"));
 69 |     await page.goto("/schools");
 70 |     await expect(page).toHaveURL(/login/);
 71 |   });
 72 | });
 73 | 
```

### File: apps/frontend/e2e/schools.spec.ts
```ts
  0 | import { test, expect, Page } from "@playwright/test";
  1 | 
  2 | // Хелпер логіну
  3 | async function login(page: Page) {
  4 |   await page.goto("/login");
  5 |   await page.fill('input[type="email"]', "admin@crm.com");
  6 |   await page.fill('input[type="password"]', "admin123");
  7 |   await page.click('button[type="submit"]');
  8 |   await page.waitForURL(/cities/, { timeout: 8000 });
  9 | }
 10 | 
 11 | test.describe("Сторінка шкіл", () => {
 12 |   test.beforeEach(async ({ page }) => {
 13 |     await login(page);
 14 |     await page.goto("/schools");
 15 |     await page.waitForLoadState("networkidle");
 16 |   });
 17 | 
 18 |   test("відображає заголовок Школи", async ({ page }) => {
 19 |     await expect(page.locator("h1")).toContainText("Школи");
 20 |   });
 21 | 
 22 |   test("відображає список шкіл", async ({ page }) => {
 23 |     const rows = page.locator("table tbody tr, .school-row-enter");
 24 |     await expect(rows.first()).toBeVisible({ timeout: 8000 });
 25 |   });
 26 | 
 27 |   test("пошук фільтрує школи", async ({ page }) => {
 28 |     const searchInput = page.locator('input[placeholder*="Пошук"]');
 29 |     await expect(searchInput).toBeVisible();
 30 | 
 31 |     // Отримуємо першу назву школи
 32 |     const firstSchool = page.locator("table tbody tr").first();
 33 |     const schoolName = await firstSchool.locator("td").first().textContent();
 34 |     const searchTerm = schoolName?.slice(0, 5) ?? "Школа";
 35 | 
 36 |     await searchInput.fill(searchTerm);
 37 |     await page.waitForTimeout(300); // debounce
 38 | 
 39 |     const results = page.locator("table tbody tr");
 40 |     const count = await results.count();
 41 |     expect(count).toBeGreaterThan(0);
 42 |   });
 43 | 
 44 |   test("очищення пошуку повертає всі результати", async ({ page }) => {
 45 |     const searchInput = page.locator('input[placeholder*="Пошук"]');
 46 |     await searchInput.fill("Школа №1");
 47 |     await page.waitForTimeout(300);
 48 |     const filtered = await page.locator("table tbody tr").count();
 49 | 
 50 |     await searchInput.fill("");
 51 |     await page.waitForTimeout(300);
 52 |     const all = await page.locator("table tbody tr").count();
 53 | 
 54 |     expect(all).toBeGreaterThanOrEqual(filtered);
 55 |   });
 56 | 
 57 |   test("фільтр по статусу працює", async ({ page }) => {
 58 |     const newFilter = page.locator("button", { hasText: "Нові" });
 59 |     if (await newFilter.isVisible()) {
 60 |       await newFilter.click();
 61 |       await page.waitForTimeout(200);
 62 |       const counter = page.locator("text=/шкіл/i");
 63 |       await expect(counter).toBeVisible();
 64 |     }
 65 |   });
 66 | 
 67 |   test("клік на школу переходить на профіль", async ({ page }) => {
 68 |     const firstRow = page.locator("table tbody tr").first();
 69 |     await firstRow.click();
 70 |     await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
 71 |   });
 72 | 
 73 |   test("відображає StatsBar з лічильниками", async ({ page }) => {
 74 |     await expect(page.locator("text=Нові")).toBeVisible();
 75 |     await expect(page.locator("text=Заплановані")).toBeVisible();
 76 |     await expect(page.locator("text=В роботі")).toBeVisible();
 77 |   });
 78 | });
 79 | 
 80 | test.describe("Додавання школи", () => {
 81 |   test.beforeEach(async ({ page }) => {
 82 |     await login(page);
 83 |     await page.goto("/schools");
 84 |     await page.waitForLoadState("networkidle");
 85 |   });
 86 | 
 87 |   test("кнопка Додати відкриває модалку", async ({ page }) => {
 88 |     const addBtn = page.locator("button", { hasText: /\+ Додати/i });
 89 |     await expect(addBtn).toBeVisible();
 90 |     await addBtn.click();
 91 |     await expect(page.locator("text=Нова школа")).toBeVisible();
 92 |   });
 93 | 
 94 |   test("модалка закривається по кнопці Скасувати", async ({ page }) => {
 95 |     await page.locator("button", { hasText: /\+ Додати/i }).click();
 96 |     await expect(page.locator("text=Нова школа")).toBeVisible();
 97 |     await page.locator("button", { hasText: "Скасувати" }).click();
 98 |     await expect(page.locator("text=Нова школа")).not.toBeVisible();
 99 |   });
100 | 
101 |   test("форма не відправляється без назви школи", async ({ page }) => {
102 |     await page.locator("button", { hasText: /\+ Додати/i }).click();
103 |     await page.locator("button", { hasText: "Створити" }).click();
104 |     // Модалка залишається відкритою
105 |     await expect(page.locator("text=Нова школа")).toBeVisible();
106 |   });
107 | });
108 | 
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

### File: apps/frontend/playwright.config.ts
```ts
  0 | import { defineConfig } from "@playwright/test";
  1 | 
  2 | export default defineConfig({
  3 |   testDir: "./e2e",
  4 |   fullyParallel: true,
  5 |   retries: 1,
  6 |   use: {
  7 |     baseURL: "http://localhost:5173",
  8 |     trace: "on-first-retry",
  9 |     screenshot: "only-on-failure",
 10 |   },
 11 |   webServer: {
 12 |     command: "npm run dev",
 13 |     url: "http://localhost:5173",
 14 |     reuseExistingServer: true,
 15 |   },
 16 | });
 17 | 
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
 14 | import ProtectedRoute from "./components/ProtectedRoute";
 15 | 
 16 | const CityProfile = lazy(() => import("./pages/CityProfile"));
 17 | const EventReport = lazy(() => import("./pages/EventReport"));
 18 | 
 19 | // --- ДИНАМІЧНІ ІМПОРТИ (Ледаче завантаження / Code Splitting) ---
 20 | // Ці файли будуть завантажуватись окремими шматками (chunks) ТІЛЬКИ коли користувач перейде на відповідну сторінку
 21 | const Cities = lazy(() => import("./pages/Cities"));
 22 | const Schools = lazy(() => import("./pages/Schools"));
 23 | const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
 24 | const Employees = lazy(() => import("./pages/Employees"));
 25 | const Finance = lazy(() => import("./pages/Finance"));
 26 | const CalendarView = lazy(() => import("./pages/CalendarView"));
 27 | const Dashboard = lazy(() => import("./pages/Dashboard"));
 28 | const Kindergartens = lazy(() => import("./pages/Kindergartens"));
 29 | 
 30 | // Компонент-заглушка, який показується долі секунди, поки вантажиться JS код сторінки
 31 | const PageLoader = () => (
 32 |   <div className="flex items-center justify-center h-full min-h-[50vh]">
 33 |     <div className="text-slate-400 font-medium animate-pulse">
 34 |       Завантаження сторінки...
 35 |     </div>
 36 |   </div>
 37 | );
 38 | 
 39 | export default function App() {
 40 |   // Базова логіка авторизації
 41 |   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
 42 |     !!localStorage.getItem("token"),
 43 |   );
 44 | 
 45 |   const handleLogin = (token: string) => {
 46 |     localStorage.setItem("token", token);
 47 |     setIsAuthenticated(true);
 48 |   };
 49 | 
 50 |   const handleLogout = () => {
 51 |     localStorage.removeItem("token");
 52 |     setIsAuthenticated(false);
 53 |   };
 54 | 
 55 |   return (
 56 |     <Router>
 57 |       <CityProvider>
 58 |         <Routes>
 59 |           {/* Публічний маршрут: Логін */}
 60 |           <Route
 61 |             path="/login"
 62 |             element={
 63 |               !isAuthenticated ? (
 64 |                 <Login onLogin={handleLogin} />
 65 |               ) : (
 66 |                 <Navigate to="/cities" replace />
 67 |               )
 68 |             }
 69 |           />
 70 | 
 71 |           {/* Захищені маршрути (Layout відображає бокове меню) */}
 72 |           <Route
 73 |             path="/"
 74 |             element={
 75 |               isAuthenticated ? (
 76 |                 <Layout onLogout={handleLogout} />
 77 |               ) : (
 78 |                 <Navigate to="/login" replace />
 79 |               )
 80 |             }
 81 |           >
 82 |             {/* Редірект з кореня на сторінку міст за замовчуванням */}
 83 |             <Route index element={<Navigate to="/schools" replace />} />
 84 | 
 85 |             {/* Обгортаємо всі вкладені маршрути в Suspense. 
 86 |               Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
 87 |               поки завантажується файл з сервера.
 88 |             */}
 89 |             <Route
 90 |               path="cities"
 91 |               element={
 92 |                 <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
 93 |                   <Suspense fallback={<PageLoader />}>
 94 |                     <Cities />
 95 |                   </Suspense>
 96 |                 </ProtectedRoute>
 97 |               }
 98 |             />
 99 | 
100 |             <Route
101 |               path="schools"
102 |               element={
103 |                 <Suspense fallback={<PageLoader />}>
104 |                   <Schools />
105 |                 </Suspense>
106 |               }
107 |             />
108 | 
109 |             <Route
110 |               path="schools/:id"
111 |               element={
112 |                 <Suspense fallback={<PageLoader />}>
113 |                   <SchoolProfile />
114 |                 </Suspense>
115 |               }
116 |             />
117 | 
118 |             <Route
119 |               path="employees"
120 |               element={
121 |                 <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
122 |                   <Suspense fallback={<PageLoader />}>
123 |                     <Employees />
124 |                   </Suspense>
125 |                 </ProtectedRoute>
126 |               }
127 |             />
128 | 
129 |             <Route
130 |               path="finance"
131 |               element={
132 |                 <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
133 |                   <Suspense fallback={<PageLoader />}>
134 |                     <Finance />
135 |                   </Suspense>
136 |                 </ProtectedRoute>
137 |               }
138 |             />
139 | 
140 |             <Route
141 |               path="calendar"
142 |               element={
143 |                 <Suspense fallback={<PageLoader />}>
144 |                   <CalendarView />
145 |                 </Suspense>
146 |               }
147 |             />
148 |             <Route
149 |               path="dashboard"
150 |               element={
151 |                 <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
152 |                   <Suspense fallback={<PageLoader />}>
153 |                     <Dashboard />
154 |                   </Suspense>
155 |                 </ProtectedRoute>
156 |               }
157 |             />
158 | 
159 |             <Route
160 |               path="kindergartens"
161 |               element={
162 |                 <Suspense fallback={<PageLoader />}>
163 |                   <Kindergartens />
164 |                 </Suspense>
165 |               }
166 |             />
167 | 
168 |             <Route
169 |               path="cities/:id"
170 |               element={
171 |                 <Suspense fallback={<PageLoader />}>
172 |                   <CityProfile />
173 |                 </Suspense>
174 |               }
175 |             />
176 | 
177 |             <Route
178 |               path="events/:id/report"
179 |               element={
180 |                 <Suspense fallback={<PageLoader />}>
181 |                   <EventReport />
182 |                 </Suspense>
183 |               }
184 |             />
185 |           </Route>
186 |         </Routes>
187 |       </CityProvider>
188 |     </Router>
189 |   );
190 | }
191 | 
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
 31 |     refetchOnWindowFocus: true,
 32 |     staleTime: 0,
 33 |   });
 34 | 
 35 |   const updateStatusMutation = useMutation({
 36 |     mutationFn: (data: { id: string; status: string }) =>
 37 |       api.patch(`/issues/${data.id}/status`, { status: data.status }),
 38 |     onSuccess: () => {
 39 |       qc.invalidateQueries({ queryKey: ["issues", selectedCity?.id] });
 40 |     },
 41 |   });
 42 | 
 43 |   const handleStatusToggle = (issue: any) => {
 44 |     const nextStatus = getNextStatus(issue.status);
 45 | 
 46 |     if (nextStatus === "Виконано") {
 47 |       setExitingIssueId(issue.id);
 48 |       setTimeout(() => {
 49 |         updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
 50 |         setExitingIssueId(null);
 51 |       }, 500);
 52 |     } else {
 53 |       updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
 54 |     }
 55 |   };
 56 | 
 57 |   if (issues.length === 0) return null;
 58 | 
 59 |   return (
 60 |     <div className="mb-6 animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
 61 |       <style>{`
 62 |         @keyframes slideDown {
 63 |           from { opacity: 0; transform: translateY(-15px); }
 64 |           to { opacity: 1; transform: translateY(0); }
 65 |         }
 66 |         @keyframes slideUp {
 67 |           from { opacity: 1; transform: translateY(0); }
 68 |           to { opacity: 0; transform: translateY(-10px); }
 69 |         }
 70 |       `}</style>
 71 | 
 72 |       <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
 73 |         🚨 <span>Активні проблеми</span>
 74 |         <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
 75 |           {issues.length}
 76 |         </span>
 77 |       </h2>
 78 | 
 79 |       {/* Зверни увагу: я прибрав gap-4 і додав відступи самим елементам, щоб анімація звуження працювала ідеально */}
 80 |       <div className="flex overflow-x-auto pb-4 -mx-1 px-1">
 81 |         {issues.map((issue) => {
 82 |           const isExiting = exitingIssueId === issue.id;
 83 | 
 84 |           return (
 85 |             // Зовнішній контейнер керує шириною, прозорістю і відступом
 86 |             <div
 87 |               key={issue.id}
 88 |               className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
 89 |                 isExiting
 90 |                   ? "w-0 min-w-0 mr-0 opacity-0 pointer-events-none"
 91 |                  : "w-[300px] min-w-[300px] mr-4 opacity-100 shrink-0"
 92 |               }`}
 93 |             >
 94 |               {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
 95 |               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
 96 |                 <div>
 97 |                   <p className="text-xs text-slate-400 mb-1">
 98 |                     {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
 99 |                       day: "2-digit",
100 |                       month: "2-digit",
101 |                       year: "numeric",
102 |                       hour: "2-digit",
103 |                       minute: "2-digit",
104 |                     })}
105 |                   </p>
106 |                   <p className="font-bold text-slate-800 text-sm">
107 |                     {issue.schoolName}
108 |                   </p>
109 |                   <p className="text-xs text-slate-500">{issue.eventName}</p>
110 |                 </div>
111 | 
112 |                 <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
113 |                   "{issue.message}"
114 |                 </p>
115 | 
116 |                 <button
117 |                   onClick={() => handleStatusToggle(issue)}
118 |                   className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
119 |                 >
120 |                   ● {issue.status} → натисни щоб змінити
121 |                 </button>
122 |               </div>
123 |             </div>
124 |           );
125 |         })}
126 |       </div>
127 |     </div>
128 |   );
129 | }
130 | 
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
 15 |   const [userRole, setUserRole] = useState<string | null>(null);
 16 |   useEffect(() => {
 17 |     try {
 18 |       const raw = localStorage.getItem("user");
 19 |       if (raw) setUserRole(JSON.parse(raw).role);
 20 |     } catch {}
 21 |   }, []);
 22 | 
 23 |   const is = (roles: string[]) => !!userRole && roles.includes(userRole);
 24 |   const { selectedCity } = useSelectedCity();
 25 | 
 26 |   useEffect(() => {
 27 |     try {
 28 |       const raw = localStorage.getItem("user");
 29 |       if (raw) setUser(JSON.parse(raw));
 30 |     } catch {
 31 |       // ignore
 32 |     }
 33 |   }, []);
 34 | 
 35 |   const token = localStorage.getItem("token");
 36 |   let isSuperAdmin = false;
 37 | 
 38 |   if (token) {
 39 |     try {
 40 |       const decoded: any = jwtDecode(token);
 41 |       isSuperAdmin = decoded.role === "SUPERADMIN";
 42 |     } catch (error) {
 43 |       console.error("Не вдалося розкодувати токен:", error);
 44 |     }
 45 |   }
 46 | 
 47 |   const isActive = (path: string) => location.pathname.startsWith(path);
 48 | 
 49 |   const handleLogout = () => {
 50 |     localStorage.removeItem("token");
 51 |     localStorage.removeItem("user");
 52 |     navigate("/login");
 53 |   };
 54 | 
 55 |   // Функція для закриття меню при кліку на лінк (на мобільних)
 56 |   const handleLinkClick = () => {
 57 |     setIsMobileMenuOpen(false);
 58 |   };
 59 | 
 60 |   return (
 61 |     <div className="flex h-screen bg-slate-50 font-sans">
 62 |       {/* Мобільний хедер (видно тільки на малих екранах) */}
 63 |       <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
 64 |         <div className="flex items-center gap-2">
 65 |           <span className="text-xl">🎓</span>
 66 |           <span className="font-semibold tracking-wider text-sm">
 67 |             СВІТЛО ЗНАНЬ
 68 |           </span>
 69 |           <span className="text-xs text-blue-300 ml-1">
 70 |             · {selectedCity.name}
 71 |           </span>
 72 |         </div>
 73 |         <button
 74 |           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 75 |           className="p-2 focus:outline-none"
 76 |         >
 77 |           {/* Проста іконка гамбургера / хрестика */}
 78 |           <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
 79 |         </button>
 80 |       </div>
 81 | 
 82 |       {/* Оверлей для мобільного меню (затемнення фону) */}
 83 |       {isMobileMenuOpen && (
 84 |         <div
 85 |           className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
 86 |           onClick={() => setIsMobileMenuOpen(false)}
 87 |         />
 88 |       )}
 89 | 
 90 |       {/* Сайдбар */}
 91 |       <aside
 92 |         className={`
 93 |         fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
 94 |         md:relative md:translate-x-0
 95 |         ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
 96 |       `}
 97 |       >
 98 |         <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
 99 |           <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-2xl">
100 |             🎓
101 |           </div>
102 |           <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
103 |           <p className="text-xs text-blue-300 mt-1 tracking-wide">
104 |             📍 {selectedCity.name}
105 |           </p>
106 |         </div>
107 | 
108 |         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
109 |           {is(["SUPERADMIN", "MANAGER"]) && (
110 |             <Link
111 |               to="/dashboard"
112 |               onClick={handleLinkClick}
113 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/dashboard") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
114 |             >
115 |               <span className="mr-3">🏠</span> Дашборд
116 |             </Link>
117 |           )}
118 |           {is(["SUPERADMIN", "MANAGER"]) && (
119 |             <Link
120 |               to="/cities"
121 |               onClick={handleLinkClick}
122 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/cities") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
123 |             >
124 |               <span className="mr-3">📍</span> Міста
125 |             </Link>
126 |           )}
127 |           <Link
128 |             to="/schools"
129 |             onClick={handleLinkClick}
130 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/schools") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
131 |           >
132 |             <span className="mr-3">🏫</span> Школи
133 |           </Link>
134 | 
135 |           {/* ДОДАЛИ НОВИЙ ПУНКТ "САДОЧКИ" */}
136 |           <Link
137 |             to="/kindergartens"
138 |             onClick={handleLinkClick}
139 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/kindergartens") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
140 |           >
141 |             <span className="mr-3">🧸</span> Садочки
142 |           </Link>
143 |           {is(["SUPERADMIN", "MANAGER"]) && (
144 |             <Link
145 |               to="/finance"
146 |               onClick={handleLinkClick}
147 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/finance") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
148 |             >
149 |               <span className="mr-3">💰</span> Фінанси
150 |             </Link>
151 |           )}
152 |           <Link
153 |             to="/calendar"
154 |             onClick={handleLinkClick}
155 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/calendar") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
156 |           >
157 |             <span className="mr-3">📆</span> Календар
158 |           </Link>
159 |           {is(["SUPERADMIN"]) && (
160 |             <Link
161 |               to="/employees"
162 |               onClick={handleLinkClick}
163 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/employees") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
164 |             >
165 |               <span className="mr-3">👥</span> Працівники
166 |             </Link>
167 |           )}
168 |         </nav>
169 | 
170 |         <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
171 |           <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
172 |             <div className="flex items-center">
173 |               <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
174 |                 {user?.name?.charAt(0) ?? "?"}
175 |               </div>
176 |               <div className="text-sm truncate max-w-[120px]">
177 |                 <p className="font-medium text-white truncate">
178 |                   {user?.name ?? "Користувач"}
179 |                 </p>
180 |                 <p className="text-xs text-slate-400 truncate">
181 |                   {user?.role ?? ""}
182 |                 </p>
183 |               </div>
184 |             </div>
185 |             <button
186 |               onClick={handleLogout}
187 |               className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-2 shrink-0 p-2"
188 |               title="Вийти"
189 |             >
190 |               ⬅️
191 |             </button>
192 |           </div>
193 |         </div>
194 |       </aside>
195 | 
196 |       {/* Головна область */}
197 |       <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full">
198 |         <Outlet />
199 |       </main>
200 |     </div>
201 |   );
202 | }
203 | 
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

### File: apps/frontend/src/components/ProtectedRoute.tsx
```tsx
  0 | import { Navigate } from "react-router-dom";
  1 | 
  2 | interface Props {
  3 |   allowedRoles: string[];
  4 |   children: React.ReactNode;
  5 | }
  6 | 
  7 | function getCurrentUserRole(): string | null {
  8 |   try {
  9 |     const raw = localStorage.getItem("user");
 10 |     return raw ? JSON.parse(raw).role : null;
 11 |   } catch {
 12 |     return null;
 13 |   }
 14 | }
 15 | 
 16 | export default function ProtectedRoute({ allowedRoles, children }: Props) {
 17 |   const role = getCurrentUserRole();
 18 |   if (!role || !allowedRoles.includes(role)) {
 19 |     return <Navigate to="/dashboard" replace />;
 20 |   }
 21 |   return <>{children}</>;
 22 | }
 23 | 
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

### File: apps/frontend/src/components/school-profile/CompletedEventModal.tsx
```tsx
  0 | import React from "react";
  1 | import type { Event, ExpenseItem, SalaryItem } from "../../types";
  2 | 
  3 | interface CompletedEventModalProps {
  4 |   isOpen: boolean;
  5 |   onClose: () => void;
  6 |   event: Event | null;
  7 | }
  8 | 
  9 | const CompletedEventModal: React.FC<CompletedEventModalProps> = ({
 10 |   isOpen,
 11 |   onClose,
 12 |   event,
 13 | }) => {
 14 |   if (!isOpen || !event) return null;
 15 | 
 16 |   const report = event.report;
 17 |   const fmt = (n: number | null | undefined) =>
 18 |     new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
 19 | 
 20 |   return (
 21 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
 22 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
 23 |         {/* Header */}
 24 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
 25 |           <div>
 26 |             <h3 className="text-xl font-bold text-slate-800">
 27 |               Звіт: {event.project}
 28 |             </h3>
 29 |             <p className="text-sm text-slate-500 mt-1">
 30 |               {new Date(event.date).toLocaleDateString("uk-UA")}
 31 |             </p>
 32 |           </div>
 33 |           <button
 34 |             onClick={onClose}
 35 |             className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
 36 |           >
 37 |             ✕
 38 |           </button>
 39 |         </div>
 40 | 
 41 |         <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
 42 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
 43 |             {/* Результати */}
 44 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
 45 |               <h4 className="font-bold text-slate-800 mb-4">📊 Результати</h4>
 46 |               <div className="space-y-3 text-sm">
 47 |                 {[
 48 |                   ["Дітей (факт)", report?.childrenCount || 0],
 49 |                   ["Класів", report?.classesCount || 0],
 50 |                   ["Пільговиків", report?.privilegedCount || 0],
 51 |                   ["Сеансів", report?.showingsCount || 0],
 52 |                 ].map(([label, val]) => (
 53 |                   <div
 54 |                     key={label as string}
 55 |                     className="flex justify-between border-b border-slate-50 pb-2"
 56 |                   >
 57 |                     <span className="text-slate-500">{label}:</span>
 58 |                     <span className="font-medium">{val}</span>
 59 |                   </div>
 60 |                 ))}
 61 |                 <div className="flex justify-between pb-1">
 62 |                   <span className="text-slate-500">Оцінка:</span>
 63 |                   <span className="font-bold text-amber-500">
 64 |                     ⭐ {report?.rating || 0}/10
 65 |                   </span>
 66 |                 </div>
 67 |               </div>
 68 |             </div>
 69 | 
 70 |             {/* Фінанси */}
 71 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
 72 |               <h4 className="font-bold text-slate-800 mb-4">💰 Фінанси</h4>
 73 |               <div className="space-y-3 text-sm">
 74 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
 75 |                   <span className="text-slate-500">Загальна виручка:</span>
 76 |                   <span className="font-bold">{fmt(report?.totalSum)} грн</span>
 77 |                 </div>
 78 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
 79 |                   <span className="text-slate-500">На заклад:</span>
 80 |                   <span className="font-medium text-rose-500">
 81 |                     − {fmt(report?.schoolSum)} грн
 82 |                   </span>
 83 |                 </div>
 84 | 
 85 |                 {Array.isArray(report?.expenses) &&
 86 |                   report.expenses.map((exp: ExpenseItem, i: number) => (
 87 |                     <div key={i} className="flex justify-between text-xs pl-2">
 88 |                       <span className="text-slate-400">
 89 |                         — {exp.name || exp.category || "Інше"}
 90 |                       </span>
 91 |                       <span className="text-rose-500 font-medium">
 92 |                         − {fmt(exp.amount)} грн
 93 |                       </span>
 94 |                     </div>
 95 |                   ))}
 96 | 
 97 |                 <div className="flex justify-between pt-1 border-t border-slate-100">
 98 |                   <span className="font-bold text-slate-800">
 99 |                     Чистий прибуток:
100 |                   </span>
101 |                   <span className="font-bold text-emerald-600 text-base">
102 |                     {fmt(report?.remainderSum)} грн
103 |                   </span>
104 |                 </div>
105 |               </div>
106 |             </div>
107 |           </div>
108 | 
109 |           {/* Зарплати */}
110 |           {Array.isArray(report?.salaries) && report.salaries.length > 0 && (
111 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-4">
112 |               <h4 className="font-bold text-slate-800 mb-4">👥 Зарплати</h4>
113 |               <div className="space-y-2">
114 |                 {report.salaries.map((s: SalaryItem, i: number) => (
115 |                   <div key={i} className="flex justify-between text-sm">
116 |                     <span>
117 |                       {s.name} {s.role ? `(${s.role})` : ""}
118 |                     </span>
119 |                     <span className="font-medium text-blue-600">
120 |                       {fmt(s.amount)} грн
121 |                     </span>
122 |                   </div>
123 |                 ))}
124 |               </div>
125 |             </div>
126 |           )}
127 |         </div>
128 |       </div>
129 |     </div>
130 |   );
131 | };
132 | 
133 | export default CompletedEventModal;
134 | 
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
142 |               {sent ? '✓ Надіслано!' :  'Відправити'}
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
 11 | export interface ReportData {
 12 |   announcementDone: boolean;
 13 |   materialShown: boolean;
 14 |   childrenCount: number;
 15 |   classesCount: number;
 16 |   privilegedCount: number;
 17 |   showingsCount: number;
 18 |   totalSum: number;
 19 |   schoolSum: number;
 20 |   remainderSum: number;
 21 |   rating: number;
 22 |   expenses: { name: string; amount: number }[];
 23 |   salaries: { userId: string; name: string; amount: number; role: string }[];
 24 | }
 25 | 
 26 | interface ReportModalProps {
 27 |   isOpen: boolean;
 28 |   onClose: () => void;
 29 |   onSave: (data: ReportData) => void;
 30 |   schoolName: string;
 31 |   eventType?: string;
 32 |   eventDate?: string;
 33 |   eventIndex?: number;
 34 |   crew?: {
 35 |     host?: { id: string; name: string } | null;
 36 |     driver?: { id: string; name: string } | null;
 37 |   };
 38 | }
 39 | 
 40 | const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
 41 | const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
 42 |   day: "2-digit",
 43 |   month: "2-digit",
 44 |   year: "2-digit",
 45 | });
 46 | 
 47 | function formatDate(dateStr?: string) {
 48 |   if (!dateStr) return "—";
 49 |   const d = new Date(dateStr);
 50 |   if (Number.isNaN(d.getTime())) return "—";
 51 |   return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
 52 | }
 53 | 
 54 | function formatMoney(value: number) {
 55 |   return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
 56 | }
 57 | 
 58 | const Icon = {
 59 |   Check: () => (
 60 |     <svg
 61 |       viewBox="0 0 24 24"
 62 |       fill="none"
 63 |       stroke="currentColor"
 64 |       strokeWidth="2"
 65 |       strokeLinecap="round"
 66 |       strokeLinejoin="round"
 67 |       className="w-4 h-4"
 68 |     >
 69 |       <path d="M9 11l3 3L22 4" />
 70 |       <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
 71 |     </svg>
 72 |   ),
 73 |   Users: () => (
 74 |     <svg
 75 |       viewBox="0 0 24 24"
 76 |       fill="none"
 77 |       stroke="currentColor"
 78 |       strokeWidth="2"
 79 |       strokeLinecap="round"
 80 |       strokeLinejoin="round"
 81 |       className="w-4 h-4"
 82 |     >
 83 |       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
 84 |       <circle cx="9" cy="7" r="4" />
 85 |       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
 86 |       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
 87 |     </svg>
 88 |   ),
 89 |   Wallet: () => (
 90 |     <svg
 91 |       viewBox="0 0 24 24"
 92 |       fill="none"
 93 |       stroke="currentColor"
 94 |       strokeWidth="2"
 95 |       strokeLinecap="round"
 96 |       strokeLinejoin="round"
 97 |       className="w-4 h-4"
 98 |     >
 99 |       <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
100 |       <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
101 |     </svg>
102 |   ),
103 |   Star: () => (
104 |     <svg
105 |       viewBox="0 0 24 24"
106 |       fill="none"
107 |       stroke="currentColor"
108 |       strokeWidth="2"
109 |       strokeLinecap="round"
110 |       strokeLinejoin="round"
111 |       className="w-4 h-4"
112 |     >
113 |       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
114 |     </svg>
115 |   ),
116 | };
117 | 
118 | function IconBadge({
119 |   color,
120 |   children,
121 | }: {
122 |   color: string;
123 |   children: React.ReactNode;
124 | }) {
125 |   return (
126 |     <span
127 |       className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}
128 |     >
129 |       {children}
130 |     </span>
131 |   );
132 | }
133 | 
134 | function CardHeader({
135 |   icon,
136 |   color,
137 |   title,
138 | }: {
139 |   icon: React.ReactNode;
140 |   color: string;
141 |   title: string;
142 | }) {
143 |   return (
144 |     <div className="flex items-center gap-2.5 mb-4">
145 |       <IconBadge color={color}>{icon}</IconBadge>
146 |       <h4 className="text-sm font-bold text-slate-800">{title}</h4>
147 |     </div>
148 |   );
149 | }
150 | 
151 | function Row({
152 |   label,
153 |   children,
154 | }: {
155 |   label: string;
156 |   children: React.ReactNode;
157 | }) {
158 |   return (
159 |     <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
160 |       <span className="text-sm text-slate-500">{label}</span>
161 |       <div className="text-sm font-medium text-slate-800">{children}</div>
162 |     </div>
163 |   );
164 | }
165 | 
166 | function TogglePill({
167 |   value,
168 |   onChange,
169 | }: {
170 |   value: boolean;
171 |   onChange: (v: boolean) => void;
172 | }) {
173 |   return (
174 |     <div className="flex gap-1.5">
175 |       <button
176 |         type="button"
177 |         onClick={() => onChange(true)}
178 |         className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
179 |       >
180 |         Так
181 |       </button>
182 |       <button
183 |         type="button"
184 |         onClick={() => onChange(false)}
185 |         className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
186 |       >
187 |         Ні
188 |       </button>
189 |     </div>
190 |   );
191 | }
192 | 
193 | function NumberField({
194 |   value,
195 |   onChange,
196 |   suffix,
197 | }: {
198 |   value: number;
199 |   onChange: (v: number) => void;
200 |   suffix?: string;
201 | }) {
202 |   return (
203 |     <span className="inline-flex items-center gap-1">
204 |       <input
205 |         type="number"
206 |         min={0}
207 |         value={value || ""}
208 |         onChange={(e) => onChange(+e.target.value)}
209 |         className="w-16 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1"
210 |         placeholder="0"
211 |       />
212 |       {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
213 |     </span>
214 |   );
215 | }
216 | 
217 | export default function ReportModal({
218 |   isOpen,
219 |   onClose,
220 |   onSave,
221 |   schoolName,
222 |   eventType,
223 |   eventDate,
224 |   eventIndex,
225 |   crew,
226 | }: ReportModalProps) {
227 |   const [form, setForm] = useState({
228 |     announcementDone: true,
229 |     materialShown: true,
230 |     childrenCount: 0,
231 |     classesCount: 0,
232 |     privilegedCount: 0,
233 |     showingsCount: 0,
234 |     totalSum: 0,
235 |     schoolPercentage: 20, // <-- НОВЕ: Дефолтний % закладу
236 |     rating: 8,
237 |   });
238 | 
239 |   const [expenses, setExpenses] = useState<Expense[]>([]);
240 |   const [newExp, setNewExp] = useState({ name: "", amount: "" });
241 |   const [salaries, setSalaries] = useState<Record<string, number>>({});
242 |   if (!isOpen) return null;
243 | 
244 |   // Динамічний розрахунок закладу на основі відсотка
245 |   const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
246 |   const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
247 |   const remainder = form.totalSum - schoolSum - totalExpenses;
248 | 
249 |   const addExpense = () => {
250 |     const amount = Number(newExp.amount);
251 |     if (!newExp.name.trim() || !amount) return;
252 |     setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
253 |     setNewExp({ name: "", amount: "" });
254 |   };
255 | 
256 |   const removeExpense = (index: number) => {
257 |     setExpenses((prev) => prev.filter((_, i) => i !== index));
258 |   };
259 | 
260 |   // Хелпер:
261 |   const crewMembers = [
262 |     ...(crew?.host
263 |       ? [
264 |           {
265 |             id: crew.host.id,
266 |             name: crew.host.name,
267 |             role: "Ведучий",
268 |           },
269 |         ]
270 |       : []),
271 |     ...(crew?.driver
272 |       ? [
273 |           {
274 |             id: crew.driver.id,
275 |             name: crew.driver.name,
276 |             role: "Водій",
277 |           },
278 |         ]
279 |       : []),
280 |   ];
281 | 
282 |   const handleSave = () => {
283 |     const salariesArr = crewMembers
284 |       .map((m) => ({
285 |         userId: m.id,
286 |         name: m.name,
287 |         amount: salaries[m.id] || 0,
288 |         role: m.role,
289 |       }))
290 |       .filter((s) => s.amount > 0);
291 | 
292 |     onSave({
293 |       ...form,
294 |       expenses, // тепер підтримує category
295 |       schoolSum,
296 |       remainderSum: remainder,
297 |       salaries: salariesArr,
298 |     });
299 |   };
300 | 
301 |   return (
302 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
303 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden">
304 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
305 | 
306 |         {/* Header */}
307 |         <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
308 |           <div className="min-w-0">
309 |             <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
310 |               Звіт по події
311 |             </h3>
312 |             <p className="text-sm text-slate-500 mt-0.5 truncate">
313 |               {schoolName}
314 |             </p>
315 |           </div>
316 |           <button
317 |             onClick={onClose}
318 |             className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 shrink-0"
319 |           >
320 |             ✕
321 |           </button>
322 |         </div>
323 | 
324 |         {/* Body */}
325 |         <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
326 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
327 |             {/* Охоплення */}
328 |             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
329 |               <CardHeader
330 |                 icon={<Icon.Users />}
331 |                 color="bg-violet-50 text-violet-600"
332 |                 title="Охоплення та Проведення"
333 |               />
334 |               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
335 |                 <Row label="Кількість дітей">
336 |                   <NumberField
337 |                     value={form.childrenCount}
338 |                     onChange={(v) => setForm({ ...form, childrenCount: v })}
339 |                     suffix="дітей"
340 |                   />
341 |                 </Row>
342 |                 <Row label="Класів">
343 |                   <NumberField
344 |                     value={form.classesCount}
345 |                     onChange={(v) => setForm({ ...form, classesCount: v })}
346 |                     suffix="кл."
347 |                   />
348 |                 </Row>
349 |                 <Row label="Пільгових дітей">
350 |                   <NumberField
351 |                     value={form.privilegedCount}
352 |                     onChange={(v) => setForm({ ...form, privilegedCount: v })}
353 |                   />
354 |                 </Row>
355 |                 <Row label="Кількість показів">
356 |                   <NumberField
357 |                     value={form.showingsCount}
358 |                     onChange={(v) => setForm({ ...form, showingsCount: v })}
359 |                   />
360 |                 </Row>
361 |               </div>
362 |             </div>
363 | 
364 |             {/* Фінансовий результат */}
365 |             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
366 |               <CardHeader
367 |                 icon={<Icon.Wallet />}
368 |                 color="bg-amber-50 text-amber-600"
369 |                 title="Фінансовий результат"
370 |               />
371 |               <div className="flex items-center justify-between py-2 border-b border-slate-50">
372 |                 <span className="text-sm text-slate-500 font-medium">
373 |                   Загальна виручка
374 |                 </span>
375 |                 <span className="inline-flex items-center gap-1">
376 |                   <input
377 |                     type="number"
378 |                     min={0}
379 |                     value={form.totalSum || ""}
380 |                     onChange={(e) =>
381 |                       setForm({ ...form, totalSum: +e.target.value })
382 |                     }
383 |                     className="w-28 text-right bg-transparent outline-none font-bold text-lg text-slate-800 focus:bg-blue-50 rounded px-1"
384 |                     placeholder="0"
385 |                   />
386 |                   <span className="text-slate-400 text-sm">грн</span>
387 |                 </span>
388 |               </div>
389 | 
390 |               {/* НОВЕ: Змінний відсоток для закладу */}
391 |               <div className="flex items-center justify-between py-2 border-b border-slate-50">
392 |                 <span className="text-sm text-slate-500">Відсоток закладу</span>
393 |                 <NumberField
394 |                   value={form.schoolPercentage}
395 |                   onChange={(v) => setForm({ ...form, schoolPercentage: v })}
396 |                   suffix="%"
397 |                 />
398 |               </div>
399 | 
400 |               <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
401 |                 <span>{formatMoney(schoolSum)} грн</span>
402 |               </Row>
403 | 
404 |               <div className="py-3 border-b border-slate-50">
405 |                 <div className="flex items-center justify-between mb-2">
406 |                   <span className="text-sm text-slate-500">
407 |                     Додаткові витрати
408 |                   </span>
409 |                   <span className="text-sm font-medium text-rose-500">
410 |                     −{formatMoney(totalExpenses)} грн
411 |                   </span>
412 |                 </div>
413 |                 {expenses.length > 0 && (
414 |                   <div className="flex flex-wrap gap-1.5 mb-2">
415 |                     {expenses.map((exp, i) => (
416 |                       <span
417 |                         key={i}
418 |                         className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs"
419 |                       >
420 |                         <span className="text-slate-600">{exp.name}</span>
421 |                         <span className="font-semibold text-slate-700">
422 |                           {formatMoney(exp.amount)} грн
423 |                         </span>
424 |                         <button
425 |                           onClick={() => removeExpense(i)}
426 |                           className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white"
427 |                         >
428 |                           ✕
429 |                         </button>
430 |                       </span>
431 |                     ))}
432 |                   </div>
433 |                 )}
434 |                 <div className="flex gap-2 mt-2">
435 |                   <input
436 |                     placeholder="Назва витрати"
437 |                     value={newExp.name}
438 |                     onChange={(e) =>
439 |                       setNewExp({ ...newExp, name: e.target.value })
440 |                     }
441 |                     className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
442 |                   />
443 |                   <input
444 |                     type="number"
445 |                     min={0}
446 |                     placeholder="грн"
447 |                     value={newExp.amount}
448 |                     onChange={(e) =>
449 |                       setNewExp({ ...newExp, amount: e.target.value })
450 |                     }
451 |                     className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
452 |                   />
453 |                   <button
454 |                     onClick={addExpense}
455 |                     type="button"
456 |                     className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
457 |                   >
458 |                     +
459 |                   </button>
460 |                 </div>
461 |               </div>
462 |               <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
463 |                 <span className="text-sm font-semibold text-emerald-700">
464 |                   Залишок ({100 - form.schoolPercentage}%)
465 |                 </span>
466 |                 <span className="text-lg font-bold text-emerald-700">
467 |                   {formatMoney(remainder)} грн
468 |                 </span>
469 |               </div>
470 |             </div>
471 |             {crewMembers.length > 0 && (
472 |               <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
473 |                 <CardHeader
474 |                   icon={
475 |                     <svg
476 |                       viewBox="0 0 24 24"
477 |                       fill="none"
478 |                       stroke="currentColor"
479 |                       strokeWidth="2"
480 |                       strokeLinecap="round"
481 |                       strokeLinejoin="round"
482 |                       className="w-4 h-4"
483 |                     >
484 |                       <circle cx="12" cy="8" r="6" />
485 |                       <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
486 |                     </svg>
487 |                   }
488 |                   color="bg-blue-50 text-blue-600"
489 |                   title="Заробітня плата"
490 |                 />
491 |                 <div className="space-y-1">
492 |                   {crewMembers.map((m) => (
493 |                     <Row key={m.id} label={`${m.name} (${m.role})`}>
494 |                       <span className="inline-flex items-center gap-1">
495 |                         <input
496 |                           type="number"
497 |                           min={0}
498 |                           value={salaries[m.id] || ""}
499 |                           onChange={(e) =>
500 |                             setSalaries((prev) => ({
501 |                               ...prev,
502 |                               [m.id]: +e.target.value,
503 |                             }))
504 |                           }
505 |                           className="w-24 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1"
506 |                           placeholder="0"
507 |                         />
508 |                         <span className="text-slate-400 text-xs">грн</span>
509 |                       </span>
510 |                     </Row>
511 |                   ))}
512 |                 </div>
513 |                 {crewMembers.some((m) => salaries[m.id] > 0) && (
514 |                   <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
515 |                     <span className="text-sm font-semibold text-slate-500">
516 |                       Разом ЗП
517 |                     </span>
518 |                     <span className="font-bold text-blue-600">
519 |                       {formatMoney(
520 |                         crewMembers.reduce(
521 |                           (s, m) => s + (salaries[m.id] || 0),
522 |                           0,
523 |                         ),
524 |                       )}{" "}
525 |                       грн
526 |                     </span>
527 |                   </div>
528 |                 )}
529 |               </div>
530 |             )}
531 |           </div>
532 |         </div>
533 | 
534 |         {/* Footer */}
535 |         <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-slate-100 bg-white shrink-0">
536 |           <button
537 |             onClick={onClose}
538 |             className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3"
539 |           >
540 |             Скасувати
541 |           </button>
542 |           <button
543 |             onClick={handleSave}
544 |             className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3"
545 |           >
546 |             Зберегти звіт
547 |           </button>
548 |         </div>
549 |       </div>
550 |     </div>
551 |   );
552 | }
553 | 
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
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | 
  3 | const authHeader = () => ({
  4 |   Authorization: `Bearer ${localStorage.getItem("token")}`,
  5 | });
  6 | 
  7 | // ─── Мінімальні дані школи (назва, адреса, місто) ───────────────────────────
  8 | export function useSchool(id: string | undefined) {
  9 |   return useQuery({
 10 |     queryKey: ["school", id],
 11 |     queryFn: async () => {
 12 |       const res = await api.get(`/schools/${id}`, { headers: authHeader() });
 13 |       return res.data;
 14 |     },
 15 |     enabled: !!id,
 16 |     staleTime: 2 * 60 * 1000,
 17 |   });
 18 | }
 19 | 
 20 | export function useSchoolCompletedEvents(schoolId: string | undefined) {
 21 |   return useQuery({
 22 |     queryKey: ["schoolCompletedEvents", schoolId],
 23 |     queryFn: async () => {
 24 |       const res = await api.get(`/events/school/${schoolId}/completed`, {
 25 |         headers: authHeader(),
 26 |       });
 27 |       return res.data;
 28 |     },
 29 |     enabled: !!schoolId,
 30 |     staleTime: 2 * 60 * 1000,
 31 |   });
 32 | }
 33 | 
 34 | // ─── Мінімальний список подій (без history/preparation) ──────────────────────
 35 | export function useSchoolEvents(schoolId: string | undefined, full = false) {
 36 |   return useQuery({
 37 |     queryKey: ["schoolEvents", schoolId, full],
 38 |     queryFn: async () => {
 39 |       const url = full
 40 |         ? `/events/school/${schoolId}`
 41 |         : `/events/school/${schoolId}?minimal=true`;
 42 |       const res = await api.get(url, { headers: authHeader() });
 43 |       return res.data.filter((ev: any) => ev.status !== "RE_SALE");
 44 |     },
 45 |     enabled: !!schoolId,
 46 |     staleTime: 60 * 1000,
 47 |   });
 48 | }
 49 | 
 50 | // ─── Повні дані однієї події (lazy, при кліку) ────────────────────────────────
 51 | export function useEventFull(eventId: string | undefined) {
 52 |   return useQuery({
 53 |     queryKey: ["eventFull", eventId],
 54 |     queryFn: async () => {
 55 |       const res = await api.get(`/events/${eventId}`, {
 56 |         headers: authHeader(),
 57 |       });
 58 |       return res.data;
 59 |     },
 60 |     enabled: !!eventId,
 61 |     staleTime: 30 * 1000,
 62 |   });
 63 | }
 64 | 
 65 | // ─── Список користувачів ────────────────────────────────────────────────────
 66 | export function useUsers() {
 67 |   return useQuery({
 68 |     queryKey: ["users"],
 69 |     queryFn: async () => {
 70 |       const res = await api.get("/users", { headers: authHeader() });
 71 |       return res.data;
 72 |     },
 73 |     staleTime: 5 * 60 * 1000,
 74 |   });
 75 | }
 76 | 
 77 | // ─── Мутації ────────────────────────────────────────────────────────────────
 78 | export function useUpdateEventStatus() {
 79 |   const qc = useQueryClient();
 80 |   return useMutation({
 81 |     mutationFn: ({
 82 |       eventId,
 83 |       status,
 84 |       actionName,
 85 |       comment,
 86 |     }: {
 87 |       eventId: string;
 88 |       status: string;
 89 |       actionName: string;
 90 |       comment?: string;
 91 |     }) =>
 92 |       api
 93 |         .patch(
 94 |           `/events/${eventId}/status`,
 95 |           { status, actionName, comment },
 96 |           { headers: authHeader() },
 97 |         )
 98 |         .then((r) => r.data),
 99 |     onSuccess: (data, vars) => {
100 |       // Оновлюємо повну подію
101 |       qc.setQueryData(["eventFull", vars.eventId], data);
102 |       // Оновлюємо статус в мінімальному списку без рефетчу
103 |       qc.setQueriesData({ queryKey: ["schoolEvents"] }, (old: any) =>
104 |         Array.isArray(old)
105 |           ? old
106 |               .map((ev: any) =>
107 |                 ev.id === vars.eventId
108 |                   ? { ...ev, status: vars.status, ...data }
109 |                   : ev,
110 |               )
111 |               .filter((ev: any) => ev.status !== "RE_SALE")
112 |           : old,
113 |       );
114 |     },
115 |   });
116 | }
117 | 
118 | export function useUpdatePreparation() {
119 |   const qc = useQueryClient();
120 |   return useMutation({
121 |     mutationFn: ({
122 |       eventId,
123 |       field,
124 |       status,
125 |     }: {
126 |       eventId: string;
127 |       field: string;
128 |       status: string;
129 |     }) =>
130 |       api
131 |         .patch(
132 |           `/events/${eventId}/preparation`,
133 |           { field, status },
134 |           { headers: authHeader() },
135 |         )
136 |         .then((r) => r.data),
137 |     onSuccess: (data, vars) => {
138 |       qc.setQueryData(["eventFull", vars.eventId], (old: any) =>
139 |         old
140 |           ? {
141 |               ...old,
142 |               preparation: {
143 |                 ...(old.preparation || {}),
144 |                 [vars.field]: vars.status,
145 |               },
146 |             }
147 |           : old,
148 |       );
149 |     },
150 |   });
151 | }
152 | 
153 | export function useAssignCrew() {
154 |   const qc = useQueryClient();
155 |   return useMutation({
156 |     mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
157 |       api
158 |         .post(
159 |           `/events/${eventId}/assign-crew`,
160 |           { crewId },
161 |           { headers: authHeader() },
162 |         )
163 |         .then((r) => r.data),
164 |     onSuccess: (data, vars) => {
165 |       qc.setQueryData(["eventFull", vars.eventId], data);
166 |       // Оновлюємо crewId в мінімальному списку
167 |       qc.setQueriesData({ queryKey: ["schoolEvents"] }, (old: any) =>
168 |         Array.isArray(old)
169 |           ? old.map((ev: any) =>
170 |               ev.id === vars.eventId
171 |                 ? { ...ev, crewId: vars.crewId, crew: data.crew }
172 |                 : ev,
173 |             )
174 |           : old,
175 |       );
176 |     },
177 |   });
178 | }
179 | 
180 | export function useSubmitReport() {
181 |   const qc = useQueryClient();
182 |   return useMutation({
183 |     mutationFn: ({
184 |       eventId,
185 |       reportData,
186 |     }: {
187 |       eventId: string;
188 |       reportData: any;
189 |     }) =>
190 |       api
191 |         .post(`/events/${eventId}/report`, reportData, {
192 |           headers: authHeader(),
193 |         })
194 |         .then((r) => r.data),
195 |     onSuccess: (_data, vars) => {
196 |       // Видаляємо подію зі списку (вона стане RE_SALE після статус-мутації)
197 |       qc.setQueriesData({ queryKey: ["schoolEvents"] }, (old: any) =>
198 |         Array.isArray(old)
199 |           ? old.filter((ev: any) => ev.id !== vars.eventId)
200 |           : old,
201 |       );
202 |       qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
203 |     },
204 |   });
205 | }
206 | 
207 | export function useAddComment() {
208 |   const qc = useQueryClient();
209 |   return useMutation({
210 |     mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
211 |       api
212 |         .post(
213 |           `/events/${eventId}/history`,
214 |           { comment },
215 |           { headers: authHeader() },
216 |         )
217 |         .then((r) => r.data),
218 |     onSuccess: (data, vars) => {
219 |       qc.setQueryData(["eventFull", vars.eventId], (old: any) =>
220 |         old ? { ...old, history: data.history } : old,
221 |       );
222 |     },
223 |   });
224 | }
225 | 
226 | // === НОВА МУТАЦІЯ: Оновлення школи ===
227 | export const useUpdateSchool = () => {
228 |   const queryClient = useQueryClient();
229 | 
230 |   return useMutation({
231 |     mutationFn: async (data: any) => {
232 |       const res = await api.patch(`/schools/${data.id}`, data);
233 |       return res.data;
234 |     },
235 |     onSuccess: (_, variables) => {
236 |       queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
237 |     },
238 |   });
239 | };
240 | 
241 | // === НОВА МУТАЦІЯ: Створення події ===
242 | export const useCreateEvent = () => {
243 |   const queryClient = useQueryClient();
244 | 
245 |   return useMutation({
246 |     mutationFn: async (payload: any) => {
247 |       const res = await api.post("/events", payload);
248 |       return res.data;
249 |     },
250 |     onSuccess: (newEvent, variables) => {
251 |       queryClient.invalidateQueries({
252 |         queryKey: ["schoolEvents", variables.schoolId],
253 |       });
254 |     },
255 |   });
256 | };
257 | 
258 | export function useUpdateHistoryComment() {
259 |   const qc = useQueryClient();
260 |   return useMutation({
261 |     mutationFn: ({
262 |       historyId,
263 |       comment,
264 |       eventId,
265 |     }: {
266 |       historyId: string;
267 |       comment: string;
268 |       eventId: string;
269 |     }) =>
270 |       api
271 |         .patch(
272 |           `/events/history/${historyId}`,
273 |           { comment },
274 |           { headers: authHeader() },
275 |         )
276 |         .then((r) => r.data),
277 |     onSuccess: (_data, vars) => {
278 |       qc.setQueryData(["eventFull", vars.eventId], (old: any) =>
279 |         old
280 |           ? {
281 |               ...old,
282 |               history: old.history?.map((h: any) =>
283 |                 h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
284 |               ),
285 |             }
286 |           : old,
287 |       );
288 |     },
289 |   });
290 | }
291 | 
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
 61 |   const [userRole] = useState<string | null>(() => {
 62 |     try {
 63 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
 64 |     } catch {
 65 |       return null;
 66 |     }
 67 |   });
 68 |   const handleAddCity = async (e: React.FormEvent) => {
 69 |     e.preventDefault();
 70 |     if (!newCityName.trim()) return;
 71 |     try {
 72 |       await addCity.mutateAsync(newCityName.trim());
 73 |       setNewCityName("");
 74 |       setIsModalOpen(false);
 75 |     } catch {
 76 |       alert("Не вдалося створити місто. Можливо воно вже існує.");
 77 |     }
 78 |   };
 79 | 
 80 |   return (
 81 |     // Оптимізація 5: content-visibility
 82 |     <div
 83 |       className="p-4 md:p-8 bg-slate-50 min-h-screen"
 84 |       style={{ contentVisibility: "auto" }}
 85 |     >
 86 |       {/* Шапка для ПК */}
 87 |       <style>{`
 88 |         @keyframes headerFadeIn {
 89 |           from { opacity: 0; transform: translateY(-10px); }
 90 |           to   { opacity: 1; transform: translateY(0); }
 91 |         }
 92 |         .header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
 93 |         .header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
 94 |       `}</style>
 95 |       <div className="hidden md:flex justify-between items-center mb-8">
 96 |         <h1 className="header-enter text-3xl font-bold text-slate-800">
 97 |           Міста
 98 |         </h1>
 99 |         {userRole === "SUPERADMIN" && (
100 |           <button
101 |             onClick={() => setIsModalOpen(true)}
102 |             className="header-btn-enter bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-all duration-150"
103 |           >
104 |             <span className="mr-2">+</span> Додати місто
105 |           </button>
106 |         )}
107 |       </div>
108 | 
109 |       {isFetching ? (
110 |         <CitiesSkeleton />
111 |       ) : (
112 |         /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
113 |         <Suspense fallback={<CitiesSkeleton />}>
114 |           {/* 1. Блок для Мобільних (Шапка + Список) */}
115 |           <div className="md:hidden">
116 |             <CityMobileHeader selectedCity={selectedCity} cities={cities} />
117 |             <CityMobileList
118 |               cities={cities}
119 |               selectedCity={selectedCity}
120 |               onSelectCity={handleSelectCity}
121 |             />
122 |           </div>
123 | 
124 |           {/* 2. Блок для Десктопів (Карусель + Сітка) */}
125 |           <div className="hidden md:block">
126 |             <IssueCarousel />
127 |             <CityDesktopGrid
128 |               cities={cities}
129 |               selectedCity={selectedCity}
130 |               onSelectCity={handleSelectCity}
131 |             />
132 |           </div>
133 |         </Suspense>
134 |       )}
135 | 
136 |       {/* Мобільна плаваюча кнопка FAB */}
137 |       {userRole === "SUPERADMIN" && (
138 |         <button
139 |           onClick={() => setIsModalOpen(true)}
140 |           className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform opacity-0"
141 |           style={{
142 |             animation:
143 |               "fabPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s forwards",
144 |           }}
145 |           aria-label="Додати місто"
146 |         >
147 |           <style>{`
148 |             @keyframes fabPop {
149 |               from { opacity: 0; transform: scale(0.5) translateY(20px); }
150 |               to { opacity: 1; transform: scale(1) translateY(0); }
151 |             }
152 |           `}</style>
153 |           +
154 |         </button>
155 |       )}
156 | 
157 |       {/* Модалка додавання */}
158 |       {isModalOpen &&
159 |         createPortal(
160 |           <div
161 |             className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
162 |             style={{ animation: "fadeIn 0.2s ease-out forwards" }}
163 |           >
164 |             <style>{`
165 |             @keyframes fadeIn {
166 |               from { opacity: 0; }
167 |               to { opacity: 1; }
168 |             }
169 |             @keyframes modalScale {
170 |               from { opacity: 0; transform: scale(0.95) translateY(15px); }
171 |               to { opacity: 1; transform: scale(1) translateY(0); }
172 |             }
173 |           `}</style>
174 | 
175 |             {/* ТУТ БУЛА ПРОБЛЕМА: додано opacity-0 та style з анімацією modalScale */}
176 |             <div
177 |               className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
178 |               style={{ animation: "modalScale 0.3s ease-out forwards" }}
179 |             >
180 |               <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
181 |                 <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
182 |                 <button
183 |                   onClick={() => setIsModalOpen(false)}
184 |                   className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
185 |                 >
186 |                   ✕
187 |                 </button>
188 |               </div>
189 |               <form onSubmit={handleAddCity} className="p-6">
190 |                 <input
191 |                   type="text"
192 |                   value={newCityName}
193 |                   onChange={(e) => setNewCityName(e.target.value)}
194 |                   placeholder="Наприклад: Львів"
195 |                   className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
196 |                   autoFocus
197 |                   required
198 |                 />
199 |                 <div className="flex gap-3">
200 |                   <button
201 |                     type="button"
202 |                     onClick={() => setIsModalOpen(false)}
203 |                     className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
204 |                   >
205 |                     Скасувати
206 |                   </button>
207 |                   <button
208 |                     type="submit"
209 |                     disabled={addCity.isPending}
210 |                     className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
211 |                   >
212 |                     {addCity.isPending ? "Збереження..." : "Зберегти"}
213 |                   </button>
214 |                 </div>
215 |               </form>
216 |             </div>
217 |           </div>,
218 |           document.body,
219 |         )}
220 |     </div>
221 |   );
222 | }
223 | 
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
140 |   const [userRole] = useState<string | null>(() => {
141 |     try {
142 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
143 |     } catch {
144 |       return null;
145 |     }
146 |   });
147 |   const isSuperAdmin = userRole === "SUPERADMIN";
148 | 
149 |   const cityFilteredUsers = selectedCity.id
150 |     ? users.filter((u) => u.cityId === selectedCity.id)
151 |     : users;
152 |   const grouped = (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
153 |     role,
154 |     label: ROLE_LABELS[role],
155 |     items: cityFilteredUsers.filter((u) => u.role === role),
156 |   }));
157 | 
158 |   const handleOpenModal = (user: User | null = null) => {
159 |     setEditingUser(user);
160 |     if (user) {
161 |       setForm({
162 |         fullName: user.name,
163 |         phone: user.phone || "",
164 |         email: user.email,
165 |         cityId: user.cityId || "",
166 |         role: user.role,
167 |         password: "",
168 |         telegramId: user.telegramId || "",
169 |         car: user.car || "",
170 |       });
171 |     } else {
172 |       setForm({ ...EMPTY_FORM });
173 |     }
174 |     setIsModalOpen(true);
175 |   };
176 | 
177 |   const handleSubmit = (e: React.FormEvent) => {
178 |     e.preventDefault();
179 |     if (!form.fullName.trim()) return;
180 |     setIsModalOpen(false); // закриваємо одразу
181 |     if (editingUser) updateUser.mutate({ id: editingUser.id, form });
182 |     else createUser.mutate(form);
183 |   };
184 | 
185 |   const handleDelete = async (id: string, name: string) => {
186 |     if (!window.confirm(`Видалити користувача "${name}"?`)) return;
187 |     try {
188 |       await deleteUser.mutateAsync(id);
189 |     } catch (e) {
190 |       alert("Помилка видалення");
191 |     }
192 |   };
193 | 
194 |   const handleCreateProject = (e: React.FormEvent) => {
195 |     e.preventDefault();
196 |     if (!projectForm.name.trim()) return;
197 |     setIsProjectModalOpen(false);
198 |     setProjectForm({ name: "", color: "blue" });
199 |     createProject.mutate(projectForm);
200 |   };
201 | 
202 |   const handleDeleteProject = async (id: string, name: string) => {
203 |     if (
204 |       !window.confirm(
205 |         `Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`,
206 |       )
207 |     )
208 |       return;
209 |     try {
210 |       await deleteProject.mutateAsync(id);
211 |     } catch (e) {
212 |       alert("Помилка видалення");
213 |     }
214 |   };
215 | 
216 |   if (isLoading) return <EmployeesSkeleton />;
217 | 
218 |   return (
219 |     <motion.div
220 |       initial={{ opacity: 0, y: 8 }}
221 |       animate={{ opacity: 1, y: 0 }}
222 |       transition={{ duration: 0.35, ease: "easeOut" }}
223 |       className="p-4 md:p-8 h-full"
224 |     >
225 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
226 |         <motion.div
227 |           initial={{ opacity: 0, y: -10 }}
228 |           animate={{ opacity: 1, y: 0 }}
229 |           transition={{ duration: 0.4, ease: "easeOut" }}
230 |         >
231 |           <h1 className="text-2xl font-bold text-slate-800">
232 |             Акаунти та Проєкти{" "}
233 |             {selectedCity.id && (
234 |               <span className="ml-2 text-base font-normal text-blue-500">
235 |                 · {selectedCity.name}
236 |               </span>
237 |             )}
238 |           </h1>
239 |           <p className="text-sm text-slate-400 mt-1">
240 |             Керування доступами, працівниками та видами подій
241 |           </p>
242 |         </motion.div>
243 |         {isSuperAdmin && (
244 |           <motion.button
245 |             initial={{ opacity: 0, y: -10 }}
246 |             animate={{ opacity: 1, y: 0 }}
247 |             transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
248 |             whileTap={{ scale: 0.97 }}
249 |             onClick={() => handleOpenModal()}
250 |             className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 w-full sm:w-auto"
251 |           >
252 |             + Створити користувача
253 |           </motion.button>
254 |         )}
255 |       </div>
256 | 
257 |       <div className="space-y-8">
258 |         {grouped.map(({ role, label, items }, gi) => (
259 |           <motion.div
260 |             key={role}
261 |             initial={{ opacity: 0, y: 15 }}
262 |             animate={{ opacity: 1, y: 0 }}
263 |             transition={{ duration: 0.3, delay: gi * 0.06 }}
264 |           >
265 |             <div className={`flex items-center gap-3 mb-4`}>
266 |               <div
267 |                 className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}
268 |               ></div>
269 |               <h2 className="text-lg font-bold text-slate-700">{label}</h2>
270 |               <motion.span
271 |                 key={items.length}
272 |                 initial={{ scale: 0.7, opacity: 0 }}
273 |                 animate={{ scale: 1, opacity: 1 }}
274 |                 transition={{ duration: 0.2 }}
275 |                 className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
276 |               >
277 |                 {items.length}
278 |               </motion.span>
279 |             </div>
280 |             {items.length === 0 ? (
281 |               <motion.div
282 |                 initial={{ opacity: 0, scale: 0.97 }}
283 |                 animate={{ opacity: 1, scale: 1 }}
284 |                 transition={{ duration: 0.25 }}
285 |                 className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm"
286 |               >
287 |                 Немає {label.toLowerCase()}ів
288 |               </motion.div>
289 |             ) : (
290 |               <motion.div
291 |                 whileHover={{
292 |                   y: -2,
293 |                   boxShadow: "0 8px 24px -4px rgba(0,0,0,0.08)",
294 |                 }}
295 |                 transition={{ duration: 0.2 }}
296 |                 className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
297 |               >
298 |                 <table className="w-full text-left">
299 |                   <thead>
300 |                     <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
301 |                       <th className="px-5 py-3">ПІБ</th>
302 |                       <th className="px-5 py-3">Телефон</th>
303 |                       <th className="px-5 py-3">Пошта / Логін</th>
304 |                       <th className="px-5 py-3">Місто</th>
305 |                       <th className="px-5 py-3 text-center">Дії</th>
306 |                     </tr>
307 |                   </thead>
308 |                   <tbody>
309 |                     <AnimatePresence initial={false}>
310 |                       {items.map((u, ri) => (
311 |                         <motion.tr
312 |                           key={u.id}
313 |                           initial={{ opacity: 0 }}
314 |                           animate={{ opacity: 1 }}
315 |                           exit={{ opacity: 0, height: 0 }}
316 |                           transition={{ duration: 0.2, delay: ri * 0.04 }}
317 |                           className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
318 |                         >
319 |                           <td className="px-5 py-4">
320 |                             <div className="flex items-center gap-3">
321 |                               <motion.div
322 |                                 initial={{ scale: 0.8, opacity: 0 }}
323 |                                 animate={{ scale: 1, opacity: 1 }}
324 |                                 transition={{ duration: 0.2, delay: 0.05 }}
325 |                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
326 |                               >
327 |                                 {u.name.charAt(0)}
328 |                               </motion.div>
329 |                               <span className="font-medium text-slate-800">
330 |                                 {u.name}
331 |                               </span>
332 |                             </div>
333 |                           </td>
334 |                           <td className="px-5 py-4 text-slate-600 text-sm">
335 |                             <PhoneLink phone={u.phone} />
336 |                             {u.car && (
337 |                               <p className="text-xs text-emerald-600 font-medium mt-1">
338 |                                 🚗 {u.car}
339 |                               </p>
340 |                             )}
341 |                           </td>
342 |                           <td className="px-5 py-4 text-slate-600 text-sm font-medium">
343 |                             {u.email}
344 |                           </td>
345 |                           <td className="px-5 py-4">
346 |                             <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
347 |                               📍 {u.city?.name || "Всі міста"}
348 |                             </span>
349 |                           </td>
350 |                           <td className="px-5 py-4 text-center">
351 |                             {isSuperAdmin && (
352 |                               <>
353 |                                 <motion.button
354 |                                   whileTap={{ scale: 0.93 }}
355 |                                   onClick={() => handleOpenModal(u)}
356 |                                   className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg mr-2 transition-colors"
357 |                                 >
358 |                                   ✏️
359 |                                 </motion.button>
360 |                                 <motion.button
361 |                                   whileTap={{ scale: 0.93 }}
362 |                                   onClick={() => handleDelete(u.id, u.name)}
363 |                                   className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
364 |                                 >
365 |                                   🗑
366 |                                 </motion.button>
367 |                               </>
368 |                             )}
369 |                           </td>
370 |                         </motion.tr>
371 |                       ))}
372 |                     </AnimatePresence>
373 |                   </tbody>
374 |                 </table>
375 |               </motion.div>
376 |             )}
377 |           </motion.div>
378 |         ))}
379 |       </div>
380 | 
381 |       {/* --- СЕКЦІЯ ПРОЄКТІВ (ВИДІВ ПОДІЙ) --- */}
382 |       <div className="mt-16 border-t border-slate-200 pt-10">
383 |         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
384 |           <div>
385 |             <h2 className="text-2xl font-bold text-slate-800">
386 |               Види подій (Проєкти)
387 |             </h2>
388 |             <p className="text-sm text-slate-400 mt-1">
389 |               Ці проєкти відображатимуться у випадаючому списку при створенні
390 |               події
391 |             </p>
392 |           </div>
393 |           {isSuperAdmin && (
394 |             <button
395 |               onClick={() => setIsProjectModalOpen(true)}
396 |               className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto"
397 |             >
398 |               + Створити вид події
399 |             </button>
400 |           )}
401 |         </div>
402 | 
403 |         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
404 |           {projects.map((p, pi) => (
405 |             <motion.div
406 |               key={p.id}
407 |               initial={{ opacity: 0, y: 8 }}
408 |               animate={{ opacity: 1, y: 0 }}
409 |               transition={{ duration: 0.25, delay: pi * 0.05 }}
410 |               whileHover={{
411 |                 y: -3,
412 |                 boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
413 |               }}
414 |               className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default"
415 |             >
416 |               <div className="flex items-center gap-3">
417 |                 <motion.div
418 |                   whileHover={{ scale: 1.3 }}
419 |                   transition={{ duration: 0.15 }}
420 |                   className={`w-4 h-4 rounded-full ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm`}
421 |                 />
422 |                 <span className="font-bold text-slate-800">{p.name}</span>
423 |               </div>
424 |               {isSuperAdmin && (
425 |                 <button
426 |                   onClick={() => handleDeleteProject(p.id, p.name)}
427 |                   className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2"
428 |                   title="Видалити"
429 |                 >
430 |                   🗑
431 |                 </button>
432 |               )}
433 |             </motion.div>
434 |           ))}
435 |           {projects.length === 0 && (
436 |             <div className="col-span-full text-center py-10 text-slate-400">
437 |               Ви ще не додали жодного виду події
438 |             </div>
439 |           )}
440 |         </div>
441 |       </div>
442 | 
443 |       {/* Модалки Користувача і Проєктів */}
444 |       {isProjectModalOpen && (
445 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
446 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
447 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
448 |               <h3 className="text-xl font-bold text-slate-800">
449 |                 Новий вид події
450 |               </h3>
451 |               <button
452 |                 onClick={() => setIsProjectModalOpen(false)}
453 |                 className="text-slate-400 text-xl leading-none p-2 -mr-2"
454 |               >
455 |                 ✕
456 |               </button>
457 |             </div>
458 |             <form onSubmit={handleCreateProject} className="p-6">
459 |               <label className="block text-sm font-medium text-slate-700 mb-1.5">
460 |                 Назва
461 |               </label>
462 |               <input
463 |                 type="text"
464 |                 value={projectForm.name}
465 |                 onChange={(e) =>
466 |                   setProjectForm({ ...projectForm, name: e.target.value })
467 |                 }
468 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
469 |                 required
470 |                 placeholder="Наприклад: Шоу мильних бульбашок"
471 |               />
472 |               <label className="block text-sm font-medium text-slate-700 mb-3">
473 |                 Колір для календаря
474 |               </label>
475 |               <div className="flex gap-4 mb-8">
476 |                 {Object.keys(PROJECT_COLORS).map((c) => (
477 |                   <button
478 |                     type="button"
479 |                     key={c}
480 |                     onClick={() => setProjectForm({ ...projectForm, color: c })}
481 |                     className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${projectForm.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
482 |                   />
483 |                 ))}
484 |               </div>
485 |               <div className="flex gap-3">
486 |                 <button
487 |                   type="button"
488 |                   onClick={() => setIsProjectModalOpen(false)}
489 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
490 |                 >
491 |                   Скасувати
492 |                 </button>
493 |                 <button
494 |                   type="submit"
495 |                   className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
496 |                 >
497 |                   Зберегти
498 |                 </button>
499 |               </div>
500 |             </form>
501 |           </div>
502 |         </div>
503 |       )}
504 | 
505 |       {/* Ваша стара модалка Користувача */}
506 |       {isModalOpen && (
507 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
508 |           {/* Ваш існуючий код модалки працівника... Для стислості я зберіг базові поля */}
509 |           <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col">
510 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
511 |               <h3 className="text-xl font-bold">
512 |                 {editingUser ? "Редагувати" : "Новий користувач"}
513 |               </h3>
514 |               <button
515 |                 onClick={() => setIsModalOpen(false)}
516 |                 className="text-slate-400 text-xl p-2 -mr-2"
517 |               >
518 |                 ✕
519 |               </button>
520 |             </div>
521 |             <form
522 |               onSubmit={handleSubmit}
523 |               className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
524 |             >
525 |               <input
526 |                 type="text"
527 |                 value={form.fullName}
528 |                 onChange={(e) => setForm({ ...form, fullName: e.target.value })}
529 |                 required
530 |                 placeholder="ПІБ"
531 |                 className="w-full p-2.5 border rounded-lg"
532 |               />
533 |               <div className="grid grid-cols-2 gap-4">
534 |                 <input
535 |                   type="email"
536 |                   value={form.email}
537 |                   onChange={(e) => setForm({ ...form, email: e.target.value })}
538 |                   required
539 |                   placeholder="Пошта"
540 |                   className="w-full p-2.5 border rounded-lg"
541 |                 />
542 |                 <input
543 |                   type="password"
544 |                   value={form.password}
545 |                   onChange={(e) =>
546 |                     setForm({ ...form, password: e.target.value })
547 |                   }
548 |                   required={!editingUser}
549 |                   placeholder="Пароль"
550 |                   className="w-full p-2.5 border rounded-lg"
551 |                 />
552 |               </div>
553 |               <div className="grid grid-cols-2 gap-4">
554 |                 <input
555 |                   type="tel"
556 |                   value={form.phone}
557 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
558 |                   placeholder="Телефон"
559 |                   className="w-full p-2.5 border rounded-lg"
560 |                 />
561 |                 <input
562 |                   type="text"
563 |                   value={form.telegramId}
564 |                   onChange={(e) =>
565 |                     setForm({ ...form, telegramId: e.target.value })
566 |                   }
567 |                   placeholder="Telegram ID або @username"
568 |                   className="w-full p-2.5 border rounded-lg"
569 |                 />
570 |               </div>
571 |               <div className="grid grid-cols-2 gap-4">
572 |                 <select
573 |                   value={form.role}
574 |                   onChange={(e) =>
575 |                     setForm({ ...form, role: e.target.value as Role })
576 |                   }
577 |                   className="w-full p-2.5 border rounded-lg"
578 |                 >
579 |                   <option value="MANAGER">Менеджер</option>
580 |                   <option value="DRIVER">Водій</option>
581 |                   <option value="HOST">Ведучий</option>
582 |                   <option value="SUPERADMIN">Суперадмін</option>
583 |                 </select>
584 |                 <select
585 |                   value={form.cityId}
586 |                   onChange={(e) => setForm({ ...form, cityId: e.target.value })}
587 |                   className="w-full p-2.5 border rounded-lg"
588 |                 >
589 |                   <option value="">Всі міста</option>
590 |                   {cities.map((c) => (
591 |                     <option key={c.id} value={c.id}>
592 |                       {c.name}
593 |                     </option>
594 |                   ))}
595 |                 </select>
596 |               </div>
597 |               {form.role === "DRIVER" && (
598 |                 <input
599 |                   type="text"
600 |                   value={form.car || ""}
601 |                   onChange={(e) => setForm({ ...form, car: e.target.value })}
602 |                   placeholder="Автомобіль (напр. Renault Trafic)"
603 |                   className="w-full p-2.5 border rounded-lg"
604 |                 />
605 |               )}
606 |               <div className="flex gap-3 mt-2">
607 |                 <button
608 |                   type="button"
609 |                   onClick={() => setIsModalOpen(false)}
610 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
611 |                 >
612 |                   Скасувати
613 |                 </button>
614 |                 <button
615 |                   type="submit"
616 |                   disabled={isSubmitting}
617 |                   className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
618 |                 >
619 |                   Зберегти
620 |                 </button>
621 |               </div>
622 |             </form>
623 |           </div>
624 |         </div>
625 |       )}
626 |     </motion.div>
627 |   );
628 | }
629 | 
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
 29 |   const [userRole] = useState<string | null>(() => {
 30 |     try {
 31 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
 32 |     } catch {
 33 |       return null;
 34 |     }
 35 |   });
 36 | 
 37 |   const navigate = useNavigate();
 38 |   const { selectedCity } = useSelectedCity();
 39 |   const [isModalOpen, setIsModalOpen] = useState(false);
 40 |   const [isSubmitting, setIsSubmitting] = useState(false);
 41 |   const [form, setForm] = useState({
 42 |     name: "",
 43 |     cityId: "",
 44 |     sourceUrl: "",
 45 |     director: "",
 46 |     phone: "",
 47 |   });
 48 |   const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
 49 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 50 |   const [suggestions, setSuggestions] = useState<
 51 |     { name: string; url: string }[]
 52 |   >([]);
 53 |   const [showSuggestions, setShowSuggestions] = useState(false);
 54 |   const [isSearching, setIsSearching] = useState(false);
 55 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 56 | 
 57 |   const handleOpenModal = () => {
 58 |     setForm({
 59 |       name: "",
 60 |       cityId: selectedCity.id || cities[0]?.id || "",
 61 |       sourceUrl: "",
 62 |       director: "",
 63 |       phone: "",
 64 |     });
 65 |     setMatchedContacts([]);
 66 |     setIsModalOpen(true);
 67 |   };
 68 | 
 69 |   const fetchContacts = async (schoolName: string) => {
 70 |     if (!schoolName || schoolName.trim().length < 1) {
 71 |       setMatchedContacts([]);
 72 |       return;
 73 |     }
 74 |     const currentCityName =
 75 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
 76 |     if (currentCityName.toLowerCase() !== "львів") {
 77 |       setMatchedContacts([]);
 78 |       return;
 79 |     }
 80 |     try {
 81 |       const token = localStorage.getItem("token");
 82 |       const res = await api.get(
 83 |         `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=${encodeURIComponent("Садочок")}`,
 84 |         { headers: { Authorization: `Bearer ${token}` } },
 85 |       );
 86 |       setMatchedContacts(res.data);
 87 |       if (res.data.length > 0) {
 88 |         const director =
 89 |           res.data.find(
 90 |             (c: any) =>
 91 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
 92 |           ) || res.data[0];
 93 |         setForm((f) => ({
 94 |           ...f,
 95 |           director: director.contactName,
 96 |           phone: director.phone,
 97 |         }));
 98 |       }
 99 |     } catch (e) {
100 |       console.error(e);
101 |     }
102 |   };
103 | 
104 |   const handleNameChange = (value: string) => {
105 |     setForm({ ...form, name: value });
106 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
107 |     if (value.length < 2) {
108 |       setShowSuggestions(false);
109 |       setIsSearching(false);
110 |       setMatchedContacts([]);
111 |       return;
112 |     }
113 |     setIsSearching(true);
114 |     setShowSuggestions(true);
115 |     debounceTimer.current = setTimeout(async () => {
116 |       const token = localStorage.getItem("token");
117 |       try {
118 |         const [externalRes] = await Promise.all([
119 |           api.get(
120 |             `/schools/search?q=${value}&type=${encodeURIComponent("Садочок")}`,
121 |             {
122 |               headers: { Authorization: `Bearer ${token}` },
123 |             },
124 |           ),
125 |           fetchContacts(value),
126 |         ]);
127 |         setSuggestions(externalRes.data);
128 |       } catch (e) {
129 |         console.error(e);
130 |       } finally {
131 |         setIsSearching(false);
132 |       }
133 |     }, 400);
134 |   };
135 | 
136 |   const handleSelectSuggestion = (name: string, url: string) => {
137 |     setForm({ ...form, name, sourceUrl: url });
138 |     setShowSuggestions(false);
139 |     fetchContacts(name);
140 |   };
141 | 
142 |   const handleAddSchool = async (e: React.FormEvent) => {
143 |     e.preventDefault();
144 |     if (!form.name.trim() || !form.cityId) return;
145 |     setIsSubmitting(true);
146 |     try {
147 |       const token = localStorage.getItem("token");
148 |       await api.post(
149 |         "/schools",
150 |         { ...form, type: "Садочок" },
151 |         {
152 |           headers: { Authorization: `Bearer ${token}` },
153 |         },
154 |       );
155 |       setIsModalOpen(false);
156 |       qc.invalidateQueries({ queryKey: ["schools"] });
157 |     } catch (e) {
158 |       console.error(e);
159 |       alert("Не вдалося створити садочок");
160 |     } finally {
161 |       setIsSubmitting(false);
162 |     }
163 |   };
164 | 
165 |   const handleDeleteSchool = async (
166 |     e: React.MouseEvent,
167 |     schoolId: string,
168 |     schoolName: string,
169 |   ) => {
170 |     e.stopPropagation();
171 |     if (!window.confirm(`Видалити садочок "${schoolName}"?...`)) return;
172 |     await deleteSchool.mutateAsync(schoolId);
173 |   };
174 | 
175 |   const filteredKindergartens = schools.filter((s) => {
176 |     const isCityMatch = selectedCity.id ? s.cityId === selectedCity.id : true;
177 |     const isFilterMatch = activeFilter
178 |       ? classifySchool(s) === activeFilter
179 |       : true;
180 |     return isCityMatch && s.type === "Садочок" && isFilterMatch;
181 |   });
182 | 
183 |   return (
184 |     <div className="p-4 md:p-8 h-full max-w-[100vw]">
185 |       <div className="flex items-center justify-between gap-2 mb-3">
186 |         <h1 className="text-xl font-bold text-slate-800">
187 |           Садочки
188 |           {selectedCity.id && (
189 |             <span className="ml-2 text-sm font-normal text-blue-500">
190 |               · {selectedCity.name}
191 |             </span>
192 |           )}
193 |         </h1>
194 |         <div className="flex gap-2 shrink-0">
195 |           {userRole === "SUPERADMIN" && (
196 |             <button
197 |               onClick={async () => {
198 |                 if (!selectedCity.id) return alert("Спочатку оберіть місто");
199 |                 if (
200 |                   !window.confirm(
201 |                     `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
202 |                   )
203 |                 )
204 |                   return;
205 |                 try {
206 |                   const token = localStorage.getItem("token");
207 |                   const res = await api.post(
208 |                     "/schools/bulk-import",
209 |                     { cityId: selectedCity.id, type: "Садочок" },
210 |                     {
211 |                       headers: { Authorization: `Bearer ${token}` },
212 |                       timeout: 120000,
213 |                     },
214 |                   );
215 |                   alert(
216 |                     `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
217 |                   );
218 |                   qc.invalidateQueries({ queryKey: ["schools"] });
219 |                 } catch (e) {
220 |                   alert("Помилка імпорту.");
221 |                 }
222 |               }}
223 |               className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
224 |             >
225 |               📥 Імпорт з isuo
226 |             </button>
227 |           )}
228 |           {userRole === "SUPERADMIN" && (
229 |             <button
230 |               onClick={handleOpenModal}
231 |               className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
232 |             >
233 |               + Додати
234 |             </button>
235 |           )}
236 |         </div>
237 |       </div>
238 | 
239 |       <StatsBar
240 |         schools={schools.filter(
241 |           (s) =>
242 |             (selectedCity.id ? s.cityId === selectedCity.id : true) &&
243 |             s.type === "Садочок",
244 |         )}
245 |         activeFilter={activeFilter}
246 |         onFilterChange={setActiveFilter}
247 |       />
248 | 
249 |       {/* Мобільний вигляд */}
250 |       <div className="md:hidden flex flex-col gap-2.5">
251 |         {filteredKindergartens.map((school) => {
252 |           const latestEvent = school.events?.[0];
253 |           const stage = latestEvent
254 |             ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
255 |             : null;
256 | 
257 |           // Остання активність
258 |           const lastActivityDate =
259 |             school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
260 |           const daysStale = lastActivityDate
261 |             ? Math.floor(
262 |                 (Date.now() - new Date(lastActivityDate).getTime()) / 86400000,
263 |               )
264 |             : null;
265 | 
266 |           const stalenessColor =
267 |             daysStale === null
268 |               ? "text-slate-400"
269 |               : daysStale >= 21
270 |                 ? "text-red-500"
271 |                 : daysStale >= 14
272 |                   ? "text-orange-500"
273 |                   : daysStale >= 7
274 |                     ? "text-amber-500"
275 |                     : "text-emerald-500";
276 | 
277 |           return (
278 |             <div
279 |               key={school.id}
280 |               onClick={() => navigate(`/schools/${school.id}`)}
281 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform"
282 |             >
283 |               {/* Рядок 1: назва + видалити */}
284 |               <div className="flex items-start justify-between gap-2">
285 |                 <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
286 |                   {school.name}
287 |                 </p>
288 |                 {userRole === "SUPERADMIN" && (
289 |                   <button
290 |                     onClick={(e) =>
291 |                       handleDeleteSchool(e, school.id, school.name)
292 |                     }
293 |                     className="text-slate-300 active:text-red-500 p-1 -mt-0.5 -mr-1 shrink-0"
294 |                   >
295 |                     🗑
296 |                   </button>
297 |                 )}
298 |               </div>
299 | 
300 |               {/* Рядок 2: директор (клікабельний телефон) + етап */}
301 |               <div className="flex items-center justify-between gap-2 mt-2">
302 |                 <div className="flex items-center gap-1.5 min-w-0">
303 |                   {school.phone ? (
304 |                     <a
305 |                       href={`tel:${school.phone}`}
306 |                       onClick={(e) => e.stopPropagation()}
307 |                       className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
308 |                     >
309 |                       📞 {school.director || school.phone}
310 |                     </a>
311 |                   ) : school.director ? (
312 |                     <span className="text-xs text-slate-500 truncate">
313 |                       👤 {school.director}
314 |                     </span>
315 |                   ) : (
316 |                     <span className="text-xs text-slate-300 italic">
317 |                       Контакт не вказано
318 |                     </span>
319 |                   )}
320 |                 </div>
321 | 
322 |                 {stage ? (
323 |                   <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
324 |                     {stage.name}
325 |                   </span>
326 |                 ) : (
327 |                   <span className="text-[10px] text-slate-300 shrink-0">
328 |                     Етап —
329 |                   </span>
330 |                 )}
331 |               </div>
332 | 
333 |               {/* Рядок 3: остання активність */}
334 |               {daysStale !== null && (
335 |                 <p className={`text-[11px] mt-1.5 ${stalenessColor}`}>
336 |                   ⏱{" "}
337 |                   {daysStale === 0
338 |                     ? "Активність сьогодні"
339 |                     : `Остання активність ${daysStale} дн тому`}
340 |                 </p>
341 |               )}
342 |             </div>
343 |           );
344 |         })}
345 | 
346 |         {filteredKindergartens.length === 0 && (
347 |           <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
348 |             Садочків ще немає
349 |           </div>
350 |         )}
351 | 
352 |         {/* FAB */}
353 |         {userRole === "SUPERADMIN" && (
354 |           <button
355 |             onClick={handleOpenModal}
356 |             className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
357 |           >
358 |             +
359 |           </button>
360 |         )}
361 |       </div>
362 | 
363 |       {/* Десктоп таблиця */}
364 |       <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto w-full">
365 |         <table className="w-full text-left border-collapse">
366 |           <thead>
367 |             <tr className="bg-slate-50 border-b border-slate-100">
368 |               <th className="p-4 font-medium text-slate-600">Назва садочку</th>
369 |               <th className="p-4 font-medium text-slate-600">Місто</th>
370 |               <th className="p-4 font-medium text-slate-600">Статус</th>
371 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
372 |               <th className="p-4 font-medium text-slate-600 text-center">
373 |                 Дія
374 |               </th>
375 |             </tr>
376 |           </thead>
377 |           <tbody>
378 |             {filteredKindergartens.map((school) => {
379 |               const latestEvent = school.events?.[0];
380 |               const stage = latestEvent
381 |                 ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
382 |                 : null;
383 |               return (
384 |                 <tr
385 |                   key={school.id}
386 |                   onClick={() => navigate(`/schools/${school.id}`)}
387 |                   className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/50 transition"
388 |                 >
389 |                   <td className="p-4 text-slate-800 font-medium">
390 |                     {school.name}
391 |                   </td>
392 |                   <td className="p-4 text-slate-600">{school.city?.name}</td>
393 |                   <td className="p-4">
394 |                     <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
395 |                       Активний
396 |                     </span>
397 |                   </td>
398 |                   <td className="p-4">
399 |                     {stage ? (
400 |                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
401 |                         {stage.name}
402 |                       </span>
403 |                     ) : (
404 |                       <span className="text-slate-400 text-xs italic">—</span>
405 |                     )}
406 |                   </td>
407 |                   <td className="p-4 text-center">
408 |                     {userRole === "SUPERADMIN" && (
409 |                       <button
410 |                         onClick={(e) =>
411 |                           handleDeleteSchool(e, school.id, school.name)
412 |                         }
413 |                         className="text-slate-400 hover:text-red-500 transition-colors p-2"
414 |                       >
415 |                         🗑
416 |                       </button>
417 |                     )}
418 |                   </td>
419 |                 </tr>
420 |               );
421 |             })}
422 |           </tbody>
423 |         </table>
424 |       </div>
425 | 
426 |       {/* Модалка */}
427 |       {isModalOpen && (
428 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
429 |           <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col">
430 |             <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
431 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
432 |               <h3 className="text-xl font-bold text-slate-800">
433 |                 Новий садочок
434 |               </h3>
435 |               <button
436 |                 onClick={() => setIsModalOpen(false)}
437 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2"
438 |               >
439 |                 ✕
440 |               </button>
441 |             </div>
442 |             <form
443 |               onSubmit={handleAddSchool}
444 |               className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto"
445 |             >
446 |               <div className="relative">
447 |                 <label className="block text-sm text-slate-600 mb-1">
448 |                   Назва садочку
449 |                 </label>
450 |                 <input
451 |                   type="text"
452 |                   value={form.name}
453 |                   onChange={(e) => handleNameChange(e.target.value)}
454 |                   onBlur={() =>
455 |                     setTimeout(() => setShowSuggestions(false), 150)
456 |                   }
457 |                   required
458 |                   placeholder="Наприклад: Садочок №1"
459 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
460 |                 />
461 |                 {showSuggestions && (
462 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
463 |                     {isSearching ? (
464 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
465 |                         Пошук за збігами...
466 |                       </li>
467 |                     ) : suggestions.length > 0 ? (
468 |                       suggestions.map((s, i) => (
469 |                         <li
470 |                           key={i}
471 |                           onMouseDown={() =>
472 |                             handleSelectSuggestion(s.name, s.url)
473 |                           }
474 |                           className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
475 |                         >
476 |                           {s.name}
477 |                         </li>
478 |                       ))
479 |                     ) : (
480 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
481 |                         Нічого не знайдено
482 |                       </li>
483 |                     )}
484 |                   </ul>
485 |                 )}
486 |               </div>
487 | 
488 |               {!selectedCity.id && (
489 |                 <div>
490 |                   <label className="block text-sm text-slate-600 mb-1">
491 |                     Місто
492 |                   </label>
493 |                   <select
494 |                     value={form.cityId}
495 |                     onChange={(e) =>
496 |                       setForm({ ...form, cityId: e.target.value })
497 |                     }
498 |                     required
499 |                     className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
500 |                   >
501 |                     <option value="">— Оберіть місто —</option>
502 |                     {cities.map((c) => (
503 |                       <option key={c.id} value={c.id}>
504 |                         {c.name}
505 |                       </option>
506 |                     ))}
507 |                   </select>
508 |                 </div>
509 |               )}
510 | 
511 |               <div>
512 |                 <label className="block text-sm text-slate-600 mb-1">
513 |                   Контакт{" "}
514 |                   <span className="ml-1 text-xs text-slate-400">
515 |                     (автозаповнення)
516 |                   </span>
517 |                 </label>
518 |                 {matchedContacts.length > 0 && (
519 |                   <div className="flex flex-wrap gap-1 mb-2">
520 |                     {matchedContacts.map((c, i) => (
521 |                       <button
522 |                         key={i}
523 |                         type="button"
524 |                         onClick={() =>
525 |                           setForm((f) => ({
526 |                             ...f,
527 |                             director: c.contactName,
528 |                             phone: c.phone,
529 |                           }))
530 |                         }
531 |                         className={`text-xs px-2 py-1 rounded-full border transition-colors ${
532 |                           form.director === c.contactName
533 |                             ? "bg-blue-600 text-white border-blue-600"
534 |                             : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
535 |                         }`}
536 |                       >
537 |                         {c.role ? `${c.role}: ` : ""}
538 |                         {c.contactName}
539 |                       </button>
540 |                     ))}
541 |                   </div>
542 |                 )}
543 |                 <input
544 |                   type="text"
545 |                   value={form.director}
546 |                   onChange={(e) =>
547 |                     setForm({ ...form, director: e.target.value })
548 |                   }
549 |                   placeholder="Микола Петренко"
550 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
551 |                 />
552 |               </div>
553 | 
554 |               <div>
555 |                 <label className="block text-sm text-slate-600 mb-1">
556 |                   Телефон{" "}
557 |                   <span className="ml-1 text-xs text-slate-400">
558 |                     (автозаповнення)
559 |                   </span>
560 |                 </label>
561 |                 <input
562 |                   type="text"
563 |                   value={form.phone}
564 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
565 |                   placeholder="0671234567"
566 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
567 |                 />
568 |               </div>
569 | 
570 |               <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2 pb-1 sm:pb-0">
571 |                 <button
572 |                   type="button"
573 |                   onClick={() => setIsModalOpen(false)}
574 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 rounded-xl sm:rounded-lg text-sm font-medium hover:bg-slate-200"
575 |                 >
576 |                   Скасувати
577 |                 </button>
578 |                 <button
579 |                   type="submit"
580 |                   disabled={isSubmitting}
581 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl sm:rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
582 |                 >
583 |                   {isSubmitting ? "Збереження..." : "Створити"}
584 |                 </button>
585 |               </div>
586 |             </form>
587 |           </div>
588 |         </div>
589 |       )}
590 |     </div>
591 |   );
592 | }
593 | 
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
  3 | 
  4 | // Hooks
  5 | import {
  6 |   useSchool,
  7 |   useSchoolEvents,
  8 |   useUsers,
  9 |   useUpdateEventStatus,
 10 |   useUpdatePreparation,
 11 |   useAssignCrew,
 12 |   useSubmitReport,
 13 |   useAddComment,
 14 |   useUpdateHistoryComment,
 15 |   useEventFull,
 16 |   useSchoolCompletedEvents,
 17 |   useUpdateSchool,
 18 |   useCreateEvent,
 19 | } from "../hooks/useSchoolProfile";
 20 | 
 21 | // Types
 22 | import type { Event, User } from "../types";
 23 | import type { ReportData } from "../components/school-profile/modals/ReportModal";
 24 | 
 25 | // Components
 26 | import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
 27 | import CompletedEventModal from "../components/school-profile/CompletedEventModal";
 28 | 
 29 | // Lazy components
 30 | const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
 31 | const HistoryTimeline = lazy(
 32 |   () => import("../components/school-profile/HistoryTimeline"),
 33 | );
 34 | const EventDetails = lazy(
 35 |   () => import("../components/school-profile/EventDetails"),
 36 | );
 37 | const SchoolInfoCard = lazy(
 38 |   () => import("../components/school-profile/SchoolInfoCard"),
 39 | );
 40 | const EventsTable = lazy(
 41 |   () => import("../components/school-profile/EventsTable"),
 42 | );
 43 | const EventPreparation = lazy(
 44 |   () => import("../components/school-profile/EventPreparation"),
 45 | );
 46 | const AssignedCrew = lazy(
 47 |   () => import("../components/school-profile/AssignedCrew"),
 48 | );
 49 | 
 50 | // Modals
 51 | import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
 52 | import EventModal from "../components/school-profile/modals/EventModal";
 53 | import CommentModal from "../components/school-profile/modals/CommentModal";
 54 | import CrewModal from "../components/school-profile/modals/CrewModal";
 55 | import ReportModal from "../components/school-profile/modals/ReportModal";
 56 | 
 57 | const PIPELINE_STAGES = [
 58 |   { id: 1, key: "BASE", name: "Новий заклад" },
 59 |   { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
 60 |   { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 61 |   { id: 4, key: "PREPARATION", name: "Оголошення" },
 62 |   { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
 63 |   { id: 6, key: "DONE", name: "Проведення заходу" },
 64 |   { id: 7, key: "REPORT", name: "Звіт" },
 65 | ] as const;
 66 | 
 67 | export default function SchoolProfile() {
 68 |   const { id } = useParams();
 69 | 
 70 |   // 1. Спочатку завантажуємо базові дані
 71 | 
 72 |   // 2. Оголошуємо стейти, які потрібні для наступних запитів
 73 |   const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
 74 |   const [exitingEventId, setExitingEventId] = useState<string | null>(null);
 75 | 
 76 |   // 3. ТЕПЕР безпечно викликаємо useEventFull, оскільки selectedEventId вже існує
 77 |   const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
 78 |     selectedEventId ?? eventsRaw[0]?.id,
 79 |   );
 80 | 
 81 |   const { data: users = [] } = useUsers();
 82 |   const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
 83 |   const [selectedReportEvent, setSelectedReportEvent] = useState<Event | null>(
 84 |     null,
 85 |   );
 86 |   const updateStatus = useUpdateEventStatus();
 87 |   const updatePreparation = useUpdatePreparation();
 88 |   const assignCrewMutation = useAssignCrew();
 89 |   const submitReportMutation = useSubmitReport();
 90 |   const addCommentMutation = useAddComment();
 91 |   const updateHistoryMutation = useUpdateHistoryComment();
 92 | 
 93 |   // 4. Формуємо schoolData
 94 |   // 4. schoolData — використовуємо schoolRaw напряму
 95 |   const schoolData = useMemo(() => {
 96 |     if (!schoolRaw) {
 97 |       return {
 98 |         id: "",
 99 |         cityId: "",
100 |         name: "",
101 |         type: "Школа",
102 |         city: "",
103 |         address: "",
104 |         director: "",
105 |         phone: "",
106 |         email: "",
107 |         childrenCount: 0,
108 |         notes: "",
109 |       };
110 |     }
111 | 
112 |     return {
113 |       id: schoolRaw.id,
114 |       cityId: schoolRaw.cityId,
115 |       name: schoolRaw.name || "",
116 |       type: schoolRaw.type || "Школа",
117 |       city: schoolRaw.city?.name || "",
118 |       address: schoolRaw.address || "",
119 |       director: schoolRaw.director || "",
120 |       phone: schoolRaw.phone || "",
121 |       email: schoolRaw.email || "",
122 |       childrenCount: schoolRaw.childrenCount || 0,
123 |       notes: schoolRaw.notes || "",
124 |     };
125 |   }, [schoolRaw]);
126 | 
127 |   // 5. Оголошуємо решту стейтів (editForm залежить від schoolData, тому він тут)
128 |   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
129 |   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
130 |   const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
131 |   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
132 |   const [commentModal, setCommentModal] = useState({
133 |     isOpen: false,
134 |     mode: "pipeline",
135 |     stepId: null as number | null,
136 |     historyId: null as string | null,
137 |     text: "",
138 |   });
139 | 
140 |   const [editForm, setEditForm] = useState({
141 |     id: "",
142 |     cityId: "",
143 |     name: "",
144 |     type: "Школа",
145 |     city: "",
146 |     address: "",
147 |     director: "",
148 |     phone: "",
149 |     email: "",
150 |     childrenCount: 0,
151 |     notes: "",
152 |   });
153 |   const [eventForm, setEventForm] = useState({
154 |     project: "Голограма для школи",
155 |     date: "",
156 |     time: "11:00",
157 |     childrenPlanned: "",
158 |     price: "",
159 |     address: "",
160 |     contactPerson: "",
161 |     contactPhone: "",
162 |   });
163 | 
164 |   const currentEventBase = useMemo(
165 |     () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
166 |     [eventsRaw, selectedEventId],
167 |   );
168 | 
169 |   const currentEvent = useMemo(() => {
170 |     if (!currentEventBase) return null;
171 |     if (eventFull?.id === currentEventBase.id) {
172 |       return { ...currentEventBase, ...eventFull };
173 |     }
174 |     return currentEventBase;
175 |   }, [currentEventBase, eventFull]);
176 |   const currentStageIndex = useMemo(() => {
177 |     if (!currentEvent?.status) return 0;
178 |     const idx = PIPELINE_STAGES.findIndex(
179 |       (s) => s.key === currentEvent?.status,
180 |     );
181 |     return idx !== -1 ? idx : 0;
182 |   }, [currentEvent?.status]);
183 |   const creatorName = useMemo(
184 |     () =>
185 |       currentEvent?.history?.length > 0
186 |         ? currentEvent.history[currentEvent.history.length - 1].userName
187 |         : "Немає даних",
188 |     [currentEvent?.history],
189 |   );
190 | 
191 |   const handlePipelineClick = useCallback(
192 |     (stepId: number) => {
193 |       if (!currentEvent) return;
194 |       const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
195 |       if (nextStage?.id !== stepId) return;
196 |       if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
197 |       setCommentModal({
198 |         isOpen: true,
199 |         mode: "pipeline",
200 |         stepId: nextStage.id,
201 |         historyId: null,
202 |         text: "",
203 |       });
204 |     },
205 |     [currentEvent, currentStageIndex],
206 |   );
207 | 
208 |   const handleHistoryClick = useCallback(
209 |     (historyItem: { id: string; comment?: string }) => {
210 |       setCommentModal({
211 |         isOpen: true,
212 |         mode: "history",
213 |         stepId: null,
214 |         historyId: historyItem.id,
215 |         text: historyItem.comment || "",
216 |       });
217 |     },
218 |     [],
219 |   );
220 | 
221 |   const handleAddCommentClick = useCallback(() => {
222 |     setCommentModal({
223 |       isOpen: true,
224 |       mode: "add_comment",
225 |       stepId: null,
226 |       historyId: null,
227 |       text: "",
228 |     });
229 |   }, []);
230 | 
231 |   const handleSaveComment = useCallback(
232 |     async (e: React.FormEvent) => {
233 |       e.preventDefault();
234 |       if (commentModal.mode === "pipeline") {
235 |         const activeStage = PIPELINE_STAGES[currentStageIndex];
236 |         const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
237 |         if (!nextStage || !currentEvent) return;
238 | 
239 |         await updateStatus.mutateAsync({
240 |           eventId: currentEvent.id,
241 |           status: nextStage.key,
242 |           actionName: `Етап пройдено: ${activeStage.name}`,
243 |           comment: commentModal.text,
244 |         });
245 |         if (nextStage.key === "RE_SALE") {
246 |           setExitingEventId(currentEvent.id);
247 |           setTimeout(() => {
248 |             setSelectedEventId(null);
249 |             setExitingEventId(null);
250 |           }, 500);
251 |         }
252 |       } else if (commentModal.mode === "add_comment") {
253 |         await addCommentMutation.mutateAsync({
254 |           eventId: currentEvent.id,
255 |           comment: commentModal.text,
256 |         });
257 |       } else if (commentModal.mode === "history" && commentModal.historyId) {
258 |         await updateHistoryMutation.mutateAsync({
259 |           historyId: commentModal.historyId,
260 |           comment: commentModal.text,
261 |           eventId: currentEvent.id,
262 |         });
263 |       }
264 |       setCommentModal({
265 |         isOpen: false,
266 |         mode: "pipeline",
267 |         stepId: null,
268 |         historyId: null,
269 |         text: "",
270 |       });
271 |     },
272 |     [
273 |       commentModal,
274 |       currentEvent,
275 |       currentStageIndex,
276 |       updateStatus,
277 |       addCommentMutation,
278 |       updateHistoryMutation,
279 |     ],
280 |   );
281 | 
282 |   const updateSchoolMutation = useUpdateSchool();
283 |   const createEventMutation = useCreateEvent();
284 | 
285 |   const handleSaveEvent = useCallback(
286 |     async (e: React.FormEvent) => {
287 |       e.preventDefault();
288 |       if (!schoolData.id) return;
289 | 
290 |       const payload = {
291 |         ...eventForm,
292 |         schoolId: schoolData.id,
293 |         cityId: schoolData.cityId,
294 |         childrenPlanned: Number(eventForm.childrenPlanned) || 0,
295 |         price: Number(eventForm.price) || 0,
296 |       };
297 | 
298 |       const newEvent = await createEventMutation.mutateAsync(payload);
299 | 
300 |       setIsEventModalOpen(false);
301 |       setSelectedEventId(newEvent.id);
302 |     },
303 |     [eventForm, schoolData, createEventMutation],
304 |   );
305 | 
306 |   const handleSaveSchoolInfo = useCallback(
307 |     async (e: React.FormEvent) => {
308 |       e.preventDefault();
309 |       if (!id) return;
310 | 
311 |       await updateSchoolMutation.mutateAsync({
312 |         ...editForm,
313 |         id, // передаємо id для PATCH
314 |       });
315 |       setIsEditModalOpen(false);
316 |     },
317 |     [editForm, id, updateSchoolMutation],
318 |   );
319 | 
320 |   const handleUpdatePreparation = useCallback(
321 |     async (field: string, status: string) => {
322 |       if (!currentEvent) return;
323 |       await updatePreparation.mutateAsync({
324 |         eventId: currentEvent.id,
325 |         field,
326 |         status,
327 |       });
328 |     },
329 |     [currentEvent, updatePreparation],
330 |   );
331 | 
332 |   const handleSubmitReport = useCallback(
333 |     async (reportData: ReportData) => {
334 |       if (!currentEvent) return;
335 |       await submitReportMutation.mutateAsync({
336 |         eventId: currentEvent.id,
337 |         reportData,
338 |       });
339 |       await updateStatus.mutateAsync({
340 |         eventId: currentEvent.id,
341 |         status: "RE_SALE",
342 |         actionName: "Звіт сформовано. Захід завершено.",
343 |       });
344 |       setExitingEventId(currentEvent.id);
345 |       setTimeout(() => {
346 |         setSelectedEventId(null);
347 |         setExitingEventId(null);
348 |       }, 500);
349 |       setIsReportModalOpen(false);
350 |     },
351 |     [currentEvent, submitReportMutation, updateStatus],
352 |   );
353 | 
354 |   const handleAssignCrew = useCallback(
355 |     async (crewId: string) => {
356 |       if (!currentEvent) return;
357 | 
358 |       await assignCrewMutation.mutateAsync({
359 |         eventId: currentEvent.id,
360 |         crewId,
361 |       });
362 | 
363 |       await updatePreparation.mutateAsync({
364 |         eventId: currentEvent.id,
365 |         field: "assignCrew",
366 |         status: "Виконано",
367 |       });
368 | 
369 |       setIsCrewModalOpen(false);
370 |     },
371 |     [currentEvent, assignCrewMutation, updatePreparation],
372 |   );
373 | 
374 |   const openAddEventModal = useCallback(() => {
375 |     setEventForm((prev) => ({
376 |       ...prev,
377 |       address: schoolData.address,
378 |       contactPerson: schoolData.director,
379 |       contactPhone: schoolData.phone,
380 |       childrenPlanned: String(schoolData.childrenCount),
381 |     }));
382 |     setIsEventModalOpen(true);
383 |   }, [schoolData]);
384 |   const stagger = (i: number) => ({
385 |     initial: { opacity: 0, y: 10 },
386 |     animate: { opacity: 1, y: 0 },
387 |     transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
388 |   });
389 | 
390 |   return (
391 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8">
392 |       <SchoolProfileHeader
393 |         schoolData={schoolData}
394 |         onEdit={() => {
395 |           setEditForm(schoolData);
396 |           setIsEditModalOpen(true);
397 |         }}
398 |         onAddEvent={openAddEventModal}
399 |       />
400 | 
401 |       <div className="flex flex-col xl:flex-row gap-6">
402 |         {/* Ліва колонка */}
403 |         <div className="w-full xl:w-80 flex flex-col gap-6">
404 |           <motion.div {...stagger(0)}>
405 |             <Suspense
406 |               fallback={
407 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
408 |               }
409 |             >
410 |               <SchoolInfoCard schoolData={schoolData} />
411 |             </Suspense>
412 |           </motion.div>
413 | 
414 |           <AnimatePresence>
415 |             {currentEvent && currentStageIndex >= 1 && (
416 |               <motion.div
417 |                 key="responsible"
418 |                 initial={{ opacity: 0, y: 8 }}
419 |                 animate={{ opacity: 1, y: 0 }}
420 |                 exit={{ opacity: 0, y: -8 }}
421 |                 transition={{ duration: 0.25 }}
422 |                 className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
423 |               >
424 |                 <h3 className="font-bold text-slate-800 mb-4">
425 |                   Відповідальна особа
426 |                 </h3>
427 |                 <ul className="space-y-2 text-sm">
428 |                   <li className="flex justify-between">
429 |                     <span className="text-slate-500">Остання дія:</span>
430 |                     <span className="font-medium text-blue-600">
431 |                       {creatorName}
432 |                     </span>
433 |                   </li>
434 |                 </ul>
435 |               </motion.div>
436 |             )}
437 |           </AnimatePresence>
438 | 
439 |           <motion.div {...stagger(1)}>
440 |             <Suspense
441 |               fallback={
442 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
443 |               }
444 |             >
445 |               <HistoryTimeline
446 |                 currentEvent={
447 |                   eventFullLoading ? currentEventBase : currentEvent
448 |                 }
449 |                 onHistoryClick={handleHistoryClick}
450 |                 onAddCommentClick={handleAddCommentClick}
451 |               />
452 |             </Suspense>
453 |           </motion.div>
454 |         </div>
455 | 
456 |         {/* Права колонка */}
457 |         <motion.div
458 |           className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
459 |             exitingEventId === currentEvent?.id
460 |               ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
461 |               : ""
462 |           }`}
463 |           initial={{ opacity: 0, y: 10 }}
464 |           animate={{ opacity: 1, y: 0 }}
465 |           transition={{ duration: 0.3, delay: 0.15 }}
466 |         >
467 |           {currentEvent && (
468 |             <Suspense
469 |               fallback={
470 |                 <div className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />
471 |               }
472 |             >
473 |               <Pipeline
474 |                 currentStageIndex={currentStageIndex}
475 |                 currentEvent={currentEvent}
476 |                 onPipelineClick={handlePipelineClick}
477 |                 stages={PIPELINE_STAGES}
478 |               />
479 |             </Suspense>
480 |           )}
481 | 
482 |           <AnimatePresence>
483 |             {currentEvent && currentStageIndex >= 4 && (
484 |               <motion.div
485 |                 key="preparation"
486 |                 initial={{ opacity: 0, y: 8 }}
487 |                 animate={{ opacity: 1, y: 0 }}
488 |                 exit={{ opacity: 0, y: -8 }}
489 |                 transition={{ duration: 0.25 }}
490 |                 className="grid grid-cols-1 xl:grid-cols-2 gap-6"
491 |               >
492 |                 {eventFullLoading ? (
493 |                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
494 |                 ) : (
495 |                   <Suspense
496 |                     fallback={
497 |                       <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
498 |                     }
499 |                   >
500 |                     <EventPreparation
501 |                       data={currentEvent.preparation || {}}
502 |                       onUpdate={handleUpdatePreparation}
503 |                       onOpenCrewModal={() => setIsCrewModalOpen(true)}
504 |                     />
505 |                   </Suspense>
506 |                 )}
507 |                 <Suspense
508 |                   fallback={
509 |                     <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
510 |                   }
511 |                 >
512 |                   <AssignedCrew currentEvent={currentEvent} employees={users} />
513 |                 </Suspense>
514 |               </motion.div>
515 |             )}
516 |           </AnimatePresence>
517 | 
518 |           <motion.div {...stagger(2)}>
519 |             <Suspense
520 |               fallback={
521 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
522 |               }
523 |             >
524 |               <EventDetails
525 |                 currentEvent={currentEvent}
526 |                 schoolName={schoolData.name}
527 |                 cityId={schoolData.cityId}
528 |                 onEventUpdated={() =>
529 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
530 |                 }
531 |               />
532 |             </Suspense>
533 |           </motion.div>
534 | 
535 |           <motion.div {...stagger(3)}>
536 |             <Suspense
537 |               fallback={
538 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
539 |               }
540 |             >
541 |               <EventsTable
542 |                 events={events}
543 |                 selectedEventId={selectedEventId}
544 |                 onEventSelect={setSelectedEventId}
545 |                 onDeleteSuccess={() =>
546 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
547 |                 }
548 |               />
549 |             </Suspense>
550 |             {completedEvents.length > 0 && (
551 |               <motion.div {...stagger(4)}>
552 |                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
553 |                   <div className="p-6 border-b border-slate-100 bg-slate-50/50">
554 |                     <h3 className="font-bold text-slate-800">
555 |                       Завершені події ({completedEvents.length})
556 |                     </h3>
557 |                   </div>
558 |                   <div className="md:hidden divide-y divide-slate-50">
559 |                     {completedEvents.map((ev: Event) => (
560 |                       <div
561 |                         key={ev.id}
562 |                         onClick={() => setSelectedReportEvent(ev)}
563 |                         className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
564 |                       >
565 |                         <div className="min-w-0">
566 |                           <p className="font-medium text-blue-600 truncate">
567 |                             {ev.project}
568 |                           </p>
569 |                           <p className="text-xs text-slate-400 mt-0.5">
570 |                             {new Date(ev.date).toLocaleDateString("uk-UA")}
571 |                           </p>
572 |                           <p className="text-xs text-slate-500 mt-1">
573 |                             👶{" "}
574 |                             {ev.report?.childrenCount ||
575 |                               ev.childrenPlanned ||
576 |                               "—"}{" "}
577 |                             дітей
578 |                           </p>
579 |                         </div>
580 |                         <div className="text-right shrink-0">
581 |                           <p className="font-semibold text-slate-800 text-sm">
582 |                             {new Intl.NumberFormat("uk-UA").format(
583 |                               ev.report?.totalSum || ev.price || 0,
584 |                             )}{" "}
585 |                             грн
586 |                           </p>
587 |                           <p className="text-xs font-medium text-emerald-600 mt-0.5">
588 |                             +
589 |                             {new Intl.NumberFormat("uk-UA").format(
590 |                               ev.report?.remainderSum || 0,
591 |                             )}{" "}
592 |                             грн
593 |                           </p>
594 |                         </div>
595 |                       </div>
596 |                     ))}
597 |                   </div>
598 |                   <div className="hidden md:block overflow-x-auto">
599 |                     <table className="w-full text-left text-sm">
600 |                       <thead>
601 |                         <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
602 |                           <th className="p-4">Проєкт</th>
603 |                           <th className="p-4">Дата</th>
604 |                           <th className="p-4">Дітей</th>
605 |                           <th className="p-4">Виручка</th>
606 |                           <th className="p-4">Прибуток</th>
607 |                         </tr>
608 |                       </thead>
609 |                       <tbody>
610 |                         {completedEvents.map((ev: any) => (
611 |                           <tr
612 |                             key={ev.id}
613 |                             onClick={() => setSelectedReportEvent(ev)}
614 |                             className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
615 |                           >
616 |                             <td className="p-4 text-slate-700 font-medium">
617 |                               {ev.project}
618 |                             </td>
619 |                             <td className="p-4 text-slate-600">
620 |                               {new Date(ev.date).toLocaleDateString("uk-UA")}
621 |                             </td>
622 |                             <td className="p-4 font-medium">
623 |                               {ev.report?.childrenCount ||
624 |                                 ev.childrenPlanned ||
625 |                                 "—"}
626 |                             </td>
627 |                             <td className="p-4 font-medium text-slate-800">
628 |                               {new Intl.NumberFormat("uk-UA").format(
629 |                                 ev.report?.totalSum || ev.price || 0,
630 |                               )}{" "}
631 |                               грн
632 |                             </td>
633 |                             <td className="p-4 font-medium text-emerald-600">
634 |                               {new Intl.NumberFormat("uk-UA").format(
635 |                                 ev.report?.remainderSum || 0,
636 |                               )}{" "}
637 |                               грн
638 |                             </td>
639 |                           </tr>
640 |                         ))}
641 |                       </tbody>
642 |                     </table>
643 |                   </div>
644 |                 </div>
645 |               </motion.div>
646 |             )}
647 |           </motion.div>
648 |         </motion.div>
649 |       </div>
650 | 
651 |       {/* Мобільна FAB */}
652 |       <button
653 |         onClick={openAddEventModal}
654 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
655 |       >
656 |         +
657 |       </button>
658 | 
659 |       {/* Модальні вікна */}
660 |       <EditSchoolModal
661 |         isOpen={isEditModalOpen}
662 |         onClose={() => setIsEditModalOpen(false)}
663 |         editForm={editForm}
664 |         setEditForm={setEditForm}
665 |         onSave={handleSaveSchoolInfo}
666 |       />
667 |       <EventModal
668 |         isOpen={isEventModalOpen}
669 |         onClose={() => setIsEventModalOpen(false)}
670 |         eventForm={eventForm}
671 |         setEventForm={setEventForm}
672 |         onSave={handleSaveEvent}
673 |       />
674 |       <CommentModal
675 |         isOpen={commentModal.isOpen}
676 |         onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
677 |         mode={commentModal.mode}
678 |         text={commentModal.text}
679 |         setText={(t) => setCommentModal({ ...commentModal, text: t })}
680 |         onSave={handleSaveComment}
681 |       />
682 |       <CrewModal
683 |         isOpen={isCrewModalOpen}
684 |         onClose={() => setIsCrewModalOpen(false)}
685 |         city={schoolData.city}
686 |         employees={users}
687 |         onSave={handleAssignCrew}
688 |       />
689 |       <ReportModal
690 |         isOpen={isReportModalOpen}
691 |         onClose={() => setIsReportModalOpen(false)}
692 |         onSave={handleSubmitReport}
693 |         schoolName={schoolData.name}
694 |         eventType={currentEvent?.project}
695 |         eventDate={currentEvent?.date}
696 |         eventIndex={
697 |           events
698 |             .filter((e) => e.schoolId === schoolData.id)
699 |             .findIndex((e) => e.id === currentEvent?.id) + 1
700 |         }
701 |         crew={
702 |           currentEvent?.crew
703 |             ? {
704 |                 host: currentEvent.crew.hostId
705 |                   ? (users.find(
706 |                       (u: User) => u.id === currentEvent.crew.hostId,
707 |                     ) ?? null)
708 |                   : (currentEvent.crew.host ?? null),
709 |                 driver: currentEvent.crew.driverId
710 |                   ? (users.find(
711 |                       (u: User) => u.id === currentEvent.crew.driverId,
712 |                     ) ?? null)
713 |                   : (currentEvent.crew.driver ?? null),
714 |               }
715 |             : undefined
716 |         }
717 |       />
718 |       <CompletedEventModal
719 |         isOpen={!!selectedReportEvent}
720 |         onClose={() => setSelectedReportEvent(null)}
721 |         event={selectedReportEvent}
722 |       />
723 |     </div>
724 |   );
725 | }
726 | 
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
 43 |   const [userRole] = useState<string | null>(() => {
 44 |     try {
 45 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
 46 |     } catch {
 47 |       return null;
 48 |     }
 49 |   });
 50 |   const qc = useQueryClient();
 51 |   const [form, setForm] = useState({
 52 |     name: "",
 53 |     cityId: "",
 54 |     sourceUrl: "",
 55 |     director: "",
 56 |     phone: "",
 57 |   });
 58 |   const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
 59 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 60 |   const [sizeFilter, setSizeFilter] = useState<string | null>(null);
 61 |   const [suggestions, setSuggestions] = useState<
 62 |     { name: string; url: string }[]
 63 |   >([]);
 64 |   const [showSuggestions, setShowSuggestions] = useState(false);
 65 |   const [isSearching, setIsSearching] = useState(false);
 66 |   const [dotCount, setDotCount] = useState(3);
 67 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 68 | 
 69 |   const addSchoolMutation = useMutation({
 70 |     mutationFn: (newSchool: any) =>
 71 |       api.post("/schools", newSchool, {
 72 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 73 |       }),
 74 |     onSuccess: () => {
 75 |       qc.invalidateQueries({ queryKey: ["schools"] });
 76 |       setIsModalOpen(false);
 77 |     },
 78 |     onError: () => alert("Не вдалося створити заклад"),
 79 |   });
 80 | 
 81 |   const bulkImportMutation = useMutation({
 82 |     mutationFn: (cityId: string) =>
 83 |       api.post(
 84 |         "/schools/bulk-import",
 85 |         { cityId, type: "Школа" },
 86 |         {
 87 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 88 |           timeout: 120000,
 89 |         },
 90 |       ),
 91 |     onSuccess: (res) => {
 92 |       alert(
 93 |         `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
 94 |       );
 95 |       qc.invalidateQueries({ queryKey: ["schools"] });
 96 |     },
 97 |     onError: () => alert("Помилка імпорту."),
 98 |   });
 99 | 
100 |   const { data: schools = [], isLoading } = useSchools();
101 |   const { data: cities = [] } = useCities();
102 |   const deleteSchool = useDeleteSchool();
103 |   const prefetchSchool = usePrefetchSchool();
104 | 
105 |   const handleOpenModal = useCallback(() => {
106 |     setForm({
107 |       name: "",
108 |       cityId: selectedCity.id || cities[0]?.id || "",
109 |       sourceUrl: "",
110 |       director: "",
111 |       phone: "",
112 |     });
113 |     setMatchedContacts([]);
114 |     setIsModalOpen(true);
115 |   }, [selectedCity.id, cities]);
116 | 
117 |   const fetchContacts = async (schoolName: string) => {
118 |     if (!schoolName || schoolName.trim().length < 1)
119 |       return setMatchedContacts([]);
120 |     const currentCityName =
121 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
122 |     if (currentCityName.toLowerCase() !== "львів")
123 |       return setMatchedContacts([]);
124 |     try {
125 |       const data = await qc.fetchQuery({
126 |         queryKey: ["schoolContacts", schoolName, currentCityName],
127 |         queryFn: async () => {
128 |           const res = await api.get(
129 |             `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
130 |             {
131 |               headers: {
132 |                 Authorization: `Bearer ${localStorage.getItem("token")}`,
133 |               },
134 |             },
135 |           );
136 |           return res.data;
137 |         },
138 |         staleTime: 1000 * 60 * 5, // Кешуємо на 5 хвилин
139 |       });
140 | 
141 |       setMatchedContacts(data);
142 |       if (data.length > 0) {
143 |         const director =
144 |           data.find(
145 |             (c: any) =>
146 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
147 |           ) || data[0];
148 |         setForm((f) => ({
149 |           ...f,
150 |           director: director.contactName,
151 |           phone: director.phone,
152 |         }));
153 |       }
154 |     } catch (e) {
155 |       console.error(e);
156 |     }
157 |   };
158 | 
159 |   const handleNameChange = (value: string) => {
160 |     setForm({ ...form, name: value });
161 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
162 |     if (value.length < 2) {
163 |       setShowSuggestions(false);
164 |       setIsSearching(false);
165 |       setMatchedContacts([]);
166 |       return;
167 |     }
168 |     setIsSearching(true);
169 |     setShowSuggestions(true);
170 |     debounceTimer.current = setTimeout(async () => {
171 |       try {
172 |         const [externalData] = await Promise.all([
173 |           qc.fetchQuery({
174 |             queryKey: ["schoolSearchExternal", value],
175 |             queryFn: async () => {
176 |               const res = await api.get(
177 |                 `/schools/search?q=${encodeURIComponent(value)}&type=Школа`,
178 |                 {
179 |                   headers: {
180 |                     Authorization: `Bearer ${localStorage.getItem("token")}`,
181 |                   },
182 |                 },
183 |               );
184 |               return res.data;
185 |             },
186 |             staleTime: 1000 * 60 * 5,
187 |           }),
188 |           fetchContacts(value),
189 |         ]);
190 |         setSuggestions(externalData);
191 |       } catch (e) {
192 |         console.error(e);
193 |       } finally {
194 |         setIsSearching(false);
195 |       }
196 |     }, 400);
197 |   };
198 | 
199 |   const handleSelectSuggestion = (name: string, url: string) => {
200 |     setForm({ ...form, name, sourceUrl: url });
201 |     setShowSuggestions(false);
202 |     fetchContacts(name);
203 |   };
204 | 
205 |   const handleAddSchool = (e: React.FormEvent) => {
206 |     e.preventDefault();
207 |     if (!form.name.trim() || !form.cityId) return;
208 |     addSchoolMutation.mutate({ ...form, type: "Школа" });
209 |   };
210 | 
211 |   const handleDeleteSchool = useCallback(
212 |     async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
213 |       e.stopPropagation();
214 |       if (userRole !== "SUPERADMIN") return;
215 |       if (
216 |         !window.confirm(
217 |           `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
218 |         )
219 |       )
220 |         return;
221 |       await deleteSchool.mutateAsync(schoolId);
222 |     },
223 |     [deleteSchool, userRole],
224 |   );
225 | 
226 |   const debouncedSearch = useMemo(() => searchQuery, [searchQuery]);
227 | 
228 |   const baseFiltered = useMemo(
229 |     () =>
230 |       schools.filter((s) => {
231 |         const isCityMatch = selectedCity.id
232 |           ? s.cityId === selectedCity.id
233 |           : true;
234 |         const isFilterMatch = activeFilter
235 |           ? classifySchool(s) === activeFilter
236 |           : true;
237 |         const isSizeMatch = sizeFilter
238 |           ? classifySize(s, "Школа") === sizeFilter
239 |           : true;
240 |         return (
241 |           isCityMatch && s.type === "Школа" && isFilterMatch && isSizeMatch
242 |         );
243 |       }),
244 |     [schools, selectedCity.id, activeFilter, sizeFilter],
245 |   );
246 | 
247 |   const filteredSchools = useMemo(() => {
248 |     if (!debouncedSearch.trim()) return baseFiltered;
249 |     const q = debouncedSearch.toLowerCase().trim();
250 |     return baseFiltered.filter(
251 |       (s) =>
252 |         s.name?.toLowerCase().includes(q) ||
253 |         s.city?.name?.toLowerCase().includes(q) ||
254 |         s.director?.toLowerCase().includes(q) ||
255 |         s.address?.toLowerCase().includes(q),
256 |     );
257 |   }, [baseFiltered, debouncedSearch]);
258 | 
259 |   return (
260 |     <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
261 |       {/* Шапка */}
262 |       <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
263 |         <div className="min-w-0">
264 |           <h1 className="text-xl font-bold text-slate-800 leading-tight">
265 |             Школи
266 |             {selectedCity.id && (
267 |               <span className="ml-2 text-sm font-normal text-blue-500">
268 |                 · {selectedCity.name}
269 |               </span>
270 |             )}
271 |           </h1>
272 |         </div>
273 |         <div className="flex gap-2 shrink-0">
274 |           {userRole === "SUPERADMIN" && (
275 |             <button
276 |               onClick={() => {
277 |                 if (!selectedCity.id) return alert("Спочатку оберіть місто");
278 |                 if (
279 |                   !window.confirm(
280 |                     `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
281 |                   )
282 |                 )
283 |                   return;
284 | 
285 |                 setDotCount(3);
286 |                 const dotInterval = setInterval(() => {
287 |                   setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
288 |                 }, 500);
289 | 
290 |                 bulkImportMutation.mutate(selectedCity.id, {
291 |                   onSettled: () => clearInterval(dotInterval),
292 |                 });
293 |               }}
294 |               disabled={bulkImportMutation.isPending}
295 |               className="md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
296 |             >
297 |               {bulkImportMutation.isPending ? (
298 |                 <span className="font-medium">
299 |                   Імпортую{"·".repeat(dotCount)}
300 |                 </span>
301 |               ) : (
302 |                 <>📥 Імпорт з isuo</>
303 |               )}
304 |             </button>
305 |           )}
306 |           <button
307 |             onClick={handleOpenModal}
308 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
309 |           >
310 |             + Додати
311 |           </button>
312 |         </div>
313 |       </div>
314 | 
315 |       {/* StatsBar */}
316 |       <div className="shrink-0">
317 |         <Suspense
318 |           fallback={
319 |             <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
320 |           }
321 |         >
322 |           <StatsBar
323 |             schools={schools.filter(
324 |               (s) =>
325 |                 (selectedCity.id ? s.cityId === selectedCity.id : true) &&
326 |                 s.type === "Школа",
327 |             )}
328 |             activeFilter={activeFilter}
329 |             onFilterChange={setActiveFilter}
330 |             sizeFilter={sizeFilter}
331 |             onSizeFilterChange={setSizeFilter}
332 |             schoolType="Школа"
333 |           />
334 |         </Suspense>
335 |       </div>
336 | 
337 |       {/* Пошук */}
338 |       <div className="relative shrink-0 mb-4 mt-2">
339 |         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
340 |           <svg
341 |             className="w-5 h-5 text-slate-400"
342 |             fill="none"
343 |             stroke="currentColor"
344 |             viewBox="0 0 24 24"
345 |           >
346 |             <path
347 |               strokeLinecap="round"
348 |               strokeLinejoin="round"
349 |               strokeWidth={2}
350 |               d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
351 |             />
352 |           </svg>
353 |         </div>
354 |         <input
355 |           type="text"
356 |           value={searchQuery}
357 |           onChange={(e) => setSearchQuery(e.target.value)}
358 |           placeholder="Пошук за назвою, директором, адресою..."
359 |           className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
360 |         />
361 |         {searchQuery && (
362 |           <button
363 |             onClick={() => setSearchQuery("")}
364 |             className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
365 |           >
366 |             <svg
367 |               className="w-5 h-5"
368 |               fill="none"
369 |               stroke="currentColor"
370 |               viewBox="0 0 24 24"
371 |             >
372 |               <path
373 |                 strokeLinecap="round"
374 |                 strokeLinejoin="round"
375 |                 strokeWidth={2}
376 |                 d="M6 18L18 6M6 6l12 12"
377 |               />
378 |             </svg>
379 |           </button>
380 |         )}
381 |       </div>
382 | 
383 |       {/* Лічильник */}
384 |       <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
385 |         {filteredSchools.length === baseFiltered.length
386 |           ? `${baseFiltered.length} шкіл`
387 |           : `${filteredSchools.length} з ${baseFiltered.length} шкіл`}
388 |         {(activeFilter || sizeFilter) && (
389 |           <button
390 |             onClick={() => {
391 |               setActiveFilter(null);
392 |               setSizeFilter(null);
393 |             }}
394 |             className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
395 |           >
396 |             скинути фільтри
397 |           </button>
398 |         )}
399 |       </p>
400 | 
401 |       {/* Компоненти списків */}
402 |       {isLoading ? (
403 |         <div className="flex flex-col gap-2.5 flex-1">
404 |           {Array.from({ length: 8 }).map((_, i) => (
405 |             <div
406 |               key={i}
407 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
408 |               style={{ opacity: 1 - i * 0.1 }}
409 |             >
410 |               <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
411 |               <div className="flex justify-between">
412 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
413 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
414 |               </div>
415 |             </div>
416 |           ))}
417 |         </div>
418 |       ) : (
419 |         <>
420 |           {/* Мобільний: віртуалізований список карток */}
421 |           <div className="md:hidden flex-1 w-full overflow-hidden">
422 |             <VirtualSchoolList
423 |               schools={filteredSchools}
424 |               itemHeight={110}
425 |               renderItem={(school, index) => (
426 |                 <div
427 |                   className="pb-2.5"
428 |                   onMouseEnter={() => prefetchSchool(school.id)}
429 |                 >
430 |                   <SchoolCard
431 |                     school={school}
432 |                     index={index}
433 |                     onDelete={handleDeleteSchool}
434 |                     stages={PIPELINE_STAGES}
435 |                   />
436 |                 </div>
437 |               )}
438 |             />
439 |           </div>
440 | 
441 |           {/* Десктоп: таблиця з віртуалізованим tbody */}
442 |           <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
443 |             <Suspense
444 |               fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
445 |             >
446 |               <VirtualDesktopTable
447 |                 schools={filteredSchools}
448 |                 searchQuery={searchQuery}
449 |                 onDelete={handleDeleteSchool}
450 |                 stages={PIPELINE_STAGES}
451 |               />
452 |             </Suspense>
453 |           </div>
454 |         </>
455 |       )}
456 | 
457 |       {/* Мобільна плаваюча кнопка FAB */}
458 |       <button
459 |         onClick={handleOpenModal}
460 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
461 |       >
462 |         +
463 |       </button>
464 | 
465 |       {/* Модальне вікно */}
466 |       {isModalOpen && (
467 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
468 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
469 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
470 |               <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
471 |               <button
472 |                 onClick={() => setIsModalOpen(false)}
473 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
474 |               >
475 |                 ✕
476 |               </button>
477 |             </div>
478 | 
479 |             <form
480 |               onSubmit={handleAddSchool}
481 |               className="p-6 flex flex-col gap-4 overflow-y-auto"
482 |             >
483 |               <div className="relative">
484 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
485 |                   Назва школи
486 |                 </label>
487 |                 <input
488 |                   type="text"
489 |                   value={form.name}
490 |                   onChange={(e) => handleNameChange(e.target.value)}
491 |                   onBlur={() =>
492 |                     setTimeout(() => setShowSuggestions(false), 150)
493 |                   }
494 |                   placeholder="Наприклад: Школа №1"
495 |                   required
496 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
497 |                 />
498 |                 {showSuggestions && (
499 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
500 |                     {isSearching ? (
501 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
502 |                         Пошук...
503 |                       </li>
504 |                     ) : suggestions.length > 0 ? (
505 |                       suggestions.map((s, i) => (
506 |                         <li
507 |                           key={i}
508 |                           onMouseDown={() =>
509 |                             handleSelectSuggestion(s.name, s.url)
510 |                           }
511 |                           className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
512 |                         >
513 |                           {s.name}
514 |                         </li>
515 |                       ))
516 |                     ) : (
517 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
518 |                         Нічого не знайдено
519 |                       </li>
520 |                     )}
521 |                   </ul>
522 |                 )}
523 |               </div>
524 | 
525 |               {!selectedCity.id && (
526 |                 <div>
527 |                   <label className="block text-sm font-medium text-slate-600 mb-1.5">
528 |                     Місто
529 |                   </label>
530 |                   <select
531 |                     value={form.cityId}
532 |                     onChange={(e) =>
533 |                       setForm({ ...form, cityId: e.target.value })
534 |                     }
535 |                     required
536 |                     className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
537 |                   >
538 |                     <option value="">— Оберіть місто —</option>
539 |                     {cities.map((c) => (
540 |                       <option key={c.id} value={c.id}>
541 |                         {c.name}
542 |                       </option>
543 |                     ))}
544 |                   </select>
545 |                 </div>
546 |               )}
547 | 
548 |               <div>
549 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
550 |                   Контакт{" "}
551 |                   <span className="ml-1 text-xs font-normal text-slate-400">
552 |                     (автозаповнення)
553 |                   </span>
554 |                 </label>
555 |                 {matchedContacts.length > 0 && (
556 |                   <div className="flex flex-wrap gap-1.5 mb-3">
557 |                     {matchedContacts.map((c, i) => (
558 |                       <button
559 |                         key={i}
560 |                         type="button"
561 |                         onClick={() =>
562 |                           setForm((f) => ({
563 |                             ...f,
564 |                             director: c.contactName,
565 |                             phone: c.phone,
566 |                           }))
567 |                         }
568 |                         className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
569 |                       >
570 |                         {c.role ? `${c.role}: ` : ""}
571 |                         {c.contactName}
572 |                       </button>
573 |                     ))}
574 |                   </div>
575 |                 )}
576 |                 <input
577 |                   type="text"
578 |                   value={form.director}
579 |                   onChange={(e) =>
580 |                     setForm({ ...form, director: e.target.value })
581 |                   }
582 |                   placeholder="Микола Петренко"
583 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
584 |                 />
585 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
586 |                   Телефон
587 |                 </label>
588 |                 <input
589 |                   type="text"
590 |                   value={form.phone}
591 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
592 |                   placeholder="0671234567"
593 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
594 |                 />
595 |               </div>
596 | 
597 |               <div className="flex gap-3 mt-4">
598 |                 <button
599 |                   type="button"
600 |                   onClick={() => setIsModalOpen(false)}
601 |                   className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
602 |                 >
603 |                   Скасувати
604 |                 </button>
605 |                 <button
606 |                   type="submit"
607 |                   disabled={addSchoolMutation.isPending}
608 |                   className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
609 |                 >
610 |                   {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
611 |                 </button>
612 |               </div>
613 |             </form>
614 |           </div>
615 |         </div>
616 |       )}
617 |     </div>
618 |   );
619 | }
620 | 
```

### File: apps/frontend/src/tests/component/EventsTable.test.tsx
```tsx
  0 | import { describe, it, expect, vi, beforeEach } from "vitest";
  1 | import { render, screen, fireEvent } from "@testing-library/react";
  2 | import { MemoryRouter } from "react-router-dom";
  3 | 
  4 | vi.mock("axios", () => ({
  5 |   default: { delete: vi.fn().mockResolvedValue({}) },
  6 | }));
  7 | 
  8 | import EventsTable from "../../components/school-profile/EventsTable";
  9 | 
 10 | const mockEvents = [
 11 |   {
 12 |     id: "ev-1",
 13 |     project: "Голограма",
 14 |     date: "2026-07-01T10:00:00Z",
 15 |     price: 5000,
 16 |     status: "BASE",
 17 |   },
 18 |   {
 19 |     id: "ev-2",
 20 |     project: "Малювайко",
 21 |     date: "2026-08-01T10:00:00Z",
 22 |     price: 3000,
 23 |     status: "FIRST_CONTACT",
 24 |   },
 25 | ];
 26 | 
 27 | describe("EventsTable", () => {
 28 |   const onEventSelect = vi.fn();
 29 |   const onDeleteSuccess = vi.fn();
 30 | 
 31 |   beforeEach(() => {
 32 |     vi.clearAllMocks();
 33 |     window.confirm = vi.fn(() => true);
 34 |   });
 35 | 
 36 |   it("відображає всі події", () => {
 37 |     render(
 38 |       <MemoryRouter>
 39 |         <EventsTable
 40 |           events={mockEvents}
 41 |           selectedEventId={null}
 42 |           onEventSelect={onEventSelect}
 43 |           onDeleteSuccess={onDeleteSuccess}
 44 |         />
 45 |       </MemoryRouter>,
 46 |     );
 47 |     expect(screen.getAllByText("Голограма")).toHaveLength(1);
 48 |     expect(screen.getAllByText("Малювайко")).toHaveLength(1);
 49 |   });
 50 | 
 51 |   it("показує кількість подій у заголовку", () => {
 52 |     render(
 53 |       <MemoryRouter>
 54 |         <EventsTable
 55 |           events={mockEvents}
 56 |           selectedEventId={null}
 57 |           onEventSelect={onEventSelect}
 58 |           onDeleteSuccess={onDeleteSuccess}
 59 |         />
 60 |       </MemoryRouter>,
 61 |     );
 62 |     expect(screen.getByText("Всі події (2)")).toBeInTheDocument();
 63 |   });
 64 | 
 65 |   it("не рендериться якщо events порожній", () => {
 66 |     const { container } = render(
 67 |       <MemoryRouter>
 68 |         <EventsTable
 69 |           events={[]}
 70 |           selectedEventId={null}
 71 |           onEventSelect={onEventSelect}
 72 |           onDeleteSuccess={onDeleteSuccess}
 73 |         />
 74 |       </MemoryRouter>,
 75 |     );
 76 |     expect(container.firstChild).toBeNull();
 77 |   });
 78 | 
 79 |   it("викликає onEventSelect при кліку на подію", () => {
 80 |     render(
 81 |       <MemoryRouter>
 82 |         <EventsTable
 83 |           events={mockEvents}
 84 |           selectedEventId={null}
 85 |           onEventSelect={onEventSelect}
 86 |           onDeleteSuccess={onDeleteSuccess}
 87 |         />
 88 |       </MemoryRouter>,
 89 |     );
 90 |     fireEvent.click(screen.getAllByText("Голограма")[0]);
 91 |     expect(onEventSelect).toHaveBeenCalledWith("ev-1");
 92 |   });
 93 | 
 94 |   it("показує підтвердження перед видаленням", () => {
 95 |     render(
 96 |       <MemoryRouter>
 97 |         <EventsTable
 98 |           events={mockEvents}
 99 |           selectedEventId={null}
100 |           onEventSelect={onEventSelect}
101 |           onDeleteSuccess={onDeleteSuccess}
102 |         />
103 |       </MemoryRouter>,
104 |     );
105 |     const deleteButtons = screen.getAllByText("🗑");
106 |     fireEvent.click(deleteButtons[0]);
107 |     expect(window.confirm).toHaveBeenCalledWith("Видалити цю подію?");
108 |   });
109 | 
110 |   it("не видаляє якщо confirm повернув false", async () => {
111 |     window.confirm = vi.fn(() => false);
112 |     const axios = await import("axios");
113 |     render(
114 |       <MemoryRouter>
115 |         <EventsTable
116 |           events={mockEvents}
117 |           selectedEventId={null}
118 |           onEventSelect={onEventSelect}
119 |           onDeleteSuccess={onDeleteSuccess}
120 |         />
121 |       </MemoryRouter>,
122 |     );
123 |     const deleteButtons = screen.getAllByText("🗑");
124 |     fireEvent.click(deleteButtons[0]);
125 |     expect(axios.default.delete).not.toHaveBeenCalled();
126 |   });
127 | 
128 |   it("виділяє вибрану подію", () => {
129 |     const { container } = render(
130 |       <MemoryRouter>
131 |         <EventsTable
132 |           events={mockEvents}
133 |           selectedEventId="ev-1"
134 |           onEventSelect={onEventSelect}
135 |           onDeleteSuccess={onDeleteSuccess}
136 |         />
137 |       </MemoryRouter>,
138 |     );
139 |     const selected = container.querySelector(".bg-blue-50\\/50");
140 |     expect(selected).toBeInTheDocument();
141 |   });
142 | });
143 | 
```

### File: apps/frontend/src/tests/component/Pipeline.test.tsx
```tsx
  0 | import { describe, it, expect, vi } from "vitest";
  1 | import { render, screen, fireEvent } from "@testing-library/react";
  2 | import Pipeline from "../../components/school-profile/Pipeline";
  3 | 
  4 | const STAGES = [
  5 |   { id: 1, key: "BASE", name: "Новий заклад" },
  6 |   { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
  7 |   { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  8 | ];
  9 | 
 10 | describe("Pipeline", () => {
 11 |   it("відображає всі етапи", () => {
 12 |     render(
 13 |       <Pipeline
 14 |         currentStageIndex={0}
 15 |         currentEvent={{ id: "e1", status: "BASE" }}
 16 |         onPipelineClick={vi.fn()}
 17 |         stages={STAGES}
 18 |       />,
 19 |     );
 20 |     expect(screen.getByText("Новий заклад")).toBeInTheDocument();
 21 |     expect(screen.getByText("Знайомство")).toBeInTheDocument();
 22 |   });
 23 | 
 24 |   it("викликає onPipelineClick для наступного етапу", () => {
 25 |     const onClick = vi.fn();
 26 |     render(
 27 |       <Pipeline
 28 |         currentStageIndex={0}
 29 |         currentEvent={{ id: "e1", status: "BASE" }}
 30 |         onPipelineClick={onClick}
 31 |         stages={STAGES}
 32 |       />,
 33 |     );
 34 |     fireEvent.click(screen.getByText("2"));
 35 |     expect(onClick).toHaveBeenCalledWith(2);
 36 |   });
 37 | 
 38 |   it("не викликає onClick для недоступного етапу", () => {
 39 |     const onClick = vi.fn();
 40 |     render(
 41 |       <Pipeline
 42 |         currentStageIndex={0}
 43 |         currentEvent={{ id: "e1", status: "BASE" }}
 44 |         onPipelineClick={onClick}
 45 |         stages={STAGES}
 46 |       />,
 47 |     );
 48 |     fireEvent.click(screen.getByText("3"));
 49 |     expect(onClick).not.toHaveBeenCalled();
 50 |   });
 51 | });
 52 | 
```

### File: apps/frontend/src/tests/component/SchoolCard.test.tsx
```tsx
  0 | import { describe, it, expect, vi } from "vitest";
  1 | import { render, screen, fireEvent } from "@testing-library/react";
  2 | import { MemoryRouter } from "react-router-dom";
  3 | import { SchoolCard } from "../../components/schools/SchoolMobileList";
  4 | 
  5 | const STAGES = [
  6 |   { key: "BASE", name: "Новий заклад" },
  7 |   { key: "FIRST_CONTACT", name: "Знайомство" },
  8 | ];
  9 | 
 10 | const mockSchool = {
 11 |   id: "school-1",
 12 |   name: "Школа №1",
 13 |   director: "Іван Петренко",
 14 |   phone: "0671234567",
 15 |   events: [{ status: "BASE" }],
 16 | };
 17 | 
 18 | describe("SchoolCard", () => {
 19 |   it("відображає назву школи", () => {
 20 |     render(
 21 |       <MemoryRouter>
 22 |         <SchoolCard
 23 |           school={mockSchool}
 24 |           onDelete={vi.fn()}
 25 |           stages={STAGES}
 26 |           index={0}
 27 |         />
 28 |       </MemoryRouter>,
 29 |     );
 30 |     expect(screen.getByText("Школа №1")).toBeInTheDocument();
 31 |   });
 32 | 
 33 |   it("відображає директора", () => {
 34 |     render(
 35 |       <MemoryRouter>
 36 |         <SchoolCard
 37 |           school={mockSchool}
 38 |           onDelete={vi.fn()}
 39 |           stages={STAGES}
 40 |           index={0}
 41 |         />
 42 |       </MemoryRouter>,
 43 |     );
 44 |     expect(screen.getByText(/Іван Петренко/)).toBeInTheDocument();
 45 |   });
 46 | 
 47 |   it("відображає поточний етап", () => {
 48 |     render(
 49 |       <MemoryRouter>
 50 |         <SchoolCard
 51 |           school={mockSchool}
 52 |           onDelete={vi.fn()}
 53 |           stages={STAGES}
 54 |           index={0}
 55 |         />
 56 |       </MemoryRouter>,
 57 |     );
 58 |     expect(screen.getByText("Новий заклад")).toBeInTheDocument();
 59 |   });
 60 | 
 61 |   it("викликає onDelete при натисканні", () => {
 62 |     const onDelete = vi.fn();
 63 |     render(
 64 |       <MemoryRouter>
 65 |         <SchoolCard
 66 |           school={mockSchool}
 67 |           onDelete={onDelete}
 68 |           stages={STAGES}
 69 |           index={0}
 70 |         />
 71 |       </MemoryRouter>,
 72 |     );
 73 |     fireEvent.click(screen.getByText("🗑"));
 74 |     expect(onDelete).toHaveBeenCalledWith(
 75 |       expect.any(Object),
 76 |       "school-1",
 77 |       "Школа №1",
 78 |     );
 79 |   });
 80 | 
 81 |   it("не показує етап якщо подій немає", () => {
 82 |     render(
 83 |       <MemoryRouter>
 84 |         <SchoolCard
 85 |           school={{ ...mockSchool, events: [] }}
 86 |           onDelete={vi.fn()}
 87 |           stages={STAGES}
 88 |           index={0}
 89 |         />
 90 |       </MemoryRouter>,
 91 |     );
 92 |     expect(screen.queryByText("Новий заклад")).not.toBeInTheDocument();
 93 |   });
 94 | 
 95 |   it("показує телефон якщо є", () => {
 96 |     render(
 97 |       <MemoryRouter>
 98 |         <SchoolCard
 99 |           school={mockSchool}
100 |           onDelete={vi.fn()}
101 |           stages={STAGES}
102 |           index={0}
103 |         />
104 |       </MemoryRouter>,
105 |     );
106 |     expect(screen.getByText(/0671234567/)).toBeInTheDocument();
107 |   });
108 | });
109 | 
```

### File: apps/frontend/src/tests/mocks/handlers.ts
```ts
  0 | import { http, HttpResponse } from "msw";
  1 | 
  2 | const BASE = "";
  3 | 
  4 | export const handlers = [
  5 |   // Cities
  6 |   http.get(`${BASE}/cities`, () =>
  7 |     HttpResponse.json([
  8 |       { id: "city-1", name: "Львів", plannedEvents: 3, completedEvents: 10, schoolsCount: 50 },
  9 |       { id: "city-2", name: "Київ", plannedEvents: 1, completedEvents: 5, schoolsCount: 30 },
 10 |     ])
 11 |   ),
 12 | 
 13 |   // Schools
 14 |   http.get(`${BASE}/schools`, () =>
 15 |     HttpResponse.json([
 16 |       { id: "school-1", name: "Школа №1", type: "Школа", cityId: "city-1", childrenCount: 300, events: [] },
 17 |       { id: "school-2", name: "Школа №5", type: "Школа", cityId: "city-1", childrenCount: 100, events: [] },
 18 |     ])
 19 |   ),
 20 | 
 21 |   http.get(`${BASE}/schools/:id`, ({ params }) =>
 22 |     HttpResponse.json({
 23 |       id: params.id,
 24 |       name: "Школа №1",
 25 |       type: "Школа",
 26 |       cityId: "city-1",
 27 |       city: { id: "city-1", name: "Львів" },
 28 |       director: "Іван Петренко",
 29 |       phone: "0671234567",
 30 |       address: "вул. Тестова 1",
 31 |       childrenCount: 300,
 32 |     })
 33 |   ),
 34 | 
 35 |   // Events
 36 |   http.get(`${BASE}/events/school/:schoolId`, () =>
 37 |     HttpResponse.json([
 38 |       {
 39 |         id: "event-1",
 40 |         project: "Голограма для школи",
 41 |         date: "2026-07-01T10:00:00Z",
 42 |         time: "10:00",
 43 |         status: "BASE",
 44 |         price: 5000,
 45 |         childrenPlanned: 100,
 46 |         address: "вул. Тестова 1",
 47 |         contactPerson: "Іван",
 48 |         contactPhone: "0671234567",
 49 |       },
 50 |     ])
 51 |   ),
 52 | 
 53 |   // Users
 54 |   http.get(`${BASE}/users`, () =>
 55 |     HttpResponse.json([
 56 |       { id: "user-1", name: "Адміністратор", email: "admin@crm.com", role: "SUPERADMIN" },
 57 |     ])
 58 |   ),
 59 | 
 60 |   // Dashboard
 61 |   http.get(`${BASE}/dashboard/summary`, () =>
 62 |     HttpResponse.json({
 63 |       todayEvents: [],
 64 |       upcomingEvents: [],
 65 |       funnel: { BASE: 10, FIRST_CONTACT: 5 },
 66 |       totalSchools: 50,
 67 |       monthlyKpi: { revenue: 50000, profit: 20000, children: 500, count: 10 },
 68 |       staleSchools: [],
 69 |       activityFeed: [],
 70 |       citiesStats: [],
 71 |     })
 72 |   ),
 73 | 
 74 |   // Auth
 75 |   http.post(`${BASE}/auth/login`, () =>
 76 |     HttpResponse.json({ access_token: "test-token" })
 77 |   ),
 78 | ];
```

### File: apps/frontend/src/tests/mocks/server.ts
```ts
  0 | import { setupServer } from "msw/node";
  1 | import { handlers } from "./handlers";
  2 | 
  3 | export const server = setupServer(...handlers);
```

### File: apps/frontend/src/tests/setup.ts
```ts
  0 | import "@testing-library/jest-dom";
  1 | import { afterEach, beforeAll, afterAll } from "vitest";
  2 | import { cleanup } from "@testing-library/react";
  3 | import { server } from "./mocks/server";
  4 | 
  5 | beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  6 | afterEach(() => {
  7 |   cleanup();
  8 |   server.resetHandlers();
  9 | });
 10 | afterAll(() => server.close());
```

### File: apps/frontend/src/tests/unit/hooks/useSchools.test.ts
```ts
  0 | import { describe, it, expect, vi } from "vitest";
  1 | import { renderHook, waitFor } from "@testing-library/react";
  2 | import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  3 | import { createElement } from "react";
  4 | 
  5 | vi.mock("../../../hooks/useSchools", () => ({
  6 |   useSchoolsList: vi.fn(() => ({
  7 |     data: [
  8 |       {
  9 |         id: "school-1",
 10 |         name: "Школа №1",
 11 |         type: "Школа",
 12 |         cityId: "city-1",
 13 |         childrenCount: 300,
 14 |         events: [],
 15 |       },
 16 |       {
 17 |         id: "school-2",
 18 |         name: "Школа №5",
 19 |         type: "Школа",
 20 |         cityId: "city-1",
 21 |         childrenCount: 100,
 22 |         events: [],
 23 |       },
 24 |     ],
 25 |     isLoading: false,
 26 |     isSuccess: true,
 27 |   })),
 28 | }));
 29 | 
 30 | import { useSchoolsList } from "../../../hooks/useSchools";
 31 | 
 32 | const makeWrapper = () => {
 33 |   const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
 34 |   return ({ children }: { children: React.ReactNode }) =>
 35 |     createElement(QueryClientProvider, { client: qc, children });
 36 | };
 37 | 
 38 | describe("useSchoolsList", () => {
 39 |   it("повертає список шкіл", async () => {
 40 |     const { result } = renderHook(() => useSchoolsList(), {
 41 |       wrapper: makeWrapper(),
 42 |     });
 43 |     await waitFor(() => expect(result.current.isSuccess).toBe(true));
 44 |     expect(result.current.data).toHaveLength(2);
 45 |     expect(result.current.data?.[0].name).toBe("Школа №1");
 46 |   });
 47 | 
 48 |   it("isLoading на початку", () => {
 49 |     const { result } = renderHook(() => useSchoolsList(), {
 50 |       wrapper: makeWrapper(),
 51 |     });
 52 |     expect(result.current.isLoading).toBe(true);
 53 |   });
 54 | });
 55 | 
```

### File: apps/frontend/src/tests/unit/hooks/useSchoolsFilter.test.ts
```ts
  0 | import { describe, it, expect, vi } from "vitest";
  1 | import { renderHook } from "@testing-library/react";
  2 | 
  3 | // Мокаємо хук
  4 | vi.mock("../../../hooks/useSchools", () => ({
  5 |   useSchoolsList: vi.fn(() => ({
  6 |     data: [
  7 |       {
  8 |         id: "s-1",
  9 |         name: "Школа №1",
 10 |         type: "Школа",
 11 |         cityId: "city-1",
 12 |         childrenCount: 300,
 13 |         events: [],
 14 |       },
 15 |       {
 16 |         id: "s-2",
 17 |         name: "Школа №5",
 18 |         type: "Школа",
 19 |         cityId: "city-1",
 20 |         childrenCount: 100,
 21 |         events: [{ status: "FIRST_CONTACT" }],
 22 |       },
 23 |       {
 24 |         id: "s-3",
 25 |         name: "Садочок №1",
 26 |         type: "Садочок",
 27 |         cityId: "city-1",
 28 |         childrenCount: 60,
 29 |         events: [],
 30 |       },
 31 |       {
 32 |         id: "s-4",
 33 |         name: "Школа №10",
 34 |         type: "Школа",
 35 |         cityId: "city-2",
 36 |         childrenCount: 800,
 37 |         events: [{ status: "IN_PROGRESS" }],
 38 |       },
 39 |     ],
 40 |     isLoading: false,
 41 |     isSuccess: true,
 42 |   })),
 43 | }));
 44 | 
 45 | vi.mock("../../../components/schools/schoolUtils", () => ({
 46 |   classifySchool: (s: any) => {
 47 |     if (!s.events?.length) return "new";
 48 |     const status = s.events[0].status;
 49 |     if (["FIRST_CONTACT", "DATE_CONFIRMED"].includes(status)) return "planned";
 50 |     if (["IN_PROGRESS", "PREPARATION"].includes(status)) return "inProgress";
 51 |     return "new";
 52 |   },
 53 |   classifySize: (s: any, type: string) => {
 54 |     const count = s.childrenCount ?? 0;
 55 |     if (type === "Садочок") {
 56 |       if (count < 50) return "small";
 57 |       if (count < 100) return "medium";
 58 |       return "large";
 59 |     }
 60 |     if (count < 500) return "small";
 61 |     if (count < 900) return "medium";
 62 |     return "large";
 63 |   },
 64 | }));
 65 | 
 66 | import { useSchoolsList } from "../../../hooks/useSchools";
 67 | import {
 68 |   classifySchool,
 69 |   classifySize,
 70 | } from "../../../components/schools/schoolUtils";
 71 | 
 72 | // Хелпер — фільтрація як в Schools.tsx
 73 | function filterSchools(
 74 |   schools: any[],
 75 |   {
 76 |     cityId,
 77 |     type,
 78 |     activeFilter,
 79 |     sizeFilter,
 80 |     search,
 81 |   }: {
 82 |     cityId?: string;
 83 |     type?: string;
 84 |     activeFilter?: string | null;
 85 |     sizeFilter?: string | null;
 86 |     search?: string;
 87 |   },
 88 | ) {
 89 |   return schools.filter((s) => {
 90 |     if (cityId && s.cityId !== cityId) return false;
 91 |     if (type && s.type !== type) return false;
 92 |     if (activeFilter && classifySchool(s) !== activeFilter) return false;
 93 |     if (sizeFilter && classifySize(s, s.type) !== sizeFilter) return false;
 94 |     if (search) {
 95 |       const q = search.toLowerCase();
 96 |       return s.name?.toLowerCase().includes(q);
 97 |     }
 98 |     return true;
 99 |   });
100 | }
101 | 
102 | describe("Фільтрація шкіл", () => {
103 |   it("без фільтрів повертає всі школи", () => {
104 |     const { result } = renderHook(() => useSchoolsList());
105 |     const filtered = filterSchools(result.current.data!, {});
106 |     expect(filtered).toHaveLength(4);
107 |   });
108 | 
109 |   it("фільтр по cityId", () => {
110 |     const { result } = renderHook(() => useSchoolsList());
111 |     const filtered = filterSchools(result.current.data!, { cityId: "city-1" });
112 |     expect(filtered).toHaveLength(3);
113 |     expect(filtered.every((s) => s.cityId === "city-1")).toBe(true);
114 |   });
115 | 
116 |   it("фільтр по type=Школа", () => {
117 |     const { result } = renderHook(() => useSchoolsList());
118 |     const filtered = filterSchools(result.current.data!, { type: "Школа" });
119 |     expect(filtered).toHaveLength(3);
120 |     expect(filtered.every((s) => s.type === "Школа")).toBe(true);
121 |   });
122 | 
123 |   it("фільтр activeFilter=new — тільки нові", () => {
124 |     const { result } = renderHook(() => useSchoolsList());
125 |     const filtered = filterSchools(result.current.data!, {
126 |       activeFilter: "new",
127 |     });
128 |     expect(filtered).toHaveLength(2); // s-1 і s-3
129 |   });
130 | 
131 |   it("фільтр activeFilter=planned", () => {
132 |     const { result } = renderHook(() => useSchoolsList());
133 |     const filtered = filterSchools(result.current.data!, {
134 |       activeFilter: "planned",
135 |     });
136 |     expect(filtered).toHaveLength(1);
137 |     expect(filtered[0].id).toBe("s-2");
138 |   });
139 | 
140 |   it("фільтр activeFilter=inProgress", () => {
141 |     const { result } = renderHook(() => useSchoolsList());
142 |     const filtered = filterSchools(result.current.data!, {
143 |       activeFilter: "inProgress",
144 |     });
145 |     expect(filtered).toHaveLength(1);
146 |     expect(filtered[0].id).toBe("s-4");
147 |   });
148 | 
149 |   it("фільтр sizeFilter=small для шкіл (< 500)", () => {
150 |     const { result } = renderHook(() => useSchoolsList());
151 |     const filtered = filterSchools(result.current.data!, {
152 |       type: "Школа",
153 |       sizeFilter: "small",
154 |     });
155 |     expect(filtered.every((s) => s.childrenCount < 500)).toBe(true);
156 |   });
157 | 
158 |   it("фільтр sizeFilter=medium для шкіл (500-900)", () => {
159 |     const { result } = renderHook(() => useSchoolsList());
160 |     const filtered = filterSchools(result.current.data!, {
161 |       type: "Школа",
162 |       sizeFilter: "medium",
163 |     });
164 |     expect(filtered).toHaveLength(1);
165 |     expect(filtered[0].id).toBe("s-4"); // childrenCount=800
166 |   });
167 | 
168 |   it("пошук по назві", () => {
169 |     const { result } = renderHook(() => useSchoolsList());
170 |     const filtered = filterSchools(result.current.data!, {
171 |       search: "Школа №1",
172 |     });
173 |     expect(filtered).toHaveLength(1);
174 |     expect(filtered[0].id).toBe("s-1");
175 |   });
176 | 
177 |   it("пошук нечутливий до регістру", () => {
178 |     const { result } = renderHook(() => useSchoolsList());
179 |     const filtered = filterSchools(result.current.data!, {
180 |       search: "школа №5",
181 |     });
182 |     expect(filtered).toHaveLength(1);
183 |   });
184 | 
185 |   it("комбінований фільтр: city + type + activeFilter", () => {
186 |     const { result } = renderHook(() => useSchoolsList());
187 |     const filtered = filterSchools(result.current.data!, {
188 |       cityId: "city-1",
189 |       type: "Школа",
190 |       activeFilter: "planned",
191 |     });
192 |     expect(filtered).toHaveLength(1);
193 |     expect(filtered[0].id).toBe("s-2");
194 |   });
195 | 
196 |   it("пошук без результатів повертає порожній масив", () => {
197 |     const { result } = renderHook(() => useSchoolsList());
198 |     const filtered = filterSchools(result.current.data!, {
199 |       search: "xyznonsense",
200 |     });
201 |     expect(filtered).toHaveLength(0);
202 |   });
203 | });
204 | 
```

### File: apps/frontend/src/tests/unit/schoolUtils.test.ts
```ts
  0 | import { describe, it, expect } from "vitest";
  1 | import {
  2 |   classifySchool,
  3 |   classifySize,
  4 | } from "../../components/schools/schoolUtils";
  5 | 
  6 | describe("classifySchool", () => {
  7 |   it("повертає 'new' якщо немає подій", () => {
  8 |     expect(classifySchool({ events: [] })).toBe("new");
  9 |     expect(classifySchool({})).toBe("new");
 10 |   });
 11 | 
 12 |   it("повертає 'planned' якщо остання подія FIRST_CONTACT або DATE_CONFIRMED", () => {
 13 |     expect(classifySchool({ events: [{ status: "FIRST_CONTACT" }] })).toBe(
 14 |       "planned",
 15 |     );
 16 |     expect(classifySchool({ events: [{ status: "DATE_CONFIRMED" }] })).toBe(
 17 |       "planned",
 18 |     );
 19 |   });
 20 | 
 21 |   it("повертає 'inProgress' якщо подія в процесі", () => {
 22 |     expect(classifySchool({ events: [{ status: "IN_PROGRESS" }] })).toBe(
 23 |       "inProgress",
 24 |     );
 25 |     expect(classifySchool({ events: [{ status: "PREPARATION" }] })).toBe(
 26 |       "inProgress",
 27 |     );
 28 |   });
 29 | 
 30 |   it("повертає 'done' якщо подія завершена", () => {
 31 |     expect(classifySchool({ events: [{ status: "RE_SALE" }] })).toBe("done");
 32 |   });
 33 | });
 34 | 
 35 | describe("classifySize для школи", () => {
 36 |   it("малі < 500", () => {
 37 |     expect(classifySize({ childrenCount: 300 }, "Школа")).toBe("small");
 38 |   });
 39 | 
 40 |   it("середні 500-900", () => {
 41 |     expect(classifySize({ childrenCount: 700 }, "Школа")).toBe("medium");
 42 |   });
 43 | 
 44 |   it("великі 900+", () => {
 45 |     expect(classifySize({ childrenCount: 1000 }, "Школа")).toBe("large");
 46 |   });
 47 | });
 48 | 
 49 | describe("classifySize для садочку", () => {
 50 |   it("малі < 50", () => {
 51 |     expect(classifySize({ childrenCount: 30 }, "Садочок")).toBe("small");
 52 |   });
 53 | 
 54 |   it("середні 50-100", () => {
 55 |     expect(classifySize({ childrenCount: 75 }, "Садочок")).toBe("medium");
 56 |   });
 57 | 
 58 |   it("великі 100+", () => {
 59 |     expect(classifySize({ childrenCount: 120 }, "Садочок")).toBe("large");
 60 |   });
 61 | });
 62 | 
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
 41 | export interface ExpenseItem {
 42 |   category?: string;
 43 |   name?: string;
 44 |   amount: number;
 45 | }
 46 | 
 47 | export interface SalaryItem {
 48 |   userId: string;
 49 |   name: string;
 50 |   amount: number;
 51 |   role?: string;
 52 | }
 53 | 
 54 | export interface EventReport {
 55 |   childrenCount: number;
 56 |   totalSum: number;
 57 |   schoolSum: number;
 58 |   remainderSum: number;
 59 |   directorSatisfied?: boolean;
 60 |   teachersSatisfied?: boolean;
 61 |   hadIssues?: boolean;
 62 |   comment?: string;
 63 |   rating?: number;
 64 |   expenses: ExpenseItem[];
 65 |   salaries: SalaryItem[];
 66 | }
 67 | 
 68 | export interface Event {
 69 |   id: string;
 70 |   schoolId: string;
 71 |   cityId: string;
 72 |   project: string;
 73 |   date: string;
 74 |   time?: string;
 75 |   status: string;
 76 |   childrenPlanned?: number;
 77 |   price?: number;
 78 |   address?: string;
 79 |   contactPerson?: string;
 80 |   contactPhone?: string;
 81 |   crew?: Crew;
 82 |   report?: EventReport;
 83 |   history?: EventHistory[];
 84 |   preparation?: EventPreparation;
 85 |   school?: { id: string; name: string; type: string }; // ← додай це
 86 | }
 87 | 
 88 | export interface Crew {
 89 |   id: string;
 90 |   name: string;
 91 |   cityId: string;
 92 |   hostId?: string;
 93 |   driverId?: string;
 94 |   host?: { id: string; name: string };
 95 |   driver?: { id: string; name: string };
 96 |   car?: string;
 97 |   phone?: string;
 98 | }
 99 | 
100 | export interface EventPreparation {
101 |   assignCrew: string;
102 |   bookEquipment: string;
103 |   prepareDocs: string;
104 |   prepareMaterials: string;
105 |   remindSchool: string;
106 | }
107 | 
108 | export interface CityProfile extends City {
109 |   events: Event[];
110 |   crews: Crew[];
111 |   schools?: School[]; // ← додай це
112 | }
113 | 
114 | export interface IssueReport {
115 |   id: string;
116 |   eventId: string;
117 |   schoolName: string;
118 |   eventName: string;
119 |   message: string;
120 |   cityId: string;
121 |   status: string;
122 |   createdAt: string;
123 | }
124 | 
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
 15 |   test: {
 16 |     globals: true,
 17 |     environment: "jsdom",
 18 |     setupFiles: ["./src/tests/setup.ts"],
 19 |     include: ["src/**/*.{test,spec}.{ts,tsx}"],
 20 |     coverage: {
 21 |       reporter: ["text", "html"],
 22 |       exclude: ["src/tests/**", "src/main.tsx"],
 23 |     },
 24 |   },
 25 | });
 26 | 
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
