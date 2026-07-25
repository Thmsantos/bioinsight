import { UserRepository } from "../entity/model.ts";
import { AuthenticateService } from "./Authenticate.ts";
import { RegisterService } from "./Register.ts";

const authenticateService = new AuthenticateService(UserRepository);

const registerService = new RegisterService(UserRepository);

export {
    authenticateService,
    registerService
}