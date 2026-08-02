import z from "zod";

const dateErrorMessage = 'Veuillez soumettre une date valide.';
const animatorIdError = 'Animateur non identifié.';
const seanceIdError = 'Seance non identifiée.';
const lessonIdError = 'Leçon non identifiée.';
const studentIdError = 'Élève non identifié.';

const sharedFields = {
    date:       z.iso.datetime({ error: dateErrorMessage }),
    seanceId:   z.int().min(1,  { error: seanceIdError }),
    animatorId: z.int().min(1,  { error: animatorIdError }),
    studentId:  z.int().min(1,  { error: studentIdError }),
}

const presentBilanSchema = z.object({
    ...sharedFields,
    presence: z.literal(true),
    lessonId: z.int().min(1, { error: lessonIdError }),
    summary:  z.string().min(1, { error: 'Résumé de séance invalide.' }),
})

const absentBilanSchema = z.object({
    ...sharedFields,
    presence: z.literal(false),
    lessonId: z.never().optional(),
    summary:  z.never().optional(),
})

export const bilanSchema = z.discriminatedUnion('presence', [
    presentBilanSchema,
    absentBilanSchema,
])

export type BilanInput = z.infer<typeof bilanSchema>;
// const dateSchema = z.iso.datetime({error : dateErrorMessage});
// const seanceIdSchema = z.int().min(0, {error : seanceIdError});
// const animatorIdSchema = z.int().min(0, {error : animatorIdError});
// const lessonIdSchema = z.int().min(0, {error : lessonIdError});
// const studentIdSchema = z.int().min(0, {error : studentIdError});
// const presenceSchema = z.boolean({error : 'Donnée de présence invalide.'});
// const summarySchema = z.string({error : 'Résumé de séance invalide.'});

// export const bilanSchema = z.object({
//     date : dateSchema,
//     seanceId : seanceIdSchema,
//     animatorId : animatorIdSchema,
//     studentId : studentIdSchema,
//     lessonId : lessonIdSchema,
//     presence : presenceSchema,
//     summary : summarySchema,
// })