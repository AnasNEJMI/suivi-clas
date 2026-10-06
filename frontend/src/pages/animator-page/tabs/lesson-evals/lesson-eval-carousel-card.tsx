import { cn } from '@/lib/utils'
import { BicepsFlexedIcon, NotebookPenIcon, StarsIcon, TrendingUpIcon, UserIcon } from 'lucide-react'
import AnimLessonEvalDetailsDialog from './lesson-eval-details-dialog'
import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'

const AnimLessonEvalCarouselCard = ({student, animatorId, group, onLessonEvalUpserted, lessonsByLevel} : {student : StudentLessonEvalsEntry, animatorId : number, group : string, onLessonEvalUpserted : (skillEval : LessonEvalData)  => void, lessonsByLevel : LessonsByLevelEntry[]}) => {
    let lessonsEvaluatedCount = 0;
    let lessonsAcquiringCount = 0;
    let lessonsAcquiredCount = 0;
    let lessonsExpertCount = 0;
    for (let k = 0; k < student.lessonEvalsBySubject.length; k++) {
        const lessonEvalsBySubject = student.lessonEvalsBySubject[k];
        lessonsEvaluatedCount += lessonEvalsBySubject.lessonEvals.filter(lessonEval => lessonEval.evaluation !== 'notAcquired').length;
        lessonsAcquiringCount += lessonEvalsBySubject.lessonEvals.filter(lessonEval => lessonEval.evaluation === 'acquiring').length;
        lessonsAcquiredCount += lessonEvalsBySubject.lessonEvals.filter(lessonEval => lessonEval.evaluation !== 'acquired').length;
        lessonsExpertCount += lessonEvalsBySubject.lessonEvals.filter(lessonEval => lessonEval.evaluation !== 'expert').length;
    }
    
    const lessonsAcquiringRate = lessonsEvaluatedCount > 0 ? Math.round(100 * lessonsAcquiringCount / lessonsEvaluatedCount) : 0;
    const lessonsAcquiredRate = lessonsEvaluatedCount > 0 ? Math.round(100 * lessonsAcquiredCount / lessonsEvaluatedCount) : 0;
    const lessonsExpertRate = lessonsEvaluatedCount > 0 ? Math.round(100 * lessonsExpertCount / lessonsEvaluatedCount) : 0;


    return (
        <AnimLessonEvalDetailsDialog
                student={student}
                animatorId={animatorId}
                group={group}
                onLessonEvalUpserted={onLessonEvalUpserted}
                lessonsByLevel = {lessonsByLevel}
            >
                <div className={cn(`rounded-xl w-full h-full p-4 font-outfit shadow-sm bg-white cursor-pointer`)}>
                    <div className='flex items-center gap-2 text-base font-medium tracking-tight mt-4'><UserIcon className='size-6'/> {student.firstName} {student.lastName}</div>
                    <div className='text-sm mt-4'>
                        <div className='rounded-full flex items-center gap-2 justify-between'><span className='flex items-center gap-1'><NotebookPenIcon className='size-4'/>Leçons évaluées</span><span className='font-bold'>{lessonsEvaluatedCount}</span></div>
                        <div className='rounded-full flex items-center gap-2 text-amber-700 justify-between'><span className='flex items-center gap-1'><TrendingUpIcon className='size-4'/>En cours d'acquisition</span><span className='font-bold'>{lessonsAcquiringRate}%</span></div>
                        <div className='rounded-full flex items-center gap-2 text-sky-700 justify-between'><span className='flex items-center gap-1'><BicepsFlexedIcon className='size-4'/>Acquises</span><span className='font-bold'>{lessonsAcquiredRate}%</span></div>
                        <div className='rounded-full flex items-center gap-2 text-emerald-700 justify-between'><span className='flex items-center gap-1'><StarsIcon className='size-4 text-emerald-700'/>Maîtrisées</span><span className='font-bold'>{lessonsExpertRate}%</span></div>
                    </div>
                </div>
        </AnimLessonEvalDetailsDialog>
  )
}

export default AnimLessonEvalCarouselCard