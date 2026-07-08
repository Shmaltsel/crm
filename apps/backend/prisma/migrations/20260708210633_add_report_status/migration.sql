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
