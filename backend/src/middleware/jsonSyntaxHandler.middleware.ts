import { Request, Response, NextFunction } from "express";
import { ApiError } from "../classes/ApiError.class.js";

export default async function syntaxHandler(
    err : unknown,
    req : Request,
    res : Response,
    next : NextFunction,
){
    console.log('error : ', err);
    if(err instanceof SyntaxError){
        next(ApiError.invalidJsonBodyError())
    }else{
        next(ApiError.internalError());
    }
}