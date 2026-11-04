// skill-carousel-card.tsx
import { ChevronRightIcon } from 'lucide-react'
import { LevelMeter } from '@/components/level-meter'
import { SkillDialog } from '@/components/skill-dialog'
import { cn } from '@/lib/utils'
import { SKILLS, type SkillKey } from '@/lib/skills'
import { levelFor } from '@/lib/skill-eval-score-level'

type Props = { skill: SkillKey; ratio: number; evaluations: number }

const SkillCarouselCard = ({ skill, ratio, evaluations }: Props) => {
  const info  = SKILLS[skill]
  const level = levelFor(ratio)
  const source = `${evaluations} évaluation${evaluations > 1 ? 's' : ''} de tes animateurs`

  return (
    <SkillDialog skill={skill} ratio={ratio} source={source}>
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

        <LevelMeter level={level} className='mt-auto pt-4' />
      </button>
    </SkillDialog>
  )
}

export default SkillCarouselCard