import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type DateFormat = "DD.MM.YYYY";

type Expense = {
  id: string,
  title: string,
  amount: number,
  date: DateFormat
}

export interface ExpensesStoreState {
  expensesList: Array<Expense>,
}

const initialState: ExpensesStoreState = {
  expensesList: [],
};

export const expensesStoreSlice = createSlice({
  name: 'expensesStore',
  initialState,
  reducers: {
    setExpensesList: (state, action: PayloadAction<Array<Expense>>) => {
      state.expensesList = action.payload;
    },
  },
});

export const { setExpensesList } = expensesStoreSlice.actions;

export const selectNavigationStore = (state: RootState) => state.expensesStore;

export default expensesStoreSlice.reducer;
