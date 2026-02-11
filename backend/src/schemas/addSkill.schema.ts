import z from "zod";
import { CLASS_NAMES, ClassName } from "../db/seed.data.js";

const studentError = 'Veuillez choisir un étudiant.';
const textError = 'Ce champ ne peut pas être vide.';
const skillValueError = 'Choisir une valeur entre 0 et 20.';
const classNameError = 'Veuillez soumettre une classe valide.';

const autonomySchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const disciplineSchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const organisationSchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const ponctualitySchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const regularitySchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const respectSchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const preparationSchema = z.int().min(0,{error : skillValueError}).max(20, {error : skillValueError});
const positiveSchema = z.string().min(1, {error : textError});
const negativeSchema = z.string().min(1, {error : textError});
const improvementsSchema = z.string().min(1, {error : textError});
const studentIdSchema = z.int().min(0, {error : studentError});

export const addSkillSchema = z.object({
    userId : studentIdSchema,
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