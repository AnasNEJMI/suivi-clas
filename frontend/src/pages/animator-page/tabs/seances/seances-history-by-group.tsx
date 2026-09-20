import type { BilanEntry, DeleteBilanEntry, SeancesByScolarYearEntry } from '@/api/animator/seances.types'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRightIcon, RotateCwFadingClockIcon, UsersRoundIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import AnimSeanceCarouselCard from './seance-carousel-card';
import { Button } from '@/components/ui/button';
import GroupSeancesListDrawer from './group-seances-list-drawer';
import type { LessonsByLevelEntry } from '@/api/animator/types';

interface SeancesHistoryByGroupProps{
    seancesByScolarYear : SeancesByScolarYearEntry[],
    lessonsByLevel: LessonsByLevelEntry[],
    onBilanSubmitted:  (bilan: BilanEntry) => void,
    onBilanDeleted : (bilan : DeleteBilanEntry) => void
}

const SeancesHistoryByGroup = ({
    seancesByScolarYear, lessonsByLevel, onBilanSubmitted, onBilanDeleted
} : SeancesHistoryByGroupProps) => {
    const seancesData = seancesByScolarYear[0];
    if(!seancesData || seancesData.classes.length === 0){
        return (
            <div className='mt-6'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Les statistiques des séance réalisées seront affichées ici dès leur enregistrement.</CardDescription>
                    </CardHeader>   
                </Card>
            </div>
        )
    }
    return (
    <div className='mt-6'>
        <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
        {
            seancesData.classes.map((group) => {
                return (
                    <Fragment key={group.id}>
                        <div className='flex items-center gap-2 justify-between  mt-4'>
                            <h4 className='font-medium text-base text-zinc-900 flex items-center gap-2'><UsersRoundIcon className='size-4 text-sky-600'/>{group.label}</h4>
                            <span className='opacity-75 text-sm px-2 rounded-full border border-zinc-200'>{group.seances.length} séances</span>
                        </div>
                        {
                            group.seances.length === 0 &&
                            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                                <CardHeader className='flex flex-col items-center justify-center w-full'>
                                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment pour ce groupe.</CardTitle>
                                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Les statistiques des séance réalisées pour ce groupe seront affichées ici dès leur enregistrement.</CardDescription>
                                </CardHeader>   
                            </Card>
                        }
                        {
                            group.seances.length > 0 &&
                            <Carousel
                                opts={{align :'start'}}
                                className='mt-2'
                            >
                                <CarouselContent className='-ml-4 pt-4'>
                                    {
                                        group.seances
                                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                        .slice(0, Math.min(group.seances.length, 5))
                                        .map((seance) => (
                                            <CarouselItem key={seance.id} className="group pl-4 max-w-72 hover:-translate-y-2 transition-transform duration-100 ease-out">
                                                <AnimSeanceCarouselCard
                                                    seance = {seance}
                                                    group = {group.label}
                                                    lessonsByLevel={lessonsByLevel}
                                                    onBilanSubmitted={onBilanSubmitted}
                                                    onBilanDeleted={onBilanDeleted}
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
                                    <GroupSeancesListDrawer seances = {group.seances}>
                                        <Button variant={'outline'} className='tracking-tight'>Voir toutes les séances <ArrowRightIcon/></Button>
                                    </GroupSeancesListDrawer>
                                </div>
                            </Carousel>
                        }
                    </Fragment>
                )
            })
        }
    </div>
  )
}

export default SeancesHistoryByGroup