import type { PresenceStatsPerScolarYear } from "@/api/association-member/apiCalls";
import AssocClassPresenceCarousel from "./class-presence-carousel";
import { RotateCwFadingClockIcon } from "lucide-react";
import { EmptyStateCard } from "@/components/ui/empty-state-card";

const AssocPresenceStatsPerClass = ({
  presenceStatsPerScolarYear,
}: {
  presenceStatsPerScolarYear: PresenceStatsPerScolarYear[];
}) => {
  const presenceStats = presenceStatsPerScolarYear[0];

  if (!presenceStats || presenceStats.classes.length === 0) {
    return (
    <div className="space-y-8 font-outfit mt-8">
      {/* En-tête de section */}
      <div>
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Présence par groupe
        </h3>
        <p className="text-slate-500 text-sm lg:text-base mt-1">
          Suivi détaillé de l'assiduité et des taux de présence de chaque élève par classe.
        </p>
      </div>
      <EmptyStateCard
        icon={RotateCwFadingClockIcon}
        title = 'Aucune donnée de présence enregistrée'
        description="Toutes les données de présence enregistrées apparaîtront ici dès que les premières séances auront été réalisées."
      />
    </div>
    );
  }

  return (
    <div className="space-y-8 font-outfit mt-8">
      {/* En-tête de section */}
      <div>
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Présence par groupe
        </h3>
        <p className="text-slate-500 text-sm lg:text-base mt-1">
          Suivi détaillé de l'assiduité et des taux de présence de chaque élève par classe.
        </p>
      </div>

      {/* Carrousels par classe */}
      <div className="space-y-6">
        {presenceStats.classes.map((classPresence, index) => (
          <AssocClassPresenceCarousel key={index} classPresence={classPresence} />
        ))}
      </div>
    </div>
  );
};

export default AssocPresenceStatsPerClass;