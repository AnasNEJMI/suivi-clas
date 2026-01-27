import { Request, Response, NextFunction } from "express";
import { ApiError } from "../classes/ApiError.class";

export default async function routeNotFoundHandler(
    err : unknown,
    req : Request,
    res : Response,
    next : NextFunction,
){
    console.log(err);
    if(err instanceof ApiError){
        next(err);
    }else{
        next(ApiError.routeNotFound())
    }
}