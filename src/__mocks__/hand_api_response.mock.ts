import { PlayerStats } from "@/modules/hand/domain/player_stats";
import { HandDto, PlayersStatsDto } from "@/modules/hand/infrastructure/history_parser_api.response";

export const handApiResponseMock: HandDto = {
    id: '2a8a06e5-5225-4471-8041-c99753495a44',
    user_id: '05225578-fe51-4268-bbc3-d052bdefc2e5',
    general_info: {
      room_hand_id: '254755246480',
      datetime: '2025/02/07 21:47:56',
      game_type: 'zoom',
      currency: '€',
      small_blind: 0.02,
      big_blind: 0.05,
      game: "Hold'em",
      room: 'PokerStars'
    },
    players: [ 
       { seat: 1, name: 'player1', stack: 4.01 },
       { seat: 2, name: 'player2', stack: 9.48 },
       { seat: 3, name: 'player3', stack: 5 },
       { seat: 4, name: 'player4', stack: 5.43 },
       { seat: 5, name: 'hero', stack: 6.16 },
       { seat: 6, name: 'player6', stack: 6.79 },
    ],
    hero_cards: [ '7c', 'Js' ],
    hero_name: 'hero',
    hero_seat: 5,
    actions: [
        {
            phase: 'PRE_FLOP',
            player: 'player2',
            action: 'SB',
            amount: 0.02,
            cards: []
          }, 
          {
            phase: 'PRE_FLOP',
            player: 'player3',
            action: 'big_blind',
            amount: 0.05,
            cards: []
          }, 
          {
            phase: 'PRE_FLOP',
            player: 'player4',
            action: 'fold',
            amount: null,
            cards: []
          }, 
          {
            phase: 'PRE_FLOP',
            player: 'hero',
            action: 'fold',
            amount: null,
            cards: []
          }, 
          {
            phase: 'PRE_FLOP',
            player: 'player5',
            action: 'fold',
            amount: null,
            cards: []
          },
          {
            phase: 'PRE_FLOP',
            player: 'player1',
            action: 'raise',
            amount: 0.15,
            cards: []
          },
          {
            phase: 'PRE_FLOP',
            player: 'player2',
            action: 'call',
            amount: 0.13,
            cards: []
          },
          {
            phase: 'PRE_FLOP',
            player: 'player3',
            action: 'fold',
            amount: null,
            cards: []
          },
          {
            phase: 'FLOP',
            player: 'player2',
            action: 'check',
            amount: null,
            cards: [ 'Jd', '4s', 'Kh' ]
          },
          {
            phase: 'FLOP',
            player: 'player1',
            action: 'check',
            amount: null,
            cards: [ 'Jd', '4s', 'Kh' ]
          },
          {
            phase: 'TURN',
            player: 'player2',
            action: 'bet',
            amount: 0.4,
            cards: [ 'Jd', '4s', 'Kh', 'Ks' ]
          },
          {
            phase: 'TURN',
            player: 'player1',
            action: 'fold',
            amount: null,
            cards: [ 'Jd', '4s', 'Kh', 'Ks' ]
          }
    ],
    summary: {
      pot: 0.35,
      rake: 0.02,
      winner: { seat: 2, name: 'player2', cards: [], amount: 0.33 },
      looser: null,
      community_cards: [ 'Jd', '4s', 'Kh', 'Ks' ],
      showdown: false,
      last_phase_hero_folded: 'PRE_FLOP',
      pot_type: 'OPEN_RAISED',
    },
    table_name: 'Asterope',
    table_type: '6-max',
    button_seat: 1
}

export const playerStatsMock: PlayerStats = {
    player1: { hands: 2, vpip: 0, pfr: 0, threeBetPercent: 0 },
    player2: { hands: 4, vpip: 0, pfr: 0, threeBetPercent: 0 },
}

export const statsApiResponseMock: {[key in string]: PlayersStatsDto} = {
    player1: { hands: 2, vpip: 0, pfr: 0, three_bet_percent: 0 },
    player2: { hands: 4, vpip: 0, pfr: 0, three_bet_percent: 0 },
}