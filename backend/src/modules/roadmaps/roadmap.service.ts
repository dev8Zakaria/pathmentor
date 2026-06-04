import { Roadmap, type TaskStatus } from "./roadmap.model";
import { generateRoadmapForUser } from "../ai/ai.service";
import { AppError } from "../../utils/errors";
import { safeRedisSet } from "../../databases/redis";

export async function generateRoadmap(userId: string) {
  return generateRoadmapForUser(userId);
}

export async function updateTaskStatus(userId: string, roadmapId: string, taskId: string, status: TaskStatus) {
  const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
  if (!roadmap) throw new AppError(404, "Roadmap not found");

  let found = false;
  roadmap.phases = roadmap.phases.map((phase) => ({
    ...phase,
    tasks: phase.tasks.map((task) => {
      if (task.id !== taskId) return task;
      found = true;
      return { ...task, status };
    })
  }));

  if (!found) throw new AppError(404, "Task not found");

  const tasks = roadmap.phases.flatMap((phase) => phase.tasks);
  const doneCount = tasks.filter((task) => task.status === "DONE").length;
  roadmap.progressPercentage = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);
  await roadmap.save();
  await safeRedisSet(`roadmap:cache:user:${userId}`, JSON.stringify(roadmap), 60 * 10);
  return roadmap;
}
