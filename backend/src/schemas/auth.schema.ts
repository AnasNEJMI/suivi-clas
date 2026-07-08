import z from "zod";
import { validationMessages } from "../utils/auth.utils.js";
import { UserType } from "../types/data.types.js";

/////////////////CREATE USER///////////////////////

const createUserUsernameSchema = z
  .string().min(1,validationMessages.createUser.usernameError);

const createUserPasswordSchema = z
  .string()
  .min(8, validationMessages.createUser.pwMinLengthError)
  .max(72, validationMessages.createUser.pwMaxLengthError)
  .regex(/[A-Z]/,validationMessages.createUser.pwUppercaseError)
  .regex(/[a-z]/, validationMessages.createUser.pwLowercaseError)
  .regex(/[0-9]/, validationMessages.createUser.pwNumberError)
  .regex(/[!@#$%^&*]/, validationMessages.createUser.pwSpecialCharacterError);

  export const createUserSchema = z.object({
    email: createUserUsernameSchema,
    password: createUserPasswordSchema,
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;



//////////////////////////LOGIN///////////////////////////

const loginUsernameSchema = z
  .string().min(1, validationMessages.login.usernameError);

const loginPasswordSchema = z
  .string()
  .min(1, validationMessages.login.pwError);

const userTypeSchema = z.enum(UserType, {error : validationMessages.login.userTypeError});
export const loginSchema = z.object({
  username : loginUsernameSchema,
  password : loginPasswordSchema,
  userType : userTypeSchema
});

export type LoginInput = z.infer<typeof loginSchema>;