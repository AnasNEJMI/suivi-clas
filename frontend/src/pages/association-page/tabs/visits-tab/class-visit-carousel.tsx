import type { ClassVisitStats } from "@/api/association-member/apiCalls";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, getDaysSinceLastVisit, getElapsedDays } from "@/lib/utils";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CalendarCheck2Icon,
  CalendarX2Icon,
  ClockIcon,
  GraduationCapIcon,
  RotateCwFadingClockIcon,
  SparklesIcon,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type StudentVisit = ClassVisitStats["students"][number];

const StudentVisitCard = ({
  student,
  classLabel,
}: {
  student: StudentVisit;
  classLabel: string;
}) => {
  const totalVisits = student.numVisits;
  const daysSinceLastVisit = student.lastVisit ? getDaysSinceLastVisit(student.lastVisit) : null;
  const lastVisitedText = student.lastVisit ? getElapsedDays(student.lastVisit) : "-";

  // Définition des seuils pour les visites
  const isNoData = daysSinceLastVisit === null || daysSinceLastVisit < 0;
  const isGood = !isNoData && daysSinceLastVisit <= 7;
  const isWarning = !isNoData && daysSinceLastVisit > 7 && daysSinceLastVisit <= 30;
  const isBad = !isNoData && daysSinceLastVisit > 30;

  return (
    <div
      className={cn(
        "bg-white border rounded-2xl p-4 lg:p-5 flex flex-col justify-between h-full shadow-xs transition-all duration-200 font-outfit",
        isGood && "border-slate-200 hover:border-emerald-300",
        isWarning && "border-slate-200 hover:border-amber-300",
        isBad && "border-rose-200 bg-rose-50/20",
        isNoData && "border-slate-200"
      )}
    >
      <div>
        {/* 1. Statut en Haut à Droite */}
        <div className="flex justify-end">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-extrabold border shadow-2xs",
              isGood && "bg-emerald-50 text-emerald-700 border-emerald-200",
              isWarning && "bg-amber-50 text-amber-700 border-amber-200",
              isBad && "bg-rose-50 text-rose-700 border-rose-200",
              isNoData && "bg-slate-100 text-slate-600 border-slate-200"
            )}
          >
            {isNoData ? "N/A" : isGood ? "Récent" : isWarning ? "À suivre" : "Inactif"}
          </span>
        </div>

        {/* 2. Infos Élève (Avatar, Nom & Classe) */}
        <div className="flex items-center gap-3 mt-4">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-2xs shrink-0 text-white",
              isGood && "bg-emerald-600",
              isWarning && "bg-amber-500",
              isBad && "bg-rose-600",
              isNoData && "bg-slate-400"
            )}
          >
            {student.firstName.charAt(0).toUpperCase()}
            {student.lastName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h5 className="font-bold text-slate-900 text-sm lg:text-base leading-snug truncate">
              <span className="capitalize">{student.firstName}</span>{" "}
              <span className="uppercase">{student.lastName}</span>
            </h5>
            <p className="text-xs text-slate-600 font-medium truncate flex items-center gap-1 mt-0.5">
              <GraduationCapIcon className="size-3.5 text-slate-400 shrink-0" />
              {classLabel}
            </p>
          </div>
        </div>

        {/* 3. Statistiques Détaillées */}
        <div className="grid grid-cols-1 gap-2 mt-6">
          {/* Nombre de visites */}
          <div className="flex items-center justify-between bg-slate-50/80 border border-slate-200 p-2 rounded-xl">
            <div className="flex items-center gap-1">
                <CalendarCheck2Icon className="size-4.5 text-sky-600 shrink-0" />
              <span className="text-xs font-bold text-slate-500 block">
                Visites
              </span>
            </div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">
            {totalVisits} <span className="text-slate-500 font-medium text-sm">fois</span>
            </div>
          </div>

          {/* Dernière visite */}
          <div className="flex justify-between items-center bg-slate-50/80 border border-slate-200 p-2.5 rounded-xl">
            <div className="flex items-center gap-1">
                <CalendarX2Icon className={cn(
                    "size-4.5 shrink-0",
                    isGood ? "text-emerald-600" : isWarning ? "text-amber-600" : isBad ? "text-rose-600" : "text-slate-400"
                )} />
                <span className="text-xs font-bold text-slate-500 block">
                    Dernière visite
                </span>
            </div>
            <div className="text-xs lg:text-sm font-extrabold text-slate-900 mt-0.5">
            {lastVisitedText}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Badge d'Encouragement / Action */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {isGood && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-100/80 px-2.5 py-1.5 rounded-xl">
            <SparklesIcon className="size-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Visite récente</span>
          </div>
        )}

        {isWarning && (
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50/80 border border-amber-100/80 px-2.5 py-1.5 rounded-xl">
            <ClockIcon className="size-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Il y a plus d'une semaine</span>
          </div>
        )}

        {isBad && (
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-50/80 border border-rose-100/80 px-2.5 py-1.5 rounded-xl">
            <AlertTriangleIcon className="size-3.5 text-rose-600 shrink-0" />
            <span className="truncate">Inactivité prolongée</span>
          </div>
        )}

        {isNoData && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100/80 border border-slate-200/60 px-2.5 py-1.5 rounded-xl">
            <AlertCircleIcon className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Aucune donnée</span>
          </div>
        )}
      </div>
    </div>
  );
};

const AssocClassVisitCarousel = ({
  classVisits,
}: {
  classVisits: ClassVisitStats;
}) => {
  // Tri pour afficher les plus récents en premier, et les sans-données à la fin
  const sortedStudents = [...classVisits.students].sort((a, b) => {
    if (!a.lastVisit && !b.lastVisit) return 0;
    if (!a.lastVisit && b.lastVisit) return 1;
    if (a.lastVisit && !b.lastVisit) return -1;
    return new Date(b.lastVisit!).getTime() - new Date(a.lastVisit!).getTime();
  });

  return (
    <div className="bg-slate-50/60 border border-slate-200/60 rounded-3xl p-5 lg:p-6 font-outfit mb-8">
      {/* Header Classe */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            <GraduationCapIcon className="size-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug">
              {classVisits.class.label}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Historique des visites
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
          {sortedStudents.length} élève{sortedStudents.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* État Vide */}
      {sortedStudents.length === 0 ? (
        <Card className="border-2 border-dashed border-slate-200 shadow-none h-48 flex flex-col items-center justify-center w-full rounded-2xl bg-white/50 p-6 text-center">
          <CardHeader className="p-0 flex flex-col items-center w-full">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
              <RotateCwFadingClockIcon className="size-6 text-slate-400" />
            </div>
            <CardTitle className="text-base font-bold text-slate-800">
              Aucun élève inscrit
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 max-w-sm mt-1">
              Les données de visites apparaîtront ici dès que des élèves seront ajoutés à cette classe.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        /* Carrousel */
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-3 py-3 px-1">
            {sortedStudents.map((student) => (
              <CarouselItem
                key={student.id}
                className="pl-3 basis-65 sm:basis-72 shrink-0"
              >
                <StudentVisitCard
                  student={student}
                  classLabel={classVisits.class.label}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation du Carrousel */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 mt-2">
            <div className="flex items-center gap-2">
              <CarouselPrevious
                variant="outline"
                className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white"
              />
              <CarouselNext
                variant="outline"
                className="static translate-y-0 h-9 w-9 border-slate-200 hover:bg-white"
              />
            </div>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default AssocClassVisitCarousel;