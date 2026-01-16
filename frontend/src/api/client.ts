import { ApiError } from "@/lib/errors/apiError.class";
import { ErrorCodes, ErrorMessagesMap, ErrorStatusMap } from "@/lib/errors/errors.constants";
import type { ApiResponse } from "@/lib/types/response.types";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function apiRequest<T>(
    endpoint : string,
    options : RequestInit = {}
){
    const url = `${API_BASE_URL}${endpoint}`;

    try{
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', 
        });

        let data : ApiResponse<T>;
        try{
            data = await response.json();
        }catch{
            throw new ApiError(
                ErrorCodes.PARSE_ERROR,
                ErrorMessagesMap[ErrorCodes.PARSE_ERROR],
                response.status
            )
        }

        if(!response.ok || !data.success){
            const errorData = data.success === false 
            ? data.error 
            : {
                code : ErrorCodes.UNKNOWN_ERROR,
                message : ErrorMessagesMap[ErrorCodes.UNKNOWN_ERROR],
            }

            throw new ApiError(
                errorData.code,
                errorData.message,
                response.status,
                errorData.details
            )
        }

        if(data.success){
            return data.data;
        }

        throw new ApiError(
            ErrorCodes.UNKNOWN_ERROR,
            'Format de réponse inattendu',
            response.status
        );
    }catch(err){
        if(err instanceof ApiError){
            throw err;
        }

        if(err instanceof TypeError && err.message.includes('fetch')){
            throw new ApiError(
                ErrorCodes.NETWORK_ERROR,
                ErrorMessagesMap[ErrorCodes.NETWORK_ERROR],
                ErrorStatusMap[ErrorCodes.NETWORK_ERROR]
            )
        }

        throw new ApiError(
            ErrorCodes.UNKNOWN_ERROR,
            err instanceof Error ? err.message : ErrorMessagesMap[ErrorCodes.UNKNOWN_ERROR],
            0
        );
    }
}