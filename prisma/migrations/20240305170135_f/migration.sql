/*
  Warnings:

  - You are about to drop the column `username` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username";
