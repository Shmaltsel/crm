-- CreateTable
CREATE TABLE "SchoolContact" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Львів',
    "schoolNumber" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolContact_pkey" PRIMARY KEY ("id")
);
