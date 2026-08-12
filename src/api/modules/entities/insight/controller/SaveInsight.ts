import { FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "../../../interfaces/Controller.ts";
import { SaveInsightService } from "../../../../../domain/entities/insight/service/SaveInsight.ts";
import { SaveInsightRequest } from "../interfaces/index.ts";

class SaveInsightController implements Controller<SaveInsightRequest> {
  constructor(
    private readonly service: SaveInsightService
  ) {}

  public async handle(
    request: FastifyRequest<SaveInsightRequest>, 
    reply: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const fileData = await request.file();

      if (!fileData) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "File not received"
        });
      }

      if (fileData.mimetype !== "application/pdf") {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "Only pdf are allowed"
        });
      }

      const userIdField = fileData.fields.userId;
      const field = Array.isArray(userIdField) ? userIdField[0] : userIdField;
      const userId = field && 'value' in field ? (field.value as string) : undefined;

      if (!userId) {
        return reply.code(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: "userId is required"
        });
}

      const buffer = await fileData.toBuffer();

      const insight = await this.service.execute({
        filename: fileData.filename,
        buffer,
        userId,
      });

      return reply.code(201).send({
        message: "created insight!",
        data: insight
      });
    } catch (err: any) {
      return reply.code(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: err.message || "err in insight proccess"
      });
    }
  }
}

export { SaveInsightController };