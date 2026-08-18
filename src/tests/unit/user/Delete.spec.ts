import { describe, expect, it } from "vitest";
import UserRepositoryMock from "../../mocks/userRepositoryMock.ts";
import { DeleteUserService } from "../../../domain/entities/user/service/Delete.ts";
import { makeUser } from "../../factories/user.ts";
import { RegisterService } from "../../../domain/entities/user/service/Register.ts";

describe("Delete User Service", () => {
    const repository = new UserRepositoryMock();
    const registerservice = new RegisterService(repository);
    const deleteservice = new DeleteUserService(repository);
    
    it("should delete exist user", async () => {
        const user = makeUser();
        const createdUser = await registerservice.execute(user);
        const deletedUser = await deleteservice.execute(String(createdUser!._id))
        expect(deletedUser).toBeTruthy();
    })

    it("should not delete a non-existent user", async () => {
        const user = makeUser();
        await registerservice.execute(user);
        const fakeId = "676767676767676767676767";

        const deletedUser = await deleteservice.execute(fakeId)
        expect(deletedUser).toBeFalsy();
    })
})