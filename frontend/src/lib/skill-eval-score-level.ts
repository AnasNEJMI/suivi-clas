// src/lib/score-level.ts
export type ScoreLevel = {
  id:       'excellent' | 'great' | 'good' | 'progress' | 'building'
  label:    string
  hint:     string
  segments: 1 | 2 | 3 | 4 | 5
  bar:      string   // meter fill
  text:     string   // adjective colour
  ring:     string   // ring segment colour (stroke-current)
  soft:     string   // soft background + border
}

const LEVELS: (ScoreLevel & { min: number })[] = [
  { min: 0.9,  id: 'excellent', label: 'Excellent',       segments: 5, bar: 'bg-emerald-500', text: 'text-emerald-700', ring: 'text-emerald-500', soft: 'bg-emerald-50 border-emerald-200', hint: 'Un vrai point fort, bravo !' },
  { min: 0.75, id: 'great',     label: 'Très bien',       segments: 4, bar: 'bg-teal-500',    text: 'text-teal-700',    ring: 'text-teal-500',    soft: 'bg-teal-50 border-teal-200',       hint: 'Tu es sur la très bonne voie.' },
  { min: 0.6,  id: 'good',      label: 'Bien',            segments: 3, bar: 'bg-sky-500',     text: 'text-sky-700',     ring: 'text-sky-500',     soft: 'bg-sky-50 border-sky-200',         hint: 'De solides bases, continue ainsi.' },
  { min: 0.4,  id: 'progress',  label: 'En progrès',      segments: 2, bar: 'bg-amber-500',   text: 'text-amber-700',   ring: 'text-amber-500',   soft: 'bg-amber-50 border-amber-200',     hint: 'Ça avance : encore un petit effort.' },
  { min: 0,    id: 'building',  label: 'En construction', segments: 1, bar: 'bg-orange-500',  text: 'text-orange-700',  ring: 'text-orange-500',  soft: 'bg-orange-50 border-orange-200',   hint: 'Un point à travailler ensemble, pas à pas.' },
]

export function levelFor(ratio: number): ScoreLevel {
  const r = Number.isFinite(ratio) ? Math.min(1, Math.max(0, ratio)) : 0
  return LEVELS.find(l => r >= l.min) ?? LEVELS[LEVELS.length - 1]!
}