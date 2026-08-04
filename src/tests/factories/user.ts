import { faker } from "@faker-js/faker";
import { UserData } from "../../domain/entities/user/entity/UserData.ts";

export function makeUser(
    override?: Partial<UserData>
): UserData {

    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        ...override
    };
}