import { getHandsAction } from '@/actions/get_hands.action';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
