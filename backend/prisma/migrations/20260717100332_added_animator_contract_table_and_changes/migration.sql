/*
  Warnings:

  - You are about to drop the column `tag` on the `ScolarYear` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `ScolarYear` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `ScolarYear` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ScolarYear_tag_key";

-- AlterTable
ALTER TABLE "ScolarYear" DROP COLUMN "tag",
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AnimatorContract" (
    "id" SERIAL NOT NULL,
    "classId" INTEGER,
    "animatorId" INTEGER,
    "scolarYearId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimatorContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AnimatorContract_classId_idx" ON "AnimatorContract"("classId");

-- CreateIndex
CREATE INDEX "AnimatorContract_animatorId_idx" ON "AnimatorContract"("animatorId");

-- CreateIndex
CREATE INDEX "AnimatorContract_scolarYearId_idx" ON "AnimatorContract"("scolarYearId");

-- CreateIndex
CREATE UNIQUE INDEX "ScolarYear_label_key" ON "ScolarYear"("label");

-- AddForeignKey
ALTER TABLE "AnimatorContract" ADD CONSTRAINT "AnimatorContract_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimatorContract" ADD CONSTRAINT "AnimatorContract_animatorId_fkey" FOREIGN KEY ("animatorId") REFERENCES "Animator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimatorContract" ADD CONSTRAINT "AnimatorContract_scolarYearId_fkey" FOREIGN KEY ("scolarYearId") REFERENCES "ScolarYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;
