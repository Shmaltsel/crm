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
│   │   │   │   ├── 20260701224321_balance_to_decimal
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
│   │   │   │   ├── csrf.guard.ts
│   │   │   │   ├── decorators
│   │   │   │   │   ├── check-ownership.decorator.ts
│   │   │   │   │   ├── current-user.decorator.ts
│   │   │   │   │   └── roles.decorator.ts
│   │   │   │   ├── dto
│   │   │   │   │   └── login.dto.ts
│   │   │   │   ├── guards
│   │   │   │   │   ├── ownership.guard.ts
│   │   │   │   │   └── roles.guard.ts
│   │   │   │   └── interfaces
│   │   │   │       └── jwt-user.interface.ts
│   │   │   ├── cities
│   │   │   │   ├── cities.controller.spec.ts
│   │   │   │   ├── cities.controller.ts
│   │   │   │   ├── cities.module.ts
│   │   │   │   ├── cities.service.spec.ts
│   │   │   │   ├── cities.service.ts
│   │   │   │   └── dto
│   │   │   │       ├── create-city.dto.ts
│   │   │   │       └── create-crew.dto.ts
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.controller.ts
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   ├── dashboard.service.spec.ts
│   │   │   │   └── dashboard.service.ts
│   │   │   ├── events
│   │   │   │   ├── dto
│   │   │   │   │   ├── add-comment.dto.ts
│   │   │   │   │   ├── assign-crew.dto.ts
│   │   │   │   │   ├── create-event.dto.ts
│   │   │   │   │   ├── reschedule-event.dto.ts
│   │   │   │   │   ├── submit-report.dto.spec.ts
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
│   │   │   │   ├── dto
│   │   │   │   │   ├── finance-dashboard-query.dto.ts
│   │   │   │   │   └── staff-revenue-query.dto.ts
│   │   │   │   ├── finance.controller.ts
│   │   │   │   ├── finance.module.ts
│   │   │   │   ├── finance.service.spec.ts
│   │   │   │   └── finance.service.ts
│   │   │   ├── issues
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-issue.dto.ts
│   │   │   │   │   └── update-issue-status.dto.ts
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
│   │   │   │   ├── dto
│   │   │   │   │   └── create-project.dto.ts
│   │   │   │   ├── projects.controller.ts
│   │   │   │   ├── projects.module.ts
│   │   │   │   └── projects.service.ts
│   │   │   ├── schools
│   │   │   │   ├── dto
│   │   │   │   │   ├── bulk-import.dto.ts
│   │   │   │   │   ├── create-school.dto.ts
│   │   │   │   │   └── update-school.dto.ts
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
│   │   │       ├── dto
│   │   │       │   ├── create-user.dto.ts
│   │   │       │   └── update-user.dto.ts
│   │   │       ├── users.controller.spec.ts
│   │   │       ├── users.controller.ts
│   │   │       ├── users.module.ts
│   │   │       ├── users.service.spec.ts
│   │   │       └── users.service.ts
│   │   ├── test
│   │   │   ├── app.e2e-spec.ts
│   │   │   ├── auth.e2e-spec.ts
│   │   │   ├── dashboard.e2e-spec.ts
│   │   │   ├── events.e2e-spec.ts
│   │   │   ├── jest-e2e.json
│   │   │   └── schools.e2e-spec.ts
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── .gitignore
│       ├── README.md
│       ├── eslint.config.js
│       ├── index.html
│       ├── lighthouserc.cjs
│       ├── package.json
│       ├── playwright-report
│       │   └── index.html
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
│       │   ├── types
│       │   │   └── index.ts
│       │   └── utils
│       │       └── formatCurrency.ts
│       ├── tailwind.config.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vercel.json
│       └── vite.config.ts
├── collect-code.js
├── combined_auth_cors.md
├── combined_failing_tests.md
├── combined_final_fixes.md
├── combined_methods_and_dto.md
├── combined_roles_controllers.md
├── package.json
├── packages
│   └── shared
├── pnpm-workspace.yaml
```

### File: apps/backend/package.json
```json
  0 | {
  1 |   "name": "backend",
  2 |   "version": "0.0.1",
  3 |   "description": "",
  4 |   "author": "",
  5 |   "private": true,
  6 |   "license": "UNLICENSED",
  7 |   "scripts": {
  8 |     "build": "nest build",
  9 |     "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
 10 |     "start": "nest start",
 11 |     "start:dev": "nest start --watch",
 12 |     "start:debug": "nest start --debug --watch",
 13 |     "start:prod": "node dist/main",
 14 |     "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
 15 |     "test": "jest",
 16 |     "test:watch": "jest --watch",
 17 |     "test:cov": "jest --coverage",
 18 |     "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
 19 |     "test:e2e": "jest --config ./test/jest-e2e.json"
 20 |   },
 21 |   "dependencies": {
 22 |     "@nestjs/common": "^11.0.1",
 23 |     "@nestjs/core": "^11.0.1",
 24 |     "@nestjs/jwt": "^11.0.2",
 25 |     "@nestjs/passport": "^11.0.5",
 26 |     "@nestjs/platform-express": "^11.0.1",
 27 |     "@prisma/client": "6.19.0",
 28 |     "axios": "^1.18.0",
 29 |     "bcrypt": "^6.0.0",
 30 |     "cheerio": "^1.2.0",
 31 |     "class-transformer": "^0.5.1",
 32 |     "class-validator": "^0.15.1",
 33 |     "cookie-parser": "^1.4.7",
 34 |     "dotenv": "^17.4.2",
 35 |     "node-telegram-bot-api": "0.64.0",
 36 |     "passport": "^0.7.0",
 37 |     "passport-jwt": "^4.0.1",
 38 |     "reflect-metadata": "^0.2.2",
 39 |     "rxjs": "^7.8.1"
 40 |   },
 41 |   "devDependencies": {
 42 |     "@eslint/eslintrc": "^3.2.0",
 43 |     "@eslint/js": "^9.18.0",
 44 |     "@nestjs/cli": "^11.0.0",
 45 |     "@nestjs/schematics": "^11.0.0",
 46 |     "@nestjs/testing": "^11.0.1",
 47 |     "@types/bcrypt": "^6.0.0",
 48 |     "@types/cookie-parser": "^1.4.10",
 49 |     "@types/express": "^5.0.0",
 50 |     "@types/jest": "^29.0.0",
 51 |     "@types/node": "^24.0.0",
 52 |     "@types/node-telegram-bot-api": "^0.64.15",
 53 |     "@types/passport-jwt": "^4.0.1",
 54 |     "@types/supertest": "^7.0.0",
 55 |     "eslint": "^9.18.0",
 56 |     "eslint-config-prettier": "^10.0.1",
 57 |     "eslint-plugin-prettier": "^5.2.2",
 58 |     "globals": "^17.0.0",
 59 |     "jest": "^29.0.0",
 60 |     "jest-mock-extended": "^3.0.0",
 61 |     "prettier": "^3.4.2",
 62 |     "prisma": "6.19.0",
 63 |     "source-map-support": "^0.5.21",
 64 |     "supertest": "^7.0.0",
 65 |     "ts-jest": "^29.2.5",
 66 |     "ts-loader": "^9.5.2",
 67 |     "ts-node": "^10.9.2",
 68 |     "tsconfig-paths": "^4.2.0",
 69 |     "typescript": "^5.7.3",
 70 |     "typescript-eslint": "^8.20.0"
 71 |   },
 72 |   "jest": {
 73 |     "moduleFileExtensions": [
 74 |       "js",
 75 |       "json",
 76 |       "ts"
 77 |     ],
 78 |     "rootDir": "src",
 79 |     "testRegex": ".*\\.spec\\.ts$",
 80 |     "transform": {
 81 |       "^.+\\.(t|j)s$": "ts-jest"
 82 |     },
 83 |     "collectCoverageFrom": [
 84 |       "**/*.(t|j)s"
 85 |     ],
 86 |     "coverageDirectory": "../coverage",
 87 |     "testEnvironment": "node",
 88 |     "moduleNameMapper": {
 89 |       "^src/(.*)$": "<rootDir>/$1"
 90 |     }
 91 |   },
 92 |   "prisma": {
 93 |     "schema": "prisma/schema.prisma"
 94 |   }
 95 | }
 96 | 
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
 22 |   balance        Decimal      @default(0) @db.Decimal(12, 2)
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
215 |   category  String 
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
231 |   role      String? 
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
  0 | import {
  1 |   Body,
  2 |   Controller,
  3 |   HttpCode,
  4 |   HttpStatus,
  5 |   Post,
  6 |   Res,
  7 | } from '@nestjs/common';
  8 | import type { Response } from 'express';
  9 | import { randomBytes } from 'crypto';
 10 | import { AuthService } from './auth.service';
 11 | import { LoginDto } from './dto/login.dto';
 12 | 
 13 | const isProd = process.env.NODE_ENV === 'production';
 14 | 
 15 | @Controller('auth')
 16 | export class AuthController {
 17 |   constructor(private authService: AuthService) {}
 18 | 
 19 |   @HttpCode(HttpStatus.OK)
 20 |   @Post('login')
 21 |   async login(
 22 |     @Body() signInDto: LoginDto,
 23 |     @Res({ passthrough: true }) res: Response,
 24 |   ) {
 25 |     const { access_token, user } = await this.authService.login(
 26 |       signInDto.email,
 27 |       signInDto.password,
 28 |     );
 29 |     const csrfToken = randomBytes(32).toString('hex');
 30 | 
 31 |     res.cookie('access_token', access_token, {
 32 |       httpOnly: true,
 33 |       secure: isProd,
 34 |       sameSite: isProd ? 'none' : 'lax',
 35 |       maxAge: 24 * 60 * 60 * 1000,
 36 |     });
 37 |     res.cookie('csrf_token', csrfToken, {
 38 |       httpOnly: false, // фронтенд має прочитати
 39 |       secure: isProd,
 40 |       sameSite: isProd ? 'none' : 'lax',
 41 |       maxAge: 24 * 60 * 60 * 1000,
 42 |     });
 43 | 
 44 |     return { user };
 45 |   }
 46 | 
 47 |   @HttpCode(HttpStatus.OK)
 48 |   @Post('logout')
 49 |   logout(@Res({ passthrough: true }) res: Response) {
 50 |     res.clearCookie('access_token');
 51 |     res.clearCookie('csrf_token');
 52 |     return { message: 'ok' };
 53 |   }
 54 | }
 55 | 
```

### File: apps/backend/src/auth/auth.guard.ts
```ts
  0 | import {
  1 |   CanActivate,
  2 |   ExecutionContext,
  3 |   Injectable,
  4 |   UnauthorizedException,
  5 | } from '@nestjs/common';
  6 | import { JwtService } from '@nestjs/jwt';
  7 | import { Request } from 'express';
  8 | 
  9 | @Injectable()
 10 | export class AuthGuard implements CanActivate {
 11 |   constructor(private jwtService: JwtService) {}
 12 | 
 13 |   async canActivate(context: ExecutionContext): Promise<boolean> {
 14 |     const request = context.switchToHttp().getRequest();
 15 |     const token = this.extractTokenFromHeader(request);
 16 | 
 17 |     if (!token) throw new UnauthorizedException('Токен не знайдено');
 18 | 
 19 |     try {
 20 |       const payload = await this.jwtService.verifyAsync(token, {
 21 |         secret: process.env.JWT_SECRET || 'super-secret-key-for-dev',
 22 |       });
 23 |       request['user'] = payload;
 24 |     } catch {
 25 |       throw new UnauthorizedException('Недійсний токен');
 26 |     }
 27 |     return true;
 28 |   }
 29 | 
 30 |   private extractTokenFromHeader(request: Request): string | undefined {
 31 |     if (request.cookies?.access_token) return request.cookies.access_token;
 32 |     const [type, token] = request.headers.authorization?.split(' ') ?? [];
 33 |     return type === 'Bearer' ? token : undefined; // тимчасовий fallback на перехідний період
 34 |   }
 35 | }
 36 | 
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
 12 |       signOptions: { expiresIn: '7d' },
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
 13 |     const user = await this.usersService.findByEmail(email);
 14 | 
 15 |     if (!user) {
 16 |       throw new UnauthorizedException('Невірний email або пароль');
 17 |     }
 18 | 
 19 |     const isPasswordValid = await bcrypt.compare(pass, user.password);
 20 | 
 21 |     if (!isPasswordValid) {
 22 |       throw new UnauthorizedException('Невірний email або пароль');
 23 |     }
 24 | 
 25 |     const payload = {
 26 |       sub: user.id,
 27 |       email: user.email,
 28 |       role: user.role,
 29 |       name: user.name,
 30 |     };
 31 | 
 32 |     return {
 33 |       access_token: await this.jwtService.signAsync(payload),
 34 |       user: {
 35 |         id: user.id,
 36 |         name: user.name,
 37 |         email: user.email,
 38 |         role: user.role,
 39 |       },
 40 |     };
 41 |   }
 42 | }
 43 | 
```

### File: apps/backend/src/auth/csrf.guard.ts
```ts
  0 | import {
  1 |   CanActivate,
  2 |   ExecutionContext,
  3 |   ForbiddenException,
  4 |   Injectable,
  5 | } from '@nestjs/common';
  6 | 
  7 | @Injectable()
  8 | export class CsrfGuard implements CanActivate {
  9 |   canActivate(context: ExecutionContext): boolean {
 10 |     const req = context.switchToHttp().getRequest();
 11 |     if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
 12 | 
 13 |     const cookieToken = req.cookies?.csrf_token;
 14 |     const headerToken = req.headers['x-csrf-token'];
 15 |     if (!cookieToken || cookieToken !== headerToken) {
 16 |       throw new ForbiddenException('CSRF token invalid');
 17 |     }
 18 |     return true;
 19 |   }
 20 | }
 21 | 
```

### File: apps/backend/src/auth/decorators/check-ownership.decorator.ts
```ts
  0 | import { SetMetadata } from '@nestjs/common';
  1 | 
  2 | export type OwnedResourceType = 'school' | 'event' | 'city' | 'crew';
  3 | 
  4 | export const OWNERSHIP_KEY = 'ownershipResourceType';
  5 | export const CheckOwnership = (resourceType: OwnedResourceType) =>
  6 |   SetMetadata(OWNERSHIP_KEY, resourceType);
  7 | 
```

### File: apps/backend/src/auth/decorators/current-user.decorator.ts
```ts
  0 | import { createParamDecorator, ExecutionContext } from '@nestjs/common';
  1 | import { JwtUser } from '../interfaces/jwt-user.interface';
  2 | 
  3 | export const CurrentUser = createParamDecorator(
  4 |   (data: unknown, ctx: ExecutionContext): JwtUser => {
  5 |     const request = ctx.switchToHttp().getRequest();
  6 |     return request.user;
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

### File: apps/backend/src/auth/dto/login.dto.ts
```ts
  0 | import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
  1 | 
  2 | export class LoginDto {
  3 |   @IsEmail()
  4 |   email: string;
  5 | 
  6 |   @IsString()
  7 |   @IsNotEmpty()
  8 |   @MinLength(6)
  9 |   password: string;
 10 | }
 11 | 
```

### File: apps/backend/src/auth/guards/ownership.guard.ts
```ts
  0 | import {
  1 |   Injectable,
  2 |   CanActivate,
  3 |   ExecutionContext,
  4 |   ForbiddenException,
  5 |   NotFoundException,
  6 | } from '@nestjs/common';
  7 | import { Reflector } from '@nestjs/core';
  8 | import { PrismaService } from '../../prisma/prisma.service';
  9 | import {
 10 |   OWNERSHIP_KEY,
 11 |   OwnedResourceType,
 12 | } from '../decorators/check-ownership.decorator';
 13 | 
 14 | @Injectable()
 15 | export class OwnershipGuard implements CanActivate {
 16 |   constructor(
 17 |     private reflector: Reflector,
 18 |     private prisma: PrismaService,
 19 |   ) {}
 20 | 
 21 |   async canActivate(context: ExecutionContext): Promise<boolean> {
 22 |     const resourceType = this.reflector.getAllAndOverride<OwnedResourceType>(
 23 |       OWNERSHIP_KEY,
 24 |       [context.getHandler(), context.getClass()],
 25 |     );
 26 |     if (!resourceType) return true;
 27 | 
 28 |     const request = context.switchToHttp().getRequest();
 29 |     const user = request.user;
 30 | 
 31 |     // SUPERADMIN бачить усе — перевірка не потрібна
 32 |     if (user?.role !== 'MANAGER') return true;
 33 | 
 34 |     const manager = await this.prisma.user.findUnique({
 35 |       where: { id: user.sub },
 36 |       select: { cityId: true },
 37 |     });
 38 |     if (!manager?.cityId) {
 39 |       throw new ForbiddenException('Менеджер не прив’язаний до міста');
 40 |     }
 41 | 
 42 |     const paramId: string | undefined =
 43 |       request.params.id ??
 44 |       request.params.schoolId ??
 45 |       request.params.eventId ??
 46 |       request.params.crewId;
 47 |     if (!paramId) return true;
 48 | 
 49 |     let resourceCityId: string | null | undefined;
 50 | 
 51 |     switch (resourceType) {
 52 |       case 'school': {
 53 |         const school = await this.prisma.school.findUnique({
 54 |           where: { id: paramId },
 55 |           select: { cityId: true },
 56 |         });
 57 |         if (!school) throw new NotFoundException('Заклад не знайдено');
 58 |         resourceCityId = school.cityId;
 59 |         break;
 60 |       }
 61 |       case 'event': {
 62 |         const event = await this.prisma.event.findUnique({
 63 |           where: { id: paramId },
 64 |           select: { cityId: true },
 65 |         });
 66 |         if (!event) throw new NotFoundException('Подію не знайдено');
 67 |         resourceCityId = event.cityId;
 68 |         break;
 69 |       }
 70 |       case 'crew': {
 71 |         const crew = await this.prisma.crew.findUnique({
 72 |           where: { id: paramId },
 73 |           select: { cityId: true },
 74 |         });
 75 |         if (!crew) throw new NotFoundException('Екіпаж не знайдено');
 76 |         resourceCityId = crew.cityId;
 77 |         break;
 78 |       }
 79 |       case 'city': {
 80 |         resourceCityId = paramId; // сам :id і є cityId
 81 |         break;
 82 |       }
 83 |     }
 84 | 
 85 |     if (resourceCityId !== manager.cityId) {
 86 |       throw new ForbiddenException('Немає доступу до ресурсу іншого міста');
 87 |     }
 88 |     return true;
 89 |   }
 90 | }
 91 | 
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
  1 | import { JwtService } from '@nestjs/jwt';
  2 | import { CitiesController } from './cities.controller';
  3 | import { CitiesService } from './cities.service';
  4 | import { AuthGuard } from '../auth/auth.guard';
  5 | import { RolesGuard } from '../auth/guards/roles.guard';
  6 | 
  7 | describe('CitiesController', () => {
  8 |   it('should be defined', async () => {
  9 |     const module = await Test.createTestingModule({
 10 |       controllers: [CitiesController],
 11 |       providers: [
 12 |         { provide: CitiesService, useValue: {} },
 13 |         { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
 14 |         { provide: AuthGuard, useValue: { canActivate: () => true } },
 15 |         { provide: RolesGuard, useValue: { canActivate: () => true } },
 16 |       ],
 17 |     }).compile();
 18 |     expect(module.get(CitiesController)).toBeDefined();
 19 |   });
 20 | });
 21 | 
```

### File: apps/backend/src/cities/cities.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Get,
  3 |   Post,
  4 |   Body,
  5 |   Param,
  6 |   Delete,
  7 |   UseGuards,
  8 | } from '@nestjs/common';
  9 | import { CitiesService } from './cities.service';
 10 | import { AuthGuard } from '../auth/auth.guard';
 11 | import { RolesGuard } from '../auth/guards/roles.guard';
 12 | import { Roles } from '../auth/decorators/roles.decorator';
 13 | import { CreateCityDto } from './dto/create-city.dto';
 14 | import { CreateCrewDto } from './dto/create-crew.dto';
 15 | import { OwnershipGuard } from '../auth/guards/ownership.guard';
 16 | import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
 17 | 
 18 | @Controller('cities')
 19 | @UseGuards(AuthGuard, RolesGuard)
 20 | export class CitiesController {
 21 |   constructor(private readonly citiesService: CitiesService) {}
 22 | 
 23 |   @Post()
 24 |   @Roles('SUPERADMIN')
 25 |   create(@Body() body: CreateCityDto) {
 26 |     return this.citiesService.create(body.name);
 27 |   }
 28 | 
 29 |   @Get()
 30 |   findAll() {
 31 |     return this.citiesService.findAll();
 32 |   }
 33 | 
 34 |   @Get(':id')
 35 |   findOne(@Param('id') id: string) {
 36 |     return this.citiesService.findOne(id);
 37 |   }
 38 |   @Post(':id/crews')
 39 |   @Roles('SUPERADMIN', 'MANAGER')
 40 |   @UseGuards(OwnershipGuard)
 41 |   @CheckOwnership('city')
 42 |   createCrew(@Param('id') id: string, @Body() body: CreateCrewDto) {
 43 |     return this.citiesService.createCrew(id, body);
 44 |   }
 45 | 
 46 |   @Delete('crews/:crewId')
 47 |   @Roles('SUPERADMIN', 'MANAGER')
 48 |   @UseGuards(OwnershipGuard)
 49 |   @CheckOwnership('crew')
 50 |   deleteCrew(@Param('crewId') crewId: string) {
 51 |     return this.citiesService.deleteCrew(crewId);
 52 |   }
 53 | }
 54 | 
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
 14 |     const cities = await this.prisma.city.findMany({
 15 |       orderBy: { createdAt: 'desc' },
 16 |       include: {
 17 |         users: {
 18 |           where: { role: 'MANAGER' },
 19 |           select: { id: true, name: true, phone: true },
 20 |           take: 1,
 21 |         },
 22 |         _count: { select: { schools: true } },
 23 |       },
 24 |     });
 25 | 
 26 |     const eventsStats = await this.prisma.event.groupBy({
 27 |       by: ['cityId', 'status'],
 28 |       _count: { _all: true },
 29 |     });
 30 | 
 31 |     return cities.map((city) => {
 32 |       const cityStats = eventsStats.filter((stat) => stat.cityId === city.id);
 33 | 
 34 |       const completedEvents = cityStats
 35 |         .filter((s) => s.status === 'RE_SALE')
 36 |         .reduce((sum, s) => sum + s._count._all, 0);
 37 | 
 38 |       const plannedEvents = cityStats
 39 |         .filter((s) => s.status !== 'RE_SALE')
 40 |         .reduce((sum, s) => sum + s._count._all, 0);
 41 | 
 42 |       return {
 43 |         ...city,
 44 |         manager: city.users[0] || null,
 45 |         plannedEvents,
 46 |         completedEvents,
 47 |         schoolsCount: city._count.schools,
 48 |       };
 49 |     });
 50 |   }
 51 |   async createCrew(
 52 |     cityId: string,
 53 |     data: { name: string; hostId?: string; driverId?: string },
 54 |   ) {
 55 |     const driver = data.driverId
 56 |       ? await this.prisma.user.findUnique({ where: { id: data.driverId } })
 57 |       : null;
 58 |     return this.prisma.crew.create({
 59 |       data: {
 60 |         cityId,
 61 |         name: data.name,
 62 |         hostId: data.hostId ?? null,
 63 |         driverId: data.driverId ?? null,
 64 |         car: driver?.car || null,
 65 |         phone: driver?.phone || null,
 66 |       },
 67 |       include: { host: true, driver: true },
 68 |     });
 69 |   }
 70 | 
 71 |   async deleteCrew(id: string) {
 72 |     await this.prisma.event.updateMany({
 73 |       where: { crewId: id },
 74 |       data: { crewId: null },
 75 |     });
 76 |     return this.prisma.crew.delete({ where: { id } });
 77 |   }
 78 | 
 79 |   async findOne(id: string) {
 80 |     const city = await this.prisma.city.findUnique({
 81 |       where: { id },
 82 |       include: {
 83 |         users: {
 84 |           where: { role: 'MANAGER' },
 85 |           select: { id: true, name: true, phone: true },
 86 |           take: 1,
 87 |         },
 88 |         events: {
 89 |           where: { status: 'RE_SALE' },
 90 |           include: {
 91 |             school: { select: { id: true, name: true, type: true } },
 92 |             report: true,
 93 |             history: { orderBy: { createdAt: 'asc' } },
 94 |           },
 95 |           orderBy: { date: 'desc' },
 96 |         },
 97 |         crews: {
 98 |           include: {
 99 |             host: { select: { id: true, name: true } },
100 |             driver: { select: { id: true, name: true } },
101 |           },
102 |         },
103 |       },
104 |     });
105 | 
106 |     if (!city) return null;
107 | 
108 |     return {
109 |       ...city,
110 |       manager: city.users[0] || null,
111 |     };
112 |   }
113 | }
114 | 
```

### File: apps/backend/src/cities/dto/create-city.dto.ts
```ts
  0 | import { IsString, IsNotEmpty } from 'class-validator';
  1 | 
  2 | export class CreateCityDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   name: string;
  6 | }
  7 | 
```

### File: apps/backend/src/cities/dto/create-crew.dto.ts
```ts
  0 | import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
  1 | 
  2 | export class CreateCrewDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   name: string;
  6 | 
  7 |   @IsOptional()
  8 |   @IsString()
  9 |   hostId?: string;
 10 | 
 11 |   @IsOptional()
 12 |   @IsString()
 13 |   driverId?: string;
 14 | }
 15 | 
```

### File: apps/backend/src/dashboard/dashboard.controller.ts
```ts
  0 | import { Controller, Get, Query, UseGuards } from '@nestjs/common';
  1 | import { DashboardService, DashboardSummary } from './dashboard.service';
  2 | import { AuthGuard } from '../auth/auth.guard';
  3 | import { CurrentUser } from '../auth/decorators/current-user.decorator';
  4 | import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
  5 | import { IsOptional, IsString } from 'class-validator';
  6 | import { PrismaService } from '../prisma/prisma.service';
  7 | 
  8 | class DashboardSummaryQueryDto {
  9 |   @IsOptional()
 10 |   @IsString()
 11 |   cityId?: string;
 12 | }
 13 | 
 14 | @Controller('dashboard')
 15 | @UseGuards(AuthGuard)
 16 | export class DashboardController {
 17 |   constructor(
 18 |     private readonly dashboardService: DashboardService,
 19 |     private readonly prisma: PrismaService,
 20 |   ) {}
 21 | 
 22 |   @Get('summary')
 23 |   async getSummary(
 24 |     @CurrentUser() user: JwtUser,
 25 |     @Query() query: DashboardSummaryQueryDto,
 26 |   ): Promise<DashboardSummary> {
 27 |     let effectiveCityId: string | undefined;
 28 |     if (user.role === 'SUPERADMIN') {
 29 |       effectiveCityId = query.cityId;
 30 |     } else {
 31 |       const me = await this.prisma.user.findUnique({
 32 |         where: { id: user.sub },
 33 |         select: { cityId: true },
 34 |       });
 35 |       effectiveCityId = me?.cityId ?? undefined;
 36 |     }
 37 |     return this.dashboardService.getSummary(effectiveCityId, user.role);
 38 |   }
 39 | }
 40 | 
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
 34 |     .mockResolvedValueOnce([])
 35 |     .mockResolvedValueOnce([])
 36 |     .mockResolvedValueOnce([]);
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
 52 |     (service as any).cache.clear();
 53 |   });
 54 | 
 55 |   describe('getSummary — funnel', () => {
 56 |     it('коректно рахує воронку по стадіях', async () => {
 57 |       defaultMocks();
 58 |       const result = await service.getSummary('city-1');
 59 |       expect(result.funnel['BASE']).toBe(10);
 60 |       expect(result.funnel['FIRST_CONTACT']).toBe(5);
 61 |       expect(result.funnel['IN_PROGRESS']).toBe(3);
 62 |     });
 63 | 
 64 |     it('totalSchools = сума всіх записів воронки', async () => {
 65 |       defaultMocks();
 66 |       const result = await service.getSummary('city-1');
 67 |       expect(result.totalSchools).toBe(18);
 68 |     });
 69 | 
 70 |     it('всі етапи пайплайну присутні у funnel', async () => {
 71 |       defaultMocks();
 72 |       const result = await service.getSummary('city-1');
 73 |       const expectedStages = [
 74 |         'BASE',
 75 |         'FIRST_CONTACT',
 76 |         'DATE_CONFIRMED',
 77 |         'PREPARATION',
 78 |         'IN_PROGRESS',
 79 |         'DONE',
 80 |         'REPORT',
 81 |         'RE_SALE',
 82 |       ];
 83 |       for (const stage of expectedStages) {
 84 |         expect(result.funnel).toHaveProperty(stage);
 85 |       }
 86 |     });
 87 |   });
 88 | 
 89 |   describe('getSummary — todayEvents', () => {
 90 |     it('повертає сьогоднішні події', async () => {
 91 |       const todayEvent = {
 92 |         id: 'ev-1',
 93 |         project: 'Голограма',
 94 |         date: todayStr,
 95 |         school: { id: 's-1', name: 'Школа №1' },
 96 |         city: { id: 'c-1', name: 'Львів' },
 97 |         crew: null,
 98 |       };
 99 |       mockPrisma.event.findMany
100 |         .mockResolvedValueOnce([todayEvent])
101 |         .mockResolvedValueOnce([])
102 |         .mockResolvedValueOnce([]);
103 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
104 |       mockPrisma.school.findMany.mockResolvedValueOnce([]);
105 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
106 | 
107 |       const result = await service.getSummary('city-1');
108 |       expect(result.todayEvents).toHaveLength(1);
109 |       expect(result.todayEvents[0].id).toBe('ev-1');
110 |     });
111 | 
112 |     it('повертає порожній масив якщо сьогодні подій немає', async () => {
113 |       defaultMocks();
114 |       const result = await service.getSummary('city-1');
115 |       expect(result.todayEvents).toHaveLength(0);
116 |     });
117 |   });
118 | 
119 |   describe('getSummary — upcomingEvents', () => {
120 |     it('повертає майбутні події', async () => {
121 |       const upcoming = {
122 |         id: 'ev-2',
123 |         project: 'Малювайко',
124 |         date: todayStr,
125 |         school: null,
126 |         city: null,
127 |         crew: null,
128 |       };
129 |       mockPrisma.event.findMany
130 |         .mockResolvedValueOnce([])
131 |         .mockResolvedValueOnce([upcoming])
132 |         .mockResolvedValueOnce([]);
133 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
134 |       mockPrisma.school.findMany.mockResolvedValueOnce([]);
135 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
136 | 
137 |       const result = await service.getSummary('city-1');
138 |       expect(result.upcomingEvents).toHaveLength(1);
139 |       expect(result.upcomingEvents[0].id).toBe('ev-2');
140 |     });
141 |   });
142 | 
143 |   describe('getSummary — staleSchools', () => {
144 |     it('повертає школи без активності більше 7 днів', async () => {
145 |       const staleDate = new Date();
146 |       staleDate.setDate(staleDate.getDate() - 10);
147 | 
148 |       const staleSchool = {
149 |         id: 's-stale',
150 |         name: 'Стала школа',
151 |         events: [
152 |           {
153 |             status: 'FIRST_CONTACT',
154 |             history: [{ createdAt: staleDate }],
155 |           },
156 |         ],
157 |       };
158 | 
159 |       mockPrisma.event.findMany
160 |         .mockResolvedValueOnce([])
161 |         .mockResolvedValueOnce([])
162 |         .mockResolvedValueOnce([]);
163 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
164 |       mockPrisma.school.findMany.mockResolvedValueOnce([staleSchool]);
165 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
166 | 
167 |       const result = await service.getSummary('city-1');
168 |       expect(result.staleSchools).toHaveLength(1);
169 |       expect(result.staleSchools[0].id).toBe('s-stale');
170 |       expect(result.staleSchools[0].daysStale).toBeGreaterThanOrEqual(9);
171 |     });
172 | 
173 |     it('сортує staleSchools від найстарішої активності', async () => {
174 |       const date10 = new Date();
175 |       date10.setDate(date10.getDate() - 10);
176 |       const date20 = new Date();
177 |       date20.setDate(date20.getDate() - 20);
178 | 
179 |       mockPrisma.event.findMany
180 |         .mockResolvedValueOnce([])
181 |         .mockResolvedValueOnce([])
182 |         .mockResolvedValueOnce([]);
183 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
184 |       mockPrisma.school.findMany.mockResolvedValueOnce([
185 |         {
186 |           id: 's-1',
187 |           name: 'Школа 1',
188 |           events: [{ status: 'BASE', history: [{ createdAt: date10 }] }],
189 |         },
190 |         {
191 |           id: 's-2',
192 |           name: 'Школа 2',
193 |           events: [{ status: 'BASE', history: [{ createdAt: date20 }] }],
194 |         },
195 |       ]);
196 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
197 | 
198 |       const result = await service.getSummary('city-1');
199 |       expect(result.staleSchools[0].daysStale).toBeGreaterThan(
200 |         result.staleSchools[1].daysStale!,
201 |       );
202 |     });
203 |   });
204 | 
205 |   describe('getSummary — monthlyKpi', () => {
206 |     it('коректно рахує KPI за місяць', async () => {
207 |       mockPrisma.event.findMany
208 |         .mockResolvedValueOnce([])
209 |         .mockResolvedValueOnce([])
210 |         .mockResolvedValueOnce([
211 |           {
212 |             id: 'ev-1',
213 |             report: { totalSum: 10000, remainderSum: 4000, childrenCount: 100 },
214 |           },
215 |           {
216 |             id: 'ev-2',
217 |             report: { totalSum: 5000, remainderSum: 2000, childrenCount: 50 },
218 |           },
219 |         ]);
220 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
221 |       mockPrisma.school.findMany.mockResolvedValueOnce([]);
222 |       mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
223 | 
224 |       const result = await service.getSummary('city-1');
225 |       expect(result.monthlyKpi.revenue).toBe(15000);
226 |       expect(result.monthlyKpi.profit).toBe(6000);
227 |       expect(result.monthlyKpi.children).toBe(150);
228 |       expect(result.monthlyKpi.count).toBe(2);
229 |     });
230 | 
231 |     it('повертає нулі якщо звітів немає', async () => {
232 |       defaultMocks();
233 |       const result = await service.getSummary('city-1');
234 |       expect(result.monthlyKpi).toEqual({
235 |         revenue: 0,
236 |         profit: 0,
237 |         children: 0,
238 |         count: 0,
239 |       });
240 |     });
241 |   });
242 | 
243 |   describe('getSummary — citiesStats (SUPERADMIN)', () => {
244 |     it('повертає citiesStats для SUPERADMIN', async () => {
245 |       defaultMocks();
246 |       mockPrisma.city.findMany.mockResolvedValueOnce([
247 |         { id: 'c-1', name: 'Львів' },
248 |         { id: 'c-2', name: 'Київ' },
249 |       ]);
250 |       mockPrisma.school.groupBy.mockResolvedValueOnce([
251 |         { cityId: 'c-1', _count: { id: 50 } },
252 |       ]);
253 |       mockPrisma.event.groupBy.mockResolvedValueOnce([
254 |         { cityId: 'c-1', _count: { id: 5 } },
255 |       ]);
256 |       mockPrisma.event.findMany.mockResolvedValueOnce([
257 |         { cityId: 'c-1', report: { totalSum: 20000 } },
258 |       ]);
259 | 
260 |       const result = await service.getSummary(undefined, 'SUPERADMIN');
261 |       expect(result.citiesStats).toHaveLength(2);
262 |       const lviv = result.citiesStats.find((c) => c.cityId === 'c-1');
263 |       expect(lviv?.schoolsCount).toBe(50);
264 |       expect(lviv?.activeEvents).toBe(5);
265 |       expect(lviv?.monthRevenue).toBe(20000);
266 |     });
267 | 
268 |     it('повертає порожній citiesStats для не-SUPERADMIN', async () => {
269 |       defaultMocks();
270 |       const result = await service.getSummary('city-1', 'MANAGER');
271 |       expect(result.citiesStats).toHaveLength(0);
272 |     });
273 |   });
274 | 
275 |   describe('getSummary — кеш', () => {
276 |     it('повертає кешований результат при повторному виклику', async () => {
277 |       defaultMocks();
278 |       await service.getSummary('city-1');
279 |       await service.getSummary('city-1');
280 |       expect(mockPrisma.event.findMany).toHaveBeenCalledTimes(3);
281 |     });
282 |   });
283 | });
284 | 
```

### File: apps/backend/src/dashboard/dashboard.service.ts
```ts
  0 | import { Injectable, Logger } from '@nestjs/common';
  1 | import { Prisma } from '@prisma/client';
  2 | import { PrismaService } from '../prisma/prisma.service';
  3 | const PIPELINE_STAGES = [
  4 |   'BASE',
  5 |   'FIRST_CONTACT',
  6 |   'INTERESTED',
  7 |   'PRE_APPROVAL',
  8 |   'DATE_CONFIRMED',
  9 |   'PREPARATION',
 10 |   'IN_PROGRESS',
 11 |   'DONE',
 12 |   'REPORT',
 13 |   'RE_SALE',
 14 | ];
 15 | 
 16 | const STALE_DAYS = 7;
 17 | 
 18 | export interface DashboardSummary {
 19 |   todayEvents: unknown[];
 20 |   upcomingEvents: unknown[];
 21 |   funnel: Record<string, number>;
 22 |   totalSchools: number;
 23 |   monthlyKpi: {
 24 |     revenue: number;
 25 |     profit: number;
 26 |     children: number;
 27 |     count: number;
 28 |   };
 29 |   staleSchools: unknown[];
 30 |   activityFeed: unknown[];
 31 |   citiesStats: {
 32 |     cityId: string;
 33 |     cityName: string;
 34 |     schoolsCount: number;
 35 |     activeEvents: number;
 36 |     monthRevenue: number;
 37 |   }[];
 38 | }
 39 | 
 40 | @Injectable()
 41 | export class DashboardService {
 42 |   private readonly logger = new Logger(DashboardService.name);
 43 | 
 44 |   constructor(private prisma: PrismaService) {}
 45 | 
 46 |   private cache = new Map<string, { data: DashboardSummary; ts: number }>();
 47 |   private CACHE_TTL = 60_000;
 48 | 
 49 |   async getSummary(cityId?: string, role?: string) {
 50 |     const key = `${cityId ?? 'all'}-${role ?? 'anon'}`;
 51 |     const cached = this.cache.get(key);
 52 |     if (cached && Date.now() - cached.ts < this.CACHE_TTL) {
 53 |       this.logger.debug(`cache hit — ${key}`);
 54 |       return cached.data;
 55 |     }
 56 | 
 57 |     const t0 = Date.now();
 58 |     this.logger.debug(`start — cityId=${cityId ?? 'all'} role=${role}`);
 59 | 
 60 |     const now = new Date();
 61 |     const todayStart = new Date(
 62 |       now.getFullYear(),
 63 |       now.getMonth(),
 64 |       now.getDate(),
 65 |     );
 66 |     const todayEnd = new Date(todayStart);
 67 |     todayEnd.setDate(todayEnd.getDate() + 1);
 68 |     const upcomingEnd = new Date(todayStart);
 69 |     upcomingEnd.setDate(upcomingEnd.getDate() + 6);
 70 | 
 71 |     const staleThreshold = new Date(now);
 72 |     staleThreshold.setDate(staleThreshold.getDate() - STALE_DAYS);
 73 | 
 74 |     const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
 75 |     const monthEnd = new Date(
 76 |       now.getFullYear(),
 77 |       now.getMonth() + 1,
 78 |       0,
 79 |       23,
 80 |       59,
 81 |       59,
 82 |     );
 83 | 
 84 |     const cityFilter = cityId ? { cityId } : {};
 85 |     const isSuperAdmin = role === 'SUPERADMIN';
 86 | 
 87 |     const t1 = Date.now();
 88 |     const [
 89 |       todayEvents,
 90 |       upcomingEvents,
 91 |       funnelRows,
 92 |       monthEvents,
 93 |       staleSchoolsRaw,
 94 |       recentActivity,
 95 |     ] = await Promise.all([
 96 |       this.prisma.event.findMany({
 97 |         where: { ...cityFilter, date: { gte: todayStart, lt: todayEnd } },
 98 |         include: {
 99 |           school: { select: { id: true, name: true } },
100 |           city: { select: { id: true, name: true } },
101 |           crew: {
102 |             include: {
103 |               host: { select: { id: true, name: true } },
104 |               driver: { select: { id: true, name: true } },
105 |             },
106 |           },
107 |         },
108 |         orderBy: { time: 'asc' },
109 |       }),
110 | 
111 |       this.prisma.event.findMany({
112 |         where: { ...cityFilter, date: { gte: todayEnd, lt: upcomingEnd } },
113 |         include: {
114 |           school: { select: { id: true, name: true } },
115 |           city: { select: { id: true, name: true } },
116 |           crew: {
117 |             include: {
118 |               host: { select: { id: true, name: true } },
119 |               driver: { select: { id: true, name: true } },
120 |             },
121 |           },
122 |         },
123 |         orderBy: [{ date: 'asc' }, { time: 'asc' }],
124 |         take: 8,
125 |       }),
126 | 
127 |       cityId
128 |         ? this.prisma.$queryRaw<{ status: string; count: bigint }[]>(Prisma.sql`
129 |             SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
130 |             FROM "School" s
131 |             LEFT JOIN LATERAL (
132 |               SELECT status FROM "Event"
133 |               WHERE "schoolId" = s.id
134 |               ORDER BY date DESC
135 |               LIMIT 1
136 |             ) e ON true
137 |             WHERE s."cityId" = ${cityId}
138 |             GROUP BY e.status
139 |           `)
140 |         : this.prisma.$queryRaw<{ status: string; count: bigint }[]>(Prisma.sql`
141 |             SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
142 |             FROM "School" s
143 |             LEFT JOIN LATERAL (
144 |               SELECT status FROM "Event"
145 |               WHERE "schoolId" = s.id
146 |               ORDER BY date DESC
147 |               LIMIT 1
148 |             ) e ON true
149 |             GROUP BY e.status
150 |           `),
151 | 
152 |       this.prisma.event.findMany({
153 |         where: {
154 |           ...cityFilter,
155 |           status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
156 |           date: { gte: monthStart, lte: monthEnd },
157 |         },
158 |         select: {
159 |           id: true,
160 |           report: {
161 |             select: { totalSum: true, remainderSum: true, childrenCount: true },
162 |           },
163 |         },
164 |       }),
165 | 
166 |       this.prisma.school.findMany({
167 |         where: {
168 |           ...cityFilter,
169 |           events: {
170 |             some: {
171 |               status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] },
172 |               history: { every: { createdAt: { lt: staleThreshold } } },
173 |             },
174 |           },
175 |         },
176 |         include: {
177 |           events: {
178 |             where: { status: { notIn: ['DONE', 'REPORT', 'RE_SALE'] } },
179 |             orderBy: { date: 'desc' },
180 |             take: 1,
181 |             include: {
182 |               history: {
183 |                 orderBy: { createdAt: 'desc' },
184 |                 take: 1,
185 |                 select: { createdAt: true },
186 |               },
187 |             },
188 |           },
189 |         },
190 |         take: 10,
191 |       }),
192 | 
193 |       this.prisma.eventHistory.findMany({
194 |         where: {
195 |           createdAt: { gte: todayStart },
196 |           ...(cityId ? { event: { cityId } } : {}),
197 |         },
198 |         include: {
199 |           event: {
200 |             select: {
201 |               id: true,
202 |               school: { select: { id: true, name: true } },
203 |             },
204 |           },
205 |         },
206 |         orderBy: { createdAt: 'desc' },
207 |         take: 20,
208 |       }),
209 |     ]);
210 |     this.logger.debug(`main Promise.all: ${Date.now() - t1}ms`);
211 | 
212 |     let citiesStats: {
213 |       cityId: string;
214 |       cityName: string;
215 |       schoolsCount: number;
216 |       activeEvents: number;
217 |       monthRevenue: number;
218 |     }[] = [];
219 | 
220 |     if (isSuperAdmin) {
221 |       const t2 = Date.now();
222 |       const [allCities, allSchools, allActiveEvents, allMonthEvents] =
223 |         await Promise.all([
224 |           this.prisma.city.findMany({ select: { id: true, name: true } }),
225 |           this.prisma.school.groupBy({ by: ['cityId'], _count: { id: true } }),
226 |           this.prisma.event.groupBy({
227 |             by: ['cityId'],
228 |             where: {
229 |               status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
230 |             },
231 |             _count: { id: true },
232 |           }),
233 |           this.prisma.event.findMany({
234 |             where: {
235 |               status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
236 |               date: { gte: monthStart, lte: monthEnd },
237 |             },
238 |             select: {
239 |               cityId: true,
240 |               report: { select: { totalSum: true } },
241 |             },
242 |           }),
243 |         ]);
244 |       this.logger.debug(`superadmin queries: ${Date.now() - t2}ms`);
245 | 
246 |       const schoolsIdx = Object.fromEntries(
247 |         allSchools.map((r) => [r.cityId, r._count.id]),
248 |       );
249 |       const activeIdx = Object.fromEntries(
250 |         allActiveEvents.map((r) => [r.cityId, r._count.id]),
251 |       );
252 |       const revenueIdx: Record<string, number> = {};
253 |       for (const ev of allMonthEvents) {
254 |         revenueIdx[ev.cityId] =
255 |           (revenueIdx[ev.cityId] ?? 0) + (ev.report?.totalSum ?? 0);
256 |       }
257 | 
258 |       citiesStats = allCities
259 |         .map((city) => ({
260 |           cityId: city.id,
261 |           cityName: city.name,
262 |           schoolsCount: schoolsIdx[city.id] ?? 0,
263 |           activeEvents: activeIdx[city.id] ?? 0,
264 |           monthRevenue: revenueIdx[city.id] ?? 0,
265 |         }))
266 |         .sort((a, b) => b.monthRevenue - a.monthRevenue);
267 |     }
268 | 
269 |     const funnel: Record<string, number> = {};
270 |     for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
271 |     let totalSchools = 0;
272 |     for (const row of funnelRows) {
273 |       const status = row.status ?? 'BASE';
274 |       const count = Number(row.count);
275 |       if (funnel[status] !== undefined) funnel[status] += count;
276 |       totalSchools += count;
277 |     }
278 | 
279 |     const monthlyKpi = monthEvents.reduce(
280 |       (acc, ev) => {
281 |         acc.revenue += ev.report?.totalSum ?? 0;
282 |         acc.profit += ev.report?.remainderSum ?? 0;
283 |         acc.children += ev.report?.childrenCount ?? 0;
284 |         acc.count += 1;
285 |         return acc;
286 |       },
287 |       { revenue: 0, profit: 0, children: 0, count: 0 },
288 |     );
289 | 
290 |     const staleSchools = staleSchoolsRaw
291 |       .map((school) => {
292 |         const lastHistory = school.events[0]?.history[0];
293 |         const lastActivity = lastHistory?.createdAt ?? null;
294 |         const daysStale = lastActivity
295 |           ? Math.floor(
296 |               (now.getTime() - new Date(lastActivity).getTime()) / 86_400_000,
297 |             )
298 |           : null;
299 |         return {
300 |           id: school.id,
301 |           name: school.name,
302 |           status: school.events[0]?.status ?? null,
303 |           lastActivity,
304 |           daysStale,
305 |         };
306 |       })
307 |       .sort((a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0));
308 | 
309 |     const activityFeed = recentActivity.map((h) => ({
310 |       id: h.id,
311 |       userName: h.userName,
312 |       role: h.role,
313 |       action: h.action,
314 |       comment: h.comment,
315 |       createdAt: h.createdAt,
316 |       schoolId: h.event?.school?.id ?? null,
317 |       schoolName: h.event?.school?.name ?? null,
318 |       eventId: h.event?.id ?? null,
319 |     }));
320 | 
321 |     this.logger.debug(`total: ${Date.now() - t0}ms`);
322 | 
323 |     const result = {
324 |       todayEvents,
325 |       upcomingEvents,
326 |       funnel,
327 |       totalSchools,
328 |       monthlyKpi,
329 |       staleSchools,
330 |       activityFeed,
331 |       citiesStats,
332 |     };
333 | 
334 |     this.cache.set(key, { data: result, ts: Date.now() });
335 |     return result;
336 |   }
337 | }
338 | 
```

### File: apps/backend/src/events/dto/add-comment.dto.ts
```ts
  0 | import { IsString, IsNotEmpty } from 'class-validator';
  1 | 
  2 | export class AddCommentDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   comment: string;
  6 | }
  7 | 
```

### File: apps/backend/src/events/dto/assign-crew.dto.ts
```ts
  0 | import { IsString, IsNotEmpty } from 'class-validator';
  1 | 
  2 | export class AssignCrewDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   crewId: string;
  6 | }
  7 | 
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

### File: apps/backend/src/events/dto/submit-report.dto.spec.ts
```ts
  0 | import 'reflect-metadata';
  1 | import { validate } from 'class-validator';
  2 | import { plainToInstance } from 'class-transformer';
  3 | import { SubmitReportDto } from './submit-report.dto';
  4 | 
  5 | const validPayload = {
  6 |   announcementDone: true,
  7 |   materialShown: true,
  8 |   childrenCount: 100,
  9 |   classesCount: 4,
 10 |   privilegedCount: 5,
 11 |   showingsCount: 2,
 12 |   totalSum: 10000,
 13 |   schoolSum: 2000,
 14 |   remainderSum: 8000,
 15 |   rating: 5,
 16 |   expenses: [],
 17 |   salaries: [],
 18 | };
 19 | 
 20 | describe('SubmitReportDto', () => {
 21 |   it('проходить валідацію з коректними даними', async () => {
 22 |     const dto = plainToInstance(SubmitReportDto, validPayload);
 23 |     const errors = await validate(dto);
 24 |     expect(errors).toHaveLength(0);
 25 |   });
 26 | 
 27 |   it.each([
 28 |     'totalSum',
 29 |     'schoolSum',
 30 |     'childrenCount',
 31 |     'classesCount',
 32 |     'privilegedCount',
 33 |     'showingsCount',
 34 |   ])("відхиляє від'ємне значення поля %s", async (field) => {
 35 |     const dto = plainToInstance(SubmitReportDto, {
 36 |       ...validPayload,
 37 |       [field]: -1,
 38 |     });
 39 |     const errors = await validate(dto);
 40 |     expect(errors.some((e) => e.property === field)).toBe(true);
 41 |   });
 42 | 
 43 |   it("дозволяє remainderSum бути від'ємним (немає @Min обмеження в DTO)", async () => {
 44 |     const dto = plainToInstance(SubmitReportDto, {
 45 |       ...validPayload,
 46 |       remainderSum: -500,
 47 |     });
 48 |     const errors = await validate(dto);
 49 |     expect(errors.some((e) => e.property === 'remainderSum')).toBe(false);
 50 |   });
 51 | 
 52 |   it('відхиляє rating більше 5', async () => {
 53 |     const dto = plainToInstance(SubmitReportDto, {
 54 |       ...validPayload,
 55 |       rating: 6,
 56 |     });
 57 |     const errors = await validate(dto);
 58 |     expect(errors.some((e) => e.property === 'rating')).toBe(true);
 59 |   });
 60 | 
 61 |   it('rating є опціональним', async () => {
 62 |     const { rating, ...rest } = validPayload;
 63 |     const dto = plainToInstance(SubmitReportDto, rest);
 64 |     const errors = await validate(dto);
 65 |     expect(errors).toHaveLength(0);
 66 |   });
 67 | 
 68 |   it('трансформує рядкові числа в number через @Type(() => Number)', async () => {
 69 |     const dto = plainToInstance(SubmitReportDto, {
 70 |       ...validPayload,
 71 |       totalSum: '10000' as unknown as number,
 72 |     });
 73 |     expect(typeof dto.totalSum).toBe('number');
 74 |     expect(dto.totalSum).toBe(10000);
 75 |   });
 76 | 
 77 |   it('відхиляє expense item без amount', async () => {
 78 |     const dto = plainToInstance(SubmitReportDto, {
 79 |       ...validPayload,
 80 |       expenses: [{ category: 'Транспорт', name: 'Пальне' }],
 81 |     });
 82 |     const errors = await validate(dto);
 83 |     expect(errors.some((e) => e.property === 'expenses')).toBe(true);
 84 |   });
 85 | 
 86 |   it("відхиляє від'ємну суму витрати (вкладена валідація ExpenseItemDto)", async () => {
 87 |     const dto = plainToInstance(SubmitReportDto, {
 88 |       ...validPayload,
 89 |       expenses: [{ category: 'Транспорт', name: 'Пальне', amount: -100 }],
 90 |     });
 91 |     const errors = await validate(dto);
 92 |     expect(errors.some((e) => e.property === 'expenses')).toBe(true);
 93 |   });
 94 | 
 95 |   it('відхиляє salary item без userId', async () => {
 96 |     const dto = plainToInstance(SubmitReportDto, {
 97 |       ...validPayload,
 98 |       salaries: [{ name: 'Іван', amount: 500 }],
 99 |     });
100 |     const errors = await validate(dto);
101 |     expect(errors.some((e) => e.property === 'salaries')).toBe(true);
102 |   });
103 | });
104 | 
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
 14 |     this.scheduleDailyCheck();
 15 |   }
 16 | 
 17 |   private scheduleDailyCheck() {
 18 |     const check = async () => {
 19 |       this.logger.log('Автоматична перевірка подій на завтра...');
 20 |       await this.checkEventsForTomorrow();
 21 |     };
 22 | 
 23 |     check();
 24 | 
 25 |     setInterval(check, 24 * 60 * 60 * 1000);
 26 |   }
 27 | 
 28 |   async checkEventsForTomorrow() {
 29 |     const tomorrow = new Date();
 30 |     tomorrow.setDate(tomorrow.getDate() + 1);
 31 |     
 32 |     const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
 33 |     const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));
 34 | 
 35 |     const events = await this.prisma.event.findMany({
 36 |       where: {
 37 |         date: { gte: startOfTomorrow, lte: endOfTomorrow },
 38 |         status: { not: 'RE_SALE' }
 39 |       },
 40 |       include: {
 41 |         crew: { include: { host: true, driver: true } },
 42 |         school: true,
 43 |         city: true
 44 |       }
 45 |     });
 46 | 
 47 |     for (const event of events) {
 48 |       if (event.crew) {
 49 |         await this.sendReminder(event, event.crew.host, 'ведучий');
 50 |         await this.sendReminder(event, event.crew.driver, 'водій');
 51 |       }
 52 |     }
 53 |   }
 54 | 
 55 |   private async sendReminder(event: any, user: any, roleLabel: string) {
 56 |     if (!user || (!user.telegramChatId && !user.telegramId)) return;
 57 | 
 58 |     const chatId = user.telegramChatId || user.telegramId;
 59 |     const message = `🔔 <b>Нагадування про подію!</b>\n\n` +
 60 |       `👤 <b>Роль:</b> ${roleLabel}\n` +
 61 |       `📅 <b>Дата:</b> завтра\n` +
 62 |       `🏫 <b>Заклад:</b> ${event.school?.name || '—'}\n` +
 63 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
 64 |       `📞 <b>Контакт:</b> ${event.contactPhone || '—'}`;
 65 | 
 66 |     try {
 67 |       await this.telegramService.sendMessage(chatId, message);
 68 |     } catch (e) {
 69 |       this.logger.error(`Помилка відправки: ${e}`);
 70 |     }
 71 |   }
 72 | }
 73 | 
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
 21 | import { AssignCrewDto } from './dto/assign-crew.dto';
 22 | import { AddCommentDto } from './dto/add-comment.dto';
 23 | import { RolesGuard } from '../auth/guards/roles.guard';
 24 | import { OwnershipGuard } from '../auth/guards/ownership.guard';
 25 | import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
 26 | 
 27 | @Controller('events')
 28 | @UseGuards(AuthGuard, RolesGuard)
 29 | export class EventsController {
 30 |   constructor(private readonly eventsService: EventsService) {}
 31 | 
 32 |   @Get()
 33 |   findAll(@CurrentUser() user: JwtUser) {
 34 |     return this.eventsService.findAllForUser(user);
 35 |   }
 36 | 
 37 |   @Post()
 38 |   create(@Body() body: CreateEventDto, @CurrentUser() user: JwtUser) {
 39 |     return this.eventsService.create(body, user);
 40 |   }
 41 | 
 42 |   @Get('school/:schoolId')
 43 |   findBySchool(
 44 |     @Param('schoolId') schoolId: string,
 45 |     @Query('minimal') minimal?: string,
 46 |   ) {
 47 |     return this.eventsService.findBySchool(schoolId, minimal === 'true');
 48 |   }
 49 | 
 50 |   @Patch(':id/status')
 51 |   @UseGuards(OwnershipGuard)
 52 |   @CheckOwnership('event')
 53 |   updateStatus(
 54 |     @Param('id') id: string,
 55 |     @Body() body: UpdateStatusDto,
 56 |     @CurrentUser() user: JwtUser,
 57 |   ) {
 58 |     return this.eventsService.updateStatus(
 59 |       id,
 60 |       body.status,
 61 |       body.actionName,
 62 |       body.comment,
 63 |       user,
 64 |     );
 65 |   }
 66 | 
 67 |   @Patch(':id/preparation')
 68 |   @UseGuards(OwnershipGuard)
 69 |   @CheckOwnership('event')
 70 |   updatePreparation(
 71 |     @Param('id') id: string,
 72 |     @Body() body: UpdatePreparationDto,
 73 |   ) {
 74 |     return this.eventsService.updatePreparationStatus(
 75 |       id,
 76 |       body.field,
 77 |       body.status,
 78 |     );
 79 |   }
 80 | 
 81 |   @Post(':id/assign-crew')
 82 |   @UseGuards(OwnershipGuard)
 83 |   @CheckOwnership('event')
 84 |   assignCrew(@Param('id') id: string, @Body() body: AssignCrewDto) {
 85 |     return this.eventsService.assignCrewToEvent(id, body.crewId);
 86 |   }
 87 | 
 88 |   @Post(':id/history')
 89 |   addHistoryComment(
 90 |     @Param('id') id: string,
 91 |     @Body() body: AddCommentDto,
 92 |     @CurrentUser() user: JwtUser,
 93 |   ) {
 94 |     return this.eventsService.addHistoryComment(id, body.comment, user);
 95 |   }
 96 | 
 97 |   @Patch('history/:historyId')
 98 |   updateHistoryComment(
 99 |     @Param('historyId') historyId: string,
100 |     @Body() body: AddCommentDto,
101 |   ) {
102 |     return this.eventsService.updateHistoryComment(historyId, body.comment);
103 |   }
104 | 
105 |   @Delete(':id')
106 |   @UseGuards(OwnershipGuard)
107 |   @CheckOwnership('event')
108 |   remove(@Param('id') id: string) {
109 |     return this.eventsService.remove(id);
110 |   }
111 | 
112 |   @Post(':id/report')
113 |   @UseGuards(OwnershipGuard)
114 |   @CheckOwnership('event')
115 |   submitReport(
116 |     @Param('id') id: string,
117 |     @Body() body: SubmitReportDto,
118 |     @CurrentUser() user: JwtUser,
119 |   ) {
120 |     return this.eventsService.submitReport(id, body, user);
121 |   }
122 | 
123 |   @Get('school/:schoolId/completed')
124 |   findCompletedBySchool(@Param('schoolId') schoolId: string) {
125 |     return this.eventsService.findCompletedBySchool(schoolId);
126 |   }
127 | 
128 |   @Get(':id')
129 |   findOne(@Param('id') id: string) {
130 |     return this.eventsService.findOne(id);
131 |   }
132 | 
133 |   @Patch(':id/reschedule')
134 |   @UseGuards(OwnershipGuard)
135 |   @CheckOwnership('event')
136 |   reschedule(
137 |     @Param('id') id: string,
138 |     @Body() body: RescheduleEventDto,
139 |     @CurrentUser() user: JwtUser,
140 |   ) {
141 |     return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
142 |   }
143 | }
144 | 
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
  1 | import { Prisma } from '@prisma/client';
  2 | import { EventsService } from './events.service';
  3 | import { PrismaService } from '../prisma/prisma.service';
  4 | import { TelegramService } from '../telegram/telegram.service';
  5 | 
  6 | const mockPrisma = {
  7 |   event: {
  8 |     findMany: jest.fn(),
  9 |     findUnique: jest.fn(),
 10 |     create: jest.fn(),
 11 |     update: jest.fn(),
 12 |     delete: jest.fn(),
 13 |   },
 14 |   eventHistory: {
 15 |     create: jest.fn(),
 16 |     findMany: jest.fn(),
 17 |     update: jest.fn(),
 18 |     deleteMany: jest.fn(),
 19 |   },
 20 |   eventPreparation: {
 21 |     findUnique: jest.fn(),
 22 |     create: jest.fn(),
 23 |     update: jest.fn(),
 24 |     deleteMany: jest.fn(),
 25 |   },
 26 |   eventReport: { upsert: jest.fn() },
 27 |   expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
 28 |   salaryItem: { deleteMany: jest.fn(), createMany: jest.fn() },
 29 |   user: {
 30 |     findUnique: jest.fn(),
 31 |     update: jest.fn(),
 32 |   },
 33 | };
 34 | 
 35 | const mockTelegram = { sendMessage: jest.fn() };
 36 | 
 37 | const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' };
 38 | 
 39 | describe('EventsService', () => {
 40 |   let service: EventsService;
 41 | 
 42 |   beforeEach(async () => {
 43 |     jest.clearAllMocks();
 44 |     const module: TestingModule = await Test.createTestingModule({
 45 |       providers: [
 46 |         EventsService,
 47 |         { provide: PrismaService, useValue: mockPrisma },
 48 |         { provide: TelegramService, useValue: mockTelegram },
 49 |       ],
 50 |     }).compile();
 51 |     service = module.get<EventsService>(EventsService);
 52 |   });
 53 | 
 54 |   describe('updateStatus', () => {
 55 |     it('змінює статус і створює запис в історії', async () => {
 56 |       const updatedEvent = {
 57 |         id: 'ev-1',
 58 |         status: 'FIRST_CONTACT',
 59 |         crew: null,
 60 |         history: [{ id: 'h-1', action: 'Знайомство', userId: 'user-1' }],
 61 |       };
 62 |       mockPrisma.event.update.mockResolvedValueOnce(updatedEvent);
 63 | 
 64 |       const result = await service.updateStatus(
 65 |         'ev-1',
 66 |         'FIRST_CONTACT',
 67 |         'Знайомство',
 68 |         'коментар',
 69 |         mockUser,
 70 |       );
 71 | 
 72 |       expect(mockPrisma.event.update).toHaveBeenCalledWith({
 73 |         where: { id: 'ev-1' },
 74 |         data: {
 75 |           status: 'FIRST_CONTACT',
 76 |           history: {
 77 |             create: {
 78 |               action: 'Знайомство',
 79 |               comment: 'коментар',
 80 |               userId: 'user-1',
 81 |               userName: 'Менеджер',
 82 |               role: 'MANAGER',
 83 |             },
 84 |           },
 85 |         },
 86 |         include: expect.any(Object),
 87 |       });
 88 |       expect(result.status).toBe('FIRST_CONTACT');
 89 |     });
 90 | 
 91 |     it('зберігає null comment якщо коментар порожній', async () => {
 92 |       mockPrisma.event.update.mockResolvedValueOnce({
 93 |         id: 'ev-1',
 94 |         status: 'FIRST_CONTACT',
 95 |         crew: null,
 96 |         history: [],
 97 |       });
 98 | 
 99 |       await service.updateStatus(
100 |         'ev-1',
101 |         'FIRST_CONTACT',
102 |         'Дія',
103 |         undefined,
104 |         mockUser,
105 |       );
106 | 
107 |       const callData = mockPrisma.event.update.mock.calls[0][0];
108 |       expect(callData.data.history.create.comment).toBeNull();
109 |     });
110 | 
111 |     it('записує правильного userId з токена', async () => {
112 |       mockPrisma.event.update.mockResolvedValueOnce({
113 |         id: 'ev-1',
114 |         status: 'BASE',
115 |         crew: null,
116 |         history: [],
117 |       });
118 | 
119 |       await service.updateStatus('ev-1', 'BASE', 'Дія', undefined, {
120 |         sub: 'driver-99',
121 |         name: 'Водій',
122 |         role: 'DRIVER',
123 |       });
124 | 
125 |       const callData = mockPrisma.event.update.mock.calls[0][0];
126 |       expect(callData.data.history.create.userId).toBe('driver-99');
127 |       expect(callData.data.history.create.role).toBe('DRIVER');
128 |     });
129 |   });
130 | 
131 |   describe('addHistoryComment', () => {
132 |     it('створює коментар і повертає подію з оновленою історією', async () => {
133 |       mockPrisma.eventHistory.create.mockResolvedValueOnce({ id: 'h-new' });
134 |       mockPrisma.event.findUnique.mockResolvedValueOnce({
135 |         id: 'ev-1',
136 |         history: [{ id: 'h-new', action: 'Коментар', comment: 'тест' }],
137 |       });
138 | 
139 |       const result = await service.addHistoryComment('ev-1', 'тест', mockUser);
140 | 
141 |       expect(mockPrisma.eventHistory.create).toHaveBeenCalledWith({
142 |         data: {
143 |           eventId: 'ev-1',
144 |           action: 'Коментар',
145 |           comment: 'тест',
146 |           userId: 'user-1',
147 |           userName: 'Менеджер',
148 |           role: 'MANAGER',
149 |         },
150 |       });
151 |       expect(result?.history).toHaveLength(1);
152 |     });
153 |   });
154 | 
155 |   describe('submitReport', () => {
156 |     const reportData = {
157 |       announcementDone: true,
158 |       materialShown: true,
159 |       childrenCount: 100,
160 |       classesCount: 4,
161 |       privilegedCount: 5,
162 |       showingsCount: 2,
163 |       totalSum: 10000,
164 |       schoolSum: 2000,
165 |       remainderSum: 8000,
166 |       rating: 9,
167 |       expenses: [],
168 |       salaries: [
169 |         { userId: 'host-1', name: 'Ведучий Тест', amount: 1500 },
170 |         { userId: 'driver-1', name: 'Водій Тест', amount: 1000 },
171 |       ],
172 |     };
173 | 
174 |     it('зберігає звіт через upsert', async () => {
175 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
176 |       mockPrisma.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
177 |       mockPrisma.event.update.mockResolvedValueOnce({
178 |         id: 'ev-1',
179 |         status: 'REPORT',
180 |         report: {},
181 |         history: [],
182 |       });
183 | 
184 |       await service.submitReport('ev-1', reportData, mockUser);
185 | 
186 |       expect(mockPrisma.eventReport.upsert).toHaveBeenCalledWith(
187 |         expect.objectContaining({
188 |           where: { eventId: 'ev-1' },
189 |           update: expect.objectContaining({
190 |             totalSum: 10000,
191 |             remainderSum: 8000,
192 |           }),
193 |           create: expect.objectContaining({
194 |             totalSum: 10000,
195 |             remainderSum: 8000,
196 |           }),
197 |         }),
198 |       );
199 |     });
200 | 
201 |     it('нараховує зарплату користувачам', async () => {
202 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
203 |       mockPrisma.user.update.mockResolvedValue({});
204 |       mockPrisma.event.update.mockResolvedValueOnce({
205 |         id: 'ev-1',
206 |         status: 'REPORT',
207 |         report: {},
208 |         history: [],
209 |       });
210 | 
211 |       await service.submitReport('ev-1', reportData, mockUser);
212 | 
213 |       expect(mockPrisma.user.update).toHaveBeenCalledTimes(2);
214 |       expect(mockPrisma.user.update).toHaveBeenCalledWith({
215 |         where: { id: 'host-1' },
216 |         data: { balance: { increment: 1500 } },
217 |       });
218 |       expect(mockPrisma.user.update).toHaveBeenCalledWith({
219 |         where: { id: 'driver-1' },
220 |         data: { balance: { increment: 1000 } },
221 |       });
222 |     });
223 | 
224 |     it('не нараховує зарплату якщо amount = 0', async () => {
225 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
226 |       mockPrisma.event.update.mockResolvedValueOnce({
227 |         id: 'ev-1',
228 |         status: 'REPORT',
229 |         report: {},
230 |         history: [],
231 |       });
232 | 
233 |       await service.submitReport(
234 |         'ev-1',
235 |         {
236 |           ...reportData,
237 |           salaries: [{ userId: 'host-1', amount: 0 }],
238 |         },
239 |         mockUser,
240 |       );
241 | 
242 |       expect(mockPrisma.user.update).not.toHaveBeenCalled();
243 |     });
244 | 
245 |     it('змінює статус на REPORT після збереження звіту', async () => {
246 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
247 |       mockPrisma.user.update.mockResolvedValue({});
248 |       mockPrisma.event.update.mockResolvedValueOnce({
249 |         id: 'ev-1',
250 |         status: 'REPORT',
251 |         report: {},
252 |         history: [],
253 |       });
254 | 
255 |       const result = await service.submitReport('ev-1', reportData, mockUser);
256 | 
257 |       expect(mockPrisma.event.update).toHaveBeenCalledWith(
258 |         expect.objectContaining({
259 |           where: { id: 'ev-1' },
260 |           data: expect.objectContaining({ status: 'REPORT' }),
261 |         }),
262 |       );
263 |       expect(result.status).toBe('REPORT');
264 |     });
265 | 
266 |     it('не нараховує зарплату якщо salaries порожній', async () => {
267 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
268 |       mockPrisma.event.update.mockResolvedValueOnce({
269 |         id: 'ev-1',
270 |         status: 'REPORT',
271 |         report: {},
272 |         history: [],
273 |       });
274 | 
275 |       await service.submitReport(
276 |         'ev-1',
277 |         { ...reportData, salaries: [] },
278 |         mockUser,
279 |       );
280 | 
281 |       expect(mockPrisma.user.update).not.toHaveBeenCalled();
282 |     });
283 | 
284 |     it('очищує попередні expense/salary записи перед кожною подачею звіту (ідемпотентність редагування)', async () => {
285 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
286 |       mockPrisma.user.update.mockResolvedValue({});
287 |       mockPrisma.event.update.mockResolvedValueOnce({
288 |         id: 'ev-1',
289 |         status: 'REPORT',
290 |         report: {},
291 |         history: [],
292 |       });
293 | 
294 |       await service.submitReport('ev-1', reportData, mockUser);
295 | 
296 |       expect(mockPrisma.expenseItem.deleteMany).toHaveBeenCalledWith({
297 |         where: { reportId: 'ev-1' },
298 |       });
299 |       expect(mockPrisma.salaryItem.deleteMany).toHaveBeenCalledWith({
300 |         where: { reportId: 'ev-1' },
301 |       });
302 |     });
303 | 
304 |     it('deleteMany викликається завжди, навіть якщо expenses і salaries порожні', async () => {
305 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
306 |       mockPrisma.event.update.mockResolvedValueOnce({
307 |         id: 'ev-1',
308 |         status: 'REPORT',
309 |         report: {},
310 |         history: [],
311 |       });
312 | 
313 |       await service.submitReport(
314 |         'ev-1',
315 |         { ...reportData, expenses: [], salaries: [] },
316 |         mockUser,
317 |       );
318 | 
319 |       expect(mockPrisma.expenseItem.deleteMany).toHaveBeenCalled();
320 |       expect(mockPrisma.salaryItem.deleteMany).toHaveBeenCalled();
321 |       expect(mockPrisma.expenseItem.createMany).not.toHaveBeenCalled();
322 |       expect(mockPrisma.salaryItem.createMany).not.toHaveBeenCalled();
323 |     });
324 | 
325 |     it('підставляє категорію "Інше" для витрати без вказаної категорії', async () => {
326 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
327 |       mockPrisma.user.update.mockResolvedValue({});
328 |       mockPrisma.event.update.mockResolvedValueOnce({
329 |         id: 'ev-1',
330 |         status: 'REPORT',
331 |         report: {},
332 |         history: [],
333 |       });
334 | 
335 |       await service.submitReport(
336 |         'ev-1',
337 |         { ...reportData, expenses: [{ name: 'Бензин', amount: 300 }] },
338 |         mockUser,
339 |       );
340 | 
341 |       const call = mockPrisma.expenseItem.createMany.mock.calls[0][0];
342 |       expect(call.data[0].category).toBe('Інше');
343 |     });
344 | 
345 |     it('конвертує суми витрат у Prisma.Decimal з точністю до копійок', async () => {
346 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
347 |       mockPrisma.user.update.mockResolvedValue({});
348 |       mockPrisma.event.update.mockResolvedValueOnce({
349 |         id: 'ev-1',
350 |         status: 'REPORT',
351 |         report: {},
352 |         history: [],
353 |       });
354 | 
355 |       await service.submitReport(
356 |         'ev-1',
357 |         {
358 |           ...reportData,
359 |           expenses: [{ category: 'Транспорт', name: 'Бензин', amount: 349.99 }],
360 |         },
361 |         mockUser,
362 |       );
363 | 
364 |       const call = mockPrisma.expenseItem.createMany.mock.calls[0][0];
365 |       expect(call.data[0].amount).toBeInstanceOf(Prisma.Decimal);
366 |       expect(call.data[0].amount.toString()).toBe('349.99');
367 |     });
368 | 
369 |     it('обробляє відсутність суми витрати (amount undefined -> 0)', async () => {
370 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
371 |       mockPrisma.user.update.mockResolvedValue({});
372 |       mockPrisma.event.update.mockResolvedValueOnce({
373 |         id: 'ev-1',
374 |         status: 'REPORT',
375 |         report: {},
376 |         history: [],
377 |       });
378 | 
379 |       await service.submitReport(
380 |         'ev-1',
381 |         {
382 |           ...reportData,
383 |           expenses: [
384 |             {
385 |               category: 'Інше',
386 |               name: 'Без суми',
387 |               amount: undefined as unknown as number,
388 |             },
389 |           ],
390 |         },
391 |         mockUser,
392 |       );
393 | 
394 |       const call = mockPrisma.expenseItem.createMany.mock.calls[0][0];
395 |       expect(call.data[0].amount.toString()).toBe('0');
396 |     });
397 | 
398 |     it("не нараховує баланс якщо сума зарплати від'ємна, але запис зберігається", async () => {
399 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
400 |       mockPrisma.event.update.mockResolvedValueOnce({
401 |         id: 'ev-1',
402 |         status: 'REPORT',
403 |         report: {},
404 |         history: [],
405 |       });
406 | 
407 |       await service.submitReport(
408 |         'ev-1',
409 |         {
410 |           ...reportData,
411 |           salaries: [{ userId: 'host-1', name: 'Ведучий Тест', amount: 0 }],
412 |         },
413 |         mockUser,
414 |       );
415 | 
416 |       expect(mockPrisma.salaryItem.createMany).toHaveBeenCalled();
417 |       expect(mockPrisma.user.update).not.toHaveBeenCalled();
418 |     });
419 | 
420 |     it('створює всі salary items одним викликом createMany', async () => {
421 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
422 |       mockPrisma.user.update.mockResolvedValue({});
423 |       mockPrisma.event.update.mockResolvedValueOnce({
424 |         id: 'ev-1',
425 |         status: 'REPORT',
426 |         report: {},
427 |         history: [],
428 |       });
429 | 
430 |       await service.submitReport('ev-1', reportData, mockUser);
431 | 
432 |       expect(mockPrisma.salaryItem.createMany).toHaveBeenCalledTimes(1);
433 |       const call = mockPrisma.salaryItem.createMany.mock.calls[0][0];
434 |       expect(call.data).toHaveLength(2);
435 |     });
436 | 
437 |     it('зберігає totalSum/schoolSum/remainderSum саме такими, як прийшли з фронтенду — бекенд НЕ перераховує арифметику', async () => {
438 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
439 |       mockPrisma.user.update.mockResolvedValue({});
440 |       mockPrisma.event.update.mockResolvedValueOnce({
441 |         id: 'ev-1',
442 |         status: 'REPORT',
443 |         report: {},
444 |         history: [],
445 |       });
446 | 
447 |       // Навмисно неузгоджені дані: 15000 - 3000 = 12000, а не 11500
448 |       await service.submitReport(
449 |         'ev-1',
450 |         {
451 |           ...reportData,
452 |           totalSum: 15000,
453 |           schoolSum: 3000,
454 |           remainderSum: 11500,
455 |         },
456 |         mockUser,
457 |       );
458 | 
459 |       const call = mockPrisma.eventReport.upsert.mock.calls[0][0];
460 |       expect(call.update.remainderSum).toBe(11500);
461 |     });
462 | 
463 |     it('коректно обробляє відсутній rating', async () => {
464 |       const { rating, ...withoutRating } = reportData;
465 |       mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
466 |       mockPrisma.user.update.mockResolvedValue({});
467 |       mockPrisma.event.update.mockResolvedValueOnce({
468 |         id: 'ev-1',
469 |         status: 'REPORT',
470 |         report: {},
471 |         history: [],
472 |       });
473 | 
474 |       await service.submitReport(
475 |         'ev-1',
476 |         withoutRating as typeof reportData,
477 |         mockUser,
478 |       );
479 | 
480 |       const call = mockPrisma.eventReport.upsert.mock.calls[0][0];
481 |       expect(call.update.rating).toBeUndefined();
482 |     });
483 |   });
484 | 
485 |   describe('findBySchool', () => {
486 |     it('minimal=true — використовує select без history/preparation', async () => {
487 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
488 |       await service.findBySchool('school-1', true);
489 |       const call = mockPrisma.event.findMany.mock.calls[0][0];
490 |       expect(call.select).toBeDefined();
491 |       expect(call.include).toBeUndefined();
492 |     });
493 | 
494 |     it('minimal=false — використовує include з history та preparation', async () => {
495 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
496 |       await service.findBySchool('school-1', false);
497 |       const call = mockPrisma.event.findMany.mock.calls[0][0];
498 |       expect(call.include).toBeDefined();
499 |       expect(call.select).toBeUndefined();
500 |     });
501 |   });
502 | });
503 | 
```

### File: apps/backend/src/events/events.service.ts
```ts
  0 | import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
 26 |   async findAllForUser(user: JwtUser) {
 27 |     const isFieldStaff = FIELD_ROLES.includes(user.role);
 28 | 
 29 |     return this.prisma.event.findMany({
 30 |       where: isFieldStaff
 31 |         ? {
 32 |             crew: {
 33 |               OR: [{ hostId: user.sub }, { driverId: user.sub }],
 34 |             },
 35 |           }
 36 |         : {},
 37 |       include: {
 38 |         school: { select: { id: true, name: true, type: true } },
 39 |         city: { select: { id: true, name: true } },
 40 |         crew: {
 41 |           include: {
 42 |             host: { select: { id: true, name: true } },
 43 |             driver: { select: { id: true, name: true } },
 44 |           },
 45 |         },
 46 |       },
 47 |       orderBy: { date: 'asc' },
 48 |     });
 49 |   }
 50 | 
 51 |   async create(data: CreateEventDto, user: JwtUser) {
 52 |     return this.prisma.event.create({
 53 |       data: {
 54 |         ...data,
 55 |         status: 'BASE' as never,
 56 |         date: new Date(data.date),
 57 |         history: {
 58 |           create: {
 59 |             action: 'Створено подію. Етап: База',
 60 |             userId: user.sub,
 61 |             userName: user.name,
 62 |             role: user.role,
 63 |           },
 64 |         },
 65 |       },
 66 |       include: { history: true },
 67 |     });
 68 |   }
 69 | 
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
 85 |             userId: user.sub,
 86 |             userName: user.name,
 87 |             role: user.role,
 88 |           },
 89 |         },
 90 |       },
 91 |       include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
 92 |     });
 93 |   }
 94 | 
 95 |   async updatePreparationStatus(
 96 |     eventId: string,
 97 |     field: string,
 98 |     status: string,
 99 |   ) {
100 |     const existing = await this.prisma.eventPreparation.findUnique({
101 |       where: { eventId },
102 |     });
103 | 
104 |     if (existing) {
105 |       return this.prisma.eventPreparation.update({
106 |         where: { eventId },
107 |         data: { [field]: status },
108 |       });
109 |     } else {
110 |       return this.prisma.eventPreparation.create({
111 |         data: { eventId, [field]: status },
112 |       });
113 |     }
114 |   }
115 | 
116 |   async assignCrewToEvent(eventId: string, crewId: string) {
117 |     const event = await this.prisma.event.update({
118 |       where: { id: eventId },
119 |       data: { crewId: crewId },
120 |       include: {
121 |         crew: { include: { host: true, driver: true } },
122 |         school: true,
123 |         city: true,
124 |         preparation: true,
125 |         history: { orderBy: { createdAt: 'desc' } },
126 |       },
127 |     });
128 | 
129 |     const hostId = event.crew?.hostId;
130 |     const driverId = event.crew?.driverId;
131 | 
132 |     const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
133 |       day: '2-digit',
134 |       month: 'long',
135 |       year: 'numeric',
136 |     });
137 |     const timeStr = event.time ? `, ${event.time}` : '';
138 | 
139 |     const buildMessage = (role: 'ведучий' | 'водій') =>
140 |       `🎯 <b>Вас призначено на подію!</b>\n\n` +
141 |       `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
142 |       `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
143 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
144 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
145 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
146 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
147 |       (event.contactPerson
148 |         ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
149 |         : '') +
150 |       (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
151 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
152 | 
153 |     if (hostId) {
154 |       const hostChatId = await this.getChatIdForUser(hostId);
155 |       this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);
156 | 
157 |       if (hostChatId) {
158 |         await this.telegramService.sendMessage(
159 |           hostChatId,
160 |           buildMessage('ведучий'),
161 |         );
162 |       } else {
163 |         this.logger.warn(
164 |           `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
165 |         );
166 |       }
167 |     }
168 | 
169 |     if (driverId) {
170 |       const driverChatId = await this.getChatIdForUser(driverId);
171 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
172 | 
173 |       if (driverChatId) {
174 |         await this.telegramService.sendMessage(
175 |           driverChatId,
176 |           buildMessage('водій'),
177 |         );
178 |       } else {
179 |         this.logger.warn(
180 |           `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
181 |         );
182 |       }
183 |     }
184 | 
185 |     if (driverId) {
186 |       const driver = await this.prisma.user.findUnique({
187 |         where: { id: driverId },
188 |       });
189 |       this.logger.log(
190 |         `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
191 |       );
192 |       const driverChatId =
193 |         driver?.telegramChatId ||
194 |         (driver?.telegramId && /^\d+$/.test(driver.telegramId)
195 |           ? driver.telegramId
196 |           : null);
197 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
198 |       if (driverChatId) {
199 |         await this.telegramService.sendMessage(
200 |           driverChatId,
201 |           buildMessage('водій'),
202 |         );
203 |       }
204 |     }
205 | 
206 |     return event;
207 |   }
208 | 
209 |   async rescheduleEvent(
210 |     eventId: string,
211 |     newDate: string,
212 |     newTime: string,
213 |     user: JwtUser,
214 |   ) {
215 |     const event = await this.prisma.event.update({
216 |       where: { id: eventId },
217 |       data: {
218 |         date: new Date(newDate),
219 |         time: newTime,
220 |         history: {
221 |           create: {
222 |             action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
223 |             userId: user.sub,
224 |             userName: user.name,
225 |             role: user.role,
226 |           },
227 |         },
228 |       },
229 |       include: {
230 |         crew: { include: { host: true, driver: true } },
231 |         school: true,
232 |         city: true,
233 |         history: { orderBy: { createdAt: 'desc' } },
234 |       },
235 |     });
236 | 
237 |     const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
238 |       day: '2-digit',
239 |       month: 'long',
240 |       year: 'numeric',
241 |     });
242 |     const msg =
243 |       `📅 <b>Подію перенесено!</b>\n\n` +
244 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
245 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
246 |       `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
247 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
248 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
249 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
250 | 
251 |     const sendTo = async (userId: string | null | undefined) => {
252 |       if (!userId) return;
253 |       const u = await this.prisma.user.findUnique({ where: { id: userId } });
254 |       const chatId =
255 |         u?.telegramChatId ||
256 |         (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
257 |       if (chatId) await this.telegramService.sendMessage(chatId, msg);
258 |     };
259 | 
260 |     await sendTo(event.crew?.hostId);
261 |     await sendTo(event.crew?.driverId);
262 | 
263 |     return event;
264 |   }
265 | 
266 |   async getChatIdForUser(userId: string): Promise<string | null> {
267 |     const user = await this.prisma.user.findUnique({ where: { id: userId } });
268 |     if (!user) return null;
269 | 
270 |     if (user.telegramChatId) return user.telegramChatId;
271 | 
272 |     if (user.telegramId && /^\d+$/.test(user.telegramId))
273 |       return user.telegramId;
274 | 
275 |     return null;
276 |   }
277 | 
278 |   async findBySchool(schoolId: string, minimal = false) {
279 |     if (minimal) {
280 |       return this.prisma.event.findMany({
281 |         where: { schoolId },
282 |         select: {
283 |           id: true,
284 |           project: true,
285 |           date: true,
286 |           time: true,
287 |           status: true,
288 |           price: true,
289 |           childrenPlanned: true,
290 |           address: true,
291 |           contactPerson: true,
292 |           contactPhone: true,
293 |           crewId: true,
294 |           crew: {
295 |             select: { id: true, name: true, hostId: true, driverId: true },
296 |           },
297 |         },
298 |         orderBy: { date: 'desc' },
299 |       });
300 |     }
301 |     return this.prisma.event.findMany({
302 |       where: { schoolId },
303 |       include: {
304 |         crew: { include: { host: true, driver: true } },
305 |         history: { orderBy: { createdAt: 'desc' } },
306 |         preparation: true,
307 |       },
308 |       orderBy: { date: 'desc' },
309 |     });
310 |   }
311 | 
312 |   async updateHistoryComment(historyId: string, comment: string) {
313 |     return this.prisma.eventHistory.update({
314 |       where: { id: historyId },
315 |       data: { comment: comment || null },
316 |     });
317 |   }
318 | 
319 |   async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
320 |     await this.prisma.eventHistory.create({
321 |       data: {
322 |         eventId,
323 |         action: 'Коментар',
324 |         comment,
325 |         userId: user.sub,
326 |         userName: user.name,
327 |         role: user.role,
328 |       },
329 |     });
330 | 
331 |     return this.prisma.event.findUnique({
332 |       where: { id: eventId },
333 |       include: {
334 |         history: { orderBy: { createdAt: 'desc' } },
335 |       },
336 |     });
337 |   }
338 | 
339 |   async remove(id: string) {
340 |     const exists = await this.prisma.event.findUnique({ where: { id } });
341 |     if (!exists) throw new NotFoundException('Подію не знайдено');
342 | 
343 |     await this.prisma.eventHistory.deleteMany({
344 |       where: { eventId: id },
345 |     });
346 | 
347 |     await this.prisma.eventPreparation.deleteMany({
348 |       where: { eventId: id },
349 |     });
350 | 
351 |     return this.prisma.event.delete({
352 |       where: { id },
353 |     });
354 |   }
355 | 
356 |   async submitReport(
357 |     eventId: string,
358 |     reportData: SubmitReportDto,
359 |     user: JwtUser,
360 |   ) {
361 |     await this.prisma.eventReport.upsert({
362 |       where: { eventId },
363 |       update: {
364 |         announcementDone: reportData.announcementDone,
365 |         materialShown: reportData.materialShown,
366 |         childrenCount: reportData.childrenCount,
367 |         classesCount: reportData.classesCount,
368 |         privilegedCount: reportData.privilegedCount,
369 |         showingsCount: reportData.showingsCount,
370 |         totalSum: reportData.totalSum,
371 |         schoolSum: reportData.schoolSum,
372 |         remainderSum: reportData.remainderSum,
373 |         rating: reportData.rating,
374 |       },
375 |       create: {
376 |         eventId,
377 |         announcementDone: reportData.announcementDone,
378 |         materialShown: reportData.materialShown,
379 |         childrenCount: reportData.childrenCount,
380 |         classesCount: reportData.classesCount,
381 |         privilegedCount: reportData.privilegedCount,
382 |         showingsCount: reportData.showingsCount,
383 |         totalSum: reportData.totalSum,
384 |         schoolSum: reportData.schoolSum,
385 |         remainderSum: reportData.remainderSum,
386 |         rating: reportData.rating,
387 |       },
388 |     });
389 | 
390 |     await this.prisma.expenseItem.deleteMany({ where: { reportId: eventId } });
391 |     await this.prisma.salaryItem.deleteMany({ where: { reportId: eventId } });
392 | 
393 |     if (reportData.expenses?.length) {
394 |       await this.prisma.expenseItem.createMany({
395 |         data: reportData.expenses.map((exp: ExpenseItemDto) => ({
396 |           reportId: eventId,
397 |           category: exp.category || 'Інше',
398 |           name: exp.name,
399 |           amount: new Prisma.Decimal(exp.amount || 0),
400 |         })),
401 |       });
402 |     }
403 | 
404 |     if (reportData.salaries?.length) {
405 |       await this.prisma.salaryItem.createMany({
406 |         data: reportData.salaries.map((s: SalaryItemDto) => ({
407 |           reportId: eventId,
408 |           userId: s.userId,
409 |           userName: s.name,
410 |           amount: new Prisma.Decimal(s.amount || 0),
411 |           role: s.role,
412 |         })),
413 |       });
414 | 
415 |       await Promise.all(
416 |         reportData.salaries
417 |           .filter((s) => s.userId && s.amount > 0)
418 |           .map((s) =>
419 |             this.prisma.user.update({
420 |               where: { id: s.userId },
421 |               data: { balance: { increment: s.amount } },
422 |             }),
423 |           ),
424 |       );
425 |     }
426 | 
427 |     return this.prisma.event.update({
428 |       where: { id: eventId },
429 |       data: {
430 |         status: 'REPORT' as never,
431 |         history: {
432 |           create: {
433 |             action: 'Сформовано звіт. Етап: Звіт',
434 |             userId: user.sub,
435 |             userName: user.name,
436 |             role: user.role,
437 |           },
438 |         },
439 |       },
440 |       include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
441 |     });
442 |   }
443 | 
444 |   async findOne(id: string) {
445 |     const event = await this.prisma.event.findUnique({
446 |       where: { id },
447 |       include: {
448 |         school: true,
449 |         city: true,
450 |         crew: {
451 |           include: {
452 |             host: { select: { id: true, name: true } },
453 |             driver: { select: { id: true, name: true } },
454 |           },
455 |         },
456 |         report: true,
457 |       },
458 |     });
459 |     if (!event) throw new NotFoundException('Подію не знайдено');
460 |     return event;
461 |   }
462 | 
463 |   async findCompletedBySchool(schoolId: string) {
464 |     return this.prisma.event.findMany({
465 |       where: { schoolId, status: 'RE_SALE' },
466 |       select: {
467 |         id: true,
468 |         project: true,
469 |         date: true,
470 |         status: true,
471 |         price: true,
472 |         childrenPlanned: true,
473 |         report: {
474 |           select: {
475 |             childrenCount: true,
476 |             classesCount: true,
477 |             privilegedCount: true,
478 |             showingsCount: true,
479 |             totalSum: true,
480 |             schoolSum: true,
481 |             remainderSum: true,
482 |             rating: true,
483 |             expenseItems: {
484 |               select: { category: true, name: true, amount: true },
485 |             },
486 |           },
487 |         },
488 |         history: { orderBy: { createdAt: 'asc' } },
489 |       },
490 |       orderBy: { date: 'desc' },
491 |     });
492 |   }
493 | }
494 | 
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
  8 |   @IsPositive()
  9 |   amount: number;
 10 | 
 11 |   @IsString()
 12 |   @IsNotEmpty()
 13 |   reportId: string;
 14 | }
 15 | 
```

### File: apps/backend/src/finance/dto/finance-dashboard-query.dto.ts
```ts
  0 | import { IsOptional, IsString } from 'class-validator';
  1 | 
  2 | export class FinanceDashboardQueryDto {
  3 |   @IsOptional()
  4 |   @IsString()
  5 |   period?: string;
  6 | 
  7 |   @IsOptional()
  8 |   @IsString()
  9 |   cityId?: string;
 10 | 
 11 |   @IsOptional()
 12 |   @IsString()
 13 |   project?: string;
 14 | 
 15 |   @IsOptional()
 16 |   @IsString()
 17 |   minimal?: string;
 18 | }
 19 | 
```

### File: apps/backend/src/finance/dto/staff-revenue-query.dto.ts
```ts
  0 | import { IsOptional, IsString } from 'class-validator';
  1 | 
  2 | export class StaffRevenueQueryDto {
  3 |   @IsOptional()
  4 |   @IsString()
  5 |   period?: string;
  6 | 
  7 |   @IsOptional()
  8 |   @IsString()
  9 |   cityId?: string;
 10 | }
 11 | 
```

### File: apps/backend/src/finance/finance.controller.ts
```ts
  0 | import { Controller, Get, Query, UseGuards } from '@nestjs/common';
  1 | import { FinanceService } from './finance.service';
  2 | import { AuthGuard } from '../auth/auth.guard';
  3 | import { CurrentUser } from '../auth/decorators/current-user.decorator';
  4 | import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
  5 | import { FinanceDashboardQueryDto } from './dto/finance-dashboard-query.dto';
  6 | import { StaffRevenueQueryDto } from './dto/staff-revenue-query.dto';
  7 | import { PrismaService } from '../prisma/prisma.service';
  8 | import { RolesGuard } from '../auth/guards/roles.guard';
  9 | import { Roles } from '../auth/decorators/roles.decorator';
 10 | 
 11 | @Controller('finance')
 12 | @UseGuards(AuthGuard, RolesGuard)
 13 | export class FinanceController {
 14 |   constructor(
 15 |     private readonly financeService: FinanceService,
 16 |     private readonly prisma: PrismaService,
 17 |   ) {}
 18 | 
 19 |   private async resolveCityId(
 20 |     user: JwtUser,
 21 |     requestedCityId?: string,
 22 |   ): Promise<string | undefined> {
 23 |     if (user.role === 'SUPERADMIN') return requestedCityId;
 24 |     const me = await this.prisma.user.findUnique({
 25 |       where: { id: user.sub },
 26 |       select: { cityId: true },
 27 |     });
 28 |     return me?.cityId ?? undefined;
 29 |   }
 30 | 
 31 |   @Get('dashboard')
 32 |   @Roles('SUPERADMIN', 'MANAGER')
 33 |   async getDashboard(
 34 |     @Query() query: FinanceDashboardQueryDto,
 35 |     @CurrentUser() user: JwtUser,
 36 |   ) {
 37 |     const cityId = await this.resolveCityId(user, query.cityId);
 38 |     return this.financeService.getDashboard({
 39 |       period: query.period,
 40 |       cityId,
 41 |       project: query.project,
 42 |       minimal: query.minimal === 'true',
 43 |     });
 44 |   }
 45 | 
 46 |   @Get('my-balance')
 47 |   getMyBalance(@CurrentUser() user: JwtUser) {
 48 |     return this.financeService.getMyBalance(user.sub);
 49 |   }
 50 | 
 51 |   @Get('staff-revenue')
 52 |   @Roles('SUPERADMIN', 'MANAGER')
 53 |   async getStaffRevenue(
 54 |     @Query() query: StaffRevenueQueryDto,
 55 |     @CurrentUser() user: JwtUser,
 56 |   ) {
 57 |     const cityId = await this.resolveCityId(user, query.cityId);
 58 |     return this.financeService.getStaffRevenue({ ...query, cityId });
 59 |   }
 60 | }
 61 | 
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
  9 | 
 10 |   event: {
 11 |     aggregate: jest.fn(),
 12 |     findMany: jest.fn(),
 13 |     count: jest.fn(),
 14 |   },
 15 | 
 16 |   expenseItem: {
 17 |     findMany: jest.fn(),
 18 |     aggregate: jest.fn(),
 19 |   },
 20 | 
 21 |   salaryItem: {
 22 |     findMany: jest.fn(),
 23 |     aggregate: jest.fn(),
 24 |   },
 25 | 
 26 |   city: {
 27 |     findMany: jest.fn(),
 28 |   },
 29 | 
 30 |   user: {
 31 |     findUnique: jest.fn(),
 32 |   },
 33 | 
 34 |   $queryRaw: jest.fn(),
 35 | };
 36 | 
 37 | describe('FinanceService', () => {
 38 |   let service: FinanceService;
 39 | 
 40 |   beforeEach(async () => {
 41 |     jest.clearAllMocks();
 42 |     const module: TestingModule = await Test.createTestingModule({
 43 |       providers: [
 44 |         FinanceService,
 45 |         { provide: PrismaService, useValue: mockPrisma },
 46 |       ],
 47 |     }).compile();
 48 |     service = module.get<FinanceService>(FinanceService);
 49 |     (service as any).cache.clear();
 50 |   });
 51 | 
 52 |   const defaultMocks = () => {
 53 |     mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
 54 |       _sum: { totalSum: 50000, remainderSum: 20000 },
 55 |       _count: { eventId: 10 },
 56 |     });
 57 |     mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
 58 |     mockPrisma.$queryRaw
 59 |       .mockResolvedValueOnce([])
 60 |       .mockResolvedValueOnce([])
 61 |       .mockResolvedValueOnce([])
 62 |       .mockResolvedValueOnce([]);
 63 |     mockPrisma.event.aggregate.mockResolvedValueOnce({
 64 |       _sum: { price: 30000 },
 65 |     });
 66 |     mockPrisma.event.findMany.mockResolvedValueOnce([]);
 67 |     mockPrisma.city.findMany.mockResolvedValueOnce([]);
 68 |     mockPrisma.eventReport.findMany
 69 |       .mockResolvedValueOnce([])
 70 |       .mockResolvedValueOnce([]);
 71 |     mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
 72 | 
 73 |     mockPrisma.salaryItem.findMany.mockResolvedValueOnce([]);
 74 | 
 75 |     mockPrisma.expenseItem.aggregate.mockResolvedValueOnce({
 76 |       _sum: {
 77 |         amount: 0,
 78 |       },
 79 |     });
 80 | 
 81 |     mockPrisma.salaryItem.aggregate.mockResolvedValueOnce({
 82 |       _sum: {
 83 |         amount: 0,
 84 |       },
 85 |     });
 86 |   };
 87 | 
 88 |   describe('getDashboard — KPI', () => {
 89 |     it('коректно повертає KPI з aggregate', async () => {
 90 |       defaultMocks();
 91 |       const result = await service.getDashboard({});
 92 |       expect(result.kpi.totalRevenue).toBe(50000);
 93 |       expect(result.kpi.totalProfit).toBe(20000);
 94 |       expect(result.kpi.totalEvents).toBe(10);
 95 |     });
 96 | 
 97 |     it('повертає нулі якщо звітів немає', async () => {
 98 |       mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
 99 |         _sum: { totalSum: null, remainderSum: null },
100 |         _count: { eventId: 0 },
101 |       });
102 |       mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
103 |       mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
104 |       mockPrisma.$queryRaw
105 |         .mockResolvedValueOnce([])
106 |         .mockResolvedValueOnce([])
107 |         .mockResolvedValueOnce([])
108 |         .mockResolvedValueOnce([]);
109 |       mockPrisma.event.aggregate.mockResolvedValueOnce({
110 |         _sum: { price: null },
111 |       });
112 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
113 |       mockPrisma.city.findMany.mockResolvedValueOnce([]);
114 |       mockPrisma.eventReport.findMany
115 |         .mockResolvedValueOnce([])
116 |         .mockResolvedValueOnce([]);
117 | 
118 |       const result = await service.getDashboard({});
119 |       expect(result.kpi.totalRevenue).toBe(0);
120 |       expect(result.kpi.totalProfit).toBe(0);
121 |       expect(result.kpi.totalEvents).toBe(0);
122 |     });
123 |   });
124 | 
125 |   describe('getDashboard — фільтри', () => {
126 |     it('передає cityId у where для Prisma', async () => {
127 |       defaultMocks();
128 |       await service.getDashboard({ cityId: 'city-1' });
129 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
130 |       expect(aggregateCall.where.event.cityId).toBe('city-1');
131 |     });
132 | 
133 |     it('передає project у where для Prisma', async () => {
134 |       defaultMocks();
135 |       await service.getDashboard({ project: 'Голограма' });
136 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
137 |       expect(aggregateCall.where.event.project).toBe('Голограма');
138 |     });
139 | 
140 |     it('period=month генерує dateFrom з початку місяця', async () => {
141 |       defaultMocks();
142 |       await service.getDashboard({ period: 'month' });
143 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
144 |       const dateFrom = aggregateCall.where.event.date?.gte;
145 |       expect(dateFrom).toBeDefined();
146 |       const now = new Date();
147 |       expect(dateFrom.getMonth()).toBe(now.getMonth());
148 |       expect(dateFrom.getDate()).toBe(1);
149 |     });
150 | 
151 |     it('period=year генерує dateFrom з 1 січня', async () => {
152 |       defaultMocks();
153 |       await service.getDashboard({ period: 'year' });
154 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
155 |       const dateFrom = aggregateCall.where.event.date?.gte;
156 |       expect(dateFrom.getMonth()).toBe(0);
157 |       expect(dateFrom.getDate()).toBe(1);
158 |     });
159 | 
160 |     it('без period — dateFrom undefined', async () => {
161 |       defaultMocks();
162 |       await service.getDashboard({});
163 |       const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
164 |       expect(aggregateCall.where.event.date).toBeUndefined();
165 |     });
166 |   });
167 | 
168 |   describe('getDashboard — minimal режим', () => {
169 |     it('minimal=true не запитує topSchools/topCities/byProject', async () => {
170 |       mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
171 |         _sum: { totalSum: 10000, remainderSum: 4000 },
172 |         _count: { eventId: 2 },
173 |       });
174 |       mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
175 |       mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
176 |       mockPrisma.$queryRaw.mockResolvedValueOnce([]);
177 |       mockPrisma.event.aggregate.mockResolvedValueOnce({
178 |         _sum: { price: 5000 },
179 |       });
180 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
181 |       mockPrisma.city.findMany.mockResolvedValueOnce([]);
182 | 
183 |       const result = await service.getDashboard({ minimal: true });
184 | 
185 |       expect(result).toHaveProperty('kpi');
186 |       expect(result).toHaveProperty('monthly');
187 |       expect(result).not.toHaveProperty('topSchools');
188 |       expect(result).not.toHaveProperty('topCities');
189 |       expect(result).not.toHaveProperty('byProject');
190 | 
191 |       expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);
192 |     });
193 |   });
194 | 
195 |   describe('getDashboard — витрати по категоріях', () => {
196 |     it('агрегує витрати по категоріях', async () => {
197 |       mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
198 |         _sum: { totalSum: 10000, remainderSum: 4000 },
199 |         _count: { eventId: 2 },
200 |       });
201 |       mockPrisma.expenseItem.findMany.mockResolvedValueOnce([
202 |         { category: 'Паливо', amount: 500 },
203 |         { category: 'Паливо', amount: 300 },
204 |         { category: 'Реклама', amount: 200 },
205 |       ]);
206 |       mockPrisma.$queryRaw
207 |         .mockResolvedValueOnce([])
208 |         .mockResolvedValueOnce([])
209 |         .mockResolvedValueOnce([])
210 |         .mockResolvedValueOnce([]);
211 |       mockPrisma.event.aggregate.mockResolvedValueOnce({ _sum: { price: 0 } });
212 |       mockPrisma.event.findMany.mockResolvedValueOnce([]);
213 |       mockPrisma.city.findMany.mockResolvedValueOnce([]);
214 |       mockPrisma.eventReport.findMany
215 |         .mockResolvedValueOnce([])
216 |         .mockResolvedValueOnce([]);
217 | 
218 |       const result = await service.getDashboard({});
219 |       const fuel = result.byExpenseCategory.find(
220 |         (c: any) => c.name === 'Паливо',
221 |       );
222 |       const ads = result.byExpenseCategory.find(
223 |         (c: any) => c.name === 'Реклама',
224 |       );
225 |       expect(fuel?.value).toBe(800);
226 |       expect(ads?.value).toBe(200);
227 |       expect(result.kpi.totalExpenses).toBe(1000);
228 |     });
229 |   });
230 | 
231 |   describe('getDashboard — кеш', () => {
232 |     it('повторний виклик з тими ж параметрами не робить нових запитів', async () => {
233 |       defaultMocks();
234 |       await service.getDashboard({ cityId: 'city-1' });
235 |       await service.getDashboard({ cityId: 'city-1' });
236 |       expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(1);
237 |     });
238 | 
239 |     it('різні параметри — різні записи в кеші', async () => {
240 |       defaultMocks();
241 |       defaultMocks();
242 |       await service.getDashboard({ cityId: 'city-1' });
243 |       await service.getDashboard({ cityId: 'city-2' });
244 |       expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(2);
245 |     });
246 |   });
247 | 
248 |   describe('getMyBalance', () => {
249 |     it('повертає баланс користувача', async () => {
250 |       mockPrisma.user.findUnique.mockResolvedValueOnce({
251 |         balance: 5000,
252 |         name: 'Іван',
253 |       });
254 |       const result = await service.getMyBalance('user-1');
255 |       expect(result.balance).toBe(5000);
256 |       expect(result.name).toBe('Іван');
257 |     });
258 | 
259 |     it('повертає 0 якщо користувач не знайдений', async () => {
260 |       mockPrisma.user.findUnique.mockResolvedValueOnce(null);
261 |       const result = await service.getMyBalance('unknown');
262 |       expect(result.balance).toBe(0);
263 |     });
264 |   });
265 | 
266 |   describe('resolveDateFrom', () => {
267 |     it('month → перший день поточного місяця', () => {
268 |       const result = (service as any).resolveDateFrom('month');
269 |       const now = new Date();
270 |       expect(result.getFullYear()).toBe(now.getFullYear());
271 |       expect(result.getMonth()).toBe(now.getMonth());
272 |       expect(result.getDate()).toBe(1);
273 |     });
274 | 
275 |     it('quarter → перший день поточного кварталу', () => {
276 |       const result = (service as any).resolveDateFrom('quarter');
277 |       const now = new Date();
278 |       const expectedMonth = Math.floor(now.getMonth() / 3) * 3;
279 |       expect(result.getMonth()).toBe(expectedMonth);
280 |       expect(result.getDate()).toBe(1);
281 |     });
282 | 
283 |     it('year → 1 січня', () => {
284 |       const result = (service as any).resolveDateFrom('year');
285 |       expect(result.getMonth()).toBe(0);
286 |       expect(result.getDate()).toBe(1);
287 |     });
288 | 
289 |     it('undefined → повертає undefined', () => {
290 |       const result = (service as any).resolveDateFrom(undefined);
291 |       expect(result).toBeUndefined();
292 |     });
293 |   });
294 | });
295 | 
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
 20 |   private resolveDateFrom(period?: string): Date | undefined {
 21 |     const now = new Date();
 22 |     if (period === 'month')
 23 |       return new Date(now.getFullYear(), now.getMonth(), 1);
 24 |     if (period === 'quarter')
 25 |       return new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
 26 |     if (period === 'year') return new Date(now.getFullYear(), 0, 1);
 27 |     return undefined;
 28 |   }
 29 |   private buildSqlFilters({
 30 |     dateFrom,
 31 |     cityId,
 32 |     project,
 33 |   }: {
 34 |     dateFrom?: Date;
 35 |     cityId?: string;
 36 |     project?: string;
 37 |   }): Prisma.Sql {
 38 |     const parts: Prisma.Sql[] = [];
 39 |     if (dateFrom) parts.push(Prisma.sql`AND e.date >= ${dateFrom}`);
 40 |     if (cityId) parts.push(Prisma.sql`AND e."cityId" = ${cityId}`);
 41 |     if (project) parts.push(Prisma.sql`AND e.project  = ${project}`);
 42 |     return parts.length ? Prisma.join(parts, ' ') : Prisma.empty;
 43 |   }
 44 | 
 45 |   async getMyBalance(userId: string) {
 46 |     const user = await this.prisma.user.findUnique({
 47 |       where: { id: userId },
 48 |       select: { balance: true, name: true },
 49 |     });
 50 |     return { balance: user?.balance?.toNumber() ?? 0, name: user?.name ?? '' };
 51 |   }
 52 | 
 53 |   async getDashboard({
 54 |     period,
 55 |     cityId,
 56 |     project,
 57 |     minimal = false,
 58 |   }: {
 59 |     period?: string;
 60 |     cityId?: string;
 61 |     project?: string;
 62 |     minimal?: boolean;
 63 |   }) {
 64 |     const cacheKey = `finance:${cityId}:${period}:${project}:${minimal}`;
 65 |     const cached = this.getCached(cacheKey);
 66 |     if (cached) return cached;
 67 | 
 68 |     const dateFrom = this.resolveDateFrom(period);
 69 |     const filters = this.buildSqlFilters({ dateFrom, cityId, project });
 70 | 
 71 |     const baseEventWhere: Prisma.EventWhereInput = {
 72 |       status: 'RE_SALE',
 73 |       ...(dateFrom ? { date: { gte: dateFrom } } : {}),
 74 |       ...(cityId ? { cityId } : {}),
 75 |       ...(project ? { project } : {}),
 76 |     };
 77 | 
 78 |     const kpiAgg = await this.prisma.eventReport.aggregate({
 79 |       where: { event: baseEventWhere },
 80 |       _sum: { totalSum: true, remainderSum: true },
 81 |       _count: { eventId: true },
 82 |     });
 83 | 
 84 |     const totalRevenue = kpiAgg._sum.totalSum ?? 0;
 85 |     const totalProfit = kpiAgg._sum.remainderSum ?? 0;
 86 |     const totalEvents = kpiAgg._count.eventId ?? 0;
 87 | 
 88 |     const expensesRaw = await this.prisma.expenseItem.findMany({
 89 |       where: {
 90 |         report: {
 91 |           event: baseEventWhere,
 92 |         },
 93 |       },
 94 |       select: {
 95 |         category: true,
 96 |         name: true,
 97 |         amount: true,
 98 |       },
 99 |     });
100 | 
101 |     const expCatMap: Record<string, number> = {};
102 |     let totalExpenses = 0;
103 | 
104 |     for (const exp of expensesRaw) {
105 |       const cat: string = exp.category || exp.name || 'Інше';
106 |       const amt: number = Number(exp.amount) || 0;
107 |       expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
108 |       totalExpenses += amt;
109 |     }
110 | 
111 |     const byExpenseCategory = Object.entries(expCatMap).map(
112 |       ([name, value]) => ({
113 |         name,
114 |         value,
115 |       }),
116 |     );
117 |     type MonthlyRow = {
118 |       year: number;
119 |       month: number;
120 |       revenue: number;
121 |       profit: number;
122 |     };
123 |     const monthlyRaw = await this.prisma.$queryRaw<MonthlyRow[]>`
124 |       SELECT
125 |         EXTRACT(YEAR  FROM e.date)::int                   AS year,
126 |         EXTRACT(MONTH FROM e.date)::int                   AS month,
127 |         COALESCE(SUM(r."totalSum"),      0)::float        AS revenue,
128 |         COALESCE(SUM(r."remainderSum"),  0)::float        AS profit
129 |       FROM "Event" e
130 |       JOIN "EventReport" r ON r."eventId" = e.id
131 |       WHERE e.status = 'RE_SALE'
132 |       ${filters}
133 |       GROUP BY year, month
134 |       ORDER BY year, month
135 |     `;
136 | 
137 |     const monthly = monthlyRaw.map((row) => ({
138 |       month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
139 |         month: 'short',
140 |         year: '2-digit',
141 |       }),
142 |       revenue: row.revenue,
143 |       profit: row.profit,
144 |     }));
145 | 
146 |     const plannedAgg = await this.prisma.event.aggregate({
147 |       where: {
148 |         status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
149 |         ...(cityId ? { cityId } : {}),
150 |       },
151 |       _sum: { price: true },
152 |     });
153 |     const expectedRevenue = plannedAgg._sum.price ?? 0;
154 |     const [projectsRaw, cities] = await Promise.all([
155 |       this.prisma.event.findMany({
156 |         select: { project: true },
157 |         distinct: ['project'],
158 |       }),
159 |       this.prisma.city.findMany({ select: { id: true, name: true } }),
160 |     ]);
161 |     const filterOptions = {
162 |       projects: projectsRaw.map((p) => p.project).filter(Boolean),
163 |       cities,
164 |     };
165 | 
166 |     if (minimal) {
167 |       const result = {
168 |         kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
169 |         monthly,
170 |         expectedRevenue,
171 |         filters: filterOptions,
172 |       };
173 |       this.setCached(cacheKey, result);
174 |       return result;
175 |     }
176 | 
177 |     type ProjectRow = { project: string; value: number };
178 |     const byProjectRows = await this.prisma.$queryRaw<ProjectRow[]>`
179 |       SELECT
180 |         COALESCE(e.project, 'Інше')              AS project,
181 |         COALESCE(SUM(r."totalSum"), 0)::float    AS value
182 |       FROM "Event" e
183 |       JOIN "EventReport" r ON r."eventId" = e.id
184 |       WHERE e.status = 'RE_SALE'
185 |       ${filters}
186 |       GROUP BY e.project
187 |       ORDER BY value DESC
188 |     `;
189 |     const byProject = byProjectRows.map((r) => ({
190 |       name: r.project,
191 |       value: r.value,
192 |     }));
193 |     type CityRow = {
194 |       cityId: string;
195 |       name: string;
196 |       revenue: number;
197 |       profit: number;
198 |     };
199 |     const topCitiesRows = await this.prisma.$queryRaw<CityRow[]>`
200 |       SELECT
201 |         e."cityId",
202 |         COALESCE(c.name, '—')                    AS name,
203 |         COALESCE(SUM(r."totalSum"),     0)::float AS revenue,
204 |         COALESCE(SUM(r."remainderSum"), 0)::float AS profit
205 |       FROM "Event" e
206 |       JOIN "EventReport" r ON r."eventId" = e.id
207 |       LEFT JOIN "City" c   ON c.id = e."cityId"
208 |       WHERE e.status = 'RE_SALE'
209 |       ${filters}
210 |       GROUP BY e."cityId", c.name
211 |       ORDER BY revenue DESC
212 |       LIMIT 5
213 |     `;
214 |     const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
215 |       name,
216 |       revenue,
217 |       profit,
218 |     }));
219 | 
220 |     type SchoolRow = {
221 |       schoolId: string;
222 |       name: string;
223 |       count: number;
224 |       revenue: number;
225 |     };
226 |     const topSchoolsRows = await this.prisma.$queryRaw<SchoolRow[]>`
227 |       SELECT
228 |         e."schoolId",
229 |         COALESCE(s.name, '—')                    AS name,
230 |         COUNT(e.id)::int                         AS count,
231 |         COALESCE(SUM(r."totalSum"), 0)::float    AS revenue
232 |       FROM "Event" e
233 |       JOIN "EventReport" r ON r."eventId" = e.id
234 |       LEFT JOIN "School" s ON s.id = e."schoolId"
235 |       WHERE e.status = 'RE_SALE'
236 |       ${filters}
237 |       GROUP BY e."schoolId", s.name
238 |       ORDER BY revenue DESC
239 |       LIMIT 5
240 |     `;
241 |     const topSchools = topSchoolsRows.map(({ name, count, revenue }) => ({
242 |       name,
243 |       count,
244 |       revenue,
245 |     }));
246 | 
247 |     const eventSelect = {
248 |       totalSum: true,
249 |       remainderSum: true,
250 |       event: {
251 |         select: {
252 |           id: true,
253 |           date: true,
254 |           school: { select: { name: true } },
255 |         },
256 |       },
257 |     } satisfies Prisma.EventReportSelect;
258 | 
259 |     const [topEventsRaw, worstEventsRaw] = await Promise.all([
260 |       this.prisma.eventReport.findMany({
261 |         where: { event: baseEventWhere },
262 |         select: eventSelect,
263 |         orderBy: { remainderSum: 'desc' },
264 |         take: 5,
265 |       }),
266 |       this.prisma.eventReport.findMany({
267 |         where: { event: baseEventWhere },
268 |         select: eventSelect,
269 |         orderBy: { remainderSum: 'asc' },
270 |         take: 5,
271 |       }),
272 |     ]);
273 | 
274 |     const mapEvent = (r: (typeof topEventsRaw)[number]) => ({
275 |       id: r.event.id,
276 |       date: r.event.date,
277 |       school: r.event.school?.name ?? '—',
278 |       profit: r.remainderSum ?? 0,
279 |       revenue: r.totalSum ?? 0,
280 |     });
281 | 
282 |     const topEvents = topEventsRaw.map(mapEvent);
283 |     const worstEvents = worstEventsRaw.map(mapEvent);
284 | 
285 |     const result = {
286 |       kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
287 |       monthly,
288 |       byProject,
289 |       byExpenseCategory,
290 |       topCities,
291 |       topSchools,
292 |       topEvents,
293 |       worstEvents,
294 |       expectedRevenue,
295 |       filters: filterOptions,
296 |     };
297 |     this.setCached(cacheKey, result);
298 |     return result;
299 |   }
300 | 
301 |   async getStaffRevenue({
302 |     period,
303 |     cityId,
304 |   }: {
305 |     period?: string;
306 |     cityId?: string;
307 |   }) {
308 |     const dateFrom = this.resolveDateFrom(period);
309 |     const staffFilters = this.buildSqlFilters({ dateFrom, cityId });
310 | 
311 |     type StaffRow = {
312 |       id: string;
313 |       name: string;
314 |       role: 'HOST' | 'DRIVER';
315 |       revenue: number;
316 |       eventsCount: number;
317 |     };
318 | 
319 |     const [hostRows, driverRows, totalAgg, eventsCount] = await Promise.all([
320 |       this.prisma.$queryRaw<StaffRow[]>`
321 |         SELECT
322 |           u.id,
323 |           u.name,
324 |           'HOST'::text                              AS role,
325 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
326 |           COUNT(e.id)::int                          AS "eventsCount"
327 |         FROM "Event" e
328 |         JOIN "Crew"         c ON c.id = e."crewId"
329 |         JOIN "User"         u ON u.id = c."hostId"
330 |         JOIN "EventReport"  r ON r."eventId" = e.id
331 |         WHERE e.status = 'RE_SALE'
332 |         ${staffFilters}
333 |         GROUP BY u.id, u.name
334 |       `,
335 |       this.prisma.$queryRaw<StaffRow[]>`
336 |         SELECT
337 |           u.id,
338 |           u.name,
339 |           'DRIVER'::text                            AS role,
340 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
341 |           COUNT(e.id)::int                          AS "eventsCount"
342 |         FROM "Event" e
343 |         JOIN "Crew"        c ON c.id = e."crewId"
344 |         JOIN "User"        u ON u.id = c."driverId"
345 |         JOIN "EventReport" r ON r."eventId" = e.id
346 |         WHERE e.status = 'RE_SALE'
347 |         ${staffFilters}
348 |         GROUP BY u.id, u.name
349 |       `,
350 |       this.prisma.$queryRaw<[{ revenue: number }]>`
351 |         SELECT COALESCE(SUM(r."totalSum"), 0)::float AS revenue
352 |         FROM "Event" e
353 |         JOIN "EventReport" r ON r."eventId" = e.id
354 |         WHERE e.status = 'RE_SALE'
355 |         ${staffFilters}
356 |       `,
357 |       this.prisma.event.count({
358 |         where: {
359 |           status: 'RE_SALE',
360 |           ...(dateFrom ? { date: { gte: dateFrom } } : {}),
361 |           ...(cityId ? { cityId } : {}),
362 |         },
363 |       }),
364 |     ]);
365 | 
366 |     const staff = [...hostRows, ...driverRows].sort(
367 |       (a, b) => b.revenue - a.revenue,
368 |     );
369 |     const totalRevenue = totalAgg[0]?.revenue ?? 0;
370 | 
371 |     return { staff, totalRevenue, eventsCount };
372 |   }
373 | }
374 | 
```

### File: apps/backend/src/issues/dto/create-issue.dto.ts
```ts
  0 | import {
  1 |   IsString,
  2 |   IsNotEmpty,
  3 |   IsOptional,
  4 |   IsDateString,
  5 | } from 'class-validator';
  6 | 
  7 | export class CreateIssueDto {
  8 |   @IsString()
  9 |   @IsNotEmpty()
 10 |   eventId: string;
 11 | 
 12 |   @IsString()
 13 |   @IsNotEmpty()
 14 |   schoolName: string;
 15 | 
 16 |   @IsString()
 17 |   @IsNotEmpty()
 18 |   eventName: string;
 19 | 
 20 |   @IsString()
 21 |   @IsNotEmpty()
 22 |   message: string;
 23 | 
 24 |   @IsString()
 25 |   @IsNotEmpty()
 26 |   cityId: string;
 27 | 
 28 |   @IsOptional()
 29 |   @IsDateString()
 30 |   deadline?: string;
 31 | 
 32 |   @IsOptional()
 33 |   @IsString()
 34 |   assignedUserId?: string;
 35 | 
 36 |   @IsOptional()
 37 |   @IsString()
 38 |   assignedUserName?: string;
 39 | }
 40 | 
```

### File: apps/backend/src/issues/dto/update-issue-status.dto.ts
```ts
  0 | import { IsString, IsNotEmpty } from 'class-validator';
  1 | 
  2 | export class UpdateIssueStatusDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   status: string;
  6 | }
  7 | 
```

### File: apps/backend/src/issues/issues.controller.ts
```ts
  0 | import {
  1 |   Controller,
  2 |   Post,
  3 |   Get,
  4 |   Patch,
  5 |   Body,
  6 |   Param,
  7 |   Query,
  8 |   UseGuards,
  9 | } from '@nestjs/common';
 10 | import { IssuesService } from './issues.service';
 11 | import { AuthGuard } from '../auth/auth.guard';
 12 | import { CreateIssueDto } from './dto/create-issue.dto';
 13 | import { UpdateIssueStatusDto } from './dto/update-issue-status.dto';
 14 | import { RolesGuard } from '../auth/guards/roles.guard';
 15 | 
 16 | @Controller('issues')
 17 | @UseGuards(AuthGuard, RolesGuard)
 18 | export class IssuesController {
 19 |   constructor(private readonly issuesService: IssuesService) {}
 20 | 
 21 |   @Post()
 22 |   create(@Body() body: CreateIssueDto) {
 23 |     return this.issuesService.create(body);
 24 |   }
 25 | 
 26 |   @Get()
 27 |   findByCityId(@Query('cityId') cityId: string) {
 28 |     return this.issuesService.findByCityId(cityId);
 29 |   }
 30 | 
 31 |   @Patch(':id/status')
 32 |   updateStatus(@Param('id') id: string, @Body() body: UpdateIssueStatusDto) {
 33 |     return this.issuesService.updateStatus(id, body.status);
 34 |   }
 35 | }
 36 | 
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
 66 |     let assigneeChatId: string | null = null;
 67 |     if (data.assignedUserId) {
 68 |       const assignee = await this.prisma.user.findUnique({
 69 |         where: { id: data.assignedUserId },
 70 |         select: { telegramChatId: true, telegramId: true },
 71 |       });
 72 |       assigneeChatId =
 73 |         assignee?.telegramChatId ||
 74 |         (assignee?.telegramId && /^\d+$/.test(assignee.telegramId)
 75 |           ? assignee.telegramId
 76 |           : null);
 77 |     }
 78 | 
 79 |     const deadlineStr = data.deadline
 80 |       ? `\n⏰ <b>Дедлайн:</b> ${new Date(data.deadline).toLocaleDateString('uk-UA')}`
 81 |       : '';
 82 | 
 83 |     const assigneeStr = data.assignedUserName
 84 |       ? `\n👤 <b>Відповідальний:</b> ${data.assignedUserName}`
 85 |       : '';
 86 | 
 87 |     const manager = city?.users?.[0];
 88 |     const managerChatId =
 89 |       manager?.telegramChatId ||
 90 |       (manager?.telegramId && /^\d+$/.test(manager.telegramId)
 91 |         ? manager.telegramId
 92 |         : null);
 93 | 
 94 |     const text =
 95 |       `🚨 <b>Нова проблема!</b>\n\n` +
 96 |       `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
 97 |       `📅 <b>Подія:</b> ${data.eventName}\n\n` +
 98 |       `💬 <b>Повідомлення:</b>\n${data.message}` +
 99 |       deadlineStr +
100 |       assigneeStr +
101 |       (crewMembers.length > 0
102 |         ? `\n\n👥 <b>Екіпаж:</b>\n${crewMembers.join('\n')}`
103 |         : '') +
104 |       `\n\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
105 | 
106 |     if (managerChatId)
107 |       await this.telegramService.sendMessage(managerChatId, text);
108 | 
109 |     if (assigneeChatId && assigneeChatId !== managerChatId) {
110 |       await this.telegramService.sendMessage(assigneeChatId, text);
111 |     }
112 | 
113 |     return issue;
114 |   }
115 | 
116 |   async findByCityId(cityId: string) {
117 |     return this.prisma.issueReport.findMany({
118 |       where: {
119 |         cityId,
120 |         status: { not: 'Виконано' },
121 |       },
122 |       orderBy: { createdAt: 'desc' },
123 |     });
124 |   }
125 | 
126 |   async updateStatus(id: string, status: string) {
127 |     return this.prisma.issueReport.update({
128 |       where: { id },
129 |       data: { status },
130 |     });
131 |   }
132 | }
133 | 
```

### File: apps/backend/src/main.ts
```ts
  0 | import { NestFactory } from '@nestjs/core';
  1 | import { AppModule } from './app.module';
  2 | import { ValidationPipe } from '@nestjs/common';
  3 | import cookieParser from 'cookie-parser';
  4 | 
  5 | async function bootstrap() {
  6 |   const app = await NestFactory.create(AppModule);
  7 |   app.use(cookieParser());
  8 |   app.enableCors({
  9 |     origin: process.env.FRONTEND_URL, // напр. https://crm-tau-nine.vercel.app
 10 |     credentials: true,
 11 |   });
 12 |   app.useGlobalPipes(
 13 |     new ValidationPipe({
 14 |       transform: true,
 15 |       whitelist: true,
 16 |       forbidNonWhitelisted: true,
 17 |     }),
 18 |   );
 19 |   await app.listen(process.env.PORT ?? 3000);
 20 | }
 21 | bootstrap();
 22 | 
```

### File: apps/backend/src/prisma/prisma.mock.ts
```ts
  0 | import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
  1 | import { PrismaService } from './prisma.service';
  2 | export type MockPrismaService = DeepMockProxy<PrismaService>;
  3 | 
  4 | export const createPrismaMock = (): MockPrismaService => {
  5 |   return mockDeep<PrismaService>();
  6 | };
  7 | 
```

### File: apps/backend/src/prisma/prisma.module.ts
```ts
  0 | import { Global, Module } from '@nestjs/common';
  1 | import { PrismaService } from './prisma.service';
  2 | import { OwnershipGuard } from '../auth/guards/ownership.guard';
  3 | 
  4 | @Global()
  5 | @Module({
  6 |   providers: [PrismaService, OwnershipGuard],
  7 |   exports: [PrismaService, OwnershipGuard],
  8 | })
  9 | export class PrismaModule {}
 10 | 
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

### File: apps/backend/src/projects/dto/create-project.dto.ts
```ts
  0 | import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
  1 | 
  2 | export class CreateProjectDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   name: string;
  6 | 
  7 |   @IsOptional()
  8 |   @IsString()
  9 |   color?: string;
 10 | }
 11 | 
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
 13 | import { CreateProjectDto } from './dto/create-project.dto';
 14 | 
 15 | @Controller('projects')
 16 | @UseGuards(AuthGuard, RolesGuard)
 17 | export class ProjectsController {
 18 |   constructor(private readonly projectsService: ProjectsService) {}
 19 | 
 20 |   @Get()
 21 |   findAll() {
 22 |     return this.projectsService.findAll();
 23 |   }
 24 | 
 25 |   @Post()
 26 |   @Roles('SUPERADMIN')
 27 |   create(@Body() body: CreateProjectDto) {
 28 |     return this.projectsService.create(body);
 29 |   }
 30 | 
 31 |   @Delete(':id')
 32 |   @Roles('SUPERADMIN')
 33 |   remove(@Param('id') id: string) {
 34 |     return this.projectsService.remove(id);
 35 |   }
 36 | }
 37 | 
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
 11 |   create(data: { name: string; color?: string }) {
 12 |     return this.prisma.project.create({
 13 |       data: { name: data.name, color: data.color ?? '#3b82f6' },
 14 |     });
 15 |   }
 16 | 
 17 |   remove(id: string) {
 18 |     return this.prisma.project.delete({ where: { id } });
 19 |   }
 20 | }
 21 | 
```

### File: apps/backend/src/schools/dto/bulk-import.dto.ts
```ts
  0 | import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
  1 | 
  2 | export class BulkImportDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   cityId: string;
  6 | 
  7 |   @IsOptional()
  8 |   @IsIn(['Школа', 'Садочок'])
  9 |   type?: 'Школа' | 'Садочок';
 10 | }
 11 | 
```

### File: apps/backend/src/schools/dto/create-school.dto.ts
```ts
  0 | import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
  1 | 
  2 | export class CreateSchoolDto {
  3 |   @IsString()
  4 |   @IsNotEmpty()
  5 |   name: string;
  6 | 
  7 |   @IsString()
  8 |   @IsNotEmpty()
  9 |   type: string;
 10 | 
 11 |   @IsString()
 12 |   @IsNotEmpty()
 13 |   cityId: string;
 14 | 
 15 |   @IsOptional()
 16 |   @IsString()
 17 |   sourceUrl?: string;
 18 | }
 19 | 
```

### File: apps/backend/src/schools/dto/update-school.dto.ts
```ts
  0 | import {
  1 |   IsString,
  2 |   IsOptional,
  3 |   IsInt,
  4 |   IsBoolean,
  5 |   IsEmail,
  6 |   Min,
  7 | } from 'class-validator';
  8 | import { Type } from 'class-transformer';
  9 | 
 10 | export class UpdateSchoolDto {
 11 |   @IsOptional()
 12 |   @IsString()
 13 |   name?: string;
 14 | 
 15 |   @IsOptional()
 16 |   @IsString()
 17 |   type?: string;
 18 | 
 19 |   @IsOptional()
 20 |   @IsString()
 21 |   cityId?: string;
 22 | 
 23 |   @IsOptional()
 24 |   @IsString()
 25 |   address?: string;
 26 | 
 27 |   @IsOptional()
 28 |   @IsString()
 29 |   director?: string;
 30 | 
 31 |   @IsOptional()
 32 |   @IsString()
 33 |   phone?: string;
 34 | 
 35 |   @IsOptional()
 36 |   @IsEmail()
 37 |   email?: string;
 38 | 
 39 |   @IsOptional()
 40 |   @IsString()
 41 |   notes?: string;
 42 | 
 43 |   @IsOptional()
 44 |   @IsInt()
 45 |   @Min(0)
 46 |   @Type(() => Number)
 47 |   childrenCount?: number;
 48 | 
 49 |   @IsOptional()
 50 |   @IsBoolean()
 51 |   isHotClient?: boolean;
 52 | }
 53 | 
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
159 |   async getAllSchoolsForCity(
160 |     cityName: string,
161 |     type: 'Школа' | 'Садочок' = 'Школа',
162 |   ): Promise<{ name: string; url: string }[]> {
163 |     const config = CITY_CONFIG[cityName];
164 |     if (!config) {
165 |       console.log(`Місто "${cityName}" не підтримується для імпорту`);
166 |       return [];
167 |     }
168 | 
169 |     const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
170 |     const domain = config.domain;
171 | 
172 |     const resultsMap = new Map<string, { name: string; url: string }>();
173 | 
174 |     for (let page = 1; page <= 20; page++) {
175 |       const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
176 |       try {
177 |         const response = await axios.get(url, { timeout: 15000 });
178 |         const $ = cheerio.load(response.data);
179 |         let foundOnPage = 0;
180 | 
181 |         $('table.zebra-stripe.list tr').each((_, row) => {
182 |           const name = $(row)
183 |             .find('td:nth-child(2) a')
184 |             .text()
185 |             .replace(/\s+/g, ' ')
186 |             .trim();
187 |           const href = $(row).find('td:nth-child(2) a').attr('href');
188 | 
189 |           if (name && href && name !== 'Fullname') {
190 |             const normalizedKey = name.toLowerCase().replace(/\s+/g, '');
191 | 
192 |             if (!resultsMap.has(normalizedKey)) {
193 |               resultsMap.set(normalizedKey, { name, url: `${domain}${href}` });
194 |               foundOnPage++;
195 |             }
196 |           }
197 |         });
198 | 
199 |         if (foundOnPage === 0) break;
200 |       } catch {
201 |         break;
202 |       }
203 |     }
204 | 
205 |     return Array.from(resultsMap.values());
206 |   }
207 |   getSupportedCities(): string[] {
208 |     return Object.keys(CITY_CONFIG);
209 |   }
210 | }
211 | 
```

### File: apps/backend/src/schools/school-contacts.seed.ts
```ts
  0 | import { PrismaClient } from '@prisma/client';
  1 | 
  2 | const prisma = new PrismaClient();
  3 | 
  4 | const contacts = [
  5 |   {
  6 |     schoolNumber: '1',
  7 |     contactName: 'Надія Михайлівна',
  8 |     phone: '0975695519',
  9 |     role: 'Завуч',
 10 |   },
 11 |   {
 12 |     schoolNumber: '2',
 13 |     contactName: 'Наталя',
 14 |     phone: '0974064095',
 15 |     role: 'Завуч',
 16 |   },
 17 |   {
 18 |     schoolNumber: '5',
 19 |     contactName: 'Лариса',
 20 |     phone: '0673622534',
 21 |     role: 'Директор',
 22 |   },
 23 |   {
 24 |     schoolNumber: '9',
 25 |     contactName: 'Віра Ярославівна',
 26 |     phone: '0674935124',
 27 |     role: 'Директор',
 28 |   },
 29 |   {
 30 |     schoolNumber: '9',
 31 |     contactName: 'Леся',
 32 |     phone: '0673380894',
 33 |     role: 'Завуч',
 34 |   },
 35 |   {
 36 |     schoolNumber: '13',
 37 |     contactName: 'Марта Романівна',
 38 |     phone: '0675839806',
 39 |     role: 'Директор',
 40 |   },
 41 |   {
 42 |     schoolNumber: '15',
 43 |     contactName: 'Ірина Андріївна',
 44 |     phone: '0679062500',
 45 |     role: 'Завуч',
 46 |   },
 47 |   {
 48 |     schoolNumber: '17',
 49 |     contactName: 'Ельвіра',
 50 |     phone: '0678578514',
 51 |     role: 'Педорг',
 52 |   },
 53 |   {
 54 |     schoolNumber: '18',
 55 |     contactName: 'Роман',
 56 |     phone: '0972587179',
 57 |     role: 'Завуч',
 58 |   },
 59 |   {
 60 |     schoolNumber: '20',
 61 |     contactName: 'Наталя Іванівна',
 62 |     phone: '0506747111',
 63 |     role: 'Завуч',
 64 |   },
 65 |   {
 66 |     schoolNumber: '23',
 67 |     contactName: 'Микола Шостак',
 68 |     phone: '0632232178',
 69 |     role: 'Педорг',
 70 |   },
 71 |   {
 72 |     schoolNumber: '27',
 73 |     contactName: 'Романа Михайлівна',
 74 |     phone: '0973113778',
 75 |     role: 'Завуч',
 76 |   },
 77 |   {
 78 |     schoolNumber: '27',
 79 |     contactName: 'Наталя Куліш',
 80 |     phone: '0677552743',
 81 |     role: 'Завуч',
 82 |   },
 83 |   {
 84 |     schoolNumber: '28',
 85 |     contactName: 'Олена Олегівна',
 86 |     phone: '0679243130',
 87 |     role: 'Завуч',
 88 |   },
 89 |   {
 90 |     schoolNumber: '30',
 91 |     contactName: 'Світлана Михальвіна',
 92 |     phone: '0974436542',
 93 |     role: 'Завуч',
 94 |   },
 95 |   {
 96 |     schoolNumber: '30',
 97 |     contactName: 'Ольга Володимирівна',
 98 |     phone: '0679596199',
 99 |     role: 'Завуч',
100 |   },
101 |   {
102 |     schoolNumber: '31',
103 |     contactName: 'Христина Ярославівна',
104 |     phone: '0983804403',
105 |     role: 'Директор',
106 |   },
107 |   {
108 |     schoolNumber: '31',
109 |     contactName: 'Леся Оресівна',
110 |     phone: '0673567679',
111 |     role: 'Завуч',
112 |   },
113 |   {
114 |     schoolNumber: '34',
115 |     contactName: 'Мирон',
116 |     phone: '0938668520',
117 |     role: 'Педорг',
118 |   },
119 |   {
120 |     schoolNumber: '36',
121 |     contactName: 'Тетяна',
122 |     phone: '0990407941',
123 |     role: 'Завуч',
124 |   },
125 |   {
126 |     schoolNumber: '40',
127 |     contactName: 'Юлія',
128 |     phone: '0976015839',
129 |     role: 'Педорг',
130 |   },
131 |   {
132 |     schoolNumber: '40',
133 |     contactName: 'Ірина',
134 |     phone: '0673021531',
135 |     role: 'Педорг',
136 |   },
137 |   {
138 |     schoolNumber: '44',
139 |     contactName: 'Стефанович Людмила Олександрівна',
140 |     phone: '0677838274',
141 |     role: 'Директор',
142 |   },
143 |   {
144 |     schoolNumber: '45',
145 |     contactName: 'Наталія Аркадіївна',
146 |     phone: '0677123961',
147 |     role: 'Завуч',
148 |   },
149 |   {
150 |     schoolNumber: '46',
151 |     contactName: 'Ірина Іларіонівна',
152 |     phone: '0676969337',
153 |     role: 'Завуч',
154 |   },
155 |   {
156 |     schoolNumber: '46',
157 |     contactName: 'Юля',
158 |     phone: '0961791595',
159 |     role: 'Педорг',
160 |   },
161 |   {
162 |     schoolNumber: '48',
163 |     contactName: 'Роман Васильович',
164 |     phone: '0982310957',
165 |     role: 'Директор',
166 |   },
167 |   {
168 |     schoolNumber: '49',
169 |     contactName: 'Уляна',
170 |     phone: '0681371457',
171 |     role: 'Педорг',
172 |   },
173 |   {
174 |     schoolNumber: '50',
175 |     contactName: "Мар'яна Іванівна",
176 |     phone: '0674901746',
177 |     role: 'Завуч',
178 |   },
179 |   {
180 |     schoolNumber: '51',
181 |     contactName: 'Ірина Миколаївна',
182 |     phone: '0972595956',
183 |     role: 'Завуч',
184 |   },
185 |   {
186 |     schoolNumber: '52',
187 |     contactName: 'Світлана',
188 |     phone: '0677070497',
189 |     role: 'Директор',
190 |   },
191 |   {
192 |     schoolNumber: '54',
193 |     contactName: 'Любов Іванівна',
194 |     phone: '0677715647',
195 |     role: 'Завуч',
196 |   },
197 |   {
198 |     schoolNumber: '60',
199 |     contactName: 'Людмила',
200 |     phone: '0973888255',
201 |     role: 'Директор',
202 |   },
203 |   {
204 |     schoolNumber: '63',
205 |     contactName: 'Іванець Ольга Євгенівна',
206 |     phone: '0977345920',
207 |     role: 'Завуч',
208 |   },
209 |   {
210 |     schoolNumber: '65',
211 |     contactName: 'Марія',
212 |     phone: '0975391164',
213 |     role: 'Педорг',
214 |   },
215 |   {
216 |     schoolNumber: '66',
217 |     contactName: 'Мирослава',
218 |     phone: '0977711381',
219 |     role: 'Завуч',
220 |   },
221 |   {
222 |     schoolNumber: '66',
223 |     contactName: 'Назар Оксана',
224 |     phone: '0679686514',
225 |     role: 'Завуч',
226 |   },
227 |   {
228 |     schoolNumber: '67',
229 |     contactName: 'Оксана Володимирівна',
230 |     phone: '0673705262',
231 |     role: 'Завуч',
232 |   },
233 |   {
234 |     schoolNumber: '68',
235 |     contactName: 'Уляна',
236 |     phone: '0973004954',
237 |     role: 'Педорг',
238 |   },
239 |   {
240 |     schoolNumber: '69',
241 |     contactName: 'Тетяна Володимирівна',
242 |     phone: '0673041659',
243 |     role: 'Завуч',
244 |   },
245 |   {
246 |     schoolNumber: '70',
247 |     contactName: 'Марта',
248 |     phone: '0676726984',
249 |     role: 'Директор',
250 |   },
251 |   {
252 |     schoolNumber: '70',
253 |     contactName: 'Марія',
254 |     phone: '0966063264',
255 |     role: 'Завуч',
256 |   },
257 |   {
258 |     schoolNumber: '71',
259 |     contactName: 'Марія',
260 |     phone: '0676644983',
261 |     role: 'Педорг',
262 |   },
263 |   {
264 |     schoolNumber: '71',
265 |     contactName: 'Роман',
266 |     phone: '0677514127',
267 |     role: 'Директор',
268 |   },
269 |   {
270 |     schoolNumber: '72',
271 |     contactName: 'Олена Михайлівна',
272 |     phone: '0677948577',
273 |     role: 'Завуч',
274 |   },
275 |   {
276 |     schoolNumber: '73',
277 |     contactName: 'Світлана Богданівна',
278 |     phone: '0971844043',
279 |     role: 'Директор',
280 |   },
281 |   {
282 |     schoolNumber: '73',
283 |     contactName: 'Інна Євгенівна',
284 |     phone: '0678829581',
285 |     role: 'Завуч',
286 |   },
287 |   {
288 |     schoolNumber: '80',
289 |     contactName: 'Наталя',
290 |     phone: '0967331419',
291 |     role: 'Завуч',
292 |   },
293 |   {
294 |     schoolNumber: '81',
295 |     contactName: 'Галина Антонівна',
296 |     phone: '0673662853',
297 |     role: 'Завуч',
298 |   },
299 |   {
300 |     schoolNumber: '81',
301 |     contactName: 'Андріана',
302 |     phone: '0502867516',
303 |     role: 'Завуч',
304 |   },
305 |   {
306 |     schoolNumber: '84',
307 |     contactName: 'Тетяна Іванівна',
308 |     phone: '0974437171',
309 |     role: 'Завуч',
310 |   },
311 |   {
312 |     schoolNumber: '86',
313 |     contactName: 'Руслана Василівна',
314 |     phone: '0964066413',
315 |     role: 'Директор',
316 |   },
317 |   {
318 |     schoolNumber: '86',
319 |     contactName: 'Анна',
320 |     phone: '0638694484',
321 |     role: 'Педорг',
322 |   },
323 |   {
324 |     schoolNumber: '90',
325 |     contactName: 'Ірина Іванівна',
326 |     phone: '0974392839',
327 |     role: 'Завуч',
328 |   },
329 |   {
330 |     schoolNumber: '90',
331 |     contactName: 'Людмила',
332 |     phone: '0676092693',
333 |     role: 'Завуч',
334 |   },
335 |   {
336 |     schoolNumber: '93',
337 |     contactName: 'Ірина Петрівна',
338 |     phone: '0966591509',
339 |     role: 'Директор',
340 |   },
341 |   {
342 |     schoolNumber: '95',
343 |     contactName: 'Марія Орестівна',
344 |     phone: '0979515318',
345 |     role: 'Завуч',
346 |   },
347 |   {
348 |     schoolNumber: '95',
349 |     contactName: 'Ірина',
350 |     phone: '0972392191',
351 |     role: 'Педорг',
352 |   },
353 |   {
354 |     schoolNumber: '96',
355 |     contactName: 'Любов',
356 |     phone: '0689529174',
357 |     role: 'Педорг',
358 |   },
359 |   {
360 |     schoolNumber: '97',
361 |     contactName: 'Наталя Любомирівна',
362 |     phone: '0961390913',
363 |     role: 'Завуч',
364 |   },
365 |   {
366 |     schoolNumber: '123',
367 |     contactName: 'Марія Андріївна',
368 |     phone: '0679334856',
369 |     role: 'Директор',
370 |   },
371 | 
372 |   {
373 |     schoolNumber: 'Арніка',
374 |     contactName: 'Світлана Михайлівна',
375 |     phone: '0979325399',
376 |     role: 'Педорг',
377 |   },
378 |   {
379 |     schoolNumber: 'Гроно',
380 |     contactName: 'Оксана Теодорівна',
381 |     phone: '0971147211',
382 |     role: 'Завуч',
383 |   },
384 |   {
385 |     schoolNumber: 'Джерельце',
386 |     contactName: 'Світлана Петрівна',
387 |     phone: '0673140267',
388 |     role: 'Завуч',
389 |   },
390 |   {
391 |     schoolNumber: 'Дивосвіт',
392 |     contactName: 'Наталя Миколаївна',
393 |     phone: '0932196651',
394 |     role: 'Педорг',
395 |   },
396 |   {
397 |     schoolNumber: 'Європейський ліцей',
398 |     contactName: 'Галина Богданівна',
399 |     phone: '0974829920',
400 |     role: 'Завуч',
401 |   },
402 |   {
403 |     schoolNumber: 'Лідер',
404 |     contactName: 'Вадим',
405 |     phone: '0687584626',
406 |     role: 'Педорг',
407 |   },
408 |   {
409 |     schoolNumber: 'Лідер',
410 |     contactName: 'Іванка',
411 |     phone: '0965150436',
412 |     role: 'Завуч',
413 |   },
414 |   {
415 |     schoolNumber: 'Ліцей Львів',
416 |     contactName: 'Мирослава Іванівна',
417 |     phone: '0673536774',
418 |     role: 'Завуч',
419 |   },
420 |   {
421 |     schoolNumber: 'Ліцей Пулюя',
422 |     contactName: 'Наталя',
423 |     phone: '0671794604',
424 |     role: 'Завуч',
425 |   },
426 |   {
427 |     schoolNumber: 'Ліцей Стуса',
428 |     contactName: 'Тетяна',
429 |     phone: '0984989494',
430 |     role: 'Завуч',
431 |   },
432 |   {
433 |     schoolNumber: 'Оріяна',
434 |     contactName: 'Ірина Богданівна',
435 |     phone: '0673702402',
436 |     role: 'Директор',
437 |   },
438 |   {
439 |     schoolNumber: 'Оріяна',
440 |     contactName: 'Юрій',
441 |     phone: '0974751935',
442 |     role: 'Педорг',
443 |   },
444 |   {
445 |     schoolNumber: 'Первоцвіт',
446 |     contactName: 'Христина Іванівна',
447 |     phone: '0677573109',
448 |     role: 'Директор',
449 |   },
450 |   {
451 |     schoolNumber: 'Провесінь',
452 |     contactName: 'Сергій',
453 |     phone: '0506020447',
454 |     role: 'Педорг',
455 |   },
456 |   {
457 |     schoolNumber: 'Провесінь',
458 |     contactName: 'Анджела',
459 |     phone: '0676606897',
460 |     role: 'Педорг',
461 |   },
462 |   {
463 |     schoolNumber: 'Світанок',
464 |     contactName: 'Лідія Миколаївна',
465 |     phone: '0679269319',
466 |     role: 'Директор',
467 |   },
468 |   {
469 |     schoolNumber: 'Світанок',
470 |     contactName: 'Ореста Шот',
471 |     phone: '0677018705',
472 |     role: 'Завуч',
473 |   },
474 |   {
475 |     schoolNumber: 'Світанок',
476 |     contactName: 'Ірина',
477 |     phone: '0674398980',
478 |     role: 'Завуч',
479 |   },
480 |   {
481 |     schoolNumber: 'Симоненка',
482 |     contactName: 'Уляна',
483 |     phone: '0969135903',
484 |     role: 'Завуч',
485 |   },
486 |   {
487 |     schoolNumber: 'Сихівський ліцей',
488 |     contactName: 'Надія',
489 |     phone: '0964667179',
490 |     role: 'Завуч',
491 |   },
492 |   {
493 |     schoolNumber: 'Початкова Школа Радості',
494 |     contactName: 'Тетяна',
495 |     phone: '0967320197',
496 |     role: 'Завуч',
497 |   },
498 |   {
499 |     schoolNumber: 'Початкова Школа Радості',
500 |     contactName: 'Наталя',
501 |     phone: '0674244920',
502 |     role: 'Педорг',
503 |   },
504 |   {
505 |     schoolNumber: 'Альфа',
506 |     contactName: 'Ірина',
507 |     phone: '0935122623',
508 |     role: 'Завуч',
509 |   },
510 | 
511 |   {
512 |     schoolNumber: '52',
513 |     contactName: 'Олена Віталіївна Добранюк',
514 |     phone: '0964692943',
515 |     role: 'Завідувачка',
516 |   },
517 |   {
518 |     schoolNumber: 'Веселка',
519 |     contactName: 'Андриц Людмила Федорівна',
520 |     phone: '0632836453',
521 |     role: 'Завідувачка',
522 |   },
523 |   {
524 |     schoolNumber: '149',
525 |     contactName: 'Василина Тарасівна',
526 |     phone: '0987615106',
527 |     role: 'Завідувачка',
528 |   },
529 |   {
530 |     schoolNumber: '132',
531 |     contactName: 'Наталя',
532 |     phone: '0971620805',
533 |     role: 'Методист',
534 |   },
535 |   {
536 |     schoolNumber: 'Перші кроки',
537 |     contactName: 'Мирослава Ярославівна',
538 |     phone: '0963493423',
539 |     role: 'Завідувач',
540 |   },
541 |   {
542 |     schoolNumber: '130',
543 |     contactName: 'Ольга',
544 |     phone: '0638694484',
545 |     role: 'Методистка',
546 |   },
547 |   {
548 |     schoolNumber: '40',
549 |     contactName: 'Світлана',
550 |     phone: '0983365931',
551 |     role: 'Заступник',
552 |   },
553 |   {
554 |     schoolNumber: '144',
555 |     contactName: 'Наталя',
556 |     phone: '0677670485',
557 |     role: 'Методист',
558 |   },
559 |   {
560 |     schoolNumber: 'Барвінок',
561 |     contactName: 'Наталя Витрикуш',
562 |     phone: '0676809966',
563 |     role: 'Завідувачка',
564 |   },
565 |   {
566 |     schoolNumber: '45',
567 |     contactName: 'Наталя Шергіна',
568 |     phone: '0675814381',
569 |     role: 'Директор',
570 |   },
571 |   {
572 |     schoolNumber: '67',
573 |     contactName: 'Тетяна Юріївна',
574 |     phone: '0966063398',
575 |     role: 'Директор',
576 |   },
577 |   {
578 |     schoolNumber: '118',
579 |     contactName: 'Наталя Дмитрівна',
580 |     phone: '0969847495',
581 |     role: 'Директор',
582 |   },
583 |   {
584 |     schoolNumber: '118',
585 |     contactName: 'Оксана Ярославівна',
586 |     phone: '0677881629',
587 |     role: 'Методист',
588 |   },
589 |   {
590 |     schoolNumber: '169',
591 |     contactName: 'Галина Василівна',
592 |     phone: '0962817175',
593 |     role: null,
594 |   },
595 |   {
596 |     schoolNumber: '175',
597 |     contactName: 'Богдана',
598 |     phone: '0687096641',
599 |     role: 'Директор',
600 |   },
601 |   {
602 |     schoolNumber: '170',
603 |     contactName: 'Ірина',
604 |     phone: '0986373627',
605 |     role: null,
606 |   },
607 |   {
608 |     schoolNumber: '167',
609 |     contactName: 'Юлія',
610 |     phone: '0687096641',
611 |     role: 'Директор',
612 |   },
613 |   {
614 |     schoolNumber: '42',
615 |     contactName: 'Наталя Йосипівна',
616 |     phone: '0677453052',
617 |     role: null,
618 |   },
619 |   {
620 |     schoolNumber: '33',
621 |     contactName: 'Олександра Мирославівна',
622 |     phone: '0505049049',
623 |     role: null,
624 |   },
625 |   { schoolNumber: '134', contactName: 'Леся', phone: '0969740462', role: null },
626 |   {
627 |     schoolNumber: '165',
628 |     contactName: 'Марта Андріївна',
629 |     phone: '0639377896',
630 |     role: null,
631 |   },
632 |   {
633 |     schoolNumber: '159',
634 |     contactName: 'Ірина Олександрівна',
635 |     phone: '0972430286',
636 |     role: null,
637 |   },
638 |   {
639 |     schoolNumber: '163',
640 |     contactName: 'Оксана Ярославівна Сновидович',
641 |     phone: '0963943974',
642 |     role: null,
643 |   },
644 |   {
645 |     schoolNumber: '153',
646 |     contactName: 'Юля',
647 |     phone: '0939907888',
648 |     role: 'Методист',
649 |   },
650 |   {
651 |     schoolNumber: '39',
652 |     contactName: 'Оксана Антонівна',
653 |     phone: '0676820705',
654 |     role: null,
655 |   },
656 |   {
657 |     schoolNumber: '73',
658 |     contactName: 'Ярослава',
659 |     phone: '0679767575',
660 |     role: null,
661 |   },
662 |   {
663 |     schoolNumber: '134',
664 |     contactName: 'Ольга',
665 |     phone: '0679495251',
666 |     role: 'Заступник',
667 |   },
668 |   {
669 |     schoolNumber: '69',
670 |     contactName: 'Уляна',
671 |     phone: '0673392742',
672 |     role: 'Директор',
673 |   },
674 |   {
675 |     schoolNumber: '130',
676 |     contactName: 'Зоряна',
677 |     phone: '0677014722',
678 |     role: null,
679 |   },
680 |   {
681 |     schoolNumber: '52',
682 |     contactName: 'Софія',
683 |     phone: '0935428770',
684 |     role: 'Діловод',
685 |   },
686 |   {
687 |     schoolNumber: '181',
688 |     contactName: 'Марія Корпан',
689 |     phone: '0673142095',
690 |     role: 'Директор',
691 |   },
692 |   {
693 |     schoolNumber: '17',
694 |     contactName: 'Світлана',
695 |     phone: '0973047285',
696 |     role: 'Директор',
697 |   },
698 |   {
699 |     schoolNumber: '44',
700 |     contactName: 'Надія',
701 |     phone: '0932342106',
702 |     role: 'Методист',
703 |   },
704 |   {
705 |     schoolNumber: '170',
706 |     contactName: 'Ірина',
707 |     phone: '0986373627',
708 |     role: 'Методист',
709 |   },
710 |   {
711 |     schoolNumber: '3',
712 |     contactName: 'Наталя Ігорівна',
713 |     phone: '0973436380',
714 |     role: null,
715 |   },
716 |   {
717 |     schoolNumber: '176',
718 |     contactName: 'Юлія Андріївна',
719 |     phone: '0665244245',
720 |     role: 'Директор',
721 |   },
722 |   {
723 |     schoolNumber: '179',
724 |     contactName: 'Віра Володимирівна',
725 |     phone: '0672590052',
726 |     role: 'Директор',
727 |   },
728 |   {
729 |     schoolNumber: 'Вільні',
730 |     contactName: 'Іванна Михайлівна',
731 |     phone: '0974788019',
732 |     role: 'Директор',
733 |   },
734 |   {
735 |     schoolNumber: '105',
736 |     contactName: 'Лідія Василівна',
737 |     phone: '0679592370',
738 |     role: 'Директор',
739 |   },
740 |   {
741 |     schoolNumber: '7',
742 |     contactName: 'Уляна Богданівна',
743 |     phone: '0674256644',
744 |     role: 'Директор',
745 |   },
746 |   {
747 |     schoolNumber: '168',
748 |     contactName: 'Ядельська Оксана Богданівна',
749 |     phone: '0969105724',
750 |     role: 'Директор',
751 |   },
752 |   {
753 |     schoolNumber: '139',
754 |     contactName: 'Ірина',
755 |     phone: '0970488672',
756 |     role: 'Директор',
757 |   },
758 |   {
759 |     schoolNumber: '167',
760 |     contactName: 'Зоряна Ярославівна',
761 |     phone: '0672684699',
762 |     role: 'Директор',
763 |   },
764 |   {
765 |     schoolNumber: '38',
766 |     contactName: 'Ірина Олегівна',
767 |     phone: '0679475122',
768 |     role: null,
769 |   },
770 |   {
771 |     schoolNumber: '132',
772 |     contactName: 'Надія Леонівна',
773 |     phone: '0974429599',
774 |     role: 'Директор',
775 |   },
776 |   {
777 |     schoolNumber: '92',
778 |     contactName: 'Ольга',
779 |     phone: '0679492252',
780 |     role: 'Директор',
781 |   },
782 |   {
783 |     schoolNumber: '33',
784 |     contactName: 'Леся Породько',
785 |     phone: '0505049049',
786 |     role: 'Директор',
787 |   },
788 |   {
789 |     schoolNumber: '155',
790 |     contactName: 'Ірина Михайлівна',
791 |     phone: '0677301582',
792 |     role: 'Директор',
793 |   },
794 |   {
795 |     schoolNumber: '183',
796 |     contactName: 'Володимир Михайлович',
797 |     phone: '0970256488',
798 |     role: 'Директор',
799 |   },
800 |   {
801 |     schoolNumber: '70',
802 |     contactName: 'Ольга Петрівна',
803 |     phone: '0936992997',
804 |     role: 'Директор',
805 |   },
806 |   {
807 |     schoolNumber: '18',
808 |     contactName: 'Наталя Бондаренко',
809 |     phone: '0505938826',
810 |     role: 'Директор',
811 |   },
812 |   {
813 |     schoolNumber: '131',
814 |     contactName: 'Любомира',
815 |     phone: '0673657490',
816 |     role: 'Директор',
817 |   },
818 |   {
819 |     schoolNumber: '9',
820 |     contactName: 'Зоряна Семенівна',
821 |     phone: '0677628687',
822 |     role: 'Директор',
823 |   },
824 |   {
825 |     schoolNumber: '26',
826 |     contactName: 'Ольга Іванівна',
827 |     phone: '0977476237',
828 |     role: 'Директор',
829 |   },
830 |   {
831 |     schoolNumber: '23',
832 |     contactName: 'Соломія Ігорівна',
833 |     phone: '0975616807',
834 |     role: 'Директор',
835 |   },
836 |   {
837 |     schoolNumber: '1',
838 |     contactName: 'Оксана',
839 |     phone: '0675937156',
840 |     role: 'Директор',
841 |   },
842 |   {
843 |     schoolNumber: '109',
844 |     contactName: 'Катерина Петрівна',
845 |     phone: '0975173313',
846 |     role: 'Директор',
847 |   },
848 |   {
849 |     schoolNumber: '30',
850 |     contactName: 'Олена Йосифівна',
851 |     phone: '0974649258',
852 |     role: 'Директор',
853 |   },
854 |   {
855 |     schoolNumber: '51',
856 |     contactName: 'Вікторія Романівна',
857 |     phone: '0974207708',
858 |     role: 'Директор',
859 |   },
860 |   {
861 |     schoolNumber: '21',
862 |     contactName: 'Анастасія Віталіївна',
863 |     phone: '0671727948',
864 |     role: 'Директор',
865 |   },
866 |   {
867 |     schoolNumber: '75',
868 |     contactName: 'Наталія Володимирівна',
869 |     phone: '0972431888',
870 |     role: 'Директор',
871 |   },
872 |   {
873 |     schoolNumber: '166',
874 |     contactName: "Мар'яна Михайлівна",
875 |     phone: '0975300502',
876 |     role: 'Директор',
877 |   },
878 |   {
879 |     schoolNumber: '127',
880 |     contactName: 'Галина Йосифівна',
881 |     phone: '0963460339',
882 |     role: 'Директор',
883 |   },
884 |   {
885 |     schoolNumber: '86',
886 |     contactName: 'Стефанія Миколаївна',
887 |     phone: '0674936394',
888 |     role: 'Директор',
889 |   },
890 |   {
891 |     schoolNumber: '114',
892 |     contactName: 'Ольга Володимирівна',
893 |     phone: '0983673279',
894 |     role: 'Директор',
895 |   },
896 |   {
897 |     schoolNumber: '128',
898 |     contactName: 'Лідія Михайлівна',
899 |     phone: '0979790881',
900 |     role: 'Директор',
901 |   },
902 |   {
903 |     schoolNumber: 'Золотий ключик',
904 |     contactName: 'Галина',
905 |     phone: '0663914517',
906 |     role: 'Методист',
907 |   },
908 |   {
909 |     schoolNumber: 'Казка',
910 |     contactName: 'Ірина Михайлівна',
911 |     phone: '0677322435',
912 |     role: 'Директор',
913 |   },
914 |   {
915 |     schoolNumber: 'Львівський 2 сад',
916 |     contactName: 'Олена Юріївна',
917 |     phone: '0677270402',
918 |     role: 'Директор',
919 |   },
920 |   {
921 |     schoolNumber: '160',
922 |     contactName: 'Віра Каролівна',
923 |     phone: '0968009925',
924 |     role: 'Директор',
925 |   },
926 |   {
927 |     schoolNumber: '129',
928 |     contactName: 'Оксана Зенонівна',
929 |     phone: '0678112120',
930 |     role: 'Директор',
931 |   },
932 |   {
933 |     schoolNumber: '93',
934 |     contactName: 'Марія Ярославівна',
935 |     phone: '0676950870',
936 |     role: 'Директор',
937 |   },
938 |   {
939 |     schoolNumber: '48',
940 |     contactName: 'Наталія Остапівна',
941 |     phone: '0974428307',
942 |     role: 'Директор',
943 |   },
944 |   {
945 |     schoolNumber: '135',
946 |     contactName: 'Галина Ярославівна',
947 |     phone: '0673994741',
948 |     role: 'Директор',
949 |   },
950 |   {
951 |     schoolNumber: '188',
952 |     contactName: 'Ірина Вікторівна',
953 |     phone: '0933054378',
954 |     role: 'Директор',
955 |   },
956 |   {
957 |     schoolNumber: '25',
958 |     contactName: 'Лілія Богданівна',
959 |     phone: '0680215346',
960 |     role: 'Директор',
961 |   },
962 |   {
963 |     schoolNumber: '32',
964 |     contactName: 'Наталія Василівна',
965 |     phone: '0678119933',
966 |     role: 'Директор',
967 |   },
968 |   {
969 |     schoolNumber: '171',
970 |     contactName: 'Ірина Корніївна',
971 |     phone: '0972576026',
972 |     role: 'Директор',
973 |   },
974 |   {
975 |     schoolNumber: '96',
976 |     contactName: 'Світлана Петрівна',
977 |     phone: '0676739477',
978 |     role: 'Директор',
979 |   },
980 |   {
981 |     schoolNumber: '94',
982 |     contactName: 'Оксана Ярославівна',
983 |     phone: '0671447681',
984 |     role: 'Директор',
985 |   },
986 |   {
987 |     schoolNumber: '156/162',
988 |     contactName: 'Оксана Ісламівна',
989 |     phone: '0985835819',
990 |     role: 'Директор',
991 |   },
992 |   {
993 |     schoolNumber: '71',
994 |     contactName: 'Валентина Гермогенівна',
995 |     phone: '0976781981',
996 |     role: 'Директор',
997 |   },
998 |   {
999 |     schoolNumber: '187',
1000 |     contactName: 'Ольга Олексіївна',
1001 |     phone: '0674599119',
1002 |     role: 'Директор',
1003 |   },
1004 |   {
1005 |     schoolNumber: '14',
1006 |     contactName: 'Оксана Любомирівна',
1007 |     phone: '0677247619',
1008 |     role: 'Директор',
1009 |   },
1010 |   {
1011 |     schoolNumber: 'Любисток',
1012 |     contactName: 'Марія',
1013 |     phone: '0685227373',
1014 |     role: 'Методист',
1015 |   },
1016 |   {
1017 |     schoolNumber: '106',
1018 |     contactName: 'Галина Володимирівна',
1019 |     phone: '0675839839',
1020 |     role: 'Директор',
1021 |   },
1022 |   {
1023 |     schoolNumber: '104',
1024 |     contactName: 'Тетяна Ярославівна',
1025 |     phone: '0678034951',
1026 |     role: 'Директор',
1027 |   },
1028 |   {
1029 |     schoolNumber: '116',
1030 |     contactName: 'Ірина Іванівна',
1031 |     phone: '0968145853',
1032 |     role: 'Директор',
1033 |   },
1034 |   {
1035 |     schoolNumber: '57',
1036 |     contactName: 'Руслана Володимирівна',
1037 |     phone: '0966507883',
1038 |     role: 'Директор',
1039 |   },
1040 |   {
1041 |     schoolNumber: '184',
1042 |     contactName: 'Марія Іванівна',
1043 |     phone: '2546872',
1044 |     role: 'Директор',
1045 |   },
1046 |   {
1047 |     schoolNumber: '43',
1048 |     contactName: 'Віра',
1049 |     phone: '0984284448',
1050 |     role: 'Методист',
1051 |   },
1052 |   {
1053 |     schoolNumber: '29',
1054 |     contactName: 'Вікторія Олександрівна',
1055 |     phone: '0673041528',
1056 |     role: 'Директор',
1057 |   },
1058 | ];
1059 | 
1060 | async function main() {
1061 |   console.log('Seeding school contacts...');
1062 | 
1063 |   await prisma.schoolContact.deleteMany({});
1064 | 
1065 |   for (const c of contacts) {
1066 |     await prisma.schoolContact.create({
1067 |       data: { city: 'Львів', ...c },
1068 |     });
1069 |   }
1070 | 
1071 |   console.log(`Done: ${contacts.length} contacts inserted`);
1072 | }
1073 | 
1074 | main()
1075 |   .catch(console.error)
1076 |   .finally(() => prisma.$disconnect());
1077 | 
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
 14 |       ],
 15 |     })
 16 |       .overrideGuard(AuthGuard)
 17 |       .useValue({ canActivate: () => true })
 18 |       .overrideGuard(RolesGuard)
 19 |       .useValue({ canActivate: () => true })
 20 |       .compile();
 21 | 
 22 |     expect(module.get(SchoolsController)).toBeDefined();
 23 |   });
 24 | });
 25 | 
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
 16 | import { OwnershipGuard } from '../auth/guards/ownership.guard';
 17 | import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
 18 | import { CreateSchoolDto } from './dto/create-school.dto';
 19 | import { UpdateSchoolDto } from './dto/update-school.dto';
 20 | import { BulkImportDto } from './dto/bulk-import.dto';
 21 | @Controller('schools')
 22 | @UseGuards(AuthGuard, RolesGuard)
 23 | export class SchoolsController {
 24 |   constructor(
 25 |     private readonly schoolsService: SchoolsService,
 26 |     private readonly parserService: ParserService,
 27 |   ) {}
 28 | 
 29 |   @Post('bulk-import')
 30 |   @Roles('SUPERADMIN', 'MANAGER')
 31 |   bulkImport(@Body() body: BulkImportDto) {
 32 |     return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
 33 |   }
 34 | 
 35 |   @Get('supported-cities')
 36 |   getSupportedCities() {
 37 |     return this.parserService.getSupportedCities();
 38 |   }
 39 | 
 40 |   @Post()
 41 |   @Roles('SUPERADMIN', 'MANAGER')
 42 |   create(@Body() body: CreateSchoolDto) {
 43 |     return this.schoolsService.create(body);
 44 |   }
 45 | 
 46 |   @Get() findAll(@Query('minimal') minimal?: string) {
 47 |     return this.schoolsService.findAll(minimal === 'true');
 48 |   }
 49 | 
 50 |   @Get('search')
 51 |   search(@Query('q') q: string, @Query('type') type: string) {
 52 |     return this.parserService.searchSchools(q, type);
 53 |   }
 54 | 
 55 |   @Get(':id')
 56 |   findOne(@Param('id') id: string) {
 57 |     return this.schoolsService.findOne(id);
 58 |   }
 59 | 
 60 |   @Patch(':id')
 61 |   @UseGuards(OwnershipGuard)
 62 |   @CheckOwnership('school')
 63 |   update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
 64 |     return this.schoolsService.update(id, body);
 65 |   }
 66 | 
 67 |   @Delete(':id')
 68 |   @Roles('SUPERADMIN')
 69 |   remove(@Param('id') id: string) {
 70 |     return this.schoolsService.remove(id);
 71 |   }
 72 | 
 73 |   @Get('contacts/search')
 74 |   searchContacts(@Query('q') q: string, @Query('city') city: string) {
 75 |     return this.schoolsService.searchContacts(q, city);
 76 |   }
 77 | }
 78 | 
```

### File: apps/backend/src/schools/schools.module.ts
```ts
  0 | import { Module, forwardRef } from '@nestjs/common';
  1 | import { SchoolsService } from './schools.service';
  2 | import { SchoolsController } from './schools.controller';
  3 | import { EventsModule } from '../events/events.module';
  4 | import { ParserService } from './parser.service';
  5 | 
  6 | @Module({
  7 |   imports: [forwardRef(() => EventsModule)],
  8 |   controllers: [SchoolsController],
  9 |   providers: [SchoolsService, ParserService],
 10 |   exports: [SchoolsService, ParserService],
 11 | })
 12 | export class SchoolsModule {}
 13 | 
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
  0 | import {
  1 |   Injectable,
  2 |   NotFoundException,
  3 |   forwardRef,
  4 |   Inject,
  5 | } from '@nestjs/common';
  6 | import { EventsService } from '../events/events.service';
  7 | import { ParserService } from './parser.service';
  8 | import { PrismaService } from '../prisma/prisma.service';
  9 | 
 10 | @Injectable()
 11 | export class SchoolsService {
 12 |   constructor(
 13 |     @Inject(forwardRef(() => EventsService))
 14 |     private readonly eventsService: EventsService,
 15 |     private readonly parserService: ParserService,
 16 |     private readonly prisma: PrismaService,
 17 |   ) {}
 18 | 
 19 |   async create(data: {
 20 |     name: string;
 21 |     type: string;
 22 |     cityId: string;
 23 |     sourceUrl?: string;
 24 |     director?: string;
 25 |     phone?: string;
 26 |     address?: string;
 27 |     childrenCount?: number;
 28 |   }) {
 29 |     const { sourceUrl, ...schoolData } = data;
 30 | 
 31 |     const newSchool = await this.prisma.school.create({
 32 |       data: schoolData,
 33 |     });
 34 | 
 35 |     this.parserService
 36 |       .parseSchoolData(data.name, sourceUrl, data.type)
 37 |       .then(async (parsed) => {
 38 |         if (!parsed) {
 39 |           console.log(`Не вдалося знайти дані для закладу: ${data.name}`);
 40 |           return;
 41 |         }
 42 | 
 43 |         const updateData: Record<string, unknown> = {};
 44 | 
 45 |         if (!schoolData.address && parsed.address) {
 46 |           updateData.address = parsed.address;
 47 |         }
 48 |         if (!schoolData.director && parsed.director) {
 49 |           updateData.director = parsed.director;
 50 |         }
 51 |         if (!schoolData.childrenCount && parsed.childrenCount) {
 52 |           updateData.childrenCount = parsed.childrenCount;
 53 |         }
 54 | 
 55 |         if (Object.keys(updateData).length === 0) {
 56 |           console.log(
 57 |             `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
 58 |           );
 59 |           return;
 60 |         }
 61 | 
 62 |         await this.prisma.school.update({
 63 |           where: {
 64 |             id: newSchool.id,
 65 |           },
 66 |           data: updateData,
 67 |         });
 68 | 
 69 |         console.log(`Дані школи "${data.name}" успішно оновлені`);
 70 |       })
 71 |       .catch((error) => {
 72 |         console.error('Помилка оновлення даних школи:', error);
 73 |       });
 74 | 
 75 |     return newSchool;
 76 |   }
 77 | 
 78 |   async findAll(minimal = false) {
 79 |     if (minimal) {
 80 |       return this.prisma.school.findMany({
 81 |         select: {
 82 |           id: true,
 83 |           name: true,
 84 |           type: true,
 85 |           cityId: true,
 86 |           director: true,
 87 |           phone: true,
 88 |           address: true,
 89 |           childrenCount: true,
 90 |           updatedAt: true,
 91 |           isHotClient: true,
 92 |           city: { select: { id: true, name: true } },
 93 |           events: {
 94 |             select: { status: true, updatedAt: true },
 95 |             orderBy: { date: 'desc' },
 96 |             take: 1,
 97 |           },
 98 |         },
 99 |         orderBy: { createdAt: 'desc' },
100 |       });
101 |     }
102 | 
103 |     return this.prisma.school.findMany({
104 |       include: {
105 |         city: true,
106 |         events: { orderBy: { date: 'desc' }, take: 1 },
107 |       },
108 |       orderBy: { createdAt: 'desc' },
109 |     });
110 |   }
111 | 
112 |   async findOne(id: string) {
113 |     const school = await this.prisma.school.findUnique({
114 |       where: {
115 |         id,
116 |       },
117 |       include: {
118 |         city: true,
119 |       },
120 |     });
121 |     if (!school) {
122 |       throw new NotFoundException(`Школу з ID ${id} не знайдено`);
123 |     }
124 | 
125 |     return school;
126 |   }
127 | 
128 |   async update(id: string, data: any) {
129 |     const { city, id: _id, createdAt, updatedAt, ...updateData } = data;
130 | 
131 |     return this.prisma.school.update({
132 |       where: {
133 |         id,
134 |       },
135 |       data: updateData,
136 |     });
137 |   }
138 | 
139 |   async remove(id: string) {
140 |     const events = await this.prisma.event.findMany({
141 |       where: {
142 |         schoolId: id,
143 |       },
144 |     });
145 | 
146 |     for (const event of events) {
147 |       await this.eventsService.remove(event.id);
148 |     }
149 | 
150 |     return this.prisma.school.delete({
151 |       where: {
152 |         id,
153 |       },
154 |     });
155 |   }
156 | 
157 |   async searchContacts(q: string, city?: string) {
158 |     if (!q || q.trim().length < 1) return [];
159 | 
160 |     const cityName = city || 'Львів';
161 |     const normalizedQuery = q.toLowerCase().trim();
162 | 
163 |     const allContacts = await this.prisma.schoolContact.findMany({
164 |       where: { city: cityName },
165 |       orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
166 |     });
167 | 
168 |     const STOP_WORDS = new Set([
169 |       'школа',
170 |       'школи',
171 |       'садочок',
172 |       'садок',
173 |       'дитсадок',
174 |       'днз',
175 |       'ліцей',
176 |       'гімназія',
177 |       'зош',
178 |       'центр',
179 |       'розвитку',
180 |       'комунальний',
181 |       'заклад',
182 |       'освіти',
183 |       'імені',
184 |       'ім',
185 |     ]);
186 | 
187 |     const tokens = normalizedQuery
188 |       .replace(/№/g, ' ')
189 |       .split(/\s+/)
190 |       .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
191 |       .filter((t) => t.length > 0 && !STOP_WORDS.has(t));
192 | 
193 |     const matches = allContacts.filter((c) => {
194 |       const num = c.schoolNumber.toLowerCase();
195 | 
196 |       if (num === normalizedQuery) return true;
197 | 
198 |       const isNumeric = /^\d+$/.test(num);
199 | 
200 |       if (isNumeric) {
201 |         if (tokens.includes(num)) return true;
202 |       } else {
203 |         if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
204 |           return true;
205 |         if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
206 |       }
207 | 
208 |       if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;
209 | 
210 |       return false;
211 |     });
212 | 
213 |     return matches.slice(0, 10);
214 |   }
215 |   async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
216 |     const city = await this.prisma.city.findUnique({ where: { id: cityId } });
217 |     if (!city) throw new Error(`Місто з id=${cityId} не знайдено`);
218 | 
219 |     const allFromParser = await this.parserService.getAllSchoolsForCity(
220 |       city.name,
221 |       type,
222 |     );
223 | 
224 |     const existingSchools = await this.prisma.school.findMany({
225 |       where: { cityId, type },
226 |       select: { name: true },
227 |     });
228 | 
229 |     const normalize = (name: string) =>
230 |       name
231 |         .toLowerCase()
232 |         .replace(/№/g, '')
233 |         .replace(/["'«»]/g, '')
234 |         .replace(/\s+/g, '')
235 |         .trim();
236 | 
237 |     const existingNames = new Set(
238 |       existingSchools.map((s) => normalize(s.name)),
239 |     );
240 | 
241 |     const toCreate = allFromParser.filter(
242 |       (s) => !existingNames.has(normalize(s.name)),
243 |     );
244 | 
245 |     if (toCreate.length === 0) {
246 |       return {
247 |         total: allFromParser.length,
248 |         created: 0,
249 |         skipped: allFromParser.length,
250 |       };
251 |     }
252 | 
253 |     const contacts = await this.prisma.schoolContact.findMany({
254 |       where: { city: city.name },
255 |     });
256 | 
257 |     let created = 0;
258 |     for (const school of toCreate) {
259 |       if (existingNames.has(normalize(school.name))) continue;
260 | 
261 |       existingNames.add(normalize(school.name));
262 | 
263 |       const numMatch = school.name.match(/№?\s*(\d+)/);
264 |       const num = numMatch?.[1];
265 |       const matchedContacts = num
266 |         ? contacts.filter((c) => c.schoolNumber === num)
267 |         : contacts.filter((c) => {
268 |             const normSchool = normalize(school.name);
269 |             const normContact = normalize(c.schoolNumber);
270 |             return (
271 |               normSchool.includes(normContact) ||
272 |               normContact.includes(normSchool)
273 |             );
274 |           });
275 | 
276 |       const director =
277 |         matchedContacts.find(
278 |           (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
279 |         ) || matchedContacts[0];
280 | 
281 |       try {
282 |         await this.create({
283 |           name: school.name,
284 |           type,
285 |           cityId,
286 |           sourceUrl: school.url,
287 |           director: director?.contactName || '',
288 |           phone: director?.phone || '',
289 |         });
290 |         created++;
291 |       } catch (e) {
292 |         console.error(`Помилка створення ${school.name}:`, e);
293 |       }
294 |     }
295 | 
296 |     return {
297 |       city: city.name,
298 |       total: allFromParser.length,
299 |       created,
300 |       skipped: allFromParser.length - created,
301 |     };
302 |   }
303 | }
304 | 
```

### File: apps/backend/src/telegram/telegram.module.ts
```ts
  0 | import { Module, forwardRef } from '@nestjs/common';
  1 | import { TelegramService } from './telegram.service';
  2 | import { PrismaModule } from '../prisma/prisma.module';
  3 | import { UsersModule } from '../users/users.module';
  4 | 
  5 | @Module({
  6 |   imports: [PrismaModule, forwardRef(() => UsersModule)],
  7 |   providers: [TelegramService],
  8 |   exports: [TelegramService],
  9 | })
 10 | export class TelegramModule {}
 11 | 
```

### File: apps/backend/src/telegram/telegram.service.ts
```ts
  0 | import {
  1 |   Injectable,
  2 |   Logger,
  3 |   OnModuleInit,
  4 |   Inject,
  5 |   forwardRef,
  6 | } from '@nestjs/common';
  7 | import TelegramBot from 'node-telegram-bot-api';
  8 | import { UsersService } from '../users/users.service';
  9 | 
 10 | @Injectable()
 11 | export class TelegramService implements OnModuleInit {
 12 |   private bot: TelegramBot;
 13 |   private readonly logger = new Logger(TelegramService.name);
 14 | 
 15 |   constructor(
 16 |     @Inject(forwardRef(() => UsersService))
 17 |     private usersService: UsersService,
 18 |   ) {}
 19 | 
 20 |   onModuleInit() {
 21 |     const token = process.env.TELEGRAM_BOT_TOKEN;
 22 |     if (!token || process.env.NODE_ENV === 'test') {
 23 |       this.logger.warn(
 24 |         'TELEGRAM_BOT_TOKEN не задано або тестове середовище — бот вимкнено',
 25 |       );
 26 |       return;
 27 |     }
 28 |     this.bot = new TelegramBot(token, { polling: true });
 29 |     this.logger.log('Telegram бот ініціалізовано');
 30 | 
 31 |     this.bot.onText(/\/start/, async (msg) => {
 32 |       const chatId = String(msg.chat.id);
 33 |       const username = msg.from?.username;
 34 | 
 35 |       if (!username) {
 36 |         await this.bot.sendMessage(
 37 |           chatId,
 38 |           "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
 39 |         );
 40 |         return;
 41 |       }
 42 | 
 43 |       const normalizedUsername = username.toLowerCase();
 44 | 
 45 |       const result = await this.usersService.updateTelegramChatId(
 46 |         normalizedUsername,
 47 |         chatId,
 48 |       );
 49 | 
 50 |       if (result.count > 0) {
 51 |         this.logger.log(
 52 |           `[/start] chatId=${chatId} username=${normalizedUsername} — успішно підв'язано`,
 53 |         );
 54 |         await this.bot.sendMessage(
 55 |           chatId,
 56 |           `✅ Вітаємо! Ваш акаунт успішно підключено до <b>Світло Знань CRM</b>.`,
 57 |           { parse_mode: 'HTML' },
 58 |         );
 59 |       } else {
 60 |         this.logger.warn(
 61 |           `[/start] Користувача з username "${normalizedUsername}" не знайдено в CRM.`,
 62 |         );
 63 |         await this.bot.sendMessage(
 64 |           chatId,
 65 |           `❌ Акаунт не знайдено. Переконайтеся, що в CRM у вашому профілі вказано нікнейм <b>${normalizedUsername}</b> без помилок.`,
 66 |           { parse_mode: 'HTML' },
 67 |         );
 68 |       }
 69 |     });
 70 |   }
 71 | 
 72 |   async sendMessage(chatId: string, text: string): Promise<void> {
 73 |     if (!this.bot) return;
 74 |     try {
 75 |       await this.bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
 76 |     } catch (e: any) {
 77 |       this.logger.error(
 78 |         `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
 79 |       );
 80 |     }
 81 |   }
 82 | 
 83 |   async sendWelcome(
 84 |     chatId: string,
 85 |     name: string,
 86 |     email: string,
 87 |     password: string,
 88 |   ): Promise<void> {
 89 |     const text =
 90 |       `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
 91 |       `Ваш акаунт створено.\n\n` +
 92 |       `📧 <b>Логін:</b> <code>${email}</code>\n` +
 93 |       `🔑 <b>Пароль:</b> <code>${password}</code>\n\n` +
 94 |       `Увійдіть за посиланням: <a href="https://crm-frontend-psi-sable.vercel.app">crm-frontend-psi-sable.vercel.app</a>\n\n` +
 95 |       `<i>Змініть пароль після першого входу.</i>`;
 96 | 
 97 |     await this.sendMessage(chatId, text);
 98 |   }
 99 | }
100 | 
```

### File: apps/backend/src/users/dto/create-user.dto.ts
```ts
  0 | import {
  1 |   IsString,
  2 |   IsEmail,
  3 |   IsNotEmpty,
  4 |   IsOptional,
  5 |   MinLength,
  6 |   IsIn,
  7 | } from 'class-validator';
  8 | 
  9 | const ROLES = ['SUPERADMIN', 'MANAGER', 'HOST', 'DRIVER'];
 10 | 
 11 | export class CreateUserDto {
 12 |   @IsString()
 13 |   @IsNotEmpty()
 14 |   fullName: string;
 15 | 
 16 |   @IsEmail()
 17 |   email: string;
 18 | 
 19 |   @IsString()
 20 |   @MinLength(6)
 21 |   password: string;
 22 | 
 23 |   @IsOptional()
 24 |   @IsString()
 25 |   phone?: string;
 26 | 
 27 |   @IsOptional()
 28 |   @IsIn(ROLES)
 29 |   role?: string;
 30 | 
 31 |   @IsOptional()
 32 |   @IsString()
 33 |   cityId?: string;
 34 | 
 35 |   @IsOptional()
 36 |   @IsString()
 37 |   telegramId?: string;
 38 | 
 39 |   @IsOptional()
 40 |   @IsString()
 41 |   car?: string;
 42 | }
 43 | 
```

### File: apps/backend/src/users/dto/update-user.dto.ts
```ts
  0 | import {
  1 |   IsString,
  2 |   IsEmail,
  3 |   IsOptional,
  4 |   MinLength,
  5 |   IsIn,
  6 | } from 'class-validator';
  7 | 
  8 | const ROLES = ['SUPERADMIN', 'MANAGER', 'HOST', 'DRIVER'];
  9 | 
 10 | export class UpdateUserDto {
 11 |   @IsOptional()
 12 |   @IsString()
 13 |   fullName?: string;
 14 | 
 15 |   @IsOptional()
 16 |   @IsEmail()
 17 |   email?: string;
 18 | 
 19 |   @IsOptional()
 20 |   @IsString()
 21 |   @MinLength(6)
 22 |   password?: string;
 23 | 
 24 |   @IsOptional()
 25 |   @IsString()
 26 |   phone?: string;
 27 | 
 28 |   @IsOptional()
 29 |   @IsIn(ROLES)
 30 |   role?: string;
 31 | 
 32 |   @IsOptional()
 33 |   @IsString()
 34 |   cityId?: string;
 35 | 
 36 |   @IsOptional()
 37 |   @IsString()
 38 |   telegramId?: string;
 39 | 
 40 |   @IsOptional()
 41 |   @IsString()
 42 |   car?: string;
 43 | }
 44 | 
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
 10 |       providers: [{ provide: UsersService, useValue: {} }],
 11 |     })
 12 |       .overrideGuard(AuthGuard)
 13 |       .useValue({ canActivate: () => true })
 14 |       .overrideGuard(RolesGuard)
 15 |       .useValue({ canActivate: () => true })
 16 |       .compile();
 17 | 
 18 |     expect(module.get(UsersController)).toBeDefined();
 19 |   });
 20 | });
 21 | 
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
 14 | import { CreateUserDto } from './dto/create-user.dto';
 15 | import { UpdateUserDto } from './dto/update-user.dto';
 16 | 
 17 | @Controller('users')
 18 | @UseGuards(AuthGuard, RolesGuard)
 19 | export class UsersController {
 20 |   constructor(private readonly usersService: UsersService) {}
 21 | 
 22 |   @Get()
 23 |   getAll() {
 24 |     return this.usersService.getAllUsers();
 25 |   }
 26 | 
 27 |   @Post()
 28 |   @Roles('SUPERADMIN')
 29 |   create(@Body() body: CreateUserDto) {
 30 |     return this.usersService.createUser(body);
 31 |   }
 32 | 
 33 |   @Patch(':id')
 34 |   @Roles('SUPERADMIN')
 35 |   update(@Param('id') id: string, @Body() body: UpdateUserDto) {
 36 |     return this.usersService.updateUser(id, body);
 37 |   }
 38 | 
 39 |   @Delete(':id')
 40 |   @Roles('SUPERADMIN')
 41 |   remove(@Param('id') id: string) {
 42 |     return this.usersService.deleteUser(id);
 43 |   }
 44 | 
 45 |   @Get('seed')
 46 |   @Roles('SUPERADMIN')
 47 |   seedAdmin() {
 48 |     return this.usersService.seedAdmin();
 49 |   }
 50 | 
 51 |   @Get('seed-vasya')
 52 |   @Roles('SUPERADMIN')
 53 |   seedVasya() {
 54 |     return this.usersService.seedVasya();
 55 |   }
 56 | }
 57 | 
```

### File: apps/backend/src/users/users.module.ts
```ts
  0 | import { Module, forwardRef } from '@nestjs/common';
  1 | import { UsersService } from './users.service';
  2 | import { UsersController } from './users.controller';
  3 | import { TelegramModule } from '../telegram/telegram.module';
  4 | import { PrismaModule } from '../prisma/prisma.module';
  5 | 
  6 | @Module({
  7 |   imports: [forwardRef(() => TelegramModule)],
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
  0 | import { Injectable, Inject, forwardRef } from '@nestjs/common';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | import * as bcrypt from 'bcrypt';
  3 | import { TelegramService } from '../telegram/telegram.service';
  4 | import { Prisma, User } from '@prisma/client';
  5 | import { CreateUserDto } from './dto/create-user.dto';
  6 | import { UpdateUserDto } from './dto/update-user.dto';
  7 | 
  8 | @Injectable()
  9 | export class UsersService {
 10 |   constructor(
 11 |     private readonly prisma: PrismaService,
 12 |     @Inject(forwardRef(() => TelegramService))
 13 |     private telegramService: TelegramService,
 14 |   ) {}
 15 | 
 16 |   async findByEmail(email: string): Promise<User | null> {
 17 |     if (!email) return null;
 18 |     return this.prisma.user.findUnique({
 19 |       where: { email },
 20 |     });
 21 |   }
 22 | 
 23 |   async findById(id: string): Promise<User | null> {
 24 |     return this.prisma.user.findUnique({
 25 |       where: { id },
 26 |     });
 27 |   }
 28 | 
 29 |   async getAllUsers() {
 30 |     return this.prisma.user.findMany({
 31 |       include: {
 32 |         city: true,
 33 |       },
 34 |     });
 35 |   }
 36 | 
 37 |   async create(data: Prisma.UserCreateInput): Promise<User> {
 38 |     return this.prisma.user.create({
 39 |       data,
 40 |     });
 41 |   }
 42 | 
 43 |   async createUser(data: CreateUserDto) {
 44 |     const hashedPassword = await bcrypt.hash(data.password, 10);
 45 |     const user = await this.prisma.user.create({
 46 |       data: {
 47 |         name: data.fullName,
 48 |         email: data.email,
 49 |         phone: data.phone,
 50 |         password: hashedPassword,
 51 |         role: data.role,
 52 |         cityId: data.cityId || null,
 53 |         telegramId: data.telegramId || null,
 54 |         car: data.car || null,
 55 |       },
 56 |     });
 57 | 
 58 |     if (data.password) {
 59 |       const chatId = user.telegramChatId || null;
 60 | 
 61 |       if (chatId) {
 62 |         await this.telegramService.sendWelcome(
 63 |           chatId,
 64 |           data.fullName,
 65 |           data.email,
 66 |           data.password,
 67 |         );
 68 |       }
 69 |     }
 70 | 
 71 |     return user;
 72 |   }
 73 | 
 74 |   async updateUser(id: string, data: UpdateUserDto) {
 75 |     const updateData: Prisma.UserUpdateInput = {
 76 |       name: data.fullName,
 77 |       email: data.email,
 78 |       phone: data.phone,
 79 |       role: data.role,
 80 |       city: data.cityId
 81 |         ? { connect: { id: data.cityId } }
 82 |         : { disconnect: true },
 83 |       telegramId: data.telegramId || null,
 84 |       car: data.car || null,
 85 |     };
 86 | 
 87 |     if (data.password) {
 88 |       updateData.password = await bcrypt.hash(data.password, 10);
 89 |     }
 90 | 
 91 |     return this.prisma.user.update({ where: { id }, data: updateData });
 92 |   }
 93 | 
 94 |   async deleteUser(id: string) {
 95 |     return this.prisma.user.delete({ where: { id } });
 96 |   }
 97 | 
 98 |   async seedAdmin() {
 99 |     const existingAdmin = await this.prisma.user.findUnique({
100 |       where: { email: 'admin@crm.com' },
101 |     });
102 | 
103 |     if (existingAdmin) {
104 |       return { message: 'Адміністратор вже існує!' };
105 |     }
106 | 
107 |     const hashedPassword = await bcrypt.hash('admin123', 10);
108 |     const admin = await this.prisma.user.create({
109 |       data: {
110 |         name: 'Артур Шмальцель',
111 |         email: 'admin@crm.com',
112 |         password: hashedPassword,
113 |         role: 'SUPERADMIN',
114 |       },
115 |     });
116 | 
117 |     return { message: 'Суперадмін успішно створений!', user: admin };
118 |   }
119 | 
120 |   async seedVasya() {
121 |     const existingVasya = await this.prisma.user.findUnique({
122 |       where: { email: 'vasya@charisma.com' },
123 |     });
124 | 
125 |     if (existingVasya) {
126 |       return { message: 'Вася вже в базі!' };
127 |     }
128 | 
129 |     const hashedPassword = await bcrypt.hash('vasya123', 10);
130 | 
131 |     const vasya = await this.prisma.user.create({
132 |       data: {
133 |         name: 'Вася Харізма',
134 |         email: 'vasya@charisma.com',
135 |         password: hashedPassword,
136 |         role: 'MANAGER',
137 |       },
138 |     });
139 | 
140 |     return { message: 'Вася Харізма успішно доданий!', user: vasya };
141 |   }
142 | 
143 |   async findAll() {
144 |     return this.prisma.user.findMany();
145 |   }
146 | 
147 |   async updateTelegramChatId(username: string, chatId: string) {
148 |     return this.prisma.user.updateMany({
149 |       where: {
150 |         telegramId: {
151 |           equals: username,
152 |           mode: 'insensitive',
153 |         },
154 |       },
155 |       data: { telegramChatId: chatId },
156 |     });
157 |   }
158 | }
159 | 
```

### File: apps/backend/test/app.e2e-spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { INestApplication } from '@nestjs/common';
  2 | import request from 'supertest';
  3 | import { App } from 'supertest/types';
  4 | import { AppModule } from './../src/app.module';
  5 | 
  6 | describe('AppController (e2e)', () => {
  7 |   let app: INestApplication<App>;
  8 | 
  9 |   beforeEach(async () => {
 10 |     const moduleFixture: TestingModule = await Test.createTestingModule({
 11 |       imports: [AppModule],
 12 |     }).compile();
 13 | 
 14 |     app = moduleFixture.createNestApplication();
 15 |     await app.init();
 16 |   });
 17 | 
 18 |   it('/ (GET)', () => {
 19 |     return request(app.getHttpServer())
 20 |       .get('/')
 21 |       .expect(200)
 22 |       .expect('Hello World!');
 23 |   });
 24 | 
 25 |   afterEach(async () => {
 26 |     await app.close();
 27 |   });
 28 | });
 29 | 
```

### File: apps/backend/test/auth.e2e-spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { INestApplication } from '@nestjs/common';
  2 | import request from 'supertest';
  3 | import { AppModule } from '../src/app.module';
  4 | import { ValidationPipe } from '@nestjs/common';
  5 | 
  6 | describe('Auth API (contract)', () => {
  7 |   let app: INestApplication;
  8 | 
  9 |   beforeAll(async () => {
 10 |     const moduleFixture: TestingModule = await Test.createTestingModule({
 11 |       imports: [AppModule],
 12 |     }).compile();
 13 |     app = moduleFixture.createNestApplication();
 14 |     app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
 15 |     await app.init();
 16 |   });
 17 | 
 18 |   afterAll(async () => await app.close());
 19 | 
 20 |   describe('POST /auth/login', () => {
 21 |     it('повертає токен при правильних даних', async () => {
 22 |       const res = await request(app.getHttpServer())
 23 |         .post('/auth/login')
 24 |         .send({ email: 'admin@crm.com', password: 'admin123' })
 25 |         .expect(200);
 26 | 
 27 |       expect(res.body).toHaveProperty('access_token');
 28 |       expect(typeof res.body.access_token).toBe('string');
 29 |       expect(res.body.access_token.length).toBeGreaterThan(10);
 30 |     });
 31 | 
 32 |     it('повертає 401 при невірному паролі', async () => {
 33 |       await request(app.getHttpServer())
 34 |         .post('/auth/login')
 35 |         .send({ email: 'admin@crm.com', password: 'wrongpassword' })
 36 |         .expect(401);
 37 |     });
 38 | 
 39 |     it('повертає 401 при невірному email', async () => {
 40 |       await request(app.getHttpServer())
 41 |         .post('/auth/login')
 42 |         .send({ email: 'nobody@crm.com', password: 'admin123' })
 43 |         .expect(401);
 44 |     });
 45 | 
 46 |     it('повертає 400 без email', async () => {
 47 |       await request(app.getHttpServer())
 48 |         .post('/auth/login')
 49 |         .send({ password: 'admin123' })
 50 |         .expect(400);
 51 |     });
 52 | 
 53 |     it('структура відповіді відповідає контракту', async () => {
 54 |       const res = await request(app.getHttpServer())
 55 |         .post('/auth/login')
 56 |         .send({ email: 'admin@crm.com', password: 'admin123' })
 57 |         .expect(200);
 58 | 
 59 |       expect(res.body).toMatchObject({
 60 |         access_token: expect.any(String),
 61 |       });
 62 |     });
 63 |   });
 64 | });
 65 | 
```

### File: apps/backend/test/dashboard.e2e-spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { INestApplication } from '@nestjs/common';
  2 | import request from 'supertest';
  3 | import { AppModule } from '../src/app.module';
  4 | 
  5 | describe('Dashboard API (contract)', () => {
  6 |   let app: INestApplication;
  7 |   let token: string;
  8 | 
  9 |   beforeAll(async () => {
 10 |     const moduleFixture: TestingModule = await Test.createTestingModule({
 11 |       imports: [AppModule],
 12 |     }).compile();
 13 |     app = moduleFixture.createNestApplication();
 14 |     await app.init();
 15 | 
 16 |     const loginRes = await request(app.getHttpServer())
 17 |       .post('/auth/login')
 18 |       .send({ email: 'admin@crm.com', password: 'admin123' });
 19 |     token = loginRes.body.access_token;
 20 |   });
 21 | 
 22 |   afterAll(async () => await app.close());
 23 | 
 24 |   describe('GET /dashboard/summary', () => {
 25 |     it('повертає summary з токеном', async () => {
 26 |       const res = await request(app.getHttpServer())
 27 |         .get('/dashboard/summary')
 28 |         .set('Authorization', `Bearer ${token}`)
 29 |         .expect(200);
 30 | 
 31 |       expect(res.body).toHaveProperty('todayEvents');
 32 |       expect(res.body).toHaveProperty('upcomingEvents');
 33 |       expect(res.body).toHaveProperty('funnel');
 34 |       expect(res.body).toHaveProperty('monthlyKpi');
 35 |       expect(res.body).toHaveProperty('staleSchools');
 36 |       expect(res.body).toHaveProperty('activityFeed');
 37 |     });
 38 | 
 39 |     it('повертає 401 без токена', async () => {
 40 |       await request(app.getHttpServer()).get('/dashboard/summary').expect(401);
 41 |     });
 42 | 
 43 |     it('funnel містить всі етапи пайплайну', async () => {
 44 |       const res = await request(app.getHttpServer())
 45 |         .get('/dashboard/summary')
 46 |         .set('Authorization', `Bearer ${token}`)
 47 |         .expect(200);
 48 | 
 49 |       const stages = [
 50 |         'BASE',
 51 |         'FIRST_CONTACT',
 52 |         'DATE_CONFIRMED',
 53 |         'PREPARATION',
 54 |         'IN_PROGRESS',
 55 |         'DONE',
 56 |         'REPORT',
 57 |         'RE_SALE',
 58 |       ];
 59 |       for (const stage of stages) {
 60 |         expect(res.body.funnel).toHaveProperty(stage);
 61 |       }
 62 |     });
 63 | 
 64 |     it('monthlyKpi має числові поля', async () => {
 65 |       const res = await request(app.getHttpServer())
 66 |         .get('/dashboard/summary')
 67 |         .set('Authorization', `Bearer ${token}`)
 68 |         .expect(200);
 69 | 
 70 |       const kpi = res.body.monthlyKpi;
 71 |       expect(typeof kpi.revenue).toBe('number');
 72 |       expect(typeof kpi.profit).toBe('number');
 73 |       expect(typeof kpi.children).toBe('number');
 74 |       expect(typeof kpi.count).toBe('number');
 75 |     });
 76 | 
 77 |     it('фільтр по cityId повертає коректний результат', async () => {
 78 |       const citiesRes = await request(app.getHttpServer())
 79 |         .get('/cities')
 80 |         .set('Authorization', `Bearer ${token}`);
 81 | 
 82 |       const cityId = citiesRes.body[0]?.id;
 83 |       if (!cityId) return;
 84 | 
 85 |       const res = await request(app.getHttpServer())
 86 |         .get(`/dashboard/summary?cityId=${cityId}`)
 87 |         .set('Authorization', `Bearer ${token}`)
 88 |         .expect(200);
 89 | 
 90 |       expect(res.body).toHaveProperty('funnel');
 91 |       expect(res.body).toHaveProperty('todayEvents');
 92 |     });
 93 | 
 94 |     it('todayEvents і upcomingEvents — масиви', async () => {
 95 |       const res = await request(app.getHttpServer())
 96 |         .get('/dashboard/summary')
 97 |         .set('Authorization', `Bearer ${token}`)
 98 |         .expect(200);
 99 | 
100 |       expect(Array.isArray(res.body.todayEvents)).toBe(true);
101 |       expect(Array.isArray(res.body.upcomingEvents)).toBe(true);
102 |       expect(Array.isArray(res.body.staleSchools)).toBe(true);
103 |       expect(Array.isArray(res.body.activityFeed)).toBe(true);
104 |     });
105 |   });
106 | });
107 | 
```

### File: apps/backend/test/events.e2e-spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { INestApplication } from '@nestjs/common';
  2 | import request from 'supertest';
  3 | import { AppModule } from '../src/app.module';
  4 | 
  5 | describe('Events API (contract)', () => {
  6 |   let app: INestApplication;
  7 |   let token: string;
  8 |   let createdEventId: string;
  9 |   let schoolId: string;
 10 |   let cityId: string;
 11 | 
 12 |   beforeAll(async () => {
 13 |     const moduleFixture: TestingModule = await Test.createTestingModule({
 14 |       imports: [AppModule],
 15 |     }).compile();
 16 |     app = moduleFixture.createNestApplication();
 17 |     await app.init();
 18 | 
 19 |     const loginRes = await request(app.getHttpServer())
 20 |       .post('/auth/login')
 21 |       .send({ email: 'admin@crm.com', password: 'admin123' });
 22 |     token = loginRes.body.access_token;
 23 | 
 24 |     const citiesRes = await request(app.getHttpServer())
 25 |       .get('/cities')
 26 |       .set('Authorization', `Bearer ${token}`);
 27 |     cityId = citiesRes.body[0]?.id;
 28 | 
 29 |     if (cityId) {
 30 |       const schoolsRes = await request(app.getHttpServer())
 31 |         .get('/schools')
 32 |         .set('Authorization', `Bearer ${token}`);
 33 |       schoolId = schoolsRes.body[0]?.id;
 34 |     }
 35 |   });
 36 | 
 37 |   afterAll(async () => {
 38 |     if (createdEventId) {
 39 |       await request(app.getHttpServer())
 40 |         .delete(`/events/${createdEventId}`)
 41 |         .set('Authorization', `Bearer ${token}`);
 42 |     }
 43 |     await app.close();
 44 |   });
 45 | 
 46 |   describe('GET /events', () => {
 47 |     it('повертає список подій з токеном', async () => {
 48 |       const res = await request(app.getHttpServer())
 49 |         .get('/events')
 50 |         .set('Authorization', `Bearer ${token}`)
 51 |         .expect(200);
 52 |       expect(Array.isArray(res.body)).toBe(true);
 53 |     });
 54 | 
 55 |     it('повертає 401 без токена', async () => {
 56 |       await request(app.getHttpServer()).get('/events').expect(401);
 57 |     });
 58 | 
 59 |     it('кожна подія має обовязкові поля', async () => {
 60 |       const res = await request(app.getHttpServer())
 61 |         .get('/events')
 62 |         .set('Authorization', `Bearer ${token}`)
 63 |         .expect(200);
 64 | 
 65 |       if (res.body.length > 0) {
 66 |         const event = res.body[0];
 67 |         expect(event).toHaveProperty('id');
 68 |         expect(event).toHaveProperty('project');
 69 |         expect(event).toHaveProperty('date');
 70 |         expect(event).toHaveProperty('status');
 71 |       }
 72 |     });
 73 |   });
 74 | 
 75 |   describe('POST /events', () => {
 76 |     it('створює нову подію', async () => {
 77 |       if (!schoolId || !cityId) return;
 78 | 
 79 |       const res = await request(app.getHttpServer())
 80 |         .post('/events')
 81 |         .set('Authorization', `Bearer ${token}`)
 82 |         .send({
 83 |           project: 'Тестова подія E2E',
 84 |           date: '2027-01-15',
 85 |           time: '10:00',
 86 |           schoolId,
 87 |           cityId,
 88 |           childrenPlanned: 100,
 89 |           price: 5000,
 90 |           address: 'вул. Тестова 1',
 91 |           contactPerson: 'Тест',
 92 |           contactPhone: '0671234567',
 93 |         })
 94 |         .expect(201);
 95 | 
 96 |       expect(res.body).toHaveProperty('id');
 97 |       expect(res.body.project).toBe('Тестова подія E2E');
 98 |       expect(res.body.status).toBe('BASE');
 99 |       createdEventId = res.body.id;
100 |     });
101 | 
102 |     it('повертає 401 без токена', async () => {
103 |       await request(app.getHttpServer())
104 |         .post('/events')
105 |         .send({ project: 'Test' })
106 |         .expect(401);
107 |     });
108 |   });
109 | 
110 |   describe('GET /events/:id', () => {
111 |     it('повертає подію по id', async () => {
112 |       if (!createdEventId) return;
113 | 
114 |       const res = await request(app.getHttpServer())
115 |         .get(`/events/${createdEventId}`)
116 |         .set('Authorization', `Bearer ${token}`)
117 |         .expect(200);
118 | 
119 |       expect(res.body.id).toBe(createdEventId);
120 |     });
121 | 
122 |     it('повертає 404 для неіснуючої події', async () => {
123 |       await request(app.getHttpServer())
124 |         .get('/events/nonexistent-id-12345')
125 |         .set('Authorization', `Bearer ${token}`)
126 |         .expect(404);
127 |     });
128 |   });
129 | 
130 |   describe('PATCH /events/:id/status', () => {
131 |     it('змінює статус події', async () => {
132 |       if (!createdEventId) return;
133 | 
134 |       const res = await request(app.getHttpServer())
135 |         .patch(`/events/${createdEventId}/status`)
136 |         .set('Authorization', `Bearer ${token}`)
137 |         .send({
138 |           status: 'FIRST_CONTACT',
139 |           actionName: 'Знайомство',
140 |           comment: 'Тестовий коментар',
141 |         })
142 |         .expect(200);
143 | 
144 |       expect(res.body.status).toBe('FIRST_CONTACT');
145 |       expect(res.body.history).toBeDefined();
146 |       expect(res.body.history.length).toBeGreaterThan(0);
147 |     });
148 |   });
149 | 
150 |   describe('GET /events/school/:schoolId', () => {
151 |     it('повертає події школи', async () => {
152 |       if (!schoolId) return;
153 | 
154 |       const res = await request(app.getHttpServer())
155 |         .get(`/events/school/${schoolId}`)
156 |         .set('Authorization', `Bearer ${token}`)
157 |         .expect(200);
158 | 
159 |       expect(Array.isArray(res.body)).toBe(true);
160 |     });
161 | 
162 |     it('minimal=true повертає менше полів', async () => {
163 |       if (!schoolId) return;
164 | 
165 |       const fullRes = await request(app.getHttpServer())
166 |         .get(`/events/school/${schoolId}`)
167 |         .set('Authorization', `Bearer ${token}`);
168 | 
169 |       const minRes = await request(app.getHttpServer())
170 |         .get(`/events/school/${schoolId}?minimal=true`)
171 |         .set('Authorization', `Bearer ${token}`);
172 | 
173 |       if (fullRes.body.length > 0 && minRes.body.length > 0) {
174 |         expect(minRes.body[0]).not.toHaveProperty('history');
175 |         expect(minRes.body[0]).not.toHaveProperty('preparation');
176 |       }
177 |     });
178 |   });
179 | 
180 |   describe('DELETE /events/:id', () => {
181 |     it('видаляє подію', async () => {
182 |       if (!schoolId || !cityId) return;
183 | 
184 |       const createRes = await request(app.getHttpServer())
185 |         .post('/events')
186 |         .set('Authorization', `Bearer ${token}`)
187 |         .send({
188 |           project: 'Подія для видалення',
189 |           date: '2027-02-01',
190 |           time: '11:00',
191 |           schoolId,
192 |           cityId,
193 |           childrenPlanned: 50,
194 |           price: 2000,
195 |           address: 'вул. Тест 2',
196 |           contactPerson: 'Тест',
197 |           contactPhone: '0671234568',
198 |         });
199 | 
200 |       const deleteId = createRes.body.id;
201 |       if (!deleteId) return;
202 | 
203 |       await request(app.getHttpServer())
204 |         .delete(`/events/${deleteId}`)
205 |         .set('Authorization', `Bearer ${token}`)
206 |         .expect(200);
207 | 
208 |       await request(app.getHttpServer())
209 |         .get(`/events/${deleteId}`)
210 |         .set('Authorization', `Bearer ${token}`)
211 |         .expect(404);
212 |     });
213 |   });
214 | });
215 | 
```

### File: apps/backend/test/schools.e2e-spec.ts
```ts
  0 | import { Test, TestingModule } from '@nestjs/testing';
  1 | import { INestApplication } from '@nestjs/common';
  2 | import request from 'supertest';
  3 | import { AppModule } from '../src/app.module';
  4 | 
  5 | describe('Schools API (contract)', () => {
  6 |   let app: INestApplication;
  7 |   let token: string;
  8 |   let createdSchoolId: string;
  9 |   let cityId: string;
 10 | 
 11 |   beforeAll(async () => {
 12 |     const moduleFixture: TestingModule = await Test.createTestingModule({
 13 |       imports: [AppModule],
 14 |     }).compile();
 15 |     app = moduleFixture.createNestApplication();
 16 |     await app.init();
 17 | 
 18 |     const loginRes = await request(app.getHttpServer())
 19 |       .post('/auth/login')
 20 |       .send({ email: 'admin@crm.com', password: 'admin123' });
 21 |     token = loginRes.body.access_token;
 22 | 
 23 |     const citiesRes = await request(app.getHttpServer())
 24 |       .get('/cities')
 25 |       .set('Authorization', `Bearer ${token}`);
 26 |     cityId = citiesRes.body[0]?.id;
 27 |   });
 28 | 
 29 |   afterAll(async () => {
 30 |     if (createdSchoolId) {
 31 |       await request(app.getHttpServer())
 32 |         .delete(`/schools/${createdSchoolId}`)
 33 |         .set('Authorization', `Bearer ${token}`);
 34 |     }
 35 |     await app.close();
 36 |   });
 37 | 
 38 |   describe('GET /schools', () => {
 39 |     it('повертає список шкіл', async () => {
 40 |       const res = await request(app.getHttpServer())
 41 |         .get('/schools')
 42 |         .set('Authorization', `Bearer ${token}`)
 43 |         .expect(200);
 44 |       expect(Array.isArray(res.body)).toBe(true);
 45 |     });
 46 | 
 47 |     it('minimal=true — немає include полів', async () => {
 48 |       const res = await request(app.getHttpServer())
 49 |         .get('/schools?minimal=true')
 50 |         .set('Authorization', `Bearer ${token}`)
 51 |         .expect(200);
 52 |       expect(Array.isArray(res.body)).toBe(true);
 53 |     });
 54 | 
 55 |     it('повертає 401 без токена', async () => {
 56 |       await request(app.getHttpServer()).get('/schools').expect(401);
 57 |     });
 58 | 
 59 |     it('кожна школа має обовязкові поля', async () => {
 60 |       const res = await request(app.getHttpServer())
 61 |         .get('/schools')
 62 |         .set('Authorization', `Bearer ${token}`)
 63 |         .expect(200);
 64 | 
 65 |       if (res.body.length > 0) {
 66 |         const school = res.body[0];
 67 |         expect(school).toHaveProperty('id');
 68 |         expect(school).toHaveProperty('name');
 69 |         expect(school).toHaveProperty('type');
 70 |         expect(school).toHaveProperty('cityId');
 71 |       }
 72 |     });
 73 |   });
 74 | 
 75 |   describe('POST /schools', () => {
 76 |     it('створює нову школу', async () => {
 77 |       if (!cityId) return;
 78 | 
 79 |       const res = await request(app.getHttpServer())
 80 |         .post('/schools')
 81 |         .set('Authorization', `Bearer ${token}`)
 82 |         .send({
 83 |           name: 'E2E Тестова школа',
 84 |           type: 'Школа',
 85 |           cityId,
 86 |           director: 'Тест Тестович',
 87 |           phone: '0671234567',
 88 |         })
 89 |         .expect(201);
 90 | 
 91 |       expect(res.body).toHaveProperty('id');
 92 |       expect(res.body.name).toBe('E2E Тестова школа');
 93 |       createdSchoolId = res.body.id;
 94 |     });
 95 | 
 96 |     it('повертає 401 без токена', async () => {
 97 |       await request(app.getHttpServer())
 98 |         .post('/schools')
 99 |         .send({ name: 'Test', type: 'Школа', cityId: 'city-1' })
100 |         .expect(401);
101 |     });
102 |   });
103 | 
104 |   describe('GET /schools/:id', () => {
105 |     it('повертає школу по id', async () => {
106 |       if (!createdSchoolId) return;
107 | 
108 |       const res = await request(app.getHttpServer())
109 |         .get(`/schools/${createdSchoolId}`)
110 |         .set('Authorization', `Bearer ${token}`)
111 |         .expect(200);
112 | 
113 |       expect(res.body.id).toBe(createdSchoolId);
114 |       expect(res.body).toHaveProperty('city');
115 |     });
116 | 
117 |     it('повертає 404 для неіснуючої школи', async () => {
118 |       await request(app.getHttpServer())
119 |         .get('/schools/nonexistent-id-99999')
120 |         .set('Authorization', `Bearer ${token}`)
121 |         .expect(404);
122 |     });
123 |   });
124 | 
125 |   describe('PATCH /schools/:id', () => {
126 |     it('оновлює дані школи', async () => {
127 |       if (!createdSchoolId) return;
128 | 
129 |       const res = await request(app.getHttpServer())
130 |         .patch(`/schools/${createdSchoolId}`)
131 |         .set('Authorization', `Bearer ${token}`)
132 |         .send({ director: 'Новий Директор' })
133 |         .expect(200);
134 | 
135 |       expect(res.body.director).toBe('Новий Директор');
136 |     });
137 |   });
138 | 
139 |   describe('DELETE /schools/:id', () => {
140 |     it('видаляє школу разом з подіями', async () => {
141 |       if (!cityId) return;
142 | 
143 |       const createRes = await request(app.getHttpServer())
144 |         .post('/schools')
145 |         .set('Authorization', `Bearer ${token}`)
146 |         .send({ name: 'Школа для видалення E2E', type: 'Школа', cityId });
147 | 
148 |       const deleteId = createRes.body.id;
149 |       if (!deleteId) return;
150 | 
151 |       await request(app.getHttpServer())
152 |         .delete(`/schools/${deleteId}`)
153 |         .set('Authorization', `Bearer ${token}`)
154 |         .expect(200);
155 | 
156 |       await request(app.getHttpServer())
157 |         .get(`/schools/${deleteId}`)
158 |         .set('Authorization', `Bearer ${token}`)
159 |         .expect(404);
160 |     });
161 |   });
162 | });
163 | 
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
 22 |     rules: {
 23 |       '@typescript-eslint/no-explicit-any': 'error',
 24 |     },
 25 |   },
 26 | ])
 27 | 
 28 | 
 29 | 
```

### File: apps/frontend/package.json
```json
  0 | {
  1 |   "name": "frontend",
  2 |   "private": true,
  3 |   "version": "0.0.0",
  4 |   "type": "module",
  5 |   "scripts": {
  6 |     "dev": "vite",
  7 |     "build": "vite build",
  8 |     "lint": "eslint .",
  9 |     "preview": "vite preview",
 10 |     "test": "vitest",
 11 |     "test:ui": "vitest --ui",
 12 |     "test:run": "vitest run",
 13 |     "test:coverage": "vitest run --coverage",
 14 |     "pretest:e2e": "playwright install --with-deps chromium",
 15 |     "test:e2e": "playwright test",
 16 |     "test:e2e:ui": "playwright test --ui"
 17 |   },
 18 |   "dependencies": {
 19 |     "@hookform/resolvers": "^5.4.0",
 20 |     "@tanstack/react-query": "^5.101.0",
 21 |     "@tanstack/react-virtual": "^3.14.3",
 22 |     "axios": "^1.18.0",
 23 |     "framer-motion": "^12.41.0",
 24 |     "jwt-decode": "^4.0.0",
 25 |     "lucide-react": "^1.20.0",
 26 |     "react": "^19.2.6",
 27 |     "react-dom": "^19.2.6",
 28 |     "react-hook-form": "^7.79.0",
 29 |     "react-router-dom": "^7.18.0",
 30 |     "recharts": "^3.8.1",
 31 |     "zod": "^4.4.3",
 32 |     "zustand": "^5.0.14"
 33 |   },
 34 |   "devDependencies": {
 35 |     "@eslint/js": "^10.0.1",
 36 |     "@lhci/cli": "^0.15.1",
 37 |     "@playwright/test": "^1.61.1",
 38 |     "@testing-library/jest-dom": "^6.9.1",
 39 |     "@testing-library/react": "^16.3.2",
 40 |     "@testing-library/user-event": "^14.6.1",
 41 |     "@types/node": "^24.12.3",
 42 |     "@types/react": "^19.2.14",
 43 |     "@types/react-dom": "^19.2.3",
 44 |     "@vitejs/plugin-react": "^6.0.1",
 45 |     "@vitest/ui": "^4.1.9",
 46 |     "autoprefixer": "^10.5.0",
 47 |     "eslint": "^10.3.0",
 48 |     "eslint-plugin-react-hooks": "^7.1.1",
 49 |     "eslint-plugin-react-refresh": "^0.5.2",
 50 |     "globals": "^17.6.0",
 51 |     "husky": "^9.1.7",
 52 |     "jsdom": "^29.1.1",
 53 |     "msw": "^2.14.6",
 54 |     "postcss": "^8.5.15",
 55 |     "tailwindcss": "^3.4.19",
 56 |     "typescript": "~6.0.2",
 57 |     "typescript-eslint": "^8.59.2",
 58 |     "vite": "^8.0.12",
 59 |     "vite-plugin-image-optimizer": "^2.0.3",
 60 |     "vitest": "^4.1.9"
 61 |   }
 62 | }
 63 | 
```

### File: apps/frontend/playwright.config.ts
```ts
  0 | import { defineConfig } from "@playwright/test";
  1 | 
  2 | export default defineConfig({
  3 |   testDir: "./e2e",
  4 |   fullyParallel: true,
  5 |   retries: 1,
  6 |   reporter: [["html", { outputFolder: "playwright-report", open: "never" }], ["list"]],
  7 |   use: {
  8 |     baseURL: "http://localhost:5173",
  9 |     trace: "on-first-retry",
 10 |     screenshot: "only-on-failure",
 11 |   },
 12 |   webServer: {
 13 |     command: "npm run dev",
 14 |     url: "http://localhost:5173",
 15 |     reuseExistingServer: !process.env.CI,
 16 |   },
 17 | });
 18 | 
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
  8 | import Layout from "./components/Layout";
  9 | import Login from "./pages/Login";
 10 | import { CityProvider } from "./context/CityContext";
 11 | import { api } from "./config/api";
 12 | 
 13 | import ProtectedRoute from "./components/ProtectedRoute";
 14 | 
 15 | const CityProfile = lazy(() => import("./pages/CityProfile"));
 16 | const EventReport = lazy(() => import("./pages/EventReport"));
 17 | 
 18 | const Cities = lazy(() => import("./pages/Cities"));
 19 | const Schools = lazy(() => import("./pages/Schools"));
 20 | const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
 21 | const Employees = lazy(() => import("./pages/Employees"));
 22 | const Finance = lazy(() => import("./pages/Finance"));
 23 | const CalendarView = lazy(() => import("./pages/CalendarView"));
 24 | const Dashboard = lazy(() => import("./pages/Dashboard"));
 25 | const Kindergartens = lazy(() => import("./pages/Kindergartens"));
 26 | 
 27 | const PageLoader = () => (
 28 |   <div className="flex items-center justify-center h-full min-h-[50vh]">
 29 |     <div className="text-slate-400 font-medium animate-pulse">
 30 |       Завантаження сторінки...
 31 |     </div>
 32 |   </div>
 33 | );
 34 | 
 35 | export default function App() {
 36 |   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
 37 |     !!localStorage.getItem("user"),
 38 |   );
 39 | 
 40 |   const handleLogin = () => {
 41 |     setIsAuthenticated(true);
 42 |   };
 43 | 
 44 |   const handleLogout = async () => {
 45 |     try {
 46 |       await api.post("/auth/logout");
 47 |     } catch {
 48 |       // ігноруємо — все одно чистимо локальний стан
 49 |     }
 50 |     localStorage.removeItem("user");
 51 |     setIsAuthenticated(false);
 52 |   };
 53 | 
 54 |   return (
 55 |     <Router>
 56 |       <CityProvider>
 57 |         <Routes>
 58 |           {/* Публічний маршрут: Логін */}
 59 |           <Route
 60 |             path="/login"
 61 |             element={
 62 |               !isAuthenticated ? (
 63 |                 <Login onLogin={handleLogin} />
 64 |               ) : (
 65 |                 <Navigate to="/cities" replace />
 66 |               )
 67 |             }
 68 |           />
 69 | 
 70 |           {/* Захищені маршрути (Layout відображає бокове меню) */}
 71 |           <Route
 72 |             path="/"
 73 |             element={
 74 |               isAuthenticated ? (
 75 |                 <Layout onLogout={handleLogout} />
 76 |               ) : (
 77 |                 <Navigate to="/login" replace />
 78 |               )
 79 |             }
 80 |           >
 81 |             {/* Редірект з кореня на сторінку міст за замовчуванням */}
 82 |             <Route index element={<Navigate to="/schools" replace />} />
 83 | 
 84 |             {/* Обгортаємо всі вкладені маршрути в Suspense. 
 85 |               Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
 86 |               поки завантажується файл з сервера.
 87 |             */}
 88 |             <Route
 89 |               path="cities"
 90 |               element={
 91 |                 <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
 92 |                   <Suspense fallback={<PageLoader />}>
 93 |                     <Cities />
 94 |                   </Suspense>
 95 |                 </ProtectedRoute>
 96 |               }
 97 |             />
 98 | 
 99 |             <Route
100 |               path="schools"
101 |               element={
102 |                 <Suspense fallback={<PageLoader />}>
103 |                   <Schools />
104 |                 </Suspense>
105 |               }
106 |             />
107 | 
108 |             <Route
109 |               path="schools/:id"
110 |               element={
111 |                 <Suspense fallback={<PageLoader />}>
112 |                   <SchoolProfile />
113 |                 </Suspense>
114 |               }
115 |             />
116 | 
117 |             <Route
118 |               path="employees"
119 |               element={
120 |                 <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
121 |                   <Suspense fallback={<PageLoader />}>
122 |                     <Employees />
123 |                   </Suspense>
124 |                 </ProtectedRoute>
125 |               }
126 |             />
127 | 
128 |             <Route
129 |               path="finance"
130 |               element={
131 |                 <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
132 |                   <Suspense fallback={<PageLoader />}>
133 |                     <Finance />
134 |                   </Suspense>
135 |                 </ProtectedRoute>
136 |               }
137 |             />
138 | 
139 |             <Route
140 |               path="calendar"
141 |               element={
142 |                 <Suspense fallback={<PageLoader />}>
143 |                   <CalendarView />
144 |                 </Suspense>
145 |               }
146 |             />
147 |             <Route
148 |               path="dashboard"
149 |               element={
150 |                 <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
151 |                   <Suspense fallback={<PageLoader />}>
152 |                     <Dashboard />
153 |                   </Suspense>
154 |                 </ProtectedRoute>
155 |               }
156 |             />
157 | 
158 |             <Route
159 |               path="kindergartens"
160 |               element={
161 |                 <Suspense fallback={<PageLoader />}>
162 |                   <Kindergartens />
163 |                 </Suspense>
164 |               }
165 |             />
166 | 
167 |             <Route
168 |               path="cities/:id"
169 |               element={
170 |                 <Suspense fallback={<PageLoader />}>
171 |                   <CityProfile />
172 |                 </Suspense>
173 |               }
174 |             />
175 | 
176 |             <Route
177 |               path="events/:id/report"
178 |               element={
179 |                 <Suspense fallback={<PageLoader />}>
180 |                   <EventReport />
181 |                 </Suspense>
182 |               }
183 |             />
184 |           </Route>
185 |         </Routes>
186 |       </CityProvider>
187 |     </Router>
188 |   );
189 | }
190 | 
```

### File: apps/frontend/src/components/AddressLink.tsx
```tsx
  0 | interface AddressLinkProps {
  1 |   address?: string | null;
  2 |   className?: string;
  3 | }
  4 | 
  5 | export default function AddressLink({ address, className }: AddressLinkProps) {
  6 |   if (!address) return <span className="text-slate-400">—</span>;
  7 | 
  8 |   const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  9 |     address,
 10 |   )}`;
 11 | 
 12 |   return (
 13 |     <a
 14 |       href={mapsUrl}
 15 |       target="_blank"
 16 |       rel="noopener noreferrer"
 17 |       onClick={(e) => e.stopPropagation()}
 18 |       title="Відкрити в Google Maps"
 19 |       className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
 20 |         className ?? ""
 21 |       }`}
 22 |     >
 23 |       <svg
 24 |         viewBox="0 0 24 24"
 25 |         fill="none"
 26 |         stroke="currentColor"
 27 |         strokeWidth={1.8}
 28 |         className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
 29 |       >
 30 |         <path
 31 |           strokeLinecap="round"
 32 |           strokeLinejoin="round"
 33 |           d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
 34 |         />
 35 |         <path
 36 |           strokeLinecap="round"
 37 |           strokeLinejoin="round"
 38 |           d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
 39 |         />
 40 |       </svg>
 41 |       <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
 42 |         {address}
 43 |       </span>
 44 |     </a>
 45 |   );
 46 | }
 47 | 
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
 79 |       {}
 80 |       <div className="flex overflow-x-auto pb-4 -mx-1 px-1">
 81 |         {issues.map((issue) => {
 82 |           const isExiting = exitingIssueId === issue.id;
 83 | 
 84 |           return (
 85 |             <div
 86 |               key={issue.id}
 87 |               className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
 88 |                 isExiting
 89 |                   ? "w-0 min-w-0 mr-0 opacity-0 pointer-events-none"
 90 |                  : "w-[300px] min-w-[300px] mr-4 opacity-100 shrink-0"
 91 |               }`}
 92 |             >
 93 |               {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
 94 |               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
 95 |                 <div>
 96 |                   <p className="text-xs text-slate-400 mb-1">
 97 |                     {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
 98 |                       day: "2-digit",
 99 |                       month: "2-digit",
100 |                       year: "numeric",
101 |                       hour: "2-digit",
102 |                       minute: "2-digit",
103 |                     })}
104 |                   </p>
105 |                   <p className="font-bold text-slate-800 text-sm">
106 |                     {issue.schoolName}
107 |                   </p>
108 |                   <p className="text-xs text-slate-500">{issue.eventName}</p>
109 |                 </div>
110 | 
111 |                 <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
112 |                   "{issue.message}"
113 |                 </p>
114 | 
115 |                 <button
116 |                   onClick={() => handleStatusToggle(issue)}
117 |                   className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
118 |                 >
119 |                   ● {issue.status} → натисни щоб змінити
120 |                 </button>
121 |               </div>
122 |             </div>
123 |           );
124 |         })}
125 |       </div>
126 |     </div>
127 |   );
128 | }
129 | 
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
 14 |   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
 31 |     }
 32 |   }, []);
 33 | 
 34 |   const token = localStorage.getItem("token");
 35 |   let isSuperAdmin = false;
 36 | 
 37 |   interface DecodedToken {
 38 |     role: string;
 39 |   }
 40 | 
 41 |   if (token) {
 42 |     try {
 43 |       const decoded = jwtDecode<DecodedToken>(token);
 44 |       isSuperAdmin = decoded.role === "SUPERADMIN";
 45 |     } catch (error) {
 46 |       console.error("Не вдалося розкодувати токен:", error);
 47 |     }
 48 |   }
 49 | 
 50 |   const isActive = (path: string) => location.pathname.startsWith(path);
 51 | 
 52 |   const handleLogout = () => {
 53 |     localStorage.removeItem("token");
 54 |     localStorage.removeItem("user");
 55 |     navigate("/login");
 56 |   };
 57 | 
 58 |   const handleLinkClick = () => {
 59 |     setIsMobileMenuOpen(false);
 60 |   };
 61 | 
 62 |   return (
 63 |     <div className="flex h-screen bg-slate-50 font-sans">
 64 |       {/* Мобільний хедер (видно тільки на малих екранах) */}
 65 |       <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
 66 |         <div className="flex items-center gap-2">
 67 |           <span className="text-xl">🎓</span>
 68 |           <span className="font-semibold tracking-wider text-sm">
 69 |             СВІТЛО ЗНАНЬ
 70 |           </span>
 71 |           <span className="text-xs text-blue-300 ml-1">
 72 |             · {selectedCity.name}
 73 |           </span>
 74 |         </div>
 75 |         <button
 76 |           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 77 |           className="p-2 focus:outline-none"
 78 |         >
 79 |           {/* Проста іконка гамбургера / хрестика */}
 80 |           <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
 81 |         </button>
 82 |       </div>
 83 | 
 84 |       {/* Оверлей для мобільного меню (затемнення фону) */}
 85 |       {isMobileMenuOpen && (
 86 |         <div
 87 |           className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
 88 |           onClick={() => setIsMobileMenuOpen(false)}
 89 |         />
 90 |       )}
 91 | 
 92 |       {/* Сайдбар */}
 93 |       <aside
 94 |         className={`
 95 |         fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
 96 |         md:relative md:translate-x-0
 97 |         ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
 98 |       `}
 99 |       >
100 |         <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
101 |           <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-2xl">
102 |             🎓
103 |           </div>
104 |           <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
105 |           <p className="text-xs text-blue-300 mt-1 tracking-wide">
106 |             📍 {selectedCity.name}
107 |           </p>
108 |         </div>
109 | 
110 |         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
111 |           {is(["SUPERADMIN", "MANAGER"]) && (
112 |             <Link
113 |               to="/dashboard"
114 |               onClick={handleLinkClick}
115 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/dashboard") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
116 |             >
117 |               <span className="mr-3">🏠</span> Дашборд
118 |             </Link>
119 |           )}
120 |           {is(["SUPERADMIN", "MANAGER"]) && (
121 |             <Link
122 |               to="/cities"
123 |               onClick={handleLinkClick}
124 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/cities") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
125 |             >
126 |               <span className="mr-3">📍</span> Міста
127 |             </Link>
128 |           )}
129 |           <Link
130 |             to="/schools"
131 |             onClick={handleLinkClick}
132 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/schools") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
133 |           >
134 |             <span className="mr-3">🏫</span> Школи
135 |           </Link>
136 | 
137 |           {/* ДОДАЛИ НОВИЙ ПУНКТ "САДОЧКИ" */}
138 |           <Link
139 |             to="/kindergartens"
140 |             onClick={handleLinkClick}
141 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/kindergartens") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
142 |           >
143 |             <span className="mr-3">🧸</span> Садочки
144 |           </Link>
145 |           {is(["SUPERADMIN", "MANAGER"]) && (
146 |             <Link
147 |               to="/finance"
148 |               onClick={handleLinkClick}
149 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/finance") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
150 |             >
151 |               <span className="mr-3">💰</span> Фінанси
152 |             </Link>
153 |           )}
154 |           <Link
155 |             to="/calendar"
156 |             onClick={handleLinkClick}
157 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/calendar") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
158 |           >
159 |             <span className="mr-3">📆</span> Календар
160 |           </Link>
161 |           {is(["SUPERADMIN"]) && (
162 |             <Link
163 |               to="/employees"
164 |               onClick={handleLinkClick}
165 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/employees") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
166 |             >
167 |               <span className="mr-3">👥</span> Працівники
168 |             </Link>
169 |           )}
170 |         </nav>
171 | 
172 |         <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
173 |           <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
174 |             <div className="flex items-center">
175 |               <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
176 |                 {user?.name?.charAt(0) ?? "?"}
177 |               </div>
178 |               <div className="text-sm truncate max-w-[120px]">
179 |                 <p className="font-medium text-white truncate">
180 |                   {user?.name ?? "Користувач"}
181 |                 </p>
182 |                 <p className="text-xs text-slate-400 truncate">
183 |                   {user?.role ?? ""}
184 |                 </p>
185 |               </div>
186 |             </div>
187 |             <button
188 |               onClick={handleLogout}
189 |               className="text-slate-500 hover:text-slate-300 transition-colors text-xs ml-2 shrink-0 p-2"
190 |               title="Вийти"
191 |             >
192 |               ⬅️
193 |             </button>
194 |           </div>
195 |         </div>
196 |       </aside>
197 | 
198 |       {/* Головна область */}
199 |       <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full">
200 |         <Outlet />
201 |       </main>
202 |     </div>
203 |   );
204 | }
205 | 
```

### File: apps/frontend/src/components/PhoneLink.tsx
```tsx
  0 | interface PhoneLinkProps {
  1 |   phone?: string | null;
  2 |   className?: string;
  3 | }
  4 | 
  5 | export default function PhoneLink({ phone, className }: PhoneLinkProps) {
  6 |   if (!phone) return <span className="text-slate-400">—</span>;
  7 | 
  8 |   const cleaned = phone.replace(/[^\d+]/g, "");
  9 | 
 10 |   return (
 11 |     <a
 12 |       href={`tel:${cleaned}`}
 13 |       onClick={(e) => e.stopPropagation()}
 14 |       title="Зателефонувати"
 15 |       className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
 16 |         className ?? ""
 17 |       }`}
 18 |     >
 19 |       <svg
 20 |         viewBox="0 0 24 24"
 21 |         fill="none"
 22 |         stroke="currentColor"
 23 |         strokeWidth={1.8}
 24 |         className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
 25 |       >
 26 |         <path
 27 |           strokeLinecap="round"
 28 |           strokeLinejoin="round"
 29 |           d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.439l-3.808-1.142a1.5 1.5 0 00-1.55.43l-1.05 1.05a11.25 11.25 0 01-5.516-5.516l1.05-1.05a1.5 1.5 0 00.43-1.55L8.36 3.327A1.5 1.5 0 006.92 2.25H5.55A2.25 2.25 0 003.3 4.5v.75"
 30 |         />
 31 |       </svg>
 32 |       <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
 33 |         {phone}
 34 |       </span>
 35 |     </a>
 36 |   );
 37 | }
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
 18 | function CityCard({
 19 |   city,
 20 |   index,
 21 |   isSelected,
 22 |   onSelect,
 23 | }: {
 24 |   city: any;
 25 |   index: number;
 26 |   isSelected: boolean;
 27 |   onSelect: () => void;
 28 | }) {
 29 |   const navigate = useNavigate();
 30 |   const imgRef = useRef<HTMLImageElement>(null);
 31 | 
 32 |   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
 33 |     const img = imgRef.current;
 34 |     if (!img) return;
 35 |     const rect = e.currentTarget.getBoundingClientRect();
 36 |     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
 37 |     const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
 38 |     img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
 39 |   }, []);
 40 | 
 41 |   const handleMouseLeave = useCallback(() => {
 42 |     const img = imgRef.current;
 43 |     if (!img) return;
 44 |     img.style.transform = "scale(1) translate(0, 0)";
 45 |   }, []);
 46 | 
 47 |   return (
 48 |     <div
 49 |       style={{
 50 |         animationDelay: `${index * 60}ms`,
 51 |         animationFillMode: "both",
 52 |       }}
 53 |       className={`
 54 |         city-card-enter
 55 |         bg-white rounded-2xl shadow-sm border overflow-hidden group
 56 |         transition-[transform,box-shadow] duration-300 ease-out
 57 |         hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl
 58 |         ${
 59 |           isSelected
 60 |             ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md"
 61 |             : "border-slate-100 hover:border-blue-200"
 62 |         }
 63 |       `}
 64 |     >
 65 |       {/* Фото з паралаксом і градієнтом Netflix-стилю */}
 66 |       <div
 67 |         className="h-44 overflow-hidden relative"
 68 |         onMouseMove={handleMouseMove}
 69 |         onMouseLeave={handleMouseLeave}
 70 |       >
 71 |         <img
 72 |           ref={imgRef}
 73 |           src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
 74 |           alt={city.name}
 75 |           loading="lazy"
 76 |           decoding="async"
 77 |           className="w-full h-full object-cover transition-transform duration-300 ease-out"
 78 |           onError={(e) => {
 79 |             (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
 80 |           }}
 81 |         />
 82 | 
 83 |         {/* Темний градієнт знизу — назва міста чітко читається */}
 84 |         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
 85 | 
 86 |         {/* Назва міста поверх градієнта */}
 87 |         <div className="absolute bottom-0 left-0 right-0 p-4">
 88 |           <h2 className="text-white text-xl font-bold drop-shadow-sm leading-tight">
 89 |             {city.name}
 90 |           </h2>
 91 |         </div>
 92 | 
 93 |         {/* Чекмарк якщо місто обрано */}
 94 |         {isSelected && (
 95 |           <div className="check-enter absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
 96 |             <svg
 97 |               className="w-5 h-5"
 98 |               fill="none"
 99 |               stroke="currentColor"
100 |               viewBox="0 0 24 24"
101 |             >
102 |               <path
103 |                 strokeLinecap="round"
104 |                 strokeLinejoin="round"
105 |                 strokeWidth={3}
106 |                 d="M5 13l4 4L19 7"
107 |               />
108 |             </svg>
109 |           </div>
110 |         )}
111 |       </div>
112 | 
113 |       {/* Контент картки */}
114 |       <div className="p-5">
115 |         <div className="flex items-center justify-between mb-3">
116 |           <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
117 |             Активне
118 |           </span>
119 |         </div>
120 | 
121 |         <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
122 |           <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
123 |             {city.manager?.name?.charAt(0) ?? "?"}
124 |           </div>
125 |           <span>
126 |             Менеджер:{" "}
127 |             <span className="font-medium">{city.manager?.name ?? "—"}</span>
128 |           </span>
129 |         </div>
130 | 
131 |         <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
132 |           <div className="flex justify-between text-slate-500">
133 |             <span>Заплановано подій:</span>
134 |             <span className="font-semibold text-slate-800">
135 |               {city.plannedEvents ?? 0}
136 |             </span>
137 |           </div>
138 |         </div>
139 | 
140 |         <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
141 |           <button
142 |             onClick={onSelect}
143 |             className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-200 ${
144 |               isSelected
145 |                 ? "bg-blue-50 text-blue-700 border border-blue-200 scale-[0.98]"
146 |                 : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
147 |             }`}
148 |           >
149 |             <span className="inline-flex items-center gap-1.5 transition-all duration-200">
150 |               {isSelected ? "✓ Обрано" : "Вибрати"}
151 |             </span>
152 |           </button>
153 |           <button
154 |             onClick={() => navigate(`/cities/${city.id}`)}
155 |             className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
156 |           >
157 |             →
158 |           </button>
159 |         </div>
160 |       </div>
161 |     </div>
162 |   );
163 | }
164 | 
165 | export default function CityDesktopGrid({
166 |   cities,
167 |   selectedCity,
168 |   onSelectCity,
169 | }: any) {
170 |   return (
171 |     <>
172 |       {}
173 |       <style>{`
174 |         @keyframes cityCardIn {
175 |           from { opacity: 0; transform: translateY(20px) scale(0.97); }
176 |           to   { opacity: 1; transform: translateY(0) scale(1); }
177 |         }
178 |         .city-card-enter {
179 |           animation: cityCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
180 |         }
181 |         @keyframes checkIn {
182 |           from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
183 |           to   { opacity: 1; transform: scale(1) rotate(0deg); }
184 |         }
185 |         .check-enter {
186 |           animation: checkIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
187 |         }
188 |       `}</style>
189 | 
190 |       <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
191 |         {cities.map((city: any, index: number) => (
192 |           <CityCard
193 |             key={city.id}
194 |             city={city}
195 |             index={index}
196 |             isSelected={selectedCity?.id === city.id}
197 |             onSelect={() => onSelectCity({ id: city.id, name: city.name })}
198 |           />
199 |         ))}
200 |       </div>
201 |     </>
202 |   );
203 | }
204 | 
```

### File: apps/frontend/src/components/cities/CityMobileHeader.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { api } from "../../config/api";
  3 | 
  4 | interface Props {
  5 |   selectedCity: any;
  6 |   cities: any[]; 
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
 72 |     if (nextStatus === "Виконано") {
 73 |       setExitingIssueId(issue.id);
 74 |       setTimeout(() => {
 75 |         setIssues((prev) => {
 76 |           const next = prev.filter((i) => i.id !== issue.id);
 77 |           if (next.length === 0) {
 78 |             setIsExpanded(false);
 79 |             setIssuesExiting(true);
 80 |             setTimeout(() => {
 81 |               setIssuesVisible(false);
 82 |               setIssuesExiting(false);
 83 |             }, 300);
 84 |           }
 85 |           return next;
 86 |         });
 87 |         setExitingIssueId(null);
 88 |       }, 400);
 89 |     } else {
 90 |       setIssues((prev) =>
 91 |         prev.map((i) => (i.id === issue.id ? { ...i, status: nextStatus } : i)),
 92 |       );
 93 |     }
 94 | 
 95 |     api
 96 |       .patch(`/issues/${issue.id}/status`, { status: nextStatus })
 97 |       .catch((e) => {
 98 |         console.error(e);
 99 |         setIssues((prev) =>
100 |           prev.map((i) =>
101 |             i.id === issue.id ? { ...i, status: issue.status } : i,
102 |           ),
103 |         );
104 |       });
105 |   };
106 | 
107 |   const currentCityData = cities?.find((c: any) => c.id === selectedCity?.id);
108 |   const totalEvents =
109 |     (currentCityData?.plannedEvents || 0) +
110 |     (currentCityData?.completedEvents || 0);
111 |   const schoolsCount = currentCityData?.schoolsCount || 0;
112 | 
113 |   return (
114 |     <div className="md:hidden flex flex-col gap-4 mb-4">
115 |       <style>{`
116 |         @keyframes slideDown {
117 |           from { opacity: 0; transform: translateY(-10px); }
118 |           to { opacity: 1; transform: translateY(0); }
119 |         }
120 |         @keyframes slideUp {
121 |           from { opacity: 1; transform: translateY(0); max-height: 200px; }
122 |           to { opacity: 0; transform: translateY(-8px); max-height: 0; }
123 |         }
124 |         @keyframes expandDown {
125 |           from { opacity: 0; transform: translateY(-6px); }
126 |           to { opacity: 1; transform: translateY(0); }
127 |         }
128 |         @keyframes cityNameChange {
129 |           0% { opacity: 1; transform: translateY(0); }
130 |           40% { opacity: 0; transform: translateY(-6px); }
131 |           60% { opacity: 0; transform: translateY(6px); }
132 |           100% { opacity: 1; transform: translateY(0); }
133 |         }
134 |         .city-name-change {
135 |           animation: cityNameChange 0.35s cubic-bezier(0.16, 1, 0.3, 1);
136 |         }
137 |         .issues-enter {
138 |           animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
139 |           opacity: 0;
140 |         }
141 |         .issues-exit {
142 |           animation: slideUp 0.3s ease-in forwards;
143 |           overflow: hidden;
144 |         }
145 |         .expand-enter {
146 |           animation: expandDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
147 |           opacity: 0;
148 |         }
149 |         @keyframes collapseUp {
150 |           from { opacity: 1; transform: translateY(0); }
151 |           to { opacity: 0; transform: translateY(-8px); }
152 |         }
153 |         .expand-exit {
154 |           animation: collapseUp 0.22s ease-in forwards;
155 |         }
156 |         @keyframes statusFlash {
157 |           0% { transform: scale(1); }
158 |           40% { transform: scale(0.95); opacity: 0.7; }
159 |           100% { transform: scale(1); opacity: 1; }
160 |         }
161 |         .status-flash {
162 |           animation: statusFlash 0.2s ease-out;
163 |         }
164 |       `}</style>
165 | 
166 |       {/* Сповіщення про проблему з розгортанням */}
167 |       {issuesVisible && (
168 |         <div
169 |           className={`bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm ${issuesExiting ? "issues-exit" : "issues-enter"}`}
170 |         >
171 |           <div
172 |             className="flex items-center gap-4 cursor-pointer"
173 |             onClick={() => {
174 |               if (isExpanded) {
175 |                 setIsListExiting(true);
176 |                 setTimeout(() => {
177 |                   setIsExpanded(false);
178 |                   setIsListExiting(false);
179 |                 }, 250);
180 |               } else {
181 |                 setIsExpanded(true);
182 |               }
183 |             }}
184 |           >
185 |             <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
186 |               🔔
187 |             </div>
188 |             <div className="flex-1 min-w-0">
189 |               <p className="font-bold text-slate-800 text-sm">
190 |                 {issues.length} активн
191 |                 {issues.length === 1
192 |                   ? "а проблема"
193 |                   : issues.length < 5
194 |                     ? "і проблеми"
195 |                     : "их проблем"}
196 |               </p>
197 |               {!isExpanded && (
198 |                 <p className="text-xs text-slate-600 truncate mt-0.5">
199 |                   {issues[0]?.schoolName}
200 |                 </p>
201 |               )}
202 |             </div>
203 |             <button
204 |               className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
205 |               style={{
206 |                 transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
207 |               }}
208 |             >
209 |               ›
210 |             </button>
211 |           </div>
212 | 
213 |           {/* Розгорнутий список проблем */}
214 |           {isExpanded && (
215 |             <div
216 |               className={`flex flex-col gap-3 mt-2 pt-3 border-t border-red-100/50 ${isListExiting ? "expand-exit" : "expand-enter"}`}
217 |             >
218 |               {issues.map((issue) => {
219 |                 const isExiting = exitingIssueId === issue.id;
220 |                 return (
221 |                   <div
222 |                     key={issue.id}
223 |                     className={`bg-white rounded-2xl p-4 border border-red-100 shadow-sm relative transition-all duration-400 ease-in-out transform origin-top ${
224 |                       isExiting
225 |                         ? "opacity-0 scale-95 h-0 overflow-hidden !p-0 border-0"
226 |                         : "opacity-100 scale-100"
227 |                     }`}
228 |                   >
229 |                     <p className="text-[11px] text-slate-400 mb-1">
230 |                       {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
231 |                         day: "2-digit",
232 |                         month: "2-digit",
233 |                         year: "numeric",
234 |                         hour: "2-digit",
235 |                         minute: "2-digit",
236 |                       })}
237 |                     </p>
238 |                     <p className="font-bold text-slate-800 text-sm">
239 |                       {issue.schoolName}
240 |                     </p>
241 |                     <p className="text-[11px] text-slate-500 mb-3">
242 |                       {issue.eventName}
243 |                     </p>
244 | 
245 |                     <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed border border-slate-100 mb-3">
246 |                       "{issue.message}"
247 |                     </p>
248 | 
249 |                     <button
250 |                       onClick={() => handleStatusToggle(issue)}
251 |                       key={issue.status}
252 |                       className={`status-flash w-full text-xs font-bold px-3 py-2.5 rounded-lg border transition-colors text-left flex items-center gap-1.5 ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
253 |                     >
254 |                       <span className="text-[10px]">●</span> {issue.status}{" "}
255 |                       <span className="font-normal opacity-70">
256 |                         → натисни щоб змінити
257 |                       </span>
258 |                     </button>
259 |                   </div>
260 |                 );
261 |               })}
262 |             </div>
263 |           )}
264 |         </div>
265 |       )}
266 | 
267 |       {/* Поточне місто */}
268 |       {selectedCity?.id && (
269 |         <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
270 |           <div className="flex justify-between items-center mb-4">
271 |             <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
272 |               Поточне місто
273 |             </span>
274 |             <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
275 |               ✓ Активне місто
276 |             </span>
277 |           </div>
278 | 
279 |           <div className="flex items-center gap-3 mb-4">
280 |             <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg city-name-change">
281 |               {CITY_ICONS[selectedCity.name] || DEFAULT_CITY_ICON}
282 |             </div>
283 |             <h2
284 |               key={selectedCity.id}
285 |               className="text-2xl font-bold text-slate-800 city-name-change"
286 |             >
287 |               {selectedCity.name}
288 |             </h2>
289 |           </div>
290 | 
291 |           <div className="flex items-center justify-between text-xs font-medium gap-2">
292 |             <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
293 |               <span className="text-blue-500 text-sm">📅</span> {totalEvents}{" "}
294 |               подій
295 |             </div>
296 |             <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
297 |               <span className="text-blue-500 text-sm">🏫</span> {schoolsCount}{" "}
298 |               шкіл
299 |             </div>
300 |             <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
301 |               <span className="text-sm">⚠️</span> {issues.length} проблем
302 |             </div>
303 |             {/* <button 
304 |               onClick={() => navigate(`/cities/${selectedCity.id}`)} 
305 |               className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
306 |             >
307 |               →
308 |             </button> */}
309 |           </div>
310 |         </div>
311 |       )}
312 |     </div>
313 |   );
314 | }
315 | 
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
108 |                 style={{ animationDelay: `${index * 50}ms` }}
109 |                 className={`
110 |                   city-row-enter
111 |                   flex items-center p-4 border-b border-slate-50
112 |                   transition-[background-color,transform] duration-150
113 |                   active:scale-[0.99] active:bg-slate-50
114 |                   ${isSelected ? "bg-blue-50/30" : ""}
115 |                 `}
116 |                 onClick={() => onSelectCity({ id: city.id, name: city.name })}
117 |               >
118 |                 {/* Іконка */}
119 |                 <div
120 |                   className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${ICON_COLORS[index % ICON_COLORS.length]}`}
121 |                 >
122 |                   {CITY_ICONS[city.name] || DEFAULT_CITY_ICON}
123 |                 </div>
124 | 
125 |                 {/* Текст */}
126 |                 <div className="flex-1 min-w-0">
127 |                   <p className="font-bold text-slate-800 text-base">
128 |                     {city.name}
129 |                   </p>
130 |                   <p className="text-xs font-medium text-slate-400 mt-0.5">
131 |                     {totalEvents} подій • {city.schoolsCount || 0} шкіл
132 |                   </p>
133 |                 </div>
134 | 
135 |                 {/* Стрілка переходу */}
136 |                 <button
137 |                   onClick={(e) => {
138 |                     e.stopPropagation();
139 |                     navigate(`/cities/${city.id}`);
140 |                   }}
141 |                   className="p-3 text-slate-400 hover:text-blue-600 text-2xl font-light leading-none transition-colors"
142 |                 >
143 |                   ›
144 |                 </button>
145 |               </div>
146 |             );
147 |           })}
148 | 
149 |           {filteredCities.length === 0 && (
150 |             <div className="p-8 text-center text-slate-400 font-medium">
151 |               Міст не знайдено
152 |             </div>
153 |           )}
154 |         </div>
155 |       </div>
156 |     </>
157 |   );
158 | }
159 | 
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
 50 | interface Group {
 51 |   key:       string;
 52 |   userName:  string;
 53 |   role:      string;
 54 |   schoolId:  string | null;
 55 |   schoolName: string | null;
 56 |   actions:   { id: string; action: string; comment: string | null; createdAt: string }[];
 57 | }
 58 | 
 59 | function groupItems(items: ActivityItem[]): Group[] {
 60 |   const groups: Group[] = [];
 61 | 
 62 |   for (const item of items) {
 63 |     const last = groups[groups.length - 1];
 64 |     const sameUser   = last?.userName  === item.userName;
 65 |     const sameSchool = last?.schoolId  === item.schoolId; 
 66 | 
 67 |     if (last && sameUser && sameSchool) {
 68 |       last.actions.push({ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt });
 69 |     } else {
 70 |       groups.push({
 71 |         key:        item.id,
 72 |         userName:   item.userName,
 73 |         role:       item.role,
 74 |         schoolId:   item.schoolId,
 75 |         schoolName: item.schoolName,
 76 |         actions:    [{ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt }],
 77 |       });
 78 |     }
 79 |   }
 80 | 
 81 |   return groups;
 82 | }
 83 | 
 84 | const COLLAPSED_COUNT = 2;
 85 | 
 86 | interface Props {
 87 |   items: ActivityItem[];
 88 | }
 89 | 
 90 | export default function ActivityFeed({ items }: Props) {
 91 |   const navigate  = useNavigate();
 92 |   const [expanded, setExpanded] = useState(false);
 93 | 
 94 |   const groups   = groupItems(items);
 95 |   const visible  = expanded ? groups : groups.slice(0, COLLAPSED_COUNT);
 96 |   const hasMore  = groups.length > COLLAPSED_COUNT;
 97 | 
 98 |   return (
 99 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
100 | 
101 |       {/* Хедер */}
102 |       <div className="flex justify-between items-center mb-3">
103 |         <p className="text-sm font-semibold text-slate-800">Активність команди</p>
104 |         <span className="text-xs text-slate-400">{formatDate(items[0]?.createdAt ?? new Date().toISOString())}</span>
105 |       </div>
106 | 
107 |       {items.length === 0 ? (
108 |         <div className="py-6 text-center text-slate-400 text-sm">
109 |           Сьогодні активності ще немає
110 |         </div>
111 |       ) : (
112 |         <>
113 |           <div className="flex flex-col gap-1">
114 |             {visible.map((group) => {
115 |               const avatarColor = ROLE_COLORS[group.role] ?? 'bg-slate-100 text-slate-600';
116 |               const shownActions = group.actions.slice(-3);
117 |               const hiddenCount  = group.actions.length - shownActions.length;
118 |               const lastTime     = formatTime(group.actions[group.actions.length - 1].createdAt);
119 | 
120 |               return (
121 |                 <div key={group.key} className="flex items-start gap-3 py-2 px-2 -mx-1 rounded-xl hover:bg-slate-50/60 transition-colors">
122 | 
123 |                   {/* Аватар */}
124 |                   <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${avatarColor}`}>
125 |                     {getInitials(group.userName)}
126 |                   </div>
127 | 
128 |                   {/* Контент */}
129 |                   <div className="min-w-0 flex-1">
130 | 
131 |                     {/* Ім'я + школа */}
132 |                     <p className="text-xs font-semibold text-slate-800 leading-tight">
133 |                       {group.userName}
134 |                       {group.schoolName && (
135 |                         <>
136 |                           {' · '}
137 |                           <button
138 |                             onClick={() => group.schoolId && navigate(`/schools/${group.schoolId}`)}
139 |                             className="text-blue-600 hover:underline font-medium"
140 |                           >
141 |                             {group.schoolName}
142 |                           </button>
143 |                         </>
144 |                       )}
145 |                     </p>
146 | 
147 |                     {/* Дії */}
148 |                     <div className="mt-1 flex flex-col gap-0.5">
149 |                       {hiddenCount > 0 && (
150 |                         <p className="text-xs text-slate-400 italic">+{hiddenCount} раніше</p>
151 |                       )}
152 |                       {shownActions.map((a) => (
153 |                         <p key={a.id} className="text-xs text-slate-500 leading-snug">
154 |                           — {a.action.replace(/\.$/, '')}
155 |                           {a.comment && (
156 |                             <span className="text-slate-400 italic"> «{a.comment}»</span>
157 |                           )}
158 |                         </p>
159 |                       ))}
160 |                     </div>
161 |                   </div>
162 | 
163 |                   {/* Час останньої дії */}
164 |                   <span className="text-xs text-slate-400 shrink-0 pt-0.5">{lastTime}</span>
165 | 
166 |                 </div>
167 |               );
168 |             })}
169 |           </div>
170 | 
171 |           {/* Кнопка згорнути/розгорнути */}
172 |           {hasMore && (
173 |             <button
174 |               onClick={() => setExpanded(v => !v)}
175 |               className="mt-3 pt-3 border-t border-slate-50 text-xs text-blue-600 hover:underline text-center w-full"
176 |             >
177 |               {expanded
178 |                 ? '↑ Згорнути'
179 |                 : `↓ Показати ще ${groups.length - COLLAPSED_COUNT}`}
180 |             </button>
181 |           )}
182 |         </>
183 |       )}
184 | 
185 |     </div>
186 |   );
187 | }
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
 20 |   const progress = base > 0 ? Math.round((done / base) * 100) : 0;
 21 | 
 22 |   const counts = PIPELINE_STAGES.map(s => funnel[s.key] ?? 0);
 23 |   const maxCount = Math.max(...counts, 1);
 24 | 
 25 |   return (
 26 |     <div>
 27 |       <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
 28 |         Воронка роботи зі школами
 29 |       </p>
 30 | 
 31 |       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
 32 | 
 33 |         {/* Прогрес по місту */}
 34 |         <div className="mb-4">
 35 |           <div className="flex justify-between items-baseline mb-1.5">
 36 |             <span className="text-xs text-slate-500">Прогрес по місту</span>
 37 |             <span className="text-sm font-bold text-slate-800">{progress}%</span>
 38 |           </div>
 39 |           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
 40 |             <div
 41 |               className="h-full bg-emerald-500 rounded-full transition-all duration-500"
 42 |               style={{ width: `${progress}%` }}
 43 |             />
 44 |           </div>
 45 |           <p className="text-[11px] text-slate-400 mt-1">
 46 |             {done} з {base} шкіл дійшли до проведення події
 47 |           </p>
 48 |         </div>
 49 | 
 50 |         {/* Стадії */}
 51 |         <div className="flex flex-col gap-2">
 52 |           {PIPELINE_STAGES.map((stage) => {
 53 |             const count    = funnel[stage.key] ?? 0;
 54 |             const barWidth = Math.round((count / maxCount) * 100);
 55 | 
 56 |             return (
 57 |               <button
 58 |                 key={stage.key}
 59 |                 onClick={() => navigate('/schools')}
 60 |                 className="flex items-center gap-3 group w-full text-left"
 61 |               >
 62 |                 {/* Іконка */}
 63 |                 <div className={`w-6 h-6 rounded-md ${stage.bg} flex items-center justify-center text-xs shrink-0`}>
 64 |                   {stage.icon}
 65 |                 </div>
 66 | 
 67 |                 {/* Назва */}
 68 |                 <span className="text-xs text-slate-600 w-36 shrink-0 truncate group-hover:text-slate-900 transition-colors">
 69 |                   {stage.name}
 70 |                 </span>
 71 | 
 72 |                 {/* Бар */}
 73 |                 <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
 74 |                   <div
 75 |                     className={`h-full rounded-full transition-all duration-300 ${stage.bar}`}
 76 |                     style={{ width: `${barWidth}%` }}
 77 |                   />
 78 |                 </div>
 79 | 
 80 |                 {/* Кількість */}
 81 |                 <span className={`text-xs font-bold w-6 text-right shrink-0 ${stage.color}`}>
 82 |                   {count}
 83 |                 </span>
 84 |               </button>
 85 |             );
 86 |           })}
 87 |         </div>
 88 | 
 89 |       </div>
 90 |     </div>
 91 |   );
 92 | }
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
  0 | import { useNavigate } from "react-router-dom";
  1 | 
  2 | const STAGE_LABELS: Record<string, string> = {
  3 |   BASE: "База",
  4 |   FIRST_CONTACT: "Перший контакт",
  5 |   INTERESTED: "Зацікавлені",
  6 |   PRE_APPROVAL: "Попереднє погодження",
  7 |   DATE_CONFIRMED: "Підтвердження дати",
  8 |   PREPARATION: "Підготовка",
  9 |   IN_PROGRESS: "Подія в роботі",
 10 | };
 11 | 
 12 | interface Tier {
 13 |   label: string;
 14 |   emoji: string;
 15 |   min: number;
 16 |   max: number;
 17 |   dot: string;
 18 |   badge: string;
 19 |   bar: string;
 20 |   row: string;
 21 | }
 22 | 
 23 | const TIERS: Tier[] = [
 24 |   {
 25 |     label: "Критично",
 26 |     emoji: "🔴",
 27 |     min: 21,
 28 |     max: Infinity,
 29 |     dot: "bg-red-500",
 30 |     badge: "bg-red-100 text-red-700 border border-red-200",
 31 |     bar: "bg-red-500",
 32 |     row: "hover:bg-red-50/40",
 33 |   },
 34 |   {
 35 |     label: "Небезпечно",
 36 |     emoji: "🟠",
 37 |     min: 14,
 38 |     max: 20,
 39 |     dot: "bg-orange-400",
 40 |     badge: "bg-orange-100 text-orange-700 border border-orange-200",
 41 |     bar: "bg-orange-400",
 42 |     row: "hover:bg-orange-50/40",
 43 |   },
 44 |   {
 45 |     label: "Увага",
 46 |     emoji: "🟡",
 47 |     min: 7,
 48 |     max: 13,
 49 |     dot: "bg-amber-400",
 50 |     badge: "bg-amber-100 text-amber-700 border border-amber-200",
 51 |     bar: "bg-amber-400",
 52 |     row: "hover:bg-amber-50/30",
 53 |   },
 54 | ];
 55 | 
 56 | function getTier(days: number): Tier {
 57 |   return TIERS.find((t) => days >= t.min && days <= t.max) ?? TIERS[2];
 58 | }
 59 | 
 60 | function barWidth(days: number): number {
 61 |   return Math.min(100, Math.round((days / 30) * 100));
 62 | }
 63 | 
 64 | interface StaleSchool {
 65 |   id: string;
 66 |   name: string;
 67 |   status: string | null;
 68 |   daysStale: number | null;
 69 | }
 70 | 
 71 | interface Props {
 72 |   schools: StaleSchool[];
 73 | }
 74 | 
 75 | export default function StaleSchools({ schools }: Props) {
 76 |   const navigate = useNavigate();
 77 | 
 78 |   const sorted = [...schools].sort(
 79 |     (a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0),
 80 |   );
 81 | 
 82 |   const criticalCount = schools.filter((s) => (s.daysStale ?? 0) >= 21).length;
 83 | 
 84 |   return (
 85 |     <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
 86 |       {/* Хедер */}
 87 |       <div className="flex justify-between items-center mb-4">
 88 |         <div className="flex items-center gap-2">
 89 |           <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
 90 |             <span className="text-xs">⚠️</span>
 91 |           </div>
 92 |           <p className="text-sm font-semibold text-slate-800">
 93 |             Потребують уваги
 94 |           </p>
 95 |           {criticalCount > 0 && (
 96 |             <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
 97 |               {criticalCount}
 98 |             </span>
 99 |           )}
100 |         </div>
101 |         <button
102 |           onClick={() => navigate("/schools")}
103 |           className="text-xs text-blue-600 hover:underline shrink-0"
104 |         >
105 |           Переглянути всі
106 |         </button>
107 |       </div>
108 | 
109 |       {schools.length === 0 ? (
110 |         <div className="py-6 text-center">
111 |           <p className="text-2xl mb-1">✅</p>
112 |           <p className="text-sm text-slate-400">Усі школи активні</p>
113 |         </div>
114 |       ) : (
115 |         <div className="flex flex-col gap-1">
116 |           {sorted.map((school) => {
117 |             const days = school.daysStale ?? 0;
118 |             const tier = getTier(days);
119 |             const stageLabel = school.status
120 |               ? (STAGE_LABELS[school.status] ?? school.status)
121 |               : "—";
122 |             const width = barWidth(days);
123 | 
124 |             return (
125 |               <div
126 |                 key={school.id}
127 |                 onClick={() => navigate(`/schools/${school.id}`)}
128 |                 className={`group relative flex items-center gap-3 py-2.5 px-2 -mx-1 rounded-xl cursor-pointer transition-colors ${tier.row}`}
129 |               >
130 |                 {/* Кольорова крапка-індикатор */}
131 |                 <div className={`w-2 h-2 rounded-full shrink-0 ${tier.dot}`} />
132 | 
133 |                 {/* Назва + стадія + прогрес-бар */}
134 |                 <div className="min-w-0 flex-1">
135 |                   <p className="text-sm font-medium text-slate-800 truncate leading-tight">
136 |                     {school.name}
137 |                   </p>
138 |                   <p className="text-xs text-slate-400 mt-0.5 mb-1.5">
139 |                     {stageLabel}
140 |                   </p>
141 | 
142 |                   {/* Heat bar */}
143 |                   <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
144 |                     <div
145 |                       className={`h-full rounded-full transition-all ${tier.bar}`}
146 |                       style={{ width: `${width}%` }}
147 |                     />
148 |                   </div>
149 |                 </div>
150 | 
151 |                 {/* Badge з днями */}
152 |                 <span
153 |                   className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tier.badge}`}
154 |                 >
155 |                   {days} дн
156 |                 </span>
157 |               </div>
158 |             );
159 |           })}
160 |         </div>
161 |       )}
162 | 
163 |       {/* Футер — легенда тирів */}
164 |       {schools.length > 0 && (
165 |         <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-50">
166 |           {TIERS.map((t) => {
167 |             const count = schools.filter(
168 |               (s) => (s.daysStale ?? 0) >= t.min && (s.daysStale ?? 0) <= t.max,
169 |             ).length;
170 |             if (count === 0) return null;
171 |             return (
172 |               <span
173 |                 key={t.label}
174 |                 className="flex items-center gap-1 text-xs text-slate-400"
175 |               >
176 |                 {t.emoji}{" "}
177 |                 <span className="font-medium text-slate-600">{count}</span>{" "}
178 |                 {t.label.toLowerCase()}
179 |               </span>
180 |             );
181 |           })}
182 |         </div>
183 |       )}
184 |     </div>
185 |   );
186 | }
187 | 
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
 34 | const fmt = (n: number) =>
 35 |   new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
 36 | 
 37 | 
 38 | const KpiCard = memo(function KpiCard({
 39 |   title,
 40 |   value,
 41 |   color,
 42 |   bg,
 43 |   icon,
 44 |   subtitle,
 45 | }: any) {
 46 |   return (
 47 |     <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
 48 |       <div className="flex justify-between items-start mb-4">
 49 |         <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight pr-2">
 50 |           {title}
 51 |         </p>
 52 |         <div
 53 |           className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-sm ${bg}`}
 54 |         >
 55 |           {icon}
 56 |         </div>
 57 |       </div>
 58 |       <div>
 59 |         <p
 60 |           className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${color}`}
 61 |         >
 62 |           {fmt(value)}{" "}
 63 |           <span className="text-sm font-bold text-slate-400 opacity-60">
 64 |             грн
 65 |           </span>
 66 |         </p>
 67 |         {subtitle && (
 68 |           <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 font-medium">
 69 |             {subtitle}
 70 |           </p>
 71 |         )}
 72 |       </div>
 73 |     </div>
 74 |   );
 75 | });
 76 | 
 77 | const EmptyState = memo(function EmptyState() {
 78 |   return (
 79 |     <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-slate-400">
 80 |       <span className="text-3xl mb-3 opacity-50">📂</span>
 81 |       <span className="text-sm font-medium">Немає даних за цей період</span>
 82 |     </div>
 83 |   );
 84 | });
 85 | 
 86 | const EventTable = memo(function EventTable({
 87 |   events,
 88 |   positive,
 89 | }: {
 90 |   events: any[];
 91 |   positive: boolean;
 92 | }) {
 93 |   if (!events || !events.length) return <EmptyState />;
 94 |   return (
 95 |     <table className="w-full text-sm min-w-[300px]">
 96 |       <thead>
 97 |         <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
 98 |           <th className="text-left pb-3 font-semibold tracking-wider">Дата</th>
 99 |           <th className="text-left pb-3 font-semibold tracking-wider">
100 |             Заклад
101 |           </th>
102 |           <th className="text-right pb-3 font-semibold tracking-wider">
103 |             Прибуток
104 |           </th>
105 |         </tr>
106 |       </thead>
107 |       <tbody>
108 |         {events.map((e: any, i: number) => (
109 |           <tr
110 |             key={i}
111 |             className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
112 |           >
113 |             <td className="py-3 text-slate-500 whitespace-nowrap">
114 |               {new Date(e.date).toLocaleDateString("uk-UA", {
115 |                 day: "2-digit",
116 |                 month: "2-digit",
117 |               })}
118 |             </td>
119 |             <td className="py-3 font-medium text-slate-700 truncate max-w-[120px] sm:max-w-[200px] pr-2">
120 |               {e.school}
121 |             </td>
122 |             <td
123 |               className={`py-3 text-right font-bold whitespace-nowrap ${
124 |                 positive ? "text-emerald-600" : "text-rose-500"
125 |               }`}
126 |             >
127 |               {fmt(e.profit)} грн
128 |             </td>
129 |           </tr>
130 |         ))}
131 |       </tbody>
132 |     </table>
133 |   );
134 | });
135 | 
136 | const CustomTooltip = memo(function CustomTooltip({
137 |   active,
138 |   payload,
139 |   label,
140 | }: any) {
141 |   if (!active || !payload?.length) return null;
142 |   return (
143 |     <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
144 |       <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
145 |         {label}
146 |       </p>
147 |       {payload.map((entry: any, index: number) => (
148 |         <div
149 |           key={index}
150 |           className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
151 |         >
152 |           <div className="flex items-center gap-2">
153 |             <div
154 |               className="w-2.5 h-2.5 rounded-full shadow-sm"
155 |               style={{ backgroundColor: entry.color }}
156 |             />
157 |             <span className="text-slate-500">{entry.name}:</span>
158 |           </div>
159 |           <span className="font-bold text-slate-800">
160 |             {fmt(entry.value)} грн
161 |           </span>
162 |         </div>
163 |       ))}
164 |     </div>
165 |   );
166 | });
167 | 
168 | 
169 | const RevenueChart = memo(function RevenueChart({
170 |   monthly,
171 | }: {
172 |   monthly: any[];
173 | }) {
174 |   if (!monthly?.length) return <EmptyState />;
175 |   const data = monthly.slice(-12);
176 |   return (
177 |     <ResponsiveContainer width="100%" height="100%">
178 |       <AreaChart
179 |         data={data}
180 |         margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
181 |       >
182 |         <defs>
183 |           <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
184 |             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
185 |             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
186 |           </linearGradient>
187 |           <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
188 |             <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
189 |             <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
190 |           </linearGradient>
191 |         </defs>
192 |         <CartesianGrid
193 |           strokeDasharray="3 3"
194 |           vertical={false}
195 |           stroke="#f1f5f9"
196 |         />
197 |         <XAxis
198 |           dataKey="month"
199 |           tick={{ fontSize: 12, fill: "#64748b" }}
200 |           axisLine={false}
201 |           tickLine={false}
202 |           dy={10}
203 |           minTickGap={20}
204 |         />
205 |         <YAxis
206 |           tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
207 |           tick={{ fontSize: 12, fill: "#64748b" }}
208 |           axisLine={false}
209 |           tickLine={false}
210 |         />
211 |         <Tooltip
212 |           content={<CustomTooltip />}
213 |           cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
214 |         />
215 |         <Area
216 |           type="monotone"
217 |           name="Виручка"
218 |           dataKey="revenue"
219 |           stroke="#3b82f6"
220 |           strokeWidth={3}
221 |           fill="url(#colorRevenue)"
222 |           activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
223 |           isAnimationActive={false}
224 |         />
225 |         <Area
226 |           type="monotone"
227 |           name="Прибуток"
228 |           dataKey="profit"
229 |           stroke="#10b981"
230 |           strokeWidth={3}
231 |           fill="url(#colorProfit)"
232 |           activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
233 |           isAnimationActive={false}
234 |         />
235 |       </AreaChart>
236 |     </ResponsiveContainer>
237 |   );
238 | });
239 | 
240 | const ProjectPieChart = memo(function ProjectPieChart({
241 |   byProject,
242 |   projectTotals,
243 | }: {
244 |   byProject: any[];
245 |   projectTotals: { total: number; percents: number[] };
246 | }) {
247 |   if (!byProject?.length) return <EmptyState />;
248 |   return (
249 |     <>
250 |       <div className="h-[200px] md:h-[220px] w-full relative mb-6 shrink-0">
251 |         <ResponsiveContainer width="100%" height="100%">
252 |           <PieChart>
253 |             <Pie
254 |               data={byProject}
255 |               dataKey="value"
256 |               nameKey="name"
257 |               innerRadius={60}
258 |               outerRadius={85}
259 |               paddingAngle={3}
260 |               stroke="none"
261 |               isAnimationActive={false}
262 |             >
263 |               {byProject.map((_: any, index: number) => (
264 |                 <Cell
265 |                   key={`cell-${index}`}
266 |                   fill={PIE_COLORS[index % PIE_COLORS.length]}
267 |                 />
268 |               ))}
269 |             </Pie>
270 |             <Tooltip content={<CustomTooltip />} />
271 |           </PieChart>
272 |         </ResponsiveContainer>
273 |       </div>
274 |       <div className="flex-1 overflow-y-auto space-y-3 pr-2">
275 |         {byProject.map((item: any, idx: number) => (
276 |           <div key={idx} className="flex items-center justify-between text-sm">
277 |             <div className="flex items-center gap-3 min-w-0 pr-2">
278 |               <div
279 |                 className="w-3 h-3 rounded-full shrink-0"
280 |                 style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
281 |               />
282 |               <span className="text-slate-600 truncate font-medium">
283 |                 {item.name}
284 |               </span>
285 |             </div>
286 |             <div className="flex items-center gap-3 shrink-0">
287 |               <span className="text-xs text-slate-400 font-medium w-8 text-right">
288 |                 {projectTotals.percents[idx]}%
289 |               </span>
290 |               <span className="font-bold text-slate-800 w-20 text-right">
291 |                 {fmt(item.value)}
292 |               </span>
293 |             </div>
294 |           </div>
295 |         ))}
296 |       </div>
297 |     </>
298 |   );
299 | });
300 | 
301 | const ExpenseChart = memo(function ExpenseChart({
302 |   byExpenseCategory,
303 | }: {
304 |   byExpenseCategory: any[];
305 | }) {
306 |   if (!byExpenseCategory?.length) return <EmptyState />;
307 |   return (
308 |     <div className="h-[280px] w-full min-w-[300px] -ml-4">
309 |       <ResponsiveContainer width="100%" height="100%">
310 |         <BarChart
311 |           data={byExpenseCategory}
312 |           layout="vertical"
313 |           margin={{ top: 0, right: 20, left: 30, bottom: 0 }}
314 |         >
315 |           <CartesianGrid
316 |             strokeDasharray="3 3"
317 |             horizontal={true}
318 |             vertical={false}
319 |             stroke="#f1f5f9"
320 |           />
321 |           <XAxis type="number" hide />
322 |           <YAxis
323 |             dataKey="name"
324 |             type="category"
325 |             axisLine={false}
326 |             tickLine={false}
327 |             tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
328 |             width={120}
329 |           />
330 |           <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
331 |           <Bar
332 |             dataKey="value"
333 |             name="Сума"
334 |             fill="#f43f5e"
335 |             radius={[0, 8, 8, 0]}
336 |             barSize={20}
337 |             isAnimationActive={false}
338 |           >
339 |             {byExpenseCategory.map((_: any, idx: number) => (
340 |               <Cell key={`cell-${idx}`} fill={PALETTE[idx % PALETTE.length]} />
341 |             ))}
342 |           </Bar>
343 |         </BarChart>
344 |       </ResponsiveContainer>
345 |     </div>
346 |   );
347 | });
348 | 
349 | const TopSchools = memo(function TopSchools({
350 |   topSchools,
351 | }: {
352 |   topSchools: any[];
353 | }) {
354 |   if (!topSchools?.length) return <EmptyState />;
355 |   const maxRev = topSchools[0].revenue;
356 |   return (
357 |     <div className="space-y-5">
358 |       {topSchools.map((school: any, idx: number) => {
359 |         const percent = Math.max((school.revenue / maxRev) * 100, 2);
360 |         return (
361 |           <div key={idx} className="relative">
362 |             <div className="flex justify-between items-end mb-2 text-sm">
363 |               <div className="flex items-center gap-2 min-w-0 pr-4">
364 |                 <span className="font-bold text-slate-400 w-4">{idx + 1}.</span>
365 |                 <span className="font-bold text-slate-700 truncate">
366 |                   {school.name}
367 |                 </span>
368 |               </div>
369 |               <span className="font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
370 |                 {fmt(school.revenue)} грн
371 |               </span>
372 |             </div>
373 |             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
374 |               <div
375 |                 className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
376 |                 style={{ width: `${percent}%` }}
377 |               />
378 |             </div>
379 |           </div>
380 |         );
381 |       })}
382 |     </div>
383 |   );
384 | });
385 | 
386 | 
387 | interface Props {
388 |   data: any;
389 |   period: string;
390 |   setPeriod: (v: string) => void;
391 |   projectFilter: string;
392 |   setProjectFilter: (v: string) => void;
393 |   selectedCity: any;
394 | }
395 | 
396 | 
397 | export default memo(function FinanceCharts({
398 |   data,
399 |   period,
400 |   setPeriod,
401 |   projectFilter,
402 |   setProjectFilter,
403 |   selectedCity,
404 | }: Props) {
405 |   const {
406 |     kpi,
407 |     monthly,
408 |     byProject,
409 |     byExpenseCategory,
410 |     topSchools,
411 |     topEvents,
412 |     worstEvents,
413 |     expectedRevenue,
414 |     filters,
415 |   } = data;
416 | 
417 |   const projectTotals = useMemo(() => {
418 |     const total =
419 |       byProject?.reduce((sum: number, p: any) => sum + p.value, 0) ?? 0;
420 |     const percents = (byProject ?? []).map((item: any) =>
421 |       total > 0 ? Math.round((item.value / total) * 100) : 0,
422 |     );
423 |     return { total, percents };
424 |   }, [byProject]);
425 | 
426 |   return (
427 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans overflow-x-hidden">
428 |       {/* Шапка та фільтри */}
429 |       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
430 |         <div>
431 |           <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
432 |             Фінанси
433 |           </h1>
434 |           <p className="text-slate-500 text-sm mt-1">
435 |             Аналітика доходів та витрат{" "}
436 |             {selectedCity.id ? (
437 |               <span className="font-medium text-blue-600">
438 |                 {selectedCity.name}
439 |               </span>
440 |             ) : (
441 |               "по всіх містах"
442 |             )}
443 |           </p>
444 |         </div>
445 |         <div className="flex flex-wrap items-center gap-3">
446 |           <select
447 |             value={period}
448 |             onChange={(e) => setPeriod(e.target.value)}
449 |             className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
450 |           >
451 |             <option value="all">За весь час</option>
452 |             <option value="year">Цей рік</option>
453 |             <option value="quarter">Цей квартал</option>
454 |             <option value="month">Цей місяць</option>
455 |           </select>
456 | 
457 |           <select
458 |             value={projectFilter}
459 |             onChange={(e) => setProjectFilter(e.target.value)}
460 |             className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
461 |           >
462 |             <option value="">Всі проєкти</option>
463 |             {filters?.projects?.map((p: string) => (
464 |               <option key={p} value={p}>
465 |                 {p}
466 |               </option>
467 |             ))}
468 |           </select>
469 |         </div>
470 |       </div>
471 | 
472 |       {/* KPI Картки */}
473 |       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
474 |         <KpiCard
475 |           title="Загальна виручка"
476 |           value={kpi.totalRevenue}
477 |           color="text-blue-600"
478 |           bg="bg-blue-50"
479 |           icon="💰"
480 |         />
481 |         <KpiCard
482 |           title="Чистий прибуток"
483 |           value={kpi.totalProfit}
484 |           color="text-emerald-600"
485 |           bg="bg-emerald-50"
486 |           icon="📈"
487 |         />
488 |         <KpiCard
489 |           title="Витрати"
490 |           value={kpi.totalExpenses}
491 |           color="text-rose-600"
492 |           bg="bg-rose-50"
493 |           icon="📉"
494 |         />
495 |         <KpiCard
496 |           title="Очікувана виручка"
497 |           value={expectedRevenue}
498 |           color="text-amber-500"
499 |           bg="bg-amber-50"
500 |           icon="⏳"
501 |           subtitle="Із запланованих подій"
502 |         />
503 |       </div>
504 | 
505 |       {/* Верхній ряд графіків */}
506 |       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
507 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 xl:col-span-2">
508 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
509 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
510 |               📊
511 |             </span>
512 |             Динаміка виручки та прибутку
513 |           </h3>
514 |           <div className="h-[280px] md:h-[320px] w-full -ml-4 sm:ml-0">
515 |             <RevenueChart monthly={monthly} />
516 |           </div>
517 |         </div>
518 | 
519 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 flex flex-col">
520 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
521 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
522 |               🎯
523 |             </span>
524 |             Доходи за проєктами
525 |           </h3>
526 |           <ProjectPieChart
527 |             byProject={byProject}
528 |             projectTotals={projectTotals}
529 |           />
530 |         </div>
531 |       </div>
532 | 
533 |       {/* Нижній ряд */}
534 |       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
535 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
536 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
537 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
538 |               💳
539 |             </span>
540 |             Статті витрат
541 |           </h3>
542 |           <ExpenseChart byExpenseCategory={byExpenseCategory} />
543 |         </div>
544 | 
545 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7">
546 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
547 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
548 |               🏫
549 |             </span>
550 |             Топ-5 найприбутковіших закладів
551 |           </h3>
552 |           <TopSchools topSchools={topSchools} />
553 |         </div>
554 |       </div>
555 | 
556 |       {/* Найкращі і найгірші події */}
557 |       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
558 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
559 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
560 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
561 |               🏆
562 |             </span>
563 |             Найприбутковіші події
564 |           </h3>
565 |           <EventTable events={topEvents} positive={true} />
566 |         </div>
567 |         <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
568 |           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
569 |             <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
570 |               ⚠️
571 |             </span>
572 |             Найменш прибуткові події
573 |           </h3>
574 |           <EventTable events={worstEvents} positive={false} />
575 |         </div>
576 |       </div>
577 |     </div>
578 |   );
579 | });
580 | 
```

### File: apps/frontend/src/components/finance/StaffFinanceView.tsx
```tsx
  0 | import { useState, useEffect, useMemo, memo } from "react";
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
 18 | 
 19 | const BalanceCard = memo(function BalanceCard({
 20 |   myBalance,
 21 | }: {
 22 |   myBalance: number | null;
 23 | }) {
 24 |   return (
 25 |     <div className="flex items-center justify-center py-10">
 26 |       <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-10 text-center max-w-sm w-full">
 27 |         <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-4">
 28 |           💰
 29 |         </div>
 30 |         <p className="text-sm text-slate-400 mb-2">Ваш баланс</p>
 31 |         <p className="text-4xl font-black text-blue-600 tracking-tight">
 32 |           {myBalance !== null ? fmt(myBalance) : "—"}
 33 |           <span className="text-lg font-bold text-slate-400 ml-1">грн</span>
 34 |         </p>
 35 |         <p className="text-xs text-slate-400 mt-4">
 36 |           Сума нарахованих зарплат за всі події
 37 |         </p>
 38 |       </div>
 39 |     </div>
 40 |   );
 41 | });
 42 | 
 43 | interface StaffMemberProps {
 44 |   member: any;
 45 |   index: number;
 46 |   maxRevenue: number;
 47 | }
 48 | 
 49 | const StaffMemberRow = memo(function StaffMemberRow({
 50 |   member,
 51 |   index,
 52 |   maxRevenue,
 53 | }: StaffMemberProps) {
 54 |   const pct = Math.round((member.revenue / maxRevenue) * 100);
 55 |   const isTop = index === 0;
 56 |   return (
 57 |     <div>
 58 |       <div className="flex items-center justify-between mb-1.5">
 59 |         <div className="flex items-center gap-2">
 60 |           <span
 61 |             className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
 62 |               isTop
 63 |                 ? "bg-amber-100 text-amber-700"
 64 |                 : "bg-slate-100 text-slate-500"
 65 |             }`}
 66 |           >
 67 |             {index + 1}
 68 |           </span>
 69 |           <span className="text-sm font-semibold text-slate-800">
 70 |             {member.name}
 71 |           </span>
 72 |           {isTop && (
 73 |             <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
 74 |               🏆 Топ
 75 |             </span>
 76 |           )}
 77 |         </div>
 78 |         <div className="text-right">
 79 |           <p className="text-sm font-bold text-slate-800">
 80 |             {fmt(member.revenue)} грн
 81 |           </p>
 82 |           <p className="text-xs text-slate-400">{member.eventsCount} подій</p>
 83 |         </div>
 84 |       </div>
 85 |       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
 86 |         <div
 87 |           className={`h-full rounded-full transition-all duration-500 ${
 88 |             isTop ? "bg-amber-400" : "bg-blue-400"
 89 |           }`}
 90 |           style={{ width: `${pct}%` }}
 91 |         />
 92 |       </div>
 93 |     </div>
 94 |   );
 95 | });
 96 | 
 97 | 
 98 | export default memo(function StaffFinanceView({
 99 |   myBalance,
100 |   selectedCity,
101 | }: Props) {
102 |   const [tab, setTab] = useState<"balance" | "revenue">("balance");
103 |   const [period, setPeriod] = useState("year");
104 |   const [staffData, setStaffData] = useState<any>(null);
105 |   const [loadingStaff, setLoadingStaff] = useState(false);
106 | 
107 |   useEffect(() => {
108 |     if (tab !== "revenue") return;
109 |     setLoadingStaff(true);
110 |     const params = new URLSearchParams();
111 |     if (period) params.set("period", period);
112 |     if (selectedCity?.id) params.set("cityId", selectedCity.id);
113 |     api
114 |       .get(`/finance/staff-revenue?${params}`)
115 |       .then((r) => setStaffData(r.data))
116 |       .catch(() => {})
117 |       .finally(() => setLoadingStaff(false));
118 |   }, [tab, period, selectedCity?.id]);
119 | 
120 |   const maxRevenue = staffData?.staff?.[0]?.revenue ?? 1;
121 | 
122 |   const staffByRole = useMemo(() => {
123 |     if (!staffData?.staff) return { hosts: [], drivers: [] };
124 |     return {
125 |       hosts: staffData.staff.filter((s: any) => s.role === "HOST"),
126 |       drivers: staffData.staff.filter((s: any) => s.role === "DRIVER"),
127 |     };
128 |   }, [staffData]);
129 | 
130 |   return (
131 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
132 |       <h1 className="text-2xl font-bold text-slate-800 mb-6">Фінанси</h1>
133 | 
134 |       {/* Вкладки */}
135 |       <div className="flex gap-2 mb-6">
136 |         <button
137 |           onClick={() => setTab("balance")}
138 |           className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
139 |             tab === "balance"
140 |               ? "bg-blue-600 text-white shadow-sm"
141 |               : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
142 |           }`}
143 |         >
144 |           💰 Мій баланс
145 |         </button>
146 |         <button
147 |           onClick={() => setTab("revenue")}
148 |           className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
149 |             tab === "revenue"
150 |               ? "bg-blue-600 text-white shadow-sm"
151 |               : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
152 |           }`}
153 |         >
154 |           📊 Виручка команди
155 |         </button>
156 |       </div>
157 | 
158 |       {tab === "balance" && <BalanceCard myBalance={myBalance} />}
159 | 
160 |       {tab === "revenue" && (
161 |         <div className="flex flex-col gap-5">
162 |           <div className="flex items-center gap-3">
163 |             <select
164 |               value={period}
165 |               onChange={(e) => setPeriod(e.target.value)}
166 |               className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none shadow-sm"
167 |             >
168 |               <option value="year">Цей рік</option>
169 |               <option value="quarter">Цей квартал</option>
170 |               <option value="month">Цей місяць</option>
171 |               <option value="all">За весь час</option>
172 |             </select>
173 |             {selectedCity?.name && (
174 |               <span className="text-sm text-slate-500">
175 |                 📍 {selectedCity.name}
176 |               </span>
177 |             )}
178 |           </div>
179 | 
180 |           {loadingStaff ? (
181 |             <div className="flex items-center justify-center py-16">
182 |               <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
183 |             </div>
184 |           ) : !staffData || staffData.staff.length === 0 ? (
185 |             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
186 |               <p className="text-3xl mb-3">📊</p>
187 |               <p>Немає даних за обраний період</p>
188 |             </div>
189 |           ) : (
190 |             <>
191 |               <div className="grid grid-cols-2 gap-4">
192 |                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
193 |                   <p className="text-xs text-slate-400 mb-1">
194 |                     Загальна виручка
195 |                   </p>
196 |                   <p className="text-2xl font-black text-blue-600">
197 |                     {fmt(staffData.totalRevenue)}{" "}
198 |                     <span className="text-sm font-medium text-slate-400">
199 |                       грн
200 |                     </span>
201 |                   </p>
202 |                   <p className="text-xs text-slate-400 mt-1">
203 |                     {PERIOD_LABELS[period]}
204 |                   </p>
205 |                 </div>
206 |                 <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
207 |                   <p className="text-xs text-slate-400 mb-1">Подій проведено</p>
208 |                   <p className="text-2xl font-black text-slate-800">
209 |                     {staffData.eventsCount}
210 |                   </p>
211 |                   <p className="text-xs text-slate-400 mt-1">
212 |                     {PERIOD_LABELS[period]}
213 |                   </p>
214 |                 </div>
215 |               </div>
216 | 
217 |               {(
218 |                 [
219 |                   {
220 |                     key: "HOST",
221 |                     label: "🎙️ Ведучі",
222 |                     members: staffByRole.hosts,
223 |                   },
224 |                   {
225 |                     key: "DRIVER",
226 |                     label: "🚗 Водії",
227 |                     members: staffByRole.drivers,
228 |                   },
229 |                 ] as const
230 |               ).map(({ key, label, members }) => {
231 |                 if (members.length === 0) return null;
232 |                 return (
233 |                   <div
234 |                     key={key}
235 |                     className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
236 |                   >
237 |                     <h3 className="font-bold text-slate-800 mb-4">{label}</h3>
238 |                     <div className="flex flex-col gap-4">
239 |                       {members.map((member: any, i: number) => (
240 |                         <StaffMemberRow
241 |                           key={member.id}
242 |                           member={member}
243 |                           index={i}
244 |                           maxRevenue={maxRevenue}
245 |                         />
246 |                       ))}
247 |                     </div>
248 |                   </div>
249 |                 );
250 |               })}
251 |             </>
252 |           )}
253 |         </div>
254 |       )}
255 |     </div>
256 |   );
257 | });
258 | 
```

### File: apps/frontend/src/components/school-profile/AssignedCrew.tsx
```tsx
  0 | import { memo } from 'react';
  1 | import PhoneLink from '../PhoneLink';
  2 | import { motion } from "framer-motion";
  3 | import type { Event, User } from '../../types';
  4 | 
  5 | interface AssignedCrewProps {
  6 |   currentEvent: Event | null;
  7 |   employees: User[];
  8 | }
  9 | 
 10 | export default memo(function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
 11 |   const crew = currentEvent?.crew;
 12 | 
 13 |   if (!crew) {
 14 |     return (
 15 | <motion.div
 16 |       whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
 17 |       transition={{ duration: 0.2 }}
 18 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full text-slate-400 min-h-[250px]"
 19 |     >        <span className="text-4xl mb-3 opacity-50">🚐</span>
 20 |         <p className="font-medium">Екіпаж ще не призначено</p>
 21 |         <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
 22 |       </motion.div>
 23 |     );
 24 |   }
 25 | 
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
  6 | import type { Event, User } from '../../types';
  7 | 
  8 | interface EventDetailsProps {
  9 |   currentEvent: Event | null;
 10 |   schoolName?: string;
 11 |   cityId?: string;
 12 |   onEventUpdated?: () => void;
 13 |   employees?: User[];
 14 | }
 15 | 
 16 | export default function EventDetails({ currentEvent, schoolName, cityId, onEventUpdated, employees }: EventDetailsProps) {
 17 |   const [issueOpen, setIssueOpen] = useState(false);
 18 |   const [rescheduleOpen, setRescheduleOpen] = useState(false);
 19 | 
 20 |   if (!currentEvent) {
 21 |     return (
 22 |       <motion.div
 23 |         initial={{ opacity: 0 }}
 24 |         animate={{ opacity: 1 }}
 25 |         className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400"
 26 |       >
 27 |         У цього закладу ще немає запланованих подій.
 28 |       </motion.div>
 29 |     );
 30 |   }
 31 | 
 32 |   const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');
 33 | 
 34 |   return (
 35 |     <>
 36 |       <motion.div
 37 |         whileHover={{ y: -3, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.09)" }}
 38 |         transition={{ duration: 0.2 }}
 39 |         className="bg-white rounded-2xl shadow-sm border border-slate-100 md:border-l-4 md:border-l-blue-600 relative"
 40 |       >
 41 |         <div className="p-5 sm:p-6 pl-6 sm:pl-6">
 42 |           
 43 |           {/* Заголовок */}
 44 |           <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-slate-100 md:pb-4">
 45 |             <h3 className="font-bold text-slate-800 text-lg">Деталі події</h3>
 46 |             {/* Дата для мобільних (щоб була під заголовком) */}
 47 |             <span className="md:hidden text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
 48 |               {formattedDate}
 49 |             </span>
 50 |           </div>
 51 | 
 52 |           {/* ВЕЛИКІ МОБІЛЬНІ КНОПКИ (Відображаються тільки на телефоні) */}
 53 |           <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-slate-100 pb-5 mt-3">
 54 |             <button 
 55 |               onClick={() => setRescheduleOpen(true)} 
 56 |               className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 text-amber-600 rounded-2xl font-bold border border-amber-100/50 active:bg-amber-100 transition-colors shadow-sm"
 57 |             >
 58 |               <span className="text-2xl">📅</span>
 59 |               <span className="text-[11px] uppercase tracking-wider">Перенести</span>
 60 |             </button>
 61 |             <button 
 62 |               onClick={() => setIssueOpen(true)} 
 63 |               className="flex flex-col items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100/50 active:bg-red-100 transition-colors shadow-sm"
 64 |             >
 65 |               <span className="text-2xl">🚨</span>
 66 |               <span className="text-[11px] uppercase tracking-wider">Проблема</span>
 67 |             </button>
 68 |           </div>
 69 | 
 70 |           {/* ДЕСКТОПНІ КНОПКИ (Відображаються тільки на ПК) */}
 71 |           <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
 72 |             <span className="text-sm font-medium text-blue-600 mr-2">{formattedDate}</span>
 73 |             <button
 74 |               onClick={() => setRescheduleOpen(true)}
 75 |               className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
 76 |             >
 77 |               📅 Перенести
 78 |             </button>
 79 |             <button
 80 |               onClick={() => setIssueOpen(true)}
 81 |               className="px-3 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
 82 |             >
 83 |               🚨 Проблема
 84 |             </button>
 85 |           </div>
 86 | 
 87 |           {/* Інформація */}
 88 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
 89 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 90 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Проєкт:</span>
 91 |               <span className="font-bold text-slate-800">{currentEvent.project}</span>
 92 |             </div>
 93 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 94 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Час початку:</span>
 95 |               <span className="font-bold text-slate-800">{currentEvent.time}</span>
 96 |             </div>
 97 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
 98 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Кількість дітей:</span>
 99 |               <span className="font-bold text-slate-800">{currentEvent.childrenPlanned}</span>
100 |             </div>
101 |             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
102 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium">Вартість:</span>
103 |               <span className="font-bold text-slate-800">{currentEvent.price} грн</span>
104 |             </div>
105 |             <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
106 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Адреса:</span>
107 |               <span className="font-bold text-slate-800 flex items-start gap-1.5 leading-snug">
108 |                  <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
109 |                  <AddressLink address={currentEvent.address} />
110 |               </span>
111 |             </div>
112 |             <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
113 |               <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Контакт:</span>
114 |               <span className="font-bold text-slate-800 flex flex-col gap-1 leading-snug">
115 |                 <span>{currentEvent.contactPerson}</span>
116 |                 <span className="w-6 border-b-2 border-slate-200 my-0.5"></span>
117 |                 <PhoneLink phone={currentEvent.contactPhone} />
118 |               </span>
119 |             </div>
120 |           </div>
121 |         </div>
122 |       </motion.div>
123 | 
124 |       <IssueModal
125 |         isOpen={issueOpen}
126 |         onClose={() => setIssueOpen(false)}
127 |         schoolName={schoolName || currentEvent.school?.name || ''}
128 |         eventName={`${currentEvent.project} — ${formattedDate}`}
129 |         eventId={currentEvent.id}
130 |         cityId={cityId || currentEvent.cityId || ''}
131 |         employees={employees}
132 |       />
133 |       <RescheduleModal
134 |         isOpen={rescheduleOpen}
135 |         onClose={() => setRescheduleOpen(false)}
136 |         eventId={currentEvent.id}
137 |         currentDate={currentEvent.date}
138 |         currentTime={currentEvent.time || ''}
139 |         onSuccess={() => onEventUpdated?.()}
140 |       />
141 |     </>
142 |   );
143 | }
```

### File: apps/frontend/src/components/school-profile/EventPreparation.tsx
```tsx
  0 | 
  1 | import { memo, useState } from 'react';
  2 | import { motion, AnimatePresence } from 'framer-motion';
  3 | import type { EventPreparation as EventPreparationData } from '../../types';
  4 | 
  5 | interface PreparationProps {
  6 |   data: Partial<EventPreparationData>;
  7 |   onUpdate: (field: string, status: string) => void;
  8 |   onOpenCrewModal: () => void;
  9 | }
 10 | 
 11 | const STATUSES = ['Заплановано', 'В процесі', 'Виконано'];
 12 | 
 13 | const getNextStatus = (current: string) => {
 14 |   const idx = STATUSES.indexOf(current || 'Заплановано');
 15 |   return STATUSES[(idx + 1) % STATUSES.length];
 16 | };
 17 | 
 18 | export default memo(function EventPreparation({ data, onUpdate, onOpenCrewModal }: PreparationProps) {
 19 |   const [optimistic, setOptimistic] = useState<Record<string, string>>({});
 20 | 
 21 |   const tasks = [
 22 |     { key: 'assignCrew', label: 'Призначити екіпаж' },
 23 |     { key: 'bookEquipment', label: 'Забронювати обладнання' },
 24 |     { key: 'prepareDocs', label: 'Підготувати документи' },
 25 |     { key: 'prepareMaterials', label: 'Підготувати матеріали' },
 26 |     { key: 'remindSchool', label: 'Нагадати школі про подію' },
 27 |   ];
 28 | 
 29 |   const getStatusColor = (status: string) => {
 30 |     switch (status) {
 31 |       case 'Виконано': return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
 32 |       case 'В процесі': return 'bg-orange-50 text-orange-600 border border-orange-200';
 33 |       default: return 'bg-blue-50 text-blue-600 border border-blue-200';
 34 |     }
 35 |   };
 36 | 
 37 |   const handleTaskClick = (key: string) => {
 38 |     if (key === 'assignCrew') {
 39 |       onOpenCrewModal();
 40 |     } else {
 41 |       const next = getNextStatus(
 42 |         optimistic[key] ?? data[key as keyof EventPreparationData] ?? 'Заплановано',
 43 |       );
 44 |       setOptimistic(prev => ({ ...prev, [key]: next }));
 45 |       onUpdate(key, next).catch(() => {
 46 |         setOptimistic(prev => ({ ...prev, [key]: data[key] }));
 47 |       });
 48 |     }
 49 |   };
 50 | 
 51 |   return (
 52 |     <motion.div
 53 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 54 |       transition={{ duration: 0.2 }}
 55 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
 56 |     >
 57 |       <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Підготовка до події</h3>
 58 |       <div className="space-y-3 text-sm">
 59 |         {tasks.map((task) => {
 60 |           const currentStatus = optimistic[task.key] ?? data[task.key] ?? 'Заплановано';
 61 |           return (
 62 |             <motion.div
 63 |               key={task.key}
 64 |               whileTap={{ scale: 0.98 }}
 65 |               className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
 66 |               onClick={() => handleTaskClick(task.key)}
 67 |             >
 68 |               <span className="text-slate-700 font-medium select-none">{task.label}</span>
 69 |               <AnimatePresence mode="wait">
 70 |                 <motion.span
 71 |                   key={currentStatus}
 72 |                   initial={{ opacity: 0, scale: 0.85 }}
 73 |                   animate={{ opacity: 1, scale: 1 }}
 74 |                   exit={{ opacity: 0, scale: 0.85 }}
 75 |                   transition={{ duration: 0.15 }}
 76 |                   className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
 77 |                 >
 78 |                   {currentStatus}
 79 |                 </motion.span>
 80 |               </AnimatePresence>
 81 |             </motion.div>
 82 |           );
 83 |         })}
 84 |       </div>
 85 |     </motion.div>
 86 |   );
 87 | });
 88 | 
 89 | 
```

### File: apps/frontend/src/components/school-profile/EventsTable.tsx
```tsx
  0 | 
  1 | 
  2 | import axios from 'axios';
  3 | import { motion, AnimatePresence } from 'framer-motion';
  4 | import type { Event } from '../../types';
  5 | 
  6 | interface EventsTableProps {
  7 |   events: Event[];
  8 |   selectedEventId: string | null;
  9 |   onEventSelect: (id: string) => void;
 10 |   onDeleteSuccess: () => void;
 11 | }
 12 | 
 13 | export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess }: EventsTableProps) {
 14 |   
 15 |   const handleDelete = async (e: React.MouseEvent, id: string) => {
 16 |     e.stopPropagation();
 17 |     if (!window.confirm('Видалити цю подію?')) return;
 18 |     
 19 |     try {
 20 |       await axios.delete(`https://crm-57qd.onrender.com/events/${id}`, {
 21 |         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 22 |       });
 23 |       onDeleteSuccess();
 24 |     } catch (error) {
 25 |       console.error('Помилка видалення:', error);
 26 |     }
 27 |   };
 28 | 
 29 |   if (events.length === 0) return null;
 30 | 
 31 |   return (
 32 |     <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-2 w-full">
 33 |       <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
 34 |         <h3 className="font-bold text-slate-800">Всі події ({events.length})</h3>
 35 |       </div>
 36 | 
 37 |       {/* Картки — мобільний вигляд */}
 38 |       <div className="md:hidden divide-y divide-slate-50">
 39 |         <AnimatePresence initial={false}>
 40 |         {events.map((ev, i) => (
 41 |           <motion.div
 42 |             key={ev.id}
 43 |             initial={{ opacity: 0, y: 6 }}
 44 |             animate={{ opacity: 1, y: 0 }}
 45 |             exit={{ opacity: 0, x: -20 }}
 46 |             transition={{ duration: 0.2, delay: i * 0.04 }}
 47 |             onClick={() => onEventSelect(ev.id)}
 48 |             className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'active:bg-slate-50'}`}
 49 |           >
 50 |             <div className="min-w-0">
 51 |               <p className="font-medium text-slate-800">{ev.project}</p>
 52 |               <p className="text-xs text-slate-500 mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
 53 |             </div>
 54 |             <div className="flex items-center gap-2 shrink-0">
 55 |               <span className="font-medium text-sm text-slate-700">{ev.price} грн</span>
 56 |               <button
 57 |                 onClick={(e) => handleDelete(e, ev.id)}
 58 |                 className="text-red-500 active:text-red-700 p-2"
 59 |               >
 60 |                 🗑
 61 |               </button>
 62 |             </div>
 63 |           </motion.div>
 64 |         ))}
 65 |         </AnimatePresence>
 66 |       </div>
 67 | 
 68 |       {/* Таблиця — десктоп */}
 69 |       <div className="hidden md:block overflow-x-auto">
 70 |         <table className="w-full text-left text-sm">
 71 |           <thead>
 72 |             <tr className="bg-white border-b border-slate-100 text-slate-500">
 73 |               <th className="p-4">Дата</th>
 74 |               <th className="p-4">Проєкт</th>
 75 |               <th className="p-4">Вартість</th>
 76 |               <th className="p-4 text-center">Дія</th>
 77 |             </tr>
 78 |           </thead>
 79 |           <tbody>
 80 |             <AnimatePresence initial={false}>
 81 |             {events.map((ev, i) => (
 82 |               <motion.tr
 83 |                 key={ev.id}
 84 |                 initial={{ opacity: 0 }}
 85 |                 animate={{ opacity: 1 }}
 86 |                 exit={{ opacity: 0 }}
 87 |                 transition={{ duration: 0.18, delay: i * 0.03 }}
 88 |                 onClick={() => onEventSelect(ev.id)}
 89 |                 className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
 90 |               >
 91 |                 <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
 92 |                 <td className="p-4">{ev.project}</td>
 93 |                 <td className="p-4">{ev.price} грн</td>
 94 |                 <td className="p-4 text-center">
 95 |                   <button 
 96 |                     onClick={(e) => handleDelete(e, ev.id)}
 97 |                     className="text-red-500 hover:text-red-700 p-2"
 98 |                   >
 99 |                     🗑
100 |                   </button>
101 |                 </td>
102 |               </motion.tr>
103 |             ))}
104 |             </AnimatePresence>
105 |           </tbody>
106 |         </table>
107 |       </div>
108 |     </div>
109 |   );
110 | }
111 | 
112 | 
113 | 
```

### File: apps/frontend/src/components/school-profile/HistoryTimeline.tsx
```tsx
  0 | import { memo } from "react";
  1 | import { motion, AnimatePresence } from "framer-motion";
  2 | import type { Event, EventHistory } from "../../types";
  3 | interface HistoryTimelineProps {
  4 |   currentEvent: Event | null;
  5 |   onHistoryClick: (item: EventHistory) => void;
  6 |   onAddCommentClick: () => void;
  7 | }
  8 | 
  9 | export default memo(function HistoryTimeline({ currentEvent, onHistoryClick, onAddCommentClick }: HistoryTimelineProps) {
 10 |   return (
 11 |     <motion.div
 12 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 13 |       transition={{ duration: 0.2 }}
 14 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
 15 |     >
 16 |       <div className="flex justify-between items-center mb-5">
 17 |         <h3 className="font-bold text-slate-800">Історія взаємодії</h3>
 18 |         <button 
 19 |           onClick={onAddCommentClick}
 20 |           className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
 21 |         >
 22 |           <span>+</span> Коментар
 23 |         </button>
 24 |       </div>
 25 |       
 26 |       {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
 27 |         <p className="text-sm text-slate-400">Історія порожня.</p>
 28 |       ) : (
 29 |         <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
 30 |           <AnimatePresence initial={false}>
 31 |           {currentEvent.history.map((item: EventHistory, i: number) => (
 32 |             <motion.div
 33 |               key={item.id}
 34 |               initial={{ opacity: 0, x: -8 }}
 35 |               animate={{ opacity: 1, x: 0 }}
 36 |               exit={{ opacity: 0, x: -8 }}
 37 |               transition={{ duration: 0.22, delay: i * 0.04 }}
 38 |               onClick={() => onHistoryClick(item)}
 39 |               className="relative pl-8 pr-3 py-2 text-sm hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
 40 |             >
 41 |               <div className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
 42 |               <p className="font-semibold text-slate-800">{item.action}</p>
 43 |               {item.comment && (
 44 |                 <p className="text-slate-600 mt-1.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-sm italic">
 45 |                   "{item.comment}"
 46 |                 </p>
 47 |               )}
 48 |               <p className="text-[11px] text-slate-400 mt-2 flex justify-between items-center font-medium">
 49 |                 <span>
 50 |                   👤 {item.userName} <span className="mx-1">•</span> 
 51 |                   {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
 52 |                 </span>
 53 |                 <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">✏️ Редагувати</span>
 54 |               </p>
 55 |             </motion.div>
 56 |           ))}
 57 |           </AnimatePresence>
 58 |         </div>
 59 |       )}
 60 |     </motion.div>
 61 |   );
 62 | });
 63 | 
```

### File: apps/frontend/src/components/school-profile/Pipeline.tsx
```tsx
  0 | import { memo } from "react";
  1 | import { motion } from "framer-motion";
  2 | import type { Event } from "../../types";
  3 | interface PipelineProps {
  4 |   currentStageIndex: number;
  5 |   currentEvent: Event | null;
  6 |   onPipelineClick: (stepId: number) => void;
  7 |   stages: Array<{ id: number; key: string; name: string }>;
  8 | }
  9 | 
 10 | export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
 11 |   return (
 12 |     <motion.div
 13 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 14 |       transition={{ duration: 0.2 }}
 15 |       className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 w-full"
 16 |     >
 17 |       <h3 className="font-bold text-slate-800 mb-4 md:hidden">Етап події</h3>
 18 |       <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
 19 |         <div className="flex items-start min-w-[600px] justify-between relative">
 20 |           <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
 21 |           {stages.map((step, index) => {
 22 |             const isCompleted = index < currentStageIndex;
 23 |             const isActive = index === currentStageIndex;
 24 |             const isNext = index === currentStageIndex + 1;
 25 |             const isClickable = !!currentEvent && isNext;
 26 | 
 27 |             return (
 28 |               <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
 29 |                 <motion.button
 30 |                   onClick={() => isClickable && onPipelineClick(step.id)}
 31 |                   whileHover={isClickable ? { scale: 1.15 } : {}}
 32 |                   whileTap={isClickable ? { scale: 0.95 } : {}}
 33 |                   transition={{ duration: 0.15 }}
 34 |                   className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-colors
 35 |                     ${isCompleted
 36 |                       ? 'border-blue-600 text-blue-600 bg-white'
 37 |                       : isActive
 38 |                       ? 'border-blue-600 bg-blue-600 text-white shadow-md'
 39 |                       : isNext
 40 |                       ? 'border-blue-400 bg-white text-blue-400 cursor-pointer'
 41 |                       : 'border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-50'
 42 |                     }`}
 43 |                 >
 44 |                   {isCompleted ? '✓' : step.id}
 45 |                 </motion.button>
 46 |                 <span className={`text-[10px] md:text-[11px] leading-tight font-medium text-center break-words max-w-[70px]
 47 |                   ${isActive ? 'text-blue-600 font-bold' : isNext ? 'text-blue-400' : 'text-slate-400'}`}>
 48 |                   {step.name}
 49 |                 </span>
 50 |               </div>
 51 |             );
 52 |           })}
 53 |         </div>
 54 |       </div>
 55 |     </motion.div>
 56 |   );
 57 | });
 58 | 
```

### File: apps/frontend/src/components/school-profile/SchoolInfoCard.tsx
```tsx
  0 | import { memo } from "react";
  1 | import AddressLink from "../AddressLink";
  2 | import PhoneLink from "../PhoneLink";
  3 | import { motion } from "framer-motion";
  4 | import type { SchoolProfileData } from "../../types";
  5 | 
  6 | export default memo(function SchoolInfoCard({
  7 |   schoolData,
  8 | }: {
  9 |   schoolData: SchoolProfileData;
 10 | }) {
 11 |   return (
 12 |     <motion.div
 13 |       whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
 14 |       transition={{ duration: 0.2 }}
 15 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
 16 |     >
 17 |       <ul className="space-y-4 text-sm">
 18 |         {[
 19 |           { icon: "🏛", label: "Тип", value: schoolData.type || "—" },
 20 |           { icon: "📍", label: "Місто", value: schoolData.city || "—" },
 21 |           {
 22 |             icon: "🗺",
 23 |             label: "Адреса",
 24 |             value: <AddressLink address={schoolData.address} />,
 25 |           },
 26 |           { icon: "👤", label: "Контакт", value: schoolData.director || "—" },
 27 |           {
 28 |             icon: "📞",
 29 |             label: "Телефон",
 30 |             value: <PhoneLink phone={schoolData.phone} />,
 31 |           },
 32 |           { icon: "👥", label: "Дітей", value: schoolData.childrenCount || 0 },
 33 |         ].map(({ icon, label, value }, i) => (
 34 |           <motion.li
 35 |             key={label}
 36 |             initial={{ opacity: 0, x: -6 }}
 37 |             animate={{ opacity: 1, x: 0 }}
 38 |             transition={{ duration: 0.25, delay: i * 0.05 }}
 39 |             className="flex gap-3"
 40 |           >
 41 |             <span className="text-slate-400">{icon}</span>
 42 |             <div>
 43 |               <span className="text-slate-500">{label}:</span>{" "}
 44 |               <span className="font-medium">{value}</span>
 45 |             </div>
 46 |           </motion.li>
 47 |         ))}
 48 |       </ul>
 49 |     </motion.div>
 50 |   );
 51 | });
 52 | 
```

### File: apps/frontend/src/components/school-profile/SchoolProfileHeader.tsx
```tsx
  0 | import { memo } from "react";
  1 | import { Link } from "react-router-dom";
  2 | import { motion } from "framer-motion";
  3 | import PhoneLink from "../PhoneLink";
  4 | import type { SchoolProfileData } from "../../types";
  5 | 
  6 | interface Props {
  7 |   schoolData: SchoolProfileData;
  8 |   onEdit: () => void;
  9 |   onAddEvent: () => void;
 10 | }
 11 | 
 12 | const fadeUp = (delay: number) => ({
 13 |   initial: { opacity: 0, y: 8 },
 14 |   animate: { opacity: 1, y: 0 },
 15 |   transition: { duration: 0.35, delay, ease: "easeOut" },
 16 | });
 17 | 
 18 | export default memo(function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
 19 |   return (
 20 |     <div className="mb-6">
 21 |       {/* Хлібні крихти */}
 22 |       <motion.div {...fadeUp(0)} className="text-xs md:text-sm text-slate-500 mb-5 truncate">
 23 |         <Link to="/schools" className="hover:text-blue-600 transition-colors">
 24 |           Школи / Садочки
 25 |         </Link>
 26 |         <span className="mx-2">›</span>
 27 |         <span className="text-slate-800 font-medium">
 28 |           {schoolData.type} "{schoolData.name}"
 29 |         </span>
 30 |       </motion.div>
 31 | 
 32 |       {/* Hero Card */}
 33 |       <motion.div
 34 |         {...fadeUp(0.05)}
 35 |         className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-2"
 36 |       >
 37 |         {/* Градієнтна смужка зверху */}
 38 |         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
 39 | 
 40 |         <div className="p-5 md:p-7">
 41 |           <div className="flex flex-col md:flex-row md:items-center gap-5">
 42 | 
 43 |             {/* Іконка */}
 44 |             <motion.div
 45 |               initial={{ scale: 0.8, opacity: 0 }}
 46 |               animate={{ scale: 1, opacity: 1 }}
 47 |               transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
 48 |               className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl shrink-0"
 49 |             >
 50 |               🏫
 51 |             </motion.div>
 52 | 
 53 |             {/* Назва + місто */}
 54 |             <div className="flex-1 min-w-0">
 55 |               <motion.h1
 56 |                 {...fadeUp(0.12)}
 57 |                 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight"
 58 |               >
 59 |                 {schoolData.type} «{schoolData.name}»
 60 |               </motion.h1>
 61 |               <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
 62 |                 {schoolData.city && (
 63 |                   <span className="text-sm text-slate-500 flex items-center gap-1">
 64 |                     📍 {schoolData.city}
 65 |                   </span>
 66 |                 )}
 67 |                 {schoolData.director && (
 68 |                   <span className="text-sm text-slate-500 flex items-center gap-1">
 69 |                     👤 {schoolData.director}
 70 |                   </span>
 71 |                 )}
 72 |                 {schoolData.phone && (
 73 |                   <span className="text-sm text-slate-500">
 74 |                     <PhoneLink phone={schoolData.phone} />
 75 |                   </span>
 76 |                 )}
 77 |               </motion.div>
 78 |             </div>
 79 | 
 80 |             {/* Quick Actions — десктоп */}
 81 |             <motion.div {...fadeUp(0.2)} className="hidden md:flex gap-2 shrink-0">
 82 |               <button
 83 |                 onClick={onAddEvent}
 84 |                 className="flex flex-col items-center gap-1 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm text-xs font-semibold"
 85 |               >
 86 |                 <span className="text-lg leading-none">＋</span>
 87 |                 Подія
 88 |               </button>
 89 |               <button
 90 |                 onClick={onEdit}
 91 |                 className="flex flex-col items-center gap-1 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all text-xs font-semibold"
 92 |               >
 93 |                 <span className="text-lg leading-none">✏️</span>
 94 |                 Редагувати
 95 |               </button>
 96 |             </motion.div>
 97 | 
 98 |             {/* Quick Actions — мобіл */}
 99 |             <motion.div {...fadeUp(0.2)} className="md:hidden flex gap-2">
100 |               <button
101 |                 onClick={onEdit}
102 |                 className="w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-50 active:scale-95 transition-all"
103 |               >
104 |                 ✏️
105 |               </button>
106 |             </motion.div>
107 |           </div>
108 |         </div>
109 |       </motion.div>
110 |     </div>
111 |   );
112 | });
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
  2 | import type { City, CityProfile, Crew } from "../../../types";
  3 | 
  4 | interface CrewModalProps {
  5 |   isOpen: boolean;
  6 |   onClose: () => void;
  7 |   city?: string;
  8 |   onSave: (crewId: string) => void;
  9 | }
 10 | 
 11 | export default function CrewModal({
 12 |   isOpen,
 13 |   onClose,
 14 |   city,
 15 |   onSave,
 16 | }: CrewModalProps) {
 17 |   const [crews, setCrews] = useState<Crew[]>([]);
 18 |   const [selectedCrewId, setSelectedCrewId] = useState("");
 19 |   const [isLoading, setIsLoading] = useState(true);
 20 | 
 21 |   useEffect(() => {
 22 |     if (isOpen && city) {
 23 |       api.get<City[]>("/cities").then((res) => {
 24 |         const currentCity = res.data.find((c) => c.name === city);
 25 |         if (currentCity) {
 26 |           api.get<CityProfile>(`/cities/${currentCity.id}`).then((cityRes) => {
 27 |             setCrews(cityRes.data.crews || []);
 28 |             setIsLoading(false);
 29 |           });
 30 |         }
 31 |       });
 32 |     }
 33 |   }, [isOpen, city]);
 34 | 
 35 |   if (!isOpen) return null;
 36 | 
 37 |   return (
 38 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 39 |       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
 40 |         <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
 41 |           <h3 className="text-xl font-bold text-slate-800">
 42 |             Призначити екіпаж
 43 |           </h3>
 44 |           <button
 45 |             onClick={onClose}
 46 |             className="text-slate-400 hover:text-slate-600"
 47 |           >
 48 |             ✕
 49 |           </button>
 50 |         </div>
 51 | 
 52 |         <div className="p-6">
 53 |           {isLoading ? (
 54 |             <p className="text-slate-500 text-center py-4">Завантаження...</p>
 55 |           ) : crews.length === 0 ? (
 56 |             <div className="text-center py-4">
 57 |               <p className="text-slate-500">
 58 |                 У цьому місті ще немає сформованих екіпажів.
 59 |               </p>
 60 |               <p className="text-sm mt-2 text-blue-600">
 61 |                 Створіть екіпаж у вкладці міста!
 62 |               </p>
 63 |             </div>
 64 |           ) : (
 65 |             <div className="space-y-4">
 66 |               <label className="block text-sm font-medium text-slate-700">
 67 |                 Оберіть готовий екіпаж
 68 |               </label>
 69 |               <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
 70 |                 {crews.map((crew) => (
 71 |                   <label
 72 |                     key={crew.id}
 73 |                     className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${selectedCrewId === crew.id ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500" : "border-slate-200 hover:border-blue-300"}`}
 74 |                   >
 75 |                     <input
 76 |                       type="radio"
 77 |                       name="crew"
 78 |                       value={crew.id}
 79 |                       checked={selectedCrewId === crew.id}
 80 |                       onChange={() => setSelectedCrewId(crew.id)}
 81 |                       className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
 82 |                     />
 83 |                     <div>
 84 |                       <p className="font-bold text-slate-800">{crew.name}</p>
 85 |                       <p className="text-xs text-slate-500 mt-1">
 86 |                         🎙️ {crew.host?.name || "—"} | 🚗{" "}
 87 |                         {crew.driver?.name || "—"}
 88 |                       </p>
 89 |                       {crew.car && (
 90 |                         <p className="text-xs text-emerald-600 mt-0.5">
 91 |                           Авто: {crew.car}
 92 |                         </p>
 93 |                       )}
 94 |                     </div>
 95 |                   </label>
 96 |                 ))}
 97 |               </div>
 98 |             </div>
 99 |           )}
100 | 
101 |           <div className="flex gap-3 mt-6">
102 |             <button
103 |               onClick={onClose}
104 |               className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200"
105 |             >
106 |               Скасувати
107 |             </button>
108 |             <button
109 |               onClick={() => onSave(selectedCrewId)}
110 |               disabled={!selectedCrewId}
111 |               className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
112 |             >
113 |               Призначити
114 |             </button>
115 |           </div>
116 |         </div>
117 |       </div>
118 |     </div>
119 |   );
120 | }
121 | 
```

### File: apps/frontend/src/components/school-profile/modals/EditSchoolModal.tsx
```tsx
  0 | import React from 'react';
  1 | import type { SchoolProfileData } from '../../../types';
  2 | 
  3 | interface EditSchoolModalProps {
  4 |   isOpen: boolean;
  5 |   onClose: () => void;
  6 |   editForm: SchoolProfileData;
  7 |   setEditForm: React.Dispatch<React.SetStateAction<SchoolProfileData>>;
  8 |   onSave: (e: React.FormEvent) => void;
  9 | }
 10 | 
 11 | export default function EditSchoolModal({ isOpen, onClose, editForm, setEditForm, onSave }: EditSchoolModalProps) {
 12 |   if (!isOpen) return null;
 13 | 
 14 |   return (
 15 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
 16 |       {/* Bottom-sheet на мобільному, центрований діалог на десктопі */}
 17 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
 18 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
 19 | 
 20 |         {/* Шапка не зжимається (shrink-0) */}
 21 |         <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
 22 |           <h3 className="text-xl font-bold">Редагування</h3>
 23 |           <button onClick={onClose} className="text-slate-400 p-2 -mr-2">✕</button>
 24 |         </div>
 25 | 
 26 |         {/* Форма скролиться (overflow-y-auto) */}
 27 |         <form onSubmit={onSave} className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4">
 28 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 29 |             <div>
 30 |               <label className="block text-sm mb-1">Тип</label>
 31 |               <select value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500">
 32 |                 <option>Школа</option>
 33 |                 <option>Садочок</option>
 34 |               </select>
 35 |             </div>
 36 |             <div className="sm:col-span-2">
 37 |               <label className="block text-sm mb-1">Адреса</label>
 38 |               <input type="text" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 39 |             </div>
 40 |             <div>
 41 |               <label className="block text-sm mb-1">Контакт</label>
 42 |               <input type="text" value={editForm.director} onChange={e => setEditForm({...editForm, director: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 43 |             </div>
 44 |             <div>
 45 |               <label className="block text-sm mb-1">Телефон</label>
 46 |               <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 47 |             </div>
 48 |             <div>
 49 |               <label className="block text-sm mb-1">Email</label>
 50 |               <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 51 |             </div>
 52 |             <div>
 53 |               <label className="block text-sm mb-1">Дітей</label>
 54 |               <input type="number" value={editForm.childrenCount || ''} onChange={e => setEditForm({...editForm, childrenCount: Number(e.target.value)})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
 55 |             </div>
 56 |           </div>
 57 |           
 58 |           <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-slate-100 pb-1 sm:pb-0">
 59 |             <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors">Скасувати</button>
 60 |             <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors">Зберегти</button>
 61 |           </div>
 62 |         </form>
 63 |       </div>
 64 |     </div>
 65 |   );
 66 | }
 67 | 
```

### File: apps/frontend/src/components/school-profile/modals/EventModal.tsx
```tsx
  0 | import React, { useState, useEffect } from "react";
  1 | import { api } from "../../../config/api";
  2 | import type { EventFormData, Project } from "../../../types";
  3 | 
  4 | interface EventModalProps {
  5 |   isOpen: boolean;
  6 |   onClose: () => void;
  7 |   eventForm: EventFormData;
  8 |   setEventForm: React.Dispatch<React.SetStateAction<EventFormData>>;
  9 |   onSave: (e: React.FormEvent) => void;
 10 | }
 11 | 
 12 | export default function EventModal({
 13 |   isOpen,
 14 |   onClose,
 15 |   eventForm,
 16 |   setEventForm,
 17 |   onSave,
 18 | }: EventModalProps) {
 19 |   const [projects, setProjects] = useState<Project[]>([]);
 20 | 
 21 |   useEffect(() => {
 22 |     if (isOpen) {
 23 |       api
 24 |         .get<Project[]>("/projects", {
 25 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 26 |         })
 27 |         .then((res) => {
 28 |           setProjects(res.data);
 29 |           if (!eventForm.project && res.data.length > 0) {
 30 |             setEventForm((prev) => ({
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
  0 | import { useState } from "react";
  1 | import { createPortal } from "react-dom";
  2 | import { api } from "../../../config/api";
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
 21 |   isOpen,
 22 |   onClose,
 23 |   schoolName,
 24 |   eventName,
 25 |   eventId,
 26 |   cityId,
 27 |   employees = [],
 28 | }: IssueModalProps) {
 29 |   const [message, setMessage] = useState("");
 30 |   const [deadline, setDeadline] = useState("");
 31 |   const [assignedUserId, setAssignedUserId] = useState("");
 32 |   const [sent, setSent] = useState(false);
 33 | 
 34 |   if (!isOpen) return null;
 35 | 
 36 |   const assignedUser = employees.find((e) => e.id === assignedUserId);
 37 | 
 38 |   const handleSend = () => {
 39 |     if (!message.trim()) return;
 40 |     setSent(true);
 41 |     setTimeout(() => {
 42 |       setSent(false);
 43 |       setMessage("");
 44 |       setDeadline("");
 45 |       setAssignedUserId("");
 46 |       onClose();
 47 |     }, 600);
 48 |     api
 49 |       .post("/issues", {
 50 |         eventId,
 51 |         schoolName,
 52 |         eventName,
 53 |         message,
 54 |         cityId,
 55 |         deadline: deadline || undefined,
 56 |         assignedUserId: assignedUserId || undefined,
 57 |         assignedUserName: assignedUser?.name || undefined,
 58 |       })
 59 |       .catch((e) => console.error(e));
 60 |   };
 61 | 
 62 |   return createPortal(
 63 |     <div
 64 |       className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
 65 |       style={{ animation: "fadeIn 0.2s ease-out forwards" }}
 66 |     >
 67 |       <style>{`
 68 |         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 69 |         @keyframes modalScale {
 70 |           from { opacity: 0; transform: scale(0.95) translateY(15px); }
 71 |           to { opacity: 1; transform: scale(1) translateY(0); }
 72 |         }
 73 |       `}</style>
 74 |       <div
 75 |         className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col opacity-0"
 76 |         style={{ animation: "modalScale 0.3s ease-out forwards" }}
 77 |       >
 78 |         <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
 79 |           <div>
 80 |             <h3 className="text-xl font-bold text-slate-800">🚨 Запит</h3>
 81 |             <p className="text-sm text-red-500 mt-0.5 font-medium">
 82 |               {schoolName}
 83 |             </p>
 84 |             <p className="text-xs text-slate-400 mt-0.5">{eventName}</p>
 85 |           </div>
 86 |           <button
 87 |             onClick={onClose}
 88 |             className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
 89 |           >
 90 |             ✕
 91 |           </button>
 92 |         </div>
 93 | 
 94 |         <div className="p-6 flex flex-col gap-4 overflow-y-auto">
 95 |           <textarea
 96 |             value={message}
 97 |             onChange={(e) => setMessage(e.target.value)}
 98 |             placeholder="Опишіть проблему або запит..."
 99 |             className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32 text-sm"
100 |             autoFocus
101 |           />
102 | 
103 |           <div>
104 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
105 |               ⏰ Дедлайн{" "}
106 |               <span className="text-slate-400 font-normal">
107 |                 (необов'язково)
108 |               </span>
109 |             </label>
110 |             <input
111 |               type="date"
112 |               value={deadline}
113 |               onChange={(e) => setDeadline(e.target.value)}
114 |               min={new Date().toISOString().slice(0, 10)}
115 |               className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
116 |             />
117 |           </div>
118 | 
119 |           {employees.length > 0 && (
120 |             <div>
121 |               <label className="block text-sm font-medium text-slate-600 mb-1.5">
122 |                 👤 Відповідальний{" "}
123 |                 <span className="text-slate-400 font-normal">
124 |                   (необов'язково)
125 |                 </span>
126 |               </label>
127 |               <select
128 |                 value={assignedUserId}
129 |                 onChange={(e) => setAssignedUserId(e.target.value)}
130 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm bg-white"
131 |               >
132 |                 <option value="">— Оберіть працівника —</option>
133 |                 {employees.map((emp) => (
134 |                   <option key={emp.id} value={emp.id}>
135 |                     {emp.name} ({emp.role})
136 |                   </option>
137 |                 ))}
138 |               </select>
139 |             </div>
140 |           )}
141 | 
142 |           <div className="flex gap-3 mt-2">
143 |             <button
144 |               type="button"
145 |               onClick={onClose}
146 |               className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
147 |             >
148 |               Скасувати
149 |             </button>
150 |             <button
151 |               type="button"
152 |               onClick={handleSend}
153 |               disabled={sent || !message.trim()}
154 |               className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
155 |             >
156 |               {sent ? "✓ Надіслано!" : "Відправити"}
157 |             </button>
158 |           </div>
159 |         </div>
160 |       </div>
161 |     </div>,
162 |     document.body,
163 |   );
164 | }
165 | 
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
235 |     schoolPercentage: 20,
236 |     rating: 8,
237 |   });
238 | 
239 |   const [expenses, setExpenses] = useState<Expense[]>([]);
240 |   const [newExp, setNewExp] = useState({ name: "", amount: "" });
241 |   const [salaries, setSalaries] = useState<Record<string, number>>({});
242 |   if (!isOpen) return null;
243 | 
244 |   const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
245 |   const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
246 |   const remainder = form.totalSum - schoolSum - totalExpenses;
247 | 
248 |   const addExpense = () => {
249 |     const amount = Number(newExp.amount);
250 |     if (!newExp.name.trim() || !amount) return;
251 |     setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
252 |     setNewExp({ name: "", amount: "" });
253 |   };
254 | 
255 |   const removeExpense = (index: number) => {
256 |     setExpenses((prev) => prev.filter((_, i) => i !== index));
257 |   };
258 | 
259 |   const crewMembers = [
260 |     ...(crew?.host
261 |       ? [
262 |           {
263 |             id: crew.host.id,
264 |             name: crew.host.name,
265 |             role: "Ведучий",
266 |           },
267 |         ]
268 |       : []),
269 |     ...(crew?.driver
270 |       ? [
271 |           {
272 |             id: crew.driver.id,
273 |             name: crew.driver.name,
274 |             role: "Водій",
275 |           },
276 |         ]
277 |       : []),
278 |   ];
279 | 
280 |   const handleSave = () => {
281 |     const salariesArr = crewMembers
282 |       .map((m) => ({
283 |         userId: m.id,
284 |         name: m.name,
285 |         amount: salaries[m.id] || 0,
286 |         role: m.role,
287 |       }))
288 |       .filter((s) => s.amount > 0);
289 | 
290 |     onSave({
291 |       ...form,
292 |       expenses,
293 |       schoolSum,
294 |       remainderSum: remainder,
295 |       salaries: salariesArr,
296 |     });
297 |   };
298 | 
299 |   return (
300 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
301 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden">
302 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
303 | 
304 |         {/* Header */}
305 |         <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
306 |           <div className="min-w-0">
307 |             <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
308 |               Звіт по події
309 |             </h3>
310 |             <p className="text-sm text-slate-500 mt-0.5 truncate">
311 |               {schoolName}
312 |             </p>
313 |           </div>
314 |           <button
315 |             onClick={onClose}
316 |             className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 shrink-0"
317 |           >
318 |             ✕
319 |           </button>
320 |         </div>
321 | 
322 |         {/* Body */}
323 |         <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
324 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
325 |             {/* Охоплення */}
326 |             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
327 |               <CardHeader
328 |                 icon={<Icon.Users />}
329 |                 color="bg-violet-50 text-violet-600"
330 |                 title="Охоплення та Проведення"
331 |               />
332 |               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
333 |                 <Row label="Кількість дітей">
334 |                   <NumberField
335 |                     value={form.childrenCount}
336 |                     onChange={(v) => setForm({ ...form, childrenCount: v })}
337 |                     suffix="дітей"
338 |                   />
339 |                 </Row>
340 |                 <Row label="Класів">
341 |                   <NumberField
342 |                     value={form.classesCount}
343 |                     onChange={(v) => setForm({ ...form, classesCount: v })}
344 |                     suffix="кл."
345 |                   />
346 |                 </Row>
347 |                 <Row label="Пільгових дітей">
348 |                   <NumberField
349 |                     value={form.privilegedCount}
350 |                     onChange={(v) => setForm({ ...form, privilegedCount: v })}
351 |                   />
352 |                 </Row>
353 |                 <Row label="Кількість показів">
354 |                   <NumberField
355 |                     value={form.showingsCount}
356 |                     onChange={(v) => setForm({ ...form, showingsCount: v })}
357 |                   />
358 |                 </Row>
359 |               </div>
360 |             </div>
361 | 
362 |             {/* Фінансовий результат */}
363 |             <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
364 |               <CardHeader
365 |                 icon={<Icon.Wallet />}
366 |                 color="bg-amber-50 text-amber-600"
367 |                 title="Фінансовий результат"
368 |               />
369 |               <div className="flex items-center justify-between py-2 border-b border-slate-50">
370 |                 <span className="text-sm text-slate-500 font-medium">
371 |                   Загальна виручка
372 |                 </span>
373 |                 <span className="inline-flex items-center gap-1">
374 |                   <input
375 |                     type="number"
376 |                     min={0}
377 |                     value={form.totalSum || ""}
378 |                     onChange={(e) =>
379 |                       setForm({ ...form, totalSum: +e.target.value })
380 |                     }
381 |                     className="w-28 text-right bg-transparent outline-none font-bold text-lg text-slate-800 focus:bg-blue-50 rounded px-1"
382 |                     placeholder="0"
383 |                   />
384 |                   <span className="text-slate-400 text-sm">грн</span>
385 |                 </span>
386 |               </div>
387 | 
388 |               {/* НОВЕ: Змінний відсоток для закладу */}
389 |               <div className="flex items-center justify-between py-2 border-b border-slate-50">
390 |                 <span className="text-sm text-slate-500">Відсоток закладу</span>
391 |                 <NumberField
392 |                   value={form.schoolPercentage}
393 |                   onChange={(v) => setForm({ ...form, schoolPercentage: v })}
394 |                   suffix="%"
395 |                 />
396 |               </div>
397 | 
398 |               <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
399 |                 <span>{formatMoney(schoolSum)} грн</span>
400 |               </Row>
401 | 
402 |               <div className="py-3 border-b border-slate-50">
403 |                 <div className="flex items-center justify-between mb-2">
404 |                   <span className="text-sm text-slate-500">
405 |                     Додаткові витрати
406 |                   </span>
407 |                   <span className="text-sm font-medium text-rose-500">
408 |                     −{formatMoney(totalExpenses)} грн
409 |                   </span>
410 |                 </div>
411 |                 {expenses.length > 0 && (
412 |                   <div className="flex flex-wrap gap-1.5 mb-2">
413 |                     {expenses.map((exp, i) => (
414 |                       <span
415 |                         key={i}
416 |                         className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs"
417 |                       >
418 |                         <span className="text-slate-600">{exp.name}</span>
419 |                         <span className="font-semibold text-slate-700">
420 |                           {formatMoney(exp.amount)} грн
421 |                         </span>
422 |                         <button
423 |                           onClick={() => removeExpense(i)}
424 |                           className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white"
425 |                         >
426 |                           ✕
427 |                         </button>
428 |                       </span>
429 |                     ))}
430 |                   </div>
431 |                 )}
432 |                 <div className="flex gap-2 mt-2">
433 |                   <input
434 |                     placeholder="Назва витрати"
435 |                     value={newExp.name}
436 |                     onChange={(e) =>
437 |                       setNewExp({ ...newExp, name: e.target.value })
438 |                     }
439 |                     className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
440 |                   />
441 |                   <input
442 |                     type="number"
443 |                     min={0}
444 |                     placeholder="грн"
445 |                     value={newExp.amount}
446 |                     onChange={(e) =>
447 |                       setNewExp({ ...newExp, amount: e.target.value })
448 |                     }
449 |                     className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
450 |                   />
451 |                   <button
452 |                     onClick={addExpense}
453 |                     type="button"
454 |                     className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
455 |                   >
456 |                     +
457 |                   </button>
458 |                 </div>
459 |               </div>
460 |               <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
461 |                 <span className="text-sm font-semibold text-emerald-700">
462 |                   Залишок ({100 - form.schoolPercentage}%)
463 |                 </span>
464 |                 <span className="text-lg font-bold text-emerald-700">
465 |                   {formatMoney(remainder)} грн
466 |                 </span>
467 |               </div>
468 |             </div>
469 |             {crewMembers.length > 0 && (
470 |               <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
471 |                 <CardHeader
472 |                   icon={
473 |                     <svg
474 |                       viewBox="0 0 24 24"
475 |                       fill="none"
476 |                       stroke="currentColor"
477 |                       strokeWidth="2"
478 |                       strokeLinecap="round"
479 |                       strokeLinejoin="round"
480 |                       className="w-4 h-4"
481 |                     >
482 |                       <circle cx="12" cy="8" r="6" />
483 |                       <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
484 |                     </svg>
485 |                   }
486 |                   color="bg-blue-50 text-blue-600"
487 |                   title="Заробітня плата"
488 |                 />
489 |                 <div className="space-y-1">
490 |                   {crewMembers.map((m) => (
491 |                     <Row key={m.id} label={`${m.name} (${m.role})`}>
492 |                       <span className="inline-flex items-center gap-1">
493 |                         <input
494 |                           type="number"
495 |                           min={0}
496 |                           value={salaries[m.id] || ""}
497 |                           onChange={(e) =>
498 |                             setSalaries((prev) => ({
499 |                               ...prev,
500 |                               [m.id]: +e.target.value,
501 |                             }))
502 |                           }
503 |                           className="w-24 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1"
504 |                           placeholder="0"
505 |                         />
506 |                         <span className="text-slate-400 text-xs">грн</span>
507 |                       </span>
508 |                     </Row>
509 |                   ))}
510 |                 </div>
511 |                 {crewMembers.some((m) => salaries[m.id] > 0) && (
512 |                   <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
513 |                     <span className="text-sm font-semibold text-slate-500">
514 |                       Разом ЗП
515 |                     </span>
516 |                     <span className="font-bold text-blue-600">
517 |                       {formatMoney(
518 |                         crewMembers.reduce(
519 |                           (s, m) => s + (salaries[m.id] || 0),
520 |                           0,
521 |                         ),
522 |                       )}{" "}
523 |                       грн
524 |                     </span>
525 |                   </div>
526 |                 )}
527 |               </div>
528 |             )}
529 |           </div>
530 |         </div>
531 | 
532 |         {/* Footer */}
533 |         <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-slate-100 bg-white shrink-0">
534 |           <button
535 |             onClick={onClose}
536 |             className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3"
537 |           >
538 |             Скасувати
539 |           </button>
540 |           <button
541 |             onClick={handleSave}
542 |             className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3"
543 |           >
544 |             Зберегти звіт
545 |           </button>
546 |         </div>
547 |       </div>
548 |     </div>
549 |   );
550 | }
551 | 
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
 35 |     onClose();
 36 |     onSuccess();
 37 |     api.patch(`/events/${eventId}/reschedule`, { date, time }).catch((e) => {
 38 |       console.error("Помилка перенесення:", e);
 39 |     });
 40 |   };
 41 | 
 42 |   return createPortal(
 43 |     <div
 44 |       className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
 45 |       style={{ animation: "fadeIn 0.2s ease-out forwards" }}
 46 |     >
 47 |       <style>{`
 48 |         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 49 |         @keyframes modalScale {
 50 |           from { opacity: 0; transform: scale(0.95) translateY(15px); }
 51 |           to { opacity: 1; transform: scale(1) translateY(0); }
 52 |         }
 53 |       `}</style>
 54 |       <div
 55 |         className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
 56 |         style={{ animation: "modalScale 0.3s ease-out forwards" }}
 57 |       >
 58 |         <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
 59 |           <h3 className="text-xl font-bold text-slate-800">
 60 |             📅 Перенести подію
 61 |           </h3>
 62 |           <button
 63 |             onClick={onClose}
 64 |             className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
 65 |           >
 66 |             ✕
 67 |           </button>
 68 |         </div>
 69 |         <div className="p-6 flex flex-col gap-4">
 70 |           <div>
 71 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
 72 |               Нова дата
 73 |             </label>
 74 |             <input
 75 |               type="date"
 76 |               value={date}
 77 |               onChange={(e) => setDate(e.target.value)}
 78 |               className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
 79 |             />
 80 |           </div>
 81 |           <div>
 82 |             <label className="block text-sm font-medium text-slate-600 mb-1.5">
 83 |               Новий час
 84 |             </label>
 85 |             <input
 86 |               type="time"
 87 |               value={time}
 88 |               onChange={(e) => setTime(e.target.value)}
 89 |               className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
 90 |             />
 91 |           </div>
 92 |           <div className="flex gap-3 mt-2">
 93 |             <button
 94 |               onClick={onClose}
 95 |               className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
 96 |             >
 97 |               Скасувати
 98 |             </button>
 99 |             <button
100 |               onClick={handleSave}
101 |               disabled={loading}
102 |               className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
103 |             >
104 |               {loading ? "Збереження..." : "Зберегти"}
105 |             </button>
106 |           </div>
107 |         </div>
108 |       </div>
109 |     </div>,
110 |     document.body,
111 |   );
112 | }
113 | 
```

### File: apps/frontend/src/components/schools/SchoolDesktopTable.tsx
```tsx
  0 | import React from "react";
  1 | import { useNavigate, type NavigateFunction } from "react-router-dom";
  2 | import { motion, AnimatePresence } from "framer-motion";
  3 | import type { School, PipelineStage } from "../../types";
  4 | 
  5 | interface Props {
  6 |   schools: School[];
  7 |   searchQuery: string;
  8 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  9 |   stages: PipelineStage[];
 10 | }
 11 | 
 12 | interface SchoolRowProps {
 13 |   school: School;
 14 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
 15 |   stages: PipelineStage[];
 16 |   navigate: NavigateFunction;
 17 | }
 18 | 
 19 | export const SchoolRow = React.memo(
 20 |   ({ school, onDelete, stages, navigate }: SchoolRowProps) => {
 21 |     const latestEvent = school.events?.[0];
 22 |     const stage = latestEvent
 23 |       ? stages.find((s) => s.key === latestEvent.status)
 24 |       : null;
 25 | 
 26 |     return (
 27 |       <motion.tr
 28 |         initial={{ opacity: 0 }}
 29 |         animate={{ opacity: 1 }}
 30 |         exit={{ opacity: 0 }}
 31 |         onClick={() => navigate(`/schools/${school.id}`)}
 32 |         className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
 33 |       >
 34 |         <td className="p-4 font-bold text-slate-800">{school.name}</td>
 35 |         <td className="p-4 font-medium text-slate-600">{school.city?.name}</td>
 36 |         <td className="p-4">
 37 |           <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
 38 |             Активна
 39 |           </span>
 40 |         </td>
 41 |         <td className="p-4">
 42 |           {stage ? (
 43 |             <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
 44 |               {stage.name}
 45 |             </span>
 46 |           ) : (
 47 |             <span className="text-slate-400 text-xs italic">—</span>
 48 |           )}
 49 |         </td>
 50 |         <td className="p-4 text-center">
 51 |           <button
 52 |             onClick={(e) => {
 53 |               e.stopPropagation();
 54 |               onDelete(e, school.id, school.name);
 55 |             }}
 56 |             className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-lg"
 57 |           >
 58 |             🗑
 59 |           </button>
 60 |         </td>
 61 |       </motion.tr>
 62 |     );
 63 |   },
 64 | );
 65 | 
 66 | SchoolRow.displayName = "SchoolRow";
 67 | 
 68 | export default function SchoolDesktopTable({
 69 |   schools,
 70 |   searchQuery,
 71 |   onDelete,
 72 |   stages,
 73 | }: Props) {
 74 |   const navigate = useNavigate();
 75 | 
 76 |   return (
 77 |     <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 custom-scrollbar">
 78 |       <div className="overflow-y-auto flex-1">
 79 |         <table className="w-full text-left border-collapse">
 80 |           <thead className="sticky top-0 z-10 bg-slate-50">
 81 |             <tr className="border-b border-slate-100">
 82 |               <th className="p-4 font-medium text-slate-600">Назва школи</th>
 83 |               <th className="p-4 font-medium text-slate-600">Місто</th>
 84 |               <th className="p-4 font-medium text-slate-600">Статус</th>
 85 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
 86 |               <th className="p-4 font-medium text-slate-600 text-center">
 87 |                 Дія
 88 |               </th>
 89 |             </tr>
 90 |           </thead>
 91 |           <tbody className="divide-y divide-slate-50">
 92 |             <AnimatePresence>
 93 |               {schools.map((school) => (
 94 |                 <SchoolRow
 95 |                   key={school.id}
 96 |                   school={school}
 97 |                   onDelete={onDelete}
 98 |                   stages={stages}
 99 |                   navigate={navigate}
100 |                 />
101 |               ))}
102 |             </AnimatePresence>
103 |           </tbody>
104 |         </table>
105 |         {schools.length === 0 && (
106 |           <motion.div
107 |             initial={{ opacity: 0 }}
108 |             animate={{ opacity: 1 }}
109 |             className="text-center py-16 text-slate-400 text-sm font-medium"
110 |           >
111 |             {searchQuery
112 |               ? `Нічого не знайдено за «${searchQuery}»`
113 |               : "Шкіл ще немає"}
114 |           </motion.div>
115 |         )}
116 |       </div>
117 |     </div>
118 |   );
119 | }
120 | 
```

### File: apps/frontend/src/components/schools/SchoolMobileList.tsx
```tsx
  0 | import React from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | import type { School, PipelineStage } from "../../types";
  3 | 
  4 | interface Props {
  5 |   schools: School[];
  6 |   searchQuery: string;
  7 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  8 |   stages: PipelineStage[];
  9 | }
 10 | 
 11 | interface SchoolCardProps {
 12 |   school: School;
 13 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
 14 |   stages: PipelineStage[];
 15 |   index?: number;
 16 | }
 17 | 
 18 | export const SchoolCard = React.memo(({ school, onDelete, stages, index = 0 }: SchoolCardProps) => {
 19 |   const navigate = useNavigate();
 20 |   const latestEvent = school.events?.[0];
 21 |   const stage = latestEvent
 22 |     ? stages.find((s) => s.key === latestEvent.status)
 23 |     : null;
 24 | 
 25 |   return (
 26 |     <div
 27 |       className="school-row-enter bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer active:scale-[0.99]"
 28 |       style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: "both" }}
 29 |       onClick={() => navigate(`/schools/${school.id}`)}
 30 |     >
 31 |       <div className="flex items-start justify-between gap-2">
 32 |         <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
 33 |           {school.name}
 34 |         </p>
 35 |         <button
 36 |           onClick={(e) => {
 37 |             e.stopPropagation();
 38 |             onDelete(e, school.id, school.name);
 39 |           }}
 40 |           className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-lg"
 41 |         >
 42 |           🗑
 43 |         </button>
 44 |       </div>
 45 |       <div className="flex items-center justify-between gap-2 mt-2">
 46 |         {school.phone ? (
 47 |           <a
 48 |             href={`tel:${school.phone}`}
 49 |             onClick={(e) => e.stopPropagation()}
 50 |             className="text-xs text-blue-600 font-medium truncate"
 51 |           >
 52 |             📞 {school.director || school.phone}
 53 |           </a>
 54 |         ) : (
 55 |           <span className="text-xs text-slate-500 truncate">
 56 |             👤 {school.director || "Контакт не вказано"}
 57 |           </span>
 58 |         )}
 59 |         {stage && (
 60 |           <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
 61 |             {stage.name}
 62 |           </span>
 63 |         )}
 64 |       </div>
 65 |     </div>
 66 |   );
 67 | });
 68 | 
 69 | SchoolCard.displayName = "SchoolCard";
 70 | 
 71 | export default function SchoolMobileList({
 72 |   schools,
 73 |   searchQuery,
 74 |   onDelete,
 75 |   stages,
 76 | }: Props) {
 77 |   return (
 78 |     <>
 79 |       <style>{`
 80 |         @keyframes schoolRowIn {
 81 |           from { opacity: 0; transform: translateX(-14px); }
 82 |           to   { opacity: 1; transform: translateX(0); }
 83 |         }
 84 |         .school-row-enter {
 85 |           animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
 86 |           opacity: 0;
 87 |         }
 88 |       `}</style>
 89 |       <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar">
 90 |         {schools.map((school, index) => (
 91 |           <SchoolCard key={school.id} school={school} index={index} onDelete={onDelete} stages={stages} />
 92 |         ))}
 93 | 
 94 |         {schools.length === 0 && (
 95 |           <div className="text-center py-10 text-slate-400">
 96 |             <p>
 97 |               {searchQuery
 98 |                 ? `Нічого не знайдено за «${searchQuery}»`
 99 |                 : "Шкіл ще немає"}
100 |             </p>
101 |           </div>
102 |         )}
103 |       </div>
104 |     </>
105 |   );
106 | }
107 | 
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
  4 | import type { School, PipelineStage } from "../../types";
  5 | 
  6 | interface Props {
  7 |   schools: School[];
  8 |   searchQuery: string;
  9 |   onDelete: (e: React.MouseEvent, id: string, name: string) => void;
 10 |   stages: PipelineStage[];
 11 | }
 12 | 
 13 | export default function VirtualDesktopTable({ schools, searchQuery, onDelete, stages }: Props) {
 14 |   const navigate = useNavigate();
 15 |   const parentRef = useRef<HTMLDivElement>(null);
 16 | 
 17 |   const rowVirtualizer = useVirtualizer({
 18 |     count: schools.length,
 19 |     getScrollElement: () => parentRef.current,
 20 |     estimateSize: () => 57,
 21 |     overscan: 8,
 22 |   });
 23 | 
 24 |   return (
 25 |     <div ref={parentRef} className="overflow-y-auto flex-1 h-full">
 26 |       <table className="w-full text-left border-collapse">
 27 |         <thead className="sticky top-0 z-10 bg-slate-50">
 28 |           <tr className="border-b border-slate-100">
 29 |             <th className="p-4 font-medium text-slate-600">Назва школи</th>
 30 |             <th className="p-4 font-medium text-slate-600">Місто</th>
 31 |             <th className="p-4 font-medium text-slate-600">Статус</th>
 32 |             <th className="p-4 font-medium text-slate-600">Поточний етап</th>
 33 |             <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
 34 |           </tr>
 35 |         </thead>
 36 |         <tbody>
 37 |           {rowVirtualizer.getVirtualItems().map((virtualRow) => (
 38 |             <tr
 39 |               key={virtualRow.key}
 40 |               style={{ height: `${virtualRow.size}px` }}
 41 |             >
 42 |               <SchoolRow
 43 |                 school={schools[virtualRow.index]}
 44 |                 onDelete={onDelete}
 45 |                 stages={stages}
 46 |                 navigate={navigate}
 47 |               />
 48 |             </tr>
 49 |           ))}
 50 |           <tr style={{ height: `${rowVirtualizer.getTotalSize() - rowVirtualizer.getVirtualItems().reduce((s, r) => s + r.size, 0)}px` }}>
 51 |             <td colSpan={5} />
 52 |           </tr>
 53 |         </tbody>
 54 |       </table>
 55 | 
 56 |       {schools.length === 0 && (
 57 |         <div className="text-center py-16 text-slate-400 text-sm font-medium">
 58 |           {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
 59 |         </div>
 60 |       )}
 61 |     </div>
 62 |   );
 63 | }
```

### File: apps/frontend/src/components/schools/schoolUtils.ts
```ts
  0 | import type { School } from "../../types";
  1 | 
  2 | const PLANNED_STAGES = ["BASE", "FIRST_CONTACT", "DATE_CONFIRMED"];
  3 | const IN_PROGRESS_STAGES = ["PREPARATION", "IN_PROGRESS", "DONE", "REPORT"];
  4 | 
  5 | export function classifySchool(
  6 |   school: School,
  7 | ): "new" | "planned" | "inProgress" | "done" {
  8 |   const events = (school.events || []).filter(
  9 |     (e) => e.status !== "RE_SALE",
 10 |   );
 11 |   if (events.length === 0) {
 12 |     return (school.events || []).some((e) => e.status === "RE_SALE")
 13 |       ? "done"
 14 |       : "new";
 15 |   }
 16 |   const latest = events[events.length - 1];
 17 |   if (PLANNED_STAGES.includes(latest.status)) return "planned";
 18 |   if (IN_PROGRESS_STAGES.includes(latest.status)) return "inProgress";
 19 |   if (latest.status === "RE_SALE") return "done";
 20 |   return "new";
 21 | }
 22 | 
 23 | export function classifySize(
 24 |   school: School,
 25 |   schoolType: "Школа" | "Садочок" = "Школа",
 26 | ): "small" | "medium" | "large" {
 27 |   const count = school.childrenCount ?? 0;
 28 |   if (schoolType === "Садочок") {
 29 |     if (count < 50) return "small";
 30 |     if (count < 100) return "medium";
 31 |     return "large";
 32 |   }
 33 |   if (count < 500) return "small";
 34 |   if (count < 900) return "medium";
 35 |   return "large";
 36 | }
 37 | 
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
  0 | import axios from "axios";
  1 | 
  2 | export const API_BASE_URL =
  3 |   import.meta.env.VITE_API_URL || "https://crm-57qd.onrender.com";
  4 | 
  5 | export const api = axios.create({
  6 |   baseURL: API_BASE_URL,
  7 |   withCredentials: true,
  8 | });
  9 | 
 10 | function getCookie(name: string): string | null {
 11 |   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
 12 |   return match ? match[2] : null;
 13 | }
 14 | 
 15 | api.interceptors.request.use((config) => {
 16 |   if (config.method && config.method !== "get") {
 17 |     const csrfToken = getCookie("csrf_token");
 18 |     if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
 19 |   }
 20 |   return config;
 21 | });
 22 | 
 23 | api.interceptors.response.use(
 24 |   (res) => res,
 25 |   (error) => {
 26 |     if (error.response?.status === 401) {
 27 |       localStorage.removeItem("user");
 28 |       if (!window.location.pathname.startsWith("/login")) {
 29 |         window.location.href = "/login";
 30 |       }
 31 |     }
 32 |     return Promise.reject(error);
 33 |   },
 34 | );
 35 | 
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
  2 | import type { City, School } from "../types";
  3 | 
  4 | const auth = () => ({
  5 |   Authorization: `Bearer ${localStorage.getItem("token")}`,
  6 | });
  7 | 
  8 | export function useCities() {
  9 |   return useQuery({
 10 |     queryKey: ["cities"],
 11 |     queryFn: () =>
 12 |       api.get<City[]>("/cities", { headers: auth() }).then((r) => r.data),
 13 |     staleTime: 5 * 60 * 1000,
 14 |   });
 15 | }
 16 | 
 17 | export function useAddCity() {
 18 |   const qc = useQueryClient();
 19 |   return useMutation({
 20 |     mutationFn: (name: string) =>
 21 |       api
 22 |         .post<City>("/cities", { name }, { headers: auth() })
 23 |         .then((r) => r.data),
 24 |     onSuccess: (newCity) => {
 25 |       qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
 26 |     },
 27 |   });
 28 | }
 29 | 
 30 | export function useSchools() {
 31 |   return useQuery({
 32 |     queryKey: ["schools"],
 33 |     queryFn: () =>
 34 |       api
 35 |         .get<School[]>("/schools?minimal=true", { headers: auth() })
 36 |         .then((r) => r.data),
 37 |     staleTime: 5 * 60 * 1000,
 38 |   });
 39 | }
 40 | 
 41 | export function useAddSchool() {
 42 |   const qc = useQueryClient();
 43 |   return useMutation({
 44 |     mutationFn: (data: Partial<School>) =>
 45 |       api
 46 |         .post<School>("/schools", data, { headers: auth() })
 47 |         .then((r) => r.data),
 48 |     onSuccess: () => {
 49 |       qc.invalidateQueries({ queryKey: ["schools"] });
 50 |     },
 51 |   });
 52 | }
 53 | 
 54 | export function useDeleteSchool() {
 55 |   const qc = useQueryClient();
 56 |   return useMutation({
 57 |     mutationFn: (schoolId: string) =>
 58 |       api.delete(`/schools/${schoolId}`, { headers: auth() }),
 59 |     onSuccess: (_data, schoolId) => {
 60 |       qc.setQueryData(["schools"], (old: School[] = []) =>
 61 |         old.filter((s) => s.id !== schoolId),
 62 |       );
 63 |     },
 64 |   });
 65 | }
 66 | 
 67 | export function useEvents() {
 68 |   return useQuery({
 69 |     queryKey: ["events"],
 70 |     queryFn: () => api.get("/events", { headers: auth() }).then((r) => r.data),
 71 |     staleTime: 2 * 60 * 1000,
 72 |   });
 73 | }
 74 | 
 75 | export function usePrefetchSchool() {
 76 |   const qc = useQueryClient();
 77 |   return (schoolId: string) => {
 78 |     qc.prefetchQuery({
 79 |       queryKey: ["school", schoolId],
 80 |       queryFn: () =>
 81 |         api
 82 |           .get<School>(`/schools/${schoolId}`, { headers: auth() })
 83 |           .then((r) => r.data),
 84 |       staleTime: 2 * 60 * 1000,
 85 |     });
 86 |   };
 87 | }
 88 | 
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
 50 |       qc.setQueryData(["city", cityId], (old: any) =>
 51 |         old
 52 |           ? {
 53 |               ...old,
 54 |               crews: old.crews?.map((c: any) =>
 55 |                 c.id?.startsWith("temp-") ? data : c,
 56 |               ),
 57 |             }
 58 |           : old,
 59 |       );
 60 |     },
 61 |     onError: (_err, _vars, ctx) => {
 62 |       if (ctx?.prev) qc.setQueryData(["city", cityId], ctx.prev);
 63 |     },
 64 |   });
 65 | }
 66 | 
 67 | export function useDeleteCrew(cityId: string | undefined) {
 68 |   const qc = useQueryClient();
 69 |   return useMutation({
 70 |     mutationFn: (crewId: string) =>
 71 |       api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
 72 |     onMutate: async (crewId) => {
 73 |       await qc.cancelQueries({ queryKey: ["city", cityId] });
 74 |       const prev = qc.getQueryData(["city", cityId]);
 75 |       qc.setQueryData(["city", cityId], (old: any) =>
 76 |         old
 77 |           ? { ...old, crews: old.crews?.filter((c: any) => c.id !== crewId) }
 78 |           : old,
 79 |       );
 80 |       return { prev };
 81 |     },
 82 |     onError: (_err, _vars, ctx) => {
 83 |       if (ctx?.prev) qc.setQueryData(["city", cityId], ctx.prev);
 84 |     },
 85 |   });
 86 | }
 87 | 
```

### File: apps/frontend/src/hooks/useEmployees.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | import type { User, Project } from "../types";
  3 | 
  4 | const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
  5 | 
  6 | export interface UserFormData {
  7 |   fullName: string;
  8 |   phone: string;
  9 |   email: string;
 10 |   cityId: string;
 11 |   role: string;
 12 |   password: string;
 13 |   telegramId: string;
 14 |   car: string;
 15 | }
 16 | 
 17 | export function useUsers() {
 18 |   return useQuery({
 19 |     queryKey: ["users"],
 20 |     queryFn: () =>
 21 |       api.get<User[]>("/users", { headers: h() }).then((r) => r.data),
 22 |     staleTime: 2 * 60 * 1000,
 23 |   });
 24 | }
 25 | 
 26 | export function useProjects() {
 27 |   return useQuery({
 28 |     queryKey: ["projects"],
 29 |     queryFn: () =>
 30 |       api.get<Project[]>("/projects", { headers: h() }).then((r) => r.data),
 31 |     staleTime: 5 * 60 * 1000,
 32 |   });
 33 | }
 34 | 
 35 | export function useCreateUser() {
 36 |   const qc = useQueryClient();
 37 |   return useMutation({
 38 |     mutationFn: (form: UserFormData) =>
 39 |       api.post<User>("/users", form, { headers: h() }).then((r) => r.data),
 40 |     onMutate: async (form) => {
 41 |       await qc.cancelQueries({ queryKey: ["users"] });
 42 |       const prev = qc.getQueryData<User[]>(["users"]);
 43 |       const optimistic = {
 44 |         id: `temp-${Date.now()}`,
 45 |         name: form.fullName,
 46 |         ...form,
 47 |       };
 48 |       qc.setQueryData(["users"], (old: User[] | undefined) =>
 49 |         Array.isArray(old) ? [...old, optimistic] : [optimistic],
 50 |       );
 51 |       return { prev };
 52 |     },
 53 |     onSuccess: (data) => {
 54 |       qc.setQueryData(["users"], (old: User[] | undefined) =>
 55 |         Array.isArray(old)
 56 |           ? old.map((u) => (u.id?.startsWith("temp-") ? data : u))
 57 |           : [data],
 58 |       );
 59 |     },
 60 |     onError: (_err, _vars, ctx) => {
 61 |       if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
 62 |     },
 63 |   });
 64 | }
 65 | 
 66 | export function useUpdateUser() {
 67 |   const qc = useQueryClient();
 68 |   return useMutation({
 69 |     mutationFn: ({ id, form }: { id: string; form: Partial<UserFormData> }) =>
 70 |       api
 71 |         .patch<User>(`/users/${id}`, form, { headers: h() })
 72 |         .then((r) => r.data),
 73 |     onMutate: async ({ id, form }) => {
 74 |       await qc.cancelQueries({ queryKey: ["users"] });
 75 |       const prev = qc.getQueryData<User[]>(["users"]);
 76 |       qc.setQueryData(["users"], (old: User[] | undefined) =>
 77 |         Array.isArray(old)
 78 |           ? old.map((u) =>
 79 |               u.id === id
 80 |                 ? { ...u, name: form.fullName ?? u.name, ...form }
 81 |                 : u,
 82 |             )
 83 |           : old,
 84 |       );
 85 |       return { prev };
 86 |     },
 87 |     onSuccess: (data, vars) => {
 88 |       qc.setQueryData(["users"], (old: User[] | undefined) =>
 89 |         Array.isArray(old)
 90 |           ? old.map((u) => (u.id === vars.id ? { ...u, ...data } : u))
 91 |           : old,
 92 |       );
 93 |     },
 94 |     onError: (_err, _vars, ctx) => {
 95 |       if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
 96 |     },
 97 |   });
 98 | }
 99 | 
100 | export function useDeleteUser() {
101 |   const qc = useQueryClient();
102 |   return useMutation({
103 |     mutationFn: (id: string) =>
104 |       api.delete(`/users/${id}`, { headers: h() }).then((r) => r.data),
105 |     onMutate: async (id) => {
106 |       await qc.cancelQueries({ queryKey: ["users"] });
107 |       const prev = qc.getQueryData<User[]>(["users"]);
108 |       qc.setQueryData(["users"], (old: User[] | undefined) =>
109 |         Array.isArray(old) ? old.filter((u) => u.id !== id) : old,
110 |       );
111 |       return { prev };
112 |     },
113 |     onError: (_err, _vars, ctx) => {
114 |       if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
115 |     },
116 |   });
117 | }
118 | 
119 | export function useCreateProject() {
120 |   const qc = useQueryClient();
121 |   return useMutation({
122 |     mutationFn: (form: { name: string; color: string }) =>
123 |       api
124 |         .post<Project>("/projects", form, { headers: h() })
125 |         .then((r) => r.data),
126 |     onSuccess: (data) => {
127 |       qc.setQueryData(["projects"], (old: Project[] | undefined) =>
128 |         Array.isArray(old) ? [...old, data] : [data],
129 |       );
130 |     },
131 |   });
132 | }
133 | 
134 | export function useDeleteProject() {
135 |   const qc = useQueryClient();
136 |   return useMutation({
137 |     mutationFn: (id: string) =>
138 |       api.delete(`/projects/${id}`, { headers: h() }).then((r) => r.data),
139 |     onSuccess: (_data, id) => {
140 |       qc.setQueryData(["projects"], (old: Project[] | undefined) =>
141 |         Array.isArray(old) ? old.filter((p) => p.id !== id) : old,
142 |       );
143 |     },
144 |   });
145 | }
146 | 
```

### File: apps/frontend/src/hooks/useSchoolProfile.ts
```ts
  0 | import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  1 | import { api } from "../config/api";
  2 | import type {
  3 |   Event,
  4 |   EventHistory,
  5 |   User,
  6 |   SchoolProfileData,
  7 |   CreateEventPayload,
  8 | } from "../types";
  9 | import type { ReportData } from "../components/school-profile/modals/ReportModal";
 10 | 
 11 | const authHeader = () => ({
 12 |   Authorization: `Bearer ${localStorage.getItem("token")}`,
 13 | });
 14 | 
 15 | export function useSchool(id: string | undefined) {
 16 |   return useQuery({
 17 |     queryKey: ["school", id],
 18 |     queryFn: async () => {
 19 |       const res = await api.get(`/schools/${id}`, { headers: authHeader() });
 20 |       return res.data;
 21 |     },
 22 |     enabled: !!id,
 23 |     staleTime: 2 * 60 * 1000,
 24 |   });
 25 | }
 26 | 
 27 | export function useSchoolCompletedEvents(schoolId: string | undefined) {
 28 |   return useQuery({
 29 |     queryKey: ["schoolCompletedEvents", schoolId],
 30 |     queryFn: async () => {
 31 |       const res = await api.get<Event[]>(
 32 |         `/events/school/${schoolId}/completed`,
 33 |         {
 34 |           headers: authHeader(),
 35 |         },
 36 |       );
 37 |       return res.data;
 38 |     },
 39 |     enabled: !!schoolId,
 40 |     staleTime: 2 * 60 * 1000,
 41 |   });
 42 | }
 43 | 
 44 | export function useSchoolEvents(schoolId: string | undefined, full = false) {
 45 |   return useQuery({
 46 |     queryKey: ["schoolEvents", schoolId, full],
 47 |     queryFn: async () => {
 48 |       const url = full
 49 |         ? `/events/school/${schoolId}`
 50 |         : `/events/school/${schoolId}?minimal=true`;
 51 |       const res = await api.get<Event[]>(url, { headers: authHeader() });
 52 |       return res.data.filter((ev) => ev.status !== "RE_SALE");
 53 |     },
 54 |     enabled: !!schoolId,
 55 |     staleTime: 60 * 1000,
 56 |   });
 57 | }
 58 | 
 59 | export function useEventFull(eventId: string | undefined) {
 60 |   return useQuery({
 61 |     queryKey: ["eventFull", eventId],
 62 |     queryFn: async () => {
 63 |       const res = await api.get<Event>(`/events/${eventId}`, {
 64 |         headers: authHeader(),
 65 |       });
 66 |       return res.data;
 67 |     },
 68 |     enabled: !!eventId,
 69 |     staleTime: 30 * 1000,
 70 |   });
 71 | }
 72 | 
 73 | export function useUsers() {
 74 |   return useQuery({
 75 |     queryKey: ["users"],
 76 |     queryFn: async () => {
 77 |       const res = await api.get<User[]>("/users", { headers: authHeader() });
 78 |       return res.data;
 79 |     },
 80 |     staleTime: 5 * 60 * 1000,
 81 |   });
 82 | }
 83 | 
 84 | export function useUpdateEventStatus() {
 85 |   const qc = useQueryClient();
 86 |   return useMutation({
 87 |     mutationFn: ({
 88 |       eventId,
 89 |       status,
 90 |       actionName,
 91 |       comment,
 92 |     }: {
 93 |       eventId: string;
 94 |       status: string;
 95 |       actionName: string;
 96 |       comment?: string;
 97 |     }) =>
 98 |       api
 99 |         .patch(
100 |           `/events/${eventId}/status`,
101 |           { status, actionName, comment },
102 |           { headers: authHeader() },
103 |         )
104 |         .then((r) => r.data),
105 |     onSuccess: (data, vars) => {
106 |       qc.setQueryData(["eventFull", vars.eventId], data);
107 |       qc.setQueriesData(
108 |         { queryKey: ["schoolEvents"] },
109 |         (old: Event[] | undefined) =>
110 |           Array.isArray(old)
111 |             ? old
112 |                 .map((ev) =>
113 |                   ev.id === vars.eventId
114 |                     ? { ...ev, status: vars.status, ...data }
115 |                     : ev,
116 |                 )
117 |                 .filter((ev) => ev.status !== "RE_SALE")
118 |             : old,
119 |       );
120 |     },
121 |   });
122 | }
123 | 
124 | export function useUpdatePreparation() {
125 |   const qc = useQueryClient();
126 |   return useMutation({
127 |     mutationFn: ({
128 |       eventId,
129 |       field,
130 |       status,
131 |     }: {
132 |       eventId: string;
133 |       field: string;
134 |       status: string;
135 |     }) =>
136 |       api
137 |         .patch(
138 |           `/events/${eventId}/preparation`,
139 |           { field, status },
140 |           { headers: authHeader() },
141 |         )
142 |         .then((r) => r.data),
143 |     onSuccess: (_data, vars) => {
144 |       qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
145 |         old
146 |           ? {
147 |               ...old,
148 |               preparation: {
149 |                 ...(old.preparation || {}),
150 |                 [vars.field]: vars.status,
151 |               },
152 |             }
153 |           : old,
154 |       );
155 |     },
156 |   });
157 | }
158 | 
159 | export function useAssignCrew() {
160 |   const qc = useQueryClient();
161 |   return useMutation({
162 |     mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
163 |       api
164 |         .post(
165 |           `/events/${eventId}/assign-crew`,
166 |           { crewId },
167 |           { headers: authHeader() },
168 |         )
169 |         .then((r) => r.data),
170 |     onSuccess: (data, vars) => {
171 |       qc.setQueryData(["eventFull", vars.eventId], data);
172 |       qc.setQueriesData(
173 |         { queryKey: ["schoolEvents"] },
174 |         (old: Event[] | undefined) =>
175 |           Array.isArray(old)
176 |             ? old.map((ev) =>
177 |                 ev.id === vars.eventId
178 |                   ? { ...ev, crewId: vars.crewId, crew: data.crew }
179 |                   : ev,
180 |               )
181 |             : old,
182 |       );
183 |     },
184 |   });
185 | }
186 | 
187 | export function useSubmitReport() {
188 |   const qc = useQueryClient();
189 |   return useMutation({
190 |     mutationFn: ({
191 |       eventId,
192 |       reportData,
193 |     }: {
194 |       eventId: string;
195 |       reportData: ReportData;
196 |     }) =>
197 |       api
198 |         .post(`/events/${eventId}/report`, reportData, {
199 |           headers: authHeader(),
200 |         })
201 |         .then((r) => r.data),
202 |     onSuccess: (_data, vars) => {
203 |       qc.setQueriesData(
204 |         { queryKey: ["schoolEvents"] },
205 |         (old: Event[] | undefined) =>
206 |           Array.isArray(old) ? old.filter((ev) => ev.id !== vars.eventId) : old,
207 |       );
208 |       qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
209 |     },
210 |   });
211 | }
212 | 
213 | export function useAddComment() {
214 |   const qc = useQueryClient();
215 |   return useMutation({
216 |     mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
217 |       api
218 |         .post(
219 |           `/events/${eventId}/history`,
220 |           { comment },
221 |           { headers: authHeader() },
222 |         )
223 |         .then((r) => r.data),
224 |     onSuccess: (data, vars) => {
225 |       qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
226 |         old ? { ...old, history: data.history } : old,
227 |       );
228 |     },
229 |   });
230 | }
231 | 
232 | export const useUpdateSchool = () => {
233 |   const queryClient = useQueryClient();
234 | 
235 |   return useMutation({
236 |     mutationFn: async ({
237 |       id,
238 |       ...payload
239 |     }: { id: string } & Omit<SchoolProfileData, "id" | "city">) => {
240 |       const res = await api.patch(`/schools/${id}`, payload);
241 |       return res.data;
242 |     },
243 |     onSuccess: (_, variables) => {
244 |       queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
245 |     },
246 |   });
247 | };
248 | 
249 | export const useCreateEvent = () => {
250 |   const queryClient = useQueryClient();
251 | 
252 |   return useMutation({
253 |     mutationFn: async (payload: CreateEventPayload) => {
254 |       const res = await api.post<Event>("/events", payload);
255 |       return res.data;
256 |     },
257 |     onSuccess: (_newEvent, variables) => {
258 |       queryClient.invalidateQueries({
259 |         queryKey: ["schoolEvents", variables.schoolId],
260 |       });
261 |     },
262 |   });
263 | };
264 | 
265 | export function useUpdateHistoryComment() {
266 |   const qc = useQueryClient();
267 |   return useMutation({
268 |     mutationFn: ({
269 |       historyId,
270 |       comment,
271 |       eventId,
272 |     }: {
273 |       historyId: string;
274 |       comment: string;
275 |       eventId: string;
276 |     }) =>
277 |       api
278 |         .patch(
279 |           `/events/history/${historyId}`,
280 |           { comment },
281 |           { headers: authHeader() },
282 |         )
283 |         .then((r) => r.data),
284 |     onSuccess: (_data, vars) => {
285 |       qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
286 |         old
287 |           ? {
288 |               ...old,
289 |               history: old.history?.map((h: EventHistory) =>
290 |                 h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
291 |               ),
292 |             }
293 |           : old,
294 |       );
295 |     },
296 |   });
297 | }
298 | 
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
  0 | import { useSelectedCity } from "../context/CityContext";
  1 | import { useNavigate } from "react-router-dom";
  2 | import { useCalendarEvents, useCalendarProjects } from "../hooks/useCalendar";
  3 | import { useState, useEffect } from 'react';
  4 | interface CalendarEvent {
  5 |   id: string;
  6 |   project: string;
  7 |   date: string;
  8 |   time?: string;
  9 |   status: string;
 10 |   school?: { id: string; name: string };
 11 |   city?: { id: string; name: string };
 12 |   crew?: { id: string; name: string };
 13 | }
 14 | 
 15 | export default function CalendarView() {
 16 |   const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
 17 |   const { data: projects = [] } = useCalendarProjects();
 18 |   const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
 19 |   const [currentDate, setCurrentDate] = useState(new Date());
 20 |   const isLoading = eventsLoading;
 21 |   const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
 22 |     new Date(),
 23 |   );
 24 | 
 25 |   const { selectedCity } = useSelectedCity();
 26 |   const navigate = useNavigate();
 27 | 
 28 |   const [userRole, setUserRole] = useState<string>("GUEST");
 29 |   const [filterCityId, setFilterCityId] = useState<string>("ALL");
 30 | 
 31 | 
 32 |   useEffect(() => {
 33 |     try {
 34 |       const token = localStorage.getItem("token");
 35 |       if (token) {
 36 |         const payload = JSON.parse(atob(token.split(".")[1]));
 37 |         setUserRole(payload.role);
 38 |         if (payload.role === "MANAGER" && selectedCity?.id) {
 39 |           setFilterCityId(selectedCity.id);
 40 |         }
 41 |       }
 42 |     } catch (e) {
 43 |       console.error("Помилка парсингу токена", e);
 44 |     }
 45 |   }, [selectedCity]);
 46 | 
 47 |   const nextMonth = () =>
 48 |     setCurrentDate(
 49 |       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
 50 |     );
 51 |   const prevMonth = () =>
 52 |     setCurrentDate(
 53 |       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
 54 |     );
 55 |   const today = () => {
 56 |     setCurrentDate(new Date());
 57 |     setSelectedMobileDate(new Date());
 58 |   };
 59 | 
 60 |   const getDaysInMonth = (year: number, month: number) =>
 61 |     new Date(year, month + 1, 0).getDate();
 62 |   const getFirstDayOfMonth = (year: number, month: number) => {
 63 |     let day = new Date(year, month, 1).getDay();
 64 |     return day === 0 ? 6 : day - 1;
 65 |   };
 66 | 
 67 |   const year = currentDate.getFullYear();
 68 |   const month = currentDate.getMonth();
 69 |   const daysInMonth = getDaysInMonth(year, month);
 70 |   const firstDay = getFirstDayOfMonth(year, month);
 71 | 
 72 |   const days = [];
 73 |   for (let i = 0; i < firstDay; i++) days.push(null);
 74 |   for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
 75 | 
 76 |   const filteredEvents = events.filter((ev) => {
 77 |     if (ev.status === "RE_SALE") return false;
 78 |     if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
 79 |     return true;
 80 |   });
 81 | 
 82 |   const getEventsForDay = (date: Date) => {
 83 |     return filteredEvents.filter((ev) => {
 84 |       const evDate = new Date(ev.date);
 85 |       return (
 86 |         evDate.getFullYear() === date.getFullYear() &&
 87 |         evDate.getMonth() === date.getMonth() &&
 88 |         evDate.getDate() === date.getDate()
 89 |       );
 90 |     });
 91 |   };
 92 | 
 93 |   const monthNames = [
 94 |     "Січень",
 95 |     "Лютий",
 96 |     "Березень",
 97 |     "Квітень",
 98 |     "Травень",
 99 |     "Червень",
100 |     "Липень",
101 |     "Серпень",
102 |     "Вересень",
103 |     "Жовтень",
104 |     "Листопад",
105 |     "Грудень",
106 |   ];
107 | 
108 |   const getProjectColor = (projectName: string) => {
109 |     const proj = projects.find((p) => p.name === projectName);
110 |     const color = proj ? proj.color : "blue";
111 | 
112 |     switch (color) {
113 |       case "emerald":
114 |         return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300";
115 |       case "rose":
116 |         return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300";
117 |       case "red":
118 |         return "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400";
119 |       case "amber":
120 |         return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300";
121 |       case "purple":
122 |         return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300";
123 |       default:
124 |         return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300";
125 |     }
126 |   };
127 | 
128 |   if (isLoading)
129 |     return (
130 |       <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
131 |         {/* Шапка */}
132 |         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
133 |           <div>
134 |             <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
135 |             <div className="h-4 w-72 bg-slate-200 rounded-lg mb-4" />
136 |             <div className="flex gap-3 mt-4">
137 |               {[80, 100, 90].map((w, i) => (
138 |                 <div
139 |                   key={i}
140 |                   className="h-4 bg-slate-200 rounded-full"
141 |                   style={{ width: w }}
142 |                 />
143 |               ))}
144 |             </div>
145 |           </div>
146 |           <div className="h-10 w-48 bg-slate-200 rounded-xl" />
147 |         </div>
148 | 
149 |         {/* Календар */}
150 |         <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
151 |           {/* Керування місяцем */}
152 |           <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
153 |             <div className="h-8 w-36 bg-slate-200 rounded-xl" />
154 |             <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
155 |           </div>
156 | 
157 |           {/* Дні тижня */}
158 |           <div className="grid grid-cols-7 bg-slate-50/50">
159 |             {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
160 |               <div key={d} className="py-3 flex justify-center">
161 |                 <div className="h-3 w-6 bg-slate-200 rounded" />
162 |               </div>
163 |             ))}
164 | 
165 |             {/* Клітинки */}
166 |             {Array.from({ length: 35 }).map((_, i) => (
167 |               <div
168 |                 key={i}
169 |                 className="min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-2"
170 |               >
171 |                 <div className="flex justify-end mb-2">
172 |                   <div className="w-7 h-7 rounded-full bg-slate-200" />
173 |                 </div>
174 |                 {i % 4 === 0 && (
175 |                   <div className="h-5 bg-slate-100 rounded-md mb-1.5 mx-0.5" />
176 |                 )}
177 |                 {i % 7 === 2 && (
178 |                   <div className="h-5 bg-slate-100 rounded-md mx-0.5" />
179 |                 )}
180 |               </div>
181 |             ))}
182 |           </div>
183 |         </div>
184 | 
185 |         {/* Мобільний блок подій */}
186 |         <div className="mt-6 md:hidden">
187 |           <div className="h-6 w-40 bg-slate-200 rounded-lg mb-3" />
188 |           <div className="space-y-3">
189 |             {[1, 2].map((i) => (
190 |               <div
191 |                 key={i}
192 |                 className="bg-white p-4 rounded-2xl border-l-4 border-l-slate-200 shadow-sm"
193 |               >
194 |                 <div className="flex justify-between mb-2">
195 |                   <div className="h-5 w-20 bg-slate-200 rounded" />
196 |                   <div className="h-5 w-28 bg-slate-200 rounded" />
197 |                 </div>
198 |                 <div className="h-5 w-48 bg-slate-200 rounded mb-1" />
199 |                 <div className="h-4 w-36 bg-slate-200 rounded" />
200 |               </div>
201 |             ))}
202 |           </div>
203 |         </div>
204 |       </div>
205 |     );
206 | 
207 |   const selectedDayEvents = getEventsForDay(selectedMobileDate);
208 | 
209 |   return (
210 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
211 |       {/* Шапка календаря */}
212 |       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
213 |         <div>
214 |           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
215 |             Календар подій
216 |           </h1>
217 |           <p className="text-slate-500 mt-1 text-sm">
218 |             Графік запланованих та активних заходів
219 |           </p>
220 | 
221 |           {/* Легенда */}
222 |           <div className="flex flex-wrap items-center gap-3 mt-4">
223 |             {projects.map((p) => {
224 |               const badgeColor =
225 |                 {
226 |                   blue: "bg-blue-400",
227 |                   emerald: "bg-emerald-400",
228 |                   rose: "bg-rose-400",
229 |                   red: "bg-red-500",
230 |                   amber: "bg-amber-400",
231 |                   purple: "bg-purple-400",
232 |                 }[p.color] || "bg-blue-400";
233 | 
234 |               return (
235 |                 <span
236 |                   key={p.id}
237 |                   className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
238 |                 >
239 |                   <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
240 |                   {p.name}
241 |                 </span>
242 |               );
243 |             })}
244 |           </div>
245 |         </div>
246 | 
247 |         {userRole === "SUPERADMIN" && (
248 |           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 shrink-0">
249 |             <span className="text-sm text-slate-500 font-medium">Місто:</span>
250 |             <select
251 |               value={filterCityId}
252 |               onChange={(e) => setFilterCityId(e.target.value)}
253 |               className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
254 |             >
255 |               <option value="ALL">🌍 Всі міста</option>
256 |               {cities.map((c) => (
257 |                 <option key={c.id} value={c.id}>
258 |                   {c.name}
259 |                 </option>
260 |               ))}
261 |             </select>
262 |           </div>
263 |         )}
264 |       </div>
265 | 
266 |       <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
267 |         {/* Керування місяцями */}
268 |         <div className="flex flex-col sm:flex-row items-center justify-between p-5 md:p-6 border-b border-slate-100 gap-4 bg-white">
269 |           <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
270 |             {monthNames[month]}{" "}
271 |             <span className="text-slate-400 font-medium">{year}</span>
272 |           </h2>
273 |           <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
274 |             <button
275 |               onClick={prevMonth}
276 |               className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
277 |             >
278 |               ◀
279 |             </button>
280 |             <button
281 |               onClick={today}
282 |               className="px-4 md:px-6 py-2 bg-white rounded-xl shadow-sm text-slate-800 font-bold transition-all hover:bg-slate-50"
283 |             >
284 |               Сьогодні
285 |             </button>
286 |             <button
287 |               onClick={nextMonth}
288 |               className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
289 |             >
290 |               ▶
291 |             </button>
292 |           </div>
293 |         </div>
294 | 
295 |         {/* Сітка календаря */}
296 |         <div className="grid grid-cols-7 bg-slate-50/50">
297 |           {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
298 |             <div
299 |               key={dayName}
300 |               className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
301 |             >
302 |               {dayName}
303 |             </div>
304 |           ))}
305 | 
306 |           {days.map((day, idx) => {
307 |             const isToday =
308 |               day && day.toDateString() === new Date().toDateString();
309 |             const isSelected =
310 |               day && day.toDateString() === selectedMobileDate.toDateString();
311 |             const dayEvents = day ? getEventsForDay(day) : [];
312 | 
313 |             return (
314 |               <div
315 |                 key={idx}
316 |                 onClick={() => day && setSelectedMobileDate(day)}
317 |                 className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
318 |                   ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
319 |                   ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
320 |                 `}
321 |               >
322 |                 {day && (
323 |                   <>
324 |                     <div className="flex justify-center md:justify-end mb-1.5">
325 |                       <span
326 |                         className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
327 |                         ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
328 |                       `}
329 |                       >
330 |                         {day.getDate()}
331 |                       </span>
332 |                     </div>
333 | 
334 |                     <div className="space-y-1.5 max-h-[80px] md:max-h-[100px] overflow-y-auto custom-scrollbar pr-0.5">
335 |                       {dayEvents.map((ev) => (
336 |                         <div
337 |                           key={ev.id}
338 |                           className="relative group/event z-0 hover:z-50"
339 |                         >
340 |                           <button
341 |                             onClick={(e) => {
342 |                               e.stopPropagation();
343 |                               if (ev.school)
344 |                                 navigate(`/schools/${ev.school.id}`);
345 |                             }}
346 |                             className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${getProjectColor(ev.project)}`}
347 |                           >
348 |                             {ev.time || "—"}
349 |                           </button>
350 | 
351 |                           {/* Тултип (тільки для Десктопу) */}
352 |                           <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
353 |                             <p className="font-bold text-sm mb-1 truncate">
354 |                               {ev.school?.name || "Невідомий заклад"}
355 |                             </p>
356 |                             <div className="space-y-1 text-xs text-slate-300">
357 |                               <p>
358 |                                 <span className="text-slate-400">Проєкт:</span>{" "}
359 |                                 {ev.project}
360 |                               </p>
361 |                               <p>
362 |                                 <span className="text-slate-400">Екіпаж:</span>{" "}
363 |                                 {ev.crew?.name || "Не призначено"}
364 |                               </p>
365 |                               <p>
366 |                                 <span className="text-slate-400">Час:</span>{" "}
367 |                                 <span className="font-bold text-white">
368 |                                   {ev.time || "—"}
369 |                                 </span>
370 |                               </p>
371 |                             </div>
372 |                             {/* Трикутник тултипа */}
373 |                             <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
374 |                           </div>
375 |                         </div>
376 |                       ))}
377 |                     </div>
378 |                   </>
379 |                 )}
380 |               </div>
381 |             );
382 |           })}
383 |         </div>
384 |       </div>
385 | 
386 |       {/* Блок подій для мобільних пристроїв (з'являється під календарем) */}
387 |       <div className="mt-6 md:hidden">
388 |         <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
389 |           📅 Події на{" "}
390 |           {selectedMobileDate.toLocaleDateString("uk-UA", {
391 |             day: "2-digit",
392 |             month: "long",
393 |           })}
394 |         </h3>
395 | 
396 |         {selectedDayEvents.length === 0 ? (
397 |           <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">
398 |             На цей день подій не заплановано
399 |           </div>
400 |         ) : (
401 |           <div className="space-y-3">
402 |             {selectedDayEvents.map((ev) => (
403 |               <div
404 |                 key={ev.id}
405 |                 onClick={() =>
406 |                   ev.school && navigate(`/schools/${ev.school.id}`)
407 |                 }
408 |                 className={`bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer
409 |                   ${
410 |                     ev.project.toLowerCase().includes("голограм")
411 |                       ? "border-l-emerald-500"
412 |                       : ev.project.toLowerCase().includes("малювайк")
413 |                         ? "border-l-rose-500"
414 |                         : ev.project.toLowerCase().includes("360")
415 |                           ? "border-l-red-500"
416 |                           : "border-l-blue-500"
417 |                   }
418 |                 `}
419 |               >
420 |                 <div className="flex justify-between items-start mb-2">
421 |                   <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
422 |                     🕒 {ev.time || "Не вказано"}
423 |                   </span>
424 |                   <span className="text-xs font-medium text-slate-500">
425 |                     {ev.project}
426 |                   </span>
427 |                 </div>
428 |                 <p className="font-bold text-slate-800">{ev.school?.name}</p>
429 |                 <p className="text-sm text-slate-500 mt-1">
430 |                   🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
431 |                 </p>
432 |               </div>
433 |             ))}
434 |           </div>
435 |         )}
436 |       </div>
437 |     </div>
438 |   );
439 | }
440 | 
```

### File: apps/frontend/src/pages/Cities.tsx
```tsx
  0 | import React, { useState, useCallback, lazy, Suspense } from "react";
  1 | import { createPortal } from "react-dom";
  2 | import { useSelectedCity } from "../context/CityContext";
  3 | import { useCities, useAddCity } from "../hooks/useApi";
  4 | 
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
 16 | const CitiesSkeleton = () => (
 17 |   <div className="w-full animate-pulse">
 18 |     {/* Мобільний скелетон */}
 19 |     <div className="md:hidden flex flex-col gap-4 mt-4">
 20 |       <div className="h-28 bg-slate-200 rounded-2xl w-full"></div>
 21 |       <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
 22 |       <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
 23 |     </div>
 24 |     {/* Десктопний скелетон */}
 25 |     <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 26 |       {[...Array(3)].map((_, i) => (
 27 |         <div
 28 |           key={i}
 29 |           className="bg-white rounded-2xl shadow-sm border border-slate-100 h-72 overflow-hidden"
 30 |         >
 31 |           <div className="h-44 bg-slate-200 w-full"></div>
 32 |           <div className="p-5 flex flex-col gap-3">
 33 |             <div className="h-6 bg-slate-200 rounded w-1/2"></div>
 34 |             <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
 35 |             <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
 36 |           </div>
 37 |         </div>
 38 |       ))}
 39 |     </div>
 40 |   </div>
 41 | );
 42 | 
 43 | export default function Cities() {
 44 |   const [isModalOpen, setIsModalOpen] = useState(false);
 45 |   const [newCityName, setNewCityName] = useState("");
 46 | 
 47 |   const { selectedCity, setSelectedCity } = useSelectedCity();
 48 |   const { data: cities = [], isLoading: isFetching } = useCities();
 49 |   const addCity = useAddCity();
 50 | 
 51 |   const handleSelectCity = useCallback(
 52 |     (city: any) => {
 53 |       setSelectedCity(city);
 54 |     },
 55 |     [setSelectedCity],
 56 |   );
 57 |   const [userRole] = useState<string | null>(() => {
 58 |     try {
 59 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
 60 |     } catch {
 61 |       return null;
 62 |     }
 63 |   });
 64 |   const handleAddCity = async (e: React.FormEvent) => {
 65 |     e.preventDefault();
 66 |     if (!newCityName.trim()) return;
 67 |     try {
 68 |       await addCity.mutateAsync(newCityName.trim());
 69 |       setNewCityName("");
 70 |       setIsModalOpen(false);
 71 |     } catch {
 72 |       alert("Не вдалося створити місто. Можливо воно вже існує.");
 73 |     }
 74 |   };
 75 | 
 76 |   return (
 77 |     <div
 78 |       className="p-4 md:p-8 bg-slate-50 min-h-screen"
 79 |       style={{ contentVisibility: "auto" }}
 80 |     >
 81 |       {/* Шапка для ПК */}
 82 |       <style>{`
 83 |         @keyframes headerFadeIn {
 84 |           from { opacity: 0; transform: translateY(-10px); }
 85 |           to   { opacity: 1; transform: translateY(0); }
 86 |         }
 87 |         .header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
 88 |         .header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
 89 |       `}</style>
 90 |       <div className="hidden md:flex justify-between items-center mb-8">
 91 |         <h1 className="header-enter text-3xl font-bold text-slate-800">
 92 |           Міста
 93 |         </h1>
 94 |         {userRole === "SUPERADMIN" && (
 95 |           <button
 96 |             onClick={() => setIsModalOpen(true)}
 97 |             className="header-btn-enter bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-all duration-150"
 98 |           >
 99 |             <span className="mr-2">+</span> Додати місто
100 |           </button>
101 |         )}
102 |       </div>
103 | 
104 |       {isFetching ? (
105 |         <CitiesSkeleton />
106 |       ) : (
107 |         /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
108 |         <Suspense fallback={<CitiesSkeleton />}>
109 |           {/* 1. Блок для Мобільних (Шапка + Список) */}
110 |           <div className="md:hidden">
111 |             <CityMobileHeader selectedCity={selectedCity} cities={cities} />
112 |             <CityMobileList
113 |               cities={cities}
114 |               selectedCity={selectedCity}
115 |               onSelectCity={handleSelectCity}
116 |             />
117 |           </div>
118 | 
119 |           {/* 2. Блок для Десктопів (Карусель + Сітка) */}
120 |           <div className="hidden md:block">
121 |             <IssueCarousel />
122 |             <CityDesktopGrid
123 |               cities={cities}
124 |               selectedCity={selectedCity}
125 |               onSelectCity={handleSelectCity}
126 |             />
127 |           </div>
128 |         </Suspense>
129 |       )}
130 | 
131 |       {/* Мобільна плаваюча кнопка FAB */}
132 |       {userRole === "SUPERADMIN" && (
133 |         <button
134 |           onClick={() => setIsModalOpen(true)}
135 |           className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform opacity-0"
136 |           style={{
137 |             animation:
138 |               "fabPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s forwards",
139 |           }}
140 |           aria-label="Додати місто"
141 |         >
142 |           <style>{`
143 |             @keyframes fabPop {
144 |               from { opacity: 0; transform: scale(0.5) translateY(20px); }
145 |               to { opacity: 1; transform: scale(1) translateY(0); }
146 |             }
147 |           `}</style>
148 |           +
149 |         </button>
150 |       )}
151 | 
152 |       {/* Модалка додавання */}
153 |       {isModalOpen &&
154 |         createPortal(
155 |           <div
156 |             className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
157 |             style={{ animation: "fadeIn 0.2s ease-out forwards" }}
158 |           >
159 |             <style>{`
160 |             @keyframes fadeIn {
161 |               from { opacity: 0; }
162 |               to { opacity: 1; }
163 |             }
164 |             @keyframes modalScale {
165 |               from { opacity: 0; transform: scale(0.95) translateY(15px); }
166 |               to { opacity: 1; transform: scale(1) translateY(0); }
167 |             }
168 |           `}</style>
169 | 
170 |             {/* ТУТ БУЛА ПРОБЛЕМА: додано opacity-0 та style з анімацією modalScale */}
171 |             <div
172 |               className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
173 |               style={{ animation: "modalScale 0.3s ease-out forwards" }}
174 |             >
175 |               <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
176 |                 <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
177 |                 <button
178 |                   onClick={() => setIsModalOpen(false)}
179 |                   className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
180 |                 >
181 |                   ✕
182 |                 </button>
183 |               </div>
184 |               <form onSubmit={handleAddCity} className="p-6">
185 |                 <input
186 |                   type="text"
187 |                   value={newCityName}
188 |                   onChange={(e) => setNewCityName(e.target.value)}
189 |                   placeholder="Наприклад: Львів"
190 |                   className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
191 |                   autoFocus
192 |                   required
193 |                 />
194 |                 <div className="flex gap-3">
195 |                   <button
196 |                     type="button"
197 |                     onClick={() => setIsModalOpen(false)}
198 |                     className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
199 |                   >
200 |                     Скасувати
201 |                   </button>
202 |                   <button
203 |                     type="submit"
204 |                     disabled={addCity.isPending}
205 |                     className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
206 |                   >
207 |                     {addCity.isPending ? "Збереження..." : "Зберегти"}
208 |                   </button>
209 |                 </div>
210 |               </form>
211 |             </div>
212 |           </div>,
213 |           document.body,
214 |         )}
215 |     </div>
216 |   );
217 | }
218 | 
```

### File: apps/frontend/src/pages/CityProfile.tsx
```tsx
  0 | import { useState } from "react";
  1 | import { Link, useParams } from "react-router-dom";
  2 | import { lazy, Suspense } from "react";
  3 | const CityAnalytics = lazy(
  4 |   () => import("../components/city-profile/CityAnalytics"),
  5 | );
  6 | import PhoneLink from "../components/PhoneLink";
  7 | import type { Event, Crew, CityProfile as CityProfileType } from "../types";
  8 | import OptimizedImage from "../components/ui/OptimizedImage";
  9 | import { useCity, useCreateCrew, useDeleteCrew } from "../hooks/useCities";
 10 | import { useUsers } from "../hooks/useEmployees";
 11 | 
 12 | type Tab = "events" | "crews" | "analytics";
 13 | 
 14 | export default function CityProfile() {
 15 |   const { id } = useParams();
 16 |   const { data: city, isLoading } = useCity(id);
 17 |   const { data: users = [] } = useUsers();
 18 |   const createCrew = useCreateCrew(id);
 19 |   const deleteCrew = useDeleteCrew(id);
 20 | 
 21 |   const [activeTab, setActiveTab] = useState<Tab>("crews");
 22 |   const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
 23 |   const [isCreateCrewModalOpen, setIsCreateCrewModalOpen] = useState(false);
 24 |   const [crewForm, setCrewForm] = useState({
 25 |     name: "",
 26 |     hostId: "",
 27 |     driverId: "",
 28 |   });
 29 | 
 30 |   const handleCreateCrew = (e: React.FormEvent) => {
 31 |     e.preventDefault();
 32 |     if (!crewForm.hostId || !crewForm.driverId)
 33 |       return alert("Оберіть ведучого та водія!");
 34 |     setIsCreateCrewModalOpen(false);
 35 |     createCrew.mutate(crewForm);
 36 |   };
 37 | 
 38 |   const handleDeleteCrew = (crewId: string) => {
 39 |     if (!window.confirm("Видалити екіпаж?")) return;
 40 |     deleteCrew.mutate(crewId);
 41 |   };
 42 | 
 43 |   if (isLoading)
 44 |     return <div className="p-8 text-slate-500">Завантаження...</div>;
 45 |   if (!city) return <div className="p-8 text-slate-500">Місто не знайдено</div>;
 46 | 
 47 |   const completedEvents: Event[] = city.events || [];
 48 |   const crews: Crew[] = city.crews || [];
 49 |   const manager = city.manager;
 50 | 
 51 |   const busyUserIds = crews.flatMap((c: any) => [c.hostId, c.driverId]);
 52 |   const availableHosts = users.filter(
 53 |     (u) =>
 54 |       u.role === "HOST" &&
 55 |       u.city?.id === city.id &&
 56 |       !busyUserIds.includes(u.id),
 57 |   );
 58 |   const availableDrivers = users.filter(
 59 |     (u) =>
 60 |       u.role === "DRIVER" &&
 61 |       u.city?.id === city.id &&
 62 |       !busyUserIds.includes(u.id),
 63 |   );
 64 | 
 65 |   const totalChildren = completedEvents.reduce(
 66 |     (sum, ev) => sum + (ev.report?.childrenCount || ev.childrenPlanned || 0),
 67 |     0,
 68 |   );
 69 |   const totalRevenue = completedEvents.reduce(
 70 |     (sum, ev) => sum + (ev.report?.totalSum || ev.price || 0),
 71 |     0,
 72 |   );
 73 |   const totalProfit = completedEvents.reduce(
 74 |     (sum, ev) => sum + (ev.report?.remainderSum || 0),
 75 |     0,
 76 |   );
 77 |   const fmt = (n: number) =>
 78 |     new Intl.NumberFormat("uk-UA").format(Math.round(n));
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
 89 |         <Link to="/cities" className="hover:text-blue-600 transition-colors">
 90 |           Міста
 91 |         </Link>
 92 |         <span className="mx-2">›</span>
 93 |         <span className="text-slate-800 font-medium">{city.name}</span>
 94 |       </div>
 95 | 
 96 |       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
 97 |         <div className="flex flex-col md:flex-row md:items-center gap-6">
 98 |           <div className="flex items-center gap-4 min-w-[220px]">
 99 |             <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
100 |               {manager?.name?.charAt(0) ?? "?"}
101 |             </div>
102 |             <div>
103 |               <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
104 |                 Менеджер
105 |               </p>
106 |               <p className="font-bold text-slate-800">{manager?.name ?? "—"}</p>
107 |               <p className="text-sm text-slate-500">
108 |                 <PhoneLink phone={manager?.phone} />
109 |               </p>
110 |             </div>
111 |           </div>
112 |           <div className="hidden md:block w-px h-16 bg-slate-100" />
113 |           <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 sm:gap-8 flex-1">
114 |             <Stat label="Закладів" value={city.schools?.length ?? 0} />
115 |             <Stat label="Проведено подій" value={completedEvents.length} />
116 |             <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
117 |             <Stat label="Виручка" value={`${fmt(totalRevenue)} грн`} />
118 |             <Stat label="Прибуток" value={`${fmt(totalProfit)} грн`} />
119 |           </div>
120 |         </div>
121 |       </div>
122 | 
123 |       <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-6">
124 |         {TABS.map((tab) => (
125 |           <button
126 |             key={tab.key}
127 |             onClick={() => setActiveTab(tab.key)}
128 |             className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
129 |               activeTab === tab.key
130 |                 ? "bg-blue-600 text-white shadow-sm"
131 |                 : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
132 |             }`}
133 |           >
134 |             <span>{tab.icon}</span>{" "}
135 |             <span className="truncate">{tab.label}</span>
136 |           </button>
137 |         ))}
138 |       </div>
139 | 
140 |       {activeTab === "events" && (
141 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
142 |           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
143 |             <h3 className="font-bold text-slate-800">
144 |               Завершені події ({completedEvents.length})
145 |             </h3>
146 |           </div>
147 |           {completedEvents.length === 0 ? (
148 |             <div className="p-12 text-center text-slate-400">
149 |               <p className="text-4xl mb-3">📭</p>
150 |               <p className="font-medium">Завершених подій ще немає</p>
151 |             </div>
152 |           ) : (
153 |             <>
154 |               <div className="md:hidden divide-y divide-slate-50">
155 |                 {completedEvents.map((ev) => (
156 |                   <div
157 |                     key={ev.id}
158 |                     onClick={() => setSelectedReportEvent(ev)}
159 |                     className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
160 |                   >
161 |                     <div className="min-w-0">
162 |                       <p className="font-medium text-blue-600 truncate">
163 |                         {ev.school?.name}
164 |                       </p>
165 |                       <p className="text-xs text-slate-400 mt-0.5">
166 |                         {ev.project} ·{" "}
167 |                         {new Date(ev.date).toLocaleDateString("uk-UA")}
168 |                       </p>
169 |                       <p className="text-xs text-slate-500 mt-1">
170 |                         👶{" "}
171 |                         {ev.report?.childrenCount || ev.childrenPlanned || "—"}{" "}
172 |                         дітей
173 |                       </p>
174 |                     </div>
175 |                     <div className="text-right shrink-0">
176 |                       <p className="font-semibold text-slate-800 text-sm">
177 |                         {fmt(ev.report?.totalSum || ev.price || 0)} грн
178 |                       </p>
179 |                       <p className="text-xs font-medium text-emerald-600 mt-0.5">
180 |                         +{fmt(ev.report?.remainderSum || 0)} грн
181 |                       </p>
182 |                     </div>
183 |                   </div>
184 |                 ))}
185 |               </div>
186 |               <div className="hidden md:block overflow-x-auto">
187 |                 <table className="w-full text-left text-sm">
188 |                   <thead>
189 |                     <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
190 |                       <th className="p-4">Заклад</th>
191 |                       <th className="p-4">Проєкт</th>
192 |                       <th className="p-4">Дата</th>
193 |                       <th className="p-4">Дітей</th>
194 |                       <th className="p-4">Виручка</th>
195 |                       <th className="p-4">Прибуток</th>
196 |                     </tr>
197 |                   </thead>
198 |                   <tbody>
199 |                     {completedEvents.map((ev) => (
200 |                       <tr
201 |                         key={ev.id}
202 |                         onClick={() => setSelectedReportEvent(ev)}
203 |                         className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
204 |                       >
205 |                         <td className="p-4">
206 |                           <span className="font-medium text-blue-600">
207 |                             {ev.school?.name}
208 |                           </span>
209 |                           <p className="text-xs text-slate-400">
210 |                             {ev.school?.type}
211 |                           </p>
212 |                         </td>
213 |                         <td className="p-4 text-slate-700">{ev.project}</td>
214 |                         <td className="p-4 text-slate-600">
215 |                           {new Date(ev.date).toLocaleDateString("uk-UA")}
216 |                         </td>
217 |                         <td className="p-4 font-medium">
218 |                           {ev.report?.childrenCount ||
219 |                             ev.childrenPlanned ||
220 |                             "—"}
221 |                         </td>
222 |                         <td className="p-4 font-medium text-slate-800">
223 |                           {fmt(ev.report?.totalSum || ev.price || 0)} грн
224 |                         </td>
225 |                         <td className="p-4 font-medium text-emerald-600">
226 |                           {fmt(ev.report?.remainderSum || 0)} грн
227 |                         </td>
228 |                       </tr>
229 |                     ))}
230 |                   </tbody>
231 |                 </table>
232 |               </div>
233 |             </>
234 |           )}
235 |         </div>
236 |       )}
237 | 
238 |       {/* Вкладка ЕКІПАЖІ з новим дизайном */}
239 |       {activeTab === "crews" && (
240 |         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
241 |           <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
242 |             <h3 className="text-xl font-bold text-slate-800">
243 |               Екіпажі - {city.name}
244 |             </h3>
245 |             <button
246 |               onClick={() => {
247 |                 setCrewForm({
248 |                   name: `Екіпаж №${crews.length + 1}`,
249 |                   hostId: "",
250 |                   driverId: "",
251 |                 });
252 |                 setIsCreateCrewModalOpen(true);
253 |               }}
254 |               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
255 |             >
256 |               + Додати екіпаж
257 |             </button>
258 |           </div>
259 | 
260 |           {crews.length === 0 ? (
261 |             <div className="p-12 text-center text-slate-400">
262 |               <p className="text-4xl mb-3">🚐</p>
263 |               <p className="font-medium">Екіпажів ще немає</p>
264 |             </div>
265 |           ) : (
266 |             <>
267 |               {/* Мобільний вигляд */}
268 |               <div className="md:hidden divide-y divide-slate-50">
269 |                 {crews.map((crew: any) => {
270 |                   const hostObj = users.find((u) => u.id === crew.hostId);
271 |                   const driverObj = users.find((u) => u.id === crew.driverId);
272 |                   const carName = crew.car
273 |                     ? crew.car.split("(")[0].trim()
274 |                     : "—";
275 |                   const carPlate = crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
276 |                   const eventsCount =
277 |                     city.events?.filter((e: any) => e.crewId === crew.id)
278 |                       .length || 0;
279 | 
280 |                   return (
281 |                     <div key={crew.id} className="p-4">
282 |                       <div className="flex justify-between items-start mb-3">
283 |                         <div className="flex items-center gap-3">
284 |                           <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-200">
285 |                             <OptimizedImage
286 |                               src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
287 |                               alt="van"
288 |                               className="w-full h-full object-cover"
289 |                             />
290 |                           </div>
291 |                           <p className="font-bold text-slate-800">
292 |                             {crew.name}
293 |                           </p>
294 |                         </div>
295 |                         <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded text-xs font-medium">
296 |                           Активний
297 |                         </span>
298 |                       </div>
299 | 
300 |                       <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
301 |                         <div>
302 |                           <p className="font-medium text-slate-800">
303 |                             {hostObj?.name || crew.host?.name || "—"}
304 |                           </p>
305 |                           <p className="text-slate-500 mt-0.5">
306 |                             {hostObj?.phone || "—"}
307 |                           </p>
308 |                         </div>
309 |                         <div>
310 |                           <p className="font-medium text-slate-800">
311 |                             {driverObj?.name || crew.driver?.name || "—"}
312 |                           </p>
313 |                           <p className="text-slate-500 mt-0.5">
314 |                             {driverObj?.phone || "—"}
315 |                           </p>
316 |                         </div>
317 |                         <div>
318 |                           <p className="font-medium text-slate-800">
319 |                             {carName}
320 |                           </p>
321 |                           {carPlate && (
322 |                             <p className="text-slate-500 mt-0.5">{carPlate}</p>
323 |                           )}
324 |                         </div>
325 |                         <div>
326 |                           <p className="text-slate-500">
327 |                             Подій:{" "}
328 |                             <span className="font-bold text-slate-800">
329 |                               {eventsCount}
330 |                             </span>
331 |                           </p>
332 |                         </div>
333 |                       </div>
334 |                       <button
335 |                         onClick={() => handleDeleteCrew(crew.id)}
336 |                         className="w-full mt-4 py-2 border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium transition-colors"
337 |                       >
338 |                         Видалити екіпаж
339 |                       </button>
340 |                     </div>
341 |                   );
342 |                 })}
343 |               </div>
344 | 
345 |               {/* Десктоп таблиця як на дизайні */}
346 |               <div className="hidden md:block overflow-x-auto">
347 |                 <table className="w-full text-left text-sm">
348 |                   <thead>
349 |                     <tr className="bg-white border-b border-slate-100 text-slate-800 font-bold">
350 |                       <th className="p-5">Екіпаж</th>
351 |                       <th className="p-5">Ведучий</th>
352 |                       <th className="p-5">Водій</th>
353 |                       <th className="p-5">Авто</th>
354 |                       <th className="p-5">Статус</th>
355 |                       <th className="p-5 text-center">Подій (міс.)</th>
356 |                       <th className="p-5 text-center">Дія</th>
357 |                     </tr>
358 |                   </thead>
359 |                   <tbody>
360 |                     {crews.map((crew: any) => {
361 |                       const hostObj = users.find((u) => u.id === crew.hostId);
362 |                       const driverObj = users.find(
363 |                         (u) => u.id === crew.driverId,
364 |                       );
365 | 
366 |                       const carName = crew.car
367 |                         ? crew.car.split("(")[0].trim()
368 |                         : "—";
369 |                       const carPlate =
370 |                         crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
371 | 
372 |                       const eventsCount =
373 |                         city.events?.filter((e: any) => e.crewId === crew.id)
374 |                           .length || 0;
375 | 
376 |                       return (
377 |                         <tr
378 |                           key={crew.id}
379 |                           className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
380 |                         >
381 |                           <td className="p-5">
382 |                             <div className="flex items-center gap-3">
383 |                               {/* Універсальна фотографія буса */}
384 |                               <div className="w-[60px] h-[40px] rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-sm">
385 |                                 <OptimizedImage
386 |                                   src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
387 |                                   alt="van"
388 |                                   className="w-full h-full object-cover"
389 |                                 />
390 |                               </div>
391 |                               <span className="font-bold text-slate-800">
392 |                                 {crew.name}
393 |                               </span>
394 |                             </div>
395 |                           </td>
396 |                           <td className="p-5">
397 |                             <div className="font-medium text-slate-800">
398 |                               {hostObj?.name || crew.host?.name || "—"}
399 |                             </div>
400 |                             <div className="text-xs text-slate-500 mt-1 tracking-wide">
401 |                               {hostObj?.phone || "—"}
402 |                             </div>
403 |                           </td>
404 |                           <td className="p-5">
405 |                             <div className="font-medium text-slate-800">
406 |                               {driverObj?.name || crew.driver?.name || "—"}
407 |                             </div>
408 |                             <div className="text-xs text-slate-500 mt-1 tracking-wide">
409 |                               {driverObj?.phone || "—"}
410 |                             </div>
411 |                           </td>
412 |                           <td className="p-5">
413 |                             <div className="font-medium text-slate-600">
414 |                               {carName}
415 |                             </div>
416 |                             {carPlate ? (
417 |                               <div className="text-xs text-slate-500 mt-1 tracking-wider">
418 |                                 {carPlate}
419 |                               </div>
420 |                             ) : (
421 |                               <div className="text-xs text-slate-400 mt-1">
422 |                                 —
423 |                               </div>
424 |                             )}
425 |                           </td>
426 |                           <td className="p-5">
427 |                             <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
428 |                               Активний
429 |                             </span>
430 |                           </td>
431 |                           <td className="p-5 text-center font-bold text-slate-800 text-base">
432 |                             {eventsCount}
433 |                           </td>
434 |                           <td className="p-5 text-center">
435 |                             <button
436 |                               onClick={() => handleDeleteCrew(crew.id)}
437 |                               className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50"
438 |                               title="Видалити екіпаж"
439 |                             >
440 |                               🗑
441 |                             </button>
442 |                           </td>
443 |                         </tr>
444 |                       );
445 |                     })}
446 |                   </tbody>
447 |                 </table>
448 |               </div>
449 |             </>
450 |           )}
451 |         </div>
452 |       )}
453 | 
454 |       {activeTab === "analytics" && (
455 |         <Suspense
456 |           fallback={
457 |             <div className="bg-white rounded-2xl h-64 animate-pulse border border-slate-100" />
458 |           }
459 |         >
460 |           <CityAnalytics events={completedEvents} />
461 |         </Suspense>
462 |       )}
463 | 
464 |       {/* Модалка створення екіпажу */}
465 |       {isCreateCrewModalOpen && (
466 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
467 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
468 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50">
469 |               <h3 className="text-xl font-bold text-slate-800">Новий екіпаж</h3>
470 |               <button
471 |                 onClick={() => setIsCreateCrewModalOpen(false)}
472 |                 className="text-slate-400 hover:text-slate-600 text-lg leading-none"
473 |               >
474 |                 ✕
475 |               </button>
476 |             </div>
477 |             <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
478 |               <div>
479 |                 <label className="block text-sm font-medium text-slate-700 mb-1">
480 |                   Назва екіпажу
481 |                 </label>
482 |                 <input
483 |                   type="text"
484 |                   value={crewForm.name}
485 |                   onChange={(e) =>
486 |                     setCrewForm({ ...crewForm, name: e.target.value })
487 |                   }
488 |                   className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
489 |                   required
490 |                 />
491 |               </div>
492 |               <div>
493 |                 <label className="block text-sm font-medium text-slate-700 mb-1">
494 |                   Ведучий
495 |                 </label>
496 |                 <select
497 |                   value={crewForm.hostId}
498 |                   onChange={(e) =>
499 |                     setCrewForm({ ...crewForm, hostId: e.target.value })
500 |                   }
501 |                   required
502 |                   className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
503 |                 >
504 |                   <option value="" disabled>
505 |                     Оберіть ведучого
506 |                   </option>
507 |                   {availableHosts.map((h) => (
508 |                     <option key={h.id} value={h.id}>
509 |                       {h.name}
510 |                     </option>
511 |                   ))}
512 |                 </select>
513 |                 <p className="text-xs text-emerald-600 mt-1">
514 |                   ✓ Доступно: {availableHosts.length} вільних
515 |                 </p>
516 |               </div>
517 |               <div>
518 |                 <label className="block text-sm font-medium text-slate-700 mb-1">
519 |                   Водій
520 |                 </label>
521 |                 <select
522 |                   value={crewForm.driverId}
523 |                   onChange={(e) =>
524 |                     setCrewForm({ ...crewForm, driverId: e.target.value })
525 |                   }
526 |                   required
527 |                   className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
528 |                 >
529 |                   <option value="" disabled>
530 |                     Оберіть водія
531 |                   </option>
532 |                   {availableDrivers.map((d) => (
533 |                     <option key={d.id} value={d.id}>
534 |                       {d.name} {d.car ? `(🚗 ${d.car})` : ""}
535 |                     </option>
536 |                   ))}
537 |                 </select>
538 |                 <p className="text-xs text-emerald-600 mt-1">
539 |                   ✓ Доступно: {availableDrivers.length} вільних
540 |                 </p>
541 |               </div>
542 |               <div className="flex gap-3 pt-2 mt-4">
543 |                 <button
544 |                   type="button"
545 |                   onClick={() => setIsCreateCrewModalOpen(false)}
546 |                   className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors"
547 |                 >
548 |                   Скасувати
549 |                 </button>
550 |                 <button
551 |                   type="submit"
552 |                   className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
553 |                 >
554 |                   Створити
555 |                 </button>
556 |               </div>
557 |             </form>
558 |           </div>
559 |         </div>
560 |       )}
561 | 
562 |       {/* Модальне вікно Звіту */}
563 |       <CompletedEventModal
564 |         isOpen={!!selectedReportEvent}
565 |         onClose={() => setSelectedReportEvent(null)}
566 |         event={selectedReportEvent}
567 |       />
568 |     </div>
569 |   );
570 | }
571 | 
572 | function Stat({ label, value }: { label: string; value: string | number }) {
573 |   return (
574 |     <div>
575 |       <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
576 |       <p className="text-2xl font-bold text-slate-800">{value}</p>
577 |     </div>
578 |   );
579 | }
580 | 
581 | function CompletedEventModal({
582 |   isOpen,
583 |   onClose,
584 |   event,
585 | }: {
586 |   isOpen: boolean;
587 |   onClose: () => void;
588 |   event: any;
589 | }) {
590 |   if (!isOpen || !event) return null;
591 |   const fmt = (n: number) =>
592 |     new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
593 |   const report = event.report;
594 | 
595 |   return (
596 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
597 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
598 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
599 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
600 |           <div>
601 |             <h3 className="text-xl font-bold text-slate-800">
602 |               Звіт: {event.project}
603 |             </h3>
604 |             <p className="text-sm text-slate-500 mt-1">
605 |               {event.school?.name} ·{" "}
606 |               {new Date(event.date).toLocaleDateString("uk-UA")}
607 |             </p>
608 |           </div>
609 |           <button
610 |             onClick={onClose}
611 |             className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
612 |           >
613 |             ✕
614 |           </button>
615 |         </div>
616 |         <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
617 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
618 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
619 |               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
620 |                 <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
621 |                   📊
622 |                 </span>
623 |                 Результати
624 |               </h4>
625 |               <div className="space-y-3 text-sm">
626 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
627 |                   <span className="text-slate-500">Дітей (факт):</span>
628 |                   <span className="font-bold">
629 |                     {report?.childrenCount || 0}
630 |                   </span>
631 |                 </div>
632 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
633 |                   <span className="text-slate-500">Класів:</span>
634 |                   <span className="font-medium">
635 |                     {report?.classesCount || 0}
636 |                   </span>
637 |                 </div>
638 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
639 |                   <span className="text-slate-500">Пільговиків:</span>
640 |                   <span className="font-medium">
641 |                     {report?.privilegedCount || 0}
642 |                   </span>
643 |                 </div>
644 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
645 |                   <span className="text-slate-500">Сеансів:</span>
646 |                   <span className="font-medium">
647 |                     {report?.showingsCount || 0}
648 |                   </span>
649 |                 </div>
650 |                 <div className="flex justify-between pb-1">
651 |                   <span className="text-slate-500">Оцінка:</span>
652 |                   <span className="font-bold text-amber-500">
653 |                     ⭐ {report?.rating || 0}/10
654 |                   </span>
655 |                 </div>
656 |               </div>
657 |             </div>
658 |             <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
659 |               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
660 |                 <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
661 |                   💰
662 |                 </span>
663 |                 Фінанси
664 |               </h4>
665 |               <div className="space-y-3 text-sm">
666 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
667 |                   <span className="text-slate-500">Загальна виручка:</span>
668 |                   <span className="font-bold">{fmt(report?.totalSum)} грн</span>
669 |                 </div>
670 |                 <div className="flex justify-between border-b border-slate-50 pb-2">
671 |                   <span className="text-slate-500">На заклад (20%):</span>
672 |                   <span className="font-medium text-rose-500">
673 |                     − {fmt(report?.schoolSum)} грн
674 |                   </span>
675 |                 </div>
676 |                 {Array.isArray(report?.expenses) &&
677 |                   report.expenses.length > 0 && (
678 |                     <div className="py-2 border-b border-slate-50">
679 |                       <span className="text-slate-500 block mb-2">
680 |                         Додаткові витрати:
681 |                       </span>
682 |                       {report.expenses.map((exp: any, i: number) => (
683 |                         <div
684 |                           key={i}
685 |                           className="flex justify-between text-xs mb-1 pl-2"
686 |                         >
687 |                           <span className="text-slate-400">
688 |                             — {exp.name || exp.category}
689 |                           </span>
690 |                           <span className="text-rose-500 font-medium">
691 |                             − {fmt(exp.amount)} грн
692 |                           </span>
693 |                         </div>
694 |                       ))}
695 |                     </div>
696 |                   )}
697 |                 <div className="flex justify-between pt-1">
698 |                   <span className="font-bold text-slate-800">
699 |                     Чистий прибуток:
700 |                   </span>
701 |                   <span className="font-bold text-emerald-600 text-base">
702 |                     {fmt(report?.remainderSum)} грн
703 |                   </span>
704 |                 </div>
705 |               </div>
706 |             </div>
707 |           </div>
708 |           <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
709 |             <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
710 |               <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
711 |                 ⏳
712 |               </span>
713 |               Історія пайплайну
714 |             </h4>
715 |             {!event.history || event.history.length === 0 ? (
716 |               <p className="text-sm text-slate-400 text-center py-4">
717 |                 Історія порожня.
718 |               </p>
719 |             ) : (
720 |               <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
721 |                 {[...event.history]
722 |                   .sort(
723 |                     (a, b) =>
724 |                       new Date(a.createdAt).getTime() -
725 |                       new Date(b.createdAt).getTime(),
726 |                   )
727 |                   .map((item: any) => (
728 |                     <div key={item.id} className="relative pl-8 text-sm">
729 |                       <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
730 |                       <p className="font-semibold text-slate-800">
731 |                         {item.action}
732 |                       </p>
733 |                       <p className="text-[11px] text-slate-400 mt-0.5">
734 |                         {new Date(item.createdAt).toLocaleString("uk-UA", {
735 |                           day: "2-digit",
736 |                           month: "2-digit",
737 |                           hour: "2-digit",
738 |                           minute: "2-digit",
739 |                         })}{" "}
740 |                         · 👤 {item.userName}
741 |                       </p>
742 |                       {item.comment && (
743 |                         <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">
744 |                           {item.comment}
745 |                         </div>
746 |                       )}
747 |                     </div>
748 |                   ))}
749 |               </div>
750 |             )}
751 |           </div>
752 |         </div>
753 |       </div>
754 |     </div>
755 |   );
756 | }
757 | 
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
129 | 
130 | export default function Dashboard() {
131 |   const { selectedCity } = useSelectedCity();
132 |   const { user } = useAuth();
133 | 
134 |   const isSuperAdmin = user?.role === "SUPERADMIN";
135 | 
136 |   const { data: summary, isLoading } = useQuery<DashboardSummary>({
137 |     queryKey: ["dashboardSummary", selectedCity.id],
138 |     queryFn: async () => {
139 |       const params = selectedCity.id ? `?cityId=${selectedCity.id}` : "";
140 |       const res = await api.get(`/dashboard/summary${params}`);
141 |       return res.data;
142 |     },
143 |     enabled: Boolean(selectedCity.id || isSuperAdmin),
144 |   });
145 | 
146 |   if (!selectedCity.id && !isSuperAdmin) {
147 |     return (
148 |       <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
149 |         <div className="mb-6">
150 |           <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
151 |           <p className="text-sm text-slate-500 mt-1">📍 Оберіть місто</p>
152 |         </div>
153 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
154 |           <p className="text-4xl mb-3">📍</p>
155 |           <p className="font-semibold text-slate-700 mb-2">Місто не обрано</p>
156 |           <p className="text-sm text-slate-500 mb-4">
157 |             Оберіть місто у розділі «Міста», щоб бачити активність
158 |           </p>
159 |           <Link
160 |             to="/cities"
161 |             className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
162 |           >
163 |             Перейти до міст
164 |           </Link>
165 |         </div>
166 |       </div>
167 |     );
168 |   }
169 | 
170 |   return (
171 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
172 |       {/* Шапка */}
173 |       <div className="mb-6">
174 |         <h1 className="text-2xl font-bold text-slate-800">
175 |           Дашборд
176 |           {selectedCity.name && (
177 |             <span className="ml-2 text-base font-normal text-blue-500">
178 |               · {selectedCity.name}
179 |             </span>
180 |           )}
181 |           {isSuperAdmin && !selectedCity.name && (
182 |             <span className="ml-2 text-base font-normal text-purple-500">
183 |               · Усі міста
184 |             </span>
185 |           )}
186 |         </h1>
187 |         <p className="text-xs text-slate-400 mt-1">
188 |           {new Date().toLocaleDateString("uk-UA", {
189 |             weekday: "long",
190 |             day: "numeric",
191 |             month: "long",
192 |             year: "numeric",
193 |           })}
194 |         </p>
195 |       </div>
196 | 
197 |       {isLoading ? (
198 |         <DashboardSkeleton isSuperAdmin={isSuperAdmin} />
199 |       ) : summary ? (
200 |         <div className="flex flex-col gap-6">
201 |           {/* ── ЗОНА ДІЇ ── */}
202 |           <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse border border-slate-100" />}>
203 |             <IssueCarousel />
204 |           </Suspense>
205 | 
206 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
207 |             <Suspense fallback={<SkeletonCard />}>
208 |               <TodayEvents events={summary.todayEvents} />
209 |             </Suspense>
210 |             <Suspense fallback={<SkeletonCard />}>
211 |               <StaleSchools schools={summary.staleSchools} />
212 |             </Suspense>
213 |             <Suspense fallback={<SkeletonCard />}>
214 |               <UpcomingEvents events={summary.upcomingEvents} />
215 |             </Suspense>
216 |           </div>
217 | 
218 |           <hr className="border-slate-200" />
219 | 
220 |           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
221 |             <Suspense fallback={<SkeletonCard />}>
222 |               <MonthlyKpi kpi={summary.monthlyKpi} />
223 |             </Suspense>
224 |             <Suspense fallback={<SkeletonCard />}>
225 |               <FunnelBar funnel={summary.funnel} />
226 |             </Suspense>
227 |           </div>
228 | 
229 |           <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
230 |             <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
231 |               <ActivityFeed items={summary.activityFeed} />
232 |             </Suspense>
233 |             {isSuperAdmin && summary.citiesStats.length > 0 && (
234 |               <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
235 |                 <CitiesTable rows={summary.citiesStats} />
236 |               </Suspense>
237 |             )}
238 |           </div>
239 |         </div>
240 |       ) : (
241 |         <div className="text-center py-20 text-slate-400 text-sm">
242 |           Не вдалося завантажити дані
243 |         </div>
244 |       )}
245 |     </div>
246 |   );
247 | }
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
180 |     setIsModalOpen(false); 
181 |     if (editingUser) {
182 |       const { password, ...rest } = form;
183 |       const payload = password.trim() ? form : rest;
184 |       updateUser.mutate({ id: editingUser.id, form: payload });
185 |     } else {
186 |       createUser.mutate(form);
187 |     }
188 |   };
189 | 
190 |   const handleDelete = async (id: string, name: string) => {
191 |     if (!window.confirm(`Видалити користувача "${name}"?`)) return;
192 |     try {
193 |       await deleteUser.mutateAsync(id);
194 |     } catch (e) {
195 |       alert("Помилка видалення");
196 |     }
197 |   };
198 | 
199 |   const handleCreateProject = (e: React.FormEvent) => {
200 |     e.preventDefault();
201 |     if (!projectForm.name.trim()) return;
202 |     setIsProjectModalOpen(false);
203 |     setProjectForm({ name: "", color: "blue" });
204 |     createProject.mutate(projectForm);
205 |   };
206 | 
207 |   const handleDeleteProject = async (id: string, name: string) => {
208 |     if (
209 |       !window.confirm(
210 |         `Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`,
211 |       )
212 |     )
213 |       return;
214 |     try {
215 |       await deleteProject.mutateAsync(id);
216 |     } catch (e) {
217 |       alert("Помилка видалення");
218 |     }
219 |   };
220 | 
221 |   if (isLoading) return <EmployeesSkeleton />;
222 | 
223 |   return (
224 |     <motion.div
225 |       initial={{ opacity: 0, y: 8 }}
226 |       animate={{ opacity: 1, y: 0 }}
227 |       transition={{ duration: 0.35, ease: "easeOut" }}
228 |       className="p-4 md:p-8 h-full"
229 |     >
230 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
231 |         <motion.div
232 |           initial={{ opacity: 0, y: -10 }}
233 |           animate={{ opacity: 1, y: 0 }}
234 |           transition={{ duration: 0.4, ease: "easeOut" }}
235 |         >
236 |           <h1 className="text-2xl font-bold text-slate-800">
237 |             Акаунти та Проєкти{" "}
238 |             {selectedCity.id && (
239 |               <span className="ml-2 text-base font-normal text-blue-500">
240 |                 · {selectedCity.name}
241 |               </span>
242 |             )}
243 |           </h1>
244 |           <p className="text-sm text-slate-400 mt-1">
245 |             Керування доступами, працівниками та видами подій
246 |           </p>
247 |         </motion.div>
248 |         {isSuperAdmin && (
249 |           <motion.button
250 |             initial={{ opacity: 0, y: -10 }}
251 |             animate={{ opacity: 1, y: 0 }}
252 |             transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
253 |             whileTap={{ scale: 0.97 }}
254 |             onClick={() => handleOpenModal()}
255 |             className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 w-full sm:w-auto"
256 |           >
257 |             + Створити користувача
258 |           </motion.button>
259 |         )}
260 |       </div>
261 | 
262 |       <div className="space-y-8">
263 |         {grouped.map(({ role, label, items }, gi) => (
264 |           <motion.div
265 |             key={role}
266 |             initial={{ opacity: 0, y: 15 }}
267 |             animate={{ opacity: 1, y: 0 }}
268 |             transition={{ duration: 0.3, delay: gi * 0.06 }}
269 |           >
270 |             <div className={`flex items-center gap-3 mb-4`}>
271 |               <div
272 |                 className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}
273 |               ></div>
274 |               <h2 className="text-lg font-bold text-slate-700">{label}</h2>
275 |               <motion.span
276 |                 key={items.length}
277 |                 initial={{ scale: 0.7, opacity: 0 }}
278 |                 animate={{ scale: 1, opacity: 1 }}
279 |                 transition={{ duration: 0.2 }}
280 |                 className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
281 |               >
282 |                 {items.length}
283 |               </motion.span>
284 |             </div>
285 |             {items.length === 0 ? (
286 |               <motion.div
287 |                 initial={{ opacity: 0, scale: 0.97 }}
288 |                 animate={{ opacity: 1, scale: 1 }}
289 |                 transition={{ duration: 0.25 }}
290 |                 className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm"
291 |               >
292 |                 Немає {label.toLowerCase()}ів
293 |               </motion.div>
294 |             ) : (
295 |               <motion.div
296 |                 whileHover={{
297 |                   y: -2,
298 |                   boxShadow: "0 8px 24px -4px rgba(0,0,0,0.08)",
299 |                 }}
300 |                 transition={{ duration: 0.2 }}
301 |                 className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
302 |               >
303 |                 <table className="w-full text-left">
304 |                   <thead>
305 |                     <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
306 |                       <th className="px-5 py-3">ПІБ</th>
307 |                       <th className="px-5 py-3">Телефон</th>
308 |                       <th className="px-5 py-3">Пошта / Логін</th>
309 |                       <th className="px-5 py-3">Місто</th>
310 |                       <th className="px-5 py-3 text-center">Дії</th>
311 |                     </tr>
312 |                   </thead>
313 |                   <tbody>
314 |                     <AnimatePresence initial={false}>
315 |                       {items.map((u, ri) => (
316 |                         <motion.tr
317 |                           key={u.id}
318 |                           initial={{ opacity: 0 }}
319 |                           animate={{ opacity: 1 }}
320 |                           exit={{ opacity: 0, height: 0 }}
321 |                           transition={{ duration: 0.2, delay: ri * 0.04 }}
322 |                           className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
323 |                         >
324 |                           <td className="px-5 py-4">
325 |                             <div className="flex items-center gap-3">
326 |                               <motion.div
327 |                                 initial={{ scale: 0.8, opacity: 0 }}
328 |                                 animate={{ scale: 1, opacity: 1 }}
329 |                                 transition={{ duration: 0.2, delay: 0.05 }}
330 |                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
331 |                               >
332 |                                 {u.name.charAt(0)}
333 |                               </motion.div>
334 |                               <span className="font-medium text-slate-800">
335 |                                 {u.name}
336 |                               </span>
337 |                             </div>
338 |                           </td>
339 |                           <td className="px-5 py-4 text-slate-600 text-sm">
340 |                             <PhoneLink phone={u.phone} />
341 |                             {u.car && (
342 |                               <p className="text-xs text-emerald-600 font-medium mt-1">
343 |                                 🚗 {u.car}
344 |                               </p>
345 |                             )}
346 |                           </td>
347 |                           <td className="px-5 py-4 text-slate-600 text-sm font-medium">
348 |                             {u.email}
349 |                           </td>
350 |                           <td className="px-5 py-4">
351 |                             <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
352 |                               📍 {u.city?.name || "Всі міста"}
353 |                             </span>
354 |                           </td>
355 |                           <td className="px-5 py-4 text-center">
356 |                             {isSuperAdmin && (
357 |                               <>
358 |                                 <motion.button
359 |                                   whileTap={{ scale: 0.93 }}
360 |                                   onClick={() => handleOpenModal(u)}
361 |                                   className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg mr-2 transition-colors"
362 |                                 >
363 |                                   ✏️
364 |                                 </motion.button>
365 |                                 <motion.button
366 |                                   whileTap={{ scale: 0.93 }}
367 |                                   onClick={() => handleDelete(u.id, u.name)}
368 |                                   className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
369 |                                 >
370 |                                   🗑
371 |                                 </motion.button>
372 |                               </>
373 |                             )}
374 |                           </td>
375 |                         </motion.tr>
376 |                       ))}
377 |                     </AnimatePresence>
378 |                   </tbody>
379 |                 </table>
380 |               </motion.div>
381 |             )}
382 |           </motion.div>
383 |         ))}
384 |       </div>
385 | 
386 |       {/* --- СЕКЦІЯ ПРОЄКТІВ (ВИДІВ ПОДІЙ) --- */}
387 |       <div className="mt-16 border-t border-slate-200 pt-10">
388 |         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
389 |           <div>
390 |             <h2 className="text-2xl font-bold text-slate-800">
391 |               Види подій (Проєкти)
392 |             </h2>
393 |             <p className="text-sm text-slate-400 mt-1">
394 |               Ці проєкти відображатимуться у випадаючому списку при створенні
395 |               події
396 |             </p>
397 |           </div>
398 |           {isSuperAdmin && (
399 |             <button
400 |               onClick={() => setIsProjectModalOpen(true)}
401 |               className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto"
402 |             >
403 |               + Створити вид події
404 |             </button>
405 |           )}
406 |         </div>
407 | 
408 |         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
409 |           {projects.map((p, pi) => (
410 |             <motion.div
411 |               key={p.id}
412 |               initial={{ opacity: 0, y: 8 }}
413 |               animate={{ opacity: 1, y: 0 }}
414 |               transition={{ duration: 0.25, delay: pi * 0.05 }}
415 |               whileHover={{
416 |                 y: -3,
417 |                 boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
418 |               }}
419 |               className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default"
420 |             >
421 |               <div className="flex items-center gap-3">
422 |                 <motion.div
423 |                   whileHover={{ scale: 1.3 }}
424 |                   transition={{ duration: 0.15 }}
425 |                   className={`w-4 h-4 rounded-full ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm`}
426 |                 />
427 |                 <span className="font-bold text-slate-800">{p.name}</span>
428 |               </div>
429 |               {isSuperAdmin && (
430 |                 <button
431 |                   onClick={() => handleDeleteProject(p.id, p.name)}
432 |                   className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2"
433 |                   title="Видалити"
434 |                 >
435 |                   🗑
436 |                 </button>
437 |               )}
438 |             </motion.div>
439 |           ))}
440 |           {projects.length === 0 && (
441 |             <div className="col-span-full text-center py-10 text-slate-400">
442 |               Ви ще не додали жодного виду події
443 |             </div>
444 |           )}
445 |         </div>
446 |       </div>
447 | 
448 |       {/* Модалки Користувача і Проєктів */}
449 |       {isProjectModalOpen && (
450 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
451 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
452 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
453 |               <h3 className="text-xl font-bold text-slate-800">
454 |                 Новий вид події
455 |               </h3>
456 |               <button
457 |                 onClick={() => setIsProjectModalOpen(false)}
458 |                 className="text-slate-400 text-xl leading-none p-2 -mr-2"
459 |               >
460 |                 ✕
461 |               </button>
462 |             </div>
463 |             <form onSubmit={handleCreateProject} className="p-6">
464 |               <label className="block text-sm font-medium text-slate-700 mb-1.5">
465 |                 Назва
466 |               </label>
467 |               <input
468 |                 type="text"
469 |                 value={projectForm.name}
470 |                 onChange={(e) =>
471 |                   setProjectForm({ ...projectForm, name: e.target.value })
472 |                 }
473 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
474 |                 required
475 |                 placeholder="Наприклад: Шоу мильних бульбашок"
476 |               />
477 |               <label className="block text-sm font-medium text-slate-700 mb-3">
478 |                 Колір для календаря
479 |               </label>
480 |               <div className="flex gap-4 mb-8">
481 |                 {Object.keys(PROJECT_COLORS).map((c) => (
482 |                   <button
483 |                     type="button"
484 |                     key={c}
485 |                     onClick={() => setProjectForm({ ...projectForm, color: c })}
486 |                     className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${projectForm.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
487 |                   />
488 |                 ))}
489 |               </div>
490 |               <div className="flex gap-3">
491 |                 <button
492 |                   type="button"
493 |                   onClick={() => setIsProjectModalOpen(false)}
494 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
495 |                 >
496 |                   Скасувати
497 |                 </button>
498 |                 <button
499 |                   type="submit"
500 |                   className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
501 |                 >
502 |                   Зберегти
503 |                 </button>
504 |               </div>
505 |             </form>
506 |           </div>
507 |         </div>
508 |       )}
509 | 
510 |       {/* Ваша стара модалка Користувача */}
511 |       {isModalOpen && (
512 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
513 |           {/* Ваш існуючий код модалки працівника... Для стислості я зберіг базові поля */}
514 |           <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col">
515 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
516 |               <h3 className="text-xl font-bold">
517 |                 {editingUser ? "Редагувати" : "Новий користувач"}
518 |               </h3>
519 |               <button
520 |                 onClick={() => setIsModalOpen(false)}
521 |                 className="text-slate-400 text-xl p-2 -mr-2"
522 |               >
523 |                 ✕
524 |               </button>
525 |             </div>
526 |             <form
527 |               onSubmit={handleSubmit}
528 |               className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
529 |             >
530 |               <input
531 |                 type="text"
532 |                 value={form.fullName}
533 |                 onChange={(e) => setForm({ ...form, fullName: e.target.value })}
534 |                 required
535 |                 placeholder="ПІБ"
536 |                 className="w-full p-2.5 border rounded-lg"
537 |               />
538 |               <div className="grid grid-cols-2 gap-4">
539 |                 <input
540 |                   type="email"
541 |                   value={form.email}
542 |                   onChange={(e) => setForm({ ...form, email: e.target.value })}
543 |                   required
544 |                   placeholder="Пошта"
545 |                   className="w-full p-2.5 border rounded-lg"
546 |                 />
547 |                 <input
548 |                   type="password"
549 |                   value={form.password}
550 |                   onChange={(e) =>
551 |                     setForm({ ...form, password: e.target.value })
552 |                   }
553 |                   required={!editingUser}
554 |                   placeholder="Пароль"
555 |                   className="w-full p-2.5 border rounded-lg"
556 |                 />
557 |               </div>
558 |               <div className="grid grid-cols-2 gap-4">
559 |                 <input
560 |                   type="tel"
561 |                   value={form.phone}
562 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
563 |                   placeholder="Телефон"
564 |                   className="w-full p-2.5 border rounded-lg"
565 |                 />
566 |                 <input
567 |                   type="text"
568 |                   value={form.telegramId}
569 |                   onChange={(e) =>
570 |                     setForm({ ...form, telegramId: e.target.value })
571 |                   }
572 |                   placeholder="Telegram ID або @username"
573 |                   className="w-full p-2.5 border rounded-lg"
574 |                 />
575 |               </div>
576 |               <div className="grid grid-cols-2 gap-4">
577 |                 <select
578 |                   value={form.role}
579 |                   onChange={(e) =>
580 |                     setForm({ ...form, role: e.target.value as Role })
581 |                   }
582 |                   className="w-full p-2.5 border rounded-lg"
583 |                 >
584 |                   <option value="MANAGER">Менеджер</option>
585 |                   <option value="DRIVER">Водій</option>
586 |                   <option value="HOST">Ведучий</option>
587 |                   <option value="SUPERADMIN">Суперадмін</option>
588 |                 </select>
589 |                 <select
590 |                   value={form.cityId}
591 |                   onChange={(e) => setForm({ ...form, cityId: e.target.value })}
592 |                   className="w-full p-2.5 border rounded-lg"
593 |                 >
594 |                   <option value="">Всі міста</option>
595 |                   {cities.map((c) => (
596 |                     <option key={c.id} value={c.id}>
597 |                       {c.name}
598 |                     </option>
599 |                   ))}
600 |                 </select>
601 |               </div>
602 |               {form.role === "DRIVER" && (
603 |                 <input
604 |                   type="text"
605 |                   value={form.car || ""}
606 |                   onChange={(e) => setForm({ ...form, car: e.target.value })}
607 |                   placeholder="Автомобіль (напр. Renault Trafic)"
608 |                   className="w-full p-2.5 border rounded-lg"
609 |                 />
610 |               )}
611 |               <div className="flex gap-3 mt-2">
612 |                 <button
613 |                   type="button"
614 |                   onClick={() => setIsModalOpen(false)}
615 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
616 |                 >
617 |                   Скасувати
618 |                 </button>
619 |                 <button
620 |                   type="submit"
621 |                   disabled={isSubmitting}
622 |                   className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
623 |                 >
624 |                   Зберегти
625 |                 </button>
626 |               </div>
627 |             </form>
628 |           </div>
629 |         </div>
630 |       )}
631 |     </motion.div>
632 |   );
633 | }
634 | 
```

### File: apps/frontend/src/pages/EventReport.tsx
```tsx
  0 | import type { ReactNode } from "react";
  1 | import { Link, useParams } from "react-router-dom";
  2 | 
  3 | import { useEventFull } from "../hooks/useSchoolProfile";
  4 | import AddressLink from "../components/AddressLink";
  5 | import { formatCurrency } from "../utils/formatCurrency";
  6 | 
  7 | export default function EventReport() {
  8 |   const { eventId } = useParams();
  9 |   const { data: event, isLoading, isError } = useEventFull(eventId);
 10 | 
 11 |   if (isLoading)
 12 |     return <div className="p-8 text-slate-500">Завантаження...</div>;
 13 |   if (isError || !event)
 14 |     return <div className="p-8 text-slate-500">Подію не знайдено</div>;
 15 | 
 16 |   const report = event.report;
 17 |   const crew = event.crew;
 18 |   const fmt = formatCurrency;
 19 | 
 20 |   return (
 21 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
 22 |       {/* Breadcrumb */}
 23 |       <div className="text-xs sm:text-sm text-slate-500 mb-4 flex items-center gap-1 flex-wrap">
 24 |         <Link to="/cities" className="hover:text-blue-600">
 25 |           Міста
 26 |         </Link>
 27 |         <span>›</span>
 28 |         <Link to={`/cities/${event.cityId}`} className="hover:text-blue-600">
 29 |           {event.city?.name}
 30 |         </Link>
 31 |         <span>›</span>
 32 |         <span>Події</span>
 33 |         <span>›</span>
 34 |         <span className="text-slate-800 font-medium">Звіт по події</span>
 35 |       </div>
 36 | 
 37 |       <button
 38 |         onClick={() => history.back()}
 39 |         className="mb-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
 40 |       >
 41 |         ← Назад
 42 |       </button>
 43 | 
 44 |       <div className="flex items-center gap-3 mb-6 flex-wrap">
 45 |         <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
 46 |           Звіт по події
 47 |         </h1>
 48 |         <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
 49 |           Проведено
 50 |         </span>
 51 |       </div>
 52 | 
 53 |       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 54 |         {/* Інформація */}
 55 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
 56 |           <h3 className="font-bold text-slate-800 mb-4">Інформація</h3>
 57 |           <div className="space-y-2 text-sm">
 58 |             <Row label="Заклад" value={event.school?.name} />
 59 |             <Row
 60 |               label="Адреса"
 61 |               value={<AddressLink address={event.address} />}
 62 |             />
 63 |             <Row
 64 |               label="Дата"
 65 |               value={new Date(event.date).toLocaleDateString("uk-UA")}
 66 |             />
 67 |             <Row label="Час" value={event.time} />
 68 |             <Row label="Проєкт" value={event.project} />
 69 |             <Row label="Екіпаж" value={crew?.name} />
 70 |             <Row label="Ведучий" value={crew?.host?.name} />
 71 |             <Row label="Водій" value={crew?.driver?.name} />
 72 |           </div>
 73 |         </div>
 74 | 
 75 |         {/* Результат */}
 76 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
 77 |           <h3 className="font-bold text-slate-800 mb-4">Результат</h3>
 78 |           <div className="space-y-2 text-sm">
 79 |             <Row label="Заплановано дітей" value={event.childrenPlanned} />
 80 |             <Row label="Фактично дітей" value={report?.childrenCount} />
 81 |             <Row label="Вартість" value={`${fmt(event.price)} грн`} />
 82 |             <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
 83 |             <Row label="Спосіб оплати" value={event.paymentMethod} />
 84 |           </div>
 85 |         </div>
 86 | 
 87 |         {/* Оцінка */}
 88 |         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
 89 |           <h3 className="font-bold text-slate-800 mb-4">Оцінка</h3>
 90 |           <div className="space-y-2 text-sm">
 91 |             <Row
 92 |               label="Директор задоволений"
 93 |               value={report?.directorSatisfied ? "Так" : "Ні"}
 94 |             />
 95 |             <Row
 96 |               label="Вчителі задоволені"
 97 |               value={report?.teachersSatisfied ? "Так" : "Ні"}
 98 |             />
 99 |             <Row label="Проблеми" value={report?.hadIssues ? "Так" : "Ні"} />
100 |             {report?.comment && (
101 |               <div className="pt-2">
102 |                 <p className="text-slate-400 mb-1">Коментар:</p>
103 |                 <p className="text-slate-700 italic">"{report.comment}"</p>
104 |               </div>
105 |             )}
106 |           </div>
107 |         </div>
108 |       </div>
109 |     </div>
110 |   );
111 | }
112 | 
113 | function Row({ label, value }: { label: string; value: ReactNode }) {
114 |   return (
115 |     <div className="flex justify-between">
116 |       <span className="text-slate-400">{label}:</span>
117 |       <span className="font-medium text-slate-800">{value || "—"}</span>
118 |     </div>
119 |   );
120 | }
121 | 
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
 61 | const FIELD_ROLES = ["DRIVER", "HOST"];
 62 | 
 63 | function formatDate(dateStr: string) {
 64 |   return new Date(dateStr).toLocaleDateString("uk-UA", {
 65 |     day: "2-digit",
 66 |     month: "long",
 67 |     year: "numeric",
 68 |   });
 69 | }
 70 | 
 71 | export default function Events() {
 72 |   const navigate = useNavigate();
 73 |   const [user] = useState<AuthUser | null>(() => {
 74 |     try {
 75 |       const raw = localStorage.getItem("user");
 76 |       return raw ? JSON.parse(raw) : null;
 77 |     } catch {
 78 |       return null;
 79 |     }
 80 |   });
 81 |   const { selectedCity } = useSelectedCity();
 82 |   const { data: events = [], isLoading, isError } = useEvents();
 83 |   const error = isError ? "Не вдалося завантажити список подій" : "";
 84 | 
 85 |   const isFieldStaff = !!user && FIELD_ROLES.includes(user.role);
 86 |   const filteredEvents = selectedCity.id
 87 |     ? events.filter((ev) => ev.city?.id === selectedCity.id)
 88 |     : events;
 89 |   const title = isFieldStaff ? "Мої події" : "Розклад подій";
 90 |   const subtitle = isFieldStaff
 91 |     ? "Події, на які вас призначив менеджер"
 92 |     : "Всі заплановані та проведені події";
 93 | 
 94 |   const goToEvent = (ev: EventListItem) => {
 95 |     if (ev.school?.id) navigate(`/schools/${ev.school.id}`);
 96 |   };
 97 | 
 98 |   return (
 99 |     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
100 |       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
101 |         <div>
102 |           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
103 |             {title}
104 |             {selectedCity.id && !isFieldStaff && (
105 |               <span className="ml-2 text-base font-normal text-blue-500">
106 |                 · {selectedCity.name}
107 |               </span>
108 |             )}
109 |           </h1>{" "}
110 |           <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
111 |         </div>
112 |         {!isFieldStaff && (
113 |           <button
114 |             onClick={() => navigate("/schools")}
115 |             className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
116 |           >
117 |             + Додати подію
118 |           </button>
119 |         )}
120 |       </div>
121 | 
122 |       {isLoading && (
123 |         <div className="text-center text-slate-400 py-16">Завантаження...</div>
124 |       )}
125 | 
126 |       {!isLoading && error && (
127 |         <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
128 |           {error}
129 |         </div>
130 |       )}
131 | 
132 |       {!isLoading && !error && filteredEvents.length === 0 && (
133 |         <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
134 |           {isFieldStaff
135 |             ? "Поки що немає подій, на які вас призначено."
136 |             : "Подій ще немає."}
137 |         </div>
138 |       )}
139 | 
140 |       {!isLoading && !error && filteredEvents.length > 0 && (
141 |         <>
142 |           {/* Картки — мобільний вигляд */}
143 |           <div className="md:hidden flex flex-col gap-3">
144 |             {filteredEvents.map((ev) => (
145 |               <div
146 |                 key={ev.id}
147 |                 onClick={() => goToEvent(ev)}
148 |                 className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer active:bg-slate-50"
149 |               >
150 |                 <div className="flex justify-between items-start gap-2">
151 |                   <p className="font-semibold text-gray-800">{ev.project}</p>
152 |                   <span
153 |                     className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${
154 |                       STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
155 |                     }`}
156 |                   >
157 |                     {STATUS_LABELS[ev.status] ?? ev.status}
158 |                   </span>
159 |                 </div>
160 |                 <p className="text-xs text-gray-500 mt-1">
161 |                   {formatDate(ev.date)}
162 |                   {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
163 |                 </p>
164 |                 <p className="text-xs text-gray-500 mt-0.5">
165 |                   🏫 {ev.school?.name ?? "—"}
166 |                 </p>
167 |                 {ev.address && (
168 |                   <p className="text-xs text-gray-500 mt-0.5">
169 |                     📍 <AddressLink address={ev.address} />
170 |                   </p>
171 |                 )}
172 |                 {(ev.crew?.host || ev.crew?.driver) && (
173 |                   <p className="text-xs text-gray-500 mt-1">
174 |                     👤 {ev.crew?.host?.name ?? "—"} · 🚐{" "}
175 |                     {ev.crew?.driver?.name ?? "—"}
176 |                   </p>
177 |                 )}
178 |                 {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
179 |                   <p className="text-xs text-gray-500 mt-0.5">
180 |                     {ev.contactPerson ?? "—"}
181 |                     {ev.contactPhone ? (
182 |                       <>
183 |                         {" "}
184 |                         · <PhoneLink phone={ev.contactPhone} />
185 |                       </>
186 |                     ) : null}
187 |                   </p>
188 |                 )}
189 |               </div>
190 |             ))}
191 |           </div>
192 | 
193 |           {/* Таблиця — десктоп */}
194 |           <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
195 |             <table className="w-full text-left border-collapse">
196 |               <thead>
197 |                 <tr className="bg-gray-50 border-b border-gray-100">
198 |                   <th className="p-4 font-medium text-gray-600">Подія</th>
199 |                   <th className="p-4 font-medium text-gray-600">Дата</th>
200 |                   <th className="p-4 font-medium text-gray-600">Локація</th>
201 |                   <th className="p-4 font-medium text-gray-600">Екіпаж</th>
202 |                   <th className="p-4 font-medium text-gray-600">Статус</th>
203 |                 </tr>
204 |               </thead>
205 |               <tbody>
206 |                 {filteredEvents.map((ev) => (
207 |                   <tr
208 |                     key={ev.id}
209 |                     onClick={() => goToEvent(ev)}
210 |                     className="border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer"
211 |                   >
212 |                     <td className="p-4 text-gray-800 font-medium">
213 |                       {ev.project}
214 |                       <div className="text-xs text-gray-400 font-normal mt-0.5">
215 |                         {ev.school?.name ?? "—"}
216 |                       </div>
217 |                     </td>
218 |                     <td className="p-4 text-gray-600">
219 |                       {formatDate(ev.date)}
220 |                       {ev.time && (
221 |                         <div className="text-xs text-gray-400">{ev.time}</div>
222 |                       )}
223 |                     </td>
224 |                     <td className="p-4 text-gray-600">
225 |                       {ev.city?.name ?? "—"}
226 |                       {ev.address && (
227 |                         <div className="text-xs text-gray-400">
228 |                           <AddressLink address={ev.address} />
229 |                         </div>
230 |                       )}
231 |                     </td>
232 |                     <td className="p-4 text-gray-600 text-sm">
233 |                       <div>👤 {ev.crew?.host?.name ?? "—"}</div>
234 |                       <div>🚐 {ev.crew?.driver?.name ?? "—"}</div>
235 |                     </td>
236 |                     <td className="p-4">
237 |                       <span
238 |                         className={`px-3 py-1 rounded-full text-sm ${
239 |                           STATUS_COLORS[ev.status] ??
240 |                           "bg-slate-100 text-slate-600"
241 |                         }`}
242 |                       >
243 |                         {STATUS_LABELS[ev.status] ?? ev.status}
244 |                       </span>
245 |                     </td>
246 |                   </tr>
247 |                 ))}
248 |               </tbody>
249 |             </table>
250 |           </div>
251 |         </>
252 |       )}
253 |     </div>
254 |   );
255 | }
256 | 
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
 51 |    useEffect(() => {
 52 |     if (isManagerOrAdmin === false) {
 53 |       api
 54 |         .get("/finance/my-balance")
 55 |         .then((r) => setMyBalance(r.data.balance))
 56 |         .catch(() => {});
 57 |     }
 58 |   }, [isManagerOrAdmin]);
 59 | 
 60 |   const { data, isLoading } = useQuery({
 61 |     queryKey: ["finance", selectedCity.id, period, projectFilter],
 62 |     queryFn: async () => {
 63 |       const params = new URLSearchParams();
 64 |       if (period) params.set("period", period);
 65 |       if (selectedCity?.id) params.set("cityId", selectedCity.id);
 66 |       if (projectFilter) params.set("project", projectFilter);
 67 |       const res = await api.get(`/finance/dashboard?${params}`);
 68 |       return res.data;
 69 |     },
 70 |     enabled: !!isManagerOrAdmin,
 71 |     staleTime: 5 * 60 * 1000,
 72 |   });
 73 |   
 74 |   if (!isManagerOrAdmin) {
 75 |     return (
 76 |       <Suspense fallback={<FinanceSkeleton />}>
 77 |         <StaffFinanceView myBalance={myBalance} selectedCity={selectedCity} />
 78 |       </Suspense>
 79 |     );
 80 |   }
 81 | 
 82 |   if (isLoading || !data) return <FinanceSkeleton />;
 83 | 
 84 |   return (
 85 |     <Suspense fallback={<FinanceSkeleton />}>
 86 |       <FinanceCharts
 87 |         data={data}
 88 |         period={period}
 89 |         setPeriod={setPeriod}
 90 |         projectFilter={projectFilter}
 91 |         setProjectFilter={setProjectFilter}
 92 |         selectedCity={selectedCity}
 93 |       />
 94 |     </Suspense>
 95 |   );
 96 | }
 97 | 
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
257 |           const lastActivityDate =
258 |             school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
259 |           const daysStale = lastActivityDate
260 |             ? Math.floor(
261 |                 (Date.now() - new Date(lastActivityDate).getTime()) / 86400000,
262 |               )
263 |             : null;
264 | 
265 |           const stalenessColor =
266 |             daysStale === null
267 |               ? "text-slate-400"
268 |               : daysStale >= 21
269 |                 ? "text-red-500"
270 |                 : daysStale >= 14
271 |                   ? "text-orange-500"
272 |                   : daysStale >= 7
273 |                     ? "text-amber-500"
274 |                     : "text-emerald-500";
275 | 
276 |           return (
277 |             <div
278 |               key={school.id}
279 |               onClick={() => navigate(`/schools/${school.id}`)}
280 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform"
281 |             >
282 |               {/* Рядок 1: назва + видалити */}
283 |               <div className="flex items-start justify-between gap-2">
284 |                 <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
285 |                   {school.name}
286 |                 </p>
287 |                 {userRole === "SUPERADMIN" && (
288 |                   <button
289 |                     onClick={(e) =>
290 |                       handleDeleteSchool(e, school.id, school.name)
291 |                     }
292 |                     className="text-slate-300 active:text-red-500 p-1 -mt-0.5 -mr-1 shrink-0"
293 |                   >
294 |                     🗑
295 |                   </button>
296 |                 )}
297 |               </div>
298 | 
299 |               {/* Рядок 2: директор (клікабельний телефон) + етап */}
300 |               <div className="flex items-center justify-between gap-2 mt-2">
301 |                 <div className="flex items-center gap-1.5 min-w-0">
302 |                   {school.phone ? (
303 |                     <a
304 |                       href={`tel:${school.phone}`}
305 |                       onClick={(e) => e.stopPropagation()}
306 |                       className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
307 |                     >
308 |                       📞 {school.director || school.phone}
309 |                     </a>
310 |                   ) : school.director ? (
311 |                     <span className="text-xs text-slate-500 truncate">
312 |                       👤 {school.director}
313 |                     </span>
314 |                   ) : (
315 |                     <span className="text-xs text-slate-300 italic">
316 |                       Контакт не вказано
317 |                     </span>
318 |                   )}
319 |                 </div>
320 | 
321 |                 {stage ? (
322 |                   <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
323 |                     {stage.name}
324 |                   </span>
325 |                 ) : (
326 |                   <span className="text-[10px] text-slate-300 shrink-0">
327 |                     Етап —
328 |                   </span>
329 |                 )}
330 |               </div>
331 | 
332 |               {/* Рядок 3: остання активність */}
333 |               {daysStale !== null && (
334 |                 <p className={`text-[11px] mt-1.5 ${stalenessColor}`}>
335 |                   ⏱{" "}
336 |                   {daysStale === 0
337 |                     ? "Активність сьогодні"
338 |                     : `Остання активність ${daysStale} дн тому`}
339 |                 </p>
340 |               )}
341 |             </div>
342 |           );
343 |         })}
344 | 
345 |         {filteredKindergartens.length === 0 && (
346 |           <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
347 |             Садочків ще немає
348 |           </div>
349 |         )}
350 | 
351 |         {/* FAB */}
352 |         {userRole === "SUPERADMIN" && (
353 |           <button
354 |             onClick={handleOpenModal}
355 |             className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
356 |           >
357 |             +
358 |           </button>
359 |         )}
360 |       </div>
361 | 
362 |       {/* Десктоп таблиця */}
363 |       <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto w-full">
364 |         <table className="w-full text-left border-collapse">
365 |           <thead>
366 |             <tr className="bg-slate-50 border-b border-slate-100">
367 |               <th className="p-4 font-medium text-slate-600">Назва садочку</th>
368 |               <th className="p-4 font-medium text-slate-600">Місто</th>
369 |               <th className="p-4 font-medium text-slate-600">Статус</th>
370 |               <th className="p-4 font-medium text-slate-600">Поточний етап</th>
371 |               <th className="p-4 font-medium text-slate-600 text-center">
372 |                 Дія
373 |               </th>
374 |             </tr>
375 |           </thead>
376 |           <tbody>
377 |             {filteredKindergartens.map((school) => {
378 |               const latestEvent = school.events?.[0];
379 |               const stage = latestEvent
380 |                 ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
381 |                 : null;
382 |               return (
383 |                 <tr
384 |                   key={school.id}
385 |                   onClick={() => navigate(`/schools/${school.id}`)}
386 |                   className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/50 transition"
387 |                 >
388 |                   <td className="p-4 text-slate-800 font-medium">
389 |                     {school.name}
390 |                   </td>
391 |                   <td className="p-4 text-slate-600">{school.city?.name}</td>
392 |                   <td className="p-4">
393 |                     <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
394 |                       Активний
395 |                     </span>
396 |                   </td>
397 |                   <td className="p-4">
398 |                     {stage ? (
399 |                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
400 |                         {stage.name}
401 |                       </span>
402 |                     ) : (
403 |                       <span className="text-slate-400 text-xs italic">—</span>
404 |                     )}
405 |                   </td>
406 |                   <td className="p-4 text-center">
407 |                     {userRole === "SUPERADMIN" && (
408 |                       <button
409 |                         onClick={(e) =>
410 |                           handleDeleteSchool(e, school.id, school.name)
411 |                         }
412 |                         className="text-slate-400 hover:text-red-500 transition-colors p-2"
413 |                       >
414 |                         🗑
415 |                       </button>
416 |                     )}
417 |                   </td>
418 |                 </tr>
419 |               );
420 |             })}
421 |           </tbody>
422 |         </table>
423 |       </div>
424 | 
425 |       {/* Модалка */}
426 |       {isModalOpen && (
427 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
428 |           <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col">
429 |             <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
430 |             <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
431 |               <h3 className="text-xl font-bold text-slate-800">
432 |                 Новий садочок
433 |               </h3>
434 |               <button
435 |                 onClick={() => setIsModalOpen(false)}
436 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2"
437 |               >
438 |                 ✕
439 |               </button>
440 |             </div>
441 |             <form
442 |               onSubmit={handleAddSchool}
443 |               className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto"
444 |             >
445 |               <div className="relative">
446 |                 <label className="block text-sm text-slate-600 mb-1">
447 |                   Назва садочку
448 |                 </label>
449 |                 <input
450 |                   type="text"
451 |                   value={form.name}
452 |                   onChange={(e) => handleNameChange(e.target.value)}
453 |                   onBlur={() =>
454 |                     setTimeout(() => setShowSuggestions(false), 150)
455 |                   }
456 |                   required
457 |                   placeholder="Наприклад: Садочок №1"
458 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
459 |                 />
460 |                 {showSuggestions && (
461 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
462 |                     {isSearching ? (
463 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
464 |                         Пошук за збігами...
465 |                       </li>
466 |                     ) : suggestions.length > 0 ? (
467 |                       suggestions.map((s, i) => (
468 |                         <li
469 |                           key={i}
470 |                           onMouseDown={() =>
471 |                             handleSelectSuggestion(s.name, s.url)
472 |                           }
473 |                           className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
474 |                         >
475 |                           {s.name}
476 |                         </li>
477 |                       ))
478 |                     ) : (
479 |                       <li className="px-3 py-2 text-sm text-slate-400 italic">
480 |                         Нічого не знайдено
481 |                       </li>
482 |                     )}
483 |                   </ul>
484 |                 )}
485 |               </div>
486 | 
487 |               {!selectedCity.id && (
488 |                 <div>
489 |                   <label className="block text-sm text-slate-600 mb-1">
490 |                     Місто
491 |                   </label>
492 |                   <select
493 |                     value={form.cityId}
494 |                     onChange={(e) =>
495 |                       setForm({ ...form, cityId: e.target.value })
496 |                     }
497 |                     required
498 |                     className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
499 |                   >
500 |                     <option value="">— Оберіть місто —</option>
501 |                     {cities.map((c) => (
502 |                       <option key={c.id} value={c.id}>
503 |                         {c.name}
504 |                       </option>
505 |                     ))}
506 |                   </select>
507 |                 </div>
508 |               )}
509 | 
510 |               <div>
511 |                 <label className="block text-sm text-slate-600 mb-1">
512 |                   Контакт{" "}
513 |                   <span className="ml-1 text-xs text-slate-400">
514 |                     (автозаповнення)
515 |                   </span>
516 |                 </label>
517 |                 {matchedContacts.length > 0 && (
518 |                   <div className="flex flex-wrap gap-1 mb-2">
519 |                     {matchedContacts.map((c, i) => (
520 |                       <button
521 |                         key={i}
522 |                         type="button"
523 |                         onClick={() =>
524 |                           setForm((f) => ({
525 |                             ...f,
526 |                             director: c.contactName,
527 |                             phone: c.phone,
528 |                           }))
529 |                         }
530 |                         className={`text-xs px-2 py-1 rounded-full border transition-colors ${
531 |                           form.director === c.contactName
532 |                             ? "bg-blue-600 text-white border-blue-600"
533 |                             : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
534 |                         }`}
535 |                       >
536 |                         {c.role ? `${c.role}: ` : ""}
537 |                         {c.contactName}
538 |                       </button>
539 |                     ))}
540 |                   </div>
541 |                 )}
542 |                 <input
543 |                   type="text"
544 |                   value={form.director}
545 |                   onChange={(e) =>
546 |                     setForm({ ...form, director: e.target.value })
547 |                   }
548 |                   placeholder="Микола Петренко"
549 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
550 |                 />
551 |               </div>
552 | 
553 |               <div>
554 |                 <label className="block text-sm text-slate-600 mb-1">
555 |                   Телефон{" "}
556 |                   <span className="ml-1 text-xs text-slate-400">
557 |                     (автозаповнення)
558 |                   </span>
559 |                 </label>
560 |                 <input
561 |                   type="text"
562 |                   value={form.phone}
563 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
564 |                   placeholder="0671234567"
565 |                   className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
566 |                 />
567 |               </div>
568 | 
569 |               <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2 pb-1 sm:pb-0">
570 |                 <button
571 |                   type="button"
572 |                   onClick={() => setIsModalOpen(false)}
573 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 rounded-xl sm:rounded-lg text-sm font-medium hover:bg-slate-200"
574 |                 >
575 |                   Скасувати
576 |                 </button>
577 |                 <button
578 |                   type="submit"
579 |                   disabled={isSubmitting}
580 |                   className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl sm:rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
581 |                 >
582 |                   {isSubmitting ? "Збереження..." : "Створити"}
583 |                 </button>
584 |               </div>
585 |             </form>
586 |           </div>
587 |         </div>
588 |       )}
589 |     </div>
590 |   );
591 | }
592 | 
```

### File: apps/frontend/src/pages/Login.tsx
```tsx
  0 | import { useState } from "react";
  1 | import { useNavigate } from "react-router-dom";
  2 | 
  3 | import { api } from "../config/api";
  4 | 
  5 | interface LoginProps {
  6 |   onLogin?: () => void;
  7 | }
  8 | 
  9 | export default function Login({ onLogin }: LoginProps) {
 10 |   const [email, setEmail] = useState("admin@crm.com");
 11 |   const [password, setPassword] = useState("admin123");
 12 |   const [error, setError] = useState("");
 13 |   const navigate = useNavigate();
 14 | 
 15 |   const handleLogin = async (e: React.FormEvent) => {
 16 |     e.preventDefault();
 17 |     setError("");
 18 | 
 19 |     try {
 20 |       const response = await api.post("/auth/login", { email, password });
 21 | 
 22 |       localStorage.setItem("user", JSON.stringify(response.data.user));
 23 |       if (onLogin) {
 24 |         onLogin();
 25 |       } else {
 26 |         navigate("/cities");
 27 |       }
 28 |     } catch {
 29 |       setError("Невірний email або пароль");
 30 |     }
 31 |   };
 32 | 
 33 |   return (
 34 |     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
 35 |       <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
 36 |         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
 37 |           Вхід у CRM
 38 |         </h1>
 39 | 
 40 |         {error && (
 41 |           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
 42 |             {error}
 43 |           </div>
 44 |         )}
 45 | 
 46 |         <form onSubmit={handleLogin} className="flex flex-col gap-4">
 47 |           <div>
 48 |             <label className="block text-sm font-medium text-gray-700 mb-1">
 49 |               Email
 50 |             </label>
 51 |             <input
 52 |               type="email"
 53 |               value={email}
 54 |               onChange={(e) => setEmail(e.target.value)}
 55 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
 56 |               required
 57 |             />
 58 |           </div>
 59 |           <div>
 60 |             <label className="block text-sm font-medium text-gray-700 mb-1">
 61 |               Пароль
 62 |             </label>
 63 |             <input
 64 |               type="password"
 65 |               value={password}
 66 |               onChange={(e) => setPassword(e.target.value)}
 67 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
 68 |               required
 69 |             />
 70 |           </div>
 71 |           <button
 72 |             type="submit"
 73 |             className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition"
 74 |           >
 75 |             Увійти
 76 |           </button>
 77 |         </form>
 78 |       </div>
 79 |     </div>
 80 |   );
 81 | }
 82 | 
```

### File: apps/frontend/src/pages/SchoolProfile.tsx
```tsx
  0 | import { useState, useMemo, useCallback, lazy, Suspense } from "react";
  1 | import { useParams } from "react-router-dom";
  2 | import { useQueryClient } from "@tanstack/react-query";
  3 | import { motion, AnimatePresence } from "framer-motion";
  4 | 
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
 21 | import type { Event, User } from "../types";
 22 | import type { ReportData } from "../components/school-profile/modals/ReportModal";
 23 | 
 24 | import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
 25 | import CompletedEventModal from "../components/school-profile/CompletedEventModal";
 26 | 
 27 | const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
 28 | const HistoryTimeline = lazy(
 29 |   () => import("../components/school-profile/HistoryTimeline"),
 30 | );
 31 | const EventDetails = lazy(
 32 |   () => import("../components/school-profile/EventDetails"),
 33 | );
 34 | const SchoolInfoCard = lazy(
 35 |   () => import("../components/school-profile/SchoolInfoCard"),
 36 | );
 37 | const EventsTable = lazy(
 38 |   () => import("../components/school-profile/EventsTable"),
 39 | );
 40 | const EventPreparation = lazy(
 41 |   () => import("../components/school-profile/EventPreparation"),
 42 | );
 43 | const AssignedCrew = lazy(
 44 |   () => import("../components/school-profile/AssignedCrew"),
 45 | );
 46 | 
 47 | import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
 48 | import EventModal from "../components/school-profile/modals/EventModal";
 49 | import CommentModal from "../components/school-profile/modals/CommentModal";
 50 | import CrewModal from "../components/school-profile/modals/CrewModal";
 51 | import ReportModal from "../components/school-profile/modals/ReportModal";
 52 | 
 53 | const PIPELINE_STAGES = [
 54 |   { id: 1, key: "BASE", name: "Новий заклад" },
 55 |   { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
 56 |   { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 57 |   { id: 4, key: "PREPARATION", name: "Оголошення" },
 58 |   { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
 59 |   { id: 6, key: "DONE", name: "Проведення заходу" },
 60 |   { id: 7, key: "REPORT", name: "Звіт" },
 61 | ] as const;
 62 | 
 63 | export default function SchoolProfile() {
 64 |   const { id } = useParams();
 65 |   const qc = useQueryClient();
 66 | 
 67 |   const { data: schoolRaw } = useSchool(id);
 68 |   const { data: eventsRaw = [] } = useSchoolEvents(id, false);
 69 | 
 70 |   const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
 71 |   const [exitingEventId, setExitingEventId] = useState<string | null>(null);
 72 | 
 73 |   const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
 74 |     selectedEventId ?? eventsRaw[0]?.id,
 75 |   );
 76 | 
 77 |   const { data: users = [] } = useUsers();
 78 |   const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
 79 |   const [selectedReportEvent, setSelectedReportEvent] = useState<Event | null>(
 80 |     null,
 81 |   );
 82 |   const updateStatus = useUpdateEventStatus();
 83 |   const updatePreparation = useUpdatePreparation();
 84 |   const assignCrewMutation = useAssignCrew();
 85 |   const submitReportMutation = useSubmitReport();
 86 |   const addCommentMutation = useAddComment();
 87 |   const updateHistoryMutation = useUpdateHistoryComment();
 88 | 
 89 |   const schoolData = useMemo(() => {
 90 |     if (!schoolRaw) {
 91 |       return {
 92 |         id: "",
 93 |         cityId: "",
 94 |         name: "",
 95 |         type: "Школа",
 96 |         city: "",
 97 |         address: "",
 98 |         director: "",
 99 |         phone: "",
100 |         email: "",
101 |         childrenCount: 0,
102 |         notes: "",
103 |       };
104 |     }
105 | 
106 |     return {
107 |       id: schoolRaw.id,
108 |       cityId: schoolRaw.cityId,
109 |       name: schoolRaw.name || "",
110 |       type: schoolRaw.type || "Школа",
111 |       city: schoolRaw.city?.name || "",
112 |       address: schoolRaw.address || "",
113 |       director: schoolRaw.director || "",
114 |       phone: schoolRaw.phone || "",
115 |       email: schoolRaw.email || "",
116 |       childrenCount: schoolRaw.childrenCount || 0,
117 |       notes: schoolRaw.notes || "",
118 |     };
119 |   }, [schoolRaw]);
120 | 
121 |   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
122 |   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
123 |   const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
124 |   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
125 |   const [commentModal, setCommentModal] = useState({
126 |     isOpen: false,
127 |     mode: "pipeline",
128 |     stepId: null as number | null,
129 |     historyId: null as string | null,
130 |     text: "",
131 |   });
132 | 
133 |   const [editForm, setEditForm] = useState({
134 |     id: "",
135 |     cityId: "",
136 |     name: "",
137 |     type: "Школа",
138 |     city: "",
139 |     address: "",
140 |     director: "",
141 |     phone: "",
142 |     email: "",
143 |     childrenCount: 0,
144 |     notes: "",
145 |   });
146 |   const [eventForm, setEventForm] = useState({
147 |     project: "Голограма для школи",
148 |     date: "",
149 |     time: "11:00",
150 |     childrenPlanned: "",
151 |     price: "",
152 |     address: "",
153 |     contactPerson: "",
154 |     contactPhone: "",
155 |   });
156 | 
157 |   const currentEventBase = useMemo(
158 |     () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
159 |     [eventsRaw, selectedEventId],
160 |   );
161 | 
162 |   const currentEvent = useMemo(() => {
163 |     if (!currentEventBase) return null;
164 |     if (eventFull?.id === currentEventBase.id) {
165 |       return { ...currentEventBase, ...eventFull };
166 |     }
167 |     return currentEventBase;
168 |   }, [currentEventBase, eventFull]);
169 |   const currentStageIndex = useMemo(() => {
170 |     if (!currentEvent?.status) return 0;
171 |     const idx = PIPELINE_STAGES.findIndex(
172 |       (s) => s.key === currentEvent?.status,
173 |     );
174 |     return idx !== -1 ? idx : 0;
175 |   }, [currentEvent?.status]);
176 |   const creatorName = useMemo(
177 |     () =>
178 |       currentEvent?.history?.length > 0
179 |         ? currentEvent.history[currentEvent.history.length - 1].userName
180 |         : "Немає даних",
181 |     [currentEvent?.history],
182 |   );
183 | 
184 |   const handlePipelineClick = useCallback(
185 |     (stepId: number) => {
186 |       if (!currentEvent) return;
187 |       const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
188 |       if (nextStage?.id !== stepId) return;
189 |       if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
190 |       setCommentModal({
191 |         isOpen: true,
192 |         mode: "pipeline",
193 |         stepId: nextStage.id,
194 |         historyId: null,
195 |         text: "",
196 |       });
197 |     },
198 |     [currentEvent, currentStageIndex],
199 |   );
200 | 
201 |   const handleHistoryClick = useCallback(
202 |     (historyItem: { id: string; comment?: string }) => {
203 |       setCommentModal({
204 |         isOpen: true,
205 |         mode: "history",
206 |         stepId: null,
207 |         historyId: historyItem.id,
208 |         text: historyItem.comment || "",
209 |       });
210 |     },
211 |     [],
212 |   );
213 | 
214 |   const handleAddCommentClick = useCallback(() => {
215 |     setCommentModal({
216 |       isOpen: true,
217 |       mode: "add_comment",
218 |       stepId: null,
219 |       historyId: null,
220 |       text: "",
221 |     });
222 |   }, []);
223 | 
224 |   const handleSaveComment = useCallback(
225 |     async (e: React.FormEvent) => {
226 |       e.preventDefault();
227 |       if (commentModal.mode === "pipeline") {
228 |         const activeStage = PIPELINE_STAGES[currentStageIndex];
229 |         const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
230 |         if (!nextStage || !currentEvent) return;
231 | 
232 |         await updateStatus.mutateAsync({
233 |           eventId: currentEvent.id,
234 |           status: nextStage.key,
235 |           actionName: `Етап пройдено: ${activeStage.name}`,
236 |           comment: commentModal.text,
237 |         });
238 |         if (nextStage.key === "RE_SALE") {
239 |           setExitingEventId(currentEvent.id);
240 |           setTimeout(() => {
241 |             setSelectedEventId(null);
242 |             setExitingEventId(null);
243 |           }, 500);
244 |         }
245 |       } else if (commentModal.mode === "add_comment") {
246 |         await addCommentMutation.mutateAsync({
247 |           eventId: currentEvent.id,
248 |           comment: commentModal.text,
249 |         });
250 |       } else if (commentModal.mode === "history" && commentModal.historyId) {
251 |         await updateHistoryMutation.mutateAsync({
252 |           historyId: commentModal.historyId,
253 |           comment: commentModal.text,
254 |           eventId: currentEvent.id,
255 |         });
256 |       }
257 |       setCommentModal({
258 |         isOpen: false,
259 |         mode: "pipeline",
260 |         stepId: null,
261 |         historyId: null,
262 |         text: "",
263 |       });
264 |     },
265 |     [
266 |       commentModal,
267 |       currentEvent,
268 |       currentStageIndex,
269 |       updateStatus,
270 |       addCommentMutation,
271 |       updateHistoryMutation,
272 |     ],
273 |   );
274 | 
275 |   const updateSchoolMutation = useUpdateSchool();
276 |   const createEventMutation = useCreateEvent();
277 | 
278 |   const handleSaveEvent = useCallback(
279 |     async (e: React.FormEvent) => {
280 |       e.preventDefault();
281 |       if (!schoolData.id) return;
282 | 
283 |       const payload = {
284 |         ...eventForm,
285 |         schoolId: schoolData.id,
286 |         cityId: schoolData.cityId,
287 |         childrenPlanned: Number(eventForm.childrenPlanned) || 0,
288 |         price: Number(eventForm.price) || 0,
289 |       };
290 | 
291 |       const newEvent = await createEventMutation.mutateAsync(payload);
292 | 
293 |       setIsEventModalOpen(false);
294 |       setSelectedEventId(newEvent.id);
295 |     },
296 |     [eventForm, schoolData, createEventMutation],
297 |   );
298 | 
299 |   const handleSaveSchoolInfo = useCallback(
300 |     async (e: React.FormEvent) => {
301 |       e.preventDefault();
302 |       if (!id) return;
303 | 
304 |       const { city, ...rest } = editForm;
305 |       await updateSchoolMutation.mutateAsync({
306 |         ...rest,
307 |         id,
308 |       });
309 |       setIsEditModalOpen(false);
310 |     },
311 |     [editForm, id, updateSchoolMutation],
312 |   );
313 | 
314 |   const handleUpdatePreparation = useCallback(
315 |     async (field: string, status: string) => {
316 |       if (!currentEvent) return;
317 |       await updatePreparation.mutateAsync({
318 |         eventId: currentEvent.id,
319 |         field,
320 |         status,
321 |       });
322 |     },
323 |     [currentEvent, updatePreparation],
324 |   );
325 | 
326 |   const handleSubmitReport = useCallback(
327 |     async (reportData: ReportData) => {
328 |       if (!currentEvent) return;
329 |       await submitReportMutation.mutateAsync({
330 |         eventId: currentEvent.id,
331 |         reportData,
332 |       });
333 |       await updateStatus.mutateAsync({
334 |         eventId: currentEvent.id,
335 |         status: "RE_SALE",
336 |         actionName: "Звіт сформовано. Захід завершено.",
337 |       });
338 |       setExitingEventId(currentEvent.id);
339 |       setTimeout(() => {
340 |         setSelectedEventId(null);
341 |         setExitingEventId(null);
342 |       }, 500);
343 |       setIsReportModalOpen(false);
344 |     },
345 |     [currentEvent, submitReportMutation, updateStatus],
346 |   );
347 | 
348 |   const handleAssignCrew = useCallback(
349 |     async (crewId: string) => {
350 |       if (!currentEvent) return;
351 | 
352 |       await assignCrewMutation.mutateAsync({
353 |         eventId: currentEvent.id,
354 |         crewId,
355 |       });
356 | 
357 |       await updatePreparation.mutateAsync({
358 |         eventId: currentEvent.id,
359 |         field: "assignCrew",
360 |         status: "Виконано",
361 |       });
362 | 
363 |       setIsCrewModalOpen(false);
364 |     },
365 |     [currentEvent, assignCrewMutation, updatePreparation],
366 |   );
367 | 
368 |   const events = eventsRaw;
369 | 
370 |   const openAddEventModal = useCallback(() => {
371 |     setEventForm((prev) => ({
372 |       ...prev,
373 |       address: schoolData.address,
374 |       contactPerson: schoolData.director,
375 |       contactPhone: schoolData.phone,
376 |       childrenPlanned: String(schoolData.childrenCount),
377 |     }));
378 |     setIsEventModalOpen(true);
379 |   }, [schoolData]);
380 |   const stagger = (i: number) => ({
381 |     initial: { opacity: 0, y: 10 },
382 |     animate: { opacity: 1, y: 0 },
383 |     transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
384 |   });
385 | 
386 |   return (
387 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8">
388 |       <SchoolProfileHeader
389 |         schoolData={schoolData}
390 |         onEdit={() => {
391 |           setEditForm(schoolData);
392 |           setIsEditModalOpen(true);
393 |         }}
394 |         onAddEvent={openAddEventModal}
395 |       />
396 | 
397 |       <div className="flex flex-col xl:flex-row gap-6">
398 |         {/* Ліва колонка */}
399 |         <div className="w-full xl:w-80 flex flex-col gap-6">
400 |           <motion.div {...stagger(0)}>
401 |             <Suspense
402 |               fallback={
403 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
404 |               }
405 |             >
406 |               <SchoolInfoCard schoolData={schoolData} />
407 |             </Suspense>
408 |           </motion.div>
409 | 
410 |           <AnimatePresence>
411 |             {currentEvent && currentStageIndex >= 1 && (
412 |               <motion.div
413 |                 key="responsible"
414 |                 initial={{ opacity: 0, y: 8 }}
415 |                 animate={{ opacity: 1, y: 0 }}
416 |                 exit={{ opacity: 0, y: -8 }}
417 |                 transition={{ duration: 0.25 }}
418 |                 className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
419 |               >
420 |                 <h3 className="font-bold text-slate-800 mb-4">
421 |                   Відповідальна особа
422 |                 </h3>
423 |                 <ul className="space-y-2 text-sm">
424 |                   <li className="flex justify-between">
425 |                     <span className="text-slate-500">Остання дія:</span>
426 |                     <span className="font-medium text-blue-600">
427 |                       {creatorName}
428 |                     </span>
429 |                   </li>
430 |                 </ul>
431 |               </motion.div>
432 |             )}
433 |           </AnimatePresence>
434 | 
435 |           <motion.div {...stagger(1)}>
436 |             <Suspense
437 |               fallback={
438 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
439 |               }
440 |             >
441 |               <HistoryTimeline
442 |                 currentEvent={
443 |                   eventFullLoading ? currentEventBase : currentEvent
444 |                 }
445 |                 onHistoryClick={handleHistoryClick}
446 |                 onAddCommentClick={handleAddCommentClick}
447 |               />
448 |             </Suspense>
449 |           </motion.div>
450 |         </div>
451 | 
452 |         {/* Права колонка */}
453 |         <motion.div
454 |           className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
455 |             exitingEventId === currentEvent?.id
456 |               ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
457 |               : ""
458 |           }`}
459 |           initial={{ opacity: 0, y: 10 }}
460 |           animate={{ opacity: 1, y: 0 }}
461 |           transition={{ duration: 0.3, delay: 0.15 }}
462 |         >
463 |           {currentEvent && (
464 |             <Suspense
465 |               fallback={
466 |                 <div className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />
467 |               }
468 |             >
469 |               <Pipeline
470 |                 currentStageIndex={currentStageIndex}
471 |                 currentEvent={currentEvent}
472 |                 onPipelineClick={handlePipelineClick}
473 |                 stages={PIPELINE_STAGES}
474 |               />
475 |             </Suspense>
476 |           )}
477 | 
478 |           <AnimatePresence>
479 |             {currentEvent && currentStageIndex >= 4 && (
480 |               <motion.div
481 |                 key="preparation"
482 |                 initial={{ opacity: 0, y: 8 }}
483 |                 animate={{ opacity: 1, y: 0 }}
484 |                 exit={{ opacity: 0, y: -8 }}
485 |                 transition={{ duration: 0.25 }}
486 |                 className="grid grid-cols-1 xl:grid-cols-2 gap-6"
487 |               >
488 |                 {eventFullLoading ? (
489 |                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
490 |                 ) : (
491 |                   <Suspense
492 |                     fallback={
493 |                       <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
494 |                     }
495 |                   >
496 |                     <EventPreparation
497 |                       data={currentEvent.preparation || {}}
498 |                       onUpdate={handleUpdatePreparation}
499 |                       onOpenCrewModal={() => setIsCrewModalOpen(true)}
500 |                     />
501 |                   </Suspense>
502 |                 )}
503 |                 <Suspense
504 |                   fallback={
505 |                     <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
506 |                   }
507 |                 >
508 |                   <AssignedCrew currentEvent={currentEvent} employees={users} />
509 |                 </Suspense>
510 |               </motion.div>
511 |             )}
512 |           </AnimatePresence>
513 | 
514 |           <motion.div {...stagger(2)}>
515 |             <Suspense
516 |               fallback={
517 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
518 |               }
519 |             >
520 |               <EventDetails
521 |                 currentEvent={currentEvent}
522 |                 schoolName={schoolData.name}
523 |                 cityId={schoolData.cityId}
524 |                 onEventUpdated={() =>
525 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
526 |                 }
527 |               />
528 |             </Suspense>
529 |           </motion.div>
530 | 
531 |           <motion.div {...stagger(3)}>
532 |             <Suspense
533 |               fallback={
534 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
535 |               }
536 |             >
537 |               <EventsTable
538 |                 events={events}
539 |                 selectedEventId={selectedEventId}
540 |                 onEventSelect={setSelectedEventId}
541 |                 onDeleteSuccess={() =>
542 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
543 |                 }
544 |               />
545 |             </Suspense>
546 |             {completedEvents.length > 0 && (
547 |               <motion.div {...stagger(4)}>
548 |                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
549 |                   <div className="p-6 border-b border-slate-100 bg-slate-50/50">
550 |                     <h3 className="font-bold text-slate-800">
551 |                       Завершені події ({completedEvents.length})
552 |                     </h3>
553 |                   </div>
554 |                   <div className="md:hidden divide-y divide-slate-50">
555 |                     {completedEvents.map((ev: Event) => (
556 |                       <div
557 |                         key={ev.id}
558 |                         onClick={() => setSelectedReportEvent(ev)}
559 |                         className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
560 |                       >
561 |                         <div className="min-w-0">
562 |                           <p className="font-medium text-blue-600 truncate">
563 |                             {ev.project}
564 |                           </p>
565 |                           <p className="text-xs text-slate-400 mt-0.5">
566 |                             {new Date(ev.date).toLocaleDateString("uk-UA")}
567 |                           </p>
568 |                           <p className="text-xs text-slate-500 mt-1">
569 |                             👶{" "}
570 |                             {ev.report?.childrenCount ||
571 |                               ev.childrenPlanned ||
572 |                               "—"}{" "}
573 |                             дітей
574 |                           </p>
575 |                         </div>
576 |                         <div className="text-right shrink-0">
577 |                           <p className="font-semibold text-slate-800 text-sm">
578 |                             {new Intl.NumberFormat("uk-UA").format(
579 |                               ev.report?.totalSum || ev.price || 0,
580 |                             )}{" "}
581 |                             грн
582 |                           </p>
583 |                           <p className="text-xs font-medium text-emerald-600 mt-0.5">
584 |                             +
585 |                             {new Intl.NumberFormat("uk-UA").format(
586 |                               ev.report?.remainderSum || 0,
587 |                             )}{" "}
588 |                             грн
589 |                           </p>
590 |                         </div>
591 |                       </div>
592 |                     ))}
593 |                   </div>
594 |                   <div className="hidden md:block overflow-x-auto">
595 |                     <table className="w-full text-left text-sm">
596 |                       <thead>
597 |                         <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
598 |                           <th className="p-4">Проєкт</th>
599 |                           <th className="p-4">Дата</th>
600 |                           <th className="p-4">Дітей</th>
601 |                           <th className="p-4">Виручка</th>
602 |                           <th className="p-4">Прибуток</th>
603 |                         </tr>
604 |                       </thead>
605 |                       <tbody>
606 |                         {completedEvents.map((ev: any) => (
607 |                           <tr
608 |                             key={ev.id}
609 |                             onClick={() => setSelectedReportEvent(ev)}
610 |                             className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
611 |                           >
612 |                             <td className="p-4 text-slate-700 font-medium">
613 |                               {ev.project}
614 |                             </td>
615 |                             <td className="p-4 text-slate-600">
616 |                               {new Date(ev.date).toLocaleDateString("uk-UA")}
617 |                             </td>
618 |                             <td className="p-4 font-medium">
619 |                               {ev.report?.childrenCount ||
620 |                                 ev.childrenPlanned ||
621 |                                 "—"}
622 |                             </td>
623 |                             <td className="p-4 font-medium text-slate-800">
624 |                               {new Intl.NumberFormat("uk-UA").format(
625 |                                 ev.report?.totalSum || ev.price || 0,
626 |                               )}{" "}
627 |                               грн
628 |                             </td>
629 |                             <td className="p-4 font-medium text-emerald-600">
630 |                               {new Intl.NumberFormat("uk-UA").format(
631 |                                 ev.report?.remainderSum || 0,
632 |                               )}{" "}
633 |                               грн
634 |                             </td>
635 |                           </tr>
636 |                         ))}
637 |                       </tbody>
638 |                     </table>
639 |                   </div>
640 |                 </div>
641 |               </motion.div>
642 |             )}
643 |           </motion.div>
644 |         </motion.div>
645 |       </div>
646 | 
647 |       {/* Мобільна FAB */}
648 |       <button
649 |         onClick={openAddEventModal}
650 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
651 |       >
652 |         +
653 |       </button>
654 | 
655 |       {/* Модальні вікна */}
656 |       <EditSchoolModal
657 |         isOpen={isEditModalOpen}
658 |         onClose={() => setIsEditModalOpen(false)}
659 |         editForm={editForm}
660 |         setEditForm={setEditForm}
661 |         onSave={handleSaveSchoolInfo}
662 |       />
663 |       <EventModal
664 |         isOpen={isEventModalOpen}
665 |         onClose={() => setIsEventModalOpen(false)}
666 |         eventForm={eventForm}
667 |         setEventForm={setEventForm}
668 |         onSave={handleSaveEvent}
669 |       />
670 |       <CommentModal
671 |         isOpen={commentModal.isOpen}
672 |         onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
673 |         mode={commentModal.mode}
674 |         text={commentModal.text}
675 |         setText={(t) => setCommentModal({ ...commentModal, text: t })}
676 |         onSave={handleSaveComment}
677 |       />
678 |       <CrewModal
679 |         isOpen={isCrewModalOpen}
680 |         onClose={() => setIsCrewModalOpen(false)}
681 |         city={schoolData.city}
682 |         employees={users}
683 |         onSave={handleAssignCrew}
684 |       />
685 |       <ReportModal
686 |         isOpen={isReportModalOpen}
687 |         onClose={() => setIsReportModalOpen(false)}
688 |         onSave={handleSubmitReport}
689 |         schoolName={schoolData.name}
690 |         eventType={currentEvent?.project}
691 |         eventDate={currentEvent?.date}
692 |         eventIndex={
693 |           events
694 |             .filter((e) => e.schoolId === schoolData.id)
695 |             .findIndex((e) => e.id === currentEvent?.id) + 1
696 |         }
697 |         crew={
698 |           currentEvent?.crew
699 |             ? {
700 |                 host: currentEvent.crew.hostId
701 |                   ? (users.find(
702 |                       (u: User) => u.id === currentEvent.crew.hostId,
703 |                     ) ?? null)
704 |                   : (currentEvent.crew.host ?? null),
705 |                 driver: currentEvent.crew.driverId
706 |                   ? (users.find(
707 |                       (u: User) => u.id === currentEvent.crew.driverId,
708 |                     ) ?? null)
709 |                   : (currentEvent.crew.driver ?? null),
710 |               }
711 |             : undefined
712 |         }
713 |       />
714 |       <CompletedEventModal
715 |         isOpen={!!selectedReportEvent}
716 |         onClose={() => setSelectedReportEvent(null)}
717 |         event={selectedReportEvent}
718 |       />
719 |     </div>
720 |   );
721 | }
722 | 
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
 17 | import type { SchoolContact } from "../types";
 18 | 
 19 | interface NewSchoolPayload {
 20 |   name: string;
 21 |   cityId: string;
 22 |   sourceUrl: string;
 23 |   director: string;
 24 |   phone: string;
 25 |   type: string;
 26 | }
 27 | 
 28 | const StatsBar = lazy(() => import("../components/schools/StatsBar"));
 29 | const VirtualDesktopTable = lazy(
 30 |   () => import("../components/schools/VirtualDesktopTable"),
 31 | );
 32 | export const PIPELINE_STAGES = [
 33 |   { key: "BASE", name: "Новий заклад" },
 34 |   { key: "FIRST_CONTACT", name: "Знайомство" },
 35 |   { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 36 |   { key: "PREPARATION", name: "Оголошення" },
 37 |   { key: "IN_PROGRESS", name: "Підготовка" },
 38 |   { key: "DONE", name: "Проведення заходу" },
 39 |   { key: "REPORT", name: "Звіт" },
 40 | ];
 41 | 
 42 | interface City {
 43 |   id: string;
 44 |   name: string;
 45 | }
 46 | 
 47 | export default function Schools() {
 48 |   const { selectedCity } = useSelectedCity();
 49 |   const [isModalOpen, setIsModalOpen] = useState(false);
 50 |   const [isSubmitting, setIsSubmitting] = useState(false);
 51 |   const [searchQuery, setSearchQuery] = useState("");
 52 |   const [userRole] = useState<string | null>(() => {
 53 |     try {
 54 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
 55 |     } catch {
 56 |       return null;
 57 |     }
 58 |   });
 59 |   const qc = useQueryClient();
 60 |   const [form, setForm] = useState({
 61 |     name: "",
 62 |     cityId: "",
 63 |     sourceUrl: "",
 64 |     director: "",
 65 |     phone: "",
 66 |   });
 67 |   const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
 68 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 69 |   const [sizeFilter, setSizeFilter] = useState<string | null>(null);
 70 |   const [suggestions, setSuggestions] = useState<
 71 |     { name: string; url: string }[]
 72 |   >([]);
 73 |   const [showSuggestions, setShowSuggestions] = useState(false);
 74 |   const [isSearching, setIsSearching] = useState(false);
 75 |   const [dotCount, setDotCount] = useState(3);
 76 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 77 | 
 78 |   const addSchoolMutation = useMutation({
 79 |     mutationFn: (newSchool: NewSchoolPayload) =>
 80 |       api.post("/schools", newSchool, {
 81 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 82 |       }),
 83 |     onSuccess: () => {
 84 |       qc.invalidateQueries({ queryKey: ["schools"] });
 85 |       setIsModalOpen(false);
 86 |     },
 87 |     onError: () => alert("Не вдалося створити заклад"),
 88 |   });
 89 | 
 90 |   const bulkImportMutation = useMutation({
 91 |     mutationFn: (cityId: string) =>
 92 |       api.post(
 93 |         "/schools/bulk-import",
 94 |         { cityId, type: "Школа" },
 95 |         {
 96 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 97 |           timeout: 120000,
 98 |         },
 99 |       ),
100 |     onSuccess: (res) => {
101 |       alert(
102 |         `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
103 |       );
104 |       qc.invalidateQueries({ queryKey: ["schools"] });
105 |     },
106 |     onError: () => alert("Помилка імпорту."),
107 |   });
108 | 
109 |   const { data: schools = [], isLoading } = useSchools();
110 |   const { data: cities = [] } = useCities();
111 |   const deleteSchool = useDeleteSchool();
112 |   const prefetchSchool = usePrefetchSchool();
113 | 
114 |   const handleOpenModal = useCallback(() => {
115 |     setForm({
116 |       name: "",
117 |       cityId: selectedCity.id || cities[0]?.id || "",
118 |       sourceUrl: "",
119 |       director: "",
120 |       phone: "",
121 |     });
122 |     setMatchedContacts([]);
123 |     setIsModalOpen(true);
124 |   }, [selectedCity.id, cities]);
125 | 
126 |   const fetchContacts = async (schoolName: string) => {
127 |     if (!schoolName || schoolName.trim().length < 1)
128 |       return setMatchedContacts([]);
129 |     const currentCityName =
130 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
131 |     if (currentCityName.toLowerCase() !== "львів")
132 |       return setMatchedContacts([]);
133 |     try {
134 |       const data = await qc.fetchQuery<SchoolContact[]>({
135 |         queryKey: ["schoolContacts", schoolName, currentCityName],
136 |         queryFn: async () => {
137 |           const res = await api.get<SchoolContact[]>(
138 |             `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
139 |             {
140 |               headers: {
141 |                 Authorization: `Bearer ${localStorage.getItem("token")}`,
142 |               },
143 |             },
144 |           );
145 |           return res.data;
146 |         },
147 |         staleTime: 1000 * 60 * 5, 
148 |       });
149 | 
150 |       setMatchedContacts(data);
151 |       if (data.length > 0) {
152 |         const director =
153 |           data.find(
154 |             (c: SchoolContact) =>
155 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
156 |           ) || data[0];
157 |         setForm((f) => ({
158 |           ...f,
159 |           director: director.contactName,
160 |           phone: director.phone,
161 |         }));
162 |       }
163 |     } catch (e) {
164 |       console.error(e);
165 |     }
166 |   };
167 | 
168 |   const handleNameChange = (value: string) => {
169 |     setForm({ ...form, name: value });
170 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
171 |     if (value.length < 2) {
172 |       setShowSuggestions(false);
173 |       setIsSearching(false);
174 |       setMatchedContacts([]);
175 |       return;
176 |     }
177 |     setIsSearching(true);
178 |     setShowSuggestions(true);
179 |     debounceTimer.current = setTimeout(async () => {
180 |       try {
181 |         const [externalData] = await Promise.all([
182 |           qc.fetchQuery({
183 |             queryKey: ["schoolSearchExternal", value],
184 |             queryFn: async () => {
185 |               const res = await api.get(
186 |                 `/schools/search?q=${encodeURIComponent(value)}&type=Школа`,
187 |                 {
188 |                   headers: {
189 |                     Authorization: `Bearer ${localStorage.getItem("token")}`,
190 |                   },
191 |                 },
192 |               );
193 |               return res.data;
194 |             },
195 |             staleTime: 1000 * 60 * 5,
196 |           }),
197 |           fetchContacts(value),
198 |         ]);
199 |         setSuggestions(externalData);
200 |       } catch (e) {
201 |         console.error(e);
202 |       } finally {
203 |         setIsSearching(false);
204 |       }
205 |     }, 400);
206 |   };
207 | 
208 |   const handleSelectSuggestion = (name: string, url: string) => {
209 |     setForm({ ...form, name, sourceUrl: url });
210 |     setShowSuggestions(false);
211 |     fetchContacts(name);
212 |   };
213 | 
214 |   const handleAddSchool = (e: React.FormEvent) => {
215 |     e.preventDefault();
216 |     if (!form.name.trim() || !form.cityId) return;
217 |     addSchoolMutation.mutate({ ...form, type: "Школа" });
218 |   };
219 | 
220 |   const handleDeleteSchool = useCallback(
221 |     async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
222 |       e.stopPropagation();
223 |       if (userRole !== "SUPERADMIN") return;
224 |       if (
225 |         !window.confirm(
226 |           `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
227 |         )
228 |       )
229 |         return;
230 |       await deleteSchool.mutateAsync(schoolId);
231 |     },
232 |     [deleteSchool, userRole],
233 |   );
234 | 
235 |   const debouncedSearch = useMemo(() => searchQuery, [searchQuery]);
236 | 
237 |   const baseFiltered = useMemo(
238 |     () =>
239 |       schools.filter((s) => {
240 |         const isCityMatch = selectedCity.id
241 |           ? s.cityId === selectedCity.id
242 |           : true;
243 |         const isFilterMatch = activeFilter
244 |           ? classifySchool(s) === activeFilter
245 |           : true;
246 |         const isSizeMatch = sizeFilter
247 |           ? classifySize(s, "Школа") === sizeFilter
248 |           : true;
249 |         return (
250 |           isCityMatch && s.type === "Школа" && isFilterMatch && isSizeMatch
251 |         );
252 |       }),
253 |     [schools, selectedCity.id, activeFilter, sizeFilter],
254 |   );
255 | 
256 |   const filteredSchools = useMemo(() => {
257 |     if (!debouncedSearch.trim()) return baseFiltered;
258 |     const q = debouncedSearch.toLowerCase().trim();
259 |     return baseFiltered.filter(
260 |       (s) =>
261 |         s.name?.toLowerCase().includes(q) ||
262 |         s.city?.name?.toLowerCase().includes(q) ||
263 |         s.director?.toLowerCase().includes(q) ||
264 |         s.address?.toLowerCase().includes(q),
265 |     );
266 |   }, [baseFiltered, debouncedSearch]);
267 | 
268 |   return (
269 |     <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
270 |       {/* Шапка */}
271 |       <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
272 |         <div className="min-w-0">
273 |           <h1 className="text-xl font-bold text-slate-800 leading-tight">
274 |             Школи
275 |             {selectedCity.id && (
276 |               <span className="ml-2 text-sm font-normal text-blue-500">
277 |                 · {selectedCity.name}
278 |               </span>
279 |             )}
280 |           </h1>
281 |         </div>
282 |         <div className="flex gap-2 shrink-0">
283 |           {userRole === "SUPERADMIN" && (
284 |             <button
285 |               onClick={() => {
286 |                 if (!selectedCity.id) return alert("Спочатку оберіть місто");
287 |                 if (
288 |                   !window.confirm(
289 |                     `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
290 |                   )
291 |                 )
292 |                   return;
293 | 
294 |                 setDotCount(3);
295 |                 const dotInterval = setInterval(() => {
296 |                   setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
297 |                 }, 500);
298 | 
299 |                 bulkImportMutation.mutate(selectedCity.id, {
300 |                   onSettled: () => clearInterval(dotInterval),
301 |                 });
302 |               }}
303 |               disabled={bulkImportMutation.isPending}
304 |               className="md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
305 |             >
306 |               {bulkImportMutation.isPending ? (
307 |                 <span className="font-medium">
308 |                   Імпортую{"·".repeat(dotCount)}
309 |                 </span>
310 |               ) : (
311 |                 <>📥 Імпорт з isuo</>
312 |               )}
313 |             </button>
314 |           )}
315 |           <button
316 |             onClick={handleOpenModal}
317 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
318 |           >
319 |             + Додати
320 |           </button>
321 |         </div>
322 |       </div>
323 | 
324 |       {/* StatsBar */}
325 |       <div className="shrink-0">
326 |         <Suspense
327 |           fallback={
328 |             <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
329 |           }
330 |         >
331 |           <StatsBar
332 |             schools={schools.filter(
333 |               (s) =>
334 |                 (selectedCity.id ? s.cityId === selectedCity.id : true) &&
335 |                 s.type === "Школа",
336 |             )}
337 |             activeFilter={activeFilter}
338 |             onFilterChange={setActiveFilter}
339 |             sizeFilter={sizeFilter}
340 |             onSizeFilterChange={setSizeFilter}
341 |             schoolType="Школа"
342 |           />
343 |         </Suspense>
344 |       </div>
345 | 
346 |       {/* Пошук */}
347 |       <div className="relative shrink-0 mb-4 mt-2">
348 |         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
349 |           <svg
350 |             className="w-5 h-5 text-slate-400"
351 |             fill="none"
352 |             stroke="currentColor"
353 |             viewBox="0 0 24 24"
354 |           >
355 |             <path
356 |               strokeLinecap="round"
357 |               strokeLinejoin="round"
358 |               strokeWidth={2}
359 |               d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
360 |             />
361 |           </svg>
362 |         </div>
363 |         <input
364 |           type="text"
365 |           value={searchQuery}
366 |           onChange={(e) => setSearchQuery(e.target.value)}
367 |           placeholder="Пошук за назвою, директором, адресою..."
368 |           className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
369 |         />
370 |         {searchQuery && (
371 |           <button
372 |             onClick={() => setSearchQuery("")}
373 |             className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
374 |           >
375 |             <svg
376 |               className="w-5 h-5"
377 |               fill="none"
378 |               stroke="currentColor"
379 |               viewBox="0 0 24 24"
380 |             >
381 |               <path
382 |                 strokeLinecap="round"
383 |                 strokeLinejoin="round"
384 |                 strokeWidth={2}
385 |                 d="M6 18L18 6M6 6l12 12"
386 |               />
387 |             </svg>
388 |           </button>
389 |         )}
390 |       </div>
391 | 
392 |       {/* Лічильник */}
393 |       <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
394 |         {filteredSchools.length === baseFiltered.length
395 |           ? `${baseFiltered.length} шкіл`
396 |           : `${filteredSchools.length} з ${baseFiltered.length} шкіл`}
397 |         {(activeFilter || sizeFilter) && (
398 |           <button
399 |             onClick={() => {
400 |               setActiveFilter(null);
401 |               setSizeFilter(null);
402 |             }}
403 |             className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
404 |           >
405 |             скинути фільтри
406 |           </button>
407 |         )}
408 |       </p>
409 | 
410 |       {/* Компоненти списків */}
411 |       {isLoading ? (
412 |         <div className="flex flex-col gap-2.5 flex-1">
413 |           {Array.from({ length: 8 }).map((_, i) => (
414 |             <div
415 |               key={i}
416 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
417 |               style={{ opacity: 1 - i * 0.1 }}
418 |             >
419 |               <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
420 |               <div className="flex justify-between">
421 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
422 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
423 |               </div>
424 |             </div>
425 |           ))}
426 |         </div>
427 |       ) : (
428 |         <>
429 |           {/* Мобільний: віртуалізований список карток */}
430 |           <div className="md:hidden flex-1 w-full overflow-hidden">
431 |             <VirtualSchoolList
432 |               schools={filteredSchools}
433 |               itemHeight={110}
434 |               renderItem={(school, index) => (
435 |                 <div
436 |                   className="pb-2.5"
437 |                   onMouseEnter={() => prefetchSchool(school.id)}
438 |                 >
439 |                   <SchoolCard
440 |                     school={school}
441 |                     index={index}
442 |                     onDelete={handleDeleteSchool}
443 |                     stages={PIPELINE_STAGES}
444 |                   />
445 |                 </div>
446 |               )}
447 |             />
448 |           </div>
449 | 
450 |           {/* Десктоп: таблиця з віртуалізованим tbody */}
451 |           <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
452 |             <Suspense
453 |               fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
454 |             >
455 |               <VirtualDesktopTable
456 |                 schools={filteredSchools}
457 |                 searchQuery={searchQuery}
458 |                 onDelete={handleDeleteSchool}
459 |                 stages={PIPELINE_STAGES}
460 |               />
461 |             </Suspense>
462 |           </div>
463 |         </>
464 |       )}
465 | 
466 |       {/* Мобільна плаваюча кнопка FAB */}
467 |       <button
468 |         onClick={handleOpenModal}
469 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
470 |       >
471 |         +
472 |       </button>
473 | 
474 |       {/* Модальне вікно */}
475 |       {isModalOpen && (
476 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
477 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
478 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
479 |               <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
480 |               <button
481 |                 onClick={() => setIsModalOpen(false)}
482 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
483 |               >
484 |                 ✕
485 |               </button>
486 |             </div>
487 | 
488 |             <form
489 |               onSubmit={handleAddSchool}
490 |               className="p-6 flex flex-col gap-4 overflow-y-auto"
491 |             >
492 |               <div className="relative">
493 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
494 |                   Назва школи
495 |                 </label>
496 |                 <input
497 |                   type="text"
498 |                   value={form.name}
499 |                   onChange={(e) => handleNameChange(e.target.value)}
500 |                   onBlur={() =>
501 |                     setTimeout(() => setShowSuggestions(false), 150)
502 |                   }
503 |                   placeholder="Наприклад: Школа №1"
504 |                   required
505 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
506 |                 />
507 |                 {showSuggestions && (
508 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
509 |                     {isSearching ? (
510 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
511 |                         Пошук...
512 |                       </li>
513 |                     ) : suggestions.length > 0 ? (
514 |                       suggestions.map((s, i) => (
515 |                         <li
516 |                           key={i}
517 |                           onMouseDown={() =>
518 |                             handleSelectSuggestion(s.name, s.url)
519 |                           }
520 |                           className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
521 |                         >
522 |                           {s.name}
523 |                         </li>
524 |                       ))
525 |                     ) : (
526 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
527 |                         Нічого не знайдено
528 |                       </li>
529 |                     )}
530 |                   </ul>
531 |                 )}
532 |               </div>
533 | 
534 |               {!selectedCity.id && (
535 |                 <div>
536 |                   <label className="block text-sm font-medium text-slate-600 mb-1.5">
537 |                     Місто
538 |                   </label>
539 |                   <select
540 |                     value={form.cityId}
541 |                     onChange={(e) =>
542 |                       setForm({ ...form, cityId: e.target.value })
543 |                     }
544 |                     required
545 |                     className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
546 |                   >
547 |                     <option value="">— Оберіть місто —</option>
548 |                     {cities.map((c) => (
549 |                       <option key={c.id} value={c.id}>
550 |                         {c.name}
551 |                       </option>
552 |                     ))}
553 |                   </select>
554 |                 </div>
555 |               )}
556 | 
557 |               <div>
558 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
559 |                   Контакт{" "}
560 |                   <span className="ml-1 text-xs font-normal text-slate-400">
561 |                     (автозаповнення)
562 |                   </span>
563 |                 </label>
564 |                 {matchedContacts.length > 0 && (
565 |                   <div className="flex flex-wrap gap-1.5 mb-3">
566 |                     {matchedContacts.map((c, i) => (
567 |                       <button
568 |                         key={i}
569 |                         type="button"
570 |                         onClick={() =>
571 |                           setForm((f) => ({
572 |                             ...f,
573 |                             director: c.contactName,
574 |                             phone: c.phone,
575 |                           }))
576 |                         }
577 |                         className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
578 |                       >
579 |                         {c.role ? `${c.role}: ` : ""}
580 |                         {c.contactName}
581 |                       </button>
582 |                     ))}
583 |                   </div>
584 |                 )}
585 |                 <input
586 |                   type="text"
587 |                   value={form.director}
588 |                   onChange={(e) =>
589 |                     setForm({ ...form, director: e.target.value })
590 |                   }
591 |                   placeholder="Микола Петренко"
592 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
593 |                 />
594 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
595 |                   Телефон
596 |                 </label>
597 |                 <input
598 |                   type="text"
599 |                   value={form.phone}
600 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
601 |                   placeholder="0671234567"
602 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
603 |                 />
604 |               </div>
605 | 
606 |               <div className="flex gap-3 mt-4">
607 |                 <button
608 |                   type="button"
609 |                   onClick={() => setIsModalOpen(false)}
610 |                   className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
611 |                 >
612 |                   Скасувати
613 |                 </button>
614 |                 <button
615 |                   type="submit"
616 |                   disabled={addSchoolMutation.isPending}
617 |                   className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
618 |                 >
619 |                   {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
620 |                 </button>
621 |               </div>
622 |             </form>
623 |           </div>
624 |         </div>
625 |       )}
626 |     </div>
627 |   );
628 | }
629 | 
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
 20 |   city?: { id: string; name: string };
 21 |   events?: Event[];
 22 | }
 23 | 
 24 | export interface SchoolProfileData {
 25 |   id: string;
 26 |   cityId: string;
 27 |   name: string;
 28 |   type: string;
 29 |   city: string;
 30 |   address: string;
 31 |   director: string;
 32 |   phone: string;
 33 |   email: string;
 34 |   childrenCount: number;
 35 |   notes: string;
 36 | }
 37 | 
 38 | export interface SchoolContact {
 39 |   contactName: string;
 40 |   phone: string;
 41 |   role?: string;
 42 | }
 43 | 
 44 | export interface Project {
 45 |   id: string;
 46 |   name: string;
 47 |   color: string;
 48 | }
 49 | 
 50 | export interface EventFormData {
 51 |   project: string;
 52 |   date: string;
 53 |   time: string;
 54 |   childrenPlanned: string;
 55 |   price: string;
 56 |   address: string;
 57 |   contactPerson: string;
 58 |   contactPhone: string;
 59 | }
 60 | 
 61 | export interface CreateEventPayload {
 62 |   project: string;
 63 |   date: string;
 64 |   time: string;
 65 |   childrenPlanned: number;
 66 |   price: number;
 67 |   address: string;
 68 |   contactPerson: string;
 69 |   contactPhone: string;
 70 |   schoolId: string;
 71 |   cityId: string;
 72 | }
 73 | 
 74 | export interface User {
 75 |   id: string;
 76 |   name: string;
 77 |   email: string;
 78 |   phone?: string;
 79 |   role: string;
 80 |   cityId?: string;
 81 |   city?: { id: string; name: string };
 82 | }
 83 | 
 84 | export interface EventHistory {
 85 |   id: string;
 86 |   action: string;
 87 |   comment?: string;
 88 |   userName: string;
 89 |   role: string;
 90 |   createdAt: string;
 91 | }
 92 | 
 93 | export interface ExpenseItem {
 94 |   category?: string;
 95 |   name?: string;
 96 |   amount: number;
 97 | }
 98 | 
 99 | export interface SalaryItem {
100 |   userId: string;
101 |   name: string;
102 |   amount: number;
103 |   role?: string;
104 | }
105 | 
106 | export interface EventReport {
107 |   childrenCount: number;
108 |   totalSum: number;
109 |   schoolSum: number;
110 |   remainderSum: number;
111 |   directorSatisfied?: boolean;
112 |   teachersSatisfied?: boolean;
113 |   hadIssues?: boolean;
114 |   comment?: string;
115 |   rating?: number;
116 |   expenses: ExpenseItem[];
117 |   salaries: SalaryItem[];
118 | }
119 | 
120 | export interface Event {
121 |   id: string;
122 |   schoolId: string;
123 |   cityId: string;
124 |   project: string;
125 |   date: string;
126 |   time?: string;
127 |   status: string;
128 |   childrenPlanned?: number;
129 |   price?: number;
130 |   paymentMethod?: string;
131 |   address?: string;
132 |   contactPerson?: string;
133 |   contactPhone?: string;
134 |   crew?: Crew;
135 |   report?: EventReport;
136 |   history?: EventHistory[];
137 |   preparation?: EventPreparation;
138 |   school?: { id: string; name: string; type: string };
139 |   city?: { id: string; name: string };
140 | }
141 | 
142 | export interface Crew {
143 |   id: string;
144 |   name: string;
145 |   cityId: string;
146 |   hostId?: string;
147 |   driverId?: string;
148 |   host?: { id: string; name: string };
149 |   driver?: { id: string; name: string };
150 |   car?: string;
151 |   phone?: string;
152 | }
153 | 
154 | export interface EventPreparation {
155 |   assignCrew: string;
156 |   bookEquipment: string;
157 |   prepareDocs: string;
158 |   prepareMaterials: string;
159 |   remindSchool: string;
160 | }
161 | 
162 | export interface CityProfile extends City {
163 |   events: Event[];
164 |   crews: Crew[];
165 |   schools?: School[];
166 | }
167 | 
168 | export interface PipelineStage {
169 |   key: string;
170 |   name: string;
171 | }
172 | 
173 | export interface IssueReport {
174 |   id: string;
175 |   eventId: string;
176 |   schoolName: string;
177 |   eventName: string;
178 |   message: string;
179 |   cityId: string;
180 |   status: string;
181 |   createdAt: string;
182 | }
183 | 
```

### File: apps/frontend/src/utils/formatCurrency.ts
```ts
  0 | /**
  1 |  * Форматує суму у форматі uk-UA (для відображення в грн).
  2 |  * Захищає від NaN/undefined/null — завжди повертає валідний рядок.
  3 |  */
  4 | export function formatCurrency(amount: number | null | undefined): string {
  5 |   return new Intl.NumberFormat("uk-UA").format(Math.round(amount || 0));
  6 | }
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

### File: apps/frontend/vercel.json
```json
  0 | 
  1 | 
  2 | {
  3 |   "rewrites": [
  4 |     {
  5 |       "source": "/(.*)",
  6 |       "destination": "/index.html"
  7 |     }
  8 |   ]
  9 | }
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

### File: collect-code.js
```js
  0 | const fs = require('fs');
  1 | const path = require('path');
  2 | 
  3 | const outputFile = 'combined_roles_controllers.md';
  4 | 
  5 | fs.writeFileSync(outputFile, '# Файли Roles Guard та Контролерів\n\n');
  6 | 
  7 | const filesToCollect = [
  8 |   'apps/backend/src/auth/guards/roles.guard.ts',
  9 |   'apps/backend/src/auth/decorators/roles.decorator.ts',
 10 |   'apps/backend/src/auth/interfaces/jwt-user.interface.ts',
 11 |   'apps/backend/src/schools/schools.controller.ts',
 12 |   'apps/backend/src/events/events.controller.ts',
 13 |   'apps/backend/src/finance/finance.controller.ts',
 14 |   'apps/backend/src/cities/cities.controller.ts'
 15 | ];
 16 | 
 17 | let collectedCount = 0;
 18 | 
 19 | console.log('🚀 Починаю збір файлів Role Guard та контролерів...\n');
 20 | 
 21 | filesToCollect.forEach(filePath => {
 22 |   if (!fs.existsSync(filePath)) {
 23 |     console.warn(`[!] Файл не знайдено: ${filePath}`);
 24 |     return;
 25 |   }
 26 | 
 27 |   const content = fs.readFileSync(filePath, 'utf-8');
 28 |   const ext = path.extname(filePath).replace('.', '');
 29 |   const lang = ['ts', 'tsx'].includes(ext) ? 'typescript' : ext;
 30 | 
 31 |   const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
 32 |   fs.appendFileSync(outputFile, mdBlock);
 33 |   console.log(`[+] Додано: ${filePath}`);
 34 |   collectedCount++;
 35 | });
 36 | 
 37 | console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);
```

### File: package.json
```json
  0 | {
  1 |   "name": "CRM",
  2 |   "private": true,
  3 |   "scripts": {
  4 |     "dev": "concurrently \"pnpm --filter backend start:dev\" \"pnpm --filter frontend dev\"",
  5 |     "test": "concurrently --kill-others-on-fail \"pnpm --filter backend test\" \"pnpm --filter frontend test:run\"",
  6 |     "test:unit": "concurrently \"pnpm --filter backend test\" \"pnpm --filter frontend test:run\"",
  7 |     "test:e2e:backend": "pnpm --filter backend test:e2e",
  8 |     "test:e2e:frontend": "pnpm --filter frontend test:e2e",
  9 |     "test:e2e": "concurrently --kill-others-on-fail \"pnpm test:e2e:backend\" \"pnpm test:e2e:frontend\"",
 10 |     "test:all": "pnpm test:unit && pnpm test:e2e",
 11 |     "test:coverage": "concurrently \"pnpm --filter backend test:cov\" \"pnpm --filter frontend test:coverage\""
 12 |   },
 13 |   "devDependencies": {
 14 |     "concurrently": "^8.2.2"
 15 |   },
 16 |   "prisma": {
 17 |     "schema": "apps/backend/prisma/schema.prisma"
 18 |   }
 19 | }
 20 | 
```
