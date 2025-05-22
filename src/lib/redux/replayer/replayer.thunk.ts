import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getHandAction } from "@/actions/get_hand.action";
import { Hand } from "@/modules/hand/domain/hand";


export const fetchHand = createAsyncThunk(
  'replayer/fetchHand',
  async (handId: string, { rejectWithValue }) => {
    try {
      const response = await getHandAction(handId);
      return {
        hand: response?.hand as Hand,
        prevHandId: response?.prevHandId ?? '',
        nextHandId: response?.nextHandId ?? '',
      };
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || 'Failed to fetch hand');
    }
  }
);

// TODO: move this later to its own file near to the api response dto.
type EquityResult = {
    win: number;
    loose: number
    tie: number;
}

export const calculateEquity = createAsyncThunk<
  EquityResult,
  void,
  { state: RootState }
>(
  'replayer/calculateEquity',
  async (_, { getState, rejectWithValue }) => {
    const state = getState().replayerState;
    const hero = state.heroRange || state.gameState?.heroCards;
    const villain = state.selectedVillainData;

    try {
    //   const response = await api.calculateEquity(hero, villain);
    //   return response.data;
    return {
        win: 0.5,
        loose: 0.3,
        tie: 0.2
    }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);