import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { cn } from '@/lib/utils'
import type { Bilan } from '@/api/api.types'
import { formatDate } from 'date-fns'

interface BilanDropdownProps {
    className? : string,
    bilans : Bilan[],
    selectedValue : string,
    onValueChange : React.Dispatch<React.SetStateAction<Bilan>>
}
const BilanDropdown = ({className, bilans, selectedValue, onValueChange} : BilanDropdownProps) => {
    
    const updateValue = (value : string) => {
        const bilan = bilans.find((bilan) => formatDate(bilan.date, 'd/M/y') === value);
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
                    bilans && bilans.length>0 &&
                    bilans.map((bilan, index) => (
                        <SelectItem key={index} value={formatDate(bilan.date, 'd/M/y')} className='text-lg font-medium font-outfit'>{formatDate(bilan.date, 'd/M/y')}</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default BilanDropdown