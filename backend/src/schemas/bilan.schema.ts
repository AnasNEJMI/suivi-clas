import z from "zod";

const dateErrorMessage = 'Veuillez soumettre une date valide.';
const animatorIdError = 'Animateur non identifié.';
const seanceIdError = 'Seance non identifiée.';
const lessonIdError = 'Leçon non identifiée.';
const studentIdError = 'Élève non identifié.';

const dateSchema = z.iso.datetime({error : dateErrorMessage});
const seanceIdSchema = z.int().min(0, {error : seanceIdError});
const animatorIdSchema = z.int().min(0, {error : animatorIdError});
const lessonIdSchema = z.int().min(0, {error : lessonIdError});
const studentIdSchema = z.int().min(0, {error : studentIdError});
const presenceSchema = z.boolean({error : 'Donnée de présence invalide.'});
const summarySchema = z.string({error : 'Résumé de séance invalide.'});

export const bilanSchema = z.object({
    date : dateSchema,
    seanceId : seanceIdSchema,
    animatorId : animatorIdSchema,
    studentId : studentIdSchema,
    lessonId : lessonIdSchema,
    presence : presenceSchema,
    summary : summarySchema,
})