import { saveInsightService } from "../../../../../domain/entities/insight/service/index.ts";
import { SaveInsightController } from "./SaveInsight.ts";

const saveInsightController = new SaveInsightController(saveInsightService);

export {
    saveInsightController
}