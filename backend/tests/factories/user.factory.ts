import { faker } from '@faker-js/faker';
import { hashPassword } from '../../src/utils/auth.utils';
import { testPrisma } from '../helpers/testDb';

export const UserFactory = {
    async createUser(
        overrides? : {
            email? : string,
            password? : string,
        }
    ){
        const email = overrides?.email || faker.internet.email();
        const password = overrides?.email || 'Password123!';
        const passwordHash = await hashPassword(password);

        const user = await testPrisma.user.create({
            data : {
                email,
                passwordHash
            }
        })


        return {user, password};
    },

    async generateUserData(
        overrides? : {
            email? : string,
            password? : string,
        }
    ){
        return {
            email : overrides?.email || faker.internet.email(),
            password : 'Password123!',
        }
    }
}