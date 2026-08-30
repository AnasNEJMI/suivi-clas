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
            className='h-8 px-3 rounded-sm'
        >
            <div className="flex items-center gap-1.5">
                <span className='text-sm'>{student.firstName} {student.lastName}</span>
                {student.bilan && <CheckIcon size={12} className='text-lime-500' />}
            </div>
        </ToggleGroupItem>
    )
})

export default StudentToggleItem