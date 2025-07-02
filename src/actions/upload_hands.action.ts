'use server';

import { container } from "@/lib/di.container";

// import { handApiClient } from '@/modules/hand/infrastructure/hand_api_client';

export async function uploadHandsAction(file: File): Promise<void> {
  return container.handsApiClient.upload(file);
}
