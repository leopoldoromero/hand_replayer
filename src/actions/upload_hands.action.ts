'use server';
import { handApiClient } from '@/modules/hand/infrastructure/hand_api_client';

export async function uploadHandsAction(file: File): Promise<void> {
  return handApiClient.upload(file);
}
