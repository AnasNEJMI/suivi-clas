-- CreateEnum
CREATE TYPE "AutoSummaryParagraphType" AS ENUM ('SESSION', 'COMPREHENSION', 'METHODOLOGY', 'NEXT_STEP');

-- CreateTable
CREATE TABLE "AutoSummaryParagraph" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "type" "AutoSummaryParagraphType" NOT NULL,
    "activity" TEXT,
    "engagement" TEXT,
    "comprehension" TEXT,
    "methodologyTrend" TEXT,
    "nextStep" TEXT,
    "template" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutoSummaryParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutoSummaryParagraph_key_key" ON "AutoSummaryParagraph"("key");

-- CreateIndex
CREATE INDEX "AutoSummaryParagraph_type_activity_engagement_isActive_idx" ON "AutoSummaryParagraph"("type", "activity", "engagement", "isActive");

-- CreateIndex
CREATE INDEX "AutoSummaryParagraph_type_comprehension_isActive_idx" ON "AutoSummaryParagraph"("type", "comprehension", "isActive");

-- CreateIndex
CREATE INDEX "AutoSummaryParagraph_type_methodologyTrend_isActive_idx" ON "AutoSummaryParagraph"("type", "methodologyTrend", "isActive");

-- CreateIndex
CREATE INDEX "AutoSummaryParagraph_type_nextStep_isActive_idx" ON "AutoSummaryParagraph"("type", "nextStep", "isActive");
