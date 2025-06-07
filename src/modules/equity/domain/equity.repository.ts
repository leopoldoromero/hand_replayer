import { Equity } from "./equity";

export type CalculateHandVsRangeInput = {
    hero_hand: Array<string>;
    villain_range: Array<string>;
    board: Array<string>;
}

export type CalculateRangeVsRangeInput = {
    hero_range: Array<string>;
    villain_range: Array<string>;
    board: Array<string>;
}

export interface EquityRepository {
    calculateHandVsRange(input: CalculateHandVsRangeInput): Promise<Equity>
    calculateRangeVsRange(input: CalculateRangeVsRangeInput): Promise<Equity>;
}