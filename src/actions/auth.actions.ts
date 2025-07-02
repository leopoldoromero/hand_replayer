'use server';
import { container } from "@/lib/di.container";
import { getSessionAction } from "./session.actions";

export async function loginAction(credentials: {email: string; password: string }): Promise<{
    accessToken: string;
    refreshToken: string;
}> {
  const result = await container.authApiClient.login(credentials);

  if (result.accessToken !== undefined || result.refreshToken !== undefined) {
    const session = await getSessionAction();
    session.accessToken = result.accessToken;
    session.refreshToken = result.refreshToken;
    session.userId = 'b451dc70-12b9-4cf8-8c2b-d46463365749';
  
    await session.save(); 
  }
  return result
}

export async function logOutAction(): Promise<void> {
  const session = await getSessionAction();
  session.destroy();
}

export async function refreshTokenAction(): Promise<void> {
  await container.authApiClient.refresh();
}
