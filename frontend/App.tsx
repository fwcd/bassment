import { AppContainer } from '@bassment/AppContainer';
import { RandomContextProvider } from '@bassment/contexts/random/random.context';
import React from 'react';
import { StatusBar, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  const dimensions = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <View style={{ height: dimensions.height }}>
        <StatusBar />
        <RandomContextProvider>
          <AppContainer />
        </RandomContextProvider>
      </View>
    </SafeAreaProvider>
  );
}
