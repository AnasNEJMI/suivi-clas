/*
  Warnings:

  - The values [SESSION,COMPREHENSION,METHODOLOGY] on the enum `AutoSummaryParagraphType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `comprehension` on the `AutoSummaryParagraph` table. All the data in the column will be lost.
  - You are about to drop the column `methodologyTrend` on the `AutoSummaryParagraph` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AutoSummaryParagraphType_new" AS ENUM ('CONTENT', 'ENGAGEMENT', 'NEXT_STEP');
ALTER TABLE "AutoSummaryParagraph" ALTER COLUMN "type" TYPE "AutoSummaryParagraphType_new" USING ("type"::text::"AutoSummaryParagraphType_new");
ALTER TYPE "AutoSummaryParagraphType" RENAME TO "AutoSummaryParagraphType_old";
ALTER TYPE "AutoSummaryParagraphType_new" RENAME TO "AutoSummaryParagraphType";
DROP TYPE "public"."AutoSummaryParagraphType_old";
COMMIT;

-- DropIndex
DROP INDEX "AutoSummaryParagraph_type_activity_engagement_isActive_idx";

-- DropIndex
DROP INDEX "AutoSummaryParagraph_type_comprehension_isActive_idx";

-- DropIndex
DROP INDEX "AutoSummaryParagraph_type_methodologyTrend_isActive_idx";

-- AlterTable
ALTER TABLE "AutoSummaryParagraph" DROP COLUMN "comprehension",
DROP COLUMN "methodologyTrend";

-- CreateIndex
CREATE INDEX "AutoSummaryParagraph_type_activity_isActive_idx" ON "AutoSummaryParagraph"("type", "activity", "isActive");

-- CreateIndex
CREATE INDEX "AutoSummaryParagraph_type_engagement_isActive_idx" ON "AutoSummaryParagraph"("type", "engagement", "isActive");
