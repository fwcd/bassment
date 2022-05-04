import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  Text,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export function AppContainer() {
  const dimensions = useWindowDimensions();
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Test"
        screenOptions={{
          drawerType:
            Platform.OS === 'web' || dimensions.width >= 600
              ? 'permanent'
              : 'slide',
          drawerStyle: {
            minWidth: 200,
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
          component={() => <Text>Home</Text>}
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
          component={() => <Text>Test 123</Text>}
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
          component={() => <Text>Test 123</Text>}
        />
        <Drawer.Screen
          name="Genres"
          options={{
            drawerIcon: props => (
              <Icon name="star-outline" size={props.size} color={props.color} />
            ),
          }}
          component={() => <Text>Test 123</Text>}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
