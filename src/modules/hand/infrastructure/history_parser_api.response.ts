export interface ActionDto {
  phase: string;
  player: string;
  action: string;
  amount: number | null;
  cards: Array<string>;
}

export interface PlayerDto {
  seat: number;
  name: string;
  stack: number;
  cards?: Array<string>;
}

export interface SummaryPlayerActionDto {
  seat: number;
  name: string;
  details: string;
  amount: number;
}

export interface SummaryPlayerDto {
  seat: number;
  name: string;
  cards: Array<string>;
  amount: number;
}
export interface SummaryDto {
  pot: number;
  rake: number;
  winner: SummaryPlayerDto | null;
  looser: SummaryPlayerDto | null;
  community_cards: Array<string>;
  showdown: boolean;
  last_phase_hero_folded: string;
  pot_type: string;
}

export interface ShowdownDto {
  winner: string;
  winner_hand: Array<string>;
  winner_hand_description: string;
}

export interface HandDto {
  id: string;
  user_id: string;
  general_info: {
    room_hand_id: string;
    datetime: string;
    game_type: string;
    currency: string;
    small_blind: number;
    big_blind: number;
    game: string;
    room: string;
  };
  table_name: string;
  table_type: string;
  button_seat: number;
  players: Array<PlayerDto>;
  hero_cards: Array<string>;
  hero_name: string;
  hero_seat: number;
  actions: Array<ActionDto>;
  summary: SummaryDto;
}

export interface HistoryParserApiResponseDto {
  data: Array<HandDto>;
}

export interface PlayersStatsDto {
  hands: number;
  vpip: number;
  pfr: number;
  three_bet_percent: number;
}
