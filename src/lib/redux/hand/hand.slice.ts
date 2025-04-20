import {
  Hand,
  positionNumberToName,
  PotType,
} from '@/modules/hand/domain/hand';
import { Criteria } from '@/modules/shared/domain/criteria';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHands } from './hand.thunk';

export interface HandsState {
  hands: Array<Hand>;
  filteredHands: Array<Hand>;
  loading: boolean;
  error: string | null;
  filtersApplied: boolean;
}

const initialState: HandsState = {
  hands: [],
  filteredHands: [],
  loading: false,
  error: null,
  filtersApplied: false,
};

const potTypeToEnumMapper = (potType: string): PotType => {
  const valuesToEnum: { [key in string]: PotType } = {
    SRP: PotType.OPEN_RAISED,
    ROL: PotType.ROL_RAISED,
    LIMPED: PotType.LIMPED,
    '3BET': PotType.THREE_BET,
    SQUEEZE: PotType.SQUEEZE,
    '4BET': PotType.FOUR_BET,
  };
  return valuesToEnum[potType] ?? PotType.UNOPENED;
};

export const handsSlice = createSlice({
  name: 'hands',
  initialState,
  reducers: {
    setHands(state, action: PayloadAction<Array<Hand>>) {
      state.hands = action.payload;
      state.filteredHands = action.payload;
      state.loading = false;
      state.error = null;
    },
    addHand(state, action: PayloadAction<Hand>) {
      state.hands.push(action.payload);
      state.filteredHands.push(action.payload);
    },
    filterHands(state, action: PayloadAction<Criteria>) {
      const { filters } = action.payload;
      state.filteredHands = state.hands.filter((hand) => {
        return filters?.every((filter) => {
          switch (filter.field) {
            case 'potType':
              const potType = potTypeToEnumMapper(filter.value as string);
              return hand.potType === potType;
            case 'position':
              const position = positionNumberToName(
                hand.hero?.seat,
                hand.tableType === '6-max'
              );
              return position === filter.value;
            case 'minPotSize':
              return hand.potAmount / hand.bb >= (filter.value as number);
            case 'loosingHands':
              return hand.looser?.name === hand.hero?.nick;
            default:
              return true;
          }
        });
      });
      state.filtersApplied = true;
    },
    resetFilters(state) {
      state.filteredHands = [];
      state.filtersApplied = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    clearHands(state) {
      state.hands = [];
      state.filteredHands = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHands.fulfilled, (state, action) => {
        state.loading = false;
        state.hands = action.payload;
        state.filteredHands = action.payload;
      })
      .addCase(fetchHands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setHands,
  addHand,
  filterHands,
  resetFilters,
  setLoading,
  setError,
  clearError,
  clearHands,
} = handsSlice.actions;
export default handsSlice.reducer;
