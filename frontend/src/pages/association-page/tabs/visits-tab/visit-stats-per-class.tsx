import type { ConsultationStatsPerScolarYear } from '@/api/association-member/apiCalls';
import AssocClassConsultationCarousel from './class-visit-carousel';
import { RotateCwFadingClockIcon } from 'lucide-react';
import { EmptyStateCard } from '@/components/ui/empty-state-card';

const AssocVisitStatsPerClass = ({ consultationStatsPerScolarYear }: { consultationStatsPerScolarYear: ConsultationStatsPerScolarYear[] }) => {
  const consultationStats = consultationStatsPerScolarYear[0];

  // État vide global
  if (!consultationStats || consultationStats.classes.length === 0) {
    return (
      <div className="font-outfit mt-8 space-y-3">
        {/* Titre principal */}
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg  text-slate-900">
            Détail des visites par classe
          </h3>
        </div>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title = "Les données de visites n'ont pas été enregistrées pour le moment."
          description="Toutes les données de visites enregistrées par classe seront affichées ici dès qu'elles seront disponibles."
        />
      </div>
    );
  }

  return (
    <div className="font-outfit mt-8 space-y-3">
      {/* Titre principal */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-bold text-lg  text-slate-900">
          Détail des visites par classe
        </h3>
      </div>
      
      {/* Liste des carrousels */}
      <div className="space-y-8">
        {consultationStats.classes.map((classConsultations, index) => (
          <AssocClassConsultationCarousel key={index} classConsultations={classConsultations} />
        ))}
      </div>
    </div>
  );
};

export default AssocVisitStatsPerClass;