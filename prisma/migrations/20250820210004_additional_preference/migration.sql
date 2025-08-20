/*
  Warnings:

  - Added the required column `Additional_preference` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Data" ADD COLUMN     "Additional_preference" TEXT NOT NULL;
