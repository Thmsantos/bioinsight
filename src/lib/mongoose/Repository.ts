import mongoose from "mongoose";
import { RepositoryShape } from "./interface.ts";

class Repository<T> implements RepositoryShape<T> {
    constructor(
        private readonly model: mongoose.Model<T>
    ) { }

    public async create(param: T): Promise<T | null> {
        const created = await this.model.create(param);
        return created.toObject();
    }

    public async update(id: string, param: Partial<T>): Promise<T | null> {
        const updated = await this.model.findByIdAndUpdate({
            id,
            param,
        });

        return updated ? updated.toObject() : null;
    }

    public async get(pipeline: any[]): Promise<T> {
        const gotData = await this.model.aggregate(pipeline);
        return gotData[0] ?? null;
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.model.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}

export { Repository }