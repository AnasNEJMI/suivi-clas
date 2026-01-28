import { describe, it, expect, vi } from 'vitest';
import { Response } from 'express';
import { sendSuccess, sendError, sendCreated } from '../../../src/utils/response.utils.js';
import { ErrorCodes, ErrorMessagesMap } from '../../../src/constants/errors.constants.js';
import { success } from 'zod';

describe('Response Utils', () => {
    const createMockResponse = () => {
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;
        return res;
    };

    describe('sendSuccess', () => {
        it('should send success response with 200 status by default', () => {
            const res = createMockResponse();
            const data = {id : 1, name : 'test'};

            sendSuccess(res, data);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success : true,
                data,
            });
        });

        it('should send success response with custom status code', () => {
            const res = createMockResponse();
            const data = { id: 1 };

            sendSuccess(res, data, 204);

            expect(res.status).toHaveBeenCalledWith(204);
        });
    });

    describe('sendError', () => {
        it('should send error response with correct status code from map', () => {
            const res = createMockResponse();

            sendError(res, ErrorCodes.USER_ALREADY_EXISTS, ErrorMessagesMap[ErrorCodes.USER_ALREADY_EXISTS]);
            
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                success : false,
                error : {
                    code : ErrorCodes.USER_ALREADY_EXISTS,
                    message : ErrorMessagesMap[ErrorCodes.USER_ALREADY_EXISTS],
                },
            });
        })

        it('should include details when provided', () => {
            const res = createMockResponse();
            const details = { email: 'test@example.com' };

            sendError(res, ErrorCodes.VALIDATION_ERROR, ErrorMessagesMap[ErrorCodes.VALIDATION_ERROR], details);

           
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: {
                    code: ErrorCodes.VALIDATION_ERROR,
                    message: ErrorMessagesMap[ErrorCodes.VALIDATION_ERROR],
                    details,
                },
            });
        });

        it('should allow status code override', () => {
            const res = createMockResponse();

            sendError(res, ErrorCodes.VALIDATION_ERROR, ErrorMessagesMap[ErrorCodes.VALIDATION_ERROR], undefined, 410);

            expect(res.status).toHaveBeenCalledWith(410);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: {
                    code: ErrorCodes.VALIDATION_ERROR,
                    message: ErrorMessagesMap[ErrorCodes.VALIDATION_ERROR],
                },
            });
        });
    })

    describe('sendCreated', () => {
        it('should send 201 status code', () =>{
            const res = createMockResponse();
            const data = {id : 1, email : 'john@doe.boom', createdAt : 'sunset'}

            sendCreated(res, data);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success : true,
                data,
            })
        })
    })

})