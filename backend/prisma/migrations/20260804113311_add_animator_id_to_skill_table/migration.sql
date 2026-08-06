/*
  Warnings:

  - A unique constraint covering the columns `[animatorId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,animatorId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animatorId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "animatorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Skill_animatorId_key" ON "Skill"("animatorId");

-- CreateIndex
CREATE INDEX "Skill_animatorId_idx" ON "Skill"("animatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_studentId_animatorId_key" ON "Skill"("studentId", "animatorId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_animatorId_fkey" FOREIGN KEY ("animatorId") REFERENCES "Animator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
