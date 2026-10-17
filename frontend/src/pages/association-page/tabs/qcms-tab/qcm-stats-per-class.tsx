import type { QcmStatsPerScolarYear } from '@/api/association-member/apiCalls'
import AssocClassQCMCarousel from './class-qcm-carousel'
import { RotateCwFadingClockIcon } from 'lucide-react'
import { EmptyStateCard } from '@/components/ui/empty-state-card'

interface AssocQcmsStatsPerClassProps {
  qcmStatsPerScolarYear: QcmStatsPerScolarYear[]
}

const AssocQcmsStatsPerClass = ({ qcmStatsPerScolarYear }: AssocQcmsStatsPerClassProps) => {
  const qcmStats = qcmStatsPerScolarYear[0]

  if (!qcmStats || qcmStats.classes.length === 0) {
    return (
      <div className="space-y-3 mt-8">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Détails des QCM par classe
          </h3>
        </div>

        <EmptyStateCard
          icon={RotateCwFadingClockIcon}
          title = "Aucune donnée de QCM enregistrée"
          description="Les détails des QCM apparaîtront ici dès que les premiers questionnaires seront attribués et complétés."
        />
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-8">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Détails des QCM par classe
        </h3>
      </div>

      <div className="space-y-8">
        {qcmStats.classes.map((classQCM, index) => (
          <AssocClassQCMCarousel key={classQCM.class.id ?? index} classQCM={classQCM} />
        ))}
      </div>
    </div>
  )
}

export default AssocQcmsStatsPerClass