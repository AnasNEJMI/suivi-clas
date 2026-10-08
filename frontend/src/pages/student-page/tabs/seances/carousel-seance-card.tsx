import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarIcon,
  CalendarXIcon,
  ClockIcon,
  TrophyIcon,
  UserIcon,
  CheckCircle2Icon,
} from 'lucide-react';
import StudentSeanceDetailsDrawer from './seance-details-drawer';

const StudentCarouselSeanceCard = ({
  bilan,
  onQcmSubmit,
}: {
  bilan: BilanEntry;
  onQcmSubmit: (qcm: QcmEntry) => void;
}) => {
  // --- CAS D'ABSENCE ---
  if (!bilan.presence || !bilan.lesson) {
    return (
      <div className="w-full h-full rounded-2xl border border-rose-200/80 bg-rose-50/80 p-4 font-outfit flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 group text-left">
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100/80 text-rose-700 border border-rose-200">
            <CalendarXIcon className="size-3.5" />
            Absence
          </span>
        </div>

        {/* Info Principale */}
        <div>
          <h3 className="text-base font-bold text-rose-950 tracking-tight line-clamp-1">
            Séance non effectuée
          </h3>
          <p className="text-xs text-rose-600/80 font-medium mt-0.5">
            Élève absent(e)
          </p>
        </div>

        {/* Footer Métadonnées */}
        <div className="pt-2.5 border-t border-rose-200/60 space-y-1 text-xs text-rose-800/80">
          <p className="flex items-center gap-1.5 font-medium truncate">
            <UserIcon className="size-3.5 shrink-0 opacity-70" />
            <span className="capitalize">{bilan.submittedBy.firstName}</span>{' '}
            <span className="uppercase">{bilan.submittedBy.lastName}</span>
          </p>
          <div className="flex items-center justify-between text-[11px] font-semibold text-rose-700/80">
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3 shrink-0 opacity-75" />
              {format(new Date(bilan.date), 'dd/MM/yyyy', { locale: fr })}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="size-3 shrink-0 opacity-75" />
              {bilan.seance.seanceDuration.label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- CAS DE PRÉSENCE ---
  const cardStyle = CARD_STYLES[bilan.lesson.subject.label as Subject];
  const IconComponent = cardStyle.icon;

  return (
    <StudentSeanceDetailsDrawer
      onQcmSubmit={onQcmSubmit}
      bilan={bilan}
      cardStyle={cardStyle}
    >
      <div
        className={cn(
          'w-full h-full rounded-2xl p-4 font-outfit flex flex-col justify-between border shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group text-left cursor-pointer relative overflow-hidden backdrop-blur-xs',
          cardStyle.bgColor,
          cardStyle.borderColor
        )}
      >
        {/* Subtle top-right accent glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/20 blur-xl pointer-events-none" />

        {/* Header : Badge Discipline + Status QCM */}
        <div className="flex items-center justify-between gap-1.5 z-10">
          {/* Badge Matière */}
          <span
            className={cn(
              'inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-white tracking-tight border',
              cardStyle.highlightTextColor,
              cardStyle.borderColor,
            )}
          >
            <IconComponent className="size-3.5 shrink-0" />
            {cardStyle.label}
          </span>

          {/* Badge Statut QCM */}
          {bilan.qcm && !bilan.qcm.completed && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0 animate-bounce">
              ⚡QCM à faire
            </span>
          )}
          {bilan.qcm && bilan.qcm.completed && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs shrink-0">
              <TrophyIcon className="size-3" />
              {bilan.qcm.score}/{bilan.qcm.qcmQuestions.length}
            </span>
          )}
          {!bilan.qcm && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-600 bg-white/60 border border-slate-200/50 shrink-0">
              <CheckCircle2Icon className="size-3 text-slate-400" />
              Sans QCM
            </span>
          )}
        </div>

        {/* Titre du cours */}
        <div className="my-1.5 z-10">
          <h3 className="text-base font-bold text-slate-900 tracking-tight line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
            {bilan.lesson.label}
          </h3>
        </div>

        {/* Footer : Animateur & Date / Durée */}
        <div className="pt-2.5 border-t border-slate-900/10 dark:border-white/10 space-y-1 z-10">
          <p className="flex items-center gap-1.5 text-xs text-slate-900 font-semibold truncate">
            <UserIcon className="size-3.5 shrink-0" />
            <span className="capitalize">{bilan.submittedBy.firstName}</span>{' '}
            <span className="uppercase">{bilan.submittedBy.lastName}</span>
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <CalendarIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)}/>
              {format(new Date(bilan.date), 'dd/MM/yyyy', { locale: fr })}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)}/>
              {bilan.seance.seanceDuration.label}
            </span>
          </div>
        </div>
      </div>
    </StudentSeanceDetailsDrawer>
  );
};

export default StudentCarouselSeanceCard;