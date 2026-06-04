import { app } from "./app";
import { env } from "./config/env";
import { connectMongo } from "./databases/mongodb";
import { connectRedis } from "./databases/redis";
import { closeNeo4j } from "./databases/neo4j";

async function bootstrap() {
  await connectMongo();
  await connectRedis();

  const server = app.listen(env.PORT, () => {
    console.log(`[api] PathMentor API running on http://localhost:${env.PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await closeNeo4j();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
