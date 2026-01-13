import { Router } from 'express';
import { dashboardHandler } from '../controllers/dashboard.controller';

const router = Router();

// Dashboard route
router.get('/api/dashboard', dashboardHandler);

export default router;