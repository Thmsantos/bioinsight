import { FastifyInstance } from "fastify";
import { authenticateController, registerController } from "../controller/index.ts";
import { UserRequest } from "../interfaces/index.ts";

async function userRoutes(app: FastifyInstance) {
    app.post<UserRequest>(
        "/authenticate",
        async (request, reply) => {
            return authenticateController.handle(request, reply);
        }
    );

    app.post<UserRequest>(
        "/register",
        async (request, reply) => {
            return registerController.handle(request, reply)
        }
    )
}

export { userRoutes };