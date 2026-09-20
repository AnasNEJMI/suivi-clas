
import type { BilanEntry, DeleteBilanEntry, SeanceEntry } from '@/api/animator/seances.types'
import { Progress } from '@/components/ui/progress';
import { cn, getElapsedDays } from '@/lib/utils'
import { CalendarIcon, CheckIcon, ClockFadingIcon, GraduationCap, NotebookTextIcon } from 'lucide-react';
import AnimSeanceDetailsDialog from './seance-details-dialog';
import type { LessonsByLevelEntry } from '@/api/animator/types';


interface AnimSeanceCarouselCardProps{
    lessonsByLevel: LessonsByLevelEntry[],
    onBilanSubmitted:  (bilan: BilanEntry) => void,
    seance : SeanceEntry,
    group : string,
    onBilanDeleted : (bilan : DeleteBilanEntry) => void
}

const AnimSeanceCarouselCard = ({
    seance, group, lessonsByLevel, onBilanSubmitted, onBilanDeleted
} : AnimSeanceCarouselCardProps) => {
    const completedBilans = seance.studentBilans.filter(s => s.bilan !== null).length;
    const studentsCount = seance.studentBilans.length;
    const completionRate = Math.round(100 * completedBilans / studentsCount);
    return (
        <AnimSeanceDetailsDialog
            lessonsByLevel={lessonsByLevel}
            onBilanSubmitted={onBilanSubmitted}
            seance={seance}
            group = {group}
            onBilanDeleted = {onBilanDeleted}
        >
            <div className={cn(`rounded-xl w-full h-full p-4 font-outfit shadow-sm bg-white border-2 cursor-pointer`, completedBilans === studentsCount? 'border-emerald-300' : 'border-red-300')}>
                <div className='flex justify-end font-medium text-sm'>
                    <span className='px-2 rounded-full border flex items-center gap-2 bg-amber-200 border-amber-400'><CalendarIcon className='size-4'/>{getElapsedDays(seance.date)}</span>
                </div>
                <div className=' flex items-center justify-between mt-6'>
                    <div className='flex items-center gap-1'>
                        <NotebookTextIcon className='size-4'/><span>{completedBilans}/{studentsCount} bilans soumis</span>
                    </div>
                    {completedBilans === studentsCount && <CheckIcon className='text-lime-600'/>}
                </div>
                <Progress
                    className='mt-2'
                    value={completionRate}
                />
                <div className='flex items-center gap-2 opacity-75 text-sm mt-6'><GraduationCap className='size-4'/> {group}</div>
                <div className='flex items-center gap-2 opacity-75 text-sm'><ClockFadingIcon className='size-4'/> {seance.seanceDuration.label}</div>
            </div>
        </AnimSeanceDetailsDialog>
  )
}

export default AnimSeanceCarouselCard