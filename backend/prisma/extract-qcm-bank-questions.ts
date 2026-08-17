import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';

import {PrismaClient} from '../src/generated/prisma/client.js'
import { writeFileSync } from "node:fs";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const questions = await prisma.qcmBankQuestion.findMany({
    select: {
      question:      true,
      difficulty:    true,
      answerA:       true,
      answerB:       true,
      answerC:       true,
      answerD:       true,
      correctAnswer: true,
      explanation:   true,
      lesson: {
        select: {
          label:   true,
          subject: { select: { label: true } },
          level:   { select: { label: true } },
        },
      },
    },
  })

  const exportData = questions.map(q => ({
    question:      q.question,
    difficulty:    q.difficulty,
    answerA:       q.answerA,
    answerB:       q.answerB,
    answerC:       q.answerC,
    answerD:       q.answerD,
    correctAnswer: q.correctAnswer,
    explanation:   q.explanation,
    // Natural keys — survive the reseed
    lessonLabel:   q.lesson.label,
    subjectLabel:  q.lesson.subject.label,
    levelLabel:    q.lesson.level.label,
  }))

  writeFileSync('prisma/qcm-backup.json', JSON.stringify(exportData, null, 2))
  console.log(`✅ Exported ${exportData.length} questions → prisma/qcm-backup.json`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())