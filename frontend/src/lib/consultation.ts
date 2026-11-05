export const MIN_BILANS_FOR_PATTERN = 3   // below this, a percentage means nothing

export type ConsultationPattern = {
  id:          'always' | 'often' | 'half' | 'rarely' | 'early'
  label:       string
  description: string
  badge:       string   // pill
  text:        string
  bar:         string
}

const PATTERNS: Record<ConsultationPattern['id'], ConsultationPattern> = {
  always: { id: 'always', label: 'Lit presque toujours', description: 'Ouvre presque tous les bilans reçus.',
            badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500' },
  often:  { id: 'often',  label: 'Lit souvent',          description: 'Ouvre la plupart des bilans reçus.',
            badge: 'bg-sky-50 text-sky-700 border-sky-200',             text: 'text-sky-700',     bar: 'bg-sky-500' },
  half:   { id: 'half',   label: 'Lit une fois sur deux', description: 'Ouvre environ un bilan sur deux.',
            badge: 'bg-amber-50 text-amber-700 border-amber-200',       text: 'text-amber-700',   bar: 'bg-amber-500' },
  rarely: { id: 'rarely', label: 'Lit rarement',          description: 'Ouvre peu les bilans reçus : un échange avec l’élève peut aider.',
            badge: 'bg-rose-50 text-rose-700 border-rose-200',          text: 'text-rose-700',    bar: 'bg-rose-500' },
  early:  { id: 'early',  label: 'Trop tôt',              description: 'Pas encore assez de bilans pour dégager une tendance.',
            badge: 'bg-slate-100 text-slate-600 border-slate-200',      text: 'text-slate-600',   bar: 'bg-slate-400' },
}

export const readRate = (received: number, read: number): number | null =>
  received > 0 ? Math.round((100 * read) / received) : null

export function consultationPattern(received: number, read: number): ConsultationPattern {
  if (received < MIN_BILANS_FOR_PATTERN) return PATTERNS.early
  const rate = (100 * read) / received
  return rate >= 85 ? PATTERNS.always : rate >= 60 ? PATTERNS.often : rate >= 35 ? PATTERNS.half : PATTERNS.rarely
}

export function formatDelay(hours: number): string {
  if (hours < 1)  return "moins d'une heure"
  if (hours < 24) return `${Math.round(hours)} h`
  const days = Math.round(hours / 24)
  return `${days} jour${days > 1 ? 's' : ''}`
}

export const formatDay = (d: Date | string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

export const formatDayTime = (d: Date | string) =>
  new Date(d).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })