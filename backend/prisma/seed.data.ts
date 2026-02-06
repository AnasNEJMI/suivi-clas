import { UserGender, UserRole } from "../src/generated/prisma/enums.js";

export const CLASS_NAMES = ['4ème'] as const;
export type ClassName = typeof CLASS_NAMES[number];

///////////////////USERS//////////////////////
type userData = {
    firstName: string,
    lastName: string,
    username: string,
    gender: UserGender,
    password: string,
    role: UserRole;
}

export const admin = {
    firstName : 'Anas',
    lastName : 'NEJMI',
    username : 'AnasNEJMI',
    gender : UserGender.m,
    password : 'Aa-14081992-@',
    role : UserRole.admin
}

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


//////////////////LESSONS/////////////////////////////
export const SUBJECTS = ['math', 'pc', 'svt'] as const;
export type Subject = typeof SUBJECTS[number];


export const lessons : Record<ClassName, Record<Subject, string[]>> = {
    '4ème' : {
        'math' : [
            "Nombres relatifs : addition, soustraction, multiplication, division",
            "Comparaison et encadrement de nombres",
            "Fractions équivalentes",
            "Puissances, notations scientifiques",
            "Racines carrées",
            "Nombres premiers et divisibilité",
            "Langage littéral : distributivité",
            "Égalités et équations simples",
            "Modélisation par équations",
            "Statistiques",
            "Probabilités",
            "Proportionnalité et pourcentages",
            "Dépendance de deux grandeurs",
            "Grandeurs produits et quotients",
            "Repérage dans l'espace (pavé, coordonnées)",
            "Pyramide et cône de révolution",
            "Agrandissements et réductions",
            "Triangles égaux et semblables",
            "Théorème de Thalès",
            "Pythagore et cosinus d'un angle aigu",
            "Parallélogrammes particuliers",
            "Translation et transformations géométriques"
        ],
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
}
