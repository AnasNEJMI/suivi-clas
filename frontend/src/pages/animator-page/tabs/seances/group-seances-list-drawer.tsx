import type { BilanEntry, DeleteBilanEntry, SeanceEntry } from '@/api/animator/seances.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn, getElapsedDays } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  NotebookTextIcon,
  TimerIcon,
  UsersRoundIcon,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import AnimSeanceDetailsDialog from './seance-details-dialog'
import { Card, CardTitle } from '@/components/ui/card'

interface GroupSeancesListDrawerProps {
  seances: SeanceEntry[]
  lessonsByLevel: LessonsByLevelEntry[]
  onBilanSubmitted: (bilan: BilanEntry) => void
  group: string
  onBilanDeleted: (bilan: DeleteBilanEntry) => void
  children: ReactNode
}

const GroupSeancesListDrawer = ({
  group,
  seances,
  children,
  lessonsByLevel,
  onBilanSubmitted,
  onBilanDeleted,
}: GroupSeancesListDrawerProps) => {
  const isMobile = useIsMobile()
  const [filter, setFilter] = useState<'all' | 'complete' | 'toComplete'>('all')

  const selectedSeancesBuckets = useMemo(() => {
    let newSeances: SeanceEntry[] = []
    if (filter === 'all') newSeances = seances
    if (filter === 'complete')
      newSeances = seances.filter(
        (s) => s.studentBilans.filter((b) => b.bilan === null).length === 0
      )
    if (filter === 'toComplete')
      newSeances = seances.filter(
        (s) => s.studentBilans.filter((b) => b.bilan === null).length > 0
      )

    const seancesMap = new Map<string, SeanceEntry[]>()
    for (const s of newSeances) {
      const month = format(s.date, 'MMMM yyyy', { locale: fr })
      if (!seancesMap.has(month)) {
        seancesMap.set(month, [])
      }
      const seancesBucket = seancesMap.get(month)!
      seancesBucket.push(s)
    }

    const seanceBuckets: { month: string; seances: SeanceEntry[] }[] = []
    for (const [month, monthSeances] of seancesMap.entries()) {
      seanceBuckets.push({ month, seances: monthSeances })
    }
    return seanceBuckets
  }, [filter, seances])

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      
      {/* Arrière-plan légèrement grisé pour faire ressortir les cartes blanches */}
      <DrawerContent className="h-dvh font-outfit shadow-none border-none md:rounded-l-2xl">
        <DrawerHeader className="flex flex-col pb-2 bg-white">
          <div className="flex items-center justify-between">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-3 gap-2 text-base font-bold text-slate-600 bg-white  hover:bg-slate-100 hover:text-slate-900"
              >
                <ArrowLeftIcon className="size-4" />
                <span>Retour</span>
              </Button>
            </DrawerClose>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
              {seances.length} séances réalisées
            </span>
          </div>

          <div className='mt-4'>
            <DrawerTitle className="font-bold text-xl lg:text-2xl tracking-tight text-slate-900">
              Toutes les séances
            </DrawerTitle>
            <DrawerDescription className="text-slate-500 text-xs lg:text-sm mt-0.5">
              Consultez les bilans, présences et qcms soumis cette année.
            </DrawerDescription>
          </div>

          {/* Filtres repensés façon pilules / segmented control */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'complete', label: 'Complétée' },
              { id: 'toComplete', label: 'À compléter' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as 'all' | 'complete' | 'toComplete')}
                className={cn(
                  'px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 border cursor-pointer',
                  filter === f.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900 shadow-2xs'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </DrawerHeader>

        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto px-4 mt-2 flex flex-col bg-slate-100">
          {selectedSeancesBuckets.length === 0 ? (
            <Card
            className={cn(
                'border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 h-48 flex flex-col items-center justify-center w-full rounded-3xl bg-linear-to-b from-indigo-50/50 via-white to-slate-50 shadow-sm p-6 text-center'
            )}
            >
                <div className="size-10 rounded-xl bg-zinc-100 flex items-center justify-center text-slate-600 shadow-inner">
                    <NotebookTextIcon className="size-6" />
                </div>
                <CardTitle className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                    Aucune séance ne correspond à ce filtre
                </CardTitle>
            </Card>
          ) : (
            selectedSeancesBuckets.map((seancesBucket, index) => (
              <div key={index} className="mb-6">
                {/* Séparateur de mois façon ligne temporelle élégante */}
                <div className="flex items-center gap-4 my-6">
                  <Separator className="flex-1 bg-slate-200/70" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {seancesBucket.month}
                  </span>
                  <Separator className="flex-1 bg-slate-200/70" />
                </div>

                {/* Liste des cartes du mois */}
                <div className="flex flex-col gap-4">
                  {seancesBucket.seances
                    .sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((seance) => {
                    const completedBilans = seance.studentBilans.filter(
                      (s) => s.bilan !== null
                    ).length
                    const studentsCount = seance.studentBilans.length
                    const completionRate =
                      studentsCount > 0
                        ? Math.round((completedBilans / studentsCount) * 100)
                        : 0
                    const isComplete =
                      studentsCount > 0 && completedBilans === studentsCount

                    return (
                      <AnimSeanceDetailsDialog
                        key={seance.id}
                        lessonsByLevel={lessonsByLevel}
                        onBilanSubmitted={onBilanSubmitted}
                        seance={seance}
                        group={group}
                        onBilanDeleted={onBilanDeleted}
                      >
                        {/* Structure alignée sur le design "Premium" de la carte Carrousel */}
                        <div
                          className={cn(
                            'group relative overflow-hidden rounded-2xl p-5 font-outfit bg-white border shadow-xs transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col justify-between select-none',
                            isComplete
                              ? 'border-emerald-100 hover:border-emerald-300/80'
                              : 'border-slate-200/80 hover:border-indigo-300/80'
                          )}
                        >
                          {/* Ligne 1 : Date & Badge Statut */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                              <CalendarIcon className="size-3.5 text-slate-400" />
                              <span>{getElapsedDays(seance.date)}</span>
                            </span>

                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border',
                                isComplete
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                                  : 'bg-amber-50 text-amber-700 border-amber-200/60'
                              )}
                            >
                              {isComplete ? (
                                <>
                                  <CheckCircle2Icon className="size-3.5 text-emerald-600" />
                                  <span>Complété</span>
                                </>
                              ) : (
                                <>
                                  <ClockIcon className="size-3 text-amber-600" />
                                  <span>À compléter</span>
                                </>
                              )}
                            </span>
                          </div>

                          {/* Ligne 2 : Statistiques & Progression */}
                          <div className="my-5 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    'flex items-center justify-center size-10 rounded-full border transition-transform duration-300 group-hover:scale-105',
                                    isComplete
                                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                      : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                                  )}
                                >
                                  <NotebookTextIcon className="size-4.5" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-800 leading-tight">
                                    Bilans élèves
                                  </span>
                                  <span className="text-xs text-slate-500 font-medium mt-0.5">
                                    {completedBilans} sur {studentsCount} saisis
                                  </span>
                                </div>
                              </div>
                              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                                {completionRate}%
                              </span>
                            </div>

                            <Progress
                              value={completionRate}
                              className={cn(
                                'h-2 bg-slate-100/80 rounded-full overflow-hidden',
                                isComplete
                                  ? '[&>div]:bg-linear-to-r [&>div]:from-emerald-400 [&>div]:to-emerald-500'
                                  : '[&>div]:bg-linear-to-r [&>div]:from-indigo-400 [&>div]:to-indigo-500'
                              )}
                            />
                          </div>

                          {/* Ligne 3 : Métadonnées (Durée & Groupe) */}
                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                            <div className="flex items-center gap-1.5 truncate">
                              <UsersRoundIcon className="size-3.5 text-slate-400 shrink-0" />
                              <span className="truncate text-slate-700">{group}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <TimerIcon className="size-3.5 text-slate-400" />
                              <span>{seance.seanceDuration.label}</span>
                            </div>
                          </div>
                        </div>
                      </AnimSeanceDetailsDialog>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default GroupSeancesListDrawer