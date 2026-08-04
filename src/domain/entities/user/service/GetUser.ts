import { Types } from "mongoose";
import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { UserData } from "../entity/UserData.ts";
import { Service } from "../../../interfaces/Service.ts";

class GetUserService implements Service<UserData>{
    constructor(
        private readonly repository: RepositoryShape<UserData>
    ) { }

    public async execute(params: { id: string }){
        const pipeline = [{
            $match: { _id: new Types.ObjectId(params.id)}
        }];

        console.log(pipeline)

        const findedUser = await this.repository.get(pipeline);

        return findedUser ? findedUser : null;
    }
}

export { GetUserService }