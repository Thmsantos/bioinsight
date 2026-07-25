import { authenticateService, registerService } from "../../../../../domain/entities/user/service/index.ts";
import { AuthenticateController } from "./Authenticate.ts";
import { RegisterController } from "./Register.ts";

const authenticateController = new AuthenticateController(authenticateService);

const registerController = new RegisterController(registerService);

export {
    authenticateController,
    registerController
}