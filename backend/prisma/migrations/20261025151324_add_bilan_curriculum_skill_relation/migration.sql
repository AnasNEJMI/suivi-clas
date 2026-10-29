-- CreateTable
CREATE TABLE "_BilanToCurriculumSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BilanToCurriculumSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BilanToCurriculumSkill_B_index" ON "_BilanToCurriculumSkill"("B");

-- AddForeignKey
ALTER TABLE "_BilanToCurriculumSkill" ADD CONSTRAINT "_BilanToCurriculumSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Bilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BilanToCurriculumSkill" ADD CONSTRAINT "_BilanToCurriculumSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "CurriculumSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
