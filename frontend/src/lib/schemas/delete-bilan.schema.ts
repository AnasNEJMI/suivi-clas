import z from "zod";

export const deleteBilanFormSchema = z.object({
    bilanId : z.number().int().positive(),
});

export type DeleteBilanFormValues = z.infer<typeof deleteBilanFormSchema>