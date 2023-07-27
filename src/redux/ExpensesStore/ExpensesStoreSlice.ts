import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type DateFormat = "DD.MM.YYYY";

export type Expense = {
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
    addExpense: (state, action: PayloadAction<Expense>) => {
      console.log("🚀 ~ file: ExpensesStoreSlice.ts:29 ~ action:", action)
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
    // setFilterBy: (state, action) => {
    //   state.filterBy = action.payload;
    // },
  },
  // extraReducers: (builder) => {
  //   // Handle the fulfilled action of addExpense thunk
  //   builder.addCase(addExpense.fulfilled, (state, action) => {
  //     state.expensesList.push(action.payload);
  //   });
  // },
});

export const {setExpensesList ,addExpense, editExpense, deleteExpense, } = expensesStoreSlice.actions;

export const selectNavigationStore = (state: RootState) => state.expensesStore;

export default expensesStoreSlice.reducer;
