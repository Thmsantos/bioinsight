import { RouteGenericInterface } from "fastify";
import { UserData } from "../../../../../domain/entities/user/entity/UserData.ts";
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

interface UpdateUserRequest extends RouteGenericInterface {
    Body: UserData;
}

export { 
    GetUserRequest,
    LoginRequest,
    RegisterRequest,
    UpdateUserRequest,
}