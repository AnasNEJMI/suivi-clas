import type {QcmEntry } from '@/api/student/apiCalls'
import { ChartPie, CheckCircle2Icon, Clock8Icon, NotebookTextIcon } from 'lucide-react'

const QcmsRecap = ({qcms} : {qcms : QcmEntry[]}) => {
   

    let qcmCompletedCount : string | number = '', qcmNotCompletedCount : string | number = '', qcmCompletedRate : string | number = '';
    if(qcms.length === 0){
        qcmCompletedCount = '-';
        qcmNotCompletedCount = '-';
        qcmCompletedRate = '-';
    }else{
        qcmCompletedCount = qcms.filter(q => q.completed).length;
        qcmNotCompletedCount = qcms.filter(q => !q.completed).length;
        qcmCompletedRate = Math.round(100 * qcmCompletedCount/qcms.length)
    }
  return (
    <>
        <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Bilan des Qcms</h3>
        <div className='mt-2 grid grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='rounded-xl p-6 flex items-center justify-between bg-white shadow-sm'>
                <div className='flex flex-col'>
                    <span className='font-bold text-4xl'>{qcms.length}</span>
                    <span className='opacity-75 text-sm'>Soumis</span>
                </div>
                <NotebookTextIcon className='size-8'/>
            </div>
            <div className='rounded-xl p-6 flex items-center justify-between bg-emerald-100 shadow-sm'>
                <div className='flex flex-col'>
                    <span className='font-bold text-4xl'>{qcmCompletedCount}/{qcms.length}</span>
                    <span className='opacity-75 text-sm'>Complétés</span>
                </div>
                <CheckCircle2Icon className='size-8 text-emerald-500'/>
            </div>
            <div className='rounded-xl p-6 flex items-center justify-between bg-red-100 shadow-sm'>
                <div className='flex flex-col'>
                    <span className='font-bold text-4xl'>{qcmNotCompletedCount}/{qcms.length}</span>
                    <span className='opacity-75 text-sm'>À faire</span>
                </div>
                <Clock8Icon className='size-8 text-red-500'/>
            </div>
            <div className='rounded-xl p-6 flex items-center justify-between bg-indigo-100 shadow-sm'>
                <div className='flex flex-col'>
                    <span className='font-bold text-4xl'>{qcmCompletedRate}%</span>
                    <span className='opacity-75 text-sm'>Complétion</span>
                </div>
                <ChartPie className='size-8 text-indigo-500'/>
            </div>
        </div>
    </>
  )
}

export default QcmsRecap