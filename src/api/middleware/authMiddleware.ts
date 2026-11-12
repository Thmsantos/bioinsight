import { FastifyReply, FastifyRequest } from "fastify";
import { jwt } from "../../lib/jwt/index.ts";
import { getUserService } from "../../domain/entities/user/service/index.ts";

async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return reply.code(401).send({ message: "Token missing" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const data = jwt.verify(token);
        if (data) {
            const findedUser = await getUserService.execute({ id: data._id! });
            if (!findedUser) {
                return reply.code(403).send({ message: "forbidden" });
            }
        }
    } catch (err) {
        return reply.code(401).send({
            statusCode: 401,
            error: err,
            message: "Invalid or expired token",
        });
    }
}

async function whoRequested(request: FastifyRequest): Promise<string | undefined>{
    const authHeader = request.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    
    if(!token){
        return undefined;
    }

    const user = jwt.verify(token);
    return user ? user._id : undefined;
}

export { authMiddleware };