import { Router } from "express";
import {indexHandler} from "../controllers/index.controller"

const router = Router();

router.get('/', indexHandler);

export default router;