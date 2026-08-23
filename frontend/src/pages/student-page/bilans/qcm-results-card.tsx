import type { QcmEntry } from '@/api/student/apiCalls'
import QcmResultsQuestionnaire from './qcm-results-questionnaire'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const QcmResultsCard = ({qcm} : {qcm : QcmEntry}) => {
  return (
    <div className=' bg-zinc-100 rounded-md border border-zinc-200 mt-6 p-2'>
        <span className='font-medium'>Consultez les résultats du QCM de cette semaine :</span>
        <QcmResultsQuestionnaire qcm = {qcm}/>
        <div className='flex justify-end mt-2'>
            <span className='text-sm font-light text-end opacity-75'>Complété le <span className='capitalize underline underline-offset-1 font-medium'>{format(qcm.updatedAt, 'PPP', {locale : fr})}</span></span>
        </div>
    </div>
  )
}

export default QcmResultsCard