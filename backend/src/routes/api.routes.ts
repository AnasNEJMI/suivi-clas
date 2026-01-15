import { Router } from 'express';
import { createUserHandler } from '../controllers/createUser.controller';
import {validateBody } from '../middleware/validate.middleware';
import { createUserSchema } from '../schemas/user.schema';
import { asyncHandler } from '../middleware/asyncHandler.middleware';

const router = Router();

router.post('/users', asyncHandler(createUserHandler), validateBody(createUserSchema));

export default router