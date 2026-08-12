import { BaseData } from "../../base/BaseData.ts";

interface InsightData extends BaseData {
  filename: string;
  date: string;
  water: number;
  protein: number;
  fatMass: number;
  weight: number;
  bmi: number;
  fatPercentage: number; 
  basalRate: number;
  visceralFat: number;
  waistAndHips: number;
  userId: string;
}

interface UploadInsightParams {
  filename: string;
  buffer: Buffer;
  userId: string;
}


export { 
  InsightData,
  UploadInsightParams
}
