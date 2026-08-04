import { describe, expect, it } from "vitest";
import UserRepositoryMock from "../../mocks/userRepositoryMock.ts";
import { makeUser } from "../../factories/user.ts";
import { GetUserService } from "../../../domain/entities/user/service/GetUser.ts";
import { Types } from "mongoose";

describe("Get User Service", () => {
    const repository = new UserRepositoryMock();
    const service = new GetUserService(repository);

    it("should find user", async () => {
        const user = makeUser();
        await repository.create(user);

        const result = await service.execute({
            id: user._id!
        });

        expect(result).toBeDefined();
    });

    it("should not found user", async () => {
        const result = await service.execute({
            id: String(new Types.ObjectId())
        })

        expect(result).toBeNull();
    })
});