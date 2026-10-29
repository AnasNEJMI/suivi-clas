import type { BilanEntry, DeleteBilanEntry, SeanceEntry } from '@/api/animator/seances.types'
import type { LessonsByLevelEntry } from '@/api/animator/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardTitle } from '@/components/ui/card'
import { cn, getElapsedDays } from '@/lib/utils'
import {
  BookCheckIcon,
  BookXIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  PackageCheckIcon,
  PackageXIcon,
  TimerIcon,
  UsersRoundIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import AnimBilanCompletedCard from './bilan-completed-card'
import AnimBilanToDoCard from './bilan-todo-card'
import { EmptyStateCard } from '@/components/ui/empty-state-card'

interface AnimSeanceDetailsDialogProps {
  lessonsByLevel: LessonsByLevelEntry[]
  onBilanSubmitted: (bilan: BilanEntry) => void
  group: string
  seance: SeanceEntry
  children: ReactNode
  onBilanDeleted: (bilan: DeleteBilanEntry) => void
}

const AnimSeanceDetailsDialog = ({
  seance,
  group,
  children,
  lessonsByLevel,
  onBilanSubmitted,
  onBilanDeleted,
}: AnimSeanceDetailsDialogProps) => {
  const bilansCompleted = seance.studentBilans.filter((s) => s.bilan !== null)
  const bilansCompletedCount = bilansCompleted.length

  const bilansToDo = seance.studentBilans.filter((s) => s.bilan === null)
  const bilansToDoCount = bilansToDo.length

  const studentsCount = seance.studentBilans.length
  const completionRate =
    studentsCount > 0 ? Math.round((bilansCompletedCount / studentsCount) * 100) : 0
  const isComplete = studentsCount > 0 && bilansCompletedCount === studentsCount

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'h-dvh flex flex-col items-start w-full lg:w-[calc(100%-18rem)] lg:left-72 lg:translate-x-0 p-0 font-outfit shadow-2xl bg-slate-100 md:rounded-t-xl lg:rounded-none focus:outline-none gap-0'
        )}
      >
        {/* --- EN-TÊTE DU DIALOG --- */}
        <DialogHeader className="flex flex-col w-full px-5 pt-8 pb-4 bg-white shrink-0 gap-3">
          <div className="flex items-start justify-between gap-4 mt-8">
            <div className="flex flex-col gap-1">
              <DialogTitle className="font-extrabold text-xl md:text-2xl tracking-tight text-slate-900 text-left">
                Détails de la séance
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500 text-left font-medium">
                Données de la séances et les bilans d'élèves
              </DialogDescription>
            </div>
            
            {/* Badge de statut global */}
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0',
                isComplete
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                  : 'bg-amber-50 text-amber-700 border-amber-200/60'
              )}
            >
              {isComplete ? (
                <>
                  <CheckCircle2Icon className="size-4 text-emerald-600" />
                  <span className='text-xs'>Complétée</span>
                </>
              ) : (
                <>
                  <ClockIcon className="size-4 text-amber-600" />
                  <span className='text-xs'>En cours</span>
                </>
              )}
            </span>
          </div>
        </DialogHeader>

        {/* --- CONTENU DÉFILANT --- */}
        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto w-full px-4 lg:px-6 space-y-6 py-6">
          
          {/* 1. Informations Générales (Tableau de bord compact) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <UsersRoundIcon className="size-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Groupe</span>
                <span className="text-sm font-bold text-slate-800 truncate">{group}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl shrink-0">
                <CalendarIcon className="size-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                <span className="text-sm font-bold text-slate-800 truncate">{getElapsedDays(seance.date)}</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 flex items-center gap-3 p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <TimerIcon className="size-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Durée</span>
                <span className="text-sm font-bold text-slate-800 truncate">{seance.seanceDuration.label}</span>
              </div>
            </div>
          </div>

          {/* 2. Progression des bilans */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs">
            <div className="flex items-end justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={cn("p-2 rounded-xl", isComplete ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600")}>
                  <BookCheckIcon className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Progression de la saisie</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{bilansCompletedCount} bilan(s) sur {studentsCount} soumis</p>
                </div>
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{completionRate}%</span>
            </div>
            
            <Progress
              className={cn(
                'h-2.5 bg-slate-100 rounded-full mt-2',
                isComplete
                  ? '[&>div]:bg-linear-to-r [&>div]:from-emerald-400 [&>div]:to-emerald-500'
                  : '[&>div]:bg-linear-to-r [&>div]:from-indigo-400 [&>div]:to-indigo-500'
              )}
              value={completionRate}
            />
          </div>

          {/* 3. Section : Bilans soumis */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 lg:p-6 shadow-2xs">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                  <CheckCircle2Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">Bilans validés</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Élèves ayant déjà reçu leur bilan.</p>
                </div>
              </div>
              <span className="bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 rounded-full shadow-2xs">
                {bilansCompletedCount} / {studentsCount}
              </span>
            </div>

            {bilansCompletedCount === 0 ? (
              <EmptyStateCard
                icon={PackageXIcon}
                title='Aucun bilan soumis'
                description="Vous n'avez pas encore rempli de bilan pour cette séance."
              />
            ) : (
              <Carousel opts={{ align: 'start' }} className="w-full mt-2">
                <CarouselContent className="-ml-3 py-2 px-1">
                  {bilansCompleted.map((studentBilan) => (
                    <CarouselItem key={studentBilan.id} className="group pl-3 basis-64 sm:basis-72 shrink-0 hover:-translate-y-1 transition-transform duration-200 ease-out">
                      <AnimBilanCompletedCard
                        seanceDuration={seance.seanceDuration}
                        studentBilan={studentBilan}
                        seanceDate={seance.date}
                        onBilanDeleted={onBilanDeleted}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex gap-2">
                    <CarouselPrevious variant="outline" className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200 hover:bg-slate-50 shadow-2xs" />
                    <CarouselNext variant="outline" className="static translate-y-0 h-9 w-9 rounded-xl border-slate-200 hover:bg-slate-50 shadow-2xs" />
                  </div>
                </div>
              </Carousel>
            )}
          </div>

          {/* 4. Section : Bilans à faire */}
          <div className="bg-slate-50/60 border border-slate-200/80 rounded-3xl p-5 lg:p-6 shadow-2xs">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                  <BookXIcon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">Bilans en attente</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Élèves nécessitant un bilan de séance.</p>
                </div>
              </div>
              <span className="bg-white border text-nowrap border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 rounded-full shadow-2xs">
                {bilansToDoCount} / {studentsCount}
              </span>
            </div>

            {bilansToDoCount === 0 ? (
              <Card className="border-2 border-dashed border-emerald-200 shadow-none h-40 flex flex-col items-center justify-center w-full rounded-2xl bg-emerald-50/30 p-6 text-center mt-2">
                <div className="size-10 rounded-full bg-white shadow-2xs flex items-center justify-center mb-3 border border-emerald-100">
                  <PackageCheckIcon className="size-5 text-emerald-500" />
                </div>
                <CardTitle className="text-sm font-bold text-emerald-800">Mission accomplie !</CardTitle>
                <p className="text-xs text-emerald-600/80 mt-1">Tous les bilans ont été remplis pour cette séance.</p>
              </Card>
            ) : (
              <Carousel opts={{ align: 'start' }} className="w-full mt-2">
                <CarouselContent className="-ml-3 py-2 px-1">
                  {bilansToDo.map((studentBilan) => (
                    <CarouselItem key={studentBilan.id} className="group pl-3 basis-64 sm:basis-72 shrink-0 hover:-translate-y-1 transition-transform duration-200 ease-out">
                      <AnimBilanToDoCard
                        seanceId={seance.id}
                        animatorId={seance.animatorId}
                        lessonsByLevel={lessonsByLevel}
                        onBilanSubmitted={onBilanSubmitted}
                        seanceDate={seance.date}
                        seanceDuration={seance.seanceDuration}
                        studentBilan={studentBilan}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div className="flex gap-2">
                    <CarouselPrevious variant="outline" className="static translate-y-0 h-9 w-9 rounded-xl bg-white border-slate-200 hover:bg-slate-50 shadow-2xs" />
                    <CarouselNext variant="outline" className="static translate-y-0 h-9 w-9 rounded-xl bg-white border-slate-200 hover:bg-slate-50 shadow-2xs" />
                  </div>
                </div>
              </Carousel>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AnimSeanceDetailsDialog