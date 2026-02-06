/*
  Warnings:

  - The `subject` column on the `Bilan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subject` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,date]` on the table `Bilan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bilan" DROP COLUMN "subject",
ADD COLUMN     "subject" TEXT NOT NULL DEFAULT 'math';

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "subject",
ADD COLUMN     "subject" TEXT NOT NULL DEFAULT 'math';

-- DropEnum
DROP TYPE "SubjectType";

-- CreateIndex
CREATE UNIQUE INDEX "Bilan_userId_date_key" ON "Bilan"("userId", "date");

-- CreateIndex
CREATE INDEX "Lesson_subject_idx" ON "Lesson"("subject");
