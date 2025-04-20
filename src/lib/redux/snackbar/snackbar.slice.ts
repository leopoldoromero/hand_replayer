import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarState {
  openSnackbar: boolean;
  snackbarSuccess: boolean;
  snackbarMessage: string;
}

const initialState: SnackbarState = {
  openSnackbar: false,
  snackbarSuccess: false,
  snackbarMessage: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    success(state, action: PayloadAction<string>) {
      state.openSnackbar = true;
      state.snackbarSuccess = true;
      state.snackbarMessage = action.payload;
    },
    error(state, action: PayloadAction<string>) {
      state.openSnackbar = true;
      state.snackbarSuccess = false;
      state.snackbarMessage = action.payload;
    },
    clear(state) {
      state.openSnackbar = false;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice.reducer;
