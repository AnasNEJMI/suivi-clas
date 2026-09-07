import { AtomIcon, BookOpenCheckIcon, CalendarClockIcon, LandmarkIcon, LanguagesIcon, LeafIcon, LightbulbIcon, NotebookPenIcon, PiIcon, RepeatIcon, ShieldCheckIcon, type LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'

export type bilanDataPresent = {
    date: string;
    present: boolean;
    bilan: {
        subject: 'math' | 'pc' | 'svt';
        lesson: string;
        summary: string;
    };
}

export type bilanDataAbsent = {
    date: string;
    present: boolean;
}

export type bilanDataType = bilanDataAbsent | bilanDataPresent


//////////////////////////////////////////////////////////////

export type TodoLinksType = {
    fiche : string,
    qcm : string,
    exercices : string,
}

//////////////////////////////////////////////////////////////
export const CLASS_NAMES = ['4ème', '2nde', '1ère', 'T'] as const;
export type ClassName = typeof CLASS_NAMES[number];

////////////////////////////////////////////////////////////
export const DOC_TYPES = ['fiche', 'qcm', 'exercices'] as const;
export type DocType = typeof DOC_TYPES[number];


//////////////////LAYOUT////////////////////////////////////
export type UserLayoutTab = {
    icon : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    title : string,
    url : string,
}

export type UserPageTheme = {
    tabBorderHovered : string,
    tabBorderSelected : string,
    tabBgHovered : string,
    tabBgSelected : string,
    tabTextHovered : string,
    tabTextSelected : string,
}


///////////////////////
export const SUBJECTS = [
  "Mathématiques",
  "Français",
  "Histoire-Géographie",
  "Sciences de la Vie et de la Terre",
  "Physique-Chimie",
  "Anglais",
] as const;

export type Subject = (typeof SUBJECTS)[number];


export type CardStyle = {
    label : string,
    bgColor : string,
    highlightTextColor : string,
    borderColor : string,
    iconBgColor : string,
    progressBgColor : string,
    progressIndicatorColor : string,
    icon : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>};
export const CARD_STYLES : Record<Subject, CardStyle> = {
    'Anglais' : {
        label : 'Anglais',
        bgColor : 'bg-orange-100/75',
        highlightTextColor : 'text-orange-600',
        borderColor : 'border-orange-600',
        iconBgColor : 'bg-orange-200',
        progressBgColor : 'bg-orange-200',
        progressIndicatorColor : 'bg-orange-600',
        icon : LanguagesIcon
    },
    'Français' : {
        label : 'Français',
        bgColor : 'bg-violet-100/75',
        highlightTextColor : 'text-violet-600',
        borderColor : 'border-violet-600',
        iconBgColor : 'bg-violet-200',
        progressBgColor : 'bg-violet-200',
        progressIndicatorColor : 'bg-violet-600',
        icon : LanguagesIcon
    },
    'Histoire-Géographie' : {
        label : 'Histoire/Géo',
        bgColor : 'bg-cyan-100/75',
        highlightTextColor : 'text-cyan-600',
        borderColor : 'border-cyan-600',
        iconBgColor : 'bg-cyan-200',
        progressBgColor : 'bg-cyan-200',
        progressIndicatorColor : 'bg-cyan-600',
        icon : LandmarkIcon
    },
    'Mathématiques' : {
        label : 'Maths',
        bgColor : 'bg-blue-100/75',
        highlightTextColor : 'text-blue-500',
        borderColor : 'border-blue-600',
        iconBgColor : 'bg-blue-200',
        progressBgColor : 'bg-blue-200',
        progressIndicatorColor : 'bg-blue-600',
        icon : PiIcon
    },
    'Physique-Chimie' : {
        label : 'Physique/Chimie',
        bgColor : 'bg-amber-100/75',
        highlightTextColor : 'text-amber-600',
        borderColor : 'border-amber-600',
        iconBgColor : 'bg-orange-200',
        progressBgColor : 'bg-amber-200',
        progressIndicatorColor : 'bg-amber-600',
        icon : AtomIcon
    },
    'Sciences de la Vie et de la Terre' : {
        label : 'SVT',
        bgColor : 'bg-emerald-100/75',
        highlightTextColor : 'text-emerald-600',
        borderColor : 'border-emerald-600',
        iconBgColor : 'bg-emerald-200',
        progressBgColor : 'bg-emerald-200',
        progressIndicatorColor : 'bg-emerald-600',
        icon : LeafIcon
    }
}


export type SkillCarouselCardStyle = {
    label : string,
    bgColor : string,
    borderColor : string,
    highlightTextColor : string,
    highlightTextColorBg : string,
    icon : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
}


export const SKILL_CAROUSEL_CARD_STYLES : Record<string, SkillCarouselCardStyle> = {
    autonomy : {
        label : 'Autonomie',
        bgColor : 'bg-emerald-100',
        borderColor : 'border-emerald-400',
        highlightTextColor : 'text-emerald-700',
        highlightTextColorBg : 'bg-emerald-700',
        icon : LightbulbIcon
    },
    discipline : {
        label : 'Discipline',
        bgColor : 'bg-sky-100',
        borderColor : 'border-sky-400',
        highlightTextColor : 'text-sky-700',
        highlightTextColorBg : 'bg-sky-700',
        icon : ShieldCheckIcon
    },
    organisation : {
        label : 'Organisation',
        bgColor : 'bg-indigo-100',
        borderColor : 'border-indigo-400',
        highlightTextColor : 'text-indigo-700',
        highlightTextColorBg : 'bg-indigo-700',
        icon : NotebookPenIcon
    },
    ponctuality : {
        label : 'Ponctualité',
        bgColor : 'bg-rose-100',
        borderColor : 'border-rose-400',
        highlightTextColor : 'text-rose-700',
        highlightTextColorBg : 'bg-rose-700',
        icon : CalendarClockIcon
    },
    preparation : {
        label : 'Préparation',
        bgColor : 'bg-amber-100',
        borderColor : 'border-amber-400',
        highlightTextColor : 'text-amber-700',
        highlightTextColorBg : 'bg-amber-700',
        icon : BookOpenCheckIcon
    },
    regularity : {
        label : 'Autonomie',
        bgColor : 'bg-cyan-100',
        borderColor : 'border-cyan-400',
        highlightTextColor : 'text-cyan-700',
        highlightTextColorBg : 'bg-cyan-700',
        icon : RepeatIcon
    },

}
