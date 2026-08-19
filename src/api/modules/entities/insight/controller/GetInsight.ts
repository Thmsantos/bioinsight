import { FastifyReply, FastifyRequest } from "fastify";
import { GetInsightService } from "../../../../../domain/entities/insight/service/GetInsight.ts";
import { GetInsightRequest } from "../interfaces/index.ts";
import { Controller } from "../../../interfaces/Controller.ts";
import { logger } from "../../../../../lib/pino/logger.ts";

class GetInsightController implements Controller<GetInsightRequest>{
    constructor(
        private readonly service: GetInsightService
    ) { }

    public async handle(
        request: FastifyRequest<GetInsightRequest>,
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
                data: findedInsight
            })
        } catch (err) {
            logger.error(err)
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal Server Error"
            });
        } 
    }
}

export { GetInsightController }