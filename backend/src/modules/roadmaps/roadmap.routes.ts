import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { getCachedOrActiveRoadmap } from "../ai/ai.service";
import { generateRoadmap, updateTaskStatus } from "./roadmap.service";
import { Roadmap } from "./roadmap.model";

const router = Router();
router.use(requireAuth);

router.post(
  "/generate",
  asyncHandler(async (request, response) => {
    const result = await generateRoadmap(request.user!.id);
    response.status(201).json(result);
  })
);

router.get(
  "/me/roadmap",
  asyncHandler(async (request, response) => {
    response.json(await getCachedOrActiveRoadmap(request.user!.id));
  })
);

router.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const roadmap = await Roadmap.findOne({ _id: request.params.id, userId: request.user?.id }).lean();
    if (!roadmap) {
      response.status(404).json({ message: "Roadmap not found" });
      return;
    }
    response.json(roadmap);
  })
);

router.put(
  "/:roadmapId/tasks/:taskId/status",
  asyncHandler(async (request, response) => {
    const input = z.object({ status: z.enum(["TODO", "IN_PROGRESS", "DONE", "BLOCKED"]) }).parse(request.body);
    response.json(await updateTaskStatus(request.user!.id, String(request.params.roadmapId), String(request.params.taskId), input.status));
  })
);

router.post(
  "/:id/regenerate",
  asyncHandler(async (request, response) => {
    const result = await generateRoadmap(request.user!.id);
    response.status(201).json(result);
  })
);

export default router;
