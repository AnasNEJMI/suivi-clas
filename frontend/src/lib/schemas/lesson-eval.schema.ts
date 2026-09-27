import { LESSON_EVALS } from "@/api/api.types";
import z from "zod";

export const lessonEvalFormSchema = z.object({
    evaluation : z.enum(LESSON_EVALS)

}).superRefine((data, ctx) => {
    if (!data.evaluation) ctx.addIssue({ code: 'custom', path: ['evaluation'], message: 'Évaluation valide requise.'});
})

export type LessonEvalFormValues = z.infer<typeof lessonEvalFormSchema>