import type { SkillEvalData, SkillEvalStudentEntry } from "@/api/animator/skill-evals.types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn, getElapsedDays } from "@/lib/utils"
import type { ReactNode } from "react"
import AnimSkillNotesCarousel from "./skill-notes-carousel"
import { CalendarIcon, GraduationCapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimSkillEvalCard from "./skill-eval-card"
import AnimSkillEvalDrawer from "./skill-eval-form-drawer"

interface AnimSkillEvalDetailsDialogProps {
    student: SkillEvalStudentEntry
    animatorId: number
    group: string
    onSkillEvalUpserted: (skillEval: SkillEvalData) => void
    children: ReactNode
}

const AnimSkillEvalDetailsDialog = ({
    student,
    animatorId,
    group,
    onSkillEvalUpserted,
    children,
}: AnimSkillEvalDetailsDialogProps) => {

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className={cn('h-dvh flex flex-col items-start w-full lg:w-[calc(100%-18rem)] lg:left-72 lg:translate-x-0 p-0 gap-0 font-outfit shadow-none border-none bg-slate-100 overflow-hidden focus:outline-none')}>
                {/* --- EN-TÊTE DU DIALOGUE --- */}
                <DialogHeader className="bg-white/90 shrink-0 w-full text-left pt-12 pb-6 px-6">
                    <div className="flex flex-col items-start gap-3">
                        <div className="space-y-0.5 min-w-0 flex-1">
                            <DialogTitle className="font-extrabold text-lg tracking-tight text-slate-900 truncate">
                                Évaluation de méthodologie
                            </DialogTitle>
                            <DialogDescription className="text-xs font-medium text-slate-500 flex flex-wrap gap-1">
                                <span className="flex items-center gap-1.5">
                                    <GraduationCapIcon className="size-3.5 text-slate-400" />
                                    <span>{student.firstName} {student.lastName}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <GraduationCapIcon className="size-3.5 text-slate-400" />
                                    <span>{group}</span>
                                </span>
                                {student.skillEval && (
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="size-3.5 text-slate-400" />
                                        <span>Mis à jour {getElapsedDays(student.skillEval.updatedAt)}</span>
                                    </span>
                                )}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* --- CONTENU DÉFILANT --- */}
                <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-6 w-full flex-1 space-y-6 pb-6">
                    <AnimSkillNotesCarousel skillEval={student.skillEval} />
                    <AnimSkillEvalCard skillEval={student.skillEval} />
                </div>

                {/* --- BOUTON D'ACTION FLOTTANT --- */}
                <div className="absolute bottom-6 right-6 z-10">
                    <AnimSkillEvalDrawer
                        student={student}
                        animatorId={animatorId}
                        onSkillEvalUpserted={onSkillEvalUpserted}
                    >
                        <Button className="h-11 px-5 rounded-xl font-bold text-sm shadow-md cursor-pointer">
                            {student.skillEval ? 'Modifier l\'évaluation' : 'Créer l\'évaluation'}
                        </Button>
                    </AnimSkillEvalDrawer>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AnimSkillEvalDetailsDialog