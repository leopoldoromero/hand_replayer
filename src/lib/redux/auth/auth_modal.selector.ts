import { RootState } from "../store";
import { AuthModalState } from "./auth_modal.slice";

export const selectAuthModalState = (state: RootState): AuthModalState =>
  state.authModalState;
