import { cn } from '@/lib/utils';
import {
  GraduationCap, PenLine, Building2, TrendingUp, Users, CalendarDays,
  Star, HelpCircle, FileDown, Flame, ClipboardList, Settings2,
  AlertCircle, CalendarPlus, LayoutDashboard, BarChart3, BarChart2,
  FileText, Eye, CalendarCheck, MessageSquare,
} from 'lucide-react'

import { useState } from "react";

type Feature = { icon: React.ElementType; text: string }

const studentFeatures: Feature[] = [
  { icon: CalendarDays, text: 'Bilans et présences consultables chaque semaine' },
  { icon: Star,         text: 'Évaluation des compétences et de la méthodologie' },
  { icon: HelpCircle,   text: 'QCM adaptatifs après chaque séance, pour approfondir la maîtrise' },
  { icon: FileDown,     text: 'Fiches de révision téléchargeables en PDF pour chaque leçon' },
  { icon: TrendingUp,   text: 'Suivi de progression leçon par leçon et matière par matière' },
  { icon: Flame,        text: 'Indicateurs de régularité pour rester motivé et engagé' },
]

const animatorFeatures: Feature[] = [
  { icon: ClipboardList, text: 'Soumission rapide de bilans personnalisés après chaque séance' },
  { icon: Settings2,     text: 'Évaluation fine des compétences méthodologiques et disciplinaires' },
  { icon: Users,         text: "Vue d'ensemble de la classe : présences, leçons, progressions" },
  { icon: AlertCircle,   text: "Envoi d'observations et commentaires à l'association en direct" },
  { icon: CalendarPlus,  text: 'Gestion des séances et des groupes par année scolaire' },
  { icon: BarChart2,     text: 'Analyse comparative des performances au fil des semaines' },
]

const assocFeatures: Feature[] = [
  { icon: LayoutDashboard, text: 'Tableau de bord global multi-classes et multi-animateurs' },
  { icon: BarChart3,       text: "Statistiques de présence, de participation et d'engagement élève" },
  { icon: FileText,        text: 'Suivi des bilans soumis et séances enregistrées par animateur' },
  { icon: Eye,             text: "Vision complète de l'engagement des élèves sur la plateforme" },
  { icon: CalendarCheck,   text: 'Comparatifs par année scolaire pour mesurer l\'évolution du programme' },
  { icon: MessageSquare,   text: 'Réception des observations de terrain soumises par les animateurs' },
]

type TabId = 'student' | 'animator' | 'assoc'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'student',  label: 'Élèves',       icon: GraduationCap },
  { id: 'animator', label: 'Animateurs',   icon: PenLine },
  { id: 'assoc',    label: 'Associations', icon: Building2 },
]

const panelData: Record<TabId, {features : Feature[], iconsColor : string, bgColor : string, borderColor : string}> = {
  student:  {features : studentFeatures, iconsColor : 'text-emerald-600', bgColor: 'bg-emerald-300/25', borderColor: 'border-emerald-500'},
  animator: {features : animatorFeatures, iconsColor : 'text-amber-600', bgColor: 'bg-amber-300/25', borderColor: 'border-amber-500'},
  assoc:    {features : assocFeatures, iconsColor : 'text-indigo-600', bgColor: 'bg-indigo-300/25', borderColor: 'border-indigo-500'},
}

function FeaturesSection() {
  const [active, setActive] = useState<TabId>('student')
  return (
    <section className='bg-white px-6 py-24 w-full flex flex-col items-center'>
      <p className='text-center text-sm font-medium uppercase tracking-wide text-lime-600'>
        Ce que vous y trouverez
      </p>
      <h2 className='mt-2 text-center font-bold text-3xl text-zinc-900'>
        Un espace conçu avec soin pour chaque acteur
      </h2>
      <p className='mt-2 mx-auto max-w-sm md:max-w-md lg:max-w-lg text-sm lg:text-base text-center text-balance leading-relaxed text-zinc-500'>
        Chaque profil dispose de ses propres outils, pensés pour répondre précisément à ses besoins.
      </p>
      <div className='mt-6 flex flex-wrap justify-center gap-1.5 max-w-7xl' role='tablist'>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role='tab'
            aria-selected={active === id}
            onClick={() => setActive(id)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-2.5 md:px-4 py-2 text-sm md:text-base font-medium transition-all',
              active === id
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            )}
          >
            <Icon className='h-3.5 w-3.5' aria-hidden />
            {label}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl mt-6'>
        {panelData[active].features.map(({ icon: Icon, text }) => (
          <div key={text} className={cn('flex items-start gap-2.5 rounded-lg border bg-white px-4 py-2 font-medium', panelData[active].bgColor, panelData[active].borderColor)}>
            <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', panelData[active].iconsColor)} aria-hidden />
            <p className='text-sm md:text-base leading-[1.45] text-zinc-700 dark:text-zinc-400'>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection;