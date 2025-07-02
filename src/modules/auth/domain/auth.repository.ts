export interface AuthRepository {
    login(credentials: {email: string, password: string}): Promise<{ accessToken: string; refreshToken: string }>;
    logout(): Promise<void>;
    refresh(): Promise<void>;
}