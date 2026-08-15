import { LESSON_EVALS } from "@/api/api.types";
import z from "zod";

export const lessonEvalFormSchema = z.object({
    subjectId : z.number().int(),
    lessonId : z.number().int(),
    evaluation : z.enum(LESSON_EVALS)

}).superRefine((data, ctx) => {
    if (data.subjectId < 0)   ctx.addIssue({ code: 'custom', path: ['subjectId'], message: 'matière requise.'});
    if (data.lessonId < 0)   ctx.addIssue({ code: 'custom', path: ['lessonId'], message: 'Leçon requise.'});
    if (!data.evaluation) ctx.addIssue({ code: 'custom', path: ['evaluation'], message: 'Évaluation valide requise.'});
})

export type LessonEvalFormValues = z.infer<typeof lessonEvalFormSchema>