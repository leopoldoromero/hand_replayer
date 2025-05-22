import { GameState } from '@/components/replayer/game_state';
import { Hand } from '@/modules/hand/domain/hand';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHand } from './replayer.thunk';

export interface ReplayerState {
    gameState: GameState | null;
    isPlaying: boolean;
    highlightedPlayer: string | null;
    showInBigBlinds: boolean;
    statsModalData: {
        isOpen: boolean;
        stats?: {
            vpip: number;
            pfr: number;
            threeBetPercent: number;
            hands: number; 
        };
        playerName: string;
    };
    isStatsModalOpen: boolean;
    isRangeSelectorOpen: boolean;
    selectedVillainData: {
        name: string;
        range: string;
    };
    heroRange: string;
    equityCalculation: {
        loading: boolean;
        error: string | null;
        result: {
            win: number;
            loose: number;
            tie: number;
        } | null;
    };
    isLoading: boolean;
    currentHand: Hand | null;
    prevHandId: string;
    nextHandId: string;
}

const initialState: ReplayerState = {
    gameState: null,
    isPlaying: false,
    highlightedPlayer: null,
    showInBigBlinds: false,
    isStatsModalOpen: false,
    statsModalData: {
    isOpen: false,
    stats: {
      vpip: 0,
      pfr: 0,
      threeBetPercent: 0,
      hands: 0,
    },
    playerName: '',
    },
    isRangeSelectorOpen: false,
    selectedVillainData: {
        name: '',
        range: '',
    },
    heroRange: '',
    equityCalculation: {
        loading: false,
        error: null,
        result: null,
    },
    currentHand: null,
    prevHandId: '',
    nextHandId: '',
    isLoading: false,
};

const replayerSlice = createSlice({
  name: 'replayer',
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
        state.gameState = action.payload;
    },
    toggleRangeSelectorModal: (state) => {
      state.isRangeSelectorOpen = !state.isRangeSelectorOpen;
    },
    setHighlightedPlayer: (state, action: PayloadAction<string | null>) => {
      state.highlightedPlayer = action.payload;
    },
    setSelectedVillainName: (state, action) => {
    state.selectedVillainData.name = action.payload;
    },
    setSelectedVillainRange: (state, action) => {
        state.selectedVillainData.range = action.payload;
    },
    setHeroRange: (state, action: PayloadAction<string>) => {
      state.heroRange = action.payload;
    },
    togglePlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleBigBlinds: (state) => {
      state.showInBigBlinds = !state.showInBigBlinds;
    },
    toggleStatsModal: (state,action: PayloadAction<
    | undefined
    | {
        playerName?: string;
        stats?: {
          vpip: number;
          pfr: number;
          threeBetPercent: number;
          hands: number;
        };
      }
  >
) => {
  if (action.payload) {
    const { playerName, stats } = action.payload;
    state.statsModalData = {
      isOpen: true,
      playerName: playerName || '',
      stats: stats || {
        vpip: 0,
        pfr: 0,
        threeBetPercent: 0,
        hands: 0,
      },
    };
  } else {
    state.statsModalData.isOpen = false;
  }
},
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchHand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentHand = action.payload.hand;
        state.prevHandId = action.payload.prevHandId;
        state.nextHandId = action.payload.nextHandId;
      })
      .addCase(fetchHand.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
    setGameState,
    toggleStatsModal,
    toggleRangeSelectorModal,
    setHighlightedPlayer,
    setSelectedVillainName,
    setSelectedVillainRange,
    setHeroRange,
    togglePlaying,
    toggleBigBlinds,
} = replayerSlice.actions;

export default replayerSlice.reducer;
