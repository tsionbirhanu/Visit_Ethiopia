/*
  Warnings:

  - Added the required column `requestid` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Special_Interest" AS ENUM ('FOOD', 'CULTURE', 'MUSIC', 'HISTORY', 'MARKETS', 'COFFEE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Time_Slot" AS ENUM ('FEW_HOURS', 'HALF_DAY', 'FULL_DAY');

-- AlterTable
ALTER TABLE "public"."Package" ADD COLUMN     "requestid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Data" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "traveler_number" INTEGER NOT NULL,
    "time_available" "public"."Time_Slot" NOT NULL,
    "special_interest" "public"."Special_Interest" NOT NULL,
    "Additional_note" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Language" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserLanguages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserLanguages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "public"."Language"("code");

-- CreateIndex
CREATE INDEX "_UserLanguages_B_index" ON "public"."_UserLanguages"("B");

-- AddForeignKey
ALTER TABLE "public"."Package" ADD CONSTRAINT "Package_requestid_fkey" FOREIGN KEY ("requestid") REFERENCES "public"."Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserLanguages" ADD CONSTRAINT "_UserLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserLanguages" ADD CONSTRAINT "_UserLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
