import type { SkillEvalData, SkillEvalStudentEntry } from '@/api/animator/skill-evals.types'
import { cn, getElapsedDays } from '@/lib/utils'
import { CalendarIcon, UserIcon } from 'lucide-react'
import AnimSkillEvalDetailsDialog from './skill-eval-details-dialog'

const AnimSkillEvalCarouselCard = ({student, animatorId, group, onSkillEvalUpserted} : {student : SkillEvalStudentEntry, animatorId : number, group : string, onSkillEvalUpserted : (skillEval : SkillEvalData)  => void}) => {
  return (
    <AnimSkillEvalDetailsDialog
            student={student}
            animatorId={animatorId}
            group={group}
            onSkillEvalUpserted={onSkillEvalUpserted}
        >
            <div className={cn(`rounded-xl w-full h-full p-4 font-outfit shadow-sm bg-white cursor-pointer`)}>
                <div className='flex items-center gap-2 text-base font-medium tracking-tight mt-4'><UserIcon className='size-6'/> {student.firstName} {student.lastName}</div>
                <div className='flex justify-start font-medium text-sm mt-4'>
                    {
                        student.skillEval && 
                        <span className='px-2 rounded-full border flex items-center gap-2 bg-emerald-200 border-emerald-400 tracking-tighter'><CalendarIcon className='size-4'/> Dernière mise à jour : {getElapsedDays(student.skillEval!.updatedAt)}</span>
                    }
                    {
                        !student.skillEval && 
                        <span className='px-2 rounded-full border flex items-center gap-2 bg-amber-200 border-amber-400'><CalendarIcon className='size-4'/>Aucune évalution soumise</span>
                    }
                </div>
            </div>
    </AnimSkillEvalDetailsDialog>
  )
}

export default AnimSkillEvalCarouselCard