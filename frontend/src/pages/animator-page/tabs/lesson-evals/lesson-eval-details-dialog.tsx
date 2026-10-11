import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { CalendarIcon, GraduationCapIcon } from "lucide-react"
import type { LessonEvalData, StudentLessonEvalsEntry } from "@/api/animator/lesson-evals.types"
import type { LessonsByLevelEntry } from '@/api/animator/types'
import AnimLessonEvalsRecapPerSubject from './lesson-evals-recap-per-subject'

interface AnimLessonEvalDetailsDialogProps {
    student: StudentLessonEvalsEntry
    animatorId: number
    group: string
    onLessonEvalUpserted: (lessonEval: LessonEvalData) => void
    lessonsByLevel: LessonsByLevelEntry[]
    children: ReactNode
}

const AnimLessonEvalDetailsDialog = ({
    student,
    animatorId,
    group,
    onLessonEvalUpserted,
    lessonsByLevel,
    children,
}: AnimLessonEvalDetailsDialogProps) => {

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className={cn('h-dvh flex flex-col gap-0 items-start w-full lg:w-[calc(100%-18rem)] lg:left-72 lg:translate-x-0 p-0 font-outfit shadow-none border-none bg-slate-100 backdrop-blur-md md:rounded-l-2xl overflow-hidden focus:outline-none')}>
                {/* --- EN-TÊTE DU DIALOGUE --- */}
                <DialogHeader className="p-6 bg-white shrink-0 space-y-3 w-full text-left pt-12">
                    <div className="flex items-center gap-3">
                        <div className="space-y-0.5 min-w-0 flex-1">
                            <DialogTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
                                Évaluation des leçons
                            </DialogTitle>
                            <DialogDescription className="text-xs font-medium text-slate-500 flex flex-wrap items-center gap-1">
                                <span className="flex items-center gap-1.5">
                                    <GraduationCapIcon className="size-3.5 text-slate-400" />
                                    <span>{student.firstName} {student.lastName}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <GraduationCapIcon className="size-3.5 text-slate-400" />
                                    <span>{group}</span>
                                </span>
                                {student.level?.label && (
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="size-3.5 text-slate-400" />
                                        <span>Niveau : {student.level.label}</span>
                                    </span>
                                )}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* --- CONTENU DÉFILANT --- */}
                <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 w-full flex-1 space-y-6">
                    <AnimLessonEvalsRecapPerSubject
                        animatorId={animatorId}
                        student={student}
                        lessonsByLevel={lessonsByLevel}
                        onLessonEvalUpserted={onLessonEvalUpserted}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AnimLessonEvalDetailsDialog