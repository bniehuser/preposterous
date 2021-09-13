import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import authReducer from '../features/auth/authSlice';
import gameDataReducer from '../features/gameData/gameDataSlice';
import uiReducer from '../features/ui/uiSlice';
import { loadState } from './localStorage';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    gameData: gameDataReducer,
    ui: uiReducer,
  },
  preloadedState: loadState()

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// some global selectors
export const appLoading = (state: RootState) => state.app.loading || state.auth.loading || state.gameData.loading;
