import type { SkillsEvalEntry } from '@/api/student/apiCalls'
import { BicepsFlexedIcon, CalendarIcon, ChevronRightIcon, TrendingDownIcon, TrendingUpIcon, type LucideIcon } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { LevelMeter } from '@/components/level-meter'
import { SkillDialog } from '@/components/skill-dialog'
import { cn } from '@/lib/utils'
import { SKILL_KEYS, SKILL_MAX_SCORE, SKILLS } from '@/lib/skills'
import { levelFor } from '@/lib/skill-eval-score-level'

interface SkillsEvalCardProps {
  skillsEval: SkillsEvalEntry
}

type Comment = { title: string; text: string; icon: LucideIcon; box: string; head: string; chip: string }

const SkillsEvalCard = ({ skillsEval }: SkillsEvalCardProps) => {
  const { firstName, lastName } = skillsEval.animator
  const initials = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.toUpperCase()

  const rows = SKILL_KEYS.map(key => ({
    key,
    ratio: Math.min(1, Math.max(0, (skillsEval[key] ?? 0) / SKILL_MAX_SCORE)),
  }))

  const comments: Comment[] = [
    { title: 'Points positifs',      text: skillsEval.positive,     icon: TrendingUpIcon,   box: 'bg-emerald-50/50 border-emerald-200/60', head: 'text-emerald-800', chip: 'bg-emerald-100 text-emerald-700' },
    { title: 'À améliorer',          text: skillsEval.negative,     icon: TrendingDownIcon, box: 'bg-amber-50/60 border-amber-200/70',     head: 'text-amber-800',   chip: 'bg-amber-100 text-amber-700' },
    { title: "Axes d'amélioration",  text: skillsEval.improvements, icon: BicepsFlexedIcon, box: 'bg-sky-50/50 border-sky-200/60',         head: 'text-sky-800',     chip: 'bg-sky-100 text-sky-700' },
  ].filter(c => c.text?.trim())

  return (
    <article className='w-full space-y-5 rounded-2xl border border-slate-200/80 bg-white p-5 font-outfit shadow-2xs transition-all duration-200 hover:border-slate-300 hover:shadow-md'>
      {/* Header: animator + overall adjective */}
      <div className='flex items-center justify-between gap-3 border-b border-slate-100 pb-4'>
        <div className='flex min-w-0 items-center gap-3'>
          <div className='grid size-11 shrink-0 place-items-center rounded-xl border border-indigo-100/80 bg-indigo-50 text-sm font-bold tracking-wider text-indigo-700'>
            {initials}
          </div>
          <div className='min-w-0'>
            <h4 className='truncate text-base font-bold tracking-tight text-slate-900'>
              <span className='capitalize'>{firstName}</span> <span className='uppercase'>{lastName}</span>
            </h4>
            <span className='mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-400'>
              <CalendarIcon className='size-3.5' aria-hidden />
              Mise à jour : {skillsEval.updatedAt ? format(new Date(skillsEval.updatedAt), 'd MMMM yyyy', { locale: fr }) : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Skills: tap a row to learn more */}
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        {rows.map(({ key, ratio }) => {
          const info  = SKILLS[key]
          const level = levelFor(ratio)
          return (
            <SkillDialog key={key} skill={key} ratio={ratio} source={`l'évaluation de ${firstName}`}>
              <button
                type='button'
                className='group flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 text-left transition hover:border-slate-300 hover:bg-white hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 md:[&:last-child:nth-child(odd)]:col-span-2'
              >
                <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg', info.tile)}>
                  <info.Icon className='size-4.5' aria-hidden />
                </span>
                <span className='min-w-0 flex-1'>
                  <span className='block truncate text-sm font-semibold text-slate-700'>{info.label}</span>
                  <span className={cn('block text-sm font-extrabold leading-tight', level.text)}>{level.label}</span>
                </span>
                <LevelMeter level={level} className='w-20 shrink-0' />
                <ChevronRightIcon className='size-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500' aria-hidden />
              </button>
            </SkillDialog>
          )
        })}
      </div>

      {/* Animator's comments: only those that exist */}
      {comments.length > 0 && (
        <div className='grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]'>
          {comments.map(c => (
            <div key={c.title} className={cn('space-y-1.5 rounded-xl border p-3.5', c.box)}>
              <div className={cn('flex items-center gap-1.5 text-xs font-bold', c.head)}>
                <span className={cn('rounded-md p-1', c.chip)}><c.icon className='size-3.5' aria-hidden /></span>
                {c.title}
              </div>
              <p className='text-xs font-medium leading-relaxed text-slate-700'>{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

export default SkillsEvalCard