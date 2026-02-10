import z from "zod";
import {CLASS_NAMES, type ClassName} from "../types/data.types";


const dateErrorMessage = 'Veuillez soumettre une date valide.';
const classNameError = 'Veuillez soumettre une classe valide.';
const studentError = 'Veuillez choisir un étudiant.';
const subjectError = 'Veuillez choisir une matière.';
const lessonError = 'Veuillez choisir une leçon.';
const presenceError = "Veuillez sélectionner si l'élève était présent ou pas.";
const bilanError = 'Veuillez choisir un bilan.';

const dateSchema = z.date({error : dateErrorMessage});
const classNameSchema = z.string()
                        .min(1, {error : classNameError})
                        .refine((value) => CLASS_NAMES.includes(value as ClassName));
const studentSchema = z.int().min(0, {error : studentError});
const subjectSchema = z.string({error : subjectError});
const lessonIdSchema = z.int().min(-1, {error : lessonError});
const presenceSchema = z.boolean({error : presenceError});
const summarySchema = z.string({error : bilanError});

export const addBilanSchema = z.object({
    date : dateSchema,
    className : classNameSchema,
    studentId : studentSchema,
    subject : subjectSchema,
    lessonId : lessonIdSchema,
    summary : summarySchema,
    presence : presenceSchema,
})