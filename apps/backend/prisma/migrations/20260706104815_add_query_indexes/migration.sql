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
