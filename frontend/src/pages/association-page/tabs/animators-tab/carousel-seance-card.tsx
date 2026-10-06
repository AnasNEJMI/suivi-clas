import AssocSeanceDetailsDrawer from './seance-details-drawer';
import { cn, getElapsedDays } from '@/lib/utils';
import { CalendarIcon, ClockIcon, GraduationCapIcon } from 'lucide-react';
import type { CarouselSeance } from './seance-history-carousel';

const AssocCarouselSeanceCard = ({ seance }: { seance: CarouselSeance }) => {
  const studentsPresent = seance.seance.students.filter((s) => s.presence).length;
  const totalStudents = seance.seance.students.length;
  const presenceRate = totalStudents > 0 ? Math.round((studentsPresent / totalStudents) * 100) : 0;
  
  const isHighAttendance = presenceRate >= 60;

  // Lively status colors for presence performance
  const status = isHighAttendance 
    ? { text: "text-emerald-700", bar: "bg-emerald-500", track: "bg-emerald-100/70" }
    : { text: "text-pink-700", bar: "bg-pink-500", track: "bg-pink-100/70" };

  return (
    <AssocSeanceDetailsDrawer seance={seance}>
      <div
        className={cn(
          "w-full h-full p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs",
          "hover:border-amber-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer",
          "flex flex-col justify-between font-outfit group select-none relative overflow-hidden"
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

export default AssocCarouselSeanceCard;