import type { BilanEntry, SeanceDurationEntry, StudentEntry } from "@/api/animator/seances.types"
import { cn, getElapsedDays } from "@/lib/utils"
import {CalendarIcon, ClockFadingIcon, SchoolIcon, UserIcon } from "lucide-react";
import AnimBilanToDoDrawer from "./bilan-todo-drawer";
import type { LessonsByLevelEntry } from "@/api/animator/types";

interface AnimBilanToDoCardProps{
    studentBilan : StudentEntry,
    seanceDate : Date,
    seanceId : number,
    animatorId : number,
    lessonsByLevel: LessonsByLevelEntry[],
    seanceDuration : SeanceDurationEntry,
    onBilanSubmitted:  (bilan: BilanEntry) => void
}

const AnimBilanToDoCard = ({
    seanceDuration, studentBilan, seanceDate, seanceId, animatorId, lessonsByLevel, onBilanSubmitted,
} : AnimBilanToDoCardProps) => {
    const name = `${studentBilan.firstName} ${studentBilan.lastName}`;
    const level = studentBilan.level?.label ?? null;
    return (
    <AnimBilanToDoDrawer
            lessonsByLevel={lessonsByLevel}
            animatorId={animatorId}
            seanceId={seanceId}
            onBilanSubmitted={onBilanSubmitted}
            studentBilan={studentBilan}
            seanceDate={seanceDate}
        >
        <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between shadow-sm border border-zinc-200`)}>
            <p className='text-base font-semibold flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/>{name}</p>
            <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight mt-4'><SchoolIcon className='size-4'/>{level}</p>
            <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {getElapsedDays(seanceDate)}</span> <span className='flex items-center justify-center gap-1'><ClockFadingIcon className='size-4'/> {seanceDuration.label}</span></p>
            
        </div>
    </AnimBilanToDoDrawer>
  )
}

export default AnimBilanToDoCard