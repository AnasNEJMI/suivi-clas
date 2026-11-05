// student-consultation-drawer.tsx
import { useState, type ReactNode } from 'react'
import { ArrowLeftIcon, CheckIcon, EyeIcon, EyeOffIcon, InboxIcon, MinusIcon, MousePointerClickIcon, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn, getElapsedDays } from '@/lib/utils'
import { consultationPattern, formatDay, formatDayTime, formatDelay, readRate } from '@/lib/consultation'
import type { StudentConsultation } from './consultation-card'

function Tile({ icon: Icon, value, label, tone }: { icon: LucideIcon; value: number; label: string; tone: string }) {
  return (
    <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3'>
      <span className={cn('grid size-9 shrink-0 place-items-center rounded-xl', tone)}><Icon className='size-4' aria-hidden /></span>
      <div className='leading-tight'>
        <p className='text-xl font-extrabold tabular-nums text-slate-900'>{value}</p>
        <p className='text-xs font-medium text-slate-500'>{label}</p>
      </div>
    </div>
  )
}

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className='flex items-center justify-between gap-4 py-2.5 text-sm'>
    <span className='text-slate-500'>{label}</span>
    <span className='text-right font-bold text-slate-800'>{children}</span>
  </div>
)

type Props = { student: StudentConsultation; classLabel: string; children: ReactNode }

const StudentConsultationDrawer = ({ student, classLabel, children }: Props) => {
  const isMobile = useIsMobile()
  const [unreadOnly, setUnreadOnly] = useState(false)

  const pattern  = consultationPattern(student.bilansReceived, student.bilansRead)
  const rate     = readRate(student.bilansReceived, student.bilansRead) ?? 0
  const unread   = student.bilansReceived - student.bilansRead
  const recent   = student.bilans.slice(0, 8).reverse()   // oldest → newest
  const listed   = unreadOnly ? student.bilans.filter(b => b.firstViewedAt === null) : student.bilans

  return (
    <Drawer direction={isMobile ? 'left' : 'right'}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className='ml-auto max-w-xl border-l border-slate-200 bg-slate-50 font-outfit'>
        <DrawerHeader className='flex flex-col gap-1 border-b border-slate-200 bg-white px-6 py-4'>
          <DrawerClose asChild>
            <Button variant='ghost' size='sm' className='-ml-2 w-fit gap-1.5 text-slate-500 hover:text-slate-900'>
              <ArrowLeftIcon className='size-4' /> Fermer
            </Button>
          </DrawerClose>
          <DrawerTitle className='mt-1 text-xl font-bold text-slate-900'>
            <span className='capitalize'>{student.firstName}</span> <span className='uppercase'>{student.lastName}</span>
          </DrawerTitle>
          <DrawerDescription className='text-xs text-slate-500'>{classLabel} · Consultation des bilans</DrawerDescription>
        </DrawerHeader>

        <div className='brand-v-scrollbar flex flex-col gap-6 overflow-y-auto p-6'>
          {/* Pattern */}
          <section className='rounded-2xl border border-slate-200 bg-white p-5'>
            <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold', pattern.badge)}>{pattern.label}</span>
            <p className='mt-3 text-sm text-slate-600'>{pattern.description}</p>
            <div className='mt-4 flex items-baseline justify-between'>
              <span className='text-xs font-semibold text-slate-500'>Taux de lecture</span>
              <span className={cn('text-2xl font-extrabold tabular-nums', pattern.text)}>{rate}<span className='text-sm'> %</span></span>
            </div>
            <div className='mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100'>
              <div className={cn('h-full rounded-full transition-[width] duration-700', pattern.bar)} style={{ width: `${rate}%` }} />
            </div>
          </section>

          {/* Counters */}
          <div className='grid grid-cols-2 gap-3'>
            <Tile icon={InboxIcon}              value={student.bilansReceived} label='Bilans reçus'     tone='bg-indigo-50 text-indigo-600' />
            <Tile icon={EyeIcon}                value={student.bilansRead}     label='Bilans lus'       tone='bg-emerald-50 text-emerald-600' />
            <Tile icon={EyeOffIcon}             value={unread}                 label='Jamais ouverts'   tone={unread > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'} />
            <Tile icon={MousePointerClickIcon}  value={student.totalReadings}  label='Ouvertures'       tone='bg-sky-50 text-sky-600' />
          </div>

          {/* Habits */}
          <section className='rounded-2xl border border-slate-200 bg-white px-5 py-2'>
            <h3 className='pt-3 text-sm font-bold text-slate-900'>Habitudes</h3>
            <div className='divide-y divide-slate-100'>
              <Row label='Délai habituel d’ouverture'>{student.medianDelayHours === null ? '–' : formatDelay(student.medianDelayHours)}</Row>
              <Row label='Première consultation'>{student.firstVisit ? formatDay(student.firstVisit) : 'Jamais'}</Row>
              <Row label='Dernière consultation'>
                {student.lastVisit ? <>{formatDayTime(student.lastVisit)} <span className='font-medium text-slate-400'>({getElapsedDays(student.lastVisit)})</span></> : 'Jamais'}
              </Row>
              <Row label='Dernier bilan reçu'>
                {student.latestBilanDate ? formatDay(student.latestBilanDate) : '–'}
                {student.latestBilanRead !== null && (
                  <span className={cn('ml-2 text-xs font-bold', student.latestBilanRead ? 'text-emerald-700' : 'text-amber-700')}>
                    {student.latestBilanRead ? 'Lu' : 'Pas encore lu'}
                  </span>
                )}
              </Row>
            </div>
          </section>

          {/* Recent trend */}
          <section>
            <h3 className='text-sm font-bold text-slate-900'>Liste des bilans</h3>
            <p className='mt-0.5 text-xs text-slate-500'>Du plus ancien au plus récent.</p>
            <ol className='mt-3 flex gap-2 overflow-x-auto pb-1'>
              {recent.map(b => {
                const read = b.firstViewedAt !== null
                return (
                  <li key={b.id} className='flex shrink-0 flex-col items-center gap-1' title={`${b.lessonLabel ?? 'Séance'} · ${read ? 'lu' : 'pas encore lu'}`}>
                    <span className={cn('grid size-9 place-items-center rounded-xl', read ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                      {read ? <CheckIcon className='size-4' aria-hidden /> : <MinusIcon className='size-4' aria-hidden />}
                    </span>
                    <span className='text-[10px] font-medium text-slate-500'>
                      {new Date(b.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </span>
                  </li>
                )
              })}
            </ol>
          </section>

          {/* Full list */}
          <section>
            <div className='flex items-center justify-between gap-3'>
              <h3 className='text-sm font-bold text-slate-900'>Détail des bilans</h3>
              <div className='flex rounded-full bg-slate-200/70 p-0.5 text-xs font-semibold'>
                {([[false, 'Tous'], [true, 'Non lus']] as const).map(([value, label]) => (
                  <button
                    key={label} type='button' aria-pressed={unreadOnly === value} onClick={() => setUnreadOnly(value)}
                    className={cn('rounded-full px-3 py-1 transition', unreadOnly === value ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {listed.length === 0 ? (
              <p className='mt-3 rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-center text-sm text-slate-500'>Tous les bilans ont été ouverts.</p>
            ) : (
              <ul className='mt-3 flex flex-col gap-2'>
                {listed.map(b => {
                  const read = b.firstViewedAt !== null
                  return (
                    <li key={b.id} className='flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3'>
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-bold text-slate-900'>{b.lessonLabel ?? 'Séance'}</p>
                        <p className='text-xs text-slate-500'>{b.subjectLabel ? `${b.subjectLabel} · ` : ''}{formatDay(b.date)}</p>
                      </div>
                      <div className='shrink-0 text-right'>
                        <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold', read ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700')}>
                          {read ? 'Lu' : 'Pas encore lu'}
                        </span>
                        {read && (
                          <p className='mt-1 text-[11px] text-slate-500'>
                            {b.viewCount} ouverture{b.viewCount > 1 ? 's' : ''}
                            {b.delayHours !== null && ` · après ${formatDelay(b.delayHours)}`}
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          <p className='text-xs leading-relaxed text-slate-400'>
            Une ouverture correspond au moment où l'élève ouvre le détail d'une séance. Plusieurs ouvertures rapprochées (moins de 30 minutes) comptent pour une seule.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default StudentConsultationDrawer