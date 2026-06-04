import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { safeRedisGet, safeRedisSet } from "../../databases/redis";

const router = Router();
router.use(requireAuth);

const questions = [
  "As-tu déjà développé une application web complète ?",
  "Connais-tu Git et GitHub ?",
  "As-tu déjà travaillé avec une API REST ?",
  "As-tu déjà utilisé Docker ?",
  "Combien d'heures peux-tu étudier par semaine ?"
];

router.post(
  "/interview/start",
  asyncHandler(async (request, response) => {
    await safeRedisSet(`interview:${request.user?.id}`, JSON.stringify({ answers: [] }), 60 * 60);
    response.json({ questions });
  })
);

router.post(
  "/interview/answer",
  asyncHandler(async (request, response) => {
    const input = z.object({ questionIndex: z.number(), answer: z.string() }).parse(request.body);
    const key = `interview:${request.user?.id}`;
    const raw = await safeRedisGet(key);
    const state = raw ? JSON.parse(raw) : { answers: [] };
    state.answers[input.questionIndex] = input.answer;
    await safeRedisSet(key, JSON.stringify(state), 60 * 60);
    response.json({ saved: true, nextQuestion: questions[input.questionIndex + 1] ?? null });
  })
);

router.get(
  "/interview/result",
  asyncHandler(async (request, response) => {
    const raw = await safeRedisGet(`interview:${request.user?.id}`);
    const state = raw ? JSON.parse(raw) : { answers: [] };
    response.json({
      answers: state.answers,
      summary: "Entretien enregistré. Le diagnostic final combinera ces réponses avec le quiz."
    });
  })
);

export default router;
