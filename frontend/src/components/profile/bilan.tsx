import  { useState } from 'react'
import { Card, CardContent} from '../ui/card'
import BilanDropdown from './bilan-dropdown'
import type { Bilan } from '@/api/api.types'
import { cn } from '@/lib/utils'
import { formatDate } from 'date-fns'

// const data = [
//     {
//         date : '01/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '02/01',
//         present : false,
//     },
//     {
//         date : '03/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '04/01',
//         present : false,
//     },
//     {
//         date : '05/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '06/01',
//         present : false,
//     },
//     {
//         date : '07/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '08/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '09/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '10/01',
//         present : false,
//     },
//     {
//         date : '11/01',
//         present : false,
//     },
//     {
//         date : '12/01',
//         present : true,
//         bilan : {
//             subject : 'Mathématiques',
//             lessons : ['Nombres relatifs'],
//             summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
//         }
//     },
//     {
//         date : '13/01',
//         present : false,
//     },
// ]

interface BilanCardProps {
    className? : string,
    bilans : Bilan[];
}

const BilanCard = ({className, bilans} : BilanCardProps) => {
    const [selectedBilan, setSelectedBilan] = useState<Bilan>(bilans[0])
  return (
    <>
    {
        bilans.length > 0 &&
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl md:text-2xl font-bold'>Bilan séance</h2>
                <BilanDropdown bilans = {bilans} selectedValue={formatDate(selectedBilan.date, 'd/M/y')} onValueChange = {setSelectedBilan}/>
            </div>
            <>
                {
                    selectedBilan.presence &&
                    <Card className={cn('bg-linear-330 from-15% from-green-200 to-60% to-lime-200 shadow-md rounded-xl border border-lime-400 mt-4', className)}>
                        <CardContent className=''>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col'>
                                    <span className='uppercase font-bold opacity-75 text-sm'>Matière</span>
                                    <span className='text-lg font-medium'>{selectedBilan.subject!}</span>
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
            </>
        </div>
    }
    {
        bilans.length <=0 && 
        <Card className='bg-white shadow-md rounded-xl border border-zinc-200 mt-4'>
            <CardContent className='flex items-center justify-center'>
                <p className='text-xl font-medium text-pretty text-shadow-2xs'>Aucun bilan n'a été encore soumis</p>
            </CardContent>
        </Card>
    }
    </>
  )
}

export default BilanCard