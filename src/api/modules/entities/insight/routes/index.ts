import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../../../middleware/authMiddleware.ts";
import { deleteInsightController, getInsightController, saveInsightController } from "../controller/index.ts";
import { DeleteInsightRequest, GetInsightRequest, SaveInsightRequest } from "../interfaces/index.ts";
import { request } from "node:http";

async function insightRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authMiddleware);

  app.delete<DeleteInsightRequest>(
    "/:id",
    async (request, reply) => {
      return deleteInsightController.handle(request, reply);
    }
  )
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