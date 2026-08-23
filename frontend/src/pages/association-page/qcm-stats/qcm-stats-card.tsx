import type {QcmStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { useState } from "react"
import ScolarYearDropdown from "./scolar-year-dropdown"
import QcmStatsTable from "./qcm-stats-table"

const QcmStatsCard = ({qcmStatsPerScolarYear} : {qcmStatsPerScolarYear : QcmStatsPerScolarYear[]}) => {
  const [selectedScolarYear, setSelectedScolarYear] = useState(qcmStatsPerScolarYear[0])
    return (
    <section className='mt-16 w-full px-6 max-w-5xl'>
        <div className='flex items-start justify-between'>
            <h2 className='text-xl md:text-2xl font-bold bg'>Qcms</h2>
            <ScolarYearDropdown qcmStatsPerScolarYear = {qcmStatsPerScolarYear} selectedValue={selectedScolarYear.scolarYear.id.toString()} onValueChange = {setSelectedScolarYear}/>
        </div>
        <QcmStatsTable key={selectedScolarYear.scolarYear.id} selectedScolarYear = {selectedScolarYear}/>
    </section>
  )
}

export default QcmStatsCard