import type { QcmStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface VisitStatsDropdownProps {
    className? : string,
    qcmStatsPerScolarYear : QcmStatsPerScolarYear[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<QcmStatsPerScolarYear>>
}
const ScolarYearDropdown = ({className, qcmStatsPerScolarYear, selectedValue, onValueChange} : VisitStatsDropdownProps) => {
    const updateValue = (value : string) => {
        const scolarYearStats = qcmStatsPerScolarYear.find((s) => s.scolarYear.id === parseInt(value));
        if(!scolarYearStats){
        throw Error(`Couldn't find scolarYear with id : ${value}`);
        }
        onValueChange(scolarYearStats);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit border-none shadow-card">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    qcmStatsPerScolarYear.length>0 && 
                    qcmStatsPerScolarYear.map((yearStats, index) => {
                        return (
                            <SelectItem key={index} value={yearStats.scolarYear.id.toString()} className='text-lg font-medium font-outfit'>{yearStats.scolarYear.label}</SelectItem>
                        )
                    }
                    )
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default ScolarYearDropdown