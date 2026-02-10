import { Router } from 'express';
import { createUserHandler } from '../controllers/createUser.controller.js';
import {validateBody } from '../middleware/validate.middleware.js';
import { createUserSchema, loginSchema } from '../schemas/auth.schema.js';
import { asyncHandler } from '../middleware/asyncHandler.middleware.js';
import { loginHandler } from '../controllers/login.controller.js';
import { requireAuthHandler } from '../middleware/auth.middleware.js';
import { profileHandler } from '../controllers/profile.controller.js';
import { logoutHandler } from '../controllers/logout.controller.js';
import { requireAdminHandler } from '../middleware/admin.middleware.js';
import { getAdminBaseHandler } from '../controllers/getAdminBase.controller.js';
import { addBilanSchema } from '../schemas/addBilan.schema.js';
import { addBilanHandler } from '../controllers/addBilan.controller.js';
import { studentProfileHandler } from '../controllers/studentProfile.controller.js';

const router = Router();

router.post('/users', validateBody(createUserSchema), asyncHandler(createUserHandler));
router.post('/auth/login',validateBody(loginSchema), loginHandler);
router.post('/auth/logout', requireAuthHandler, asyncHandler(logoutHandler));
router.get('/auth/profile', requireAuthHandler, asyncHandler(profileHandler));
router.get('/student/profile', requireAuthHandler, asyncHandler(studentProfileHandler));
router.get('/admin/base', requireAuthHandler, requireAdminHandler, asyncHandler(getAdminBaseHandler))
router.post('/admin/add-bilan', validateBody(addBilanSchema), requireAuthHandler, requireAdminHandler, asyncHandler(addBilanHandler))

export default router