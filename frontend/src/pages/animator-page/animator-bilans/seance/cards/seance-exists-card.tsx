import type { SeanceEntry } from '@/api/animator/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';

const SeanceExistsCard = ({seance, onDelete, isDeleting }: {seance : SeanceEntry, onDelete: () => void; isDeleting: boolean }) => {
    console.log("seance : ", seance);
    return (
        <Card className='font-outfit shadow-card border-3 border-lime-500'>
            <CardHeader>
                <CardTitle className='flex items-center gap-3'>
                    <CheckIcon size={28} className='text-lime-600' />
                    <span className='text-lime-600 text-lg lg:text-xl'>Séance enregistrée</span>
                </CardTitle>
                <CardDescription className='text-sm lg:text-base'>
                    Vous pouvez désormais soumettre des bilans pour cette séance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium text-lg'>Durée de séance</h2>
                    <span className='w-full max-w-32 lg:max-w-48 flex justify-start text-lg font-medium px-4 py-1 rounded-md border bg-zinc-50 border-zinc-200 truncate'>{seance.seanceDuration.label}</span>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col items-start gap-3'>
                <Button
                    size='lg'
                    onClick={onDelete}
                    disabled={isDeleting}
                    className='w-full font-medium text-base py-6'
                >
                    {isDeleting ? 'Suppression...' : 'Supprimer la séance'}
                </Button>
                <p className='flex items-center gap-2 text-red-600 text-sm'>
                    <TriangleAlertIcon size={14} />
                    La suppression d'une séance entraîne la suppression de tous ses bilans.
                </p>
            </CardFooter>
        </Card>
    )
}

export default SeanceExistsCard