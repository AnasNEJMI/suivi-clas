import  { useState } from 'react'
import { Card, CardContent} from '../ui/card'
import BilanDropdown from './bilan-dropdown'
import type { bilanDataPresent, bilanDataType } from '@/lib/types/data.types'

const data = [
    {
        date : '01/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '02/01',
        present : false,
    },
    {
        date : '03/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '04/01',
        present : false,
    },
    {
        date : '05/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '06/01',
        present : false,
    },
    {
        date : '07/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '08/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '09/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '10/01',
        present : false,
    },
    {
        date : '11/01',
        present : false,
    },
    {
        date : '12/01',
        present : true,
        bilan : {
            subject : 'Mathématiques',
            lessons : ['Nombres relatifs'],
            summary : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vero sapiente modi corrupti, repellat, reiciendis debitis dolorum porro voluptatem ipsum consectetur odit eum eos illo quas obcaecati, similique amet officiis?'
        }
    },
    {
        date : '13/01',
        present : false,
    },
]



const Bilan = () => {
    const [selectedBilan, setSelectedBilan] = useState<bilanDataType>(data[0])
  return (
    <>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Bilan séance</h2>
            <BilanDropdown data = {data} selectedValue={selectedBilan.date} onValueChange = {setSelectedBilan}/>
        </div>
        {
            selectedBilan.present &&
            <Card className='bg-linear-330 from-15% from-green-200 to-60% to-lime-200 shadow-md rounded-xl border border-lime-400 mt-4'>
                <CardContent className=''>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col'>
                            <span className='uppercase font-bold opacity-75 text-sm'>Matière</span>
                            <span className='text-lg font-medium'>{(selectedBilan as bilanDataPresent).bilan.subject}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='uppercase font-bold opacity-75 text-sm'>Leçon(s)</span>
                            <span className='text-lg font-medium'>{(selectedBilan as bilanDataPresent).bilan.lesson}</span>
                        </div>
                    </div>
                    <div className='uppercase font-bold opacity-75 text-sm mt-6'>Bilan</div>
                    <p className='text-base font-medium text-pretty'>{(selectedBilan as bilanDataPresent).bilan.summary}</p>
                </CardContent>
            </Card>

        }
        {
            !selectedBilan.present &&
            <Card className='bg-linear-330 from-15% from-orange-500 to-60% to-red-500 shadow-md rounded-xl border border-red-400 mt-4'>
                <CardContent className='flex items-center justify-center'>
                    <p className='text-xl font-medium text-pretty text-white text-shadow-2xs'>Absent</p>
                </CardContent>
            </Card>

        }
    </>
  )
}

export default Bilan