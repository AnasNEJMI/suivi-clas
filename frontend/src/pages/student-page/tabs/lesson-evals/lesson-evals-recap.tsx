import type { LessonsBySubject } from '@/api/student/apiCalls';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { cn } from '@/lib/utils';
import {
  AwardIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ClockIcon,
  RotateCwFadingClockIcon,
} from 'lucide-react';

interface LessonEvalsRecapProps {
  lessonsBySubject: LessonsBySubject[];
}

const LessonEvalsRecap = ({ lessonsBySubject }: LessonEvalsRecapProps) => {
  // Une leçon est considérée comme évaluée si eval !== null et evaluation est 'acquiring', 'acquired' ou 'expert'
  const lessonsEvaluated =
    lessonsBySubject?.flatMap((subject) =>
      subject.lessons.filter(
        (lesson) =>
          lesson.eval !== null && lesson.eval.evaluation !== 'notAcquired'
      )
    ) ?? [];

  // État vide
  if (!lessonsBySubject || lessonsEvaluated.length === 0) {
    return (
      <div className="font-outfit space-y-4">
        <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Bilan global de maîtrise
        </h3>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title='Aucune leçon évaluée pour le moment'
          description="Dès que vos animateurs valideront vos leçons, votre bilan de maîtrise global s'affichera ici."
        />
      </div>
    );
  }

  // Calcul des effectifs par niveau de maîtrise
  const totalCount = lessonsEvaluated.length;
  const acquiringCount = lessonsEvaluated.filter(
    (l) => l.eval?.evaluation === 'acquiring'
  ).length;
  const acquiredCount = lessonsEvaluated.filter(
    (l) => l.eval?.evaluation === 'acquired'
  ).length;
  const expertCount = lessonsEvaluated.filter(
    (l) => l.eval?.evaluation === 'expert'
  ).length;

  // Calcul des pourcentages pour la barre de répartition
  const pctAcquiring = totalCount ? (acquiringCount / totalCount) * 100 : 0;
  const pctAcquired = totalCount ? (acquiredCount / totalCount) * 100 : 0;
  const pctExpert = totalCount ? (expertCount / totalCount) * 100 : 0;

  const levels = [
    {
      key: 'acquiring',
      label: 'En cours',
      count: acquiringCount,
      bgColor: 'bg-amber-50/70',
      borderColor: 'border-amber-200/70',
      textColor: 'text-amber-700',
      barColor: 'bg-amber-500',
      icon: ClockIcon,
    },
    {
      key: 'acquired',
      label: 'Acquis',
      count: acquiredCount,
      bgColor: 'bg-emerald-50/70',
      borderColor: 'border-emerald-200/70',
      textColor: 'text-emerald-700',
      barColor: 'bg-emerald-500',
      icon: CheckCircle2Icon,
    },
    {
      key: 'expert',
      label: 'Maîtrise',
      count: expertCount,
      bgColor: 'bg-indigo-50/70',
      borderColor: 'border-indigo-200/70',
      textColor: 'text-indigo-700',
      barColor: 'bg-indigo-500',
      icon: AwardIcon,
    },
  ];

  return (
    <div className="font-outfit space-y-4">
      <h3 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
        Bilan global de maîtrise
      </h3>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-5">
        {/* En-tête : Icône + Compteur de leçons évaluées */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center shrink-0 shadow-2xs">
              <BookOpenIcon className="size-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">
                Suivi de progression
              </p>
              <h4 className="text-base font-bold text-slate-800">
                Niveau d'assimilation des cours
              </h4>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {totalCount}
            </span>
            <p className="text-xs font-medium text-slate-400">
              {totalCount > 1 ? 'Leçons évaluées' : 'Leçon évaluée'}
            </p>
          </div>
        </div>

        {/* Barre de répartition segmentée */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500">
            <span>Répartition par niveau</span>
            <span>
              {Math.round(pctAcquired + pctExpert)}% d'acquisition confirmée
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
            {pctAcquiring > 0 && (
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${pctAcquiring}%` }}
                title={`En cours : ${acquiringCount}`}
              />
            )}
            {pctAcquired > 0 && (
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${pctAcquired}%` }}
                title={`Acquis : ${acquiredCount}`}
              />
            )}
            {pctExpert > 0 && (
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${pctExpert}%` }}
                title={`Maîtrise : ${expertCount}`}
              />
            )}
          </div>
        </div>

        {/* Cartes métriques par niveau (3 colonnes) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {levels.map((lvl) => {
            const Icon = lvl.icon;
            return (
              <div
                key={lvl.key}
                className={cn(
                  'p-3.5 rounded-xl border flex flex-col justify-between transition-all duration-200',
                  lvl.bgColor,
                  lvl.borderColor
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('text-xs font-bold', lvl.textColor)}>
                    {lvl.label}
                  </span>
                  <Icon className={cn('size-4 opacity-75', lvl.textColor)} />
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={cn('text-2xl font-black tracking-tight', lvl.textColor)}>
                    {lvl.count}
                  </span>
                  <span className={cn('text-[11px] font-semibold opacity-60', lvl.textColor)}>
                    {lvl.count > 1 ? 'leçons' : 'leçon'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LessonEvalsRecap;