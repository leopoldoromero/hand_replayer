import { configureStore, combineReducers } from '@reduxjs/toolkit';
import snackbarReducer, { SnackbarState } from './snackbar/snackbar.slice';
import handsReducer, { HandsState } from './hand/hand.slice';
import replayerReducer, { ReplayerState } from './replayer/replayer.slice';

export interface DefaultState {
  snackbarState: SnackbarState;
  handsState: HandsState;
  replayerState: ReplayerState;
}

const rootReducer = combineReducers({
  snackbarState: snackbarReducer,
  handsState: handsReducer,
  replayerState: replayerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type DispatchAction = typeof store.dispatch;

export default store;
