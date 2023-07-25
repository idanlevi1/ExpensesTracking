/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS } from './src/utils/StyleGuide';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.background_screen} />
      <SafeAreaView style={styles.container}>
        <RootNavigator />
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
