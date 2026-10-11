import type { DeleteBilanEntry, SeanceDurationEntry, StudentEntry } from '@/api/animator/seances.types'
import AnimBilanCompletedDrawer from './bilan-completed-drawer'
import { cn, getElapsedDays } from '@/lib/utils'
import {
  AlertTriangleIcon,
  BookOpenTextIcon,
  CalendarIcon,
  CalendarXIcon,
  GraduationCapIcon,
  TrophyIcon,
} from 'lucide-react'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'

interface AnimBilanCompletedCardProps {
  studentBilan: StudentEntry
  seanceDate: Date
  seanceDuration: SeanceDurationEntry
  onBilanDeleted: (bilan: DeleteBilanEntry) => void
}

const AnimBilanCompletedCard = ({
  seanceDuration,
  studentBilan,
  seanceDate,
  onBilanDeleted,
}: AnimBilanCompletedCardProps) => {
  const bilan = studentBilan.bilan

  if (!bilan) {
    return null
  }

  const name = `${studentBilan.firstName} ${studentBilan.lastName}`
  const level = studentBilan.level?.label ?? 'Niveau non défini'
  const date = bilan.date
  const present = bilan.presence
  const lesson = bilan.lesson

  const cardStyle = present
    ? CARD_STYLES[studentBilan.bilan!.lesson!.subject.label as Subject]
    : CARD_STYLES['none']

  /* --- CAS ABSENCE --- */
  if (!present || !lesson) {
    return (
      <AnimBilanCompletedDrawer
        studentBilan={studentBilan}
        seanceDate={seanceDate}
        seanceDuration={seanceDuration}
        onBilanDeleted={onBilanDeleted}
      >
        <div
          className={cn(
            'group relative flex flex-col justify-between h-full p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-1',
            cardStyle.bgColor,
            'border-slate-200/60 shadow-2xs opacity-90'
          )}
        >
          {/* Badge Absence */}
          <div className="flex justify-end mb-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider',
                'bg-rose-100/80 text-rose-700 border border-rose-200/60'
              )}
            >
              <CalendarXIcon className="size-3" />
              <span>Absence</span>
            </span>
          </div>

          {/* Élève */}
          <div className="flex flex-col gap-1 mt-1 mb-4">
            <h3 className="text-sm font-bold text-slate-800 leading-tight truncate">
              {name}
            </h3>
            <div className="flex items-start gap-1.5">
              <CalendarXIcon className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-slate-600 line-clamp-2 leading-snug">
                Séance manquée
              </span>
            </div>
          </div>

          {/* Ligne 3 : Métadonnées (Niveau & Date) */}
          <div className="mt-auto pt-3 border-t border-slate-900/5 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <GraduationCapIcon className="size-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{level}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <CalendarIcon className="size-3 text-slate-400" />
              <span>{getElapsedDays(date)}</span>
            </div>
          </div>
        </div>
      </AnimBilanCompletedDrawer>
    )
  }

  /* --- CAS PRÉSENCE / BILAN REMPLI --- */
  return (
    <AnimBilanCompletedDrawer
      studentBilan={studentBilan}
      seanceDate={seanceDate}
      seanceDuration={seanceDuration}
      onBilanDeleted={onBilanDeleted}
    >
      <div
        className={cn(
          'group relative flex flex-col justify-between h-full p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-1 shadow-2xs',
          cardStyle.bgColor,
          'border-slate-200/50 hover:border-slate-300'
        )}
      >
        {/* Ligne 1 : Matière & Icône */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={cn(
                'size-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm bg-white border border-white/40',
                cardStyle.highlightTextColor
              )}
            >
              <cardStyle.icon className="size-4" />
            </div>
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider truncate',
                cardStyle.highlightTextColor
              )}
            >
              {cardStyle.label}
            </span>
          </div>

          {/* Statut QCM intégré en haut à droite */}
          <div className="shrink-0">
            {bilan.qcm && !bilan.qcm.completed && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                <AlertTriangleIcon className="size-3" /> QCM à faire
              </span>
            )}
            {bilan.qcm && bilan.qcm.completed && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                <TrophyIcon className="size-3" /> {bilan.qcm.score}/
                {bilan.qcm.qcmQuestions.length}
              </span>
            )}
            {!bilan.qcm && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/60 text-slate-500 border border-slate-200/50">
                Sans QCM
              </span>
            )}
          </div>
        </div>

        {/* Ligne 2 : Élève & Leçon */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900 leading-tight truncate mb-1">
            {name}
          </h3>
          <div className="flex items-start gap-1.5">
            <BookOpenTextIcon className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-slate-600 line-clamp-2 leading-snug">
              {lesson.label}
            </span>
          </div>
        </div>

        {/* Ligne 3 : Métadonnées (Niveau & Date) */}
        <div className="mt-auto pt-3 border-t border-slate-900/5 flex items-center justify-between text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <GraduationCapIcon className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{level}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <CalendarIcon className="size-3 text-slate-400" />
            <span>{getElapsedDays(date)}</span>
          </div>
        </div>
      </div>
    </AnimBilanCompletedDrawer>
  )
}

export default AnimBilanCompletedCard