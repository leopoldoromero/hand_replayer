// import { loginAction, logOutAction } from "@/actions/login.actions";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const loginUser = createAsyncThunk<
// {
//     accessToken: string;
//     refreshToken: string;
// },
// { email: string; password: string }
// >(
//   'auth/loginUser',
//   async (credentials: { email: string; password: string }, thunkAPI) => {
//     try {
//       const data = await loginAction(credentials);
//       return data;
//     } catch (err: unknown) {
//         console.error('Login error:', err);
//       return thunkAPI.rejectWithValue((err as Error).message || 'Login failed');
//     }
//   }
// );

// export const logOutUser = createAsyncThunk<
// void
// >(
//   'auth/logOutUser',
//   async (_: void, thunkAPI) => {
//     try {
//       await logOutAction();
//     } catch (err: unknown) {
//       console.error('Login error:', err);
//       return thunkAPI.rejectWithValue((err as Error).message || 'Login failed');
//     }
//   }
// );
