import express from 'express';
import { ApiSuccessResponse } from '../types/response.types';

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