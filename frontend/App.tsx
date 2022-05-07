import { AppContainer } from '@bassment/AppContainer';
import { ApiContextProvider } from '@bassment/contexts/Api';
import { AuthContextProvider } from '@bassment/contexts/Auth';
import React from 'react';
import { StatusBar, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  const dimensions = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <View style={{ height: dimensions.height }}>
        <StatusBar />
        <AuthContextProvider>
          <ApiContextProvider>
            <AppContainer />
          </ApiContextProvider>
        </AuthContextProvider>
      </View>
    </SafeAreaProvider>
  );
}
