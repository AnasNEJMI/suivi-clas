import type { SkillEvalClassEntry, SkillEvalData } from '@/api/animator/skill-evals.types'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { EmptyStateCard } from '@/components/ui/empty-state-card'
import { RotateCwFadingClockIcon, UsersRoundIcon } from 'lucide-react'
import AnimSkillEvalCarouselCard from './skill-eval-carousel-card'

interface AnimSkillEvalsByGroupProps {
  classes: SkillEvalClassEntry[]
  animatorId: number
  onSkillEvalUpserted: (skillEval: SkillEvalData) => void
}

const AnimSkillEvalsByGroup = ({
  classes,
  animatorId,
  onSkillEvalUpserted,
}: AnimSkillEvalsByGroupProps) => {
  /* État vide global */
  if (!classes || classes.length === 0) {
    return (
      <div className="space-y-4 font-outfit mt-8">
        <div>
          <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
            Compétences méthodologiques
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Suivi et évaluation des compétences transversales par groupe.
          </p>
        </div>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title="Aucun groupe enregistré pour le moment."
          description="Les données de chaque groupe s'afficheront ici dès leur enregistrement."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 font-outfit mt-8">
      {/* En-tête de section */}
      <div>
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Compétences méthodologiques
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Consultez et mettez à jour les fiches de compétences de chaque élève par groupe.
        </p>
      </div>

      {/* Cartes par Groupe / Classe */}
      <div className="space-y-6">
        {classes.map((group) => {
          const sortedStudents = [...group.students].sort((a, b) => {
            if (!a.skillEval && !b.skillEval) return 0
            if (!a.skillEval && b.skillEval) return 1
            if (a.skillEval && !b.skillEval) return -1
            return (
              new Date(b.skillEval!.updatedAt).getTime() -
              new Date(a.skillEval!.updatedAt).getTime()
            )
          })

          return (
            <div
              key={group.id}
              className="bg-slate-50/60 border border-slate-200/70 rounded-3xl p-5 lg:p-6 shadow-2xs"
            >
              {/* Header du Groupe */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-linear-to-tr from-sky-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold shadow-2xs shrink-0">
                    <UsersRoundIcon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base leading-snug">
                      {group.label}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Évaluations de méthodologie
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs">
                  {group.students.length} {group.students.length > 1 ? 'élèves' : 'élève'}
                </span>
              </div>

              {/* État vide du Groupe */}
              {group.students.length === 0 ? (
                <Card className="border-2 border-dashed border-slate-200/80 shadow-none h-48 flex flex-col items-center justify-center w-full rounded-2xl bg-white/60 p-6 text-center">
                  <CardHeader className="p-0 flex flex-col items-center w-full">
                    <div className="size-11 rounded-2xl bg-slate-100/80 flex items-center justify-center mb-2">
                      <RotateCwFadingClockIcon className="size-5 text-slate-400" />
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-800">
                      Aucun élève dans ce groupe
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 max-w-sm mt-1">
                      Les fiches d'évaluation des élèves apparaîtront ici automatiquement.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                /* Carrousel des élèves du Groupe */
                <Carousel opts={{ align: 'start' }} className="w-full">
                  <CarouselContent className="-ml-3 py-2 px-1">
                    {sortedStudents.map((student) => (
                      <CarouselItem
                        key={student.id}
                        className="pl-3 basis-68 sm:basis-72 shrink-0"
                      >
                        <AnimSkillEvalCarouselCard
                          student={student}
                          animatorId={animatorId}
                          group={group.label}
                          onSkillEvalUpserted={onSkillEvalUpserted}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Pied du Carrousel : Contrôles */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 mt-2">
                    <div className="flex items-center gap-2">
                      <CarouselPrevious
                        variant="outline"
                        className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs"
                      />
                      <CarouselNext
                        variant="outline"
                        className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs"
                      />
                    </div>
                  </div>
                </Carousel>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AnimSkillEvalsByGroup