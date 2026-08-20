import type { QcmEntry } from '@/api/student/apiCalls'

const QcmQuestionnaire = ({qcm} : {qcm : QcmEntry}) => {
  return (
    <div>{JSON.stringify(qcm, null, 2)}</div>
  )
}

export default QcmQuestionnaire