import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRightIcon, HistoryIcon, RotateCwFadingClockIcon } from 'lucide-react';
import StudentCarouselSeanceCard from './carousel-seance-card';
import StudentSeancesListDrawer from './seances-list-drawer';
import { EmptyStateCard } from '@/components/ui/empty-state-card';

const CAROUSEL_MAX_LENGTH = 6;

const StudentSeanceHistoryCarousel = ({
  bilans,
  onQcmSubmit,
}: {
  bilans: BilanEntry[];
  onQcmSubmit: (qcm: QcmEntry) => void;
}) => {
  return (
    <div className="space-y-4 font-outfit mt-6">
      {/* En-tête de section */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-slate-900 tracking-tight">
            Historique des séances
          </h3>
        </div>
        <p className="text-slate-500 text-sm lg:text-base mt-1">
          Toutes les séances d'accompagnement organisées durant l'année scolaire, au même endroit.
        </p>
      </div>

      {/* Container principal */}
      <div className="bg-slate-50/60 border border-slate-200/60 rounded-3xl p-5 lg:p-6">
        {/* Sub-header inside container */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <HistoryIcon className="size-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base leading-snug">Vos séances</h4>
              <p className="text-xs text-slate-500 font-medium">Bilan et récapitulatif</p>
            </div>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
            {bilans.length} séance{bilans.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* État Vide */}
        {bilans.length === 0 ? (
          <EmptyStateCard
            icon={RotateCwFadingClockIcon}
            title='Aucune séance enregistrée'
            description='Toutes les séances réalisées avec vos animateurs apparaîtront ici automatiquement.'
          />
        ) : (
          /* Carrousel */
          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent className="-ml-3 py-3 px-1">
              {bilans
                .slice(0, Math.min(CAROUSEL_MAX_LENGTH, bilans.length))
                .map((bilan) => (
                  <CarouselItem
                    key={bilan.id}
                    className="pl-3 basis-64 sm:basis-72 shrink-0 h-48"
                  >
                    <StudentCarouselSeanceCard
                      bilan={bilan}
                      onQcmSubmit={onQcmSubmit}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>

            {/* Footer du Carrousel : Navigation & Drawer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 mt-2">
              <div className="flex items-center gap-2">
                <CarouselPrevious
                  variant="outline"
                  className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white"
                />
                <CarouselNext
                  variant="outline"
                  className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white"
                />
              </div>

              <StudentSeancesListDrawer
                bilans={bilans}
                onQcmSubmit={onQcmSubmit}
              >
                <Button
                  variant="outline"
                  className="text-xs font-bold h-9 gap-2 border-slate-200 bg-white hover:bg-slate-50 hover:text-sky-700"
                >
                  Voir toutes les séances
                  <ArrowRightIcon className="size-3.5" />
                </Button>
              </StudentSeancesListDrawer>
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default StudentSeanceHistoryCarousel;