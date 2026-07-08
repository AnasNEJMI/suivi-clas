
import bcrypt from "bcrypt";

////////ENCRYPTING/COMPARING PASSWORDS///////////

const saltRounds = 12;

export async function hashPassword(plain : string) : Promise<string>{
    const hash = await bcrypt.hash(plain, saltRounds);
    return hash;
}

export async function comparePassword(
    plain : string,
    hash : string
) : Promise<boolean>{
    return bcrypt.compare(plain, hash);
}


///////VALIDATION ERROR MESSAGES///////////////

export const validationMessages = {
    createUser : {
        usernameError : "Veuiller renseigner un identifiant et un mot de passe valides.",
        pwMinLengthError : "Le mot de passe doit être composé d'au moins 8 caractères.",
        pwMaxLengthError : "Le mot de passe doit être composé d'au plus 20 caractères.",
        pwUppercaseError : "Le mot de passe doit être contenir au moins une lettre majuscule.",
        pwLowercaseError : "Le mot de passe doit être contenir au moins une lettre miniscule.",
        pwNumberError : "Le mot de passe doit être contenir au moins un chiffre.",
        pwSpecialCharacterError : "Le mot de passe doit être contenir au moins un caractère spécial.",
    },
    login : {
        usernameError : "Veuiller renseigner un identifiant et un mot de passe valides.",
        pwError : "Veuiller renseigner une adresse email et un mot de passe valides.",
        userTypeError : "Veuillez renseigner un type d'utilisateur valide."
    }
}


//////VALIDATION OF UUID v4 STRINGS///////////

export function isValidUUID(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}