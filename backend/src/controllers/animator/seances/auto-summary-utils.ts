import { prisma } from '../../../db/prisma.js'
import type { AutoSummaryParams } from './auto-summary.types.js'
import {
  buildFocus,
  formatSubject,
  renderParagraph,
  type ParagraphType,
  type TemplateVars,
} from './auto-summary-render.js'

export * from './auto-summary.types.js'

// Each paragraph type is selected by exactly one column of AutoSummaryParagraph.
type Selector = { activity: string } | { engagement: string } | { nextStep: string }

function pickRandom<T>(items: readonly T[], label: string): T {
  if (items.length === 0) {
    throw new Error(
      `Aucun paragraphe actif en base pour « ${label} ». ` +
        `Lancez le seed auto-summary et vérifiez les clés de sélection.`,
    )
  }
  return items[Math.floor(Math.random() * items.length)]!
}

async function getTemplate(type: ParagraphType, selector: Selector, label: string): Promise<string> {
  const rows = await prisma.autoSummaryParagraph.findMany({
    where: { type, isActive: true, ...selector },
    select: { template: true },
    orderBy: { key: 'asc' },
  })
  return pickRandom(rows.map(row => row.template), label)
}

/** Returns exactly 3 paragraphs in reading order: content, engagement, next step. */
export async function generateAutoSummaryParagraphsFromDb(params: AutoSummaryParams): Promise<string[]> {
  const [content, engagement, nextStep] = await Promise.all([
    getTemplate('CONTENT', { activity: params.activity }, `contenu / ${params.activity}`),
    getTemplate('ENGAGEMENT', { engagement: params.engagement }, `implication / ${params.engagement}`),
    getTemplate('NEXT_STEP', { nextStep: params.nextStep }, `prochaine étape / ${params.nextStep}`),
  ])

  const vars: TemplateVars = {
    name: params.firstName,
    lesson: params.lessonLabel,
    subject: formatSubject(params.subjectLabel),
    focus: buildFocus(params.skillLabels),
  }

  console.log('vars ', vars)

  return [content, engagement, nextStep].map(template => renderParagraph(template, vars, params.gender))
}