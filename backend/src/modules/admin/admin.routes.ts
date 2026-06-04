import { Router } from "express";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { CareerGoal } from "../career-goals/careerGoal.model";
import { Resource } from "../resources/resource.model";
import { QuizAttempt } from "../quiz/quiz.model";
import { Roadmap } from "../roadmaps/roadmap.model";
import { User } from "../users/user.model";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get(
  "/stats",
  asyncHandler(async (_request, response) => {
    const [users, roadmaps, attempts] = await Promise.all([User.countDocuments(), Roadmap.countDocuments(), QuizAttempt.countDocuments()]);
    response.json({ users, roadmaps, quizAttempts: attempts });
  })
);

router.post(
  "/career-goals",
  asyncHandler(async (request, response) => {
    const input = z
      .object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
        estimatedDurationWeeks: z.number(),
        domains: z.array(z.string())
      })
      .parse(request.body);
    response.status(201).json(await CareerGoal.create(input));
  })
);

router.put(
  "/career-goals/:id",
  asyncHandler(async (request, response) => {
    response.json(await CareerGoal.findByIdAndUpdate(request.params.id, request.body, { new: true }));
  })
);

router.delete(
  "/career-goals/:id",
  asyncHandler(async (request, response) => {
    response.json(await CareerGoal.findByIdAndUpdate(request.params.id, { isActive: false }, { new: true }));
  })
);

router.post(
  "/resources",
  asyncHandler(async (request, response) => {
    response.status(201).json(await Resource.create(request.body));
  })
);

router.put(
  "/resources/:id",
  asyncHandler(async (request, response) => {
    response.json(await Resource.findByIdAndUpdate(request.params.id, request.body, { new: true }));
  })
);

router.delete(
  "/resources/:id",
  asyncHandler(async (request, response) => {
    await Resource.findByIdAndDelete(request.params.id);
    response.status(204).send();
  })
);

router.post("/skills", (_request, response) => response.status(201).json({ message: "Skills are managed in Neo4j seed for MVP." }));
router.put("/skills/:id", (request, response) => response.json({ id: request.params.id, message: "Skill update reserved for graph admin V2." }));
router.delete("/skills/:id", (request, response) => response.json({ id: request.params.id, message: "Skill deletion reserved for graph admin V2." }));

export default router;
