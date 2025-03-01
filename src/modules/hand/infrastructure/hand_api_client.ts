import axios, { AxiosError, AxiosResponse } from 'axios';
import { Hand } from '../domain/hand';
import { HandRepository } from '../domain/hand.repository';
import { HandDto, PlayersStatsDto } from './history_parser_api.response';
import { handDtoToDomainMapper } from './history_parser_api_to_domain.mapper';
import { cookies } from 'next/headers';
import { PlayerStats } from '../domain/player_stats';
import { v4 as uuidv4 } from 'uuid';
interface GetHandResponse {
  hand: HandDto;
  prev_hand_id: string;
  next_hand_id: string;
}

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
      await axios.post<File, void>(`${this.API_URL}/api/v1/hands`, formData, {
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
    const response = await axios.get<File, AxiosResponse<GetHandResponse>>(
      `${this.API_URL}/api/v1/hands/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );

    const playeerStats = await this.getStats();
    // TODO: the next lines are usefull to test full ring styles
    // response.data.hand.players.push(...response.data.hand.players.slice(0,3).map((el) => ({
    //     ...el,
    //     seat: el.seat + 6,
    //     name: `${el.name}-${Math.random().toFixed(0)}`
    // })))
    return {
      hand: handDtoToDomainMapper(response?.data?.hand, playeerStats),
      prevHandId: response?.data?.prev_hand_id,
      nextHandId: response?.data?.next_hand_id,
    };
  }

  async getAll(): Promise<Array<Hand>> {
    const cookieStore = await cookies();
    let userId = cookieStore.get('user_id')?.value;

    if (!userId) {
      userId = uuidv4();
      cookieStore.set('user_id', userId);
    }
    const response = await axios.get<File, AxiosResponse<Array<HandDto>>>(
      `${this.API_URL}/api/v1/hands`,
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    const hands: Array<Hand> = response?.data?.map((handDto) =>
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
    const response = await axios.get<File, AxiosResponse<PlayersStatsDto>>(
      `${this.API_URL}/api/v1/stats`,
      {
        headers: {
          'Access-Control-Allow-Origin': 'localhost:8000',
          Cookie: `user_id=${userId}`,
        },
        withCredentials: true,
      }
    );
    const playerStats: PlayerStats = {};

    Object.entries(response?.data).forEach(([player, stats]) => {
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
