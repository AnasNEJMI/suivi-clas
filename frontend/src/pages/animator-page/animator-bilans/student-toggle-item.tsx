import type { SeanceStudentEntry } from "@/api/animator/types"
import { ToggleGroupItem } from "@/components/ui/toggle-group"
import { CheckIcon } from "lucide-react"
import { memo } from "react"

const StudentToggleItem = memo(function StudentToggleItem({
    student,
}: {
    student: SeanceStudentEntry
}) {
    return (
        <ToggleGroupItem
            value={student.id.toString()}
            className='flex h-8 px-3 items-center gap-1.5 rounded-lg'
        >
            <span className='text-sm'>{student.firstName} {student.lastName}</span>
            {student.bilan && <CheckIcon size={12} className='text-lime-500' />}
        </ToggleGroupItem>
    )
})

export default StudentToggleItem