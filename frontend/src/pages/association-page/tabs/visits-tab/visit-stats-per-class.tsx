import type { VisitStatsPerScolarYear } from '@/api/association-member/apiCalls';
import AssocClassVisitCarousel from './class-visit-carousel';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCwFadingClockIcon } from 'lucide-react';

const AssocVisitStatsPerClass = ({ visitStatsPerScolarYear }: { visitStatsPerScolarYear: VisitStatsPerScolarYear[] }) => {
  const visitStats = visitStatsPerScolarYear[0];

  // État vide global
  if (!visitStats || visitStats.classes.length === 0) {
    return (
      <Card className="font-outfit border-2 border-dashed border-slate-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-2xl bg-slate-50/50 mt-6 p-4">
        <CardHeader className="flex flex-col items-center justify-center w-full space-y-3">
          <div className="p-4 rounded-full bg-slate-100 text-slate-400 mb-2">
            <RotateCwFadingClockIcon className="size-8" />
          </div>
          <CardTitle className="text-lg font-bold text-slate-700 text-center text-balance">
            Les données de visites n'ont pas été enregistrées pour le moment.
          </CardTitle>
          <CardDescription className="text-pretty text-sm max-w-xl text-center text-slate-500">
            Toutes les données de visites enregistrées par classe seront affichées ici dès qu'elles seront disponibles.
          </CardDescription>
        </CardHeader>   
      </Card>
    );
  }

  return (
    <div className="font-outfit mt-8 space-y-6">
      {/* Titre principal */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-bold text-lg  text-slate-900">
          Détail des visites par classe
        </h3>
      </div>
      
      {/* Liste des carrousels */}
      <div className="space-y-8">
        {visitStats.classes.map((classVisits, index) => (
          <AssocClassVisitCarousel key={index} classVisits={classVisits} />
        ))}
      </div>
    </div>
  );
};

export default AssocVisitStatsPerClass;