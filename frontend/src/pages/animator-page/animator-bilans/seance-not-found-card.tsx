import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XIcon } from 'lucide-react';

function SeanceNotFoundCard({ onSubmit, isSubmitting }: { onSubmit: () => void; isSubmitting: boolean }) {
    return (
        <Card className='font-outfit border-none shadow-card bg-linear-240 from-25% from-red-200 to-75% to-red-500'>
            <CardHeader>
                <CardTitle className='flex items-center gap-3 text-white'>
                    <XIcon size={28} />
                    <span>Séance non enregistrée</span>
                </CardTitle>
                <CardDescription className='text-white/80'>
                    Enregistrez la séance avant de soumettre des bilans.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button
                    size='lg'
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className='w-full font-medium text-base py-6 bg-white text-red-600 hover:bg-white/90'
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer la séance'}
                </Button>
            </CardFooter>
        </Card>
    )
}
export default SeanceNotFoundCard