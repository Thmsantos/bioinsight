import { 
    authenticateService,
    getUserService,
    registerService,
    updateUserService
} from "../../../../../domain/entities/user/service/index.ts";
import { AuthenticateController } from "./Authenticate.ts";
import { GetUserController } from "./GetUser.ts";
import { RegisterController } from "./Register.ts";
import { UpdateUserController } from "./UpdateUser.ts";

const authenticateController = new AuthenticateController(authenticateService);

const getUserController = new GetUserController(getUserService);

const registerController = new RegisterController(registerService);

const updateUserController = new UpdateUserController(updateUserService);

export {
    authenticateController,
    getUserController,
    registerController,
    updateUserController,
}