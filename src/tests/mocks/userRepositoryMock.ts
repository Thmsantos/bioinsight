import { UserData } from "../../domain/entities/user/entity/UserData.ts";
import { RepositoryShape } from "../../lib/mongoose/interface.ts";
import { randomUUID } from "node:crypto";

class UserRepositoryMock implements RepositoryShape<UserData> {
    private users: UserData[] = [];

    async create(param: UserData): Promise<UserData | null> {
        const user: UserData = {
            ...param,
            _id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.users.push(user);
        return user;
    }

    async update(
        id: string,
        param: Partial<UserData>
    ): Promise<UserData | null> {
        const userIndex = this.users.findIndex(
            user => user._id === id
        );

        if (userIndex === -1) {
            return null;
        }

        const updatedUser = {
            ...this.users[userIndex],
            ...param,
            updatedAt: new Date(),
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    async get(
        pipeline: any[]
    ): Promise<UserData | null> {

        const matchStage = pipeline.find(
            stage => stage.$match
        );

        if (!matchStage) {
            return null;
        }

        const filters = matchStage.$match;

        const user = this.users.find(user => {
            return Object.entries(filters)
                .every(([key, value]) => {
                    return user[key as keyof UserData] === value;
                });
        });

        return user ?? null;
    }

    async delete(id: string): Promise<boolean> {
        const userIndex = this.users.findIndex(
            user => user._id === id
        );

        if (userIndex === -1) {
            return false;
        }

        this.users.splice(userIndex, 1);
        return true;
    }

    public getUsers(): UserData[] {
        return this.users;
    }
}

export default UserRepositoryMock;