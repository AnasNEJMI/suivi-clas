import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { GraduationCapIcon, UserIcon } from "lucide-react"
import type { LessonEvalData, StudentLessonEvalsEntry } from "@/api/animator/lesson-evals.types"
import type { LessonsByLevelEntry } from '@/api/animator/types'
import AnimLessonEvalsRecapPerSubject from './lesson-evals-recap-per-subject'

const AnimLessonEvalDetailsDialog = ({student, animatorId, group, onLessonEvalUpserted, lessonsByLevel, children} : {student : StudentLessonEvalsEntry, animatorId : number, group : string, onLessonEvalUpserted : (skillEval : LessonEvalData)  => void, children : ReactNode, lessonsByLevel : LessonsByLevelEntry[]}) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className={cn('h-dvh flex flex-col items-start w-full lg:w-[calc(100%-18rem)] lg:left-72 lg:translate-x-0 pr-0 pl-4 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl')}>
            <DialogHeader className='flex w-full gap-0'>
                <DialogTitle className='font-bold text-xl  md:text-3xl tracking-tight text-start px-2 mt-4'>Évaluation des leçons</DialogTitle>
                <DialogDescription className='text-sm text-pretty lg:text-base leading-4 text-start px-2'>
                    <span className="flex items-center gap-1 text-sm"><UserIcon className="size-4"/> <span>{student.firstName} {student.lastName}</span></span>
                    <span className="flex items-center gap-1 text-sm"><GraduationCapIcon className="size-4"/> <span>{group}</span></span>
                </DialogDescription>
            </DialogHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto  pr-4 w-full">
                <AnimLessonEvalsRecapPerSubject
                    animatorId ={animatorId}
                    student={student}
                    lessonsByLevel={lessonsByLevel}
                    onLessonEvalUpserted = {onLessonEvalUpserted}
                />
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default AnimLessonEvalDetailsDialog