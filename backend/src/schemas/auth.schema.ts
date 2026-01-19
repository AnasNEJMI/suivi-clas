import z from "zod";
import { validationMessages } from "../utils/auth.utils";

/////////////////CREATE USER///////////////////////

const createUserEmailSchema = z
  .email(validationMessages.createUser.emailError);

const createUserPasswordSchema = z
  .string()
  .min(8, validationMessages.createUser.pwMinLengthError)
  .max(72, validationMessages.createUser.pwMaxLengthError)
  .regex(/[A-Z]/,validationMessages.createUser.pwUppercaseError)
  .regex(/[a-z]/, validationMessages.createUser.pwLowercaseError)
  .regex(/[0-9]/, validationMessages.createUser.pwNumberError)
  .regex(/[!@#$%^&*]/, validationMessages.createUser.pwSpecialCharacterError);

  export const createUserSchema = z.object({
    email: createUserEmailSchema,
    password: createUserPasswordSchema,
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;



//////////////////////////LOGIN///////////////////////////

const loginEmailSchema = z
  .email(validationMessages.login.emailError);

const loginPasswordSchema = z
  .string()
  .min(1, validationMessages.login.pwError);

export const loginSchema = z.object({
  email : loginEmailSchema,
  password : loginPasswordSchema
});

export type LoginInput = z.infer<typeof loginSchema>;