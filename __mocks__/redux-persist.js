// __mocks__/redux-persist.js

const persistStoreMock = (store, config, callback) => {
    if (typeof config === 'function') {
      callback = config;
      config = undefined;
    }
  
    return {
      rehydrate: () => Promise.resolve(),
      pause: () => {},
      persist: () => Promise.resolve(),
      flush: () => Promise.resolve(),
    };
  };
  
  const persistReducerMock = (config, reducer) => reducer; // Mock persistReducer to return the reducer directly
  
  const createTransform = () => ({
    out: (data) => data,
    in: (data) => data,
  });
  
  const createPersistoid = () => ({
    update: () => {},
    flush: () => {},
  });
  
  export {
    persistStoreMock as persistStore,
    persistReducerMock as persistReducer,
    createTransform,
    createPersistoid,
  };
  