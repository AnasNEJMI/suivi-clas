/*
  Warnings:

  - A unique constraint covering the columns `[contentHash]` on the table `QcmBankQuestion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `curriculumSkillId` to the `QcmBankQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QcmBankQuestion" ADD COLUMN     "contentHash" TEXT,
ADD COLUMN     "curriculumSkillId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CurriculumSkill" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "label" VARCHAR(180) NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CurriculumSkill_lessonId_idx" ON "CurriculumSkill"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumSkill_lessonId_label_key" ON "CurriculumSkill"("lessonId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "QcmBankQuestion_contentHash_key" ON "QcmBankQuestion"("contentHash");

-- CreateIndex
CREATE INDEX "QcmBankQuestion_curriculumSkillId_idx" ON "QcmBankQuestion"("curriculumSkillId");

-- AddForeignKey
ALTER TABLE "CurriculumSkill" ADD CONSTRAINT "CurriculumSkill_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcmBankQuestion" ADD CONSTRAINT "QcmBankQuestion_curriculumSkillId_fkey" FOREIGN KEY ("curriculumSkillId") REFERENCES "CurriculumSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
