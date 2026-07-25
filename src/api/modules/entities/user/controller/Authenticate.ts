import { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../../../interfaces/Controller.ts";
import { AuthenticateService } from "../../../../../domain/entities/user/service/Authenticate.ts";
import { UserRequest } from "../interfaces/index.ts";

class AuthenticateController implements Controller<UserRequest> {
    constructor(
        private readonly service: AuthenticateService
    ) { }

    public async handle(request: FastifyRequest<UserRequest>, reply: FastifyReply) {
        try {
            const user = request.body;
            const authenticated = await this.service.execute(user);

            if (!authenticated) {
                return reply.code(401).send({
                    statusCode: 401,
                    error: "Unauthorized",
                    message: "Invalid email or password",
                });
            }

            return reply.code(200).send({
                message: "Logged in successfully",
            });

        } catch (err) {
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error",
                message: "Something went wrong",
            });
        }
    }
}

export { AuthenticateController }