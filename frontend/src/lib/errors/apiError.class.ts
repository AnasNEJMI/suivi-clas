import { ErrorCodes, type ErrorCode } from "./errors.constants";

export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }

  // Type guards for common errors
  static isUserAlreadyExists(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === ErrorCodes.USER_ALREADY_EXISTS;
  }

  static isValidationError(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === ErrorCodes.VALIDATION_ERROR;
  }

  static isRouteNotFound(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === ErrorCodes.ROUTE_NOT_FOUND;
  }
  
  static isInternalError(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === ErrorCodes.INTERNAL_SERVER_ERROR;
  }

  static isUnauthorized(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === ErrorCodes.UNAUTHORIZED;
  }

  static isInvalidCredentials(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === ErrorCodes.INVALID_CREDENTIALS;
  }


}