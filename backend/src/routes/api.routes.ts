import { Router } from 'express';
import { createUserHandler } from '../controllers/createUser.controller';
import {validateBody } from '../middleware/validate.middleware';
import { createUserSchema, loginSchema } from '../schemas/auth.schema';
import { asyncHandler } from '../middleware/asyncHandler.middleware';
import { loginHandler } from '../controllers/login.controller';
import { requireAuthHandler } from '../middleware/auth.middleware';
import { profileHandler } from '../controllers/profile.controller';

const router = Router();

router.post('/users', asyncHandler(createUserHandler), validateBody(createUserSchema));
router.post('/login', asyncHandler(loginHandler), validateBody(loginSchema));
router.get('/profile', requireAuthHandler, asyncHandler(profileHandler));

export default router