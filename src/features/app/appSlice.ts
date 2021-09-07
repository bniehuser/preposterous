import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  loading: boolean;
  loadingMessage?: string;
  loadingPercent?: number;
}

const initialState: AppState = {
  loading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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

export const {loading, loadingMessage, loadingPercent, loadingState} = appSlice.actions;

export default appSlice.reducer;
