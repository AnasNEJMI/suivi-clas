import type { SeanceDurationEntry } from '@/api/animator/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XIcon } from 'lucide-react';
import SeanceDurationDropdown from './seance-duration-dropdown';
import { BrandButton } from '@/components/brand-button';

function SeanceNotFoundCard({
    seanceDurations,
    selectedDurationId,
    onDurationChange,
    onSubmit,
    isSubmitting }: {selectedDurationId: number,onDurationChange:(id: number) => void,seanceDurations : SeanceDurationEntry[], onSubmit: () => void; isSubmitting: boolean }) {

    return (
        <Card className='font-outfit shadow-card border-3 border-red-500'>
            <CardHeader>
                <CardTitle className='flex items-center gap-3 '>
                    <XIcon size={28} className='text-red-600'/>
                    <span className='text-red-600 text-lg lg:text-xl'>Séance non enregistrée</span>
                </CardTitle>
                <CardDescription className='text-sm lg:text-base'>
                    Enregistrez la séance avant de soumettre des bilans.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium text-lg'>Durée de séance</h2>
                    <SeanceDurationDropdown seanceDurations = {seanceDurations} selectedValue={selectedDurationId.toString()} onValueChange = {onDurationChange}/>
                </div>
            </CardContent>
            <CardFooter>
                <BrandButton
                    size='lg'
                    onClick={() => {
                        console.log('selected id : ', selectedDurationId);
                        onSubmit()
                    }}
                    disabled={isSubmitting}
                    className='w-full font-medium text-base py-6'
                >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer la séance'}
                </BrandButton>
            </CardFooter>
        </Card>
    )
}
export default SeanceNotFoundCard