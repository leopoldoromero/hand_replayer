'use server';
import { Hand } from '@/modules/hand/domain/hand';
import { handApiClient } from '@/modules/hand/infrastructure/hand_api_client';

export async function getHandsAction(): Promise<Array<Hand>> {
  return handApiClient.getAll();
}
