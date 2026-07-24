import { connect } from "mongoose";
import { db } from "../../config/env.ts";
import type mongoose from "mongoose";

async function connectDb(): Promise<mongoose.Mongoose> {
    const mongoose = await connect(String(db.uri!))
    return mongoose;
}

export { connectDb };