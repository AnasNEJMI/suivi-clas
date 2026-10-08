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
    if (filter === 'notAcquired')
      lessons = subject.lessons.filter(
        (l) => l.eval === null || l.eval?.evaluation === 'notAcquired'
      );
    if (filter === 'acquiring')
      lessons = subject.lessons.filter((l) => l.eval?.evaluation === 'acquiring');
    if (filter === 'acquired')
      lessons = subject.lessons.filter((l) => l.eval?.evaluation === 'acquired');
    if (filter === 'expert')
      lessons = subject.lessons.filter((l) => l.eval?.evaluation === 'expert');

    return [...lessons].sort((a, b) => {
      const aEval = a.eval?.evaluation;
      const bEval = b.eval?.evaluation;

      if (!aEval && !bEval) return 0;
      if (!aEval && bEval) return 1;
      if (aEval && !bEval) return -1;

      const aEvalWeight = EVAL_WEIGHT[aEval!];
      const bEvalWeight = EVAL_WEIGHT[bEval!];
      return bEvalWeight - aEvalWeight;
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
      <DrawerContent className="h-dvh pl-4 pr-2 pb-4 font-outfit shadow-none border-none bg-slate-100 md:rounded-t-xl">
        <DrawerHeader className="flex flex-col gap-2 pt-4 px-2">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              className="w-fit h-10 px-2 opacity-75 hover:opacity-100 text-slate-700"
            >
              <ArrowLeftIcon className="size-5 mr-1" />
              <span>Retour</span>
            </Button>
          </DrawerClose>
          <DrawerTitle className="font-bold text-2xl md:text-3xl tracking-tight text-slate-900">
            {subject.label}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-slate-500">
            {subject.lessons.length} leçons au programme
          </DrawerDescription>

          <div className="mt-2 flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => setFilter(btn.key)}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 cursor-pointer',
                  filter === btn.key
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-200/60'
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </DrawerHeader>

        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-2 flex flex-col gap-3 mt-4 pr-3">
          {selectedLessons.map((lesson) => {
            const isNotAddressed =
              !lesson.eval || lesson.eval.evaluation === 'notAcquired';

            if (isNotAddressed) {
              return (
                <div
                  key={lesson.id}
                  className="w-full p-4 rounded-xl bg-white/70 border border-slate-200/60 shadow-2xs opacity-60"
                >
                  <div className="flex gap-3 w-full">
                    <cardStyle.icon
                      className={cn(
                        'size-12 p-2.5 rounded-xl shrink-0',
                        cardStyle.iconBgColor,
                        cardStyle.highlightTextColor
                      )}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex items-start justify-between w-full">
                        <span
                          className={cn(
                            'font-bold tracking-wider uppercase text-xs',
                            cardStyle.highlightTextColor
                          )}
                        >
                          {cardStyle.label}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1.5 bg-slate-100 text-slate-600 border-slate-300">
                          <CircleDashedIcon className="size-3.5" />
                          Pas abordé
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-800 mt-1">
                        {lesson.label}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            }

            const evalData = lesson.eval!;
            return (
              <div
                key={lesson.id}
                className="w-full p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
              >
                <div className="flex gap-3 w-full">
                  <cardStyle.icon
                    className={cn(
                      'size-12 p-2.5 rounded-xl shrink-0',
                      cardStyle.iconBgColor,
                      cardStyle.highlightTextColor
                    )}
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-start justify-between w-full">
                      <span
                        className={cn(
                          'font-bold tracking-wider uppercase text-xs',
                          cardStyle.highlightTextColor
                        )}
                      >
                        {cardStyle.label}
                      </span>
                      <div>
                        {lesson.eval!.evaluation === 'acquiring' && (
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1.5 bg-amber-50 text-amber-700 border-amber-300">
                            <TrendingUpIcon className="size-3.5" /> En cours
                          </span>
                        )}
                        {evalData.evaluation === 'acquired' && (
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border-emerald-300">
                            <BicepsFlexedIcon className="size-3.5" /> Acquis
                          </span>
                        )}
                        {evalData.evaluation === 'expert' && (
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border-indigo-300">
                            <StarsIcon className="size-3.5" /> Maîtrise
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mt-1">
                      {lesson.label}
                    </h3>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <p className="flex items-center gap-1.5">
                    <UserIcon className="size-3.5 text-slate-400" />
                    <span>
                      Évaluée par{' '}
                      <strong className="font-semibold text-slate-700 capitalize">
                        {evalData.submittedBy.firstName}
                      </strong>{' '}
                      <strong className="font-semibold text-slate-700 uppercase">
                        {evalData.submittedBy.lastName}
                      </strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-1">
                    <CalendarIcon className="size-3.5 text-slate-400" />
                    {format(new Date(evalData.updatedAt), 'd/MM/yyyy', {
                      locale: fr,
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SubjectEvalListDrawer;