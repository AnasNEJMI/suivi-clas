import type { PresenceStatsPerScolarYear } from "@/api/association-member/apiCalls";
import AssocClassPresenceCarousel from "./class-presence-carousel";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCwFadingClockIcon } from "lucide-react";

const AssocPresenceStatsPerClass = ({
  presenceStatsPerScolarYear,
}: {
  presenceStatsPerScolarYear: PresenceStatsPerScolarYear[];
}) => {
  const presenceStats = presenceStatsPerScolarYear[0];

  if (!presenceStats || presenceStats.classes.length === 0) {
    return (
      <Card className="border-2 border-dashed border-slate-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-2xl bg-slate-50/50 mt-6 p-6 text-center">
        <CardHeader className="p-0 flex flex-col items-center w-full">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <RotateCwFadingClockIcon className="size-6 text-slate-400" />
          </div>
          <CardTitle className="text-base font-bold text-slate-800">
            Aucune donnée de présence enregistrée
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 max-w-md mt-1 leading-relaxed">
            Toutes les données de présence enregistrées apparaîtront ici dès que les premières séances auront été réalisées.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-8 font-outfit mt-10">
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