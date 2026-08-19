import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserService } from "../../../../../domain/entities/user/service/Delete.ts";
import { Controller } from "../../../interfaces/Controller.ts";
import { DeleteUserRequest } from "../interfaces/index.ts";
import { logger } from "../../../../../lib/pino/logger.ts";

class DeleteUserController implements Controller<DeleteUserRequest>{
    constructor(
        private readonly service: DeleteUserService
    ) { }

    public async handle(request: FastifyRequest<DeleteUserRequest>, reply: FastifyReply) {
        try{
            const { id } = request.params;
            const deleteduser = await this.service.execute(id);

            return deleteduser ?
                reply.code(200).send({
                    statusCode: 200, 
                    message: "deleted user!"
                }) :
                reply.code(404).send({
                    statusCode: 404, 
                    message: "It is not possible to delete this user."
                })
        } catch (err){
            logger.error(err)
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error",
                message: "Something went wrong",
            });
        }
    }
}

export { DeleteUserController }