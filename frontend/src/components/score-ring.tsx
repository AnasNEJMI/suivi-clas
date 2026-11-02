import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { levelFor } from '@/lib/skill-eval-score-level'

const SIZES = {
  sm: { box: 'size-16', stroke: 10, text: 'text-sm' },
  md: { box: 'size-24', stroke: 9,  text: 'text-xl' },
  lg: { box: 'size-32', stroke: 8,  text: 'text-3xl' },
} as const

type Props = {
  ratio:      number                 // 0 to 1
  size?:      keyof typeof SIZES
  children?:  ReactNode              // replaces the centre (default: percentage)
  label?:     string                 // accessible name
  className?: string
}

export function ScoreRing({ ratio, size = 'md', children, label, className }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const s     = SIZES[size]
  const r     = Math.min(1, Math.max(0, Number.isFinite(ratio) ? ratio : 0))
  const level = levelFor(r)
  const R     = 50 - s.stroke / 2 - 1
  const C     = 2 * Math.PI * R

  return (
    <div
      role='img'
      aria-label={label ?? `${level.label} : ${Math.round(r * 100)} %`}
      className={cn('relative shrink-0', s.box, className)}
    >
      <svg viewBox='0 0 100 100' className='size-full -rotate-90' aria-hidden>
        <circle cx='50' cy='50' r={R} fill='none' strokeWidth={s.stroke} className='stroke-slate-200' />
        <circle
          cx='50' cy='50' r={R} fill='none' strokeWidth={s.stroke} strokeLinecap='round'
          strokeDasharray={C}
          strokeDashoffset={mounted ? C * (1 - r) : C}
          className={cn('stroke-current transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none', level.ring)}
        />
      </svg>
      <div className='absolute inset-0 grid place-items-center'>
        {children ?? (
          <span className={cn('font-extrabold tracking-tight text-slate-900', s.text)}>
            {Math.round(r * 100)}<span className='text-[0.55em] font-bold text-slate-400'>%</span>
          </span>
        )}
      </div>
    </div>
  )
}