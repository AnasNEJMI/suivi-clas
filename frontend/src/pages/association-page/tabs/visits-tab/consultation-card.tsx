import { ChevronRightIcon } from 'lucide-react'
import { cn, getElapsedDays } from '@/lib/utils'
import { consultationPattern, readRate } from '@/lib/consultation'
import type { ClassConsultationStats } from '@/api/association-member/apiCalls'
import StudentConsultationDrawer from './consultation-drawer'

export type StudentConsultation = ClassConsultationStats['students'][number]

const StudentBilanConsultationCard = ({ student, classLabel }: { student: StudentConsultation; classLabel: string }) => {
  const pattern = consultationPattern(student.bilansReceived, student.bilansRead)
  const rate    = readRate(student.bilansReceived, student.bilansRead) ?? 0

  return (
    <StudentConsultationDrawer student={student} classLabel={classLabel}>
      <button
        type='button'
        className='group flex h-full w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left font-outfit shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400'
      >
        <span className='flex items-start justify-between gap-2'>
          <span className='flex min-w-0 items-center gap-3'>
            <span className='grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700'>
              {student.firstName.charAt(0).toUpperCase()}{student.lastName.charAt(0).toUpperCase()}
            </span>
            <span className='min-w-0'>
              <span className='block truncate text-sm font-bold leading-snug text-slate-900'>
                <span className='capitalize'>{student.firstName}</span> <span className='uppercase'>{student.lastName}</span>
              </span>
              <span className='block truncate text-xs text-slate-500'>{classLabel}</span>
            </span>
          </span>
        </span>

        <span className={cn('inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-bold', pattern.badge)}>
          {pattern.label}
        </span>

        <span className='block'>
          <span className='flex items-baseline justify-between'>
            <span className='text-xs font-semibold text-slate-500'>Bilans lus</span>
            <span className='text-sm font-extrabold tabular-nums text-slate-900'>
              {student.bilansRead}<span className='font-bold text-slate-400'> / {student.bilansReceived}</span>
            </span>
          </span>
          <span className='mt-1.5 block h-1.5 overflow-hidden rounded-full bg-slate-100' role='img' aria-label={`${rate} % des bilans lus`}>
            <span className={cn('block h-full rounded-full transition-[width] duration-700', pattern.bar)} style={{ width: `${rate}%` }} />
          </span>
        </span>

        <span className='flex flex-col gap-2 text-xs'>
          <span className='flex items-center justify-between gap-2'>
            <span className='font-medium text-slate-500'>Dernier bilan</span>
            {student.latestBilanRead === null ? <span className='text-slate-400'>–</span> : student.latestBilanRead ? (
              <span className='inline-flex items-center gap-1.5 font-bold text-emerald-700'><span className='size-1.5 rounded-full bg-emerald-500' />Lu</span>
            ) : (
              <span className='inline-flex items-center gap-1.5 font-bold text-amber-700'><span className='size-1.5 rounded-full bg-amber-500' />Pas encore lu</span>
            )}
          </span>
          <span className='flex items-center justify-between gap-2'>
            <span className='font-medium text-slate-500'>Dernière consultation</span>
            <span className='font-bold text-slate-800'>{student.lastVisit ? getElapsedDays(student.lastVisit) : 'Jamais'}</span>
          </span>
        </span>

        <span className='mt-auto flex items-center justify-end gap-1 border-t border-slate-100 pt-3 text-xs font-bold text-slate-500 transition group-hover:text-slate-800'>
          Voir le détail <ChevronRightIcon className='size-3.5 transition group-hover:translate-x-0.5' aria-hidden />
        </span>
      </button>
    </StudentConsultationDrawer>
  )
}

export default StudentBilanConsultationCard