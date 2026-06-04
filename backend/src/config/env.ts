import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().default("mongodb://localhost:27017/pathmentor"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  NEO4J_URI: z.string().default("bolt://localhost:7687"),
  NEO4J_USER: z.string().default("neo4j"),
  NEO4J_PASSWORD: z.string().default("pathmentor_password"),
  JWT_ACCESS_SECRET: z.string().default("dev_access_secret_change_me"),
  JWT_REFRESH_SECRET: z.string().default("dev_refresh_secret_change_me"),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  AI_PROVIDER: z.string().default("mock"),
  OPENAI_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-3-flash-preview")
});

export const env = envSchema.parse(process.env);
