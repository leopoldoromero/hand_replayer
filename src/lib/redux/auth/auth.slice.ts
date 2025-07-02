import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    loading: boolean;
    error: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
//     setCredentials: (state, action) => {
//     //   state.user = action.payload.user;
//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//     },
//     setUserData: (state, action) => {
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//         state.user = null;
//         state.accessToken = null;
//         state.refreshToken = null;
//     },
  },
  //  extraReducers: (builder) => {
  //     builder
  //       .addCase(loginUser.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(loginUser.fulfilled, (state, action) => {
  //           state.loading = false;
  //           state.accessToken = action.payload.accessToken;
  //           state.refreshToken = action.payload.refreshToken;
  //       })
  //       .addCase(loginUser.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload as string;
  //       })
  //   },
});

export const { } = authSlice.actions;
export default authSlice.reducer;