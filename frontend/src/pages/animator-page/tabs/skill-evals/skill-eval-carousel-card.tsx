import type { SkillEvalData, SkillEvalStudentEntry } from '@/api/animator/skill-evals.types'
import { cn, getElapsedDays } from '@/lib/utils'
import { AlertCircleIcon, ArrowRight, CalendarIcon, CheckCircle2Icon } from 'lucide-react'
import AnimSkillEvalDetailsDialog from './skill-eval-details-dialog'

interface AnimSkillEvalCarouselCardProps {
  student: SkillEvalStudentEntry
  animatorId: number
  group: string
  onSkillEvalUpserted: (skillEval: SkillEvalData) => void
}

const AnimSkillEvalCarouselCard = ({
  student,
  animatorId,
  group,
  onSkillEvalUpserted,
}: AnimSkillEvalCarouselCardProps) => {
  const name = `${student.firstName} ${student.lastName}`
  const initials = `${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase()
  const isEvaluated = Boolean(student.skillEval)

  return (
    <AnimSkillEvalDetailsDialog
      student={student}
      animatorId={animatorId}
      group={group}
      onSkillEvalUpserted={onSkillEvalUpserted}
    >
      <div
        className={cn(
          'group relative flex flex-col justify-between h-full p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300 hover:-translate-y-1 select-none font-outfit'
        )}
      >
        {/* Ligne 1 : Header Élève avec Initiales */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 leading-tight truncate group-hover:text-indigo-600 transition-colors">
                {name}
              </h3>
              <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                {group}
              </p>
            </div>
          </div>
        </div>

        {/* Ligne 2 : Badge de statut d'évaluation */}
        <div className="my-2">
          {isEvaluated ? (
            <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-emerald-600 shrink-0" />
              <span className="truncate">Évaluation renseignée</span>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircleIcon className="size-4 text-amber-500 shrink-0" />
              <span className="truncate">Non évalué</span>
            </div>
          )}
        </div>

        {/* Ligne 3 : Date de mise à jour / Pied de carte */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <CalendarIcon className="size-3.5 text-slate-400 shrink-0" />
            {isEvaluated ? (
              <span>{getElapsedDays(student.skillEval!.updatedAt)}</span>
            ) : (
              <span className="text-amber-600 font-semibold">À effectuer</span>
            )}
          </div>

          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center gap-1">
            Consulter l'évaluation <ArrowRight className='size-3'/>
          </span>
        </div>
      </div>
    </AnimSkillEvalDetailsDialog>
  )
}

export default AnimSkillEvalCarouselCard