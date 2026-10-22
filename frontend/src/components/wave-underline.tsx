// src/components/wave-underline.tsx
import { cn } from '@/lib/utils'

const W = 22   // tile width: must match the `wave` keyframe in index.css
const H = 14

const tile = (color: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>` +
    `<path d='M-11 7Q-5.5 15 0 7Q5.5 -1 11 7T22 7T33 7' fill='none' stroke='${color}' stroke-width='3' stroke-linecap='round'/></svg>`,
  )}")`

export function WaveUnderline({ color = '#ffffff', className }: { color?: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('pointer-events-none absolute inset-x-0 -bottom-3 block animate-wave motion-reduce:animate-none', className)}
      style={{
        height: H,
        backgroundImage:  tile(color),
        backgroundRepeat: 'repeat-x',
        backgroundSize:   `${W}px ${H}px`,
      }}
    />
  )
}