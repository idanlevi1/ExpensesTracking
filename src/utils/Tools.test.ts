import { Expense } from "../redux/ExpensesStore/ExpensesStoreSlice";
import { generateRandomId, groupBy } from "./Tools";

describe('generateRandomId', () => {
  it('should generate a random string of the specified length', () => {
    const randomId = generateRandomId(10);
    expect(randomId).toHaveLength(10);
  });

  it('should generate a random string of default length (6)', () => {
    const randomId = generateRandomId();
    expect(randomId).toHaveLength(6);
  });
});

describe('groupBy', () => {
  const expenses: Expense[] = [
    { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' },
    { id: '2', title: 'Expense 2', amount: 50, date: '27.07.2023' },
    { id: '3', title: 'Expense 3', amount: 200, date: '26.07.2023' },
    { id: '4', title: 'Expense 4', amount: 75, date: '28.07.2023' },
    { id: '5', title: 'Expense 5', amount: 150, date: '27.07.2023' },
  ];

  it('should group expenses by date', () => {
    const grouped = groupBy(expenses, 'date');
    expect(grouped).toMatchObject({
      '26.07.2023': [
        { id: '1', title: 'Expense 1', amount: 100, date: '26.07.2023' },
        { id: '3', title: 'Expense 3', amount: 200, date: '26.07.2023' },
      ],
      '27.07.2023': [
        { id: '2', title: 'Expense 2', amount: 50, date: '27.07.2023' },
        { id: '5', title: 'Expense 5', amount: 150, date: '27.07.2023' },
      ],
      '28.07.2023': [
        { id: '4', title: 'Expense 4', amount: 75, date: '28.07.2023' },
      ],
    });
  });

  it('should handle an empty array and return an empty object', () => {
    const emptyArray: Expense[] = [];
    const grouped = groupBy(emptyArray, 'date');
    expect(grouped).toMatchObject({});
  });

  it('should handle expenses with no matching date and return an empty object', () => {
    const grouped = groupBy(expenses, 'nonExistentKey');
    expect(grouped).toMatchObject({});
  });

});
