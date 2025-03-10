import  { AxiosError } from 'axios';
import { Hand } from '../domain/hand';
import { HandRepository } from '../domain/hand.repository';
import { HandDto, PlayersStatsDto } from './history_parser_api.response';
import { handDtoToDomainMapper } from './history_parser_api_to_domain.mapper';
import { cookies } from 'next/headers';
import { PlayerStats } from '../domain/player_stats';
import { v4 as uuidv4 } from 'uuid';
import { getAxiosHttpClient } from '@/modules/shared/infrastructure/axios_http_client';
interface GetHandResponse {
  hand: HandDto;
  prev_hand_id: string;
  next_hand_id: string;
}

const axiosHttpClient = getAxiosHttpClient();

export class HandApiClient implements HandRepository {
  private readonly API_URL = process.env.API_URL;

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
      await axiosHttpClient.post<FormData, void>(`${this.API_URL}/api/v1/hands`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      });
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
    const response = await axiosHttpClient.get<GetHandResponse>(
      `${this.API_URL}/api/v1/hands/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    console.log('[[HandsApiClient get hand response]]:', response)
    const playeerStats = await this.getStats();
    // TODO: the next lines are usefull to test full ring styles
    // response.data.hand.players.push(...response.data.hand.players.slice(0,3).map((el) => ({
    //     ...el,
    //     seat: el.seat + 6,
    //     name: `${el.name}-${Math.random().toFixed(0)}`
    // })))
    return {
      hand: handDtoToDomainMapper(response?.hand, playeerStats),
      prevHandId: response?.prev_hand_id,
      nextHandId: response?.next_hand_id,
    };
  }

  async getAll(): Promise<Array<Hand>> {
    const cookieStore = await cookies();
    let userId = cookieStore.get('user_id')?.value;

    if (!userId) {
      userId = uuidv4();
      cookieStore.set('user_id', userId);
    }
    const response = await axiosHttpClient.get<Array<HandDto>>(
      `${this.API_URL}/api/v1/hands`,
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    console.log('[[HandsApiClient get hands response]]:', response)
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
    const response = await axiosHttpClient.get<PlayersStatsDto>(
      `${this.API_URL}/api/v1/stats`,
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    console.log('[[HandsApiClient get stats response]]:', response)
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

export const handApiClient: HandRepository = new HandApiClient();
