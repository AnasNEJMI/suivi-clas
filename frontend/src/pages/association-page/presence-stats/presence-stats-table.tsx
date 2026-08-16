import type { ClassPresenceStats, PresenceStatsPerScolarYear } from '@/api/association-member/apiCalls'
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
import { useState } from 'react'
import ClassPresenceStatsDropdown from './class-presence-stats-dropdown'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'


const IDEAL_PRESENCE_PCT = 70;

const PresenceStatsTable = ({selectedScolarYear} : {selectedScolarYear : PresenceStatsPerScolarYear}) => {
      const  isBigScreen = useIsBigScreen();
      const [selectedClassStats, setSelectedClassStats] = useState<ClassPresenceStats>(selectedScolarYear.classes[0])
    return (
    <Card className='mt-6'>
        <CardContent>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg md:text-lg font-bold bg'>Groupe</h2>
                <ClassPresenceStatsDropdown classesStats = {selectedScolarYear.classes} selectedValue={selectedClassStats.class.id.toString()} onValueChange = {setSelectedClassStats}/>
            </div>
            <Separator className='mt-6'/>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Élève</TableHead>
                        {
                            !isBigScreen
                        ?   <>
                                <TableHead  className='text-center'>Présence</TableHead>
                                <TableHead  className='text-center'>Absence</TableHead>
                                <TableHead className="text-right">Pourcentage</TableHead>
                            </>
                        :   <>
                                <TableHead  className='text-right'>Pourcentage</TableHead>
                            </>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        selectedClassStats.students.length>0 &&
                        selectedClassStats.students.map((studentStats) => {
                            const nameLabel = `${studentStats.firstName} ${studentStats.lastName}`
                            const total = studentStats.presence+studentStats.absence;
                            const presenceLabel = `${studentStats.presence}/${studentStats.presence+studentStats.absence}`
                            const absenceLabel = `${studentStats.absence}/${studentStats.presence+studentStats.absence}`
                            const pct = total === 0 ? 0 : Math.round(100 * studentStats.presence/total);
                            const pctLabel = total === 0 ? '-' : `${pct}%`
                            return (
                                <TableRow key={studentStats.id}>
                                    <TableCell className="font-medium max-w-32 truncate">{nameLabel}</TableCell>
                                    {
                                        !isBigScreen &&
                                        <>
                                            <TableCell className="font-medium text-center">{presenceLabel}</TableCell>
                                            <TableCell className="font-medium text-center">{absenceLabel}</TableCell>
                                        </>
                                    }
                                    <TableCell className={cn("text-right capitalize font-bold", pct >= IDEAL_PRESENCE_PCT ? 'text-lime-500' : 'text-rose-500')}>{pctLabel}</TableCell>
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

export default PresenceStatsTable