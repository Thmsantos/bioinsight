import { 
    authenticateService,
    deleteUserService,
    getUserService,
    registerService,
    updateUserService
} from "../../../../../domain/entities/user/service/index.ts";
import { AuthenticateController } from "./Authenticate.ts";
import { DeleteUserController } from "./DeleteUser.ts";
import { GetUserController } from "./GetUser.ts";
import { RegisterController } from "./Register.ts";
import { UpdateUserController } from "./UpdateUser.ts";

const authenticateController = new AuthenticateController(authenticateService);

const deleteUserController = new DeleteUserController(deleteUserService);

const getUserController = new GetUserController(getUserService);

const registerController = new RegisterController(registerService);

const updateUserController = new UpdateUserController(updateUserService);

export {
    authenticateController,
    deleteUserController,
    getUserController,
    registerController,
    updateUserController,
}