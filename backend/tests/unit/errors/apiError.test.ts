import { describe, it, expect } from 'vitest';
import { ApiError } from '../../../src/classes/ApiError.class.js';
import { ErrorCodes, ErrorMessagesMap, ErrorStatusMap } from '../../../src/constants/errors.constants.js';

describe('ApiError', () => {
    describe('constructor', () => {
        it('should create error with correct properties', () => {
            const error = new ApiError(
                ErrorCodes.USER_ALREADY_EXISTS,
                ErrorMessagesMap[ErrorCodes.USER_ALREADY_EXISTS],
                { email: 'test@example.com' }
            );

            expect(error.code).toBe(ErrorCodes.USER_ALREADY_EXISTS);
            expect(error.message).toBe(ErrorMessagesMap[ErrorCodes.USER_ALREADY_EXISTS]);
            expect(error.statusCode).toBe(409);
            expect(error.details).toEqual({ email: 'test@example.com' });
            expect(error.name).toBe('ApiError');
        });

        it('should use status code from map', () => {
            const error = new ApiError(
                ErrorCodes.VALIDATION_ERROR,
                ErrorMessagesMap[ErrorCodes.VALIDATION_ERROR]
            );

            expect(error.statusCode).toBe(ErrorStatusMap[ErrorCodes.VALIDATION_ERROR]);
        });

        it('should allow status code override', () => {
            const error = new ApiError(
                ErrorCodes.USER_ALREADY_EXISTS,
                ErrorMessagesMap[ErrorCodes.USER_ALREADY_EXISTS],
                undefined,
                415
            );

            expect(error.statusCode).toBe(415);
        });
    });

    describe('error methods', () => {
        it('userAlreadyExists should create correct error', () => {
            const error = ApiError.userAlreadyExists('test@example.com');

            expect(error.code).toBe(ErrorCodes.EMAIL_ALREADY_IN_USE);
            expect(error.statusCode).toBe(ErrorStatusMap[ErrorCodes.EMAIL_ALREADY_IN_USE]);
            expect(error.details).toEqual({ email: 'test@example.com' });
        });

        it('validationError should create correct error', () => {
          const error = ApiError.validationError();
    
          expect(error.code).toBe(ErrorCodes.VALIDATION_ERROR);
          expect(error.statusCode).toBe(ErrorStatusMap[ErrorCodes.VALIDATION_ERROR]);
        });

        it('routeNotFound should create correct error', () => {
          const error = ApiError.routeNotFound();
    
          expect(error.code).toBe(ErrorCodes.ROUTE_NOT_FOUND);
          expect(error.statusCode).toBe(ErrorStatusMap[ErrorCodes.ROUTE_NOT_FOUND]);
        });

        it('internalError should create correct error', () => {
          const error = ApiError.internalError();
    
          expect(error.code).toBe(ErrorCodes.INTERNAL_SERVER_ERROR);
          expect(error.statusCode).toBe(ErrorStatusMap[ErrorCodes.INTERNAL_SERVER_ERROR]);
        });

        it('invalidJsonBodyError should create correct error', () => {
          const error = ApiError.invalidJsonBodyError();
    
          expect(error.code).toBe(ErrorCodes.INVALID_JSON_BODY_ERROR);
          expect(error.statusCode).toBe(ErrorStatusMap[ErrorCodes.INVALID_JSON_BODY_ERROR]);
        });
    })
})