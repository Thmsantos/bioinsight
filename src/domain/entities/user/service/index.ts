import { UserRepository } from "../entity/model.ts";
import { AuthenticateService } from "./Authenticate.ts";
import { GetUserService } from "./GetUser.ts";
import { RegisterService } from "./Register.ts";
import { UpdateUserService } from "./UpdateUser.ts";

const authenticateService = new AuthenticateService(UserRepository);

const getUserService = new GetUserService(UserRepository);

const registerService = new RegisterService(UserRepository);

const updateUserService = new UpdateUserService(UserRepository);

export {
    authenticateService,
    getUserService,
    registerService,
    updateUserService
}