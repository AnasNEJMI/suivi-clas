// backend/src/utils/auto-summary.utils.ts

import { readFileSync } from 'node:fs'
import path             from 'node:path'
import type {
  Activity, EngagementLevel, MethodologySkill, MethodologyTrend, NextStep,
  SummaryParagraphBank,
} from './auto-summary.types.js'

export * from './auto-summary.types.js'

// Lives outside src/ so tsc ignores it. Resolved from the backend root,
// which is the working directory on Render when the root directory is "backend".
const BANK_PATH = path.join(process.cwd(), 'data', 'summary-paragraphs.json')

let cachedBank: SummaryParagraphBank | null = null

function getBank(): SummaryParagraphBank {
  if (!cachedBank) {
    try {
      cachedBank = JSON.parse(readFileSync(BANK_PATH, 'utf-8')) as SummaryParagraphBank
    } catch {
      throw new Error(`Banque de paragraphes introuvable (${BANK_PATH}) — lancez npm run seed:summary-paragraphs`)
    }
  }
  return cachedBank
}

// Definite form so it fits every sentence the generator wrote
const SKILL_PHRASES: Record<MethodologySkill, string> = {
  ponctuality:  'la ponctualité',
  preparation:  'la préparation',
  autonomy:     "l'autonomie",
  organisation: "l'organisation",
  regularity:   'la régularité',
  discipline:   'la discipline',
  respect:      'le respect',
}

function pick(pool: readonly string[], label: string): string {
  if (pool.length === 0) {
    throw new Error(`Aucun paragraphe pour « ${label} » — lancez npm run seed:summary-paragraphs`)
  }
  return pool[Math.floor(Math.random() * pool.length)]!
}

// Replacer function (not a replacement string) so "$" in a name or lesson label stays literal
function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match)
}

// {skill} can land at the start of a sentence ("la ponctualité progresse…")
function capitalizeSentences(text: string): string {
  return text.replace(/(^|[.!?]\s+)(\p{Ll})/gu, (_, before: string, letter: string) => before + letter.toUpperCase())
}

export type AutoSummaryParams = {
  firstName:        string
  lessonLabel:      string
  activity:         Activity
  engagement:       EngagementLevel
  methodologySkill: MethodologySkill
  methodologyTrend: MethodologyTrend
  nextStep:         NextStep
}

export function generateAutoSummaryParagraphs(params: AutoSummaryParams): string[] {
  const bank = getBank()
  const vars = {
    name:   params.firstName,
    lesson: params.lessonLabel,
    skill:  SKILL_PHRASES[params.methodologySkill],
  }

  return [
    pick(bank.session[params.activity]?.[params.engagement], `${params.activity} / ${params.engagement}`),    pick(bank.methodology[params.methodologyTrend],         params.methodologyTrend),
    pick(bank.nextSteps[params.nextStep],                   params.nextStep),
  ].map(template => capitalizeSentences(fill(template, vars)))
}