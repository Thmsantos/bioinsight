import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { Service } from "../../../interfaces/Service.ts";
import { UserData } from "../entity/UserData.ts";

class DeleteUserService implements Service<Boolean>{
    constructor(
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(id: string): Promise<Boolean | null> {
        const deleteduser = await this.repository.delete(id);
        return deleteduser;
    }
}

export { DeleteUserService };