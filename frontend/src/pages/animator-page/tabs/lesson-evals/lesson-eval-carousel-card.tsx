import { cn } from '@/lib/utils'
import { ArrowRightIcon, BicepsFlexedIcon, NotebookPenIcon, StarsIcon, TrendingUpIcon } from 'lucide-react'
import AnimLessonEvalDetailsDialog from './lesson-eval-details-dialog'
import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'

interface AnimLessonEvalCarouselCardProps {
  student: StudentLessonEvalsEntry
  animatorId: number
  group: string
  onLessonEvalUpserted: (lessonEval: LessonEvalData) => void
  lessonsByLevel: LessonsByLevelEntry[]
}

const AnimLessonEvalCarouselCard = ({
  student,
  animatorId,
  group,
  onLessonEvalUpserted,
  lessonsByLevel,
}: AnimLessonEvalCarouselCardProps) => {
  const name = `${student.firstName} ${student.lastName}`
  const initials = `${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase()

  // CORRECTION DES ERREURS LOGIQUES ET DE COMPTAGE :
  let lessonsEvaluatedCount = 0
  let lessonsAcquiringCount = 0
  let lessonsAcquiredCount = 0
  let lessonsExpertCount = 0

  for (const subjectEval of student.lessonEvalsBySubject) {
    for (const evalItem of subjectEval.lessonEvals) {
      // On compte comme évalué tout ce qui n'est pas non évalué (ex: 'notEvaluated')
      if (evalItem.evaluation && evalItem.evaluation !== 'notAcquired') {
        lessonsEvaluatedCount++
        if (evalItem.evaluation === 'acquiring') lessonsAcquiringCount++
        if (evalItem.evaluation === 'acquired') lessonsAcquiredCount++
        if (evalItem.evaluation === 'expert') lessonsExpertCount++
      }
    }
  }

  // CORRECTION DES ERREURS DE FORMULE DE POURCENTAGE (correction des erreurs de syntaxe/multiplication)
  const lessonsAcquiringRate =
    lessonsEvaluatedCount > 0 ? Math.round((lessonsAcquiringCount / lessonsEvaluatedCount) * 100) : 0
  const lessonsAcquiredRate =
    lessonsEvaluatedCount > 0 ? Math.round((lessonsAcquiredCount / lessonsEvaluatedCount) * 100) : 0
  const lessonsExpertRate =
    lessonsEvaluatedCount > 0 ? Math.round((lessonsExpertCount / lessonsEvaluatedCount) * 100) : 0

  return (
    <AnimLessonEvalDetailsDialog
      student={student}
      animatorId={animatorId}
      group={group}
      onLessonEvalUpserted={onLessonEvalUpserted}
      lessonsByLevel={lessonsByLevel}
    >
      <div
        className={cn(
          'group relative flex flex-col justify-between h-full p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300 hover:-translate-y-1 select-none font-outfit'
        )}
      >
        {/* Ligne 1 : Header Élève avec Initiales */}
        <div className="flex items-center gap-3 mb-3">
          <div className="size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
            {initials}
          </div>
          <div className="min-w-0">
            <h5 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              {name}
            </h5>
            <span className="text-[11px] font-medium text-slate-500 truncate block mt-0.5">
              {group}
            </span>
          </div>
        </div>

        {/* Métriques d'évaluation alignées et soignées */}
        <div className="space-y-2 py-2.5 border-t border-b border-slate-100 text-xs font-medium text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-700">
              <NotebookPenIcon className="size-3.5 text-indigo-600" />
              Leçons évaluées
            </span>
            <span className="font-bold text-slate-900">{lessonsEvaluatedCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-700">
              <TrendingUpIcon className="size-3.5 text-amber-500" />
              En cours
            </span>
            <span className="font-bold text-amber-700">{lessonsAcquiringRate}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-700">
              <BicepsFlexedIcon className="size-3.5 text-sky-500" />
              Acquises
            </span>
            <span className="font-bold text-sky-700">{lessonsAcquiredRate}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <StarsIcon className="size-3.5 text-emerald-500" />
              Maîtrisées
            </span>
            <span className="font-bold text-emerald-700">{lessonsExpertRate}%</span>
          </div>
        </div>

        {/* Pied de carte */}
        <div className="mt-3 flex items-center justify-end text-[11px] text-slate-500 font-medium">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center gap-1">
            Ouvrir la fiche des évaluations <ArrowRightIcon className='size-3'/>
          </span>
        </div>
      </div>
    </AnimLessonEvalDetailsDialog>
  )
}

export default AnimLessonEvalCarouselCard