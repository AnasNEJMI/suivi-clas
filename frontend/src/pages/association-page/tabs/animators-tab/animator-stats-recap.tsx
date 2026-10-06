import type { AnimatorStatsPerScolarYear } from '@/api/association-member/apiCalls';
import {
  LibraryIcon,
  FileCheck2Icon,
  HelpCircleIcon,
  TrendingUpIcon,
  UsersIcon,
} from 'lucide-react';
import { useMemo } from 'react';

interface AssocAnimatorStatsRecapProps {
  animatorStatsPerScolarYear: AnimatorStatsPerScolarYear[];
}

const AssocAnimatorStatsRecap = ({
  animatorStatsPerScolarYear,
}: AssocAnimatorStatsRecapProps) => {
  const stats = useMemo(() => {
    const animatorStats = animatorStatsPerScolarYear?.[0];
    if (!animatorStats || !animatorStats.animators?.length) {
      return {
        totalSeances: 0,
        totalBilans: 0,
        totalQcms: 0,
        activeAnimators: 0,
        bilanRate: 0,
        qcmsPerSeance: '0',
      };
    }

    const animators = animatorStats.animators;
    const totalSeances = animators.reduce((acc, a) => acc + (a.totalSeances || 0), 0);
    const totalBilans = animators.reduce((acc, a) => acc + (a.totalBilans || 0), 0);
    const totalQcms = animators.reduce((acc, a) => acc + (a.totalQcms || 0), 0);
    const activeAnimators = animators.length;

    const bilanRate = totalSeances > 0 ? Math.min(100, Math.round((totalBilans / totalSeances) * 100)) : 0;
    const qcmsPerSeance = totalSeances > 0 ? (totalQcms / totalSeances).toFixed(1) : '0';

    return {
      totalSeances,
      totalBilans,
      totalQcms,
      activeAnimators,
      bilanRate,
      qcmsPerSeance,
    };
  }, [animatorStatsPerScolarYear]);

  return (
    <div className="font-outfit space-y-3">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Bilan de l'année
        </h3>
        {stats.activeAnimators > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1.5">
            <UsersIcon className="size-3.5 text-slate-400" />
            {stats.activeAnimators} animateur{stats.activeAnimators > 1 ? 's' : ''} actif{stats.activeAnimators > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* KPI Cards Grid - 2 columns on mobile, 4 columns on large screens */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
        {/* Card 1: Séances réalisées */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Séances réalisées
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.totalSeances}
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
              <LibraryIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <p className="text-[11px] font-medium text-slate-500 truncate">
            <span className="text-blue-700 font-semibold">Total sur l'année</span>
          </p>
        </div>

        {/* Card 2: Bilans soumis */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Bilans soumis
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.totalBilans}
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
              <FileCheck2Icon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.bilanRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Taux de soumission */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-violet-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Taux de soumission
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.bilanRate}%
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 shrink-0">
              <TrendingUpIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <p className="text-[11px] font-medium text-slate-500 truncate">
            {stats.bilanRate >= 80 ? (
              <span className="text-emerald-700 font-semibold">Excellente assiduité</span>
            ) : stats.bilanRate >= 50 ? (
              <span className="text-amber-700 font-semibold">Suivi régulier</span>
            ) : (
              <span className="text-rose-700 font-semibold">À renforcer</span>
            )}
          </p>
        </div>

        {/* Card 4: QCMs envoyés */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                QCMs envoyés
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.totalQcms}
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 shrink-0">
              <HelpCircleIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <p className="text-[11px] font-medium text-slate-500 truncate">
            Moyenne : <strong className="text-amber-700 font-bold">~{stats.qcmsPerSeance}</strong> / séance
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssocAnimatorStatsRecap;