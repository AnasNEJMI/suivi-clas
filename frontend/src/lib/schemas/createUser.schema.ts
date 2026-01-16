import z from "zod";

const emailErrorMessage = "Veuiller renseigner une adresse email valide.";
const pwMinLengthErrorMessage = "Le mot de passe doit être composé d'au moins 8 caractères.";
const pwMaxLengthErrorMessage = "Le mot de passe doit être composé d'au plus 20 caractères.";
const pwUppercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre majuscule.";
const pwLowercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre miniscule.";
const pwNumberErrorMessage = "Le mot de passe doit être contenir au moins un chiffre.";
const pwSpecialCharacterErrorMessage = "Le mot de passe doit être contenir au moins un caractère spécial.";
const pwMismatchErrorMessage = "Veuillez renseigner le même mot de passe.";

const passwordSchema = z
  .string()
  .min(8, { message: pwMinLengthErrorMessage })
  .max(20, { message: pwMaxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: pwUppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: pwLowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: pwNumberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: pwSpecialCharacterErrorMessage,
  });

const emailSchema = z
  .email({error : emailErrorMessage})


export const createUserFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword : z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    error : pwMismatchErrorMessage,
    path : ['confirmPassword']
})