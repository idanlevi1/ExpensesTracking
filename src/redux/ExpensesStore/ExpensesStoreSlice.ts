import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type DateFormat = "DD.MM.YYYY";

export type Expense = {
  id: string,
  title: string,
  amount: number,
  date: DateFormat
}

export type ExpenseFilters = {
  title?: string,
  amount?: string,
  date?: string
}

export interface ExpensesStoreState {
  expensesList: Array<Expense>,
  chosenExpense: Expense | null,
  expensesFilters: ExpenseFilters,
}

const initialState: ExpensesStoreState = {
  expensesList: [],
  chosenExpense: null,
  expensesFilters: {},
};

export const expensesStoreSlice = createSlice({
  name: 'expensesStore',
  initialState,
  reducers: {
    setExpensesList: (state, action: PayloadAction<Array<Expense>>) => {
      state.expensesList = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expensesList.push(action.payload);
    },
    editExpense: (state, action: PayloadAction<Expense>) => {
      const { id, title, amount, date } = action.payload;
      const index = state.expensesList.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        state.expensesList[index] = { ...state.expensesList[index], title, amount, date };
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.expensesList = state.expensesList.filter((expense) => expense.id !== id);
    },
    setChosenExpense: (state, action: PayloadAction<Expense | null>) => {
      state.chosenExpense = action.payload;
    },
    setExpensesFilters: (state, action: PayloadAction<ExpenseFilters>) => {
      state.expensesFilters = action.payload;
    },

  },
});

export const { setExpensesFilters, setChosenExpense, setExpensesList, addExpense, editExpense, deleteExpense, } = expensesStoreSlice.actions;

export const selectNavigationStore = (state: RootState) => state.expensesStore;

export default expensesStoreSlice.reducer;
