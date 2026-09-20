/*
  Warnings:

  - Added the required column `address` to the `Association` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Association` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Association" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "postalCode" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AnimatorContractSpecialization" (
    "id" SERIAL NOT NULL,
    "animatorContractId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimatorContractSpecialization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AnimatorContractSpecialization_animatorContractId_idx" ON "AnimatorContractSpecialization"("animatorContractId");

-- CreateIndex
CREATE INDEX "AnimatorContractSpecialization_subjectId_idx" ON "AnimatorContractSpecialization"("subjectId");

-- AddForeignKey
ALTER TABLE "AnimatorContractSpecialization" ADD CONSTRAINT "AnimatorContractSpecialization_animatorContractId_fkey" FOREIGN KEY ("animatorContractId") REFERENCES "AnimatorContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimatorContractSpecialization" ADD CONSTRAINT "AnimatorContractSpecialization_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
