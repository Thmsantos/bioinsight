import { BaseData } from "../base/BaseData.ts";

interface InsightData extends BaseData {
  date: string;
  water: number;
  fatMass: number;
  weight: number;
  bmi: number;
  fatPercentage: number; 
  basalRate: number;
  visceralFat: number;
  waistAndHips: number;
}

export { InsightData }
