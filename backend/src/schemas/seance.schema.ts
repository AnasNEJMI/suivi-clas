import z from "zod";

const dateErrorMessage = 'Veuillez soumettre une date valide.';
const animatorIdError = 'Animateur non identifié.';
const classIdError = 'Classe non identifiée.';
const scolarYearIdError = 'Année scolaire invalide.';
const dateSchema = z.iso.datetime({error : dateErrorMessage});
const animatorIdSchema = z.int().min(0, {error : animatorIdError});
const classIdSchema = z.int().min(0, {error : classIdError});
const scolarYearIdSchema = z.int().min(0, {error : scolarYearIdError});

export const seanceSchema = z.object({
    date : dateSchema,
    classId : classIdSchema,
    animatorId : animatorIdSchema,
    scolarYearId : scolarYearIdSchema,
})