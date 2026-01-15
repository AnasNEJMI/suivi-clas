import { hashPassword, verifyPassword } from "../../../src/utils/auth.utils";

import {describe, it, expect} from 'vitest';

describe('Password Hashing', () => {
    it("hashes and verifies a password correctly", async () => {
        const password = "StrongPassword123!";
        
        const hash = await hashPassword(password);
        expect(hash).not.toBe(password);
        
        const isValid = await verifyPassword(password, hash);
        expect(isValid).toBe(true);
        
        const isInvalid = await verifyPassword("wrongpassword", hash);
        expect(isInvalid).toBe(false);
    })
})
