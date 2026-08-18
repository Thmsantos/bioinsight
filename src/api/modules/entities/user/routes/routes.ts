import { FastifyInstance } from "fastify";
import { 
    authenticateController,
    deleteUserController,
    getUserController,
    registerController,
    updateUserController
} from "../controller/index.ts";
import { 
    DeleteUserRequest,
    GetUserRequest,
    LoginRequest,
    RegisterRequest,
    UpdateUserRequest
} from "../interfaces/index.ts";
import { authMiddleware } from "../../../../middleware/authMiddleware.ts";

async function userRoutes(app: FastifyInstance) {
    app.addHook('onRequest', authMiddleware);

    app.delete<DeleteUserRequest>(
        "/:id",
        async (request, reply) => {
            return deleteUserController.handle(request, reply)
        }
    )

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