-- CreateEnum
CREATE TYPE "CompanyBalanceEntryType" AS ENUM ('EVENT_INCOME', 'SALARY_PAYOUT', 'MANUAL_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "DayOffRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "CompanyBalance" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBalanceEntry" (
    "id" TEXT NOT NULL,
    "type" "CompanyBalanceEntryType" NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "balanceAfter" DECIMAL(14,2) NOT NULL,
    "reportId" TEXT,
    "eventId" TEXT,
    "salaryRecordId" TEXT,
    "createdBy" TEXT,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyBalanceEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOffRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "reason" TEXT,
    "status" "DayOffRequestStatus" NOT NULL DEFAULT 'PENDING',
    "managerNote" TEXT,
    "dayOffId" TEXT,
    "createdBy" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "DayOffRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanyBalanceEntry_type_createdAt_idx" ON "CompanyBalanceEntry"("type", "createdAt");

-- CreateIndex
CREATE INDEX "CompanyBalanceEntry_createdAt_idx" ON "CompanyBalanceEntry"("createdAt");

-- CreateIndex
CREATE INDEX "DayOffRequest_status_idx" ON "DayOffRequest"("status");

-- CreateIndex
CREATE INDEX "DayOffRequest_date_idx" ON "DayOffRequest"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DayOffRequest_userId_date_key" ON "DayOffRequest"("userId", "date");

-- CreateIndex
CREATE INDEX "City_managerId_idx" ON "City"("managerId");

-- CreateIndex
CREATE INDEX "Crew_cityId_idx" ON "Crew"("cityId");

-- CreateIndex
CREATE INDEX "Event_project_idx" ON "Event"("project");

-- CreateIndex
CREATE INDEX "EventReport_status_idx" ON "EventReport"("status");

-- CreateIndex
CREATE INDEX "EventReport_submittedAt_idx" ON "EventReport"("submittedAt");

-- CreateIndex
CREATE INDEX "EventReport_approvedBy_idx" ON "EventReport"("approvedBy");

-- AddForeignKey
ALTER TABLE "DayOffRequest" ADD CONSTRAINT "DayOffRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayOffRequest" ADD CONSTRAINT "DayOffRequest_dayOffId_fkey" FOREIGN KEY ("dayOffId") REFERENCES "DayOff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
