/*
  Warnings:

  - Added the required column `seanceDurationId` to the `Seance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seance" ADD COLUMN     "seanceDurationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SeanceDuration" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "durationMin" INTEGER NOT NULL,

    CONSTRAINT "SeanceDuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeanceDuration_label_key" ON "SeanceDuration"("label");

-- CreateIndex
CREATE UNIQUE INDEX "SeanceDuration_durationMin_key" ON "SeanceDuration"("durationMin");

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_seanceDurationId_fkey" FOREIGN KEY ("seanceDurationId") REFERENCES "SeanceDuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
