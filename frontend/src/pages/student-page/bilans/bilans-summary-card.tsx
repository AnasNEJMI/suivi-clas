import type { BilanEntry } from '@/api/student/apiCalls'
import BilanDropdown from '@/components/student-profile/bilan-dropdown';
import { formatDate } from 'date-fns';
import { useState } from 'react'
import NoBilanFoundCard from './no-bilan-found-card';
import BilanPresentCard from './bilan-present-card';
import BilanAbsentCard from './bilan-absent-card';
import type { User } from '@/api/auth';

const BilansSummaryCard = ({bilans, student} : {bilans : BilanEntry[], student : User}) => {

  const [selectedBilan, setSelectedBilan] = useState(bilans.length > 0 ? bilans[0] : null);

  if(bilans.length === 0 || !selectedBilan){
    return (<NoBilanFoundCard/>)
  }
  return (
    <div>
      <div className='flex justify-between items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Bilan de séance</h2>
            {
                bilans.length > 0 &&
                <BilanDropdown bilans = {bilans} selectedValue={formatDate(selectedBilan.date, 'd/M/y')} onValueChange = {setSelectedBilan}/>
            }
      </div>
      {
        selectedBilan.presence
        ? <BilanPresentCard bilan = {selectedBilan}/>
        : <BilanAbsentCard bilan = {selectedBilan} student={student}/>
      }
    </div>
  )
}

export default BilansSummaryCard