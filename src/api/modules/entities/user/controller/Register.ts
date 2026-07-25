import { FastifyRequest, RawServerDefault, FastifySchema, FastifyTypeProviderDefault, FastifyBaseLogger, FastifyReply } from "fastify";
import { ResolveFastifyRequestType } from "fastify/types/type-provider.js";
import { IncomingMessage } from "node:http";
import { RegisterService } from "../../../../../domain/entities/user/service/Register.ts";
import { Controller } from "../../../interfaces/Controller.ts";
import { UserRequest } from "../interfaces/index.ts";

class RegisterController implements Controller<UserRequest> {
    constructor(
        private readonly service: RegisterService
    ) { }

    public async handle(request: FastifyRequest<UserRequest>, reply: FastifyReply): Promise<FastifyReply> {
        try {
            const user = request.body;
            const registered = await this.service.execute(user);

            if (!registered) {
                return reply.code(409).send({
                    statusCode: 409,
                    error: "Conflict",
                    message: "User already exists"
                })
            }

            return reply.code(200).send({
                message: "Registered user!"
            })
        } catch (err) {
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error",
                message: "Something went wrong"
            })
        }
    }
}

export { RegisterController }