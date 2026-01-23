import { Request, Response, NextFunction } from "express";
import { ApiError } from "../classes/ApiError.class";

export default async function routeNotFoundHandler(
    err : unknown,
    req : Request,
    res : Response,
    next : NextFunction,
){
    next(ApiError.routeNotFound())
}