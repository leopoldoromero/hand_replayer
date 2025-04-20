import handsReducer, {
  setHands,
  addHand,
  filterHands,
  resetFilters,
  setLoading,
  setError,
  clearError,
  clearHands,
  HandsState,
} from '@/lib/redux/hand/hand.slice';
import { ActionPhaseTypes, ActionTypes } from '@/modules/hand/domain/action';
import { GameModality } from '@/modules/hand/domain/game_modality';
import { Hand, LastPhaseHeroFolded, PotType } from '@/modules/hand/domain/hand';
import { PokerRooms } from '@/modules/hand/domain/poker_rooms';
import { Criteria } from '@/modules/shared/domain/criteria';
import { CriteriaFilter } from '@/modules/shared/domain/criteria_filter';

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

const initialState: HandsState = {
  hands: [],
  filteredHands: [],
  loading: false,
  error: null,
  filtersApplied: false,
};

describe('[[handsSlice]]', () => {
  it('should handle setHands', () => {
    const newState = handsReducer(initialState, setHands([mockHand]));
    expect(newState.hands).toEqual([mockHand]);
    expect(newState.filteredHands).toEqual([mockHand]);
  });

  it('should handle addHand', () => {
    const newState = handsReducer(initialState, addHand(mockHand));
    expect(newState.hands).toContain(mockHand);
    expect(newState.filteredHands).toContain(mockHand);
  });

  it('should handle setLoading', () => {
    const newState = handsReducer(initialState, setLoading(true));
    expect(newState.loading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Something went wrong';
    const newState = handsReducer(initialState, setError(errorMessage));
    expect(newState.error).toBe(errorMessage);
  });

  it('should handle clearError', () => {
    const errorState = { ...initialState, error: 'Error occurred' };
    const newState = handsReducer(errorState, clearError());
    expect(newState.error).toBeNull();
  });

  it('should handle clearHands', () => {
    const handsState = { ...initialState, hands: [mockHand] };
    const newState = handsReducer(handsState, clearHands());
    expect(newState.hands).toEqual([]);
    expect(newState.filteredHands).toEqual([]);
  });

  it('should handle filterHands', () => {
    const criteria: Criteria = {
      filters: [new CriteriaFilter('potType', 'SRP')],
    };
    const handsState = { ...initialState, hands: [mockHand] };
    const newState = handsReducer(handsState, filterHands(criteria));
    expect(newState.filteredHands).toEqual([mockHand]);
  });

  it('should handle resetFilters', () => {
    const filteredState = {
      ...initialState,
      filteredHands: [mockHand],
      filtersApplied: true,
    };
    const newState = handsReducer(filteredState, resetFilters());
    expect(newState.filteredHands).toEqual([]);
    expect(newState.filtersApplied).toBe(false);
  });
});
