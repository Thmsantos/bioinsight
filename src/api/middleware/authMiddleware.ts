import { FastifyReply, FastifyRequest } from "fastify";
import { jwt } from "../../lib/jwt/index.ts";
import { getUserService } from "../../domain/entities/user/service/index.ts";

async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const token = request.headers.authorization;

    try{
        const data = jwt.verify(token!);
        if(data){
            const findedUser = await getUserService.execute({ id: data._id! })
            if(!findedUser){
                reply.code(403).send({
                    message: 'forbidden'
                })
            }
        }
    } catch (err) {
        reply.code(500).send({
            statusCode: 500,
            error: err,
            message: "Something went wrong",
        })
    }
}

export { authMiddleware }