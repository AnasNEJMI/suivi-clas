import type { SeancesByScolarYearEntry } from '@/api/animator/seances.types';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { RotateCwFadingClockIcon } from 'lucide-react';
import AnimClassQCMsCarousel from './class-qcms-carousel';
import type { ScolarYearEntry } from '@/api/animator/types';

interface AnimQcmsStatsPerClassProps {
  seancesByScolarYear: SeancesByScolarYearEntry[];
  baseData: ScolarYearEntry;
}

const AnimQcmsStatsPerClass = ({
  seancesByScolarYear,
  baseData,
}: AnimQcmsStatsPerClassProps) => {
  const seancesStatsPerClass = seancesByScolarYear[0]?.classes ?? [];

  if (seancesStatsPerClass.length === 0) {
    return (
      <div className="space-y-4 font-outfit mt-8">
        <div>
          <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
            QCMs cette année
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Suivi des questionnaires par classe et par élève.
          </p>
        </div>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title="Les données de QCMs n'ont pas été enregistrées."
          description="Toutes les données de QCMs enregistrées seront affichées ici dès leur réalisation."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-outfit mt-8">
      <div>
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          QCMs cette année
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Suivi détaillé des QCMs par classe et progression individuelle des élèves.
        </p>
      </div>

      <div className="space-y-6">
        {seancesStatsPerClass.map((clasSStats) => (
          <AnimClassQCMsCarousel
            key={clasSStats.id}
            classStats={clasSStats}
            baseData={baseData}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimQcmsStatsPerClass;