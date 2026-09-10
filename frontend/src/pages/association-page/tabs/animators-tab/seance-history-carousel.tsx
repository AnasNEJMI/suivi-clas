import type { AnimatorStatsPerScolarYear, SeanceStats } from "@/api/association-member/apiCalls"
import { ArrowRightIcon, RotateCwFadingClockIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from "@/components/ui/button";
import AssocCarouselSeanceCard from "./carousel-seance-card";
import AssocSeancesListDrawer from "./seances-list-drawer";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export type CarouselSeance = {
    animator : {id : number, firstName : string, lastName : string, gender : 'f' | 'm'},
    class : {id : number, label : string},
    seance : SeanceStats
}

const CAROUSEL_MAX_LENGTH = 5;
const AssocSeanceHistoryCarousel = ({animatorStatsPerScolarYear} : {animatorStatsPerScolarYear : AnimatorStatsPerScolarYear[]}) => {
    const animatorStats = animatorStatsPerScolarYear[0];

    return (
    <>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
        <p className='opacity-75 max-w-sm lg:max-w-xl lg:text-balance text-start text-sm lg:text-base'>Toutes les séances organisées durant l'année scolaire, au même endroit.</p>
        {
            animatorStats.animators.map((animator) => {
                const name = `${animator.animator.firstName} ${animator.animator.lastName}`
                const seances : CarouselSeance[] = animator.classes.map(c => c.seances.map(s => {return {animator : animator.animator, class : {id : c.class.id, label : c.class.label}, seance : s}})).flat();
                seances.sort((a, b) => new Date(b.seance.date).getTime() - new Date(a.seance.date).getTime())

                const filters = [...new Set(seances.map(s => s.class.label)), 'all'];
                return (
                    <div key={animator.animator.id} className="mt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className='w-8 h-8 rounded-full bg-sky-300 flex items-center justify-center font-bold text-base'>
                                {name.slice(0,1)}
                            </div>
                            <span className="font-semibold">{name}</span>
                            </div>
                            <span className="px-2 rounded-full bg-white border border-zinc-200 text-sm opacity-75">{seances.length} séances</span>
                        </div>
                        {
                            seances.length === 0 &&
                            <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                                <CardHeader className='flex flex-col items-center justify-center w-full'>
                                    <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                                    <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment.</CardTitle>
                                    <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les séance enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                                </CardHeader>   
                            </Card>
                        }
                        {
                            seances.length > 0 &&
                            <Carousel
                                opts={{align :'start'}}
                                className='mt-2'
                            >
                                <CarouselContent className='-ml-4 pt-4'>
                                    {
                                        seances.slice(0, Math.min(CAROUSEL_MAX_LENGTH, seances.length)).map((seance) => (
                                            <CarouselItem key={seance.seance.id} className="group pl-4 max-w-60 pb-4 hover:-translate-y-2 transition-transform duration-100 ease-out">
                                                <AssocCarouselSeanceCard  seance = {seance}/>
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <div className=' flex justify-between items-center'>
                                    <div>
                                        <CarouselPrevious variant={'outline'}/>
                                        <CarouselNext variant={'outline'}/>
                                    </div>
                                    <AssocSeancesListDrawer seances = {seances} filters = {filters}>
                                        <Button variant={'outline'} className='tracking-tight'>Voir toutes les séances <ArrowRightIcon/></Button>
                                    </AssocSeancesListDrawer>
                                </div>
                            </Carousel>
                        }
                    </div>
                )
            })
        }
    </>
  )
}

export default AssocSeanceHistoryCarousel