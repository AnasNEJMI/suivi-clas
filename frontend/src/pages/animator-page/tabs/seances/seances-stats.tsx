import type { SeancesByScolarYearEntry } from '@/api/animator/seances.types';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import {
  GraduationCapIcon,
  MessageCircleQuestionIcon,
  NotebookTextIcon,
  RotateCwFadingClockIcon,
} from 'lucide-react';
import { useMemo } from 'react';

const SeancesStats = ({
  seancesByScolarYear,
}: {
  seancesByScolarYear: SeancesByScolarYearEntry[];
}) => {
  const seancesData = seancesByScolarYear[0];

  // Calcul des statistiques globales
  const { seancesTotal, bilansTotal, bilansCompletedTotal, qcmsTotal } =
    useMemo(() => {
      let seances = 0;
      let bilans = 0;
      let bilansCompleted = 0;
      let qcms = 0;

      if (seancesData && seancesData.classes) {
        for (let i = 0; i < seancesData.classes.length; i++) {
          const clas = seancesData.classes[i]!;
          seances += clas.seances.length;
          for (let j = 0; j < clas.seances.length; j++) {
            const seance = clas.seances[j];
            bilans += seance.studentBilans.length;
            bilansCompleted += seance.studentBilans.filter(
              (s) => s.bilan !== null
            ).length;
            qcms += seance.studentBilans.filter(
              (s) => s.bilan !== null && s.bilan.qcm !== null
            ).length;
          }
        }
      }

      return {
        seancesTotal: seances,
        bilansTotal: bilans,
        bilansCompletedTotal: bilansCompleted,
        qcmsTotal: qcms,
      };
    }, [seancesData]);


  // État vide
  if (!seancesData || seancesData.classes.length === 0) {
    return (
      <div className="font-outfit space-y-3">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
          Bilan de l'année
        </h3>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title="Aucune séance enregistrée pour le moment."
          description="Les statistiques des séances réalisées seront affichées ici dès leur enregistrement."
        />
      </div>
    );
  }

  return (
    <div className="font-outfit space-y-3">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
        Bilan de l'année
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* 1. Séances réalisées (Pleine largeur col-span-2 sur mobile, 1 col sur lg) */}
        <div className="col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCapIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {seancesTotal}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            Séances réalisées
          </h4>
        </div>

        {/* 2. Bilans soumis (Moitié col-span-1 sur mobile, 1 col sur lg) */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 group-hover:scale-105 transition-transform shrink-0">
              <NotebookTextIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {bilansCompletedTotal}
              <span className="text-xs sm:text-base font-bold text-slate-400 dark:text-slate-600">
                /{bilansTotal}
              </span>
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            Bilans soumis
          </h4>
        </div>

        {/* 3. QCMs générés (Moitié col-span-1 sur mobile, 1 col sur lg) */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 group-hover:scale-105 transition-transform shrink-0">
              <MessageCircleQuestionIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {qcmsTotal}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            QCMs générés
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SeancesStats;