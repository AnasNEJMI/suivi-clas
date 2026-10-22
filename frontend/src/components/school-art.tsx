// src/components/school-art.tsx
import { cn } from '@/lib/utils'

type ArtProps = { className?: string }

function Art({ className, children }: ArtProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox='0 0 48 48' fill='none' stroke='currentColor' strokeWidth={2.4}
      strokeLinecap='round' strokeLinejoin='round'
      className={cn('size-full', className)} aria-hidden
    >
      {children}
    </svg>
  )
}

const soft  = { fill: 'currentColor', fillOpacity: 0.16 } as const
const mid   = { fill: 'currentColor', fillOpacity: 0.32 } as const
const solid = { fill: 'currentColor', stroke: 'none' } as const

export const GradCapArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M12 23v8c0 3.5 5.5 6.5 12 6.5s12-3 12-6.5v-8' {...soft} />
    <path d='M24 9 44 19 24 29 4 19Z' {...mid} />
    <path d='M40 21v11' />
    <path d='M38.2 32h3.6l1.2 6h-6Z' {...solid} />
  </Art>
)

export const OpenBookArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M24 14C19 11 12 10.5 5 12v25c7-1.5 14-1 19 2Z' {...soft} />
    <path d='M24 14c5-3 12-3.5 19-2v25c-7-1.5-14-1-19 2Z' {...soft} />
    <path d='M24 14v25' />
    <path d='M10 18.5c3-.6 6-.3 9 .9M10 24c3-.6 6-.3 9 .9M10 29.5c3-.6 6-.3 9 .9' />
    <path d='M29 19.4c3-1.2 6-1.5 9-.9M29 24.9c3-1.2 6-1.5 9-.9M29 30.4c3-1.2 6-1.5 9-.9' />
    <path d='m24 2.5 1.3 3.4 3.4 1.3-3.4 1.3L24 11.9l-1.3-3.4-3.4-1.3 3.4-1.3Z' {...solid} />
  </Art>
)

export const PencilArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <g transform='rotate(45 24 24)'>
      <path d='M19 11h10v22l-5 10-5-10Z' {...soft} />
      <path d='M19 11V7.5A3.5 3.5 0 0 1 22.5 4h3A3.5 3.5 0 0 1 29 7.5V11' {...mid} />
      <path d='M19 15h10M24 15v18M19 33h10' />
      <path d='M22.2 38.2 24 43l1.8-4.8Z' {...solid} />
    </g>
  </Art>
)

export const NotebookArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <rect x='10' y='6' width='28' height='36' rx='3.5' {...soft} />
    <path d='M6.5 13h7M6.5 20h7M6.5 27h7M6.5 34h7' strokeWidth={3} />
    <path d='M19 15h13M19 21h13M19 27h8' />
    <path d='m24 35 3 3 7-7' />
  </Art>
)

export const BackpackArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M20 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
    <path d='M13 18c0-6 4.5-10 11-10s11 4 11 10v20a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4Z' {...soft} />
    <path d='M13 24H9.5v11H13M35 24h3.5v11H35' {...mid} />
    <path d='M14 20.5c6 3 14 3 20 0' />
    <path d='M17 30h14v8a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2Z' {...mid} />
    <path d='M22 34.5h4' />
  </Art>
)

export const RulerArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <g transform='rotate(-35 24 24)'>
      <rect x='3' y='15' width='42' height='18' rx='2.5' {...soft} />
      <path d='M10 15v8M17 15v5M24 15v8M31 15v5M38 15v8' />
    </g>
  </Art>
)

export const LightbulbArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M24 5C16.5 5 11 10.8 11 18c0 4.4 2.2 7.2 4.2 9.6 1.4 1.7 1.8 2.9 1.8 5.4h14c0-2.5.4-3.7 1.8-5.4C34.8 25.2 37 22.4 37 18c0-7.2-5.5-13-13-13Z' {...soft} />
    <path d='M17 33h14v4.5a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2ZM20.5 43h7' />
    <path d='m20 18 4 5 4-5M24 23v10' />
    <path d='M5 10l2.5 2M43 10l-2.5 2M2.5 21H6M42 21h3.5' />
  </Art>
)

export const TrophyArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M15 6h18v12c0 6-4 10-9 10s-9-4-9-10Z' {...soft} />
    <path d='M15 10H9v3c0 4.2 3 6.2 6.5 6.7M33 10h6v3c0 4.2-3 6.2-6.5 6.7' />
    <path d='M24 28v7' />
    <path d='M16 42v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3Z' {...mid} />
    <path d='m24 10.5 1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6Z' {...solid} />
  </Art>
)

export const ClipboardArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <rect x='9' y='8' width='30' height='36' rx='3.5' {...soft} />
    <rect x='17' y='4' width='14' height='8' rx='2.5' {...mid} />
    <path d='m14 21 2 2 3.5-4M14 29l2 2 3.5-4M24 21h10M24 29h10M24 37h7' />
    <rect x='14' y='34' width='5.5' height='5.5' rx='1.2' />
  </Art>
)

export const ChalkboardArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <rect x='4' y='6' width='40' height='27' rx='3' {...soft} />
    <path d='M10 14h11M10 20h7' />
    <path d='M27 13v13h11' />
    <path d='M28 24c3-1 4-8 9-9' />
    <path d='M6 37h36' />
    <path d='M13 34.5h5' strokeWidth={3.4} />
    <path d='m12 37-4 7M36 37l4 7' />
  </Art>
)

export const SchoolArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M8 22h32v20H8Z' {...soft} />
    <path d='M5 22 24 10l19 12Z' {...mid} />
    <circle cx='24' cy='17' r='3' />
    <path d='M24 15.5V17h1.6' />
    <path d='M24 10V3.5' />
    <path d='M24 3.5h7l-2 2.5 2 2.5h-7Z' {...solid} />
    <rect x='11' y='27' width='5' height='6' rx='1' />
    <rect x='32' y='27' width='5' height='6' rx='1' />
    <path d='M20 42v-8a4 4 0 0 1 8 0v8' />
    <path d='M3 42h42' />
  </Art>
)

export const CalculatorArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <rect x='9' y='4' width='30' height='40' rx='4.5' {...soft} />
    <rect x='14' y='9' width='20' height='9' rx='2' {...mid} />
    {[16, 24, 32].flatMap(cx =>
      [25, 32, 39].map(cy => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r='2' {...solid} />),
    )}
  </Art>
)

export const FlaskArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M20 5v12L9 38c-1 3 1 5 4 5h22c3 0 5-2 4-5L28 17V5' {...soft} />
    <path d='M18 5h12' />
    <path d='M14 31c4-2.5 8 2 12 0 3-1.5 5.5-1 7.5.5l4.3 7.1c.8 2-.8 3.4-2.8 3.4H13c-2 0-3.6-1.4-2.8-3.4Z' {...mid} />
    <circle cx='21' cy='36' r='1.4' />
    <circle cx='27' cy='38' r='1' />
  </Art>
)

export const SproutArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M15 34h18l-2 9H17Z' {...mid} />
    <path d='M24 34V19' />
    <path d='M24 27C16 27 12 22 12 15c7 0 12 4 12 12Z' {...soft} />
    <path d='M24 22c0-8 5-13 13-13 0 8-5 13-13 13Z' {...soft} />
  </Art>
)

export const GlobeArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <circle cx='24' cy='24' r='18' {...soft} />
    <path d='M24 6c-8 6-8 30 0 36 8-6 8-30 0-36ZM6 24h36M9 14c8 3 22 3 30 0M9 34c8-3 22-3 30 0' />
  </Art>
)

export const SpeechArt = ({ className }: ArtProps) => (
  <Art className={className}>
    <path d='M8 7h32a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H25l-9 9v-9H8a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3Z' {...soft} />
    <text x='24' y='25' textAnchor='middle' fontSize='14' fontWeight='800' fill='currentColor' stroke='none'>Aa</text>
  </Art>
)