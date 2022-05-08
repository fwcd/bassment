import { AppSidebar } from '@bassment/AppSidebar';
import { envConstants } from '@bassment/constants/env';
import { ApiContext } from '@bassment/contexts/Api';
import { AuthContext } from '@bassment/contexts/Auth';
import { AlbumScreen } from '@bassment/screens/Album';
import { GenreScreen } from '@bassment/screens/Artist';
import { ArtistScreen } from '@bassment/screens/Genre';
import { LoginScreen } from '@bassment/screens/Login';
import { PlaylistScreen } from '@bassment/screens/Playlist';
import { TracksScreen } from '@bassment/screens/Tracks';
import { useDerivedTheme } from '@bassment/styles/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export type SidebarNavigatorParams = {
  tracks: {};
  playlist: { name: string; id: number };
  genre: { name: string; id: number };
  album: { name: string; id: number };
  artist: { name: string; id: number };
};

const SidebarDrawer = createDrawerNavigator<SidebarNavigatorParams>();

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
        <SidebarDrawer.Navigator
          initialRouteName="tracks"
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
          <SidebarDrawer.Screen
            name="tracks"
            options={{ title: 'Tracks' }}
            component={TracksScreen}
          />
          <SidebarDrawer.Screen
            name="playlist"
            options={({ route }) => ({
              title: `Playlist: ${route.params?.name ?? '?'}`,
            })}
            component={PlaylistScreen}
          />
          <SidebarDrawer.Screen
            name="album"
            options={({ route }) => ({
              title: `Album: ${route.params?.name ?? '?'}`,
            })}
            component={AlbumScreen}
          />
          <SidebarDrawer.Screen
            name="artist"
            options={({ route }) => ({
              title: `Artist: ${route.params?.name ?? '?'}`,
            })}
            component={ArtistScreen}
          />
          <SidebarDrawer.Screen
            name="genre"
            options={({ route }) => ({
              title: `Genre: ${route.params?.name ?? '?'}`,
            })}
            component={GenreScreen}
          />
        </SidebarDrawer.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
