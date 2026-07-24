import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { connectDb } from "./api/db/connection.ts";

async function appBuild(): Promise<FastifyInstance> {
    await connectDb();
    const app = Fastify({
      logger: true,
    });

    app.get("/", async () => {
      return { status: "ok" };
    });

    return app;
}

export default appBuild;