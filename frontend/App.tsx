import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

const Drawer = createDrawerNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={() => <Text>Home</Text>} />
        <Drawer.Screen name="Test" component={() => <Text>Test</Text>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
