import z from "zod";
import { CLASS_NAMES, type ClassName } from "../types/data.types";

const studentError = 'Veuillez choisir un étudiant.';
const textError = 'Ce champ ne peut pas être vide.';
const skillValueError = 'Choisir une valeur entre 0 et 20.';
const classNameError = 'Veuillez soumettre une classe valide.';

const autonomySchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const disciplineSchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const organisationSchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const ponctualitySchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const regularitySchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const respectSchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const preparationSchema = z.int().min(0,{error : skillValueError}).max(20, {error : studentError});
const positiveSchema = z.string().min(1, {error : textError});
const negativeSchema = z.string().min(1, {error : textError});
const improvementsSchema = z.string().min(1, {error : textError});
const classNameSchema = z.string()
                        .min(1, {error : classNameError})
                        .refine((value) => CLASS_NAMES.includes(value as ClassName));
const studentIdSchema = z.int().min(0, {error : studentError});

export const addSkillSchema = z.object({
    studentId : studentIdSchema,
    className : classNameSchema,
    autonomy : autonomySchema,
    discipline : disciplineSchema,
    organisation : organisationSchema,
    ponctuality : ponctualitySchema,
    regularity : regularitySchema,
    respect : respectSchema,
    preparation : preparationSchema,
    positive : positiveSchema,
    negative : negativeSchema,
    improvements : improvementsSchema,
})