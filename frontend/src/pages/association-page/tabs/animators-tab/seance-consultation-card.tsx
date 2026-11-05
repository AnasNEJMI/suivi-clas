import { CheckCircle2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDayTime, readRate } from '@/lib/consultation'
import type { CarouselSeance } from './seance-history-carousel'

type Student = CarouselSeance['seance']['students'][number]

const StudentRow = ({ student, read }: { student: Student; read: boolean }) => (
  <li className={cn('flex items-center justify-between gap-3 rounded-xl border p-3', read ? 'border-emerald-100/80 bg-emerald-50/40' : 'border-amber-100 bg-amber-50/40')}>
    <div className='flex min-w-0 items-center gap-3'>
      <span className={cn('grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold', read ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
      </span>
      <span className='truncate text-sm font-medium text-slate-800'>{student.firstName} {student.lastName}</span>
    </div>
    <span className='shrink-0 text-right text-xs'>
      {read && student.firstViewedAt ? (
        <>
          <span className='block font-semibold text-emerald-700'>Lu le {formatDayTime(student.firstViewedAt)}</span>
          {student.viewCount > 1 && <span className='text-slate-500'>{student.viewCount} ouvertures</span>}
        </>
      ) : (
        <span className='font-semibold text-amber-700'>Pas encore ouvert</span>
      )}
    </span>
  </li>
)

export function SeanceConsultationCard({ students }: { students: Student[] }) {
  // Every present student received a bilan; absent students have nothing to read
  const present = students.filter(s => s.presence)
  if (present.length === 0) return null

  const read   = present.filter(s => s.firstViewedAt !== null)
  const unread = present.filter(s => s.firstViewedAt === null)
  const rate   = readRate(present.length, read.length) ?? 0

  return (
    <Card className='gap-2 rounded-2xl border-slate-200/80 bg-white shadow-xs'>
      <CardHeader className='border-b border-slate-100 pb-3'>
        <div className='flex items-center justify-between gap-3'>
          <CardTitle className='flex items-center gap-2 text-base font-bold text-slate-900'>
            <EyeIcon className='size-4 text-indigo-600' /> Consultation des bilans
          </CardTitle>
          <span className='shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700'>
            {read.length} / {present.length} lus
          </span>
        </div>
        <div className='mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100' role='img' aria-label={`${rate} % des bilans lus`}>
          <div className='h-full rounded-full bg-emerald-500 transition-[width] duration-700' style={{ width: `${rate}%` }} />
        </div>
      </CardHeader>

      <CardContent className='space-y-5 pt-4'>
        {unread.length > 0 && (
          <div>
            <h4 className='mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700'>
              <EyeOffIcon className='size-3.5' /> Pas encore ouvert ({unread.length})
            </h4>
            <ul className='space-y-2'>{unread.map((s, i) => <StudentRow key={`u${i}`} student={s} read={false} />)}</ul>
          </div>
        )}

        {read.length > 0 && (
          <div>
            <h4 className='mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700'>
              <CheckCircle2Icon className='size-3.5' /> Ont ouvert leur bilan ({read.length})
            </h4>
            <ul className='space-y-2'>{read.map((s, i) => <StudentRow key={`r${i}`} student={s} read />)}</ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}