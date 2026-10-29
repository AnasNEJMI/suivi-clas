import type { SeanceDurationEntry, StudentEntry } from '@/api/animator/seances.types';
import { BrandButton } from '@/components/brand-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn, getElapsedDays } from '@/lib/utils';
import QcmResultsQuestionnaire from '@/pages/qcm-results-questionnaire';
import {
  AlertTriangleIcon,
  BookOpenTextIcon,
  CalendarIcon,
  CalendarX2Icon,
  ClockIcon,
  FileTextIcon,
  HelpCircleIcon,
  InfoIcon,
  RotateCwFadingClockIcon,
  SparklesIcon,
  TrophyIcon,
} from 'lucide-react';

interface AnimCompletedBilanDetailsProps {
  studentBilan: StudentEntry;
  seanceDuration: SeanceDurationEntry;
}

const AnimCompletedBilanDetails = ({
  studentBilan,
  seanceDuration,
}: AnimCompletedBilanDetailsProps) => {
  const bilan = studentBilan.bilan;
  console.log('bilan', JSON.stringify(bilan))

  /* --- État Vide (Pas de bilan soumis) --- */
  if (!bilan) {
    return (
      <EmptyStateCard
        icon={RotateCwFadingClockIcon}
        title="Aucun bilan soumis"
        description="Les détails du bilan ici dès qu'il aura été rédigé et enregistré."
        className="my-4 h-64 bg-white/80 border-slate-200/80 rounded-3xl"
      />
    );
  }

  const isPresent = bilan.presence;
  const cardStyle = isPresent && bilan.lesson
    ? CARD_STYLES[bilan.lesson.subject.label as Subject]
    : CARD_STYLES['none'];

  return (
    <div className="space-y-5 font-outfit">
      
      {/* 1. Carte Leçon abordée (Conserve sa couleur de fond dynamique) */}
      {!isPresent ? (
        <div className="relative overflow-hidden rounded-3xl bg-rose-50/90 border border-rose-200/80 p-5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-2xl bg-rose-100 text-rose-700 border border-rose-200/60 flex items-center justify-center shrink-0 shadow-2xs">
              <CalendarX2Icon className="size-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg text-rose-900 leading-tight">
                Séance manquée
              </h4>
              <p className="text-xs sm:text-sm text-rose-700/80 font-medium mt-0.5">
                Aucun bilan à rédiger car l'élève été absent.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100/90 text-rose-800 border border-rose-300/80 shadow-2xs shrink-0">
            Absence
          </span>
        </div>
      ) : (
        <Card
          className={cn(
            'group relative overflow-hidden border shadow-xs rounded-3xl transition-all duration-300 hover:shadow-md gap-3',
            cardStyle.bgColor,
            'border-slate-200/80'
          )}
        >
          <CardHeader className="px-5">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
              

              {/* Tag Matière */}
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border shadow-2xs bg-white/90 backdrop-blur-xs',
                  cardStyle.highlightTextColor,
                  cardStyle.borderColor
                )}
              >
                <cardStyle.icon className="size-3.5" />
                <span>{cardStyle.label}</span>
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 relative z-10">
            {bilan.lesson && (
              <div className="flex flex-col gap-1">
                <span className={cn("text-xs font-bold uppercase tracking-tight", cardStyle.highlightTextColor)}>
                  Intitulé du la leçon
                </span>
                <span className="text-base font-extrabold text-slate-900 leading-snug">
                  {bilan.lesson.label}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isPresent && bilan.lesson && bilan.curriculumSkills && bilan.curriculumSkills.length > 0 && (
        <Card className="border border-slate-200/80 bg-white shadow-xs rounded-3xl overflow-hidden group hover:shadow-md transition-all gap-3">
          <CardHeader className="px-5">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                <BookOpenTextIcon className="size-5" />
              </div>
              <span className="text-base font-extrabold tracking-tight">Compétences travaillées</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-sm sm:text-base font-medium text-slate-700 leading-relaxed whitespace-pre-line shadow-2xs">
              {bilan.curriculumSkills.map((skill) => (
                <div key= {skill.id} className="min-w-0 flex-1 cursor-pointer">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {skill.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {skill.description}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 2. Résumé de la séance */}
      {isPresent && bilan.summary && (
        <Card className="border border-slate-200/80 bg-white shadow-xs rounded-3xl overflow-hidden group hover:shadow-md transition-all gap-3">
          <CardHeader className="px-5">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                <BookOpenTextIcon className="size-5" />
              </div>
              <span className="text-base font-extrabold tracking-tight">Résumé de la séance</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-sm sm:text-base font-medium text-slate-700 leading-relaxed whitespace-pre-line shadow-2xs">
              {bilan.summary}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. Statut & Résultats du QCM */}
      {isPresent && (
        <Card className="border border-slate-200/80 bg-white shadow-xs rounded-3xl overflow-hidden group hover:shadow-md transition-all">
          <CardHeader className="px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                  <HelpCircleIcon className="size-5" />
                </div>
                <span className="text-base font-extrabold tracking-tight">QCM</span>
              </CardTitle>

              {bilan.qcm ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  <SparklesIcon className="size-3.5 text-indigo-500" />
                  QCM Généré
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200/60">
                  Aucun QCM
                </span>
              )}
            </div>
            <CardDescription className="text-xs text-slate-500 mt-1">
              {bilan.qcm
                ? 'Un questionnaire interactif a été généré suite à cette séance.'
                : 'Aucun QCM n\'a été généré pour cette séance.'}
            </CardDescription>
          </CardHeader>

          {bilan.qcm && (
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100 shadow-2xs">
                <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
                  <FileTextIcon className="size-4 text-slate-400" />
                  Résultat
                </span>

                {bilan.qcm.completed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                    <TrophyIcon className="size-4 text-emerald-600" />
                    <span>
                      {bilan.qcm.score} / {bilan.qcm.qcmQuestions.length}
                    </span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
                    <AlertTriangleIcon className="size-3.5 text-amber-500" />
                    En attente de réalisation
                  </span>
                )}
              </div>

              {/* Bouton de consultation du QCM */}
              <div className="pt-4">
                <QcmResultsQuestionnaire
                  qcm={{
                    ...bilan.qcm,
                    submittedBy: { id: 0, firstName: '', lastName: '', gender: 'm' },
                    date: new Date(),
                  }}
                >
                  <BrandButton className="w-full text-sm font-bold h-10 rounded-2xl shadow-2xs cursor-pointer">
                    {bilan.qcm.completed ? 'Consulter les résultats' : 'Voir les questions du QCM'}
                  </BrandButton>
                </QcmResultsQuestionnaire>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* 4. Informations générales sur la séance */}
      <Card className="border border-slate-200/80 bg-white shadow-xs rounded-3xl overflow-hidden group hover:shadow-md transition-all">
        <CardHeader className="px-5">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
              <InfoIcon className="size-5" />
            </div>
            <span className="text-base font-extrabold tracking-tight">Informations générales</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-xs sm:text-sm font-semibold text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500">
              <CalendarIcon className="size-4 text-slate-400" />
              Date de la séance
            </span>
            <span className="font-extrabold text-slate-900">{getElapsedDays(bilan.date)}</span>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
            <span className="flex items-center gap-2 text-slate-500">
              <ClockIcon className="size-4 text-slate-400" />
              Durée de la séance
            </span>
            <span className="font-extrabold text-slate-900">{seanceDuration.label}</span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default AnimCompletedBilanDetails;   