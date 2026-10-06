import { useMemo, useState, type ReactNode } from "react";
import type { CarouselSeance } from "./seance-history-carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import AssocSeanceDetailsDrawer from "./seance-details-drawer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
  RotateCwFadingClockIcon,
} from "lucide-react";
import { cn, getElapsedDays } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AssocSeancesListDrawerProps {
  seances: CarouselSeance[];
  filters: string[];
  children: ReactNode;
}

// Extracted Séance Card Item styled matching AssocCarouselSeanceCard
const SeanceCardItem = ({ seance }: { seance: CarouselSeance }) => {
  const studentsPresent = seance.seance.students.filter((s) => s.presence).length;
  const totalStudents = seance.seance.students.length;
  const presenceRate =
    totalStudents > 0 ? Math.round((studentsPresent / totalStudents) * 100) : 0;
  
  const isHighAttendance = presenceRate >= 60;

  // Lively status colors for presence performance
  const status = isHighAttendance 
    ? { text: "text-emerald-700", bar: "bg-emerald-500", track: "bg-emerald-100/70" }
    : { text: "text-pink-700", bar: "bg-pink-500", track: "bg-pink-100/70" };

  return (
    <AssocSeanceDetailsDrawer seance={seance}>
      <div
        className={cn(
          "w-full p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs",
          "hover:border-amber-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer",
          "flex flex-col font-outfit group select-none relative overflow-hidden"
        )}
      >
        {/* Top Row: Icon Accent & Date at Top Right */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center justify-center size-8 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200 shrink-0">
              <GraduationCapIcon className="size-4" />
            </div>

            {/* Date at Top Right */}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60 shrink-0">
              <CalendarIcon className="size-3 text-slate-400" />
              {getElapsedDays(seance.seance.date)}
            </span>
          </div>

          {/* Class Title (Beneath Top Row) */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-950 transition-colors truncate tracking-tight">
            {seance.class.label}
          </h3>

          {/* Duration (Beneath Class Title) */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 font-medium">
            <ClockIcon className="size-3.5 text-slate-400 shrink-0" />
            <span>Durée : <strong className="text-slate-700 font-semibold">{seance.seance.duration}</strong></span>
          </div>
        </div>

        {/* Bottom Section: Compact Presence & Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Présence
            </span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-xs font-extrabold", status.text)}>
                {presenceRate}%
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                ({studentsPresent}/{totalStudents})
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className={cn("w-full h-1.5 rounded-full overflow-hidden", status.track)}>
            <div
              className={cn("h-full rounded-full transition-all duration-500 ease-out", status.bar)}
              style={{ width: `${presenceRate}%` }}
            />
          </div>
        </div>
      </div>
    </AssocSeanceDetailsDrawer>
  );
};

const AssocSeancesListDrawer = ({
  seances,
  filters,
  children,
}: AssocSeancesListDrawerProps) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<string>("all");

  const animator = seances[0]?.animator;
  const animatorName = animator ? `${animator.firstName} ${animator.lastName}` : "";

  const selectedSeanceBuckets = useMemo(() => {
    const filtered =
      filter === "all"
        ? seances
        : seances.filter((s) => s.class.label === filter);

    const seancesMap = new Map<string, CarouselSeance[]>();
    for (const s of filtered) {
      const monthStr = format(new Date(s.seance.date), "MMMM yyyy", { locale: fr });
      if (!seancesMap.has(monthStr)) {
        seancesMap.set(monthStr, []);
      }
      seancesMap.get(monthStr)!.push(s);
    }

    return Array.from(seancesMap.entries()).map(([month, bucketSeances]) => ({
      month,
      seances: bucketSeances,
    }));
  }, [seances, filter]);

  return (
    <Drawer direction={isMobile ? "left" : "right"}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="max-w-xl ml-auto font-outfit bg-slate-50 border-l border-slate-200">
        {/* Drawer Header */}
        <DrawerHeader className="border-b border-slate-200 bg-white px-6 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2 text-slate-500 hover:text-slate-900 gap-1.5"
              >
                <ArrowLeftIcon className="size-4" />
                <span>Fermer</span>
              </Button>
            </DrawerClose>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
              {seances.length} séance{seances.length > 1 ? "s" : ""}
            </span>
          </div>

          {seances.length > 0 && animator ? (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
                {animator.firstName.charAt(0)}
                {animator.lastName.charAt(0)}
              </div>
              <div>
                <DrawerTitle className="text-xl font-bold text-slate-900 leading-tight">
                  {animatorName}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-slate-500 font-medium">
                  Historique des séances réalisées
                </DrawerDescription>
              </div>
            </div>
          ) : (
            <div>
              <DrawerTitle className="text-xl font-bold text-slate-900">
                Toutes les séances
              </DrawerTitle>
              <DrawerDescription className="text-xs text-slate-500">
                0 séance enregistrée
              </DrawerDescription>
            </div>
          )}

          {/* Class Filters */}
          {seances.length > 0 && (
            <div className="pt-2 flex items-center gap-1.5 overflow-x-auto brand-h-scrollbar pb-1">
              {filters.map((f) => {
                const isActive = filter === f;
                const label = f === "all" ? "Toutes les classes" : f;

                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer border",
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </DrawerHeader>

        {/* Drawer Body */}
        <div className="brand-v-scrollbar overflow-y-auto p-6 space-y-6">
          {seances.length === 0 ? (
            <Card className="border-2 border-dashed border-slate-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-2xl bg-white/50 p-6 text-center">
              <CardHeader className="p-0 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <RotateCwFadingClockIcon className="size-6 text-slate-400" />
                </div>
                <CardTitle className="text-base font-bold text-slate-800">
                  Aucune séance enregistrée
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 max-w-sm mt-1">
                  Toutes les séances enregistrées pour cet animateur apparaîtront ici.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : selectedSeanceBuckets.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aucune séance ne correspond au filtre sélectionné.
            </div>
          ) : (
            selectedSeanceBuckets.map((bucket) => (
              <div key={bucket.month} className="space-y-3">
                {/* Month Separator */}
                <div className="flex items-center gap-4">
                  <Separator className="flex-1 bg-slate-200" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200/60">
                    {bucket.month}
                  </span>
                  <Separator className="flex-1 bg-slate-200" />
                </div>

                {/* Séance List */}
                <div className="space-y-2.5">
                  {bucket.seances.map((seance) => (
                    <SeanceCardItem key={seance.seance.id} seance={seance} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AssocSeancesListDrawer;