import { User } from "@/modules/user/domain/user";
import { createSlice } from "@reduxjs/toolkit";
import { getMeUserThunk } from "./user.thunk";

export interface UserState {
    loading: boolean;
    error: string | null;
    user: User | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
    }
  },
   extraReducers: (builder) => {
      builder
        .addCase(getMeUserThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getMeUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getMeUserThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
    },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;