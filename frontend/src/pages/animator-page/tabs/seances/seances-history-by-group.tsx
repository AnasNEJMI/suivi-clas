import type { BilanEntry, DeleteBilanEntry, SeancesByScolarYearEntry } from '@/api/animator/seances.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ArrowRightIcon, RotateCwFadingClockIcon, UsersRoundIcon } from 'lucide-react'
import AnimSeanceCarouselCard from './seance-carousel-card'
import GroupSeancesListDrawer from './group-seances-list-drawer'
import { EmptyStateCard } from '@/components/ui/empty-state-card'

interface SeancesHistoryByGroupProps {
  seancesByScolarYear: SeancesByScolarYearEntry[]
  lessonsByLevel: LessonsByLevelEntry[]
  onBilanSubmitted: (bilan: BilanEntry) => void
  onBilanDeleted: (bilan: DeleteBilanEntry) => void
}

const CAROUSEL_MAX_LENGTH = 6

const SeancesHistoryByGroup = ({
  seancesByScolarYear,
  lessonsByLevel,
  onBilanSubmitted,
  onBilanDeleted,
}: SeancesHistoryByGroupProps) => {
  const seancesData = seancesByScolarYear[0]

  /* État vide global (aucune donnée de classe/groupe) */
  if (!seancesData || !seancesData.classes || seancesData.classes.length === 0) {
    return (
      <div className="space-y-4 font-outfit mt-8">
        <div>
          <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
            Historique des séances
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Retrouvez l'ensemble des séances d'accompagnement organisées par groupe.
          </p>
        </div>
        <EmptyStateCard
            icon={RotateCwFadingClockIcon}
            title = 'Aucune séance enregistrée pour le moment.'
            description='Les statistiques et bilans des séances réalisées seront affichés ici dès leur enregistrement.'
            />
      </div>
    )
  }

  return (
    <div className="space-y-6 font-outfit mt-8">
      {/* En-tête de section */}
      <div>
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Historique des séances
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Toutes les séances d'accompagnement organisées durant l'année scolaire par groupe d'élèves.
        </p>
      </div>

      {/* Cartes par Groupe / Classe */}
      <div className="space-y-6">
        {seancesData.classes.map((group) => {
          const sortedSeances = [...group.seances].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )

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
                      Séances organisées
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs">
                  {group.seances.length} {group.seances.length > 1 ? 'séances' : 'séance'}
                </span>
              </div>

              {/* État vide du Groupe */}
              {group.seances.length === 0 ? (
                <EmptyStateCard
                  icon={RotateCwFadingClockIcon}
                  title = 'Aucune séance enregistrée pour ce groupe'
                  description="Les bilans et présences liés à ce groupe s'afficheront ici automatiquement."              
                />
              ) : (
                /* Carrousel de Séances */
                <Carousel opts={{ align: 'start' }} className="w-full">
                  <CarouselContent className="-ml-3 py-2 px-1">
                    {sortedSeances
                      .slice(0, Math.min(sortedSeances.length, CAROUSEL_MAX_LENGTH))
                      .map((seance) => (
                        <CarouselItem
                          key={seance.id}
                          className="pl-3 basis-68 sm:basis-72 shrink-0"
                        >
                          <AnimSeanceCarouselCard
                            seance={seance}
                            group={group.label}
                            lessonsByLevel={lessonsByLevel}
                            onBilanSubmitted={onBilanSubmitted}
                            onBilanDeleted={onBilanDeleted}
                          />
                        </CarouselItem>
                      ))}
                  </CarouselContent>

                  {/* Pied du Carrousel : Contrôles & Tiroir de détails */}
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

                    <GroupSeancesListDrawer
                      group={group.label}
                      seances={group.seances}
                      lessonsByLevel={lessonsByLevel}
                      onBilanDeleted={onBilanDeleted}
                      onBilanSubmitted={onBilanSubmitted}
                    >
                      <Button
                        variant="outline"
                        className="text-xs font-bold h-9 px-3.5 rounded-xl gap-2 border-slate-200/80 bg-white hover:bg-slate-50 hover:text-indigo-600 shadow-2xs transition-colors cursor-pointer"
                      >
                        <span>Voir toutes les séances</span>
                        <ArrowRightIcon className="size-3.5" />
                      </Button>
                    </GroupSeancesListDrawer>
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

export default SeancesHistoryByGroup