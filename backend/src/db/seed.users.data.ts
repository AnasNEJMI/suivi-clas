// ─────────────────────────────────────────────
// ANNÉE SCOLAIRE

import { scolarYears } from "./seed.data.js";

// ─────────────────────────────────────────────
export const SCOLAR_YEARS = [
  {label : "2025-2026"},
  {label : "2026-2027"},
] as const;

export type ScolarYear = (typeof SCOLAR_YEARS)[number]["label"];

// ─────────────────────────────────────────────
// NIVEAUX SCOLAIRES
// ─────────────────────────────────────────────
export const LEVELS = [
  { label: "CP",      order: 1 },
  { label: "CE1",      order: 2 },
  { label: "CE2",      order: 3 },
  { label: "CM1",      order: 4 },
  { label: "CM2",      order: 5 },
  { label: "6ème",      order: 6 },
  { label: "5ème",      order: 7 },
  { label: "4ème",      order: 8 },
  { label: "3ème",      order: 9 },
  { label: "2nde",      order: 10 },
  { label: "1ère",      order: 11 },
  { label: "Terminale", order: 12 },
] as const;

export type Level = (typeof LEVELS)[number]["label"];

// ─────────────────────────────────────────────
// MATIÈRES
// ─────────────────────────────────────────────
export const SUBJECTS = [
  "Mathématiques",
  "Français",
  "Histoire-Géographie",
  "Sciences de la Vie et de la Terre",
  "Physique-Chimie",
  "Anglais",
] as const;

export type Subject = (typeof SUBJECTS)[number];

// ─────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────
export interface StudentSeed {
  username:   string;
  firstName:  string;
  lastName:   string;
  password:   string;
  gender:     "m" | "f";
  level: Level; // niveau scolaire de l'élève, indépendant de sa classe dans l'asso
}

export interface ClassSeed {
  label:    string;
  students: StudentSeed[];
}

export interface AssocMemberSeed {
  username:  string;
  firstName: string;
  lastName:  string;
  password:  string;
  gender:    "m" | "f";
}

export interface AssociationSeed {
  name:    string;
  classes: ClassSeed[];
  members: AssocMemberSeed[];
}

export interface AnimatorSeed {
  username:         string;
  firstName:        string;
  lastName:         string;
  password:         string;
  gender:           "m" | "f";
  contracts : {associationLabel : string, classLabel : string, scolarYearLabel : ScolarYear}[],
}

export interface LessonSeed {
  level : Level,
  subjects : {subject : Subject, lessons : string[]}[]
}

// ─────────────────────────────────────────────
// ASSOCIATIONS, CLASSES & ÉLÈVES
// Note : une classe peut mélanger des niveaux différents.
// Le niveau est une propriété de l'élève, pas de la classe.
// ─────────────────────────────────────────────

export const ASSOCIATIONS_SEED : AssociationSeed[] = [
    {
        name : "Fleurs Du Lys",
        members : [
            {username : "Sanae-FdL", firstName : "Sanae", lastName : "", password : "Sanae-Suivi-FdL-CLAS-77", gender : "f"},
            {username : "Sabrina-FdL", firstName : "Sabrina", lastName : "", password : "Sabrina-Suivi-FdL-CLAS-77", gender : "f"}
        ],
        classes : [
            {
                label : "Groupe 3ème",
                students : [
                    {username : "Bilal-BENHIDA", firstName : "Bilal", lastName : "BENHIDA", password : "Bila-BENH-FdL-CLAS-31", gender : "m", level : "3ème"},
                    {username : "Nasrinne-ZIOUCH", firstName : "Nasrinne", lastName : "ZIOUCH", password : "Nasr-ZIOU-FdL-CLAS-32", gender : "f", level : "3ème"},
                    {username : "Imran-ABDELMOUMNI", firstName : "Imran", lastName : "ABDELMOUMNI", password : "Imra-ABDELM-FdL-CLAS-33", gender : "m", level : "3ème"},
                    {username : "Imrane-FERHATI", firstName : "Imrane", lastName : "FERHATI", password : "Imra-FERH-FdL-CLAS-34", gender : "m", level : "3ème"},
                    {username : "Sarah-DUPRÉ", firstName : "Sarah", lastName : "DUPRÉ", password : "Sara-DUPR-FdL-CLAS-35", gender : "f", level : "3ème"},
                    {username : "Ahmed-KERZAZI", firstName : "Ahmed", lastName : "KERZAZI", password : "Ahme-KERZ-FdL-CLAS-36", gender : "m", level : "3ème"},
                    {username : "Cyrine-MCHAR", firstName : "Cyrine", lastName : "M'CHAR", password : "Bilal-FER-FdL-CLAS-37", gender : "f", level : "3ème"},
                    {username : "Yosor-MARZOUK", firstName : "Yosor", lastName : "MARZOUK", password : "Yoso-MARZ-FdL-CLAS-38", gender : "f", level : "3ème"},
                    {username : "Safya-LABIDI", firstName : "Safya", lastName : "LABIDI", password : "Safy-LABID-FdL-CLAS-39", gender : "f", level : "3ème"},
                ]
            },
            {
                label : "Groupe Lycée",
                students : [
                    {username : "XXXX-YYYY", firstName : "Bilal", lastName : "BENHIDA", password : "XXXX-YYYY", gender : "m", level : "2nde"},
                    {username : "AAAA-ZZZZ", firstName : "Nasrinne", lastName : "ZIOUCH", password : "ZZZZ-AAAA", gender : "f", level : "1ère"},
                    {username : "BBBB-CCCC", firstName : "Imran", lastName : "ABDELMOUMNI", password : "BBBB-CCCC", gender : "m", level : "Terminale"},
                ]
            },
        ]
    }
]



// ─────────────────────────────────────────────
// COMPETENCES
// ─────────────────────────────────────────────
export const SKILL_SEED = {
  autonomy : 0,
  discipline : 0,
  organisation : 0,
  ponctuality : 0,
  regularity : 0,
  respect : 0,
  preparation : 0,
  positive : '',
  negative : '',
  improvements : '',
}
// ─────────────────────────────────────────────
// ANIMATEURS
// ─────────────────────────────────────────────
export const ANIMATORS_SEED: AnimatorSeed[] = [
  {
    username: "Anas-NEJMI",
    firstName: "Anas",
    lastName: "NEJMI",
    password: "Anas-NEJ-CLAS-FdL-77",
    gender: "m",
    contracts: [
      {associationLabel : "Fleurs Du Lys", classLabel : "Groupe 3ème", scolarYearLabel : '2026-2027'},
      {associationLabel : "Fleurs Du Lys", classLabel : "Groupe Lycée", scolarYearLabel : '2026-2027'}],
  }
];

// ─────────────────────────────────────────────
// LECONS
// ─────────────────────────────────────────────
export const LESSONS_SEED : LessonSeed[] = [
  {
    level: "6ème",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Nombres entiers et décimaux", "Comparer et ranger des nombres", "Fractions simples", "Addition et soustraction", "Multiplication", "Division euclidienne", "Calcul mental", "Résolution de problèmes", "Grandeurs et mesures", "Longueurs, masses et durées", "Périmètres", "Aires", "Volumes", "Proportionnalité", "Lecture de tableaux", "Lecture de graphiques", "Triangles", "Quadrilatères", "Le cercle", "Angles", "Symétrie axiale", "Solides usuels", "Repérage dans le plan", "Initiation à l'algorithmique"]
      },
      {
        subject: "Français",
        lessons: ["Le conte", "Les récits d'aventures", "Les récits mythologiques", "La poésie", "Le théâtre", "Le récit historique", "Comprendre un texte", "Utiliser le dictionnaire", "Les classes grammaticales", "Le groupe nominal", "Les déterminants", "Les adjectifs qualificatifs", "Les pronoms", "Le verbe", "Le présent de l'indicatif", "Le futur simple", "L'imparfait", "Le passé composé", "Les accords dans le groupe nominal", "L'accord du verbe avec son sujet", "La phrase simple", "Les compléments de phrase", "Le vocabulaire", "Les figures de style", "La rédaction", "L'expression orale"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["Les débuts de l'humanité", "Les premières civilisations", "La Grèce antique", "Rome : de la République à l'Empire", "Les débuts du judaïsme", "Les débuts du christianisme", "L'Empire romain", "Habiter une métropole", "Habiter un espace de faible densité", "Habiter les littoraux", "Habiter un espace à fortes contraintes", "La répartition de la population mondiale", "Les mobilités humaines", "Les risques naturels"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["La cellule, unité du vivant", "La diversité des êtres vivants", "Classer les êtres vivants", "Les écosystèmes", "Les chaînes alimentaires", "Les besoins des êtres vivants", "Le développement des végétaux", "Le développement des animaux", "Les micro-organismes", "La biodiversité", "La planète Terre", "Les paysages et leur évolution"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Les états de la matière", "Les changements d'état", "Masse et volume", "Les mélanges", "Les matériaux", "Les sources d'énergie", "Les conversions d'énergie", "Les mouvements", "Vitesse et trajectoire", "Lumière et ombres", "Le système Soleil-Terre-Lune", "Les circuits électriques simples", "Les signaux lumineux et sonores", "Mesures et unités"]
      },
      {
        subject: "Anglais",
        lessons: ["Se présenter", "Parler de sa famille", "Décrire une personne", "Les nombres", "La date et l'heure", "Les couleurs", "Les vêtements", "La maison", "L'école", "Les loisirs", "Les sports", "Les animaux", "La nourriture", "Les goûts et préférences", "La ville", "Demander et indiquer son chemin", "Les vacances", "Le présent simple", "Le présent en BE + ING", "Le passé de BE", "Les verbes modaux", "Les comparatifs", "Les superlatifs"]
      },
      // {
      //   subject: "Philosophie",
      //   lessons: []
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Découvrir un ordinateur", "Les composants d'un ordinateur", "Les systèmes d'exploitation", "Les fichiers et dossiers", "Internet et le Web", "Les moteurs de recherche", "La sécurité numérique", "Les données personnelles", "Les réseaux informatiques", "Introduction à l'algorithmique", "Les variables", "Les conditions", "Les boucles", "Découverte de Scratch"]
      // }
    ]
  },
  {
    level: "5ème",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Nombres relatifs", "Repérage sur une droite graduée", "Addition et soustraction de nombres relatifs", "Multiplication et division de nombres décimaux", "Fractions et calculs", "Priorités opératoires", "Proportionnalité", "Pourcentages", "Échelles", "Expressions littérales", "Calcul littéral", "Égalités", "Triangles", "Parallélogrammes", "Angles", "Symétrie centrale", "Périmètres et aires", "Volumes des solides", "Statistiques", "Fréquences", "Diagrammes", "Probabilités", "Initiation à la programmation", "Algorithmes avec Scratch"]
      },
      {
        subject: "Français",
        lessons: ["Les récits d'aventures", "Les récits de chevalerie", "Le voyage et la découverte", "La poésie du Moyen Âge à nos jours", "Le théâtre comique", "Le récit de science-fiction", "Le verbe", "Les temps du récit", "Le passé simple", "Le plus-que-parfait", "Les expansions du nom", "Les compléments du verbe", "Les compléments de phrase", "Les propositions", "Les accords", "Les valeurs des temps", "Le vocabulaire des émotions", "Les familles de mots", "Les niveaux de langue", "L'expression écrite", "L'expression orale"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["Byzance et l'Europe carolingienne", "La naissance et l'expansion de l'islam", "La société féodale", "L'Église au Moyen Âge", "L'affirmation de l'État monarchique", "La Renaissance", "Les Grandes Découvertes", "La croissance démographique", "La répartition de la richesse", "Les ressources naturelles", "Prévenir les risques", "Le développement durable", "Les inégalités dans le monde", "Les territoires ruraux"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["La nutrition des végétaux", "La nutrition des animaux", "La digestion", "La respiration", "La circulation sanguine", "Le fonctionnement du corps humain", "Les besoins énergétiques", "La reproduction des êtres vivants", "La reproduction humaine", "Les écosystèmes", "Les interactions entre les êtres vivants", "L'action de l'Homme sur l'environnement", "Les phénomènes géologiques", "Les risques naturels"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Les propriétés de la matière", "Les transformations physiques", "Les transformations chimiques", "Les mélanges et les solutions", "La masse volumique", "Les sources d'énergie", "Les circuits électriques", "L'intensité du courant", "La tension électrique", "La puissance électrique", "La lumière", "Les ombres", "La propagation du son", "Les mouvements", "La vitesse"]
      },
      {
        subject: "Anglais",
        lessons: ["Parler de soi", "Décrire une personne", "Parler de ses habitudes", "Les activités quotidiennes", "Les loisirs", "Les voyages", "La nourriture", "Les fêtes et traditions", "Les animaux", "Les médias", "Le prétérit", "Le présent perfect", "Le futur", "Les verbes modaux", "Les adverbes", "Les comparatifs", "Les superlatifs", "Exprimer l'obligation", "Exprimer la permission", "Compréhension écrite", "Expression écrite", "Compréhension orale", "Expression orale"]
      },
      // {
      //   subject: "Philosophie",
      //   lessons: []
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Les objets connectés", "Les réseaux informatiques", "Internet", "Les données numériques", "La cybersécurité", "Les moteurs de recherche", "Les algorithmes", "Les variables", "Les conditions", "Les boucles", "Les événements", "Les fonctions", "Programmer avec Scratch", "Déboguer un programme"]
      // }
    ]
  },
  {
    level: "4ème",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Nombres relatifs", "Calcul avec les nombres relatifs", "Fractions", "Puissances", "Calcul littéral", "Développement", "Équations du premier degré", "Proportionnalité", "Pourcentages", "Vitesses et échelles", "Triangles", "Le théorème de Pythagore", "La réciproque du théorème de Pythagore", "Translation", "Rotation", "Aires et volumes", "Prismes et cylindres", "Statistiques", "Moyennes", "Probabilités", "Initiation aux fonctions", "Algorithmique", "Programmation avec Scratch"]
      },
      {
        subject: "Français",
        lessons: ["Le récit réaliste", "La nouvelle", "Le fantastique", "La poésie lyrique", "Le théâtre", "La lettre", "L'autobiographie", "Les valeurs des temps", "Les propositions subordonnées", "Les propositions relatives", "Les propositions complétives", "Les connecteurs logiques", "Les discours rapportés", "La modalisation", "Les figures de style", "Les niveaux de langue", "Le vocabulaire des sentiments", "L'argumentation", "La rédaction", "L'expression orale"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["Le XVIIIe siècle et les Lumières", "La Révolution française", "L'Empire napoléonien", "L'Europe au XIXe siècle", "La révolution industrielle", "La colonisation", "La société française au XIXe siècle", "L'urbanisation", "Les espaces industriels", "Les espaces touristiques", "La mondialisation", "Les mobilités humaines", "Les mers et les océans", "Les enjeux du développement durable"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["L'activité interne du globe", "Les séismes", "Le volcanisme", "La tectonique des plaques", "La reproduction humaine", "La puberté", "La transmission de la vie", "Les hormones", "Le système nerveux", "Le fonctionnement du cerveau", "L'alimentation", "Les micro-organismes", "Le système immunitaire", "La biodiversité et son évolution"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Les atomes", "Les molécules", "Les transformations chimiques", "Les réactions chimiques", "Les combustions", "L'énergie", "Les conversions d'énergie", "La puissance", "Les circuits électriques", "Les lois de l'électricité", "La tension et l'intensité", "La lumière", "Les lentilles", "Les signaux sonores", "La vitesse"]
      },
      {
        subject: "Anglais",
        lessons: ["Parler de ses expériences", "Les voyages", "L'environnement", "Les nouvelles technologies", "Les médias", "La santé", "Les métiers", "Le present perfect", "Le prétérit", "Le futur", "Les verbes modaux", "La voix passive", "Le discours indirect", "Les propositions relatives", "Les connecteurs logiques", "Compréhension écrite", "Expression écrite", "Compréhension orale", "Expression orale"]
      },
      // {
      //   subject: "Philosophie",
      //   lessons: []
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Les réseaux et Internet", "Les données personnelles", "La cybersécurité", "Les algorithmes", "Les variables", "Les conditions", "Les boucles", "Les fonctions", "Les listes", "Programmer avec Scratch", "Initiation à Python", "Déboguer un programme", "L'intelligence artificielle", "La citoyenneté numérique"]
      // }
    ]
  },
  {
    level: "3ème",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Nombres relatifs", "Puissances", "Racine carrée", "Calcul littéral", "Identités remarquables", "Équations du premier degré", "Inéquations", "Fonctions", "Fonctions linéaires", "Fonctions affines", "Proportionnalité", "Pourcentages", "Le théorème de Thalès", "Le théorème de Pythagore", "Trigonométrie dans le triangle rectangle", "Homothétie", "Volumes", "Statistiques", "Probabilités", "Algorithmique", "Programmation avec Scratch"]
      },
      {
        subject: "Français",
        lessons: ["L'autobiographie", "La poésie engagée", "Le roman", "La nouvelle", "Le théâtre", "La littérature engagée", "Les valeurs des temps", "Les propositions subordonnées", "Les propositions circonstancielles", "Le discours direct et indirect", "La modalisation", "L'expression de l'opinion", "Les figures de style", "L'argumentation", "Le vocabulaire de l'engagement", "La rédaction", "Le commentaire de texte", "Le brevet de français", "L'expression orale"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["La Première Guerre mondiale", "Les régimes totalitaires", "La Seconde Guerre mondiale", "La France sous l'Occupation", "La Libération", "La guerre froide", "La décolonisation", "La Ve République", "La construction européenne", "La France et l'Union européenne", "Les aires urbaines", "Les espaces productifs", "Les territoires ultramarins", "La mondialisation", "La France dans le monde"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["La génétique", "L'ADN", "Les chromosomes", "La reproduction et la transmission des caractères", "L'évolution des espèces", "La sélection naturelle", "Le système immunitaire", "Les maladies infectieuses", "Le fonctionnement du cerveau", "Le système nerveux", "Les comportements responsables", "Les ressources naturelles", "Le changement climatique", "Les impacts des activités humaines sur la biodiversité"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Structure de l'atome", "Les ions", "Les réactions chimiques", "Les solutions acides et basiques", "La concentration", "L'énergie électrique", "La puissance et l'énergie", "Les circuits électriques", "Les lois de l'électricité", "Les mouvements", "Les forces", "Le poids", "La gravitation", "La lumière", "Les signaux et les ondes"]
      },
      {
        subject: "Anglais",
        lessons: ["Parler de son avenir", "Les études et les métiers", "L'environnement", "Les nouvelles technologies", "Les médias", "Les voyages", "L'engagement citoyen", "Le present perfect", "Le past perfect", "Le futur", "La voix passive", "Le discours indirect", "Les propositions relatives", "Les verbes modaux", "Les connecteurs logiques", "Compréhension écrite", "Expression écrite", "Compréhension orale", "Expression orale", "Préparation au brevet"]
      },
      // {
      //   subject: "Philosophie",
      //   lessons: []
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Les réseaux informatiques", "Internet et le Web", "La cybersécurité", "Les données personnelles", "Les algorithmes", "Les variables", "Les conditions", "Les boucles", "Les fonctions", "Les listes", "Programmer en Python", "Déboguer un programme", "L'intelligence artificielle", "Les bases de données", "Les objets connectés"]
      // }
    ]
  },
  {
    level: "2nde",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Ensembles de nombres", "Calcul numérique", "Calcul littéral", "Équations et inéquations", "Valeur absolue", "Coordonnées dans le plan", "Vecteurs", "Équations de droites", "Alignement et colinéarité", "Fonctions générales", "Fonction affine", "Fonction carré", "Fonction inverse", "Variations d'une fonction", "Résolution graphique", "Statistiques descriptives", "Probabilités", "Échantillonnage", "Algorithmique", "Programmation en Python", "Logique mathématique"]
      },
      {
        subject: "Français",
        lessons: ["La poésie", "Le roman et le récit", "Le théâtre", "La littérature d'idées", "L'argumentation", "Le commentaire de texte", "La dissertation", "La contraction de texte", "Les figures de style", "Les registres littéraires", "La grammaire de la phrase", "La grammaire du texte", "Les valeurs des temps", "La modalisation", "Le lexique", "L'expression écrite", "L'expression orale"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["La Méditerranée antique", "L'Europe médiévale", "La Renaissance", "L'ouverture sur le monde", "L'humanisme", "La Réforme et les guerres de Religion", "L'affirmation de l'État moderne", "Les littoraux", "Les espaces urbains", "Les espaces ruraux", "Les mobilités", "Les territoires du quotidien", "Les ressources", "Les risques", "Le développement durable"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["L'organisation fonctionnelle du vivant", "Les cellules et leur fonctionnement", "Le métabolisme cellulaire", "L'ADN et l'information génétique", "La biodiversité", "Les écosystèmes", "La dynamique des populations", "Le fonctionnement de la Terre", "La tectonique des plaques", "Les risques géologiques", "Le climat passé et actuel", "Les enjeux environnementaux"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Mesures et incertitudes", "Les corps purs et les mélanges", "Les solutions", "La concentration", "La quantité de matière", "La mole", "Les transformations physiques", "Les transformations chimiques", "Le modèle atomique", "Les ions", "Le tableau périodique", "Les mouvements", "Les forces", "La gravitation", "Les lois de Newton", "Les ondes", "Le son", "La lumière", "Les signaux", "L'énergie et ses conversions"]
      },
      {
        subject: "Anglais",
        lessons: ["Se présenter et parler de soi", "Les relations sociales", "L'école et les études", "Le monde du travail", "Les voyages", "L'environnement", "Les médias", "Les nouvelles technologies", "La culture anglophone", "Le présent", "Le prétérit", "Le present perfect", "Le futur", "Les verbes modaux", "La voix passive", "Le discours indirect", "Les propositions relatives", "L'expression de l'opinion", "Compréhension écrite", "Expression écrite", "Compréhension orale", "Expression orale"]
      },
      // {
      //   subject: "Philosophie",
      //   lessons: []
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Internet", "Le Web", "Les réseaux", "Les réseaux sociaux", "Les données structurées", "Les bases de données", "La géolocalisation", "La photographie numérique", "L'informatique embarquée", "Les objets connectés", "Algorithmique", "Programmation en Python", "Les variables", "Les conditions", "Les boucles", "Les fonctions", "La cybersécurité", "Les données personnelles"]
      // }
    ]
  },
  {
    level: "1ère",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Calcul algébrique", "Équations et inéquations", "Fonctions", "Fonction exponentielle", "Dérivation", "Suites numériques", "Trigonométrie", "Géométrie vectorielle", "Produit scalaire", "Probabilités", "Statistiques", "Algorithmique", "Programmation en Python", "Logique mathématique"]
      },
      {
        subject: "Français",
        lessons: ["Le roman", "La poésie", "Le théâtre", "La littérature d'idées", "L'argumentation", "Le commentaire de texte", "La dissertation", "Les figures de style", "Les registres littéraires", "La grammaire", "Le lexique", "L'expression écrite", "L'expression orale", "Préparation au baccalauréat"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["L'Europe et le monde", "Les guerres et les conflits", "Les régimes politiques", "La France contemporaine", "La mondialisation", "Les territoires", "Les espaces maritimes", "Les mobilités", "Le développement durable", "Les ressources", "Les risques", "La géopolitique"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["La cellule", "L'ADN et l'information génétique", "La reproduction", "L'évolution", "La biodiversité", "Le métabolisme", "Les écosystèmes", "La nutrition", "La Terre interne", "La tectonique des plaques", "Le climat", "Les enjeux environnementaux"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Mesures et incertitudes", "La matière", "Les transformations chimiques", "Les solutions", "La quantité de matière", "L'énergie", "Les mouvements", "Les forces", "Les ondes", "La lumière", "L'électricité", "Le modèle atomique"]
      },
      {
        subject: "Anglais",
        lessons: ["Communication", "Société", "Culture anglophone", "Le monde du travail", "Les voyages", "L'environnement", "Les sciences et technologies", "Les médias", "Grammaire", "Vocabulaire", "Compréhension écrite", "Compréhension orale", "Expression écrite", "Expression orale"]
      },
      // {
      //   subject: "Philosophie",
      //   lessons: []
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Représentation des données", "Bases de données", "SQL", "Algorithmique", "Programmation Python", "Structures de données", "Architecture des ordinateurs", "Réseaux", "Internet", "Cybersécurité", "Cryptographie", "Intelligence artificielle", "Graphes"]
      // }
    ]
  },
  {
    level: "Terminale",
    subjects: [
      {
        subject: "Mathématiques",
        lessons: ["Limites et continuité", "Dérivation et étude de fonctions", "Convexité", "Fonction exponentielle et logarithme", "Primitives et intégration", "Équations différentielles", "Suites numériques", "Géométrie dans l'espace", "Vecteurs et produits scalaires", "Probabilités conditionnelles", "Variables aléatoires", "Loi binomiale", "Loi normale", "Statistiques", "Algorithmique et Python"]
      },
      {
        subject: "Physique-Chimie",
        lessons: ["Mouvement et forces", "Lois de Newton", "Énergie et transferts", "Ondes et signaux", "Optique et lumière", "Électricité et circuits", "Champs électriques et gravitationnels", "Structure de la matière", "Transformations chimiques", "Acide-base", "Oxydoréduction", "Cinétique chimique", "Thermodynamique", "Spectroscopie"]
      },
      {
        subject: "Sciences de la Vie et de la Terre",
        lessons: ["Génétique et hérédité", "Expression des gènes", "Évolution des espèces", "Immunologie", "Neurobiologie", "Écosystèmes et biodiversité", "Géologie interne", "Tectonique des plaques", "Climat et changement climatique", "Cycle du carbone", "Ressources et enjeux environnementaux"]
      },
      {
        subject: "Histoire-Géographie",
        lessons: ["Les puissances dans le monde", "La guerre froide et ses héritages", "La France dans le monde", "La mondialisation", "Les territoires de la mondialisation", "Les frontières", "Les espaces maritimes", "Les inégalités de développement", "Les dynamiques européennes", "Les enjeux géopolitiques contemporains"]
      },
      {
        subject: "Français",
        lessons: []
      },
      // {
      //   subject: "Philosophie",
      //   lessons: ["La conscience", "La liberté", "Le bonheur", "La vérité", "La justice", "La politique", "La morale", "Le travail", "La technique", "La nature", "L'art", "Le langage", "La religion", "La raison et le réel"]
      // },
      // {
      //   subject: "Anglais",
      //   lessons: ["Identité et échanges", "Espaces et interactions", "Art et pouvoir", "Citoyenneté et monde", "Science et innovations", "Environnement et société", "Temps et transformations", "Communication orale", "Compréhension écrite", "Expression écrite", "Argumentation", "Grammaire avancée", "Lexique thématique"]
      // },
      // {
      //   subject: "Informatique",
      //   lessons: ["Algorithmique avancée", "Structures de données", "Programmation Python avancée", "Bases de données", "SQL avancé", "Réseaux et protocoles", "Internet et Web", "Cybersécurité", "Cryptographie", "Intelligence artificielle", "Apprentissage automatique", "Graphes", "Complexité algorithmique", "Systèmes informatiques"]
      // }
    ]
  }
]