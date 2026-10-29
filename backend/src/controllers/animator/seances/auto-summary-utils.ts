import { prisma } from "../../../db/prisma.js";
import type {
  AutoSummaryParams,
  MethodologySkill,
} from './auto-summary.types.js'

export * from './auto-summary.types.js'

type ParagraphType = 'SESSION' | 'COMPREHENSION' | 'METHODOLOGY' | 'NEXT_STEP'
type Selector = {
  activity: string | null
  engagement: string | null
  comprehension: string | null
  methodologyTrend: string | null
  nextStep: string | null
}

const EMPTY_SELECTOR: Selector = {
  activity: null,
  engagement: null,
  comprehension: null,
  methodologyTrend: null,
  nextStep: null,
}

const SKILL_PHRASES: Record<MethodologySkill, string> = {
  ponctuality: 'la ponctualité',
  preparation: 'la préparation',
  autonomy: "l'autonomie",
  organisation: "l'organisation",
  regularity: 'la régularité',
  discipline: 'la discipline',
  respect: 'le respect',
}

// Concrete advice is selected from the methodology skill, not generated generically.
const SKILL_ADVICE: Record<MethodologySkill, string> = {
  ponctuality: 'préparer ses affaires la veille et vérifier l’heure de départ en gardant une petite marge',
  preparation: 'sortir le matériel utile, relire l’objectif et repérer ce qui sera nécessaire avant de commencer',
  autonomy: 'essayer une première démarche seul pendant quelques minutes avant de demander un indice précis',
  organisation: 'noter les tâches dans l’ordre, puis cocher chaque étape une fois terminée',
  regularity: 'prévoir un créneau court à un moment fixe plutôt que d’attendre d’avoir beaucoup de temps',
  discipline: 'éloigner les distractions et se concentrer sur une seule tâche pendant un temps défini',
  respect: 'écouter jusqu’au bout, attendre son tour de parole et exprimer un désaccord calmement',
}

function pickRandom<T>(items: readonly T[], label: string): T {
  if (items.length === 0) {
    throw new Error(
      `Aucun paragraphe actif en base pour « ${label} ». ` +
      `Lancez le seed summary-paragraphs et vérifiez les clés de sélection.`,
    )
  }
  return items[Math.floor(Math.random() * items.length)]!
}

async function getTemplate(type: ParagraphType, selector: Selector, label: string): Promise<string> {
  const rows = await prisma.autoSummaryParagraph.findMany({
    where: {
      type,
      isActive: true,
      ...selector,
    },
    select: { template: true },
    orderBy: { key: 'asc' },
  })

  return pickRandom(rows.map(row => row.template), label)
}

function fill(template: string, vars: Record<string, string>): string {
  // Use a replacer callback so '$' in a first name or lesson label is literal text.
  return template.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match)
}

function capitalizeSentences(text: string): string {
  return text.replace(/(^|[.!?]\s+)(\p{Ll})/gu, (_match, before: string, letter: string) => before + letter.toLocaleUpperCase('fr-FR'))
}

function renderTemplate(template: string, vars: Record<string, string>): string {
  // Validate the template before interpolation, so literal braces in a lesson label remain safe.
  const missing = [...template.matchAll(/\{(\w+)\}/g)]
    .map(match => match[1]!)
    .filter(key => !(key in vars))
  if (missing.length) {
    throw new Error(`Variables non reconnues dans le paragraphe : ${missing.map(key => `{${key}}`).join(', ')}`)
  }
  return capitalizeSentences(fill(template, vars))
}

export async function generateAutoSummaryParagraphsFromDb(params: AutoSummaryParams): Promise<string[]> {
  const [session, comprehension, methodology, nextStep] = await Promise.all([
    getTemplate('SESSION', {
      ...EMPTY_SELECTOR,
      activity: params.activity,
      engagement: params.engagement,
    }, `séance / ${params.activity} / ${params.engagement}`),
    getTemplate('COMPREHENSION', {
      ...EMPTY_SELECTOR,
      comprehension: params.comprehension,
    }, `compréhension / ${params.comprehension}`),
    getTemplate('METHODOLOGY', {
      ...EMPTY_SELECTOR,
      methodologyTrend: params.methodologyTrend,
    }, `méthodologie / ${params.methodologyTrend}`),
    getTemplate('NEXT_STEP', {
      ...EMPTY_SELECTOR,
      nextStep: params.nextStep,
    }, `prochaine étape / ${params.nextStep}`),
  ])

  const vars = {
    name: params.firstName,
    lesson: params.lessonLabel,
    skill: SKILL_PHRASES[params.methodologySkill],
    skillAdvice: SKILL_ADVICE[params.methodologySkill],
  }

  return [session, comprehension, methodology, nextStep].map(template => renderTemplate(template, vars))
}
