
import bcrypt from "bcrypt";

const saltRounds = 12;

export async function hashPassword(plain : string) : Promise<string>{
    const hash = await bcrypt.hash(plain, saltRounds);
    return hash;
}

export async function verifyPassword(
    plain : string,
    hash : string
) : Promise<boolean>{
    return bcrypt.compare(plain, hash);
}
