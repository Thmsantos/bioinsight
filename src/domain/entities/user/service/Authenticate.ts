import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { UserData } from "../entity/UserData.ts";
import { Service } from "../../../interfaces/Service.ts";
import { hashPasswd } from "../../../../lib/bcrypt/index.ts";

class AuthenticateService implements Service<Omit<UserData, 'password'>> {
    constructor(
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(params: UserData) {
        const pipeline = [{
            $match: { email: params.email }
        }]

        const findedUser = await this.repository.get(pipeline); 

        if(!findedUser){ return null; }

        const compare = await hashPasswd.compare(
            params.password,
            findedUser.password
        );
        
        if (!compare) { return null; }

        const { password, ...user } = findedUser;
        return user;
    }
}

export { AuthenticateService }