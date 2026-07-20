-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "scolarYearId" INTEGER NOT NULL,
    "numVisits" INTEGER NOT NULL,
    "lastVisit" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_studentId_idx" ON "Visit"("studentId");

-- CreateIndex
CREATE INDEX "Visit_scolarYearId_idx" ON "Visit"("scolarYearId");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_scolarYearId_fkey" FOREIGN KEY ("scolarYearId") REFERENCES "ScolarYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;
