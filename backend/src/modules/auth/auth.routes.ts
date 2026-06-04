import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginUser, refreshAccessToken, registerUser } from "./auth.service";
import { requireAuth } from "../../middlewares/auth";
import { redisClient } from "../../databases/redis";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  educationLevel: z.string().optional(),
  weeklyStudyHours: z.number().min(1).max(40).optional()
});

router.post(
  "/register",
  asyncHandler(async (request, response) => {
    const input = registerSchema.parse(request.body);
    response.status(201).json(await registerUser(input));
  })
);

router.post(
  "/login",
  asyncHandler(async (request, response) => {
    const input = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(request.body);
    response.json(await loginUser(input.email, input.password));
  })
);

router.post(
  "/refresh-token",
  asyncHandler(async (request, response) => {
    const input = z.object({ refreshToken: z.string().min(1) }).parse(request.body);
    response.json(refreshAccessToken(input.refreshToken));
  })
);

router.post(
  "/logout",
  requireAuth,
  asyncHandler(async (request, response) => {
    if (redisClient.isOpen && request.user) await redisClient.del(`refresh:user:${request.user.id}`);
    response.status(204).send();
  })
);

router.post("/forgot-password", (_request, response) => {
  response.json({ message: "Password reset flow is reserved for V2 email integration." });
});

router.post("/reset-password", (_request, response) => {
  response.json({ message: "Password reset flow is reserved for V2 email integration." });
});

export default router;
