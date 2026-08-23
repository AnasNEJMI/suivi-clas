import express from 'express';
import { ApiError } from '../classes/ApiError.class.js';
import { ZodError } from 'zod';
import { ErrorCodes } from '../constants/errors.constants.js';
import { sendError } from '../utils/response.utils.js';

export function errorHandler(
    err : Error,
    req : express.Request,
    res : express.Response,
    next : express.NextFunction,
){

    console.error('err ', err)
    //handle ApiError
    if(err instanceof ApiError){
        return sendError(
            res,
            err.code,
            err.message,
            err.details,
        )
    }

    //handle zod validatione errors
    if(err instanceof ZodError){
        return sendError(
            res,
            ErrorCodes.VALIDATION_ERROR,
            'Les données fournies sont invalides.',
            {errors : err.flatten},
        )
    }

    //log unexpected errors
    console.error('Unexpected error:', err);

    //handle unexpected errors
    return sendError(
        res,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        'Une erreur interne est survenue.'
    )
}