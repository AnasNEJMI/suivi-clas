import { ErrorCode, ErrorCodes, ErrorMessagesMap, ErrorStatusMap } from "../constants/errors.constants";

export class ApiError extends Error{
    public readonly code: ErrorCode;
    public readonly statusCode : number;
    public readonly details? : Record<string, unknown>;
    
    constructor(
        code : ErrorCode,
        message : string,
        details? : Record<string, unknown>,
        statusCodeOverride? : number
    ){
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.statusCode = statusCodeOverride ?? ErrorStatusMap[code] ?? 500;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
    
    static userAlreadyExists(email? : string) : ApiError{
        return new ApiError(
            ErrorCodes.EMAIL_ALREADY_IN_USE,
            ErrorMessagesMap[ErrorCodes.EMAIL_ALREADY_IN_USE],
            email ? {email} : undefined
        )
    }

    static invalidCredentials(email? : string) : ApiError{
        return new ApiError(
            ErrorCodes.INVALID_CREDENTIALS,
            ErrorMessagesMap[ErrorCodes.INVALID_CREDENTIALS],
            email ? {email} : undefined
        )
    }

    static validationError(message?: string, details?: Record<string, unknown>): ApiError {
        return new ApiError(
            ErrorCodes.VALIDATION_ERROR,
            message?? ErrorMessagesMap[ErrorCodes.VALIDATION_ERROR],
            details
        );
    }

    static routeNotFound(message? : string): ApiError {
        return new ApiError(
            ErrorCodes.ROUTE_NOT_FOUND,
            message?? ErrorMessagesMap[ErrorCodes.ROUTE_NOT_FOUND]
        );
    }

    static internalError(message? : string): ApiError {
        return new ApiError(
            ErrorCodes.INTERNAL_SERVER_ERROR,
            message?? ErrorMessagesMap[ErrorCodes.INTERNAL_SERVER_ERROR]
        );
    }

    static invalidJsonBodyError(message? : string): ApiError {
        return new ApiError(
            ErrorCodes.INVALID_JSON_BODY_ERROR,
            message?? ErrorMessagesMap[ErrorCodes.INVALID_JSON_BODY_ERROR]
        );
    }

    static unauthorized(message? : string): ApiError {
        return new ApiError(
            ErrorCodes.UNAUTHORIZED,
            message?? ErrorMessagesMap[ErrorCodes.UNAUTHORIZED]
        );
    }
}