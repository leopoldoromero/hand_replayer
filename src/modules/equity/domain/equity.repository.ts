import { Equity } from "./equity";

export type CalculateEquityInput = {
    hand: Array<string>;
    range: Array<string>;
    board: Array<string>;
}

export interface EquityRepository {
    calculate(input: CalculateEquityInput): Promise<Equity>
}