import { Hand } from "./hand";

export interface HistoryParserRepository {
    parse(file: File): Promise<Array<Hand>>
}