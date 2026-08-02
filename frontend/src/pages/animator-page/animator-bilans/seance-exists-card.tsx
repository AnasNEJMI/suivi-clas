import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';

const SeanceExistsCard = ({ onDelete, isDeleting }: { onDelete: () => void; isDeleting: boolean }) => {
  return (
        <Card className='font-outfit border-none shadow-card bg-linear-240 from-25% from-lime-100 to-75% to-lime-200'>
            <CardHeader>
                <CardTitle className='flex items-center gap-3'>
                    <CheckIcon size={28} className='text-lime-600' />
                    <span>Séance enregistrée</span>
                </CardTitle>
            </CardHeader>
            <CardFooter className='flex flex-col items-start gap-3'>
                <Button
                    size='lg'
                    variant='destructive'
                    onClick={onDelete}
                    disabled={isDeleting}
                    className='w-full font-medium text-base py-6'
                >
                    {isDeleting ? 'Suppression...' : 'Supprimer la séance'}
                </Button>
                <p className='flex items-center gap-2 text-red-700 text-sm'>
                    <TriangleAlertIcon size={14} />
                    La suppression d'une séance entraîne la suppression de tous ses bilans.
                </p>
            </CardFooter>
        </Card>
    )
}

export default SeanceExistsCard