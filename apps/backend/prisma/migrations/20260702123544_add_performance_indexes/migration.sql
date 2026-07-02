-- CreateIndex
CREATE INDEX "Event_date_status_cityId_idx" ON "Event"("date", "status", "cityId");

-- CreateIndex
CREATE INDEX "EventHistory_eventId_createdAt_idx" ON "EventHistory"("eventId", "createdAt");

-- CreateIndex
CREATE INDEX "School_updatedAt_cityId_idx" ON "School"("updatedAt", "cityId");
