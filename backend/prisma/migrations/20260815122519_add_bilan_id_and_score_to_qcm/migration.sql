/*
  Warnings:

  - A unique constraint covering the columns `[bilanId]` on the table `Qcm` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Qcm" ADD COLUMN     "bilanId" INTEGER,
ADD COLUMN     "score" INTEGER,
ALTER COLUMN "lessonId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Qcm_bilanId_key" ON "Qcm"("bilanId");

-- AddForeignKey
ALTER TABLE "Qcm" ADD CONSTRAINT "Qcm_bilanId_fkey" FOREIGN KEY ("bilanId") REFERENCES "Bilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
