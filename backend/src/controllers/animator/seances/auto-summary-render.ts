import type { SummaryGender } from './auto-summary.types.js'

// Pure functions only (no Prisma): easy to unit-test and reused by the seed validation.

export const TEMPLATE_VARIABLES = ['name', 'lesson', 'subject', 'focus'] as const
export type TemplateVariable = (typeof TEMPLATE_VARIABLES)[number]
export type TemplateVars = Record<TemplateVariable, string>

export type ParagraphType = 'CONTENT' | 'ENGAGEMENT' | 'NEXT_STEP'

const GENDER_RE = /\[([^\]|]*)\|([^\]|]*)\]/g
const VAR_RE = /\{(\w+)\}/g

// --- Focus sentence (first paragraph) --------------------------------------------------------

const MAX_LISTED_SKILLS = 4

const NO_SKILLS_FOCUS = [
  "en abordant l'ensemble des notions essentielles de la leçon",
  "en reprenant l'ensemble des notions essentielles",
  "en passant en revue l'ensemble des notions essentielles",
] as const

/** "Additionner des fractions." -> "additionner des fractions", but "ADN ..." stays untouched. */
function toInfinitivePhrase(label: string): string {
  const clean = label.trim().replace(/[\s.;:,]+$/u, '')
  const first = clean.charAt(0)
  const second = clean.charAt(1)
  const isAcronym = second !== '' && second === second.toUpperCase() && second !== second.toLowerCase()
  return isAcronym ? clean : first.toLowerCase() + clean.slice(1)
}

function joinFrench(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`
}

/**
 * Value of {focus}. Goes at the end of the first clause of a CONTENT template ("... en {subject}, {focus}.").
 * - skills selected: "notamment comment A, comment B et comment C"
 * - none selected:   "en abordant l'ensemble des notions essentielles de la leçon"
 */
export function buildFocus(skillLabels: string[], rng: () => number = Math.random): string {
  const labels = skillLabels.map(toInfinitivePhrase).filter(Boolean)
  if (labels.length === 0) {
    return NO_SKILLS_FOCUS[Math.floor(rng() * NO_SKILLS_FOCUS.length)]!
  }
  const listed = labels.slice(0, MAX_LISTED_SKILLS).map(label => `comment ${label}`)
  const rest = labels.length - listed.length
  const tail = rest > 0 ? `, ainsi que ${rest} autre${rest > 1 ? 's' : ''} point${rest > 1 ? 's' : ''} de la leçon` : ''
  return `notamment ${joinFrench(listed)}${tail}`
}

// --- Text helpers ----------------------------------------------------------------------------

/** "Mathématiques" -> "mathématiques", "SVT" stays "SVT". */
export function formatSubject(subject: string): string {
  const s = subject.trim()
  return s === s.toUpperCase() ? s : s.charAt(0).toLowerCase() + s.slice(1)
}

/** "[masculine|feminine]" -> the right side for the student's gender. */
export function applyGender(text: string, gender: SummaryGender): string {
  return text.replace(GENDER_RE, (_m, masculine: string, feminine: string) => (gender === 'f' ? feminine : masculine))
}

function capitalizeSentences(text: string): string {
  return text.replace(
    /(^|[.!?]\s+)(\p{Ll})/gu,
    (_m, before: string, letter: string) => before + letter.toLocaleUpperCase('fr-FR'),
  )
}

/** French typography: non-breaking spaces around « » and before : ; ! ?, curly apostrophes. */
function frenchTypography(text: string): string {
  return text
    .replace(/« /g, '«\u00a0')
    .replace(/ ([»:;!?])/g, '\u00a0$1')
    .replace(/'/g, '\u2019')
}

// --- Rendering -------------------------------------------------------------------------------

export function renderParagraph(template: string, vars: TemplateVars, gender: SummaryGender): string {
  const unknown = [...template.matchAll(VAR_RE)].map(m => m[1]!).filter(key => !(key in vars))
  if (unknown.length) {
    throw new Error(`Variables non reconnues dans le paragraphe : ${unknown.map(k => `{${k}}`).join(', ')}`)
  }
  // 1) gender on the template only (so brackets in a lesson label stay literal),
  // 2) single-pass variable fill (a '$' or '{x}' inside a label is never re-interpreted).
  const filled = applyGender(template, gender).replace(VAR_RE, (_m, key: string) => vars[key as TemplateVariable])
  
  console.log('paragraph : ',frenchTypography(capitalizeSentences(filled)))
  return frenchTypography(capitalizeSentences(filled))
}

// --- Template validation (used by the seed) ----------------------------------------------------

const REQUIRED_VARIABLES: Partial<Record<ParagraphType, TemplateVariable[]>> = {
  CONTENT: ['focus'], // otherwise the selected curriculum skills would be silently ignored
}

/** Returns a list of problems (empty = valid). */
export function validateTemplate(type: ParagraphType, template: string): string[] {
  const problems: string[] = []

  const used = [...template.matchAll(VAR_RE)].map(m => m[1]!)
  const unknown = used.filter(key => !(TEMPLATE_VARIABLES as readonly string[]).includes(key))
  if (unknown.length) problems.push(`variables inconnues : ${unknown.join(', ')}`)

  for (const required of REQUIRED_VARIABLES[type] ?? []) {
    if (!used.includes(required)) problems.push(`{${required}} manquant`)
  }

  if (/[\[\]]/.test(template.replace(GENDER_RE, ''))) problems.push('crochets de genre mal formés')
  if (/[{}]/.test(template.replace(VAR_RE, ''))) problems.push('accolades mal formées')

  return problems
}