import { RouteGenericInterface } from "fastify";
interface GetUserRequest extends RouteGenericInterface {
    Params: {
        id: string;
    }
}

interface LoginRequest extends RouteGenericInterface {
    Body: {
        email: string;
        password: string;
    };
}

interface RegisterRequest extends RouteGenericInterface{
    Body: {
        email: string;
        password: string;
    };
}

export { 
    GetUserRequest,
    LoginRequest,
    RegisterRequest
}