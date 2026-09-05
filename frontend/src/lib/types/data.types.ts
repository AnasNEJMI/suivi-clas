import { AtomIcon, LandmarkIcon, LanguagesIcon, LeafIcon, PiIcon, type LucideProps } from 'lucide-react'
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


export type CardStyle = {label : string, bgColor : string, highlightTextColor : string, borderColor : string, iconBgColor : string, icon : ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>};
export const CARD_STYLES : Record<Subject, CardStyle> = {
    'Anglais' : {
        label : 'Anglais',
        bgColor : 'bg-orange-100/75',
        highlightTextColor : 'text-orange-600',
        borderColor : 'border-orange-600',
        iconBgColor : 'bg-orange-200',
        icon : LanguagesIcon
    },
    'Français' : {
        label : 'Français',
        bgColor : 'bg-violet-100/75',
        highlightTextColor : 'text-violet-600',
        borderColor : 'border-violet-600',
        iconBgColor : 'bg-violet-200',
        icon : LanguagesIcon
    },
    'Histoire-Géographie' : {
        label : 'Histoire/Géo',
        bgColor : 'bg-cyan-100/75',
        highlightTextColor : 'text-cyan-600',
        borderColor : 'border-cyan-600',
        iconBgColor : 'bg-cyan-200',
        icon : LandmarkIcon
    },
    'Mathématiques' : {
        label : 'Maths',
        bgColor : 'bg-blue-100/75',
        highlightTextColor : 'text-blue-500',
        borderColor : 'border-blue-600',
        iconBgColor : 'bg-blue-200',
        icon : PiIcon
    },
    'Physique-Chimie' : {
        label : 'Physique/Chimie',
        bgColor : 'bg-amber-100/75',
        highlightTextColor : 'text-amber-600',
        borderColor : 'border-amber-600',
        iconBgColor : 'bg-orange-200',
        icon : AtomIcon
    },
    'Sciences de la Vie et de la Terre' : {
        label : 'SVT',
        bgColor : 'bg-emerald-100/75',
        highlightTextColor : 'text-emerald-600',
        borderColor : 'border-emerald-600',
        iconBgColor : 'bg-emerald-200',
        icon : LeafIcon
    }
}