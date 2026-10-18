// src/hooks/use-mouse-parallax.ts
import { useEffect, useRef } from 'react'

// Writes --mx / --my (each from -0.5 to 0.5) on the element.
// Floating shapes read them through CSS, so React never re-renders on mouse move.
export function useMouseParallax() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const canHover = window.matchMedia('(pointer: fine)').matches
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return

    let raf = 0
    const set = (x: number, y: number) => {
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    }
    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5)
      })
    }
    const onLeave = () => set(0, 0)

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}