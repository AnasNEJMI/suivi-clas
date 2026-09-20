import type { SeanceDurationEntry, SeanceEntry, SeancesByClassEntry } from '@/api/animator/seances.types';
import type { ClassEntry } from '@/api/animator/types';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle,DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeftIcon } from 'lucide-react';
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
} : {children : ReactNode, animator : User, classes : ClassEntry[], seanceDurations : SeanceDurationEntry[], existingSeancesByClass : SeancesByClassEntry[], onSeanceCreated : (seance : SeanceEntry) => void}) => {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const seanceExists = (data : SeanceFormValues) => {
        const seance = existingSeancesByClass.find(c => c.id === data.classId)?.seances.find(s => isSameDay(s.date, data.date));
        if(seance) return true;
        return false;
    }

    const handleSeanceCreated = (seance : SeanceEntry) => {
        setOpen(false);
        onSeanceCreated(seance);
    }
    return (
    <Drawer direction={isMobile? 'left' : 'right'} open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>
        <DrawerContent className='h-dvh pb-2 font-outfit shadow-none border-none bg-zinc-100 md:rounded-t-xl'>
            <DrawerHeader className='flex'>
                <DrawerClose asChild>
                    <Button variant={'ghost'} className='w-fit h-12 opacity-75 px-0'><ArrowLeftIcon className='size-6'/> <span>Retour</span></Button>
                </DrawerClose>
                <DrawerTitle className='font-bold text-xl  md:text-3xl tracking-tight'>Créer une séance</DrawerTitle>
                <DrawerDescription className='text-base'>Choisir les paramètres de votre séance, puis appuyer sur 'Créer' pour finaliser la création.</DrawerDescription>
            </DrawerHeader>
            <CreateSeanceForm animator={animator} classes={classes} seanceDurations={seanceDurations} seanceExists={seanceExists} onSeanceCreated = {handleSeanceCreated}/>

        </DrawerContent>
    </Drawer>
  )
}

export default CreateSeanceDrawer