-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('NOTE', 'CALL', 'RESCHEDULE', 'CONFIRMATION', 'PROBLEM');

-- CreateTable
CREATE TABLE "SchoolComment" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" "CommentType" NOT NULL,
    "text" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SchoolComment_schoolId_createdAt_idx" ON "SchoolComment"("schoolId", "createdAt");

-- AddForeignKey
ALTER TABLE "SchoolComment" ADD CONSTRAINT "SchoolComment_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolComment" ADD CONSTRAINT "SchoolComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
