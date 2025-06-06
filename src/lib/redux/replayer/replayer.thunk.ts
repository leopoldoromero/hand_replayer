import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { calculateEquityAction } from "@/actions/calculate_equity.action";
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
    return calculateEquityAction({
      hand: state.gameState?.heroCards,
      range: villainRange,
      board: state.gameState?.board ?? [],
    });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
   