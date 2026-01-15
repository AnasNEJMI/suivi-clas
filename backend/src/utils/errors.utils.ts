import express from 'express';
import { ErrorCode, ErrorStatusMap } from '../constants/errors.constants';
import { ApiErrorResponse } from '../types/response.types';

export function sendError(
    res : express.Response,
    code : ErrorCode,
    message : string,
    details? : Record<string, unknown>,
    statusCodeOverride? : number 
) : express.Response<ApiErrorResponse>{
    const statusCode = statusCodeOverride ?? ErrorStatusMap[code] ?? 500;

    return res.status(statusCode).json({
        success : false,
        error : {
            code,
            message,
            ...(details && {details})
        }
    });
}