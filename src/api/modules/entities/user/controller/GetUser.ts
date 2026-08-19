import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserService } from "../../../../../domain/entities/user/service/GetUser.ts";
import { Controller } from "../../../interfaces/Controller.ts";
import { GetUserRequest } from "../interfaces/index.ts";
import { logger } from "../../../../../lib/pino/logger.ts";

class GetUserController implements Controller<GetUserRequest>{
    constructor(
        private readonly service: GetUserService
    ) { }

    public async handle (request: FastifyRequest<GetUserRequest>, reply: FastifyReply){
        try{
            const id = request.params.id;
            const findedUser = await this.service.execute({id});

            if(!findedUser){
                return reply.code(404).send({
                    statusCode: 404,
                    error: "Not found",
                    message: "User not found"
                })
            }

            return reply.code(200).send({
                user: findedUser
            })
        } catch (err){
            logger.error(err)
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error",
                message: "Something went wrong"
            })
        }
    }
}

export { GetUserController };