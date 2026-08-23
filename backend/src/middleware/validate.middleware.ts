import express from 'express';
import z, { ZodError } from "zod";
import { ApiError } from '../classes/ApiError.class.js';

type ValidationTarget = 'body' | 'query' | 'params';

export function validate(schema : z.ZodType, target : ValidationTarget = 'body'){
    return (
        req : express.Request,
        res : express.Response,
        next : express.NextFunction
    ) => {
        try{
            const data = req[target];
            
            console.log('qcm data : ', data);
            const result = schema.safeParse(data);
            if(!result.success){
                throw result.error;
            }

            req[target] = result.data;

            next();
        }catch(err){
            if(err instanceof ZodError){
                next(ApiError.validationError());
            }else{
                next(ApiError.internalError());
            }
        }
    }
}

export function validateBody(schema : z.ZodType){
    return validate(schema, 'body');
}

export function validateQuery(schema : z.ZodType){
    return validate(schema, 'query');
}

export function validateParams(schema : z.ZodType){
    return validate(schema, 'params');
}