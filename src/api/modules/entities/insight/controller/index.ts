import { 
    getInsightService,
    saveInsightService
} from "../../../../../domain/entities/insight/service/index.ts";
import { GetInsightController } from "./GetInsight.ts";
import { SaveInsightController } from "./SaveInsight.ts";

const getInsightController = new GetInsightController(getInsightService);

const saveInsightController = new SaveInsightController(saveInsightService);

export {
    getInsightController,
    saveInsightController
}