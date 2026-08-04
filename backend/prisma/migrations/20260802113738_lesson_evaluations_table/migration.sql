-- CreateEnum
CREATE TYPE "LessonEval" AS ENUM ('notAcquired', 'acquiring', 'acquired', 'expert');

-- CreateTable
CREATE TABLE "LessonEvaluation" (
    "id" INTEGER NOT NULL,
    "submittedById" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "evaluation" "LessonEval" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "LessonEvaluation_studentId_idx" ON "LessonEvaluation"("studentId");

-- CreateIndex
CREATE INDEX "LessonEvaluation_submittedById_idx" ON "LessonEvaluation"("submittedById");

-- CreateIndex
CREATE UNIQUE INDEX "LessonEvaluation_studentId_lessonId_submittedById_key" ON "LessonEvaluation"("studentId", "lessonId", "submittedById");

-- AddForeignKey
ALTER TABLE "LessonEvaluation" ADD CONSTRAINT "LessonEvaluation_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "Animator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonEvaluation" ADD CONSTRAINT "LessonEvaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonEvaluation" ADD CONSTRAINT "LessonEvaluation_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
