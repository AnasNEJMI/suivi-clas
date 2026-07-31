/*
  Warnings:

  - Made the column `lessonId` on table `Bilan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `summary` on table `Bilan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submittedById` on table `Bilan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bilan" ALTER COLUMN "lessonId" SET NOT NULL,
ALTER COLUMN "summary" SET NOT NULL,
ALTER COLUMN "submittedById" SET NOT NULL;
