import { RootState } from '../store';
import { AuthState } from './auth.slice';

export const selectAuthState = (state: RootState): AuthState =>
  state.authState;
