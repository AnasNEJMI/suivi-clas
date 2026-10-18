// src/components/decor-shapes.tsx
import { cn } from '@/lib/utils'

type ShapeProps = { className?: string }
const base = 'size-full'

export const Sparkle = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 24 24' fill='currentColor' className={cn(base, className)} aria-hidden>
    <path d='M12 0c.6 6.6 4.8 11.4 12 12-7.2.6-11.4 5.4-12 12-.6-6.6-4.8-11.4-12-12 7.2-.6 11.4-5.4 12-12Z' />
  </svg>
)

export const Ring = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 48 48' fill='none' className={cn(base, className)} aria-hidden>
    <circle cx='24' cy='24' r='20' stroke='currentColor' strokeWidth='5' />
  </svg>
)

export const Triangle = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 48 48' className={cn(base, className)} aria-hidden>
    <path d='M24 8 42 39H6Z' fill='currentColor' stroke='currentColor' strokeWidth='6' strokeLinejoin='round' />
  </svg>
)

export const Squiggle = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 120 24' fill='none' className={cn(base, className)} aria-hidden>
    <path d='M3 12Q18-2 33 12T63 12T93 12T117 12' stroke='currentColor' strokeWidth='5' strokeLinecap='round' />
  </svg>
)

export const Plus = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 24 24' fill='none' className={cn(base, className)} aria-hidden>
    <path d='M12 3v18M3 12h18' stroke='currentColor' strokeWidth='5' strokeLinecap='round' />
  </svg>
)

export const Dots = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 40 40' fill='currentColor' className={cn(base, className)} aria-hidden>
    {[6, 20, 34].flatMap(cx => [6, 20, 34].map(cy => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r='2.6' />))}
  </svg>
)

export const HalfCircle = ({ className }: ShapeProps) => (
  <svg viewBox='0 0 48 24' fill='currentColor' className={cn(base, className)} aria-hidden>
    <path d='M2 24a22 22 0 0 1 44 0Z' />
  </svg>
)

const MOTION = {
  'float-a': 'animate-float-a',
  'float-b': 'animate-float-b',
  wiggle:    'animate-wiggle',
  pulse:     'animate-pulse-soft',
  spin:      'animate-spin-slower',
  none:      '',
} as const

type FloatingProps = {
  children:   React.ReactNode
  className?: string              // position, size, color
  depth?:     number              // mouse parallax strength in px (0 = off)
  animation?: keyof typeof MOTION
  offset?:    number              // seconds, desynchronises the shapes
}

// Two layers: the outer one follows the mouse, the inner one runs the looping animation.
// They are separate so the two transforms never overwrite each other.
export function Floating({ children, className, depth = 0, animation = 'float-a', offset = 0 }: FloatingProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute', className)}
      style={depth ? {
        transform:  `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
        transition: 'transform 0.5s ease-out',
      } : undefined}
    >
      <div
        className={cn('size-full motion-reduce:animate-none', MOTION[animation])}
        style={{ animationDelay: `-${offset}s` }}
      >
        {children}
      </div>
    </div>
  )
}