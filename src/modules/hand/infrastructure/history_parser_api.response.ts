
export interface ActionDto {
    phase: string;
    player: string;
    action: string;
    amount: number | null;
    cards: Array<string>
}

export interface PlayerDto {
    seat: number;
    name: string;
    stack: number;
    cards?: Array<string>
}

export interface SummaryPlayerActionDto {
    seat: number;
    name: string;
    details: string;
    amount: number
}

export interface SummaryDto {
    player_actions: Array<SummaryPlayerActionDto>,
    pot: number;
    rake: number;
}

export interface ShowdownDto {
    winner: string;
    winner_hand: Array<string>;
    winner_hand_description: string;
}

export interface HandDto {
    general_info: {
    hand_id: string;
    datetime: string;
    game_type: string;
    currency: string;
    small_blind: number;
    big_blind: number;
    game: string;
    room: string;
    },
    players: Array<PlayerDto>,
    hero_cards: Array<string>,
    hero_name: string;
    actions: Array<ActionDto>,
    summary: SummaryDto,
    showdown: ShowdownDto | null;
    finish_before_showdown: Array<{
        player: string;
        action: string;
        amount: number;
    }> | null
}

export interface HistoryParserApiResponseDto {
    data: Array<HandDto>
}
