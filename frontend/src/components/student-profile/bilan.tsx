import  { useState } from 'react'
import { Card, CardContent} from '../ui/card'
import BilanDropdown from './bilan-dropdown'
import type { Bilan } from '@/api/api.types'
import { cn } from '@/lib/utils'
import { formatDate } from 'date-fns'

interface BilanCardProps {
    className? : string,
    bilans : Bilan[];
}

const BilanCard = ({className, bilans} : BilanCardProps) => {
    const [selectedBilan, setSelectedBilan] = useState<Bilan>(bilans[0])
  return (
    <>
    <div className='flex justify-between items-center'>
        <h2 className='text-xl md:text-2xl font-bold'>Bilan séance</h2>
        {
            bilans.length > 0 &&
            <BilanDropdown bilans = {bilans} selectedValue={formatDate(selectedBilan.date, 'd/M/y')} onValueChange = {setSelectedBilan}/>
        }
    </div>
    {
        bilans.length > 0 &&
        <div>
                {
                    selectedBilan.presence &&
                    <Card className={cn('bg-linear-330 from-15% from-green-200 to-60% to-lime-200 shadow-md rounded-xl border border-lime-400 mt-4', className)}>
                        <CardContent className=''>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col'>
                                    <span className='uppercase font-bold opacity-75 text-sm'>Matière</span>
                                    <span className='text-lg font-medium'>{selectedBilan.lesson!.subject!.label!}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='uppercase font-bold opacity-75 text-sm'>Leçon(s)</span>
                                    <span className='text-lg font-medium'>{selectedBilan.lesson!.label}</span>
                                </div>
                            </div>
                            <div className='uppercase font-bold opacity-75 text-sm mt-6'>Bilan</div>
                            <p className='text-base font-medium text-pretty'>{selectedBilan.summary!}</p>
                        </CardContent>
                    </Card>
                }
                {
                    !selectedBilan.presence &&
                    <Card className='bg-linear-330 from-15% from-orange-500 to-60% to-red-500 shadow-md rounded-xl border border-red-400 mt-4'>
                        <CardContent className='flex items-center justify-center'>
                            <p className='text-xl font-medium text-pretty text-white text-shadow-2xs'>Absent</p>
                        </CardContent>
                    </Card>

                }
        </div>
    }
    {
        bilans.length <=0 && 
        <Card className='bg-white shadow-md rounded-xl border border-zinc-200 mt-4'>
            <CardContent className='flex items-center justify-center'>
                <p className='text-lg font-medium text-pretty opacity-75'>Aucun bilan n'a été encore soumis</p>
            </CardContent>
        </Card>
    }
    </>
  )
}

export default BilanCard