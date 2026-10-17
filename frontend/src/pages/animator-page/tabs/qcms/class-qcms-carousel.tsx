import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { cn } from '@/lib/utils';
import {
  CalendarCheck2Icon,
  GraduationCapIcon,
  RotateCwFadingClockIcon,
  TrophyIcon,
} from 'lucide-react';
import type { QcmEntry, SeancesByClassEntry } from '@/api/animator/seances.types';
import type { ScolarYearEntry } from '@/api/animator/types';
import { useMemo } from 'react';

interface AnimClassQCMCarouselProps {
  classStats: SeancesByClassEntry;
  baseData: ScolarYearEntry;
}

type QCMBucket = {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'm' | 'f';
  qcms: QcmEntry[];
};

const AnimClassQCMCarousel = ({
  classStats,
  baseData,
}: AnimClassQCMCarouselProps) => {
  /* --- Optimisation et traitement des données avec useMemo --- */
  const { students, hasData } = useMemo(() => {
    const bilans = classStats.seances.flatMap((s) => s.studentBilans);
    const qcms = bilans
      .map((bilan) => bilan.bilan?.qcm)
      .filter((qcm): qcm is NonNullable<typeof qcm> => qcm !== null && qcm !== undefined);

    const classData = baseData.classes.find((c) => c.id === classStats.id);
    if (!classData) return { students: [], hasData: false };

    const studentsMap = new Map<number, QCMBucket>();

    // Remplissage à partir des QCM existants
    for (const qcm of qcms) {
      if (!studentsMap.has(qcm.studentId)) {
        const student = baseData.classes
          .flatMap((c) => c.students)
          .find((s) => s.id === qcm.studentId);
        if (!student) continue;
        studentsMap.set(qcm.studentId, {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          gender: student.gender,
          qcms: [],
        });
      }
      studentsMap.get(qcm.studentId)!.qcms.push(qcm);
    }

    // Inclusion de tous les élèves de la classe même sans QCM
    for (const student of classData.students) {
      if (!studentsMap.has(student.id)) {
        studentsMap.set(student.id, {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          gender: student.gender,
          qcms: [],
        });
      }
    }

    // Tri par taux de complétion décroissant
    const sortedStudents = [...studentsMap.values()].sort((a, b) => {
      const aCompleted = a.qcms.filter((q) => q.completed).length;
      const aTotal = a.qcms.length;
      const aRate = aTotal > 0 ? Math.round((aCompleted / aTotal) * 100) : -1;

      const bCompleted = b.qcms.filter((q) => q.completed).length;
      const bTotal = b.qcms.length;
      const bRate = bTotal > 0 ? Math.round((bCompleted / bTotal) * 100) : -1;

      return bRate - aRate;
    });

    return { students: sortedStudents, hasData: qcms.length > 0 };
  }, [classStats, baseData]);

  return (
    <div className="bg-slate-50/60 border border-slate-200/70 rounded-3xl p-5 lg:p-6 shadow-2xs font-outfit">
      {/* Header de la classe */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-linear-to-tr from-sky-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold shadow-2xs shrink-0">
            <GraduationCapIcon className="size-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug">
              {classStats.label}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Suivi des questionnaires par élève
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs">
          {students.length} {students.length > 1 ? 'élèves' : 'élève'}
        </span>
      </div>

      {/* État vide si aucun élève ou aucune donnée */}
      {!hasData || students.length === 0 ? (
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title="Aucune donnée de QCM enregistrée pour ce groupe"
          description="Les statistiques individuelles des QCM s'afficheront ici automatiquement."
          className="bg-white/60 border-slate-200/80 rounded-2xl h-48"
        />
      ) : (
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent className="-ml-3 py-2 px-1">
            {students.map((student) => {
              const qcmsCompleted = student.qcms.filter((q) => q.completed).length;
              const totalQcms = student.qcms.length;
              const qcmCompletionRate =
                totalQcms > 0 ? Math.round((qcmsCompleted / totalQcms) * 100) : -1;

              const qcmTotalPoints = student.qcms.reduce(
                (acc, cur) => acc + (cur?.score ?? 0),
                0
              );
              const averageQCMScore =
                totalQcms > 0 && qcmsCompleted > 0
                  ? (qcmTotalPoints / qcmsCompleted).toFixed(1)
                  : '-';

              const initials = `${student.firstName?.[0] ?? ''}${
                student.lastName?.[0] ?? ''
              }`.toUpperCase();

              return (
                <CarouselItem key={student.id} className="pl-3 basis-64 sm:basis-72 shrink-0">
                  <div
                    className={cn(
                      'rounded-2xl w-full h-full p-4.5 font-outfit flex flex-col justify-between bg-white border shadow-2xs transition-all duration-200 hover:shadow-md',
                      qcmCompletionRate >= 75
                        ? 'border-emerald-200/80 hover:border-emerald-300'
                        : qcmCompletionRate >= 0
                        ? 'border-amber-200/80 hover:border-amber-300'
                        : 'border-slate-200/80'
                    )}
                  >
                    {/* Identité de l'élève */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-sm font-bold text-slate-900 truncate">
                          {student.firstName}{' '}
                          <span className="uppercase">{student.lastName}</span>
                        </h5>
                        <span className="text-[11px] font-medium text-slate-500 truncate block">
                          {classStats.label}
                        </span>
                      </div>
                    </div>

                    {/* Statistiques QCM détaillées */}
                    <div className="space-y-2 py-2.5 border-t border-b border-slate-100 text-xs font-medium text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <CalendarCheck2Icon className="size-3.5 text-slate-700" />
                          QCM envoyés
                        </span>
                        <span className="font-bold text-slate-800">{totalQcms}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <CalendarCheck2Icon className="size-3.5 text-slate-700" />
                          Complétés
                        </span>
                        <span
                          className={cn(
                            'font-bold',
                            qcmCompletionRate >= 75 ? 'text-emerald-700' : 'text-amber-700'
                          )}
                        >
                          {qcmsCompleted} / {totalQcms}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <TrophyIcon className="size-3.5 text-amber-500" />
                          Note moyenne
                        </span>
                        <span className="font-bold text-slate-900">
                          {averageQCMScore} / 10
                        </span>
                      </div>
                    </div>

                    {/* Indicateur de réussite bas de carte */}
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-slate-700 font-medium">Taux de complétion</span>
                      <span
                        className={cn(
                          'px-2.5 py-0.5 rounded-full font-bold border shadow-2xs',
                          qcmCompletionRate >= 75
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                            : qcmCompletionRate >= 0
                            ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        )}
                      >
                        {qcmCompletionRate >= 0 ? `${qcmCompletionRate}%` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Contrôles du Carrousel */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 mt-3">
            <div className="flex items-center gap-2">
              <CarouselPrevious
                variant="outline"
                className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs"
              />
              <CarouselNext
                variant="outline"
                className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs"
              />
            </div>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default AnimClassQCMCarousel;