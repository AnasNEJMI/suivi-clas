import { Router } from 'express';
import { loginHandler } from '../controllers/auth.controller';
import { createUserHandler } from '../controllers/createUser.controller';
import { validateCreateUser } from '../middleware/validateCreateUser';

const router = Router();

router.get('/auth/login', loginHandler);
router.post('/users', createUserHandler, validateCreateUser);

export default router