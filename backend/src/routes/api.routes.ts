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
import { studentDataHandler } from '../controllers/student.data.controller.js';
import { addSkillSchema } from '../schemas/addSkill.schema.js';
import { addSkillHandler } from '../controllers/addSkill.controller.js';
import { addDocHandler } from '../controllers/addDoc.controller.js';
import { addDocSchema } from '../schemas/addDoc.schema.js';
import { associationDataHandler } from '../controllers/association.data.controller.js';
import { animatorProfileHandler } from '../controllers/animator/profile.controller.js';
import { animatorBaseDataHandler } from '../controllers/animator/base-data.controller.js';

const router = Router();

router.post('/users', validateBody(createUserSchema), asyncHandler(createUserHandler));
router.post('/auth/login',validateBody(loginSchema), loginHandler);
router.post('/auth/logout', requireAuthHandler, asyncHandler(logoutHandler));
router.get('/auth/profile', requireAuthHandler, asyncHandler(profileHandler));
router.get('/student/data', requireAuthHandler, asyncHandler(studentDataHandler));
router.get('/association/data', requireAuthHandler, asyncHandler(associationDataHandler));
router.get('/admin/base', requireAuthHandler, requireAdminHandler, asyncHandler(getAdminBaseHandler))

router.get('/animator/me', requireAuthHandler, asyncHandler(animatorProfileHandler));
router.get('/animator/base-data', requireAuthHandler, asyncHandler(animatorBaseDataHandler));

router.post('/admin/add-bilan', validateBody(addBilanSchema), requireAuthHandler, requireAdminHandler, asyncHandler(addBilanHandler))
router.post('/admin/add-skill', validateBody(addSkillSchema), requireAuthHandler, requireAdminHandler, asyncHandler(addSkillHandler))
router.post('/admin/add-doc', validateBody(addDocSchema), requireAuthHandler, requireAdminHandler, asyncHandler(addDocHandler))

export default router