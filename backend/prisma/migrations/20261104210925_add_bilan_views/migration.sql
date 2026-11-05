/*
  Warnings:

  - You are about to drop the column `lastVisit` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_scolarYearId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_studentId_fkey";

-- AlterTable
ALTER TABLE "Bilan" ADD COLUMN     "firstViewedAt" TIMESTAMP(3),
ADD COLUMN     "lastViewedAt" TIMESTAMP(3),
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "lastVisit";

-- DropTable
DROP TABLE "Visit";

-- CreateIndex
CREATE INDEX "Bilan_studentId_firstViewedAt_idx" ON "Bilan"("studentId", "firstViewedAt");
