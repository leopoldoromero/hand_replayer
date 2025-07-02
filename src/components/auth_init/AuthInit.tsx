'use client';
import { refreshTokenAction } from '@/actions/auth.actions';
import { generateGuestIdAction } from '@/actions/guest_id.actions';
import { snackbarActions } from '@/lib/redux/snackbar/snackbar.slice';
import { DispatchAction } from '@/lib/redux/store';
import { getMeUserThunk } from '@/lib/redux/user/user.thunk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AuthInit = () => {
  const dispatch = useDispatch<DispatchAction>();

  useEffect(() => {
    const initAuth = async () => {
      const result = await dispatch(getMeUserThunk());

      if (getMeUserThunk.rejected.match(result)) {
        const errorMessage = result.payload as string;

        if (errorMessage?.includes('expired')) {
          try {
            await refreshTokenAction();
            await dispatch(getMeUserThunk()); 
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            dispatch(
              snackbarActions.error('Session expired. Please log in again.')
            );
          }
        } else {
          console.error('getMe error:', errorMessage);
          generateGuestIdAction()
        }
      }
    };

    initAuth();
    
  }, [dispatch]);

  return null;
};

export default AuthInit;
