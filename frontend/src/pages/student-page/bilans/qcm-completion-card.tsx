import type { QcmEntry } from '@/api/student/apiCalls'
import { TriangleAlertIcon } from 'lucide-react'
import QcmQuestionnaire from './qcm-questionnaire'

const QcmCompletionCard = ({qcm} : {qcm : QcmEntry}) => {
  return (
    <div className=' bg-zinc-50 rounded-md border border-zinc-200 mt-6 p-2'>
        <div className='flex gap-2'>
            <TriangleAlertIcon/>
            <p className='font-medium'>Vous avez un QCM à compléter pour cette semaine</p>
        </div>
        <QcmQuestionnaire qcm = {qcm}/>
        <div className='flex justify-end mt-2'>
            <span className='text-sm font-light text-end opacity-75'>Temps restant : 2 Jours</span>
        </div>
    </div>
  )
}

export default QcmCompletionCard