// src/components/decor-doodles.tsx
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DoodleProps = { className?: string; delay?: number }

function DoodleSvg({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} fill='none' stroke='currentColor' strokeWidth={3.2} strokeLinecap='round' strokeLinejoin='round'
      className={cn('size-full overflow-visible', className)} aria-hidden>
      {children}
    </svg>
  )
}

// pathLength=1 turns any path into a "1-long dash", so one keyframe draws every doodle
function Stroke({ d, delay = 0, duration = 1.1 }: { d: string; delay?: number; duration?: number }) {
  return (
    <path
      d={d} pathLength={1}
      style={{ strokeDasharray: 1, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      className='animate-draw motion-reduce:animate-none'
    />
  )
}

export const StarDoodle = ({ className, delay = 1 }: DoodleProps) => (
  <DoodleSvg viewBox='0 0 64 64' className={className}>
    <Stroke delay={delay} d='M32 6 39 24 58 25 43 37 48 56 32 45 16 56 21 37 6 25 25 24Z' />
  </DoodleSvg>
)

export const LoopDoodle = ({ className, delay = 1.2 }: DoodleProps) => (
  <DoodleSvg viewBox='0 0 80 48' className={className}>
    <Stroke delay={delay} duration={1.6} d='M4 40C20 4 44 4 40 24S20 44 28 28 60 10 76 30' />
  </DoodleSvg>
)

export const ArrowDoodle = ({ className, delay = 1.4 }: DoodleProps) => (
  <DoodleSvg viewBox='0 0 64 56' className={className}>
    <Stroke delay={delay} d='M6 8C30 4 52 20 50 46' />
    <Stroke delay={delay + 0.9} duration={0.5} d='M40 38 50 48 58 36' />
  </DoodleSvg>
)

// A rising curve on axes: the "progress" doodle
export const GrowthDoodle = ({ className, delay = 1.6 }: DoodleProps) => (
  <DoodleSvg viewBox='0 0 80 56' className={className}>
    <Stroke delay={delay} duration={0.7} d='M6 4V50H76' />
    <Stroke delay={delay + 0.5} duration={1.4} d='M10 44C24 44 28 30 40 28S58 14 72 6' />
    <Stroke delay={delay + 1.8} duration={0.5} d='M62 6H72V16' />
  </DoodleSvg>
)