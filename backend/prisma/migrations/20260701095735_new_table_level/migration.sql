/*
  Warnings:

  - You are about to drop the column `classId` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[levelId,subjectId,label]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classId_fkey";

-- DropIndex
DROP INDEX "Lesson_classId_idx";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "classId",
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "levelId" INTEGER;

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_label_key" ON "Level"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Level_order_key" ON "Level"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_levelId_subjectId_label_key" ON "Lesson"("levelId", "subjectId", "label");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
