import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../src/generated/prisma/client.js'
import { UserRole, UserGender } from "../enums/db.enums.js";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main(){
    
}