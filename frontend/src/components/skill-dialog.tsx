import type { ReactNode } from 'react'
import { LightbulbIcon, RouteIcon, SparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { LevelMeter } from '@/components/level-meter'
import { cn } from '@/lib/utils'
import { SKILLS, type SkillKey } from '@/lib/skills'
import { levelFor } from '@/lib/skill-eval-score-level'

type Props = {
  skill:    SkillKey
  ratio:    number
  source:   string
  children: ReactNode
}

export function SkillDialog({ skill, ratio, source, children }: Props) {
  const info  = SKILLS[skill]
  const level = levelFor(ratio)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='gap-0 overflow-hidden p-0 font-outfit sm:max-w-lg w-full'>
        <div className='h-dvh w-full overflow-y-auto'>
          <DialogHeader className={cn('flex-row items-center gap-4 space-y-0 px-6 pt-10 pb-5 text-left', info.band)}>
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
              <LevelMeter level={level} className='mt-3' />
              <p className='mt-3 text-sm text-slate-700'>{level.hint}</p>
              <p className='mt-1 text-xs text-slate-500'>D'après {source}.</p>
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