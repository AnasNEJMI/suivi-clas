import type { AnimatorStatsPerScolarYear, SeanceStats } from "@/api/association-member/apiCalls";
import { ArrowRightIcon, RotateCwFadingClockIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import AssocCarouselSeanceCard from "./carousel-seance-card";
import AssocSeancesListDrawer from "./seances-list-drawer";
import { EmptyStateCard } from "@/components/ui/empty-state-card";

export type CarouselSeance = {
  animator: { id: number; firstName: string; lastName: string; gender: "f" | "m" };
  class: { id: number; label: string };
  seance: SeanceStats;
};

const CAROUSEL_MAX_LENGTH = 6;

const AssocSeanceHistoryCarousel = ({
  animatorStatsPerScolarYear,
}: {
  animatorStatsPerScolarYear: AnimatorStatsPerScolarYear[];
}) => {
  const animatorStats = animatorStatsPerScolarYear[0];

  if (!animatorStats) return null;

  return (
    <div className="space-y-8 font-outfit mt-10">
      {/* En-tête de section */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
            Historique des séances
          </h3>
        </div>
        <p className="text-slate-500 text-sm lg:text-base mt-1">
          Toutes les séances d'accompagnement organisées durant l'année scolaire.
        </p>
      </div>

      {/* Boucle par animateur */}
      {animatorStats.animators.map((animator) => {
        const name = `${animator.animator.firstName} ${animator.animator.lastName}`;
        const seances: CarouselSeance[] = animator.classes
          .flatMap((c) =>
            c.seances.map((s) => ({
              animator: animator.animator,
              class: { id: c.class.id, label: c.class.label },
              seance: s,
            }))
          )
          .sort((a, b) => new Date(b.seance.date).getTime() - new Date(a.seance.date).getTime());

        const filters = [...new Set(seances.map((s) => s.class.label)), "all"];

        return (
          <div key={animator.animator.id} className="bg-slate-50/60 border border-slate-200/60 rounded-3xl p-5 lg:p-6">
            {/* Header Animateur */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {animator.animator.firstName.charAt(0)}
                  {animator.animator.lastName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base leading-snug">{name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{animator.animator.gender === 'f' ? "Animatrice" : "Animateur"}</p>
                </div>
              </div>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                {seances.length} séance{seances.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* État Vide */}
            {seances.length === 0 ? (
              <EmptyStateCard
                icon={RotateCwFadingClockIcon}
                title = 'Aucune séance enregistrée'
                description="Les séances validées par cet animateur apparaîtront ici automatiquement."
              />
            ) : (
              /* Carrousel */
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-3 py-3 px-1">
                  {seances.slice(0, Math.min(CAROUSEL_MAX_LENGTH, seances.length)).map((seance) => (
                    <CarouselItem
                      key={seance.seance.id}
                      className="pl-3 basis-65 sm:basis-70 shrink-0"
                    >
                      <AssocCarouselSeanceCard seance={seance} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Footer du Carrousel : Flèches & Voir tout */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 mt-2">
                  <div className="flex items-center gap-2">
                    <CarouselPrevious variant="outline" className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white" />
                    <CarouselNext variant="outline" className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white" />
                  </div>

                  <AssocSeancesListDrawer seances={seances} filters={filters}>
                    <Button variant="outline" className="text-xs font-bold h-9 gap-2 border-slate-200 bg-white hover:bg-slate-50 hover:text-sky-700">
                      Voir toutes les séances
                      <ArrowRightIcon className="size-3.5" />
                    </Button>
                  </AssocSeancesListDrawer>
                </div>
              </Carousel>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AssocSeanceHistoryCarousel;