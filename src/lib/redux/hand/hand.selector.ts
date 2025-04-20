import { RootState } from '../store';
import { HandsState } from './hand.slice';

export const selectHandsState = (state: RootState): HandsState =>
  state.handsState;
