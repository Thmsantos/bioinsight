import { connect } from "mongoose";
import { db } from "../../config/env.ts";
import type mongoose from "mongoose";
import { logger } from "../../lib/pino/logger.ts";

async function connectDb(): Promise<mongoose.Mongoose> {
    const mongoose = await connect(String(db.uri!))
    logger.info('MongoDB connected successfully');
    return mongoose;
}

export { connectDb };