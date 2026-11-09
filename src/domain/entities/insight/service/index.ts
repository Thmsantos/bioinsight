import { insightRepository } from "../entity/model.ts";
import { DeleteInsight } from "./DeleteInsight.ts";
import { GetInsightService } from "./GetInsight.ts";
import { SaveInsightService } from "./SaveInsight.ts";

const deleteInsightService = new DeleteInsight(insightRepository);
const getInsightService = new GetInsightService(insightRepository);
const saveInsightService = new SaveInsightService(insightRepository);

export {
    deleteInsightService,
    getInsightService,
    saveInsightService
}