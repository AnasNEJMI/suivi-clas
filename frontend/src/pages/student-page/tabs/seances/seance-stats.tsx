import type { ReactNode } from 'react'
import type { BilanEntry } from '@/api/student/apiCalls'
import { CalendarCheck2Icon, CalendarIcon, CalendarX2Icon, PieChartIcon, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Stat({ icon: Icon, tone, label, children }: { icon: LucideIcon; tone: string; label: string; children: ReactNode }) {
  return (
    <div className='flex flex-col gap-3 bg-white p-4 sm:p-5'>
      <div className='flex items-center gap-2.5'>
        <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg', tone)}><Icon className='size-4' aria-hidden /></span>
        <span className='text-xs font-semibold text-slate-500'>{label}</span>
      </div>
      {children}
    </div>
  )
}

const Value = ({ children }: { children: ReactNode }) => (
  <p className='text-3xl font-extrabold tabular-nums tracking-tight text-slate-900'>{children}</p>
)
const Hint = ({ children }: { children: ReactNode }) => <p className='text-xs font-medium text-slate-500'>{children}</p>

const StudentSeanceStats = ({ bilans }: { bilans: BilanEntry[] }) => {
  const total   = bilans.length
  const present = bilans.filter(b => b.presence).length
  const absent  = total - present
  const rate    = total > 0 ? Math.round((100 * present) / total) : null

  const status =
    rate === null ? null :
    rate >= 90 ? { label: 'Excellente assiduité', text: 'text-emerald-700', bar: 'bg-emerald-500' } :
    rate >= 75 ? { label: 'Bonne assiduité',      text: 'text-sky-700',     bar: 'bg-sky-500' } :
                 { label: 'À améliorer',          text: 'text-amber-700',   bar: 'bg-amber-500' }

  return (
    <div className='mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 font-outfit shadow-xs xl:grid-cols-4'>
      <Stat icon={CalendarIcon} tone='bg-indigo-50 text-indigo-600' label='Séances'>
        <Value>{total || '–'}</Value>
        <Hint>au total</Hint>
      </Stat>

      <Stat icon={CalendarCheck2Icon} tone='bg-emerald-50 text-emerald-600' label='Présences'>
        <Value>
          {total > 0 ? present : '–'}
          {total > 0 && <span className='text-base font-bold text-slate-300'>/{total}</span>}
        </Value>
        <Hint>séances suivies</Hint>
      </Stat>

      <Stat icon={CalendarX2Icon} tone='bg-slate-100 text-slate-500' label='Absences'>
        <Value>{total > 0 ? absent : '–'}</Value>
        <Hint>{total > 0 && absent === 0 ? 'Aucune absence' : 'séances manquées'}</Hint>
      </Stat>

      <Stat icon={PieChartIcon} tone='bg-amber-50 text-amber-600' label='Assiduité'>
        <Value>
          {rate ?? '–'}
          {rate !== null && <span className='text-xl text-slate-400'>%</span>}
        </Value>
        {status && rate !== null ? (
          <div className='space-y-1.5'>
            <div className='h-1.5 overflow-hidden rounded-full bg-slate-100' role='img' aria-label={`Taux de présence : ${rate} %`}>
              <div className={cn('h-full rounded-full transition-[width] duration-700', status.bar)} style={{ width: `${rate}%` }} />
            </div>
            <p className={cn('text-xs font-semibold', status.text)}>{status.label}</p>
          </div>
        ) : (
          <Hint>Aucune donnée</Hint>
        )}
      </Stat>
    </div>
  )
}

export default StudentSeanceStats