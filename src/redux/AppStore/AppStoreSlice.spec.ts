import { BOTTOM_SHEET_MODE } from '../../utils/Constants';
import { store } from '../store';
import appStore, {
  setBottomSheetMode,
} from './AppStoreSlice';

describe('appStore reducer', () => {

  it('should handle initial state', () => {
    expect(appStore(undefined, { type: 'unknown' })).toEqual({
      bottomSheetMode: null,
    });
  });

  it('should set the bottomSheetMode to a specific value', () => {
    const mode: BOTTOM_SHEET_MODE = BOTTOM_SHEET_MODE.FILTER;

    store.dispatch(setBottomSheetMode(mode));

    const state = store.getState();
    expect(state.appStore.bottomSheetMode).toEqual(mode);
  });

  it('should set the bottomSheetMode to null', () => {
    const mode: BOTTOM_SHEET_MODE = BOTTOM_SHEET_MODE.FILTER;

    store.dispatch(setBottomSheetMode(mode));
    store.dispatch(setBottomSheetMode(null));

    const state = store.getState();
    expect(state.appStore.bottomSheetMode).toBeNull();
  });
});
