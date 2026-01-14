import {prisma} from "../db/prisma";

export async function listUsers(req : Request, res : Response){
    const users = prisma.user.findMany();
    
    // res.json(users);
}