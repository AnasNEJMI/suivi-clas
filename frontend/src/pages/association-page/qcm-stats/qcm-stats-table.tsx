import type {ClassQcmStats, QcmStatsPerScolarYear } from '@/api/association-member/apiCalls'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useIsBigScreen } from '@/hooks/use-bigScreen'
import {useState } from 'react'
import ClassDropdown from './class-dropdown'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const QcmStatsTable = ({selectedScolarYear} : {selectedScolarYear : QcmStatsPerScolarYear}) => {
    const [selectedClassStats, setSelectedClassStats] = useState<ClassQcmStats>(selectedScolarYear.classes[0])
    const  isBigScreen = useIsBigScreen();
    
    return (
    <Card className='mt-6 border-none shadow-card'>
        <CardContent>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg md:text-lg font-bold bg'>Groupe</h2>
                <ClassDropdown classesStats = {selectedScolarYear.classes} selectedValue={selectedClassStats.class.id.toString()} onValueChange = {setSelectedClassStats}/>
            </div>
            <Separator className='mt-6'/>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Élève</TableHead>
                        {
                            !isBigScreen &&
                            <>
                                <TableHead  className="text-center">Total</TableHead>
                            </>
                        }
                        <TableHead  className='text-center'>Complétés (%)</TableHead>
                        <TableHead  className='text-right'>Moyenne</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        selectedClassStats.students.length>0 &&
                        selectedClassStats.students.map((studentStats) => {
                            const nameLabel = `${studentStats.firstName} ${studentStats.lastName}`;
                            const totalQcms = studentStats.totalQcms;
                            const completionPct = totalQcms === 0 ? 0 : Math.round(100 *studentStats.qcmCompletedCount/totalQcms);
                            const averageScore = studentStats.qcmCompletedCount === 0 ? 0 : Math.round(studentStats.qcmCompletedTotalPoints/studentStats.qcmCompletedCount);
                            return (
                                <TableRow key={studentStats.id}>
                                    <TableCell className="font-medium max-w-24 truncate">{nameLabel}</TableCell>
                                    {
                                        !isBigScreen &&
                                        <>
                                            <TableCell className="font-medium text-center">{studentStats.totalQcms}</TableCell>
                                        </>
                                    }
                                    
                                    <TableCell className="font-medium text-center">{completionPct} %</TableCell>
                                    <TableCell className={cn("text-right capitalize font-bold")}>{averageScore} / 10</TableCell>
                                </TableRow>
                            )}
                        )
                    }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default QcmStatsTable