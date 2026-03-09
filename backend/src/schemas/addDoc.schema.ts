import z from "zod";
import {DOC_TYPES, DocType } from "../db/seed.types.js";

const lessonIdError = 'Veuillez choisir un leçon.';
const lessonLinkError = 'Veuillez soumettre un lien valide.';
const lessonTypeError = 'Veuillez soumettre un type valide.';

const lessonTypeSchema = z.string()
                        .min(1, {error : lessonTypeError})
                        .refine((value) => DOC_TYPES.includes(value as DocType));
const lessonIdSchema = z.int().min(0, {error : lessonIdError});
const lessonLinkSchema = z.url({error : lessonLinkError});
const docSchema = z.number().optional();

export const addDocSchema = z.object({
    docId : docSchema,
    lessonId : lessonIdSchema,
    type : lessonTypeSchema,
    link : lessonLinkSchema,
})