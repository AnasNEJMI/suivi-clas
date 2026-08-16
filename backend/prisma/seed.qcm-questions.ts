import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { Difficulty, PrismaClient } from '../src/generated/prisma/client.js';
import Groq from 'groq-sdk';
import { Mistral } from '@mistralai/mistralai';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import OpenAI from 'openai';

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;


// Initialize SDKs safely
const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

// FIXED: Use process.env.MISTRAL_API_KEY instead of GROQ_API_KEY
const mistral = process.env.MISTRAL_API_KEY
  ? new Mistral({ apiKey: process.env.MISTRAL_API_KEY })
  : null;

const openRouter = process.env.OPENROUTER_API_KEY
? new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
})
: null;

if (gemini) console.log('✓ Gemini setup success');
if (groq) console.log('✓ Groq setup success');
if (mistral) console.log('✓ Mistral setup success');

const CONFIG = {
  questionsPerDifficulty: 10,
  delayBetweenCalls: 6500, // 6.5s delay is optimal for Gemini Free Tier (~9.2 RPM)
  maxRetries: 3,
  model: {
    gemini: 'gemini-3.7-flash', // Updated model ID
    groq: 'llama-3.1-8b-instant',
    mistral: 'mistral-large-latest',
  },
};

// TypeScript Interfaces
export interface QCMQuestion {
  difficulty: 'e' | 'm' | 'h';
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

// 1. JSON Schema for Gemini Structured Outputs
const batchQcmSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          difficulty: { type: Type.STRING, enum: ['e', 'm', 'h'] },
          question: { type: Type.STRING },
          answerA: { type: Type.STRING },
          answerB: { type: Type.STRING },
          answerC: { type: Type.STRING },
          answerD: { type: Type.STRING },
          correctAnswer: { type: Type.STRING, enum: ['a', 'b', 'c', 'd'] },
          explanation: { type: Type.STRING },
        },
        required: [
          'difficulty',
          'question',
          'answerA',
          'answerB',
          'answerC',
          'answerD',
          'correctAnswer',
          'explanation',
        ],
      },
    },
  },
  required: ['questions'],
};

// 2. Prompt Builder
function buildBatchedPrompt(
  lesson: string,
  subject: string,
  level: string,
  countPerDifficulty: number
): string {
  const total = countPerDifficulty * 3;
  return `Tu es un professeur de ${subject} niveau ${level} (programme Éducation Nationale française).
Génère exactement ${total} questions QCM pour la leçon : "${lesson}".

RÉPARTITION OBLIGATOIRE :
- ${countPerDifficulty} questions de difficulté "e" (facile : rappel direct du cours, réponse évidente).
- ${countPerDifficulty} questions de difficulté "m" (intermédiaire : comprendre et appliquer).
- ${countPerDifficulty} questions de difficulté "h" (difficile : analyser, raisonner, combiner plusieurs notions).

RÈGLES :
1. 4 propositions par question (A,B,C,D), 1 seule correcte.
2. Renseigne impérativement le champ "difficulty" ("e", "m", ou "h") pour chaque question.
3. Explication claire de 2-3 phrases par question.
4. Tout le contenu doit être rédigé en français.
Réponds UNIQUEMENT avec du JSON valide, sans backticks ni texte.
Format : {"questions":[{"question":"...","answerA":"...","answerB":"...","answerC":"...","answerD":"...","correctAnswer":"a","explanation":"...", "difficulty":"..."}]}
`;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
}

// 3. Gemini Direct Generator
async function generateQCM(prompt: string) {
  if (!ai) throw new Error('GEMINI_API_KEY is not defined');

  const interaction = await ai.interactions.create({
    model: 'gemini-3.5-flash', // Free tier supported model
    input: prompt,
  });

  const rawText = interaction.output_text ?? '';
  console.log('rawText : ', rawText);
  return JSON.parse(stripFences(rawText));
}

// Prisma Client Setup
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Provider exhaustion tracker
const exhausted = { gemini: false, groq: false, mistral: false, openrouter : false};

// Helper to identify rate limit errors
function isRateLimitError(error: any): boolean {
  const msg = String(error).toLowerCase();
  return (
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('resource_exhausted') ||
    msg.includes('rate limit')
  );
}

// Wrapper for exponential backoff retries
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelayMs = 2000
): Promise<T> {
  let delay = initialDelayMs;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (attempt === maxRetries || !isRateLimitError(error)) {
        throw error;
      }

      console.warn(
        `[Attempt ${attempt}/${maxRetries}] Hit rate limit. Retrying in ${delay / 1000}s...`
      );
      await sleep(delay);
      delay *= 2;
    }
  }

  throw new Error('Max retries exceeded');
}

// 4. Multi-Provider Fallback Function
async function callBestAvailableProvider(
  prompt: string,
  totalExpectedCount: number
): Promise<any[]> {
  // 3. OpenRouter (Free Qwen 2.5 72B - Excellent for French)
  // if (openRouter && !exhausted.openrouter) {
  //   try {
  //     return await retryWithBackoff(async () => {
  //       const completion = await openRouter.chat.completions.create({
  //         model: 'qwen/qwen-2.5-72b-instruct:free',
  //         messages: [{ role: 'user', content: prompt }],
  //         response_format: { type: 'json_object' },
  //       });
  //       const parsed = JSON.parse(stripFences(completion.choices[0]?.message?.content ?? ''));
  //       if (parsed.questions?.length) return parsed.questions;
  //       throw new Error('Invalid output from OpenRouter');
  //     });
  //   } catch (e) {
  //     if (isRateLimitError(e)) exhausted.openrouter = true;
  //   }
  // }
    // 1. Gemini
  if (gemini && !exhausted.gemini) {
    try {
      return await retryWithBackoff(async () => {
        const qcmData = await generateQCM(prompt);
        if (qcmData.questions?.length) return qcmData.questions;
        throw new Error('Invalid output structure from Gemini');
      }, CONFIG.maxRetries);
    } catch (e) {
      console.error('Gemini error:', String(e).slice(0, 120));
      if (isRateLimitError(e)) {
        exhausted.gemini = true;
        console.log('⚠ Gemini daily quota exhausted → switching provider');
      } else {
        throw e; // Rethrow non-quota errors immediately
      }
    }
  }

  // 2. Groq
  if (groq && !exhausted.groq) {
    try {
      return await retryWithBackoff(async () => {
        const completion = await groq.chat.completions.create({
          model: CONFIG.model.groq,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
        });
        const parsed = JSON.parse(stripFences(completion.choices[0]?.message?.content ?? ''));
        if (parsed.questions?.length) return parsed.questions;
        throw new Error('Invalid output structure from Groq');
      }, CONFIG.maxRetries);
    } catch (e) {
      console.error('Groq error:', String(e).slice(0, 120));
      if (isRateLimitError(e)) {
        exhausted.groq = true;
        console.log('⚠ Groq daily quota exhausted → switching provider');
      } else {
        throw e;
      }
    }
  }

  // 3. Mistral
  if (mistral && !exhausted.mistral) {
    try {
      return await retryWithBackoff(async () => {
        const completion = await mistral.chat.complete({
          model: CONFIG.model.mistral,
          messages: [{ role: 'user', content: prompt }],
          responseFormat: { type: 'json_object' },
        });
        const parsed = JSON.parse(stripFences(completion.choices[0]?.message?.content?.toString() ?? ''));
        if (parsed.questions?.length) return parsed.questions;
        throw new Error('Invalid output structure from Mistral');
      }, CONFIG.maxRetries);
    } catch (e) {
      console.error('Mistral error:', String(e).slice(0, 120));
      if (isRateLimitError(e)) {
        exhausted.mistral = true;
        console.log('⚠ Mistral daily quota exhausted → switching provider');
      } else {
        throw e;
      }
    }
  }

  throw new Error('All providers exhausted for today. Re-run tomorrow.');
}

// async function main(){
//   const lesson = await prisma.lesson.findFirst({
//     select: {
//       id: true,
//       label: true,
//       subject: { select: { label: true } },
//       level: { select: { label: true } },
//     }
//   });

//   if(!lesson) return;
//   const totalPerLesson = CONFIG.questionsPerDifficulty * 3;
//   // const existing = await prisma.qcmBankQuestion.count({ where: { lessonId: lesson.id } });
//   // if (existing >= totalPerLesson) {
//   //   console.log(`${lesson.label} (already generated)`);
//   //   return;
//   // }
//   let created = 0;
//   const errors: string[] = [];

//   console.log(`${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`);

//   await sleep(CONFIG.delayBetweenCalls);

//   try {
//       const prompt = buildBatchedPrompt(
//         lesson.label,
//         lesson.subject.label,
//         lesson.level.label,
//         CONFIG.questionsPerDifficulty
//       );

//       const questions = await callBestAvailableProvider(prompt, totalPerLesson);
//       console.error(`${lesson.label} questions : `, questions);
//   }catch(e){
//     errors.push(`${lesson.label}: ${String(e).slice(0, 80)}`);
//     console.error(`✗ Error processing ${lesson.label}:`, e);

//     if (Object.values(exhausted).every(Boolean)) {
//       console.log('⚠ All providers exhausted. Stopping run.');
//       return;
//     }
//   }

// }
// 5. Main Execution
async function main() {
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      label: true,
      subject: { select: { label: true } },
      level: { select: { label: true } },
    },
    orderBy: { id: 'asc' },
  });

  const totalPerLesson = CONFIG.questionsPerDifficulty * 3;
  console.log(`\n🤖 Generating QCM for ${lessons.length} lessons (${totalPerLesson} questions each in batched requests)\n`);

  let created = 0;
  const errors: string[] = [];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i]!;
    const existing = await prisma.qcmBankQuestion.count({ where: { lessonId: lesson.id } });

    if (existing >= totalPerLesson) {
      console.log(`[${i + 1}/${lessons.length}] ⏭ ${lesson.label} (already generated)`);
      continue;
    }

    console.log(`[${i + 1}/${lessons.length}] ${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`);

    await sleep(CONFIG.delayBetweenCalls);

    try {
      const prompt = buildBatchedPrompt(
        lesson.label,
        lesson.subject.label,
        lesson.level.label,
        CONFIG.questionsPerDifficulty
      );

      const questions = await callBestAvailableProvider(prompt, totalPerLesson);

      const { count } = await prisma.qcmBankQuestion.createMany({
        data: questions.map((q: any) => ({
          lessonId: lesson.id,
          question: q.question,
          difficulty: q.difficulty,
          answerA: q.answerA,
          answerB: q.answerB,
          answerC: q.answerC,
          answerD: q.answerD,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        })),
        skipDuplicates: true,
      });

      created += count;
      console.log(`✓ Saved ${count} questions for "${lesson.label}"`);
    } catch (e) {
      errors.push(`${lesson.label}: ${String(e).slice(0, 80)}`);
      console.error(`✗ Error processing ${lesson.label}:`, e);

      if (Object.values(exhausted).every(Boolean)) {
        console.log('⚠ All providers exhausted. Stopping run.');
        break;
      }
    }
  }

  console.log(`\n✅ Done — ${created} questions created, ${errors.length} errors`);
  if (errors.length) errors.forEach((e) => console.log(`  ✗ ${e}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());