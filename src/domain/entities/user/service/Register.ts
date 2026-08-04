import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { UserData } from "../entity/UserData.ts";
import { Service } from "../../../interfaces/Service.ts";
import { hashPasswd } from "../../../../lib/bcrypt/index.ts";

class RegisterService implements Service<UserData> {
    constructor(
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(params: UserData) {
        const userAlreadyExists = await this.userAlreadyExists(params.email);
        
        if (!userAlreadyExists) {
            const hashedPassword = await hashPasswd.encrypt(params.password);

            const userToCreate = {
                ...params,
                password: hashedPassword
            };

            const registered = await this.repository.create(userToCreate);
            return registered
        }

        return null;
    }

    private async userAlreadyExists(email: string): Promise<UserData | null> {
        const pipeline = [{
            $match: { email }
        }];

        const exists = await this.repository.get(pipeline);
        return exists;
    }
}

export { RegisterService }