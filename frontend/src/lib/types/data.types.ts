import type { LucideProps } from 'lucide-react'
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