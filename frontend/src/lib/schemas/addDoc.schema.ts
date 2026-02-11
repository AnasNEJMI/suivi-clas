import z from "zod";
import { CLASS_NAMES, DOC_TYPES, SUBJECTS, type ClassName, type DocType, type Subject } from "../types/data.types";

const lessonIdError = 'Veuillez choisir un leçon.';
const lessonLinkError = 'Veuillez soumettre un lien valide.';
const lessonTypeError = 'Veuillez soumettre un type valide.';

const classNameSchema = z.string()
                        .min(1, {error : lessonTypeError})
                        .refine((value) => CLASS_NAMES.includes(value as ClassName));
const lessonTypeSchema = z.string()
                        .min(1, {error : lessonTypeError})
                        .refine((value) => DOC_TYPES.includes(value as DocType));
const subjectSchema = z.string()
                        .min(1, {error : lessonTypeError})
                        .refine((value) => SUBJECTS.includes(value as Subject));
const lessonIdSchema = z.int().min(0, {error : lessonIdError});
const lessonLinkSchema = z.url({error : lessonLinkError});

export const addDocSchema = z.object({
    className : classNameSchema,
    subject : subjectSchema,
    lessonId : lessonIdSchema,
    type : lessonTypeSchema,
    link : lessonLinkSchema,
})