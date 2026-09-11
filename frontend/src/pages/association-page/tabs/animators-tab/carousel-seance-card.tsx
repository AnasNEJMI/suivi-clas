import AssocSeanceDetailsDrawer from './seance-details-drawer'
import { cn, getElapsedDays } from '@/lib/utils'
import { CalendarIcon, ClockIcon, GraduationCapIcon, UserIcon } from 'lucide-react'
import type { CarouselSeance } from './seance-history-carousel'
const AssocCarouselSeanceCard = ({seance} : {seance : CarouselSeance}) => {
  const studentsPresent = seance.seance.students.filter(s => s.presence).length;
  const studentsAbsent = seance.seance.students.filter(s => !s.presence).length;
  const presenceRate = Math.round(100 * studentsPresent/(studentsPresent+studentsAbsent))
  return (
    <AssocSeanceDetailsDrawer seance={seance}>
      <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border shadow-sm bg-white`)}>
        <div className='flex justify-end font-medium text-sm'>
          <span className={cn('px-2 rounded-full flex items-center gap-2 text-sm tracking-tight bg-amber-200 border border-amber-500')}><CalendarIcon className='size-4 text-amber-700'/>{getElapsedDays(seance.seance.date)}</span>
        </div>
        <div className='mt-8'>
          <p className='text-sm flex items-center gap-2 tracking-tight font-semibold'><UserIcon className='size-4'/><span><span className='capitalize'>{seance.animator.firstName}</span> <span className='uppercase'>{seance.animator.lastName}</span></span></p>
          <p className='text-sm leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><GraduationCapIcon className='size-4'/> {seance.class.label}</span></p>
          <p className='text-sm leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {seance.seance.duration}</span></p>
        </div>

        <div className='flex justify-start mt-4'>
          <span className={cn('border px-2 text-sm',presenceRate >= 50 ? 'bg-emerald-200 text-emerald-700 border-emerald-400 rounded-full' : 'bg-red-200 text-red-700 border-red-400')}>{studentsPresent}/{studentsPresent+studentsAbsent} élèves présents</span>
        </div>
      </div>
    </AssocSeanceDetailsDrawer>
  )
}

export default AssocCarouselSeanceCard