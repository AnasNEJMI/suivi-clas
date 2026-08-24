import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { GoogleGenAI } from "@google/genai";
import { error } from "node:console";
import { appendFileSync, writeFileSync } from "node:fs";

// Prisma Client Setup
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

if (gemini) console.log('✓ Gemini SDK setup success');

const CONFIG = {
  maxQuestionsPerDifficulty: 100,
  generatedQuestionsPerDifficulty: 20,
  delayBetweenCalls: 15000,
  maxRetries: 3,
};


const GEMINI_MODELS = [
  // 'gemini-3.7-flash',
  // 'gemini-3.6-flash',
  // 'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
] as const;

type GeminiModel = typeof GEMINI_MODELS[number];

const ModelExausted : Record<GeminiModel, boolean> = {
  // 'gemini-3.7-flash' : false,
  // 'gemini-3.6-flash' : false,
  // 'gemini-3.5-flash' : false,
  'gemini-3.5-flash-lite' : false,
  'gemini-3.1-flash-lite' : false,
}

function buildBatchedPromptEvenMoreEnhanced(
  lesson: string,
  subject: string,
  level: string,
  countPerDifficulty: number,
): string {
  const total = countPerDifficulty * 3;

  return `Tu es un professeur expert de ${subject} niveau ${level} (programme Éducation Nationale française), spécialisé dans la création de QCM de haute qualité pédagogique.

Ta mission : générer exactement ${total} questions QCM pour la leçon "${lesson}".

═══════════════════════════════════════════════════════════
RÉPARTITION OBLIGATOIRE (${countPerDifficulty} questions par niveau) :
═══════════════════════════════════════════════════════════
— ${countPerDifficulty} questions de difficulté "e" (FACILE)
    → Rappel direct d'une définition, d'une formule ou d'un résultat du cours.
    → Un élève ayant suivi le cours trouve la réponse sans calcul complexe.
    → Exemples de formulations : "Laquelle de ces affirmations est vraie ?",
      "Quelle est la formule de... ?", "Que vaut... dans le cas où... ?"

— ${countPerDifficulty} questions de difficulté "m" (INTERMÉDIAIRE)
    → Compréhension et application : l'élève doit effectuer un ou deux calculs,
      ou reconnaître dans quel cas appliquer une propriété.
    → Exemples de formulations : "Calculer...", "Déterminer...",
      "Parmi ces expressions, laquelle est équivalente à... ?"

— ${countPerDifficulty} questions de difficulté "h" (DIFFICILE)
    → Analyse, raisonnement, combinaison de plusieurs notions du chapitre,
      ou transfert vers un contexte nouveau.
    → Exemples de formulations : "On considère... Que peut-on conclure ?",
      "Laquelle de ces démarches est correcte ?", "Quelle est l'erreur dans... ?"

═══════════════════════════════════════════════════════════
CATALOGUE DES TYPES DE QUESTIONS — 14 TYPES DISPONIBLES :
═══════════════════════════════════════════════════════════
Chaque question doit appartenir à exactement UN type.
Répartis les ${total} questions sur AU MINIMUM 7 types différents.
NE PAS générer deux questions du même type consécutivement.

─────────────────────────────────────────────────────────
[TYPE 1 — CALCUL NUMÉRIQUE]
  Application directe d'une formule avec des valeurs numériques données.
  L'élève substitue les valeurs et calcule.
  Exemple : "Si a = 3 et b = 4, que vaut a² + b² ?"

[TYPE 2 — RAISONNEMENT LOGIQUE]
  L'élève doit déduire une conclusion à partir d'hypothèses,
  ou évaluer la validité d'un raisonnement.
  Formulations : "Laquelle de ces affirmations est NÉCESSAIREMENT vraie ?",
  "Quelle condition est suffisante pour que... ?"

[TYPE 3 — IDENTIFICATION D'ERREUR]
  Un raisonnement ou calcul erroné est présenté étape par étape.
  L'élève identifie précisément quelle étape est incorrecte et pourquoi.
  Formulation : "Un élève résout ce problème ainsi : [étapes]. À quelle étape commet-il une erreur ?"

[TYPE 4 — INTERPRÉTATION DE RÉSULTAT]
  Un résultat, une valeur ou une expression est donné.
  L'élève doit expliquer ce qu'il signifie dans le contexte.
  Formulation : "On trouve x = −3. Que signifie ce résultat dans le contexte du problème ?"

[TYPE 5 — CONTEXTE RÉEL / MODÉLISATION]
  Situation de la vie quotidienne, d'une autre discipline
  (physique, économie, géographie, sport, architecture) ou d'un problème pratique.
  L'élève modélise la situation avec les outils mathématiques de la leçon.

[TYPE 6 — COMPARAISON / CLASSEMENT]
  Plusieurs expressions, valeurs ou résultats sont donnés.
  L'élève les ordonne, identifie le plus grand, le plus petit,
  ou détermine s'ils sont équivalents.
  Formulation : "Classifie ces trois expressions par ordre croissant."

[TYPE 7 — CONTRE-EXEMPLE / PIÈGE]
  Une propriété ou affirmation apparemment vraie est présentée.
  L'élève identifie dans quel cas elle ne s'applique pas.
  Formulation : "Dans laquelle de ces situations la propriété X est-elle invalide ?"

[TYPE 8 — DÉFINITION / VOCABULAIRE]
  Maîtrise précise du vocabulaire mathématique du chapitre.
  Formulations : "Laquelle de ces définitions est correcte ?",
  "Comment appelle-t-on... ?", "Quel terme désigne... ?"

[TYPE 9 — COMPLÉTION D'UNE DÉMONSTRATION]
  Une démonstration ou un calcul est présenté avec une étape manquante
  (indiquée par "...").
  L'élève choisit quelle expression ou justification complète correctement le trou.
  Formulation : "Dans cette démonstration, l'étape manquante est :"
  Exemple :
    "Ligne 1 : AB² = ...
     Ligne 2 : AB² = 9 + 16
     Ligne 3 : AB = 5
     L'étape manquante à la ligne 1 est :"

[TYPE 10 — ORDRE DES ÉTAPES / PROCÉDURE]
  Les étapes d'une résolution ou d'une démonstration sont données dans le désordre.
  L'élève identifie l'ordre logique correct.
  Formulation : "Voici les étapes pour résoudre ce problème, dans le désordre.
  Quelle est la séquence correcte ?"
  Les propositions sont des séquences : "1→3→2→4", "2→1→3→4", etc.

[TYPE 11 — CAS PARTICULIER / CAS LIMITE]
  L'élève applique la notion à un cas extrême, nul, ou spécial
  pour tester sa compréhension des conditions d'application.
  Formulations : "Que se passe-t-il lorsque x = 0 ?",
  "Dans le cas particulier où le triangle est équilatéral, que vaut... ?",
  "Que devient la formule si n tend vers l'infini ?"

[TYPE 12 — ÉQUIVALENCE DE REPRÉSENTATIONS]
  Plusieurs représentations d'un même objet mathématique sont proposées
  (écriture fractionnaire, décimale, pourcentage ; forme développée et factorisée ;
  équation et graphe ; tableau et formule...).
  L'élève identifie lesquelles sont équivalentes.
  Formulation : "Laquelle de ces écritures est équivalente à [expression] ?"

[TYPE 13 — CONDITION NÉCESSAIRE ET SUFFISANTE]
  L'élève doit identifier quelle condition doit être vérifiée
  pour qu'une propriété, un théorème ou une conclusion soit valide.
  Formulation : "Pour que la formule X soit applicable, il faut impérativement que :",
  "Laquelle de ces conditions garantit que... ?"

[TYPE 14 — LECTURE DE DONNÉES / REPRÉSENTATION]
  Un jeu de données est décrit : tableau de valeurs, liste de mesures,
  description verbale d'un graphe ou d'une figure géométrique.
  L'élève extrait une information, calcule une grandeur dérivée,
  ou tire une conclusion à partir de ces données.
  Formulation : "Le tableau suivant donne les valeurs de f(x).
  D'après ces données, laquelle de ces affirmations est correcte ?"
─────────────────────────────────────────────────────────

RÈGLE DE DISTRIBUTION :
  — Minimum 7 types différents utilisés sur les ${total} questions.
  — Aucun type utilisé plus de ${Math.ceil(total / 5)} fois.
  — Les types 9, 10, 11, 12, 13, 14 sont nouveaux et moins courants :
    chacun doit apparaître au moins UNE FOIS dans les ${total} questions.

═══════════════════════════════════════════════════════════
RÈGLES DE QUALITÉ — PROPOSITIONS (A, B, C, D) :
═══════════════════════════════════════════════════════════
— 4 propositions par question, 1 seule correcte.
— Les 3 distracteurs DOIVENT être PLAUSIBLES :
    • Au moins 1 correspond à une erreur de calcul classique
      (signe oublié, mauvais ordre des opérations, confusion de formule).
    • Au moins 1 correspond à une confusion conceptuelle fréquente
      (ex : confondre diamètre et rayon, périmètre et aire, nécessaire et suffisant).
    • Aucun distracteur ne doit être trivialement faux ou absurde.
— Les 4 propositions doivent être de longueur et de forme comparables.
— Ne jamais utiliser "Toutes les réponses" ou "Aucune de ces réponses".
— Varier la position de la bonne réponse : répartir équitablement entre a, b, c, d.

═══════════════════════════════════════════════════════════
RÈGLES DE QUALITÉ — EXPLICATIONS :
═══════════════════════════════════════════════════════════
— 2 à 3 phrases par explication.
— Structure obligatoire en 3 points :
    1. Nommer la propriété / formule / règle utilisée.
    2. Montrer brièvement pourquoi la bonne réponse est correcte.
    3. Identifier l'erreur qui conduit au distracteur le plus courant.
— Exemple d'explication de qualité :
  "Le théorème de Pythagore s'applique uniquement aux triangles rectangles.
   Ici, AC² = AB² + BC² = 9 + 16 = 25, donc AC = 5 cm.
   L'erreur fréquente est d'additionner AB + BC directement sans élever au carré."
— Ne jamais écrire une explication qui se contente de répéter la bonne réponse.

═══════════════════════════════════════════════════════════
RÈGLES ABSOLUES :
═══════════════════════════════════════════════════════════
— Les ${total} questions DOIVENT couvrir des aspects différents de "${lesson}".
— Tout le contenu en FRANÇAIS.
— Chaque question est autonome et compréhensible sans les autres.
— Le champ "difficulty" contient exactement "e", "m", ou "h".
— Le champ "correctAnswer" contient exactement "a", "b", "c", ou "d".

Réponds UNIQUEMENT avec du JSON valide, sans backticks ni texte avant ou après.
Format :
{
  "questions": [
    {
      "difficulty": "e",
      "question": "...",
      "answerA": "...",
      "answerB": "...",
      "answerC": "...",
      "answerD": "...",
      "correctAnswer": "a",
      "explanation": "..."
    }
  ]
}`;
}

// Helper to identify rate limit errors
function isRateLimitError(error: any): boolean {
  const msg = String(error).toLowerCase();
  return (
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('resource_exhausted') ||
    msg.includes('rate limit')
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function stripFences(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
}

async function callBestAvailableProvider(
  prompt: string,
) : Promise<any[]>{
    console.log('Calling best Gemini provider.')
    if(!gemini) {
      throw error('Please setup Gemini correctly before attempting to call API.'); 
    }
    for(const model of GEMINI_MODELS){
      console.log(`calling model ${model} ...`)
      if(!ModelExausted[model]){
        console.log(`Model ${model} not exausted yet ...`)
        try{
          const interaction = await gemini.interactions.create({
            model,
            input: prompt,
          });

          const rawText = interaction.output_text ?? '';
          console.log('Gemini Output : ', rawText);
          const qcmData = JSON.parse(stripFences(rawText));
          if (qcmData.questions?.length) return qcmData.questions;
          throw new Error('Invalid output structure from Gemini');
        }catch(e){
          appendFileSync('prisma/qcm-invalid-output.json', JSON.stringify(e, null, 2));
          console.error('Gemini error:', String(e).slice(0, 120));
          if (isRateLimitError(e)) {
            ModelExausted[model] = true;
            console.log(`⚠ Gemini model ${model} daily quota exhausted → switching to next model.`);
          } else {
            throw e; // Rethrow non-quota errors immediately
          }
        }
      }
    }

    throw new Error('All providers exhausted for today. Re-run tomorrow.');
}

async function main() {
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      label: true,
      subject: { select: { label: true } },
      level: { select: { label: true } },
    },
    orderBy: { id: 'asc' },
  });

   const totalPerLesson = CONFIG.maxQuestionsPerDifficulty * 3;
  console.log(`\n🤖 Generating QCM for ${lessons.length} lessons (${totalPerLesson} questions each in batched requests)\n`);

  let created = 0;
  const errors: string[] = [];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i]!;
    const existing = await prisma.qcmBankQuestion.count({ where: { lessonId: lesson.id } });

    if (existing >= totalPerLesson) {
      console.log(`[${i + 1}/${lessons.length}] ⏭ ${lesson.label} (already generated)`);
      continue;
    }

    console.log(`[${i + 1}/${lessons.length}] ${lesson.level.label} | ${lesson.subject.label} | ${lesson.label}`);

    await sleep(CONFIG.delayBetweenCalls);

    try {
      const prompt = buildBatchedPromptEvenMoreEnhanced(
        lesson.label,
        lesson.subject.label,
        lesson.level.label,
        CONFIG.generatedQuestionsPerDifficulty
      );

      const questions = await callBestAvailableProvider(prompt);

      const { count } = await prisma.qcmBankQuestion.createMany({
        data: questions.map((q: any) => ({
          lessonId: lesson.id,
          question: q.question,
          difficulty: q.difficulty,
          answerA: q.answerA,
          answerB: q.answerB,
          answerC: q.answerC,
          answerD: q.answerD,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        })),
        skipDuplicates: true,
      });

      created += count;
      console.log(`✓ Saved ${count} questions for "${lesson.label}"`);
    } catch (e) {
      errors.push(`${lesson.label}: ${String(e).slice(0, 80)}`);
      console.error(`✗ Error processing ${lesson.label}:`, e);

      if (Object.values(ModelExausted).every(Boolean)) {
        console.log('⚠ All Gemini models exhausted. Stopping run.');
        break;
      }
    }
  }

  console.log(`\n✅ Done — ${created} questions created, ${errors.length} errors`);
  if (errors.length) errors.forEach((e) => console.log(`  ✗ ${e}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());