import { describe, expect, it } from "vitest";
import UserRepositoryMock from "../../mocks/userRepositoryMock.ts";
import { AuthenticateService } from "../../../domain/entities/user/service/Authenticate.ts";
import { makeUser } from "../../factories/user.ts";
import { hashPasswd } from "../../../lib/bcrypt/index.ts";

describe("Authenticate User Service", () => {
    it("should authenticate user", async () => {
        const repository = new UserRepositoryMock();

        const user = makeUser();

        await repository.create({email: user.email, password: await hashPasswd.encrypt("123456")});
        const service = new AuthenticateService(repository);

        const result = await service.execute({
            email: user.email,
            password: user.password
        });
        expect(result).not.toBeNull();
    });


    it("should reject invalid password", async () => {
        const repository = new UserRepositoryMock();

        const user = makeUser();

        await repository.create(user);
        const service = new AuthenticateService(repository);

        const result = await service.execute({
            email: user.email,
            password: "six seven"
        });

        expect(result).toBeNull();
    });
});