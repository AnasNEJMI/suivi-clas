-- AlterTable
CREATE SEQUENCE lessonevaluation_id_seq;
ALTER TABLE "LessonEvaluation" ALTER COLUMN "id" SET DEFAULT nextval('lessonevaluation_id_seq'),
ADD CONSTRAINT "LessonEvaluation_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE lessonevaluation_id_seq OWNED BY "LessonEvaluation"."id";
