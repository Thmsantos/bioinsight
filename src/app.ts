import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { connectDb } from "./api/db/connection.ts";
import { authRoutes, userRoutes } from "./api/modules/entities/user/routes/routes.ts";
import multipart from "@fastify/multipart";
import { insightRoutes } from "./api/modules/entities/insight/routes/index.ts";

async function appBuild(): Promise<FastifyInstance> {
  await connectDb();
  const app = Fastify({ logger: true });

  await app.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }
  });
  
  app.register(authRoutes, { prefix: "/auth" })
  app.register(insightRoutes, { prefix: "/insight" })
  app.register(userRoutes, { prefix: "/user" })
  app.get("/", async () => { return { status: "ok" } });
  return app;
}

export default appBuild;