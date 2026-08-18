import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { Service } from "../../../interfaces/Service.ts";
import { InsightData } from "../entity/InsightData.ts";

class GetInsightService implements Service<InsightData>{
    constructor(
        private readonly repository: RepositoryShape<InsightData>
    ) { }

    public async execute(id: string): Promise<InsightData | null>{
        const findedInsight = await this.repository.get([{
            '$match': { userId: id}
        }])

        return findedInsight
    }
}

export { GetInsightService }