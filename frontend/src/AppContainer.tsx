import { AppHeader } from '@bassment/panels/AppHeader';
import { AppSidebar } from '@bassment/panels/AppSidebar';
import { envConstants } from '@bassment/constants/env';
import { ApiContext } from '@bassment/contexts/Api';
import { AuthContext } from '@bassment/contexts/Auth';
import { AlbumScreen } from '@bassment/screens/Album';
import { ArtistScreen } from '@bassment/screens/Artist';
import { GenreScreen } from '@bassment/screens/Genre';
import { LoginScreen } from '@bassment/screens/Login';
import { PlaylistScreen } from '@bassment/screens/Playlist';
import { TracksScreen } from '@bassment/screens/Tracks';
import { useDerivedTheme } from '@bassment/styles/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { QueueScreen } from '@bassment/screens/Queue';

export type SidebarNavigatorParams = {
  tracks: {};
  queue: {};
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

  const linking: LinkingOptions<SidebarNavigatorParams> = {
    prefixes: [
      'bassment://', // TODO: Register bassment scheme in the native mobile apps
    ],
  };

  return (
    <NavigationContainer theme={theme} linking={linking}>
      {isLoggedIn ? (
        <SidebarDrawer.Navigator
          initialRouteName="tracks"
          drawerContent={AppSidebar}
          screenOptions={{
            header: props => <AppHeader {...props} />,
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
            name="queue"
            options={{ title: 'Queue' }}
            component={QueueScreen}
          />
          {/* TODO: Should we cache the id -> name mappings somewhere in the API context context or similar and derive the name from the id? */}
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
