import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import {
  getAxiosHttpClient,
} from '@/modules/shared/infrastructure/axios_http_client';
import { CalculateHandVsRangeInput, CalculateRangeVsRangeInput, EquityRepository } from '../domain/equity.repository';
import { Equity } from '../domain/equity';
import { HttpClient, HttpClientError } from '@/modules/shared/domain/http_client';

type CalculateEquityResponse = {
    hero_equity: number;
    villain_equity: number;
    tie_equity: number;
}

const axiosHttpClient: HttpClient = getAxiosHttpClient();

export class EquityApiClient implements EquityRepository {
  private readonly CALCULATOR_API_URL = process.env.CALCULATOR_API_URL;
  private readonly API_KEY = process.env.API_KEY;

  constructor(private httpClient: HttpClient) {}

  async calculateHandVsRange(input: CalculateHandVsRangeInput): Promise<Equity> {
    try {
      const cookieStore = await cookies();
      let userId = cookieStore.get('user_id')?.value;

      if (!userId) {
        userId = uuidv4();
        cookieStore.set('user_id', userId);
      }
      const response = await this.httpClient.post<CalculateHandVsRangeInput, CalculateEquityResponse>(
        `${this.CALCULATOR_API_URL}/api/v1/calculate/equity/hand-vs-range`,
        input,
        {
          headers: {
            'Access-Control-Allow-Origin': this.CALCULATOR_API_URL,
            'x-api-key': this.API_KEY,
            Cookie: `user_id=${userId}`,
          },
          withCredentials: true,
        }
      );
      const {hero_equity, villain_equity, tie_equity} = response;
      return {
        win: hero_equity,
        loose: villain_equity,
        tie: tie_equity,
      }
    } catch (error: unknown) {
      throw new Error(
        (error as HttpClientError).message || 'Error calculating equity (Hand vs Range)..'
      );
    }
  }

  async calculateRangeVsRange(input: CalculateRangeVsRangeInput): Promise<Equity> {
    try {
      const cookieStore = await cookies();
      let userId = cookieStore.get('user_id')?.value;

      if (!userId) {
        userId = uuidv4();
        cookieStore.set('user_id', userId);
      }
      const response = await this.httpClient.post<CalculateRangeVsRangeInput, CalculateEquityResponse>(
        `${this.CALCULATOR_API_URL}/api/v1/calculate/equity/range-vs-range`,
        input,
        {
          headers: {
            'Access-Control-Allow-Origin': this.CALCULATOR_API_URL,
            'x-api-key': this.API_KEY,
            Cookie: `user_id=${userId}`,
          },
          withCredentials: true,
        }
      );
      const {hero_equity, villain_equity, tie_equity} = response;
      return {
        win: hero_equity,
        loose: villain_equity,
        tie: tie_equity,
      }
    } catch (error: unknown) {
      throw new Error(
        (error as HttpClientError).message || 'Error calculating equity (Range vs Range)..'
      );
    }
  }
}

export const equityApiClient: EquityRepository = new EquityApiClient(axiosHttpClient);
