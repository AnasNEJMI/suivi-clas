import { QcmBankQuestionSeed } from "./seed.types.js";

export const MATH_LESSONS_4e = [
    "Nombres relatifs",
    "Fractions et Nombres rationnels",
    "Puissances et notation scientifique",
    "Divisibilité et nombres premiers",
    "Calcul littéral et distributivité",
    "Pythagore",
    "Thalès",
    "Équations simples",
    "Proportionnalité et pourcentages",
    "Statistiques et Probabilités",
    "Repérage dans le plan",
    "Grandeurs et mesures",
] as const;

export type MathLesson4e = typeof MATH_LESSONS_4e[number]

export const mathQuestions4e : Record<MathLesson4e, QcmBankQuestionSeed[]> = {
    "Nombres relatifs" : [
        {
            question: "Qu'est-ce qu'un nombre relatif ?",
            difficulty: "e",
            answerA: "Un nombre toujours positif",
            answerB: "Un nombre qui peut être positif ou négatif",
            answerC: "Un nombre avec une virgule",
            answerD: "Un nombre supérieur à 0",
            correctAnswer: "b",
            explanation: "Un nombre relatif peut être positif, négatif ou nul."
        },
        {
            question: "Quel est l'opposé de -7 ?",
            difficulty: "e",
            answerA: "-7",
            answerB: "0",
            answerC: "7",
            answerD: "-14",
            correctAnswer: "c",
            explanation: "Deux nombres opposés ont la même distance à 0 et des signes contraires."
        },
        {
            question: "Quel est le signe du produit de deux nombres négatifs ?",
            difficulty: "e",
            answerA: "Négatif",
            answerB: "Positif",
            answerC: "Nul",
            answerD: "Impossible à déterminer",
            correctAnswer: "b",
            explanation: "Négatif x négatif = positif."
        },
        {
            question: "Calculer A = -3 + 5 -8",
            difficulty: "e",
            answerA: "-8",
            answerB: "-6",
            answerC: "-2",
            answerD: "8",
            correctAnswer: "b",
            explanation: "-3 + 5 -8 = -6."
        },
        {
            question: "Quelle est la distance à zéro du nombre -9 ?",
            difficulty: "e",
            answerA: "-9",
            answerB: "9",
            answerC: "0",
            answerD: "18",
            correctAnswer: "b",
            explanation: "La distance à zéro est la valeur absolue, c'est à dire la valeur sans le signe."
        },
        {
            question: "Quel est le résultat de -6 - 4 -10 ?",
            difficulty: "e",
            answerA: "-2",
            answerB: "-20",
            answerC: "10",
            answerD: "2",
            correctAnswer: "b",
            explanation: "-6 - 4 -10 = -20."
        },
        {
            question: "Quel est le résultat de (-3) x 4 ?",
            difficulty: "e",
            answerA: "-12",
            answerB: "12",
            answerC: "-7",
            answerD: "7",
            correctAnswer: "a",
            explanation: "Négatif x positif = négatif. Donc (-3) x 4 = -12 "
        },
        {
            question: "Quel est le résultat de (-5) x (-2) ?",
            difficulty: "e",
            answerA: "-10",
            answerB: "10",
            answerC: "-7",
            answerD: "7",
            correctAnswer: "b",
            explanation: "Négatif x négatif = positif. Donc (-5) x (-2) = 10."
        },
        {
            question: "Quel est le plus grand nombre ?",
            difficulty: "e",
            answerA: "-3",
            answerB: "-7",
            answerC: "0",
            answerD: "-1",
            correctAnswer: "c",
            explanation: "0 est supérieur à tous les nombres négatifs."
        },
        {
            question: "Quel est le résultat de 8 - 12 + 10 - 12 + 6?",
            difficulty: "e",
            answerA: "4",
            answerB: "0",
            answerC: "20",
            answerD: "-20",
            correctAnswer: "b",
            explanation: "8 - 12 + 10 - 12 + 6 = 0."
        },
        {
            question: "Quelle est la valeur de -(-6) ?",
            difficulty: "e",
            answerA: "-6",
            answerB: "6",
            answerC: "0",
            answerD: "12",
            correctAnswer: "b",
            explanation: "L'opposé de l'opposé est le nombre positif. Donc -(-6) = 6."
        },
        {
            question: "Quel est le résultat de -15 + 15 ?",
            difficulty: "e",
            answerA: "30",
            answerB: "-30",
            answerC: "0",
            answerD: "15",
            correctAnswer: "c",
            explanation: "Un nombre et son opposé s'annulent. -15 + 15 = 0"
        },
        {
            question: "Quel est le signe de (-4) ÷ 2 ?",
            difficulty: "e",
            answerA: "Positif",
            answerB: "Négatif",
            answerC: "Nul",
            answerD: "Impossible",
            correctAnswer: "b",
            explanation: "Négatif ÷ positif = négatif. La même règle que pour les multiplications."
        },
        {
            question: "Quel est le résultat de 0 x (-9) ?",
            difficulty: "e",
            answerA: "-9",
            answerB: "9",
            answerC: "0",
            answerD: "Impossible",
            correctAnswer: "c",
            explanation: "Tout nombre multiplié par 0 vaut 0. Donc 0 x (-9) = 0"
        },
        {
            question: "Quel nombre est le plus proche de 0 ?",
            difficulty: "e",
            answerA: "-5",
            answerB: "3",
            answerC: "-1",
            answerD: "7",
            correctAnswer: "c",
            explanation: "-1 a la plus petite distance à zéro."
        },
        {
            question: "Quel est le résultat de (-2) x (-3) x 4 ?",
            difficulty: "m",
            answerA: "-24",
            answerB: "24",
            answerC: "-12",
            answerD: "12",
            correctAnswer: "b",
            explanation: "(-2) x (-3) = 6 puis 6 x 4 = 24."
        },
        {
            question: "Quel est le résultat de -18 ÷ (-3) ?",
            difficulty: "m",
            answerA: "-6",
            answerB: "6",
            answerC: "-21",
            answerD: "21",
            correctAnswer: "b",
            explanation: "Négatif ÷ négatif = positif. Donc -18 ÷ (-3) = 6"
        },
        {
            question: "Quel est le résultat de (-4) + (-9) - (+10) - (-15)?",
            difficulty: "h",
            answerA: "-5",
            answerB: "5",
            answerC: "-8",
            answerD: "13",
            correctAnswer: "c",
            explanation: "-4 + -9 = -13. Puis -13 - (+10) = -13 - 10 = -23. Enfin -23 - (-15) = -23 + 15 = -8."
        },
        {
            question: "Quel est le contraire de 0 ?",
            difficulty: "m",
            answerA: "0",
            answerB: "-0",
            answerC: "1",
            answerD: "-1",
            correctAnswer: "a",
            explanation: "0 est son propre opposé. C'est le seul nombre qui est son propre opposé."
        },
        {
            question: "Quel est le résultat de (-2)x(+2)x(-2)x(+2)x(-2)x(-2) ?",
            difficulty: "h",
            answerA: "-8",
            answerB: "48",
            answerC: "-6",
            answerD: "6",
            correctAnswer: "b",
            explanation: "4 nombres négatifs dans la multiplication -> le résultat est positif. Donc (-2)x(+2)x(-2)x(+2)x(-2)x(-2) = 2x2x2x2x2x2 = 48."
        },
        {
            question: "Quel est le résultat de (-3)x(-5) - 10x(-2 + 4) ?",
            difficulty: "h",
            answerA: "-5",
            answerB: "-19",
            answerC: "1",
            answerD: "-7",
            correctAnswer: "a",
            explanation: "(-3)x(-5) = 15 puis 10x(-2 + 4) = -10x2 = -20, donc 15 - 20 = -5."
        },
        {
            question: "Quel est le résultat de 4 - [3 - (-5)] ?",
            difficulty: "h",
            answerA: "6",
            answerB: "-4",
            answerC: "-12",
            answerD: "0",
            correctAnswer: "b",
            explanation: "3 - (-5) = 8 puis 4 - 8 = -4."
        },
        {
            question: "Quel est le résultat de (-6) ÷ 3 x (-2) ?",
            difficulty: "h",
            answerA: "4",
            answerB: "-4",
            answerC: "12",
            answerD: "-12",
            correctAnswer: "a",
            explanation: "-6 ÷ 3 = -2 puis -2 x -2 = 4."
        },
        {
            question: "Quel est le résultat de -2 x (3 - 7) + 4 ?",
            difficulty: "h",
            answerA: "-4",
            answerB: "12",
            answerC: "8",
            answerD: "-8",
            correctAnswer: "b",
            explanation: "3 - 7 = -4, -2 x -4 = 8, puis 8 + 4 = 12."
        }
    ],
    "Fractions et Nombres rationnels" : [
        {
            question: "Qu'est-ce qu'une fraction ?",
            answerA: "Un nombre décimal",
            answerB: "Un quotient de deux nombres",
            answerC: "Un nombre négatif",
            answerD: "Un nombre entier",
            correctAnswer: "b",
            explanation: "Une fraction représente le quotient d'un numérateur par un dénominateur non nul.",
            difficulty: "e"
        },
        {
            question: "Dans la fraction 7/9, quel est le dénominateur ?",
            answerA: "7",
            answerB: "9",
            answerC: "16",
            answerD: "0",
            correctAnswer: "b",
            explanation: "Le dénominateur est le nombre écrit sous la barre.",
            difficulty: "e"
        },
        {
            question: "Quand dit-on qu'une fraction est irréductible ?",
            answerA: "Quand elle est décimale",
            answerB: "Quand le numérateur est plus grand",
            answerC: "Quand on ne peut plus la simplifier",
            answerD: "Quand elle est négative",
            correctAnswer: "c",
            explanation: "Une fraction irréductible ne peut plus être simplifiée.",
            difficulty: "e"
        },
        {
            question: "Calculer : 1/4 + 1/4",
            answerA: "1/8",
            answerB: "2/4",
            answerC: "1/4",
            answerD: "1/2",
            correctAnswer: "d",
            explanation: "Les dénominateurs sont identiques, on additionne les numérateurs. 1/4 + 1/4 = 2/4 = 1/2.",
            difficulty: "e"
        },
        {
            question: "Calculer : 5/6 - 2/6",
            answerA: "3/6",
            answerB: "7/6",
            answerC: "1/6",
            answerD: "5/36",
            correctAnswer: "a",
            explanation: "Les dénominateurs sont identiques, on soustrait les numérateurs. 5/6 - 2/6 = 3/6",
            difficulty: "e"
        },
        {
            question: "Calculer : 3 x 2/5",
            answerA: "3/5",
            answerB: "2/15",
            answerC: "6/5",
            answerD: "10/3",
            correctAnswer: "c",
            explanation: "Quand on multiplie une fraction par un nombre, le nombre est multiplié par le numerateur seulement. 3 x 2/5 = 6/5.",
            difficulty: "e"
        },
        {
            question: "Simplifier la fraction 6/9",
            answerA: "2/3",
            answerB: "3/2",
            answerC: "6/18",
            answerD: "1/3",
            correctAnswer: "a",
            explanation: "On divise le numérateur et le dénominateur par 3.",
            difficulty: "e"
        },
        {
            question: "Calculer : 4/5 - 1/10",
            answerA: "3/10",
            answerB: "7/10",
            answerC: "1/2",
            answerD: "5/10",
            correctAnswer: "b",
            explanation: "4/5 = 8/10, donc 8/10 - 1/10 = 7/10.",
            difficulty: "m"
        },
        {
            question: "Comparer 5/6 et 4/6",
            answerA: "5/6 < 4/6",
            answerB: "5/6 = 4/6",
            answerC: "5/6 > 4/6",
            answerD: "Impossible",
            correctAnswer: "c",
            explanation: "Même dénominateur, on compare les numérateurs.",
            difficulty: "m"
        },
        {
            question: "Quelle fraction est la plus grande ?",
            answerA: "3/8",
            answerB: "1/2",
            answerC: "4/10",
            answerD: "5/20",
            correctAnswer: "b",
            explanation: "1/2 = 0,5 est la plus grande valeur.",
            difficulty: "m"
        },
        {
            question: "Simplifier 12/18",
            answerA: "2/3",
            answerB: "6/9",
            answerC: "4/9",
            answerD: "3/2",
            correctAnswer: "a",
            explanation: "On divise par 6.",
            difficulty: "m"
        },
        {
            question: "Calculer : 3/5 + 2/15",
            answerA: "5/20",
            answerB: "11/15",
            answerC: "1/3",
            answerD: "13/15",
            correctAnswer: "b",
            explanation: "3/5 = 9/15 donc 9/15 + 2/15 = 11/15.",
            difficulty: "h"
        },
        {
            question: "Calculer : 7/4 - 5/8",
            answerA: "9/8",
            answerB: "7/8",
            answerC: "1/8",
            answerD: "12/8",
            correctAnswer: "a",
            explanation: "7/4 = 14/8, donc 14/8 - 5/8 = 9/8.",
            difficulty: "h"
        },
        {
            question: "Calculer : (2/3 + 1/6) x 4",
            answerA: "1/2",
            answerB: "20/6",
            answerC: "3/9",
            answerD: "4/6",
            correctAnswer: "b",
            explanation: "2/3 = 4/6, donc 4/6 + 1/6 = 5/6. Donc 5/6 x 4 = 20/6.",
            difficulty: "h"
        },
        {
            question: "Calculer : (1/2 + 3/4) x 2",
            answerA: "5/4",
            answerB: "2",
            answerC: "5",
            answerD: "3/4",
            correctAnswer: "c",
            explanation: "1/2 + 3/4 = 5/4, puis 5/4 x 2 = 5/2. Donc 5/2 x 2 = 10/2 = 5.",
            difficulty: "h"
        },
        {
            question: "Comparer 7/9 et 5/7",
            answerA: "7/9 < 5/7",
            answerB: "7/9 = 5/7",
            answerC: "7/9 > 5/7",
            answerD: "Impossible",
            correctAnswer: "c",
            explanation: "7/9 ≈ 0,78 et 5/7 ≈ 0,71.",
            difficulty: "h"
        }
    ],
    "Divisibilité et nombres premiers" : [
        {
            question: "Qu'est-ce qu'un nombre premier ?",
            answerA: "Un nombre qui a exactement deux diviseurs",
            answerB: "Un nombre divisible par 2",
            answerC: "Un nombre plus grand que 10",
            answerD: "Un nombre qui a plusieurs diviseurs",
            correctAnswer: "a",
            explanation: "Un nombre premier a exactement deux diviseurs : 1 et lui-même.",
            difficulty: "e"
        },
        {
            question: "Que signifie : 12 est un multiple de 3 ?",
            answerA: "12 est divisible par 3",
            answerB: "3 est divisible par 12",
            answerC: "12 est premier",
            answerD: "3 est un multiple de 12",
            correctAnswer: "a",
            explanation: "12 = 3 x 4, donc 12 est divisible par 3.",
            difficulty: "e"
        },
        {
            question: "Que veut dire : 4 est un diviseur de 20 ?",
            answerA: "20 ÷ 4 est entier",
            answerB: "4 ÷ 20 est entier",
            answerC: "20 est premier",
            answerD: "4 est plus grand que 20",
            correctAnswer: "a",
            explanation: "20 ÷ 4 = 5, donc 4 est un diviseur de 20.",
            difficulty: "e"
        },
        {
            question: "Lequel de ces nombres est premier ?",
            answerA: "9",
            answerB: "15",
            answerC: "17",
            answerD: "21",
            correctAnswer: "c",
            explanation: "17 n'a que deux diviseurs : 1 et 17.",
            difficulty: "e"
        },
        {
            question: "Parmi ces nombres, lequel n'est PAS premier ?",
            answerA: "11",
            answerB: "13",
            answerC: "19",
            answerD: "21",
            correctAnswer: "d",
            explanation: "21 = 3 x 7.",
            difficulty: "m"
        },
        {
            question: "Combien de nombres premiers y a-t-il dans la liste : 2, 4, 5, 9, 11 ?",
            answerA: "2",
            answerB: "3",
            answerC: "4",
            answerD: "5",
            correctAnswer: "b",
            explanation: "Les nombres premiers sont 2, 5 et 11.",
            difficulty: "h"
        },
        {
            question: "Lequel est un diviseur de 18 ?",
            answerA: "5",
            answerB: "6",
            answerC: "7",
            answerD: "11",
            correctAnswer: "b",
            explanation: "18 ÷ 6 = 3.",
            difficulty: "e"
        },
        {
            question: "Lequel est un multiple de 7 ?",
            answerA: "21",
            answerB: "25",
            answerC: "27",
            answerD: "29",
            correctAnswer: "a",
            explanation: "21 = 7 x 3.",
            difficulty: "m"
        },
        {
            question: "Combien de diviseurs possède le nombre 12 ?",
            answerA: "4",
            answerB: "5",
            answerC: "6",
            answerD: "8",
            correctAnswer: "c",
            explanation: "Les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12.",
            difficulty: "h"
        },
        {
            question: "Décomposer 10 en facteurs premiers",
            answerA: "2 x 5",
            answerB: "1 x 10",
            answerC: "2 x 2 x 5",
            answerD: "5 x 5",
            correctAnswer: "a",
            explanation: "10 = 2 x 5.",
            difficulty: "e"
        },
        {
            question: "Décomposer 18 en facteurs premiers",
            answerA: "3 x 6",
            answerB: "2 x 9",
            answerC: "2 x 3 x 3",
            answerD: "18 x 1",
            correctAnswer: "c",
            explanation: "18 = 2 x 3 x 3.",
            difficulty: "m"
        },
        {
            question: "Décomposer 72 en facteurs premiers",
            answerA: "2 x 36",
            answerB: "2 x 2 x 2 x 9",
            answerC: "2 x 2 x 2 x 3 x 3",
            answerD: "3 x 24",
            correctAnswer: "c",
            explanation: "72 = 2 x 2 x 2 x 3 x 3.",
            difficulty: "h"
        },
        {
            question: "Simplifier la fraction 6/8",
            answerA: "3/4",
            answerB: "6/4",
            answerC: "2/3",
            answerD: "1/2",
            correctAnswer: "a",
            explanation: "On divise par 2.",
            difficulty: "e"
        },
        {
            question: "Simplifier la fraction 12/18",
            answerA: "6/9",
            answerB: "4/6",
            answerC: "2/3",
            answerD: "1/3",
            correctAnswer: "c",
            explanation: "On divise par 6.",
            difficulty: "m"
        },
        {
            question: "Simplifier la fraction 45/60",
            answerA: "9/12",
            answerB: "3/4",
            answerC: "15/20",
            answerD: "5/6",
            correctAnswer: "b",
            explanation: "On divise par 15.",
            difficulty: "h"
        }
    ],
    "Calcul littéral et distributivité" : [
        {
            question: "Que signifie développer une expression littérale ?",
            answerA: "Multiplier chaque terme à l'intérieur des parenthèses",
            answerB: "Ajouter des parenthèses",
            answerC: "Remplacer les lettres par des nombres",
            answerD: "Factoriser l'expression",
            correctAnswer: "a",
            explanation: "Développer consiste à appliquer la distributivité.",
            difficulty: "e"
        },
        {
            question: "Que signifie factoriser une expression ?",
            answerA: "Supprimer les lettres",
            answerB: "Mettre une expression sous forme de produit",
            answerC: "Calculer la valeur numérique",
            answerD: "Développer les parenthèses",
            correctAnswer: "b",
            explanation: "Factoriser consiste à écrire une somme sous forme de produit.",
            difficulty: "e"
        },
        {
            question: "Dans un calcul, quelle opération est prioritaire ?",
            answerA: "Addition",
            answerB: "Soustraction",
            answerC: "Multiplication/Division",
            answerD: "Addition et soustraction",
            correctAnswer: "c",
            explanation: "La multiplication et la division sont prioritaires.",
            difficulty: "e"
        },
        {
            question: "Développer : 3(x + 4)",
            answerA: "3x + 4",
            answerB: "3x + 12",
            answerC: "x + 12",
            answerD: "7x",
            correctAnswer: "b",
            explanation: "3x + 3 x 4 = 3x + 12.",
            difficulty: "e"
        },
        {
            question: "Développer et réduire : 2(x + 5) + x",
            answerA: "3x + 5",
            answerB: "2x + 5",
            answerC: "3x + 10",
            answerD: "x + 10",
            correctAnswer: "c",
            explanation: "2x + 10 + x = 3x + 10.",
            difficulty: "m"
        },
        {
            question: "Développer et réduire : 4(2x - 3) - 2x",
            answerA: "8x - 12",
            answerB: "6x - 12",
            answerC: "8x - 3",
            answerD: "2x - 12",
            correctAnswer: "b",
            explanation: "8x - 12 - 2x = 6x - 12.",
            difficulty: "h"
        },
        {
            question: "Factoriser : 5x + 10",
            answerA: "5(x + 2)",
            answerB: "x(5 + 10)",
            answerC: "10(x + 5)",
            answerD: "5x(2)",
            correctAnswer: "a",
            explanation: "Le facteur commun est 5. 5x + 10 = 5(x + 2)",
            difficulty: "e"
        },
        {
            question: "Factoriser : 3x + 6x²",
            answerA: "3x(1 + 2x)",
            answerB: "x(3 + 6)",
            answerC: "6(x + 3)",
            answerD: "3x(2)",
            correctAnswer: "a",
            explanation: "3x est le facteur commun. 3x + 6x² = 3x(1 + 2x)",
            difficulty: "m"
        },
        {
            question: "Factoriser : 8x² - 4x",
            answerA: "4x(2x - 1)",
            answerB: "8(x - 4)",
            answerC: "2(4x - 2)",
            answerD: "4(x - 1)",
            correctAnswer: "a",
            explanation: "On met 4x en facteur. 8x² - 4x = 4x(2x - 1)",
            difficulty: "h"
        },
        {
            question: "On choisit un nombre x, on le multiplie par 3 puis on ajoute 5. Quelle expression correspond ?",
            answerA: "3x + 5",
            answerB: "3(x + 5)",
            answerC: "x + 15",
            answerD: "5x + 3",
            correctAnswer: "a",
            explanation: "On multiplie d'abord puis on ajoute.",
            difficulty: "e"
        },
        {
            question: "On choisit un nombre, on ajoute 4 puis on multiplie par 2.",
            answerA: "x + 8",
            answerB: "2x + 4",
            answerC: "2(x + 4)",
            answerD: "6x",
            correctAnswer: "c",
            explanation: "L'addition est faite avant la multiplication.",
            difficulty: "m"
        },
        {
            question: "On choisit un nombre x, on ajoute 3, on le multiplie le resultat précédent par 5, puis on enlève 7.",
            answerA: "5(x + 3 - 7)",
            answerB: "5(x+3) - 7",
            answerC: "x + 3 - 35",
            answerD: "7 - 5x",
            correctAnswer: "b",
            explanation: "On applique les opérations dans l'ordre.",
            difficulty: "h"
        },
    ],
    "Proportionnalité et pourcentages" : [
        {
            question: "Comment reconnaître une situation de proportionnalité ?",
            answerA: "Les valeurs augmentent toujours",
            answerB: "Le rapport entre deux grandeurs est constant",
            answerC: "Les valeurs sont proches",
            answerD: "Il y a une addition fixe",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Dans une situation de proportionnalité, le rapport entre les valeurs correspondantes est constant."
        },
        {
            question: "Quel graphique représente une situation de proportionnalité ?",
            answerA: "Une droite qui ne passe pas par l'origine",
            answerB: "Une courbe",
            answerC: "Une droite passant par l'origine",
            answerD: "Un graphique en escaliers",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Une situation de proportionnalité est représentée par une droite passant par l'origine."
        },
        {
            question: "À quoi sert le produit en croix ?",
            answerA: "À additionner des fractions",
            answerB: "À comparer deux nombres",
            answerC: "À résoudre un problème de proportionnalité",
            answerD: "À calculer une moyenne",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Le produit en croix permet de trouver une valeur inconnue dans une situation de proportionnalité."
        },
        {
            question: "Complète : 2 kg coûtent 6 €, 5 kg coûtent ... €",
            answerA: "10",
            answerB: "12",
            answerC: "15",
            answerD: "18",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "1 kg coûte 3 €, donc 5 kg coûtent 15 €."
        },
        {
            question: "Un stylo coûte 1,50 €. Combien coûtent 4 stylos ?",
            answerA: "4,50 €",
            answerB: "5 €",
            answerC: "6 €",
            answerD: "6,50 €",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "1,50 x 4 = 6 €."
        },
        {
            question: "3 heures correspondent à 180 km. Quelle distance en 5 heures ?",
            answerA: "250 km",
            answerB: "280 km",
            answerC: "300 km",
            answerD: "320 km",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "Vitesse = 60 km/h, donc 5 h → 300 km."
        },
        {
            question: "Complète le tableau : 4 objets → 10 €, 12 objets → ?",
            answerA: "20 €",
            answerB: "25 €",
            answerC: "30 €",
            answerD: "35 €",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "Le prix est multiplié par 3 : 10 x 3 = 30 €."
        },
        {
            question: "Si 7 m de tissu coûtent 42 €, combien coûtent 2,5 m ?",
            answerA: "12 €",
            answerB: "14 €",
            answerC: "15 €",
            answerD: "18 €",
            correctAnswer: "b",
            difficulty: "h",
            explanation: "1 m coûte 6 €, donc 2,5 m coûtent 15 €."
        },
        {
            question: "Calculer 10 % de 50",
            answerA: "5",
            answerB: "10",
            answerC: "15",
            answerD: "50",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "10 % = 0,1 donc 0,1 x 50 = 5."
        },
        {
            question: "Calculer 25 % de 80",
            answerA: "10",
            answerB: "20",
            answerC: "25",
            answerD: "40",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "25 % = 1/4, donc 80 ÷ 4 = 20."
        },
        {
            question: "Un article coûte 60 €. Il augmente de 10 %. Nouveau prix ?",
            answerA: "61 €",
            answerB: "64 €",
            answerC: "66 €",
            answerD: "70 €",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "10 % de 60 = 6, donc 60 + 6 = 66."
        },
        {
            question: "Quelle valeur correspond à 40 % de 150 ?",
            answerA: "40",
            answerB: "50",
            answerC: "60",
            answerD: "75",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "40 % = 0,4 donc 0,4 x 150 = 60."
        },
        {
            question: "Après une réduction de 20 %, un prix devient 96 €. Prix initial ?",
            answerA: "100 €",
            answerB: "110 €",
            answerC: "120 €",
            answerD: "130 €",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "96 € représente 80 %, donc 96 ÷ 0,8 = 120 €."
        },
        {
            question: "4 kg coûtent 12 €. Combien coûtent 7 kg ?",
            answerA: "18 €",
            answerB: "20 €",
            answerC: "21 €",
            answerD: "24 €",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "12 x 7 ÷ 4 = 21 €."
        },
        {
            question: "6 cahiers coûtent 9 €. Combien coûtent 10 cahiers ?",
            answerA: "12 €",
            answerB: "15 €",
            answerC: "18 €",
            answerD: "20 €",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "9 x 10 ÷ 6 = 15 €."
        },
        {
            question: "5 m de fil pèsent 200 g. Quelle masse pour 8 m ?",
            answerA: "280 g",
            answerB: "300 g",
            answerC: "320 g",
            answerD: "360 g",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "200 x 8 ÷ 5 = 320 g."
        },
        {
            question: "12 ouvriers construisent un mur en 6 jours. En combien de jours 8 ouvriers le construisent-ils ?",
            answerA: "4",
            answerB: "6",
            answerC: "9",
            answerD: "12",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "Moins d'ouvriers → plus de temps : 12 x 6 ÷ 8 = 9 jours."
        },
        {
            question: "Une voiture consomme 6 L pour 100 km. Combien pour 250 km ?",
            answerA: "12 L",
            answerB: "13 L",
            answerC: "15 L",
            answerD: "18 L",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "6 x 250 ÷ 100 = 15 L."
        }
    ],
    "Pythagore" : [
        {
            question: "Qu'appelle-t-on un triangle rectangle ?",
            answerA: "Un triangle avec deux côtés égaux",
            answerB: "Un triangle avec un angle droit",
            answerC: "Un triangle avec trois angles aigus",
            answerD: "Un triangle dont les côtés sont proportionnels",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Un triangle rectangle est un triangle qui possède un angle droit."
        },
        {
            question: "Dans un triangle rectangle, comment s'appelle le côté opposé à l'angle droit ?",
            answerA: "Un côté adjacent",
            answerB: "Un côté perpendiculaire",
            answerC: "L'hypoténuse",
            answerD: "La médiane",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "L'hypoténuse est le plus long côté du triangle rectangle, opposé à l'angle droit."
        },
        {
            question: "Que permet de vérifier la réciproque du théorème de Pythagore ?",
            answerA: "Si un triangle est isocèle",
            answerB: "Si un triangle est équilatéral",
            answerC: "Si un triangle est rectangle",
            answerD: "Si un triangle est proportionnel",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "La réciproque permet de montrer qu'un triangle est rectangle à partir des longueurs."
        },
        {
            question: "Soit ABC un triangle rectangle en A tel que AB = 3 cm et AC = 4 cm. Quelle est la longueur BC ?",
            answerA: "5 cm",
            answerB: "6 cm",
            answerC: "7 cm",
            answerD: "12 cm",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "BC² = 3² + 4² = 9 + 16 = 25 donc BC = 5 cm."
        },
        {
            question: "Soit EFG un triangle rectangle en F tel que EF = 6 cm et FG = 8 cm. Calculer EG.",
            answerA: "10 cm",
            answerB: "12 cm",
            answerC: "14 cm",
            answerD: "48 cm",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "EG² = 6² + 8² = 36 + 64 = 100 donc EG = 10 cm."
        },
        {
            question: "Soit MNP un triangle rectangle en N avec MN = 5 cm et NP = 12 cm. Calculer MP.",
            answerA: "13 cm",
            answerB: "17 cm",
            answerC: "7 cm",
            answerD: "60 cm",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "MP² = 5² + 12² = 25 + 144 = 169 donc MP = 13 cm."
        },
        {
            question: "Dans le triangle RST rectangle en S, RS = 9 cm et ST = 12 cm. Quelle est la longueur RT ?",
            answerA: "15 cm",
            answerB: "18 cm",
            answerC: "21 cm",
            answerD: "108 cm",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "RT² = 9² + 12² = 81 + 144 = 225 donc RT = 15 cm."
        },
        {
            question: "Soit ABC un triangle rectangle en A tel que BC = 13 cm et AB = 5 cm. Calculer AC.",
            answerA: "8 cm",
            answerB: "10 cm",
            answerC: "12 cm",
            answerD: "18 cm",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "AC² = 13² - 5² = 169 - 25 = 144 donc AC = 12 cm."
        },
        {
            question: "Soit DEF un triangle rectangle en D tel que EF = 25 cm et DE = 7 cm. Calculer DF.",
            answerA: "18 cm",
            answerB: "20 cm",
            answerC: "24 cm",
            answerD: "32 cm",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "DF² = 25² - 7² = 625 - 49 = 576 donc DF = 24 cm."
        },
        {
            question: "Soit GHI un triangle rectangle en H avec GI = 10 cm et GH = 6 cm. Calculer HI.",
            answerA: "4 cm",
            answerB: "6 cm",
            answerC: "8 cm",
            answerD: "12 cm",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "HI² = 10² - 6² = 100 - 36 = 64 donc HI = 8 cm."
        },
        {
            question: "Soit ABC un triangle tel que AB = 6 cm, AC = 8 cm et BC = 10 cm. Le triangle est-il rectangle ?",
            answerA: "Oui, en A",
            answerB: "Oui, en B",
            answerC: "Oui, en C",
            answerD: "Non",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "6² + 8² = 36 + 64 = 100 = 10² donc le triangle est rectangle en A."
        },
        {
            question: "Soit DEF tel que DE = 7 cm, DF = 24 cm et EF = 25 cm. Le triangle est-il rectangle ?",
            answerA: "Oui, en D",
            answerB: "Oui, en E",
            answerC: "Oui, en F",
            answerD: "Non",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "7² + 24² = 49 + 576 = 625 = 25² donc triangle rectangle en D."
        },
        {
            question: "Soit GHI tel que GH = 5 cm, HI = 6 cm et GI = 8 cm. Le triangle est-il rectangle ?",
            answerA: "Oui",
            answerB: "Non",
            answerC: "Oui, en H",
            answerD: "Oui, en I",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "5² + 6² = 61 ≠ 64 donc le triangle n'est pas rectangle."
        },
        {
            question: "Soit RST tel que RS = 9 cm, ST = 40 cm et RT = 41 cm. Le triangle est-il rectangle ?",
            answerA: "Oui, en S",
            answerB: "Oui, en R",
            answerC: "Oui, en T",
            answerD: "Non",
            correctAnswer: "a",
            difficulty: "h",
            explanation: "9² + 40² = 81 + 1600 = 1681 = 41² donc triangle rectangle en S."
        }
    ],
    "Thalès" : [
        {
            question: "Dans quelle situation peut-on appliquer le théorème de Thalès ?",
            answerA: "Quand deux droites sont perpendiculaires",
            answerB: "Quand deux droites sont parallèles et coupent deux droites sécantes",
            answerC: "Quand un triangle est rectangle",
            answerD: "Quand deux angles sont égaux",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Le théorème de Thalès s'applique lorsque deux droites parallèles coupent deux droites sécantes en un point."
        },
        {
            question: "Que permet le théorème de Thalès ?",
            answerA: "Calculer un angle",
            answerB: "Comparer des aires",
            answerC: "Calculer une longueur manquante",
            answerD: "Savoir si un triangle est rectangle",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Le théorème de Thalès permet de calculer une longueur à partir de longueurs proportionnelles."
        },
        {
            question: "Quelle relation est vraie dans une configuration de Thalès ?",
            answerA: "AB + AC = BC",
            answerB: "AB / AC = AD / AE",
            answerC: "AB x AC = BC",
            answerD: "AB = AC",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Dans une configuration de Thalès, les longueurs sont proportionnelles."
        },
        {
            question: "Soit A un point. Les droites (AB) et (AC) sont sécantes en A. Les droites (BC) et (DE) sont parallèles. AB = 4 cm, AC = 6 cm, AD = 8 cm. Calculer AE.",
            answerA: "10 cm",
            answerB: "12 cm",
            answerC: "9 cm",
            answerD: "8 cm",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "AE / AC = AD / AB → AE = 6 x 8 / 4 = 12 cm."
        },
        {
            question: "Dans une figure de Thalès, AB = 3 cm, AC = 5 cm, AD = 6 cm. Calculer AE.",
            answerA: "8 cm",
            answerB: "9 cm",
            answerC: "10 cm",
            answerD: "7 cm",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "AE / AC = AD / AB → AE = 5 x 6 / 3 = 10 cm."
        },
        {
            question: "AB = 2 cm, AC = 4 cm, AD = 5 cm. Les droites (BC) et (DE) sont parallèles. Calculer AE.",
            answerA: "8 cm",
            answerB: "10 cm",
            answerC: "6 cm",
            answerD: "7 cm",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "AE / AC = AD / AB → AE = 4 x 5 / 2 = 10 cm."
        },
        {
            question: "AB = 6 cm, AC = 9 cm, AD = 10 cm. Calculer AE dans une configuration de Thalès.",
            answerA: "12 cm",
            answerB: "15 cm",
            answerC: "18 cm",
            answerD: "14 cm",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "AE = AC x AD / AB = 9 x 10 / 6 = 15 cm."
        },
        {
            question: "AB = 5 cm, AD = 7 cm, AE = 14 cm. Calculer AC.",
            answerA: "8 cm",
            answerB: "9 cm",
            answerC: "10 cm",
            answerD: "12 cm",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "AE / AC = AD / AB → AC = AE x AB / AD = 14 x 5 / 7 = 10 cm."
        },
        {
            question: "AB = 4 cm, AC = 10 cm, AE = 15 cm. Calculer AD.",
            answerA: "6 cm",
            answerB: "8 cm",
            answerC: "5 cm",
            answerD: "10 cm",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "AD = AB x AE / AC = 4 x 15 / 10 = 6 cm."
        },
        {
            question: "AB = 6 cm, AD = 9 cm, AE = 15 cm. Calculer AC.",
            answerA: "8 cm",
            answerB: "9 cm",
            answerC: "10 cm",
            answerD: "12 cm",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "AC = AE x AB / AD = 15 x 6 / 9 = 10 cm."
        }
    ],
    "Statistiques et Probabilités" : [
        {
            question: "Que représente la moyenne d'une série statistique ?",
            answerA: "La valeur la plus fréquente",
            answerB: "La somme des valeurs divisée par leur nombre",
            answerC: "La valeur du milieu",
            answerD: "La plus grande valeur",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "La moyenne est obtenue en divisant la somme des valeurs par l'effectif total."
        },
        {
            question: "Comment appelle-t-on le nombre total de valeurs d'une série ?",
            answerA: "La fréquence",
            answerB: "La médiane",
            answerC: "L'effectif total",
            answerD: "La moyenne",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "L'effectif total correspond au nombre total de données."
        },
        {
            question: "La médiane d'une série est :",
            answerA: "La moyenne des valeurs",
            answerB: "La valeur la plus fréquente",
            answerC: "La plus petite valeur",
            answerD: "La valeur qui partage la série en deux groupes de même effectif",
            correctAnswer: "d",
            difficulty: "e",
            explanation: "La médiane coupe la série ordonnée en deux parties égales."
        },
        {
            question: "Qu'est-ce qu'une fréquence ?",
            answerA: "Le nombre total de valeurs",
            answerB: "Le rapport entre un effectif et l'effectif total",
            answerC: "Le nombre de fois où une valeur apparaît",
            answerD: "La moyenne des valeurs",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Une fréquence est un quotient : effectif / effectif total."
        },
        {
            question: "Une probabilité est toujours comprise entre :",
            answerA: "-1 et 1",
            answerB: "0 et 100",
            answerC: "0 et 1",
            answerD: "1 et 10",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Une probabilité est un nombre compris entre 0 et 1."
        },
        {
            question: "Quand un événement est impossible, sa probabilité vaut :",
            answerA: "1",
            answerB: "0",
            answerC: "0,5",
            answerD: "-1",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Un événement impossible a une probabilité égale à 0."
        },
        {
            question: "Calcule la moyenne des nombres : 2 ; 4 ; 6 ; 8.",
            answerA: "4",
            answerB: "5",
            answerC: "6",
            answerD: "20",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "(2 + 4 + 6 + 8) ÷ 4 = 20 ÷ 4 = 5."
        },
        {
            question: "Quelle est la moyenne de : 10 ; 12 ; 8 ?",
            answerA: "10",
            answerB: "11",
            answerC: "9",
            answerD: "30",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "(10 + 12 + 8) ÷ 3 = 30 ÷ 3 = 10."
        },
        {
            question: "Une classe a les notes suivantes : 8, 10, 12, 10. Quelle est la moyenne ?",
            answerA: "9",
            answerB: "10",
            answerC: "11",
            answerD: "40",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "(8 + 10 + 12 + 10) ÷ 4 = 40 ÷ 4 = 10."
        },
        {
            question: "Quel est l'effectif total si une valeur apparaît 5 fois et une autre 7 fois ?",
            answerA: "2",
            answerB: "12",
            answerC: "35",
            answerD: "7",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "L'effectif total est la somme des effectifs : 5 + 7 = 12."
        },
        {
            question: "Dans une série de 20 élèves, 5 ont une note de 15. Quelle est la fréquence de 15 ?",
            answerA: "0,25",
            answerB: "5",
            answerC: "0,5",
            answerD: "15",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "Fréquence = 5 ÷ 20 = 0,25."
        },
        {
            question: "Quelle est la médiane de la série : 2 ; 4 ; 6 ; 8 ; 10 ?",
            answerA: "6",
            answerB: "5",
            answerC: "8",
            answerD: "4",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "La valeur centrale de la série ordonnée est 6."
        },
        {
            question: "Quelle est la médiane de : 3 ; 7 ; 9 ; 11 ?",
            answerA: "7",
            answerB: "9",
            answerC: "8",
            answerD: "10",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "Il y a un nombre pair de valeurs, on fait la moyenne des deux centrales : (7+9)/2 = 8."
        },
        {
            question: "Quelle est la somme des fréquences d'une série statistique ?",
            answerA: "0",
            answerB: "100",
            answerC: "1",
            answerD: "L'effectif total",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "La somme des fréquences est toujours égale à 1."
        },
        {
            question: "Quelle est la somme des fréquences d'une série statistique ?",
            answerA: "0",
            answerB: "100",
            answerC: "1",
            answerD: "L'effectif total",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "La somme des fréquences est toujours égale à 1."
        },
        {
            question: "On lance un dé équilibré. Quelle est la probabilité d'obtenir 3 ?",
            answerA: "1/3",
            answerB: "1/6",
            answerC: "1/2",
            answerD: "3",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Il y a 6 issues possibles et une seule favorable."
        },
        {
            question: "Dans un sac, il y a 5 billes rouges et 5 billes bleues. Quelle est la probabilité de tirer une bille rouge ?",
            answerA: "1/10",
            answerB: "1/2",
            answerC: "5",
            answerD: "1",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "5 billes rouges sur 10 billes au total."
        },
        {
            question: "Quelle est la probabilité d'un événement certain ?",
            answerA: "0",
            answerB: "0,5",
            answerC: "1",
            answerD: "100",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Un événement certain a une probabilité égale à 1."
        },
        {
            question: "Quelle est la probabilité d'un événement impossible ?",
            answerA: "0",
            answerB: "1",
            answerC: "-1",
            answerD: "0,5",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "Un événement impossible a une probabilité nulle."
        },
        {
            question: "Dans une urne contenant 3 boules vertes et 7 rouges, quelle est la probabilité de tirer une boule verte ?",
            answerA: "3/7",
            answerB: "7/10",
            answerC: "3/10",
            answerD: "1/3",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "3 issues favorables sur 10 issues possibles."
        },
        {
            question: "Quelle probabilité est la plus grande ?",
            answerA: "0,2",
            answerB: "1/5",
            answerC: "20%",
            answerD: "0,25",
            correctAnswer: "d",
            difficulty: "h",
            explanation: "0,25 = 25% est plus grand que 0,2 = 20% = 1/5."
        }
    ],
    "Repérage dans le plan" : [
        {
            question: "Comment s'appelle le point (0 ; 0) dans un repère ?",
            answerA: "Le centre",
            answerB: "L'origine",
            answerC: "L'axe",
            answerD: "Le milieu",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Le point (0 ; 0) est appelé l'origine du repère."
        },
        {
            question: "Dans un repère, combien y a-t-il d'axes ?",
            answerA: "1",
            answerB: "2",
            answerC: "3",
            answerD: "4",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Un repère du plan possède deux axes perpendiculaires."
        },
        {
            question: "Quel est le nom de l'axe horizontal ?",
            answerA: "Axe des ordonnées",
            answerB: "Axe vertical",
            answerC: "Axe des abscisses",
            answerD: "Axe des points",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "L'axe horizontal est l'axe des abscisses."
        },
        {
            question: "Quel est le nom de l'axe vertical ?",
            answerA: "Axe des ordonnées",
            answerB: "Axe vertical",
            answerC: "Axe des points",
            answerD: "Axe des ordonnées",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "L'axe vertical est l'axe des ordonnées."
        },
        {
            question: "Quelle est l'écriture correcte des coordonnées d'un point ?",
            answerA: "(y ; x)",
            answerB: "[x ; y]",
            answerC: "(x ; y)",
            answerD: "{x ; y}",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Les coordonnées s'écrivent sous la forme (abscisse ; ordonnée)."
        },
        {
            question: "L'abscisse correspond à :",
            answerA: "La position verticale",
            answerB: "La position horizontale",
            answerC: "La distance à l'origine",
            answerD: "La hauteur du point",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "L'abscisse indique la position horizontale du point."
        },
        {
            question: "Quelles sont les coordonnées du point A situé à 3 vers la droite et 2 vers le haut ?",
            answerA: "(2 ; 3)",
            answerB: "(3 ; -2)",
            answerC: "(-3 ; 2)",
            answerD: "(3 ; 2)",
            correctAnswer: "d",
            difficulty: "e",
            explanation: "On lit d'abord l'abscisse (3), puis l'ordonnée (2)."
        },
        {
            question: "Quel point a pour coordonnées (-4 ; 1) ?",
            answerA: "4 vers la gauche et 1 vers le haut",
            answerB: "4 vers la droite et 1 vers le haut",
            answerC: "1 vers la gauche et 4 vers le haut",
            answerD: "4 vers la gauche et 1 vers le bas",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "-4 signifie 4 vers la gauche, 1 signifie 1 vers le haut."
        },
        {
            question: "Si un point est sur l'axe des abscisses, son ordonnée vaut :",
            answerA: "1",
            answerB: "-1",
            answerC: "0",
            answerD: "x",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Sur l'axe des abscisses, l'ordonnée est nulle."
        },
        {
            question: "Si un point est sur l'axe des ordonnées, son abscisse vaut :",
            answerA: "0",
            answerB: "1",
            answerC: "-1",
            answerD: "y",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "Sur l'axe des ordonnées, l'abscisse est nulle."
        },
        {
            question: "Le point B a pour coordonnées (0 ; -3). Où se situe-t-il ?",
            answerA: "Sur l'axe des abscisses",
            answerB: "Sur l'axe des ordonnées",
            answerC: "Dans le premier quadrant",
            answerD: "À l'origine",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Abscisse 0 → point situé sur l'axe des ordonnées."
        },
        {
            question: "On part du point (1 ; 2) et on se déplace de 3 vers la droite. Quelles sont les nouvelles coordonnées ?",
            answerA: "(4 ; 2)",
            answerB: "(1 ; 5)",
            answerC: "(-2 ; 2)",
            answerD: "(3 ; 1)",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "Déplacement horizontal → on modifie l'abscisse."
        },
        {
            question: "On part du point (-2 ; 1) et on monte de 4. Quel est le nouveau point ?",
            answerA: "(2 ; 5)",
            answerB: "(-2 ; 5)",
            answerC: "(-6 ; 1)",
            answerD: "(-2 ; -3)",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Monter modifie uniquement l'ordonnée."
        },
    ],
    "Équations simples" : [
        {
            question: "Qu'est-ce qu'une équation ?",
            answerA: "Une expression sans égalité",
            answerB: "Une égalité avec un nombre inconnu",
            answerC: "Un calcul sans résultat",
            answerD: "Une opération impossible",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Une équation est une égalité dans laquelle on cherche la valeur d'un nombre inconnu."
        },
        {
            question: "Comment appelle-t-on la lettre dans une équation ?",
            answerA: "Une inconnue",
            answerB: "Un facteur",
            answerC: "Un coefficient",
            answerD: "Un terme",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "La lettre représente le nombre inconnu à trouver."
        },
        {
            question: "Que signifie résoudre une équation ?",
            answerA: "Calculer le membre de gauche",
            answerB: "Supprimer l'égalité",
            answerC: "Remplacer la lettre par 0",
            answerD: "Trouver la valeur de l'inconnue",
            correctAnswer: "d",
            difficulty: "e",
            explanation: "Résoudre une équation, c'est trouver la valeur qui rend l'égalité vraie."
        },
        {
            question: "Dans l'équation x + 3 = 7, que représente 7 ?",
            answerA: "L'inconnue",
            answerB: "Un coefficient",
            answerC: "Le second membre",
            answerD: "La solution",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "7 est le second membre de l'équation."
        },
        {
            question: "Une équation du premier degré contient :",
            answerA: "x²",
            answerB: "Une inconnue sans puissance",
            answerC: "Une seule inconnue au carré",
            answerD: "Plusieurs inconnues",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Une équation du premier degré contient une inconnue sans puissance."
        },
        {
            question: "Compléter : x + 5 = 12, x = ?",
            answerA: "5",
            answerB: "7",
            answerC: "17",
            answerD: "12",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "12 - 5 = 7."
        },
        {
            question: "Compléter : x - 4 = 9, x = ?",
            answerA: "5",
            answerB: "13",
            answerC: "36",
            answerD: "-5",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "9 + 4 = 13."
        },
        {
            question: "Compléter : 3 - x = 15, x = ?",
            answerA: "3",
            answerB: "-12",
            answerC: "5",
            answerD: "45",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "x = 3 - 15 = 12."
        },
        {
            question: "Compléter : x / 4 = 6, x = ?",
            answerA: "24",
            answerB: "10",
            answerC: "2",
            answerD: "6",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "x = 6 x 4 = 24."
        },
        {
            question: "Compléter : 2x = 18, x = ?",
            answerA: "16",
            answerB: "9",
            answerC: "36",
            answerD: "8",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "18 ÷ 2 = 9."
        },
        {
            question: "Résoudre : 3x + 2 = 11",
            answerA: "3",
            answerB: "13",
            answerC: "9",
            answerD: "5",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "3x = 9 donc x = 3."
        },
        {
            question: "Résoudre : 5x - 5 = 0",
            answerA: "0",
            answerB: "1",
            answerC: "5",
            answerD: "-1",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "5x = 5 donc x = 1."
        },
        {
            question: "Résoudre : 4x + 1 = 21",
            answerA: "6",
            answerB: "5",
            answerC: "20",
            answerD: "4",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "4x = 20 donc x = 5."
        },
         {
            question: "Résoudre : 2(x + 3) = 10",
            answerA: "7",
            answerB: "5",
            answerC: "2",
            answerD: "10",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "2x + 6 = 10 donc 2x = 4 et x = 2."
        },
        {
            question: "Résoudre : 5(x - 1) = 20",
            answerA: "5",
            answerB: "4",
            answerC: "3",
            answerD: "6",
            correctAnswer: "a",
            difficulty: "h",
            explanation: "5x - 5 = 20 donc 5x = 25 et x = 5."
        }
    ],
    "Puissances et notation scientifique" : [
        {
            question: "Que signifie l'écriture 3² ?",
            answerA: "3 x 2",
            answerB: "3 + 3",
            answerC: "3 x 3",
            answerD: "2 x 2",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "3² signifie 3 multiplié par lui-même deux fois : 3 x 3."
        },
        {
            question: "Quelle est la base dans l'expression 5³ ?",
            answerA: "3",
            answerB: "5",
            answerC: "15",
            answerD: "8",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "La base est le nombre que l'on multiplie : ici, c'est 5."
        },
        {
            question: "Comment s'appelle le nombre 4 dans l'expression 2⁴ ?",
            answerA: "La base",
            answerB: "Le coefficient",
            answerC: "L'exposant",
            answerD: "Le produit",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Dans une puissance, le petit nombre en haut s'appelle l'exposant."
        },
        {
            question: "Quelle écriture correspond à une puissance ?",
            answerA: "3 x 4",
            answerB: "3 + 3",
            answerC: "4³",
            answerD: "12 ÷ 3",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Une puissance s'écrit avec une base et un exposant, comme 4³."
        },
        {
            question: "Que représente une puissance ?",
            answerA: "Une addition répétée",
            answerB: "Une soustraction répétée",
            answerC: "Une multiplication répétée",
            answerD: "Une division répétée",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Une puissance correspond à une multiplication répétée du même nombre."
        },
        {
            question: "Quelle écriture correspond à un milliard ?",
            answerA: "10⁶",
            answerB: "10⁹",
            answerC: "10¹²",
            answerD: "9¹⁰",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Un milliard vaut 10⁹."
        },
        {
            question: "Quel nombre est égal à 10⁰ ?",
            answerA: "0",
            answerB: "1",
            answerC: "10",
            answerD: "100",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Par convention, toute puissance de 0 vaut 1."
        },
        {
            question: "Quelle est la valeur de 10¹ ?",
            answerA: "1",
            answerB: "10",
            answerC: "100",
            answerD: "0",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "10¹ = 10."
        },
        {
            question: "Combien de zéros y a-t-il dans 10⁷ ?",
            answerA: "6",
            answerB: "7",
            answerC: "8",
            answerD: "10",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "10⁷ est égal à 1 suivi de 7 zéros."
        },
        {
            question: "Quelle écriture correspond à dix mille ?",
            answerA: "10³",
            answerB: "10⁴",
            answerC: "10⁵",
            answerD: "4¹⁰",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Dix mille correspond à 10⁴."
        },
        {
            question: "Que signifie (1/2)² ?",
            answerA: "1 / 4",
            answerB: "2 / 2",
            answerC: "1 / 2",
            answerD: "2 / 4",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "(1/2)² = (1/2) x (1/2) = 1/4."
        },
        {
            question: "Comment calcule-t-on (a/b)² ?",
            answerA: "a² / b",
            answerB: "a / b²",
            answerC: "a² / b²",
            answerD: "2a / 2b",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "On élève le numérateur et le dénominateur au carré."
        },
        {
            question: "Quelle est la valeur de (1/4)³ ?",
            answerA: "1 / 12",
            answerB: "1 / 16",
            answerC: "1 / 64",
            answerD: "4 / 64",
            correctAnswer: "c",
            difficulty: "h",
            explanation: "(1/4)³ = 1³ / 4³ = 1 / 64."
        },
        {
            question: "Que devient une fraction lorsqu'on l'élève à une puissance ?",
            answerA: "Elle disparaît",
            answerB: "Elle reste identique",
            answerC: "Ses deux termes sont élevés à cette puissance",
            answerD: "Elle devient un entier",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "On applique la puissance au numérateur et au dénominateur."
        }
    ],
    "Grandeurs et mesures" : [
        {
            question: "Quelle est la formule de l'aire d'un rectangle ?",
            answerA: "longueur + largeur",
            answerB: "longueur x largeur",
            answerC: "2 x (longueur + largeur)",
            answerD: "longueur²",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "L'aire d'un rectangle est le produit de sa longueur par sa largeur."
        },
        {
            question: "Quelle est la formule du volume d'un pavé droit ?",
            answerA: "aire de base x hauteur",
            answerB: "longueur + largeur + hauteur",
            answerC: "longueur x largeur",
            answerD: "côté³",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "Le volume d'un pavé droit est égal à l'aire de la base multipliée par la hauteur."
        },
        {
            question: "Quelle unité est adaptée pour mesurer une aire ?",
            answerA: "m",
            answerB: "m²",
            answerC: "m³",
            answerD: "km",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Une aire s'exprime en unités carrées comme le m²."
        },
        {
            question: "Quelle est la formule de l'aire d'un carré de côté c ?",
            answerA: "A = 4 x c",
            answerB: "A = c x c",
            answerC: "A = c + c",
            answerD: "A = 2 x c",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Un carré a quatre côtés égaux. Son aire se calcule en multipliant la longueur du côté par elle-même : A = c x c."
        },
        {
            question: "De quelle grandeur dépend l'aire d'un carré ?",
            answerA: "De son périmètre",
            answerB: "De la longueur de son côté",
            answerC: "De sa diagonale",
            answerD: "De son nombre de côtés",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "L'aire d'un carré dépend uniquement de la longueur de son côté, car A = c x c."
        },
        {
            question: "Quelle est la formule de l'aire d'un triangle de base b et de hauteur h ?",
            answerA: "A = b x h",
            answerB: "A = (b + h) ÷ 2",
            answerC: "A = (b x h) ÷ 2",
            answerD: "A = 2 x b x h",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "L'aire d'un triangle est égale au produit de la base par la hauteur, divisé par 2."
        },
        {
            question: "À quoi correspond la hauteur d'un triangle dans la formule de l'aire ?",
            answerA: "À un côté quelconque",
            answerB: "À un côté parallèle à la base",
            answerC: "À la distance perpendiculaire entre la base et le sommet opposé",
            answerD: "À la moitié du périmètre",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "La hauteur est toujours perpendiculaire à la base choisie, même si elle est à l'extérieur du triangle."
        },
        {
            question: "Quelle est la formule de l'aire d'un cercle de rayon r ?",
            answerA: "A = 2 x π x r",
            answerB: "A = π x r",
            answerC: "A = π x r²",
            answerD: "A = π ÷ r",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "L'aire d'un cercle se calcule avec la formule A = π x r², où r est le rayon."
        },
        {
            question: "Quelle grandeur utilise-t-on dans la formule de l'aire du cercle ?",
            answerA: "Le diamètre",
            answerB: "Le rayon",
            answerC: "Le périmètre",
            answerD: "L'arc de cercle",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "La formule de l'aire du cercle utilise le rayon, qui est la moitié du diamètre."
        },
        {
            question: "Quelle est la formule du volume d'un cube de côté c ?",
            answerA: "V = 6 x c²",
            answerB: "V = c x c",
            answerC: "V = c³",
            answerD: "V = 4 x c³",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Un cube a trois dimensions égales. Son volume est le produit du côté par lui-même trois fois : c x c x c."
        },
        {
            question: "Le volume d'un cube dépend :",
            answerA: "De la longueur de son côté",
            answerB: "De son périmètre",
            answerC: "De la surface totale",
            answerD: "Du nombre de faces",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "Le volume dépend uniquement de la longueur du côté du cube."
        },
        {
            question: "Quelle est la formule du volume d'un cône de rayon r et de hauteur h ?",
            answerA: "V = π x r² x h",
            answerB: "V = (π x r² x h) ÷ 3",
            answerC: "V = 2 x π x r x h",
            answerD: "V = π x r x h",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Le volume d'un cône est égal au tiers du volume du cylindre de même base et de même hauteur."
        },
        {
            question: "Le volume d'un cône est égal à :",
            answerA: "La moitié du volume d'un cylindre de même base et hauteur",
            answerB: "Le tiers du volume d'un cylindre de même base et hauteur",
            answerC: "Le double du volume d'un cylindre",
            answerD: "Le quart du volume d'un cylindre",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Un cône occupe exactement un tiers du volume du cylindre correspondant."
        },
        {
            question: "Quelle est la formule du volume d'une sphère de rayon r ?",
            answerA: "V = 4 x π x r²",
            answerB: "V = (4 ÷ 3) x π x r³",
            answerC: "V = π x r³",
            answerD: "V = 2 x π x r³",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Le volume d'une sphère se calcule avec la formule V = (4/3) x π x r³."
        },
        {
            question: "Quelle grandeur est nécessaire pour calculer le volume d'une sphère ?",
            answerA: "Le diamètre",
            answerB: "La surface",
            answerC: "Le rayon",
            answerD: "La hauteur",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "La formule du volume de la sphère utilise uniquement le rayon."
        },
        {
            question: "Calculer l'aire d'un rectangle de 7 cm sur 4 cm.",
            answerA: "11 cm²",
            answerB: "28 cm²",
            answerC: "44 cm²",
            answerD: "14 cm²",
            correctAnswer: "b",
            difficulty: "e",
            explanation: "Aire = 7 x 4 = 28 cm²."
        },
        {
            question: "Calculer l'aire d'un carré de côté 9 cm.",
            answerA: "18 cm²",
            answerB: "36 cm²",
            answerC: "81 cm²",
            answerD: "27 cm²",
            correctAnswer: "c",
            difficulty: "e",
            explanation: "Aire du carré = côté x côté = 9 x 9 = 81 cm²."
        },
        {
            question: "Calculer l'aire d'un triangle de base 12 cm et de hauteur 5 cm.",
            answerA: "30 cm²",
            answerB: "60 cm²",
            answerC: "17 cm²",
            answerD: "24 cm²",
            correctAnswer: "a",
            difficulty: "e",
            explanation: "Aire = (12 x 5) ÷ 2 = 30 cm²."
        },
        {
            question: "Un rectangle a une aire de 48 cm² et une largeur de 6 cm. Quelle est sa longueur ?",
            answerA: "8 cm",
            answerB: "6 cm",
            answerC: "42 cm",
            answerD: "12 cm",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "Longueur = 48 ÷ 6 = 8 cm."
        },
        {
            question: "Un triangle a une aire de 20 cm² et une base de 8 cm. Quelle est sa hauteur ?",
            answerA: "2,5 cm",
            answerB: "4 cm",
            answerC: "5 cm",
            answerD: "10 cm",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "20 = (8 x h) ÷ 2 ⟹ h = 4 cm."
        },
        {
            question: "Un rectangle a une aire de 48 cm² et une largeur de 6 cm. Quelle est sa longueur ?",
            answerA: "8 cm",
            answerB: "6 cm",
            answerC: "42 cm",
            answerD: "12 cm",
            correctAnswer: "a",
            difficulty: "m",
            explanation: "Longueur = 48 ÷ 6 = 8 cm."
        },
        {
            question: "Un triangle a une aire de 20 cm² et une base de 8 cm. Quelle est sa hauteur ?",
            answerA: "2,5 cm",
            answerB: "4 cm",
            answerC: "5 cm",
            answerD: "10 cm",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "20 = (8 x h) ÷ 2 ⟹ h = 4 cm."
        },
        {
            question: "Un pavé droit a une base de 10 cm² et une hauteur de 7 cm. Calculer son volume.",
            answerA: "17 cm³",
            answerB: "70 cm³",
            answerC: "140 cm³",
            answerD: "35 cm³",
            correctAnswer: "b",
            difficulty: "m",
            explanation: "Volume = aire de base x hauteur = 10 x 7 = 70 cm³."
        },
        {
            question: "Un cube a un volume de 125 cm³. Quelle est la longueur de son arête ?",
            answerA: "3 cm",
            answerB: "4 cm",
            answerC: "5 cm",
            answerD: "6 cm",
            correctAnswer: "c",
            difficulty: "m",
            explanation: "5³ = 125, donc l'arête mesure 5 cm."
        },
    ]
}