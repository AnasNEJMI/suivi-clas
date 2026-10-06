import { useMemo } from 'react';
import type { QcmStatsPerScolarYear, StudentQcmStats } from '@/api/association-member/apiCalls';
import { 
  FileCheck2Icon, 
  FileClockIcon, 
  AlertCircleIcon, 
  TrophyIcon, 
  ArrowLeftIcon, 
  ArrowRight,
  RotateCwFadingClockIcon,
  HelpCircleIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface AssocQCMStatsRecapProps {
  qcmStatsPerScolarYear: QcmStatsPerScolarYear[];
}

const AssocQCMStatsRecap = ({ qcmStatsPerScolarYear }: AssocQCMStatsRecapProps) => {
  const isMobile = useIsMobile();
  const qcmStats = qcmStatsPerScolarYear?.[0];

  const stats = useMemo(() => {
    if (!qcmStats || !qcmStats.classes || qcmStats.classes.length === 0) {
      return {
        totalQcmsAssigned: 0,
        totalQcmsCompleted: 0,
        totalQcmsPending: 0,
        completionRate: 0,
        pendingRate: 0,
        totalStudents: 0,
        studentsWithPendingCount: 0,
        studentsWithPending: [],
        bestClass: null as { label: string; rate: number } | null,
      };
    }

    let totalQcmsAssigned = 0;
    let totalQcmsCompleted = 0;
    let totalStudents = 0;

    // Tableau pour stocker les détails des élèves ayant des QCMs non terminés
    const studentsWithPending: {
      class: { id: number; label: string };
      student: StudentQcmStats;
      pendingCount: number;
      completedCount: number;
      totalCount: number;
      rate: number;
    }[] = [];

    const classStats: { label: string; completed: number; total: number; rate: number }[] = [];

    qcmStats.classes.forEach((cls) => {
      let classCompleted = 0;
      let classTotal = 0;

      cls.students.forEach((student) => {
        totalStudents++;
        const studentTotal = student.totalQcms || 0;
        const studentCompleted = student.qcmCompletedCount || 0;
        const studentPending = Math.max(0, studentTotal - studentCompleted);

        totalQcmsAssigned += studentTotal;
        totalQcmsCompleted += studentCompleted;

        classCompleted += studentCompleted;
        classTotal += studentTotal;

        if (studentPending > 0) {
          const studentRate = studentTotal > 0 ? Math.round((studentCompleted / studentTotal) * 100) : 0;
          studentsWithPending.push({
            class: cls.class,
            student,
            pendingCount: studentPending,
            completedCount: studentCompleted,
            totalCount: studentTotal,
            rate: studentRate,
          });
        }
      });

      if (classTotal > 0) {
        classStats.push({
          label: cls.class.label,
          completed: classCompleted,
          total: classTotal,
          rate: Math.round((classCompleted / classTotal) * 100),
        });
      }
    });

    const totalQcmsPending = Math.max(0, totalQcmsAssigned - totalQcmsCompleted);
    const completionRate = totalQcmsAssigned > 0 ? Math.round((totalQcmsCompleted / totalQcmsAssigned) * 100) : 0;
    const pendingRate = totalQcmsAssigned > 0 ? Math.round((totalQcmsPending / totalQcmsAssigned) * 100) : 0;

    classStats.sort((a, b) => b.rate - a.rate);
    const bestClass = classStats[0] ? { label: classStats[0].label, rate: classStats[0].rate } : null;

    return {
      totalQcmsAssigned,
      totalQcmsCompleted,
      totalQcmsPending,
      completionRate,
      pendingRate,
      totalStudents,
      studentsWithPendingCount: studentsWithPending.length,
      studentsWithPending,
      bestClass,
    };
  }, [qcmStats]);

  // État vide
  if (!qcmStats || !qcmStats.classes || qcmStats.classes.length === 0) {
    return (
      <div className="font-outfit border-2 border-dashed border-slate-200/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50">
        <div className="p-3.5 rounded-full bg-slate-100 text-slate-400 mb-3">
          <RotateCwFadingClockIcon className="size-8" />
        </div>
        <h4 className="text-base font-semibold text-slate-800">
          Les données de QCMs n'ont pas encore été enregistrées
        </h4>
        <p className="text-xs text-slate-500 max-w-md mt-1">
          Toutes les statistiques de réponses et de complétion des QCMs par les élèves apparaîtront ici dès leur soumission.
        </p>
      </div>
    );
  }

  return (
    <div className="font-outfit">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Bilan des QCMs
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1.5">
          <HelpCircleIcon className="size-3.5 text-slate-400" />
          {stats.totalQcmsAssigned} QCMs assignés au total
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 mt-4">
        
        {/* Card 1: Taux de complétion global */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Complétés
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.completionRate}%
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
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
              <strong className="text-emerald-700 font-semibold">{stats.totalQcmsCompleted}</strong> / {stats.totalQcmsAssigned} répondu(s)
            </p>
          </div>
        </div>

        {/* Card 2: QCMs en attente */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                En attente
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.totalQcmsPending}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  ({stats.pendingRate}%)
                </span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <FileClockIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.pendingRate}%` }}
              />
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
              Reste à compléter par les élèves
            </p>
          </div>
        </div>

        {/* Card 3: Élèves à relancer avec Drawer */}
        <Drawer direction={isMobile ? "left" : "right"}>
          <DrawerTrigger asChild>
            <button className="text-left rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 hover:shadow-md transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              <div className="flex items-start justify-between gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Élèves à relancer
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                      {stats.studentsWithPendingCount}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                      / {stats.totalStudents}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  "p-1.5 sm:p-2.5 rounded-xl border shrink-0 transition-colors",
                  stats.studentsWithPendingCount > 0 
                    ? "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-100" 
                    : "bg-slate-50 border-slate-100 text-slate-400"
                )}>
                  <AlertCircleIcon className="size-5 sm:size-6" />
                </div>
              </div>

              <p className="text-[11px] font-medium text-slate-500 truncate w-full flex justify-end">
                {stats.studentsWithPendingCount > 0 ? (
                  <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                    Voir la liste <ArrowRight className="size-3.5 text-slate-900" />
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold">Tous les QCMs sont faits</span>
                )}
              </p>
            </button>
          </DrawerTrigger>

          <DrawerContent className="font-outfit">
            <div className="max-w-2xl w-full mx-auto">
              <DrawerHeader className="border-b border-slate-200 bg-white px-6 py-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <DrawerClose asChild>
                    <Button variant="ghost" size="sm" className="-ml-2 text-slate-500 hover:text-slate-900 gap-1.5">
                      <ArrowLeftIcon className="size-4" />
                      <span>Fermer</span>
                    </Button>
                  </DrawerClose>
                </div>

                <DrawerTitle className="text-xl font-bold text-slate-900 mt-2">
                  Élèves ayant des QCMs en attente
                </DrawerTitle>
                <DrawerDescription className="text-xs text-slate-500">
                  Liste des élèves n'ayant pas encore complété l'intégralité des QCMs assignés.
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 pt-2 overflow-y-auto">
                {stats.studentsWithPending.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {stats.studentsWithPending
                      .sort((a, b) => b.pendingCount - a.pendingCount)
                      .map((item) => (
                        <div 
                          key={item.student.id} 
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {item.student.firstName} {item.student.lastName}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              Classe : {item.class.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-sm font-bold text-amber-600">
                                {item.pendingCount} QCM{item.pendingCount > 1 ? 's' : ''} en retard
                              </span>
                              <p className="text-[10px] text-slate-400 font-medium">
                                Avancement : {item.completedCount}/{item.totalCount} ({item.rate}%)
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                    <div className="p-4 rounded-full bg-emerald-50 text-emerald-500">
                      <FileCheck2Icon className="size-8" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Aucun retardataire</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Félicitations, tous les élèves ont soumis l'ensemble de leurs QCMs !
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Card 4: Meilleure classe (Complétion QCM) */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-violet-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Meilleure classe
              </span>
              {!isMobile && (
                <span className="font-bold text-lg sm:text-xl text-slate-900 truncate max-w-35">
                  {stats.bestClass ? stats.bestClass.label : 'N/A'}
                </span>
              )}
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 shrink-0">
              <TrophyIcon className="size-5 sm:size-6" />
            </div>
          </div>

          {isMobile && (
            <span className="font-bold text-lg sm:text-xl text-slate-900 truncate">
              {stats.bestClass ? stats.bestClass.label : 'N/A'}
            </span>
          )}

          <p className="text-[11px] sm:text-[11px] font-medium text-slate-500 truncate">
            {stats.bestClass ? (
              <>
                Complétion : <strong className="text-violet-700 font-bold">{stats.bestClass.rate}%</strong>
              </>
            ) : (
              'Aucune donnée'
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AssocQCMStatsRecap;