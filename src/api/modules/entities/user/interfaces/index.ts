import { RouteGenericInterface } from "fastify";

interface UserRequest extends RouteGenericInterface {
    Body: {
        email: string;
        password: string;
    };
}

export { UserRequest }