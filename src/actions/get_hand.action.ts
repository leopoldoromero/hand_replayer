'use server';
import { container } from '@/lib/di.container';
import { Hand } from '@/modules/hand/domain/hand';
// import { handApiClient } from '@/modules/hand/infrastructure/hand_api_client';

export async function getHandAction(id: string): Promise<{
  hand: Hand;
  prevHandId: string | null;
  nextHandId: string | null;
} | null> {
  return container.handsApiClient.get(id);
}
