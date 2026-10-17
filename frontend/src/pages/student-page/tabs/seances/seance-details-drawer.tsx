import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls';
import { BrandButton } from '@/components/brand-button';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  CalendarIcon,
  ClockIcon,
  LibraryBigIcon,
  MessageCircleQuestionIcon,
  NotebookPenIcon,
  NotebookTabsIcon,
  TrophyIcon,
  UserIcon,
} from 'lucide-react';
import QcmQuestionnaire from '../../../qcm-questionnaire';
import QcmResultsQuestionnaire from '../../../qcm-results-questionnaire';

const StudentSeanceDetailsDrawer = ({
  bilan,
  cardStyle,
  onQcmSubmit,
  children,
}: {
  bilan: BilanEntry;
  cardStyle: CardStyle;
  onQcmSubmit: (qcm: QcmEntry) => void;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="font-outfit border-none bg-slate-50 rounded-t-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl flex flex-col">
        {/* Drawer Top Navigation Header */}
        <DrawerHeader className="px-6 pt-6 pb-4 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between w-full mb-2">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ArrowLeftIcon className="size-4 mr-1.5" />
                Retour
              </Button>
            </DrawerClose>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Séance du {format(new Date(bilan.date), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>

          <DrawerTitle className="font-extrabold text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-white">
            Fiche de Séance
          </DrawerTitle>
          <DrawerDescription className="text-xs text-slate-500 font-medium">
            Découvre le bilan et les détails de la séance, soumises par votre animateur(trice).
          </DrawerDescription>
        </DrawerHeader>

        {/* Scrollable Content Body */}
        <div className="brand-v-scrollbar overflow-y-auto p-6 space-y-6 flex-1">
          {/* Header Card with Subject Styling */}
          <Card
            className={cn(
              'rounded-2xl font-outfit p-4 flex flex-col lg:flex-row items-center justify-evenly relative overflow-hidden shadow-none gap-0',
              cardStyle.bgColor
            )}
          >
            <CardHeader className="p-0 w-full">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-3 rounded-xl shrink-0 flex items-center justify-center',
                    cardStyle.iconBgColor
                  )}
                >
                  <cardStyle.icon className="size-6" />
                </div>
                <div>
                  <span
                    className={cn(
                      'font-black tracking-tight uppercase text-xs px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border shadow-2xs',
                      cardStyle.highlightTextColor,
                      cardStyle.borderColor
                    )}
                  >
                    {cardStyle.label}
                  </span>
                  <CardTitle className="text-xl font-bold  text-slate-900 w-full mt-1">
                    {bilan.lesson?.label}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            
            <Separator className='lg:hidden my-4 lg:my-0'/>
            <CardFooter className="p-0 border-slate-900/5 flex items-center gap-3 w-full">
              <div
                className={cn(
                  'size-10 rounded-lg flex items-center justify-center font-black text-base',
                  cardStyle.iconBgColor
                )}
              >
                {bilan.submittedBy.firstName.slice(0, 1)}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Avec {bilan.submittedBy.firstName} {bilan.submittedBy.lastName}
                </p>
                <p className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)} />
                    {format(new Date(bilan.date), 'd/MM/y', { locale: fr })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className={cn("size-3.5 text-indigo-500", cardStyle.highlightTextColor)} />
                    {bilan.seance.seanceDuration.label}
                  </span>
                </p>
              </div>
            </CardFooter>
          </Card>

          {/* Teacher Commentary Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600">
              <NotebookPenIcon className="size-5" />
              <h4 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Bilan de l'{bilan.submittedBy.gender === 'm' ? 'animateur' : 'animatrice'}
              </h4>
            </div>
            <p className="text-xs font-normal text-slate-400">
              Commentaires de {bilan.submittedBy.firstName}
            </p>
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-slate-800 text-sm font-medium leading-relaxed">
              {bilan.summary}
            </div>
          </div>

          {/* Side-by-side Bento Section */}
          <div className="grid grid-cols-1 gap-4">
            {/* QCM Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircleQuestionIcon className="size-5 text-violet-500" />
                  <h4 className="font-bold text-lg tracking-tight text-slate-900">
                    Défi QCM
                  </h4>
                </div>
                {bilan.qcm && bilan.qcm.completed && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                    Complété
                  </span>
                )}
                {bilan.qcm && !bilan.qcm.completed && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                    ⚡À faire
                  </span>
                )}
              </div>

              {bilan.qcm && bilan.qcm.completed && (
                <>
                  <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 text-white text-center shadow-md">
                    <div className="flex items-center justify-center gap-2">
                      <TrophyIcon className="size-6 text-amber-300 fill-amber-300" />
                      <span className="text-2xl font-black">
                        {bilan.qcm.score} / {bilan.qcm.qcmQuestions.length}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-emerald-100 mt-1">
                      {getCongralutoryMessage(bilan.qcm.score)}
                    </p>
                  </div>
                  <QcmResultsQuestionnaire qcm={bilan.qcm}>
                    <BrandButton className="w-full text-sm font-bold h-11 rounded-xl">
                      Consulter les corrections
                    </BrandButton>
                  </QcmResultsQuestionnaire>
                </>
              )}

              {bilan.qcm && !bilan.qcm.completed && (
                <>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Un quiz t'attend pour tester ce que tu as retenu durant cette séance.
                  </p>
                  <QcmQuestionnaire onQcmSubmit={onQcmSubmit} qcm={bilan.qcm}>
                    <BrandButton className="w-full text-sm font-bold h-11 rounded-xl">
                      Commencer le QCM
                    </BrandButton>
                  </QcmQuestionnaire>
                </>
              )}

              {!bilan.qcm && (
                <p className="text-xs text-slate-500 font-medium italic">
                  Aucun test de validation requis pour cette séance.
                </p>
              )}
            </div>

            {/* Session Technical Details Grid */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white mb-2">
                <NotebookTabsIcon className="size-5 text-blue-500" />
                <h4 className="font-bold text-lg tracking-tight">Fiche technique</h4>
              </div>

              <div className="space-y-2.5 text-xs font-semibold">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-2">
                    <CalendarIcon className="size-4 text-slate-500" /> Date
                  </span>
                  <span className="text-slate-900 dark:text-white capitalize">
                    {format(new Date(bilan.date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-2">
                    <ClockIcon className="size-4 text-slate-500" /> Durée
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {bilan.seance.seanceDuration.label}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-2">
                    <LibraryBigIcon className="size-4 text-slate-500" /> Matière
                  </span>
                  <span className="text-slate-900 dark:text-white">{cardStyle.label}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-2">
                    <BookOpenIcon className="size-4 text-slate-500" /> Leçon
                  </span>
                  <span className="text-slate-900 dark:text-white font-extrabold">
                    {bilan.lesson?.label}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30">
                  <span className="text-slate-500 flex items-center gap-2">
                    <UserIcon className="size-4 text-slate-600" /> Professeur
                  </span>
                  <span className="text-slate-700 dark:text-indigo-300 font-extrabold">
                    {bilan.submittedBy.firstName} {bilan.submittedBy.lastName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StudentSeanceDetailsDrawer;