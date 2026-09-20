import type {DeleteBilanEntry, SeanceDurationEntry, StudentEntry } from '@/api/animator/seances.types'
import AnimBilanCompletedDrawer from './bilan-completed-drawer'
import { cn, getElapsedDays } from '@/lib/utils'
import { AlertTriangleIcon, BookOpenText, CalendarIcon, CalendarXIcon, ClockFadingIcon, SchoolIcon, TrophyIcon, UserIcon } from 'lucide-react';
import { CARD_STYLES, type Subject } from '@/lib/types/data.types';

interface AnimBilanCompletedCardProps{
    studentBilan : StudentEntry,
    seanceDate : Date,
    seanceDuration : SeanceDurationEntry,
    onBilanDeleted : (bilan : DeleteBilanEntry) => void
}

const AnimBilanCompletedCard = ({
  seanceDuration, studentBilan, seanceDate, onBilanDeleted
} : AnimBilanCompletedCardProps) => {
    const bilan = studentBilan.bilan;

    if(!bilan){
        return null;
    }

    const name = `${studentBilan.firstName} ${studentBilan.lastName}`;
    const level = studentBilan.level?.label ?? null;
    const date = bilan.date; 
    const present = bilan.presence;
    const lesson = bilan.lesson;

    const cardStyle = present ? CARD_STYLES[studentBilan.bilan!.lesson!.subject.label as Subject] : CARD_STYLES['none'];
    if(!present || !lesson){
      return (
        <AnimBilanCompletedDrawer
              studentBilan={studentBilan}
              seanceDate={seanceDate}
              seanceDuration={seanceDuration}
              onBilanDeleted={onBilanDeleted}
              >
          <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col shadow-sm opacity-80`, cardStyle.bgColor)}>
              <p className={cn('text-sm font-bold flex items-center gap-2 justify-end uppercase leading-3', cardStyle.highlightTextColor)}><CalendarXIcon className='size-4'/><span>Absence</span></p>
              <p className='text-base font-semibold flex items-center gap-2 tracking-tight mt-4'><UserIcon className='size-4'/>{name}</p>
              <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start mt-auto'>
                <span className='flex items-center justify-center gap-1'><SchoolIcon className='size-4'/> {level}</span>
                <span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {getElapsedDays(date)}</span>
                <span className='flex items-center justify-center gap-1'><ClockFadingIcon className='size-4'/> {seanceDuration.label}</span>
              </p>
              <div className='flex justify-end mt-4 text-xs'>
                  <span className={cn('px-2 rounded-full border', cardStyle.borderColor, cardStyle.highlightTextColor)}>Pas de QCM</span>
              </div>
          </div>
        </AnimBilanCompletedDrawer>
      )
    }
  return (
    <AnimBilanCompletedDrawer
      studentBilan={studentBilan}
      seanceDate={seanceDate}
      seanceDuration={seanceDuration}
      onBilanDeleted={onBilanDeleted}
    >
        <div className={cn(`rounded-xl w-full h-full p-4 font-outfit flex flex-col  shadow-sm`, cardStyle.bgColor)}>

            <p className={cn('text-sm font-bold flex items-center gap-2 justify-end uppercase leading-3', cardStyle.highlightTextColor)}><cardStyle.icon className='size-4'/><span>{cardStyle.label}</span></p>
            <p className='text-base font-semibold flex items-center gap-2 tracking-tight mt-4'><UserIcon className='size-4'/>{name}</p>
            <h3 className='text-sm opacity-75 font-medium tracking-tight max-w-full truncate mt-auto flex items-center gap-2'><BookOpenText className='size-4'/>{lesson.label}</h3>
            <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><SchoolIcon className='size-4'/> {level}</span></p>
            <p className='text-sm opacity-75 leading-4 tracking-tight flex flex-col items-start'><span className='flex items-center justify-center gap-1'><CalendarIcon className='size-4'/> {getElapsedDays(date)}</span> <span className='flex items-center justify-center gap-1'><ClockFadingIcon className='size-4'/> {seanceDuration.label}</span></p>
            <div className='flex justify-end mt-4 text-xs'>
                {bilan.qcm && !bilan.qcm.completed && <span className={cn('px-2 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}><AlertTriangleIcon className='w-4'/> Qcm à faire</span>}
                {bilan.qcm && bilan.qcm.completed && <span className={cn('px-2 rounded-full border flex items-center gap-2', cardStyle.borderColor, cardStyle.iconBgColor)}>Qcm : <TrophyIcon className='w-4'/> {bilan.qcm.score!}/{bilan.qcm.qcmQuestions.length}</span>}
                {!bilan.qcm && <span className='px-2 rounded-full border'>Pas de QCM</span>}
            </div>
        </div>
    </AnimBilanCompletedDrawer>
  )
}

export default AnimBilanCompletedCard