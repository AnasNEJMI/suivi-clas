import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { RotateCwFadingClockIcon, UsersRoundIcon } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import AnimLessonEvalCarouselCard from './lesson-eval-carousel-card'
import type { LessonEvalClassEntry, LessonEvalData } from '@/api/animator/lesson-evals.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'

const AnimLessonEvalsByGroup = ({classes, animatorId, onLessonEvalUpserted, lessonsByLevel} : {classes : LessonEvalClassEntry[], animatorId : number, onLessonEvalUpserted : (skillEval : LessonEvalData)  => void, lessonsByLevel : LessonsByLevelEntry[]}) => {
    if(!classes || classes.length === 0){
        <div className='mt-6'>
            <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Compétences méthodologiques</h3>
            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                <CardHeader className='flex flex-col items-center justify-center w-full'>
                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucun groupe enregistré pour le moment.</CardTitle>
                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Les données de chaque groupe seront affichées ici dès leur enregistrement.</CardDescription>
                </CardHeader>   
            </Card>
        </div>
    }
    return (
        <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
        {
            classes.map((group) => {
                return (
                    <Fragment key={group.id}>
                        <div className='flex items-center gap-2 justify-between  mt-4'>
                            <h4 className='font-medium text-base text-zinc-900 flex items-center gap-2'><UsersRoundIcon className='size-4 text-sky-600'/>{group.label}</h4>
                            <span className='opacity-75 text-sm px-2 rounded-full border border-zinc-200'>{group.students.length} élèves</span>
                        </div>
                        <Carousel
                            opts={{align :'start'}}
                            className='mt-2'
                        >
                            <CarouselContent className='-ml-4 pt-4'>
                                {
                                    group.students
                                    .map((student) => (
                                        <CarouselItem key={student.id} className="group pl-4 pb-2 max-w-72 hover:-translate-y-2 transition-transform duration-100 ease-out">
                                            <AnimLessonEvalCarouselCard
                                                student = {student}
                                                animatorId={animatorId}
                                                group = {group.label}
                                                onLessonEvalUpserted={onLessonEvalUpserted}
                                                lessonsByLevel = {lessonsByLevel}
                                            />
                                        </CarouselItem>
                                    ))
                                }
                            </CarouselContent>
                            <div className='mt-4 flex justify-between items-center'>
                                <div>
                                    <CarouselPrevious variant={'outline'}/>
                                    <CarouselNext variant={'outline'}/>
                                </div>
                            </div>
                        </Carousel>
                    </Fragment>
                )
            })
        }
    </div>
    )
}

export default AnimLessonEvalsByGroup