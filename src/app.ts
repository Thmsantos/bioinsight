import Fastify from "fastify";
import type { FastifyInstance } from "fastify";

async function appBuild(): Promise<FastifyInstance> {
    const app = Fastify({
      logger: true,
    });

    app.get("/", async () => {
      return { status: "ok" };
    });

    return app;
}

export default appBuild;