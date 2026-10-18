import { useEffect, useRef, useState } from 'react'

type Options = { threshold?: number; rootMargin?: string; once?: boolean }

export function useInView<T extends Element>({
  threshold = 0.2,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null)
  
  // 1. Initialise directement le state selon la présence de l'IntersectionObserver (pas de setState dans l'effet)
  const [inView, setInView] = useState(() => 
    typeof IntersectionObserver === 'undefined'
  )
    
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView] as const
}