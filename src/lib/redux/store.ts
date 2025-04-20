import { configureStore, combineReducers } from '@reduxjs/toolkit';
import snackbarReducer, { SnackbarState } from './snackbar/snackbar.slice';
import handsReducer, { HandsState } from './hand/hand.slice';

export interface DefaultState {
  snackbarState: SnackbarState;
  handsState: HandsState;
}

const rootReducer = combineReducers({
  snackbarState: snackbarReducer,
  handsState: handsReducer,
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
