import z from "zod";

const usernameErrorMessage = "Veuiller renseigner un identifiant valide.";
const pwMinLengthErrorMessage = "Le mot de passe doit être composé d'au moins 8 caractères.";
const pwMaxLengthErrorMessage = "Le mot de passe doit être composé d'au plus 20 caractères.";
const pwUppercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre majuscule.";
const pwLowercaseErrorMessage = "Le mot de passe doit être contenir au moins une lettre miniscule.";
const pwNumberErrorMessage = "Le mot de passe doit être contenir au moins un chiffre.";
// const pwSpecialCharacterErrorMessage = "Le mot de passe doit être contenir au moins un caractère spécial.";

const passwordSchema = z
  .string()
  .min(8, { message: pwMinLengthErrorMessage })
  .max(25, { message: pwMaxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: pwUppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: pwLowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: pwNumberErrorMessage })
  // .refine((password) => /[!@#$%^&*]/.test(password), {
  //   message: pwSpecialCharacterErrorMessage,
  // });

const usernameSchema = z
  .string().min(1, {error : usernameErrorMessage})


export const createLoginFormSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});