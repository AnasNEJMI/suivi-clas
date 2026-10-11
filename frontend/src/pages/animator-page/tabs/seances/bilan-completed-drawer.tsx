import type { DeleteBilanEntry, SeanceDurationEntry, StudentEntry } from '@/api/animator/seances.types'
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
import { useIsMobile } from '@/hooks/use-mobile'
import { getElapsedDays } from '@/lib/utils'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import AnimCompletedBilanDetails from './completed-bilan-details'
import DeleteBilanDialog from './delete-bilan-dialog'

interface AnimBilanCompletedDrawerProps {
  studentBilan: StudentEntry
  seanceDate: Date
  seanceDuration: SeanceDurationEntry
  children: ReactNode
  onBilanDeleted: (bilan: DeleteBilanEntry) => void
}

const AnimBilanCompletedDrawer = ({
  studentBilan,
  seanceDate,
  seanceDuration,
  children,
  onBilanDeleted,
}: AnimBilanCompletedDrawerProps) => {
  const isMobile = useIsMobile()
  const name = `${studentBilan.firstName} ${studentBilan.lastName}`
  const initials = `${studentBilan.firstName?.[0] ?? ''}${studentBilan.lastName?.[0] ?? ''}`.toUpperCase()
  const level = studentBilan.level?.label ?? null

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      
      <DrawerContent className="h-dvh flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none">
        {/* --- EN-TÊTE DU DRAWER --- */}
        <DrawerHeader className="p-4 sm:p-5 border-b border-slate-200/80 bg-white/90 shrink-0 space-y-4 text-left">
          {/* Ligne 1 : Navigation Retour & Action Supprimer */}
          <div className="flex items-center justify-between">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 -ml-2 gap-1.5 text-base font-bold text-slate-900 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeftIcon className="size-4" />
                <span>Retour</span>
              </Button>
            </DrawerClose>

            {/* Bouton de suppression du bilan */}
            <DeleteBilanDialog
              studentBilan={studentBilan}
              onBilanDeleted={onBilanDeleted}
            />
          </div>

          {/* Ligne 2 : Identité Élève & Titre */}
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center font-extrabold text-sm shadow-2xs shrink-0">
              {initials}
            </div>
            
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
                  {name}
                </DrawerTitle>
              </div>
              <DrawerDescription className="text-xs font-medium text-slate-500">
                Bilan individuel de la séance
              </DrawerDescription>
            </div>
          </div>

          {/* Ligne 3 : Métadonnées sous forme de puces (Date, Durée, Niveau) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200/60 text-slate-600 text-[11px] font-semibold">
              <CalendarIcon className="size-3 text-slate-400 shrink-0" />
              <span>{getElapsedDays(seanceDate)}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200/60 text-slate-600 text-[11px] font-semibold">
              <ClockIcon className="size-3 text-slate-400 shrink-0" />
              <span>{seanceDuration.label}</span>
            </span>

            {level && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-[11px] font-semibold">
                <GraduationCapIcon className="size-3 text-indigo-500 shrink-0" />
                <span>{level}</span>
              </span>
            )}
          </div>
        </DrawerHeader>

        {/* --- CONTENU DU BILAN --- */}
        <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 sm:p-5 flex-1 space-y-4">
          <AnimCompletedBilanDetails
            studentBilan={studentBilan}
            seanceDuration={seanceDuration}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AnimBilanCompletedDrawer