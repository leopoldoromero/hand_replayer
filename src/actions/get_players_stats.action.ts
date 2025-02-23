'use server'
import { HandRepository } from '@/modules/hand/domain/hand.repository';
import { PlayerStats } from '@/modules/hand/domain/player_stats';
import { HandApiClient } from '@/modules/hand/infrastructure/hand_api_client';

const handApiClient: HandRepository = new HandApiClient()

export async function getPlayersStats(): Promise<PlayerStats | null> {
    return handApiClient.getStats()
}
