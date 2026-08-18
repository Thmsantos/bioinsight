import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../../middleware/authMiddleware.ts";
import { getInsightController, saveInsightController } from "../controller/index.ts";
import { GetInsightRequest, SaveInsightRequest } from "../interfaces/index.ts";

async function insightRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authMiddleware);

  app.get<GetInsightRequest>(
    "/:id",
    async (request, reply) => {
      return getInsightController.handle(request, reply);
    }
  )

  app.post<SaveInsightRequest>(
    "/save",
    async (request, reply) => {
      return saveInsightController.handle(request, reply);
    }
  );
}

export { insightRoutes };