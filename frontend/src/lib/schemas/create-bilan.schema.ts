import { ACTIVITIES, ENGAGEMENT_LEVELS, METHODOLOGY_SKILLS, METHODOLOGY_TRENDS, NEXT_STEPS } from "@/api/animator/auto-summary-options";
import z from "zod";

export const createBilanFormSchema = z.object({
    subjectId : z.number().int(),
    lessonId : z.number().int(),
    presence : z.boolean(),
    summary : z.string(),
    includeQcm : z.boolean(),
    activity:         z.enum(ACTIVITIES).optional(),
  engagement:       z.enum(ENGAGEMENT_LEVELS).optional(),   // was: performance
    methodologySkill: z.enum(METHODOLOGY_SKILLS).optional(),
    methodologyTrend: z.enum(METHODOLOGY_TRENDS).optional(),
    nextStep:         z.enum(NEXT_STEPS).optional(),
}).superRefine((data, ctx) => {
    if (!data.presence) return;
    if (data.subjectId < 0)   ctx.addIssue({ code: 'custom', path: ['subjectId'], message: 'Matière requise.'});
    if (data.lessonId  < 0)   ctx.addIssue({ code: 'custom', path: ['lessonId'],  message: 'Leçon requise.'});
    if (!data.summary.trim()) ctx.addIssue({ code: 'custom', path: ['summary'],    message: 'Bilan requis.'});
})

export type CreateBilanFormValues = z.infer<typeof createBilanFormSchema>