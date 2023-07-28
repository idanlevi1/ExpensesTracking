import { BOTTOM_SHEET_MODE } from '../../utils/Constants';
import appStore, {
  AppStoreState,
  setBottomSheetMode,
} from './AppStoreSlice';

describe('appStore reducer', () => {
  const initialState: AppStoreState = {
    bottomSheetMode: null,
  };
  it('should handle initial state', () => {
    expect(appStore(undefined, { type: 'unknown' })).toEqual({
      fullName: null,
    });
  });

  it('should handle bottomSheetMode mode', () => {
    const actual = appStore(initialState, setBottomSheetMode(BOTTOM_SHEET_MODE.EDIT));
    expect(actual.bottomSheetMode).toEqual(BOTTOM_SHEET_MODE.EDIT);
  });
  it('should handle bottomSheetMode null', () => {
    const actual = appStore(initialState, setBottomSheetMode(null));
    expect(actual.bottomSheetMode).toEqual(null);
  });
});
