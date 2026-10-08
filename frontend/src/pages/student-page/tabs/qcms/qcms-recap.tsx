import type { QcmEntry } from '@/api/student/apiCalls';
import { cn } from '@/lib/utils';
import {
  ChartPieIcon,
  CheckCircle2Icon,
  Clock8Icon,
  HelpCircleIcon,
  NotebookTextIcon,
  RotateCwFadingClockIcon,
  TrophyIcon,
} from 'lucide-react';
import { useMemo } from 'react';

interface QcmsRecapProps {
  qcms: QcmEntry[];
}

const QcmsRecap = ({ qcms }: QcmsRecapProps) => {
  const stats = useMemo(() => {
    if (!qcms || qcms.length === 0) {
      return {
        totalCount: 0,
        completedCount: 0,
        pendingCount: 0,
        completionRate: 0,
        pendingRate: 0,
        averageGrade: null as number | null,
      };
    }

    const totalCount = qcms.length;
    const completedQcms = qcms.filter((q) => q.completed);
    const completedCount = completedQcms.length;
    const pendingCount = totalCount - completedCount;

    const completionRate = Math.round((completedCount / totalCount) * 100);
    const pendingRate = Math.round((pendingCount / totalCount) * 100);

    // Calcul de la note moyenne sur 10 pour les QCMs complétés
    let totalGradeOn10 = 0;
    let scoredQcmsCount = 0;

    completedQcms.forEach((qcm) => {
      if (
        typeof qcm.score === 'number' &&
        qcm.qcmQuestions &&
        qcm.qcmQuestions.length > 0
      ) {
        // Conversion du score individuel sur 10
        const gradeOn10 = (qcm.score / qcm.qcmQuestions.length) * 10;
        totalGradeOn10 += gradeOn10;
        scoredQcmsCount++;
      }
    });

    const averageGrade =
      scoredQcmsCount > 0
        ? Math.round((totalGradeOn10 / scoredQcmsCount) * 10) / 10
        : null;

    return {
      totalCount,
      completedCount,
      pendingCount,
      completionRate,
      pendingRate,
      averageGrade,
    };
  }, [qcms]);

  /* --- ÉTAT VIDE --- */
  if (!qcms || qcms.length === 0) {
    return (
      <div className="font-outfit border-2 border-dashed border-slate-200/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50">
        <div className="p-3.5 rounded-full bg-slate-100 text-slate-400 mb-3">
          <RotateCwFadingClockIcon className="size-8" />
        </div>
        <h4 className="text-base font-semibold text-slate-800">
          Aucun QCM assigné pour le moment
        </h4>
        <p className="text-xs text-slate-500 max-w-md mt-1">
          Vos questionnaires à remplir et vos statistiques de complétion s'afficheront ici dès qu'un cours comportera un QCM.
        </p>
      </div>
    );
  }

  return (
    <div className="font-outfit">
      {/* En-tête de section */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Bilan des QCMs
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1.5">
          <HelpCircleIcon className="size-3.5 text-slate-400" />
          {stats.totalCount} QCM{stats.totalCount > 1 ? 's' : ''} assigné{stats.totalCount > 1 ? 's' : ''} au total
        </span>
      </div>

      {/* Grille des cartes KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 mt-4">
        {/* Card 1: Complétés (Émeraude) */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Complétés
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.completedCount}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  / {stats.totalCount}
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
              <CheckCircle2Icon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
              Taux de complétion : <strong className="text-emerald-700 font-semibold">{stats.completionRate}%</strong>
            </p>
          </div>
        </div>

        {/* Card 2: En attente / À faire (Ambre) */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                À faire
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.pendingCount}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  / {stats.totalCount}
                </span>
              </div>
            </div>
            <div
              className={cn(
                'p-1.5 sm:p-2.5 rounded-xl border shrink-0 transition-colors',
                stats.pendingCount > 0
                  ? 'bg-amber-50 border-amber-100 text-amber-600'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              )}
            >
              <Clock8Icon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.pendingRate}%` }}
              />
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
              {stats.pendingCount > 0 ? (
                <span >
                  À faire : <span className="text-amber-700 font-semibold">{stats.pendingRate}%</span>
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">Tout est à jour !</span>
              )}
            </p>
          </div>
        </div>

        {/* Card 3: Total Assignés (Sky) */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-sky-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Total Assignés
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.totalCount}
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 shrink-0">
              <NotebookTextIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
              QCMs envoyés
            </p>
          </div>
        </div>

        {/* Card 4: Note Moyenne sur 10 */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-violet-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                {stats.averageGrade !== null ? 'Note Moyenne' : 'Progression'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.averageGrade !== null
                    ? stats.averageGrade
                    : `${stats.completionRate}%`}
                </span>
                {stats.averageGrade !== null && (
                  <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                    / 10
                  </span>
                )}
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 shrink-0">
              {stats.averageGrade !== null ? (
                <TrophyIcon className="size-5 sm:size-6" />
              ) : (
                <ChartPieIcon className="size-5 sm:size-6" />
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
              {stats.averageGrade !== null ? (
                <>
                  Moyenne sur <strong className="text-violet-700 font-bold">{stats.completedCount} QCM(s)</strong>
                </>
              ) : (
                'Complétion globale'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QcmsRecap;