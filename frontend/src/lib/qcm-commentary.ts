import type { ScoreLevel } from "./skill-eval-score-level";

export type QcmFeedback = { headline: string; message: string; tip: string }

type Input = { score: number; total: number; perfect: boolean; level: ScoreLevel['id']; seed: number }

export function qcmFeedback({ score, total, perfect, level, seed }: Input): QcmFeedback {
  const missed   = total - score
  const toReview = missed > 1 ? 'les questions à revoir' : 'la question à revoir'

  const variants: QcmFeedback[] = (() => {
    if (perfect) return [
      {
        headline: 'Sans-faute, bravo !',
        message:  `${total} réponses justes sur ${total} : tu maîtrises cette leçon. Ce résultat récompense le travail que tu as fait en séance et chez toi.`,
        tip:      "Pour aller encore plus loin, essaie d'expliquer la leçon à quelqu'un : c'est la meilleure façon de la retenir longtemps.",
      },
      {
        headline: 'Parfait, quel beau résultat !',
        message:  "Chaque question était réussie. Tu as montré que tu avais bien compris les notions de cette leçon, et ça se voit.",
        tip:      'Garde ce rythme : relire ta leçon de temps en temps suffira à garder tout ça en mémoire.',
      },
    ]

    switch (level) {
      case 'excellent': return [
        {
          headline: 'Excellent travail !',
          message:  `${score} bonnes réponses sur ${total} : il s'en est fallu de très peu pour le sans-faute. Les notions de cette leçon sont solidement installées.`,
          tip:      `Regarde la correction de ${toReview} : en comprenant ce petit détail, un presque parfait devient un parfait.`,
        },
        {
          headline: 'Très impressionnant !',
          message:  `Tu as réussi ${score} questions sur ${total}. Ton travail porte ses fruits et ça se voit dans tes réponses.`,
          tip:      `Prends deux minutes pour lire ${toReview} : c'est le dernier pas vers le sans-faute.`,
        },
      ]
      case 'great': return [
        {
          headline: 'Très belle réussite !',
          message:  `${score} bonnes réponses sur ${total} : l'essentiel de la leçon est bien compris, bravo.`,
          tip:      `Lis les explications de ${toReview} : quelques détails à affiner et tu y es.`,
        },
        {
          headline: 'Tu es sur la très bonne voie',
          message:  'Tes réponses montrent de vraies bases solides. Les quelques erreurs sont des pistes précises pour progresser encore.',
          tip:      'Refais le QCM après avoir relu la correction : tu verras ton score grimper.',
        },
      ]
      case 'good': return [
        {
          headline: 'Une bonne base pour progresser',
          message:  `${score} questions sur ${total} réussies : tu as déjà compris une bonne partie de la leçon.`,
          tip:      `Relis la correction de ${toReview}, puis la leçon : chaque erreur te dit exactement où te concentrer.`,
        },
        {
          headline: 'Tu y es presque',
          message:  'Plus de la moitié de la leçon est acquise, et c\'est un vrai point d\'appui. Il reste quelques notions à consolider.',
          tip:      "Choisis une notion à revoir aujourd'hui et une autre demain : de petits efforts réguliers valent mieux qu'une grande séance.",
        },
      ]
      case 'progress': return [
        {
          headline: 'Tu avances, continue !',
          message:  `Tu as réussi ${score} questions sur ${total}. Certaines notions sont encore fragiles, et c'est tout à fait normal : un QCM sert justement à les repérer.`,
          tip:      'Reprends les corrections une par une, puis refais le QCM pour mesurer tes progrès.',
        },
        {
          headline: 'Chaque QCM te fait progresser',
          message:  `Ce résultat montre les notions sur lesquelles te concentrer, et c'est précieux. Tu as déjà ${score} réponses justes sur lesquelles t'appuyer.`,
          tip:      "Demande un coup de main à ton animateur sur les points qui te bloquent : il est là pour ça.",
        },
      ]
      case 'building': return [
        {
          headline: 'Un premier pas important',
          message:  "Ce QCM t'a montré les notions à travailler en priorité, et c'est très utile. Personne ne maîtrise une leçon du premier coup.",
          tip:      'Relis la leçon calmement, puis lis les explications de la correction. Tu pourras ensuite retenter : tu vas progresser vite.',
        },
        {
          headline: 'On repart sur de bonnes bases',
          message:  "Ce qui compte, c'est que tu aies essayé : la correction va t'aider à comprendre chaque notion, une par une.",
          tip:      "Parles-en avec ton animateur à la prochaine séance : vous reverrez ensemble les notions qui t'ont posé problème.",
        },
      ]
    }
  })()

  return variants[Math.abs(seed) % variants.length]!
}