// src/components/reveal.tsx
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/use-in-view'

export function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode
  delay?: number          // ms
  className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        inView
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className,
      )}
    >
      {children}
    </div>
  )
}