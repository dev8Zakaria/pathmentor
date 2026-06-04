import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "./user.model";
import { Profile } from "./profile.model";
import { CareerGoal } from "../career-goals/careerGoal.model";
import { getCachedOrActiveRoadmap } from "../ai/ai.service";

const router = Router();
router.use(requireAuth);

router.get(
  "/me",
  asyncHandler(async (request, response) => {
    const user = await User.findById(request.user?.id).select("-passwordHash").lean();
    response.json(user);
  })
);

router.put(
  "/me",
  asyncHandler(async (request, response) => {
    const input = z.object({ email: z.string().email().optional() }).parse(request.body);
    const user = await User.findByIdAndUpdate(request.user?.id, input, { new: true }).select("-passwordHash");
    response.json(user);
  })
);

router.get(
  "/me/profile",
  asyncHandler(async (request, response) => {
    const profile = await Profile.findOne({ userId: request.user?.id }).lean();
    response.json(profile);
  })
);

router.get(
  "/me/roadmap",
  asyncHandler(async (request, response) => {
    response.json(await getCachedOrActiveRoadmap(request.user!.id));
  })
);

router.put(
  "/me/profile",
  asyncHandler(async (request, response) => {
    const input = z
      .object({
        fullName: z.string().min(2).optional(),
        educationLevel: z.string().optional(),
        currentLevel: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
        domain: z.string().optional(),
        weeklyStudyHours: z.number().min(1).max(60).optional(),
        knownTechnologies: z.array(z.string()).optional(),
        completedProjects: z.array(z.string()).optional(),
        preferredLearningStyle: z.array(z.string()).optional(),
        targetCareerId: z.string().optional()
      })
      .parse(request.body);
    const profile = await Profile.findOneAndUpdate({ userId: request.user?.id }, input, { new: true, upsert: true });
    response.json(profile);
  })
);

router.post(
  "/me/career-goal",
  asyncHandler(async (request, response) => {
    const input = z.object({ careerGoalId: z.string() }).parse(request.body);
    const career = await CareerGoal.findById(input.careerGoalId);
    if (!career) {
      response.status(404).json({ message: "Career goal not found" });
      return;
    }
    const profile = await Profile.findOneAndUpdate(
      { userId: request.user?.id },
      { targetCareerId: input.careerGoalId },
      { new: true, upsert: true }
    );
    response.json(profile);
  })
);

export default router;
