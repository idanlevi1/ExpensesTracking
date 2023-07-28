import userStore, {
  setFullName,
  UserStoreState,
} from './UserStoreSlice';

describe('userStore reducer', () => {
  const initialState: UserStoreState = {
    fullName: null,
  };
  it('should handle initial state', () => {
    expect(userStore(undefined, { type: 'unknown' })).toEqual({
      fullName: null,
    });
  });
  it('should handle fullName value', () => {
    const fullName = 'Idan Levi'
    const actual = userStore(initialState, setFullName(fullName));
    expect(actual.fullName).toEqual(fullName);
  });
  it('should handle fullName null', () => {
    const actual = userStore(initialState, setFullName(null));
    expect(actual.fullName).toEqual(null);
  });
});
