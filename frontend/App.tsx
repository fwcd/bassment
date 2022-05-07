import { AppContainer } from '@bassment/AppContainer';
import { AuthContextProvider } from '@bassment/contexts/Auth';
import React from 'react';
import { StatusBar, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  const dimensions = useWindowDimensions();
  // TODO: Wrap AppContainer in context providers
  return (
    <SafeAreaProvider>
      <View style={{ height: dimensions.height }}>
        <StatusBar />
        <AuthContextProvider>
          <AppContainer />
        </AuthContextProvider>
      </View>
    </SafeAreaProvider>
  );
}
