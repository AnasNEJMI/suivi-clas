import { Router } from "express";
import { requireAuthHandler } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { animatorFetchBaseDataHandler } from "../controllers/animator/base-data/fetch-base-data.controller.js";
import { animatorFetchSeancesDataHandler } from "../controllers/animator/seances/fetch-seances.controller.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { seanceSchema } from "../schemas/seance.schema.js";
import { animatorSubmitSeanceHandler } from "../controllers/animator/seances/submit-seance.controller.js";
import { bilanSchema } from "../schemas/bilan.schema.js";
import { animatorSubmitBilanHandler } from "../controllers/animator/submitBilan.controller.js";
import { animatorDeleteBilanHandler } from "../controllers/animator/seances/delete-bilan.controller.js";
import { animatorFetchProfileDataHandler } from "../controllers/animator/profile/fetch-profile.controller.js";
import { animatorFetchSkillEvalsHandler } from "../controllers/animator/skill-evals/fetch-skill-evals.controller.js";
import { animatorFetchLessonEvalsHandler } from "../controllers/animator/lesson-evals/fetch-lesson-evals.controller.js";
import { animatorAutoSummaryHandler } from "../controllers/animator/seances/auto-generate-summary.controller.js";

const router = Router();
router.get('/base', requireAuthHandler, asyncHandler(animatorFetchBaseDataHandler));
router.get('/seances', requireAuthHandler, asyncHandler(animatorFetchSeancesDataHandler));
router.get('/profile', requireAuthHandler, asyncHandler(animatorFetchProfileDataHandler));
router.post('/seance',validateBody(seanceSchema), requireAuthHandler, asyncHandler(animatorSubmitSeanceHandler));

router.post('/bilan',validateBody(bilanSchema), requireAuthHandler, asyncHandler(animatorSubmitBilanHandler));
router.delete('/bilan/:bilanId', requireAuthHandler, asyncHandler(animatorDeleteBilanHandler));

router.get('/skill-evals', requireAuthHandler, asyncHandler(animatorFetchSkillEvalsHandler));

router.get('/lesson-evals', requireAuthHandler, asyncHandler(animatorFetchLessonEvalsHandler));

router.post('/bilan/auto-summary',requireAuthHandler, asyncHandler(animatorAutoSummaryHandler),
)
export default router;