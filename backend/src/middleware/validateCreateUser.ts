import express from 'express';
import { createUserSchema } from "../schemas/user.schema";
import z from "zod";

export function validateCreateUser(
    req : express.Request,
    res : express.Response,
    next : express.NextFunction
){
    const result = createUserSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            error : "Invalid input.",
            details : z.treeifyError(result.error),
        })
    }

    req.body = result.data;

    next();
}