import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify";

interface Controller<T extends RouteGenericInterface> {
    handle(request: FastifyRequest<T>, reply: FastifyReply): Promise<FastifyReply>
}

export { Controller }