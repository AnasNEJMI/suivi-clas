import { useMemo } from 'react';
import type { StudentVisitStats, VisitStatsPerScolarYear } from '@/api/association-member/apiCalls';
import { getDaysSinceLastVisit } from '@/lib/utils';
import { 
  CalendarCheck2Icon, 
  CalendarX2Icon, 
  RotateCwFadingClockIcon, 
  UsersIcon, 
  ActivityIcon, 
  ArrowLeftIcon
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
import { EmptyStateCard } from '@/components/ui/empty-state-card';

const AssocVisitStatsRecap = ({ visitStatsPerScolarYear }: { visitStatsPerScolarYear: VisitStatsPerScolarYear[] }) => {
  const isMobile = useIsMobile();
  const visitStats = visitStatsPerScolarYear[0];

  const stats = useMemo(() => {
    if (!visitStats || !visitStats.classes || visitStats.classes.length === 0) {
      return {
        totalStudents: 0,
        visitsThisWeekCount: 0,
        visitsMoreThanAWeekCount: 0,
        engagementRate: 0,
        inactiveStudents: [],
      };
    }

    let totalStudents = 0;
    let visitsThisWeekCount = 0;
    let visitsMoreThanAWeekCount = 0;
    
    const inactiveStudents: { class: { id: number; label: string }; studentStats: StudentVisitStats; daysSinceLastVisit: number | null }[] = [];

    visitStats.classes.forEach((cls) => {
      cls.students.forEach((student) => {
        totalStudents++;
        const days = student.lastVisit ? getDaysSinceLastVisit(student.lastVisit) : null;
        const isThisWeek = student.lastVisit && days !== null && days <= 7;

        if (isThisWeek) {
          visitsThisWeekCount++;
        } else {
          visitsMoreThanAWeekCount++;
          inactiveStudents.push({
            class: cls.class,
            studentStats: student,
            daysSinceLastVisit: days,
          });
        }
      });
    });

    const engagementRate = totalStudents > 0 ? Math.round((visitsThisWeekCount / totalStudents) * 100) : 0;

    return {
      totalStudents,
      visitsThisWeekCount,
      visitsMoreThanAWeekCount,
      engagementRate,
      inactiveStudents,
    };
  }, [visitStats]);

  if (!visitStats || !visitStats.classes || visitStats.classes.length === 0) {
    return (
      <div className="font-outfit space-y-3">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
            Visites cette semaine
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1.5">
            <UsersIcon className="size-3.5 text-slate-400" />
            {stats.totalStudents} élèves suivis
          </span>
        </div>
        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title = "Les données de visites n'ont pas été enregistrées pour le moment."
          description="Toutes les données de visites enregistrées seront affichées ici dès leur réalisation."
        />
      </div>
    );
  }

  return (
    <div className="font-outfit space-y-3">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-lg lg:text-xl text-slate-900 tracking-tight">
          Visites cette semaine
        </h3>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 flex items-center gap-1.5">
          <UsersIcon className="size-3.5 text-slate-400" />
          {stats.totalStudents} élèves suivis
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4'>
        
        {/* Card 1: Visites cette semaine */}
        <div className="rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Actifs (cette semaine)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                  {stats.visitsThisWeekCount}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium">/ {stats.totalStudents}</span>
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
                style={{ width: `${stats.totalStudents > 0 ? (stats.visitsThisWeekCount / stats.totalStudents) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Inactifs / Non visité (> 1 semaine) avec Drawer interactif - Style Ambre / Chaleureux */}
        <Drawer direction={isMobile ? "left" : "right"}>
          <DrawerTrigger asChild>
            <button className="text-left rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              <div className="flex items-start justify-between gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Sans visite récente
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl sm:text-3xl text-slate-900">
                      {stats.visitsMoreThanAWeekCount}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-medium">(&gt;7j)</span>
                  </div>
                </div>
                <div className={cn(
                  "p-1.5 sm:p-2.5 rounded-xl border shrink-0 transition-colors",
                  stats.visitsMoreThanAWeekCount > 0 
                    ? "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-100" 
                    : "bg-slate-50 border-slate-100 text-slate-400"
                )}>
                  <CalendarX2Icon className="size-5 sm:size-6" />
                </div>
              </div>

              <p className="text-[11px] font-medium text-slate-500 truncate w-full">
                {stats.visitsMoreThanAWeekCount > 0 ? (
                  <span className="text-amber-700 font-semibold">Visite absente (Voir détails)</span>
                ) : (
                  <span className="text-emerald-700 font-semibold">Tous les profils visités</span>
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
                  Élèves n'ayant pas visité leur profil
                </DrawerTitle>
                <DrawerDescription className="text-xs text-slate-500">
                  Bilan des élèves qui ne se sont pas connectés pour consulter leur espace depuis plus d'une semaine. 
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 pt-0 overflow-y-auto max-h-[50vh]">
                {stats.inactiveStudents.length > 0 ? (
                  <div className="space-y-2 mt-4">
                    {stats.inactiveStudents.map((student) => (
                      <div 
                        key={student.studentStats.id} 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{student.studentStats.firstName} {student.studentStats.lastName}</span>
                          <span className="text-xs font-medium text-slate-500">Classe : {student.class.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-600">
                            {student.daysSinceLastVisit !== null 
                              ? `Il y a ${student.daysSinceLastVisit} jours` 
                              : 'Jamais connecté'}
                          </span>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Dernière visite</p>
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
                      <p className="font-semibold text-slate-900">Parfait !</p>
                      <p className="text-sm text-slate-500 mt-1">Aucun élève en retard de consultation cette semaine.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Card 3: Taux d'engagement global - Pleine largeur sur mobile (col-span-2), égale sur lg (col-span-1) - Style Orange/Chaleureux */}
        <div className="col-span-2 lg:col-span-1 rounded-2xl p-3 sm:p-4 bg-white border border-slate-200/80 shadow-2xs hover:border-orange-300 transition-all duration-150 flex flex-col justify-between gap-2.5 sm:gap-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Taux d'engagement
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-2xl sm:text-3xl text-slate-900">{stats.engagementRate}%</span>
              </div>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 shrink-0">
              <ActivityIcon className="size-5 sm:size-6" />
            </div>
          </div>

          <p className="text-[11px] font-medium text-slate-500 truncate">
            <strong className="text-orange-700 font-bold">{stats.visitsThisWeekCount}</strong> sur <strong className="text-slate-700 font-semibold">{stats.totalStudents}</strong> actifs
          </p>
        </div>

      </div>
    </div>
  );
};

export default AssocVisitStatsRecap;