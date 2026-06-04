import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { QuizAttempt } from "./quiz.model";

const router = Router();
router.use(requireAuth);

router.get(
  "/me/quiz-attempts",
  asyncHandler(async (request, response) => {
    response.json(await QuizAttempt.find({ userId: request.user?.id }).sort({ completedAt: -1 }).lean());
  })
);

export default router;
