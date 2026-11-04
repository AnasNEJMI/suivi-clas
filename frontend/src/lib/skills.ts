import {
  BackpackIcon, CalendarCheckIcon, ClockIcon, CompassIcon, HeartHandshakeIcon, ListChecksIcon, TargetIcon, type LucideIcon,
} from 'lucide-react'

export type SkillKey = 'autonomy' | 'discipline' | 'organisation' | 'ponctuality' | 'preparation' | 'regularity' | 'respect'

export type SkillInfo = {
  label:   string
  Icon:    LucideIcon
  tile:    string     // icon tile (card)
  band:    string     // dialog header background
  summary: string
  why:     string
  steps:   string[]
  tip:     string
}

export const SKILLS: Record<SkillKey, SkillInfo> = {
  autonomy: {
    label: 'Autonomie', Icon: CompassIcon, tile: 'bg-emerald-100 text-emerald-700', band: 'bg-emerald-50',
    summary: "Chercher par soi-même avant de demander de l'aide.",
    why: "Être autonome, c'est savoir chercher par soi-même avant de demander de l'aide. Au collège, au lycée, puis dans les études, c'est ce qui permet de progresser même quand personne n'est là pour expliquer.",
    steps: [
      "Relis l'énoncé ou la consigne deux fois avant de dire « je ne comprends pas ».",
      "Cherche d'abord dans ton cours ou dans un exemple déjà corrigé.",
      "Essaie, même sans certitude : une tentative vaut mieux qu'une page blanche.",
      "Si tu bloques, explique à ton animateur ce que tu as déjà essayé : il pourra t'aider à trouver la suite.",
    ],
    tip: "Une question précise vaut mieux qu'un « je n'y arrive pas ».",
  },
  discipline: {
    label: 'Discipline', Icon: TargetIcon, tile: 'bg-indigo-100 text-indigo-700', band: 'bg-indigo-50',
    summary: 'Rester concentré et suivre les consignes.',
    why: "La discipline, c'est rester concentré et suivre les consignes, même quand le travail est moins amusant. Elle te fait gagner du temps : un travail fait avec attention est un travail qu'on ne refait pas.",
    steps: [
      'Range ton téléphone hors de ta vue pendant le travail.',
      'Fixe-toi un petit objectif par séance, par exemple finir deux exercices.',
      'Fais une courte pause quand ta concentration baisse, puis reprends.',
      "Coche ce que tu as accompli : voir ses réussites donne envie de continuer.",
    ],
    tip: "Dix minutes de vraie concentration valent mieux qu'une heure distraite.",
  },
  organisation: {
    label: 'Organisation', Icon: ListChecksIcon, tile: 'bg-violet-100 text-violet-700', band: 'bg-violet-50',
    summary: 'Tenir ses cahiers et son travail en ordre.',
    why: "S'organiser, c'est savoir où sont tes cours, quoi faire et quand. Un cahier en ordre et un planning simple t'évitent le stress des oublis de dernière minute.",
    steps: [
      'Garde un cahier ou un classeur par matière, avec des cours datés.',
      "Note tes devoirs dès qu'ils sont donnés, toujours au même endroit.",
      'Prépare ton sac et ton matériel la veille.',
      'Répartis ton travail sur plusieurs jours plutôt que tout au dernier moment.',
    ],
    tip: "Un agenda bien tenu est le meilleur allié de la tranquillité.",
  },
  ponctuality: {
    label: 'Ponctualité', Icon: ClockIcon, tile: 'bg-sky-100 text-sky-700', band: 'bg-sky-50',
    summary: "Arriver à l'heure et respecter le cadre de la séance.",
    why: "Arriver à l'heure, c'est respecter le travail du groupe et ne rien manquer des explications du début, souvent les plus importantes. C'est aussi une habitude très appréciée plus tard, dans la vie d'adulte.",
    steps: [
      "Repère l'heure de début et le temps de trajet, puis prévois quelques minutes d'avance.",
      'Prépare tes affaires avant de partir, pas au dernier moment.',
      "Mets une alarme de rappel un peu avant l'heure du départ.",
      "En cas d'imprévu, préviens ton animateur : il saura que tu as pensé au groupe.",
    ],
    tip: "Cinq minutes d'avance, c'est cinq minutes de calme.",
  },
  preparation: {
    label: 'Préparation', Icon: BackpackIcon, tile: 'bg-amber-100 text-amber-700', band: 'bg-amber-50',
    summary: 'Venir avec son matériel et ses cahiers.',
    why: "Venir préparé, c'est apporter ton matériel, tes cours et tes devoirs. Tu profites alors pleinement de la séance : le temps sert à progresser, pas à chercher ce qui manque.",
    steps: [
      'Vérifie ton matériel : cahiers, trousse, calculatrice si besoin.',
      'Relis rapidement la dernière leçon travaillée avant la séance.',
      "Note les questions ou les exercices qui t'ont posé problème.",
      'Apporte tes devoirs ou contrôles à venir pour les préparer avec ton animateur.',
    ],
    tip: 'Une question notée à l\'avance, c\'est un blocage résolu plus vite.',
  },
  regularity: {
    label: 'Régularité', Icon: CalendarCheckIcon, tile: 'bg-rose-100 text-rose-700', band: 'bg-rose-50',
    summary: 'Venir et travailler de façon suivie, semaine après semaine.',
    why: "La régularité, c'est travailler un peu et souvent. Le cerveau retient bien mieux avec de courtes séances répétées qu'avec une grosse séance isolée : c'est le secret des progrès durables.",
    steps: [
      'Choisis deux ou trois créneaux fixes dans la semaine, même courts.',
      'Relis ta leçon à la maison peu après la séance.',
      'Fais un QCM ou quelques exercices entre deux séances.',
      'Viens à chaque séance : chaque rendez-vous compte dans ta progression.',
    ],
    tip: "Un quart d'heure chaque jour vaut mieux qu'une heure une fois par semaine.",
  },
  respect: {
    label: 'Respect', Icon: HeartHandshakeIcon, tile: 'bg-lime-200 text-lime-800', band: 'bg-lime-50',
    summary: "Respecter l'animateur, les autres élèves et le matériel.",
    why: "Le respect, envers l'animateur, les autres élèves et le matériel, crée une ambiance où chacun ose poser des questions et se tromper sans crainte. C'est la base pour bien travailler ensemble.",
    steps: [
      "Écoute quand quelqu'un parle, que ce soit l'animateur ou un camarade.",
      'Lève la main ou attends ton tour pour t\'exprimer.',
      'Encourage les autres : une remarque bienveillante aide tout le monde à progresser.',
      'Prends soin du matériel et laisse ta place propre en partant.',
    ],
    tip: 'Dans un groupe respectueux, tout le monde apprend mieux.',
  },
}

export const SKILL_MAX_SCORE = 20                              // the scale animators grade on
export const SKILL_KEYS = Object.keys(SKILLS) as SkillKey[]    // display order