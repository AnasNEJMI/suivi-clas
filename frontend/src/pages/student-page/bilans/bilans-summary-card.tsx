import type { BilanEntry, QcmEntry } from '@/api/student/apiCalls'
import BilanDropdown from '@/pages/student-page/bilans/bilan-dropdown';
import { formatDate } from 'date-fns';
import { useState } from 'react'
import NoBilanFoundCard from './no-bilan-found-card';
import BilanPresentCard from './bilan-present-card';
import BilanAbsentCard from './bilan-absent-card';
import type { User } from '@/api/auth';

const BilansSummaryCard = ({bilans, student, onQcmSubmit} : {bilans : BilanEntry[], student : User, onQcmSubmit : (qcm: QcmEntry) => void}) => {
  const [selectedBilanId, setSelectedBilanId] = useState<number | null>(bilans.length > 0 ? bilans[0].id : null);
  const selectedBilan = bilans.find(b => b.id === selectedBilanId);

  if(bilans.length === 0 || !selectedBilan){
    return (<NoBilanFoundCard/>)
  }


  return (
    <div>
      <div className='flex justify-between items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Bilan de séance</h2>
            {
                bilans.length > 0 &&
                <BilanDropdown bilans = {bilans} selectedValue={formatDate(selectedBilan.date, 'd/M/y')} onValueChange = {setSelectedBilanId}/>
            }
      </div>
      {
        selectedBilan.presence
        ? <BilanPresentCard bilan = {selectedBilan} onQcmSubmit = {onQcmSubmit}/>
        : <BilanAbsentCard bilan = {selectedBilan} student={student}/>
      }
    </div>
  )
}

export default BilansSummaryCard