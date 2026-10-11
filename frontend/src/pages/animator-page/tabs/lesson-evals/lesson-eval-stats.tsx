import type { LessonEvalClassEntry } from '@/api/animator/lesson-evals.types';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import {
  BookCheckIcon,
  GraduationCapIcon,
  RotateCwFadingClockIcon,
  Users2Icon,
} from 'lucide-react';
import { useMemo } from 'react';

const AnimLessonEvalStats = ({
  classes,
}: {
  classes: LessonEvalClassEntry[];
}) => {
  // Calcul optimisé des métriques
  const { totalStudents, lessonsEvaluatedCount, avgEvalsPerStudent } = useMemo(() => {
    if (!classes || classes.length === 0) {
      return { totalStudents: 0, lessonsEvaluatedCount: 0, avgEvalsPerStudent: '0' };
    }

    const studentsTotal = classes.reduce((acc, curr) => acc + curr.students.length, 0);

    const evalsTotal = classes
      .flatMap((c) => c.students)
      .flatMap((s) => s.lessonEvalsBySubject)
      .reduce((acc, subjectEval) => acc + subjectEval.lessonEvals.length, 0);

    const avg = studentsTotal > 0 ? (evalsTotal / studentsTotal).toFixed(1) : '0';

    return {
      totalStudents: studentsTotal,
      lessonsEvaluatedCount: evalsTotal,
      avgEvalsPerStudent: avg,
    };
  }, [classes]);

  // État vide
  if (!classes || classes.length === 0 || totalStudents === 0) {
    return (
      <div className="font-outfit space-y-3">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
          Bilan des évaluations de leçons
        </h3>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title="Aucune évaluation de leçon enregistrée."
          description="Les statistiques des évaluations de leçons soumises par vous s'afficheront ici."
        />
      </div>
    );
  }

  return (
    <div className="font-outfit space-y-3">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
        Bilan des évaluations de leçons
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* 1. Élèves suivis (Pleine largeur sur mobile, 1 col sur lg) */}
        <div className="col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-105 transition-transform shrink-0">
              <Users2Icon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {totalStudents}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            Élèves suivis
          </h4>
        </div>

        {/* 2. Évaluations soumises (1 col) */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 group-hover:scale-105 transition-transform shrink-0">
              <BookCheckIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {lessonsEvaluatedCount}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            Évaluations soumises
          </h4>
        </div>

        {/* 3. Moyenne par élève (1 col) */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between items-center text-center gap-2.5 sm:gap-3 group">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCapIcon className="size-4 sm:size-5" />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {avgEvalsPerStudent}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                Leçons évaluées / élève
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AnimLessonEvalStats;