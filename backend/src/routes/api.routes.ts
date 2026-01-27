import { Router } from 'express';
import { createUserHandler } from '../controllers/createUser.controller';
import {validateBody } from '../middleware/validate.middleware';
import { createUserSchema, loginSchema } from '../schemas/auth.schema';
import { asyncHandler } from '../middleware/asyncHandler.middleware';
import { loginHandler } from '../controllers/login.controller';
import { requireAuthHandler } from '../middleware/auth.middleware';
import { profileHandler } from '../controllers/profile.controller';
import { logoutHandler } from '../controllers/logout.controller';

const router = Router();

router.post('/users', validateBody(createUserSchema), asyncHandler(createUserHandler));
router.post('/auth/login',validateBody(loginSchema), loginHandler);
router.post('/auth/logout', requireAuthHandler, asyncHandler(logoutHandler));
router.get('/auth/profile', requireAuthHandler, asyncHandler(profileHandler));

export default router