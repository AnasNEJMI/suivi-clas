import type { AnimatorClassStats} from '@/api/association-member/apiCalls'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const ClassStatsTable = ({selectedClass} : {selectedClass : AnimatorClassStats}) => {
    return (
    <>
        <Separator className='mt-6'/>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead >Date</TableHead>
                    <TableHead  className='text-right'>Durée</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    selectedClass.seances.length>0 &&
                    selectedClass.seances.map((seance) => {
                        console.log(seance.id);
                        return (
                            <TableRow key={seance.id}>
                                <TableCell className="font-medium max-w-32 truncate">{format(seance.date, 'dd/MM/yyyy', {locale : fr})}</TableCell>
                                <TableCell className="font-medium text-right">{seance.duration}</TableCell>
                            </TableRow>
                        )}
                    )
                }
            </TableBody>
        </Table>
    </>
  )
}

export default ClassStatsTable