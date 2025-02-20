'use server'
import { Hand } from '@/modules/hand/domain/hand';
import { HandRepository } from '@/modules/hand/domain/hand.repository';
import { HandApiClient } from '@/modules/hand/infrastructure/hand_api_client';

const handApiClient: HandRepository = new HandApiClient()

export async function getHandAction(id: string): Promise<{
    hand: Hand;
    prevHandId: string | null;
    nextHandId: string | null;
} | null> {
    return handApiClient.get(id)
}
