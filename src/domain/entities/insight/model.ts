import mongoose, { Schema, SchemaTypeOptions } from 'mongoose';
import { InsightData } from './InsightData.ts';
import { Repository } from '../../../lib/mongoose/Repository.ts';
import Insight from './Insight.ts';

type InsightType = Required<Omit<
InsightData,
'_id' | 'createdAt' | 'updatedAt'
>>;

type InsightModel = { [ K in keyof InsightType ]: SchemaTypeOptions<InsightData>[K] };

const schema: InsightModel = {
  date: {
    type: Schema.Types.String,
    required: true,
  },

  water: {
    type: Schema.Types.Number,
    required: true,
  },

  fatMass: {
    type: Schema.Types.Number,
    required: true,
  },

  weight: {
    type: Schema.Types.Number,
    required: true,
  },

  bmi: {
    type: Schema.Types.Number,
    required: true,
  },

  fatPercentage: {
    type: Schema.Types.Number,
    required: true,
  },

  basalRate: {
    type: Schema.Types.Number,
    required: true,
  },

  visceralFat: {
    type: Schema.Types.Number,
    required: true,
  },

  waistAndHips: {
    type: Schema.Types.Number,
    required: true,
  }
};

const insightSchema = new Schema<InsightData>(schema, {
  timestamps: true,
  versionKey: false,
  toObject: {
    transform(doc, ret: any) {
      const obj = ret;
      obj.id = obj._id.toString();
      delete obj._id;
    },
  },
});

const InsightModel = mongoose.model('insights', insightSchema);
const InsightRepository = new Repository<InsightData>(InsightModel);
export default InsightModel;
