import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserService } from "../../../../../domain/entities/user/service/UpdateUser.ts";
import { UpdateUserRequest } from "../interfaces/index.ts";
import { Controller } from "../../../interfaces/Controller.ts";
import { logger } from "../../../../../lib/pino/logger.ts";

class UpdateUserController implements Controller<UpdateUserRequest> {
    constructor(
        private readonly service: UpdateUserService
    ) { }

    public async handle(request: FastifyRequest<UpdateUserRequest>, reply: FastifyReply) {
        try {
            const user = request.body;
            const updatedUser = await this.service.execute(user);
            
            if(!updatedUser) {
                return reply.code(404).send({
                    statusCode: 404, 
                    error: 'user not found',
                    message: "user not exists or not found"
                })
            }

            return reply.code(200).send({
                user: updatedUser,
                message: "successfully updated"
            })
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

export { UpdateUserController }