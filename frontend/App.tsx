import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export function App() {
  const dimensions = useWindowDimensions();
  return (
    <NavigationContainer>
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
          name="Home"
          options={{
            drawerIcon: props => (
              <Icon name="home-outline" size={props.size} color={props.color} />
            ),
          }}
          component={() => <Text>Home</Text>}
        />
        <Drawer.Screen
          name="Test"
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
