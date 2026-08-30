import type { QcmEntry } from '@/api/student/apiCalls'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CheckIcon } from 'lucide-react'

const QcmCompletedRow = ({qcm}: {qcm : QcmEntry}) => {
  return (
    <div className='border-0 border-lime-600 rounded-md py-2 px-4 flex items-center justify-between'>
        <div className='flex flex-col'>
            <span className='font-bold text-sm'>{qcm.lesson?.label}</span>
            <span className='capitalize text-sm opacity-75'>{format(qcm.createdAt, 'PPP', {locale : fr})} | ({qcm.score} / 10)</span>
        </div>
        <CheckIcon className='text-lime-100'/>
    </div>
  )
}

export default QcmCompletedRow