import type { PresenceStatsPerScolarYear } from '@/api/association-member/apiCalls'
import AssocClassPresenceCarousel from './class-presence-carousel';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCwFadingClockIcon } from 'lucide-react';

const AssocPresenceStatsPerClass = ({presenceStatsPerScolarYear} : {presenceStatsPerScolarYear : PresenceStatsPerScolarYear[]}) => {
  const presenceStats = presenceStatsPerScolarYear[0];
  if(!presenceStats || presenceStats.classes.length === 0){
    return (
      <Card className='border-2 border-dashed border-zinc-200 shadow-none h-64 flex flex-col items-center justify-center w-full rounded-xl bg-transparent mt-4 p-4'>
        <CardHeader className='flex flex-col items-center justify-center w-full'>
            <RotateCwFadingClockIcon className='size-10 opacity-70'/>
            <CardTitle className='text-base font-medium opacity-70 text-center text-balance'>Les données de présence n'ont pas été enregistrées pour le moment.</CardTitle>
            <CardDescription className='text-pretty text-sm max-w-xl text-center'>Toutes les données de présence enregistrées seront affichées ici dès leur réalisation.</CardDescription>
        </CardHeader>   
    </Card>
    )
  }

  return (
    <>
      <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Par Groupe</h3>
      <div className='mt-2'>
        {
          presenceStats.classes.map((classPresence, index) => (
            <AssocClassPresenceCarousel key={index} classPresence = {classPresence}/>
          ))
        }
      </div>
    </>
  )
}

export default AssocPresenceStatsPerClass