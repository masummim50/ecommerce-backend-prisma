/*
  Warnings:

  - You are about to drop the `_StoreFollowers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StoreFollowers" DROP CONSTRAINT "_StoreFollowers_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreFollowers" DROP CONSTRAINT "_StoreFollowers_B_fkey";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "followers" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followedStores" TEXT[];

-- DropTable
DROP TABLE "_StoreFollowers";
