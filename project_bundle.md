# Project Source Code

## Structure
```
├── .gitignore
├── README.md
├── apps
│   ├── backend
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── .prettierrc
│   │   ├── README.md
│   │   ├── eslint-errors.txt
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
│   │   │   │   ├── 20260701232948_add_missing_indexes
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260701234519_user_role_enum
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260701234848_add_host_role
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260701235202_preparation_status_enum
│   │   │   │   │   └── migration.sql
│   │   │   │   ├── 20260702123544_add_performance_indexes
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
│   │   │   ├── common
│   │   │   │   ├── cache
│   │   │   │   │   └── redis-cache.module.ts
│   │   │   │   ├── dto
│   │   │   │   │   ├── page-meta.dto.ts
│   │   │   │   │   └── page-options.dto.ts
│   │   │   │   ├── filters
│   │   │   │   │   └── all-exceptions.filter.ts
│   │   │   │   └── logger
│   │   │   │       └── logger.module.ts
│   │   │   ├── config
│   │   │   │   └── env.validation.ts
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
│   │   │   │   │   ├── find-contacts-query.dto.ts
│   │   │   │   │   ├── find-schools-query.dto.ts
│   │   │   │   │   ├── school-query.dto.ts
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
│   │   ├── ts-errors.txt
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   ├── docker-compose.yml
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
│       │   │   ├── modals
│       │   │   │   └── EventSchema.ts
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
│       │   │   │       ├── EventSchema.ts
│       │   │   │       ├── IssueModal.tsx
│       │   │   │       ├── ReportModal.tsx
│       │   │   │       ├── RescheduleModal.tsx
│       │   │   │       └── SchoolEditSchema.ts
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
│       │   │   ├── AuthContext.tsx
│       │   │   └── CityContext.tsx
│       │   ├── hooks
│       │   │   ├── useApi.ts
│       │   │   ├── useAuth.ts
│       │   │   ├── useCalendar.ts
│       │   │   ├── useCities.ts
│       │   │   ├── useEmployees.ts
│       │   │   └── useSchoolProfile.ts
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
│       │       ├── formatCurrency.ts
│       │       └── preparationStatus.ts
│       ├── tailwind.config.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vercel.json
│       └── vite.config.ts
├── collect-code.js
├── combined_core_config.md
├── combined_performance_files.md
├── package.json
├── packages
│   └── shared
├── pnpm-workspace.yaml
```

### File: apps/backend/.env.example
```example
  0 | NODE_ENV=development
  1 | PORT=3000
  2 | 
  3 | DATABASE_URL=postgresql://user:password@localhost:5432/db
  4 | DIRECT_URL=postgresql://user:password@localhost:5432/db
  5 | 
  6 | FRONTEND_URL=http://localhost:5173
  7 | REDIS_URL=redis://localhost:6379
  8 | 
  9 | TELEGRAM_BOT_TOKEN=
 10 | 
 11 | SEED_ADMIN_EMAIL=admin@example.com
 12 | SEED_ADMIN_PASSWORD=changeme
 13 | ALLOW_PROD_SEED=false
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
 22 |     "@nestjs/cache-manager": "^3.1.3",
 23 |     "@nestjs/common": "^11.0.1",
 24 |     "@nestjs/config": "^4.0.0",
 25 |     "@nestjs/core": "^11.0.1",
 26 |     "@nestjs/jwt": "^11.0.2",
 27 |     "@nestjs/passport": "^11.0.5",
 28 |     "@nestjs/platform-express": "^11.0.1",
 29 |     "@nestjs/throttler": "^6.5.0",
 30 |     "@prisma/client": "6.19.0",
 31 |     "axios": "^1.18.0",
 32 |     "bcrypt": "^6.0.0",
 33 |     "cache-manager": "^7.2.9",
 34 |     "cache-manager-redis-yet": "^5.1.5",
 35 |     "cheerio": "^1.2.0",
 36 |     "class-transformer": "^0.5.1",
 37 |     "class-validator": "^0.15.1",
 38 |     "cookie-parser": "^1.4.7",
 39 |     "dotenv": "^17.4.2",
 40 |     "helmet": "^8.2.0",
 41 |     "joi": "^18.2.3",
 42 |     "nestjs-pino": "^4.6.1",
 43 |     "node-telegram-bot-api": "0.64.0",
 44 |     "passport": "^0.7.0",
 45 |     "passport-jwt": "^4.0.1",
 46 |     "pino-http": "^11.0.0",
 47 |     "reflect-metadata": "^0.2.2",
 48 |     "rxjs": "^7.8.1"
 49 |   },
 50 |   "devDependencies": {
 51 |     "@eslint/eslintrc": "^3.2.0",
 52 |     "@eslint/js": "^9.18.0",
 53 |     "@nestjs/cli": "^11.0.0",
 54 |     "@nestjs/schematics": "^11.0.0",
 55 |     "@nestjs/testing": "^11.0.1",
 56 |     "@types/bcrypt": "^6.0.0",
 57 |     "@types/cookie-parser": "^1.4.10",
 58 |     "@types/express": "^5.0.0",
 59 |     "@types/jest": "^29.0.0",
 60 |     "@types/node": "^24.0.0",
 61 |     "@types/node-telegram-bot-api": "^0.64.15",
 62 |     "@types/passport-jwt": "^4.0.1",
 63 |     "@types/supertest": "^7.0.0",
 64 |     "eslint": "^9.18.0",
 65 |     "eslint-config-prettier": "^10.0.1",
 66 |     "eslint-plugin-prettier": "^5.2.2",
 67 |     "globals": "^17.0.0",
 68 |     "jest": "^29.0.0",
 69 |     "jest-mock-extended": "^3.0.0",
 70 |     "pino-pretty": "^13.0.0",
 71 |     "prettier": "^3.4.2",
 72 |     "prisma": "6.19.0",
 73 |     "source-map-support": "^0.5.21",
 74 |     "supertest": "^7.0.0",
 75 |     "ts-jest": "^29.2.5",
 76 |     "ts-loader": "^9.5.2",
 77 |     "ts-node": "^10.9.2",
 78 |     "tsconfig-paths": "^4.2.0",
 79 |     "typescript": "^5.7.3",
 80 |     "typescript-eslint": "^8.20.0"
 81 |   },
 82 |   "jest": {
 83 |     "moduleFileExtensions": [
 84 |       "js",
 85 |       "json",
 86 |       "ts"
 87 |     ],
 88 |     "rootDir": "src",
 89 |     "testRegex": ".*\\.spec\\.ts$",
 90 |     "transform": {
 91 |       "^.+\\.(t|j)s$": "ts-jest"
 92 |     },
 93 |     "collectCoverageFrom": [
 94 |       "**/*.(t|j)s"
 95 |     ],
 96 |     "coverageDirectory": "../coverage",
 97 |     "testEnvironment": "node",
 98 |     "moduleNameMapper": {
 99 |       "^src/(.*)$": "<rootDir>/$1"
100 |     }
101 |   },
102 |   "prisma": {
103 |     "schema": "prisma/schema.prisma"
104 |   }
105 | }
106 | 
```

### File: apps/backend/prisma/schema.prisma
```prisma
  0 | generator client {
  1 |   provider = "prisma-client-js"
  2 | }
  3 | 
  4 | datasource db {
  5 |   provider  = "postgresql"
  6 |   url       = env("DATABASE_URL")
  7 |   directUrl = env("DIRECT_URL")
  8 | }
  9 | 
 10 | model User {
 11 |   id             String       @id @default(uuid())
 12 |   name           String
 13 |   email          String       @unique
 14 |   phone          String?
 15 |   password       String
 16 |   role           UserRole     @default(MANAGER)
 17 |   cityId         String?
 18 |   createdAt      DateTime     @default(now())
 19 |   updatedAt      DateTime     @updatedAt
 20 |   telegramId     String?
 21 |   telegramChatId String?
 22 |   car            String?
 23 |   balance        Decimal      @default(0) @db.Decimal(12, 2)
 24 |   managedCities  City[]       @relation("CityManager")
 25 |   crewAsDriver   Crew[]       @relation("DriverCrew")
 26 |   crewAsHost     Crew[]       @relation("HostCrew")
 27 |   city           City?        @relation(fields: [cityId], references: [id])
 28 |   salaryItems    SalaryItem[]
 29 | 
 30 |   @@index([role])
 31 |   @@index([cityId])
 32 | }
 33 | 
 34 | model City {
 35 |   id        String        @id @default(uuid())
 36 |   name      String
 37 |   managerId String?
 38 |   createdAt DateTime      @default(now())
 39 |   manager   User?         @relation("CityManager", fields: [managerId], references: [id])
 40 |   crews     Crew[]
 41 |   events    Event[]
 42 |   issues    IssueReport[]
 43 |   schools   School[]
 44 |   users     User[]
 45 | }
 46 | 
 47 | model School {
 48 |   id            String   @id @default(uuid())
 49 |   name          String
 50 |   type          String
 51 |   cityId        String
 52 |   address       String?
 53 |   director      String?
 54 |   phone         String?
 55 |   email         String?
 56 |   notes         String?
 57 |   childrenCount Int?
 58 |   isHotClient   Boolean  @default(false)
 59 |   rating        Float?
 60 |   createdAt     DateTime @default(now())
 61 |   updatedAt     DateTime @updatedAt
 62 |   events        Event[]
 63 |   city          City     @relation(fields: [cityId], references: [id])
 64 | 
 65 |   @@index([cityId])
 66 |   @@index([updatedAt, cityId])
 67 | }
 68 | 
 69 | model Crew {
 70 |   id        String   @id @default(uuid())
 71 |   name      String
 72 |   cityId    String
 73 |   hostId    String?
 74 |   driverId  String?
 75 |   car       String?
 76 |   carPlate  String?
 77 |   phone     String?
 78 |   isActive  Boolean  @default(true)
 79 |   createdAt DateTime @default(now())
 80 |   city      City     @relation(fields: [cityId], references: [id])
 81 |   driver    User?    @relation("DriverCrew", fields: [driverId], references: [id])
 82 |   host      User?    @relation("HostCrew", fields: [hostId], references: [id])
 83 |   events    Event[]
 84 | }
 85 | 
 86 | model Event {
 87 |   id              String            @id @default(uuid())
 88 |   cityId          String
 89 |   schoolId        String
 90 |   crewId          String?
 91 |   project         String
 92 |   date            DateTime
 93 |   time            String?
 94 |   status          EventStatus       @default(BASE)
 95 |   childrenPlanned Int?
 96 |   childrenActual  Int?
 97 |   price           Float?
 98 |   received        Float?
 99 |   paymentMethod   String?
100 |   address         String?
101 |   contactPerson   String?
102 |   contactPhone    String?
103 |   equipment       String?
104 |   nextContact     DateTime?
105 |   nextProject     String?
106 |   responsibleId   String?
107 |   createdAt       DateTime          @default(now())
108 |   updatedAt       DateTime          @updatedAt
109 |   city            City              @relation(fields: [cityId], references: [id])
110 |   crew            Crew?             @relation(fields: [crewId], references: [id])
111 |   school          School            @relation(fields: [schoolId], references: [id])
112 |   history         EventHistory[]
113 |   preparation     EventPreparation?
114 |   report          EventReport?
115 |   files           File[]
116 |   issues          IssueReport[]
117 | 
118 |   @@index([cityId])
119 |   @@index([status])
120 |   @@index([schoolId])
121 |   @@index([date, status, cityId])
122 | }
123 | 
124 | model EventReport {
125 |   id                String        @id @default(uuid())
126 |   eventId           String        @unique
127 |   directorSatisfied Boolean?
128 |   teachersSatisfied Boolean?
129 |   hadIssues         Boolean       @default(false)
130 |   comment           String?
131 |   rating            Float?
132 |   createdAt         DateTime      @default(now())
133 |   announcementDone  Boolean       @default(false)
134 |   materialShown     Boolean       @default(false)
135 |   childrenCount     Int           @default(0)
136 |   classesCount      Int           @default(0)
137 |   privilegedCount   Int           @default(0)
138 |   showingsCount     Int           @default(0)
139 |   totalSum          Float         @default(0)
140 |   schoolSum         Float         @default(0)
141 |   remainderSum      Float         @default(0)
142 |   event             Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)
143 |   photos            File[]
144 |   expenseItems      ExpenseItem[]
145 |   salaryItems       SalaryItem[]
146 | }
147 | 
148 | model File {
149 |   id        String       @id @default(uuid())
150 |   name      String
151 |   url       String
152 |   size      Int
153 |   eventId   String?
154 |   reportId  String?
155 |   createdAt DateTime     @default(now())
156 |   event     Event?       @relation(fields: [eventId], references: [id])
157 |   report    EventReport? @relation(fields: [reportId], references: [id])
158 | }
159 | 
160 | model EventHistory {
161 |   id        String   @id @default(uuid())
162 |   eventId   String
163 |   action    String
164 |   comment   String?
165 |   userId    String
166 |   userName  String
167 |   role      String
168 |   createdAt DateTime @default(now())
169 |   event     Event    @relation(fields: [eventId], references: [id])
170 | 
171 |   @@index([eventId, createdAt])
172 | }
173 | 
174 | model EventPreparation {
175 |   id               String            @id @default(uuid())
176 |   eventId          String            @unique
177 |   assignCrew       PreparationStatus @default(PLANNED)
178 |   bookEquipment    PreparationStatus @default(PLANNED)
179 |   prepareDocs      PreparationStatus @default(PLANNED)
180 |   prepareMaterials PreparationStatus @default(PLANNED)
181 |   remindSchool     PreparationStatus @default(PLANNED)
182 |   event            Event             @relation(fields: [eventId], references: [id])
183 | }
184 | 
185 | model IssueReport {
186 |   id               String    @id @default(uuid())
187 |   eventId          String
188 |   schoolName       String
189 |   eventName        String
190 |   message          String
191 |   cityId           String
192 |   status           String    @default("Планується")
193 |   createdAt        DateTime  @default(now())
194 |   deadline         DateTime?
195 |   assignedUserId   String?
196 |   assignedUserName String?
197 |   city             City      @relation(fields: [cityId], references: [id])
198 |   event            Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)
199 | 
200 |   @@index([cityId])
201 |   @@index([eventId])
202 | }
203 | 
204 | model SchoolContact {
205 |   id           String   @id @default(uuid())
206 |   city         String   @default("Львів")
207 |   schoolNumber String
208 |   contactName  String
209 |   phone        String
210 |   role         String?
211 |   createdAt    DateTime @default(now())
212 | }
213 | 
214 | model Project {
215 |   id        String   @id @default(uuid())
216 |   name      String   @unique
217 |   color     String   @default("blue")
218 |   createdAt DateTime @default(now())
219 | }
220 | 
221 | model ExpenseItem {
222 |   id        String   @id @default(uuid())
223 |   reportId  String
224 |   category  String 
225 |   name      String?
226 |   amount    Decimal  @db.Decimal(12, 2)
227 |   createdAt DateTime @default(now())
228 | 
229 |   report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
230 | 
231 |   @@index([reportId])
232 | }
233 | 
234 | model SalaryItem {
235 |   id        String   @id @default(uuid())
236 |   reportId  String
237 |   userId    String?
238 |   userName  String
239 |   amount    Decimal  @db.Decimal(12, 2)
240 |   role      String? 
241 |   createdAt DateTime @default(now())
242 | 
243 |   report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
244 |   user   User?       @relation(fields: [userId], references: [id])
245 | 
246 |   @@index([reportId])
247 |   @@index([userId])
248 | }
249 | 
250 | enum UserRole {
251 |   SUPERADMIN
252 |   MANAGER
253 |   HOST
254 |   DRIVER
255 | }
256 | 
257 | enum PreparationStatus {
258 |   PLANNED
259 |   IN_PROGRESS
260 |   DONE
261 | }
262 | 
263 | enum EventStatus {
264 |   BASE
265 |   FIRST_CONTACT
266 |   INTERESTED
267 |   PRE_APPROVAL
268 |   DATE_CONFIRMED
269 |   PREPARATION
270 |   IN_PROGRESS
271 |   DONE
272 |   REPORT
273 |   RE_SALE
274 | }
275 | 
```

### File: apps/backend/prisma/seed-admin.js
```js
  0 | require('dotenv').config();
  1 | const { PrismaClient } = require('@prisma/client');
  2 | const bcrypt = require('bcrypt');
  3 | 
  4 | const prisma = new PrismaClient();
  5 | 
  6 | async function main() {
  7 |   const email = process.env.SEED_ADMIN_EMAIL;
  8 |   const password = process.env.SEED_ADMIN_PASSWORD;
  9 | 
 10 |   if (!email || !password) {
 11 |     console.error(
 12 |       'Помилка: SEED_ADMIN_EMAIL та SEED_ADMIN_PASSWORD мають бути задані в .env',
 13 |     );
 14 |     process.exit(1);
 15 |   }
 16 | 
 17 |   if (
 18 |     process.env.NODE_ENV === 'production' &&
 19 |     process.env.ALLOW_PROD_SEED !== 'true'
 20 |   ) {
 21 |     console.error(
 22 |       'Сідування в production заблоковано. Встановіть ALLOW_PROD_SEED=true для підтвердження.',
 23 |     );
 24 |     process.exit(1);
 25 |   }
 26 | 
 27 |   const hashedPassword = await bcrypt.hash(password, 10);
 28 | 
 29 |   console.log('Починаю створення адміна...');
 30 | 
 31 |   const admin = await prisma.user.upsert({
 32 |     where: { email: email },
 33 |     update: { password: hashedPassword },
 34 |     create: {
 35 |       name: 'Адміністратор',
 36 |       email: email,
 37 |       password: hashedPassword,
 38 |       role: 'SUPERADMIN',
 39 |     },
 40 |   });
 41 | 
 42 |   console.log('Адмін успішно створений або оновлений:', admin.email);
 43 | }
 44 | 
 45 | main()
 46 |   .catch((e) => {
 47 |     console.error('Помилка під час сідування:', e);
 48 |     process.exit(1);
 49 |   })
 50 |   .finally(async () => {
 51 |     await prisma.$disconnect();
 52 |   });
 53 | 
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
  1 | import { APP_GUARD } from '@nestjs/core';
  2 | import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
  3 | import { ConfigModule } from '@nestjs/config';
  4 | import { LoggerModule } from './common/logger/logger.module';
  5 | import { RedisCacheModule } from './common/cache/redis-cache.module';
  6 | import { envValidationSchema } from './config/env.validation';
  7 | import { AppController } from './app.controller';
  8 | import { AppService } from './app.service';
  9 | import { PrismaModule } from './prisma/prisma.module';
 10 | import { UsersModule } from './users/users.module';
 11 | import { AuthModule } from './auth/auth.module';
 12 | import { EventsModule } from './events/events.module';
 13 | import { CitiesModule } from './cities/cities.module';
 14 | import { SchoolsModule } from './schools/schools.module';
 15 | import { FinanceModule } from './finance/finance.module';
 16 | import { TelegramModule } from './telegram/telegram.module';
 17 | import { IssuesModule } from './issues/issues.module';
 18 | import { DashboardModule } from './dashboard/dashboard.module';
 19 | import { ProjectsModule } from './projects/projects.module';
 20 | @Module({
 21 |   imports: [
 22 |     ConfigModule.forRoot({
 23 |       isGlobal: true,
 24 |       validationSchema: envValidationSchema,
 25 |     }),
 26 |     LoggerModule,
 27 |     RedisCacheModule,
 28 |     ThrottlerModule.forRoot([
 29 |       {
 30 |         name: 'default',
 31 |         ttl: 60000,
 32 |         limit: 100,
 33 |       },
 34 |     ]),
 35 |     PrismaModule,
 36 |     UsersModule,
 37 |     AuthModule,
 38 |     EventsModule,
 39 |     CitiesModule,
 40 |     SchoolsModule,
 41 |     FinanceModule,
 42 |     TelegramModule,
 43 |     IssuesModule,
 44 |     DashboardModule,
 45 |     ProjectsModule,
 46 |   ],
 47 |   controllers: [AppController],
 48 |   providers: [
 49 |     AppService,
 50 |     {
 51 |       provide: APP_GUARD,
 52 |       useClass: ThrottlerGuard,
 53 |     },
 54 |   ],
 55 | })
 56 | export class AppModule {}
 57 | 
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
  3 |   Get,
  4 |   HttpCode,
  5 |   HttpStatus,
  6 |   Post,
  7 |   Req,
  8 |   Res,
  9 |   UseGuards,
 10 | } from '@nestjs/common';
 11 | import type { Request, Response } from 'express';
 12 | import { randomBytes } from 'crypto';
 13 | import { Throttle } from '@nestjs/throttler';
 14 | import { AuthService } from './auth.service';
 15 | import { AuthGuard } from './auth.guard';
 16 | import { LoginDto } from './dto/login.dto';
 17 | 
 18 | const isProd = process.env.NODE_ENV === 'production';
 19 | 
 20 | @Controller('auth')
 21 | export class AuthController {
 22 |   constructor(private authService: AuthService) {}
 23 | 
 24 |   @Throttle({ default: { ttl: 60000, limit: 5 } })
 25 |   @HttpCode(HttpStatus.OK)
 26 |   @Post('login')
 27 |   async login(
 28 |     @Body() signInDto: LoginDto,
 29 |     @Res({ passthrough: true }) res: Response,
 30 |   ) {
 31 |     const { access_token, user } = await this.authService.login(
 32 |       signInDto.email,
 33 |       signInDto.password,
 34 |     );
 35 |     const csrfToken = randomBytes(32).toString('hex');
 36 | 
 37 |     res.cookie('access_token', access_token, {
 38 |       httpOnly: true,
 39 |       secure: isProd,
 40 |       sameSite: isProd ? 'none' : 'lax',
 41 |       maxAge: 24 * 60 * 60 * 1000,
 42 |     });
 43 |     res.cookie('csrf_token', csrfToken, {
 44 |       httpOnly: false, // фронтенд має прочитати
 45 |       secure: isProd,
 46 |       sameSite: isProd ? 'none' : 'lax',
 47 |       maxAge: 24 * 60 * 60 * 1000,
 48 |     });
 49 | 
 50 |     return { user };
 51 |   }
 52 | 
 53 |   @UseGuards(AuthGuard)
 54 |   @Get('me')
 55 |   me(@Req() req: Request) {
 56 |     const payload = req['user'] as {
 57 |       sub: string;
 58 |       email: string;
 59 |       role: string;
 60 |       name: string;
 61 |     };
 62 |     return {
 63 |       user: {
 64 |         id: payload.sub,
 65 |         name: payload.name,
 66 |         email: payload.email,
 67 |         role: payload.role,
 68 |       },
 69 |     };
 70 |   }
 71 | 
 72 |   @HttpCode(HttpStatus.OK)
 73 |   @Post('logout')
 74 |   logout(@Res({ passthrough: true }) res: Response) {
 75 |     res.clearCookie('access_token');
 76 |     res.clearCookie('csrf_token');
 77 |     return { message: 'ok' };
 78 |   }
 79 | }
 80 | 
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
  1 | import { UserRole } from '@prisma/client';
  2 | 
  3 | export const ROLES_KEY = 'roles';
  4 | export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
  5 | 
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
  7 | import { UserRole } from '@prisma/client';
  8 | import { ROLES_KEY } from '../decorators/roles.decorator';
  9 | 
 10 | @Injectable()
 11 | export class RolesGuard implements CanActivate {
 12 |   constructor(private reflector: Reflector) {}
 13 | 
 14 |   canActivate(context: ExecutionContext): boolean {
 15 |     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
 16 |       ROLES_KEY,
 17 |       [context.getHandler(), context.getClass()],
 18 |     );
 19 |     if (!requiredRoles) return true;
 20 | 
 21 |     const { user } = context.switchToHttp().getRequest();
 22 |     if (!requiredRoles.includes(user?.role)) {
 23 |       throw new ForbiddenException('Недостатньо прав');
 24 |     }
 25 |     return true;
 26 |   }
 27 | }
 28 | 
```

### File: apps/backend/src/auth/interfaces/jwt-user.interface.ts
```ts
  0 | import { UserRole } from '@prisma/client';
  1 | 
  2 | export interface JwtUser {
  3 |   sub: string;
  4 |   name: string;
  5 |   role: UserRole;
  6 | }
  7 | 
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

### File: apps/backend/src/common/cache/redis-cache.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { CacheModule } from '@nestjs/cache-manager';
  2 | import { redisStore } from 'cache-manager-redis-yet';
  3 | 
  4 | @Module({
  5 |   imports: [
  6 |     CacheModule.registerAsync({
  7 |       isGlobal: true,
  8 |       useFactory: async () => ({
  9 |         store: await redisStore({
 10 |           url: process.env.REDIS_URL ?? 'redis://localhost:6379',
 11 |           ttl: 60_000,
 12 |         }),
 13 |       }),
 14 |     }),
 15 |   ],
 16 |   exports: [CacheModule],
 17 | })
 18 | export class RedisCacheModule {}
 19 | 
```

### File: apps/backend/src/common/dto/page-meta.dto.ts
```ts
  0 | export class PageMetaDto {
  1 |   totalItems: number;
  2 |   page: number;
  3 |   take: number;
  4 |   pageCount: number;
  5 |   hasNextPage: boolean;
  6 | 
  7 |   constructor(totalItems: number, page: number, take: number) {
  8 |     this.totalItems = totalItems;
  9 |     this.page = page;
 10 |     this.take = take;
 11 |     this.pageCount = Math.ceil(totalItems / take);
 12 |     this.hasNextPage = page < this.pageCount;
 13 |   }
 14 | }
 15 | 
```

### File: apps/backend/src/common/dto/page-options.dto.ts
```ts
  0 | import { Type } from 'class-transformer';
  1 | import { IsInt, Max, Min, IsOptional } from 'class-validator';
  2 | 
  3 | export class PageOptionsDto {
  4 |   @Type(() => Number)
  5 |   @IsInt()
  6 |   @Min(1)
  7 |   @IsOptional()
  8 |   page: number = 1;
  9 | 
 10 |   @Type(() => Number)
 11 |   @IsInt()
 12 |   @Min(1)
 13 |   @Max(50)
 14 |   @IsOptional()
 15 |   take: number = 10;
 16 | 
 17 |   get skip(): number {
 18 |     return (this.page - 1) * this.take;
 19 |   }
 20 | }
 21 | 
```

### File: apps/backend/src/common/filters/all-exceptions.filter.ts
```ts
  0 | import {
  1 |   ArgumentsHost,
  2 |   Catch,
  3 |   ExceptionFilter,
  4 |   HttpException,
  5 |   HttpStatus,
  6 |   Logger,
  7 | } from '@nestjs/common';
  8 | import { Request, Response } from 'express';
  9 | 
 10 | @Catch()
 11 | export class AllExceptionsFilter implements ExceptionFilter {
 12 |   private readonly logger = new Logger(AllExceptionsFilter.name);
 13 | 
 14 |   catch(exception: unknown, host: ArgumentsHost) {
 15 |     const ctx = host.switchToHttp();
 16 |     const response = ctx.getResponse<Response>();
 17 |     const request = ctx.getRequest<Request>();
 18 | 
 19 |     const isHttp = exception instanceof HttpException;
 20 |     const statusCode = isHttp
 21 |       ? exception.getStatus()
 22 |       : HttpStatus.INTERNAL_SERVER_ERROR;
 23 | 
 24 |     const exceptionResponse = isHttp ? exception.getResponse() : null;
 25 |     const message = isHttp
 26 |       ? typeof exceptionResponse === 'string'
 27 |         ? exceptionResponse
 28 |         : ((exceptionResponse as any)?.message ?? exception.message)
 29 |       : 'Internal server error';
 30 | 
 31 |     const details =
 32 |       isHttp && typeof exceptionResponse === 'object'
 33 |         ? ((exceptionResponse as any)?.error ?? undefined)
 34 |         : undefined;
 35 | 
 36 |     if (!isHttp) {
 37 |       this.logger.error(
 38 |         exception instanceof Error ? exception.stack : exception,
 39 |       );
 40 |     }
 41 | 
 42 |     response.status(statusCode).json({
 43 |       statusCode,
 44 |       message,
 45 |       timestamp: new Date().toISOString(),
 46 |       path: request.url,
 47 |       requestId: (request as any).id,
 48 |       ...(details ? { details } : {}),
 49 |     });
 50 |   }
 51 | }
 52 | 
```

### File: apps/backend/src/common/logger/logger.module.ts
```ts
  0 | import { Module } from '@nestjs/common';
  1 | import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
  2 | import { randomUUID } from 'crypto';
  3 | 
  4 | @Module({
  5 |   imports: [
  6 |     PinoLoggerModule.forRoot({
  7 |       pinoHttp: {
  8 |         genReqId: (req, res) => {
  9 |           const existing = req.headers['x-request-id'] as string | undefined;
 10 |           const id = existing ?? randomUUID();
 11 |           res.setHeader('x-request-id', id);
 12 |           return id;
 13 |         },
 14 |         customProps: (req) => ({
 15 |           userId: (req as any).user?.sub ?? (req as any).user?.id ?? null,
 16 |         }),
 17 |         serializers: {
 18 |           req: (req) => ({ method: req.method, url: req.url }),
 19 |         },
 20 |         autoLogging: true,
 21 |         transport:
 22 |           process.env.NODE_ENV !== 'production'
 23 |             ? { target: 'pino-pretty', options: { singleLine: true } }
 24 |             : undefined,
 25 |       },
 26 |     }),
 27 |   ],
 28 |   exports: [PinoLoggerModule],
 29 | })
 30 | export class LoggerModule {}
 31 | 
```

### File: apps/backend/src/config/env.validation.ts
```ts
  0 | import * as Joi from 'joi';
  1 | 
  2 | export const envValidationSchema = Joi.object({
  3 |   NODE_ENV: Joi.string()
  4 |     .valid('development', 'production', 'test')
  5 |     .default('development'),
  6 |   PORT: Joi.number().default(3000),
  7 |   DATABASE_URL: Joi.string().uri().required(),
  8 |   DIRECT_URL: Joi.string().uri().optional(),
  9 |   FRONTEND_URL: Joi.string().required(),
 10 |   TELEGRAM_BOT_TOKEN: Joi.string().required(),
 11 |   REDIS_URL: Joi.string().uri().default('redis://localhost:6379'),
 12 |   JWT_SECRET: Joi.string()
 13 |     .min(16)
 14 |     .when('NODE_ENV', {
 15 |       is: 'production',
 16 |       then: Joi.required(),
 17 |       otherwise: Joi.optional().default('super-secret-key-for-dev'),
 18 |     }),
 19 |   SEED_ADMIN_EMAIL: Joi.string().email().optional(),
 20 |   SEED_ADMIN_PASSWORD: Joi.string().optional(),
 21 | });
 22 | 
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
  1 | import { RedisCacheModule } from '../common/cache/redis-cache.module';
  2 | import { DashboardController } from './dashboard.controller';
  3 | import { DashboardService } from './dashboard.service';
  4 | import { PrismaModule } from '../prisma/prisma.module';
  5 | import { AuthModule } from '../auth/auth.module';
  6 | 
  7 | @Module({
  8 |   imports: [PrismaModule, AuthModule, RedisCacheModule],
  9 |   controllers: [DashboardController],
 10 |   providers: [DashboardService],
 11 | })
 12 | export class DashboardModule {}
 13 | 
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
  0 | import { Inject, Injectable, Logger } from '@nestjs/common';
  1 | import { CACHE_MANAGER } from '@nestjs/cache-manager';
  2 | import type { Cache } from 'cache-manager';
  3 | import { Prisma } from '@prisma/client';
  4 | import { PrismaService } from '../prisma/prisma.service';
  5 | const PIPELINE_STAGES = [
  6 |   'BASE',
  7 |   'FIRST_CONTACT',
  8 |   'INTERESTED',
  9 |   'PRE_APPROVAL',
 10 |   'DATE_CONFIRMED',
 11 |   'PREPARATION',
 12 |   'IN_PROGRESS',
 13 |   'DONE',
 14 |   'REPORT',
 15 |   'RE_SALE',
 16 | ];
 17 | 
 18 | const STALE_DAYS = 7;
 19 | 
 20 | type EventWithRelations = Prisma.EventGetPayload<{
 21 |   include: {
 22 |     school: { select: { id: true; name: true } };
 23 |     city: { select: { id: true; name: true } };
 24 |     crew: {
 25 |       include: {
 26 |         host: { select: { id: true; name: true } };
 27 |         driver: { select: { id: true; name: true } };
 28 |       };
 29 |     };
 30 |   };
 31 | }>;
 32 | 
 33 | interface StaleSchool {
 34 |   id: string;
 35 |   name: string;
 36 |   status: string | null;
 37 |   lastActivity: Date | null;
 38 |   daysStale: number | null;
 39 | }
 40 | 
 41 | interface ActivityFeedItem {
 42 |   id: string;
 43 |   userName: string;
 44 |   role: string;
 45 |   action: string;
 46 |   comment: string | null;
 47 |   createdAt: Date;
 48 |   schoolId: string | null;
 49 |   schoolName: string | null;
 50 |   eventId: string | null;
 51 | }
 52 | 
 53 | export interface DashboardSummary {
 54 |   todayEvents: EventWithRelations[];
 55 |   upcomingEvents: EventWithRelations[];
 56 |   funnel: Record<string, number>;
 57 |   totalSchools: number;
 58 |   monthlyKpi: {
 59 |     revenue: number;
 60 |     profit: number;
 61 |     children: number;
 62 |     count: number;
 63 |   };
 64 |   staleSchools: StaleSchool[];
 65 |   activityFeed: ActivityFeedItem[];
 66 |   citiesStats: {
 67 |     cityId: string;
 68 |     cityName: string;
 69 |     schoolsCount: number;
 70 |     activeEvents: number;
 71 |     monthRevenue: number;
 72 |   }[];
 73 | }
 74 | @Injectable()
 75 | export class DashboardService {
 76 |   private readonly logger = new Logger(DashboardService.name);
 77 |   private hits = 0;
 78 |   private misses = 0;
 79 | 
 80 |   constructor(
 81 |     private prisma: PrismaService,
 82 |     @Inject(CACHE_MANAGER) private cacheManager: Cache,
 83 |   ) {}
 84 | 
 85 |   async getSummary(cityId?: string, role?: string): Promise<DashboardSummary> {
 86 |     const key = `dashboard:${cityId ?? 'all'}-${role ?? 'anon'}`;
 87 |     const cached = await this.cacheManager.get<DashboardSummary>(key);
 88 |     if (cached) {
 89 |       this.hits++;
 90 |       this.logger.debug(
 91 |         `cache hit — ${key} (rate=${this.hitRate().toFixed(1)}%)`,
 92 |       );
 93 |       return cached;
 94 |     }
 95 |     this.misses++;
 96 | 
 97 |     const t0 = Date.now();
 98 |     const now = new Date();
 99 |     const windows = this.buildTimeWindows(now);
100 |     const cityFilter = cityId ? { cityId } : {};
101 |     const isSuperAdmin = role === 'SUPERADMIN';
102 | 
103 |     const [eventsWindow, funnelStats, monthlyKpi, staleSchools, activityFeed] =
104 |       await Promise.all([
105 |         this.getEventsWindow(cityFilter, windows),
106 |         this.getFunnelStats(cityId),
107 |         this.getMonthlyKpi(cityFilter, windows),
108 |         this.getStaleSchools(cityFilter, windows.staleThreshold, now),
109 |         this.getActivityFeed(cityId, windows.todayStart),
110 |       ]);
111 | 
112 |     const citiesStats = isSuperAdmin ? await this.getCitiesStats(windows) : [];
113 | 
114 |     const result: DashboardSummary = {
115 |       ...eventsWindow,
116 |       ...funnelStats,
117 |       monthlyKpi,
118 |       staleSchools,
119 |       activityFeed,
120 |       citiesStats,
121 |     };
122 | 
123 |     this.logger.debug(`total: ${Date.now() - t0}ms`);
124 |     await this.cacheManager.set(key, result, 60_000);
125 |     return result;
126 |   }
127 | 
128 |   private hitRate(): number {
129 |     const total = this.hits + this.misses;
130 |     return total === 0 ? 0 : (this.hits / total) * 100;
131 |   }
132 | 
133 |   private buildTimeWindows(now: Date) {
134 |     const todayStart = new Date(
135 |       now.getFullYear(),
136 |       now.getMonth(),
137 |       now.getDate(),
138 |     );
139 |     const todayEnd = new Date(todayStart);
140 |     todayEnd.setDate(todayEnd.getDate() + 1);
141 |     const upcomingEnd = new Date(todayStart);
142 |     upcomingEnd.setDate(upcomingEnd.getDate() + 6);
143 |     const staleThreshold = new Date(now);
144 |     staleThreshold.setDate(staleThreshold.getDate() - STALE_DAYS);
145 |     const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
146 |     const monthEnd = new Date(
147 |       now.getFullYear(),
148 |       now.getMonth() + 1,
149 |       0,
150 |       23,
151 |       59,
152 |       59,
153 |     );
154 |     return {
155 |       todayStart,
156 |       todayEnd,
157 |       upcomingEnd,
158 |       staleThreshold,
159 |       monthStart,
160 |       monthEnd,
161 |     };
162 |   }
163 | 
164 |   private eventInclude() {
165 |     return {
166 |       school: { select: { id: true, name: true } },
167 |       city: { select: { id: true, name: true } },
168 |       crew: {
169 |         include: {
170 |           host: { select: { id: true, name: true } },
171 |           driver: { select: { id: true, name: true } },
172 |         },
173 |       },
174 |     };
175 |   }
176 | 
177 |   private async getEventsWindow(
178 |     cityFilter: Record<string, unknown>,
179 |     windows: ReturnType<DashboardService['buildTimeWindows']>,
180 |   ) {
181 |     const [todayEvents, upcomingEvents] = await Promise.all([
182 |       this.prisma.event.findMany({
183 |         where: {
184 |           ...cityFilter,
185 |           date: { gte: windows.todayStart, lt: windows.todayEnd },
186 |         },
187 |         include: this.eventInclude(),
188 |         orderBy: { time: 'asc' },
189 |       }),
190 |       this.prisma.event.findMany({
191 |         where: {
192 |           ...cityFilter,
193 |           date: { gte: windows.todayEnd, lt: windows.upcomingEnd },
194 |         },
195 |         include: this.eventInclude(),
196 |         orderBy: [{ date: 'asc' }, { time: 'asc' }],
197 |         take: 8,
198 |       }),
199 |     ]);
200 |     return { todayEvents, upcomingEvents };
201 |   }
202 | 
203 |   private async getFunnelStats(cityId?: string) {
204 |     const funnelRows = cityId
205 |       ? await this.prisma.$queryRaw<
206 |           { status: string; count: bigint }[]
207 |         >(Prisma.sql`
208 |           SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
209 |           FROM "School" s
210 |           LEFT JOIN LATERAL (
211 |             SELECT status FROM "Event"
212 |             WHERE "schoolId" = s.id
213 |             ORDER BY date DESC
214 |             LIMIT 1
215 |           ) e ON true
216 |           WHERE s."cityId" = ${cityId}
217 |           GROUP BY e.status
218 |         `)
219 |       : await this.prisma.$queryRaw<
220 |           { status: string; count: bigint }[]
221 |         >(Prisma.sql`
222 |           SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
223 |           FROM "School" s
224 |           LEFT JOIN LATERAL (
225 |             SELECT status FROM "Event"
226 |             WHERE "schoolId" = s.id
227 |             ORDER BY date DESC
228 |             LIMIT 1
229 |           ) e ON true
230 |           GROUP BY e.status
231 |         `);
232 | 
233 |     const funnel: Record<string, number> = {};
234 |     for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
235 |     let totalSchools = 0;
236 |     for (const row of funnelRows) {
237 |       const status = row.status ?? 'BASE';
238 |       const count = Number(row.count);
239 |       if (funnel[status] !== undefined) funnel[status] += count;
240 |       totalSchools += count;
241 |     }
242 |     return { funnel, totalSchools };
243 |   }
244 | 
245 |   private async getMonthlyKpi(
246 |     cityFilter: Record<string, unknown>,
247 |     windows: ReturnType<DashboardService['buildTimeWindows']>,
248 |   ) {
249 |     const monthEvents = await this.prisma.event.findMany({
250 |       where: {
251 |         ...cityFilter,
252 |         status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
253 |         date: { gte: windows.monthStart, lte: windows.monthEnd },
254 |       },
255 |       select: {
256 |         id: true,
257 |         report: {
258 |           select: { totalSum: true, remainderSum: true, childrenCount: true },
259 |         },
260 |       },
261 |     });
262 | 
263 |     return monthEvents.reduce(
264 |       (acc, ev) => {
265 |         acc.revenue += ev.report?.totalSum ?? 0;
266 |         acc.profit += ev.report?.remainderSum ?? 0;
267 |         acc.children += ev.report?.childrenCount ?? 0;
268 |         acc.count += 1;
269 |         return acc;
270 |       },
271 |       { revenue: 0, profit: 0, children: 0, count: 0 },
272 |     );
273 |   }
274 | 
275 |   private async getStaleSchools(
276 |     cityFilter: Record<string, unknown>,
277 |     staleThreshold: Date,
278 |     now: Date,
279 |   ): Promise<StaleSchool[]> {
280 |     const cityId = (cityFilter as { cityId?: string }).cityId;
281 |     const cityCondition = cityId
282 |       ? Prisma.sql`AND s."cityId" = ${cityId}`
283 |       : Prisma.empty;
284 | 
285 |     const rows = await this.prisma.$queryRaw;
286 |     {
287 |       id: string;
288 |       name: string;
289 |       status: string;
290 |       lastActivity: Date | null;
291 |     }
292 |     [] >
293 |       Prisma.sql`
294 |       SELECT s.id, s.name, latest.status, "lastHist"."createdAt" as "lastActivity"
295 |       FROM "School" s
296 |       JOIN LATERAL (
297 |         SELECT id, status FROM "Event" e
298 |         WHERE e."schoolId" = s.id AND e.status NOT IN ('DONE', 'REPORT', 'RE_SALE')
299 |         ORDER BY e.date DESC
300 |         LIMIT 1
301 |       ) latest ON true
302 |       LEFT JOIN LATERAL (
303 |         SELECT h."createdAt" FROM "EventHistory" h
304 |         WHERE h."eventId" = latest.id
305 |         ORDER BY h."createdAt" DESC
306 |         LIMIT 1
307 |       ) "lastHist" ON true
308 |       WHERE ("lastHist"."createdAt" IS NULL OR "lastHist"."createdAt" < ${staleThreshold})
309 |       ${cityCondition}
310 |       ORDER BY "lastHist"."createdAt" ASC NULLS FIRST
311 |       LIMIT 10
312 |     `;
313 | 
314 |     return rows.map((school) => {
315 |       const daysStale = school.lastActivity
316 |         ? Math.floor(
317 |             (now.getTime() - new Date(school.lastActivity).getTime()) /
318 |               86_400_000,
319 |           )
320 |         : null;
321 |       return {
322 |         id: school.id,
323 |         name: school.name,
324 |         status: school.status ?? null,
325 |         lastActivity: school.lastActivity,
326 |         daysStale,
327 |       };
328 |     });
329 |   }
330 | 
331 |   private async getActivityFeed(cityId: string | undefined, todayStart: Date) {
332 |     const recentActivity = await this.prisma.eventHistory.findMany({
333 |       where: {
334 |         createdAt: { gte: todayStart },
335 |         ...(cityId ? { event: { cityId } } : {}),
336 |       },
337 |       include: {
338 |         event: {
339 |           select: {
340 |             id: true,
341 |             school: { select: { id: true, name: true } },
342 |           },
343 |         },
344 |       },
345 |       orderBy: { createdAt: 'desc' },
346 |       take: 20,
347 |     });
348 | 
349 |     return recentActivity.map((h) => ({
350 |       id: h.id,
351 |       userName: h.userName,
352 |       role: h.role,
353 |       action: h.action,
354 |       comment: h.comment,
355 |       createdAt: h.createdAt,
356 |       schoolId: h.event?.school?.id ?? null,
357 |       schoolName: h.event?.school?.name ?? null,
358 |       eventId: h.event?.id ?? null,
359 |     }));
360 |   }
361 | 
362 |   private async getCitiesStats(
363 |     windows: ReturnType<DashboardService['buildTimeWindows']>,
364 |   ) {
365 |     const [allCities, allSchools, allActiveEvents, allMonthEvents] =
366 |       await Promise.all([
367 |         this.prisma.city.findMany({ select: { id: true, name: true } }),
368 |         this.prisma.school.groupBy({ by: ['cityId'], _count: { id: true } }),
369 |         this.prisma.event.groupBy({
370 |           by: ['cityId'],
371 |           where: {
372 |             status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
373 |           },
374 |           _count: { id: true },
375 |         }),
376 |         this.prisma.event.findMany({
377 |           where: {
378 |             status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
379 |             date: { gte: windows.monthStart, lte: windows.monthEnd },
380 |           },
381 |           select: {
382 |             cityId: true,
383 |             report: { select: { totalSum: true } },
384 |           },
385 |         }),
386 |       ]);
387 | 
388 |     const schoolsIdx = Object.fromEntries(
389 |       allSchools.map((r) => [r.cityId, r._count.id]),
390 |     );
391 |     const activeIdx = Object.fromEntries(
392 |       allActiveEvents.map((r) => [r.cityId, r._count.id]),
393 |     );
394 |     const revenueIdx: Record<string, number> = {};
395 |     for (const ev of allMonthEvents) {
396 |       revenueIdx[ev.cityId] =
397 |         (revenueIdx[ev.cityId] ?? 0) + (ev.report?.totalSum ?? 0);
398 |     }
399 | 
400 |     return allCities
401 |       .map((city) => ({
402 |         cityId: city.id,
403 |         cityName: city.name,
404 |         schoolsCount: schoolsIdx[city.id] ?? 0,
405 |         activeEvents: activeIdx[city.id] ?? 0,
406 |         monthRevenue: revenueIdx[city.id] ?? 0,
407 |       }))
408 |       .sort((a, b) => b.monthRevenue - a.monthRevenue);
409 |   }
410 | }
411 | 
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
  0 | import { IsEnum, IsIn } from 'class-validator';
  1 | import { PreparationStatus } from '@prisma/client';
  2 | 
  3 | const PREPARATION_FIELDS = [
  4 |   'assignCrew',
  5 |   'bookEquipment',
  6 |   'prepareDocs',
  7 |   'prepareMaterials',
  8 |   'remindSchool',
  9 | ] as const;
 10 | 
 11 | export class UpdatePreparationDto {
 12 |   @IsIn(PREPARATION_FIELDS)
 13 |   field: (typeof PREPARATION_FIELDS)[number];
 14 | 
 15 |   @IsEnum(PreparationStatus)
 16 |   status: PreparationStatus;
 17 | }
 18 | 
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
  3 | import { Prisma, PreparationStatus } from '@prisma/client';
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
 97 |     field: keyof Omit<
 98 |       Prisma.EventPreparationUncheckedCreateInput,
 99 |       'id' | 'eventId'
100 |     >,
101 |     status: PreparationStatus,
102 |   ) {
103 |     const existing = await this.prisma.eventPreparation.findUnique({
104 |       where: { eventId },
105 |     });
106 | 
107 |     if (existing) {
108 |       return this.prisma.eventPreparation.update({
109 |         where: { eventId },
110 |         data: { [field]: status },
111 |       });
112 |     } else {
113 |       return this.prisma.eventPreparation.create({
114 |         data: { eventId, [field]: status },
115 |       });
116 |     }
117 |   }
118 | 
119 |   async assignCrewToEvent(eventId: string, crewId: string) {
120 |     const event = await this.prisma.event.update({
121 |       where: { id: eventId },
122 |       data: { crewId: crewId },
123 |       include: {
124 |         crew: { include: { host: true, driver: true } },
125 |         school: true,
126 |         city: true,
127 |         preparation: true,
128 |         history: { orderBy: { createdAt: 'desc' } },
129 |       },
130 |     });
131 | 
132 |     const hostId = event.crew?.hostId;
133 |     const driverId = event.crew?.driverId;
134 | 
135 |     const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
136 |       day: '2-digit',
137 |       month: 'long',
138 |       year: 'numeric',
139 |     });
140 |     const timeStr = event.time ? `, ${event.time}` : '';
141 | 
142 |     const buildMessage = (role: 'ведучий' | 'водій') =>
143 |       `🎯 <b>Вас призначено на подію!</b>\n\n` +
144 |       `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
145 |       `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
146 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
147 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
148 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
149 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
150 |       (event.contactPerson
151 |         ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
152 |         : '') +
153 |       (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
154 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
155 | 
156 |     if (hostId) {
157 |       const hostChatId = await this.getChatIdForUser(hostId);
158 |       this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);
159 | 
160 |       if (hostChatId) {
161 |         await this.telegramService.sendMessage(
162 |           hostChatId,
163 |           buildMessage('ведучий'),
164 |         );
165 |       } else {
166 |         this.logger.warn(
167 |           `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
168 |         );
169 |       }
170 |     }
171 | 
172 |     if (driverId) {
173 |       const driverChatId = await this.getChatIdForUser(driverId);
174 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
175 | 
176 |       if (driverChatId) {
177 |         await this.telegramService.sendMessage(
178 |           driverChatId,
179 |           buildMessage('водій'),
180 |         );
181 |       } else {
182 |         this.logger.warn(
183 |           `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
184 |         );
185 |       }
186 |     }
187 | 
188 |     if (driverId) {
189 |       const driver = await this.prisma.user.findUnique({
190 |         where: { id: driverId },
191 |       });
192 |       this.logger.log(
193 |         `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
194 |       );
195 |       const driverChatId =
196 |         driver?.telegramChatId ||
197 |         (driver?.telegramId && /^\d+$/.test(driver.telegramId)
198 |           ? driver.telegramId
199 |           : null);
200 |       this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
201 |       if (driverChatId) {
202 |         await this.telegramService.sendMessage(
203 |           driverChatId,
204 |           buildMessage('водій'),
205 |         );
206 |       }
207 |     }
208 | 
209 |     return event;
210 |   }
211 | 
212 |   async rescheduleEvent(
213 |     eventId: string,
214 |     newDate: string,
215 |     newTime: string,
216 |     user: JwtUser,
217 |   ) {
218 |     const event = await this.prisma.event.update({
219 |       where: { id: eventId },
220 |       data: {
221 |         date: new Date(newDate),
222 |         time: newTime,
223 |         history: {
224 |           create: {
225 |             action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
226 |             userId: user.sub,
227 |             userName: user.name,
228 |             role: user.role,
229 |           },
230 |         },
231 |       },
232 |       include: {
233 |         crew: { include: { host: true, driver: true } },
234 |         school: true,
235 |         city: true,
236 |         history: { orderBy: { createdAt: 'desc' } },
237 |       },
238 |     });
239 | 
240 |     const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
241 |       day: '2-digit',
242 |       month: 'long',
243 |       year: 'numeric',
244 |     });
245 |     const msg =
246 |       `📅 <b>Подію перенесено!</b>\n\n` +
247 |       `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
248 |       `🎪 <b>Проєкт:</b> ${event.project}\n` +
249 |       `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
250 |       `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
251 |       (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
252 |       `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;
253 | 
254 |     const sendTo = async (userId: string | null | undefined) => {
255 |       if (!userId) return;
256 |       const u = await this.prisma.user.findUnique({ where: { id: userId } });
257 |       const chatId =
258 |         u?.telegramChatId ||
259 |         (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
260 |       if (chatId) await this.telegramService.sendMessage(chatId, msg);
261 |     };
262 | 
263 |     await sendTo(event.crew?.hostId);
264 |     await sendTo(event.crew?.driverId);
265 | 
266 |     return event;
267 |   }
268 | 
269 |   async getChatIdForUser(userId: string): Promise<string | null> {
270 |     const user = await this.prisma.user.findUnique({ where: { id: userId } });
271 |     if (!user) return null;
272 | 
273 |     if (user.telegramChatId) return user.telegramChatId;
274 | 
275 |     if (user.telegramId && /^\d+$/.test(user.telegramId))
276 |       return user.telegramId;
277 | 
278 |     return null;
279 |   }
280 | 
281 |   async findBySchool(schoolId: string, minimal = false) {
282 |     if (minimal) {
283 |       return this.prisma.event.findMany({
284 |         where: { schoolId },
285 |         select: {
286 |           id: true,
287 |           project: true,
288 |           date: true,
289 |           time: true,
290 |           status: true,
291 |           price: true,
292 |           childrenPlanned: true,
293 |           address: true,
294 |           contactPerson: true,
295 |           contactPhone: true,
296 |           crewId: true,
297 |           crew: {
298 |             select: { id: true, name: true, hostId: true, driverId: true },
299 |           },
300 |         },
301 |         orderBy: { date: 'desc' },
302 |       });
303 |     }
304 |     return this.prisma.event.findMany({
305 |       where: { schoolId },
306 |       include: {
307 |         crew: { include: { host: true, driver: true } },
308 |         history: { orderBy: { createdAt: 'desc' } },
309 |         preparation: true,
310 |       },
311 |       orderBy: { date: 'desc' },
312 |     });
313 |   }
314 | 
315 |   async updateHistoryComment(historyId: string, comment: string) {
316 |     return this.prisma.eventHistory.update({
317 |       where: { id: historyId },
318 |       data: { comment: comment || null },
319 |     });
320 |   }
321 | 
322 |   async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
323 |     await this.prisma.eventHistory.create({
324 |       data: {
325 |         eventId,
326 |         action: 'Коментар',
327 |         comment,
328 |         userId: user.sub,
329 |         userName: user.name,
330 |         role: user.role,
331 |       },
332 |     });
333 | 
334 |     return this.prisma.event.findUnique({
335 |       where: { id: eventId },
336 |       include: {
337 |         history: { orderBy: { createdAt: 'desc' } },
338 |       },
339 |     });
340 |   }
341 | 
342 |   async remove(id: string) {
343 |     const exists = await this.prisma.event.findUnique({ where: { id } });
344 |     if (!exists) throw new NotFoundException('Подію не знайдено');
345 | 
346 |     await this.prisma.eventHistory.deleteMany({
347 |       where: { eventId: id },
348 |     });
349 | 
350 |     await this.prisma.eventPreparation.deleteMany({
351 |       where: { eventId: id },
352 |     });
353 | 
354 |     return this.prisma.event.delete({
355 |       where: { id },
356 |     });
357 |   }
358 | 
359 |   async submitReport(
360 |     eventId: string,
361 |     reportData: SubmitReportDto,
362 |     user: JwtUser,
363 |   ) {
364 |     await this.prisma.eventReport.upsert({
365 |       where: { eventId },
366 |       update: {
367 |         announcementDone: reportData.announcementDone,
368 |         materialShown: reportData.materialShown,
369 |         childrenCount: reportData.childrenCount,
370 |         classesCount: reportData.classesCount,
371 |         privilegedCount: reportData.privilegedCount,
372 |         showingsCount: reportData.showingsCount,
373 |         totalSum: reportData.totalSum,
374 |         schoolSum: reportData.schoolSum,
375 |         remainderSum: reportData.remainderSum,
376 |         rating: reportData.rating,
377 |       },
378 |       create: {
379 |         eventId,
380 |         announcementDone: reportData.announcementDone,
381 |         materialShown: reportData.materialShown,
382 |         childrenCount: reportData.childrenCount,
383 |         classesCount: reportData.classesCount,
384 |         privilegedCount: reportData.privilegedCount,
385 |         showingsCount: reportData.showingsCount,
386 |         totalSum: reportData.totalSum,
387 |         schoolSum: reportData.schoolSum,
388 |         remainderSum: reportData.remainderSum,
389 |         rating: reportData.rating,
390 |       },
391 |     });
392 | 
393 |     await this.prisma.expenseItem.deleteMany({ where: { reportId: eventId } });
394 |     await this.prisma.salaryItem.deleteMany({ where: { reportId: eventId } });
395 | 
396 |     if (reportData.expenses?.length) {
397 |       await this.prisma.expenseItem.createMany({
398 |         data: reportData.expenses.map((exp: ExpenseItemDto) => ({
399 |           reportId: eventId,
400 |           category: exp.category || 'Інше',
401 |           name: exp.name,
402 |           amount: new Prisma.Decimal(exp.amount || 0),
403 |         })),
404 |       });
405 |     }
406 | 
407 |     if (reportData.salaries?.length) {
408 |       await this.prisma.salaryItem.createMany({
409 |         data: reportData.salaries.map((s: SalaryItemDto) => ({
410 |           reportId: eventId,
411 |           userId: s.userId,
412 |           userName: s.name,
413 |           amount: new Prisma.Decimal(s.amount || 0),
414 |           role: s.role,
415 |         })),
416 |       });
417 | 
418 |       await Promise.all(
419 |         reportData.salaries
420 |           .filter((s) => s.userId && s.amount > 0)
421 |           .map((s) =>
422 |             this.prisma.user.update({
423 |               where: { id: s.userId },
424 |               data: { balance: { increment: s.amount } },
425 |             }),
426 |           ),
427 |       );
428 |     }
429 | 
430 |     return this.prisma.event.update({
431 |       where: { id: eventId },
432 |       data: {
433 |         status: 'REPORT' as never,
434 |         history: {
435 |           create: {
436 |             action: 'Сформовано звіт. Етап: Звіт',
437 |             userId: user.sub,
438 |             userName: user.name,
439 |             role: user.role,
440 |           },
441 |         },
442 |       },
443 |       include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
444 |     });
445 |   }
446 | 
447 |   async findOne(id: string) {
448 |     const event = await this.prisma.event.findUnique({
449 |       where: { id },
450 |       include: {
451 |         school: true,
452 |         city: true,
453 |         crew: {
454 |           include: {
455 |             host: { select: { id: true, name: true } },
456 |             driver: { select: { id: true, name: true } },
457 |           },
458 |         },
459 |         report: true,
460 |       },
461 |     });
462 |     if (!event) throw new NotFoundException('Подію не знайдено');
463 |     return event;
464 |   }
465 | 
466 |   async findCompletedBySchool(schoolId: string) {
467 |     return this.prisma.event.findMany({
468 |       where: { schoolId, status: 'RE_SALE' },
469 |       select: {
470 |         id: true,
471 |         project: true,
472 |         date: true,
473 |         status: true,
474 |         price: true,
475 |         childrenPlanned: true,
476 |         report: {
477 |           select: {
478 |             childrenCount: true,
479 |             classesCount: true,
480 |             privilegedCount: true,
481 |             showingsCount: true,
482 |             totalSum: true,
483 |             schoolSum: true,
484 |             remainderSum: true,
485 |             rating: true,
486 |             expenseItems: {
487 |               select: { category: true, name: true, amount: true },
488 |             },
489 |           },
490 |         },
491 |         history: { orderBy: { createdAt: 'asc' } },
492 |       },
493 |       orderBy: { date: 'desc' },
494 |     });
495 |   }
496 | }
497 | 
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
  0 | import { Prisma } from '@prisma/client';
  1 | import { PrismaService } from '../prisma/prisma.service';
  2 | @Injectable()
  3 | interface FinanceKpi {
  4 |   totalRevenue: number;
  5 |   totalExpenses: number;
  6 |   totalProfit: number;
  7 |   totalEvents: number;
  8 | }
  9 | 
 10 | interface FinanceFilterOptions {
 11 |   projects: string[];
 12 |   cities: { id: string; name: string }[];
 13 | }
 14 | 
 15 | interface FinanceDashboardResult {
 16 |   kpi: FinanceKpi;
 17 |   monthly: { month: string; revenue: number; profit: number }[];
 18 |   expectedRevenue: number;
 19 |   filters: FinanceFilterOptions;
 20 |   byProject?: { name: string; value: number }[];
 21 |   byExpenseCategory?: { name: string; value: number }[];
 22 |   topCities?: { name: string; revenue: number; profit: number }[];
 23 |   topSchools?: { name: string; count: number; revenue: number }[];
 24 |   topEvents?: {
 25 |     id: string;
 26 |     date: Date;
 27 |     school: string;
 28 |     profit: number;
 29 |     revenue: number;
 30 |   }[];
 31 |   worstEvents?: {
 32 |     id: string;
 33 |     date: Date;
 34 |     school: string;
 35 |     profit: number;
 36 |     revenue: number;
 37 |   }[];
 38 | }
 39 | 
 40 | export class FinanceService {
 41 |   private cache = new Map<string, { data: unknown; expiresAt: number }>();
 42 | 
 43 |   private getCached<T>(key: string): T | null {
 44 |     const entry = this.cache.get(key);
 45 |     if (!entry || Date.now() > entry.expiresAt) return null;
 46 |     return entry.data as T;
 47 |   }
 48 | 
 49 |   private setCached(key: string, data: unknown, ttlMs = 5 * 60 * 1000) {
 50 |     this.cache.set(key, { data, expiresAt: Date.now() + ttlMs });
 51 |   }
 52 | 
 53 |   constructor(private readonly prisma: PrismaService) {}
 54 | 
 55 |   private resolveDateFrom(period?: string): Date | undefined {
 56 |     const now = new Date();
 57 |     if (period === 'month')
 58 |       return new Date(now.getFullYear(), now.getMonth(), 1);
 59 |     if (period === 'quarter')
 60 |       return new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
 61 |     if (period === 'year') return new Date(now.getFullYear(), 0, 1);
 62 |     return undefined;
 63 |   }
 64 |   private buildSqlFilters({
 65 |     dateFrom,
 66 |     cityId,
 67 |     project,
 68 |   }: {
 69 |     dateFrom?: Date;
 70 |     cityId?: string;
 71 |     project?: string;
 72 |   }): Prisma.Sql {
 73 |     const parts: Prisma.Sql[] = [];
 74 |     if (dateFrom) parts.push(Prisma.sql`AND e.date >= ${dateFrom}`);
 75 |     if (cityId) parts.push(Prisma.sql`AND e."cityId" = ${cityId}`);
 76 |     if (project) parts.push(Prisma.sql`AND e.project  = ${project}`);
 77 |     return parts.length ? Prisma.join(parts, ' ') : Prisma.empty;
 78 |   }
 79 | 
 80 |   async getMyBalance(userId: string) {
 81 |     const user = await this.prisma.user.findUnique({
 82 |       where: { id: userId },
 83 |       select: { balance: true, name: true },
 84 |     });
 85 |     return { balance: user?.balance?.toNumber() ?? 0, name: user?.name ?? '' };
 86 |   }
 87 | 
 88 |  async getDashboard({
 89 |     period,
 90 |     cityId,
 91 |     project,
 92 |     minimal = false,
 93 |   }: {
 94 |     period?: string;
 95 |     cityId?: string;
 96 |     project?: string;
 97 |     minimal?: boolean;
 98 |   }): Promise<FinanceDashboardResult> {
 99 |     const cacheKey = `finance:${cityId}:${period}:${project}:${minimal}`;
100 |     const cached = this.getCached<FinanceDashboardResult>(cacheKey);
101 |     if (cached) return cached;
102 | 
103 |     const dateFrom = this.resolveDateFrom(period);
104 |     const filters = this.buildSqlFilters({ dateFrom, cityId, project });
105 | 
106 |     const baseEventWhere: Prisma.EventWhereInput = {
107 |       status: 'RE_SALE',
108 |       ...(dateFrom ? { date: { gte: dateFrom } } : {}),
109 |       ...(cityId ? { cityId } : {}),
110 |       ...(project ? { project } : {}),
111 |     };
112 | 
113 |     const kpiAgg = await this.prisma.eventReport.aggregate({
114 |       where: { event: baseEventWhere },
115 |       _sum: { totalSum: true, remainderSum: true },
116 |       _count: { eventId: true },
117 |     });
118 | 
119 |     const totalRevenue = kpiAgg._sum.totalSum ?? 0;
120 |     const totalProfit = kpiAgg._sum.remainderSum ?? 0;
121 |     const totalEvents = kpiAgg._count.eventId ?? 0;
122 | 
123 |     const expensesRaw = await this.prisma.expenseItem.findMany({
124 |       where: {
125 |         report: {
126 |           event: baseEventWhere,
127 |         },
128 |       },
129 |       select: {
130 |         category: true,
131 |         name: true,
132 |         amount: true,
133 |       },
134 |     });
135 | 
136 |     const expCatMap: Record<string, number> = {};
137 |     let totalExpenses = 0;
138 | 
139 |     for (const exp of expensesRaw) {
140 |       const cat: string = exp.category || exp.name || 'Інше';
141 |       const amt: number = Number(exp.amount) || 0;
142 |       expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
143 |       totalExpenses += amt;
144 |     }
145 | 
146 |     const byExpenseCategory = Object.entries(expCatMap).map(
147 |       ([name, value]) => ({
148 |         name,
149 |         value,
150 |       }),
151 |     );
152 |     type MonthlyRow = {
153 |       year: number;
154 |       month: number;
155 |       revenue: number;
156 |       profit: number;
157 |     };
158 |     const monthlyRaw = await this.prisma.$queryRaw<MonthlyRow[]>`
159 |       SELECT
160 |         EXTRACT(YEAR  FROM e.date)::int                   AS year,
161 |         EXTRACT(MONTH FROM e.date)::int                   AS month,
162 |         COALESCE(SUM(r."totalSum"),      0)::float        AS revenue,
163 |         COALESCE(SUM(r."remainderSum"),  0)::float        AS profit
164 |       FROM "Event" e
165 |       JOIN "EventReport" r ON r."eventId" = e.id
166 |       WHERE e.status = 'RE_SALE'
167 |       ${filters}
168 |       GROUP BY year, month
169 |       ORDER BY year, month
170 |     `;
171 | 
172 |     const monthly = monthlyRaw.map((row) => ({
173 |       month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
174 |         month: 'short',
175 |         year: '2-digit',
176 |       }),
177 |       revenue: row.revenue,
178 |       profit: row.profit,
179 |     }));
180 | 
181 |     const plannedAgg = await this.prisma.event.aggregate({
182 |       where: {
183 |         status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
184 |         ...(cityId ? { cityId } : {}),
185 |       },
186 |       _sum: { price: true },
187 |     });
188 |     const expectedRevenue = plannedAgg._sum.price ?? 0;
189 |     const [projectsRaw, cities] = await Promise.all([
190 |       this.prisma.event.findMany({
191 |         select: { project: true },
192 |         distinct: ['project'],
193 |       }),
194 |       this.prisma.city.findMany({ select: { id: true, name: true } }),
195 |     ]);
196 |     const filterOptions = {
197 |       projects: projectsRaw.map((p) => p.project).filter(Boolean),
198 |       cities,
199 |     };
200 | 
201 |     if (minimal) {
202 |       const result = {
203 |         kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
204 |         monthly,
205 |         expectedRevenue,
206 |         filters: filterOptions,
207 |       };
208 |       this.setCached(cacheKey, result);
209 |       return result;
210 |     }
211 | 
212 |     type ProjectRow = { project: string; value: number };
213 |     const byProjectRows = await this.prisma.$queryRaw<ProjectRow[]>`
214 |       SELECT
215 |         COALESCE(e.project, 'Інше')              AS project,
216 |         COALESCE(SUM(r."totalSum"), 0)::float    AS value
217 |       FROM "Event" e
218 |       JOIN "EventReport" r ON r."eventId" = e.id
219 |       WHERE e.status = 'RE_SALE'
220 |       ${filters}
221 |       GROUP BY e.project
222 |       ORDER BY value DESC
223 |     `;
224 |     const byProject = byProjectRows.map((r) => ({
225 |       name: r.project,
226 |       value: r.value,
227 |     }));
228 |     type CityRow = {
229 |       cityId: string;
230 |       name: string;
231 |       revenue: number;
232 |       profit: number;
233 |     };
234 |     const topCitiesRows = await this.prisma.$queryRaw<CityRow[]>`
235 |       SELECT
236 |         e."cityId",
237 |         COALESCE(c.name, '—')                    AS name,
238 |         COALESCE(SUM(r."totalSum"),     0)::float AS revenue,
239 |         COALESCE(SUM(r."remainderSum"), 0)::float AS profit
240 |       FROM "Event" e
241 |       JOIN "EventReport" r ON r."eventId" = e.id
242 |       LEFT JOIN "City" c   ON c.id = e."cityId"
243 |       WHERE e.status = 'RE_SALE'
244 |       ${filters}
245 |       GROUP BY e."cityId", c.name
246 |       ORDER BY revenue DESC
247 |       LIMIT 5
248 |     `;
249 |     const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
250 |       name,
251 |       revenue,
252 |       profit,
253 |     }));
254 | 
255 |     type SchoolRow = {
256 |       schoolId: string;
257 |       name: string;
258 |       count: number;
259 |       revenue: number;
260 |     };
261 |     const topSchoolsRows = await this.prisma.$queryRaw<SchoolRow[]>`
262 |       SELECT
263 |         e."schoolId",
264 |         COALESCE(s.name, '—')                    AS name,
265 |         COUNT(e.id)::int                         AS count,
266 |         COALESCE(SUM(r."totalSum"), 0)::float    AS revenue
267 |       FROM "Event" e
268 |       JOIN "EventReport" r ON r."eventId" = e.id
269 |       LEFT JOIN "School" s ON s.id = e."schoolId"
270 |       WHERE e.status = 'RE_SALE'
271 |       ${filters}
272 |       GROUP BY e."schoolId", s.name
273 |       ORDER BY revenue DESC
274 |       LIMIT 5
275 |     `;
276 |     const topSchools = topSchoolsRows.map(({ name, count, revenue }) => ({
277 |       name,
278 |       count,
279 |       revenue,
280 |     }));
281 | 
282 |     const eventSelect = {
283 |       totalSum: true,
284 |       remainderSum: true,
285 |       event: {
286 |         select: {
287 |           id: true,
288 |           date: true,
289 |           school: { select: { name: true } },
290 |         },
291 |       },
292 |     } satisfies Prisma.EventReportSelect;
293 | 
294 |     const [topEventsRaw, worstEventsRaw] = await Promise.all([
295 |       this.prisma.eventReport.findMany({
296 |         where: { event: baseEventWhere },
297 |         select: eventSelect,
298 |         orderBy: { remainderSum: 'desc' },
299 |         take: 5,
300 |       }),
301 |       this.prisma.eventReport.findMany({
302 |         where: { event: baseEventWhere },
303 |         select: eventSelect,
304 |         orderBy: { remainderSum: 'asc' },
305 |         take: 5,
306 |       }),
307 |     ]);
308 | 
309 |     const mapEvent = (r: (typeof topEventsRaw)[number]) => ({
310 |       id: r.event.id,
311 |       date: r.event.date,
312 |       school: r.event.school?.name ?? '—',
313 |       profit: r.remainderSum ?? 0,
314 |       revenue: r.totalSum ?? 0,
315 |     });
316 | 
317 |     const topEvents = topEventsRaw.map(mapEvent);
318 |     const worstEvents = worstEventsRaw.map(mapEvent);
319 | 
320 |     const result = {
321 |       kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
322 |       monthly,
323 |       byProject,
324 |       byExpenseCategory,
325 |       topCities,
326 |       topSchools,
327 |       topEvents,
328 |       worstEvents,
329 |       expectedRevenue,
330 |       filters: filterOptions,
331 |     };
332 |     this.setCached(cacheKey, result);
333 |     return result;
334 |   }
335 | 
336 |   async getStaffRevenue({
337 |     period,
338 |     cityId,
339 |   }: {
340 |     period?: string;
341 |     cityId?: string;
342 |   }) {
343 |     const dateFrom = this.resolveDateFrom(period);
344 |     const staffFilters = this.buildSqlFilters({ dateFrom, cityId });
345 | 
346 |     type StaffRow = {
347 |       id: string;
348 |       name: string;
349 |       role: 'HOST' | 'DRIVER';
350 |       revenue: number;
351 |       eventsCount: number;
352 |     };
353 | 
354 |     const [hostRows, driverRows, totalAgg, eventsCount] = await Promise.all([
355 |       this.prisma.$queryRaw<StaffRow[]>`
356 |         SELECT
357 |           u.id,
358 |           u.name,
359 |           'HOST'::text                              AS role,
360 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
361 |           COUNT(e.id)::int                          AS "eventsCount"
362 |         FROM "Event" e
363 |         JOIN "Crew"         c ON c.id = e."crewId"
364 |         JOIN "User"         u ON u.id = c."hostId"
365 |         JOIN "EventReport"  r ON r."eventId" = e.id
366 |         WHERE e.status = 'RE_SALE'
367 |         ${staffFilters}
368 |         GROUP BY u.id, u.name
369 |       `,
370 |       this.prisma.$queryRaw<StaffRow[]>`
371 |         SELECT
372 |           u.id,
373 |           u.name,
374 |           'DRIVER'::text                            AS role,
375 |           COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
376 |           COUNT(e.id)::int                          AS "eventsCount"
377 |         FROM "Event" e
378 |         JOIN "Crew"        c ON c.id = e."crewId"
379 |         JOIN "User"        u ON u.id = c."driverId"
380 |         JOIN "EventReport" r ON r."eventId" = e.id
381 |         WHERE e.status = 'RE_SALE'
382 |         ${staffFilters}
383 |         GROUP BY u.id, u.name
384 |       `,
385 |       this.prisma.$queryRaw<[{ revenue: number }]>`
386 |         SELECT COALESCE(SUM(r."totalSum"), 0)::float AS revenue
387 |         FROM "Event" e
388 |         JOIN "EventReport" r ON r."eventId" = e.id
389 |         WHERE e.status = 'RE_SALE'
390 |         ${staffFilters}
391 |       `,
392 |       this.prisma.event.count({
393 |         where: {
394 |           status: 'RE_SALE',
395 |           ...(dateFrom ? { date: { gte: dateFrom } } : {}),
396 |           ...(cityId ? { cityId } : {}),
397 |         },
398 |       }),
399 |     ]);
400 | 
401 |     const staff = [...hostRows, ...driverRows].sort(
402 |       (a, b) => b.revenue - a.revenue,
403 |     );
404 |     const totalRevenue = totalAgg[0]?.revenue ?? 0;
405 | 
406 |     return { staff, totalRevenue, eventsCount };
407 |   }
408 | }
409 | 
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
  0 | import { NestFactory, Reflector } from '@nestjs/core';
  1 | import { AppModule } from './app.module';
  2 | import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
  3 | import cookieParser from 'cookie-parser';
  4 | import helmet from 'helmet';
  5 | import { Logger } from 'nestjs-pino';
  6 | import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
  7 | 
  8 | async function bootstrap() {
  9 |   const app = await NestFactory.create(AppModule, { bufferLogs: true });
 10 |   app.useLogger(app.get(Logger));
 11 |   app.use(helmet());
 12 |   app.use(cookieParser());
 13 | 
 14 |   const allowedOrigins = (process.env.FRONTEND_URL ?? '')
 15 |     .split(',')
 16 |     .map((o) => o.trim())
 17 |     .filter(Boolean);
 18 | 
 19 |   app.enableCors({
 20 |     origin: allowedOrigins,
 21 |     credentials: true,
 22 |   });
 23 |   app.useGlobalPipes(
 24 |     new ValidationPipe({
 25 |       transform: true,
 26 |       whitelist: true,
 27 |       forbidNonWhitelisted: true,
 28 |     }),
 29 |   );
 30 |   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
 31 |   app.useGlobalFilters(new AllExceptionsFilter());
 32 | 
 33 |   await app.listen(process.env.PORT ?? 3000);
 34 | }
 35 | bootstrap();
 36 | 
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

### File: apps/backend/src/schools/dto/find-contacts-query.dto.ts
```ts
  0 | import { IsOptional, IsString, MinLength } from 'class-validator';
  1 | 
  2 | export class FindContactsQueryDto {
  3 |   @IsOptional()
  4 |   @IsString()
  5 |   @MinLength(1)
  6 |   q?: string;
  7 | 
  8 |   @IsOptional()
  9 |   @IsString()
 10 |   city?: string;
 11 | }
 12 | 
```

### File: apps/backend/src/schools/dto/find-schools-query.dto.ts
```ts
  0 | import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';
  1 | 
  2 | export class FindSchoolsQueryDto {
  3 |   @IsOptional()
  4 |   @IsString()
  5 |   @MinLength(2)
  6 |   q?: string;
  7 | 
  8 |   @IsOptional()
  9 |   @IsIn(['Школа', 'Садочок'])
 10 |   type?: 'Школа' | 'Садочок';
 11 | }
 12 | 
```

### File: apps/backend/src/schools/dto/school-query.dto.ts
```ts
  0 | import { IsOptional, IsIn, IsString } from 'class-validator';
  1 | import { PageOptionsDto } from '../../common/dto/page-options.dto';
  2 | 
  3 | export class SchoolQueryDto extends PageOptionsDto {
  4 |   @IsOptional()
  5 |   @IsString()
  6 |   search?: string;
  7 | 
  8 |   @IsOptional()
  9 |   @IsString()
 10 |   cityId?: string;
 11 | 
 12 |   @IsOptional()
 13 |   @IsIn(['Школа', 'Садочок'])
 14 |   type?: 'Школа' | 'Садочок';
 15 | 
 16 |   @IsOptional()
 17 |   @IsIn(['new', 'planned', 'inProgress', 'done'])
 18 |   stage?: 'new' | 'planned' | 'inProgress' | 'done';
 19 | 
 20 |   @IsOptional()
 21 |   @IsIn(['small', 'medium', 'large'])
 22 |   size?: 'small' | 'medium' | 'large';
 23 | }
 24 | 
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
 21 | import { SchoolQueryDto } from './dto/school-query.dto';
 22 | import { FindSchoolsQueryDto } from './dto/find-schools-query.dto';
 23 | import { FindContactsQueryDto } from './dto/find-contacts-query.dto';
 24 | @Controller('schools')
 25 | @UseGuards(AuthGuard, RolesGuard)
 26 | export class SchoolsController {
 27 |   constructor(
 28 |     private readonly schoolsService: SchoolsService,
 29 |     private readonly parserService: ParserService,
 30 |   ) {}
 31 | 
 32 |   @Post('bulk-import')
 33 |   @Roles('SUPERADMIN', 'MANAGER')
 34 |   bulkImport(@Body() body: BulkImportDto) {
 35 |     return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
 36 |   }
 37 | 
 38 |   @Get('supported-cities')
 39 |   getSupportedCities() {
 40 |     return this.parserService.getSupportedCities();
 41 |   }
 42 | 
 43 |   @Post()
 44 |   @Roles('SUPERADMIN', 'MANAGER')
 45 |   create(@Body() body: CreateSchoolDto) {
 46 |     return this.schoolsService.create(body);
 47 |   }
 48 | 
 49 |   @Get()
 50 |   findAll(@Query() query: SchoolQueryDto) {
 51 |     return this.schoolsService.findAll(query);
 52 |   }
 53 | 
 54 |   @Get('stats')
 55 |   getStats(
 56 |     @Query('cityId') cityId?: string,
 57 |     @Query('type') type?: 'Школа' | 'Садочок',
 58 |     @Query('stage') stage?: 'new' | 'planned' | 'inProgress' | 'done',
 59 |   ) {
 60 |     return this.schoolsService.getStats({ cityId, type, stage });
 61 |   }
 62 | 
 63 |   @Get('search')
 64 |   search(@Query() query: FindSchoolsQueryDto) {
 65 |     return this.parserService.searchSchools(query.q ?? '', query.type);
 66 |   }
 67 | 
 68 |   @Get(':id')
 69 |   findOne(@Param('id') id: string) {
 70 |     return this.schoolsService.findOne(id);
 71 |   }
 72 | 
 73 |   @Patch(':id')
 74 |   @UseGuards(OwnershipGuard)
 75 |   @CheckOwnership('school')
 76 |   update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
 77 |     return this.schoolsService.update(id, body);
 78 |   }
 79 | 
 80 |   @Delete(':id')
 81 |   @Roles('SUPERADMIN')
 82 |   remove(@Param('id') id: string) {
 83 |     return this.schoolsService.remove(id);
 84 |   }
 85 | 
 86 |   @Get('contacts/search')
 87 |   searchContacts(@Query() query: FindContactsQueryDto) {
 88 |     return this.schoolsService.searchContacts(query.q ?? '', query.city);
 89 |   }
 90 | }
 91 | 
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
  6 | import { Prisma } from '@prisma/client';
  7 | import { EventsService } from '../events/events.service';
  8 | import { ParserService } from './parser.service';
  9 | import { PrismaService } from '../prisma/prisma.service';
 10 | import { PageMetaDto } from '../common/dto/page-meta.dto';
 11 | import { SchoolQueryDto } from './dto/school-query.dto';
 12 | 
 13 | const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
 14 | const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];
 15 | 
 16 | @Injectable()
 17 | export class SchoolsService {
 18 |   constructor(
 19 |     @Inject(forwardRef(() => EventsService))
 20 |     private readonly eventsService: EventsService,
 21 |     private readonly parserService: ParserService,
 22 |     private readonly prisma: PrismaService,
 23 |   ) {}
 24 | 
 25 |   async create(data: {
 26 |     name: string;
 27 |     type: string;
 28 |     cityId: string;
 29 |     sourceUrl?: string;
 30 |     director?: string;
 31 |     phone?: string;
 32 |     address?: string;
 33 |     childrenCount?: number;
 34 |   }) {
 35 |     const { sourceUrl, ...schoolData } = data;
 36 | 
 37 |     const newSchool = await this.prisma.school.create({
 38 |       data: schoolData,
 39 |     });
 40 | 
 41 |     this.parserService
 42 |       .parseSchoolData(data.name, sourceUrl, data.type)
 43 |       .then(async (parsed) => {
 44 |         if (!parsed) {
 45 |           console.log(`Не вдалося знайти дані для закладу: ${data.name}`);
 46 |           return;
 47 |         }
 48 | 
 49 |         const updateData: Record<string, unknown> = {};
 50 | 
 51 |         if (!schoolData.address && parsed.address) {
 52 |           updateData.address = parsed.address;
 53 |         }
 54 |         if (!schoolData.director && parsed.director) {
 55 |           updateData.director = parsed.director;
 56 |         }
 57 |         if (!schoolData.childrenCount && parsed.childrenCount) {
 58 |           updateData.childrenCount = parsed.childrenCount;
 59 |         }
 60 | 
 61 |         if (Object.keys(updateData).length === 0) {
 62 |           console.log(
 63 |             `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
 64 |           );
 65 |           return;
 66 |         }
 67 | 
 68 |         await this.prisma.school.update({
 69 |           where: {
 70 |             id: newSchool.id,
 71 |           },
 72 |           data: updateData,
 73 |         });
 74 | 
 75 |         console.log(`Дані школи "${data.name}" успішно оновлені`);
 76 |       })
 77 |       .catch((error) => {
 78 |         console.error('Помилка оновлення даних школи:', error);
 79 |       });
 80 | 
 81 |     return newSchool;
 82 |   }
 83 | 
 84 |   private buildFilters(
 85 |     query: Pick<
 86 |       SchoolQueryDto,
 87 |       'search' | 'cityId' | 'type' | 'stage' | 'size'
 88 |     >,
 89 |   ): Prisma.Sql[] {
 90 |     const { search, cityId, type, stage, size } = query;
 91 |     const conditions: Prisma.Sql[] = [];
 92 | 
 93 |     if (search) {
 94 |       const like = `%${search}%`;
 95 |       conditions.push(
 96 |         Prisma.sql`(s.name ILIKE ${like} OR s.director ILIKE ${like} OR s.address ILIKE ${like})`,
 97 |       );
 98 |     }
 99 |     if (cityId) {
100 |       conditions.push(Prisma.sql`s."cityId" = ${cityId}`);
101 |     }
102 |     if (type) {
103 |       conditions.push(Prisma.sql`s.type = ${type}`);
104 |     }
105 |     if (stage) {
106 |       conditions.push(this.stageCondition(stage));
107 |     }
108 |     if (size) {
109 |       conditions.push(this.sizeCondition(size));
110 |     }
111 | 
112 |     return conditions;
113 |   }
114 | 
115 |   private sizeCaseSql(): Prisma.Sql {
116 |     return Prisma.sql`
117 |       CASE
118 |         WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 50 THEN 'small'
119 |         WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 100 THEN 'medium'
120 |         WHEN s.type = 'Садочок' THEN 'large'
121 |         WHEN COALESCE(s."childrenCount", 0) < 500 THEN 'small'
122 |         WHEN COALESCE(s."childrenCount", 0) < 900 THEN 'medium'
123 |         ELSE 'large'
124 |       END
125 |     `;
126 |   }
127 | 
128 |   private stageCondition(stage: string): Prisma.Sql {
129 |     switch (stage) {
130 |       case 'planned':
131 |         return Prisma.sql`latest.status::text IN (${Prisma.join(PLANNED_STAGES)})`;
132 |       case 'inProgress':
133 |         return Prisma.sql`latest.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})`;
134 |       case 'done':
135 |         return Prisma.sql`latest.status::text = 'RE_SALE'`;
136 |       default:
137 |         return Prisma.sql`(latest.status IS NULL OR latest.status::text IN ('INTERESTED','PRE_APPROVAL'))`;
138 |     }
139 |   }
140 | 
141 |   private sizeCondition(size: string): Prisma.Sql {
142 |     return Prisma.sql`(${this.sizeCaseSql()}) = ${size}`;
143 |   }
144 | 
145 |   private mapRow(row: any) {
146 |     const { city_id, city_name, latestStatus, ...school } = row;
147 |     return {
148 |       ...school,
149 |       city: city_id ? { id: city_id, name: city_name } : null,
150 |       events: latestStatus ? [{ status: latestStatus }] : [],
151 |     };
152 |   }
153 | 
154 |   async findAll(query: SchoolQueryDto) {
155 |     const { skip, take, page } = query;
156 |     const conditions = this.buildFilters(query);
157 |     const whereClause = conditions.length
158 |       ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
159 |       : Prisma.empty;
160 | 
161 |     const baseFrom = Prisma.sql`
162 |       FROM "School" s
163 |       LEFT JOIN "City" c ON c.id = s."cityId"
164 |       LEFT JOIN LATERAL (
165 |         SELECT e.status FROM "Event" e
166 |         WHERE e."schoolId" = s.id
167 |         ORDER BY e.date DESC
168 |         LIMIT 1
169 |       ) latest ON true
170 |     `;
171 | 
172 |     const rows = await this.prisma.$queryRaw<any[]>(Prisma.sql`
173 |       SELECT s.*, c.id as city_id, c.name as city_name, latest.status as "latestStatus"
174 |       ${baseFrom}
175 |       ${whereClause}
176 |       ORDER BY s."createdAt" DESC
177 |       OFFSET ${skip} LIMIT ${take}
178 |     `);
179 | 
180 |     const countRows = await this.prisma.$queryRaw<
181 |       { count: bigint }[]
182 |     >(Prisma.sql`
183 |       SELECT COUNT(*)::bigint as count
184 |       ${baseFrom}
185 |       ${whereClause}
186 |     `);
187 | 
188 |     const totalItems = Number(countRows[0].count);
189 | 
190 |     return {
191 |       data: rows.map((r) => this.mapRow(r)),
192 |       meta: new PageMetaDto(totalItems, page, take),
193 |     };
194 |   }
195 | 
196 |   async getStats(query: Pick<SchoolQueryDto, 'cityId' | 'type' | 'stage'>) {
197 |     const baseConditions = this.buildFilters({
198 |       cityId: query.cityId,
199 |       type: query.type,
200 |     });
201 |     const baseWhere = baseConditions.length
202 |       ? Prisma.sql`WHERE ${Prisma.join(baseConditions, ' AND ')}`
203 |       : Prisma.empty;
204 | 
205 |     const sizeConditions = this.buildFilters({
206 |       cityId: query.cityId,
207 |       type: query.type,
208 |       stage: query.stage,
209 |     });
210 |     const sizeWhere = sizeConditions.length
211 |       ? Prisma.sql`WHERE ${Prisma.join(sizeConditions, ' AND ')}`
212 |       : Prisma.empty;
213 | 
214 |     const baseFrom = Prisma.sql`
215 |       FROM "School" s
216 |       LEFT JOIN LATERAL (
217 |         SELECT e.status FROM "Event" e
218 |         WHERE e."schoolId" = s.id
219 |         ORDER BY e.date DESC
220 |         LIMIT 1
221 |       ) latest ON true
222 |     `;
223 | 
224 |     const [statusRows, sizeRows] = await Promise.all([
225 |       this.prisma.$queryRaw<{ stage: string; count: bigint }[]>(Prisma.sql`
226 |         SELECT
227 |           CASE
228 |             WHEN latest.status::text IN (${Prisma.join(PLANNED_STAGES)}) THEN 'planned'
229 |             WHEN latest.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)}) THEN 'inProgress'
230 |             WHEN latest.status::text = 'RE_SALE' THEN 'done'
231 |             ELSE 'new'
232 |           END as stage,
233 |           COUNT(*)::bigint as count
234 |         ${baseFrom}
235 |         ${baseWhere}
236 |         GROUP BY stage
237 |       `),
238 |       this.prisma.$queryRaw<{ size: string; count: bigint }[]>(Prisma.sql`
239 |         SELECT
240 |           ${this.sizeCaseSql()} as size,
241 |           COUNT(*)::bigint as count
242 |         ${baseFrom}
243 |         ${sizeWhere}
244 |         GROUP BY size
245 |       `),
246 |     ]);
247 | 
248 |     const statusStats = { new: 0, planned: 0, inProgress: 0, done: 0 };
249 |     for (const row of statusRows) statusStats[row.stage] = Number(row.count);
250 | 
251 |     const sizeStats = { small: 0, medium: 0, large: 0 };
252 |     for (const row of sizeRows) sizeStats[row.size] = Number(row.count);
253 | 
254 |     return { statusStats, sizeStats };
255 |   }
256 | 
257 |   async findOne(id: string) {
258 |     const school = await this.prisma.school.findUnique({
259 |       where: {
260 |         id,
261 |       },
262 |       include: {
263 |         city: true,
264 |       },
265 |     });
266 |     if (!school) {
267 |       throw new NotFoundException(`Школу з ID ${id} не знайдено`);
268 |     }
269 | 
270 |     return school;
271 |   }
272 | 
273 |   async update(id: string, data: any) {
274 |     const { city, id: _id, createdAt, updatedAt, ...updateData } = data;
275 | 
276 |     return this.prisma.school.update({
277 |       where: {
278 |         id,
279 |       },
280 |       data: updateData,
281 |     });
282 |   }
283 | 
284 |   async remove(id: string) {
285 |     const events = await this.prisma.event.findMany({
286 |       where: {
287 |         schoolId: id,
288 |       },
289 |     });
290 | 
291 |     for (const event of events) {
292 |       await this.eventsService.remove(event.id);
293 |     }
294 | 
295 |     return this.prisma.school.delete({
296 |       where: {
297 |         id,
298 |       },
299 |     });
300 |   }
301 | 
302 |   async searchContacts(q: string, city?: string) {
303 |     if (!q || q.trim().length < 1) return [];
304 | 
305 |     const cityName = city || 'Львів';
306 |     const normalizedQuery = q.toLowerCase().trim();
307 | 
308 |     const allContacts = await this.prisma.schoolContact.findMany({
309 |       where: { city: cityName },
310 |       orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
311 |     });
312 | 
313 |     const STOP_WORDS = new Set([
314 |       'школа',
315 |       'школи',
316 |       'садочок',
317 |       'садок',
318 |       'дитсадок',
319 |       'днз',
320 |       'ліцей',
321 |       'гімназія',
322 |       'зош',
323 |       'центр',
324 |       'розвитку',
325 |       'комунальний',
326 |       'заклад',
327 |       'освіти',
328 |       'імені',
329 |       'ім',
330 |     ]);
331 | 
332 |     const tokens = normalizedQuery
333 |       .replace(/№/g, ' ')
334 |       .split(/\s+/)
335 |       .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
336 |       .filter((t) => t.length > 0 && !STOP_WORDS.has(t));
337 | 
338 |     const matches = allContacts.filter((c) => {
339 |       const num = c.schoolNumber.toLowerCase();
340 | 
341 |       if (num === normalizedQuery) return true;
342 | 
343 |       const isNumeric = /^\d+$/.test(num);
344 | 
345 |       if (isNumeric) {
346 |         if (tokens.includes(num)) return true;
347 |       } else {
348 |         if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
349 |           return true;
350 |         if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
351 |       }
352 | 
353 |       if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;
354 | 
355 |       return false;
356 |     });
357 | 
358 |     return matches.slice(0, 10);
359 |   }
360 |   async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
361 |     const city = await this.prisma.city.findUnique({ where: { id: cityId } });
362 |     if (!city) throw new Error(`Місто з id=${cityId} не знайдено`);
363 | 
364 |     const allFromParser = await this.parserService.getAllSchoolsForCity(
365 |       city.name,
366 |       type,
367 |     );
368 | 
369 |     const existingSchools = await this.prisma.school.findMany({
370 |       where: { cityId, type },
371 |       select: { name: true },
372 |     });
373 | 
374 |     const normalize = (name: string) =>
375 |       name
376 |         .toLowerCase()
377 |         .replace(/№/g, '')
378 |         .replace(/["'«»]/g, '')
379 |         .replace(/\s+/g, '')
380 |         .trim();
381 | 
382 |     const existingNames = new Set(
383 |       existingSchools.map((s) => normalize(s.name)),
384 |     );
385 | 
386 |     const toCreate = allFromParser.filter(
387 |       (s) => !existingNames.has(normalize(s.name)),
388 |     );
389 | 
390 |     if (toCreate.length === 0) {
391 |       return {
392 |         total: allFromParser.length,
393 |         created: 0,
394 |         skipped: allFromParser.length,
395 |       };
396 |     }
397 | 
398 |     const contacts = await this.prisma.schoolContact.findMany({
399 |       where: { city: city.name },
400 |     });
401 | 
402 |     let created = 0;
403 |     for (const school of toCreate) {
404 |       if (existingNames.has(normalize(school.name))) continue;
405 | 
406 |       existingNames.add(normalize(school.name));
407 | 
408 |       const numMatch = school.name.match(/№?\s*(\d+)/);
409 |       const num = numMatch?.[1];
410 |       const matchedContacts = num
411 |         ? contacts.filter((c) => c.schoolNumber === num)
412 |         : contacts.filter((c) => {
413 |             const normSchool = normalize(school.name);
414 |             const normContact = normalize(c.schoolNumber);
415 |             return (
416 |               normSchool.includes(normContact) ||
417 |               normContact.includes(normSchool)
418 |             );
419 |           });
420 | 
421 |       const director =
422 |         matchedContacts.find(
423 |           (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
424 |         ) || matchedContacts[0];
425 | 
426 |       try {
427 |         await this.create({
428 |           name: school.name,
429 |           type,
430 |           cityId,
431 |           sourceUrl: school.url,
432 |           director: director?.contactName || '',
433 |           phone: director?.phone || '',
434 |         });
435 |         created++;
436 |       } catch (e) {
437 |         console.error(`Помилка створення ${school.name}:`, e);
438 |       }
439 |     }
440 | 
441 |     return {
442 |       city: city.name,
443 |       total: allFromParser.length,
444 |       created,
445 |       skipped: allFromParser.length - created,
446 |     };
447 |   }
448 | }
449 | 
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
  6 |   IsEnum,
  7 | } from 'class-validator';
  8 | import { UserRole } from '@prisma/client';
  9 | 
 10 | export class CreateUserDto {
 11 |   @IsString()
 12 |   @IsNotEmpty()
 13 |   fullName: string;
 14 | 
 15 |   @IsEmail()
 16 |   email: string;
 17 | 
 18 |   @IsString()
 19 |   @MinLength(6)
 20 |   password: string;
 21 | 
 22 |   @IsOptional()
 23 |   @IsString()
 24 |   phone?: string;
 25 | 
 26 |   @IsOptional()
 27 |   @IsEnum(UserRole)
 28 |   role?: UserRole;
 29 | 
 30 |   @IsOptional()
 31 |   @IsString()
 32 |   cityId?: string;
 33 | 
 34 |   @IsOptional()
 35 |   @IsString()
 36 |   telegramId?: string;
 37 | 
 38 |   @IsOptional()
 39 |   @IsString()
 40 |   car?: string;
 41 | }
 42 | 
```

### File: apps/backend/src/users/dto/update-user.dto.ts
```ts
  0 | import {
  1 |   IsString,
  2 |   IsEmail,
  3 |   IsOptional,
  4 |   MinLength,
  5 |   IsEnum,
  6 | } from 'class-validator';
  7 | import { UserRole } from '@prisma/client';
  8 | 
  9 | export class UpdateUserDto {
 10 |   @IsOptional()
 11 |   @IsString()
 12 |   fullName?: string;
 13 | 
 14 |   @IsOptional()
 15 |   @IsEmail()
 16 |   email?: string;
 17 | 
 18 |   @IsOptional()
 19 |   @IsString()
 20 |   @MinLength(6)
 21 |   password?: string;
 22 | 
 23 |   @IsOptional()
 24 |   @IsString()
 25 |   phone?: string;
 26 | 
 27 |   @IsOptional()
 28 |   @IsEnum(UserRole)
 29 |   role?: UserRole;
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
 44 | }
 45 | 
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
 98 |   async findAll() {
 99 |     return this.prisma.user.findMany();
100 |   }
101 | 
102 |   async updateTelegramChatId(username: string, chatId: string) {
103 |     return this.prisma.user.updateMany({
104 |       where: {
105 |         telegramId: {
106 |           equals: username,
107 |           mode: 'insensitive',
108 |         },
109 |       },
110 |       data: { telegramChatId: chatId },
111 |     });
112 |   }
113 | }
114 | 
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
  1 | 
  2 | function lazyWithRetry(factory: () => Promise<any>) {
  3 |   return lazy(async () => {
  4 |     try {
  5 |       return await factory();
  6 |     } catch (err) {
  7 |       const key = "chunk-reload-ts";
  8 |       const last = Number(sessionStorage.getItem(key) || 0);
  9 |       if (Date.now() - last > 10000) {
 10 |         sessionStorage.setItem(key, String(Date.now()));
 11 |         window.location.reload();
 12 |         return new Promise(() => {});
 13 |       }
 14 |       throw err;
 15 |     }
 16 |   });
 17 | }
 18 | import {
 19 |   BrowserRouter as Router,
 20 |   Routes,
 21 |   Route,
 22 |   Navigate,
 23 | } from "react-router-dom";
 24 | 
 25 | import Layout from "./components/Layout";
 26 | import Login from "./pages/Login";
 27 | import { CityProvider } from "./context/CityContext";
 28 | import { AuthProvider, useAuth } from "./context/AuthContext";
 29 | import { api } from "./config/api";
 30 | 
 31 | import ProtectedRoute from "./components/ProtectedRoute";
 32 | 
 33 | const CityProfile = lazyWithRetry(() => import("./pages/CityProfile"));
 34 | const EventReport = lazyWithRetry(() => import("./pages/EventReport"));
 35 | 
 36 | const Cities = lazyWithRetry(() => import("./pages/Cities"));
 37 | const Schools = lazyWithRetry(() => import("./pages/Schools"));
 38 | const SchoolProfile = lazyWithRetry(() => import("./pages/SchoolProfile"));
 39 | const Employees = lazyWithRetry(() => import("./pages/Employees"));
 40 | const Finance = lazyWithRetry(() => import("./pages/Finance"));
 41 | const CalendarView = lazyWithRetry(() => import("./pages/CalendarView"));
 42 | const Dashboard = lazyWithRetry(() => import("./pages/Dashboard"));
 43 | const Kindergartens = lazyWithRetry(() => import("./pages/Kindergartens"));
 44 | 
 45 | const PageLoader = () => (
 46 |   <div className="flex items-center justify-center h-full min-h-[50vh]">
 47 |     <div className="text-slate-400 font-medium animate-pulse">
 48 |       Завантаження сторінки...
 49 |     </div>
 50 |   </div>
 51 | );
 52 | 
 53 | function AppRoutes() {
 54 |   const { user, loading, setUser } = useAuth();
 55 |   const isAuthenticated = !!user;
 56 | 
 57 |   const handleLogin = (loggedInUser: any) => {
 58 |     setUser(loggedInUser);
 59 |   };
 60 | 
 61 |   const handleLogout = async () => {
 62 |     try {
 63 |       await api.post("/auth/logout");
 64 |     } catch (e) {
 65 |       console.error("Logout error", e);
 66 |     }
 67 | 
 68 |     setUser(null);
 69 |     window.location.replace("/login");
 70 |   };
 71 | 
 72 |   if (loading) return <PageLoader />;
 73 | 
 74 |   return (
 75 |     <CityProvider>
 76 |       <Routes>
 77 |         {/* Публічний маршрут: Логін */}
 78 |         <Route
 79 |           path="/login"
 80 |           element={
 81 |             !isAuthenticated ? (
 82 |               <Login onLogin={handleLogin} />
 83 |             ) : (
 84 |               <Navigate to="/cities" replace />
 85 |             )
 86 |           }
 87 |         />
 88 | 
 89 |         {/* Захищені маршрути (Layout відображає бокове меню) */}
 90 |         <Route
 91 |           path="/"
 92 |           element={
 93 |             isAuthenticated ? (
 94 |               <Layout />
 95 |             ) : (
 96 |               <Navigate to="/login" replace />
 97 |             )
 98 |           }
 99 |         >
100 |           {/* Редірект з кореня на сторінку міст за замовчуванням */}
101 |           <Route index element={<Navigate to="/schools" replace />} />
102 | 
103 |           {/* Обгортаємо всі вкладені маршрути в Suspense. 
104 |               Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
105 |               поки завантажується файл з сервера.
106 |             */}
107 |           <Route
108 |             path="cities"
109 |             element={
110 |               <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
111 |                 <Suspense fallback={<PageLoader />}>
112 |                   <Cities />
113 |                 </Suspense>
114 |               </ProtectedRoute>
115 |             }
116 |           />
117 | 
118 |           <Route
119 |             path="schools"
120 |             element={
121 |               <Suspense fallback={<PageLoader />}>
122 |                 <Schools />
123 |               </Suspense>
124 |             }
125 |           />
126 | 
127 |           <Route
128 |             path="schools/:id"
129 |             element={
130 |               <Suspense fallback={<PageLoader />}>
131 |                 <SchoolProfile />
132 |               </Suspense>
133 |             }
134 |           />
135 | 
136 |           <Route
137 |             path="employees"
138 |             element={
139 |               <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
140 |                 <Suspense fallback={<PageLoader />}>
141 |                   <Employees />
142 |                 </Suspense>
143 |               </ProtectedRoute>
144 |             }
145 |           />
146 | 
147 |           <Route
148 |             path="finance"
149 |             element={
150 |               <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
151 |                 <Suspense fallback={<PageLoader />}>
152 |                   <Finance />
153 |                 </Suspense>
154 |               </ProtectedRoute>
155 |             }
156 |           />
157 | 
158 |           <Route
159 |             path="calendar"
160 |             element={
161 |               <Suspense fallback={<PageLoader />}>
162 |                 <CalendarView />
163 |               </Suspense>
164 |             }
165 |           />
166 |           <Route
167 |             path="dashboard"
168 |             element={
169 |               <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
170 |                 <Suspense fallback={<PageLoader />}>
171 |                   <Dashboard />
172 |                 </Suspense>
173 |               </ProtectedRoute>
174 |             }
175 |           />
176 | 
177 |           <Route
178 |             path="kindergartens"
179 |             element={
180 |               <Suspense fallback={<PageLoader />}>
181 |                 <Kindergartens />
182 |               </Suspense>
183 |             }
184 |           />
185 | 
186 |           <Route
187 |             path="cities/:id"
188 |             element={
189 |               <Suspense fallback={<PageLoader />}>
190 |                 <CityProfile />
191 |               </Suspense>
192 |             }
193 |           />
194 | 
195 |           <Route
196 |             path="events/:id/report"
197 |             element={
198 |               <Suspense fallback={<PageLoader />}>
199 |                 <EventReport />
200 |               </Suspense>
201 |             }
202 |           />
203 |         </Route>
204 |       </Routes>
205 |     </CityProvider>
206 |   );
207 | }
208 | export default function App() {
209 |   return (
210 |     <Router>
211 |       <AuthProvider>
212 |         <AppRoutes />
213 |       </AuthProvider>
214 |     </Router>
215 |   );
216 | }
217 | 
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
  0 | import { Link, Outlet, useLocation } from "react-router-dom";
  1 | import { useState } from "react";
  2 | import { useSelectedCity } from "../context/CityContext";
  3 | import { useQueryClient } from "@tanstack/react-query";
  4 | import { useAuth } from "../context/AuthContext";
  5 | 
  6 | export default function Layout() {
  7 |   const location = useLocation();
  8 |   const queryClient = useQueryClient();
  9 |   const { user, logout } = useAuth();
 10 |   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 11 | 
 12 |   const is = (roles: string[]) => !!user?.role && roles.includes(user.role);
 13 |   const { selectedCity } = useSelectedCity();
 14 | 
 15 |   const isActive = (path: string) => location.pathname.startsWith(path);
 16 | 
 17 |   const handleLogout = async () => {
 18 |     await logout();
 19 |     queryClient.clear();
 20 |     window.location.href = "/login";
 21 |   };
 22 | 
 23 |   const handleLinkClick = () => {
 24 |     setIsMobileMenuOpen(false);
 25 |   };
 26 | 
 27 |   return (
 28 |     <div className="flex h-screen bg-slate-50 font-sans">
 29 |       {/* Мобільний хедер (видно тільки на малих екранах) */}
 30 |       <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
 31 |         <div className="flex items-center gap-2">
 32 |           <span className="text-xl">🎓</span>
 33 |           <span className="font-semibold tracking-wider text-sm">
 34 |             СВІТЛО ЗНАНЬ
 35 |           </span>
 36 |           <span className="text-xs text-blue-300 ml-1">
 37 |             · {selectedCity.name}
 38 |           </span>
 39 |         </div>
 40 |         <button
 41 |           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 42 |           className="p-2 focus:outline-none"
 43 |         >
 44 |           {/* Проста іконка гамбургера / хрестика */}
 45 |           <span className="text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
 46 |         </button>
 47 |       </div>
 48 | 
 49 |       {/* Оверлей для мобільного меню (затемнення фону) */}
 50 |       {isMobileMenuOpen && (
 51 |         <div
 52 |           className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
 53 |           onClick={() => setIsMobileMenuOpen(false)}
 54 |         />
 55 |       )}
 56 | 
 57 |       {/* Сайдбар */}
 58 |       <aside
 59 |         className={`
 60 |         fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
 61 |         md:relative md:translate-x-0
 62 |         ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
 63 |       `}
 64 |       >
 65 |         <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
 66 |           <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-2xl">
 67 |             🎓
 68 |           </div>
 69 |           <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
 70 |           <p className="text-xs text-blue-300 mt-1 tracking-wide">
 71 |             📍 {selectedCity.name}
 72 |           </p>
 73 |         </div>
 74 | 
 75 |         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
 76 |           {is(["SUPERADMIN", "MANAGER"]) && (
 77 |             <Link
 78 |               to="/dashboard"
 79 |               onClick={handleLinkClick}
 80 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/dashboard") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
 81 |             >
 82 |               <span className="mr-3">🏠</span> Дашборд
 83 |             </Link>
 84 |           )}
 85 |           {is(["SUPERADMIN", "MANAGER"]) && (
 86 |             <Link
 87 |               to="/cities"
 88 |               onClick={handleLinkClick}
 89 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/cities") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
 90 |             >
 91 |               <span className="mr-3">📍</span> Міста
 92 |             </Link>
 93 |           )}
 94 |           <Link
 95 |             to="/schools"
 96 |             onClick={handleLinkClick}
 97 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/schools") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
 98 |           >
 99 |             <span className="mr-3">🏫</span> Школи
100 |           </Link>
101 | 
102 |           {/* ДОДАЛИ НОВИЙ ПУНКТ "САДОЧКИ" */}
103 |           <Link
104 |             to="/kindergartens"
105 |             onClick={handleLinkClick}
106 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/kindergartens") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
107 |           >
108 |             <span className="mr-3">🧸</span> Садочки
109 |           </Link>
110 |           {is(["SUPERADMIN", "MANAGER"]) && (
111 |             <Link
112 |               to="/finance"
113 |               onClick={handleLinkClick}
114 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/finance") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
115 |             >
116 |               <span className="mr-3">💰</span> Фінанси
117 |             </Link>
118 |           )}
119 |           <Link
120 |             to="/calendar"
121 |             onClick={handleLinkClick}
122 |             className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/calendar") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
123 |           >
124 |             <span className="mr-3">📆</span> Календар
125 |           </Link>
126 |           {is(["SUPERADMIN"]) && (
127 |             <Link
128 |               to="/employees"
129 |               onClick={handleLinkClick}
130 |               className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/employees") ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
131 |             >
132 |               <span className="mr-3">👥</span> Працівники
133 |             </Link>
134 |           )}
135 |         </nav>
136 | 
137 |         <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
138 |           <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
139 |             <div className="flex items-center">
140 |               <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
141 |                 {user?.name?.charAt(0) ?? "?"}
142 |               </div>
143 |               <div className="text-sm truncate max-w-[120px]">
144 |                 <p className="font-medium text-white truncate">
145 |                   {user?.name ?? "Користувач"}
146 |                 </p>
147 |                 <p className="text-xs text-slate-400 truncate">
148 |                   {user?.role ?? ""}
149 |                 </p>
150 |               </div>
151 |             </div>
152 |             <button
153 |               onClick={handleLogout}
154 |               className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium ml-2 shrink-0 px-2.5 py-2 rounded-lg"
155 |               title="Вийти"
156 |             >
157 |               <svg
158 |                 xmlns="http://www.w3.org/2000/svg"
159 |                 viewBox="0 0 24 24"
160 |                 fill="none"
161 |                 stroke="currentColor"
162 |                 strokeWidth="2"
163 |                 strokeLinecap="round"
164 |                 strokeLinejoin="round"
165 |                 className="w-4 h-4"
166 |               >
167 |                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
168 |                 <polyline points="16 17 21 12 16 7" />
169 |                 <line x1="21" y1="12" x2="9" y2="12" />
170 |               </svg>
171 |               Вийти
172 |             </button>
173 |           </div>
174 |         </div>
175 |       </aside>
176 | 
177 |       {/* Головна область */}
178 |       <main className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full">
179 |         <Outlet />
180 |       </main>
181 |     </div>
182 |   );
183 | }
184 | 
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
  1 | import { useAuth } from "../context/AuthContext";
  2 | 
  3 | interface Props {
  4 |   allowedRoles: string[];
  5 |   children: React.ReactNode;
  6 | }
  7 | 
  8 | export default function ProtectedRoute({ allowedRoles, children }: Props) {
  9 |   const { user } = useAuth();
 10 |   if (!user || !allowedRoles.includes(user.role)) {
 11 |     return <Navigate to="/dashboard" replace />;
 12 |   }
 13 |   return <>{children}</>;
 14 | }
 15 | 
```

### File: apps/frontend/src/components/VirtualSchoolList.tsx
```tsx
  0 | import { useRef, useEffect } from "react";
  1 | import { useVirtualizer } from "@tanstack/react-virtual";
  2 | 
  3 | interface VirtualSchoolListProps {
  4 |   schools: any[];
  5 |   renderItem: (school: any, index: number) => JSX.Element;
  6 |   itemHeight?: number;
  7 |   onEndReached?: () => void;
  8 | }
  9 | 
 10 | export default function VirtualSchoolList({
 11 |   schools,
 12 |   renderItem,
 13 |   itemHeight = 120,
 14 |   onEndReached,
 15 | }: VirtualSchoolListProps) {
 16 |   const parentRef = useRef<HTMLDivElement>(null);
 17 | 
 18 |   const rowVirtualizer = useVirtualizer({
 19 |     count: schools.length,
 20 |     getScrollElement: () => parentRef.current,
 21 |     estimateSize: () => itemHeight,
 22 |     overscan: 5,
 23 |   });
 24 | 
 25 |   const virtualItems = rowVirtualizer.getVirtualItems();
 26 |   const lastItem = virtualItems[virtualItems.length - 1];
 27 | 
 28 |   useEffect(() => {
 29 |     if (!onEndReached || !lastItem) return;
 30 |     if (lastItem.index >= schools.length - 5) {
 31 |       onEndReached();
 32 |     }
 33 |   }, [lastItem?.index, schools.length, onEndReached]);
 34 | 
 35 |   return (
 36 |     <div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto w-full">
 37 |       <div
 38 |         style={{
 39 |           height: `${rowVirtualizer.getTotalSize()}px`,
 40 |           width: "100%",
 41 |           position: "relative",
 42 |         }}
 43 |       >
 44 |         {virtualItems.map((virtualRow) => (
 45 |           <div
 46 |             key={virtualRow.key}
 47 |             style={{
 48 |               position: "absolute",
 49 |               top: 0,
 50 |               left: 0,
 51 |               width: "100%",
 52 |               height: `${virtualRow.size}px`,
 53 |               transform: `translateY(${virtualRow.start}px)`,
 54 |             }}
 55 |           >
 56 |             {renderItem(schools[virtualRow.index], virtualRow.index)}
 57 |           </div>
 58 |         ))}
 59 |       </div>
 60 |     </div>
 61 |   );
 62 | }
 63 | 
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

### File: apps/frontend/src/components/modals/EventSchema.ts
```ts
  0 | import { z } from "zod";
  1 | 
  2 | export const eventSchema = z.object({
  3 |   project: z.string().min(1, "Оберіть вид події"),
  4 |   date: z.string().min(1, "Вкажіть дату"),
  5 |   time: z.string().min(1, "Вкажіть час"),
  6 |   childrenPlanned: z
  7 |     .string()
  8 |     .min(1, "Вкажіть кількість дітей")
  9 |     .refine((v) => Number(v) > 0, "Має бути більше нуля"),
 10 |   price: z
 11 |     .string()
 12 |     .min(1, "Вкажіть вартість")
 13 |     .refine((v) => Number(v) >= 0, "Некоректна вартість"),
 14 |   address: z.string().optional().default(""),
 15 |   contactPerson: z.string().optional().default(""),
 16 |   contactPhone: z.string().optional().default(""),
 17 | });
 18 | 
 19 | export type EventFormValues = z.infer<typeof eventSchema>;
 20 | 
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
  0 | import { memo, useState } from "react";
  1 | import { motion, AnimatePresence } from "framer-motion";
  2 | import type { EventPreparation as EventPreparationData } from "../../types";
  3 | import {
  4 |   PREPARATION_STATUS_LABELS,
  5 |   getNextPreparationStatus,
  6 |   type PreparationStatus,
  7 | } from "../../utils/preparationStatus";
  8 | 
  9 | interface PreparationProps {
 10 |   data: Partial<EventPreparationData>;
 11 |   onUpdate: (field: string, status: PreparationStatus) => void;
 12 |   onOpenCrewModal: () => void;
 13 | }
 14 | 
 15 | export default memo(function EventPreparation({
 16 |   data,
 17 |   onUpdate,
 18 |   onOpenCrewModal,
 19 | }: PreparationProps) {
 20 |   const [optimistic, setOptimistic] = useState<Record<string, string>>({});
 21 | 
 22 |   const tasks = [
 23 |     { key: "assignCrew", label: "Призначити екіпаж" },
 24 |     { key: "bookEquipment", label: "Забронювати обладнання" },
 25 |     { key: "prepareDocs", label: "Підготувати документи" },
 26 |     { key: "prepareMaterials", label: "Підготувати матеріали" },
 27 |     { key: "remindSchool", label: "Нагадати школі про подію" },
 28 |   ];
 29 | 
 30 |   const getStatusColor = (status: PreparationStatus) => {
 31 |     switch (status) {
 32 |       case "DONE":
 33 |         return "bg-emerald-50 text-emerald-600 border border-emerald-200";
 34 |       case "IN_PROGRESS":
 35 |         return "bg-orange-50 text-orange-600 border border-orange-200";
 36 |       default:
 37 |         return "bg-blue-50 text-blue-600 border border-blue-200";
 38 |     }
 39 |   };
 40 | 
 41 |   const handleTaskClick = (key: string) => {
 42 |     if (key === "assignCrew") {
 43 |       onOpenCrewModal();
 44 |     } else {
 45 |       const current = (optimistic[key] ??
 46 |         data[key as keyof EventPreparationData] ??
 47 |         "PLANNED") as PreparationStatus;
 48 |       const next = getNextPreparationStatus(current);
 49 |       setOptimistic((prev) => ({ ...prev, [key]: next }));
 50 |       onUpdate(key, next).catch(() => {
 51 |         setOptimistic((prev) => ({ ...prev, [key]: data[key] }));
 52 |       });
 53 |     }
 54 |   };
 55 | 
 56 |   return (
 57 |     <motion.div
 58 |       whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
 59 |       transition={{ duration: 0.2 }}
 60 |       className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
 61 |     >
 62 |       <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">
 63 |         Підготовка до події
 64 |       </h3>
 65 |       <div className="space-y-3 text-sm">
 66 |         {tasks.map((task) => {
 67 |           const currentStatus = (optimistic[task.key] ??
 68 |             data[task.key as keyof EventPreparationData] ??
 69 |             "PLANNED") as PreparationStatus;
 70 |           return (
 71 |             <motion.div
 72 |               key={task.key}
 73 |               whileTap={{ scale: 0.98 }}
 74 |               className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
 75 |               onClick={() => handleTaskClick(task.key)}
 76 |             >
 77 |               <span className="text-slate-700 font-medium select-none">
 78 |                 {task.label}
 79 |               </span>
 80 |               <AnimatePresence mode="wait">
 81 |                 <motion.span
 82 |                   key={currentStatus}
 83 |                   initial={{ opacity: 0, scale: 0.85 }}
 84 |                   animate={{ opacity: 1, scale: 1 }}
 85 |                   exit={{ opacity: 0, scale: 0.85 }}
 86 |                   transition={{ duration: 0.15 }}
 87 |                   className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
 88 |                 >
 89 |                   {PREPARATION_STATUS_LABELS[currentStatus]}
 90 |                 </motion.span>
 91 |               </AnimatePresence>
 92 |             </motion.div>
 93 |           );
 94 |         })}
 95 |       </div>
 96 |     </motion.div>
 97 |   );
 98 | });
 99 | 
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
  0 | import { useEffect } from "react";
  1 | import { useForm } from "react-hook-form";
  2 | import { zodResolver } from "@hookform/resolvers/zod";
  3 | import {
  4 |   schoolEditSchema,
  5 |   type SchoolEditFormValues,
  6 | } from "./SchoolEditSchema";
  7 | 
  8 | interface EditSchoolModalProps {
  9 |   isOpen: boolean;
 10 |   onClose: () => void;
 11 |   defaultValues: SchoolEditFormValues;
 12 |   onSave: (data: SchoolEditFormValues) => void;
 13 | }
 14 | 
 15 | export default function EditSchoolModal({
 16 |   isOpen,
 17 |   onClose,
 18 |   defaultValues,
 19 |   onSave,
 20 | }: EditSchoolModalProps) {
 21 |   const {
 22 |     register,
 23 |     handleSubmit,
 24 |     reset,
 25 |     formState: { errors, isSubmitting },
 26 |   } = useForm<SchoolEditFormValues>({
 27 |     resolver: zodResolver(schoolEditSchema),
 28 |     defaultValues,
 29 |   });
 30 | 
 31 |   useEffect(() => {
 32 |     if (isOpen) reset(defaultValues);
 33 |     // eslint-disable-next-line react-hooks/exhaustive-deps
 34 |   }, [isOpen]);
 35 | 
 36 |   if (!isOpen) return null;
 37 | 
 38 |   return (
 39 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
 40 |       {/* Bottom-sheet на мобільному, центрований діалог на десктопі */}
 41 |       <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
 42 |         <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
 43 | 
 44 |         {/* Шапка не зжимається (shrink-0) */}
 45 |         <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
 46 |           <h3 className="text-xl font-bold">Редагування</h3>
 47 |           <button onClick={onClose} className="text-slate-400 p-2 -mr-2">
 48 |             ✕
 49 |           </button>
 50 |         </div>
 51 | 
 52 |         {/* Форма скролиться (overflow-y-auto) */}
 53 |         <form
 54 |           onSubmit={handleSubmit(onSave)}
 55 |           className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
 56 |         >
 57 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 58 |             <div>
 59 |               <label className="block text-sm mb-1">Тип</label>
 60 |               <select
 61 |                 {...register("type")}
 62 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 63 |               >
 64 |                 <option>Школа</option>
 65 |                 <option>Садочок</option>
 66 |               </select>
 67 |             </div>
 68 |             <div className="sm:col-span-2">
 69 |               <label className="block text-sm mb-1">Адреса</label>
 70 |               <input
 71 |                 type="text"
 72 |                 {...register("address")}
 73 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 74 |               />
 75 |             </div>
 76 |             <div>
 77 |               <label className="block text-sm mb-1">Контакт</label>
 78 |               <input
 79 |                 type="text"
 80 |                 {...register("director")}
 81 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 82 |               />
 83 |             </div>
 84 |             <div>
 85 |               <label className="block text-sm mb-1">Телефон</label>
 86 |               <input
 87 |                 type="text"
 88 |                 {...register("phone")}
 89 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 90 |               />
 91 |             </div>
 92 |             <div>
 93 |               <label className="block text-sm mb-1">Email</label>
 94 |               <input
 95 |                 type="email"
 96 |                 {...register("email")}
 97 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
 98 |               />
 99 |               {errors.email && (
100 |                 <p className="text-xs text-red-500 mt-1">
101 |                   {errors.email.message}
102 |                 </p>
103 |               )}
104 |             </div>
105 |             <div>
106 |               <label className="block text-sm mb-1">Дітей</label>
107 |               <input
108 |                 type="number"
109 |                 {...register("childrenCount")}
110 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
111 |               />
112 |               {errors.childrenCount && (
113 |                 <p className="text-xs text-red-500 mt-1">
114 |                   {errors.childrenCount.message}
115 |                 </p>
116 |               )}
117 |             </div>
118 |           </div>
119 | 
120 |           <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-slate-100 pb-1 sm:pb-0">
121 |             <button
122 |               type="button"
123 |               onClick={onClose}
124 |               className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors"
125 |             >
126 |               Скасувати
127 |             </button>
128 |             <button
129 |               type="submit"
130 |               disabled={isSubmitting}
131 |               className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
132 |             >
133 |               Зберегти
134 |             </button>
135 |           </div>
136 |         </form>
137 |       </div>
138 |     </div>
139 |   );
140 | }
141 | 
```

### File: apps/frontend/src/components/school-profile/modals/EventModal.tsx
```tsx
  0 | import { useState, useEffect } from "react";
  1 | import { useForm } from "react-hook-form";
  2 | import { zodResolver } from "@hookform/resolvers/zod";
  3 | import { api } from "../../../config/api";
  4 | import type { Project } from "../../../types";
  5 | import { eventSchema, type EventFormValues } from "./EventSchema";
  6 | 
  7 | interface EventModalProps {
  8 |   isOpen: boolean;
  9 |   onClose: () => void;
 10 |   defaultValues?: Partial<EventFormValues>;
 11 |   onSave: (data: EventFormValues) => void;
 12 | }
 13 | 
 14 | export default function EventModal({
 15 |   isOpen,
 16 |   onClose,
 17 |   defaultValues,
 18 |   onSave,
 19 | }: EventModalProps) {
 20 |   const [projects, setProjects] = useState<Project[]>([]);
 21 | 
 22 |   const {
 23 |     register,
 24 |     handleSubmit,
 25 |     reset,
 26 |     setValue,
 27 |     watch,
 28 |     formState: { errors, isSubmitting },
 29 |   } = useForm<EventFormValues>({
 30 |     resolver: zodResolver(eventSchema),
 31 |     defaultValues: {
 32 |       project: "",
 33 |       date: "",
 34 |       time: "",
 35 |       childrenPlanned: "",
 36 |       price: "",
 37 |       address: "",
 38 |       contactPerson: "",
 39 |       contactPhone: "",
 40 |       ...defaultValues,
 41 |     },
 42 |   });
 43 | 
 44 |   const currentProject = watch("project");
 45 | 
 46 |   useEffect(() => {
 47 |     if (isOpen) {
 48 |       reset({
 49 |         project: "",
 50 |         date: "",
 51 |         time: "",
 52 |         childrenPlanned: "",
 53 |         price: "",
 54 |         address: "",
 55 |         contactPerson: "",
 56 |         contactPhone: "",
 57 |         ...defaultValues,
 58 |       });
 59 |       api
 60 |         .get<Project[]>("/projects", {
 61 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 62 |         })
 63 |         .then((res) => {
 64 |           setProjects(res.data);
 65 |           if (!defaultValues?.project && res.data.length > 0) {
 66 |             setValue("project", res.data[0].name);
 67 |           }
 68 |         })
 69 |         .catch(console.error);
 70 |     }
 71 |     // eslint-disable-next-line react-hooks/exhaustive-deps
 72 |   }, [isOpen]);
 73 | 
 74 |   if (!isOpen) return null;
 75 | 
 76 |   return (
 77 |     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 78 |       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
 79 |         <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
 80 |           <h3 className="text-xl font-bold text-slate-800">Нова подія</h3>
 81 |           <button
 82 |             onClick={onClose}
 83 |             className="text-slate-400 hover:text-slate-600 p-2 -mr-2 text-xl leading-none"
 84 |           >
 85 |             ✕
 86 |           </button>
 87 |         </div>
 88 |         <form
 89 |           onSubmit={handleSubmit(onSave)}
 90 |           className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
 91 |         >
 92 |           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 93 |             <div className="sm:col-span-2">
 94 |               <label className="block text-sm mb-1 text-slate-600">
 95 |                 Проєкт (Вид події)
 96 |               </label>
 97 |               <select
 98 |                 {...register("project")}
 99 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
100 |               >
101 |                 <option value="" disabled>
102 |                   Оберіть вид події
103 |                 </option>
104 |                 {projects.length > 0 ? (
105 |                   projects.map((p) => (
106 |                     <option key={p.id} value={p.name}>
107 |                       {p.name}
108 |                     </option>
109 |                   ))
110 |                 ) : (
111 |                   <>
112 |                     <option>Голограма для школи</option>
113 |                     <option>360° шоу</option>
114 |                   </>
115 |                 )}
116 |               </select>
117 |               {errors.project && (
118 |                 <p className="text-xs text-red-500 mt-1">
119 |                   {errors.project.message}
120 |                 </p>
121 |               )}
122 |             </div>
123 |             <div>
124 |               <label className="block text-sm mb-1 text-slate-600">Дата</label>
125 |               <input
126 |                 type="date"
127 |                 {...register("date")}
128 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
129 |               />
130 |               {errors.date && (
131 |                 <p className="text-xs text-red-500 mt-1">
132 |                   {errors.date.message}
133 |                 </p>
134 |               )}
135 |             </div>
136 |             <div>
137 |               <label className="block text-sm mb-1 text-slate-600">Час</label>
138 |               <input
139 |                 type="time"
140 |                 {...register("time")}
141 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
142 |               />
143 |               {errors.time && (
144 |                 <p className="text-xs text-red-500 mt-1">
145 |                   {errors.time.message}
146 |                 </p>
147 |               )}
148 |             </div>
149 |             <div>
150 |               <label className="block text-sm mb-1 text-slate-600">
151 |                 Дітей (план)
152 |               </label>
153 |               <input
154 |                 type="number"
155 |                 {...register("childrenPlanned")}
156 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
157 |               />
158 |               {errors.childrenPlanned && (
159 |                 <p className="text-xs text-red-500 mt-1">
160 |                   {errors.childrenPlanned.message}
161 |                 </p>
162 |               )}
163 |             </div>
164 |             <div>
165 |               <label className="block text-sm mb-1 text-slate-600">
166 |                 Вартість
167 |               </label>
168 |               <input
169 |                 type="number"
170 |                 {...register("price")}
171 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
172 |               />
173 |               {errors.price && (
174 |                 <p className="text-xs text-red-500 mt-1">
175 |                   {errors.price.message}
176 |                 </p>
177 |               )}
178 |             </div>
179 |             <div className="sm:col-span-2">
180 |               <label className="block text-sm mb-1 text-slate-600">
181 |                 Адреса
182 |               </label>
183 |               <input
184 |                 type="text"
185 |                 {...register("address")}
186 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
187 |               />
188 |             </div>
189 |             <div>
190 |               <label className="block text-sm mb-1 text-slate-600">
191 |                 Контактна особа
192 |               </label>
193 |               <input
194 |                 type="text"
195 |                 {...register("contactPerson")}
196 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
197 |               />
198 |             </div>
199 |             <div>
200 |               <label className="block text-sm mb-1 text-slate-600">
201 |                 Телефон
202 |               </label>
203 |               <input
204 |                 type="text"
205 |                 {...register("contactPhone")}
206 |                 className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
207 |               />
208 |             </div>
209 |           </div>
210 |           <div className="flex gap-3 mt-4 shrink-0 pt-4 border-t border-slate-100 pb-1">
211 |             <button
212 |               type="button"
213 |               onClick={onClose}
214 |               className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium rounded-xl transition-colors"
215 |             >
216 |               Скасувати
217 |             </button>
218 |             <button
219 |               type="submit"
220 |               disabled={isSubmitting}
221 |               className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
222 |             >
223 |               Створити
224 |             </button>
225 |           </div>
226 |         </form>
227 |       </div>
228 |     </div>
229 |   );
230 | }
231 | 
```

### File: apps/frontend/src/components/school-profile/modals/EventSchema.ts
```ts
  0 | import { z } from "zod";
  1 | 
  2 | export const eventSchema = z.object({
  3 |   project: z.string().min(1, "Оберіть вид події"),
  4 |   date: z.string().min(1, "Вкажіть дату"),
  5 |   time: z.string().min(1, "Вкажіть час"),
  6 |   childrenPlanned: z
  7 |     .string()
  8 |     .min(1, "Вкажіть кількість дітей")
  9 |     .refine((v) => Number(v) > 0, "Має бути більше нуля"),
 10 |   price: z
 11 |     .string()
 12 |     .min(1, "Вкажіть вартість")
 13 |     .refine((v) => Number(v) >= 0, "Некоректна вартість"),
 14 |   address: z.string().optional().default(""),
 15 |   contactPerson: z.string().optional().default(""),
 16 |   contactPhone: z.string().optional().default(""),
 17 | });
 18 | 
 19 | export type EventFormValues = z.infer<typeof eventSchema>;
 20 | 
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

### File: apps/frontend/src/components/school-profile/modals/SchoolEditSchema.ts
```ts
  0 | import { z } from "zod";
  1 | 
  2 | export const schoolEditSchema = z.object({
  3 |   type: z.enum(["Школа", "Садочок"]),
  4 |   address: z.string().optional().default(""),
  5 |   director: z.string().optional().default(""),
  6 |   phone: z.string().optional().default(""),
  7 |   email: z
  8 |     .union([z.literal(""), z.string().email("Некоректний email")])
  9 |     .optional(),
 10 |   childrenCount: z
 11 |     .string()
 12 |     .optional()
 13 |     .default("")
 14 |     .refine((v) => v === "" || Number(v) >= 0, "Некоректна кількість"),
 15 | });
 16 | 
 17 | export type SchoolEditFormValues = z.infer<typeof schoolEditSchema>;
 18 | 
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
  2 | 
  3 | interface StatsBarProps {
  4 |   statusStats: Record<string, number>;
  5 |   sizeStats: Record<string, number>;
  6 |   activeFilter: string | null;
  7 |   onFilterChange: (filter: string | null) => void;
  8 |   sizeFilter: string | null;
  9 |   onSizeFilterChange: (filter: string | null) => void;
 10 |   schoolType?: "Школа" | "Садочок";
 11 | }
 12 | 
 13 | 
 14 | const STATUS_ITEMS = [
 15 |   {
 16 |     key: "new",
 17 |     label: "Нові",
 18 |     dot: "bg-slate-400",
 19 |     active: "bg-slate-800 text-white",
 20 |     inactive: "text-slate-600",
 21 |   },
 22 |   {
 23 |     key: "planned",
 24 |     label: "Заплановані",
 25 |     dot: "bg-amber-400",
 26 |     active: "bg-amber-500 text-white",
 27 |     inactive: "text-amber-600",
 28 |   },
 29 |   {
 30 |     key: "inProgress",
 31 |     label: "В роботі",
 32 |     dot: "bg-blue-500",
 33 |     active: "bg-blue-600 text-white",
 34 |     inactive: "text-blue-600",
 35 |   },
 36 |   {
 37 |     key: "done",
 38 |     label: "Проведені",
 39 |     dot: "bg-emerald-500",
 40 |     active: "bg-emerald-600 text-white",
 41 |     inactive: "text-emerald-600",
 42 |   },
 43 | ];
 44 | 
 45 | const SIZE_ITEMS_SCHOOL = [
 46 |   {
 47 |     key: "small",
 48 |     label: "Малі",
 49 |     sublabel: "< 150",
 50 |     active: "bg-violet-600 text-white",
 51 |     inactive: "text-violet-600",
 52 |   },
 53 |   {
 54 |     key: "medium",
 55 |     label: "Середні",
 56 |     sublabel: "150–500",
 57 |     active: "bg-violet-600 text-white",
 58 |     inactive: "text-violet-600",
 59 |   },
 60 |   {
 61 |     key: "large",
 62 |     label: "Великі",
 63 |     sublabel: "500+",
 64 |     active: "bg-violet-600 text-white",
 65 |     inactive: "text-violet-600",
 66 |   },
 67 | ];
 68 | 
 69 | const SIZE_ITEMS_KINDER = [
 70 |   {
 71 |     key: "small",
 72 |     label: "Малі",
 73 |     sublabel: "< 50",
 74 |     active: "bg-violet-600 text-white",
 75 |     inactive: "text-violet-600",
 76 |   },
 77 |   {
 78 |     key: "medium",
 79 |     label: "Середні",
 80 |     sublabel: "50–100",
 81 |     active: "bg-violet-600 text-white",
 82 |     inactive: "text-violet-600",
 83 |   },
 84 |   {
 85 |     key: "large",
 86 |     label: "Великі",
 87 |     sublabel: "100+",
 88 |     active: "bg-violet-600 text-white",
 89 |     inactive: "text-violet-600",
 90 |   },
 91 | ];
 92 | 
 93 | export default function StatsBar({
 94 |   statusStats,
 95 |   activeFilter,
 96 |   onFilterChange,
 97 |   sizeStats,
 98 |   sizeFilter,
 99 |   onSizeFilterChange,
100 |   schoolType = "Школа",
101 | }: StatsBarProps) {
102 |   const sizeItems =
103 |     schoolType === "Садочок" ? SIZE_ITEMS_KINDER : SIZE_ITEMS_SCHOOL;
104 |   const hasAnyFilter = activeFilter || sizeFilter;
105 | 
106 |   return (
107 |     <div className="flex flex-col gap-2 mb-4">
108 |       {/* Рядок 1: статус */}
109 |       <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
110 |         {STATUS_ITEMS.map((item, i) => {
111 |           const isActive = activeFilter === item.key;
112 |           return (
113 |             <React.Fragment key={item.key}>
114 |               {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
115 |               <button
116 |                 onClick={() => onFilterChange(isActive ? null : item.key)}
117 |                 className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
118 |                   isActive
119 |                     ? item.active
120 |                     : `bg-white ${item.inactive} hover:bg-slate-50`
121 |                 }`}
122 |               >
123 |                 <span className="text-base font-bold tabular-nums leading-none">
124 |                   {statusStats[item.key] ?? 0}
125 |                 </span>
126 |                 <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
127 |                   {item.label}
128 |                 </span>
129 |               </button>
130 |             </React.Fragment>
131 |           );
132 |         })}
133 |         {activeFilter && (
134 |           <button
135 |             onClick={() => onFilterChange(null)}
136 |             className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
137 |           >
138 |             ✕
139 |           </button>
140 |         )}
141 |       </div>
142 | 
143 |       {/* Рядок 2: розмір */}
144 |       <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
145 |         {sizeItems.map((item, i) => {
146 |           const isActive = sizeFilter === item.key;
147 |           return (
148 |             <React.Fragment key={item.key}>
149 |               {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
150 |               <button
151 |                 onClick={() => onSizeFilterChange(isActive ? null : item.key)}
152 |                 className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
153 |                   isActive
154 |                     ? item.active
155 |                     : `bg-white ${item.inactive} hover:bg-slate-50`
156 |                 }`}
157 |               >
158 |                 <span className="text-base font-bold tabular-nums leading-none">
159 |                   {sizeStats[item.key] ?? 0}
160 |                 </span>
161 |                 <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
162 |                   {item.label}
163 |                   <span className="opacity-60 ml-0.5">{item.sublabel}</span>
164 |                 </span>
165 |               </button>
166 |             </React.Fragment>
167 |           );
168 |         })}
169 |         {sizeFilter && (
170 |           <button
171 |             onClick={() => onSizeFilterChange(null)}
172 |             className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
173 |           >
174 |             ✕
175 |           </button>
176 |         )}
177 |       </div>
178 |     </div>
179 |   );
180 | }
181 | 
```

### File: apps/frontend/src/components/schools/VirtualDesktopTable.tsx
```tsx
  0 | import { useRef, useEffect } from "react";
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
 11 |   onEndReached?: () => void;
 12 | }
 13 | 
 14 | export default function VirtualDesktopTable({
 15 |   schools,
 16 |   searchQuery,
 17 |   onDelete,
 18 |   stages,
 19 |   onEndReached,
 20 | }: Props) {
 21 |   const navigate = useNavigate();
 22 |   const parentRef = useRef<HTMLDivElement>(null);
 23 | 
 24 |   const rowVirtualizer = useVirtualizer({
 25 |     count: schools.length,
 26 |     getScrollElement: () => parentRef.current,
 27 |     estimateSize: () => 57,
 28 |     overscan: 8,
 29 |   });
 30 | 
 31 |   const virtualItems = rowVirtualizer.getVirtualItems();
 32 |   const lastItem = virtualItems[virtualItems.length - 1];
 33 | 
 34 |   useEffect(() => {
 35 |     if (!onEndReached || !lastItem) return;
 36 |     if (lastItem.index >= schools.length - 5) {
 37 |       onEndReached();
 38 |     }
 39 |   }, [lastItem?.index, schools.length, onEndReached]);
 40 | 
 41 |   return (
 42 |     <div ref={parentRef} className="overflow-y-auto flex-1 h-full">
 43 |       <table className="w-full text-left border-collapse">
 44 |         <thead className="sticky top-0 z-10 bg-slate-50">
 45 |           <tr className="border-b border-slate-100">
 46 |             <th className="p-4 font-medium text-slate-600">Назва школи</th>
 47 |             <th className="p-4 font-medium text-slate-600">Місто</th>
 48 |             <th className="p-4 font-medium text-slate-600">Статус</th>
 49 |             <th className="p-4 font-medium text-slate-600">Поточний етап</th>
 50 |             <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
 51 |           </tr>
 52 |         </thead>
 53 |         <tbody>
 54 |           {virtualItems.map((virtualRow) => (
 55 |             <tr
 56 |               style={{
 57 |                 height: `${rowVirtualizer.getTotalSize() - virtualItems.reduce((s, r) => s + r.size, 0)}px`,
 58 |               }}
 59 |             >
 60 |               <SchoolRow
 61 |                 school={schools[virtualRow.index]}
 62 |                 onDelete={onDelete}
 63 |                 stages={stages}
 64 |                 navigate={navigate}
 65 |               />
 66 |             </tr>
 67 |           ))}
 68 |           <tr
 69 |             style={{
 70 |               height: `${rowVirtualizer.getTotalSize() - rowVirtualizer.getVirtualItems().reduce((s, r) => s + r.size, 0)}px`,
 71 |             }}
 72 |           >
 73 |             <td colSpan={5} />
 74 |           </tr>
 75 |         </tbody>
 76 |       </table>
 77 | 
 78 |       {schools.length === 0 && (
 79 |         <div className="text-center py-16 text-slate-400 text-sm font-medium">
 80 |           {searchQuery
 81 |             ? `Нічого не знайдено за «${searchQuery}»`
 82 |             : "Шкіл ще немає"}
 83 |         </div>
 84 |       )}
 85 |     </div>
 86 |   );
 87 | }
 88 | 
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

### File: apps/frontend/src/context/AuthContext.tsx
```tsx
  0 | import {
  1 |   createContext,
  2 |   useContext,
  3 |   useEffect,
  4 |   useState,
  5 |   ReactNode,
  6 | } from "react";
  7 | import { api } from "../config/api";
  8 | 
  9 | interface User {
 10 |   id: string;
 11 |   name: string;
 12 |   email: string;
 13 |   role: string;
 14 | }
 15 | 
 16 | interface AuthContextValue {
 17 |   user: User | null;
 18 |   loading: boolean;
 19 |   setUser: (user: User | null) => void;
 20 |   logout: () => Promise<void>;
 21 | }
 22 | const AuthContext = createContext<AuthContextValue | undefined>(undefined);
 23 | 
 24 | export function AuthProvider({ children }: { children: ReactNode }) {
 25 |   const [user, setUser] = useState<User | null>(null);
 26 |   const [loading, setLoading] = useState(true);
 27 | 
 28 |   useEffect(() => {
 29 |     api
 30 |       .get("/auth/me")
 31 |       .then((res) => setUser(res.data.user))
 32 |       .catch(() => setUser(null))
 33 |       .finally(() => setLoading(false));
 34 |   }, []);
 35 | 
 36 |   const logout = async () => {
 37 |     try {
 38 |       await api.post("/auth/logout");
 39 |     } catch (e) {
 40 |       console.error("Logout error", e);
 41 |     }
 42 |     setUser(null);
 43 |   };
 44 | 
 45 |   return (
 46 |     <AuthContext.Provider value={{ user, loading, setUser, logout }}>
 47 |       {children}
 48 |     </AuthContext.Provider>
 49 |   );
 50 | }
 51 | 
 52 | export function useAuth() {
 53 |   const ctx = useContext(AuthContext);
 54 |   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
 55 |   return ctx;
 56 | }
 57 | 
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
  0 | import {
  1 |   useQuery,
  2 |   useMutation,
  3 |   useQueryClient,
  4 |   useInfiniteQuery,
  5 | } from "@tanstack/react-query";
  6 | import { api } from "../config/api";
  7 | import type { City, School } from "../types";
  8 | 
  9 | const auth = () => ({
 10 |   Authorization: `Bearer ${localStorage.getItem("token")}`,
 11 | });
 12 | 
 13 | export function useCities() {
 14 |   return useQuery({
 15 |     queryKey: ["cities"],
 16 |     queryFn: () =>
 17 |       api.get<City[]>("/cities", { headers: auth() }).then((r) => r.data),
 18 |     staleTime: 5 * 60 * 1000,
 19 |   });
 20 | }
 21 | 
 22 | export function useAddCity() {
 23 |   const qc = useQueryClient();
 24 |   return useMutation({
 25 |     mutationFn: (name: string) =>
 26 |       api
 27 |         .post<City>("/cities", { name }, { headers: auth() })
 28 |         .then((r) => r.data),
 29 |     onSuccess: (newCity) => {
 30 |       qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
 31 |     },
 32 |   });
 33 | }
 34 | 
 35 | export interface SchoolFilters {
 36 |   search?: string;
 37 |   cityId?: string;
 38 |   type?: "Школа" | "Садочок";
 39 |   stage?: "new" | "planned" | "inProgress" | "done";
 40 |   size?: "small" | "medium" | "large";
 41 | }
 42 | 
 43 | interface SchoolsPage {
 44 |   data: School[];
 45 |   meta: {
 46 |     totalItems: number;
 47 |     page: number;
 48 |     take: number;
 49 |     pageCount: number;
 50 |     hasNextPage: boolean;
 51 |   };
 52 | }
 53 | 
 54 | export function useSchools(filters: SchoolFilters = {}) {
 55 |   return useInfiniteQuery({
 56 |     queryKey: ["schools", filters],
 57 |     queryFn: ({ pageParam = 1 }) =>
 58 |       api
 59 |         .get<SchoolsPage>("/schools", {
 60 |           headers: auth(),
 61 |           params: { ...filters, page: pageParam, take: 30 },
 62 |         })
 63 |         .then((r) => r.data),
 64 |     initialPageParam: 1,
 65 |     getNextPageParam: (lastPage) =>
 66 |       lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
 67 |     staleTime: 5 * 60 * 1000,
 68 |   });
 69 | }
 70 | 
 71 | export function useSchoolStats(
 72 |   filters: Pick<SchoolFilters, "cityId" | "type" | "stage"> = {},
 73 | ) {
 74 |   return useQuery({
 75 |     queryKey: ["schoolStats", filters],
 76 |     queryFn: () =>
 77 |       api
 78 |         .get("/schools/stats", { headers: auth(), params: filters })
 79 |         .then((r) => r.data),
 80 |     staleTime: 2 * 60 * 1000,
 81 |   });
 82 | }
 83 | 
 84 | export function useAddSchool() {
 85 |   const qc = useQueryClient();
 86 |   return useMutation({
 87 |     mutationFn: (data: Partial<School>) =>
 88 |       api
 89 |         .post<School>("/schools", data, { headers: auth() })
 90 |         .then((r) => r.data),
 91 |     onSuccess: () => {
 92 |       qc.invalidateQueries({ queryKey: ["schools"] });
 93 |       qc.invalidateQueries({ queryKey: ["schoolStats"] });
 94 |     },
 95 |   });
 96 | }
 97 | 
 98 | export function useDeleteSchool() {
 99 |   const qc = useQueryClient();
100 |   return useMutation({
101 |     mutationFn: (schoolId: string) =>
102 |       api.delete(`/schools/${schoolId}`, { headers: auth() }),
103 |     onSuccess: () => {
104 |       qc.invalidateQueries({ queryKey: ["schools"] });
105 |       qc.invalidateQueries({ queryKey: ["schoolStats"] });
106 |     },
107 |   });
108 | }
109 | 
110 | export function useEvents() {
111 |   return useQuery({
112 |     queryKey: ["events"],
113 |     queryFn: () => api.get("/events", { headers: auth() }).then((r) => r.data),
114 |     staleTime: 2 * 60 * 1000,
115 |   });
116 | }
117 | 
118 | export function usePrefetchSchool() {
119 |   const qc = useQueryClient();
120 |   return (schoolId: string) => {
121 |     qc.prefetchQuery({
122 |       queryKey: ["school", schoolId],
123 |       queryFn: () =>
124 |         api
125 |           .get<School>(`/schools/${schoolId}`, { headers: auth() })
126 |           .then((r) => r.data),
127 |       staleTime: 2 * 60 * 1000,
128 |     });
129 |   };
130 | }
131 | 
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
341 |                             // onClick={(e) => {
342 |                             //   e.stopPropagation();
343 |                             //   if (ev.school)
344 |                             //     navigate(`/schools/${ev.school.id}`);
345 |                             // }}
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
303 |                 <div className="sm:hidden divide-y divide-slate-50">
304 |                   <AnimatePresence initial={false}>
305 |                     {items.map((u, ri) => (
306 |                       <motion.div
307 |                         key={u.id}
308 |                         initial={{ opacity: 0 }}
309 |                         animate={{ opacity: 1 }}
310 |                         exit={{ opacity: 0, height: 0 }}
311 |                         transition={{ duration: 0.2, delay: ri * 0.04 }}
312 |                         className="p-4 flex flex-col gap-2"
313 |                       >
314 |                         <div className="flex items-center justify-between">
315 |                           <div className="flex items-center gap-3">
316 |                             <div
317 |                               className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
318 |                             >
319 |                               {u.name.charAt(0)}
320 |                             </div>
321 |                             <span className="font-medium text-slate-800">
322 |                               {u.name}
323 |                             </span>
324 |                           </div>
325 |                           {isSuperAdmin && (
326 |                             <div className="flex items-center gap-1 shrink-0">
327 |                               <motion.button
328 |                                 whileTap={{ scale: 0.93 }}
329 |                                 onClick={() => handleOpenModal(u)}
330 |                                 className="text-slate-400 hover:text-blue-500 p-2 hover:bg-blue-50 rounded-lg"
331 |                               >
332 |                                 ✏️
333 |                               </motion.button>
334 |                               <motion.button
335 |                                 whileTap={{ scale: 0.93 }}
336 |                                 onClick={() => handleDelete(u.id, u.name)}
337 |                                 className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg"
338 |                               >
339 |                                 🗑
340 |                               </motion.button>
341 |                             </div>
342 |                           )}
343 |                         </div>
344 |                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 pl-11">
345 |                           <PhoneLink phone={u.phone} />
346 |                           <span>{u.email}</span>
347 |                         </div>
348 |                         <div className="flex items-center gap-2 pl-11">
349 |                           <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
350 |                             📍 {u.city?.name || "Всі міста"}
351 |                           </span>
352 |                           {u.car && (
353 |                             <span className="text-xs text-emerald-600 font-medium">
354 |                               🚗 {u.car}
355 |                             </span>
356 |                           )}
357 |                         </div>
358 |                       </motion.div>
359 |                     ))}
360 |                   </AnimatePresence>
361 |                 </div>
362 |                 <table className="w-full text-left hidden sm:table">
363 |                   <thead>
364 |                     <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
365 |                       <th className="px-5 py-3">ПІБ</th>
366 |                       <th className="px-5 py-3">Телефон</th>
367 |                       <th className="px-5 py-3">Пошта / Логін</th>
368 |                       <th className="px-5 py-3">Місто</th>
369 |                       <th className="px-5 py-3 text-center">Дії</th>
370 |                     </tr>
371 |                   </thead>
372 |                   <tbody>
373 |                     <AnimatePresence initial={false}>
374 |                       {items.map((u, ri) => (
375 |                         <motion.tr
376 |                           key={u.id}
377 |                           initial={{ opacity: 0 }}
378 |                           animate={{ opacity: 1 }}
379 |                           exit={{ opacity: 0, height: 0 }}
380 |                           transition={{ duration: 0.2, delay: ri * 0.04 }}
381 |                           className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
382 |                         >
383 |                           <td className="px-5 py-4">
384 |                             <div className="flex items-center gap-3">
385 |                               <motion.div
386 |                                 initial={{ scale: 0.8, opacity: 0 }}
387 |                                 animate={{ scale: 1, opacity: 1 }}
388 |                                 transition={{ duration: 0.2, delay: 0.05 }}
389 |                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
390 |                               >
391 |                                 {u.name.charAt(0)}
392 |                               </motion.div>
393 |                               <span className="font-medium text-slate-800">
394 |                                 {u.name}
395 |                               </span>
396 |                             </div>
397 |                           </td>
398 |                           <td className="px-5 py-4 text-slate-600 text-sm">
399 |                             <PhoneLink phone={u.phone} />
400 |                             {u.car && (
401 |                               <p className="text-xs text-emerald-600 font-medium mt-1">
402 |                                 🚗 {u.car}
403 |                               </p>
404 |                             )}
405 |                           </td>
406 |                           <td className="px-5 py-4 text-slate-600 text-sm font-medium">
407 |                             {u.email}
408 |                           </td>
409 |                           <td className="px-5 py-4">
410 |                             <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
411 |                               📍 {u.city?.name || "Всі міста"}
412 |                             </span>
413 |                           </td>
414 |                           <td className="px-5 py-4 text-center">
415 |                             {isSuperAdmin && (
416 |                               <>
417 |                                 <motion.button
418 |                                   whileTap={{ scale: 0.93 }}
419 |                                   onClick={() => handleOpenModal(u)}
420 |                                   className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg mr-2 transition-colors"
421 |                                 >
422 |                                   ✏️
423 |                                 </motion.button>
424 |                                 <motion.button
425 |                                   whileTap={{ scale: 0.93 }}
426 |                                   onClick={() => handleDelete(u.id, u.name)}
427 |                                   className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
428 |                                 >
429 |                                   🗑
430 |                                 </motion.button>
431 |                               </>
432 |                             )}
433 |                           </td>
434 |                         </motion.tr>
435 |                       ))}
436 |                     </AnimatePresence>
437 |                   </tbody>
438 |                 </table>
439 |               </motion.div>
440 |             )}
441 |           </motion.div>
442 |         ))}
443 |       </div>
444 | 
445 |       {/* --- СЕКЦІЯ ПРОЄКТІВ (ВИДІВ ПОДІЙ) --- */}
446 |       <div className="mt-16 border-t border-slate-200 pt-10">
447 |         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
448 |           <div>
449 |             <h2 className="text-2xl font-bold text-slate-800">
450 |               Види подій (Проєкти)
451 |             </h2>
452 |             <p className="text-sm text-slate-400 mt-1">
453 |               Ці проєкти відображатимуться у випадаючому списку при створенні
454 |               події
455 |             </p>
456 |           </div>
457 |           {isSuperAdmin && (
458 |             <button
459 |               onClick={() => setIsProjectModalOpen(true)}
460 |               className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto"
461 |             >
462 |               + Створити вид події
463 |             </button>
464 |           )}
465 |         </div>
466 | 
467 |         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
468 |           {projects.map((p, pi) => (
469 |             <motion.div
470 |               key={p.id}
471 |               initial={{ opacity: 0, y: 8 }}
472 |               animate={{ opacity: 1, y: 0 }}
473 |               transition={{ duration: 0.25, delay: pi * 0.05 }}
474 |               whileHover={{
475 |                 y: -3,
476 |                 boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
477 |               }}
478 |               className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default"
479 |             >
480 |               <div className="flex items-center gap-3">
481 |                 <motion.div
482 |                   whileHover={{ scale: 1.3 }}
483 |                   transition={{ duration: 0.15 }}
484 |                   className={`w-4 h-4 rounded-full ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm`}
485 |                 />
486 |                 <span className="font-bold text-slate-800">{p.name}</span>
487 |               </div>
488 |               {isSuperAdmin && (
489 |                 <button
490 |                   onClick={() => handleDeleteProject(p.id, p.name)}
491 |                   className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2"
492 |                   title="Видалити"
493 |                 >
494 |                   🗑
495 |                 </button>
496 |               )}
497 |             </motion.div>
498 |           ))}
499 |           {projects.length === 0 && (
500 |             <div className="col-span-full text-center py-10 text-slate-400">
501 |               Ви ще не додали жодного виду події
502 |             </div>
503 |           )}
504 |         </div>
505 |       </div>
506 | 
507 |       {/* Модалки Користувача і Проєктів */}
508 |       {isProjectModalOpen && (
509 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
510 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
511 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
512 |               <h3 className="text-xl font-bold text-slate-800">
513 |                 Новий вид події
514 |               </h3>
515 |               <button
516 |                 onClick={() => setIsProjectModalOpen(false)}
517 |                 className="text-slate-400 text-xl leading-none p-2 -mr-2"
518 |               >
519 |                 ✕
520 |               </button>
521 |             </div>
522 |             <form onSubmit={handleCreateProject} className="p-6">
523 |               <label className="block text-sm font-medium text-slate-700 mb-1.5">
524 |                 Назва
525 |               </label>
526 |               <input
527 |                 type="text"
528 |                 value={projectForm.name}
529 |                 onChange={(e) =>
530 |                   setProjectForm({ ...projectForm, name: e.target.value })
531 |                 }
532 |                 className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
533 |                 required
534 |                 placeholder="Наприклад: Шоу мильних бульбашок"
535 |               />
536 |               <label className="block text-sm font-medium text-slate-700 mb-3">
537 |                 Колір для календаря
538 |               </label>
539 |               <div className="flex gap-4 mb-8">
540 |                 {Object.keys(PROJECT_COLORS).map((c) => (
541 |                   <button
542 |                     type="button"
543 |                     key={c}
544 |                     onClick={() => setProjectForm({ ...projectForm, color: c })}
545 |                     className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${projectForm.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
546 |                   />
547 |                 ))}
548 |               </div>
549 |               <div className="flex gap-3">
550 |                 <button
551 |                   type="button"
552 |                   onClick={() => setIsProjectModalOpen(false)}
553 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
554 |                 >
555 |                   Скасувати
556 |                 </button>
557 |                 <button
558 |                   type="submit"
559 |                   className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
560 |                 >
561 |                   Зберегти
562 |                 </button>
563 |               </div>
564 |             </form>
565 |           </div>
566 |         </div>
567 |       )}
568 | 
569 |       {/* Ваша стара модалка Користувача */}
570 |       {isModalOpen && (
571 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
572 |           {/* Ваш існуючий код модалки працівника... Для стислості я зберіг базові поля */}
573 |           <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col">
574 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
575 |               <h3 className="text-xl font-bold">
576 |                 {editingUser ? "Редагувати" : "Новий користувач"}
577 |               </h3>
578 |               <button
579 |                 onClick={() => setIsModalOpen(false)}
580 |                 className="text-slate-400 text-xl p-2 -mr-2"
581 |               >
582 |                 ✕
583 |               </button>
584 |             </div>
585 |             <form
586 |               onSubmit={handleSubmit}
587 |               className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
588 |             >
589 |               <input
590 |                 type="text"
591 |                 value={form.fullName}
592 |                 onChange={(e) => setForm({ ...form, fullName: e.target.value })}
593 |                 required
594 |                 placeholder="ПІБ"
595 |                 className="w-full p-2.5 border rounded-lg"
596 |               />
597 |               <div className="grid grid-cols-2 gap-4">
598 |                 <input
599 |                   type="email"
600 |                   value={form.email}
601 |                   onChange={(e) => setForm({ ...form, email: e.target.value })}
602 |                   required
603 |                   placeholder="Пошта"
604 |                   className="w-full p-2.5 border rounded-lg"
605 |                 />
606 |                 <input
607 |                   type="password"
608 |                   value={form.password}
609 |                   onChange={(e) =>
610 |                     setForm({ ...form, password: e.target.value })
611 |                   }
612 |                   required={!editingUser}
613 |                   placeholder="Пароль"
614 |                   className="w-full p-2.5 border rounded-lg"
615 |                 />
616 |               </div>
617 |               <div className="grid grid-cols-2 gap-4">
618 |                 <input
619 |                   type="tel"
620 |                   value={form.phone}
621 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
622 |                   placeholder="Телефон"
623 |                   className="w-full p-2.5 border rounded-lg"
624 |                 />
625 |                 <input
626 |                   type="text"
627 |                   value={form.telegramId}
628 |                   onChange={(e) =>
629 |                     setForm({ ...form, telegramId: e.target.value })
630 |                   }
631 |                   placeholder="Telegram ID або @username"
632 |                   className="w-full p-2.5 border rounded-lg"
633 |                 />
634 |               </div>
635 |               <div className="grid grid-cols-2 gap-4">
636 |                 <select
637 |                   value={form.role}
638 |                   onChange={(e) =>
639 |                     setForm({ ...form, role: e.target.value as Role })
640 |                   }
641 |                   className="w-full p-2.5 border rounded-lg"
642 |                 >
643 |                   <option value="MANAGER">Менеджер</option>
644 |                   <option value="DRIVER">Водій</option>
645 |                   <option value="HOST">Ведучий</option>
646 |                   <option value="SUPERADMIN">Суперадмін</option>
647 |                 </select>
648 |                 <select
649 |                   value={form.cityId}
650 |                   onChange={(e) => setForm({ ...form, cityId: e.target.value })}
651 |                   className="w-full p-2.5 border rounded-lg"
652 |                 >
653 |                   <option value="">Всі міста</option>
654 |                   {cities.map((c) => (
655 |                     <option key={c.id} value={c.id}>
656 |                       {c.name}
657 |                     </option>
658 |                   ))}
659 |                 </select>
660 |               </div>
661 |               {form.role === "DRIVER" && (
662 |                 <input
663 |                   type="text"
664 |                   value={form.car || ""}
665 |                   onChange={(e) => setForm({ ...form, car: e.target.value })}
666 |                   placeholder="Автомобіль (напр. Renault Trafic)"
667 |                   className="w-full p-2.5 border rounded-lg"
668 |                 />
669 |               )}
670 |               <div className="flex gap-3 mt-2">
671 |                 <button
672 |                   type="button"
673 |                   onClick={() => setIsModalOpen(false)}
674 |                   className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
675 |                 >
676 |                   Скасувати
677 |                 </button>
678 |                 <button
679 |                   type="submit"
680 |                   disabled={isSubmitting}
681 |                   className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
682 |                 >
683 |                   Зберегти
684 |                 </button>
685 |               </div>
686 |             </form>
687 |           </div>
688 |         </div>
689 |       )}
690 |     </motion.div>
691 |   );
692 | }
693 | 
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
  2 | import { motion, AnimatePresence } from "framer-motion";
  3 | 
  4 | import { api } from "../config/api";
  5 | 
  6 | const CIRCLE_VARIANTS = {
  7 |   hidden: { scale: 0, opacity: 1 },
  8 |   visible: {
  9 |     scale: 1,
 10 |     transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
 11 |   },
 12 | };
 13 | 
 14 | interface User {
 15 |   id: string;
 16 |   name: string;
 17 |   email: string;
 18 |   role: string;
 19 | }
 20 | 
 21 | interface LoginProps {
 22 |   onLogin?: (user: User) => void;
 23 | }
 24 | 
 25 | export default function Login({ onLogin }: LoginProps) {
 26 |   const [email, setEmail] = useState("admin@crm.com");
 27 |   const [password, setPassword] = useState("123!PASSWORD!321");
 28 |   const [error, setError] = useState("");
 29 |   const [isLoading, setIsLoading] = useState(false);
 30 |   const [isTransitioning, setIsTransitioning] = useState(false);
 31 |   const [shake, setShake] = useState(false);
 32 |   const navigate = useNavigate();
 33 | 
 34 |   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
 35 | 
 36 |   const proceedAfterLogin = () => {
 37 |     if (onLogin && loggedInUser) {
 38 |       onLogin(loggedInUser);
 39 |     } else {
 40 |       navigate("/cities");
 41 |     }
 42 |   };
 43 | 
 44 |   const handleLogin = async (e: React.FormEvent) => {
 45 |     e.preventDefault();
 46 |     setError("");
 47 |     setIsLoading(true);
 48 | 
 49 |     try {
 50 |       const response = await api.post("/auth/login", { email, password });
 51 | 
 52 |       setLoggedInUser(response.data.user);
 53 |       setIsTransitioning(true);
 54 |     } catch {
 55 |       setError("Невірний email або пароль");
 56 |       setIsLoading(false);
 57 |       setShake(true);
 58 |       setTimeout(() => setShake(false), 400);
 59 |     }
 60 |   };
 61 | 
 62 |   return (
 63 |     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
 64 |       <AnimatePresence>
 65 |         {isTransitioning && (
 66 |           <motion.div
 67 |             variants={CIRCLE_VARIANTS}
 68 |             initial="hidden"
 69 |             animate="visible"
 70 |             onAnimationComplete={proceedAfterLogin}
 71 |             style={{
 72 |               width: "300vmax",
 73 |               height: "300vmax",
 74 |               borderRadius: "9999px",
 75 |               willChange: "transform",
 76 |             }}
 77 |             className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-blue-600"
 78 |           />
 79 |         )}
 80 |       </AnimatePresence>
 81 |       <motion.div
 82 |         animate={
 83 |           isTransitioning
 84 |             ? { opacity: 0, scale: 0.97 }
 85 |             : shake
 86 |               ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1 }
 87 |               : { opacity: 1, scale: 1 }
 88 |         }
 89 |         transition={{ duration: 0.4 }}
 90 |         className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md"
 91 |       >
 92 |         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
 93 |           Вхід у CRM
 94 |         </h1>
 95 | 
 96 |         {error && (
 97 |           <motion.div
 98 |             initial={{ opacity: 0, y: -10 }}
 99 |             animate={{ opacity: 1, y: 0 }}
100 |             className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center"
101 |           >
102 |             {error}
103 |           </motion.div>
104 |         )}
105 | 
106 |         <form onSubmit={handleLogin} className="flex flex-col gap-4">
107 |           <div>
108 |             <label className="block text-sm font-medium text-gray-700 mb-1">
109 |               Email
110 |             </label>
111 |             <input
112 |               type="email"
113 |               value={email}
114 |               onChange={(e) => setEmail(e.target.value)}
115 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
116 |               required
117 |             />
118 |           </div>
119 |           <div>
120 |             <label className="block text-sm font-medium text-gray-700 mb-1">
121 |               Пароль
122 |             </label>
123 |             <input
124 |               type="password"
125 |               value={password}
126 |               onChange={(e) => setPassword(e.target.value)}
127 |               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
128 |               required
129 |             />
130 |           </div>
131 |           <motion.button
132 |             type="submit"
133 |             disabled={isLoading}
134 |             whileTap={{ scale: 0.97 }}
135 |             className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[42px]"
136 |           >
137 |             <AnimatePresence mode="wait" initial={false}>
138 |               {isLoading ? (
139 |                 <motion.span
140 |                   key="loading"
141 |                   initial={{ opacity: 0 }}
142 |                   animate={{ opacity: 1 }}
143 |                   exit={{ opacity: 0 }}
144 |                   className="flex items-center gap-2"
145 |                 >
146 |                   <motion.span
147 |                     animate={{ rotate: 360 }}
148 |                     transition={{
149 |                       duration: 0.7,
150 |                       repeat: Infinity,
151 |                       ease: "linear",
152 |                     }}
153 |                     className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
154 |                   />
155 |                   Вхід...
156 |                 </motion.span>
157 |               ) : (
158 |                 <motion.span
159 |                   key="idle"
160 |                   initial={{ opacity: 0 }}
161 |                   animate={{ opacity: 1 }}
162 |                   exit={{ opacity: 0 }}
163 |                 >
164 |                   Увійти
165 |                 </motion.span>
166 |               )}
167 |             </AnimatePresence>
168 |           </motion.button>
169 |         </form>
170 |       </motion.div>
171 |     </div>
172 |   );
173 | }
174 | 
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
 50 | import type { EventFormValues } from "../components/school-profile/modals/EventSchema";
 51 | import type { SchoolEditFormValues } from "../components/school-profile/modals/SchoolEditSchema";
 52 | import CrewModal from "../components/school-profile/modals/CrewModal";
 53 | import ReportModal from "../components/school-profile/modals/ReportModal";
 54 | 
 55 | const PIPELINE_STAGES = [
 56 |   { id: 1, key: "BASE", name: "Новий заклад" },
 57 |   { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
 58 |   { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 59 |   { id: 4, key: "PREPARATION", name: "Оголошення" },
 60 |   { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
 61 |   { id: 6, key: "DONE", name: "Проведення заходу" },
 62 |   { id: 7, key: "REPORT", name: "Звіт" },
 63 | ] as const;
 64 | 
 65 | export default function SchoolProfile() {
 66 |   const { id } = useParams();
 67 |   const qc = useQueryClient();
 68 | 
 69 |   const { data: schoolRaw } = useSchool(id);
 70 |   const { data: eventsRaw = [] } = useSchoolEvents(id, false);
 71 | 
 72 |   const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
 73 |   const [exitingEventId, setExitingEventId] = useState<string | null>(null);
 74 | 
 75 |   const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
 76 |     selectedEventId ?? eventsRaw[0]?.id,
 77 |   );
 78 | 
 79 |   const { data: users = [] } = useUsers();
 80 |   const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
 81 |   const [selectedReportEvent, setSelectedReportEvent] = useState<Event | null>(
 82 |     null,
 83 |   );
 84 |   const updateStatus = useUpdateEventStatus();
 85 |   const updatePreparation = useUpdatePreparation();
 86 |   const assignCrewMutation = useAssignCrew();
 87 |   const submitReportMutation = useSubmitReport();
 88 |   const addCommentMutation = useAddComment();
 89 |   const updateHistoryMutation = useUpdateHistoryComment();
 90 | 
 91 |   const schoolData = useMemo(() => {
 92 |     if (!schoolRaw) {
 93 |       return {
 94 |         id: "",
 95 |         cityId: "",
 96 |         name: "",
 97 |         type: "Школа",
 98 |         city: "",
 99 |         address: "",
100 |         director: "",
101 |         phone: "",
102 |         email: "",
103 |         childrenCount: 0,
104 |         notes: "",
105 |       };
106 |     }
107 | 
108 |     return {
109 |       id: schoolRaw.id,
110 |       cityId: schoolRaw.cityId,
111 |       name: schoolRaw.name || "",
112 |       type: schoolRaw.type || "Школа",
113 |       city: schoolRaw.city?.name || "",
114 |       address: schoolRaw.address || "",
115 |       director: schoolRaw.director || "",
116 |       phone: schoolRaw.phone || "",
117 |       email: schoolRaw.email || "",
118 |       childrenCount: schoolRaw.childrenCount || 0,
119 |       notes: schoolRaw.notes || "",
120 |     };
121 |   }, [schoolRaw]);
122 | 
123 |   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
124 |   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
125 |   const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
126 |   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
127 |   const [commentModal, setCommentModal] = useState({
128 |     isOpen: false,
129 |     mode: "pipeline",
130 |     stepId: null as number | null,
131 |     historyId: null as string | null,
132 |     text: "",
133 |   });
134 | 
135 |   const currentEventBase = useMemo(
136 |     () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
137 |     [eventsRaw, selectedEventId],
138 |   );
139 | 
140 |   const currentEvent = useMemo(() => {
141 |     if (!currentEventBase) return null;
142 |     if (eventFull?.id === currentEventBase.id) {
143 |       return { ...currentEventBase, ...eventFull };
144 |     }
145 |     return currentEventBase;
146 |   }, [currentEventBase, eventFull]);
147 |   const currentStageIndex = useMemo(() => {
148 |     if (!currentEvent?.status) return 0;
149 |     const idx = PIPELINE_STAGES.findIndex(
150 |       (s) => s.key === currentEvent?.status,
151 |     );
152 |     return idx !== -1 ? idx : 0;
153 |   }, [currentEvent?.status]);
154 |   const creatorName = useMemo(
155 |     () =>
156 |       currentEvent?.history?.length > 0
157 |         ? currentEvent.history[currentEvent.history.length - 1].userName
158 |         : "Немає даних",
159 |     [currentEvent?.history],
160 |   );
161 | 
162 |   const handlePipelineClick = useCallback(
163 |     (stepId: number) => {
164 |       if (!currentEvent) return;
165 |       const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
166 |       if (nextStage?.id !== stepId) return;
167 |       if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
168 |       setCommentModal({
169 |         isOpen: true,
170 |         mode: "pipeline",
171 |         stepId: nextStage.id,
172 |         historyId: null,
173 |         text: "",
174 |       });
175 |     },
176 |     [currentEvent, currentStageIndex],
177 |   );
178 | 
179 |   const handleHistoryClick = useCallback(
180 |     (historyItem: { id: string; comment?: string }) => {
181 |       setCommentModal({
182 |         isOpen: true,
183 |         mode: "history",
184 |         stepId: null,
185 |         historyId: historyItem.id,
186 |         text: historyItem.comment || "",
187 |       });
188 |     },
189 |     [],
190 |   );
191 | 
192 |   const handleAddCommentClick = useCallback(() => {
193 |     setCommentModal({
194 |       isOpen: true,
195 |       mode: "add_comment",
196 |       stepId: null,
197 |       historyId: null,
198 |       text: "",
199 |     });
200 |   }, []);
201 | 
202 |   const handleSaveComment = useCallback(
203 |     async (e: React.FormEvent) => {
204 |       e.preventDefault();
205 |       if (commentModal.mode === "pipeline") {
206 |         const activeStage = PIPELINE_STAGES[currentStageIndex];
207 |         const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
208 |         if (!nextStage || !currentEvent) return;
209 | 
210 |         await updateStatus.mutateAsync({
211 |           eventId: currentEvent.id,
212 |           status: nextStage.key,
213 |           actionName: `Етап пройдено: ${activeStage.name}`,
214 |           comment: commentModal.text,
215 |         });
216 |         if (nextStage.key === "RE_SALE") {
217 |           setExitingEventId(currentEvent.id);
218 |           setTimeout(() => {
219 |             setSelectedEventId(null);
220 |             setExitingEventId(null);
221 |           }, 500);
222 |         }
223 |       } else if (commentModal.mode === "add_comment") {
224 |         await addCommentMutation.mutateAsync({
225 |           eventId: currentEvent.id,
226 |           comment: commentModal.text,
227 |         });
228 |       } else if (commentModal.mode === "history" && commentModal.historyId) {
229 |         await updateHistoryMutation.mutateAsync({
230 |           historyId: commentModal.historyId,
231 |           comment: commentModal.text,
232 |           eventId: currentEvent.id,
233 |         });
234 |       }
235 |       setCommentModal({
236 |         isOpen: false,
237 |         mode: "pipeline",
238 |         stepId: null,
239 |         historyId: null,
240 |         text: "",
241 |       });
242 |     },
243 |     [
244 |       commentModal,
245 |       currentEvent,
246 |       currentStageIndex,
247 |       updateStatus,
248 |       addCommentMutation,
249 |       updateHistoryMutation,
250 |     ],
251 |   );
252 | 
253 |   const updateSchoolMutation = useUpdateSchool();
254 |   const createEventMutation = useCreateEvent();
255 | 
256 |   const handleSaveEvent = useCallback(
257 |     async (data: EventFormValues) => {
258 |       if (!schoolData.id) return;
259 | 
260 |       const payload = {
261 |         ...data,
262 |         schoolId: schoolData.id,
263 |         cityId: schoolData.cityId,
264 |         childrenPlanned: Number(data.childrenPlanned) || 0,
265 |         price: Number(data.price) || 0,
266 |       };
267 | 
268 |       const newEvent = await createEventMutation.mutateAsync(payload);
269 | 
270 |       setIsEventModalOpen(false);
271 |       setSelectedEventId(newEvent.id);
272 |     },
273 |     [schoolData, createEventMutation],
274 |   );
275 | 
276 |   const handleSaveSchoolInfo = useCallback(
277 |     async (data: SchoolEditFormValues) => {
278 |       if (!id) return;
279 | 
280 |       await updateSchoolMutation.mutateAsync({
281 |         ...data,
282 |         childrenCount: Number(data.childrenCount) || 0,
283 |         id,
284 |       });
285 |       setIsEditModalOpen(false);
286 |     },
287 |     [id, updateSchoolMutation],
288 |   );
289 | 
290 |   const editDefaultValues = useMemo<SchoolEditFormValues>(
291 |     () => ({
292 |       type: (schoolData.type as "Школа" | "Садочок") || "Школа",
293 |       address: schoolData.address,
294 |       director: schoolData.director,
295 |       phone: schoolData.phone,
296 |       email: schoolData.email,
297 |       childrenCount: schoolData.childrenCount
298 |         ? String(schoolData.childrenCount)
299 |         : "",
300 |     }),
301 |     [schoolData],
302 |   );
303 | 
304 |   const handleUpdatePreparation = useCallback(
305 |     async (field: string, status: "PLANNED" | "IN_PROGRESS" | "DONE") => {
306 |       if (!currentEvent) return;
307 |       await updatePreparation.mutateAsync({
308 |         eventId: currentEvent.id,
309 |         field,
310 |         status,
311 |       });
312 |     },
313 |     [currentEvent, updatePreparation],
314 |   );
315 | 
316 |   const handleSubmitReport = useCallback(
317 |     async (reportData: ReportData) => {
318 |       if (!currentEvent) return;
319 |       await submitReportMutation.mutateAsync({
320 |         eventId: currentEvent.id,
321 |         reportData,
322 |       });
323 |       await updateStatus.mutateAsync({
324 |         eventId: currentEvent.id,
325 |         status: "RE_SALE",
326 |         actionName: "Звіт сформовано. Захід завершено.",
327 |       });
328 |       setExitingEventId(currentEvent.id);
329 |       setTimeout(() => {
330 |         setSelectedEventId(null);
331 |         setExitingEventId(null);
332 |       }, 500);
333 |       setIsReportModalOpen(false);
334 |     },
335 |     [currentEvent, submitReportMutation, updateStatus],
336 |   );
337 | 
338 |   const handleAssignCrew = useCallback(
339 |     async (crewId: string) => {
340 |       if (!currentEvent) return;
341 | 
342 |       await assignCrewMutation.mutateAsync({
343 |         eventId: currentEvent.id,
344 |         crewId,
345 |       });
346 | 
347 |       await updatePreparation.mutateAsync({
348 |         eventId: currentEvent.id,
349 |         field: "assignCrew",
350 |         status: "DONE",
351 |       });
352 | 
353 |       setIsCrewModalOpen(false);
354 |     },
355 |     [currentEvent, assignCrewMutation, updatePreparation],
356 |   );
357 | 
358 |   const events = eventsRaw;
359 | 
360 |   const openAddEventModal = useCallback(() => {
361 |     setIsEventModalOpen(true);
362 |   }, []);
363 | 
364 |   const eventDefaultValues = useMemo<Partial<EventFormValues>>(
365 |     () => ({
366 |       project: "Голограма для школи",
367 |       time: "11:00",
368 |       address: schoolData.address,
369 |       contactPerson: schoolData.director,
370 |       contactPhone: schoolData.phone,
371 |       childrenPlanned: String(schoolData.childrenCount),
372 |     }),
373 |     [schoolData],
374 |   );
375 |   const stagger = (i: number) => ({
376 |     initial: { opacity: 0, y: 10 },
377 |     animate: { opacity: 1, y: 0 },
378 |     transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
379 |   });
380 | 
381 |   return (
382 |     <div className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8">
383 |       <SchoolProfileHeader
384 |         schoolData={schoolData}
385 |         onEdit={() => setIsEditModalOpen(true)}
386 |         onAddEvent={openAddEventModal}
387 |       />
388 | 
389 |       <div className="flex flex-col xl:flex-row gap-6">
390 |         {/* Ліва колонка */}
391 |         <div className="w-full xl:w-80 flex flex-col gap-6">
392 |           <motion.div {...stagger(0)}>
393 |             <Suspense
394 |               fallback={
395 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
396 |               }
397 |             >
398 |               <SchoolInfoCard schoolData={schoolData} />
399 |             </Suspense>
400 |           </motion.div>
401 | 
402 |           <AnimatePresence>
403 |             {currentEvent && currentStageIndex >= 1 && (
404 |               <motion.div
405 |                 key="responsible"
406 |                 initial={{ opacity: 0, y: 8 }}
407 |                 animate={{ opacity: 1, y: 0 }}
408 |                 exit={{ opacity: 0, y: -8 }}
409 |                 transition={{ duration: 0.25 }}
410 |                 className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
411 |               >
412 |                 <h3 className="font-bold text-slate-800 mb-4">
413 |                   Відповідальна особа
414 |                 </h3>
415 |                 <ul className="space-y-2 text-sm">
416 |                   <li className="flex justify-between">
417 |                     <span className="text-slate-500">Остання дія:</span>
418 |                     <span className="font-medium text-blue-600">
419 |                       {creatorName}
420 |                     </span>
421 |                   </li>
422 |                 </ul>
423 |               </motion.div>
424 |             )}
425 |           </AnimatePresence>
426 | 
427 |           <motion.div {...stagger(1)}>
428 |             <Suspense
429 |               fallback={
430 |                 <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
431 |               }
432 |             >
433 |               <HistoryTimeline
434 |                 currentEvent={
435 |                   eventFullLoading ? currentEventBase : currentEvent
436 |                 }
437 |                 onHistoryClick={handleHistoryClick}
438 |                 onAddCommentClick={handleAddCommentClick}
439 |               />
440 |             </Suspense>
441 |           </motion.div>
442 |         </div>
443 | 
444 |         {/* Права колонка */}
445 |         <motion.div
446 |           className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
447 |             exitingEventId === currentEvent?.id
448 |               ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
449 |               : ""
450 |           }`}
451 |           initial={{ opacity: 0, y: 10 }}
452 |           animate={{ opacity: 1, y: 0 }}
453 |           transition={{ duration: 0.3, delay: 0.15 }}
454 |         >
455 |           {currentEvent && (
456 |             <Suspense
457 |               fallback={
458 |                 <div className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />
459 |               }
460 |             >
461 |               <Pipeline
462 |                 currentStageIndex={currentStageIndex}
463 |                 currentEvent={currentEvent}
464 |                 onPipelineClick={handlePipelineClick}
465 |                 stages={PIPELINE_STAGES}
466 |               />
467 |             </Suspense>
468 |           )}
469 | 
470 |           <AnimatePresence>
471 |             {currentEvent && currentStageIndex >= 4 && (
472 |               <motion.div
473 |                 key="preparation"
474 |                 initial={{ opacity: 0, y: 8 }}
475 |                 animate={{ opacity: 1, y: 0 }}
476 |                 exit={{ opacity: 0, y: -8 }}
477 |                 transition={{ duration: 0.25 }}
478 |                 className="grid grid-cols-1 xl:grid-cols-2 gap-6"
479 |               >
480 |                 {eventFullLoading ? (
481 |                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
482 |                 ) : (
483 |                   <Suspense
484 |                     fallback={
485 |                       <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
486 |                     }
487 |                   >
488 |                     <EventPreparation
489 |                       data={currentEvent.preparation || {}}
490 |                       onUpdate={handleUpdatePreparation}
491 |                       onOpenCrewModal={() => setIsCrewModalOpen(true)}
492 |                     />
493 |                   </Suspense>
494 |                 )}
495 |                 <Suspense
496 |                   fallback={
497 |                     <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
498 |                   }
499 |                 >
500 |                   <AssignedCrew currentEvent={currentEvent} employees={users} />
501 |                 </Suspense>
502 |               </motion.div>
503 |             )}
504 |           </AnimatePresence>
505 | 
506 |           <motion.div {...stagger(2)}>
507 |             <Suspense
508 |               fallback={
509 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
510 |               }
511 |             >
512 |               <EventDetails
513 |                 currentEvent={currentEvent}
514 |                 schoolName={schoolData.name}
515 |                 cityId={schoolData.cityId}
516 |                 onEventUpdated={() =>
517 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
518 |                 }
519 |               />
520 |             </Suspense>
521 |           </motion.div>
522 | 
523 |           <motion.div {...stagger(3)}>
524 |             <Suspense
525 |               fallback={
526 |                 <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
527 |               }
528 |             >
529 |               <EventsTable
530 |                 events={events}
531 |                 selectedEventId={selectedEventId}
532 |                 onEventSelect={setSelectedEventId}
533 |                 onDeleteSuccess={() =>
534 |                   qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
535 |                 }
536 |               />
537 |             </Suspense>
538 |             {completedEvents.length > 0 && (
539 |               <motion.div {...stagger(4)}>
540 |                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
541 |                   <div className="p-6 border-b border-slate-100 bg-slate-50/50">
542 |                     <h3 className="font-bold text-slate-800">
543 |                       Завершені події ({completedEvents.length})
544 |                     </h3>
545 |                   </div>
546 |                   <div className="md:hidden divide-y divide-slate-50">
547 |                     {completedEvents.map((ev: Event) => (
548 |                       <div
549 |                         key={ev.id}
550 |                         onClick={() => setSelectedReportEvent(ev)}
551 |                         className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
552 |                       >
553 |                         <div className="min-w-0">
554 |                           <p className="font-medium text-blue-600 truncate">
555 |                             {ev.project}
556 |                           </p>
557 |                           <p className="text-xs text-slate-400 mt-0.5">
558 |                             {new Date(ev.date).toLocaleDateString("uk-UA")}
559 |                           </p>
560 |                           <p className="text-xs text-slate-500 mt-1">
561 |                             👶{" "}
562 |                             {ev.report?.childrenCount ||
563 |                               ev.childrenPlanned ||
564 |                               "—"}{" "}
565 |                             дітей
566 |                           </p>
567 |                         </div>
568 |                         <div className="text-right shrink-0">
569 |                           <p className="font-semibold text-slate-800 text-sm">
570 |                             {new Intl.NumberFormat("uk-UA").format(
571 |                               ev.report?.totalSum || ev.price || 0,
572 |                             )}{" "}
573 |                             грн
574 |                           </p>
575 |                           <p className="text-xs font-medium text-emerald-600 mt-0.5">
576 |                             +
577 |                             {new Intl.NumberFormat("uk-UA").format(
578 |                               ev.report?.remainderSum || 0,
579 |                             )}{" "}
580 |                             грн
581 |                           </p>
582 |                         </div>
583 |                       </div>
584 |                     ))}
585 |                   </div>
586 |                   <div className="hidden md:block overflow-x-auto">
587 |                     <table className="w-full text-left text-sm">
588 |                       <thead>
589 |                         <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
590 |                           <th className="p-4">Проєкт</th>
591 |                           <th className="p-4">Дата</th>
592 |                           <th className="p-4">Дітей</th>
593 |                           <th className="p-4">Виручка</th>
594 |                           <th className="p-4">Прибуток</th>
595 |                         </tr>
596 |                       </thead>
597 |                       <tbody>
598 |                         {completedEvents.map((ev: any) => (
599 |                           <tr
600 |                             key={ev.id}
601 |                             onClick={() => setSelectedReportEvent(ev)}
602 |                             className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
603 |                           >
604 |                             <td className="p-4 text-slate-700 font-medium">
605 |                               {ev.project}
606 |                             </td>
607 |                             <td className="p-4 text-slate-600">
608 |                               {new Date(ev.date).toLocaleDateString("uk-UA")}
609 |                             </td>
610 |                             <td className="p-4 font-medium">
611 |                               {ev.report?.childrenCount ||
612 |                                 ev.childrenPlanned ||
613 |                                 "—"}
614 |                             </td>
615 |                             <td className="p-4 font-medium text-slate-800">
616 |                               {new Intl.NumberFormat("uk-UA").format(
617 |                                 ev.report?.totalSum || ev.price || 0,
618 |                               )}{" "}
619 |                               грн
620 |                             </td>
621 |                             <td className="p-4 font-medium text-emerald-600">
622 |                               {new Intl.NumberFormat("uk-UA").format(
623 |                                 ev.report?.remainderSum || 0,
624 |                               )}{" "}
625 |                               грн
626 |                             </td>
627 |                           </tr>
628 |                         ))}
629 |                       </tbody>
630 |                     </table>
631 |                   </div>
632 |                 </div>
633 |               </motion.div>
634 |             )}
635 |           </motion.div>
636 |         </motion.div>
637 |       </div>
638 | 
639 |       {/* Мобільна FAB */}
640 |       <button
641 |         onClick={openAddEventModal}
642 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
643 |       >
644 |         +
645 |       </button>
646 | 
647 |       {/* Модальні вікна */}
648 |       <EditSchoolModal
649 |         isOpen={isEditModalOpen}
650 |         onClose={() => setIsEditModalOpen(false)}
651 |         defaultValues={editDefaultValues}
652 |         onSave={handleSaveSchoolInfo}
653 |       />
654 |       <EventModal
655 |         isOpen={isEventModalOpen}
656 |         onClose={() => setIsEventModalOpen(false)}
657 |         defaultValues={eventDefaultValues}
658 |         onSave={handleSaveEvent}
659 |       />
660 |       <CommentModal
661 |         isOpen={commentModal.isOpen}
662 |         onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
663 |         mode={commentModal.mode}
664 |         text={commentModal.text}
665 |         setText={(t) => setCommentModal({ ...commentModal, text: t })}
666 |         onSave={handleSaveComment}
667 |       />
668 |       <CrewModal
669 |         isOpen={isCrewModalOpen}
670 |         onClose={() => setIsCrewModalOpen(false)}
671 |         city={schoolData.city}
672 |         employees={users}
673 |         onSave={handleAssignCrew}
674 |       />
675 |       <ReportModal
676 |         isOpen={isReportModalOpen}
677 |         onClose={() => setIsReportModalOpen(false)}
678 |         onSave={handleSubmitReport}
679 |         schoolName={schoolData.name}
680 |         eventType={currentEvent?.project}
681 |         eventDate={currentEvent?.date}
682 |         eventIndex={
683 |           events
684 |             .filter((e) => e.schoolId === schoolData.id)
685 |             .findIndex((e) => e.id === currentEvent?.id) + 1
686 |         }
687 |         crew={
688 |           currentEvent?.crew
689 |             ? {
690 |                 host: currentEvent.crew.hostId
691 |                   ? (users.find(
692 |                       (u: User) => u.id === currentEvent.crew.hostId,
693 |                     ) ?? null)
694 |                   : (currentEvent.crew.host ?? null),
695 |                 driver: currentEvent.crew.driverId
696 |                   ? (users.find(
697 |                       (u: User) => u.id === currentEvent.crew.driverId,
698 |                     ) ?? null)
699 |                   : (currentEvent.crew.driver ?? null),
700 |               }
701 |             : undefined
702 |         }
703 |       />
704 |       <CompletedEventModal
705 |         isOpen={!!selectedReportEvent}
706 |         onClose={() => setSelectedReportEvent(null)}
707 |         event={selectedReportEvent}
708 |       />
709 |     </div>
710 |   );
711 | }
712 | 
```

### File: apps/frontend/src/pages/Schools.tsx
```tsx
  0 | import {
  1 |   useState,
  2 |   useRef,
  3 |   useEffect,
  4 |   useMemo,
  5 |   useCallback,
  6 |   lazy,
  7 |   Suspense,
  8 | } from "react";
  9 | import { api } from "../config/api";
 10 | import { useSelectedCity } from "../context/CityContext";
 11 | import {
 12 |   useSchools,
 13 |   useSchoolStats,
 14 |   useDeleteSchool,
 15 |   usePrefetchSchool,
 16 |   useCities,
 17 | } from "../hooks/useApi";
 18 | import { useQueryClient, useMutation } from "@tanstack/react-query";
 19 | import VirtualSchoolList from "../components/VirtualSchoolList";
 20 | import { SchoolCard } from "../components/schools/SchoolMobileList";
 21 | import type { SchoolContact } from "../types";
 22 | 
 23 | interface NewSchoolPayload {
 24 |   name: string;
 25 |   cityId: string;
 26 |   sourceUrl: string;
 27 |   director: string;
 28 |   phone: string;
 29 |   type: string;
 30 | }
 31 | 
 32 | const StatsBar = lazy(() => import("../components/schools/StatsBar"));
 33 | const VirtualDesktopTable = lazy(
 34 |   () => import("../components/schools/VirtualDesktopTable"),
 35 | );
 36 | export const PIPELINE_STAGES = [
 37 |   { key: "BASE", name: "Новий заклад" },
 38 |   { key: "FIRST_CONTACT", name: "Знайомство" },
 39 |   { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
 40 |   { key: "PREPARATION", name: "Оголошення" },
 41 |   { key: "IN_PROGRESS", name: "Підготовка" },
 42 |   { key: "DONE", name: "Проведення заходу" },
 43 |   { key: "REPORT", name: "Звіт" },
 44 | ];
 45 | 
 46 | interface City {
 47 |   id: string;
 48 |   name: string;
 49 | }
 50 | 
 51 | export default function Schools() {
 52 |   const { selectedCity } = useSelectedCity();
 53 |   const [isModalOpen, setIsModalOpen] = useState(false);
 54 |   const [isSubmitting, setIsSubmitting] = useState(false);
 55 |   const [searchQuery, setSearchQuery] = useState("");
 56 |   const [userRole] = useState<string | null>(() => {
 57 |     try {
 58 |       return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
 59 |     } catch {
 60 |       return null;
 61 |     }
 62 |   });
 63 |   const qc = useQueryClient();
 64 |   const [form, setForm] = useState({
 65 |     name: "",
 66 |     cityId: "",
 67 |     sourceUrl: "",
 68 |     director: "",
 69 |     phone: "",
 70 |   });
 71 |   const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
 72 |   const [activeFilter, setActiveFilter] = useState<string | null>(null);
 73 |   const [sizeFilter, setSizeFilter] = useState<string | null>(null);
 74 |   const [debouncedQuery, setDebouncedQuery] = useState("");
 75 |   const [suggestions, setSuggestions] = useState<
 76 |     { name: string; url: string }[]
 77 |   >([]);
 78 |   const [showSuggestions, setShowSuggestions] = useState(false);
 79 |   const [isSearching, setIsSearching] = useState(false);
 80 |   const [dotCount, setDotCount] = useState(3);
 81 |   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 82 | 
 83 |   const addSchoolMutation = useMutation({
 84 |     mutationFn: (newSchool: NewSchoolPayload) =>
 85 |       api.post("/schools", newSchool, {
 86 |         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
 87 |       }),
 88 |     onSuccess: () => {
 89 |       qc.invalidateQueries({ queryKey: ["schools"] });
 90 |       setIsModalOpen(false);
 91 |     },
 92 |     onError: () => alert("Не вдалося створити заклад"),
 93 |   });
 94 | 
 95 |   const bulkImportMutation = useMutation({
 96 |     mutationFn: (cityId: string) =>
 97 |       api.post(
 98 |         "/schools/bulk-import",
 99 |         { cityId, type: "Школа" },
100 |         {
101 |           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
102 |           timeout: 120000,
103 |         },
104 |       ),
105 |     onSuccess: (res) => {
106 |       alert(
107 |         `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
108 |       );
109 |       qc.invalidateQueries({ queryKey: ["schools"] });
110 |     },
111 |     onError: () => alert("Помилка імпорту."),
112 |   });
113 | 
114 |   useEffect(() => {
115 |     const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
116 |     return () => clearTimeout(t);
117 |   }, [searchQuery]);
118 | 
119 |   const schoolFilters = useMemo(
120 |     () => ({
121 |       search: debouncedQuery || undefined,
122 |       cityId: selectedCity.id || undefined,
123 |       type: "Школа" as const,
124 |       stage: (activeFilter as any) || undefined,
125 |       size: (sizeFilter as any) || undefined,
126 |     }),
127 |     [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
128 |   );
129 | 
130 |   const {
131 |     data: schoolsPages,
132 |     isLoading,
133 |     fetchNextPage,
134 |     hasNextPage,
135 |     isFetchingNextPage,
136 |   } = useSchools(schoolFilters);
137 |   const { data: stats } = useSchoolStats({
138 |     cityId: selectedCity.id || undefined,
139 |     type: "Школа",
140 |     stage: (activeFilter as any) || undefined,
141 |   });
142 |   const { data: cities = [] } = useCities();
143 |   const deleteSchool = useDeleteSchool();
144 |   const prefetchSchool = usePrefetchSchool();
145 | 
146 |   const handleLoadMore = useCallback(() => {
147 |     if (hasNextPage && !isFetchingNextPage) fetchNextPage();
148 |   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
149 | 
150 |   const filteredSchools = useMemo(
151 |     () => schoolsPages?.pages.flatMap((p) => p.data) ?? [],
152 |     [schoolsPages],
153 |   );
154 |   const totalItems = schoolsPages?.pages[0]?.meta.totalItems ?? 0;
155 | 
156 |   const handleOpenModal = useCallback(() => {
157 |     setForm({
158 |       name: "",
159 |       cityId: selectedCity.id || cities[0]?.id || "",
160 |       sourceUrl: "",
161 |       director: "",
162 |       phone: "",
163 |     });
164 |     setMatchedContacts([]);
165 |     setIsModalOpen(true);
166 |   }, [selectedCity.id, cities]);
167 | 
168 |   const fetchContacts = async (schoolName: string) => {
169 |     if (!schoolName || schoolName.trim().length < 1)
170 |       return setMatchedContacts([]);
171 |     const currentCityName =
172 |       selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
173 |     if (currentCityName.toLowerCase() !== "львів")
174 |       return setMatchedContacts([]);
175 |     try {
176 |       const data = await qc.fetchQuery<SchoolContact[]>({
177 |         queryKey: ["schoolContacts", schoolName, currentCityName],
178 |         queryFn: async () => {
179 |           const res = await api.get<SchoolContact[]>(
180 |             `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
181 |             {
182 |               headers: {
183 |                 Authorization: `Bearer ${localStorage.getItem("token")}`,
184 |               },
185 |             },
186 |           );
187 |           return res.data;
188 |         },
189 |         staleTime: 1000 * 60 * 5,
190 |       });
191 | 
192 |       setMatchedContacts(data);
193 |       if (data.length > 0) {
194 |         const director =
195 |           data.find(
196 |             (c: SchoolContact) =>
197 |               c.role?.includes("Директор") || c.role?.includes("Завідувач"),
198 |           ) || data[0];
199 |         setForm((f) => ({
200 |           ...f,
201 |           director: director.contactName,
202 |           phone: director.phone,
203 |         }));
204 |       }
205 |     } catch (e) {
206 |       console.error(e);
207 |     }
208 |   };
209 | 
210 |   const handleNameChange = (value: string) => {
211 |     setForm({ ...form, name: value });
212 |     if (debounceTimer.current) clearTimeout(debounceTimer.current);
213 |     if (value.length < 2) {
214 |       setShowSuggestions(false);
215 |       setIsSearching(false);
216 |       setMatchedContacts([]);
217 |       return;
218 |     }
219 |     setIsSearching(true);
220 |     setShowSuggestions(true);
221 |     debounceTimer.current = setTimeout(async () => {
222 |       try {
223 |         const [externalData] = await Promise.all([
224 |           qc.fetchQuery({
225 |             queryKey: ["schoolSearchExternal", value],
226 |             queryFn: async () => {
227 |               const res = await api.get(
228 |                 `/schools/search?q=${encodeURIComponent(value)}&type=Школа`,
229 |                 {
230 |                   headers: {
231 |                     Authorization: `Bearer ${localStorage.getItem("token")}`,
232 |                   },
233 |                 },
234 |               );
235 |               return res.data;
236 |             },
237 |             staleTime: 1000 * 60 * 5,
238 |           }),
239 |           fetchContacts(value),
240 |         ]);
241 |         setSuggestions(externalData);
242 |       } catch (e) {
243 |         console.error(e);
244 |       } finally {
245 |         setIsSearching(false);
246 |       }
247 |     }, 400);
248 |   };
249 | 
250 |   const handleSelectSuggestion = (name: string, url: string) => {
251 |     setForm({ ...form, name, sourceUrl: url });
252 |     setShowSuggestions(false);
253 |     fetchContacts(name);
254 |   };
255 | 
256 |   const handleAddSchool = (e: React.FormEvent) => {
257 |     e.preventDefault();
258 |     if (!form.name.trim() || !form.cityId) return;
259 |     addSchoolMutation.mutate({ ...form, type: "Школа" });
260 |   };
261 | 
262 |   const handleDeleteSchool = useCallback(
263 |     async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
264 |       e.stopPropagation();
265 |       if (userRole !== "SUPERADMIN") return;
266 |       if (
267 |         !window.confirm(
268 |           `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
269 |         )
270 |       )
271 |         return;
272 |       await deleteSchool.mutateAsync(schoolId);
273 |     },
274 |     [deleteSchool, userRole],
275 |   );
276 | 
277 | 
278 | 
279 |   return (
280 |     <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
281 |       {/* Шапка */}
282 |       <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
283 |         <div className="min-w-0">
284 |           <h1 className="text-xl font-bold text-slate-800 leading-tight">
285 |             Школи
286 |             {selectedCity.id && (
287 |               <span className="ml-2 text-sm font-normal text-blue-500">
288 |                 · {selectedCity.name}
289 |               </span>
290 |             )}
291 |           </h1>
292 |         </div>
293 |         <div className="flex gap-2 shrink-0">
294 |           {userRole === "SUPERADMIN" && (
295 |             <button
296 |               onClick={() => {
297 |                 if (!selectedCity.id) return alert("Спочатку оберіть місто");
298 |                 if (
299 |                   !window.confirm(
300 |                     `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
301 |                   )
302 |                 )
303 |                   return;
304 | 
305 |                 setDotCount(3);
306 |                 const dotInterval = setInterval(() => {
307 |                   setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
308 |                 }, 500);
309 | 
310 |                 bulkImportMutation.mutate(selectedCity.id, {
311 |                   onSettled: () => clearInterval(dotInterval),
312 |                 });
313 |               }}
314 |               disabled={bulkImportMutation.isPending}
315 |               className="md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
316 |             >
317 |               {bulkImportMutation.isPending ? (
318 |                 <span className="font-medium">
319 |                   Імпортую{"·".repeat(dotCount)}
320 |                 </span>
321 |               ) : (
322 |                 <>📥 Імпорт з isuo</>
323 |               )}
324 |             </button>
325 |           )}
326 |           <button
327 |             onClick={handleOpenModal}
328 |             className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
329 |           >
330 |             + Додати
331 |           </button>
332 |         </div>
333 |       </div>
334 | 
335 |       {/* StatsBar */}
336 |       <div className="shrink-0">
337 |         <Suspense
338 |           fallback={
339 |             <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
340 |           }
341 |         >
342 |           <StatsBar
343 |             statusStats={stats?.statusStats ?? { new: 0, planned: 0, inProgress: 0, done: 0 }}
344 |             sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
345 |             activeFilter={activeFilter}
346 |             onFilterChange={setActiveFilter}
347 |             sizeFilter={sizeFilter}
348 |             onSizeFilterChange={setSizeFilter}
349 |             schoolType="Школа"
350 |           />
351 |         </Suspense>
352 |       </div>
353 | 
354 |       {/* Пошук */}
355 |       <div className="relative shrink-0 mb-4 mt-2">
356 |         <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
357 |           <svg
358 |             className="w-5 h-5 text-slate-400"
359 |             fill="none"
360 |             stroke="currentColor"
361 |             viewBox="0 0 24 24"
362 |           >
363 |             <path
364 |               strokeLinecap="round"
365 |               strokeLinejoin="round"
366 |               strokeWidth={2}
367 |               d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
368 |             />
369 |           </svg>
370 |         </div>
371 |         <input
372 |           type="text"
373 |           value={searchQuery}
374 |           onChange={(e) => setSearchQuery(e.target.value)}
375 |           placeholder="Пошук за назвою, директором, адресою..."
376 |           className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
377 |         />
378 |         {searchQuery && (
379 |           <button
380 |             onClick={() => setSearchQuery("")}
381 |             className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
382 |           >
383 |             <svg
384 |               className="w-5 h-5"
385 |               fill="none"
386 |               stroke="currentColor"
387 |               viewBox="0 0 24 24"
388 |             >
389 |               <path
390 |                 strokeLinecap="round"
391 |                 strokeLinejoin="round"
392 |                 strokeWidth={2}
393 |                 d="M6 18L18 6M6 6l12 12"
394 |               />
395 |             </svg>
396 |           </button>
397 |         )}
398 |       </div>
399 | 
400 |       {/* Лічильник */}
401 |       <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
402 |         {`${filteredSchools.length} з ${totalItems} шкіл`}
403 |         {(activeFilter || sizeFilter) && (
404 |           <button
405 |             onClick={() => {
406 |               setActiveFilter(null);
407 |               setSizeFilter(null);
408 |             }}
409 |             className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
410 |           >
411 |             скинути фільтри
412 |           </button>
413 |         )}
414 |       </p>
415 | 
416 |       {/* Компоненти списків */}
417 |       {isLoading ? (
418 |         <div className="flex flex-col gap-2.5 flex-1">
419 |           {Array.from({ length: 8 }).map((_, i) => (
420 |             <div
421 |               key={i}
422 |               className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
423 |               style={{ opacity: 1 - i * 0.1 }}
424 |             >
425 |               <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
426 |               <div className="flex justify-between">
427 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
428 |                 <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
429 |               </div>
430 |             </div>
431 |           ))}
432 |         </div>
433 |       ) : (
434 |         <>
435 |           {/* Мобільний: віртуалізований список карток */}
436 |           <div className="md:hidden flex-1 w-full overflow-hidden">
437 |             <VirtualSchoolList
438 |               schools={filteredSchools}
439 |               itemHeight={110}
440 |               onEndReached={handleLoadMore}
441 |               renderItem={(school, index) => (
442 |                 <div
443 |                   className="pb-2.5"
444 |                   onMouseEnter={() => prefetchSchool(school.id)}
445 |                 >
446 |                   <SchoolCard
447 |                     school={school}
448 |                     index={index}
449 |                     onDelete={handleDeleteSchool}
450 |                     stages={PIPELINE_STAGES}
451 |                   />
452 |                 </div>
453 |               )}
454 |             />
455 |           </div>
456 | 
457 |           {/* Десктоп: таблиця з віртуалізованим tbody */}
458 |           <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
459 |             <Suspense
460 |               fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
461 |             >
462 |               <VirtualDesktopTable
463 |                 schools={filteredSchools}
464 |                 searchQuery={searchQuery}
465 |                 onDelete={handleDeleteSchool}
466 |                 stages={PIPELINE_STAGES}
467 |                 onEndReached={handleLoadMore}
468 |               />
469 |             </Suspense>
470 |           </div>
471 |         </>
472 |       )}
473 | 
474 |       {/* Мобільна плаваюча кнопка FAB */}
475 |       <button
476 |         onClick={handleOpenModal}
477 |         className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
478 |       >
479 |         +
480 |       </button>
481 | 
482 |       {/* Модальне вікно */}
483 |       {isModalOpen && (
484 |         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
485 |           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
486 |             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
487 |               <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
488 |               <button
489 |                 onClick={() => setIsModalOpen(false)}
490 |                 className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
491 |               >
492 |                 ✕
493 |               </button>
494 |             </div>
495 | 
496 |             <form
497 |               onSubmit={handleAddSchool}
498 |               className="p-6 flex flex-col gap-4 overflow-y-auto"
499 |             >
500 |               <div className="relative">
501 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
502 |                   Назва школи
503 |                 </label>
504 |                 <input
505 |                   type="text"
506 |                   value={form.name}
507 |                   onChange={(e) => handleNameChange(e.target.value)}
508 |                   onBlur={() =>
509 |                     setTimeout(() => setShowSuggestions(false), 150)
510 |                   }
511 |                   placeholder="Наприклад: Школа №1"
512 |                   required
513 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
514 |                 />
515 |                 {showSuggestions && (
516 |                   <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
517 |                     {isSearching ? (
518 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
519 |                         Пошук...
520 |                       </li>
521 |                     ) : suggestions.length > 0 ? (
522 |                       suggestions.map((s, i) => (
523 |                         <li
524 |                           key={i}
525 |                           onMouseDown={() =>
526 |                             handleSelectSuggestion(s.name, s.url)
527 |                           }
528 |                           className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
529 |                         >
530 |                           {s.name}
531 |                         </li>
532 |                       ))
533 |                     ) : (
534 |                       <li className="px-4 py-3 text-sm text-slate-400 italic">
535 |                         Нічого не знайдено
536 |                       </li>
537 |                     )}
538 |                   </ul>
539 |                 )}
540 |               </div>
541 | 
542 |               {!selectedCity.id && (
543 |                 <div>
544 |                   <label className="block text-sm font-medium text-slate-600 mb-1.5">
545 |                     Місто
546 |                   </label>
547 |                   <select
548 |                     value={form.cityId}
549 |                     onChange={(e) =>
550 |                       setForm({ ...form, cityId: e.target.value })
551 |                     }
552 |                     required
553 |                     className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
554 |                   >
555 |                     <option value="">— Оберіть місто —</option>
556 |                     {cities.map((c) => (
557 |                       <option key={c.id} value={c.id}>
558 |                         {c.name}
559 |                       </option>
560 |                     ))}
561 |                   </select>
562 |                 </div>
563 |               )}
564 | 
565 |               <div>
566 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
567 |                   Контакт{" "}
568 |                   <span className="ml-1 text-xs font-normal text-slate-400">
569 |                     (автозаповнення)
570 |                   </span>
571 |                 </label>
572 |                 {matchedContacts.length > 0 && (
573 |                   <div className="flex flex-wrap gap-1.5 mb-3">
574 |                     {matchedContacts.map((c, i) => (
575 |                       <button
576 |                         key={i}
577 |                         type="button"
578 |                         onClick={() =>
579 |                           setForm((f) => ({
580 |                             ...f,
581 |                             director: c.contactName,
582 |                             phone: c.phone,
583 |                           }))
584 |                         }
585 |                         className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
586 |                       >
587 |                         {c.role ? `${c.role}: ` : ""}
588 |                         {c.contactName}
589 |                       </button>
590 |                     ))}
591 |                   </div>
592 |                 )}
593 |                 <input
594 |                   type="text"
595 |                   value={form.director}
596 |                   onChange={(e) =>
597 |                     setForm({ ...form, director: e.target.value })
598 |                   }
599 |                   placeholder="Микола Петренко"
600 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
601 |                 />
602 |                 <label className="block text-sm font-medium text-slate-600 mb-1.5">
603 |                   Телефон
604 |                 </label>
605 |                 <input
606 |                   type="text"
607 |                   value={form.phone}
608 |                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
609 |                   placeholder="0671234567"
610 |                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
611 |                 />
612 |               </div>
613 | 
614 |               <div className="flex gap-3 mt-4">
615 |                 <button
616 |                   type="button"
617 |                   onClick={() => setIsModalOpen(false)}
618 |                   className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
619 |                 >
620 |                   Скасувати
621 |                 </button>
622 |                 <button
623 |                   type="submit"
624 |                   disabled={addSchoolMutation.isPending}
625 |                   className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
626 |                 >
627 |                   {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
628 |                 </button>
629 |               </div>
630 |             </form>
631 |           </div>
632 |         </div>
633 |       )}
634 |     </div>
635 |   );
636 | }
637 | 
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
154 | import type { PreparationStatus } from '../utils/preparationStatus';
155 | 
156 | export interface EventPreparation {
157 |   assignCrew: PreparationStatus;
158 |   bookEquipment: PreparationStatus;
159 |   prepareDocs: PreparationStatus;
160 |   prepareMaterials: PreparationStatus;
161 |   remindSchool: PreparationStatus;
162 | }
163 | 
164 | export interface CityProfile extends City {
165 |   events: Event[];
166 |   crews: Crew[];
167 |   schools?: School[];
168 | }
169 | 
170 | export interface PipelineStage {
171 |   key: string;
172 |   name: string;
173 | }
174 | 
175 | export interface IssueReport {
176 |   id: string;
177 |   eventId: string;
178 |   schoolName: string;
179 |   eventName: string;
180 |   message: string;
181 |   cityId: string;
182 |   status: string;
183 |   createdAt: string;
184 | }
185 | 
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

### File: apps/frontend/src/utils/preparationStatus.ts
```ts
  0 | export type PreparationStatus = "PLANNED" | "IN_PROGRESS" | "DONE";
  1 | 
  2 | export const PREPARATION_STATUS_ORDER: PreparationStatus[] = [
  3 |   "PLANNED",
  4 |   "IN_PROGRESS",
  5 |   "DONE",
  6 | ];
  7 | 
  8 | export const PREPARATION_STATUS_LABELS: Record<PreparationStatus, string> = {
  9 |   PLANNED: "Заплановано",
 10 |   IN_PROGRESS: "В процесі",
 11 |   DONE: "Виконано",
 12 | };
 13 | 
 14 | export function getNextPreparationStatus(
 15 |   current: PreparationStatus,
 16 | ): PreparationStatus {
 17 |   const idx = PREPARATION_STATUS_ORDER.indexOf(current || "PLANNED");
 18 |   return PREPARATION_STATUS_ORDER[(idx + 1) % PREPARATION_STATUS_ORDER.length];
 19 | }
 20 | 
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
  0 | const fs = require("fs");
  1 | const path = require("path");
  2 | 
  3 | const outputFile = "combined_performance_files.md";
  4 | 
  5 | fs.writeFileSync(
  6 |   outputFile,
  7 |   "# Файли Dashboard, Schools, Events та Prisma Schema\n\n",
  8 | );
  9 | 
 10 | const filesToCollect = [
 11 |   "apps/backend/src/dashboard/dashboard.service.ts",
 12 |   "apps/backend/src/dashboard/dashboard.module.ts",
 13 |   "apps/backend/src/dashboard/dashboard.controller.ts",
 14 |   "apps/backend/prisma/schema.prisma",
 15 |   "apps/backend/src/schools/schools.service.ts",
 16 |   "apps/backend/src/common/dto/page-meta.dto.ts",
 17 |   "apps/backend/src/common/dto/page-options.dto.ts",
 18 |   "apps/backend/src/events/events.service.ts",
 19 | ];
 20 | 
 21 | let collectedCount = 0;
 22 | 
 23 | console.log("🚀 Починаю збір файлів для аналізу оптимізації та пагінації...\n");
 24 | 
 25 | filesToCollect.forEach((filePath) => {
 26 |   if (!fs.existsSync(filePath)) {
 27 |     console.warn(`[!] Файл не знайдено: ${filePath}`);
 28 |     return;
 29 |   }
 30 | 
 31 |   const content = fs.readFileSync(filePath, "utf-8");
 32 |   const ext = path.extname(filePath).replace(".", "");
 33 | 
 34 |   let lang = ext;
 35 |   if (["ts", "tsx"].includes(ext)) lang = "typescript";
 36 |   if (ext === "prisma") lang = "prisma";
 37 | 
 38 |   const mdBlock = `### \`${filePath}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n---\n\n`;
 39 |   fs.appendFileSync(outputFile, mdBlock);
 40 |   console.log(`[+] Додано: ${filePath}`);
 41 |   collectedCount++;
 42 | });
 43 | 
 44 | console.log(`\n✅ Готово! Зібрано ${collectedCount} файлів у ${outputFile}`);
 45 | 
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
