import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ExpensesStoreState {
  expensesList: Array<any>,  //TODO: write type for expense
}

const initialState: ExpensesStoreState = {
  expensesList: [],
};

export const expensesStoreSlice = createSlice({
  name: 'expensesStore',
  initialState,
  reducers: {
    setExpensesList: (state, action: PayloadAction<Array<any>>) => {
      state.expensesList = action.payload;
    },
  },
});

export const { setExpensesList } = expensesStoreSlice.actions;

export const selectNavigationStore = (state: RootState) => state.expensesStore;

export default expensesStoreSlice.reducer;
