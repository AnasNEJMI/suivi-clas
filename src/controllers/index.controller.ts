import { Request, Response } from "express";

export const indexHandler = (req : Request, res : Response) => {


    res.json({message : 'Welcome to the API'});
}