import { Router } from 'express';
import { dashboardHandler } from '../controllers/dashboard.controller.js';

const router = Router();

// Dashboard route
router.get('/api/dashboard', dashboardHandler);

export default router;