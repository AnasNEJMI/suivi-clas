import type { SeancesByScolarYearEntry } from '@/api/animator/seances.types';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import {
  CheckCircle2Icon,
  MessageCircleQuestionIcon,
  RotateCwFadingClockIcon,
  TrophyIcon,
} from 'lucide-react';
import { useMemo } from 'react';

const AnimQcmsStatsCard = ({
  seancesByScolarYear,
}: {
  seancesByScolarYear: SeancesByScolarYearEntry[];
}) => {
  const seancesData = seancesByScolarYear[0];

  // Calcul des statistiques de QCM
  const { qcmsCount, qcmCompletionRate, qcmAverageScore } = useMemo(() => {
    if (!seancesData || !seancesData.classes) {
      return { qcmsCount: 0, qcmCompletionRate: 0, qcmAverageScore: '0' };
    }

    const bilans = seancesData.classes.flatMap((c) =>
      c.seances.flatMap((s) => s.studentBilans)
    );

    const qcms = bilans
      .map((bilan) => bilan.bilan?.qcm)
      .filter((qcm): qcm is NonNullable<typeof qcm> => qcm !== null && qcm !== undefined);

    const count = qcms.length;
    if (count === 0) {
      return { qcmsCount: 0, qcmCompletionRate: 0, qcmAverageScore: '0' };
    }

    // Calcul du taux de complétion (%)
    const completedCount = qcms.filter((qcm) => qcm.completed).length;
    const completionRate = Math.round((completedCount / count) * 100);

    // Calcul de la note moyenne ramenée sur 10
    const completedQcms = qcms.filter((qcm) => qcm.completed && qcm.score !== null);
    
    let averageScore = '0';
    if (completedQcms.length > 0) {
      const totalScoreRatio = completedQcms.reduce((acc, qcm) => {
        const totalQuestions = qcm.qcmQuestions?.length || 10;
        return acc + (qcm.score! / totalQuestions);
      }, 0);

      const avgOnTen = (totalScoreRatio / completedQcms.length) * 10;
      averageScore = (Math.round(avgOnTen * 10) / 10).toString(); // Exemple: 8.5
    }

    return {
      qcmsCount: count,
      qcmCompletionRate: completionRate,
      qcmAverageScore: averageScore,
    };
  }, [seancesData]);

  // État vide : Aucune séance ou aucun QCM
  if (!seancesData || seancesData.classes.length === 0 || qcmsCount === 0) {
    return (
      <div className="font-outfit space-y-3 mt-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
          Bilan des QCMs
        </h3>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title="Aucun QCM enregistré pour le moment."
          description="Les statistiques des QCMs générés et complétés seront affichées ici dès leur enregistrement."
        />
      </div>
    );
  }

  return (
    <div className="font-outfit space-y-3">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
        Bilan des QCMs
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* 1. QCMs soumis (Pleine largeur sur mobile, 1 col sur lg) */}
        <div className="col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-105 transition-transform shrink-0">
              <MessageCircleQuestionIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {qcmsCount}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            QCMs soumis
          </h4>
        </div>

        {/* 2. Taux de complétion (1 col) */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 group-hover:scale-105 transition-transform shrink-0">
              <CheckCircle2Icon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {qcmCompletionRate}%
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            QCMs complétés
          </h4>
        </div>

        {/* 3. Note moyenne (1 col) */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 group-hover:scale-105 transition-transform shrink-0">
              <TrophyIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {qcmAverageScore}
              <span className="text-xs sm:text-base font-bold text-slate-400 dark:text-slate-600">
                /10
              </span>
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            Note moyenne
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AnimQcmsStatsCard;