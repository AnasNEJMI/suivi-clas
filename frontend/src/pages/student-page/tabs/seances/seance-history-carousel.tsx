import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ArrowRightIcon, RotateCwFadingClockIcon } from 'lucide-react'
import CarouselSeanceCard from './carousel-seance-card'
import SeancesListDrawer from './seances-list-drawer'

const SeanceHistoryCarousel = ({bilans, onQcmSubmit} : {bilans : BilanEntry[], onQcmSubmit : (qcm: QcmEntry) => void}) => {
    if(bilans.length === 0){
        return (
            <div className='mt-12'>
                <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
                    <span className='px-4 py-2 leading-4.5 rounded-full bg-white text-zinc-600 border border-zinc-300'>0 séances</span>
                </div>
                <p className='opacity-75'>Toutes les séances organisée durant l'année scolaire, au même endroit.</p>
                <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
                    <CardHeader className='flex flex-col items-center justify-center w-full'>
                        <RotateCwFadingClockIcon className='size-10 opacity-70'/>
                        <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Aucune séance enregistrée pour le moment.</CardTitle>
                        <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les séance enregistrées seront affichées ici dès leur réalisation.</CardDescription>
                    </CardHeader>   
                </Card>
            </div>
        )
    }
  
    return (
        <div className='mt-12'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-lg lg:text-xl text-zinc-900'>Historique des séances</h3>
                <span className='px-4 py-2 leading-4.5 rounded-full bg-white text-zinc-900 border border-zinc-300'>{bilans.length} séances</span>
            </div>
            <p className='opacity-75 max-w-sm lg:max-w-xl text-balance text-start text-sm lg:text-base'>Toutes les séances organisée durant l'année scolaire, au même endroit.</p>
            <Carousel
                opts={{align :'start'}}
                className='mt-2'
            >
                <CarouselContent className='-ml-4 pt-4'>
                    {
                        bilans.slice(0, Math.min(bilans.length, 5)).map((bilan) => (
                            <CarouselItem key={bilan.id} className="group pl-4 max-w-60 h-48 hover:-translate-y-2 transition-transform duration-100 ease-out">
                                <CarouselSeanceCard onQcmSubmit = {onQcmSubmit} bilan = {bilan}/>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <div className='mt-4 flex justify-between items-center'>
                    <div>
                        <CarouselPrevious variant={'outline'}/>
                        <CarouselNext variant={'outline'}/>
                    </div>
                    <SeancesListDrawer   bilans = {bilans} onQcmSubmit={onQcmSubmit}>
                        <Button variant={'outline'} className='tracking-tight'>Voir toutes les séances <ArrowRightIcon/></Button>
                    </SeancesListDrawer>
                </div>
            </Carousel>
        </div>
  )
}

export default SeanceHistoryCarousel