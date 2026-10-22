// src/components/hero-backdrop.tsx
const grid = (alpha: number) =>
  `linear-gradient(rgba(24,24,27,${alpha}) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,${alpha}) 1px, transparent 1px)`

const NOISE = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`

const SPOT = 'radial-gradient(circle 240px at calc((var(--mx, 0) + 0.5) * 100%) calc((var(--my, 0) + 0.5) * 100%), #000 0%, transparent 100%)'
const FADE = 'radial-gradient(ellipse at center, #000 30%, transparent 80%)'

// `soft` = no cursor spotlight (inner pages, loader). The parent needs `relative isolate overflow-hidden`;
// for the spotlight it also needs the ref from useMouseParallax().
export function HeroBackdrop({ soft = false }: { soft?: boolean }) {
  return (
    <div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
      <div
        className='absolute left-1/2 top-1/2 size-[150vmax] -translate-x-1/2 -translate-y-1/2 animate-aurora opacity-60 will-change-transform motion-reduce:animate-none'
        style={{ background: 'conic-gradient(from 0deg, #d9f99d, #86efac 18%, #fde68a 36%, #bef264 50%, #a5f3fc 68%, #c7d2fe 84%, #d9f99d)' }}
      />
      <div className='absolute inset-0' style={{ background: 'radial-gradient(circle at 50% 45%, rgba(217,249,157,.92) 0%, rgba(217,249,157,0) 72%)' }} />

      <div className='absolute -left-32 -top-32 size-120 animate-drift rounded-full bg-lime-200/60 blur-3xl motion-reduce:animate-none' />
      <div className='absolute -bottom-40 -right-24 size-136 animate-drift rounded-full bg-emerald-300/40 blur-3xl motion-reduce:animate-none' style={{ animationDelay: '-9s' }} />

      <div className='absolute inset-0 opacity-60' style={{ backgroundImage: grid(0.07), backgroundSize: '44px 44px', maskImage: FADE, WebkitMaskImage: FADE }} />

      {!soft && (
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: grid(0.3), backgroundSize: '44px 44px',
            maskImage: SPOT, WebkitMaskImage: SPOT,
            opacity: 'var(--mo, 0)', transition: 'opacity .4s',
          }}
        />
      )}

      <div className='absolute inset-0 opacity-[0.07] mix-blend-multiply' style={{ backgroundImage: NOISE }} />
    </div>
  )
}