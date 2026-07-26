-- CreateEnum
CREATE TYPE "MileageReportStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "SalaryRecord" ADD COLUMN     "mileageReportId" TEXT;

-- CreateTable
CREATE TABLE "MileageReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "km" DECIMAL(10,1) NOT NULL,
    "fuel" DECIMAL(12,2) NOT NULL,
    "depreciation" DECIMAL(12,2) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "status" "MileageReportStatus" NOT NULL DEFAULT 'PENDING',
    "managerNote" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MileageReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MileageReport_userId_idx" ON "MileageReport"("userId");

-- CreateIndex
CREATE INDEX "MileageReport_status_idx" ON "MileageReport"("status");

-- CreateIndex
CREATE INDEX "SalaryRecord_mileageReportId_idx" ON "SalaryRecord"("mileageReportId");

-- AddForeignKey
ALTER TABLE "SalaryRecord" ADD CONSTRAINT "SalaryRecord_mileageReportId_fkey" FOREIGN KEY ("mileageReportId") REFERENCES "MileageReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MileageReport" ADD CONSTRAINT "MileageReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
