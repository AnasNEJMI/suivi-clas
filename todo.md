# Suivi CLAS — Remaining Tasks

> Tasks ordered by priority and dependency. Sub-tasks within each section
> are listed in the optimal implementation order (DB → backend → frontend).
> Code blocks are included where it was already written in this conversation.

---

## Table of Contents

- [1-1 Student Page — Lesson Evaluations Card](#1-1-student-page--lesson-evaluations-card)
- [1-2 Student Page — QCM Section](#1-2-student-page--qcm-section)
- [1-3 Student Page — Lesson Summaries & Exercises](#1-3-student-page--lesson-summaries--exercises)
- [2 Association Page — Statistics Dashboard](#2-association-page--statistics-dashboard)
- [3 Home Page Redesign + Login Page](#3-home-page-redesign--login-page)
- [4 Animator Page — Association Comments](#4-animator-page--association-comments)
- [5 GitHub Action — Keep Render Alive](#5-github-action--keep-render-alive)

---

## 1-1 Student Page — Lesson Evaluations Card

**Goal:** Student selects a subject from a filtered list (only subjects where at least one lesson has been evaluated). A table displays all lessons for that subject with their evaluation status colour-coded by mastery level. Unevaluated lessons show "Pas encore évalué".

### Status: ⬜ Not started

---

### Sub-task 1-1-A — Backend endpoint (already implemented)

The handler `studentLessonEvalsHandler` is already written. It returns `LessonsEvalResponse { lessonsPerSubject: LessonsPerSubject[] }` where each lesson has `eval: LessonEvalEntry | null`.

```typescript
// src/controllers/student/lessonEvals.controller.ts
export async function studentLessonEvalsHandler(req, res, next) {
  try {
    const studentId = req.user!.id;
    const levelId   = req.user!.level?.id;
    if (!levelId) throw ApiError.badRequest('Aucun niveau scolaire assigné.');

    const lessons = await prisma.lesson.findMany({
      where: { levelId },
      select: {
        id: true, label: true,
        subject: { select: { id: true, label: true } },
        lessonEvals: {
          where: { studentId },
          take:  1,
          select: {
            id: true, evaluation: true,
            submittedBy: { select: { id: true, firstName: true, lastName: true } },
          },
        },
      },
      orderBy: [{ subject: { label: 'asc' } }, { label: 'asc' }],
    });

    // O(n) single-pass Map grouping — already ordered alphabetically by subject
    const subjectMap = new Map();
    for (const lesson of lessons) {
      if (!subjectMap.has(lesson.subject.id)) {
        subjectMap.set(lesson.subject.id, {
          id: lesson.subject.id, label: lesson.subject.label, lessons: [],
        });
      }
      subjectMap.get(lesson.subject.id).lessons.push({
        id: lesson.id, label: lesson.label, eval: lesson.lessonEvals[0] ?? null,
      });
    }

    return sendSuccess(res, { lessonsPerSubject: Array.from(subjectMap.values()) });
  } catch (error) { next(error); }
}
```

**Route:**
```typescript
router.get('/student/lesson-evals', requireAuthHandler, requireRole('student'), asyncHandler(studentLessonEvalsHandler));
```

---

### Sub-task 1-1-B — Frontend query key + API call

```typescript
// src/api/student/query-keys.ts
export const studentKeys = {
  lessonEvals: (studentId: number) => ['student', 'lesson-evals', studentId] as const,
};

// src/api/student/apiCalls.ts
fetchLessonEvals: () => apiRequest<LessonsEvalResponse>('/api/student/lesson-evals'),
```

---

### Sub-task 1-1-C — Types

```typescript
// src/api/student/types.ts
export type LessonEvalValue = 'notAcquired' | 'inProgress' | 'acquired' | 'mastered';

export const LESSON_EVAL_LABELS: Record<LessonEvalValue, string> = {
  notAcquired: 'Non acquis',
  inProgress:  'En cours',
  acquired:    'Acquis',
  mastered:    'Maîtrisé',
};

export const LESSON_EVAL_STYLES: Record<LessonEvalValue, string> = {
  notAcquired: 'bg-rose-100   text-rose-700   border-rose-200',
  inProgress:  'bg-amber-100  text-amber-700  border-amber-200',
  acquired:    'bg-blue-100   text-blue-700   border-blue-200',
  mastered:    'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export type LessonEntry = {
  id:    number;
  label: string;
  eval:  { id: number; evaluation: LessonEvalValue; submittedBy: { id: number; firstName: string; lastName: string } } | null;
};

export type LessonsPerSubject = {
  id:      number;
  label:   string;
  lessons: LessonEntry[];
};

export type LessonsEvalResponse = { lessonsPerSubject: LessonsPerSubject[] };
```

---

### Sub-task 1-1-D — `LessonEvalCard` component

> **To build.** Key design decisions:
> - Subject selector: `ToggleGroup` showing only subjects where at least one lesson has a non-null `eval`
> - Table: shadcn `Table` component with columns: Leçon | Évaluation | Soumis par
> - Evaluation badge: coloured pill using `LESSON_EVAL_STYLES`
> - No evaluation: grey "Pas encore évalué" badge
> - Skeleton variant: pulse rows inside the table

```tsx
// src/routes/student/cards/lesson-eval-card.tsx
// TO BUILD — structure outline:

import { useState, useMemo } from 'react'
import { useSuspenseQuery }  from '@tanstack/react-query'
import { studentKeys }       from '@/api/student/query-keys'
import { studentApiCalls }   from '@/api/student/apiCalls'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LESSON_EVAL_LABELS, LESSON_EVAL_STYLES } from '@/api/student/types'
import type { LessonsPerSubject } from '@/api/student/types'

export function LessonEvalCardSkeleton() {
  return (
    <div className='font-outfit rounded-2xl border border-zinc-100 bg-white shadow-sm p-6'>
      <div className='h-6 w-48 rounded-lg bg-zinc-200 animate-pulse mb-6' />
      <div className='flex gap-2 mb-6'>
        {[80, 100, 90, 110].map((w, i) => (
          <div key={i} style={{ width: w }} className='h-8 rounded-lg bg-zinc-200 animate-pulse' />
        ))}
      </div>
      {[1,2,3,4,5].map(i => (
        <div key={i} className='flex gap-4 py-3 border-b border-zinc-100'>
          <div className='h-4 flex-1 rounded bg-zinc-200 animate-pulse' />
          <div className='h-4 w-24 rounded bg-zinc-200 animate-pulse' />
          <div className='h-4 w-28 rounded bg-zinc-200 animate-pulse' />
        </div>
      ))}
    </div>
  )
}

export default function LessonEvalCard({ userId }: { userId: number }) {
  const { data } = useSuspenseQuery({
    queryKey: studentKeys.lessonEvals(userId),
    queryFn:  studentApiCalls.fetchLessonEvals,
    staleTime: 5 * 60 * 1000,
  })

  // Only show subjects that have at least one evaluated lesson
  const subjectsWithEvals = useMemo(
    () => data.lessonsPerSubject.filter(s => s.lessons.some(l => l.eval !== null)),
    [data]
  )

  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    subjectsWithEvals[0]?.id ?? null
  )

  const selectedSubject = data.lessonsPerSubject.find(s => s.id === selectedSubjectId)

  if (subjectsWithEvals.length === 0) {
    return (
      <div className='font-outfit rounded-2xl border border-zinc-100 bg-white shadow-sm p-8 text-center'>
        <p className='text-zinc-400 text-sm'>Aucune évaluation disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className='font-outfit rounded-2xl border border-zinc-100 bg-white shadow-sm p-6'>
      <h2 className='text-lg font-semibold text-zinc-800 mb-5'>Évaluations de maîtrise</h2>

      {/* Subject selector — only subjects with at least one eval */}
      <ToggleGroup
        type='single'
        value={selectedSubjectId?.toString() ?? ''}
        onValueChange={v => setSelectedSubjectId(v ? parseInt(v) : null)}
        variant='outline'
        className='flex-wrap justify-start gap-2 mb-6'
      >
        {subjectsWithEvals.map(subject => (
          <ToggleGroupItem key={subject.id} value={subject.id.toString()} className='h-8 text-sm'>
            {subject.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Lesson table — shows ALL lessons for the selected subject */}
      {selectedSubject && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Leçon</TableHead>
              <TableHead>Évaluation</TableHead>
              <TableHead>Soumis par</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedSubject.lessons.map(lesson => (
              <TableRow key={lesson.id}>
                <TableCell className='font-medium text-zinc-700'>{lesson.label}</TableCell>
                <TableCell>
                  {lesson.eval ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${LESSON_EVAL_STYLES[lesson.eval.evaluation]}`}>
                      {LESSON_EVAL_LABELS[lesson.eval.evaluation]}
                    </span>
                  ) : (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-zinc-100 text-zinc-400 border-zinc-200'>
                      Pas encore évalué
                    </span>
                  )}
                </TableCell>
                <TableCell className='text-sm text-zinc-500'>
                  {lesson.eval
                    ? `${lesson.eval.submittedBy.firstName} ${lesson.eval.submittedBy.lastName}`
                    : '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
```

---

### Sub-task 1-1-E — Wire into student page

```tsx
// src/routes/student/student-page.tsx
import LessonEvalCard, { LessonEvalCardSkeleton } from './cards/lesson-eval-card'

<ErrorBoundary fallback={<SectionError title='Évaluations' />}>
  <Suspense fallback={<LessonEvalCardSkeleton />}>
    <LessonEvalCard userId={user.id} />
  </Suspense>
</ErrorBoundary>
```

---

## 1-2 Student Page — QCM Section

**Goal:** Students have one QCM per bilan (auto-generated on submission). The student page shows pending QCMs. Clicking one launches a game-like session with sounds, animations, streak system, and progress saved to localStorage per `bilanId`.

### Status: ⬜ Not started

---

### Sub-task 1-2-A — DB migration: add `bilanId` to `Qcm`

```prisma
model Qcm {
  // ... existing fields ...
  bilanId   Int?    @unique
  bilan     Bilan?  @relation(fields: [bilanId], references: [id], onDelete: SetNull)
  score     Int?
}

// Add back-relation on Bilan:
model Bilan {
  // ... existing fields ...
  qcm Qcm?
}
```

```bash
npx prisma migrate dev --name add-bilan-id-to-qcm
```

---

### Sub-task 1-2-B — QCM bank generation script

Uses Claude API first, then switches through 5 free alternatives on quota exhaustion.

```typescript
// prisma/seed.qcm.ts
import 'dotenv/config'
import Anthropic              from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq                   from 'groq-sdk'
import { PrismaClient }       from '../src/generated/prisma/index.js'

const prisma    = new PrismaClient()

// Provider clients — only initialised if API key is present
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null
const gemini    = process.env.GEMINI_API_KEY    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)        : null
const groq      = process.env.GROQ_API_KEY      ? new Groq({ apiKey: process.env.GROQ_API_KEY })           : null
// Add Cerebras, Mistral, Cohere keys here if available

const CONFIG = {
  questionsPerDifficulty: 5,
  delayBetweenCalls:      1500,
  maxRetries:             3,
  model: {
    anthropic: 'claude-haiku-4-5',
    gemini:    'gemini-2.0-flash',
    groq:      'llama-3.3-70b-versatile',
  },
}

const DIFFICULTIES = ['e', 'm', 'h'] as const

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
const exhausted = { anthropic: false, gemini: false, groq: false }

async function callBestAvailableProvider(prompt: string, count: number): Promise<any[]> {
  // 1. Claude (highest quality)
  if (anthropic && !exhausted.anthropic) {
    try {
      const msg    = await anthropic.messages.create({ model: CONFIG.model.anthropic, max_tokens: 4096, messages: [{ role: 'user', content: prompt }] })
      const text   = msg.content.find(b => b.type === 'text')?.text ?? ''
      const parsed = JSON.parse(stripFences(text))
      if (parsed.questions?.length === count) return parsed.questions
    } catch (e) {
      if (String(e).includes('529') || String(e).toLowerCase().includes('credit')) { exhausted.anthropic = true; console.log('⚠ Claude credits exhausted → switching') }
      else throw e
    }
  }
  // 2. Gemini Flash
  if (gemini && !exhausted.gemini) {
    try {
      const model  = gemini.getGenerativeModel({ model: CONFIG.model.gemini })
      const result = await model.generateContent(prompt)
      const parsed = JSON.parse(stripFences(result.response.text()))
      if (parsed.questions?.length === count) return parsed.questions
    } catch (e) {
      if (String(e).includes('429') || String(e).toLowerCase().includes('quota')) { exhausted.gemini = true; console.log('⚠ Gemini quota → switching') }
      else throw e
    }
  }
  // 3. Groq
  if (groq && !exhausted.groq) {
    try {
      const completion = await groq.chat.completions.create({ model: CONFIG.model.groq, messages: [{ role: 'user', content: prompt }], temperature: 0.7, max_tokens: 4096 })
      const parsed     = JSON.parse(stripFences(completion.choices[0]?.message?.content ?? ''))
      if (parsed.questions?.length === count) return parsed.questions
    } catch (e) {
      if (String(e).includes('429') || String(e).toLowerCase().includes('quota')) { exhausted.groq = true; console.log('⚠ Groq quota → switching') }
      else throw e
    }
  }
  // 4–5: Add Cerebras / Mistral / Cohere here following same pattern
  throw new Error('All providers exhausted for today. Re-run tomorrow.')
}

async function main() {
  const lessons = await prisma.lesson.findMany({
    select: { id: true, label: true, subject: { select: { label: true } }, level: { select: { label: true } } },
    orderBy: { id: 'asc' },
  })

  console.log(`\n🤖 Generating QCM for ${lessons.length} lessons\n`)
  let created = 0; const errors: string[] = []

  for (let i = 0; i < lessons.length; i++) {
    const lesson  = lessons[i]!
    const existing = await prisma.qcmBankQuestion.count({ where: { lessonId: lesson.id } })
    if (existing >= CONFIG.questionsPerDifficulty * 3) { console.log(`[${i+1}/${lessons.length}] ⏭ ${lesson.label}`); continue }

    console.log(`[${i+1}/${lessons.length}] ${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`)

    for (const difficulty of DIFFICULTIES) {
      await new Promise(r => setTimeout(r, CONFIG.delayBetweenCalls))
      try {
        const prompt    = buildPrompt(lesson.label, lesson.subject.label, lesson.level.label, difficulty, CONFIG.questionsPerDifficulty)
        const questions = await callBestAvailableProvider(prompt, CONFIG.questionsPerDifficulty)
        const { count } = await prisma.qcmBankQuestion.createMany({
          data: questions.map((q: any) => ({ lessonId: lesson.id, question: q.question, difficulty, answerA: q.answerA, answerB: q.answerB, answerC: q.answerC, answerD: q.answerD, correctAnswer: q.correctAnswer, explanation: q.explanation })),
          skipDuplicates: true,
        })
        created += count; console.log(`      ✓ ${difficulty.toUpperCase()} — ${count} questions`)
      } catch (e) {
        errors.push(`${lesson.label} (${difficulty}): ${String(e).slice(0, 80)}`)
        if (String(e).includes('All providers')) break
      }
    }
    if (Object.values(exhausted).every(Boolean)) break
  }

  console.log(`\n✅ Done — ${created} questions created, ${errors.length} errors`)
  if (errors.length) errors.forEach(e => console.log(`  ✗ ${e}`))
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
```

**`package.json`:**
```json
"generate-qcm": "tsx prisma/seed.qcm.ts",
"clear-qcm":    "tsx prisma/seed.qcm.ts --clear"
```

---

### Sub-task 1-2-C — QCM auto-generation on bilan submission (already written)

```typescript
// src/utils/qcm.utils.ts
export async function generateQcmForBilan(bilanId: number, studentId: number, lessonId: number) {
  const existing = await prisma.qcm.findUnique({ where: { bilanId }, select: { id: true } })
  if (existing) return existing

  const bankQuestions = await prisma.qcmBankQuestion.findMany({ where: { lessonId }, select: { id: true, difficulty: true } })
  if (bankQuestions.length === 0) return null

  const grouped  = { e: bankQuestions.filter(q => q.difficulty === 'e'), m: bankQuestions.filter(q => q.difficulty === 'm'), h: bankQuestions.filter(q => q.difficulty === 'h') }
  const selected = [...shuffle(grouped.e).slice(0, 2), ...shuffle(grouped.m).slice(0, 2), ...shuffle(grouped.h).slice(0, 1)]
  if (selected.length === 0) return null

  return prisma.qcm.create({
    data: { studentId, lessonId, bilanId, qcmQuestions: { create: selected.map(q => ({ bankQuestionId: q.id })) } },
    select: { id: true },
  })
}

// In your bilan handler, after bilan.create():
if (bilan.presence && bilan.lessonId) {
  void generateQcmForBilan(bilan.id, bilan.studentId, bilan.lessonId)
    .catch(err => console.error('[generateQcmForBilan] failed:', err))
}
```

---

### Sub-task 1-2-D — Backend: fetch student QCMs endpoint

> **To build.** Returns all QCMs for the student with their questions and lesson info. Query: `prisma.qcm.findMany({ where: { studentId }, include: { lesson, bilan, qcmQuestions: { include: { bankQuestion } } } })`.

---

### Sub-task 1-2-E — Progress persistence hook (already written)

```typescript
// src/hooks/use-qcm-progress.ts
function storageKey(studentId: number, bilanId: number): string {
  return `qcm:${studentId}:${bilanId}`
}

export function useQcmProgress(studentId: number, bilanId: number) {
  const EXPIRY_MS = 24 * 60 * 60 * 1000

  const load = useCallback((): QcmProgress | null => {
    try {
      const raw = localStorage.getItem(storageKey(studentId, bilanId))
      if (!raw) return null
      const progress: QcmProgress = JSON.parse(raw)
      if (Date.now() - progress.savedAt > EXPIRY_MS) {
        localStorage.removeItem(storageKey(studentId, bilanId))
        return null
      }
      return progress
    } catch { return null }
  }, [studentId, bilanId])

  const save = useCallback((partial: Pick<QcmProgress, 'questionIndex' | 'answers' | 'score' | 'streak'>) => {
    try {
      localStorage.setItem(storageKey(studentId, bilanId), JSON.stringify({ ...partial, bilanId, studentId, savedAt: Date.now() }))
    } catch {}
  }, [studentId, bilanId])

  const clear = useCallback(() => {
    try { localStorage.removeItem(storageKey(studentId, bilanId)) } catch {}
  }, [studentId, bilanId])

  return { load, save, clear }
}
```

---

### Sub-task 1-2-F — Sounds hook (already written)

```typescript
// src/hooks/use-qcm-sounds.ts
export function useQcmSounds() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback((): AudioContext | null => {
    try {
      if (!ctxRef.current) ctxRef.current = new AudioContext()
      if (ctxRef.current.state === 'suspended') void ctxRef.current.resume()
      return ctxRef.current
    } catch { return null }
  }, [])

  const tone = useCallback((ac: AudioContext, freq: number, start: number, duration: number, volume = 0.22, type: OscillatorType = 'sine') => {
    const osc = ac.createOscillator(); const gain = ac.createGain()
    osc.connect(gain); gain.connect(ac.destination)
    osc.type = type; osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(volume, start + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
    osc.start(start); osc.stop(start + duration + 0.05)
  }, [])

  const playCorrect    = useCallback(() => { try { const ac = getCtx(); if (!ac) return; const t = ac.currentTime; tone(ac, 523.25, t, 0.12); tone(ac, 659.25, t+0.10, 0.12); tone(ac, 783.99, t+0.20, 0.22, 0.28) } catch {} }, [getCtx, tone])
  const playWrong      = useCallback(() => { try { const ac = getCtx(); if (!ac) return; const t = ac.currentTime; tone(ac, 220, t, 0.14, 0.22, 'sawtooth'); tone(ac, 165, t+0.12, 0.18, 0.18, 'sawtooth') } catch {} }, [getCtx, tone])
  const playTransition = useCallback(() => { try { const ac = getCtx(); if (!ac) return; tone(ac, 880, ac.currentTime, 0.06, 0.08) } catch {} }, [getCtx, tone])
  const playComplete   = useCallback(() => { try { const ac = getCtx(); if (!ac) return; const t = ac.currentTime; [523,659,784,659,784,1047].forEach((f,i) => tone(ac, f, t+i*0.14, i===5?0.7:0.14, 0.24)) } catch {} }, [getCtx, tone])
  const playStreak     = useCallback((level: number) => { try { const ac = getCtx(); if (!ac) return; const t = ac.currentTime; [523,659,784,1047].slice(0, Math.min(level,4)).forEach((f,i) => tone(ac,f,t+i*0.08,0.10,0.18)) } catch {} }, [getCtx, tone])

  return { playCorrect, playWrong, playTransition, playStreak, playComplete }
}
```

---

### Sub-task 1-2-G — `tailwind.config.ts` animations (already written)

```typescript
keyframes: {
  'slide-out-left': { '0%': { transform: 'translateX(0)', opacity: '1' }, '100%': { transform: 'translateX(-64px)', opacity: '0' } },
  'slide-in-right': { '0%': { transform: 'translateX(64px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
  shake:   { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-6px)' }, '40%': { transform: 'translateX(6px)' }, '60%': { transform: 'translateX(-4px)' }, '80%': { transform: 'translateX(4px)' } },
  'pop-in': { '0%': { transform: 'scale(0.5)', opacity: '0' }, '70%': { transform: 'scale(1.2)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
},
animation: {
  'slide-out-left': 'slide-out-left 250ms ease-in  forwards',
  'slide-in-right': 'slide-in-right 250ms ease-out forwards',
  shake:            'shake 400ms ease-in-out',
  'pop-in':         'pop-in 300ms cubic-bezier(0.34,1.56,0.64,1)',
},
```

---

### Sub-task 1-2-H — Full `QcmSession` component (already written)

The complete game component with sounds, animations, resume prompt, results screen, and per-difficulty scoring is written in full in the conversation. Key architectural points:

- **Two-index animation pattern:** `questionIndex` advances immediately; `displayedIndex` lags by one 260ms exit animation
- **State machine phase:** `'resume-prompt' | 'answering' | 'feedback' | 'complete'`
- **Progress saved after every answer**, cleared on completion
- **Streak multiplier:** ×1 (streak < 3), ×1.5 (streak 3–4), ×2 (streak 5+)
- **Wrong answer:** button shakes via `animate-shake`
- **Results:** collapsible `<details>` per question with explanation

> Copy full implementation from the conversation section: **"I want to add small sound effects..."**

---

### Sub-task 1-2-I — Wire QCM section into student page

> **To build.** Show a list of pending QCMs (not yet completed), each as a card with lesson name + date. Clicking one launches `QcmSession`. Completed QCMs show score.

---

## 1-3 Student Page — Lesson Summaries & Exercises

**Goal:** AI-generated lesson summaries and guided exercises, downloadable as PDF. Content is fetched for the most recently studied lesson (from the student's most recent bilan).

### Status: ⬜ Not started

---

### Sub-task 1-3-A — DB migration: `LessonContent` table (already in schema)

```prisma
model LessonContent {
  id        Int               @id @default(autoincrement())
  lessonId  Int
  lesson    Lesson            @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  type      LessonContentType
  content   String            // JSON string
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt
  @@unique([lessonId, type])
  @@index([lessonId])
}

enum LessonContentType { SUMMARY, EXERCISES }
```

---

### Sub-task 1-3-B — Content generation script (already written)

```typescript
// prisma/seed.content.ts — key prompt builders

function summaryPrompt(lesson: string, subject: string, level: string): string {
  return `Tu es un professeur de ${subject} niveau ${level} (programme Éducation Nationale).
Crée une fiche de révision complète pour : "${lesson}"
Réponds UNIQUEMENT avec du JSON valide, sans backticks.
Format : {
  "intro": "...",
  "sections": [{ "title": "...", "content": "...", "keyPoints": ["..."] }],
  "formulas": [{ "label": "...", "formula": "..." }],
  "vocabulary": [{ "term": "...", "definition": "..." }],
  "toRemember": ["..."]
}`
}

function exercisesPrompt(lesson: string, subject: string, level: string): string {
  return `Tu es un professeur de ${subject} niveau ${level}.
Crée 4 exercices progressifs pour : "${lesson}" (1 facile, 2 moyens, 1 difficile).
Réponds UNIQUEMENT avec du JSON valide, sans backticks.
Format : {
  "exercises": [{
    "number": 1, "difficulty": "easy",
    "question": "...", "hint": "...",
    "solution": { "steps": ["..."], "answer": "..." }
  }]
}`
}
```

**`package.json`:**
```json
"generate-content":   "tsx prisma/seed.content.ts",
"generate-summaries": "tsx prisma/seed.content.ts --summaries",
"generate-exercises": "tsx prisma/seed.content.ts --exercises",
"clear-content":      "tsx prisma/seed.content.ts --clear"
```

---

### Sub-task 1-3-C — Backend: fetch lesson content endpoint (already written)

```typescript
// Route: GET /api/student/lessons/:lessonId/content
export async function lessonContentHandler(req, res, next) {
  try {
    const lessonId = parseInt(req.params.lessonId)
    const contents = await prisma.lessonContent.findMany({
      where:  { lessonId },
      select: { type: true, content: true, updatedAt: true },
    })
    const result = Object.fromEntries(
      contents.map(c => [c.type.toLowerCase(), { data: JSON.parse(c.content), updatedAt: c.updatedAt }])
    )
    return sendSuccess(res, { data: result })
  } catch (error) { next(error) }
}
```

---

### Sub-task 1-3-D — Backend: fetch most recent lesson for student

> **To build.** Query the student's most recent bilan where `presence = true` and `lessonId` is not null. Return the lesson with its `lessonContent`.

```typescript
// src/controllers/student/recentLesson.controller.ts  — TO BUILD
// Query pattern:
const recentBilan = await prisma.bilan.findFirst({
  where:   { studentId, presence: true, lessonId: { not: null } },
  orderBy: { seance: { date: 'desc' } },
  select: {
    lesson: {
      select: {
        id: true, label: true,
        subject: { select: { id: true, label: true } },
        level:   { select: { id: true, label: true } },
        lessonContents: { select: { type: true, content: true } },
      },
    },
  },
})
```

---

### Sub-task 1-3-E — PDF components (already written)

`SummaryDocument` and `ExercisesDocument` using `@react-pdf/renderer` are fully implemented. Key notes:
- Uses `StyleSheet.create()` — numeric values only, no CSS units
- Accent bar, section headers, formula boxes, vocabulary table, "à retenir" callout
- `pdf(doc).toBlob()` → `URL.createObjectURL` → programmatic `<a>` click

> Copy full implementation from the conversation section: **"Feature — PDF Documents"**

---

### Sub-task 1-3-F — `DownloadButton` component (already written)

```typescript
// src/routes/student/documents/download-button.tsx
const handleDownload = async () => {
  if (!content || isGenerating) return
  setIsGenerating(true)
  try {
    const doc  = type === 'SUMMARY' ? <SummaryDocument ... /> : <ExercisesDocument ... />
    const blob = await pdf(doc).toBlob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch (err) { console.error('PDF generation failed:', err) }
  finally { setIsGenerating(false) }
}
```

---

### Sub-task 1-3-G — Wire into student page

> **To build.** A "Dernière leçon étudiée" card that shows the most recent lesson with two download buttons (fiche + exercices) and a skeleton variant.

---

## 2 Association Page — Statistics Dashboard

**Goal:** Association members see program statistics filtered by scolar year (current year by default): animator activity, student presence rates, QCM completion, profile visits, and all commentary submitted by animators. All grouped by scolar year.

### Status: ⬜ Not started

---

### Sub-task 2-A — Backend: extend stats controller

The `associationStatsHandler` is already partially implemented (animator seance counts, presence rates, visit stats). Extend it to add:

**QCM completion per student:**
```typescript
// Add to the parallel Promise.all in associationStatsHandler:
prisma.qcm.findMany({
  where: { student: { class: { associationId } } },
  select: { studentId: true, completed: true, score: true, createdAt: true },
})
// Then group: Map<studentId, { total, completed, avgScore }>
```

**All animators' comments (see task 4):**
> Requires `AnimatorComment` model — implement task 4-A first.

---

### Sub-task 2-B — Response type extension

```typescript
export type StudentStats = {
  student:    { id: number; firstName: string; lastName: string }
  presence:   { presences: number; absences: number; total: number; presencePercentage: number }
  visits:     { count: number; lastVisit: Date | null }
  qcm:        { total: number; completed: number; avgScore: number | null }
}

export type AssociationStatsResponse = {
  scolarYears: {
    id:        number
    label:     string
    animators: AnimatorStatEntry[]
    students:  StudentStats[]
    comments:  AnimatorComment[]
  }[]
}
```

---

### Sub-task 2-C — Frontend: scolar year selector + stat tables

> **To build.** Three tables using shadcn `Table`:
> - **Animators:** name | séances | bilans soumis
> - **Students:** name | présences | absences | % | QCM complétés | dernière visite
> - **Comments:** date | animateur | contenu (sorted by contract then date)
>
> Default to current scolar year. `Select` dropdown to switch years.

---

### Sub-task 2-D — Frontend: stat cards

> **To build.** Summary cards at the top: total séances, average presence rate, total QCM completed, total profile visits — all recalculated when year changes.

---

## 3 Home Page Redesign + Login Page

**Goal:** Replace current home page with a GSAP-animated marketing/information page. Move login form to `/login`. Sections: Hero, About, How It Works, Mission, Footer.

### Status: ⬜ Not started

---

### Sub-task 3-A — Install GSAP

```bash
npm install gsap
npm install --save-dev @types/gsap
```

---

### Sub-task 3-B — Move login to `/login`

- Create `src/routes/login/login-page.tsx` with the existing login form
- Update router: `path: '/login'` → `<LoginPage />`
- Remove login form from home page
- Update all redirects in loaders: `redirect('/login')`

---

### Sub-task 3-C — Home page sections

> **To build.** Five sections with GSAP `ScrollTrigger` animations:

```typescript
// Install pattern for ScrollTrigger
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Fade-in-up on scroll — reusable pattern
useEffect(() => {
  gsap.fromTo('.animate-section', 
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
      scrollTrigger: { trigger: '.animate-section', start: 'top 80%' } }
  )
  return () => ScrollTrigger.getAll().forEach(t => t.kill())
}, [])
```

**Sections to build:**
1. **Hero** — title, subtitle, CTA "Accéder à mon espace" → `/login`, animated gradient background
2. **About** — what is CLAS, who it is for, fade-in cards
3. **How It Works** — 3-step horizontal timeline with icons
4. **Mission** — quote/impact statement, counter animations (number of students, séances, etc.)
5. **Footer** — association name, links, credits

---

## 4 Animator Page — Association Comments

**Goal:** Animators can submit textual comments addressed to association members (e.g. "3 students struggling this month", "need more exercises for lesson X"). Comments are organised by contract (class + scolar year). Association members see these on their dashboard.

### Status: ⬜ Not started

---

### Sub-task 4-A — DB migration: `AnimatorComment` model

```prisma
model AnimatorComment {
  id         Int              @id @default(autoincrement())
  contractId Int
  contract   AnimatorContract @relation(fields: [contractId], references: [id], onDelete: Cascade)
  content    String
  createdAt  DateTime         @default(now())
  updatedAt  DateTime         @updatedAt
  @@index([contractId])
}

// Add back-relation on AnimatorContract:
model AnimatorContract {
  // ... existing fields ...
  comments AnimatorComment[]
}
```

```bash
npx prisma migrate dev --name add-animator-comments
```

---

### Sub-task 4-B — Backend: submit comment endpoint

```typescript
// POST /api/animator/comment
// Validates: contractId belongs to this animator, content not empty
const commentSchema = z.object({
  contractId: z.number().int().positive(),
  content:    z.string().min(1).max(2000),
})

export async function submitCommentHandler(req, res, next) {
  try {
    const parsed = commentSchema.safeParse(req.body)
    if (!parsed.success) throw ApiError.badRequest('Invalid input')
    const { contractId, content } = parsed.data

    // Verify this contract belongs to the authenticated animator
    const contract = await prisma.animatorContract.findFirst({
      where: { id: contractId, animatorId: req.user!.id },
      select: { id: true },
    })
    if (!contract) throw ApiError.forbidden('Contract not found or unauthorized')

    const comment = await prisma.animatorComment.create({
      data: { contractId, content },
      select: { id: true, content: true, createdAt: true, contractId: true },
    })
    return sendSuccess(res, { data: comment })
  } catch (error) { next(error) }
}
```

---

### Sub-task 4-C — Backend: fetch comments for animator

```typescript
// GET /api/animator/comments
// Returns all comments for this animator's contracts, grouped by contract
export async function fetchCommentsHandler(req, res, next) {
  try {
    const animatorId = req.user!.id
    const contracts  = await prisma.animatorContract.findMany({
      where: { animatorId },
      select: {
        id: true,
        class:      { select: { id: true, label: true } },
        scolarYear: { select: { id: true, label: true } },
        comments: {
          orderBy: { createdAt: 'desc' },
          select:  { id: true, content: true, createdAt: true },
        },
      },
      orderBy: { scolarYear: { label: 'desc' } },
    })
    return sendSuccess(res, { data: contracts })
  } catch (error) { next(error) }
}
```

---

### Sub-task 4-D — Frontend: comment form + comment list

> **To build.** In the animator dashboard, a new section:
> - Contract selector (ToggleGroup by class+year)
> - `Textarea` + submit button (React Hook Form + Zod)
> - List of submitted comments for the selected contract, sorted newest first
> - Each comment shows content + date + delete button

---

## 5 GitHub Action — Keep Render Alive

**Goal:** Ping the Render backend every 10 minutes to prevent the free-tier 15-minute sleep.

### Status: ⬜ Not started (code is ready to deploy)

---

### Sub-task 5-A — Health endpoint (already written, verify it exists)

```typescript
// src/routes/api.routes.ts
router.get('/health', (req, res) => {
  res.status(200).json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    uptime:    Math.floor(process.uptime()),
  })
})
```

---

### Sub-task 5-B — Create the workflow file

Create this file at `.github/workflows/keep-alive.yml` in your repository:

```yaml
name: Keep Render Server Alive

on:
  schedule:
    # Every 10 minutes, 24/7 — GitHub Actions runs on GitHub's infra, never sleeps
    - cron: '*/10 * * * *'
  workflow_dispatch:    # allows manual trigger from GitHub UI

jobs:
  ping:
    name: Ping Render backend
    runs-on: ubuntu-latest
    timeout-minutes: 1

    steps:
      - name: Send health check request
        run: |
          echo "Pinging server at $(date -u)"

          HTTP_STATUS=$(curl \
            -f -s -S \
            -o /dev/null \
            -w "%{http_code}" \
            --max-time 30 \
            --retry 2 \
            --retry-delay 5 \
            "${{ secrets.RENDER_HEALTH_URL }}")

          echo "Response status: $HTTP_STATUS"

          if [ "$HTTP_STATUS" = "200" ]; then
            echo "✅ Server is awake and healthy"
          else
            echo "❌ Unexpected status: $HTTP_STATUS"
            exit 1
          fi
```

---

### Sub-task 5-C — Add GitHub secret

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `RENDER_HEALTH_URL`
4. Value: `https://your-service-name.onrender.com/api/health`
5. Save

---

### Sub-task 5-D — Verify it works

1. Commit and push `.github/workflows/keep-alive.yml`
2. Go to GitHub repo → **Actions** tab
3. Click **"Keep Render Server Alive"** → **"Run workflow"** → **"Run workflow"**
4. Job should complete green within 30 seconds
5. Check that `https://your-service-name.onrender.com/api/health` returns `200`

> **Note on Render's policy:** Render has been known to detect and ignore pings from monitoring services. GitHub Actions requests look like regular browser traffic so they are less likely to be blocked. If Render still sleeps despite pings, upgrade to Render Starter ($7/month) which removes sleep entirely, or migrate to Railway Hobby ($5/month) or Fly.io (~$2/month).

---

## Implementation Order Summary

```
5    → GitHub Action (15 min, ship it now, independent)
1-2A → QCM DB migration
1-2B → Run QCM generation script
1-2C → Auto-generate QCM on bilan submit
1-2D → QCM fetch endpoint
1-2H → QcmSession component
1-2I → Wire QCM into student page
1-1A → Lesson eval endpoint (done)
1-1B–E → Lesson eval card + wire in
1-3A → LessonContent DB (done)
1-3B → Run content generation script
1-3C–D → Content fetch endpoints
1-3E–G → PDF components + download button + wire in
4-A  → AnimatorComment DB migration
4-B–C → Comment endpoints
4-D  → Comment UI in animator page
2-A–D → Association stats page
3-A–C → Home page redesign + login page
```
