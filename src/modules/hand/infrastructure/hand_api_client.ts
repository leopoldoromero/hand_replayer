import { AxiosError } from 'axios';
import { Hand } from '../domain/hand';
import { HandRepository } from '../domain/hand.repository';
import { HandDto, PlayersStatsDto } from './history_parser_api.response';
import { handDtoToDomainMapper } from './hand_api_response_to_domain.mapper';
import { cookies } from 'next/headers';
import { PlayerStats } from '../domain/player_stats';
import { v4 as uuidv4 } from 'uuid';
import {
  getAxiosHttpClient,
  HttpErrorDto,
} from '@/modules/shared/infrastructure/axios_http_client';
import { HttpClient } from '../../shared/domain/http_client';
interface GetHandResponse {
  hand: HandDto;
  prev_hand_id: string;
  next_hand_id: string;
}

const axiosHttpClient: HttpClient = getAxiosHttpClient();

export class HandApiClient implements HandRepository {
  private readonly API_URL = process.env.API_URL;
  private readonly API_KEY = process.env.API_KEY;

  constructor(private httpClient: HttpClient) {}

  async upload(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const cookieStore = await cookies();
      let userId = cookieStore.get('user_id')?.value;

      if (!userId) {
        userId = uuidv4();
        cookieStore.set('user_id', userId);
      }
      await this.httpClient.post<FormData, void>(
        `${this.API_URL}/api/v1/hands`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': this.API_KEY,
            'x-api-key': this.API_KEY,
            Cookie: `user_id=${userId}`,
          },
          withCredentials: true,
        }
      );
    } catch (error: unknown) {
      console.error(
        'Error uploading file:',
        (error as AxiosError).response?.data
      );
      throw new Error(
        (error as AxiosError).message || 'Failed to parse hand history.'
      );
    }
  }

  async get(id: string): Promise<{
    hand: Hand;
    prevHandId: string | null;
    nextHandId: string | null;
  } | null> {
    const cookieStore = await cookies();
    let userId = cookieStore.get('user_id')?.value;

    if (!userId) {
      userId = uuidv4();
      cookieStore.set('user_id', userId);
    }
    try {
      const response = await this.httpClient.get<GetHandResponse>(
        `${this.API_URL}/api/v1/hands/${id}`,
        {
          headers: {
            'Access-Control-Allow-Origin': this.API_KEY,
            'x-api-key': this.API_KEY,
            Cookie: `user_id=${userId}`,
          },
          withCredentials: true,
        }
      );
      let playerStats = undefined;

      try {
        playerStats = await this.getStats();
      } catch (error) {
        console.error(`Error getting stats for hand: ${response?.hand.id}: ${(error as HttpErrorDto).message}`)
      }

      return {
        hand: handDtoToDomainMapper(response?.hand, playerStats),
        prevHandId: response?.prev_hand_id,
        nextHandId: response?.next_hand_id,
      };
    } catch (error) {
      console.error(
        `Error getting hand: ${Object.entries(error as HttpErrorDto)}`
      );
      throw new Error((error as HttpErrorDto).message || 'Failed to get hand.');
    }
  }

  async getAll(): Promise<Array<Hand>> {
    const cookieStore = await cookies();
    let userId = cookieStore.get('user_id')?.value;

    if (!userId) {
      userId = uuidv4();
      cookieStore.set('user_id', userId);
    }
    const response = await this.httpClient.get<Array<HandDto>>(
      `${this.API_URL}/api/v1/hands`,
      {
        headers: {
          'Access-Control-Allow-Origin': this.API_KEY,
          'x-api-key': this.API_KEY,
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    const hands: Array<Hand> = response.map((handDto) =>
      handDtoToDomainMapper(handDto)
    );
    return hands;
  }

  async getStats(): Promise<PlayerStats> {
    const cookieStore = await cookies();
    let userId = cookieStore.get('user_id')?.value;

    if (!userId) {
      userId = uuidv4();
      cookieStore.set('user_id', userId);
    }
    const response = await this.httpClient.get<PlayersStatsDto>(
      `${this.API_URL}/api/v1/stats`,
      {
        headers: {
          'Access-Control-Allow-Origin': this.API_KEY,
          'x-api-key': this.API_KEY,
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    const playerStats: PlayerStats = {};

    Object.entries(response).forEach(([player, stats]) => {
      playerStats[player] = {
        hands: stats?.hands,
        vpip: stats?.vpip,
        pfr: stats?.pfr,
        threeBetPercent: stats?.three_bet_percent,
      };
    });
    return playerStats;
  }
}

export const handApiClient: HandRepository = new HandApiClient(axiosHttpClient);
