import { faker } from "@faker-js/faker";
import { UserData } from "../../domain/entities/user/entity/UserData.ts";
import { Types } from "mongoose";

export function makeUser(): UserData {
    return {
        _id: new Types.ObjectId().toString(),
        email: faker.internet.email(),
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}