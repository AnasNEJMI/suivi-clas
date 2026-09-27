import type { LessonEvalClassEntry } from '@/api/animator/lesson-evals.types'
import { cn } from '@/lib/utils'
import { NotebookPenIcon, UserIcon } from 'lucide-react'

const AnimLessonEvalStats = ({classes} : {classes : LessonEvalClassEntry[]}) => {
    const totalStudents = classes.reduce((acc, current) => acc + current.students.length, 0)
    let lessonsEvaluatedCount = 0;
    for (let i = 0; i < classes.length; i++) {
        const classEntry = classes[i];
        for (let j = 0; j < classEntry.students.length; j++) {
            const studentEntry = classEntry.students[j];
            for (let k = 0; k < studentEntry.lessonEvalsBySubject.length; k++) {
                const lessonEvalsBySubject = studentEntry.lessonEvalsBySubject[k];
                lessonsEvaluatedCount += lessonEvalsBySubject.lessonEvals.length;
            }
        }
    }

  return (
    <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des évaluations de leçons</h3>
        <div className={cn(`rounded-xl w-full flex gap-2 font-outfit  mt-4`)}>
            <div className='flex-1 flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2'>
                <div className='flex items-center gap-2'>
                    <UserIcon className='text-indigo-700 size-8'/>
                    <span className='font-bold text-3xl'>{totalStudents}</span>
                </div>
                <span className='text-sm opacity-75'>Élèves suivis</span>
            </div>
            <div className='flex-1 flex flex-col items-center p-4 rounded-md shadow-md bg-white gap-2'>
                <div className='flex items-center gap-2'>
                    <NotebookPenIcon className='text-emerald-700 size-8'/>
                    <span className='font-bold text-3xl'>{lessonsEvaluatedCount}</span>
                </div>
                <span className='text-sm opacity-75'>Évaluations soumises</span>
            </div>
        </div>
    </div>
  )
}

export default AnimLessonEvalStats