import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  loading: boolean;
  connecting: boolean;
  initializing: boolean;
  loadingMessage?: string;
  loadingPercent?: number;
}

const initialState: AppState = {
  loading: false,
  connecting: false,
  initializing: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    connecting: (state, action: PayloadAction<boolean>) => {
      state.connecting = action.payload;
    },
    initializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
    loadingMessage: (state, action: PayloadAction<string>) => {
      state.loadingMessage = action.payload;
    },
    loadingPercent: (state, action: PayloadAction<number>) => {
      state.loadingPercent = action.payload;
    },
    loadingState: (state, action: PayloadAction<Partial<AppState>>) => {
      return {...state, ...action.payload};
    }
  },
});

export const {loading, connecting, initializing, loadingMessage, loadingPercent, loadingState} = appSlice.actions;

export default appSlice.reducer;
