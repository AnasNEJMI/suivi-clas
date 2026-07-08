/*
  Warnings:

  - You are about to drop the column `name` on the `Association` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `Association` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Association` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Association_name_key";

-- AlterTable
ALTER TABLE "Association" DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Association_label_key" ON "Association"("label");
