import expensesStore, {
  ExpensesStoreState, setExpensesList,
} from './ExpensesStoreSlice';

describe('expensesStore reducer', () => {
  const initialState: ExpensesStoreState = {
    expensesList: [],
  };
  it('should handle initial state', () => {
    expect(expensesStore(undefined, { type: 'unknown' })).toEqual({
      expensesList: [],
    });
  });

  it('should handle setExpensesList empty list', () => {
    const actual = expensesStore(initialState, setExpensesList([]));
    expect(actual.expensesList).toEqual([]);
  });

});