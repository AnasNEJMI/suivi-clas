-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('e', 'm', 'h');

-- CreateEnum
CREATE TYPE "AnswerChoice" AS ENUM ('a', 'b', 'c', 'd');

-- CreateTable
CREATE TABLE "QcmBankQuestion" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "question" TEXT NOT NULL DEFAULT '',
    "difficulty" "Difficulty" NOT NULL DEFAULT 'e',
    "answerA" TEXT NOT NULL DEFAULT '',
    "answerB" TEXT NOT NULL DEFAULT '',
    "answerC" TEXT NOT NULL DEFAULT '',
    "answerD" TEXT NOT NULL DEFAULT '',
    "correctAnswer" "AnswerChoice" NOT NULL,
    "explanation" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QcmBankQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qcm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Qcm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QcmQuestion" (
    "id" SERIAL NOT NULL,
    "bankQuestionId" INTEGER NOT NULL,
    "qcmId" INTEGER NOT NULL,
    "selectedChoice" "AnswerChoice",
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QcmQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QcmBankQuestion_lessonId_idx" ON "QcmBankQuestion"("lessonId");

-- CreateIndex
CREATE INDEX "Qcm_userId_idx" ON "Qcm"("userId");

-- CreateIndex
CREATE INDEX "QcmQuestion_bankQuestionId_idx" ON "QcmQuestion"("bankQuestionId");

-- CreateIndex
CREATE INDEX "QcmQuestion_qcmId_idx" ON "QcmQuestion"("qcmId");

-- AddForeignKey
ALTER TABLE "QcmBankQuestion" ADD CONSTRAINT "QcmBankQuestion_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qcm" ADD CONSTRAINT "Qcm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qcm" ADD CONSTRAINT "Qcm_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcmQuestion" ADD CONSTRAINT "QcmQuestion_bankQuestionId_fkey" FOREIGN KEY ("bankQuestionId") REFERENCES "QcmBankQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcmQuestion" ADD CONSTRAINT "QcmQuestion_qcmId_fkey" FOREIGN KEY ("qcmId") REFERENCES "Qcm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
