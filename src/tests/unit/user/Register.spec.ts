import { describe, expect, it } from "vitest";
import UserRepositoryMock from "../../mocks/userRepositoryMock.ts";
import { RegisterService } from "../../../domain/entities/user/service/Register.ts";
import { makeUser } from "../../factories/user.ts";


describe("Register User Service", () => {
    it("should register a new user", async () => {
        const repository = new UserRepositoryMock();
        const service = new RegisterService(repository);

        const user = makeUser();

        const result = await service.execute(user);
        expect(result).toEqual(
            expect.objectContaining({ email: user.email,  password: user.password })
        );
    });
});