import { authenticateService, getUserService, registerService } from "../../../../../domain/entities/user/service/index.ts";
import { AuthenticateController } from "./Authenticate.ts";
import { GetUserController } from "./GetUser.ts";
import { RegisterController } from "./Register.ts";

const authenticateController = new AuthenticateController(authenticateService);

const getUserController = new GetUserController(getUserService);

const registerController = new RegisterController(registerService);

export {
    authenticateController,
    getUserController,
    registerController
}