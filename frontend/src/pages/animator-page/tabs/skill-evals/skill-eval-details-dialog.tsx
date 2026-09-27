import type { SkillEvalData, SkillEvalStudentEntry } from "@/api/animator/skill-evals.types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn, getElapsedDays } from "@/lib/utils"
import type { ReactNode } from "react"
import AnimSkillNotesCarousel from "./skill-notes-carousel"
import { CalendarIcon, GraduationCapIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimSkillEvalCard from "./skill-eval-card"
import AnimSkillEvalDrawer from "./skill-eval-form-drawer"

const AnimSkillEvalDetailsDialog = ({student, animatorId, group, onSkillEvalUpserted, children} : {student : SkillEvalStudentEntry, animatorId : number, group : string, onSkillEvalUpserted : (skillEval : SkillEvalData)  => void, children : ReactNode}) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className={cn('h-dvh flex flex-col items-start w-full lg:w-[calc(100%-18rem)] lg:left-72 lg:translate-x-0 pr-0 pl-4 pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl')}>
            <DialogHeader className='flex w-full gap-0'>
                <DialogTitle className='font-bold text-xl  md:text-3xl tracking-tight text-start px-2 mt-4'>Évaluation de méthodologie</DialogTitle>
                <DialogDescription className='text-sm text-pretty lg:text-base leading-4 text-start px-2'>
                    <span className="flex items-center gap-1 text-sm"><UserIcon className="size-4"/> <span>{student.firstName} {student.lastName}</span></span>
                    <span className="flex items-center gap-1 text-sm"><GraduationCapIcon className="size-4"/> <span>{group}</span></span>
                    {
                        student.skillEval && 
                        <span className="flex items-center gap-1 text-sm"><CalendarIcon className="size-4"/> <span>{getElapsedDays(student.skillEval.updatedAt)}</span></span>
                    }
                </DialogDescription>
            </DialogHeader>
            <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto  pr-4 w-full">
                <AnimSkillNotesCarousel skillEval={student.skillEval}/>
                <AnimSkillEvalCard skillEval = {student.skillEval} />
            </div>

            <div className="fixed bottom-6 right-6">
                <AnimSkillEvalDrawer
                    student = {student}
                    animatorId={animatorId}
                    onSkillEvalUpserted = {onSkillEvalUpserted}
                >
                    <Button className="h-12 w-24">
                        {student.skillEval? 'Modifier' : 'Créer'}
                    </Button>
                </AnimSkillEvalDrawer>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default AnimSkillEvalDetailsDialog