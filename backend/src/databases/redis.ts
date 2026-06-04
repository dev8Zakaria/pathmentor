import { createClient } from "redis";
import { env } from "../config/env";

export const redisClient = createClient({ url: env.REDIS_URL });

redisClient.on("error", (error) => {
  console.error("[db] Redis error", error.message);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("[db] Redis connected");
  }
}

export async function safeRedisGet(key: string) {
  if (!redisClient.isOpen) return null;
  return redisClient.get(key);
}

export async function safeRedisSet(key: string, value: string, ttlSeconds?: number) {
  if (!redisClient.isOpen) return;
  if (ttlSeconds) {
    await redisClient.set(key, value, { EX: ttlSeconds });
  } else {
    await redisClient.set(key, value);
  }
}
