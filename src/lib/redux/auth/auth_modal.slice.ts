import { createSlice } from "@reduxjs/toolkit";

export interface AuthModalState {
  isOpen: boolean;
}

const initialState: AuthModalState = { isOpen: false };

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    authModalHandler: (state) => { state.isOpen = !state.isOpen },
  },
});

export const { authModalHandler } = authModalSlice.actions;
export default authModalSlice.reducer;