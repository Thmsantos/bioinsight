import { insightRepository } from "../entity/model.ts";
import { SaveInsightService } from "./SaveInsight.ts";

const saveInsightService = new SaveInsightService(insightRepository);

export {
    saveInsightService
}