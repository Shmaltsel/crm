# FILE: apps/backend/eslint.config.mjs

```
// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'dist/**',
      'coverage/**',
      'collect-code.js',
      'prisma/seed-admin.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);

```

# FILE: apps/backend/nest-cli.json

```
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}

```

# FILE: apps/backend/package.json

```
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "seed:demo": "node prisma/seed-demo.js"
  },
  "dependencies": {
    "@nest-lab/throttler-storage-redis": "^1.0.0",
    "@nestjs/cache-manager": "^3.1.3",
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.2",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/swagger": "^11.4.5",
    "@nestjs/terminus": "^11.1.1",
    "@nestjs/throttler": "^6.5.0",
    "@prisma/client": "6.19.0",
    "@sentry/nestjs": "^9.47.1",
    "@sentry/profiling-node": "^9.47.1",
    "axios": "^1.18.0",
    "bcrypt": "^6.0.0",
    "cache-manager": "^7.2.9",
    "cache-manager-redis-yet": "^5.1.5",
    "cheerio": "^1.2.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.15.1",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.4.2",
    "helmet": "^8.2.0",
    "ioredis": "^5.4.1",
    "joi": "^18.2.3",
    "nestjs-pino": "^4.6.1",
    "node-telegram-bot-api": "0.64.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "pino-http": "^11.0.0",
    "prom-client": "^15.1.3",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.18.0",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@types/bcrypt": "^6.0.0",
    "@types/cookie-parser": "^1.4.10",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^24.0.0",
    "@types/node-telegram-bot-api": "^0.64.15",
    "@types/passport-jwt": "^4.0.1",
    "@types/supertest": "^7.0.0",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^17.0.0",
    "jest": "^29.0.0",
    "jest-mock-extended": "^3.0.0",
    "pino-pretty": "^13.0.0",
    "prettier": "^3.4.2",
    "prisma": "6.19.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.20.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^src/(.*)$": "<rootDir>/$1"
    }
  },
  "prisma": {
    "schema": "prisma/schema.prisma"
  }
}

```

# FILE: apps/backend/prisma/migrations/0_init/migration.sql

```
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('BASE', 'FIRST_CONTACT', 'INTERESTED', 'PRE_APPROVAL', 'DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT', 'RE_SALE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MANAGER',
    "cityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "managerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "address" TEXT,
    "director" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "notes" TEXT,
    "childrenCount" INTEGER,
    "isHotClient" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crew" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "hostId" TEXT,
    "driverId" TEXT,
    "car" TEXT,
    "carPlate" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "crewId" TEXT,
    "project" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'BASE',
    "childrenPlanned" INTEGER,
    "childrenActual" INTEGER,
    "price" DOUBLE PRECISION,
    "received" DOUBLE PRECISION,
    "paymentMethod" TEXT,
    "address" TEXT,
    "contactPerson" TEXT,
    "contactPhone" TEXT,
    "equipment" TEXT,
    "nextContact" TIMESTAMP(3),
    "nextProject" TEXT,
    "responsibleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventReport" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "directorSatisfied" BOOLEAN,
    "teachersSatisfied" BOOLEAN,
    "hadIssues" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "announcementDone" BOOLEAN NOT NULL DEFAULT false,
    "materialShown" BOOLEAN NOT NULL DEFAULT false,
    "childrenCount" INTEGER NOT NULL DEFAULT 0,
    "classesCount" INTEGER NOT NULL DEFAULT 0,
    "privilegedCount" INTEGER NOT NULL DEFAULT 0,
    "showingsCount" INTEGER NOT NULL DEFAULT 0,
    "totalSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "schoolSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expenses" JSONB NOT NULL DEFAULT '[]',
    "remainderSum" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "EventReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "eventId" TEXT,
    "reportId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventHistory" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPreparation" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "assignCrew" TEXT NOT NULL DEFAULT 'Заплановано',
    "bookEquipment" TEXT NOT NULL DEFAULT 'Заплановано',
    "prepareDocs" TEXT NOT NULL DEFAULT 'Заплановано',
    "prepareMaterials" TEXT NOT NULL DEFAULT 'Заплановано',
    "remindSchool" TEXT NOT NULL DEFAULT 'Заплановано',

    CONSTRAINT "EventPreparation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventReport_eventId_key" ON "EventReport"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventPreparation_eventId_key" ON "EventPreparation"("eventId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventReport" ADD CONSTRAINT "EventReport_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "EventReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHistory" ADD CONSTRAINT "EventHistory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPreparation" ADD CONSTRAINT "EventPreparation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


```

# FILE: apps/backend/prisma/migrations/20260621171208_add_telegram_id/migration.sql

```
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegramId" TEXT;

```

# FILE: apps/backend/prisma/migrations/20260621174227_add_telegram_chat_id/migration.sql

```
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegramChatId" TEXT;

```

# FILE: apps/backend/prisma/migrations/20260621185332_add_school_contacts/migration.sql

```
-- CreateTable
CREATE TABLE "SchoolContact" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Львів',
    "schoolNumber" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolContact_pkey" PRIMARY KEY ("id")
);

```

# FILE: apps/backend/prisma/migrations/20260623140450_add_car_field/migration.sql

```
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "car" TEXT;

-- CreateTable
CREATE TABLE "IssueReport" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Планується',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IssueReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IssueReport_cityId_idx" ON "IssueReport"("cityId");

-- CreateIndex
CREATE INDEX "Event_cityId_idx" ON "Event"("cityId");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE INDEX "Event_schoolId_idx" ON "Event"("schoolId");

-- CreateIndex
CREATE INDEX "School_cityId_idx" ON "School"("cityId");

-- AddForeignKey
ALTER TABLE "IssueReport" ADD CONSTRAINT "IssueReport_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueReport" ADD CONSTRAINT "IssueReport_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260628223725_add_expense_salary_items/migration.sql

```
/*
  Warnings:

  - You are about to drop the column `expenses` on the `EventReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventReport" DROP COLUMN "expenses";

-- AlterTable
ALTER TABLE "IssueReport" ADD COLUMN     "assignedUserId" TEXT,
ADD COLUMN     "assignedUserName" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'blue',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseItem" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryItem" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "userId" TEXT,
    "userName" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalaryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE INDEX "ExpenseItem_reportId_idx" ON "ExpenseItem"("reportId");

-- CreateIndex
CREATE INDEX "SalaryItem_reportId_idx" ON "SalaryItem"("reportId");

-- CreateIndex
CREATE INDEX "SalaryItem_userId_idx" ON "SalaryItem"("userId");

-- AddForeignKey
ALTER TABLE "ExpenseItem" ADD CONSTRAINT "ExpenseItem_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "EventReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryItem" ADD CONSTRAINT "SalaryItem_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "EventReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryItem" ADD CONSTRAINT "SalaryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260701224321_balance_to_decimal/migration.sql

```
/*
  Warnings:

  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(12,2);

```

# FILE: apps/backend/prisma/migrations/20260701232948_add_missing_indexes/migration.sql

```
-- CreateIndex
CREATE INDEX "IssueReport_eventId_idx" ON "IssueReport"("eventId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_cityId_idx" ON "User"("cityId");

```

# FILE: apps/backend/prisma/migrations/20260701234519_user_role_enum/migration.sql

```
/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'MANAGER', 'DRIVER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'MANAGER';

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

```

# FILE: apps/backend/prisma/migrations/20260701234848_add_host_role/migration.sql

```
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'HOST';

```

# FILE: apps/backend/prisma/migrations/20260701235202_preparation_status_enum/migration.sql

```
/*
  Warnings:

  - The `assignCrew` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bookEquipment` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prepareDocs` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prepareMaterials` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `remindSchool` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PreparationStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "EventPreparation" DROP COLUMN "assignCrew",
ADD COLUMN     "assignCrew" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "bookEquipment",
ADD COLUMN     "bookEquipment" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "prepareDocs",
ADD COLUMN     "prepareDocs" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "prepareMaterials",
ADD COLUMN     "prepareMaterials" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "remindSchool",
ADD COLUMN     "remindSchool" "PreparationStatus" NOT NULL DEFAULT 'PLANNED';

```

# FILE: apps/backend/prisma/migrations/20260702123544_add_performance_indexes/migration.sql

```
-- CreateIndex
CREATE INDEX "Event_date_status_cityId_idx" ON "Event"("date", "status", "cityId");

-- CreateIndex
CREATE INDEX "EventHistory_eventId_createdAt_idx" ON "EventHistory"("eventId", "createdAt");

-- CreateIndex
CREATE INDEX "School_updatedAt_cityId_idx" ON "School"("updatedAt", "cityId");

```

# FILE: apps/backend/prisma/migrations/20260702175302_add_audit_log/migration.sql

```
-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT,
    "ip" TEXT,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "userName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT,
    "entityId" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_action_createdAt_idx" ON "AuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260703211958_event_school_id_date_index/migration.sql

```
-- CreateIndex
CREATE INDEX "Event_schoolId_date_idx" ON "Event"("schoolId", "date");

```

# FILE: apps/backend/prisma/migrations/20260704140802_add_day_off/migration.sql

```
-- CreateTable
CREATE TABLE "DayOff" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DayOff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DayOff_date_idx" ON "DayOff"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DayOff_userId_date_key" ON "DayOff"("userId", "date");

-- AddForeignKey
ALTER TABLE "DayOff" ADD CONSTRAINT "DayOff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/schema.prisma

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String         @id @default(uuid())
  name           String
  email          String         @unique
  phone          String?
  password       String
  role           UserRole       @default(MANAGER)
  cityId         String?
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
  telegramId     String?
  telegramChatId String?
  car            String?
  balance        Decimal        @default(0) @db.Decimal(12, 2)
  managedCities  City[]         @relation("CityManager")
  refreshTokens  RefreshToken[]
  crewAsDriver   Crew[]         @relation("DriverCrew")
  crewAsHost     Crew[]         @relation("HostCrew")
  city           City?          @relation(fields: [cityId], references: [id])
  salaryItems    SalaryItem[]
  daysOff        DayOff[]

  @@index([role])
  @@index([cityId])
}

model DayOff {
  id        String   @id @default(uuid())
  userId    String
  date      DateTime @db.Date
  createdBy String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, date])
  @@index([date])
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
  @@index([updatedAt, cityId])
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
  @@index([schoolId, date])
  @@index([date, status, cityId])
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

  @@index([eventId, createdAt])
}

model EventPreparation {
  id               String            @id @default(uuid())
  eventId          String            @unique
  assignCrew       PreparationStatus @default(PLANNED)
  bookEquipment    PreparationStatus @default(PLANNED)
  prepareDocs      PreparationStatus @default(PLANNED)
  prepareMaterials PreparationStatus @default(PLANNED)
  remindSchool     PreparationStatus @default(PLANNED)
  event            Event             @relation(fields: [eventId], references: [id])
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
  @@index([eventId])
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
  category  String
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
  role      String?
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
  user   User?       @relation(fields: [userId], references: [id])

  @@index([reportId])
  @@index([userId])
}

model RefreshToken {
  id        String    @id @default(uuid())
  userId    String
  tokenHash String    @unique
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())
  userAgent String?
  ip        String?
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model AuditLog {
  id        String   @id @default(uuid())
  userId    String?
  userName  String?
  action    String
  entity    String?
  entityId  String?
  ip        String?
  userAgent String?
  metadata  Json?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action, createdAt])
  @@index([entity, entityId])
}

enum UserRole {
  SUPERADMIN
  MANAGER
  HOST
  DRIVER
}

enum PreparationStatus {
  PLANNED
  IN_PROGRESS
  DONE
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

# FILE: apps/backend/prisma/seed-admin.js

```
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    console.error(
      'Помилка: SEED_ADMIN_EMAIL та SEED_ADMIN_PASSWORD мають бути задані в .env',
    );
    process.exit(1);
  }

  if (!emailPattern.test(email)) {
    console.error(`Помилка: SEED_ADMIN_EMAIL "${email}" не є валідним email`);
    process.exit(1);
  }

  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ALLOW_PROD_SEED !== 'true'
  ) {
    console.error(
      'Сідування в production заблоковано. Встановіть ALLOW_PROD_SEED=true для підтвердження.',
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Починаю створення адміна...');

  const admin = await prisma.user.upsert({
    where: { email: email },
    update: { password: hashedPassword },
    create: {
      name: 'Адміністратор',
      email: email,
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });

  console.log('Адмін успішно створений або оновлений:', admin.email);
}

main()
  .catch((e) => {
    console.error('Помилка під час сідування:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

# FILE: apps/backend/prisma/seed-demo.js

```
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const DEMO_CITY_NAME = 'Демо Місто';

async function cleanupDemoData() {
  const existingCity = await prisma.city.findFirst({
    where: { name: DEMO_CITY_NAME },
  });
  if (!existingCity) return;

  console.log('Знайдено попередні demo-дані, очищую...');
  const events = await prisma.event.findMany({
    where: { cityId: existingCity.id },
    select: { id: true },
  });
  const eventIds = events.map((e) => e.id);

  await prisma.eventHistory.deleteMany({
    where: { eventId: { in: eventIds } },
  });
  await prisma.eventPreparation.deleteMany({
    where: { eventId: { in: eventIds } },
  });
  await prisma.issueReport.deleteMany({ where: { eventId: { in: eventIds } } });
  await prisma.file.deleteMany({ where: { eventId: { in: eventIds } } });
  await prisma.eventReport.deleteMany({ where: { eventId: { in: eventIds } } });
  await prisma.event.deleteMany({ where: { cityId: existingCity.id } });
  await prisma.crew.deleteMany({ where: { cityId: existingCity.id } });
  await prisma.school.deleteMany({ where: { cityId: existingCity.id } });

  const demoUsers = await prisma.user.findMany({
    where: { cityId: existingCity.id },
    select: { id: true },
  });
  await prisma.user.deleteMany({
    where: { id: { in: demoUsers.map((u) => u.id) } },
  });

  await prisma.city.delete({ where: { id: existingCity.id } });
  console.log('Очищено.');
}

async function main() {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ALLOW_PROD_SEED !== 'true'
  ) {
    console.error(
      'Demo-seed в production заблоковано. Встановіть ALLOW_PROD_SEED=true для підтвердження.',
    );
    process.exit(1);
  }

  await cleanupDemoData();

  console.log('Створюю demo-місто...');
  const city = await prisma.city.create({ data: { name: DEMO_CITY_NAME } });

  const demoPassword = await bcrypt.hash('Demo!Pass123', 10);

  const manager = await prisma.user.create({
    data: {
      name: 'Марія Демчук',
      email: 'demo.manager@svitlo-znan.app',
      password: demoPassword,
      role: 'MANAGER',
      cityId: city.id,
      phone: '+380671112233',
    },
  });

  const loadTestUsers = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.user.create({
        data: {
          name: `Load Test User ${i + 1}`,
          email: `loadtest${i + 1}@svitlo-znan.app`,
          password: demoPassword,
          role: 'MANAGER',
          cityId: city.id,
        },
      }),
    ),
  );

  const host = await prisma.user.create({
    data: {
      name: 'Олег Ведучий',
      email: 'demo.host@svitlo-znan.app',
      password: demoPassword,
      role: 'HOST',
      cityId: city.id,
      phone: '+380671112234',
    },
  });

  const driver = await prisma.user.create({
    data: {
      name: 'Ігор Водій',
      email: 'demo.driver@svitlo-znan.app',
      password: demoPassword,
      role: 'DRIVER',
      cityId: city.id,
      phone: '+380671112235',
      car: 'Volkswagen Transporter',
    },
  });

  await prisma.city.update({
    where: { id: city.id },
    data: { managerId: manager.id },
  });

  console.log('Створюю школи...');
  const schools = await Promise.all([
    prisma.school.create({
      data: {
        name: 'Ліцей №5',
        type: 'school',
        cityId: city.id,
        address: 'вул. Шевченка, 10',
        director: 'Наталія Іванівна',
        phone: '+380321234567',
        email: 'lyceum5@example.com',
        childrenCount: 320,
        isHotClient: true,
        rating: 4.8,
      },
    }),
    prisma.school.create({
      data: {
        name: 'Дитячий садок «Сонечко»',
        type: 'kindergarten',
        cityId: city.id,
        address: 'вул. Франка, 22',
        director: 'Оксана Петрівна',
        phone: '+380321234568',
        childrenCount: 90,
        rating: 4.5,
      },
    }),
    prisma.school.create({
      data: {
        name: "Гімназія «Львів'янка»",
        type: 'school',
        cityId: city.id,
        address: 'вул. Городоцька, 5',
        director: 'Андрій Богданович',
        phone: '+380321234569',
        childrenCount: 210,
      },
    }),
  ]);

  console.log('Створюю екіпаж...');
  const crew = await prisma.crew.create({
    data: {
      name: 'Екіпаж №1',
      cityId: city.id,
      hostId: host.id,
      driverId: driver.id,
      car: 'Volkswagen Transporter',
      carPlate: 'BC1234AA',
      phone: '+380671112235',
    },
  });

  const project = await prisma.project.upsert({
    where: { name: 'Голографічне шоу «Космос»' },
    update: {},
    create: { name: 'Голографічне шоу «Космос»', color: 'blue' },
  });

  console.log('Створюю події на різних стадіях pipeline...');

  await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[0].id,
      project: project.name,
      date: new Date(Date.now() + 20 * 86400000),
      status: 'FIRST_CONTACT',
      childrenPlanned: 120,
      contactPerson: 'Наталія Іванівна',
      contactPhone: '+380321234567',
    },
  });

  await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[1].id,
      project: project.name,
      date: new Date(Date.now() + 10 * 86400000),
      status: 'DATE_CONFIRMED',
      crewId: crew.id,
      childrenPlanned: 60,
      price: 8000,
      contactPerson: 'Оксана Петрівна',
      contactPhone: '+380321234568',
    },
  });

  const preparingEvent = await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[2].id,
      project: project.name,
      date: new Date(Date.now() + 5 * 86400000),
      status: 'PREPARATION',
      crewId: crew.id,
      childrenPlanned: 150,
      price: 15000,
      responsibleId: manager.id,
    },
  });
  await prisma.eventPreparation.create({
    data: {
      eventId: preparingEvent.id,
      assignCrew: 'DONE',
      bookEquipment: 'DONE',
      prepareMaterials: 'IN_PROGRESS',
    },
  });

  const completedEvent = await prisma.event.create({
    data: {
      cityId: city.id,
      schoolId: schools[0].id,
      project: project.name,
      date: new Date(Date.now() - 15 * 86400000),
      status: 'REPORT',
      crewId: crew.id,
      childrenPlanned: 100,
      childrenActual: 98,
      price: 12000,
      received: 12000,
    },
  });
  await prisma.eventReport.create({
    data: {
      eventId: completedEvent.id,
      directorSatisfied: true,
      teachersSatisfied: true,
      rating: 5,
      childrenCount: 98,
      classesCount: 5,
      totalSum: 12000,
      schoolSum: 12000,
      remainderSum: 0,
      expenseItems: {
        create: [{ category: 'Пальне', name: 'Заправка авто', amount: 800 }],
      },
      salaryItems: {
        create: [
          { userId: host.id, userName: host.name, amount: 2500, role: 'HOST' },
          {
            userId: driver.id,
            userName: driver.name,
            amount: 1500,
            role: 'DRIVER',
          },
        ],
      },
    },
  });

  await prisma.eventHistory.create({
    data: {
      eventId: completedEvent.id,
      action: 'Подію завершено',
      comment: 'Захід пройшов успішно, школа задоволена',
      userId: manager.id,
      userName: manager.name,
      role: 'MANAGER',
    },
  });

  console.log('\n✅ Demo-дані створено!');
  console.log(`Місто: ${DEMO_CITY_NAME}`);
  console.log(`Менеджер: ${manager.email} / Demo!Pass123`);
  console.log(`Ведучий: ${host.email} / Demo!Pass123`);
  console.log(`Водій: ${driver.email} / Demo!Pass123`);
}

main()
  .catch((e) => {
    console.error('Помилка під час demo-seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

# FILE: apps/backend/README.md

```
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

```

# FILE: apps/backend/src/app.controller.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

```

# FILE: apps/backend/src/app.controller.ts

```
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

```

# FILE: apps/backend/src/app.module.ts

```
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { SanitizeInterceptor } from './common/interceptors/sanitize.interceptor';
import { CsrfGuard } from './auth/csrf.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import Redis from 'ioredis';
import { UserThrottlerGuard } from './common/guards/user-throttler.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './common/logger/logger.module';
import { RedisCacheModule } from './common/cache/redis-cache.module';
import { envValidationSchema } from './config/env.validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { CitiesModule } from './cities/cities.module';
import { SchoolsModule } from './schools/schools.module';
import { FinanceModule } from './finance/finance.module';
import { TelegramModule } from './telegram/telegram.module';
import { IssuesModule } from './issues/issues.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectsModule } from './projects/projects.module';
import { HealthModule } from './health/health.module';
import { DaysOffModule } from './days-off/days-off.module';
import { MetricsModule } from './metrics/metrics.module';
import { FeatureFlagsModule } from './common/feature-flags/feature-flags.module';
import { I18nModule } from './common/i18n/i18n.module';
import { LocalizedValidationPipe } from './common/pipes/localized-validation.pipe';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
@Module({
  imports: [
    HealthModule,
    MetricsModule,
    FeatureFlagsModule,
    I18nModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    LoggerModule,
    RedisCacheModule,
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [{ name: 'default', ttl: 60000, limit: 100 }],
        storage: new ThrottlerStorageRedisService(
          new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
            maxRetriesPerRequest: 1,
            connectTimeout: 3000,
            retryStrategy: (times) =>
              times > 3 ? null : Math.min(times * 200, 2000),
          }),
        ),
      }),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    EventsModule,
    CitiesModule,
    SchoolsModule,
    FinanceModule,
    TelegramModule,
    IssuesModule,
    DashboardModule,
    ProjectsModule,
    DaysOffModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AllExceptionsFilter,
    {
      provide: APP_PIPE,
      useClass: LocalizedValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: UserThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CsrfGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SanitizeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}

```

# FILE: apps/backend/src/app.service.ts

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```

# FILE: apps/backend/src/auth/auth.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: { login: jest.fn() } }],
    }).compile();
    expect(module.get(AuthController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/auth/auth.controller.ts

```
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
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

const isProd = process.env.NODE_ENV === 'production';

const cookieDomain = isProd ? '.svitlo-znan.app' : undefined;

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
    domain: cookieDomain,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    domain: cookieDomain,
    path: '/auth',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.cookie('csrf_token', csrfToken, {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    domain: cookieDomain,
    maxAge: 24 * 60 * 60 * 1000,
  });
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Увійти в систему' })
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

  @ApiOperation({ summary: 'Оновити access token' })
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

  @ApiOperation({ summary: 'Отримати дані поточного користувача' })
  @ApiCookieAuth('access_token')
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    const payload = req['user'] as {
      sub: string;
      email: string;
      role: string;
      name: string;
      cityId?: string;
      cityName?: string;
    };
    return {
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        cityId: payload.cityId ?? null,
        cityName: payload.cityName ?? null,
      },
    };
  }

  @ApiOperation({ summary: 'Вийти з системи' })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) await this.authService.revokeRefreshToken(refreshToken);

    res.clearCookie('access_token', { domain: cookieDomain });
    res.clearCookie('refresh_token', { path: '/auth', domain: cookieDomain });
    res.clearCookie('csrf_token', { domain: cookieDomain });
    return { message: 'ok' };
  }
}

```

# FILE: apps/backend/src/auth/auth.guard.ts

```
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Токен не знайдено');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Недійсний токен');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (request.cookies?.access_token) return request.cookies.access_token;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined; // тимчасовий fallback на перехідний період
  }
}

```

# FILE: apps/backend/src/auth/auth.module.ts

```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

```

# FILE: apps/backend/src/auth/auth.service.spec.ts

```
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { findByEmail: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();
    expect(module.get(AuthService)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/auth/auth.service.ts

```
import { Injectable, HttpStatus } from '@nestjs/common';
import { AppException } from '../common/exceptions/app.exception';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'crypto';

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async issueRefreshToken(
    userId: string,
    meta: { ip?: string; userAgent?: string },
  ): Promise<string> {
    const token = randomBytes(64).toString('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashToken(token),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        ip: meta.ip,
        userAgent: meta.userAgent,
      },
    });
    return token;
  }

  private readonly dummyHash =
    '$2b$10$CwTycUXWue0Thq9StjUM0uJ8lm7zqBWkD3hAvQi.jGjPUB0.wERYS';

  async login(
    email: string,
    pass: string,
    meta: { ip?: string; userAgent?: string } = {},
  ) {
    const user = await this.usersService.findByEmailWithCity(email);

    const isPasswordValid = await bcrypt.compare(
      pass,
      user?.password ?? this.dummyHash,
    );

    if (!user || !isPasswordValid) {
      throw new AppException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      cityId: user.cityId,
      cityName: user.city?.name,
    };

    const refresh_token = await this.issueRefreshToken(user.id, meta);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        cityId: user.cityId,
        cityName: user.city?.name,
      },
    };
  }

  async refresh(
    oldToken: string,
    meta: { ip?: string; userAgent?: string } = {},
  ) {
    const tokenHash = this.hashToken(oldToken);
    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: { include: { city: true } } },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new AppException('INVALID_REFRESH_TOKEN', HttpStatus.UNAUTHORIZED);
    }

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    const payload = {
      sub: stored.user.id,
      email: stored.user.email,
      role: stored.user.role,
      name: stored.user.name,
      cityId: stored.user.cityId,
      cityName: stored.user.city?.name,
    };

    const refresh_token = await this.issueRefreshToken(stored.user.id, meta);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token,
      user: {
        id: stored.user.id,
        name: stored.user.name,
        email: stored.user.email,
        role: stored.user.role,
        cityId: stored.user.cityId,
        cityName: stored.user.city?.name,
      },
    };
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken
      .update({
        where: { tokenHash: this.hashToken(token) },
        data: { revokedAt: new Date() },
      })
      .catch(() => undefined);
  }
}

```

# FILE: apps/backend/src/auth/csrf.guard.ts

```
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly exemptPaths = ['/auth/login'];

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
    if (this.exemptPaths.includes(req.path)) return true;

    const cookieToken = req.cookies?.csrf_token;
    const headerToken = req.headers['x-csrf-token'];
    console.log('CSRF DEBUG', {
      path: req.path,
      cookieToken,
      headerToken,
      allCookies: Object.keys(req.cookies || {}),
    });
    if (!cookieToken || cookieToken !== headerToken) {
      throw new ForbiddenException('CSRF token invalid');
    }
    return true;
  }
}

```

# FILE: apps/backend/src/auth/decorators/check-ownership.decorator.ts

```
import { SetMetadata } from '@nestjs/common';

export type OwnedResourceType = 'school' | 'event' | 'city' | 'crew';

export const OWNERSHIP_KEY = 'ownershipResourceType';
export const CheckOwnership = (resourceType: OwnedResourceType) =>
  SetMetadata(OWNERSHIP_KEY, resourceType);

```

# FILE: apps/backend/src/auth/decorators/current-user.decorator.ts

```
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../interfaces/jwt-user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

```

# FILE: apps/backend/src/auth/decorators/roles.decorator.ts

```
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

```

# FILE: apps/backend/src/auth/dto/login.dto.ts

```
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@svitlo-znan.app' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

```

# FILE: apps/backend/src/auth/guards/ownership.guard.ts

```
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import {
  OWNERSHIP_KEY,
  OwnedResourceType,
} from '../decorators/check-ownership.decorator';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resourceType = this.reflector.getAllAndOverride<OwnedResourceType>(
      OWNERSHIP_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!resourceType) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // SUPERADMIN бачить усе — перевірка не потрібна
    if (user?.role === 'SUPERADMIN') return true;

    const paramId: string | undefined =
      request.params.id ??
      request.params.schoolId ??
      request.params.eventId ??
      request.params.crewId;
    if (!paramId) return true;

    if (user?.role === 'HOST' || user?.role === 'DRIVER') {
      if (resourceType !== 'event') {
        throw new ForbiddenException('Немає доступу до цього типу ресурсу');
      }
      const event = await this.prisma.event.findUnique({
        where: { id: paramId },
        select: { crew: { select: { hostId: true, driverId: true } } },
      });
      if (!event) throw new NotFoundException('Подію не знайдено');
      const isAssigned =
        event.crew?.hostId === user.sub || event.crew?.driverId === user.sub;
      if (!isAssigned) {
        throw new ForbiddenException('Немає доступу до цієї події');
      }
      return true;
    }

    if (user?.role !== 'MANAGER') {
      throw new ForbiddenException('Немає доступу до ресурсу');
    }

    const manager = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    if (!manager?.cityId) {
      throw new ForbiddenException('Менеджер не прив’язаний до міста');
    }

    let resourceCityId: string | null | undefined;

    switch (resourceType) {
      case 'school': {
        const school = await this.prisma.school.findUnique({
          where: { id: paramId },
          select: { cityId: true },
        });
        if (!school) throw new NotFoundException('Заклад не знайдено');
        resourceCityId = school.cityId;
        break;
      }
      case 'event': {
        const event = await this.prisma.event.findUnique({
          where: { id: paramId },
          select: { cityId: true },
        });
        if (!event) throw new NotFoundException('Подію не знайдено');
        resourceCityId = event.cityId;
        break;
      }
      case 'crew': {
        const crew = await this.prisma.crew.findUnique({
          where: { id: paramId },
          select: { cityId: true },
        });
        if (!crew) throw new NotFoundException('Екіпаж не знайдено');
        resourceCityId = crew.cityId;
        break;
      }
      case 'city': {
        resourceCityId = paramId; // сам :id і є cityId
        break;
      }
    }

    if (resourceCityId !== manager.cityId) {
      throw new ForbiddenException('Немає доступу до ресурсу іншого міста');
    }
    return true;
  }
}

```

# FILE: apps/backend/src/auth/guards/roles.guard.ts

```
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (user?.role === UserRole.SUPERADMIN) {
      return true;
    }
    if (!requiredRoles.includes(user?.role)) {
      throw new ForbiddenException('Недостатньо прав');
    }
    return true;
  }
}

```

# FILE: apps/backend/src/auth/interfaces/jwt-user.interface.ts

```
import { UserRole } from '@prisma/client';

export interface JwtUser {
  sub: string;
  name: string;
  role: UserRole;
  cityId?: string | null;
}

```

# FILE: apps/backend/src/cities/cities.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('CitiesController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        { provide: CitiesService, useValue: {} },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
        { provide: AuthGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();
    expect(module.get(CitiesController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/cities/cities.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCityDto } from './dto/create-city.dto';
import { CreateCrewDto } from './dto/create-crew.dto';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';

@ApiTags('Cities')
@ApiCookieAuth('access_token')
@Controller('cities')
@UseGuards(AuthGuard, RolesGuard)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Створити місто' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateCityDto) {
    return this.citiesService.create(body.name);
  }

  @ApiOperation({ summary: 'Список міст зі статистикою' })
  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @ApiOperation({ summary: 'Отримати місто за ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Список екіпажів міста' })
  @Get(':id/crews')
  findCrews(@Param('id') id: string) {
    return this.citiesService.findCrews(id);
  }

  @ApiOperation({ summary: 'Створити екіпаж у місті' })
  @Post(':id/crews')
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('city')
  createCrew(@Param('id') id: string, @Body() body: CreateCrewDto) {
    return this.citiesService.createCrew(id, body);
  }

  @ApiOperation({ summary: 'Видалити екіпаж' })
  @Delete('crews/:crewId')
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('crew')
  deleteCrew(@Param('crewId') crewId: string) {
    return this.citiesService.deleteCrew(crewId);
  }
}

```

# FILE: apps/backend/src/cities/cities.module.ts

```
import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {}

```

# FILE: apps/backend/src/cities/cities.service.spec.ts

```
import { Test } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CitiesService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        CitiesService,
        { provide: PrismaService, useValue: { city: { findMany: jest.fn() } } },
      ],
    }).compile();
    expect(module.get(CitiesService)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/cities/cities.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string) {
    return this.prisma.city.create({
      data: { name },
    });
  }

  async findAll() {
    const [cities, eventsStats] = await Promise.all([
      this.prisma.city.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          users: {
            where: { role: 'MANAGER' },
            select: { id: true, name: true, phone: true },
            take: 1,
          },
          _count: { select: { schools: true } },
        },
      }),
      this.prisma.event.groupBy({
        by: ['cityId', 'status'],
        _count: { _all: true },
      }),
    ]);

    return cities.map((city) => {
      const cityStats = eventsStats.filter((stat) => stat.cityId === city.id);

      const completedEvents = cityStats
        .filter((s) => s.status === 'RE_SALE')
        .reduce((sum, s) => sum + s._count._all, 0);

      const plannedEvents = cityStats
        .filter((s) => s.status !== 'RE_SALE')
        .reduce((sum, s) => sum + s._count._all, 0);

      return {
        ...city,
        manager: city.users[0] || null,
        plannedEvents,
        completedEvents,
        schoolsCount: city._count.schools,
      };
    });
  }
  async createCrew(
    cityId: string,
    data: { name: string; hostId?: string; driverId?: string },
  ) {
    const driver = data.driverId
      ? await this.prisma.user.findUnique({ where: { id: data.driverId } })
      : null;
    return this.prisma.crew.create({
      data: {
        cityId,
        name: data.name,
        hostId: data.hostId ?? null,
        driverId: data.driverId ?? null,
        car: driver?.car || null,
        phone: driver?.phone || null,
      },
      include: { host: true, driver: true },
    });
  }

  async deleteCrew(id: string) {
    await this.prisma.event.updateMany({
      where: { crewId: id },
      data: { crewId: null },
    });
    return this.prisma.crew.delete({ where: { id } });
  }

  async findCrews(cityId: string) {
    return this.prisma.crew.findMany({
      where: { cityId },
      include: {
        host: { select: { id: true, name: true } },
        driver: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        users: {
          where: { role: 'MANAGER' },
          select: { id: true, name: true, phone: true },
          take: 1,
        },
        events: {
          where: { status: 'RE_SALE' },
          include: {
            school: { select: { id: true, name: true, type: true } },
            report: true,
            history: { orderBy: { createdAt: 'asc' } },
          },
          orderBy: { date: 'desc' },
        },
        crews: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!city) return null;

    return {
      ...city,
      manager: city.users[0] || null,
    };
  }
}

```

# FILE: apps/backend/src/cities/dto/create-city.dto.ts

```
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Львів' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

```

# FILE: apps/backend/src/cities/dto/create-crew.dto.ts

```
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCrewDto {
  @ApiProperty({ example: 'Екіпаж №1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  hostId?: string;

  @ApiPropertyOptional({ example: 'f9e8d7c6-...' })
  @IsOptional()
  @IsString()
  driverId?: string;
}

```

# FILE: apps/backend/src/common/cache/redis-cache.module.ts

```
import { Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

const logger = new Logger('RedisCacheModule');

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        try {
          const store = await redisStore({
            url: process.env.REDIS_URL ?? 'redis://localhost:6379',
            ttl: 60_000,
            socket: {
              reconnectStrategy: (retries) => Math.min(retries * 200, 5000),
            },
          });
          store.client.on('error', (err: Error) =>
            logger.warn(`Redis error: ${err.message}`),
          );
          return { store };
        } catch (err) {
          logger.warn(
            `Redis unavailable at boot, falling back to in-memory cache: ${(err as Error).message}`,
          );
          return {};
        }
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}

```

# FILE: apps/backend/src/common/dto/page-meta.dto.ts

```
export class PageMetaDto {
  totalItems: number;
  page: number;
  take: number;
  pageCount: number;
  hasNextPage: boolean;

  constructor(totalItems: number, page: number, take: number) {
    this.totalItems = totalItems;
    this.page = page;
    this.take = take;
    this.pageCount = Math.ceil(totalItems / take);
    this.hasNextPage = page < this.pageCount;
  }
}

```

# FILE: apps/backend/src/common/dto/page-options.dto.ts

```
import { Type } from 'class-transformer';
import { IsInt, Max, Min, IsOptional } from 'class-validator';

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

```

# FILE: apps/backend/src/common/exceptions/app.exception.ts

```
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageKey } from '../i18n/messages';

export class AppException extends HttpException {
  constructor(
    public readonly messageKey: MessageKey,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(messageKey, status);
  }
}

```

# FILE: apps/backend/src/common/feature-flags/feature-flags.module.ts

```
import { Global, Module } from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';

@Global()
@Module({
  providers: [FeatureFlagsService],
  exports: [FeatureFlagsService],
})
export class FeatureFlagsModule {}

```

# FILE: apps/backend/src/common/feature-flags/feature-flags.service.ts

```
import { Injectable } from '@nestjs/common';

export type FeatureFlag =
  | 'TELEGRAM_NOTIFICATIONS'
  | 'AUTO_SCHOOL_IMPORT'
  | 'FINANCE_MODULE'
  | 'DASHBOARD_FORECASTING';

const DEFAULT_FLAGS: Record<FeatureFlag, boolean> = {
  TELEGRAM_NOTIFICATIONS: true,
  AUTO_SCHOOL_IMPORT: true,
  FINANCE_MODULE: true,
  DASHBOARD_FORECASTING: false,
};

@Injectable()
export class FeatureFlagsService {
  private flags: Record<FeatureFlag, boolean>;

  constructor() {
    this.flags = { ...DEFAULT_FLAGS };
    for (const key of Object.keys(DEFAULT_FLAGS) as FeatureFlag[]) {
      const envVal = process.env[`FEATURE_${key}`];
      if (envVal !== undefined) this.flags[key] = envVal === 'true';
    }
  }

  isEnabled(flag: FeatureFlag): boolean {
    return this.flags[flag];
  }

  getAll(): Record<FeatureFlag, boolean> {
    return { ...this.flags };
  }
}

```

# FILE: apps/backend/src/common/filters/all-exceptions.filter.ts

```
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/nestjs';
import { I18nService } from '../i18n/i18n.service';
import { AppException } from '../exceptions/app.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly i18n: I18nService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = this.i18n.detectLang(request.headers['accept-language']);

    const isHttp = exception instanceof HttpException;
    const statusCode = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: unknown;
    if (exception instanceof AppException) {
      message = this.i18n.translate(exception.messageKey, lang);
    } else if (isHttp) {
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as any)?.message ?? exception.message);
    } else {
      message = this.i18n.translate('INTERNAL_ERROR', lang);
    }

    const exceptionResponse =
      isHttp && !(exception instanceof AppException)
        ? exception.getResponse()
        : null;

    const details =
      isHttp && typeof exceptionResponse === 'object'
        ? ((exceptionResponse as any)?.error ?? undefined)
        : undefined;

    if (!isHttp) {
      this.logger.error(
        exception instanceof Error ? exception.stack : exception,
      );
      Sentry.captureException(exception);
    } else if (statusCode >= 500) {
      Sentry.captureException(exception);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: (request as any).id,
      ...(details ? { details } : {}),
    });
  }
}

```

# FILE: apps/backend/src/common/guards/user-throttler.guard.ts

```
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(UserThrottlerGuard.name);
  private lastWarnAt = 0;

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const token = req.cookies?.access_token;
    if (token) {
      try {
        const payload = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64url').toString('utf8'),
        ) as { sub?: string };
        if (payload?.sub) return `user-${payload.sub}`;
      } catch {
        return req.ip;
      }
    }
    return req.ip;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await super.canActivate(context);
    } catch (e) {
      const now = Date.now();
      if (now - this.lastWarnAt > 10_000) {
        this.logger.warn(
          `Throttler storage unavailable, allowing request: ${e.message}`,
        );
        this.lastWarnAt = now;
      }
      return true;
    }
  }
}

```

# FILE: apps/backend/src/common/i18n/i18n.module.ts

```
import { Global, Module } from '@nestjs/common';
import { I18nService } from './i18n.service';

@Global()
@Module({
  providers: [I18nService],
  exports: [I18nService],
})
export class I18nModule {}

```

# FILE: apps/backend/src/common/i18n/i18n.service.ts

```
import { Injectable } from '@nestjs/common';
import { MESSAGES, MessageKey } from './messages';

export type Lang = 'uk' | 'en';

@Injectable()
export class I18nService {
  translate(key: MessageKey, lang: Lang = 'uk'): string {
    return MESSAGES[key]?.[lang] ?? MESSAGES[key]?.uk ?? key;
  }

  detectLang(acceptLanguage?: string): Lang {
    if (acceptLanguage?.toLowerCase().startsWith('en')) return 'en';
    return 'uk';
  }
}

```

# FILE: apps/backend/src/common/i18n/messages.ts

```
export const MESSAGES = {
  EVENT_NOT_FOUND: { uk: 'Подію не знайдено', en: 'Event not found' },
  SCHOOL_NOT_FOUND: { uk: 'Школу не знайдено', en: 'School not found' },
  CITY_NOT_FOUND: { uk: 'Місто не знайдено', en: 'City not found' },
  INVALID_CREDENTIALS: {
    uk: 'Невірний email або пароль',
    en: 'Invalid email or password',
  },
  INVALID_REFRESH_TOKEN: {
    uk: 'Недійсний refresh token',
    en: 'Invalid refresh token',
  },
  INTERNAL_ERROR: {
    uk: 'Внутрішня помилка сервера',
    en: 'Internal server error',
  },
  SERVICE_UNAVAILABLE: {
    uk: 'Сервіс тимчасово недоступний',
    en: 'Service temporarily unavailable',
  },
  // --- ДОДАЙ ЦІ РЯДКИ ---
  USER_ID_REQUIRED: {
    uk: 'Ідентифікатор користувача обов’язковий',
    en: 'User ID is required',
  },
  INVALID_STAFF_USER: {
    uk: 'Невалідний користувач персоналу',
    en: 'Invalid staff user',
  },
  DAY_OFF_NOT_FOUND: {
    uk: 'Вихідний день не знайдено',
    en: 'Day off not found',
  },
} as const;

export type MessageKey = keyof typeof MESSAGES;

```

# FILE: apps/backend/src/common/interceptors/audit-log.interceptor.ts

```
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

const MUTATING_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);
const EXCLUDED_PATHS = ['/auth/login', '/auth/refresh', '/auth/logout'];

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AuditLog');

  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (
      !MUTATING_METHODS.has(req.method) ||
      EXCLUDED_PATHS.some((p) => req.path.startsWith(p))
    ) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(() => {
        const user = req.user as { sub?: string; name?: string } | undefined;
        const [, entity, entityId] = req.path.split('/');
        const cleanEntityId =
          entityId && !entityId.includes('?') ? entityId : undefined;

        this.prisma.auditLog
          .create({
            data: {
              userId: user?.sub,
              userName: user?.name,
              action: `${req.method} ${entity ?? req.path}`,
              entity: entity || undefined,
              entityId: cleanEntityId,
              ip: req.ip,
              userAgent: req.headers['user-agent'],
            },
          })
          .catch((err: Error) =>
            this.logger.warn(`Не вдалось записати audit log: ${err.message}`),
          );
      }),
    );
  }
}

```

# FILE: apps/backend/src/common/interceptors/sanitize.interceptor.ts

```
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
      .trim();
  }
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value))
      result[key] = sanitizeValue(val);
    return result;
  }
  return value;
}

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    if (req.body) req.body = sanitizeValue(req.body);
    return next.handle();
  }
}

```

# FILE: apps/backend/src/common/logger/logger.module.ts

```
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req, res) => {
          const existing = req.headers['x-request-id'] as string | undefined;
          const id = existing ?? randomUUID();
          res.setHeader('x-request-id', id);
          return id;
        },
        customProps: (req) => ({
          userId: (req as any).user?.sub ?? (req as any).user?.id ?? null,
        }),
        serializers: {
          req: (req) => ({ method: req.method, url: req.url }),
        },
        autoLogging: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}

```

# FILE: apps/backend/src/common/pipes/localized-validation.pipe.ts

```
import {
  Inject,
  Injectable,
  Scope,
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { I18nService, Lang } from '../i18n/i18n.service';

const CONSTRAINT_LABELS: Record<string, { uk: string; en: string }> = {
  isNotEmpty: { uk: "Поле обов'язкове", en: 'This field is required' },
  isString: { uk: 'Має бути текстом', en: 'Must be a string' },
  isNumber: { uk: 'Має бути числом', en: 'Must be a number' },
  isEmail: { uk: 'Некоректний email', en: 'Invalid email' },
  isBoolean: { uk: 'Має бути true/false', en: 'Must be true/false' },
  isDateString: { uk: 'Некоректна дата', en: 'Invalid date' },
  min: { uk: 'Значення занадто мале', en: 'Value is too small' },
  max: { uk: 'Значення занадто велике', en: 'Value is too large' },
  minLength: { uk: 'Занадто короткий текст', en: 'Text is too short' },
  maxLength: { uk: 'Занадто довгий текст', en: 'Text is too long' },
  whitelistValidation: {
    uk: 'Зайве поле у запиті',
    en: 'Unexpected field in request',
  },
};

@Injectable({ scope: Scope.REQUEST })
export class LocalizedValidationPipe extends ValidationPipe {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly i18n: I18nService,
  ) {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const lang: Lang = this.i18n.detectLang(
          this.request?.headers?.['accept-language'],
        );
        const message = errors.flatMap((err) => this.formatError(err, lang));
        return new BadRequestException({
          statusCode: 400,
          error: lang === 'en' ? 'Validation failed' : 'Помилка валідації',
          message,
        });
      },
    });
  }

  private formatError(error: ValidationError, lang: Lang): string[] {
    const messages: string[] = [];
    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        const label = CONSTRAINT_LABELS[key];
        const text = label ? label[lang] : error.constraints[key];
        messages.push(`${error.property}: ${text}`);
      }
    }
    if (error.children?.length) {
      for (const child of error.children) {
        messages.push(...this.formatError(child, lang));
      }
    }
    return messages;
  }
}

```

# FILE: apps/backend/src/config/env.validation.ts

```
import * as Joi from 'joi';

const stripQuotes = (value: string) =>
  typeof value === 'string' ? value.replace(/^["']|["']$/g, '') : value;

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  DIRECT_URL: Joi.string().uri().optional(),
  FRONTEND_URL: Joi.string().required(),
  TELEGRAM_BOT_TOKEN: Joi.string().required(),
  REDIS_URL: Joi.string().uri().default('redis://localhost:6379'),
  JWT_SECRET: Joi.string()
    .min(32)
    .when('NODE_ENV', {
      is: 'test',
      then: Joi.optional().default('test-only-secret-do-not-use-elsewhere'),
      otherwise: Joi.required(),
    }),
  SEED_ADMIN_EMAIL: Joi.string()
    .allow('')
    .optional()
    .custom((value) => stripQuotes(value)),
  SEED_ADMIN_PASSWORD: Joi.string()
    .allow('')
    .optional()
    .custom((value) => stripQuotes(value)),
});

```

# FILE: apps/backend/src/dashboard/dashboard.controller.ts

```
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

class DashboardSummaryQueryDto {
  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  cityId?: string;
}

@ApiTags('Dashboard')
@ApiCookieAuth('access_token')
@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Загальна аналітика для дашборда' })
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

# FILE: apps/backend/src/dashboard/dashboard.module.ts

```
import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisCacheModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

```

# FILE: apps/backend/src/dashboard/dashboard.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

const today = new Date();
const todayStr = today.toISOString();

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    groupBy: jest.fn(),
    $queryRaw: jest.fn(),
  },
  school: {
    findMany: jest.fn(),
    groupBy: jest.fn(),
  },
  city: { findMany: jest.fn() },
  eventHistory: { findMany: jest.fn() },
  $queryRaw: jest.fn(),
};

const makeService = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DashboardService,
      { provide: PrismaService, useValue: mockPrisma },
    ],
  }).compile();
  return module.get<DashboardService>(DashboardService);
};

const defaultMocks = () => {
  mockPrisma.event.findMany
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([]);
  mockPrisma.$queryRaw.mockResolvedValueOnce([
    { status: 'BASE', count: BigInt(10) },
    { status: 'FIRST_CONTACT', count: BigInt(5) },
    { status: 'IN_PROGRESS', count: BigInt(3) },
  ]);
  mockPrisma.school.findMany.mockResolvedValueOnce([]);
  mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
};

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    jest.clearAllMocks();
    service = await makeService();
    (service as any).cache.clear();
  });

  describe('getSummary — funnel', () => {
    it('коректно рахує воронку по стадіях', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.funnel['BASE']).toBe(10);
      expect(result.funnel['FIRST_CONTACT']).toBe(5);
      expect(result.funnel['IN_PROGRESS']).toBe(3);
    });

    it('totalSchools = сума всіх записів воронки', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.totalSchools).toBe(18);
    });

    it('всі етапи пайплайну присутні у funnel', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      const expectedStages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of expectedStages) {
        expect(result.funnel).toHaveProperty(stage);
      }
    });
  });

  describe('getSummary — todayEvents', () => {
    it('повертає сьогоднішні події', async () => {
      const todayEvent = {
        id: 'ev-1',
        project: 'Голограма',
        date: todayStr,
        school: { id: 's-1', name: 'Школа №1' },
        city: { id: 'c-1', name: 'Львів' },
        crew: null,
      };
      mockPrisma.event.findMany
        .mockResolvedValueOnce([todayEvent])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.todayEvents).toHaveLength(1);
      expect(result.todayEvents[0].id).toBe('ev-1');
    });

    it('повертає порожній масив якщо сьогодні подій немає', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.todayEvents).toHaveLength(0);
    });
  });

  describe('getSummary — upcomingEvents', () => {
    it('повертає майбутні події', async () => {
      const upcoming = {
        id: 'ev-2',
        project: 'Малювайко',
        date: todayStr,
        school: null,
        city: null,
        crew: null,
      };
      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([upcoming])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.upcomingEvents).toHaveLength(1);
      expect(result.upcomingEvents[0].id).toBe('ev-2');
    });
  });

  describe('getSummary — staleSchools', () => {
    it('повертає школи без активності більше 7 днів', async () => {
      const staleDate = new Date();
      staleDate.setDate(staleDate.getDate() - 10);

      const staleSchool = {
        id: 's-stale',
        name: 'Стала школа',
        events: [
          {
            status: 'FIRST_CONTACT',
            history: [{ createdAt: staleDate }],
          },
        ],
      };

      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([staleSchool]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.staleSchools).toHaveLength(1);
      expect(result.staleSchools[0].id).toBe('s-stale');
      expect(result.staleSchools[0].daysStale).toBeGreaterThanOrEqual(9);
    });

    it('сортує staleSchools від найстарішої активності', async () => {
      const date10 = new Date();
      date10.setDate(date10.getDate() - 10);
      const date20 = new Date();
      date20.setDate(date20.getDate() - 20);

      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([
        {
          id: 's-1',
          name: 'Школа 1',
          events: [{ status: 'BASE', history: [{ createdAt: date10 }] }],
        },
        {
          id: 's-2',
          name: 'Школа 2',
          events: [{ status: 'BASE', history: [{ createdAt: date20 }] }],
        },
      ]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.staleSchools[0].daysStale).toBeGreaterThan(
        result.staleSchools[1].daysStale!,
      );
    });
  });

  describe('getSummary — monthlyKpi', () => {
    it('коректно рахує KPI за місяць', async () => {
      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          {
            id: 'ev-1',
            report: { totalSum: 10000, remainderSum: 4000, childrenCount: 100 },
          },
          {
            id: 'ev-2',
            report: { totalSum: 5000, remainderSum: 2000, childrenCount: 50 },
          },
        ]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.school.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);

      const result = await service.getSummary('city-1');
      expect(result.monthlyKpi.revenue).toBe(15000);
      expect(result.monthlyKpi.profit).toBe(6000);
      expect(result.monthlyKpi.children).toBe(150);
      expect(result.monthlyKpi.count).toBe(2);
    });

    it('повертає нулі якщо звітів немає', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1');
      expect(result.monthlyKpi).toEqual({
        revenue: 0,
        profit: 0,
        children: 0,
        count: 0,
      });
    });
  });

  describe('getSummary — citiesStats (SUPERADMIN)', () => {
    it('повертає citiesStats для SUPERADMIN', async () => {
      defaultMocks();
      mockPrisma.city.findMany.mockResolvedValueOnce([
        { id: 'c-1', name: 'Львів' },
        { id: 'c-2', name: 'Київ' },
      ]);
      mockPrisma.school.groupBy.mockResolvedValueOnce([
        { cityId: 'c-1', _count: { id: 50 } },
      ]);
      mockPrisma.event.groupBy.mockResolvedValueOnce([
        { cityId: 'c-1', _count: { id: 5 } },
      ]);
      mockPrisma.event.findMany.mockResolvedValueOnce([
        { cityId: 'c-1', report: { totalSum: 20000 } },
      ]);

      const result = await service.getSummary(undefined, 'SUPERADMIN');
      expect(result.citiesStats).toHaveLength(2);
      const lviv = result.citiesStats.find((c) => c.cityId === 'c-1');
      expect(lviv?.schoolsCount).toBe(50);
      expect(lviv?.activeEvents).toBe(5);
      expect(lviv?.monthRevenue).toBe(20000);
    });

    it('повертає порожній citiesStats для не-SUPERADMIN', async () => {
      defaultMocks();
      const result = await service.getSummary('city-1', 'MANAGER');
      expect(result.citiesStats).toHaveLength(0);
    });
  });

  describe('getSummary — кеш', () => {
    it('повертає кешований результат при повторному виклику', async () => {
      defaultMocks();
      await service.getSummary('city-1');
      await service.getSummary('city-1');
      expect(mockPrisma.event.findMany).toHaveBeenCalledTimes(3);
    });
  });
});

```

# FILE: apps/backend/src/dashboard/dashboard.service.ts

```
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
const PIPELINE_STAGES = [
  'BASE',
  'FIRST_CONTACT',
  'INTERESTED',
  'PRE_APPROVAL',
  'DATE_CONFIRMED',
  'PREPARATION',
  'IN_PROGRESS',
  'DONE',
  'REPORT',
  'RE_SALE',
];

const STALE_DAYS = 7;

type EventWithRelations = Prisma.EventGetPayload<{
  include: {
    school: { select: { id: true; name: true } };
    city: { select: { id: true; name: true } };
    crew: {
      include: {
        host: { select: { id: true; name: true } };
        driver: { select: { id: true; name: true } };
      };
    };
  };
}>;

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  lastActivity: Date | null;
  daysStale: number | null;
}

interface ActivityFeedItem {
  id: string;
  userName: string;
  role: string;
  action: string;
  comment: string | null;
  createdAt: Date;
  schoolId: string | null;
  schoolName: string | null;
  eventId: string | null;
}

export interface DashboardSummary {
  todayEvents: EventWithRelations[];
  upcomingEvents: EventWithRelations[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: StaleSchool[];
  activityFeed: ActivityFeedItem[];
  citiesStats: {
    cityId: string;
    cityName: string;
    schoolsCount: number;
    activeEvents: number;
    monthRevenue: number;
  }[];
}
@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);
  private hits = 0;
  private misses = 0;
  private pending = new Map<string, Promise<DashboardSummary>>();

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getSummary(cityId?: string, role?: string): Promise<DashboardSummary> {
    const key = `dashboard:${cityId ?? 'all'}-${role ?? 'anon'}`;
    const cached = await this.cacheManager.get<DashboardSummary>(key);
    if (cached) {
      this.hits++;
      this.logger.debug(
        `cache hit — ${key} (rate=${this.hitRate().toFixed(1)}%)`,
      );
      return cached;
    }
    this.misses++;

    const existing = this.pending.get(key);
    if (existing) return existing;

    const compute = this.computeSummary(key, cityId, role);
    this.pending.set(key, compute);
    try {
      return await compute;
    } finally {
      this.pending.delete(key);
    }
  }

  private async computeSummary(
    key: string,
    cityId?: string,
    role?: string,
  ): Promise<DashboardSummary> {
    const t0 = Date.now();
    const now = new Date();
    const windows = this.buildTimeWindows(now);
    const cityFilter = cityId ? { cityId } : {};
    const isSuperAdmin = role === 'SUPERADMIN';

    const [eventsWindow, funnelStats, monthlyKpi, staleSchools, activityFeed] =
      await Promise.all([
        this.getEventsWindow(cityFilter, windows),
        this.getFunnelStats(cityId),
        this.getMonthlyKpi(cityFilter, windows),
        this.getStaleSchools(cityFilter, windows.staleThreshold, now),
        this.getActivityFeed(cityId, windows.todayStart),
      ]);

    const citiesStats = isSuperAdmin ? await this.getCitiesStats(windows) : [];

    const result: DashboardSummary = {
      ...eventsWindow,
      ...funnelStats,
      monthlyKpi,
      staleSchools,
      activityFeed,
      citiesStats,
    };

    this.logger.debug(`total: ${Date.now() - t0}ms`);
    await this.cacheManager.set(key, result, 60_000);
    return result;
  }

  private hitRate(): number {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : (this.hits / total) * 100;
  }

  private buildTimeWindows(now: Date) {
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const upcomingEnd = new Date(todayStart);
    upcomingEnd.setDate(upcomingEnd.getDate() + 6);
    const staleThreshold = new Date(now);
    staleThreshold.setDate(staleThreshold.getDate() - STALE_DAYS);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );
    return {
      todayStart,
      todayEnd,
      upcomingEnd,
      staleThreshold,
      monthStart,
      monthEnd,
    };
  }

  private eventInclude() {
    return {
      school: { select: { id: true, name: true } },
      city: { select: { id: true, name: true } },
      crew: {
        include: {
          host: { select: { id: true, name: true } },
          driver: { select: { id: true, name: true } },
        },
      },
    };
  }

  private async getEventsWindow(
    cityFilter: Record<string, unknown>,
    windows: ReturnType<DashboardService['buildTimeWindows']>,
  ) {
    const [todayEvents, upcomingEvents] = await Promise.all([
      this.prisma.event.findMany({
        where: {
          ...cityFilter,
          date: { gte: windows.todayStart, lt: windows.todayEnd },
        },
        include: this.eventInclude(),
        orderBy: { time: 'asc' },
      }),
      this.prisma.event.findMany({
        where: {
          ...cityFilter,
          date: { gte: windows.todayEnd, lt: windows.upcomingEnd },
        },
        include: this.eventInclude(),
        orderBy: [{ date: 'asc' }, { time: 'asc' }],
        take: 8,
      }),
    ]);
    return { todayEvents, upcomingEvents };
  }

  private async getFunnelStats(cityId?: string) {
    const funnelRows = cityId
      ? await this.prisma.$queryRaw<
          { status: string; count: bigint }[]
        >(Prisma.sql`
          SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
          FROM "School" s
          LEFT JOIN LATERAL (
            SELECT status FROM "Event"
            WHERE "schoolId" = s.id
            ORDER BY date DESC
            LIMIT 1
          ) e ON true
          WHERE s."cityId" = ${cityId}
          GROUP BY e.status
        `)
      : await this.prisma.$queryRaw<
          { status: string; count: bigint }[]
        >(Prisma.sql`
          SELECT COALESCE(e.status::text, 'BASE') as status, COUNT(*) as count
          FROM "School" s
          LEFT JOIN LATERAL (
            SELECT status FROM "Event"
            WHERE "schoolId" = s.id
            ORDER BY date DESC
            LIMIT 1
          ) e ON true
          GROUP BY e.status
        `);

    const funnel: Record<string, number> = {};
    for (const stage of PIPELINE_STAGES) funnel[stage] = 0;
    let totalSchools = 0;
    for (const row of funnelRows) {
      const status = row.status ?? 'BASE';
      const count = Number(row.count);
      if (funnel[status] !== undefined) funnel[status] += count;
      totalSchools += count;
    }
    return { funnel, totalSchools };
  }

  private async getMonthlyKpi(
    cityFilter: Record<string, unknown>,
    windows: ReturnType<DashboardService['buildTimeWindows']>,
  ) {
    const monthEvents = await this.prisma.event.findMany({
      where: {
        ...cityFilter,
        status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
        date: { gte: windows.monthStart, lte: windows.monthEnd },
      },
      select: {
        id: true,
        report: {
          select: { totalSum: true, remainderSum: true, childrenCount: true },
        },
      },
    });

    return monthEvents.reduce(
      (acc, ev) => {
        acc.revenue += ev.report?.totalSum ?? 0;
        acc.profit += ev.report?.remainderSum ?? 0;
        acc.children += ev.report?.childrenCount ?? 0;
        acc.count += 1;
        return acc;
      },
      { revenue: 0, profit: 0, children: 0, count: 0 },
    );
  }

  private async getStaleSchools(
    cityFilter: Record<string, unknown>,
    staleThreshold: Date,
    now: Date,
  ): Promise<StaleSchool[]> {
    const cityId = (cityFilter as { cityId?: string }).cityId;
    const cityCondition = cityId
      ? Prisma.sql`AND s."cityId" = ${cityId}`
      : Prisma.empty;

    const rows = await this.prisma.$queryRaw<
      {
        id: string;
        name: string;
        status: string | null;
        lastActivity: Date | null;
      }[]
    >(Prisma.sql`
      SELECT s.id, s.name, latest.status, "lastHist"."createdAt" as "lastActivity"
      FROM "School" s
      JOIN LATERAL (
        SELECT id, status FROM "Event" e
        WHERE e."schoolId" = s.id AND e.status NOT IN ('DONE', 'REPORT', 'RE_SALE')
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
      LEFT JOIN LATERAL (
        SELECT h."createdAt" FROM "EventHistory" h
        WHERE h."eventId" = latest.id
        ORDER BY h."createdAt" DESC
        LIMIT 1
      ) "lastHist" ON true
      WHERE ("lastHist"."createdAt" IS NULL OR "lastHist"."createdAt" < ${staleThreshold})
      ${cityCondition}
      ORDER BY "lastHist"."createdAt" ASC NULLS FIRST
      LIMIT 10
    `);

    return rows.map((school) => {
      const daysStale = school.lastActivity
        ? Math.floor(
            (now.getTime() - new Date(school.lastActivity).getTime()) /
              86_400_000,
          )
        : null;
      return {
        id: school.id,
        name: school.name,
        status: school.status ?? null,
        lastActivity: school.lastActivity,
        daysStale,
      };
    });
  }

  private async getActivityFeed(cityId: string | undefined, todayStart: Date) {
    const recentActivity = await this.prisma.eventHistory.findMany({
      where: {
        createdAt: { gte: todayStart },
        ...(cityId ? { event: { cityId } } : {}),
      },
      include: {
        event: {
          select: {
            id: true,
            school: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return recentActivity.map((h) => ({
      id: h.id,
      userName: h.userName,
      role: h.role,
      action: h.action,
      comment: h.comment,
      createdAt: h.createdAt,
      schoolId: h.event?.school?.id ?? null,
      schoolName: h.event?.school?.name ?? null,
      eventId: h.event?.id ?? null,
    }));
  }

  private async getCitiesStats(
    windows: ReturnType<DashboardService['buildTimeWindows']>,
  ) {
    const [allCities, allSchools, allActiveEvents, allMonthEvents] =
      await Promise.all([
        this.prisma.city.findMany({ select: { id: true, name: true } }),
        this.prisma.school.groupBy({ by: ['cityId'], _count: { id: true } }),
        this.prisma.event.groupBy({
          by: ['cityId'],
          where: {
            status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
          },
          _count: { id: true },
        }),
        this.prisma.event.findMany({
          where: {
            status: { in: ['DONE', 'REPORT', 'RE_SALE'] },
            date: { gte: windows.monthStart, lte: windows.monthEnd },
          },
          select: {
            cityId: true,
            report: { select: { totalSum: true } },
          },
        }),
      ]);

    const schoolsIdx = Object.fromEntries(
      allSchools.map((r) => [r.cityId, r._count.id]),
    );
    const activeIdx = Object.fromEntries(
      allActiveEvents.map((r) => [r.cityId, r._count.id]),
    );
    const revenueIdx: Record<string, number> = {};
    for (const ev of allMonthEvents) {
      revenueIdx[ev.cityId] =
        (revenueIdx[ev.cityId] ?? 0) + (ev.report?.totalSum ?? 0);
    }

    return allCities
      .map((city) => ({
        cityId: city.id,
        cityName: city.name,
        schoolsCount: schoolsIdx[city.id] ?? 0,
        activeEvents: activeIdx[city.id] ?? 0,
        monthRevenue: revenueIdx[city.id] ?? 0,
      }))
      .sort((a, b) => b.monthRevenue - a.monthRevenue);
  }
}

```

# FILE: apps/backend/src/days-off/days-off.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { DaysOffService } from './days-off.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateDayOffDto } from './dto/create-day-off.dto';

@ApiTags('DaysOff')
@ApiCookieAuth('access_token')
@Controller('days-off')
@UseGuards(AuthGuard)
export class DaysOffController {
  constructor(private readonly daysOffService: DaysOffService) {}

  @ApiOperation({ summary: 'Список вихідних' })
  @Get()
  findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('cityId') cityId?: string,
  ) {
    return this.daysOffService.findAll(from, to, cityId);
  }

  @ApiOperation({ summary: 'Призначити вихідний' })
  @Post()
  create(@Body() body: CreateDayOffDto, @CurrentUser() user: JwtUser) {
    return this.daysOffService.create(body, user);
  }

  @ApiOperation({ summary: 'Скасувати вихідний' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.daysOffService.remove(id, user);
  }
}

```

# FILE: apps/backend/src/days-off/days-off.module.ts

```
import { Module } from '@nestjs/common';
import { DaysOffService } from './days-off.service';
import { DaysOffController } from './days-off.controller';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [DaysOffController],
  providers: [DaysOffService],
})
export class DaysOffModule {}

```

# FILE: apps/backend/src/days-off/days-off.service.ts

```
import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { AppException } from '../common/exceptions/app.exception';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

const STAFF_ROLES = ['HOST', 'DRIVER'];
const MANAGER_ROLES = ['SUPERADMIN', 'MANAGER'];

@Injectable()
export class DaysOffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
  ) {}

  async findAll(from?: string, to?: string, cityId?: string) {
    return this.prisma.dayOff.findMany({
      where: {
        ...(from || to
          ? {
              date: {
                ...(from ? { gte: new Date(from) } : {}),
                ...(to ? { lte: new Date(to) } : {}),
              },
            }
          : {}),
        ...(cityId ? { user: { cityId } } : {}),
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
      orderBy: { date: 'asc' },
    });
  }

  async create(dto: { date: string; userId?: string }, currentUser: JwtUser) {
    const isStaff = STAFF_ROLES.includes(currentUser.role);
    const isManagerOrAdmin = MANAGER_ROLES.includes(currentUser.role);

    let targetUserId: string;

    if (isStaff) {
      targetUserId = currentUser.sub;
    } else if (isManagerOrAdmin) {
      if (!dto.userId)
        throw new AppException('USER_ID_REQUIRED', HttpStatus.BAD_REQUEST);

      const target = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!target || !STAFF_ROLES.includes(target.role)) {
        throw new AppException('INVALID_STAFF_USER', HttpStatus.BAD_REQUEST);
      }
      if (
        currentUser.role === 'MANAGER' &&
        target.cityId !== currentUser.cityId
      ) {
        throw new ForbiddenException(
          'Можна призначати вихідні лише співробітникам свого міста',
        );
      }
      targetUserId = target.id;
    } else {
      throw new ForbiddenException('Недостатньо прав');
    }

    // Перевіряємо, чи вже існує вихідний, щоб не слати спам, якщо він просто оновлюється
    const existing = await this.prisma.dayOff.findUnique({
      where: {
        userId_date: { userId: targetUserId, date: new Date(dto.date) },
      },
    });

    const dayOff = await this.prisma.dayOff.upsert({
      where: {
        userId_date: { userId: targetUserId, date: new Date(dto.date) },
      },
      update: {},
      create: {
        userId: targetUserId,
        date: new Date(dto.date),
        createdBy: currentUser.sub,
      },
      include: {
        user: { select: { id: true, name: true, role: true, cityId: true } },
      },
    });

    // Сповіщаємо менеджера, якщо вихідний створено вперше
    if (!existing) {
      await this.notifyManager(
        dayOff.user.cityId,
        dayOff.user.name,
        dto.date,
        'created',
      );
    }

    return dayOff;
  }

  async remove(id: string, currentUser: JwtUser) {
    const dayOff = await this.prisma.dayOff.findUnique({
      where: { id },
      include: { user: { select: { name: true, cityId: true } } },
    });

    if (!dayOff)
      throw new AppException('DAY_OFF_NOT_FOUND', HttpStatus.NOT_FOUND);

    const isOwner = dayOff.userId === currentUser.sub;
    const isManagerOrAdmin = MANAGER_ROLES.includes(currentUser.role);

    if (!isOwner && !isManagerOrAdmin) {
      throw new ForbiddenException('Недостатньо прав');
    }

    if (currentUser.role === 'MANAGER' && !isOwner) {
      if (dayOff.user.cityId !== currentUser.cityId) {
        throw new ForbiddenException(
          'Можна скасовувати вихідні лише співробітникам свого міста',
        );
      }
    }

    await this.prisma.dayOff.delete({ where: { id } });

    // Сповіщаємо менеджера про скасування
    await this.notifyManager(
      dayOff.user.cityId,
      dayOff.user.name,
      dayOff.date.toISOString(),
      'removed',
    );

    return { success: true };
  }

  private async notifyManager(
    cityId: string | null,
    staffName: string,
    date: string,
    action: 'created' | 'removed',
  ) {
    if (!cityId) return;

    // Шукаємо менеджера безпосередньо серед користувачів міста
    const manager = await this.prisma.user.findFirst({
      where: {
        cityId: cityId,
        role: 'MANAGER',
      },
    });

    if (!manager) return;

    const chatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    if (!chatId) return;

    const dateStr = new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const msg =
      action === 'created'
        ? `🌴 <b>Призначено вихідний</b>\n\n👤 <b>Співробітник:</b> ${staffName}\n📅 <b>Дата:</b> ${dateStr}`
        : `❌ <b>Скасовано вихідний</b>\n\n👤 <b>Співробітник:</b> ${staffName}\n📅 <b>Дата:</b> ${dateStr}`;

    await this.telegramService.sendMessage(chatId, msg);
  }
}

```

# FILE: apps/backend/src/days-off/dto/create-day-off.dto.ts

```
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDayOffDto {
  @ApiProperty({ example: '2026-07-10' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({
    description:
      'Заповнюється менеджером/адміном для призначення вихідного співробітнику',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}

```

# FILE: apps/backend/src/events/dto/add-comment.dto.ts

```
import { IsString, IsNotEmpty } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}

```

# FILE: apps/backend/src/events/dto/assign-crew.dto.ts

```
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignCrewDto {
  @IsString()
  @IsNotEmpty()
  crewId: string;
}

```

# FILE: apps/backend/src/events/dto/create-event.dto.ts

```
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID міста',
  })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiProperty({
    example: 'f9e8d7c6-b5a4-3210-fedc-ba9876543210',
    description: 'ID школи',
  })
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ example: 'Голографічне шоу «Космос»' })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({
    example: '2026-09-15',
    description: 'Дата у форматі YYYY-MM-DD',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({ example: '14:30' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiPropertyOptional({ example: 120, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenPlanned?: number;

  @ApiPropertyOptional({ example: 15000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ example: 'card', enum: ['cash', 'card', 'invoice'] })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'м. Львів, вул. Шевченка 10' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Олена Ковальчук' })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiPropertyOptional({ example: '+380671234567' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiPropertyOptional({ example: 'Проєктор, генератор туману' })
  @IsOptional()
  @IsString()
  equipment?: string;

  @ApiPropertyOptional({ example: 'Голографічне шоу «Динозаври»' })
  @IsOptional()
  @IsString()
  nextProject?: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-...',
    description: 'ID відповідального менеджера',
  })
  @IsOptional()
  @IsString()
  responsibleId?: string;
}

```

# FILE: apps/backend/src/events/dto/event-query.dto.ts

```
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class EventQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  take?: number;
}

```

# FILE: apps/backend/src/events/dto/reschedule-event.dto.ts

```
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

# FILE: apps/backend/src/events/dto/submit-report.dto.spec.ts

```
import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SubmitReportDto } from './submit-report.dto';

const validPayload = {
  announcementDone: true,
  materialShown: true,
  childrenCount: 100,
  classesCount: 4,
  privilegedCount: 5,
  showingsCount: 2,
  totalSum: 10000,
  schoolSum: 2000,
  remainderSum: 8000,
  rating: 5,
  expenses: [],
  salaries: [],
};

describe('SubmitReportDto', () => {
  it('проходить валідацію з коректними даними', async () => {
    const dto = plainToInstance(SubmitReportDto, validPayload);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it.each([
    'totalSum',
    'schoolSum',
    'childrenCount',
    'classesCount',
    'privilegedCount',
    'showingsCount',
  ])("відхиляє від'ємне значення поля %s", async (field) => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      [field]: -1,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === field)).toBe(true);
  });

  it("дозволяє remainderSum бути від'ємним (немає @Min обмеження в DTO)", async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      remainderSum: -500,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'remainderSum')).toBe(false);
  });

  it('відхиляє rating більше 5', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      rating: 6,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'rating')).toBe(true);
  });

  it('rating є опціональним', async () => {
    const { rating, ...rest } = validPayload;
    const dto = plainToInstance(SubmitReportDto, rest);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('трансформує рядкові числа в number через @Type(() => Number)', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      totalSum: '10000' as unknown as number,
    });
    expect(typeof dto.totalSum).toBe('number');
    expect(dto.totalSum).toBe(10000);
  });

  it('відхиляє expense item без amount', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      expenses: [{ category: 'Транспорт', name: 'Пальне' }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'expenses')).toBe(true);
  });

  it("відхиляє від'ємну суму витрати (вкладена валідація ExpenseItemDto)", async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      expenses: [{ category: 'Транспорт', name: 'Пальне', amount: -100 }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'expenses')).toBe(true);
  });

  it('відхиляє salary item без userId', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      salaries: [{ name: 'Іван', amount: 500 }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'salaries')).toBe(true);
  });
});

```

# FILE: apps/backend/src/events/dto/submit-report.dto.ts

```
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
  @Max(10)
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

# FILE: apps/backend/src/events/dto/update-preparation.dto.ts

```
import { IsEnum, IsIn } from 'class-validator';
import { PreparationStatus } from '@prisma/client';

const PREPARATION_FIELDS = [
  'assignCrew',
  'bookEquipment',
  'prepareDocs',
  'prepareMaterials',
  'remindSchool',
] as const;

export class UpdatePreparationDto {
  @IsIn(PREPARATION_FIELDS)
  field: (typeof PREPARATION_FIELDS)[number];

  @IsEnum(PreparationStatus)
  status: PreparationStatus;
}

```

# FILE: apps/backend/src/events/dto/update-status.dto.ts

```
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

# FILE: apps/backend/src/events/events-scheduler.service.ts

```
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class EventsSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(EventsSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  onModuleInit() {
    this.scheduleDailyCheck();
  }

  private scheduleDailyCheck() {
    const check = async () => {
      this.logger.log('Автоматична перевірка подій на завтра...');
      await this.checkEventsForTomorrow();
    };

    check();

    setInterval(check, 24 * 60 * 60 * 1000);
  }

  async checkEventsForTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const events = await this.prisma.event.findMany({
      where: {
        date: { gte: startOfTomorrow, lte: endOfTomorrow },
        status: { not: 'RE_SALE' },
      },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
      },
    });

    for (const event of events) {
      if (event.crew) {
        await this.sendReminder(event, event.crew.host, 'ведучий');
        await this.sendReminder(event, event.crew.driver, 'водій');
      }
    }
  }

  private async sendReminder(event: any, user: any, roleLabel: string) {
    if (!user || (!user.telegramChatId && !user.telegramId)) return;

    const chatId = user.telegramChatId || user.telegramId;
    const message =
      `🔔 <b>Нагадування про подію!</b>\n\n` +
      `👤 <b>Роль:</b> ${roleLabel}\n` +
      `📅 <b>Дата:</b> завтра\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name || '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      `📞 <b>Контакт:</b> ${event.contactPhone || '—'}`;

    try {
      await this.telegramService.sendMessage(chatId, message);
    } catch (e) {
      this.logger.error(`Помилка відправки: ${e}`);
    }
  }
}

```

# FILE: apps/backend/src/events/events.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { JwtService } from '@nestjs/jwt';

describe('EventsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: {} },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    }).compile();
    expect(module.get(EventsController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/events/events.controller.ts

```
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
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
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
import { EventQueryDto } from './dto/event-query.dto';
import { Throttle } from '@nestjs/throttler';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Events')
@ApiCookieAuth('access_token')
@Controller('events')
@UseGuards(AuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Список подій для поточного користувача' })
  @Get()
  findAll(@CurrentUser() user: JwtUser, @Query() query: EventQueryDto) {
    return this.eventsService.findAllForUser(user, query);
  }

  @ApiOperation({ summary: 'Створити подію' })
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @Roles('SUPERADMIN', 'MANAGER')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/report')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
  reschedule(
    @Param('id') id: string,
    @Body() body: RescheduleEventDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
  }
}

```

# FILE: apps/backend/src/events/events.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SchoolsModule } from '../schools/schools.module';
import { TelegramModule } from '../telegram/telegram.module';
import { EventsSchedulerService } from './events-scheduler.service';

@Module({
  imports: [forwardRef(() => SchoolsModule), TelegramModule],
  controllers: [EventsController],
  providers: [EventsService, EventsSchedulerService],
  exports: [EventsService],
})
export class EventsModule {}

```

# FILE: apps/backend/src/events/events.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  eventHistory: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  eventPreparation: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  eventReport: { upsert: jest.fn() },
  expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  salaryItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

const mockTelegram = { sendMessage: jest.fn() };

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' };

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
      ],
    }).compile();
    service = module.get<EventsService>(EventsService);
  });

  describe('updateStatus', () => {
    it('змінює статус і створює запис в історії', async () => {
      const updatedEvent = {
        id: 'ev-1',
        status: 'FIRST_CONTACT',
        crew: null,
        history: [{ id: 'h-1', action: 'Знайомство', userId: 'user-1' }],
      };
      mockPrisma.event.update.mockResolvedValueOnce(updatedEvent);

      const result = await service.updateStatus(
        'ev-1',
        'FIRST_CONTACT',
        'Знайомство',
        'коментар',
        mockUser,
      );

      expect(mockPrisma.event.update).toHaveBeenCalledWith({
        where: { id: 'ev-1' },
        data: {
          status: 'FIRST_CONTACT',
          history: {
            create: {
              action: 'Знайомство',
              comment: 'коментар',
              userId: 'user-1',
              userName: 'Менеджер',
              role: 'MANAGER',
            },
          },
        },
        include: expect.any(Object),
      });
      expect(result.status).toBe('FIRST_CONTACT');
    });

    it('зберігає null comment якщо коментар порожній', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'FIRST_CONTACT',
        crew: null,
        history: [],
      });

      await service.updateStatus(
        'ev-1',
        'FIRST_CONTACT',
        'Дія',
        undefined,
        mockUser,
      );

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.comment).toBeNull();
    });

    it('записує правильного userId з токена', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'BASE',
        crew: null,
        history: [],
      });

      await service.updateStatus('ev-1', 'BASE', 'Дія', undefined, {
        sub: 'driver-99',
        name: 'Водій',
        role: 'DRIVER',
      });

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.userId).toBe('driver-99');
      expect(callData.data.history.create.role).toBe('DRIVER');
    });
  });

  describe('addHistoryComment', () => {
    it('створює коментар і повертає подію з оновленою історією', async () => {
      mockPrisma.eventHistory.create.mockResolvedValueOnce({ id: 'h-new' });
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        history: [{ id: 'h-new', action: 'Коментар', comment: 'тест' }],
      });

      const result = await service.addHistoryComment('ev-1', 'тест', mockUser);

      expect(mockPrisma.eventHistory.create).toHaveBeenCalledWith({
        data: {
          eventId: 'ev-1',
          action: 'Коментар',
          comment: 'тест',
          userId: 'user-1',
          userName: 'Менеджер',
          role: 'MANAGER',
        },
      });
      expect(result?.history).toHaveLength(1);
    });
  });

  describe('submitReport', () => {
    const reportData = {
      announcementDone: true,
      materialShown: true,
      childrenCount: 100,
      classesCount: 4,
      privilegedCount: 5,
      showingsCount: 2,
      totalSum: 10000,
      schoolSum: 2000,
      remainderSum: 8000,
      rating: 9,
      expenses: [],
      salaries: [
        { userId: 'host-1', name: 'Ведучий Тест', amount: 1500 },
        { userId: 'driver-1', name: 'Водій Тест', amount: 1000 },
      ],
    };

    it('зберігає звіт через upsert', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
      mockPrisma.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.eventReport.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { eventId: 'ev-1' },
          update: expect.objectContaining({
            totalSum: 10000,
            remainderSum: 8000,
          }),
          create: expect.objectContaining({
            totalSum: 10000,
            remainderSum: 8000,
          }),
        }),
      );
    });

    it('нараховує зарплату користувачам', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.user.update).toHaveBeenCalledTimes(2);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'host-1' },
        data: { balance: { increment: 1500 } },
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'driver-1' },
        data: { balance: { increment: 1000 } },
      });
    });

    it('не нараховує зарплату якщо amount = 0', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          salaries: [{ userId: 'host-1', amount: 0 }],
        },
        mockUser,
      );

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('змінює статус на REPORT після збереження звіту', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      const result = await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({ status: 'REPORT' }),
        }),
      );
      expect(result.status).toBe('REPORT');
    });

    it('не нараховує зарплату якщо salaries порожній', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        { ...reportData, salaries: [] },
        mockUser,
      );

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('очищує попередні expense/salary записи перед кожною подачею звіту (ідемпотентність редагування)', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.expenseItem.deleteMany).toHaveBeenCalledWith({
        where: { reportId: 'ev-1' },
      });
      expect(mockPrisma.salaryItem.deleteMany).toHaveBeenCalledWith({
        where: { reportId: 'ev-1' },
      });
    });

    it('deleteMany викликається завжди, навіть якщо expenses і salaries порожні', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        { ...reportData, expenses: [], salaries: [] },
        mockUser,
      );

      expect(mockPrisma.expenseItem.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.salaryItem.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.expenseItem.createMany).not.toHaveBeenCalled();
      expect(mockPrisma.salaryItem.createMany).not.toHaveBeenCalled();
    });

    it('підставляє категорію "Інше" для витрати без вказаної категорії', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        { ...reportData, expenses: [{ name: 'Бензин', amount: 300 }] },
        mockUser,
      );

      const call = mockPrisma.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].category).toBe('Інше');
    });

    it('конвертує суми витрат у Prisma.Decimal з точністю до копійок', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          expenses: [{ category: 'Транспорт', name: 'Бензин', amount: 349.99 }],
        },
        mockUser,
      );

      const call = mockPrisma.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].amount).toBeInstanceOf(Prisma.Decimal);
      expect(call.data[0].amount.toString()).toBe('349.99');
    });

    it('обробляє відсутність суми витрати (amount undefined -> 0)', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          expenses: [
            {
              category: 'Інше',
              name: 'Без суми',
              amount: undefined as unknown as number,
            },
          ],
        },
        mockUser,
      );

      const call = mockPrisma.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].amount.toString()).toBe('0');
    });

    it("не нараховує баланс якщо сума зарплати від'ємна, але запис зберігається", async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          salaries: [{ userId: 'host-1', name: 'Ведучий Тест', amount: 0 }],
        },
        mockUser,
      );

      expect(mockPrisma.salaryItem.createMany).toHaveBeenCalled();
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('створює всі salary items одним викликом createMany', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.salaryItem.createMany).toHaveBeenCalledTimes(1);
      const call = mockPrisma.salaryItem.createMany.mock.calls[0][0];
      expect(call.data).toHaveLength(2);
    });

    it('зберігає totalSum/schoolSum/remainderSum саме такими, як прийшли з фронтенду — бекенд НЕ перераховує арифметику', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      // Навмисно неузгоджені дані: 15000 - 3000 = 12000, а не 11500
      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          totalSum: 15000,
          schoolSum: 3000,
          remainderSum: 11500,
        },
        mockUser,
      );

      const call = mockPrisma.eventReport.upsert.mock.calls[0][0];
      expect(call.update.remainderSum).toBe(11500);
    });

    it('коректно обробляє відсутній rating', async () => {
      const { rating, ...withoutRating } = reportData;
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', withoutRating, mockUser);

      const call = mockPrisma.eventReport.upsert.mock.calls[0][0];
      expect(call.update.rating).toBeUndefined();
    });
  });

  describe('findBySchool', () => {
    it('minimal=true — використовує select без history/preparation', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findBySchool('school-1', true);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.select).toBeDefined();
      expect(call.include).toBeUndefined();
    });

    it('minimal=false — використовує include з history та preparation', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findBySchool('school-1', false);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.include).toBeDefined();
      expect(call.select).toBeUndefined();
    });
  });
});

```

# FILE: apps/backend/src/events/events.service.ts

```
import { Injectable, Logger, HttpStatus, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, PreparationStatus } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
import {
  SubmitReportDto,
  ExpenseItemDto,
  SalaryItemDto,
} from './dto/submit-report.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

const FIELD_ROLES = ['DRIVER', 'HOST'];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private readonly pendingSchoolEvents = new Map<string, Promise<unknown>>();

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAllForUser(user: JwtUser, query?: EventQueryDto) {
    const isFieldStaff = FIELD_ROLES.includes(user.role);
    const where = isFieldStaff
      ? { crew: { OR: [{ hostId: user.sub }, { driverId: user.sub }] } }
      : {};
    const include = {
      school: { select: { id: true, name: true, type: true } },
      city: { select: { id: true, name: true } },
      crew: {
        include: {
          host: { select: { id: true, name: true } },
          driver: { select: { id: true, name: true } },
        },
      },
    };

    if (!query?.page) {
      return this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
      });
    }

    const take = query.take ?? 20;
    const skip = (query.page - 1) * take;

    const [data, totalItems] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
        skip,
        take,
      }),
      this.prisma.event.count({ where }),
    ]);

    return { data, meta: new PageMetaDto(totalItems, query.page, take) };
  }

  async create(data: CreateEventDto, user: JwtUser) {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        status: 'BASE' as never,
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { history: true },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async updateStatus(
    eventId: string,
    newStatus: string,
    actionName: string,
    comment: string | undefined,
    user: JwtUser,
  ) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus as never,
        history: {
          create: {
            action: actionName,
            comment: comment || null,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async updatePreparationStatus(
    eventId: string,
    field: keyof Omit<
      Prisma.EventPreparationUncheckedCreateInput,
      'id' | 'eventId'
    >,
    status: PreparationStatus,
  ) {
    const result = await this.prisma.eventPreparation.upsert({
      where: { eventId },
      update: { [field]: status },
      create: { eventId, [field]: status },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { schoolId: true },
    });
    if (event) await this.invalidateSchoolEventsCache(event.schoolId);
    return result;
  }

  async assignCrewToEvent(eventId: string, crewId: string) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: { crewId: crewId },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const hostId = event.crew?.hostId;
    const driverId = event.crew?.driverId;

    const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = event.time ? `, ${event.time}` : '';

    const buildMessage = (role: 'ведучий' | 'водій') =>
      `🎯 <b>Вас призначено на подію!</b>\n\n` +
      `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
      `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      (event.contactPerson
        ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
        : '') +
      (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    if (hostId) {
      const hostChatId = await this.getChatIdForUser(hostId);
      this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);

      if (hostChatId) {
        this.telegramService
          .sendMessage(hostChatId, buildMessage('ведучий'))
          .catch((e) =>
            this.logger.warn(`[assignCrew] Telegram send failed: ${e}`),
          );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
        );
      }
    }

    if (driverId) {
      const driverChatId = await this.getChatIdForUser(driverId);
      this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);

      if (driverChatId) {
        this.telegramService
          .sendMessage(driverChatId, buildMessage('водій'))
          .catch((e) =>
            this.logger.warn(`[assignCrew] Telegram send failed: ${e}`),
          );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
        );
      }
    }

    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async rescheduleEvent(
    eventId: string,
    newDate: string,
    newTime: string,
    user: JwtUser,
  ) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        date: new Date(newDate),
        time: newTime,
        history: {
          create: {
            action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const msg =
      `📅 <b>Подію перенесено!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    const sendTo = async (userId: string | null | undefined) => {
      if (!userId) return;
      const u = await this.prisma.user.findUnique({ where: { id: userId } });
      const chatId =
        u?.telegramChatId ||
        (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
      if (chatId) await this.telegramService.sendMessage(chatId, msg);
    };

    await sendTo(event.crew?.hostId);
    await sendTo(event.crew?.driverId);

    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async getChatIdForUser(userId: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    if (user.telegramChatId) return user.telegramChatId;

    if (user.telegramId && /^\d+$/.test(user.telegramId))
      return user.telegramId;

    return null;
  }

  async findBySchool(schoolId: string, minimal = false) {
    const key = `events:school:${schoolId}:${minimal ? 'minimal' : 'full'}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const existing = this.pendingSchoolEvents.get(key);
    if (existing) return existing;

    const compute = this.computeBySchool(key, schoolId, minimal);
    this.pendingSchoolEvents.set(key, compute);
    try {
      return await compute;
    } finally {
      this.pendingSchoolEvents.delete(key);
    }
  }

  private async computeBySchool(
    key: string,
    schoolId: string,
    minimal: boolean,
  ) {
    let result;
    if (minimal) {
      result = await this.prisma.event.findMany({
        where: { schoolId },
        select: {
          id: true,
          project: true,
          date: true,
          time: true,
          status: true,
          price: true,
          childrenPlanned: true,
          address: true,
          contactPerson: true,
          contactPhone: true,
          crewId: true,
          crew: {
            select: { id: true, name: true, hostId: true, driverId: true },
          },
        },
        orderBy: { date: 'desc' },
      });
    } else {
      result = await this.prisma.event.findMany({
        where: { schoolId },
        include: {
          crew: { include: { host: true, driver: true } },
          history: { orderBy: { createdAt: 'desc' } },
          preparation: true,
        },
        orderBy: { date: 'desc' },
      });
    }

    await this.cacheManager.set(key, result, 15_000);
    return result;
  }

  async updateHistoryComment(historyId: string, comment: string) {
    const history = await this.prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null },
      include: { event: { select: { schoolId: true } } },
    });
    await this.invalidateSchoolEventsCache(history.event.schoolId);
    return history;
  }

  async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
    await this.prisma.eventHistory.create({
      data: {
        eventId,
        action: 'Коментар',
        comment,
        userId: user.sub,
        userName: user.name,
        role: user.role,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        history: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (event) await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async remove(id: string) {
    const exists = await this.prisma.event.findUnique({ where: { id } });
    if (!exists)
      throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    const deleted = await this.prisma.event.delete({
      where: { id },
    });
    await this.invalidateSchoolEventsCache(exists.schoolId);
    return deleted;
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    const report = await this.prisma.eventReport.upsert({
      where: { eventId },
      update: {
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
      create: {
        eventId,
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
    });

    await this.prisma.expenseItem.deleteMany({
      where: { reportId: report.id },
    });
    await this.prisma.salaryItem.deleteMany({ where: { reportId: report.id } });

    if (reportData.expenses?.length) {
      await this.prisma.expenseItem.createMany({
        data: reportData.expenses.map((exp: ExpenseItemDto) => ({
          reportId: report.id,
          category: exp.category || 'Інше',
          name: exp.name,
          amount: new Prisma.Decimal(exp.amount || 0),
        })),
      });
    }

    if (reportData.salaries?.length) {
      await Promise.all(
        reportData.salaries
          .filter((s) => s.userId && s.amount > 0)
          .map((s) =>
            this.prisma.user.update({
              where: { id: s.userId },
              data: { balance: { increment: s.amount } },
            }),
          ),
      );
    }

    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'RE_SALE' as never,
        history: {
          create: {
            action: 'Сформовано звіт. Захід завершено.',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    return event;
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        school: true,
        city: true,
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
        report: true,
      },
    });
    if (!event) throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    return event;
  }

  async findCompletedBySchool(schoolId: string) {
    return this.prisma.event.findMany({
      where: { schoolId, status: 'RE_SALE' },
      select: {
        id: true,
        project: true,
        date: true,
        status: true,
        price: true,
        childrenPlanned: true,
        report: {
          select: {
            childrenCount: true,
            classesCount: true,
            privilegedCount: true,
            showingsCount: true,
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
            expenseItems: {
              select: { category: true, name: true, amount: true },
            },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { date: 'desc' },
    });
  }
}

```

# FILE: apps/backend/src/finance/create-expense-item.dto.ts

```
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

# FILE: apps/backend/src/finance/dto/finance-dashboard-query.dto.ts

```
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

# FILE: apps/backend/src/finance/dto/staff-revenue-query.dto.ts

```
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

# FILE: apps/backend/src/finance/finance.controller.ts

```
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { FinanceDashboardQueryDto } from './dto/finance-dashboard-query.dto';
import { StaffRevenueQueryDto } from './dto/staff-revenue-query.dto';
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
    if (user.role === 'SUPERADMIN') return requestedCityId;
    const me = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    return me?.cityId ?? undefined;
  }

  @ApiOperation({ summary: 'Фінансовий дашборд (KPI, динаміка, топ)' })
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

  @ApiOperation({ summary: 'Баланс поточного користувача' })
  @Get('my-balance')
  getMyBalance(@CurrentUser() user: JwtUser) {
    return this.financeService.getMyBalance(user.sub);
  }

  @ApiOperation({ summary: 'Виручка по співробітниках' })
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

# FILE: apps/backend/src/finance/finance.module.ts

```
import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}

```

# FILE: apps/backend/src/finance/finance.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { FinanceService } from './finance.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  eventReport: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
  },

  event: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },

  expenseItem: {
    findMany: jest.fn(),
    aggregate: jest.fn(),
  },

  salaryItem: {
    findMany: jest.fn(),
    aggregate: jest.fn(),
  },

  city: {
    findMany: jest.fn(),
  },

  user: {
    findUnique: jest.fn(),
  },

  $queryRaw: jest.fn(),
};

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<FinanceService>(FinanceService);
    (service as any).cache.clear();
  });

  const defaultMocks = () => {
    mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
      _sum: { totalSum: 50000, remainderSum: 20000 },
      _count: { eventId: 10 },
    });
    mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    mockPrisma.event.aggregate.mockResolvedValueOnce({
      _sum: { price: 30000 },
    });
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.city.findMany.mockResolvedValueOnce([]);
    mockPrisma.eventReport.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);

    mockPrisma.salaryItem.findMany.mockResolvedValueOnce([]);

    mockPrisma.expenseItem.aggregate.mockResolvedValueOnce({
      _sum: {
        amount: 0,
      },
    });

    mockPrisma.salaryItem.aggregate.mockResolvedValueOnce({
      _sum: {
        amount: 0,
      },
    });
  };

  describe('getDashboard — KPI', () => {
    it('коректно повертає KPI з aggregate', async () => {
      defaultMocks();
      const result = await service.getDashboard({});
      expect(result.kpi.totalRevenue).toBe(50000);
      expect(result.kpi.totalProfit).toBe(20000);
      expect(result.kpi.totalEvents).toBe(10);
    });

    it('повертає нулі якщо звітів немає', async () => {
      mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
        _sum: { totalSum: null, remainderSum: null },
        _count: { eventId: 0 },
      });
      mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
      mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.event.aggregate.mockResolvedValueOnce({
        _sum: { price: null },
      });
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      mockPrisma.city.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventReport.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      const result = await service.getDashboard({});
      expect(result.kpi.totalRevenue).toBe(0);
      expect(result.kpi.totalProfit).toBe(0);
      expect(result.kpi.totalEvents).toBe(0);
    });
  });

  describe('getDashboard — фільтри', () => {
    it('передає cityId у where для Prisma', async () => {
      defaultMocks();
      await service.getDashboard({ cityId: 'city-1' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      expect(aggregateCall.where.event.cityId).toBe('city-1');
    });

    it('передає project у where для Prisma', async () => {
      defaultMocks();
      await service.getDashboard({ project: 'Голограма' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      expect(aggregateCall.where.event.project).toBe('Голограма');
    });

    it('period=month генерує dateFrom з початку місяця', async () => {
      defaultMocks();
      await service.getDashboard({ period: 'month' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      const dateFrom = aggregateCall.where.event.date?.gte;
      expect(dateFrom).toBeDefined();
      const now = new Date();
      expect(dateFrom.getMonth()).toBe(now.getMonth());
      expect(dateFrom.getDate()).toBe(1);
    });

    it('period=year генерує dateFrom з 1 січня', async () => {
      defaultMocks();
      await service.getDashboard({ period: 'year' });
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      const dateFrom = aggregateCall.where.event.date?.gte;
      expect(dateFrom.getMonth()).toBe(0);
      expect(dateFrom.getDate()).toBe(1);
    });

    it('без period — dateFrom undefined', async () => {
      defaultMocks();
      await service.getDashboard({});
      const aggregateCall = mockPrisma.eventReport.aggregate.mock.calls[0][0];
      expect(aggregateCall.where.event.date).toBeUndefined();
    });
  });

  describe('getDashboard — minimal режим', () => {
    it('minimal=true не запитує topSchools/topCities/byProject', async () => {
      mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
        _sum: { totalSum: 10000, remainderSum: 4000 },
        _count: { eventId: 2 },
      });
      mockPrisma.eventReport.findMany.mockResolvedValueOnce([]);
      mockPrisma.expenseItem.findMany.mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]);
      mockPrisma.event.aggregate.mockResolvedValueOnce({
        _sum: { price: 5000 },
      });
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      mockPrisma.city.findMany.mockResolvedValueOnce([]);

      const result = await service.getDashboard({ minimal: true });

      expect(result).toHaveProperty('kpi');
      expect(result).toHaveProperty('monthly');
      expect(result).not.toHaveProperty('topSchools');
      expect(result).not.toHaveProperty('topCities');
      expect(result).not.toHaveProperty('byProject');

      expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDashboard — витрати по категоріях', () => {
    it('агрегує витрати по категоріях', async () => {
      mockPrisma.eventReport.aggregate.mockResolvedValueOnce({
        _sum: { totalSum: 10000, remainderSum: 4000 },
        _count: { eventId: 2 },
      });
      mockPrisma.expenseItem.findMany.mockResolvedValueOnce([
        { category: 'Паливо', amount: 500 },
        { category: 'Паливо', amount: 300 },
        { category: 'Реклама', amount: 200 },
      ]);
      mockPrisma.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.event.aggregate.mockResolvedValueOnce({ _sum: { price: 0 } });
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      mockPrisma.city.findMany.mockResolvedValueOnce([]);
      mockPrisma.eventReport.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      const result = await service.getDashboard({});
      const fuel = result.byExpenseCategory.find(
        (c: any) => c.name === 'Паливо',
      );
      const ads = result.byExpenseCategory.find(
        (c: any) => c.name === 'Реклама',
      );
      expect(fuel?.value).toBe(800);
      expect(ads?.value).toBe(200);
      expect(result.kpi.totalExpenses).toBe(1000);
    });
  });

  describe('getDashboard — кеш', () => {
    it('повторний виклик з тими ж параметрами не робить нових запитів', async () => {
      defaultMocks();
      await service.getDashboard({ cityId: 'city-1' });
      await service.getDashboard({ cityId: 'city-1' });
      expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(1);
    });

    it('різні параметри — різні записи в кеші', async () => {
      defaultMocks();
      defaultMocks();
      await service.getDashboard({ cityId: 'city-1' });
      await service.getDashboard({ cityId: 'city-2' });
      expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(2);
    });
  });

  describe('getMyBalance', () => {
    it('повертає баланс користувача', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        balance: 5000,
        name: 'Іван',
      });
      const result = await service.getMyBalance('user-1');
      expect(result.balance).toBe(5000);
      expect(result.name).toBe('Іван');
    });

    it('повертає 0 якщо користувач не знайдений', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      const result = await service.getMyBalance('unknown');
      expect(result.balance).toBe(0);
    });
  });

  describe('resolveDateFrom', () => {
    it('month → перший день поточного місяця', () => {
      const result = (service as any).resolveDateFrom('month');
      const now = new Date();
      expect(result.getFullYear()).toBe(now.getFullYear());
      expect(result.getMonth()).toBe(now.getMonth());
      expect(result.getDate()).toBe(1);
    });

    it('quarter → перший день поточного кварталу', () => {
      const result = (service as any).resolveDateFrom('quarter');
      const now = new Date();
      const expectedMonth = Math.floor(now.getMonth() / 3) * 3;
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDate()).toBe(1);
    });

    it('year → 1 січня', () => {
      const result = (service as any).resolveDateFrom('year');
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });

    it('undefined → повертає undefined', () => {
      const result = (service as any).resolveDateFrom(undefined);
      expect(result).toBeUndefined();
    });
  });
});

```

# FILE: apps/backend/src/finance/finance.service.ts

```
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
export interface FinanceKpi {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalEvents: number;
}

export interface FinanceFilterOptions {
  projects: string[];
  cities: { id: string; name: string }[];
}

export interface FinanceDashboardResult {
  kpi: FinanceKpi;
  monthly: { month: string; revenue: number; profit: number }[];
  expectedRevenue: number;
  filters: FinanceFilterOptions;
  byProject?: { name: string; value: number }[];
  byExpenseCategory?: { name: string; value: number }[];
  topCities?: { name: string; revenue: number; profit: number }[];
  topSchools?: { name: string; count: number; revenue: number }[];
  topEvents?: {
    id: string;
    date: Date;
    school: string;
    profit: number;
    revenue: number;
  }[];
  worstEvents?: {
    id: string;
    date: Date;
    school: string;
    profit: number;
    revenue: number;
  }[];
}

@Injectable()
export class FinanceService {
  private cache = new Map<string, { data: unknown; expiresAt: number }>();

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiresAt) return null;
    return entry.data as T;
  }

  private setCached(key: string, data: unknown, ttlMs = 5 * 60 * 1000) {
    this.cache.set(key, { data, expiresAt: Date.now() + ttlMs });
  }

  constructor(private readonly prisma: PrismaService) {}

  private resolveDateFrom(period?: string): Date | undefined {
    const now = new Date();
    if (period === 'month')
      return new Date(now.getFullYear(), now.getMonth(), 1);
    if (period === 'quarter')
      return new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    if (period === 'year') return new Date(now.getFullYear(), 0, 1);
    return undefined;
  }
  private buildSqlFilters({
    dateFrom,
    cityId,
    project,
  }: {
    dateFrom?: Date;
    cityId?: string;
    project?: string;
  }): Prisma.Sql {
    const parts: Prisma.Sql[] = [];
    if (dateFrom) parts.push(Prisma.sql`AND e.date >= ${dateFrom}`);
    if (cityId) parts.push(Prisma.sql`AND e."cityId" = ${cityId}`);
    if (project) parts.push(Prisma.sql`AND e.project  = ${project}`);
    return parts.length ? Prisma.join(parts, ' ') : Prisma.empty;
  }

  async getMyBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, name: true },
    });
    return { balance: user?.balance?.toNumber() ?? 0, name: user?.name ?? '' };
  }

  async getDashboard({
    period,
    cityId,
    project,
    minimal = false,
  }: {
    period?: string;
    cityId?: string;
    project?: string;
    minimal?: boolean;
  }): Promise<FinanceDashboardResult> {
    const cacheKey = `finance:${cityId}:${period}:${project}:${minimal}`;
    const cached = this.getCached<FinanceDashboardResult>(cacheKey);
    if (cached) return cached;

    const dateFrom = this.resolveDateFrom(period);
    const filters = this.buildSqlFilters({ dateFrom, cityId, project });

    const baseEventWhere: Prisma.EventWhereInput = {
      status: 'RE_SALE',
      ...(dateFrom ? { date: { gte: dateFrom } } : {}),
      ...(cityId ? { cityId } : {}),
      ...(project ? { project } : {}),
    };

    const [kpiAgg, expensesRaw] = await Promise.all([
      this.prisma.eventReport.aggregate({
        where: { event: baseEventWhere },
        _sum: { totalSum: true, remainderSum: true },
        _count: { eventId: true },
      }),
      this.prisma.expenseItem.findMany({
        where: { report: { event: baseEventWhere } },
        select: { category: true, name: true, amount: true },
      }),
    ]);

    const totalRevenue = kpiAgg._sum.totalSum ?? 0;
    const totalProfit = kpiAgg._sum.remainderSum ?? 0;
    const totalEvents = kpiAgg._count.eventId ?? 0;

    const expCatMap: Record<string, number> = {};
    let totalExpenses = 0;

    for (const exp of expensesRaw) {
      const cat: string = exp.category || exp.name || 'Інше';
      const amt: number = Number(exp.amount) || 0;
      expCatMap[cat] = (expCatMap[cat] ?? 0) + amt;
      totalExpenses += amt;
    }

    const byExpenseCategory = Object.entries(expCatMap).map(
      ([name, value]) => ({
        name,
        value,
      }),
    );
    type MonthlyRow = {
      year: number;
      month: number;
      revenue: number;
      profit: number;
    };
    const [monthlyRaw, plannedAgg, projectsRaw, cities] = await Promise.all([
      this.prisma.$queryRaw<MonthlyRow[]>`
        SELECT
          EXTRACT(YEAR  FROM e.date)::int                   AS year,
          EXTRACT(MONTH FROM e.date)::int                   AS month,
          COALESCE(SUM(r."totalSum"),      0)::float        AS revenue,
          COALESCE(SUM(r."remainderSum"),  0)::float        AS profit
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY year, month
        ORDER BY year, month
      `,
      this.prisma.event.aggregate({
        where: {
          status: { in: ['DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS'] },
          ...(cityId ? { cityId } : {}),
        },
        _sum: { price: true },
      }),
      this.prisma.event.findMany({
        select: { project: true },
        distinct: ['project'],
      }),
      this.prisma.city.findMany({ select: { id: true, name: true } }),
    ]);

    const monthly = monthlyRaw.map((row) => ({
      month: new Date(row.year, row.month - 1, 1).toLocaleString('uk-UA', {
        month: 'short',
        year: '2-digit',
      }),
      revenue: row.revenue,
      profit: row.profit,
    }));
    const expectedRevenue = plannedAgg._sum.price ?? 0;
    const filterOptions = {
      projects: projectsRaw.map((p) => p.project).filter(Boolean),
      cities,
    };

    if (minimal) {
      const result = {
        kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
        monthly,
        expectedRevenue,
        filters: filterOptions,
      };
      this.setCached(cacheKey, result);
      return result;
    }

    type ProjectRow = { project: string; value: number };
    type CityRow = {
      cityId: string;
      name: string;
      revenue: number;
      profit: number;
    };
    type SchoolRow = {
      schoolId: string;
      name: string;
      count: number;
      revenue: number;
    };

    const [byProjectRows, topCitiesRows, topSchoolsRows] = await Promise.all([
      this.prisma.$queryRaw<ProjectRow[]>`
        SELECT
          COALESCE(e.project, 'Інше')              AS project,
          COALESCE(SUM(r."totalSum"), 0)::float    AS value
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY e.project
        ORDER BY value DESC
      `,
      this.prisma.$queryRaw<CityRow[]>`
        SELECT
          e."cityId",
          COALESCE(c.name, '—')                    AS name,
          COALESCE(SUM(r."totalSum"),     0)::float AS revenue,
          COALESCE(SUM(r."remainderSum"), 0)::float AS profit
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        LEFT JOIN "City" c   ON c.id = e."cityId"
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY e."cityId", c.name
        ORDER BY revenue DESC
        LIMIT 5
      `,
      this.prisma.$queryRaw<SchoolRow[]>`
        SELECT
          e."schoolId",
          COALESCE(s.name, '—')                    AS name,
          COUNT(e.id)::int                         AS count,
          COALESCE(SUM(r."totalSum"), 0)::float    AS revenue
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        LEFT JOIN "School" s ON s.id = e."schoolId"
        WHERE e.status = 'RE_SALE'
        ${filters}
        GROUP BY e."schoolId", s.name
        ORDER BY revenue DESC
        LIMIT 5
      `,
    ]);

    const byProject = byProjectRows.map((r) => ({
      name: r.project,
      value: r.value,
    }));
    const topCities = topCitiesRows.map(({ name, revenue, profit }) => ({
      name,
      revenue,
      profit,
    }));
    const topSchools = topSchoolsRows.map(({ name, count, revenue }) => ({
      name,
      count,
      revenue,
    }));

    const eventSelect = {
      totalSum: true,
      remainderSum: true,
      event: {
        select: {
          id: true,
          date: true,
          school: { select: { name: true } },
        },
      },
    } satisfies Prisma.EventReportSelect;

    const [topEventsRaw, worstEventsRaw] = await Promise.all([
      this.prisma.eventReport.findMany({
        where: { event: baseEventWhere },
        select: eventSelect,
        orderBy: { remainderSum: 'desc' },
        take: 5,
      }),
      this.prisma.eventReport.findMany({
        where: { event: baseEventWhere },
        select: eventSelect,
        orderBy: { remainderSum: 'asc' },
        take: 5,
      }),
    ]);

    const mapEvent = (r: (typeof topEventsRaw)[number]) => ({
      id: r.event.id,
      date: r.event.date,
      school: r.event.school?.name ?? '—',
      profit: r.remainderSum ?? 0,
      revenue: r.totalSum ?? 0,
    });

    const topEvents = topEventsRaw.map(mapEvent);
    const worstEvents = worstEventsRaw.map(mapEvent);

    const result = {
      kpi: { totalRevenue, totalExpenses, totalProfit, totalEvents },
      monthly,
      byProject,
      byExpenseCategory,
      topCities,
      topSchools,
      topEvents,
      worstEvents,
      expectedRevenue,
      filters: filterOptions,
    };
    this.setCached(cacheKey, result);
    return result;
  }

  async getStaffRevenue({
    period,
    cityId,
  }: {
    period?: string;
    cityId?: string;
  }) {
    const dateFrom = this.resolveDateFrom(period);
    const staffFilters = this.buildSqlFilters({ dateFrom, cityId });

    type StaffRow = {
      id: string;
      name: string;
      role: 'HOST' | 'DRIVER';
      revenue: number;
      eventsCount: number;
    };

    const [hostRows, driverRows, totalAgg, eventsCount] = await Promise.all([
      this.prisma.$queryRaw<StaffRow[]>`
        SELECT
          u.id,
          u.name,
          'HOST'::text                              AS role,
          COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
          COUNT(e.id)::int                          AS "eventsCount"
        FROM "Event" e
        JOIN "Crew"         c ON c.id = e."crewId"
        JOIN "User"         u ON u.id = c."hostId"
        JOIN "EventReport"  r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${staffFilters}
        GROUP BY u.id, u.name
      `,
      this.prisma.$queryRaw<StaffRow[]>`
        SELECT
          u.id,
          u.name,
          'DRIVER'::text                            AS role,
          COALESCE(SUM(r."totalSum"), 0)::float     AS revenue,
          COUNT(e.id)::int                          AS "eventsCount"
        FROM "Event" e
        JOIN "Crew"        c ON c.id = e."crewId"
        JOIN "User"        u ON u.id = c."driverId"
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${staffFilters}
        GROUP BY u.id, u.name
      `,
      this.prisma.$queryRaw<[{ revenue: number }]>`
        SELECT COALESCE(SUM(r."totalSum"), 0)::float AS revenue
        FROM "Event" e
        JOIN "EventReport" r ON r."eventId" = e.id
        WHERE e.status = 'RE_SALE'
        ${staffFilters}
      `,
      this.prisma.event.count({
        where: {
          status: 'RE_SALE',
          ...(dateFrom ? { date: { gte: dateFrom } } : {}),
          ...(cityId ? { cityId } : {}),
        },
      }),
    ]);

    const staff = [...hostRows, ...driverRows].sort(
      (a, b) => b.revenue - a.revenue,
    );
    const totalRevenue = totalAgg[0]?.revenue ?? 0;

    return { staff, totalRevenue, eventsCount };
  }
}

```

# FILE: apps/backend/src/health/health.controller.ts

```
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { RedisHealthIndicator } from './indicators/redis.health';

@Controller('.well-known/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaIndicator: PrismaHealthIndicator,
    private redisIndicator: RedisHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
      () => this.redisIndicator.isHealthy('redis'),
    ]);
  }
}

```

# FILE: apps/backend/src/health/health.module.ts

```
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './indicators/redis.health';

@Module({
  imports: [TerminusModule, PrismaModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator],
})
export class HealthModule {}

```

# FILE: apps/backend/src/health/indicators/redis.health.ts

```
import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private client = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
    {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    },
  );

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      if (this.client.status !== 'ready') await this.client.connect();
      await this.client.ping();
      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError(
        'Redis check failed',
        this.getStatus(key, false, { message: e.message }),
      );
    }
  }
}

```

# FILE: apps/backend/src/health/redis.health.ts

```
import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private client = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
    {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
      retryStrategy: () => null,
    },
  );

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      if (this.client.status !== 'ready') await this.client.connect();
      await this.client.ping();
      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError(
        'Redis check failed',
        this.getStatus(key, false, { message: e.message }),
      );
    }
  }
}

```

# FILE: apps/backend/src/instrument.ts

```
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
});

```

# FILE: apps/backend/src/issues/dto/create-issue.dto.ts

```
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIssueDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ example: 'Ліцей №5' })
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty({ example: 'Голографічне шоу «Космос»' })
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({ example: 'Не вистачає проєктора' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: '2026-09-20' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  assignedUserId?: string;

  @ApiPropertyOptional({ example: 'Марія Демчук' })
  @IsOptional()
  @IsString()
  assignedUserName?: string;
}

```

# FILE: apps/backend/src/issues/dto/update-issue-status.dto.ts

```
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIssueStatusDto {
  @ApiProperty({ example: 'Вирішено' })
  @IsString()
  @IsNotEmpty()
  status: string;
}

```

# FILE: apps/backend/src/issues/issues.controller.ts

```
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
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { IssuesService } from './issues.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueStatusDto } from './dto/update-issue-status.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Issues')
@ApiCookieAuth('access_token')
@Controller('issues')
@UseGuards(AuthGuard, RolesGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'Створити проблему по заходу' })
  @Post()
  create(@Body() body: CreateIssueDto) {
    return this.issuesService.create(body);
  }

  @ApiOperation({ summary: 'Список проблем по місту' })
  @Get()
  findByCityId(@Query('cityId') cityId: string) {
    return this.issuesService.findByCityId(cityId);
  }

  @ApiOperation({ summary: 'Оновити статус проблеми' })
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateIssueStatusDto) {
    return this.issuesService.updateStatus(id, body.status);
  }
}

```

# FILE: apps/backend/src/issues/issues.module.ts

```
import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}

```

# FILE: apps/backend/src/issues/issues.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  async create(data: {
    eventId: string;
    schoolName: string;
    eventName: string;
    message: string;
    cityId: string;
    deadline?: string;
    assignedUserId?: string;
    assignedUserName?: string;
  }) {
    const issue = await this.prisma.issueReport.create({
      data: {
        eventId: data.eventId,
        schoolName: data.schoolName,
        eventName: data.eventName,
        message: data.message,
        cityId: data.cityId,
        deadline: data.deadline ? new Date(data.deadline) : null,
        assignedUserId: data.assignedUserId || null,
        assignedUserName: data.assignedUserName || null,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
      include: {
        crew: {
          include: {
            host: { select: { name: true, telegramId: true } },
            driver: { select: { name: true, telegramId: true } },
          },
        },
      },
    });

    const formatMember = (user: {
      name: string;
      telegramId: string | null;
    }) => {
      if (!user.telegramId) return user.name;
      const clean = user.telegramId.replace(/^@/, '');
      return /^\d+$/.test(clean) ? user.name : `@${clean} (${user.name})`;
    };

    const crewMembers: string[] = [];
    if (event?.crew?.host)
      crewMembers.push(`🎙️ Ведучий: ${formatMember(event.crew.host)}`);
    if (event?.crew?.driver)
      crewMembers.push(`🚗 Водій: ${formatMember(event.crew.driver)}`);

    const city = await this.prisma.city.findUnique({
      where: { id: data.cityId },
      include: { users: { where: { role: 'MANAGER' }, take: 1 } },
    });

    let assigneeChatId: string | null = null;
    if (data.assignedUserId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: data.assignedUserId },
        select: { telegramChatId: true, telegramId: true },
      });
      assigneeChatId =
        assignee?.telegramChatId ||
        (assignee?.telegramId && /^\d+$/.test(assignee.telegramId)
          ? assignee.telegramId
          : null);
    }

    const deadlineStr = data.deadline
      ? `\n⏰ <b>Дедлайн:</b> ${new Date(data.deadline).toLocaleDateString('uk-UA')}`
      : '';

    const assigneeStr = data.assignedUserName
      ? `\n👤 <b>Відповідальний:</b> ${data.assignedUserName}`
      : '';

    const manager = city?.users?.[0];
    const managerChatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    const text =
      `🚨 <b>Нова проблема!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
      `📅 <b>Подія:</b> ${data.eventName}\n\n` +
      `💬 <b>Повідомлення:</b>\n${data.message}` +
      deadlineStr +
      assigneeStr +
      (crewMembers.length > 0
        ? `\n\n👥 <b>Екіпаж:</b>\n${crewMembers.join('\n')}`
        : '') +
      `\n\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    if (managerChatId)
      await this.telegramService.sendMessage(managerChatId, text);

    if (assigneeChatId && assigneeChatId !== managerChatId) {
      await this.telegramService.sendMessage(assigneeChatId, text);
    }

    return issue;
  }

  async findByCityId(cityId: string) {
    return this.prisma.issueReport.findMany({
      where: {
        cityId,
        status: { not: 'Виконано' },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.issueReport.update({
      where: { id },
      data: { status },
    });
  }
}

```

# FILE: apps/backend/src/main.ts

```
import './instrument';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.use(cookieParser());

  const allowedOrigins = (process.env.FRONTEND_URL ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(app.get(AllExceptionsFilter));

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('CRM «Світло Знань» API')
      .setDescription(
        'Система управління освітніми заходами у школах та садочках',
      )
      .setVersion('1.0')
      .addCookieAuth('access_token')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.getHttpAdapter().get('/docs-json', (req, res) => res.json(document));
    app.getHttpAdapter().get('/docs/redoc', (req, res) => {
      res.type('html').send(`<!DOCTYPE html>
<html><head><title>CRM API Docs</title>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>body{margin:0;padding:0}</style></head>
<body><redoc spec-url="/docs-json"></redoc>
<script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
</body></html>`);
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

# FILE: apps/backend/src/metrics/metrics.controller.ts

```
import { Controller, Get, Header } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metrics: MetricsService) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  async getMetrics() {
    return this.metrics.getMetrics();
  }
}

```

# FILE: apps/backend/src/metrics/metrics.interceptor.ts

```
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { httpRequestDuration } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
        const route = req.route?.path ?? req.url;
        httpRequestDuration.observe(
          { method: req.method, route, status_code: res.statusCode },
          durationSec,
        );
      }),
    );
  }
}

```

# FILE: apps/backend/src/metrics/metrics.module.ts

```
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MetricsInterceptor } from './metrics.interceptor';

@Global()
@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    { provide: APP_INTERCEPTOR, useClass: MetricsInterceptor },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}

```

# FILE: apps/backend/src/metrics/metrics.service.ts

```
import { Injectable } from '@nestjs/common';
import { Registry, Histogram, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();
collectDefaultMetrics({ register: registry });

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [registry],
});

export const dbQueryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  help: 'Prisma query duration',
  labelNames: ['model', 'action'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2],
  registers: [registry],
});

@Injectable()
export class MetricsService {
  getMetrics() {
    return registry.metrics();
  }
  getContentType() {
    return registry.contentType;
  }
}

```

# FILE: apps/backend/src/prisma/prisma.mock.ts

```
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from './prisma.service';
export type MockPrismaService = DeepMockProxy<PrismaService>;

export const createPrismaMock = (): MockPrismaService => {
  return mockDeep<PrismaService>();
};

```

# FILE: apps/backend/src/prisma/prisma.module.ts

```
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

@Global()
@Module({
  providers: [PrismaService, OwnershipGuard],
  exports: [PrismaService, OwnershipGuard],
})
export class PrismaModule {}

```

# FILE: apps/backend/src/prisma/prisma.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

# FILE: apps/backend/src/prisma/prisma.service.ts

```
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dbQueryDuration } from '../metrics/metrics.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const start = process.hrtime.bigint();
            const result = await query(args);
            const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
            dbQueryDuration.observe(
              { model: model ?? 'unknown', action: operation },
              durationSec,
            );
            return result;
          },
        },
      },
    }) as unknown as PrismaService;
  }

  async onModuleInit() {
    await this.$connect();
  }
}

```

# FILE: apps/backend/src/projects/dto/create-project.dto.ts

```
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Голографічне шоу «Космос»' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'blue' })
  @IsOptional()
  @IsString()
  color?: string;
}

```

# FILE: apps/backend/src/projects/projects.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Projects')
@ApiCookieAuth('access_token')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Список проєктів (типів шоу)' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Створити проєкт' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @ApiOperation({ summary: 'Видалити проєкт' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

```

# FILE: apps/backend/src/projects/projects.module.ts

```
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}

```

# FILE: apps/backend/src/projects/projects.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  }

  create(data: { name: string; color?: string }) {
    return this.prisma.project.create({
      data: { name: data.name, color: data.color ?? '#3b82f6' },
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}

```

# FILE: apps/backend/src/schools/dto/bulk-import.dto.ts

```
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BulkImportDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'Школа', enum: ['Школа', 'Садочок'] })
  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

# FILE: apps/backend/src/schools/dto/create-school.dto.ts

```
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Ліцей №5' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'school', enum: ['school', 'kindergarten'] })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'https://example.com/school-page' })
  @IsOptional()
  @IsString()
  sourceUrl?: string;
}

```

# FILE: apps/backend/src/schools/dto/find-contacts-query.dto.ts

```
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

# FILE: apps/backend/src/schools/dto/find-schools-query.dto.ts

```
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

# FILE: apps/backend/src/schools/dto/school-query.dto.ts

```
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

# FILE: apps/backend/src/schools/dto/update-school.dto.ts

```
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

# FILE: apps/backend/src/schools/parser.service.ts

```
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const CITY_CONFIG: Record<
  string,
  { schools: string; kindergartens: string; domain: string }
> = {
  Львів: {
    domain: 'https://lv.isuo.org',
    schools: 'https://lv.isuo.org/authorities/schools-list/id/681',
    kindergartens: 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
  },
  'Івано-Франківськ': {
    domain: 'https://if.isuo.org',
    schools: 'https://if.isuo.org/koatuu/schools-list/id/2610100000',
    kindergartens: 'https://if.isuo.org/koatuu/preschools-list/id/2610100000',
  },
  Чернівці: {
    domain: 'https://cv.isuo.org',
    schools: 'https://cv.isuo.org/koatuu/schools-list/id/7310100000',
    kindergartens: 'https://cv.isuo.org/koatuu/preschools-list/id/7310100000',
  },
  Тернопіль: {
    domain: 'https://te.isuo.org',
    schools: 'https://te.isuo.org/koatuu/schools-list/id/6110100000',
    kindergartens: 'https://te.isuo.org/koatuu/preschools-list/id/6110100000',
  },
  Ужгород: {
    domain: 'https://zk.isuo.org',
    schools: 'https://zk.isuo.org/koatuu/schools-list/id/2110100000',
    kindergartens: 'https://zk.isuo.org/koatuu/preschools-list/id/2110100000',
  },
  Київ: {
    domain: 'https://kv.isuo.org',
    schools: 'https://kv.isuo.org/koatuu/schools-list/id/8000000000',
    kindergartens: 'https://kv.isuo.org/koatuu/preschools-list/id/8000000000',
  },
  Харків: {
    domain: 'https://kh.isuo.org',
    schools: 'https://kh.isuo.org/koatuu/schools-list/id/6310100000',
    kindergartens: 'https://kh.isuo.org/koatuu/preschools-list/id/6310100000',
  },
  Одеса: {
    domain: 'https://od.isuo.org',
    schools: 'https://od.isuo.org/koatuu/schools-list/id/5110100000',
    kindergartens: 'https://od.isuo.org/koatuu/preschools-list/id/5110100000',
  },
  Дніпро: {
    domain: 'https://dp.isuo.org',
    schools: 'https://dp.isuo.org/koatuu/schools-list/id/1210100000',
    kindergartens: 'https://dp.isuo.org/koatuu/preschools-list/id/1210100000',
  },
  Запоріжжя: {
    domain: 'https://zp.isuo.org',
    schools: 'https://zp.isuo.org/koatuu/schools-list/id/2310100000',
    kindergartens: 'https://zp.isuo.org/koatuu/preschools-list/id/2310100000',
  },
  Миколаїв: {
    domain: 'https://mk.isuo.org',
    schools: 'https://mk.isuo.org/koatuu/schools-list/id/4810100000',
    kindergartens: 'https://mk.isuo.org/koatuu/preschools-list/id/4810100000',
  },
  Вінниця: {
    domain: 'https://vn.isuo.org',
    schools: 'https://vn.isuo.org/koatuu/schools-list/id/0510100000',
    kindergartens: 'https://vn.isuo.org/koatuu/preschools-list/id/0510100000',
  },
  Херсон: {
    domain: 'https://ks.isuo.org',
    schools: 'https://ks.isuo.org/koatuu/schools-list/id/6510100000',
    kindergartens: 'https://ks.isuo.org/koatuu/preschools-list/id/6510100000',
  },
  Полтава: {
    domain: 'https://pl.isuo.org',
    schools: 'https://pl.isuo.org/koatuu/schools-list/id/5310100000',
    kindergartens: 'https://pl.isuo.org/koatuu/preschools-list/id/5310100000',
  },
  Чернігів: {
    domain: 'https://cg.isuo.org',
    schools: 'https://cg.isuo.org/koatuu/schools-list/id/7410100000',
    kindergartens: 'https://cg.isuo.org/koatuu/preschools-list/id/7410100000',
  },
  Черкаси: {
    domain: 'https://ck.isuo.org',
    schools: 'https://ck.isuo.org/koatuu/schools-list/id/7110100000',
    kindergartens: 'https://ck.isuo.org/koatuu/preschools-list/id/7110100000',
  },
  Суми: {
    domain: 'https://su.isuo.org',
    schools: 'https://su.isuo.org/koatuu/schools-list/id/5910100000',
    kindergartens: 'https://su.isuo.org/koatuu/preschools-list/id/5910100000',
  },
  Житомир: {
    domain: 'https://zt.isuo.org',
    schools: 'https://zt.isuo.org/koatuu/schools-list/id/1810100000',
    kindergartens: 'https://zt.isuo.org/koatuu/preschools-list/id/1810100000',
  },
  Хмельницький: {
    domain: 'https://km.isuo.org',
    schools: 'https://km.isuo.org/koatuu/schools-list/id/6810100000',
    kindergartens: 'https://km.isuo.org/koatuu/preschools-list/id/6810100000',
  },
  Рівне: {
    domain: 'https://rv.isuo.org',
    schools: 'https://rv.isuo.org/koatuu/schools-list/id/5610100000',
    kindergartens: 'https://rv.isuo.org/koatuu/preschools-list/id/5610100000',
  },
  Кропивницький: {
    domain: 'https://kr.isuo.org',
    schools: 'https://kr.isuo.org/koatuu/schools-list/id/3510100000',
    kindergartens: 'https://kr.isuo.org/koatuu/preschools-list/id/3510100000',
  },
  Луцьк: {
    domain: 'https://vl.isuo.org',
    schools: 'https://vl.isuo.org/koatuu/schools-list/id/0710100000',
    kindergartens: 'https://vl.isuo.org/koatuu/preschools-list/id/0710100000',
  },
};

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
    try {
      let url = schoolUrl;
      if (!url) {
        const urls =
          type === 'Садочок'
            ? [
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
              ]
            : [
                'https://lv.isuo.org/authorities/schools-list/id/681',
                'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
              ];
        const normalizedSearch = schoolName
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
        for (const searchUrl of urls) {
          const listResponse = await axios.get(searchUrl);
          const $list = cheerio.load(listResponse.data);
          $list('table.zebra-stripe.list tr').each((_, row) => {
            const name = $list(row)
              .find('td:nth-child(2) a')
              .text()
              .replace(/\s+/g, ' ')
              .trim()
              .toLowerCase();
            if (name.includes(normalizedSearch)) {
              const href = $list(row).find('td:nth-child(2) a').attr('href');
              if (href) {
                url = `https://lv.isuo.org${href}`;
                return false;
              }
            }
          });
          if (url) break;
        }
      }
      if (!url) {
        console.log(`Заклад не знайдено: ${schoolName}`);
        return null;
      }
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const getField = (labels: string[]): string => {
        let result = '';
        for (const label of labels) {
          const th = $('th')
            .filter((_, el) => $(el).text().trim().includes(label))
            .first();
          if (th.length) {
            result = th.next('td').text().trim();
            break;
          }
        }
        return result;
      };
      const address = getField(['Поштова адреса', 'Адреса']);
      const director = getField(['Директор', 'Завідувач', 'Керівник']);
      const studentsRaw = getField([
        'Кількість учнів',
        'Кількість дітей',
        'Кількість вихованців',
      ]);
      const childrenCount =
        parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;
      return { address, director, childrenCount };
    } catch (error) {
      console.error('Помилка парсингу закладу:', error);
      return null;
    }
  }

  async searchSchools(
    query: string,
    type?: string,
  ): Promise<{ name: string; url: string }[]> {
    try {
      const urls =
        type === 'Садочок'
          ? [
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
            ]
          : [
              'https://lv.isuo.org/authorities/schools-list/id/681',
              'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
            ];
      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      const isNumericQuery = /^\d+$/.test(normalizedQuery);
      const numericRegex = isNumericQuery
        ? new RegExp(`(?<!\d)${normalizedQuery}(?!\d)`)
        : null;
      for (const url of urls) {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        $('table.zebra-stripe.list tr').each((_, row) => {
          const rawName = $(row).find('td:nth-child(2) a').text();
          const name = rawName.replace(/\s+/g, ' ').trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');
          if (name && href) {
            const lowerName = name.toLowerCase();
            let matches = false;
            if (isNumericQuery && numericRegex) {
              matches = numericRegex.test(lowerName);
            } else {
              matches = lowerName.includes(normalizedQuery);
            }
            if (matches)
              results.push({ name, url: `https://lv.isuo.org${href}` });
          }
        });
      }
      return results.slice(0, 10);
    } catch (error) {
      console.error('Помилка пошуку закладів:', error);
      return [];
    }
  }

  async getAllSchoolsForCity(
    cityName: string,
    type: 'Школа' | 'Садочок' = 'Школа',
  ): Promise<{ name: string; url: string }[]> {
    const config = CITY_CONFIG[cityName];
    if (!config) {
      console.log(`Місто "${cityName}" не підтримується для імпорту`);
      return [];
    }

    const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
    const domain = config.domain;

    const resultsMap = new Map<string, { name: string; url: string }>();

    for (let page = 1; page <= 20; page++) {
      const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
      try {
        const response = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(response.data);
        let foundOnPage = 0;

        $('table.zebra-stripe.list tr').each((_, row) => {
          const name = $(row)
            .find('td:nth-child(2) a')
            .text()
            .replace(/\s+/g, ' ')
            .trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');

          if (name && href && name !== 'Fullname') {
            const normalizedKey = name.toLowerCase().replace(/\s+/g, '');

            if (!resultsMap.has(normalizedKey)) {
              resultsMap.set(normalizedKey, { name, url: `${domain}${href}` });
              foundOnPage++;
            }
          }
        });

        if (foundOnPage === 0) break;
      } catch {
        break;
      }
    }

    return Array.from(resultsMap.values());
  }
  getSupportedCities(): string[] {
    return Object.keys(CITY_CONFIG);
  }
}

```

# FILE: apps/backend/src/schools/school-contacts.seed.ts

```
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contacts = [
  {
    schoolNumber: '1',
    contactName: 'Надія Михайлівна',
    phone: '0975695519',
    role: 'Завуч',
  },
  {
    schoolNumber: '2',
    contactName: 'Наталя',
    phone: '0974064095',
    role: 'Завуч',
  },
  {
    schoolNumber: '5',
    contactName: 'Лариса',
    phone: '0673622534',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Віра Ярославівна',
    phone: '0674935124',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Леся',
    phone: '0673380894',
    role: 'Завуч',
  },
  {
    schoolNumber: '13',
    contactName: 'Марта Романівна',
    phone: '0675839806',
    role: 'Директор',
  },
  {
    schoolNumber: '15',
    contactName: 'Ірина Андріївна',
    phone: '0679062500',
    role: 'Завуч',
  },
  {
    schoolNumber: '17',
    contactName: 'Ельвіра',
    phone: '0678578514',
    role: 'Педорг',
  },
  {
    schoolNumber: '18',
    contactName: 'Роман',
    phone: '0972587179',
    role: 'Завуч',
  },
  {
    schoolNumber: '20',
    contactName: 'Наталя Іванівна',
    phone: '0506747111',
    role: 'Завуч',
  },
  {
    schoolNumber: '23',
    contactName: 'Микола Шостак',
    phone: '0632232178',
    role: 'Педорг',
  },
  {
    schoolNumber: '27',
    contactName: 'Романа Михайлівна',
    phone: '0973113778',
    role: 'Завуч',
  },
  {
    schoolNumber: '27',
    contactName: 'Наталя Куліш',
    phone: '0677552743',
    role: 'Завуч',
  },
  {
    schoolNumber: '28',
    contactName: 'Олена Олегівна',
    phone: '0679243130',
    role: 'Завуч',
  },
  {
    schoolNumber: '30',
    contactName: 'Світлана Михальвіна',
    phone: '0974436542',
    role: 'Завуч',
  },
  {
    schoolNumber: '30',
    contactName: 'Ольга Володимирівна',
    phone: '0679596199',
    role: 'Завуч',
  },
  {
    schoolNumber: '31',
    contactName: 'Христина Ярославівна',
    phone: '0983804403',
    role: 'Директор',
  },
  {
    schoolNumber: '31',
    contactName: 'Леся Оресівна',
    phone: '0673567679',
    role: 'Завуч',
  },
  {
    schoolNumber: '34',
    contactName: 'Мирон',
    phone: '0938668520',
    role: 'Педорг',
  },
  {
    schoolNumber: '36',
    contactName: 'Тетяна',
    phone: '0990407941',
    role: 'Завуч',
  },
  {
    schoolNumber: '40',
    contactName: 'Юлія',
    phone: '0976015839',
    role: 'Педорг',
  },
  {
    schoolNumber: '40',
    contactName: 'Ірина',
    phone: '0673021531',
    role: 'Педорг',
  },
  {
    schoolNumber: '44',
    contactName: 'Стефанович Людмила Олександрівна',
    phone: '0677838274',
    role: 'Директор',
  },
  {
    schoolNumber: '45',
    contactName: 'Наталія Аркадіївна',
    phone: '0677123961',
    role: 'Завуч',
  },
  {
    schoolNumber: '46',
    contactName: 'Ірина Іларіонівна',
    phone: '0676969337',
    role: 'Завуч',
  },
  {
    schoolNumber: '46',
    contactName: 'Юля',
    phone: '0961791595',
    role: 'Педорг',
  },
  {
    schoolNumber: '48',
    contactName: 'Роман Васильович',
    phone: '0982310957',
    role: 'Директор',
  },
  {
    schoolNumber: '49',
    contactName: 'Уляна',
    phone: '0681371457',
    role: 'Педорг',
  },
  {
    schoolNumber: '50',
    contactName: "Мар'яна Іванівна",
    phone: '0674901746',
    role: 'Завуч',
  },
  {
    schoolNumber: '51',
    contactName: 'Ірина Миколаївна',
    phone: '0972595956',
    role: 'Завуч',
  },
  {
    schoolNumber: '52',
    contactName: 'Світлана',
    phone: '0677070497',
    role: 'Директор',
  },
  {
    schoolNumber: '54',
    contactName: 'Любов Іванівна',
    phone: '0677715647',
    role: 'Завуч',
  },
  {
    schoolNumber: '60',
    contactName: 'Людмила',
    phone: '0973888255',
    role: 'Директор',
  },
  {
    schoolNumber: '63',
    contactName: 'Іванець Ольга Євгенівна',
    phone: '0977345920',
    role: 'Завуч',
  },
  {
    schoolNumber: '65',
    contactName: 'Марія',
    phone: '0975391164',
    role: 'Педорг',
  },
  {
    schoolNumber: '66',
    contactName: 'Мирослава',
    phone: '0977711381',
    role: 'Завуч',
  },
  {
    schoolNumber: '66',
    contactName: 'Назар Оксана',
    phone: '0679686514',
    role: 'Завуч',
  },
  {
    schoolNumber: '67',
    contactName: 'Оксана Володимирівна',
    phone: '0673705262',
    role: 'Завуч',
  },
  {
    schoolNumber: '68',
    contactName: 'Уляна',
    phone: '0973004954',
    role: 'Педорг',
  },
  {
    schoolNumber: '69',
    contactName: 'Тетяна Володимирівна',
    phone: '0673041659',
    role: 'Завуч',
  },
  {
    schoolNumber: '70',
    contactName: 'Марта',
    phone: '0676726984',
    role: 'Директор',
  },
  {
    schoolNumber: '70',
    contactName: 'Марія',
    phone: '0966063264',
    role: 'Завуч',
  },
  {
    schoolNumber: '71',
    contactName: 'Марія',
    phone: '0676644983',
    role: 'Педорг',
  },
  {
    schoolNumber: '71',
    contactName: 'Роман',
    phone: '0677514127',
    role: 'Директор',
  },
  {
    schoolNumber: '72',
    contactName: 'Олена Михайлівна',
    phone: '0677948577',
    role: 'Завуч',
  },
  {
    schoolNumber: '73',
    contactName: 'Світлана Богданівна',
    phone: '0971844043',
    role: 'Директор',
  },
  {
    schoolNumber: '73',
    contactName: 'Інна Євгенівна',
    phone: '0678829581',
    role: 'Завуч',
  },
  {
    schoolNumber: '80',
    contactName: 'Наталя',
    phone: '0967331419',
    role: 'Завуч',
  },
  {
    schoolNumber: '81',
    contactName: 'Галина Антонівна',
    phone: '0673662853',
    role: 'Завуч',
  },
  {
    schoolNumber: '81',
    contactName: 'Андріана',
    phone: '0502867516',
    role: 'Завуч',
  },
  {
    schoolNumber: '84',
    contactName: 'Тетяна Іванівна',
    phone: '0974437171',
    role: 'Завуч',
  },
  {
    schoolNumber: '86',
    contactName: 'Руслана Василівна',
    phone: '0964066413',
    role: 'Директор',
  },
  {
    schoolNumber: '86',
    contactName: 'Анна',
    phone: '0638694484',
    role: 'Педорг',
  },
  {
    schoolNumber: '90',
    contactName: 'Ірина Іванівна',
    phone: '0974392839',
    role: 'Завуч',
  },
  {
    schoolNumber: '90',
    contactName: 'Людмила',
    phone: '0676092693',
    role: 'Завуч',
  },
  {
    schoolNumber: '93',
    contactName: 'Ірина Петрівна',
    phone: '0966591509',
    role: 'Директор',
  },
  {
    schoolNumber: '95',
    contactName: 'Марія Орестівна',
    phone: '0979515318',
    role: 'Завуч',
  },
  {
    schoolNumber: '95',
    contactName: 'Ірина',
    phone: '0972392191',
    role: 'Педорг',
  },
  {
    schoolNumber: '96',
    contactName: 'Любов',
    phone: '0689529174',
    role: 'Педорг',
  },
  {
    schoolNumber: '97',
    contactName: 'Наталя Любомирівна',
    phone: '0961390913',
    role: 'Завуч',
  },
  {
    schoolNumber: '123',
    contactName: 'Марія Андріївна',
    phone: '0679334856',
    role: 'Директор',
  },

  {
    schoolNumber: 'Арніка',
    contactName: 'Світлана Михайлівна',
    phone: '0979325399',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Гроно',
    contactName: 'Оксана Теодорівна',
    phone: '0971147211',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Джерельце',
    contactName: 'Світлана Петрівна',
    phone: '0673140267',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Дивосвіт',
    contactName: 'Наталя Миколаївна',
    phone: '0932196651',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Європейський ліцей',
    contactName: 'Галина Богданівна',
    phone: '0974829920',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Лідер',
    contactName: 'Вадим',
    phone: '0687584626',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Лідер',
    contactName: 'Іванка',
    phone: '0965150436',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Львів',
    contactName: 'Мирослава Іванівна',
    phone: '0673536774',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Пулюя',
    contactName: 'Наталя',
    phone: '0671794604',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Стуса',
    contactName: 'Тетяна',
    phone: '0984989494',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Оріяна',
    contactName: 'Ірина Богданівна',
    phone: '0673702402',
    role: 'Директор',
  },
  {
    schoolNumber: 'Оріяна',
    contactName: 'Юрій',
    phone: '0974751935',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Первоцвіт',
    contactName: 'Христина Іванівна',
    phone: '0677573109',
    role: 'Директор',
  },
  {
    schoolNumber: 'Провесінь',
    contactName: 'Сергій',
    phone: '0506020447',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Провесінь',
    contactName: 'Анджела',
    phone: '0676606897',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Лідія Миколаївна',
    phone: '0679269319',
    role: 'Директор',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Ореста Шот',
    phone: '0677018705',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Ірина',
    phone: '0674398980',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Симоненка',
    contactName: 'Уляна',
    phone: '0969135903',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Сихівський ліцей',
    contactName: 'Надія',
    phone: '0964667179',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Початкова Школа Радості',
    contactName: 'Тетяна',
    phone: '0967320197',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Початкова Школа Радості',
    contactName: 'Наталя',
    phone: '0674244920',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Альфа',
    contactName: 'Ірина',
    phone: '0935122623',
    role: 'Завуч',
  },

  {
    schoolNumber: '52',
    contactName: 'Олена Віталіївна Добранюк',
    phone: '0964692943',
    role: 'Завідувачка',
  },
  {
    schoolNumber: 'Веселка',
    contactName: 'Андриц Людмила Федорівна',
    phone: '0632836453',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '149',
    contactName: 'Василина Тарасівна',
    phone: '0987615106',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '132',
    contactName: 'Наталя',
    phone: '0971620805',
    role: 'Методист',
  },
  {
    schoolNumber: 'Перші кроки',
    contactName: 'Мирослава Ярославівна',
    phone: '0963493423',
    role: 'Завідувач',
  },
  {
    schoolNumber: '130',
    contactName: 'Ольга',
    phone: '0638694484',
    role: 'Методистка',
  },
  {
    schoolNumber: '40',
    contactName: 'Світлана',
    phone: '0983365931',
    role: 'Заступник',
  },
  {
    schoolNumber: '144',
    contactName: 'Наталя',
    phone: '0677670485',
    role: 'Методист',
  },
  {
    schoolNumber: 'Барвінок',
    contactName: 'Наталя Витрикуш',
    phone: '0676809966',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '45',
    contactName: 'Наталя Шергіна',
    phone: '0675814381',
    role: 'Директор',
  },
  {
    schoolNumber: '67',
    contactName: 'Тетяна Юріївна',
    phone: '0966063398',
    role: 'Директор',
  },
  {
    schoolNumber: '118',
    contactName: 'Наталя Дмитрівна',
    phone: '0969847495',
    role: 'Директор',
  },
  {
    schoolNumber: '118',
    contactName: 'Оксана Ярославівна',
    phone: '0677881629',
    role: 'Методист',
  },
  {
    schoolNumber: '169',
    contactName: 'Галина Василівна',
    phone: '0962817175',
    role: null,
  },
  {
    schoolNumber: '175',
    contactName: 'Богдана',
    phone: '0687096641',
    role: 'Директор',
  },
  {
    schoolNumber: '170',
    contactName: 'Ірина',
    phone: '0986373627',
    role: null,
  },
  {
    schoolNumber: '167',
    contactName: 'Юлія',
    phone: '0687096641',
    role: 'Директор',
  },
  {
    schoolNumber: '42',
    contactName: 'Наталя Йосипівна',
    phone: '0677453052',
    role: null,
  },
  {
    schoolNumber: '33',
    contactName: 'Олександра Мирославівна',
    phone: '0505049049',
    role: null,
  },
  { schoolNumber: '134', contactName: 'Леся', phone: '0969740462', role: null },
  {
    schoolNumber: '165',
    contactName: 'Марта Андріївна',
    phone: '0639377896',
    role: null,
  },
  {
    schoolNumber: '159',
    contactName: 'Ірина Олександрівна',
    phone: '0972430286',
    role: null,
  },
  {
    schoolNumber: '163',
    contactName: 'Оксана Ярославівна Сновидович',
    phone: '0963943974',
    role: null,
  },
  {
    schoolNumber: '153',
    contactName: 'Юля',
    phone: '0939907888',
    role: 'Методист',
  },
  {
    schoolNumber: '39',
    contactName: 'Оксана Антонівна',
    phone: '0676820705',
    role: null,
  },
  {
    schoolNumber: '73',
    contactName: 'Ярослава',
    phone: '0679767575',
    role: null,
  },
  {
    schoolNumber: '134',
    contactName: 'Ольга',
    phone: '0679495251',
    role: 'Заступник',
  },
  {
    schoolNumber: '69',
    contactName: 'Уляна',
    phone: '0673392742',
    role: 'Директор',
  },
  {
    schoolNumber: '130',
    contactName: 'Зоряна',
    phone: '0677014722',
    role: null,
  },
  {
    schoolNumber: '52',
    contactName: 'Софія',
    phone: '0935428770',
    role: 'Діловод',
  },
  {
    schoolNumber: '181',
    contactName: 'Марія Корпан',
    phone: '0673142095',
    role: 'Директор',
  },
  {
    schoolNumber: '17',
    contactName: 'Світлана',
    phone: '0973047285',
    role: 'Директор',
  },
  {
    schoolNumber: '44',
    contactName: 'Надія',
    phone: '0932342106',
    role: 'Методист',
  },
  {
    schoolNumber: '170',
    contactName: 'Ірина',
    phone: '0986373627',
    role: 'Методист',
  },
  {
    schoolNumber: '3',
    contactName: 'Наталя Ігорівна',
    phone: '0973436380',
    role: null,
  },
  {
    schoolNumber: '176',
    contactName: 'Юлія Андріївна',
    phone: '0665244245',
    role: 'Директор',
  },
  {
    schoolNumber: '179',
    contactName: 'Віра Володимирівна',
    phone: '0672590052',
    role: 'Директор',
  },
  {
    schoolNumber: 'Вільні',
    contactName: 'Іванна Михайлівна',
    phone: '0974788019',
    role: 'Директор',
  },
  {
    schoolNumber: '105',
    contactName: 'Лідія Василівна',
    phone: '0679592370',
    role: 'Директор',
  },
  {
    schoolNumber: '7',
    contactName: 'Уляна Богданівна',
    phone: '0674256644',
    role: 'Директор',
  },
  {
    schoolNumber: '168',
    contactName: 'Ядельська Оксана Богданівна',
    phone: '0969105724',
    role: 'Директор',
  },
  {
    schoolNumber: '139',
    contactName: 'Ірина',
    phone: '0970488672',
    role: 'Директор',
  },
  {
    schoolNumber: '167',
    contactName: 'Зоряна Ярославівна',
    phone: '0672684699',
    role: 'Директор',
  },
  {
    schoolNumber: '38',
    contactName: 'Ірина Олегівна',
    phone: '0679475122',
    role: null,
  },
  {
    schoolNumber: '132',
    contactName: 'Надія Леонівна',
    phone: '0974429599',
    role: 'Директор',
  },
  {
    schoolNumber: '92',
    contactName: 'Ольга',
    phone: '0679492252',
    role: 'Директор',
  },
  {
    schoolNumber: '33',
    contactName: 'Леся Породько',
    phone: '0505049049',
    role: 'Директор',
  },
  {
    schoolNumber: '155',
    contactName: 'Ірина Михайлівна',
    phone: '0677301582',
    role: 'Директор',
  },
  {
    schoolNumber: '183',
    contactName: 'Володимир Михайлович',
    phone: '0970256488',
    role: 'Директор',
  },
  {
    schoolNumber: '70',
    contactName: 'Ольга Петрівна',
    phone: '0936992997',
    role: 'Директор',
  },
  {
    schoolNumber: '18',
    contactName: 'Наталя Бондаренко',
    phone: '0505938826',
    role: 'Директор',
  },
  {
    schoolNumber: '131',
    contactName: 'Любомира',
    phone: '0673657490',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Зоряна Семенівна',
    phone: '0677628687',
    role: 'Директор',
  },
  {
    schoolNumber: '26',
    contactName: 'Ольга Іванівна',
    phone: '0977476237',
    role: 'Директор',
  },
  {
    schoolNumber: '23',
    contactName: 'Соломія Ігорівна',
    phone: '0975616807',
    role: 'Директор',
  },
  {
    schoolNumber: '1',
    contactName: 'Оксана',
    phone: '0675937156',
    role: 'Директор',
  },
  {
    schoolNumber: '109',
    contactName: 'Катерина Петрівна',
    phone: '0975173313',
    role: 'Директор',
  },
  {
    schoolNumber: '30',
    contactName: 'Олена Йосифівна',
    phone: '0974649258',
    role: 'Директор',
  },
  {
    schoolNumber: '51',
    contactName: 'Вікторія Романівна',
    phone: '0974207708',
    role: 'Директор',
  },
  {
    schoolNumber: '21',
    contactName: 'Анастасія Віталіївна',
    phone: '0671727948',
    role: 'Директор',
  },
  {
    schoolNumber: '75',
    contactName: 'Наталія Володимирівна',
    phone: '0972431888',
    role: 'Директор',
  },
  {
    schoolNumber: '166',
    contactName: "Мар'яна Михайлівна",
    phone: '0975300502',
    role: 'Директор',
  },
  {
    schoolNumber: '127',
    contactName: 'Галина Йосифівна',
    phone: '0963460339',
    role: 'Директор',
  },
  {
    schoolNumber: '86',
    contactName: 'Стефанія Миколаївна',
    phone: '0674936394',
    role: 'Директор',
  },
  {
    schoolNumber: '114',
    contactName: 'Ольга Володимирівна',
    phone: '0983673279',
    role: 'Директор',
  },
  {
    schoolNumber: '128',
    contactName: 'Лідія Михайлівна',
    phone: '0979790881',
    role: 'Директор',
  },
  {
    schoolNumber: 'Золотий ключик',
    contactName: 'Галина',
    phone: '0663914517',
    role: 'Методист',
  },
  {
    schoolNumber: 'Казка',
    contactName: 'Ірина Михайлівна',
    phone: '0677322435',
    role: 'Директор',
  },
  {
    schoolNumber: 'Львівський 2 сад',
    contactName: 'Олена Юріївна',
    phone: '0677270402',
    role: 'Директор',
  },
  {
    schoolNumber: '160',
    contactName: 'Віра Каролівна',
    phone: '0968009925',
    role: 'Директор',
  },
  {
    schoolNumber: '129',
    contactName: 'Оксана Зенонівна',
    phone: '0678112120',
    role: 'Директор',
  },
  {
    schoolNumber: '93',
    contactName: 'Марія Ярославівна',
    phone: '0676950870',
    role: 'Директор',
  },
  {
    schoolNumber: '48',
    contactName: 'Наталія Остапівна',
    phone: '0974428307',
    role: 'Директор',
  },
  {
    schoolNumber: '135',
    contactName: 'Галина Ярославівна',
    phone: '0673994741',
    role: 'Директор',
  },
  {
    schoolNumber: '188',
    contactName: 'Ірина Вікторівна',
    phone: '0933054378',
    role: 'Директор',
  },
  {
    schoolNumber: '25',
    contactName: 'Лілія Богданівна',
    phone: '0680215346',
    role: 'Директор',
  },
  {
    schoolNumber: '32',
    contactName: 'Наталія Василівна',
    phone: '0678119933',
    role: 'Директор',
  },
  {
    schoolNumber: '171',
    contactName: 'Ірина Корніївна',
    phone: '0972576026',
    role: 'Директор',
  },
  {
    schoolNumber: '96',
    contactName: 'Світлана Петрівна',
    phone: '0676739477',
    role: 'Директор',
  },
  {
    schoolNumber: '94',
    contactName: 'Оксана Ярославівна',
    phone: '0671447681',
    role: 'Директор',
  },
  {
    schoolNumber: '156/162',
    contactName: 'Оксана Ісламівна',
    phone: '0985835819',
    role: 'Директор',
  },
  {
    schoolNumber: '71',
    contactName: 'Валентина Гермогенівна',
    phone: '0976781981',
    role: 'Директор',
  },
  {
    schoolNumber: '187',
    contactName: 'Ольга Олексіївна',
    phone: '0674599119',
    role: 'Директор',
  },
  {
    schoolNumber: '14',
    contactName: 'Оксана Любомирівна',
    phone: '0677247619',
    role: 'Директор',
  },
  {
    schoolNumber: 'Любисток',
    contactName: 'Марія',
    phone: '0685227373',
    role: 'Методист',
  },
  {
    schoolNumber: '106',
    contactName: 'Галина Володимирівна',
    phone: '0675839839',
    role: 'Директор',
  },
  {
    schoolNumber: '104',
    contactName: 'Тетяна Ярославівна',
    phone: '0678034951',
    role: 'Директор',
  },
  {
    schoolNumber: '116',
    contactName: 'Ірина Іванівна',
    phone: '0968145853',
    role: 'Директор',
  },
  {
    schoolNumber: '57',
    contactName: 'Руслана Володимирівна',
    phone: '0966507883',
    role: 'Директор',
  },
  {
    schoolNumber: '184',
    contactName: 'Марія Іванівна',
    phone: '2546872',
    role: 'Директор',
  },
  {
    schoolNumber: '43',
    contactName: 'Віра',
    phone: '0984284448',
    role: 'Методист',
  },
  {
    schoolNumber: '29',
    contactName: 'Вікторія Олександрівна',
    phone: '0673041528',
    role: 'Директор',
  },
];

async function main() {
  console.log('Seeding school contacts...');

  await prisma.schoolContact.deleteMany({});

  for (const c of contacts) {
    await prisma.schoolContact.create({
      data: { city: 'Львів', ...c },
    });
  }

  console.log(`Done: ${contacts.length} contacts inserted`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

```

# FILE: apps/backend/src/schools/schools.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('SchoolsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: {} },
        { provide: ParserService, useValue: {} },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    expect(module.get(SchoolsController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/schools/schools.controller.ts

```
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
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
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
@ApiTags('Schools')
@ApiCookieAuth('access_token')
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @ApiOperation({
    summary: 'Масовий імпорт шкіл/садочків із зовнішнього джерела',
  })
  @Post('bulk-import')
  @Throttle({ default: { ttl: 300000, limit: 2 } })
  @Roles('SUPERADMIN', 'MANAGER')
  bulkImport(@Body() body: BulkImportDto) {
    return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
  }

  @ApiOperation({ summary: 'Список міст, підтримуваних парсером' })
  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @ApiOperation({ summary: 'Створити школу/садочок' })
  @Post()
  @Roles('SUPERADMIN', 'MANAGER')
  create(@Body() body: CreateSchoolDto) {
    return this.schoolsService.create(body);
  }

  @ApiOperation({ summary: 'Список закладів з фільтрами та пагінацією' })
  @Get()
  findAll(@Query() query: SchoolQueryDto) {
    return this.schoolsService.findAll(query);
  }

  @ApiOperation({ summary: 'Статистика закладів за стадією та розміром' })
  @Get('stats')
  getStats(
    @Query('cityId') cityId?: string,
    @Query('type') type?: 'Школа' | 'Садочок',
    @Query('stage') stage?: 'new' | 'planned' | 'inProgress' | 'done',
  ) {
    return this.schoolsService.getStats({ cityId, type, stage });
  }

  @ApiOperation({ summary: 'Пошук закладів у зовнішньому джерелі' })
  @Get('search')
  search(@Query() query: FindSchoolsQueryDto) {
    return this.parserService.searchSchools(query.q ?? '', query.type);
  }

  @ApiOperation({ summary: 'Отримати заклад за ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @ApiOperation({ summary: 'Оновити заклад' })
  @Patch(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити заклад' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @ApiOperation({ summary: 'Пошук контактів закладу' })
  @Get('contacts/search')
  searchContacts(@Query() query: FindContactsQueryDto) {
    return this.schoolsService.searchContacts(query.q ?? '', query.city);
  }
}

```

# FILE: apps/backend/src/schools/schools.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { EventsModule } from '../events/events.module';
import { ParserService } from './parser.service';

@Module({
  imports: [forwardRef(() => EventsModule)],
  controllers: [SchoolsController],
  providers: [SchoolsService, ParserService],
  exports: [SchoolsService, ParserService],
})
export class SchoolsModule {}

```

# FILE: apps/backend/src/schools/schools.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';

const mockPrisma = {
  school: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  event: { findMany: jest.fn() },
  schoolContact: { findMany: jest.fn() },
};

describe('SchoolsService', () => {
  let service: SchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: EventsService, useValue: { remove: jest.fn() } },
        {
          provide: ParserService,
          useValue: {
            parseSchoolData: jest.fn(),
            getAllSchoolsForCity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SchoolsService>(SchoolsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('повертає всі школи', async () => {
      mockPrisma.school.findMany.mockResolvedValue([
        { id: '1', name: 'Школа №1' },
      ]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(mockPrisma.school.findMany).toHaveBeenCalledTimes(1);
    });

    it('minimal=true — select без include', async () => {
      mockPrisma.school.findMany.mockResolvedValue([]);
      await service.findAll(true);
      const call = mockPrisma.school.findMany.mock.calls[0][0];
      expect(call.select).toBeDefined();
      expect(call.include).toBeUndefined();
    });
  });

  describe('findOne', () => {
    it('повертає школу по id', async () => {
      mockPrisma.school.findUnique.mockResolvedValue({
        id: '1',
        name: 'Школа №1',
      });
      const result = await service.findOne('1');
      expect(result?.name).toBe('Школа №1');
    });
  });

  describe('update', () => {
    it('оновлює школу без системних полів', async () => {
      mockPrisma.school.update.mockResolvedValue({
        id: '1',
        name: 'Нова назва',
      });
      await service.update('1', {
        id: '1',
        name: 'Нова назва',
        city: 'Львів',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const call = mockPrisma.school.update.mock.calls[0][0];
      expect(call.data.id).toBeUndefined();
      expect(call.data.city).toBeUndefined();
      expect(call.data.name).toBe('Нова назва');
    });
  });
});

```

# FILE: apps/backend/src/schools/schools.service.ts

```
import {
  Injectable,
  Logger,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { Prisma } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

@Injectable()
export class SchoolsService {
  private readonly logger = new Logger(SchoolsService.name);

  constructor(
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: {
    name: string;
    type: string;
    cityId: string;
    sourceUrl?: string;
    director?: string;
    phone?: string;
    address?: string;
    childrenCount?: number;
  }) {
    const { sourceUrl, ...schoolData } = data;

    const newSchool = await this.prisma.school.create({
      data: schoolData,
    });

    this.parserService
      .parseSchoolData(data.name, sourceUrl, data.type)
      .then(async (parsed) => {
        if (!parsed) {
          this.logger.warn(`Не вдалося знайти дані для закладу: ${data.name}`);
          return;
        }

        const updateData: Record<string, unknown> = {};

        if (!schoolData.address && parsed.address) {
          updateData.address = parsed.address;
        }
        if (!schoolData.director && parsed.director) {
          updateData.director = parsed.director;
        }
        if (!schoolData.childrenCount && parsed.childrenCount) {
          updateData.childrenCount = parsed.childrenCount;
        }

        if (Object.keys(updateData).length === 0) {
          this.logger.log(
            `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
          );
          return;
        }

        await this.prisma.school.update({
          where: {
            id: newSchool.id,
          },
          data: updateData,
        });

        this.logger.log(`Дані школи "${data.name}" успішно оновлені`);
      })
      .catch((error: Error) => {
        this.logger.error(`Помилка оновлення даних школи: ${error.message}`);
      });

    return newSchool;
  }

  private buildFilters(
    query: Pick<
      SchoolQueryDto,
      'search' | 'cityId' | 'type' | 'stage' | 'size'
    >,
  ): Prisma.Sql[] {
    const { search, cityId, type, stage, size } = query;
    const conditions: Prisma.Sql[] = [];

    if (search) {
      const trimmed = search.trim();
      const isNumeric = /^\d+$/.test(trimmed);

      if (isNumeric) {
        const numberBoundary = `%№${trimmed}%`;
        const numberWord = `% ${trimmed}%`;
        conditions.push(
          Prisma.sql`(s.name ILIKE ${numberBoundary} OR s.name ILIKE ${numberWord} OR s.name ILIKE ${trimmed + '%'})`,
        );
      } else {
        conditions.push(Prisma.sql`s.name ILIKE ${`%${trimmed}%`}`);
      }
    }
    if (cityId) {
      conditions.push(Prisma.sql`s."cityId" = ${cityId}`);
    }
    if (type) {
      conditions.push(Prisma.sql`s.type = ${type}`);
    }
    if (stage) {
      conditions.push(this.stageCondition(stage));
    }
    if (size) {
      conditions.push(this.sizeCondition(size));
    }

    return conditions;
  }

  private sizeCaseSql(): Prisma.Sql {
    return Prisma.sql`
      CASE
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 50 THEN 'small'
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 100 THEN 'medium'
        WHEN s.type = 'Садочок' THEN 'large'
        WHEN COALESCE(s."childrenCount", 0) < 500 THEN 'small'
        WHEN COALESCE(s."childrenCount", 0) < 900 THEN 'medium'
        ELSE 'large'
      END
    `;
  }

  private stageCondition(stage: string): Prisma.Sql {
    switch (stage) {
      case 'planned':
        return Prisma.sql`latest.status::text IN (${Prisma.join(PLANNED_STAGES)})`;
      case 'inProgress':
        return Prisma.sql`latest.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})`;
      case 'done':
        return Prisma.sql`latest.status::text = 'RE_SALE'`;
      default:
        return Prisma.sql`(latest.status IS NULL OR latest.status::text IN ('INTERESTED','PRE_APPROVAL'))`;
    }
  }

  private sizeCondition(size: string): Prisma.Sql {
    return Prisma.sql`(${this.sizeCaseSql()}) = ${size}`;
  }

  private latestEventJoin(): Prisma.Sql {
    return Prisma.sql`
      LEFT JOIN LATERAL (
        SELECT e.status FROM "Event" e
        WHERE e."schoolId" = s.id
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
    `;
  }

  private mapRow(row: {
    city_id: string | null;
    city_name: string | null;
    latestStatus: string | null;
    [key: string]: unknown;
  }) {
    const { city_id, city_name, latestStatus, ...school } = row;
    return {
      ...school,
      city: city_id ? { id: city_id, name: city_name } : null,
      events: latestStatus ? [{ status: latestStatus }] : [],
    };
  }

  async findAll(query: SchoolQueryDto) {
    const { skip, take, page } = query;
    const conditions = this.buildFilters(query);
    const whereClause = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      LEFT JOIN "City" c ON c.id = s."cityId"
      ${this.latestEventJoin()}
    `;

    const rows = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT s.*, c.id as city_id, c.name as city_name, latest.status as "latestStatus"
      ${baseFrom}
      ${whereClause}
      ORDER BY s."createdAt" DESC
      OFFSET ${skip} LIMIT ${take}
    `);

    const countRows = await this.prisma.$queryRaw<
      { count: bigint }[]
    >(Prisma.sql`
      SELECT COUNT(*)::bigint as count
      ${baseFrom}
      ${whereClause}
    `);

    const totalItems = Number(countRows[0].count);

    return {
      data: rows.map((r) => this.mapRow(r)),
      meta: new PageMetaDto(totalItems, page, take),
    };
  }

  async getStats(query: Pick<SchoolQueryDto, 'cityId' | 'type' | 'stage'>) {
    const baseConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
    });
    const baseWhere = baseConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(baseConditions, ' AND ')}`
      : Prisma.empty;

    const sizeConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
      stage: query.stage,
    });
    const sizeWhere = sizeConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(sizeConditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      ${this.latestEventJoin()}
    `;

    const [statusRows, sizeRows] = await Promise.all([
      this.prisma.$queryRaw<{ stage: string; count: bigint }[]>(Prisma.sql`
        SELECT
          CASE
            WHEN latest.status::text IN (${Prisma.join(PLANNED_STAGES)}) THEN 'planned'
            WHEN latest.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)}) THEN 'inProgress'
            WHEN latest.status::text = 'RE_SALE' THEN 'done'
            ELSE 'new'
          END as stage,
          COUNT(*)::bigint as count
        ${baseFrom}
        ${baseWhere}
        GROUP BY stage
      `),
      this.prisma.$queryRaw<{ size: string; count: bigint }[]>(Prisma.sql`
        SELECT
          ${this.sizeCaseSql()} as size,
          COUNT(*)::bigint as count
        ${baseFrom}
        ${sizeWhere}
        GROUP BY size
      `),
    ]);

    const statusStats = { new: 0, planned: 0, inProgress: 0, done: 0 };
    for (const row of statusRows) statusStats[row.stage] = Number(row.count);

    const sizeStats = { small: 0, medium: 0, large: 0 };
    for (const row of sizeRows) sizeStats[row.size] = Number(row.count);

    return { statusStats, sizeStats };
  }

  async findOne(id: string) {
    const key = `school:${id}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const school = await this.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
    if (!school) {
      throw new AppException('SCHOOL_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.set(key, school, 15_000);
    return school;
  }

  async update(id: string, data: UpdateSchoolDto) {
    const {
      city,
      id: _id,
      createdAt,
      updatedAt,
      ...updateData
    } = data as UpdateSchoolDto & Record<string, unknown>;

    const updated = await this.prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
    await this.cacheManager.del(`school:${id}`);
    return updated;
  }

  async remove(id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    await Promise.all(
      events.map((event) => this.eventsService.remove(event.id)),
    );

    const deleted = await this.prisma.school.delete({
      where: {
        id,
      },
    });
    await this.cacheManager.del(`school:${id}`);
    return deleted;
  }

  async searchContacts(q: string, city?: string) {
    if (!q || q.trim().length < 1) return [];

    const cityName = city || 'Львів';
    const normalizedQuery = q.toLowerCase().trim();

    const allContacts = await this.prisma.schoolContact.findMany({
      where: { city: cityName },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
    });

    const STOP_WORDS = new Set([
      'школа',
      'школи',
      'садочок',
      'садок',
      'дитсадок',
      'днз',
      'ліцей',
      'гімназія',
      'зош',
      'центр',
      'розвитку',
      'комунальний',
      'заклад',
      'освіти',
      'імені',
      'ім',
    ]);

    const tokens = normalizedQuery
      .replace(/№/g, ' ')
      .split(/\s+/)
      .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
      .filter((t) => t.length > 0 && !STOP_WORDS.has(t));

    const matches = allContacts.filter((c) => {
      const num = c.schoolNumber.toLowerCase();

      if (num === normalizedQuery) return true;

      const isNumeric = /^\d+$/.test(num);

      if (isNumeric) {
        if (tokens.includes(num)) return true;
      } else {
        if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
          return true;
        if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
      }

      if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;

      return false;
    });

    return matches.slice(0, 10);
  }
  async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new AppException('CITY_NOT_FOUND', HttpStatus.NOT_FOUND);

    const allFromParser = await this.parserService.getAllSchoolsForCity(
      city.name,
      type,
    );

    const existingSchools = await this.prisma.school.findMany({
      where: { cityId, type },
      select: { name: true },
    });

    const normalize = (name: string) =>
      name
        .toLowerCase()
        .replace(/№/g, '')
        .replace(/["'«»]/g, '')
        .replace(/\s+/g, '')
        .trim();

    const existingNames = new Set(
      existingSchools.map((s) => normalize(s.name)),
    );

    const toCreate = allFromParser.filter(
      (s) => !existingNames.has(normalize(s.name)),
    );

    if (toCreate.length === 0) {
      return {
        total: allFromParser.length,
        created: 0,
        skipped: allFromParser.length,
      };
    }

    const contacts = await this.prisma.schoolContact.findMany({
      where: { city: city.name },
    });

    let created = 0;
    for (const school of toCreate) {
      if (existingNames.has(normalize(school.name))) continue;

      existingNames.add(normalize(school.name));

      const numMatch = school.name.match(/№?\s*(\d+)/);
      const num = numMatch?.[1];
      const matchedContacts = num
        ? contacts.filter((c) => c.schoolNumber === num)
        : contacts.filter((c) => {
            const normSchool = normalize(school.name);
            const normContact = normalize(c.schoolNumber);
            return (
              normSchool.includes(normContact) ||
              normContact.includes(normSchool)
            );
          });

      const director =
        matchedContacts.find(
          (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
        ) || matchedContacts[0];

      try {
        await this.create({
          name: school.name,
          type,
          cityId,
          sourceUrl: school.url,
          director: director?.contactName || '',
          phone: director?.phone || '',
        });
        created++;
      } catch (e) {
        this.logger.error(
          `Помилка створення ${school.name}: ${(e as Error).message}`,
        );
      }
    }

    return {
      city: city.name,
      total: allFromParser.length,
      created,
      skipped: allFromParser.length - created,
    };
  }
}

```

# FILE: apps/backend/src/telegram/telegram.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}

```

# FILE: apps/backend/src/telegram/telegram.service.ts

```
import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  forwardRef,
} from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { UsersService } from '../users/users.service';

const LOCK_KEY = 'telegram:bot:leader';
const LOCK_TTL_MS = 15_000;
const RETRY_MS = 5_000;

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);
  private readonly instanceId = randomUUID();
  private readonly redis = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
  );
  private lockTimer?: NodeJS.Timeout;
  private retryTimer?: NodeJS.Timeout;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    this.redis.on('error', (err: Error) =>
      this.logger.warn(`Redis lock connection error: ${err.message}`),
    );

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || process.env.NODE_ENV === 'test') {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN не задано або тестове середовище — бот вимкнено',
      );
      return;
    }
    void this.tryBecomeLeader(token);
  }

  async onModuleDestroy() {
    clearTimeout(this.retryTimer);
    clearInterval(this.lockTimer);
    if (this.bot) await this.bot.stopPolling();
    const current = await this.redis.get(LOCK_KEY);
    if (current === this.instanceId) await this.redis.del(LOCK_KEY);
    this.redis.disconnect();
  }

  private async tryBecomeLeader(token: string) {
    let acquired: string | null;
    try {
      acquired = await this.redis.set(
        LOCK_KEY,
        this.instanceId,
        'PX',
        LOCK_TTL_MS,
        'NX',
      );
    } catch (e) {
      this.logger.warn(
        `Не вдалося отримати lock, повторю пізніше: ${(e as Error).message}`,
      );
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }
    if (!acquired) {
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log(`Telegram бот ініціалізовано (leader=${this.instanceId})`);
    this.lockTimer = setInterval(() => {
      this.redis
        .set(LOCK_KEY, this.instanceId, 'PX', LOCK_TTL_MS, 'XX')
        .catch((e: Error) =>
          this.logger.warn(`Не вдалося продовжити lock: ${e.message}`),
        );
    }, LOCK_TTL_MS / 3);

    this.bot.onText(/\/start/, (msg) => {
      void this.handleStartCommand(msg);
    });
  }

  private async handleStartCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = String(msg.chat.id);
    const username = msg.from?.username;

    if (!username) {
      await this.bot.sendMessage(
        chatId,
        "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
      );
      return;
    }

    const normalizedUsername = username.toLowerCase();

    const result = await this.usersService.updateTelegramChatId(
      normalizedUsername,
      chatId,
    );

    if (result.count > 0) {
      this.logger.log(
        `[/start] chatId=${chatId} username=${normalizedUsername} — успішно підв'язано`,
      );
      await this.bot.sendMessage(
        chatId,
        `✅ Вітаємо! Ваш акаунт успішно підключено до <b>Світло Знань CRM</b>.`,
        { parse_mode: 'HTML' },
      );
    } else {
      this.logger.warn(
        `[/start] Користувача з username "${normalizedUsername}" не знайдено в CRM.`,
      );
      await this.bot.sendMessage(
        chatId,
        `❌ Акаунт не знайдено. Переконайтеся, що в CRM у вашому профілі вказано нікнейм <b>${normalizedUsername}</b> без помилок.`,
        { parse_mode: 'HTML' },
      );
    }
  }

  async sendMessage(chatId: string, text: string): Promise<void> {
    if (!this.bot) return;
    try {
      await this.bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
    } catch (e: any) {
      this.logger.error(
        `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
      );
    }
  }

  async sendWelcome(
    chatId: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const text =
      `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
      `Ваш акаунт створено.\n\n` +
      `📧 <b>Логін:</b> <code>${email}</code>\n` +
      `🔑 <b>Пароль:</b> <code>${password}</code>\n\n` +
      `Увійдіть за посиланням: <a href="https://crm-frontend-psi-sable.vercel.app">crm-frontend-psi-sable.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}

```

# FILE: apps/backend/src/users/dto/create-user.dto.ts

```
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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Олег Ведучий' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'oleg@svitlo-znan.app' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password: string;

  @ApiPropertyOptional({ example: '+380671112233' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.HOST })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ example: '@oleg_host' })
  @IsOptional()
  @IsString()
  telegramId?: string;

  @ApiPropertyOptional({ example: 'Volkswagen Transporter' })
  @IsOptional()
  @IsString()
  car?: string;
}

```

# FILE: apps/backend/src/users/dto/update-user.dto.ts

```
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

# FILE: apps/backend/src/users/users.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: {} }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    expect(module.get(UsersController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/users/users.controller.ts

```
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
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiCookieAuth('access_token')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Список усіх користувачів' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Створити користувача' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: 'Оновити користувача' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOperation({ summary: 'Видалити користувача' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

```

# FILE: apps/backend/src/users/users.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => TelegramModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

```

# FILE: apps/backend/src/users/users.service.spec.ts

```
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

describe('UsersService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: { user: { findMany: jest.fn() } } },
        { provide: TelegramService, useValue: { sendMessage: jest.fn() } },
      ],
    }).compile();
    expect(module.get(UsersService)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/users/users.service.ts

```
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TelegramService))
    private telegramService: TelegramService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findByEmailWithCity(email: string) {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { city: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        city: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role,
        cityId: data.cityId || null,
        telegramId: data.telegramId || null,
        car: data.car || null,
      },
    });

    if (data.password) {
      const chatId = user.telegramChatId || null;

      if (chatId) {
        await this.telegramService.sendWelcome(
          chatId,
          data.fullName,
          data.email,
          data.password,
        );
      }
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updateData: Prisma.UserUpdateInput = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      city: data.cityId
        ? { connect: { id: data.cityId } }
        : { disconnect: true },
      telegramId: data.telegramId || null,
      car: data.car || null,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateTelegramChatId(username: string, chatId: string) {
    return this.prisma.user.updateMany({
      where: {
        telegramId: {
          equals: username,
          mode: 'insensitive',
        },
      },
      data: { telegramChatId: chatId },
    });
  }
}

```

# FILE: apps/backend/test/app.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});

```

# FILE: apps/backend/test/auth.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('Auth API (contract)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => await app.close());

  describe('POST /auth/login', () => {
    it('повертає токен при правильних даних', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(typeof res.body.access_token).toBe('string');
      expect(res.body.access_token.length).toBeGreaterThan(10);
    });

    it('повертає 401 при невірному паролі', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'wrongpassword' })
        .expect(401);
    });

    it('повертає 401 при невірному email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@crm.com', password: 'admin123' })
        .expect(401);
    });

    it('повертає 400 без email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin123' })
        .expect(400);
    });

    it('структура відповіді відповідає контракту', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toMatchObject({
        access_token: expect.any(String),
      });
    });
  });
});

```

# FILE: apps/backend/test/dashboard.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Dashboard API (contract)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => await app.close());

  describe('GET /dashboard/summary', () => {
    it('повертає summary з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('todayEvents');
      expect(res.body).toHaveProperty('upcomingEvents');
      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('monthlyKpi');
      expect(res.body).toHaveProperty('staleSchools');
      expect(res.body).toHaveProperty('activityFeed');
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/dashboard/summary').expect(401);
    });

    it('funnel містить всі етапи пайплайну', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const stages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of stages) {
        expect(res.body.funnel).toHaveProperty(stage);
      }
    });

    it('monthlyKpi має числові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const kpi = res.body.monthlyKpi;
      expect(typeof kpi.revenue).toBe('number');
      expect(typeof kpi.profit).toBe('number');
      expect(typeof kpi.children).toBe('number');
      expect(typeof kpi.count).toBe('number');
    });

    it('фільтр по cityId повертає коректний результат', async () => {
      const citiesRes = await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${token}`);

      const cityId = citiesRes.body[0]?.id;
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .get(`/dashboard/summary?cityId=${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('todayEvents');
    });

    it('todayEvents і upcomingEvents — масиви', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.todayEvents)).toBe(true);
      expect(Array.isArray(res.body.upcomingEvents)).toBe(true);
      expect(Array.isArray(res.body.staleSchools)).toBe(true);
      expect(Array.isArray(res.body.activityFeed)).toBe(true);
    });
  });
});

```

# FILE: apps/backend/test/events.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Events API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdEventId: string;
  let schoolId: string;
  let cityId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;

    if (cityId) {
      const schoolsRes = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`);
      schoolId = schoolsRes.body[0]?.id;
    }
  });

  afterAll(async () => {
    if (createdEventId) {
      await request(app.getHttpServer())
        .delete(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /events', () => {
    it('повертає список подій з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/events').expect(401);
    });

    it('кожна подія має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const event = res.body[0];
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('project');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('status');
      }
    });
  });

  describe('POST /events', () => {
    it('створює нову подію', async () => {
      if (!schoolId || !cityId) return;

      const res = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Тестова подія E2E',
          date: '2027-01-15',
          time: '10:00',
          schoolId,
          cityId,
          childrenPlanned: 100,
          price: 5000,
          address: 'вул. Тестова 1',
          contactPerson: 'Тест',
          contactPhone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.project).toBe('Тестова подія E2E');
      expect(res.body.status).toBe('BASE');
      createdEventId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/events')
        .send({ project: 'Test' })
        .expect(401);
    });
  });

  describe('GET /events/:id', () => {
    it('повертає подію по id', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdEventId);
    });

    it('повертає 404 для неіснуючої події', async () => {
      await request(app.getHttpServer())
        .get('/events/nonexistent-id-12345')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /events/:id/status', () => {
    it('змінює статус події', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .patch(`/events/${createdEventId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'FIRST_CONTACT',
          actionName: 'Знайомство',
          comment: 'Тестовий коментар',
        })
        .expect(200);

      expect(res.body.status).toBe('FIRST_CONTACT');
      expect(res.body.history).toBeDefined();
      expect(res.body.history.length).toBeGreaterThan(0);
    });
  });

  describe('GET /events/school/:schoolId', () => {
    it('повертає події школи', async () => {
      if (!schoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true повертає менше полів', async () => {
      if (!schoolId) return;

      const fullRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`);

      const minRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}?minimal=true`)
        .set('Authorization', `Bearer ${token}`);

      if (fullRes.body.length > 0 && minRes.body.length > 0) {
        expect(minRes.body[0]).not.toHaveProperty('history');
        expect(minRes.body[0]).not.toHaveProperty('preparation');
      }
    });
  });

  describe('DELETE /events/:id', () => {
    it('видаляє подію', async () => {
      if (!schoolId || !cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Подія для видалення',
          date: '2027-02-01',
          time: '11:00',
          schoolId,
          cityId,
          childrenPlanned: 50,
          price: 2000,
          address: 'вул. Тест 2',
          contactPerson: 'Тест',
          contactPhone: '0671234568',
        });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});

```

# FILE: apps/backend/test/jest-e2e.json

```
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "testTimeout": 30000,
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
}

```

# FILE: apps/backend/test/schools.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Schools API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdSchoolId: string;
  let cityId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;
  });

  afterAll(async () => {
    if (createdSchoolId) {
      await request(app.getHttpServer())
        .delete(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /schools', () => {
    it('повертає список шкіл', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true — немає include полів', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools?minimal=true')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/schools').expect(401);
    });

    it('кожна школа має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const school = res.body[0];
        expect(school).toHaveProperty('id');
        expect(school).toHaveProperty('name');
        expect(school).toHaveProperty('type');
        expect(school).toHaveProperty('cityId');
      }
    });
  });

  describe('POST /schools', () => {
    it('створює нову школу', async () => {
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'E2E Тестова школа',
          type: 'Школа',
          cityId,
          director: 'Тест Тестович',
          phone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('E2E Тестова школа');
      createdSchoolId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/schools')
        .send({ name: 'Test', type: 'Школа', cityId: 'city-1' })
        .expect(401);
    });
  });

  describe('GET /schools/:id', () => {
    it('повертає школу по id', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdSchoolId);
      expect(res.body).toHaveProperty('city');
    });

    it('повертає 404 для неіснуючої школи', async () => {
      await request(app.getHttpServer())
        .get('/schools/nonexistent-id-99999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /schools/:id', () => {
    it('оновлює дані школи', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .patch(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ director: 'Новий Директор' })
        .expect(200);

      expect(res.body.director).toBe('Новий Директор');
    });
  });

  describe('DELETE /schools/:id', () => {
    it('видаляє школу разом з подіями', async () => {
      if (!cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Школа для видалення E2E', type: 'Школа', cityId });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});

```

# FILE: apps/backend/tsconfig.build.json

```
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

```

# FILE: apps/backend/tsconfig.json

```
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["jest", "node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  }
}

```

# FILE: apps/docker-compose.yml

```
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - apps/backend/.env
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

# FILE: apps/frontend/e2e/login.spec.ts

```
import { test, expect } from "@playwright/test";

test.describe("Авторизація", () => {
  test("успішний логін перенаправляє на /cities", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/cities/, { timeout: 8000 });
  });

  test("невірний пароль — залишається на /login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("невірний пароль — показує повідомлення про помилку", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=/невірний|помилка|неправильний/i"),
    ).toBeVisible({ timeout: 5000 });
  });

  test("порожній email — кнопка не відправляє форму", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("після логіну встановлюється httpOnly cookie access_token", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);
    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "access_token");
    expect(authCookie).toBeTruthy();
    expect(authCookie?.httpOnly).toBe(true);
  });

  test("після логауту cookie access_token видаляється", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);

    const logoutBtn = page.locator("button", { hasText: /вийти|logout/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      const cookies = await page.context().cookies();
      const authCookie = cookies.find((c) => c.name === "access_token");
      expect(authCookie).toBeFalsy();
    }
  });

 test("захищений маршрут без cookie перенаправляє на /login", async ({
    page,
  }) => {
    await page.goto("/schools");
    await page.context().clearCookies();
    await page.goto("/schools");
    await expect(page).toHaveURL(/login/);
  });
});

```

# FILE: apps/frontend/e2e/schools.spec.ts

```
import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

test.describe("Сторінка шкіл", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("відображає заголовок Школи", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Школи");
  });

  test("відображає список шкіл", async ({ page }) => {
    const rows = page.locator("table tbody tr, .school-row-enter");
    await expect(rows.first()).toBeVisible({ timeout: 8000 });
  });

  test("пошук фільтрує школи", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await expect(searchInput).toBeVisible();

    const firstSchool = page.locator("table tbody tr").first();
    const schoolName = await firstSchool.locator("td").first().textContent();
    const searchTerm = schoolName?.slice(0, 5) ?? "Школа";

    await searchInput.fill(searchTerm);
    await page.waitForTimeout(300);

    const results = page.locator("table tbody tr");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("очищення пошуку повертає всі результати", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await searchInput.fill("Школа №1");
    await page.waitForTimeout(300);
    const filtered = await page.locator("table tbody tr").count();

    await searchInput.fill("");
    await page.waitForTimeout(300);
    const all = await page.locator("table tbody tr").count();

    expect(all).toBeGreaterThanOrEqual(filtered);
  });

  test("фільтр по статусу працює", async ({ page }) => {
    const newFilter = page.locator("button", { hasText: "Нові" });
    if (await newFilter.isVisible()) {
      await newFilter.click();
      await page.waitForTimeout(200);
      const counter = page.locator("text=/шкіл/i");
      await expect(counter).toBeVisible();
    }
  });

  test("клік на школу переходить на профіль", async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();
    await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
  });

  test("відображає StatsBar з лічильниками", async ({ page }) => {
    await expect(page.locator("text=Нові")).toBeVisible();
    await expect(page.locator("text=Заплановані")).toBeVisible();
    await expect(page.locator("text=В роботі")).toBeVisible();
  });
});

test.describe("Додавання школи", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("кнопка Додати відкриває модалку", async ({ page }) => {
    const addBtn = page.locator("button", { hasText: /\+ Додати/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });

  test("модалка закривається по кнопці Скасувати", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
    await page.locator("button", { hasText: "Скасувати" }).click();
    await expect(page.locator("text=Нова школа")).not.toBeVisible();
  });

  test("форма не відправляється без назви школи", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await page.locator("button", { hasText: "Створити" }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });
});

```

# FILE: apps/frontend/eslint.config.js

```


import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
])



```

# FILE: apps/frontend/index.html

```


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="CRM система для управління подіями, школами та фінансами">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>CRM</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


```

# FILE: apps/frontend/lighthouserc.cjs

```
module.exports = {
  ci: {
    collect: {
      url: [
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/cities",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/schools",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/events",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/finance",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        formFactor: "desktop",
        throttlingMethod: "devtools",     
        screenEmulation: { disabled: true },
        chromeFlags: "--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage",
      },
      skipAudits: ["redirects-http"],
    },

    upload: {
      target: "temporary-public-storage",
    },

    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.70 }],
        "categories:accessibility": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.80 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 3500 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.25 }],
        "total-blocking-time": ["warn", { maxNumericValue: 600 }],
        "speed-index": ["warn", { maxNumericValue: 3500 }],
      }
    },

    options: {
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
    }
  }
};
```

# FILE: apps/frontend/package.json

```
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "pretest:e2e": "playwright install --with-deps chromium",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@tanstack/react-query": "^5.101.0",
    "@tanstack/react-virtual": "^3.14.3",
    "axios": "^1.18.0",
    "framer-motion": "^12.41.0",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^1.20.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.79.0",
    "react-router-dom": "^7.18.0",
    "recharts": "^3.8.1",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@lhci/cli": "^0.15.1",
    "@playwright/test": "^1.61.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "@vitest/ui": "^4.1.9",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "husky": "^9.1.7",
    "jsdom": "^29.1.1",
    "msw": "^2.14.6",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12",
    "vite-plugin-image-optimizer": "^2.0.3",
    "vitest": "^4.1.9"
  }
}

```

