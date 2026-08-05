import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { Service } from "../../../interfaces/Service.ts";
import { UserData } from "../entity/UserData.ts";

class UpdateUserService implements Service<Partial<UserData>> {
    constructor (
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(params: Partial<UserData>) {
        const updatedUser = await this.repository.update(
            params._id!,
            params
        );

        if (!updatedUser) return null;

        const { password, ...userWithoutPassword } = updatedUser;

        return userWithoutPassword;
    }
}

export { UpdateUserService }