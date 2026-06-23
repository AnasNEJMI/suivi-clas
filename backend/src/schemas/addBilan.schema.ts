import z from "zod";

const dateErrorMessage = 'Veuillez soumettre une date valide.';
const studentError = 'Veuillez choisir un étudiant.';
const subjectError = 'Veuillez choisir une matière.';
const lessonError = 'Veuillez choisir une leçon.';
const presenceError = "Veuillez sélectionner si l'élève était présent ou pas.";
const bilanError = 'Veuillez choisir un bilan.';

const dateSchema = z.iso.datetime({error : dateErrorMessage});
const studentSchema = z.int().min(0, {error : studentError});
const subjectSchema = z.string({error : subjectError});
const lessonSchema = z.int().min(-1, {error : lessonError});
const presenceSchema = z.boolean({error : presenceError});
const summarySchema = z.string({error : bilanError});

export const addBilanSchema = z.object({
    date : dateSchema,
    userId : studentSchema,
    subject : subjectSchema,
    lessonId : lessonSchema,
    summary : summarySchema,
    presence : presenceSchema,
})