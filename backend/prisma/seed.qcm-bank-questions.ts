import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg';
import {Difficulty, PrismaClient} from '../src/generated/prisma/client.js'
import Groq from 'groq-sdk';
import { Mistral } from '@mistralai/mistralai';

import { GoogleGenAI } from "@google/genai";
import { Type, Schema } from '@google/genai';

// const gemini    = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null
const gemini = process.env.GEMINI_API_KEY ? new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY}) : null;


// TypeScript Interface for your output
export interface QCMQuestion {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export interface QCMResponse {
  questions: QCMQuestion[];
}

// 1. Defined Schema for Gemini Structured Outputs
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

// 2. Updated Prompt Generator requesting all 3 difficulties at once
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
4. Tout le contenu doit être rédigé en français.`;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 3. Gemini Direct Generator
async function generateQCM(prompt: string) {
    if(!gemini) return;
  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: batchQcmSchema,
      temperature: 0.3,
    },
  });

  if (!response.text) throw new Error('Empty response from Gemini API');
  return JSON.parse(response.text);
}



//PRISMA CLIENT
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const groq      = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null
const mistral      = process.env.MISTRAL_API_KEY ? new Mistral({ apiKey: process.env.GROQ_API_KEY }) : null

if(gemini){
    console.log('gemini setup success')
}
if(groq){
    console.log('groc setup success')
}
if(mistral){
    console.log('mistral setup success')
}

const CONFIG = {
    currentDifficulity : 'e' as Difficulty,
    questionsPerDifficulty: 10,
    delayBetweenCalls:      1000 * 30,
    maxRetries:             3,
    model: {
        gemini:    "gemini-2.5-flash-lite",
        groq:      'llama-3.3-70b-versatile',
        mistral: 'mistral-large-latest',
    },
}

const DIFFICULTIES = ['e'] as const;


function buildPrompt(lesson: string, subject: string, level: string, difficulty: 'e'|'m'|'h', count: number): string {
  const difficultyDesc = {
    e: 'niveau facile : rappel direct du cours, réponse évidente pour un élève ayant bien suivi.',
    m: 'niveau intermédiaire : comprendre et appliquer, pas seulement mémoriser.',
    h: 'niveau difficile : analyser, raisonner, combiner plusieurs notions.',
  }
  return `Tu es un professeur de ${subject} niveau ${level} (programme Éducation Nationale française).
Génère exactement ${count} questions QCM pour : "${lesson}"
Difficulté : ${difficultyDesc[difficulty]}
RÈGLES : 4 propositions (A,B,C,D), 1 seule correcte, mauvaises réponses plausibles, explication 2-3 phrases, tout en français.
Réponds UNIQUEMENT avec du JSON valide, sans backticks ni texte.
Format : {"questions":[{"question":"...","answerA":"...","answerB":"...","answerC":"...","answerD":"...","correctAnswer":"a","explanation":"..."}]}`
}

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

// Provider exhaustion tracker — persists across the session
const exhausted = {gemini: false, groq: false, mistral : false}

// Wrapper to retry API calls with exponentially increasing delays
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
      const errorMsg = String(error).toLowerCase();
      const isRateLimit =
        errorMsg.includes('429') ||
        errorMsg.includes('quota') ||
        errorMsg.includes('resource_exhausted') ||
        errorMsg.includes('rate limit');

      // Rethrow immediately if it's the last attempt OR not a transient/rate-limit error
      if (attempt === maxRetries || !isRateLimit) {
        throw error;
      }

      console.warn(
        `[Attempt ${attempt}/${maxRetries}] Hit rate limit. Retrying in ${delay / 1000}s...`
      );
      await sleep(delay);
      delay *= 2; // Exponential backoff: 2s -> 4s -> 8s
    }
  }

  throw new Error('Max retries exceeded');
}

// 4. Multi-Provider Fallback Function
// Updated Provider Selector with Exponential Backoff
async function callBestAvailableProvider(
  prompt: string,
  totalExpectedCount: number
): Promise<any[]> {
  // 1. Try Gemini (with 3 retries: wait 2s, then 4s, then 8s)
  if (gemini && !exhausted.gemini) {
    try {
      return await retryWithBackoff(async () => {
        const qcmData = await generateQCM(prompt);
        console.log('qcm data : ', qcmData)
        if (qcmData.questions?.length) return qcmData.questions;
        throw new Error('Invalid output structure from Gemini');
    });
} catch (e) {
    console.log('gemini error : ', e)
    exhausted.gemini = true;
      console.log('⚠ Gemini daily quota exhausted (or failed after retries) → switching provider');
    }
  }

  // 2. Fallback: Groq (with retries)
  if (groq && !exhausted.groq) {
    try {
      return await retryWithBackoff(async () => {
        const completion = await groq.chat.completions.create({
          model: CONFIG.model.groq,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 8192,
          response_format: { type: 'json_object' },
        });
        const parsed = JSON.parse(stripFences(completion.choices[0]?.message?.content ?? ''));
        if (parsed.questions?.length) return parsed.questions;
        throw new Error('Invalid output structure from Groq');
      });
    } catch (e) {
      exhausted.groq = true;
      console.log('⚠ Groq daily quota exhausted → switching provider');
    }
  }

  // 3. Fallback: Mistral (with retries)
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
      });
    } catch (e) {
      exhausted.mistral = true;
      console.log('⚠ Mistral daily quota exhausted → switching provider');
    }
  }

  throw new Error('All providers exhausted for today. Re-run tomorrow.');
}


// 5. Refactored Main Function
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

  const totalPerLesson = CONFIG.questionsPerDifficulty * 3; // e.g., 10 * 3 = 30
  console.log(`\n🤖 Generating QCM for ${lessons.length} lessons (${totalPerLesson} questions each in batched requests)\n`);

  let created = 0;
  const errors: string[] = [];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i]!;
    const existing = await prisma.qcmBankQuestion.count({ where: { lessonId: lesson.id } });

    // Skip if all 30 questions already exist
    if (existing >= totalPerLesson) {
      console.log(`[${i + 1}/${lessons.length}] ⏭ ${lesson.label} (already generated)`);
      continue;
    }

    console.log(`[${i + 1}/${lessons.length}] ${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`);

    // Pause between calls to respect rate limits (~6.5s recommended for Gemini Free Tier)
    await new Promise((r) => setTimeout(r, CONFIG.delayBetweenCalls));

    try {
      const prompt = buildBatchedPrompt(
        lesson.label,
        lesson.subject.label,
        lesson.level.label,
        CONFIG.questionsPerDifficulty
      );

      // Single call generates all 30 questions across all difficulties
      const questions = await callBestAvailableProvider(prompt, totalPerLesson);

      const { count } = await prisma.qcmBankQuestion.createMany({
        data: questions.map((q: any) => ({
          lessonId: lesson.id,
          question: q.question,
          difficulty: q.difficulty, // Extracted directly from generated question object
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

      // Halt execution if all LLM providers hit daily quotas
      if (Object.values(exhausted).every(Boolean)) {
        console.log('⚠ All providers exhausted. Stopping run.');
        break;
      }
    }
  }

  console.log(`\n✅ Done — ${created} questions created, ${errors.length} errors`);
  if (errors.length) errors.forEach((e) => console.log(`  ✗ ${e}`));
}
// async function main(){
//     const lesson = await prisma.lesson.findFirst({
//         where : { levelId : {in : [9,10,11,12]}},
//         select: { id: true, label: true, subject: { select: { label: true } }, level: { select: { label: true } } },
//         orderBy: { id: 'asc' },
//     })
    
//     if(!lesson) return;
//     let created = 0; const errors: string[] = []

//     for (const difficulty of DIFFICULTIES) {
//         console.log('diff :', difficulty);
//         await new Promise(r => setTimeout(r, CONFIG.delayBetweenCalls))
//         try {
//             const prompt = buildPrompt(lesson.label, lesson.subject.label, lesson.level.label, difficulty, CONFIG.questionsPerDifficulty)
//             const questions = await callBestAvailableProvider(prompt, CONFIG.questionsPerDifficulty)
//             console.log('questions : ', questions)
//             const { count } = await prisma.qcmBankQuestion.createMany({
//             data: questions.map((q: any) => {
//                 const question = {lessonId: lesson.id, question: q.question, difficulty, answerA: q.answerA, answerB: q.answerB, answerC: q.answerC, answerD: q.answerD, correctAnswer: q.correctAnswer, explanation: q.explanation };
//                 console.log(question);
//                 return question;
//             }),
//             skipDuplicates: true,
//             })
//             created += count; 
//             console.log(`✓ ${difficulty.toUpperCase()} — ${count} questions`)
//         } catch (e) {
//             console.error(e);
//             errors.push(`${lesson.label} (${difficulty}): ${String(e).slice(0, 80)}`)
//             if (String(e).includes('All providers')) return;
//         }
//     }
//     if (Object.values(exhausted).every(Boolean)) return;
// }
main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())

