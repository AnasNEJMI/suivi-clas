import z from "zod";


const emailErrorMessage = "Veuiller renseigner une adresse email valide.";
const pwMinLengthErrorMessage = "Le mot de passe doit être composé d'au moins 8 caractères.";
const pwMaxLengthErrorMessage = "Le mot de passe doit être composé d'au plus 20 caractères.";
const pwUppercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre majuscule.";
const pwLowercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre miniscule.";
const pwNumberErrorMessage = "Le mot de passe doit être contenir au moins un chiffre.";
const pwSpecialCharacterErrorMessage = "Le mot de passe doit être contenir au moins un caractère spécial.";

const emailSchema = z
  .email(emailErrorMessage);

const passwordSchema = z
  .string()
  .min(8, pwMinLengthErrorMessage)
  .max(72, pwMaxLengthErrorMessage)
  .regex(/[A-Z]/, pwUppercaseErrorMessage)
  .regex(/[a-z]/, pwLowercaseErrorMessage)
  .regex(/[0-9]/, pwNumberErrorMessage)
  .regex(/[!@#$%^&*]/, pwSpecialCharacterErrorMessage);

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});