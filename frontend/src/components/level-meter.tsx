import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ScoreLevel } from '@/lib/skill-eval-score-level';
export function LevelMeter({ level, className }: { level: ScoreLevel; className?: string }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className={cn('flex gap-1', className)} role='img' aria-label={`Niveau : ${level.label}`}>
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} className='h-2 flex-1 overflow-hidden rounded-full bg-slate-100'>
          <span
            style={{ transitionDelay: `${i * 90}ms` }}
            className={cn(
              'block h-full origin-left rounded-full transition-transform duration-500 ease-out motion-reduce:transition-none',
              level.bar, on && i < level.segments ? 'scale-x-100' : 'scale-x-0',
            )}
          />
        </span>
      ))}
    </div>
  )
}