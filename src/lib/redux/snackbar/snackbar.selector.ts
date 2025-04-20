import { RootState } from '../store';
import { SnackbarState } from './snackbar.slice';

export const selectSnackbarState = (state: RootState): SnackbarState =>
  state.snackbarState;
