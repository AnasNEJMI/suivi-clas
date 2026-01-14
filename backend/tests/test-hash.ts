import { hashPassword, verifyPassword } from "../src/utils/auth";

async function test(){
    const password = "StrongPassword123!";

    const hashed = await hashPassword(password);
    console.log("Hashed password:", hashed);

    const isValid = await verifyPassword(password, hashed);
    console.log("Password is valid:", isValid);

    const isInvalid = await verifyPassword("wrongpassword", hashed);
    console.log("Wrong password valid:", isInvalid);

}