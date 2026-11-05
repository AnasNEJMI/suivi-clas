import { studentApiCalls, type BilanEntry, type QcmEntry } from '@/api/student/apiCalls';
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
import { cn } from '@/lib/utils';
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
  NotebookPenIcon,
  NotebookTabsIcon,
  UserIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { QcmCard } from '@/components/qcm-card';

interface StudentSeanceDetailsDrawerProps {
  bilan: BilanEntry;
  cardStyle: CardStyle;
  onQcmSubmit: (qcm: QcmEntry) => void;
  children: ReactNode;
}
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
      {subtitle && <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{subtitle}</p>}
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
  const [open, setOpen] = useState(false);
  const firstName = bilan.submittedBy.firstName;
  const lastName = bilan.submittedBy.lastName;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) void studentApiCalls.trackBilanView(bilan.id).catch(() => {});
  }
  
  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction={isMobile ? 'left' : 'right'}>
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
              <div className='rounded-2xl overflow-hidden shadow-md'>
                <QcmCard
                  qcm={bilan.qcm}
                  onQcmSubmit={onQcmSubmit}
                  framed={false}
                  className="flex-1 bg-white p-6 dark:bg-slate-900"
                />
              </div>

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
