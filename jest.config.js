module.exports = {
  preset: 'react-native',
  setupFiles: ['./__mocks__/@react-native-async-storage/async-storage.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@gorhom/bottom-sheet$': './__mocks__/@gorhom/bottom-sheet.js',
    '^@react-navigation/elements/lib/commonjs/assets/back-icon.png$': './__mocks__/imageMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': 'jest-static-stubs',
    'redux-persist': './__mocks__/redux-persist.js',
  },
};

