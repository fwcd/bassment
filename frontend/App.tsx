import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { AppContainer } from '@bassment/AppContainer';

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <AppContainer />
    </SafeAreaProvider>
  );
}
