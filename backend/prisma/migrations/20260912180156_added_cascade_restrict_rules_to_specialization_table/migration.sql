-- DropForeignKey
ALTER TABLE "AnimatorContractSpecialization" DROP CONSTRAINT "AnimatorContractSpecialization_animatorContractId_fkey";

-- DropForeignKey
ALTER TABLE "AnimatorContractSpecialization" DROP CONSTRAINT "AnimatorContractSpecialization_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "AnimatorContractSpecialization" ADD CONSTRAINT "AnimatorContractSpecialization_animatorContractId_fkey" FOREIGN KEY ("animatorContractId") REFERENCES "AnimatorContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimatorContractSpecialization" ADD CONSTRAINT "AnimatorContractSpecialization_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
