import z from "zod";

export const skillEvalFormSchema = z.object({
    autonomy : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    discipline : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    organisation : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    ponctuality : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    regularity : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    respect : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    preparation : z.int().min(0,{error : 'Champs valide requis.'}).max(20, {error :  'Champs valide requis.'}),
    positive : z.string({error : 'Champs valide requis.'}),
    negative :  z.string({error : 'Champs valide requis.'}),
    improvements :  z.string({error : 'Champs valide requis.'}),

})

export type SkillEvalFormValues = z.infer<typeof skillEvalFormSchema>