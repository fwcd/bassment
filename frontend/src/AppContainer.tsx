import { AppSidebar } from '@bassment/AppSidebar';
import { envConstants } from '@bassment/constants/env';
import { ApiContext } from '@bassment/contexts/Api';
import { AuthContext } from '@bassment/contexts/Auth';
import { LoginScreen } from '@bassment/screens/Login';
import { PlaylistScreen } from '@bassment/screens/Playlist';
import { TracksScreen } from '@bassment/screens/Tracks';
import { useDerivedTheme } from '@bassment/styles/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export function AppContainer() {
  const dimensions = useWindowDimensions();
  const theme = useDerivedTheme();
  const auth = useContext(AuthContext);
  const api = useContext(ApiContext);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const updateLoggedIn = useCallback(async () => {
    setLoggedIn(await api.isLoggedIn());
  }, [api]);

  // Re-check login status initially and when the token changes
  // TODO: Handle expiry of the token, perhaps with a timer?
  useEffect(() => {
    updateLoggedIn();
  }, [updateLoggedIn, auth.token]);

  return (
    <NavigationContainer theme={theme}>
      {isLoggedIn ? (
        <Drawer.Navigator
          initialRouteName="Tracks"
          drawerContent={AppSidebar}
          screenOptions={{
            drawerType:
              envConstants.platform.os === 'web' || dimensions.width >= 600
                ? 'permanent'
                : 'slide',
            drawerStyle: {
              width: 220,
            },
          }}>
          <Drawer.Screen name="Tracks" component={TracksScreen} />
          <Drawer.Screen name="Playlist" component={PlaylistScreen} />
        </Drawer.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
