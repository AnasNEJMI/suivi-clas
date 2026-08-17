import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';

import {Prisma, PrismaClient} from '../src/generated/prisma/client.js'
import { readFileSync, writeFileSync } from "node:fs";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type BackupEntry = {
  question:      string;
  difficulty:    string;
  answerA:       string;
  answerB:       string;
  answerC:       string;
  answerD:       string;
  correctAnswer: string;
  explanation:   string;
  lessonLabel:   string;
  subjectLabel:  string;
  levelLabel:    string;
};

// ── Main ───────────────────────────────────────────────────────────────────────
 
async function main() {
  // 1. Read backup file
  const backupPath = "prisma/qcm-backup.json";
  let raw: string;
  try {
    raw = readFileSync(backupPath, "utf-8");
  } catch {
    console.error(`❌ Backup file not found at ${backupPath}`);
    console.error("   Run: npm run extract-qcm   before dropping the DB.");
    process.exit(1);
  }
 
  const entries = JSON.parse(raw) as BackupEntry[];
  console.log(`\n📂 Loaded ${entries.length} questions from ${backupPath}`);
 
  // 2. Build a lookup map: "levelLabel|subjectLabel|lessonLabel" → lessonId
  //    Using all three fields as the key because lesson labels are only unique
  //    within a (level, subject) pair — the same label can exist across subjects.
  const lessons = await prisma.lesson.findMany({
    select: {
      id:      true,
      label:   true,
      subject: { select: { label: true } },
      level:   { select: { label: true } },
    },
  });
 
  const lessonMap = new Map<string, number>(
    lessons.map((l) => [
      `${l.level.label}|${l.subject.label}|${l.label}`,
      l.id,
    ])
  );
 
  console.log(`🔍 ${lessons.length} lessons found in DB\n`);
 
  // 3. Resolve every backup entry to a current lessonId
  const toCreate: Prisma.QcmBankQuestionCreateManyInput[] = []
  const missing: string[] = [];
 
  for (const entry of entries) {
    const key      = `${entry.levelLabel}|${entry.subjectLabel}|${entry.lessonLabel}`;
    const lessonId = lessonMap.get(key);
 
    if (!lessonId) {
      missing.push(key);
      continue;
    }
 
    toCreate.push({
      lessonId,
      question:      entry.question,
      difficulty:    entry.difficulty    as "e" | "m" | "h",
      answerA:       entry.answerA,
      answerB:       entry.answerB,
      answerC:       entry.answerC,
      answerD:       entry.answerD,
      correctAnswer: entry.correctAnswer as "a" | "b" | "c" | "d",
      explanation:   entry.explanation,
    });
  }
 
  // 4. Report unresolved entries before writing anything
  if (missing.length > 0) {
    console.warn(`⚠  ${missing.length} question(s) skipped — lesson not found in DB:`);
    // Group by subject for easier reading
    const grouped = new Map<string, string[]>();
    for (const key of missing) {
      const [level, subject, lesson] = key.split("|");
      const groupKey = `${level} | ${subject}`;
      if (!grouped.has(groupKey)) grouped.set(groupKey, []);
      grouped.get(groupKey)!.push(lesson ?? key);
    }
    for (const [group, labels] of grouped) {
      console.warn(`   ${group}`);
      labels.forEach((l) => console.warn(`     - ${l}`));
    }
    console.warn(
      "\n   This usually means a lesson label in seed.users.data.ts differs"
      + "\n   from what the AI used when generating the questions."
      + "\n   Fix the label mismatch then re-run this script.\n"
    );
  }
 
  if (toCreate.length === 0) {
    console.error("❌ Nothing to restore — all entries were unresolved.");
    process.exit(1);
  }
 
  // 5. Insert in one batch
  console.log(`⬆  Inserting ${toCreate.length} questions...`);
  const { count } = await prisma.qcmBankQuestion.createMany({
    data:           toCreate,
    skipDuplicates: true,   // idempotent — safe to re-run if script is interrupted
  });
 
  console.log(`\n✅ Restored ${count} questions`);
  if (count < toCreate.length) {
    console.log(
      `   (${toCreate.length - count} skipped as duplicates — table was not empty)`
    );
  }
}
 
main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
 