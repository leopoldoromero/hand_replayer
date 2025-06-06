import { GameState } from '@/components/replayer/game_state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateEquity } from './replayer.thunk';

const INIT_REPRODUCTION_SPEED = 1000;
export interface ReplayerState {
    gameState: GameState | null;
    isPlaying: boolean;
    highlightedPlayer: string | null;
    showInBigBlinds: boolean;
    isRangeSelectorOpen: boolean;
    heroSelectedRange: Array<string>;
    playersRanges: {[key in string]: Array<string>};
    currentRangeEditingPlayer: string | null;
    equityCalculation: {
        loading: boolean;
        error: string | null;
        result: {
            win: number;
            loose: number;
            tie: number;
        } | null;
    };
    reproductionSpeed: number;
}

const initialState: ReplayerState = {
    gameState: null,
    isPlaying: false,
    highlightedPlayer: null,
    showInBigBlinds: false,
    isRangeSelectorOpen: false,
    heroSelectedRange: [],
    playersRanges: {},
    currentRangeEditingPlayer: null,
    equityCalculation: {
        loading: false,
        error: null,
        result: null,
    },
    reproductionSpeed: INIT_REPRODUCTION_SPEED,
};

const replayerSlice = createSlice({
  name: 'replayer',
  initialState,
  reducers: {
    resetState: () => initialState,
    setGameState: (state, action: PayloadAction<GameState>) => {
        state.gameState = action.payload;
    },
    setHighlightedPlayer: (state, action: PayloadAction<string | null>) => {
      state.highlightedPlayer = action.payload;
    },
    setRange: (state, action: PayloadAction<{name: string; hands: Array<string>}>) => {
        const {name, hands} = action.payload;
        state.playersRanges[name] = hands;
    },
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleBigBlinds: (state) => {
      state.showInBigBlinds = !state.showInBigBlinds;
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(calculateEquity.pending, (state) => {
        state.equityCalculation.loading = true;
      })
      .addCase(calculateEquity.fulfilled, (state, action) => {
        state.equityCalculation.loading = false;
        state.equityCalculation.result = action.payload;
      })
      .addCase(calculateEquity.rejected, (state) => {
        state.equityCalculation.loading = false;
      });
  },
});

export const {
    setGameState,
    resetState,
    setHighlightedPlayer,
    setRange,
    togglePlaying,
    toggleBigBlinds,
} = replayerSlice.actions;

export default replayerSlice.reducer;
