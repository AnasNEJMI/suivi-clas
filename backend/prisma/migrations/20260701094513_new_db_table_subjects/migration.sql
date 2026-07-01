/*
  Warnings:

  - You are about to drop the column `subject` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Lesson_subject_idx";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "subject",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimatorToAssociation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnimatorToAssociation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_label_key" ON "Subject"("label");

-- CreateIndex
CREATE INDEX "_AnimatorToAssociation_B_index" ON "_AnimatorToAssociation"("B");

-- CreateIndex
CREATE INDEX "Lesson_subjectId_idx" ON "Lesson"("subjectId");

-- CreateIndex
CREATE INDEX "Lesson_classId_idx" ON "Lesson"("classId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimatorToAssociation" ADD CONSTRAINT "_AnimatorToAssociation_A_fkey" FOREIGN KEY ("A") REFERENCES "Animator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimatorToAssociation" ADD CONSTRAINT "_AnimatorToAssociation_B_fkey" FOREIGN KEY ("B") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;
