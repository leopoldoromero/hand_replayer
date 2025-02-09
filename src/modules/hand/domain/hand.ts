import { Action } from "./action";
import { GameModality } from "./game_modality";
import { Player } from "./player";
import { PokerRooms } from "./poker_rooms";

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
    };
}