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
  chosenExpense: Expense | null,
}

const initialState: ExpensesStoreState = {
  expensesList: [],
  chosenExpense: null,
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
      console.log("🚀 ~ file: ___________.ts:35 ~  action.payload:",  action.payload)
      const index = state.expensesList.findIndex((expense) => expense.id === id);
      console.log("🚀 ~ file: ExpensesStoreSlice.ts:37 ~ index:", index)
      if (index !== -1) {
        state.expensesList[index] = { ...state.expensesList[index], title, amount, date };
        console.log("🚀 ~ file: _S_S_S_.ts:38 ~ state.expensesList:", state.expensesList)
        console.log("🚀 ~ file: ___________.ts:39 ~ state.expensesList[index]:", state.expensesList[index])
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.expensesList = state.expensesList.filter((expense) => expense.id !== id);
    },
    setChosenExpense: (state, action: PayloadAction<Expense>) => {
      state.chosenExpense = action.payload;
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

export const { setChosenExpense, setExpensesList, addExpense, editExpense, deleteExpense, } = expensesStoreSlice.actions;

export const selectNavigationStore = (state: RootState) => state.expensesStore;

export default expensesStoreSlice.reducer;
