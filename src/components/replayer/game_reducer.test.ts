import { Hand, LastPhaseHeroFolded, PotType } from '@/modules/hand/domain/hand';
import { gameReducer, initialState } from './game_reducer';
import { PokerRooms } from '@/modules/hand/domain/poker_rooms';
import { ActionPhaseTypes, ActionTypes } from '@/modules/hand/domain/action';
import { GameModality } from '@/modules/hand/domain/game_modality';

const mockHand: Hand = {
  id: 'ff83841f-4cd9-40cf-a735-c3f3b22c6df4',
  userId: '24e96c1a-da08-481a-9a70-6327558e742d',
  currency: '€',
  sb: 0.02,
  bb: 0.05,
  date: new Date('2025-02-07T20:47:56.000Z'),
  game: "Hold'em",
  modality: GameModality.ZOOM,
  actions: [
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'Mat22bcn',
      action: ActionTypes.SB,
      amount: 0.02,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'MakesMeRich',
      action: ActionTypes.BB,
      amount: 0.05,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'ScrappyDooLo',
      action: ActionTypes.FOLD,
      amount: 0,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'Nicoromero87',
      action: ActionTypes.FOLD,
      amount: 0,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'vianney54',
      action: ActionTypes.FOLD,
      amount: 0,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'Senefer',
      action: ActionTypes.RAISE,
      amount: 0.15,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'Mat22bcn',
      action: ActionTypes.CALL,
      amount: 0.13,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.PRE_FLOP,
      player: 'MakesMeRich',
      action: ActionTypes.FOLD,
      amount: 0,
      cards: [],
    },
    {
      phase: ActionPhaseTypes.FLOP,
      player: 'Mat22bcn',
      action: ActionTypes.CHECK,
      amount: 0,
      cards: ['Jd', '4s', 'Kh'],
    },
    {
      phase: ActionPhaseTypes.FLOP,
      player: 'Senefer',
      action: ActionTypes.CHECK,
      amount: 0,
      cards: ['Jd', '4s', 'Kh'],
    },
    {
      phase: ActionPhaseTypes.TURN,
      player: 'Mat22bcn',
      action: ActionTypes.BET,
      amount: 0.4,
      cards: ['Jd', '4s', 'Kh', 'Ks'],
    },
    {
      phase: ActionPhaseTypes.TURN,
      player: 'Senefer',
      action: ActionTypes.FOLD,
      amount: 0,
      cards: ['Jd', '4s', 'Kh', 'Ks'],
    },
  ],
  players: [
    {
      seat: 1,
      name: 'Senefer',
      stack: 4.01,
    },
    {
      seat: 2,
      name: 'Mat22bcn',
      stack: 9.48,
    },
    {
      seat: 3,
      name: 'MakesMeRich',
      stack: 5,
    },
    {
      seat: 4,
      name: 'ScrappyDooLo',
      stack: 5.43,
    },
    {
      seat: 5,
      name: 'Nicoromero87',
      stack: 6.16,
    },
    {
      seat: 6,
      name: 'vianney54',
      stack: 6.79,
    },
  ],
  hero: {
    nick: 'Nicoromero87',
    cards: ['7c', 'Js'],
    seat: 5,
  },
  winner: {
    seat: 2,
    name: 'Mat22bcn',
    cards: [],
    amount: 0.33,
  },
  looser: null,
  showdown: false,
  lastPhaseHeroFolded: LastPhaseHeroFolded.PRE_FLOP,
  potType: PotType.OPEN_RAISED,
  buttonSeat: 1,
  tableName: 'Asterope',
  tableType: '6-max',
  potAmount: 0.35,
  room: PokerRooms.STARS,
};


describe('gameReducer', () => {
  it('should load the initial game state', () => {
    const result = gameReducer(initialState, { type: 'LOAD_STATE', hand: mockHand });
    expect(result.playersActions.length).toBe(mockHand.players.length);
    expect(result.heroCards).toEqual(mockHand.hero.cards);
    expect(result.heroName).toBe(mockHand.hero.nick);
  });

  it('should start playing the game', () => {
    const result = gameReducer(initialState, { type: 'PLAY' });
    expect(result.isPlaying).toBe(true);
  });

  it('should pause the game', () => {
    const playingState = { ...initialState, isPlaying: true };
    const result = gameReducer(playingState, { type: 'PAUSE' });
    expect(result.isPlaying).toBe(false);
  });

  it('should handle next action', () => {
    const result = gameReducer(initialState, {
      type: 'NEXT_ACTION',
      action: mockHand.actions[0],
      lastActionIdx: mockHand.actions.length,
    });
    expect(result.actionIndex).toBe(1);
    expect(result.pot).toBe(mockHand.actions[0].amount);
  });

  it('should handle previous action', () => {
    const state = { ...initialState, actionIndex: 1, pot: 0.02 };
    const result = gameReducer(state, {
      type: 'PREV_ACTION',
      currentHand: mockHand,
    });
    expect(result.actionIndex).toBe(0);
    expect(result.pot).toBe(0);
  });

  it('should toggle big blinds display', () => {
    const result = gameReducer(initialState, { type: 'TOGGLE_BIG_BLINDS' });
    expect(result.showInBigBlinds).toBe(true);
  });

  it('should reset state on next hand', () => {
    const result = gameReducer(initialState, { type: 'NEXT_HAND' });
    expect(result).toEqual(initialState);
  });

  it('should reset state on previous hand', () => {
    const result = gameReducer(initialState, { type: 'PREV_HAND' });
    expect(result).toEqual(initialState);
  });
});
