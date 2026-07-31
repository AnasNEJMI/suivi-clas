import z from "zod";

export const bilanFormSchema = z.object({
    studentId : z.number().int().default(-1),
    subjectId : z.number().int().default(-1),
    lessonId : z.number().int().default(-1),
    presence : z.boolean(),
    summary : z.string().default(''),
}).superRefine((data, ctx) => {
    if (!data.presence) return;
    if (data.studentId < 0)   ctx.addIssue({ code: 'custom', path: ['studentId'], message: 'Élève requis.'});
    if (data.subjectId < 0)   ctx.addIssue({ code: 'custom', path: ['subjectId'], message: 'Matière requise.'});
    if (data.lessonId  < 0)   ctx.addIssue({ code: 'custom', path: ['lessonId'],  message: 'Leçon requise.'});
    if (!data.summary.trim()) ctx.addIssue({ code: 'custom', path: ['summary'],    message: 'Bilan requis.'});
})