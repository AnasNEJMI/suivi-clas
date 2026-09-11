import type { VisitStatsPerScolarYear } from '@/api/association-member/apiCalls'
import AssocClassVisitCarousel from './class-visit-carousel';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCwFadingClockIcon } from 'lucide-react';

const AssocVisitStatsPerClass = ({visitStatsPerScolarYear} : {visitStatsPerScolarYear : VisitStatsPerScolarYear[]}) => {
  const visitStats = visitStatsPerScolarYear[0];
  if(!visitStats || visitStats.classes.length === 0){
    return (
      <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
        <CardHeader className='flex flex-col items-center justify-center w-full'>
            <RotateCwFadingClockIcon className='size-10 opacity-70'/>
            <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de visites n'ont pas été enregistrées pour le moment.</CardTitle>
            <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de visites enregistrées seront affichées ici dès leur réalisation.</CardDescription>
        </CardHeader>   
    </Card>
    )
  }

  return (
    <>
      <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Visites cette année</h3>
      <div className='mt-2'>
        {
          visitStats.classes.map((classVisits, index) => (
            <AssocClassVisitCarousel key={index} classVisits = {classVisits}/>
          ))
        }
      </div>
    </>
  )
}

export default AssocVisitStatsPerClass