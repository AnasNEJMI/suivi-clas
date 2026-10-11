import type { SeanceDurationEntry, SeanceEntry, SeancesByClassEntry } from '@/api/animator/seances.types';
import type { ClassEntry } from '@/api/animator/types';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeftIcon, CalendarPlusIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import CreateSeanceForm from './create/create-seance-form';
import type { SeanceFormValues } from '@/lib/schemas/animator/seances/seance.schema';
import { isSameDay } from 'date-fns';
import type { User } from '@/api/auth';

const CreateSeanceDrawer = ({
    children,
    animator,
    classes,
    seanceDurations,
    existingSeancesByClass,
    onSeanceCreated,
} : {
    children: ReactNode,
    animator: User,
    classes: ClassEntry[],
    seanceDurations: SeanceDurationEntry[],
    existingSeancesByClass: SeancesByClassEntry[],
    onSeanceCreated: (seance: SeanceEntry) => void
}) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const seanceExists = (data: SeanceFormValues) => {
        const seance = existingSeancesByClass.find(c => c.id === data.classId)?.seances.find(s => isSameDay(s.date, data.date));
        if (seance) return true;
        return false;
    }

    const handleSeanceCreated = (seance: SeanceEntry) => {
        setOpen(false);
        onSeanceCreated(seance);
    }

    return (
        <Drawer direction={isMobile ? 'left' : 'right'} open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            
            <DrawerContent className="h-dvh flex flex-col font-outfit shadow-2xl border-l border-slate-200/80 bg-slate-50/95 backdrop-blur-md p-0 md:rounded-l-2xl overflow-hidden focus:outline-none gap-0">
                {/* --- EN-TÊTE DU DRAWER --- */}
                <DrawerHeader className="p-4 bg-white/90 shrink-0 space-y-4 text-left">
                    {/* Ligne 1 : Navigation Retour & Badge */}
                    <div className="flex items-center justify-between">
                        <DrawerClose asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2.5 -ml-2 gap-1.5 font-bold text-slate-900 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                            >
                                <ArrowLeftIcon className="size-4" />
                                <span>Retour</span>
                            </Button>
                        </DrawerClose>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[11px] font-bold">
                            <CalendarPlusIcon className="size-3 text-indigo-500" />
                            <span>Créer une séance</span>
                        </span>
                    </div>

                    {/* Ligne 2 : Titre & Description */}
                    <div className="space-y-0.5">
                        <DrawerTitle className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                            Créer une séance
                        </DrawerTitle>
                        <DrawerDescription className="text-xs sm:text-sm font-medium text-slate-500">
                            Configurez les paramètres de votre séance, puis soumettre pour l'enregistrer.
                        </DrawerDescription>
                    </div>
                </DrawerHeader>

                {/* --- FORMULAIRE DÉFILANT --- */}
                <div className="brand-v-scrollbar overflow-x-hidden overflow-y-auto p-4 sm:p-5 flex-1">
                    <CreateSeanceForm 
                        animator={animator} 
                        classes={classes} 
                        seanceDurations={seanceDurations} 
                        seanceExists={seanceExists} 
                        onSeanceCreated={handleSeanceCreated}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateSeanceDrawer;