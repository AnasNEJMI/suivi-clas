import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types';
import type { LessonEntry, SubjectEntry } from '@/api/animator/types';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { CARD_STYLES, type CardStyle, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, BicepsFlexedIcon, CircleDashedIcon, StarsIcon, TrendingUpIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import AnimLessonEvalFormDrawer from './lesson-eval-form-drawer';

const EVAL_WEIGHT: Record<'notAcquired' | 'acquiring' | 'acquired' | 'expert', number> = {
    'notAcquired': 1,
    'acquiring': 2,
    'acquired': 3,
    'expert': 4,
};

type FilterType = 'all' | 'notAcquired' | 'acquiring' | 'acquired' | 'expert';

interface AnimLessonEvalListBySubjectDrawerProps {
    subject: SubjectEntry;
    lessonEvals: LessonEvalData[];
    animatorId: number;
    student: StudentLessonEvalsEntry;
    onLessonEvalUpserted: (lessonEval: LessonEvalData) => void;
    cardStyle?: CardStyle;
    children: React.ReactNode;
}

const AnimLessonEvalListBySubjectDrawer = ({
    subject,
    lessonEvals,
    animatorId,
    student,
    onLessonEvalUpserted,
    children,
}: AnimLessonEvalListBySubjectDrawerProps) => {
    const isMobile = useIsMobile();
    const [filter, setFilter] = useState<FilterType>('all');
    const cardStyle = CARD_STYLES[subject.label as Subject] ?? {
        bgColor: 'bg-white',
        borderColor: 'border-slate-200',
        iconBgColor: 'bg-indigo-50',
        highlightTextColor: 'text-indigo-700',
        label: subject.label,
        icon: CircleDashedIcon,
    };

    // Calculs des statistiques globales de la matière (incluant les leçons non faites)
    const { totalLessons, notDoneCount, acquiringCount, acquiredCount, expertCount, pctNotDone, pctAcquiring, pctAcquired, pctExpert } = useMemo(() => {
        const total = subject.lessons.length;
        if (total === 0) {
            return { totalLessons: 0, notDoneCount: 0, acquiringCount: 0, acquiredCount: 0, expertCount: 0, pctNotDone: 0, pctAcquiring: 0, pctAcquired: 0, pctExpert: 0 };
        }

        const notDone = subject.lessons.filter((l) => {
            const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
            return !evalItem || evalItem.evaluation === 'notAcquired';
        }).length;

        const acquiring = subject.lessons.filter((l) => {
            const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
            return evalItem?.evaluation === 'acquiring';
        }).length;

        const acquired = subject.lessons.filter((l) => {
            const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
            return evalItem?.evaluation === 'acquired';
        }).length;

        const expert = subject.lessons.filter((l) => {
            const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
            return evalItem?.evaluation === 'expert';
        }).length;

        return {
            totalLessons: total,
            notDoneCount: notDone,
            acquiringCount: acquiring,
            acquiredCount: acquired,
            expertCount: expert,
            pctNotDone: (notDone / total) * 100,
            pctAcquiring: (acquiring / total) * 100,
            pctAcquired: (acquired / total) * 100,
            pctExpert: (expert / total) * 100,
        };
    }, [subject.lessons, lessonEvals]);

    const selectedLessons = useMemo(() => {
        let lessons: LessonEntry[] = [];
        
        if (filter === 'all') lessons = subject.lessons;
        if (filter === 'notAcquired') {
            lessons = subject.lessons.filter((l) => {
                const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
                return !evalItem || evalItem.evaluation === 'notAcquired';
            });
        }
        if (filter === 'acquiring') {
            lessons = subject.lessons.filter((l) => {
                const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
                return evalItem?.evaluation === 'acquiring';
            });
        }
        if (filter === 'acquired') {
            lessons = subject.lessons.filter((l) => {
                const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
                return evalItem?.evaluation === 'acquired';
            });
        }
        if (filter === 'expert') {
            lessons = subject.lessons.filter((l) => {
                const evalItem = lessonEvals.find((e) => e.lesson.id === l.id);
                return evalItem?.evaluation === 'expert';
            });
        }

        return [...lessons].sort((a, b) => {
            const aEval = lessonEvals.find((e) => e.lesson.id === a.id)?.evaluation;
            const bEval = lessonEvals.find((e) => e.lesson.id === b.id)?.evaluation;

            if (!aEval && !bEval) return 0;
            if (!aEval && bEval) return 1;
            if (aEval && !bEval) return -1;

            const aEvalWeight = EVAL_WEIGHT[aEval!];
            const bEvalWeight = EVAL_WEIGHT[bEval!];
            return bEvalWeight - aEvalWeight;
        });
    }, [filter, subject.lessons, lessonEvals]);

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
                {/* --- EN-TÊTE DU DRAWER --- */}
                <DrawerHeader className="p-4 sm:p-5 border-b border-slate-200/80 bg-white/90 shrink-0 space-y-3 text-left">
                    <div className="flex items-center justify-between">
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
                            {totalLessons} leçons
                        </span>
                    </div>

                    <div className="space-y-0.5">
                        <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                            {subject.label}
                        </DrawerTitle>
                        <DrawerDescription className="text-xs sm:text-sm font-medium text-slate-500">
                            Répartition des niveaux de maîtrise du programme
                        </DrawerDescription>
                    </div>

                    {/* BARRE DE PROGRESSION SECTIONNÉE MULTICOLORE */}
                    <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-2xl space-y-2 mt-1">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                            <span>Progression globale</span>
                            <span className="text-indigo-600 font-bold">
                                {Math.round(pctAcquiring + pctAcquired + pctExpert)}% évalué
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden flex gap-0.5">
                            {pctNotDone > 0 && (
                                <div
                                    className="h-full bg-slate-400 transition-all duration-500"
                                    style={{ width: `${pctNotDone}%` }}
                                    title={`Pas abordé : ${notDoneCount}`}
                                />
                            )}
                            {pctAcquiring > 0 && (
                                <div
                                    className="h-full bg-amber-500 transition-all duration-500"
                                    style={{ width: `${pctAcquiring}%` }}
                                    title={`En cours : ${acquiringCount}`}
                                />
                            )}
                            {pctAcquired > 0 && (
                                <div
                                    className="h-full bg-sky-500 transition-all duration-500"
                                    style={{ width: `${pctAcquired}%` }}
                                    title={`Acquis : ${acquiredCount}`}
                                />
                            )}
                            {pctExpert > 0 && (
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-500"
                                    style={{ width: `${pctExpert}%` }}
                                    title={`Maîtrise : ${expertCount}`}
                                />
                            )}
                        </div>

                        {/* Mini-légende chiffrée */}
                        <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                            <div className="bg-white border border-slate-200/60 rounded-xl p-1 shadow-2xs">
                                <span className="block font-extrabold text-xs text-slate-700">{notDoneCount}</span>
                                <span className="text-[9px] font-semibold text-slate-400 uppercase">Non Abordé</span>
                            </div>
                            <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-1 text-amber-800 shadow-2xs">
                                <span className="block font-extrabold text-xs">{acquiringCount}</span>
                                <span className="text-[9px] font-semibold text-amber-600 uppercase">En cours</span>
                            </div>
                            <div className="bg-sky-50/70 border border-sky-200/60 rounded-xl p-1 text-sky-800 shadow-2xs">
                                <span className="block font-extrabold text-xs">{acquiredCount}</span>
                                <span className="text-[9px] font-semibold text-sky-600 uppercase">Acquis</span>
                            </div>
                            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-1 text-emerald-800 shadow-2xs">
                                <span className="block font-extrabold text-xs">{expertCount}</span>
                                <span className="text-[9px] font-semibold text-emerald-600 uppercase">Maîtrise</span>
                            </div>
                        </div>
                    </div>

                    {/* Filtres par statut */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {filterButtons.map((btn) => (
                            <button
                                key={btn.key}
                                type="button"
                                onClick={() => setFilter(btn.key)}
                                className={cn(
                                    'px-3 py-1.5 text-xs font-bold rounded-xl border transition-all duration-150 cursor-pointer shadow-2xs',
                                    filter === btn.key
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                        : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                                )}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </DrawerHeader>

                {/* --- LISTE DES LEÇONS DÉFILANTE --- */}
                <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 sm:p-5 flex-1 space-y-3">
                    {selectedLessons.map((lesson) => {
                        const lessonEval = lessonEvals.find((e) => e.lesson.id === lesson.id);
                        const isNotAddressed = !lessonEval || lessonEval.evaluation === 'notAcquired';

                        return (
                            <AnimLessonEvalFormDrawer
                                key={lesson.id}
                                animatorId={animatorId}
                                student={student}
                                lesson={lesson}
                                lessonEval={lessonEval}
                                cardStyle={cardStyle}
                                onLessonEvalUpserted={onLessonEvalUpserted}
                            >
                                <div
                                    className={cn(
                                        'w-full p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col group',
                                        isNotAddressed && 'opacity-80'
                                    )}
                                >
                                    <div className='flex justify-between'>
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div
                                                className={cn(
                                                    'size-6 rounded-lg flex items-center justify-center shrink-0 shadow-2xs',
                                                    cardStyle.iconBgColor,
                                                    cardStyle.highlightTextColor
                                                )}
                                            >
                                                <cardStyle.icon className="size-3" />
                                            </div>
                                            <div className="min-w-0">
                                                <span
                                                    className={cn(
                                                        'font-extrabold tracking-wider uppercase text-xs block mb-0.5',
                                                        cardStyle.highlightTextColor
                                                    )}
                                                >
                                                    {cardStyle.label}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Badges de statut */}
                                        <div className="shrink-0">
                                            {isNotAddressed && (
                                                <span className="px-2.5 py-1 text-xs font-bold rounded-full border flex items-center gap-1.5 bg-slate-100 text-slate-600 border-slate-200">
                                                    <CircleDashedIcon className="size-3.5" />
                                                    <span>Pas abordé</span>
                                                </span>
                                            )}
                                            {lessonEval?.evaluation === 'acquiring' && (
                                                <span className="px-2.5 py-1 text-xs font-bold rounded-full border flex items-center gap-1.5 bg-amber-50 text-amber-700 border-amber-200/80">
                                                    <TrendingUpIcon className="size-3.5 text-amber-500" />
                                                    <span>En cours</span>
                                                </span>
                                            )}
                                            {lessonEval?.evaluation === 'acquired' && (
                                                <span className="px-2.5 py-1 text-xs font-bold rounded-full border flex items-center gap-1.5 bg-sky-50 text-sky-700 border-sky-200/80">
                                                    <BicepsFlexedIcon className="size-3.5 text-sky-500" />
                                                    <span>Acquis</span>
                                                </span>
                                            )}
                                            {lessonEval?.evaluation === 'expert' && (
                                                <span className="px-2.5 py-1 text-xs font-bold rounded-full border flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border-emerald-200/80">
                                                    <StarsIcon className="size-3.5 text-emerald-500" />
                                                    <span>Maîtrise</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <h4 className="text-sm pl-9 font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                                        {lesson.label}
                                    </h4>

                                </div>
                            </AnimLessonEvalFormDrawer>
                        );
                    })}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default AnimLessonEvalListBySubjectDrawer;