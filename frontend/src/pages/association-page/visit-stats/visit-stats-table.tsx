import type {ClassVisitStats, VisitStatsPerScolarYear } from '@/api/association-member/apiCalls'
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
import ClassVisitStatsDropdown from './class-visit-stats-dropdown'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const VisitStatsTable = ({selectedScolarYear} : {selectedScolarYear : VisitStatsPerScolarYear}) => {
    const [selectedClassStats, setSelectedClassStats] = useState<ClassVisitStats>(selectedScolarYear.classes[0])
    const  isBigScreen = useIsBigScreen();
    
    return (
    <Card className='mt-6 border-none shadow-card'>
        <CardContent>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg md:text-lg font-bold bg'>Groupe</h2>
                <ClassVisitStatsDropdown classesStats = {selectedScolarYear.classes} selectedValue={selectedClassStats.class.id.toString()} onValueChange = {setSelectedClassStats}/>
            </div>
            <Separator className='mt-6'/>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Élève</TableHead>
                        {
                            !isBigScreen
                        ?   <>
                                <TableHead  className='text-center'>Visites</TableHead>
                                <TableHead  className="text-right">Dérnière visite</TableHead>
                            </>
                        :   <>
                                <TableHead  className='text-right'>Dérnière visite</TableHead>
                            </>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        selectedClassStats.students.length>0 &&
                        selectedClassStats.students.map((studentStats) => {
                            const nameLabel = `${studentStats.firstName} ${studentStats.lastName}`
                            const numVisitsLabel  = studentStats.numVisits;
                            const lastVisitLabel = studentStats.lastVisit? format(studentStats.lastVisit, 'PPP', {locale: fr}) : '-'
                            return (
                                <TableRow key={studentStats.id}>
                                    <TableCell className="font-medium max-w-32 truncate">{nameLabel}</TableCell>
                                    {
                                        !isBigScreen &&
                                        <>
                                            <TableCell className="font-medium text-center">{numVisitsLabel}</TableCell>
                                        </>
                                    }
                                    <TableCell className={cn("text-right capitalize font-bold")}>{lastVisitLabel}</TableCell>
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

export default VisitStatsTable