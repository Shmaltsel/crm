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
