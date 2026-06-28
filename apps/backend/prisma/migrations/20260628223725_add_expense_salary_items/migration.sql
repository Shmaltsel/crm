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
