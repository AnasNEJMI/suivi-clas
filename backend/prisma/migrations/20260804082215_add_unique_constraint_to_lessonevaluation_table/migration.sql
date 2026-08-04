/*
  Warnings:

  - A unique constraint covering the columns `[submittedById,studentId,lessonId]` on the table `LessonEvaluation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LessonEvaluation_submittedById_studentId_lessonId_key" ON "LessonEvaluation"("submittedById", "studentId", "lessonId");
