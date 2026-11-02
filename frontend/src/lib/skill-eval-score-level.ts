export type ScoreLevel = {
  id:       'excellent' | 'great' | 'good' | 'progress' | 'building'
  label:    string
  hint:     string
  segments: 1 | 2 | 3 | 4 | 5   // how many bars of the 5-bar meter are filled
  bar:      string               // meter fill
  text:     string               // adjective colour
  ring:     string               // ScoreRing stroke
}

// Highest first: levelFor returns the first level whose min is reached
const LEVELS: (ScoreLevel & { min: number })[] = [
  { min: 0.9,  id: 'excellent', label: 'Excellent',       segments: 5, bar: 'bg-emerald-500', text: 'text-emerald-700', ring: 'text-emerald-500', hint: 'Un vrai point fort, bravo !' },
  { min: 0.75, id: 'great',     label: 'Très bien',       segments: 4, bar: 'bg-teal-500',    text: 'text-teal-700',    ring: 'text-teal-500',    hint: 'Tu es sur la très bonne voie.' },
  { min: 0.6,  id: 'good',      label: 'Bien',            segments: 3, bar: 'bg-sky-500',     text: 'text-sky-700',     ring: 'text-sky-500',     hint: 'De solides bases, continue ainsi.' },
  { min: 0.4,  id: 'progress',  label: 'En progrès',      segments: 2, bar: 'bg-amber-500',   text: 'text-amber-700',   ring: 'text-amber-500',   hint: 'Ça avance : encore un petit effort.' },
  { min: 0,    id: 'building',  label: 'En construction', segments: 1, bar: 'bg-orange-500',  text: 'text-orange-700',  ring: 'text-orange-500',  hint: 'Un point à travailler ensemble, pas à pas.' },
]

export function levelFor(ratio: number): ScoreLevel {
  const r = Number.isFinite(ratio) ? Math.min(1, Math.max(0, ratio)) : 0
  return LEVELS.find(l => r >= l.min) ?? LEVELS[LEVELS.length - 1]!
}