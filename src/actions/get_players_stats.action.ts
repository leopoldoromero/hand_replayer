'use server';
import { PlayerStats } from '@/modules/hand/domain/player_stats';
import { handApiClient } from '@/modules/hand/infrastructure/hand_api_client';

export async function getPlayersStats(): Promise<PlayerStats | null> {
  return handApiClient.getStats();
}
