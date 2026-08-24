import type { QcmEntry } from '@/api/student/apiCalls'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { XIcon } from 'lucide-react'

const QcmNotCompletedRow = ({qcm}: {qcm : QcmEntry}) => {
  return (
    <div className='border border-red-400 bg-linear-270 from-0% to-25% from-red-300 to-transparent rounded-md py-2 px-4 gap-2 flex items-center justify-between'>
        <div className='flex flex-col'>
            <span className='font-bold text-sm'>{qcm.lesson?.label}</span>
            <span className='capitalize text-sm opacity-75'>{format(qcm.createdAt, 'PPP', {locale : fr})}</span>
        </div>
        <XIcon className='text-red-500'/>
    </div>
  )
}

export default QcmNotCompletedRow