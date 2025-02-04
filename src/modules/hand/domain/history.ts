import { Hand } from "./hand";

export interface History {
    currentHandIdx: number;
    hands: Array<Hand>;
    isAmountInBb: boolean;
}