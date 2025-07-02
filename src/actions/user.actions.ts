'use server';
import { container } from "@/lib/di.container";
import { User } from "@/modules/user/domain/user";

export async function getMeAction(): Promise<User | null> {
  return container.userApiClient.getMe();
}

export async function registerUserAction(params: {username?: string, password: string, email: string}): Promise<void> {
  return container.userApiClient.register(params);
}
