import { insightRepository } from "../entity/model.ts";
import { GetInsightService } from "./GetInsight.ts";
import { SaveInsightService } from "./SaveInsight.ts";

const getInsightService = new GetInsightService(insightRepository);
const saveInsightService = new SaveInsightService(insightRepository);

export {
    getInsightService,
    saveInsightService
}