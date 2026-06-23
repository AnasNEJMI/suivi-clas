import { AnswerChoice } from "@/api/api.types";
import { z } from "zod"; // Adjust import

export const qcmSubmitSchema = z.object({
  qcmId: z.number(),
  // Maps question index (e.g., "0", "1") to the selected answer ('a', 'b', 'c', 'd')
  answers: z.record(
    z.string(), 
    z.enum(AnswerChoice, { error: "Veuillez sélectionner une réponse." })
  ),
});

export type QcmSubmitFormValues = z.infer<typeof qcmSubmitSchema>;

/*
    petit dej : 3 oeufs, 40g flocons d'avoine, café sans sucre, un pain de mie tartiné avec du beurre de cacaouttes, une banane, un skyr
    dej : 220g de blanc de poulet, 150g de legumes (soit poivrons, soit brocoli, soit haricots verts), 100g de pattes (soit riz blanc, blé ebly, nouilles)
    collation : 20g de clear whey, 4g de créatine
    diner : 220g de blanc de poulet, 150g de legumes (soit poivrons, soit brocoli, soit haricots verts), 100g de pattes (soit riz blanc, blé ebly, nouilles), skyr, moitier d'une pomme
    \ 
    */