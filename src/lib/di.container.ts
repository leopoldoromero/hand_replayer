import { AuthApiClient } from "@/modules/auth/infrastructure/auth_api_client";
import { HandApiClient } from "@/modules/hand/infrastructure/hand_api_client";
import { AxiosHttpClient } from "@/modules/shared/infrastructure/axios_http_client";
import { UserApiClient } from "@/modules/user/infrastructure/user_api_client";

const cookieJar: string[] = [];
const httpClient = new AxiosHttpClient(cookieJar);

const authApiClient = new AuthApiClient(httpClient);
const userApiClient = new UserApiClient(httpClient);
const handsApiClient = new HandApiClient(httpClient);

export const  container = {
    authApiClient: authApiClient,
    userApiClient: userApiClient,
    handsApiClient: handsApiClient,
}