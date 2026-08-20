import type { QcmEntry } from '@/api/student/apiCalls'
import { Button } from '@/components/ui/button'

const QcmResultsCard = ({qcm} : {qcm : QcmEntry}) => {
  return (
    <div className=' bg-zinc-100 rounded-md border border-zinc-200 mt-6 p-2'>
        <span className='font-medium'>Consultez les résultats du QCM de cette semaine :</span>
        <Button variant='qcm' className = 'w-full mt-2 text-base py-6'>Voir les résultats</Button>
        <pre>{JSON.stringify(qcm, null, 2)}</pre>
    </div>
  )
}

export default QcmResultsCard