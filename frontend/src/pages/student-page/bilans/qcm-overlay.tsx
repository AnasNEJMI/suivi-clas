import type { QcmEntry } from '@/api/student/apiCalls'
import QcmResultsCard from './qcm-results-card';
import QcmCompletionCard from './qcm-completion-card';

const QcmOverlay = ({qcm} : {qcm : QcmEntry | null}) => {
    if(!qcm) return null;
    if(qcm.completed) return <QcmResultsCard qcm = {qcm}/>
    else return <QcmCompletionCard qcm = {qcm}/> 
}

export default QcmOverlay