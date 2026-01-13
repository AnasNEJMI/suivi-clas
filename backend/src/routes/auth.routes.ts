import { Router } from 'express';
import { loginHandler } from '../controllers/auth.controller';

const router = Router();

// Login route (POST later, GET for now)
router.get('/auth/login', loginHandler);

export default router;