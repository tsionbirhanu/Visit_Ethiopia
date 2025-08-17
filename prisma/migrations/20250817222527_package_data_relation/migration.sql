/*
  Warnings:

  - You are about to drop the column `requestid` on the `Package` table. All the data in the column will be lost.
  - Added the required column `packageId` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Package" DROP CONSTRAINT "Package_requestid_fkey";

-- AlterTable
ALTER TABLE "public"."Data" ADD COLUMN     "packageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Package" DROP COLUMN "requestid";

-- AddForeignKey
ALTER TABLE "public"."Data" ADD CONSTRAINT "Data_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "public"."Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
