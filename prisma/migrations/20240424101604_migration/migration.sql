-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" SET DEFAULT 'cash',
ALTER COLUMN "paymentStatus" SET DEFAULT 'due',
ALTER COLUMN "status" SET DEFAULT 'pending';
