import z from "zod";

export const LESSON_EVALS = ['notAquired', 'acquiring', 'acquired', 'expert'] as const;

export const lessonEvalSchema = z.object({
    animatorId : z.int().positive({error : 'Identifiant animateur pas valide.'}),
    studentId : z.int().positive({error : 'Identifiant élève pas valide.'}),
    lessonId : z.int().positive({error : 'Identifiant leçon pas valide.'}),
    evaluation : z.enum(LESSON_EVALS,{error : 'Évaluation pas valide.'}),
})