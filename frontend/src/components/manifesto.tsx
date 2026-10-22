import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClipWords } from '@/components/clip-words'
import { usePrefersReducedMotion } from './use-prefers-reduced-motion'

const TEXT = "L'élève progresse quand chaque séance laisse une *trace* et une *référence tangible* pour la suite, quand l'animateur sait *où l'élève est dans sa progression*, et quand l'association voit le *l'évolution et le chemin parcouru*."

function tokenize(text: string) {
  const out: { word: string; hl: boolean }[] = []
  let hl = false
  for (const raw of text.split(' ')) {
    if (raw.startsWith('*')) hl = true
    out.push({ word: raw.replaceAll('*', ''), hl })
    if (raw.slice(1).includes('*')) hl = false
  }
  return out
}

// 0 until the section's top reaches the top of the viewport, then 0 → 1 over the pinned distance
function usePinnedProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const range = el.offsetHeight - window.innerHeight
      if (range <= 0) { setProgress(1); return }
      const value = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range))
      setProgress(prev => (Math.abs(prev - value) < 0.002 ? prev : value))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return [ref, progress] as const
}

export function Manifesto() {
  const reduce = usePrefersReducedMotion()
  const words  = useMemo(() => tokenize(TEXT), [])
  const [ref, progress] = usePinnedProgress<HTMLElement>()

  // Fully lit a little before the pin releases, so the last words can be read
  const revealed = reduce ? 1 : Math.min(1, progress / 0.85)
  const lit      = Math.floor(revealed * (words.length + 1))

  return (
    <section ref={ref} className={cn('relative w-full', !reduce && 'h-[300svh]')}>
      <div className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden px-6',
        reduce ? 'py-28' : 'sticky top-0 h-svh pt-16',
      )}>
        <ClipWords as='p' className='text-sm font-semibold uppercase tracking-widest text-lime-600'>
          UN TRAVAIL D'ÉQUIPE
        </ClipWords>

        <p className='mt-8 max-w-5xl text-balance text-center text-3xl font-extrabold leading-[1.2] tracking-tight md:text-3xl lg:text-6xl'>
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className={cn(
                'transition-colors duration-300',
                i < lit ? 'text-zinc-900' : 'text-zinc-300',
                w.hl && i < lit && '-mx-1.5 rounded-xl bg-lime-300 px-1.5 box-decoration-clone',
              )}>
                {w.word}
              </span>{' '}
            </Fragment>
          ))}
        </p>

        {!reduce && (
          <div
            aria-hidden
            className={cn(
              'absolute bottom-8 flex flex-col items-center gap-1 text-xs font-medium text-zinc-400 transition-opacity duration-500',
              progress > 0.02 ? 'opacity-0' : 'opacity-100',
            )}
          >
            Faites défiler
            <ChevronDown className='size-4 animate-pulse-soft' />
          </div>
        )}
      </div>
    </section>
  )
}