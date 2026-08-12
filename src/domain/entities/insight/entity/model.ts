import mongoose, { Schema, SchemaTypeOptions } from 'mongoose';
import { InsightData } from './InsightData.ts';
import { Repository } from '../../../../lib/mongoose/Repository.ts';

type InsightType = Required<Omit<
  InsightData,
  '_id' | 'createdAt' | 'updatedAt'
>>;

type InsightModel = { [K in keyof InsightType]: SchemaTypeOptions<InsightData>[K] };

const schema: InsightModel = {
  filename: {
    type: Schema.Types.String,
    required: true
  },

  date: {
    type: Schema.Types.String,
    required: true,
  },

  water: {
    type: Schema.Types.Number,
    required: true,
  },

  protein: {
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
  },

  userId: {
    type: Schema.Types.String,
    required: true,
  }
};

const insightSchema = new Schema<InsightData>(schema, {
  timestamps: true,
  versionKey: false,
  toObject: {
    transform(ret: any) {
      const obj = ret;
      obj.id = obj._id.toString();
      delete obj._id;
    },
  },
});

const InsightModel = mongoose.model('insights', insightSchema);
const insightRepository = new Repository<InsightData>(InsightModel);

export {
  InsightModel,
  insightRepository
};
