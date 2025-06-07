import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { calculateHandVsRangeEquityAction, calculateRangeVsRangeEquityAction } from "@/actions/calculate_equity.actions";
import { Equity } from "@/modules/equity/domain/equity";

export const calculateEquity = createAsyncThunk<
  Equity,
  string,
  { state: RootState }
>(
  'replayer/calculateEquity',
  async (villainName: string, { getState, rejectWithValue }) => {
    const state = getState().replayerState;
    const villainRange = state.playersRanges[villainName] ?? [];

    if (!villainRange?.length || !state.gameState?.heroCards) {
      return rejectWithValue('Invalid data: missing villain range or hero cards');
    }

    try {
      const heroRange = state.playersRanges[state.gameState.heroName] ?? [];

      if (heroRange?.length) {
        return await calculateRangeVsRangeEquityAction({
          hero_range: heroRange,
          villain_range: villainRange,
          board: state.gameState?.board ?? [],
        });
      }
      return await calculateHandVsRangeEquityAction({
        hero_hand: state.gameState?.heroCards,
        villain_range: villainRange,
        board: state.gameState?.board ?? [],
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
   