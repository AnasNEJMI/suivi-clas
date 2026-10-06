import { useMemo } from 'react';
import type { PresenceStatsPerScolarYear, StudentPresenceStats } from '@/api/association-member/apiCalls';
import { 
  CalendarCheck2Icon, 
  CalendarX2Icon, 
  AlertTriangleIcon, 
  TrophyIcon,
  UsersIcon,
  ArrowLeftIcon,
  ArrowRight
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
} from '@/components/ui/drawer'; // Adaptez le chemin selon votre projet (ou importez 'Sheet' si vous utilisez un tiroir latéral)
import { Button } from '@/components/ui/button';

interface AssocPresenceStatsRecapProps {
  presenceStatsPerScolarYear: PresenceStatsPerScolarYear[];
}

const PRESENCE_RATE_AT_RISK = 60;

const AssocPresenceStatsRecap = ({ presenceStatsPerScolarYear }: AssocPresenceStatsRecapProps) => {
  const isMobile = useIsMobile();
  const presenceStats = presenceStatsPerScolarYear[0];

  const stats = useMemo(() => {
    if (!presenceStats || !presenceStats.classes || presenceStats.classes.length === 0) {
      return {
        totalSeances: 0,
        totalPresent: 0,
        totalAbsent: 0,
        presenceRate: 0,
        absenceRate: 0,
        totalStudents: 0,
        atRiskStudentsCount: 0,
        atRiskStudents: [],
        bestClass: null as { label: string; rate: number } | null,
      };
    }

    let totalPresent = 0;
    let totalAbsent = 0;
    let totalStudents = 0;
    let atRiskStudentsCount = 0;
    
    // Tableau pour stocker les détails des élèves en alerte pour le Drawer
    const atRiskStudents: { class : {id : number, label : string}; student : StudentPresenceStats, rate : number }[] = [];
    const classStats: { label: string; present: number; total: number; rate: number }[] = [];

    presenceStats.classes.forEach((cls) => {
      let classPresent = 0;
      let classTotal = 0;

      cls.students.forEach((student) => {
        totalStudents++;
        const studentTotal = student.presence + student.absence;
        totalPresent += student.presence;
        totalAbsent += student.absence;

        classPresent += student.presence;
        classTotal += studentTotal;

        if (studentTotal > 0) {
          const studentRate = Math.round((student.presence / studentTotal) * 100);
          
          // Ajustement à < PRESENCE_RATE_AT_RISK pour correspondre au label de votre carte UI
          if (studentRate < PRESENCE_RATE_AT_RISK) {
            atRiskStudentsCount++;

            atRiskStudents.push({
              class : cls.class,
              student,
              rate: studentRate
            });
          }
        }
      });

      if (classTotal > 0) {
        classStats.push({
          label: cls.class.label,
          present: classPresent,
          total: classTotal,
          rate: Math.round((classPresent / classTotal) * 100),
        });
      }
    });

    const totalSeances = totalPresent + totalAbsent;
    const presenceRate = totalSeances > 0 ? Math.round((totalPresent / totalSeances) * 100) : 0;
    // Correction du "100 - presenceRate" manquant dans votre code initial
    const absenceRate = totalSeances > 0 ? 100 - presenceRate : 0;

    // Correction du "b.rate - a.rate" manquant dans votre code initial
    classStats.sort((a, b) => b.rate - a.rate);
    const bestClass = classStats[0] ? { label: classStats[0].label, rate: classStats[0].rate } : null;

    return {
      totalSeances,
      totalPresent,
      totalAbsent,
      presenceRate,
      absenceRate,
      totalStudents,
      atRiskStudentsCount,
      atRiskStudents, // Exporté pour le Drawer
      bestClass,
    };
  }, [presenceStats]);

  return (
    <div className="font-outfit space-y-3">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Bilan de présence
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1.5">
          <UsersIcon className="size-3.5 text-slate-400" />
          {stats.totalStudents} élèves suivis
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
        {/* Card 1: Presence Rate */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Taux de présence
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">{stats.presenceRate}%</span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
              <CalendarCheck2Icon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.presenceRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Absence Rate */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-rose-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Taux d'absence
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">{stats.absenceRate}%</span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 shrink-0">
              <CalendarX2Icon className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.absenceRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: At-Risk Students (<70% presence) avec Drawer */}
        <Drawer direction={isMobile ? "left" : "right"}>
          <DrawerTrigger asChild>
            <button className="text-left rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 hover:shadow-md transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              <div className="flex items-start justify-between gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Élèves en alerte
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl sm:text-3xl text-slate-900">{stats.atRiskStudentsCount}</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium">(&lt;{PRESENCE_RATE_AT_RISK}%)</span>
                  </div>
                </div>
                <div className={cn(
                  "p-1.5 sm:p-2.5 rounded-xl border shrink-0 transition-colors",
                  stats.atRiskStudentsCount > 0 
                    ? "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-100" 
                    : "bg-slate-50 border-slate-100 text-slate-400"
                )}>
                  <AlertTriangleIcon className="size-5 sm:size-6" />
                </div>
              </div>

              <p className="text-[11px] font-medium text-slate-500 truncate w-full flex justify-end">
                {stats.atRiskStudentsCount > 0 ? (
                  <span className="text-amber-700 font-semibold flex items-center gap-2">Voir détails <ArrowRight className='size-4 text-zinc-900'/></span>
                ) : (
                  <span className="text-emerald-700 font-semibold">Bonne assiduité globale</span>
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
                  Élèves en alerte d'assiduité
                </DrawerTitle>
                <DrawerDescription className="text-xs text-slate-500">
                  Ces élèves présentent un taux de présence inférieur à {PRESENCE_RATE_AT_RISK}%.
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 pt-0 overflow-y-auto max-h-[50vh]">
                {stats.atRiskStudents.length > 0 ? (
                  <div className="space-y-2 mt-4">
                    {/* Tri pour afficher les cas les plus critiques en premier */}
                    {stats.atRiskStudents.sort((a, b) => a.rate - b.rate).map((student) => (
                      <div 
                        key={student.student.id} 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{student.student.firstName} {student.student.lastName}</span>
                          <span className="text-xs font-medium text-slate-500">Classe : {student.class.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className={cn(
                              "text-sm font-bold",
                              student.rate < 40 ? "text-rose-600" : "text-amber-600"
                            )}>
                              {student.rate}%
                            </span>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Présence</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                    <div className="p-4 rounded-full bg-emerald-50 text-emerald-500">
                      <CalendarCheck2Icon className="size-8" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Aucun élève en alerte</p>
                      <p className="text-sm text-slate-500 mt-1">Tous les élèves ont un taux de présence supérieur à 70%.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Card 4: Top Class Performance */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-violet-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Meilleure classe
              </span>
              {
                !isMobile &&
                <span className="font-bold text-lg sm:text-xl text-slate-900">
                    {stats.bestClass ? stats.bestClass.label : 'N/A'}
                </span>
              }
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 shrink-0">
              <TrophyIcon className="size-5 sm:size-6" />
            </div>
          </div>
            {
            isMobile &&
            <span className="font-bold text-lg sm:text-xl text-slate-900">
                {stats.bestClass ? stats.bestClass.label : 'N/A'}
            </span>
            }

          <p className="text-[11px] sm:text-[11px] font-medium text-slate-500 truncate">
            {stats.bestClass ? (
              <>
                Taux : <strong className="text-violet-700 font-bold">{stats.bestClass.rate}%</strong>
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

export default AssocPresenceStatsRecap;