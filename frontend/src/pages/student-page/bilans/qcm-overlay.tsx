import type { QcmEntry } from '@/api/student/apiCalls'
import QcmResultsCard from './qcm-results-card';
import QcmCompletionCard from './qcm-completion-card';

const QcmOverlay = ({qcm, onQcmSubmit} : {qcm : QcmEntry | null, onQcmSubmit : (qcm: QcmEntry) => void}) => {
    console.log('qcm in overlay ', qcm);
    if(!qcm) return null;
    if(qcm.completed) return <QcmResultsCard qcm = {qcm}/>
    else return <QcmCompletionCard qcm = {qcm} onQcmSubmit = {onQcmSubmit}/> 
}

export default QcmOverlay