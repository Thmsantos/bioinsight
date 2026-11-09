import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { Service } from "../../../interfaces/Service.ts";
import { InsightData } from "../entity/InsightData.ts";

class DeleteInsight implements Service<Boolean>{
    constructor(
        private readonly repository: RepositoryShape<InsightData>
    ) { }

    public async execute(id: string): Promise<Boolean> {
        const deletedInsight = await this.repository.delete(id);
        return deletedInsight;
    }
}

export { DeleteInsight }