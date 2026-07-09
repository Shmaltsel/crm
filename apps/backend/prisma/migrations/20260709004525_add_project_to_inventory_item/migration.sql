-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "project" TEXT;

-- CreateIndex
CREATE INDEX "InventoryItem_project_idx" ON "InventoryItem"("project");
