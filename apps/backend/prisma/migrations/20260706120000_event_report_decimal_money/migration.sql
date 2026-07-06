-- AlterTable: Event price and received from Float to Decimal(12,2)
ALTER TABLE "Event" ALTER COLUMN "price" TYPE numeric(12,2) USING "price"::numeric(12,2);
ALTER TABLE "Event" ALTER COLUMN "received" TYPE numeric(12,2) USING "received"::numeric(12,2);

-- AlterTable: EventReport money fields from Float to Decimal(12,2)
ALTER TABLE "EventReport" ALTER COLUMN "totalSum" TYPE numeric(12,2) USING "totalSum"::numeric(12,2);
ALTER TABLE "EventReport" ALTER COLUMN "schoolSum" TYPE numeric(12,2) USING "schoolSum"::numeric(12,2);
ALTER TABLE "EventReport" ALTER COLUMN "remainderSum" TYPE numeric(12,2) USING "remainderSum"::numeric(12,2);
