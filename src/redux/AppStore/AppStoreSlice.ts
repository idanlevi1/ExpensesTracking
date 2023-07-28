import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BOTTOM_SHEET_MODE } from '../../utils/Constants';
import { RootState } from '../store';

export interface AppStoreState {
  bottomSheetMode: BOTTOM_SHEET_MODE | null,
}

const initialState: AppStoreState = {
  bottomSheetMode: null,
};

export const appStoreSlice = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    setBottomSheetMode: (state, action: PayloadAction<BOTTOM_SHEET_MODE | null>) => {
      state.bottomSheetMode = action.payload;
    },
  },
});

export const { setBottomSheetMode } = appStoreSlice.actions;

export const selectAppStore = (state: RootState) => state.appStore;

export default appStoreSlice.reducer;
