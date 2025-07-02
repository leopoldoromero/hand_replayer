import { RootState } from "../store";
import { UserState } from "./user.slice";

export const selectUserState = (state: RootState): UserState => state.userState;