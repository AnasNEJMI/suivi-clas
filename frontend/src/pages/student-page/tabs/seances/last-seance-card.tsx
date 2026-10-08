import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { BrandButton } from '@/components/brand-button';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn, getCongralutoryMessage, getElapsedDays } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ArrowRightIcon,
  CalendarIcon,
  CalendarX2Icon,
  CheckCircle2Icon,
  ClockIcon,
  HelpCircleIcon,
  MessageCircleQuestionIcon,
  SparklesIcon,
  TrophyIcon,
  ZapIcon,
} from 'lucide-react';
import QcmQuestionnaire from '../../bilans/qcm-questionnaire';
import QcmResultsQuestionnaire from '../../bilans/qcm-results-questionnaire';
import StudentSeanceDetailsDrawer from './seance-details-drawer';

const StudentLastSeanceCard = ({
  bilans,
  onQcmSubmit,
}: {
  bilans: BilanEntry[];
  onQcmSubmit: (qcm: QcmEntry) => void;
}) => {
  // --- STATE 1: NO SESSIONS YET ---
  if (bilans.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            Dernière séance
          </h3>
        </div>
        <Card className="border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 h-72 flex flex-col items-center justify-center w-full rounded-3xl bg-linear-to-b from-indigo-50/50 via-white to-slate-50 dark:from-indigo-950/20 dark:to-slate-900 shadow-sm p-6 text-center">
          <div className="size-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
            <CalendarX2Icon className="size-8" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Aucune séance récente
          </CardTitle>
          <CardDescription className="text-balance max-w-md text-slate-600 dark:text-slate-400 mt-1 text-sm font-medium">
            Les retours de séances et tes devoirs QCM apparaîtront ici dès ta première classe.
          </CardDescription>
        </Card>
      </div>
    );
  }

  const recentBilan = bilans[0];

  // --- STATE 2: ABSENCE STATE ---
  if (!recentBilan.presence || !recentBilan.lesson) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            Dernière séance
          </h3>
        </div>
        <Card className="flex flex-col items-start justify-start w-full rounded-3xl bg-linear-to-br from-rose-50 via-white to-orange-50/30 border-2 border-rose-200 dark:border-rose-900/40 shadow-sm overflow-hidden p-1">
          <CardHeader className="flex flex-col gap-4 justify-center w-full p-5 lg:p-6">
            <div className="flex items-center justify-between w-full flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 rounded-2xl text-rose-600">
                  <CalendarX2Icon className="size-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    Séance manquée
                  </span>
                  <CardTitle className="text-xl font-bold tracking-tight text-rose-700 dark:text-rose-400">
                    Absence enregistrée
                  </CardTitle>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-rose-500 text-white text-xs font-bold tracking-wide shadow-sm">
                {format(new Date(recentBilan.date), 'd MMMM yyyy', { locale: fr })}
              </span>
            </div>
            <CardDescription className="text-slate-700 dark:text-slate-300 font-medium text-base">
              Tu n'as pas pu assister à cette séance. Pas d'inquiétude ! On se retrouve très vite
              pour continuer à progresser ensemble. 🚀
            </CardDescription>
          </CardHeader>
          <CardFooter className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 px-6 border-t border-rose-100 dark:border-rose-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-linear-to-br from-rose-400 to-red-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                {recentBilan.submittedBy.firstName.slice(0, 1)}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Avec {recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}
                </p>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="size-3.5 text-rose-500" />
                    {format(new Date(recentBilan.date), 'd/MM/y', { locale: fr })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="size-3.5 text-rose-500" />
                    {recentBilan.seance.seanceDuration.label}
                  </span>
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- STATE 3: NORMAL RECENT SESSION ---
  const cardStyle = CARD_STYLES[recentBilan.lesson.subject.label as Subject] || {
    bgColor: 'bg-indigo-50/70 dark:bg-indigo-950/30',
    iconBgColor: 'bg-indigo-500 text-white',
    highlightTextColor: 'text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    label: recentBilan.lesson.subject.label,
    icon: SparklesIcon,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
            Dernière séance
          </h3>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
          <ZapIcon className="size-3 fill-indigo-500 text-indigo-500" />
          Récemment complétée
        </span>
      </div>

      {/* Hero Bento Box Layout */}
      <div className={`w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden border-2 border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 transition-all hover:border-zinc-300`}>
        
        {/* Left 2/3 Section: Session Summary */}
        <Card
          className={cn(
            'border-none shadow-none flex flex-col justify-between flex-2 rounded-none p-6 lg:p-7 relative overflow-hidden',
            cardStyle.bgColor
          )}
        >
          <CardHeader className="p-0 space-y-4">
            <div className="flex items-start gap-3 w-full">
              <div
                className={cn(
                  'p-3 rounded-xl shrink-0 flex items-center justify-center',
                  cardStyle.iconBgColor
                )}
              >
                <cardStyle.icon className="size-6" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full flex-wrap gap-2">
                  <span
                    className={cn(
                      'font-bold tracking-tight uppercase text-xs px-2 py-0.5 rounded-full bg-white/70 border', cardStyle.borderColor,
                      cardStyle.highlightTextColor,
                      cardStyle.borderColor
                    )}
                  >
                    {cardStyle.label}
                  </span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full font-bold text-xs border tracking-tight bg-white/70',
                      cardStyle.borderColor,
                      cardStyle.highlightTextColor
                    )}
                  >
                    {getElapsedDays(recentBilan.date)}
                  </span>
                </div>
                <CardTitle className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1.5">
                  {recentBilan.lesson.label}
                </CardTitle>
              </div>
            </div>

            <CardDescription className="text-slate-700 text-sm font-medium  bg-white/60 p-4 rounded-xl">
            <span className='leading-relaxed line-clamp-3 w-full'>{recentBilan.summary}</span>
              
            </CardDescription>
          </CardHeader>

          <CardFooter className="p-0 pt-6 border-t border-slate-900/5 dark:border-white/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'size-11 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border border-white/40',
                  cardStyle.iconBgColor
                )}
              >
                {recentBilan.submittedBy.firstName.slice(0, 1)}
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{recentBilan.submittedBy.gender === 'm' ? 'Animateur' : 'Animatrice'}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {recentBilan.submittedBy.firstName} {recentBilan.submittedBy.lastName}
                </p>
                <p className="text-xs font-semibold text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)} />
                    {format(new Date(recentBilan.date), 'd/MM/y', { locale: fr })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)} />
                    {recentBilan.seance.seanceDuration.label}
                  </span>
                </p>
              </div>
            </div>

            <StudentSeanceDetailsDrawer
              onQcmSubmit={onQcmSubmit}
              bilan={recentBilan}
              cardStyle={cardStyle}
            >
              <Button className="h-11 px-5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all active:scale-95 group">
                Détails de séance
                <ArrowRightIcon className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </StudentSeanceDetailsDrawer>
          </CardFooter>
        </Card>

        {/* Separator for desktop */}
        <div className="hidden lg:block w-px bg-slate-200 dark:bg-slate-800 my-4" />

        {/* Right 1/3 Section: Gamified QCM Card */}
        <Card className="border-none shadow-none flex flex-col justify-between flex-1 rounded-none bg-white dark:bg-slate-900 p-6">
          <div>
            <div className="flex items-center justify-between w-full mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300">
                  <MessageCircleQuestionIcon className="size-5" />
                </div>
                <span className="tracking-tight text-lg font-extrabold text-slate-900 dark:text-white">
                  Défi QCM
                </span>
              </div>

              {recentBilan.qcm && recentBilan.qcm.completed && (
                <span className="bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-800 dark:text-emerald-300 rounded-full text-xs px-3 py-1 font-extrabold flex items-center gap-1">
                  <CheckCircle2Icon className="size-3.5" /> Complété
                </span>
              )}
              {recentBilan.qcm && !recentBilan.qcm.completed && (
                <span className="bg-amber-100 dark:bg-amber-950/60 border border-amber-400 text-amber-800 dark:text-amber-300 rounded-full text-xs px-3 py-1 font-extrabold animate-bounce">
                  ⚡À faire
                </span>
              )}
            </div>

            {/* QCM Completed State */}
            {recentBilan.qcm && recentBilan.qcm.completed && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Défi relevé ! Révise tes réponses pour consolider tes acquis.
                </p>
                <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/20 text-center relative overflow-hidden">
                  <TrophyIcon className="size-16 text-white/10 absolute -right-2 -bottom-2 rotate-12 pointer-events-none" />
                  <div className="flex items-center justify-center gap-2">
                    <TrophyIcon className="size-7 text-amber-300 fill-amber-300 animate-bounce" />
                    <span className="text-3xl font-black tracking-tight">
                      {recentBilan.qcm.score} / {recentBilan.qcm.qcmQuestions.length}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-100 mt-2">
                    {getCongralutoryMessage(recentBilan.qcm.score)}
                  </p>
                </div>
              </div>
            )}

            {/* QCM Pending State */}
            {recentBilan.qcm && !recentBilan.qcm.completed && (
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Teste tes connaissances sur la leçon pour valider tes points d'expérience !
                </p>
              </div>
            )}

            {/* No QCM State */}
            {!recentBilan.qcm && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center my-2 border border-slate-200 dark:border-slate-700">
                <HelpCircleIcon className="size-8 mx-auto text-slate-400 mb-1" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Pas de QCM associé à cette séance.
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-6">
            {recentBilan.qcm && recentBilan.qcm.completed && (
              <QcmResultsQuestionnaire qcm={recentBilan.qcm}>
                <BrandButton className="w-full text-sm font-bold h-12 rounded-xl">
                  Voir les résultats
                </BrandButton>
              </QcmResultsQuestionnaire>
            )}

            {recentBilan.qcm && !recentBilan.qcm.completed && (
              <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={recentBilan.qcm}>
                <BrandButton className="w-full text-sm font-bold h-12 rounded-xl">
                  Compléter le QCM
                </BrandButton>
              </QcmQuestionnaire>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentLastSeanceCard;