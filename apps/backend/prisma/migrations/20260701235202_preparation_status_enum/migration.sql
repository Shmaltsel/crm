/*
  Warnings:

  - The `assignCrew` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bookEquipment` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prepareDocs` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prepareMaterials` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `remindSchool` column on the `EventPreparation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PreparationStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "EventPreparation" DROP COLUMN "assignCrew",
ADD COLUMN     "assignCrew" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "bookEquipment",
ADD COLUMN     "bookEquipment" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "prepareDocs",
ADD COLUMN     "prepareDocs" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "prepareMaterials",
ADD COLUMN     "prepareMaterials" "PreparationStatus" NOT NULL DEFAULT 'PLANNED',
DROP COLUMN "remindSchool",
ADD COLUMN     "remindSchool" "PreparationStatus" NOT NULL DEFAULT 'PLANNED';
