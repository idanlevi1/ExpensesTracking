import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import expensesStoreReducer from './ExpensesStore/ExpensesStoreSlice';
import userStoreReducer from './UserStore/UserStoreSlice';
import appStoreReducer from './AppStore/AppStoreSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from 'redux'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['expensesStore', 'userStore', 'appStore'],
}

const expensesStorePersistConfig = {
  key: 'expensesStore',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['expensesList'],
}

const userStorePersistConfig = {
  key: 'userStore',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['fullName'],
}

const appStorePersistConfig = {
  key: 'appStore',
  version: 1,
  storage: AsyncStorage,
  whitelist: [],
}


const reducer = combineReducers({
  expensesStore: persistReducer(expensesStorePersistConfig, expensesStoreReducer),
  userStore: persistReducer(userStorePersistConfig, userStoreReducer),
  appStore: persistReducer(appStorePersistConfig, appStoreReducer),
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
