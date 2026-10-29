import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { BrandButton } from '@/components/brand-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader} from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import type { CardStyle } from '@/lib/types/data.types';
import { cn, getCongralutoryMessage } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ArrowLeftIcon,
  BookOpenIcon,
  BookOpenTextIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  LibraryBigIcon,
  MessageCircleQuestionIcon,
  NotebookPenIcon,
  NotebookTabsIcon,
  TrophyIcon,
  UserIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import QcmQuestionnaire from '../../../qcm-questionnaire';
import QcmResultsQuestionnaire from '../../../qcm-results-questionnaire';

interface StudentSeanceDetailsDrawerProps {
  bilan: BilanEntry;
  cardStyle: CardStyle;
  onQcmSubmit: (qcm: QcmEntry) => void;
  children: ReactNode;
}

const ScoreRing = ({ score, total }: { score: number; total: number }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const safePercentage = Math.max(0, Math.min(100, percentage));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - safePercentage / 100);
  const strokeColor = safePercentage >= 80 ? '#059669' : safePercentage >= 50 ? '#0284c7' : '#d97706';

  return (
    <div
      className="relative grid size-28 shrink-0 place-items-center"
      role="img"
      aria-label={`Résultat du QCM : ${score} bonnes réponses sur ${total}, soit ${safePercentage} %`}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">{safePercentage}%</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">réussite</span>
      </div>
    </div>
  );
};

const SectionHeading = ({
  icon: Icon,
  title,
  subtitle,
  iconClassName = 'bg-indigo-50 text-indigo-600',
}: {
  icon: typeof BookOpenIcon;
  title: string;
  subtitle?: string;
  iconClassName?: string;
}) => (
  <div className="flex items-start gap-3">
    <div className={cn('grid size-10 shrink-0 place-items-center rounded-xl', iconClassName)}>
      <Icon className="size-5" aria-hidden="true" />
    </div>
    <div className="min-w-0">
      <h3 className="text-base font-bold tracking-tight text-slate-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

const StudentSeanceDetailsDrawer = ({
  bilan,
  cardStyle,
  onQcmSubmit,
  children,
}: StudentSeanceDetailsDrawerProps) => {
  const isMobile = useIsMobile();
  const completedQcm = Boolean(bilan.qcm?.completed);
  const qcmTotal = bilan.qcm?.qcmQuestions.length ?? 0;
  const qcmScore = bilan.qcm?.score ?? 0;
  const qcmPercentage = qcmTotal > 0
    ? Math.round((Math.max(0, Math.min(qcmTotal, qcmScore)) / qcmTotal) * 100)
    : 0;
  const firstName = bilan.submittedBy.firstName;
  const lastName = bilan.submittedBy.lastName;

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="flex h-dvh w-screen max-w-none flex-col gap-0 overflow-hidden border-none bg-slate-50 p-0 font-outfit shadow-2xl focus:outline-none sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        {/* Header intentionally remains compact and consistent with the current drawer. */}
        <DrawerHeader className="shrink-0 border-b border-slate-200/80 bg-white px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
          <div className="mb-2 flex w-full items-center justify-between gap-3">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 rounded-xl px-3 font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <ArrowLeftIcon className="mr-1.5 size-4" />
                Retour
              </Button>
            </DrawerClose>
            <span className="max-w-[60%] truncate rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-right text-[11px] font-bold text-slate-600 sm:text-xs">
              Séance du {format(new Date(bilan.date), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>
          <DrawerTitle className="text-left text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Fiche de séance
          </DrawerTitle>
          <DrawerDescription className="text-left text-xs font-medium text-slate-500 sm:text-sm">
            Retrouve le contenu travaillé, les commentaires et ton éventuel résultat au QCM.
          </DrawerDescription>
        </DrawerHeader>

        <div className="brand-v-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-6 lg:grid-cols-12 lg:gap-6 lg:p-8">
            {/* Lesson / session identity */}
            <Card className={cn('relative overflow-hidden rounded-3xl border p-5 shadow-sm sm:p-6 lg:col-span-12', cardStyle.bgColor, cardStyle.borderColor)}>
              <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-white/30 blur-2xl" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className={cn('grid size-14 shrink-0 place-items-center rounded-2xl shadow-sm ring-1 ring-white/70', cardStyle.iconBgColor)}>
                    <cardStyle.icon className={cn('size-7', cardStyle.highlightTextColor)} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <span className={cn('inline-flex items-center rounded-lg border bg-white/85 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-2xs', cardStyle.highlightTextColor, cardStyle.borderColor)}>
                      {cardStyle.label}
                    </span>
                    <h2 className="wrap-break-word text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">
                      {bilan.lesson?.label ?? 'Séance sans leçon associée'}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-700 sm:text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarIcon className={cn('size-4', cardStyle.highlightTextColor)} />
                        {format(new Date(bilan.date), 'd MMM yyyy', { locale: fr })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className={cn('size-4', cardStyle.highlightTextColor)} />
                        {bilan.seance.seanceDuration.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/70 bg-white/65 p-3 sm:max-w-64">
                  <div className={cn('grid size-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
                    {firstName.slice(0, 1).toUpperCase()}{lastName.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Accompagnement</p>
                    <p className="truncate text-sm font-bold text-slate-900">{firstName} {lastName}</p>
                    <p className="text-xs text-slate-500">Ton animateur{bilan.submittedBy.gender === 'f' ? 'rice' : ''}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Main column */}
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:col-span-7 lg:gap-6">
              {bilan.curriculumSkills && bilan.curriculumSkills.length > 0 && (
                <Card className="gap-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
                  <CardHeader className="px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
                    <SectionHeading
                      icon={BookOpenTextIcon}
                      title="Compétences travaillées"
                      subtitle="Les connaissances et méthodes abordées pendant cette séance."
                    />
                  </CardHeader>
                  <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="space-y-3">
                      {bilan.curriculumSkills.map((skill, index) => (
                        <div key={skill.id} className="flex gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/40">
                          <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-xs font-extrabold text-white shadow-sm">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">{skill.label}</h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{skill.description}</p>
                          </div>
                          <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-indigo-400" aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="gap-0 rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
                <CardHeader className="px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
                  <SectionHeading
                    icon={NotebookPenIcon}
                    title={`Bilan de l'${bilan.submittedBy.gender === 'm' ? 'animateur' : 'animatrice'}`}
                    subtitle={`Les commentaires de ${firstName} sur la séance.`}
                    iconClassName="bg-sky-50 text-sky-700"
                  />
                </CardHeader>
                <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                  {bilan.summary?.trim() ? (
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line sm:p-5">
                      {bilan.summary}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-500">
                      Aucun commentaire n'a été ajouté pour cette séance.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side column: QCM and session metadata */}
            <aside className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:col-span-5 lg:gap-6">
              <Card className="gap-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
                <div className="h-1.5 w-full bg-linear-to-r from-violet-500 via-indigo-500 to-sky-500" />
                <CardHeader className="px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <SectionHeading
                      icon={MessageCircleQuestionIcon}
                      title="Défi QCM"
                      subtitle="Vérifie ce que tu as retenu de la leçon."
                      iconClassName="bg-violet-50 text-violet-700"
                    />
                    {bilan.qcm?.completed ? (
                      <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">Terminé</span>
                    ) : bilan.qcm ? (
                      <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold text-amber-800">À faire</span>
                    ) : (
                      <span className="shrink-0 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">Facultatif</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                  {bilan.qcm?.completed && (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:flex-row sm:justify-center sm:gap-5">
                        <ScoreRing score={qcmScore} total={qcmTotal} />
                        <div className="text-center sm:text-left">
                          <div className="flex items-center justify-center gap-2 text-slate-900 sm:justify-start">
                            <TrophyIcon className="size-5 text-amber-500" />
                            <span className="text-2xl font-extrabold tracking-tight">{qcmScore}<span className="mx-1 text-slate-400">/</span>{qcmTotal}</span>
                          </div>
                          <p className="mt-1 text-xs font-semibold text-slate-500">Bonnes réponses</p>
                          <p className="mt-2 max-w-xs text-sm font-semibold leading-relaxed text-slate-700">
                            {getCongralutoryMessage(qcmScore)}
                          </p>
                        </div>
                      </div>
                      <QcmResultsQuestionnaire qcm={bilan.qcm}>
                        <BrandButton className="h-11 w-full rounded-xl text-sm font-bold">
                          Consulter les corrections
                        </BrandButton>
                      </QcmResultsQuestionnaire>
                    </div>
                  )}

                  {bilan.qcm && !bilan.qcm.completed && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4">
                        <p className="text-sm font-semibold leading-relaxed text-amber-950">
                          Un petit défi t'attend. Réponds aux questions pour vérifier ta compréhension de la leçon.
                        </p>
                      </div>
                      <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={bilan.qcm}>
                        <BrandButton className="h-11 w-full rounded-xl text-sm font-bold">
                          Commencer le QCM
                        </BrandButton>
                      </QcmQuestionnaire>
                    </div>
                  )}

                  {!bilan.qcm && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm leading-relaxed text-slate-600">
                        Aucun QCM n'est associé à cette séance. Tu peux revoir les compétences travaillées ci-dessus.
                      </p>
                    </div>
                  )}
                  {completedQcm && qcmTotal > 0 && qcmPercentage === 100 && (
                    <p className="mt-3 text-center text-xs font-semibold text-emerald-700">Excellent : toutes les réponses sont correctes.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="gap-0 rounded-3xl border border-slate-200/80 bg-white py-0 shadow-sm">
                <CardHeader className="px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
                  <SectionHeading
                    icon={NotebookTabsIcon}
                    title="Détails de la séance"
                    subtitle="Les informations à garder en tête."
                    iconClassName="bg-sky-50 text-sky-700"
                  />
                </CardHeader>
                <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <div className="space-y-2">
                    <MetadataRow icon={CalendarIcon} label="Date" value={format(new Date(bilan.date), 'EEEE d MMMM yyyy', { locale: fr })} />
                    <MetadataRow icon={ClockIcon} label="Durée" value={bilan.seance.seanceDuration.label} />
                    <MetadataRow icon={LibraryBigIcon} label="Matière" value={cardStyle.label} />
                    <MetadataRow icon={BookOpenIcon} label="Leçon" value={bilan.lesson?.label ?? 'Non renseignée'} />
                    <Separator className="my-3" />
                    <MetadataRow icon={UserIcon} label="Animateur" value={`${firstName} ${lastName}`} highlighted />
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const MetadataRow = ({
  icon: Icon,
  label,
  value,
  highlighted = false,
}: {
  icon: typeof CalendarIcon;
  label: string;
  value: string;
  highlighted?: boolean;
}) => (
  <div className={cn(
    'flex items-start justify-between gap-4 rounded-xl border px-3 py-3',
    highlighted ? 'border-indigo-100 bg-indigo-50/70' : 'border-slate-100 bg-slate-50/80',
  )}>
    <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
      <Icon className="size-4 text-slate-400" aria-hidden="true" />
      {label}
    </span>
    <span className={cn('min-w-0 wrap-break-word text-right text-xs font-bold sm:text-sm', highlighted ? 'text-indigo-900' : 'text-slate-800')}>
      {value}
    </span>
  </div>
);

export default StudentSeanceDetailsDrawer;
