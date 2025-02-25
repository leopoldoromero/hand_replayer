import { Hand } from './hand';
import { PlayerStats } from './player_stats';

export interface HandRepository {
  upload(file: File): Promise<void>;
  get(id: string): Promise<{
    hand: Hand;
    prevHandId: string | null;
    nextHandId: string | null;
  } | null>;
  getAll(): Promise<Array<Hand>>;
  getStats(): Promise<PlayerStats>;
}
