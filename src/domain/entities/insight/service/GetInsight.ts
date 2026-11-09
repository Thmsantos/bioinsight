import { RepositoryShape } from "../../../../lib/mongoose/interface.ts";
import { Service } from "../../../interfaces/Service.ts";
import { InsightData } from "../entity/InsightData.ts";

class GetInsightService implements Service<InsightData[]>{
    constructor(
        private readonly repository: RepositoryShape<InsightData>
    ) { }

    public async execute(id: string): Promise<InsightData[] | null>{
        const findedInsight = await this.repository.search([
            { $match: { userId: id }},
            {
                $addFields: {
                    parsedDate: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%d/%m/%Y"
                        }
                    }
                }
            },
            { $sort: { parsedDate: 1 }},
            { $project: { parsedDate: 0 }}
        ]);

        return findedInsight;
    }
}

export { GetInsightService };