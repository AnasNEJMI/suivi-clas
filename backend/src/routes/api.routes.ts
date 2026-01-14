import { Router } from 'express';
import { loginHandler } from '../controllers/auth.controller';
import { createUserHandler } from '../controllers/createUser.controller';

const router = Router();

router.get('/auth/login', loginHandler);
router.post('/users', createUserHandler);

export default router