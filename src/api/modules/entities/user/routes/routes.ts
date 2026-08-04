import { FastifyInstance } from "fastify";
import { authenticateController, getUserController, registerController } from "../controller/index.ts";
import { GetUserRequest, LoginRequest, RegisterRequest } from "../interfaces/index.ts";
import { request } from "node:http";

async function userRoutes(app: FastifyInstance) {
    app.post<LoginRequest>(
        "/authenticate",
        async (request, reply) => {
            return authenticateController.handle(request, reply);
        }
    );

    app.get<GetUserRequest>(
        "/getUser/:id",
        async (request, reply) => {
            return getUserController.handle(request, reply);
        }
    )

    app.post<RegisterRequest>(
        "/register",
        async (request, reply) => {
            return registerController.handle(request, reply)
        }
    )
}

export { userRoutes };