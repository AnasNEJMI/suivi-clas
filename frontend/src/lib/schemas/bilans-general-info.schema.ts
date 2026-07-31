import z from "zod";

const dateErrorMessage = 'Veuillez soumettre une date valide.';
const classError = 'Veuillez choisir une classe.';
const scolarYearError = 'Veuillez choisir une année scolaire valide.';

const dateSchema = z.date({error : dateErrorMessage});
const scolarYearSchema = z.int().positive({error : scolarYearError});
const classSchema = z.int().positive({error : classError});

export const generalInfoSchema = z.object({
    scolarYearId : scolarYearSchema,
    classId : classSchema,
    date : dateSchema,
})