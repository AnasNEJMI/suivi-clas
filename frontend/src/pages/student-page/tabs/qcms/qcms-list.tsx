import type { QcmEntry } from '@/api/student/apiCalls';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarIcon,
  CheckCircle2Icon,
  Clock8Icon,
  SparklesIcon,
  TrophyIcon,
  UserIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import QcmQuestionnaire from '../../bilans/qcm-questionnaire';
import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire';

interface QcmsListProps {
  qcms: QcmEntry[];
  onQcmSubmit: (qcm: QcmEntry) => void;
}

const QcmsList = ({ qcms, onQcmSubmit }: QcmsListProps) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');

  // Statistiques pour les compteurs dans les filtres
  const stats = useMemo(() => {
    const total = qcms?.length || 0;
    const completed = qcms?.filter((q) => q.completed).length || 0;
    const pending = total - completed;
    return { total, completed, pending };
  }, [qcms]);

  // Filtrage des QCMs
  const selectedQcms = useMemo(() => {
    if (!qcms) return [];
    if (filter === 'completed') return qcms.filter((q) => q.completed);
    if (filter === 'notCompleted') return qcms.filter((q) => !q.completed);
    return qcms;
  }, [filter, qcms]);

  return (
    <div className="font-outfit space-y-4 mt-6">
      {/* Barre de Filtres par Statut */}
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
          onClick={() => setFilter('completed')}
          className={cn(
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5',
            filter === 'completed'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          )}
        >
          <CheckCircle2Icon className="size-3.5 text-emerald-600" />
          Complétés ({stats.completed})
        </button>
        <button
          type="button"
          onClick={() => setFilter('notCompleted')}
          className={cn(
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5',
            filter === 'notCompleted'
              ? 'bg-white text-amber-700 shadow-2xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          )}
        >
          <Clock8Icon className="size-3.5 text-amber-600" />
          À faire ({stats.pending})
        </button>
      </div>

      {/* État Vide (Empty State) */}
      {(!selectedQcms || selectedQcms.length === 0) && (
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200/80 rounded-2xl text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <SparklesIcon className="size-5 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Aucun QCM à afficher
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            {filter === 'all'
              ? 'Tous les questionnaires attribués à vos cours s’afficheront ici.'
              : 'Aucun questionnaire ne correspond au filtre sélectionné.'}
          </p>
        </div>
      )}

      {/* Liste des Cartes QCM */}
      <div className="space-y-3">
        {selectedQcms.map((qcm) => {
          const cardStyle = CARD_STYLES[qcm.lesson?.subject?.label as Subject];

          /* --- CONTENU DE LA CARTE QCM (Design Unifié Séance) --- */
          const CardContent = (
            <div className="group relative w-full p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3">
              {/* En-tête : Icône + Matière/Titre + Badge Statut */}
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

                  {/* Libellé Matière + Titre du Cours */}
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
                      {qcm.lesson?.label || 'QCM de cours'}
                    </h3>
                  </div>
                </div>

                {/* Badge de statut du QCM */}
                <div className="shrink-0 font-medium text-xs">
                  {qcm.completed ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-2xs shrink-0">
                      <TrophyIcon className="size-3.5" />
                      <span>
                        {qcm.score ?? 0}/{qcm.qcmQuestions?.length || 0}
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300/80 shrink-0">
                      <Clock8Icon className="size-3.5 text-amber-600 animate-pulse" />
                      <span>À faire</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Méta Info : Auteur (Enseignant) & Date */}
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5 mt-0.5 font-medium">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <UserIcon
                    className={cn('size-3.5 text-indigo-500', cardStyle.highlightTextColor)}
                  />
                  <span>
                    <span className="capitalize">{qcm.submittedBy?.firstName}</span>{' '}
                    <span className="uppercase">{qcm.submittedBy?.lastName}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <CalendarIcon
                    className={cn('size-3.5 text-indigo-500', cardStyle.highlightTextColor)}
                  />
                  <span>
                    {qcm.date
                      ? format(new Date(qcm.date), 'dd/MM/yyyy', { locale: fr })
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
          );

          /* Render avec le Trigger adapté selon si le QCM est complété ou non */
          return qcm.completed ? (
            <QcmResultsQuestionnaire key={qcm.id} qcm={qcm}>
              {CardContent}
            </QcmResultsQuestionnaire>
          ) : (
            <QcmQuestionnaire key={qcm.id} onQcmSubmit={onQcmSubmit} qcm={qcm}>
              {CardContent}
            </QcmQuestionnaire>
          );
        })}
      </div>
    </div>
  );
};

export default QcmsList;