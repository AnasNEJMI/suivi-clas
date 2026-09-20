import z from "zod";

const dateErrorMessage = 'Veuillez soumettre une date valide.';
const animatorError = 'Identifiant animateur pas valide.';
const classError = 'Veuillez choisir une classe.';
const seanceDurationError = 'Veuillez choisir une durée de séance valide.';
const dateSchema = z.date({error : dateErrorMessage});
const classSchema = z.int().positive({error : classError});
const animatorSchema = z.int().positive({error : animatorError});
const seanceDurationSchema = z.int().positive({error : seanceDurationError});

export const SeanceFormSchema = z.object({
    animatorId : animatorSchema,
    classId : classSchema,
    date : dateSchema,
    seanceDurationId : seanceDurationSchema
})

export type SeanceFormValues = z.infer<typeof SeanceFormSchema>