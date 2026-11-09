import { FastifyRequest, FastifyReply } from "fastify"
import { DeleteInsight } from "../../../../../domain/entities/insight/service/DeleteInsight.ts";
import { Controller } from "../../../interfaces/Controller.ts";
import { DeleteInsightRequest } from "../interfaces/index.ts";
import { logger } from "../../../../../lib/pino/logger.ts";

class DeleteInsightController implements Controller<DeleteInsightRequest>{
    constructor (
        private readonly service: DeleteInsight
    ) { }

    public async handle(
        request: FastifyRequest<DeleteInsightRequest>,
        reply: FastifyReply
    ): Promise<FastifyReply> {
        try {
            const { id } = request.params;
            const findedInsight = await this.service.execute(id);

            if(!findedInsight) {
                return reply.code(404).send({
                    statusCode: 404,
                    message: "insight not found"
                })
            }

            return reply.code(200).send({
                statusCode: 200,
            })
        } catch (err) {
            logger.error(err)
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error"
            })
        }
    }
}

export { DeleteInsightController }