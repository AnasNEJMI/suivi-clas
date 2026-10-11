import type { SkillEvalClassEntry } from '@/api/animator/skill-evals.types';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { BookCheckIcon, CheckCircle2Icon, Users2Icon } from 'lucide-react';
import { useMemo } from 'react';

const AnimSkillEvalStats = ({ classes }: { classes: SkillEvalClassEntry[] }) => {
  const { totalStudents, evalsSubmitted, evalsRemaining, evalsSubmittedRate } =
    useMemo(() => {
      const studentsTotal = classes.reduce((acc, current) => acc + current.students.length, 0);
      const submitted = classes.reduce(
        (acc, current) =>
          acc +
          current.students.filter(
            (s) => s.skillEval !== null && s.skillEval !== undefined
          ).length,
        0
      );

      const remaining = studentsTotal - submitted;
      const rate = studentsTotal > 0 ? Math.round((submitted / studentsTotal) * 100) : 0;

      return {
        totalStudents: studentsTotal,
        evalsSubmitted: submitted,
        evalsRemaining: remaining,
        evalsSubmittedRate: rate,
      };
    }, [classes]);

  const isComplete = totalStudents > 0 && evalsSubmitted === totalStudents;

  return (
    <div className="font-outfit space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Bilan des évaluations de méthodologie</span>
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Suivi de la progression des bilans de compétences méthodologiques.
          </p>
        </div>
      </div>

      {/* Carte principale avec liseré coloré et design compact */}
      <div className="relative overflow-hidden rounded-3xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        
        {/* Mini cartes de statistiques compactes aux teintes pastel vibrantes */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Élèves */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100/80 dark:border-amber-900/40 shadow-2xs">
            <div className="size-8 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
              <Users2Icon className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-800/70 dark:text-amber-400 uppercase tracking-wider block truncate">
                Élèves SUIVIs
              </span>
              <span className="text-base sm:text-lg font-extrabold text-amber-950 dark:text-white tracking-tight">
                {totalStudents}
              </span>
            </div>
          </div>

          {/* Soumises */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100/80 dark:border-emerald-900/40 shadow-2xs">
            <div className="size-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
              <BookCheckIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-emerald-800/70 dark:text-emerald-400 uppercase tracking-wider block truncate">
                Évaluations
              </span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-950 dark:text-white tracking-tight">
                {evalsSubmitted}
              </span>
            </div>
          </div>
        </div>

        {/* Section de progression épurée */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-400">Progression globale</span>
            <span
              className={cn(
                isComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400 font-extrabold'
              )}
            >
              {evalsSubmittedRate}%
            </span>
          </div>

          <Progress
            className={cn(
              'h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden',
              isComplete
                ? '[&>div]:bg-linear-to-r [&>div]:from-emerald-400 [&>div]:to-emerald-500'
                : '[&>div]:bg-linear-to-r [&>div]:from-indigo-500 [&>div]:via-purple-500 [&>div]:to-pink-500'
            )}
            value={evalsSubmittedRate}
          />

          <div className="flex items-center justify-between text-[11px] font-semibold pt-0.5">
            <span className="text-slate-500">
              {evalsRemaining > 0
                ? `${evalsRemaining} évaluation(s) à réaliser`
                : "Chaque élève suivi a reçu une évaluation de méthodologie."}
            </span>
            {isComplete && (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2Icon className="size-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimSkillEvalStats;