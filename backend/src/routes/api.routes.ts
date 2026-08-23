import { Router } from 'express';
import {validateBody } from '../middleware/validate.middleware.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { asyncHandler } from '../middleware/asyncHandler.middleware.js';
import { loginHandler } from '../controllers/login.controller.js';
import { requireAuthHandler } from '../middleware/auth.middleware.js';
import { profileHandler } from '../controllers/profile.controller.js';
import { logoutHandler } from '../controllers/logout.controller.js';
import { studentDataHandler } from '../controllers/student.data.controller.js';
import { associationDataHandler } from '../controllers/association.data.controller.js';
import { animatorProfileHandler } from '../controllers/animator/profile.controller.js';
import { animatorBaseDataHandler } from '../controllers/animator/base-data.controller.js';
import { seanceSchema } from '../schemas/seance.schema.js';
import { animatorFetchSeanceHandler } from '../controllers/animator/fetchSeance.controller.js';
import { animatorSubmitSeanceHandler } from '../controllers/animator/submitSeance.controller.js';
import { animatorDeleteSeanceHandler } from '../controllers/animator/deleteSeance.controller.js';
import { bilanSchema } from '../schemas/bilan.schema.js';
import { animatorSubmitBilanHandler } from '../controllers/animator/submitBilan.controller.js';
import { animatorFetchLessonEvalsHandler } from '../controllers/animator/fetchLessonEvals.controller.js';
import { animatorSubmitLessonEvalHandler } from '../controllers/animator/submitLessonEval.controller.js';
import { lessonEvalSchema } from '../schemas/lessonEval.schema.js';
import { animatorFetchSkillEvalHandler } from '../controllers/animator/fetchSkillEval.controller.js';
import { skillEvalSchema } from '../schemas/skillEval.schema.js';
import { animatorSubmitSkillEvalHandler } from '../controllers/animator/submitSkillEval.controller.js';
import { studentBilansHandler } from '../controllers/student/fetchBilans.controller.js';
import { studentSkillsEvalsHandler } from '../controllers/student/fetchSkillsEvals.controller.js';
import { studentLessonEvalsHandler } from '../controllers/student/fetchLessonEvals.controller.js';
import { associationMemberFetchPresenceStatsHandler } from '../controllers/association-member/fetchPresenceStats.controller.js';
import { studentVisitHandler } from '../controllers/student/visit.controller.js';
import { associationVisitStatsHandler } from '../controllers/association-member/fetchVisitStats.controller.js';
import { associationAnimatorStatsHandler } from '../controllers/association-member/fetchAnimatorStats.js';
import { qcmSchema } from '../schemas/qcm.schema.js';
import { submitStudentQcmHandler } from '../controllers/student/submitQcm.controller.js';

const router = Router();

router.post('/auth/login',validateBody(loginSchema), loginHandler);
router.post('/auth/logout', requireAuthHandler, asyncHandler(logoutHandler));
router.get('/auth/profile', requireAuthHandler, asyncHandler(profileHandler));
router.get('/student/data', requireAuthHandler, asyncHandler(studentDataHandler));
router.get('/association/data', requireAuthHandler, asyncHandler(associationDataHandler));

router.get('/student/bilans', requireAuthHandler, asyncHandler(studentBilansHandler));
router.get('/student/skills-evals', requireAuthHandler, asyncHandler(studentSkillsEvalsHandler));
router.get('/student/lesson-evals', requireAuthHandler, asyncHandler(studentLessonEvalsHandler));
router.get('/student/visit',requireAuthHandler,asyncHandler(studentVisitHandler))
router.post('/student/qcm', validateBody(qcmSchema),requireAuthHandler, asyncHandler(submitStudentQcmHandler));

router.get('/animator/me', requireAuthHandler, asyncHandler(animatorProfileHandler));
router.get('/animator/base-data', requireAuthHandler, asyncHandler(animatorBaseDataHandler));
router.get('/animator/seance', requireAuthHandler, asyncHandler(animatorFetchSeanceHandler));
router.get('/animator/lesson-evals', requireAuthHandler, asyncHandler(animatorFetchLessonEvalsHandler));
router.get('/animator/skill-eval', requireAuthHandler, asyncHandler(animatorFetchSkillEvalHandler));

router.post('/animator/lesson-eval', validateBody(lessonEvalSchema), requireAuthHandler, asyncHandler(animatorSubmitLessonEvalHandler));
router.post('/animator/skill-eval', validateBody(skillEvalSchema), requireAuthHandler, asyncHandler(animatorSubmitSkillEvalHandler));
router.post('/animator/bilan',validateBody(bilanSchema), requireAuthHandler, asyncHandler(animatorSubmitBilanHandler));
router.post('/animator/seance',validateBody(seanceSchema), requireAuthHandler, asyncHandler(animatorSubmitSeanceHandler));

router.delete('/animator/seance', requireAuthHandler, asyncHandler(animatorDeleteSeanceHandler));

router.get('/association-member/presence-stats', requireAuthHandler, asyncHandler(associationMemberFetchPresenceStatsHandler))
router.get('/association-member/visit-stats', requireAuthHandler, asyncHandler(associationVisitStatsHandler))
router.get('/association-member/animator-stats', requireAuthHandler, asyncHandler(associationAnimatorStatsHandler))

export default router