import snackbarReducer, { SnackbarState, snackbarActions } from '@/lib/redux/snackbar/snackbar.slice';
  
  const initialState: SnackbarState = {
    openSnackbar: false,
    snackbarSuccess: false,
    snackbarMessage: '',
  };
  
  describe('[[SnackbarSlice]]', () => {
    it('should handle success', () => {
        const mockMessage = 'Success Message'
        const newState = snackbarReducer(initialState, snackbarActions.success(mockMessage));
        expect(newState.snackbarMessage).toEqual(mockMessage);
        expect(newState.openSnackbar).toBeTruthy();
        expect(newState.snackbarSuccess).toBeTruthy();
    });
  
    it('should handle error', () => {
        const mockMessage = 'Error Message'
        const newState = snackbarReducer(initialState, snackbarActions.error(mockMessage));
        expect(newState.openSnackbar).toBeTruthy();
        expect(newState.snackbarSuccess).toBeFalsy();
    });
  
    it('should handle clear', () => {
        const newState = snackbarReducer(initialState, snackbarActions.clear());
        expect(newState.openSnackbar).toBeFalsy();
    });
  });
  