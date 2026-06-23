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
