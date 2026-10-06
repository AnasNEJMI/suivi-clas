import { type ReactNode } from "react";
import type { CarouselSeance } from "./seance-history-carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ClockIcon,
  GraduationCapIcon,
  CheckCircle2Icon,
  XCircleIcon,
  BookOpenIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getElapsedDays } from "@/lib/utils";

const AssocSeanceDetailsDrawer = ({
  seance,
  children,
}: {
  seance: CarouselSeance;
  children: ReactNode;
}) => {
  const isMobile = useIsMobile();
  const formattedDate = new Date(seance.seance.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const studentsPresent = seance.seance.students.filter((s) => s.presence).length;
  const totalStudents = seance.seance.students.length;

  return (
    <Drawer direction={isMobile ? "left" : "right"}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="max-w-xl ml-auto font-outfit bg-slate-50 border-l border-slate-200">
        {/* En-tête du tiroir */}
        <DrawerHeader className="border-b border-slate-200 bg-white px-6 py-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="-ml-2 text-slate-500 hover:text-slate-900 gap-1.5">
                <ArrowLeftIcon className="size-4" />
                <span>Fermer</span>
              </Button>
            </DrawerClose>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full">
              {getElapsedDays(seance.seance.date)}
            </span>
          </div>

          <DrawerTitle className="text-xl font-bold text-slate-900 mt-2">
            Fiche de Séance
          </DrawerTitle>
          <DrawerDescription className="text-xs text-slate-500">
            Séance effectuée le {formattedDate}
          </DrawerDescription>
        </DrawerHeader>

        {/* Contenu Déroulant */}
        <div className="overflow-y-auto p-6 space-y-6 brand-v-scrollbar">
          {/* Hero Card : Synthèse */}
          <Card className="border-slate-200/80 shadow-xs bg-white rounded-2xl overflow-hidden py-0 gap-0">
            <div className="bg-indigo-600 p-5 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/20 backdrop-blur-xs text-white uppercase tracking-wider">
                  <GraduationCapIcon className="size-3.5" />
                  {seance.class.label}
                </span>
                <span className="text-xs font-medium text-indigo-100 flex items-center gap-1">
                  <ClockIcon className="size-3.5" />
                  {seance.seance.duration}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">Séance d'accompagnement</h3>
            </div>

            {/* Animateur Info */}
            <div className="p-4 bg-slate-50/80 flex items-center justify-between border-t border-slate-100 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {seance.animator.firstName.charAt(0)}
                  {seance.animator.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">
                    {seance.animator.firstName} {seance.animator.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{seance.animator.gender === 'f' ? 'Animatrice' : 'Animateur'}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Présence</span>
                <span className="text-sm font-bold text-slate-800">
                  {studentsPresent} / {totalStudents} élèves
                </span>
              </div>
            </div>
          </Card>

          {/* Liste des Élèves & Appel */}
          <Card className="border-slate-200/80 shadow-xs bg-white rounded-2xl gap-2">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpenIcon className="size-4 text-indigo-600" />
                Appel & Participation
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 space-y-2">
              {seance.seance.students.map((student, index) => {
                const isPresent = student.presence;
                const genderSuffix = student.gender === "f" ? "e" : "";

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-colors",
                      isPresent
                        ? "bg-emerald-50/40 border-emerald-100/80"
                        : "bg-rose-50/40 border-rose-100/80"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                          isPresent
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200/60"
                            : "bg-rose-100 text-rose-700 border border-rose-200/60"
                        )}
                      >
                        {student.firstName.charAt(0)}
                        {student.lastName.charAt(0)}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isPresent ? "text-slate-800" : "text-slate-400 line-through"
                        )}
                      >
                        {student.firstName} {student.lastName}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border",
                        isPresent
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      )}
                    >
                      {isPresent ? (
                        <>
                          <CheckCircle2Icon className="size-3 text-emerald-600" />
                          Présent{genderSuffix}
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="size-3 text-rose-600" />
                          Absent{genderSuffix}
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AssocSeanceDetailsDrawer;