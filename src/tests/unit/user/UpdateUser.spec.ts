import { describe, expect, it } from "vitest";
import UserRepositoryMock from "../../mocks/userRepositoryMock.ts";
import { UpdateUserService } from "../../../domain/entities/user/service/UpdateUser.ts";
import { makeUser } from "../../factories/user.ts";
import { faker } from "@faker-js/faker";

describe('Update user', () => {
    const repository = new UserRepositoryMock();
    const service = new UpdateUserService(repository)

    it("should update user", async () => {
        const createdUser = await repository.create(makeUser());

        const userToUpdate = {
            _id: createdUser!._id,
            email: faker.internet.email(),
        };

        const updatedUser = await service.execute(userToUpdate);
        expect(updatedUser!._id).toBe(createdUser!._id);
    })

    it("should reject invalid id", async () => {
        const user = makeUser();
        await repository.create(user);

        const userToUpdate = {
            _id: "00000eeebbd2054c368d0a36",
            email: faker.internet.email(),
        };

        const updateUser = await service.execute(userToUpdate);

        expect(updateUser).toBeNull();
    })
})