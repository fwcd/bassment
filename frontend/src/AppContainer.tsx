import { AppSidebar } from '@bassment/AppSidebar';
import { AlbumsScreen } from '@bassment/screens/Albums';
import { ArtistsScreen } from '@bassment/screens/Artists';
import { GenresScreen } from '@bassment/screens/Genres';
import { TracksScreen } from '@bassment/screens/Tracks';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export function AppContainer() {
  const dimensions = useWindowDimensions();
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Test"
        drawerContent={AppSidebar}
        screenOptions={{
          drawerType:
            Platform.OS === 'web' || dimensions.width >= 600
              ? 'permanent'
              : 'slide',
          drawerStyle: {
            width: 220,
          },
        }}>
        <Drawer.Screen
          name="Tracks"
          options={{
            drawerIcon: props => (
              <Icon
                name="musical-notes-outline"
                size={props.size}
                color={props.color}
              />
            ),
          }}
          component={TracksScreen}
        />
        <Drawer.Screen
          name="Albums"
          options={{
            drawerIcon: props => (
              <Icon
                name="albums-outline"
                size={props.size}
                color={props.color}
              />
            ),
          }}
          component={AlbumsScreen}
        />
        <Drawer.Screen
          name="Artists"
          options={{
            drawerIcon: props => (
              <Icon
                name="people-outline"
                size={props.size}
                color={props.color}
              />
            ),
          }}
          component={ArtistsScreen}
        />
        <Drawer.Screen
          name="Genres"
          options={{
            drawerIcon: props => (
              <Icon name="star-outline" size={props.size} color={props.color} />
            ),
          }}
          component={GenresScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
