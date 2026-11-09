import { 
    deleteInsightService,
    getInsightService,
    saveInsightService
} from "../../../../../domain/entities/insight/service/index.ts";
import { DeleteInsightController } from "./DeleteInsight.ts";
import { GetInsightController } from "./GetInsight.ts";
import { SaveInsightController } from "./SaveInsight.ts";

const deleteInsightController = new DeleteInsightController(deleteInsightService);

const getInsightController = new GetInsightController(getInsightService);

const saveInsightController = new SaveInsightController(saveInsightService);

export {
    deleteInsightController,
    getInsightController,
    saveInsightController
}