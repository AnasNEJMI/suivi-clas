import type { ReactNode } from 'react'
import { FileQuestionIcon, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const TONES = {
  indigo:  { tile: 'bg-indigo-100 text-indigo-600',   ghost: 'bg-indigo-100/70' },
  sky:     { tile: 'bg-sky-100 text-sky-600',         ghost: 'bg-sky-100/70' },
  emerald: { tile: 'bg-emerald-100 text-emerald-600', ghost: 'bg-emerald-100/70' },
  amber:   { tile: 'bg-amber-100 text-amber-600',     ghost: 'bg-amber-100/70' },
  rose:    { tile: 'bg-rose-100 text-rose-600',       ghost: 'bg-rose-100/70' },
} as const

const DOTS = {
  backgroundImage: 'radial-gradient(rgb(148 163 184 / .4) 1px, transparent 1px)',
  backgroundSize:  '18px 18px',
  maskImage:       'radial-gradient(ellipse at center, #000 30%, transparent 78%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 78%)',
}

interface EmptyStateCardProps {
  title:        string
  description:  string
  icon?:        LucideIcon
  tone?:        keyof typeof TONES
  action?:      ReactNode
  className?:   string
}

export function EmptyStateCard({
  title, description, icon: Icon = FileQuestionIcon, tone = 'indigo', action, className,
}: EmptyStateCardProps) {
  const t = TONES[tone]

  return (
    <div
      role='status'
      className={cn(
        'relative isolate flex min-h-60 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center font-outfit',
        className,
      )}
    >
      <div aria-hidden className='absolute inset-0 -z-10 opacity-50' style={DOTS} />

      <div aria-hidden className='relative mb-5 grid size-20 place-items-center'>
        <span className={cn('absolute size-14 -translate-x-4 translate-y-1 -rotate-12 rounded-2xl', t.ghost)} />
        <span className={cn('absolute size-14 translate-x-4 translate-y-1 rotate-12 rounded-2xl', t.ghost)} />
        <span className={cn('relative grid size-16 place-items-center rounded-2xl shadow-sm ring-4 ring-white', t.tile)}>
          <Icon className='size-8' />
        </span>
      </div>

      <h4 className='text-base font-bold tracking-tight text-slate-900'>{title}</h4>
      <p className='mt-1.5 max-w-sm text-balance text-sm leading-relaxed text-slate-500'>{description}</p>
      {action && <div className='mt-5'>{action}</div>}
    </div>
  )
}