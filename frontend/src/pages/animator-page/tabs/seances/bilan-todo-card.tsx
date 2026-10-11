import type { BilanEntry, SeanceDurationEntry, StudentEntry } from '@/api/animator/seances.types'
import { cn, getElapsedDays } from '@/lib/utils'
import {
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
  PenLineIcon,
  UserIcon,
} from 'lucide-react'
import AnimBilanToDoDrawer from './bilan-todo-drawer'
import type { LessonsByLevelEntry } from '@/api/animator/types'

interface AnimBilanToDoCardProps {
  studentBilan: StudentEntry
  seanceDate: Date
  seanceId: number
  animatorId: number
  lessonsByLevel: LessonsByLevelEntry[]
  seanceDuration: SeanceDurationEntry
  onBilanSubmitted: (bilan: BilanEntry) => void
}

const AnimBilanToDoCard = ({
  seanceDuration,
  studentBilan,
  seanceDate,
  seanceId,
  animatorId,
  lessonsByLevel,
  onBilanSubmitted,
}: AnimBilanToDoCardProps) => {
  const name = `${studentBilan.firstName} ${studentBilan.lastName}`
  const level = studentBilan.level?.label ?? 'Niveau non défini'

  return (
    <AnimBilanToDoDrawer
      lessonsByLevel={lessonsByLevel}
      animatorId={animatorId}
      seanceId={seanceId}
      onBilanSubmitted={onBilanSubmitted}
      studentBilan={studentBilan}
      seanceDate={seanceDate}
    >
      <div
        className={cn(
          'group relative flex flex-col justify-between h-full p-4.5 rounded-2xl font-outfit bg-white border border-slate-200/80 shadow-xs cursor-pointer transition-all duration-200 hover:shadow-md hover:border-indigo-300 hover:-translate-y-1'
        )}
      >
        {/* Accent visuel d'attente d'action */}
        {/* <div className="absolute top-0 left-1/2 w-4/5 -translate-x-1/2 h-1 bg-amber-400/80 rounded-t-" /> */}

        <div className="flex items-start justify-between gap-3 mb-4 mt-1">
          {/* Avatar & Nom */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
              <UserIcon className="size-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 leading-tight truncate group-hover:text-indigo-600 transition-colors">
                {name}
              </h3>
              <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1 mt-0.5">
                <PenLineIcon className="size-3" /> À rédiger
              </span>
            </div>
          </div>
        </div>

        {/* Message d'incitation */}
        <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 mb-4">
          <p className="text-xs font-medium text-slate-500 text-center leading-snug">
            Saisissez les notes et observations pour valider cette séance.
          </p>
        </div>

        {/* Métadonnées (Niveau, Date, Durée) */}
        <div className="space-y-2 mt-auto text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCapIcon className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{level}</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-3 text-slate-400 shrink-0" />
              <span>{getElapsedDays(seanceDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="size-3 text-slate-400 shrink-0" />
              <span>{seanceDuration.label}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimBilanToDoDrawer>
  )
}

export default AnimBilanToDoCard