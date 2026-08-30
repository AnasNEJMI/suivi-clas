import type { QcmEntry } from '@/api/student/apiCalls'
import QcmCompletedRow from './qcm-completed-row'
import QcmNotCompletedRow from './qcm-not-completed-row'

const QcmList = ({qcms }: {qcms : QcmEntry[]}) => {
  return (
    <div className=''>
        <span className='font-medium text-lg lg:text-xl'>Liste des Qcms</span>
        <div className="p-4 gap-2 flex flex-col max-h-72 overflow-y-auto brand-h-scrollbar ">
            {qcms.map((qcm) => {
                if(qcm.completed){
                    return <QcmCompletedRow key = {qcm.id} qcm = {qcm}/>
                }
                return <QcmNotCompletedRow key = {qcm.id} qcm = {qcm}/>
            })}
        </div>
        {/* <div className='flex flex-col gap-2 mt-4'>
            {
                qcms.map((qcm) => {
                    if(qcm.completed){
                        return <QcmCompletedRow key = {qcm.id} qcm = {qcm}/>
                    }
                    return <QcmNotCompletedRow key = {qcm.id} qcm = {qcm}/>
                })
            }
        </div> */}
    </div>
  )
}

export default QcmList