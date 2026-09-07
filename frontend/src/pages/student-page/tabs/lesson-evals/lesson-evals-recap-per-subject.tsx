import type { LessonsBySubject } from '@/api/student/apiCalls'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types'
import { cn } from '@/lib/utils'
import { ChevronRightIcon, RotateCwFadingClockIcon } from 'lucide-react'
import SubjectEvalListDrawer from './subject-eval-list-drawer'

const LessonEvalsRecapPerSubject = ({lessonsBySubject} : {lessonsBySubject : LessonsBySubject[]}) => {
    if(!lessonsBySubject){
        return(
            <>
                <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Par matière</h3>
                <Card className='border-2 mt-4 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune leçon n'a encore été évaluée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Une fois des évaluations de leçons soumises, vous découvrirez ici le bilan global de maîtrise.</CardDescription>
                    </CardHeader>
                </Card>
            </>
        )
    }


    return (
    <>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900 tracking-tight'>Par matière</h3>
        <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-2'
        )}>
            {
                lessonsBySubject.map((subject) => {
                    const cardStyle = CARD_STYLES[subject.label as Subject];
                    const lessonsEvaluated = subject.lessons.filter(l => l.eval !== null).length;
                    // const lessonsNotAcquiredCount = subject.lessons.filter(l => l.eval?.evaluation === 'notAcquired').length;
                    const lessonsAquiringCount = subject.lessons.filter(l => l.eval?.evaluation === 'acquiring').length;
                    const lessonsAcquiredCount = subject.lessons.filter(l => l.eval?.evaluation === 'acquired').length;
                    const lessonsExpertCount = subject.lessons.filter(l => l.eval?.evaluation === 'expert').length;
                    const lessonsEvaluatedPct = Math.round(100*lessonsEvaluated/subject.lessons.length);
                    return(
                        <Card key={subject.id} className={cn(
                            'mt-4 font-outfit border-none shadow-none flex flex-col items-start justify-start w-full rounded-xl',
                            cardStyle.bgColor
                        )}>
                            <CardHeader className='w-full flex justify-between'>
                                <div>
                                    <cardStyle.icon className={cn('size-8 p-2 rounded-md', cardStyle.iconBgColor, cardStyle.highlightTextColor)}/>
                                    <CardTitle className={cn('font-bold text-lg mt-2')}>{cardStyle.label}</CardTitle>
                                    <CardDescription className='leading-1 text-sm m-0'>{lessonsEvaluated}/{subject.lessons.length} leçons évaluées</CardDescription>
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
                                        <span>Pas acquis</span>
                                        <span className='font-medium'>{subject.lessons.length - lessonsEvaluated} leçons</span>
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
                                <SubjectEvalListDrawer
                                    subject={subject}
                                    cardStyle={cardStyle}
                                >
                                    <Button variant={'ghost'} className={`text-zinc-600 text-sm hover:bg-zinc-900 hover:text-white flex gap-2 items-center`}>Voir le programme <ChevronRightIcon/></Button>
                                </SubjectEvalListDrawer>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </div>
    </>
  )
}

export default LessonEvalsRecapPerSubject