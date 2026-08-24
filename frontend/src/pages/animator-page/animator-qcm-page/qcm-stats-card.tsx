import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { QcmEntry } from '@/api/student/apiCalls'
import NoQcmsCard from '../animator-skill-evaluation/cards/no-qcms-card'
import QcmStatBadgeList from './qcms-stat-badge-list'
import QcmList from './qcm-list'
import { Separator } from '@/components/ui/separator'

interface QcmStatsCardProps {
    qcms:  QcmEntry[] | null
}

const QcmStatsCard = ({qcms }: QcmStatsCardProps) => {

    if(!qcms || qcms.length === 0) return <NoQcmsCard/>

    return (
        <Card className='font-outfit border-none shadow-card'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <div className='w-8 h-8 aspect-square rounded-full bg-primary flex items-center justify-center text-white text-sm'>
                        2
                    </div>
                    <span className='text-lg lg:text-xl'>Récapitulatif</span>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <QcmStatBadgeList qcms = {qcms}/>
                <Separator/>
                <QcmList qcms = {qcms}/>
            </CardContent>
        </Card>
    )
}

export default QcmStatsCard