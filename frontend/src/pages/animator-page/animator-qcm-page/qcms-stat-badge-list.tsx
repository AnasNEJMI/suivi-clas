import type { QcmEntry } from '@/api/student/apiCalls'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import QcmStatsBadge from './cards/qcm-stats-badge';

const QcmStatBadgeList = ({qcms }: {qcms : QcmEntry[]}) => {
    const qcmsTotal = qcms.length;
    const completedQcms = qcms.filter(q => q.completed);
    
    const qcmCompletedTotal = completedQcms.length;
    const mostRecentCompletedQcm = completedQcms.sort((a, b) =>  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
    
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <QcmStatsBadge
            title='QCMs Soumis'
            value={`${qcmsTotal}`}
        />
        <QcmStatsBadge
            title='QCM Complétés'
            value={`${qcmCompletedTotal} / ${qcmsTotal}`}
        />
        <QcmStatsBadge
            title='Dérniere soumission'
            value={`${format(qcms[0].createdAt, 'PPP', {locale : fr})}`}
        />
        <QcmStatsBadge
            title='Dernier QCM complété'
            value={`${mostRecentCompletedQcm? format(mostRecentCompletedQcm.updatedAt, 'PPP', {locale : fr}) : '-'}`}
        />
    </div>
  )
}

export default QcmStatBadgeList