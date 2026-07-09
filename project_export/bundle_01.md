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
    "coverageThreshold": {
      "global": {
        "statements": 70,
        "branches": 50,
        "functions": 60,
        "lines": 70
      }
    },
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

# FILE: apps/backend/prisma/migrations/20260704220311_add_project_price_per_child/migration.sql

```
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "pricePerChild" INTEGER NOT NULL DEFAULT 0;

```

# FILE: apps/backend/prisma/migrations/20260706104815_add_query_indexes/migration.sql

```
-- CreateIndex
CREATE INDEX "Event_cityId_date_idx" ON "Event"("cityId", "date");

-- CreateIndex
CREATE INDEX "EventHistory_createdAt_idx" ON "EventHistory"("createdAt");

-- CreateIndex
CREATE INDEX "School_cityId_type_idx" ON "School"("cityId", "type");

-- CreateIndex
CREATE INDEX "School_type_idx" ON "School"("type");

-- CreateIndex
CREATE INDEX "School_createdAt_idx" ON "School"("createdAt");

-- CreateIndex
CREATE INDEX "SchoolContact_city_idx" ON "SchoolContact"("city");

```

# FILE: apps/backend/prisma/migrations/20260706120000_event_report_decimal_money/migration.sql

```
-- AlterTable: Event price and received from Float to Decimal(12,2)
ALTER TABLE "Event" ALTER COLUMN "price" TYPE numeric(12,2) USING "price"::numeric(12,2);
ALTER TABLE "Event" ALTER COLUMN "received" TYPE numeric(12,2) USING "received"::numeric(12,2);

-- AlterTable: EventReport money fields from Float to Decimal(12,2)
ALTER TABLE "EventReport" ALTER COLUMN "totalSum" TYPE numeric(12,2) USING "totalSum"::numeric(12,2);
ALTER TABLE "EventReport" ALTER COLUMN "schoolSum" TYPE numeric(12,2) USING "schoolSum"::numeric(12,2);
ALTER TABLE "EventReport" ALTER COLUMN "remainderSum" TYPE numeric(12,2) USING "remainderSum"::numeric(12,2);

```

# FILE: apps/backend/prisma/migrations/20260708205543_add_owner_role/migration.sql

```
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'OWNER';

```

# FILE: apps/backend/prisma/migrations/20260708210633_add_report_status/migration.sql

```
-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'NEEDS_REVISION', 'APPROVED', 'REJECTED', 'CLOSED');

-- AlterTable: add columns as nullable first, fill data, then set NOT NULL
ALTER TABLE "EventReport" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "revisionComment" TEXT,
ADD COLUMN     "status" "ReportStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "submittedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

UPDATE "EventReport" SET "updatedAt" = NOW() WHERE "updatedAt" IS NULL;

ALTER TABLE "EventReport" ALTER COLUMN "updatedAt" SET NOT NULL;

```

# FILE: apps/backend/prisma/migrations/20260708213844_replace_salaryitem_with_salaryrecord/migration.sql

```
/*
  Warnings:

  - You are about to drop the `SalaryItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SalaryStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "SalaryItem" DROP CONSTRAINT "SalaryItem_reportId_fkey";

-- DropForeignKey
ALTER TABLE "SalaryItem" DROP CONSTRAINT "SalaryItem_userId_fkey";

-- DropTable
DROP TABLE "SalaryItem";

-- CreateTable
CREATE TABLE "SalaryRecord" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "eventId" TEXT,
    "reportId" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "comment" TEXT,
    "status" "SalaryStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "paidBy" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalaryRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SalaryRecord_employeeId_idx" ON "SalaryRecord"("employeeId");

-- CreateIndex
CREATE INDEX "SalaryRecord_reportId_idx" ON "SalaryRecord"("reportId");

-- CreateIndex
CREATE INDEX "SalaryRecord_status_idx" ON "SalaryRecord"("status");

-- AddForeignKey
ALTER TABLE "SalaryRecord" ADD CONSTRAINT "SalaryRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryRecord" ADD CONSTRAINT "SalaryRecord_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryRecord" ADD CONSTRAINT "SalaryRecord_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "EventReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260708215231_add_school_comment/migration.sql

```
-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('NOTE', 'CALL', 'RESCHEDULE', 'CONFIRMATION', 'PROBLEM');

-- CreateTable
CREATE TABLE "SchoolComment" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" "CommentType" NOT NULL,
    "text" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SchoolComment_schoolId_createdAt_idx" ON "SchoolComment"("schoolId", "createdAt");

-- AddForeignKey
ALTER TABLE "SchoolComment" ADD CONSTRAINT "SchoolComment_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolComment" ADD CONSTRAINT "SchoolComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260708221238_add_inventory_notification_models/migration.sql

```
-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "unit" TEXT NOT NULL DEFAULT 'шт',
    "minStock" INTEGER NOT NULL DEFAULT 5,
    "currentStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryUsage" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InventoryItem_name_idx" ON "InventoryItem"("name");

-- CreateIndex
CREATE INDEX "InventoryUsage_itemId_idx" ON "InventoryUsage"("itemId");

-- CreateIndex
CREATE INDEX "InventoryUsage_reportId_idx" ON "InventoryUsage"("reportId");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_createdAt_idx" ON "Notification"("userId", "readAt", "createdAt");

-- AddForeignKey
ALTER TABLE "InventoryUsage" ADD CONSTRAINT "InventoryUsage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryUsage" ADD CONSTRAINT "InventoryUsage_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "EventReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260708233051_add_inventory_category_city/migration.sql

```
-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Інше',
ADD COLUMN     "cityId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "schoolId" TEXT;

-- CreateIndex
CREATE INDEX "InventoryItem_category_idx" ON "InventoryItem"("category");

-- CreateIndex
CREATE INDEX "InventoryItem_cityId_idx" ON "InventoryItem"("cityId");

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

```

# FILE: apps/backend/prisma/migrations/20260709004525_add_project_to_inventory_item/migration.sql

```
-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "project" TEXT;

-- CreateIndex
CREATE INDEX "InventoryItem_project_idx" ON "InventoryItem"("project");

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
  salaryRecords  SalaryRecord[]
  daysOff        DayOff[]
  schoolComments SchoolComment[]

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
  id             String          @id @default(uuid())
  name           String
  managerId      String?
  createdAt      DateTime        @default(now())
  manager        User?           @relation("CityManager", fields: [managerId], references: [id])
  crews          Crew[]
  events         Event[]
  issues         IssueReport[]
  schools        School[]
  users          User[]
  inventoryItems InventoryItem[]
}

model School {
  id             String          @id @default(uuid())
  name           String
  type           String
  cityId         String
  address        String?
  director       String?
  phone          String?
  email          String?
  notes          String?
  childrenCount  Int?
  isHotClient    Boolean         @default(false)
  rating         Float?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  events         Event[]
  comments       SchoolComment[]
  inventoryItems InventoryItem[]
  city           City            @relation(fields: [cityId], references: [id])

  @@index([cityId])
  @@index([cityId, type])
  @@index([type])
  @@index([createdAt])
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
  price           Decimal? @db.Decimal(12, 2)
  received        Decimal? @db.Decimal(12, 2)
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
  salaryRecords   SalaryRecord[]

  @@index([cityId])
  @@index([cityId, date])
  @@index([status])
  @@index([schoolId])
  @@index([schoolId, date])
  @@index([date, status, cityId])
}

model EventReport {
  id                String        @id @default(uuid())
  eventId           String        @unique
  status            ReportStatus  @default(DRAFT)
  directorSatisfied Boolean?
  teachersSatisfied Boolean?
  hadIssues         Boolean       @default(false)
  comment           String?
  revisionComment   String?
  rating            Float?
  submittedAt       DateTime?
  approvedAt        DateTime?
  approvedBy        String?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  announcementDone  Boolean       @default(false)
  materialShown     Boolean       @default(false)
  childrenCount     Int           @default(0)
  classesCount      Int           @default(0)
  privilegedCount   Int           @default(0)
  showingsCount     Int           @default(0)
  totalSum          Decimal       @default(0) @db.Decimal(12, 2)
  schoolSum         Decimal       @default(0) @db.Decimal(12, 2)
  remainderSum      Decimal       @default(0) @db.Decimal(12, 2)
  event             Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)
  photos            File[]
  expenseItems      ExpenseItem[]
  salaryRecords     SalaryRecord[]
  inventoryUsages   InventoryUsage[]
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
  @@index([createdAt])
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

  @@index([city])
}

model Project {
  id        String   @id @default(uuid())
  name      String   @unique
  color     String   @default("blue")
  createdAt DateTime @default(now())
  pricePerChild Int @default(0)
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

model SalaryRecord {
  id         String        @id @default(cuid())
  employeeId String
  eventId    String?
  reportId   String?
  amount     Decimal       @db.Decimal(12, 2)
  comment    String?
  status     SalaryStatus  @default(PENDING)
  paidAt     DateTime?
  paidBy     String?
  createdBy  String
  createdAt  DateTime      @default(now())

  employee User        @relation(fields: [employeeId], references: [id])
  event    Event?      @relation(fields: [eventId], references: [id])
  report   EventReport? @relation(fields: [reportId], references: [id], onDelete: SetNull)

  @@index([employeeId])
  @@index([reportId])
  @@index([status])
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
  OWNER
  MANAGER
  HOST
  DRIVER
}

enum PreparationStatus {
  PLANNED
  IN_PROGRESS
  DONE
}

enum ReportStatus {
  DRAFT
  SUBMITTED
  NEEDS_REVISION
  APPROVED
  REJECTED
  CLOSED
}

enum SalaryStatus {
  PENDING
  PAID
  CANCELLED
}

enum CommentType {
  NOTE
  CALL
  RESCHEDULE
  CONFIRMATION
  PROBLEM
}

model SchoolComment {
  id        String      @id @default(cuid())
  schoolId  String
  authorId  String
  type      CommentType
  text      String
  deletedAt DateTime?
  createdAt DateTime    @default(now())

  school School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  author User   @relation(fields: [authorId], references: [id])

  @@index([schoolId, createdAt])
}

model InventoryItem {
  id           String   @id @default(cuid())
  name         String
  sku          String?
  category     String   @default("Інше")
  unit         String   @default("шт")
  project      String?
  minStock     Int      @default(5)
  currentStock Int      @default(0)
  notes        String?
  cityId       String?
  schoolId     String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  city   City?   @relation(fields: [cityId], references: [id])
  school School? @relation(fields: [schoolId], references: [id])
  usages InventoryUsage[]

  @@index([name])
  @@index([category])
  @@index([cityId])
  @@index([project])
}

model InventoryUsage {
  id        String   @id @default(cuid())
  itemId    String
  reportId  String
  quantity  Int
  createdAt DateTime @default(now())

  item   InventoryItem @relation(fields: [itemId], references: [id])
  report EventReport   @relation(fields: [reportId], references: [id])

  @@index([itemId])
  @@index([reportId])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      String
  payload   Json
  readAt    DateTime?
  createdAt DateTime @default(now())

  @@index([userId, readAt, createdAt])
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
      salaryRecords: {
        create: [
          { employeeId: host.id, amount: 2500, status: 'PAID', createdBy: manager.id },
          { employeeId: driver.id, amount: 1500, status: 'PAID', createdBy: manager.id },
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

# FILE: apps/backend/src/analytics/analytics.controller.ts

```
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
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

```

# FILE: apps/backend/src/analytics/analytics.module.ts

```
import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}

```

# FILE: apps/backend/src/analytics/analytics.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async revenueByMonth(cityId?: string, projectId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const where: Record<string, unknown> = {
      date: {
        gte: new Date(`${yearFilter}-01-01`),
        lt: new Date(`${yearFilter + 1}-01-01`),
      },
      status: { in: ['REPORT', 'DONE'] },
    };
    if (cityId) where.cityId = cityId;
    if (projectId) where.project = projectId;

    const events = await this.prisma.event.findMany({
      where,
      select: {
        date: true,
        report: {
          select: { totalSum: true, remainderSum: true, schoolSum: true },
        },
      },
    });

    const months = Array.from({ length: 12 }, (_, i) => {
      const monthEvents = events.filter(
        (e) => new Date(e.date).getMonth() === i,
      );
      return {
        month: (i + 1).toString().padStart(2, '0'),
        revenue: monthEvents.reduce(
          (s, e) => s + Number(e.report?.totalSum ?? 0),
          0,
        ),
        profit: monthEvents.reduce(
          (s, e) => s + Number(e.report?.remainderSum ?? 0),
          0,
        ),
        events: monthEvents.length,
      };
    });

    return months;
  }

  async eventsByCity(year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const events = await this.prisma.event.groupBy({
      by: ['cityId'],
      where: {
        date: {
          gte: new Date(`${yearFilter}-01-01`),
          lt: new Date(`${yearFilter + 1}-01-01`),
        },
      },
      _count: { id: true },
    });

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    return events.map((e) => ({
      cityId: e.cityId,
      cityName: cityMap.get(e.cityId) ?? '—',
      events: e._count.id,
    }));
  }

  async profitByCity(cityId?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const where: Record<string, unknown> = {
      date: {
        gte: new Date(`${yearFilter}-01-01`),
        lt: new Date(`${yearFilter + 1}-01-01`),
      },
      status: { in: ['REPORT', 'DONE'] },
    };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      select: {
        cityId: true,
        report: {
          select: { totalSum: true, schoolSum: true, remainderSum: true },
        },
      },
    });

    const byCity = new Map<
      string,
      { revenue: number; profit: number; expenses: number; count: number }
    >();
    for (const e of events) {
      const curr = byCity.get(e.cityId) ?? {
        revenue: 0,
        profit: 0,
        expenses: 0,
        count: 0,
      };
      curr.revenue += Number(e.report?.totalSum ?? 0);
      curr.profit += Number(e.report?.remainderSum ?? 0);
      curr.expenses += Number(e.report?.schoolSum ?? 0);
      curr.count++;
      byCity.set(e.cityId, curr);
    }

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    return Array.from(byCity.entries()).map(([cityId, data]) => ({
      cityId,
      cityName: cityMap.get(cityId) ?? '—',
      ...data,
    }));
  }

  async salaryFund(month?: number, year?: number, cityId?: string) {
    const now = new Date();
    const m = month ?? now.getMonth() + 1;
    const y = year ?? now.getFullYear();
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);

    const where: Record<string, unknown> = {
      createdAt: { gte: start, lt: end },
      status: 'PAID',
    };

    const records = await this.prisma.salaryRecord.findMany({
      where,
      select: { amount: true, event: { select: { cityId: true } } },
    });

    let total = records.reduce((s, r) => s + Number(r.amount), 0);
    const byCity: Record<string, number> = {};

    if (cityId) {
      const filtered = records.filter((r) => r.event?.cityId === cityId);
      total = filtered.reduce((s, r) => s + Number(r.amount), 0);
    } else {
      for (const r of records) {
        const cid = r.event?.cityId ?? 'unknown';
        byCity[cid] = (byCity[cid] ?? 0) + Number(r.amount);
      }
    }

    return {
      total,
      month: m,
      year: y,
      byCity: Object.keys(byCity).length ? byCity : undefined,
    };
  }

  async cityLeaderboard(metric?: string, year?: number) {
    const yearFilter = year ?? new Date().getFullYear();
    const where: Record<string, unknown> = {
      date: {
        gte: new Date(`${yearFilter}-01-01`),
        lt: new Date(`${yearFilter + 1}-01-01`),
      },
      status: { in: ['REPORT', 'DONE'] },
    };

    const events = await this.prisma.event.findMany({
      where,
      select: {
        cityId: true,
        schoolId: true,
        childrenActual: true,
        report: {
          select: { totalSum: true, remainderSum: true, childrenCount: true },
        },
      },
    });

    const byCity = new Map<
      string,
      {
        events: number;
        revenue: number;
        profit: number;
        children: number;
        schools: Set<string>;
      }
    >();
    for (const e of events) {
      const cityId = e.cityId;
      if (!byCity.has(cityId))
        byCity.set(cityId, {
          events: 0,
          revenue: 0,
          profit: 0,
          children: 0,
          schools: new Set(),
        });
      const d = byCity.get(cityId)!;
      d.events++;
      d.revenue += Number(e.report?.totalSum ?? 0);
      d.profit += Number(e.report?.remainderSum ?? 0);
      d.children += Number(e.report?.childrenCount ?? e.childrenActual ?? 0);
      d.schools.add(e.schoolId);
    }

    const cities = await this.prisma.city.findMany({
      select: { id: true, name: true },
    });
    const cityMap = new Map(cities.map((c) => [c.id, c.name]));

    const metricMap = {
      events: 'events',
      revenue: 'revenue',
      profit: 'profit',
      children: 'children',
      schools: 'schools',
    };
    const sortKey = metricMap[metric as keyof typeof metricMap] || 'events';

    const result = Array.from(byCity.entries())
      .map(([cityId, data]) => ({
        cityId,
        cityName: cityMap.get(cityId) ?? '—',
        events: data.events,
        revenue: data.revenue,
        profit: data.profit,
        children: data.children,
        schools: data.schools.size,
      }))
      .sort(
        (a, b) =>
          (b[sortKey as keyof typeof a] as number) -
          (a[sortKey as keyof typeof a] as number),
      );

    return result;
  }

  async kpiManagers() {
    const managers = await this.prisma.eventReport.groupBy({
      by: ['approvedBy'],
      where: { status: 'APPROVED', approvedBy: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const userIds = managers
      .map((m) => m.approvedBy)
      .filter(Boolean) as string[];
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u.name]));

    return managers.map((m) => ({
      userId: m.approvedBy,
      name: userMap.get(m.approvedBy!) ?? '—',
      approvedReports: m._count.id,
    }));
  }

  async kpiHosts() {
    const events = await this.prisma.event.findMany({
      where: {
        status: { in: ['REPORT', 'DONE'] },
        crew: { hostId: { not: null } },
        report: { rating: { not: null } },
      },
      select: {
        crew: { select: { hostId: true } },
        report: { select: { rating: true } },
      },
    });

    const byHost = new Map<string, { totalRating: number; count: number }>();
    for (const e of events) {
      const hostId = e.crew!.hostId!;
      if (!byHost.has(hostId)) byHost.set(hostId, { totalRating: 0, count: 0 });
      const d = byHost.get(hostId)!;
      d.totalRating += Number(e.report!.rating);
      d.count++;
    }

    const userIds = Array.from(byHost.keys());
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u.name]));

    return Array.from(byHost.entries())
      .map(([userId, data]) => ({
        userId,
        name: userMap.get(userId) ?? '—',
        avgRating: Math.round((data.totalRating / data.count) * 100) / 100,
        reportsCount: data.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10);
  }

  async kpiProjects() {
    const year = new Date().getFullYear();
    const projects = await this.prisma.event.groupBy({
      by: ['project'],
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
        status: { in: ['REPORT', 'DONE'] },
      },
      _count: { id: true },
      _sum: { childrenActual: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const projectNames = projects.map((p) => p.project);
    const revenueByProject = new Map<string, number>();
    if (projectNames.length) {
      const events = await this.prisma.event.findMany({
        where: {
          project: { in: projectNames },
          status: { in: ['REPORT', 'DONE'] },
        },
        select: {
          project: true,
          report: { select: { totalSum: true, remainderSum: true } },
        },
      });
      for (const e of events) {
        const curr = revenueByProject.get(e.project) ?? 0;
        revenueByProject.set(
          e.project,
          curr + Number(e.report?.remainderSum ?? 0),
        );
      }
    }

    return projects.map((p) => ({
      project: p.project,
      eventsCount: p._count.id,
      childrenTotal: p._sum.childrenActual ?? 0,
      profit: revenueByProject.get(p.project) ?? 0,
    }));
  }

  async roi(cityId?: string, year?: number) {
    const y = year ?? new Date().getFullYear();
    const start = new Date(y, 0, 1);
    const end = new Date(y + 1, 0, 1);

    const where: Record<string, unknown> = {
      date: { gte: start, lt: end },
      status: { in: ['REPORT', 'DONE'] },
    };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      select: {
        report: {
          select: { totalSum: true, schoolSum: true, remainderSum: true },
        },
      },
    });

    const totalRevenue = events.reduce(
      (s, e) => s + Number(e.report?.totalSum ?? 0),
      0,
    );
    const totalSchoolSum = events.reduce(
      (s, e) => s + Number(e.report?.schoolSum ?? 0),
      0,
    );

    const salaryRecords = await this.prisma.salaryRecord.findMany({
      where: { createdAt: { gte: start, lt: end }, status: 'PAID' },
      select: { amount: true },
    });
    const salaryExpenses = salaryRecords.reduce(
      (s, r) => s + Number(r.amount),
      0,
    );

    const totalExpenses = totalSchoolSum + salaryExpenses;
    const profit = totalRevenue - totalExpenses;
    const roiValue = totalExpenses > 0 ? (profit / totalExpenses) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      salaryExpenses,
      profit,
      roi: Math.round(roiValue * 100) / 100,
    };
  }
}

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
import { InventoryModule } from './inventory/inventory.module';
import { DaysOffModule } from './days-off/days-off.module';
import { ReportsModule } from './reports/reports.module';
import { SalaryModule } from './salary/salary.module';
import { SchoolCommentsModule } from './school-comments/school-comments.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { MetricsModule } from './metrics/metrics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
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
    InventoryModule,
    ReportsModule,
    SalaryModule,
    SchoolCommentsModule,
    AuditLogModule,
    NotificationsModule,
    AnalyticsModule,
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

# FILE: apps/backend/src/audit-log/audit-log.controller.ts

```
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('audit-log')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Roles('SUPERADMIN', 'OWNER')
@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @ApiOperation({ summary: 'Отримати журнал дій' })
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('entity') entity?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    return this.auditLogService.findAll({
      userId,
      entity,
      dateFrom,
      dateTo,
      page,
      take,
    });
  }

  @ApiOperation({ summary: 'Список типів сутностей' })
  @Get('entities')
  findEntityTypes() {
    return this.auditLogService.findEntityTypes();
  }
}

```

# FILE: apps/backend/src/audit-log/audit-log.module.ts

```
import { Module } from '@nestjs/common';
import { AuditLogController } from './audit-log.controller';
import { AuditLogService } from './audit-log.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuditLogController],
  providers: [AuditLogService],
})
export class AuditLogModule {}

```

# FILE: apps/backend/src/audit-log/audit-log.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    userId?: string;
    entity?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    take?: number;
  }) {
    const page = params.page ?? 1;
    const take = params.take ?? 10;
    const skip = (page - 1) * take;

    const where: Record<string, unknown> = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.entity) {
      where.entity = params.entity;
    }

    if (params.dateFrom || params.dateTo) {
      const createdAt: Record<string, Date> = {};
      if (params.dateFrom) createdAt.gte = new Date(params.dateFrom);
      if (params.dateTo) {
        const end = new Date(params.dateTo);
        end.setHours(23, 59, 59, 999);
        createdAt.lte = end;
      }
      where.createdAt = createdAt;
    }

    const [items, totalItems] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    const meta = new PageMetaDto(totalItems, page, take);

    return { items, meta };
  }

  async findEntityTypes(): Promise<string[]> {
    const result = await this.prisma.auditLog.findMany({
      select: { entity: true },
      where: { entity: { not: null } },
      distinct: ['entity'],
      orderBy: { entity: 'asc' },
    });

    return result.map((r) => r.entity as string);
  }
}

```

# FILE: apps/backend/src/auth/auth.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: { login: jest.fn() } }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
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

const cookieDomain = process.env.COOKIE_DOMAIN || undefined;

function clearLegacyHostOnlyCookies(res: Response) {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token', { path: '/auth' });
  res.clearCookie('csrf_token');
}

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  csrfToken: string,
) {
  clearLegacyHostOnlyCookies(res);

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

# FILE: apps/backend/src/auth/auth.guard.spec.ts

```
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: { verifyAsync: jest.Mock };

  const createContext = (request: any): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    }) as any;

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() };
    guard = new AuthGuard(jwtService as unknown as JwtService);
  });

  it('бере токен з cookie і встановлює request.user', async () => {
    const req = { cookies: { access_token: 'cookie-token' }, headers: {} };
    jwtService.verifyAsync.mockResolvedValueOnce({ sub: 'u1', role: 'HOST' });

    const ok = await guard.canActivate(createContext(req));

    expect(ok).toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('cookie-token', {
      secret: process.env.JWT_SECRET,
    });
    expect(req['user']).toEqual({ sub: 'u1', role: 'HOST' });
  });

  it('без токена кидає UnauthorizedException: Токен не знайдено', async () => {
    const req = { cookies: {}, headers: {} };

    await expect(guard.canActivate(createContext(req))).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    await expect(guard.canActivate(createContext(req))).rejects.toThrow(
      'Токен не знайдено',
    );
  });

  it('при помилці verify кидає UnauthorizedException: Недійсний токен', async () => {
    const req = { cookies: { access_token: 'bad-token' }, headers: {} };
    jwtService.verifyAsync.mockRejectedValue(new Error('bad jwt'));

    await expect(guard.canActivate(createContext(req))).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    await expect(guard.canActivate(createContext(req))).rejects.toThrow(
      'Недійсний токен',
    );
  });

  it('verifyAsync викликається з secret з env', async () => {
    const prev = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';
    const req = { cookies: { access_token: 'cookie-token' }, headers: {} };
    jwtService.verifyAsync.mockResolvedValueOnce({ sub: 'u1' });

    await guard.canActivate(createContext(req));

    expect(jwtService.verifyAsync).toHaveBeenCalledWith('cookie-token', {
      secret: 'test-secret',
    });
    process.env.JWT_SECRET = prev;
  });
});

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
    return request.cookies?.access_token;
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
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUsersService = { findByEmailWithCity: jest.fn() };
const mockJwtService = { signAsync: jest.fn().mockResolvedValue('signed-jwt') };
const mockPrisma = {
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

const makeService = () =>
  new AuthService(
    mockUsersService as unknown as UsersService,
    mockJwtService as unknown as JwtService,
    mockPrisma as unknown as PrismaService,
  );

const validUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Іван',
  role: 'MANAGER',
  cityId: 'city-1',
  password: 'hashed-password',
  city: { name: 'Львів' },
};

beforeEach(() => {
  jest.clearAllMocks();
  (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  mockPrisma.refreshToken.create.mockResolvedValue({ id: 'rt-1' });
  mockPrisma.refreshToken.update.mockResolvedValue({ id: 'rt-1' });
});

describe('AuthService — login', () => {
  it('повертає access_token, refresh_token та user при успішному логіні', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(validUser);

    const service = makeService();
    const result = await service.login('test@example.com', 'pass123');

    expect(result.access_token).toBe('signed-jwt');
    expect(result.refresh_token).toBeDefined();
    expect(typeof result.refresh_token).toBe('string');
    expect(result.user.id).toBe('user-1');
    expect(result.user.email).toBe('test@example.com');
    expect(result.user.cityName).toBe('Львів');
  });

  it('створює refresh token у БД при логіні', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(validUser);

    const service = makeService();
    await service.login('test@example.com', 'pass123', {
      ip: '127.0.0.1',
      userAgent: 'test-agent',
    });

    expect(mockPrisma.refreshToken.create).toHaveBeenCalledTimes(1);
    const createCall = mockPrisma.refreshToken.create.mock.calls[0][0].data;
    expect(createCall.userId).toBe('user-1');
    expect(createCall.ip).toBe('127.0.0.1');
    expect(createCall.userAgent).toBe('test-agent');
    expect(createCall.tokenHash).toBeDefined();
    expect(createCall.expiresAt).toBeInstanceOf(Date);
  });

  it('кидає AppException INVALID_CREDENTIALS якщо користувача не знайдено', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(null);

    const service = makeService();
    await expect(service.login('nobody@example.com', 'pass')).rejects.toThrow(
      AppException,
    );
    await expect(
      service.login('nobody@example.com', 'pass'),
    ).rejects.toMatchObject({ status: HttpStatus.UNAUTHORIZED });
  });

  it('кидає AppException INVALID_CREDENTIALS якщо пароль невірний', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValue(validUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const service = makeService();
    await expect(service.login('test@example.com', 'wrong')).rejects.toThrow(
      AppException,
    );
  });

  it('порівнює з dummyHash якщо user не знайдено (захист від timing attack)', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValue(null);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const service = makeService();
    try {
      await service.login('ghost@example.com', 'any');
    } catch {}

    // bcrypt.compare має бути викликаний навіть коли user=null
    expect(bcrypt.compare).toHaveBeenCalled();
    const [, hashArg] = (bcrypt.compare as jest.Mock).mock.calls[0];
    // dummyHash починається з $2b$10$
    expect(hashArg).toMatch(/^\$2b\$10\$/);
  });

  it('підписує JWT з коректним payload', async () => {
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(validUser);

    const service = makeService();
    await service.login('test@example.com', 'pass');

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: 'user-1',
      email: 'test@example.com',
      role: 'MANAGER',
      name: 'Іван',
      cityId: 'city-1',
      cityName: 'Львів',
    });
  });

  it('user без міста — cityName=undefined', async () => {
    const userNoCity = { ...validUser, city: undefined, cityId: null };
    mockUsersService.findByEmailWithCity.mockResolvedValueOnce(userNoCity);

    const service = makeService();
    const result = await service.login('test@example.com', 'pass');

    expect(result.user.cityName).toBeUndefined();
  });
});

describe('AuthService — refresh', () => {
  const storedToken = {
    id: 'rt-stored',
    revokedAt: null,
    expiresAt: new Date(Date.now() + 60_000),
    user: {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Іван',
      role: 'MANAGER',
      cityId: 'city-1',
      city: { name: 'Львів' },
    },
  };

  it('повертає нові токени при валідному refresh token', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(storedToken);

    const service = makeService();
    const result = await service.refresh('valid-old-token');

    expect(result.access_token).toBe('signed-jwt');
    expect(result.refresh_token).toBeDefined();
    expect(result.user.id).toBe('user-1');
  });

  it('відкликає старий токен при refresh', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(storedToken);

    const service = makeService();
    await service.refresh('valid-old-token');

    expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
      where: { id: 'rt-stored' },
      data: { revokedAt: expect.any(Date) },
    });
  });

  it('кидає AppException якщо токен не знайдено', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(null);

    const service = makeService();
    await expect(service.refresh('unknown-token')).rejects.toThrow(
      AppException,
    );
    await expect(service.refresh('unknown-token')).rejects.toMatchObject({
      status: HttpStatus.UNAUTHORIZED,
    });
  });

  it('кидає AppException якщо токен відкликаний (revokedAt є)', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValue({
      ...storedToken,
      revokedAt: new Date(),
    });

    const service = makeService();
    await expect(service.refresh('revoked-token')).rejects.toThrow(
      AppException,
    );
  });

  it('кидає AppException якщо токен прострочений', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValue({
      ...storedToken,
      expiresAt: new Date(Date.now() - 1000),
    });

    const service = makeService();
    await expect(service.refresh('expired-token')).rejects.toThrow(
      AppException,
    );
  });

  it('хешує токен перед пошуком у БД', async () => {
    mockPrisma.refreshToken.findUnique.mockResolvedValueOnce(storedToken);

    const service = makeService();
    await service.refresh('my-plain-token');

    const { tokenHash } =
      mockPrisma.refreshToken.findUnique.mock.calls[0][0].where;
    // sha256 — hex рядок довжиною 64 символи
    expect(tokenHash).toMatch(/^[a-f0-9]{64}$/);
    expect(tokenHash).not.toBe('my-plain-token');
  });
});

describe('AuthService — revokeRefreshToken', () => {
  it('відкликає токен через update', async () => {
    const service = makeService();
    await service.revokeRefreshToken('some-token');

    expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
      where: { tokenHash: expect.any(String) },
      data: { revokedAt: expect.any(Date) },
    });
  });

  it('не кидає помилку якщо токен не знайдено (catch → undefined)', async () => {
    mockPrisma.refreshToken.update.mockRejectedValueOnce(
      new Error('Record not found'),
    );

    const service = makeService();
    await expect(
      service.revokeRefreshToken('non-existent'),
    ).resolves.toBeUndefined();
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

# FILE: apps/backend/src/auth/csrf.guard.spec.ts

```
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CsrfGuard } from './csrf.guard';
import { SKIP_CSRF_KEY } from './decorators/skip-csrf.decorator';

describe('CsrfGuard', () => {
  let guard: CsrfGuard;
  let reflector: { getAllAndOverride: jest.Mock };

  const createContext = (
    method: string,
    path: string,
    cookies: Record<string, string> = {},
    headers: Record<string, string> = {},
  ): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ method, path, cookies, headers }),
      }),
    }) as any;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    guard = new CsrfGuard(reflector as unknown as Reflector);
  });

  it('@SkipCsrf — пропускає без перевірки', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(true);
    const ok = guard.canActivate(createContext('POST', '/some-path', {}, {}));
    expect(ok).toBe(true);
  });

  it('GET/HEAD/OPTIONS пропускає без перевірки', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = guard.canActivate(createContext('GET', '/any-path'));
    expect(ok).toBe(true);
  });

  it('/auth/login пропускає без перевірки', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = guard.canActivate(createContext('POST', '/auth/login'));
    expect(ok).toBe(true);
  });

  it('POST без csrf_token у cookie кидає Forbidden', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(() =>
      guard.canActivate(createContext('POST', '/some-path', {}, {})),
    ).toThrow(ForbiddenException);
  });

  it('POST з cookie але без заголовка кидає Forbidden', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(() =>
      guard.canActivate(
        createContext('POST', '/some-path', { csrf_token: 'token123' }, {}),
      ),
    ).toThrow(ForbiddenException);
  });

  it('POST з неспівпадінням токенів кидає Forbidden', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(() =>
      guard.canActivate(
        createContext(
          'POST',
          '/some-path',
          { csrf_token: 'token123' },
          { 'x-csrf-token': 'wrong' },
        ),
      ),
    ).toThrow(ForbiddenException);
  });

  it('POST зі співпадінням токенів пропускає', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = guard.canActivate(
      createContext(
        'POST',
        '/some-path',
        { csrf_token: 'token123' },
        { 'x-csrf-token': 'token123' },
      ),
    );
    expect(ok).toBe(true);
  });
});

```

# FILE: apps/backend/src/auth/csrf.guard.ts

```
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SKIP_CSRF_KEY } from './decorators/skip-csrf.decorator';

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly exemptPaths = ['/auth/login'];

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const skipCsrf = this.reflector.getAllAndOverride<boolean>(SKIP_CSRF_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipCsrf) return true;

    const req = context.switchToHttp().getRequest();
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
    if (this.exemptPaths.includes(req.path)) return true;

    const cookieToken = req.cookies?.csrf_token;
    const headerToken = req.headers['x-csrf-token'];
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

# FILE: apps/backend/src/auth/decorators/skip-csrf.decorator.ts

```
import { SetMetadata } from '@nestjs/common';

export const SKIP_CSRF_KEY = 'skipCsrf';
export const SkipCsrf = () => SetMetadata(SKIP_CSRF_KEY, true);

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

# FILE: apps/backend/src/auth/guards/ownership.guard.spec.ts

```
import {
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OwnershipGuard } from './ownership.guard';
import { PrismaService } from '../../prisma/prisma.service';

describe('OwnershipGuard', () => {
  let guard: OwnershipGuard;
  let reflector: { getAllAndOverride: jest.Mock };
  let prisma: any;

  const createContext = (user: any, params: Record<string, string> = {}) =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user, params }),
      }),
    }) as ExecutionContext;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    prisma = {
      user: { findUnique: jest.fn() },
      school: { findUnique: jest.fn() },
      event: { findUnique: jest.fn() },
      crew: { findUnique: jest.fn() },
      eventHistory: { findUnique: jest.fn() },
    };
    guard = new OwnershipGuard(reflector as unknown as Reflector, prisma);
  });

  it('без metadata ownership -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }),
    );
    expect(ok).toBe(true);
  });

  it('SUPERADMIN -> true без prisma', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    const ok = await guard.canActivate(
      createContext({ role: 'SUPERADMIN', sub: 'a1' }, { id: 'ev1' }),
    );
    expect(ok).toBe(true);
    expect(prisma.event.findUnique).not.toHaveBeenCalled();
  });

  it('без paramId -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }),
    );
    expect(ok).toBe(true);
  });

  it('HOST/DRIVER + resourceType != event -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    await expect(
      guard.canActivate(
        createContext({ role: 'HOST', sub: 'h1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('HOST + event not found -> NotFound', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(
        createContext({ role: 'HOST', sub: 'h1' }, { id: 'e1' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('DRIVER + event not assigned -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce({
      crew: { hostId: 'h2', driverId: 'd2' },
    });
    await expect(
      guard.canActivate(
        createContext({ role: 'DRIVER', sub: 'd1' }, { id: 'e1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('HOST assigned до event -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce({
      crew: { hostId: 'h1', driverId: 'd2' },
    });
    const ok = await guard.canActivate(
      createContext({ role: 'HOST', sub: 'h1' }, { id: 'e1' }),
    );
    expect(ok).toBe(true);
  });

  it('DRIVER assigned до event -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.event.findUnique.mockResolvedValueOnce({
      crew: { hostId: 'h2', driverId: 'd1' },
    });
    const ok = await guard.canActivate(
      createContext({ role: 'DRIVER', sub: 'd1' }, { id: 'e1' }),
    );
    expect(ok).toBe(true);
  });

  it('роль поза MANAGER/HOST/DRIVER/SUPERADMIN -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    await expect(
      guard.canActivate(
        createContext({ role: 'ACCOUNTANT', sub: 'x1' }, { id: 'e1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER без cityId -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: null });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER + school: not found -> NotFound', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.school.findUnique.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('MANAGER + school: city match -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.school.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
    );
    expect(ok).toBe(true);
  });

  it('MANAGER + school: city mismatch -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('school');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.school.findUnique.mockResolvedValueOnce({ cityId: 'city-9' });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 's1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER + event: city match -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.event.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'e1' }),
    );
    expect(ok).toBe(true);
  });

  it('MANAGER + crew: city mismatch -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('crew');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.crew.findUnique.mockResolvedValueOnce({ cityId: 'city-2' });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'c1' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('MANAGER + city: paramId==manager.cityId -> true', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('city');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'city-1' }),
    );
    expect(ok).toBe(true);
  });

  it('MANAGER + city: paramId!=manager.cityId -> Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('city');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { id: 'city-2' }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('historyId резолвиться в eventId для resourceType=event', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.eventHistory.findUnique.mockResolvedValueOnce({ eventId: 'ev-1' });
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.event.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    const ok = await guard.canActivate(
      createContext({ role: 'MANAGER', sub: 'm1' }, { historyId: 'h-1' }),
    );
    expect(ok).toBe(true);
    expect(prisma.event.findUnique).toHaveBeenCalledWith({
      where: { id: 'ev-1' },
      select: { cityId: true },
    });
  });

  it('historyId не знайдено -> NotFoundException', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.eventHistory.findUnique.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(
        createContext({ role: 'MANAGER', sub: 'm1' }, { historyId: 'missing' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('пріоритет id над schoolId/eventId/crewId', async () => {
    reflector.getAllAndOverride.mockReturnValueOnce('event');
    prisma.user.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    prisma.event.findUnique.mockResolvedValueOnce({ cityId: 'city-1' });
    await guard.canActivate(
      createContext(
        { role: 'MANAGER', sub: 'm1' },
        { id: 'event-by-id', eventId: 'event-by-eventId' },
      ),
    );
    expect(prisma.event.findUnique).toHaveBeenCalledWith({
      where: { id: 'event-by-id' },
      select: { cityId: true },
    });
  });
});

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

    if (user?.role === 'SUPERADMIN' || user?.role === 'OWNER') return true;

    let paramId: string | undefined =
      request.params.id ??
      request.params.schoolId ??
      request.params.eventId ??
      request.params.crewId;

    if (!paramId && request.params.historyId && resourceType === 'event') {
      const history = await this.prisma.eventHistory.findUnique({
        where: { id: request.params.historyId },
        select: { eventId: true },
      });
      if (!history) throw new NotFoundException('Запис історії не знайдено');
      paramId = history.eventId;
    }

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

# FILE: apps/backend/src/auth/guards/roles.guard.spec.ts

```
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: { getAllAndOverride: jest.Mock };

  const createContext = (user?: any): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    }) as any;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    guard = new RolesGuard(reflector as unknown as Reflector);
  });

  it('якщо requiredRoles відсутні -> true', () => {
    reflector.getAllAndOverride.mockReturnValueOnce(undefined);

    const ok = guard.canActivate(createContext({ role: UserRole.MANAGER }));

    expect(ok).toBe(true);
  });

  it('SUPERADMIN проходить незалежно від requiredRoles', () => {
    reflector.getAllAndOverride.mockReturnValueOnce([UserRole.MANAGER]);

    const ok = guard.canActivate(createContext({ role: UserRole.SUPERADMIN }));

    expect(ok).toBe(true);
  });

  it('роль входить у requiredRoles -> true', () => {
    reflector.getAllAndOverride.mockReturnValueOnce([UserRole.MANAGER]);

    const ok = guard.canActivate(createContext({ role: UserRole.MANAGER }));

    expect(ok).toBe(true);
  });

  it('роль не входить у requiredRoles -> ForbiddenException', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.MANAGER]);

    expect(() =>
      guard.canActivate(createContext({ role: UserRole.DRIVER })),
    ).toThrow(ForbiddenException);
    expect(() =>
      guard.canActivate(createContext({ role: UserRole.DRIVER })),
    ).toThrow('Недостатньо прав');
  });

  it('user відсутній -> ForbiddenException', () => {
    reflector.getAllAndOverride.mockReturnValueOnce([UserRole.MANAGER]);

    expect(() => guard.canActivate(createContext(undefined))).toThrow(
      ForbiddenException,
    );
  });
});

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
import { OwnershipGuard } from '../auth/guards/ownership.guard';

describe('CitiesController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        { provide: CitiesService, useValue: {} },
        { provide: JwtService, useValue: { verifyAsync: jest.fn() } },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(OwnershipGuard)
      .useValue({ canActivate: () => true })
      .compile();
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
import { PrismaService } from '../prisma/prisma.service';

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

# FILE: apps/backend/src/common/cache/cache-version.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheVersionService } from './cache-version.service';

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('CacheVersionService', () => {
  let service: CacheVersionService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheVersionService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();
    service = module.get<CacheVersionService>(CacheVersionService);
  });

  describe('getVersion', () => {
    it('повертає 0 коли версія не збережена', async () => {
      mockCacheManager.get.mockResolvedValueOnce(undefined);
      const version = await service.getVersion('finance');
      expect(version).toBe(0);
    });

    it('повертає збережене значення', async () => {
      mockCacheManager.get.mockResolvedValueOnce(5);
      const version = await service.getVersion('dashboard');
      expect(version).toBe(5);
    });
  });

  describe('bumpVersion', () => {
    it('встановлює 1 при першому виклику', async () => {
      mockCacheManager.get.mockResolvedValueOnce(undefined);
      await service.bumpVersion('finance');
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'cache:version:finance',
        1,
        0,
      );
    });

    it('інкрементує версію при повторному виклику', async () => {
      mockCacheManager.get.mockResolvedValueOnce(1);
      await service.bumpVersion('finance');
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'cache:version:finance',
        2,
        0,
      );

      mockCacheManager.get.mockResolvedValueOnce(2);
      await service.bumpVersion('finance');
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'cache:version:finance',
        3,
        0,
      );
    });
  });
});

```

# FILE: apps/backend/src/common/cache/cache-version.service.ts

```
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheVersionService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getVersion(namespace: string): Promise<number> {
    const key = `cache:version:${namespace}`;
    const version = await this.cacheManager.get<number>(key);
    return version ?? 0;
  }

  async bumpVersion(namespace: string): Promise<void> {
    const key = `cache:version:${namespace}`;
    const current = await this.cacheManager.get<number>(key);
    await this.cacheManager.set(key, (current ?? 0) + 1, 0);
  }
}

```

# FILE: apps/backend/src/common/cache/redis-cache.module.ts

```
import { Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheVersionService } from './cache-version.service';

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
  providers: [CacheVersionService],
  exports: [CacheVersionService, CacheModule],
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
  FORBIDDEN: {
    uk: 'Недостатньо прав',
    en: 'Forbidden',
  },
  CROSS_CITY_DAY_OFF: {
    uk: 'Можна призначати вихідні лише співробітникам свого міста',
    en: 'Can only manage day offs for own city staff',
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
        const entity = context
          .getClass()
          .name.replace(/Controller$/, '')
          .toLowerCase();
        const entityId =
          (Object.values(req.params ?? {}).find(
            (v) => typeof v === 'string' && /^\d+$/.test(v),
          ) as string | undefined) ?? undefined;

        this.prisma.auditLog
          .create({
            data: {
              userId: user?.sub,
              userName: user?.name,
              action: `${req.method} ${entity || req.path}`,
              entity: entity || undefined,
              entityId,
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
  METRICS_TOKEN: Joi.string().optional(),
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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
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
@UseGuards(AuthGuard, RolesGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Загальна аналітика для дашборда' })
  @Get('summary')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getSummary(
    @CurrentUser() user: JwtUser,
    @Query() query: DashboardSummaryQueryDto,
  ): Promise<DashboardSummary> {
    let effectiveCityId: string | undefined;
    if (user.role === 'SUPERADMIN' || user.role === 'OWNER') {
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

const mockCacheManager = {
  get: jest.fn().mockResolvedValue(undefined),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

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

const mockCacheVersion = {
  getVersion: jest.fn().mockResolvedValue(0),
  bumpVersion: jest.fn().mockResolvedValue(undefined),
};

const makeService = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      DashboardService,
      { provide: PrismaService, useValue: mockPrisma },
      { provide: CACHE_MANAGER, useValue: mockCacheManager },
      { provide: CacheVersionService, useValue: mockCacheVersion },
    ],
  }).compile();
  return module.get<DashboardService>(DashboardService);
};

const defaultMocks = () => {
  mockPrisma.event.findMany
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([]);
  mockPrisma.$queryRaw
    .mockResolvedValueOnce([
      { status: 'BASE', count: BigInt(10) },
      { status: 'FIRST_CONTACT', count: BigInt(5) },
      { status: 'IN_PROGRESS', count: BigInt(3) },
    ])
    .mockResolvedValueOnce([]);
  mockPrisma.eventHistory.findMany.mockResolvedValueOnce([]);
};

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    jest.clearAllMocks();
    service = await makeService();
    mockCacheManager.get.mockClear();
    mockCacheManager.set.mockClear();
    mockCacheManager.del.mockClear();
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
      mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
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
      mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
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

      mockPrisma.event.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
      mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([
        {
          id: 's-stale',
          name: 'Стала школа',
          status: 'FIRST_CONTACT',
          lastActivity: staleDate,
        },
      ]);
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
      mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([
        { id: 's-2', name: 'Школа 2', status: 'BASE', lastActivity: date20 },
        { id: 's-1', name: 'Школа 1', status: 'BASE', lastActivity: date10 },
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
      mockPrisma.$queryRaw.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
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
      mockCacheManager.get
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce({ cached: true } as any);
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
import { CacheVersionService } from '../common/cache/cache-version.service';
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
    private readonly cacheVersion: CacheVersionService,
  ) {}

  async getSummary(cityId?: string, role?: string): Promise<DashboardSummary> {
    const version = await this.cacheVersion.getVersion('dashboard');
    const key = `dashboard:v${version}:${cityId ?? 'all'}-${role ?? 'anon'}`;
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
    const canSeeAllCities = role === 'SUPERADMIN' || role === 'OWNER';

    const [eventsWindow, funnelStats, monthlyKpi, staleSchools, activityFeed] =
      await Promise.all([
        this.getEventsWindow(cityFilter, windows),
        this.getFunnelStats(cityId),
        this.getMonthlyKpi(cityFilter, windows),
        this.getStaleSchools(cityFilter, windows.staleThreshold, now),
        this.getActivityFeed(cityId, windows.todayStart),
      ]);

    const citiesStats = canSeeAllCities
      ? await this.getCitiesStats(windows)
      : [];

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
        acc.revenue += Number(ev.report?.totalSum ?? 0);
        acc.profit += Number(ev.report?.remainderSum ?? 0);
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
        (revenueIdx[ev.cityId] ?? 0) + Number(ev.report?.totalSum ?? 0);
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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateDayOffDto } from './dto/create-day-off.dto';

@ApiTags('DaysOff')
@ApiCookieAuth('access_token')
@Controller('days-off')
@UseGuards(AuthGuard, RolesGuard)
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
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TelegramModule, NotificationsModule],
  controllers: [DaysOffController],
  providers: [DaysOffService],
})
export class DaysOffModule {}

```

# FILE: apps/backend/src/days-off/days-off.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { DaysOffService } from './days-off.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AppException } from '../common/exceptions/app.exception';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';

const mockPrisma = {
  dayOff: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  },
};

const mockTelegram = {
  sendMessage: jest.fn(),
};

const mockNotifications = {
  create: jest.fn().mockResolvedValue(undefined),
};

const hostUser: JwtUser = {
  sub: 'host-1',
  name: 'Host One',
  role: 'HOST',
  cityId: 'city-1',
};

const driverUser: JwtUser = {
  sub: 'driver-1',
  name: 'Driver One',
  role: 'DRIVER',
  cityId: 'city-1',
};

const managerUser: JwtUser = {
  sub: 'manager-1',
  name: 'Manager One',
  role: 'MANAGER',
  cityId: 'city-1',
};

const superAdminUser: JwtUser = {
  sub: 'admin-1',
  name: 'Admin One',
  role: 'SUPERADMIN',
  cityId: null,
};

describe('DaysOffService', () => {
  let service: DaysOffService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DaysOffService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
        { provide: NotificationsService, useValue: mockNotifications },
      ],
    }).compile();

    service = module.get<DaysOffService>(DaysOffService);
  });

  describe('findAll', () => {
    it('без фільтрів формує базовий findMany include+orderBy', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll();

      expect(mockPrisma.dayOff.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          user: { select: { id: true, name: true, role: true, cityId: true } },
        },
        orderBy: { date: 'asc' },
      });
    });

    it('лише from додає where.date.gte', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll('2026-07-01');

      const call = mockPrisma.dayOff.findMany.mock.calls[0][0];
      expect(call.where.date.gte).toEqual(new Date('2026-07-01'));
      expect(call.where.date.lte).toBeUndefined();
    });

    it('лише to додає where.date.lte', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll(undefined, '2026-07-31');

      const call = mockPrisma.dayOff.findMany.mock.calls[0][0];
      expect(call.where.date.lte).toEqual(new Date('2026-07-31'));
      expect(call.where.date.gte).toBeUndefined();
    });

    it('from+to+cityId комбінує всі фільтри', async () => {
      mockPrisma.dayOff.findMany.mockResolvedValueOnce([]);

      await service.findAll('2026-07-01', '2026-07-31', 'city-1');

      expect(mockPrisma.dayOff.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            date: {
              gte: new Date('2026-07-01'),
              lte: new Date('2026-07-31'),
            },
            user: { cityId: 'city-1' },
          },
        }),
      );
    });
  });

  describe('create', () => {
    it('HOST ігнорує dto.userId та використовує currentUser.sub', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd1',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await service.create(
        { date: '2026-07-10', userId: 'another-user' },
        hostUser,
      );

      const upsertArg = mockPrisma.dayOff.upsert.mock.calls[0][0];
      expect(upsertArg.where.userId_date.userId).toBe(hostUser.sub);
      expect(upsertArg.create.userId).toBe(hostUser.sub);
      expect(upsertArg.create.createdBy).toBe(hostUser.sub);
    });

    it('DRIVER також використовує currentUser.sub', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd1',
        userId: driverUser.sub,
        user: {
          id: driverUser.sub,
          name: 'Driver One',
          role: 'DRIVER',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await service.create({ date: '2026-07-11' }, driverUser);

      const upsertArg = mockPrisma.dayOff.upsert.mock.calls[0][0];
      expect(upsertArg.where.userId_date.userId).toBe(driverUser.sub);
      expect(upsertArg.update).toEqual({});
    });

    it('MANAGER без userId отримує USER_ID_REQUIRED', async () => {
      await expect(
        service.create({ date: '2026-07-10' }, managerUser),
      ).rejects.toMatchObject({
        messageKey: 'USER_ID_REQUIRED',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('SUPERADMIN без userId отримує USER_ID_REQUIRED', async () => {
      await expect(
        service.create({ date: '2026-07-10' }, superAdminUser),
      ).rejects.toMatchObject({
        messageKey: 'USER_ID_REQUIRED',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('MANAGER не може призначити вихідний staff з іншого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'host-2',
        role: 'HOST',
        cityId: 'city-2',
      });

      await expect(
        service.create({ date: '2026-07-10', userId: 'host-2' }, managerUser),
      ).rejects.toBeInstanceOf(AppException);
    });

    it('MANAGER може призначити staff свого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'host-2',
        role: 'HOST',
        cityId: 'city-1',
      });
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd2',
        userId: 'host-2',
        user: {
          id: 'host-2',
          name: 'Host Two',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.create(
        { date: '2026-07-10', userId: 'host-2' },
        managerUser,
      );

      expect(result.id).toBe('d2');
    });

    it('SUPERADMIN може призначити staff з будь-якого міста', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'driver-2',
        role: 'DRIVER',
        cityId: 'city-9',
      });
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd3',
        userId: 'driver-2',
        user: {
          id: 'driver-2',
          name: 'Driver Two',
          role: 'DRIVER',
          cityId: 'city-9',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.create(
        { date: '2026-07-10', userId: 'driver-2' },
        superAdminUser,
      );

      expect(result.id).toBe('d3');
    });

    it('цільовий користувач не STAFF -> INVALID_STAFF_USER', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'manager-2',
        role: 'MANAGER',
        cityId: 'city-1',
      });

      await expect(
        service.create(
          { date: '2026-07-10', userId: 'manager-2' },
          superAdminUser,
        ),
      ).rejects.toMatchObject({
        messageKey: 'INVALID_STAFF_USER',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('цільовий користувач не знайдений -> INVALID_STAFF_USER', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.create(
          { date: '2026-07-10', userId: 'missing-user' },
          managerUser,
        ),
      ).rejects.toMatchObject({
        messageKey: 'INVALID_STAFF_USER',
        status: HttpStatus.BAD_REQUEST,
      });
    });

    it('для role поза whitelist -> AppException', async () => {
      const outsider = { ...hostUser, role: 'ACCOUNTANT' as any };

      await expect(
        service.create({ date: '2026-07-10', userId: 'host-2' }, outsider),
      ).rejects.toBeInstanceOf(AppException);
    });

    it('якщо existing відсутній -> викликає notifyManager(action=created)', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'd4',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await service.create({ date: '2026-07-10' }, hostUser);

      expect(notifySpy).toHaveBeenCalledWith(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );
    });

    it('якщо existing є -> notifyManager не викликається (anti-spam)', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'existing-1',
        userId: hostUser.sub,
      });
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'existing-1',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });

      await service.create({ date: '2026-07-10' }, hostUser);

      expect(notifySpy).not.toHaveBeenCalled();
    });

    it('поточна поведінка: минула дата дозволена (без серверної валідації past-date)', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);
      mockPrisma.dayOff.upsert.mockResolvedValueOnce({
        id: 'past-1',
        userId: hostUser.sub,
        user: {
          id: hostUser.sub,
          name: 'Host One',
          role: 'HOST',
          cityId: 'city-1',
        },
      });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.create({ date: '2000-01-01' }, hostUser);

      expect(result.id).toBe('past-1');
      const upsertArg = mockPrisma.dayOff.upsert.mock.calls[0][0];
      expect(upsertArg.where.userId_date.date).toEqual(new Date('2000-01-01'));
    });

    it('STAFF двічі поспіль на ту саму дату: upsert повертає той самий запис, дубліката не очікується', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: 'same-1', userId: hostUser.sub });
      mockPrisma.dayOff.upsert
        .mockResolvedValueOnce({
          id: 'same-1',
          userId: hostUser.sub,
          user: {
            id: hostUser.sub,
            name: 'Host One',
            role: 'HOST',
            cityId: 'city-1',
          },
        })
        .mockResolvedValueOnce({
          id: 'same-1',
          userId: hostUser.sub,
          user: {
            id: hostUser.sub,
            name: 'Host One',
            role: 'HOST',
            cityId: 'city-1',
          },
        });
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const first = await service.create({ date: '2026-07-10' }, hostUser);
      const second = await service.create({ date: '2026-07-10' }, hostUser);

      expect(first.id).toBe('same-1');
      expect(second.id).toBe('same-1');
      expect(mockPrisma.dayOff.upsert).toHaveBeenCalledTimes(2);
      expect(notifySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('якщо dayOff не знайдено -> DAY_OFF_NOT_FOUND', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce(null);

      await expect(service.remove('missing', hostUser)).rejects.toMatchObject({
        messageKey: 'DAY_OFF_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
      });
    });

    it('owner STAFF може видалити свій вихідний', async () => {
      const notifySpy = jest.spyOn<any, any>(service as any, 'notifyManager');
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd10',
        userId: hostUser.sub,
        date: new Date('2026-07-10'),
        user: { name: 'Host One', cityId: 'city-1' },
      });
      mockPrisma.dayOff.delete.mockResolvedValueOnce({});
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.remove('d10', hostUser);

      expect(result).toEqual({ success: true });
      expect(mockPrisma.dayOff.delete).toHaveBeenCalledWith({
        where: { id: 'd10' },
      });
      expect(notifySpy).toHaveBeenCalledWith(
        'city-1',
        'Host One',
        new Date('2026-07-10').toISOString(),
        'removed',
      );
    });

    it('MANAGER (не owner) може видалити тільки у межах свого міста', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd11',
        userId: 'host-2',
        date: new Date('2026-07-12'),
        user: { name: 'Host Two', cityId: 'city-1' },
      });
      mockPrisma.dayOff.delete.mockResolvedValueOnce({});
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      const result = await service.remove('d11', managerUser);

      expect(result).toEqual({ success: true });
    });

    it('MANAGER (не owner) не може видалити у чужому місті', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd12',
        userId: 'host-2',
        date: new Date('2026-07-12'),
        user: { name: 'Host Two', cityId: 'city-9' },
      });

      await expect(service.remove('d12', managerUser)).rejects.toBeInstanceOf(
        AppException,
      );
      expect(mockPrisma.dayOff.delete).not.toHaveBeenCalled();
    });

    it('не owner і не manager/admin -> AppException', async () => {
      mockPrisma.dayOff.findUnique.mockResolvedValueOnce({
        id: 'd13',
        userId: 'host-2',
        date: new Date('2026-07-12'),
        user: { name: 'Host Two', cityId: 'city-1' },
      });

      await expect(service.remove('d13', driverUser)).rejects.toBeInstanceOf(
        AppException,
      );
    });
  });

  describe('notifyManager (private)', () => {
    it('cityId=null -> ранній вихід без запитів', async () => {
      await (service as any).notifyManager(
        null,
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockPrisma.user.findFirst).not.toHaveBeenCalled();
      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('менеджера не знайдено -> без telegram', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('пріоритет telegramChatId над telegramId', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm1',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: 'chat-123',
        telegramId: '999999',
      });
      mockTelegram.sendMessage.mockResolvedValueOnce(undefined);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chat-123',
        expect.stringContaining('Призначено вихідний'),
      );
    });

    it('fallback на numeric telegramId, якщо telegramChatId відсутній', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm2',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: null,
        telegramId: '123456789',
      });
      mockTelegram.sendMessage.mockResolvedValueOnce(undefined);

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'removed',
      );

      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        '123456789',
        expect.stringContaining('Скасовано вихідний'),
      );
    });

    it('не numeric telegramId -> не відправляє', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm3',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: null,
        telegramId: 'abc123',
      });

      await (service as any).notifyManager(
        'city-1',
        'Host One',
        '2026-07-10',
        'created',
      );

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('помилка telegramService.sendMessage пробрасывається', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce({
        id: 'm4',
        role: 'MANAGER',
        cityId: 'city-1',
        telegramChatId: 'chat-err',
        telegramId: null,
      });
      mockTelegram.sendMessage.mockRejectedValueOnce(
        new Error('telegram failed'),
      );

      await expect(
        (service as any).notifyManager(
          'city-1',
          'Host One',
          '2026-07-10',
          'created',
        ),
      ).rejects.toThrow('telegram failed');
    });
  });
});

```

# FILE: apps/backend/src/days-off/days-off.service.ts

```
import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AppException } from '../common/exceptions/app.exception';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

const STAFF_ROLES = ['HOST', 'DRIVER'];
const MANAGER_ROLES = ['SUPERADMIN', 'MANAGER'];

@Injectable()
export class DaysOffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
    private readonly notificationsService: NotificationsService,
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
        throw new AppException('CROSS_CITY_DAY_OFF', HttpStatus.FORBIDDEN);
      }
      targetUserId = target.id;
    } else {
      throw new AppException('FORBIDDEN', HttpStatus.FORBIDDEN);
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
      throw new AppException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    if (currentUser.role === 'MANAGER' && !isOwner) {
      if (dayOff.user.cityId !== currentUser.cityId) {
        throw new AppException('CROSS_CITY_DAY_OFF', HttpStatus.FORBIDDEN);
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

    this.notificationsService
      .create(
        manager.id,
        action === 'created' ? 'DAY_OFF_CREATED' : 'DAY_OFF_REMOVED',
        {
          staffName,
          date: dateStr,
          action,
        },
      )
      .catch(() => {});
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
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class EventQueryDto extends PageOptionsDto {}

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

export class SalaryRecordDto {
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

export class InventoryUsageDto {
  @IsString()
  itemId: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
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
  @Type(() => SalaryRecordDto)
  salaries: SalaryRecordDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryUsageDto)
  inventoryUsages?: InventoryUsageDto[];
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
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

const EVENT_STATUSES = [
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
] as const;

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(EVENT_STATUSES)
  status: string;

  @IsString()
  @IsNotEmpty()
  actionName: string;

  @IsOptional()
  @IsString()
  comment?: string;
}

```

# FILE: apps/backend/src/events/events-report.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { EventsReportService } from './events-report.service';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheVersionService } from '../common/cache/cache-version.service';

const mockPrisma = {
  $transaction: jest.fn(),
};

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' } as const;

describe('EventsReportService', () => {
  let service: EventsReportService;
  let mockTx: any;

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

  const setupTx = () => {
    mockTx = {
      eventReport: { upsert: jest.fn() },
      expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
      salaryRecord: { deleteMany: jest.fn(), createMany: jest.fn() },
      user: { update: jest.fn() },
      event: { update: jest.fn() },
    };
    mockPrisma.$transaction.mockImplementation(
      async (fn: (tx: any) => unknown, _opts?: unknown) => fn(mockTx),
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    setupTx();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsReportService,
        { provide: PrismaService, useValue: mockPrisma },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(undefined),
            del: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: CacheVersionService,
          useValue: {
            getVersion: jest.fn().mockResolvedValue(0),
            bumpVersion: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<EventsReportService>(EventsReportService);
  });

  describe('submitReport', () => {
    it('зберігає звіт через upsert', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
      mockTx.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.eventReport.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { eventId: 'ev-1' },
          update: expect.objectContaining({
            totalSum: expect.any(Prisma.Decimal),
            remainderSum: expect.any(Prisma.Decimal),
          }),
          create: expect.objectContaining({
            totalSum: expect.any(Prisma.Decimal),
            remainderSum: expect.any(Prisma.Decimal),
          }),
        }),
      );
    });

    it('нараховує зарплату користувачам', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.user.update).toHaveBeenCalledTimes(2);
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'host-1' },
        data: { balance: { increment: 1500 } },
      });
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: { id: 'driver-1' },
        data: { balance: { increment: 1000 } },
      });
    });

    it('не нараховує зарплату якщо amount = 0', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport(
        'ev-1',
        {
          ...reportData,
          salaries: [{ userId: 'host-1', name: 'Host', amount: 0 }],
        },
        mockUser,
      );

      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('змінює статус на REPORT після збереження звіту', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      const result = await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({ status: 'REPORT' }),
        }),
      );
      expect(result.status).toBe('REPORT');
    });

    it('не нараховує зарплату якщо salaries порожній', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
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

      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('очищує попередні expense/salary записи перед кожною подачею звіту (ідемпотентність редагування)', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({ id: 'report-1' });
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.expenseItem.deleteMany).toHaveBeenCalledWith({
        where: { reportId: 'report-1' },
      });
      expect(mockTx.salaryRecord.deleteMany).toHaveBeenCalledWith({
        where: { reportId: 'report-1' },
      });
    });

    it('deleteMany викликається завжди, навіть якщо expenses і salaries порожні', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
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

      expect(mockTx.expenseItem.deleteMany).toHaveBeenCalled();
      expect(mockTx.salaryRecord.deleteMany).toHaveBeenCalled();
      expect(mockTx.expenseItem.createMany).not.toHaveBeenCalled();
      expect(mockTx.salaryRecord.createMany).not.toHaveBeenCalled();
    });

    it('підставляє категорію "Інше" для витрати без вказаної категорії', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
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

      const call = mockTx.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].category).toBe('Інше');
    });

    it('конвертує суми витрат у Prisma.Decimal з точністю до копійок', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
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

      const call = mockTx.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].amount).toBeInstanceOf(Prisma.Decimal);
      expect(call.data[0].amount.toString()).toBe('349.99');
    });

    it('обробляє відсутність суми витрати (amount undefined -> 0)', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
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

      const call = mockTx.expenseItem.createMany.mock.calls[0][0];
      expect(call.data[0].amount.toString()).toBe('0');
    });

    it("не нараховує баланс якщо сума зарплати від'ємна, але запис зберігається", async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.event.update.mockResolvedValueOnce({
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

      expect(mockTx.salaryRecord.createMany).toHaveBeenCalled();
      expect(mockTx.user.update).not.toHaveBeenCalled();
    });

    it('створює всі salary items одним викликом createMany', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockTx.salaryRecord.createMany).toHaveBeenCalledTimes(1);
      const call = mockTx.salaryRecord.createMany.mock.calls[0][0];
      expect(call.data).toHaveLength(2);
    });

    it('зберігає totalSum/schoolSum/remainderSum саме такими, як прийшли з фронтенду — бекенд НЕ перераховує арифметику', async () => {
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

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

      const call = mockTx.eventReport.upsert.mock.calls[0][0];
      expect(Number(call.update.remainderSum)).toBe(11500);
    });

    it('коректно обробляє відсутній rating', async () => {
      const { rating, ...withoutRating } = reportData;
      mockTx.eventReport.upsert.mockResolvedValueOnce({});
      mockTx.user.update.mockResolvedValue({});
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await service.submitReport('ev-1', withoutRating, mockUser);

      const call = mockTx.eventReport.upsert.mock.calls[0][0];
      expect(call.update.rating).toBeUndefined();
    });

    it('транзакція відкочується при помилці — event.update не виконується', async () => {
      mockTx.eventReport.upsert.mockRejectedValueOnce(new Error('DB error'));
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        status: 'REPORT',
        report: {},
        history: [],
      });

      await expect(
        service.submitReport('ev-1', reportData, mockUser),
      ).rejects.toThrow('DB error');

      expect(mockTx.event.update).not.toHaveBeenCalled();
      expect(mockPrisma.$transaction).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ timeout: 15000 }),
      );
    });
  });
});

```

# FILE: apps/backend/src/events/events-report.service.ts

```
import {
  Injectable,
  Logger,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';
import { Prisma } from '@prisma/client';
import {
  SubmitReportDto,
  ExpenseItemDto,
  InventoryUsageDto,
} from './dto/submit-report.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Injectable()
export class EventsReportService {
  private readonly logger = new Logger(EventsReportService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  private toOptionalNumber(value: unknown): number | null {
    return value != null ? Number(value) : null;
  }

  private toNumber(value: unknown): number {
    return Number(value ?? 0);
  }

  private serializeEvent<T extends Record<string, unknown>>(ev: T): T {
    return {
      ...ev,
      price: this.toOptionalNumber(ev.price),
      received: this.toOptionalNumber(ev.received),
      report: ev.report
        ? {
            ...(ev.report as Record<string, unknown>),
            totalSum: this.toNumber(
              (ev.report as Record<string, unknown>).totalSum,
            ),
            schoolSum: this.toNumber(
              (ev.report as Record<string, unknown>).schoolSum,
            ),
            remainderSum: this.toNumber(
              (ev.report as Record<string, unknown>).remainderSum,
            ),
          }
        : ev.report,
    };
  }

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    const event = await this.prisma.$transaction(
      async (tx) => {
        const report = await tx.eventReport.upsert({
          where: { eventId },
          update: {
            status: 'SUBMITTED' as never,
            submittedAt: new Date(),
            announcementDone: reportData.announcementDone,
            materialShown: reportData.materialShown,
            childrenCount: reportData.childrenCount,
            classesCount: reportData.classesCount,
            privilegedCount: reportData.privilegedCount,
            showingsCount: reportData.showingsCount,
            totalSum: new Prisma.Decimal(reportData.totalSum),
            schoolSum: new Prisma.Decimal(reportData.schoolSum),
            remainderSum: new Prisma.Decimal(reportData.remainderSum),
            rating: reportData.rating,
          },
          create: {
            eventId,
            status: 'SUBMITTED' as never,
            submittedAt: new Date(),
            announcementDone: reportData.announcementDone,
            materialShown: reportData.materialShown,
            childrenCount: reportData.childrenCount,
            classesCount: reportData.classesCount,
            privilegedCount: reportData.privilegedCount,
            showingsCount: reportData.showingsCount,
            totalSum: new Prisma.Decimal(reportData.totalSum),
            schoolSum: new Prisma.Decimal(reportData.schoolSum),
            remainderSum: new Prisma.Decimal(reportData.remainderSum),
            rating: reportData.rating,
          },
        });

        await tx.expenseItem.deleteMany({
          where: { reportId: report.id },
        });
        await tx.salaryRecord.deleteMany({
          where: { reportId: report.id },
        });

        if (reportData.expenses?.length) {
          await tx.expenseItem.createMany({
            data: reportData.expenses.map((exp: ExpenseItemDto) => ({
              reportId: report.id,
              category: exp.category || 'Інше',
              name: exp.name,
              amount: new Prisma.Decimal(exp.amount || 0),
            })),
          });
        }

        if (reportData.salaries?.length) {
          const salariesWithUser = reportData.salaries.filter((s) => s.userId);
          if (salariesWithUser.length) {
            await tx.salaryRecord.createMany({
              data: salariesWithUser.map((s) => ({
                reportId: report.id,
                employeeId: s.userId,
                amount: new Prisma.Decimal(s.amount),
                status: 'PAID',
                createdBy: user.sub,
                eventId,
              })),
            });

            const positiveSalaries = salariesWithUser.filter(
              (s) => s.amount > 0,
            );
            for (const s of positiveSalaries) {
              await tx.user.update({
                where: { id: s.userId },
                data: { balance: { increment: s.amount } },
              });
            }
          }
        }

        if (reportData.inventoryUsages?.length) {
          for (const usage of reportData.inventoryUsages) {
            const item = await tx.inventoryItem.findUnique({
              where: { id: usage.itemId },
            });
            if (!item) {
              throw new BadRequestException(
                `Товар з id ${usage.itemId} не знайдено`,
              );
            }
            if (item.currentStock < usage.quantity) {
              throw new BadRequestException('inventory.insufficientStock');
            }
            await tx.inventoryItem.update({
              where: { id: usage.itemId },
              data: { currentStock: { decrement: usage.quantity } },
            });
            await tx.inventoryUsage.create({
              data: {
                itemId: usage.itemId,
                reportId: report.id,
                quantity: usage.quantity,
              },
            });
            const updated = await tx.inventoryItem.findUnique({
              where: { id: usage.itemId },
            });
            if (updated && updated.currentStock < updated.minStock) {
              this.logger.warn(
                `Inventory item "${item.name}" (${item.id}) below min stock: ${updated.currentStock}/${updated.minStock}`,
              );
            }
          }
        }

        return tx.event.update({
          where: { id: eventId },
          data: {
            status: 'REPORT' as never,
            history: {
              create: {
                action: 'Сформовано звіт. Захід завершено.',
                userId: user.sub,
                userName: user.name,
                role: user.role,
              },
            },
          },
          include: {
            report: true,
            history: { orderBy: { createdAt: 'desc' } },
          },
        });
      },
      { timeout: 15000 },
    );

    await this.invalidateSchoolEventsCache(event.schoolId);
    await Promise.all([
      this.cacheVersion.bumpVersion('finance'),
      this.cacheVersion.bumpVersion('dashboard'),
    ]);
    return this.serializeEvent(event);
  }
}

```

# FILE: apps/backend/src/events/events-scheduler.service.spec.ts

```
import { EventsSchedulerService } from './events-scheduler.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  event: { findMany: jest.fn() },
};
const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };

const makeService = () =>
  new EventsSchedulerService(
    mockPrisma as unknown as PrismaService,
    mockTelegram as unknown as TelegramService,
    mockNotifications as unknown as NotificationsService,
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('EventsSchedulerService', () => {
  describe('onModuleInit', () => {
    it('викликає scheduleDailyCheck при ініціалізації модуля', () => {
      const service = makeService();
      const spy = jest
        .spyOn(service as any, 'scheduleDailyCheck')
        .mockImplementation(() => {});
      service.onModuleInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('checkEventsForTomorrow', () => {
    it('надсилає нагадування ведучому та водію якщо є crew', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const mockEvent = {
        id: 'ev-1',
        project: 'Голограма',
        contactPhone: '0501234567',
        school: { name: 'Школа №1' },
        city: { name: 'Львів' },
        crew: {
          host: { telegramChatId: '111', telegramId: null },
          driver: { telegramChatId: null, telegramId: '222' },
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([mockEvent]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        '111',
        expect.stringContaining('ведучий'),
      );
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        '222',
        expect.stringContaining('водій'),
      );
    });

    it('не надсилає нагадування якщо crew відсутній', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([
        { id: 'ev-1', project: 'Test', school: {}, city: {}, crew: null },
      ]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('не надсилає якщо подій на завтра немає', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('запитує події з датою у межах завтра (gte/lte)', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);

      const service = makeService();
      const before = new Date();
      await service.checkEventsForTomorrow();
      const after = new Date();

      const call = mockPrisma.event.findMany.mock.calls[0][0];
      const { gte, lte } = call.where.date;

      // gte — початок завтра (00:00)
      expect(gte.getHours()).toBe(0);
      expect(gte.getMinutes()).toBe(0);
      // lte — кінець завтра (23:59)
      expect(lte.getHours()).toBe(23);
      expect(lte.getMinutes()).toBe(59);
      // обидва — завтра
      const tomorrowDate = new Date(before);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      expect(gte.getDate()).toBe(tomorrowDate.getDate());
    });

    it('фільтрує події, виключаючи RE_SALE', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      const service = makeService();
      await service.checkEventsForTomorrow();

      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where.status).toEqual({ not: 'RE_SALE' });
    });

    it('не кидає помилку якщо sendMessage падає', async () => {
      const event = {
        id: 'ev-1',
        project: 'Тест',
        contactPhone: null,
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        crew: {
          host: { telegramChatId: '111', telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);
      mockTelegram.sendMessage.mockRejectedValueOnce(
        new Error('Telegram API error'),
      );

      const service = makeService();
      await expect(service.checkEventsForTomorrow()).resolves.not.toThrow();
    });
  });

  describe('sendReminder (via checkEventsForTomorrow)', () => {
    it('не надсилає якщо у user немає telegramChatId і telegramId', async () => {
      const event = {
        id: 'ev-1',
        project: 'Test',
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        contactPhone: null,
        crew: {
          host: { telegramChatId: null, telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('надсилає telegramChatId замість telegramId якщо обидва є', async () => {
      const event = {
        id: 'ev-1',
        project: 'Test',
        school: { name: 'Школа' },
        city: { name: 'Місто' },
        contactPhone: null,
        crew: {
          host: { telegramChatId: 'chatId-999', telegramId: 'userId-555' },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      // chatId має пріоритет
      expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
        'chatId-999',
        expect.any(String),
      );
    });

    it('повідомлення містить назву школи та проєкт', async () => {
      const event = {
        id: 'ev-1',
        project: 'Малювайко',
        school: { name: 'Гімназія №5' },
        city: { name: 'Тернопіль' },
        contactPhone: '0671234567',
        crew: {
          host: { telegramChatId: '333', telegramId: null },
          driver: null,
        },
      };
      mockPrisma.event.findMany.mockResolvedValueOnce([event]);

      const service = makeService();
      await service.checkEventsForTomorrow();

      const message = mockTelegram.sendMessage.mock.calls[0][1] as string;
      expect(message).toContain('Гімназія №5');
      expect(message).toContain('Малювайко');
      expect(message).toContain('0671234567');
    });
  });
});

```

# FILE: apps/backend/src/events/events-scheduler.service.ts

```
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EventsSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(EventsSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
  ) {}

  onModuleInit() {
    this.scheduleDailyCheck();
  }

  private scheduleDailyCheck() {
    const check = async () => {
      this.logger.log('Автоматична перевірка подій на завтра...');
      await this.checkEventsForTomorrow();
    };

    check().catch((err) =>
      this.logger.error('Помилка першої перевірки подій:', err),
    );

    setInterval(
      () => {
        check().catch((err) =>
          this.logger.error('Помилка перевірки подій:', err),
        );
      },
      24 * 60 * 60 * 1000,
    );
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

    this.notificationsService
      .create(user.id, 'EVENT_REMINDER', {
        eventId: event.id,
        project: event.project,
        schoolName: event.school?.name,
        role: roleLabel,
      })
      .catch(() => {});
  }
}

```

# FILE: apps/backend/src/events/events-scheduling.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { EventsSchedulingService } from './events-scheduling.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const mockTx = {
  event: { update: jest.fn() },
  schoolComment: { create: jest.fn() },
};
const mockPrisma = {
  $transaction: jest.fn((cb: (tx: typeof mockTx) => unknown) => cb(mockTx)),
  user: {
    findUnique: jest.fn(),
  },
};

const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' } as const;

describe('EventsSchedulingService', () => {
  let service: EventsSchedulingService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsSchedulingService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
        { provide: NotificationsService, useValue: mockNotifications },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(undefined),
            del: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<EventsSchedulingService>(EventsSchedulingService);
  });

  describe('rescheduleEvent', () => {
    it('оновлює дату, час та додає запис в історію', async () => {
      const updatedEvent = {
        id: 'ev-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { id: 'school-1', name: 'Школа №1' },
        city: { id: 'city-1', name: 'Київ' },
        crew: null,
        history: [{ id: 'h-1', action: 'Подію перенесено' }],
      };
      mockTx.event.update.mockResolvedValueOnce(updatedEvent);

      const result = await service.rescheduleEvent(
        'ev-1',
        '2025-10-15',
        '14:00',
        mockUser,
      );

      expect(mockTx.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({
            date: expect.any(Date),
            time: '14:00',
          }),
        }),
      );
      expect(result.time).toBe('14:00');
    });

    it('надсилає Telegram сповіщення якщо є екіпаж з chatId', async () => {
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { name: 'Школа' },
        city: { name: 'Київ' },
        crew: { hostId: 'host-1', driverId: 'driver-1' },
        history: [],
      });

      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'host-1',
        telegramChatId: '123456',
      });
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'driver-1',
        telegramChatId: '789012',
      });

      await service.rescheduleEvent('ev-1', '2025-10-15', '14:00', mockUser);

      expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
    });

    it('не надсилає сповіщення якщо екіпаж не призначений', async () => {
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { name: 'Школа' },
        city: { name: 'Київ' },
        crew: null,
        history: [],
      });

      await service.rescheduleEvent('ev-1', '2025-10-15', '14:00', mockUser);

      expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
    });

    it('інвалідує кеш школи після перенесення', async () => {
      mockTx.event.update.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-1',
        project: 'Голограма',
        date: new Date('2025-10-15'),
        time: '14:00',
        school: { id: 'school-1', name: 'Школа' },
        city: { id: 'city-1', name: 'Київ' },
        crew: null,
        history: [],
      });
      const cacheDelSpy = jest.spyOn((service as any).cacheManager, 'del');

      await service.rescheduleEvent('ev-1', '2025-10-15', '14:00', mockUser);

      expect(cacheDelSpy).toHaveBeenCalledWith(
        'events:school:school-1:minimal',
      );
      expect(cacheDelSpy).toHaveBeenCalledWith('events:school:school-1:full');
    });
  });
});

```

# FILE: apps/backend/src/events/events-scheduling.service.ts

```
import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Injectable()
export class EventsSchedulingService {
  private readonly logger = new Logger(EventsSchedulingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private toOptionalNumber(value: unknown): number | null {
    return value != null ? Number(value) : null;
  }

  private toNumber(value: unknown): number {
    return Number(value ?? 0);
  }

  private serializeEvent<T extends Record<string, unknown>>(ev: T): T {
    return {
      ...ev,
      price: this.toOptionalNumber(ev.price),
      received: this.toOptionalNumber(ev.received),
      report: ev.report
        ? {
            ...(ev.report as Record<string, unknown>),
            totalSum: this.toNumber(
              (ev.report as Record<string, unknown>).totalSum,
            ),
            schoolSum: this.toNumber(
              (ev.report as Record<string, unknown>).schoolSum,
            ),
            remainderSum: this.toNumber(
              (ev.report as Record<string, unknown>).remainderSum,
            ),
          }
        : ev.report,
    };
  }

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async rescheduleEvent(
    eventId: string,
    newDate: string,
    newTime: string,
    user: JwtUser,
  ) {
    const event = await this.prisma.$transaction(async (tx) => {
      const ev = await tx.event.update({
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

      await tx.schoolComment.create({
        data: {
          schoolId: ev.schoolId,
          authorId: user.sub,
          type: 'RESCHEDULE',
          text: `Подію "${ev.project}" перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
        },
      });

      return ev;
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
      `\n<i>Деталі у CRM: <a href="-https://app.svitlo-znan.app">Посилання</a></i>`;

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

    const payload = {
      eventId: event.id,
      project: event.project,
      schoolName: event.school?.name,
      newDate: dateStr,
      newTime,
    };
    if (event.crew?.hostId) {
      this.notificationsService
        .create(event.crew.hostId, 'EVENT_RESCHEDULED', payload)
        .catch(() => {});
    }
    if (event.crew?.driverId) {
      this.notificationsService
        .create(event.crew.driverId, 'EVENT_RESCHEDULED', payload)
        .catch(() => {});
    }

    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
  }
}

```

# FILE: apps/backend/src/events/events.controller.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsReportService } from './events-report.service';
import { EventsSchedulingService } from './events-scheduling.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

const mockEventsService = {
  findAllForUser: jest.fn(),
  findBySchool: jest.fn(),
  findCompletedBySchool: jest.fn(),
  findOne: jest.fn(),
  addHistoryComment: jest.fn(),
  updateHistoryComment: jest.fn(),
};

const mockEventsReportService = {
  submitReport: jest.fn(),
};

const mockEventsSchedulingService = {
  rescheduleEvent: jest.fn(),
};

const mockGuard = { canActivate: jest.fn() };

const mockJwtService = { verifyAsync: jest.fn() };

describe('EventsController (HTTP)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: mockEventsService },
        { provide: EventsReportService, useValue: mockEventsReportService },
        {
          provide: EventsSchedulingService,
          useValue: mockEventsSchedulingService,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(OwnershipGuard)
      .useValue(mockGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGuard.canActivate.mockResolvedValue(true);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /events/school/:schoolId — findBySchool', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      await request(app.getHttpServer()).get('/events/school/s-1').expect(403);
    });

    it('OWNERSHIP: HOST отримує 403 (resourceType=school не дозволено для HOST)', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до цього типу ресурсу',
        ),
      );
      await request(app.getHttpServer()).get('/events/school/s-1').expect(403);
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.findBySchool.mockResolvedValueOnce([]);
      const res = await request(app.getHttpServer())
        .get('/events/school/s-1')
        .expect(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /events/school/:schoolId/completed — findCompletedBySchool', () => {
    it('OWNERSHIP: MANAGER свого міста отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.findCompletedBySchool.mockResolvedValueOnce([
        { id: 'ev-1' },
      ]);
      const res = await request(app.getHttpServer())
        .get('/events/school/s-1/completed')
        .expect(200);
      expect(res.body).toHaveLength(1);
    });

    it('MANAGER без cityId отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          "Менеджер не прив'язаний до міста",
        ),
      );
      await request(app.getHttpServer())
        .get('/events/school/s-1/completed')
        .expect(403);
    });
  });

  describe('GET /events/:id — findOne', () => {
    it('OWNERSHIP: HOST без призначення отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до цієї події',
        ),
      );
      const res = await request(app.getHttpServer())
        .get('/events/ev-1')
        .expect(403);
      expect(res.body.message).toBe('Немає доступу до цієї події');
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.findOne.mockResolvedValueOnce({ id: 'ev-1' });
      const res = await request(app.getHttpServer())
        .get('/events/ev-1')
        .expect(200);
      expect(res.body.id).toBe('ev-1');
    });
  });

  describe('POST /events/:id/history — addHistoryComment', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      const res = await request(app.getHttpServer())
        .post('/events/ev-1/history')
        .send({ comment: 'test' })
        .expect(403);
      expect(res.body.message).toBe('Немає доступу до ресурсу іншого міста');
    });

    it('HOST призначений на подію отримує 201', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.addHistoryComment.mockResolvedValueOnce({
        id: 'ev-1',
        history: [],
      });
      const res = await request(app.getHttpServer())
        .post('/events/ev-1/history')
        .send({ comment: 'коментар' })
        .expect(201);
    });
  });

  describe('PATCH /events/history/:historyId — updateHistoryComment', () => {
    it('OWNERSHIP: історія не знайдена — 404', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').NotFoundException)(
          'Запис історії не знайдено',
        ),
      );
      const res = await request(app.getHttpServer())
        .patch('/events/history/missing')
        .send({ comment: 'test' })
        .expect(404);
      expect(res.body.message).toBe('Запис історії не знайдено');
    });

    it('MANAGER свого міста отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.updateHistoryComment.mockResolvedValueOnce({
        id: 'h-1',
      });
      await request(app.getHttpServer())
        .patch('/events/history/h-1')
        .send({ comment: 'оновлено' })
        .expect(200);
    });
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
import { EventsReportService } from './events-report.service';
import { EventsSchedulingService } from './events-scheduling.service';
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
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsReportService: EventsReportService,
    private readonly eventsSchedulingService: EventsSchedulingService,
  ) {}

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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
  addHistoryComment(
    @Param('id') id: string,
    @Body() body: AddCommentDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.addHistoryComment(id, body.comment, user);
  }

  @Patch('history/:historyId')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
    return this.eventsReportService.submitReport(id, body, user);
  }

  @Get('school/:schoolId/completed')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  findCompletedBySchool(@Param('schoolId') schoolId: string) {
    return this.eventsService.findCompletedBySchool(schoolId);
  }

  @Get(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
    return this.eventsSchedulingService.rescheduleEvent(
      id,
      body.date,
      body.time,
      user,
    );
  }
}

```

# FILE: apps/backend/src/events/events.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsReportService } from './events-report.service';
import { EventsSchedulingService } from './events-scheduling.service';
import { EventsController } from './events.controller';
import { SchoolsModule } from '../schools/schools.module';
import { TelegramModule } from '../telegram/telegram.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { EventsSchedulerService } from './events-scheduler.service';

@Module({
  imports: [
    forwardRef(() => SchoolsModule),
    TelegramModule,
    NotificationsModule,
    RedisCacheModule,
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
    EventsReportService,
    EventsSchedulingService,
    EventsSchedulerService,
  ],
  exports: [EventsService, EventsReportService, EventsSchedulingService],
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
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotificationsService } from '../notifications/notifications.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
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
    upsert: jest.fn(),
  },
  eventReport: { upsert: jest.fn() },
  expenseItem: { deleteMany: jest.fn(), createMany: jest.fn() },
  salaryRecord: { deleteMany: jest.fn(), createMany: jest.fn() },
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' } as const;

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
        { provide: NotificationsService, useValue: mockNotifications },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(undefined),
            del: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: CacheVersionService,
          useValue: {
            getVersion: jest.fn().mockResolvedValue(0),
            bumpVersion: jest.fn().mockResolvedValue(undefined),
          },
        },
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

  describe('findAllForUser', () => {
    it('MANAGER — без фільтру по crew (порожній where)', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findAllForUser({
        sub: 'mgr-1',
        name: 'Менеджер',
        role: 'MANAGER',
      });
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where).toEqual({});
    });

    it('HOST — фільтрує за hostId', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findAllForUser({
        sub: 'host-1',
        name: 'Ведучий',
        role: 'HOST',
      });
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where).toEqual({
        crew: { OR: [{ hostId: 'host-1' }, { driverId: 'host-1' }] },
      });
    });

    it('DRIVER — фільтрує за driverId', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findAllForUser({
        sub: 'driver-1',
        name: 'Водій',
        role: 'DRIVER',
      });
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.where).toEqual({
        crew: { OR: [{ hostId: 'driver-1' }, { driverId: 'driver-1' }] },
      });
    });

    it('з пагінацією — повертає data + meta', async () => {
      const fakeEvents = [{ id: 'ev-1' }, { id: 'ev-2' }];
      mockPrisma.event.findMany.mockResolvedValueOnce(fakeEvents);
      mockPrisma.event.count = jest.fn().mockResolvedValueOnce(10);

      const result = await service.findAllForUser(
        { sub: 'mgr-1', name: 'М', role: 'MANAGER' },
        { page: 2, take: 2 } as any,
      );

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect((result as any).data).toHaveLength(2);
      expect((result as any).meta.page).toBe(2);
    });

    it('без пагінації — повертає масив', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([{ id: 'ev-1' }]);
      const result = await service.findAllForUser({
        sub: 'mgr-1',
        name: 'М',
        role: 'MANAGER',
      });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('create', () => {
    it('створює подію зі статусом BASE та записом в history', async () => {
      const dto = {
        schoolId: 'school-1',
        cityId: 'city-1',
        project: 'Голограма',
        date: '2025-09-01',
        price: 5000,
      };
      mockPrisma.event.create.mockResolvedValueOnce({
        id: 'ev-new',
        schoolId: 'school-1',
        status: 'BASE',
        history: [{ id: 'h-1' }],
      });

      const result = await service.create(dto, mockUser);

      expect(mockPrisma.event.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'BASE',
            history: {
              create: expect.objectContaining({
                userId: 'user-1',
                role: 'MANAGER',
              }),
            },
          }),
        }),
      );
      expect(result.id).toBe('ev-new');
    });

    it("конвертує date рядок у Date об'єкт", async () => {
      mockPrisma.event.create.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 's-1',
        history: [],
      });
      const dto = {
        schoolId: 's-1',
        cityId: 'c-1',
        project: 'Test',
        date: '2025-12-25',
        price: 100,
      };

      await service.create(dto, mockUser);

      const callData = mockPrisma.event.create.mock.calls[0][0].data;
      expect(callData.date).toBeInstanceOf(Date);
      expect(callData.date.getFullYear()).toBe(2025);
    });

    it('інвалідує кеш школи після створення події', async () => {
      mockPrisma.event.create.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-99',
        history: [],
      });
      const cacheDelSpy = jest.spyOn((service as any).cacheManager, 'del');

      await service.create(
        {
          schoolId: 'school-99',
          date: '2025-01-01',
          project: 'T',
          price: 0,
        } as any,
        mockUser,
      );

      expect(cacheDelSpy).toHaveBeenCalledWith(
        'events:school:school-99:minimal',
      );
      expect(cacheDelSpy).toHaveBeenCalledWith('events:school:school-99:full');
    });
  });

  describe('findOne', () => {
    it('повертає подію якщо знайдено', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        school: {},
        city: {},
      });
      const result = await service.findOne('ev-1');
      expect(result.id).toBe('ev-1');
    });

    it('кидає AppException EVENT_NOT_FOUND якщо подія не існує', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne('nonexistent')).rejects.toMatchObject({
        message: 'EVENT_NOT_FOUND',
      });
    });
  });

  describe('remove', () => {
    it('видаляє подію разом з history та preparation', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-1',
      });
      mockPrisma.eventHistory.deleteMany.mockResolvedValueOnce({ count: 2 });
      mockPrisma.eventPreparation.deleteMany.mockResolvedValueOnce({
        count: 1,
      });
      mockPrisma.event.delete.mockResolvedValueOnce({
        id: 'ev-1',
        schoolId: 'school-1',
      });

      await service.remove('ev-1');

      expect(mockPrisma.eventHistory.deleteMany).toHaveBeenCalledWith({
        where: { eventId: 'ev-1' },
      });
      expect(mockPrisma.eventPreparation.deleteMany).toHaveBeenCalledWith({
        where: { eventId: 'ev-1' },
      });
      expect(mockPrisma.event.delete).toHaveBeenCalledWith({
        where: { id: 'ev-1' },
      });
    });

    it('кидає AppException EVENT_NOT_FOUND якщо подія не існує', async () => {
      mockPrisma.event.findUnique.mockResolvedValueOnce(null);
      await expect(service.remove('ghost')).rejects.toMatchObject({
        message: 'EVENT_NOT_FOUND',
      });
    });
  });

  describe('getChatIdForUser', () => {
    it('повертає telegramChatId якщо є', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        telegramChatId: '123456',
        telegramId: null,
      });
      const result = await service.getChatIdForUser('user-1');
      expect(result).toBe('123456');
    });

    it('повертає telegramId якщо chatId відсутній і telegramId є числом', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        telegramChatId: null,
        telegramId: '987654321',
      });
      const result = await service.getChatIdForUser('user-1');
      expect(result).toBe('987654321');
    });

    it('повертає null якщо telegramId є username (@handle)', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        telegramChatId: null,
        telegramId: '@myhandle',
      });
      const result = await service.getChatIdForUser('user-1');
      expect(result).toBeNull();
    });

    it('повертає null якщо user не знайдено', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      const result = await service.getChatIdForUser('ghost-id');
      expect(result).toBeNull();
    });
  });

  describe('updatePreparationStatus', () => {
    it('upsert EventPreparation та інвалідує кеш школи', async () => {
      mockPrisma.eventPreparation.upsert = jest
        .fn()
        .mockResolvedValueOnce({ eventId: 'ev-1' });
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        schoolId: 'school-1',
      });
      const cacheDelSpy = jest.spyOn((service as any).cacheManager, 'del');

      await service.updatePreparationStatus('ev-1', 'equipment' as any, 'DONE');

      expect(mockPrisma.eventPreparation.upsert).toHaveBeenCalledWith({
        where: { eventId: 'ev-1' },
        update: { equipment: 'DONE' },
        create: { eventId: 'ev-1', equipment: 'DONE' },
      });
      expect(cacheDelSpy).toHaveBeenCalled();
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
import { NotificationsService } from '../notifications/notifications.service';
import { CacheVersionService } from '../common/cache/cache-version.service';
import { Prisma, PreparationStatus } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
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
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  private toOptionalNumber(value: unknown): number | null {
    return value != null ? Number(value) : null;
  }

  private toNumber(value: unknown): number {
    return Number(value ?? 0);
  }

  private serializeEvent<T extends Record<string, unknown>>(ev: T): T {
    return {
      ...ev,
      price: this.toOptionalNumber(ev.price),
      received: this.toOptionalNumber(ev.received),
      report: ev.report
        ? {
            ...(ev.report as Record<string, unknown>),
            totalSum: this.toNumber(
              (ev.report as Record<string, unknown>).totalSum,
            ),
            schoolSum: this.toNumber(
              (ev.report as Record<string, unknown>).schoolSum,
            ),
            remainderSum: this.toNumber(
              (ev.report as Record<string, unknown>).remainderSum,
            ),
          }
        : ev.report,
    };
  }

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
      report: { select: { status: true } },
    };

    if (!query?.page) {
      const events = await this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
      });
      return events.map((e) => this.serializeEvent(e));
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

    return {
      data: data.map((e) => this.serializeEvent(e)),
      meta: new PageMetaDto(totalItems, query.page, take),
    };
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
    return this.serializeEvent(event);
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
    await Promise.all([
      this.cacheVersion.bumpVersion('finance'),
      this.cacheVersion.bumpVersion('dashboard'),
    ]);
    return this.serializeEvent(event);
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
      `\n<i>Деталі у CRM: <a href="https://app.svitlo-znan.app">Посилання</a></i>`;

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

    const notificationPayload = {
      eventId: event.id,
      project: event.project,
      schoolName: event.school?.name,
      date: dateStr,
      time: event.time,
    };
    if (hostId) {
      this.notificationsService
        .create(hostId, 'CREW_ASSIGNED', {
          ...notificationPayload,
          role: 'ведучий',
        })
        .catch(() => {});
    }
    if (driverId) {
      this.notificationsService
        .create(driverId, 'CREW_ASSIGNED', {
          ...notificationPayload,
          role: 'водій',
        })
        .catch(() => {});
    }

    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
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
    if (cached)
      return (Array.isArray(cached) ? cached : []).map(
        (e: Record<string, unknown>) => this.serializeEvent(e),
      );

    const existing = this.pendingSchoolEvents.get(key);
    if (existing) {
      const result = await existing;
      return Array.isArray(result)
        ? result.map((e: Record<string, unknown>) => this.serializeEvent(e))
        : result;
    }

    const compute = this.computeBySchool(key, schoolId, minimal).then(
      (result) =>
        Array.isArray(result)
          ? result.map((e: Record<string, unknown>) => this.serializeEvent(e))
          : result,
    );
    this.pendingSchoolEvents.set(key, compute);
    try {
      return await compute;
    } finally {
      this.pendingSchoolEvents.delete(key);
    }
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        school: true,
        city: true,
        crew: { include: { host: true, driver: true } },
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
        report: { include: { expenseItems: true, salaryRecords: true } },
      },
    });
    if (!event) throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    return this.serializeEvent(event);
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
    if (!event) return null;
    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
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
    return this.serializeEvent(deleted as any);
  }

  async findCompletedBySchool(schoolId: string) {
    const events = await this.prisma.event.findMany({
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
            salaryRecords: {
              select: { employeeId: true, amount: true, status: true },
            },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { date: 'desc' },
    });
    return events.map((e) => this.serializeEvent(e as any));
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
    if (user.role === 'SUPERADMIN' || user.role === 'OWNER')
      return requestedCityId;
    const me = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { cityId: true },
    });
    return me?.cityId ?? undefined;
  }

  @ApiOperation({ summary: 'Фінансовий дашборд (KPI, динаміка, топ)' })
  @Get('dashboard')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
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
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
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
import { RedisCacheModule } from '../common/cache/redis-cache.module';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [RedisCacheModule],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}

```

# FILE: apps/backend/src/finance/finance.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { FinanceService } from './finance.service';
import { PrismaService } from '../prisma/prisma.service';
import { CacheVersionService } from '../common/cache/cache-version.service';

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

  salaryRecord: {
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

const mockCacheManager = {
  get: jest.fn().mockResolvedValue(undefined),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

const mockCacheVersion = {
  getVersion: jest.fn().mockResolvedValue(0),
  bumpVersion: jest.fn().mockResolvedValue(undefined),
};

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: CacheVersionService, useValue: mockCacheVersion },
      ],
    }).compile();
    service = module.get<FinanceService>(FinanceService);
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

    mockPrisma.salaryRecord.findMany.mockResolvedValueOnce([]);

    mockPrisma.expenseItem.aggregate.mockResolvedValueOnce({
      _sum: {
        amount: 0,
      },
    });

    mockPrisma.salaryRecord.aggregate.mockResolvedValueOnce({
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
      const fuel = result.byExpenseCategory!.find(
        (c: any) => c.name === 'Паливо',
      );
      const ads = result.byExpenseCategory!.find(
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
      const result = await service.getDashboard({ cityId: 'city-1' });
      mockCacheManager.get.mockResolvedValueOnce(result);
      await service.getDashboard({ cityId: 'city-1' });
      expect(mockPrisma.eventReport.aggregate).toHaveBeenCalledTimes(1);
    });

    it('різні параметри — різні ключі кешу', async () => {
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
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CacheVersionService } from '../common/cache/cache-version.service';
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
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

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
    return {
      balance: user?.balance ? Number(user.balance) : 0,
      name: user?.name ?? '',
    };
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
    const version = await this.cacheVersion.getVersion('finance');
    const cacheKey = `finance:v${version}:${cityId ?? ''}:${period ?? ''}:${project ?? ''}:${minimal}`;
    const cached =
      await this.cacheManager.get<FinanceDashboardResult>(cacheKey);
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

    const totalRevenue = Number(kpiAgg._sum.totalSum ?? 0);
    const totalProfit = Number(kpiAgg._sum.remainderSum ?? 0);
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
    const expectedRevenue = Number(plannedAgg._sum.price ?? 0);
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
      await this.cacheManager.set(cacheKey, result, 300_000);
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
      profit: Number(r.remainderSum ?? 0),
      revenue: Number(r.totalSum ?? 0),
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
    await this.cacheManager.set(cacheKey, result, 300_000);
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

# FILE: apps/backend/src/inventory/inventory.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@ApiCookieAuth('access_token')
@Controller('inventory')
@UseGuards(AuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Список товарів на складі' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({
    name: 'lowStock',
    required: false,
    description: 'true — тільки товари з недостатньою кількістю',
  })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('cityId') cityId?: string,
    @Query('lowStock') lowStock?: string,
    @Query('search') search?: string,
  ) {
    return this.inventoryService.findAll({
      category,
      cityId,
      lowStock,
      search,
    });
  }

  @ApiOperation({
    summary: 'Товари з низьким запасом (currentStock <= minStock)',
  })
  @Get('low-stock')
  findLowStock() {
    return this.inventoryService.findLowStock();
  }

  @ApiOperation({ summary: 'Список товарів за проєктом' })
  @ApiQuery({ name: 'project', required: true })
  @Get('by-project')
  findByProject(@Query('project') project: string) {
    return this.inventoryService.findByProject(project);
  }

  @ApiOperation({ summary: 'Створити товар' })
  @Post()
  @Roles('SUPERADMIN', 'OWNER')
  create(
    @Body()
    dto: {
      name: string;
      sku?: string;
      category?: string;
      unit?: string;
      project?: string;
      minStock?: number;
      currentStock?: number;
      notes?: string;
      cityId?: string;
      schoolId?: string;
    },
  ) {
    return this.inventoryService.create(dto);
  }

  @ApiOperation({ summary: 'Оновити товар' })
  @Patch(':id')
  @Roles('SUPERADMIN', 'OWNER')
  update(
    @Param('id') id: string,
    @Body()
    dto: {
      name?: string;
      sku?: string;
      category?: string;
      unit?: string;
      project?: string;
      minStock?: number;
      currentStock?: number;
      notes?: string;
      cityId?: string;
      schoolId?: string;
    },
  ) {
    return this.inventoryService.update(id, dto);
  }

  @ApiOperation({ summary: 'Видалити товар' })
  @Delete(':id')
  @Roles('SUPERADMIN', 'OWNER')
  delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }

  @ApiOperation({ summary: 'Поповнити склад' })
  @Post(':id/add-stock')
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  addStock(@Param('id') id: string, @Body() dto: { quantity: number }) {
    return this.inventoryService.addStock(id, dto.quantity);
  }
}

```

# FILE: apps/backend/src/inventory/inventory.module.ts

```
import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}

```

# FILE: apps/backend/src/inventory/inventory.service.ts

```
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: {
    name: string;
    sku?: string;
    category?: string;
    unit?: string;
    project?: string;
    minStock?: number;
    currentStock?: number;
    notes?: string;
    cityId?: string;
    schoolId?: string;
  }) {
    return this.prisma.inventoryItem.create({
      data: {
        name: dto.name,
        sku: dto.sku,
        category: dto.category ?? 'Інше',
        unit: dto.unit ?? 'шт',
        project: dto.project,
        minStock: dto.minStock ?? 5,
        currentStock: dto.currentStock ?? 0,
        notes: dto.notes,
        cityId: dto.cityId,
        schoolId: dto.schoolId,
      },
      include: { city: true, school: true },
    });
  }

  async findAll(filters?: {
    category?: string;
    cityId?: string;
    lowStock?: string;
    search?: string;
  }) {
    const where: Record<string, unknown> = {};

    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.cityId) {
      where.cityId = filters.cityId;
    }
    if (filters?.lowStock === 'true') {
      const lowIds = await this.prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM "InventoryItem" WHERE "currentStock" <= "minStock"
      `;
      where.id = { in: lowIds.map((i) => i.id) };
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.inventoryItem.findMany({
      where,
      orderBy: { name: 'asc' },
      include: { city: true, school: true },
    });
  }

  async findLowStock() {
    return this.prisma.inventoryItem.findMany({
      where: {
        currentStock: { lte: this.prisma.inventoryItem.fields.minStock },
      },
      orderBy: { currentStock: 'asc' },
      include: { city: true, school: true },
    });
  }

  async update(
    id: string,
    dto: {
      name?: string;
      sku?: string;
      category?: string;
      unit?: string;
      project?: string;
      minStock?: number;
      currentStock?: number;
      notes?: string;
      cityId?: string;
      schoolId?: string;
    },
  ) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');

    return this.prisma.inventoryItem.update({
      where: { id },
      data: dto,
      include: { city: true, school: true },
    });
  }

  async delete(id: string) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');

    await this.prisma.inventoryUsage.deleteMany({ where: { itemId: id } });
    return this.prisma.inventoryItem.delete({ where: { id } });
  }

  async findByProject(project: string) {
    return this.prisma.inventoryItem.findMany({
      where: { project },
      orderBy: { name: 'asc' },
      include: { city: true, school: true },
    });
  }

  async addStock(id: string, quantity: number) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Товар не знайдено');
    if (quantity <= 0)
      throw new BadRequestException('Кількість має бути більше 0');

    return this.prisma.inventoryItem.update({
      where: { id },
      data: { currentStock: { increment: quantity } },
    });
  }
}

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
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const ISSUE_STATUSES = ['Планується', 'Виконується', 'Виконано'] as const;

export class UpdateIssueStatusDto {
  @ApiProperty({ example: 'Виконано' })
  @IsString()
  @IsNotEmpty()
  @IsIn(ISSUE_STATUSES)
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
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Issues')
@ApiCookieAuth('access_token')
@Controller('issues')
@UseGuards(AuthGuard, RolesGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'Створити проблему по заходу' })
  @Roles('SUPERADMIN', 'MANAGER')
  @Post()
  create(@Body() body: CreateIssueDto) {
    return this.issuesService.create(body);
  }

  @ApiOperation({ summary: 'Список проблем по місту' })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Get()
  findByCityId(@Query('cityId') cityId: string) {
    return this.issuesService.findByCityId(cityId);
  }

  @ApiOperation({ summary: 'Оновити статус проблеми' })
  @Roles('SUPERADMIN', 'MANAGER')
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
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TelegramModule, NotificationsModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}

```

# FILE: apps/backend/src/issues/issues.service.spec.ts

```
import { IssuesService } from './issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  issueReport: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  event: { findUnique: jest.fn() },
  city: { findUnique: jest.fn() },
  user: { findUnique: jest.fn() },
};

const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };

const makeService = () =>
  new IssuesService(
    mockPrisma as unknown as PrismaService,
    mockTelegram as unknown as TelegramService,
    mockNotifications as unknown as NotificationsService,
  );

const baseData = {
  eventId: 'ev-1',
  schoolName: 'Школа №1',
  eventName: 'Голограма',
  message: 'Проблема з обладнанням',
  cityId: 'city-1',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.issueReport.create.mockResolvedValue({
    id: 'issue-1',
    ...baseData,
  });
  mockPrisma.event.findUnique.mockResolvedValue({ id: 'ev-1', crew: null });
  mockPrisma.city.findUnique.mockResolvedValue({ id: 'city-1', users: [] });
});

describe('IssuesService — create', () => {
  it('створює IssueReport у БД з коректними полями', async () => {
    const service = makeService();
    await service.create(baseData);

    expect(mockPrisma.issueReport.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        eventId: 'ev-1',
        schoolName: 'Школа №1',
        eventName: 'Голограма',
        message: 'Проблема з обладнанням',
        cityId: 'city-1',
        deadline: null,
        assignedUserId: null,
        assignedUserName: null,
      }),
    });
  });

  it('конвертує deadline рядок у Date', async () => {
    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-12-31' });

    const { deadline } = mockPrisma.issueReport.create.mock.calls[0][0].data;
    expect(deadline).toBeInstanceOf(Date);
    expect(deadline.getFullYear()).toBe(2025);
  });

  it('надсилає Telegram менеджеру міста якщо є chatId', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-chat-123', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
      'mgr-chat-123',
      expect.stringContaining('Школа №1'),
    );
  });

  it('не надсилає менеджеру якщо у нього немає chatId', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: null, telegramId: '@handle' }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
  });

  it('надсилає відповідальному якщо assignedUserId є і chatId відрізняється', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      telegramChatId: 'assignee-222',
      telegramId: null,
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-2',
      assignedUserName: 'Василь',
    });

    expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
    const chatIds = mockTelegram.sendMessage.mock.calls.map(
      ([chatId]: [string]) => chatId,
    );
    expect(chatIds).toContain('mgr-111');
    expect(chatIds).toContain('assignee-222');
  });

  it('не надсилає дублю якщо менеджер і відповідальний — одна людина', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'same-chat', telegramId: null }],
    });
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      telegramChatId: 'same-chat',
      telegramId: null,
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-same',
      assignedUserName: 'Один',
    });

    expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('повідомлення містить інформацію про дедлайн якщо він є', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-06-30' });

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Дедлайн');
  });

  it('включає відповідального у повідомлення', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create({ ...baseData, assignedUserName: 'Марія Шевченко' });

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Марія Шевченко');
  });

  it('включає учасників екіпажу у повідомлення', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий Іван', telegramId: null },
        driver: { name: 'Водій Петро', telegramId: '123456' },
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Ведучий Іван');
    expect(msg).toContain('Водій Петро');
  });

  it("formatMember: числовий telegramId → лише ім'я (не @mention)", async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий', telegramId: '987654321' },
        driver: null,
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-1', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    // числовий id — не повинно бути @
    expect(msg).not.toMatch(/@\d/);
    expect(msg).toContain('Ведучий');
  });

  it('formatMember: @username telegramId → @mention', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий', telegramId: '@ivanko' },
        driver: null,
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-1', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('@ivanko');
  });

  it('повертає створений issue', async () => {
    const service = makeService();
    const result = await service.create(baseData);

    expect(result).toMatchObject({ id: 'issue-1' });
  });
});

describe('IssuesService — findByCityId', () => {
  it('повертає активні проблеми для міста (виключає Виконано)', async () => {
    const issues = [{ id: 'i-1' }, { id: 'i-2' }];
    mockPrisma.issueReport.findMany.mockResolvedValueOnce(issues);

    const service = makeService();
    const result = await service.findByCityId('city-1');

    expect(mockPrisma.issueReport.findMany).toHaveBeenCalledWith({
      where: { cityId: 'city-1', status: { not: 'Виконано' } },
      orderBy: { createdAt: 'desc' },
    });
    expect(result).toHaveLength(2);
  });

  it('повертає порожній масив якщо активних проблем немає', async () => {
    mockPrisma.issueReport.findMany.mockResolvedValueOnce([]);

    const service = makeService();
    const result = await service.findByCityId('city-empty');

    expect(result).toEqual([]);
  });
});

describe('IssuesService — updateStatus', () => {
  it('оновлює статус проблеми', async () => {
    mockPrisma.issueReport.update.mockResolvedValueOnce({
      id: 'i-1',
      status: 'Виконано',
    });

    const service = makeService();
    const result = await service.updateStatus('i-1', 'Виконано');

    expect(mockPrisma.issueReport.update).toHaveBeenCalledWith({
      where: { id: 'i-1' },
      data: { status: 'Виконано' },
    });
    expect(result).toMatchObject({ status: 'Виконано' });
  });

  it('може встановити довільний статус рядком', async () => {
    mockPrisma.issueReport.update.mockResolvedValueOnce({
      id: 'i-2',
      status: 'В процесі',
    });

    const service = makeService();
    await service.updateStatus('i-2', 'В процесі');

    const callData = mockPrisma.issueReport.update.mock.calls[0][0];
    expect(callData.data.status).toBe('В процесі');
  });
});

```

# FILE: apps/backend/src/issues/issues.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
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
      `\n\n<i>Деталі у CRM: <a href="https://app.svitlo-znan.app">Посилання</a></i>`;

    if (managerChatId)
      await this.telegramService.sendMessage(managerChatId, text);

    if (assigneeChatId && assigneeChatId !== managerChatId) {
      await this.telegramService.sendMessage(assigneeChatId, text);
    }

    const notificationPayload = {
      issueId: issue.id,
      schoolName: data.schoolName,
      eventName: data.eventName,
      message: data.message,
    };
    if (manager?.id) {
      this.notificationsService
        .create(manager.id, 'ISSUE_CREATED', notificationPayload)
        .catch(() => {});
    }
    if (data.assignedUserId) {
      this.notificationsService
        .create(data.assignedUserId, 'ISSUE_CREATED', notificationPayload)
        .catch(() => {});
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
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));
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

  app.enableShutdownHooks();
  const logger = new Logger('Bootstrap');

  process.on('SIGTERM', async () => {
    logger.log('Отримано SIGTERM, завершення роботи...');
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.log('Отримано SIGINT, завершення роботи...');
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
    process.exit(0);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

# FILE: apps/backend/src/metrics/metrics.controller.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MetricsGuard } from './metrics.guard';

const mockGuard = { canActivate: jest.fn() };
const mockMetricsService = {
  getMetrics: jest.fn(),
  getContentType: jest.fn(),
};

describe('MetricsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [{ provide: MetricsService, useValue: mockMetricsService }],
    })
      .overrideGuard(MetricsGuard)
      .useValue(mockGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGuard.canActivate.mockResolvedValue(true);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /metrics', () => {
    it('без токена — 403 якщо METRICS_TOKEN встановлено', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Invalid metrics token',
        ),
      );
      await request(app.getHttpServer()).get('/metrics').expect(403);
    });

    it('з правильним токеном — 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockMetricsService.getMetrics.mockResolvedValueOnce('metrics data');
      const res = await request(app.getHttpServer())
        .get('/metrics')
        .expect(200);
      expect(res.text).toBe('metrics data');
    });
  });
});

```

# FILE: apps/backend/src/metrics/metrics.controller.ts

```
import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsGuard } from './metrics.guard';

@Controller('metrics')
@UseGuards(MetricsGuard)
export class MetricsController {
  constructor(private metrics: MetricsService) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  async getMetrics() {
    return this.metrics.getMetrics();
  }
}

```

# FILE: apps/backend/src/metrics/metrics.guard.spec.ts

```
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { MetricsGuard } from './metrics.guard';

describe('MetricsGuard', () => {
  let guard: MetricsGuard;

  const createContext = (
    headers: Record<string, string> = {},
  ): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ headers }),
      }),
    }) as any;

  beforeEach(() => {
    guard = new MetricsGuard();
  });

  afterEach(() => {
    delete process.env.METRICS_TOKEN;
  });

  it('без METRICS_TOKEN в env пропускає всі запити', () => {
    const ok = guard.canActivate(createContext({}));
    expect(ok).toBe(true);
  });

  it('з METRICS_TOKEN і правильним X-Metrics-Token пропускає', () => {
    process.env.METRICS_TOKEN = 'secret123';
    const ok = guard.canActivate(
      createContext({ 'x-metrics-token': 'secret123' }),
    );
    expect(ok).toBe(true);
  });

  it('з METRICS_TOKEN і неправильним X-Metrics-Token кидає Forbidden', () => {
    process.env.METRICS_TOKEN = 'secret123';
    expect(() =>
      guard.canActivate(createContext({ 'x-metrics-token': 'wrong' })),
    ).toThrow(ForbiddenException);
  });

  it('з METRICS_TOKEN і без заголовка кидає Forbidden', () => {
    process.env.METRICS_TOKEN = 'secret123';
    expect(() => guard.canActivate(createContext({}))).toThrow(
      ForbiddenException,
    );
  });
});

```

# FILE: apps/backend/src/metrics/metrics.guard.ts

```
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class MetricsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const token = process.env.METRICS_TOKEN;
    if (!token) return true;

    const req = context.switchToHttp().getRequest();
    const headerToken = req.headers['x-metrics-token'];

    if (headerToken !== token) {
      throw new ForbiddenException('Invalid metrics token');
    }
    return true;
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

# FILE: apps/backend/src/notifications/notifications.controller.ts

```
import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser, @Query('page') page?: number) {
    return this.service.findAll(user.sub, page ?? 1);
  }

  @Get('unread-count')
  unreadCount(@CurrentUser() user: JwtUser) {
    return this.service.unreadCount(user.sub).then((c) => ({ count: c }));
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.service.markRead(id, user.sub);
  }

  @Patch('read-all')
  markAllRead(@CurrentUser() user: JwtUser) {
    return this.service.markAllRead(user.sub);
  }
}

```

# FILE: apps/backend/src/notifications/notifications.module.ts

```
import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}

```

# FILE: apps/backend/src/notifications/notifications.service.ts

```
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, type: string, payload: Record<string, unknown>) {
    return this.prisma.notification.create({
      data: { userId, type, payload: payload as Prisma.InputJsonValue },
    });
  }

  async findAll(userId: string, page = 1, take = 20) {
    const where = { userId };
    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.notification.count({ where }),
    ]);
    return { items, total, page, pageCount: Math.ceil(total / take) };
  }

  async unreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, readAt: null },
    });
  }

  async markRead(id: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId },
      data: { readAt: new Date() },
    });
  }

  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
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
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dbQueryDuration } from '../metrics/metrics.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
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

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

```

# FILE: apps/backend/src/projects/dto/create-project.dto.ts

```
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  pricePerChild?: number;
}

```

