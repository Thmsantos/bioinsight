import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../../middleware/authMiddleware.ts";
import { saveInsightController } from "../controller/index.ts";
import { SaveInsightRequest } from "../interfaces/index.ts";

async function insightRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authMiddleware);

  app.post<SaveInsightRequest>(
    "/save",
    async (request, reply) => {
      return saveInsightController.handle(request, reply);
    }
  );
}

export { insightRoutes };