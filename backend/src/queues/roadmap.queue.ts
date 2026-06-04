import { Queue } from "bullmq";
import { env } from "../config/env";

function redisConnection() {
  const url = new URL(env.REDIS_URL);
  return {
    host: url.hostname,
    port: Number(url.port || 6379),
    password: url.password || undefined
  };
}

export const roadmapQueue = new Queue("roadmap_generation", {
  connection: redisConnection()
});

export async function enqueueRoadmapGeneration(userId: string) {
  return roadmapQueue.add("generate", { userId }, { attempts: 2, backoff: { type: "exponential", delay: 1500 } });
}
