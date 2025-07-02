import { User } from "./user";

export interface UserRepository {
    getMe(): Promise<User | null>;
    register(params: {username?: string, password: string, email: string}): Promise<void>;
}