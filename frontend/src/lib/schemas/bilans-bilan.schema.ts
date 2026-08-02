import z from "zod";

export const bilanFormSchema = z.object({
    subjectId : z.number().int(),
    lessonId : z.number().int(),
    presence : z.boolean(),
    summary : z.string(),
}).superRefine((data, ctx) => {
    if (!data.presence) return;
    if (data.subjectId < 0)   ctx.addIssue({ code: 'custom', path: ['subjectId'], message: 'Matière requise.'});
    if (data.lessonId  < 0)   ctx.addIssue({ code: 'custom', path: ['lessonId'],  message: 'Leçon requise.'});
    if (!data.summary.trim()) ctx.addIssue({ code: 'custom', path: ['summary'],    message: 'Bilan requis.'});
})

export type BilanFormValues = z.infer<typeof bilanFormSchema>