import { logOutAction } from "@/actions/auth.actions";
import { getSessionDataAction } from "@/actions/session.actions";
import { getMeAction } from "@/actions/user.actions";
import { User } from "@/modules/user/domain/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOut } from "./user.slice";
import { clearHands } from "../hand/hand.slice";

export const getMeUserThunk = createAsyncThunk<
User | null,
void
>(
  'user/getMe',
  async () => {
    try {
      const session = await getSessionDataAction();

      if (!session.accessToken) {
        return null
      }
      const userData = await getMeAction();
      return userData;
    } catch (err: unknown) {
      console.error('Get me user error:', err);
      return null;
    }
  }
);

// export const loginUser = createAsyncThunk<
// void,
// { email: string; password: string; router: AppRouterInstance }
// >(
//   'user/login',
//   async (credentials: { email: string; password: string; router: AppRouterInstance }, thunkAPI) => {
//     try {
//       await loginAction(credentials);
//       thunkAPI.dispatch(getMeUserThunk())
//     } catch (err: unknown) {
//         console.error('Login error:', err);
//       return thunkAPI.rejectWithValue((err as Error).message || 'Login failed');
//     }
//   }
// );

export const logOutUser = createAsyncThunk<
void
>(
  'user/logOut',
  async (_: void, thunkAPI) => {
    try {
      await logOutAction();
      thunkAPI.dispatch(logOut())
      thunkAPI.dispatch(clearHands())
    } catch (err: unknown) {
      console.error('Login error:', err);
      return thunkAPI.rejectWithValue((err as Error).message || 'Login failed');
    }
  }
);
