import { prisma } from "../db/prisma.js";

export default async function cleanupStaleSessions(){
    try{
        await prisma.session.deleteMany({
            where : {
                expiresAt : {
                    lt : new Date(),
                }
            }
        })
    }catch(error){
        console.error('error while cleaning sessions : ', error);
    }
}