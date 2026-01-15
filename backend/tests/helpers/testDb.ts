import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../src/generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export async function cleanDb(){
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
}

export async function connectDb(){
    await prisma.$connect();
}

export async function disconnectDb(){
    await prisma.$disconnect();
}

export {prisma as testPrisma}