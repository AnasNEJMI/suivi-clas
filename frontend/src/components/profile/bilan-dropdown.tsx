import type { bilanDataType } from '@/lib/types/data.types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

interface BilanDropdownProps {
    className? : string,
    data : bilanDataType[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<bilanDataType>>
}
const BilanDropdown = ({className, data, selectedValue, onValueChange} : BilanDropdownProps) => {
    
    const updateValue = (value : string) => {
        const bilan = data.find((bilan) => bilan.date === value);
        if(!bilan){
        throw Error(`Couldn't find bilan for the date : ${value}`);
        }
        onValueChange(bilan);
    }
    return (
    <Select value={selectedValue} onValueChange={(value) => updateValue(value)}>
        <SelectTrigger className="w-45 bg-white text-lg font-medium font-outfit">
            <SelectValue/>
        </SelectTrigger>
        <SelectContent className={cn(className, '')}>
            <SelectGroup>
                {
                    data && data.length>0 &&
                    data.map((bilan, index) => (
                        <SelectItem key={index} value={bilan.date} className='text-lg font-medium font-outfit'>{bilan.date}/2026</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default BilanDropdown