/*
  Warnings:

  - You are about to drop the column `date` on the `Bilan` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Bilan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bilan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Qcm` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,seanceId]` on the table `Bilan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seanceId` to the `Bilan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Bilan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Qcm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('m', 'f');

-- DropForeignKey
ALTER TABLE "Bilan" DROP CONSTRAINT "Bilan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Qcm" DROP CONSTRAINT "Qcm_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_classId_fkey";

-- DropIndex
DROP INDEX "Bilan_userId_date_key";

-- DropIndex
DROP INDEX "Bilan_userId_idx";

-- DropIndex
DROP INDEX "Qcm_userId_idx";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- DropIndex
DROP INDEX "Skill_userId_idx";

-- DropIndex
DROP INDEX "Skill_userId_key";

-- AlterTable
ALTER TABLE "Bilan" DROP COLUMN "date",
DROP COLUMN "subject",
DROP COLUMN "userId",
ADD COLUMN     "seanceId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "submittedById" INTEGER;

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "associationId" INTEGER;

-- AlterTable
ALTER TABLE "Qcm" DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "animatorId" INTEGER,
ADD COLUMN     "associationMemberId" INTEGER,
ADD COLUMN     "studentId" INTEGER;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserGender";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'john',
    "lastName" TEXT NOT NULL DEFAULT 'doe',
    "passwordHash" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'm',
    "classId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animator" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'john',
    "lastName" TEXT NOT NULL DEFAULT 'doe',
    "passwordHash" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'm',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociationMember" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT 'john',
    "lastName" TEXT NOT NULL DEFAULT 'doe',
    "passwordHash" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'm',
    "associationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssociationMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Association" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "classId" INTEGER,
    "animatorId" INTEGER,
    "scolarYearId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScolarYear" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "ScolarYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE INDEX "Student_classId_idx" ON "Student"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Animator_username_key" ON "Animator"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AssociationMember_username_key" ON "AssociationMember"("username");

-- CreateIndex
CREATE INDEX "AssociationMember_associationId_idx" ON "AssociationMember"("associationId");

-- CreateIndex
CREATE UNIQUE INDEX "Association_name_key" ON "Association"("name");

-- CreateIndex
CREATE INDEX "Seance_animatorId_idx" ON "Seance"("animatorId");

-- CreateIndex
CREATE INDEX "Seance_scolarYearId_idx" ON "Seance"("scolarYearId");

-- CreateIndex
CREATE UNIQUE INDEX "Seance_classId_date_key" ON "Seance"("classId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ScolarYear_tag_key" ON "ScolarYear"("tag");

-- CreateIndex
CREATE INDEX "Bilan_studentId_idx" ON "Bilan"("studentId");

-- CreateIndex
CREATE INDEX "Bilan_seanceId_idx" ON "Bilan"("seanceId");

-- CreateIndex
CREATE INDEX "Bilan_submittedById_idx" ON "Bilan"("submittedById");

-- CreateIndex
CREATE UNIQUE INDEX "Bilan_studentId_seanceId_key" ON "Bilan"("studentId", "seanceId");

-- CreateIndex
CREATE INDEX "Class_associationId_idx" ON "Class"("associationId");

-- CreateIndex
CREATE INDEX "Qcm_studentId_idx" ON "Qcm"("studentId");

-- CreateIndex
CREATE INDEX "Session_studentId_idx" ON "Session"("studentId");

-- CreateIndex
CREATE INDEX "Session_animatorId_idx" ON "Session"("animatorId");

-- CreateIndex
CREATE INDEX "Session_associationMemberId_idx" ON "Session"("associationMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_studentId_key" ON "Skill"("studentId");

-- CreateIndex
CREATE INDEX "Skill_studentId_idx" ON "Skill"("studentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociationMember" ADD CONSTRAINT "AssociationMember_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_animatorId_fkey" FOREIGN KEY ("animatorId") REFERENCES "Animator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_associationMemberId_fkey" FOREIGN KEY ("associationMemberId") REFERENCES "AssociationMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_animatorId_fkey" FOREIGN KEY ("animatorId") REFERENCES "Animator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seance" ADD CONSTRAINT "Seance_scolarYearId_fkey" FOREIGN KEY ("scolarYearId") REFERENCES "ScolarYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilan" ADD CONSTRAINT "Bilan_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilan" ADD CONSTRAINT "Bilan_seanceId_fkey" FOREIGN KEY ("seanceId") REFERENCES "Seance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilan" ADD CONSTRAINT "Bilan_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "Animator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qcm" ADD CONSTRAINT "Qcm_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
