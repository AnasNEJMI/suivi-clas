/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'admin', 'org');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('m', 'f');

-- CreateEnum
CREATE TYPE "DocType" AS ENUM ('fiche', 'qcm', 'exercices');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('math', 'pc', 'svt');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "classId" INTEGER,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "UserGender" NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "lastVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bilan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subject" "SubjectType" NOT NULL,
    "lessonId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ponctuality" INTEGER NOT NULL,
    "preparation" INTEGER NOT NULL,
    "autonomy" INTEGER NOT NULL,
    "organisation" INTEGER NOT NULL,
    "regularity" INTEGER NOT NULL,
    "discipline" INTEGER NOT NULL,
    "respect" INTEGER NOT NULL,
    "positive" TEXT NOT NULL,
    "negative" TEXT NOT NULL,
    "improvements" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doc" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "type" "DocType" NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "classId" INTEGER NOT NULL,
    "subject" "SubjectType" NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_label_key" ON "Class"("label");

-- CreateIndex
CREATE INDEX "Bilan_userId_idx" ON "Bilan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_userId_key" ON "Skill"("userId");

-- CreateIndex
CREATE INDEX "Skill_userId_idx" ON "Skill"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doc_link_type_key" ON "Doc"("link", "type");

-- CreateIndex
CREATE INDEX "Lesson_subject_idx" ON "Lesson"("subject");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_classId_subject_label_key" ON "Lesson"("classId", "subject", "label");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_classId_idx" ON "User"("classId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilan" ADD CONSTRAINT "Bilan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilan" ADD CONSTRAINT "Bilan_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
