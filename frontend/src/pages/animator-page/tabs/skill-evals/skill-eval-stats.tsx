import type { SkillEvalClassEntry } from '@/api/animator/skill-evals.types'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { BookCheckIcon, CheckIcon, Users2Icon } from 'lucide-react'

const AnimSkillEvalStats = ({classes} : {classes : SkillEvalClassEntry[]}) => {
    const totalStudents = classes.reduce((acc, current) => acc + current.students.length, 0)
    const evalsSubmitted = classes.reduce((acc, current) => acc + current.students.filter(s => s.skillEval !== null && s.skillEval !== undefined).length, 0)
    const evalsRemaining = totalStudents - evalsSubmitted;
    const evalsSubmittedRate = Math.round(100 * evalsSubmitted / totalStudents)
  return (
    <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des évaluations de méthodologie</h3>
        <div className={cn(`rounded-xl w-full p-6 font-outfit shadow-card bg-white border mt-4`)}>
                <div className='flex flex-col lg:flex-row gap-2 items-start lg:items-center justify-between'>
                    <div className='flex items-center gap-2 font-semibold text-lg lg:text-2xl'>
                        <span className='h-8 w-8 lg:h-12 lg:w-12 flex items-center justify-center bg-amber-200 rounded-full'><Users2Icon className='size-4 lg:size-6'/></span><span>{totalStudents} élèves suivis</span>
                    </div>
                    <div className='flex items-center gap-2 font-semibold text-lg lg:text-2xl'>
                        <span className='h-8 w-8 lg:h-12 lg:w-12 flex items-center justify-center bg-sky-200 rounded-full'><BookCheckIcon className='size-4 lg:size-6'/></span><span>{evalsSubmitted} évaluations soumies</span>
                    </div>
                </div>
                <Progress
                    className='mt-2'
                    value={evalsSubmittedRate}
                    />
                <div className='flex items-center gap-4 justify-between mt-2 text-xs'>
                    <span className='font-bold opacity-50'>{evalsRemaining} évaluations à faire</span>
                    {evalsSubmitted === totalStudents && <CheckIcon className='text-lime-600'/>}
                </div>
            </div>
    </div>
  )
}

export default AnimSkillEvalStats