import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import { ChevronRightIcon, RotateCwFadingClockIcon } from 'lucide-react'
import type { LessonEvalData, StudentLessonEvalsEntry } from '@/api/animator/lesson-evals.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import AnimLessonEvalListBySubjectDrawer from './lesson-eval-list-by-subject-drawer'

const AnimLessonEvalsRecapPerSubject = ({animatorId, student, lessonsByLevel, onLessonEvalUpserted} : {animatorId : number, student : StudentLessonEvalsEntry, lessonsByLevel : LessonsByLevelEntry[],onLessonEvalUpserted : (skillEval : LessonEvalData)  => void}) => {
    const subjects = lessonsByLevel.find(level => level.id === student.level.id)?.subjects;
    if(!subjects){
        return(
            <>
                {/* <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Par matière</h3> */}
                <Card className='border-2 mt-4 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune matière ne vous a été attribuée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Une fois des matières attribuées, vous découvrirez ici le programme de chaque matière.</CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }


    return (
    <>
        {/* <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Par matière</h3> */}
        <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-2'
        )}>
            {
                subjects.map((subject) => {
                    const cardStyle = CARD_STYLES[subject.label as Subject];
                    const lessonEvals = student.lessonEvalsBySubject.find(s => s.id === subject.id)?.lessonEvals ?? [];

                    const lessonsEvaluatedCount = lessonEvals.filter(l => l.evaluation !== 'notAcquired').length;
                    const lessonsAquiringCount = lessonEvals.filter(l => l.evaluation === 'acquiring').length;
                    const lessonsAcquiredCount = lessonEvals.filter(l => l.evaluation === 'acquired').length;
                    const lessonsExpertCount = lessonEvals.filter(l => l.evaluation === 'expert').length;
                    const lessonsEvaluatedPct = Math.round(100*lessonsEvaluatedCount/subject.lessons.length);
                    return(
                        <AnimLessonEvalListBySubjectDrawer
                            key={subject.id}
                            animatorId = {animatorId}
                            onLessonEvalUpserted = {onLessonEvalUpserted}
                            student = {student}
                            subject={subject}
                            lessonEvals = {lessonEvals}
                            cardStyle={cardStyle}
                        >
                            <Card className={cn(
                                'mt-4 font-outfit border-px shadow-none flex flex-col items-start justify-start w-full rounded-xl hover:-translate-y-1 transition-transform duration-100 ease-out cursor-pointer',
                                cardStyle.bgColor, cardStyle.borderColor
                            )}>
                                <CardHeader className='w-full flex justify-between'>
                                    <div>
                                        <cardStyle.icon className={cn('size-8 p-2 rounded-md', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                        <CardTitle className={cn('font-bold text-lg mt-2')}>{cardStyle.label}</CardTitle>
                                        <CardDescription className='leading-1 text-sm m-0'>{lessonsEvaluatedCount}/{subject.lessons.length} leçons évaluées</CardDescription>
                                    </div>
                                    <span className={cn('px-4 py-1 text-xs rounded-full text-nowrap border tracking-tight', cardStyle.borderColor, cardStyle.iconBgColor, cardStyle.highlightTextColor)}>Progression : {lessonsEvaluatedPct}%</span>
                                </CardHeader>
                                <CardContent className='w-full'>
                                    <Progress
                                    rootColor={cardStyle.progressBgColor}
                                    indicatorColor={cardStyle.progressIndicatorColor}
                                    value={lessonsEvaluatedPct}
                                    className="w-full"/>
                                    <div className='mt-4 text-sm opacity-75'>
                                        <div className='flex justify-between items-center'>
                                            <span>Pas abordé</span>
                                            <span className='font-medium'>{subject.lessons.length - lessonsEvaluatedCount} leçons</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>En cours d'acquisition</span>
                                            <span className='font-medium'>{lessonsAquiringCount} leçons</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>Acquis</span>
                                            <span className='font-medium'>{lessonsAcquiredCount} leçons</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>Maîtrise</span>
                                            <span className='font-medium'>{lessonsExpertCount} leçons</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className='flex justify-end w-full'>
                                        <Button variant={'ghost'} className={`text-zinc-800 text-sm hover:bg-zinc-900 hover:text-white flex gap-2 items-center`}>Voir le programme <ChevronRightIcon/></Button>
                                </CardFooter>
                            </Card>
                        </AnimLessonEvalListBySubjectDrawer>
                    )
                })
            }
        </div>
    </>
  )
}

export default AnimLessonEvalsRecapPerSubject