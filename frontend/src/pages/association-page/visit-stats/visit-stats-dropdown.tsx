import type { VisitStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface VisitStatsDropdownProps {
    className? : string,
    visitStatsPerScolarYear : VisitStatsPerScolarYear[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<VisitStatsPerScolarYear>>
}
const VisitStatsDropdown = ({className, visitStatsPerScolarYear, selectedValue, onValueChange} : VisitStatsDropdownProps) => {
    const updateValue = (value : string) => {
        const scolarYearStats = visitStatsPerScolarYear.find((s) => s.scolarYear.id === parseInt(value));
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
                    visitStatsPerScolarYear.length>0 && 
                    visitStatsPerScolarYear.map((yearStats, index) => {
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

export default VisitStatsDropdown