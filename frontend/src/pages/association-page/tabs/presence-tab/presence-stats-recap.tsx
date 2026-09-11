import type {PresenceStatsPerScolarYear } from '@/api/association-member/apiCalls'
import { CalendarCheck2Icon, CalendarX2Icon} from 'lucide-react';

const AssocPresenceStatsRecap = ({presenceStatsPerScolarYear} : {presenceStatsPerScolarYear : PresenceStatsPerScolarYear[]}) => {
    const presenceStats = presenceStatsPerScolarYear[0];
    let totalSeances = 0;
    let totalPresent = 0;
    let totalAbsent = 0;
    if(presenceStats && presenceStats.classes.length > 0){
        const totalSeancesArray = presenceStats.classes.map(c => c.students.map(s => s.absence + s.presence)).flat();
        const presentArray = presenceStats.classes.map(c => c.students.map(s => s.presence)).flat();
        const absentArray = presenceStats.classes.map(c => c.students.map(s => s.absence)).flat();
        for (let i = 0; i < totalSeancesArray.length; i++) {
            const total = totalSeancesArray[i];
            totalSeances+=total;
        }
        for (let i = 0; i < presentArray.length; i++) {
            const total = presentArray[i];
            totalPresent+=total;
        }
        for (let i = 0; i < absentArray.length; i++) {
            const total = absentArray[i];
            totalAbsent+=total;
        }
    }

    const presenceRate = totalSeances === 0 ? 0 : Math.floor(100 * totalPresent / totalSeances);
    const absenceRate = totalSeances === 0 ? 0 : Math.floor(100 * totalAbsent / totalSeances);

    return (
        <>
            <h3 className='mt-6 font-semibold text-lg lg:text-xl text-zinc-900'>Bilan de présence</h3>
            <div className='mt-2 flex gap-2 lg:gap-4'>
                <div className='rounded-xl p-4 flex items-start justify-between bg-emerald-100 shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{presenceRate}%</span>
                        <span className='opacity-75 text-sm font-medium'>Élèves présents</span>
                    </div>
                    <CalendarCheck2Icon className='size-8 text-emerald-600'/>
                </div>
                <div className='rounded-xl p-4 flex items-start justify-between bg-red-100 shadow-sm flex-1'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-2xl'>{absenceRate}%</span>
                        <span className='opacity-75 text-sm font-medium'>Élèves absents</span>
                    </div>
                    <CalendarX2Icon className='size-8 text-red-600'/>
                </div>
            </div>
        </>
    )
}

export default AssocPresenceStatsRecap