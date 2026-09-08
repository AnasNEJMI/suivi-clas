import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';
import { cn } from '@/lib/utils'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertTriangleIcon, CalendarIcon, CalendarXIcon, ClockIcon, TrophyIcon, UserIcon } from 'lucide-react';
import SeanceDetailsDrawer from './seance-details-drawer';

const CarouselSeanceCard = ({bilan, onQcmSubmit} : {bilan : BilanEntry, onQcmSubmit : (qcm: QcmEntry) => void}) => {
  if(!bilan.presence || !bilan.lesson){
    return (
      <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border border-red-500 bg-red-100 opacity-50 shadow-sm`)}>
        <div className='flex justify-end font-medium text-sm'>
          <CalendarXIcon className='text-red-500 size-8'/>
        </div>
        <h3 className='text-lg font-semibold tracking-tight text-red-600'>Absence</h3>
        <div>
          <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
          <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span> <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {bilan.seance.seanceDuration.label}</span></p>
        </div>
      </div>
    )
  }
  const cardStyle = CARD_STYLES[bilan.lesson!.subject.label as Subject];
  return (
    <SeanceDetailsDrawer onQcmSubmit={onQcmSubmit} bilan={bilan} cardStyle={cardStyle}>
      <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col justify-between group-hover:border shadow-sm`, cardStyle.borderColor, cardStyle.bgColor)}>
        <div className='flex justify-end font-medium text-sm'>
          {bilan.qcm && !bilan.qcm.completed && <span className={cn('px-4 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}><AlertTriangleIcon className='w-4'/> Qcm à faire</span>}
          {bilan.qcm && bilan.qcm.completed && <span className={cn('px-4 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}>Qcm : <TrophyIcon className='w-4'/> {bilan.qcm.score!}/{bilan.qcm.qcmQuestions.length}</span>}
          {!bilan.qcm && <span className='px-4 rounded-full border'>Pas de QCM</span>}
        </div>
        <div>
          <p className={cn('text-xs font-bold flex flex-col items-start uppercase leading-3', cardStyle.highlightTextColor)}><cardStyle.icon/><span>{cardStyle.label}</span></p>
          <h3 className='text-base font-semibold tracking-tight max-w-48 truncate mt-1'>{bilan.lesson.label}</h3>
        </div>
        <div>
          <p className='text-sm opacity-75 flex items-center gap-2 tracking-tight'><UserIcon className='size-4'/><span><span className='capitalize'>{bilan.submittedBy.firstName}</span> <span className='uppercase'>{bilan.submittedBy.lastName}</span></span></p>
          <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {format(bilan.date, 'd/MM/y', {locale : fr})}</span> <span className='flex items-center justify-center gap-1'><ClockIcon className='size-4'/> {bilan.seance.seanceDuration.label}</span></p>
        </div>
      </div>
    </SeanceDetailsDrawer>
  )
}

export default CarouselSeanceCard