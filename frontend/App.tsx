import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useWindowDimensions, View } from 'react-native';
import { AppContainer } from '@bassment/AppContainer';

export function App() {
  const dimensions = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <View style={{ height: dimensions.height }}>
        <StatusBar />
        <AppContainer />
      </View>
    </SafeAreaProvider>
  );
}
