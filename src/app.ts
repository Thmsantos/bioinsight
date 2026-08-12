import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { connectDb } from "./api/db/connection.ts";
import { authRoutes, userRoutes } from "./api/modules/entities/user/routes/routes.ts";

async function appBuild(): Promise<FastifyInstance> {
  await connectDb();
  const app = Fastify({
    logger: true,
  });

  app.register(authRoutes, {
    prefix: "/auth"
  })


  app.register(userRoutes, {
    prefix: "/user"
  })

  app.get("/", async () => {
    return { status: "ok" };
  });

  return app;
}

export default appBuild;