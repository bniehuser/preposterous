import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import gameDataReducer from '../features/gameData/gameDataSlice';
import planetReducer from '../features/planet/planetSlice';
import { loadState } from './localStorage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    gameData: gameDataReducer,
    planets: planetReducer,
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
