import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserStoreState {
  fullName: string | null,
}

const initialState: UserStoreState = {
  fullName: null,
};

export const userStoreSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string | null>) => {
      state.fullName = action.payload;
    },
  },
});

export const { setFullName } = userStoreSlice.actions;

export const selectUserStore = (state: RootState) => state.userStore;

export default userStoreSlice.reducer;
