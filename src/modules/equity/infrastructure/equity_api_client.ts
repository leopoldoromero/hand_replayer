import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import {
  getAxiosHttpClient,
} from '@/modules/shared/infrastructure/axios_http_client';
import { CalculateEquityInput, EquityRepository } from '../domain/equity.repository';
import { Equity } from '../domain/equity';
import { HttpClient } from '@/modules/shared/domain/http_client';

type CalculateEquityResponse = {
    hand_equity: number;
    range_equity: number;
    tie_equity: number;
}
const axiosHttpClient: HttpClient = getAxiosHttpClient();

export class EquityApiClient implements EquityRepository {
  private readonly API_URL = process.env.API_URL;
  private readonly API_KEY = process.env.API_KEY;

  constructor(private httpClient: HttpClient) {}

  async calculate(input: CalculateEquityInput): Promise<Equity> {
    try {
      const cookieStore = await cookies();
      let userId = cookieStore.get('user_id')?.value;

      if (!userId) {
        userId = uuidv4();
        cookieStore.set('user_id', userId);
      }
      const response = await this.httpClient.post<CalculateEquityInput, CalculateEquityResponse>(
        `${this.API_URL}/api/v1/calculate/equity`,
        input,
        {
          headers: {
            'Access-Control-Allow-Origin': this.API_KEY,
            'x-api-key': this.API_KEY,
            Cookie: `user_id=${userId}`,
          },
          withCredentials: true,
        }
      );
      const {hand_equity, range_equity, tie_equity} = response;
      return {
        win: hand_equity,
        loose: range_equity,
        tie: tie_equity,
      }
    } catch (error: unknown) {
      console.error(
        'Error calculating equity:',
        JSON.stringify((error as AxiosError).response?.data)
      );
      throw new Error(
        (error as AxiosError).message || 'Error calculating equity..'
      );
    }
  }
}

export const equityApiClient: EquityRepository = new EquityApiClient(axiosHttpClient);
