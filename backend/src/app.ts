import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import adminRoutes from "./modules/admin/admin.routes";
import authRoutes from "./modules/auth/auth.routes";
import careerGoalRoutes from "./modules/career-goals/careerGoal.routes";
import interviewRoutes from "./modules/ai/interview.routes";
import mentorRoutes from "./modules/mentor/mentor.routes";
import projectRoutes from "./modules/projects/project.routes";
import quizRoutes from "./modules/quiz/quiz.routes";
import quizAttemptRoutes from "./modules/quiz/quizAttempt.routes";
import resourceRoutes from "./modules/resources/resource.routes";
import roadmapRoutes from "./modules/roadmaps/roadmap.routes";
import userRoutes from "./modules/users/user.routes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(
  "/api/mentor",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/health", (_request, response) => {
  response.json({ status: "ok", service: "pathmentor-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", quizAttemptRoutes);
app.use("/api/career-goals", careerGoalRoutes);
app.use("/api/ai", interviewRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
