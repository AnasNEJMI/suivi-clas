import type { BilanEntry } from '@/api/student/apiCalls';
import {
  CalendarCheck2Icon,
  CalendarIcon,
  CalendarX2Icon,
  PieChartIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  SparklesIcon,
} from 'lucide-react';
import { useMemo } from 'react';

const StudentSeanceStats = ({ bilans }: { bilans: BilanEntry[] }) => {
  let presentBilansCount: string | number = '';
  let absentBilansCount: string | number = '';
  let presenceRate: string | number = '';

  if (bilans.length === 0) {
    presentBilansCount = '-';
    absentBilansCount = '-';
    presenceRate = '-';
  } else {
    presentBilansCount = bilans.filter((b) => b.presence).length;
    absentBilansCount = bilans.filter((b) => !b.presence).length;
    presenceRate = Math.round((100 * presentBilansCount) / bilans.length);
  }

  // Dynamic status flourish badge based on attendance rate
  const rateStatus = useMemo(() => {
    if (typeof presenceRate !== 'number') return null;
    if (presenceRate >= 90) {
      return {
        label: 'Excellente assiduité',
        className:
          'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60',
        icon: SparklesIcon,
      };
    }
    if (presenceRate >= 75) {
      return {
        label: 'Bonne assiduité',
        className:
          'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60',
        icon: CheckCircle2Icon,
      };
    }
    return {
      label: 'Attention aux absences',
      className:
        'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60',
      icon: AlertTriangleIcon,
    };
  }, [presenceRate]);

  return (
    <div className="mt-8 grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 font-outfit">
      {/* Séances réalisées */}
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-105 transition-transform shrink-0">
            <CalendarIcon className="size-4 sm:size-5" />
          </div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            {bilans.length}
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          Séances réalisées
        </h4>

        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50">
          Enregistrées
        </span>
      </div>

      {/* Nombre de présences */}
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 group-hover:scale-105 transition-transform shrink-0">
            <CalendarCheck2Icon className="size-4 sm:size-5" />
          </div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
            {presentBilansCount}
            <span className="text-xs sm:text-base font-bold text-slate-400 dark:text-slate-600">
              /{bilans.length}
            </span>
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          Nombre de présences
        </h4>

        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50">
          <CheckCircle2Icon className="size-3" /> Validées
        </span>
      </div>

      {/* Nombre d'absences */}
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 group-hover:scale-105 transition-transform shrink-0">
            <CalendarX2Icon className="size-4 sm:size-5" />
          </div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">
            {absentBilansCount}
            <span className="text-xs sm:text-base font-bold text-slate-400 dark:text-slate-600">
              /{bilans.length}
            </span>
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          Nombre d'absences
        </h4>

        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/50">
          Non présent(e)
        </span>
      </div>

      {/* Taux de présence */}
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 group-hover:scale-105 transition-transform shrink-0">
            <PieChartIcon className="size-4 sm:size-5" />
          </div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
            {presenceRate}
            {typeof presenceRate === 'number' && (
              <span className="text-base sm:text-2xl">%</span>
            )}
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          Taux de présence
        </h4>

        {rateStatus ? (
          <span
            className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${rateStatus.className}`}
          >
            <rateStatus.icon className="size-3 shrink-0" /> {rateStatus.label}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <TrendingUpIcon className="size-3 shrink-0" /> Aucune donnée
          </span>
        )}
      </div>
    </div>
  );
};

export default StudentSeanceStats;