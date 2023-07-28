import { store } from '../store';
import expensesStore, {
  addExpense,
  deleteExpense,
  editExpense,
  Expense,
  ExpenseFilters,
  ExpensesStoreState, setChosenExpense, setExpensesFilters, setExpensesList,
} from './ExpensesStoreSlice';

describe('expensesStore reducer', () => {
  const initialState: ExpensesStoreState = {
    expensesList: [],
    chosenExpense: null,
    expensesFilters: {},
  };
  it('should handle initial state', () => {
    expect(expensesStore(undefined, { type: 'unknown' })).toEqual({
      expensesList: [],
      chosenExpense: null,
      expensesFilters: {},
    });
  });

  it('should handle setExpensesList empty list', () => {
    const actual = expensesStore(initialState, setExpensesList([]));
    expect(actual.expensesList).toEqual([]);
  });

  it('should set expensesList', () => {
    const expensesList: Expense[] = [
      { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' },
      { id: '2', title: 'Expense 2', amount: 50, date: '27.07.2023' },
    ];

    store.dispatch(setExpensesList(expensesList));

    const state = store.getState();
    expect(state.expensesStore.expensesList).toEqual(expensesList);
  });

  it('should add an expense', () => {
    const expense: Expense = { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' };

    store.dispatch(addExpense(expense));

    const state = store.getState();
    expect(state.expensesStore.expensesList).toContainEqual(expense);
  });

  it('should edit an expense', () => {
    const initialExpenses: Expense[] = [
      { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' },
      { id: '2', title: 'Expense 2', amount: 50, date: '27.07.2023' },
    ];

    const editedExpense: Expense = { id: '1', title: 'Edited Expense', amount: 200, date: '28.07.2023' };

    store.dispatch(setExpensesList(initialExpenses));
    store.dispatch(editExpense(editedExpense));

    const state = store.getState();
    const editedIndex = state.expensesStore.expensesList.findIndex((expense) => expense.id === editedExpense.id);
    expect(state.expensesStore.expensesList[editedIndex]).toEqual(editedExpense);
  });

  it('should delete an expense', () => {
    const initialExpenses: Expense[] = [
      { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' },
      { id: '2', title: 'Expense 2', amount: 50, date: '27.07.2023' },
    ];

    const expenseToDeleteId = '2';

    store.dispatch(setExpensesList(initialExpenses));
    store.dispatch(deleteExpense(expenseToDeleteId));

    const state = store.getState();
    const deletedExpense = state.expensesStore.expensesList.find((expense) => expense.id === expenseToDeleteId);
    expect(deletedExpense).toBeUndefined();
  });

  it('should set chosenExpense', () => {
    const chosenExpense: Expense = { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' };

    store.dispatch(setChosenExpense(chosenExpense));

    const state = store.getState();
    expect(state.expensesStore.chosenExpense).toEqual(chosenExpense);
  });

  it('should set expensesFilters', () => {
    const filters: ExpenseFilters = { title: 'Expense', amount: '100', date: '26.07.2023' };

    store.dispatch(setExpensesFilters(filters));

    const state = store.getState();
    expect(state.expensesStore.expensesFilters).toEqual(filters);
  });

});