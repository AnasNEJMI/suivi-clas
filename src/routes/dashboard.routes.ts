import { Router } from 'express';
import { dashboardHandler } from '../controllers/dashboard.controller';

const router = Router();

// Dashboard route
router.get('/dashboard', dashboardHandler);

export default router;