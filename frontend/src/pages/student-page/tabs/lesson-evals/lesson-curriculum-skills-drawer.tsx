import type { Lesson } from '@/api/student/apiCalls';
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
import type { CardStyle } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ArrowLeftIcon,
  BicepsFlexedIcon,
  BookOpenIcon,
  CalendarIcon,
  CircleDashedIcon,
  GraduationCapIcon,
  StarsIcon,
  TargetIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react';
import React from 'react';

interface StudentLessonCurriculumSkillsDrawerProps {
  lesson: Lesson;
  children: React.ReactNode;
  /** Optional subject name shown above the lesson title. */
  subjectLabel?: string;
  /** Optional subject styling, consistent with the lesson cards. */
  cardStyle?: CardStyle;
}

const StudentLessonCurriculumSkillsDrawer = ({
  lesson,
  children,
  subjectLabel,
  cardStyle,
}: StudentLessonCurriculumSkillsDrawerProps) => {
  const isMobile = useIsMobile();
  const evalData = lesson.eval;
  const LessonIcon = cardStyle?.icon ?? BookOpenIcon;
  const accentLabel = cardStyle?.label ?? subjectLabel ?? 'Leçon';
  const iconBgColor = cardStyle?.iconBgColor ?? 'bg-indigo-50';
  const highlightTextColor = cardStyle?.highlightTextColor ?? 'text-indigo-700';

  const evaluation = evalData?.evaluation;

  const evaluationPresentation = !evalData
    ? {
        title: 'Pas encore évaluée',
        eyebrow: 'En attente d’évaluation',
        description: 'Ton niveau n’a pas encore été évalué pour cette leçon. Les objectifs ci-dessous t’indiquent ce que tu apprendras.',
        Icon: CircleDashedIcon,
        tone: 'neutral' as const,
      }
    : evaluation === 'notAcquired'
      ? {
          title: 'À travailler',
          eyebrow: 'Prochaine étape',
          description: 'Ces notions sont à consolider. Reprends les objectifs ci-dessous et entraîne-toi pas à pas.',
          Icon: CircleDashedIcon,
          tone: 'neutral' as const,
        }
      : evaluation === 'acquiring'
        ? {
            title: 'En cours d’acquisition',
            eyebrow: 'Tu progresses',
            description: 'Tu avances. Continue à t’exercer pour gagner en confiance et réussir de plus en plus en autonomie.',
            Icon: TrendingUpIcon,
            tone: 'amber' as const,
          }
        : evaluation === 'acquired'
          ? {
              title: 'Acquis',
              eyebrow: 'Objectif atteint',
              description: 'Tu sais mobiliser les compétences essentielles de cette leçon dans les situations étudiées.',
              Icon: BicepsFlexedIcon,
              tone: 'sky' as const,
            }
          : {
              title: 'Maîtrisé',
              eyebrow: 'Très bonne maîtrise',
              description: 'Tu sais utiliser ces compétences avec autonomie et les réinvestir dans de nouvelles situations.',
              Icon: StarsIcon,
              tone: 'emerald' as const,
            };

  const evaluationTone = {
    neutral: {
      panel: 'border-slate-200 bg-white',
      rail: 'bg-slate-300',
      icon: 'bg-slate-100 text-slate-600 border-slate-200',
      eyebrow: 'text-slate-500',
      badge: 'border-slate-200 bg-slate-100 text-slate-700',
    },
    amber: {
      panel: 'border-amber-200/80 bg-amber-50/40',
      rail: 'bg-amber-400',
      icon: 'bg-amber-100 text-amber-700 border-amber-200',
      eyebrow: 'text-amber-700',
      badge: 'border-amber-200 bg-amber-50 text-amber-800',
    },
    sky: {
      panel: 'border-sky-200/80 bg-sky-50/40',
      rail: 'bg-sky-500',
      icon: 'bg-sky-100 text-sky-700 border-sky-200',
      eyebrow: 'text-sky-700',
      badge: 'border-sky-200 bg-sky-50 text-sky-800',
    },
    emerald: {
      panel: 'border-emerald-200/80 bg-emerald-50/40',
      rail: 'bg-emerald-500',
      icon: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      eyebrow: 'text-emerald-700',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    },
  }[evaluationPresentation.tone];

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-dvh flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none gap-0">
        <DrawerHeader className="p-4 sm:p-5 border-b border-slate-200/80 bg-white/90 shrink-0 space-y-3 text-left">
          <div className="flex items-center justify-between gap-3">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 -ml-2 gap-1.5 font-bold text-slate-900 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeftIcon className="size-4" />
                <span>Retour</span>
              </Button>
            </DrawerClose>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80">
              <TargetIcon className="size-3.5" />
              {lesson.curriculumSkills.length} objectif{lesson.curriculumSkills.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div
              className={cn(
                'size-11 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200/70 shadow-2xs',
                iconBgColor,
                highlightTextColor,
              )}
            >
              <LessonIcon className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              {(subjectLabel || cardStyle?.label) && (
                <span
                  className={cn(
                    'font-extrabold tracking-wider uppercase text-[10px] sm:text-xs block',
                    highlightTextColor,
                  )}
                >
                  {accentLabel}
                </span>
              )}
              <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight leading-snug text-slate-900">
                {lesson.label}
              </DrawerTitle>
              <DrawerDescription className="text-xs sm:text-sm font-medium leading-relaxed text-slate-500">
                Découvre ce que tu dois comprendre et savoir faire à la fin de cette leçon.
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto flex-1 p-4 sm:p-5">
          <div className="mx-auto w-full max-w-2xl space-y-7 pb-2">
            {/* Current evaluation: clear status, calm color, useful next-step guidance. */}
            <section aria-labelledby="lesson-current-evaluation" className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-2xs">
                  <GraduationCapIcon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 id="lesson-current-evaluation" className="text-sm font-extrabold tracking-tight text-slate-900">
                    Où en es-tu ?
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Le dernier retour sur cette leçon.
                  </p>
                </div>
              </div>

              <div className={cn('relative overflow-hidden rounded-2xl border shadow-sm', evaluationTone.panel)}>
                <div className={cn('absolute inset-y-0 left-0 w-1', evaluationTone.rail)} aria-hidden="true" />
                <div className="p-4 sm:p-5 pl-5 sm:pl-6">
                  <div className="flex items-start gap-3.5">
                    <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-2xl border shadow-2xs', evaluationTone.icon)}>
                      <evaluationPresentation.Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn('text-[10px] font-extrabold uppercase tracking-[0.12em]', evaluationTone.eyebrow)}>
                          {evaluationPresentation.eyebrow}
                        </span>
                        <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold', evaluationTone.badge)}>
                          {evaluationPresentation.title}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {evaluationPresentation.description}
                      </p>
                    </div>
                  </div>

                  {evalData && (
                    <div className="mt-4 flex flex-col gap-2 border-t border-slate-200/70 pt-3 text-xs font-medium text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/80 text-slate-500 ring-1 ring-slate-200/70">
                          <UserIcon className="size-3.5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 truncate">
                          Évaluée par{' '}
                          <strong className="font-bold text-slate-800 capitalize">
                            {evalData.submittedBy.firstName}
                          </strong>{' '}
                          <strong className="font-bold text-slate-800 uppercase">
                            {evalData.submittedBy.lastName}
                          </strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-9 sm:pl-0">
                        <CalendarIcon className="size-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                        <time dateTime={new Date(evalData.updatedAt).toISOString()}>
                          {format(new Date(evalData.updatedAt), 'd MMMM yyyy', { locale: fr })}
                        </time>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Learning outcomes: framed as practical goals, not completed achievements. */}
            <section aria-labelledby="lesson-curriculum-skills" className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                  <TargetIcon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 id="lesson-curriculum-skills" className="text-base font-extrabold tracking-tight text-slate-900">
                    Ce que tu dois savoir faire
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    À la fin de cette leçon, voici les notions à comprendre et les compétences à développer.
                  </p>
                </div>
              </div>

              {lesson.curriculumSkills.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
                  <div className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <BookOpenIcon className="size-5" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-800">
                    Les objectifs ne sont pas encore disponibles.
                  </p>
                  <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-slate-500">
                    Les compétences détaillées de cette leçon apparaîtront ici lorsqu’elles auront été renseignées.
                  </p>
                </div>
              ) : (
                <ol className="space-y-2.5">
                  {lesson.curriculumSkills.map((skill, index) => (
                    <li
                      key={skill.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs transition-all duration-200 hover:-translate-y-px hover:border-indigo-200 hover:shadow-sm"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-indigo-100 transition-colors group-hover:bg-indigo-500" aria-hidden="true" />
                      <div className="flex items-start gap-3.5 p-4 pl-5 sm:p-5 sm:pl-6">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-[11px] font-extrabold tabular-nums text-indigo-700">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-indigo-600/90">
                            Objectif d’apprentissage
                          </p>
                          <h4 className="text-sm font-extrabold leading-snug text-slate-900 sm:text-[15px]">
                            {skill.label}
                          </h4>
                          {skill.description?.trim() && (
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {skill.description}
                            </p>
                          )}
                        </div>
                        <TargetIcon className="mt-1 size-4 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500" aria-hidden="true" />
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            {lesson.curriculumSkills.length > 0 && (
              <aside className="flex items-start gap-3 rounded-2xl border border-indigo-100/90 bg-indigo-50/70 p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-2xs ring-1 ring-indigo-100">
                  <BookOpenIcon className="size-4" aria-hidden="true" />
                </div>
                <p className="text-xs leading-relaxed text-indigo-950/80 sm:text-sm">
                  <strong className="font-extrabold text-indigo-950">Comment utiliser ces objectifs ?</strong>{' '}
                  Appuie-toi sur cette liste pour préparer tes révisions et repérer ce que tu sais déjà faire ou ce que tu veux encore travailler.
                </p>
              </aside>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StudentLessonCurriculumSkillsDrawer;
