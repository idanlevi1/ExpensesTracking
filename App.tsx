/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS } from './src/utils/StyleGuide';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.background_screen} />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<View style={styles.container} />} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_screen,
  },
});

export default App;
