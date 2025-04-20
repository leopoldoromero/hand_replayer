'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultState, DispatchAction } from '@/lib/redux/store';
import { selectSnackbarState } from '@/lib/redux/snackbar/snackbar.selector';
import {
  snackbarActions,
  SnackbarState,
} from '@/lib/redux/snackbar/snackbar.slice';
import { Alert, SnackbarWrapper } from './Snackbar.styles';

export interface Props {
  autoHideDuration?: number;
}

const Snackbar: React.FC<Props> = ({ autoHideDuration = 2000 }) => {
  const { openSnackbar, snackbarSuccess, snackbarMessage } = useSelector<
    DefaultState,
    SnackbarState
  >(selectSnackbarState);
  const dispatch = useDispatch<DispatchAction>();

  const closeSnackbar = () => dispatch(snackbarActions.clear());

  React.useEffect(() => {
    if (openSnackbar) {
      const timer = setTimeout(() => closeSnackbar(), autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [openSnackbar, autoHideDuration]);

  return (
    <SnackbarWrapper $open={openSnackbar}>
      <Alert $success={snackbarSuccess}>{snackbarMessage}</Alert>
    </SnackbarWrapper>
  );
};

export default Snackbar;
