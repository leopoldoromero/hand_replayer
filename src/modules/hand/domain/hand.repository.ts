import { Hand } from "./hand";

export interface HandRepository {
    upload(file: File): Promise<void>;
    get(id: string): Promise<{
        hand: Hand;
        prevHandId: string | null;
        nextHandId: string | null;
    } | null>;
    getAll(): Promise<Array<Hand>>;
}