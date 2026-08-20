import type { AnimatorStatsPerScolarYear } from '@/api/association-member/apiCalls'
import { useState } from 'react'
import AnimatorDropdown from './animator-dropdown';
import ClassStatsCard from './class-stats-card';
import { Card, CardContent } from '@/components/ui/card';

const AnimatorStatsCard = ({selectedScolarYear} : {selectedScolarYear : AnimatorStatsPerScolarYear}) => {
    const [selectedAnimator, setSelectedAnimator] = useState(selectedScolarYear.animators[0]);
    return (
    <Card className='mt-6 border-none shadow-card'>
        <CardContent>
            <div className='flex items-start justify-between'>
                <h2 className='text-base md:text-lg font-bold bg'>Animateur</h2>
                <AnimatorDropdown key={selectedScolarYear.scolarYear.id} animators = {selectedScolarYear.animators} selectedValue={selectedAnimator.animator.id.toString()} onValueChange = {setSelectedAnimator}/>
            </div>
            <ClassStatsCard key={selectedAnimator.animator.id} selectedAnimator = {selectedAnimator} />
        </CardContent>
    </Card>
  )
}

export default AnimatorStatsCard