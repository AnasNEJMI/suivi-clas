// skill-carousel-card.tsx
import { useEffect, useState } from 'react'
import { ChevronRightIcon, LightbulbIcon, RouteIcon, SparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { levelFor, type ScoreLevel } from '@/lib/skill-eval-score-level'
import { SKILLS, type SkillKey } from '@/lib/skills'

function LevelMeter({ level }: { level: ScoreLevel }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className='flex gap-1' role='img' aria-label={`Niveau : ${level.label}`}>
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} className='h-2 flex-1 overflow-hidden rounded-full bg-slate-100'>
          <span
            style={{ transitionDelay: `${i * 90}ms` }}
            className={cn(
              'block h-full origin-left rounded-full transition-transform duration-500 ease-out motion-reduce:transition-none',
              level.bar, on && i < level.segments ? 'scale-x-100' : 'scale-x-0',
            )}
          />
        </span>
      ))}
    </div>
  )
}

type Props = { skill: SkillKey; ratio: number; evaluations: number }

const SkillCarouselCard = ({ skill, ratio, evaluations }: Props) => {
  const info  = SKILLS[skill]
  const level = levelFor(ratio)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type='button'
          className='group flex h-full min-h-44 w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left font-outfit shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400'
        >
          <span className='flex items-center justify-between'>
            <span className={cn('grid size-10 place-items-center rounded-xl', info.tile)}>
              <info.Icon className='size-5' aria-hidden />
            </span>
            <ChevronRightIcon className='size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500' aria-hidden />
          </span>

          <span className='mt-4 text-sm font-semibold text-slate-500'>{info.label}</span>
          <span className={cn('mt-0.5 text-xl font-extrabold leading-tight tracking-tight', level.text)}>{level.label}</span>

          <span className='mt-auto block pt-4'><LevelMeter level={level} /></span>
        </button>
      </DialogTrigger>

      <DialogContent className='h-dvh gap-0 overflow-hidden p-0 font-outfit sm:max-w-lg w-full'>
        <div className='overflow-y-auto w-full'>
          <DialogHeader className={cn('flex-row items-center gap-4 space-y-0 px-6 py-5 text-left', info.band)}>
            <span className={cn('grid size-14 shrink-0 place-items-center rounded-2xl bg-white shadow-sm', info.tile)}>
              <info.Icon className='size-7' aria-hidden />
            </span>
            <div className='min-w-0'>
              <DialogTitle className='text-xl font-extrabold tracking-tight text-slate-900'>{info.label}</DialogTitle>
              <DialogDescription className='mt-0.5 text-sm text-slate-600'>{info.summary}</DialogDescription>
            </div>
          </DialogHeader>

          <div className='flex flex-col gap-6 px-6 py-6'>
            <section className={cn('rounded-2xl border p-4', level.soft)}>
              <p className='text-xs font-bold uppercase tracking-wider text-slate-500'>Où tu en es</p>
              <p className={cn('mt-1 text-2xl font-extrabold tracking-tight', level.text)}>{level.label}</p>
              <div className='mt-3'><LevelMeter level={level} /></div>
              <p className='mt-3 text-sm text-slate-700'>{level.hint}</p>
              <p className='mt-1 text-xs text-slate-500'>
                D'après {evaluations} évaluation{evaluations > 1 ? 's' : ''} de tes animateurs.
              </p>
            </section>

            <section>
              <h4 className='flex items-center gap-2 text-sm font-bold text-slate-900'>
                <LightbulbIcon className='size-4 text-amber-500' aria-hidden /> Pourquoi c'est important
              </h4>
              <p className='mt-2 text-sm leading-relaxed text-slate-600'>{info.why}</p>
            </section>

            <section>
              <h4 className='flex items-center gap-2 text-sm font-bold text-slate-900'>
                <RouteIcon className='size-4 text-indigo-500' aria-hidden /> Comment progresser
              </h4>
              <ol className='mt-3 flex flex-col gap-3'>
                {info.steps.map((step, i) => (
                  <li key={step} className='flex gap-3'>
                    <span className='mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white'>{i + 1}</span>
                    <span className='text-sm leading-relaxed text-slate-700'>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className='flex gap-3 rounded-2xl bg-slate-50 p-4'>
              <SparklesIcon className='mt-0.5 size-4 shrink-0 text-violet-500' aria-hidden />
              <p className='text-sm font-medium leading-relaxed text-slate-700'>{info.tip}</p>
            </div>

            <DialogClose asChild>
              <Button variant='outline' className='h-11 w-full rounded-xl font-bold'>Compris, merci !</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SkillCarouselCard