import type { BilanEntry, StudentEntry } from '@/api/animator/seances.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import { getElapsedDays } from '@/lib/utils'
import {
  CalendarIcon,
  GraduationCapIcon,
  PenLineIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import AnimCreateBilanForm from './create/bilans/create-bilan-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface AnimBilanToDoDrawerProps {
  studentBilan: StudentEntry
  seanceDate: Date
  seanceId: number
  animatorId: number
  canAutoSummary : boolean
  lessonsByLevel: LessonsByLevelEntry[]
  onBilanSubmitted: (bilan: BilanEntry) => void
  children: ReactNode
}

const AnimBilanToDoDrawer = ({
  studentBilan,
  seanceDate,
  children,
  seanceId,
  canAutoSummary,
  animatorId,
  lessonsByLevel,
  onBilanSubmitted,
}: AnimBilanToDoDrawerProps) => {
  const name = `${studentBilan.firstName} ${studentBilan.lastName}`
  const initials = `${studentBilan.firstName?.[0] ?? ''}${studentBilan.lastName?.[0] ?? ''}`.toUpperCase()
  let level = studentBilan.level?.label ?? 'Niveau non renseigné';
  if(level.includes("1ère")) level = "1ère";
  else if(level.includes("Terminale")) level = "Terminale";
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      <DialogContent className="h-dvh w-full flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none gap-0">
        {/* --- EN-TÊTE DU DRAWER --- */}
        <DialogHeader className="shrink-0 space-y-4 text-left bg-white pt-4 px-6 pb-4">
          {/* Ligne 1 : Navigation Retour */}
          <div className="flex items-center justify-between">

            {/* Badge de statut */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-bold">
              <PenLineIcon className="size-3 text-amber-500" />
              <span>Saisie de bilan</span>
            </span>
          </div>

          {/* Ligne 2 : Identité Élève & Titre */}
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center font-extrabold text-sm shadow-2xs shrink-0">
              {initials}
            </div>

            <div className="space-y-0.5 min-w-0 flex-1">
              <DialogTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
                {name}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-slate-500">
                Renseignez le bilan d'accompagnement de la séance
              </DialogDescription>
            </div>
          </div>

          {/* Ligne 3 : Métadonnées sous forme de puces (Date & Niveau) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200/60 text-slate-600 text-[11px] font-semibold">
              <CalendarIcon className="size-3 text-slate-400 shrink-0" />
              <span>{getElapsedDays(seanceDate)}</span>
            </span>

            {level && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-[11px] font-semibold">
                <GraduationCapIcon className="size-3 text-indigo-500 shrink-0" />
                <span>{level}</span>
              </span>
            )}
          </div>
        </DialogHeader>

        {/* --- FORMULAIRE DÉFILANT --- */}
        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 pb-0 pt-8 sm:p-5 flex-1">
          <AnimCreateBilanForm
            studentBilan={studentBilan}
            seanceId={seanceId}
            animatorId={animatorId}
            canAutoSummary = {canAutoSummary}
            seanceDate={seanceDate}
            lessonsByLevel={lessonsByLevel}
            onBilanSubmitted={onBilanSubmitted}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AnimBilanToDoDrawer