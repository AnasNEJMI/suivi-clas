import type { ClassQcmStats } from "@/api/association-member/apiCalls";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GraduationCapIcon, RotateCwFadingClockIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentCarouselQcmCard } from "./student-carousel-card";

const AssocClassQCMCarousel = ({
  classQCM,
}: {
  classQCM: ClassQcmStats;
}) => {
  // Tri par taux de complétion décroissant
  const sortedStudents = [...classQCM.students].sort((a, b) => {
    const rateA = a.totalQcms === 0 ? 0 : a.qcmCompletedCount / a.totalQcms;
    const rateB = b.totalQcms === 0 ? 0 : b.qcmCompletedCount / b.totalQcms;
    return rateB - rateA;
  });

  return (
    <div className="bg-slate-50/60 border border-slate-200/60 rounded-3xl p-5 lg:p-6 font-outfit">
      {/* Header Classe */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            <GraduationCapIcon className="size-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug">
              {classQCM.class.label}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Suivi des QCM des élèves
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
              Aucune donnée de QCM
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 max-w-sm mt-1">
              Les résultats apparaîtront ici dès que des QCM seront réalisés par les élèves de cette classe.
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
                <StudentCarouselQcmCard
                  student={student}
                  classLabel={classQCM.class.label}
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

export default AssocClassQCMCarousel;