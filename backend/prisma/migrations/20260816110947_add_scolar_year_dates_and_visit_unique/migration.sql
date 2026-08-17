/*
  Warnings:

  - A unique constraint covering the columns `[studentId,scolarYearId]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `ScolarYear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ScolarYear` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScolarYear" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "numVisits" SET DEFAULT 0,
ALTER COLUMN "lastVisit" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Visit_studentId_scolarYearId_key" ON "Visit"("studentId", "scolarYearId");
