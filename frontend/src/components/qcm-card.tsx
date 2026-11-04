import { useEffect, useState, type ReactNode } from 'react'
import {
  CheckCircle2Icon, LightbulbIcon, MessageCircleQuestionIcon, RotateCcwIcon,
  SmileIcon, SparklesIcon, SproutIcon, ThumbsUpIcon, TrendingUpIcon, TrophyIcon, type LucideIcon,
} from 'lucide-react'
import type { QcmEntry } from '@/api/student/apiCalls'
import { BrandButton } from '@/components/brand-button'
import { cn } from '@/lib/utils'
import { levelFor, type ScoreLevel } from '@/lib/skill-eval-score-level'  // ← adjust path
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'
import { qcmFeedback } from '@/lib/qcm-commentary'
import QcmResultsQuestionnaire from '@/pages/qcm-results-questionnaire'
import QcmQuestionnaire from '@/pages/qcm-questionnaire'

const LEVEL_ICON: Record<ScoreLevel['id'], LucideIcon> = {
  excellent: SparklesIcon, great: ThumbsUpIcon, good: SmileIcon, progress: TrendingUpIcon, building: SproutIcon,
}

function useCountUp(target: number, duration = 900) {
    const reduce = usePrefersReducedMotion()
    const [value, setValue] = useState(reduce ? target : 0)

    useEffect(() => {
    if (reduce) {
        const raf = requestAnimationFrame(() => setValue(target))
        return () => cancelAnimationFrame(raf)
    }

    let raf = 0
    const start = performance.now()
    
    const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3)))) // ease-out cubic
        if (t < 1) {
        raf = requestAnimationFrame(tick)
        }
    }
    
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    }, [target, duration, reduce])

    return value
}

// ── The ring: one arc per question ───────────────────────────────────────────

const R = 44
const STROKE = 9

function QcmRing({ flags, level, done, label, children }: {
  flags: boolean[]; level: ScoreLevel; done: boolean; label: string; children: ReactNode
}) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const n    = flags.length
  const len  = n > 0 ? 100 / n : 100
  const gap  = n > 1 ? Math.min(2.6, len * 0.35) : 0
  const dash = len - gap
  const seg  = (i: number) => ({ strokeDasharray: `${dash} ${100 - dash}`, strokeDashoffset: -(i * len + gap / 2) })

  return (
    <div role='img' aria-label={label} className='relative size-40'>
      <svg viewBox='0 0 100 100' fill='none' className='size-full -rotate-90' aria-hidden>
        {n === 0 ? (
          <circle cx='50' cy='50' r={R} strokeWidth={STROKE} className='stroke-slate-200' />
        ) : flags.map((ok, i) => (
          <g key={i}>
            <circle
              cx='50' cy='50' r={R} pathLength={100} strokeWidth={STROKE}
              className={done ? 'stroke-slate-200' : 'animate-pulse stroke-violet-200 motion-reduce:animate-none'}
              style={{ ...seg(i), animationDelay: `${i * 120}ms` }}
            />
            {done && (
              <circle
                cx='50' cy='50' r={R} pathLength={100} strokeWidth={STROKE}
                className={cn(
                  'transition-opacity duration-500 motion-reduce:transition-none',
                  ok ? cn('stroke-current', level.ring) : 'stroke-amber-300',
                  on ? 'opacity-100' : 'opacity-0',
                )}
                style={{ ...seg(i), transitionDelay: `${i * 90}ms` }}
              />
            )}
          </g>
        ))}
      </svg>
      <div className='absolute inset-0 grid place-items-center'>{children}</div>
    </div>
  )
}

// ── Parts ────────────────────────────────────────────────────────────────────

function Header({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: ReactNode }) {
  return (
    <div className='flex items-start justify-between gap-3'>
      <div className='flex min-w-0 items-center gap-3'>
        <span className='grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600'>
          <MessageCircleQuestionIcon className='size-5' aria-hidden />
        </span>
        <div className='min-w-0'>
          <h3 className='text-base font-extrabold leading-tight tracking-tight text-slate-900'>{title}</h3>
          {subtitle && <p className='truncate text-xs text-slate-500'>{subtitle}</p>}
        </div>
      </div>
      {badge}
    </div>
  )
}

const pillBase = 'inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold'

function StatTile({ icon: Icon, value, label, tone }: { icon: LucideIcon; value: number; label: string; tone: string }) {
  return (
    <div className={cn('flex items-center justify-between gap-3 rounded-2xl border px-4 py-1', tone)}>
      <Icon className='size-5 shrink-0' aria-hidden />
      <p className='leading-tight flex gap-2 items-center'>
        <span className='text-xl font-extrabold tabular-nums text-slate-900'>{value}</span>
        <span className='text-xs font-medium text-slate-600'>{label}</span>
      </p>
    </div>
  )
}

function QcmDone({ qcm }: { qcm: QcmEntry }) {
  const total   = qcm.qcmQuestions.length
  const score   = Math.min(total, Math.max(0, qcm.score ?? 0))
  const missed  = total - score
  const ratio   = total > 0 ? score / total : 0
  const perfect = total > 0 && score === total
  const level   = levelFor(ratio)
  const LevelIcon = perfect ? TrophyIcon : LEVEL_ICON[level.id]
  const fb      = qcmFeedback({ score, total, perfect, level: level.id, seed: qcm.id })
  const shown   = useCountUp(score)

  // One flag per question: use the real result when the entry carries it, else fill the first `score` arcs
  const flags = qcm.qcmQuestions.map((q, i) => {
    const c = (q as { correct?: unknown }).correct
    return typeof c === 'boolean' ? c : i < score
  })

  return (
    <>
      <div className='flex flex-col items-center pb-3'>
        <div className='relative'>
          <QcmRing flags={flags} level={level} done label={`${score} bonnes réponses sur ${total} : ${level.label}`}>
            <span className='flex flex-col items-center leading-none'>
              <span className='text-4xl font-extrabold tabular-nums tracking-tight text-slate-900'>
                {shown}<span className='text-lg font-bold text-slate-300'>/{total}</span>
              </span>
              <span className='mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500'>bonnes réponses</span>
            </span>
          </QcmRing>

          <span className={cn(pillBase, 'absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-sm', level.soft, level.text)}>
            <LevelIcon className='size-3.5' aria-hidden /> {perfect ? 'Sans-faute' : level.label}
          </span>

          {perfect && (
            <>
              <SparklesIcon aria-hidden className='absolute -right-3 top-1 size-5 animate-pulse text-amber-400 motion-reduce:animate-none' />
              <SparklesIcon aria-hidden className='absolute -left-4 top-10 size-4 animate-pulse text-emerald-400 [animation-delay:400ms] motion-reduce:animate-none' />
              <SparklesIcon aria-hidden className='absolute -right-1 bottom-8 size-3.5 animate-pulse text-sky-400 [animation-delay:800ms] motion-reduce:animate-none' />
            </>
          )}
        </div>
      </div>

      <div className='text-center'>
        <h4 className='text-lg font-extrabold tracking-tight text-slate-900'>{fb.headline}</h4>
        <p className='mx-auto mt-2 max-w-xs text-balance text-sm leading-relaxed text-slate-600'>{fb.message}</p>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <StatTile icon={CheckCircle2Icon} value={score}  label='réussies'  tone='border-emerald-200 bg-emerald-50/70 text-emerald-600' />
        <StatTile icon={RotateCcwIcon}    value={missed} label='à revoir'  tone={missed > 0 ? 'border-amber-200 bg-amber-50/70 text-amber-600' : 'border-slate-200 bg-slate-50 text-slate-400'} />
      </div>

      <div className={cn('flex gap-3 rounded-2xl border p-3 bg-zinc-800 text-white', level.hint)}>
        <LightbulbIcon className={cn('mt-0.5 size-4 shrink-0', level.hint)} aria-hidden />
        <div>
          <p className='text-xs font-bold uppercase tracking-wider'>Conseil</p>
          <p className='mt-1 text-xs leading-relaxed'>{fb.tip}</p>
        </div>
      </div>
    </>
  )
}

function QcmPending({ total }: { total: number }) {
  return (
    <>
      <div className='flex flex-col items-center pb-3'>
        <div className='relative'>
          <QcmRing flags={Array.from({ length: total }, () => false)} level={levelFor(0)} done={false} label={`QCM de ${total} questions`}>
            <span className='flex flex-col items-center leading-none'>
              <span className='text-4xl font-extrabold tabular-nums tracking-tight text-slate-900'>{total}</span>
              <span className='mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500'>questions</span>
            </span>
          </QcmRing>
          <span className={cn(pillBase, 'absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap border-violet-200 bg-violet-50 text-violet-700 shadow-sm')}>
            <MessageCircleQuestionIcon className='size-3.5' aria-hidden /> À toi de jouer
          </span>
        </div>
      </div>

      <div className='text-center'>
        <h4 className='text-lg font-extrabold tracking-tight text-slate-900'>Ton QCM t'attend</h4>
        <p className='mx-auto mt-2 max-w-xs text-balance text-sm leading-relaxed text-slate-600'>
          {total} questions pour vérifier ce que tu as retenu de la leçon. Pas de pression : chaque réponse t'aide à progresser.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-2'>
        {[`${total} questions`, 'Quelques minutes', 'Correction détaillée à la fin'].map(chip => (
          <span key={chip} className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600'>{chip}</span>
        ))}
      </div>
    </>
  )
}

function QcmNone() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center'>
      <MessageCircleQuestionIcon className='size-8 text-slate-300' aria-hidden />
      <p className='text-sm font-semibold text-slate-600'>Pas de QCM pour cette séance</p>
      <p className='max-w-56 text-balance text-xs leading-relaxed text-slate-500'>
        Aucun QCM n'a été prévu cette fois-ci. Tu peux relire la fiche de séance pour réviser.
      </p>
    </div>
  )
}

// ── The card ─────────────────────────────────────────────────────────────────

export interface QcmCardProps {
  qcm:         QcmEntry | null | undefined
  onQcmSubmit: (qcm: QcmEntry) => void
  title?:      string
  subtitle?:   string            // e.g. the lesson name, when the card is used outside a session
  framed?:     boolean           // true: draws its own border (standalone). false: embed in an existing layout
  footer?:     ReactNode         // e.g. <QcmRetryActions … />
  className?:  string
}

export function QcmCard({ qcm, onQcmSubmit, title = 'Défi QCM', subtitle, framed = true, footer, className }: QcmCardProps) {
  const badge = !qcm ? null : qcm.completed
    ? <span className={cn(pillBase, 'border-emerald-200 bg-emerald-50 text-emerald-700')}><CheckCircle2Icon className='size-3.5' aria-hidden /> Terminé</span>
    : <span className={cn(pillBase, 'border-amber-200 bg-amber-50 text-amber-700')}><span className='size-1.5 rounded-full bg-amber-500' /> À faire</span>

  return (
    <section className={cn('flex flex-col gap-6 font-outfit', framed && 'rounded-3xl border border-slate-200 bg-white p-6 shadow-xs', className)}>
      <Header title={title} subtitle={subtitle} badge={badge} />

      <div className='flex flex-1 flex-col gap-6'>
        {!qcm ? <QcmNone />
          : qcm.completed ? <QcmDone qcm={qcm} />
          : <QcmPending total={qcm.qcmQuestions.length} />}
      </div>

      {qcm && (
        <div className='flex flex-col gap-3'>
          {qcm.completed ? (
            <QcmResultsQuestionnaire qcm={qcm}>
              <BrandButton className="w-full text-sm font-bold h-12 rounded-xl">Voir les résultats</BrandButton>
            </QcmResultsQuestionnaire>
          ) : (
            <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={qcm}>
              <BrandButton className="w-full text-sm font-bold h-12 rounded-xl">Compléter le QCM</BrandButton>
            </QcmQuestionnaire>
          )}
          {footer}
        </div>
      )}
    </section>
  )
}