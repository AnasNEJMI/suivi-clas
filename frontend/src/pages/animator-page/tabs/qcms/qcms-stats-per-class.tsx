import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCwFadingClockIcon } from 'lucide-react';
import type { SeancesByScolarYearEntry } from '@/api/animator/seances.types';
import AnimClassQCMsCarousel from './class-qcms-carousel';
import type { ScolarYearEntry } from '@/api/animator/types';

const AnimQcmsStatsPerClass = ({seancesByScolarYear, baseData} : {seancesByScolarYear : SeancesByScolarYearEntry[], baseData : ScolarYearEntry}) => {
  const seancesStatsPerClass = seancesByScolarYear[0].classes;
  if(!seancesStatsPerClass || seancesStatsPerClass.length === 0){
    return (
      <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
        <CardHeader className='flex flex-col items-center justify-center w-full'>
            <RotateCwFadingClockIcon className='size-10 opacity-70'/>
            <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de QCMs n'ont pas été enregistrées.</CardTitle>
            <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de QCMs enregistrées seront affichées ici dès leur réalisation.</CardDescription>
        </CardHeader>   
    </Card>
    )
  }

  return (
    <>
      <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Qcms cette année</h3>
      <div className='mt-2'>
        {
          seancesStatsPerClass.map((clasSStats, index) => (
            <AnimClassQCMsCarousel key={index} classStats = {clasSStats} baseData = {baseData}/>
          ))
        }
      </div>
    </>
  )
}

export default AnimQcmsStatsPerClass