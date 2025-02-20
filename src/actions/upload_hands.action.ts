'use server'
import { HandRepository } from '@/modules/hand/domain/hand.repository';
import { HandApiClient } from '@/modules/hand/infrastructure/hand_api_client';

const handApiClient: HandRepository = new HandApiClient()

export async function uploadHandsAction(file: File): Promise<void> {
    return handApiClient.upload(file);
}
