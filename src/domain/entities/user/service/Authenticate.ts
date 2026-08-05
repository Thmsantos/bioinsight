import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { UserData } from "../entity/UserData.ts";
import { Service } from "../../../interfaces/Service.ts";
import { hashPasswd } from "../../../../lib/bcrypt/index.ts";

class AuthenticateService implements Service<UserData> {
    constructor(
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(params: UserData) {
        const pipeline = [{
            $match: { email: params.email }
        }]

        const findedUser = await this.repository.get(pipeline); 

        const compare = findedUser ? await hashPasswd.compare(params.password, findedUser.password) : null
        if (!compare) {
            return null;
        }

        return params;
    }
}

export { AuthenticateService }