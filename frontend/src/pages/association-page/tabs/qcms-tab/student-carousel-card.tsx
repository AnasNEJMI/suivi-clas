import type { ClassQcmStats } from "@/api/association-member/apiCalls";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CalendarCheck2Icon,
  ClockIcon,
  GraduationCapIcon,
  SparklesIcon,
  AwardIcon,
} from "lucide-react";

type StudentQcm = ClassQcmStats["students"][number];

export const StudentCarouselQcmCard = ({
  student,
  classLabel,
}: {
  student: StudentQcm;
  classLabel: string;
}) => {
  const totalQcms = student.totalQcms;
  const qcmsCompleted = student.qcmCompletedCount;
  
  const completionRate =
    totalQcms === 0 ? 0 : Math.round((qcmsCompleted / totalQcms) * 100);

  const averageScore =
    qcmsCompleted > 0
      ? (student.qcmCompletedTotalPoints / qcmsCompleted).toFixed(1)
      : "-";

  // Définition des seuils de complétion des QCM
  const isGood = totalQcms > 0 && completionRate >= 80;
  const isWarning = totalQcms > 0 && completionRate >= 50 && completionRate < 80;
  const isBad = totalQcms > 0 && completionRate < 50;
  const isNoData = totalQcms === 0;

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
        {/* 1. Pourcentage Seul en Haut à Droite */}
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
            {isNoData ? "N/A" : `${completionRate}%`}
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

        {/* 3. Barre de Progression Visuelle */}
        <div className="mt-4">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                isGood && "bg-emerald-500",
                isWarning && "bg-amber-500",
                isBad && "bg-rose-500",
                isNoData && "bg-slate-200"
              )}
              style={{ width: `${isNoData ? 0 : completionRate}%` }}
            />
          </div>
        </div>

        {/* 4. Statistiques Détaillées (QCM Complétés / Note Moyenne) */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {/* Complétés */}
          <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200 p-2.5 rounded-xl">
            <CalendarCheck2Icon className="size-4.5 text-emerald-600 shrink-0" />
            <div className="truncate">
              <span className="text-xs font-bold text-emerald-950 block">
                Complétés
              </span>
              <div className="text-xs lg:text-sm font-extrabold text-slate-900 mt-0.5">
                {qcmsCompleted}{" "}
                <span className="text-slate-500 font-medium text-xs">/ {totalQcms}</span>
              </div>
            </div>
          </div>

          {/* Note Moyenne */}
          <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200 p-2.5 rounded-xl">
            <AwardIcon className="size-4.5 text-indigo-600 shrink-0" />
            <div className="truncate">
              <span className="text-xs font-bold text-indigo-950 block">
                Moyenne
              </span>
              <div className="text-xs lg:text-sm font-extrabold text-slate-900 mt-0.5">
                {averageScore}{" "}
                {averageScore !== "-" && (
                  <span className="text-slate-500 font-medium text-xs">/ 10</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Badge d'Encouragement / Action */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {isGood && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-100/80 px-2.5 py-1.5 rounded-xl">
            <SparklesIcon className="size-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Excellente complétion !</span>
          </div>
        )}

        {isWarning && (
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50/80 border border-amber-100/80 px-2.5 py-1.5 rounded-xl">
            <AlertCircleIcon className="size-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Quelques QCM en attente</span>
          </div>
        )}

        {isBad && (
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-50/80 border border-rose-100/80 px-2.5 py-1.5 rounded-xl">
            <AlertTriangleIcon className="size-3.5 text-rose-600 shrink-0" />
            <span className="truncate">Suivi des QCM nécessaire</span>
          </div>
        )}

        {isNoData && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100/80 border border-slate-200/60 px-2.5 py-1.5 rounded-xl">
            <ClockIcon className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Aucun QCM attribué</span>
          </div>
        )}
      </div>
    </div>
  );
};