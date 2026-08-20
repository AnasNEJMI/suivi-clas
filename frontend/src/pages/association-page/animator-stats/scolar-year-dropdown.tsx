import type { AnimatorStatsPerScolarYear } from "@/api/association-member/apiCalls"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ScolarYearDropdownProps {
    className? : string,
    scolarYears : AnimatorStatsPerScolarYear[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<AnimatorStatsPerScolarYear>>
}
const ScolarYearDropdown = ({className, scolarYears, selectedValue, onValueChange} : ScolarYearDropdownProps) => {
    const updateValue = (value : string) => {
        const scolarYear = scolarYears.find((s) => s.scolarYear.id === parseInt(value));
        if(!scolarYear){
        throw Error(`Couldn't find scolarYear with id : ${value}`);
        }
        onValueChange(scolarYear);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit border-none shadow-card">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    scolarYears.length>0 && 
                    scolarYears.map((yearStats, index) => {
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