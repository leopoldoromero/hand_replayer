'use server';
import { container } from '@/lib/di.container';
import { Hand } from '@/modules/hand/domain/hand';

export async function getHandsAction(): Promise<Array<Hand>> {
  return container.handsApiClient.getAll();
}
