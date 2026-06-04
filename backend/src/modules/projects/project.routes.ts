import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Project } from "./project.model";
import { AiProfile } from "../ai/aiProfile.model";

const router = Router();
router.use(requireAuth);

router.get(
  "/recommended",
  asyncHandler(async (request, response) => {
    const aiProfile = await AiProfile.findOne({ userId: request.user?.id }).sort({ generatedAt: -1 }).lean();
    response.json(await Project.find({ skillTags: { $in: aiProfile?.recommendedFocus ?? [] } }).limit(6).lean());
  })
);

export default router;
