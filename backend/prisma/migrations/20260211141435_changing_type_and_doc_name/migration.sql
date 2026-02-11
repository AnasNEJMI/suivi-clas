/*
  Warnings:

  - You are about to drop the `Doc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doc" DROP CONSTRAINT "Doc_lessonId_fkey";

-- DropTable
DROP TABLE "Doc";

-- DropEnum
DROP TYPE "DocType";

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'fiche',
    "link" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
