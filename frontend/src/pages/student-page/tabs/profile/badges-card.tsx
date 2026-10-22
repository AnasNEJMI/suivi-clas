import type { BilanEntry, LessonsBySubject } from '@/api/student/apiCalls';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  TrophyIcon,
  SparklesIcon,
  FlameIcon,
  ClockIcon,
  TargetIcon,
  CrownIcon,
  GlobeIcon,
  BookCheckIcon,
  CheckCheckIcon,
  AwardIcon,
  GraduationCapIcon,
  LockIcon,
} from 'lucide-react';

interface BadgesCardProps {
  bilans: BilanEntry[];
  lessonsBySubject: LessonsBySubject[];
}

export const BadgesCard = ({ bilans, lessonsBySubject }: BadgesCardProps) => {
  // 1. Calcul de la série de présence consécutive (Streak)
  const sortedBilans = [...bilans].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let currentStreak = 0;
  let maxStreak = 0;
  for (const b of sortedBilans) {
    if (b.presence) {
      currentStreak += 1;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  // 2. Calcul du temps total passé en séance (en minutes)
  const totalMinutesSpent = bilans
    .filter((b) => b.presence && b.seance?.seanceDuration?.durationMin)
    .reduce((acc, b) => acc + b.seance.seanceDuration.durationMin, 0);

  // 3. Calculs des QCM
  const completedQcms = bilans
    .map((b) => b.qcm)
    .filter((q): q is NonNullable<typeof q> => Boolean(q && q.completed));

  const hasPerfectScore = completedQcms.some((q) => q.score === 100);

  // Série de 3 QCM consécutifs avec score >= 80%
  let qcmStreak = 0;
  let hasThreeHighQcmStreak = false;
  for (const q of completedQcms) {
    if ((q.score ?? 0) >= 80) {
      qcmStreak += 1;
      if (qcmStreak >= 3) {
        hasThreeHighQcmStreak = true;
        break;
      }
    } else {
      qcmStreak = 0;
    }
  }

  // 4. Calculs des leçons et évaluations "EXPERT" par matière
  const subjectsWithEvaluatedLessons = lessonsBySubject.filter((s) =>
    s.lessons.some((l) => l.eval !== null)
  );

  const totalEvaluatedLessons = lessonsBySubject
    .flatMap((s) => s.lessons)
    .filter((l) => l.eval !== null).length;

  const hasMasteredSubject = lessonsBySubject.some(
    (s) => s.lessons.length >= 3 && s.lessons.every((l) => l.eval !== null)
  );

  // Nouveau Badge : au moins 50% de leçons Expert dans au moins une matière
  const hasHalfExpertSubject = lessonsBySubject.some((subject) => {
    if (!subject.lessons || subject.lessons.length === 0) return false;
    const expertCount = subject.lessons.filter(
      (l) =>
        l.eval &&
        String(l.eval.evaluation).toUpperCase() === 'EXPERT'
    ).length;
    return expertCount / subject.lessons.length >= 0.5;
  });

  const totalQcmsGiven = bilans.filter((b) => b.qcm).length;
  const is100PercentQcmSubmitted =
    totalQcmsGiven > 0 && completedQcms.length === totalQcmsGiven;

  const rawBadges = [
    {
      id: 'streak-5',
      title: "Série d'Acier",
      description: '5 séances présentatrices consécutives',
      icon: FlameIcon,
      unlocked: maxStreak >= 5,
      activeBg: 'bg-amber-500 text-white',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'marathon',
      title: 'Marathonien',
      description: 'plus de 15h de séances cumulées',
      icon: ClockIcon,
      unlocked: totalMinutesSpent >= 900,
      activeBg: 'bg-sky-500 text-white',
      badgeStyle: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    {
      id: 'perfect-qcm',
      title: 'Tir Parfait',
      description: 'Obtenir 100% à un QCM',
      icon: TargetIcon,
      unlocked: hasPerfectScore,
      activeBg: 'bg-emerald-500 text-white',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'expert-subject',
      title: 'Spécialiste',
      description: '≥ 50% leçons Expert dans 1 matière',
      icon: GraduationCapIcon,
      unlocked: hasHalfExpertSubject,
      activeBg: 'bg-purple-600 text-white',
      badgeStyle: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      id: 'qcm-streak',
      title: 'Infaillible',
      description: '3 QCM consécutifs ≥ 80%',
      icon: CrownIcon,
      unlocked: hasThreeHighQcmStreak,
      activeBg: 'bg-indigo-500 text-white',
      badgeStyle: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      id: 'polyvalent',
      title: 'Touche-à-Tout',
      description: 'Évalué dans 3 matières différentes',
      icon: GlobeIcon,
      unlocked: subjectsWithEvaluatedLessons.length >= 3,
      activeBg: 'bg-teal-500 text-white',
      badgeStyle: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      id: 'explorer-15',
      title: 'Grand Explorateur',
      description: '15 leçons évaluées au total',
      icon: BookCheckIcon,
      unlocked: totalEvaluatedLessons >= 15,
      activeBg: 'bg-blue-600 text-white',
      badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'subject-master',
      title: 'Matière Dominée',
      description: '100% des leçons étudiées sur 1 matière',
      icon: CheckCheckIcon,
      unlocked: hasMasteredSubject,
      activeBg: 'bg-rose-500 text-white',
      badgeStyle: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    {
      id: 'all-qcms',
      title: 'Objectif 100%',
      description: 'Tous les QCM proposés complétés',
      icon: AwardIcon,
      unlocked: is100PercentQcmSubmitted,
      activeBg: 'bg-orange-500 text-white',
      badgeStyle: 'bg-orange-50 text-orange-800 border-orange-200',
    },
  ];

  // Badge Méta "Légende de l'Année" (débloqué à partir de 6 badges)
  const initialUnlockedCount = rawBadges.filter((b) => b.unlocked).length;
  const isLegend = initialUnlockedCount == rawBadges.length;

  const badges = [
    ...rawBadges,
    {
      id: 'legend-year',
      title: "Légende de l'Année",
      description: `Débloquer tous les badges`,
      icon: TrophyIcon,
      unlocked: isLegend,
      activeBg: 'bg-linear-to-r from-amber-400 to-amber-600 text-slate-950',
      badgeStyle: 'bg-amber-100 text-amber-950 border-amber-300 font-extrabold',
    },
  ];

  const totalUnlocked = badges.filter((b) => b.unlocked).length;

  return (
    <Card className="bg-slate-50/60 border-slate-200/60 rounded-3xl p-5 lg:p-6 shadow-none">
      <CardHeader className="p-0 mb-4 flex flex-col items-center justify-between">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-2xs">
            <TrophyIcon className="size-5 fill-amber-950" />
          </div>
          Objectifs & Trophées
        </CardTitle>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-nowrap bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
          <SparklesIcon className="size-3.5 text-amber-500" />
          {totalUnlocked} / {badges.length} débloqués
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={cn(
                  'p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all duration-200 relative',
                  badge.unlocked
                    ? 'bg-white border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5'
                    : 'bg-slate-100/60 border-slate-200/60 opacity-60'
                )}
              >
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-2 font-bold shadow-2xs',
                    badge.unlocked
                      ? badge.activeBg
                      : 'bg-slate-200 text-slate-400'
                  )}
                >
                  {badge.unlocked ? (
                    <Icon className="size-5" />
                  ) : (
                    <LockIcon className="size-4" />
                  )}
                </div>

                <h5 className="font-bold text-slate-900 text-xs lg:text-sm leading-tight">
                  {badge.title}
                </h5>
                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                  {badge.description}
                </p>

                {badge.unlocked ? (
                  <span
                    className={cn(
                      'mt-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full border',
                      badge.badgeStyle
                    )}
                  >
                    Débloqué !
                  </span>
                ) : (
                  <span className="mt-2 text-[10px] font-semibold text-slate-400">
                    En cours
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgesCard;