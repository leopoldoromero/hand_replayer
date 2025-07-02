import { HttpClient } from "@/modules/shared/domain/http_client";
import { AuthRepository } from "../domain/auth.repository";
import { getSessionDataAction } from "@/actions/session.actions";


export class AuthApiClient implements AuthRepository {
  private readonly API_URL = process.env.API_URL;

  constructor(private httpClient: HttpClient) {}

  async login(credentials: {email: string, password: string}): Promise<{ accessToken: string; refreshToken: string}> {
    try {
      const response = await this.httpClient.post<{ email: string; password: string }, { access_token: string; refresh_token: string}>(
        `${this.API_URL}/api/v1/auth/login`,
        credentials,
      );
      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
    }
    } catch (error: unknown) {
      throw new Error(
        (error as Error).message || 'Failed to login.'
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post<null, void>(
        `${this.API_URL}/api/v1/auth/logout`,
        null,
      );
    } catch (error: unknown) {
      throw new Error(
        (error as Error).message || 'Failed to logout.'
      );
    }
  }

  async refresh(): Promise<void> {
    const { refreshToken } = await getSessionDataAction();

    if (!refreshToken) {
      return;
    }

    try {
      await this.httpClient.get<void>(
        `${this.API_URL}/api/v1/auth/refresh`,
        {
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
          },
        }
      );
    } catch (error: unknown) {
      throw new Error(
        (error as Error).message || 'Failed to refresh.'
      );
    }
  }
}

