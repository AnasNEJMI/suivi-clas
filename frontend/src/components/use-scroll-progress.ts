import { useEffect, useRef, useState } from 'react'

// 0 when the element's top reaches `start` (fraction of viewport height from the top),
// 1 when its bottom reaches `end`.
export function useScrollProgress<T extends HTMLElement>(start = 0.85, end = 0.35) {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const r  = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = r.height + vh * (start - end)
      const value = Math.min(1, Math.max(0, (vh * start - r.top) / total))
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
  }, [start, end])

  return [ref, progress] as const
}