import { AppContainer } from '@bassment/AppContainer';
import { envConstants } from '@bassment/constants/env';
import { ApiContextProvider } from '@bassment/contexts/Api';
import { AudioPlayerContextProvider } from '@bassment/contexts/AudioPlayer';
import { AuthContextProvider } from '@bassment/contexts/Auth';
import { SearchContextProvider } from '@bassment/contexts/Search';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  return (
    <SafeAreaProvider>
      <View
        style={{
          height: envConstants.platform.os === 'web' ? '100vh' : '100%',
        }}>
        <StatusBar />
        <AuthContextProvider>
          <ApiContextProvider>
            <SearchContextProvider>
              <AudioPlayerContextProvider>
                <AppContainer />
              </AudioPlayerContextProvider>
            </SearchContextProvider>
          </ApiContextProvider>
        </AuthContextProvider>
      </View>
    </SafeAreaProvider>
  );
}
