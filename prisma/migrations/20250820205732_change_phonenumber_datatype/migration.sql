/*
  Warnings:

  - Added the required column `date_time` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Data" ADD COLUMN     "date_time" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;
