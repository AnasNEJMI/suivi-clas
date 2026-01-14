import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Prisma connected successfully");
    return prisma.$disconnect();
  })
  .catch(console.error);