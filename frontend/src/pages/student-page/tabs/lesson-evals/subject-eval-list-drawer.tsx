import type { Lesson, LessonsBySubject } from '@/api/student/apiCalls';
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
  CalendarIcon,
  CircleDashedIcon,
  StarsIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import StudentLessonCurriculumSkillsDrawer from './lesson-curriculum-skills-drawer';

const EVAL_WEIGHT: Record<'notAcquired' | 'acquiring' | 'acquired' | 'expert', number> = {
  notAcquired: 1,
  acquiring: 2,
  acquired: 3,
  expert: 4,
};

type FilterType = 'all' | 'notAcquired' | 'acquiring' | 'acquired' | 'expert';

interface SubjectEvalListDrawerProps {
  subject: LessonsBySubject;
  cardStyle: CardStyle;
  children: React.ReactNode;
}

const SubjectEvalListDrawer = ({
  subject,
  cardStyle,
  children,
}: SubjectEvalListDrawerProps) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<FilterType>('all');

  const selectedLessons = useMemo(() => {
    let lessons: Lesson[] = [];

    if (filter === 'all') lessons = subject.lessons;
    if (filter === 'notAcquired') {
      lessons = subject.lessons.filter(
        (lesson) => lesson.eval === null || lesson.eval?.evaluation === 'notAcquired',
      );
    }
    if (filter === 'acquiring') {
      lessons = subject.lessons.filter((lesson) => lesson.eval?.evaluation === 'acquiring');
    }
    if (filter === 'acquired') {
      lessons = subject.lessons.filter((lesson) => lesson.eval?.evaluation === 'acquired');
    }
    if (filter === 'expert') {
      lessons = subject.lessons.filter((lesson) => lesson.eval?.evaluation === 'expert');
    }

    return [...lessons].sort((a, b) => {
      const aEval = a.eval?.evaluation;
      const bEval = b.eval?.evaluation;

      if (!aEval && !bEval) return 0;
      if (!aEval && bEval) return 1;
      if (aEval && !bEval) return -1;

      return EVAL_WEIGHT[bEval!] - EVAL_WEIGHT[aEval!];
    });
  }, [filter, subject.lessons]);

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Tout' },
    { key: 'notAcquired', label: 'Pas abordé' },
    { key: 'acquiring', label: 'En cours' },
    { key: 'acquired', label: 'Acquis' },
    { key: 'expert', label: 'Maîtrise' },
  ];

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-dvh flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none gap-0">
        {/* Header aligned with the animator lesson-evaluation drawer */}
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

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80">
              {subject.lessons.length} leçons
            </span>
          </div>

          <div className="space-y-0.5">
            <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
              {subject.label}
            </DrawerTitle>
            <DrawerDescription className="text-xs sm:text-sm font-medium text-slate-500">
              Consulte tes évaluations et ton niveau de maîtrise des leçons.
            </DrawerDescription>
          </div>

          {/* Compact filter pills; intentionally no progression bar in the student drawer. */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => setFilter(btn.key)}
                aria-pressed={filter === btn.key}
                className={cn(
                  'px-3 py-1.5 text-xs font-bold rounded-xl border transition-all duration-150 cursor-pointer shadow-2xs',
                  filter === btn.key
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100',
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </DrawerHeader>

        {/* Scrollable lesson cards styled like the animator drawer */}
        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 sm:p-5 flex-1 space-y-3">
          {selectedLessons.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-8 text-center text-sm font-medium text-slate-500">
              Aucune leçon ne correspond à ce filtre.
            </div>
          )}

          {selectedLessons.map((lesson) => {
            const evalData = lesson.eval;
            const isNotAddressed = !evalData || evalData.evaluation === 'notAcquired';

            return (
              <StudentLessonCurriculumSkillsDrawer
                key={lesson.id}
                lesson={lesson}
                subjectLabel={subject.label}
                cardStyle={cardStyle}
              >
                <div
                  className={cn(
                    'w-full p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs transition-all duration-200 flex flex-col',
                    isNotAddressed ? 'opacity-80' : 'hover:shadow-sm',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={cn(
                          'size-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs',
                          cardStyle.iconBgColor,
                          cardStyle.highlightTextColor,
                        )}
                      >
                        <cardStyle.icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={cn(
                            'font-extrabold tracking-wider uppercase text-xs block mb-0.5',
                            cardStyle.highlightTextColor,
                          )}
                        >
                          {cardStyle.label}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isNotAddressed && (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full border inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 border-slate-200">
                          <CircleDashedIcon className="size-3.5" />
                          <span>Pas abordé</span>
                        </span>
                      )}
                      {evalData?.evaluation === 'acquiring' && (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full border inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border-amber-200/80">
                          <TrendingUpIcon className="size-3.5 text-amber-500" />
                          <span>En cours</span>
                        </span>
                      )}
                      {evalData?.evaluation === 'acquired' && (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full border inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 border-sky-200/80">
                          <BicepsFlexedIcon className="size-3.5 text-sky-500" />
                          <span>Acquis</span>
                        </span>
                      )}
                      {evalData?.evaluation === 'expert' && (
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full border inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border-emerald-200/80">
                          <StarsIcon className="size-3.5 text-emerald-500" />
                          <span>Maîtrise</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h3
                    className={cn(
                      'text-sm pl-12 font-bold mt-1.5 wrap-break-word',
                      isNotAddressed ? 'text-slate-700' : 'text-slate-900',
                    )}
                  >
                    {lesson.label}
                  </h3>

                  {evalData && evalData.evaluation !== 'notAcquired' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                      <p className="flex items-center gap-1.5 min-w-0">
                        <UserIcon className="size-3.5 text-slate-400 shrink-0" />
                        <span className="min-w-0">
                          Évaluée par{' '}
                          <strong className="font-semibold text-slate-700 capitalize">
                            {evalData.submittedBy.firstName}
                          </strong>{' '}
                          <strong className="font-semibold text-slate-700 uppercase">
                            {evalData.submittedBy.lastName}
                          </strong>
                        </span>
                      </p>
                      <p className="flex items-center gap-1 shrink-0">
                        <CalendarIcon className="size-3.5 text-slate-400" />
                        {format(new Date(evalData.updatedAt), 'd/MM/yyyy', { locale: fr })}
                      </p>
                    </div>
                  )}
                </div>
              </StudentLessonCurriculumSkillsDrawer>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SubjectEvalListDrawer;
