import { AxiosError } from 'axios';
import { Hand } from '../domain/hand';
import { HandRepository } from '../domain/hand.repository';
import { HandDto, PlayersStatsDto } from './history_parser_api.response';
import { handDtoToDomainMapper } from './hand_api_response_to_domain.mapper';
import { PlayerStats } from '../domain/player_stats';
import {
  HttpErrorDto,
} from '@/modules/shared/infrastructure/axios_http_client';
import { HttpClient } from '../../shared/domain/http_client';
interface GetHandResponse {
  hand: HandDto;
  prev_hand_id: string;
  next_hand_id: string;
}

export class HandApiClient implements HandRepository {
  private readonly API_URL = process.env.API_URL;

  constructor(private httpClient: HttpClient) {}

  async upload(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await this.httpClient.post<FormData, void>(
        `${this.API_URL}/api/v1/hands`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
    try {
      const response = await this.httpClient.get<GetHandResponse>(
        `${this.API_URL}/api/v1/hands/${id}`,
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
    const response = await this.httpClient.get<Array<HandDto>>(
      `${this.API_URL}/api/v1/hands`,
    );
    const hands: Array<Hand> = response.map((handDto) =>
      handDtoToDomainMapper(handDto)
    );
    return hands;
  }

  async getStats(): Promise<Array<PlayerStats>> {
    const response = await this.httpClient.get<Array<PlayersStatsDto>>(
      `${this.API_URL}/api/v1/hands/stats`,
    );

    return response?.map((playerStat) => ({
        name: playerStat?.name,
        hands: playerStat?.hands,
        vpip: playerStat?.vpip,
        pfr: playerStat?.pfr,
        threeBetPercent: playerStat?.three_bet_percent,
      }));
  }
}

