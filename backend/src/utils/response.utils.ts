import express from 'express';
import { ErrorCode, ErrorStatusMap } from '../constants/errors.constants.js';
import { ApiErrorResponse, ApiSuccessResponse } from '../types/response.types.js';

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

export function sendSuccess<T>(
    res : express.Response,
    data : T,
    statusCode : number = 200
) : express.Response<ApiSuccessResponse<T>>{
    return res.status(statusCode).json({
        success : true,
        data,
    });
};

export function sendCreated<T>(
    res: express.Response,
    data: T
): express.Response<ApiSuccessResponse<T>>{
    return sendSuccess(res, data, 201)
}

export function sendNoContent(res: express.Response): express.Response {
  return res.status(204).send();
}