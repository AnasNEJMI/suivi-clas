import type { QcmEntry } from '@/api/student/apiCalls'
import { TriangleAlertIcon } from 'lucide-react'
import QcmQuestionnaire from './qcm-questionnaire'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const QcmCompletionCard = ({qcm, onQcmSubmit} : {qcm : QcmEntry, onQcmSubmit : (qcm: QcmEntry) => void}) => {
  return (
    <div className=' bg-zinc-50 rounded-md border border-zinc-200 mt-6 p-2'>
        <div className='flex gap-2'>
            <TriangleAlertIcon/>
            <p className='font-medium'>Vous avez un QCM à compléter pour cette semaine</p>
        </div>
        <QcmQuestionnaire qcm = {qcm} onQcmSubmit = {onQcmSubmit}/>
        <div className='flex justify-end mt-2'>
            <span className='text-sm font-light text-end opacity-75'>Créé le <span className='capitalize underline underline-offset-1 font-medium'>{format(qcm.createdAt, 'PPP', {locale : fr})}</span></span>
        </div>
    </div>
  )
}

export default QcmCompletionCard