import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { UserData } from "../entity/UserData.ts";
import { Service } from "../../../interfaces/Service.ts";

class RegisterService implements Service<UserData> {
    constructor(
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(params: UserData) {
        const userAlreadyExists = await this.userAlreadyExists(params.email);

        if (!userAlreadyExists) {
            const registered = await this.repository.create(params);
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