import { UserGender, UserRole } from "../generated/prisma/enums.js";
import { mathQuestions4e } from "./seed.data-4e.js";
import { ClassName, QcmBankQuestionSeed, Subject, userData } from "./seed.types.js";

export const admin = {
    firstName : 'Anas',
    lastName : 'NEJMI',
    username : 'AnasNEJMI',
    gender : UserGender.m,
    password : 'Aa-14081992-@',
    role : UserRole.admin
}

export const orgs = [
    {
        name : "Fleurs Du Lys",
        members : [
        {
            firstName : 'Sanae',
            lastName : 'Fleurs Du Lys',
            username : 'Sanae',
            gender : UserGender.f,
            password : 'CLAS-FdL-Sanae-77',
        },
        {
            firstName : 'Sabrina',
            lastName : 'Fleurs Du Lys',
            username : 'Sabrina',
            gender : UserGender.f,
            password : 'CLAS-FdL-Sabrina-77',
        },
        ]
    },
    {
        name : "Fleurs Du Lys",
        members : [
        {
            firstName : 'Sanae',
            lastName : 'Fleurs Du Lys',
            username : 'Sanae',
            gender : UserGender.f,
            password : 'CLAS-FdL-Sanae-77',
        },
        {
            firstName : 'Sabrina',
            lastName : 'Fleurs Du Lys',
            username : 'Sabrina',
            gender : UserGender.f,
            password : 'CLAS-FdL-Sabrina-77',
        },
        ]
    }
]

export const animators = [
    {
        firstName : 'Anas',
        lastName : 'NEJMI',
        username : 'AnasNEJMI',
        gender : UserGender.m,
        password : "Anas-Anim-CLAS-77"
    },
    {
        firstName : 'Selmah',
        lastName : '',
        username : 'Selmah',
        gender : UserGender.f,
        password : "Selmah-Anim-CLAS-77"
    },
]

export const scolarYears = [
    {
        tag : '2026/2027'
    }
]

export const org = [
    {
        firstName : 'Sanae',
        lastName : 'Fleurs Du Lys',
        username : 'Sanae',
        gender : UserGender.f,
        password : 'FdL-Sanae-2026',
        role : UserRole.org
    },
    {
        firstName : 'Sabrina',
        lastName : 'Fleurs Du Lys',
        username : 'Sabrina',
        gender : UserGender.f,
        password : 'FdL-Sabrina-2026',
        role : UserRole.org
    },
]

export const students : Record<ClassName, userData[]> = {
    '4ème' : [
        {
            firstName : 'Bilal',
            lastName : 'BENHIDA',
            username : 'Bilal',
            gender : UserGender.m,
            password : 'FdL-4eme-Bilal-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Sarah',
            lastName : 'DUPRÉ',
            username : 'Sarah',
            gender : UserGender.f,
            password : 'FdL-4eme-Sarah-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Imrane',
            lastName : 'FERHATI',
            username : 'Imrane',
            gender : UserGender.m,
            password : 'FdL-4eme-Imrane-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Cyrine',
            lastName : 'MCHAR',
            username : 'Cyrine',
            gender : UserGender.f,
            password : 'FdL-4eme-Cyrine-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Nasrinne',
            lastName : 'ZIOUCH',
            username : 'Nasrinne',
            gender : UserGender.f,
            password : 'FdL-4eme-ZIOUCH-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Safya',
            lastName : 'LABIDI',
            username : 'Safya',
            gender : UserGender.f,
            password : 'FdL-4eme-Safya-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Ahmed',
            lastName : 'KERZAZI',
            username : 'Ahmed',
            gender : UserGender.m,
            password : 'FdL-4eme-Ahmed-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Imran',
            lastName : 'ABDELMOUMNI',
            username : 'Imran',
            gender : UserGender.m,
            password : 'FdL-4eme-Imran-2025-2026',
            role : UserRole.student
        },
        {
            firstName : 'Yosor',
            lastName : 'MARZOUK',
            username : 'Yosor',
            gender : UserGender.f,
            password : 'FdL-4eme-Yosor-2025-2026',
            role : UserRole.student
        },
    ]
}



export const MATH_LESSONS_4e = [
    "Nombres relatifs",
    "Fractions et Nombres rationnels",
    "Puissances et notation scientifique",
    "Divisibilité et nombres premiers",
    "Calcul littéral et distributivité",
    "Équations simples",
    "Proportionnalité et pourcentages",
    "Statistiques",
    "Probabilités",
    "Grandeurs et mesures",
    "Thalès",
    "Pythagore",
    "Repérage dans le plan",
    "Surfaces et volumes"
] as const;

export type MathLesson4e = typeof MATH_LESSONS_4e[number]


export const lessons : Record<ClassName, Record<Subject, string[]>> = {
    '4ème' : {
        'math' : [...MATH_LESSONS_4e] ,
        'pc' : [
            "Atmosphère et composition de l'air",
            "Propriétés de l'air et pression",
            "Description moléculaire de la matière",
            "Combustions simples",
            "Atomes, molécules, réactions chimiques",
            "Mesure de la masse volumique",
            "Tension : mesure, unité, appareils",
            "Circuits en série et dérivation",
            "Intensité électrique",
            "Loi d'Ohm et résistance",
            "Calculs avec intensité, tension, résistance",
            "Lumière colorée et couleur des objets",
            "Formation d'images (lentilles et foyers)",
            "Vitesse de la lumière",
            "Propagation du son et sa vitesse"
        ],
        'svt' : [
            "Tectonique des plaques",
            "Séismes : causes et risques",
            "Volcanisme et risques associés",
            "Dynamique des masses d'air et d'eau",
            "Évolution du climat, risques climatiques",
            "Eau : exploitation et gestion",
            "Pétrole et ressources fossiles",
            "Changement climatique et écosystèmes",
            "Impacts des activités humaines",
            "Nutrition des animaux et besoins cellulaires",
            "Transport du sang et élimination des déchets",
            "Nutrition des plantes",
            "Reproduction sexuée et asexuée",
            "Transmission du patrimoine génétique",
            "Diversité génétique des êtres vivants",
            "Parenté et évolution des espèces",
            "Effort physique et santé",
            "Système nerveux et comportement",
            "Alimentation et digestion",
            "Micro-organismes et infections",
            "Puberté, appareils génitaux, contraception"
        ]
    }
} as const;


//I need a way to convert 
export const qcmQuestions : Record<ClassName, Record<Subject, Record<string, QcmBankQuestionSeed[]>>> = {
    '4ème' : {
        'math' : mathQuestions4e,
        'pc' : {

        },
        'svt' : {

        }
    }
}
