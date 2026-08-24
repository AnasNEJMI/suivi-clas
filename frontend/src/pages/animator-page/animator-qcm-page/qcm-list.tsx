import type { QcmEntry } from '@/api/student/apiCalls'
import QcmCompletedRow from './qcm-completed-row'
import QcmNotCompletedRow from './qcm-not-completed-row'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const QcmList = ({qcms }: {qcms : QcmEntry[]}) => {
  return (
    <div className=''>
        <span className='font-medium text-lg lg:text-xl'>Liste des Qcms</span>
        <ScrollArea className="h-72 w-full rounded-md border mt-2">
            <div className="p-4 gap-2 flex flex-col">
                {qcms.map((qcm) => {
                    if(qcm.completed){
                        return <QcmCompletedRow key = {qcm.id} qcm = {qcm}/>
                    }
                    return <QcmNotCompletedRow key = {qcm.id} qcm = {qcm}/>
                })}
            </div>
            <ScrollBar/>
        </ScrollArea>
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