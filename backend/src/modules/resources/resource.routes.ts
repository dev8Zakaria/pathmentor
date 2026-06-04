import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Resource } from "./resource.model";
import { Profile } from "../users/profile.model";
import { AiProfile } from "../ai/aiProfile.model";

const router = Router();
router.use(requireAuth);

router.get(
  "/",
  asyncHandler(async (_request, response) => {
    response.json(await Resource.find().sort({ title: 1 }).lean());
  })
);

router.get(
  "/recommended",
  asyncHandler(async (request, response) => {
    const profile = await Profile.findOne({ userId: request.user?.id }).lean();
    const aiProfile = await AiProfile.findOne({ userId: request.user?.id, careerGoalId: profile?.targetCareerId }).lean();
    response.json(await Resource.find({ skillTags: { $in: aiProfile?.recommendedFocus ?? [] } }).limit(8).lean());
  })
);

export default router;
