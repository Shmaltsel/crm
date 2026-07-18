-- CreateTable
CREATE TABLE "ManualExpense" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "date" DATE NOT NULL,
    "cityId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualExpense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ManualExpense_date_idx" ON "ManualExpense"("date");

-- CreateIndex
CREATE INDEX "ManualExpense_cityId_idx" ON "ManualExpense"("cityId");

-- CreateIndex
CREATE INDEX "ManualExpense_category_idx" ON "ManualExpense"("category");

-- CreateIndex
CREATE INDEX "ManualExpense_createdById_idx" ON "ManualExpense"("createdById");

-- AddForeignKey
ALTER TABLE "ManualExpense" ADD CONSTRAINT "ManualExpense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualExpense" ADD CONSTRAINT "ManualExpense_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
