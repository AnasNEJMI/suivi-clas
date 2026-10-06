import type { QcmStatsPerScolarYear } from '@/api/association-member/apiCalls'
import AssocClassQCMsCarousel from './class-qcm-carousel'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, GraduationCap } from 'lucide-react'

interface AssocQcmsStatsPerClassProps {
  qcmStatsPerScolarYear: QcmStatsPerScolarYear[]
}

const AssocQcmsStatsPerClass = ({ qcmStatsPerScolarYear }: AssocQcmsStatsPerClassProps) => {
  const qcmStats = qcmStatsPerScolarYear[0]

  if (!qcmStats || qcmStats.classes.length === 0) {
    return (
      <Card className="mt-4 flex h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-6 shadow-none dark:border-zinc-800 dark:bg-zinc-900/30">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            <Clock className="h-6 w-6" />
          </div>
          <CardTitle className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
            Aucune donnée enregistrée
          </CardTitle>
          <CardDescription className="max-w-md text-sm text-zinc-500">
            Les statistiques des QCMs apparaîtront ici dès que les premiers questionnaires seront attribués et complétés.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          <GraduationCap className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Statistiques des QCMs par classe
        </h3>
      </div>

      <div className="space-y-8">
        {qcmStats.classes.map((classQCMs, index) => (
          <AssocClassQCMsCarousel key={classQCMs.class.id ?? index} classQCMs={classQCMs} />
        ))}
      </div>
    </div>
  )
}

export default AssocQcmsStatsPerClass