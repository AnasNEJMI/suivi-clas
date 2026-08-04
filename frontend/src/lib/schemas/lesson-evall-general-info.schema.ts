import z from "zod";

const classError = 'Veuillez choisir une classe.';
const studentError = 'Veuillez choisir un étudiant.';
const scolarYearError = 'Veuillez choisir une année scolaire valide.';

const scolarYearSchema = z.int().positive({error : scolarYearError});
const classSchema = z.int().positive({error : classError});
const studentSchema = z.int().positive({error : studentError});

export const lessonEvalGeneralInfoSchema = z.object({
    scolarYearId : scolarYearSchema,
    classId : classSchema,
    studentId : studentSchema,
})