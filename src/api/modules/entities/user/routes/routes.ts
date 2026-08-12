import { FastifyInstance } from "fastify";
import { authenticateController, getUserController, registerController, updateUserController } from "../controller/index.ts";
import { GetUserRequest, LoginRequest, RegisterRequest, UpdateUserRequest } from "../interfaces/index.ts";
import { request } from "node:http";
import { authMiddleware } from "../../../../middleware/authMiddleware.ts";

async function userRoutes(app: FastifyInstance) {
    app.addHook('onRequest', authMiddleware);

    app.get<GetUserRequest>(
        "/getUser/:id",
        async (request, reply) => {
            return getUserController.handle(request, reply);
        }
    )

    app.put<UpdateUserRequest>(
        "/",
        async (request, reply) => {
            return updateUserController.handle(request, reply)
        }
    )
}

async function authRoutes(app: FastifyInstance) {
    app.post<LoginRequest>(
        "/authenticate",
        async (request, reply) => {
            return authenticateController.handle(request, reply);
        }
    );


    app.post<RegisterRequest>(
        "/register",
        async (request, reply) => {
            return registerController.handle(request, reply)
        }
    )
}

export { 
    authRoutes,
    userRoutes
};