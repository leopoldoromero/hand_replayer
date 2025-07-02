import { HttpClient } from "@/modules/shared/domain/http_client";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user";

export class UserApiClient implements UserRepository {
  private readonly API_URL = process.env.API_URL;

  constructor(private httpClient: HttpClient) {}

   async getMe(): Promise<User | null> {
    try {
      const userOrNull = await this.httpClient.get<User | null>(`${this.API_URL}/api/v1/users/me`);
      return userOrNull;
    } catch (error: unknown) {
      throw new Error(
        (error as Error).message || 'Error retrieving user data.'
      );
    }
  }

  async register(params: {username?: string, password: string, email: string}): Promise<void> {
    try {
      await this.httpClient.post<{ username?: string; password: string; email: string }, void>(
        `${this.API_URL}/api/v1/users`,
        params,
      );
    } catch (error: unknown) {
      throw new Error(
        (error as Error).message || 'Failed to register user.'
      );
    }
  }
}

