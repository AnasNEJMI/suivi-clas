-- DropIndex
DROP INDEX "Doc_link_type_key";

-- DropIndex
DROP INDEX "Lesson_classId_subject_label_key";

-- AlterTable
ALTER TABLE "Bilan" ALTER COLUMN "subject" SET DEFAULT 'math';

-- AlterTable
ALTER TABLE "Doc" ALTER COLUMN "type" SET DEFAULT 'fiche',
ALTER COLUMN "link" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "subject" SET DEFAULT 'math',
ALTER COLUMN "label" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "ponctuality" SET DEFAULT 0,
ALTER COLUMN "preparation" SET DEFAULT 0,
ALTER COLUMN "autonomy" SET DEFAULT 0,
ALTER COLUMN "organisation" SET DEFAULT 0,
ALTER COLUMN "regularity" SET DEFAULT 0,
ALTER COLUMN "discipline" SET DEFAULT 0,
ALTER COLUMN "respect" SET DEFAULT 0,
ALTER COLUMN "positive" SET DEFAULT '',
ALTER COLUMN "negative" SET DEFAULT '',
ALTER COLUMN "improvements" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DEFAULT 'john',
ALTER COLUMN "gender" SET DEFAULT 'm',
ALTER COLUMN "lastName" SET DEFAULT 'doe',
ALTER COLUMN "role" SET DEFAULT 'student';
