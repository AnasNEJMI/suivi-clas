// src/components/section-heading.tsx
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

const TONES = {
  light: { eyebrow: 'text-lime-600',    title: 'text-zinc-900', text: 'text-zinc-500' },
  lime:  { eyebrow: 'text-zinc-900/90', title: 'text-zinc-900', text: 'text-zinc-900/75' },
  dark:  { eyebrow: 'text-lime-300',    title: 'text-white',    text: 'text-zinc-400' },
} as const

export function SectionHeading({ eyebrow, title, description, tone = 'light', className }: {
  eyebrow:      string
  title:        React.ReactNode
  description?: string
  tone?:        keyof typeof TONES
  className?:   string
}) {
  const t = TONES[tone]
  return (
    <Reveal className={cn('flex flex-col items-center text-center', className)}>
      <p className={cn('text-sm font-semibold uppercase tracking-widest', t.eyebrow)}>{eyebrow}</p>
      <h2 className={cn('mt-3 max-w-2xl text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl', t.title)}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 max-w-sm text-balance text-sm leading-relaxed md:max-w-md lg:max-w-lg lg:text-base', t.text)}>
          {description}
        </p>
      )}
    </Reveal>
  )
}