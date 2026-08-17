import "dotenv/config";
import { PrismaPg }     from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import Groq             from "groq-sdk";
import { GoogleGenAI }  from "@google/genai";

// ── Config ────────────────────────────────────────────────────────────────────

const QUESTIONS_PER_DIFFICULTY = 10;
const QUESTIONS_PER_LESSON     = QUESTIONS_PER_DIFFICULTY * 3; // 30

const GEMINI_DELAY_MS = 15_000;
const GROQ_DELAY_MS   = 30_000;

const GEMINI_MODELS = [
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.0-flash",
] as const;
type GeminiModel = (typeof GEMINI_MODELS)[number];

// ── Types ─────────────────────────────────────────────────────────────────────

type QCMQuestion = {
  difficulty:    "e" | "m" | "h";
  question:      string;
  answerA:       string;
  answerB:       string;
  answerC:       string;
  answerD:       string;
  correctAnswer: "a" | "b" | "c" | "d";
  explanation:   string;
};

type LessonInfo = {
  id:      number;
  label:   string;
  subject: { label: string };
  level:   { label: string };
};

// ── Clients ───────────────────────────────────────────────────────────────────

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

const geminiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const groqClient = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

if (geminiClient) console.log("✓ Gemini ready");
if (groqClient)   console.log("✓ Groq ready");

// ── Utilities ─────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}

function isQuotaError(err: unknown): boolean {
  const msg = String(err).toLowerCase();
  return (
    msg.includes("429")               ||
    msg.includes("quota")             ||
    msg.includes("resource_exhausted")||
    msg.includes("rate limit")
  );
}

// ── Prompt ────────────────────────────────────────────────────────────────────

function buildPrompt(lessonLabel: string, subject: string, level: string): string {
  return `Tu es un professeur de ${subject} niveau ${level} (programme Éducation Nationale française).
Génère exactement ${QUESTIONS_PER_LESSON} questions QCM pour la leçon : "${lessonLabel}".

Répartition obligatoire :
- ${QUESTIONS_PER_DIFFICULTY} questions de difficulté "e" (facile : rappel direct du cours, réponse évidente)
- ${QUESTIONS_PER_DIFFICULTY} questions de difficulté "m" (intermédiaire : comprendre et appliquer)
- ${QUESTIONS_PER_DIFFICULTY} questions de difficulté "h" (difficile : analyser, raisonner, combiner plusieurs notions)

Règles :
- 4 propositions (A, B, C, D) par question, 1 seule correcte, mauvaises réponses plausibles.
- Explication claire de 2-3 phrases par question.
- Tout le contenu en français.

Réponds UNIQUEMENT avec du JSON brut valide, sans backticks, sans texte avant ou après.
Format :
{
  "questions": [
    {
      "difficulty": "e",
      "question": "...",
      "answerA": "...",
      "answerB": "...",
      "answerC": "...",
      "answerD": "...",
      "correctAnswer": "a",
      "explanation": "..."
    }
  ]
}`;
}

// ── Validation ────────────────────────────────────────────────────────────────

function validateQuestions(raw: unknown, source: string): QCMQuestion[] {
  if (
    typeof raw !== "object" || raw === null ||
    !("questions" in raw)   ||
    !Array.isArray((raw as any).questions)
  ) {
    throw new Error(`${source}: response missing "questions" array`);
  }

  const questions = (raw as any).questions as QCMQuestion[];

  if (questions.length < QUESTIONS_PER_LESSON) {
    throw new Error(
      `${source}: got ${questions.length} questions, expected ${QUESTIONS_PER_LESSON}`
    );
  }

  const countByDifficulty = { e: 0, m: 0, h: 0 };
  for (const q of questions) {
    if (!["e", "m", "h"].includes(q.difficulty)) {
      throw new Error(`${source}: invalid difficulty "${q.difficulty}"`);
    }
    countByDifficulty[q.difficulty]++;
  }

  for (const [diff, count] of Object.entries(countByDifficulty)) {
    if (count < QUESTIONS_PER_DIFFICULTY) {
      throw new Error(
        `${source}: difficulty "${diff}" has ${count}/${QUESTIONS_PER_DIFFICULTY} questions`
      );
    }
  }

  return questions;
}

// ── Gemini ────────────────────────────────────────────────────────────────────

// Tracks which models hit their daily quota during this run
const exhaustedGeminiModels = new Set<GeminiModel>();

async function callGemini(lesson: LessonInfo): Promise<QCMQuestion[]> {
  if (!geminiClient) throw new Error("Gemini not configured");

  const prompt = buildPrompt(lesson.label, lesson.subject.label, lesson.level.label);

  for (const model of GEMINI_MODELS) {
    if (exhaustedGeminiModels.has(model)) continue;

    try {
      console.log(`    → ${model}`);

      const interaction = await geminiClient.interactions.create({
        model,
        input: prompt,
      });

      const rawText = interaction.output_text ?? "";
      if (!rawText) throw new Error(`${model}: empty response`);

      const parsed = JSON.parse(stripFences(rawText));
      return validateQuestions(parsed, model);

    } catch (err) {
      if (isQuotaError(err)) {
        exhaustedGeminiModels.add(model);
        console.warn(`    ⚠ ${model} quota hit → trying next model`);
        continue; // immediately try the next model with the same prompt
      }
      throw err; // non-quota error: propagate, don't try next model
    }
  }

  throw new Error("All Gemini models exhausted");
}

// ── Groq ──────────────────────────────────────────────────────────────────────

async function callGroq(lesson: LessonInfo): Promise<QCMQuestion[]> {
  if (!groqClient) throw new Error("Groq not configured");

  const prompt = buildPrompt(lesson.label, lesson.subject.label, lesson.level.label);

  const completion = await groqClient.chat.completions.create({
    model:           "llama-3.3-70b-versatile",
    messages:        [{ role: "user", content: prompt }],
    temperature:     0.3,
    response_format: { type: "json_object" },
  });

  const rawText = completion.choices[0]?.message?.content ?? "";
  if (!rawText) throw new Error("Groq: empty response");

  const parsed = JSON.parse(stripFences(rawText));
  return validateQuestions(parsed, "Groq");
}

// ── DB write ──────────────────────────────────────────────────────────────────

async function saveQuestions(lessonId: number, questions: QCMQuestion[]): Promise<number> {
  const { count } = await prisma.qcmBankQuestion.createMany({
    data: questions.map((q) => ({
      lessonId,
      question:      q.question,
      difficulty:    q.difficulty,
      answerA:       q.answerA,
      answerB:       q.answerB,
      answerC:       q.answerC,
      answerD:       q.answerD,
      correctAnswer: q.correctAnswer,
      explanation:   q.explanation,
    })),
    skipDuplicates: true,
  });
  return count;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const allLessons = await prisma.lesson.findMany({
    select: {
      id:      true,
      label:   true,
      subject: { select: { label: true } },
      level:   { select: { label: true } },
      _count:  { select: { qcmBankQuestions: true } },
    },
    orderBy: { id: "asc" },
  });

  const pending = allLessons.filter(
    (l) => l._count.qcmBankQuestions < QUESTIONS_PER_LESSON
  );

  console.log(
    `\n📚 ${allLessons.length} lessons — ` +
    `${allLessons.length - pending.length} done, ${pending.length} to process\n`
  );

  if (pending.length === 0) {
    console.log("✅ All lessons already have QCM questions.");
    return;
  }

  let totalCreated = 0;
  const failed: string[] = [];
  const geminiAllExhausted = () => GEMINI_MODELS.every((m) => exhaustedGeminiModels.has(m));

  for (let i = 0; i < pending.length; i++) {
    const lesson = pending[i]!;
    const tag    = `[${i + 1}/${pending.length}]`;
    console.log(`${tag} ${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`);

    if (i > 0) {
      const delay = geminiAllExhausted() ? GROQ_DELAY_MS : GEMINI_DELAY_MS;
      process.stdout.write(`  ⏳ waiting ${delay / 1000}s...`);
      await sleep(delay);
      process.stdout.write(" go\n");
    }

    try {
      const questions = geminiAllExhausted()
        ? await callGroq(lesson)
        : await callGemini(lesson);

      const saved   = await saveQuestions(lesson.id, questions);
      totalCreated += saved;
      console.log(`  ✓ ${saved} questions saved`);

    } catch (err) {
      // Gemini failed for a non-quota reason — try Groq immediately before giving up
      if (!geminiAllExhausted() && groqClient) {
        console.warn(`  ⚠ Gemini failed, trying Groq immediately...`);
        try {
          const questions = await callGroq(lesson);
          const saved     = await saveQuestions(lesson.id, questions);
          totalCreated   += saved;
          console.log(`  ✓ ${saved} questions saved (via Groq)`);
          continue;
        } catch (groqErr) {
          console.error(`  ✗ Groq also failed: ${String(groqErr).slice(0, 80)}`);
        }
      }

      failed.push(`${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`);
      console.error(`  ✗ ${String(err).slice(0, 100)}`);
    }
  }

  console.log(`\n✅ Done — ${totalCreated} questions created`);
  if (failed.length > 0) {
    console.log(`\n❌ ${failed.length} lessons failed:`);
    failed.forEach((l) => console.log(`   - ${l}`));
    console.log("\nRe-run the script to retry — already-completed lessons are skipped.");
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());