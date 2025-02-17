import { Action } from "./action";
import { GameModality } from "./game_modality";
import { Player } from "./player";
import { PokerRooms } from "./poker_rooms";

export enum LastPhaseHeroFolded {
    PRE_FLOP = "PRE_FLOP",
    FLOP = "FLOP",
    TURN = "TURN",
    RIVER = "RIVER",
}

export enum PotType {
    UNOPENED = "UNOPENED",
    LIMPED = "LIMPED",
    OPEN_RAISED = "OPEN_RAISED",
    ROL_RAISED = "ROL_RAISED",
    THREE_BET = "3BET",
    SQUEEZE = "SQUEEZE",
    FOUR_BET = "4BET",
}

export interface SummaryPlayer {
    seat: number;
    name: string;
    cards: Array<string>;
    amount: number;
    currency: string;
}
export interface Hand {
    id: string;
    currency: string;
    sb: number;
    bb: number;
    date: Date;
    game: string;
    modality: GameModality;
    room: PokerRooms;
    players: Array<Player>;
    actions: Array<Action>;
    hero: {
        nick: string;
        cards: Array<string>;
        seat: number;
    };
    winner: SummaryPlayer | null;
    looser: SummaryPlayer | null;
    showdown: boolean;
    lastPhaseHeroFolded: LastPhaseHeroFolded;
    potType: PotType;
    buttonSeat: number;
    tableName: string;
    tableType: string;
    potAmount: number;
}

export const fullRingPositions: {[key in number]: string} = {
    1: 'BUTTON',
    2: 'SB',
    3: 'BB',
    4: 'UTG',
    5: 'UTG+1',
    6: 'MP',
    7: 'MP+1',
    8: 'HJ',
    9: 'CUTOFF'
}

export const sixMaxPositions: {[key in number]: string} = {
    1: 'BUTTON',
    2: 'SB',
    3: 'BB',
    4: 'UTG',
    5: 'MP',
    6: 'CUTOFF'
}

export function positionNumberToName(seat: number, isSixMax: boolean) {
    if (isSixMax) {
        return sixMaxPositions[seat]
    }
    return fullRingPositions[seat]
}