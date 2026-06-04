import { Worker } from "bullmq";
import { env } from "../config/env";
import { connectMongo } from "../databases/mongodb";
import { generateRoadmapForUser } from "../modules/ai/ai.service";

function redisConnection() {
  const url = new URL(env.REDIS_URL);
  return {
    host: url.hostname,
    port: Number(url.port || 6379),
    password: url.password || undefined
  };
}

async function main() {
  await connectMongo();
  const worker = new Worker(
    "roadmap_generation",
    async (job) => {
      await generateRoadmapForUser(job.data.userId);
    },
    { connection: redisConnection() }
  );
  worker.on("completed", (job) => console.log(`[queue] roadmap job ${job.id} completed`));
  worker.on("failed", (job, error) => console.error(`[queue] roadmap job ${job?.id} failed`, error.message));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
