import { getHandAction } from '@/actions/get_hand.action';
import { getHandsAction } from '@/actions/get_hands.action';
import { Hand } from '@/modules/hand/domain/hand';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchHands = createAsyncThunk(
  'hands/fetchHands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHandsAction();
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchHand = createAsyncThunk<
  {hand: Hand; prevHandId: string; nextHandId: string},
  string,
  { state: RootState }
>(
  'hands/fetchHand',
  async (handId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState().handsState;
      if (state.currentHand?.id === handId && state.prevHandId && state.nextHandId) {
        return {
          hand: state.currentHand,
          prevHandId: state.prevHandId,
          nextHandId: state.nextHandId,
        }
      }
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