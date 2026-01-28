import { beforeAll, afterAll, afterEach } from 'vitest';
import {connectDb, disconnectDb, cleanDb} from './helpers/testDb.js'

beforeAll(async () => {
    await connectDb();
})

afterEach(async () => {
    await cleanDb();
})

afterAll(async () => {
    await disconnectDb();
})