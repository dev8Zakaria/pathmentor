import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { CareerGoal } from "./careerGoal.model";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_request, response) => {
    response.json(await CareerGoal.find({ isActive: true }).sort({ name: 1 }).lean());
  })
);

router.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const career = await CareerGoal.findById(request.params.id).lean();
    if (!career) {
      response.status(404).json({ message: "Career goal not found" });
      return;
    }
    response.json(career);
  })
);

export default router;
