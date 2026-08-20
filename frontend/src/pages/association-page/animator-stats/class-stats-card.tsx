import type { AnimatorStats } from "@/api/association-member/apiCalls"
import { useState } from "react";
import ClassDropdown from "./class-dropdown";
import ClassStatsTable from "./class-stats-table";

const ClassStatsCard = ({selectedAnimator} : {selectedAnimator : AnimatorStats}) => {
  const [selectedClass, setSelectedClass] = useState(selectedAnimator.classes[0]);
    return (
    <>
        <div className='flex items-start justify-between mt-2'>
            <h2 className='text-base md:text-lg font-bold bg'>Classe</h2>
            <ClassDropdown classes = {selectedAnimator.classes} selectedValue={selectedClass.class.id.toString()} onValueChange = {setSelectedClass}/>
        </div>
        <ClassStatsTable selectedClass = {selectedClass}/>
    </>
    )
}

export default ClassStatsCard