import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ArrowLeftIcon,
  CalendarIcon,
  CalendarXIcon,
  CheckCircle2Icon,
  SparklesIcon,
  TrophyIcon,
  UserIcon,
  XCircleIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import StudentSeanceDetailsDrawer from './seance-details-drawer';

interface StudentSeancesListDrawerProps {
  bilans: BilanEntry[];
  onQcmSubmit: (qcm: QcmEntry) => void;
  children: React.ReactNode;
}

const StudentSeancesListDrawer = ({
  bilans,
  onQcmSubmit,
  children,
}: StudentSeancesListDrawerProps) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');

  const selectedBilans = useMemo(() => {
    if (filter === 'all') return bilans;
    if (filter === 'present') return bilans.filter((b) => b.presence);
    if (filter === 'absent') return bilans.filter((b) => !b.presence);
    return bilans;
  }, [filter, bilans]);

  const stats = useMemo(() => {
    const total = bilans.length;
    const presents = bilans.filter((b) => b.presence).length;
    const absents = total - presents;
    return { total, presents, absents };
  }, [bilans]);

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 flex flex-col">
        {/* En-tête du Drawer */}
        <DrawerHeader className="p-5 lg:p-6 border-b border-slate-200/80 bg-white/80 shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 gap-2 text-base font-bold text-slate-600 bg-white  hover:bg-slate-100 hover:text-slate-900"
              >
                <ArrowLeftIcon className="size-4" />
                <span>Retour</span>
              </Button>
            </DrawerClose>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
              {stats.total} séance{stats.total > 1 ? 's' : ''}
            </span>
          </div>

          <div>
            <DrawerTitle className="font-bold text-xl lg:text-2xl tracking-tight text-slate-900">
              Toutes les séances
            </DrawerTitle>
            <DrawerDescription className="text-slate-500 text-xs lg:text-sm mt-0.5">
              Consultez les bilans, présences et qcms soumis cette année.
            </DrawerDescription>
          </div>

          {/* Filtres par statut */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 w-fit">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150',
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              )}
            >
              Toutes ({stats.total})
            </button>
            <button
              type="button"
              onClick={() => setFilter('present')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5',
                filter === 'present'
                  ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              )}
            >
              <CheckCircle2Icon className="size-3.5 text-emerald-600" />
              Présence ({stats.presents})
            </button>
            <button
              type="button"
              onClick={() => setFilter('absent')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5',
                filter === 'absent'
                  ? 'bg-white text-rose-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              )}
            >
              <XCircleIcon className="size-3.5 text-rose-500" />
              Absence ({stats.absents})
            </button>
          </div>
        </DrawerHeader>

        {/* Liste défilante des séances */}
        <div className="brand-v-scrollbar overflow-y-auto p-4 lg:p-6 flex-1 space-y-3">
          {!selectedBilans || selectedBilans.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200 rounded-2xl text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <SparklesIcon className="size-5 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Aucune séance à afficher</p>
              <p className="text-xs text-slate-400 mt-1">
                Aucun résultat ne correspond au filtre sélectionné.
              </p>
            </div>
          ) : (
            selectedBilans.map((bilan) => {
              /* --- CAS ABSENCE OU LEÇON INVALIDE --- */
              if (!bilan.presence || !bilan.lesson) {
                return (
                  <div
                    key={bilan.id}
                    className="w-full p-4 bg-white/70 border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col justify-between gap-3 opacity-90 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                          <CalendarXIcon className="size-5" />
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-rose-100/70 border border-rose-200/60 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                            Séance manquée
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">
                            Absence enregistrée
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5 mt-1 font-medium">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <UserIcon className="size-3.5 text-slate-400" />
                        <span>
                          <span className="capitalize">{bilan.submittedBy.firstName}</span>{' '}
                          <span className="uppercase">{bilan.submittedBy.lastName}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <CalendarIcon className="size-3.5 text-slate-400" />
                        <span>{format(new Date(bilan.date), 'dd/MM/yyyy', { locale: fr })}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              /* --- CAS PRÉSENCE / SÉANCE VALIDE --- */
              const cardStyle = CARD_STYLES[bilan.lesson.subject.label as Subject];

              return (
                <StudentSeanceDetailsDrawer
                  key={bilan.id}
                  onQcmSubmit={onQcmSubmit}
                  bilan={bilan}
                  cardStyle={cardStyle}
                >
                  <div
                    className={cn(
                      'group relative w-full p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Icône de matière */}
                        <div
                          className={cn(
                            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs',
                            cardStyle.iconBgColor,
                            cardStyle.highlightTextColor
                          )}
                        >
                          <cardStyle.icon className="size-5" />
                        </div>

                        {/* Matière + Titre du cours */}
                        <div className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'font-bold tracking-wider uppercase text-[11px]',
                              cardStyle.highlightTextColor
                            )}
                          >
                            {cardStyle.label}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 truncate tracking-tight group-hover:text-sky-700 transition-colors">
                            {bilan.lesson.label}
                          </h3>
                        </div>
                      </div>

                      {/* Status du QCM */}
                      <div className="shrink-0 font-medium text-xs">
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
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-[11px]">
                            Pas de QCM
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta info : Animateur & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5 mt-0.5 font-medium">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <UserIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)} />
                        <span>
                          <span className="capitalize">{bilan.submittedBy.firstName}</span>{' '}
                          <span className="uppercase">{bilan.submittedBy.lastName}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <CalendarIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)} />
                        <span>{format(new Date(bilan.date), 'dd/MM/yyyy', { locale: fr })}</span>
                      </div>
                    </div>
                  </div>
                </StudentSeanceDetailsDrawer>
              );
            })
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StudentSeancesListDrawer;