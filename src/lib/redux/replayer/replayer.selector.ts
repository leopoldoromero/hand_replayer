import { RootState } from '../store';
import { ReplayerState } from './replayer.slice';

export const selectReplayerState = (state: RootState): ReplayerState =>
  state.replayerState;
