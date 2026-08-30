import { useEffect, useRef } from "react";

function StatsCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        const dur = 1600
        const start = Date.now()
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          if (el) el.textContent = Math.round(eased * target) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.unobserve(el)
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix])

  return (
    <div className='rounded-xl border border-lime-100 bg-zinc-900/90 py-8 px-6 text-center flex-1'>
      <span ref={ref} className='block text-[30px] font-medium text-white'>0</span>
      <span className='mt-1 block text-[11px] text-zinc-300'>{label}</span>
    </div>
  )
}

export default StatsCard;