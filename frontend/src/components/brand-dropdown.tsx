import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from './ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import type { ScolarYearEntry } from '@/api/animator/types'

interface ScolarYearDropdownProps {
    className? : string,
    scolarYears : ScolarYearEntry[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<ScolarYearEntry>>
}
const ScolarYearDropdown = ({className, scolarYears, selectedValue, onValueChange} : ScolarYearDropdownProps) => {
    
    const updateValue = (value : string) => {
        const scolarYear = scolarYears.find((scolarYear) => scolarYear.label === value);
        if(!scolarYear){
        throw Error(`Couldn't find bilan for the date : ${value}`);
        }
        onValueChange(scolarYear);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    scolarYears && scolarYears.length>0 &&
                    scolarYears.map((scolarYear, index) => (
                        <SelectItem key={index} value={scolarYear.label} className='text-lg font-medium font-outfit'>{scolarYear.label}</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default ScolarYearDropdown