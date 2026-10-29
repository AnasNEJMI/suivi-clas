import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CalendarX2Icon,
  CheckCircle2Icon,
  Clock3Icon,
  FileQuestionIcon,
  TrophyIcon,
  UserRoundIcon,
} from 'lucide-react';
import StudentSeanceDetailsDrawer from './seance-details-drawer';

interface StudentCarouselSeanceCardProps {
  bilan: BilanEntry;
  onQcmSubmit: (qcm: QcmEntry) => void;
}

const StudentCarouselSeanceCard = ({
  bilan,
  onQcmSubmit,
}: StudentCarouselSeanceCardProps) => {
  const dateLabel = format(new Date(bilan.date), 'dd/MM/yyyy', { locale: fr });
  const durationLabel = bilan.seance.seanceDuration.label;

  // Absence cards are intentionally not clickable and retain the rose palette.
  if (!bilan.presence || !bilan.lesson) {
    return (
      <article className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-rose-50/90 p-4 font-outfit transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-700">
            <CalendarX2Icon className="size-3.5" aria-hidden="true" />
            Absence
          </span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-rose-200/80 bg-white/70 text-rose-600">
            <CalendarX2Icon className="size-4.5" aria-hidden="true" />
          </span>
        </div>

        <div className="relative z-10 my-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-rose-600/80">
            Séance
          </p>
          <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-rose-950">
            Séance non effectuée
          </h3>
          <p className="mt-1 text-sm font-medium text-rose-700/80">
            Cette séance a été enregistrée comme une absence.
          </p>
        </div>

        <div className="relative z-10 space-y-2 border-t border-rose-200/80 pt-3">
          <p className="flex min-w-0 items-center gap-2 text-xs font-semibold text-rose-900/80">
            <UserRoundIcon className="size-3.5 shrink-0 text-rose-500" aria-hidden="true" />
            <span className="truncate">
              <span className="capitalize">{bilan.submittedBy.firstName}</span>{' '}
              <span className="uppercase">{bilan.submittedBy.lastName}</span>
            </span>
          </p>
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-rose-700/80">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDaysIcon className="size-3.5 shrink-0" aria-hidden="true" />
              {dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3Icon className="size-3.5 shrink-0" aria-hidden="true" />
              {durationLabel}
            </span>
          </div>
        </div>
      </article>
    );
  }

  const cardStyle = CARD_STYLES[bilan.lesson.subject.label as Subject] ?? {
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconBgColor: 'bg-slate-100',
    highlightTextColor: 'text-slate-700',
    label: bilan.lesson.subject.label,
    icon: BookOpenIcon,
  };
  const SubjectIcon = cardStyle.icon;
  const qcm = bilan.qcm;

  return (
    <StudentSeanceDetailsDrawer
      onQcmSubmit={onQcmSubmit}
      bilan={bilan}
      cardStyle={cardStyle}
    >
      <article
        className={cn(
          'group relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-4 font-outfit transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
          cardStyle.bgColor,
        )}
      >

        <div className="relative z-10 flex items-start justify-between gap-2">
          <span
            className={cn(
              'inline-flex min-w-0 max-w-[58%] items-center gap-1.5 rounded-lg border border-white/70 bg-white/75 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
              cardStyle.highlightTextColor,
            )}
          >
            <SubjectIcon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{cardStyle.label}</span>
          </span>

          {qcm && !qcm.completed && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-[10px] font-bold text-amber-800">
              <FileQuestionIcon className="size-3.5" aria-hidden="true" />
              QCM à faire
            </span>
          )}
          {qcm?.completed && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/95 px-2 py-1.5 text-[10px] font-bold text-emerald-800">
              <TrophyIcon className="size-3.5" aria-hidden="true" />
              {qcm.score != null
                ? `${qcm.score}/${qcm.qcmQuestions.length}`
                : 'QCM terminé'}
            </span>
          )}
          {!qcm && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/70 bg-white/60 px-2 py-1.5 text-[10px] font-semibold text-slate-600">
              <FileQuestionIcon className="size-3.5 text-slate-500" aria-hidden="true" />
              Sans QCM
            </span>
          )}
        </div>

        <div className="relative z-10 my-5 min-w-0">
          <p className={cn('mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] opacity-75', cardStyle.highlightTextColor)}>
            <BookOpenIcon className="size-3.5" aria-hidden="true" />
            Leçon étudiée
          </p>
          <h3 className="line-clamp-3 text-[17px] font-bold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-slate-800">
            {bilan.lesson.label}
          </h3>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700/75 transition-colors group-hover:text-slate-900">
            <span>Consulter le bilan et les détails</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </p>
        </div>

        <div className="relative z-10 space-y-2.5 border-t border-slate-900/10 pt-3">
          <p className="flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-800/90">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/70 bg-white/60">
              <UserRoundIcon className="size-3.5 text-slate-600" aria-hidden="true" />
            </span>
            <span className="truncate">
              <span className="capitalize">{bilan.submittedBy.firstName}</span>{' '}
              <span className="uppercase">{bilan.submittedBy.lastName}</span>
            </span>
            <span className="ml-auto shrink-0 text-[10px] font-medium text-slate-600/80">Animateur</span>
          </p>

          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-slate-700/85">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <CalendarDaysIcon className={cn('size-3.5 shrink-0', cardStyle.highlightTextColor)} aria-hidden="true" />
              <span>{dateLabel}</span>
            </span>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <Clock3Icon className={cn('size-3.5 shrink-0', cardStyle.highlightTextColor)} aria-hidden="true" />
              <span>{durationLabel}</span>
            </span>
          </div>

          {qcm?.completed && (
            <div className="flex items-center gap-1.5 border-t border-slate-900/10 pt-2 text-[11px] font-semibold text-emerald-800">
              <CheckCircle2Icon className="size-3.5" aria-hidden="true" />
              QCM terminé
              {qcm.score != null && <span className="ml-auto">Résultat : {qcm.score}/{qcm.qcmQuestions.length}</span>}
            </div>
          )}
        </div>
      </article>
    </StudentSeanceDetailsDrawer>
  );
};

export default StudentCarouselSeanceCard;
