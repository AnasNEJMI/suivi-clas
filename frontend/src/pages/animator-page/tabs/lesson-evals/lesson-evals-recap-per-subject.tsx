import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import { ChevronRightIcon, RotateCwFadingClockIcon } from 'lucide-react'
import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import AnimLessonEvalListBySubjectDrawer from './lesson-eval-list-by-subject-drawer'

interface AnimLessonEvalsRecapPerSubjectProps {
    animatorId: number
    student: StudentLessonEvalsEntry
    lessonsByLevel: LessonsByLevelEntry[]
    onLessonEvalUpserted: (lessonEval: LessonEvalData) => void
}

const AnimLessonEvalsRecapPerSubject = ({
    animatorId,
    student,
    lessonsByLevel,
    onLessonEvalUpserted,
}: AnimLessonEvalsRecapPerSubjectProps) => {
    const subjects = lessonsByLevel.find((level) => level.id === student.level.id)?.subjects

    if (!subjects || subjects.length === 0) {
        return (
            <Card className='border-2 border-dashed border-slate-200/80 shadow-none h-48 flex flex-col items-center justify-center w-full rounded-2xl bg-white/60 p-6 text-center mt-4'>
                <CardHeader className='p-0 flex flex-col items-center w-full'>
                    <div className="size-11 rounded-2xl bg-slate-100/80 flex items-center justify-center mb-2">
                        <RotateCwFadingClockIcon className='size-5 text-slate-400' />
                    </div>
                    <CardTitle className='text-sm font-bold text-slate-800'>
                        Aucune matière disponible pour le moment
                    </CardTitle>
                    <CardDescription className='text-xs text-slate-500 max-w-sm mt-1'>
                        Le programme des matières apparaîtra ici dès son affectation.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <div className="space-y-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {subjects.map((subject) => {
                    const cardStyle = CARD_STYLES[subject.label as Subject] ?? {
                        bgColor: 'bg-white',
                        borderColor: 'border-slate-200',
                        iconBgColor: 'bg-indigo-50',
                        highlightTextColor: 'text-indigo-700',
                        progressBgColor: 'bg-slate-100',
                        progressIndicatorColor: 'bg-indigo-600',
                        label: subject.label,
                        icon: RotateCwFadingClockIcon,
                    }

                    const subjectEntry = student.lessonEvalsBySubject.find((s) => s.id === subject.id)
                    const lessonEvals = subjectEntry?.lessonEvals ?? []

                    // CORRECTION LOGIQUE & CALCULS :
                    // Une leçon est évaluée si son statut n'est ni 'notAcquired' ni non défini/notEvaluated
                    const evaluatedLessons = lessonEvals.filter(
                        (l) => l.evaluation && l.evaluation !== 'notAcquired'
                    )

                    const lessonsEvaluatedCount = evaluatedLessons.length
                    const lessonsAquiringCount = lessonEvals.filter((l) => l.evaluation === 'acquiring').length
                    const lessonsAcquiredCount = lessonEvals.filter((l) => l.evaluation === 'acquired').length
                    const lessonsExpertCount = lessonEvals.filter((l) => l.evaluation === 'expert').length
                    
                    // CORRECTION DU CALCUL DES LEÇONS NON ABORDÉES
                    const lessonsNotAddressedCount = Math.max(0, subject.lessons.length - lessonsEvaluatedCount)
                    
                    const lessonsEvaluatedPct = subject.lessons.length > 0 
                        ? Math.round((lessonsEvaluatedCount / subject.lessons.length) * 100) 
                        : 0

                    return (
                        <AnimLessonEvalListBySubjectDrawer
                            key={subject.id}
                            animatorId={animatorId}
                            onLessonEvalUpserted={onLessonEvalUpserted}
                            student={student}
                            subject={subject}
                            lessonEvals={lessonEvals}
                            cardStyle={cardStyle}
                        >
                            <Card className={cn(
                                'font-outfit border rounded-2xl shadow-2xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer p-5 bg-white',
                                cardStyle.borderColor, cardStyle.bgColor
                            )}>
                                <CardHeader className='p-0 flex flex-row items-start justify-between space-y-0 mb-4'>
                                    <div className="flex items-center gap-3">
                                        <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs', cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
                                            <cardStyle.icon className="size-5" />
                                        </div>
                                        <div>
                                            <CardTitle className='font-bold text-base text-slate-900'>{cardStyle.label}</CardTitle>
                                            <CardDescription className='text-xs font-medium text-slate-500 mt-0.5'>
                                                {lessonsEvaluatedCount}/{subject.lessons.length} leçons évaluées
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <span className={cn('px-2.5 py-1 text-[11px] font-bold rounded-full border shadow-2xs', cardStyle.borderColor, cardStyle.iconBgColor, cardStyle.highlightTextColor)}>
                                        {lessonsEvaluatedPct}%
                                    </span>
                                </CardHeader>

                                <CardContent className='p-0 space-y-4'>
                                    <Progress
                                        rootColor={cardStyle.progressBgColor}
                                        indicatorColor={cardStyle.progressIndicatorColor}
                                        value={lessonsEvaluatedPct}
                                        className="w-full h-2 rounded-full overflow-hidden"
                                    />

                                    <div className='grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 bg-slate-50/60 p-3 rounded-xl border border-slate-100'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-slate-500'>Pas abordé</span>
                                            <span className='font-bold text-slate-700'>{lessonsNotAddressedCount}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-amber-700'>En cours</span>
                                            <span className='font-bold text-amber-700'>{lessonsAquiringCount}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-sky-700'>Acquis</span>
                                            <span className='font-bold text-sky-700'>{lessonsAcquiredCount}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-emerald-700'>Maîtrise</span>
                                            <span className='font-bold text-emerald-700'>{lessonsExpertCount}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className={cn('p-0 pt-4 mt-4 border-t border-slate-900/10 flex justify-end items-center w-full')}>
                                    <div className='inline-flex items-center gap-1 text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors'>
                                        <span>Voir le programme</span>
                                        <ChevronRightIcon className="size-4" />
                                    </div>
                                </CardFooter>
                            </Card>
                        </AnimLessonEvalListBySubjectDrawer>
                    )
                })}
            </div>
        </div>
    )
}

export default AnimLessonEvalsRecapPerSubject