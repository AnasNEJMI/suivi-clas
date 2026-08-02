import type { LessonsByLevelEntry, SeanceBilanEntry, SeanceEntry } from '@/api/animator/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { useState } from 'react'
import StudentToggleItem from './student-toggle-item'
import StudentBilanForm from './student-bilan-form'

interface BilansSectionProps {
    seance:            SeanceEntry
    animatorId:        number
    lessonsByLevel:    LessonsByLevelEntry[]
    onBilanSubmitted:  (studentId: number, bilan: SeanceBilanEntry) => void
}


const BilansSection = ({
    seance,
    animatorId,
    lessonsByLevel,
    onBilanSubmitted,
} : BilansSectionProps) => {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

    const selectedStudent = seance.students.find(s => s.id === selectedStudentId) ?? null


  return (
    <Card className='font-outfit border-none shadow-card'>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm'>
                    2
                </div>
                <span className='text-xl lg:text-2xl'>Bilans</span>
            </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
            <ToggleGroup
                type='single'
                value={selectedStudentId?.toString() ?? ''}
                onValueChange={(v) => setSelectedStudentId(v ? parseInt(v) : null)}
                variant='outline'
                spacing={1}
                className='w-full items-center justify-start flex-wrap'
            >
                {seance.students.map(student => (
                    <StudentToggleItem key={student.id} student={student} />
                ))}
            </ToggleGroup>
            {
                selectedStudent && 
                <StudentBilanForm
                    key = {selectedStudent.id}
                    student = {selectedStudent}
                    seanceId = {seance.id}
                    seanceDate = {seance.date}
                    animatorId = {animatorId}
                    lessonsByLevel = {lessonsByLevel}
                    onSuccess = {(bilan : SeanceBilanEntry) => onBilanSubmitted(selectedStudent.id, bilan)}
                />

            }
        </CardContent>
    </Card>
  )
}

export default BilansSection