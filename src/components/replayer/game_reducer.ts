import { Action } from '@/modules/hand/domain/action';
import { Hand } from '@/modules/hand/domain/hand';
import { PreflopStats } from '@/modules/hand/domain/player';

interface GameState {
  pot: number;
  isPlaying: boolean;
  showInBigBlinds: boolean;
  board: Array<string>;
  playersActions: Array<{
    name: string;
    stack: number;
    action: string | null;
    amount: number | null;
    showAction: boolean;
    stats?: PreflopStats;
  }>;
  actionIndex: number;
  heroCards: Array<string>;
  heroName: string;
  showKnownCards: boolean;
}

type ChangeStateAction =
  | { type: 'LOAD_STATE'; hand: Hand }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'NEXT_ACTION'; action: Action; lastActionIdx: number }
  | { type: 'HIDE_ACTION' }
  | { type: 'PREV_ACTION'; currentHand: Hand }
  | { type: 'TOGGLE_BIG_BLINDS' }
  | { type: 'NEXT_HAND' }
  | { type: 'PREV_HAND' };

export const initialState: GameState = {
  pot: 0,
  isPlaying: false,
  showInBigBlinds: false,
  board: [],
  playersActions: [],
  actionIndex: 0,
  heroCards: [],
  heroName: '',
  showKnownCards: false,
};

export const gameReducer = (
  state: GameState,
  action: ChangeStateAction
): GameState => {
  switch (action.type) {
    case 'LOAD_STATE':
      const { hand } = action;
      return {
        ...initialState,
        playersActions: hand?.players?.map((player) => ({
          name: player.name,
          stack: player.stack,
          action: null,
          amount: null,
          showAction: false,
          stats: player?.stats,
        })),
        heroCards: hand?.hero?.cards,
        heroName: hand?.hero?.nick,
      };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'NEXT_ACTION':
      const { action: currentAction, lastActionIdx } = action;
      const isShowdown = state.actionIndex >= lastActionIdx - 1;
      const isNewRound =
        state.playersActions.length > 0 &&
        state.playersActions.some((player) => player.action !== null) &&
        (state.actionIndex === 0 ||
          state.board.length !==
            (currentAction.cards?.length || state.board.length));
      const playerACtions = state.playersActions.map((player) =>
        player.name === currentAction.player
          ? {
              ...player,
              stack: currentAction.amount
                ? player.stack - currentAction.amount
                : player.stack,
              action: currentAction.action,
              amount: currentAction.amount
                ? (player.amount || 0) + currentAction.amount
                : isNewRound
                ? null
                : player.amount,
              showAction: true,
            }
          : {
              ...player,
              showAction: false,
              amount: isNewRound ? null : player.amount,
            }
      );
      return {
        ...state,
        actionIndex: state.actionIndex + 1,
        playersActions: playerACtions,
        pot: currentAction.amount
          ? state.pot + currentAction.amount
          : state.pot,
        board: currentAction.cards?.length ? currentAction.cards : state.board,
        showKnownCards: isShowdown,
      };
    case 'PREV_ACTION':
      if (state.actionIndex === 0) return state;
      const { currentHand } = action;
      const prevAction = currentHand.actions[state.actionIndex - 1];
      return {
        ...state,
        actionIndex: state.actionIndex - 1,
        playersActions: state.playersActions.map((player) =>
          player.name === prevAction.player
            ? {
                ...player,
                stack: prevAction.amount
                  ? player.stack + prevAction.amount
                  : player.stack, // Undo stack deduction
                action: null,
                amount: null,
                showAction: false,
              }
            : player
        ),
        pot: prevAction.amount ? state.pot - prevAction.amount : state.pot,
        board: prevAction.cards,
      };
    case 'HIDE_ACTION':
      return {
        ...state,
        playersActions: state.playersActions.map((player) => ({
          ...player,
          showAction: false,
        })),
      };
    case 'TOGGLE_BIG_BLINDS':
      return { ...state, showInBigBlinds: !state.showInBigBlinds };
    case 'PREV_HAND':
      return initialState;
    case 'NEXT_HAND':
      return initialState;
    default:
      return state;
  }
};
