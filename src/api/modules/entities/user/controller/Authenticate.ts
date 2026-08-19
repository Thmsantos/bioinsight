import { FastifyReply, FastifyRequest } from "fastify";
import { Controller } from "../../../interfaces/Controller.ts";
import { AuthenticateService } from "../../../../../domain/entities/user/service/Authenticate.ts";
import { LoginRequest } from "../interfaces/index.ts";
import { jwt } from "../../../../../lib/jwt/index.ts";
import { logger } from "../../../../../lib/pino/logger.ts";

class AuthenticateController implements Controller<LoginRequest> {
    constructor(
        private readonly service: AuthenticateService
    ) { }

    public async handle(request: FastifyRequest<LoginRequest>, reply: FastifyReply) {
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

            const token = await jwt.generate(user)

            return reply.code(200).send({
                token,
                message: "Logged in successfully",
            });

        } catch (err) {
            logger.error(err)
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error",
                message: "Something went wrong",
            });
        }
    }
}

export { AuthenticateController }