import type { BilanEntry, DeleteBilanEntry, SeanceEntry } from '@/api/animator/seances.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import { Progress } from '@/components/ui/progress'
import { cn, getElapsedDays } from '@/lib/utils'
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  NotebookTextIcon,
  TimerIcon,
  UsersRoundIcon,
} from 'lucide-react'
import AnimSeanceDetailsDialog from './seance-details-dialog'

interface AnimSeanceCarouselCardProps {
  lessonsByLevel: LessonsByLevelEntry[]
  onBilanSubmitted: (bilan: BilanEntry) => void
  seance: SeanceEntry
  group: string
  onBilanDeleted: (bilan: DeleteBilanEntry) => void
}

const AnimSeanceCarouselCard = ({
  seance,
  group,
  lessonsByLevel,
  onBilanSubmitted,
  onBilanDeleted,
}: AnimSeanceCarouselCardProps) => {
  const completedBilans = seance.studentBilans.filter((s) => s.bilan !== null).length
  const studentsCount = seance.studentBilans.length
  const completionRate =
    studentsCount > 0 ? Math.round((completedBilans / studentsCount) * 100) : 0
  const isComplete = studentsCount > 0 && completedBilans === studentsCount

  return (
    <AnimSeanceDetailsDialog
      lessonsByLevel={lessonsByLevel}
      onBilanSubmitted={onBilanSubmitted}
      seance={seance}
      group={group}
      onBilanDeleted={onBilanDeleted}
    >
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl p-5 font-outfit bg-white border shadow-xs transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col justify-between h-full select-none',
          isComplete
            ? 'border-emerald-100 hover:border-emerald-300/80'
            : 'border-slate-200/80 hover:border-indigo-300/80'
        )}
      >
        {/* --- EN-TÊTE : Date (gauche) & Badge Statut (droite) --- */}
        <div className="flex items-center justify-between gap-2">
          {/* Date */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <CalendarIcon className="size-3.5 text-slate-400" />
            <span>{getElapsedDays(seance.date)}</span>
          </span>

          {/* Badge de complétion */}
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border',
              isComplete
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                : 'bg-amber-50 text-amber-700 border-amber-200/60'
            )}
          >
            {isComplete ? (
              <>
                <CheckCircle2Icon className="size-3.5 text-emerald-600" />
                <span>Complété</span>
              </>
            ) : (
              <>
                <ClockIcon className="size-3 text-amber-600" />
                <span>À compléter</span>
              </>
            )}
          </span>
        </div>

        {/* --- CORPS : Statistiques & Progression --- */}
        <div className="my-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icône animée au survol */}
              <div
                className={cn(
                  'flex items-center justify-center size-10 rounded-full border transition-transform duration-300 group-hover:scale-105',
                  isComplete
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                    : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                )}
              >
                <NotebookTextIcon className="size-4.5" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  Bilans élèves
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  {completedBilans} sur {studentsCount} saisis
                </span>
              </div>
            </div>

            {/* Pourcentage mis en valeur */}
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              {completionRate}%
            </span>
          </div>

          {/* Barre de progression (seul élément avec un dégradé coloré) */}
          <Progress
            value={completionRate}
            className={cn(
              'h-2 bg-slate-100/80 rounded-full overflow-hidden',
              isComplete
                ? '[&>div]:bg-linear-to-r [&>div]:from-emerald-400 [&>div]:to-emerald-500'
                : '[&>div]:bg-linear-to-r [&>div]:from-indigo-400 [&>div]:to-indigo-500'
            )}
          />
        </div>

        {/* --- PIED DE CARTE : Métadonnées (Groupe & Durée) --- */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <UsersRoundIcon className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-slate-700">{group}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <TimerIcon className="size-3.5 text-slate-400" />
            <span>{seance.seanceDuration.label}</span>
          </div>
        </div>
      </div>
    </AnimSeanceDetailsDialog>
  )
}

export default AnimSeanceCarouselCard