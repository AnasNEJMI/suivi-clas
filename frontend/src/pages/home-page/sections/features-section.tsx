import { useState, type ComponentType } from 'react'
import {
  BarChart3, BookOpenCheck, CalendarCheck, CalendarPlus, ClipboardCheck, Eye, FileCheck2,
  Flame, Inbox, LayoutDashboard, Lightbulb, Medal, MessagesSquare, NotebookPen, Ruler,
  Users, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChalkboardArt, GradCapArt, SchoolArt } from '@/components/school-art'
import { SectionHeading } from '@/hooks/section-heading'
import { Floating } from '@/hooks/decor-shapes'

type RoleId = 'student' | 'animator' | 'assoc'
type Role = {
  id: RoleId
  tab: string
  short: string
  headline: string
  blurb: string
  Art: ComponentType<{ className?: string }>
  tone: { chip: string; icon: string; panel: string; border: string; art: string }
  features: { icon: LucideIcon; text: string }[]
}

const roles: Role[] = [
  {
    id: 'student', tab: 'Élèves', short: 'Suivre, réviser, progresser',
    headline: 'Pour les élèves',
    blurb: 'Un espace simple pour retrouver ses séances, réviser et voir ses progrès.',
    Art: GradCapArt,
    tone: { chip: 'bg-emerald-100', icon: 'text-emerald-700', panel: 'bg-emerald-50', border: 'border-emerald-400', art: 'text-emerald-600' },
    features: [
      { icon: NotebookPen,   text: 'Bilans et présences consultables chaque semaine' },
      { icon: ClipboardCheck, text: 'Évaluation des compétences et de la méthodologie' },
      { icon: Lightbulb,     text: 'QCM adaptatifs après chaque séance, pour approfondir la maîtrise' },
      { icon: BookOpenCheck, text: 'Fiches de révision téléchargeables en PDF pour chaque leçon' },
      { icon: Medal,         text: 'Suivi de progression leçon par leçon et matière par matière' },
      { icon: Flame,         text: 'Indicateurs de régularité pour rester motivé et engagé' },
    ],
  },
  {
    id: 'animator', tab: 'Animateurs', short: 'Évaluer et accompagner',
    headline: 'Pour les animateurs',
    blurb: "Des outils rapides pour garder une trace claire de chaque élève, séance après séance.",
    Art: ChalkboardArt,
    tone: { chip: 'bg-amber-100', icon: 'text-amber-700', panel: 'bg-amber-50', border: 'border-amber-400', art: 'text-amber-600' },
    features: [
      { icon: NotebookPen,   text: 'Soumission rapide de bilans personnalisés après chaque séance' },
      { icon: Ruler,         text: 'Évaluation fine des compétences méthodologiques et disciplinaires' },
      { icon: Users,         text: "Vue d'ensemble de la classe : présences, leçons, progressions" },
      { icon: MessagesSquare, text: "Envoi d'observations et commentaires à l'association en direct" },
      { icon: CalendarPlus,  text: 'Gestion des séances et des groupes par année scolaire' },
      { icon: BarChart3,     text: 'Analyse comparative des performances au fil des semaines' },
    ],
  },
  {
    id: 'assoc', tab: 'Associations', short: 'Piloter et mesurer',
    headline: 'Pour les associations',
    blurb: "Une vision d'ensemble pour piloter le programme et mesurer son impact.",
    Art: SchoolArt,
    tone: { chip: 'bg-indigo-100', icon: 'text-indigo-700', panel: 'bg-indigo-50', border: 'border-indigo-400', art: 'text-indigo-600' },
    features: [
      { icon: LayoutDashboard, text: 'Tableau de bord global multi-classes et multi-animateurs' },
      { icon: BarChart3,       text: "Statistiques de présence, de participation et d'engagement élève" },
      { icon: FileCheck2,      text: 'Suivi des bilans soumis et séances enregistrées par animateur' },
      { icon: Eye,             text: "Vision complète de l'engagement des élèves sur la plateforme" },
      { icon: CalendarCheck,   text: "Comparatifs par année scolaire pour mesurer l'évolution du programme" },
      { icon: Inbox,           text: 'Réception des observations de terrain soumises par les animateurs' },
    ],
  },
]

function FeaturesSection() {
  const [active, setActive] = useState<RoleId>('student')
  const role = roles.find(r => r.id === active)!

  return (
    <section className='relative z-10 flex w-full flex-col items-center bg-white px-6 py-24'>
      <SectionHeading
        eyebrow='Ce que vous y trouverez'
        title='Un espace conçu avec soin pour chaque acteur'
        description='Chaque profil dispose de ses propres outils, pensés pour répondre précisément à ses besoins.'
      />

      <div className='mt-14 grid w-full max-w-6xl gap-6 lg:grid-cols-[18rem_1fr]'>
        <div role='tablist' aria-orientation='vertical' className='flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0'>
          {roles.map(r => {
            const Art = r.Art
            const on = r.id === active
            return (
              <button
                key={r.id} role='tab' id={`tab-${r.id}`} aria-selected={on} aria-controls='features-panel'
                onClick={() => setActive(r.id)}
                className={cn(
                  'flex min-w-60 items-center gap-4 rounded-2xl border-2 p-3 text-left transition lg:min-w-0',
                  on ? cn('bg-white shadow-lg', r.tone.border) : 'border-transparent bg-zinc-100/70 hover:bg-zinc-100',
                )}
              >
                <span className={cn('grid size-14 shrink-0 place-items-center rounded-xl', r.tone.chip)}>
                  <Art className={cn('size-9', r.tone.art)} />
                </span>
                <span>
                  <span className='block text-base font-bold text-zinc-900'>{r.tab}</span>
                  <span className='block text-sm text-zinc-500'>{r.short}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* key={role.id} remounts the panel, so the staggered entrance replays on every tab change */}
        <div
          key={role.id} id='features-panel' role='tabpanel' aria-labelledby={`tab-${role.id}`}
          className={cn('relative overflow-hidden rounded-3xl border-2 p-6 md:p-9', role.tone.panel, role.tone.border)}
        >
          <Floating className={cn('right-6 top-6 hidden size-28 md:block', role.tone.art)} animation='float-a'>
            <role.Art />
          </Floating>

          <h3 className='text-2xl font-extrabold text-zinc-900 md:text-3xl'>{role.headline}</h3>
          <p className='mt-2 max-w-md text-sm text-zinc-600 md:text-base'>{role.blurb}</p>

          <ul className='relative mt-8 grid gap-3 sm:grid-cols-2'>
            {role.features.map((f, i) => (
              <li
                key={f.text}
                style={{ animationDelay: `${i * 70}ms` }}
                className='flex animate-rise items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 motion-reduce:animate-none'
              >
                <span className={cn('grid size-9 shrink-0 place-items-center rounded-xl', role.tone.chip)}>
                  <f.icon className={cn('size-4', role.tone.icon)} aria-hidden />
                </span>
                <span className='text-sm font-medium leading-snug text-zinc-700 md:text-[15px]'>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection