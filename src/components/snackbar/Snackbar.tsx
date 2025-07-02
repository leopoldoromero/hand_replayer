'use client';
import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (openSnackbar) {
      const timer = setTimeout(() => dispatch(snackbarActions.clear()), autoHideDuration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSnackbar, autoHideDuration]);

  return (
    <SnackbarWrapper $open={openSnackbar}>
      <Alert $success={snackbarSuccess}>{snackbarMessage}</Alert>
    </SnackbarWrapper>
  );
};

export default Snackbar;
